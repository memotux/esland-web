import candidatesByCategory from '@/data/editions-vote.json'
import type { Votes } from '@/types/votes'
import { onMounted, ref, watch } from 'vue'

interface PageInfo {
  categoryName: string
  candidates: Candidate[]
}

interface Candidate {
  id: string
  name: string
  image: string
  link?: string | null
}

const MAX_CATEGORIES = 12
const MAX_VOTES_PER_CATEGORY = 4

export const useVoteSystem = () => {
  const pageInfo = ref<PageInfo>()
  const categoryCode = ref(0)
  const votes = ref<Votes>(Array.from({ length: MAX_CATEGORIES }, () => []))

  onMounted(() => {
    let item = localStorage.getItem('votes')
    let initialVotes
    if (item !== null) {
      initialVotes = JSON.parse(item)
    } else {
      initialVotes = Array.from({ length: MAX_CATEGORIES }, () => [])
    }
    votes.value = initialVotes
  })

  watch(votes, () => {
    localStorage.setItem('votes', JSON.stringify(votes))
  })

  const isChanging = ref(false)

  watch(categoryCode, () => {
    isChanging.value = true
    pageInfo.value = candidatesByCategory[categoryCode.value]
    setTimeout(() => (isChanging.value = false), 500)
  })

  const setPrevCategory = () => {
    const prevCategory =
      categoryCode.value > 0 ? categoryCode.value - 1 : MAX_CATEGORIES - 1
    categoryCode.value = prevCategory
  }

  const setNextCategory = () => {
    const nextCategory = categoryCode.value + 1

    if (nextCategory === MAX_CATEGORIES) {
      // check if we have all the votes (4 per category)
      const missingVotes = votes.value.find(
        (votesCategory) => votesCategory.length < MAX_VOTES_PER_CATEGORY
      )
      if (missingVotes) {
        alert('Debes votar 4 candidatos por categoría')
        return
      }
    }

    categoryCode.value = nextCategory
  }

  const setVotesCategory = ({ candidate }: { candidate: string }) => {
    const votesCategory = votes.value[categoryCode.value]

    // if it was already voted the item, remove it
    if (votesCategory.includes(candidate)) {
      const newVotes = votesCategory.filter((vote) => vote !== candidate)
      // setVotes((prevVotes) => prevVotes.with(categoryCode, newVotes));
      votes.value = votes.value.with(categoryCode.value, newVotes)
      return
    }

    // check if the user has already voted for this category 4 times
    if (votesCategory.length >= 4) return

    // otherwise, add the vote
    const newVotes = [...votesCategory, candidate]
    votes.value = votes.value.with(categoryCode.value, newVotes)
  }

  return {
    candidatesByCategory,
    categoryCode,
    pageInfo,
    votes,
    isChanging,
    votesCategory: votes.value[categoryCode.value],
    setPrevCategory,
    setNextCategory,
    setVotesCategory,
    MAX_CATEGORIES,
    MAX_VOTES_PER_CATEGORY,
  }
}
