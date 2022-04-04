<template>
	<view>
		<view class="uni-form-item uni-column">
				<input class="uni-input" name="input" placeholder="请输入" />
				<button type="default">搜索</button>
		</view>
		<uni-section title="基本用法" type="line">
			<view class="example-body">
				<uni-combox :candidates="candidates" placeholder="请选择产品类型" v-model="city"></uni-combox>
			</view>
		</uni-section>
	<view class="content">
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
	.uni-product-list-body{height: auto;}
	.uni-product-list-text-top{line-height: 1.6em;}
</style>
