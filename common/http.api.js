//let domain	= 'http://wap.jczhaoshang.wang';
let domain	= 'http://weixin.com/web/';

let baseUrl	= domain;
const install = (Vue, vm) => {
	let api = {
		register: (params = {}) => vm.$u.post(baseUrl+'register/save', params),
		login: (params = {}) => vm.$u.post(baseUrl+'login/login', params),
	}

	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = api;


}

export default {
	install
}
