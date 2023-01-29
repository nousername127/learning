
<template>
	<view class="time-distribution">
		<view class="table">
			<mpvue-echarts style="background-color: rgba(255,255,2,0);" :echarts="echarts" :onInit="pieInit" canvasId="time-pie" ref="pieChart" />
		</view>
		<view class="content">
			<view class="total-time">
				总计：{{totalTime}}
			</view>
			<view class="details">
				
				<view class="detail" v-for="(item,index) in timeData" >
					
					<view class="dot" :style="{background:colorList[index%6]}"></view>
					<view class="name">{{item.name}}</view>
					<view class="value">{{item.value}}</view>
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	import * as echarts from '../echarts/components/echarts/echarts.min.js';
	import mpvueEcharts from '../echarts/components/mpvue-echarts/src/echarts.vue'

	export default {
		data() {
			return {
				echarts: echarts,
				totalTimeData: 560,
				totalTime:"",
				timeData:[
					{value: 1048, name: '高等数学'},
					{value: 735, name: '线性代数'},
					{value: 580, name: '概率论'},
					{value: 484, name: '大学物理'},
					{value: 300, name: '数据结构'},
					{value: 1000, name: '马原'},
				],
				timeList:[],
				colorList:[
					"#3fb1e3",
					"#6be6c1",
					"#626c91",
					"#a0a7e6",
					"#c4ebad",
					"#96dee8"
				]
			}
		},
		created() {
			var that = this
			let total = that.data.totalTimeData
			let hour = item.value/60;
			let min = item.value%60;
			console.log(123)
			let tmp = []
			for(item in this.data.timeData){
				let hour = item.value/60;
				let min = item.value%60;
				tmp.push({
					name:item.name,
					Proportion: item.value/total,
					time:hour?hour+'时'+min+'分':min+'分'
				})
			}
			that.setData({
				timeList:tmp
			})
		},
		onShow() {
			console.log('show')
			let user=uni.getStorageSync('user')
			
			var myDate = new Date();
			var that=this;
			myDate.toLocaleDateString();   
			console.log(myDate);
			uni.request({
				url:'http://huangdevstudy.vaiwan.com/learnRecord/get',
				method:"GET",
				data:{
					date:new Date(),
					userId:user.id
				},
				success(res) {
					console.log(res)
					this.res.data.data.count
				}
			})
		},
		methods: {
			pieInit(canvas, width, height) {
				let pieOption = {
					backgroundColor:'rgba(255,255,255,0.0)',
					grid:{
						top:0
					},
					color:this.colorList,
					series: [
						{
							name: '时间分布',
							type: 'pie',
							radius: '60%',
							center:['50%','40%'],
							data: this.timeData,
							emphasis: {
								itemStyle: {
									shadowBlur: 10,
									shadowOffsetX: 0,
									shadowColor: 'rgba(0, 0, 0, 0.5)'
								}
							}
						}
					]
				};
				let pieChart = echarts.init(canvas, null, {
					width: width,
					height: height,
				})
				canvas.setChart(pieChart)

				pieChart.setOption(pieOption)
				return pieChart
			},
			onShow(){
				var myDate = new Date();
				myDate.toLocaleDateString();   
				console.log(myDate);
				uni.request({
					url:'http://121.199.32.226:8082/learnRecord/get',
					method:"GET",
					data:{
						date:"",
						userId:1
					}
				})
			}
		},
		components: {
			mpvueEcharts
		}
	}
</script>

<style lang="scss">
	.time-distribution{
		width: 100%;
		height: 100%;
		padding: 10rpx;
	}
	.table{
		width:100%;
		height:300rpx;
		margin-top: 20rpx;
		background-color: rgba($color: #000000, $alpha: 0.0);
	}
	.content{
		font-size: 32rpx;
	}
	.content .total-time{
		text-align: center;
		margin-bottom: 10rpx;
	}
	.content .details{
		overflow: auto;
		width: 100%;
		height: 100%;
	}
	.detail{
		display: inline;
		float: left;
		height: 100rpx;
		width: 50%;
		margin: 0;
		line-height: 100rpx;
	}
	.detail .dot{
		float: left;
		margin: 40rpx 20rpx;
		width: 20rpx;
		height: 20rpx;
		border-radius: 10rpx;
	}
	.detail .name{
		width: 50%;
		float: left;
		
	}
	.detail .value{
		width: 20%;
		float: right;
	}
</style>

