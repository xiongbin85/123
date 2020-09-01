<template>
	<view >
		<view class="container" v-if="isLogin">
			<!-- 顶部头像部分 -->
			<view class="mineTop">
				<view class="mineTop_left" @click="toLogin">
					<view class="mineTop_left_image">
						<image src="../../static/mine/timg.jpg" mode=""></image>
					</view>
					<view class="mineTop_left_info">
						<label for="" style="color: #fff;">{{userInfo.phone}}</label>
						<label for="">V1</label>
					</view>
				</view>
				<view class="mineTop_right">
					<view class="mineTop_right_info"><label for="">每日签到</label></view>
				</view>
			</view>
		
			<!-- 订单状态 -->
			<view class="order_state">
				<view class="order_state_list">
					<image src="/static/mine/quanbudingdan.png" mode=""></image>
					<view class="list_text" @click="toOrders">全部订单</view>
				</view>
				<view class="order_state_list">
					<image src="/static/mine/daifukuan.png" mode=""></image>
					<view class="list_text">待付款</view>
				</view>
				<view class="order_state_list">
					<image src="/static/mine/dizhiguanli.png" mode=""></image>
					<view class="list_text">待收货</view>
				</view>
		
			</view>
		
			<!-- 个人信息 -->
			<view class="person_msg">
		
		
		
				<view class="person_msg_list">
					<view class="person_msg_list_info">
						<image src="/static/mine/dizhiguanli.png" alt class="MsgItemLogo" />
						<label>地址管理</label>
					</view>
					<view class="MsgItemRight">
						<label class="remaB">200余额</label>
						<image src="../../static/mine/xiayiye.png" alt class="MsgItemDetail" />
					</view>
		
				</view>
		
		
		
				<view class="person_msg_list">
					<view class="person_msg_list_info">
						<image src="/static/mine/zu.png" alt class="MsgItemLogo" />
						<label>我的钱包</label>
					</view>
					<view class="MsgItemRight">
						<label class="remaB">200余额</label>
						<image src="../../static/mine/xiayiye.png" alt class="MsgItemDetail" />
					</view>
				</view>
				<view class="person_msg_list">
					<view class="person_msg_list_info">
						<image src="/static/mine/wodeyouhuiquan.png" alt class="MsgItemLogo" />
						<label>我的优惠券</label>
					</view>
					<view class="MsgItemRight">
						<label class="remaB">200余额</label>
						<image src="../../static/mine/xiayiye.png" alt class="MsgItemDetail" />
					</view>
				</view>
				<view class="person_msg_list">
					<view class="person_msg_list_info">
						<image src="/static/mine/wodeerweima.png" alt class="MsgItemLogo" />
						<label>我的二维码</label>
					</view>
					<view class="MsgItemRight">
						<label class="remaB">200余额</label>
						<image src="../../static/mine/xiayiye.png" alt class="MsgItemDetail" />
					</view>
				</view>
				<view class="person_msg_list">
					<view class="person_msg_list_info">
						<image src="/static/mine/xiaohuoban.png" alt class="MsgItemLogo" />
						<label>我的小伙伴</label>
					</view>
					<view class="MsgItemRight">
						<label class="remaB">200余额</label>
						<image src="../../static/mine/xiayiye.png" alt class="MsgItemDetail" />
					</view>
				</view>
		
			</view>
		</view>
		<view class="login" v-else @click="toLogin">
			前往登录
		</view>
	</view>
</template>

<script>
	import {
		checkToken
	} from '../../utils/request.js'
	export default {
		data() {
			return {
				userInfo:{},
				isLogin:false
			}
		},
		methods: {
			//前往订单页
			toOrders(){
				uni.navigateTo({
					url: "../order/order"
				})
			},
			//前往登录页
			toLogin() {
				uni.reLaunch({
					url: "../send/send"
				})
			},
			async test(){
				//判断是否登录
				let userInfo = uni.getStorageSync("userInfo")
				this.userInfo = userInfo
				// console.log(this.userInfo)
				//已登录
				if(this.userInfo.token){
					this.isLogin = true
					//请求头
					let authorization = userInfo.token
					//判断token是否过期
					let res = await checkToken({authorization})
					// console.log(res)
					if(res.data!==""){
						this.isLogin = false
						return
					}
				//未登录
				}else{
					this.isLogin = false
					return
				}
			}
		},
		async mounted() {
			this.test()
		},
		onShow() {
			this.test()
		}
	};
</script>
<style>
	@import url('../../common/css/mine.css');
	.login{
		text-align: center;
		margin-top: 200rpx;
		font-size: 60rpx;
	}
</style>
