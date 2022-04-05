<template>
	<view class="container">
<!-- 		<uni-card :is-shadow="false" is-full>
			<text class="uni-h6">登录</text>
		</uni-card> -->
			<image src="../../../../static/logo.png" mode="aspectFit" style="left: 130rpx; width: 500rpx; height: 200rpx;"></image>
			<uni-section title="登录" type="line" style="background-color: inherit;">
			<view class="example">
			<!-- 	<view class="segmented-control">
					<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem"
						styleType="button">
					</uni-segmented-control>
				</view> -->
				<!-- 展示不同的排列方式 -->
				<uni-forms ref="baseForm" :modelValue="formData" v-if="token.length === 0">
					<uni-forms-item label="账户" required>
						<uni-easyinput v-model="formData.account" placeholder="请输入账户" />
					</uni-forms-item>
					<uni-forms-item label="密码" required>
						<uni-easyinput v-model="formData.password" type="password" placeholder="请输入密码" />
					</uni-forms-item>
				</uni-forms>
				<button type="default" @click="submit" style="background-color: #e57373;color: white;" >登录</button>
				<text class="link" @click="register" style="position: relative;top: 20rpx;left: 550rpx;">还未注册？</text>
			</view>
		</uni-section>
	


	</view>
</template>

<script>
	import {AuthApi} from "../../../../api/restful.js";
	import sha1 from "sha1";
	export default {
		data() {
			return {
				token: '',
				formData: {
					account: '',
					password: ''
				}
			}
		},
		onLoad() {
			// uni.clearStorage();
		},
		methods: {
			submit: function() {
				// console.log(this.formData.account);
				new AuthApi().customerLogin({ account: this.formData.account, password: sha1(this.formData.password)}).then((re) => {
					// console.log(re.data);
					this.token=re.data.token;
					uni.setStorageSync('token', re.data.token);
					uni.setStorageSync('Customer', JSON.stringify(re.data.customer));
					uni.navigateBack({ delta:2,
					animationType: 'pop-out',
					animationDuration: 200})
				})
			},
			register: function(){
				uni.redirectTo({
					url:"../register/register"
				})
			}
		}
	}
</script>

<style lang="scss">
	.example {
		padding: 15px;
		background-color: inherit;
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

</style>
