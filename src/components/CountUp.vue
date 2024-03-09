<script setup lang="ts">
import { watchEffect } from 'vue'
import { useProgressiveNumber } from '@/hooks/useProgressiveNumber'

const props = defineProps<{
  initial: number
  final: number
  decimals?: number
  duration?: number
}>()

const [count, setCount] = useProgressiveNumber(
  props.initial,
  props.duration,
  props.decimals
)

watchEffect(() => {
  setCount(String(props.final))
})
</script>

<template>
  <span>{{ count }}</span>
</template>
