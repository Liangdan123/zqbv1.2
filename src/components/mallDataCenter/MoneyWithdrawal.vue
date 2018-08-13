<template>
    <div class="withdrawal-list-wrap">
        <div class="order-list-wrap">
            <el-table
                v-loading="tableDataLoading"
                class="withdrawal-list-wrap"
                :data="withdrawalList"
                empty-text="未发现相关的记录"
                style="width: 100%">
                <el-table-column
                    v-if="role=='mall'"
                    prop="shop_name"
                    label="商家">
                </el-table-column>
                <el-table-column label="提现金额">
                    <template slot-scope="scope">
                        <span class="font-waring">{{ scope.row.apply_money_yuan | money}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="apply_time"
                    label="创建时间">
                </el-table-column>
                <el-table-column label="提现状态">
                    <template slot-scope="scope">
                        <span :class="{'font-waring':scope.row.status==3}">{{ scope.row.status | withdrawalStatus}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="操作"
                    width="120">
                    <template slot-scope="scope">
                        <el-button
                            v-if="scope.row.status==2&&role=='shop'"
                            @click="withdrawalConfirm(scope.row.tixian_id)"
                            :loading="withdrawalClickId==scope.row.tixian_id"
                            class="btn-withdrawal-confirm"
                            type="primary"
                            size="mini">
                            确认收款
                        </el-button>
                        <p
                            class="font-primary"
                            @click="withdrawalDetailShow(scope.row.tixian_id)">
                            {{role=='mall'?scope.row.status==1?'处理申请':'查看记录':'查看记录'}}
                        </p>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog
            title="提现记录"
            :visible.sync="dialogVisible"
            :before-close="handleClose"
            class="dialog-wrap">
            <p class="panel-title">提现进度</p>
            <div v-loading="dialogDataLoading">
                <div
                    v-if="!dialogDataLoading"
                    class="dialog-content">
                    <ul class="progess clearfix">
                        <li class="detail-item item-active">
                            <div>
                                <i class="icon-dot active"></i>
                            </div>
                            <div class="detail-content">
                                <p>申请提现</p>
                                <div v-if="detailForWithdrawal.status>=1">
                                    <p class="time">{{detailForWithdrawal.apply_time.split(' ')[0]}}</p>
                                    <p class="time">{{detailForWithdrawal.apply_time.split(' ')[1]}}</p>
                                </div>
                            </div>
                        </li>
                        <li
                            class="detail-item item-active"
                            v-if="detailForWithdrawal.status!==3">
                            <div>
                                <i class="icon-line"></i>
                                <i class="icon-dot"></i>
                            </div>
                            <div class="detail-content">
                                <p>等待平台汇款</p>
                                <div v-if="detailForWithdrawal.status>=2">
                                    <p class="time">{{detailForWithdrawal.remittance_time.split(' ')[0]}}</p>
                                    <p class="time">{{detailForWithdrawal.remittance_time.split(' ')[1]}}</p>
                                </div>
                            </div>
                        </li>
                        <li
                            :class="['detail-item',{'item-active':detailForWithdrawal.status%2==0}]"
                            v-if="detailForWithdrawal.status!==3">
                            <div>
                                <i class="icon-line"></i>
                                <i class="icon-dot"></i>
                            </div>
                            <div class="detail-content">
                                <p >商家确认收款</p>
                                <div v-if="detailForWithdrawal.status==4">
                                    <p class="time">{{detailForWithdrawal.confirm_time.split(' ')[0]}}</p>
                                    <p class="time">{{detailForWithdrawal.confirm_time.split(' ')[1]}}</p>
                                </div>
                            </div>
                        </li>
                        <li
                            :class="['detail-item',{'item-active':detailForWithdrawal.status==4}]"
                            v-if="detailForWithdrawal.status!==3">
                            <div>
                                <i class="icon-line"></i>
                                <i class="icon-dot"></i>
                            </div>
                            <div class="detail-content">
                                <p>完成提现</p>
                                <div v-if="detailForWithdrawal.status==4">
                                    <p class="time">{{detailForWithdrawal.confirm_time.split(' ')[0]}}</p>
                                    <p class="time">{{detailForWithdrawal.confirm_time.split(' ')[1]}}</p>
                                </div>
                            </div>
                        </li>
                        <li class="detail-item item-err" v-if="detailForWithdrawal.status==3">
                            <div>
                                <i class="icon-line"></i>
                                <i class="icon-dot"></i>
                            </div>
                            <div class="detail-content">
                                <p class="font-err">提现失败</p>
                                <p class="time">{{detailForWithdrawal.remittance_time.split(' ')[0]}}</p>
                                <p class="time">{{detailForWithdrawal.remittance_time.split(' ')[1]}}</p>
                            </div>
                        </li>
                    </ul>
                    <p class="panel-title">提现详情</p>
                    <ul class="panel-detail">
                        <li><label>提现金额：</label>{{detailForWithdrawal.apply_money_yuan | money}}</li>
                        <li><label>开户姓名：</label>{{detailForWithdrawal.open_name}}</li>
                        <li><label>开户银行：</label>{{detailForWithdrawal.open_bank}}</li>
                        <li><label>银行卡号：</label>{{detailForWithdrawal.open_number}}</li>
                    </ul>
                    <div v-if="detailForWithdrawal.status==3">
                        <p class="panel-title">提现失败原因</p>
                        <p class="remark">{{detailForWithdrawal.remark}}</p>
                    </div>
                    <p
                        v-if="role=='mall'"
                        class="panel-title">卖家信息</p>
                    <ul
                        v-if="role=='mall'"
                        class="panel-detail">
                        <li><label>店铺名称：</label>{{detailForWithdrawal.shop_name }}</li>
                        <li><label>店<i></i>长：</label>{{detailForWithdrawal.shopkeeper_name}}</li>
                        <li><label>联系方式：</label>{{detailForWithdrawal.shopkeeper_phone}}</li>
                    </ul>
                </div>
            </div>
            <span
                slot="footer"
                v-if="detailForWithdrawal.status==2&&role=='shop'"
                class="dialog-footer">
                <el-button
                    type="primary"
                    @click="withdrawalConfirm(detailForWithdrawal.tixian_id)"
                    :loaging="submitDisable">
                    确认收款
                </el-button>
            </span>
            <span
                slot="footer"
                v-if="detailForWithdrawal.status==1&&role=='mall'"
                class="dialog-footer">
                <el-button
                    @click="mallRemittance(4)"
                    :disabled="submitDisable"
                    :loading="btnLoadingIndex==2"
                    class="btn-agree"
                    type="primary">
                        汇款成功
                    </el-button>
                    <el-button
                        @click="remittanceRejectConfirm"
                        :disabled="submitDisable"
                        :loading="btnLoadingIndex==3"
                        class="btn-reject">
                        汇款失败
                    </el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {getWithdrawalDetail, setWithdrawalStatus,setRemittanceStatus} from "@/api/money-management";
    export default {
        name: "MoneyWithdrawaklDetail",
        filters: {
            money(value){
                // 金额转换成数字和整数部分
                value = Number(value).toFixed(2).split('.');
                let value_int = value[0].toLocaleString();// 转换成金额形式
                return `￥ ${value_int}.${value[1]}`;
            },
            withdrawalStatus(status){
                let status_text;
                switch (status){
                    case 1:
                        status_text = '等待平台汇款';
                        break;
                    case 2:
                        status_text = '等待商家确认收款';
                        break;
                    case 3:
                        status_text = '提现失败';
                        break;
                    case 4:
                        status_text = '提现完成';
                        break;
                }
                return status_text
            },
        },
        props: {
            withdrawalList: { // 提现列表数据
                type: Array,
                required: true,
                default: [],
            },
            role:{ //使用本组件的角色 平台：mall 店铺：shop
              type:String,
              required:true,
              default:'shop'
            },
            tableDataLoading:{ // 表格数据加载中
                type:Boolean,
                required:true,
                default:false
            }
        },
        data() {
            return {
                dialogVisible:false,// 提现详情dialog开关状态
                dialogDataLoading:false,// dialog数据是否加载中状态
                submitDisable:false,//按钮是否禁止点击
                withdrawalClickId:'',
                btnLoadingIndex:'',
                detailForWithdrawal:{},//提现订单详细信息
                rejectRemark:'',// 汇款失败的原因
            }
        },
        methods: {
            handleClose() {
                //关闭diglog弹窗
                this.dialogVisible = false;
                this.submitDisable = false;
                this.detailForWithdrawal = {};
                this.rejectRemark = '';
                this.withdrawalClickId = '';
                this.btnLoadingIndex = '';
            },
            withdrawalDetailShow(id){
                // 显示提现详情
                this.dialogVisible =true;
                this.dialogDataLoading = true;
                this.withdrawalClickId = id;
                getWithdrawalDetail({tixian_id:id})
                    .then(({data})=>{
                        this.detailForWithdrawal = data;
                        this.dialogDataLoading = false
                    })
                    .catch(({response: {data}})=>{
                        this.$message.error(data.errorcmt);
                    })
            },
            withdrawalConfirm(id){
                this.withdrawalClickId = id;
                setWithdrawalStatus({tixian_id:id})
                    .then(()=>{
                        this.$message({
                            message: '确认收款成功',
                            type: 'success'
                        });
                        // 将列表中该条记录设置为已完成状态
                        let item_index = this.withdrawalList.findIndex(({tixian_id})=>tixian_id==id);
                        let data_extend = Object.assign({},this.withdrawalList[item_index],{status:4});
                        this.$set(this.withdrawalList,item_index,data_extend);
                        this.handleClose()
                    })
                    .catch(({response: {data}})=>{
                        this.$message.error(data.errorcmt);
                    })
            },
            mallRemittance(status){
                this.submitDisable = true;
                this.btnLoadingIndex = status;
                let data_post = {
                    "tixian_id": this.withdrawalClickId,
                    "status": status,
                };
                this.rejectRemark&&Object.assign(data_post,{remark:this.rejectRemark});
                setRemittanceStatus(data_post)
                    .then(()=>{
                        // 设置成功 将表格中的数据设置为对应的状态
                        let item_index = this.withdrawalList.findIndex(({tixian_id})=>tixian_id==this.withdrawalClickId);
                        let data_extend = Object.assign({},this.withdrawalList[item_index],{status});
                        this.$set(this.withdrawalList,item_index,data_extend);
                        this.handleClose()
                    })
                    .catch(({response:{data}})=>{
                        this.$message.error(data.errorcmt);
                    })
            },
            remittanceRejectConfirm(){
                this.$prompt(' ', '汇款失败原因', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputValidator: (val)=>Boolean(val),
                    inputErrorMessage: '请输入汇款失败原因',
                    inputPlaceholder:'请输入汇款失败原因'
                }).then(({ value }) => {
                    this.rejectRemark = value;
                    this.mallRemittance(3)
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
    .order-list-wrap{
        .font-waring{
            font-size: $font-small;
            color: $color-waring;
        }
        .withdrawal-list-wrap{
            margin-top: 15px;
            .font-primary{
                margin-top: 5px;
                padding-left: 5px;
                cursor: pointer;
                font-size: $font-small;
                color: $btn-bg-normal;
                line-height: 1;
                &:hover{
                    color: $btn-bg-hover;
                }
                &:active{
                    color: $btn-bg-active;
                }
            }
            .btn-withdrawal-confirm{
                border-radius: 2px;
                display: block;
            }
        }

    }
    .dialog-wrap{
        .panel-title{
            margin: 40px 0 20px 0;
            font-size: $font-normal;
            color: $color-light;
        }
        .panel-detail{
            li{
                margin-bottom: 6px;
                font-size: 14px;
                color: #333;
            }
            label{
                color: #7F7F7F;
                vertical-align: middle;
                i{
                    padding: 0 1em;
                }
            }
        }
        .remark{
            width: 700px;
            font-size: 14px;
            color: #7F7F7F;
        }
    }

    /*进度条*/
    .progess{
        .icon-dot{
            display: inline-block;
            margin: 0 6px;
            width: 8px;
            height: 8px;
            background: #E9EEF2;
            border-radius: 100%;
            vertical-align: middle;
        }
        .icon-line{
            display: inline-block;
            width: 160px;
            height: 2px;
            background: #E9EEF2;
            vertical-align: middle;
        }
        .font-label,.font-content,.font-tip,font-err{
            font-size: $font-normal;
        }
        .font-label{
            color: #7f7f7f;
        }
        .font-content{
            color: $color-light;
        }
        .font-tip{
            color: #0070C9;
        }
        .font-err{
            color: $color-waring;
        }
        .detail-item{
            float: left;
            text-align: right;
            p{
                text-align: center;
                color: #62778C;
            }
            &.item-active{
                .icon-dot,.icon-line{
                    background: #0070C9;
                }
                p{
                    color: #0070C9;
                }
            }
            &.item-err{
                .icon-dot,.icon-line{
                    background: $color-waring;
                }
                p{
                    color: $color-waring;
                }
            }
            .detail-content{
                display: inline-block;
                transform: translateX(36%);
                .time{
                    margin: 4px 0;
                    font-size: $font-small;
                    line-height: 1;
                }
            }
        }

    }
</style>
<style lang="scss" >
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
    .dialog-wrap{
        .el-dialog__body{
            padding: 0 20px 40px 20px;
        }
    }
</style>