<template>
	<view>
		<view class="topBar">
			<view style="font-size: 30rpx;margin: auto 0 auto 10rpx;" @click="back()">
				取消
			</view>
			<view style="margin: auto;font-size: 40rpx;">
				发动态
			</view>
			<view style="margin: auto 10rpx auto 0;">
				<button style="border-radius: 20rpx;background-color: #2B85E4;color: #FFFFFF;height: 70rpx; text-align: center;font-size: 30rpx;"@click="done()">发表</button>
			</view>
		</view>
		
		<view class="card">
			<u-input v-model="text" type="textarea" maxlength="150" style="height: 270rpx;"></u-input>
			<u-upload :action="action" :file-list="fileList" ></u-upload>
		</view>
		
	</view>
</template>

<script>
	const app=getApp()
	export default {
		data() {
			return {
				text:""
			}
		},
		methods: {
			back(){
				uni.navigateBack()
			},
			done(){
				// console.log(this.text)
				uni.request({
					url:'http://121.199.32.226:8082/posts/publish',
					method:'POST',
					data:{
						createUserId:uni.getStorageSync("user").id,
						content:this.text
					},
					header:{
						'content-type': 'application/json'
					},
					success:(res)=>{
						// uni.request({
							
						// })
						console.log('success')
						uni.navigateBack()
					},
					complete() {
						console.log('com')
					}
				})
			}
		}
	}
</script>

<style>
.topBar{
	display: flex;
	margin-top: 10rpx;
	background-color: #FFFFFF;
	height: 100rpx;
}
.card{
	background-color: #FFFFFF;
	margin-top: 20rpx;
	height: 500rpx;
	margin-left: 15rpx;
	margin-right: 15rpx;
}
</style>
