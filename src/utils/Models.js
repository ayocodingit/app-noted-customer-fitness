'use strict'
const { StatusCodes } = require('http-status-codes')

const paginate = async (request, model) => {
  const page = request.input('page', 1)
  const perPage = request.input('perPage', 50)
  return await model.paginate(page, perPage)
}

const store = async (payload, model, response) => {
  await model.create(payload)
  return response.status(StatusCodes.CREATED).json({ message: 'Created' })
}

const show = async (id, model) => {
  return await model.findOrFail(id)
}

const update = async (id, payload, model) => {
  const record = await model.findOrFail(id)
  record.merge(payload)
  return await record.save()
}

const destroy = async (id, model) => {
  const record = await model.findOrFail(id)
  await record.delete()
  return { message: 'Deleted' }
}

const payload = async (request, model) => {
  return request.only(model.fillable)
}

module.exports = {
  paginate,
  store,
  show,
  update,
  destroy,
  payload
}
