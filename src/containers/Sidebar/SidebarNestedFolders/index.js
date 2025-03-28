import { useEffect, useState } from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { PlusIcon } from 'pearpass-lib-ui-react-components'
import { colors } from 'pearpass-lib-ui-theme-provider'

import { NestedFoldersWrapper } from './styles'
import { SidebarFolder } from '../../../components/SidebarFolder'
import { useModal } from '../../../context/ModalContext'
import { useRouter } from '../../../context/RouterContext'
import { CreateFolderModalContent } from '../../Modal/CreateFolderModalContent'
import { SidebarNestedFile } from '../SidebarNestedFile'

/**
 * @param {{
 *  item: {
 *    name: string,
 *    icon: string,
 *    isAlwaysVisible: boolean,
 *    isOpenInitially: boolean,
 *    isActive: boolean,
 *     children: {
 *        name: string,
 *        icon: string,
 *     }[]
 *   },
 *  level: number
 * }} props
 */
export const SidebarNestedFolders = ({ item, level = 0 }) => {
  const { i18n } = useLingui()
  const { setModal } = useModal()
  const { navigate } = useRouter()

  const isRoot = level === 0

  const [isOpen, setIsOpen] = useState(isRoot)

  const isFolder = 'children' in item

  const handleAddClick = () => {
    setModal(html` <${CreateFolderModalContent} /> `)
  }

  const handleFolderClick = () => {
    if (isRoot) {
      return navigate('vault', { recordType: 'all' })
    }
    navigate('vault', { recordType: 'all', folder: item.id })
  }

  if (!isFolder) {
    return html`
      <${SidebarNestedFile}
        icon=${item.icon}
        id=${item.id}
        name=${item.name}
        key=${item.name + item.id + 'file'}
      />
    `
  }

  useEffect(() => {
    if (!isRoot) {
      setIsOpen(item.isOpenInitially)
    }
  }, [item.isOpenInitially, isRoot])

  if (!item.children.length) {
    return html``
  }

  return html`
    <${NestedFoldersWrapper} level=${level}>
      <${SidebarFolder}
        onAddClick=${handleAddClick}
        isOpen=${isOpen}
        onClick=${handleFolderClick}
        onDropDown=${() => setIsOpen(!isOpen)}
        isRoot=${isRoot}
        isActive=${item.isActive}
        name=${item.name}
        icon=${item.icon}
        key=${item.name + item.id}
      />

      ${isOpen &&
      html`
        ${item.children.map((childItem) =>
          childItem?.name?.length
            ? html`
                <${SidebarNestedFolders}
                  key=${childItem.name + childItem.id + level}
                  item=${childItem}
                  level=${level + 1}
                />
              `
            : html``
        )}
        ${!isRoot &&
        html`
          <${SidebarNestedFile}
            key=${item.id + 'newFile'}
            folderId=${item.id}
            icon=${PlusIcon}
            name=${i18n._('New')}
            isNew=${true}
            color=${colors.primary400.mode1}
          />
        `}
      `}
    <//>
  `
}
