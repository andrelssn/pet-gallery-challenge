import Link from 'next/link';
import { Box, Button, Rating, Skeleton } from "@mui/material"

// Icons
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import PublicIcon from '@mui/icons-material/Public';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import StarRateIcon from '@mui/icons-material/StarRate';

// Components
import { CatItem } from '../../type/type';

type DesktopProps = {
    favorites: CatItem[];
    reload: number;
    setReload: React.Dispatch<React.SetStateAction<number>>;
};

export default function FavoritesDesktop(props: DesktopProps) {
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
        <table className="w-full text-sm text-left rtl:text-right text-[var(--text2)] rounded-xl overflow-hidden border border-[var(--border)]">
            <thead className="bg-[var(--panel)] text-[var(--theme)] uppercase text-xs tracking-wide">
                <tr>
                    <th scope="col" className="px-3 py-3 font-medium">
                        <div className="flex items-center gap-1">
                            <StarRateIcon sx={{ fontSize: 14 }} />
                            <span>Favorite</span>
                        </div>
                    </th>

                    <th scope="col" className="px-6 py-3 font-medium">ID</th>

                    <th scope="col" className="px-6 py-3 font-medium">
                        <div className="flex items-center gap-1">
                            <HelpCenterIcon sx={{ fontSize: 14 }} />
                            <span>Breed</span>
                        </div>
                    </th>

                    <th scope="col" className="px-6 py-3 font-medium">
                        <div className="flex items-center gap-1">
                            <PublicIcon sx={{ fontSize: 14 }} />
                            <span>Origin</span>
                        </div>
                    </th>

                    <th scope="col" className="px-6 py-3 text-center font-medium">Action</th>
                </tr>
            </thead>

            <tbody className="divide-y divide-gray-700">
                {favorites?.length > 0 ? (
                    favorites.map((item: any) => (
                        <tr
                            key={item.id}
                            className="bg-[var(--background)]/40 hover:bg-[var(--panel)] transition-colors duration-200"
                        >
                            <td className="px-6 py-4 w-[120px]">
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
                            </td>

                            <td className="px-6 py-4 text-[var(--text2)]">{item.id}</td>

                            <td className="px-6 py-4 font-medium text-[var(--text3)] whitespace-nowrap">
                                {item.name}
                            </td>

                            <td className="px-6 py-4 text-[var(--text2)]">{item.origin}</td>

                            <td className="px-6 py-4 text-center">
                                <Link href={`/pet/${item.id}`}>
                                    <Button
                                        size="medium"
                                        variant="contained"
                                        className="btn-style shadow-md hover:shadow-lg transition-all flex items-center gap-1 px-2 py-1 text-[var(--text)]"
                                    >
                                        <RemoveRedEyeIcon sx={{ fontSize: 16 }} />
                                        <span>View More</span>
                                    </Button>
                                </Link>
                            </td>
                        </tr>
                    ))
                ) : (
                <tr>
                    <td
                        colSpan={999}
                        className="px-4 py-6 text-center text-[var(--text2)]"
                    >
                        Your favorites list is empty 😺 <br/>
                        <Link href={"/"} className='text-[var(--theme)]'>Click here</Link> to discover amazing breeds on the main page.
                    </td>
                </tr>
            )}
            </tbody>
        </table>
    )
}