import type { Metadata } from 'next';
import { Inter, Playfair_Display, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import Navigation from '@/components/Navigation';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' });

export const metadata: Metadata = {
  title: 'BlueMonitor Intelligence',
  description: 'Hybrid water intelligence platform for SDG-6',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={cn("min-h-screen bg-background font-sans antialiased text-white", inter.variable, playfair.variable, spaceGrotesk.variable)}>
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
