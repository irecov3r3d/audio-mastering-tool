import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Song Generator - AI Music Creation',
  description: 'Create amazing songs with AI - Generate music from text prompts',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
