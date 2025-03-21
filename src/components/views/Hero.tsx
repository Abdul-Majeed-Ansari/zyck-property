"use client"

import React from 'react'
import { Searchbar } from './Searchbar'



const Hero = () => {
console.log("Hero Page");
  return (
    <>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: "url(/background.jpg)",
        }}>
        <div className="hero-overlay bg-opacity-60 "></div>
        <div className="flex flex-col hero-content text-center text-white">
          <div className="max-w-4xl pb-6">
            <div className="mb-5 lg:text-3xl text-3xl  font-extrabold">Welcome to ZYCK Property <br/> 
             <h3 className='text-1xl font-medium pt-2'>Your Gateway to Exceptional Property Marketplace Opportunities</h3></div>
          </div>
          {/* <div className='max-w-lg'>
            <h2 className="mb-5 lg:text-5xl text-3xl font-bold">Find the Perfect Property That You Need</h2>
          </div> */}
          <Searchbar/>
        </div>
      </div>
    </>
  )
}

export default Hero