import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, firm, email, role, message } = await request.json();

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error('DISCORD_WEBHOOK_URL environment variable is missing.');
      return NextResponse.json(
        { error: 'Server configuration error: Webhook is missing.' },
        { status: 500 }
      );
    }

    // Map role values to readable titles
    const roleTitles: Record<string, string> = {
      wealth: 'Wealth Management',
      ib: 'Investment Banking',
      equity: 'Equity Research',
      other: 'General Discussion'
    };

    const roleTitle = roleTitles[role] || role;

    // Discord Embed payload layout
    const payload = {
      embeds: [
        {
          title: '💼 New Portfolio Inquiry',
          description: `A recruiter has sent a collaboration request from your portfolio website.`,
          color: 2449771, // hex #2563eb (fintech-blue) as decimal
          fields: [
            {
              name: '👤 Name',
              value: name || 'N/A',
              inline: true
            },
            {
              name: '🏢 Firm / Institution',
              value: firm || 'N/A',
              inline: true
            },
            {
              name: '✉️ Email Address',
              value: email || 'N/A',
              inline: true
            },
            {
              name: '🎯 Role Focus',
              value: roleTitle,
              inline: true
            },
            {
              name: '💬 Message',
              value: message || 'No message provided.'
            }
          ],
          footer: {
            text: 'Salaj Kumbhare Portals'
          },
          timestamp: new Date().toISOString()
        }
      ]
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Discord API response error:', errorText);
      throw new Error('Failed to dispatch message to Discord API.');
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
