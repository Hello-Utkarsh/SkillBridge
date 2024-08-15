'use client'
import React from 'react'
import { RecoilRoot } from 'recoil'

const Provider = ({children}: any) => {
  return (
    <RecoilRoot>
        {children}
    </RecoilRoot>
  )
}

export default Provider