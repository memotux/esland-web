import 'photoswipe/style.css'
import { defineComponent } from 'vue'

import Button from '@/components/Button'
import { useGallery } from '@/hooks/useGallery'
import '@/components/styles/Galeria.css'

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
    const { first, isExpanded, photos, LoadMore } = useGallery({ edicion: props.edicion })

    return () => (
      <section class="max-w-8xl mx-auto py-20 px-20">
        <h2 class="mx-auto mb-8 text-center text-3xl lg:text-6xl font-semibold tracking-wide">
          {props.i18n.GALLERY.TITLE}
        </h2>
        <p class="text-center text-2xl">{props.i18n.GALLERY.TEXT}</p>

        <masonry-layout
          gap="24"
          maxcolwidth="600"
          class="lg:mx-auto mx-4 py-20"
          id="gallery"
        >
          {photos.map(({ height, width }, i) => (
            <a
              class="group rounded-xl hover:scale-105 hover:contrast-[110%] transition-all relative"
              href={`/archivo-page/${props.edicion}/gallery/img-${i + 1}.webp`}
              target="_blank"
              data-cropped="true"
              data-pswp-width={width}
              data-pswp-height={height}
              ref={!first.value ? first : undefined}
            >
              <img
                class="rounded-xl object-cover w-full h-auto"
                loading="lazy"
                src={`/archivo-page/${props.edicion}/gallery/thumbnails/img-${
                  i + 1
                }.webp`}
                alt="Fotografía de los premios ESLAND"
              />
              <img
                class="blur-md opacity-0 group-hover:opacity-100 absolute inset-0 transition contrast-150 -z-10 object-cover"
                loading="lazy"
                src={`/archivo-page/${props.edicion}/gallery/thumbnails/img-${
                  i + 1
                }.webp`}
                alt="Imagen con efecto blur para hacer de sombra de una fotografía de los premios ESLAND"
              />
            </a>
          ))}
        </masonry-layout>

        <div class="text-center mx-auto">
          {!isExpanded.value && (
            <Button
              on-click={LoadMore}
              id="load-more"
              url="#"
            >
              {props.i18n.GALLERY.LOAD_MORE}
            </Button>
          )}
        </div>
      </section>
    )
  },
})
