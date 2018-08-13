<template>
    <div class="wrap" @click="isDropdown=false">
        <el-row :gutter="20">
            <el-col :span="6">
                <div class="statisticsItem">
                    <p class="itemTitle">总销售额</p>
                    <p class="money-total">{{mallDataStatistics.total_sell_money_yuan | money('￥')}}</p>
                    <p class="money-history">今日销售额 <span>{{mallDataStatistics.today_sell_money_yuan | money('￥')}}</span></p>
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
                    <p class="itemTitle">支付订单数</p>
                    <p class="money-total">{{mallDataStatistics.total_pay_order_num }}</p>
                    <p class="money-history">今日订单数 <span>{{mallDataStatistics.today_pay_order_num}}</span></p>
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
                    <p class="itemTitle">访问量</p>
                    <p class="money-total">{{mallDataStatistics.total_pv_num }}</p>
                    <p class="money-history">今日访客量 <span>{{mallDataStatistics.today_pv_num }}</span></p>
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
                    <p class="itemTitle">访客量</p>
                    <p class="money-total">{{mallDataStatistics.total_uv_num }}</p>
                    <p class="money-history">今日访客数 <span>{{mallDataStatistics.today_uv_num }}</span></p>
                    <svg width="48" height="48" class="item-label">
                        <use xlink:href="#member"  />
                    </svg>
                </div>
            </el-col>
        </el-row>
        <div class="panel">
            <p class="title">待处理事件</p>
            <el-row :gutter="12">
                <el-col
                    class="module"
                    :span="8">
                    <router-link to='shop-entry' tag="div" append>
                        <svg width="392" height="160" class="module-bg">
                            <use xlink:href="#statistics-shop"  />
                        </svg>
                        <div class="module-content">
                            <p class="module-title">商家入驻申请</p>
                            <p class="module-num">{{pendingEvents.shop_entry_num}}</p>
                        </div>
                    </router-link>
                </el-col>
                <el-col
                    class="module"
                    :span="8">
                    <router-link to='shop-apply' tag="div" append>
                        <svg width="392" height="160" class="module-bg">
                            <use xlink:href="#statistics-shop"  />
                        </svg>
                        <div class="module-content clearfix">
                            <p class="module-title">商家开店申请</p>
                            <p class="module-num">{{pendingEvents.shop_apply_num}}</p>
                        </div>
                    </router-link>
                </el-col>
                <el-col
                    class="module"
                    :span="8">
                    <router-link to='shop-withdrawal' tag="div" append>
                        <svg width="392" height="160" class="module-bg">
                            <use xlink:href="#statistics-money"  />
                        </svg>
                        <div class="module-content">
                            <p class="module-title">商家提现申请</p>
                            <p class="module-num">{{pendingEvents.shop_tixian_num}}</p>
                        </div>
                    </router-link>
                </el-col>
            </el-row>
        </div>
        <div class="panel">
            <p class="title">商城信息统计</p>
            <el-row :gutter="20">
                <el-col :span="6">
                    <div class="statistics-module">
                        <i class="iconfont icon-logo"></i>
                        店铺总数
                        <span>{{mallDataStatistics.total_shop_num}}家</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="statistics-module">
                        <i class="iconfont icon-product"></i>
                        商品总数
                        <span>{{mallDataStatistics.total_product_num}}件</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="statistics-module">
                        <i class="iconfont icon-member"></i>
                        会员总数
                        <span>{{mallDataStatistics.total_member_num}}位</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="statistics-module">
                        <i class="iconfont icon-money"></i>
                        会员充值总额
                        <span>{{mallDataStatistics.total_recharge_yuan | money}}元</span>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="tableFour mt-20 pos-r">
            <!--.....................日期选择..............-->
            <div @click.stop="">
                <el-tabs v-model="activeTime" @tab-click="handleTime" class="pos-a activeTime">
                    <el-tab-pane label="本周" name="week"></el-tab-pane>
                    <el-tab-pane label="本月" name="month"></el-tab-pane>
                    <el-tab-pane label="全年" name="year"></el-tab-pane>
                </el-tabs>
            </div>
            <el-date-picker  v-model="choiceDate" type="daterange" placeholder="选择日期范围" class="pos-a choiceDate"
                             @change="changeTime" :class="isDropdown===true?'Dropdown':''">
            </el-date-picker>

            <!--.....................表格..............-->
            <el-tabs class="tab-statistics" v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="销售额" name="first">
                    <div v-if="mallDataTitle==='销售额趋势'">
                        <tableData :mallData="mallData" :mallDataTitle="mallDataTitle" :tabName="tabName"></tableData>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="订单数" name="second">
                    <div v-if="mallDataTitle==='订单数趋势'">
                        <tableData :mallData="mallData" :mallDataTitle="mallDataTitle" :tabName="tabName"></tableData>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="访问量" name="third">
                    <div v-if="mallDataTitle==='访问量趋势'">
                        <tableData :mallData="mallData" :mallDataTitle="mallDataTitle" :tabName="tabName"></tableData>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="访客量" name="fourth">
                    <div v-if="mallDataTitle==='访客量趋势'">
                        <tableData :mallData="mallData" :mallDataTitle="mallDataTitle" :tabName="tabName"></tableData>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import {getStatisticsByDate,getMallStatisticsData,getMallPendingEventNum} from "@/api/data-center"
    import { format } from "@/api/script"
    import tableData from "@/components/sellerCenter/table"

    export default {
        name: "mallDataCenter",
        components: {
            tableData,
          },
        filters:{
            money(value,label=''){
                // 金额转换成数字和整数部分
                value = Number(value).toFixed(2).split('.');
                let value_int = value[0].toLocaleString();// 转换成金额形式
                return `${label} ${value_int}.${value[1]}`;
            },
        },
        data() {
            return {
                mallDataStatistics: {//商城数据统计
                    "total_sell_money_yuan": 0,
                    "today_sell_money_yuan": 0,
                    "total_pay_order_num": 0,
                    "today_pay_order_num": 0,
                    "total_pv_num": 0,
                    "today_pv_num": 0,
                    "total_uv_num": 0,
                    "today_uv_num": 0,
                    "total_pay_split_order_num": 0,
                    "today_pay_split_order_num": 0,
                    "total_shop_num":0,
                    "total_product_num":0,
                    "total_member_num":0,
                    "total_recharge_yuan":0

                },
                pendingEvents:{// 待处理事件
                    "shop_entry_num":0,
                    "shop_apply_num": 0,
                    "shop_tixian_num": 0
                },
                mallData:{},
                activeName:"first",
                activeTime:'week',
                tabName:"week",
                choiceDate:[],
                isDropdown:false,
                timeDate:{  start_date: "", end_date: ""},
                mallDataTitle:"销售额趋势",
            }
        },
        created(){
            // 获取商城统计数据
            getMallStatisticsData()
                .then(({data})=>{
                    this.mallDataStatistics = data;
                })
                .catch(({response: {data}})=>{
                    this.$message.error(data.errorcmt);
                });
            // 获取待处理事件数
            getMallPendingEventNum()
                .then(({data})=>{
                    this.pendingEvents = data;
                })
                .catch(({response: {data}})=>{
                    this.$message.error(data.errorcmt);
                });
            this.handleTime({name:'week'});

        },
        methods: {
            handleClick(tab){
                switch(true){
                    case tab.name==="first":
                        this.mallDataTitle="销售额趋势";
                        break;
                    case tab.name==="second":
                        this.mallDataTitle="订单数趋势";
                        break;
                    case tab.name==="third":
                        this.mallDataTitle="访问量趋势";
                        break;
                    case tab.name==="fourth":
                        this.mallDataTitle="访客量趋势";
                        break;
                }
            },
            //点击切换
            handleTime(tab){
                //本周
                if(tab.name==="week"){
                    //本周开始时间
                    this.timeDate.start_date=this.selfWeek(0);
                    //本周结束时间
                    this.timeDate.end_date=this.selfWeek(-6);
                    this.visitPicked();
                    this.storeAPI(this.timeDate);
                };
                //本月
                if(tab.name==="month"){
                    this.commonTime();
                    this.timeDate.start_date=this.year+"-"+(this.month<10?('0'+this.month):this.month)+"-"+"01";
                    this.timeDate.end_date=this.selfMonth();
                    this.storeAPI(this.timeDate);
                    //时间框显示时间
                    this.visitPicked();

                };
                //全年
                if(tab.name==="year"){
                    this.commonTime();
                    this.timeDate.start_date=this.year+"-"+"01"+"-"+"01";
                    this.timeDate.end_date=this.year+"-"+"12"+"-"+"31";
                    this.storeAPI(this.timeDate);
                    //时间框显示时间
                    this.visitPicked();
                };
                this.tabName=tab.name
            },
            //本周方法
            selfWeek(n){
                //调用时间公共方法
                this.commonTime();
                var date=this.now.getDate();
                var day=this.now.getDay();
                if(day!==0){n=n+(day-1);}else{n=n+day;};
                if(day){
                    if(this.month>1){//这个判断是为了解决跨年的问题
                        this.month=this.month;
                    }else{//这个判断是为了解决跨年的问题,月份是从0开始的
                        this.year=this.year-1;
                        this.month=12;
                    }
                };
                this.now.setDate(this.now.getDate()-n);
                this.year=this.now.getFullYear();
                this.month=this.now.getMonth()+1;
                date=this.now.getDate();
                let s=this.year+"-"+(this.month<10?('0'+this.month):this.month)+"-"+(date<10?('0'+date):date);
                return s;
            },
            //时间公共方法
            commonTime(){
                this.now=new Date();
                this.year = this.now.getFullYear();
                this.month = this.now.getMonth()+1;
            },
            //本月方法(末尾)
            selfMonth(){
                //调用时间公共方法
                this.commonTime();
                var d = new Date(this.year, this.month, 0);//0表示月底
                var s=this.year+"-"+(this.month<10?("0"+this.month):this.month)+"-"+d.getDate()
                return s;
            },
            //获取店铺统计图数据API
            storeAPI(data){
                getStatisticsByDate(data)
                    .then(({data})=>{
                        this.mallData=data;
                    })
                    .catch(({response: {data}})=>{
                        this.$message.error(data.errorcmt);
                    })
            },
            changeTime(){
                if((this.choiceDate[0]!==null||this.choiceDate[1]!==null)&&this.isDropdown===false){
                    this.timeDate.start_date=format(this.choiceDate[0]);
                    this.timeDate.end_date=format(this.choiceDate[1]);
                    this.index++;//使表格的computed有用
                    this.tabName="timeTable"+this.index;
                    this.storeAPI(this.timeDate);
                    this.activeTime="";
                };
            },
            visitPicked(){
                this.isDropdown=true;
                this.$set(this.choiceDate, 0, new Date(this.timeDate.start_date))
                this.$set(this.choiceDate, 1, new Date(this.timeDate.end_date))
            },
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
        .btn-apply{
            display: block;
            width: 94px;
            height: 32px;
            color: #fff;
            font-size: $font-normal;
            line-height: 32px;
            text-align: center;
            background: $btn-bg-normal;
            border-radius: $border-radius;
            &:hover{
                background: $btn-bg-hover;
            }
            &:active{
                background: $btn-bg-active;
            }
        }
    }
    .panel{
        margin: 20px 0;
        padding: 20px;
        border-radius: 4px;
        background: #fff;
        .title{
            margin-bottom: 20px;
            font-size: 16px;
            line-height: 1;
            color: #333;
            font-weight: 600;
        }
        .module{
            cursor: pointer;
            position: relative;
            .module-bg{
                position: absolute;
                z-index:1 ;
            }
            .module-content{
                position: relative;
                z-index: 10;
                p{
                    line-height: 160px;
                    color: #fff;
                    &.module-title{
                        float: left;
                        margin-left: 110px;
                        font-size: 16px;
                    }
                    &.module-num{
                        float: right;
                        margin-right: 60px;
                        font-size: 80px;
                    }
                }
            }
        }
    }
    .statistics-module{
        padding: 0 20px;
        height: 60px;
        font-size: 14px;
        color: #333;
        line-height: 60px;
        background: #F0F4F7;
        border-radius: 4px;
        i{
            margin-right: 10px;
        }
        span{
            float: right;
            font-size: 14px;
            font-weight: 600;
            color: #0070C9;
        }
    }
    .tableFour{
        padding:20px 20px 40px;
        background-color: #fff;
    }
</style>
<style lang="scss">
    .activeTime{
        right: 250px;
        top: 20px;
        z-index:100;
    }
    .activeTime .el-tabs__header{
        border-bottom: none;
    }
    .activeTime  .el-tabs__active-bar{
        background-color: transparent;
    }
    .choiceDate{
        right: 20px;
        top: 22px;
        z-index: 100;
    }
    .choiceDate .el-input__icon+.el-input__inner{
        height: 32px;
        line-height: 32px;
    }
    .tab-statistics{
        .el-tabs__item{
            font-size: 14px;
            color: #7f7f7f;
            &.is-active{
                font-weight: 600;
                color: #333333;
            }
        }
        .el-tabs__active-bar{
            background: #333333;
        }
    }
</style>