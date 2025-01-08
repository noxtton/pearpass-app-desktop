import { useState } from 'react'

/**
 * @param {{
 *  initialValues: Record<string, string>;
 *  validate: (values: Record<string, string>) => Record<string, string>;
 * }} params
 * @returns {{
 *  values: Record<string, string>;
 *  errors: Record<string, string>;
 *  hasErrors: boolean;
 *  register: (name: string) => {
 *      name: string;
 *      value: string;
 *      onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
 *  };
 *  registerArray: (name: string) => {
 *      value: string[];
 *      addItem: (item: string) => void;
 *      removeItem: (index: number) => void;
 *      registerItem: (index: number) => {
 *          name: string;
 *          value: string;
 *          onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
 *      };
 *  };
 *  handleSubmit: (callback: (values: Record<string, string>) => void) => (e: React.FormEvent<HTMLFormElement>) => void;
 * }}
 */
export const useForm = ({ initialValues = {}, validate = () => ({}) }) => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})

  const hasErrors = Object.keys(errors).length > 0

  const register = (name) => ({
    name,
    value: values[name] || '',
    onChange: (event) => {
      const value = event?.target?.value || event
      setValues((prev) => ({ ...prev, [name]: value }))
    }
  })

  const registerArray = (name) => ({
    value: values[name] || [],
    addItem: (item) =>
      setValues((prev) => ({
        ...prev,
        [name]: [...(prev[name] || []), item]
      })),
    removeItem: (index) =>
      setValues((prev) => ({
        ...prev,
        [name]: prev[name].filter((_, i) => i !== index)
      })),
    registerItem: (index) => ({
      name: `${name}[${index}]`,
      value: values[name]?.[index] || '',
      onChange: (event) =>
        setValues((prev) => ({
          ...prev,
          [name]: prev[name].map((item, i) => {
            const value = event?.target?.value || event

            i === index ? value : item
          })
        }))
    })
  })

  const handleSubmit = (callback) => (e) => {
    e?.preventDefault()

    const validationErrors = validate(values)

    if (Object.keys(validationErrors).length === 0) {
      callback(values)
    } else {
      setErrors(validationErrors)
    }
  }

  return { values, errors, hasErrors, register, registerArray, handleSubmit }
}
