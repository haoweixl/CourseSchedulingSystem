<template>
	<view class="content">
		<u-button type="primary" @click="getProvider()">获取服务供应商</u-button>
		<u-button type="primary" @click="login()">登录请求</u-button>
		<u-button type="primary" @click="getUserInfo()">请求用户微信信息</u-button>
		<button type="default" open-type="getPhoneNumber" @getPhoneNumber="getPhoneNumber">11</button>
		<button type="default" @tap="getAuthorization">授权</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				provider: [],
			}
		},
		onLoad() {

		},
		methods: {
			getProvider() {
				console.log('调用getProvider函数!');
				const _this = this;
				
				uni.getProvider({
					service: 'oauth',
					success(res) {
						console.log(res);
						const {service, provider} = res;
						_this.provider = provider;
					},
					fail() {
						console.log('获取供应商失败!')
					}
				})
			},
			login() {
				// console.log('调用login函数!', this.provider);
				if (~this.provider.indexOf('weixin')) {
					uni.login({
						provider: 'weixin',
						timeout: 10000,
						success(loginRes) {
							console.log(JSON.stringify(loginRes));
						},
						fail() {
							console.log('登录接口调用失败!');
						}
					});
				}
			},
			getUserInfo() {
				console.log('调用getUserInfo函数', this.provider);
				if (~this.provider.indexOf('weixin')) {
					uni.getUserInfo({
						provider: 'weixin',
						success(infoRes) {
							console.log(infoRes)
							console.log(infoRes.userInfo);
							console.log('用户姓名:',infoRes.userInfo.nickName);
						},
						fail() {
							console.log('获取用户信息失败!')
						}
					})
				}
			},
			getPhoneNumber(e) {
				console.log(e)
			},
			getAuthorization() {
				wx.openSetting({
					success(res) {
						console.log(res)
					}
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
