<template>
	<view class="p">
		<image src="../../static/img/learn_record_bg01.jpg"></image>
		<view class="header">
			<!-- <view class="nowDay">
				{{nowYear+'年'+nowMonth+'月'+nowDate+'日'}}
			</view> -->
			<view class="User_Mes">
				
			</view>
			<view class="totalDuration">
				共专注5天
			</view>
			<view class="model">
				学霸模式
			</view>
		</view>
		<view class="todayDuration">
			<view class="dayFocus">
				当日专注
			</view>
			<view class="imgTimes">
				次数<br>12
				<!-- <image src="" ></image> -->
			</view>
			<view class="imgDuration">
				时长<br>9小时20分钟
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
</template>

<script>
	import TimeDistribution from '../../components/timeDistribution.vue'
	export default {
		components:{
			TimeDistribution
		},
		data(){
			
			return {
				// nowDate:new Date().getFullYear()+'年'+new Date().getMonth()+'月'+new Date().getDate()+'日'
				nowYear:new Date().getFullYear(),
				nowMonth:new Date().getMonth()+1,
				nowDate:new Date().getDate()
			}
		}
	}
</script>

<style>
	* {
		margin: 0;
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
		background-color: rgba(255,255,255,0.3);
		margin-top: 35rpx;
		margin-left: 5%;
		border-radius: 20rpx;
	}
	.dayFocus {
		color: white;
		margin-left: 20rpx;
	}
	.imgTimes {
		float: left;
		margin-top: 20rpx;
		margin-left: 50rpx;
	}
	.imgDuration {
		float: left;
		margin-top: 20rpx;
		margin-left: 100rpx;
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
		background-color: rgba(255,255,255,0.3);
		border: 2rpx solid rgba(255,255,255,0.3);
		text-align: center;
	}
	.htabbar .right{
		width: 50%;
		float: left;
		font-weight: bold;
		background-color: rgba(255,255,255,0.3);
		border: 2rpx solid rgba(255,255,255,0.3);
		text-align: center;
	}
	.sector_iagram {
		width: 90%;
		margin-left: 5%;
		margin-top: 30rpx;
		height: 100%;
		background-color: rgba(255,255,255,0.5);
		border-radius: 20rpx;
	}
</style>

