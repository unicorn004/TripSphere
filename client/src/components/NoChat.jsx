import React from 'react'
import logo from '../assets/logo.png';


const NoChat = () => {
    return (
        <div className='flex flex-col justify-center items-center h-full'>
            <img src={logo} alt="" />
            <p className='font-bold text-4xl text-yellow-500'>Talk with Elisa,</p>
            <br />
            <p className='font-bold text-2xl text-yellow-500'>Your personal travel guide.</p>
        </div>
    )
}

export default NoChat
