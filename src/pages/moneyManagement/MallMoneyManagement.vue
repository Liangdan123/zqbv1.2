<template>
    <div>
        <div @click="filterPanelClose" class="wrap">
            <el-row :gutter="20">
                <el-col :span="6">
                    <div class="statisticsItem">
                        <p class="itemTitle">总销售额</p>
                        <p class="money-total">{{mallMoneyStatistics.total_sell_money_yuan | money}}</p>
                        <p class="money-history">今日销售额 <span>{{mallMoneyStatistics.today_sell_money_yuan | money}}</span></p>
                        <svg
                            class="item-label"
                            width="48"
                            height="48">
                            <use xlink:href="#money"/>
                        </svg>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="statisticsItem">
                        <p class="itemTitle">商家提现总额</p>
                        <p class="money-total">{{mallMoneyStatistics.total_tixian_yuan | money}}</p>
                        <p class="money-history">本月商家提现 <span>{{mallMoneyStatistics.month_tixian_yuan | money}}</span></p>
                        <svg
                            class="item-label"
                            width="48"
                            height="48">
                            <use xlink:href="#money"/>
                        </svg>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="statisticsItem">
                        <p class="itemTitle">会员充值总额（不含增额）</p>
                        <p class="money-total">{{mallMoneyStatistics.total_recharge_yuan | money}}</p>
                        <p class="money-history">今日会员充值 <span>{{mallMoneyStatistics.today_recharge_yuan | money}}</span></p>
                        <svg
                            class="item-label"
                            width="48"
                            height="48">
                            <use xlink:href="#money"/>
                        </svg>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="statisticsItem">
                        <p class="itemTitle">累计会员消费（含增额）</p>
                        <p class="money-total">{{mallMoneyStatistics.total_consume_yuan | money}}</p>
                        <p class="money-history">今日会员消费 <span>{{mallMoneyStatistics.today_consume_yuan | money}}</span></p>
                        <svg width="48" height="48" class="item-label">
                            <use xlink:href="#member"  />
                        </svg>
                    </div>
                </el-col>
            </el-row>
            <div class="tab-wrap">
                <el-tabs v-model="tabForShow" @tab-click="tabSwitch">
                    <el-tab-pane label="商品销售明细" name="income" >
                        <search
                            ref="filterPanel1"
                            select-title="筛选记录"
                            @searchMthod="setIncomeFilterCondition($event,'search')"
                            @inputSearch="setIncomeFilterCondition($event,'input')"
                            @emptyMthod="incomeFilterConditionClear">
                            <template>
                                <div class="condition clearfix">
                                    <span class="f12 color-3 float-l">资金状态：</span>
                                    <div class="float-l">
                                        <label class="display-b store_label">
                                            <input
                                                class="display-n"
                                                type="radio"
                                                :value="1"
                                                v-model="filterIncomeCondition.search.type">
                                            <em></em>冻结中
                                        </label>
                                        <label class="display-b store_label">
                                            <input
                                                class="display-n"
                                                type="radio"
                                                :value="2"
                                                v-model="filterIncomeCondition.search.type">
                                            <em></em>已结算
                                        </label>
                                        <label class="display-b store_label">
                                            <input
                                                class="display-n"
                                                type="radio"
                                                :value="0"
                                                v-model="filterIncomeCondition.search.type">
                                            <em></em>全部
                                        </label>
                                    </div>

                                </div>
                            </template>
                        </search>
                        <div
                            class="order-list-wrap clearfix"
                            v-loading="tableLoading">
                            <div class="table-header">
                                <el-row>
                                    <el-col :span="7" class="table-cell">商品</el-col>
                                    <el-col :span="2" class="table-cell">单价</el-col>
                                    <el-col :span="2" class="table-cell">数量</el-col>
                                    <el-col :span="2" class="table-cell">配送方式</el-col>
                                    <el-col :span="2" class="table-cell">交易状态</el-col>
                                    <el-col :span="2" class="table-cell">买家</el-col>
                                    <el-col :span="4" class="table-cell">实际收款</el-col>
                                    <el-col :span="3" class="table-cell">资金状态</el-col>
                                </el-row>
                            </div>
                            <div v-if="incomeOrderList.length">
                                <div
                                    class="order-item"
                                    v-for="(order,index) in incomeOrderList"
                                    :key="index">
                                    <div class="item-head">
                                        <span>订单号:{{order.order_no}}</span>
                                        <span>创建时间:{{order.created_at}}</span>
                                    </div>
                                    <div class="order-content">
                                        <el-row
                                            class="product"
                                            v-for="(product,product_index) in order.order_products"
                                            :key="product.order_product_id" >
                                            <el-col :span="7" class="table-cell">
                                                <div>
                                                    <img
                                                        :src="product.spec_url"
                                                        class="img-product-spec"
                                                    >
                                                    <div class="info-right">
                                                        <p class="font-light name">{{product.product_name | ellipsis(32)}}</p>
                                                        <p class="font-normal spec">{{product.spec_name | ellipsis(32)}}</p>
                                                    </div>
                                                </div>
                                            </el-col>
                                            <el-col
                                                :span="2"
                                                class="table-cell">
                                                {{product.spec_price_yuan}}
                                            </el-col>
                                            <el-col
                                                :span="2"
                                                class="table-cell">
                                                {{product.product_num}}
                                            </el-col>
                                            <el-col
                                                :span="2"
                                                class="table-cell">
                                                {{product.distribute_type | express}}
                                            </el-col>
                                            <el-col
                                                v-if="!product_index"
                                                :span="2"
                                                class="table-cell">
                                                {{order.status | orderStatus}}
                                            </el-col>
                                            <el-col
                                                v-if="!product_index"
                                                :span="2"
                                                class="table-cell">
                                                {{order.shipping_info.contact_name}}
                                            </el-col>
                                            <el-col
                                                v-if="!product_index"
                                                :span="4"
                                                class="table-cell">
                                                <p class="order-total">{{order.pay_info.pay_fee_yuan | money}}</p>
                                                <p
                                                    v-if="order.distribute_type =='express'"
                                                    class="order-fee font-normal">
                                                    (快递费:{{order.pay_info.total_shipping_fee_yuan | money}})
                                                </p>
                                                <p class="order-fee font-normal">
                                                    (优惠券:-{{order.pay_info.total_coupon_yuan | money}})
                                                </p>
                                            </el-col>
                                            <el-col
                                                v-if="!product_index"
                                                :span="3"
                                                class="table-cell">
                                                <div v-if="order.jiesuan_status!=1">
                                                    <p>冻结中</p>
                                                    <p class="font-normal">(剩余时间：{{order.remain_day}}天)</p>
                                                </div>
                                                <p v-else>结算成功</p>
                                            </el-col>
                                            <el-col
                                                :span="11"
                                                class="empty table-cell"
                                                v-if="product_index">
                                                53kf
                                            </el-col>
                                        </el-row>
                                    </div>
                                </div>
                                <el-pagination
                                    class="pagination"
                                    v-if="resultTotalForFilter>pageSize"
                                    @current-change="handleCurrentChange($event,'income')"
                                    :current-page.sync="currentPage"
                                    :page-size="pageSize"
                                    layout="total, prev, pager, next"
                                    :total="resultTotalForFilter">
                                </el-pagination>
                            </div>
                            <div class="table-empty" v-else>
                                未发现相关的记录
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="会员充值明细" name="recharge">
                        <search
                            ref="filterPanel2"
                            :component-list="['select']"
                            switch-position="right"
                            select-title="筛选记录"
                            @searchMthod="setRechargeFilterCondition"
                            @emptyMthod="rechargeFilterConditionClear">
                        </search>
                        <div class="order-list-wrap">
                            <el-table
                                v-loading="tableLoading"
                                class="withdrawal-list-wrap"
                                :data="rechargeHistoryList"
                                empty-text="未发现相关的记录"
                                style="width: 100%">
                                <el-table-column
                                    prop="nick_name"
                                    label="会员昵称">
                                </el-table-column>
                                <el-table-column label="充值金额">
                                    <template slot-scope="scope">
                                        <span>{{ scope.row.pay_fee_yuan | money}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="赠送金额">
                                    <template slot-scope="scope">
                                        <span>{{ scope.row.give_fee_yuan | money}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    width="180"
                                    prop="pay_time"
                                    label="创建时间">
                                </el-table-column>
                            </el-table>
                            <el-pagination
                                class="pagination"
                                v-if="resultTotalForFilter>pageSize"
                                @current-change="handleCurrentChange($event,'recharge')"
                                :current-page.sync="currentPage"
                                :page-size="pageSize"
                                layout="total, prev, pager, next"
                                :total="resultTotalForFilter">
                            </el-pagination>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="商家提现记录" name="withdrawal">
                        <div class="withdrawal-history-wrap">
                            <search
                                ref="filterPanel3"
                                select-title="筛选记录"
                                @searchMthod="setWithdrawalFilterCondition($event,'search')"
                                @inputSearch="setWithdrawalFilterCondition($event,'input')"
                                @emptyMthod="withdrawalFilterConditionClear">
                            </search>
                            <MoneyWithdrawal
                                :withdrawal-list="withdrawalHistoryList"
                                :table-data-loading="tableLoading"
                                role="mall"
                            />
                            <el-pagination
                                class="pagination"
                                v-if="resultTotalForFilter>pageSize"
                                @current-change="handleCurrentChange($event,'withdrawal')"
                                :current-page.sync="currentPage"
                                :page-size="pageSize"
                                layout="total, prev, pager, next"
                                :total="resultTotalForFilter">
                            </el-pagination>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>
<script>
    import search from "@/components/order/searchOrder";
    import MoneyWithdrawal from '@/components/mallDataCenter/MoneyWithdrawal'
    import {
        getShopIncomeList,
        getMallFundStatistics,
        getWithdrawalList,
        getWithdrawalDetail,
        setWithdrawalStatus,
        getRechargeList
    } from "@/api/money-management";
    export default {
        name: "MallMoneyManagement",
        components: {
            search,
            MoneyWithdrawal
        },
        filters:{
            money(value){
                // 金额转换成数字和整数部分
                value = Number(value).toFixed(2).split('.');
                let value_int = value[0].toLocaleString();// 转换成金额形式
                return `￥ ${value_int}.${value[1]}`;
            },
            express(type){
                let express_type;
                switch (type){
                    case 'express':
                        express_type = '快递配送';
                        break;
                    case 'shop':
                        express_type = '门店配送';
                        break;
                    case 'self':
                        express_type = '到店自提';
                        break;
                }
                return express_type;
            },
            orderStatus(status){
                let status_text;
                switch (status){
                    case 1:
                        status_text = '待付款';
                        break;
                    case 2:
                        status_text = '待发货';
                        break;
                    case 3:
                        status_text = '待收货';
                        break;
                    case 4:
                        status_text = '交易成功';
                        break;
                    case 5:
                        status_text = '已取消';
                        break;
                    case 6:
                        status_text = '已关闭';
                }
                return status_text
            },
            ellipsis(text,len){
                return text.length>len?`${text.substring(0,len)}...`:text
            }
        },
        data() {
            return {
                tableLoading:false,
                //资金统计金额
                mallMoneyStatistics:{ //商城金额统计数据
                    total_sell_money_yuan:0,
                    today_sell_money_yuan:0,
                    total_tixian_yuan:0,
                    month_tixian_yuan:0,
                    total_recharge_yuan:0,
                    today_recharge_yuan:0,
                    total_consume_yuan:0,
                    today_consume_yuan:0
                },
                // 收入明细搜索条件
                filterIncomeCondition:{
                    "search": {
                        "type":0,
                    },
                    "page": 1
                },
                incomeOrderList:[],//收入明细查询结果
                filterWithdrawalCondition:{
                    "search": {
                        "status": '2',
                    },
                    "page": 1
                },
                withdrawalHistoryList:[],
                rechargeFilterCondition:{
                    // 充值记录搜索条件
                    "search": {},
                    "page": 1,
                },
                rechargeHistoryList:[],//充值记录列表
                resultTotalForFilter:100,
                currentPage:1,//当前页码
                pageSize:20,//20条一页
                withdrawalClickId:'',
                tabForShow:'income',// 显示的tab页面
                dialogVisible:false,//弹出框是否可见
                contentLoading:false,//内容是否加载中
                submitDisable:false,//按钮禁止点击
            }
        },
        created(){
            //获取店铺id
            getMallFundStatistics()
                .then(({data})=>{
                    this.mallMoneyStatistics = data
                })
        },
        mounted(){
            this._incomeFilter();
        },
        methods: {
            tabSwitch({name}){
                //tab页切换
                this.resultTotalForFilter = 0;
                this[`${name}FilterConditionClear`]()
            },
            handleCurrentChange(val,type){
                if(type!==this.tabForShow) return;
                switch (type){
                    case 'income':
                        this.$set(this.filterIncomeCondition,'page',val);
                        break;
                    case 'recharge':
                        this.$set(this.rechargeFilterCondition,'page',val);
                        break;
                    case 'withdrawal':
                        console.log(val)
                        this.$set(this.filterWithdrawalCondition,'page',val);
                        break;
                }
                this[`_${type}Filter`]();
            },
            setIncomeFilterCondition(data,eventType){
                // 更改收入明细搜索条件 并搜索
                if(eventType=='input'){
                    // 输入搜索
                    if(data){
                        // 有手动输入条件,添加进搜索条件
                        this.$set(this.filterIncomeCondition.search,'order_search',data);
                    }else {
                        // 为输入 删除手动填写的条件
                        this.$delete(this.filterIncomeCondition.search,'order_search');
                    }
                }else {
                    // 多条件筛选
                    let {max,min} = data||{};
                    // 设置资金状态标注
                    //有时间条件 添加时间限制 无则删除
                    if(max&&min){
                        this.$set(this.filterIncomeCondition.search,'create_time',{max,min})
                    }else {
                        this.$delete(this.filterIncomeCondition.search,'create_time');
                    }
                }
                // 重置页码
                // 去筛选
                this.currentPage == 1?this._incomeFilter():(this.currentPage = 1);
            },
            setWithdrawalFilterCondition(data,eventType){
                if(eventType=='input'){
                    // 输入搜索
                    if(data){
                        // 有手动输入条件,添加进搜索条件
                        this.$set(this.filterWithdrawalCondition.search,'shop_name',data);
                    }else {
                        // 为输入 删除手动填写的条件
                        this.$delete(this.filterWithdrawalCondition.search,'shop_name');
                    }
                }else {
                    // 多条件筛选
                    let {max,min} = data||{};
                    //更改提现记录搜索条件 并搜索
                    //有时间条件 添加时间限制 无则删除
                    if(max&&min){
                        this.$set(this.filterWithdrawalCondition.search,'apply_time',{max,min})
                    }else {
                        this.$delete(this.filterIncomeCondition.search,'apply_time');
                    }
                }
                // 重置页码
                // 去筛选
                this.currentPage == 1?this._withdrawalFilter():(this.currentPage = 1);
            },
            setRechargeFilterCondition({max,min}={}){
                //更改充值记录搜索条件 并搜索
                //有时间条件 添加时间限制 无则删除
                if(max&&min){
                    this.$set(this.rechargeFilterCondition.search,'pay_time',{max,min})
                }else {
                    this.$delete(this.rechargeFilterCondition,'pay_time');
                }
                // 重置页码
                // 去筛选
                this.currentPage == 1?this._rechargeFilter():(this.currentPage = 1);
            },
            incomeFilterConditionClear(){
                // 清空筛选条件
                let condition_base_filter = {
                    "search": {
                        "type":0,
                    },
                    "page": 1
                }
                // 重置搜索条件并搜索
                this.filterIncomeCondition = Object.assign({},this.filterIncomeCondition,condition_base_filter);
                this.currentPage == 1?this._incomeFilter():(this.currentPage = 1);
                // 关闭选择框
                this.filterPanelClose()
            },
            withdrawalFilterConditionClear(){
                this.filterWithdrawalCondition= {
                    "search": {
                        "status": '2',
                    },
                    "page": 1
                };
                this.currentPage == 1?this._withdrawalFilter():(this.currentPage = 1);
                // 关闭选择框
                this.filterPanelClose()
            },
            rechargeFilterConditionClear(){
                // 充值记录搜索条件重置
                this.rechargeFilterCondition= {
                    "search": {},
                    "page": 1,
                };
                this.currentPage == 1?this._rechargeFilter():(this.currentPage = 1);
                // 关闭选择框
                this.filterPanelClose()
            },
            filterPanelClose(){
                // 点击非筛选区域关闭筛选面板
                for(let [k,v] of Object.entries(this.$refs)){
                    v.closeSearch()
                }
            },

            handleClose(){
                //关闭diglog弹窗
                this.dialogVisible = false;
            },
            _incomeFilter(){
                // 查询收入明细
                this.tableLoading = true;
                this.filterIncomeCondition.per_page = this.pageSize;
                getShopIncomeList(this.filterIncomeCondition)
                    .then(({data})=>{
                        this.incomeOrderList = data.data;
                        this.resultTotalForFilter = data.total;
                        this.tableLoading = false;
                    })
            },
            _withdrawalFilter(){
                this.tableLoading = true;
                this.filterWithdrawalCondition.per_page = this.pageSize;
                getWithdrawalList(this.filterWithdrawalCondition)
                    .then(({data})=>{
                        this.withdrawalHistoryList = data.data;
                        this.resultTotalForFilter = data.total;
                        this.tableLoading = false;
                    })
            },
            _rechargeFilter(){
                this.tableLoading = true;
                let data_post = Object.assign({},this.rechargeFilterCondition,{per_page:this.pageSize});
                !data_post.search.pay_time&&delete data_post.search;
                getRechargeList(data_post)
                    .then(({data})=>{
                        this.rechargeHistoryList = data.data;
                        this.resultTotalForFilter = data.total;
                        this.tableLoading = false;
                    })
            }
        },
    }
</script>

<style lang="scss" scoped>
    .wrap {
        padding: 70px 20px 0 20px;
        margin: 0 auto;
        width: 1280px;
        box-sizing: border-box;
    }
    .statisticsItem{
        position: relative;
        padding: 20px 20px 0 20px;
        background: #FFF;
        font-size: $font-title;
        overflow: hidden;
        .itemTitle{
            margin-bottom: 10px;
            font-size: 14px;
            color: #7f7f7f;
            line-height: 1;
        }
        .money-total{
            margin-top: 10px;
            padding-bottom: 20px;
            font-size: $font-title;
            font-weight: 700;
            line-height: 1;
            color: $color-light;
            border-bottom: 1px solid #F0F4F7;
        }
        .money-history{
            margin: 20px 0;
            font-size: $font-normal;
            color: $color-base;
            span{
                color: $color-light;
            }
        }
        .item-label{
            position: absolute;
            top: 21px;
            right: 21px;
        }
        .item-bottom{
            display: table;
            margin: 13px 0;
            width: 100%;
            .money-history,.btn-apply{
                display: table-cell;
            }
        }
    }
    .tab-wrap{
        margin-top: 20px;
        padding: 20px;
        background: #fff;
    }
    .order-list-wrap{
        .font-normal,.font-light,.font-waring{
            font-size: $font-small;
        }
        .font-normal{
            color: $color-base;
        }
        .font-light{
            color: $color-light;
        }
        .font-waring{
            color: $color-waring;
        }
        .table-header{
            margin-top: 15px;
            height: 40px;
            font-size: $font-normal;
            line-height: 40px;
            color: #62778C;
            background: #F0F4F7;
        }
        .table-cell{
            padding-left: 25px;
            box-sizing: border-box;
        }
        .order-item{
            margin-top: 10px;
            .item-head{
                height: 32px;
                text-align: right;
                background: #EEF6FD;
                span{
                    padding: 0 20px;
                    font-size: $font-small;
                    line-height: 32px;
                    color: #62778C;
                }
            }
            .order-content{
                border: 1px solid #E9EEF2;
                border-top: 0;
                box-sizing: border-box;
                .product{
                    display: table;
                    width: 100%;
                    padding: 10px 0;
                    & + .product{
                        border-top: 1px solid #E9EEF2;
                    }
                    .table-cell{
                        float: none;
                        display: table-cell;
                        padding-left: 25px;
                        box-sizing: border-box;
                        height: 100%;
                        vertical-align: middle;
                    }
                    .img-product-spec{
                        float: left;
                        margin-right: 20px;
                        width: 50px;
                        height: 50px;
                    }
                    .info-right{
                        margin-left: 70px;
                        .name,.spec{
                            max-width: 17em;
                        }
                        .name{
                            margin-bottom: 5px;
                        }
                    }
                    span{
                        padding-left: 7px;
                    }
                    .empty{
                        position: relative;
                        top: -11px;
                        color: #fff;
                        background: #fff;
                    }
                }
                .content-right{
                    p,span{
                        padding-left: 20px;
                    }
                }
            }

        }
        .table-empty{
            height: 70px;
            font-size: $font-normal;
            color: $color-light;
            text-align: center;
            line-height: 70px;
            border: 1px solid #E9EEF2;
            border-top: none;
        }

    }
    .pagination{
        float: right;
        margin-top: 10px;
    }

</style>
<style lang="scss">
    .tab-wrap{
        .el-tabs__item{
            color: $color-base;
            &.is-active{
                font-weight: 600;
                color: $color-light;
            }
        }
        .el-tabs__active-bar{
            height: 2px;
            background: $color-light;
        }
        .el-tabs__content{
            overflow: visible;
        }

    }
    .withdrawal-list-wrap{
        .cell{
            font-size: $font-small;
            font-weight: normal;
        }
        .el-table td{
            height: 70px;
        }
        thead .cell{
            color: #62778C;
        }
    }
</style>