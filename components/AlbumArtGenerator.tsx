'use client';

import { useState } from 'react';
import { Sparkles, Download, RefreshCw, Image as ImageIcon } from 'lucide-react';

interface AlbumArtGeneratorProps {
  songTitle: string;
  genre: string;
  mood: string;
  onArtGenerated?: (imageUrl: string) => void;
}

export default function AlbumArtGenerator({
  songTitle,
  genre,
  mood,
  onArtGenerated,
}: AlbumArtGeneratorProps) {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [style, setStyle] = useState<'abstract' | 'realistic' | 'minimalist' | 'vintage' | 'modern'>('modern');

  const styles = [
    { value: 'abstract', label: 'Abstract' },
    { value: 'realistic', label: 'Realistic' },
    { value: 'minimalist', label: 'Minimalist' },
    { value: 'vintage', label: 'Vintage' },
    { value: 'modern', label: 'Modern' },
  ];

  const generateArt = async () => {
    setIsGenerating(true);

    try {
      const response = await fetch('/api/visual/album-art', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          songTitle,
          genre,
          mood,
          settings: {
            style,
            prompt: customPrompt,
            aspectRatio: '1:1',
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate album art');
      }

      const data = await response.json();
      setImageUrl(data.imageUrl);
      onArtGenerated?.(data.imageUrl);
    } catch (error) {
      console.error('Error generating album art:', error);
      alert('Failed to generate album art');
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadArt = () => {
    if (!imageUrl) return;

    const a = document.createElement('a');
    a.href = imageUrl;
    a.download = `${songTitle}-album-art.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white mb-1">Album Art Generator</h3>
        <p className="text-sm text-gray-400">Create stunning AI-generated cover art</p>
      </div>

      {/* Style Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Art Style
        </label>
        <div className="grid grid-cols-5 gap-2">
          {styles.map((s) => (
            <button
              key={s.value}
              onClick={() => setStyle(s.value as any)}
              className={`
                px-3 py-2 rounded-lg text-xs font-medium transition-all
                ${style === s.value
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }
              `}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Prompt */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Custom Prompt (Optional)
        </label>
        <textarea
          value={customPrompt}
          onChange={(e) => setCustomPrompt(e.target.value)}
          placeholder="Add specific details for the album art..."
          className="w-full h-20 px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none text-sm"
        />
      </div>

      {/* Preview */}
      {imageUrl && (
        <div className="mb-6">
          <div className="relative aspect-square bg-black/20 rounded-lg overflow-hidden">
            <img
              src={imageUrl}
              alt="Generated album art"
              className="w-full h-full object-cover"
            />

            <button
              onClick={downloadArt}
              className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-lg backdrop-blur-sm transition-colors"
              title="Download album art"
            >
              <Download className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      )}

      {/* Generate Button */}
      <div className="flex gap-2">
        <button
          onClick={generateArt}
          disabled={isGenerating || !songTitle}
          className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              Generating...
            </>
          ) : imageUrl ? (
            <>
              <RefreshCw className="w-5 h-5" />
              Regenerate
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate Art
            </>
          )}
        </button>

        {imageUrl && (
          <button
            onClick={downloadArt}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          >
            <Download className="w-5 h-5 text-white" />
          </button>
        )}
      </div>

      {!imageUrl && !isGenerating && (
        <div className="mt-4 p-4 bg-black/20 rounded-lg text-center">
          <ImageIcon className="w-12 h-12 text-gray-500 mx-auto mb-2" />
          <p className="text-sm text-gray-400">
            No album art yet. Click generate to create one!
          </p>
        </div>
      )}
    </div>
  );
}
