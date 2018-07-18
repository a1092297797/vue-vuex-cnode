<template>
	<div class="container">
		<h1>登录</h1>
		<div v-if='$store.state.isLogin'>你已经登录，请浏览其他页面吧</div>
		<template v-if='!$store.state.isLogin'>
			accesstoken:<input type="text" v-model='accesstoken'>
			<button @click='login'>点我登录</button>
		</template>		
	</div>
</template>

<script>
export default{
	data(){
		return {
			accesstoken:''
		}
	},
	methods:{
		login(){
			this.$axios.post('https://cnodejs.org/api/v1/accesstoken',{
				accesstoken:this.accesstoken
			}).then((res)=>{
				if(res.status==200&&res.statusText=='OK'){
					alert('欢迎你，'+res.data.loginname);
					let accesstoken = this.accesstoken;
					this.$store.commit('updateAccesstoken',{accesstoken:accesstoken,loginname:res.data.loginname});
				}
			}).catch((error)=>{
				console.log(error);
				alert('网络错误');
			});	
		}
	}
}
</script>

<style scoped>

</style>