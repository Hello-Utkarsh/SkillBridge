import React, { useState } from 'react'

const GitTimeGraph = (props: any) => {
  const branch: any = props.branch
  return (
    <div className='flex-col h-20 px-2'>
      <div key={props.branchid} className='flex'>
        <div className='h-[2px] w-4 mt-[2px] bg-gray-500 rounded-md' />
        {branch && branch.map((node: { data: string, id: number }) => {
          return (
            <div id={(node.id).toString()} className='flex'>
              <div className='flex-col items-center justify-center text-center text-sm tracking-tight font-medium relative mx-2'>
                <div className='h-2 w-2 rounded-full bg-gray-500 mx-auto' />
                <div className='absolute top-3 flex-col text-center items-center -left-9 w-20 break-words text-wrap'>
                  <p>{node.data}</p>
                  <p>Id: {node.id}</p>
                </div>
              </div>
              <div className='h-[2px] w-16 mt-[2px] bg-gray-500 rounded-md' />
            </div>
          )
        })}
      </div>
      <div></div>
    </div>
  )
}

export default GitTimeGraph
