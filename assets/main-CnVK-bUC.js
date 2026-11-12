class Fr{dims=[];paddedDims=[];layout="x";dataType="Float32";getByteSize(){let t=1;for(const e of this.paddedDims)t*=e;return this.dataType==="Float32"?t*=4:this.dataType==="Float16"&&(t*=2),t}}class Gr{desc;data;constructor(t,e){this.desc=t,this.data=e}}class Hr{_view;offset=0;constructor(t){this._view=t}read(t){const e=this._view,i=this.offset;switch(this.offset+=t,t){case 1:return e.getUint8(i);case 2:return e.getUint16(i,!0);case 4:return e.getUint32(i,!0);case 8:return Number(e.getBigUint64(i,!0));default:throw new Error("unsupported read size")}}}function Vr(r){const t=new Uint8Array(r),e=new Hr(new DataView(r));if(e.read(2)!==16855)throw new Error("invalid or corrupted weights blob");const n=e.read(1);if(e.read(1),n!==2)throw new Error("unsupported weights blob version");const o=e.read(8);e.offset=o;const a=e.read(4),s=new Map;for(let u=0;u<a;++u){const l=new Fr,p=e.read(2),c=new TextDecoder().decode(t.subarray(e.offset,e.offset+p));e.offset+=p;const d=e.read(1);for(let $=0;$<d;++$)l.dims.push(e.read(4));l.paddedDims=[...l.dims],new TextDecoder().decode(t.subarray(e.offset,e.offset+d))==="oihw"&&(l.layout="oihw"),e.offset+=d;const g=String.fromCharCode(e.read(1));if(g==="f")l.dataType="Float32";else if(g==="h")l.dataType="Float16";else throw new Error("invalid tensor data type");const h=e.read(8),y=t.slice(h,h+l.getByteSize());s.set(c,new Gr(l,y))}return s}function jr(r,t){return r.channels===t.channels}const de=8;class he{autoUpdateOutputBuffer=!0;_label;_device;_outputBuffers={};_pipeline;_bindGroups=[];_needsUpdatePipeline=!0;_needsResizeBuffer=!0;_inputs=[];_outputs=[];_uniforms=[];_uniformBuffers={};_width=10;_height=10;_execWidth;_execHeight;_csCode="";_csMain;_csDefine;_groupOffsets={inputs:0,uniforms:1,outputs:2};constructor(t,e,i){this._label=t,this._device=e,this._csMain=i.csMain,this._csDefine=i.csDefine,this._inputs=i.inputs,this._outputs=i.outputs,this._uniforms=i.uniforms,this.autoUpdateOutputBuffer=i.autoUpdateOutputBuffer??!0,i.uniforms.forEach(n=>{this._uniformBuffers[n.label]=e.createBuffer({label:this._label,size:n.data.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this._device.queue.writeBuffer(this._uniformBuffers[n.label],0,n.data)})}setCSCode({csDefine:t,csMain:e}){this._csDefine=t,this._csMain=e,this._needsUpdatePipeline=!0}setSize(t,e){t=Math.ceil(t),e=Math.ceil(e);const i=t!==this._width||e!==this._height;this._width=t,this._height=e,i&&(this._needsResizeBuffer=!0,this._needsUpdatePipeline=!0)}setExecuteSize(t,e){t=Math.ceil(t),e=Math.ceil(e),this._execWidth=t,this._execHeight=e}setOutputParams(t){this.autoUpdateOutputBuffer&&this._updateOutputBuffers(t),this._needsUpdatePipeline=!0}setOutputBuffers(t){this._outputBuffers=Object.keys(t).reduce((e,i)=>(e[i]={buffer:t[i],params:{channels:4}},e),{})}setUniform(t,e){const i=this._uniformBuffers[t];this._device.queue.writeBuffer(i,0,e)}getOutput(t){return this._needsResizeBuffer&&this.autoUpdateOutputBuffer&&(this._resizeOutputBuffers(),this._needsResizeBuffer=!1),this._outputBuffers[t].buffer}dispose(t=!0){Object.keys(this._uniformBuffers).forEach(e=>{this._uniformBuffers[e].destroy()}),t&&Object.keys(this._outputBuffers).forEach(e=>{this._outputBuffers[e].buffer.destroy()})}_createBuffer(t){const e=this._width*this._height*4*4;return this._device.createBuffer({label:this._label,size:Math.max(e,80),usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST|GPUBufferUsage.COPY_SRC})}_resizeOutputBuffers(){const t=this._outputBuffers;for(const e in t){const{buffer:i,params:n}=t[e];i.destroy(),t[e].buffer=this._createBuffer(n)}}_updateOutputBuffers(t){const e=this._outputBuffers;for(const i in t){const n=t[i];if(!jr(n,e[i]?.params||{})){e[i]?.buffer.destroy();const o=this._createBuffer(n);e[i]={buffer:o,params:n}}}}_updatePipeline(t,e){if(!this._needsUpdatePipeline)return;this._needsUpdatePipeline=!1;const i=this._device,n=this._getFullCs(t,e);n!==this._csCode&&(this._csCode=n,this._pipeline=i.createComputePipeline({label:this._label,layout:"auto",compute:{module:i.createShaderModule({label:this._label,code:n}),entryPoint:"main"}}),this._updateBindGroups())}_getFullCs(t,e){const i=this._inputs,n=this._uniforms;let o=0;const a=this._groupOffsets={inputs:0,uniforms:0,outputs:0};return i.length>0&&o++,n.length>0&&(a.uniforms=o,o++),a.outputs=o,`
${i.sort().map((u,l)=>{const p=`@group(${a.inputs}) @binding(${l}) `,c=`in_${u}`;return e[u]==="texture"?`${p} var ${c}: texture_2d<f32>;`:`${p} var<storage, read> ${c}: array<vec${t[u].channels}f>;`}).join(`
`)}
${this._uniforms.map((u,l)=>`@group(${a.uniforms}) @binding(${l}) var<uniform> ${u.label}: ${u.type};`).join(`
`)}

${this._outputs.map((u,l)=>`@group(${a.outputs}) @binding(${l}) var<storage, read_write> out_${u}: array<vec${this._outputBuffers[u].params.channels}f>;`).join(`
`)}
${this._csDefine??""}
@compute @workgroup_size(${de}, ${de}, 1)
fn main(@builtin(global_invocation_id) globalId: vec3u) {
${this._csMain}
}
`}_updateBindGroups(){const t=[],e=this._device,i=this._groupOffsets;this._uniforms.length>0&&(t[i.uniforms]=e.createBindGroup({label:this._label,layout:this._pipeline.getBindGroupLayout(i.uniforms),entries:this._uniforms.map((n,o)=>({binding:o,resource:{buffer:this._uniformBuffers[n.label]}}))})),this._bindGroups=t}createPass(t,e){this._needsResizeBuffer&&this.autoUpdateOutputBuffer&&(this._resizeOutputBuffers(),this._needsResizeBuffer=!1);const i=this._inputs.reduce((a,s)=>(a[s]=e[s].buffer?"buffer":"texture",a),{});this._updatePipeline(e,i);const n=this._groupOffsets;this._inputs.length>0&&(this._bindGroups[n.inputs]=this._device.createBindGroup({label:this._label,layout:this._pipeline.getBindGroupLayout(n.inputs),entries:this._inputs.map((a,s)=>({binding:s,resource:e[a].buffer?{buffer:e[a].buffer}:e[a].texture.createView()}))})),this._bindGroups[n.outputs]=this._device.createBindGroup({label:this._label,layout:this._pipeline.getBindGroupLayout(n.outputs),entries:this._outputs.map((a,s)=>({binding:s,resource:{buffer:this._outputBuffers[a].buffer}}))});const o=t.beginComputePass();o.setPipeline(this._pipeline),this._bindGroups.forEach((a,s)=>{o.setBindGroup(s,a)}),o.dispatchWorkgroups(Math.ceil((this._execWidth??this._width)/de),Math.ceil((this._execHeight??this._height)/de),1),o.end()}}const re=34028234663852886e22;function ne(r,t,e){return Number.isNaN(r)?0:Math.min(Math.max(r,t),e)}const yi=`
const FLT_MAX = 3.4028234663852886e38;
fn sanitize(v: vec3f, lo: f32, hi: f32) -> vec3f {
  let bits = bitcast<vec3u>(v);
  let magnitude = bits & vec3u(0x7fffffffu);
  let negative = (bits & vec3u(0x80000000u)) != vec3u(0u);
  let infinite = select(vec3f(hi), vec3f(lo), negative);
  let clamped = select(clamp(v, vec3f(lo), vec3f(hi)), infinite, magnitude == vec3u(0x7f800000u));
  return select(clamped, vec3f(0.0), magnitude > vec3u(0x7f800000u));
}
`,Ze=1412.83765,Je=1.64593172,ti=.431384981,ei=-.00294139609,ii=.192653254,ri=.00626026094,ni=.998620152,Ki=15794576e-13,qi=.0322087631,Qi=.00223151711,Zi=.370974749,Ji=65504,tr=nr(Ji),er=1/tr,ir=tr,Se=Math.log(Ji+1),rr=1/Se;function nr(r){return r<=Ki?Ze*r:r<=qi?Je*Math.pow(r,ti)+ei:ii*Math.log(r+ri)+ni}function Kr(r){return r<=Qi?r/Ze:r<=Zi?Math.pow((r-ei)/Je,1/ti):Math.exp((r-ni)/ii)-ri}function qr(r,t){return t==="log"?Math.log(r+1)*rr:nr(r)*er}function Qr(r,t){return t==="log"?Math.exp(r*Se)-1:Kr(r*ir)}function Zr({data:r,channels:t,inputScale:e,transfer:i="pu"}){const n=new Float32Array(r);for(let o=0;o<n.length;o+=t)for(let a=0;a<3;a++)n[o+a]=qr(ne(n[o+a]*e,0,re),i);return n}function Jr({data:r,channels:t,inputScale:e,transfer:i="pu"}){const n=new Float32Array(r),o=1/e;for(let a=0;a<n.length;a+=t)for(let s=0;s<3;s++)n[a+s]=Qr(ne(n[a+s],0,re),i)*o;return n}function tn({data:r,channels:t}){let e=0;for(let a=0;a<r.length;a+=t){const s=ne(r[a],0,re),u=ne(r[a+1],0,re),l=ne(r[a+2],0,re),p=.212671*s+.71516*u+.072169*l;e+=Math.log2(p+1e-4)}const i=r.length/t,n=e/i;return .18/Math.pow(2,n)}const or=`
const a = ${Ze};
const b = ${Je};
const c = ${ti};
const d = ${ei};
const e = ${ii};
const f = ${ri};
const g = ${ni};
const y0 =${Ki};
const y1 =${qi};
const x0 =${Qi};
const x1 =${Zi};

const normScale = ${er};
const rcpNormScale = ${ir};
`;function en(r){return`
${or}
const logXMax = ${Se};
const logNormScale = ${rr};
${r==="log"?"fn HDRForward(y: f32) -> f32 { return log(y + 1.0) * logNormScale; }":`fn HDRForward(y: f32) -> f32 {
  if (y <= y0) { return a * y * normScale; }
  else if (y <= y1) { return (b * pow(y, c) + d) * normScale; }
  else { return (e * log(y + f) + g) * normScale; }
}`}`}function rn(r){return`
${or}
const logXMax = ${Se};
${r==="log"?"fn HDRInverse(x: f32) -> f32 { return exp(x * logXMax) - 1.0; }":`fn HDRInverse(x: f32) -> f32 {
  let y = x * rcpNormScale;
  if (y <= x0) { return y / a; }
  else if (y <= x1) { return pow((y - d) / b, 1 / c); }
  else { return exp((y - g) / e) - f; }
}`}
`}class We{x;y;width;height;constructor(t,e,i,n){this.x=t,this.y=e,this.width=i,this.height=n}}class nn{_device;_isHDR;_hdrTransfer;_inputPassAux;_inputPassColor;_outputPass;_copyPass;_isInputTexture;constructor(t,e,i="pu"){this._device=t,this._isHDR=e,this._hdrTransfer=i;const n=[{label:"inputScale",type:"f32",data:new Float32Array([1])},{label:"inputSize",type:"vec2i",data:new Int32Array(2)},{label:"outputSize",type:"vec2i",data:new Int32Array(2)},{label:"inputOffset",type:"vec2i",data:new Int32Array(2)}];this._inputPassAux=new he("inputPassAux",this._device,{inputs:["color","albedo","normal"],outputs:["color","albedo","normal"],uniforms:n,csDefine:"",csMain:""}),this._inputPassColor=new he("inputPassColor",this._device,{inputs:["color"],outputs:["color"],uniforms:n,csDefine:"",csMain:""}),this._outputPass=new he("outputPass",this._device,{inputs:["color","raw"],outputs:["color"],uniforms:[{label:"inputScale",type:"f32",data:new Float32Array([1])},{label:"inputSize",type:"vec2i",data:new Int32Array(2)},{label:"outputSize",type:"vec2i",data:new Int32Array(2)},{label:"imageSize",type:"vec2i",data:new Int32Array(2)},{label:"inputOffset",type:"vec2i",data:new Int32Array(2)},{label:"outputOffset",type:"vec2i",data:new Int32Array(2)}],csDefine:"",csMain:""}),this._copyPass=new he("copyPass",this._device,{inputs:["color"],outputs:["color"],autoUpdateOutputBuffer:!1,uniforms:[{label:"size",type:"vec2i",data:new Int32Array(2)}],csMain:`
let outIdx = i32(globalId.x + globalId.y * u32(size.x));
out_color[outIdx] = textureLoad(in_color, globalId.xy, 0);
`}),this._inputPassAux.setOutputParams({color:{channels:3},albedo:{channels:3},normal:{channels:3}}),this._inputPassColor.setOutputParams({color:{channels:3}}),this._outputPass.setOutputParams({color:{channels:4}})}_updatePasses(t,e=!1){if(this._isInputTexture!=null&&this._isInputTexture===t)return;this._isInputTexture=t;const i=this._isHDR,n=en(this._hdrTransfer)+yi;function o(s){return t?`textureLoad(in_${s}, vec2u(inputPosition), 0)`:`in_${s}[inIdx]`}const a=`
let x = i32(globalId.x);
let y = i32(globalId.y);
let inputPosition = clamp(
  vec2i(x, y) + inputOffset,
  vec2i(0),
  inputSize - vec2i(1)
);
let inIdx = inputPosition.y * inputSize.x + inputPosition.x;
let col = ${o("color")};

let outIdx = y * outputSize.x + x;

if (${e}) {
  // Denoise the inversed alpha. Or the anti aliased edge will be too dark after denoised
  out_color[outIdx] = sanitize(vec3f(1.0 - col.a), 0.0, 1.0);
}
else if (${i}) {
  let scaled = sanitize(col.rgb * inputScale, 0.0, FLT_MAX);
  out_color[outIdx] = vec3f(HDRForward(scaled.r), HDRForward(scaled.g), HDRForward(scaled.b));
}
else {
  out_color[outIdx] = sanitize(col.rgb, 0.0, 1.0);
}
`;this._inputPassAux.setCSCode({csDefine:n,csMain:`
${a}
let alb = ${o("albedo")};
let nor = ${o("normal")};
// Normals arrive [0, 1]-encoded, so OIDN's [-1, 1] clamp becomes [0, 1].
out_normal[outIdx] = sanitize(nor.rgb, 0.0, 1.0);
out_albedo[outIdx] = sanitize(alb.rgb, 0.0, 1.0);
  `}),this._inputPassColor.setCSCode({csDefine:n,csMain:`
${a}
`}),this._outputPass.setCSCode({csDefine:rn(this._hdrTransfer)+yi,csMain:`
let x = i32(globalId.x);
let y = i32(globalId.y);
if (x >= outputSize.x || y >= outputSize.y) {
  return;
}
let inIdx = (y + inputOffset.y) * inputSize.x + x + inputOffset.x;
let outIdx = (y + outputOffset.y) * imageSize.x + x + outputOffset.x;
let col = in_color[inIdx];
let raw = ${t?"textureLoad(in_raw, globalId.xy + vec2u(outputOffset), 0)":"in_raw[outIdx]"};

// The network output may contain negative values or NaNs.
let denoised = sanitize(col.rgb, 0.0, ${i&&!e?"FLT_MAX":"1.0"});
if (${e}) {
  out_color[outIdx] = vec4f(raw.rgb, 1.0 - denoised.r);
}
else if (${i}) {
  out_color[outIdx] = vec4f(
    vec3f(HDRInverse(denoised.r), HDRInverse(denoised.g), HDRInverse(denoised.b)) / inputScale,
    // Pick the alpha
    raw.a
  );
}
else {
  out_color[outIdx] = vec4f(denoised, raw.a);
}
`})}setImageSize(t,e){this._inputPassAux.setUniform("inputSize",new Int32Array([t,e])),this._inputPassColor.setUniform("inputSize",new Int32Array([t,e])),this._outputPass.setUniform("imageSize",new Int32Array([t,e])),this._outputPass.setSize(t,e),this._copyPass.setSize(t,e),this._copyPass.setUniform("size",new Int32Array([t,e]))}setInputTile(t){const e=new Int32Array([t.width,t.height]);[this._inputPassAux,this._inputPassColor].forEach(i=>{i.setUniform("inputOffset",new Int32Array([t.x,t.y])),i.setUniform("outputSize",e),i.setSize(e[0],e[1])}),this._outputPass.setUniform("inputSize",e)}setOutputTile(t,e){const i=this._outputPass,n=new Int32Array([t.width,t.height]),o=t.x-e.x,a=t.y-e.y;i.setUniform("outputSize",n),i.setUniform("inputOffset",new Int32Array([o,a])),i.setUniform("outputOffset",new Int32Array([t.x,t.y])),i.setExecuteSize(n[0],n[1])}forward(t,e,i,n){const o=t instanceof GPUTexture;this._updatePasses(o,n);const a=this._inputPassAux,s=this._inputPassColor,u=this._device.createCommandEncoder();function l(p){return p instanceof GPUTexture?{texture:p,channels:4}:{buffer:p,channels:4}}return e&&i?a.createPass(u,{color:l(t),albedo:l(e),normal:l(i)}):s.createPass(u,{color:l(t)}),this._device.queue.submit([u.finish()]),e&&i?{color:a.getOutput("color"),albedo:a.getOutput("albedo"),normal:a.getOutput("normal")}:{color:s.getOutput("color")}}inverse(t,e){const n=this._device.createCommandEncoder(),o=this._outputPass;return o.createPass(n,{color:{buffer:t,channels:4},raw:e instanceof GPUBuffer?{buffer:e,channels:4}:{texture:e,channels:4}}),this._device.queue.submit([n.finish()]),o.getOutput("color")}copyInputDataToOutput(t){const e=this._device.createCommandEncoder(),n=this._outputPass.getOutput("color"),o=this._copyPass;t instanceof GPUTexture?(o.setOutputBuffers({color:n}),o.createPass(e,{color:{texture:t,channels:4}})):e.copyBufferToBuffer(t,0,n,0,n.size),this._device.queue.submit([e.finish()])}dispose(){this._outputPass.dispose(),this._inputPassAux.dispose(),this._inputPassColor.dispose(),this._copyPass.dispose(!1)}}const on=256,an=432,un=16,sn=16,Q=16;function Rt(r,t){return Math.ceil(r/t)*t}function ar(r,t){return Math.floor(r/t)*t}function _i(r,t,e){const i=Math.round(e*r/t),n=Math.round((e+1)*r/t);return{start:i,end:n}}function fe(r,t,e,i=0){const n=t-r,o=Math.max(i,Rt(n,Q));let a=r-Math.floor((o-n)/2);return a=we(a,0,Math.max(0,e-o)),{start:a,end:a+o}}function xi(r,t,e,i){if(!Number.isInteger(r)||r<=0||!Number.isInteger(t)||t<=0)throw new Error("Tile grid dimensions must be positive integers");if(!Number.isFinite(e)||e<=0)throw new Error("Maximum tile size must be positive");if(!Number.isFinite(i)||i<0)throw new Error("Tile overlap must be non-negative");const n=Math.max(Q,ar(e,Q)),o=Rt(i,Q),a=Math.max(1,Math.ceil(r/n)),s=Math.max(1,Math.ceil(t/n)),u=[];let l=0,p=0;for(let g=0;g<s;g++){const h=_i(t,s,g);for(let y=0;y<a;y++){const $=_i(r,a,y),x={start:y===0?$.start:Math.max(0,$.start-o),end:y===a-1?$.end:Math.min(r,$.end+o)},_={start:g===0?h.start:Math.max(0,h.start-o),end:g===s-1?h.end:Math.min(t,h.end+o)},b=fe(x.start,x.end,r),m=fe(_.start,_.end,t),v={x:$.start,y:h.start,width:$.end-$.start,height:h.end-h.start},w={x:b.start,y:m.start,width:b.end-b.start,height:m.end-m.start};l=Math.max(l,v.width),p=Math.max(p,v.height),u.push({column:y,row:g,input:w,output:v})}}const c=()=>new Set(u.map(({input:g})=>`${g.width}x${g.height}`));if(c().size>2){const g=Math.max(...u.map(({input:x})=>x.width)),h=Math.max(...u.map(({input:x})=>x.height)),y=u.reduce((x,{input:_})=>x+g*_.height,0),$=u.reduce((x,{input:_})=>x+_.width*h,0);if(y<=$)for(const x of u){const _=fe(x.input.x,x.input.x+x.input.width,r,g);x.input.x=_.start,x.input.width=_.end-_.start}else for(const x of u){const _=fe(x.input.y,x.input.y+x.input.height,t,h);x.input.y=_.start,x.input.height=_.end-_.start}}const d=c(),f=u.reduce((g,{input:h})=>g+h.width*h.height,0);return{columns:a,rows:s,overlap:o,maxOutputWidth:l,maxOutputHeight:p,inputPixelCount:f,inputShapeCount:d.size,tiles:u}}function we(r,t,e){return Math.min(Math.max(r,t),e)}function cn(r,t){const e=[...r].sort((i,n)=>i-n);return e[Math.ceil(e.length*t)-1]}class ln{enabled;maxTileSize;minTileSize;targetTileTimeMs;_tileSize;_adjustmentStep;_smoothedTileTimeMs;_completeExecutionsSinceChange=0;constructor(t,e=!0){const i=typeof e=="object"?e:{};this.enabled=e!==!1,this.maxTileSize=Math.max(Q,ar(t,Q)),this.minTileSize=we(Rt(i.minTileSize??on,Q),Q,this.maxTileSize),this.targetTileTimeMs=Math.max(1,i.targetTileTimeMs??un),this._adjustmentStep=Math.max(Q,Rt(i.adjustmentStep??sn,Q)),this._tileSize=this.enabled?we(Rt(i.initialTileSize??an,Q),this.minTileSize,this.maxTileSize):this.maxTileSize}get tileSize(){return this._tileSize}observe(t){if(!this.enabled||t.length===0)return!1;const e=t.filter(a=>Number.isFinite(a)&&a>=0);if(e.length===0)return!1;const i=e.length>=3?e.slice(1):e,n=cn(i,.75);if(this._smoothedTileTimeMs=this._smoothedTileTimeMs===void 0?n:this._smoothedTileTimeMs*.65+n*.35,this._completeExecutionsSinceChange++,this._completeExecutionsSinceChange<2)return!1;let o=this._tileSize;return this._smoothedTileTimeMs>this.targetTileTimeMs*1.25?o-=this._adjustmentStep:this._smoothedTileTimeMs<this.targetTileTimeMs*.65&&(o+=this._adjustmentStep),o=we(Rt(o,Q),this.minTileSize,this.maxTileSize),o===this._tileSize?!1:(this._tileSize=o,this._smoothedTileTimeMs=void 0,this._completeExecutionsSinceChange=0,!0)}}function C(r,t){return{op:"conv2d",id:r,input:t,weight:`${r}.weight`,bias:`${r}.bias`,activation:"relu",padding:"same"}}function Tt(r,t){return{op:"maxPool2d",id:r,input:t,size:2,stride:2,padding:"same"}}function Bt(r,t){return{op:"upsample2d",id:r,input:t,scale:2,mode:"nearest"}}function It(r,t,e){return{op:"concat",id:r,inputs:[t,e],axis:"channels"}}const pn={schemaVersion:1,id:"oidn-unet-small-v1",family:"oidn-unet-small",input:"input",output:"dec_conv0",receptiveField:174,nodes:[C("enc_conv0","input"),C("enc_conv1","enc_conv0"),Tt("pool1","enc_conv1"),C("enc_conv2","pool1"),Tt("pool2","enc_conv2"),C("enc_conv3","pool2"),Tt("pool3","enc_conv3"),C("enc_conv4","pool3"),Tt("pool4","enc_conv4"),C("enc_conv5a","pool4"),C("enc_conv5b","enc_conv5a"),Bt("up4","enc_conv5b"),It("concat4","up4","pool3"),C("dec_conv4a","concat4"),C("dec_conv4b","dec_conv4a"),Bt("up3","dec_conv4b"),It("concat3","up3","pool2"),C("dec_conv3a","concat3"),C("dec_conv3b","dec_conv3a"),Bt("up2","dec_conv3b"),It("concat2","up2","pool1"),C("dec_conv2a","concat2"),C("dec_conv2b","dec_conv2a"),Bt("up1","dec_conv2b"),It("concat1","up1","input"),C("dec_conv1a","concat1"),C("dec_conv1b","dec_conv1a"),C("dec_conv0","dec_conv1b")]},dn={schemaVersion:1,id:"oidn-unet-large-v1",family:"oidn-unet-large",input:"input",output:"dec_conv1c",receptiveField:202,nodes:[C("enc_conv1a","input"),C("enc_conv1b","enc_conv1a"),Tt("pool1","enc_conv1b"),C("enc_conv2a","pool1"),C("enc_conv2b","enc_conv2a"),Tt("pool2","enc_conv2b"),C("enc_conv3a","pool2"),C("enc_conv3b","enc_conv3a"),Tt("pool3","enc_conv3b"),C("enc_conv4a","pool3"),C("enc_conv4b","enc_conv4a"),Tt("pool4","enc_conv4b"),C("enc_conv5a","pool4"),C("enc_conv5b","enc_conv5a"),Bt("up4","enc_conv5b"),It("concat4","up4","pool3"),C("dec_conv4a","concat4"),C("dec_conv4b","dec_conv4a"),Bt("up3","dec_conv4b"),It("concat3","up3","pool2"),C("dec_conv3a","concat3"),C("dec_conv3b","dec_conv3a"),Bt("up2","dec_conv3b"),It("concat2","up2","pool1"),C("dec_conv2a","concat2"),C("dec_conv2b","dec_conv2a"),Bt("up1","dec_conv2b"),It("concat1","up1","input"),C("dec_conv1a","concat1"),C("dec_conv1b","dec_conv1a"),C("dec_conv1c","dec_conv1b")]},hn=[pn,dn];function ur(r){const t=new Set;for(const e of r.nodes)e.op==="conv2d"&&(t.add(e.weight),t.add(e.bias));return t}function wi(r){return r.desc.getByteSize()}function sr(r){return[...r].sort().join(", ")}function cr(r,t=hn){const e=t.filter(i=>{const n=ur(i);return[...n].some(o=>!r.has(o))?!1:i.allowAdditionalTensors===!0||[...r.keys()].every(o=>n.has(o))});if(e.length===1)return e[0];throw e.length>1?new Error(`Ambiguous OIDN model topology: ${e.map(i=>i.id).join(", ")}`):new Error(`Unsupported OIDN model topology. TZA tensors: ${sr([...r.keys()])}`)}function vi(r,t,e){const i=r.get(t);if(!i)throw new Error(`Model ${e} is missing tensor ${t}`);if(i.data.byteLength!==wi(i))throw new Error(`Tensor ${t} has ${i.data.byteLength} bytes, expected ${wi(i)}`);return i}function fn(r,t=cr(r)){if(t.schemaVersion!==1)throw new Error(`Unsupported model descriptor schema ${t.schemaVersion}`);const e=ur(t);if(!t.allowAdditionalTensors){const c=[...r.keys()].filter(d=>!e.has(d));if(c.length>0)throw new Error(`Model ${t.id} has unexpected tensors: ${sr(c)}`)}const i=new Map,n=new Map,o=new Map,a=new Set([t.input]);let s,u;const l=(c,d)=>{const f=i.get(c);if(f===void 0)throw new Error(`Model ${t.id} node ${d} reads unknown or forward value ${c}`);return f};for(const c of t.nodes){if(a.has(c.id))throw new Error(`Model ${t.id} produces duplicate value ${c.id}`);if(c.op==="conv2d"){const d=vi(r,c.weight,t.id),f=vi(r,c.bias,t.id),g=d.desc.dims;if(d.desc.layout!=="oihw"||g.length!==4)throw new Error(`Tensor ${c.weight} must use OIHW layout`);if(g[2]!==3||g[3]!==3)throw new Error(`Tensor ${c.weight} must use a 3x3 kernel`);if(f.desc.layout!=="x"||f.desc.dims.length!==1)throw new Error(`Tensor ${c.bias} must be a one-dimensional bias`);if(f.desc.dims[0]!==g[0])throw new Error(`Tensor ${c.bias} has ${f.desc.dims[0]} channels, expected ${g[0]}`);if(d.desc.dataType!==f.desc.dataType)throw new Error(`Weight and bias dtype differ for ${c.id}`);if(u&&u!==d.desc.dataType)throw new Error(`Mixed tensor dtypes are not supported by model ${t.id}`);u=d.desc.dataType,c.input===t.input&&s===void 0&&(s=g[1],i.set(t.input,s));const h=l(c.input,c.id);if(h!==g[1])throw new Error(`Tensor ${c.weight} expects ${g[1]} input channels, but ${c.input} provides ${h}`);i.set(c.id,g[0]),n.set(c.id,{weight:d,bias:f,inputChannels:g[1],outputChannels:g[0],kernelHeight:g[2],kernelWidth:g[3]}),o.set(c.id,{inputChannels:g[1],outputChannels:g[0]})}else if(c.op==="concat"){if(c.inputs.length<2)throw new Error(`Concat ${c.id} requires at least two inputs`);const d=c.inputs.reduce((f,g)=>f+l(g,c.id),0);i.set(c.id,d)}else i.set(c.id,l(c.input,c.id));a.add(c.id)}if(s===void 0||u===void 0)throw new Error(`Model ${t.id} has no convolution reading its input`);const p=i.get(t.output);if(p===void 0)throw new Error(`Model ${t.id} output ${t.output} is not produced`);if(p!==3)throw new Error(`Model ${t.id} must produce 3 channels, got ${p}`);return{spec:t,inputChannels:s,outputChannels:p,tensorDataType:u,channelsByValue:i,convChannels:o,convTensors:n}}function gn(r){return r.op==="concat"?r.inputs:[r.input]}function mn(r){const t=new Map;for(const e of r.nodes)for(const i of gn(e)){const n=t.get(i)??[];n.push(e),t.set(i,n)}return t}function Ue(r,t,e){const i=r.get(t);if(!(i===void 0||i.length!==1||i[0].op!==e))return i[0]}function oi(r,t={}){const e=r.spec,i=mn(e),n=new Map(e.nodes.map(p=>[p.id,p])),o=new Set,a=new Map;let s=0,u=0;if(t.fuseConvPool!==!1)for(const p of e.nodes){if(p.op!=="conv2d"||p.activation!=="relu")continue;const c=Ue(i,p.id,"maxPool2d");!c||c.op!=="maxPool2d"||c.size!==2||c.stride!==2||(o.add(p.id),a.set(c.id,{op:"fusedConvReluMaxPool2d",id:c.id,input:p.input,conv:p,pool:c}),s++)}if(t.fuseUpsampleConcatConv!==!1)for(const p of e.nodes){if(p.op!=="conv2d")continue;const c=n.get(p.input);if(c?.op!=="concat"||c.inputs.length!==2||Ue(i,c.id,"conv2d")?.id!==p.id)continue;const d=r.channelsByValue.get(c.inputs[0]);if(d===void 0||d%4!==0)continue;const f=c.inputs.map(h=>{const y=n.get(h);return y?.op==="upsample2d"&&y.scale===2&&y.mode==="nearest"&&Ue(i,y.id,"concat")?.id===c.id?{value:y.input,upsample:y}:{value:h}});if(f.filter(h=>h.upsample).length===1){o.add(c.id);for(const h of c.inputs){const y=n.get(h);y?.op==="upsample2d"&&o.add(y.id)}a.set(p.id,{op:"fusedUpsampleConcatConv2d",id:p.id,inputs:f,conv:p}),u++}}const l=[];for(const p of e.nodes){const c=a.get(p.id);c?l.push(c):o.has(p.id)||l.push(p)}return{spec:e,nodes:l,fusions:{convPool:s,upsampleConcatConv:u}}}function $n(r){return r.op==="concat"?r.inputs:r.op==="fusedUpsampleConcatConv2d"?r.inputs.map(t=>t.value):[r.input]}function bi(r,t){return r.width===t.width&&r.height===t.height}function yn(r,t,e,i){if(!Number.isInteger(t)||t<=0||!Number.isInteger(e)||e<=0)throw new Error(`Invalid model input size ${t}x${e}`);const n=oi(r,i),o={width:t,height:e,channels:r.inputChannels},a=new Map([[r.spec.input,o]]),s=[],u=(c,d)=>{const f=a.get(c);if(!f)throw new Error(`Planned node ${d} reads missing value ${c}`);return f};for(const c of n.nodes){let d;if(c.op==="conv2d"){const f=u(c.input,c.id);d={width:f.width,height:f.height,channels:r.convChannels.get(c.id).outputChannels}}else if(c.op==="maxPool2d"){const f=u(c.input,c.id);d={width:Math.ceil(f.width/2),height:Math.ceil(f.height/2),channels:f.channels}}else if(c.op==="upsample2d"){const f=u(c.input,c.id);d={width:f.width*2,height:f.height*2,channels:f.channels}}else if(c.op==="concat"){const f=c.inputs.map(g=>u(g,c.id));if(f.some(g=>!bi(g,f[0])))throw new Error(`Concat ${c.id} has mismatched spatial shapes`);d={width:f[0].width,height:f[0].height,channels:f.reduce((g,h)=>g+h.channels,0)}}else if(c.op==="fusedConvReluMaxPool2d"){const f=u(c.input,c.id);d={width:Math.ceil(f.width/2),height:Math.ceil(f.height/2),channels:r.convChannels.get(c.conv.id).outputChannels}}else{const f=c.inputs.map(g=>{const h=u(g.value,c.id);return g.upsample?{...h,width:h.width*2,height:h.height*2}:h});if(f.some(g=>!bi(g,f[0])))throw new Error(`Fused decoder ${c.id} has mismatched spatial shapes`);d={width:f[0].width,height:f[0].height,channels:r.convChannels.get(c.conv.id).outputChannels}}a.set(c.id,d),s.push(d)}const l=new Map;n.nodes.forEach((c,d)=>{for(const f of $n(c))l.set(f,d)}),l.set(r.spec.output,n.nodes.length);const p=n.nodes.map((c,d)=>({node:c,outputShape:s[d],lastUse:l.get(c.id)??d}));return{...n,inputShape:o,valueShapes:a,plannedNodes:p}}const rt={MAP_READ:1,MAP_WRITE:2,COPY_SRC:4,COPY_DST:8,INDEX:16,VERTEX:32,UNIFORM:64,STORAGE:128,INDIRECT:256,QUERY_RESOLVE:512},ki={READ:1,WRITE:2},$t=8,At=$t+2,lr=9;function Ti(r,t,e=!1){const i=r==="fp16"?2:4,n=At*At*t,o=e?lr*t*4:0;return(n+o)*4*i}function _n(r){return r==="fp16"?"vec4<f16>":"vec4<f32>"}function xn(r){return r==="fp16"?`enable f16;
`:""}function wn(r,t,e){const i=n=>`${e}[weightBase + ${n}u]`;return r==="fp16"?`
        let inputValue = vec4<f16>(${t});
        var partial = vec4<f16>(0.0h);
        partial = fma(${i(0)}, vec4<f16>(inputValue.x), partial);
        partial = fma(${i(1)}, vec4<f16>(inputValue.y), partial);
        partial = fma(${i(2)}, vec4<f16>(inputValue.z), partial);
        partial = fma(${i(3)}, vec4<f16>(inputValue.w), partial);
        acc += vec4<f32>(partial);
`:`
        let inputValue = vec4<f32>(${t});
        acc = fma(vec4<f32>(${i(0)}), vec4<f32>(inputValue.x), acc);
        acc = fma(vec4<f32>(${i(1)}), vec4<f32>(inputValue.y), acc);
        acc = fma(vec4<f32>(${i(2)}), vec4<f32>(inputValue.z), acc);
        acc = fma(vec4<f32>(${i(3)}), vec4<f32>(inputValue.w), acc);
`}function vn(r,t,e,i=!1){if(!Number.isInteger(e)||e<1)throw new Error(`Final RGB shader requires positive input blocks, got ${e}`);const n=_n(r),o="vec4<f32>",a=At*At*e,s=lr*e*4,u=t==="relu"?"max(acc, vec4<f32>(0.0))":"acc",l=wn(r,"inputTile[patchBase + inputBlock]",i?"weightTile":"weights");return`${xn(r)}
struct Params {
  inputWidth: u32,
  inputHeight: u32,
  outputWidth: u32,
  outputHeight: u32,
  inputBlocks: u32,
  outputBlocks: u32,
}

@group(0) @binding(0) var<storage, read> inputData: array<${n}>;
@group(0) @binding(1) var<storage, read> weights: array<${n}>;
@group(0) @binding(2) var<storage, read> bias: array<vec4<f32>>;
@group(0) @binding(3) var<storage, read_write> outputData: array<${o}>;
@group(0) @binding(4) var<uniform> params: Params;

var<workgroup> inputTile: array<${n}, ${a}>;
${i?`var<workgroup> weightTile: array<${n}, ${s}>;`:""}

@compute @workgroup_size(${$t}, ${$t}, 1)
fn main(
  @builtin(local_invocation_id) localId: vec3<u32>,
  @builtin(global_invocation_id) gid: vec3<u32>,
  @builtin(workgroup_id) workgroupId: vec3<u32>
) {
  let localLinear = localId.y * ${$t}u + localId.x;
  for (
    var loadIndex = localLinear;
    loadIndex < ${a}u;
    loadIndex += ${$t*$t}u
  ) {
    let tilePixel = loadIndex / ${e}u;
    let inputBlock = loadIndex % ${e}u;
    let tileX = tilePixel % ${At}u;
    let tileY = tilePixel / ${At}u;
    let inputX = i32(workgroupId.x * ${$t}u + tileX) - 1;
    let inputY = i32(workgroupId.y * ${$t}u + tileY) - 1;
    var value = ${n}(0.0);
    if (
      inputX >= 0 && inputX < i32(params.inputWidth) &&
      inputY >= 0 && inputY < i32(params.inputHeight)
    ) {
      let inputIndex =
        (u32(inputY) * params.inputWidth + u32(inputX)) *
        ${e}u + inputBlock;
      value = inputData[inputIndex];
    }
    inputTile[loadIndex] = value;
  }

${i?`  for (
    var loadIndex = localLinear;
    loadIndex < ${s}u;
    loadIndex += ${$t*$t}u
  ) {
    weightTile[loadIndex] = weights[loadIndex];
  }

`:""}  // Out-of-range invocations must reach this barrier before returning.
  workgroupBarrier();

  let outputInBounds =
    gid.x < params.outputWidth &&
    gid.y < params.outputHeight &&
    gid.z < params.outputBlocks;
  if (!outputInBounds) {
    return;
  }

  var acc = bias[gid.z];
  for (var ky = 0u; ky < 3u; ky++) {
    let inputY = i32(gid.y) + i32(ky) - 1;
    if (inputY < 0 || inputY >= i32(params.inputHeight)) {
      continue;
    }
    for (var kx = 0u; kx < 3u; kx++) {
      let inputX = i32(gid.x) + i32(kx) - 1;
      if (inputX < 0 || inputX >= i32(params.inputWidth)) {
        continue;
      }
      let patchBase =
        ((localId.y + ky) * ${At}u + localId.x + kx) *
        ${e}u;
      for (var inputBlock = 0u; inputBlock < ${e}u; inputBlock++) {
        let weightBase =
          ((ky * 3u + kx) * ${e}u + inputBlock) * 4u;
        ${l}
      }
    }
  }

  let outputIndex =
    (gid.y * params.outputWidth + gid.x) * 1u + gid.z;
  outputData[outputIndex] = ${u};
}
`}class pr{_stats=new Map;track(t,e){let i=this._stats.get(t);return i||(i={created:0,destroyed:0,live:0,peakLive:0,resources:new Set},this._stats.set(t,i)),i.resources.has(e)||(i.resources.add(e),i.created++,i.live++,i.peakLive=Math.max(i.peakLive,i.live)),e}release(t,e,i){if(!e)return!1;const n=this._stats.get(t);if(!n?.resources.delete(e))return!1;try{i()}finally{n.destroyed++,n.live--}return!0}snapshot(t=0){let e=0,i=0,n=0,o=0;const a={};for(const[s,u]of this._stats){const l={created:u.created,destroyed:u.destroyed,live:u.live,peakLive:u.peakLive};a[s]=l,e+=l.live,i+=l.created,n+=l.destroyed,o+=l.peakLive}return{live:e,created:i,destroyed:n,peakLive:o,pending:t,byKind:a}}}const Bi=new WeakMap;function bn(r){let t=Bi.get(r);return t||(t=new Map,Bi.set(r,t)),t}const Z=8,dr=8,H=8,st=H+2;function ct(r){const[t,e]=r.workgroupSize;return{workgroupX:t,workgroupY:e,rowsPerThread:r.rowsPerThread,tileM:e*r.rowsPerThread,tileNBlocks:t,tileKBlocks:dr}}function vt(r){const t=ct(r),e=r.sharedLayout==="padded"||r.sharedLayout==="padded-input",i=r.sharedLayout==="padded"||r.sharedLayout==="padded-weights";return{input:t.tileM*t.tileKBlocks+(e?t.workgroupY:0),weights:t.tileKBlocks*t.tileNBlocks*(i?5:4)}}function Kt(r,t){return t.sharedLayout==="padded"||t.sharedLayout==="padded-input"?`(${r}) + (${r}) / ${t.rowsPerThread*dr}u`:r}function ai(r,t){return t.sharedLayout==="padded"||t.sharedLayout==="padded-weights"?`(${r}) + (${r}) / 4u`:r}function ui(r,t){return Math.ceil(r/t)*t}function E(r){return Math.ceil(r/4)}function kn(r,t){return r.width*r.height*E(r.channels)*4*t}let te;function hr(r){const t=r&32768?-1:1,e=r>>>10&31,i=r&1023;return e===0?t*i*2**-24:e===31?i===0?t*(1/0):NaN:t*(1+i/1024)*2**(e-15)}const Ii=new DataView(new ArrayBuffer(4));function fr(r){Ii.setFloat32(0,r);const t=Ii.getUint32(0),e=t>>>16&32768,i=t>>>23&255,n=t&8388607;if(i===255)return e|31744|(n?512:0);const o=i-127+15;if(o>=31)return e|31744;if(o<=0){if(o<-10)return e;const u=n|8388608,l=14-o,p=u>>>l,c=u&(1<<l)-1,d=1<<l-1,f=c>d||c===d&&p&1?p+1:p;return e|f}const a=o<<10|n>>>13,s=n&8191;return e|(s>4096||s===4096&&a&1?a+1:a)}function Tn(){if(!te){te=new Float32Array(65536);for(let r=0;r<te.length;r++)te[r]=hr(r)}return te}function be(r){if(r.desc.dataType==="Float32")return new Float32Array(r.data.buffer,r.data.byteOffset,r.data.byteLength/4);const t=new Uint16Array(r.data.buffer,r.data.byteOffset,r.data.byteLength/2),e=new Float32Array(t.length);if(t.length<4096)for(let i=0;i<t.length;i++)e[i]=hr(t[i]);else{const i=Tn();for(let n=0;n<t.length;n++)e[n]=i[t[n]]}return e}function se(r,t,e,i){const n=ui(e.byteLength,4),o=r.createBuffer({label:t,size:n,usage:i,mappedAtCreation:!0});return new Uint8Array(o.getMappedRange()).set(e),o.unmap(),o}function Pi(r,t,e){const i=new Uint32Array(ui(e.length,4));return i.set(e),se(r,t,new Uint8Array(i.buffer,i.byteOffset,i.byteLength),rt.UNIFORM)}function Bn(r,t,e,i,n){const o=E(e.inputChannels),a=E(e.outputChannels),s=a*e.kernelHeight*e.kernelWidth*o*4*4,u=i==="fp16"&&e.weight.desc.dataType==="Float16",l=i==="fp16"?new Uint16Array(s):void 0,p=l?void 0:new Float32Array(s),c=u?new Uint16Array(e.weight.data.buffer,e.weight.data.byteOffset,e.weight.data.byteLength/2):void 0,d=c?void 0:be(e.weight);for(let h=0;h<a;h++)for(let y=0;y<e.kernelHeight;y++)for(let $=0;$<e.kernelWidth;$++)for(let x=0;x<o;x++)for(let _=0;_<4;_++){const b=h*4+_;for(let m=0;m<4;m++){const v=x*4+m,k=(n==="k-major"?(((y*e.kernelWidth+$)*o+x)*a+h)*16:(((h*e.kernelHeight+y)*e.kernelWidth+$)*o+x)*16)+m*4+_;if(b<e.outputChannels&&v<e.inputChannels){const I=((b*e.inputChannels+v)*e.kernelHeight+y)*e.kernelWidth+$;l?l[k]=c?c[I]:fr(d[I]):p[k]=d[I]}}}const f=new Float32Array(a*4);f.set(be(e.bias));const g=se(r,`oidn/${t}/weights/${i}/${n}`,l?new Uint8Array(l.buffer):new Uint8Array(p.buffer),rt.STORAGE);try{return{weights:g,weightLayout:n,bias:se(r,`oidn/${t}/bias`,new Uint8Array(f.buffer),rt.STORAGE)}}catch(h){throw g.destroy(),h}}function D(r){return r==="fp16"?"vec4<f16>":"vec4<f32>"}function ft(r){return r==="fp16"?`enable f16;
`:""}function at(r,t){return t==="fp16"?`vec4<f16>(${r})`:r}function lt(r,t){return t==="relu"?`max(${r}, vec4<f32>(0.0))`:r}function ce(r,t,e){return e==="fp32"?`
let inputValue = vec4<f32>(${r});
let weightBase = ${t};
acc = fma(vec4<f32>(weights[weightBase]), vec4<f32>(inputValue.x), acc);
acc = fma(vec4<f32>(weights[weightBase + 1u]), vec4<f32>(inputValue.y), acc);
acc = fma(vec4<f32>(weights[weightBase + 2u]), vec4<f32>(inputValue.z), acc);
acc = fma(vec4<f32>(weights[weightBase + 3u]), vec4<f32>(inputValue.w), acc);
`:`
let inputValue = vec4<f16>(${r});
let weightBase = ${t};
var partial = vec4<f16>(0.0h);
partial = fma(weights[weightBase], vec4<f16>(inputValue.x), partial);
partial = fma(weights[weightBase + 1u], vec4<f16>(inputValue.y), partial);
partial = fma(weights[weightBase + 2u], vec4<f16>(inputValue.z), partial);
partial = fma(weights[weightBase + 3u], vec4<f16>(inputValue.w), partial);
acc += vec4<f32>(partial);
`}function In(r,t,e){const i=e==="fp16"?"vec4<f16>":"vec4<f32>",n=e==="fp16"?`var partial = vec4<f16>(0.0h);
partial = fma(subgroupBroadcast(weights[weightBase], 0u), ${i}(inputValue.x), partial);
partial = fma(subgroupBroadcast(weights[weightBase + 1u], 0u), ${i}(inputValue.y), partial);
partial = fma(subgroupBroadcast(weights[weightBase + 2u], 0u), ${i}(inputValue.z), partial);
partial = fma(subgroupBroadcast(weights[weightBase + 3u], 0u), ${i}(inputValue.w), partial);
acc += vec4<f32>(partial);`:`acc = fma(subgroupBroadcast(weights[weightBase], 0u), vec4<f32>(inputValue.x), acc);
acc = fma(subgroupBroadcast(weights[weightBase + 1u], 0u), vec4<f32>(inputValue.y), acc);
acc = fma(subgroupBroadcast(weights[weightBase + 2u], 0u), vec4<f32>(inputValue.z), acc);
acc = fma(subgroupBroadcast(weights[weightBase + 3u], 0u), vec4<f32>(inputValue.w), acc);`;return`
let inputValue = ${i}(${r});
let weightBase = ${t};
${n}
`}function Yt(r,t,e){return r==="fp16"&&(t.loadMode==="packed-all"||e&&t.loadMode==="packed-weights")}function Ot(r,t){return t?`bitcast<vec4<f16>>(${r})`:r}function si(r,t){const{rowsPerThread:e,tileNBlocks:i,tileKBlocks:n}=ct(t);if(!t.unrollRows||t.accumulationOrder==="row-major")return Pn(r,t);const o=`(tileK * ${i}u + localId.x) * ${t.sharedLayout==="padded"||t.sharedLayout==="padded-weights"?5:4}u`,a=Array.from({length:e},(u,l)=>l),s=D(r);return`
    ${r==="fp16"?a.map(u=>`var partial${u} = vec4<f16>(0.0h);`).join(`
    `):""}
    for (var tileK = 0u; tileK < ${n}u; tileK++) {
      let weightBase = ${o};
      let w0 = weightTile[weightBase];
      let w1 = weightTile[weightBase + 1u];
      let w2 = weightTile[weightBase + 2u];
      let w3 = weightTile[weightBase + 3u];
      ${a.map(u=>{const l=Kt(`(localId.y * ${e}u + ${u}u) * ${n}u + tileK`,t),p=r==="fp16"?`partial${u}`:`acc[${u}]`;return`let v${u} = inputTile[${l}];
      `+["x","y","z","w"].map((c,d)=>`${p} = fma(w${d}, ${s}(v${u}.${c}), ${p});`).join(`
      `)}).join(`
      `)}
    }
    ${r==="fp16"?a.map(u=>`acc[${u}] += vec4<f32>(partial${u});`).join(`
    `):""}
`}function Pn(r,t){const{rowsPerThread:e,tileNBlocks:i,tileKBlocks:n}=ct(t),o=Kt(`tileSpatial * ${n}u + tileK`,t),a=`(tileK * ${i}u + localId.x) * ${t.sharedLayout==="padded"||t.sharedLayout==="padded-weights"?5:4}u`;if(t.accumulationOrder==="row-major"){const s=D(r),u=r==="fp16"?"partial":"acc[row]";return`
    for (var row = 0u; row < ${e}u; row++) {
      ${r==="fp16"?"var partial = vec4<f16>(0.0h);":""}
      let tileSpatial = localId.y * ${e}u + row;
      for (var tileK = 0u; tileK < ${n}u; tileK++) {
        let weightBase = ${a};
        let inputValue = inputTile[${o}];
        ${u} = fma(weightTile[weightBase], ${s}(inputValue.x), ${u});
        ${u} = fma(weightTile[weightBase + 1u], ${s}(inputValue.y), ${u});
        ${u} = fma(weightTile[weightBase + 2u], ${s}(inputValue.z), ${u});
        ${u} = fma(weightTile[weightBase + 3u], ${s}(inputValue.w), ${u});
      }
      ${r==="fp16"?"acc[row] += vec4<f32>(partial);":""}
    }
`}return r==="fp16"?`
    var partial: array<vec4<f16>, ${e}>;
    for (var row = 0u; row < ${e}u; row++) {
      partial[row] = vec4<f16>(0.0h);
    }
    for (var tileK = 0u; tileK < ${n}u; tileK++) {
      let weightBase =
        ${a};
      for (var row = 0u; row < ${e}u; row++) {
        let tileSpatial =
          localId.y * ${e}u + row;
        let inputValue =
          inputTile[${o}];
        partial[row] = fma(
          weightTile[weightBase],
          vec4<f16>(inputValue.x),
          partial[row]
        );
        partial[row] = fma(
          weightTile[weightBase + 1u],
          vec4<f16>(inputValue.y),
          partial[row]
        );
        partial[row] = fma(
          weightTile[weightBase + 2u],
          vec4<f16>(inputValue.z),
          partial[row]
        );
        partial[row] = fma(
          weightTile[weightBase + 3u],
          vec4<f16>(inputValue.w),
          partial[row]
        );
      }
    }
    for (var row = 0u; row < ${e}u; row++) {
      acc[row] += vec4<f32>(partial[row]);
    }
`:`
    for (var tileK = 0u; tileK < ${n}u; tileK++) {
      let weightBase =
        ${a};
      for (var row = 0u; row < ${e}u; row++) {
        let tileSpatial =
          localId.y * ${e}u + row;
        let inputValue =
          inputTile[${o}];
        acc[row] = fma(
          weightTile[weightBase],
          vec4<f32>(inputValue.x),
          acc[row]
        );
        acc[row] = fma(
          weightTile[weightBase + 1u],
          vec4<f32>(inputValue.y),
          acc[row]
        );
        acc[row] = fma(
          weightTile[weightBase + 2u],
          vec4<f32>(inputValue.z),
          acc[row]
        );
        acc[row] = fma(
          weightTile[weightBase + 3u],
          vec4<f32>(inputValue.w),
          acc[row]
        );
      }
    }
`}function Cn(r,t,e,i,n){const o=D(r),a=D(r),s=D(t),u=at(lt("acc",e),t);return`${ft(r)}
struct Params {
  inputWidth: u32,
  inputHeight: u32,
  outputWidth: u32,
  outputHeight: u32,
  inputBlocks: u32,
  outputBlocks: u32,
}

@group(0) @binding(0) var<storage, read> inputData: array<${o}>;
@group(0) @binding(1) var<storage, read> weights: array<${a}>;
@group(0) @binding(2) var<storage, read> bias: array<vec4<f32>>;
@group(0) @binding(3) var<storage, read_write> outputData: array<${s}>;
@group(0) @binding(4) var<uniform> params: Params;

@compute @workgroup_size(${Z}, ${Z}, 1)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
  if (gid.x >= params.outputWidth || gid.y >= params.outputHeight || gid.z >= ${n}u) {
    return;
  }
  var acc = bias[gid.z];
  for (var ky = 0u; ky < 3u; ky++) {
    let inputY = i32(gid.y) + i32(ky) - 1;
    if (inputY < 0 || inputY >= i32(params.inputHeight)) { continue; }
    for (var kx = 0u; kx < 3u; kx++) {
      let inputX = i32(gid.x) + i32(kx) - 1;
      if (inputX < 0 || inputX >= i32(params.inputWidth)) { continue; }
      let pixelBase = (u32(inputY) * params.inputWidth + u32(inputX)) * ${i}u;
      for (var inputBlock = 0u; inputBlock < ${i}u; inputBlock++) {
        ${ce("inputData[pixelBase + inputBlock]",`((((gid.z * 3u + ky) * 3u + kx) * ${i}u + inputBlock) * 4u)`,r)}
      }
    }
  }
  let outputIndex = (gid.y * params.outputWidth + gid.x) * ${n}u + gid.z;
  outputData[outputIndex] = ${u};
}
`}function Sn(r,t,e,i,n){const o=D(r),a=D(r),s=D(t),u=at(lt("acc",e),t);return`${ft(r)}
enable subgroups;
struct Params {
  inputWidth: u32,
  inputHeight: u32,
  outputWidth: u32,
  outputHeight: u32,
  inputBlocks: u32,
  outputBlocks: u32,
}
@group(0) @binding(0) var<storage, read> inputData: array<${o}>;
@group(0) @binding(1) var<storage, read> weights: array<${a}>;
@group(0) @binding(2) var<storage, read> bias: array<vec4<f32>>;
@group(0) @binding(3) var<storage, read_write> outputData: array<${s}>;
@group(0) @binding(4) var<uniform> params: Params;

@compute @workgroup_size(${Z}, ${Z}, 1)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
  let outputInBounds =
    gid.x < params.outputWidth && gid.y < params.outputHeight;
  var acc = bias[gid.z];
  for (var ky = 0u; ky < 3u; ky++) {
    let inputY = i32(gid.y) + i32(ky) - 1;
    let clampedY = u32(clamp(inputY, 0, i32(params.inputHeight) - 1));
    for (var kx = 0u; kx < 3u; kx++) {
      let inputX = i32(gid.x) + i32(kx) - 1;
      let clampedX = u32(clamp(inputX, 0, i32(params.inputWidth) - 1));
      let inputInBounds =
        outputInBounds && inputX >= 0 && inputY >= 0 &&
        inputX < i32(params.inputWidth) && inputY < i32(params.inputHeight);
      let pixelBase =
        (clampedY * params.inputWidth + clampedX) * ${i}u;
      for (var inputBlock = 0u; inputBlock < ${i}u; inputBlock++) {
        ${In(`select(${o}(0.0), inputData[pixelBase + inputBlock], inputInBounds)`,`((((gid.z * 3u + ky) * 3u + kx) * ${i}u + inputBlock) * 4u)`,r)}
      }
    }
  }
  if (outputInBounds) {
    let outputIndex =
      (gid.y * params.outputWidth + gid.x) * ${n}u + gid.z;
    outputData[outputIndex] = ${u};
  }
}
`}function Mn(r,t,e,i,n){const o=D(r),a=D(t),s=at(lt("acc",e),t),u=st*st*i,l=H*H;return`${ft(r)}
struct Params {
  inputWidth: u32,
  inputHeight: u32,
  outputWidth: u32,
  outputHeight: u32,
  inputBlocks: u32,
  outputBlocks: u32,
}
@group(0) @binding(0) var<storage, read> inputData: array<${o}>;
@group(0) @binding(1) var<storage, read> weights: array<${o}>;
@group(0) @binding(2) var<storage, read> bias: array<vec4<f32>>;
@group(0) @binding(3) var<storage, read_write> outputData: array<${a}>;
@group(0) @binding(4) var<uniform> params: Params;

var<workgroup> inputPatch: array<${o}, ${u}>;

@compute @workgroup_size(${H}, ${H}, 1)
fn main(
  @builtin(local_invocation_id) localId: vec3<u32>,
  @builtin(workgroup_id) workgroupId: vec3<u32>
) {
  let localLinear =
    localId.y * ${H}u + localId.x;
  for (
    var loadIndex = localLinear;
    loadIndex < ${u}u;
    loadIndex += ${l}u
  ) {
    let patchPixel = loadIndex / ${i}u;
    let inputBlock = loadIndex % ${i}u;
    let patchX = patchPixel % ${st}u;
    let patchY = patchPixel / ${st}u;
    let inputX =
      i32(workgroupId.x * ${H}u + patchX) - 1;
    let inputY =
      i32(workgroupId.y * ${H}u + patchY) - 1;
    var value = ${o}(0.0);
    if (
      inputX >= 0 && inputX < i32(params.inputWidth) &&
      inputY >= 0 && inputY < i32(params.inputHeight)
    ) {
      let inputIndex =
        (u32(inputY) * params.inputWidth + u32(inputX)) *
        ${i}u + inputBlock;
      value = inputData[inputIndex];
    }
    inputPatch[loadIndex] = value;
  }
  workgroupBarrier();

  let outputX =
    workgroupId.x * ${H}u + localId.x;
  let outputY =
    workgroupId.y * ${H}u + localId.y;
  let outputBlock = workgroupId.z;
  if (
    outputX >= params.outputWidth || outputY >= params.outputHeight ||
    outputBlock >= ${n}u
  ) {
    return;
  }

  var acc = bias[outputBlock];
  for (var ky = 0u; ky < 3u; ky++) {
    for (var kx = 0u; kx < 3u; kx++) {
      let patchBase =
        ((localId.y + ky) * ${st}u + localId.x + kx) *
        ${i}u;
      for (var inputBlock = 0u; inputBlock < ${i}u; inputBlock++) {
        ${ce("inputPatch[patchBase + inputBlock]",`((((outputBlock * 3u + ky) * 3u + kx) * ${i}u + inputBlock) * 4u)`,r)}
      }
    }
  }
  let outputIndex =
    (outputY * params.outputWidth + outputX) * ${n}u + outputBlock;
  outputData[outputIndex] = ${s};
}
`}function gr(r,t,e,i){const{workgroupX:n,workgroupY:o,tileM:a,tileKBlocks:s}=ct(e),u=t?"params.outputWidth":"params.inputWidth",l=t?"params.outputHeight":"params.inputHeight",p=e.addressMode==="base-offset",c=i?i.blocks.map((f,g)=>`cachedBase${g}[load] = (${g===i.upsampled?"y / 2u":"y"} * params.source${g}Width + ${g===i.upsampled?"x / 2u":"x"}) * ${f}u;`).join(`
    `):`cachedBase0[load] = (y * params.inputWidth + x) * ${r}u;`,d=a*s/(n*o);return`
  ${p?`var cachedBase0: array<u32, ${d}>;
  ${i?`var cachedBase1: array<u32, ${d}>;`:""}`:`var cachedX: array<u32, ${d}>;
  var cachedY: array<u32, ${d}>;`}
  var cachedMask: array<u32, ${d}>;
  for (var load = 0u; load < ${d}u; load++) {
    let loadIndex = localLinear + load * ${n*o}u;
    let spatial = workgroupId.x * ${a}u + loadIndex / ${s}u;
    let x = spatial % params.outputWidth;
    let y = spatial / params.outputWidth;
    ${p?c:`cachedX[load] = x;
    cachedY[load] = y;`}
    let columns =
      select(0u, 0x049u, x > 0u && x - 1u < ${u}) |
      select(0u, 0x092u, x < ${u}) |
      select(0u, 0x124u, x + 1u < ${u});
    let rows =
      select(0u, 0x007u, y > 0u && y - 1u < ${l}) |
      select(0u, 0x038u, y < ${l}) |
      select(0u, 0x1c0u, y + 1u < ${l});
    cachedMask[load] = select(0u, columns & rows, spatial < spatialCount)${p&&i?" | ((x & 1u) << 9u) | ((y & 1u) << 10u)":""};
  }
  var channelBlock = (localLinear % ${s}u) % ${r}u;
  var filterPosition = (localLinear % ${s}u) / ${r}u;
`}function mr(r,t){const{tileKBlocks:e}=ct(t);return`
    channelBlock += ${e%r}u;
    let carry = channelBlock >= ${r}u;
    channelBlock -= select(0u, ${r}u, carry);
    filterPosition += ${Math.floor(e/r)}u + select(0u, 1u, carry);
`}function ve(r,t,e){const{workgroupX:i,workgroupY:n,tileM:o,tileKBlocks:a}=ct(e);return`
    let inputBlock = channelBlock;
    let kernelY = filterPosition / 3u;
    let kernelX = filterPosition % 3u;
    for (var load = 0u; load < ${o*a/(i*n)}u; load++) {
      let loadIndex = localLinear + load * ${i*n}u;
      var value = ${r}(0.0);
      if (filterPosition < 9u && (cachedMask[load] & (1u << filterPosition)) != 0u) {
        ${e.addressMode==="base-offset"?"":`let inputX = i32(cachedX[load]) + i32(kernelX) - 1;
        let inputY = i32(cachedY[load]) + i32(kernelY) - 1;`}
        ${t}
      }
      inputTile[${Kt("loadIndex",e)}] = value;
    }
`}function En(r,t,e,i,n,o){const{workgroupX:a,workgroupY:s,rowsPerThread:u,tileM:l,tileNBlocks:p,tileKBlocks:c}=ct(o),{addressMode:d,weightLayout:f}=o,g=D(r),h=D(t),y=Yt(r,o,!1),$=Yt(r,o,!0),x=y?"vec2<u32>":g,_=$?"vec2<u32>":g,b=at(lt("acc",e),t),m=a*s,v=l*c,w=c*p*4;return`${ft(r)}
struct Params {
  inputWidth: u32,
  inputHeight: u32,
  outputWidth: u32,
  outputHeight: u32,
  inputBlocks: u32,
  outputBlocks: u32,
}
@group(0) @binding(0) var<storage, read> inputData: array<${x}>;
@group(0) @binding(1) var<storage, read> weights: array<${_}>;
@group(0) @binding(2) var<storage, read> bias: array<vec4<f32>>;
@group(0) @binding(3) var<storage, read_write> outputData: array<${h}>;
@group(0) @binding(4) var<uniform> params: Params;

var<workgroup> inputTile: array<${g}, ${vt(o).input}>;
var<workgroup> weightTile: array<${g}, ${vt(o).weights}>;

@compute @workgroup_size(${a}, ${s}, 1)
fn main(
  @builtin(local_invocation_id) localId: vec3<u32>,
  @builtin(workgroup_id) workgroupId: vec3<u32>
) {
  let spatialBase =
    workgroupId.x * ${l}u +
    localId.y * ${u}u;
  let outputBlock =
    workgroupId.y * ${p}u + localId.x;
  let spatialCount = params.outputWidth * params.outputHeight;
  var acc: array<vec4<f32>, ${u}>;
  if (outputBlock < ${n}u) {
    for (var row = 0u; row < ${u}u; row++) {
      acc[row] = bias[outputBlock];
    }
  }

  let localLinear =
    localId.y * ${a}u + localId.x;
  ${d!=="analytic"?gr(i,!1,o):""}
  let totalK = ${i*9}u;
  for (var kBase = 0u; kBase < totalK; kBase += ${c}u) {
    ${d!=="analytic"?ve(g,`
        ${d==="base-offset"?`let offset = (i32(kernelY) - 1) * i32(params.inputWidth) + i32(kernelX) - 1;
        let inputIndex = cachedBase0[load] + u32(offset * ${i}) + inputBlock;`:`let inputIndex = (u32(inputY) * params.inputWidth + u32(inputX)) *
          ${i}u + inputBlock;`}
        value = ${Ot("inputData[inputIndex]",y)};
    `,o):`
    for (
      var loadIndex = localLinear;
      loadIndex < ${v}u;
      loadIndex += ${m}u
    ) {
      let tileSpatial = loadIndex / ${c}u;
      let tileK = loadIndex % ${c}u;
      let inputSpatialIndex =
        workgroupId.x * ${l}u + tileSpatial;
      let kIndex = kBase + tileK;
      var value = ${g}(0.0);
      if (inputSpatialIndex < spatialCount && kIndex < totalK) {
        let outputY = inputSpatialIndex / params.outputWidth;
        let outputX = inputSpatialIndex % params.outputWidth;
        let inputBlock = kIndex % ${i}u;
        let kernelIndex = kIndex / ${i}u;
        let kernelY = kernelIndex / 3u;
        let kernelX = kernelIndex % 3u;
        let inputY = i32(outputY) + i32(kernelY) - 1;
        let inputX = i32(outputX) + i32(kernelX) - 1;
        if (
          inputY >= 0 && inputY < i32(params.inputHeight) &&
          inputX >= 0 && inputX < i32(params.inputWidth)
        ) {
          let inputIndex =
            (u32(inputY) * params.inputWidth + u32(inputX)) *
            ${i}u + inputBlock;
          value = ${Ot("inputData[inputIndex]",y)};
        }
      }
      inputTile[${Kt("loadIndex",o)}] = value;
    }
    `}

    for (
      var loadIndex = localLinear;
      loadIndex < ${w}u;
      loadIndex += ${m}u
    ) {
      let tileK = loadIndex / ${p*4}u;
      let outputRemainder = loadIndex % ${p*4}u;
      let tileOutputBlock = outputRemainder / 4u;
      let outputLane = outputRemainder % 4u;
      let loadedOutputBlock =
        workgroupId.y * ${p}u + tileOutputBlock;
      let kIndex = kBase + tileK;
      var value = ${g}(0.0);
      if (loadedOutputBlock < ${n}u && kIndex < totalK) {
        ${f==="k-major"?`
        let weightIndex = (kIndex * ${n}u + loadedOutputBlock) * 4u + outputLane;
        `:d!=="analytic"?`
        let weightIndex = (loadedOutputBlock * ${i*9}u + kIndex) * 4u + outputLane;
        `:`
        let inputBlock = kIndex % ${i}u;
        let kernelIndex = kIndex / ${i}u;
        let kernelY = kernelIndex / 3u;
        let kernelX = kernelIndex % 3u;
        let weightIndex =
          ((((loadedOutputBlock * 3u + kernelY) * 3u + kernelX) *
            ${i}u + inputBlock) * 4u + outputLane);
        `}
        value = ${Ot("weights[weightIndex]",$)};
      }
      weightTile[${ai("loadIndex",o)}] = value;
    }

    workgroupBarrier();
    ${si(r,o)}
    workgroupBarrier();
    ${d!=="analytic"?mr(i,o):""}
  }

  if (outputBlock < ${n}u) {
    for (var row = 0u; row < ${u}u; row++) {
      let spatialIndex = spatialBase + row;
      if (spatialIndex < spatialCount) {
        let outputIndex = spatialIndex * ${n}u + outputBlock;
        outputData[outputIndex] = ${b.replaceAll("acc","acc[row]")};
      }
    }
  }
}
`}function An(r,t,e,i){const n=D(r),o=lt("acc",t);return`${ft(r)}
struct Params {
  inputWidth: u32,
  inputHeight: u32,
  outputWidth: u32,
  outputHeight: u32,
  inputBlocks: u32,
  outputBlocks: u32,
}
@group(0) @binding(0) var<storage, read> inputData: array<${n}>;
@group(0) @binding(1) var<storage, read> weights: array<${n}>;
@group(0) @binding(2) var<storage, read> bias: array<vec4<f32>>;
@group(0) @binding(3) var<storage, read_write> outputData: array<${n}>;
@group(0) @binding(4) var<uniform> params: Params;

@compute @workgroup_size(${Z}, ${Z}, 1)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
  if (gid.x >= params.outputWidth || gid.y >= params.outputHeight || gid.z >= ${i}u) {
    return;
  }
  var pooled = vec4<f32>(-3.402823466e+38);
  for (var py = 0u; py < 2u; py++) {
    let centerY = gid.y * 2u + py;
    if (centerY >= params.inputHeight) { continue; }
    for (var px = 0u; px < 2u; px++) {
      let centerX = gid.x * 2u + px;
      if (centerX >= params.inputWidth) { continue; }
      var acc = bias[gid.z];
      for (var ky = 0u; ky < 3u; ky++) {
        let inputY = i32(centerY) + i32(ky) - 1;
        if (inputY < 0 || inputY >= i32(params.inputHeight)) { continue; }
        for (var kx = 0u; kx < 3u; kx++) {
          let inputX = i32(centerX) + i32(kx) - 1;
          if (inputX < 0 || inputX >= i32(params.inputWidth)) { continue; }
          let pixelBase = (u32(inputY) * params.inputWidth + u32(inputX)) * ${e}u;
          for (var inputBlock = 0u; inputBlock < ${e}u; inputBlock++) {
            ${ce("inputData[pixelBase + inputBlock]",`((((gid.z * 3u + ky) * 3u + kx) * ${e}u + inputBlock) * 4u)`,r)}
          }
        }
      }
      pooled = max(pooled, ${o});
    }
  }
  let outputIndex = (gid.y * params.outputWidth + gid.x) * ${i}u + gid.z;
  outputData[outputIndex] = ${at("pooled",r)};
}
`}function On(r,t,e){const i=D(r);return`${ft(r)}
struct Params {
  inputWidth: u32,
  inputHeight: u32,
  outputWidth: u32,
  outputHeight: u32,
  outputBlocks: u32,
}
@group(0) @binding(0) var<storage, read> inputData: array<${i}>;
@group(0) @binding(1) var<storage, read_write> outputData: array<${i}>;
@group(0) @binding(2) var<uniform> params: Params;

@compute @workgroup_size(${Z}, ${Z}, 1)
fn main(
  @builtin(global_invocation_id) gid: vec3<u32>${e?`,
  @builtin(num_workgroups) groupCount: vec3<u32>`:""}
) {
  ${e?`let linearX = gid.x + gid.z * groupCount.x * ${Z}u;
  let outputBlock = linearX % ${t}u;
  let outputX = linearX / ${t}u;`:`let outputBlock = gid.z;
  let outputX = gid.x;`}
  if (
    outputX >= params.outputWidth ||
    gid.y >= params.outputHeight ||
    outputBlock >= ${t}u
  ) {
    return;
  }
  var pooled = vec4<f32>(-3.402823466e+38);
  for (var py = 0u; py < 2u; py++) {
    let inputY = gid.y * 2u + py;
    if (inputY >= params.inputHeight) { continue; }
    for (var px = 0u; px < 2u; px++) {
      let inputX = outputX * 2u + px;
      if (inputX >= params.inputWidth) { continue; }
      let inputIndex =
        (inputY * params.inputWidth + inputX) * ${t}u + outputBlock;
      pooled = max(pooled, vec4<f32>(inputData[inputIndex]));
    }
  }
  let outputIndex =
    (gid.y * params.outputWidth + outputX) * ${t}u + outputBlock;
  outputData[outputIndex] = ${at("pooled",r)};
}
`}function Nn(r,t,e,i,n,o,a){const{workgroupX:s,workgroupY:u,rowsPerThread:l,tileM:p,tileNBlocks:c,tileKBlocks:d}=ct(a),{addressMode:f,weightLayout:g}=a,h=D(r),y=D(t),$=Yt(r,a,!1),x=Yt(r,a,!0),_=$?"vec2<u32>":h,b=x?"vec2<u32>":h,m=i[0]+i[1],v=at(lt("acc[row]",e),t),w=s*u,k=p*d,I=d*c*4,P=(T,W)=>`
          {
            let sourceBlock = ${W};
            ${f==="base-offset"?`let dx = ${T===n?"(i32((cachedMask[load] >> 9u) & 1u) + i32(kernelX) - 1) >> 1u":"i32(kernelX) - 1"};
            let dy = ${T===n?"(i32((cachedMask[load] >> 10u) & 1u) + i32(kernelY) - 1) >> 1u":"i32(kernelY) - 1"};
            let offset = (dy * i32(params.source${T}Width) + dx) * ${i[T]};
            let sourceIndex = cachedBase${T}[load] + u32(offset) + sourceBlock;`:`let sourceX = ${T===n?"u32(inputX) / 2u":"u32(inputX)"};
            let sourceY = ${T===n?"u32(inputY) / 2u":"u32(inputY)"};
            let sourceIndex =
              (sourceY * params.source${T}Width + sourceX) *
              ${i[T]}u + sourceBlock;`}
            value = ${Ot(`input${T}[sourceIndex]`,$)};
          }`;return`${ft(r)}
struct Params {
  outputWidth: u32,
  outputHeight: u32,
  outputBlocks: u32,
  inputBlocks: u32,
  source0Width: u32,
  source0Height: u32,
  source1Width: u32,
  source1Height: u32,
}
@group(0) @binding(0) var<storage, read> input0: array<${_}>;
@group(0) @binding(1) var<storage, read> input1: array<${_}>;
@group(0) @binding(2) var<storage, read> weights: array<${b}>;
@group(0) @binding(3) var<storage, read> bias: array<vec4<f32>>;
@group(0) @binding(4) var<storage, read_write> outputData: array<${y}>;
@group(0) @binding(5) var<uniform> params: Params;

var<workgroup> inputTile: array<${h}, ${vt(a).input}>;
var<workgroup> weightTile: array<${h}, ${vt(a).weights}>;

@compute @workgroup_size(${s}, ${u}, 1)
fn main(
  @builtin(local_invocation_id) localId: vec3<u32>,
  @builtin(workgroup_id) workgroupId: vec3<u32>
) {
  let spatialBase =
    workgroupId.x * ${p}u +
    localId.y * ${l}u;
  let outputBlock =
    workgroupId.y * ${c}u + localId.x;
  let spatialCount = params.outputWidth * params.outputHeight;
  var acc: array<vec4<f32>, ${l}>;
  if (outputBlock < ${o}u) {
    for (var row = 0u; row < ${l}u; row++) {
      acc[row] = bias[outputBlock];
    }
  }

  let localLinear =
    localId.y * ${s}u + localId.x;
  ${f!=="analytic"?gr(m,!0,a,{blocks:i,upsampled:n}):""}
  let totalK = ${m*9}u;
  for (var kBase = 0u; kBase < totalK; kBase += ${d}u) {
    ${f!=="analytic"?a.decoderLoad==="source-first"?`
    if (channelBlock < ${i[0]}u) {
      ${ve(h,P(0,"inputBlock"),a)}
    } else {
      ${ve(h,P(1,`inputBlock - ${i[0]}u`),a)}
    }
    `:ve(h,`
        if (inputBlock < ${i[0]}u) {
          ${P(0,"inputBlock")}
        } else {
          ${P(1,`inputBlock - ${i[0]}u`)}
        }
    `,a):`
    for (
      var loadIndex = localLinear;
      loadIndex < ${k}u;
      loadIndex += ${w}u
    ) {
      let tileSpatial = loadIndex / ${d}u;
      let tileK = loadIndex % ${d}u;
      let outputSpatialIndex =
        workgroupId.x * ${p}u + tileSpatial;
      let kIndex = kBase + tileK;
      var value = ${h}(0.0);
      if (outputSpatialIndex < spatialCount && kIndex < totalK) {
        let outputY = outputSpatialIndex / params.outputWidth;
        let outputX = outputSpatialIndex % params.outputWidth;
        let inputBlock = kIndex % ${m}u;
        let kernelIndex = kIndex / ${m}u;
        let kernelY = kernelIndex / 3u;
        let kernelX = kernelIndex % 3u;
        let inputY = i32(outputY) + i32(kernelY) - 1;
        let inputX = i32(outputX) + i32(kernelX) - 1;
        if (
          inputY >= 0 && inputY < i32(params.outputHeight) &&
          inputX >= 0 && inputX < i32(params.outputWidth)
        ) {
          if (inputBlock < ${i[0]}u) {
            ${P(0,"inputBlock")}
          } else {
            ${P(1,`inputBlock - ${i[0]}u`)}
          }
        }
      }
      inputTile[${Kt("loadIndex",a)}] = value;
    }
    `}

    for (
      var loadIndex = localLinear;
      loadIndex < ${I}u;
      loadIndex += ${w}u
    ) {
      let tileK = loadIndex / ${c*4}u;
      let outputRemainder = loadIndex % ${c*4}u;
      let tileOutputBlock = outputRemainder / 4u;
      let outputLane = outputRemainder % 4u;
      let loadedOutputBlock =
        workgroupId.y * ${c}u + tileOutputBlock;
      let kIndex = kBase + tileK;
      var value = ${h}(0.0);
      if (loadedOutputBlock < ${o}u && kIndex < totalK) {
        ${g==="k-major"?`
        let weightIndex = (kIndex * ${o}u + loadedOutputBlock) * 4u + outputLane;
        `:f!=="analytic"?`
        let weightIndex = (loadedOutputBlock * ${m*9}u + kIndex) * 4u + outputLane;
        `:`
        let inputBlock = kIndex % ${m}u;
        let kernelIndex = kIndex / ${m}u;
        let kernelY = kernelIndex / 3u;
        let kernelX = kernelIndex % 3u;
        let weightIndex =
          ((((loadedOutputBlock * 3u + kernelY) * 3u + kernelX) *
            ${m}u + inputBlock) * 4u + outputLane);
        `}
        value = ${Ot("weights[weightIndex]",x)};
      }
      weightTile[${ai("loadIndex",a)}] = value;
    }

    workgroupBarrier();
    ${si(r,a)}
    workgroupBarrier();
    ${f!=="analytic"?mr(m,a):""}
  }

  if (outputBlock < ${o}u) {
    for (var row = 0u; row < ${l}u; row++) {
      let spatialIndex = spatialBase + row;
      if (spatialIndex < spatialCount) {
        let outputIndex = spatialIndex * ${o}u + outputBlock;
        outputData[outputIndex] = ${v};
      }
    }
  }
}
`}function zn(r,t,e,i,n,o,a){const s=ct(a),{workgroupX:u,workgroupY:l,rowsPerThread:p,tileM:c,tileNBlocks:d,tileKBlocks:f}=s,g=u*l,h=c*f/g,y=D(r),$=Yt(r,a,!1),x=Yt(r,a,!0),_=i[n],b=1-n;i[b];const m=(w,k)=>{const I=i[w],P=k?4:9,T=k?`phase * ${4*_*o*4}u`:`${oe*_*o*4}u`,W=k?`(i32(tap / 2u) + i32(phaseY) - 1) * i32(params.source${w}Width) + i32(tap % 2u) + i32(phaseX) - 1`:`(i32(tap / 3u) - 1) * i32(params.source${w}Width) + i32(tap % 3u) - 1`;return`
  for (var kBase = 0u; kBase < ${P*I}u; kBase += ${f}u) {
    let inputK = kBase + localLinear % ${f}u;
    let tap = inputK / ${I}u;
    let channel = inputK % ${I}u;
    for (var load = 0u; load < ${h}u; load++) {
      let i = localLinear + load * ${g}u;
      var value = ${y}(0.0);
      if (tap < ${P}u && (mask${w}[load] & (1u << tap)) != 0u) {
        let offset = ${W};
        let index = u32(base${w}[load] + offset) * ${I}u + channel;
        value = ${Ot(`input${w}[index]`,$)};
      }
      inputTile[${Kt("i",a)}] = value;
    }
    for (var i = localLinear; i < ${f*d*4}u; i += ${g}u) {
      let k = kBase + i / ${d*4}u;
      let outputBlock = workgroupId.y * ${d}u + (i % ${d*4}u) / 4u;
      var value = ${y}(0.0);
      if (k < ${P*I}u && outputBlock < ${o}u) {
        let index = ${T} + (k * ${o}u + outputBlock) * 4u + i % 4u;
        value = ${Ot("weights[index]",x)};
      }
      weightTile[${ai("i",a)}] = value;
    }
    workgroupBarrier();
    ${si(r,a)}
    workgroupBarrier();
  }`},v=(w,k)=>{const I=k?4:9,P=k?2:3;return`
    let x${w} = i32(${k?"x":"x * 2u + phaseX"});
    let y${w} = i32(${k?"y":"y * 2u + phaseY"});
    base${w}[load] = y${w} * i32(params.source${w}Width) + x${w};
    var bits${w} = 0u;
    for (var tap = 0u; tap < ${I}u; tap++) {
      let sx = x${w} + i32(tap % ${P}u) ${k?"+ i32(phaseX)":""} - 1;
      let sy = y${w} + i32(tap / ${P}u) ${k?"+ i32(phaseY)":""} - 1;
      if (valid && sx >= 0 && sy >= 0 && sx < i32(params.source${w}Width) && sy < i32(params.source${w}Height)) {
        bits${w} |= 1u << tap;
      }
    }
    mask${w}[load] = bits${w};`};return`${ft(r)}
struct Params {
  outputWidth: u32, outputHeight: u32, outputBlocks: u32, inputBlocks: u32,
  source0Width: u32, source0Height: u32, source1Width: u32, source1Height: u32,
}
@group(0) @binding(0) var<storage, read> input0: array<${$?"vec2<u32>":y}>;
@group(0) @binding(1) var<storage, read> input1: array<${$?"vec2<u32>":y}>;
@group(0) @binding(2) var<storage, read> weights: array<${x?"vec2<u32>":y}>;
@group(0) @binding(3) var<storage, read> bias: array<vec4<f32>>;
@group(0) @binding(4) var<storage, read_write> outputData: array<${D(t)}>;
@group(0) @binding(5) var<uniform> params: Params;
var<workgroup> inputTile: array<${y}, ${vt(a).input}>;
var<workgroup> weightTile: array<${y}, ${vt(a).weights}>;

@compute @workgroup_size(${u}, ${l}, 1)
fn main(@builtin(local_invocation_id) localId: vec3<u32>, @builtin(workgroup_id) workgroupId: vec3<u32>) {
  let phase = workgroupId.z;
  let phaseX = phase & 1u;
  let phaseY = phase >> 1u;
  let phaseWidth = (params.outputWidth + 1u) / 2u;
  let localLinear = localId.y * ${u}u + localId.x;
  let outputBlock = workgroupId.y * ${d}u + localId.x;
  var acc: array<vec4<f32>, ${p}>;
  if (outputBlock < ${o}u) {
    for (var row = 0u; row < ${p}u; row++) { acc[row] = bias[outputBlock]; }
  }
  var base0: array<i32, ${h}>;
  var base1: array<i32, ${h}>;
  var mask0: array<u32, ${h}>;
  var mask1: array<u32, ${h}>;
  for (var load = 0u; load < ${h}u; load++) {
    let spatial = workgroupId.x * ${c}u + (localLinear + load * ${g}u) / ${f}u;
    let x = spatial % phaseWidth;
    let y = spatial / phaseWidth;
    let valid = x * 2u + phaseX < params.outputWidth && y * 2u + phaseY < params.outputHeight;
    ${v(n,!0)}
    ${v(b,!1)}
  }
  ${m(n,!0)}
  ${m(b,!1)}
  if (outputBlock < ${o}u) {
    for (var row = 0u; row < ${p}u; row++) {
      let spatial = workgroupId.x * ${c}u + localId.y * ${p}u + row;
      let x = (spatial % phaseWidth) * 2u + phaseX;
      let y = (spatial / phaseWidth) * 2u + phaseY;
      if (x < params.outputWidth && y < params.outputHeight) {
        outputData[(y * params.outputWidth + x) * ${o}u + outputBlock] = ${at(lt("acc[row]",e),t)};
      }
    }
  }
}
`}function Wn(r,t,e,i,n,o){const a=D(r),s=D(t),u=i[0]+i[1],l=(c,d)=>{const f=c===n;return`
      {
        let sourceX = ${f?"u32(inputX) / 2u":"u32(inputX)"};
        let sourceY = ${f?"u32(inputY) / 2u":"u32(inputY)"};
        let sourcePixelBase = (sourceY * params.source${c}Width + sourceX) * ${i[c]}u;
        for (var sourceBlock = 0u; sourceBlock < ${i[c]}u; sourceBlock++) {
          let inputBlock = ${d}u + sourceBlock;
          ${ce(`input${c}[sourcePixelBase + sourceBlock]`,`((((gid.z * 3u + ky) * 3u + kx) * ${u}u + inputBlock) * 4u)`,r)}
        }
      }
`},p=at(lt("acc",e),t);return`${ft(r)}
struct Params {
  outputWidth: u32,
  outputHeight: u32,
  outputBlocks: u32,
  inputBlocks: u32,
  source0Width: u32,
  source0Height: u32,
  source1Width: u32,
  source1Height: u32,
}
@group(0) @binding(0) var<storage, read> input0: array<${a}>;
@group(0) @binding(1) var<storage, read> input1: array<${a}>;
@group(0) @binding(2) var<storage, read> weights: array<${a}>;
@group(0) @binding(3) var<storage, read> bias: array<vec4<f32>>;
@group(0) @binding(4) var<storage, read_write> outputData: array<${s}>;
@group(0) @binding(5) var<uniform> params: Params;

@compute @workgroup_size(${Z}, ${Z}, 1)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
  if (gid.x >= params.outputWidth || gid.y >= params.outputHeight || gid.z >= ${o}u) {
    return;
  }
  var acc = bias[gid.z];
  for (var ky = 0u; ky < 3u; ky++) {
    let inputY = i32(gid.y) + i32(ky) - 1;
    if (inputY < 0 || inputY >= i32(params.outputHeight)) { continue; }
    for (var kx = 0u; kx < 3u; kx++) {
      let inputX = i32(gid.x) + i32(kx) - 1;
      if (inputX < 0 || inputX >= i32(params.outputWidth)) { continue; }
      ${l(0,0)}
      ${l(1,i[0])}
    }
  }
  let outputIndex = (gid.y * params.outputWidth + gid.x) * ${o}u + gid.z;
  outputData[outputIndex] = ${p};
}
`}function Un(r,t,e,i,n,o){const a=D(r),s=D(t),u=i[0]+i[1],l=st*st*u,p=H*H,c=at(lt("acc",e),t),d=(f,g)=>`
      let sourceBlock = ${g};
      let sourceIndex =
        (${f===n?"u32(inputY) / 2u":"u32(inputY)"} * params.source${f}Width + ${f===n?"u32(inputX) / 2u":"u32(inputX)"}) *
        ${i[f]}u + sourceBlock;
      value = input${f}[sourceIndex];`;return`${ft(r)}
struct Params {
  outputWidth: u32,
  outputHeight: u32,
  outputBlocks: u32,
  inputBlocks: u32,
  source0Width: u32,
  source0Height: u32,
  source1Width: u32,
  source1Height: u32,
}
@group(0) @binding(0) var<storage, read> input0: array<${a}>;
@group(0) @binding(1) var<storage, read> input1: array<${a}>;
@group(0) @binding(2) var<storage, read> weights: array<${a}>;
@group(0) @binding(3) var<storage, read> bias: array<vec4<f32>>;
@group(0) @binding(4) var<storage, read_write> outputData: array<${s}>;
@group(0) @binding(5) var<uniform> params: Params;

var<workgroup> inputPatch: array<${a}, ${l}>;

@compute @workgroup_size(${H}, ${H}, 1)
fn main(
  @builtin(local_invocation_id) localId: vec3<u32>,
  @builtin(workgroup_id) workgroupId: vec3<u32>
) {
  let localLinear =
    localId.y * ${H}u + localId.x;
  for (
    var loadIndex = localLinear;
    loadIndex < ${l}u;
    loadIndex += ${p}u
  ) {
    let patchPixel = loadIndex / ${u}u;
    let inputBlock = loadIndex % ${u}u;
    let patchX = patchPixel % ${st}u;
    let patchY = patchPixel / ${st}u;
    let inputX =
      i32(workgroupId.x * ${H}u + patchX) - 1;
    let inputY =
      i32(workgroupId.y * ${H}u + patchY) - 1;
    var value = ${a}(0.0);
    if (
      inputX >= 0 && inputX < i32(params.outputWidth) &&
      inputY >= 0 && inputY < i32(params.outputHeight)
    ) {
      if (inputBlock < ${i[0]}u) {
        ${d(0,"inputBlock")}
      } else {
        ${d(1,`inputBlock - ${i[0]}u`)}
      }
    }
    inputPatch[loadIndex] = value;
  }
  workgroupBarrier();

  let outputX =
    workgroupId.x * ${H}u + localId.x;
  let outputY =
    workgroupId.y * ${H}u + localId.y;
  let outputBlock = workgroupId.z;
  if (
    outputX >= params.outputWidth || outputY >= params.outputHeight ||
    outputBlock >= ${o}u
  ) {
    return;
  }

  var acc = bias[outputBlock];
  for (var ky = 0u; ky < 3u; ky++) {
    for (var kx = 0u; kx < 3u; kx++) {
      let patchBase =
        ((localId.y + ky) * ${st}u + localId.x + kx) *
        ${u}u;
      for (var inputBlock = 0u; inputBlock < ${u}u; inputBlock++) {
        ${ce("inputPatch[patchBase + inputBlock]",`((((outputBlock * 3u + ky) * 3u + kx) * ${u}u + inputBlock) * 4u)`,r)}
      }
    }
  }
  let outputIndex =
    (outputY * params.outputWidth + outputX) * ${o}u + outputBlock;
  outputData[outputIndex] = ${c};
}
`}function $r(r,t){const e=D(r),i=Array.from({length:t},(s,u)=>`@group(0) @binding(${u}) var<storage, read> input${u}: array<vec4<f32>>;`).join(`
`),n=Array.from({length:t},(s,u)=>{const l=u*3;return`if (channel < ${l+3}u) { return input${u}[pixel][channel - ${l}u]; }`}).join(`
  `),o=t,a=t+1;return`${ft(r)}
struct Params {
  width: u32,
  height: u32,
  outputBlocks: u32,
  inputChannels: u32,
}
${i}
@group(0) @binding(${o}) var<storage, read_write> outputData: array<${e}>;
@group(0) @binding(${a}) var<uniform> params: Params;

fn readChannel(pixel: u32, channel: u32) -> f32 {
  ${n}
  return 0.0;
}

@compute @workgroup_size(${Z}, ${Z}, 1)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
  if (gid.x >= params.width || gid.y >= params.height || gid.z >= params.outputBlocks) {
    return;
  }
  let pixel = gid.y * params.width + gid.x;
  let firstChannel = gid.z * 4u;
  let value = vec4<f32>(
    readChannel(pixel, firstChannel),
    readChannel(pixel, firstChannel + 1u),
    readChannel(pixel, firstChannel + 2u),
    readChannel(pixel, firstChannel + 3u)
  );
  outputData[pixel * params.outputBlocks + gid.z] = ${at("value",r)};
}
`}const Ln="chromium-experimental-subgroup-matrix",Dn="wgpu-cooperative-matrix",Ft=32,Gt=8,Nt=4,Rn=1024;function Xn(r,t="f32"){const e=r.features.has(Ln)?"tint":r.features.has(Dn)?"naga":void 0;if(!e||!r.features.has("subgroups"))return;const i=r.adapterInfo,n=i?.subgroupMaxSize??0;if(!i||!n||i.subgroupMinSize!==n)return;const o=t==="f16"?[["f16","f16"],["f16","f32"],["f32","f32"]]:[["f16","f32"],["f32","f32"],["f16","f16"]],a=r.features.has("shader-f16");for(const[s,u]of o)if(!(!a&&(s==="f16"||u==="f16"))){for(const l of[8,16])if(i.subgroupMatrixConfigs?.find(c=>c.componentType===s&&c.resultComponentType===u&&c.M===l&&c.N===l&&c.K===l))return{componentType:s,resultType:u,size:l,subgroupSize:n,dialect:e}}}function Yn(r,t){return t.outputFragments??2}function Fn(r,t,e,i){const n=r.componentType==="f16"?2:4,o=r.resultType==="f16"?2:4,a=r.size,s=(Gt+2)*(Ft+2)*a,u=e?16:9;return n*(i?2:1)*(s+u*a*a*t)+o*Nt*Ft*a}function yr(r){const t=r.size,e=r.dialect==="naga",i=(o,a,s)=>e?`coop_mat${t}x${t}<${o}, ${s}>`:`subgroup_matrix_${a}<${o}, ${t}, ${t}>`,n=i(r.resultType,"result","C");return{left:i(r.componentType,"left","A"),right:i(r.componentType,"right","B"),result:n,load:(o,a,s,u)=>e?`coopLoadT<${o}>(&${a}[${s}], ${u})`:`subgroupMatrixLoad<${o}, row_major>(&${a}, ${s}, ${u})`,store:(o,a,s,u)=>e?`coopStoreT(${s}, &${o}[${a}], ${u});`:`subgroupMatrixStore<row_major>(&${o}, ${a}, ${s}, ${u});`,multiplyAdd:e?"coopMultiplyAdd":"subgroupMatrixMultiplyAccumulate",declare:o=>e?`var ${o}: ${n};`:`var ${o} = ${n}();`,extensions:e?"enable wgpu_cooperative_matrix;":`enable subgroups;
enable chromium_experimental_subgroup_matrix;
diagnostic(off, chromium_experimental.subgroup_matrix_uniformity);`}}function Fe(r,t,e,i,n,o,a){const s=(g,h,y)=>`{
        let staged = vec4<${o}>(${h});
        let base = ${y} + i * 4u;
        ${g.array}[base] = staged.x;
        ${g.array}[base + 1u] = staged.y;
        ${g.array}[base + 2u] = staged.z;
        ${g.array}[base + 3u] = staged.w;
      }`,u=g=>t.map(h=>`
    for (var batch = 0u; batch < ${Math.ceil(h.vectors/i)}u; batch++) {
      let i = localIndex + batch * ${i}u;
      if (i < ${h.vectors}u) {
        var value = ${n}(0.0);
        ${h.read}
        ${s(h,"value",g(h))}
      }
    }`).join(""),l=g=>t.map(h=>`let ${h.array}Base = ${g} * ${(h.stride??h.vectors)*4}u;`).join(`
    `);if(!a||r<2)return`
  for (var chunk = 0u; chunk < ${r}u; chunk++) {
    let stageChunk = chunk;
    ${l("0u")}
    ${u(g=>`${g.array}Base`)}
    workgroupBarrier();
    ${e}
    workgroupBarrier();
  }`;const p=t.map(g=>Math.ceil(g.vectors/i)),c=t.map((g,h)=>Array.from({length:p[h]},(y,$)=>`
      {
        let i = localIndex + ${$*i}u;
        var value = ${n}(0.0);
        if (i < ${g.vectors}u) {
          ${g.read}
        }
        prefetch${h}_${$} = value;
      }`).join("")).join(""),d=t.map((g,h)=>Array.from({length:p[h]},(y,$)=>`var prefetch${h}_${$} = ${n}(0.0);`).join(`
    `)).join(`
    `),f=t.map((g,h)=>Array.from({length:p[h]},(y,$)=>`
      {
        let i = localIndex + ${$*i}u;
        if (i < ${g.vectors}u) ${s(g,`prefetch${h}_${$}`,`next * ${(g.stride??g.vectors)*4}u`)}
      }`).join("")).join("");return`
  {
    let stageChunk = 0u;
    ${u(()=>"0u")}
  }
  workgroupBarrier();
  for (var chunk = 0u; chunk < ${r}u; chunk++) {
    let buffer = chunk & 1u;
    let next = 1u - buffer;
    ${l("buffer")}
    ${d}
    if (chunk + 1u < ${r}u) {
      let stageChunk = chunk + 1u;
      ${c}
    }
    ${e}
    if (chunk + 1u < ${r}u) {
      ${f}
    }
    workgroupBarrier();
  }`}function _r(r,t){return r.dialect==="naga"?Array.from({length:9},(e,i)=>`{ let tap = ${i}u; ${t} }`).join(`
`):`for (var tap = 0u; tap < 9u; tap++) { ${t} }`}function Gn(r,t,e,i,n,o,a,s,u,l=!1){const p=o.size,c=o.componentType,d=o.resultType,f=Ft,g=f+2,h=Gt+2,y=s?2:1,$=p/4,x=Math.ceil(i/$),_=a*p,b=f/p,m=Nt*o.subgroupSize,v=D(r),w=D(t),{left:k,right:I,load:P,store:T,multiplyAdd:W,declare:j,extensions:nt}=yr(o),it=[];for(let A=0;A<2;A++)for(let Y=0;Y<b;Y++)for(let U=0;U<a;U++)it.push(`acc${A}_${Y}_${U}`);const pt=it.map(j).join(`
  `),K=Array.from({length:a},(A,Y)=>`let b${Y} = ${P(I,"weightTile",`weightTileBase + tap * ${p*_}u + ${Y*p}u`,`${_}u`)};`).join(`
      `),et=[];for(let A=0;A<2;A++)for(let Y=0;Y<b;Y++)et.push(`{
        let a = ${P(k,"inputTile",`inputTileBase + ((rowBase + ${A}u + ky) * ${g}u + ${Y*p}u + kx) * ${p}u`,`${p}u`)};
        ${Array.from({length:a},(U,G)=>`acc${A}_${Y}_${G} = ${W}(a, b${G}, acc${A}_${Y}_${G});`).join(`
        `)}
      }`);const bt=`let ky = tap / 3u;
      let kx = tap % 3u;
      ${K}
      ${et.join(`
      `)}`,Wt=_r(o,bt),R=[];if(l)for(let A=0;A<a;A++)R.push(`{
    var pooled = vec4<f32>(-3.402823e38);
    let pixel = lane / ${$}u;
    let outputBlock = blockBase + ${A*$}u + lane % ${$}u;
    ${Array.from({length:2},(Y,U)=>`
    ${Array.from({length:b},(G,St)=>T("resultTile",`resultBase + ${St*p*p}u`,`acc${U}_${St}_${A}`,`${p}u`)).join(`
    `)}
    workgroupBarrier();
    {
      let base = resultBase + pixel * ${p*2}u + (lane % ${$}u) * 4u;
      let first = vec4<f32>(resultTile[base], resultTile[base + 1u], resultTile[base + 2u], resultTile[base + 3u]);
      let second = vec4<f32>(resultTile[base + ${p}u], resultTile[base + ${p+1}u], resultTile[base + ${p+2}u], resultTile[base + ${p+3}u]);
      if (tileY + rowBase + ${U}u < params.inputHeight) {
        pooled = max(pooled, first);
        if (tileX + pixel * 2u + 1u < params.inputWidth) { pooled = max(pooled, second); }
      }
    }
    workgroupBarrier();`).join(`
    `)}
    let outputX = tileX / 2u + pixel;
    let outputY = (tileY + rowBase) / 2u;
    if (outputX < params.outputWidth && outputY < params.outputHeight && outputBlock < ${n}u) {
      let acc = pooled + bias[outputBlock];
      outputData[(outputY * params.outputWidth + outputX) * ${n}u + outputBlock] = ${at(lt("acc",e),t)};
    }
  }`);else for(let A=0;A<2;A++)for(let Y=0;Y<a;Y++)R.push(`{
    ${Array.from({length:b},(U,G)=>T("resultTile",`resultBase + ${G*p*p}u`,`acc${A}_${G}_${Y}`,`${p}u`)).join(`
    `)}
    workgroupBarrier();
    let outputY = tileY + rowBase + ${A}u;
    for (var e = lane; e < ${f*$}u; e += ${o.subgroupSize}u) {
      let pixel = e / ${$}u;
      let outputX = tileX + pixel;
      let outputBlock = blockBase + ${Y*$}u + e % ${$}u;
      if (outputX < params.outputWidth && outputY < params.outputHeight && outputBlock < ${n}u) {
        let base = resultBase + pixel * ${p}u + (e % ${$}u) * 4u;
        let acc = vec4<f32>(f32(resultTile[base]), f32(resultTile[base + 1u]),
          f32(resultTile[base + 2u]), f32(resultTile[base + 3u])) + bias[outputBlock];
        outputData[(outputY * params.outputWidth + outputX) * ${n}u + outputBlock] = ${at(lt("acc",e),t)};
      }
    }
    workgroupBarrier();
  }`);const V=u?(()=>{const[A,Y]=u.sourceBlocks,U=G=>G===u.upsampledSource?`min(u32(inputY) / 2u, params.source${G}Height - 1u) * params.source${G}Width + min(u32(inputX) / 2u, params.source${G}Width - 1u)`:`u32(inputY) * params.source${G}Width + u32(inputX)`;return`if (block < ${A}u) {
          value = input0[(${U(0)}) * ${A}u + block];
        } else {
          value = input1[(${U(1)}) * ${Y}u + block - ${A}u];
        }`})():`value = inputData[(u32(inputY) * params.inputWidth + u32(inputX)) * ${i}u + block];`,Ct=u?`struct Params {
  outputWidth: u32,
  outputHeight: u32,
  outputBlocks: u32,
  inputBlocks: u32,
  source0Width: u32,
  source0Height: u32,
  source1Width: u32,
  source1Height: u32,
}
@group(0) @binding(0) var<storage, read> input0: array<${v}>;
@group(0) @binding(1) var<storage, read> input1: array<${v}>;
@group(0) @binding(2) var<storage, read> weights: array<${v}>;
@group(0) @binding(3) var<storage, read> bias: array<vec4<f32>>;
@group(0) @binding(4) var<storage, read_write> outputData: array<${w}>;
@group(0) @binding(5) var<uniform> params: Params;`:`struct Params {
  inputWidth: u32,
  inputHeight: u32,
  outputWidth: u32,
  outputHeight: u32,
  inputBlocks: u32,
  outputBlocks: u32,
}
@group(0) @binding(0) var<storage, read> inputData: array<${v}>;
@group(0) @binding(1) var<storage, read> weights: array<${v}>;
@group(0) @binding(2) var<storage, read> bias: array<vec4<f32>>;
@group(0) @binding(3) var<storage, read_write> outputData: array<${w}>;
@group(0) @binding(4) var<uniform> params: Params;`,Ut=u?"params.outputWidth":"params.inputWidth",Lt=u?"params.outputHeight":"params.inputHeight";return`${r==="fp16"||t==="fp16"||c==="f16"||d==="f16"?`enable f16;
`:""}${nt}
${Ct}

var<workgroup> inputTile: array<${c}, ${y*h*g*p}>;
var<workgroup> weightTile: array<${c}, ${y*9*p*_}>;
var<workgroup> resultTile: array<${d}, ${Nt*f*p}>;

@compute @workgroup_size(${m})
fn main(
  @builtin(local_invocation_index) localIndex: u32,
  @builtin(workgroup_id) workgroupId: vec3<u32>,
  @builtin(subgroup_id) subgroup: u32,
  @builtin(subgroup_invocation_id) lane: u32
) {
  let tileX = workgroupId.x * ${f}u;
  let tileY = workgroupId.y * ${Gt}u;
  let blockBase = workgroupId.z * ${_/4}u;
  let rowBase = subgroup * 2u;
  let resultBase = subgroup * ${f*p}u;
  ${pt}

  ${Fe(x,[{array:"inputTile",vectors:h*g*$,read:`let pixel = i / ${$}u;
      let block = stageChunk * ${$}u + i % ${$}u;
      let inputX = i32(tileX + pixel % ${g}u) - 1;
      let inputY = i32(tileY + pixel / ${g}u) - 1;
      if (block < ${i}u && inputX >= 0 && inputY >= 0 &&
          inputX < i32(${Ut}) && inputY < i32(${Lt})) {
        ${V}
      }`},{array:"weightTile",vectors:9*p*_/4,read:`let quad = i % ${_/4}u;
      let row = i / ${_/4}u;
      let tap = row / ${p}u;
      let inputChannel = stageChunk * ${p}u + row % ${p}u;
      let outputBlock = blockBase + quad;
      if (inputChannel < ${i*4}u && outputBlock < ${n}u) {
        value = weights[((tap * ${i}u + inputChannel / 4u) * ${n}u + outputBlock) * 4u + inputChannel % 4u];
      }`}],Wt,m,v,c,s)}

  ${R.join(`
  `)}
}
`}const ge=[[-1,0],[0,1]],Ci=[[[0],[1,2]],[[0,1],[2]]],oe=16;function Hn(r,t,e,i,n,o){const a=E(e.outputChannels),s=n[o],u=n[1-o],l=o===0?0:n[0]*4,p=o===0?n[0]*4:0,c=oe*s*a*16,d=new Float32Array(c+9*u*a*16),f=be(e.weight),g=(x,_,b,m)=>x<e.outputChannels&&_<e.inputChannels?f[((x*e.inputChannels+_)*3+b)*3+m]:0;for(let x=0;x<a*4;x++){const _=x>>2,b=x&3;for(let m=0;m<s*4;m++)for(let v=0;v<4;v++)for(let w=0;w<4;w++){let k=0;for(const P of Ci[v>>1][w>>1])for(const T of Ci[v&1][w&1])k+=g(x,l+m,P,T);const I=((v*4+w)*s+(m>>2))*a+_;d[I*16+(m&3)*4+b]=k}for(let m=0;m<u*4;m++)for(let v=0;v<9;v++){const w=(v*u+(m>>2))*a+_;d[c+w*16+(m&3)*4+b]=g(x,p+m,v/3|0,v%3)}}let h;if(i==="fp16"){const x=new Uint16Array(d.length);for(let _=0;_<d.length;_++)x[_]=fr(d[_]);h=new Uint8Array(x.buffer)}else h=new Uint8Array(d.buffer);const y=new Float32Array(a*4);y.set(be(e.bias));const $=se(r,`oidn/${t}/weights/${i}/subpixel`,h,rt.STORAGE);try{return{weights:$,weightLayout:"k-major",bias:se(r,`oidn/${t}/bias`,new Uint8Array(y.buffer),rt.STORAGE)}}catch(x){throw $.destroy(),x}}function Vn(r,t,e,i,n,o,a,s,u){const l=n.size,p=u?2:1,c=n.componentType,d=n.resultType,f=Ft,g=Gt,h=f+2,y=g+2,$=f/2+2,x=g/2+2,_=l/4,b=a[s],m=a[1-s],v=Math.ceil(b/_),w=Math.ceil(m/_),k=o*l,I=g/2,P=f/2/l,T=Nt*n.subgroupSize,W=D(r),j=D(t),{left:nt,right:it,load:pt,store:K,multiplyAdd:et,declare:bt,extensions:Wt}=yr(n),R=(O,N,q)=>`acc${O}_${N}_${q}`,V=[];for(let O=0;O<I;O++)for(let N=0;N<P;N++)for(let q=0;q<o;q++)V.push(bt(R(O,N,q)));const Ct=(O,N)=>{const q=[];for(let mt=0;mt<I;mt++)for(let Jt=0;Jt<P;Jt++)q.push(`{
        let a = ${pt(nt,"inputTile",`inputTileBase + ${O(mt,Jt)}`,N)};
        ${Array.from({length:o},(na,ze)=>`${R(mt,Jt,ze)} = ${et}(a, b${ze}, ${R(mt,Jt,ze)});`).join(`
        `)}
      }`);return q.join(`
      `)},Ut=O=>Array.from({length:o},(N,q)=>`let b${q} = ${pt(it,"weightTile",`weightTileBase + ${O} * ${l*k}u + ${q*l}u`,`${k}u`)};`).join(`
      `),Lt=(O,N,q)=>`(${q} * params.source${O}Width + ${N}) * ${a[O]}u`,Dt=Math.max(y*h,x*$)*_,A=oe*l*k/4,Y=(O,N,q)=>({array:"weightTile",vectors:O*l*k/4,stride:A,read:`let quad = i % ${k/4}u;
      let row = i / ${k/4}u;
      let matrix = row / ${l}u;
      let inputChannel = stageChunk * ${l}u + row % ${l}u;
      let outputBlock = blockBase + quad;
      if (inputChannel < ${N*4}u && outputBlock < ${i}u) {
        value = weights[${q}u + ((matrix * ${N}u + inputChannel / 4u) * ${i}u + outputBlock) * 4u + inputChannel % 4u];
      }`}),U=(O,N,q)=>({array:"inputTile",vectors:O*N*_,stride:Dt,read:`let pixel = i / ${_}u;
      let block = stageChunk * ${_}u + i % ${_}u;
      ${q}`}),G=`let inputX = i32(tileX / 2u + pixel % ${$}u) - 1;
      let inputY = i32(tileY / 2u + pixel / ${$}u) - 1;
      if (block < ${b}u && inputX >= 0 && inputY >= 0 &&
          inputX < i32(params.source${s}Width) && inputY < i32(params.source${s}Height)) {
        value = input${s}[${Lt(s,"u32(inputX)","u32(inputY)")} + block];
      }`,St=1-s,kt=`let inputX = i32(tileX + pixel % ${h}u) - 1;
      let inputY = i32(tileY + pixel / ${h}u) - 1;
      if (block < ${m}u && inputX >= 0 && inputY >= 0 &&
          inputX < i32(params.outputWidth) && inputY < i32(params.outputHeight)) {
        value = input${St}[${Lt(St,"u32(inputX)","u32(inputY)")} + block];
      }`,gt=[];for(let O=0;O<2;O++)for(let N=0;N<2;N++)gt.push(`{
      let matrix = phase * 4u + ${O*2+N}u;
      let offsetY = select(${ge[0][O]+1}u, ${ge[1][O]+1}u, phaseY == 1u);
      let offsetX = select(${ge[0][N]+1}u, ${ge[1][N]+1}u, phaseX == 1u);
      ${Ut("matrix")}
      ${Ct((q,mt)=>`((${q}u + offsetY) * ${$}u + ${mt*l}u + offsetX) * ${l}u`,`${l}u`)}
    }`);const Zt=`let ky = tap / 3u;
      let kx = tap % 3u;
      ${Ut("tap")}
      ${Ct((O,N)=>`((phaseY + ${O*2}u + ky) * ${h}u + phaseX + kx + ${N*l*2}u) * ${l}u`,`${l*2}u`)}`,Yr=_r(n,Zt),$i=[];for(let O=0;O<I;O++)for(let N=0;N<o;N++)$i.push(`{
    ${Array.from({length:P},(q,mt)=>K("resultTile",`resultBase + ${mt*l*l}u`,R(O,mt,N),`${l}u`)).join(`
    `)}
    workgroupBarrier();
    let outputY = tileY + phaseY + ${O*2}u;
    for (var e = lane; e < ${f/2*_}u; e += ${n.subgroupSize}u) {
      let pixel = e / ${_}u;
      let outputX = tileX + phaseX + pixel * 2u;
      let outputBlock = blockBase + ${N*_}u + e % ${_}u;
      if (outputX < params.outputWidth && outputY < params.outputHeight && outputBlock < ${i}u) {
        let base = resultBase + pixel * ${l}u + (e % ${_}u) * 4u;
        let acc = vec4<f32>(f32(resultTile[base]), f32(resultTile[base + 1u]),
          f32(resultTile[base + 2u]), f32(resultTile[base + 3u])) + bias[outputBlock];
        outputData[(outputY * params.outputWidth + outputX) * ${i}u + outputBlock] = ${at(lt("acc",e),t)};
      }
    }
    workgroupBarrier();
  }`);return`${r==="fp16"||t==="fp16"||c==="f16"||d==="f16"?`enable f16;
`:""}${Wt}
struct Params {
  outputWidth: u32,
  outputHeight: u32,
  outputBlocks: u32,
  inputBlocks: u32,
  source0Width: u32,
  source0Height: u32,
  source1Width: u32,
  source1Height: u32,
}
@group(0) @binding(0) var<storage, read> input0: array<${W}>;
@group(0) @binding(1) var<storage, read> input1: array<${W}>;
@group(0) @binding(2) var<storage, read> weights: array<${W}>;
@group(0) @binding(3) var<storage, read> bias: array<vec4<f32>>;
@group(0) @binding(4) var<storage, read_write> outputData: array<${j}>;
@group(0) @binding(5) var<uniform> params: Params;

var<workgroup> inputTile: array<${c}, ${p*Dt*4}>;
var<workgroup> weightTile: array<${c}, ${p*A*4}>;
var<workgroup> resultTile: array<${d}, ${Nt*(f/2)*l}>;

@compute @workgroup_size(${T})
fn main(
  @builtin(local_invocation_index) localIndex: u32,
  @builtin(workgroup_id) workgroupId: vec3<u32>,
  @builtin(subgroup_id) subgroup: u32,
  @builtin(subgroup_invocation_id) lane: u32
) {
  let tileX = workgroupId.x * ${f}u;
  let tileY = workgroupId.y * ${g}u;
  let blockBase = workgroupId.z * ${k/4}u;
  let phase = subgroup;
  let phaseY = subgroup >> 1u;
  let phaseX = subgroup & 1u;
  let resultBase = subgroup * ${f/2*l}u;
  ${V.join(`
  `)}

  ${Fe(v,[U(x,$,G),Y(oe,b,0)],gt.join(`
    `),T,W,c,u)}

  ${Fe(w,[U(y,h,kt),Y(9,m,oe*b*i*4)],Yr,T,W,c,u)}

  ${$i.join(`
  `)}
}
`}function jn(r){return r.op==="concat"?r.inputs:r.op==="fusedUpsampleConcatConv2d"?r.inputs.map(t=>t.value):[r.input]}function Kn(r,t="auto"){const e=r.features.has("shader-f16");if(t==="fp16"&&!e)throw new Error("OIDN FP16 was requested but the OIDNGPUDevice does not have shader-f16 enabled");return t==="auto"?e?"fp16":"fp32":t}class qn{_device;usedKernels=new Set;get weightBuffers(){return[...this._packedConvs.values()].flatMap(t=>[t.weights,t.bias])}precision;kernelSetting;gemm;maxSpatialInputBlocks;subgroupsAvailable;subgroupMatrix;subgroupMatrixOutputFragments;subgroupMatrixSubPixel;subgroupMatrixDoubleBuffer;_subgroupMatrixFixedFragments;_model;_gemmByOutputBlocks=new Map;_packedConvs=new Map;_pipelineCache;_executionCache=new Map;_retiredExecutions=new Set;_clock=0;_shapeCacheSize;_profileNextExecution=!1;_profileOperations=0;_resources=new pr;_disposed=!1;constructor(t,e,i={}){this._device=t,this._pipelineCache=bn(t),this.precision=Kn(t,i.precision??"auto"),this.kernelSetting=i.kernel??"auto";const n=i.gemm?.workgroupSize??[8,8];if(this.gemm=Object.freeze({tilePolicy:i.gemm?.tilePolicy??(i.gemm?.workgroupSize?"fixed":"output-aligned"),decoderLoad:i.gemm?.decoderLoad??"per-load",decoderSubPixel:i.gemm?.decoderSubPixel??this.precision==="fp16",unrollRows:i.gemm?.unrollRows??!1,poolLayout:i.gemm?.poolLayout??"channels",sharedLayout:i.gemm?.sharedLayout??(this.precision==="fp16"?"padded-input":"padded"),accumulationOrder:i.gemm?.accumulationOrder??"k-major",finalLayer:i.gemm?.finalLayer??"shared-auto",loadMode:i.gemm?.loadMode??"native",addressMode:i.gemm?.addressMode??"incremental",weightLayout:i.gemm?.weightLayout??"k-major",rowsPerThread:i.gemm?.rowsPerThread??8,workgroupSize:Object.freeze([n[0],n[1]])}),!["fixed","output-aligned"].includes(this.gemm.tilePolicy))throw new Error(`Unsupported GEMM tile policy: ${this.gemm.tilePolicy}`);if(!["per-load","source-first"].includes(this.gemm.decoderLoad))throw new Error(`Unsupported GEMM decoder load: ${this.gemm.decoderLoad}`);if(!["spatial","channels"].includes(this.gemm.poolLayout))throw new Error(`Unsupported GEMM pool layout: ${this.gemm.poolLayout}`);if(!["linear","padded","padded-input","padded-weights"].includes(this.gemm.sharedLayout))throw new Error(`Unsupported GEMM shared layout: ${this.gemm.sharedLayout}`);if(!["k-major","row-major"].includes(this.gemm.accumulationOrder))throw new Error(`Unsupported GEMM accumulation order: ${this.gemm.accumulationOrder}`);if(!["direct","shared-input","shared-input-weights","shared-auto"].includes(this.gemm.finalLayer))throw new Error(`Unsupported GEMM final layer: ${this.gemm.finalLayer}`);if(!["native","packed-weights","packed-all"].includes(this.gemm.loadMode))throw new Error(`Unsupported GEMM load mode: ${this.gemm.loadMode}`);if(!["analytic","incremental","base-offset"].includes(this.gemm.addressMode))throw new Error(`Unsupported GEMM address mode: ${this.gemm.addressMode}`);if(!["output-major","k-major"].includes(this.gemm.weightLayout))throw new Error(`Unsupported GEMM weight layout: ${this.gemm.weightLayout}`);const o=ct(this.gemm),a=(vt(this.gemm).input+vt(this.gemm).weights)*4*(this.precision==="fp16"?2:4);if(![2,4,8].includes(o.rowsPerThread)||![4,8,16].includes(o.workgroupX)||![4,8].includes(o.workgroupY)||n.length!==2||o.workgroupX>t.limits.maxComputeWorkgroupSizeX||o.workgroupY>t.limits.maxComputeWorkgroupSizeY||o.workgroupX*o.workgroupY>t.limits.maxComputeInvocationsPerWorkgroup||a>t.limits.maxComputeWorkgroupStorageSize)throw new Error("Unsupported GEMM tile configuration for this OIDNGPUDevice");this.subgroupsAvailable=t.features.has("subgroups");const s=i.subgroupMatrix??{},u=this.kernelSetting==="subgroup-matrix"?Xn(t,s.accumulation):void 0;this.subgroupMatrixOutputFragments=u?Yn(u,s):0,this.subgroupMatrixSubPixel=s.subPixel??!0,this._subgroupMatrixFixedFragments=s.outputFragments!==void 0;const l=c=>u!==void 0&&Fn(u,this.subgroupMatrixOutputFragments,this.subgroupMatrixSubPixel,c)<=t.limits.maxComputeWorkgroupStorageSize;if(u&&s.outputFragments===void 0&&!l(!1)&&(this.subgroupMatrixOutputFragments=1),this.subgroupMatrixDoubleBuffer=(s.doubleBuffer??!1)&&l(!0),u&&Nt*u.subgroupSize<=t.limits.maxComputeInvocationsPerWorkgroup&&Nt*u.subgroupSize<=t.limits.maxComputeWorkgroupSizeX&&l(this.subgroupMatrixDoubleBuffer)&&(this.subgroupMatrix=u),this.maxSpatialInputBlocks=this.precision==="fp16"&&t.limits.maxComputeInvocationsPerWorkgroup>=H*H&&t.limits.maxComputeWorkgroupSizeX>=H&&t.limits.maxComputeWorkgroupSizeY>=H?Math.floor(t.limits.maxComputeWorkgroupStorageSize/(st*st*4*2)):0,this._shapeCacheSize=Math.max(1,i.shapeCacheSize??2),e.inputChannels%3!==0||e.inputChannels<3||e.inputChannels>9)throw new Error(`Native OIDN expects 3, 6, or 9 input channels, got ${e.inputChannels}`);this._model={spec:e.spec,inputChannels:e.inputChannels,outputChannels:e.outputChannels,channelsByValue:new Map(e.channelsByValue),convChannels:new Map(e.convChannels)};const p=new Map;for(const c of oi(this._model,{fuseConvPool:this._matrixPool()}).nodes){if(c.op==="fusedUpsampleConcatConv2d"){const d=this._subPixelDecoder(c);d&&p.set(c.conv.id,d)}if(c.op!=="conv2d"&&c.op!=="maxPool2d"&&c.op!=="fusedConvReluMaxPool2d"&&c.op!=="fusedUpsampleConcatConv2d")throw new Error(`Native OIDN descriptor ${e.spec.id} leaves unsupported ${c.op} node ${c.id} after graph optimization`)}try{for(const[c,d]of e.convTensors){const f=this._selectConvKernel(E(d.inputChannels),c===e.spec.output),g=f==="implicit-gemm"?this.gemm.weightLayout:f==="subgroup-matrix"?"k-major":"output-major",h=p.get(c),y=h?Hn(t,c,d,this.precision,h.sourceBlocks,h.upsampledSource):Bn(t,c,d,this.precision,g);this._resources.track("gpu-buffer",y.weights),this._resources.track("gpu-buffer",y.bias),this._packedConvs.set(c,y)}}catch(c){for(const d of this._packedConvs.values())this._releaseBuffer(d.weights),this._releaseBuffer(d.bias);throw this._packedConvs.clear(),c}}_pipeline(t,e){let i=this._pipelineCache.get(t);return i||(i=this._device.createComputePipeline({label:`oidn/${t}`,layout:"auto",compute:{module:this._device.createShaderModule({label:`oidn/${t}`,code:e}),entryPoint:"main"}}),this._pipelineCache.set(t,i)),i}_nodePipelineSpec(t,e,i=this.subgroupMatrixOutputFragments){if(t.op==="conv2d"){const n=e?"fp32":this.precision,o=E(this._model.convChannels.get(t.id).inputChannels),a=E(this._model.convChannels.get(t.id).outputChannels),s=this._gemmForOutput(a),u=this._selectConvKernel(o,e),l=s.finalLayer==="shared-input-weights"||s.finalLayer==="shared-auto"&&Ti(this.precision,o,!0)<=this._device.limits.maxComputeWorkgroupStorageSize;return u!=="subgroup-matrix"&&e&&this._model.convChannels.get(t.id).outputChannels===3&&(this.kernelSetting==="auto"||this.kernelSetting==="implicit-gemm"||this.kernelSetting==="subgroup-matrix")&&s.finalLayer!=="direct"&&this._device.limits.maxComputeWorkgroupSizeX>=8&&this._device.limits.maxComputeWorkgroupSizeY>=8&&this._device.limits.maxComputeInvocationsPerWorkgroup>=64&&Ti(this.precision,o,l)<=this._device.limits.maxComputeWorkgroupStorageSize?{key:`conv-final-rgb/${this.precision}/${t.activation}/in${o}/weights-${l?"shared":"storage"}`,kernel:"direct",code:vn(this.precision,t.activation,o,l)}:u==="subgroup-matrix"?this._subgroupMatrixSpec(`conv/${t.activation}/in${o}/out${a}`,n,t.activation,o,a,i):{key:`conv-${u}/${this.precision}/${n}/${t.activation}/in${o}/out${a}`+(u==="implicit-gemm"?`/address-${s.addressMode}/weights-${s.weightLayout}-v1/tile-${s.workgroupSize.join("x")}-r${s.rowsPerThread}/loads-${s.loadMode}/shared-${s.sharedLayout}/acc-${s.accumulationOrder}/unroll-${Number(s.unrollRows)}`:""),kernel:u,code:u==="implicit-gemm"?En(this.precision,n,t.activation,o,a,s):u==="spatial"?Mn(this.precision,n,t.activation,o,a):u==="subgroup"?Sn(this.precision,n,t.activation,o,a):Cn(this.precision,n,t.activation,o,a)}}if(t.op==="maxPool2d"){const n=E(this._model.channelsByValue.get(t.id)),o=this._coalescedPool();return{key:`max-pool/${this.precision}/out${n}/${o?"channels":"spatial"}`,kernel:"direct",code:On(this.precision,n,o)}}if(t.op==="fusedConvReluMaxPool2d"){const n=E(this._model.convChannels.get(t.conv.id).inputChannels),o=E(this._model.convChannels.get(t.conv.id).outputChannels);return this._matrixPool()?this._subgroupMatrixSpec(`conv-pool/${t.conv.activation}/in${n}/out${o}`,this.precision,t.conv.activation,n,o,i,void 0,!0):{key:`conv-pool/${this.precision}/${t.conv.activation}/in${n}/out${o}`,kernel:"direct",code:An(this.precision,t.conv.activation,n,o)}}if(t.op==="fusedUpsampleConcatConv2d"){if(t.inputs.length!==2)throw new Error(`Native fused decoder ${t.id} requires two inputs`);const n=t.inputs.map(f=>E(this._model.channelsByValue.get(f.value))),o=t.inputs.findIndex(f=>f.upsample);if(o!==0&&o!==1)throw new Error(`Native fused decoder ${t.id} has no upsample input`);const a=n[0]+n[1],s=e?"fp32":this.precision,u=this._selectConvKernel(a,e),l=u==="subgroup"?"direct":u,p=E(this._model.convChannels.get(t.conv.id).outputChannels);if(l==="subgroup-matrix"&&this._subPixelDecoder(t)){const f=this.subgroupMatrix;return{key:`subgroup-matrix-subpixel/${this.precision}/${s}/${f.dialect}/${f.componentType}-${f.resultType}-${f.size}-sg${f.subgroupSize}/n${i}${this.subgroupMatrixDoubleBuffer?"-db":""}/${t.conv.activation}/${n.join("+")}/out${p}/up${o}`,kernel:"subgroup-matrix",code:Vn(this.precision,s,t.conv.activation,p,f,i,n,o,this.subgroupMatrixDoubleBuffer)}}if(l==="subgroup-matrix")return this._subgroupMatrixSpec(`decoder/${t.conv.activation}/${n.join("+")}/out${p}/up${o}`,s,t.conv.activation,a,p,i,{sourceBlocks:n,upsampledSource:o});const c=this._gemmForOutput(p);return{key:`decoder-${l}${l==="implicit-gemm"&&this._subPixelDecoder(t)?"-subpixel":""}/${this.precision}/${s}/${t.conv.activation}/${n.join("+")}/out${p}/up${o}`+(l==="implicit-gemm"?`/address-${c.addressMode}/weights-${c.weightLayout}-v1/tile-${c.workgroupSize.join("x")}-r${c.rowsPerThread}/loads-${c.loadMode}/shared-${c.sharedLayout}/acc-${c.accumulationOrder}/unroll-${Number(c.unrollRows)}/decoder-${c.decoderLoad}`:""),kernel:l,code:l==="implicit-gemm"?(this._subPixelDecoder(t)?zn:Nn)(this.precision,s,t.conv.activation,n,o,p,c):l==="spatial"?Un(this.precision,s,t.conv.activation,n,o,p):Wn(this.precision,s,t.conv.activation,n,o,p)}}throw new Error(`Native OIDN does not implement unfused ${t.op} node ${t.id}`)}_subPixelDecoder(t){if(t.id===this._model.spec.output||t.inputs.length!==2)return;const e=this._selectConvKernel(E(this._model.convChannels.get(t.conv.id).inputChannels),!1);if(!(e==="subgroup-matrix"&&this.subgroupMatrixSubPixel)&&!(e==="implicit-gemm"&&this.gemm.decoderSubPixel&&this.gemm.weightLayout==="k-major"))return;const i=t.inputs[0].upsample?0:t.inputs[1].upsample?1:-1;if(i!==-1)return{sourceBlocks:t.inputs.map(n=>E(this._model.channelsByValue.get(n.value))),upsampledSource:i}}_subgroupMatrixSpec(t,e,i,n,o,a,s,u=!1){const l=this.subgroupMatrix;return{key:`subgroup-matrix/${this.precision}/${e}/${l.dialect}/${l.componentType}-${l.resultType}-${l.size}-sg${l.subgroupSize}/n${a}${this.subgroupMatrixDoubleBuffer?"-db":""}/${t}`,kernel:"subgroup-matrix",code:Gn(this.precision,e,i,n,o,l,a,this.subgroupMatrixDoubleBuffer,s,u)}}_subgroupMatrixFragmentsFor(t){const e=Math.min(this.subgroupMatrixOutputFragments,Math.ceil(E(t.channels)*4/this.subgroupMatrix.size));return this._subgroupMatrixFixedFragments||e===1?e:Math.ceil(t.width/Ft)*Math.ceil(t.height/Gt)*Math.ceil(E(t.channels)*4/(e*this.subgroupMatrix.size))<Rn?1:e}_gemmForOutput(t){if(this.gemm.tilePolicy!=="output-aligned"||this.gemm.workgroupSize[0]!==8||t<=0||t%16!==0)return this.gemm;const e=this._gemmByOutputBlocks.get(t);if(e)return e;const i=Object.freeze({...this.gemm,workgroupSize:Object.freeze([16,this.gemm.workgroupSize[1]])}),n=ct(i),o=vt(i),a=this._device.limits,u=n.workgroupX<=a.maxComputeWorkgroupSizeX&&n.workgroupY<=a.maxComputeWorkgroupSizeY&&n.workgroupX*n.workgroupY<=a.maxComputeInvocationsPerWorkgroup&&(o.input+o.weights)*4*(this.precision==="fp16"?2:4)<=a.maxComputeWorkgroupStorageSize?i:this.gemm;return this._gemmByOutputBlocks.set(t,u),u}_matrixPool(){const t=this.subgroupMatrix;return this._model.spec.family==="oidn-unet-large"&&this.precision==="fp16"&&t?.dialect==="naga"&&t.size===8&&t.subgroupSize===32&&t.componentType==="f16"&&t.resultType==="f32"}_coalescedPool(){return this.gemm.poolLayout==="channels"&&(this.kernelSetting==="auto"||this.kernelSetting==="implicit-gemm"||this.kernelSetting==="subgroup-matrix")}_selectConvKernel(t,e){const i=this.precision==="fp16"&&t<=this.maxSpatialInputBlocks;return this.kernelSetting==="direct"?"direct":this.kernelSetting==="spatial"?i?"spatial":"direct":this.kernelSetting==="implicit-gemm"?e?"direct":"implicit-gemm":this.kernelSetting==="subgroup"?this.subgroupsAvailable?"subgroup":"direct":this.kernelSetting==="subgroup-matrix"?e?this.subgroupMatrix?.dialect==="naga"?"subgroup-matrix":"direct":this.subgroupMatrix?"subgroup-matrix":"implicit-gemm":e?"direct":"implicit-gemm"}_nodePipeline(t,e){const{key:i,code:n}=this._nodePipelineSpec(t,e);return this._pipeline(i,n)}_createExecution(t,e){const i=this._matrixPool(),n=yn(this._model,t,e,{fuseConvPool:i}),o=new Map,a=[],s=[],u=new Map;n.nodes.forEach((c,d)=>{for(const f of jn(c))u.set(f,d)}),u.set(n.spec.output,n.nodes.length);const l=[],p=c=>(l.push(c),this._resources.track("gpu-buffer",c));try{const c=(m,v,w,k)=>{const I=kn(v,w),P=s.filter(W=>W.lastUse<k);let T=P.filter(W=>W.capacity>=I).sort((W,j)=>W.capacity-j.capacity)[0];!T&&i&&(T=P.sort((W,j)=>j.capacity-W.capacity)[0]),T||(T={capacity:0,lastUse:-2,values:[]},s.push(T)),T.capacity=Math.max(T.capacity,I),T.lastUse=u.get(m)??-1,T.values.push(m)};c(n.spec.input,n.inputShape,this.precision==="fp16"?2:4,-1),n.plannedNodes.forEach(({node:m,outputShape:v},w)=>{const k=m.id===n.spec.output;c(m.id,v,k||this.precision==="fp32"?4:2,w)}),s.forEach((m,v)=>{const w=p(this._device.createBuffer({label:`oidn/activation/${t}x${e}/${v}`,size:ui(m.capacity,4),usage:rt.STORAGE|rt.COPY_SRC|rt.COPY_DST}));a.push({buffer:w,capacity:m.capacity});for(const k of m.values)o.set(k,w)});const d=this._model.inputChannels/3,f=`pack/${this.precision}/${d}`,g=this._pipeline(f,$r(this.precision,d)),h=[],y=[],$=[],x=[],_=[];n.plannedNodes.forEach(({node:m,outputShape:v},w)=>{const k=m.id===n.spec.output,I=this.subgroupMatrix?this._subgroupMatrixFragmentsFor(v):0,P=this._nodePipelineSpec(m,k,I);P.kernel&&this.usedKernels.add(P.kernel);const T=this._pipeline(P.key,P.code);h.push(T),y.push(P.kernel??"direct"),$.push(P.kernel==="subgroup-matrix"?I:0);const W=o.get(m.id);let j,nt,it;if(m.op==="conv2d"){const K=n.valueShapes.get(m.input);it=m.id,nt=[K.width,K.height,v.width,v.height,E(K.channels),E(v.channels)];const et=this._packedConvs.get(it);j=[{binding:0,resource:{buffer:o.get(m.input)}},{binding:1,resource:{buffer:et.weights}},{binding:2,resource:{buffer:et.bias}},{binding:3,resource:{buffer:W}}]}else if(m.op==="maxPool2d"){const K=n.valueShapes.get(m.input);nt=[K.width,K.height,v.width,v.height,E(v.channels)],j=[{binding:0,resource:{buffer:o.get(m.input)}},{binding:1,resource:{buffer:W}}]}else if(m.op==="fusedConvReluMaxPool2d"){const K=n.valueShapes.get(m.input);it=m.conv.id,nt=[K.width,K.height,v.width,v.height,E(K.channels),E(v.channels)];const et=this._packedConvs.get(it);j=[{binding:0,resource:{buffer:o.get(m.input)}},{binding:1,resource:{buffer:et.weights}},{binding:2,resource:{buffer:et.bias}},{binding:3,resource:{buffer:W}}]}else if(m.op==="fusedUpsampleConcatConv2d"){it=m.conv.id;const K=n.valueShapes.get(m.inputs[0].value),et=n.valueShapes.get(m.inputs[1].value);nt=[v.width,v.height,E(v.channels),E(this._model.convChannels.get(it).inputChannels),K.width,K.height,et.width,et.height];const bt=this._packedConvs.get(it);j=[{binding:0,resource:{buffer:o.get(m.inputs[0].value)}},{binding:1,resource:{buffer:o.get(m.inputs[1].value)}},{binding:2,resource:{buffer:bt.weights}},{binding:3,resource:{buffer:bt.bias}},{binding:4,resource:{buffer:W}}]}else throw new Error(`Unexpected native node ${m.op}`);const pt=p(Pi(this._device,`oidn/${m.id}/params/${t}x${e}`,nt));_.push(pt),j.push({binding:j.length,resource:{buffer:pt}}),x.push(this._device.createBindGroup({label:`oidn/${m.id}/bindings`,layout:T.getBindGroupLayout(0),entries:j}))});const b=p(Pi(this._device,`oidn/input/params/${t}x${e}`,[t,e,E(this._model.inputChannels),this._model.inputChannels]));return _.push(b),{plan:n,valueBuffers:o,slots:a,nodeBindings:x,nodePipelines:h,nodeKernels:y,nodeFragments:$,inputPipeline:g,inputUniform:b,ownedBuffers:_,lastUsed:++this._clock}}catch(c){for(const d of l)this._releaseBuffer(d);throw c}}_execution(t,e){if(this._disposed)throw new Error("Native OIDN executor is disposed");const i=`${t}x${e}`;let n=this._executionCache.get(i);if(!n&&(n=this._createExecution(t,e),this._executionCache.set(i,n),this._executionCache.size>this._shapeCacheSize)){const o=[...this._executionCache.entries()].filter(([a])=>a!==i).sort((a,s)=>a[1].lastUsed-s[1].lastUsed)[0];o&&(this._executionCache.delete(o[0]),this._retireExecution(o[1]))}return n.lastUsed=++this._clock,n}_retireExecution(t){this._destroyExecution(t)}prewarm(t){for(const e of t)this._execution(e.width,e.height)}profileNextExecution(){return this._device.features.has("timestamp-query")?(this._profileNextExecution=!0,!0):!1}packedInputBuffer(t,e){const i=this._execution(t,e);return i.valueBuffers.get(i.plan.spec.input)}executePacked(t,e){return this._execute([],t,e,!0)}execute(t,e,i){return this._execute(t,e,i,!1)}_execute(t,e,i,n){const o=this._model.inputChannels/3;if(!n&&t.length!==o)throw new Error(`Native OIDN expected ${o} input buffers, got ${t.length}`);const a=this._execution(e,i),s=[...n?[]:["input-pack"],...a.plan.nodes.map(h=>h.id)],u=this._profileNextExecution&&this._device.features.has("timestamp-query");this._profileNextExecution=!1;const l=s.length*2,p=u?this._resources.track("gpu-query-set",this._device.createQuerySet({type:"timestamp",count:l})):void 0,c=l*8;let d,f;try{d=u?this._resources.track("gpu-buffer",this._device.createBuffer({label:`oidn/profile/resolve/${e}x${i}`,size:c,usage:rt.QUERY_RESOLVE|rt.COPY_SRC})):void 0,f=u?this._resources.track("gpu-buffer",this._device.createBuffer({label:`oidn/profile/readback/${e}x${i}`,size:c,usage:rt.COPY_DST|rt.MAP_READ})):void 0}catch(h){throw this._releaseBuffer(f),this._releaseBuffer(d),this._releaseQuerySet(p),h}const g=(h,y)=>({label:h,...p?{timestampWrites:{querySet:p,beginningOfPassWriteIndex:y*2,endOfPassWriteIndex:y*2+1}}:{}});try{const h=this._device.createCommandEncoder({label:`oidn/native/${e}x${i}`});if(!n){const y=t.map((_,b)=>({binding:b,resource:{buffer:_}}));y.push({binding:o,resource:{buffer:a.valueBuffers.get(a.plan.spec.input)}}),y.push({binding:o+1,resource:{buffer:a.inputUniform}});const $=this._device.createBindGroup({label:"oidn/input/bindings",layout:a.inputPipeline.getBindGroupLayout(0),entries:y}),x=h.beginComputePass(g("oidn/input-pack",0));x.setPipeline(a.inputPipeline),x.setBindGroup(0,$),x.dispatchWorkgroups(Math.ceil(e/Z),Math.ceil(i/Z),E(this._model.inputChannels)),x.end()}a.plan.plannedNodes.forEach(({node:y,outputShape:$},x)=>{const _=h.beginComputePass(g(`oidn/${a.plan.nodes[x].id}`,x+(n?0:1)));if(_.setPipeline(a.nodePipelines[x]),_.setBindGroup(0,a.nodeBindings[x]),y.op==="maxPool2d"&&this._coalescedPool()){const b=Math.ceil($.width*E($.channels)/Z),m=this._device.limits.maxComputeWorkgroupsPerDimension;_.dispatchWorkgroups(Math.min(b,m),Math.ceil($.height/Z),Math.ceil(b/m))}else if(a.nodeKernels[x]==="subgroup-matrix")_.dispatchWorkgroups(Math.ceil($.width*(y.op==="fusedConvReluMaxPool2d"?2:1)/Ft),Math.ceil($.height*(y.op==="fusedConvReluMaxPool2d"?2:1)/Gt),Math.ceil(E($.channels)/(a.nodeFragments[x]*this.subgroupMatrix.size/4)));else if(a.nodeKernels[x]==="implicit-gemm"){const b=ct(this._gemmForOutput(E($.channels))),m=y.op==="fusedUpsampleConcatConv2d"&&this._subPixelDecoder(y)!==void 0;_.dispatchWorkgroups(Math.ceil((m?Math.ceil($.width/2)*Math.ceil($.height/2):$.width*$.height)/b.tileM),Math.ceil(E($.channels)/b.tileNBlocks),m?4:1)}else _.dispatchWorkgroups(Math.ceil($.width/Z),Math.ceil($.height/Z),E($.channels));_.end()}),p&&(h.resolveQuerySet(p,0,l,d,0),h.copyBufferToBuffer(d,0,f,0,c)),this._device.queue.submit([h.finish()])}catch(h){throw this._releaseBuffer(f),this._releaseBuffer(d),this._releaseQuerySet(p),h}return p&&(this._profileOperations++,this._readProfile(p,d,f,s)),a.valueBuffers.get(a.plan.spec.output)}_readProfile(t,e,i,n){this._releaseQuerySet(t),this._releaseBuffer(e),this._releaseBuffer(i),this._profileOperations--}_releaseBuffer(t){this._resources.release("gpu-buffer",t,()=>t.destroy())}_releaseQuerySet(t){this._resources.release("gpu-query-set",t,()=>t.destroy())}_destroyExecution(t){t.slots.forEach(e=>this._releaseBuffer(e.buffer)),t.ownedBuffers.forEach(e=>this._releaseBuffer(e))}getResourceInfo(){return this._resources.snapshot(this._retiredExecutions.size+this._profileOperations)}dispose(){if(!this._disposed){this._disposed=!0;for(const t of this._packedConvs.values())this._releaseBuffer(t.weights),this._releaseBuffer(t.bias);this._packedConvs.clear();for(const t of this._executionCache.values())this._destroyExecution(t);this._executionCache.clear();for(const t of this._retiredExecutions)this._destroyExecution(t);this._retiredExecutions.clear()}}}const Si=new WeakMap;class Qn extends qn{_lastExecutionProfile;constructor(t,e,i){super(t,e,i)}execute(t,e,i){return super.execute(t,e,i)}get _asyncDevice(){return this._device}get _pipelinePromises(){let t=Si.get(this._device);return t||(t=new Map,Si.set(this._device,t)),t}getLastExecutionProfile(){return this._lastExecutionProfile}_pipelineAsync(t,e){const i=this._pipelineCache.get(t);if(i)return Promise.resolve(i);const n=this._pipelinePromises.get(t);if(n)return n;const o=this._asyncDevice.createComputePipelineAsync({label:`oidn/${t}`,layout:"auto",compute:{module:this._device.createShaderModule({label:`oidn/${t}`,code:e}),entryPoint:"main"}}).then(a=>(this._pipelineCache.set(t,a),this._pipelinePromises.delete(t),a),a=>{throw this._pipelinePromises.delete(t),a});return this._pipelinePromises.set(t,o),o}_retireExecution(t){this._retiredExecutions.add(t),this._asyncDevice.queue.onSubmittedWorkDone().catch(()=>{}).then(()=>{this._retiredExecutions.delete(t),this._destroyExecution(t)})}async prepare(){if(this._disposed)throw new Error("Native OIDN executor is disposed");const t=oi(this._model,{fuseConvPool:!1}),e=this._model.inputChannels/3,i=[{key:`pack/${this.precision}/${e}`,code:$r(this.precision,e)},...t.nodes.map(n=>this._nodePipelineSpec(n,n.id===t.spec.output))];await Promise.all(i.map(({key:n,code:o})=>this._pipelineAsync(n,o)))}_readProfile(t,e,i,n){this._lastExecutionProfile=(async()=>{try{await i.mapAsync(ki.READ);const o=new Uint32Array(i.getMappedRange()),a=u=>o[u*2+1]*4294967296+o[u*2],s=n.map((u,l)=>({id:u,durationMs:(a(l*2+1)-a(l*2))/1e6}));return{totalMs:s.reduce((u,l)=>u+l.durationMs,0),layers:s}}finally{i.mapState==="mapped"&&i.unmap(),this._releaseQuerySet(t),this._releaseBuffer(e),this._releaseBuffer(i),this._profileOperations--}})()}async executeCPU(t,e,i){const n=e*i*this._model.inputChannels;if(t.length!==n)throw new Error(`Native OIDN CPU input has ${t.length} values, expected ${n}`);const o=this._execution(e,i),a=this._model.inputChannels/3,s=e*i;o.cpuInputBuffers||(o.cpuInputBuffers=Array.from({length:a},(d,f)=>{const g=this._device.createBuffer({label:`oidn/cpu-input/${e}x${i}/${f}`,size:s*16,usage:rt.STORAGE|rt.COPY_DST});return this._resources.track("gpu-buffer",g),o.ownedBuffers.push(g),g}),o.cpuReadbackBuffer=this._device.createBuffer({label:`oidn/cpu-readback/${e}x${i}`,size:s*16,usage:rt.COPY_DST|rt.MAP_READ}),this._resources.track("gpu-buffer",o.cpuReadbackBuffer),o.ownedBuffers.push(o.cpuReadbackBuffer));for(let d=0;d<a;d++){const f=new Float32Array(s*4);for(let g=0;g<s;g++){const h=g*this._model.inputChannels+d*3,y=g*4;f[y]=t[h],f[y+1]=t[h+1],f[y+2]=t[h+2]}this._device.queue.writeBuffer(o.cpuInputBuffers[d],0,new Uint8Array(f.buffer,f.byteOffset,f.byteLength))}const u=super.execute(o.cpuInputBuffers,e,i),l=this._device.createCommandEncoder({label:`oidn/cpu-readback/${e}x${i}`});l.copyBufferToBuffer(u,0,o.cpuReadbackBuffer,0,s*16),this._device.queue.submit([l.finish()]),await o.cpuReadbackBuffer.mapAsync(ki.READ);const p=new Float32Array(o.cpuReadbackBuffer.getMappedRange()),c=new Float32Array(s*3);for(let d=0;d<s;d++)c[d*3]=p[d*4],c[d*3+1]=p[d*4+1],c[d*3+2]=p[d*4+2];return o.cpuReadbackBuffer.unmap(),c}}const Zn="This is not an object",Jn="This is not a Float16Array object",Mi="This constructor is not a subclass of Float16Array",xr="The constructor property value is not an object",to="Species constructor didn't return TypedArray object",eo="Derived constructor created TypedArray object which was too small length",ae="Attempting to access detached ArrayBuffer",Ge="Cannot convert undefined or null to object",He="Cannot mix BigInt and other types, use explicit conversions",Ei="@@iterator property is not callable",Ai="Reduce of empty array with no initial value",io="The comparison function must be either a function or undefined",Le="Offset is out of bounds";function X(r){return(t,...e)=>ot(r,t,e)}function qt(r,t){return X(Ht(r,t).get)}const{apply:ot,construct:ie,defineProperty:Oi,get:De,getOwnPropertyDescriptor:Ht,getPrototypeOf:le,has:Ve,ownKeys:wr,set:Ni,setPrototypeOf:vr}=Reflect,ro=Proxy,{EPSILON:no,MAX_SAFE_INTEGER:zi,isFinite:br,isNaN:Vt}=Number,{iterator:_t,species:oo,toStringTag:ci,for:ao}=Symbol,jt=Object,{create:Me,defineProperty:pe,freeze:uo,is:Wi}=jt,je=jt.prototype,so=je.__lookupGetter__?X(je.__lookupGetter__):(r,t)=>{if(r==null)throw F(Ge);let e=jt(r);do{const i=Ht(e,t);if(i!==void 0)return wt(i,"get")?i.get:void 0}while((e=le(e))!==null)},wt=jt.hasOwn||X(je.hasOwnProperty),kr=Array,Tr=kr.isArray,Ee=kr.prototype,co=X(Ee.join),lo=X(Ee.push),po=X(Ee.toLocaleString),li=Ee[_t],ho=X(li),{abs:fo,trunc:Br}=Math,Ae=ArrayBuffer,go=Ae.isView,Ir=Ae.prototype,mo=X(Ir.slice),$o=qt(Ir,"byteLength"),Ke=typeof SharedArrayBuffer<"u"?SharedArrayBuffer:null,yo=Ke&&qt(Ke.prototype,"byteLength"),pi=le(Uint8Array),_o=pi.from,tt=pi.prototype,xo=tt[_t],wo=X(tt.keys),vo=X(tt.values),bo=X(tt.entries),ko=X(tt.set),Ui=X(tt.reverse),To=X(tt.fill),Bo=X(tt.copyWithin),Li=X(tt.sort),ee=X(tt.slice),Io=X(tt.subarray),J=qt(tt,"buffer"),Mt=qt(tt,"byteOffset"),M=qt(tt,"length"),Pr=qt(tt,ci),Po=Uint8Array,ut=Uint16Array,Di=(...r)=>ot(_o,ut,r),di=Uint32Array,Co=Float32Array,zt=le([][_t]()),Oe=X(zt.next),So=X((function*(){})().next),Mo=le(zt),F=TypeError,Re=RangeError,Cr=WeakSet,Sr=Cr.prototype,Eo=X(Sr.add),Ao=X(Sr.has),Ne=WeakMap,hi=Ne.prototype,ke=X(hi.get),Oo=X(hi.has),fi=X(hi.set),Mr=new Ne,No=Me(null,{next:{value:function(){const t=ke(Mr,this);return Oe(t)}},[_t]:{value:function(){return this}}});function me(r){if(r[_t]===li&&zt.next===Oe)return r;const t=Me(No);return fi(Mr,t,ho(r)),t}const Er=new Ne,Ar=Me(Mo,{next:{value:function(){const t=ke(Er,this);return So(t)},writable:!0,configurable:!0}});for(const r of wr(zt))r!=="next"&&pe(Ar,r,Ht(zt,r));function Ri(r){const t=Me(Ar);return fi(Er,t,r),t}function Te(r){return r!==null&&typeof r=="object"||typeof r=="function"}function Xi(r){return r!==null&&typeof r=="object"}function Be(r){return Pr(r)!==void 0}function qe(r){const t=Pr(r);return t==="BigInt64Array"||t==="BigUint64Array"}function zo(r){try{return Tr(r)?!1:($o(r),!0)}catch{return!1}}function Or(r){if(Ke===null)return!1;try{return yo(r),!0}catch{return!1}}function Wo(r){return zo(r)||Or(r)}function Yi(r){return Tr(r)?r[_t]===li&&zt.next===Oe:!1}function Uo(r){return Be(r)?r[_t]===xo&&zt.next===Oe:!1}function $e(r){if(typeof r!="string")return!1;const t=+r;return r!==t+""||!br(t)?!1:t===Br(t)}const Ie=ao("__Float16Array__");function Lo(r){if(!Xi(r))return!1;const t=le(r);if(!Xi(t))return!1;const e=t.constructor;if(e===void 0)return!1;if(!Te(e))throw F(xr);return Ve(e,Ie)}const Qe=1/no;function Do(r){return r+Qe-Qe}const Nr=6103515625e-14,Ro=65504,zr=.0009765625,Fi=zr*Nr,Xo=zr*Qe;function Yo(r){const t=+r;if(!br(t)||t===0)return t;const e=t>0?1:-1,i=fo(t);if(i<Nr)return e*Do(i/Fi)*Fi;const n=(1+Xo)*i,o=n-(n-i);return o>Ro||Vt(o)?e*(1/0):e*o}const Wr=new Ae(4),Ur=new Co(Wr),Lr=new di(Wr),dt=new ut(512),ht=new Po(512);for(let r=0;r<256;++r){const t=r-127;t<-24?(dt[r]=0,dt[r|256]=32768,ht[r]=24,ht[r|256]=24):t<-14?(dt[r]=1024>>-t-14,dt[r|256]=1024>>-t-14|32768,ht[r]=-t-1,ht[r|256]=-t-1):t<=15?(dt[r]=t+15<<10,dt[r|256]=t+15<<10|32768,ht[r]=13,ht[r|256]=13):t<128?(dt[r]=31744,dt[r|256]=64512,ht[r]=24,ht[r|256]=24):(dt[r]=31744,dt[r|256]=64512,ht[r]=13,ht[r|256]=13)}function yt(r){Ur[0]=Yo(r);const t=Lr[0],e=t>>23&511;return dt[e]+((t&8388607)>>ht[e])}const gi=new di(2048);for(let r=1;r<1024;++r){let t=r<<13,e=0;for(;(t&8388608)===0;)t<<=1,e-=8388608;t&=-8388609,e+=947912704,gi[r]=t|e}for(let r=1024;r<2048;++r)gi[r]=939524096+(r-1024<<13);const Qt=new di(64);for(let r=1;r<31;++r)Qt[r]=r<<23;Qt[31]=1199570944;Qt[32]=2147483648;for(let r=33;r<63;++r)Qt[r]=2147483648+(r-32<<23);Qt[63]=3347054592;const Dr=new ut(64);for(let r=1;r<64;++r)r!==32&&(Dr[r]=1024);function z(r){const t=r>>10;return Lr[0]=gi[Dr[t]+(r&1023)]+Qt[t],Ur[0]}function xt(r){const t=+r;return Vt(t)||t===0?0:Br(t)}function Xe(r){const t=xt(r);return t<0?0:t<zi?t:zi}function ye(r,t){if(!Te(r))throw F(Zn);const e=r.constructor;if(e===void 0)return t;if(!Te(e))throw F(xr);const i=e[oo];return i??t}function ue(r){if(Or(r))return!1;try{return mo(r,0,0),!1}catch{}return!0}function Gi(r,t){const e=Vt(r),i=Vt(t);if(e&&i)return 0;if(e)return 1;if(i||r<t)return-1;if(r>t)return 1;if(r===0&&t===0){const n=Wi(r,0),o=Wi(t,0);if(!n&&o)return-1;if(n&&!o)return 1}return 0}const mi=2,Pe=new Ne;function Xt(r){return Oo(Pe,r)||!go(r)&&Lo(r)}function S(r){if(!Xt(r))throw F(Jn)}function _e(r,t){const e=Xt(r),i=Be(r);if(!e&&!i)throw F(to);if(typeof t=="number"){let n;if(e){const o=B(r);n=M(o)}else n=M(r);if(n<t)throw F(eo)}if(qe(r))throw F(He)}function B(r){const t=ke(Pe,r);if(t!==void 0){const n=J(t);if(ue(n))throw F(ae);return t}const e=r.buffer;if(ue(e))throw F(ae);const i=ie(L,[e,r.byteOffset,r.length],r.constructor);return ke(Pe,i)}function Hi(r){const t=M(r),e=[];for(let i=0;i<t;++i)e[i]=z(r[i]);return e}const Rr=new Cr;for(const r of wr(tt)){if(r===ci)continue;const t=Ht(tt,r);wt(t,"get")&&typeof t.get=="function"&&Eo(Rr,t.get)}const Fo=uo({get(r,t,e){return $e(t)&&wt(r,t)?z(De(r,t)):Ao(Rr,so(r,t))?De(r,t):De(r,t,e)},set(r,t,e,i){return $e(t)&&wt(r,t)?Ni(r,t,yt(e)):Ni(r,t,e,i)},getOwnPropertyDescriptor(r,t){if($e(t)&&wt(r,t)){const e=Ht(r,t);return e.value=z(e.value),e}return Ht(r,t)},defineProperty(r,t,e){return $e(t)&&wt(r,t)&&wt(e,"value")&&(e.value=yt(e.value)),Oi(r,t,e)}});class L{constructor(t,e,i){let n;if(Xt(t))n=ie(ut,[B(t)],new.target);else if(Te(t)&&!Wo(t)){let a,s;if(Be(t)){a=t,s=M(t);const u=J(t);if(ue(u))throw F(ae);if(qe(t))throw F(He);const l=new Ae(s*mi);n=ie(ut,[l],new.target)}else{const u=t[_t];if(u!=null&&typeof u!="function")throw F(Ei);u!=null?Yi(t)?(a=t,s=t.length):(a=[...t],s=a.length):(a=t,s=Xe(a.length)),n=ie(ut,[s],new.target)}for(let u=0;u<s;++u)n[u]=yt(a[u])}else n=ie(ut,arguments,new.target);const o=new ro(n,Fo);return fi(Pe,o,n),o}static from(t,...e){const i=this;if(!Ve(i,Ie))throw F(Mi);if(i===L){if(Xt(t)&&e.length===0){const p=B(t),c=new ut(J(p),Mt(p),M(p));return new L(J(ee(c)))}if(e.length===0)return new L(J(Di(t,yt)));const u=e[0],l=e[1];return new L(J(Di(t,function(p,...c){return yt(ot(u,this,[p,...me(c)]))},l)))}let n,o;const a=t[_t];if(a!=null&&typeof a!="function")throw F(Ei);if(a!=null)Yi(t)?(n=t,o=t.length):Uo(t)?(n=t,o=M(t)):(n=[...t],o=n.length);else{if(t==null)throw F(Ge);n=jt(t),o=Xe(n.length)}const s=new i(o);if(e.length===0)for(let u=0;u<o;++u)s[u]=n[u];else{const u=e[0],l=e[1];for(let p=0;p<o;++p)s[p]=ot(u,l,[n[p],p])}return s}static of(...t){const e=this;if(!Ve(e,Ie))throw F(Mi);const i=t.length;if(e===L){const o=new L(i),a=B(o);for(let s=0;s<i;++s)a[s]=yt(t[s]);return o}const n=new e(i);for(let o=0;o<i;++o)n[o]=t[o];return n}keys(){S(this);const t=B(this);return wo(t)}values(){S(this);const t=B(this);return Ri((function*(){for(const e of vo(t))yield z(e)})())}entries(){S(this);const t=B(this);return Ri((function*(){for(const[e,i]of bo(t))yield[e,z(i)]})())}at(t){S(this);const e=B(this),i=M(e),n=xt(t),o=n>=0?n:i+n;if(!(o<0||o>=i))return z(e[o])}with(t,e){S(this);const i=B(this),n=M(i),o=xt(t),a=o>=0?o:n+o,s=+e;if(a<0||a>=n)throw Re(Le);const u=new ut(J(i),Mt(i),M(i)),l=new L(J(ee(u))),p=B(l);return p[a]=yt(s),l}map(t,...e){S(this);const i=B(this),n=M(i),o=e[0],a=ye(i,L);if(a===L){const u=new L(n),l=B(u);for(let p=0;p<n;++p){const c=z(i[p]);l[p]=yt(ot(t,o,[c,p,this]))}return u}const s=new a(n);_e(s,n);for(let u=0;u<n;++u){const l=z(i[u]);s[u]=ot(t,o,[l,u,this])}return s}filter(t,...e){S(this);const i=B(this),n=M(i),o=e[0],a=[];for(let l=0;l<n;++l){const p=z(i[l]);ot(t,o,[p,l,this])&&lo(a,p)}const s=ye(i,L),u=new s(a);return _e(u),u}reduce(t,...e){S(this);const i=B(this),n=M(i);if(n===0&&e.length===0)throw F(Ai);let o,a;e.length===0?(o=z(i[0]),a=1):(o=e[0],a=0);for(let s=a;s<n;++s)o=t(o,z(i[s]),s,this);return o}reduceRight(t,...e){S(this);const i=B(this),n=M(i);if(n===0&&e.length===0)throw F(Ai);let o,a;e.length===0?(o=z(i[n-1]),a=n-2):(o=e[0],a=n-1);for(let s=a;s>=0;--s)o=t(o,z(i[s]),s,this);return o}forEach(t,...e){S(this);const i=B(this),n=M(i),o=e[0];for(let a=0;a<n;++a)ot(t,o,[z(i[a]),a,this])}find(t,...e){S(this);const i=B(this),n=M(i),o=e[0];for(let a=0;a<n;++a){const s=z(i[a]);if(ot(t,o,[s,a,this]))return s}}findIndex(t,...e){S(this);const i=B(this),n=M(i),o=e[0];for(let a=0;a<n;++a){const s=z(i[a]);if(ot(t,o,[s,a,this]))return a}return-1}findLast(t,...e){S(this);const i=B(this),n=M(i),o=e[0];for(let a=n-1;a>=0;--a){const s=z(i[a]);if(ot(t,o,[s,a,this]))return s}}findLastIndex(t,...e){S(this);const i=B(this),n=M(i),o=e[0];for(let a=n-1;a>=0;--a){const s=z(i[a]);if(ot(t,o,[s,a,this]))return a}return-1}every(t,...e){S(this);const i=B(this),n=M(i),o=e[0];for(let a=0;a<n;++a)if(!ot(t,o,[z(i[a]),a,this]))return!1;return!0}some(t,...e){S(this);const i=B(this),n=M(i),o=e[0];for(let a=0;a<n;++a)if(ot(t,o,[z(i[a]),a,this]))return!0;return!1}set(t,...e){S(this);const i=B(this),n=xt(e[0]);if(n<0)throw Re(Le);if(t==null)throw F(Ge);if(qe(t))throw F(He);if(Xt(t))return ko(B(this),B(t),n);if(Be(t)){const u=J(t);if(ue(u))throw F(ae)}const o=M(i),a=jt(t),s=Xe(a.length);if(n===1/0||s+n>o)throw Re(Le);for(let u=0;u<s;++u)i[u+n]=yt(a[u])}reverse(){S(this);const t=B(this);return Ui(t),this}toReversed(){S(this);const t=B(this),e=new ut(J(t),Mt(t),M(t)),i=new L(J(ee(e))),n=B(i);return Ui(n),i}fill(t,...e){S(this);const i=B(this);return To(i,yt(t),...me(e)),this}copyWithin(t,e,...i){S(this);const n=B(this);return Bo(n,t,e,...me(i)),this}sort(t){S(this);const e=B(this),i=t!==void 0?t:Gi;return Li(e,(n,o)=>i(z(n),z(o))),this}toSorted(t){S(this);const e=B(this);if(t!==void 0&&typeof t!="function")throw new F(io);const i=t!==void 0?t:Gi,n=new ut(J(e),Mt(e),M(e)),o=new L(J(ee(n))),a=B(o);return Li(a,(s,u)=>i(z(s),z(u))),o}slice(t,e){S(this);const i=B(this),n=ye(i,L);if(n===L){const g=new ut(J(i),Mt(i),M(i));return new L(J(ee(g,t,e)))}const o=M(i),a=xt(t),s=e===void 0?o:xt(e);let u;a===-1/0?u=0:a<0?u=o+a>0?o+a:0:u=o<a?o:a;let l;s===-1/0?l=0:s<0?l=o+s>0?o+s:0:l=o<s?o:s;const p=l-u>0?l-u:0,c=new n(p);if(_e(c,p),p===0)return c;const d=J(i);if(ue(d))throw F(ae);let f=0;for(;u<l;)c[f]=z(i[u]),++u,++f;return c}subarray(t,e){S(this);const i=B(this),n=ye(i,L),o=new ut(J(i),Mt(i),M(i)),a=Io(o,t,e),s=new n(J(a),Mt(a),M(a));return _e(s),s}indexOf(t,...e){S(this);const i=B(this),n=M(i);let o=xt(e[0]);if(o===1/0)return-1;o<0&&(o+=n,o<0&&(o=0));for(let a=o;a<n;++a)if(wt(i,a)&&z(i[a])===t)return a;return-1}lastIndexOf(t,...e){S(this);const i=B(this),n=M(i);let o=e.length>=1?xt(e[0]):n-1;if(o===-1/0)return-1;o>=0?o=o<n-1?o:n-1:o+=n;for(let a=o;a>=0;--a)if(wt(i,a)&&z(i[a])===t)return a;return-1}includes(t,...e){S(this);const i=B(this),n=M(i);let o=xt(e[0]);if(o===1/0)return!1;o<0&&(o+=n,o<0&&(o=0));const a=Vt(t);for(let s=o;s<n;++s){const u=z(i[s]);if(a&&Vt(u)||u===t)return!0}return!1}join(t){S(this);const e=B(this),i=Hi(e);return co(i,t)}toLocaleString(...t){S(this);const e=B(this),i=Hi(e);return po(i,...me(t))}get[ci](){if(Xt(this))return"Float16Array"}}pe(L,"BYTES_PER_ELEMENT",{value:mi});pe(L,Ie,{});vr(L,pi);const Ce=L.prototype;pe(Ce,"BYTES_PER_ELEMENT",{value:mi});pe(Ce,_t,{value:Ce.values,writable:!0,configurable:!0});vr(Ce,tt);const Vi=new WeakMap;function Go(r,t){let e=Vi.get(r);e||(e=new Map,Vi.set(r,e));let i=e.get(t);if(!i){const n=r.createShaderModule({label:`oidn/webnn/input-pack/${t}`,code:jo(t)}),o=r.createShaderModule({label:"oidn/webnn/output-unpack",code:Ko()});i={input:r.createComputePipeline({label:`oidn/webnn/input-pack/${t}`,layout:"auto",compute:{module:n,entryPoint:"main"}}),output:r.createComputePipeline({label:"oidn/webnn/output-unpack",layout:"auto",compute:{module:o,entryPoint:"main"}})},e.set(t,i)}return i}const Pt=8;function Xr(r,t){return Math.ceil(r/t)*t}function Ho(r,t,e,i){const n=r.createBuffer({label:t,size:Xr(e.byteLength,4),usage:i,mappedAtCreation:!0});return new Uint8Array(n.getMappedRange()).set(new Uint8Array(e.buffer,e.byteOffset,e.byteLength)),n.unmap(),n}function ji(r,t,e){const i=new Uint32Array(Xr(e.length,4));return i.set(e),Ho(r,t,i,GPUBufferUsage.UNIFORM)}function Ye(r,t,e,i){return!!r?.[t]?.[e]?.dataTypes?.includes?.(i)}function Vo(r,t){if(t==="fp16"&&r.desc.dataType==="Float16")return new Uint8Array(r.data.buffer,r.data.byteOffset,r.data.byteLength);if(t==="fp32"&&r.desc.dataType==="Float32")return new Uint8Array(r.data.buffer,r.data.byteOffset,r.data.byteLength);const e=r.desc.dataType==="Float32"?new Float32Array(r.data.buffer,r.data.byteOffset,r.data.byteLength/4):new L(r.data.buffer,r.data.byteOffset,r.data.byteLength/2),i=t==="fp16"?new L(e):new Float32Array(e);return new Uint8Array(i.buffer,i.byteOffset,i.byteLength)}function jo(r){const t=Array.from({length:r},(i,n)=>`@group(0) @binding(${n}) var<storage, read> input${n}: array<vec4<f32>>;`).join(`
`),e=Array.from({length:r},(i,n)=>{const o=n*3;return`if (channel < ${o+3}u) {
      return input${n}[pixel][channel - ${o}u];
    }`}).join(`
  `);return`enable f16;
struct Params { width: u32, height: u32, channels: u32, padding: u32 }
${t}
@group(0) @binding(${r}) var<storage, read_write> outputData: array<f16>;
@group(0) @binding(${r+1}) var<uniform> params: Params;

fn readChannel(pixel: u32, channel: u32) -> f32 {
  ${e}
  return 0.0;
}

@compute @workgroup_size(${Pt}, ${Pt}, 1)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
  if (gid.x >= params.width || gid.y >= params.height || gid.z >= params.channels) {
    return;
  }
  let pixel = gid.y * params.width + gid.x;
  let outputIndex = (gid.z * params.height + gid.y) * params.width + gid.x;
  outputData[outputIndex] = f16(readChannel(pixel, gid.z));
}
`}function Ko(){return`enable f16;
struct Params { width: u32, height: u32, padding0: u32, padding1: u32 }
@group(0) @binding(0) var<storage, read> inputData: array<f16>;
@group(0) @binding(1) var<storage, read_write> outputData: array<vec4<f32>>;
@group(0) @binding(2) var<uniform> params: Params;

@compute @workgroup_size(${Pt}, ${Pt}, 1)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
  if (gid.x >= params.width || gid.y >= params.height) { return; }
  let pixel = gid.y * params.width + gid.x;
  let plane = params.width * params.height;
  outputData[pixel] = vec4<f32>(
    f32(inputData[pixel]),
    f32(inputData[plane + pixel]),
    f32(inputData[plane * 2u + pixel]),
    0.0
  );
}
`}function qo(r,t){if(t==="fp32")throw new Error("OIDN WebNN GPU interop currently requires FP16 exportable tensors");if(!r.features.has("shader-f16"))throw new Error("OIDN WebNN requires shader-f16 on the shared GPUDevice");return"fp16"}function Qo(r,t,e){return e==="relu"?r.relu(t):t}class Zo{_device;_model;precision;support;_context;_builderConstructor;_shapeCache=new Map;_shapePromises=new Map;_retiredExecutions=new Set;_pendingCreationCount=0;_shapeCacheSize;_clock=0;_inputPipeline;_outputPipeline;_resources=new pr;_disposed=!1;constructor(t,e,i={}){this._device=t,this._model=e,this.precision=qo(t,i.precision??"auto"),this._shapeCacheSize=Math.max(1,i.shapeCacheSize??2),this.support={available:!1,fp16Conv:!1,gpuInterop:!1};const n=Go(t,e.inputChannels/3);this._inputPipeline=n.input,this._outputPipeline=n.output}async prepare(){if(this._disposed)throw new Error("OIDN WebNN executor is disposed");const t=globalThis.navigator?.ml,e=globalThis.MLGraphBuilder;if(!t?.createContext||typeof e!="function")throw this.support.reason="WebNN is not exposed by this browser",new Error(this.support.reason);this._builderConstructor=e;try{try{this._context=await t.createContext({deviceType:"gpu",powerPreference:"high-performance"})}catch{this._context=await t.createContext({deviceType:"gpu"})}if(this._resources.track("ml-context",this._context),this._disposed)throw new Error("OIDN WebNN executor is disposed");if(typeof this._context.createExportableTensor!="function"||typeof this._context.exportToGPU!="function")throw this.support.reason="WebNN WebGPU tensor interop is unavailable",new Error(this.support.reason);const i=this._context.opSupportLimits?.()??{};if(this.support.fp16Conv=Ye(i,"conv2d","input","float16")&&Ye(i,"conv2d","filter","float16")&&Ye(i,"conv2d","output","float16"),!this.support.fp16Conv)throw this.support.reason="WebNN does not support FP16 conv2d",new Error(this.support.reason);let n,o;try{n=this._resources.track("ml-tensor",await this._context.createExportableTensor({dataType:"float16",shape:[4]},this._device)),o=this._resources.track("gpu-buffer",await this._context.exportToGPU(n)),this.support.gpuInterop=!0}catch(a){throw this.support.reason=`WebNN FP16 WebGPU interop failed: ${String(a)}`,new Error(this.support.reason)}finally{this._releaseBuffer(o),this._releaseTensor(n)}this.support.available=!0}catch(i){throw this._releaseContext(),i}}_constant(t,e){return t.constant({dataType:"float16",shape:[...e.desc.dims]},Vo(e,this.precision))}async _createExecution(t,e){if(this._disposed)throw new Error("OIDN WebNN executor is disposed");const i=new this._builderConstructor(this._context),n=new Map,o=new Map;n.set(this._model.spec.input,i.input("input",{dataType:"float16",shape:[1,this._model.inputChannels,e,t]})),o.set(this._model.spec.input,[this._model.inputChannels,e,t]);for(const d of this._model.spec.nodes){let f,g;if(d.op==="conv2d"){const h=o.get(d.input),y=this._model.convTensors.get(d.id),$=i.conv2d(n.get(d.input),this._constant(i,y.weight),{bias:this._constant(i,y.bias),padding:[1,1,1,1],inputLayout:"nchw",filterLayout:"oihw"});f=Qo(i,$,d.activation),g=[y.outputChannels,h[1],h[2]]}else if(d.op==="maxPool2d"){const h=o.get(d.input);f=i.maxPool2d(n.get(d.input),{windowDimensions:[2,2],strides:[2,2],padding:[0,h[1]%2,0,h[2]%2],layout:"nchw"}),g=[h[0],Math.ceil(h[1]/2),Math.ceil(h[2]/2)]}else if(d.op==="upsample2d"){const h=o.get(d.input);f=i.resample2d(n.get(d.input),{mode:"nearest-neighbor",axes:[2,3],scales:[2,2]}),g=[h[0],h[1]*2,h[2]*2]}else{const h=d.inputs.map(y=>o.get(y));if(h.some(y=>y[1]!==h[0][1]||y[2]!==h[0][2]))throw new Error(`WebNN concat ${d.id} has mismatched spatial shapes`);f=i.concat(d.inputs.map(y=>n.get(y)),1),g=[h.reduce((y,$)=>y+$[0],0),h[0][1],h[0][2]]}n.set(d.id,f),o.set(d.id,g)}let a,s,u,l,p,c;try{return a=this._resources.track("ml-graph",await i.build({output:n.get(this._model.spec.output)})),s=this._resources.track("ml-tensor",await this._context.createExportableTensor({dataType:"float16",shape:[1,this._model.inputChannels,e,t],writable:!0},this._device)),u=this._resources.track("ml-tensor",await this._context.createExportableTensor({dataType:"float16",shape:[1,this._model.outputChannels,e,t],readable:!0},this._device)),l=this._resources.track("gpu-buffer",this._device.createBuffer({label:`oidn/webnn/output/${t}x${e}`,size:t*e*4*4,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST})),p=this._resources.track("gpu-buffer",ji(this._device,`oidn/webnn/input/${t}x${e}`,[t,e,this._model.inputChannels])),c=this._resources.track("gpu-buffer",ji(this._device,`oidn/webnn/output/${t}x${e}`,[t,e])),{graph:a,inputTensor:s,outputTensor:u,outputBuffer:l,inputUniform:p,outputUniform:c,width:t,height:e,lastUsed:++this._clock}}catch(d){throw this._releaseBuffer(c),this._releaseBuffer(p),this._releaseBuffer(l),this._releaseTensor(u),this._releaseTensor(s),this._releaseGraph(a),d}}async _execution(t,e){const i=`${t}x${e}`;let n=this._shapeCache.get(i);if(!n){let o=this._shapePromises.get(i);o||(o=(async()=>{this._pendingCreationCount++;try{return await this._createExecution(t,e)}finally{this._pendingCreationCount--}})(),this._shapePromises.set(i,o));try{if(n=await o,this._disposed)throw this._destroyExecution(n),new Error("OIDN WebNN executor is disposed");this._shapeCache.set(i,n)}finally{this._shapePromises.get(i)===o&&this._shapePromises.delete(i)}if(this._shapeCache.size>this._shapeCacheSize){const a=[...this._shapeCache.entries()].filter(([s])=>s!==i).sort((s,u)=>s[1].lastUsed-u[1].lastUsed)[0];a&&(this._shapeCache.delete(a[0]),this._retireExecution(a[1]))}}return n.lastUsed=++this._clock,n}async prewarm(t){for(const e of t)await this._execution(e.width,e.height)}async execute(t,e,i){const n=this._model.inputChannels/3;if(t.length!==n)throw new Error(`OIDN WebNN expected ${n} input buffers, got ${t.length}`);const o=await this._execution(e,i),a=this._resources.track("gpu-buffer",await this._context.exportToGPU(o.inputTensor));try{const u=t.map((d,f)=>({binding:f,resource:{buffer:d}}));u.push({binding:n,resource:{buffer:a}}),u.push({binding:n+1,resource:{buffer:o.inputUniform}});const l=this._device.createBindGroup({label:"oidn/webnn/input-bindings",layout:this._inputPipeline.getBindGroupLayout(0),entries:u}),p=this._device.createCommandEncoder({label:"oidn/webnn/input-pack"}),c=p.beginComputePass();c.setPipeline(this._inputPipeline),c.setBindGroup(0,l),c.dispatchWorkgroups(Math.ceil(e/Pt),Math.ceil(i/Pt),this._model.inputChannels),c.end(),this._device.queue.submit([p.finish()])}finally{this._releaseBuffer(a)}this._context.dispatch(o.graph,{input:o.inputTensor},{output:o.outputTensor});const s=this._resources.track("gpu-buffer",await this._context.exportToGPU(o.outputTensor));try{const u=this._device.createBindGroup({label:"oidn/webnn/output-bindings",layout:this._outputPipeline.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:s}},{binding:1,resource:{buffer:o.outputBuffer}},{binding:2,resource:{buffer:o.outputUniform}}]}),l=this._device.createCommandEncoder({label:"oidn/webnn/output-unpack"}),p=l.beginComputePass();p.setPipeline(this._outputPipeline),p.setBindGroup(0,u),p.dispatchWorkgroups(Math.ceil(e/Pt),Math.ceil(i/Pt)),p.end(),this._device.queue.submit([l.finish()])}finally{this._releaseBuffer(s)}return o.outputBuffer}async executeCPU(t,e,i){const n=await this._execution(e,i),o=e*i,a=new L(o*this._model.inputChannels);for(let l=0;l<o;l++)for(let p=0;p<this._model.inputChannels;p++)a[p*o+l]=t[l*this._model.inputChannels+p];this._context.writeTensor(n.inputTensor,a),this._context.dispatch(n.graph,{input:n.inputTensor},{output:n.outputTensor});const s=new L(await this._context.readTensor(n.outputTensor)),u=new Float32Array(o*this._model.outputChannels);for(let l=0;l<o;l++)for(let p=0;p<this._model.outputChannels;p++)u[l*this._model.outputChannels+p]=s[p*o+l];return u}_destroyExecution(t){this._releaseGraph(t.graph),this._releaseTensor(t.inputTensor),this._releaseTensor(t.outputTensor),this._releaseBuffer(t.outputBuffer),this._releaseBuffer(t.inputUniform),this._releaseBuffer(t.outputUniform)}_retireExecution(t){this._retiredExecutions.add(t),this._device.queue.onSubmittedWorkDone().catch(()=>{}).then(()=>{this._retiredExecutions.delete(t),this._destroyExecution(t)})}_releaseBuffer(t){this._resources.release("gpu-buffer",t,()=>t.destroy())}_releaseTensor(t){this._resources.release("ml-tensor",t,()=>t.destroy())}_releaseGraph(t){this._resources.release("ml-graph",t,()=>t.destroy?.())}_releaseContext(){this._resources.release("ml-context",this._context,()=>this._context.destroy?.())}getResourceInfo(){return this._resources.snapshot(this._pendingCreationCount+this._retiredExecutions.size)}dispose(){if(!this._disposed){this._disposed=!0;for(const t of this._shapeCache.values())this._destroyExecution(t);this._shapeCache.clear();for(const t of this._retiredExecutions)this._destroyExecution(t);this._retiredExecutions.clear(),this._shapePromises.clear(),this._releaseContext()}}}const Jo=100;function Et(r,t){return Math.ceil(r/t)*t}function xe(r){return r.data instanceof GPUBuffer||r.data instanceof GPUTexture}class ta{_device;_aux;_hdr;_hdrTransfer;_dataProcessGPU;_nativeExecutor;_webNNExecutor;_modelSpec;_inputChannels;_engine;_dynamicTileController;_lastExecution;_profileNextImage=!1;_lastImageProfile;_activeExecutionFailures=new Set;_deviceLostObserved=!1;_deviceLostSettled=!1;_deviceLostReason;constructor(t,e,i={}){this._aux=i.aux||!1,this._hdr=i.hdr||!1,this._hdrTransfer=i.hdrTransfer??"pu",this._engine=i.engine??"auto";const n=i.modelSpec??cr(t),o=fn(t,n);this._modelSpec=o.spec,this._inputChannels=o.inputChannels;const a=this._aux?9:3;if(o.inputChannels!==a)throw new Error(`OIDN model expects ${o.inputChannels} input channels, but aux=${this._aux} provides ${a}`);this._dynamicTileController=new ln(i.maxTileSize??512,i.dynamicTile),this._device=e,this._observeDeviceLoss(),this._engine==="webnn"?this._webNNExecutor=new Zo(this._device,o,{precision:i.precision}):this._nativeExecutor=new Qn(this._device,o,{precision:i.precision,kernel:i.kernel,gemm:i.gemm,subgroupMatrix:i.subgroupMatrix})}getDevice(){return this._device}async prepare(){if(this._webNNExecutor){await this._webNNExecutor.prepare();const t=Et(this._modelSpec.receptiveField/2,Q),e=[this._dynamicTileController.tileSize,this._dynamicTileController.minTileSize];await this._webNNExecutor.prewarm([...new Set(e)].map(i=>({width:i+2*t,height:i+2*t})));return}await this._nativeExecutor.prepare()}async prepareForImage(t,e,i={}){const n=Et(this._modelSpec.receptiveField/2,Q),o=i.tileOverlap===void 0?n:Et(Math.max(0,i.tileOverlap),Q),a=xi(t,e,i.wholeImage?Et(Math.max(t,e),Q):this._dynamicTileController.tileSize,o),s=[...new Map(a.tiles.map(({input:u})=>[`${u.width}x${u.height}`,{width:u.width,height:u.height}])).values()];await this._webNNExecutor?.prewarm(s),this._nativeExecutor?.prewarm(s)}getRuntimeInfo(){return{configuredEngine:this._engine,gpuEngine:this._webNNExecutor?"webnn":"wgsl",precision:(this._webNNExecutor??this._nativeExecutor).precision,kernel:this._nativeExecutor?{configured:this._nativeExecutor.kernelSetting,gemm:this._nativeExecutor.gemm,maxSpatialInputBlocks:this._nativeExecutor.maxSpatialInputBlocks,subgroupsAvailable:this._nativeExecutor.subgroupsAvailable,subgroupMatrix:this._nativeExecutor.subgroupMatrix}:void 0,webnn:this._webNNExecutor?.support,resources:(this._webNNExecutor??this._nativeExecutor).getResourceInfo(),model:this._modelSpec.id,modelFamily:this._modelSpec.family,inputChannels:this._inputChannels,hdrTransfer:this._hdrTransfer,dynamicTile:{enabled:this._dynamicTileController.enabled,currentTileSize:this._dynamicTileController.tileSize,minTileSize:this._dynamicTileController.minTileSize,maxTileSize:this._dynamicTileController.maxTileSize,targetTileTimeMs:this._dynamicTileController.targetTileTimeMs},lastExecution:this._lastExecution,activeExecutionCount:this._activeExecutionFailures.size}}_observeDeviceLoss(){if(this._activeExecutionFailures??=new Set,this._deviceLostObserved)return;this._deviceLostObserved=!0;const t=this._device.lost;if(!t)return;const e=i=>{if(this._deviceLostSettled)return;this._deviceLostSettled=!0,this._deviceLostReason=i;const n=[...this._activeExecutionFailures];this._activeExecutionFailures.clear();for(const o of n)o(i)};t.then(i=>e(new Error(`WebGPU device lost: ${i.message}`)),e)}_registerExecutionFailure(t){return this._observeDeviceLoss(),this._activeExecutionFailures.add(t),this._deviceLostSettled&&(this._activeExecutionFailures.delete(t),queueMicrotask(()=>t(this._deviceLostReason))),()=>this._activeExecutionFailures.delete(t)}profileNextExecution(){return!this._nativeExecutor||!this._device.features.has("timestamp-query")?!1:(this._profileNextImage=!0,!0)}getLastExecutionProfile(){return this._lastImageProfile?Promise.resolve(this._lastImageProfile):void 0}_processImageData(t,e,i,n){const o=t.data,a=o.length/4,s=this._aux?9:3,u=new Float32Array(a*s);if(e&&!i||i&&!e)throw new Error("Normal map and albedo map are both required");if(e&&i&&(e.width!==i.width||e.height!==i.height||t.width!==e.width||t.height!==e.height))throw new Error("Image size mismatch");const l=e?.data,p=i?.data,c=l instanceof Float32Array?1:255,d=p instanceof Float32Array?1:255;for(let f=0;f<o.length;f+=4){const g=f/4*s;for(let h=0;h<3;h++)n?u[g+h]=o[f+h]:u[g+h]=o[f+h]/255,l&&(u[g+h+3]=l[f+h]/c),p&&(u[g+h+6]=p[f+h]/d)}return u}_readTile(t,e,i,n){const o=new Float32Array(i.width*i.height*e),a=t.length/(n*e);for(let s=0;s<i.height;s++)for(let u=0;u<i.width;u++){const l=Math.min(n-1,u+i.x),c=(Math.min(a-1,s+i.y)*n+l)*e,d=(s*i.width+u)*e;for(let f=0;f<e;f++)o[d+f]=t[c+f]}return o}_writeTile(t,e,i,n,o,a){const{data:s,width:u}=t,l=i.x-e.x,p=i.y-e.y;for(let c=0;c<i.height;c++)for(let d=0;d<i.width;d++){const f=((c+p)*o+d+l)*3,g=((c+i.y)*u+(d+i.x))*4;for(let h=0;h<3;h++)a?s[g+h]=n[f+h]:s[g+h]=Math.min(Math.max(n[f+h]*255,0),255);t.data[g+3]=a?1:255}}async _executeTile(t,e,i,n,o,a,s,u,l){const p=this._aux?9:3,c=new We(n.input.x,n.input.y,n.input.width,n.input.height),d=new We(n.output.x,n.output.y,n.output.width,n.output.height),f=c.width,g=c.height;let h,y,$=1;const x=this._device;let _=this._dataProcessGPU;if(t instanceof Float32Array){let m=this._readTile(t,p,c,a);u&&($=tn({data:m,channels:p}),m=Zr({data:m,channels:p,inputScale:$,transfer:this._hdrTransfer})),y=await(this._webNNExecutor??this._nativeExecutor).executeCPU(m,f,g)}else{_||(_=this._dataProcessGPU=new nn(x,u,this._hdrTransfer)),_.setImageSize(a,s),_.setInputTile(c),o&&_.copyInputDataToOutput(t.color);const{color:m,albedo:v,normal:w}=_.forward(t.color,this._aux?t.albedo:void 0,this._aux?t.normal:void 0,l);h=await(this._webNNExecutor??this._nativeExecutor).execute(this._aux?[m,v,w]:[m],f,g)}let b;if(t instanceof Float32Array){u&&(y=Jr({data:y,channels:3,inputScale:$,transfer:this._hdrTransfer})),this._writeTile(i,c,d,y,c.width,u);for(let m=0;m<d.height;m++)for(let v=0;v<d.width;v++){const w=(m*d.width+v)*4,k=((m+d.y)*a+(v+d.x))*4;for(let I=0;I<4;I++)e.data[w+I]=i.data[k+I]}}else _.setOutputTile(d,c),b=_.inverse(h,t.color);return b}tileExecute({color:t,albedo:e,normal:i,done:n,progress:o,denoiseAlpha:a,tileOverlap:s,wholeImage:u,scheduling:l="event-loop",error:p}){if(this._aux&&(!e||!i))throw new Error("Normal map and albedo map are both required");if(!this._aux&&(e||i))throw new Error("Normal map and albedo map are not required");const c=t.width,d=t.height,f=this._dynamicTileController.tileSize,g=u?Et(Math.max(c,d),Q):f,h=Et(this._modelSpec.receptiveField/2,Q),y=s===void 0?h:Et(Math.max(0,s),Q),$=xi(c,d,g,y),x=$.tiles.length>1,_=this._hdr||!1;let b;xe(t)||(b=this._processImageData(t,e,i,_));function m(R,V){return _?{data:new Float32Array(R*V*4),width:R,height:V}:new ImageData(R,V)}const v=xe(t)?void 0:m(c,d);let w="active",k,I,P=()=>!1;const T=()=>typeof performance>"u"?Date.now():performance.now(),W=T(),j=[],nt=this._profileNextImage===!0;this._profileNextImage=!1;const it=new Map,pt=()=>{k!==void 0&&(clearTimeout(k),k=void 0),I!==void 0&&typeof cancelAnimationFrame<"u"&&(cancelAnimationFrame(I),I=void 0)},K=R=>{console.error("OIDN error callback failed",R)},et=R=>{if(w==="active")if(w="settled",pt(),P(),p)try{Promise.resolve(p(R)).catch(K)}catch(V){K(V)}else console.error("OIDN execution failed",R)},bt=R=>{if(l==="event-loop"||typeof requestAnimationFrame>"u")k=setTimeout(()=>{k=void 0,R()},0);else{const V=()=>{pt(),R()};I=requestAnimationFrame(V),k=setTimeout(V,Jo)}},Wt=async R=>{if(w!=="active")return;const V=$.tiles[R],Ct=xe(t)?void 0:m(V.output.width,V.output.height),Ut=T();nt&&this._nativeExecutor.profileNextExecution();const Lt=await this._executeTile(xe(t)?{color:t.data,albedo:e?.data,normal:i?.data}:b,Ct,v,V,R===0,c,d,_,a);if(nt){const U=await this._nativeExecutor.getLastExecutionProfile();for(const G of U?.layers??[])it.set(G.id,(it.get(G.id)??0)+G.durationMs)}if(w!=="active")return;const Dt=v||{data:Lt,width:c,height:d};if(o&&await o(Dt,Ct,new We(V.output.x,V.output.y,V.output.width,V.output.height),R,$.tiles.length),w!=="active")return;const A=R+1<$.tiles.length;if(await this._device.queue.onSubmittedWorkDone(),w!=="active")return;await(async()=>{if(j.push(T()-Ut),w==="active")if(A)bt(()=>{w==="active"&&Wt(R+1).catch(et)});else{const U=[...j].sort((kt,gt)=>kt-gt),G=Math.floor(U.length/2),St=U.length%2?U[G]:(U[G-1]+U[G])/2;if(this._lastExecution={width:c,height:d,tileCount:$.tiles.length,tileColumns:$.columns,tileRows:$.rows,tileOverlap:$.overlap,inputPixelCount:$.inputPixelCount,inputShapeCount:$.inputShapeCount,durationMs:T()-W,tileTimeMs:{min:U[0],median:St,mean:U.reduce((kt,gt)=>kt+gt,0)/U.length,max:U[U.length-1]}},x&&this._dynamicTileController.observe(j),P(),nt){const kt=[...it].map(([gt,Zt])=>({id:gt,durationMs:Zt}));this._lastImageProfile={totalMs:kt.reduce((gt,Zt)=>gt+Zt.durationMs,0),layers:kt}}await n(Dt),w==="active"&&(w="settled")}})()};return P=this._registerExecutionFailure(et),Wt(0).catch(et),()=>{w==="active"&&(w="aborted",pt(),P())}}dispose(){this._dataProcessGPU?.dispose(),this._nativeExecutor?.dispose(),this._webNNExecutor?.dispose()}}async function ea(){if(!navigator.gpu)throw new Error("WebGPU is not available");const r={powerPreference:"high-performance"},t=await navigator.gpu.requestAdapter(r);if(!t)throw new Error("No WebGPU adapter is available");const e={},i=[];t.features.has("timestamp-query")&&i.push("timestamp-query"),t.features.has("bgra8unorm-storage")&&i.push("bgra8unorm-storage"),t.features.has("shader-f16")&&i.push("shader-f16");for(const o of["subgroups","chromium-experimental-subgroup-matrix"])t.features.has(o)&&i.push(o);e.requiredFeatures=i;const n=t.limits;return e.requiredLimits={maxComputeWorkgroupStorageSize:n.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:n.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:n.maxStorageBufferBindingSize,maxBufferSize:n.maxBufferSize,maxComputeWorkgroupSizeX:n.maxComputeWorkgroupSizeX,maxComputeInvocationsPerWorkgroup:n.maxComputeInvocationsPerWorkgroup},t.requestDevice(e)}async function ia(r,t,e){const i=t?.device??await ea(),n=Vr(r),o=new ta(n,i,e);return await o.prepare(),o}async function oa(r,t,e){return fetch(r).then(i=>i.arrayBuffer()).then(i=>ia(i,t,e))}export{ia as a,oa as i};
