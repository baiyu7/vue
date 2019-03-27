<template>
    <div style="padding:42px 0">
      <header class="mui-bar mui-bar-nav">
			<h1 class="mui-title">订单确认</h1>
            
		</header>

        <div v-for="item in orederlist" :key="item.priductId" >
            <div v-if="item.checked==1">
                <div>{{item.producename}}</div>
          
                <div>{{item.num*item.produceprice | currency("$")}}</div>
            </div>
           
        </div>
        <div class="btn">
        <button @click="payMent()" type="button" class="mui-btn mui-btn-danger">确定结算</button>

        </div>
        
    </div>
</template>

<script>
export default {
    data(){
        return{
            orederlist:[],
            orderTotal:0
        }
    },
    mounted(){
        this.init()
    },
    methods:{
        init(){
            this.$http.get('/api/carList').then((res)=>{
                if(res.body.status == 0){
                    this.orederlist = res.body.result 

                    this.orederlist.forEach((i)=>{
                        if(i.checked==1){
                            this.orderTotal +=i.produceprice*i.num
                        }
                    })
                }
            })
        },
        
        payMent(){
            var addressId = this.$route.query.addressId
            this.$http.post('/api/payMent',{
                addressId:addressId,
                orderTotal:this.orderTotal
            }).then((res)=>{
                if(res.body.status == 0){
               
                    this.$router.push({
                        path:'/ordersuccess?orderId='+res.body.result.orderId
                    })
                }
            })
        }
    }
}
</script>

<style scoped>
.btn{
    text-align: right;
    margin: 10px 30px;
}
</style>
