import React from 'react'

const GitTimeGraph = () => {
  return (
    <div className='flex-col h-20 px-2'>
      <div className='flex'>
        <div className='h-[2px] w-4 mt-[2px] bg-gray-500 rounded-md' />
        <div className='flex-col items-center justify-center text-center text-sm tracking-tight font-medium relative mx-2'>
          <div className='h-2 w-2 rounded-full bg-gray-500 mx-auto' />
          <div className='absolute top-3 flex-col text-center items-center -left-9 w-20 break-words text-wrap'>
            <p>Dataaaaaaaaa</p>
            <p>Id</p>
          </div>
        </div>
        <div className='h-[2px] w-16 mt-[2px] bg-gray-500 rounded-md' />
        <div className='flex-col items-center justify-center text-center text-sm tracking-tight font-medium relative mx-2'>
          <div className='h-2 w-2 rounded-full bg-gray-500 mx-auto' />
          <div className='absolute top-3 flex-col text-center items-center -left-9 w-20 break-words text-wrap'>
            <p>Dataaaaaaaaaa helloo</p>
            <p>Id</p>
          </div>
        </div>
        <div className='h-[2px] w-16 mt-[2px] bg-gray-500 rounded-md' />
        <div className='flex-col items-center justify-center text-center text-sm tracking-tight font-medium relative mx-2'>
          <div className='h-2 w-2 rounded-full bg-gray-500 mx-auto' />
          <div className='absolute top-3 flex-col text-center items-center -left-3'>
            <p>Data</p>
            <p>Id</p>
          </div>
        </div>
        <div className='h-[2px] w-16 mt-[2px] bg-gray-500 rounded-md' />
        <div className='flex-col items-center justify-center text-center text-sm tracking-tight font-medium relative mx-2'>
          <div className='h-2 w-2 rounded-full bg-gray-500 mx-auto' />
          <div className='absolute top-3 flex-col text-center items-center -left-3'>
            <p>Data</p>
            <p>Id</p>
          </div>
        </div>
        <div className='h-[2px] w-16 mt-[2px] bg-gray-500 rounded-md' />
      </div>
      <div></div>
    </div>
  )
}

export default GitTimeGraph
