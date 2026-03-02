<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-4">Pinia 持久化演示</h1>

    <div class="space-y-4 border p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
      <div>
        <label class="block text-sm font-medium mb-1">用户名：</label>
        <UInput v-model="userStore.name" placeholder="输入名称" />
      </div>

      <div>
        <p class="mb-2">当前计数：<span class="text-primary-500 font-mono text-xl">{{ userStore.counter }}</span></p>
        <UButton @click="userStore.increment" color="primary">增加计数</UButton>
      </div>
    </div>

    <div class="mt-6 text-sm text-gray-500">
      <p>💡 <strong>操作指南：</strong></p>
      <ol class="list-decimal ml-5 mt-2 space-y-1">
        <li>修改上面的名称或点击增加计数。</li>
        <li><strong>直接刷新页面</strong>。</li>
        <li>你会发现数据依然保留，因为它已持久化到 Cookie 中。</li>
      </ol>
    </div>

    <div class="mt-8">
      <UButton to="/" variant="link" icon="i-lucide-arrow-left">返回首页</UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore()
</script>
