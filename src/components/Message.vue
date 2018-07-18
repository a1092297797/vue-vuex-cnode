<template>
	<div>
		<p>你有{{has_read_messages.length}}条未读信息</p>
		<p>你有{{hasnot_read_messages.length}}条已读信息</p>
	</div>
	</div>
</template>

<script>
export default{
	name:'message',
	data(){
		return{
			has_read_messages:[],
			hasnot_read_messages:[]
		}
	},
	created(){
		this.ajaxGetInfo();
	},
	methods:{
		ajaxGetInfo(){
			this.$axios.get('https://cnodejs.org/api/v1/messages',{
				params:{
					accesstoken:this.$store.state.accesstoken,
					mdrender:true
				}
			}).then((res)=>{
				//console.log(res.data.data);
				let msg = res.data.data;
				this.has_read_messages=msg.has_read_messages;
				this.hasnot_read_messages=msg.hasnot_read_messages;
			}).catch((error)=>{
				console.log(error);		
			});
		}
	}
}
</script>

<style scoped>
	
</style>