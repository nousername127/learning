<template>
	<view>
		<view class="">
			<image src="../../static/img/return.png" mode="" @click="TurnBack" style="width: 32px;height: 32px;"></image>
			<text>添加朋友</text>
			<view class="search">
				<u-input v-model="value" :type="type" :border="border" />
				<!-- <text style="width: 72px;height: 22px;opacity: 1;font-size: 17px;font-family: Segoe UI, Segoe UI-Regular;font-weight: 400;text-align: left;color: #8e8e93;letter-spacing: 0px; position: relative;left: 22px;top: 8px;">ID/用户名</text> -->
			</view>
			<view class="interest" >
				<text style="font-weight: 520;position: relative;left: 15px;top: 35px;letter-spacing: 2rpx;">你可能感兴趣的人</text>
				<text style="color: #C8C8C8;position: relative;left: 130px;top: 35px;" @click="checkmore">查看更多></text>
				<view class="someperson" v-for="(item,index) in list" :key="index">
					<view class="person" :style="item.style1">
						
						<image :src="item.pic" mode="" ></image>
						<text>{{item.name}}</text>
						<text class="briefintro">一个热爱学习的人balala...</text>
						<!-- <button type="default"></button> -->
						<u-button @click="ChangeColor1(index)" :class="{button2:item.flag1, button1:!item.flag1}" style="position: absolute;bottom: 10rpx;left: 50rpx;letter-spacing: 10rpx;">关注</u-button>
					</view>
					
				</view>
				<view class="liked">
					<text style="font-weight: 520;position: absolute;left: 15px;top: 15px;letter-spacing: 2rpx">已关注的人</text>
					<view class="likedperson" :style="item.style2" v-for="(item,index) in ConcernList" :key="index">
						<image :src="item.concerned_pic" mode=""></image>
						<text>{{item.concerned_name}}</text>
						<text class="briefintro2">一个超级喜欢跑步的人啦啦啦</text>
						<u-button :class="{button2:item.flag, button1:!item.flag}" ref='btn1' style="position: absolute;top: 75rpx;left: 570rpx;" @click="ChangeColor(index)">已关注</u-button>
					</view>
					
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[
					{
						pic:"../../static/img/dog.jpg",
						name:"黄师傅1",
						style1:"left: 5rpx;top:5rpx",
						num:0,
						flag1:true,
					},
					{
						pic:"../../static/img/studyback.jpg",
						name:"黄师傅2",
						style1:"left: 250rpx;top:-295rpx",
						num:1,
						flag1:true,
					},
					{
						pic:"../../static/img/learn_record_bg01.jpg",
						name:"黄师傅3",
						style1:"left: 495rpx;top:-595rpx",
						num:2,
						flag1:false,
					},
				],
				ConcernList:[
					{
						concerned_pic:"../../static/img/dog.jpg",
						concerned_name:"tututu呀",
						style2:"left: 10rpx;top: 90rpx;",
						flag:true,
						stuname:'111'
					},
					{
						concerned_pic:"../../static/img/dog.jpg",
						concerned_name:"tututu呀",
						style2:"left: 10rpx;top: 300rpx;",
						flag:true
					},
					{
						concerned_pic:"../../static/img/dog.jpg",
						concerned_name:"tututu呀",
						style2:"left: 10rpx;top: 510rpx;",
						flag:false
					},
					{
						concerned_pic:"../../static/img/dog.jpg",
						concerned_name:"tututu呀",
						style2:"left: 10rpx;top: 720rpx;",
						flag:true
					},
					
				],
				value: '',
				type: 'text',
				border: true,
				// recommender1_pic:"../../static/img/dog.jpg",
				// recommender2_pic:"../../static/img/studyback.jpg",
				// recommender3_pic:"../../static/img/learn_record_bg01.jpg",
				// recommender1_name:"黄师傅1",
				// recommender2_name:"tutuutu",
				// recommender3_name:"papi1",
				
				
			}
		},
		methods: {
			ChangeColor(index){  //点击关注按钮之后按钮会改变颜色（红<--->灰）
				// document.getElementById("Button1").style.backgroundColor='#e6e2d2'
				this.ConcernList[index].flag = !this.ConcernList[index].flag
				// console.log(this.ConcernList)
				var name = this.stuname
				// this.stuname = this.$refs.btn1.$el.innerText;
				// this.$refs.btn1.$el.innerText=name
			},
			ChangeColor1(index){  //点击关注按钮之后按钮会改变颜色（红<--->灰）
				// document.getElementById("Button1").style.backgroundColor='#e6e2d2'
				this.list[index].flag1 = !this.list[index].flag1
				// console.log(this.ConcernList)
				
			},
			checkmore(){ //点击查看更多推荐的人
				
			},
			TurnBack(){  //点击return上一页
				console.log('return了！')
			}
		}
	}
</script>

<style>
	text{
		
		/* width: 80px;
		height: 25px; */
		opacity: 1;
		/* border: 1px solid #050505; */
		font-size: 20px;
		font-family: Microsoft YaHei, Microsoft YaHei-Light ;
		font-weight: bold;
		text-align: left;
		color: #060606;
		position: relative;
		left: 140px;
	}
	.greyBtn{
		background: #a2a6a6;
	}
	.search{
		width: 367px;
		height: 43px;
		opacity: 1;
		background: rgba(142,142,147,0.24);
		border-radius: 10px;
		position: relative;
		left: 28px;
		top: 20px;
	}
	.interest{
		position: relative;
		top: 35rpx;
		height: 227rpx;
		
	}
	.someperson{
		position: relative;
		width: 700rpx;
		height: 300rpx;
		left: 10rpx;
		top: 100rpx;
		/* background-color: #ffaaff; */
	}
	.person{
		position: absolute;
		width: 240rpx;
		height: 350rpx;
		background-color: #ffffff;
		opacity: 0.9;
		
	}
	.person image{
		position: absolute;
		width: 60px;
		height: 60px;
		opacity: 1;
		background: rgba(0,0,0,0.00);
		border-radius: 34px;
		left: 70rpx;
		top: 20rpx;
	}
	.person text{
		position: absolute;
		top: 140rpx;
		left: 70rpx;
		font-size: 35rpx;
		/* text-align: center; */
	}
	.person .briefintro{
		position: absolute;
		top: 195rpx;
		left: 10rpx;
		font-size: 28rpx;
		color: #C6C5C5;
		font-weight: 400;
		text-align: center;
	}
	.button1{
		width: 150rpx;
		height: 60rpx;
		background: #ff0000;
		border: none;
		/* border-radius: 30rpx; */
		font-size: 30rpx;
		letter-spacing: 2rpx;
		color: white;
	
		
	}
	.button2{
		width: 150rpx;
		height: 60rpx;
		background: #949393;
		border: none;
		/* border-radius: 30rpx; */
		font-size: 30rpx;
		letter-spacing: 2rpx;
	
		
	}
	.liked{
		position: absolute;
		width: 750rpx;
		height:500rpx ;
		top: 550rpx;
		/* background-color: #d5a8cf; */
	}
	.likedperson{
		position: absolute;
		background-color:#FFFFFF ;
		width: 730rpx;
		height: 200rpx;
	}
	.likedperson image{
		position: absolute;
		width: 60px;
		height: 60px;
		opacity: 1;
		background: rgba(0,0,0,0.00);
		border-radius: 34px;
		left: 20rpx;
		top: 50rpx;
	}
	.likedperson text{
		width: 200rpx;
		height: 24px;
		font-size: 38rpx;
		font-weight: 800;
		text-align: left;
		color: #000000;
		letter-spacing: 5rpx;
		position: absolute;
		left: 160rpx;
		top: 30rpx;
	}
	.likedperson .briefintro2{
		position: absolute;
		top: 90rpx;
		left: 160rpx;
		font-size: 30rpx;
		color: #949393;
		font-weight: 300;
		text-align: left;
		width: 300rpx;
	}
</style>
