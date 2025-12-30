'use client';

import { useState } from 'react';
import { Music, Sparkles, Download, Play, Pause, Loader2 } from 'lucide-react';
import SongGenerator from '@/components/SongGenerator';
import SongLibrary from '@/components/SongLibrary';

export interface Song {
  id: string;
  title: string;
  prompt: string;
  genre: string;
  mood: string;
  duration: number;
  audioUrl: string;
  createdAt: Date;
}

export default function Home() {
  const [songs, setSongs] = useState<Song[]>([]);

  const handleSongGenerated = (song: Song) => {
    setSongs(prev => [song, ...prev]);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-blue-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
              <Music className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Song Generator</h1>
              <p className="text-purple-300 text-sm">Create amazing AI-generated music</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Song Generator Section */}
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <h2 className="text-2xl font-bold text-white">Create Your Song</h2>
              </div>
              <p className="text-gray-400">
                Describe your song and let AI bring it to life
              </p>
            </div>
            <SongGenerator onSongGenerated={handleSongGenerated} />
          </div>

          {/* Song Library Section */}
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Your Songs</h2>
              <p className="text-gray-400">
                {songs.length === 0
                  ? 'Your generated songs will appear here'
                  : `${songs.length} song${songs.length !== 1 ? 's' : ''} generated`}
              </p>
            </div>
            <SongLibrary songs={songs} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/30 backdrop-blur-md mt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-center text-gray-500 text-sm">
            AI-powered music generation • Built with Next.js
          </p>
        </div>
      </footer>
    </main>
  );
}
