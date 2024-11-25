import { Result } from '../types'

export const fetchData = async (url: string): Promise<Result> => {
  try {
    const res = await fetch(url)

    if (!res.ok) {
      throw new Error('Network response was not ok!')
    }

    const data = await res.json()

    return data
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error)
    throw error
  }
}
