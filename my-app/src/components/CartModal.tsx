import React from 'react';
import { updateCart } from "../features/cart/cartSlice";
import { closeModal } from "../features/cart/modalSlide";
import { useDispatch } from "react-redux";

import { FiPlusCircle, FiMinusCircle, FiXCircle, FiShoppingCart } from "react-icons/fi";
import { type CartState } from "../features/cart/cartSlice";
import { formattedPrice } from "../ulti/formatPrice";

type cartProps = {
  cartData: CartState,
}

type Price= {
  onSalePrice?: string, 
  salePrice: string
}

function CartModal({ cartData }: cartProps) {
  const dispatch = useDispatch();

  const handleClick = (productId:number, status: string) => {
    const payload= {
      productId: productId,
      type: status
    }
    dispatch(updateCart(payload))
  }

  const Price = (price: Price) => {
    return (
      <>
        {
          price.onSalePrice ? 
          <><span className="text-2 text-red-600 font-600">{ formattedPrice(price.onSalePrice) }</span> <span className="text-gray-400 italic line-through">{formattedPrice(price.salePrice)}</span></>
          :
          <span className="text-2 font-600">{formattedPrice(price.salePrice)}</span>
        }
      </>
    )
  }

  return (
    <div className="flex flex-row-reverse w-full h-full fixed top-0 right-0 z-99">
      <div
        onClick={() => dispatch(closeModal())}
        className="cart-drawer__overlay w-full h-full bg-gray-700/45 absolute top-0 left-0"
      ></div>
      <div className="cart-drawer__wrapper max-w-100 w-full h-full relative z-40 flex flex-col justify-between px-5 pt-8 bg-white">
        <button
          onClick={() => dispatch(closeModal())}
          className="w-10 h-10 flex justify-center items-center absolute top-3 right-3 cursor-pointer text-3xl"
        >
          <FiXCircle />
        </button>
        {cartData && cartData.items.length > 0 ?
          (
            <>
              <div className="cart-drawer__top flex-1">
                <h2 className="mb-10 text-2xl capitalize text-black font-700 border-b border-gray-200 pb-2">Cart Drawer</h2>
                <div className="cart-drawer__items overflow-y-scroll max-h-150 h-full">
                  {
                    cartData.items.map((product, index) => (
                      <div key={index} className="cart-drawer__line-item flex justify-start flex-row gap-2 not-last:border-b border-gray-200 not-first:pt-6 pb-6">
                        <div className="cart-drawer__line-item--image max-w-20 rounded-lg overflow-hidden">
                          <img src={product.images?.featuredImage} alt="" />
                        </div>
                        <div className="cart-drawer__line-item--info ml-2 flex flex-1 flex-col">
                          <h2>{product.name} x {product.quantity}</h2>
                          <div className="cart-drawer__line-item--info-price">
                            {Price( product.price )}
                          </div>
                          <div className="cart-drawer__line-item--quantity flex justify-start gap-3 items-center flex-1">
                            <button
                              onClick={() => handleClick(product.productId, "increase")}
                              className="text-xl cursor-pointer"
                            >
                              <FiPlusCircle />
                            </button>
                            <span>{product.quantity}</span>
                            <button
                              onClick={() => handleClick(product.productId, "minus")}
                              className="text-xl cursor-pointer"
                            >
                              <FiMinusCircle />
                            </button>
                          </div>
                        </div>
                        <div className="cart-drawer__subtotal">
                          <span className="">
                            {formattedPrice(
                              Number(product.price.onSalePrice ?? product.price.salePrice) * product.quantity,
                            )}
                          </span>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
              <div className="cart-drawer__bottom flex flex-row justify-between items-center min-h-30 border-t border-gray-200">
                <h3 className="text-2xl">Total:</h3>
                <span className="text-2xl font-bold">{formattedPrice(cartData.total_price)}</span>
              </div>
            </>
          ) :
          (
            <div className="w-full h-full flex flex-col justify-center items-center content-center text-2xl font-bold text-center">
              <FiShoppingCart className="text-5xl mb-5" /> Cart Is Empty, You need add item to continue
            </div>
          )
        }
      </div>
    </div>
  )
}

export default CartModal