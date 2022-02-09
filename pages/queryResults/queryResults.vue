<template>
	<view class="queryResults">
		<view class="title">
			{{value.list[0].className}}
		</view>
		<view class="main">
			<u-table>
				<u-tr>
					<u-th></u-th>
					<u-th>星期一</u-th>
					<u-th>星期二</u-th>
					<u-th>星期三</u-th>
					<u-th>星期四</u-th>
					<u-th>星期五</u-th>
				</u-tr>
				<u-tr v-for="(item,index) in handleList[0]" :key="index">
					<u-td style="height: 160rpx;">{{listId[index]}}</u-td>
					<u-td v-for="(item1,index1) in handleList" :style="allCourseStyle[handleList[index1][index].courseName]" style="height: 160rpx;,display: flex;flex-direction: column;">
						<view class="">
							{{handleList[index1][index].courseName}}
						</view>
						<view style="font-size: 18rpx;color: #bababa;">
							{{handleList[index1][index].teacherName}}
						</view>
					</u-td>
				</u-tr>
			</u-table>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: {
					courseNum: 5,
					list: []
				},
				handleList: [],
				listId: ['第一节课', '第二节课', '第三节课', '第四节课','第五节课','第六节课','第七节课','第八节课'],
				allCourseStyle: {
					"语文": {backgroundColor: '#ffd3d3'},
					"数学": {backgroundColor: '#ffeecf'},
					"英语": {backgroundColor: '#edffdb'},
					"物理": {backgroundColor: '#d3ffdb'},
					"政治": {backgroundColor: '#aaffce'},
					"化学": {backgroundColor: '#d0e6ff'},
					"历史": {backgroundColor: '#e3d8ff'},
					"生物": {backgroundColor: '#fad8ff'},
					"地理": {backgroundColor: '#ffd8e6'},
					"音乐": {backgroundColor: '#ffe4e5'},
					"美术": {backgroundColor: '#d2ffdb'},
					"体育": {backgroundColor: '#caffe8'}
				}
			};
		},
		methods:{
			handle() {
				let {value} = this
				for(let i = 0; i < value.list.length; i++) {
					if((i+1)%value.courseNum == 0) {
						this.handleList.push(value.list.slice(i+1-value.courseNum,i+1))
					}
				}
				console.log(this.handleList);
			}
		},
		onLoad(obj) {
			if(JSON.stringify(obj) != '{}') {
				this.value = JSON.parse(obj.value);
				this.handle();
			}
		}
	}
</script>

<style lang="scss">
.queryResults {
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
	
	.main {
		margin-top: 30rpx;
		padding: 15rpx;
	}
}
</style>
