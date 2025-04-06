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
      Object.keys(updatedRules).forEach((rule) => {
        updatedRules[rule] = !isAllRuleSelected
      })
    } else {
      updatedRules[ruleName] = !updatedRules[ruleName]
    }

    setRules(updatedRules)
  }

  return html`${rules.map(
    (rule) =>
      html`<${SwitchWithLabel}
        label=${rule.label}
        isOn=${selectedRules[rule.name] || isAllRuleSelected}
        onChange=${() => handleSwitchToggle(rule.name)}
        isLabelBold
      />`
  )} `
}
