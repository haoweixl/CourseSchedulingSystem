<template>
	<view class="content">
		<view class="title">
			{{homeTitle}}
		</view>
		<view class="form">
			<u-form :model="info" ref="uForm" :error-type="errorType" label-width="180" :label-style="formLabelStyle">
				<u-form-item label="学校名称:" prop="schoolName">
					<u-input v-model="info.schoolName" :placeholder="inputPlaceholder.schoolName" maxlength="8"/>
				</u-form-item>
				<u-form-item label="课表类型:">
					<u-radio-group v-model="info.curriculumTypes">
						<u-radio :name="item.value" @change="radioChange"  v-for="(item, index) in curriculumList" :disabled="item.disabled" :key="index">
							{{item.name}}
						</u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item :label="info.curriculumTypes=='classCurriculum'?'班级名称:':'老师名字:'" prop="name">
					<u-input v-model="info.name" :placeholder="info.curriculumTypes=='classCurriculum'?'请输入班级名称':'请输入老师名字'" maxlength="8"/>
				</u-form-item>
			</u-form>
		</view>
		<view class="bottom-button">
			<u-button @click="reset" type="warning" shape="circle">重置</u-button>
			<u-button @click="submit" type="success" shape="circle">提交</u-button>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				homeTitle: '输入信息查询课表',
				info: {
					schoolName: '',				// 学校名称
					name: '',					// 老师名字或班级名称
					curriculumTypes: 'classCurriculum'			// 课表类型
				},
				curriculumList: [
					{ name: '班级课表', disabled: false, value: 'classCurriculum' },
					{ name: '个人课表', disabled: false, value: 'personalCurriculum' }
				],
				formLabelStyle: { fontSize: '36rpx', fontWeight: '800' },
				inputPlaceholder: {
					schoolName: '请输入学校名称',
					name: '输入老师姓名或班级名称'
				},
				errorType: ['toast', 'border-bottom'],
				rules: {
					schoolName: [
						{
							required: true,
							message: '未输入学校名称',
							trigger: ['blur', 'change']
						}
					],
					name: [
						{
							required: true,
							message: '未输入老师或班级名称',
							trigger: ['blur', 'change']
						}
					]
				}
			}
		},
		methods: {
			reset() {
				this.$refs.uForm.resetFields();
				this.info.curriculumTypes = 'classCurriculum';
			},
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						if(this.info.curriculumTypes == 'classCurriculum') {
							this.getSchedulingClass({
								schoolName: this.info.schoolName,
								searchName: this.info.name
							})
						}else if(this.info.curriculumTypes == 'personalCurriculum') {
							this.getSchedulingTeacher({
								schoolName: this.info.schoolName,
								searchName: this.info.name
							})
						}else {
							console.log('课表类型出错')
						}
					} else {
						console.log('验证失败');
					}
				});
			},
			// 单选框改变时事件
			radioChange(e) {
				if(e == 'classCurriculum') {
					this.rules.name[0].message = '未输入班级名称'
				}else{
					this.rules.name[0].message = '未输入老师名字'
				}
			},
			// 查看班级课程信息请求
			async getSchedulingClass(value) {
				const {data,meta} = await this.$http.getSchedulingClass(value)
				console.log(data)
				if(meta.status == 200) {
					uni.navigateTo({
						url: '../queryResults/queryResults?value='+JSON.stringify(data)
					})
				}else {
					this.$refs.uToast.show({
						title: '没有查找到班级',
						type: 'error',
						position: 'top'
					})
				}
			},
			// 查看老师课程信息请求
			async getSchedulingTeacher(value) {
				const {data,meta} = await this.$http.getSchedulingTeacher(value)
				console.log(data)
				if(meta.status == 200) {
					uni.navigateTo({
						url: '../queryResultsPerson/queryResultsPerson?value='+JSON.stringify(data)
					})
				}else {
					this.$refs.uToast.show({
						title: '没有查找到老师',
						type: 'error',
						position: 'top'
					})
				}
			},
			// 获取年级的信息
			async getCourse() {
				const {data,meta} = await this.$http.getCourse({
					grade: 1
				});
				console.log(data)
			},
		},
		onLoad() {
			this.getCourse();
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		}
	}
</script>
	
<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 80%;
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
		box-sizing: border-box;
		font-weight: 800;
		padding: 40rpx 10rpx;
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
</style>
