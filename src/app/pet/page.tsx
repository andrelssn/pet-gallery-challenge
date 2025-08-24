import Link from 'next/link';
import { Button, Typography } from '@mui/material';

// Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star';

export default function PetDetails() {
    return (
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
                    Pet Not Found.
                </Typography>
            </div>
        </div>
    );
};