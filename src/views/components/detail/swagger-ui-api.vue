<template>
    <div class="swagger-ui-detail">
        <div class="request-field common-part">
            <div class="title">
                <h1>{{ docApi.value.summary ? docApi.value.summary : '' }}</h1>
            </div>
            <div class="request">
                <el-input v-model="docApi.value.url" class="input">
                    <template #prepend
                        ><request-method :method="docApi.value.method"></request-method
                    ></template>
                </el-input>
                <div class="action">
                    <el-button size="medium" type="primary">执行</el-button>
                </div>
            </div>
        </div>
        <div class="request-parameter common-part">
            <div class="title">
                <h1>参数</h1>
            </div>
            <div class="parameter-detail">
                <el-table :data="docApi.value.parameters" style="width: 100%">
                    <el-table-column prop="description" label="description" width="180" />
                    <el-table-column prop="in" label="in" width="180" />
                    <el-table-column prop="name" label="name" />
                    <el-table-column prop="required" label="required"></el-table-column>
                    <el-table-column prop="type" label="type"></el-table-column>
                </el-table>
            </div>
        </div>
        <div class="request-response common-part">
            <div class="title">
                <h1>响应</h1>
            </div>
            <div class="response-detail">
                <el-tabs v-model="tab">
                    <el-tab-pane
                        v-for="responseTab of response.value"
                        :key="responseTab.code"
                        :label="responseTab.code"
                        :name="responseTab.code"
                    >
                        <div>
                            {{ responseTab }}
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script setup>
import swaggerService from '@/utils/swagger'
import { inject, reactive, watch, ref } from 'vue'
const currentService = inject('currentService')
const currentReqUrl = inject('currentReqUrl')
const services = swaggerService.getServices()

let tab = ref('200')

const docApi = reactive({})
const response = reactive({})

watch(
    currentReqUrl,
    (newVal, _) => {
        let doc = null
        const aimService = services.find(s => s.serviceUrl == currentService.value)
        if (aimService) {
            const paths = newVal.split('--')
            // paths[0] tag
            // paths[1] requestMethod
            // paths[2] url
            if (paths.length == 3) {
                const tag = aimService.tags.find(t => t.name == paths[0])
                doc = tag.urls.find(m => m.method == paths[1] && m.url == paths[2])
            }
        }
        docApi.value = doc
        const responseArr = Object.keys(doc.responses).map(v => ({
            code: v,
            ...doc.responses[v]
        }))
        response.value = responseArr
    },
    { immediate: true }
)
</script>

<style lang="less" scoped>
.swagger-ui-detail {
    .common-part {
        padding: 10px;
        box-sizing: border-box;
        margin-bottom: 10px;
        background: #eee;
        .title {
            height: 30px;
            line-height: 30px;
            h1 {
                color: #3b3b3b;
                font-size: 15px;
                font-weight: bold;
            }
        }
    }
    .request-field {
        .request {
            margin-top: 5px;
            height: 40px;
            display: flex;
            align-items: center;
            .input {
                width: 100%;
                margin-right: 10px;
            }
            .action {
                width: 60px;
            }
        }
    }
}
</style>
