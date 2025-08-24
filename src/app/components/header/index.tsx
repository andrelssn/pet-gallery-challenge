import Link from 'next/link';

import logo from '../../images/pet.png';

import Image from 'next/image';

export function Header() {
    return (
        <header className="flex flex-col md:flex-row items-center justify-between w-full px-6 py-4 md:py-3 bg-gradient-to-r from-[var(--panel)] to-[var(--background)] shadow-md backdrop-blur-md">
            <h1 className="text-[20px] md:text-[24px] font-extrabold flex items-center gap-3 md:gap-4 transition-all">
                <Link
                    href="/"
                    className="flex items-center gap-2 md:gap-3 group"
                >
                    <Image
                        alt="pet-gallery"
                        src={logo}
                        width={36}
                        className="transition-transform duration-300 group-hover:scale-110"
                    />
                    <span className="text-glow text-xl md:text-2xl">
                        Pet Gallery
                    </span>
                </Link>
            </h1>

            <div className="text-[var(--text2)] text-xs md:text-sm text-center md:text-right mt-2 md:mt-0">
                Pet Gallery © 2025 | All rights reserved
            </div>
        </header>
    )
}