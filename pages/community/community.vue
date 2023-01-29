<template>
	<view>
		<view style="display: flex;padding-top: 30rpx;background-color: #FFFFFF;">
			<view class="avatar">
				<u-avatar :src="user.avatarUrl" size="80"></u-avatar>
			</view>
			<view class="tabs">
				精选
			</view>
			<view class="more" @click="toNewPost">+</view>
		</view>
		<view class="swiper-item">
			<scroll-view scroll-y style="height: 100%; width: 100%;">
				<view class="swiper-div" v-for="(item,index) in posts" :key="index">
					<view>
						<view class="cu-card dynamic no-card">
							<view class="cu-item shadow">
								<view class="cu-list menu-avatar">
									<view class="cu-item">
										<view class="cu-avatar round lg"
											:style="{backgroundImage:'url('+item.createUserAvatar+')'}" @click="toMe(item.createUserId,item.createUserAvatar,item.createUserName)"></view>
										<view class="content flex-sub">
											<view>{{item.createUserName}}</view>
											<view class="text-gray text-sm flex justify-between">
												{{item.createAt}}
											</view>
										</view>
									</view>
								</view>
								<view class="text-content">
									{{item.content}}
								</view>
								<view class="grid flex-sub padding-lr col-3 grid-square">
									<view v-for="(itemUrl,index) in item.pics" class="bg-img"
										:style="{backgroundImage:'url('+itemUrl+')'}" :key="index">
									</view>
								</view>
								<view class="text-gray text-sm text-right padding">
									<text class="cuIcon-appreciatefill margin-lr-xs" style="margin-left: 10rpx;"
										:class="{'active':item.isLike}" @click="likes(index)"></text> {{item.likeNum}}
									<text class="cuIcon-messagefill margin-lr-xs" style="margin-left: 10rpx;"></text>
									{{item.commentNum}}
								</view>
							</view>
						</view>
					</view>
				</view>
				
				<u-loadmore :status="status" />
			</scroll-view>	
		</view>
	</view>		
</template>

<script>
	export default {
		data() {
			return {
				user:null,
				src: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
				current: 0,
				swiperCurrent: 0,
				posts: [
					{
						// createUserId:'',
						// createUserName: '',
						// createAt: '2021年10月12日',
						// createUserAvatar: '',
						// content: '',
						// pics: [
						// 	// 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
						// 	// 'https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png',
						// 	// 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
						// 	// 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg'


						// ],
						// likeNum: 0,
						// commentNum: 0,
						// isLike: false
					}
				],
				status: 'loadmore',
				page:1
			}
		},
		onLoad() {
			this.user=uni.getStorageSync('user')
		},
		methods: {
			change(index) {
				this.current = index;
			},
			// tabs通知swiper切换
			tabsChange(index) {
				this.swiperCurrent = index;
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			// scroll-view到底部加载更多
			onreachBottom() {
				
			},
			likes(index) {
				this.posts[index].isLike = !this.posts[index].isLike;
				if (this.posts[index].isLike) {
					this.posts[index].likeNum++;
				} else {
					this.posts[index].likeNum--;
				}
			},
			toNewPost() {
				console.log(111)
				uni.navigateTo({
					url: "../newPost/newPost",
					success() {
						console.log('suu')
					},
					complete() {
						console.log('COM')
					}
				})
				// window.location.href="../newPost/newPost.vue"
			},
			toMe(id,avatar,name) {
				let o={
					'id':id,
					'avatar':avatar,
					'name':name
				}
				let obj=JSON.stringify(o)
				uni.$emit('toM', obj)
				// uni.switchTab({
				// 	url:"../study",
				// 	success() {
				// 		console.log(1)
				// 	}
				// })
				uni.navigateTo({
					url:`../me/me?obj=${obj}`,
					success() {
						console.log(1)
					}
				})
				
				
				// uni.navigateTo({
				// 	url:`../me/me?id=${id}`
				// })
			},
			onShow(){
				// console.log('show')
				let that = this
				uni.request({
					url:"http://121.199.32.226:8082/posts/getposts",
					method:"GET",
					data:{
						userId:uni.getStorageSync("user").id,
						type:2,
						page:1
					},
					header:{
						'content-type': 'application/json'
					},
					success(res) {
						console.log(res)
						// res.data.data.map((item)=>{
						// 	console.log(item)
						// 	this.posts=res.da
						// })
						// this.posts=res.data.data;
						//console.log(this.posts)
						res.data.data.map((item)=>{
							console.log(item)
							that.posts.unshift(item)
							//console.log(this.posts)
						})
						that.posts.pop()
					}
				})
			},
			onReachBottom() {
				if(this.page >= 3) return ;
				this.status = 'loading';
				this.page = ++ this.page;
				setTimeout(() => {
					this.list += 10;
					if(this.page >= 3) this.status = 'nomore';
					else this.status = 'loading';
				}, 2000)
				console.log(this.page)
			}
		}
	}
</script>

<style>
	body {
		background-color: #aaaaaa;
	}

	/* *{
	background-color: #FFFFFF;
} */
	.tabs {
		width: 150rpx;
		margin: 0 auto;
		font-size: 40rpx;
		font-weight: 700;
		color: #FFAA00;
		margin: 10rpx auto;
		text-align: center;
	}

	.avatar {
		margin-left: 30rpx;
	}

	.more {
		width: 80rpx;
		height: 80rpx;
		font-size: 80rpx;
		text-align: center;
	}

	/* .more image{
	width: 100%;
	height: 100%;
} */
	/* u-dropdown-item{
	position: float;
	width:200rpx;
} */

	.swiper-div {
		width: 98%;
		margin-left: auto;
		margin-right: auto;
		margin-top: 20rpx;
		box-shadow: 1rpx 1rpx 1px #888888;
	}

	.active {
		color: #FFAA00;
	}
</style>
