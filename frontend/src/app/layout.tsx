import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';

import './globals.css';
import { Header } from '@/components/Header';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Puro Pollo - Prueba Técnica Fullstack',
  description: 'Prueba técnica fullstack para Puro Pollo',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-MX">
      <body className={`${montserrat.variable} antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
