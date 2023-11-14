import { Id, Params } from '@feathersjs/feathers';
import type { Application } from '../../../declarations'
import { Static, Type } from '@feathersjs/typebox';

export const path = 'machines/authentication'

export const machineAuthenticationSchema = Type.Object(
    {
      id: Type.Number(),
      key: Type.String(),
    },
    { $id: 'MachineAuthentication', additionalProperties: false }
)

export type MachineAuthentication = Static<typeof machineAuthenticationSchema>

export class MachinesAuthenticationService {
    async create(data: MachineAuthentication, params: Params) {
        
    }
}

export const authentication = (app: Application) => {
    app.use(path, new MachinesAuthenticationService(), {
        methods: ["create"],
        events: [],
    });
}