<template>
  <div class="commodity" @click="closeSearch">
    <!-- 查看详情弹窗 -->
    <el-dialog title="加盟申请详情" :visible.sync="Visible"  :close-on-click-modal="false">
      <joinMsgDetail :list='joinMsg'></joinMsgDetail>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="Visible=false">确定</el-button>
      </div>
    </el-dialog>
    <div class="g-content">
      <!--.....................tab........................-->
      <el-tabs v-model="tabForShow" @tab-click="tabSwitch">
        <el-tab-pane label="申请列表" name="1"></el-tab-pane>
        <el-tab-pane label="已通过" name="2"></el-tab-pane>
        <el-tab-pane label="未通过" name="3"></el-tab-pane>
      </el-tabs>
      <!--.....................搜索框........................-->
      <div class="buttons clearfix mb-20">
        <searchRole :search.sync="searchCondition.search" @searchMethod="searchMethod" :inputType="['is_company']"></searchRole>
        <search :search.sync="searchCondition.search" @searchMethod="searchMethod" @emptyMthod='searchMethod' ref="isShow" selectTitle='筛选条件'
          hintMess="输入相关信息进行搜索">
        </search>
      </div>
      <!--........................表格...............-->
      <el-table class="table" v-loading="tableDataLoading" :data="list" style="width: 100%">
        <el-table-column prop="type" label="角色">
          <div slot-scope="scope">{{scope.row.type==2?"代理商":scope.row.type==3?"合伙人":"服务商"}}</div>
        </el-table-column>
        <el-table-column prop="contact_name" label="姓名"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="company_name" label="公司名称" v-if="searchCondition.search.is_company=='1'"></el-table-column>
        <el-table-column prop="contact_email" label="常用邮箱" v-else></el-table-column>
        <el-table-column prop="created_at" label="创建时间"></el-table-column>
        <el-table-column width="120" label="操作">
          <span slot-scope="scope" class="u-btn" @click="check(scope.row.join_id)">查看详情</span>
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
  import page from '@/utils/page'
  export default {
    data() {
      return {
        joinMsg: {
          "join_id": 1,
          "join_no": "J18013110204412011155",
          "mall_id": 1,
          "is_company": 1,
          "type": 3,
          "cps_id": 0,
          "contact_name": "小王",
          "sex": 1,
          "identity_num": "330702211112222222",
          "phone": "18457922111",
          "wx_qq": "3323312",
          "contact_email": "cs@163.com",
          "province": "浙江省",
          "city": "金华市",
          "address": "豪森智慧谷6幢",
          "company_name": "快服科技",
          "business_range": "1,2,3",
          "business_range_name": "app开发,管理软件,人力资源",
          "license_url": "uploads/1/product/3/2018-07-26-14-30-38-5b596a8e76b2a.png",
          "identity_front_url": "uploads/1/product/3/2018-07-26-14-30-38-5b596a8e76b2a.png",
          "identity_back_url": "uploads/1/product/3/2018-07-26-14-30-38-5b596a8e76b2a.png",
          "pay_fee_yuan": 1000,
          "pay_type": "weixin",
          "audit_status": 1,
          "pay_status": 0,
          "commit_time": "2018-08-07 08:45:11",
          "audit_time": "2018-08-07 08:45:11",
          "pay_time": null,
          "remark": null,
          "created_at": "2018-08-07 08:45:11"
        },
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
        Visible:false,
        list: [{
          "join_id": 1,
          "join_no": "J18013110204412011155",
          "is_company": 1,
          "type": 2,
          "contact_name": "小王",
          "cps_id": 0,
          "phone": "18457922111",
          "province": "浙江省",
          "city": "金华市",
          "contact_email": "cs@163.com",
          "company_name": "快服科技",
          "business_range": "1,2,3",
          "business_range_name": "app开发,管理软件,人力资源",
          "pay_fee_yuan": 1000,
          "audit_status": 1,
          "pay_status": 0,
          "created_at": "2018-08-07 08:45:11"
        }],
      };
    },
    mixins: [page],
    created() {
      this.tabForShow = this.$route.query.tab || '1';
      this.searchCondition.search.status = this.tabForShow;
    },
    methods: {
      check(id){
        //根据id查数据
        this.Visible=true;
      },
      closeSearch() {
        this.$refs.isShow.closeSearch();
      },
      tabSwitch({name}) {            
        // tab面板切换
        this.searchCondition.page = 1;
        this.searchCondition.search={};
        this.searchCondition.search.status = this.tabForShow;
        this._doSearch();
      },
      _doSearch() {
        // 搜索入驻申请列表
        // this.tableDataLoading = true;
        // getShopApplyLists(this.searchCondition)
        //     .then(({
        //         data
        //     }) => {
        //         this.tableDataLoading = false;
        //         this.list = data.data;
        //         this.total = data.total;
        //     })
      }
    }
  };

</script>


<style lang="scss">
.commodity{
  .el-dialog--large{
    width: 1087px;
  }
  .el-dialog__body{
    padding:30px 50px;
  }
}
</style>
