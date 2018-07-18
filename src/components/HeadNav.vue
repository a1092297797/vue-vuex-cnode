<template>
	<div class="headnav">
		<span>
			<a href="/"><img class="logo" src="https://o4j806krb.qnssl.com/public/images/cnodejs_light.svg" ></a>
		</span>	
		<ul class="head-ul">
			<router-link to='/about'><li>关于</li></router-link>	
			<router-link to='/login' v-if='!$store.state.isLogin'><li>登录</li></router-link>
			<template v-if='$store.state.isLogin'>
				<li>{{$store.state.loginname}}</li>
				<li @click='exitLogin' class="pointer">退出</li>
			</template>
			<router-link to='/message' v-if='$store.state.isLogin'><li>信息</li></router-link>
			<router-link to='/'><li>首页</li></router-link>	
		</ul>
	</div>
</template>

<script>
export default{
	name:'headnav',
	data(){
		return{
		}
	},
	methods:{
		exitLogin(){
			var b = confirm('确定要退出登录吗？');
			if(b)this.$store.commit('exitLogin');
		}
	}
}
</script>

<style scoped>
.headnav{
	width: 100%;
	height: 50px;
	background-color: #444;
	position: fixed;
	top: 0px;
	font-size: 24px;
	padding: 0 50px;
	z-index: 100;
}
.logo{
	width: 120px;
	margin-top: 10px;
}
ul.head-ul{
	float: right;
	margin-right: 50px;
}
li{
	list-style: none;
	float: right;
	width: 200px;
	color: #ccc;
	line-height: 50px;
	height: 50px;
	text-align: center;
}
.pointer{
	cursor:pointer;
}
</style>