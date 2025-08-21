import { getDataCat, getDataCatDetails, getDataCatImage } from './services';

type CallApi = {
    page: number;
    setApiDataCat: React.Dispatch<React.SetStateAction<any>>;
    setPageLoader: React.Dispatch<React.SetStateAction<boolean>>;
};

type CallApiDetails = {
    id: string;
    setApiImageCat: React.Dispatch<React.SetStateAction<any>>;
    setApiDataCat: React.Dispatch<React.SetStateAction<any>>;
    setNotFound: React.Dispatch<React.SetStateAction<boolean>>;
};

export const callApi = async (props: CallApi) => {
    const {
        page,
        setApiDataCat,
        setPageLoader
    } = props;

    await getDataCat(page).then(response => {
        if(response.status === 200) {
            setApiDataCat(response.data);
            setPageLoader(false);
        }
    });
};

export const callApiDetails = async (props: CallApiDetails) => {
    const {
        id,
        setApiDataCat,
        setApiImageCat,
        setNotFound
    } = props;

    let image_id = "";

    await getDataCatDetails(id).then(response => {
        if(response.status === 200) {
            setApiDataCat({"data": response.data});

            image_id = response.data.reference_image_id;
        } else if (response.status === 400) {
            setNotFound(true);
        } else {
            setApiDataCat("error");
        }
    });

    await getDataCatImage(image_id).then(response => {
        if(response.status === 200) {
            setApiImageCat({"image": response.data});
        } else if (response.status === 400) {
            setNotFound(true);
        } else {
            setApiDataCat("error");
        }
    });
};