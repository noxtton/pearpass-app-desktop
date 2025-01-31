const LOWER_CASE = 'abcdefghijklmnopqrstuvwxyz'
const UPPER_CASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const DIGITS = '0123456789'
const SPECIAL_CHARS = '!@#$%^&*()_+[]{}|;:,.<>?'
export const generatePassword = (length, includeSpecialChars) => {
  let characters = LOWER_CASE + UPPER_CASE + DIGITS
  if (includeSpecialChars) {
    characters += SPECIAL_CHARS
  }

  let password = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    password += characters[randomIndex]
  }

  return password
}

const PASSPHRASE_WORD_LIST = [
  'guitar',
  'moon',
  'lamp',
  'elephant',
  'keyboard',
  'piano',
  'sunshine',
  'apple',
  'car',
  'bicycle',
  'book',
  'balloon',
  'dog',
  'tree',
  'camera',
  'pencil',
  'cat',
  'river',
  'pizza',
  'bicycle',
  'orange',
  'watch',
  'chair',
  'icecream',
  'robot',
  'mango',
  'jacket',
  'phone',
  'house',
  'computer',
  'plum',
  'star',
  'glove',
  'mountain',
  'guava',
  'lemon',
  'grape'
]
export const generatePassphrase = (capitalLetters, symbols, numbers, words) => {
  const passphrase = []

  for (let i = 0; i < words; i++) {
    let word =
      PASSPHRASE_WORD_LIST[
        Math.floor(Math.random() * PASSPHRASE_WORD_LIST.length)
      ]

    if (capitalLetters) {
      word = word.charAt(0).toUpperCase() + word.slice(1)
    }

    if (numbers) {
      word += Math.floor(Math.random() * 10)
    }

    if (symbols) {
      word += SPECIAL_CHARS.charAt(
        Math.floor(Math.random() * SPECIAL_CHARS.length)
      )
    }

    passphrase.push(word)
  }

  return passphrase
}

const COMMON_PASSWORDS = [
  'password',
  '123456',
  'qwerty',
  'abc123',
  'letmein',
  'welcome',
  'admin',
  '12345',
  'monkey',
  'hello'
]
export const isPasswordSafe = (password) => {
  if (password && password.length < 12) {
    return false
  }

  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumbers = /\d/.test(password)
  const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSymbols) {
    return false
  }

  if (COMMON_PASSWORDS.includes(password.toLowerCase())) {
    return false
  }

  if (/(.)\1{2,}/.test(password)) {
    return false
  }

  return true
}

const MIN_LENGTH = 20
const MIN_WORDS = 3
export const isPassphraseSafe = (wordsArray) => {
  if (!wordsArray?.length || wordsArray.length < MIN_WORDS) {
    return false
  }

  const passphraseLength = wordsArray.join('').length
  if (passphraseLength < MIN_LENGTH) {
    return false
  }

  const passphrase = wordsArray.join('')
  const hasUpperCase = /[A-Z]/.test(passphrase)
  const hasLowerCase = /[a-z]/.test(passphrase)
  const hasNumber = /\d/.test(passphrase)
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(passphrase)

  if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSymbol) {
    return false
  }

  const cleanWords = wordsArray.map((word) => word.replace(/[^a-zA-Z]/g, ''))
  const wordSet = new Set(cleanWords)

  if (wordSet.size !== cleanWords.length) {
    return false
  }

  return true
}
