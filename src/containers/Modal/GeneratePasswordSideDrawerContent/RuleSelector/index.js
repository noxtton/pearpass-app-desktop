import { html } from 'htm/react'

import { SwitchWithLabel } from '../../../../components/SwitchWithLabel'

/**
 * @param {{
 *  rules: Array<{
 *  label: string,
 *  name: string
 *  }>
 *  setRules: () => void,
 *  selectedRules
 * }} props
 */
export const RuleSelector = ({ rules, selectedRules, setRules }) => {
  const isAllRuleSelected = Object.values(selectedRules).every(
    (value) => value === true
  )
  const handleSwitchToggle = (ruleName) => {
    const updatedRules = { ...selectedRules }

    if (ruleName === 'all') {
      if (isAllRuleSelected) {
        Object.keys(updatedRules).forEach((rule) => {
          updatedRules[rule] = false
        })
      } else {
        Object.keys(updatedRules).forEach((rule) => {
          updatedRules[rule] = true
        })
      }
    } else {
      updatedRules[ruleName] = !updatedRules[ruleName]
    }

    setRules(updatedRules)
  }

  return html`${rules.map(
    (rule) =>
      html`<${SwitchWithLabel}
        label=${rule.label}
        isOn=${selectedRules[rule.name] | isAllRuleSelected}
        onChange=${() => handleSwitchToggle(rule.name)}
        isLabelBold
      />`
  )} `
}
