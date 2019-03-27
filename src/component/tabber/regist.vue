<template>
    <div  style="padding:45px 0">
        <header class="mui-bar mui-bar-nav">
			<h1 class="mui-title">登录</h1>
		</header>

			<div class="name2" v-show="!login1">

			
				<div >用户名称：{{nickName}}</div>
			<button id='login' type="button" class="mui-btn mui-btn-block mui-btn-primary" @click="logout()">退出登录</button>

			</div>


			<div v-show="login1" class="logins">
				<div class="mui-content" >
			<form id='login-form' class="mui-input-group">
				<div class="mui-input-row">
					<label>账号</label>
					<input id='account' type="text" class="mui-input-clear mui-input" placeholder="请输入账号" v-model="userName">
				</div>
				<div class="mui-input-row">
					<label>密码</label>
					<input id='password' type="password" class="mui-input-clear mui-input" placeholder="请输入密码" v-model="passWord">
				</div>
			</form>
			
			<div class="mui-content-padded">
				<button id='login' type="button" class="mui-btn mui-btn-block mui-btn-primary" @click="login()">登录</button>
			
				<div v-show="this.return">不能为空或者账号密码不存在</div>
				</div>
			</div>
			</div>
		
			
		</div>

</template>

<script>
import { Toast } from 'mint-ui';

export default {
	data(){
		return{
			userName:'',
			passWord:'',
			return:false,
			login1:true,
			name:false

			// nicename:''
		}
	},
	computed:{
		nickName(){
			return this.$store.state.nickName
		},
		CartCount(){
			return this.$store.state.CartCount
		},
		
	},
	mounted(){
		this.checklogin();
	},
	methods:{
		
		checklogin(){
					this.$http.get('/api/checkLogin').then((res)=>{
					if(res.body.status == '0'){
						this.login1 = !this.login1
						this.$store.commit("updataUSerinfo",res.body.result)
						
					}
			})
			
			
		},

		login(){
			if(this.userName=='' || this.passWord==''){
				this.return = !this.return
				this.userName =''
				this.passWord = ''
				return
			}else{
				this.$http.post('/api/user/login',{
				userName : this.userName,
				passWord : this.passWord
			}).then((res)=>{
				
				if(res.body.status == 0){

					this.return = false
					// this.nicename = res.body.result.userName	
						if(this.$store.state.nickName === ''){
								this.login1 = !this.login1
								this.$store.commit("updataUSerinfo",res.body.result.userName)
								this.init()
						}
						
				} 
				else{
					this.return = true
					this.userName =''
					this.passWord = ''
				}
				
			},(res)=>{
				console.log("服务器中断了")
			});
			}
		},


		 logout(){
			 this.$http.post('/api/user/out').then((res)=>{
				 
				 if(res.body.status == 0){
						this.$store.commit("updataUSerinfo",'')
						this.$store.commit("defalutcount",0)
						this.login1 = !this.login1
						this.userName =''
						this.passWord = ''
						
				 }
			 })
		},

		init(){
			this.$http.get('/api/carcount').then((res)=>{
										if(res.body.status == 0){
											console.log(res.body.result)
											this.$store.commit("updateCarCount",res.body.result)
										}
										
									})
		},
		Toast(){
			 	Toast({
					 message: '提示',
					position: 'bottom',
					duration: 5000
					});
		}
	}
    
}
</script>
<style scoped>
.logins{
	margin-top: 20px;
}
.name2{
	margin-top: 20px;
	
}
</style>
