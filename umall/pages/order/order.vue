]<template>
	<view>
		<uni-search-bar radius="100" bgColor="#ffff"></uni-search-bar>
		<view class="list" v-if="orderList.length>0">
			<view class="row" v-for="item in orderList" :key="item.id">
				<view class="products" >
					<view class="imagebox" v-for="(i,index) in item.child" :key="index">
						<image :src="i.img" mode="widthFix"></image>
						<text>{{i.goodsname}}</text>
					</view>
				</view>
				<view class="info">
					<text space="nbsp">总计{{item.countnumber}}商品 </text>
					<text>应付金额 ￥{{item.countmoney}}</text>
				</view>
			</view>
		</view>
		<view class="tishi" v-else>
			没有数据亲！
		</view>
	</view>
</template>

<script>
	import {
		getorders,
		url
	} from "../../utils/request.js"
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	export default {
		components: {
			uniSearchBar
		},
		data() {
			return {
				orderList:[]
			}
		},
		methods: {

		},
		async onLoad() {
			let userInfo = uni.getStorageSync("userInfo")
			let uid = userInfo.uid
			//请求头
			let authorization = userInfo.token
			//请求订单信息
			let res = await getorders({
				uid
			}, {
				authorization
			})
			this.orderList = res.data.list
			//对图片进行处理
			if(this.orderList){
				this.orderList.forEach(item=>{
					item.child.forEach(i=>{
						i.img = url + i.img
					})
				})
			}
			// console.log(this.orderList)
		}
	}
</script>
<style>
	.row {
		margin: 10rpx 20rpx;
		/* height: 240rpx; */
		border: 1rpx solid #AAAAAA;
		border-radius: 30rpx;
	}

	.imagebox {
		float: left;
		margin: 10rpx;
	}

	.products {
		overflow: hidden;
	}

	image {
		width: 160rpx;
		margin-left: 10rpx;
	}

	.info {
		/* position: absolute;
		top: 180rpx;
		right: 50rpx; */
		display: flex;
		justify-content: space-between;
		font-size: 25rpx;
		/* width: 340rpx; */
		padding: 20rpx;
		text-align: right;
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
