import Link from 'next/link';

import logo from '../../images/pet.png';

import Image from 'next/image';

export function Header() {
    return (
        <header
            style={{
                display: "flex",
                color: "#ffffffff",
                justifyContent: "space-between",
                height: 70,
                alignItems: "center",
                padding: 15,
                backgroundColor: "var(--panel)",
            }}
        >
            <h1 className="font-bold text-[20px]">
                <Link href={'/'} style={{ marginRight: 10, fontWeight: "bold", display: "flex", color: "var(--theme)", gap: 5 }}>
                    <Image alt='pet-gallery' src={logo} width={30}/>
                    <span>Pet Gallery</span>
                </Link>
            </h1>

            <div className='text-[var(--text2)] text-[12px]'>
                Pet Gallery © 2025 | All rights reserved
            </div>
        </header>
    )
}