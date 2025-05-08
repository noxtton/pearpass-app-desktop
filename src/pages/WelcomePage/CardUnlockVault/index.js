import { useMemo, useState } from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { useForm } from 'pear-apps-lib-ui-react-hooks'
import { Validator } from 'pear-apps-utils-validator'
import {
  ButtonPrimary,
  ButtonSecondary,
  PearPassPasswordField
} from 'pearpass-lib-ui-react-components'
import { useVault, useVaults } from 'pearpass-lib-vault'

import { ButtonWrapper, CardContainer, CardTitle, Title } from './styles'
import { useGlobalLoading } from '../../../context/LoadingContext'
import { useRouter } from '../../../context/RouterContext'
import { logger } from '../../../utils/logger'

export const CardUnlockVault = () => {
  const { i18n } = useLingui()

  const [isLoading, setIsLoading] = useState(false)

  useGlobalLoading({ isLoading })

  const { navigate, currentPage, data: routerData } = useRouter()

  const { refetch } = useVault({ shouldSkip: true })
  const { data: vaults } = useVaults()

  const vault = useMemo(
    () => vaults.find((vault) => vault.id === routerData.vaultId),
    [vaults, routerData]
  )

  const schema = Validator.object({
    password: Validator.string().required(i18n._('Password is required'))
  })

  const { register, handleSubmit, setErrors } = useForm({
    initialValues: { password: '' },
    validate: (values) => schema.validate(values)
  })

  const onSubmit = async (values) => {
    if (!routerData.vaultId || isLoading) {
      return
    }

    try {
      setIsLoading(true)

      await refetch(routerData.vaultId, values.password)

      setIsLoading(false)

      navigate('vault', { recordType: 'all' })
    } catch (error) {
      setErrors({
        password: i18n._('Invalid password')
      })

      setIsLoading(false)

      logger.error(error)
    }
  }

  return html`
    <${CardContainer} onSubmit=${handleSubmit(onSubmit)}>
      <${CardTitle}>
        <${Title}>
          ${i18n._('Unlock {vaultName} with your vault password', {
            vaultName: vault.name ?? vault.id
          })}
        <//>
      <//>

      <${PearPassPasswordField} ...${register('password')} />

      <${ButtonWrapper}>
        <${ButtonPrimary} type="submit"> ${i18n._('Continue')} <//>

        <${ButtonSecondary}
          onClick=${() => navigate(currentPage, { state: 'vaults' })}
        >
          ${i18n._('Select vaults')}
        <//>
      <//>
    <//>
  `
}
