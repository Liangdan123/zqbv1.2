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
              <td rowspan="4">合伙人</td>
              <td rowspan="2">平台
                <p class="color-7F">总额等于100%</p>
              </td>
              <td>平台</td>
              <td width='322'>
                <span v-if="status!=1">{{list1[1].rate>=0&&list1[1].rate+'%'}}</span>
                <template v-else>
                  <el-input size="samll" v-model="list1Coyp[1].rate"></el-input>%
                </template>
              </td>
            </tr>
            <tr>
              <td>代理商
              </td>
              <td width='322'>
                <span v-if="status!=1">{{list1[2].rate>=0&&list1[2].rate+'%'}}</span>
                <template v-else>
                  <el-input size="samll" v-model="list1Coyp[2].rate"></el-input>%
                </template>
              </td>
            </tr>
            <tr>
              <td rowspan="2">代理商
                <p class="color-7F">总额等于100%</p>
              </td>
              <td>平台</td>
              <td width='322'>
                <span v-if="status!=1">{{list1[3].rate>=0&&list1[3].rate+'%'}}</span>
                <template v-else>
                  <el-input size="samll" v-model="list1Coyp[3].rate"></el-input>%
                </template>
              </td>
            </tr>
            <tr>
              <td>代理商</td>
              <td width='322'>
                <span v-if="status!=1">{{list1[4].rate>=0&&list1[4].rate+'%'}}</span>
                <template v-else>
                  <el-input size="samll" v-model="list1Coyp[4].rate"></el-input>%
                </template>
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
                <span v-if="status!=2">{{list2[1].rate>=0&&list2[1].rate+'%'}}</span>
                <template v-else>
                  <el-input size="samll" v-model="list2Coyp[1].rate"></el-input>%
                </template>
              </td>
            </tr>
            <tr>
              <td>代理商</td>
              <td width='322'>
                <span v-if="status!=2">{{list2[2].rate>=0&&list2[2].rate+'%'}}</span>
                <template v-else>
                  <el-input size="samll" v-model="list2Coyp[2].rate"></el-input>%
                </template>
              </td>
            </tr>
            <tr>
              <td rowspan="3">合伙人
                <p class="color-7F">总额等于100%</p>
              </td>
              <td>平台</td>
              <td width='322'>
                <span v-if="status!=2">{{list2[3].rate>=0&&list2[3].rate+'%'}}</span>
                <template v-else>
                  <el-input size="samll" v-model="list2Coyp[3].rate"></el-input>%
                </template>
              </td>
            </tr>
            <tr>
              <td>代理商</td>
              <td width='322'>
                <span v-if="status!=2">{{list2[4].rate>=0&&list2[4].rate+'%'}}</span>
                <template v-else>
                  <el-input size="samll" v-model="list2Coyp[4].rate"></el-input>%
                </template>
              </td>
            </tr>
            <tr>
              <td>合伙人</td>
              <td width='322'>
                <span v-if="status!=2">{{list2[5].rate>=0&&list2[5].rate+'%'}}</span>
                <template v-else>
                  <el-input size="samll" v-model="list2Coyp[5].rate"></el-input>%
                </template>
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
                <span v-if="status!=2">{{list2[6].rate>=0&&list2[6].rate+'%'}}</span>
                <template v-else>
                  <el-input size="samll" v-model="list2Coyp[6].rate"></el-input>%
                </template>
              </td>
            </tr>
            <tr>
              <td>代理商</td>
              <td width='322'>
                <span v-if="status!=2">{{list2[7].rate>=0&&list2[7].rate+'%'}}</span>
                <template v-else>
                  <el-input size="samll" v-model="list2Coyp[7].rate"></el-input>%
                </template>
              </td>
            </tr>
            <tr>
              <td>合伙人</td>
              <td width='322'>
                <span v-if="status!=2">{{list2[8].rate>=0&&list2[8].rate+'%'}}</span>
                <template v-else>
                  <el-input size="samll" v-model="list2Coyp[8].rate"></el-input>%
                </template>
              </td>
            </tr>
            <tr>
              <td>服务商</td>
              <td width='322'>
                <span v-if="status!=2">{{list2[9].rate>=0&&list2[9].rate+'%'}}</span>
                <template v-else>
                  <el-input size="samll" v-model="list2Coyp[9].rate"></el-input>%
                </template>
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
                <span v-if="status!=2">{{list2[10].rate>=0&&list2[10].rate+'%'}}</span>
                <template v-else>
                  <el-input size="samll" v-model="list2Coyp[10].rate"></el-input>%
                </template>
              </td>
            </tr>
            <tr>
              <td>代理商</td>
              <td width='322'>
                <span v-if="status!=2">{{list2[11].rate>=0&&list2[11].rate+'%'}}</span>
                <template v-else>
                  <el-input size="samll" v-model="list2Coyp[11].rate"></el-input>%
                </template>
              </td>
            </tr>
            <tr>
              <td>服务商</td>
              <td width='322'>
                <span v-if="status!=2">{{list2[12].rate>=0&&list2[12].rate+'%'}}</span>
                <template v-else>
                  <el-input size="samll" v-model="list2Coyp[12].rate"></el-input>%
                </template>
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
                <span v-if="status!=3">{{list3[0].rate>=0&&list3[0].rate+'%'}}</span>
                <template v-else>
                  <el-input size="samll" v-model="list3Coyp[0].rate"></el-input>%
                </template>
              </td>
            </tr>
            <tr>
              <td>代理商</td>
              <td width='322'>
                <span v-if="status!=3">{{list3[1].rate>=0&&list3[1].rate+'%'}}</span>
                <template v-else>
                  <el-input size="samll" v-model="list3Coyp[1].rate"></el-input>%
                </template>
              </td>
            </tr>
            <tr>
              <td rowspan="2">代理商
                <p class="color-7F">总额等于100%</p>
              </td>
              <td>平台</td>
              <td width='322'>
                <span v-if="status!=3">{{list3[2].rate>=0&&list3[2].rate+'%'}}</span>
                <template v-else>
                  <el-input size="samll" v-model="list3Coyp[2].rate"></el-input>%
                </template>
              </td>
            </tr>
            <tr>
              <td>代理商</td>
              <td width='322'>
                <span v-if="status!=3">{{list3[3].rate>=0&&list3[3].rate+'%'}}</span>
                <template v-else>
                  <el-input size="samll" v-model="list3Coyp[3].rate"></el-input>%
                </template>
              </td>
            </tr>
            <tr>
              <td rowspan="3">合伙人
                <p class="color-7F">总额等于100%</p>
              </td>
              <td>平台</td>
              <td width='322'>
                <span v-if="status!=3">{{list3[4].rate>=0&&list3[4].rate+'%'}}</span>
                <template v-else>
                  <el-input size="samll" v-model="list3Coyp[4].rate"></el-input>%
                </template>
              </td>
            </tr>
            <tr>
              <td>代理商</td>
              <td width='322'>
                <span v-if="status!=3">{{list3[5].rate>=0&&list3[5].rate+'%'}}</span>
                <template v-else>
                  <el-input size="samll" v-model="list3Coyp[5].rate"></el-input>%
                </template>
              </td>
            </tr>
            <tr>
              <td>合伙人</td>
              <td width='322'>
                <span v-if="status!=3">{{list3[6].rate>=0&&list3[6].rate+'%'}}</span>
                <template v-else>
                  <el-input size="samll" v-model="list3Coyp[6].rate"></el-input>%
                </template>
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
              <span v-if="status!=4">修改比例</span>
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
                <span v-if="status!=4">{{list4[0].rate>=0&&list4[0].rate+'%'}}</span>
                <template v-else>
                  <el-input size="samll" v-model="list4Coyp[0].rate"></el-input>%
                </template>
              </td>
            </tr>
            <tr>
              <td>代理商</td>
              <td width='322'>
                <span v-if="status!=4">{{list4[1].rate>=0&&list4[1].rate+'%'}}</span>
                <template v-else>
                  <el-input size="samll" v-model="list4Coyp[1].rate"></el-input>%
                </template>
              </td>
            </tr>
            <tr>
              <td rowspan="2">代理商
                <p class="color-7F">总额等于100%</p>
              </td>
              <td>平台</td>
              <td width='322'>
                <span v-if="status!=4">{{list4[2].rate>=0&&list4[2].rate+'%'}}</span>
                <template v-else>
                  <el-input size="samll" v-model="list4Coyp[2].rate"></el-input>%
                </template>
              </td>
            </tr>
            <tr>
              <td>代理商</td>
              <td width='322'>
                <span v-if="status!=4">{{list4[3].rate>=0&&list4[3].rate+'%'}}</span>
                <template v-else>
                  <el-input size="samll" v-model="list4Coyp[3].rate"></el-input>%
                </template>
              </td>
            </tr>
            <tr>
              <td rowspan="3">合伙人
                <p class="color-7F">总额等于100%</p>
              </td>
              <td>平台</td>
              <td width='322'>
                <span v-if="status!=4">{{list4[4].rate>=0&&list4[4].rate+'%'}}</span>
                <template v-else>
                  <el-input size="samll" v-model="list4Coyp[4].rate"></el-input>%
                </template>
              </td>
            </tr>
            <tr>
              <td>代理商</td>
              <td width='322'>
                <span v-if="status!=4">{{list4[5].rate>=0&&list4[5].rate+'%'}}</span>
                <template v-else>
                  <el-input size="samll" v-model="list4Coyp[5].rate"></el-input>%
                </template>
              </td>
            </tr>
            <tr>
              <td>合伙人</td>
              <td width='322'>
                <span v-if="status!=4">{{list4[6].rate>=0&&list4[6].rate+'%'}}</span>
                <template v-else>
                  <el-input size="samll" v-model="list4Coyp[6].rate"></el-input>%
                </template>
              </td>
            </tr>
          </table>
          <h3 class="text-c f16 mt-10">表1</h3>
          <h3 class="mb-10 ">2.会员来源于代理商</h3>
          <p class="clearfix f14 mt-10">则在表1之前先抽取比例分给代理商，
            <span class="warn">然后再按表1进行分配。</span>
            <el-button class='store-button1 float-r' @click="edit(5)">
              <i class="iconfont icon-baocun f12"></i>
              <span v-if="status!=5">修改比例</span>
              <span v-else>保存</span>
            </el-button>
          </p>
          <table class="u-table border" cellspacing="0">
            <tr>
              <td width="336">代理商</td>
              <td>
                <span v-if="status!=5">{{list5[0].rate>=0&&list5[0].rate+'%'}}</span>
                <template v-else>
                  <el-input size="samll" v-model="list5Coyp[0].rate"></el-input>%
                </template>
              </td>
            </tr>
          </table>
          <h3 class="mb-10 ">3.会员来源与合伙人</h3>
          <p class="clearfix f14 mt-10">则在表1之前先抽取比例
           <span class="warn">{{parseInt(list5Coyp[1].rate)+parseInt(list5Coyp[2].rate)}}%</span>
          		  的钱按比例分给（代理商、合伙人）        
            <span class="warn">然后再按表1进行分配。</span>
          </p>
          <table class="u-table border" cellspacing="0">
            <tr>
              <td width="336">代理商</td>
              <td>
                <span v-if="status!=5">{{list5[1].rate>=0&&list5[1].rate+'%'}}</span>
                <template v-else>
                  <el-input size="samll" v-model="list5Coyp[1].rate"></el-input>%
                </template>
              </td>
            </tr>
            <tr>
              <td width="336">合伙人</td>
              <td>
                <span v-if="status!=5">{{list5[2].rate>=0&&list5[2].rate+'%'}}</span>
                <template v-else>
                  <el-input size="samll" v-model="list5Coyp[2].rate"></el-input>%
                </template>
              </td>
            </tr>
          </table>
          <h3 class="mb-10 ">4.会员来源于服务商且服务商有合伙人</h3>
          <p class="clearfix f14 mt-10">则在表1之前先抽取比例
          
           <span class="warn">
           	{{parseInt(list5Coyp[3].rate)+parseInt(list5Coyp[4].rate)+parseInt(list5Coyp[5].rate)}}%</span>
            	的钱按比例分配给（代理商、合伙人、服务商），
            <span class="warn">然后再按表1进行分配。</span>
          </p>
          <table class="u-table border" cellspacing="0">
            <tr>
              <td width="336">代理商</td>
              <td>
                <span v-if="status!=5">{{list5[3].rate>=0&&list5[3].rate+'%'}}</span>
                <template v-else>
                  <el-input size="samll" v-model="list5Coyp[3].rate"></el-input>%
                </template>
              </td>
            </tr>
            <tr>
              <td width="336">合伙人</td>
              <td>
                <span v-if="status!=5">{{list5[4].rate>=0&&list5[4].rate+'%'}}</span>
                <template v-else>
                  <el-input size="samll" v-model="list5Coyp[4].rate"></el-input>%
                </template>
              </td>
            </tr>
            <tr>
              <td width="336">服务商</td>
              <td>
                <span v-if="status!=5">{{list5[5].rate>=0&&list5[5].rate+'%'}}</span>
                <template v-else>
                  <el-input size="samll" v-model="list5Coyp[5].rate"></el-input>%
                </template>
              </td>
            </tr>
          </table>
          <h3 class="mb-10 ">5.会员来源于服务商且没有合伙人</h3>
          <p class="clearfix f14 mt-10">则在表1之前先抽取比例
          <!--  <span class="warn">x%</span>的钱按比例分配给（代理商、服务商），-->
          	<span class="warn">{{parseInt(list5Coyp[6].rate)+parseInt(list5Coyp[7].rate)}}%</span>
          	的钱按比例分配给（代理商、服务商），
            <span class="warn">然后再按表1进行分配。</span>
          </p>
          <table class="u-table border" cellspacing="0">
            <tr>
              <td width="336">代理商</td>
              <td>
                <span v-if="status!=5">{{list5[6].rate>=0&&list5[6].rate+'%'}}</span>
                <template v-else>
                  <el-input size="samll" v-model="list5Coyp[6].rate"></el-input>%
                </template>
              </td>
            </tr>
            <tr>
              <td width="336">服务商</td>
              <td>
                <span v-if="status!=5">{{list5[7].rate>=0&&list5[7].rate+'%'}}</span>
                <template v-else>
                  <el-input size="samll" v-model="list5Coyp[7].rate"></el-input>%
                </template>
              </td>
            </tr>
          </table>
          <h3 class="mb-10 clearfix">消费分成的计算公式：分成金额=原价*佣金比例-用券金额
            <el-button class='store-button1 float-r' @click="edit(6)">
              <i class="iconfont icon-baocun f12"></i>
              <span v-if="status!=2">修改比例</span>
              <span v-else>保存</span>
            </el-button>
          </h3>
          <table class="u-table border" cellspacing="0">
            <tr>
              <td width="336">佣金比例</td>
              <td>
                <span v-if="status!=6">{{list6.order_rate>=0&&list6.order_rate+'%'}}</span>
                <template v-else>
                  <el-input size="samll" v-model="list6Coyp.order_rate"></el-input>%
                </template>
              </td>
            </tr>
          </table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import Navbar from "@/components/platform/manage/Navbar";
  import axios from "axios"
  import {
    getRoleRate,
    saveRoleRate,
    getMemberRate,
    saveMemberRate,
    getSpecialOrderRate,
    saveSpecialOrderRate,
    getOrderExtRate,
    saveOrderExtRate,
    saveOrderRate,
    getOrderRate,
    get_mall_rate,
    save_mall_rate
  } from "@/api/platform"
  export default {
    data() {
      return {
        tabForShow: "3",
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
            "rate": null
          },
          {
            "join_role": 3,
            "yx_from": 1,
            "give_role": 2,
            "rate": null
          },
          {
            "join_role": 3,
            "yx_from": 2,
            "give_role": 1,
            "rate": null
          },
          {
            "join_role": 3,
            "yx_from": 2,
            "give_role": 2,
            "rate": null
          }
        ],
        list1Coyp: [{rate:""},{rate:""}],
        list2Coyp: [
        	{rate:""},
        	{rate:""},
        	{rate:""}
        ],
        list3Coyp: [
        	{rate:""},
        	{rate:""},
        	{rate:""},
        	{rate:""}
        ],
        list4Coyp: [
        	{rate:""},
        	{rate:""},
        	{rate:""},
        	{rate:""},
        	{rate:""}
        ],
        list5Coyp: [
        	{rate:""},
        	{rate:""},
        	{rate:""},
        	{rate:""},
        	{rate:""},
        	{rate:""},
        	{rate:""},
        	{rate:""}
        ],
        list6Coyp: [],
        list2: [{
            "yx_from": 1,
            "give_role": 1,
            "rate": 100
          },
          {
            "yx_from": 2,
            "give_role": 1,
            "rate": null
          },
          {
            "yx_from": 2,
            "give_role": 2,
            "rate": null
          },
          {
            "yx_from": 3,
            "give_role": 1,
            "rate": null
          },
          {
            "yx_from": 3,
            "give_role": 2,
            "rate": null
          },
          {
            "yx_from": 3,
            "give_role": 3,
            "rate": null
          },
          {
            "yx_from": 4,
            "give_role": 1,
            "rate": null
          },
          {
            "yx_from": 4,
            "give_role": 2,
            "rate": null
          },
          {
            "yx_from": 4,
            "give_role": 3,
            "rate": null
          },
          {
            "yx_from": 4,
            "give_role": 4,
            "rate": null
          },
          {
            "yx_from": 5,
            "give_role": 1,
            "rate": null
          },
          {
            "yx_from": 5,
            "give_role": 2,
            "rate": null
          },
          {
            "yx_from": 5,
            "give_role": 4,
            "rate": null
          }
        ],
        list3: [{
            "yx_from": 1,
            "give_role": 1,
            "rate": null
          },
          {
            "yx_from": 1,
            "give_role": 2,
            "rate": null
          },
          {
            "yx_from": 2,
            "give_role": 1,
            "rate": null
          },
          {
            "yx_from": 2,
            "give_role": 2,
            "rate": null
          },
          {
            "yx_from": 3,
            "give_role": 1,
            "rate": null
          },
          {
            "yx_from": 3,
            "give_role": 2,
            "rate": null
          },
          {
            "yx_from": 3,
            "give_role": 3,
            "rate": null
          }
        ],
        list4: [{
            "yx_from": 1,
            "give_role": 1,
            "rate": null
          },
          {
            "yx_from": 1,
            "give_role": 2,
            "rate": null
          },
          {
            "yx_from": 2,
            "give_role": 1,
            "rate": null
          },
          {
            "yx_from": 2,
            "give_role": 2,
            "rate": null
          },
          {
            "yx_from": 3,
            "give_role": 1,
            "rate": null
          },
          {
            "yx_from": 3,
            "give_role": 2,
            "rate": null
          },
          {
            "yx_from": 3,
            "give_role": 3,
            "rate": null
          }
        ],
        list5: [{
            "yx_from": 2,
            "give_role": 2,
            "rate": null
          },
          {
            "yx_from": 3,
            "give_role": 2,
            "rate": null
          },
          {
            "yx_from": 3,
            "give_role": 3,
            "rate": null
          },
          {
            "yx_from": 4,
            "give_role": 2,
            "rate": null
          },
          {
            "yx_from": 4,
            "give_role": 3,
            "rate": null
          },
          {
            "yx_from": 4,
            "give_role": 4,
            "rate": null
          },
          {
            "yx_from": 5,
            "give_role": 2,
            "rate": null
          },
          {
            "yx_from": 5,
            "give_role": 4,
            "rate": null
          }
        ],
        list6: {
          "order_rate": null
        }
      }
    },
    components: {
      Navbar
    },
    created() {
      //请求接口获取所有分佣
      this.tabclick()
    },
    methods: {
      getList1() { //获取角色分佣
        getRoleRate().then(({
          data
        }) => {
          if (data.length > 0) {
            this.list1 = data;
          }
          this.list1Coyp = JSON.parse(JSON.stringify(this.list1));
        })
      },
      getList2() { //获取会员分佣
        getMemberRate().then(({
          data
        }) => {
          if (data.length > 0) {
            this.list2 = data;
          }
          this.list2Coyp = JSON.parse(JSON.stringify(this.list2));
        })
      },
      getList3() { //获取订单分佣
        axios.all([getSpecialOrderRate(), getOrderRate(), getOrderExtRate(), get_mall_rate()]).then(axios.spread((data1,
          data2, data3, data4) => {
          if (data1.data.length > 0) {
            this.list3 = data1.data;
          }
          this.list3Coyp = JSON.parse(JSON.stringify(this.list3));
          if (data2.data.length > 0) {
            this.list4 = data2.data;
          }
          this.list4Coyp = JSON.parse(JSON.stringify(this.list4));
          if (data3.data.length > 0) {
            this.list5 = data3.data;
          }
          this.list5Coyp = JSON.parse(JSON.stringify(this.list5));
          if (data4.data.order_rate) {
            this.list6 = data4.data;
          }
          this.list6Coyp = JSON.parse(JSON.stringify(this.list6));
        }));
      },
      tabclick() {
        this.status = 0;
        if (this.tabForShow == 1) {
          this.getList1();
        } else if (this.tabForShow == 2) {
          this.getList2();
        } else if (this.tabForShow == 3) {
          this.getList3();
        }
      },
      vail(data) {
        if (Array.isArray(data)) {
          for (let val of data) {
            if (!val.rate) {
              this.$message({
                message: '请完成填写后保存',
                type: 'warning'
              });
              return false
            }
          }
          return true
        } else {
          if (!data.order_rate) {
            this.$message({
              message: '请完成填写后保存',
              type: 'warning'
            });
            return false
          } else {
            return true
          }
        }
      },
      async edit(num) {
        if (this.status == 0) { //判断是否都没编辑
          this["list" + num + "Coyp"] = JSON.parse(JSON.stringify(this["list" + num]));
          this.status = num;
        } else { //判断是否是同一个编辑区域
          if (num != this.status) {
            this.$message({
              message: '还有未保存的设置,请再次保存后重试',
              type: 'warning'
            });
            return;
          }
          let res = null;
          switch (num) {
            case 1:
              if (this.vail(this.list1Coyp)) {
                res = await saveRoleRate(this.list1Coyp);
              }
              break;
            case 2:
              if (this.vail(this.list2Coyp)) {
                res = await saveMemberRate(this.list2Coyp);
              }
              break;
            case 3:
              if (this.vail(this.list3Coyp)) {
                res = await saveSpecialOrderRate(this.list3Coyp);
              }
              break;
            case 4:
              if (this.vail(this.list4Coyp)) {
                res = await saveOrderRate(this.list4Coyp);
              }
              break;
            case 5:
              if (this.vail(this.list5Coyp)) {
                res = await saveOrderExtRate(this.list5Coyp);
              }
              break;
            case 6:
              if (this.vail(this.list6Coyp)) {
                res = await save_mall_rate(this.list6Coyp);
              }
              break;
          }
          if (res) {
            res = res.data;
            if (res.mall_id) {
              this.$message.success('保存成功');
              this["list" + num] = JSON.parse(JSON.stringify(this["list" + num + "Coyp"]));
              this.status = 0;
            }
          }
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
