import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Golf Practice Assistant',
  description: 'Track and improve your golf game',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background antialiased">{children}</body>
    </html>
  );
}