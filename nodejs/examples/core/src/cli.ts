import fs from 'fs'

import { Argv } from 'yargs'

import { ark } from './../../../ark/src'
import { AppState } from './../../../ark/src/appState'
import { importWorkflowByFile, runWorkflow, runWorkflowByFile } from './../../../ark/src/flow'

import Logger from './plugins/log'
import { serve } from './server'

ark.registerPlugin(Logger)

function startServer(port: string, appState: AppState) {
    console.info(`Serve on port ${port}.`);
    serve(Number(port), appState)
}

const appState = new AppState()

// invoke startup flow of the project
async function start() {
    /**
     * App的StartupFlow仅会在server启动的时候执行一次，你可以任意设置App的State
     * Server启动之后AppState会被引用
     */
    const flowFilename = __dirname + '/flows/app/startup'
    if (fs.existsSync(flowFilename)) {
        const ns = await importWorkflowByFile(flowFilename)
        const startupFlow = new ns.Main({
            appState,
        })

        await runWorkflow(startupFlow)
    }

    /**
     * 注册App级别的Hook
     */

     /**
      * 注册中间件
      */
}

start().then(() => {
    require('yargs')
        .command('run', 'run workflow', (yargs: Argv) => {
            yargs.option('name', {
                describe: 'Workflow to execute',
                demand: true,
            }).option('inputs', {
                default: null,
                describe: 'Data to set as the inputs',
            })
        }, (args: any) => {
            const flowDirectory = __dirname + '/flows'
            const flowFilename = flowDirectory + '/' + args.name
            const inputs = args.inputs
            runWorkflowByFile(flowFilename, inputs, {
                appState: appState,
            }).then((data) => {
                console.info(data)
            })
        })
        .command('serve', "Start the server.", (yargs: Argv) => {
            yargs.option('port', {
                describe: "Port to bind on",
                default: "3000",
            })
        }, (args: any) => {
            startServer(args.port, appState);
        }).argv
}).catch((error) => {
    console.info(error)
})