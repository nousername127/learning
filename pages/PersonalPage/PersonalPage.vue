<template>
	<view>
		<view class="userCard">
			<view class="basicInfo">
				<view>
					<u-avatar :src="user.avatarUrl" size="120"></u-avatar>
				</view>
				<view class="infoText">
					<view style="font-size: 40rpx; margin-bottom: 5rpx; font-weight: 600;">{{user.username}}</view>
					<view>ID号：{{user.id}}</view>
					<view style="display: flex;">
						<view class="border">共专注{{focusDay}}天</view>
						<view class="border">{{mode}}</view>
					</view>
				</view>
				
			</view>
			<view class="relation">
				<view>
					<view>{{following}}</view>
					<view @click="toFollowing()">关注</view>
				</view>
				<view>
					<view>{{followers}}</view>
					<view @click="toFans()">粉丝</view>
				</view>
				
			</view>
		
		</view>
		
		<view class="tabSwiper">
				
					<view>
						<u-tabs-swiper ref="uTabs" :list="list" :current="current" @change="tabsChange" :is-scroll="false"
						 swiperWidth="750" active-color="#ffaa00"></u-tabs-swiper>
					</view>
					<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish" style="height: 1100rpx;">
					<!-- <swiper-item class="swiper-item">
						<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
						<view v-for="(item,index) in mine">
							<view class="cu-card dynamic" style="border-radius: 50rpx;">
							  <view class="cu-item shadow"  style="border-radius: 20rpx;margin-bottom: 8rpx;">
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
						</view>
						</scroll-view>
						</swiper-item> -->
						
						<swiper-item class="swiper-item">
							<scroll-view scroll-y style="height: 100%; width: 100%;">
								<view class="swiper-div" v-for="(item,index) in posts" :key="index">
									<view>
										<view class="cu-card dynamic no-card">
											<view class="cu-item shadow">
												<view class="cu-list menu-avatar">
													<view class="cu-item">
														<view class="cu-avatar round lg"
															:style="{backgroundImage:'url('+item.createUserAvatar+')'}"></view>
														<view class="content flex-sub">
															<view>{{item.createUserName}}</view>
															<view class="text-gray text-sm flex justify-between">
																{{item.createAt}}
															</view>
														</view>
													</view>
												</view>
												
												<view style="position: relative; left:680rpx;bottom: 100rpx;" @click="deletePost(item.id,index)">X</view>
												
												<view class="text-content">
													{{item.content}}
												</view>
												<view class="grid flex-sub padding-lr col-3 grid-square">
													<view v-for="(itemUrl,eindex) in item.pics" class="bg-img"
														:style="{backgroundImage:'url('+itemUrl+')'}" :key="eindex">
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
						</swiper-item>
						
						
					<swiper-item class="swiper-item">
						<scroll-view scroll-y style="height: 100%; width: 100%;">
							<view class="swiper-div">  
							<view class="p">
								<!-- <image src="../../static/img/learn_record_bg01.jpg"></image> -->
								
								<view class="todayDuration">
									<view class="dayFocus">
										当日专注
									</view>
									<view class="imgTimes">
										次数<br>
										<text>{{count}}</text>
										<!-- <image src="" ></image> -->
									</view>
									<view class="imgDuration">
										时长<br>
										<text>{{hour}}</text>小时
										<text>{{minute}}</text>分钟
										<!-- <image src="" ></image> -->
									</view>
								</view>
								<view class="general">
									<view class="htabbar">
										<view class="left">
											分布圈
										</view>
										<view class="right">
											时间轴
										</view>
									</view>
									<view class="sector_iagram">
										<TimeDistribution></TimeDistribution>
									</view>
								</view>
								<view class="bottom">
									关键是你的目光，而不是你的所见
								</view>
							</view>
							</view>
						</scroll-view>
					</swiper-item>
					
				</swiper>
		</view>
		
		
	</view>
</template>

<script>
	import TimeDistribution from '../../components/timeDistribution.vue'

	export default {
		components:{
			TimeDistribution
		},
		data() {
			return {
				hour:9,
				minute:20,
				count:2,
				user:null,
				list: [{
									name: '动态'
								}, {
									name: '学习记录'
								}, ],
								current:0,
								swiperCurrent:0,
				avaSrc:"../../static/img/dog.jpg",
				username:'黄师傅',
				id:'123456',
				focusDay:5,
				mode:'学霸模式',
				following:0,
				followers:0,
				posts:[
					// {
					// 	date:"2019年12月3日",
					// 	text:"折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！",
					// 	imgUrl:[]
					// },
					// {
					// 	date:"2018年5月6日",
					// 	text:"111111111111111111",
					// 	imgUrl:[]
					// },
					// {
					// 	date:"2018年5月6日",
					// 	text:"5555112311",
					// 	imgUrl:[]
					// }
				],
				flag1:true,
				nowYear:new Date().getFullYear(),
				nowMonth:new Date().getMonth()+1,
				nowDate:new Date().getDate()
			}
		},
		onLoad:function(){
			//console.log(111)
			let that=this
			this.user=uni.getStorageSync('user')
			//console.log(this.user)
			uni.request({
				url:"http://121.199.32.226:8081/follow/followlist",
				method:"GET",
				data:{
					userId:this.user.id
				},
				header:{
					'content-type': 'application/json'
				},
				success(res) {
					// res.data.data.map((item)=>{
					// 	this.following++;
					// })
					// this.$forceUpdate()

					that.following=res.data.data.length;
					console.log(that.following)
				},
				complete() {
					console.log('com')
				}
			})
			
			uni.request({
				url:"http://121.199.32.226/follow/fanlist",
				method:"GET",
				data:{
					userId:this.user.id
				},
				header:{
					'content-type': 'application/json'
				},
				success(res) {
					// res.data.data.map((item)=>{
					// 	this.following++;
					// })
					// this.$forceUpdate()
			
					that.followers=res.data.data.length;
					//console.log(that.following)
				},
				complete() {
					console.log('com')
				}
			})
			
		},
		methods: {
			ChangeColor1(index){  //点击关注按钮之后按钮会改变颜色（红<--->灰）
				// document.getElementById("Button1").style.backgroundColor='#e6e2d2'
				this.flag1 = !this.flag1
				// console.log(this.ConcernList)
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
						onShow(){
							let user=uni.getStorageSync('user')

							var myDate = new Date();
							var that=this;
							myDate.toLocaleDateString();   
							//console.log(myDate);
							uni.request({
								url:'http://121.199.32.226:8082/learnRecord/get',
								method:"GET",
								data:{
									userId:user.id
								},
								success(res) {
									//console.log(res)
									that.count=res.data.data.count;
									that.hour=res.data.data.time/60;
									that.minute=res.data.data.time%60;
									// this.
								}
							})
							uni.request({
								url:"http://121.199.32.226:8082/posts/getOnesPosts",
								method:"GET",
								data:{
									myUserId:1,
									onesUserId:1,
									page:1
								},
								header:{
									'content-type': 'application/json'
								},
								success(res) {
									//console.log(res)
									
									res.data.data.map((item)=>{
										console.log(item)
										that.posts.push(item)
										
									})
									//console.log(that.posts)
								}
							})
						},
						likes(index) {
							this.posts[index].isLike = !this.posts[index].isLike;
							if (this.posts[index].isLike) {
								this.posts[index].likeNum++;
							} else {
								this.posts[index].likeNum--;
							}
						},
						deletePost(id,index){
							var that=this
							console.log(id,index)
							uni.request({
								url:"http://121.199.32.226:8082/posts/delete/"+id,
								method:"POST",
								data:{
									
								},
								header:{
									'content-type': 'application/json'
								},
								success(res) {
									console.log(res);
									console.log(index);
									that.posts.splice(index,1);
									console.log('splice')
								}
							})
						},
						toFollowing(){
							uni.navigateTo({
								url:'../friend/friend?fans=0'
							})
						},
						toFans(){
							uni.navigateTo({
								url:'../friend/friend?fans=1'
							})
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
	margin: 10rpx auto;
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
	color: #FFCC33;
	font-weight: 600;
}
.relation view view:nth-child(2){
	color: #5E5555;
	font-size: 20rpx;
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
.p {
		width: 100%;
		height: 100%;
		z-index: -1;
	}
	.p image{
		position: fixed;
		top: 0;
		left: 0;
		z-index: -999;
		width: 100%;
		height: 100%;
	}
	.header {
		width: 100%;
		overflow: auto;
	}
	.nowDay {
		color: white;
		font-size: 50rpx;
	}
	.User_Mes{
		height:200rpx ;
		/* background-color: #18B566; */
		background-color: rgba(255,255,255,0.3);
		overflow: auto;
		border-radius: 20rpx;
		width: 98%;
		margin-left: 1%;
		margin-top: 10rpx;
	}
	.totalDuration {
		font-size: 10rpx;
		width: 130rpx;
		float: left;
		background-color: #ffff99;
		color: #aaaa00;
		border: 1rpx solid;
		border-radius: 20rpx;
		text-align: center;
		margin-left: 30rpx;
		margin-top: 20rpx;
	}
	.model {
		font-size: 10rpx;
		width: 130rpx;
		background-color: #ffff99;
		color: #aaaa00;
		border: 1rpx solid;
		border-radius: 20rpx;
		text-align: center;
		margin-left: 30rpx;
		margin-top: 20rpx;
		float: left;
	}
	.todayDuration {
		width: 90%;
		height: 200rpx;
		background-color:#FFFFFF ;
		margin-top: 35rpx;
		margin-left: 5%;
		border-radius: 25rpx;
		opacity: 0.8;
	}
	.todayDuration text{
		font-size: 25px;
		font-weight: 700;
	}
	.dayFocus {
		color: black;
		margin-left: 20rpx;
		opacity: 0.8;
		font-size: 18px;
		font-family: Microsoft YaHei, Microsoft YaHei-Regular bold;
		font-weight: 400;
		text-align: left;
		letter-spacing: 5rpx;
	}
	.imgTimes {
		float: left;
		margin-top: 20rpx;
		margin-left: 130rpx;
		padding: 15rpx;
		font-size: 15px;
		background-color: #FFCC33;
		border-radius: 20rpx;
	}
	.imgDuration {
		float: left;
		margin-top: 20rpx;
		margin-left: 180rpx;
		font-size: 15px;
		background-color: #FFCC33;
		border-radius: 20rpx;
		padding: 15rpx;
	}
	.bottom {
		background-color: rgba(0,0,0,0.3);
		width: 100%;
		height: 60rpx;
		line-height: 60rpx;
		color: white;
		position: fixed;
		bottom: 0;
	}
	.general {
		margin-top: 30rpx;
		overflow: auto;
	}
	.htabbar {
		width: 60%;
		margin-left: 20%;
		overflow: auto;
		border-radius: 20rpx;
	}
	.htabbar .left {
		width: 50%;
		float: left;
		font-weight: bold;
		background-color: white;
		border-right: 2rpx solid black;
		text-align: center;
	}
	.htabbar .right{
		width: 50%;
		float: left;
		font-weight: bold;
		background-color: white;
		border: 2rpx solid rgba(255,255,255,0.3);
		text-align: center;
	}
	.sector_iagram {
		width: 90%;
		margin-left: 5%;
		margin-top: 30rpx;
		height: 100%;
		background-color:#FFFFFF ;
		border-radius: 20rpx;
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
