import React from 'react'
import { LampDemo } from './components/ui/LampDemo'



function App() {
  return (
    <>
      <div className='w-screen h-screen flex justify-center items-center'>
        <img src="/i01.jpg" alt="img" width={100}  className='w-full h-full object-cover object-center'/>
        <div className='bg-white/30 backdrop-blur-sm lg:w-[90%] lg:h-[90%] h-full absolute rounded-md'>
          <LampDemo/>
        </div>
      </div>
    </>
  )
}

export default App