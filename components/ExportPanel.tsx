'use client';

import { useState } from 'react';
import { Download, Video, FileAudio, Loader2 } from 'lucide-react';
import type { ExportSettings } from '@/types';

interface ExportPanelProps {
  audioUrl: string;
  songTitle: string;
  stems?: any;
  lyrics?: string;
}

export default function ExportPanel({ audioUrl, songTitle, stems, lyrics }: ExportPanelProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportSettings, setExportSettings] = useState<ExportSettings>({
    format: 'mp3',
    quality: '320',
    sampleRate: 44100,
    includeStems: false,
    includeLyrics: false,
    includeVideo: false,
  });

  const handleExport = async () => {
    setIsExporting(true);

    try {
      const response = await fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          audioUrl,
          songTitle,
          settings: exportSettings,
        }),
      });

      if (!response.ok) {
        throw new Error('Export failed');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${songTitle}.${exportSettings.format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting:', error);
      alert('Failed to export file');
    } finally {
      setIsExporting(false);
    }
  };

  const handleGenerateVideo = async () => {
    setIsExporting(true);

    try {
      const response = await fetch('/api/visual/visualizer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          audioUrl,
          settings: {
            type: 'waveform',
            resolution: '1080p',
            fps: 30,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Video generation failed');
      }

      const data = await response.json();
      const a = document.createElement('a');
      a.href = data.videoUrl;
      a.download = `${songTitle}-visualizer.mp4`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error generating video:', error);
      alert('Failed to generate video');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white mb-1">Export Options</h3>
        <p className="text-sm text-gray-400">Download your song in various formats</p>
      </div>

      {/* Format Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Audio Format
        </label>
        <div className="grid grid-cols-5 gap-2">
          {(['mp3', 'wav', 'flac', 'ogg', 'm4a'] as const).map((format) => (
            <button
              key={format}
              onClick={() => setExportSettings({ ...exportSettings, format })}
              className={`
                px-3 py-2 rounded-lg text-xs font-medium uppercase transition-all
                ${exportSettings.format === format
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }
              `}
            >
              {format}
            </button>
          ))}
        </div>
      </div>

      {/* Quality Selection (for lossy formats) */}
      {(exportSettings.format === 'mp3' || exportSettings.format === 'ogg' || exportSettings.format === 'm4a') && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Quality
          </label>
          <div className="grid grid-cols-4 gap-2">
            {(['128', '192', '256', '320'] as const).map((quality) => (
              <button
                key={quality}
                onClick={() => setExportSettings({ ...exportSettings, quality })}
                className={`
                  px-3 py-2 rounded-lg text-xs font-medium transition-all
                  ${exportSettings.quality === quality
                    ? 'bg-purple-500 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }
                `}
              >
                {quality}kbps
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Sample Rate */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Sample Rate
        </label>
        <div className="grid grid-cols-3 gap-2">
          {([44100, 48000, 96000] as const).map((rate) => (
            <button
              key={rate}
              onClick={() => setExportSettings({ ...exportSettings, sampleRate: rate })}
              className={`
                px-3 py-2 rounded-lg text-xs font-medium transition-all
                ${exportSettings.sampleRate === rate
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }
              `}
            >
              {rate / 1000}kHz
            </button>
          ))}
        </div>
      </div>

      {/* Additional Options */}
      <div className="mb-6 space-y-2">
        {stems && (
          <label className="flex items-center gap-3 p-3 bg-black/20 rounded-lg cursor-pointer hover:bg-black/30 transition-colors">
            <input
              type="checkbox"
              checked={exportSettings.includeStems}
              onChange={(e) =>
                setExportSettings({ ...exportSettings, includeStems: e.target.checked })
              }
              className="w-4 h-4 rounded accent-purple-500"
            />
            <span className="text-sm text-white">Include separated stems</span>
          </label>
        )}

        {lyrics && (
          <label className="flex items-center gap-3 p-3 bg-black/20 rounded-lg cursor-pointer hover:bg-black/30 transition-colors">
            <input
              type="checkbox"
              checked={exportSettings.includeLyrics}
              onChange={(e) =>
                setExportSettings({ ...exportSettings, includeLyrics: e.target.checked })
              }
              className="w-4 h-4 rounded accent-purple-500"
            />
            <span className="text-sm text-white">Include lyrics file</span>
          </label>
        )}
      </div>

      {/* Export Buttons */}
      <div className="space-y-2">
        <button
          onClick={handleExport}
          disabled={isExporting}
          className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          {isExporting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Exporting...
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              Export Audio
            </>
          )}
        </button>

        <button
          onClick={handleGenerateVideo}
          disabled={isExporting}
          className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isExporting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Video className="w-5 h-5" />
              Generate Visualizer Video
            </>
          )}
        </button>
      </div>

      {/* Info */}
      <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <p className="text-xs text-blue-300">
          <strong>Tip:</strong> WAV and FLAC formats provide lossless quality, while MP3 is smaller and more compatible.
        </p>
      </div>
    </div>
  );
}
