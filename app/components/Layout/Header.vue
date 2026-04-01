<template>
  <header class="flex items-center justify-between px-4 py-2 border-b">
    <div class="text-xl font-bold">
      {{ $t('welcome') }}
    </div>
    <div class="flex items-center gap-4">
      <nav class="flex gap-4">
        <span>{{ $t('home') }}</span>
        <span>{{ $t('about') }}</span>
      </nav>
       <!-- 语言切换下拉 -->
        <div class="relative lg:block hidden" ref="langDropdownRef">
          <button
            type="button"
            class="flex cursor-pointer items-center gap-1 text-[14px] text-black hover:opacity-80"
            @click="langOpen = !langOpen"
          >
            <span class="text-[#0D0C22] font-medium">{{ currentLocaleName }}</span>

            <UIcon
              name="i-custom-arrow"
              class="w-[16px] h-[16px] rotate-90"
              :class="{ 'rotate-270!': !langOpen }"
            />
          </button>
          <Transition name="dropdown">
            <div
              v-if="langOpen"
              class="absolute grid  gap-[5px] right-[-60px] top-[25px] mt-[13px] w-[220px] p-[10px] bg-white rounded-[15px] shadow-[0_4px_16px_rgba(0,0,0,0.12)] z-50"
            >
              <button
                v-for="loc in localeOptions"
                :key="loc.code"
                type="button"
                class="w-full cursor-pointer px-[10px] py-[12px] text-left text-[14px] text-[#999999] flex items-center justify-between hover:bg-gray-100 hover:text-[#0D0C22] transition-colors rounded-[10px]"
                :class="{ 'text-[#0D0C22]!': locale === loc.code }"
                @click="switchLocale(loc.code as 'ja' | 'zh' | 'en' | 'fr' | 'ko' | 'it')"
              >
                <span class="font-medium">{{ loc.name }}</span>
                <UIcon v-if="locale === loc.code" name="i-custom-check" class="w-4 h-4 text-black shrink-0 ml-2" />
              </button>
            </div>
          </Transition>
        </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const switchLocalePath = useSwitchLocalePath()
const { locale,t } = useI18n()

const langOpen = ref(false)
  
const localeOptions = [
  { code: 'ja', name: '日本語' },
  { code: 'zh', name: '简体中文' },
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'ko', name: '한국어' },
  { code: 'it', name: 'Italiano' }
]

const currentLocaleName = computed(() => {
  const opt = localeOptions.find(o => o.code === locale.value)
  return opt?.name ?? '简体中文'
})

function switchLocale(code: 'ja' | 'zh' | 'en' | 'fr' | 'ko' | 'it') {
  langOpen.value = false
  window.location.href = switchLocalePath(code)
}
</script>

<style lang="scss" scoped>
header {
  height: 60px;
}
</style>
