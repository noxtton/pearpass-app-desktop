import React, { useState } from 'react'

import { generateUniqueId } from '../utils/generateUniqueId'
import { getNestedValue } from '../utils/getNestedValue'
import { setNestedValue } from '../utils/setNestedValue'

/**
 * @param {{
 *  initialValues: Record<string, string>;
 *  validate: (values: Record<string, string>) => Record<string, string>;
 * }} params
 * @returns {{
 *  values: Record<string, string>;
 *  errors: Record<string, string>;
 *  hasErrors: boolean;
 *  setValues: React.Dispatch<React.SetStateAction<Record<string, string>>>;
 *  register: (name: string) => {
 *      name: string;
 *      value: string;
 *      onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
 *  };
 *  handleSubmit: (callback: (values: Record<string, string>) => void) => (e: React.FormEvent<HTMLFormElement>) => void;
 *  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
 *  registerArray: (name: string) => {
 *    value: any[];
 *    addItem: (item: any) => void;
 *    removeItem: (index: number) => void;
 *    registerItem: (itemName: string, index: number) => {
 *    name: string;
 *    value: string;
 *    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
 *  };
 * }}
 */
export const useForm = ({ initialValues = {}, validate = () => ({}) }) => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})

  const getHasAnyErrors = (errors) => {
    const filteredErrors = Object.entries(errors).filter(
      ([_, value]) => !!value?.length
    )

    return Object.keys(filteredErrors).length > 0
  }

  const hasErrors = React.useMemo(() => getHasAnyErrors(errors), [errors])

  const register = (name) => ({
    name,
    value: getNestedValue(values, name, ''),
    error: getNestedValue(errors, name, ''),
    onChange: (event) => {
      const value = event?.target?.value || event

      setErrors((prev) => setNestedValue(prev, name, null))

      setValues((prev) => setNestedValue(prev, name, value))
    }
  })

  const registerArray = (name) => ({
    value: values[name] || [],
    addItem: (item) =>
      setValues((prev) => ({
        ...prev,
        [name]: [
          ...(prev[name] || []),
          {
            id: generateUniqueId(),
            ...item
          }
        ]
      })),
    removeItem: (index) =>
      setValues((prev) => ({
        ...prev,
        [name]: prev[name].filter((_, i) => i !== index)
      })),
    registerItem: (itemName, index) => {
      return {
        name: `${name}[${index}]`,
        value: getNestedValue(values, `${name}[${index}].${itemName}`, ''),
        error: errors?.[name]?.find(({ error, index: i }) =>
          i === index ? error[itemName] : null
        )?.error?.[itemName],
        onChange: (e) => {
          setValues((prev) =>
            setNestedValue(
              prev,
              `${name}[${index}].${itemName}`,
              e?.target?.value || e
            )
          )

          setErrors((prev) => {
            return {
              ...prev,
              [name]: prev?.[name]?.filter((item) => {
                return item.index !== index
              })
            }
          })
        }
      }
    }
  })

  const handleSubmit = (callback) => (event) => {
    event?.preventDefault()

    const validationErrors = validate(values) || {}

    if (!getHasAnyErrors(validationErrors)) {
      callback(values)
    } else {
      setErrors(validationErrors)
    }
  }

  return {
    values,
    errors,
    hasErrors,
    register,
    handleSubmit,
    setValues,
    setErrors,
    registerArray
  }
}
