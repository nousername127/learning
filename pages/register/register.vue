<template>
	<view>
		<view style="font-size: 40rpx; width: 160rpx; margin: 5rpx auto">用户注册</view>
		<u-form :model="form" ref="uForm">
			<u-form-item label="用户名" label-width="150rpx" label-align="center" prop="username">
				<u-input v-model="form.username" />
			</u-form-item>
			<u-form-item label="手机号" label-width="150rpx" label-align="center" prop="mobile">
							<u-input v-model="form.mobile" />
			</u-form-item>
			<u-form-item label="密码" label-width="150rpx" label-align="center" prop="password">
				<u-input v-model="form.password" type="password" />
			</u-form-item>
			<u-form-item label="重复密码" label-width="150rpx" label-align="center" prop="password">
				<u-input v-model="second_password" type="password" />
			</u-form-item>
			<u-form-item style="display: flex">
				<view style="margin-left: 20rpx; margin-right: 20rpx"> 头像 </view>
				<view class="u-avatar-wrap">
					<image class="u-avatar-demo" :src="this.form.avatarUrl" mode="aspectFill"></image>
				</view>
				<u-button @tap="chooseAvatar" class="cutButton">选择图片</u-button>
			</u-form-item>
		</u-form>
		<u-button @click="submit">注册</u-button>
	</view>
</template>

<script>
	// 传图模块
	import {
		client,
		getFileNameUUID
	} from "../../utils/oss";

	function Upload(fileObj) {
		return new Promise((resolve, reject) => {
			const temporary = fileObj.name.lastIndexOf(".")
			const fileNameLength = fileObj.name.length
			const fileFormat = fileObj.name.substring(temporary + 1, fileNameLength)
			const fileName = getFileNameUUID() + "." + fileFormat
			client().multipartUpload(`userAvater/${fileName}`, fileObj)
				.then((res) => {
					let obj = {
						code:200,
						url:res.res.requestUrls[0]
					}
					resolve(obj)
				})
				.catch((err) => {
					console.log("err:", err);
					reject(err)
				});
		})
	}
const app =getApp()

	export default {
		data() {
			return {
				form: {
					username: "",
					password: "",
					avatarUrl:"https://cdn.uviewui.com/uview/common/logo.png",
					mobile:""
				},
				avatarUrl: "https://cdn.uviewui.com/uview/common/logo.png",
				second_password:"",
				errorType: ["message"],
				rules: {
					name: [{
							required: true,
							message: "此为必填字段",
							// blur和change事件触发检验
							trigger: ["blur", "change"],
						},
						// 正则判断为字母或数字
						{
							pattern: /^[0-9a-zA-Z]*$/g,
							// 正则检验前先将值转为字符串
							transform(value) {
								return String(value);
							},
							message: "只能包含字母或数字",
						},
						// 6-8个字符之间的判断
						{
							min: 6,
							max: 8,
							message: "长度在6-8个字符之间",
						},
					],
					password: [{
						required: true,
						message: "请输入密码",
						trigger: ["blur", "change"],
					}, ],
				},
			};
		},
		created() {
		},
		methods: {
			chooseAvatar() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						Upload(res.tempFiles[0]).then(res=>{
							console.log(res)
							if(res.code==200){
								this.form.avatarUrl = res.url
							}
						})
					}
				})
			},
			submit() {
				console.log(app)
				if(!this.second_password || this.second_password!=this.form.password){
					uni.showToast({
						title:'两次密码不同',
						icon:"error"
					})
					return
				}else{
					console.log(app.v1().register)
					app.post(app.v1().register,this.form)
					.then(res=>{
						if(res.data.status==10000){
							uni.showToast({
								title:'注册成功',
								icon:'success'
							})
							setTimeout(()=>{
								uni.navigateTo({
									url:'../login/login'
								})
							}),1500
						}
					})
				}
			},
			onReady() {
			},
		},
	};
</script>

<style>
	.u-avatar-wrap {
		display: flex;
		width: 80rpx;
		height: 80rpx;
		margin-left: 20rpx;
		text-align: center;
	}

	.u-avatar-wrap image {
		width: 100%;
		height: 100%;
	}

	.cutButton {
		width: 200rpx;
		margin: 0 auto 0 50rpx;
	}
</style>
