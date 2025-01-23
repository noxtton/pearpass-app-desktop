export const matchPatternToValue = (pattern, value) => {
  return value?.toLowerCase().includes(pattern?.toLowerCase())
}
