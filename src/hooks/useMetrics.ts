import { onMounted, onUnmounted, ref, watch, type Ref } from "vue"
import editionsInfo from "@/data/editions-info.json"

export const useMetrics = ({ edicion }: { edicion: Ref<string> }) => {
    const metrics = ref({ views: 0, news: 0, media: 0 })
    const isIntersecting = ref(false)
    const numerosRef = ref<HTMLDivElement>()
    let observer: IntersectionObserver

    watch([isIntersecting, edicion], () => {
        if (!isIntersecting.value) {
            metrics.value = { views: 0, news: 0, media: 0 }
            return
        }

        metrics.value = editionsInfo[Number(edicion.value) - 1].metrics
    })

    onMounted(() => {
        if (!numerosRef.value) return

        observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.intersectionRatio > 0) {
                    isIntersecting.value = true
                } else {
                    isIntersecting.value = false
                }
            }
        )

        observer.observe(numerosRef.value)
    })
    onUnmounted(() => {
        if (!numerosRef.value) return

        observer.unobserve(numerosRef.value)
    })

    return {
        numerosRef,
        metrics
    }
}