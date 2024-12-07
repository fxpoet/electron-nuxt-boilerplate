import { readdir } from 'fs/promises';

async function heavyFileRead(dirPath: string) {
    const files = await readdir(dirPath);
    process.send?.(files); // 부모프로세스로 파일 목록 전송
}

process.on('message', (filePath: string) => {
    heavyFileRead(filePath);
});