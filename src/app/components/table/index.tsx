'use client'

// Dependences
import React from 'react';
import Link from 'next/link';
import { Box, Button, CircularProgress, Collapse, Divider, IconButton, Pagination, Rating, Skeleton, Typography } from '@mui/material';

// Icons
import PetsIcon from '@mui/icons-material/Pets';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import PublicIcon from '@mui/icons-material/Public';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import StarRateIcon from '@mui/icons-material/StarRate';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

// Services
import { callApi } from '../../services/api';

export default function Table() {
    // const [filter, setFilter]           = React.useState<boolean>(false);
    const [favorites, setFavorites]     = React.useState<string[]>([]);
    const [apiDataCat, setApiDataCat]   = React.useState<any>(null);
    const [page, setPage]               = React.useState<number>(1);
    const [pageLoader, setPageLoader]   = React.useState<boolean>(true);
    const [tableLoader, setTableLoader] = React.useState<boolean>(false);
    const [reload, setReload]           = React.useState(1);

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
        <div className="flex flex-col justify-self-center mt-6 mb-10 w-[95%]">
            <div className="flex relative w-[100%] min-h-150 justify-self-center rounded-xl shadow-md/30 bg-neutral-100 overflow-auto">
                <CircularProgress sx={{ m: "auto" }}/>
            </div>
        </div>
    );

    const handleChangePage = async (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        setTableLoader(true);

        await callApi({page: value, setApiDataCat, setPageLoader});

        setTableLoader(false);
    };

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
        <div className="flex flex-col justify-self-center mt-6 mb-10 w-[90%]">
            <div className="flex flex-col justify-center rounded-xl mb-5 shadow-md/30 bg-neutral-100 border border-neutral-300 pl-4 pr-4 pt-2 pb-2">
                <Typography variant="h6" color="#1976d2" fontWeight={"bold"} className="rounded-t-lg">
                    <PetsIcon sx={{ fontSize: 18 }}/> Cat List
                </Typography>

                <Divider sx={{ m: "7px 0px" }}/>

                <Typography color="#666666ff" fontSize={14}>
                    Here you can check out all the breeds of cats, to view more details click in the 'View More' button on the list.
                </Typography>
            </div>

            <section>
                <div className="relative w-[100%] min-h-150 justify-self-center rounded-xl shadow-md/30 bg-neutral-100 border border-neutral-300 overflow-auto pl-5 pr-5">
                    {/* <Box sx={{ display: "flex", justifyContent: "right", mt: 1 }}>
                        <IconButton onClick={() => setFilter(!filter)}>
                            <FilterAltIcon/>
                        </IconButton>
                    </Box>

                    <Collapse in={filter}>
                        <div>
                            test
                        </div>
                    </Collapse> */}

                    { tableLoader
                        ? <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", p: "20px 0px" }}>
                            <Skeleton animation="wave" sx={{ width: "100%", height: "100px" }}/>
                            <Skeleton variant="rectangular" animation="wave" sx={{ width: "100%", height: "200px" }}/>
                            <Skeleton variant="rectangular" animation="wave" sx={{ width: "100%", height: "100px", mt: 1 }}/>
                            <Skeleton variant="rectangular" animation="wave" sx={{ width: "100%", height: "100px", mt: 1 }}/>
                        </Box>
                        : <table className="w-full text-sm text-left rtl:text-right text-gray-500 rounded-xl">
                            <thead className="text-xs text-gray-600 uppercase">
                                <tr>
                                    <th scope="col" className="px-2 py-3">
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <StarRateIcon sx={{ fontSize: 14, mr: 0.4 }}/>
                                            <span>Favorite</span>
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        ID
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <HelpCenterIcon sx={{ fontSize: 14, mr: 0.4  }}/>
                                            <span>Breed</span>
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <PublicIcon sx={{ fontSize: 14, mr: 0.4  }}/>
                                            <span>Origin</span>
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-center">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                { apiDataCat.map((item: any) => {
                                    return (
                                        <tr key={item.id} className="border-b border-gray-300 hover:bg-gray-200">
                                            <td key={reload} className="px-6 py-4 w-[120px]">
                                                <Rating
                                                    max={1}
                                                    value={favorites.includes(item.id) ? 1 : 0}
                                                    onChange={(event) => {
                                                        favorites.includes(item.id)
                                                        ? handleRemoveFavorite(item.id)
                                                        : handleSetFavorite(item.id)
                                                    }}
                                                    sx={{ fontSize: 30 }}
                                                />
                                            </td>

                                            <td className="px-6 py-4">
                                                { item.id }
                                            </td>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                { item.name }
                                            </th>
                                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                { item.origin }
                                            </td>

                                            <td className="px-6 py-4 text-center">
                                                <Button size="small" variant="contained" className='blue-bg'>
                                                    <Link href={`/pet/${item.id}`} className="flex items-center px-2 py-1 whitespace-nowrap items-center">
                                                        <RemoveRedEyeIcon sx={{ fontSize: 16, mr: 1 }}/>
                                                        <span>View More</span>
                                                    </Link>
                                                </Button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    }
                </div>

                <Box className="w-[340px] p-2 flex justify-self-center justify-center shadow-md/30 bg-neutral-100 rounded-xl mt-5  mb-5">
                    <Pagination
                        count={6}
                        page={page}
                        color="primary"
                        onChange={handleChangePage}
                    />
                </Box>
            </section>
        </div>
    )
}