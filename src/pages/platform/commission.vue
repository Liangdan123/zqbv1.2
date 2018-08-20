<template>
  <div class="platform commodity">
    <navbar></navbar>
    <div class="g-content">
      <!--.....................tab........................-->
      <el-tabs v-model="tabForShow" @tab-click="tabclick">
        <el-tab-pane label="角色分佣" name="1">
          <div class="clearfix">
            <el-button class='store-button1 float-r' @click="edit(1)">
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
              <td width='322'>100%</td>
            </tr>
            <tr>
              <td rowspan="4">合伙人
                <p class="color-7F">总额等于100%</p>
              </td>
              <td rowspan="2">平台</td>
              <td>平台</td>
              <td width='322'>
                <span v-if="status!=1">{{list1[1].rate}}</span>
                <el-input v-else size="samll" v-model="list1Coyp[1].rate"></el-input>%
              </td>
            </tr>
            <tr>
              <td>代理商</td>
              <td width='322'>
                <span v-if="status!=1">{{list1[2].rate}}</span>
                <el-input v-else size="samll" v-model="list1Coyp[2].rate"></el-input>%
              </td>
            </tr>
            <tr>
              <td rowspan="2">代理商</td>
              <td>平台</td>
              <td width='322'>
                <span v-if="status!=1">{{list1[3].rate}}</span>
                <el-input v-else size="samll" v-model="list1Coyp[3].rate"></el-input>%
              </td>
            </tr>
            <tr>
              <td>代理商</td>
              <td width='322'>
                <span v-if="status!=1">{{list1[4].rate}}</span>
                <el-input v-else size="samll" v-model="list1Coyp[4].rate"></el-input>%
              </td>
            </tr>
          </table>
        </el-tab-pane>
        <el-tab-pane label="会员分佣" name="2">
          <div class="clearfix">
            <el-button class='store-button1 float-r' @click="edit(2)">
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
              <td width='322'>100%</td>
            </tr>
            <tr>
              <td rowspan="2">代理商
                <p class="color-7F">总额等于100%</p>
              </td>
              <td>平台</td>
              <td width='322'>
                <span v-if="status!=2">{{list2[1].rate}}</span>
                <el-input v-else size="samll" v-model="list2Coyp[1].rate"></el-input>%
              </td>
            </tr>
            <tr>
              <td>代理商</td>
              <td width='322'>
                <span v-if="status!=2">{{list2[2].rate}}</span>
                <el-input v-else size="samll" v-model="list2Coyp[2].rate"></el-input>%
              </td>
            </tr>
            <tr>
              <td rowspan="3">合伙人
                <p class="color-7F">总额等于100%</p>
              </td>
              <td>平台</td>
              <td width='322'>
                <span v-if="status!=2">{{list2[3].rate}}</span>
                <el-input v-else size="samll" v-model="list2Coyp[3].rate"></el-input>%
              </td>
            </tr>
            <tr>
              <td>代理商</td>
              <td width='322'>
                <span v-if="status!=2">{{list2[4].rate}}</span>
                <el-input v-else size="samll" v-model="list2Coyp[4].rate"></el-input>%
              </td>
            </tr>
            <tr>
              <td>合伙人</td>
              <td width='322'>
                <span v-if="status!=2">{{list2[5].rate}}</span>
                <el-input v-else size="samll" v-model="list2Coyp[5].rate"></el-input>%
              </td>
            </tr>
            <tr>
              <td rowspan="4">
                <p>服务商</p>
                <span>(合伙人发展)</span>
                <p class="color-7F">总额等于100%</p>
              </td>
              <td>平台</td>
              <td width='322'>
                <span v-if="status!=2">{{list2[6].rate}}</span>
                <el-input v-else size="samll" v-model="list2Coyp[6].rate"></el-input>%
              </td>
            </tr>
            <tr>
              <td>代理商</td>
              <td width='322'>
                <span v-if="status!=2">{{list2[7].rate}}</span>
                <el-input v-else size="samll" v-model="list2Coyp[7].rate"></el-input>%
              </td>
            </tr>
            <tr>
              <td>合伙人</td>
              <td width='322'>
                <span v-if="status!=2">{{list2[8].rate}}</span>
                <el-input v-else size="samll" v-model="list2Coyp[8].rate"></el-input>%
              </td>
            </tr>
            <tr>
              <td>服务商</td>
              <td width='322'>
                <span v-if="status!=2">{{list2[9].rate}}</span>
                <el-input v-else size="samll" v-model="list2Coyp[9].rate"></el-input>%
              </td>
            </tr>
            <tr>
              <td rowspan="3">
                <p>服务商</p>
                <span>(非合伙人发展)</span>
                <p class="color-7F">总额等于100%</p>
              </td>
              <td>平台</td>
              <td width='322'>
                <span v-if="status!=2">{{list2[10].rate}}</span>
                <el-input v-else size="samll" v-model="list2Coyp[10].rate"></el-input>%
              </td>
            </tr>
            <tr>
              <td>代理商</td>
              <td width='322'>
                <span v-if="status!=2">{{list2[11].rate}}</span>
                <el-input v-else size="samll" v-model="list2Coyp[11].rate"></el-input>%
              </td>
            </tr>
            <tr>
              <td>服务商</td>
              <td width='322'>
                <span v-if="status!=2">{{list2[12].rate}}</span>
                <el-input v-else size="samll" v-model="list2Coyp[12].rate"></el-input>%
              </td>
            </tr>
          </table>
        </el-tab-pane>
        <el-tab-pane label="订单分佣" name="3">
          <h3>一.非会员消费</h3>
          <div class="clearfix color-7F mt-10">
            判断服务商来源
            <el-button class='store-button1 float-r' @click="edit(3)">
              <i class="iconfont icon-baocun f12"></i>
              <span v-if="status!=3">修改比例</span>
              <span v-else>保存</span>
            </el-button>
          </div>
          <table class="u-table border" cellspacing="0">
            <tr>
              <th>服务商来源</th>
              <th>分佣角色</th>
              <th>分佣比例</th>
            </tr>
            <tr>
              <td rowspan="2">平台
                <p class="color-7F">总额等于100%</p>
              </td>
              <td>平台</td>
              <td width='322'>
                    <span v-if="status!=3">{{list3[0].rate}}</span>
                <el-input v-else size="samll" v-model="list3Coyp[0].rate"></el-input>%
              </td>
            </tr>
            <tr>
              <td>代理商</td>
              <td width='322'>
                <span v-if="status!=3">{{list3[1].rate}}</span>
                <el-input v-else size="samll" v-model="list3Coyp[1].rate"></el-input>%
              </td>
            </tr>
            <tr>
              <td rowspan="2">代理商
                <p class="color-7F">总额等于100%</p>
              </td>
              <td>平台</td>
              <td width='322'>
                  <span v-if="status!=3">{{list3[2].rate}}</span>
                <el-input v-else size="samll" v-model="list3Coyp[2].rate"></el-input>%
              </td>
            </tr>
            <tr>
              <td>代理商</td>
              <td width='322'>
                 <span v-if="status!=3">{{list3[3].rate}}</span>
                <el-input v-else size="samll" v-model="list3Coyp[3].rate"></el-input>%
              </td>
            </tr>
            <tr>
              <td rowspan="3">合伙人
                <p class="color-7F">总额等于100%</p>
              </td>
              <td>平台</td>
              <td width='322'>
                  <span v-if="status!=3">{{list3[4].rate}}</span>
                <el-input v-else size="samll" v-model="list3Coyp[4].rate"></el-input>%
              </td>
            </tr>
            <tr>
              <td>代理商</td>
              <td width='322'>
                 <span v-if="status!=3">{{list3[5].rate}}</span>
                <el-input v-else size="samll" v-model="list3Coyp[5].rate"></el-input>%
              </td>
            </tr>
            <tr>
              <td>合伙人</td>
              <td width='322'>
                <span v-if="status!=3">{{list3[6].rate}}</span>
                <el-input v-else size="samll" v-model="list3Coyp[6].rate"></el-input>%
              </td>
            </tr>
          </table>
          <h3 class="mt-10">二.会员消费</h3>
          <p class="color-7F mb-10 mt-10 f14">先判断会员来源
            <br>再判断服务商来源
            <br> 会员来源：平台、代理商、合伙人、服务商
            <br>服务商来源：平台、代理商、合伙人</p>
          <h3 class="mb-10 clearfix">1.会员来源于平台则分成如下表1
            <el-button class='store-button1 float-r' @click="edit(4)">
              <i class="iconfont icon-baocun f12"></i>
              <span v-if="status!=2">修改比例</span>
              <span v-else>保存</span>
            </el-button>
          </h3>
          <table class="u-table border" cellspacing="0">
            <tr>
              <th>服务商来源</th>
              <th>分佣角色</th>
              <th>分佣比例</th>
            </tr>
            <tr>
              <td rowspan="2">平台
                <p class="color-7F">总额等于100%</p>
              </td>
              <td>平台</td>
              <td width='322'>
                <span v-if="status!=2">100</span>
                <el-input v-else size="samll"></el-input>%
              </td>
            </tr>
            <tr>
              <td>代理商</td>
              <td width='322'>
                <span v-if="status!=2">100</span>
                <el-input v-else size="samll"></el-input>%
              </td>
            </tr>
            <tr>
              <td rowspan="2">代理商
                <p class="color-7F">总额等于100%</p>
              </td>
              <td>平台</td>
              <td width='322'>
                <span v-if="status!=2">100</span>
                <el-input v-else size="samll"></el-input>%
              </td>
            </tr>
            <tr>
              <td>代理商</td>
              <td width='322'>
                <span v-if="status!=2">100</span>
                <el-input v-else size="samll"></el-input>%
              </td>
            </tr>
            <tr>
              <td rowspan="3">合伙人
                <p class="color-7F">总额等于100%</p>
              </td>
              <td>平台</td>
              <td width='322'>
                <span v-if="status!=2">100</span>
                <el-input v-else size="samll"></el-input>%
              </td>
            </tr>
            <tr>
              <td>代理商</td>
              <td width='322'>
                <span v-if="status!=2">100</span>
                <el-input v-else size="samll"></el-input>%
              </td>
            </tr>
            <tr>
              <td>合伙人</td>
              <td width='322'>
                <span v-if="status!=2">100</span>
                <el-input v-else size="samll"></el-input>%
              </td>
            </tr>
          </table>
          <h3 class="text-c f16 mt-10">表1</h3>
          <h3 class="mb-10 ">2.会员来源于代理商</h3>
          <p class="clearfix f14 mt-10">则在表1之前先抽取比例分给代理商，
            <span class="warn">然后再按表1进行分配。</span>
            <el-button class='store-button1 float-r' @click="edit(2)">
              <i class="iconfont icon-baocun f12"></i>
              <span v-if="status!=2">修改比例</span>
              <span v-else>保存</span>
            </el-button>
          </p>
          <table class="u-table border" cellspacing="0">
            <tr>
              <td width="336">代理商</td>
              <td>
                <span v-if="status!=2">100</span>
                <el-input v-else size="samll"></el-input>%
              </td>
            </tr>
          </table>
          <h3 class="mb-10 ">3.会员来源与合伙人</h3>
          <p class="clearfix f14 mt-10">则在表1之前先抽取比例
            <span class="warn">x%</span>的钱按比例分给（代理商、合伙人）。
            <span class="warn">然后再按表1进行分配。</span>
            <el-button class='store-button1 float-r' @click="edit(2)">
              <i class="iconfont icon-baocun f12"></i>
              <span v-if="status!=2">修改比例</span>
              <span v-else>保存</span>
            </el-button>
          </p>
          <table class="u-table border" cellspacing="0">
            <tr>
              <td width="336">代理商</td>
              <td>
                <span v-if="status!=2">100</span>
                <el-input v-else size="samll"></el-input>%
              </td>
            </tr>
            <tr>
              <td width="336">合伙人</td>
              <td>
                <span v-if="status!=2">100</span>
                <el-input v-else size="samll"></el-input>%
              </td>
            </tr>
          </table>
          <h3 class="mb-10 ">4.会员来源于服务商且服务商有合伙人</h3>
          <p class="clearfix f14 mt-10">则在表1之前先抽取比例
            <span class="warn">x%</span>的钱按比例分配给（代理商、合伙人、服务商），
            <span class="warn">然后再按表1进行分配。</span>
            <el-button class='store-button1 float-r' @click="edit(2)">
              <i class="iconfont icon-baocun f12"></i>
              <span v-if="status!=2">修改比例</span>
              <span v-else>保存</span>
            </el-button>
          </p>
          <table class="u-table border" cellspacing="0">
            <tr>
              <td width="336">代理商</td>
              <td>
                <span v-if="status!=2">100</span>
                <el-input v-else size="samll"></el-input>%
              </td>
            </tr>
            <tr>
              <td width="336">合伙人</td>
              <td>
                <span v-if="status!=2">100</span>
                <el-input v-else size="samll"></el-input>%
              </td>
            </tr>
            <tr>
              <td width="336">服务商</td>
              <td>
                <span v-if="status!=2">100</span>
                <el-input v-else size="samll"></el-input>%
              </td>
            </tr>
          </table>
          <h3 class="mb-10 ">5.会员来源于服务商且没有合伙人</h3>
          <p class="clearfix f14 mt-10">则在表1之前先抽取比例
            <span class="warn">x%</span>的钱按比例分配给（代理商、服务商），
            <span class="warn">然后再按表1进行分配。</span>
            <el-button class='store-button1 float-r' @click="edit(2)">
              <i class="iconfont icon-baocun f12"></i>
              <span v-if="status!=2">修改比例</span>
              <span v-else>保存</span>
            </el-button>
          </p>
          <table class="u-table border" cellspacing="0">
            <tr>
              <td width="336">代理商</td>
              <td>
                <span v-if="status!=2">100</span>
                <el-input v-else size="samll"></el-input>%
              </td>
            </tr>
            <tr>
              <td width="336">服务商</td>
              <td>
                <span v-if="status!=2">100</span>
                <el-input v-else size="samll"></el-input>%
              </td>
            </tr>
          </table>
          <h3 class="mb-10 ">消费分成的计算公式：分成金额=原价*佣金比例-用券金额</h3>
          <table class="u-table border" cellspacing="0">
            <tr>
              <td width="336">佣金比例</td>
              <td>
                <span v-if="status!=2">100</span>
                <el-input v-else size="samll"></el-input>%
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
    data() {
      return {
        tabForShow: "1",
        status: 0, //0保存 1修改角色 2修改会员 3修改订单
        list1: [{
            "join_role": 2,
            "yx_from": 1,
            "give_role": 1,
            "rate": 100
          },
          {
            "join_role": 3,
            "yx_from": 1,
            "give_role": 1,
            "rate": 95
          },
          {
            "join_role": 3,
            "yx_from": 1,
            "give_role": 2,
            "rate": 5
          },
          {
            "join_role": 3,
            "yx_from": 2,
            "give_role": 1,
            "rate": 90
          },
          {
            "join_role": 3,
            "yx_from": 2,
            "give_role": 2,
            "rate": 10
          }
        ],
        list1Coyp:[],
        list2Coyp:[],
        list3Coyp:[],
        list4Coyp:[],
        list5Coyp:[],
        list2: [{
            "yx_from": 1,
            "give_role": 1,
            "rate": 100
          },
          {
            "yx_from": 2,
            "give_role": 1,
            "rate": 95
          },
          {
            "yx_from": 2,
            "give_role": 2,
            "rate": 5
          },
          {
            "yx_from": 3,
            "give_role": 1,
            "rate": 80
          },
          {
            "yx_from": 3,
            "give_role": 2,
            "rate": 5
          },
          {
            "yx_from": 3,
            "give_role": 3,
            "rate": 15
          },
          {
            "yx_from": 4,
            "give_role": 1,
            "rate": 70
          },
          {
            "yx_from": 4,
            "give_role": 2,
            "rate": 10
          },
          {
            "yx_from": 4,
            "give_role": 3,
            "rate": 10
          },
          {
            "yx_from": 4,
            "give_role": 4,
            "rate": 10
          },
          {
            "yx_from": 5,
            "give_role": 1,
            "rate": 80
          },
          {
            "yx_from": 5,
            "give_role": 2,
            "rate": 10
          },
          {
            "yx_from": 5,
            "give_role": 4,
            "rate": 10
          }
        ],
        list3: [{
            "yx_from": 1,
            "give_role": 1,
            "rate": 90
          },
          {
            "yx_from": 1,
            "give_role": 2,
            "rate": 10
          },
          {
            "yx_from": 2,
            "give_role": 1,
            "rate": 80
          },
          {
            "yx_from": 2,
            "give_role": 2,
            "rate": 20
          },
          {
            "yx_from": 3,
            "give_role": 1,
            "rate": 60
          },
          {
            "yx_from": 3,
            "give_role": 2,
            "rate": 15
          },
          {
            "yx_from": 3,
            "give_role": 3,
            "rate": 25
          }
        ],
        list4: [{
            "yx_from": 1,
            "give_role": 1,
            "rate": 90
          },
          {
            "yx_from": 1,
            "give_role": 2,
            "rate": 10
          },
          {
            "yx_from": 2,
            "give_role": 1,
            "rate": 80
          },
          {
            "yx_from": 2,
            "give_role": 2,
            "rate": 20
          },
          {
            "yx_from": 3,
            "give_role": 1,
            "rate": 60
          },
          {
            "yx_from": 3,
            "give_role": 2,
            "rate": 15
          },
          {
            "yx_from": 3,
            "give_role": 3,
            "rate": 25
          }
        ],
        list5: [{
          "yx_from": 2,
          "give_role": 2,
          "rate": 10
        }]
      }
    },
    components: {
      Navbar
    },
    created(){
      //请求接口获取所有分佣
      // this.list2Coyp=JSON.parse(JSON.stringify(this.list2));
      // this.list3Coyp=JSON.parse(JSON.stringify(this.list3));
      // this.list4Coyp=JSON.parse(JSON.stringify(this.list4));
      // this.list5Coyp=JSON.parse(JSON.stringify(this.list5));
    },
    methods: {
      tabclick() {
        this.status = 0;
      },
      edit(num) {
        if(this.status==0){
          this["list"+num+"Coyp"]=JSON.parse(JSON.stringify(this["list"+num]));
          this.status=num;
        }else{
          //保存 判断 是否成
          this["list"+num]=JSON.parse(JSON.stringify(this["list"+num+"Coyp"]));
          this.status=0;
        }
      }
    }
  };

</script>
<style scoped="scoped" lang="scss">
  .warn {
    color: #B4282D;
  }


  .u-table {
    border: 0;
    margin-top: 20px;
    margin-bottom: 20px;
    width: 100%;
    text-align: left;
    &.border {
      border: 1px solid #E6E6E6;
      border-bottom: 0;
    }
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
      padding: 0 20px;
      .el-input {
        width: 200px;
        max-width: 100%;
        margin: 5px;
      }
    }
  }

</style>
