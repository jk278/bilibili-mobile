export const BILIBILI_API = 'https://api.bilibili.com';

interface AIConclusion {
    code: number;
    // 其他属性
}

interface AIData {
    [key: string]: AIConclusion;
}
  
export const aiData: AIData = {}