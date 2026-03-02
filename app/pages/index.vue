<template>
  <div>首页 {{ displayFoo }}</div>
</template>

<script setup lang="ts">
const foo = useFoo()
const displayFoo = ref('')

onMounted(() => {
  displayFoo.value = foo.value
})
</script>
