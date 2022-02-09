export default {
	gradeList: [
		{ label: '一年级', value: 1 },
		{ label: '二年级', value: 2 },
		{ label: '三年级', value: 3 },
		{ label: '四年级', value: 4 },
		{ label: '五年级', value: 5 },
		{ label: '六年级', value: 6 },
		{ label: '七年级', value: 7 },
		{ label: '八年级', value: 8 },
		{ label: '九年级', value: 9 },
	],
	classList: [
		{ label: '一班', value: '01' },
		{ label: '二班', value: '02' },
		{ label: '三班', value: '03' },
	],
	rules: {
		schoolName: [
			{
				required: true,
				message: '请输入学校名称',
				trigger: 'blur'
			}
		],
		grade: [
			{
				required: true,
				message: '请选择年级',
				trigger: 'blur'
			}
		],
		courseName: [
			{
				validator: (rule, value, callback) => {
					return value.length !== 0;
				},
				message: '至少要选择一门课程',
			}
		]
	},
	inputPlaceholder: {
		schoolName: '请输入学校名',
		grade: '请选择年级',
		courseName: '请输入课程名',
		className: '输入班级名称'
	},
	allCourseName: ['语文', '数学', '英语', '物理', '政治', '化学', '历史', '生物', '地理', '音乐', '美术', '体育'],
}