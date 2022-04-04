<template>
	<view class="container">
<!-- 		<uni-card :is-shadow="false" is-full>
			<text class="uni-h6">登录</text>
		</uni-card> -->
				<uni-section title="注册" type="line">
			<view class="example">
		<uni-file-picker 
				fileMediatype="image" 
				:image-styles="imageStyles" 
				:limit="1"
				file-extname="png,jpg"
				@select="select" 
				style="margin-left: 290rpx;margin-bottom: 50rpx;"
				/>
				<uni-forms ref="baseForm" :modelValue="formData" v-if="token.length === 0">
					<uni-forms-item label="账户" required>
						<uni-easyinput v-model="formData.account" placeholder="请输入账户" />
					</uni-forms-item>
					<uni-forms-item label="昵称" required>
						<uni-easyinput v-model="formData.nickName" placeholder="请输入昵称" />
					</uni-forms-item>
					<uni-forms-item label="真实姓名" required>
						<uni-easyinput v-model="formData.cname" placeholder="请输入真实姓名" />
					</uni-forms-item>
					<uni-forms-item label="密码" required>
						<uni-easyinput v-model="formData.password" type="password" placeholder="请输入密码" />
					</uni-forms-item>
				</uni-forms>
				<view class="button-group">
					<!-- <button type="primary" size="mini" @click="add">新增域名</button> -->
					<button type="primary" size="mini" @click="submit">注册</button>
					<button type="primary" size="mini" @click="login">已有帐号？</button>
				</view>
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
				// userAvatar: [],
				imageStyles:{
								width:80,
								height:80,
								border:{
									color:"grey",
									width:2,
									style:'dashed',
									radius:'36px'
								}
							},
				token: '',
				formData: {
					avatar: '',
					account: '',
					nickName:'',
					cname:'',
					password: ''
				}
			}
		},
		methods: {
			urlTobase64(url){
			    uni.request({
				url: url,
				method:'GET',
				responseType: 'arraybuffer',
				success: ress => {
					let base64 = wx.arrayBufferToBase64(ress.data); //把arraybuffer转成base64 
					base64 = 'data:image/jpeg;base64,' + base64 //不加上这串字符，在页面无法显示的哦
					// console.log(base64)
					this.formData.avatar=base64
				}
			    })
			},
			submit: function() {
				console.log(this.formData)
				this.formData.password =sha1(this.formData.password)
				new AuthApi().customerRegister(this.formData).then((re) => {
					// console.log(re)
					this.formData=null
					uni.redirectTo({
						url:"../login/login"
					})
				})
			},
			login: function() {
				uni.redirectTo({
					url: '../login/login'
				})
			},
			select: function(e) {
				// console.log(e.tempFilePaths[0]);
				this.urlTobase64(e.tempFilePaths[0]);
				// this.userAvatar= e.tempFilePaths[0];
			}
		}
	}
</script>

<style lang="scss">
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
</style>
