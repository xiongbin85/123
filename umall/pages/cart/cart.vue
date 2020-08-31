<template>
	<view class="container">
		<view class="none" v-if="cartList.length==0">
			购物车空空如也
		</view>
		<view class="top" v-else>
			<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="0" v-for="(item,index) in cartList" :key="item.id">
				<view class="cartInfo" id="demo1">
					<!-- 购物车商品信息 -->
					<view class="cartInfochild">
						<!-- 选择框 -->
						<view class="cartInfo_switch common">
							<!-- 点击当前商品 -->
							<switch type="checkbox" :checked="item.checked" @change="selectOne(index)" />
						</view>
						<!-- 图片 -->
						<view class="cartInfo_image common">
							<image :src="item.img" mode=""></image>
						</view>

						<!-- 信息 -->
						<view class="cartInfo_info">
							<label for="" style="font-size: 26rpx;">{{item.goodsname}}</label>
							<label for="" style="font-size: 24rpx; color: #ccc;">规格：黑色</label>
							<label for="" style="color: red;">￥{{item.price}}</label>
						</view>
						<!-- 加减数量 -->
						<view class="cartInfo_num">
							<view class="cartInfo_num_child">
								<label for="" @click="sub(item.id,index)">-</label>
								<label for="">{{item.num}}</label>
								<label for="" @click="add(item.id,index)">+</label>
							</view>
						</view>
					</view>
				</view>
				<view class="cartDel" id="demo2"><label for="" @click="del(item.id)">删除</label></view>
			</scroll-view>
		</view>
		<!-- 底部 -->
		<view class="foot">
			<view class="footd1">
				<switch type="checkbox" :checked="allSelect" @change="selectAll" />
				<label>全选</label>
			</view>
			<view class="footd2">
				<view class="footd2sp1">
					总计：
					<label style="color: red;">{{allPrice}}</label>
				</view>
				<label class="footd2sp2">不含运费，已优惠￥0.00</label>
			</view>
			<!-- 跳到提交订单，结算页面 -->
			<view class="footd3">
				<!-- 被选中的商品的个数 -->
				<label @click="toConfirm">去结算({{allNum}}件)</label>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		cartlist,
		url,
		cartedit,
		cartdelete
	} from "../../utils/request.js"
	export default {
		data() {
			return {
				cartList: [],
				allSelect: false,
				allPrice: 0,
				allNum: 0
			}
		},
		methods: {
			//前往确认订单页面
			async toConfirm() {
				// console.log(this.cartList)
				//有一个被选中就跳转确认订单页
				let choose = this.cartList.some(item => item.checked)
				if (!choose) {
					uni.showToast({
						title: "请选择商品",
						icon: "none"
					})
					return
				}
				//把选中的商品存入本地缓存中
				let arr = []
				this.cartList.forEach(item => {
					if (item.checked) {
						arr.push(item)
					}
				})
				uni.setStorageSync("orderList", arr)
				uni.navigateTo({
					url: "../confirm/confirm"
				})
			},
			//删除
			del(id) {
				//从本地缓存中获取个人信息
				let userInfo = uni.getStorageSync("userInfo")
				//请求头
				let authorization = userInfo.token
				uni.showModal({
					content: '是否确认删除！',
					success: (res) => {
						if (res.confirm) {
							cartdelete({
								id
							}, {
								authorization
							})
							this.getCartList()
							uni.showToast({
								title: "删除成功",
								icon: "none"
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			//减少数量
			sub(id, index) {
				//从本地缓存中获取个人信息
				let userInfo = uni.getStorageSync("userInfo")
				//请求头
				let authorization = userInfo.token
				let type = 1
				let goods = this.cartList[index]
				if (goods.num <= 1) {
					uni.showToast({
						title: "数量不能再少了！！！",
						icon: "none"
					})
				} else {
					//页面选中的商品数量减少
					this.cartList[index].num--
					//数据库商品数量减少
					cartedit({
						id,
						type
					}, {
						authorization
					})
					//更改总价和总数
					if (goods.checked) {
						this.allPrice -= goods.price
						this.allNum -= 1
					}
				}


			},
			//增加数量
			add(id, index) {
				//从本地缓存中获取个人信息
				let userInfo = uni.getStorageSync("userInfo")
				//请求头
				let authorization = userInfo.token
				let type = 2
				//页面商品数量增加
				this.cartList[index].num++
				//数据库商品数量增加
				cartedit({
					id,
					type
				}, {
					authorization
				})
				let goods = this.cartList[index]
				//更改总价和总数
				if (goods.checked) {
					this.allPrice += goods.price
					this.allNum += 1
				}
			},
			//全选，取消全选
			selectAll(e) {
				// console.log(e)
				this.allSelect = e.detail.value
				if (this.cartList.length > 0) {
					this.cartList.forEach(item => {
						item.checked = this.allSelect
						//选中的时候总价增加，总数量增加，取消选中的时候总价减少取消的总价，总数量减少
						if (this.allSelect) {
							this.allPrice += item.price * item.num
							this.allNum += item.num
						} else {
							this.allPrice -= item.price * item.num
							this.allNum -= item.num
						}
					})
				}
			},
			//单选，取消单选
			selectOne(index, e) {
				// console.log(index,e)
				let res = this.cartList[index]
				if (this.cartList.length > 0) {
					res.checked = !res.checked
					this.allSelect = this.cartList.every(item => {
						return item.checked
					})
					//选中的时候总价增加，总数量增加，取消选中的时候总价减少取消的总价，总数量减少
					if (res.checked) {
						this.allPrice += res.price * res.num
						this.allNum += res.num
					} else {
						this.allPrice -= res.price * res.num
						this.allNum -= res.num
					}
				}
			},
			async getCartList() {
				//从本地缓存中获取个人信息
				let userInfo = uni.getStorageSync("userInfo")
				//用户id
				let uid = userInfo.uid
				//请求头
				let authorization = userInfo.token
				let res = await cartlist({
					uid
				}, {
					authorization
				})
				// console.log(res)
				this.cartList = res.data.list
				if (this.cartList) {
					this.cartList.forEach(item => {
						item.img = url + item.img
						item.checked = false
					})
				} else {
					this.cartList = []
				}
			}
		},
		mounted() {
			this.getCartList()
		},
		onShow() {
			this.getCartList()
		}
	};
</script>

<style scoped>
	@import url('../../common/css/cart.css');

	.cartInfo_image_img {
		width: 120rpx;
		height: 120rpx;
	}

	.none {
		text-align: center;
		margin: 40rpx auto;
		color: #ccc;
	}
</style>
