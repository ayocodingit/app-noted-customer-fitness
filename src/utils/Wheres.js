module.exports = (Model) => {
  Model.queryMacro('whereBy', function (key, value) {
    if (value) {
      this.where(key, value)
    }
    return this
  })
  Model.queryMacro('orWhereBy', function (key, value) {
    if (value) {
      this.orWhere(key, value)
    }
    return this
  })
  Model.queryMacro('whereDate', function (key, value) {
    if (value) {
      this.whereRaw(`DATE(${key}) = ${value}`)
    }
    return this
  })
  Model.queryMacro('whereDateBetween', function (key, value) {
    if (value) {
      this.whereRaw(`DATE(${key}) BETWEEN ${value[0]} AND ${value[1]}`)
    }
    return this
  })
  Model.queryMacro('whereHasBy', function (relation, key, value) {
    if (value) {
      this.whereHas(relation, query => {
        query.where(key, value)
      })
    }
    return this
  })
  Model.queryMacro('orWhereHasBy', function (relation, key, value) {
    if (value) {
      this.orWhereHas(relation, query => {
        query.where(key, value)
      })
    }
    return this
  })
}
