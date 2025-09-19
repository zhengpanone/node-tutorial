import initQdrant from "../utils/db.js";
import OpenAI from "openai";
import { rerank } from '../api/index.js';

const openai = new OpenAI({
  apiKey: process.env.DASHSCOPE_API_KEY,
  baseURL: process.env.DASHSCOPE_BASE_URL,
});

// 单一搜索
export async function queryDocuments(query: string) {
  const qdrant = await initQdrant();
  const vector = await queryVector(query).catch(err => {
    console.error(err);
    return [];
  });
  const results = await qdrant.search('knowledge-base', {
    vector: vector,
    limit: 10, // 最多返回10个结果
    with_payload: true // 包含payload
  });
  return results;
}

export async function hybridSearch(query: string): Promise<QdrantResult[]> {
  const qdrant = await initQdrant();
  // 获取多模态向量
  const vector = await queryVector(query);
  // 向量搜索
  const vectorResults = await qdrant.search('knowledge-base', {
    vector: vector,
    limit: 10,
    with_payload: true
  });

  // 关键字搜索
  const keywordResults = await qdrant.search('knowledge-base', {
    vector: vector,
    filter: {
      should: [{
        key: 'text', match: {
          text: query
        }
      }]
    },
    limit: 10,
    with_payload: true
  });
  // 合并搜索结果
  const combineResults = Array.from(new Set([...vectorResults, ...keywordResults].map((item) => JSON.stringify(item))))
    .map((item) => JSON.parse(item));
  return combineResults;
}


// 使用模型将查询文本转换为向量
export async function queryVector(query: string) {
  const response = await openai.embeddings.create({
    model: 'text-embedding-v3', // 文本转换向量
    input: query
  });
  return response.data[0].embedding;
}

// 重排序文档
export async function rerankDocuments(query: string, documents: string[]) {
  try {
    const response = await rerank({
      model: 'gte-rerank-v2', // 重排序
      input: {
        query: query,
        documents: documents
      },
      parameters: {
        return_documents: true, // 返回排序后的文档列表
        top_n: 5 // 最多返回5个结果
      }
    });
    if (response.status === 200) {
      return response.data.output.results;
    } else {
      return Promise.reject(response.data);
    }
  } catch (error) {
    console.error('rerank error', error);
    return Promise.reject(error);
  }
}

// 生成聊天消息 
export async function generateChatMessage(query: string, documents?: string[]) {
  let prompt = '';
  if (documents) {
    prompt = `
    请基于\`\`\`内的内容回答问题。
    \`\`\`
    ${documents.join('\n')}
    \`\`\`
    我的问题是：${query}
    `;
  } else {
    prompt = query;
  }

  const response = await openai.chat.completions.create({
    model: 'qwen-plus', // 文本生成
    messages: [
      { role: 'user', content: prompt },
    ],
    stream: true // 创建流式数据
  });
  return response;
}