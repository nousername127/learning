<template>
	<view>
		<button type="default" @click="nim">调试nim</button>
		<button type="default" @click="sendMsg('text','你好啊啊啊啊')">发送信息</button>
		<button type="default" @click="global">全局数据</button>
		<button type="default" @click="msgDb">测试消息工具函数</button>
	</view>
</template>

<script>
	const app = getApp()
	export default {
		data() {
			return {

			}
		},
		onShow() {
			app.post(app.v1().login, {
				username:"111",
				password:"111"
			}).then(res => {
				if (res.data.status == 10000) {
					uni.showToast({
						title: '登录成功',
						icon: 'success'
					})
					app.globalData.userInfo = res.data.data.user
					app.globalData.token = res.data.data.token
				}
			})
		},
		methods: {
			nim() {
				app.NimStart(app.globalData.token, app.globalData.userInfo.id)
			},
			sendMsg(type,msg,receiver) {
				let userInfo = app.globalData.userInfo
				let msgItem = {
					name:userInfo.name,
					avatar:userInfo.avatarUrl,
					msg,
					type
				}
				var msgSender = app.NimInstance.sendText({
					scene: 'p2p',
					to: '33',
					text: JSON.stringify(msgItem),
					done: sendMsgDone
				})
				
				console.log('正在发送p2p text消息, id=' + msgSender.idClient)
				function sendMsgDone(error, msgSender) {
					console.log(error)
					console.log(msgSender)
					let data= {
						detail:JSON.stringify(msgItem),
						fromId:app.globalData.userInfo.id,
						time:msgSender.time,
						toId:33,
						id:null
					}
					
					app.post(app.v1().copyMsg,data).then(res=>{
						console.log(res)
						if(res.data.status==10000){
							console.log('消息同步服务器success')
						}else{
							console.log('消息上传失败')
						} 
					}) 
					console.log('发送' + msgSender.scene + ' ' + msgSender.type + '消息' + (!error ? '成功' : '失败') + ', id=' + msgSender.idClient)
				}
			},
			global() {
				console.log(app.globalData)
			},
			msgDb(){
				console.log(app.msgDb())
				let msgList = app.msgDb().p2p.msgList
				app.msgDb().methods.msgListSort(msgList)
			}
		},
	}
</script>

<style>

</style>
