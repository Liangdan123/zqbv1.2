<template>
	<div class="openStore">
		<div class="g-content">
			<storeMess></storeMess>
		</div>
		
	</div>
</template>

<script>
	export default{
		components:{
			storeMess:()=>import("@/components/servicer/storeSet/storeMess")
		},
	}
</script>

<style lang="scss">
.openStore{
	margin-top: 80px;
}
</style>