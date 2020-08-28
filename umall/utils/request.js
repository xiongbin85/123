export const url = "http://localhost:3000"
//一级分类数据
export const requestCate = async () => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: url + "/api/getcate",
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			}
		})
	})
}
//一级分类的商品列表
export const requestCateGoods = async (data) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: url + "/api/getcategoods",
			data,
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			}
		})
	})
}
//商品分类页
export const requestCates = async () => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: url + "/api/getcates",
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			}
		})
	})
}
//轮播图
export const requestBanner = async () => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: url + "/api/getbanner",
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			}
		})
	})
}
//秒杀活动
export const requestSeckill = async () => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: url + "/api/getseckill",
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			}
		})
	})
}
//商品数据
export const requestGoods = async () => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: url + "/api/getindexgoods",
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			}
		})
	})
}
//商品详情
export const requestGoodsInfo = async (data) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: url + "/api/getgoodsinfo",
			data,
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			}
		})
	})
}
//模糊搜索
export const requestSearch = async (data) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: url + "/api/search",
			data,
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			}
		})
	})
}
//发送短信验证码
export const requestSms = async (data) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: url + "/api/sms",
			data,
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			}
		})
	})
}