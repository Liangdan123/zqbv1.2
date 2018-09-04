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
					class="float-r"></search>
			</div>
			<!--.........................表格..................-->
			<el-table :data="list.data" 
				style="width: 100%" 
				:empty-text="emptyText"
				v-loading="loading">
				<el-table-column prop="shop_logo" width="70">
					<template slot-scope="props">
						<img :src="props.row.shop_logo" width="50" height="50">
					</template>
				</el-table-column>
				<el-table-column prop="shop_name" label="店铺名称"></el-table-column>
				<el-table-column prop="shopkeeper_name" label="店长"></el-table-column>
				<el-table-column prop="shopkeeper_phone" label="联系方式"></el-table-column>
				<el-table-column prop="created_at" label="开店时间"></el-table-column>
				<el-table-column prop="statistics_shop.score" label="店铺评分"></el-table-column>
				<el-table-column prop="statistics_shop.product_num" label="在售商品(件)"></el-table-column>
				<el-table-column  label="操作">
					<template slot-scope="scope">
						<el-button type="text" size="small" class="btn-delete" @click="storeDetail(scope.$index)">
							店铺详情
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
	import {getStoreList} from "@/api/platform"
	import page from "@/utils/page"
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
			}
		},
		mixins:[page],
		watch:{
			activeName(val){//监听事件变化
				this.searchCondition={//搜索条件
					search:{
						is_company:Number(this.activeName),
					},
					page: 1,
					per_page: 20,
				};
				this.loading=true;
				this._doSearch();
			}
		},
		methods:{
			_doSearch(){
				getStoreList(this.searchCondition)
				.then(({data})=>{
					this.list=data;
					this.loading=false;
				})
				.catch(({response: {data}})=>{
					this.$message.error(data.errorcmt);
				})
			},
			storeDetail(index){//点击店铺详情
				
			},
			searchRole(){//搜索角色
				this.emptyText="未搜索到相关匹配信息";
				this._doSearch();
			},
			searchInput(){
				this.emptyText="未搜索到相关匹配信息";
				this._doSearch();
			},
		}
	}
</script>

<style lang="scss">
	.storeManage{
		margin-top: 120px;
		.el-table{
			td{
				height: 70px;
			}
		}
	}
</style>