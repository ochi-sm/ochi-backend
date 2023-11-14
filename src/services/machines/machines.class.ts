// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Machine, MachineData, MachinePatch, MachineQuery } from './machines.schema'

export type { Machine, MachineData, MachinePatch, MachineQuery }

export interface MachineParams extends KnexAdapterParams<MachineQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class MachineService<ServiceParams extends Params = MachineParams> extends KnexService<
  Machine,
  MachineData,
  MachineParams,
  MachinePatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('sqliteClient'),
    name: 'machines'
  }
}
