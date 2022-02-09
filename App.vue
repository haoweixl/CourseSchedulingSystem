<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	page {
		height: 100%;
		width: 100%;
		background-image: url('https://www.nc-toyama.ac.jp/ch/wp-content/uploads/sites/10/2019/03/hongo_library.jpg');
		background-repeat: repeat-y;
		background-size: cover;
	}
</style>
<style lang="scss">
	// 导入uView样式
	@import "uview-ui/index.scss";
</style>
