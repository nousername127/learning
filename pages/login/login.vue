<template>
	<view>
		<view style="width: 80rpx;font-size: 40rpx;margin: 5rpx auto;margin-top: 100rpx;">
			登录
		</view>
		<u-form :model="form" ref="uForm" style="width:95%;margin: 0 auto;">
			<u-form-item label="用户名" label-width="150rpx" label-align="center" prop="name">
				<u-input v-model="form.username" />
			</u-form-item>
			<u-form-item label="密码" label-width="150rpx" label-align="center" prop="password">
				<u-input v-model="form.password" type="password" />
			</u-form-item>
		</u-form>
		<u-button @click="submit" style="width:90%;margin: 20rpx auto;background-color: #FFAA00;color: #FFFFFF;">登录</u-button>
		
		<view style="color: #FFAA00;width:150rpx;margin: 0 30rpx 0 auto;" @click="toRegister()">新用户注冊</view>
	</view>
	
</template>

<script>
	const app = getApp()
	export default {
		data() {
			return {
				form: {
					username: '',
					password: ''
				},
			}
		},
		methods: {
			submit() {
				app.post(app.v1().login, this.form).then(res => {
					if (res.data.status == 10000) {
						uni.showToast({
							title: '登录成功',
							icon: 'success'
						})
						app.globalData.userInfo = res.data.data.user
						app.globalData.token = res.data.data.token
						setTimeout(() => {
							uni.switchTab({
								url: '../study/study'
							})
						}, 1500)
						var socket = new WebSocket("ws://localhost:8082/socket/"+res.data.data.user.id);
						socket.onopen = function () {
							console.log('socket服务userId:'+res.data.data.user.id+'：连接成功');
						}
						socket.onmessage = function (event) {
							let obj = JSON.parse(event.data)
							
							uni.$emit('createRoom', obj)
							uni.switchTab({
								url:"../study",
								success() {
									console.log(1)
								}
							})
						}
						socket.onclose = function () {
							console.log('socket服务userId:'+res.data.data.user.id+'：连接断开');
						}
						this.socket = socket;
						
						console.log(app.globalData)
						uni.setStorage({
							key:"user",
							data:res.data.data.user
						})
		
						// app.NimStart()
					}
					else {
						uni.showToast({
							title: '用户信息错误',
							
							icon:'error',
							mask:true,
							duration:3000
						})
						this.username=''
						this.passwoord=''
					}
				})
			},
			toRegister(){
				uni.navigateTo({
					url:'../register/register',
					success() {
						console.log(1111)
					}
				})
			}
		}
	}
</script>

<style>
uni-toast .uni-toast{
	font-size: 5rpx;
}
</style>
