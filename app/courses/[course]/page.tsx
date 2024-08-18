'use client'
import React, { useState } from 'react'
import GitVisualizer from '@/app/components/GitCourseContent/GitVisualizer'

const Page = ({ params }: { params: { course: string } }) => {
    const [tab, setTab] = useState("")
    return (
        <div className='flex'>
            <div className='flex-col w-2/12 bg-gray-100 px-4 h-dvh'>
                <h2 className='font-bold text-xl py-4'>Course Outline</h2>
                <div className='flex-col divide-y-2 divide-gray-300 items-center pr-6'>
                    <div onClick={() => setTab('step1')} className='py-3 font-medium cursor-pointer hover:underline underline-offset-1'>Step 1</div>
                    <div className='py-3 font-medium cursor-pointer hover:underline underline-offset-1'>Step 2</div>
                    <div className='py-3 font-medium cursor-pointer hover:underline underline-offset-1'>Step 3</div>
                    <div className='py-3 font-medium cursor-pointer hover:underline underline-offset-1'>Step 4</div>
                    <div onClick={() => setTab('Git Visualizer')} className='py-3 font-medium cursor-pointer hover:underline underline-offset-1'>Git Visualizer</div>
                </div>
            </div>
            <div className='px-12 py-12 w-10/12'>
                {(tab == 'Git Visualizer') && <GitVisualizer />}
            </div>
        </div>
    )
}

export default Page
