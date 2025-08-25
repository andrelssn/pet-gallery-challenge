'use client'

import React from "react";
import Link from "next/link";
import { Button, CircularProgress, Fade, Typography } from "@mui/material";

// Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Components
import { checkMobile } from "../components/checkMobile";
import { CatItem } from "../components/type/type";
import FavoritesDesktop from "../components/desktop/favorites";
import FavoritesMobile from "../components/mobile/favorites";

export default function Favorites() {
    const isMobile                      = checkMobile();
    const [pageLoader, setPageLoader]   = React.useState<boolean>(true);
    const [reload, setReload]           = React.useState(1);
    const [favorites, setFavorites]     = React.useState<CatItem[]>([]);

    React.useEffect(() => {
        getLocal();
    }, [reload]);

    function getLocal() {
        const local = localStorage.getItem("item");

        if (local) {
            setFavorites(JSON.parse(local));
        }

        setPageLoader(false);
    }

    if (pageLoader) return (
        <div className="flex flex-col justify-self-center mt-6 mb-10 w-[90%] max-w-5xl">
            <div className="flex flex-col justify-center rounded-2xl mb-6 shadow-md bg-[var(--panel)] border border-[var(--border)] p-5 transition hover:shadow-lg">
                <CircularProgress sx={{ m: "auto", color: "var(--theme)" }}/>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col justify-self-center mt-6 w-[90%] h-[0px] max-w-5xl">
            <div className="flex flex-col justify-center rounded-2xl mb-6 shadow-md bg-[var(--panel)] border border-[var(--border)] p-5 transition hover:shadow-lg">
                {isMobile
                ? (
                    <div className="mb-5">
                        <Link href={"/"}>
                            <Button size="small" sx={{ mb: 1, color: "var(--text)" }} className='btn-style'>
                                <ArrowBackIcon sx={{ fontSize: 16, mr: 1 }}/> Back to list
                            </Button>
                        </Link>
                    </div>
                )
                : (
                    <div>
                        <Link href={"/"}>
                            <Button size="small" sx={{ mb: 1, color: "var(--text)" }} className='btn-style'>
                                <ArrowBackIcon sx={{ fontSize: 16, mr: 1 }}/> Back to list
                            </Button>
                        </Link>
                    </div>
                )}

                <div className="items-center gap-2 text-xl">
                    <Typography textAlign={"center"} fontWeight={"bold"} fontSize={28}>
                        <span className='text-glow'>Your Favorite Cats</span>
                    </Typography>
                </div>

                <div className="h-[1px] bg-[var(--theme)] opacity-50 my-3" />

                <p className="text-[var(--text2)] text-sm leading-relaxed text-center">
                    Here are the breeds you liked the most!<br/>
                    Click <span className="text-[var(--theme)] font-semibold"> "View More"</span> and discover even more curiosities about your favorites.
                </p>
            </div>

            <section className="space-y-5">
                <div className="w-full min-h-150 rounded-2xl shadow-md bg-[var(--panel)] border border-[var(--border)] p-5">
                    {isMobile ? (
                        <FavoritesMobile
                            reload={reload}
                            favorites={favorites}
                            setReload={setReload}
                        />
                    ) : (
                        <FavoritesDesktop
                            reload={reload}
                            favorites={favorites}
                            setReload={setReload}
                        />
                    )}
                </div>
            </section>
        </div>
    );
}