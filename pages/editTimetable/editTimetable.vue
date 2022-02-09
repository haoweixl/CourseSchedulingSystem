<template>
	<view class="content">
		<view class="title">
			{{homeTitle}}
		</view>
		<view class="form">
			<u-form :model="form" ref="uForm" :error-type="errorType" label-width="180" :label-style="formLabelStyle">
				<!-- <u-form-item label="学校名:" prop="schoolName">
					<u-input v-model="form.schoolName" :placeholder="inputPlaceholder.schoolName" maxlength="8"/>
				</u-form-item> -->
				<u-form-item label="年级:" prop="grade">
					<u-input v-model="form.grade" type="select" :placeholder="inputPlaceholder.grade" :select-open="gradeSelect" @click="gradeSelect = true"/>
				</u-form-item>
				<!-- <u-form-item label="上午上课节数:" label-width="300">
					<view slot="right">
						<u-number-box v-model="form.morningClassNum" bg-color="#dcdcdc" :min="0" :max="4"></u-number-box>
					</view>
				</u-form-item>
				<u-form-item label="下午上课节数:" label-width="300">
					<view slot="right">
						<u-number-box v-model="form.afternoonClassNum" bg-color="#dcdcdc" :min="0" :max="4"></u-number-box>
					</view>
				</u-form-item> -->
				<u-form-item label="课程名:" prop="courseName">
					<view slot="right">
						<u-button @click="popupShow = !popupShow" type="success" size="mini" shape="circle" throttle-time="200" plain>
							<u-icon name="arrow-down-fill" :class="[{iconActive:popupShow},{iconMy:true}]"></u-icon>
						</u-button>
					</view>
					<view v-if="form.courseInfo.length === 0" @tap="popupShow = !popupShow" class="courseNameTip">
						点击右侧展开列表
					</view>
					<view v-else>
						<u-tag :text="item.name" class="selectTag" v-for="(item, index) in form.courseInfo" :key="index" @close="deselect(item, index)" closeable type="success"></u-tag>
					</view>
				</u-form-item>
				<view :class="[{outPopupBox:true},{outPopupAtcive:!popupShow}]">
					<u-divider border-color="#4fff55" bg-color="#FAFAFA" height="2" half-width="100%" :use-slot="false"></u-divider>
					<view :class="[{inPopup: true}]" ref="popupElement">
						<u-tag :text="item" :class="[{popupTag: true}]" v-for="(item, index) in allCourseName" @click="checkLabel(item, index)" :key="index" type="success"/>
					</view>
					<u-divider border-color="#4fff55" bg-color="#FAFAFA" height="2" half-width="100%" :use-slot="false"></u-divider>
				</view>
				<view class="courseNumer" v-if="form.courseInfo.length !== 0">
					<view class="classTitle">
						每周上课数
					</view>
					<u-table :th-style="tableStyle">
						<u-tr style="line-height: 50rpx;">
							<u-th>课程名</u-th>
							<u-th width="32%">每周上课数量</u-th>
						</u-tr>
						<u-tr v-for="(item, index) in form.courseInfo" :key="index" style="line-height: 50rpx;">
							<u-td>{{item.name}}</u-td>
							<u-td width="32%">
								<u-number-box v-model="item.count" bg-color="#dcdcdc" :min="0" :max="20"></u-number-box>
							</u-td>
						</u-tr>
					</u-table>
				</view>
			</u-form>
			<view class="editClassInfo">
				<view class="classTitle" v-if="form.classInfo.length !== 0">
					{{editClassTitle}}
				</view>
				<view class="editMain" v-if="form.classInfo.length !== 0">
					<u-card v-for="(item1, index1) in form.classInfo" :key="index1" padding="20" border-radius="20" margin="15rpx" :show-head="false" full :show-foot="false">
						<view slot="body">
							<u-form label-width="150">
								<u-form-item label="班级名称:">
									<u-input v-model="item1.name" :placeholder="inputPlaceholder.className" maxlength="20"/>
									<view slot="right">
										<u-button @click="colseClassInfo(index1)" type="info" size="mini">
											<u-icon name="close"></u-icon>
										</u-button>
									</view>
								</u-form-item>
								<u-table v-if="item1.subject.length !== 0" :th-style="tableStyle">
									<u-tr style="line-height: 50rpx;">
										<u-th>课程名</u-th>
										<u-th>老师</u-th>
										<!-- <u-th>每周上课数量</u-th> -->
									</u-tr>
									<u-tr v-for="(item, index) in item1.subject" :key="index" style="line-height: 40rpx;">
										<u-td>{{item.name}}</u-td>
										<u-td>
											<u-input v-model="item.teacher" placeholder="输入老师名字" height="40" type="text" maxlength="7" />
										</u-td>
										<!-- <u-td>
											<u-number-box v-model="item.courseNumber" bg-color="#dcdcdc" :min="0" :max="20"></u-number-box>
										</u-td> -->
									</u-tr>
								</u-table>
							</u-form>
						</view>
					</u-card>
				</view>
				<view class="classBottom">
					<u-button type="primary" @click="addclassTable">添加班级信息</u-button>
				</view>
			</view>
			<view class="bottom-button">
				<u-button @click="reset" type="warning" shape="circle" :custom-style="uBtnStyle">重置</u-button>
				<u-button @click="submit" type="success" shape="circle" :custom-style="uBtnStyle">提交</u-button>
			</view>
		</view>
		<u-select v-model="gradeSelect" :list="gradeList" @confirm="getGradeSelectValue"></u-select>
		<u-select v-model="classSelect" :list="classList" @confirm="getClassSelectValue"></u-select>
		<u-toast ref="uToast" />
		<u-modal @confirm="deleteClass" v-model="colseClassInfoModalShow" mask-close-able show-cancel-button :content="colseClassInfoModalContent"></u-modal>
	</view>
</template>

<script>
	// 导入一些复杂的数据
	import data from '@/pages/editTimetable/listData.js';
	export default {
		data() {
			return {
				homeTitle: '输入信息生成课表',		// 首页的title
				editClassTitle: '班级信息',			// 输入班级信息标题
				colseClassInfoModalContent: '确定要删除此班级的信息',
				// 表单数据
				form: {
					grade: '',					// 年级
					courseInfo: [],				// 课程名
					classInfo: [],				// 班级信息
				},
				// 表单提示错误显示方式
				errorType: ['toast', 'border-bottom'],
				gradeSelect: false,		// 控制年级选择框的显示
				classSelect: false,		// 控制班级选择框的显示
				popupShow: false,		// 控制选择课程名弹出框的显示
				gradeList: [],			// 年级列表
				classList: [],			// 班级列表
				allCourseName: [],		// 全部课程列表
				rules: {},				// 表单验证规则
				inputPlaceholder: {},	// 表单提示文字
				colseClassInfoModalShow: false,
				// 表单文字样式
				formLabelStyle: { fontSize: '36rpx', fontWeight: '800' },
				itemLabalStyle: { fontSize: '28rpx', fontWeight: '800' },
				// 按钮样式
				uBtnStyle: { fontSize: '38rpx', fontWeight: '800' },
				tableStyle: { lineHeight: '100rpx', color: 'red' },
				// 复选框数据
				typeRadio: {
					value: 'personal',
					list: [
						{ name: '个人课表', value: 'personal' },
						{ name: '班级课表', value: 'class' }
					]
				},
				// 班级信息
				classInfo: {
					name: '',
					subject: [
						{ name: '语文', teacher: '', courseNumber: 1 },
						{ name: '数学', teacher: '', courseNumber: 1 },
						{ name: '英语', teacher: '', courseNumber: 1 },
						{ name: '物理', teacher: '', courseNumber: 1 },
					]
				},
				deleteIndex: 0,
				courseNum: {
					morningCourseNum: 0,
					afternoonCourseNum: 0
				},
				courseNumMax: 0
			}
		},
		onLoad() {
			// 获取列表数据
			this.getListData();
		},
		methods: {
			// 提交事件
			submit() {
				if(this.testForm()) {
					// 数据转化
					let teacher = [];
					for(let item of this.form.classInfo){
						for(let i = 0; i < item.subject.length; i++) {
							teacher.push(item.subject[i].teacher)
						}
					}
					const data = {
						grade: this.gradeList.find(val => val.label==this.form.grade).value,
						courseNames: this.form.courseInfo.map(val => val.name).join(","),
						courseNums: this.form.courseInfo.map(val => val.count).join(","),
						classNames: this.form.classInfo.map(val => val.name).join(","),
						teacherNames: teacher.join(",")
					};
					console.log(this.form)
					console.log(data)
					// 发送请求
					this.setCourse(data);
					// 重置表单
					this.reset();
				}
			},
			// 设置某个年级的信息
			async setCourse(value) {
				const {data,meta} = await this.$http.setCourse(value)
				console.log(meta)
				if(meta.status == 200) {
					this.$refs.uToast.show({
						title: '保存成功，前往首页查询',
						type: 'success',
						position: 'top'
					})
				}
			},
			// 验证表单中的班级信息是否通过返回true|false
			testForm() {
				console.log(this.form)
				if(this.form.grade == '') {
					this.$refs.uToast.show({
						title: '未选择年级',
						type: 'error',
						position: 'top'
					})
					return false;
				}
				if(this.form.courseInfo.length === 0) {
					this.$refs.uToast.show({
						title: '未添加班课程',
						type: 'error',
						position: 'top'
					})
					return false;
				}
				let count = 0;
				for(let item of this.form.courseInfo) {
					count += item.count;
				}
				if(count != this.courseNumMax) {
					this.$refs.uToast.show({
						title: '各科上课数之和需等于每周上课总数',
						type: 'error',
						position: 'top'
					})
					return false;
				}
				if(this.form.classInfo.length === 0) {
					this.$refs.uToast.show({
				 		title: '未添加班级信息',
				 		type: 'error',
				 		position: 'top'
				 	})
					return false;
				}
				for(let item of this.form.classInfo) {
					if(item.name === '') {
						this.$refs.uToast.show({
							title: '有班级名称未填写',
							type: 'error',
							position: 'top'
						})
						return false;
					}
					// console.log(item.subject)
					for(let item2 of item.subject) {
						if(item2.teacher === '') {
							this.$refs.uToast.show({
								title: '有老师姓名未填写',
								type: 'error',
								position: 'top'
							})
							return false;
						}
					}
				}
				return true;
			},
			// 获取年级选择框中选中的数据
			getGradeSelectValue(val) {
				this.form.grade = val[0].label;
			},
			// 获取班级选择框中选中的数据
			getClassSelectValue(val) {
				this.form.class = val[0].label;
			},
			// 重置表单
			reset() {	
				this.$refs.uForm.resetFields();
				this.form = {
					grade: '',					// 年级
					courseInfo: [],				// 课程名
					classInfo: [],				// 班级信息
				};
				this.popupShow = false;
				this.allCourseName = JSON.parse(JSON.stringify(data.allCourseName));
			},
			// 选中标签
			checkLabel(courseName, index) {
				this.form.courseInfo.push({
					name: courseName,
					count: 1
				});
				this.allCourseName.splice(index, 1);
				for(let item of this.form.classInfo) {
					item.subject.push({
						name: courseName,
						teacher: ''
					})
				}
				if(this.allCourseName.length === 0) {
					this.popupShow = !this.popupShow;
				}
			},
			// 取消选中
			deselect(courseName, index) {
				this.allCourseName.push(courseName.name);
				this.form.courseInfo.splice(index, 1);
				for(let item of this.form.classInfo) {
					item.subject.splice(index, 1);
				}
				if(this.allCourseName.length === 1) {
					this.popupShow = !this.popupShow;
				}
			},
			// 添加表格(生成表格数据)
			addclassTable() {
				let subject = [];
				for(let item of this.form.courseInfo) {
					subject.push({
						name: item.name,
						teacher: '',
					})
				}
				this.form.classInfo.push({
					name: '',
					subject
				})
			},
			// 删除一个班级的信息
			colseClassInfo(index) {
				this.colseClassInfoModalShow = true;
				this.deleteIndex = index;
			},
			deleteClass() {
				this.form.classInfo.splice(this.deleteIndex, 1);
			},
			async getCourseNum() {
				// 获取上课数
				const {data,meta} = await this.$http.getCourseNum();
				if(meta.status == 200) {
					this.courseNum = data.courseNum;
					this.courseNumMax = 5*(data.courseNum.morningCourseNum+data.courseNum.afternoonCourseNum);
					console.log(this.courseNumMax)
				}
			},
			// 获取列表数据
			getListData() {
				this.gradeList = data.gradeList;
				this.classList = data.classList;
				this.rules = data.rules;
				this.inputPlaceholder = data.inputPlaceholder;
				this.allCourseName = JSON.parse(JSON.stringify(data.allCourseName));
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		onShow() {
			this.getCourseNum();
		},
		watch: {
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		margin-bottom: 100rpx;
	}
	.title {
		font-size: 48rpx;
		// font-family: KaiTi;
		font-weight: 800;
		text-align: center;
		padding: 20rpx 0;
		background-color: rgba(248,248,248,0.8);
		border-radius: 0 0 100% 100%;
		margin-bottom: 20rpx;
		box-shadow: 0 1rpx 1rpx #d1d1d1;
	}
	.form {
		border: 1rpx solid #FFFFFF;
		font-weight: 800;
		padding: 10rpx;
		margin: 10rpx;
		border-radius: 15rpx;
		background-color: rgba($color: #f7f7f7, $alpha: 0.8);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.bottom-button {
		padding: 20rpx 0 ;
		display: flex;
		justify-content: space-around;
		button {
			font-size: 38rpx;
			font-weight: 800;
		}
	}
	.iconMy {
		transition: 0.5s linear;
	}
	.iconActive {
		transition: 0.5s linear;
		transform: rotate(180deg);
	}
	.courseNameTip {
		color: #C0C4CC;
		width: 100%;
	}
	
	.outPopupBox {
		transition: 0.5s linear;
		height: 230rpx;
		overflow: hidden;
		display: flex;
		flex-direction: column-reverse;
		justify-content: flex-end;
	}
	.inPopup {
		overflow: hidden;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		
		.popupTag {
			margin: 15rpx 20rpx;
			transition: 0.5s linear;
		}
	}
	.outPopupAtcive {
		height: 0rpx;
		transition: 0.5s linear;
	}
	.selectTag {
		margin: 0 10rpx;
	}
	.classTitle {
		font-size: 36rpx;
		font-weight: 800;
		padding: 15rpx 0;
	}
	.editClassInfo {
		// border: 1rpx solid;
		display: flex;
		flex-direction: column;
		.classTitle {
			// border: 1rpx solid red;
			font-size: 36rpx;
			font-weight: 800;
			padding: 15rpx 0;
		}
		.editMain {
			// border: 1rpx solid green;
		}
		.classBottom {
			
		}
	}
</style>
