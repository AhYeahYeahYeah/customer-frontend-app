<template>
	<view>
		<view class="uni-form-item uni-column">
				<input class="uni-input" name="input" placeholder="请输入" />
				<button type="default">搜索</button>
		</view>
		<button type="default">智能客服</button>
	<view class="content">
		<view class="uni-margin-wrap">
			<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
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
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in products" :key="index" v-on:click="productinfo(item.pid)">
				<view class="uni-product-list">
					<view class="uni-product-list-text-top">{{item.productName}}</view>
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
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				products:[]
			}
		},
		onLoad() {
			uni.showLoading({
				title:"加载中..."
			})
			new EntityApi()
			.getProducts().then((res)=>{
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
			},
			moreProducts(){
				uni.navigateTo({
					url:'./products'
				})
			}
		}
	}
</script>

<style>
	.uni-product-list-body{height: auto;}
	.uni-product-list-text-top{line-height: 1.6em;}
</style>
