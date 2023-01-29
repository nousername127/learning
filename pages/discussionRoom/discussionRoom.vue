<template>
	<view>
		<view class="live-box box" style="height: 70vh;">
			<view class="main-box box" style="height: 55vh;width: 100vw;">
				<video src="https://jhpz.oss-cn-hangzhou.aliyuncs.com/szxc/media/3.mp4" controls
					style="height: 55vh;width: 100vw;"></video>
			</view>
			<view class="swiper-list box" style="height: 15vh;">
				<scroll-view scroll-x class="scroll-style" style="display: block;">
					<video src="https://jhpz.oss-cn-hangzhou.aliyuncs.com/szxc/media/3.mp4" v-for="(item,index) in 7" :key="index" class="box" style="width: 15vh;height: 15vh;background-color: #02BFBF;display: inline-block;">
						
					</video>
				</scroll-view>
			</view>
		</view>
		<view class="control-box box" style="height: 30vh;">
			<view class="control-head box"
				style="height: 15vh;display: flex;justify-content: space-around;align-items: center;">
				<view class="circle-icon" :class="{'control-active':flag2}" @click="changeBtn2()">
					<text class="cuIcon-record mid-icon"></text>
				</view>
				<view class="circle-icon" :class="{'control-active':flag3}" @click="changeBtn3()">
					<text class="cuIcon-btn mid-icon"></text>
				</view>
				<view class="circle-icon" :class="{'control-active':flag4}" @click="changeBtn4()">
					<text class="cuIcon-friendadd mid-icon"></text>
				</view>
			</view>
			<view class="control-foot"
				style="height: 15vh;display: flex;justify-content: space-around;align-items: center;" @click="HangUp()">
				<view class="circle-icon " :class="{'control-active':flag1}" @click="changeBtn1()">
					<u-icon class="mid-icon" name="mic-off"></u-icon>
				</view>
				<view class="circle-icon" style="background-color: #e24542;border: none;height: 150rpx;width: 150rpx;">
					<u-icon class="mid-icon" name="phone" style="font-size: 80rpx;"></u-icon>
				</view>
				<view class="circle-icon" :class="{'control-active':flag}" @click="changeBtn()">
					<text class=" cuIcon-notification mid-icon"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				flag:true,
				flag1:false,
				flag2:true,
				flag3:false,
				flag4:false
			}
		},
		methods: {
			changeBtn(){
				this.flag=!this.flag
			},
			changeBtn1(){
				this.flag1=!this.flag1
			},
			changeBtn2(){
				this.flag2=!this.flag2
			},
			changeBtn3(){
				this.flag3=!this.flag3
			},
			changeBtn4(){
				this.flag4=!this.flag4
			},
			HangUp(){
				uni.switchTab({
					url:"../moments/moments"
				})
			}
		}
	}
</script>

<style>
	.box {
		border: #007AFF 1rpx solid;
	}

	.control-box {
		background-color: #34383b;
	}

	.circle-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		border: #FFFFFF 1rpx solid;
		color: #FFFFFF;
	}

	.mid-icon {
		font-size: 60rpx;
	}

	.control-active {
		color: #000000;
		background-color: #FFFFFF;
	}

	.scroll-style {
		height: 15vh;
 width: 100%;
    overflow: hidden;
    white-space: nowrap;
	}
</style>
