import { Metadata } from 'next';
import { Header } from './components/header';
import './globals.css';

export const metadata: Metadata = {
    title: 'Pet Gallery',
    description: "Pet Gallery: Explore a variety of cat breeds and discover their unique personalities.",
    openGraph: {
        title: 'Pet Gallery',
        description: "Pet Gallery: Explore a variety of cat breeds and discover their unique personalities.",
    },
    robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
            index: true,
            follow: true
        }
    }
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body
            className={`antialiased`}
            cz-shortcut-listen="true"
        >
            <Header/>

            {children}
        </body>
    </html>
  );
}
