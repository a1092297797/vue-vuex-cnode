<template>
	<div class="outer">
	    <div class="container">
			<div @click='changeTab($event)' class="nav-button">
			  <button data-tab="all">全部</button>
			  <button data-tab='share'>分享</button>
			  <button data-tab='ask'>问答</button>
			  <button data-tab='good'>精品</button>
			  <button data-tab='job'>招聘</button>
			  <button data-tab='dev'>测试</button>	
			  <router-link to='/newaritcle'><button>发表帖子</button></router-link>
			</div>
			<Loading v-if="loading"/>
		    <div v-if="error" class="error">
		      {{ error }}
		    </div>
		    <div v-if='!loading'>		 	  
				<template v-for='(item,index) in topicList'>
					<div class="content" @click='getToArticle(item.id)'>
						<a :title='item.title' :key='index'>
							<span class="span" v-bind:class="{ isTopOrGood: (item.good||item.top) }">{{getSpan(item)}}</span>						
							{{item.title}}
						</a>
						<span class="timespan">{{item.reply_count}}/{{item.visit_count}}&nbsp;&nbsp;{{$moment(item.create_at).fromNow()}}</span>
					</div>
				</template> 
				<button @click="getMore" class="getMore">点击加载更多</button>
			</div>
		</div>


	</div> 
</template>

<script>
import Loading from './Loading.vue';
export default{
	name:'topic',
	data(){
		return{
			loading: false,
		    error: null,
			topicList:[],
			page:1,
			tab:'all',
			tabObj:{
				'ask':'问答',
				'share':'分享',
				'dev':'测试',
				'good':'精品',
				'job':'招聘',
			}
		}
	},
	components:{Loading},
	created(){
      	this.loading = true;
		this.tab=this.$route.params.tab||'all';
		this.ajaxGetInfo();
	},
	watch: {
	    '$route' (to, from) {
	    	this.error = null;
      		this.loading = true;
	      	this.tab = to.params.tab;
	      	this.topicList=[];
	      	this.ajaxGetInfo();
	    }
	},
	methods:{
		ajaxGetInfo(){
			
			this.$axios.get('https://cnodejs.org/api/v1/topics',{
				params:{
					page:this.page,
					tab:this.tab,
					limit:20
				}
			}).then((data)=>{
				//console.log(data.data.data);
				this.loading=false;
				this.topicList = this.topicList.concat(data.data.data);
			}).catch((error)=>{
				this.error=error;
				console.log(error);
			});
		},
		getSpan(item){
			if(item.top){
				return '置顶'
			}else if(item.good){
				return '精品'
			}else{
				return this.tabObj[item.tab]
			}
		},
		getMore(){
			this.page=this.page+1;
			this.ajaxGetInfo();
		},
		changeTab(event){
			let text = event.target.getAttribute('data-tab');
			if(text){
				//console.log(text);
				this.$router.push('/topic/'+text);
			}			
		},
		getToArticle(id){
			this.$router.push('/article?id='+id);
		}
	}
}
</script>

<style>
a,button{
	cursor:pointer;
}
.outer{
	margin-left: 100px;
	margin-right: 100px;
}
.span{
	font-size: 18px;
	background: #ccc;
	color: white;
}
.container{
	font-size: 20px;
}
.isTopOrGood{
	background-color: red;
	color: white;
}
.content{
	padding-left: 20px;
	border:1px solid #F0F8FF;
	height: 50px;
	line-height: 50px;
	overflow: hidden;
}
.timespan{
	display: inline-block;
	float: right;
	font-size: 14px;
}	
.getMore{
	text-align: center;
	width: 100%;
	height: 50px;
}
.nav-button button{
	width: 80px;
	height: 50px;
}
</style>