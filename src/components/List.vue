<template>
    <div></div>
</template>

<script>
  export default {
    name: "List",
    props: {
      data: {
        /**
         * Array<{
         *     title: string,
         *     status: number,
         *     deadline: string,
         *     budget: number,
         *     codeType: string
         * }>
         */
        type: Array,
        default: () => []
      }
    }
  }
</script>

<style lang="scss">

</style>