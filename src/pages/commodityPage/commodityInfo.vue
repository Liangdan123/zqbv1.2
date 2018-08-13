<template>
<div class="info_content clearfix">
  <router-link :to="{name:'pulishProduct'}" class="item-1 item-list fl">
    <div>
      <i   class="iconfont icon-dianpuxinxi"></i>
      <span>发布商品</span>
    </div>
    <p><i class="iconfont icon-dianpuxinxi"></i></p>
  </router-link>
  <router-link :to="{name:'sale_commodity'}" class="item-list item-2 fl">
    <div>
      <i class="iconfont icon-sale"></i>
      <span>出售中的商品</span>
    </div>
    <p><i class="iconfont icon-sale"></i></p>
  </router-link>
  <router-link :to="{name:'warehouse'}" class="item-list item-3 fl">
    <div>
      <i class="iconfont icon-cangku"></i>
      <span>仓库中的商品</span>
    </div>
    <p><i class="iconfont icon-cangku"></i></p>
  </router-link>
  <router-link :to="{name:'history'}" class="item-4 item-list fl">
    <div>
      <i class="iconfont icon-lishishangpin"></i>
      <span>历史商品记录</span>
    </div>
    <p><i class="iconfont icon-lishishangpin"></i></p>
  </router-link>
  <router-link :to="{name:'category_mgmt'}" class="item-list item-5 fl">
    <div>
      <i class="iconfont icon-fenleiguanli"></i>
      <span>分类管理</span>
    </div>
    <p><i class="iconfont icon-fenleiguanli"></i></p>
  </router-link>
  <router-link  :to="{name:'category'}" class="item-list item-6 fl">
    <div>
      <i class="iconfont icon-shangpinfenlei"></i>
      <span>商品分类</span>
    </div>
    <p><i class="iconfont icon-shangpinfenlei"></i></p>
  </router-link>
</div>
</template>

<script>
export default {
  name: "my_store",
  data() {
    return {}
  },
}
</script>
