const isNullOrUndefined = (value) => value === null || value === undefined

const isEmpty = (value) => {
  if (isNullOrUndefined(value)) {
    return true
  }

  if (typeof value === 'string' && value.trim() === '') {
    return true
  }

  return false
}

const checkFilledValueType = (value, type) => {
  if (type === 'array') {
    return !isNullOrUndefined(value) && !Array.isArray(value)
  }

  return !isNullOrUndefined(value) && typeof value !== type
}

export class Validator {
  constructor(type) {
    this.type = type
    this.validations = []
    this.itemSchema = null
  }

  required(message = 'This field is required') {
    this.validations.push((value) => (isEmpty(value) ? message : null))

    return this
  }

  minLength(length, message) {
    if (this.type !== 'string') {
      throw new Error('minLength is only applicable to strings')
    }

    this.validations.push((value) =>
      value?.length < length ? message || `Minimum length is ${length}` : null
    )

    return this
  }

  maxLength(length, message) {
    if (this.type !== 'string') {
      throw new Error('maxLength is only applicable to strings')
    }

    this.validations.push((value) =>
      value?.length > length ? message || `Maximum length is ${length}` : null
    )

    return this
  }

  min(value, message) {
    if (this.type !== 'number') {
      throw new Error('min is only applicable to numbers')
    }

    this.validations.push((val) =>
      val < value ? message || `Minimum value is ${value}` : null
    )

    return this
  }

  max(value, message) {
    if (this.type !== 'number') {
      throw new Error('max is only applicable to numbers')
    }

    this.validations.push((val) =>
      val > value ? message || `Maximum value is ${value}` : null
    )

    return this
  }

  items(schema) {
    if (this.type !== 'array') {
      throw new Error('items() is only applicable to arrays')
    }

    this.itemSchema = schema

    return this
  }

  email(message) {
    if (this.type !== 'string') {
      throw new Error('email is only applicable to strings')
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    this.validations.push((value) =>
      value && !emailRegex.test(value) ? message : null
    )

    return this
  }

  refine(fn) {
    this.validations.push((value) => fn(value))

    return this
  }

  validate(value) {
    if (checkFilledValueType(value, this.type)) {
      return `Expected ${this.type}, but got ${typeof value}`
    }

    if (this.type === 'array' && this.itemSchema) {
      const itemErrors = value?.map((item) => this.itemSchema.validate(item))

      const hasErrors = itemErrors?.some((err) => err !== null)

      if (hasErrors) {
        return itemErrors
          .map((err, idx) => (err ? { index: idx, error: err } : null))
          .filter(Boolean)
      }
    }

    for (const validation of this.validations) {
      const error = validation(value)

      if (error) {
        return error
      }
    }

    return null
  }

  static boolean() {
    return new Validator('boolean')
  }

  static string() {
    return new Validator('string')
  }

  static number() {
    return new Validator('number')
  }

  static array() {
    return new Validator('array')
  }

  static object(schema) {
    return {
      validate(obj) {
        const errors = {}

        for (const [key, validator] of Object.entries(schema)) {
          const error = validator.validate(obj[key])

          if (error) errors[key] = error
        }

        return Object.keys(errors).length > 0 ? errors : null
      }
    }
  }
}
