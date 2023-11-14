// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { MachineService } from './machines.class'

// Main data model schema
export const machineSchema = Type.Object(
  {
    id: Type.Number(),
    token: Type.String(),
  },
  { $id: 'Machine', additionalProperties: false }
)
export type Machine = Static<typeof machineSchema>
export const machineValidator = getValidator(machineSchema, dataValidator)
export const machineResolver = resolve<Machine, HookContext<MachineService>>({})

export const machineExternalResolver = resolve<Machine, HookContext<MachineService>>({})

// Schema for creating new entries
export const machineDataSchema = Type.Pick(machineSchema, ['token'], {
  $id: 'MachineData'
})
export type MachineData = Static<typeof machineDataSchema>
export const machineDataValidator = getValidator(machineDataSchema, dataValidator)
export const machineDataResolver = resolve<Machine, HookContext<MachineService>>({})

// Schema for updating existing entries
export const machinePatchSchema = Type.Partial(machineSchema, {
  $id: 'MachinePatch'
})
export type MachinePatch = Static<typeof machinePatchSchema>
export const machinePatchValidator = getValidator(machinePatchSchema, dataValidator)
export const machinePatchResolver = resolve<Machine, HookContext<MachineService>>({})

// Schema for allowed query properties
export const machineQueryProperties = Type.Pick(machineSchema, ['id', 'token'])
export const machineQuerySchema = Type.Intersect(
  [
    querySyntax(machineQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type MachineQuery = Static<typeof machineQuerySchema>
export const machineQueryValidator = getValidator(machineQuerySchema, queryValidator)
export const machineQueryResolver = resolve<MachineQuery, HookContext<MachineService>>({})
