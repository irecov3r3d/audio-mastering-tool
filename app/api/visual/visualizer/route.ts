import { NextRequest, NextResponse } from 'next/server';
import { VisualService } from '@/lib/services/visualService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { audioUrl, settings } = body;

    if (!audioUrl) {
      return NextResponse.json(
        { error: 'Missing audio URL' },
        { status: 400 }
      );
    }

    const defaultSettings = {
      type: 'waveform' as const,
      colorScheme: ['#8b5cf6', '#ec4899'],
      backgroundColor: '#000000',
      resolution: '1080p' as const,
      fps: 30 as const,
      ...settings,
    };

    const videoUrl = await VisualService.generateVisualizer({
      audioUrl,
      settings: defaultSettings,
    });

    return NextResponse.json({
      videoUrl,
      message: 'Visualizer generated successfully',
    });
  } catch (error) {
    console.error('Error generating visualizer:', error);
    return NextResponse.json(
      { error: 'Failed to generate visualizer' },
      { status: 500 }
    );
  }
}
