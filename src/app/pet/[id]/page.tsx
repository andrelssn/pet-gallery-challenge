'use client'

// Dependences
import React from 'react';
import { Button, CircularProgress, Fade, Rating, Typography } from '@mui/material';
import Link from 'next/link';

// Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LaunchIcon from '@mui/icons-material/Launch';
import StarIcon from '@mui/icons-material/Star';

// Services
import { callApiDetails } from '@/app/services/api';
import { CatItem } from '@/app/components/type/type';

export default function PetDetails({params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = React.use(params);

    const [favorites, setFavorites]     = React.useState<CatItem[]>([]);
    const [apiDataCat, setApiDataCat]   = React.useState<any>(null)
    const [apiImageCat, setApiImageCat] = React.useState<any>(null)
    const [notFound, setNotFound]       = React.useState<boolean>(false);

    React.useEffect(() => {
        callApiDetails({id, setApiDataCat, setApiImageCat, setNotFound });
        getLocalStorage();
    }, []);

    const getLocalStorage = () => {
        const local = localStorage.getItem("item");

        if (local) {
            setFavorites(JSON.parse(local));
        }
    };

    const handleSetFavorite = (item: any) => {
        const stored = localStorage.getItem("item");
        const favorites: any[] = stored ? JSON.parse(stored) : [];

        const exists = favorites.some(fav => fav.id === item.id);
        if (!exists) {
            favorites.push(item);
        }

        localStorage.setItem("item", JSON.stringify(favorites));
        getLocalStorage();
    };

    const handleRemoveFavorite = (id: string) => {
        const stored = localStorage.getItem("item");
        let favorites: any[] = stored ? JSON.parse(stored) : [];

        const updatedFavorites = favorites.filter(favItem => favItem.id !== id);

        localStorage.setItem("item", JSON.stringify(updatedFavorites));
        getLocalStorage();
    };

    if (notFound) return (
        <div className="justify-self-center mt-6 w-[90%] h-[0px]">
            <div className="flex relative w-[100%] min-h-150 justify-center border border-[var(--border)] rounded-xl shadow-md/30 bg-[var(--panel)] overflow-auto">
                <div className='absolute flex left-5 top-3 gap-3'>
                    <Link href={"/"}>
                        <Button size='small' variant="contained" sx={{ mb: 1, color: "var(--text)" }} className='btn-style'>
                            <ArrowBackIcon sx={{ fontSize: 16, mr: 1 }}/> Back to list
                        </Button>
                    </Link>

                    <Link href={"/favorites"}>
                        <Button size='small' variant="contained" sx={{ mb: 1, color: "var(--text)" }} className='btn-style'>
                            <StarIcon sx={{ fontSize: 16, mr: 1 }}/> Go to Favorites
                        </Button>
                    </Link>
                </div>

                <Typography m={"auto"} fontWeight={"bold"} color="var(--text2)">
                    Pet not found.<br/>
                </Typography>
            </div>
        </div>
    );

    if (!apiDataCat || !apiImageCat) return (
        <div className="justify-self-center mt-6 w-[90%] h-[0px]">
            <div className="flex relative w-[100%] min-h-150 justify-center border border-[var(--border)] rounded-xl shadow-md/30 bg-[var(--panel)] overflow-auto">
                <div className='absolute flex left-5 top-3 gap-3'>
                    <Link href={"/"}>
                        <Button size='small' variant="contained" sx={{ mb: 1, color: "var(--text)" }} className='btn-style'>
                            <ArrowBackIcon sx={{ fontSize: 16, mr: 1 }}/> Back to list
                        </Button>
                    </Link>

                    <Link href={"/favorites"}>
                        <Button size='small' variant="contained" sx={{ mb: 1, color: "var(--text)" }} className='btn-style'>
                            <StarIcon sx={{ fontSize: 16, mr: 1 }}/> Go to Favorites
                        </Button>
                    </Link>
                </div>

                <CircularProgress sx={{ margin: "auto", color: "var(--theme)" }}/>
            </div>
        </div>
    );

    if (apiDataCat === "error") return (
        <div className="justify-self-center mt-6 w-[90%] h-[0px]">
            <div className="flex relative w-[100%] min-h-150 justify-center border border-[var(--border)] rounded-xl shadow-md/30 bg-[var(--panel)] overflow-auto">
                <div className='absolute flex left-5 top-3 gap-3'>
                    <Link href={"/"}>
                        <Button size='small' variant="contained" sx={{ mb: 1, color: "var(--text)" }} className='btn-style'>
                            <ArrowBackIcon sx={{ fontSize: 16, mr: 1 }}/> Back to list
                        </Button>
                    </Link>

                    <Link href={"/favorites"}>
                        <Button size='small' variant="contained" sx={{ mb: 1, color: "var(--text)" }} className='btn-style'>
                            <StarIcon sx={{ fontSize: 16, mr: 1 }}/> Go to Favorites
                        </Button>
                    </Link>
                </div>

                <Typography m={"auto"} fontWeight={"bold"} color="var(--text2)">
                    API offline at the moment, please try again later.<br/>
                </Typography>
            </div>
        </div>
    );

    return (
        <div className="justify-self-center mt-6 w-[90%] h-[0px]">
            <div className="flex flex-col lg:flex-row w-full min-h-150 border border-[var(--border)] rounded-xl shadow-md/30 bg-[var(--panel)] overflow-hidden">
                <div className="relative flex flex-col items-center p-4 lg:w-1/2 pt-15">
                    <div className='absolute flex left-5 top-3 gap-3'>
                        <Link href={"/"}>
                            <Button size='small' variant="contained" sx={{ mb: 1, color: "var(--text)" }} className='btn-style'>
                                <ArrowBackIcon sx={{ fontSize: 16, mr: 1 }}/> Back to list
                            </Button>
                        </Link>

                        <Link href={"/favorites"}>
                            <Button size='small' variant="contained" sx={{ mb: 1, color: "var(--text)" }} className='btn-style'>
                                <StarIcon sx={{ fontSize: 16, mr: 1 }}/> Go to Favorites
                            </Button>
                        </Link>
                    </div>

                    <div className="w-full flex justify-center">
                        <img
                            alt={apiDataCat.data.name}
                            src={apiImageCat.image.url}
                            width={900}
                            height={500}
                            className="object-cover rounded-lg"
                        />
                    </div>

                    <Button
                        href={apiDataCat.data.wikipedia_url}
                        sx={{ display: "flex", justifySelf: "center", color: "var(--text3)", marginTop: "1rem" }}
                    >
                        Find out more
                        <LaunchIcon sx={{ ml: 1, fontSize: 18 }} />
                    </Button>
                </div>

                <div className="p-5 lg:w-1/2">
                    <div className="flex items-center flex-wrap gap-2">
                        <h1 className="text-2xl font-bold text-[var(--text3)]">{apiDataCat.data.name}</h1>
                        <Rating
                            max={1}
                            value={favorites.some(fav => fav.id === apiDataCat.data.id) ? 1 : 0}
                            onChange={() =>
                                favorites.some(fav => fav.id === apiDataCat.data.id)
                                    ? handleRemoveFavorite(apiDataCat.data.id)
                                    : handleSetFavorite(apiDataCat.data)
                            }
                            sx={{
                                fontSize: 22,
                                "& .MuiRating-iconEmpty": { color: "var(--text2)" },
                            }}
                        />
                    </div>

                    <p className="text-[var(--text2)]">{apiDataCat.data.origin} • {apiDataCat.data.lifeSpan}</p>
                    <p className="mt-4 text-[var(--text3)]">{apiDataCat.data.description}</p>

                    <div className="mt-4 text-sm text-[var(--text2)] space-y-1">
                        <p><span className="font-bold">Life span:</span> {apiDataCat.data.life_span} years</p>
                        <p><span className="font-bold">Weight:</span> {apiDataCat.data.weight.metric} kg ({apiDataCat.data.weight.imperial} lbs)</p>
                    </div>

                    <div className="mt-6">
                        <h2 className="text-lg font-semibold text-[var(--text3)]">Temperament</h2>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {apiDataCat.data.temperament
                                ?.split(",")
                                .map((temp: string, index: number) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 text-[var(--text)] rounded-full text-sm font-bold theme-bg"
                                    >
                                        {temp.trim()}
                                    </span>
                                ))
                            }
                        </div>
                    </div>

                    <div className="mt-6">
                        <h2 className="text-lg font-semibold mb-4 text-[var(--text3)]">Traits</h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3">
                                <span className="w-32 text-sm text-[var(--text2)]">Adaptability</span>
                                <Rating value={apiDataCat.data.adaptability} readOnly />
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="w-32 text-sm text-[var(--text2)]">Affection</span>
                                <Rating value={apiDataCat.data.affection_level} readOnly />
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="w-32 text-sm text-[var(--text2)]">Child Friendly</span>
                                <Rating value={apiDataCat.data.child_friendly} readOnly />
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="w-32 text-sm text-[var(--text2)]">Dog Friendly</span>
                                <Rating value={apiDataCat.data.dog_friendly} readOnly />
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="w-32 text-sm text-[var(--text2)]">Energy Level</span>
                                <Rating value={apiDataCat.data.energy_level} readOnly />
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="w-32 text-sm text-[var(--text2)]">Grooming</span>
                                <Rating value={apiDataCat.data.grooming} readOnly />
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="w-32 text-sm text-[var(--text2)]">Intelligence</span>
                                <Rating value={apiDataCat.data.intelligence} readOnly />
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="w-32 text-sm text-[var(--text2)]">Social Needs</span>
                                <Rating value={apiDataCat.data.social_needs} readOnly />
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="w-32 text-sm text-[var(--text2)]">Stranger Friendly</span>
                                <Rating value={apiDataCat.data.stranger_friendly} readOnly />
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="w-32 text-sm text-[var(--text2)]">Shedding</span>
                                <Rating value={apiDataCat.data.shedding_level} readOnly />
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="w-32 text-sm text-[var(--text2)]">Health Issues</span>
                                <Rating value={apiDataCat.data.health_issues} readOnly />
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="w-32 text-sm text-[var(--text2)]">Vocalisation</span>
                                <Rating value={apiDataCat.data.vocalisation} readOnly />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};