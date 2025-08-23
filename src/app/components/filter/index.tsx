'use client'

import React from "react";
import { Button, Collapse, TextField } from "@mui/material";

// Services
import { callApi, callApiSearch } from "../../services/api";

type FilterProps = {
    filter: boolean;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    setFilter: React.Dispatch<React.SetStateAction<boolean>>;
    setSearched: React.Dispatch<React.SetStateAction<boolean>>;
    setTableLoader: React.Dispatch<React.SetStateAction<boolean>>;
    setPageLoader: React.Dispatch<React.SetStateAction<boolean>>;
    setApiDataCat: React.Dispatch<React.SetStateAction<any>>;
};

export default function Filter(props: FilterProps) {
    const {
        filter,
        setPage,
        setFilter,
        setSearched,
        setTableLoader,
        setPageLoader,
        setApiDataCat
    } = props;

    const [search, setSearch] = React.useState("");

    const handleApply = async () => {
        setFilter(false);
        setTableLoader(true);
        setSearched(true);
        setPage(1);

        await callApiSearch({search, setApiDataCat, setPageLoader});

        setTableLoader(false);
    };

    const handleClear = async () => {
        setSearch("");
        setFilter(false);
        setTableLoader(true);
        setSearched(false);
        setPage(1);

        await callApi({page: 1, setApiDataCat, setPageLoader});

        setTableLoader(false);
    };

    return (
        <Collapse in={filter}>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-[var(--panel)] p-5">
                <TextField
                    label="Search by Breed"
                    variant="outlined"
                    size="small"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    sx={{
                        "& .MuiInputBase-input": {
                            color: "var(--text3)",
                            padding: "10px 12px",
                        },
                        "& .MuiInputLabel-root": {
                            color: "var(--text2) !important",
                        },
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                            backgroundColor: "var(--background)",
                            "& fieldset": {
                                borderColor: "var(--text2)",
                            },
                            "&:hover fieldset": {
                                borderColor: "var(--theme)",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "var(--theme)",
                                boxShadow: "0 0 0 3px rgba(238,187,195,0.3)",
                            },
                        },
                    }}
                    className="w-full md:w-1/3 transition-all duration-300"
                />

                <div className="flex gap-2">
                    <Button
                        variant="contained"
                        onClick={handleApply}
                        className="bg-[var(--theme)] hover:bg-[var(--theme)]/90 text-[var(--background)] shadow-md px-5 py-2 rounded-xl transition-all duration-300"
                    >
                        Apply
                    </Button>

                    <Button
                        variant="outlined"
                        onClick={handleClear}
                        className="border-[var(--theme)] text-[var(--theme)] hover:bg-[var(--theme)]/10 rounded-xl px-5 py-2 transition-all duration-300"
                    >
                        Clear
                    </Button>
                </div>
            </div>
        </Collapse>
    )
}