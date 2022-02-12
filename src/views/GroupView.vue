<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const group = route.params.group
let count = 1
if (typeof route.params.count === 'string')
  count = Number.parseInt(route.params.count)
const sortByMemberNumber = route.params.sortByMemberNumber === 'true'

const result: Ref<Array<Array<string>>> = ref([])
const numberOfGroups = ref(0)
if (sortByMemberNumber) {
  numberOfGroups.value = Math.ceil(group.length / count)
} else {
  numberOfGroups.value = count
}
for (let i = 0; i < numberOfGroups.value; i++) {
  result.value.push([])
}

if (typeof group !== 'string') {
  let i = 0
  while (group.length > 0) {
    let name = group[Math.floor(Math.random() * group.length)]
    group.splice(group.indexOf(name), 1)
    result.value[i].push(name)
    i = ++i % numberOfGroups.value
  }
}
</script>

<template>
  <template v-for="(group, i) in result" :key="i">
    <h1 class="font-bold">{{ i }}. skupina</h1>
    {{ group.toString() }}
  </template>
</template>
