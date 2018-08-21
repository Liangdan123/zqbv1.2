<template>
	<div >		
		<transition name="el-fade-in" mode="out-in">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
</script>

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
