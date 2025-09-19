declare namespace NodeJS {
  interface ProcessEnv {
    readonly PORT: string;
    readonly DASHSCOPE_API_KEY: string;
    readonly DASHSCOPE_API_URL: string;
    readonly DASHSCOPE_BASE_URL: string;
    readonly DASHSCOPE_API_EMBEDDING_PATH: string;
    readonly DASHSCOPE_API_RERANK_PATH: string;
    readonly QDRANT_API_URL: string;
  }
}