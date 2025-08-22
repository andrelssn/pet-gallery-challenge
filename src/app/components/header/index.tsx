import Link from 'next/link';

import PetsIcon from '@mui/icons-material/Pets';

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
                backgroundColor: "#ffffff",
                borderBottom: "1px solid var(--theme)"
            }}
        >
            <h1 className="font-bold text-[20px]">
                <Link href={'/'} style={{ marginRight: 10, fontWeight: "bold", display: "flex", color: "var(--theme)", gap: 5 }}>
                    <PetsIcon sx={{ fontSize: 26, mt: 0.2 }}/>
                    <span>Pet Gallery</span>
                </Link>
            </h1>

            <div className='text-gray-600 text-[12px]'>
                Pet Gallery © 2025 | All rights reserved
            </div>
        </header>
    )
}