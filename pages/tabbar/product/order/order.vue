<template>
	<view>
		<view class="uni-container">
			<view class="uni-flex uni-column">
				<view class="uni-flex uni-row">
					<label class="label-productName">{{productName}}</label>
				</view>
				<view class="blank-line"></view>
				<view>
					<view class="uni-flex uni-row">
						<label class="label-increAmount">年化利率 </label>
						<label class="label-increAmount">{{Number(annualRate*100).toFixed(2)}}%</label>
					</view>
					<view class="uni-flex uni-row">
						<label class="label-increAmount">起存金额 </label>
						<label class="label-increAmount">{{minAmount}}元</label>
					</view>
					<view class="uni-flex uni-row">
						<label class="label-increAmount">产品期限 </label>
						<label class="label-increAmount">{{validityPeriod}}天</label>
					</view>
					<view class="uni-flex uni-row">
						<label class="label-increAmount">剩余库存 </label>
						<label class="label-increAmount">{{storage}}</label>
					</view>
					<view class="uni-flex uni-row">
						<label class="label-increAmount">递增金额 </label>
						<label class="label-increAmount">{{increAmount}}元</label>
					</view>
					<view class="uni-flex uni-row">
						<label class="label-increAmount">单人限额 </label>
						<label class="label-increAmount">{{singlePersonLimit}}元</label>
					</view>
					<view class="uni-flex uni-row">
						<label class="label-increAmount">单日限额 </label>
						<label class="label-increAmount">{{singleDayLimit}}元</label>
					</view>
					<view class="uni-flex uni-row">
						<label class="label-increAmount">风险等级 </label>
						<label class="label-increAmount">{{riskLevel}}</label>
					</view>
					<view class="uni-flex uni-row">
						<label class="label-increAmount">结息方式 </label>
						<label class="label-increAmount">{{settlementMethod}}</label>
					</view>
				</view>
				<view class="blank-line"></view>
				<view class="uni-flex uni-column">
					
					<view class="uni-flex uni-row">
						<uni-card style="border-radius: 40rpx;margin-top: 15rpx;padding: 0rpx;">
							<view class="uni-flex uni-row">
								<view class="label-tip">
									<label>填写信息</label>
								</view>
							</view>
							<view class="uni-form-item uni-column">
								<view class="input-info">
									<view class="uni-flex uni-row">
										<label class="label-input-tip">买入金额</label>
									</view>
									<view class="uni-flex uni-row">
										<label
											style="{width: 300rpx; border: #000000; font-size: 75rpx;font-weight: 700;}">￥</label>
										<input class="uni-input"
											style="{width: 300rpx;background-color: #ebebeb; border: #000000; font-size: 50rpx;font-weight: 700;}"
											type="number" placeholder="请输入购买金额" @input="onKeyInputPayment" />
									</view>
									<view class="line-Box" />
									<view class="uni-flex uni-row" v-show="phoneShow">
										<label class="label-input-tip">手机号</label>
									</view>
									<input v-show="phoneShow" class="uni-input" type="number" placeholder="请输入手机号"
										@input="onKeyInputPhoneNumber" />
									<view v-show="phoneShow" class="line-Box1" />
									<view class="uni-flex uni-row" v-show="passwordShow">
										<label class="label-input-tip">密码</label>
									</view>
									<input v-show="passwordShow" class="uni-input" password type="text"
										placeholder="请输入密码" @input="onKeyInputPassword" />
									<view v-show="passwordShow" class="line-Box1" />
								</view>
							</view>
						</uni-card>
					</view>

				</view>
			</view>
			<button type="warn" v-on:click="confirm()">确定</button>
		</view>
	</view>
</template>

<script>
	import {
		EntityApi,
		ConductorApi
	} from "../../../../api/restful.js";
	import sha1 from "sha1";
	export default {
		data() {
			return {
				product: [],
				productName: "空",
				validityPeriod: "空",
				storage: 0,
				annualRate: 0,
				minAmount: 0,
				increAmount: 0,
				singlePersonLimit: 0,
				singleDayLimit: 0,
				riskLevel: "空",
				settlementMethod: "空",
				phoneShow: false,
				passwordShow: false,
				payment: 0,
				phoneNum: "",
				password: ""


			}
		},
		onLoad: function(e) {
			uni.showLoading({
				title: "加载中..."
			})
			new EntityApi().getProduct(e.pid).then((res) => {
				this.product = res.data;
				this.productName = this.product[0].productName;
				this.validityPeriod = this.product[0].validityPeriod;
				this.storage = this.product[0].storage;
				this.annualRate = this.product[0].annualRate;
				this.minAmount = this.product[0].minAmount;
				this.increAmount = this.product[0].increAmount;
				this.singlePersonLimit = this.product[0].singlePersonLimit;
				this.singleDayLimit = this.product[0].singleDayLimit;
				switch (this.product[0].riskLevel) {
					case 0:
						this.riskLevel = "极低";
						break;
					case 1:
						this.riskLevel = "低";
						break;
					case 2:
						this.riskLevel = "较低";
						break;
					case 3:
						this.riskLevel = "中";
						break;
					case 4:
						this.riskLevel = "较高";
						break;
					case 5:
						this.riskLevel = "高";
						break;

				}
				this.settlementMethod = this.product[0].settlementMethod;
				new EntityApi().getWorkFlow(this.product[0].fid).then((res) => {
					new ConductorApi().getMetaDataWorkFlow(res.data[0].name).then((data) => {
						for (let i = 0; i < data.data.tasks.length; i++) {
							if (data.data.tasks[i].name.indexOf('Profile') !== -1) {
								this.phoneShow = true;
								this.passwordShow = true;
								break;
							}
						}
						uni.hideLoading();
					})
				})
			})
		},
		methods: {
			onKeyInputPayment: function(event) {
				this.payment = event.detail.value
			},
			onKeyInputPhoneNumber: function(event) {
				this.phoneNum = event.detail.value
			},
			onKeyInputPassword: function(event) {
				this.password = event.detail.value
			},
			confirm() {
				uni.showLoading({
					title: "正在生成订单..."
				})
				var orderResult = true;
				var RusultMsg = "";
				const date = new Date().getTime();
				const orderData = {
					pid: this.product[0].pid,
					cid: JSON.parse(uni.getStorageSync('Customer')).cid,
					payment: this.payment,
					orderDate: date,
					expireDate: date + Number(this.product[0].validityPeriod) * 86400000,
					phoneNum: this.phoneNum,
					password: sha1(this.password)
				};
				new EntityApi().addOrder(orderData).then((res) => {
					if (res.status === 200) {
						uni.connectSocket({
							url: `ws://conductor.rinne.top:10451/websocket/${res.data.msg}`
						});
						uni.onSocketMessage(function(event) {
							if (event.data !== '连接成功') {
								new ConductorApi().startQuery(event.data).then((re) => {
									// console.log(re);
									if (re.data.status === 'COMPLETED') {
										orderResult = true;
										new EntityApi().updateOrder({
											oid: res.data.msg,
											workflowId: event.data,
											status: 1
										}).then((r) => {
											console.log(r);
											uni.closeSocket();
										});
										uni.hideLoading();
										uni.navigateTo({
											url: './orderResult?orderResult=' +
												orderResult + '&RusultMsg=' + RusultMsg
										});
									} else {
										orderResult = false;
										// console.log(re.data.tasks);
										// eslint-disable-next-line no-plusplus
										for (let i = 0; i < re.data.tasks.length; i++) {
											if (re.data.tasks[i].status !== 'COMPLETED') {
												if (re.data.tasks[i].taskDefName.indexOf(
														'Region') !== -1) {
													RusultMsg = "您所在的地域不符合条件！";
												} else if (re.data.tasks[i].taskDefName.indexOf(
														'Profile') !== -1) {
													RusultMsg = "您的手机号或者密码错误！";
												} else if (re.data.tasks[i].taskDefName.indexOf(
														'Credential') !== -1) {
													RusultMsg = "您的身份证号错误！";
												} else {
													RusultMsg = "您不在购买人群范围内！";
												}
												break;
											}
										}
										new EntityApi().updateOrder({
											oid: res.data.msg,
											workflowId: event.data,
											status: 2
										}).then((r) => {
											console.log(r);
											uni.closeSocket();
										});
										uni.hideLoading();
										uni.navigateTo({
											url: './orderResult?orderResult=' +
												orderResult + '&RusultMsg=' + RusultMsg
										});
									}
								});
							}
						});
					}
				});

			}
		}
	}
</script>

<style>
	.uni-row {
		background-color: #FFFFFF;
	}

	.label-input-tip {
		padding-bottom: 30rpx;
		font-size: 35rpx;
		font-weight: 700;
	}

	.line-Box {
		background-color: black;
		width: 100%;
		height: 3rpx;
		margin-top: 5rpx;
		margin-right: 15rpx;
		margin-left: 15rpx;
	}

	.line-Box1 {
		background-color: black;
		width: 100%;
		height: 3rpx;
		margin-top: 5rpx;
		margin-right: 15rpx;
		margin-left: 15rpx;
	}

	.blank-line {
		padding-top: 10rpx;
		padding: 3rpx;
		height: 1rpx;
		background-color: #A5A4A4;
	}

	.label-productName {
		padding-top: 20rpx;
		padding-left: 20rpx;
		padding-bottom: 20rpx;
		flex-direction: row;
		flex-wrap: nowrap;
		font-size: 50rpx;
		font-weight: 700;
	}

	.label-increAmount {
		padding: 20rpx;
		padding-left: 140rpx;
		font-size: 35rpx;
	}

	.label-tip {
		padding: 15rpx;
		padding-left: 30rpx;
		font-size: 35rpx;
		color: #ff0000;
	}

	.input-info {
		padding: 50rpx;
		padding-left: 100rpx;
	}
</style>
