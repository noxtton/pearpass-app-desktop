import React, { useEffect } from 'react'

import { useLingui } from '@lingui/react/macro'
import { html } from 'htm/react'
import { useForm } from 'pear-apps-lib-ui-react-hooks'
import { CopyIcon } from 'pearpass-lib-ui-react-components'

import { FormWrapper } from '../../../components/FormWrapper'
import { useToast } from '../../../context/ToastContext'
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
  const { i18n } = useLingui()

  const { setToast } = useToast()

  const { copyToClipboard } = useCopyToClipboard({
    onCopy: () => {
      setToast({
        message: i18n._('Copied to clipboard'),
        icon: CopyIcon
      })
    }
  })

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
    <//>
  `
}
