<template>
	<view>
		<view class="uni-form-item uni-column">
			<view class="uni-input-wrapper">
				<uni-icons type="search" size="28"></uni-icons>
				<input class="uni-input" confirm-type="search" placeholder="请输入" @confirm="search"
					@input="searchinputfunction" />
				<button class="search-button" type="primary" v-on:click="search()">搜索</button>
				<uni-icons custom-prefix="kefuicon" type="icon-kefu" size="30" v-on:click="openkf()"></uni-icons>
			</view>
		</view>
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left"
					style="{display:flex;padding-left: 50rpx;color: #929292;font-size: 33rpx;}">
					产品类型
				</view>
				<view class="uni-list-cell-db" style="{display:flex;height: 70rpx;padding-left: 120rpx;}">
					<picker @change="bindPickerChange" :value="index" :range="types">
						<view class="uni-input">{{types[index]}}</view>
					</picker>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="uni-list">
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in products"
					:key="index" v-on:click="productinfo(item.pid)">
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
	import {
		EntityApi
	} from "../../../api/restful.js";
	export default {
		data() {
			return {
				products: [],
				searchinput: "",
				types: ['为您推荐', '通知存款', '定期存款', '活期存款', '大额存单'],
				type: '',
				index: 0
			}
		},
		onLoad() {
			uni.showLoading({
				title: "加载中..."
			})
			if (this.searchinput == "" || this.type == "" || this.type == '为您推荐') {
				new EntityApi()
					.getProducts().then((res) => {
						this.products = res.data;
						uni.hideLoading();
					})
			}
		},
		methods: {
			bindPickerChange: function(e) {
				this.index = e.detail.value
				this.type=this.types[this.index]
				uni.showLoading({
					title: "加载中..."
				})
				if (this.type == '为您推荐') {
					new EntityApi()
						.getProducts().then((res) => {
							this.products = res.data;
							uni.hideLoading();
						})
				} else {
					new EntityApi()
						.getProducts().then((res) => {
							const arr = [];
							for (var i = 0; i < res.data.length; i++) {
								if (this.fuzzyMatch(res.data[i].productName, this.type)) {
									arr.splice(0, 0, res.data[i]);
								}
							}
							this.products = arr;
						})
					uni.hideLoading();
				}
			},
			searchinputfunction: function(event) {
				this.searchinput = event.detail.value
			},
			productinfo(e) {
				uni.navigateTo({
					url: './productinfo/productinfo?pid=' + e
				})
			},
			openkf() {
				uni.navigateTo({
					url: '../customer-services/customer-services'
				})
			},
			search: function(event) {
				uni.showLoading({
					title: "加载中..."
				})
				if (this.searchinput == "") {
					new EntityApi()
						.getProducts().then((res) => {
							this.products = res.data;
							uni.hideLoading();
						})
				} else {
					new EntityApi()
						.getProducts().then((res) => {
							const arr = [];
							for (var i = 0; i < res.data.length; i++) {
								if (this.fuzzyMatch(res.data[i].productName, this.searchinput)) {
									arr.splice(0, 0, res.data[i]);
								}
							}
							this.products = arr;
						})
					uni.hideLoading();
				}

			},
			fuzzyMatch(str, key) {
				let index = -1,
					flag = false;
				for (var i = 0, arr = key.split(""); i < arr.length; i++) {
					//有一个关键字都没匹配到，则没有匹配到数据
					if (str.indexOf(arr[i]) < 0) {
						break;
					} else {
						let match = str.matchAll(arr[i]);
						let next = match.next();
						while (!next.done) {
							if (next.value.index > index) {
								index = next.value.index;
								if (i === arr.length - 1) {
									flag = true
								}
								break;
							}
							next = match.next();
						}

					}
				}
				return flag
			}

		}
	}
</script>

<style>
	@import "@/static/icon-kefu/iconfont.css";

	.uni-media-list {
		padding-right: 70rpx;
	}

	.uni-media-list-body {
		height: auto;
	}

	.uni-media-list-text-top {
		line-height: 1.6em;
	}

	.uni-product-list-text-top {
		font-size: 35rpx;
		font-weight: 700;
	}

	.product-annualRate {
		padding-right: 50rpx;
		font-size: 35rpx;
		color: #FF3333;
		font-weight: 700;
	}

	.uni-media-list-text-bottom {
		font-size: 20rpx;
	}

	.search-button {
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
