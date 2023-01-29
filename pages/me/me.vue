<template>
	<view>
		<view class="userCard">
			<view class="basicInfo">
				<view>
					<u-avatar :src="avaSrc" size="120"></u-avatar>
				</view>
				<view class="infoText">
					<view style="font-size: 40rpx; margin-bottom: 5rpx; font-weight: 600;">{{username}}</view>
					<view>ID号：{{id}}</view>
					<view style="display: flex;">
						<view class="border">共专注{{focusDay}}天</view>
						<view class="border">{{mode}}</view>
					</view>
				</view>
				
			</view>
			<view class="relation">
				<view>
					<view>{{following}}</view>
					<view>关注</view>
				</view>
				<view>
					<view>{{fans}}</view>
					<view>粉丝</view>
				</view>
				<view class="follow">
					<u-button @click="ChangeColor()" :class="{button1:flag1, button2:!flag1}" >关注</u-button>
				</view>
			</view>
		
		</view>
		
		<view>
			<view class="all">全部动态</view>
			<hr/>
			
			<!-- <view v-for="(item,index) in mine">
				<view class="cu-card dynamic" style="border-radius: 50rpx;">
				  <view class="cu-item shadow"  style="border-radius: 20rpx;margin-bottom: 8rpx;height: 530rpx;">
				    <view class="cu-list menu-avatar">
				      <view class="cu-item">
				        <view class="cu-avatar round lg" :style="{backgroundImage:'url('+avaSrc+')'}"></view>
				        <view class="content flex-sub">
				          <view>{{username}}</view>
				          <view class="text-gray text-sm flex justify-between">
				            {{item.date}}
				          </view>
				        </view>
				      </view>
				    </view>
				    <view class="text-content">
				      {{item.text}}
				    </view>
				    <view class="grid flex-sub padding-lr col-3 grid-square">
				      <view class="bg-img" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);" wx:for="6" wx:key="index">
				      </view>
				    </view>
				    <view class="text-gray text-sm text-right padding">
				      <text class="cuIcon-attentionfill margin-lr-xs"></text> 10
					  <text class="cuIcon-appreciatefill margin-lr-xs" style="margin-left: 10rpx;"></text> 20
				      <text class="cuIcon-messagefill margin-lr-xs" style="margin-left: 10rpx;"></text> 30
				    </view>
				  </view>
				</view>
			</view> -->
			
			<view class="swiper-item">
				
				<scroll-view scroll-y style="height: 100%; width: 100%;">
					
					
					
					<view class="swiper-item">
						<scroll-view scroll-y style="height: 100%; width: 100%;">
							<view class="swiper-div" v-for="(item,index) in posts" :key="index">
								<view>
									<view class="cu-card dynamic no-card">
										<view class="cu-item shadow">
											<view class="cu-list menu-avatar">
												<view class="cu-item">
													<view class="cu-avatar round lg"
														:style="{backgroundImage:'url('+item.createUserAvatar+')'}" @click="toMe(item.id)"></view>
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
							
						</scroll-view>	
					</view>
					
				</scroll-view>
				
				
				
			</view>
			
			
		</view>
		
		
	</view>
</template>

<script>
	let app=getApp()
	export default {
		data() {
			return {
				id:"",
				avaSrc:"../../static/img/dog.jpg",
				username:'黄师傅',
				focusDay:5,
				mode:'学霸模式',
				posts:[],
				flag1:false,
				following:15,
				fans:5
			}
		},
		onLoad(options) {
			// uni.$on('toM', (obj) => {
			// 	console.log(obj)
			// 	if (obj !== null) {
			// 		const result = JSON.parse(obj)
			// 		this.id = result.id
			// 		this.avatar = avatar
			// 		this.name = result.name
			// 	}
			// })
			// this.id=options.id
			// this.
			let o=JSON.parse(options.obj)
			console.log(o)
			// console.log(.obj)
			this.id=o.id;
			this.avaSrc=o.avatar;
			this.username=o.name;
			console.log(this.avaSrc)
			console.log(options.obj.id)
			let that=this
			uni.request({
				url:"http://121.199.32.226:8082/posts/getOnesPosts",
				method:"GET",
				data:{
					myUserId:app.globalData.userInfo.id,
					onesUserId:this.id,
					page:1
				},
				header:{
					'content-type': 'application/json'
				},
				success(res) {
					console.log(res)
					
					res.data.data.map((item)=>{
						console.log(item)
						that.posts.unshift(item)
						//console.log(this.posts)
					})
					that.posts.shift()
				}
			})
			uni.request({
				url:"http://121.199.32.226:8081/follow/fanlist",
				method:"GET",
				data:{
					userId:this.id
				},
				header:{
					'content-type':'application/json'
				},
				success(res) {
					console.log(res)
					res.data.data.map((item)=>{
						following++;
						if(item.userId==app.globalData.userInfo.id){
							this.flag1=true
							console.log(1111)
							console.log(this.flag1)
						}
					})
					 this.$forceUpdate();
					 console.log(this.flag1)
				}
			})
		},
		methods: {
			likes(index) {
				this.posts[index].isLike = !this.posts[index].isLike;
				if (this.posts[index].isLike) {
					this.posts[index].likeNum++;
				} else {
					this.posts[index].likeNum--;
				}
			},
			ChangeColor(){  //点击关注按钮之后按钮会改变颜色（红<--->灰）
				// document.getElementById("Button1").style.backgroundColor='#e6e2d2'
				
				// var that=this
				// // console.log(this.ConcernList)
				// console.log(this.list)
				// uni.request({
				// 	url:"http://huangdevuser.vaiwan.com/follow/follow",
				// 	method:"POST",
				// 	data:{
				// 		"fromUserId":28,
				// 		"toUserId":item.userId,
				// 		"type":item.isFollow
				// 	},
				// 	header:{
				// 		'content-type': 'application/json'
				// 	},
				// 	success() {
				// 		that.list[index].isFollow= 1-that.list[index].isFollow
				// 	}
				// })
				
				this.flag1=!this.flag1
				if(this.flag1){
					this.fans--;
				}
				else{
					this.fans++;
				}
				
			}
		}
	}
</script>

<style>
*{
	margin: 0;
}
.userCard{
	background-color: #E0E0E3;	
	width: 730rpx;
	height: 350rpx;
	margin: 20rpx auto;
	margin-bottom: 50rpx;
	padding: 30rpx 40rpx;
	/* background: #D2D0CB; */
	border-radius: 20px;
	box-shadow: 0px 8px 6px 0px rgba(0,0,0,0.16), 0px 8px 6px 0px rgba(0,0,0,0.16) inset; 
}
.basicInfo{
	display: flex;
}
.infoText{
	margin-left: 40rpx;
}
.border{
	margin-right: 20rpx;
	margin-top: 10rpx;
	padding: 3rpx 10rpx;
	color: #bc501a;
	font-size: 15px;
	background: rgba(254,169,52,0.37);
	opacity: 0.8;
	border-radius: 20px;
	box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.16), 0px 3px 6px 0px rgba(0,0,0,0.16) inset; 
}
.relation{
	margin-left: 20rpx;
	margin-top: 40rpx;
	display: flex;
}
.relation view{
	margin-right: 30rpx;
	text-align: center;
}
.relation view view:first-child{
	font-size: 50rpx;
	color: #FFFFFF;
}
.relation view view:nth-child(2){
	color: #5E5555;
	font-size: 30rpx;
}
.follow{
	width: auto;
	margin: auto 20rpx auto auto;
}
.button1{
	background-color: #F73348;
	width: 200rpx;
	height: 80rpx;
	font-size: 35rpx;
	padding: 0;
	border-radius: 30rpx;
	color: #FFFFFF;
}
.button2{
	background-color: #949393;
	width: 200rpx;
	height: 80rpx;
	font-size: 35rpx;
	padding: 0;
	border-radius: 30rpx;
	color: #FFFFFF;
}
.all{
	font-size: 50rpx;
	margin-left: 30rpx;
	color: #656567;
}
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
