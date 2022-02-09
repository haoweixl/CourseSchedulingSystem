/*
	1.创建一个api.js 文件
	2.创建一个常量 conset BASE_URL作为默认url地址
	3.将封装好的方法导入出去
 */
// 创建默认地址 url 常量 
const BASE_URL = "http://47.100.34.6:8848/Course"


// 将封装好的函数导入出去
// {url, method, data} 结构参数
 const http = ({
	url,
	method,
	data
}) => {
	// return  promise 从而可以实现promise异步操作
	return new Promise((resolve, reject) => {
		uni.request({
			// 传入的url地址 
			url: BASE_URL + url,
			// 请求方法可填可不填(get)
			method: method || "post",
			// 请求数据可填可不填 默认空对象
			data: data || {},
			 header: {
					"Content-Type": "application/x-www-form-urlencoded",
			   },
			// 响应成功回调函数
			success: (res) => {
				console.log("https:----",res)
				// 配置统一的 相应结果 如果 !=0(失败) 将会统一的提示动作
				if (res.data.meta?.status != 200) {
					return uni.showToast({
						title: "获取数据失败",
						icon: "none"
					})
				}
				
				// 将请求结果resolve出去
				resolve(res.data);
			},
			// 如果error也会统一的提示
			fail: (err) => {
				console.log("失败了")
				return uni.showToast({
					title: "请求接口失败",
					icon: "none"
				})
				
				reject(err)
			}
		})
	})
}
export{
	http
}