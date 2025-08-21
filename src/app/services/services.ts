import axios from 'axios';

export async function getDataCat(page: number) {
    try {
        const apiUrl = `https://api.thecatapi.com/v1/breeds?limit=10&page=${page}`;

        const response = await axios.get(apiUrl, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'live_JpswA8YWI9tY1Plc3p4JStv8JqtVgAST4bhWuMUbHjrXu8GvfCy7bZhuZsOVLCzr',
            },
        });

        return response;
    } catch (error: any) {
        return error.response;
    }
}

export async function getDataCatDetails(id: string) {
    try {
        const apiUrl = `https://api.thecatapi.com/v1/breeds/${id}`;

        const response = await axios.get(apiUrl, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'live_JpswA8YWI9tY1Plc3p4JStv8JqtVgAST4bhWuMUbHjrXu8GvfCy7bZhuZsOVLCzr',
            },
        });

        return response;
    } catch (error: any) {
        return error.response;
    }
}

export async function getDataCatImage(image_id: string) {
    try {
        const apiUrl = `https://api.thecatapi.com/v1/images/${image_id}`;

        const response = await axios.get(apiUrl, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'live_JpswA8YWI9tY1Plc3p4JStv8JqtVgAST4bhWuMUbHjrXu8GvfCy7bZhuZsOVLCzr',
            },
        });

        return response;
    } catch (error: any) {
        return error.response;
    }
}

export async function getDataDog(page: number) {
    try {
        const apiUrl = `https://api.thedogapi.com/v1/breeds?limit=10&page=${page}`;

        const response = await axios.get(apiUrl, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'live_JpswA8YWI9tY1Plc3p4JStv8JqtVgAST4bhWuMUbHjrXu8GvfCy7bZhuZsOVLCzr',
            },
        });

        return response;
    } catch (error: any) {
        return error.response;
    }
}