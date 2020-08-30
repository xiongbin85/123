<template>
	<view class="form">
		<form>
			<view class="tel">
				<label>手机号：</label>
				<input type="text" v-model="user.phone" placeholder="请输入手机号" value="" />
			</view>
			<view class="nickname">
				<label>昵称：</label>
				<input type="text" v-model="user.nickname" placeholder="请输入昵称" value="" />
			</view>
			<view class="pass">
				<label>密码：</label>
				<input type="password" v-model="user.password" placeholder="请输入密码" value="" />
			</view>
			<button type="primary" @click="submit">注册</button>
		</form>
	</view>
</template>

<script>
	import {register} from "../../utils/request.js"
	export default {
		data() {
			return {
				user: {
					phone: "",
					nickname: "",
					password: ""
				}
			}
		},
		methods: {
			async submit() {
				let {phone,nickname,password} = this.user
				//判断输入的值是否为空
				if(phone==""||nickname==""||password==""){
					uni.showToast({
						title:"有空值请重新输入",
						icon:"none"
					})
					return
				}
				let res = await register({phone,nickname,password})
				// console.log(res)
				if(res.data.code==200){
					uni.showToast({
						title:res.data.msg,
						icon:"none"
					})
					uni.navigateTo({
						url:"../login/login"
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

	.tel,
	.nickname,
	.password {
		height: 150rpx;
	}

	button {
		margin-top: 40rpx;
	}
</style>
