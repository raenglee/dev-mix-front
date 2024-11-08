<template>
  <div class="w-3/6 mx-auto">
    <h1 class="pt-10 font-bold text-xl">프로젝트 생성</h1>
    <div class="my-3 mb-10">
      <hr class="border-t-4 border-[#d10000]" />
      <p class="text-sm my-2"><span class="text-[#d10000] mx-1">*</span>프로젝트는 빈 항목이 없이 작성되어야 합니다.</p>
    </div>

    <!--📝프로젝트 생성 선택 구간-->
    <div class="flex flex-col">
      <h1 class="font-bold text-lg mb-2">프로젝트 명<span class="text-[#d10000] mx-1">*</span></h1>
      <input type="text" v-model="title" class="min-w-full h-10 border border-gray-200 justify-center items-center rounded-full p-3 focus:outline-none" placeholder="프로젝트 명을 입력하세요." />

      <!--지역/구분, 진행 기간, 모집 마감일-->
      <div class="flex justify-between gap-5 mt-5 flex-wrap">
        <!--🌍지역 / 구분 드롭다운-->
        <div class="flex flex-col">
          <h1 class="font-bold text-lg pb-2">지역 / 구분<span class="text-[#d10000] mx-1">*</span></h1>
          <select v-model="location" class="w-52 h-10 p-2 border border-gray-200 rounded-full cursor-pointer focus:outline-none">
            <option disabled value="">지역 / 구분을 선택하세요</option>
            <option v-for="location in locationOptions" :key="location" :value="location">
              {{ location }}
            </option>
          </select>
        </div>

        

        <!--진행 기간 드롭다운-->
        <div class="flex flex-col">
          <h1 class="font-bold text-lg pb-2">진행 기간<span class="text-[#d10000] mx-1">*</span></h1>
          <select v-model="project_period" class="w-52 h-10 p-2 border border-gray-200 rounded-full focus:outline-none">
            <option value="" disabled>{{ project_period ? project_period : '진행 기간을 선택하세요' }}</option>
            <option>미정</option>
            <option>1개월 미만</option>
            <option>1개월</option>
            <option>2개월</option>
            <option>3개월</option>
            <option>4개월</option>
            <option>5개월</option>
            <option>6개월 이상</option>
          </select>
        </div>

        <!-- 모집 마감일 -->
        <div class="flex flex-col">
          <h1 class="font-bold text-lg pb-2">모집 마감일<span class="text-[#d10000] mx-1">*</span></h1>
          <input v-model="recruit_end_date" type="date" class="w-52 h-10 p-2 border border-gray-200 rounded-full focus:outline-none" :min="minDate" />
        </div>
      
      
      </div>



      

      <!--✅기술/언어 선택 -> 다중선택, 선택삭제 가능하도록-->
      <div class="flex flex-col justify-between mt-5" ref="dropdownContainer">
        <h1 class="font-bold text-lg pb-2">기술 / 언어<span class="text-sm mx-1">(최대 10개)</span><span class="text-[#d10000] mx-1">*</span></h1>

        <div class="relative w-full m-auto flex">
          <div @click="toggleDropdown" class="min-w-72 h-10 p-2 border border-gray-200 rounded-full cursor-pointer flex items-center justify-between">
            <span>{{ selectedSkill.value || '기술을 선택하세요' }}</span>
            <font-awesome-icon icon="chevron-down" class="text-gray-300 pl-2" />
          </div>
          <!--드롭다운-->
          <div v-if="isDropdownOpen" class="absolute bg-white border border-gray-200 rounded-lg mt-12 ml-1 min-w-96 z-10">
            <div class="grid grid-cols-5 gap-2 p-2">
              <div v-for="tech in availableTechOptions" :key="tech" @click="selectSkill(tech)" class="cursor-pointer text-sm gap-3">
                <img :src="tech.imageUrl" class="w-10 h-12 item-center hover:w-12" />
                <p class="">{{ tech.techStackName }}</p>
              </div>
            </div>
          </div>

          <div class="flex flex-wrap">
            <div v-for="(skill, index) in selectedSkills" :key="index" @click="removeSkill(index)" class="pl-4 mt-1 mb-3 flex items-center gap-2 cursor-pointer">
              <img :src="skill.imageUrl" class="w-8 h-8" />
              <span class="text-sm m-auto w-16"> {{ skill.techStackName }}</span>
              <p class="text-[#d10000] font-bold mx-3">x</p>
            </div>
          </div>
        </div>
      </div>

      <!--🚹분야별 모집 인원 -> 추가, 삭제 가능하도록-->
      <div class="flex justify-between mt-5">
        <h1 class="font-bold text-lg pb-2">분야별 모집 인원<span class="text-[#d10000] mx-1">*</span></h1>
      </div>
      <div>
        <div v-for="(position, index) in positions" :key="index" class="flex items-center space-x-7 mb-3">
          <!-- 포지션 선택 부분 -->
          <select v-model="position.positionName" class="w-1/2 h-10 p-2 border border-gray-200 rounded-full focus:outline-none">
            <option disabled value="">분야를 선택하세요</option>
            <option v-for="positionName in roleOptions" :key="positionName.positionName">{{ positionName.positionName }}</option>
          </select>

          <!-- 사람 수 조절 버튼 -->
          <div class="flex items-center space-x-1">
            <button type="button" @click="decreaseCount(index)" class="text-gray-400 w-5 h-5 rounded-full border border-gray-200 flex items-center justify-center">
              <FontAwesomeIcon icon="fa-solid fa-minus" size="sm" />
            </button>
            <span class="w-8 text-center">{{ position.requiredCount }}</span>
            <button type="button" @click="increaseCount(index)" class="text-gray-400 w-5 h-5 rounded-full border border-gray-200 flex items-center justify-center">
              <FontAwesomeIcon icon="fa-solid fa-plus" size="sm" />
            </button>
          </div>

          <!-- 삭제 버튼: 첫 번째 항목에서는 비활성화 -->
          <div class="flex space-x-4">
            <button
              type="button"
              @click="removePosition(index)"
              v-if="index > 0"
              class="text-[#d10000] text-sm pl-2 pr-2 border font-bold border-gray-200 rounded-full hover:bg-[#d10000] hover:font-bold hover:text-white hover:border-[#d10000]"
            >
              삭제
            </button>

            <!-- 마지막 칸에만 추가 버튼 표시 -->
            <button
              v-if="index === positions.length - 1"
              type="button"
              @click="addPosition"
              class="text-[#7371fc] text-sm pl-2 pr-2 border font-bold border-gray-200 rounded-full hover:bg-[#7371fc] hover:font-bold hover:text-white hover:border-[#7371fc]"
            >
              추가
            </button>
          </div>
        </div>
      </div>

      <!--구분선-->
      <div class="my-3 mb-5 mt-10">
        <hr class="border-t-4 border-[#d10000]" />
      </div>

      <!--프로젝트 상세 소개-->
      <div>
        <h1 class="font-bold text-lg mb-3">프로젝트 소개<span class="text-[#d10000] mx-1">*</span></h1>
        <textarea v-model="content" class="w-full p-3 mb-2 h-96 border border-gray-200 rounded-md focus:outline-none ring-gray-300 resize-none text-gray-700 placeholder-gray-400 bg-white"></textarea>
      </div>

      <!-- 파일 첨부 -->
      <!-- <div @dragover.prevent="" @drop.prevent="dropFile" class="p-10 bg-gray-100 rounded-md">
        <h1 class="text-center text-gray-500 cursor-pointer" v-if="myfile.length === 0">
          <FontAwesomeIcon icon="fa-solid fa-image" size="2xl" />
          파일을 첨부하세요
        </h1>

        <div v-if="myfile.length > 0" class="text-center">
          <div v-for="file in myfile" :key="file.name" class="mt-2">
            <div>{{ file.name }}</div>
            <img v-if="isImageFile(file)" :src="getFileUrl(file)" class="mt-2 m-auto h-auto" />
          </div>
        </div>
      </div> -->

      <!-- 취소, 등록 버튼 -->
      <div class="flex justify-center space-x-4 pt-4 mt-5 mb-5">
        <button type="button" class="text-m px-3 py-1 border border-gray-200 rounded-full hover:bg-gray-300 hover:text-black hover:border-gray-300" @click="cancel">취소</button>
        <button type="submit" class="text-m px-3 py-1 border border-gray-200 rounded-full hover:bg-[#d10000] hover:text-white hover:border-[#d10000]" @click="save">등록</button>
      </div>
    </div>
    <!--프로젝트 생성 선택 구간 끝-->
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { FontAwesomeIcon } from '@/assets/FontAwesome';
import { getPositions, saveProject, getTechstacks, getLocation } from '@/api/projectApi';
import { useRouter } from 'vue-router';

const router = useRouter();
const isDropdownOpen = ref(false); // 드롭다운 닫힌(false) 상태

// 🌍지역 / 구분 선택 관련 scripts
const locationOptions = ref([]); // 서버에서 전달 받은 지역 저장

const updateLocations = async () => {
  try {
    const res = await getLocation();
    // console.log('updateLocations 데이터 확인: ', res.data);
    if (Array.isArray(res.data.result)) {
      locationOptions.value = res.data.result; // 목록이 이름 하나이므로 배열에 넣을 필요X
    } else {
      console.error('지역 / 구분 배열 저장 에러', res);
    }
  } catch (error) {
    console.error('실패:', error);
  }
};

// ✅ 기술 / 언어 선택 관련 scripts

const selectedSkill = ref(''); // 현재 선택된 기술 저장
const selectedSkills = ref([]); // 선택된 기술들의 배열
const techOptions = ref([]); // 서버에서 전달 받은 기술 저장

// 기술 / 언어 서버 연결
const updateTechstacks = async () => {
  try {
    const res = await getTechstacks();
    // console.log('updateTechstacks 데이터 확인: ', res);
    techOptions.value = res.result; // 받아온 기술 목록을 techOptions에 저장
    if (Array.isArray(res.data.result)) {
      techOptions.value = res.data.result.map((item) => ({
        // 받아오는 정보가 두개이상이므로 map으로 가져온다.
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

// 드롭다운 열고 닫기
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

// 기술 선택
const selectSkill = (tech) => {
  if (!selectedSkills.value.includes(tech) && selectedSkills.value.length < 10) {
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
};

// 바탕 클릭 이벤트 처리
const handleClickOutside = (event) => {
  if (!event.target.closest('.relative') && isDropdownOpen.value) {
    isDropdownOpen.value = false;
  }
};

// 컴포넌트 언마운트 시 이벤트 리스너 제거
onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside);
});

//🚹 분야별 모집 인원 관련 scripts

const positions = ref([{ positionName: '', requiredCount: 1 }]);
const roleOptions = ref([]); // 서버에서 전달 받은 포지션 저장

// 포지션 서버 연결
const updatePositions = async () => {
  try {
    const res = await getPositions();
    // console.log('updatePsotions 데이터 확인: ', res.data.result);
    if (Array.isArray(res.data.result)) {
      roleOptions.value = res.data.result; // 목록이 이름 하나이므로 배열에 넣을 필요X
    } else {
      console.error('분야별 모집 인원 배열 저장 에러', res);
    }
  } catch (error) {
    console.error('실패:', error);
  }
};

// 포지션 추가
const addPosition = () => {
  positions.value.push({
    positionName: '', // 초기값 빈 값으로 해서 '분야를 선택하세요'가 표시되도록 함
    requiredCount: 1 // 초기 사람 수는 1로 설정
  });
};

// 포지션 삭제
const removePosition = (index) => {
  positions.value.splice(index, 1);
};

// 사람 수 증가
const increaseCount = (index) => {
  positions.value[index].requiredCount += 1;
};

// 사람 수 감소
const decreaseCount = (index) => {
  if (positions.value[index].requiredCount > 1) {
    positions.value[index].requiredCount -= 1;
  }
};

//파일 첨부 및 저장

// 드롭 파일 첨부
// const myfile = ref([]);

// const dropFile = (e) => {
//   myfile.value = []; // 드롭 시 기존 파일 목록 초기화
//   const data = e.dataTransfer;

//   for (let i = 0; i < data.files.length; i++) {
//     myfile.value.push(data.files[i]); // 드롭된 파일 배열에 추가
//   }
// };

// // 파일 미리보기 URL 생성
// const getFileUrl = (file) => {
//   return URL.createObjectURL(file);
// };

// 게시글 등록 취소
const cancel = () => {
  const isConfirmed = window.confirm('현재 작성 중인 내용은 저장되지 않습니다. 정말로 취소하시겠습니까?');
  if (isConfirmed) {
    // console.log('게시글 작성 취소버튼 눌리는지 확인');
    router.push({ name: 'projectlist' });
  } else {
    // 취소한 경우 아무런 동작도 하지 않으므로 아무것도 적지 않기
    // console.log('게시글 작성 취소를 취소');
  }
};

// 게시글 등록
const title = ref('');
const content = ref('');
const location = ref('');
const project_period = ref('');
const recruit_end_date = ref('');

const save = async () => {

  const data = {
    title: title.value,
    content: content.value,
    // imageUrl: 'string',
    projectPeriod: project_period.value,
    location: location.value,
    startDate: start_date.value,
    recruitEndDate: recruit_end_date.value,
    boardTechStackList: selectedSkills.value,
    boardPositionList: positions.value
  };

  console.log(JSON.stringify(data));

  const res = await saveProject(data);

  if (res.status === 200) {
    alert('글이 작성되었습니다.');
    router.push({ name: 'projectlist' });
    return;
  }
  alert('에러: ' + res.data.message);
};

// 날짜 오늘 날짜 전 선택 불가능하도록
const start_date = ref('');

const minDate = computed(() => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // 0부터 시작하므로 +1
  const day = String(today.getDate()).padStart(2, '0');
  start_date.value = `${year}-${month}-${day}`;
  return `${year}-${month}-${day}`; // 현재 날짜를 YYYY-MM-DD 형식으로 반환
});

// 이벤트 리스너
onMounted(() => {
  updateTechstacks(); // 기술, 언어 API 호출
  updatePositions(); // 포지션 API 호출
  updateLocations(); // 지역 API 호출
  document.addEventListener('mousedown', handleClickOutside); // 바탕 클릭 시 드롭다운 닫기
});
</script>

<style lang="scss" scoped></style>
