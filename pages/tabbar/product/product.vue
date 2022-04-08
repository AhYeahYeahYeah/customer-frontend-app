<template>
	<view>
		<view class="navBar">
			<view class="input-view">
				<uni-icons class="input-uni-icon" type="search" size="18" color="#999" />
				<input confirm-type="search" class="nav-bar-input" type="text" placeholder="输入搜索关键词" @confirm="search"
					@input="searchinputfunction" />
			</view>
			<view style="margin-top: 2rpx; margin-left: 30rpx;align-items: center;">
				<image v-on:click="openkf()" src="../../../static/service.png" style="width: 50rpx;height: 50rpx;" />
				<text class="text" style="color: white;">客服</text>
			</view>
			<view style="margin-top: 2rpx; margin-left: 30rpx;align-items: center;">
				<image src="../../../static/local.png" style="width: 50rpx;height: 50rpx;" />
				<text class="text" style="color: white;">{{location}}</text>
			</view>
		</view>

		<view class="content">
			<view class="uni-margin-wrap">
				<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay"
					:interval="interval" :duration="duration">
					<swiper-item>
						<image class="wrap-image" src="../../../static/s1.png" mode=""></image>
					</swiper-item>
					<swiper-item>
						<image class="wrap-image" src="../../../static/s2.png" mode=""></image>
					</swiper-item>
					<swiper-item>
						<image class="wrap-image" src="../../../static/s3.png" mode=""></image>
					</swiper-item>
				</swiper>
			</view>
			<!-- 			<view style="{height: 60rpx;}" v-on:click="moreProducts()">
				<label
					style="{display:flex;padding-left: 20rpx;font-weight: 700;font-size: 40rpx;height: 60rpx;}">为您推荐&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;></label>
			</view> -->
			<uni-list style="height:130rpx;">
				<uni-list-item :clickable="true" :show-extra-icon="true" link
					:extraIcon="{type:'vip',color:'#999', size: 25}" @click="moreProducts" style="margin-top: 0rpx;">
					<uni-title slot="body" type="h2" title="为您推荐"></uni-title>
					<!-- <template v-slot:footer>
						<view v-if="item.showBadge" class="item-footer">
							<text class="item-footer-text">{{item.rightText}}</text>
							<view class="item-footer-badge"></view>
						</view>
					</template> -->
				</uni-list-item>
			</uni-list>
			<view class="uni-list">
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in products"
					:key="index" v-on:click="productinfo(item.pid)">
					<view class="uni-media-list">
						<view class="uni-media-list-text-top">
							<label class="uni-product-list-text-top">{{item.productName}}</label>
							<view>{{item.minAmount}}元起购</view>
						</view>
						<view class="uni-product-annualRate">
							<label class="product-annualRate">{{Number(item.annualRate*100).toFixed(2)}}%</label>
							<view>
								<label class="uni-media-list-text-bottom">年化利率</label>
							</view>
						</view>
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
				location: '',
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				products: [],
				searchinput: ""
			}
		},
		onLoad() {
			uni.showLoading({
				title: "加载中..."
			})
			uni.getLocation({
				type: 'wgs84',
				geocode: true,
				success: (res) => {
					// console.log(res.address.city)
					this.location = res.address.city
					uni.setStorageSync('location', this.location)
					new EntityApi("pass")
						.getProducts().then((res) => {
							this.products = res.data.slice(0, 5);
							uni.hideLoading();
						})
					// let point = new plus.maps.Point(res.longitude, res.latitude);
					// plus.maps.Map.reverseGeocode(
					// 	point, {},
					// 	(event) => {
					// 		let address = event.address; // 转换后的地理位置
					// 		let point = event.coord; // 转换后的坐标信息
					// 		let coordType = event.coordType; // 转换后的坐标系类型
					// 		let reg = /.+?(省|市|自治区|自治州|县|区)/g;
					// 		let addressList = address.match(reg).toString().split(",");
					// 		console.log(addressList[1], '位置信息')
					// 		this.location = addressList[1]
					// 		uni.setStorageSync('location', this.location)
					// 		if (this.searchinput == "") {

					// 		}
					// 	}
					// )
				}
			});

		},
		// onShow() {
		// 	uni.getLocation({
		// 		type: 'wgs84',
		// 		geocode: true,
		// 		success: (res) => {
		// 			let point = new plus.maps.Point(res.longitude, res.latitude);
		// 			plus.maps.Map.reverseGeocode(
		// 				point, {},
		// 				(event) => {
		// 					let address = event.address; // 转换后的地理位置
		// 					let point = event.coord; // 转换后的坐标信息
		// 					let coordType = event.coordType; // 转换后的坐标系类型
		// 					let reg = /.+?(省|市|自治区|自治州|县|区)/g;
		// 					let addressList = address.match(reg).toString().split(",");
		// 					console.log(addressList[1], '位置信息')
		// 					this.location = addressList[1]
		// 				}
		// 			)
		// 		}
		// 	});
		// },
		methods: {
			searchinputfunction: function(event) {
				this.searchinput = event.detail.value
			},
			productinfo(e) {
				uni.navigateTo({
					url: './productinfo/productinfo?pid=' + e
				})
			},
			moreProducts() {
				uni.navigateTo({
					url: './products'
				})
			},
			openkf() {
				uni.navigateTo({
					url: '../customer-services/customer-services'
				})
			},
			search: function(event) {
				uni.showLoading({
					title: "加载中..."
				})
				if (event.detail.value == "") {
					new EntityApi("pass")
						.getProducts().then((res) => {
							this.products = res.data.slice(0, 5);
							uni.hideLoading();
						})
				} else {
					new EntityApi("pass")
						.getProducts().then((res) => {
							const arr = [];
							for (var i = 0; i < res.data.length; i++) {
								if (this.fuzzyMatch(res.data[i].productName, event.detail.value)) {
									arr.splice(0, 0, res.data[i]);
								}
							}
							this.products = arr;
						})
					uni.hideLoading();
				}

			},
			fuzzyMatch(str, key) {
				let index = -1,
					flag = false;
				for (var i = 0, arr = key.split(""); i < arr.length; i++) {
					//有一个关键字都没匹配到，则没有匹配到数据
					if (str.indexOf(arr[i]) < 0) {
						break;
					} else {
						let match = str.matchAll(arr[i]);
						let next = match.next();
						while (!next.done) {
							if (next.value.index > index) {
								index = next.value.index;
								if (i === arr.length - 1) {
									flag = true
								}
								break;
							}
							next = match.next();
						}

					}
				}
				return flag
			}


		}
	}
</script>

<style>
	@import "@/static/icon-kefu/iconfont.css";

	view {
		display: flex;
		box-sizing: border-box;
		flex-direction: column;
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
		background-color: #ffffff;
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
		background-color: #ffffff;
	}

	.input-uni-icon {
		line-height: 80rpx;
	}

	.uni-margin-wrap {
		width: 690rpx;
		width: 100%;
	}

	.swiper {
		height: 400rpx;
	}

	.swiper-item {
		display: block;
		height: 400rpx;
		line-height: 300rpx;
		text-align: center;
	}

	.wrap-image {
		height: 400rpx;
		width: 690rpx;
		width: 100%;
	}

	.uni-media-list {
		padding-right: 70rpx;
		flex-direction: row;
	}

	.uni-media-list-body {
		height: auto;
	}

	.uni-media-list-text-top {
		line-height: 1.6em;
	}

	.uni-product-list-text-top {
		font-size: 35rpx;
		font-weight: 700;
	}

	.product-annualRate {
		padding-right: 50rpx;
		font-size: 35rpx;
		color: #FF3333;
		font-weight: 700;
	}

	.uni-media-list-text-bottom {
		font-size: 20rpx;
	}




	.uni-input-wrapper {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		flex-wrap: nowrap;
		background-color: #FFFFFF;
	}

	.uni-input {
		height: 28px;
		line-height: 28px;
		font-size: 16px;
		padding: 0px;
		flex: 1;
		background-color: #FFFFFF;
	}
</style>
