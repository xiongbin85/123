<template>
	<view class="">
		<!-- 顶部信息 -->
		<view class="HomeTop">
			<view class="logoView">
				<!-- logo -->
				<image class="logo" src="/static/index/logo.jpg" alt="" />
			</view>
			<view class="inputView">
				<input class="textinput" v-model="value" style="center" type="text" placeholder="寻找商品" @keydown.enter="enter" />
			</view>
		</view>
		<!-- 顶部导航  scroll-view -->
		<view class="tabs">
			<scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false">
				<view class="uni-tab-item" data-current="0" v-for="(item,index) in cateList" :key="index" @click="toCateGoodsList(item.id)">
					<!-- 选中加这个类名uni-tab-item-title-active -->
					<text :class="[index==0?'uni-tab-item-title uni-tab-item-title-active':'uni-tab-item-title']">
						{{item.catename}}
					</text>
				</view>
			</scroll-view>
		</view>
		<!-- 推荐轮播图 -->
		<view class="">
			<swiper :indicator-dots="true" :autoplay="true" :interval="2000" :duration="1000" :circular="true">
				<swiper-item v-for="item in bannerList" :key="item.id">
					<view class="swiper-item">
						<image :src="item.img"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 功能导航开始 -->
		<!-- 功能导航 -->
		<view class="FunctNavCon">
			<view class="FunctNavLi">
				<image src="../../static/index/xiaohuoban.png" alt class="FunImg" />
				<p>限时抢购</p>
			</view>
			<view class="FunctNavLi">
				<image src="../../static/index/jifentixicopy.png" alt class="FunImg" />
				<p>积分商城</p>
			</view>
			<view class="FunctNavLi">
				<image src="../../static/index/lianxiwomen.png" alt class="FunImg" />
				<p>联系我们</p>
			</view>
			<view class="FunctNavLi" @click="toCateList">
				<image src="../../static/index/-shangpinfenlei-gai.png" alt class="FunImg" />
				<p>商品分类</p>
			</view>
		</view>
		<!-- 推荐部分 未写 -->
		<view class="HotGoods">
			<!-- 热推左侧 -->
			<view class="HotLeft">
				<view class="LimitedContent">
					<image class="LimitedImg" src="../../static/index/xianshi.jpg" alt />
					<label class="Limited">限时秒杀</label>
				</view>
				<p class="LimitedTitle">每天零点场，好货秒不停</p>
				<!-- 倒计时 -->
				<view class="LimitTimeAll">
					<label class="LimitTime">{{hour|filterTime}}</label>
					<view class="maohao">:</view>
					<label class="LimitTime">{{minute|filterTime}}</label>
					<view class="maohao">:</view>
					<label class="LimitTime">{{second|filterTime}}</label>
					<label class="Seckill">秒杀</label>
				</view>
				<image src="../../static/index/goods2.jpg" class="LimitedgoodsImg" alt="">
			</view>
			<!-- 热推右侧 -->
			<view class="HotRight">
				<!-- 右侧顶部部分 -->
				<view class="HotTop">
					<view class="HomeTopInfo">
						<view class="HomeTopInfoOne">
							<label class="BrandNew">品牌上新</label>
							<label class="Discount">折</label>
						</view>
						<view class="HomeTopRobbig">
							<label>每日九点，抢大牌</label>
						</view>
					</view>
					<!-- <div> -->
					<view class="Cloth">
						<image src="../../static/index/goods1.jpg" alt="">
					</view>

					<!-- </div> -->
				</view>
				<!-- 右侧底部 -->
				<view class="HotBottom">
					<view class="HotBottomLeft">
						<view class="HotBottomLeftInfo">
							<label class="HotBottomLeftInfoTitle">每日十件</label>
							<label class="HotBottomLeftInfoDetail">只为你选好货</label>
						</view>
						<view class="HotBottomLeftImage">
							<image src="../../static/index/goods1.jpg" mode=""></image>
						</view>
					</view>
					<view class="HotBottomRight">
						<view class="HotBottomRightInfo">
							<label class="HotBottomRightInfoTitle">每日十件</label>
							<label class="HotBottomRightInfoDetail">只为你选好货</label>
						</view>
						<view class="HotBottomRightImage">
							<image src="../../static/index/goods1.jpg" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 轮播图2 -->
		<div class="Swiper2">
			<image class="Swiper2Img" src="../../static/index/swiper1.jpg" alt />
		</div>
		<!-- 底部商品列表 -->
		<view class="products">
			<!-- 商品标签 -->
			<view class="tags">
				<!-- active_tag_list添加样式 -->
				<view :class="[tag==index?'tag_list active_tag_list':'tag_list']" v-for="(item,index) in tagList" :key="index"
				 @click="tab(index)">
					<label for="">{{item}}</label>
				</view>

			</view>
			<!-- 标签对应的商品 -->
			<view class="tags_product">
				<view class="product" v-for="item in goodsList" :key="item.id" @click="toGoodsDetail(item.id)">
					<view class="GoodsLeft">
						<image class="GoodsImg" :src="item.img" alt />
					</view>
					<view class="GoodsCont">
						<view class="GoodConTit">{{item.goodsname}}</view>
						<view class="GoodsPrice">￥{{item.price}}</view>
						<view class="yimai">已售8000件</view>
						<view class="Immed">立即抢购</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		requestCate,
		requestBanner,
		requestSeckill,
		requestGoods,
		url,
		requestSearch
	} from "../../utils/request.js"
	export default {
		data() {
			return {
				cateList: [],
				bannerList: [],
				second: 0,
				minute: 0,
				hour: 0,
				goodsList: [],
				tagList: ["热门推荐", "发现好货", "只看商品"],
				tag: 0,
				value: ""
			}
		},
		methods: {
			//跳转单种分类商品页
			toCateGoodsList(fid) {
				uni.navigateTo({
					url: "/pages/product/product?fid=" + fid
				})
			},
			//跳转商品分类
			toCateList() {
				uni.navigateTo({
					url: "/pages/classify/classify"
				})
			},
			//倒计时
			countTime(endtime) {
				let nowTime = new Date().getTime()
				let leftTime = (endtime - nowTime) / 1000
				this.second = Math.floor(leftTime % 60);
				this.minute = Math.floor((leftTime / 60) % 60);
				this.hour = Math.floor((leftTime / 3600) % 24);
			},
			//跳转详情页
			toGoodsDetail(id) {
				// console.log(e)
				uni.navigateTo({
					url: "/pages/details/details?id=" + id
				})
			},
			//切换商品tab栏
			tab(index) {
				this.tag = index
				this.getOneTypeGoods(index)
			},
			//根据选择下标来选择显示的数据
			async getOneTypeGoods(index) {
				let goods = await requestGoods()
				this.goodsList = goods.data.list[index].content
				if (this.goodsList) {
					this.goodsList.forEach(item => {
						item.img = url + item.img
					})
				} else {
					this.goodsList = []
				}
			},
			//搜索
			enter() {
				if (this.value == "") {
					uni.showToast({
						title: "请不要输入空值",
						icon:"none"
					})
					return
				}
				uni.navigateTo({
					url: "/pages/search/search?keywords=" + this.value
				})
				this.value = ""
			}
		},
		filters: {
			filterTime(time) {
				return (time + "").padStart(2, "0")
			}
		},
		async mounted() {
			// console.log(url)
			//获取一级分类的数据
			let cate = await requestCate()
			console.log(cate)
			this.cateList = cate.data.list
			//获取轮播图数据
			let banner = await requestBanner()
			// console.log(banner)
			this.bannerList = banner.data.list
			if (this.bannerList) {
				this.bannerList.forEach(item => {
					item.img = url + item.img
				})
			} else {
				this.bannerList = []
			}
			//获取秒杀活动的数据
			setInterval(async () => {
				let seckill = await requestSeckill()
				let endtime = seckill.data.list[0].endtime
				this.countTime(endtime)
			}, 1000)
			//获取商品信息
			this.getOneTypeGoods(this.tag)
		}
	}
</script>

<style>
	/* 导入外部的样式文件 */
	@import url("../../common/css/index.css");
</style>
