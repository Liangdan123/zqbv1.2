<template>
	<div class="orderTable commodity" @click="closeSearch">
		<!--..............订单详情弹框..................-->
		<el-dialog title="查看佣金" :visible.sync="Visible" size="tiny" :close-on-click-modal="false">
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="Visible=false">确定</el-button>
			</div>
		</el-dialog>
		<div class="g-content">
			 <!--.....................tab........................-->
      <el-tabs v-model="tabForShow" @tab-click="tabSwitch">
        <el-tab-pane label="申请列表" name="1"></el-tab-pane>
        <el-tab-pane label="未付款" name="2"></el-tab-pane>
        <el-tab-pane label="已完成" name="3"></el-tab-pane>
        <el-tab-pane label="已拒绝" name="4"></el-tab-pane>
      </el-tabs>
			<!--.....................搜索框........................-->
			<div class="buttons clearfix mb-20">
        <searchRole :search.sync="searchCondition.search" :inputType="['is_company', 'business_range']" @searchMethod="searchMethod" ></searchRole>
        <search :search.sync="searchCondition.search"  @searchMethod="searchMethod" ref="isShow" selectTitle='筛选条件' hintMess="输入相关信息进行搜索">
        </search>
        <!-- 表格 -->
         <el-table class="table mt-20" v-loading="tableDataLoading" :data="list" style="width: 100%">
        <el-table-column prop="city" label="订单号" ></el-table-column>
        <el-table-column prop="type" label="服务商"></el-table-column>
        <el-table-column prop="contact_name" label="姓名"></el-table-column>
        <el-table-column prop="phone" label="合伙人"></el-table-column>
        <el-table-column prop="created_at" label="创建时间" sortable></el-table-column>
        <el-table-column prop="price" label="订单金额" sortable></el-table-column>
        <el-table-column prop="status" label="订单状态"></el-table-column>
        <el-table-column width="120" label="操作">
          <span slot-scope="scope" class="btn" @click="check(scope.row)">查看记录</span>
        </el-table-column>
      </el-table>
      <el-pagination class="pagination mt-20" v-if="total>searchCondition.per_page" @current-change="handleCurrentChange" :current-page.sync="searchCondition.page"
        :page-size="searchCondition.per_page" layout="total, prev, pager, next" :total="total">
      </el-pagination>
      </div>
		</div>
	</div>
</template>

<script>
	import page from "@/utils/page"
	export default {
		name: "allOrder",
		data() {
			return {
				Visible: false, //弹框显示
				tableDataLoading: false,
				tabForShow: "1",
				searchCondition: {
					page: 1,
					search: {
						status: "1",
						is_company: "1"
					},
					per_page: 20
        },
        status:2,//:1平台,2代理商,3合伙人,4服务商
        list:[1]
			}
		},
		components: {},
		mixins: [page],
		created() {
      let status=this.$store.getters.getType//获取用户身份
			this.searchCondition.search.status = this.tabForShow;
		},
		methods: {
      check(data){
        this.Visible=true;
      },
			closeSearch() {
				this.$refs.isShow.closeSearch();
			},
			tabSwitch({
				name
			}) {
				// tab面板切换
				this.searchCondition.page = 1;
				this.searchCondition.search.status = this.tabForShow;
				this._doSearch();
			},
			_doSearch() {
				// 调用列表api
			}
		}
	}
</script>
<style scoped="scoped" lang="scss">
  .btn {
    font-size: 12px;
    color: #0070c9;
    cursor: pointer;
  }
  .orderTable{
    .el-dialog{
      min-width:711px;
    }
  }
</style>
<style lang="scss">
	.allOrder {
		.el-dialog__wrapper.order .el-dialog__title {
			font-size: 20px;
			color: #333;
		}
	}
</style>
