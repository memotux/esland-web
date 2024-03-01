import { computed, defineComponent, ref } from 'vue'
import StreamerCard from '@/components/StreamerCard.tsx'
import palmares from '@/data/editions-info.json'
import styles from '@/components/styles/Palmares.module.css'

export default defineComponent({
  name: 'Palmares',
  props: {
    i18n: {
      type: Object,
      required: true,
    },
    edicion: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const index = ref(3)

    const palmar = computed(
      () => palmares.find((palmar) => palmar.edition === props.edicion)?.info[index.value]
    )

    function selectPalmares(idx: number) {
      index.value = idx
    }

    return () => (
      <section class="max-w-6xl mx-auto flex flex-col gap-4 pt-20 justify-center items-center px-20">
        <h2 class="text-4xl lg:text-6xl text-center mb-10 lg:mb-20 uppercase font-tomaso">
          {props.i18n.AWARDS.TITLE}
        </h2>
        <div class="flex flex-col lg:flex-row gap-10">
          <div class="flex flex-col gap-2">
            {palmares.map((item) => {
              if (item.edition === props.edicion) {
                return item.info.map((infoItem, i) => {
                  const { categoria, ganador } = infoItem
                  return (
                    <button
                      id={`${i + 1}`}
                      class={`flex justify-between items-center rounded-sm ${
                        styles.button
                      } ${
                        i % 2 === 0
                          ? 'bg-gradient-to-r from-blue-600 to-sky-400/45  '
                          : 'bg-gradient-to-r from-gray-700 to-blue-900'
                      } ${
                        index.value === i
                          ? 'bg-blue-950 border border-sky-300 border-spacing-6'
                          : ''
                      } text-center hover:bg-blue-900 px-4 py-1`}
                      onClick={() => selectPalmares(i)}
                    >
                      <h1 class="text-sm text-left">{categoria}</h1>
                      <strong class="text-xs text-right">{ganador}</strong>
                    </button>
                  )
                })
              }
            })}
          </div>
          {palmar.value && (
            <div class="flex gap-3 items-end mr-5">
              {palmar.value.ganador && (
                <StreamerCard
                  position="1º"
                  edicion={props.edicion}
                  name={palmar.value.ganador}
                  comunidad={palmar.value.comunidad1 ?? 0}
                  streamers={palmar.value.streamers1 ?? 0}
                  foto={palmar.value.foto1}
                  total={palmar.value.total1 ?? 0}
                  background={'bg-finalista'}
                />
              )}
              {palmar.value.finalista && (
                <StreamerCard
                  position="2º"
                  edicion={props.edicion}
                  name={palmar.value.finalista}
                  comunidad={palmar.value.comunidad2}
                  streamers={palmar.value.streamers2}
                  foto={palmar.value.foto2}
                  total={palmar.value.total2}
                  background={'bg-semifinalista'}
                />
              )}
            </div>
          )}
        </div>
      </section>
    )
  },
})
