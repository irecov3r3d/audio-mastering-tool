# 🚀 Setup Guide - Beat Suno with Multi-Model AI

This guide will help you set up the **professional-grade AI music generation system** that beats Suno through multi-model ensemble and professional mastering.

---

## 🎯 Our Competitive Advantage

### Why This Beats Suno:

1. **Multi-Model Ensemble** - We use 3+ AI models and pick the best result
   - Suno: Single proprietary model
   - Us: MusicGen + AudioCraft + Riffusion (best of all worlds)

2. **Professional Mastering** - Studio-quality final output
   - Suno: Basic normalization
   - Us: LANDR API or custom mastering chain

3. **Quality Ranking** - AI judges which generation is best
   - Suno: You get what you get
   - Us: Only the best makes it through

4. **Refinement Pipeline** - Audio enhancement before delivery
   - Suno: Raw AI output
   - Us: Cleaned, polished, and mastered

5. **Flexibility** - Swap models, adjust quality, compare versions
   - Suno: Black box
   - Us: Full control

---

## 📋 Prerequisites

- Node.js 18+ installed
- Git installed
- Credit card for API services (estimated $50-200/month depending on usage)
- Basic understanding of environment variables

---

## 🔧 Step 1: Get API Keys

### Required Services:

#### 1. **Replicate** (For AI Models) - REQUIRED
   - Visit: https://replicate.com
   - Sign up for an account
   - Go to Account → API Tokens
   - Create a new token
   - **Cost**: ~$0.05 per song generation
   - **Free Tier**: $5 credit to start

#### 2. **LANDR** (For Professional Mastering) - OPTIONAL but RECOMMENDED
   - Visit: https://www.landr.com/api
   - Sign up for API access
   - Get your API key
   - **Cost**: ~$0.10-0.20 per master
   - **Alternative**: Use custom mastering chain (free)

#### 3. **OpenAI** or **Anthropic** (For Lyrics) - OPTIONAL
   - OpenAI: https://platform.openai.com/api-keys
   - Anthropic: https://console.anthropic.com/
   - **Cost**: ~$0.01-0.05 per lyric generation

#### 4. **DALL-E** or **Stability AI** (For Album Art) - OPTIONAL
   - Same as OpenAI above, or
   - Stability AI: https://platform.stability.ai/
   - **Cost**: ~$0.02-0.08 per image

---

## 🛠️ Step 2: Configure Environment Variables

1. Create `.env.local` in the project root:

```bash
cd ONE-Hub
cp .env.example .env.local
```

2. Open `.env.local` and add your API keys:

```env
# ========================================
# REQUIRED - Music Generation
# ========================================
REPLICATE_API_TOKEN=your_replicate_token_here

# ========================================
# OPTIONAL BUT RECOMMENDED - Pro Mastering
# ========================================
LANDR_API_KEY=your_landr_key_here

# ========================================
# OPTIONAL - Lyrics Generation
# ========================================
# Use ONE of these:
OPENAI_API_KEY=your_openai_key_here
# OR
ANTHROPIC_API_KEY=your_anthropic_key_here

# ========================================
# OPTIONAL - Album Art
# ========================================
# Uses OPENAI_API_KEY if set, or:
STABILITY_API_KEY=your_stability_key_here

# ========================================
# OPTIONAL - Advanced Features
# ========================================
# For stem separation (if using cloud service):
LALAL_AI_API_KEY=your_lalal_key_here

# For cloud storage (recommended for production):
AWS_S3_BUCKET=your-bucket-name
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
```

---

## 🎵 Step 3: Test the Multi-Model System

### Basic Test:

```bash
# Start the development server
npm run dev
```

Visit http://localhost:3000

1. Go to **Generate** tab
2. Enter a prompt: "upbeat summer anthem about adventure"
3. Select genre: Pop
4. Select mood: Happy
5. Click **Generate Song**

You should see:
- ✅ Multi-model generation status
- ✅ Quality ranking progress
- ✅ Mastering progress
- ✅ Final high-quality audio

### Advanced Test (Comparison Mode):

Test the API directly to see all generations:

```bash
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "epic orchestral piece",
    "genre": "Classical",
    "mood": "Epic",
    "duration": 120,
    "enableComparison": true
  }'
```

This returns:
- All 3 model generations
- Quality scores for each
- Which one was selected as best

---

## 📊 Step 4: Understanding Quality Metrics

When a song is generated, these metrics determine quality:

### Quality Metrics Explained:

1. **Spectral Clarity** (0-1)
   - Measures high-frequency content quality
   - Good: > 0.7
   - Excellent: > 0.9

2. **Dynamic Range** (dB)
   - Difference between loud and soft parts
   - Good: 8-14 dB
   - Suno typically: 6-8 dB

3. **Stereo Width** (0-1)
   - How wide the stereo image is
   - Good: > 0.7
   - Mono: 0, Wide stereo: 1

4. **Frequency Balance** (0-1)
   - How balanced the spectrum is (bass/mids/highs)
   - Good: > 0.7

5. **Prompt Adherence** (0-1)
   - How well the audio matches the prompt
   - AI-judged

6. **Overall Score** (0-1)
   - Weighted average of all metrics
   - Good: > 0.7
   - Excellent: > 0.85

---

## 🎚️ Step 5: Mastering Presets

Choose the right mastering preset for your use case:

### Streaming (Default) - Best for Spotify, Apple Music
```javascript
{
  targetLoudness: -14,  // Industry standard
  ceilingLevel: -1.0,
  stereoWidth: 0.8,
  addWarmth: true
}
```

### Club/DJ - Loud and punchy
```javascript
{
  targetLoudness: -9,
  ceilingLevel: -0.5,
  stereoWidth: 0.9,
  addWarmth: false
}
```

### Radio - Competitive loudness
```javascript
{
  targetLoudness: -11,
  ceilingLevel: -0.3,
  stereoWidth: 0.7,
  addWarmth: true,
  addAnalogCharacter: true
}
```

### Audiophile - Maximum dynamic range
```javascript
{
  targetLoudness: -16,
  ceilingLevel: -2.0,
  stereoWidth: 1.0,
  addWarmth: true,
  addAnalogCharacter: true
}
```

---

## 🔬 Step 6: Model Selection Strategies

Choose the right strategy for your needs:

### Available Strategies:

1. **ensemble-top3** (Default - RECOMMENDED)
   - Uses MusicGen, AudioCraft, and Riffusion
   - Picks the best result
   - Balance of speed and quality
   - **Cost**: ~$0.15 per generation
   - **Time**: ~2-3 minutes

2. **best-quality**
   - Uses only MusicGen (highest quality single model)
   - Fast and reliable
   - **Cost**: ~$0.05 per generation
   - **Time**: ~45 seconds

3. **fastest**
   - Uses quickest model (usually Riffusion)
   - Good for iterations
   - **Cost**: ~$0.03 per generation
   - **Time**: ~30 seconds

4. **ensemble-all**
   - Uses ALL enabled models
   - Maximum quality potential
   - **Cost**: ~$0.20+ per generation
   - **Time**: ~3-5 minutes

5. **adaptive**
   - Analyzes your prompt and chooses best models
   - Smart selection
   - **Cost**: Varies
   - **Time**: Varies

### Usage Example:

```typescript
const response = await fetch('/api/generate', {
  method: 'POST',
  body: JSON.stringify({
    prompt: "epic battle theme",
    genre: "Orchestral",
    mood: "Epic",
    duration: 180,
    strategy: "ensemble-all",  // Use all models for max quality
    enableMastering: true       // Apply pro mastering
  })
});
```

---

## 📈 Step 7: Cost Optimization

### Estimated Costs:

| Usage Level | Generations/Month | Cost/Month |
|-------------|-------------------|------------|
| Light | 50 songs | $10-20 |
| Medium | 200 songs | $40-80 |
| Heavy | 1000 songs | $200-400 |
| Enterprise | 10,000 songs | $2,000-4,000 |

### Cost-Saving Tips:

1. **Use caching** - Store and reuse similar generations
2. **Start with "fastest"** - Iterate quickly, then use "ensemble" for finals
3. **Skip mastering in dev** - Only master final versions
4. **Batch process** - Generate multiple at once
5. **Use free tier first** - Replicate gives $5 free credit

---

## 🚀 Step 8: Production Deployment

### Vercel Deployment (Recommended):

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
vercel env add REPLICATE_API_TOKEN
vercel env add LANDR_API_KEY
# ... add all other keys
```

### Environment Variables on Vercel:
1. Go to your project on Vercel dashboard
2. Settings → Environment Variables
3. Add all keys from `.env.local`
4. Redeploy

---

## 🧪 Step 9: A/B Testing Against Suno

### Blind Test Protocol:

1. Generate the same prompt on both platforms:
   ```
   Prompt: "Upbeat electronic dance track with catchy melody"
   Genre: Electronic
   Mood: Energetic
   ```

2. Export both versions

3. Blind test with users:
   - Label them "A" and "B" randomly
   - Ask which sounds better
   - Track preferences

4. Measure technical quality:
   - Use the `/api/analyze` endpoint
   - Compare spectral clarity, dynamic range
   - Check loudness normalization

### Expected Results:
- Our mastered version should score 60-70% preference
- Technical metrics should be superior
- Especially stereo width and dynamic range

---

## 🛟 Troubleshooting

### Issue: "AI service not configured" error

**Solution**: Add `REPLICATE_API_TOKEN` to `.env.local`

### Issue: Generation takes too long

**Solutions**:
1. Use `strategy: "fastest"`
2. Reduce duration
3. Check Replicate API status
4. Try generating directly without ensemble

### Issue: Low quality output

**Solutions**:
1. Enable mastering: `enableMastering: true`
2. Use better models: `strategy: "ensemble-all"`
3. Improve your prompt (be specific)
4. Check quality metrics in response

### Issue: API costs too high

**Solutions**:
1. Cache generations
2. Use "best-quality" strategy (single model)
3. Reduce parallel generations
4. Skip mastering in development

---

## 📞 Support

### Need Help?
- Check the README.md for features
- Review API documentation in code comments
- Open an issue on GitHub
- Check Replicate docs: https://replicate.com/docs

### Want to Contribute?
- Add new AI models to the ensemble
- Improve quality metrics
- Add more mastering presets
- Build mobile apps

---

## 🎯 Next Steps

1. ✅ Add API keys
2. ✅ Test generation
3. ✅ Try comparison mode
4. ✅ Experiment with strategies
5. ✅ Deploy to production
6. 🚀 **Beat Suno!**

---

**Ready to create professional-quality AI music?**

Run `npm run dev` and start generating! 🎵

