<template>
	<view class="content">
		<view class="cul-wrapper">
			<view v-if="isOver" class="msg-over">没有更多消息了</view>
			<!-- 			<block v-for="(item,index) in hisMsgs" :key="item.id">
				<view :class="[item.isme?'msg-me':'msg-service']" :id="item.id">
					<view class="msg-text">
						<view class="msg-text-content">
							<text>{{item.msg}}</text>
						</view>
					</view>
				</view>
			</block> -->
			<scroll-view style="height:1250rpx;" scroll-y="true" v-bind:scroll-into-view="toView">
				<view class="cul-date">{{curDate | formatDate}}</view>
				<block>
					<view class="msg-service" id="msg">
						<view class="msg-text">
							<view class="msg-text-content">
								<view class="msg-introduce">请问选择需要什么帮助呢？点击发送： <view class="msg-classify-click"
										@click="sub('推荐产品')">推荐产品</view>
								</view>
								<!-- 								<view class="msg-classify">
									<view class="msg-classify-tit"><text
											class="msg-classify-name">分类1：</text>分类描述分类描述分类描述分类描述分类描述分类描述。</view>
									<view class="msg-classify-click" @click="consultClick(1)">[此类问题请点我]</view>
								</view>
								<view class="msg-introduce">您好，请先选择问题分类，我将为您解答。</view>
								<view class="msg-classify">
									<view class="msg-classify-tit"><text
											class="msg-classify-name">分类2：</text>分类描述分类描述分类描述分类描述分类描述分类描述。</view>
									<view class="msg-classify-click" @click="consultClick(2)">[此类问题请点我]</view>
								</view>
								<view class="msg-introduce">您好，请先选择问题分类，我将为您解答。</view>
								<view class="msg-classify">
									<view class="msg-classify-tit"><text
											class="msg-classify-name">分类3：</text>分类描述分类描述分类描述分类描述分类描述分类描述。</view>
									<view class="msg-classify-click" @click="consultClick(3)">[此类问题请点我]</view>
								</view>
								<view class="msg-classify">
									<view class="msg-classify-tit"><text
											class="msg-classify-name">分类3：</text>分类描述分类描述分类描述分类描述分类描述分类描述。</view>
									<view class="msg-classify-click" @click="consultClick(3)">[此类问题请点我]</view>
								</view>
								<view class="msg-classify">
									<view class="msg-classify-tit"><text
											class="msg-classify-name">分类3：</text>分类描述分类描述分类描述分类描述分类描述分类描述。</view>
									<view class="msg-classify-click" @click="consultClick(3)">[此类问题请点我]</view>
								</view> -->
							</view>
						</view>
					</view>
				</block>
				<!-- 				<block>
					<view class="msg-service" id="msg">
						<view class="msg-text">
							<view class="msg-text-content">
								<view class="msg-introduce">您好，请先选择问题分类，我将为您解答。</view>
								<view class="msg-classify">
									<view class="msg-classify-tit"><text
											class="msg-classify-name">分类1：</text>分类描述分类描述分类描述分类描述分类描述分类描述。</view>
									<view class="msg-classify-click" @click="consultClick(1)">[此类问题请点我]</view>
								</view>
								<view class="msg-introduce">您好，请先选择问题分类，我将为您解答。</view>
								<view class="msg-classify">
									<view class="msg-classify-tit"><text
											class="msg-classify-name">分类2：</text>分类描述分类描述分类描述分类描述分类描述分类描述。</view>
									<view class="msg-classify-click" @click="consultClick(2)">[此类问题请点我]</view>
								</view>
								<view class="msg-introduce">您好，请先选择问题分类，我将为您解答。</view>
								<view class="msg-classify">
									<view class="msg-classify-tit"><text
											class="msg-classify-name">分类3：</text>分类描述分类描述分类描述分类描述分类描述分类描述。</view>
									<view class="msg-classify-click" @click="consultClick(3)">[此类问题请点我]</view>
								</view>
								<view class="msg-classify">
									<view class="msg-classify-tit"><text
											class="msg-classify-name">分类3：</text>分类描述分类描述分类描述分类描述分类描述分类描述。</view>
									<view class="msg-classify-click" @click="consultClick(3)">[此类问题请点我]</view>
								</view>
								<view class="msg-classify">
									<view class="msg-classify-tit"><text
											class="msg-classify-name">分类3：</text>分类描述分类描述分类描述分类描述分类描述分类描述。</view>
									<view class="msg-classify-click" @click="consultClick(3)">[此类问题请点我]</view>
								</view>
							</view>
						</view>
					</view>
				</block> -->
				<block v-for="(item,index) in msgs" :key="index">
					<view :class="[item.isme?'msg-me':'msg-service']" :id="'msg-'+index">
						<view class="msg-text">
							<view class="msg-text-content">
								<div v-for="(item,index) in item.msg">
									<text v-if="!item[1]">{{item[0]}}</text>
									<view v-else class="msg-classify-click" @click="sub(item[0])">[{{item[0]}}]</view>
								</div>
							</view>
						</view>
					</view>
				</block>
			</scroll-view>
		</view>
		<view class="operation">
			<input confirm-type="send" @confirm="sub2" type="text" v-model="msgInput.msg1" :class="['msg-input1']" />
			<!-- <view :class="['msg-input2']" @tap="sub2" /> -->
			<view :class="['msg-input2']"
			 />
		</view>
	</view>
</template>

<script>
	import {
		RobotApi
	} from "../../../api/restful.js";
	export default {
		data() {
			return {
				index: -1,
				toView: 'msg',
				// scrollTop: 0,
				// indexRegion: '',
				listPage: 0,
				isOver: false,
				curDate: '1588061853944',
				sessionId: '',
				//控制按钮和文本框样式和功能的转换
				conversion: true,
				msgInput: {
					msg1: '',
					msg2: ''
				},
				//消息列表
				msgs: []
				// hisMsgs: []
			}
		},
		onLoad(e) {
			// this.indexRegion = uni.getStorageSync('indexReg');
			// console.log(this.indexRegion)
		},
		filters: {
			formatDate: function(value) {
				var date = new Date();
				//date.setTime(value);
				var month = date.getMonth() + 1;
				var hours = date.getHours();
				if (hours < 10)
					hours = "0" + hours;
				var minutes = date.getMinutes();
				if (minutes < 10)
					minutes = "0" + minutes;
				var time = date.getFullYear() + "-" + month + "-" + date.getDate() +
					" " + hours + ":" + minutes;
				return time;
			}

		},
		// onBackPress() {
		//      uni.setStorageSync('setStatusIndexFunc', 0);
		//      // this.active = 0;
		//      uni.navigateTo({
		//       url: '../index/index?region='+this.indexRegion
		//      });
		//      return true
		//     },  
		methods: {
			consultClick(e) {
				console.log(e.target.value());
			},
			sendMsg(val) {
				const data = {
					version: '3.0',
					service_id: 'S67137',
					session_id: this.sessionId,
					log_id: '4444421',
					request: {
						terminal_id: '837286',
						query: val
					}
				};
				let anotherMsg = {}
				// console.log(data)
				new RobotApi().sendMsg(data).then((res) => {
					console.log(res.data.result.responses[0].actions[0].say);
					if (res.data.result.responses[0].actions[0].type === 'failure') CallBackMsg([
						// [res.data.result.responses[0].actions[0].say, 0],
						anotherMsg = {
							isme: false,
							msg: [
								[res.data.result.responses[0].actions[0].say, 0]
							]
						}
					]);
					// else CallBackMsg(res.data.result.responses[0].qu_res.qu_res_chosen.intents[0].slots[0].slot_values[0].normalized_word);
					else if (res.data.result.responses[0].actions[0].type === 'guide') {
						// eslint-disable-next-line no-useless-concat
						const list = [
							[res.data.result.responses[0].actions[0].say, 0],
							['1个月', 1],
							['2个月', 1],
							['3个月', 1],
							['6个月', 1],
							['12个月', 1],
							['24个月', 1],
							['36个月', 1]
						];
						// CallBackMsg(list);
						anotherMsg = {
							isme: false,
							msg: list
						}
					} else anotherMsg = {
						isme: false,
						msg: [
							[res.data.result.responses[0].actions[0].say, 0]
						]
					}
					this.sessionId = res.data.result.session_id
					this.msgs.push(anotherMsg)
					console.log(this.msgs)
					setTimeout(() => {
						// console.log('x111')
						this.index = this.index + 1;
						this.toView = `msg-${this.index}`
						console.log(this.toView)
					}, 50);
				});
				// let anotherMsg = {
				// 	isme: false,
				// 	msg: 'a1'
				// }


			},
			sub2(val) {
				this.sub(this.msgInput.msg1)
			},
			sub(val) {
				// console.log('222')
				console.log(val)
				let _self = this;
				if (val) {
					//清空输入框中的文字
					this.msgInput.msg1 = ''
					this.msgInput.msg2 = ''
					let msg = {
						isme: true,
						msg: [
							[val, 0]
						]
					}
					this.msgs.push(msg)
					setTimeout(() => {
						// console.log('x111')
						this.index = this.index + 1;
						this.toView = `msg-${this.index}`
						console.log(this.toView)
					}, 50);
					// this.conversion = !this.conversion
					// this.jumpScroll()
					// setTimeout(() => {
					// 	// console.log('x111')

					// }, 50);
					this.sendMsg(val)
					// this.jumpScroll()
				}
			}
		},
		onPullDownRefresh() {
			let _this = this;
			console.log('refresh2');
			let msgArr = [{
					msg: '问题1',
					id: 'm1',
					mark: 'me',
					isme: true,
					time: '2020-10-1'
				},
				{
					msg: '回复1',
					id: 'l1',
					mark: 'service',
					isme: false,
					time: '2020-10-2'
				},
				{
					msg: '问题2',
					id: 'm2',
					mark: 'me',
					isme: true,
					time: '2020-10-1'
				},
				{
					msg: '回复2',
					id: 'l2',
					mark: 'service',
					isme: false,
					time: '2020-10-2'
				}
			]

			// this.hisMsgs.push(...msgArr)
			// console.log('this.hisMsgs1')
			// console.log(this.hisMsgs)
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 100);
		},
	}
</script>

<style>
	page {
		background-color: #EFEFEF;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex: 1;
		margin-bottom: 120rpx;
	}

	.msg-over {
		font-size: 24rpx;
		text-align: center;
		color: #999999;
	}

	.cul-wrapper {
		padding: 0 35rpx;
		box-sizing: border-box;
	}

	.cul-date {
		padding-top: 20rpx;
		color: #999999;
		font-size: 24rpx;
		text-align: center;
	}

	.msg-me,
	.msg-service {
		display: flex;
		align-items: flex-start;
		width: 680rpx;
		margin: 30rpx 0;
		box-sizing: border-box;
		overflow: hidden;
	}

	/* .bg{
			background-color: blue;
		} */
	.msg-me {
		justify-content: flex-end;
	}

	.msg-service {
		justify-content: flex-start;
	}

	.avatar {
		width: 70rpx;
		height: 70rpx;
		border-radius: 50%;
	}

	.msg-text {
		width: 560rpx;
	}

	.msg-me>.msg-text {
		display: flex;
		justify-content: flex-end;
	}

	.msg-text-content {
		line-height: 35rpx;
		display: inline-block;
		box-sizing: border-box;
		padding: 30rpx;
		font-size: 28rpx;
	}

	.msg-introduce {
		color: #333333;
		font-size: 26rpx;
		line-height: 36rpx;
	}

	.msg-classify-tit {
		color: #333333;
		font-size: 26rpx;
		line-height: 43rpx;
	}

	.msg-classify-name {
		font-size: 30rpx;
		font-weight: bold;
	}

	.msg-classify-click {
		color: #2B8FFF;
		font-size: 26rpx;
		line-height: 56rpx;
	}

	.msg-me>.msg-text>.msg-text-content {
		margin-left: 70rpx;
		background-color: #2B8FFF;
		color: #FFFFFF;
		font-size: 30rpx;
		border-top-right-radius: 44rpx;
		border-bottom-left-radius: 44rpx;
		border-top-left-radius: 44rpx;
		margin-right: 15rpx;
	}

	.msg-service>.msg-text>.msg-text-content {
		color: #333333;
		margin-left: 15rpx;
		background-color: #FFFFFF;
		/* border: 1rpx solid #d5e0e5; */
		border-bottom-left-radius: 44rpx;
		border-bottom-right-radius: 44rpx;
		border-top-right-radius: 44rpx;
		/* 		margin-right: 70rpx; */
		color: #333333;
	}

	.operation {
		display: flex;
		position: fixed;
		left: 0;
		bottom: 0;
		align-items: center;
		/* background-color: transparent; */
		background: #EFEFEF;
		padding: 10px 35rpx;
		border-top: 1rpx solid rgba(184, 184, 184, 0.1);
		width: 100vw;
	}

	.conversion {
		flex-direction: row-reverse;
		justify-content: flex-end;
	}

	.msg-input1 {
		background: #FFFFFF;
		height: 40px;
		width: 550rpx;
		border-radius: 10px;
		padding: 0 20rpx;
		border: 1rpx solid rgba(0, 0, 0, 0.1);
	}

	.msg-input2 {
		display: flex;
		align-items: center;
		width: 110rpx;
		height: 40px;
		// background-image: url('data:image/png;base64,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');
		background-image: url('data:image/png;base64,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');
		background-repeat: no-repeat;
		background-position: center center;
		background-size: 47rpx 42rpx;
		/*这个颜色是因为组件位置交换的时候，字体会有一瞬间继续留在框内，这里把内容变为透明即可*/
		color: rgba(0, 0, 0, 0);
	}
</style>





<!-- <template>
	<view>
		<view style="width: 100%;">
			<scroll-view :style="{height: height+'px'}" scroll-y>
				<uni-card class="left-bubble"
					style="display: inline-block;max-width: 70%;align-items: flex-end;border-radius: 30rpx;">
					<text class="uni-body">这是一个带头像和双标题的基础卡片，示例展示了一个完整的卡片。</text>
				</uni-card>
				<uni-card class="right-bubble"
					style="min-width: auto;display: inline-block;max-width: 70%; align-items: flex-end; border-radius: 30rpx;">
					<text class="uni-body" style="min-width: auto;position: relative;max-width: 70%;">这是片。</text>
				</uni-card>
			</scroll-view>
		</view>
		<view class="footer" ref="footer" id="footer">
			<view class="content-wrap">
				<textarea class="content" v-model="text" maxlength="-1" auto-height />
			</view>
			<view class="btn-wrap">
				<button class="btn" :disabled="disable" :class="{'disabled': disable}" @click="handleSend">发送</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: '',
				text: '',
				height: 0,
				pageHeight: 0,
				disable: true,
				footerHeight: 0,
				keyBoardHeight: 0,
			}
		},
		watch: {
			text(newVal) {
				if (newVal.trim() != '') {
					this.disable = false
				} else {
					this.disable = true
				}
			}
		},
		onReady() {
			uni.getSystemInfo({
				success: (res) => {
					this.pageHeight = res.windowHeight - res.statusBarHeight - 44
				}
			})
		},
		onLoad() {
			this.initListener()
		},
		onUnload() {
			this.destoryListener()
		},
		mounted() {
			this.$nextTick(() => {
				// #ifdef H5
				this.footerHeight = this.$refs.footer.$el.offsetHeight
				this.height = this.pageHeight - this.footerHeight
				// #endif
				// #ifdef APP-PLUS
				uni.createSelectorQuery().in(this).select("#footer").boundingClientRect((data) => {
					this.footerHeight = data.height
					this.height = this.pageHeight - this.footerHeight
				}).exec()
				// #endif
			})
		},
		methods: {
			initListener() {
				uni.onKeyboardHeightChange(res => {
					let keyBoardHeight = res.height
					if (this.keyBoardHeight == 0 && keyBoardHeight > 0) {
						this.keyBoardHeight = keyBoardHeight
					}
					if (keyBoardHeight > 0) {
						this.height = this.height - this.keyBoardHeight
					} else {
						this.height = this.height + this.keyBoardHeight
					}
				})
			},
			destoryListener() {
				uni.offKeyboardHeightChange((res) => {
					console.log("offKeyboardHeightChange...")
				})
			},
			handleLeftClick() {},
			handleSend() {}
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

	.footer {
		width: 100%;
		background-color: #E9EDF4;
		display: flex;
		position: fixed;
		bottom: 0;
	}

	.footer .content-wrap {
		width: 78%;
		margin-left: 2%;
	}

	.footer .content {
		width: 100%;
		box-sizing: border-box;
		margin: 14rpx 0;
		background-color: #FFFFFF;
		border-radius: 30rpx;
		padding: 16rpx;
		caret-color: #01B4FE;
	}

	.footer .btn-wrap {
		width: 18%;
		margin-right: 2%;
	}

	.footer .btn {
		width: 15%;
		height: 65rpx;
		font-size: 26rpx;
		margin-left: 2%;
		background-color: #01B4FE;
		color: #FFFFFF;
		position: fixed;
		bottom: 14rpx;
		border: 0;
		outline: none;
	}

	.footer .btn-wrap .disabled {
		background-color: #aae8f5;
	}
</style>
 -->
