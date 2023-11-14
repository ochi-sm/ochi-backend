import { machine } from './machines/machines'
import { user } from './users/users'
import { authentication } from './machines/authentication/authentication'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(machine)
  app.configure(user)
  app.configure(authentication)
  // All services will be registered here
}
