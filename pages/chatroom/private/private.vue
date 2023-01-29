<template>
	<view>
		<scroll-view class="cu-chat" style="padding-bottom: 50px;" scroll-y="true" :scroll-into-view="scrollInto">


			<view v-for="(item,index) in msgList" :id="String(item.time)">


				<view class="cu-item self" v-if="meId==item.fromId">
					<view class="main">
						<view class="content bg-green shadow">
							<text>{{JSON.parse(item.detail).msg}}</text>
						</view>
					</view>
					<view class="cu-avatar radius"
						:style="'background-image:url('+JSON.parse(item.detail).avatar +');'">
					</view>
				</view>

				<view class="cu-item" v-else>
					<view class="cu-avatar radius"
						:style="'background-image:url('+JSON.parse(item.detail).avatar +');'">
					</view>
					<view class="main">
						<view class="content shadow">
							<text>{{JSON.parse(item.detail).msg}}</text>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>

		<view class="cu-bar foot input" :class="InputBottom!=0?'cur':''" style="position: fixed; bottom:0px">
			<view class="action">
				<text class="cuIcon-sound text-grey"></text>
			</view>
			<input class="solid-bottom" bindfocus="InputFocus" bindblur="InputBlur" :adjust-position="false"
				:focus="false" maxlength="300" cursor-spacing="10" @input="tempSaveInput"></input>
			<view class="action">
				<text class="cuIcon-emojifill text-grey"></text>
			</view>
			<button class="cu-btn bg-green shadow" @click="sendMsg">发送</button>
		</view>

	</view>
</template>

<script>
	let app = getApp()
	export default {
		data() {
			return {
				scrollInto: "",
				msgList: [],
				meId: 0,
				receiverId: 0,
				inputMsg: ''
			};
		},
		onLoad(option) {
			uni.setNavigationBarTitle({
				title: '聊天',
			})
			uni.setNavigationBarColor({
				frontColor: '#000000'
			})

			app.NimStart(app.globalData.token, app.globalData.userInfo.id)
			this.receiverId = option.userId
			this.meId = app.globalData.userInfo.id
			console.log(this.$data)
			this.updateMsg()



		},
		methods: {
			tempSaveInput(e) {
				console.log(e)
				this.inputMsg = e.detail.value
				console.log(this.inputMsg)
			},

			sendMsg() {
				let userInfo = app.globalData.userInfo
				let msgItem = {
					name: userInfo.name,
					avatar: userInfo.avatarUrl,
					msg: this.inputMsg,
					type: 'txt'
				}
				var msgSender = app.NimInstance.sendText({
					scene: 'p2p',
					to: this.receiverId,
					text: JSON.stringify(msgItem),
					done: sendMsgDone
				})

				console.log('正在发送p2p text消息, id=' + msgSender.idClient)
				let that = this
				let data = {
					detail: JSON.stringify(msgItem),
					fromId: app.globalData.userInfo.id,
					time: msgSender.time,
					toId: that.receiverId,
					id: null
				}
				that.msgList.push(data)
				that.setScroll(msgSender.time)
				that.inputMsg=""
				function sendMsgDone(error, msgSender) {
					console.log(error)
					console.log(msgSender)
					let data = {
						detail: JSON.stringify(msgItem),
						fromId: app.globalData.userInfo.id,
						time: msgSender.time,
						toId: that.receiverId,
						id: null
					}

					app.post(app.v1().copyMsg, data).then(res => {
						console.log(res)
						if (res.data.status == 10000) {
							console.log('消息同步服务器success')

						} else {
							console.log('消息上传失败')
						}
					})
					console.log('发送' + msgSender.scene + ' ' + msgSender.type + '消息' + (!error ? '成功' : '失败') + ', id=' +
						msgSender.idClient)
				}
			},
			setScroll(time) {
				this.scrollInto = time
			},
			updateMsg() {


				let url = `${app.v1().msgList}/${app.globalData.userInfo.id}`
				app.get(url).then(res => {
					let msgList = res.data.data
					app.globalData.msgList = msgList
					msgList = app.msgDb().msgListSort(msgList)
					let toList_raw = msgList.map(item => {
						return item.toId
					})
					let toList = Array.from(new Set(toList_raw))
					let msgGroupList = {}
					toList.map(item => {
						msgGroupList[String(item)] = msgList.filter(msg => {
							return msg.toId == item || msg.fromId == item
						})
					})
					app.globalData.msgGroupList = msgGroupList
					let msgLists = app.globalData.msgGroupList[this.receiverId]
					msgLists.map((item, index) => {
						this.$set(this.msgList, index, item)
					})
				})

			}
		}
	}
</script>

<style lang="scss">

</style>
