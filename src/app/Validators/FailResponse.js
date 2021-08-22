'use strict'

const { StatusCodes } = require('http-status-codes')

module.exports = (errorMessages) => {
  return this.ctx.response
    .status(StatusCodes.UNPROCESSABLE_ENTITY)
    .json({ errors: errorMessages })
}
