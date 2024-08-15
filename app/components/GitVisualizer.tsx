import React, { useState } from 'react'

const GitVisualizer = () => {

    let id = 0
    const [data, setData] = useState('')
    const [command, setCommand] = useState('')

    class gitVisualizer {
        private remoteBranch: { data: string, id: number }[]
        private localBranch: { data: string, id: number }[]
        private commands: { [command: string]: any }
        private logs: string[]
        private id: number
        constructor() {
            this.id = 0
            this.logs = []
            this.remoteBranch = []
            this.localBranch = []
            this.commands = {
                'git status': this.status.bind(this),
                'git add': this.add.bind(this)
            }
        }

        init(){
            this.localBranch = []
        }

        status(data: any) {
            if (this.localBranch.length > 0) {
                if(this.localBranch[this.localBranch.length-1]?.data == data){
                    console.log('local branch is upto date')
                } else{
                    console.log(data)
                    console.log('local branch is not upto date, please commit the changes')
                }
            } else {
                console.log(data)
                console.log('local branch is not upto date, please commit the changes')
            }
            if (this.remoteBranch.length > 0) {
                if (this.remoteBranch[this.remoteBranch.length-1]?.data == this.localBranch[this.localBranch.length-1].data) {
                    console.log('remote branch is upto date')
                } else{
                    console.log(data)
                    console.log('remote branch is not upto date, please push the changes')
                }
            } else {
                console.log(data)
                console.log('remote branch is not upto date, please push the changes')
            }
        }

        add(data: string){
            id++
            console.log(data, id)
        }

        execCommand(func: string, data?: string, id?: number) {
            const fun = this.commands[func]
            if (fun && data && id) {
                fun({ data, id })
            }
            if (!id) {
                fun(data)
            }
            if (!fun) {
                console.log('no such command')
            }
        }
    }

    const git = new gitVisualizer()

    const handleExec = () => {
        console.log(data)
        git.execCommand(command, data)
    }


    return (
        <div className='px-4 py-4 border-2 rounded-xl'>
            <h1 className='text-2xl font-bold'>Git Visualizer</h1>
            <p className='mt-1'>This to show how the local branch and remote branch looks when you perform any operation</p>
            <div className='mt-6 mb-8'>
                <label htmlFor="">This input field in an entry point for data</label>
                <input value={data} onChange={(e: any) => setData(e.target.value)} type="text" className='px-4 py-2 border-2 border-gray-200 rounded-md w-full mt-1' />
            </div>
            <div className='mt-8 mb-2'>
                <label htmlFor="">Execute git commands using this input</label>
                <input placeholder='git status' onChange={(e: any) => setCommand(e.target.value)} type="text" className='px-4 py-2 border-2 border-gray-200 rounded-md w-full mt-1' />
                <button onClick={() => handleExec()} className='px-3 py-2 border rounded-md mt-4 hover:bg-slate-700 hover:text-slate-100'>Execute</button>
            </div>
        </div>
    )
}

export default GitVisualizer