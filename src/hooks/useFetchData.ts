import { useState, useEffect } from 'react'
import { fetchData } from '../services/api'
import { User, Result } from '../types'

export const useFetchData = (url: string) => {
  const [data, setData] = useState<Array<User>>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const getData = async () => {
      try {
        const result: Result = await fetchData(url)
        setData(result.results)
      } catch (error) {
        setError(error as Error)
      } finally {
        setLoading(false)
      }
    }

    getData()
  }, [url])

  return { data, error, loading }
}
