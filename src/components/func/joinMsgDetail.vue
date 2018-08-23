<template>
  <div>
    <div class="msg">
      <p>
        <span>所属区域：</span>{{list.city}}
      </p>
      <p>
        <span>加盟角色：</span>{{list.type==2?"代理商":list.type==3?"合伙人":"服务商"}}
      </p>
      <p>
        <span>性质：</span>{{list.is_company==0?'个人':'企业'}}
      </p>
      <p v-if="!isEdit">
        <span>姓名：</span>{{list.contact_name}}
      </p>
      <p v-if="!isEdit">
        <span>性别：</span>{{list.sex==1?'男':'女'}}
      </p>
      <p>
        <span>手机号：</span>{{list.phone}}
      </p>
      <p v-if="list.is_company==1&&!isEdit">
        <span>QQ：</span>{{list.wx_qq}}
      </p>
      <p v-if="!isEdit">
        <span>地址：</span>{{list.address}}
      </p>
      <p v-if="list.is_company==1&&!isEdit">
        <span>公司名称：</span>{{list.company_name}}
      </p>
      <p v-if="list.type!=2">
        <span>业务范围：</span>{{list.business_range_name}}
      </p>
    </div>
    <div class="clearfix img" v-if="!isEdit">
      <div>
        <div>营业执照副本扫描件（三证合一时）</div>
        <img :src="list.license_url" class="imageUpload" />
      </div>
      <div class="">
        <div>法人身份证（正面）</div>
        <img :src="list.license_url" class="imageUpload" />
      </div>
      <div class="">
        <div>法人身份证（反面）</div>
        <img :src="list.license_url" class="imageUpload" />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      list: {
        default: ()=>{
          return {}
        }
      },
      isEdit: {
        default:false
      }
    }
  }

</script>

<style scoped  lang="scss">
 .msg{
    color:$color-light;
    margin-top:10px;
    >p>span{
      display: inline-block;
      color:#7F7F7F;
      width:75px;
      text-align: right;
      padding:5px;
    }
  }
 .img{
    margin-top: 40px;
    width:1240px;
    div{
      color:$color-light;
      margin-bottom: 10px;
      float: left;
      width:450px;
    }
  }
  .imageUpload {
    width: 400px;
    height: 239px;
    border: 1px dashed #D6D6D6;
  }
</style>
