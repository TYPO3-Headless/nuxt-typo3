const StringLengthValidate = (value, params) => {
  function getParams (params) {
    if (!params) {
      return {
        minimum: 0,
        maximum: 0
      }
    }

    if (Array.isArray(params)) {
      return { minimum: params[0], maximum: params[1] }
    }

    return params
  }

  const { minimum, maximum } = getParams(params)
  if (Array.isArray(value)) {
    return value.every(val => !!StringLengthValidate(val, { minimum, maximum }))
  }

  return minimum <= value.length && value.length <= maximum
}

export { StringLengthValidate }
