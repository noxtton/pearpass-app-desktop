import { html } from 'htm/react'
import { useCountDown } from 'pear-apps-lib-ui-react-hooks'
import { useUserData } from 'pearpass-lib-vault'
import { useTheme } from 'styled-components'

import {
  CardContainer,
  Header,
  Title,
  Description,
  TimerContainer,
  TimerLabel,
  TimerValue
} from './styles'
import { NAVIGATION_ROUTES } from '../../../constants/navigation'
import { useRouter } from '../../../context/RouterContext'
import { useTranslation } from '../../../hooks/useTranslation'
import { LockIcon, TimeIcon } from '../../../lib-react-components'

export const LockedScreen = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  const { navigate } = useRouter()
  const { masterPasswordStatus, refreshMasterPasswordStatus } = useUserData()

  const onFinish = async () => {
    const status = await refreshMasterPasswordStatus()

    if (!status?.isLocked) {
      navigate('welcome', { state: NAVIGATION_ROUTES.MASTER_PASSWORD })
    }
  }

  const timeRemaining = useCountDown({
    initialSeconds: Math.ceil(masterPasswordStatus.lockoutRemainingMs / 1000),
    onFinish: () => onFinish()
  })

  return html`
    <${CardContainer}>
      <${Header}>
        <${LockIcon} 
          width="32" 
          height="32" 
          color=${theme.colors.primary400.mode1} 
        />
        <${Title}>${t('PearPass locked')}</>
      </>

      <${Description}>
        <span>${t('Too many failed attempts.')}</span>
        <span>${t('For your security, access is locked for 5 minutes.')}</span>
      </>

      <${TimerContainer}>
        <${TimerLabel}>
          <${TimeIcon} 
            width="20" 
            height="20" 
            color=${theme.colors.primary400.mode1} 
          />
          ${t('Try again in')}
        </>
        <${TimerValue}>${timeRemaining}</>
      </>
    </>
  `
}
