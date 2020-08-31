<template>
	<view class="container">
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
				<view class="list_text">全部订单</view>
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
</template>

<script>
	import {
		checkToken
	} from '../../utils/request.js'
	export default {
		data() {
			return {
				userInfo:{}
			}
		},
		methods: {
			toLogin() {
				uni.navigateTo({
					url: "../send/send"
				})
			}
		},
		async mounted() {
			let userInfo = uni.getStorageSync("userInfo")
			this.userInfo = userInfo
			//请求头
			let authorization = userInfo.token
			let res = await checkToken({authorization})
			console.log(res)
		}
	};
</script>
<style>
	@import url('../../common/css/mine.css');
</style>
