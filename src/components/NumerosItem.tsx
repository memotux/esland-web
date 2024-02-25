import styles from '@/components/styles/NumerosItem.module.css'
import type { SetupContext } from 'vue'

interface Props {
  title: string
}

export default function NumerosItem({ title }: Props, { slots }: SetupContext) {
  return (
    <div class="flex flex-col justify-center items-center">
      <span class={`${styles.number} text-7xl font-bold tabular-nums tracking-tighter`}>
        {slots.default?.() || 'Numeros Item'}
      </span>
      <span class="uppercase opacity-70">{title}</span>
    </div>
  )
}
