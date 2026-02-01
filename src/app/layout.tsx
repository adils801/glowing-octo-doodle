import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: 'FuelTrack Pro',
  description: 'Vehicle Fuel Tracking & Management System',
  manifest: '/manifest.json',
  icons: {
    apple: 'https://picsum.photos/seed/fueltrack180/180/180',
  },
  themeColor: '#5c6ac4',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
