import React from 'react';
import { Metadata } from 'next'

// Component
import Table from './components/table';

export const metadata: Metadata = {
    title: 'Pet Gallery - Home',
    description: "Pet gallery, here we show all the dogs and cats breeds",
    openGraph: {
        title: 'Pet Gallery',
        description: "Pet gallery, here we show all the dogs and cats breeds",
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