import { useEffect, useState } from 'react'

import { html } from 'htm/react'
import { BLIND_PEER_TYPE } from 'pearpass-lib-constants'
import { useBlindMirrors } from 'pearpass-lib-vault'

import { CardSingleSetting } from '../../../../components/CardSingleSetting'
import { BlindPeersModalContent } from '../../../../containers/Modal/BlindPeersModalContent'
import { RuleSelector } from '../../../../containers/Modal/GeneratePasswordSideDrawerContent/RuleSelector'
import { useLoadingContext } from '../../../../context/LoadingContext'
import { useModal } from '../../../../context/ModalContext'
import { useToast } from '../../../../context/ToastContext'
import { useTranslation } from '../../../../hooks/useTranslation'

export const SettingsBlindPeersSection = () => {
  const { t } = useTranslation()
  const { setIsLoading } = useLoadingContext()
  const { setModal, closeModal } = useModal()
  const { setToast } = useToast()

  const {
    removeAllBlindMirrors,
    data: blindMirrorsData,
    getBlindMirrors,
    addBlindMirrors,
    addDefaultBlindMirrors
  } = useBlindMirrors()

  const [blindPeersRules, setBlindPeersRules] = useState({
    blindPeers: false
  })

  useEffect(() => {
    if (blindMirrorsData.length > 0) {
      setBlindPeersRules({ blindPeers: true })
    } else {
      setBlindPeersRules({ blindPeers: false })
    }
  }, [blindMirrorsData])

  useEffect(() => {
    getBlindMirrors()
  }, [])

  const handleBlindMirrorsRequest = async (callback, errorMessage) => {
    try {
      setIsLoading(true)
      await callback()
      setBlindPeersRules({ blindPeers: !blindPeersRules.blindPeers })
    } catch {
      setToast({
        message: t(errorMessage)
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleBlindPeersConfirm = async (data) => {
    if (data.blindPeerType === BLIND_PEER_TYPE.PERSONAL) {
      if (data.blindPeers?.length) {
        await handleBlindMirrorsRequest(
          () => addBlindMirrors(data.blindPeers),
          'Error adding blind mirrors'
        )
      } else return
    }

    if (data.blindPeerType === BLIND_PEER_TYPE.DEFAULT) {
      await handleBlindMirrorsRequest(
        addDefaultBlindMirrors,
        'Error adding default blind mirrors'
      )
    }

    closeModal()
  }

  const handleSetBlindPeersRules = async (newRules) => {
    if (newRules.blindPeers === true) {
      setModal(
        html`<${BlindPeersModalContent}
          onConfirm=${handleBlindPeersConfirm}
          onClose=${() => {
            setBlindPeersRules({ blindPeers: false })
            closeModal()
          }}
        />`
      )
    }

    if (newRules.blindPeers === false) {
      await handleBlindMirrorsRequest(
        removeAllBlindMirrors,
        'Error removing blind mirrors'
      )
    }
  }

  return html`
    <${CardSingleSetting} title=${t('Blind Peering')}>
      <${RuleSelector}
        rules=${[
          {
            name: 'blindPeers',
            label: t(`Private Connections`),
            description: t(
              `Allow replicating this encrypted vault through blind peers for better availability. Blind peers can never read your data.`
            )
          }
        ]}
        selectedRules=${blindPeersRules}
        setRules=${handleSetBlindPeersRules}
      />
    <//>
  `
}
