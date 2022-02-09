import {http} from "../tools/http"

// 获取学校名(parameter:无|return:学校名)
export const getSchoolName = (data) => {
	return http({
		url:'/getSchoolName',
		data
	})
}

// 设置学校名称(parameter:学校名|return:无)
export const setSchoolName = (data) => {
	return http({
		url:'/setSchoolName',
		data
	})
}

// 获取上午下午上课数
// (parameter:无|return:morningCourseNum,afternoonCourseNum)
export const getCourseNum = (data) => {
	return http({
		url:'/getCourseNum',
		data
	})
}

// 设置上午下午上课数
// (parameter:morningCourseNum,afternoonCourseNum|return:无)
export const setCourseNum = (data) => {
	return http({
		url:'/setCourseNum',
		data
	})
}

// 获取是否正在运行算法过程(parameter:无|return:isRunning)
export const getIsRunning = (data) => {
	return http({
		url:'/getIsRunning',
		data
	})
}

// 设置是否正在运行算法过程（暂时不要使用）
// (parameter:isRunning|return:无)
export const setIsRunning = (data) => {
	return http({
		url:'/setIsRunning',
		data
	})
}

// 获取所有课程时间
// (parameter:无|return:Array{courseTimeId,courseTimeStart,courseTimeEnd})
export const getCourseTime = (data) => {
	return http({
		url:'/getCourseTime',
		data
	})
}

/**
 * 设置所有课程时间
 * parameter: CourseTimes:Array[
 *		{
 *			courseTimeId:Number,
 * 			courseTimeStart:String,
 * 			courseTimeEnd:String
 *		}
 *	]
 * return:无
 */
export const setCourseTime = (data) => {
	return http({
		url:'/setCourseTime',
		data
	})
}

// 获取某个年级的信息
// (parameter:grade)
/**
 *	return: {
 *		courseNames,
 * 		courseNums,
 * 		classNames,
 * 		teacherNames
 *	}
 */
export const getCourse = (data) => {
	return http({
		url:'/getCourse',
		data
	})
}

// 设置某个年级的信息
/**
 * method:GET
 * 	parameter:{
 *		grade:Number,
 * 		courseNames:Array[]:String,
 * 		courseNums:Array[]:Number,
 * 		classNames:Array[]:String,
 * 		teacherNames:Array[]:String
 *	}
 * 
 * 教师名(teacherNames):（课程名数量*班级名数量=教师名数量）
 */
export const setCourse = (data) => {
	return http({
		url:'/setCourse',
		method:'GET',
		data
	})
}
// 查看班级课程信息
export const getSchedulingClass = (data) => {
	return http({
		url: '/getSchedulingClass',
		data
	})
}
// 查看老师课程信息
export const getSchedulingTeacher = (data) => {
	return http({
		url: '/getSchedulingTeacher',
		data
	})
}
