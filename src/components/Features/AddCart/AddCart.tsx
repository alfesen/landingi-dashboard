import { Fragment, useContext, useEffect, useState } from 'react'
import useFetchData from '../../../hooks/useFetchData'
import { Product } from '../../../types'
import Button from '../../UI/Button'
import Error from '../../UI/Error'
import Fallback from '../../UI/Fallback'
import Loading from '../../UI/Loading'
import ProductItem from '../shared/ProductItem'
import { countDiscount } from '../../../helpers'
import s from './AddCart.module.scss'
import { CartContext } from '../../../context/CartContext'
import AddCartOverlay from './AddCartOverlay'
import Message from '../../UI/Message'
import { Cart } from '../../../types'

const AddCart = (): JSX.Element => {
  const [products, setProducts] = useState<Product[]>([])
  const [cartProducts, setCartProducts] = useState<Product[]>([])
  const { loading, error, detachError, sendRequest } = useFetchData()
  const {
    showCart,
    showCartHandler,
    addCartToCarts,
    showMessage,
    message,
    setAddMode,
  } = useContext(CartContext)

  useEffect(() => {
    const fetchProducts = async (): Promise<void> => {
      const { products } = (await sendRequest(
        'https://dummyjson.com/products'
      )) as Cart
      setProducts(products)
    }
    fetchProducts()
  }, [sendRequest])

  const sendCart = async (): Promise<void> => {
    if (cartProducts.length === 0) {
      return alert('No products to send!')
    }
    const newCart = {
      userId: Math.floor(Math.random() * 100),
      products: cartProducts,
    }
    const cartToSend = await sendRequest(
      'https://dummyjson.com/carts/add',
      'POST',
      JSON.stringify(newCart),
      { 'Content-Type': 'application/json' }
    )
    addCartToCarts(cartToSend as Cart)
    showMessage('Cart sent successfully')
    setCartProducts([])
    showCartHandler(false)
    setAddMode(false)
  }

  const renderProducts = products.map((p: Product) => {
    const { id, title, price, discountPercentage, total } = p
    const addProductToCart = (): void => {
      const existingProduct = cartProducts.find(product => product.id === id)
      if (existingProduct) {
        const newCartProducts = [...cartProducts]
        const index = newCartProducts.findIndex(product => product.id === id)
        newCartProducts[index].quantity = newCartProducts[index].quantity! + 1
        setCartProducts(newCartProducts)
        return
      }
      setCartProducts(prevProd => [...prevProd, { ...p, quantity: 1 }])
    }

    return (
      <ProductItem
        key={id}
        id={id}
        title={title}
        price={price}
        discountPercentage={discountPercentage}
        discountedPrice={+countDiscount(price, discountPercentage)}
        total={total}
        add
        onAdd={addProductToCart}
      />
    )
  })
  return (
    <Fragment>
      <section className={s.add__products}>
        {loading && <Loading dark />}
        {error && <Error message={error} onDetach={detachError} />}
        {message && <Message message={message} />}
        {showCart && (
          <AddCartOverlay sendCart={sendCart} cartProducts={cartProducts} />
        )}
        {!loading && !error && products.length > 0
          ? renderProducts
          : !loading && <Fallback message={'No products in this cart'} dark />}
      </section>
      <div className={s.actions}>
        <Button
          danger
          className={s.actions__show}
          onClick={() => showCartHandler(true)}>
          Show Cart
        </Button>
        {!loading && !error && (
          <Button
            danger
            className={s.actions__cancel}
            onClick={() => setAddMode(false)}>
            Cancel adding cart
          </Button>
        )}
        {error && (
          <Button
            danger
            className={s.actions__cancel}
            onClick={() => setAddMode(false)}>
            Return to carts
          </Button>
        )}
      </div>
    </Fragment>
  )
}

export default AddCart
