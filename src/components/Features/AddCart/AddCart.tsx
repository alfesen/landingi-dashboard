import { useEffect, useState } from 'react'
import useFetchData from '../../../hooks/useFetchData'
import { Product } from '../../../types'
import Button from '../../UI/Button'
import Error from '../../UI/Error'
import Fallback from '../../UI/Fallback'
import Loading from '../../UI/Loading'
import ProductItem from '../shared/ProductItem'
import s from './AddCart.module.scss'

const AddCart = ({ onCancel }: { onCancel: () => void }) => {
  const [products, setProducts] = useState<Product[]>([])
  const { loading, error, detachError, sendRequest } = useFetchData()

  useEffect(() => {
    const fetchProducts = async () => {
      const { products } = await sendRequest('https://dummyjson.com/products')
      setProducts(products)
    }
    fetchProducts()
  }, [sendRequest])

  const renderProducts = products.map((p: Product) => {
    return (
      <ProductItem
        key={p.id}
        id={p.id}
        title={p.title}
        quantity={p.quantity}
        price={p.price}
        discountPercentage={p.discountPercentage}
        discountedPrice={p.discountedPrice}
        total={p.total}
        add
        onAdd={() => {}}
      />
    )
  })

  return (
    <section className={s.add}>
      {loading && <Loading dark />}
      {error && <Error message={error} onDetach={detachError} />}
      {!loading && !error && products.length > 0
        ? renderProducts
        : !loading && <Fallback message={'No products in this cart'} dark />}
      <div className={s.actions}>
        {!loading && !error && (
          <Button danger className={s.actions__cancel} onClick={onCancel}>
            Cancel adding cart
          </Button>
        )}
        {error && (
          <Button danger className={s.actions__cancel} onClick={onCancel}>
            Return to carts
          </Button>
        )}
      </div>
    </section>
  )
}

export default AddCart
