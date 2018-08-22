<template>
	<div class="memberCenter">
		<div class="content">
			<!--................累计金额.............-->
			<member :money="money"></member>
			<!--................会员管理与充值优惠管理切换.............-->
			<div class="content-con mt-20">
				<el-tabs v-model="activeName">
					<div class="buttons clearfix mb-20">
						<search :search.sync="searchCondition.search" @searchMethod="searchMethod" ref="isShow" selectTitle='筛选条件' hintMess="输入相关信息进行搜索">
						</search>
					</div>
					<el-tab-pane label="会员管理" name="first">
						<!-- 会员管理表格 数据父组件提供 -->
						<vipTable :searchCondition='searchCondition' :list="list" :total="total"></vipTable>
					</el-tab-pane>
				</el-tabs>
			</div>
		</div>
	</div>
</template>

<script>
	import {getMemMoney} from "@/api/marketing"
	 import {
    getMemLists
  } from "@/api/marketing"
	import vipTable from "@/components/marketing/vipTable"
	import member from "@/components/marketing/member"
	import page from '@/utils/page'
	export default {
		components: {
			vipTable,
			member
		},
		mixins: [page],
		data() {
			return {
				money: {},
				activeName: "first",
				searchCondition: {
					page: 1,
					search: {},
					per_page: 20
				},
				list: []
			}
		},
		created() {
			//调用获取会员统计数据API
			 var mall_id = this.$store.getters.getMall_id;
			getMemMoney(mall_id)
				.then(({
					data
				}) => {
					this.money = data;
				})
				.catch(({
					response: {
						data
					}
				}) => {
					this.$message.error(data.errorcmt);
				})
		},
		methods: {
			_doSearch() {
        getMemLists(this.searchCondition)
          .then(({
            data
          }) => {
            this.list = data.data;
          })
          .catch(({
            response: {
              data
            }
          }) => {
            this.$message.error(data.errorcmt);
          });
      },
		}
	}
</script>

<style scoped="scoped">
	.memberCenter {
		margin-top: 120px;
	}
	.content {
		box-sizing: border-box;
		width: 1240px;
		min-height: 204px;
		border-radius: 4px;
		margin: 0 auto;
	}
	.border-b {
		border-bottom: 1px solid #F0F4F7;
	}
	.content-con {
		padding: 20px;
		background-color: #fff;
	}
</style>
