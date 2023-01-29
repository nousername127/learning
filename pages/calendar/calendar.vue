<template>

	<view>
		<view>
			<u-field v-model="name" label="名称" placeholder="请输入todo名称" required :error-message="errorMessage"
				border-bottom="true" border-top="true" style="font-size: 40rpx;" @focus="focus"></u-field>
		</view>

		<u-calendar v-model="calendarShow" :mode="mode" min-date="" max-date="3000-12-31" @change="change"></u-calendar>
		<view class="buttonCalen">
			<u-button @click="calendarShow = true" style="height: 100rpx;">
				<view class="calendar">
					<view class="calenImg">
						<image src="../../static/img/calendar.png"></image>
					</view>
					<view>
						日期
					</view>
					<view class="date">{{date}}</view>
				</view>
			</u-button>
		</view>

		<view class="buttonTime">
			<u-button @click="timeShow = true" style="height: 100rpx;">
				<view class="time">
					<view class="timeImg">
						<image src="../../static/img/calendar.png"></image>
					</view>
					<view>
						时间
					</view>
					<view class="setTime">{{time}}</view>
				</view>
			</u-button>
		</view>

		<u-picker mode="time" v-model="timeShow" :params="params" @confirm="confirm"></u-picker>

		<!-- <view>
			<u-field type="textarea" v-model="mobile" label="备注" placeholder="请输入todo备注" border-bottom="true"
				border-top="true" style="font-size: 40rpx;"></u-field>
		</view> -->

<button @click="add()">确认</button>

	</view>
</template>

<script>
	import api from '../../api/v1.js'
	export default {
		data() {
			return {
				params: {
					year: false,
					month: false,
					day: false,
					hour: true,
					minute: true,
					second: false
				},
				timeShow: false,
				calendarShow: false,
				mode: 'date',
				date: " ",
				name: "",
				day:"",
				month:"",
				year:"",
				hour:"",
				minute:"",
				errorMessage:" ",
				time:""
			}
		},
		methods: {
			focus(){
				this.errorMessage=""
			},
			change(e) {
				console.log(e);
				this.date = e.result
			},
			confirm(e) {
				console.log(e);
				this.hour=e.hour;
				this.minute=e.minute;
				this.time = e.hour + "时" + e.minute + "分"
			},
			add(){
				// var data={
				// 	"userId":"1",
				// 	"content":"123"
				// }
				// this.post(api.addTodo,data).then((resolve,reject)=>{
				// 	console.log(resolve)
				// });
				if(this.name==null||this.name==''){
					this.errorMessage="名称不能为空"
					return;
				}
				
				uni.request({
					url:'http://121.199.32.226:8082//todolist/add',
					method:'POST',
					data:{
						userId:1,
						content:this.name,
						deadline:this.date,
						id:5,
						state:0
					},
					header:{
						'content-type': 'application/json'
					},
					success:(res)=>{
						// console.log(666)
						
						console.log('su')
						// console.log(this.todolist)
						uni.navigateBack()
					}
				})
			},
			
		}
	}
</script>

<style>
	button {
		margin-top: 20rpx;
	}

	.calendar {
		display: flex;
		width: 600rpx;
		margin: 0 0 20rpx -100rpx;
	}

	.calenImg image {
		margin: 50rpx 0 0 20rpx;
		width: 70rpx;
		height: 70rpx;
		/* margin-left: 15rpx; */
	}

	.calendar view:nth-child(2) {
		font-size: 40rpx;
		margin: 50rpx 0 0 10rpx
	}

	.date {
		font-size: 45rpx;
		margin: 50rpx -100rpx 0 auto;
	}

	.time {
		display: flex;
		width: 600rpx;
		margin: 50rpx 0 20rpx -60rpx;
	}

	.timeImg image {
		/* 	margin: 0 0 0 0; */
		width: 70rpx;
		height: 70rpx;
		/* margin-left: 15rpx; */
	}

	.time view:nth-child(2) {
		font-size: 40rpx;
		margin: 0 0 0 10rpx
	}

	.setTime {
		font-size: 45rpx;
		margin: 0 -80rpx 0 auto;
	}

</style>
