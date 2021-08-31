const Gate = use('Gate')
const RoleEnum = use('App/Enums/RoleEnum')

Gate.define('admin', (user) => {
  return user.role === RoleEnum.ADMIN.value
})

Gate.define('customer', (user) => {
  return user.role === RoleEnum.CUSTOMER.value
})
