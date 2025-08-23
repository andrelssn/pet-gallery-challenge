import Link from 'next/link';
import { Box, Button, Rating, Skeleton } from "@mui/material"

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

type MobileProps = {
    favorites: string[];
    reload: number;
    apiDataCat: any;
    tableLoader: boolean
    setReload: React.Dispatch<React.SetStateAction<number>>;
};

export default function Mobile(props: MobileProps) {
    const {
        apiDataCat,
        favorites,
        reload,
        tableLoader,
        setReload
    } = props;

    const handleSetFavorite = (id: string) => {
        const stored = localStorage.getItem("item");
        const favorites: string[] = stored ? JSON.parse(stored) : [];

        if (!favorites.includes(id)) {
            favorites.push(id);
        }

        localStorage.setItem("item", JSON.stringify(favorites));
        setReload(reload + 1);
    }

    const handleRemoveFavorite = (id: string) => {
        const stored = localStorage.getItem("item");

        let favorites: string[] = [];

            try {
                favorites = stored ? JSON.parse(stored) : [];
            } catch (err) {
                favorites = [];
            }

        const updatedFavorites = favorites.filter(favId => favId !== id);

        localStorage.setItem("item", JSON.stringify(updatedFavorites));
        setReload(reload + 1);
    };

    return (
        tableLoader
            ? <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", p: "20px 0px" }}>
                <Skeleton animation="wave" sx={{ width: "100%", height: "100px" }}/>
                <Skeleton variant="rectangular" animation="wave" sx={{ width: "100%", height: "200px" }}/>
                <Skeleton variant="rectangular" animation="wave" sx={{ width: "100%", height: "100px", mt: 1 }}/>
                <Skeleton variant="rectangular" animation="wave" sx={{ width: "100%", height: "100px", mt: 1 }}/>
            </Box>
            : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 mb-3">
                {apiDataCat?.length > 0 ? (
                    apiDataCat.map((item: any) => (
                        <div
                            key={item.id}
                            className="border border-gray-600 rounded-2xl p-4 shadow-sm hover:shadow-md transition bg-[var(--background2)]"
                        >
                            <div className="flex justify-between items-center mb-3">
                                <Rating
                                    max={1}
                                    value={favorites.includes(item.id) ? 1 : 0}
                                    onChange={() => {
                                    favorites.includes(item.id)
                                        ? handleRemoveFavorite(item.id)
                                        : handleSetFavorite(item.id)
                                    }}
                                    sx={{
                                        fontSize: 24,
                                        "& .MuiRating-iconEmpty": {
                                            color: "var(--text2)"
                                        }
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

                            <Button
                                size="small"
                                variant="contained"
                                component={Link}
                                href={`/pet/${item.id}`}
                                className="btn-style w-full flex items-center justify-center gap-2 text-[var(--text)]"
                            >
                                <RemoveRedEyeIcon sx={{ fontSize: 16 }} />
                                <span>View More</span>
                            </Button>
                        </div>
                    )))
                    : ( <div className="col-span-full text-center text-[var(--text2)] py-6">
                            No Results.
                        </div>
                    )}
            </div>
    )
}