import Link from 'next/link';
import { Button, Typography } from '@mui/material';

// Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function PetDetails() {
    return (
        <div>
            <div className="justify-self-center mt-6 mb-10 w-[95%]">
                <Link href={"/"}>
                    <Button variant="contained" sx={{ mb: 1 }} className='blue-bg'>
                        <ArrowBackIcon sx={{ fontSize: 16, mr: 1 }}/> Home
                    </Button>
                </Link>

                <div className="flex relative w-[100%] min-h-150 justify-center border border-neutral-300 rounded-xl shadow-md/30 bg-neutral-100 overflow-auto">
                    <Typography m={"auto"} fontWeight={"bold"} color="#4b4b4bff">
                        Pet Not Found.
                    </Typography>
                </div>
            </div>
        </div>
    );
};