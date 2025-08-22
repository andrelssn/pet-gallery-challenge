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
                borderBottom: "1px solid #1976d2"
            }}
            className='blue-bg'
        >
            <h1 className="font-bold text-[20px]">
                <Link href={'/'} style={{ marginRight: 10, fontWeight: "bold", display: "flex", gap: 5 }}>
                    <Image src={logo} alt="Logo" width={30} height={20} />
                    <span>Pet Gallery</span>
                </Link>
            </h1>
        </header>
    )
}