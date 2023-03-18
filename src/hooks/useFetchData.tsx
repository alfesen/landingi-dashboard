import { useState, useCallback, useRef, useEffect } from 'react'

const useFetchData = () => {
  const [error, setError] = useState<null | string>(null)
  const [loading, setLoading] = useState(false)

  const activeHttpRequests = useRef<any>([])

  const sendRequest = useCallback(
    async (
      url: string,
      method: string = 'GET',
      body: string | null = null,
      headers = {}
    ) => {
      setLoading(true)
      const httpAbort = new AbortController()
      activeHttpRequests.current.push(httpAbort)

      let responseData: any
      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbort.signal,
        })
        responseData = await response.json()

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (req: AbortController) => req !== httpAbort
        )
      } catch (err) {
        const errorText = 'Failed to fetch data'
        setError(errorText)
        console.log(err)
      }

      setLoading(false)
      return responseData
    },
    []
  )
  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((ctrl: AbortController) =>
        ctrl.abort()
      )
    }
  }, [])
  return { sendRequest, loading, error }
}

export default useFetchData
