import Link from 'next/link';

import logo from '../../images/pet.png';

import Image from 'next/image';

export function Header() {
    return (
        <header
            className="flex flex-col md:flex-row md:justify-between items-center text-white h-auto md:h-[70px] p-4 bg-[var(--panel)]"
        >
            <h1 className="font-bold text-[20px] mb-2 md:mb-0">
                <Link
                    href="/"
                    className="flex items-center gap-2 font-bold text-[var(--theme)]"
                >
                    <Image alt="pet-gallery" src={logo} width={30} />
                    <span>Pet Gallery</span>
                </Link>
            </h1>

            <div className="text-[var(--text2)] text-[12px] text-center md:text-right">
                Pet Gallery © 2025 | All rights reserved
            </div>
        </header>
    )
}