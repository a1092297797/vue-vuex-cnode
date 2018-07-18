import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state:{
		isLogin:false,
		accesstoken:'',
		loginname:''		
	},
	mutations:{
		updateAccesstoken(state,msg){
			state.isLogin=true;
			state.accesstoken=msg.accesstoken;
			state.loginname=msg.loginname;
		},	
		exitLogin(state){
			state.isLogin=false;
			state.accesstoken='';
			state.loginname='';
		}	
	},
	getters:{
		//store的计算属性
	},
	actions:{
		//Action 提交的是 mutation，而不是直接变更状态。Action 可以包含任意异步操作。
		
	}
});