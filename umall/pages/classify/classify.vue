<template>
	<view class="container">
		<!-- left左侧列表 -->
		<view class="left">
			<!-- 循环遍历的 -->
			<!-- activeList选中样式 -->
			<view :class="tag==index?'left_list activeList':'left_list'" v-for="(item,index) in cateList" :key="item.id" @click="tab(index)">
				<label for="">{{item.catename}}</label>
			</view>
		</view>
		<!-- right右侧详细分类商品 -->
		<view class="right">
			<!-- 每一个小类 -->
			<view class="right_list">
				<!-- 商品 -->
				<view class="bottom" v-if="goodsList.length>0">
					<view class="bottom_list" v-for="item in goodsList" :key="item.id" @click="toProduct(item.pid)">
						<!-- 每个最多显示6个 -->
						<view>
							<image :src="item.img" alt="">
						</view>
						<view class="title">
							<span>{{item.catename}}</span>
						</view>
					</view>
				</view>
				<view class="none" v-else>
					暂无数据
				</view>

			</view>
		</view>

	</view>
</template>

<script>
	import {
		requestCates,
		url
	} from "../../utils/request.js"
	export default {
		data() {
			return {
				cateList: [],
				tag: 0,
				goodsList: []
			}
		},
		methods: {
			toProduct(fid){
				uni.navigateTo({
					url: "/pages/product/product?fid=" + fid
				})
			},
			//点击切换样式
			tab(index) {
				//点击哪条就获取哪条数据
				this.tag = index
				this.getGoodsList()
			},
			//获取分类下面children里面的内容
			async getGoodsList() {
				let res = await requestCates()
				//请求商品分类列表
				this.cateList = res.data.list
				// console.log(this.cateList)
				//初始化页面数据
				this.goodsList = this.cateList[this.tag].children
				//处理图片
				if (this.goodsList) {
					this.goodsList.forEach(item => {
						item.img = url + item.img
					})
				} else {
					this.goodsList = []
				}
			}
		},
		onLoad() {
			this.getGoodsList()
			// console.log(this.goodsList)
		}
	}
</script>

<style>
	/* 导入外部的样式文件 */
	@import url("../../common/css/classify.css");

	/* 点击左侧导航，显示动态样式 */
	.activeList {
		border-left: 6rpx solid #f26b11;
		color: #f26b11;
	}
</style>
