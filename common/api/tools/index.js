// 获取高度  This外部this指向  dom: 获取高度元素对象   callback获取高度后的执行对象
const getQueryHeight = (This, dom, callback) => {

	const query = uni.createSelectorQuery().in(This);
	query.select(dom).boundingClientRect(data => {

		// 执行回调函数
		callback(data);

	}).exec((data) => {
		// data 是数组形式

	});

}
const backPage = () => {
	uni.navigateBack({
		delta: 1
	});
}

// 防抖
const Debounce = (fn, delay = 1000) => {


	let timer = null

	let args = arguments
	if (timer) {
		clearTimeout(timer)
		timer = null
	}
	timer = setTimeout(() => {
		fn.apply(this, args) // this 指向vue
	}, delay)

}

// 判断是否登录
const toLoginPage = ()=>{
	console.log("今如跳转函数")
	uni.navigateTo({
		url:'../login/login'
	})

}

// 获取登录状态
const getLoginStatus = ()=>{
	return uni.getStorageSync("__LOGIN_STATUS")
}

// 判断请求是否成功
const isHttpSuccess = (data)=>{
	return data.StatusCode === '200' && data.Result;
}

// 获取日期函数
const getNewDate = ()=>{
	let time = new Date();
	let Y = time.getFullYear();
	let M = time.getMonth()+1;
	let D = time.getDate();
	return `${Y}-${M}-${D}`
}

export default {
	getQueryHeight,
	backPage,
	Debounce,
	isHttpSuccess,
	toLoginPage,
	getLoginStatus,
	getNewDate
}
