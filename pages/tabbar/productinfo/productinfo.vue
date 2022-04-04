<template>
	<view>
		<text>{{this.product[0]}}</text>
		<button type="default" v-on:click="buy">购买</button>
	</view>
</template>

<script>
	import {EntityApi} from "../../../api/restful.js";
	export default {
		data() {
			return {
				product:[]
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

</style>
