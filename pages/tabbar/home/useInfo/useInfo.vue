<template>
	<view>
		<uni-list>
			<uni-list-item class="item">
				<template v-slot:body>
					<view class="item">
						<text>头像</text>
						<!-- <cloud-image @click="uploadAvatarImg" v-if="avatar_file" :src="avatar_file.url" width="50px" height="50px"></cloud-image> -->
						<image v-if="customerBase.avatar" :src="customerBase.avatar" @click="uploadAvatarImg"
							style="width: 80rpx;height: 80rpx;" />

						<uni-icons v-else @click="uploadAvatarImg" class="chooseAvatar" type="plusempty" size="30"
							color="#dddddd"></uni-icons>
						<!-- 						<uni-file-picker fileMediatype="image" :image-styles="imageStyles" :limit="1"
							file-extname="png,jpg" @select="select" :del-icon="false" /> -->
					</view>
				</template>
			</uni-list-item>
			<uni-list-item class="item" :title="'账号'" :rightText="customerBase.account" link>
			</uni-list-item>
			<uni-list-item class="item" :title="'姓名'" :rightText="customerBase.cname" link>
			</uni-list-item>
			<uni-list-item class="item" @click="setValue('nickName')" :title="'昵称'" :rightText="customerBase.nickName"
				link>
			</uni-list-item>
			<uni-list-item class="item" @click="setValue('sid')" :title="'身份证号'" :rightText="customerPro.sid" link>
			</uni-list-item>
			<uni-list-item class="item" @click="setValue('phoneNum')" :title="'手机号'" :rightText="customerPro.phoneNum"
				link>
			</uni-list-item>
			<uni-list-item class="item" @click="setValue('birthday')" :title="'出生日期'" :rightText="customerPro.birthday"
				link>
			</uni-list-item>
			<uni-list-item class="item" @click="setValue('cardNum')" :title="'银行卡号'" :rightText="customerPro.cardNum"
				link>
			</uni-list-item>
			<uni-list-item class="item" @click="setValue('address')" :title="'家庭住址'" :rightText="customerPro.address"
				link>
			</uni-list-item>
		</uni-list>
		<uni-popup ref="dialog" type="dialog">
			<uni-popup-dialog v-if="dialog.now !== 'birthday'" mode="input" @confirm="updateValue" title="完善信息"
				placeholder="请填写信息" :value="dialog.content">
			</uni-popup-dialog>
			<uni-popup-dialog v-else mode="input" @confirm="updateBirth" title="完善信息">
				<view class="example-body">
					<uni-datetime-picker type="date" :clear-icon="false" v-model="single"
						@change="maskClick" />
				</view>
			</uni-popup-dialog>

		</uni-popup>
	</view>
</template>

<script>
	import {
		pathToBase64,
		base64ToPath
	} from 'image-tools';
	import {
		EntityApi
	} from '../../../../api/restful.js';
	import {
		Login
	} from "../../../../store/store.js";
	export default {
		data() {
			return {
				single: '',
				// avatar: '',
				dialog: {
					content: '',
					title: '',
					now: ''
				},
				customerBase: {
					cid: '',
					avatar: '',
					account: '',
					nickName: '',
					cname: '',
					password: ''
				},
				customerPro: {
					cid: '',
					sid: '',
					birthday: '',
					phoneNum: '',
					address: '',
					cardNum: ''
				},
			}
		},
		onShow() {
			this.customerBase = JSON.parse(uni.getStorageSync('Customer'))
			const _this = this
			new EntityApi(Login.getToken()).
			getCustomerProfile(this.customerBase.cid).then((r) => {
				console.log(r.data[0])
				r.data[0].birthday = r.data[0].birthday.substring(0, 10)
				_this.customerPro = r.data[0]
			})
		},
		methods: {
			setAvatar(val) {
				this.customerBase.avatar = val
				uni.setStorageSync('Customer', JSON.stringify(this.customerBase))
			},
			uploadAvatarImg: function(e) {
				var _this = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						console.log(res.tempFilePaths[0]);
						uni.compressImage({
							src: res.tempFilePaths[0],
							// quality: 10,
							width: "150px",
							height: "150px",
							success: res2 => {
								// console.log(res.tempFilePath)
								pathToBase64(res2.tempFilePath)
									.then(base64 => {
										const data = {
											cid: _this.customerBase.cid,
											avatar: base64
										}
										new EntityApi(Login.getToken())
											.updateCustomer(data).then((r) => {
												console.log(r);
												_this.setAvatar(base64)
											})
										// console.log(base64);
										// console.log(this.avatar !== '')
									})
							}
						})
					}
				});
			},
			setValue(val) {
				// console.log(nickname);
				this.dialog.title = '请填写昵称'
				if (val === 'nickName' || val === 'cname')
					eval('this.dialog.content = this.customerBase.' + val)
				else eval('this.dialog.content = this.customerPro.' + val)
				// 				switch (this.dialog.now) {
				// 					case 'nickName':
				// 						this.dialog.content = this.customerBase.`${val}`
				// 						break
				// 					case 'cname':
				// this.dialog.content = this.customerBase.cname
				// 						break
				// 					case 'sid':
				// this.dialog.content = this.customerPro.sid
				// 						break
				// 					case 'phoneNum':
				// this.dialog.content = this.customerPro.sid
				// 						break
				// 					case 'birthday':

				// 						break
				// 					case 'cardNum':

				// 						break
				// 					case 'address':

				// 						break
				// 					default:
				// 						break

				// 				}
				this.dialog.now = val
				// console.log(this.dialog.content)
				this.single = this.dialog.content
				this.$refs.dialog.open()
			},
			maskClick(e) {
				console.log('maskClick事件:', e);
				this.dialog.content = e
			},
			updateBirth() {
				this.updateValue(this.dialog.content)
			},
			updateValue(val) {
				console.log(val)
				switch (this.dialog.now) {
					case 'nickName':
						var data = {
							cid: this.customerBase.cid,
							nickName: val
						}
						new EntityApi(Login.getToken())
							.updateCustomer(data).then((r) => {
								console.log(r);
								this.customerBase.nickName = val
								uni.setStorageSync('Customer', JSON.stringify(this.customerBase));
							})
						break
					case 'cname':
						var data = {
							cid: this.customerBase.cid,
							cname: val
						}
						new EntityApi(Login.getToken())
							.updateCustomer(data).then((r) => {
								console.log(r);
								this.customerBase.cname = val
								uni.setStorageSync('Customer', JSON.stringify(this.customerBase));
							})
						break
					case 'sid':
						var data = {
							cid: this.customerBase.cid,
							sid: val
						}
						new EntityApi(Login.getToken()).updateCustomerProfile(data).then((r) => {
							console.log(r);
							this.customerPro.sid = val
							// uni.setStorageSync('Customer', JSON.stringify(this.customerBase));
						})
						break
					case 'phoneNum':
						var data = {
							cid: this.customerBase.cid,
							phoneNum: val
						}
						new EntityApi(Login.getToken()).updateCustomerProfile(data).then((r) => {
							console.log(r);
							this.customerPro.phoneNum = val
							// uni.setStorageSync('Customer', JSON.stringify(this.customerBase));
						})
						break
					case 'birthday':
						var data = {
							cid: this.customerBase.cid,
							birthday: val
						}
						new EntityApi(Login.getToken()).updateCustomerProfile(data).then((r) => {
							console.log(r);
							this.customerPro.birthday = val
							// uni.setStorageSync('Customer', JSON.stringify(this.customerBase));
						})
						break
					case 'cardNum':
						var data = {
							cid: this.customerBase.cid,
							cardNum: val
						}
						new EntityApi(Login.getToken()).updateCustomerProfile(data).then((r) => {
							console.log(r);
							this.customerPro.cardNum = val
							// uni.setStorageSync('Customer', JSON.stringify(this.customerBase));
						})
						break
					case 'address':
						var data = {
							cid: this.customerBase.cid,
							address: val
						}
						new EntityApi(Login.getToken()).updateCustomerProfile(data).then((r) => {
							console.log(r);
							this.customerPro.address = val
							// uni.setStorageSync('Customer', JSON.stringify(this.customerBase));
						})
						break
					default:
						break

				}
			},
			select: function(e) {
				console.log(e.tempFilePaths[0]);
				uni.compressImage({
					src: e.tempFilePaths[0],
					// quality: 10,
					width: "150px",
					height: "150px",
					success: res => {
						// console.log(res.tempFilePath)
						pathToBase64(res.tempFilePath)
							.then(base64 => {
								this.formData.avatar = base64;
								console.log(base64);
							})
					}
				})
				// this.urlTobase64(e.tempFilePaths[0]);
				// this.userAvatar= e.tempFilePaths[0];
			}
		}
	}
</script>

<style lang="scss">
	/* #ifndef APP-NVUE */
	view {
		display: flex;
		box-sizing: border-box;
		flex-direction: column;
	}

	/* #endif */
	.item {
		width: 750rpx;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.chooseAvatar {
		border: dotted 1px #ddd;
		border-radius: 10px;
		text-align: crenter;
		width: 80rpx;
		height: 80rpx;
		line-height: 50px;
	}

	.example-body {
		background-color: #fff;
		padding: 2px;
	}
</style>
