<template>
    <div style="padding:42px 0">
        <header class="mui-bar mui-bar-nav">
			<h1 class="mui-title">购买订单</h1>
		</header>


        <div v-show="login">暂未登陆</div>
     <div v-for="item in orderList" :key="item.orderId" class="order">
         <div>订单号：{{item.orderId}}</div>
         <div>订单日期：{{item.createdDate}}</div>
         <div>钱数{{item.orderTotal | currency("$")}}</div>
         <div v-for="i in item.goodsList" :key="i.priductId">
             <img  v-lazy="i.produceImage" alt="">
            <div>{{i.producename}}</div>
            <div><span>数量：{{i.num}}</span></div>
         </div>
     </div>

    </div>
</template>

<script>
export default {
    data(){
        return{
            orderList:[],
            login:true
        }
    },
    mounted(){
        this.init()
    },
    methods:{
          
        
        init(){
              if(this.$store.state.nickName == ''){
                  this.login = this.login  
              }else{
                  this.login = !this.login  
            this.$http.get('/api/orderlist',).then((res)=>{

                            if(res.body.status == 0){
                                this.orderList = res.body.result
                            }
                        })
              }
           
        }
    }
}
</script>
<style scoped>
.order{
    box-sizing: border-box;
    border: 1px solid #ffffff;
    margin-top: 10px;
    padding: 0px 10px;
}
image[lazy=loading] {
  width: 40px;
  height: 300px;
  
}
</style>
