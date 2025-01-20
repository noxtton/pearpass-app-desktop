import React, { useEffect } from 'react'

import { html } from 'htm/react'

import { FormWrapper } from '../../../components/FormWrapper'
import { useForm } from '../../../hooks/useForm'
import { CustomFields } from '../../CustomFields'

/**
 *
 * @param {{
 *  initialRecord: {
 *    data: {
 *      title: string
 *      customFields: {
 *          note: string
 *          type: string
 *     }[]
 *   }
 *  }
 *  selectedFolder?: string
 * }} props
 * @returns
 */
export const CustomDetailsForm = ({ initialRecord, selectedFolder }) => {
  const initialValues = React.useMemo(
    () => ({
      customFields: initialRecord?.data?.customFields || [],
      folder: selectedFolder ?? initialRecord?.folder
    }),
    [initialRecord, selectedFolder]
  )

  const { registerArray, setValues } = useForm({
    initialValues: initialValues
  })

  const { value: list, registerItem } = registerArray('customFields')

  useEffect(() => {
    setValues(initialValues)
  }, [initialValues, setValues])

  return html`
    <${FormWrapper}>
      <${CustomFields}
        areInputsDisabled=${true}
        customFields=${list}
        register=${registerItem}
      />
    <//>
  `
}
