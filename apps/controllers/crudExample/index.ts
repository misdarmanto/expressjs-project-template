import { createCrudExample } from './create'
import { findAllCrudExample, findOneCrudExample } from './find'
import { removeCrudExample } from './remove'
import { updateCrudExample } from './update'

export const crudExampleController = {
  create: createCrudExample,
  findAll: findAllCrudExample,
  findOne: findOneCrudExample,
  remove: removeCrudExample,
  update: updateCrudExample
}
