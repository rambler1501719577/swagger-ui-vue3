<template>
    <div class="swagger-ui-detail">
        <div class="common-part">
            <div class="title"><h1>实体定义</h1></div>
            <el-table :data="store.currentEntity" row-key="id" border default-expand-all>
                <el-table-column prop="name" label="名称" sortable />
                <el-table-column prop="type" label="类型" sortable />
            </el-table>
        </div>

        <div class="common-part">
            <div class="title"><h1>DEMO</h1></div>
            <pre>{{ store.currentEntity }}</pre>
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
        background: #fff;
        margin-bottom: 10px;
        padding: 10px;
        border-radius: 4px;
        .title {
            margin-bottom: 10px;
            h1 {
                color: #333;
                line-height: 40px;
            }
        }
    }
}
</style>
