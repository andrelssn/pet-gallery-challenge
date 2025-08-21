import Link from 'next/link';

export function Header() {
    return (
        <header
            style={{
                display: "flex",
                backgroundColor: "#1976d2",
                color: "#ffffffff",
                justifyContent: "space-between",
                height: 50,
                alignItems: "center",
                paddingLeft: 10
            }}
        >
            <h1 className="font-bold text-[20px]">
                <Link href={'/'} style={{ marginRight: 10, fontWeight: "bold" }}>
                    Pet Gallery
                </Link>
            </h1>
        </header>
    )
}