<template>
  <div class="platform commodity">
    <navbar></navbar>
    <div class="g-content">
      <!--.....................tab........................-->
      <el-tabs v-model="tabForShow"  @tab-click="tabclick">
        <el-tab-pane label="角色分佣" name="1">
          <div class="clearfix">
            <el-button class='store-button1 float-r' @click="edit1">
              <i class="iconfont icon-baocun f12"></i>
              <span v-if="status!=1">修改比例</span>
              <span v-else>保存</span>
            </el-button>
          </div>
          <table class="u-table" cellspacing="0">
            <tr>
              <th>加盟角色</th>
              <th>发展来源</th>
              <th>分佣角色</th>
              <th>分佣比例</th>
            </tr>
            <tr>
              <td>代理商</td>
              <td>平台</td>
              <td>平台</td>
              <td width='322'><span v-if="status!=1">100%</span>
                <el-input v-else size="samll"></el-input>
              </td>
            </tr>
            <tr>
              <td rowspan="4">合伙人</td>
              <td rowspan="2">平台</td>
              <td>平台</td>
              <td width='322'><span v-if="status!=1">100%</span>
                <el-input v-else size="samll"></el-input>
              </td>
            </tr>
            <tr>
              <td>代理商</td>
              <td width='322'> <span v-if="status!=1">100%</span>
                <el-input v-else size="samll"></el-input>
              </td>
            </tr>
            <tr>
              <td rowspan="2">代理商</td>
              <td>平台</td>
              <td width='322'><span v-if="status!=1">100%</span>
                <el-input v-else size="samll"></el-input>
              </td>
            </tr>
            <tr>
              <td>代理商</td>
              <td width='322'><span v-if="status!=1">100%</span>
                <el-input v-else size="samll"></el-input>
              </td>
            </tr>
          </table>
        </el-tab-pane>
        <el-tab-pane label="会员分佣" name="2">
          <div class="clearfix">
            <el-button class='store-button1 float-r' @click="edit2">
              <i class="iconfont icon-baocun f12"></i>
              <span v-if="status!=2">修改比例</span>
              <span v-else>保存</span>
            </el-button>
          </div>
          <table class="u-table" cellspacing="0">
            <tr>
              <th>会员来源</th>
              <th>分佣角色</th>
              <th>分佣比例</th>
            </tr>
            <tr>
              <td>平台</td>
              <td>平台</td>
              <td width='322'><span v-if="status!=2">100%</span>
                <el-input v-else size="samll"></el-input>
              </td>
            </tr>
            <tr>
              <td rowspan="2">代理商</td>
              <td>平台</td>
              <td width='322'><span v-if="status!=2">100%</span>
                <el-input v-else size="samll"></el-input>
              </td>
            </tr>
            <tr>
              <td>代理商</td>
              <td width='322'> <span v-if="status!=2">100%</span>
                <el-input v-else size="samll"></el-input>
              </td>
            </tr>
            <tr>
              <td rowspan="3">合伙人</td>
              <td>平台</td>
              <td width='322'><span v-if="status!=2">100%</span>
                <el-input v-else size="samll"></el-input>
              </td>
            </tr>
            <tr>
              <td>代理商</td>
              <td width='322'><span v-if="status!=2">100%</span>
                <el-input v-else size="samll"></el-input>
              </td>
            </tr>
            <tr>
              <td>合伙人</td>
              <td width='322'><span v-if="status!=2">100%</span>
                <el-input v-else size="samll"></el-input>
              </td>
            </tr>
            <tr>
              <td rowspan="4">
                <p>服务商</p><span>（合伙人发展）</span></td>
              <td>平台</td>
              <td width='322'><span v-if="status!=2">100%</span>
                <el-input v-else size="samll"></el-input>
              </td>
            </tr>
            <tr>
              <td>代理商</td>
              <td width='322'><span v-if="status!=2">100%</span>
                <el-input v-else size="samll"></el-input>
              </td>
            </tr>
            <tr>
              <td>合伙人</td>
              <td width='322'><span v-if="status!=2">100%</span>
                <el-input v-else size="samll"></el-input>
              </td>
            </tr>
            <tr>
              <td>服务商</td>
              <td width='322'><span v-if="status!=2">100%</span>
                <el-input v-else size="samll"></el-input>
              </td>
            </tr>
            <tr>
              <td rowspan="3">
                <p>服务商</p><span>（非合伙人发展）</span></td>
              <td>平台</td>
              <td width='322'><span v-if="status!=2">100%</span>
                <el-input v-else size="samll"></el-input>
              </td>
            </tr>
            <tr>
              <td>代理商</td>
              <td width='322'><span v-if="status!=2">100%</span>
                <el-input v-else size="samll"></el-input>
              </td>
            </tr>
            <tr>
              <td>服务商</td>
              <td width='322'><span v-if="status!=2">100%</span>
                <el-input v-else size="samll"></el-input>
              </td>
            </tr>
          </table>
        </el-tab-pane>
        <el-tab-pane label="订单分佣" name="3">
          <h3>一.非会员消费</h3>
          <div class="clearfix">
            <el-button class='store-button1 float-r' @click="edit2">
              <i class="iconfont icon-baocun f12"></i>
              <span v-if="status!=2">修改比例</span>
              <span v-else>保存</span>
            </el-button>
          </div>
          <table class="u-table" cellspacing="0">
            <tr>
              <th>会员来源</th>
              <th>分佣角色</th>
              <th>分佣比例</th>
            </tr>
            <tr>
              <td>平台</td>
              <td>平台</td>
              <td width='322'><span v-if="status!=2">100%</span>
                <el-input v-else size="samll"></el-input>
              </td>
            </tr>
            <tr>
              <td rowspan="2">代理商</td>
              <td>平台</td>
              <td width='322'><span v-if="status!=2">100%</span>
                <el-input v-else size="samll"></el-input>
              </td>
            </tr>
            <tr>
              <td>代理商</td>
              <td width='322'> <span v-if="status!=2">100%</span>
                <el-input v-else size="samll"></el-input>
              </td>
            </tr>
            <tr>
              <td rowspan="3">合伙人</td>
              <td>平台</td>
              <td width='322'><span v-if="status!=2">100%</span>
                <el-input v-else size="samll"></el-input>
              </td>
            </tr>
            <tr>
              <td>代理商</td>
              <td width='322'><span v-if="status!=2">100%</span>
                <el-input v-else size="samll"></el-input>
              </td>
            </tr>
            <tr>
              <td>合伙人</td>
              <td width='322'><span v-if="status!=2">100%</span>
                <el-input v-else size="samll"></el-input>
              </td>
            </tr>
          </table>
           <h3 class="mt-10">二.会员消费</h3>
           <p class="color-7F mb-10 mt-10">先判断会员来源 <br>再判断服务商来源<br> 会员来源：平台、代理商、合伙人、服务商 <br>服务商来源：平台、代理商、合伙人</p>
          <h3>1.会员来源于平台</h3>
          <div class="clearfix">
            <el-button class='store-button1 float-r' @click="edit2">
              <i class="iconfont icon-baocun f12"></i>
              <span v-if="status!=2">修改比例</span>
              <span v-else>保存</span>
            </el-button>
          </div>
          <table class="u-table" cellspacing="0">
            <tr>
              <th>会员来源</th>
              <th>分佣角色</th>
              <th>分佣比例</th>
            </tr>
            <tr>
              <td>平台</td>
              <td>平台</td>
              <td width='322'><span v-if="status!=2">100%</span>
                <el-input v-else size="samll"></el-input>
              </td>
            </tr>
            <tr>
              <td rowspan="2">代理商</td>
              <td>平台</td>
              <td width='322'><span v-if="status!=2">100%</span>
                <el-input v-else size="samll"></el-input>
              </td>
            </tr>
            <tr>
              <td>代理商</td>
              <td width='322'> <span v-if="status!=2">100%</span>
                <el-input v-else size="samll"></el-input>
              </td>
            </tr>
            <tr>
              <td rowspan="3">合伙人</td>
              <td>平台</td>
              <td width='322'><span v-if="status!=2">100%</span>
                <el-input v-else size="samll"></el-input>
              </td>
            </tr>
            <tr>
              <td>代理商</td>
              <td width='322'><span v-if="status!=2">100%</span>
                <el-input v-else size="samll"></el-input>
              </td>
            </tr>
            <tr>
              <td>合伙人</td>
              <td width='322'><span v-if="status!=2">100%</span>
                <el-input v-else size="samll"></el-input>
              </td>
            </tr>
          </table>
           <h3>2.会员来源于代理商</h3>
          <div class="clearfix">
            <el-button class='store-button1 float-r' @click="edit2">
              <i class="iconfont icon-baocun f12"></i>
              <span v-if="status!=2">修改比例</span>
              <span v-else>保存</span>
            </el-button>
          </div>
          <table class="u-table" cellspacing="0">
            <tr>
              <th>会员来源</th>
              <th>分佣角色</th>
              <th>分佣比例</th>
            </tr>
            <tr>
              <td>平台</td>
              <td>平台</td>
              <td width='322'><span v-if="status!=2">100%</span>
                <el-input v-else size="samll"></el-input>
              </td>
            </tr>
            <tr>
              <td rowspan="2">代理商</td>
              <td>平台</td>
              <td width='322'><span v-if="status!=2">100%</span>
                <el-input v-else size="samll"></el-input>
              </td>
            </tr>
            <tr>
              <td>代理商</td>
              <td width='322'> <span v-if="status!=2">100%</span>
                <el-input v-else size="samll"></el-input>
              </td>
            </tr>
            <tr>
              <td rowspan="3">合伙人</td>
              <td>平台</td>
              <td width='322'><span v-if="status!=2">100%</span>
                <el-input v-else size="samll"></el-input>
              </td>
            </tr>
            <tr>
              <td>代理商</td>
              <td width='322'><span v-if="status!=2">100%</span>
                <el-input v-else size="samll"></el-input>
              </td>
            </tr>
            <tr>
              <td>合伙人</td>
              <td width='322'><span v-if="status!=2">100%</span>
                <el-input v-else size="samll"></el-input>
              </td>
            </tr>
          </table>
           <h3>一.非会员消费</h3>
          <div class="clearfix">
            <el-button class='store-button1 float-r' @click="edit2">
              <i class="iconfont icon-baocun f12"></i>
              <span v-if="status!=2">修改比例</span>
              <span v-else>保存</span>
            </el-button>
          </div>
          <table class="u-table" cellspacing="0">
            <tr>
              <th>会员来源</th>
              <th>分佣角色</th>
              <th>分佣比例</th>
            </tr>
            <tr>
              <td>平台</td>
              <td>平台</td>
              <td width='322'><span v-if="status!=2">100%</span>
                <el-input v-else size="samll"></el-input>
              </td>
            </tr>
            <tr>
              <td rowspan="2">代理商</td>
              <td>平台</td>
              <td width='322'><span v-if="status!=2">100%</span>
                <el-input v-else size="samll"></el-input>
              </td>
            </tr>
            <tr>
              <td>代理商</td>
              <td width='322'> <span v-if="status!=2">100%</span>
                <el-input v-else size="samll"></el-input>
              </td>
            </tr>
            <tr>
              <td rowspan="3">合伙人</td>
              <td>平台</td>
              <td width='322'><span v-if="status!=2">100%</span>
                <el-input v-else size="samll"></el-input>
              </td>
            </tr>
            <tr>
              <td>代理商</td>
              <td width='322'><span v-if="status!=2">100%</span>
                <el-input v-else size="samll"></el-input>
              </td>
            </tr>
            <tr>
              <td>合伙人</td>
              <td width='322'><span v-if="status!=2">100%</span>
                <el-input v-else size="samll"></el-input>
              </td>
            </tr>
          </table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import Navbar from "@/components/platform/Navbar";
  export default {
    name: "join",
    data() {
      return {
        tabForShow: "1",
        status: 0 //0保存 1修改角色 2修改会员 3修改订单
      }
    },
    components: {
      Navbar
    },
    methods: {
      tabclick() {
        this.status = 0;
      },
      edit1() {
        this.status = this.status != 1 ? 1 : 0;
      },
      edit2() {
        this.status = this.status != 2 ? 2 : 0;
      }
    }
  };
</script>
<style scoped="scoped" lang="scss">
  .u-table {
    border: 0;
    margin-top: 20px;
    width: 100%;
    text-align: left;
    th {
      height: 40px;
      background: #F0F4F7;
      color: #62778C;
      font-weight: normal;
    }
    td {
      height: 50px;
      border-bottom: 1px solid #E6E6E6;
      border-right: 1px solid #E6E6E6;
      &:last-child {
        border-right: 0;
      }
    }
    th,
    td {
      padding-left: 20px;
    }
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
</style>
