<template>
	<view class="form">
		<form>
			<view class="username">
				<label>手机号：</label>
				<input type="text" placeholder="请输入手机号" v-model="phone" value="" />
			</view>
			<view class="password">
				<label>密码：</label>
				<input type="password" placeholder="请输入密码" v-model="password" value="" />
			</view>
			<view class="register">
				<text @click="register">注册</text>
			</view>
			<button type="primary" @click="login">登录</button>
		</form>
	</view>
</template>

<script>
	import {
		login
	} from "../../utils/request.js"
	export default {
		data() {
			return {
				phone: "",
				password: ""
			}
		},
		methods: {
			register() {
				uni.navigateTo({
					url: "../register/register"
				})
			},
			async login() {
				let phone = this.phone
				let password = this.password
				//判断输入的值是否为空
				if (phone == "" || password == "") {
					uni.showToast({
						title: "有空值请重新输入",
						icon: "none"
					})
					return
				}
				let res = await login({
					phone,
					password
				})
				// console.log(res)
				if (res.data.code == 200) {
					uni.showToast({
						title: res.data.msg,
						icon: "none"
					})
					//把用户信息存入本地存储中
					uni.setStorageSync("userInfo", res.data.list)
					uni.switchTab({
						url: "../index/index"
					})
				} else {
					uni.showToast({
						title: res.data.msg,
						icon: "none"
					})
				}

			}
		}
	}
</script>

<style scoped>
	.form {
		padding: 20rpx;
	}

	input {
		height: 70rpx;
		border: 1rpx solid #ccc;
		padding-left: 20rpx;
	}

	.username,
	.password {
		height: 150rpx;
	}

	.register {
		height: 100rpx;
	}

	text {
		float: right;
	}
</style>
