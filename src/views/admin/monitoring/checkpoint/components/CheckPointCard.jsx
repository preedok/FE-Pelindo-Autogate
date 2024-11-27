import React from 'react'
import camera from '../../../../../assets/offline.jpg'
const CheckPointCard = () => {
  return (
    <>
          <div className="max-w-xl rounded overflow-hidden shadow-lg">
              <div className="px-6 flex justify-between py-4 bg-[#1B4242]">
                  <p style={{ fontSize: "23px", fontWeight: '600' }} className="text-[white] mt-3 text-base">
                      GIN06
                  </p>
              </div>
              <div className="flex">
                  <img className="w-full h-[400px]" src={camera} alt="Sunset in the mountains" />
              </div>
              <div className="flex justify-between w-full px-2 h-[25px] bg-[#1B4242]">
                  <div className='text-[white]'>
                      123.5543.654
                  </div>
                  <div className='bg-[#ff3333] mt-2' style={{borderRadius:'50%', width:'11px', height:'11px'}}>
                      
                  </div>
              </div>
          </div>
    </>
  )
}

export default CheckPointCard
