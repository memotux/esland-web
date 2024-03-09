<script setup lang="ts">
import styles from '@/components/styles/NumerosItem.module.css'

interface Props {
  title: string
  children?: preact.ComponentChildren
}

defineProps<Props>()
</script>

<template>
  <div class="flex flex-col justify-center items-center">
    <span :class="`${styles.number} text-7xl font-bold tabular-nums tracking-tighter`">
      <slot />
    </span>
    <span class="uppercase opacity-70">{{ title }}</span>
  </div>
</template>
