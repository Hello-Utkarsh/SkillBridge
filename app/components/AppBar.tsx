import React from 'react'

const AppBar = () => {
    return (
        <div className='flex justify-between border-b-2 px-4 py-3'>
            <h1 className='font-mono text-[26px] font-semibold tracking-tighter'>SkillBridge</h1>
            <div>
                <button className='px-3 py-2 bg-slate-800 text-white rounded-lg mx-2'>Register</button>
                <button className='px-3 py-2 bg-slate-800 text-white rounded-lg mx-2'>SignUp</button>
            </div>
        </div>
    )
}

export default AppBar
