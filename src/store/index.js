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
        // 获取当前服务的所有标签信息及其他信息
        tags: state => {
            const tags = []
            if (state.currentServiceDoc) {
                tags.push(...state.currentServiceDoc.tags)
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
