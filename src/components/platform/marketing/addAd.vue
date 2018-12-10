<template>
  <div class="adDecoration">
    <div class='mallDecor_left'>
      <p class='ad_group'>广告组名称：</p>
      <div>
        <p v-for='(item,index) in adGroup' class='ad_item' :class="{'active':index==activeIndex}" @click="changeAd(item.group_id,index)">{{item.group_name}}</p>
      </div>
    </div>
    <div class="mallDecor_middle" v-if='activeIndex!=null'>
      <p class='f14 mb-10'>{{adGroup[activeIndex].group_location_name}}</p>
      <div :class="'bg_banner'+locatArr.indexOf(adGroup[activeIndex].group_location)" class="Plate">
        <el-carousel arrow="never" :interval="adGroup[activeIndex].interval_second*1000" height="100%" width="100%" ref='cardPane'>
          <el-carousel-item v-for="(imgNum,index) in temp.data" :key="imgNum.ad_id" >
             <img :src="imgNum.image_url" height="100%" width="100%" v-if='imgNum.image_url'>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <decorationAd :Plate='temp.data' :styleType='locatArr.indexOf(adGroup[activeIndex].group_location)' :title='adGroup[activeIndex].group_name'
      v-if='activeIndex!=null'></decorationAd>
    <!--.........................保存装修按钮......................-->
    <div class="fixed-frame">
      <div class="btn middle">
        <el-button class="store-button1 float-l px-30" @click="preserveDecore">
          保存装修
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getAdGroupList,
    getAd,
    saveAd
  } from "@/api/platform"
  import decorationAd from "@/components/platform/marketing/decorationAd"
  export default {
    components: {
      decorationAd
    },
    data() {
      return {
        adGroup: [],
        activeIndex: null,
        locatArr: ['mobile_home_head', 'mobile_home_middle', 'pc_home_head', 'pc_home_middle'],
        adData: {
          data: []
        }, //整个模块信息
        temp: {
          data: []
        },
        errorIndex: 0, //验证错误的顺序（有两种相同样式时有用）
      }
    },
    created() {
      //获取商城对应组件列表API
      this.activeIndex = null;
      this.activeId = null;
      this.adData = {
        data: []
      };
      getAdGroupList({
        page: 1,
        per_page: 20
      }).then(({
        data
      }) => {
        this.adGroup = data.data;
        this.changeAd(data.data[0].group_id, 0)
      })
    },
    mouted(){
      this.$refs.cardPane.setActiveItem();
    },
    methods: {
      changeAd(id, index) {
        if (JSON.stringify(this.temp) == JSON.stringify(this.adData)) {
          this.getAdList(id, index)
        } else {
          this.$confirm('请保存本次操作后再切换其他内容！', '温馨提示', {
              confirmButtonText: '保存',
              cancelButtonText: '放弃',
              lockScroll: false
            }).then(() => {
              this.preserveDecore()
            })
            .catch(() => {
              this.getAdList(id, index)
            })
        }
      },
      getAdList(id, index) {
        getAd(id).then(({
          data
        }) => {
          this.activeIndex = index;
          this.adData = data;
          this.adData.group_id = id;
          this.temp = JSON.parse(JSON.stringify(this.adData));
        })
      },
      preserveDecore() { //保存装修	
        if (this.temp.data.length==0) { //当没有修改轮播图时
            this.$message.error('至少设置一张海报');
          return
        }
        for (let key in this.temp.data) { //保存装修错误验证
            if (!this.temp.data[key].image_url) { //当忘记上传图片地址时
              this.$message.error(`请上传第${key-(-1)}海报图片`);
              return
            }
        };
        //保存装修接口
        saveAd(this.temp)
          .then(({
            data
          }) => {
            this.$message({
              message: '保存成功',
              type: 'success',
              showClose: 'true'
            });
            this.adData=data;
            this.adData.group_id = this.temp.group_id;
             this.temp = JSON.parse(JSON.stringify(this.adData));
          })
      },
    }
  }

</script>

<style scoped="scoped" lang='scss'>
  .mallDecor_left {
    position: fixed;
    left: 0;
    top: 180px;
    bottom: 44px;
    width: 300px;
    background: #fff;
    box-shadow: -1px 0px 0px 0px #e6e6e6;
    padding-top: 30px;
    font-size: 14px;

    .ad_group {
      font-weight: 500;
      padding-left: 30px;
      border-bottom: 1px solid #E9EEF2;
      padding-bottom: 15px;

      &+div {
        position: absolute;
        top: 60px;
        bottom: 0;
        width: 100%;
        left: 0;
        overflow-y: auto;
      }
    }

    .ad_item {
      height: 40px;
      line-height: 40px;
      padding-left: 43px;
      border-bottom: 1px solid #E9EEF2;

      &:hover {
        background: #F0F4F7;
      }

      &.active {
        background: #F0F4F7;
      }
    }
  }

  .mallDecor_middle {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);

    .Plate {
      box-shadow: 0 0 4px 0 #33333333;
    }

    .imgNavCon {
      background-color: #fff;
      padding: 10px 0px 0px 0px;
    }

    .imageTxtcon {
      margin-left: 21px;
      margin-right: 21px;
      margin-bottom: 20px;
      text-align: center;
    }

    .imageTxt {
      display: inline-block;
      height: 50px;
      width: 50px;
      background-color: #E5F5FF;
    }

  }

  .bg_banner3 {
    width: 325px;
    height: 170px;
    background-color: #E5F5FF;
  }

  .bg_banner2 {
    width: 610px;
    height: 146px;
    background-color: #E5F5FF;
  }

  .bg_banner1 {
    width: 375px;
    background-color: #E5F5FF;
    height: 100px;
  }

  .bg_banner0 {
    width: 375px;
    height: 210px;
    background-color: #E5F5FF;
  }

  .preserveDecore {
    position: fixed;
    z-index: 2000;
    bottom: 0px;
    width: 100%;
    left: 0;
    background-color: #F0F4F7;
    padding-top: 6px;
    padding-bottom: 6px;
    box-shadow: 0 -2px 10px #62778c33;
  }

  .btn {
    width: 116px;
  }


  .verticalLine {
    width: 4px;
    height: 16px;
    display: inline-block;
    background-color: #B4282D;
    margin-right: 5px;
    vertical-align: text-bottom;
  }

  .line {
    width: 100%;
    border-bottom: 1px solid #D9D9D9;
    padding-bottom: 15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .imgTitle {
    width: 50px;
    margin-top: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .hbys2 {
    padding-top: 15px;
  }

  .border-red {
    border: 1px solid #B4282D;
  }

  .el-carousel {
    height: 100%;
  }
  .el-carousel__item{
    display: inline-block !important;
  }
</style>
<style>
  .adDecoration .el-dialog--small {
    width: 992px;
  }

  .adDecoration .el-tabs__header {
    margin: 0;
  }

  .adDecoration .el-carousel__button {
    height: 6px;
    width: 6px;
    border-radius: 50%;
  }

</style>
