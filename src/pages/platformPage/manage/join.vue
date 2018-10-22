<template>
  <div class="platform commodity" @click="closeSearch">
    <navbar></navbar>
    <!--..............订单详情弹框..................-->
    <div class="g-button">
      <router-link to="addrole">
        <el-button class="store-button1 add-child">
          <i class="iconfont icon-tianjia f12"></i>
          <span>添加角色</span>
        </el-button>
      </router-link>
    </div>
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
        <searchRole :search.sync="searchCondition.search"  
        	@searchMethod="searchMethod">
        	
        </searchRole>
        <search :search.sync="searchCondition.search" 
        	inputSearch='order_search' 
        	@searchMethod="searchMethod"  
        	@emptyMthod='searchMethod' 
        	ref="isShow" selectTitle='筛选条件' 
        	hintMess="输入相关信息进行搜索">
        </search>
      </div>
      <!--........................表格...............-->
      <el-table class="table" v-loading="tableDataLoading" :data="list" style="width: 100%">
        <el-table-column label="所属区域" prop="city"></el-table-column>
        <el-table-column prop="type" label="角色">
          <div slot-scope="scope">
          	{{scope.row.type==2?"代理商":scope.row.type==3?"合伙人":"服务商"}}
          </div>
        </el-table-column>
        <el-table-column prop="contact_name" label="姓名">
        	
        </el-table-column>
        <el-table-column prop="phone" label="手机号">
        	
        </el-table-column>
        <el-table-column prop="company_name" label="公司名称" v-if="searchCondition.search.is_company==1">
        	
        </el-table-column>
        <el-table-column prop="contact_email" label="常用邮箱" v-else></el-table-column>
        <el-table-column prop="created_at" label="创建时间"></el-table-column>
        <el-table-column width="120" label="操作">
          <router-link :to="{path:'joinRecord',query:{'id':scope.row.join_id,'tab':tabForShow,'path':'join'}}" 
          	slot-scope="scope"
            class="u-btn">
            	查看记录
          </router-link>
        </el-table-column>
      </el-table>
      <el-pagination
      	class="pagination mt-20" 
      	v-if="total>searchCondition.per_page" 
      	@current-change="handleCurrentChange" 
      	:current-page.sync="searchCondition.page"
        :page-size="searchCondition.per_page" 
        layout="total, prev, pager, next" 
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import Navbar from "@/components/platform/manage/Navbar";
  import page from '@/utils/page'
	import {getAppllyList} from "@/api/platform"

  export default {
    data() {
      return {
        tableDataLoading: false,
        tabForShow: "1",
        searchCondition: {
          page: 1,
          search: {
            status:"1",
            is_company:1
          },
          per_page: 20
        },
        list: [],
      };
    },
    mixins: [page],
    components: {
      Navbar
    },
    created() {
      this.tabForShow=this.$route.query.tab||'1';
      this.searchCondition.search.status=this.tabForShow;
    },
    methods: {
      closeSearch() {
        this.$refs.isShow.closeSearch();
      },
      tabSwitch({name}) {// tab面板切换                
        this.searchCondition.page = 1;
        this.searchCondition.search={
        	is_company:1,
        	status:this.tabForShow
        };
        this.searchMethod()
      },
      _doSearch() {
        // 搜索入驻申请列表
        this.tableDataLoading = true;
        getAppllyList(this.searchCondition)
            .then(({data }) => {                          
                this.tableDataLoading = false;
                this.list = data.data;
                this.total = data.total;
            })
      }
    }
  };

</script>
<style scoped="scoped" lang="scss">
  .g-button {
    width: 1240px;
    margin: 10px auto;
  }

</style>