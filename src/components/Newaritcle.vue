<template>
	<div class="container">
		<div v-if='$store.state.isLogin'>
			<select v-model='tab'>
				<option value="ask">问答</option>
				<option value="job">招聘</option>
				<option value="share">分享</option>
				<option value="dev" selected>测试</option>
			</select>
			<input type="text" placeholder="请输入标题" v-model='title'>
			<mavon-editor v-model="article" :subfield='false' placeholder='请输入文章内容'/>
			<button @click='newArticle'>发表新帖子</button>
			<p><a v-if='status' @click='gotoNewArticle' href="#">发表成功，查看该帖子</a></p>
		</div>
		<div v-if='!$store.state.isLogin'>
			<p>请先登录</p>
		</div>	
	</div>
</template>

<script>
export default{
	data(){
		return{
			article:'',
			title:'',
			tab:'dev',
			status:false,
			articleid:''
		}
	},
	methods:{
		newArticle(){
			if(this.$store.state.accesstoken){
				this.$axios.post('https://cnodejs.org/api/v1/topics',{
					accesstoken:this.$store.state.accesstoken,
					content:this.article,
					tab:this.tab,
					title:this.title
				}).then((res)=>{
					console.log(res);
					if(res.status==200&&res.statusText=='OK'){
						//alert('发表成功');
						this.article='';
						this.status=true;
						this.articleid=res.data.topic_id;
					}
				}).catch((error)=>{
					console.log(error);
					alert('网络错误');
				});
			}else{
				alert('请先登录');			
			}
		},
		gotoNewArticle(){
			this.$router.push('/article?id='+this.articleid);
		}
	}
}
</script>

<style scoped="">
.container{
	padding: 0 100px;
}
select{
	height: 54px;
}
input{
	height: 50px;
	width: 80%;
}
button{
	width: 120px;
	height: 50px;
	background-color: #3385ff;
	color: white;
	font-size: 20px;
}
</style>