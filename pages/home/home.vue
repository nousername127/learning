<template>
	
	<view class="bg-gradual-blue">
		<scroll-view scroll-y class="DrawerPage" :class="modalName=='viewModal'?'show':''">
			<cu-custom bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block>
				<block slot="content">全屏抽屉</block>
			</cu-custom>			
			<view class='padding margin text-center'>
				<view class='cu-btn bg-green lg block shadow radius margin-xl' @tap="showModal" data-target="viewModal">
					打开抽屉
				</view>
			</view>
			<view class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg">
				<view class="cu-item arrow" v-for="(item,index) in 20" :key="index">
					<view class="content">
						<text class="cuIcon-github text-grey"></text>
						<text class="text-grey">{{index +1}}</text>
					</view>
				</view>
			</view>
			
			<view style="background-color: #FFFFFF;">
				
				<view class="cu-bar search bg-white">
					<view class="cu-avatar round" style="background-image:url(../../static/img/applogo.png);"></view>
					<view class="search-form round">
					  <text class="cuIcon-search"></text>
					  <input type="text" placeholder="搜索" confirm-type="search"></input>
					</view>
					<view class="action">
					  <!-- <text>广州</text>
					  <text class="cuIcon-triangledownfill"></text> -->
					  <image src="../../static/img/add1.png" style="width: 30px; height:30px"></image>
					</view>
				</view>
				
				<view style="width:95%;margin: 5px auto;">
			
					<u-swiper :list="list"></u-swiper>
					
					<!-- 自习室模块 -->
					<view class="tabs">
						<view class="line"></view>
						<view class="tab-title">自习室</view>
						<view class="tab-more">></view>
					</view>
					
					<view class="cards">
						
						<view class="study-room" v-for="(item,index) in studyRooms">
							<view class="cu-card case">
							  <view class="cu-item shadow">
							    <view class="image">
							      <image :src="item.imgSrc" mode="widthFix"></image>
							    </view>
							    <view class="card-title">
									{{item.title}}
								</view>
								<view class="card-bottom">
									<view class="highlight-block">
										{{item.personNum}}人/{{item.limitNum}}人
									</view>
									<view class="study-time">{{item.hour}} </view>
								</view>
							  </view>
							
							</view>
						</view>
			
					</view>
					
					<view class="tabs">
						<view class="line"></view>
						<view class="tab-title">讨论室</view>
						<view class="tab-more">></view>
					</view>
					
					<view>
						<view class="disc-room" v-for="(item,index) in discRooms">
							<view class="disc-top">
								<view class="highlight-block">正在讨论</view>
								<view class="disc-title">{{item.title}}</view>
							</view>
							<view class="hot-disc">
								<view class="username">{{item.hotUser}}。</view>:
								<view class="disc-content">{{item.hotCom}}</view>
							</view>
							<view class="host">
								<image :src="item.imgSrc"></image>
								<view class="host-name">{{item.hostUser}}</view>
								<view class="start">发起</view>
								<view class="disc-num">{{item.discNum}}人正在讨论</view>
							</view>
						</view>
					</view>
					
				</view>
				
			</view>
			
			
			
			
			<view class='padding margin text-center'>
				<view class='cu-btn bg-green lg block shadow radius margin-xl' @tap="showModal" data-target="viewModal">
					打开抽屉
				</view>
			</view>
		</scroll-view>
		<view class="DrawerClose" :class="modalName=='viewModal'?'show':''" @tap="hideModal">
			<text class="cuIcon-pullright"></text>
		</view>
		<scroll-view scroll-y class="DrawerWindow" :class="modalName=='viewModal'?'show':''">
			<view class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg">
				<view class="cu-item arrow" v-for="(item,index) in 20" :key="index">
					<view class="content">
						<text class="cuIcon-github text-grey"></text>
						<text class="text-grey">{{index +1}}</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
	
	
	
	
	
	
	
	
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					image: 'https://cdn.uviewui.com/uview/swiper/1.jpg'
				},
				{
					image: 'https://cdn.uviewui.com/uview/swiper/2.jpg'
				},
				{
					image: 'https://cdn.uviewui.com/uview/swiper/3.jpg'
				}],
				studyRooms:[
					{
						imgSrc:"https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
						title:"标题11111111111111",
						personNum:"13",
						limitNum:"30",
						hour:"3小时"
					},
					{
						imgSrc:"https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
						title:"标题2222222222222",
						personNum:"7",
						limitNum:"30",
						hour:"5小时"
					},
					{
						imgSrc:"https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
						title:"标题33333333",
						personNum:"13",
						limitNum:"30",
						hour:"3小时"
					}
				],
				discRooms:[
					{
						title:"。。。。。",
						hotUser:"广西。。",
						hotCom:"螺蛳粉",
						imgSrc:"../../static/img/applogo.png",
						hostUser:"user",
						discNum:"13"
					},
					{
						title:",,,,,,,,,,",
						hotUser:"广西。。",
						hotCom:"螺蛳粉",
						imgSrc:"../../static/img/applogo.png",
						hostUser:"user",
						discNum:"13"
					}
				],
				modalName:null
			}
		},
		methods: {
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			}
		}
	}
</script>

<style>
	@import url("./home.css");
	page {
		background-image: var(--gradualBlue);
		width: 100vw;
		overflow: hidden;
	}
	
	.DrawerPage {
		position: fixed;
		width: 100vw;
		height: 100vh;
		left: 0vw;
		background-color: #f1f1f1;
		transition: all 0.4s;
	}
	
	.DrawerPage.show {
		transform: scale(0.9, 0.9);
		left: 85vw;
		box-shadow: 0 0 60upx rgba(0, 0, 0, 0.2);
		transform-origin: 0;
	}
	
	.DrawerWindow {
		position: absolute;
		width: 85vw;
		height: 100vh;
		left: 0;
		top: 0;
		transform: scale(0.9, 0.9) translateX(-100%);
		opacity: 0;
		pointer-events: none;
		transition: all 0.4s;
		padding: 100upx 0;
	}
	
	.DrawerWindow.show {
		transform: scale(1, 1) translateX(0%);
		opacity: 1;
		pointer-events: all;
	}
	
	.DrawerClose {
		position: absolute;
		width: 40vw;
		height: 100vh;
		right: 0;
		top: 0;
		color: transparent;
		padding-bottom: 30upx;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		background-image: linear-gradient(90deg, rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.6));
		letter-spacing: 5px;
		font-size: 50upx;
		opacity: 0;
		pointer-events: none;
		transition: all 0.4s;
	}
	
	.DrawerClose.show {
		opacity: 1;
		pointer-events: all;
		width: 15vw;
		color: #fff;
	}
	
	.DrawerPage .cu-bar.tabbar .action button.cuIcon {
		width: 64upx;
		height: 64upx;
		line-height: 64upx;
		margin: 0;
		display: inline-block;
	}
	
	.DrawerPage .cu-bar.tabbar .action .cu-avatar {
		margin: 0;
	}
	
	.DrawerPage .nav {
		flex: 1;
	}
	
	.DrawerPage .nav .cu-item.cur {
		border-bottom: 0;
		position: relative;
	}
	
	.DrawerPage .nav .cu-item.cur::after {
		content: "";
		width: 10upx;
		height: 10upx;
		background-color: currentColor;
		position: absolute;
		bottom: 10upx;
		border-radius: 10upx;
		left: 0;
		right: 0;
		margin: auto;
	}
	
	.DrawerPage .cu-bar.tabbar .action {
		flex: initial;
	}
</style>
