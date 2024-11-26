import { useState, useEffect, useRef } from 'react'
import { fetchData } from '../services/api'
import { User, Result } from '../types'

export const useFetchData = (url: string) => {
  const [data, setData] = useState<Array<User>>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  const originalArray = useRef<Array<User>>([])

  useEffect(() => {
    const getData = async () => {
      try {
        const result: Result = await fetchData(url)
        setData(result.results)
        originalArray.current = result.results
      } catch (error) {
        setError(error as Error)
      } finally {
        setLoading(false)
      }
    }

    getData()
  }, [url])

  const updateData = (newData: User[]) => {
    setData(newData)
  }

  return { data, error, loading, updateData, originalArray }
}
