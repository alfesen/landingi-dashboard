import { useState, useCallback } from 'react'

const useFetchData = () => {
  const [error, setError] = useState<null | string>(null)
  const [loading, setLoading] = useState(false)

  const sendRequest = useCallback(async (url: string) => {
    setLoading(true)
    let responseData: any
    try {
      const response = await fetch(url)
      responseData = await response.json()
    } catch (err) {
      const errorText = 'Failed to fetch data'
      setError(errorText)
      throw new Error(errorText)
    }

    setLoading(false)
    return responseData
  }, [])

  return { sendRequest, loading, error }
}

export default useFetchData
