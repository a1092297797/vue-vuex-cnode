import Vue from 'vue';
import Router from 'vue-router';
import Topic from '@/components/topic.vue';
import Article from '@/components/Article.vue';
import Login from '@/components/Login';
import Message from '@/components/Message';
import Newaritcle from '@/components/Newaritcle';
import About from '@/components/About'

Vue.use(Router);

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      redirect:'/topic/all',
    },
    {
      path: '/topic/:tab',
      name: 'topic',
      component: Topic
    },
    {
      path: '/article',
      name: 'article',
      component: Article
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/message',
      name: 'message',
      component: Message
    },
    {
      path: '/newaritcle',
      name: 'newaritcle',
      component: Newaritcle
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
