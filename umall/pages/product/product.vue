<template>
	<view>
		<view class="search">
			<icon type="search" color="white" size="10"></icon>
			<input type="text" value="" placeholder="搜索商品" placeholder-class="placeholder" v-model="value" @keydown.enter="enter" @confirm="enter"  />
		</view>
		<!-- 商品列表 -->
		<view class="goodsList" v-if="goodsList.length>0">
			<view class="item" v-for="item in goodsList" :key="item.id" @click="toDetail(item.id)">
				<view class="left">
					<image :src="item.img" mode="aspectFill"></image>
				</view>
				<view class="right">
					<view class="goodsname">
						{{item.goodsname}}
					</view>
					<view class="price">
						￥{{item.price}}.00
					</view>
					<view class="con">
						3625条评论
					</view>
				</view>
			</view>
		</view>
		<view class="none" v-else>
			暂无数据
		</view>
	</view>
</template>

<script>
	import {
		requestCateGoods,
		url
	} from "../../utils/request.js"
	export default {
		data() {
			return {
				goodsList: [],
				value:""
			}
		},
		methods: {
			//前往商品详情页
			toDetail(id) {
				uni.navigateTo({
					url: "/pages/details/details?id=" + id
				})
			},
			//搜索
			enter() {
				if (this.value == "") {
					uni.showToast({
						title: "请不要输入空值",
						icon: "none"
					})
					return
				}
				uni.navigateTo({
					url: "/pages/search/search?keywords=" + this.value
				})
				this.value = ""
			}
		},
		async onLoad(e) {
			let fid = e.fid
			//请求一级分类的商品列表
			let res = await requestCateGoods({
				fid
			})
			this.goodsList = res.data.list
			//判断是否有数据，没有就赋值为[]
			if (this.goodsList) {
				this.goodsList.forEach(item => {
					item.img = url + item.img
				})
			} else {
				this.goodsList = []
			}
			//console.log(this.goodsList)
		}
	}
</script>

<style scoped>
	.search {
		margin: 50rpx;
		height: 80rpx;
		background-color: #f26b11;
		border-radius: 80rpx;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	icon {
		margin: 0 10rpx 0 250rpx;
	}

	.placeholder {
		color: white;
		font-size: 25rpx;
	}

	.item {
		display: flex;
		border-bottom: 2rpx solid #ccc;
		padding: 10rpx;
	}

	.left image {
		width: 300rpx;
		height: 300rpx;
	}

	.right {
		margin-left: 40rpx;
		height: 150rpx;
		display: flex;
		flex-direction: column;
	}

	.goodsname {
		margin-top: 20rpx;
	}

	.price {
		margin-top: 100rpx;
		color: red;
	}

	.con {
		margin-top: 20rpx;
		color: #ccc;
	}

	.none {
		text-align: center;
	}
</style>
