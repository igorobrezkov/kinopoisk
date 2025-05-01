<script setup lang="ts">
   import Loading from "../assets/images/svg-sprite/loadding.svg"
</script>
<template>
   <span class="spinner"><Loading class="rotating"/></span>
</template>

<style scoped>
.loading {
    position: absolute;
    top:  50%;
    left: 50%;
    transform: translate(-50%,-50%);
}

@-webkit-keyframes rotating

/* Safari and Chrome */
    {
    from {
        -webkit-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
    }

    to {
        -webkit-transform: rotate(360deg);
        -o-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}

@keyframes rotating {
    from {
        -ms-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -webkit-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
    }

    to {
        -ms-transform: rotate(360deg);
        -moz-transform: rotate(360deg);
        -webkit-transform: rotate(360deg);
        -o-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}

.rotating {
    width: 40px;
    height: 40px;
    -webkit-animation: rotating 2s linear infinite;
    -moz-animation: rotating 2s linear infinite;
    -ms-animation: rotating 2s linear infinite;
    -o-animation: rotating 2s linear infinite;
    animation: rotating 2s linear infinite;
}
</style>