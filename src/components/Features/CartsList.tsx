import { useEffect, useState } from 'react'
import useFetchData from '../../hooks/useFetchData'
import { Cart } from '../../types'

const CartsList = () => {
  const [carts, setCarts] = useState<Cart[]>([])
  const { sendRequest, loading, error } = useFetchData()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { carts } = await sendRequest('https://dummyjson.com/carts')
        setCarts(carts)
      } catch (err) {}
    }
    fetchData()
  }, [sendRequest])

  console.log(carts)
  
  return (
    <div>
      {loading && <p>loading</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}

export default CartsList
