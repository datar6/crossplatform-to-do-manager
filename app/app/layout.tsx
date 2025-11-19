import type { Metadata } from 'next';
import './globals.css';
import { QueryProvider } from '../providers/query-provider';

export const metadata: Metadata = {
  title: 'Todo Manager',
  description: 'Cross-platform Todo Application',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light">
      <body className="antialiased">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
