<template>
    <div style="padding:40px 0">
         <header class="mui-bar mui-bar-nav">
			<h1 class="mui-title">订单成功</h1>
		</header>
        完成购物，欢迎下次购买
        <button  @click="tofrist" type="button" class="mui-btn mui-btn-danger">继续</button>
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    methods:{
        tofrist(){
            this.$router.push({
                path:'/'
            })
        }
    }
}
</script>

<style scoped>

</style>
