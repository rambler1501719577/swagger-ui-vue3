<template>
    <div class="swagger-ui-detail">
        <div class="request-field common-part">
            <div class="title">
                <h1>{{ store.currentApi.summary }}</h1>
            </div>
            <div class="request">
                <el-input v-model="store.currentApi.url" class="input">
                    <template #prepend
                        ><request-method :method="store.currentApi.method"></request-method
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
                <el-table :data="store.currentApi.parameters" style="width: 100%">
                    <el-table-column prop="name" label="Name" />
                    <el-table-column prop="description" label="Description" width="180" />
                    <el-table-column prop="in" label="Parameter Type" width="180" />
                    <el-table-column label="Value">
                        <template #default="scope">
                            <el-input type="file" v-if="scope.row.type == 'file'"></el-input>
                            <el-input v-else></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="required" label="required"></el-table-column>
                    <el-table-column prop="type" label="Data Type"></el-table-column>
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
                        v-for="responseTab of store.currentApi.response"
                        :key="responseTab.code"
                        :label="responseTab.code"
                        :name="responseTab.code"
                    >
                        <div>
                            <pre>{{ responseTab }}</pre>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useDocStore } from '@/store'
const store = useDocStore()
</script>

<style lang="less" scoped>
.swagger-ui-detail {
    .common-part {
        padding: 10px;
        box-sizing: border-box;
        margin-bottom: 10px;
        background: #fff;
        border-radius: 4px;
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
