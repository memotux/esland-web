<script setup lang="ts">
import { ref } from 'vue'
import Galeria from './Galeria.vue'
import Numeros from './Numeros.tsx'
import Palmares from './Palmares.vue'
import editions from '@/data/editions-info.json'
import styles from '@/components/styles/Editions.module.css'
import type { getI18N } from '@/i18n'

defineProps<{ i18n: ReturnType<typeof getI18N> }>()

const edicion = ref('1')
</script>

<template>
  <div class="flex h-24 mt-4">
    <button
      v-for="{ edition, name } in editions"
      :key="name"
      :class="[
        `flex-1 rounded-t-2xl transition-colors text-white text-xl font-bold ${styles.tab}`,
        edicion == edition ? 'z/10' : 'bg-[#222b5b] hover:bg-[#1b2663]',
      ]"
      @click="edicion = edition"
    >
      {{ name }}
    </button>
  </div>

  <Palmares
    :i18n="i18n"
    :edicion="edicion"
  />
  <Galeria
    :i18n="i18n"
    :edicion="edicion"
  />
  <!-- <Numeros
    i18n="{i18n}"
    edicion="{edicion.value}"
  /> -->
</template>
