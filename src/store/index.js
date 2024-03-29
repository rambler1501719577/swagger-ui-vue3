// stores/counter.js
import { defineStore } from 'pinia'

export const useDocStore = defineStore('docs', {
    state: () => ({
        currentService: '', // 当前选择的服务
        currentReqUrl: '', // 当前选择的接口
        currentDefination: '', // 当前选择的实体定义
        docInfo: null // 每个服务对应的接口文档
    }),
    getters: {
        services: state => {
            return state.docInfo?.services
        },
        version: state => {
            return state.docInfo?.swagger || '1.0'
        },
        mode: state => {
            if (state.currentReqUrl) return 'api'
            return 'defination'
        },
        currentServiceDoc: state => {
            if (state.docInfo) {
                return state.docInfo.services.find(v => v.serviceUrl == state.currentService)
            }
            return null
        },
        // 当前选中实体定义
        currentEntity: state => {
            if (!state.currentService || !state.currentDefination) {
                return null
            }
            const [_, definationName] = state.currentDefination.split('--')
            const entity = state.currentServiceDoc.definations[definationName]
            const defination = []
            if (entity.type == 'object') {
                const kvs = Object.keys(entity.properties).map(e => ({
                    name: e,
                    type: entity.properties[e].type || '无'
                }))
                defination.push(...kvs)
            }
            return defination
        },
        // 当前选中接口详情
        currentApi: state => {
            if (!state.currentService || !state.currentReqUrl) {
                return null
            }
            const [_, method, url] = state.currentReqUrl.split('--')
            const apiDetail = state.currentServiceDoc.paths[url][method]
            const response = Object.keys(apiDetail.responses).map(r => {
                const res = apiDetail.responses[r]
                // 响应状态码和相应描述
                const returnVal = {
                    code: r,
                    description: res?.description
                }
                if (res.schema) {
                    if (res.schema.$ref) {
                        // todo 这里的schema可能是对象嵌套对象， 需要递归替换调所有的$ref引用的对象
                        const schemaKey = res.schema.$ref.replace('#/definitions/', '')
                        const schema = state.currentServiceDoc.definations[schemaKey]
                        returnVal['schema'] = schema
                    } else {
                        // 直接返回字符串，会被包装成这个
                        returnVal['schema'] = res.schema
                    }
                }
                return returnVal
            })
            const api = {
                method,
                url,
                ...apiDetail,
                response
            }
            return api
        },
        // 获取当前服务的所有标签信息及其他信息
        tags: state => {
            if (state.currentServiceDoc) {
                return state.currentServiceDoc.tags
            }
            return []
        },
        definations: state => {
            const definations = []
            if (state.currentServiceDoc) {
                const definationMap = state.currentServiceDoc.definations
                const valuableDefinations = Object.keys(definationMap).filter(
                    v => !v.startsWith('CommonResponse')
                )
                definations.push(...valuableDefinations)
            }
            return definations
        }
    },
    actions: {
        toggleData(doc) {
            this.docInfo = doc
        },
        setCurrentReqUrl(reqUrl) {
            this.currentReqUrl = reqUrl
            this.currentDefination = ''
        },
        setCurrentDefination(defination) {
            this.currentDefination = defination
            this.currentReqUrl = ''
        },
        setCurrentService(currentService) {
            this.currentService = currentService
        }
    }
})
