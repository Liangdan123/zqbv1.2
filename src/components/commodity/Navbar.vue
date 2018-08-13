<template>
<div class="Navbar clearfix">
  <el-menu  :router="true" mode="horizontal" class="clearfix" @select="handleSelect">
    <el-menu-item index="pulishProduct" :class="{active:selected=='pulishProduct'}">
      发布商品
    </el-menu-item>
    <el-menu-item index="sale_commodity" :class="{active:selected=='sale_commodity'}">
      出售中的商品
    </el-menu-item>
    <el-menu-item index="warehouse" :class="{active:selected=='warehouse'}">
      仓库中的商品
    </el-menu-item>
    <el-menu-item index="history" :class="{active:selected=='history'}">
      历史商品记录
    </el-menu-item>
    <el-menu-item index="category_mgmt" :class="{active:selected=='category_mgmt'}">
      店铺分类管理
    </el-menu-item>
    <el-menu-item index="category" :class="{active:selected=='category'}">
      商品分类
    </el-menu-item>
  </el-menu>
</div>
</template>

<script>
export default {
  name: "navbar",
  data() {
    return {
      selected:""
    }
  },
  created(){
    this.selected=this.$route.name;
  },
  methods:{
    handleSelect(index){
        this.selected=index;
    }
  }
}
</script>
<style lang="scss" >
.Navbar {
    position: fixed;
    top: 60px;
    width: 100%;
    background: #FFFFFF;
    box-shadow: 0 2px 2px 0 rgba(51,51,51,0.10);
    background: #FFFFFF;
    z-index: 100;
    min-width: 1140px;
    .el-menu {
        width: 600px;
        margin: 0 auto;
        background: #FFFFFF;
        .el-menu-item {
            height: 40px;
            line-height: 40px;
            font-size: 14px;
            border: none;
            padding: 0 10px;
            transition: all 0.3s;
            &.active{
              color:#0070C9;
            }
        }
    }
}
</style>
