import VueRouter from 'vue-router'


import home from './component/tabber/frist.vue'
import login from './component/login.vue'
import me from './component/tabber/regist.vue'
import car from './component/tabber/carList.vue'
import address from './component/tabber/address.vue'
import order from './component/tabber/order.vue'
import ordersuccess from './component/tabber/ordersuccess.vue'
var router = new VueRouter({
    routes:[
        {path:'/',component:home},
        {path:'/home',component:home},
        {path:'/login',component:login},
        {path:'/me',component:me},
        {path:'/carList',component:car},
        {path:'/address',component:address},
        {path:'/order',component:order},
        {path:'/ordersuccess',component:ordersuccess}

    ],
    linkActiveClass:'mui-active'
})

export default router