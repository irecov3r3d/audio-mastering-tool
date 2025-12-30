# 🎵 Song Generator - AI Music Creation Platform

A beautiful, Suno-inspired web application for generating AI-powered music from text prompts. Create complete songs with custom genres, moods, and styles.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)

## ✨ Features

- **🎨 Modern UI** - Beautiful, responsive interface inspired by Suno
- **🎵 AI Music Generation** - Create songs from text descriptions
- **🎼 Genre Selection** - Choose from 12+ music genres (Pop, Rock, Jazz, Electronic, etc.)
- **😊 Mood Control** - Set the emotional tone (Happy, Sad, Energetic, Chill, etc.)
- **⏱️ Duration Control** - Generate songs from 30 seconds to 5 minutes
- **🎧 Audio Player** - Built-in player with playback controls, volume, and progress bar
- **📚 Song Library** - View and manage all your generated songs
- **⬇️ Download** - Save your creations as MP3 files
- **🚀 Fast & Responsive** - Built with Next.js 15 and React 19

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ONE-Hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 How to Use

1. **Describe Your Song** - Enter a text description of the song you want to create
   - Example: "An upbeat summer anthem about friendship and adventure"

2. **Select Genre** - Choose from Pop, Rock, Hip Hop, Electronic, Jazz, and more

3. **Choose Mood** - Set the emotional tone: Happy, Sad, Energetic, Chill, etc.

4. **Set Duration** - Use the slider to select song length (30 seconds to 5 minutes)

5. **Generate** - Click the "Generate Song" button and wait for AI to create your music

6. **Play & Download** - Use the audio player to listen and download your creation

## 🔧 Project Structure

```
ONE-Hub/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts          # Song generation API endpoint
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main page
├── components/
│   ├── AudioPlayer.tsx           # Audio playback component
│   ├── SongGenerator.tsx         # Song creation form
│   └── SongLibrary.tsx           # Generated songs list
├── public/                       # Static assets
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
└── package.json                  # Dependencies
```

## 🤖 AI Integration

Currently, the app uses **placeholder audio** for demonstration. To integrate real AI music generation:

### Option 1: Suno API (Recommended)
```typescript
// In app/api/generate/route.ts
const response = await fetch('https://api.suno.ai/generate', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.SUNO_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    prompt: body.prompt,
    genre: body.genre,
    duration: body.duration,
  }),
});
```

### Option 2: MusicGen (Meta)
Use Replicate or Hugging Face API:
```typescript
const response = await fetch('https://api.replicate.com/v1/predictions', {
  method: 'POST',
  headers: {
    'Authorization': `Token ${process.env.REPLICATE_API_TOKEN}`,
  },
  body: JSON.stringify({
    version: 'facebook/musicgen-large',
    input: { prompt: body.prompt },
  }),
});
```

### Option 3: Riffusion
Text-to-audio using spectrograms:
```typescript
const response = await fetch('https://api.replicate.com/v1/predictions', {
  method: 'POST',
  body: JSON.stringify({
    version: 'riffusion/riffusion',
    input: { prompt_a: body.prompt },
  }),
});
```

### Environment Variables

Create a `.env.local` file:
```env
# Choose your AI music provider
SUNO_API_KEY=your_suno_api_key
# OR
REPLICATE_API_TOKEN=your_replicate_token
# OR
HUGGINGFACE_API_KEY=your_hf_key
```

## 🎨 Customization

### Modify Genres
Edit the genres array in `components/SongGenerator.tsx`:
```typescript
const genres = [
  'Pop', 'Rock', 'Hip Hop', 'Electronic', 'Jazz', 'Classical',
  // Add your custom genres here
  'Reggae', 'Blues', 'Gospel', 'Opera'
];
```

### Change Color Scheme
Update Tailwind colors in `tailwind.config.ts`:
```typescript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
      secondary: '#your-color',
    },
  },
}
```

### Adjust Duration Range
Modify the duration slider in `components/SongGenerator.tsx`:
```typescript
<input
  type="range"
  min="30"    // Change minimum duration
  max="600"   // Change maximum duration (10 minutes)
  step="30"
  ...
/>
```

## 📦 Building for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

The optimized build will be created in the `.next` folder.

## 🚢 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

### Other Platforms
- **Netlify**: Connect your Git repository
- **Railway**: One-click deploy
- **AWS/GCP**: Deploy as containerized app

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4
- **Icons**: Lucide React
- **Audio**: HTML5 Audio API
- **Runtime**: Node.js 18+

## 📝 API Reference

### POST /api/generate

Generate a new song.

**Request Body:**
```json
{
  "prompt": "An upbeat summer song",
  "genre": "Pop",
  "mood": "Happy",
  "duration": 120
}
```

**Response:**
```json
{
  "id": "uuid",
  "title": "Generated Song Title",
  "prompt": "An upbeat summer song",
  "genre": "Pop",
  "mood": "Happy",
  "duration": 120,
  "audioUrl": "https://...",
  "createdAt": "2025-01-01T00:00:00.000Z"
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Inspired by [Suno AI](https://suno.ai)
- Icons by [Lucide](https://lucide.dev)
- Sample audio from [SoundHelix](https://www.soundhelix.com)

## 📧 Support

For questions or support, please open an issue in the repository.

---

Built with ❤️ using Next.js and TypeScript
