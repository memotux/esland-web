import { defineComponent } from 'vue'
import styles from '@/components/styles/Button.module.css'

interface ButtonProps {
  id?: string
  className?: string
  target?: string
  url: string
}

export default defineComponent<ButtonProps>({
  emits: ['click'],
  render() {
    const { url, target, className } = this.$props
    return (
      <a
        href={url}
        target={`${target ?? '_blank'}`}
        rel="noopener noreferrer"
        onClick={() => this.$emit('click')}
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
        {...this.$attrs}
      >
        {this.$slots.default!()}
      </a>
    )
  },
})
