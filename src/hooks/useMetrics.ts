import { onMounted, onUnmounted, ref, watch } from "vue"
import editionsInfo from "@/data/editions-info.json"

export const useMetrics = ({ edicion }: { edicion: string }) => {
    const metrics = ref({ views: 0, news: 0, media: 0 })
    const isIntersecting = ref(false)
    const numerosRef = ref<HTMLDivElement>()
    let observer: IntersectionObserver

    watch(isIntersecting, () => {
        if (!isIntersecting.value) {
            metrics.value = { views: 0, news: 0, media: 0 }
            return
        }

        metrics.value = editionsInfo[Number(edicion) - 1].metrics
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
        console.log('unobserve');

        observer.unobserve(numerosRef.value)
    })

    return {
        numerosRef,
        metrics
    }
}