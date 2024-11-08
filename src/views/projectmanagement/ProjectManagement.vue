<template>
  <div class="w-4/6 mx-auto">
    <!-- 탭 메뉴 -->
    <div class="flex-1 ml-5">
      <div class="flex justify-around pt-10">
        <RouterLink to="/projectmanagement/projectapproval" class="text-2xl px-4 py-1" active-class="font-bold">프로젝트 관리</RouterLink>
        <RouterLink to="/projectmanagement/myproject" class="px-4 py-2" active-class="font-bold">참여 프로젝트</RouterLink>
      </div>
      <!--라우터 뷰를 넣어야 vue안에 있는 내용들을 탭을 눌렀을 때도 보여줌-->
      <RouterView />
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
