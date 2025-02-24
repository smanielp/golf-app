import './globals.css';

export const metadata = {
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
      <body>{children}</body>
    </html>
  );
}