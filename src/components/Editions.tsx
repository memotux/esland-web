import { defineComponent, ref } from 'vue'
import Galeria from './Galeria'
import Numeros from './Numeros'
import Palmares from './Palmares'
import editions from '@/data/editions-info.json'
import styles from '@/components/styles/Editions.module.css'

export default defineComponent({
  props: ['i18n'],
  setup(props) {
    const edicion = ref('1')

    return () => (
      <>
        <div class="flex h-24 mt-4">
          {editions.map(({ edition, name }) => {
            return (
              <button
                class={`flex-1 rounded-t-2xl transition-colors 
                             text-white text-xl font-bold
                            ${styles.tab}
                            ${
                              edicion.value == edition
                                ? 'z/10'
                                : 'bg-[#222b5b] hover:bg-[#1b2663]'
                            } 
                            `}
                onClick={() => (edicion.value = edition)}
              >
                {name}
              </button>
            )
          })}
        </div>

        <Palmares
          i18n={props.i18n}
          edicion={edicion.value}
        />
        <Galeria
          i18n={props.i18n}
          edicion={edicion.value}
        />
        <Numeros
          i18n={props.i18n}
          edicion={edicion.value}
        />
      </>
    )
  },
})
