<template>
	<view class="center">
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
				<text class="text" style="color: white;">{{location}}</text>
			</view>

		</view>
		<!-- 		<uni-card :is-shadow="false" is-full>
			<text class="uni-h6">登录</text>
		</uni-card> -->
		<view class="userInfo" @click.capture="toUserInfo">
			<!-- <cloud-image width="150rpx" height="150rpx" v-if="userInfo.avatar_file&&userInfo.avatar_file.url" :src="userInfo.avatar_file.url"></cloud-image> -->
			<image class="logo-img" v-if="!token" src="@/static/uni-center/grey.png">
			</image>
			<image class="logo-img" v-else :src="customer.avatar"></image>
			<view class="logo-title">
				<text class="uer-name" v-if="!token">未登录</text>
				<text class="uer-name" v-else>{{customer.cname}}</text>
			</view>
		</view>

		<uni-card style="border-radius: 40rpx;">
			<uni-grid class="grid" :column="3" :showBorder="false" :square="true">
				<uni-grid-item class="item">
					<uni-icons :type="'cart'" color="#ffc400" size="26" />
					<text class="text">订单</text>
				</uni-grid-item>
				<uni-grid-item class="item">
					<uni-icons :type="'star'" color="#ffc400" size="26" />
					<text class="text">收藏</text>
				</uni-grid-item>
				<uni-grid-item class="item">
					<uni-icons :type="'wallet'" color="#ffc400" size="26" />
					<text class="text">钱包</text>
				</uni-grid-item>
			</uni-grid>
		</uni-card>
		<uni-list class="center-list">
			<uni-list-item :title="'设置'" :clickable="true" :show-extra-icon="true" link
				:extraIcon="{type:'gear-filled',color:'#999'}">
				<!-- <template v-slot:footer>
					<view v-if="item.showBadge" class="item-footer">
						<text class="item-footer-text">{{item.rightText}}</text>
						<view class="item-footer-badge"></view>
					</view>
				</template> -->
			</uni-list-item>
			<uni-list-item :title="'关于我们'" :clickable="true" :show-extra-icon="true" link
				:extraIcon="{type:'more-filled',color:'#999'}">
				<!-- <template v-slot:footer>
					<view v-if="item.showBadge" class="item-footer">
						<text class="item-footer-text">{{item.rightText}}</text>
						<view class="item-footer-badge"></view>
					</view>
				</template> -->
			</uni-list-item>
		</uni-list>

		<uni-list class="center-list">
			<uni-list-item :title="'退出'" :clickable="true" :show-extra-icon="true" link
				:extraIcon="{type:'info-filled',color:'#999'}" v-on:click="logout">
				<!-- <template v-slot:footer>
					<view v-if="item.showBadge" class="item-footer">
						<text class="item-footer-text">{{item.rightText}}</text>
						<view class="item-footer-badge"></view>
					</view>
				</template> -->
			</uni-list-item>
		</uni-list>

		<!-- 	<text v-if="token.length !== 0">
			Hello!
		</text> -->
		<!-- <uni-section title="登录" type="line" v-if="token.length === 0">
			<view class="example">
				<uni-forms ref="baseForm" :modelValue="formData">
					<uni-forms-item label="账户" required>
						<uni-easyinput v-model="formData.account" placeholder="请输入账户" />
					</uni-forms-item>
					<uni-forms-item label="密码" required>
						<uni-easyinput v-model="formData.password" type="password" placeholder="请输入密码" />
					</uni-forms-item>
				</uni-forms>
				<view class="button-group">
					<button type="primary" size="mini" @click="submit">提交</button>
				</view>
			</view>
		</uni-section> -->



	</view>
</template>
<script>
	import {
		AuthApi
	} from "../../../api/restful.js";
	import sha1 from "sha1";
	import axios from "axios";
	export default {
		data() {
			return {
				token: undefined,
				customer: {
					cname: '',
					avatar: '',
					nickName: '',
					cid: ''
				},
				location: ''
			}
		},
		onLoad() {
			// console.log(uni.getStorageSync('token'));
			// console.log(uni.getStorageSync('Customer'));
			this.token = uni.getStorageSync('token')
			this.customer = JSON.parse(uni.getStorageSync('Customer'))
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
							this.localtion=addressList[1]
						}
					)
				}
			});
			this.token = uni.getStorageSync('token')
			this.customer = JSON.parse(uni.getStorageSync('Customer'))
			// console.log(this.customer.cname);
		},
		methods: {
			// submit: function() {
			// 	const authapi = new AuthApi()
			// 	// console.log(this.formData.account)
			// 	authapi.customerLogin({ account: this.formData.account, password: sha1(this.formData.password)}).then((re) => {
			// 		console.log(re.data);
			// 		this.token=re.data.token;
			// 		uni.setStorage({key: 'token',data: re.data.token});
			// 		// uni.switchTab({
			// 		// 	url:"../product/product"
			// 		// })
			// 	})
			// axios.post('http://conductor.rinne.top:10451/v1/auth/clogin', { account: this.formData.account, password: sha1(this.formData.password)})
			// .then((re) => {
			// 	console.log(re.data);
			// 	this.token=re.data.token;
			// 	console.log(this.token);
			// })
			toUserInfo: function() {
				if (!this.token) {
					uni.navigateTo({
						url: './login/login'
					})
				}
			},
			logout: function() {
				uni.clearStorage()
				this.token = undefined
				// this.customer.cname=''
			}
		},
	}
</script>

<style lang="scss">
	view {
		display: flex;
		box-sizing: border-box;
		flex-direction: column;
	}

	page {
		background-color: #f8f8f8;
	}

	.center {
		flex: 1;
		flex-direction: column;
		background-color: #f8f8f8;
	}

	.example {
		padding: 15px;
		background-color: #fff;
	}

	.segmented-control {
		margin-bottom: 15px;
	}

	.button-group {
		margin-top: 15px;
		display: flex;
		justify-content: space-around;
	}

	.form-item {
		display: flex;
		align-items: center;
	}

	.button {
		display: flex;
		align-items: center;
		height: 35px;
		margin-left: 10px;
	}

	.logo-img {
		width: 150rpx;
		height: 150rpx;
		border-radius: 150rpx;
	}

	.userInfo {
		width: 750rpx;
		padding: 20rpx;
		padding-top: 20px;
		background: #e57373;
		border-radius: 0 0 30rpx 30rpx;
		flex-direction: column;
		align-items: center;
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

	.logo-title {
		flex: 1;
		align-items: center;
		justify-content: space-between;
		flex-direction: row;
	}

	.uer-name {
		height: 100rpx;
		line-height: 100rpx;
		font-size: 38rpx;
		color: #FFFFFF;
	}

	.center-list {
		left: 30rpx;
		width: 700rpx;
		margin-top: 20rpx;
		background-color: #f9f9f9;
	}

	.item-footer {
		flex-direction: row;
		align-items: center;
	}

	.item-footer-text {
		color: #999;
		font-size: 24rpx;
		padding-right: 10rpx;
	}

	.item-footer-badge {
		width: 20rpx;
		height: 20rpx;
		/* #ifndef APP-NVUE */
		border-radius: 50%;
		/* #endif */
		/* #ifdef APP-NVUE */
		border-radius: 10rpx;
		/* #endif */
		background-color: #DD524D;
	}

	.grid {
		background-color: #FFFFFF;
		margin-bottom: 6px;
	}

	.uni-grid .item ::v-deep .uni-grid-item__box {
		justify-content: center;
		align-items: center;
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
