<template>
	<view class="view_contain">
		<view class="view_iconText" v-show="success">
			<icon type="success" size="100" color="#39b54a" />
			<text class="text_title">购买成功</text>
			<text class="text_content">恭喜您购买成功！请点击返回首页。</text>
		</view>
		<view class="view_iconText" v-show="fail">
			<icon type="cancel" size="100" color="#ff0000" />
			<text class="text_title">购买失败</text>
			<text class="text_content">购买失败！请点击返回首页。</text>
		</view>
		<button class="button_gotohome" @tap="goto_Home">返回首页</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				success:true,
				fail:false
			}
		},
		onLoad: function(e) {
			uni.showLoading({
				title: "加载中..."
			})
			if(e.orderResult=="true"){
				this.success=true;
				this.fail=false;
				uni.hideLoading();
			}else{
				this.success=false;
				this.fail=true;
				uni.hideLoading();
			}
			console.log(this.success)
			
		},
		onBackPress() {
		    this.goto_Home();
		    return true;
		},
		methods: {
			goto_Home() {
				uni.switchTab({
					url: '../product/product'
				});
			}
		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
	}

	.view_contain {
		width: 100%;
		height: 100%;
		margin-top: 50upx;
	}

	.view_iconText {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 30%;
		align-items: center;
		justify-content: center;
	}
	.text_title{
		margin-top: 50upx;
		font-size: 40upx;
		font-weight: 600;
	}
	.button_gotohome{
		width: 50%;
		background: linear-gradient(to right, #74bba7, #28b53d);
		border-radius: 50upx;
		color: #ffffff;
		box-shadow: 0 0 30rpx rgba(0, 0, 0, 0.35);
		margin-top: 100upx;
	}
	.text_content{
		margin-top: 20upx;
		color: #557ead;
		font-size: 25upx;
	}
	.bottom{
		width: 100%;
		display: flex;
		flex-direction: column;
		position: fixed;
		bottom: 20upx;
		align-items: center;
		justify-content: center;
	}
	
</style>


