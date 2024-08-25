'use client'
import React, { useState } from 'react'
import GitTimeGraph from './GitTimeGraph'

let id = 0
class gitVisualizer {
    private remoteBranch: { data: string, id: number }[]
    private localBranch: { data: string, id: number }[] | null
    private commands: { [command: string]: any }
    private stage: { data: string, id: number }[]
    private stasharea: { data: string }[]
    private logs: string
    private id: number
    constructor() {
        this.stasharea = []
        this.id = 0
        this.stage = []
        this.logs = ''
        this.remoteBranch = []
        this.localBranch = null
        this.commands = {
            'status': this.status.bind(this),
            'add': this.add.bind(this),
            'init': this.init.bind(this),
            'push': this.push.bind(this),
            'commit': this.commit.bind(this),
            'log': this.log.bind(this),
            'reset': this.reset.bind(this),
            'pull': this.pull.bind(this),
            'stash': this.stash.bind(this)
        }
    }

    stash({ data, command }: { data: string, command: string }) {
        console.log(command)
        console.log(data)
        if (!this.localBranch?.length) {
            return
        }
        if (command == 'pop' && this.stasharea.length != 0) {
            if (this.localBranch[this.localBranch.length - 1].data != data) {
                this.logs += 'Please commit the changes first\n'
                return
            }
            return [this.localBranch[this.localBranch?.length - 1].data + this.stasharea.pop()?.data, 'updated workingDir']
        }
        this.stasharea.push({ data })
        console.log(this.stasharea)
        return [this.localBranch[this.localBranch?.length - 1].data, 'updated workingDir']
    }

    pull() {
        if (!this.remoteBranch.length) {
            this.logs += "Remote branch is empty\n"
            return
        }
        this.localBranch = []
        this.remoteBranch.map(node => this.localBranch?.push(node))
        console.log(this.remoteBranch[this.remoteBranch.length - 1].data)
        return [this.remoteBranch[this.remoteBranch.length - 1].data, "updated workingDir"]
    }

    reset(id: number, flag: string) {
        if (!this.localBranch) {
            this.logs += "Please initialize a local repo. Run git init to initialize a local git repo\n"
            return
        }
        let resestBranch: { data: string, id: number }[] = []
        let softStage: any
        for (let node of this.localBranch) {
            resestBranch.push(node)
            if (node.id == id) {
                break
            }
        }
        console.log(resestBranch[resestBranch.length - 1].id, this.localBranch[this.localBranch.length - 1].id)
        if (resestBranch[resestBranch.length - 1].id != this.localBranch[this.localBranch.length - 1].id) {
            softStage = this.localBranch[this.localBranch.length - 1]
        }

        console.log(flag)
        console.log(this.localBranch)
        if (flag == '--mixed') {
            console.log('in mixed')
            this.localBranch = resestBranch
            return
        }

        if (flag == '--hard') {
            console.log('in hard')
            this.localBranch = resestBranch
            return [this.localBranch[this.localBranch.length - 1].data, "updated workingDir"]
        }
        if (flag == '--soft') {
            console.log("reaching soft")
            console.log(resestBranch[resestBranch.length - 1].id, this.localBranch[this.localBranch.length - 1].id)
            if (resestBranch[resestBranch.length - 1].id != this.localBranch[this.localBranch.length - 1].id) {
                console.log(softStage.data)
                this.stage.push({ data: softStage.data, id: this.localBranch[this.localBranch.length - 1].id++ })
                console.log(this.stage)
                this.localBranch = resestBranch
                return
            }
        }
    }

    init() {
        this.id = 0
        this.stasharea = []
        this.stage = []
        this.logs = ''
        this.remoteBranch = []
        this.localBranch = []
        this.logs += 'git repo initialized successfully\n'
    }

    status(data: any) {
        console.log(this.localBranch)
        if (!this.localBranch) {
            this.logs += "Please initialize a local repo. Run git init to initialize a local git repo\n"
            return
        }
        if (this.localBranch.length > 0) {
            if (this.localBranch[this.localBranch.length - 1]?.data == data) {
                this.logs += 'local branch is upto date\n'
            } else {
                console.log(data)
                this.logs += 'local branch is not upto date, please stage the changes\n'
            }
        } else {
            this.logs += 'local branch is not upto date, please stage the changes\n'
        }
        if (this.stage.length > 0) {
            console.log(this.stage, 'things to commit')
        }
        if (this.remoteBranch.length > 0) {
            if (this.remoteBranch[this.remoteBranch.length - 1]?.data == this.localBranch[this.localBranch.length - 1].data) {
                this.logs += 'remote branch is upto date\n'
            } else {
                console.log(data)
                this.logs += 'remote branch is not upto date, please push the changes\n'
            }
        } else {
            console.log(data)
            this.logs += 'remote branch is not upto date, please push the changes\n'
        }
    }

    add({ data }: { data: string }) {
        console.log(data)
        if (!this.localBranch) {
            this.logs += "Please initialize a local repo. Run git init to initialize a local git repo\n"
            return
        }
        console.log("object")
        if (this.localBranch.length > 0) {
            if (this.localBranch[this.localBranch.length - 1]?.data == data) {
                this.logs += 'local branch is upto date\n'
                return
            } else {
                console.log("here")
                this.logs += 'local branch is not upto date, please commit the changes\n'
            }
        } else {
            console.log("and then here")
            this.logs += 'local branch is not upto date, please commit the changes\n'
        }
        if (this.stage.length > 0) {
            if (this.stage[this.stage.length - 1].data == data) {
                this.logs += "no new data to add\n"
                return
            }
        }
        id++
        this.stage = []
        this.stage.push({ data, id })
    }

    commit(data: string) {
        if (!this.localBranch) {
            this.logs += "Please initialize a local repo. Run git init to initialize a local git repo\n"
            return
        }
        if (this.stage.length == 0) {
            this.logs += "local branch is upto date\n"
            return
        }
        this.stage.forEach(val => this.localBranch?.push({ data: val.data, id: val.id }))
        this.stage = []
        this.logs += 'local branch is in sync with working dir\n'
    }

    push() {
        if (!this.localBranch) {
            this.logs += "Please initialize a local repo. Run git init to initialize a local git repo\n"
            return
        }

        this.remoteBranch = []
        this.localBranch.map(node => this.remoteBranch.push(node))
        this.logs += 'remote branch is in sync with local branch\n'
    }

    log() {
        if (!this.localBranch) {
            this.logs += "Please initialize a local repo. Run git init to initialize a local git repo\n"
            return
        }
        this.localBranch.map(d => this.logs += `(${JSON.stringify(d.data)}, ${JSON.stringify(d.id)}), `)
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

    getLogs() {
        return this.logs
    }

    execCommand(func: any, data?: string, id?: number) {
        const fun = this.commands[func[0]]
        console.log(data, func, func[1])
        let workingDir: any
        if (!fun) {
            console.log('no such command')
            return
        }
        if (func[1] !== undefined && func[2] !== undefined) {
            console.log("object")
            workingDir = fun(func[1], func[2]);
        } else if (func[1] !== undefined) {
            console.log("object2222")
            workingDir = fun({ data, command: func[1] });
        } else if (data && id) {
            console.log("object3333")
            fun({ data, id });
        } else if (!id) {
            console.log("object444")
            workingDir = fun({ data });
        }
        console.log("helloo")
        console.log(workingDir)
        if (workingDir) {
            if (workingDir[1] == 'updated workingDir') {
                return workingDir
            }
        }
    }
}

const git = new gitVisualizer()

const GitVisualizer = () => {

    const [data, setData] = useState('')
    const [command, setCommand] = useState('')
    const [localbranch, setLocalBranch]: any = useState([])
    const [remotebranch, setRemoteBranch]: any = useState([])
    const [logs, setLogs] = useState<string>()
    const [render, setRender] = useState(true)

    const handleExec = () => {
        const com = command.split(' ').filter(v => v != '')
        console.log(command, com)
        if (com[0] != 'git') {
            console.log(com[0], 'is not recognized')
            return
        }
        const workingDir = git.execCommand([com[1], com[2], com[3]], data)
        console.log(workingDir)
        if (workingDir) {
            if (workingDir[1] == 'updated workingDir') {
                setData(workingDir[0])
            }
        }
        const logs = git.getLogs()
        const localdata = git.getLocalBranch()
        const remotedata = git.getRemoteBranch()
        console.log(logs)
        setLocalBranch(localdata)
        setRemoteBranch(remotedata)
        setLogs(logs)
        setRender(p => !p)
    }


    return (
        <div className='px-4 py-4 border-2 rounded-xl'>
            <h1 className='text-2xl font-bold'>Git Visualizer</h1>
            <p className='mt-1'>This to show how the local branch and remote branch looks when you perform any operation</p>
            <div className='flex justify-between'>
                <div className='w-6/12 mt-6'>
                    <div className=''>
                        <label htmlFor="">This input field in an entry point for data</label>
                        <input value={data} onChange={(e: any) => setData(e.target.value)} type="text" className='px-4 py-2 border-2 border-gray-200 rounded-md w-full mt-1' />
                    </div>
                    <div className='mt-8'>
                        <label htmlFor="">Execute git commands using this input</label>
                        <input placeholder='git status' onChange={(e: any) => setCommand(e.target.value)} type="text" className='px-4 py-2 border-2 border-gray-200 rounded-md w-full mt-1' />
                        <button onClick={() => handleExec()} className='px-3 py-2 border rounded-md mt-4 hover:bg-slate-700 hover:text-slate-100'>Execute</button>
                    </div>
                </div>
                <div className='flex-col w-5/12 mt-6 mb-7'>
                    <label htmlFor="">Logs</label>
                    <textarea value={logs} placeholder={`# Currently, our app automatically includes all changes made when you commit, because it doesn't support selecting specific changes. This means that when you use the command 'git add .' , it adds everything you've changed.\n# It also does not support messages while commiting, so just use git commit, rather than git commit -m 'some message'`} className='border-2 border-gray-200 mt-1 h-full rounded-lg w-full px-3 py-2' name="" id="" />
                </div>
            </div>
            <div className='mt-8'>
                <p className='mb-2'>Remote Branch</p>
                <GitTimeGraph branchid={'remote'} branch={remotebranch} />
            </div>
            <div className='mt-8'>
                <p className='mb-2'>Local Branch</p>
                <GitTimeGraph branchid={'local'} branch={localbranch} />
            </div>
        </div>
    )
}

export default GitVisualizer