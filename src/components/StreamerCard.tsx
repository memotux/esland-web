import { Transition, defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'StreamerCard',
  props: {
    name: { type: String, required: true },
    foto: { type: String, required: true },
    edicion: { type: String, required: true },
    comunidad: { type: Number, required: true },
    streamers: { type: Number, required: true },
    total: { type: Number, required: true },
    position: { type: String, required: true },
    background: { type: String, required: true },
    index: { type: Number, required: true },
  },
  setup(props) {
    const animate = ref('animate-fade-up')
    watch(
      () => props.index,
      (n, o) => {
        if (n > o) {
          animate.value = 'animate-fade-up'
        } else {
          animate.value = 'animate-fade-down'
        }
      }
    )
    return () => (
      <Transition
        enterActiveClass={animate.value}
        leaveActiveClass="animate-fade animate-reverse animate-duration-500"
        mode="out-in"
        appear
      >
        <div
          key={`streamer-${props.index}`}
          class={`max-w-full rounded-lg shadow ${props.background} border-[#0d507a]`}
        >
          <p class="mx-11 shadow-md absolute text-center rounded-b-lg rounded-t-sm bg-white -mt-[2px] text-black py-2 font-bold font-tomaso size-11">
            {props.position}
          </p>
          <img
            class="rounded-t-lg object-cover"
            src={`/archivo-page/${props.edicion}/palmares/desktop/${props.foto}.webp`}
            alt={props.name}
            title={props.name}
          />
          <div class="p-5">
            <p class="mb-2 text-xl font-bold tracking-tight dark:text-white uppercase text-balance">
              {props.name}
            </p>
            <p class="mt-5 flex flex-col mb-3 font-normal text-gray-700 dark:text-gray-400 uppercase">
              <strong>
                Comunidad: <>{props.comunidad}</>
              </strong>
              <strong>{`Streamers: ${props.streamers}`}</strong>
              <strong>
                Total: <span>{props.total}</span>
              </strong>
            </p>
          </div>
        </div>
      </Transition>
    )
  },
})
