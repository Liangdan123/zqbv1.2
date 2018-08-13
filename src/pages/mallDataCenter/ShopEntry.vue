<template>
    <div class="wrap">
        <div class="nav-bar">
            <span @click="pageBack">监控中心</span>
            <i>></i>
            <span class="link-active">商家入驻申请</span>
        </div>
        <div class="container">
            <el-tabs
                v-model="tabForShow"
                @tab-click="tabSwitch">
                <el-tab-pane label="待处理申请" name="pending"></el-tab-pane>
                <el-tab-pane label="历史申请记录" name="history"></el-tab-pane>
            </el-tabs>
            <el-table
                class="table"
                v-loading="tableDataLoading"
                :data="filterResults"
                style="width: 100%">
                <el-table-column
                    prop="contact_name"
                    label="申请人">
                </el-table-column>
                <el-table-column
                    prop="contact_phone"
                    label="联系方式">
                </el-table-column>
                <el-table-column
                    prop="commit_time"
                    label="申请时间">
                </el-table-column>
                <el-table-column label="申请状态">
                    <template slot-scope="scope">
                        <span :class="{'error':scope.row.auth_status==2}">{{scope.row.auth_status | applyStatus}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    width="120"
                    label="操作">
                    <template slot-scope="scope">
                        <div @click="showApplyDetail(scope.row.apply_id)">
                            <span class="btn" v-if="scope.row.auth_status">查看记录</span>
                            <span class="btn" v-else>审核申请</span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                class="pagination"
                v-if="resultTotalForFilter>pageSize"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="pageSize"
                layout="total, prev, pager, next"
                :total="resultTotalForFilter">
            </el-pagination>
            <el-dialog
                title="商家入驻申请"
                :visible.sync="dialogVisible"
                :before-close="handleClose">
                <div
                    v-loading="dialogDataLoading"
                    class="dialog-content">
                    <div class="content-panel">
                        <p class="panel-item">
                            <label>申请时间：</label>{{applyInfo.commit_time}}
                        </p>
                        <p class="panel-item">
                            <label>申请状态：</label>{{applyInfo.auth_status | applyStatus}}
                        </p>
                    </div>
                    <div class="content-panel clearfix">
                        <p class="panel-item">
                            <label>商铺名称：</label>{{applyInfo.shop_name}}
                        </p>
                        <p class="panel-item">
                            <label>主营商品：</label>{{applyInfo.product_remark}}
                        </p>
                        <div class="panel-item">
                            <label class="fl">商铺介绍：</label>
                            <p class="shop-mark">{{applyInfo.remark}}</p>
                        </div>
                    </div>
                    <div class="content-panel">
                        <p class="panel-item">
                            <label>联系人：</label>{{applyInfo. contact_name}}
                            <span></span>
                        </p>
                        <p class="panel-item">
                            <label>联系方式：</label>{{applyInfo.contact_phone}}
                        </p>
                    </div>
                </div>
                <span
                    v-if="applyInfo.auth_status==0"
                    slot="footer"
                    class="dialog-footer">
                    <el-button
                        @click="shopEntryAudit(1)"
                        :loading="btnLoadingIndex==1"
                        :disabled="btnDisabled"
                        class="btn-agree"
                        type="primary">
                        同意申请
                    </el-button>
                    <el-button
                        @click="shopEntryAudit(2)"
                        :disabled="btnDisabled"
                        :loading="btnLoadingIndex==2"
                        class="btn-reject">
                        拒绝申请
                    </el-button>
              </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {getShopEntryLists, getShopEntryDetail, setShopEntryStatus} from '@/api/data-center';

    export default {
        name: "ShopEntry",
        filters: {
            applyStatus: function (value) {
                let status_text;
                switch (value) {
                    case 0:
                        status_text = '待审核';
                        break;
                    case 1:
                        status_text = '已通过';
                        break;
                    default :
                        status_text = '已拒绝'
                }
                return status_text

            }
        },
        data() {
            return {
                filterResults: [],//筛选出的结果
                resultTotalForFilter: '',
                applyInfo: {},//申请入驻的信息
                pageSize: 20,//每页显示几条
                currentPage: 1,
                tabForShow: 'pending',
                dialogVisible: false,
                tableDataLoading: false,//表格数据加载中
                dialogDataLoading: false,//弹窗数据加载中
                btnDisabled: false,//操作按钮是否禁止点击
                btnLoadingIndex: 0,//按钮显示loading状态的顺序
                applyIDForCheck: '',//查看的入驻商家id
                searchCondition: {
                    "search": {
                        "type": 1
                    },
                    "page": 1
                }
            }
        },
        created() {
            this._doSearch()
        },
        methods: {
            pageBack() {
                // 回到上一页
                this.$router.back()
            },
            tabSwitch({name}) {
                // tab面板切换
                this.currentPage = 1;
                this.resultTotalForFilter = 0;
                // 搜索条件固定部分
                let search_condition_base = {
                    search: {
                        type: ''
                    },
                    page: 1
                };
                // 根据显示部分扩展对应的搜索条件
                if (name === 'pending') {
                    Object.assign(search_condition_base.search, {type: 1});
                } else {
                    Object.assign(search_condition_base.search, {type: 2});
                }
                // 搜索条件赋值 执行搜索
                this.searchCondition = search_condition_base;
                this._doSearch();
            },
            handleCurrentChange(val) {
                // 页码变化 执行搜索
                this.$set(this.searchCondition, 'page', val);
                this._doSearch();
            },
            handleClose() {
                // 入驻信息详情弹窗关闭
                this.dialogVisible = false;
                this.btnDisabled = false;
                this.btnLoadingIndex = 0;
                this.applyInfo = {};
                this.applyIDForCheck = ''
            },
            showApplyDetail(id) {
                // 显示入驻店铺详情
                this.dialogVisible = true;
                this.dialogDataLoading = true;
                this.applyIDForCheck = id;
                getShopEntryDetail({apply_id: id})
                    .then(({data}) => {
                        this.applyInfo = data;
                        this.dialogDataLoading = false;
                    })
                    .catch(({response: {data}}) => {
                        this.$message.error(data.errorcmt);
                    })
            },
            shopEntryAudit(status) {
                this.btnDisabled = true;
                this.btnLoadingIndex = status;
                let data_post = {
                    apply_id: this.applyIDForCheck,
                    auth_status: status
                };
                setShopEntryStatus(data_post)
                    .then(({data}) => {
                        let tip_text = `已${status == 1 ? '同意' : '拒绝'}该商家的入驻申请`;
                        this.$message({
                            message: tip_text,
                            type: 'success'
                        });
                        // 将表格中该条状态重新标记
                        let data_index = this.filterResults.findIndex(({apply_id}) => apply_id == this.applyIDForCheck);
                        this.filterResults.splice(data_index,1);
                        this.handleClose();
                    })
                    .catch(({response: {data}}) => {
                        this.$message.error(data.errorcmt);
                        this.btnDisabled = false;
                        this.btnLoadingIndex = 0;
                    })
            },
            _doSearch() {
                // 搜索入驻申请列表
                this.tableDataLoading = true;
                this.searchCondition.per_page = this.pageSize;
                getShopEntryLists(this.searchCondition)
                    .then(({data}) => {
                        this.tableDataLoading = false;
                        this.filterResults = data.data;
                        this.resultTotalForFilter = data.total;
                    })
            }
        },
    }
</script>

<style lang="scss" scoped>
    .wrap {
        padding: 80px 20px 0 20px;
        margin: 0 auto;
        width: 1280px;
        box-sizing: border-box;
    }

    .nav-bar {
        font-size: 16px;
        color: #7F7F7F;
        span:first-child {
            cursor: pointer;
        }
        i {
            padding: 0 5px;
        }
        .link-active {
            color: $color-light;
            font-weight: 700;
        }
    }

    .container {
        margin-top: 20px;
        padding: 0 20px 20px 20px;
        background: #fff;
        .table {
            margin-top: 5px;
        }
        .error {
            color: #B4282D;
        }
        .pagination {
            float: right;
            margin-top: 10px;
        }
        span.btn {
            cursor: pointer;
            color: #0070C9;
        }
        .content-panel {
            margin: 40px 0;
            .panel-item {
                margin-bottom: 10px;
                line-height: 1;
                label {
                    display: inline-block;
                    width: 90px;
                    color: #7F7F7F;
                }
            }
        }
        .shop-mark {
            margin-left: 70px;
            width: 560px;
        }
        .btn-agree, .btn-reject {
            padding: 10px 20px;
        }

    }

</style>
<style lang="scss">
    .container {
        .el-tabs__item {
            font-size: $font-normal;
            color: $color-base;
            &.is-active {
                font-weight: 600;
                color: $color-light;
            }
        }
        .el-tabs__active-bar {
            background-color: $color-light;
        }
        .cell {
            font-size: $font-normal;
            color: $color-light;
        }
        .el-dialog__title {
            font-size: 16px;
            color: #333;
        }
        .el-dialog__body {
            padding: 0 20px;
        }
    }

    .el-loading-mask {
        z-index: 60;
    }
</style>