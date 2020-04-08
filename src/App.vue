<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<style lang="scss">
    @import "./style/helper/index";

    #app {
        @include coverScreen;
    }
</style>
