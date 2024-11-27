import React from 'react'
import camera from '../../../../../assets/camera_offline.jpg'
const CctvCard = () => {
    return (
        <>
            <div className="w-full rounded overflow-hidden shadow-lg">
                <div className="px-6 flex justify-between py-1 bg-[#1B4242]">
                    <p style={{ fontSize: "23px", fontWeight: '600' }} className="text-[white] mt-1 text-base">
                        GIN06
                    </p>
                </div>
                <div className="flex gap-5">
                    <div>
                        <img className="w-full h-[200px]" src={camera} alt="Sunset in the mountains" />
                        <div className="flex justify-between w-full px-2 h-[25px] bg-[#1B4242]">
                            <div className='text-[white]'>
                                123.5543.654
                            </div>
                            <div className='bg-[#ff3333] mt-2' style={{ borderRadius: '50%', width: '11px', height: '11px' }}>
                            </div>
                        </div>
                    </div>
                    <div>
                        <img className="w-full h-[200px]" src={camera} alt="Sunset in the mountains" />
                        <div className="flex justify-between w-full px-2 h-[25px] bg-[#1B4242]">
                            <div className='text-[white]'>
                                123.5543.654
                            </div>
                            <div className='bg-[#ff3333] mt-2' style={{ borderRadius: '50%', width: '11px', height: '11px' }}>
                            </div>
                        </div>
                    </div>
                    <div>
                        <img className="w-full h-[200px]" src={camera} alt="Sunset in the mountains" />
                        <div className="flex justify-between w-full px-2 h-[25px] bg-[#1B4242]">
                            <div className='text-[white]'>
                                123.5543.654
                            </div>
                            <div className='bg-[#ff3333] mt-2' style={{ borderRadius: '50%', width: '11px', height: '11px' }}>
                            </div>
                        </div>
                    </div>
                    <div>
                        <img className="w-full h-[200px]" src={camera} alt="Sunset in the mountains" />
                        <div className="flex justify-between w-full px-2 h-[25px] bg-[#1B4242]">
                            <div className='text-[white]'>
                                123.5543.654
                            </div>
                            <div className='bg-[#ff3333] mt-2' style={{ borderRadius: '50%', width: '11px', height: '11px' }}>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CctvCard 
