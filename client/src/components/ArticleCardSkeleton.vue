<script>
export default {
  name: "ArticleCardSkeleton",
};
</script>

<template>
  <div class="flex gap-4">
    <skeletor height="250px" width="400px" class="shrink-0" />
    <div class="col-span-2 flex flex-col w-full">
      <div class="flex flex-col gap-3 mb-4">
        <skeletor height="20px" width="100%" />
        <skeletor height="20px" width="70%" />
      </div>
      <div class="flex items-center gap-2 text-placeholder mb-4">
        <skeletor height="10px" width="100px" />
        <span class="bg-[#00000010] h-[5px] w-[5px] block rounded"></span>
        <skeletor height="10px" width="100px" />
      </div>
      <div class="flex gap-2 items-center">
        <skeletor size="30" style="border-radius: 9999px;" />
        <skeletor height="10px" width="100px" />
      </div>
    </div>
  </div>
</template>
