import React, { useEffect, useState } from 'react'
import GitTimeGraph from './GitTimeGraph'
import { useSetRecoilState } from 'recoil'

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
            'status': this.status.bind(this),
            'add': this.add.bind(this),
            'init': this.init.bind(this),
            'push': this.push.bind(this),
            'commit': this.commit.bind(this),
            'log': this.log.bind(this),
            'reset': this.reset.bind(this)
        }
    }

    reset(id: number, flag: string = '--mixed') {
        if (!this.localBranch) {
            console.log("Please initialize a local repo. Run git init to initialize a local git repo")
            return
        }
        let resestBranch: { data: string, id: number }[] = []
        for (let node of this.localBranch) {
            resestBranch.push(node)
            if (node.id == id) {
                break
            }
        }
        this.localBranch = resestBranch
        if (flag == '--mixed') {
            return
        }

        if (flag == '--hard') {
            return [this.localBranch[this.localBranch.length - 1].data, "updated wordingDir"]
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
        if (this.stage.length > 0) {
            if (this.stage[this.stage.length - 1].data == data) {
                console.log("no new data to add")
                return
            }
        }
        id++
        this.stage = []
        this.stage.push({ data, id })
    }

    commit(data: string) {
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
        this.stage.forEach(val => this.localBranch?.push({ data: val.data, id: val.id }))
        this.stage = []
        console.log(this.localBranch)
    }

    push() {
        if (!this.localBranch) {
            console.log("Please initialize a local repo. Run git init to initialize a local git repo")
            return
        }
        if (this.remoteBranch.length == this.localBranch?.length) {
            console.log('nothing to push')
            return
        }

        this.remoteBranch = []
        this.localBranch.map(node => this.remoteBranch.push(node))
        console.log(this.remoteBranch)
    }

    log() {
        if (!this.localBranch) {
            console.log("Please initialize a local repo. Run git init to initialize a local git repo")
            return
        }
        console.log(this.localBranch)
    }

    getLocalBranch() {
        if (this.localBranch) {
            return this.localBranch
        }
    }

    getRemoteBranch() {
        if (this.remoteBranch) {
            return this.remoteBranch
        }
    }

    execCommand(func: string[], data?: string, id?: number) {
        const fun = this.commands[func[0]]
        if (!fun) {
            console.log('no such command')
            return
        }
        if (func[1]) {
            fun([func[1]])
        }
        if (func[1] && func[2]) {
            const wordingDir = fun(func[1], func[2])
            console.log(wordingDir)
            if (wordingDir[1] == 'updated wordingDir') {
                return wordingDir
            }
        }
        if (data && id) {
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
    const [localbranch, setLocalBranch]: any = useState([])
    const [remotebranch, setRemoteBranch]: any = useState([])
    const [render, setRender] = useState(true)

    const handleExec = () => {
        const com = command.split(' ').filter(v => v != '')
        console.log(command, com)
        if (com[0] != 'git') {
            console.log(com[0], 'is not recognized')
            return
        }
        const wordingDir = git.execCommand([com[1], com[2], com[3]], data)
        console.log(wordingDir)
        if (wordingDir) {
            if (wordingDir[1] == 'updated wordingDir') {
                setData(wordingDir[0])
            }
        }
        const localdata = git.getLocalBranch()
        const remotedata = git.getRemoteBranch()
        setLocalBranch(localdata)
        setRemoteBranch(remotedata)
        setRender(p => !p)
    }


    return (
        <div className='px-4 py-4 border-2 rounded-xl'>
            <h1 className='text-2xl font-bold'>Git Visualizer</h1>
            <p className='mt-1'>This to show how the local branch and remote branch looks when you perform any operation</p>
            <div className='mt-6'>
                <label htmlFor="">This input field in an entry point for data</label>
                <input value={data} onChange={(e: any) => setData(e.target.value)} type="text" className='px-4 py-2 border-2 border-gray-200 rounded-md w-full mt-1' />
            </div>
            <div className='mt-8'>
                <label htmlFor="">Execute git commands using this input</label>
                <input placeholder='git status' onChange={(e: any) => setCommand(e.target.value)} type="text" className='px-4 py-2 border-2 border-gray-200 rounded-md w-full mt-1' />
                <button onClick={() => handleExec()} className='px-3 py-2 border rounded-md mt-4 hover:bg-slate-700 hover:text-slate-100'>Execute</button>
            </div>
            <div className='mt-8'>
                <p className='mb-2'>Remote Branch</p>
                <GitTimeGraph branch={remotebranch} />
            </div>
            <div className='mt-8'>
                <p className='mb-2'>Remote Branch</p>
                <GitTimeGraph branch={localbranch} />
            </div>
        </div>
    )
}

export default GitVisualizer