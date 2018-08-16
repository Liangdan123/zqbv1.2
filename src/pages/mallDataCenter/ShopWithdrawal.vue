<template>
    <div class="wrap">
        <div class="nav-bar">
            <span @click="pageBack">监控中心</span>
            <i>></i>
            <span class="link-active">历史提现记录</span>
        </div>
        <div class="container">
            <el-tabs
                v-model="tabForShow"
                @tab-click="tabSwitch">
                <el-tab-pane label="待处理提现" name="pending"></el-tab-pane>
                <el-tab-pane label="历史提现记录" name="history"></el-tab-pane>
            </el-tabs>
            <MoneyWithdrawal
                :withdrawal-list="withdrawalHistoryList"
                :table-data-loading="tableLoading"
                role="mall"
            />
            <el-pagination
                class="pagination"
                v-if="resultTotalForFilter>pageSize"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="pageSize"
                layout="total, prev, pager, next"
                :total="resultTotalForFilter">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import MoneyWithdrawal from '@/components/mallDataCenter/MoneyWithdrawal'
    import {getWithdrawalList} from "@/api/money-management";

    export default {
        name: "ShopEntry",
        components: {
            MoneyWithdrawal
        },
        data() {
            return {
                tabForShow:'pending',// 显示的tab页面
                tableLoading:false,
                withdrawalHistoryList:[],
                resultTotalForFilter:100,
                currentPage:1,//当前页码
                pageSize:20,//20条一页
                withdrawalClickId:'',
                filterWithdrawalCondition:{
                    "search": {
                        "status": '1',
                    },
                    "page": 1
                },
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
                        status: ''
                    },
                    page: 1
                };
                // 根据显示部分扩展对应的搜索条件
                if (name === 'pending') {
                    Object.assign(search_condition_base.search, {status: '1'});
                } else {
                    Object.assign(search_condition_base.search, {status: '2,3,4'});
                }
                // 搜索条件赋值 执行搜索
                this.filterWithdrawalCondition = search_condition_base;
                this._doSearch();
            },
            handleCurrentChange(val) {
                // 页码变化 执行搜索
                this.$set(this.filterWithdrawalCondition, 'page', val);
                this._doSearch();
            },
            _doSearch() {
                // 搜索入驻申请列表
                this.tableLoading = true;
                this.filterWithdrawalCondition.per_page = this.pageSize;
                getWithdrawalList(this.filterWithdrawalCondition)
                    .then(({data})=>{
                        this.withdrawalHistoryList = data.data;
                        this.resultTotalForFilter = data.total;
                        this.tableLoading = false;
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