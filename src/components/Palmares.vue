<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import StreamerCard from '@/components/StreamerCard.vue'
import palmares from '@/data/editions-info.json'
import styles from '@/components/styles/Palmares.module.css'
import type { getI18N } from '@/i18n'

const props = defineProps<{ i18n: ReturnType<typeof getI18N>; edicion: string }>()

const index = ref(3)
const animate = ref('animate-fade-up')

const palmarInfo = computed(
  () => palmares.find((palmar) => palmar.edition === props.edicion)?.info
)
const streamerInfo = computed(() => palmarInfo.value?.[index.value])

watch(index, (n, o) => {
  if (n > o) {
    animate.value = 'animate-fade-up'
  } else {
    animate.value = 'animate-fade-down'
  }
})
</script>

<template>
  <section
    class="max-w-6xl mx-auto flex flex-col gap-4 pt-20 justify-center items-center px-20"
  >
    <h2 class="text-4xl lg:text-6xl text-center mb-10 lg:mb-20 uppercase font-tomaso">
      {{ i18n.AWARDS.TITLE }}
    </h2>
    <div class="flex w-full flex-col lg:flex-row gap-10">
      <div class="flex w-1/3 flex-col gap-2">
        <button
          v-for="(infoItem, i) in palmarInfo"
          :id="`${i + 1}`"
          :key="infoItem.categoria"
          :class="[
            `flex justify-between items-center rounded-sm ${styles.button} text-center hover:bg-blue-900 px-4 py-1`,
            i % 2 === 0
              ? 'bg-gradient-to-r from-blue-600 to-sky-400/45  '
              : 'bg-gradient-to-r from-gray-700 to-blue-900',
            index === i ? 'bg-blue-950 border border-sky-300 border-spacing-6' : '',
          ]"
          @click="index = i"
        >
          <h1 class="text-sm text-left">{{ infoItem.categoria }}</h1>
          <strong class="text-xs text-right">{{ infoItem.ganador }}</strong>
        </button>
      </div>
      <Transition
        appear
        mode="out-in"
        :enter-active-class="animate"
        leave-active-class="animate-fade animate-reverse animate-duration-300"
      >
        <div
          :key="`streamer-${index}`"
          class="flex w-2/3 gap-3 items-end mr-5"
        >
          <StreamerCard
            position="1º"
            :edicion="edicion"
            :name="streamerInfo!.ganador"
            :comunidad="streamerInfo?.comunidad1 ?? 0"
            :streamers="streamerInfo?.streamers1 ?? 0"
            :foto="streamerInfo!.foto1"
            :total="streamerInfo?.total1 ?? 0"
            background="bg-finalista"
          />
          <StreamerCard
            v-if="streamerInfo?.finalista"
            position="2º"
            :edicion="edicion"
            :name="streamerInfo.finalista"
            :comunidad="streamerInfo.comunidad2"
            :streamers="streamerInfo.streamers2"
            :foto="streamerInfo.foto2"
            :total="streamerInfo.total2"
            background="bg-semifinalista"
          />
        </div>
      </Transition>
    </div>
  </section>
</template>
