import { onUnmounted, ref, watch, type Ref, computed } from 'vue'

export const useProgressiveNumber = (
	initialValue: number | (() => number),
	duration = 1500,
	decimals = 0,
	delay = 5
): [Ref<string>, (value: string | ((prevTarget: number) => number)) => void] => {
	const target = ref(typeof initialValue === 'function' ? initialValue() : initialValue)
	const current = ref(typeof initialValue === 'function' ? initialValue() : initialValue)
	const steps = ref(1)
	const currentStep = ref(1);
	const value = computed(() => current.value.toFixed(decimals))
	let initial = typeof initialValue === 'function' ? initialValue() : initialValue
	let timeout: NodeJS.Timeout

	const setValue = (value: string | ((prevTarget: number) => number)) => {
		const nextTarget = typeof value === 'function' ? value(target.value) : value
		steps.value = Math.max(Math.floor(duration / delay), 1)

		target.value = Number(nextTarget)
		currentStep.value = (1);
		current.value = (lerp(initial, Number(nextTarget), easeOutCubic(1 / steps.value)))
	}

	watch(currentStep, () => {
		if (timeout) {
			clearTimeout(timeout)
		}
		timeout = setTimeout(
			() => {
				const progress = currentStep.value / steps.value;

				if (progress === 1) {
					current.value = target.value;
				} else {
					current.value = lerp(initial, target.value, easeOutCubic(progress))
					currentStep.value += 1
				}
			},
			delay
		)
	}, { immediate: true })

	onUnmounted(() => {
		clearTimeout(timeout)
	})
	return [value, setValue]
}

const lerp = (a: number, b: number, alpha: number): number => {
	return a + (alpha * (b - a))
}

const easeOutCubic = (value: number): number => {
	return 1 - Math.pow(1 - value, 3)
}