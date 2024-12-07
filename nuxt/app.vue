<template>
    <div class="flex flex-col gap-4 border border-red-500">
        <button @click="readFile">파일 읽기</button>
        <div>{{ fileContent }}</div>
        <button @click="getArgs">인수 읽기</button>
        <div>{{ args }}</div>
    </div>
</template>

<script setup>
const fileContent = ref('');
const args = ref('');

const getArgs = async () => {
    try {
        const data = await window.electronAPI.getArgs()
        args.value = data
    } catch (error) {
        console.error('인수 읽기 실패:', error)
    }
}

const readFile = async () => {
    try {
        const data = await window.electronAPI.readFile('D:/high-pressure')
        fileContent.value = data
    } catch (error) {
        console.error('파일 읽기 실패:', error)
    }
}
</script>