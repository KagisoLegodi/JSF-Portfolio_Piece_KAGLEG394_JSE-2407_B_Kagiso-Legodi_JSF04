<template>
  <div class="sort">
    <select @change="handleSortChange" v-model="sortOrder">
      <option value="">Default</option>
      <option value="low-to-high">Price: Low to High</option>
      <option value="high-to-low">Price: High to Low</option>
    </select>
  </div>
</template>

<script>
import { ref, watch } from "vue";

export default {
  name: "Sort",
  props: {
    initialSort: String,
  },
  emits: ["update:sort"],
  setup(props, { emit }) {
    const sortOrder = ref(props.initialSort || "");

    const handleSortChange = () => {
      emit("update:sort", sortOrder.value);
    };

    watch(sortOrder, () => {
      handleSortChange();
    });

    return {
      sortOrder,
      handleSortChange,
    };
  },
};
</script>

<style scoped>
.sort {
  margin-left: 1rem;
}
</style>
