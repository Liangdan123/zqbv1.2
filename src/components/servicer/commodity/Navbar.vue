<template>
<div class="NavbarOrder clearfix">
  <el-menu  :router="true" mode="horizontal" class="clearfix" @select="handleSelect">
    <el-menu-item index="pulishProduct" :class="{active:selected=='pulishProduct'}">
      	发布商品
    </el-menu-item>
    <el-menu-item index="saleCommodity" :class="{active:selected=='saleCommodity'}">
      出售中的商品
    </el-menu-item>
    <el-menu-item index="warehouse" :class="{active:selected=='warehouse'}">
      仓库中的商品
    </el-menu-item>
    <el-menu-item index="historyProdcut" :class="{active:selected=='historyProdcut'}">
      历史商品记录
    </el-menu-item>
    <el-menu-item index="category" :class="{active:selected=='category'}">
      商品分类
    </el-menu-item>
  </el-menu>
</div>
</template>

<script>
 	import navbar from "@/utils/navbar"
	export default {
		mixins: [navbar]
	}
</script>

