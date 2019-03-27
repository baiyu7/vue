<template>
    <div  style="padding:42px 0">
      <header class="mui-bar mui-bar-nav">
			<h1 class="mui-title">购物车</h1>
		</header>
        <div v-for="item in carlist" :key="item.id">

           <div class="car">
                <div class="left">
                <input type="checkbox"  v-bind:checked="item.checked==0?false:true"  @click="add('checked',item)">
                <img :src="item.produceImage" alt="">
                
            </div>
            <div class="right"> 
                <div class="carname">商品名：{{item.producename}}</div>
                <div class="carprice">{{(item.produceprice*item.num) | currency("$")}}</div>
               
            </div>
            <div class="sum">
               <div @click="add('red',item)">-</div>
               <div>{{item.num}}</div>
               <div @click="add('add',item)">+</div>
               <div v-on:click="remove(item.priductId,item.num)"> 删除</div>
            </div> 
           </div>
          
        </div>

         <div @click="checkout"><button type="button" class="mui-btn mui-btn-danger">提交订单</button></div>
         
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
    data(){
        return{
            carlist:[],
            checknum:0,
           

        }
    },
    // computed:{
	// 	CartCount(){
	// 		return this.$store.state.CartCount
	// 	}
	// },
    mounted(){
        this.car()
    },
    methods:{
        car(){
            this.$http.get('/api/carlist').then((res)=>{
                if(res.body.status == '0'){
                    this.carlist = res.body.result
                     var checknum =0
                   this.carlist.forEach((i)=>{
                     if(i.checked == 1){
                         checknum+= i.num

                     }
                 })
                 this.checknum = checknum
                 this.$store.commit("defalutcount",checknum)
                }
            })
        },
        //删除订单
        remove(priductId,num){
            this.$http.post('/api/del',{
                priductId:priductId
            }).then((res)=>{
                if(res.body.status==0){
                    console.log('删除成功');
                    this.del()
                    this.$store.commit("updateCarCount",-(num))
                    this.car()
                    
                }
            })
        },

        add(flag,item){
            if(flag == 'add'){
                item.num++
                if(item.checked==1){ this.$store.commit("updateCarCount",1)}
               
            }else if(flag=='red'){
                if(item.num<=1){
                   this.Toast()
                    return 
                }else{
                        item.num--
                     if(item.checked==1){ this.$store.commit("updateCarCount",-1)}
              
               
                }
            }else{
                if(item.checked == 1){
                    item.checked = 0
                     if(item.checked ==0){
                         this.$store.commit("updateCarCount",-item.num)
                     }
                }else{
                    item.checked = 1
                      if(item.checked ==1){
                         this.$store.commit("updateCarCount",item.num)
                     }
                }
            }   

            this.$http.post('/api/editcar',{
                num : item.num,
                priductId:item.priductId,
                checked:item.checked
            }).then((res)=>{
                if(res.body.status == '0'){
                 
                
                }
            })
        },
        checkAll(){
            this.checkedall = !this.checkedall
           
        },
        checkout(){
            this.$router.push({
                path:'/address'
            })
        },
        Toast(){
			 	Toast({
				    message: '不能再删了呀',
                    iconClass: 'mui-icon mui-icon-closeempty',
					duration: 1000
					});
        },
        del(){
			 	Toast({
				    message: '删除成功',
                    iconClass: 'mui-icon mui-icon-checkmarkempty',
					duration: 1000
					});
		}
        



    }
    
}
</script>

<style scoped>
.car{
   
    overflow: hidden;
    padding: 10px 20px;
    border: 1px solid #cccccc;
        box-sizing: border-box;
    position: relative;
}
.left >img{
    width: 60%;
   
}
.left{
    float: left;
    font-size: 16px;
}
.right{
    font-size: 16px;
    float: left;
}

.carprice{
    color: red;
    margin-top: 20px;

}
.sum{
    position: absolute;

    bottom: 20px;
    right: 20px;
}
.sum >div{
    float: left;
    height: 30px;
    width: 30px;
}

</style>
