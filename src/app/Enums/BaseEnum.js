'use strict'

const Enum = require('enum')

class BaseEnum {
  constructor (enums) {
    this.enum = new Enum(enums)
  }

  getArray (option) {
    const enums = []
    this.enum.enums.forEach(function (enumItem) {
      enums.push(enumItem[option])
    })

    return enums
  }

  getString (option) {
    return this.getArray(option).toString()
  }

  getStringWithSpace (option) {
    return this.getArray(option).join(', ')
  }
}

module.exports = BaseEnum
