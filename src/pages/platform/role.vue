<template>
  <div class="platform commodity" @click="closeSearch">
    <navbar></navbar>
    <!--..............订单详情弹框..................-->
    <el-dialog :visible.sync="dialogVisible" :close-on-click-modal="false" :show-close="false" class="order" :title="'xxx'">
      <svg width="26" height="26" class="closebox cursor" @click="dialogVisible = false">
          <use xlink:href="#close" />
        </svg>
      <!--.................主体内容....................-->
      <el-table class="table" style="width: 100%">
        <el-table-column prop="type" label="属性" width="173"></el-table-column>
        <el-table-column prop="type" label="注册链接"></el-table-column>
        <el-table-column width="130" label="操作">
          <span class="btn" slot-scope="scope">复制链接</span>
        </el-table-column>
      </el-table>
    </el-dialog>
    <div class="g-content">
      <!--.....................搜索框........................-->
      <el-tabs v-model="tabForShow" @tab-click="tabSwitch">
        <el-tab-pane label="角色列表" name="1"></el-tab-pane>
        <el-tab-pane label="黑名单" name="2"></el-tab-pane>
      </el-tabs>
      <div class="buttons clearfix mb-20">
        <el-select v-model="value1" placeholder="请选择" size="small">
          <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="value2" placeholder="请选择" size="small">
          <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="value3" placeholder="请选择" size="small">
          <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <search @searchmthod="_doSearch" @inputsearch="inputSearch" @emptymthod="emptyMthod" ref="isShow" selectTitle='筛选条件' hintMess="输入相关信息进行搜索">
        </search>
      </div>
      <!--........................表格...............-->
      <el-table class="table" v-loading="tableDataLoading" :data="[1]" style="width: 100%">
        <el-table-column prop="type" label="角色"></el-table-column>
        <el-table-column prop="type" label="姓名"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="company_name" label="公司名称" v-if="value1=='1'"></el-table-column>
        <el-table-column prop="contact_email" label="常用邮箱" v-else></el-table-column>
        <el-table-column prop="created_at" label="创建时间"></el-table-column>
        <el-table-column width="150" label="操作">
          <template slot-scope="scope">
      <p class="btn">
        查看记录</p>
      <span class="btn">CPS链接</span>
      <span class="btn">加入黑名单</span>
</template>
        </el-table-column>
      </el-table>
      <el-pagination class="pagination mt-20" v-if="resultTotalForFilter>pageSize" @current-change="handleCurrentChange" :current-page.sync="currentPage"
        :page-size="pageSize" layout="total, prev, pager, next" :total="resultTotalForFilter">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import Navbar from "@/components/platform/Navbar";
  import search from "@/components/order/searchOrder";
  export default {
    name: "join",
    data() {
      return {
        value1: "1",
        options1: [{
            value: "1",
            label: "企业"
          },
          {
            value: "2",
            label: "个人"
          }
        ],
        value2: "1",
        options2: [{
            value: "1",
            label: "全部"
          },
          {
            value: "2",
            label: "服务商"
          },
          {
            value: "3",
            label: "代理商"
          },
          {
            value: "4",
            label: "合伙人"
          }
        ],
        value3: "1",
        options3: [{
            value: "1",
            label: "全部"
          },
          {
            value: "2",
            label: "工商注册、财务记账"
          },
          {
            value: "3",
            label: "管理软件"
          },
          {
            value: "4",
            label: "网站app开发"
          },
          {
            value: "5",
            label: "人力资源"
          },
          {
            value: "6",
            label: "资质许可证"
          },
          {
            value: "7",
            label: "认证服务"
          },
          {
            value: "8",
            label: "知识产权"
          },
          {
            value: "9",
            label: "企业信用评级"
          },
          {
            value: "10",
            label: "法律顾问"
          },
          {
            value: "11",
            label: "投融资"
          }
        ],
        tableDataLoading: false,
        tabForShow: "1",
        pageSize: 20, //每页显示几条
        currentPage: 1,
        type: "", //传到子集的标题
        orderMess: {
          page: 1,
          search: {
            type: 0
          },
          per_page: 20
        },
        filterResults: [],
        resultTotalForFilter: 100,
        dialogVisible: false //弹框显示
      };
    },
    components: {
      Navbar,
      search
    },
    created() {
      // this.searchMethods(this.orderMess)
    },
    methods: {
      handleCurrentChange() {
      },
      emptyMthod() {
        // if (this.orderMess.search.create_time != undefined) {
        //   delete this.orderMess.search.create_time
        // }
        this._doSearch();
      },
      closeSearch() {
        this.$refs.isShow.closeSearch();
      },
      inputSearch(data) {
        // if(data===""){
        // 	//当值为空的时候全部显示出列表
        // 	if(this.orderMess.search.order_search!==undefined){
        // 		delete this.orderMess.search.order_search
        // 	}
        // }else{
        // 	this.$set(this.orderMess.search,"order_search",data);
        // }
        // this._doSearch()
      },
      tabSwitch({
        name
      }) {
        // tab面板切换
        this.currentPage = 1;
        this.resultTotalForFilter = 0;
        // 搜索条件固定部分
        let search_condition_base = {
          search: {
            type: ""
          },
          page: 1
        };
        // 根据显示部分扩展对应的搜索条件
        if (name === "pending") {
          Object.assign(search_condition_base.search, {
            type: 1
          });
        } else {
          Object.assign(search_condition_base.search, {
            type: 2
          });
        }
        // 搜索条件赋值 执行搜索
        this.searchCondition = search_condition_base;
        this._doSearch();
      },
      _doSearch() {
        // 搜索入驻申请列表
        this.tableDataLoading = true;
        this.searchCondition.per_page = this.pageSize;
        // getShopApplyLists(this.searchCondition)
        //     .then(({
        //         data
        //     }) => {
        //         this.tableDataLoading = false;
        //         this.filterResults = data.data;
        //         this.resultTotalForFilter = data.total;
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
  .btn {
    font-size: 12px;
    color: #0070c9;
  }
</style>
<style lang="scss">
  .platform {
    .el-tabs__item {
      font-size: $font-normal;
      color: $color-base;
      &.is-active {
        font-weight: 600;
        color: $color-light;
      }
    }
    .el-tabs__active-bar {
      background-color: $color-light;
    }
  }
  .el-dialog__wrapper.order .el-dialog__title {
    font-size: 20px;
    color: #333;
  }
  .el-select {
    input.el-input__inner {
      border-radius: 2px;
      height: 32px;
    }
    margin-right: 16px;
    width: 200px;
  }
</style>
