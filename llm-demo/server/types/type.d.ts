interface RData {
  model: string;
  input?: RInput;
  parameters?: RParameters
}

interface Reranks {
  document: {
    text: string
  }
  index: number;
  relevance_score: number;
}

interface RerankOutput {
  output: {
    results: Reranks[];
  };
  usage: {
    total_tokens: number;
  };
  request_id: string;
}

interface QdrantResult {
  id: string | number;
  version: number;
  score: number;
  payload?: Record<string, unknown> | {
    [key: string]: unknown;
  } | null | undefined;
  vector?: Record<string, unknown> | number[] | number[][] | {
    [key: string]: number[] | number[][] | {
      indices: number[];
      values: number[];
    } | undefined;
  } | null | undefined;
  shard_key?: string | number | Record<string, unknown> | null | undefined;
  order_value?: number | Record<string, unknown> | null | undefined;
}

interface RerankedResult {
  index: string | number;
  relevance_score: number;
  document?: Record<string, unknown> | {
    [key: string]: unknown;
  } | null | undefined;
}