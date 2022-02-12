<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'

type Group = {
  name: string
  members: Array<string>
}

const sortByMemberNumber = ref(false)
const count = ref(0)
const groups: Ref<Array<Group>> = ref([])
groups.value.push({
  name: 'Pripravnik',
  members: [
    'Jure Sovinc'.toUpperCase(),
    'Mark Ramšak'.toUpperCase(),
    'David Pirnar'.toUpperCase(),
    'Filip Bezovnik'.toUpperCase(),
    'Miha Polanšek'.toUpperCase()
  ]
})
groups.value.push({
  name: 'Animator',
  members: [
    'Patricija Knez'.toUpperCase(),
    'Vid Šket'.toUpperCase(),
    'Saša Šramel'.toUpperCase(),
    'Jernej Kolar'.toUpperCase(),
    'Tadej Zidar'.toUpperCase(),
    'Leon Žaberl'.toUpperCase(),
    'Ana Kampuš'.toUpperCase(),
    'Nuša Čakš'.toUpperCase(),
    'Matjaž Kolar'.toUpperCase(),
    'Matija Krumpak'.toUpperCase(),
    'Rok Krumpak'.toUpperCase(),
    'Tjaša Regoršek'.toUpperCase(),
    'Nela Jurjec'.toUpperCase(),
    'Lara Čakš'.toUpperCase(),
    'Anja Šket'.toUpperCase(),
    'Jakob Zidar'.toUpperCase(),
    'Tina Šket'.toUpperCase(),
    'Manca Debelak'.toUpperCase(),
    'Mihael Murko'.toUpperCase(),
    'Petja Korče'.toUpperCase(),
    'Simon Žaberl'.toUpperCase(),
    'Aljaž Knez'.toUpperCase(),
    'Rok Krivokapič'.toUpperCase(),
    'Živa Lorger'.toUpperCase(),
    'Jakob Rihter'.toUpperCase(),
    'Marko Stoklas'.toUpperCase()
  ]
})
groups.value.push({
  name: 'Župnik',
  members: ['Damjan Ratajc'.toUpperCase()]
})

let maxSize = () => {
  let max = 0
  groups.value.forEach((group) => {
    if (group.members.length > max) {
      max = group.members.length
    }
  })
  return max
}
let AddValue = (groupName: string) => {
  let name = prompt('Dodaj ime')?.toUpperCase()
  let group = groups.value.find((g) => g.name === groupName)
  if (name === undefined || name === '') {
    console.log('Empty Name')
  } else if (group === undefined) {
    console.log('Unknown group')
  } else if (group.members.includes(name)) {
    alert('Ime že obstaja!')
  } else {
    group.members.push(name)
  }
}
let RemoveValue = (groupName: string, name: string) => {
  let group = groups.value.find((g) => g.name === groupName)
  if (group === undefined) {
    console.log('Unknown group')
  } else {
    group.members.splice(group.members.indexOf(name), 1)
  }
}
let AddGroup = () => {
  let groupName = prompt('Dodaj skupino')?.toUpperCase()
  if (groupName === undefined || groupName === '') {
    console.log('Empty Name')
  } else if (groups.value.find((g) => g.name === groupName) !== undefined) {
    alert('Skupina že obstaja!')
  } else {
    groups.value.push({ name: groupName, members: [] })
  }
}
let GetList = () => {
  let result: string[] = []
  for (let group of groups.value) {
    group.members.forEach((name) => result.push(name))
  }
  return result
}
</script>

<template>
  <div class="flex flex-row">
    <div
      v-for="group in groups"
      :key="group.name"
      class="flex flex-auto flex-col text-center"
    >
      <h1 class="bg-orange-300 font-semibold">{{ group.name }}</h1>
      <ol
        v-for="(member, i) in group.members"
        :key="member"
        :class="i % 2 === 0 ? 'bg-yellow-100' : ''"
        @dblclick="RemoveValue(group.name, member)"
      >
        {{
          member
        }}
      </ol>
      <ol
        v-for="n in maxSize() - group.members.length"
        :key="group.name + n"
        :class="(group.members.length + n + 1) % 2 === 0 ? 'bg-yellow-100' : ''"
      >
        -
      </ol>
      <button
        class="rounded bg-orange-300 font-bold hover:bg-orange-500"
        @click="AddValue(group.name)"
      >
        +
      </button>
    </div>
  </div>
  <footer class="flex">
    <button
      class="rounded bg-red-400 px-5 py-2 font-bold text-white hover:bg-red-500"
      @click="AddGroup"
    >
      Dodaj Skupino
    </button>
    <label class="ml-4 flex">
      <input
        v-model="count"
        type="number"
        class="mt-1 w-full border-2 border-red-400 text-right focus:outline-none"
      />
      <span class="my-auto ml-2 font-bold">Število</span>
    </label>
    <SwitchGroup>
      <div class="mx-2 flex items-center">
        <SwitchLabel
          :class="!sortByMemberNumber ? 'font-bold' : 'text-gray-500'"
          class="mr-2"
          >Skupin</SwitchLabel
        >
        <Switch
          v-model="sortByMemberNumber"
          class="relative inline-flex h-[38px] w-[74px] flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-red-400 transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          <span
            aria-hidden="true"
            :class="sortByMemberNumber ? 'translate-x-9' : 'translate-x-0'"
            class="pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
          ></span>
        </Switch>
        <SwitchLabel
          class="ml-2"
          :class="sortByMemberNumber ? 'font-bold' : 'text-gray-500'"
          >Članov</SwitchLabel
        >
      </div>
    </SwitchGroup>
    <router-link
      :to="{
        name: 'group',
        params: {
          sortByMemberNumber: sortByMemberNumber,
          count: count,
          group: GetList()
        }
      }"
      class="ml-auto self-end rounded bg-red-400 px-5 py-2 font-bold text-white hover:bg-red-700"
    >
      Razporedi
    </router-link>
  </footer>
</template>
