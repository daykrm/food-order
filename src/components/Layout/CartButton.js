import { useContext, useEffect, useState } from "react"

import classes from "./CartButton.module.css"
import CartIcon from "../Cart/CartIcon"
import CartContext from "../../store/cart-context"

const CartButton = (props) => {
  const cartCtx = useContext(CartContext)

  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false)

  const { items } = cartCtx

  // console.log(cartCtx)

  useEffect(() => {
    if (items.length === 0) {
      return
    }
    setBtnIsHighlighted(true)

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false)
    }, 300)

    return () => {
      clearTimeout(timer)
    }
  }, [items])

  const numberOfCartItems = cartCtx.items.reduce((number, item) => {
    return number + item.amount
  }, 0)

  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ""}`

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  )
}

export default CartButton
