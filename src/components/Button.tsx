import type { SetupContext } from 'vue'
import styles from '@/components/styles/Button.module.css'

interface ButtonProps {
  id?: string
  className?: string
  target?: string
  url: string
}

interface ButtonEmits {
  click: (e: MouseEvent) => void | Promise<void>
}

export default function Button(
  props: ButtonProps,
  { emit, slots, attrs }: SetupContext<ButtonEmits>
) {
  const { url, target, className } = props
  return (
    <a
      href={url}
      target={`${target ?? '_blank'}`}
      rel="noopener noreferrer"
      onClick={(e) => emit('click', e)}
      class={`
          lg:text-2xl
          md:px-5
          md:text-xl
          text-xs
          w-fit
          font-medium
          no-underline
          px-3
            py-3
            border
            border-solid
            border-white
            rounded-full
            uppercase
            ${styles.button}
            ${className ?? ''}`}
      {...attrs}
    >
      {slots.default?.() ?? 'Button'}
    </a>
  )
}
