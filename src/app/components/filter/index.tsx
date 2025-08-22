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
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center bg-neutral-100 border-t border-neutral-300 p-5">
                <TextField
                    label="Search by Breed"
                    variant="outlined"
                    size="small"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full md:w-1/3"
                />

                <div className="flex gap-2">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleApply}
                        className="blue-bg"
                    >
                        Apply
                    </Button>

                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleClear}
                    >
                        Clear
                    </Button>
                </div>
            </div>
        </Collapse>
    )
}