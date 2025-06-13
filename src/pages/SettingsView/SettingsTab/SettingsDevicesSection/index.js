import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { formatDate } from 'pear-apps-utils-date'
import { useVault } from 'pearpass-lib-vault'

import { Description, content } from './styles'
import { CardSingleSetting } from '../../../../components/CardSingleSetting'
import { ListItem } from '../../../../components/ListItem'

/**
 * @param {{}} props
 */
export const SettingsDevicesSection = () => {
  const { i18n } = useLingui()
  const { data } = useVault()

  console.log('data', data)

  return html`
    <${CardSingleSetting} title=${i18n._('Linked devices')}>
      <${content}>
        <${Description}
          >${i18n._('Here you can find a list of the connected devices.')}
        <//>
        ${data?.devices?.map(
          (device) =>
            html`<${ListItem}
              key=${device.data}
              itemName=${device.data}
              itemDateText=${i18n._('Added on') +
              ' ' +
              formatDate(device.createdAt, 'dd-mm-yyyy', '/')}
              item=${{ ...device, name: device.data }}
            />`
        )}
      <//>
    <//>
  `
}
