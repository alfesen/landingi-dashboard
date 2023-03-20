import { useContext, useEffect, useState } from 'react'
import useFetchData from '../../../hooks/useFetchData'
import { CartContext } from '../../../context/CartContext'
import ProductItem from '../shared/ProductItem'
import { Product } from '../../../types'
import Error from '../../UI/Error'
import Loading from '../../UI/Loading'

import s from './Cart.module.scss'
import Fallback from '../../UI/Fallback'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

const Cart = () => {
  const [products, setProducts] = useState<Product[]>([])
  const { sendRequest, error, loading, detachError } = useFetchData()
  const { cartId, carts } = useContext(CartContext)

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  )
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Discount comparison',
      },
    },
  }

  const [data, setData] = useState<{ labels: any; datasets: any }>({
    labels: [],
    datasets: [{}, {}],
  })

  useEffect(() => {
    const fetchProducts = async () => {
      if (cartId <= 20) {
        const cart = await sendRequest(`https://dummyjson.com/carts/${cartId}`)
        setProducts(cart.products)
      }
      return
    }
    if (cartId > 20) {
      const cart = carts.find(c => c.id === cartId)
      setProducts(cart!.products)
      return
    }
    fetchProducts()
  }, [sendRequest, cartId, carts])

  useEffect(() => {
    setData({
      labels: products.map((p: Product) => 'Product ' + p.id.toString()),
      datasets: [
        {
          label: 'Price',
          data: products.map((p: Product) => p.price * p.quantity!),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Discounted Price',
          data: products.map((p: Product) => p.discountedPrice),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    })
  }, [products])

  const renderProducts = products.map((p: Product) => (
    <ProductItem
      key={p.id}
      id={p.id}
      title={p.title}
      quantity={p.quantity}
      price={p.price}
      discountPercentage={p.discountPercentage}
      discountedPrice={p.discountedPrice}
      total={p.discountedPrice}
    />
  ))

  return (
    <section className={s.cart}>
      {loading && <Loading dark />}
      {error && <Error onDetach={detachError} message={error} />}

      {!loading && !error && products.length > 0
        ? renderProducts
        : !loading && <Fallback message={'No products in this cart'} dark />}

      <div className={s.cart__chart}>
        <Line data={data} options={options} />
      </div>
    </section>
  )
}

export default Cart
