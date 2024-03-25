import request from '../request'
import { serviceList } from '@/setting'

const loadSwaggerDoc = serviceUrl => {
    return request({
        method: 'get',
        url: `${serviceUrl}`
    })
}

// 格式化tags, 将匹配tag的url放到相应组下
const formatTags = (tags, paths) => {
    const allAPIs = []
    Object.keys(paths).forEach(url => {
        const module = paths[url]
        Object.keys(module).forEach(method => {
            const apiDetail = module[method]
            allAPIs.push({
                url,
                method,
                ...apiDetail
            })
        })
    })
    tags.forEach(tag => {
        tag['urls'] = allAPIs.filter(v => v.tags.includes(tag.name))
    })
    return tags
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
        const callback = (res, requestUrl) => {
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
                serviceUrl: requestUrl,
                definations: data.definitions,
                tags: formatTags(data.tags, data.paths),
                paths: data.paths
            }
            doc.services.push(moduleDoc)
        }
        const loadedMap = new Map()
        serviceList.forEach(requestUrl => {
            loadSwaggerDoc(requestUrl)
                .then(res => {
                    callback(res, requestUrl)
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
