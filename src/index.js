

import Vue from 'vue'
import app from './app.vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Vuex from 'vuex'
Vue.use(Vuex)

import VueResource from 'vue-resource'
Vue.use(VueResource)

import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)
import 'bootstrap/dist/css/bootstrap.css'

import './mui/css/mui.css'
import './mui/css/mui.min.css'
import router from './router.js'
import {currency} from './currency'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

Vue.filter("currency",currency)

const store = new Vuex.Store({
    state:{
        nickName:'',
        CartCount : 0,
      
    },
    mutations:{
        updataUSerinfo(state,nickName){
            state.nickName = nickName
        },
        updateCarCount(state,CartCount){
            state.CartCount += CartCount
        },
        defalutcount(state,CartCount){
            state.CartCount = CartCount
        }
       

    }
})

var vm = new Vue({
    el:'#app',
    render:function(get){
        return get(app)
    },
    router,
    store
})