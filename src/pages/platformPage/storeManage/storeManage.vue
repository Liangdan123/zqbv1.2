<template>
	<div class="storeManage">
		<div class="g-content">
			<el-tabs v-model="activeName">	 							
			    <el-tab-pane label="企业" name="1">
			    </el-tab-pane>
			    <el-tab-pane label="个人" name="0">		    	
			    </el-tab-pane>
			</el-tabs>
			<div class="clearfix mb-20">
				<searchRole :inputType=searchArray 
					:search.sync="searchCondition.search"
					@searchMethod="searchRole"
					class="float-l"></searchRole>
					
				<search :componentList="['input']"
					:search.sync="searchCondition.search"
					@searchMethod="searchInput"	
					inputSearch='shop_name'	
					hintMess="输入相关信息进行搜索"		
					class="float-r"></search>
			</div>
			<!--.........................表格..................-->
			<el-table :data="list.data" 
				style="width: 100%" 
				:empty-text="emptyText"
				v-loading="loading">
				<el-table-column prop="shop_logo" width="70">
					<template slot-scope="props">
						<img :src="props.row.shop_logo||imgUrl" width="50" height="50">
					</template>
				</el-table-column>
				<el-table-column prop="shop_name" label="店铺名称"></el-table-column>
				<el-table-column prop="shopkeeper_name" label="店长"></el-table-column>
				<el-table-column prop="shopkeeper_phone" label="联系方式"></el-table-column>
				<el-table-column prop="created_at" label="开店时间" width='160'></el-table-column>
				<el-table-column prop="statistics_shop.score" label="店铺评分" ></el-table-column>
					<el-table-column  label="店铺状态">
						<span slot-scope="scope">
							{{scope.row.close_status==0?'正常营业':'已关闭'}}
						</span>
					</el-table-column>
				<el-table-column prop="statistics_shop.product_num" label="在售商品(件)"></el-table-column>
				<el-table-column  label="操作" width='150'>
					<template slot-scope="scope">
						<el-button type="text" 
							size="small" 
							class="btn-delete" 
							@click="storeDetail(scope.row.shop_id)">
							店铺详情
						</el-button>
						<el-button type="text" 
							size="small" 
							class="btn-delete" 
							@click="setShop(scope.row.shop_id,scope.row.close_status)">
							{{scope.row.close_status==0?'关闭店铺':'开启店铺'}}
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			
			<div class="clearfix mt-20">
				<el-pagination :total="list.total"
					:current-page.sync="list.current_page" 
					:page-size="list.per_page"
					layout="total, prev, pager, next"
					@current-change="handleCurrentChange"
					v-if="list.total>list.per_page"
					class="pagination float-r">
					
				</el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
	import * as links from "@/links/index"
	import {getStoreList,closeShop,openShop} from "@/api/platform"
	import page from "@/utils/page"
	import router from "@/router"
	export default{		
		data(){
			return{
				activeName:"1",
				searchCondition:{//搜索条件
					search:{
						is_company:1,
					},
					page: 1,
					per_page: 20,
				},
				list:{},
				loading:true,
				emptyText:"暂无数据",
				searchArray:['business_range'],
				imgUrl:links.IMG,
			}
		},
		mixins:[page],
		watch:{
			activeName(val){//监听事件变化
				this.searchCondition={//搜索条件
					search:{
						is_company:+this.activeName,
					},
					page: 1,
					per_page: 20,
				};
				this.loading=true;
				this.searchMethod();
			}
		},
		methods:{
			_doSearch(){
				getStoreList(this.searchCondition)
				.then(({data})=>{
					this.list=data;
					this.loading=false;
				})
			},
			storeDetail(shop_id){//点击店铺详情
				router.push({path:"/mallZxh/storeMessage",query:{shop_id:shop_id}})
			},
			searchRole(){//搜索角色
				this.emptyText="未搜索到相关匹配信息";
				this.searchMethod();
			},
			searchInput(){
				this.emptyText="未搜索到相关匹配信息";
				this.searchMethod();
			},
			setShop(id,status){
				if(status==0){
					closeShop(id).then(({data})=>{
						this.$message.success('关闭店铺成功')
						this._doSearch();
					})
				}else{
					openShop(id).then(({data})=>{
						this.$message.success('开启店铺成功')
						this._doSearch();
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.storeManage{
		margin-top: 80px;
		.el-table{
			td{
				height: 70px;
			}
		}
	}
</style>