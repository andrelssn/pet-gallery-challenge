import React from 'react';
import { Metadata } from 'next'

// Component
import Table from './components/table';

export const metadata: Metadata = {
    title: 'Pet Gallery - Home',
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

export const revalidate = 60;

export default function Home() {
    return (
        <section>
            <Table/>
        </section>
    )
}