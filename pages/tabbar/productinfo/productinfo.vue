<template>
	<view class="uni-container">
		<view class="uni-flex uni-column">
			<view class="uni-flex uni-row">
				<label class="label-productName">{{productName}}</label>
			</view>
		<view class="blank-line"></view>
			<view class="uni-flex uni-row">
				<view class="uni-flex uni-column">
						<label class="label-product-annualRate">{{Number(annualRate*100).toFixed(2)}}%</label>
						<label class="label-annualRate">年化利率</label>
				</view>
				<view class="uni-flex uni-column">
					<label class="label-minAmount">{{minAmount}}元起购</label>
				</view>
			</view>
			<view class="uni-flex uni-row">
				<label class="label-storage">剩余库存    {{storage}}</label>
				<label class="label-validityPeriod">产品期限    {{validityPeriod}}天</label>
			</view>
			<view class="blank-line"></view>
			<view class="uni-flex uni-row">
				<view class="uni-flex uni-column">
					<label class="label-increAmount">递增金额    </label>
					<label class="label-increAmount">{{increAmount}}元</label>
				</view>
				<view class="uni-flex uni-column">
					<label class="label-increAmount">单人限额    </label>
					<label class="label-increAmount">{{singlePersonLimit}}元</label>
				</view>
				<view class="uni-flex uni-column">
					<label class="label-increAmount">单日限额    </label>
					<label class="label-increAmount">{{singleDayLimit}}元</label>
				</view>
			</view>
			<view class="uni-flex uni-row">
				<view class="label-riskLevel">
					<label>风险等级：</label>
					<label :style="{'color':riskcolor}">&nbsp;&nbsp;&nbsp;&nbsp;{{riskLevel}}</label>
				</view>
				<label class="label-settlementMethod">结息方式：  {{settlementMethod}}</label>
			</view>
		</view>
		<button type="warn" v-on:click="buy">购买</button>
	</view>
</template>

<script>
	import {EntityApi} from "../../../api/restful.js";
	export default {
		data() {
			return {
				product:[],
				productName:"空",
				validityPeriod:"空",
				storage:0,
				annualRate:0,
				minAmount:0,
				increAmount:0,
				singlePersonLimit:0,
				singleDayLimit:0,
				riskLevel:"空",
				riskcolor:"#09BB07",
				settlementMethod:"空"
				
			}
		},
		onLoad:function(e) {
			console.log(e);
			uni.showLoading({
				title:"加载中..."
			})
			new EntityApi().getProduct(e.pid).then((res)=>{
				this.product=res.data;
				console.log(this.product[0]);
				this.productName=this.product[0].productName;
				this.validityPeriod=this.product[0].validityPeriod;
				this.storage=this.product[0].storage;
				this.annualRate=this.product[0].annualRate;
				this.minAmount=this.product[0].minAmount;
				this.increAmount=this.product[0].increAmount;
				this.singlePersonLimit=this.product[0].singlePersonLimit;
				this.singleDayLimit=this.product[0].singleDayLimit;
				switch(this.product[0].riskLevel){
					case 0:
						this.riskLevel="极低";
						this.riskcolor="#09BB07";
						break;
					case 1:
						this.riskLevel="低";
						this.riskcolor="#09BB07";
						break;
					case 2:
						this.riskLevel="较低";
						this.riskcolor="#09BB07";
						break;
					case 3:
						this.riskLevel="中";
						this.riskcolor="#ffaa00";
						break;
					case 4:
						this.riskLevel="较高";
						this.riskcolor="#ff0000";
						break;
					case 5:
						this.riskLevel="高";
						this.riskcolor="#ff0000";
						break;
					
				}
				this.settlementMethod=this.product[0].settlementMethod;
				uni.hideLoading();
			})
		},
		methods: {
			buy(){
				
			}
			
		}
	}
</script>

<style>
	.uni-row{
		background-color: #FFFFFF;
	}
	.blank-line{
		padding-top: 10rpx;
		padding: 5rpx;
		height: 1rpx;
		background-color:#A5A4A4;
	}
	
.label-productName{
	padding-top: 20rpx;
	padding-left: 20rpx;
	padding-bottom: 20rpx;
	flex-direction: row;
	flex-wrap: nowrap;
	font-size: 50rpx;
	font-weight: 700;
}
.label-annualRate{
	padding-left: 100rpx;
	padding-right: 200rpx;
}
.label-product-annualRate{
	padding-top: 50rpx;
	padding-left: 100rpx;
	padding-right: 170rpx;
	font-size: 40rpx;
	font-weight: 700;
	color:#FF3333;
}
.label-minAmount{
	padding: 50rpx;
	padding-left: 20rpx;
	font-size: 40rpx;
	font-weight: 700;
}
.label-storage{
	padding: 30rpx;
	padding-left: 100rpx;
	font-size: 30rpx;
	font-weight: 700;
}
.label-validityPeriod{
	padding: 30rpx;
	padding-left: 150rpx;
	font-size: 30rpx;
	font-weight: 700;
}
.label-increAmount{
	padding: 10rpx;
	padding-left: 80rpx;
	font-size: 35rpx;
}
.label-singlePersonLimit{
	padding: 20rpx;
	padding-left: 100rpx;
	font-size: 35rpx;
}
.label-singleDayLimit{
	padding: 20rpx;
	padding-left: 100rpx;
	font-size: 35rpx;
}
.label-riskLevel{
	padding: 60rpx;
	padding-left: 90rpx;
	font-size: 35rpx;
}
.label-settlementMethod{
	padding: 60rpx;
	padding-left: 90rpx;
	font-size: 35rpx;
}

</style>
