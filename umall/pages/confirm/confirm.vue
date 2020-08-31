<template>
	<view class="container">
		<!-- s收货地址 -->
		<view class="address">
			<view class="address_info">
				<label for="">收件人:胡图图</label>
				<label for="">18301628393</label>
			</view>
			<view class="address_res">
				收货地址：<label for="">翻斗大街翻斗花园二号楼1001室</label>
			</view>
		</view>

		<!-- 商品信息 -->
		<view class="carts">
			<view class="cartsInfo" v-for="(item,index) in orderList" :key="item.id">
				<!-- 70px -->
				<view class="carts_detail">
					<view class="carts_image">
						<image :src="item.img" mode=""></image>
					</view>
					<view class="carts_name">
						<view for="" style="font-size: 30rpx;">{{item.goodsname}}</view>
						<view for="" style="font-size: 26rpx; color: #C0C0C0;">规格:黑</view>
					</view>
					<view class="carts_price">
						<label for="">￥ {{item.price}}</label>
					</view>
				</view>
				<!-- 50px -->
				<view class="cart_num">
					<view class="">
						购买数量：
					</view>
					<view class="">
						<label for="" class="jian" @click="sub(index)">-</label>
						<label for="" class="num">{{item.num}}</label>
						<label for="" class="jia" @click="add(index)">+</label>
					</view>
				</view>
				<!-- 横线 -->
				<view class="xian"></view>
			</view>

			<!-- 50px -->
			<view class="kuaidi">
				<label for="">配送方式</label>
				<label for="">XX快递</label>
			</view>
		</view>

		<!-- 优惠券 -->
		<view class="yhquan">
			<label for="">优惠券</label>
			<label for="" style="margin-right: 40rpx;">无可用</label>
		</view>
		<!-- jifen积分 -->
		<view class="jifen">
			<view class="use">
				<label for="">使用积分</label>
			</view>
			<view class="input" style="margin-right: 40rpx;">
				<input type="text" value="" placeholder="输入积分" />
				<label for="" class="input_use">使用</label>
				<label for="" class="input_keyi">可使用50积分</label>
			</view>
		</view>

		<!-- 具体详细 -->
		<view class="resDetail">
			<view class="">
				<label for="">商品金额</label>
				<label for="" style="margin-right:40rpx;color:red">￥{{allPrice}}</label>
			</view>
			<view class="">
				<label for="">运费</label>
				<label for="" style="margin-right:40rpx;color:red">+￥0.00</label>
			</view>
			<view class="">
				<label for="">优惠券</label>
				<label for="" style="margin-right:40rpx;color:red">-￥0.00</label>
			</view>
			<view class="">
				<label for="">会员优惠</label>
				<label for="" style="margin-right:40rpx;color:red">-￥0.00</label>
			</view>
			<view class="">
				<label for="">积分抵扣</label>
				<label for="" style="margin-right:40rpx;color:red">-￥0.00</label>
			</view>
		</view>
		<!-- 实付金额 -->
		<view class="sfje">
			实付金额：<label for="" style="color:red">￥{{ allPrice }}</label>
		</view>

		<!-- 确认订单按钮 -->
		<view class="btn">
			<!-- 点击提交订单按钮，发起支付请求 -->
			<button type="primary" @click="pay">提交订单</button>
		</view>
	</view>
</template>

<script>
	import {
		orderadd
	} from "../../utils/request.js"
	export default {
		data() {
			return {
				allPrice: 0,
				allNum: 0,
				orderList: []
			}
		},
		methods: {
			//减少
			sub(index) {
				if (this.orderList[index].num <= 1) {
					uni.showToast({
						title: "数量不能再少了！！！",
						icon: "none"
					})
					return
				}
				this.orderList[index].num--
				this.allNum -= 1
				this.allPrice -= this.orderList[index].price * this.orderList[index].num
			},
			//增加
			add(index) {
				this.orderList[index].num++
				this.allNum += 1
				this.allPrice += this.orderList[index].price * this.orderList[index].num
			},
			async pay() {
				let userInfo = uni.getStorageSync("userInfo")
				let uid = userInfo.uid
				//请求头
				let authorization = userInfo.token
				//用户名
				let username = "胡图图"
				//用户手机号
				let userphone = userInfo.phone
				//用户地址
				let address = "翻斗大街翻斗花园二号楼1001室"
				//总金额
				let countmoney = this.allPrice
				//总数量
				let countnumber = this.allNum
				//添加时间
				let addtime = new Date().getTime()
				let idArr = []
				let goodsIdArr = []
				this.orderList.forEach(item => {
					idArr.push(item.id)
					goodsIdArr.push(item.goodsid)
				})
				//商品id
				let goodsid = goodsIdArr.join(",")
				//购物车id
				let idstr = idArr.join(",")
				let params = {
					uid,
					username,
					userphone,
					address,
					countmoney,
					countnumber,
					addtime
				}
				// console.log(params)
				//添加订单
				let res = await orderadd({
					params,
					idstr
				}, {
					authorization
				})
				// console.log(res)
				//跳转订单页面
				uni.reLaunch({
					url: "/pages/order/order"
				})

			}
		},
		mounted() {
			this.orderList = uni.getStorageSync("orderList")
			// console.log(this.orderList)
			if (this.orderList) {
				this.orderList.forEach(item => {
					item.img = item.img
					this.allPrice += item.price * item.num
					this.allNum += item.num
				})
			}
		}
	}
</script>
<style>
	@import url("../../common/css/confirm.css");
</style>
