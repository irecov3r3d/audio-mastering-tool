'use client';

import { useState } from 'react';
import {
  AudioLines,
  AudioWaveform,
  CassetteTape,
  CirclePlus,
  FastForward,
  FolderLock,
  Gauge,
  Headphones,
  Layers,
  Mic,
  Move,
  Pause,
  Play,
  Rewind,
  SlidersHorizontal,
  Sparkles,
  Tag,
  Wand2,
} from 'lucide-react';

const spectralBars = [
  40, 55, 32, 70, 48, 64, 22, 78, 56, 38, 66, 28, 62, 50, 74, 44, 58, 34, 68,
  46,
];

const tracks = Array.from({ length: 12 }, (_, index) => ({
  id: index + 1,
  name: `Track ${index + 1}`,
  tag: index % 2 === 0 ? 'Verse' : 'Hook',
  color: index % 3 === 0 ? 'bg-purple-500/30' : 'bg-blue-500/30',
}));

export default function Home() {
  const [workspace, setWorkspace] = useState<'recording' | 'mixing'>('recording');
  const [spectralVisible, setSpectralVisible] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-950 via-black to-blue-950 text-white">
      <header className="border-b border-white/10 bg-black/40 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                <Mic className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Vault Voice Recorder Studio</h1>
                <p className="text-purple-200 text-sm">
                  Dub-track ready recorder, mixer, and lyric vault with pro-level
                  processing.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setWorkspace('recording')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${workspace === 'recording'
                  ? 'bg-purple-500'
                  : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                Recording Room
              </button>
              <button
                onClick={() => setWorkspace('mixing')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${workspace === 'mixing'
                  ? 'bg-purple-500'
                  : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                Mixing Room
              </button>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm">
              <Play className="w-4 h-4" />
              Play
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm">
              <Pause className="w-4 h-4" />
              Pause
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm">
              <Rewind className="w-4 h-4" />
              Rewind
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm">
              <FastForward className="w-4 h-4" />
              Fast Forward
            </button>
            <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-white/10 text-sm">
              <AudioWaveform className="w-4 h-4 text-purple-300" />
              <span className="text-gray-300">Scrub Wheel</span>
              <input type="range" className="w-24 accent-purple-400" />
            </div>
            <button
              onClick={() => setSpectralVisible(prev => !prev)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm"
            >
              <AudioLines className="w-4 h-4" />
              Spectral View
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-10 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <section className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-semibold">Dub Track Timeline</h2>
                <p className="text-gray-300 text-sm">
                  12-track arranger with move, merge, fades, and bus routing.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-sm">
                  <CirclePlus className="w-4 h-4" />
                  Add Track
                </button>
                <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm">
                  <Layers className="w-4 h-4" />
                  Add Bus
                </button>
              </div>
            </div>
            <div className="space-y-3">
              {tracks.map(track => (
                <div
                  key={track.id}
                  className="flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-black/30 p-3"
                >
                  <div className="flex items-center gap-3 min-w-[180px]">
                    <div className={`w-12 h-12 rounded-lg ${track.color}`} />
                    <div>
                      <p className="font-semibold">{track.name}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-300">
                        <Tag className="w-3 h-3" />
                        {track.tag}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    <div className="h-10 rounded-lg bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-transparent border border-white/10" />
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-300">
                    <span className="flex items-center gap-1">
                      <Move className="w-4 h-4" />
                      Drag
                    </span>
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-4 h-4" />
                      Fade In/Out
                    </span>
                    <button className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20">
                      Merge
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {workspace === 'mixing' && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-semibold">Mixing Room</h2>
                  <p className="text-gray-300 text-sm">
                    Dial in panning, compression, gate, 12-band EQ, and reverb.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-300">
                  <CassetteTape className="w-4 h-4" />
                  Session: “Broken Phone Memo Vault”
                </div>
              </div>
              <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="space-y-4">
                  <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                    <h3 className="text-sm font-semibold mb-4">Mixer Channels</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {['Lead Vox', 'Dub Vox', 'Harmony', 'Adlibs'].map(channel => (
                        <div
                          key={channel}
                          className="rounded-lg border border-white/10 bg-white/5 p-3 text-xs text-gray-300"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-white">{channel}</span>
                            <span className="text-purple-300">Bus A</span>
                          </div>
                          <div className="space-y-3">
                            <label className="flex items-center justify-between">
                              <span>Pan</span>
                              <input type="range" className="w-24 accent-purple-400" />
                            </label>
                            <label className="flex items-center justify-between">
                              <span>Reverb</span>
                              <input type="range" className="w-24 accent-purple-400" />
                            </label>
                            <label className="flex items-center justify-between">
                              <span>Compression</span>
                              <input type="range" className="w-24 accent-purple-400" />
                            </label>
                            <label className="flex items-center justify-between">
                              <span>Gate</span>
                              <input type="range" className="w-24 accent-purple-400" />
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                    <h3 className="text-sm font-semibold mb-3">12-Band EQ</h3>
                    <div className="grid grid-cols-6 gap-2 text-xs text-gray-400">
                      {Array.from({ length: 12 }, (_, index) => (
                        <div key={index} className="flex flex-col items-center gap-2">
                          <div className="h-20 w-6 rounded-full bg-gradient-to-t from-purple-600/70 to-white/10" />
                          <span>{index + 1}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                    <h3 className="text-sm font-semibold mb-3">Bus &amp; Output</h3>
                    <div className="space-y-3 text-xs text-gray-300">
                      <div className="flex items-center justify-between">
                        <span>Bus Compression</span>
                        <span className="text-white">Glue 35%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Limiter</span>
                        <span className="text-white">Ceiling -0.3 dB</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Output Gain</span>
                        <span className="text-white">-1.2 dB</span>
                      </div>
                    </div>
                    <div className="mt-4 space-y-3">
                      <label className="text-xs text-gray-400">Output Level</label>
                      <input type="range" className="w-full accent-purple-400" />
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                    <h3 className="text-sm font-semibold mb-3">Export Options</h3>
                    <div className="grid gap-2 text-xs text-gray-300">
                      <button className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20">
                        Export All Tracks
                      </button>
                      <button className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20">
                        Export Stems
                      </button>
                      <button className="px-3 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 font-semibold">
                        Render Mixdown
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Session Vault</h3>
              <Headphones className="w-5 h-5 text-purple-300" />
            </div>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-center justify-between rounded-lg bg-black/40 px-3 py-2">
                <span>Lyric Scratchpad</span>
                <span className="text-xs text-purple-300">Synced</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-black/40 px-3 py-2">
                <span>Hook Concepts</span>
                <span className="text-xs text-purple-300">Tagged</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-black/40 px-3 py-2">
                <span>Audio Vault</span>
                <span className="text-xs text-purple-300">12 items</span>
              </div>
            </div>
            <button className="mt-4 w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm">
              <Tag className="w-4 h-4" />
              Tag &amp; Store Everything
            </button>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Realtime Analysis</h3>
              <Gauge className="w-5 h-5 text-purple-300" />
            </div>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-center justify-between">
                <span>Pitch Detection</span>
                <span className="text-white">E♭4</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Noise Floor</span>
                <span className="text-white">-54 dB</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Latency</span>
                <span className="text-white">8.2 ms</span>
              </div>
            </div>
            <div className="mt-4 rounded-lg bg-black/40 p-3 text-xs text-gray-300">
              Auto-tune follows pitch changes instantly, with realtime correction previews.
            </div>
          </div>

          {workspace === 'recording' && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-semibold">Recording Room</h3>
                  <p className="text-gray-300 text-sm">
                    Capture vocals with pitch detection, auto-tune, and vault tagging.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-300">
                  <CassetteTape className="w-4 h-4" />
                  Session: “Broken Phone Memo Vault”
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                  <h4 className="text-sm font-semibold mb-3">Live Capture</h4>
                  <div className="flex items-center gap-3 text-sm text-gray-300 mb-4">
                    <Mic className="w-4 h-4 text-purple-300" />
                    Input: SM7B • Gain 62%
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs text-gray-400">Input Gain</label>
                    <input type="range" className="w-full accent-purple-400" />
                    <label className="text-xs text-gray-400">Monitor Mix</label>
                    <input type="range" className="w-full accent-purple-400" />
                  </div>
                  <button className="mt-4 w-full py-3 rounded-lg bg-purple-500 hover:bg-purple-600 font-semibold">
                    Arm &amp; Record
                  </button>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                  <h4 className="text-sm font-semibold mb-3">Pitch Intelligence</h4>
                  <div className="flex items-center justify-between text-sm text-gray-300 mb-4">
                    <span className="flex items-center gap-2">
                      <Wand2 className="w-4 h-4 text-purple-300" />
                      Auto-Tune Follow
                    </span>
                    <span className="px-3 py-1 rounded-full bg-purple-500/30 text-xs">
                      Active
                    </span>
                  </div>
                  <div className="space-y-3 text-xs text-gray-300">
                    <div className="flex items-center justify-between">
                      <span>Key Target</span>
                      <span className="text-white">A Minor</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Pitch Detection</span>
                      <span className="text-white">Realtime</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Correction Speed</span>
                      <span className="text-white">Fast</span>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                  <h4 className="text-sm font-semibold mb-3">Voice FX Presets</h4>
                  <div className="grid gap-3 text-sm text-gray-300">
                    <div className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
                      <span>Broken Phone</span>
                      <span className="text-xs text-purple-300">Preset</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
                      <span>Warm Tube</span>
                      <span className="text-xs text-purple-300">Preset</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
                      <span>Airy Double</span>
                      <span className="text-xs text-purple-300">Preset</span>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                  <h4 className="text-sm font-semibold mb-3">Vault Tags &amp; Storage</h4>
                  <div className="flex flex-wrap gap-2 text-xs text-gray-300 mb-3">
                    {['Hook Ideas', 'Verse Vault', 'Freestyle', 'Adlibs'].map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-white/10">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm">
                    <FolderLock className="w-4 h-4" />
                    Save to Vault
                  </button>
                </div>
              </div>
            </div>
          )}

          {spectralVisible && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Spectral Analysis</h3>
                <SlidersHorizontal className="w-5 h-5 text-purple-300" />
              </div>
              <div className="flex items-end gap-2 h-32">
                {spectralBars.map((height, index) => (
                  <div
                    key={index}
                    style={{ height: `${height}%` }}
                    className="flex-1 rounded-full bg-gradient-to-t from-purple-600/80 to-pink-400/40"
                  />
                ))}
              </div>
              <p className="mt-3 text-xs text-gray-400">
                Toggle spectral view on demand to keep the main workspace focused.
              </p>
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}
