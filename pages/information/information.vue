<template>
	<view class="content">
		<view class="title">
			{{homeTitle}}
		</view>
		<view class="body">
			<u-cell-group>
				<u-cell-item title="学校名:" @click="schoolModalShow=true" :value="info.schoolName||'未填写'"></u-cell-item>
				<!-- <u-cell-item title="年级:" @click="gradeSelect = true" :value="info.grade||'未填写'"></u-cell-item> -->
			</u-cell-group>
			<u-form   style="background-color: #FFFFFF;">
				<u-form-item label="上午上课节数:" label-width="300">
					<view slot="right">
						<u-number-box @minus="debounce" @plus="debounce" v-model="info.morningClassNum" bg-color="#dcdcdc" :min="0" :max="4"></u-number-box>
					</view>
				</u-form-item>
				<u-form-item label="下午上课节数:" label-width="300">
					<view slot="right">
						<u-number-box @minus="debounce" @plus="debounce" v-model="info.afternoonClassNum" bg-color="#dcdcdc" :min="0" :max="4"></u-number-box>
					</view>
				</u-form-item>
			</u-form>
		</view>
		<u-modal v-model="schoolModalShow" @confirm="submitSchoolName" @cancel="cancelSchoolName" title="输入新的学校名" :show-cancel-button="true" :mask-close-able="true">
			<view class="slot-content model">
				<u-input v-model="newInfo.schoolName" placeholder="输入学校名" maxlength="8"></u-input>
			</view>
		</u-modal>
		<u-select v-model="gradeSelect" :list="gradeList" @confirm="getGradeSelectValue"></u-select>
	</view>
</template>

<script>
	function Debounce (fn, delay = 1000)  {
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
	export default {
		data() {
			return {
				info: {
					schoolName: '',
					grade: '',
					morningClassNum: 1,			// 上午上课节数
					afternoonClassNum: 1,		// 下午上课节数
				},
				homeTitle: '查看或修改信息',
				schoolModalShow: false,
				newInfo: {
					schoolName: '',
					grade: ''
				},
				gradeSelect: false,		// 控制年级选择框的显示
				gradeList: [
					{ label: '一年级', value: '01' },
					{ label: '二年级', value: '02' },
					{ label: '三年级', value: '03' },
					{ label: '四年级', value: '04' },
					{ label: '五年级', value: '05' },
					{ label: '六年级', value: '06' },
					{ label: '七年级', value: '07' },
					{ label: '八年级', value: '08' },
					{ label: '九年级', value: '09' },
				],
			}
		},
		methods: {
			// 修改学校名称
			async submitSchoolName() {
				const {data,meta} = await this.$http.setSchoolName({
					schoolName: this.newInfo.schoolName
				})
				if(meta.status == 200) {
					this.info.schoolName = this.newInfo.schoolName;
				}
				this.newInfo = {
					schoolName: '',
					grade: ''
				}
			},
			debounce() {
				Debounce(this.setCourseNum, 500)
			},
			// 修改上课数
			async setCourseNum() {
				const {data,meta} = await this.$http.setCourseNum({
					morningCourseNum: this.info.morningClassNum,
					afternoonCourseNum: this.info.afternoonClassNum
				})
			},
			cancelSchoolName() {
				this.newInfo = {
					schoolName: '',
					grade: ''
				}
			},
			// 获取年级选择框中选中的数据
			getGradeSelectValue(val) {
				this.newInfo.grade = val[0].label;
				this.newInfo.schoolName = this.info.schoolName;
				console.log(this.newInfo)
				this.info.grade = this.newInfo.grade;
				this.newInfo = {
					schoolName: '',
					grade: ''
				}
			},
			
			// 获取学校名|年级|上课节数(上午|下午)
			async getSchoolName() {
				// 获取学校名称
				const {data,meta} = await this.$http.getSchoolName();
				if(meta.status == 200) {
					this.info.schoolName = data.schoolName;
				}
			},
			async getCourseNum() {
				// 获取上课数
				const {data,meta} = await this.$http.getCourseNum();
				if(meta.status == 200) {
					console.log(data)
					this.info.morningClassNum = data.courseNum.morningCourseNum;
					this.info.afternoonClassNum = data.courseNum.afternoonCourseNum;
				}
			}
		},
		created() {
			this.getSchoolName();
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
		// justify-content: space-between;
		height: 100%;
		background-color: rgba($color: #ffffff, $alpha: .4);
	}
	.title {
		font-size: 48rpx;
		font-weight: 800;
		text-align: center;
		padding: 20rpx 0;
		background-color: rgba(248,248,248,1);
		border-radius: 0 0 100% 100%;
		margin-bottom: 20rpx;
		box-shadow: 0 1rpx 1rpx #d1d1d1;
	}
	.model {
		padding: 10rpx 20rpx;
	}
	.body {
		background-color: #FFFFFF;
	}
</style>
