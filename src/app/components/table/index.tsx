'use client'

// Dependences
import React from 'react';
import Image from 'next/image';
import { Box, Button, CircularProgress, Divider, Fade, IconButton, Pagination, Rating, Skeleton, Typography } from '@mui/material';

// Logo
import logo from '../../images/pet.png';

// Icons

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';

// Services
import { callApi } from '../../services/api';

// Components
import { checkMobile } from '../checkMobile';
import Filter from '../filter';
import Desktop from '../desktop';
import Mobile from '../mobile';

export default function Table() {
    const isMobile                      = checkMobile();
    const [filter, setFilter]           = React.useState<boolean>(false);
    const [favorites, setFavorites]     = React.useState<string[]>([]);
    const [apiDataCat, setApiDataCat]   = React.useState<any>(null);
    const [page, setPage]               = React.useState<number>(1);
    const [pageLoader, setPageLoader]   = React.useState<boolean>(true);
    const [tableLoader, setTableLoader] = React.useState<boolean>(false);
    const [reload, setReload]           = React.useState(1);
    const [searched, setSearched]       = React.useState<boolean>(false);

    React.useEffect(() => {
        if (!apiDataCat) {
            callApi({page, setApiDataCat, setPageLoader});
        }

        const local = localStorage.getItem("item");
        if (local) {
            setFavorites(JSON.parse(local));
        }
    }, [reload]);

    if (pageLoader) return (
        <div className="flex flex-col justify-self-center mt-6 mb-10 w-[90%] max-w-5xl">
            <div className="flex flex-col justify-center rounded-2xl mb-6 shadow-md bg-[var(--panel)] border border-[var(--border)] p-5 transition hover:shadow-lg">
                <CircularProgress sx={{ m: "auto", color: "var(--theme)" }}/>
            </div>
        </div>
    );

    const handleChangePage = async (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        setTableLoader(true);

        await callApi({page: value, setApiDataCat, setPageLoader});

        setTableLoader(false);
    };

    return (
        <Fade in={true}>
            <div className="flex flex-col justify-self-center mt-6 mb-10 w-[90%] max-w-5xl">
                <div className="flex flex-col justify-center rounded-2xl mb-6 shadow-md bg-[var(--panel)] border border-[var(--border)] p-5 transition hover:shadow-lg">
                    <div className="items-center gap-2 text-[var(--theme)] text-xl">
                        <Typography textAlign={"center"} fontWeight={"bold"} fontSize={24}>
                            <Image alt="pet-gallery" src={logo} width={50} style={{ margin: "auto" }}/>
                            <span>Cat List</span>
                        </Typography>
                    </div>

                    <div className="h-[1px] bg-[var(--theme)] opacity-50 my-3" />

                    <p className="text-[var(--text2)] text-sm leading-relaxed text-center">
                        Discover all cat breeds and learn about their characteristics and curiosities.<br/>
                        Click <span className="text-[var(--theme)] font-semibold"> "View More"</span> for complete details on each breed.
                    </p>
                </div>

                <section className="space-y-5">
                    <div className="w-full rounded-2xl shadow-md bg-[var(--panel)] border border-[var(--border)] overflow-hidden">
                        <div className="flex justify-between items-center px-5 py-3 bg-[var(--background)]/50 border-b border-[var(--border)]">
                            <h2 className="text-[var(--theme)] font-bold text-base">Filter</h2>

                            <button
                                onClick={() => setFilter(!filter)}
                                className="p-2 rounded-lg hover:bg-[var(--theme)]/10 transition"
                            >
                                {filter ? (
                                    <FilterAltOffIcon className="text-[var(--theme)]" />
                                ) : (
                                    <FilterAltIcon className="text-[var(--theme)]" />
                                )}
                            </button>
                        </div>

                        <div className="p-4">
                            <Filter
                                filter={filter}
                                setPage={setPage}
                                setFilter={setFilter}
                                setSearched={setSearched}
                                setApiDataCat={setApiDataCat}
                                setPageLoader={setPageLoader}
                                setTableLoader={setTableLoader}
                            />
                        </div>
                    </div>

                    <div className="w-full min-h-150 rounded-2xl shadow-md bg-[var(--panel)] border border-[var(--border)] p-5">
                        {isMobile ? (
                            <Mobile
                                apiDataCat={apiDataCat}
                                reload={reload}
                                favorites={favorites}
                                tableLoader={tableLoader}
                                setReload={setReload}
                            />
                        ) : (
                            <Desktop
                                apiDataCat={apiDataCat}
                                reload={reload}
                                favorites={favorites}
                                tableLoader={tableLoader}
                                setReload={setReload}
                            />
                        )}
                    </div>

                    <div className="flex justify-center">
                        <div className="rounded-2xl shadow-md bg-[var(--panel)] px-4 py-2">
                            <Pagination
                                disabled={searched}
                                count={6}
                                page={page}
                                onChange={handleChangePage}
                                sx={{
                                    "& .MuiPaginationItem-root": {
                                        color: "var(--text3)",
                                    },
                                    "& .Mui-selected": {
                                        backgroundColor: "var(--theme) !important",
                                        color: "var(--text)",
                                        borderRadius: "8px",
                                    },
                                    "& .MuiPaginationItem-root:hover": {
                                        backgroundColor: "rgba(255,255,255,0.2)",
                                    },
                                }}
                            />
                        </div>
                    </div>
                </section>
            </div>
        </Fade>
    )
}