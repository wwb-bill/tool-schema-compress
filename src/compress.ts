import type{CompressStats,McpTool}from"./types.js";
export function compressSchema(schema:Record<string,unknown>):{compressed:Record<string,unknown>;stats:CompressStats}{
  const orig=JSON.stringify(schema);const c=JSON.parse(JSON.stringify(schema));
  const dropKeys=["description","default","examples","$comment","$id","$schema"];
  function strip(obj:unknown):void{if(typeof obj!=="object"||!obj)return;for(const k of dropKeys)delete(obj as any)[k];for(const v of Object.values(obj as any))strip(v);}
  strip(c);
  const comp=JSON.stringify(c);
  return{compressed:c,stats:{originalChars:orig.length,compressedChars:comp.length,savingsPercent:Math.round((1-comp.length/orig.length)*100),transforms:dropKeys.length}};
}

export function compressManifest(tools:McpTool[]):{tools:McpTool[];totalSavings:number}{
  let total=0;const result=[];
  for(const t of tools){
    const out={...t};
    if(out.inputSchema&&typeof out.inputSchema==="object"){const{compressed,stats}=compressSchema(out.inputSchema as Record<string,unknown>);out.inputSchema=compressed;total+=stats.savingsPercent;}
    result.push(out);
  }
  return{tools:result,totalSavings:Math.round(total/result.length)};
}