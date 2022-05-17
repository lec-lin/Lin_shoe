// 这里的Vue为Vue对象(非创建出来的实例)，vm为main.js中“Vue.use(httpInterceptor, app)”这一句的第二个参数，
// 为一个Vue的实例，也即每个页面的"this"
// 如果需要了解这个install方法是什么，请移步：https://uviewui.com/components/vueUse.html
const install = (Vue, vm) => {
	
	let baseUrl = 'https://zhaoshangwang.jczhaoshang.com/v1';
	
	// 此为自定义配置参数，具体参数见上方说明
	Vue.prototype.$u.http.setConfig({
		//baseUrl: baseUrl,
		loadingText: '努力加载中~',
		loadingTime: 800,
		// 设置自定义头部content-type
		// header: {
		// 	'content-type': 'xxx'
		// }
		// ......
	});
	// 请求拦截部分，如配置，每次请求前都会执行
	Vue.prototype.$u.http.interceptor.request = (config) => {		
		return config;// 如果return一个false值，则会取消本次请求
	}
	// 响应拦截，如配置，每次请求结束都会执行本方法
	Vue.prototype.$u.http.interceptor.response = (res) => {
		return res;
	}
}

export default {
	install
}