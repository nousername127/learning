<template>
	<view>
		<!-- <view style="font-size: 50rpx;"><</view> -->
		<!-- <view class="">
			<image src="../../static/img/return.png" mode="" @click="TurnBack" style="width: 32px;height: 32px;"></image>
		<view class="add" @click="ChangeUrl">
			+
		</view> -->
		
		<view style="display: flex;padding-top: 30rpx;background-color: #FFFFFF;">
			<view></view>
			<view class="tabs">
				Todo
			</view>
			<view class="more" @click="newTodo">+</view>
		</view>
		
		<view class="title">
			<text>今日待办</text>
			<!-- <view class="line"> -->
			<!-- </view> -->
		
		</view>
		
		
		<view class="thing" >
			<!-- <view class="thingOne" v-for="(item,index) in todolist" :key="index"> -->

				<u-swipe-action :show="item.show"  @click="click(index)" @open="open(index)" :options="options" class="thingOne" v-for="(item,index) in todolist" :key="item.id">
					
					<u-checkbox-group @change="checkboxGroupChange">
						<u-checkbox
							@change="checkboxChange" 
							:name="item.id"
							v-model="item.state" 
							class="del" 
							label-size="40rpx" 
							style="text-align: center;margin: 25rpx;margin-left: 40rpx;"
							>
							{{item.content}}
						</u-checkbox>
					</u-checkbox-group>
					
				</u-swipe-action>

			<!-- </view> -->
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				todolist:[],
				ischeck:true,
				Checkyet:[
					{
					Style1:"width: 70rpx;height: 70rpx;"
				}
					
				],
				options: [
					{
						text: '删除',
						style: {
							backgroundColor: '#dd524d'
						}
					}
				]
			};
		},
		onShow() {
			console.log(123)
			uni.request({
				url:'http://121.199.32.226:8082/todolist/getList',
				method:'GET',
				data:{
					userId:1
				},
				header:{
					'content-type': 'application/json'
				},
				success:(res)=>{
					console.log(666)
					
					console.log(res.data.data.todoList)
					// this.$set('todolist',res.data.data.todoList)
					this.todolist=res.data.data.todoList.map(item=>{
						item.state= item.state==0 ? false:true
						return item
					})
					console.log(this.todolist)
				}
			})
		},
		methods:{
			click(index) {
				console.log("删除")
				console.log(this.todolist[index].id)
				uni.request({
					url:'http://121.199.32.226:8082/todolist/delete/'+this.todolist[index].id,
					method:'POST',
					data:{
						// id:this.todolist[index].id
					},
					header:{
						'content-type': 'application/json'
					},
					success:(res)=>{
						console.log(this.todolist[index].id)
						console.log('修改成功')
						this.todolist.splice(index,1);
					}
				})
				// if(index1 == 1) {
					//this.todolist.splice(index,1);
					// this.$u.toast(`删除了第${index}个cell`);
					console.log("了")
				// } else {
				// 	this.list[index].show = false;
				// 	this.$u.toast(`收藏成功`);
				// }
			},
			open(index) {
				// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
				// 原本为'false'，再次设置为'false'会无效
				this.todolist[index].show = true;
				this.todolist.map((val, idx) => {
					if(index != idx) this.list[idx].show = false;
				})
			},
			checkboxChange(e) {

				var item = this.todolist.find((i)=>i.id==e.name)
				uni.request({
					url:'http://121.199.32.226:8082/todolist/update',
					method:'POST',
					data:{
						id:item.id,
						userId: item.userId,
						content:item.content,
						state:item.state?0:1,
						deadline:item.deadline
					},
					header:{
						'content-type': 'application/json'
					},
					success:(res)=>{
						console.log('修改成功')
					}
				})
			},
			// 选中任一checkbox时，由checkbox-group触发
			checkboxGroupChange(e) {
				// console.log(e);
			},
			TurnBack(){  //点击返回上一页
				console.log('返回了！')
			},
			ChangeUrl(){
				uni.navigateTo({
					url:"../calendar/calendar"
				})
			},
			Finished(){
				console.log('完成了!')
				ischeck=!ischeck
			},
			addTime(){
				console.log('添加时间了！')
			},
			newTodo(){
				uni.navigateTo({
					url:"../calendar/calendar"
				})
			}
		}
	}
</script>

<style lang="scss">
	.title{
		// margin-top: 10rpx;
		margin-bottom: 30rpx;
	}
	.title text{
		width: 350rpx;
		height: 100rpx;
		opacity: 1;
		// border: 1rpx solid #f1ae29;
		font-size: 75rpx;
		font-family: SimHei, SimHei-Regular;
		font-weight: 800;
		text-align: left;
		color: #f1ae29;
		letter-spacing: 1rpx;
		position: absolute;
		left: 40rpx;
		top: 120rpx;
	}
	 .add{
		font-size: 80rpx;
		font-family: SimHei, SimHei-Regular;
		position: absolute;
		left: 660rpx;
		top: -10rpx;
	}
	.line{
		width: 750rpx;
		height: 1rpx;
		opacity: 0.5;
		border: 1rpx dashed #626262;
		box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.16); 
		position: absolute;
		top: 160rpx;
		
	}
	.thing{
		width: 100%;
		padding: 6rpx;
		position: absolute;
		top: 220rpx;
	}
	.thingOne{
		width: 100%;
		height: 110rpx;
		// background-color: blue;
		border-bottom: 1px solid;
		border-color: rgba(151, 151, 151, 0.3)
	}
	
	.thingOne .control-active{
		opacity: 0.6;
		font-size: 50rpx;
		font-weight: 400;
		color: #8d8d90;
		letter-spacing: 1px;
	}
	.thingOne .del{	
		font-size: 50rpx;
		font-weight: 540;
		color: #000000;
		letter-spacing: 1px;
		
	}
	.other{
		width: 80rpx;
		height: 80rpx;
		opacity: 0.51;
		background: rgba(0,0,0,0.00);
		position: absolute;
		top: 23rpx;
		left: 630rpx;
	}
	.check{
		width: 70rpx;
		height: 70rpx;
		position: absolute;
		top: 30rpx;
		left: 30rpx;
	}
	.timeadding{
		width: 600rpx;
		height: 600rpx;
		// opacity: 0.7;
		background: rgba(255,255,255,0.79);
		border: 1px solid #707070;
		border-radius: 10px;
		position: absolute;
		top: 110rpx;
		left: 120rpx;
		
	}
	.timeadding text{
		width: 200rpx;
		height: 80rpx;
		opacity: 0.9;
		// border: 1px solid #060606;
		font-size: 70rpx;
		font-family: Microsoft YaHei, Microsoft YaHei-Regular;
		font-weight: 600;
		text-align: left;
		color: #000000;
		letter-spacing: 2px;
		position: absolute;
		
	}
	.timeadding image{
		width: 70rpx;
		height: 70rpx;
		position: absolute;
		left: 40rpx;
	}
	.tabs {
		width: 150rpx;
		margin: 0 auto;
		font-size: 40rpx;
		font-weight: 700;
		color: #000000;
		margin: 10rpx auto;
		text-align: center;
	}
	
	
	.more {
		position: fixed;
		width: 80rpx;
		height: 80rpx;
		font-size: 80rpx;
		text-align: center;
		right:0;
		top:20rpx;
	}


</style>
