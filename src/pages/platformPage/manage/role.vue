<template>
  <div class="platform commodity" @click="closeSearch">
    <Navbar></Navbar>
    <!--..............订单详情弹框..................-->
    <el-dialog :visible.sync="dialogVisible" :close-on-click-modal="false" :show-close="true" class="order" :title="title+'的链接'">
      <!--.................主体内容....................-->
      <url :urlArr="urlArr"></url>
    </el-dialog>
    <div class="g-content">
      <!--.....................搜索框........................-->
      <el-tabs v-model="tabForShow" @tab-click="tabSwitch">
        <el-tab-pane label="角色列表" name="1"></el-tab-pane>
        <el-tab-pane label="黑名单" name="2"></el-tab-pane>
      </el-tabs>
      <div class="buttons clearfix mb-20">
        <searchRole :search.sync="searchCondition.search" @searchMethod="searchMethod"></searchRole>
       <search :search.sync="searchCondition.search"  @searchMethod="searchMethod"  @emptyMthod='searchMethod' ref="isShow" selectTitle='筛选条件' hintMess="输入相关信息进行搜索">
        </search>
      </div>
      <!--........................表格...............-->
      <el-table class="table" v-loading="tableDataLoading" :data="list" style="width: 100%">
        <el-table-column prop="type" label="角色"></el-table-column>
        <el-table-column prop="contact_name" label="姓名"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="company_name" label="公司名称" v-if="searchCondition.search.is_company==1"></el-table-column>
        <el-table-column prop="contact_email" label="常用邮箱" v-else></el-table-column>
        <el-table-column prop="created_at" label="创建时间"></el-table-column>
        <el-table-column width="150" label="操作">
          <template slot-scope="scope">
            <p>
              <router-link :to="{path:'joinRecord',query:{'id':scope.row.join_id,'path':'role','tab':tabForShow}}" class="btn">查看详情</router-link>
            </p>
            <span class="u-btn" v-if="tabForShow==1" @click="open(scope.row.contact_name)">CPS链接</span>
            <span class="u-btn" v-if="tabForShow==1">加入黑名单</span>
            <span class="u-btn" v-else>移除黑名单</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="pagination mt-20" v-if="total>searchCondition.per_page" @current-change="handleCurrentChange" :current-page.sync="searchCondition.page"
        :page-size="searchCondition.per_page" layout="total, prev, pager, next" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import Navbar from "@/components/platform/manage/Navbar";
    import page from '@/utils/page'
  export default {
    name: "join",
    data() {
      return {
        list: [{
          "user_id": 1,
          "is_company": 1,
          "type": 2,
          "contact_name": "小王",
          "cps_id": 0,
          "phone": "18457922111",
          "province": "浙江省",
          "city": "金华市",
          "company_name": "快服科技",
          "business_range": "1,2,3",
          "business_range_name": "app开发,管理软件,人力资源",
          "created_at": "2018-08-07 08:45:11",
          "is_blacklist": 0
        }],
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
        dialogVisible: false, //弹框显示
        title: "",
        urlArr: []
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
      open(name) {
        //查询链接内容\
        let data = {
          "type": 2,
          "member_cps_url": "http://zqb.71baomu.com/reg/member?cps_id=1",
          "role_cps_url": "http://zqb.71baomu.com/reg/role?cps_id=1"
        };
        this.urlArr = [{
          "type": "角色发展链接",
          'url': data.role_cps_url
        }, {
          "type": "会员发展链接",
          'url': data.member_cps_url
        }];
        this.title = name;
        this.dialogVisible = true;
      },
      closeSearch() {
        this.$refs.isShow.closeSearch();
      },
       tabSwitch({
        name
      }) {
        // tab面板切换
        this.searchCondition.page = 1;
         this.searchCondition.search={};
        this.searchCondition.search.status=this.tabForShow;
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
<style scoped="scoped" lang="scss">
  .g-button {
    width: 1240px;
    margin: 10px auto;
  }

</style>
