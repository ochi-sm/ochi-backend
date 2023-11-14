// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  machineDataValidator,
  machinePatchValidator,
  machineQueryValidator,
  machineResolver,
  machineExternalResolver,
  machineDataResolver,
  machinePatchResolver,
  machineQueryResolver,
  machineSchema,
  machineDataSchema,
  machinePatchSchema,
  machineQuerySchema,
} from './machines.schema'

import type { Application } from '../../declarations'
import { MachineService, getOptions } from './machines.class'
import { createSwaggerServiceOptions } from 'feathers-swagger'

export const machinePath = 'machines'
export const machineMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export * from './machines.class'
export * from './machines.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const machine = (app: Application) => {
  // Register our service on the Feathers application
  app.use(machinePath, new MachineService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: machineMethods,
    // You can add additional custom events to be sent to clients here
    events: [],
    docs: createSwaggerServiceOptions({
      schemas: {
        machineSchema,
        machineDataSchema,
        machinePatchSchema,
        machineQuerySchema,
      },
      docs: {
        description: 'A service to manage the machines.',
        securities: [],
      }
    })
  })
  // Initialize hooks
  app.service(machinePath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(machineExternalResolver),
        schemaHooks.resolveResult(machineResolver)
      ],
      find: [authenticate('jwt')],
      get: [authenticate('jwt')],
      create: [],
      update: [authenticate('jwt')],
      patch: [authenticate('jwt')],
      remove: [authenticate('jwt')]
    },
    before: {
      all: [schemaHooks.validateQuery(machineQueryValidator), schemaHooks.resolveQuery(machineQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(machineDataValidator), schemaHooks.resolveData(machineDataResolver)],
      patch: [schemaHooks.validateData(machinePatchValidator), schemaHooks.resolveData(machinePatchResolver)],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [machinePath]: MachineService
  }
}
