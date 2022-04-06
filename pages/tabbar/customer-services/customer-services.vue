<template>
	<view>
		<uni-card class="left-bubble" @click="onClick"
			style="display: inline-block;max-width: 70%;align-items: flex-end;border-radius: 30rpx;">
			<text class="uni-body">这是一个带头像和双标题的基础卡片，此示例展示了一个完整的卡片。</text>
		</uni-card>
		<uni-card class="right-bubble" @click="onClick"
			style="min-width: auto;display: inline-block;max-width: 70%; align-items: flex-end; border-radius: 30rpx;">
			<text class="uni-body" style="min-width: auto;position: relative;max-width: 70%;">这是片。</text>
		</uni-card>
		<view class="chat-foot">
			<uni-easyinput autoHeight type="text" style="align-items: flex-end; text-overflow: ellipsis; padding: 0rpx; height: 10%;" v-model="value" suffixIcon="mic-filled"
				placeholder="请输入内容" @iconClick="onClick"></uni-easyinput>

		</view>
		<button class="send-bt" type="primary" size="mini" @click="send">发送</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>
	.right-bubble {
		float: right;
	}

	.chat-foot {
		margin-left: 3%;
		background-color: #ffffff;
		width: 75%;
		position: fixed;
		bottom: 3%;
		border-radius: 4px;
		padding: 0rpx;
	}

	.send-bt {
		position: absolute;
		bottom: 3%;
		right: 2%;
	}
</style>
