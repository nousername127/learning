<script>
	import v1 from './api/v1.js'
	import v2 from './api/v2.js'
	import NIM from './utils/NIM_Web_NIM_v8.7.0.js'

	function startNimServe(token, account) {
		return new Promise((resolve, reject) => {
			var data = {};
			// 注意这里, 当引入的SDK文件是NIM_Web_NIM_v.js时，请通过 NIM.getInstance 来初始化；当引入的SDK文件为NIM_Web_SDK_v时，请使用 SDK.NIM.getInstance 来初始化。SDK文件的选择请参见集成方式。
			var nim = NIM.getInstance({
				debug: true, // 是否开启日志，将其打印到console。集成开发阶段建议打开。
				appKey: 'cdff8af3157e15a2e4e7a948a6077b19',
				account,
				token,
				db: true, //若不要开启数据库请设置false。SDK默认为true。
				// privateConf: {}, // 私有化部署方案所需的配置
				onconnect: (res) => {
					console.log('连接成功::回调消息', res);
				},
				onwillreconnect: (obj) => {
					// 此时说明 SDK 已经断开连接, 请开发者在界面上提示用户连接已断开, 而且正在重新建立连接
					console.log('即将重连');
					console.log(obj.retryCount);
					console.log(obj.duration);
				},
				ondisconnect: (error) => {
					// 此时说明 SDK 处于断开状态, 开发者此时应该根据错误码提示相应的错误信息, 并且跳转到登录页面
					console.log('丢失连接');
					console.log(error);
					if (error) {
						switch (error.code) {
							// 账号或者密码错误, 请跳转到登录页面并提示错误
							case 302:
								break;
								// 重复登录, 已经在其它端登录了, 请跳转到登录页面并提示错误
							case 417:
								break;
								// 被踢, 请提示错误后跳转到登录页面
							case 'kicked':
								break;
							default:
								break;
						}
					}
				},
				onerror: (error) => {
					console.log(error);
				},
				onroamingmsgs: function(obj) {
					console.log('收到漫游消息', obj);
					pushMsg(obj.msgs);
				},
				onofflinemsgs: function onOfflineMsgs(obj) {
					console.log('收到离线消息', obj);
					pushMsg(obj.msgs);
				},
				onmsg: function onMsg(msg) {
					console.log('收到消息', msg.scene, msg.type, msg);
					switch (msg.type) {
						case 'custom':
							onCustomMsg(msg);
							break;
						case 'notification':
							// 处理群通知消息
							onTeamNotificationMsg(msg);
							break;
							// 其它case
						default:
							break;
					}
				}
			})
			resolve(nim)
		})
	}



	export default {

		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
			this.api_register()
			this.api_login()
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData: {
			token: '',
			userInfo:{},
			msgList:[],
			msgGroupList:{}
		},
		NimInstance: {},

		methods: {
			v1() {
				return v1
			},
			v2() {
				return v2
			},
			post(api, data) {
				let handleData = {
					method: 'POST',
					api: api,
					data: data
				}
				console.log('NetWork Handle::', handleData)
				return new Promise((resolve, reject) => {
					uni.request({
						url: api,
						data: data,
						header: {
							'Authorization': this.globalData.token
						},
						method: 'POST',
						success: (res) => {
							if (res.statusCode !== 200) {
								console.log('statusCode!=200');
								uni.showToast({
									title: '网络繁忙',
									icon: 'loading',
									duration: 1000,
									mask: true,
								});
							} else {
								console.log(typeof(res.data))
								resolve(res)
							}
						},
						fail: (res) => {
							reject(res)
							uni.showToast({
								title: '网络繁忙',
								icon: 'loading',
								duration: 1000,
								mask: true,
							})
						},
					})
				})
			},
			get(api) {
				let handleData = {
					method: 'GET',
					api: api
				}
				console.log('NetWork Handle::', handleData)
				return new Promise((resolve, reject) => {
					uni.request({
						url: api,
						header: {
							'Authorization': this.globalData.token
						},
						method: 'GET',
						success: (res) => {
							if (res.statusCode !== 200) {
								console.log('statusCode!=200');
								uni.showToast({
									title: '网络繁忙',
									icon: 'loading',
									duration: 1000,
									mask: true,
								});
							} else {
								resolve(res)
							}
						},
						fail: (res) => {
							reject(res)
							uni.showToast({
								title: '网络繁忙',
								icon: 'loading',
								duration: 1000,
								mask: true,
							})
						},
					})
				})
			},

			// 注册请求
			api_register() {
				let user = {
					mobile: '17395729012',
					password: 'password233',
					username: 'username233'
				}
				// this.post(v1.register, mock).then((resolve, reject) => {
				// 	console.log(resolve)
				// })
			},

			// 登陆请求
			api_login(username, password) {
				return new Promise((resolve, reject) => {
					let data = {
						password,
						username
					}
					this.post(this.v1().login, data).then(res => {
						console.log(res)
						this.globalData.userInfo = res.data.data.user
						this.globalData.token = res.data.data.token
						resolve(res)
					})
				})
			},

			NimStart(token, userId) {
				startNimServe(token, userId).then(nim => {
					this.NimInstance = nim
					console.log('全局nim实例', this.NimInstance)
				})
			},
			msgDb: () => {
				return {
					
					msgListSort: (msgList) => {
						let timeStampList = msgList.map(item => {
							return item.time
						})
						timeStampList.sort().reverse()
						let sortedList = []
						timeStampList.map(time => {
							msgList.map(item => {
								if (item.time == time) {
									sortedList.push(item)
								}
							})
						})
						return sortedList
					},
					
					
					
				}
			},
			
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	@import "colorui/main.css";
	@import "colorui/icon.css";
</style>
