// import { useState, useEffect, useRef } from 'preact/hooks';
import editionsInfo from "@/data/meta-gallery.json"
import { computed, onMounted, ref } from "vue"

export const useGallery = ({ edicion }: { edicion: string }) => {
  const offset = 10
  const first = ref<HTMLAnchorElement | null>(null)
  const isExpanded = ref(false)
  const editionIndex = computed(() => Number(edicion) - 1)
  const photos = computed(() => editionsInfo[editionIndex.value].slice(0, offset))

  onMounted(async () => {
    await import('@appnest/masonry-layout')
    const module = await import("photoswipe/lightbox")
    const PhotoSwipeLightbox = module.default
    const lightbox = new PhotoSwipeLightbox({
      gallery: "#gallery",
      children: "a",
      pswpModule: () => import("photoswipe"),
    })
    lightbox.init()
  })

  const LoadMore = async (e: MouseEvent) => {
    e.preventDefault()

    const res = await fetch("/api/gallery.json?edition=1&offset=9")
    const images = await res.json()

    const html = images
      .map((img: any, index: number) => {
        const imgIndex = index + offset
        if (!first.value) return

        const clone = first.value.cloneNode(true) as HTMLElement
        if (!clone) return
        clone.setAttribute("data-pswp-width", img.width)
        clone.setAttribute("data-pswp-height", img.height)
        clone.setAttribute(
          "href",
          `/archivo-page/${edicion}/gallery/img-${imgIndex}.webp`
        )
        clone.classList.add("animate-fade-up")
        clone.classList.add("animate-delay-300")
        clone.classList.add("opacity-0")
        clone
          .querySelector("img:first-child")
          ?.setAttribute(
            "src",
            `/archivo-page/${edicion}/gallery/thumbnails/img-${imgIndex}.webp`
          )
        clone
          .querySelector("img:last-child")
          ?.setAttribute(
            "src",
            `/archivo-page/${edicion}/gallery/thumbnails/img-${imgIndex}.webp`
          )

        return clone?.outerHTML
      })
      .join("")

    document.querySelector("#gallery")?.insertAdjacentHTML("beforeend", html)
    document.querySelector("masonry-layout")?.scheduleLayout()
    isExpanded.value = true
  }

  return {
    photos,
    first,
    isExpanded,
    LoadMore
  }
}