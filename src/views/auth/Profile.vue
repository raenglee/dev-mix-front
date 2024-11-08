<template>
  <div class="flex justify-center items-center mx-auto my-10" style="width: 900px">
    <div class="justify-center items-center">
      <div class="my-3" style="width: 900px">
        <h2 class="text-2xl font-semibold mb-2">내 정보 입력</h2>
        <hr class="border-t-4 border-[#d10000]" />

        <form @submit.prevent="handleSubmit" class="grid gap-y-6 px-20 py-10">
          <!-- 프로필 사진 -->
          <div class="grid grid-cols-4 items-center gap-x-4">
            <label class="text-gray-700 text-lg font-semibold">프로필 사진</label>
            <div class="col-span-2 flex items-center">
              <input type="file" @change="onFileChange" accept="image/*" class="hidden" ref="fileInput" />
              <div class="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer" @click="selectFile">
                <img v-if="profileImage" :src="profileImage" class="w-full h-full rounded-full object-cover" />
                <span v-else class="text-gray-500 text-2xl">+</span>
              </div>
            </div>
          </div>
          <!-- 닉네임 -->
          <div class="grid grid-cols-4 items-center gap-x-4">
            <label class="text-gray-700 text-lg font-semibold">닉네임 <span class="text-red-500">*</span></label>
            <div class="col-span-2 flex items-center">
              <input type="text" v-model="formData.nickname" placeholder="브라기 오사무로스" class="flex-1 border p-2 rounded-full" required />
              <button type="button" @click="checkNickname" class="ml-2 border p-2 rounded-full text-gray-600">중복확인</button>
            </div>
            <p class="col-start-2 col-span-2 text-xs text-gray-500 mt-1">한글 또는 영어, 8글자 이하 (공백X)</p>
          </div>

          <!-- 소속 -->
          <div class="grid grid-cols-4 items-center gap-x-4">
            <label class="text-gray-700 text-lg font-semibold">소속</label>
            <input type="text" v-model="formData.affiliation" placeholder="그린대학교" class="col-span-2 border p-2 rounded-full w-full" />
          </div>

          <!-- 거주 지역 -> 온라인이 포함 될 수 없기 떄문에 데이터를 가져올 수 없다-->
          <div class="grid grid-cols-4 items-center gap-x-4">
            <label class="text-gray-700 text-lg font-semibold">거주 지역</label>
            <select v-model="formData.location" class="col-span-2 border p-2 rounded-full w-full">
              <option>대구</option>
              <option>서울</option>
              <option>부산</option>
            </select>
          </div>

          <!-- 포지션 -->
          <div class="grid grid-cols-4 items-center gap-x-4">
            <label class="text-gray-700 text-lg font-semibold">포지션</label>
            <div class="col-span-3">
              <div v-for="(position, index) in positions" :key="index" class="flex items-center w-300 mb-3">
                <select v-model="position.role" class="p-2 border-2 border-gray-200 rounded-full" style="width: 410px">
                  <option disabled value="">분야를 선택하세요</option>
                  <option v-for="role in roleOptions" :key="role">{{ role.positionName }}</option>
                </select>
                <!-- 삭제 버튼: 첫 번째 항목에서는 비활성화 -->
                <div class="flex">
                  <button
                    type="button"
                    @click="removePosition(index)"
                    v-if="index > 0"
                    class="text-[#d10000] ml-2 text-sm pl-2 pr-2 border-2 font-bold border-gray-200 rounded-full hover:bg-[#d10000] hover:font-bold hover:text-white hover:border-[#d10000]"
                  >
                    삭제
                  </button>

                  <!-- 마지막 칸에만 추가 버튼 표시 -->
                  <button
                    v-if="index === positions.length - 1"
                    type="button"
                    @click="addPosition"
                    class="text-[#7371fc] ml-2 text-sm pl-2 pr-2 border-2 font-bold border-gray-200 rounded-full hover:bg-[#7371fc] hover:font-bold hover:text-white hover:border-[#7371fc]"
                  >
                    추가
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- 기술/언어 선택 -->
          <div class="grid grid-cols-4 gap-x-4 items-center">
            <label class="text-gray-700 text-lg font-semibold">기술 / 언어</label>
            <div class="col-span-2 relative">
              <!-- 'relative' 클래스를 추가 -->
              <div @click="toggleDropdown" class="w-full h-11 p-2 border rounded-full cursor-pointer flex items-center justify-between">
                <span>{{ selectedSkill.value || '기술을 선택하세요' }}</span>
              </div>
              <div v-if="isDropdownOpen" class="absolute bg-white border rounded-lg mt-2 w-full z-10">
                <div v-for="tech in availableTechOptions" :key="tech" @click="selectSkill(tech)" class="p-2 hover:bg-gray-200 cursor-pointer">
                  <img :src="tech.imageUrl" class="tech-image w-10 h-10" />
                  <p class="...">{{ tech.techStackName }}</p>
                </div>
              </div>
              <div class="flex flex-wrap mt-2">
                <div v-for="(skill, index) in selectedSkills" :key="index" @click="removeSkill(index)" class="border rounded-full p-2 mr-2 mb-2 flex items-center cursor-pointer">
                  <img :src="skill.imageUrl" class="w-8 h-8" />
                  <span class="..."> {{ skill.techStackName }} </span>
                  <p class="text-red-500 ml-1 font-bold">x</p>
                </div>
              </div>
              <p class="col-start-2 col-span-2 text-xs text-gray-500 mt-1">(최대 10개)</p>
            </div>
          </div>

          <!-- 버튼 -->
          <div class="flex justify-center gap-4 mt-6">
            <button type="button" @click="handleCancel" class="px-6 py-2 border border-gray-300 rounded-md">취소</button>
            <button type="submit" class="px-6 py-2 bg-red-600 text-white rounded-md">완료</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { useUserStore } from '@/store/user';
import { userProfile, loginUsers, deleteUser } from '@/api/loginApi'; // registerUser 추가
import { useRouter } from 'vue-router';
import { getPositions, getTechstacks } from '@/api/projectApi';

const useStore = useUserStore();
const router = useRouter();

const formData = ref({ nickname: '', affiliation: '', location: '' }); // formData 변수명 변경

const profileImage = ref(null); // 프로필 이미지 상태 관리
const isUserDataExists = ref(false);
const isSubmitted = ref(false); // 완료 버튼 클릭 여부를 추적

//사용자 데이터 가져오기
const checkUserData = async () => {
  try {
    const userData = await loginUsers(); // 사용자 데이터 가져오기
    if (userData.result.nickname) {
      isUserDataExists.value = true;
      useStore.login(userData.result); // 스토어에 사용자 정보 저장
      formData.value = userData.result; // 사용자 정보를 formData에 할당
    } else {
      isUserDataExists.value = false; // 닉네임이 없는 경우
    }
  } catch (error) {
    console.error('사용자 데이터 확인 실패:', error);
  }
};

const handleSubmit = async () => {
  try {
    if (formData.value.nickname) {
      isSubmitted.value = true; // 완료 버튼이 클릭되었음을 표시

      // 업데이트 요청
      const response = await userProfile({ ...formData.value, profileImage: profileImage.value });
      if (response) {
        // 업데이트된 사용자 정보를 가져오는 API 호출
        const updatedData = await loginUsers(); // 로그인 API 호출
        // 스토어에 사용자 정보 저장
        useStore.login(updatedData.result);

        console.log('사용자 정보 업데이트 성공:', response);
        alert('닉네임이 업데이트되었습니다.');
        router.push('/'); // 메인 페이지로 리다이렉트
      }
    } else {
      alert('필수 입력값(닉네임)을 입력하세요');
    }
  } catch (error) {
    console.error('사용자 정보 업데이트 실패:', error);
    alert('업데이트에 실패했습니다.');
  }
};

const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = (e) => {
      profileImage.value = e.target.result; // 이미지 미리보기
    };
    reader.readAsDataURL(file);
  } else {
    alert('이미지 파일만 선택할 수 있습니다.');
  }
};

const selectFile = () => {
  document.querySelector('input[type="file"]').click(); // 파일 입력 클릭
};

// const checkNickname = async () => {
//   try {
//     const response = await checkNickname(formData.value.nickname); // 닉네임 중복 확인 API 호출
//     if (response.available) {
//       alert('사용 가능한 닉네임입니다.');
//     } else {
//       alert('이미 사용 중인 닉네임입니다.');
//     }
//   } catch (error) {
//     console.error('닉네임 중복 확인 실패:', error);
//     alert('닉네임 중복 확인에 실패했습니다.');
//   }
// };

// 회원가입 취소
const handleCancel = async () => {
  alert('회원가입 취소.');
  await removeUserData();
  router.push('/');
};

// 사용자 데이터 삭제
const removeUserData = async () => {
  try {
    await deleteUser(); // 사용자 정보 삭제 요청
    useStore.logout(); // Pinia 스토어에서 로그아웃 처리
    console.log('사용자 정보 삭제 및 로그아웃 완료');
  } catch (error) {
    console.error('사용자 정보 삭제 실패:', error);
    alert('사용자 정보 삭제에 실패했습니다.');
  }
};

// 컴포넌트가 언마운트될 때 사용자 정보 삭제
onBeforeUnmount(() => {
  if (!isSubmitted.value) {
    removeUserData(); // 제출되지 않은 경우에만 삭제
  }
});

// 기술 / 언어 데이터 연결
const selectedSkill = ref(''); // 현재 선택된 기술 저장
const selectedSkills = ref([]); // 선택된 기술들의 배열
const techOptions = ref([]); // 서버에서 전달 받은 기술 저장

const updateTechstacks = async () => {
  try {
    const res = await getTechstacks();
    // console.log('updateTechstacks 데이터 확인: ', res);
    // techOptions.value = res.result; // 받아온 기술 목록을 techOptions에 저장
    if (Array.isArray(res.data.result)) {
      techOptions.value = res.data.result.map((item) => ({
        techStackName: item.techStackName,
        imageUrl: item.imageUrl
      }));
    } else {
      console.error('기술/언어 배열 저장 에러', res);
    }
  } catch (error) {
    console.error('실패:', error);
  }
};

// 선택된 기술을 제외한 선택 가능한 기술목록
const availableTechOptions = computed(() => {
  return techOptions.value.filter((tech) => !selectedSkills.value.includes(tech));
});

// 기술 선택
const selectSkill = (tech) => {
  if (!selectedSkills.value.includes(tech)) {
    selectedSkills.value.push(tech);
  }

  // 선택 후 남은 기술이 없으면 드롭다운 닫기
  if (availableTechOptions.value.length === 0) {
    isDropdownOpen.value = false;
  }
};

// 기술 삭제
const removeSkill = (index) => {
  selectedSkills.value.splice(index, 1);

  // 삭제 후 남은 기술이 없으면 드롭다운 닫기
  if (availableTechOptions.value.length === 0) {
    isDropdownOpen.value = false;
  }
};

//🚹 분야별 모집 인원 관련 scripts
const positions = ref([{ role: '', count: 1 }]); // 포지션 관리
const roleOptions = ref([]); // 서버에서 전달 받은 포지션 저장

const addPosition = () => {
  positions.value.push({ role: '', count: 1 });
};

const removePosition = (index) => {
  positions.value.splice(index, 1);
};

// 포지션 서버 연결
const updatePositions = async () => {
  try {
    const res = await getPositions();
    // console.log('updatePsotions 데이터 확인: ', res);
    if (Array.isArray(res.data.result)) {
      roleOptions.value = res.data.result; // 목록이 이름 하나이므로 배열에 넣을 필요X
    } else {
      console.error('분야별 모집 인원 배열 저장 에러', res);
    }
  } catch (error) {
    console.error('실패:', error);
  }
};

const isDropdownOpen = ref(false); // 드롭다운 열림 상태

// 드롭다운 열고 닫기
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

// 바탕 클릭 이벤트 처리
const handleClickOutside = (event) => {
  if (!event.target.closest('.relative') && isDropdownOpen.value) {
    // 드롭다운 내부가 아닌 경우 닫기
    isDropdownOpen.value = false;
  }
};

onMounted(() => {
  checkUserData();
  updateTechstacks();
  updatePositions();
  document.addEventListener('mousedown', handleClickOutside);
});

// 컴포넌트 언마운트 시 이벤트 리스너 제거
onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside);
});
</script>
