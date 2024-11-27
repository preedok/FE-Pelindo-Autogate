import React from 'react'
import {
    Card,
    CardHeader,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import camera from '../../../../../assets/camera_offline.jpg'
import noImage from '../../../../../assets/no_image.jpg'
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import ComputerIcon from '@mui/icons-material/Computer';
import FlashOnIcon from '@mui/icons-material/FlashOn';
const LiveCard = () => {
    return (
        <div className="max-w-xl rounded overflow-hidden shadow-lg">
            <div className="px-6 flex justify-between py-4 bg-[#A1EEBD]">
                <p style={{ fontSize: "23px", fontWeight: '600' }} className="text-[white] mt-3 text-base">
                    GIN06
                </p>
                <div className='flex gap-2'>
                    <Button variant='contained' style={{ fontSize: '8px', fontWeight: '700' }} className='px-4 bg-[#65B741]'><LocalPrintshopIcon /> Reprint</Button>
                    <Button variant='contained' style={{ fontSize: '8px', fontWeight: '700' }} className='px-4 bg-[#B80000]'><FlashOnIcon /> Open</Button>
                    <Button variant='contained' style={{ fontSize: '8px', fontWeight: '700' }} className='px-4 bg-[#11235A]'><ComputerIcon /> Reset PC</Button>
                </div>
            </div>
            <div className='w-full h-[130px] bg-[#EEF5FF]' >
            </div>
            <div className="flex w-full justify-between px-20 h-[25px] bg-[#B6C4B6]">
                <div className='text-[white]'>
                    123.5543.654
                </div>
                <div className='text-[white]'>
                    Last Capture
                </div>
            </div>
            <div className="px-6 flex gap-8 pt-4 pb-2">
                <img className="w-[230px] h-[200px]" src={camera} alt="Sunset in the mountains" />
                <img className="w-[230px] h-[200px]" src={noImage} alt="Sunset in the mountains" />
            </div>
        </div>
    )
}

export default LiveCard
