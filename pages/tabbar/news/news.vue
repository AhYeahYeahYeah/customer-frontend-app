<template>
	<!--
	 本页面模板教程：https://ext.dcloud.net.cn/plugin?id=2583
	 uni-list 文档：https://ext.dcloud.net.cn/plugin?id=24
	 uniCloud 文档：https://uniapp.dcloud.io/uniCloud/README
	 unicloud-db 组件文档：https://uniapp.dcloud.io/uniCloud/unicloud-db
	 DB Schema 规范：https://uniapp.dcloud.net.cn/uniCloud/schema
	 -->
	<view class="center">
		<view class="navBar">
			<view class="input-view">
				<uni-icons class="input-uni-icon" type="search" size="18" color="#999" />
				<input confirm-type="search" class="nav-bar-input" type="text" placeholder="输入搜索关键词"
					@confirm="confirm" />
			</view>
			<view style="margin-top: 2rpx; margin-left: 30rpx;align-items: center;">
				<image src="../../../static/service.png" style="width: 50rpx;height: 50rpx;" />
				<text class="text" style="color: white;">客服</text>
			</view>
			<view style="margin-top: 2rpx; margin-left: 30rpx;align-items: center;">
				<image src="../../../static/local.png" style="width: 50rpx;height: 50rpx;" />
				<text class="text" style="color: white;">{{location}}</text>
			</view>

		</view>
		<!-- 刷新页面后的顶部提示框 -->
		<!-- <view class="tips" :class="{ 'tips-ani': tipShow }">为您更新了10条最新新闻动态</view> -->
		<!-- 		<unicloud-db ref="udb" v-slot:default="{data, loading, error, options}" :options="formData" :collection="collection"
		 :field="field" @load="load"> -->
		<!-- 基于 uni-list 的页面布局 -->
		<uni-list>
			<!-- to 属性携带参数跳转详情页面，当前只为参考 -->
			<uni-list-item direction="column" :note="'时间：2022'">
				<!-- 通过header插槽定义列表顶部显示为图片 -->
				<template v-slot:header>
					<view class="uni-title">题目：Hello</view>
					<view class="uni-thumb uni-content list-picture">
						<!-- 当前判断长度只为简单判断类型，实际业务中，根据逻辑直接渲染即可 -->
						<image src="@/static/uni-center/defaultAvatarUrl.png" mode="aspectFill"></image>
					</view>
				</template>
			</uni-list-item>
		</uni-list>
		<!-- 通过 loadMore 组件实现上拉加载效果，如需自定义显示内容，可参考：https://ext.dcloud.net.cn/plugin?id=29 -->
		<!-- <uni-load-more v-if="loading || options.status === 'noMore' " :status="options.status" /> -->
		</unicloud-db>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				location: ''
				// // 数据表名
				// collection: 'opendb-news-articles',
				// // 查询字段，多个字段用 , 分割
				// field: '_id,mode,avatar,title,user_name,excerpt,last_modify_date',
				// formData: {
				// 	status: 'loading' // 加载状态
				// },
				// tipShow: false // 是否显示顶部提示框
			};
		},
		onLoad() {},
		onShow() {
			uni.getLocation({
				type: 'wgs84',
				geocode: true,
				success: (res) => {
					let point = new plus.maps.Point(res.longitude, res.latitude);
					plus.maps.Map.reverseGeocode(
						point, {},
						(event) => {
							let address = event.address; // 转换后的地理位置
							let point = event.coord; // 转换后的坐标信息
							let coordType = event.coordType; // 转换后的坐标系类型
							let reg = /.+?(省|市|自治区|自治州|县|区)/g;
							let addressList = address.match(reg).toString().split(",");
							console.log(addressList[1], '位置信息')
							this.location = addressList[1]
						}
					)
				}
			});
		},
		methods: {
			// load(data, ended) {
			// 	if (ended) {
			// 		this.formData.status = 'noMore'
			// 	}
			// }
			confirm() {
				
			},
		},
		/**
		 * 下拉刷新回调函数
		 */
		onPullDownRefresh() {
			// this.formData.status = 'more'
			// this.$refs.udb.loadData({
			// 	clear: true
			// }, () => {
			// 	this.tipShow = true
			// 	clearTimeout(this.timer)
			// 	this.timer = setTimeout(()=>{
			// 		this.tipShow  = false
			// 	},1000)
			// 	uni.stopPullDownRefresh()
			// })
		},
		/**
		 * 上拉加载回调函数
		 */
		onReachBottom() {
			// this.$refs.udb.loadMore()
		}
	};
</script>

<style lang="scss">
	@import '@/common/uni-ui.scss';

	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4;
		min-height: 100%;
		height: auto;
	}

	view {
		display: flex;
		box-sizing: border-box;
		flex-direction: column;
	}

	.tips {
		color: #67c23a;
		font-size: 14px;
		line-height: 40px;
		text-align: center;
		background-color: #f0f9eb;
		height: 0;
		opacity: 0;
		transform: translateY(-100%);
		transition: all 0.3s;
	}

	.tips-ani {
		transform: translateY(0);
		height: 40px;
		opacity: 1;
	}

	.content {
		width: 100%;
		display: flex;
	}

	.list-picture {
		width: 100%;
		height: 145px;
	}

	.thumb-image {
		width: 100%;
		height: 100%;
	}

	.ellipsis {
		display: flex;
		overflow: hidden;
	}

	.uni-ellipsis-1 {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.uni-ellipsis-2 {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.navBar {
		width: 750rpx;
		padding: 20rpx;
		padding-top: 40px;
		background: #e57373;
		// border-radius: 30rpx;
		flex-direction: row;
		// align-items: center;
	}

	.input-view {
		display: flex-start;
		flex-direction: row;
		flex: 1;
		background-color: #f8f8f8;
		height: 80rpx;
		border-radius: 15px;
		padding: 0 15px;
		flex-wrap: nowrap;
		margin: 7px 0;
		line-height: 80rpx;
		width: 500rpx;
		align-items: flex-start;

		margin-left: 10rpx;
	}

	.nav-bar-input {
		height: 80rpx;
		line-height: 80rpx;
		/* #ifdef APP-PLUS-NVUE */
		width: 370rpx;
		/* #endif */
		padding: 0 5px;
		font-size: 12px;
		background-color: #f8f8f8;
	}

	.input-uni-icon {
		line-height: 80rpx;
	}
</style>


<!-- <template>
	<view class="container">
		<uni-section overflow title="定期存款" type="line">
			<uni-card :is-shadow="false">
				<text class="uni-body">这是一个基础卡片示例，内容较少，此示例展示了一个没有任何属性不带阴影的卡片。</text>
			</uni-card>
			<uni-card :is-shadow="false">
				<text class="uni-body">这是一个基础卡片示例，内容较少，此示例展示了一个没有任何属性不带阴影的卡片。</text>
			</uni-card>
			<view class="button-sp-area">
			<navigator url="/pages/test/test" hover-class="navigator-hover">
				<button type="primary" plain="true" style="width: 250rpx; margin-bottom: 30rpx;">更多</button>
			</navigator>
			</view>
		</uni-section>
		<uni-section overflow title="活期存款" type="line">
			<uni-card :is-shadow="false">
				<text class="uni-body">这是一个基础卡片示例，内容较少，此示例展示了一个没有任何属性不带阴影的卡片。</text>
			</uni-card>
		</uni-section>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				cover: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/094a9dc0-50c0-11eb-b680-7980c8a877b8.jpg',
				avatar: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png',
				extraIcon: {
					color: '#4cd964',
					size: '22',
					type: 'gear-filled'
				}
			}
		},
		methods: {
			onClick(e) {
				console.log(e)
			},
			actionsClick(text) {
				uni.showToast({
					title: text,
					icon: 'none'
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		overflow: hidden;
	}

	.custom-cover {
		flex: 1;
		flex-direction: row;
		position: relative;
	}

	.cover-content {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 40px;
		background-color: rgba($color: #000000, $alpha: 0.4);
		display: flex;
		flex-direction: row;
		align-items: center;
		padding-left: 15px;
		font-size: 14px;
		color: #fff;
	}

	.card-actions {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		height: 45px;
		border-top: 1px #eee solid;
	}

	.card-actions-item {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.card-actions-item-text {
		font-size: 12px;
		color: #666;
		margin-left: 5px;
	}

	.cover-image {
		flex: 1;
		height: 150px;
	}

	.no-border {
		border-width: 0;
	}
</style>
 -->
