import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    name: '张三',
    counter: 0
  }),
  actions: {
    increment() {
      this.counter++
    },
    setName(newName: string) {
      this.name = newName
    }
  },
  persist: true // 开启持久化，默认使用 Cookie 存储以支持 SSR
})
