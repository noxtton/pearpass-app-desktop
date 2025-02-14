import React, { useEffect } from 'react'

import { html } from 'htm/react'
import { useForm } from 'pearpass-lib-form'

import { BadgeCopyClipboard } from '../../../components/BadgeCopyClipboard'
import { FormWrapper } from '../../../components/FormWrapper'
import { useCopyToClipboard } from '../../../hooks/useCopyToClipboard'
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
  const { copyToClipboard, isCopied } = useCopyToClipboard()

  const initialValues = React.useMemo(
    () => ({
      customFields: initialRecord?.data?.customFields || [],
      folder: selectedFolder ?? initialRecord?.folder
    }),
    [initialRecord, selectedFolder]
  )

  const { registerArray, setValues } = useForm({ initialValues: initialValues })

  const { value: list, registerItem } = registerArray('customFields')

  const handleCopy = (value) => {
    if (!value?.length) {
      return
    }

    copyToClipboard(value)
  }

  useEffect(() => {
    setValues(initialValues)
  }, [initialValues, setValues])

  return html`
    <${FormWrapper}>
      <${CustomFields}
        areInputsDisabled=${true}
        customFields=${list}
        onClick=${handleCopy}
        register=${registerItem}
      />
      <${BadgeCopyClipboard} isCopied=${isCopied} />
    <//>
  `
}
