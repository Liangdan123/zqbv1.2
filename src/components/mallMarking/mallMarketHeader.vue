<template>
	<div class="market Navbar clearfix">
		<el-menu :router="true" mode="horizontal" class="clearfix" @select="handleSelect">
			<el-menu-item index="Coupon" :class="{active:selected=='memberCenter'}">
				会员中心
			</el-menu-item>
		</el-menu>
	</div>
</template>


