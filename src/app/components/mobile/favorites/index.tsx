import Link from 'next/link';
import { Box, Button, Rating, Skeleton } from "@mui/material"

// Icons
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

// Components
import { CatItem } from '../../type/type';

type MobileProps = {
    favorites: CatItem[];
    reload: number;
    setReload: React.Dispatch<React.SetStateAction<number>>;
};

export default function FavoritesMobile(props: MobileProps) {
    const {
        favorites,
        reload,
        setReload
    } = props;

    const handleSetFavorite = (item: any) => {
        const stored = localStorage.getItem("item");
        const favorites: any[] = stored ? JSON.parse(stored) : [];

        const exists = favorites.some(fav => fav.id === item.id);
        if (!exists) {
            favorites.push(item);
        }

        localStorage.setItem("item", JSON.stringify(favorites));
        setReload(reload + 1);
    };

    const handleRemoveFavorite = (id: string) => {
        const stored = localStorage.getItem("item");
        let favorites: any[] = stored ? JSON.parse(stored) : [];

        const updatedFavorites = favorites.filter(favItem => favItem.id !== id);

        localStorage.setItem("item", JSON.stringify(updatedFavorites));
        setReload(reload + 1);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 mb-3">
            {favorites?.length > 0 ? (
                favorites.map((item: any) => (
                    <div
                        key={item.id}
                        className="border border-gray-600 rounded-2xl p-4 shadow-sm hover:shadow-md transition bg-[var(--background2)]"
                    >
                        <div className="flex justify-between items-center mb-3">
                            <Rating
                                max={1}
                                value={favorites.some(fav => fav.id === item.id) ? 1 : 0}
                                onChange={() =>
                                    favorites.some(fav => fav.id === item.id)
                                        ? handleRemoveFavorite(item.id)
                                        : handleSetFavorite(item)
                                }
                                sx={{
                                    fontSize: 22,
                                    "& .MuiRating-iconEmpty": { color: "var(--text2)" },
                                }}
                            />
                            <span className="text-sm text-[var(--text2)]">ID: {item.id}</span>
                        </div>

                        <div className="mb-3">
                            <h3 className="text-lg font-semibold text-[var(--text3)]">
                                {item.name}
                            </h3>

                            <p className="text-sm text-[var(--text2)]">{item.origin}</p>
                        </div>

                        <Link href={`/pet/${item.id}`}>
                            <Button
                                size="small"
                                variant="contained"
                                className="btn-style w-full flex items-center justify-center gap-2 text-[var(--text)]"
                            >
                                <RemoveRedEyeIcon sx={{ fontSize: 16 }} />
                                <span>View More</span>
                            </Button>
                        </Link>
                    </div>
                )))
                : ( <div className="col-span-full text-center text-[var(--text2)] py-6">
                        Your favorites list is empty 😺 <br/>
                        <Link href={"/"} className='text-[var(--theme)]'>Click here</Link> to discover amazing breeds on the main page.
                    </div>
                )}
        </div>
    )
}