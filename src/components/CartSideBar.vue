<script setup>
import { useCart } from "@/stores";
import { storeToRefs } from "pinia";

const cart = useCart();
const { cartItems, cartItemsCount, totalPrice } =
  storeToRefs(cart);

const cartClose = () => {
  $("body").css("overflow", "inherit"),
    $(".cart-sidebar").removeClass("active"),
    $(".backdrop").fadeOut();
};

const deleteCart = (index) => {
  cart.destroy(index);
};

const cartDecrement = (index) => {
  cart.decrement(index);
};
const cartIncrement = (index) => {
  cart.addToCart(index);
};
</script>
<template>
  <div>
    <aside class="cart-sidebar">
      <div class="cart-header">
        <div class="cart-total" v-if="cartItemsCount !==0">
          <i class="fas fa-shopping-basket"></i
          ><span>total item <span style="color:darkgreen">{{ cartItemsCount }}</span></span>
        </div>

        <div v-else class="cart-total">
          <span>Your Cart is Empty...</span>
        </div>
        <button class="cart-close" @click="cartClose">
          <i class="icofont-close"></i>
        </button>
      </div>

      <transition name="switch" mode="out-in">
    
      <TransitionGroup name="list" tag="ul" class="cart-list" v-if="cartItemsCount !==0 ">
        <li class="cart-item" v-for="(cart, index) in cartItems" :key="cart.id">
          <div class="cart-media">
            <a href="#"
              ><img
                :src="$filters.makeImagePath(cart.thumbnail)"
                alt="product" /></a
            ><button class="cart-delete" @click.prevent="deleteCart(index)">
              <i class="far fa-trash-alt"></i>
            </button>
          </div>
          <div class="cart-info-group">
            <div class="cart-info">
              <h6>
                <a href="product-single.html">{{ cart.name }}</a>
              </h6>
              <p>Unit Price {{$filters.currencySymbol(cart.price) }}</p>
            </div>
            <div class="cart-action-group">
              <div class="product-action">
                <button
                  class="action-minus"
                  title="Quantity Minus"
                  @click.prevent="cartDecrement(index)"
                >
                  <i class="icofont-minus"></i></button
                ><input
                  class="action-input"
                  title="Quantity Number"
                  type="text"
                  name="quantity"
                  :value="cart.quantity"
                /><button class="action-plus" title="Quantity Plus" @click.prevent="cartIncrement(cart)" >
                  <i class="icofont-plus"></i>
                </button>
              </div>
              <h6>{{ $filters.currencySymbol(cart.price * cart.quantity) }}</h6>
            </div>
          </div>
        </li>
      </TransitionGroup>
    <ul class="cart-list" v-else>
        <li class="cart-item margin_cs">
          <img src="@/assets/images/cart/emptyCart.png" class="cart-image" alt="">
          <h3 class="text-center">Your Cart is Empty.</h3>
        </li>
      </ul>
      </transition>
    
      <div class="cart-footer">
        <RouterLink :to="{ name: 'chekcout.page' }" class="cart-checkout-btn">
          <span class="checkout-label">Proceed to Checkout</span
          ><span class="checkout-price">{{
            $filters.currencySymbol(totalPrice)
          }}</span></RouterLink
        >
      </div>
    </aside>
  </div>
</template>

<style>
.cart-image{
  width: 50%;
}
.margin_cs{
  margin-top: 100px;
}
.list-move,
.list-enter-active,
.list-leave-active{
  transition: all 0.5s ease;
}
.list-enter-form,
.list-leave-to{
  opacity: 0;
  transform: translateX(30px);
}

.switch-leave-to{
  opacity: 0;
  transform: translateY(20px);
}
.switch-enter-active,
.switch-leave-active{
  transition: all 0.5s ease;
}
</style>
