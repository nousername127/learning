const baseUrl = 'http://121.199.32.226:8081'
const huanUrl = "http://huangdevuser.vaiwan.com"

const api = {
	register: baseUrl + '/register/register',
	login: baseUrl + '/register/login',
	copyMsg: baseUrl + '/message/save',
	friendList: baseUrl + '/follow/friendlist',
	msgList: baseUrl + '/message/history'
}

export default api