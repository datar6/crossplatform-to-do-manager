import type { Metadata } from 'next';
import { QueryProvider } from 'providers/query-provider';
import { ThemeProvider } from 'providers/theme-provider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Todo Manager',
  description: 'Cross-platform Todo Application',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
