import { NextResponse } from 'next/server';

export function GET() {
  return new NextResponse('a62886f7b15a45279f046b9a89d3429f', {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
