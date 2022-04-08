<template>
	<view class="root">
		<view class="navBar">
			<view class="input-view">
				<uni-icons class="input-uni-icon" type="search" size="18" color="#999" />
				<input confirm-type="search" class="nav-bar-input" type="text" placeholder="输入搜索关键词"
					@confirm="confirm" />
			</view>
			<!-- #ifndef APP-PLUS-NVUE -->
			<view style="margin-top: 2rpx; margin-left: 30rpx;align-items: center;">
				<image src="../../../../static/service.png" style="width: 50rpx;height: 50rpx;" />
				<text class="text" style="color: white;">客服</text>
			</view>
			<!-- #endif -->
			<view style="margin-top: 2rpx; margin-left: 30rpx;align-items: center;">
				<image src="../../../../static/local.png" style="width: 50rpx;height: 50rpx;" />
				<text class="text" style="color: white;">{{location}}</text>
			</view>
		
		</view>
		<view class="uni-padding-wrap">
			<view class="uni-title">这是选项卡页面跳转详情页面的演示，下面是页面跳转时传递过来的标题：</view>
			<view class="uni-title">{{title}}</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				location: '',
				title: ''
			}
		},onShow() {
			uni.getLocation({
				type: 'wgs84',
				geocode: true,
				success: (res) => {
					let point = new plus.maps.Point(res.longitude, res.latitude);
					plus.maps.Map.reverseGeocode(
						point, {},
						(event) => {
							let address = event.address; // 转换后的地理位置
							let point = event.coord; // 转换后的坐标信息
							let coordType = event.coordType; // 转换后的坐标系类型
							let reg = /.+?(省|市|自治区|自治州|县|区)/g;
							let addressList = address.match(reg).toString().split(",");
							console.log(addressList[1], '位置信息')
							this.location = addressList[1]
						}
					)
				}
			});
		},onLoad(e) {
			this.title = e.title || '';
		},methods: {
			confirm() {

			},
		}
	}
</script>
<style lang="scss">
	@import '@/common/uni-ui.scss';

	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4;
		min-height: 100%;
		height: auto;
	}

	view {
		display: flex;
		box-sizing: border-box;
		flex-direction: column;
	}

	.tips {
		color: #67c23a;
		font-size: 14px;
		line-height: 40px;
		text-align: center;
		background-color: #f0f9eb;
		height: 0;
		opacity: 0;
		transform: translateY(-100%);
		transition: all 0.3s;
	}

	.tips-ani {
		transform: translateY(0);
		height: 40px;
		opacity: 1;
	}

	.content {
		width: 100%;
		display: flex;
	}

	.list-picture {
		width: 100%;
		height: 145px;
	}

	.thumb-image {
		width: 100%;
		height: 100%;
	}

	.ellipsis {
		display: flex;
		overflow: hidden;
	}

	.uni-ellipsis-1 {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.uni-ellipsis-2 {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.navBar {
		width: 750rpx;
		padding: 20rpx;
		padding-top: 40px;
		background: #e57373;
		// border-radius: 30rpx;
		flex-direction: row;
		// align-items: center;
	}

	.input-view {
		display: flex-start;
		flex-direction: row;
		flex: 1;
		background-color: #f8f8f8;
		height: 80rpx;
		border-radius: 15px;
		padding: 0 15px;
		flex-wrap: nowrap;
		margin: 7px 0;
		line-height: 80rpx;
		width: 500rpx;
		align-items: flex-start;

		margin-left: 10rpx;
	}

	.nav-bar-input {
		height: 80rpx;
		line-height: 80rpx;
		/* #ifdef APP-PLUS-NVUE */
		width: 370rpx;
		/* #endif */
		padding: 0 5px;
		font-size: 12px;
		background-color: #f8f8f8;
	}

	.input-uni-icon {
		line-height: 80rpx;
	}
</style>
