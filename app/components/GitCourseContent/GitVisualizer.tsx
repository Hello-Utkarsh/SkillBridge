import React, { useState } from 'react'
import GitTimeGraph from './GitTimeGraph'

let id = 0
class gitVisualizer {
    private remoteBranch: { data: string, id: number }[]
    private localBranch: { data: string, id: number }[] | null
    private commands: { [command: string]: any }
    private stage: { data: string, id: number }[]
    private logs: string[]
    private id: number
    constructor() {
        this.id = 0
        this.stage = []
        this.logs = []
        this.remoteBranch = []
        this.localBranch = null
        this.commands = {
            'git status': this.status.bind(this),
            'git add .': this.add.bind(this),
            'git init': this.init.bind(this),
            'git push': this.push.bind(this),
            'git commit': this.commit.bind(this),
            'git log': this.log.bind(this)
        }
    }

    init() {
        if (this.localBranch == null) {
            this.localBranch = []
            console.log('git repo initialized successfully')
        } else {
            console.log('git repo is already initialized')
        }
    }

    status(data: any) {
        console.log(this.localBranch)
        if (!this.localBranch) {
            console.log("Please initialize a local repo. Run git init to initialize a local git repo")
            return
        }
        if (this.localBranch.length > 0) {
            if (this.localBranch[this.localBranch.length - 1]?.data == data) {
                console.log('local branch is upto date')
            } else {
                console.log(data)
                console.log('local branch is not upto date, please stage the changes')
            }
        } else {
            console.log('local branch is not upto date, please stage the changes')
        }
        if (this.stage.length > 0) {
            console.log(this.stage, 'things to commit')
        }
        if (this.remoteBranch.length > 0) {
            if (this.remoteBranch[this.remoteBranch.length - 1]?.data == this.localBranch[this.localBranch.length - 1].data) {
                console.log('remote branch is upto date')
            } else {
                console.log(data)
                console.log('remote branch is not upto date, please push the changes')
            }
        } else {
            console.log(data)
            console.log('remote branch is not upto date, please push the changes')
        }
    }

    add(data: string) {
        if (!this.localBranch) {
            console.log("Please initialize a local repo. Run git init to initialize a local git repo")
            return
        }
        // if (this.stage.length == 0) {
        //     console.log("local branch is upto date")
        //     return
        // }
        if (this.localBranch.length > 0) {
            if (this.localBranch[this.localBranch.length - 1]?.data == data) {
                console.log('local branch is upto date')
                return
            } else {
                console.log(data)
                console.log('local branch is not upto date, please stage the changes')
            }
        } else {
            console.log('local branch is not upto date, please stage the changes')
        }
        if (this.stage.length>0) {
            if (this.stage[this.stage.length-1].data == data) {
                console.log("no new data to add")
                return
            }
        }
        id++
        this.stage.push({ data, id })
        console.log(this.stage)
    }

    commit(data: string){
        if (!this.localBranch) {
            console.log("Please initialize a local repo. Run git init to initialize a local git repo")
            return
        }
        if (this.stage.length == 0) {
            console.log("local branch is upto date")
            return
        }
        if (this.localBranch.length > 0) {
            if (this.localBranch[this.localBranch.length - 1].data == data) {
                console.log('local branch is upto date')
                return
            }
        }
        this.stage.forEach(val => this.localBranch?.push({data:val.data, id:val.id}))
        this.stage = []
        console.log(this.localBranch)
    }

    push(){
        if (!this.localBranch) {
            console.log("Please initialize a local repo. Run git init to initialize a local git repo")
            return
        }
        if (this.remoteBranch.length == this.localBranch?.length) {
            console.log('nothing to push')
            return
        }

        // change the way remote branch is updated, remote branch + changes from local branch
        // currently its is remotebranch = localbranch  
        const changes = this.localBranch?.map(v => {return({data: v.data, id:v.id})})
        changes.forEach(v => this.remoteBranch.push(v))
        // this.remoteBranch.push(changes)
        console.log(this.remoteBranch)
    }

    log(){
        if (!this.localBranch) {
            console.log("Please initialize a local repo. Run git init to initialize a local git repo")
            return
        }
        console.log(this.localBranch)
    }

    execCommand(func: string, data?: string, id?: number) {
        const fun = this.commands[func]
        if (!fun) {
            console.log('no such command')
            return
        }
        if (fun && data && id) {
            fun({ data, id })
        }
        if (!id) {
            fun(data)
        }
    }
}

const git = new gitVisualizer()

const GitVisualizer = () => {

    const [data, setData] = useState('')
    const [command, setCommand] = useState('')

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
            <GitTimeGraph/>
        </div>
    )
}

export default GitVisualizer