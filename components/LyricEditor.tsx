'use client';

import { useState, useEffect } from 'react';
import { Sparkles, Download, Copy, Languages, RotateCw } from 'lucide-react';
import { LyricsService } from '@/lib/services/lyricsService';
import type { LyricsData, LyricSection } from '@/types';

interface LyricEditorProps {
  initialLyrics?: string;
  songTheme?: string;
  genre?: string;
  mood?: string;
  onLyricsChange?: (lyrics: string) => void;
}

export default function LyricEditor({
  initialLyrics = '',
  songTheme = '',
  genre = 'Pop',
  mood = 'Happy',
  onLyricsChange,
}: LyricEditorProps) {
  const [lyrics, setLyrics] = useState(initialLyrics);
  const [sections, setSections] = useState<LyricSection[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [language, setLanguage] = useState('en');
  const [rhymeScheme, setRhymeScheme] = useState('');

  useEffect(() => {
    if (lyrics) {
      const parsed = LyricsService.parseLyrics(lyrics);
      setSections(parsed);
      const scheme = LyricsService.analyzeRhymeScheme(lyrics);
      setRhymeScheme(scheme);
    }
  }, [lyrics]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const generated = await LyricsService.generateLyrics({
        theme: songTheme,
        genre,
        mood,
        language,
        length: 'medium',
      });

      setLyrics(generated.text);
      onLyricsChange?.(generated.text);
    } catch (error) {
      console.error('Error generating lyrics:', error);
      alert('Failed to generate lyrics');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleLyricsChange = (value: string) => {
    setLyrics(value);
    onLyricsChange?.(value);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(lyrics);
    alert('Lyrics copied to clipboard!');
  };

  const downloadLyrics = () => {
    const blob = new Blob([lyrics], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lyrics.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
  ];

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">Lyrics Editor</h3>
          <p className="text-sm text-gray-400">Write or generate song lyrics</p>
        </div>

        <div className="flex gap-2">
          {/* Language Selector */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-3 py-2 bg-black/30 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code} className="bg-gray-900">
                {lang.name}
              </option>
            ))}
          </select>

          {/* Action Buttons */}
          <button
            onClick={copyToClipboard}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            title="Copy to clipboard"
          >
            <Copy className="w-4 h-4 text-gray-300" />
          </button>

          <button
            onClick={downloadLyrics}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            title="Download lyrics"
          >
            <Download className="w-4 h-4 text-gray-300" />
          </button>
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={isGenerating || !songTheme}
        className="w-full mb-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
      >
        {isGenerating ? (
          <>
            <RotateCw className="w-5 h-5 animate-spin" />
            Generating lyrics...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Generate Lyrics with AI
          </>
        )}
      </button>

      {/* Text Editor */}
      <div className="mb-4">
        <textarea
          value={lyrics}
          onChange={(e) => handleLyricsChange(e.target.value)}
          placeholder="Write your lyrics here or generate with AI...

Example format:
[Verse 1]
Your lyrics here...

[Chorus]
Catchy chorus lyrics...

[Verse 2]
More lyrics..."
          className="w-full h-96 px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none font-mono"
        />
      </div>

      {/* Info Panel */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-black/20 rounded-lg p-3">
          <div className="text-xs text-gray-400 mb-1">Lines</div>
          <div className="text-lg font-bold text-white">
            {lyrics.split('\n').filter(l => l.trim()).length}
          </div>
        </div>

        <div className="bg-black/20 rounded-lg p-3">
          <div className="text-xs text-gray-400 mb-1">Words</div>
          <div className="text-lg font-bold text-white">
            {lyrics.split(/\s+/).filter(w => w.trim()).length}
          </div>
        </div>

        <div className="bg-black/20 rounded-lg p-3">
          <div className="text-xs text-gray-400 mb-1">Sections</div>
          <div className="text-lg font-bold text-white">
            {sections.length}
          </div>
        </div>

        <div className="bg-black/20 rounded-lg p-3">
          <div className="text-xs text-gray-400 mb-1">Rhyme Scheme</div>
          <div className="text-sm font-mono font-bold text-purple-400">
            {rhymeScheme.slice(0, 10) || 'N/A'}
          </div>
        </div>
      </div>

      {/* Sections Preview */}
      {sections.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-300 mb-2">Song Structure</h4>
          <div className="flex flex-wrap gap-2">
            {sections.map((section, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full capitalize"
              >
                {section.type}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
