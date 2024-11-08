<script setup>
import { ref, onMounted, onUnmounted, defineProps } from 'vue';

const props = defineProps({
  options: Array,
  title: String,
  modelValue: [String, Array],
  isActive: Boolean,
  multiple: Boolean,
});

const emit = defineEmits(['update:modelValue', 'dropdown-toggle']);

// 선택 관리
const selectedValue = ref(props.multiple ? (Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue]) : (props.modelValue || ''));

const toggleSelection = (option) => {
  if (props.multiple) {
    const index = selectedValue.value.indexOf(option);
    if (index === -1) {
      selectedValue.value.push(option);
    } else {
      selectedValue.value.splice(index, 1);
    }
    emit('update:modelValue', selectedValue.value);
  } else {
    selectedValue.value = option;
    emit('update:modelValue', selectedValue.value);
    emit('dropdown-toggle', false);
  }
};

const handleClick = () => {
  emit('dropdown-toggle');
};

const isSelected = (option) => {
  return props.multiple ? selectedValue.value.includes(option) : selectedValue.value === option;
};

// 외부 클릭 관리
const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    emit('dropdown-toggle', false);
  }
};

onMounted(() => {
  window.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div class="relative">
    <div @click="handleClick" class="px-4 py-1 mt-5 mb-1 border border-gray rounded-full cursor-pointer outline-none">
      <span v-if="Array.isArray(selectedValue) && selectedValue.length">{{ selectedValue.join(', ') }}</span>
      <span v-else>{{ title }}</span>
      <font-awesome-icon :icon="isActive ? 'chevron-up' : 'chevron-down'" class="text-gray-300 pl-2" />
    </div>
    <div v-if="isActive" class="absolute bg-white border border-gray rounded-md shadow-lg z-10 w-64 p-4 max-h-48 overflow-y-auto">
      <div class="flex flex-col">
        <div v-if="props.multiple" class="mb-2">
          <span class="text-gray-500">선택된 기술/언어:</span>
          <div class="flex flex-wrap mt-1">
            <span v-for="(option, index) in selectedValue" :key="index" class="bg-blue-100 text-blue-600 rounded-full px-2 py-1 mr-2 mb-2">
              {{ option }}
            </span>
          </div>
        </div>
        <div v-for="(option, index) in options" :key="index" class="flex items-center p-1 cursor-pointer">
          <label :class="{'text-gray-400': isSelected(option)}" @click="toggleSelection(option)" class="flex-1">
            {{ option }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.relative {
  position: relative;
}
</style>
