<template>
	<view>
		<view style="font-size: 50rpx;font-weight: 700;text-align: center;margin-top: 15rpx;">
			{{title}}
		</view>
		
		<view v-for="(item,index) in list" style="display: flex;margin: 10rpx auto;width: 700rpx;" :key="index"> 
			<view style="width: 100rpx;height: 100rpx; text-align: center;">
				<image :src="item.userAvatar" style="width: 90%;height: 90%;border-radius: 50rpx;"></image>
			</view>
			<view style="margin: auto 15rpx;font-size: 38rpx; font-weight: 800;">{{item.userName}}</view>
			<u-button :class="{button2:item.isFollow, button1:!item.isFollow}" ref='btn1' style="margin: auto 0 auto auto ;" @click="ChangeColor(item,index)">关注</u-button>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fans:1,
				title:"粉丝",
				list:[
					// {
					// 	userAvatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
					// 	userId:'1',
					// 	userName:"123",
					// 	isFollow:""
					// },
					// {
					// 	userAvatar:'',
					// 	userId:'1',
					// 	userName:"123",
					// 	isFollow:""
					// },
					// {
					// 	userAvatar:'',
					// 	userId:'1',
					// 	userName:"123",
					// 	isFollow:""
					// }
				]
			}
		},
		onLoad: function(options) {
			let that=this
			that.fans=options.fans //1:粉丝，0:关注的人
			
			if(options.fans==1){
				this.title="粉丝"
			}
			else
				this.title="关注的人"
			if(this.fans==1){
				uni.request({
					url:"http://121.199.32.226:8081/follow/fanlist",
					method:"GET",
					data:{
						userId:uni.getStorageSync('user').id
						
					},
					header:{
						'content-type': 'application/json'
					},
					success(res) {
						console.log(res)
						that.list=res.data.data;
					}
				})
			}
			else{
				uni.request({
					url:"http://121.199.32.226:8081/follow/followlist",
					method:"GET",
					data:{
						userId:28
					},
					header:{
						'content-type': 'application/json'
					},
					success(res) {
						console.log(res)
					}
				})
			}
			
		},
		methods: {
			ChangeColor(item,index){  //点击关注按钮之后按钮会改变颜色（红<--->灰）
				// document.getElementById("Button1").style.backgroundColor='#e6e2d2'
				
				var that=this
				// console.log(this.ConcernList)
				console.log(this.list)
				uni.request({
					url:"http://121.199.32.226:8081/follow/follow",
					method:"POST",
					data:{
						"fromUserId":28,
						"toUserId":item.userId,
						"type":item.isFollow
					},
					header:{
						'content-type': 'application/json'
					},
					success() {
						that.list[index].isFollow= 1-that.list[index].isFollow
					}
				})
			}
		}
	}
</script>

<style>
.button1{
		width: 150rpx;
		height: 60rpx;
		background: #ff0000;
		border: none;
		/* border-radius: 30rpx; */
		font-size: 30rpx;
		letter-spacing: 2rpx;
		color: white;
	
		
	}
	.button2{
		width: 150rpx;
		height: 60rpx;
		background: #949393;
		border: none;
		/* border-radius: 30rpx; */
		font-size: 30rpx;
		letter-spacing: 2rpx;
	
		
	}
</style>
