export interface CompressStats{originalChars:number;compressedChars:number;savingsPercent:number;transforms:number;}
export interface McpTool{name:string;description?:string;inputSchema?:Record<string,unknown>;}
