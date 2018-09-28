<template>
	<div class="orderConsume" @click="closeSearch">
		<div class="clearfix">
			<search 
				hintMess="输入相关信息进行搜索" 
				selectTitle="筛选列表" 
				inputSearch="keyword"
				:search.sync="searchCondition.search" 
				@searchMethod="searchInput" 
				@emptyMthod="emptyMthod" 
				ref="closecondition" 
				class="float-r">
			</search>
		</div>

		
		<div v-loading="loading">		
	       	<div class="table-header clearfix">
	            <el-row>
	                <el-col :span="10" class="table-cell">商品</el-col>
	                <el-col :span="4" class="table-cell">单价</el-col>           
	                <el-col :span="4" class="table-cell">买家</el-col>
	                <el-col :span="6" class="table-cell">实际收款</el-col>
	            </el-row>
	        </div>
	        <div v-if="incomeOrderList.length">
	            <div
	                class="order-item"
	                v-for="(order,index) in incomeOrderList"
	                :key="index">
	                <div class="item-head">
	                    <span>订单号:{{order.split_no}}</span>
	                    <span>创建时间:{{order.created_at}}</span>
	                </div>
	                <div class="order-content">
	                    <el-row
	                        class="product"
	                        v-for="(product,product_index) in order.order_products"
	                        :key="product.order_product_id" >
	                        <el-col :span="10" class="table-cell">
	                            <div>
	                                <img :src="product.image_url" class="img-product-spec" >                                                                                                     
	                                <div class="info-right">
	                                    <p class="font-light name">{{product.product_name | ellipsis(32)}}</p>
	                                    <p class="font-normal spec">{{product.spec_name | ellipsis(32)}}</p>
	                                </div>
	                            </div>
	                        </el-col>
	                        <el-col
	                            :span="4"
	                            class="table-cell">
	                            {{product.total_spec_price_yuan}}
	                        </el-col>
	                        <el-col
	                            v-if="!product_index"
	                            :span="4"
	                            class="table-cell">
	                            {{order.shipping_info.contact_name}}
	                        </el-col>
	                        <el-col
	                            v-if="!product_index"
	                            :span="6"
	                            class="table-cell">
	                            <p class="order-total">{{order.pay_info.pay_fee_yuan||0 | money}}</p>
	                            <p class="order-fee font-normal">
	                                (优惠券:-{{order.pay_info.total_coupon_yuan||0 | money}})
	                            </p>
	                        </el-col>
	                        <el-col
	                            :span="10"
	                            class="empty table-cell"
	                            v-if="product_index">
	                            53kf
	                        </el-col>
	                    </el-row>
	                </div>
	            </div>
				<div class="clearfix mt-20">
					<el-pagination :total="list.total" 
						:current-page.sync="list.current_page" 
						:page-size="list.per_page" 
						layout="total, prev, pager, next" 
						@current-change="handleCurrentChange" 
						class="float-r">
					</el-pagination>
				</div>
	        </div>
	        
	        <div class="table-empty" v-else>
	           	未发现相关的记录
	        </div>
        </div>
	</div>
</template>

<script>
	import page from "@/utils/page"
	import {getOrderConsumeList} from "@/api/servicer"
	export default{
		name:"orderConsume",
		filters:{
			money(value){
                // 金额转换成数字和整数部分
                value = Number(value).toFixed(2).split('.');
                let value_int = Number(value[0]).toLocaleString();// 转换成金额形式
                return `￥ ${value_int}.${value[1]}`;
            },
            ellipsis(text,len){
                return text.length>len?`${text.substring(0,len)}...`:text
            }
		},
		data(){
			let id
			if(this.user_id){
				id=this.user_id;
			};
			return{
				incomeOrderList:[],//收入明细查询结果
				searchCondition:{ //搜索条件
					user_id:id,
					search: {},					
					page: 1,
					per_page: 20,
				},
				list:{data:[]},//订单收入列表数据(全部)
				loading:true,
			}
		},
		props:{
			user_id:{
				default:function(){
					return ""
				}
			},
		},
		mixins: [page],
		methods:{
			closeSearch(){//关闭搜索弹框
				this.$refs.closecondition.closeSearch()
			},
			searchInput(){
				this.searchMethod();
			},
			emptyMthod(){
				this.searchMethod();
			},
			_doSearch(){
				getOrderConsumeList(this.searchCondition)
	                .then(({data})=>{
                        this.incomeOrderList = data.data; 
                        this.list=data;
                        this.loading=false;
                    })
			},
		},
	}
</script>

<style lang="scss">
	.orderConsume{
		.table-header{
            margin-top: 15px;
            height: 40px;
            font-size: $font-normal;
            line-height: 40px;
            color: #62778C;
            background: #F0F4F7;
            .table-cell{
            	padding-left: 25px;
			    -webkit-box-sizing: border-box;
			    box-sizing: border-box;
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
        .order-item{
        	margin-top: 10px;       	
        	.item-head{
        		height: 32px;
			    text-align: right;
			    background: #EEF6FD;
			    span{
			    	padding: 0 20px;
				    font-size: 12px;
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
	}
</style>