<template>
	<div class="container">
		<!-- 加载动画 -->
		<Loading v-if='loading'/>
		<!-- 文章主体 -->
		<div v-if='data.author' class="article" >
			<h1 class="article-title" :title="data.title">{{data.title}} <span v-if='data.good' class="span">精品</span></h1>
			<h3>本文章由 {{data.author.loginname}} 发表于{{$moment(data.create_at).fromNow()}}</h3>
			<div class="article-text" v-html='data.content'></div>
		</div>
		<!-- 评论 -->
		<div class="replies">
			<h2 class="replies-count">回复数：{{data.reply_count}}</h2>
			<div v-for='(item,index) in data.replies' class="replies-item" :key='index'>
				<div class="replies-author" >
					<img class="author-img" :src='item.author.avatar_url'>
					<p>{{item.author.loginname}}<span class="is-host" v-if='item.author.loginname==data.author.loginname'>楼主</span></p>
					<p>回复于{{$moment(item.create_at).fromNow()}}</p>
					<p>#{{index+1}}楼</p>
				</div>		
				<p class="replis-content" v-html='item.content'></p>
			</div>
		</div>
		<!-- 发表评论 -->
		<div class="reply-editor">
			<mavon-editor v-model="replyText" :subfield='false' placeholder='请输入评论内容'/>
			<button @click='reply'>发表</button>
		</div>
		<!-- 回到顶部 -->
		<div class="back-top"><a href="#">返回顶部</a></div>
	</div>
</template>

<script>
import Loading from './Loading.vue';
export default{
	data(){
		return {
			loading:false,
			error: null,
			id:'',
			data:[],
			replyText:''
		};
	},
	components:{Loading},
	created(){
		this.loading=true;
		//console.log(this.$route);
		this.id=this.$route.query.id;
		this.getInfo();
	},
	///topic/:topic_id/replies
	methods:{
		reply(){
			if(this.$store.state.accesstoken){
				this.$axios.post('https://cnodejs.org/api/v1/topic/'+this.id+'/replies',{
					accesstoken:this.$store.state.accesstoken,
					content:this.replyText
				}).then((res)=>{
					console.log(res);
					if(res.status==200&&res.statusText=='OK'){
						//alert('回复成功');
						this.loading=true;
						this.getInfo();
						this.replyText='';
					}
				}).catch((error)=>{
					console.log(error);
					alert('网络错误');
				});
			}else{
				alert('请先登录');			
			}
		},
		getInfo(){
			this.$axios.get('https://cnodejs.org/api/v1/topic/'+this.id)
			.then(res=>{
				if(res.data.success==true){
					//console.log(res.data.data);
					this.loading=false;
					this.data=res.data.data;
				}
			}).catch(error=>{
				console.log(error);
				this.error=eror;
			});
		}
	}
};
</script>

<style scoped>
.container{
	width: 70%;
	margin: 50px auto;
	border: 1px solid #E5E5E5;
}
/*article*/
.article{	
	border: 1px solid #E1E4E6;
	padding:0 50px  50px 50px;
}
.article-title{
	color: #000;
    font-size: 30px;
    font-weight: 700;
    text-align: left;
    /*text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;*/
}
/*replies*/
.replies{
	position: relative;

}
.replies-item{
	border: 1px solid #E1E4E6;
	min-height: 200px;
}
.replies-author{
	position:absolute;
}
.replis-content{
	margin-left: 150px;
	margin-bottom: 50px;
	width: 70%;
}
.replis-content >>> img{
	width: 70%;
}
.author-img{
	width: 100px;
}
.is-host{
	color: red;
}
/*reply-editor*/
.reply-editor{

}
.reply-editor button{
	width: 120px;
	height: 50px;
	background-color: #3385ff;
	color: white;
	font-size: 20px;
}
/*回到顶部*/
.back-top{
	position:fixed;
	right: 0;
	bottom: 50px;
	border: 1px solid black;
	width: 50px;
	height: 50px;
	background-color: #3385ff;
	text-align: center;
}
.back-top a{
	text-decoration: none;
	color: white;
}
</style>