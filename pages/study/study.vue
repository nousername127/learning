<template>
	<view>
		
		<view class="text flex">
			<view style="width: 390rpx;margin-top: 100rpx;font-size: 30rpx;">
				今天的成功是因为昨天的积累,
				明天的成功依赖于今天的努力
			</view>
		</view>
		<view class="flex">
			<view class="circle">
				<!-- <image: src="roomowner_pic" mode=""></image> -->
				<image :src="room_owner_pic"></image>
				<u-count-down :timestamp="timestamp" class="time" separator-size="80" separator-color="white" color="#F7F7F8"
					font-size="80" bg-color="#ffba33;" @end="submitRecord" :autoplay="false"></u-count-down>
				<!-- <u-count-down :timestamp="time" @change="change" ref="uCountDown" ></u-count-down> -->
				<view class="title">
					{{room_title}}
				</view>
			</view>
		</view>
		
		
		
		<view v-if="timestamp ==86399" class="pause">
			<button type="default" @click="toCreateStudy()">开始自习</button>
		</view>
		<view style="display: flex;justify-content:space-around;align-items:center;margin-top: 100rpx;position: fixed;width:100%">
			<view class="music">
				<image src="../../static/img/music.png" mode=""
					style="width: 50rpx;height: 50rpx;margin-left: 10rpx;margin-top: 10rpx;"></image>
			</view>
			<view class="peopleonline">
				<text>当前自习人数:{{people_num}}</text>
			</view>
			<view class="add">
				<image src="../../static/img/add.png" mode=""
					style="width: 50rpx;height: 50rpx;margin-left: 18rpx;margin-top: 10rpx;"></image>
			</view>
		</view>


	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				timestamp: 86399,
				people_num: 0,
				room_title: "考研ing",
				room_owner_pic: "../../static/img/dog.jpg",
				isCreater: 0,
			}
		},
		onLoad(options) {
			this.room_owner_pic=uni.getStorageSync('user').avatarUrl
			console.log(11)
			console.log(JSON.parse(options))
		},
		onShow(){
			console.log(22)
		},
		methods: {
			
			music_change() {

			},
			add_people() {

			},
			toCreateStudy() {
				uni.navigateTo({
					url: "/pages/study/createStudy/createStudy"
				})
			},
			submitRecord(){
				if(this.isCreater==1)
				{
					uni.request({
						url:'http://121.199.32.226:8082/learnRecord/add',
						method:'POST',
						data:{
							createUserId:1,
							tagTitle:this.form.roomname,
							time:this.form.time,
							users:this.form.friendsList
						},
						header:{
							'content-type': 'application/json'
						},
						success:(res)=>{
							uni.showModal({
								title:"专注完成",
								content:"恭喜你完成了一次专注",
								showCancel:false
							})
						}
					})
				}
			}
		},
		onLoad: function (option) { 
			// option 为 空对象
		    // let obj = JSON.parse(option.obj)
		    // this.room_title = obj.roomname
		    // this.prople_num = obj.friendList.length
		    // this.timestamp = obj.time
				uni.$on('createRoom', (obj) => {
					console.log(obj)
					if (obj !== null) {
						const result = JSON.parse(obj)
						this.people_num = result.friendsList.length
						this.room_title = result.roomname
						this.timestamp = result.time.value
					}
				})
		},
		
		onUnload:function () {
				uni.$off('createRoom')
		}
	

	}
</script>

<style lang="scss">
	page {
		background-color: #FFCC33;
	}

	.text {
		opacity: 1;
		font-size: 18rpx;
		font-family: FZCuHeiSongS-B-GB, FZCuHeiSongS-B-GB-Regular;
		font-weight: 400;
		text-align: center;
		color: #f6f0f0;
		letter-spacing: 0rpx;
	}

	.flex {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.circle {
		width: 550rpx;
		height: 550rpx;
		margin-top: 90rpx;
		border: 10px solid #fcf9f9;
		border-radius: 50%;
	}

	.circle image {
		width: 67px;
		height: 67px;
		opacity: 1;
		background: rgba(0, 0, 0, 0.00);
		border-radius: 34px;
		position: relative;
		left: 38%;
		top: 8%;
		display: block;
	}

	.circle .time {
		width: 222rpx;
		height: 52rpx;
		font-size: 40px;
		font-family: Microsoft YaHei, Microsoft YaHei-Regular;
		font-weight: 400;
		text-align: left;
		bac: #ffba33;
		letter-spacing: 0px;
		position: relative;
		left: 100rpx;
		top: 130rpx;

	}

	.circle .title {
		width: 250rpx;
		height: 33rpx;
		letter-spacing: 5px;
		position: relative;
		left: 160rpx;
		top: 200rpx;
		font-size: 25px;
		font-family: Microsoft YaHei, Microsoft YaHei-Bold;
		font-weight: 700;
		text-align: center;
		color: #f7f7f8;
	}

	.square {
		width: 250rpx;
		height: 50rpx;
		opacity: 1;
		background: #f0cdd0;
		border: 1rpx solid #707070;
		border-radius: 30rpx;
		position: relative;
		left: 150rpx;
		top: 150rpx;
		text-align: center;
		font-family: Microsoft YaHei, Microsoft YaHei-Bold;

	}

	.gongneng {
		width: 750rpx;
		height: 90rpx;
		margin-top: 450rpx;
		// background-color: blue;
	}

	.music {
		width: 90rpx;
		height: 90rpx;
		border: 3px solid #ffffff;
		border-radius: 50%;
	}

	.add {
		width: 90rpx;
		height: 90rpx;
		border-radius: 50%;
		border: 3px solid #ffffff;
	}

	.peopleonline {
		background: #f9c96b;
		border-radius: 20px;
		width: 300rpx;
		height: 70rpx;
	}

	.peopleonline text {
		border: 1px solid rgba(0, 0, 0, 0.00);
		font-size: 18px;
		font-family: Microsoft YaHei, Microsoft YaHei-Regular;
		font-weight: 400;
		text-align: center;
		color: #ffffff;
		letter-spacing: 1px;
		margin-left: 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.pause button {
		width: 200rpx;
		height: 200rpx;
		opacity: 0.6;
		border: 3px solid #f6efef;
		border-radius: 50%;
		
		font-size: 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 50rpx;
	}
</style>
