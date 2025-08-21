'use client'

// Dependences
import React from 'react';
import { Button, CircularProgress, Fade, Rating, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LaunchIcon from '@mui/icons-material/Launch';

// Services
import { callApiDetails } from '@/app/services/api';

export default function PetDetails({params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = React.use(params);
    const router = useRouter();

    const [apiDataCat, setApiDataCat] = React.useState<any>(null)
    const [apiImageCat, setApiImageCat] = React.useState<any>(null)
    const [notFound, setNotFound]       = React.useState<boolean>(false);

    React.useEffect(() => {
        callApiDetails({id, setApiDataCat, setApiImageCat, setNotFound });
    }, []);

    if (notFound) return (
        <div className="justify-self-center mt-6 mb-10 w-[95%]">
            <Button variant="contained" sx={{ mb: 1 }} onClick={() => router.back()}>
                <ArrowBackIcon sx={{ fontSize: 16, mr: 1 }}/> Back
            </Button>

            <div className="flex relative w-[100%] min-h-150 justify-center border border-neutral-300 rounded-xl shadow-md/30 bg-neutral-100 overflow-auto">
                <Typography m={"auto"} fontWeight={"bold"} color="#4b4b4bff">
                    Pet not found.<br/>
                </Typography>
            </div>
        </div>
    );

    if (!apiDataCat || !apiImageCat) return (
        <div className="justify-self-center mt-6 mb-10 w-[95%]">
            <Button variant="contained" sx={{ mb: 1 }} onClick={() => router.back()}>
                <ArrowBackIcon sx={{ fontSize: 16, mr: 1 }}/> Back
            </Button>

            <div className="flex relative w-[100%] min-h-150 justify-center border border-neutral-300 rounded-xl shadow-md/30 bg-neutral-100 overflow-auto">
                <CircularProgress sx={{ margin: "auto" }}/>
            </div>
        </div>
    );

    if (apiDataCat === "error") return (
        <div className="justify-self-center mt-6 mb-10 w-[95%]">
            <Button variant="contained" sx={{ mb: 1 }} onClick={() => router.back()}>
                <ArrowBackIcon sx={{ fontSize: 16, mr: 1 }}/> Back
            </Button>

            <div className="flex relative w-[100%] min-h-150 justify-center border border-neutral-300 rounded-xl shadow-md/30 bg-neutral-100 overflow-auto">
                <Typography m={"auto"} fontWeight={"bold"} color="#4b4b4bff">
                    API offline at the moment, please try again later.<br/>
                </Typography>
            </div>
        </div>
    );

    return (
        <div className="justify-self-center mt-6 mb-10 w-[95%]">
            <Button variant="contained" sx={{ mb: 1 }} onClick={() => router.back()}>
                <ArrowBackIcon sx={{ fontSize: 16, mr: 1 }}/> Back
            </Button>

            <Fade in={true}>
                <div className="relative flex flex-col md:flex-row w-full min-h-150 justify-self-center border border-neutral-300 rounded-xl shadow-md/30 bg-neutral-100 overflow-auto">
                    <div className="bg-blue-500">
                        <div className="w-fit justify-self-center">
                            <img
                                alt={apiDataCat.data.name}
                                src={apiImageCat.image.url}
                                width={900}
                                height={500}
                                className="object-cover"
                            />
                        </div>

                        <Button href={apiDataCat.data.wikipedia_url} sx={{ display: "flex", justifySelf: "center", color: "#ffffff" }}>
                            Find out more
                            <LaunchIcon sx={{ ml: 1, fontSize: 18 }}/>
                        </Button>
                    </div>

                    <div className="ml-3 mr-3 mt-5 mb-5">
                        <h1 className="text-2xl font-bold text-gray-700">{apiDataCat.data.name}</h1>
                        <p className="text-gray-600">{apiDataCat.data.origin} • {apiDataCat.data.lifeSpan}</p>
                        <p className="mt-4">{apiDataCat.data.description}</p>

                        <div className="mt-4 text-sm text-gray-600 space-y-1">
                            <p>
                                <span className="font-bold">Life span:</span> {apiDataCat.data.life_span} years
                            </p>
                            <p>
                                <span className="font-bold">Weight:</span> {apiDataCat.data.weight.metric} kg ({apiDataCat.data.weight.imperial} lbs)
                            </p>
                        </div>

                        <div className="mt-6">
                            <h2 className="text-lg font-semibold text-gray-700">
                                Temperament
                            </h2>

                            <div className="flex flex-wrap gap-2 mt-2">
                                <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-bold">
                                    {apiDataCat.data.temperament}
                                </span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h2 className="text-lg font-semibold mb-4">Traits</h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="flex items-center gap-3">
                                    <span className="w-32 text-sm text-gray-700">Adaptability</span>
                                    <Rating value={apiDataCat.data.adaptability} readOnly />
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className="w-32 text-sm text-gray-700">Affection</span>
                                    <Rating value={apiDataCat.data.affection_level} readOnly />
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className="w-32 text-sm text-gray-700">Child Friendly</span>
                                    <Rating value={apiDataCat.data.child_friendly} readOnly />
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className="w-32 text-sm text-gray-700">Dog Friendly</span>
                                    <Rating value={apiDataCat.data.dog_friendly} readOnly />
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className="w-32 text-sm text-gray-700">Energy Level</span>
                                    <Rating value={apiDataCat.data.energy_level} readOnly />
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className="w-32 text-sm text-gray-700">Grooming</span>
                                    <Rating value={apiDataCat.data.grooming} readOnly />
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className="w-32 text-sm text-gray-700">Intelligence</span>
                                    <Rating value={apiDataCat.data.intelligence} readOnly />
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className="w-32 text-sm text-gray-700">Social Needs</span>
                                    <Rating value={apiDataCat.data.social_needs} readOnly />
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className="w-32 text-sm text-gray-700">Stranger Friendly</span>
                                    <Rating value={apiDataCat.data.stranger_friendly} readOnly />
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className="w-32 text-sm text-gray-700">Shedding</span>
                                    <Rating value={apiDataCat.data.shedding_level} readOnly />
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className="w-32 text-sm text-gray-700">Health Issues</span>
                                    <Rating value={apiDataCat.data.health_issues} readOnly />
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className="w-32 text-sm text-gray-700">Vocalisation</span>
                                    <Rating value={apiDataCat.data.vocalisation} readOnly />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fade>
        </div>
    );
};