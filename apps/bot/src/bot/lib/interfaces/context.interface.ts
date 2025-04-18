import { Context, SessionFlavor } from 'grammy'
import { ISesssionData } from './session-data.interface'

export type IContext = Context & SessionFlavor<ISesssionData>
