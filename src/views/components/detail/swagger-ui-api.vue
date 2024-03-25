<template>
    <div class="swagger-ui-detail">
        <el-descriptions
            class="margin-top"
            :title="docApi.value.summary"
            :column="3"
            :size="size"
            border
        >
            <template #extra>
                <el-button type="primary">操作</el-button>
            </template>
            <el-descriptions-item>
                <template #label> 摘要 </template>
                {{ docApi.value.summary }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label> 请求地址 </template>
                {{ docApi.value.url }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label> 请求方法 </template>
                {{ docApi.value.method }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label> produces </template>
                {{ docApi.value.produces }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label> consumes </template>
                {{ docApi.value.consumes }}
            </el-descriptions-item>
        </el-descriptions>

        <h1 style="margin: 20px; font-weight: bold">参数</h1>
        <el-table :data="docApi.value.parameters" style="width: 100%">
            <el-table-column prop="description" label="description" width="180" />
            <el-table-column prop="in" label="in" width="180" />
            <el-table-column prop="name" label="name" />
            <el-table-column prop="required" label="required"></el-table-column>
            <el-table-column prop="type" label="type"></el-table-column>
        </el-table>

        <h1 style="margin: 20px; font-weight: bold">响应</h1>
        {{ docApi.value.responses }}
    </div>
</template>

<script setup>
import swaggerService from '@/utils/swagger'
import { inject, reactive, watch } from 'vue'
const currentService = inject('currentService')
const currentReqUrl = inject('currentReqUrl')
const services = swaggerService.getServices()

const docApi = reactive({})

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
        console.log(docApi.value)
    },
    { immediate: true }
)
</script>

<style lang="less" scoped></style>
