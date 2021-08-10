import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
const STORAGE_KEY = 'FURNITURE_HOUSE_APP'

// create context
const CartContext = createContext()

const initialState = {
  cart: [],
  numberOfItemsInCart: 0,
  total: 0
}

function calculateTotal(cart) {
  const total = cart.reduce((acc, next) => {
    const quantity = next.quantity
    acc = acc + JSON.parse(next.price) * quantity
    return acc
  }, 0)
  return total
}

function useForceUpdate() {
  const [value, setValue] = useState(0) // integer state
  return () => setValue((value) => value + 1) // update the state to force render
}

export function CartProvider({ children }) {
  const [open, setOpen] = useState(false)
  const forceUpdate = useForceUpdate()
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storageState = window.localStorage.getItem(STORAGE_KEY)
      if (!storageState) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initialState))
      }
    }
  }, [])

  const setProductQty = (product) => {
    const storageState = JSON.parse(window.localStorage.getItem(STORAGE_KEY))
    const { cart } = storageState
    const index = cart.findIndex((cartItem) => cartItem.id === product.id)
    cart[index].quantity = product.quantity
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        cart,
        numberOfItemsInCart: cart.length,
        total: calculateTotal(cart)
      })
    )

    forceUpdate()
  }

  const addToCart = (product) => {
    const storageState = JSON.parse(window.localStorage.getItem(STORAGE_KEY))
    const { cart } = storageState
    if (cart.length) {
      const index = cart.findIndex((cartItem) => cartItem.id === product.id)
      if (index >= Number(0)) {
        /* If this item is already in the cart, update the quantity */
        cart[index].quantity = cart[index].quantity + product.quantity
      } else {
        /* If this item is not yet in the cart, add it */
        cart.push(product)
      }
    } else {
      /* If no items in the cart, add the first item. */
      cart.push(product)
    }

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        cart,
        numberOfItemsInCart: cart.length,
        total: calculateTotal(cart)
      })
    )
    toast('Successfully added item to cart!', {
      position: toast.POSITION.TOP_LEFT
    })
    forceUpdate()
  }

  const removeFromCart = (product) => {
    const storageState = JSON.parse(window.localStorage.getItem(STORAGE_KEY))
    let { cart } = storageState
    cart = cart.filter((c) => c.id !== product.id)

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        cart,
        numberOfItemsInCart: cart.length,
        total: calculateTotal(cart)
      })
    )

    forceUpdate()
  }

  const emptyCart = () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initialState))

    forceUpdate()
  }

  let state = initialState
  if (typeof window !== 'undefined') {
    const storageState = window.localStorage.getItem(STORAGE_KEY)
    if (storageState) {
      state = JSON.parse(storageState)
    }
  }

  return (
    <CartContext.Provider
      value={{
        ...state,
        setProductQty,
        addToCart,
        removeFromCart,
        emptyCart,
        open,
        setOpen
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCartContext() {
  return useContext(CartContext)
}
