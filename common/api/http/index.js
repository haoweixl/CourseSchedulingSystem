
const requireApi = require.context(
	// http 目錄的相对路径
	'.',
	// 是否查询子目录
	false,
	// 查询文件的一个后缀
	/.js$/
	
)
let module = {} 
requireApi.keys().forEach((key,index)=>{
	if( key === './index') return ;
	// console.log(requireApi(key))
	Object.assign(module,requireApi(key))
})

export default module
