<template>
	<view>
		<uni-search-bar :radius="100" bgColor="#ffffff" class="input_" @confirm="search" v-model="value"></uni-search-bar>
		<view class="list" v-if="goods.length>0">
			<view class="row" v-for="item in goods" :key="item.id">
				<image :src="item.img" mode="aspectFit"></image>
				<view class="info">
					<text>{{item.goodsname}}</text>
					<text>原价￥{{item.market_price}}</text>
					<text>现价￥{{item.price}}</text>
					<text>3565评论</text>
				</view>
			</view>

		</view>
		<view class="tishi" v-else>
			没有数据亲！
		</view>
	</view>
</template>

<script>
	import uniSearchBar from '../../components/uni-search-bar/uni-search-bar.vue'
	import {
		requestSearch,
		url
	} from "../../utils/request.js"
	export default {
		components: {
			uniSearchBar
		},
		data() {
			return {
				goods: [],
				value: ""
			}
		},
		onLoad(e) {
			let keywords = e.keywords
			this.getGoods(keywords)
		},
		methods: {
			async getGoods(keywords) {
				let res = await requestSearch({
					keywords
				})
				this.goods = res.data.list
				if (this.goods) {
					this.goods.forEach(item => {
						item.img = url + item.img
					})
				} else {
					this.goods = []
				}
			},
			//搜索
			search(e) {
				if (e.value == "") {
					uni.showToast({
						title: "请不要输入空值",
						icon: "none"
					})
					return
				} else {
					this.getGoods(e.value)
				}
			}
		}
	}
</script>

<style>
	.row {
		position: relative;
		margin: 10rpx 20rpx;
		height: 190rpx;
		border-bottom: 1rpx solid #AAAAAA;
	}

	image {
		position: absolute;
		top: 0;
		left: 10rpx;
		width: 150rpx;
		height: 150rpx;
	}

	.info {
		height: 85%;
		width: 100%;
		position: absolute;
		top: 0;
		left: 200rpx;
		display: flex;
		justify-content: space-around;
		flex-direction: column;
		font-size: 25rpx;
	}

	.info text:nth-of-type(2) {
		color: red;
	}

	.info text:nth-of-type(3) {
		font-size: 20rpx;
		color: #AAAAAA;
	}

	.tishi {
		line-height: 200rpx;
		text-align: center;
		font-size: 40rpx;
		color: #006699;
	}
</style>
