<template>
	<view class="center">
<!-- 		<uni-card :is-shadow="false" is-full>
			<text class="uni-h6">登录</text>
		</uni-card> -->
		<view class="userInfo" @click.capture="toUserInfo">
			<!-- <cloud-image width="150rpx" height="150rpx" v-if="userInfo.avatar_file&&userInfo.avatar_file.url" :src="userInfo.avatar_file.url"></cloud-image> -->
			<image class="logo-img" v-if="!token" src="@/static/uni-center/defaultAvatarUrl.png" >
			</image>
			<image class="logo-img" v-else :src="customer.avatar" ></image>
			<view class="logo-title">
				<text class="uer-name" v-if="!token">未登录</text>
				<text class="uer-name" v-else>{{customer.cname}}</text>
			</view>
		</view>
		
		<uni-grid class="grid" :column="3" :showBorder="false" :square="true">
			<uni-grid-item class="item">
				<uni-icons :type="'cart'" color="#007AFF"  size="26" />
				<text class="text">订单</text>
			</uni-grid-item>
			<uni-grid-item class="item">
				<uni-icons :type="'star'" color="#007AFF"  size="26" />
				<text class="text">收藏</text>
			</uni-grid-item>
			<uni-grid-item class="item">
				<uni-icons :type="'wallet'" color="#007AFF"  size="26" />
				<text class="text">钱包</text>
			</uni-grid-item>
		</uni-grid>
		<uni-list class="center-list" >
			<uni-list-item :title="'设置'" :clickable="true"  :show-extra-icon="true"
			 link	:extraIcon="{type:'gear-filled',color:'#999'}">
				<!-- <template v-slot:footer>
					<view v-if="item.showBadge" class="item-footer">
						<text class="item-footer-text">{{item.rightText}}</text>
						<view class="item-footer-badge"></view>
					</view>
				</template> -->
			</uni-list-item>
			<uni-list-item :title="'关于我们'" :clickable="true"  :show-extra-icon="true"
			 link	:extraIcon="{type:'more-filled',color:'#999'}">
				<!-- <template v-slot:footer>
					<view v-if="item.showBadge" class="item-footer">
						<text class="item-footer-text">{{item.rightText}}</text>
						<view class="item-footer-badge"></view>
					</view>
				</template> -->
			</uni-list-item>
		</uni-list>
		
		<uni-list class="center-list" >
			<uni-list-item :title="'退出'" :clickable="true"  :show-extra-icon="true"
			 link	:extraIcon="{type:'info-filled',color:'#999'}" v-on:click="logout">
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
	import {AuthApi} from "../../../api/restful.js";
	import sha1 from "sha1";
	import axios from "axios";
	export default {
		data() {
			return {
				token: undefined,
				customer: {
					cname:'',
					avatar: '',
					nickName:'',
					cid:''
				}
			}
		},
		onLoad() {
			// console.log(uni.getStorageSync('token'));
			// console.log(uni.getStorageSync('Customer'));
			this.token= uni.getStorageSync('token')
			this.customer = JSON.parse(uni.getStorageSync('Customer'))
		},
		onShow() {
			this.token= uni.getStorageSync('token')
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
				if(!this.token) {
					uni.navigateTo({
						url:'./login/login'
					})
				}
			},
			logout: function() {
				uni.clearStorage()
				this.token=undefined
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
		padding-top: 70px;
		background-image: url(/static/uni-center/headers.png);
		flex-direction: column;
		align-items: center;
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
		margin-top: 30rpx;
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
</style>
