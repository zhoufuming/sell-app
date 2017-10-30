<template>
    <div>
        <div class="shopcart">
            <div class="content" @click="toggleList">
                <div class="content-left">
                    <div class="logo-wrapper">
                        <div class="logo" :class="{'hightlight':totalCount>0}">
                            <i class="icon-shopping_cart" :class="{'hightlight':totalCount>0}"></i>
                        </div>
                        <div class="num" v-show="totalCount>0">{{totalCount}}</div>
                    </div>
                    <div class="price" :class="{'hightlight':totalPrice>0}">&yen;{{totalPrice}}元</div>
                    <div class="desc">另需配送费&yen;{{deliveryPrice}}元</div>
                </div>
                <div class="content-right" @click.stop.prevent="pay">
                    <div class="pay" :class="payClass">{{payDesc}}</div>
                </div>
            </div>
            <!-- 抛物线小球 -->
            <div class="ball-container">
                <div v-for="ball in balls" v-show="ball.show" class="ball">
                    <span></span>
                </div>
            </div>
            <!-- 购物车列表 -->
            <transition name="fold-transition">
                <div class="shopcart-list" v-show="listShow">
                    <div class="list-header">
                        <h1 class="title">购物车</h1>
                        <span class="empty" @click="empty">清空</span>
                    </div>
                    <div class="list-content" ref="listContent">
                        <ul>
                            <li class="food border-1px" v-for="food in selectFoods">
                                <span class="name">{{food.name}}</span>
                                <div class="price">
                                    <span>&yen;{{food.price*food.count}}</span>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <cartcontrol :food="food"></cartcontrol>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </transition>
        </div>
        <transition name="fade-transition"><div class="list-mask" v-show="listShow" @click="toggleList"></div></transition>
    </div>
</template>

<script type="text/ecmascript-6">
    import BScroll from 'better-scroll';
    import cartcontrol from '../cartcontrol/cartcontrol';

    export default {
        props: {
            selectFoods: {
                type: Array,
                default() {
                    return [];
                }
            },
            deliveryPrice: {
                type: Number,
                default: 0
            },
            minPrice: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                balls: [
                    {
                        show: false
                    },
                    {
                        show: false
                    },
                    {
                        show: false
                    },
                    {
                        show: false
                    },
                    {
                        show: false
                    }
                ],
                dropBalls: [],
                fold: true
            };
        },
        methods: {
            toggleList() {
                if (!this.totalCount) {
                    return;
                }
                this.fold = !this.fold;
            },
            empty() {
               this.selectFoods.forEach((food) => {
                    food.count = 0;
               });
            },
            pay() {
                if (this.totalPrice < this.minPrice) {
                    return;
                } else {
                    window.alert(`支付${this.totalPrice}元`);
                }
            }
        },
        computed: {
            totalPrice() {
                let total = 0;
                this.selectFoods.forEach((food) => {
                    total += food.price * food.count;
                });
                return total;
            },
            totalCount() {
                let count = 0;
                this.selectFoods.forEach((food) => {
                    count += food.count;
                });
                return count;
            },
            payDesc() {
                if (this.totalPrice === 0) {
                    return `¥${this.minPrice}元起送`;
                } else if (this.totalPrice < this.minPrice) {
                    let diff = this.minPrice - this.totalPrice;
                    return `还差¥${diff}元起送`;
                } else {
                    return '去结算';
                }
            },
            payClass() {
                if (this.totalPrice < this.minPrice) {
                    return 'not-enough';
                } else {
                    return 'enough';
                }
            },
            listShow() {
                if (!this.totalCount) {
                    this.fold = true;
                    return false;
                }
                let show = !this.fold;
                if (show) {
                    this.$nextTick(() => {
                        if (!this.scroll) {
                            this.scroll = new BScroll(this.$refs.listContent, {
                                click: true
                            });
                        } else {
                            // 当购物车数据发生改变的时候，重新滚动条插件从新计算
                            this.scroll.refresh();
                        }
                    });
                }
                return show;
            }
        },
        components: {
            cartcontrol
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"

    .shopcart
        position: fixed
        left: 0
        bottom: 0
        z-index: 50
        width: 100%
        height: 48px
        .content
            display: flex
            background: #141d27
            color: rgba(255, 255, 255, 0.4)
            position: relative
            z-index: 1
            .content-left
                flex: 1
                .logo-wrapper
                    display: inline-block
                    position: relative
                    top: -10px
                    margin: 0 12px
                    padding: 6px
                    width: 56px
                    height: 56px
                    box-sizing: border-box
                    vertical-align: top
                    border-radius: 50%
                    background: #141d27
                    @media only screen and (max-width: 360px)
                        margin: 0 4px
                    .logo
                        width: 100%
                        height: 100%
                        border-radius: 50%
                        background: #2b343c
                        position: relative
                        &.hightlight
                            background: rgb(0, 160, 220)
                        .icon-shopping_cart
                            display: block
                            width: 25px
                            height: 25px
                            position: absolute
                            top: 10px
                            left: 10px
                            background: url(icon-cart.png) no-repeat
                            background-size: 25px 50px
                            &.hightlight
                                background-position-y: -25px
                    .num
                        position: absolute
                        top: 0
                        right: 0
                        width: 24px
                        height: 16px
                        font-size: 9px
                        line-height: 16px
                        text-align: center
                        border-radius: 16px
                        font-weight: 700
                        color: #fff
                        background: rgb(240, 20, 20)
                        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
                .price
                    display: inline-block
                    vertical-align: top
                    margin-top: 12px
                    padding-right: 12px
                    font-size: 16px
                    line-height: 24px
                    box-sizing: border-box
                    border-right: 1px soliud rgba(255, 255, 255, 0.1)
                    font-weight: 700
                    &.hightlight
                        color: #fff
                .desc
                    display: inline-block
                    vertical-align: top
                    font-size: 12px
                    line-height: 24px
                    margin: 12px 0 0 12px
                    @media only screen and (max-width: 360px)
                        margin-left: 0
            .content-right
                flex: 0 0 105px
                width: 105px
                @media only screen and (max-width: 360px)
                    flex: 0 0 85px
                    width: 85px
                .pay
                    height: 48px
                    font-size: 12px
                    line-height: 48px
                    text-align: center
                    font-weight: 700
                    background: #2b333b
                    &.not-enough
                        background: #2b333b
                    &.enough
                        background: #00b43c
                        color: #fff
        .ball-container
            .ball
                position: fixed
                left: 32px
                bottom: 22px
                z-index: 200
                transition: all 0.4s
                span
                    width: 16px
                    height: 16px
                    border-radius: 50%
                    background: rgb(0, 160, 220)
        .shopcart-list
            postion: relative
            top: 0
            left: 0
            z-index: 0
            width: 100%
            height: auto
            transition: all 0.5s
            transform: translate3d(0, calc(-100% - 55px), 0)
            &.fold-transition-enter, &.fold-transition-leave-to
                transform: translate3d(0, 0, 0)
            .list-header
                height: 40px
                padding: 0 18px
                background: #f3f5f7
                line-height: 40px
                border-bottom: 1px solid rgba(7, 17 27, 0.1)
                .title
                    float: left
                    color: rgb(7, 17, 27)
                .empty
                    float: right
                    font-size: 12px
                    color: rgb(0, 160, 220)
            .list-content
                padding: 0 18px
                max-height: 217px
                background: #fff
                overflow: hidden
                .food
                    position: relative
                    padding: 12px 0
                    box-sizing: border-box
                    border-1px(rgba(7, 17, 27, 0.1))
                    .name
                        font-size: 14px
                        line-height: 24px
                        color: rgb(7, 17, 27)
                    .price
                        position: absolute
                        right: 90px
                        bottom: 12px
                        font-size: 14px
                        font-weight: 700
                        line-height: 24px
                        color: rgb(240, 20, 20)
                    .cartcontrol-wrapper
                        position: absolute
                        right: 0
                        bottom: -16px
    .list-mask
        position: fixed
        top: 0
        left: 0
        width: 100%
        height: 100%
        z-index: 40
        backdrop-filter: blur(10px)
        opacity: 1
        background: rgba(7, 17, 27, 0.6)
        transition: all 0.4s
        &.fade-transition-enter, &.fade-transition-leave-to
            opacity: 0
            background: rgba(7, 17, 27, 0)
</style>