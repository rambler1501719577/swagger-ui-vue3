import request from '../request'
import { serviceList } from '@/setting'

const loadSwaggerDoc = serviceUrl => {
    return request({
        method: 'get',
        url: `${serviceUrl}`
    })
}

export default function loadAllSwaggerDoc() {
    return new Promise((resolve, reject) => {
        const doc = {
            info: null, // 项目整体信息
            basePath: '', // 跟路径
            swagger: '',
            services: []
        }
        // 成功回调
        const callback = res => {
            const { data } = res
            // 收集基本信息， 整体配置了一个swagger, 因此只需要收集一次
            if (!doc.info) {
                doc.info = data.info || null
            }
            if (!doc.basePath) {
                doc.basePath = data.basePath || '/'
            }
            if (!doc.swagger) {
                doc.swagger = data.swagger || '2.0'
            }
            // 当前微服务所有接口
            const moduleDoc = {
                definations: data.definitions,
                tags: data.tags,
                paths: data.paths
            }
            doc.services.push(moduleDoc)
        }
        const loadedMap = new Map()
        serviceList.forEach(requestUrl => {
            loadSwaggerDoc(requestUrl)
                .then(res => {
                    callback(res)
                    // 更新loadedMap, 并判断是否推出Promise
                    loadedMap.set(requestUrl, true)
                    if (loadedMap.size == serviceList.length) {
                        resolve(doc)
                    }
                })
                .catch(e => {
                    reject(e)
                })
        })
    })
}
