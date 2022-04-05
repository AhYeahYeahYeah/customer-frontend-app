<template>
	<view>
		<view class="navBar">
			<view class="input-view">
				<uni-icons class="input-uni-icon" type="search" size="18" color="#999" />
				<input confirm-type="search" class="nav-bar-input" type="text" placeholder="输入搜索关键词"
					@confirm="confirm" />
			</view>
			<view style="margin-top: 2rpx; margin-left: 30rpx;align-items: center;">
				<image src="../../../static/service.png" style="width: 50rpx;height: 50rpx;" />
				<text class="text" style="color: white;">客服</text>
			</view>
			<view style="margin-top: 2rpx; margin-left: 30rpx;align-items: center;">
				<image src="../../../static/local.png" style="width: 50rpx;height: 50rpx;" />
				<text class="text" style="color: white;">{{localtion}}</text>
			</view>

		</view>
		<!-- 		<view class="uni-form-item uni-column">
				<input class="uni-input" name="input" placeholder="请输入" />
				<button type="default">搜索</button>
		</view> -->
		<!-- <button type="default">智能客服</button> -->
		<view class="content">
			<view class="uni-margin-wrap">
				<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay"
					:interval="interval" :duration="duration">
					<swiper-item>
						<image src="../../../static/c1.png" mode=""></image>
					</swiper-item>
					<swiper-item>
						<image src="../../../static/c2.png" mode=""></image>
					</swiper-item>
					<swiper-item>
						<image src="../../../static/c3.png" mode=""></image>
					</swiper-item>
				</swiper>
			</view>
			<button type="default" v-on:click="moreProducts()">更多</button>
			<view class="uni-list">
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in products"
					:key="index" v-on:click="productinfo(item.pid)">
					<view class="uni-product-list">
						<view class="uni-product-list-text-top">{{item.productName}}</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		EntityApi
	} from "../../../api/restful.js";
	export default {
		data() {
			return {
				localtion: '',
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				products: [],
			}
		},
		onLoad() {
			uni.showLoading({
				title: "加载中..."
			})
			new EntityApi()
				.getProducts().then((res) => {
					console.log(res);
					this.products = res.data;
					uni.hideLoading();
				})
		},
		onShow() {
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
							this.localtion = addressList[1]
						}
					)
				}
			});
		},
		methods: {
			productinfo(e) {
				uni.navigateTo({
					url: '../productinfo/productinfo?pid=' + e
				})
			},
			moreProducts() {
				uni.navigateTo({
					url: './products'
				})
			}
		}
	}
</script>

<style>
	view {
		display: flex;
		box-sizing: border-box;
		flex-direction: column;
	}

	.uni-product-list-body {
		height: auto;
	}

	.uni-product-list-text-top {
		line-height: 1.6em;
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
