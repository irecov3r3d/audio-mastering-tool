import { NextRequest, NextResponse } from 'next/server';

interface GenerateRequest {
  prompt: string;
  genre: string;
  mood: string;
  duration: number;
}

// Mock song generation - Replace this with actual AI music generation API
// Potential integrations: Suno API, MusicGen, Riffusion, etc.
async function generateSong(params: GenerateRequest) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 3000));

  // Generate a title based on the prompt
  const title = generateTitle(params.prompt, params.genre);

  // For demo purposes, we're using a placeholder audio URL
  // In production, this would be the URL from your AI music generation service
  const audioUrl = getPlaceholderAudio(params.genre);

  return {
    id: crypto.randomUUID(),
    title,
    prompt: params.prompt,
    genre: params.genre,
    mood: params.mood,
    duration: params.duration,
    audioUrl,
    createdAt: new Date(),
  };
}

function generateTitle(prompt: string, genre: string): string {
  // Extract keywords from prompt for a creative title
  const words = prompt.split(' ').filter(w => w.length > 3);
  const keyword = words[Math.floor(Math.random() * Math.min(words.length, 3))];

  const titleTemplates = [
    `${keyword} Dreams`,
    `The ${keyword} Song`,
    `${keyword} Nights`,
    `${genre} ${keyword}`,
    `${keyword} Forever`,
    `Electric ${keyword}`,
  ];

  return titleTemplates[Math.floor(Math.random() * titleTemplates.length)]
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

function getPlaceholderAudio(genre: string): string {
  // Using royalty-free sample audio URLs
  // In production, replace with your AI-generated music URLs
  const samples: Record<string, string> = {
    'Pop': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    'Rock': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    'Electronic': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    'Jazz': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    'Classical': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
  };

  return samples[genre] || samples['Pop'];
}

export async function POST(request: NextRequest) {
  try {
    const body: GenerateRequest = await request.json();

    // Validate request
    if (!body.prompt || !body.genre || !body.mood) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate the song
    const song = await generateSong(body);

    return NextResponse.json(song);
  } catch (error) {
    console.error('Error in generate API:', error);
    return NextResponse.json(
      { error: 'Failed to generate song' },
      { status: 500 }
    );
  }
}

/*
 * TO INTEGRATE REAL AI MUSIC GENERATION:
 *
 * 1. SUNO API (if available):
 *    - Get API key from Suno
 *    - Replace generateSong() with Suno API call
 *    - Example: const response = await fetch('https://api.suno.ai/generate', {...})
 *
 * 2. MusicGen (Meta's model):
 *    - Set up Replicate or Hugging Face API
 *    - Use model: facebook/musicgen-large
 *    - Pass prompt and parameters
 *
 * 3. Riffusion:
 *    - Use Replicate API
 *    - Model: riffusion/riffusion
 *    - Converts text to spectrogram to audio
 *
 * 4. AudioCraft:
 *    - Self-host or use API
 *    - Meta's audio generation toolkit
 *
 * Add your API key to .env.local:
 * MUSIC_AI_API_KEY=your_key_here
 */
