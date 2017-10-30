<template>
    <div class="cartcontrol">
        <transition name="move-transition">
            <div class="cart-decrease" v-show="food.count>0" @click="decreaseCart"><span></span></div>
        </transition>
        <transition name="move-transition">
            <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
        </transition>
        <div class="cart-add" @click="addCart"><span></span></div>
    </div>
</template>

<script type="text/ecmascript-6">
    import Vue from 'vue';
    export default {
        props: {
            food: {
                type: Object
            }
        },
        methods: {
            addCart(event) {
                event.stopPropagation();
                if (!event._constructed) {
                    return;
                }
                if (!this.food.count) {
                    Vue.set(this.food, 'count', 1);
                } else {
                    this.food.count++;
                }
            },
            decreaseCart(event) {
                event.stopPropagation();
                if (!event._constructed) {
                    return;
                }
                if (this.food.count) {
                    this.food.count--;
                }
            }
        }
    };
</script>

<style lang="stylus" rel="styleSheet/stylus">
    .cartcontrol
        font-size: 0
        font-weight: 700
        .cart-decrease
            display: inline-block
            width: 22px
            height: 22px
            padding: 29px 0
            transition: all 0.3s linear
            &.move-transition
                opacity: 1
                transform: translate3D(0, 0, 0)
            &.move-transition-enter, &.move-transition-leave-to
                opacity: 0
                transform: translate3D(24px, 0, 0)
                span
                    transform: rotate(180deg)
            span
                display: inline-block
                width: 22px
                height: 22px
                line-height: 15px
                color: rgb(0, 160, 220)
                background: url(subtract-icon.png) center center / 100% 100%
                overflow: hidden
                transition all 0.4s
        .cart-count
            display: inline-block
            vertical-align: top
            width: 18px
            font-size: 12px
            line-height: 80px
            text-align: center
            color: rgb(147, 153, 159)
            transition: all 0.3s linear
            &.move-transition
                opacity: 1
            &.move-transition-enter, &.move-transition-leave-to
                opacity: 0
        .cart-add
            display: inline-block
            width: 20px
            height: 20px
            padding: 30px 0
            span
                display: inline-block
                width: 20px
                height: 20px
                color: #fff
                background: url(add-icon.png) center center / 100% 100%
                overflow: hidden
</style>