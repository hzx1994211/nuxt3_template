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
      <UDropdownMenu :items="items" :content="{ align: 'start' }">
        <UButton label="Language" trailing-icon="i-heroicons-chevron-down-20-solid" variant="ghost" />
      </UDropdownMenu>
    </div>
  </header>
</template>

<script setup lang="ts">
const switchLocalePath = useSwitchLocalePath()

const items = [
  [{
    label: '简体中文',
    click: () => {
      navigateTo(switchLocalePath('zh'))
    }
  }, {
    label: 'English',
    click: () => {
      navigateTo(switchLocalePath('en'))
    }
  }]
]
</script>

<style lang="scss" scoped>
header {
  height: 60px;
}
</style>