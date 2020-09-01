<template>
	<view class="container">
		<!-- 详情图片 -->
		<view class="detailImage">
			<image :src="detail.img">
		</view>
		<!-- 详情基本信息 -->
		<view class="detailInfo">
			<view class="detailInfoName">
				<label class="name">{{detail.goodsname}}</label>
			</view>
			<view class="detailInfoPrice">
				<label style="color: red;">￥ {{detail.price}}</label>
				<label style="font-size: 24rpx;color: #ccc;">(此价格不与套装优惠同时享受)</label>
			</view>
		</view>

		<!-- 基本信息改变 -->
		<view class="changeInfo">
			<view class="youhui">
				<view>促销：<label class="manjian">满减</label><label class="dazhe">满2件9折；3件8折</label></view>
			</view>
			<!-- 数量加减 -->
			<view class="changeNum">
				<view class="num">购买数量</view>
				<view class="action">
					<label class="jian" @click="sub">-</label>
					<label class="zhi">{{num}}</label>
					<label class="jia" @click="add">+</label>
				</view>
			</view>
			<!-- 商品属性 -->
			<view class="changeState">
				<view class="productStat">
					<label for="">商品属性</label>
				</view>
				<view class="productGuige">
					<label>{{detail.specsname}}</label>
					<view class="threed3i1" v-for="(item,index) in detail.specsattr" :key="index">{{item}}</view>
				</view>
			</view>
		</view>
		<!-- 商品详情 -->
		<view class="productDetail">
			<view class="productDetailTitle">商品详情</view>
			<!-- 需要处理图片自适应问题 -->
			<!-- <image src="/static/detail/2.jpg" mode="aspectFill" /> -->
			<rich-text :nodes="detail.description"></rich-text>

		</view>

		<view class="productEval">
			<view class="eval">商品评价</view>
			<view>
				<label class="evalUsername">小李白</label>
				<label class="evalUsertitle">效果很好，物流到位，下次继续来</label>
				<view class="evalImage">
					<image src="../../static/detail/pingjia1.jpg" />
					<image src="../../static/detail/pingjia2.jpg" />
					<image src="../../static/detail/pingjia3.jpg" />

				</view>
				<label class="evalTime">2020-01-13</label>
			</view>
		</view>
		<!-- 底部按钮 -->
		<view class="foot">
			<button class="footbtn1" @click="addCart">加入购物车</button>
			<button class="footbtn2">立即购买</button>
		</view>
	</view>
</template>
<script>
	import {
		requestGoodsInfo,
		url,
		cartadd,
		checkToken
	} from "../../utils/request.js"
	export default {
		data() {
			return {
				detail: {},
				num: 1,
				isLogin: false
			}
		},
		methods: {
			//减少数量
			sub() {
				if (this.num <= 1) {
					return
				} else {
					this.num--
				}
			},
			//增加数量
			add() {
				this.num++
			},
			//加入购物车
			async addCart() {
				//判断是否登录
				let userInfo = uni.getStorageSync("userInfo")
				this.userInfo = userInfo
				// console.log(this.userInfo)
				//已登陆
				if (this.userInfo.token) {
					this.isLogin = true
					//请求头
					let authorization = userInfo.token
					let result = await checkToken({authorization})
					//判断token是否过期
					if(result.data!==""){
						this.isLogin = false
						uni.showToast({
							title: "请先登录",
							icon: "none"
						})
						return
					}
					//用户id
					let uid = userInfo.uid
					//商品数量
					let num = this.num
					//商品id
					let goodsid = this.detail.id
					let res = await cartadd({
						uid,
						goodsid,
						num
					}, {
						authorization
					})
					// console.log(res)
					if (res.data.code == 200) {
						uni.showToast({
							title: res.data.msg,
							icon: "none"
						})
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: "none"
						})
					}
				//未登录
				} else {
					this.isLogin = false
					uni.showToast({
						title: "请先登录",
						icon: "none"
					})
					return
				}

			}
		},
		async onLoad(e) {
			// 获取传递过来的id
			let id = e.id
			//请求商品详情数据
			let res = await requestGoodsInfo({
				id
			})
			this.detail = res.data.list[0]
			//处理商品详情的图片和属性
			this.detail.img = url + this.detail.img
			this.detail.specsattr = this.detail.specsattr.split(",")
			// console.log(this.detail)
		}
	}
</script>
<style>
	@import url("../../common/css/details.css");

	.name {
		width: 650rpx;
		height: 140rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
	}
</style>
