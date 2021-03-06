import { AppState } from './appState'
import { NodeIDType } from './node'
import { Response } from './response'

export class FlowOptions {

    /**
     * request object from expressjs
     */
    request?: any
    response?: Response

    appState?: AppState

    debug?: boolean

    debugStatePersistentFile?: string

    verbose?: boolean = false

    /**
     * optional to set the start entry
     */
    startId?: NodeIDType

    /**
     * optional to set the stop point
     */
    stopId?: NodeIDType
}