<template>
    <div style="padding:42px 0" >
        <header class="mui-bar mui-bar-nav">
			<h1 class="mui-title">收货人信息</h1>
		</header>

        <div class="address" v-for="item in  addressFilter" :key="item.addressId">
            <input type="checkbox" name="" id=""  v-bind:checked="item.isDefault==true?1:''" @click="adressChecked(item.addressId);selectId=item.addressId">
            <div>收货人姓名：{{item.userName}}</div>
            <div>电话：{{item.tel}}</div>
            <div>地址：{{item.streeName}}</div>
            <div>132</div>
            <div @click="deladdress(item.addressId)">删除</div>
           
        </div>        

       
             <button  @click="more" type="button" class="mui-btn mui-btn-danger">更多</button>
       
        
           
            <router-link v-bind:to="{path:'order',query:{'addressId':selectId}}">
            
            <button type="button" class="mui-btn mui-btn-danger">下一步</button>
             </router-link>
        
    </div>
</template>

<script>
export default {
    data(){
        return{
            limit:2, 
            address:[],
            selectId:''
        }
    },
  mounted(){
      this.init()
  },
  computed:{
      addressFilter(){
          return this.address.slice(0,this.limit)
      }
  },
    methods:{
        init(){
            this.$http.get('/api/address').then((res)=>{
                if(res.body.status == 0){
                    this.address = res.body.result
                }
            })
        },
        more(){
            if(this.limit == 2){
                this.limit = this.address.length
            }else{
                this.limit = 2
            }
        },

        adressChecked(addressId){
            this.$http.post('/api/edit/address',{
                addressId:addressId
            }).then((res)=>{
                if(res.body.status==0){
               this.init()
                }
            })
        },
        deladdress(addressId){
            this.$http.post('/api/del/address',{
                addressId:addressId
            }).then((res)=>{
                if(res.body.status == 0){
                    console.log('删除成功')
                    this.init()
                }
            })
        }
    }
}
</script>

<style scoped>
.address{
    margin-top: 10px;
    padding: 0 40px;
    border: 1px solid #cccccc;
    box-sizing: border-box;
}
</style>
