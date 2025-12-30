import { NextRequest, NextResponse } from 'next/server';
import { VisualService } from '@/lib/services/visualService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { songTitle, genre, mood, settings } = body;

    if (!songTitle) {
      return NextResponse.json(
        { error: 'Missing song title' },
        { status: 400 }
      );
    }

    const defaultSettings = {
      style: 'modern' as const,
      aspectRatio: '1:1' as const,
      ...settings,
    };

    const imageUrl = await VisualService.generateAlbumArt({
      songTitle,
      genre: genre || 'Pop',
      mood: mood || 'Happy',
      settings: defaultSettings,
    });

    return NextResponse.json({
      imageUrl,
      message: 'Album art generated successfully',
    });
  } catch (error) {
    console.error('Error generating album art:', error);
    return NextResponse.json(
      { error: 'Failed to generate album art' },
      { status: 500 }
    );
  }
}
