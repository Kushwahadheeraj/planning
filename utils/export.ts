import { Prisma } from '@prisma/client';

interface RSVPWithUser {
  user?: {
    name: string | null;
    email: string;
  };
  status: string;
  created_at: Date;
  custom_data: Record<string, any> | null;
}

export const exportRSVPsToCSV = (rsvps: RSVPWithUser[]): string => {
  const headers = [
    'Name',
    'Email',
    'Status',
    'RSVP Date',
    'Custom Data',
  ];

  const rows = rsvps.map((rsvp) => [
    rsvp.user?.name || '',
    rsvp.user?.email || '',
    rsvp.status,
    new Date(rsvp.created_at).toLocaleString(),
    JSON.stringify(rsvp.custom_data || {}),
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.join(',')),
  ].join('\n');

  return csvContent;
};

export const downloadCSV = (csvContent: string, filename: string) => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}; 