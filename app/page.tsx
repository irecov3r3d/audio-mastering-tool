'use client';

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Music,
  Mic,
  Scissors,
  Layers,
  Image as ImageIcon,
  Library,
  Download,
  Settings,
  PlusCircle,
  FileAudio,
  History,
  Info
} from 'lucide-react';

import SongGenerator from '@/components/SongGenerator';
import LyricEditor from '@/components/LyricEditor';
import WaveformEditor from '@/components/WaveformEditor';
import StemSeparator from '@/components/StemSeparator';
import AlbumArtGenerator from '@/components/AlbumArtGenerator';
import SongLibrary from '@/components/SongLibrary';
import FileUpload from '@/components/FileUpload';
import VoiceMemoRecorder from '@/components/VoiceMemoRecorder';

import type { Song, StemFiles } from '@/types';

type TabType = 'generate' | 'upload' | 'lyrics' | 'editor' | 'stems' | 'art' | 'library' | 'record';

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('generate');
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);

  // Load songs from localStorage on mount
  useEffect(() => {
    const savedSongs = localStorage.getItem('song-generator-songs');
    if (savedSongs) {
      try {
        const parsed = JSON.parse(savedSongs);
        setSongs(parsed.map((s: any) => ({
          ...s,
          createdAt: new Date(s.createdAt),
          updatedAt: new Date(s.updatedAt)
        })));
      } catch (e) {
        console.error('Failed to parse saved songs', e);
      }
    }
  }, []);

  // Save songs to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('song-generator-songs', JSON.stringify(songs));
  }, [songs]);

  const handleSongGenerated = (song: Song) => {
    setSongs(prev => [song, ...prev]);
    setCurrentSong(song);
    setActiveTab('library');
  };

  const handleFileUpload = (files: any) => {
    console.log('Files uploaded:', files);
    // Handle files...
    setActiveTab('editor');
  };

  const tabs = [
    { id: 'generate', label: 'Generate', icon: Sparkles },
    { id: 'record', label: 'Record', icon: Mic },
    { id: 'upload', label: 'Upload', icon: FileAudio },
    { id: 'lyrics', label: 'Lyrics', icon: PlusCircle },
    { id: 'editor', label: 'Editor', icon: Scissors },
    { id: 'stems', label: 'Stems', icon: Layers },
    { id: 'art', label: 'Art', icon: ImageIcon },
    { id: 'library', label: 'Library', icon: Library },
  ];

  return (
    <main className="min-h-screen bg-[#0a0a0b] text-white selection:bg-purple-500/30">
      {/* Navigation Sidebar */}
      <div className="fixed left-0 top-0 h-full w-20 md:w-64 bg-[#111113] border-r border-white/5 z-50 flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Music className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-xl hidden md:block bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            SongGen Pro
          </span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`
                w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200
                ${activeTab === tab.id
                  ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                }
              `}
            >
              <tab.icon className="w-5 h-5" />
              <span className="font-medium hidden md:block">{tab.label}</span>
              {activeTab === tab.id && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-500 hidden md:block" />
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5 space-y-2">
          <button className="w-full flex items-center gap-4 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
            <Settings className="w-5 h-5" />
            <span className="font-medium hidden md:block">Settings</span>
          </button>
          <div className="hidden md:block p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl">
            <p className="text-xs text-purple-300 font-medium mb-1">PRO PLAN</p>
            <p className="text-[10px] text-gray-400 mb-3">Unlimited AI Generations</p>
            <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
              <div className="w-3/4 h-full bg-gradient-to-r from-purple-500 to-pink-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="ml-20 md:ml-64 min-h-screen">
        <header className="h-20 border-b border-white/5 bg-[#0a0a0b]/80 backdrop-blur-md sticky top-0 z-40 px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold capitalize text-gray-300">
              {activeTab} Workspace
            </h2>
          </div>
          <div className="flex items-center gap-4">
             <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium transition-all">
               <History className="w-4 h-4 text-gray-400" />
               Recent Activity
             </button>
             <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-white/10 shadow-lg shadow-purple-500/20" />
          </div>
        </header>

        <div className="p-8 max-w-6xl mx-auto">
          {/* Dashboard Grid Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-2">
               <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 text-[10px] font-bold rounded uppercase tracking-wider">v2.0 Beta</span>
               <h1 className="text-4xl font-bold">
                 {activeTab === 'generate' && 'Create Something Amazing'}
                 {activeTab === 'record' && 'Capture Your Inspiration'}
                 {activeTab === 'upload' && 'Import Your Assets'}
                 {activeTab === 'lyrics' && 'Polish Your Words'}
                 {activeTab === 'editor' && 'Precision Audio Editing'}
                 {activeTab === 'stems' && 'Deconstruct the Sound'}
                 {activeTab === 'art' && 'Visualize Your Music'}
                 {activeTab === 'library' && 'Your Musical Collection'}
               </h1>
            </div>
            <p className="text-gray-400 max-w-2xl">
               {activeTab === 'generate' && 'Use advanced multi-model AI to generate professional-quality tracks from simple text prompts.'}
               {activeTab === 'record' && 'High-fidelity voice recording with real-time pitch detection and studio FX.'}
               {activeTab === 'upload' && 'Upload vocals, instrumentals, or reference tracks for AI analysis and manipulation.'}
               {activeTab === 'lyrics' && 'AI-powered lyric generation, rhyme scheme analysis, and smart structural editing.'}
               {activeTab === 'editor' && 'Interactive waveform editor with non-destructive trimming, fades, and professional audio effects.'}
               {activeTab === 'stems' && 'Separate any song into isolated vocals, drums, bass, and other instruments using state-of-the-art AI.'}
               {activeTab === 'art' && 'Generate custom high-resolution album covers that perfectly match your song\'s mood and genre.'}
               {activeTab === 'library' && 'Manage, play, and export your entire collection of AI-generated and recorded music.'}
            </p>
          </div>

          <div className="grid gap-8 overflow-hidden">
            {activeTab === 'generate' && (
              <div className="grid lg:grid-cols-[1fr_400px] gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <SongGenerator onSongGenerated={handleSongGenerated} />
                <div className="space-y-6">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Info className="w-4 h-4 text-purple-400" />
                      Pro Tip
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      Be specific with your prompts. Mention instruments, tempo, or specific artists to help the AI better understand your vision.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-6">
                    <h3 className="font-semibold mb-2">Multi-Model Engine</h3>
                    <p className="text-xs text-gray-400 mb-4">Using MusicGen, AudioCraft, and Riffusion for optimal results.</p>
                    <div className="space-y-2">
                      {['Clarity', 'Melody', 'Structure'].map((metric) => (
                        <div key={metric} className="flex items-center justify-between">
                          <span className="text-[10px] text-gray-300 uppercase">{metric}</span>
                          <div className="w-24 h-1 bg-black/40 rounded-full overflow-hidden">
                             <div className="w-[85%] h-full bg-purple-500" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'record' && (
              <div className="max-w-2xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                <VoiceMemoRecorder />
              </div>
            )}

            {activeTab === 'upload' && (
              <div className="max-w-3xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                <FileUpload onFilesUploaded={handleFileUpload} />
              </div>
            )}

            {activeTab === 'lyrics' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <LyricEditor
                   songTheme={currentSong?.prompt || ""}
                   genre={currentSong?.genre || "Pop"}
                   mood={currentSong?.mood || "Happy"}
                />
              </div>
            )}

            {activeTab === 'editor' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                {currentSong ? (
                  <WaveformEditor audioUrl={currentSong.audioUrl} />
                ) : (
                  <div className="bg-white/5 border border-dashed border-white/10 rounded-2xl p-12 text-center">
                    <FileAudio className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">Generate or upload a song first to use the editor</p>
                    <button
                      onClick={() => setActiveTab('generate')}
                      className="mt-6 px-6 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg text-sm font-medium transition-all"
                    >
                      Go to Generate
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'stems' && (
              <div className="max-w-3xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                {currentSong ? (
                  <StemSeparator audioUrl={currentSong.audioUrl} />
                ) : (
                  <div className="bg-white/5 border border-dashed border-white/10 rounded-2xl p-12 text-center">
                    <Layers className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">Generate or upload a song first to separate stems</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'art' && (
              <div className="max-w-3xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                {currentSong ? (
                  <AlbumArtGenerator
                    songTitle={currentSong.title}
                    genre={currentSong.genre}
                    mood={currentSong.mood}
                  />
                ) : (
                  <div className="bg-white/5 border border-dashed border-white/10 rounded-2xl p-12 text-center">
                    <ImageIcon className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">Generate a song first to create album art</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'library' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <SongLibrary songs={songs} />
              </div>
            )}
          </div>
        </div>

        {/* Floating Player (Optional/Placeholder) */}
        {currentSong && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-50">
            <div className="bg-[#1a1a1c]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl shadow-black flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex-shrink-0 flex items-center justify-center">
                 <Music className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate text-white">{currentSong.title}</p>
                <p className="text-xs text-gray-400 truncate">{currentSong.genre} • {currentSong.mood}</p>
              </div>
              <div className="flex items-center gap-2">
                 <button className="p-2 text-gray-400 hover:text-white transition-colors">
                   <Download className="w-5 h-5" />
                 </button>
                 <button
                   onClick={() => setActiveTab('library')}
                   className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg text-sm font-semibold transition-all"
                 >
                   Open Player
                 </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
