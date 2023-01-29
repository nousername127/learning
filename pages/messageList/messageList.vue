<template>
	<view>
		<view class="VerticalBox">
			<scroll-view class="VerticalMain" scroll-y scroll-with-animation bindscroll="">
				<view class="">
					<view class="cu-list menu-avatar">
						<view class="cu-item" v-for="(item,index) in friendList" @click="tochat(item.userId)">
							<view class="cu-avatar radius lg" :style="`background-image:url(${item.userAvatar});`">
							</view>
							<view class="content">
								<view class="text-pink">
									<text class="text-cut">{{item.userName}}</text>
								</view>
								<view class="text-gray text-sm flex">
									<text class="text-cut">{{item.msg}}</text>
								</view>
							</view>
							<view class="action">
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	let app = getApp()
	export default {
		data() {
			return {
				friendList: [],
			};
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: '消息'
			});

		},
		onShow() {
			this.getMessageList();
		},
		methods: {
			tochat(userId) {
				uni.navigateTo({
					url: `../chatroom/private/private?userId=${userId}`
				})
			},
			getFriendList() {
				return new Promise((resolve) => {
					let url = `${app.v1().friendList}?userId=${app.globalData.userInfo.id}`
					app.get(url).then(res => {
						let friendList = res.data.data
						friendList.map((item, index) => {
							item.msg = ''
							this.$set(this.friendList, index, item)
						})
						console.log('getFriend')
						resolve('done')
					})
				})
			},
			getMessageList() {
				this.getFriendList().then(e => {
					console.log('getMsg')
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
						this.friendList.map((item, index) => {
							this.$set(this.friendList[index], 'msg', JSON.parse(msgGroupList[item
										.userId][0]
									.detail)
								.msg)
						})
					})
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
