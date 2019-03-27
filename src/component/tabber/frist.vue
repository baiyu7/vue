<template>

    <div style="padding:40px 0">
        <header class="mui-bar mui-bar-nav">
			<h1 class="mui-title">小白的网站</h1>
		</header>
            <!-- <transition 
                            @before-enter="beforeEnter"
                            @enter="enter"
                            @after-enter="afterEnter"
                            >
                                <div class="ball"   ></div>
                                
                        </transition> -->
        <div class="mint-navbar page-part">
            <a class="mint-tab-item"  v-on:click="add">
                <div class="mint-tab-item-icon"></div>
                <div class="mint-tab-item-label">下一页</div>
            </a>
            <a class="mint-tab-item " v-on:click ="red">
                <div class="mint-tab-item-icon"></div>
                <div class="mint-tab-item-label">上一页</div>
            </a> 
            <a class="mint-tab-item" v-on:click="sort">
                <div class="mint-tab-item-icon"></div> 
                <div class="mint-tab-item-label">按价格高到低</div>
            </a>
        </div>

        <div class="goodlist" >
            <div class="nav" v-for="item in goods" :key="item.id">
                    <img v-lazy="item.produceImage" alt="">
                     <div class="message">
                        <div>{{item.producename}}</div>
                        <div> <span class="money">￥</span>{{item.produceprice }}</div>
                        <button type="button" class="mui-btn mui-btn-danger"  @click="addCart(item.priductId)">
                        加入购物车
                      
                        </button>
                      
                     </div>
            </div>
           
           
        </div>
            

             <div v-show="have" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" >
                 加载中。。。。
            </div>

     
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
    data(){
        return{
            have:true,
            goods:[],
            page:1,
            pageSize:4,
            sortFlag :1,
             busy: true,
             ball:false,
             pricelevel:'all'
        }
    },


    created(){
        this.getgoods()
        
    },
    
    methods:{

        // 加载商品的get（）接口的方法
        getgoods(flag){
            this.$http.get('/api/goods/list?page='+this.page+'&pageSize='+this.pageSize+'&sort='+this.sortFlag+'&priceLevel='+this.pricelevel+'').then(result=>{
                if(result.body.status === 0){
                  
                   if(flag){
                        this.goods = this.goods.concat(result.body.message)
                            if(result.body.conunt === 0){

                                this.none()
                                
                                this.busy = true
                                this.have = !this.have
                             
                               
                            }else{
                                this.busy = false
                            }
                   }else{
                       this.goods = result.body.message
                       this.busy = false
                   }
                    
                }else{
                    console.log('error')
                }
            }).catch(function(err){
                console.log(err)
            })
        },
        // 价格排序的方法
        sort(){
            this.sortFlag =-this.sortFlag
             this.getgoods()
        },
        // 上一页的方法
        add(){
          this.page++ 
          this.getgoods()
        },
        // 下一页的方法
        red(){
            this.page--
             this.getgoods()
        },
        // 加入购物车的方法
        addCart(priductId){

            if(this.$store.state.nickName ==''){
             this.nologin()
            }else{
                   this.$http.post('/api/goods/addCart',{
               priductId:priductId
           }).then((result)=>{
              
              if(result.body.status == 0){
                  console.log('success')
                  this.Toast()
                  this.$store.commit("updateCarCount",1)
               }
           })
            }
        
        },
        
       
        // 加载给更多商品的方法 延时加载
        loadMore: function() {
                    this.busy = true
                    setTimeout(() => {
                    this.page++
                    this.getgoods(true)
                }, 1000)
    },

    Toast(){
			 	Toast({
				    message: '添加成功',
                    iconClass: 'mui-icon mui-icon-checkmarkempty',
					duration: 1000
					});
        },
         none(){
			 	Toast({
				    message: '没有更多了',
                    iconClass: 'mui-icon mui-icon-checkmarkempty',
					duration: 1000
					});
        },
        nologin(){
			 	Toast({
				    message: '请先登录',
                    iconClass: 'mui-icon mui-icon-personadd',
					duration: 1000
					});
		}
        
        
        // beforeEnter(el){
        //     el.style.transform = "translate(0,0)";
            

        // },
        // enter(el,done){
        //     el.offsetWidth;
        //     el.style.transform = "translate(-44px,338px)";
        //     el.style.transition = 'all 1s ease';
        //     done();
 
        // },
        // afterEnter(el){
        //     this.ball = !this.ball;
        // }

    }
    
}
</script>

<style scoped>

 .nav{
         width: 100%;
         overflow: hidden;
            margin-top: 10px;
            padding: 0 10px;
        }
        .nav img{
            display: block;
            float: left;
           height: 100px;
           width:100px;
        }
   
        .message{
            margin-left: 10px;
            float: right;
            border-bottom: 1px solid #ffffff;   
            width: 54%;
            box-sizing: border-box;
            height: 100px;
            position: relative;

        }
        .message>button{
            position: absolute;
            bottom: 10px;
            right: 15px;

        }
        .message>div:nth-of-type(1){
           color: black;
           font-size: 14px;
        }
        .message>div:nth-of-type(2){
            color: red;
            font-size: 16px;
            margin-top: 16px
        }
        .money{
            font-size: 12px;

        }
button{
    position: relative;
}
image[lazy=loading] {
  width: 40px;
  height: 200px;
 
}
</style>
