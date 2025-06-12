import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { nanoid } from 'nanoid';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { title, description, start_date, end_date, location, custom_fields } = body;

    // Validate required fields
    if (!title || !description || !start_date || !end_date || !location) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create event with unique public URL
    const event = await prisma.event.create({
      data: {
        title,
        description,
        start_date: new Date(start_date),
        end_date: new Date(end_date),
        location,
        creator_id: session.user.id,
        custom_fields: custom_fields || {},
        public_url: nanoid(10), // Generate unique URL
        is_published: false,
      },
    });

    return NextResponse.json(event);
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { session } } = await supabase.auth.getSession();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Get events based on user role
    let events;
    if (session) {
      const { data: user } = await supabase
        .from('users')
        .select('role')
        .eq('id', session.user.id)
        .single();

      if (user?.role === 'ADMIN' || user?.role === 'STAFF') {
        // Admins and staff can see all events
        events = await prisma.event.findMany({
          skip,
          take: limit,
          orderBy: { created_at: 'desc' },
          include: {
            creator: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        });
      } else {
        // Regular users can only see published events
        events = await prisma.event.findMany({
          where: { is_published: true },
          skip,
          take: limit,
          orderBy: { created_at: 'desc' },
          include: {
            creator: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        });
      }
    } else {
      // Public users can only see published events
      events = await prisma.event.findMany({
        where: { is_published: true },
        skip,
        take: limit,
        orderBy: { created_at: 'desc' },
        include: {
          creator: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      });
    }

    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 