import { defineComponent, watch } from 'vue'
import { useProgressiveNumber } from '@/hooks/useProgressiveNumber'

export default defineComponent({
  props: {
    initial: {
      type: Number,
      required: true,
    },
    final: {
      type: Number,
      required: true,
    },
    decimals: Number,
    duration: Number,
  },
  setup(props) {
    const [count, setCount] = useProgressiveNumber(
      props.initial,
      props.duration,
      props.decimals
    )

    watch(
      () => props.final,
      () => {
        setCount(String(props.final))
      },
      { immediate: true }
    )

    return () => <span>{count.value}</span>
  },
})
