// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBase: '',
      env: ''
    }
  },

  app: {
    // 設置全局的過度動畫 也可單獨設置
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'NUXT3',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
      ]
    }
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt'
  ],
  i18n: {
    locales: [
      { code: 'zh', iso: 'zh-CN', name: '简体中文' },
      { code: 'en', iso: 'en-US', name: 'English' }
    ],
    defaultLocale: 'zh',
    strategy: 'prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    },
    vueI18n: '~/locales/index.config.ts'
  },

  devtools: {
    enabled: false
  },

  css: ['~/assets/css/main.css'],


  compatibilityDate: '2025-01-15',

  // 移除手动的 components 扫描以避免冲突，Nuxt 4 默认会自动扫描 app/components

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },
  devServer: {
    port: 8009 // 端口號
  },

  plugins: [],
  vite: {
    // 預處理器配置
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler'  // 使用現代編譯器
        }
      }
    },
    server: {
      proxy: {
        // '/useApi': {
        //   target: process.env.VITE_APP_BASE_API,
        //   changeOrigin: true,
        //   rewrite: path => path.replace(/^\/useApi/, '')
        // }
      }
    }
  }
})
