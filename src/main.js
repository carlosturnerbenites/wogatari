import Vue from 'vue';
import App from './App';
import router from './router';
import Buefy from 'buefy';
import 'buefy/lib/buefy.css';

Vue.config.productionTip = false;
Vue.use(Buefy,{
	defaultContainerElement: '#content',
	defaultToastDuration: 4000,
});

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: { App },
});
