import NProgress from 'nprogress/nprogress'
import 'nprogress/nprogress.css'
import axios from 'axios'
const getToken = () => 'fake-token'

NProgress.configure({
    template:
        '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
})
// axios实例
const service = axios.create({
    timeout: 5000 // request timeout
})

// 请求的拦截器
service.interceptors.request.use(async config => {
    NProgress.start()
    const token = await getToken()
    // token正常, 设置授权头并请求
    if (token) {
        config.headers['Authorization'] = token.value
    }
    return config
})

// 响应拦截器
service.interceptors.response.use(
    response => {
        NProgress.done()
        return response
    },
    error => {
        console.log(error)
        NProgress.done()
        return Promise.reject(error)
    }
)

// 返回axios实例
export default service
