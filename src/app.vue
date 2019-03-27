<template>
    <div>
       

			<router-view></router-view>

			
        <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item " to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="/login">
			<span class="mui-icon mui-icon-email"></span>
				<span class="mui-tab-label">订单</span>
			</router-link>
			<router-link class="mui-tab-item" to="/carList">
					<span class="mui-icon mui-icon-email"><span class="mui-badge">{{CartCount}}</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" to="/me">
				<span class="mui-icon mui-icon-gear"></span>
				<span class="mui-tab-label">登录</span>
			</router-link>
		</nav>
    </div>
</template>
<script>
export default {
	computed:{
		CartCount(){
			return this.$store.state.CartCount
		},
	
	},
	created(){
		this.init()
	},
	methods:{
		init(){
			this.$http.get('/api/carcount').then((res)=>{
				if(res.body.status == 0){
					console.log(res.body.result)
					this.$store.commit("updateCarCount",res.body.result)
					
					
				}
		})
		}
	}
    
}
</script>
<style scoped>
body{
	padding: 42px,0;
}
</style>
