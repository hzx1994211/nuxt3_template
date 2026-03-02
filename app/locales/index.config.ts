import en from './en.json'
import zh from './zh.json'

export default defineI18nConfig(() => {
  return {
    legacy: false,
    messages: {
      zh,
      en
    }
  }
})