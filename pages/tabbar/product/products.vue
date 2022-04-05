<template>
	<view>
		<view class="uni-form-item uni-column">
		    <view class="uni-input-wrapper">
				<uni-icons type="search" size="28"></uni-icons>
		        <input class="uni-input" confirm-type="search" placeholder="请输入" />
				<button class="search-button" type="primary">搜索</button>
				<uni-icons custom-prefix="kefuicon" type="icon-kefu" size="30" v-on:click="openkf()"></uni-icons>
			</view>
		</view>
			<view class="example-body">
				<uni-combox :candidates="candidates" placeholder="请选择产品类型" v-model="city"></uni-combox>
			</view>
	<view class="content">
		<view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in products" :key="index" v-on:click="productinfo(item.pid)">
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
	import {EntityApi} from "../../../api/restful.js";
	export default {
		data() {
			return {
				products:[]
			}
		},
		onLoad() {
			uni.showLoading({
				title:"加载中..."
			})
			new EntityApi().getProducts().then((res)=>{
				console.log(res);
				this.products=res.data;
				uni.hideLoading();
			})
		},
		methods: {
			productinfo(e){
				uni.navigateTo({
					url:'../productinfo/productinfo?pid='+e
				})
			}
			
		}
	}
</script>

<style>
	@import "@/static/icon-kefu/iconfont.css";
	.uni-media-list {
		padding-right: 70rpx;
	}
	.uni-media-list-body{height: auto;}
	.uni-media-list-text-top{
		line-height: 1.6em;
	}
	.uni-product-list-text-top{
		font-size: 35rpx;
		font-weight: 700;
	}
	.product-annualRate{
		padding-right: 50rpx;
		font-size: 35rpx;
		color: #FF3333;
		font-weight: 700;
	}
	.uni-media-list-text-bottom{
		font-size: 10rpx;
	}
	.search-button{
		height: auto;
		width: auto;
		font-size: 33upx;
	}
	.button-sp-area {
	    margin: 0 auto;
	    width: 60%;
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
