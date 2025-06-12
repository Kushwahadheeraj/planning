import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const event = await prisma.event.findUnique({
      where: { id: params.id },
    });

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    if (!event.is_published) {
      return NextResponse.json(
        { error: 'Event is not published' },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { custom_data } = body;

    // Check if user has already RSVP'd
    const existingRSVP = await prisma.rSVP.findUnique({
      where: {
        event_id_user_id: {
          event_id: params.id,
          user_id: session.user.id,
        },
      },
    });

    if (existingRSVP) {
      return NextResponse.json(
        { error: 'You have already RSVP\'d to this event' },
        { status: 400 }
      );
    }

    // Create RSVP
    const rsvp = await prisma.rSVP.create({
      data: {
        event_id: params.id,
        user_id: session.user.id,
        custom_data: custom_data || {},
        status: 'CONFIRMED',
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(rsvp);
  } catch (error) {
    console.error('Error creating RSVP:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const event = await prisma.event.findUnique({
      where: { id: params.id },
    });

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    // Check if user has permission to view RSVPs
    const { data: user } = await supabase
      .from('users')
      .select('role')
      .eq('id', session.user.id)
      .single();

    if (
      user?.role !== 'ADMIN' &&
      user?.role !== 'STAFF' &&
      event.creator_id !== session.user.id
    ) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const rsvps = await prisma.rSVP.findMany({
      where: { event_id: params.id },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: { created_at: 'desc' },
    });

    return NextResponse.json(rsvps);
  } catch (error) {
    console.error('Error fetching RSVPs:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const rsvp = await prisma.rSVP.findUnique({
      where: {
        event_id_user_id: {
          event_id: params.id,
          user_id: session.user.id,
        },
      },
    });

    if (!rsvp) {
      return NextResponse.json({ error: 'RSVP not found' }, { status: 404 });
    }

    // Only allow users to cancel their own RSVPs
    if (rsvp.user_id !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await prisma.rSVP.delete({
      where: {
        event_id_user_id: {
          event_id: params.id,
          user_id: session.user.id,
        },
      },
    });

    return NextResponse.json({ message: 'RSVP cancelled successfully' });
  } catch (error) {
    console.error('Error cancelling RSVP:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 