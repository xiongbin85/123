<template>
	<view class="box">
		<view class="row">
			<text>手机号</text>
			<input type="text" v-model="phone" maxlength="12" />
		</view>
		<view class="row">
			<view class="send">
				<text>验证码</text>
				<text @click="getCode" v-if="getCode!=''">获取验证码</text>
				<text v-else>{{time}}</text>
			</view>
			<input type="text" v-model="code" placeholder="- - - -" maxlength="4" />
		</view>
		<view class="row">
			<text style="font-size: 23rpx;">
				收不到验证码？试试
				<text style="color:#00BB00;font-size: 23rpx;"> 语音验证</text></text>
			<!--   -->
			<button type="primary" style="width: 90%;border-radius: 80rpx;margin-top: 50rpx;" @click="submit">登录</button>
		</view>
		<view class="row">
			<text style="color: #006699;text-align: center;">通过微信授权登录</text>
		</view>
	</view>
</template>

<script>
	import {
		requestSms,
		wxlogin
	} from "../../utils/request.js"
	export default {
		data() {
			return {
				phone: "",
				code: "",
				getcode: "",
				time: 60
			}
		},
		methods: {
			async getCode() {
				let phone = this.phone
				//获取手机验证码
				let res = await requestSms({
					phone
				})
				this.getcode = res.data.list.code
				// console.log(this.getcode)
				// let t = setInterval(() => {
				// 	this.time--
				// 	if (this.time == 0) {
				// 		clearInterval(t)
				// 	}
				// }, 1000)
			},
			async submit() {
				let code = this.code
				let phone = this.phone
				if (code == this.getcode) {
					let res = await wxlogin({
						phone
					})
					// console.log(res)
					if (res.data.code == 200) {
						uni.setStorageSync("userInfo", res.data.list)
						uni.switchTab({
							url: "../index/index"
						})
					}else{
						uni.showToast({
							title:res.data.msg,
							icon:"none"
						})
					}

				}
			}
		}
	}
</script>

<style scoped>
	/* 导入外部的样式文件 */
	/* @import url("../../common/css/index.css"); */
	.box {
		position: relative;
	}

	.row {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin: 40rpx;
	}

	.send {
		display: flex;
		justify-content: space-between;
	}

	.send text:nth-of-type(2) {
		color: #00BB00;
	}

	text {
		font-size: 27rpx;
		margin-bottom: 10rpx;
	}

	input {
		border-bottom: 1rpx solid gray;
		height: 65rpx;
	}
</style>
