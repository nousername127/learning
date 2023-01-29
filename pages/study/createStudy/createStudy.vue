<template>
	<view>
		<u-form :model="form">
			<view class="cu-form-group margin-top">
				<view class="title">学习标签</view>
				<input placeholder="请输入" name="input" @input="getRoomName"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">普通选择</view>
				<picker @change="selectTime" :value="this.form.time" :range="picker">
					<view class="picker">
						{{this.form.time?this.form.time.title:'请选择'}}
					</view>
				</picker>
			</view>
		</u-form>
		<view class="cu-bar bg-white" style="margin-top: 20rpx;">
			<view class="action">
				<text class="cuIcon-titles text-green"></text>
				<text class="text-xl text-bold">选择好友</text>
			</view>
		</view>
		<view class="friendList">
			<view class="item" v-for="(item,index) in friendSelectList">
				<view class="left">
					<image :src="item.avatar" mode="aspectFill"></image>
					<view class="text-xl title">
						{{item.nickname}}
					</view>
				</view>
				<view class="right">
					<view class="lg text-gray" :class="!item.checked?'cuIcon-round':'cuIcon-roundcheckfill'"
						style="font-size: 40rpx;" :style="item.checked?'color:#feb03b':''"
						@click="getSelectFriend(index)">
					</view>
				</view>
			</view>
		</view>
		<view class="padding flex flex-direction">
			<button class="cu-btn margin-tb-sm lg text-white" style="background-color: #feb03b;" @click="submitForm">创建自习室</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					roomname: '',
					time: '',
					friendsList: [],
					isCreater: 1
				},
				picker: ['15分钟', '半个小时', '一小时'],
				timeList: [{
						title: "15分钟",
						value: 900
					},
					{
						title: '半个小时',
						value: 1800
					}, {
						title: '一小时',
						value: 3600
					}
				],
				friendList: [],
				friendSelectList: []
			}
		},
		onLoad() {
			let user=uni.getStorageSync('user')
			console.log(user)
			let that = this
			uni.request({
				url:"http://121.199.32.226:8081/follow/friendlist",
				method:"GET",
				data:{
					userId:user.id
				},
				header:{
					'content-type':'application/json'
				},
				success(res) {
					setTimeout(()=>{
						that.friendSelectList = res.data.data.map((item)=>{
							// this.friendSelectList.push(item)
							let friend = {
									id: item.userId,
									nickname: item.userName,
									avatar: item.userAvatar,
									checked: false
							}
							return friend
						})
					},0)
				}
			})
		},
		methods: {
			getRoomName(e) {
				this.form.roomname = e.detail.value
			},
			selectTime(e) {
				let index = e.detail.value
				this.form.time = this.timeList[index]
			},
			getSelectFriend(index) {
				this.friendSelectList[index].checked = !this.friendSelectList[index].checked
				this.filterFriendList()
			},
			filterFriendList(){
				let friendIds = []
				for (let item of this.friendSelectList) {
					if(item.checked) {
						friendIds.push(item.id)
					}
				}
				this.form.friendsList = friendIds
			},
			submitForm(){
				if(!this.form.roomname) return this.formError()
				console.log({
					createUserId:1,
					tagTitle:this.form.roomname,
					time:this.form.time.value,
					users:this.form.friendsList
				})
				if(!this.form.time) return this.formError()
				// if(this.form.friendsList.length==0)return this.formError()
				uni.request({
					url:'http://121.199.32.226:8082/learnRecord/invite',
					method:'POST',
					data:{
						createUserId:1,
						tagTitle:this.form.roomname,
						time:this.form.time.value,
						users:this.form.friendsList
					},
					header:{
						'content-type': 'application/json'
					},
					success:(res)=>{
						let obj=JSON.stringify(this.form)
						uni.$emit('createRoom', obj)
						uni.switchTab({
							url:"../study",
							success() {
								console.log(1)
							}
						})
					}
				})
				
			},
			formError(){
				uni.showToast({
					title:'请检查是否填写完整',
					icon:'none'
				})
			}
		}
	}
</script>

<style lang="less">
	.friendList {
		width: 100%;
		background-color: #ffffff;
		padding-left: 40rpx;

		.item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 12rpx;
			border-bottom: 2rpx solid #e6e6e6;

			.left {
				display: flex;
				align-items: center;

				image {
					width: 70rpx;
					height: 70rpx;
					border-radius: 10rpx;
				}

				.title {
					margin-left: 14rpx;
					font-size: 30rpx;
				}
			}

			.right {}

		}
	}
</style>
