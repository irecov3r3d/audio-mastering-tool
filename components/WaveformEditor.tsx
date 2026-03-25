'use client';

import React, { useState, useRef, useEffect, memo } from 'react';
import {
  Play,
  Pause,
  Scissors,
  Volume2,
  Sliders,
} from 'lucide-react';

interface WaveformEditorProps {
  audioUrl: string;
  onSave?: (editedUrl: string) => void;
}

// --- Sub-components ---

const TrimControls = memo(({
  duration,
  trimStart,
  setTrimStart,
  trimEnd,
  setTrimEnd,
  handleTrim
}: {
  duration: number;
  trimStart: number;
  setTrimStart: (val: number) => void;
  trimEnd: number;
  setTrimEnd: (val: number) => void;
  handleTrim: () => void;
}) => (
  <div className="mb-6 p-4 bg-black/20 rounded-lg">
    <div className="flex items-center gap-4 mb-3">
      <Scissors className="w-5 h-5 text-purple-400" />
      <h4 className="text-sm font-medium text-white">Trim Audio</h4>
    </div>

    <div className="grid grid-cols-2 gap-4 mb-4">
      <div>
        <label className="block text-xs text-gray-400 mb-1">Start Time</label>
        <input
          type="number"
          min="0"
          max={duration}
          step="0.1"
          value={trimStart}
          onChange={(e) => setTrimStart(Number(e.target.value))}
          className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div>
        <label className="block text-xs text-gray-400 mb-1">End Time</label>
        <input
          type="number"
          min={trimStart}
          max={duration}
          step="0.1"
          value={trimEnd}
          onChange={(e) => setTrimEnd(Number(e.target.value))}
          className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
    </div>

    <button
      onClick={handleTrim}
      className="w-full py-2 bg-purple-500 hover:bg-purple-600 text-white font-medium rounded-lg transition-colors"
    >
      Apply Trim
    </button>
  </div>
));

TrimControls.displayName = 'TrimControls';

const EffectsPanel = memo(({
  handleApplyEffects
}: {
  handleApplyEffects: (effect: string) => void;
}) => {
  const [showEffects, setShowEffects] = useState(false);

  return (
    <div className="p-4 bg-black/20 rounded-lg">
      <button
        onClick={() => setShowEffects(!showEffects)}
        className="flex items-center gap-2 text-white mb-3"
      >
        <Sliders className="w-5 h-5 text-purple-400" />
        <span className="text-sm font-medium">Audio Effects</span>
      </button>

      {showEffects && (
        <div className="grid grid-cols-2 gap-2">
          {['reverb', 'echo', 'bass-boost', 'normalize'].map((effect) => (
            <button
              key={effect}
              onClick={() => handleApplyEffects(effect)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm text-white transition-colors capitalize"
            >
              {effect.replace('-', ' ')}
            </button>
          ))}
        </div>
      )}
    </div>
  );
});

EffectsPanel.displayName = 'EffectsPanel';

const WaveformCanvas = memo(({
  waveformData,
  currentTime,
  duration,
  trimStart,
  trimEnd,
  selectedRegion,
  handleCanvasClick
}: {
  waveformData: number[];
  currentTime: number;
  duration: number;
  trimStart: number;
  trimEnd: number;
  selectedRegion: { start: number; end: number } | null;
  handleCanvasClick: (e: React.MouseEvent<HTMLCanvasElement>) => void;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || waveformData.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    const barWidth = width / waveformData.length;

    // Clear canvas
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(0, 0, width, height);

    // Draw waveform bars
    waveformData.forEach((value, index) => {
      const barHeight = value * height * 0.8;
      const x = index * barWidth;
      const y = (height - barHeight) / 2;

      const progress = (index / waveformData.length) * duration;

      // Color based on state
      let color = '#8b5cf6'; // Default purple

      if (progress < trimStart || progress > trimEnd) {
        color = 'rgba(139, 92, 246, 0.2)'; // Dimmed (trimmed region)
      } else if (progress <= currentTime) {
        color = '#ec4899'; // Pink (played region)
      }

      if (selectedRegion && progress >= selectedRegion.start && progress <= selectedRegion.end) {
        color = '#10b981'; // Green (selected region)
      }

      ctx.fillStyle = color;
      ctx.fillRect(x, y, barWidth - 1, barHeight);
    });

    // Draw playhead
    const playheadX = (currentTime / duration) * width;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(playheadX - 1, 0, 2, height);

    // Draw trim markers
    const trimStartX = (trimStart / duration) * width;
    const trimEndX = (trimEnd / duration) * width;

    ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
    ctx.fillRect(0, 0, trimStartX, height);
    ctx.fillRect(trimEndX, 0, width - trimEndX, height);
  }, [waveformData, currentTime, duration, trimStart, trimEnd, selectedRegion]);

  return (
    <div className="mb-6">
      <canvas
        ref={canvasRef}
        width={1200}
        height={200}
        onClick={handleCanvasClick}
        className="w-full h-48 bg-black/20 rounded-lg cursor-crosshair"
      />
    </div>
  );
});

WaveformCanvas.displayName = 'WaveformCanvas';

// --- Main Component ---

export default function WaveformEditor({ audioUrl, onSave }: WaveformEditorProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState(0);
  const [waveformData, setWaveformData] = useState<number[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<{ start: number; end: number } | null>(null);

  const audioRef = useRef<HTMLAudioElement>(null);

  // Load audio and generate waveform
  useEffect(() => {
    if (audioUrl) {
      loadAudio();
    }
  }, [audioUrl]);

  // Handle time updates
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setTrimEnd(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const loadAudio = async () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const response = await fetch(audioUrl);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

      // Extract waveform data
      const data = extractWaveformData(audioBuffer);
      setWaveformData(data);
    } catch (error) {
      console.error('Error loading audio:', error);
    }
  };

  const extractWaveformData = (audioBuffer: AudioBuffer): number[] => {
    const rawData = audioBuffer.getChannelData(0);
    const samples = 1000; // Number of bars in waveform
    const blockSize = Math.floor(rawData.length / samples);
    const filteredData: number[] = [];

    for (let i = 0; i < samples; i++) {
      const blockStart = blockSize * i;
      let sum = 0;
      for (let j = 0; j < blockSize; j++) {
        sum += Math.abs(rawData[blockStart + j]);
      }
      filteredData.push(sum / blockSize);
    }

    return filteredData;
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = e.currentTarget;
    if (!canvas || !audioRef.current) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const clickTime = (x / rect.width) * duration;

    audioRef.current.currentTime = clickTime;
    setCurrentTime(clickTime);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTrim = async () => {
    if (!audioUrl) return;

    const response = await fetch('/api/audio/trim', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        audioUrl,
        startTime: trimStart,
        endTime: trimEnd,
      }),
    });

    const data = await response.json();
    onSave?.(data.url);
    alert('Audio trimmed successfully!');
  };

  const handleApplyEffects = async (effect: string) => {
    const response = await fetch('/api/audio/effects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        audioUrl,
        effect,
      }),
    });

    const data = await response.json();
    onSave?.(data.url);
  };

  const formatTime = (time: number): string => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    const ms = Math.floor((time % 1) * 100);
    return `${mins}:${String(secs).padStart(2, '0')}.${String(ms).padStart(2, '0')}`;
  };

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
      <audio ref={audioRef} src={audioUrl} />

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">Waveform Editor</h3>
          <p className="text-sm text-gray-400">Edit and enhance your audio</p>
        </div>
      </div>

      <WaveformCanvas
        waveformData={waveformData}
        currentTime={currentTime}
        duration={duration}
        trimStart={trimStart}
        trimEnd={trimEnd}
        selectedRegion={selectedRegion}
        handleCanvasClick={handleCanvasClick}
      />

      {/* Timeline */}
      <div className="mb-6 flex justify-between text-xs text-gray-400">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      {/* Playback Controls */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={togglePlay}
          className="p-4 bg-purple-500 hover:bg-purple-600 rounded-full transition-colors"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-white" fill="white" />
          ) : (
            <Play className="w-6 h-6 text-white" fill="white" />
          )}
        </button>

        <div className="flex-1">
          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.01"
            value={currentTime}
            onChange={(e) => {
              const time = Number(e.target.value);
              setCurrentTime(time);
              if (audioRef.current) {
                audioRef.current.currentTime = time;
              }
            }}
            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-gray-400" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => {
              const vol = Number(e.target.value);
              setVolume(vol);
              if (audioRef.current) {
                audioRef.current.volume = vol;
              }
            }}
            className="w-20 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
        </div>
      </div>

      <TrimControls
        duration={duration}
        trimStart={trimStart}
        setTrimStart={setTrimStart}
        trimEnd={trimEnd}
        setTrimEnd={setTrimEnd}
        handleTrim={handleTrim}
      />

      <EffectsPanel handleApplyEffects={handleApplyEffects} />
    </div>
  );
}
