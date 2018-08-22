<template>
  <div class="count clearfix">
    <div class="plate bg-f mr-20 ">
      <div class="border-b clearfix">
        <div class="float-l mb-10">
          <span class="color-7F f14">累计充值金额（不含增额）</span>
          <p class="color-3 font-b f24 mt-10">
            ￥{{money.total_recharge_yuan}}
          </p>
        </div>
        <svg width="48" height="48" class="float-r">
          <use xlink:href="#money" />
        </svg>
      </div>
      <div>
        <p class="color-7F f14 mt-10">
          今日充值金额
          <span class="color-3">￥{{money.today_recharge_yuan}}</span>
        </p>
      </div>
    </div>
    <div class="plate bg-f mr-20">
      <div class="border-b clearfix">
        <div class="float-l mb-10">
          <span class="color-7F f14">累计会员消费（含增额）</span>
          <p class="color-3 font-b f24 mt-10">
            ￥{{money.total_consume_yuan}}
          </p>
        </div>
        <svg width="48" height="48" class="float-r">
          <use xlink:href="#member" />
        </svg>
      </div>
      <div>
        <p class="color-7F f14 mt-10">
          今日会员消费
          <span class="color-3">￥{{money.today_consume_yuan}}</span>
        </p>
      </div>
    </div>
    <div class="plate bg-f">
      <div class="border-b clearfix">
        <div class="float-l mb-10">
          <span class="color-7F f14">会员池总余额（含增额）</span>
          <p class="color-3 font-b f24 mt-10">
            ￥{{money.total_balance_yuan}}
          </p>
        </div>
        <svg width="48" height="48" class="float-r">
          <use xlink:href="#money" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ["money"]
  }

</script>

<style scoped>
  .plate {
    float: left;
    padding: 20px;
    width: 360px;
    height: 102px;
    border-radius: 2px;
  }

</style>
