import { defineComponent } from 'vue'
import CountUp from '@/components/CountUp'
import NumerosItem from '@/components/NumerosItem.tsx'
import { useMetrics } from '@/hooks/useMetrics'

export default defineComponent({
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
    const { metrics, numerosRef } = useMetrics({ edicion: props.edicion })

    return () => (
      <section class="max-w-6xl mx-auto py-20 px-20">
        <h2 class="text-4xl lg:text-6xl font-tomaso text-center text-balance mb-10 lg:mb-20">
          {props.i18n.ARCHIVO.COUNTER_TITLE}
        </h2>
        {
          <div
            ref={numerosRef}
            class={`grid grid-cols-1 lg:grid-cols-3 gap-y-10`}
          >
            <NumerosItem title={props.i18n.ARCHIVO.COUNTER_VIEWS}>
              <CountUp
                initial={0}
                final={metrics.value.views ?? 0}
                decimals={1}
              />
              M
            </NumerosItem>
            <NumerosItem title={props.i18n.ARCHIVO.COUNTER_NEWS}>
              <CountUp
                initial={0}
                final={metrics.value.news ?? 0}
              />
            </NumerosItem>
            <NumerosItem title={props.i18n.ARCHIVO.COUNTER_MEDIA}>
              <CountUp
                initial={0}
                final={metrics.value.media ?? 0}
                decimals={1}
              />
              M€
            </NumerosItem>
          </div>
        }
      </section>
    )
  },
})
