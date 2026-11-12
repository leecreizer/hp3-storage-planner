import{B as xe,M as U,a as at,V as F,L as ke,P as ia,b as Y,T as Se,c as gs,D as ra,R as cr,d as sa,F as er,S as K,w as ur,e as A,f as dr,N as xs,g as lt,h as yo,C as bo,u as ht,i as Ke,m as wo,j as bi,G as _o,s as O,k as z,l as hr,t as pe,n as re,v as fr,o as pr,p as $,q as So,r as fi,x as vs,y as To,z as Ie,A as Ce,E as Xe,H as Ve,I as Io,J as tr,K as Et,O as Ee,Q as ve,U as Ne,W as de,X as ue,Y as Qe,Z as ir,$ as Co,a0 as na,a1 as kt,a2 as aa,a3 as Ro,a4 as Po,a5 as ys,a6 as oa,a7 as Do,a8 as rr,a9 as Vs,aa as Mo,ab as Ao,ac as la,ad as ai,ae as Lo,af as Fo,ag as Bo,ah as $o,ai as Hs,aj as No,ak as Eo,al as zo,am as ko,an as Vo,ao as Os,ap as Ho,aq as Oo,ar as Uo,as as ca,at as bs,au as ua,av as Wo,aw as qo,ax as Go,ay as jo,az as Qo,aA as Ko,aB as Xo,aC as Us,aD as Yo}from"./index-ZIGozY9A.js";import{i as Zo}from"./main-CnVK-bUC.js";const da=0,Jo=1,Vt=2,Mr=0,Ws=1,qs=2,Ar=1.25,Gs=1,Z=32,k=Z/4,ws=65535,Yi=Math.pow(2,-24),pi=Symbol("SKIP_GENERATION"),ha={strategy:da,maxDepth:40,targetLeafSize:10,useSharedArrayBuffer:!1,setBoundingBox:!0,onProgress:null,indirect:!1,verbose:!0,range:null,[pi]:!1};function X(a,e,t){return t.min.x=e[a],t.min.y=e[a+1],t.min.z=e[a+2],t.max.x=e[a+3],t.max.y=e[a+4],t.max.z=e[a+5],t}function Yr(a){let e=-1,t=-1/0;for(let i=0;i<3;i++){const r=a[i+3]-a[i];r>t&&(t=r,e=i)}return e}function js(a,e){e.set(a)}function Qs(a,e,t){let i,r;for(let n=0;n<3;n++){const s=n+3;i=a[n],r=e[n],t[n]=i<r?i:r,i=a[s],r=e[s],t[s]=i>r?i:r}}function wi(a,e,t){for(let i=0;i<3;i++){const r=e[a+2*i],n=e[a+2*i+1],s=r-n,o=r+n;s<t[i]&&(t[i]=s),o>t[i+3]&&(t[i+3]=o)}}function Qt(a){const e=a[3]-a[0],t=a[4]-a[1],i=a[5]-a[2];return 2*(e*t+t*i+i*e)}function j(a,e){return e[a+15]===ws}function ie(a,e){return e[a+6]}function ne(a,e){return e[a+14]}function J(a){return a+k}function ee(a,e){const t=e[a+6];return a+t*k}function _s(a,e){return e[a+7]}function Lr(a,e,t,i,r){let n=1/0,s=1/0,o=1/0,l=-1/0,d=-1/0,c=-1/0,u=1/0,h=1/0,f=1/0,p=-1/0,y=-1/0,v=-1/0;const w=a.offset||0;for(let m=(e-w)*6,x=(e+t-w)*6;m<x;m+=6){const g=a[m+0],b=a[m+1],S=g-b,_=g+b;S<n&&(n=S),_>l&&(l=_),g<u&&(u=g),g>p&&(p=g);const I=a[m+2],P=a[m+3],T=I-P,D=I+P;T<s&&(s=T),D>d&&(d=D),I<h&&(h=I),I>y&&(y=I);const C=a[m+4],M=a[m+5],B=C-M,N=C+M;B<o&&(o=B),N>c&&(c=N),C<f&&(f=C),C>v&&(v=C)}i[0]=n,i[1]=s,i[2]=o,i[3]=l,i[4]=d,i[5]=c,r[0]=u,r[1]=h,r[2]=f,r[3]=p,r[4]=y,r[5]=v}const Be=32,el=(a,e)=>a.candidate-e.candidate,Oe=new Array(Be).fill().map(()=>({count:0,bounds:new Float32Array(6),rightCacheBounds:new Float32Array(6),leftCacheBounds:new Float32Array(6),candidate:0})),_i=new Float32Array(6);function tl(a,e,t,i,r,n){let s=-1,o=0;if(n===da)s=Yr(e),s!==-1&&(o=(e[s]+e[s+3])/2);else if(n===Jo)s=Yr(a),s!==-1&&(o=il(t,i,r,s));else if(n===Vt){const l=Qt(a);let d=Ar*r;const c=t.offset||0,u=(i-c)*6,h=(i+r-c)*6;for(let f=0;f<3;f++){const p=e[f],w=(e[f+3]-p)/Be;if(r<Be/4){const m=[...Oe];m.length=r;let x=0;for(let b=u;b<h;b+=6,x++){const S=m[x];S.candidate=t[b+2*f],S.count=0;const{bounds:_,leftCacheBounds:I,rightCacheBounds:P}=S;for(let T=0;T<3;T++)P[T]=1/0,P[T+3]=-1/0,I[T]=1/0,I[T+3]=-1/0,_[T]=1/0,_[T+3]=-1/0;wi(b,t,_)}m.sort(el);let g=r;for(let b=0;b<g;b++){const S=m[b];for(;b+1<g&&m[b+1].candidate===S.candidate;)m.splice(b+1,1),g--}for(let b=u;b<h;b+=6){const S=t[b+2*f];for(let _=0;_<g;_++){const I=m[_];S>=I.candidate?wi(b,t,I.rightCacheBounds):(wi(b,t,I.leftCacheBounds),I.count++)}}for(let b=0;b<g;b++){const S=m[b],_=S.count,I=r-S.count,P=S.leftCacheBounds,T=S.rightCacheBounds;let D=0;_!==0&&(D=Qt(P)/l);let C=0;I!==0&&(C=Qt(T)/l);const M=Gs+Ar*(D*_+C*I);M<d&&(s=f,d=M,o=S.candidate)}}else{for(let g=0;g<Be;g++){const b=Oe[g];b.count=0,b.candidate=p+w+g*w;const S=b.bounds;for(let _=0;_<3;_++)S[_]=1/0,S[_+3]=-1/0}for(let g=u;g<h;g+=6){let _=~~((t[g+2*f]-p)/w);_>=Be&&(_=Be-1);const I=Oe[_];I.count++,wi(g,t,I.bounds)}const m=Oe[Be-1];js(m.bounds,m.rightCacheBounds);for(let g=Be-2;g>=0;g--){const b=Oe[g],S=Oe[g+1];Qs(b.bounds,S.rightCacheBounds,b.rightCacheBounds)}let x=0;for(let g=0;g<Be-1;g++){const b=Oe[g],S=b.count,_=b.bounds,P=Oe[g+1].rightCacheBounds;S!==0&&(x===0?js(_,_i):Qs(_,_i,_i)),x+=S;let T=0,D=0;x!==0&&(T=Qt(_i)/l);const C=r-x;C!==0&&(D=Qt(P)/l);const M=Gs+Ar*(T*x+D*C);M<d&&(s=f,d=M,o=b.candidate)}}}}else console.warn(`BVH: Invalid build strategy value ${n} used.`);return{axis:s,pos:o}}function il(a,e,t,i){let r=0;const n=a.offset;for(let s=e,o=e+t;s<o;s++)r+=a[(s-n)*6+i*2];return r/t}class Fr{constructor(){this.boundingData=new Float32Array(6)}}function rl(a,e,t,i,r,n){let s=i,o=i+r-1;const l=n.pos,d=n.axis*2,c=t.offset||0;for(;;){for(;s<=o&&t[(s-c)*6+d]<l;)s++;for(;s<=o&&t[(o-c)*6+d]>=l;)o--;if(s<o){for(let u=0;u<e;u++){let h=a[s*e+u];a[s*e+u]=a[o*e+u],a[o*e+u]=h}for(let u=0;u<6;u++){const h=s-c,f=o-c,p=t[h*6+u];t[h*6+u]=t[f*6+u],t[f*6+u]=p}s++,o--}else return s}}let fa,Zi,Zr,pa;const sl=Math.pow(2,32);function Jr(a){return"count"in a?1:1+Jr(a.left)+Jr(a.right)}function nl(a,e,t){return fa=new Float32Array(t),Zi=new Uint32Array(t),Zr=new Uint16Array(t),pa=new Uint8Array(t),es(a,e)}function es(a,e){const t=a/4,i=a/2,r="count"in e,n=e.boundingData;for(let s=0;s<6;s++)fa[t+s]=n[s];if(r)return e.buffer?(pa.set(new Uint8Array(e.buffer),a),a+e.buffer.byteLength):(Zi[t+6]=e.offset,Zr[i+14]=e.count,Zr[i+15]=ws,a+Z);{const{left:s,right:o,splitAxis:l}=e,d=a+Z;let c=es(d,s);const u=a/Z,f=c/Z-u;if(f>sl)throw new Error("MeshBVH: Cannot store relative child node offset greater than 32 bits.");return Zi[t+6]=f,Zi[t+7]=l,es(c,o)}}function al(a,e,t,i,r,n){const{maxDepth:s,verbose:o,targetLeafSize:l,_strictLeafSize:d=1/0,strategy:c,onProgress:u}=r,h=a.primitiveBuffer,f=a.primitiveBufferStride,p=new Float32Array(6);let y=!1;const v=new Fr;return Lr(e,t,i,v.boundingData,p),m(v,t,i,p),v;function w(x){u&&u((x-n.offset)/n.count)}function m(x,g,b,S=null,_=0){!y&&_>=s&&(y=!0,o&&console.warn(`BVH: Max depth of ${s} reached when generating BVH. Consider increasing maxDepth.`));const I=b>d;if(b<=l&&!I||_>=s)return w(g+b),x.offset=g,x.count=b,x;const P=tl(x.boundingData,S,e,g,b,c);let T=P.axis===-1?-1:rl(h,f,e,g,b,P);if(P.axis===-1||T===g||T===g+b){if(!I)return w(g+b),x.offset=g,x.count=b,x;P.axis=Math.max(0,Yr(x.boundingData)),T=g+Math.max(1,Math.floor(b/2))}x.splitAxis=P.axis;const D=new Fr,C=g,M=T-g;x.left=D,Lr(e,C,M,D.boundingData,p),m(D,C,M,p,_+1);const B=new Fr,N=T,G=b-M;return x.right=B,Lr(e,N,G,B.boundingData,p),m(B,N,G,p,_+1),x}}function ol(a,e){const t=e.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,i=a.getRootRanges(e.range),r=i[0],n=i[i.length-1],s={offset:r.offset,count:n.offset+n.count-r.offset},o=new Float32Array(6*s.count);o.offset=s.offset,a.computePrimitiveBounds(s.offset,s.count,o),a._roots=i.map(l=>{const d=al(a,o,l.offset,l.count,e,s),c=Jr(d),u=new t(Z*c);return nl(0,d,u),u})}class Ss{constructor(e){this._getNewPrimitive=e,this._primitives=[]}getPrimitive(){const e=this._primitives;return e.length===0?this._getNewPrimitive():e.pop()}releasePrimitive(e){this._primitives.push(e)}}class ll{constructor(){this.float32Array=null,this.uint16Array=null,this.uint32Array=null;const e=[];let t=null;this.setBuffer=i=>{t&&e.push(t),t=i,this.float32Array=new Float32Array(i),this.uint16Array=new Uint16Array(i),this.uint32Array=new Uint32Array(i)},this.clearBuffer=()=>{t=null,this.float32Array=null,this.uint16Array=null,this.uint32Array=null,e.length!==0&&this.setBuffer(e.pop())}}}const Q=new ll;let Ge,Ft;const _t=[],Si=new Ss(()=>new xe);function cl(a,e,t,i,r,n){Ge=Si.getPrimitive(),Ft=Si.getPrimitive(),_t.push(Ge,Ft),Q.setBuffer(a._roots[e]);const s=ts(0,a.geometry,t,i,r,n);Q.clearBuffer(),Si.releasePrimitive(Ge),Si.releasePrimitive(Ft),_t.pop(),_t.pop();const o=_t.length;return o>0&&(Ft=_t[o-1],Ge=_t[o-2]),s}function ts(a,e,t,i,r=null,n=0,s=0){const{float32Array:o,uint16Array:l,uint32Array:d}=Q;let c=a*2;if(j(c,l)){const h=ie(a,d),f=ne(c,l);return X(a,o,Ge),i(h,f,!1,s,n+a/k,Ge)}else{let T=function(C){const{uint16Array:M,uint32Array:B}=Q;let N=C*2;for(;!j(N,M);)C=J(C),N=C*2;return ie(C,B)},D=function(C){const{uint16Array:M,uint32Array:B}=Q;let N=C*2;for(;!j(N,M);)C=ee(C,B),N=C*2;return ie(C,B)+ne(N,M)};const h=J(a),f=ee(a,d);let p=h,y=f,v,w,m,x;if(r&&(m=Ge,x=Ft,X(p,o,m),X(y,o,x),v=r(m),w=r(x),w<v)){p=f,y=h;const C=v;v=w,w=C,m=x}m||(m=Ge,X(p,o,m));const g=j(p*2,l),b=t(m,g,v,s+1,n+p/k);let S;if(b===qs){const C=T(p),B=D(p)-C;S=i(C,B,!0,s+1,n+p/k,m)}else S=b&&ts(p,e,t,i,r,n,s+1);if(S)return!0;x=Ft,X(y,o,x);const _=j(y*2,l),I=t(x,_,w,s+1,n+y/k);let P;if(I===qs){const C=T(y),B=D(y)-C;P=i(C,B,!0,s+1,n+y/k,x)}else P=I&&ts(y,e,t,i,r,n,s+1);return!!P}}const ci=new Q.constructor,sr=new Q.constructor,We=new Ss(()=>new xe),St=new xe,Tt=new xe,Br=new xe,$r=new xe;let Nr=!1;function ul(a,e,t,i){if(Nr)throw new Error("MeshBVH: Recursive calls to bvhcast not supported.");Nr=!0;const r=a._roots,n=e._roots;let s,o=0,l=0;const d=new U().copy(t).invert();for(let c=0,u=r.length;c<u;c++){ci.setBuffer(r[c]),l=0;const h=We.getPrimitive();X(0,ci.float32Array,h),h.applyMatrix4(d);for(let f=0,p=n.length;f<p&&(sr.setBuffer(n[f]),s=we(0,0,t,d,i,o,l,0,0,h),sr.clearBuffer(),l+=n[f].byteLength/Z,!s);f++);if(We.releasePrimitive(h),ci.clearBuffer(),o+=r[c].byteLength/Z,s)break}return Nr=!1,s}function we(a,e,t,i,r,n=0,s=0,o=0,l=0,d=null,c=!1){let u,h;c?(u=sr,h=ci):(u=ci,h=sr);const f=u.float32Array,p=u.uint32Array,y=u.uint16Array,v=h.float32Array,w=h.uint32Array,m=h.uint16Array,x=a*2,g=e*2,b=j(x,y),S=j(g,m);let _=!1;if(S&&b)c?_=r(ie(e,w),ne(e*2,m),ie(a,p),ne(a*2,y),l,s+e/k,o,n+a/k):_=r(ie(a,p),ne(a*2,y),ie(e,w),ne(e*2,m),o,n+a/k,l,s+e/k);else if(S){const I=We.getPrimitive();X(e,v,I),I.applyMatrix4(t);const P=J(a),T=ee(a,p);X(P,f,St),X(T,f,Tt);const D=I.intersectsBox(St),C=I.intersectsBox(Tt);_=D&&we(e,P,i,t,r,s,n,l,o+1,I,!c)||C&&we(e,T,i,t,r,s,n,l,o+1,I,!c),We.releasePrimitive(I)}else{const I=J(e),P=ee(e,w);X(I,v,Br),X(P,v,$r);const T=d.intersectsBox(Br),D=d.intersectsBox($r);if(T&&D)_=we(a,I,t,i,r,n,s,o,l+1,d,c)||we(a,P,t,i,r,n,s,o,l+1,d,c);else if(T)if(b)_=we(a,I,t,i,r,n,s,o,l+1,d,c);else{const C=We.getPrimitive();C.copy(Br).applyMatrix4(t);const M=J(a),B=ee(a,p);X(M,f,St),X(B,f,Tt);const N=C.intersectsBox(St),G=C.intersectsBox(Tt);_=N&&we(I,M,i,t,r,s,n,l,o+1,C,!c)||G&&we(I,B,i,t,r,s,n,l,o+1,C,!c),We.releasePrimitive(C)}else if(D)if(b)_=we(a,P,t,i,r,n,s,o,l+1,d,c);else{const C=We.getPrimitive();C.copy($r).applyMatrix4(t);const M=J(a),B=ee(a,p);X(M,f,St),X(B,f,Tt);const N=C.intersectsBox(St),G=C.intersectsBox(Tt);_=N&&we(P,M,i,t,r,s,n,l,o+1,C,!c)||G&&we(P,B,i,t,r,s,n,l,o+1,C,!c),We.releasePrimitive(C)}}return _}const qe=new class{constructor(){let a=null,e=null,t=null,i=!1;this.root=null,this.buffer=null,this.uint32Array=null,this.uint16Array=null,this.setBVH=(n,s)=>{if(i)throw new Error("BVHTraversalHelper: cannot call setBVH during an active traversal.");this.root=s,this.buffer=a=n._roots[s],this.uint16Array=t=new Uint16Array(a),this.uint32Array=e=new Uint32Array(a)},this.reset=()=>{this.root=null,this.buffer=a=null,this.uint16Array=t=null,this.uint32Array=e=null},this.getRangeStart=n=>{let s=n*2;for(;!j(s,t);)n=J(n),s=n*2;return ie(n,e)},this.getRangeEnd=n=>{let s=n*2;for(;!j(s,t);)n=ee(n,e),s=n*2;return ie(n,e)+ne(s,t)};const r=(n,s,o)=>{const l=s*2,d=j(l,t);if(!n(o,d,s)&&!d){const u=J(s),h=ee(s,e);r(n,u,o+1),r(n,h,o+1)}};this.traverseBuffer=n=>{if(i)throw new Error("BVHTraversalHelper: cannot start a traversal during an active traversal.");i=!0;try{r(n,0,0)}finally{i=!1}},this.traverse=n=>{this.traverseBuffer((s,o,l)=>{if(o){const d=l*2,c=e[l+6],u=t[d+14];return n(s,o,new Float32Array(a,l*4,6),c,u)}else{const d=_s(l,e);return n(s,o,new Float32Array(a,l*4,6),d)}})}}},Ks=new xe,It=new Float32Array(6);class ma{constructor(){this._roots=null,this.primitiveBuffer=null,this.primitiveBufferStride=null}init(e){e={...ha,...e},"maxLeafSize"in e&&(console.warn('BVH: "maxLeafSize" option has been deprecated. Use "targetLeafSize", instead.'),e={...e,targetLeafSize:e.maxLeafSize}),ol(this,e)}getRootRanges(){throw new Error("BVH: getRootRanges() not implemented")}writePrimitiveBounds(){throw new Error("BVH: writePrimitiveBounds() not implemented")}writePrimitiveRangeBounds(e,t,i,r){let n=1/0,s=1/0,o=1/0,l=-1/0,d=-1/0,c=-1/0;for(let u=e,h=e+t;u<h;u++){this.writePrimitiveBounds(u,It,0);const[f,p,y,v,w,m]=It;f<n&&(n=f),v>l&&(l=v),p<s&&(s=p),w>d&&(d=w),y<o&&(o=y),m>c&&(c=m)}return i[r+0]=n,i[r+1]=s,i[r+2]=o,i[r+3]=l,i[r+4]=d,i[r+5]=c,i}computePrimitiveBounds(e,t,i){const r=i.offset||0;for(let n=e,s=e+t;n<s;n++){this.writePrimitiveBounds(n,It,0);const[o,l,d,c,u,h]=It,f=(o+c)/2,p=(l+u)/2,y=(d+h)/2,v=(c-o)/2,w=(u-l)/2,m=(h-d)/2,x=(n-r)*6;i[x+0]=f,i[x+1]=v+(Math.abs(f)+v)*Yi,i[x+2]=p,i[x+3]=w+(Math.abs(p)+w)*Yi,i[x+4]=y,i[x+5]=m+(Math.abs(y)+m)*Yi}return i}shiftPrimitiveOffsets(e){const t=this._indirectBuffer;if(t)for(let i=0,r=t.length;i<r;i++)t[i]+=e;else{const i=this._roots;for(let r=0;r<i.length;r++){const n=i[r],s=new Uint32Array(n),o=new Uint16Array(n),l=n.byteLength/Z;for(let d=0;d<l;d++){const c=k*d,u=2*c;j(u,o)&&(s[c+6]+=e)}}}}traverse(e,t=0){qe.setBVH(this,t),qe.traverse(e),qe.reset()}refit(){const e=this._roots;for(let t=0,i=e.length;t<i;t++){const r=e[t],n=new Uint32Array(r),s=new Uint16Array(r),o=new Float32Array(r),l=r.byteLength/Z;for(let d=l-1;d>=0;d--){const c=d*k,u=c*2;if(j(u,s)){const f=ie(c,n),p=ne(u,s);this.writePrimitiveRangeBounds(f,p,It,0),o.set(It,c)}else{const f=J(c),p=ee(c,n);for(let y=0;y<3;y++){const v=o[f+y],w=o[f+y+3],m=o[p+y],x=o[p+y+3];o[c+y]=v<m?v:m,o[c+y+3]=w>x?w:x}}}}}getBoundingBox(e){return e.makeEmpty(),this._roots.forEach(i=>{X(0,new Float32Array(i),Ks),e.union(Ks)}),e}shapecast(e){let{boundsTraverseOrder:t,intersectsBounds:i,intersectsRange:r,intersectsPrimitive:n,scratchPrimitive:s,iterate:o}=e;if(r&&n){const u=r;r=(h,f,p,y,v)=>u(h,f,p,y,v)?!0:o(h,f,this,n,p,y,s)}else r||(n?r=(u,h,f,p)=>o(u,h,this,n,f,p,s):r=(u,h,f)=>f);let l=!1,d=0;const c=this._roots;for(let u=0,h=c.length;u<h;u++){const f=c[u];if(l=cl(this,u,i,r,t,d),l)break;d+=f.byteLength/Z}return l}bvhcast(e,t,i){let{intersectsRanges:r}=i;return ul(this,e,t,r)}}function dl(){return typeof SharedArrayBuffer<"u"}function Ts(a){return a.index?a.index.count:a.attributes.position.count}function mr(a){return Ts(a)/3}function hl(a,e=ArrayBuffer){return a>65535?new Uint32Array(new e(4*a)):new Uint16Array(new e(2*a))}function fl(a,e){if(!a.index){const t=a.attributes.position.count,i=e.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,r=hl(t,i);a.setIndex(new at(r,1));for(let n=0;n<t;n++)r[n]=n}}function pl(a,e,t){const i=Ts(a)/t,r=e||a.drawRange,n=r.start/t,s=(r.start+r.count)/t,o=Math.max(0,n),l=Math.min(i,s)-o;return{offset:Math.floor(o),count:Math.floor(l)}}function ml(a,e){return a.groups.map(t=>({offset:t.start/e,count:t.count/e}))}function Xs(a,e,t){const i=pl(a,e,t),r=ml(a,t);if(!r.length)return[i];const n=[],s=i.offset,o=i.offset+i.count,l=Ts(a)/t,d=[];for(const h of r){const{offset:f,count:p}=h,y=f,v=isFinite(p)?p:l-f,w=f+v;y<o&&w>s&&(d.push({pos:Math.max(s,y),isStart:!0}),d.push({pos:Math.min(o,w),isStart:!1}))}d.sort((h,f)=>h.pos!==f.pos?h.pos-f.pos:h.type==="end"?-1:1);let c=0,u=null;for(const h of d){const f=h.pos;c!==0&&f!==u&&n.push({offset:u,count:f-u}),c+=h.isStart?1:-1,u=f}return n}function gl(a,e){const t=a[a.length-1],i=t.offset+t.count>2**16,r=a.reduce((d,c)=>d+c.count,0),n=i?4:2,s=e?new SharedArrayBuffer(r*n):new ArrayBuffer(r*n),o=i?new Uint32Array(s):new Uint16Array(s);let l=0;for(let d=0;d<a.length;d++){const{offset:c,count:u}=a[d];for(let h=0;h<u;h++)o[l+h]=c+h;l+=u}return o}class nr extends ma{get indirect(){return!!this._indirectBuffer}get primitiveStride(){return null}get primitiveBufferStride(){return this.indirect?1:this.primitiveStride}set primitiveBufferStride(e){}get primitiveBuffer(){return this.indirect?this._indirectBuffer:this.geometry.index.array}set primitiveBuffer(e){}constructor(e,t={}){if(e.isBufferGeometry){if(e.index&&e.index.isInterleavedBufferAttribute)throw new Error("BVH: InterleavedBufferAttribute is not supported for the index attribute.")}else throw new Error("BVH: Only BufferGeometries are supported.");if(t.useSharedArrayBuffer&&!dl())throw new Error("BVH: SharedArrayBuffer is not available.");super(),this.geometry=e,this.resolvePrimitiveIndex=t.indirect?i=>this._indirectBuffer[i]:i=>i,this.primitiveBuffer=null,this.primitiveBufferStride=null,this._indirectBuffer=null,t={...ha,...t},t[pi]||this.init(t)}init(e){const{geometry:t,primitiveStride:i}=this;if(e.indirect){const r=Xs(t,e.range,i),n=gl(r,e.useSharedArrayBuffer);this._indirectBuffer=n}else fl(t,e);super.init(e),!t.boundingBox&&e.setBoundingBox&&(t.boundingBox=this.getBoundingBox(new xe))}getRootRanges(e){return this.indirect?[{offset:0,count:this._indirectBuffer.length}]:Xs(this.geometry,e,this.primitiveStride)}raycastObject3D(){throw new Error("BVH: raycastObject3D() not implemented")}}class He{constructor(){this.min=1/0,this.max=-1/0}setFromPointsField(e,t){let i=1/0,r=-1/0;for(let n=0,s=e.length;n<s;n++){const l=e[n][t];i=l<i?l:i,r=l>r?l:r}this.min=i,this.max=r}setFromPoints(e,t){let i=1/0,r=-1/0;for(let n=0,s=t.length;n<s;n++){const o=t[n],l=e.dot(o);i=l<i?l:i,r=l>r?l:r}this.min=i,this.max=r}isSeparated(e){return this.min>e.max||e.min>this.max}}He.prototype.setFromBox=(function(){const a=new F;return function(t,i){const r=i.min,n=i.max;let s=1/0,o=-1/0;for(let l=0;l<=1;l++)for(let d=0;d<=1;d++)for(let c=0;c<=1;c++){a.x=r.x*l+n.x*(1-l),a.y=r.y*d+n.y*(1-d),a.z=r.z*c+n.z*(1-c);const u=t.dot(a);s=Math.min(u,s),o=Math.max(u,o)}this.min=s,this.max=o}})();const xl=(function(){const a=new F,e=new F,t=new F;return function(r,n,s){const o=r.start,l=a,d=n.start,c=e;t.subVectors(o,d),a.subVectors(r.end,r.start),e.subVectors(n.end,n.start);const u=t.dot(c),h=c.dot(l),f=c.dot(c),p=t.dot(l),v=l.dot(l)*f-h*h;let w,m;v!==0?w=(u*h-p*f)/v:w=0,m=(u+w*h)/f,s.x=w,s.y=m}})(),Is=(function(){const a=new Y,e=new F,t=new F;return function(r,n,s,o){xl(r,n,a);let l=a.x,d=a.y;if(l>=0&&l<=1&&d>=0&&d<=1){r.at(l,s),n.at(d,o);return}else if(l>=0&&l<=1){d<0?n.at(0,o):n.at(1,o),r.closestPointToPoint(o,!0,s);return}else if(d>=0&&d<=1){l<0?r.at(0,s):r.at(1,s),n.closestPointToPoint(s,!0,o);return}else{let c;l<0?c=r.start:c=r.end;let u;d<0?u=n.start:u=n.end;const h=e,f=t;if(r.closestPointToPoint(u,!0,e),n.closestPointToPoint(c,!0,t),h.distanceToSquared(u)<=f.distanceToSquared(c)){s.copy(h),o.copy(u);return}else{s.copy(c),o.copy(f);return}}}})(),vl=(function(){const a=new F,e=new F,t=new ia,i=new ke;return function(n,s){const{radius:o,center:l}=n,{a:d,b:c,c:u}=s;if(i.start=d,i.end=c,i.closestPointToPoint(l,!0,a).distanceTo(l)<=o||(i.start=d,i.end=u,i.closestPointToPoint(l,!0,a).distanceTo(l)<=o)||(i.start=c,i.end=u,i.closestPointToPoint(l,!0,a).distanceTo(l)<=o))return!0;const y=s.getPlane(t);if(Math.abs(y.distanceToPoint(l))<=o){const w=y.projectPoint(l,e);if(s.containsPoint(w))return!0}return!1}})(),yl=["x","y","z"],$e=1e-15,Ys=$e*$e;function he(a){return Math.abs(a)<$e}class ge extends Se{constructor(...e){super(...e),this.isExtendedTriangle=!0,this.satAxes=new Array(4).fill().map(()=>new F),this.satBounds=new Array(4).fill().map(()=>new He),this.points=[this.a,this.b,this.c],this.plane=new ia,this.isDegenerateIntoSegment=!1,this.isDegenerateIntoPoint=!1,this.degenerateSegment=new ke,this.needsUpdate=!0}intersectsSphere(e){return vl(e,this)}update(){const e=this.a,t=this.b,i=this.c,r=this.points,n=this.satAxes,s=this.satBounds,o=n[0],l=s[0];this.getNormal(o),l.setFromPoints(o,r);const d=n[1],c=s[1];d.subVectors(e,t),c.setFromPoints(d,r);const u=n[2],h=s[2];u.subVectors(t,i),h.setFromPoints(u,r);const f=n[3],p=s[3];f.subVectors(i,e),p.setFromPoints(f,r);const y=d.length(),v=u.length(),w=f.length();this.isDegenerateIntoPoint=!1,this.isDegenerateIntoSegment=!1,y<$e?v<$e||w<$e?this.isDegenerateIntoPoint=!0:(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(e),this.degenerateSegment.end.copy(i)):v<$e?w<$e?this.isDegenerateIntoPoint=!0:(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(t),this.degenerateSegment.end.copy(e)):w<$e&&(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(i),this.degenerateSegment.end.copy(t)),this.plane.setFromNormalAndCoplanarPoint(o,e),this.needsUpdate=!1}}ge.prototype.closestPointToSegment=(function(){const a=new F,e=new F,t=new ke;return function(r,n=null,s=null){const{start:o,end:l}=r,d=this.points;let c,u=1/0;for(let h=0;h<3;h++){const f=(h+1)%3;t.start.copy(d[h]),t.end.copy(d[f]),Is(t,r,a,e),c=a.distanceToSquared(e),c<u&&(u=c,n&&n.copy(a),s&&s.copy(e))}return this.closestPointToPoint(o,a),c=o.distanceToSquared(a),c<u&&(u=c,n&&n.copy(a),s&&s.copy(o)),this.closestPointToPoint(l,a),c=l.distanceToSquared(a),c<u&&(u=c,n&&n.copy(a),s&&s.copy(l)),Math.sqrt(u)}})();ge.prototype.intersectsTriangle=(function(){const a=new ge,e=new He,t=new He,i=new F,r=new F,n=new F,s=new F,o=new ke,l=new ke,d=new F,c=new Y,u=new Y;function h(x,g,b,S){const _=i;!x.isDegenerateIntoPoint&&!x.isDegenerateIntoSegment?_.copy(x.plane.normal):_.copy(g.plane.normal);const I=x.satBounds,P=x.satAxes;for(let C=1;C<4;C++){const M=I[C],B=P[C];if(e.setFromPoints(B,g.points),M.isSeparated(e)||(s.copy(_).cross(B),e.setFromPoints(s,x.points),t.setFromPoints(s,g.points),e.isSeparated(t)))return!1}const T=g.satBounds,D=g.satAxes;for(let C=1;C<4;C++){const M=T[C],B=D[C];if(e.setFromPoints(B,x.points),M.isSeparated(e)||(s.crossVectors(_,B),e.setFromPoints(s,x.points),t.setFromPoints(s,g.points),e.isSeparated(t)))return!1}return b&&(S||console.warn("ExtendedTriangle.intersectsTriangle: Triangles are coplanar which does not support an output edge. Setting edge to 0, 0, 0."),b.start.set(0,0,0),b.end.set(0,0,0)),!0}function f(x,g,b,S,_,I,P,T,D,C,M){let B=P/(P-T);C.x=S+(_-S)*B,M.start.subVectors(g,x).multiplyScalar(B).add(x),B=P/(P-D),C.y=S+(I-S)*B,M.end.subVectors(b,x).multiplyScalar(B).add(x)}function p(x,g,b,S,_,I,P,T,D,C,M){if(_>0)f(x.c,x.a,x.b,S,g,b,D,P,T,C,M);else if(I>0)f(x.b,x.a,x.c,b,g,S,T,P,D,C,M);else if(T*D>0||P!=0)f(x.a,x.b,x.c,g,b,S,P,T,D,C,M);else if(T!=0)f(x.b,x.a,x.c,b,g,S,T,P,D,C,M);else if(D!=0)f(x.c,x.a,x.b,S,g,b,D,P,T,C,M);else return!0;return!1}function y(x,g,b,S){const _=g.degenerateSegment,I=x.plane.distanceToPoint(_.start),P=x.plane.distanceToPoint(_.end);return he(I)?he(P)?h(x,g,b,S):(b&&(b.start.copy(_.start),b.end.copy(_.start)),x.containsPoint(_.start)):he(P)?(b&&(b.start.copy(_.end),b.end.copy(_.end)),x.containsPoint(_.end)):x.plane.intersectLine(_,i)!=null?(b&&(b.start.copy(i),b.end.copy(i)),x.containsPoint(i)):!1}function v(x,g,b){const S=g.a;return he(x.plane.distanceToPoint(S))&&x.containsPoint(S)?(b&&(b.start.copy(S),b.end.copy(S)),!0):!1}function w(x,g,b){const S=x.degenerateSegment,_=g.a;return S.closestPointToPoint(_,!0,i),_.distanceToSquared(i)<Ys?(b&&(b.start.copy(_),b.end.copy(_)),!0):!1}function m(x,g,b,S){if(x.isDegenerateIntoSegment)if(g.isDegenerateIntoSegment){const _=x.degenerateSegment,I=g.degenerateSegment,P=r,T=n;_.delta(P),I.delta(T);const D=i.subVectors(I.start,_.start),C=P.x*T.y-P.y*T.x;if(he(C))return!1;const M=(D.x*T.y-D.y*T.x)/C,B=-(P.x*D.y-P.y*D.x)/C;if(M<0||M>1||B<0||B>1)return!1;const N=_.start.z+P.z*M,G=I.start.z+T.z*B;return he(N-G)?(b&&(b.start.copy(_.start).addScaledVector(P,M),b.end.copy(_.start).addScaledVector(P,M)),!0):!1}else return g.isDegenerateIntoPoint?w(x,g,b):y(g,x,b,S);else{if(x.isDegenerateIntoPoint)return g.isDegenerateIntoPoint?g.a.distanceToSquared(x.a)<Ys?(b&&(b.start.copy(x.a),b.end.copy(x.a)),!0):!1:g.isDegenerateIntoSegment?w(g,x,b):v(g,x,b);if(g.isDegenerateIntoPoint)return v(x,g,b);if(g.isDegenerateIntoSegment)return y(x,g,b,S)}}return function(g,b=null,S=!1){this.needsUpdate&&this.update(),g.isExtendedTriangle?g.needsUpdate&&g.update():(a.copy(g),a.update(),g=a);const _=m(this,g,b,S);if(_!==void 0)return _;const I=this.plane,P=g.plane;let T=P.distanceToPoint(this.a),D=P.distanceToPoint(this.b),C=P.distanceToPoint(this.c);he(T)&&(T=0),he(D)&&(D=0),he(C)&&(C=0);const M=T*D,B=T*C;if(M>0&&B>0)return!1;let N=I.distanceToPoint(g.a),G=I.distanceToPoint(g.b),E=I.distanceToPoint(g.c);he(N)&&(N=0),he(G)&&(G=0),he(E)&&(E=0);const gt=N*G,xt=N*E;if(gt>0&&xt>0)return!1;r.copy(I.normal),n.copy(P.normal);const vt=r.cross(n);let qt=0,Gt=Math.abs(vt.x);const jt=Math.abs(vt.y);jt>Gt&&(Gt=jt,qt=1),Math.abs(vt.z)>Gt&&(qt=2);const oe=yl[qt],Ze=this.a[oe],bt=this.b[oe],yi=this.c[oe],Je=g.a[oe],wt=g.b[oe],vo=g.c[oe];if(p(this,Ze,bt,yi,M,B,T,D,C,c,o))return h(this,g,b,S);if(p(g,Je,wt,vo,gt,xt,N,G,E,u,l))return h(this,g,b,S);if(c.y<c.x){const Dr=c.y;c.y=c.x,c.x=Dr,d.copy(o.start),o.start.copy(o.end),o.end.copy(d)}if(u.y<u.x){const Dr=u.y;u.y=u.x,u.x=Dr,d.copy(l.start),l.start.copy(l.end),l.end.copy(d)}return c.y<u.x||u.y<c.x?!1:(b&&(u.x>c.x?b.start.copy(l.start):b.start.copy(o.start),u.y<c.y?b.end.copy(l.end):b.end.copy(o.end)),!0)}})();ge.prototype.distanceToPoint=(function(){const a=new F;return function(t){return this.closestPointToPoint(t,a),t.distanceTo(a)}})();ge.prototype.distanceToTriangle=(function(){const a=new F,e=new F,t=["a","b","c"],i=new ke,r=new ke;return function(s,o=null,l=null){const d=o||l?i:null;if(this.intersectsTriangle(s,d,!0))return(o||l)&&(o&&d.getCenter(o),l&&d.getCenter(l)),0;let c=1/0;for(let u=0;u<3;u++){let h;const f=t[u],p=s[f];this.closestPointToPoint(p,a),h=p.distanceToSquared(a),h<c&&(c=h,o&&o.copy(a),l&&l.copy(p));const y=this[f];s.closestPointToPoint(y,a),h=y.distanceToSquared(a),h<c&&(c=h,o&&o.copy(y),l&&l.copy(a))}for(let u=0;u<3;u++){const h=t[u],f=t[(u+1)%3];i.set(this[h],this[f]);for(let p=0;p<3;p++){const y=t[p],v=t[(p+1)%3];r.set(s[y],s[v]),Is(i,r,a,e);const w=a.distanceToSquared(e);w<c&&(c=w,o&&o.copy(a),l&&l.copy(e))}}return Math.sqrt(c)}})();class ae{constructor(e,t,i){this.isOrientedBox=!0,this.min=new F,this.max=new F,this.matrix=new U,this.invMatrix=new U,this.points=new Array(8).fill().map(()=>new F),this.satAxes=new Array(3).fill().map(()=>new F),this.satBounds=new Array(3).fill().map(()=>new He),this.alignedSatBounds=new Array(3).fill().map(()=>new He),this.needsUpdate=!1,e&&this.min.copy(e),t&&this.max.copy(t),i&&this.matrix.copy(i)}set(e,t,i){this.min.copy(e),this.max.copy(t),this.matrix.copy(i),this.needsUpdate=!0}copy(e){this.min.copy(e.min),this.max.copy(e.max),this.matrix.copy(e.matrix),this.needsUpdate=!0}}ae.prototype.update=(function(){return function(){const e=this.matrix,t=this.min,i=this.max,r=this.points;for(let d=0;d<=1;d++)for(let c=0;c<=1;c++)for(let u=0;u<=1;u++){const h=1*d|2*c|4*u,f=r[h];f.x=d?i.x:t.x,f.y=c?i.y:t.y,f.z=u?i.z:t.z,f.applyMatrix4(e)}const n=this.satBounds,s=this.satAxes,o=r[0];for(let d=0;d<3;d++){const c=s[d],u=n[d],h=1<<d,f=r[h];c.subVectors(o,f),u.setFromPoints(c,r)}const l=this.alignedSatBounds;l[0].setFromPointsField(r,"x"),l[1].setFromPointsField(r,"y"),l[2].setFromPointsField(r,"z"),this.invMatrix.copy(this.matrix).invert(),this.needsUpdate=!1}})();ae.prototype.intersectsBox=(function(){const a=new He;return function(t){this.needsUpdate&&this.update();const i=t.min,r=t.max,n=this.satBounds,s=this.satAxes,o=this.alignedSatBounds;if(a.min=i.x,a.max=r.x,o[0].isSeparated(a)||(a.min=i.y,a.max=r.y,o[1].isSeparated(a))||(a.min=i.z,a.max=r.z,o[2].isSeparated(a)))return!1;for(let l=0;l<3;l++){const d=s[l],c=n[l];if(a.setFromBox(d,t),c.isSeparated(a))return!1}return!0}})();ae.prototype.intersectsTriangle=(function(){const a=new ge,e=new Array(3),t=new He,i=new He,r=new F;return function(s){this.needsUpdate&&this.update(),s.isExtendedTriangle?s.needsUpdate&&s.update():(a.copy(s),a.update(),s=a);const o=this.satBounds,l=this.satAxes;e[0]=s.a,e[1]=s.b,e[2]=s.c;for(let h=0;h<3;h++){const f=o[h],p=l[h];if(t.setFromPoints(p,e),f.isSeparated(t))return!1}const d=s.satBounds,c=s.satAxes,u=this.points;for(let h=0;h<3;h++){const f=d[h],p=c[h];if(t.setFromPoints(p,u),f.isSeparated(t))return!1}for(let h=0;h<3;h++){const f=l[h];for(let p=0;p<4;p++){const y=c[p];if(r.crossVectors(f,y),t.setFromPoints(r,e),i.setFromPoints(r,u),t.isSeparated(i))return!1}}return!0}})();ae.prototype.closestPointToPoint=(function(){return function(e,t){return this.needsUpdate&&this.update(),t.copy(e).applyMatrix4(this.invMatrix).clamp(this.min,this.max).applyMatrix4(this.matrix),t}})();ae.prototype.distanceToPoint=(function(){const a=new F;return function(t){return this.closestPointToPoint(t,a),t.distanceTo(a)}})();ae.prototype.distanceToBox=(function(){const a=["x","y","z"],e=new Array(12).fill().map(()=>new ke),t=new Array(12).fill().map(()=>new ke),i=new F,r=new F;return function(s,o=0,l=null,d=null){if(this.needsUpdate&&this.update(),this.intersectsBox(s))return(l||d)&&(s.getCenter(r),this.closestPointToPoint(r,i),s.closestPointToPoint(i,r),l&&l.copy(i),d&&d.copy(r)),0;const c=o*o,u=s.min,h=s.max,f=this.points;let p=1/0;for(let v=0;v<8;v++){const w=f[v];r.copy(w).clamp(u,h);const m=w.distanceToSquared(r);if(m<p&&(p=m,l&&l.copy(w),d&&d.copy(r),m<c))return Math.sqrt(m)}let y=0;for(let v=0;v<3;v++)for(let w=0;w<=1;w++)for(let m=0;m<=1;m++){const x=(v+1)%3,g=(v+2)%3,b=w<<x|m<<g,S=1<<v|w<<x|m<<g,_=f[b],I=f[S];e[y].set(_,I);const T=a[v],D=a[x],C=a[g],M=t[y],B=M.start,N=M.end;B[T]=u[T],B[D]=w?u[D]:h[D],B[C]=m?u[C]:h[D],N[T]=h[T],N[D]=w?u[D]:h[D],N[C]=m?u[C]:h[D],y++}for(let v=0;v<=1;v++)for(let w=0;w<=1;w++)for(let m=0;m<=1;m++){r.x=v?h.x:u.x,r.y=w?h.y:u.y,r.z=m?h.z:u.z,this.closestPointToPoint(r,i);const x=r.distanceToSquared(i);if(x<p&&(p=x,l&&l.copy(i),d&&d.copy(r),x<c))return Math.sqrt(x)}for(let v=0;v<12;v++){const w=e[v];for(let m=0;m<12;m++){const x=t[m];Is(w,x,i,r);const g=i.distanceToSquared(r);if(g<p&&(p=g,l&&l.copy(i),d&&d.copy(r),g<c))return Math.sqrt(g)}}return Math.sqrt(p)}})();class bl extends Ss{constructor(){super(()=>new ge)}}const fe=new bl,Kt=new F,Er=new F;function wl(a,e,t={},i=0,r=1/0){const n=i*i,s=r*r;let o=1/0,l=null;if(a.shapecast({boundsTraverseOrder:c=>(Kt.copy(e).clamp(c.min,c.max),Kt.distanceToSquared(e)),intersectsBounds:(c,u,h)=>h<o&&h<s,intersectsTriangle:(c,u)=>{c.closestPointToPoint(e,Kt);const h=e.distanceToSquared(Kt);return h<o&&(Er.copy(Kt),o=h,l=u),h<n}}),o===1/0)return null;const d=Math.sqrt(o);return t.point?t.point.copy(Er):t.point=Er.clone(),t.distance=d,t.faceIndex=l,t}const Ti=parseInt(cr)>=169,_l=parseInt(cr)<=161,et=new F,tt=new F,it=new F,Ii=new Y,Ci=new Y,Ri=new Y,Zs=new F,Js=new F,en=new F,Xt=new F;function Sl(a,e,t,i,r,n,s,o){let l;if(n===gs?l=a.intersectTriangle(i,t,e,!0,r):l=a.intersectTriangle(e,t,i,n!==ra,r),l===null)return null;const d=a.origin.distanceTo(r);return d<s||d>o?null:{distance:d,point:r.clone()}}function tn(a,e,t,i,r,n,s,o,l,d,c){et.fromBufferAttribute(e,n),tt.fromBufferAttribute(e,s),it.fromBufferAttribute(e,o);const u=Sl(a,et,tt,it,Xt,l,d,c);if(u){if(i){Ii.fromBufferAttribute(i,n),Ci.fromBufferAttribute(i,s),Ri.fromBufferAttribute(i,o),u.uv=new Y;const f=Se.getInterpolation(Xt,et,tt,it,Ii,Ci,Ri,u.uv);Ti||(u.uv=f)}if(r){Ii.fromBufferAttribute(r,n),Ci.fromBufferAttribute(r,s),Ri.fromBufferAttribute(r,o),u.uv1=new Y;const f=Se.getInterpolation(Xt,et,tt,it,Ii,Ci,Ri,u.uv1);Ti||(u.uv1=f),_l&&(u.uv2=u.uv1)}if(t){Zs.fromBufferAttribute(t,n),Js.fromBufferAttribute(t,s),en.fromBufferAttribute(t,o),u.normal=new F;const f=Se.getInterpolation(Xt,et,tt,it,Zs,Js,en,u.normal);u.normal.dot(a.direction)>0&&u.normal.multiplyScalar(-1),Ti||(u.normal=f)}const h={a:n,b:s,c:o,normal:new F,materialIndex:0};if(Se.getNormal(et,tt,it,h.normal),u.face=h,u.faceIndex=n,Ti){const f=new F;Se.getBarycoord(Xt,et,tt,it,f),u.barycoord=f}}return u}function rn(a){return a&&a.isMaterial?a.side:a}function gr(a,e,t,i,r,n,s){const o=i*3;let l=o+0,d=o+1,c=o+2;const{index:u,groups:h}=a;a.index&&(l=u.getX(l),d=u.getX(d),c=u.getX(c));const{position:f,normal:p,uv:y,uv1:v}=a.attributes;if(Array.isArray(e)){const w=i*3;for(let m=0,x=h.length;m<x;m++){const{start:g,count:b,materialIndex:S}=h[m];if(w>=g&&w<g+b){const _=rn(e[S]),I=tn(t,f,p,y,v,l,d,c,_,n,s);if(I)if(I.faceIndex=i,I.face.materialIndex=S,r)r.push(I);else return I}}}else{const w=rn(e),m=tn(t,f,p,y,v,l,d,c,w,n,s);if(m)if(m.faceIndex=i,m.face.materialIndex=0,r)r.push(m);else return m}return null}function te(a,e,t,i){const r=a.a,n=a.b,s=a.c;let o=e,l=e+1,d=e+2;t&&(o=t.getX(o),l=t.getX(l),d=t.getX(d)),r.x=i.getX(o),r.y=i.getY(o),r.z=i.getZ(o),n.x=i.getX(l),n.y=i.getY(l),n.z=i.getZ(l),s.x=i.getX(d),s.y=i.getY(d),s.z=i.getZ(d)}function Tl(a,e,t,i,r,n,s,o){const{geometry:l,_indirectBuffer:d}=a;for(let c=i,u=i+r;c<u;c++)gr(l,e,t,c,n,s,o)}function Il(a,e,t,i,r,n,s){const{geometry:o,_indirectBuffer:l}=a;let d=1/0,c=null;for(let u=i,h=i+r;u<h;u++){let f;f=gr(o,e,t,u,null,n,s),f&&f.distance<d&&(c=f,d=f.distance)}return c}function Cl(a,e,t,i,r,n,s){const{geometry:o}=t,{index:l}=o,d=o.attributes.position;for(let c=a,u=e+a;c<u;c++){let h;if(h=c,te(s,h*3,l,d),s.needsUpdate=!0,i(s,h,r,n))return!0}return!1}function Rl(a,e=null){e&&Array.isArray(e)&&(e=new Set(e));const t=a.geometry,i=t.index?t.index.array:null,r=t.attributes.position;let n,s,o,l,d=0;const c=a._roots;for(let h=0,f=c.length;h<f;h++)n=c[h],s=new Uint32Array(n),o=new Uint16Array(n),l=new Float32Array(n),u(0,d),d+=n.byteLength;function u(h,f,p=!1){const y=h*2;if(j(y,o)){const v=ie(h,s),w=ne(y,o);let m=1/0,x=1/0,g=1/0,b=-1/0,S=-1/0,_=-1/0;for(let I=3*v,P=3*(v+w);I<P;I++){let T=i[I];const D=r.getX(T),C=r.getY(T),M=r.getZ(T);D<m&&(m=D),D>b&&(b=D),C<x&&(x=C),C>S&&(S=C),M<g&&(g=M),M>_&&(_=M)}return l[h+0]!==m||l[h+1]!==x||l[h+2]!==g||l[h+3]!==b||l[h+4]!==S||l[h+5]!==_?(l[h+0]=m,l[h+1]=x,l[h+2]=g,l[h+3]=b,l[h+4]=S,l[h+5]=_,!0):!1}else{const v=J(h),w=ee(h,s);let m=p,x=!1,g=!1;if(e){if(!m){const T=v/k+f/Z,D=w/k+f/Z;x=e.has(T),g=e.has(D),m=!x&&!g}}else x=!0,g=!0;const b=m||x,S=m||g;let _=!1;b&&(_=u(v,f,m));let I=!1;S&&(I=u(w,f,m));const P=_||I;if(P)for(let T=0;T<3;T++){const D=v+T,C=w+T,M=l[D],B=l[D+3],N=l[C],G=l[C+3];l[h+T]=M<N?M:N,l[h+T+3]=B>G?B:G}return P}}}function Ye(a,e,t,i,r){let n,s,o,l,d,c;const u=1/t.direction.x,h=1/t.direction.y,f=1/t.direction.z,p=t.origin.x,y=t.origin.y,v=t.origin.z;let w=e[a],m=e[a+3],x=e[a+1],g=e[a+3+1],b=e[a+2],S=e[a+3+2];return u>=0?(n=(w-p)*u,s=(m-p)*u):(n=(m-p)*u,s=(w-p)*u),h>=0?(o=(x-y)*h,l=(g-y)*h):(o=(g-y)*h,l=(x-y)*h),n>l||o>s||((o>n||isNaN(n))&&(n=o),(l<s||isNaN(s))&&(s=l),f>=0?(d=(b-v)*f,c=(S-v)*f):(d=(S-v)*f,c=(b-v)*f),n>c||d>s)?!1:((d>n||n!==n)&&(n=d),(c<s||s!==s)&&(s=c),n<=r&&s>=i)}function Pl(a,e,t,i,r,n,s,o){const{geometry:l,_indirectBuffer:d}=a;for(let c=i,u=i+r;c<u;c++){let h=d?d[c]:c;gr(l,e,t,h,n,s,o)}}function Dl(a,e,t,i,r,n,s){const{geometry:o,_indirectBuffer:l}=a;let d=1/0,c=null;for(let u=i,h=i+r;u<h;u++){let f;f=gr(o,e,t,l?l[u]:u,null,n,s),f&&f.distance<d&&(c=f,d=f.distance)}return c}function Ml(a,e,t,i,r,n,s){const{geometry:o}=t,{index:l}=o,d=o.attributes.position;for(let c=a,u=e+a;c<u;c++){let h;if(h=t.resolveTriangleIndex(c),te(s,h*3,l,d),s.needsUpdate=!0,i(s,h,r,n))return!0}return!1}function Al(a,e,t,i,r,n,s){Q.setBuffer(a._roots[e]),is(0,a,t,i,r,n,s),Q.clearBuffer()}function is(a,e,t,i,r,n,s){const{float32Array:o,uint16Array:l,uint32Array:d}=Q,c=a*2;if(j(c,l)){const h=ie(a,d),f=ne(c,l);Tl(e,t,i,h,f,r,n,s)}else{const h=J(a);Ye(h,o,i,n,s)&&is(h,e,t,i,r,n,s);const f=ee(a,d);Ye(f,o,i,n,s)&&is(f,e,t,i,r,n,s)}}const Ll=["x","y","z"];function Fl(a,e,t,i,r,n){Q.setBuffer(a._roots[e]);const s=rs(0,a,t,i,r,n);return Q.clearBuffer(),s}function rs(a,e,t,i,r,n){const{float32Array:s,uint16Array:o,uint32Array:l}=Q;let d=a*2;if(j(d,o)){const u=ie(a,l),h=ne(d,o);return Il(e,t,i,u,h,r,n)}else{const u=_s(a,l),h=Ll[u],p=i.direction[h]>=0;let y,v;p?(y=J(a),v=ee(a,l)):(y=ee(a,l),v=J(a));const m=Ye(y,s,i,r,n)?rs(y,e,t,i,r,n):null;if(m){const b=m.point[h];if(p?b<=s[v+u]:b>=s[v+u+3])return m}const g=Ye(v,s,i,r,n)?rs(v,e,t,i,r,n):null;return m&&g?m.distance<=g.distance?m:g:m||g||null}}const Pi=new xe,Ct=new ge,Rt=new ge,Yt=new U,sn=new ae,Di=new ae;function Bl(a,e,t,i){Q.setBuffer(a._roots[e]);const r=ss(0,a,t,i);return Q.clearBuffer(),r}function ss(a,e,t,i,r=null){const{float32Array:n,uint16Array:s,uint32Array:o}=Q;let l=a*2;if(r===null&&(t.boundingBox||t.computeBoundingBox(),sn.set(t.boundingBox.min,t.boundingBox.max,i),r=sn),j(l,s)){const c=e.geometry,u=c.index,h=c.attributes.position,f=t.index,p=t.attributes.position,y=ie(a,o),v=ne(l,s);if(Yt.copy(i).invert(),t.boundsTree)return X(a,n,Di),Di.matrix.copy(Yt),Di.needsUpdate=!0,t.boundsTree.shapecast({intersectsBounds:m=>Di.intersectsBox(m),intersectsTriangle:m=>{m.a.applyMatrix4(i),m.b.applyMatrix4(i),m.c.applyMatrix4(i),m.needsUpdate=!0;for(let x=y*3,g=(v+y)*3;x<g;x+=3)if(te(Rt,x,u,h),Rt.needsUpdate=!0,m.intersectsTriangle(Rt))return!0;return!1}});{const w=mr(t);for(let m=y*3,x=(v+y)*3;m<x;m+=3){te(Ct,m,u,h),Ct.a.applyMatrix4(Yt),Ct.b.applyMatrix4(Yt),Ct.c.applyMatrix4(Yt),Ct.needsUpdate=!0;for(let g=0,b=w*3;g<b;g+=3)if(te(Rt,g,f,p),Rt.needsUpdate=!0,Ct.intersectsTriangle(Rt))return!0}}}else{const c=J(a),u=ee(a,o);return X(c,n,Pi),!!(r.intersectsBox(Pi)&&ss(c,e,t,i,r)||(X(u,n,Pi),r.intersectsBox(Pi)&&ss(u,e,t,i,r)))}}const Mi=new U,zr=new ae,Zt=new ae,$l=new F,Nl=new F,El=new F,zl=new F;function kl(a,e,t,i={},r={},n=0,s=1/0){e.boundingBox||e.computeBoundingBox(),zr.set(e.boundingBox.min,e.boundingBox.max,t),zr.needsUpdate=!0;const o=a.geometry,l=o.attributes.position,d=o.index,c=e.attributes.position,u=e.index,h=fe.getPrimitive(),f=fe.getPrimitive();let p=$l,y=Nl,v=null,w=null;r&&(v=El,w=zl);let m=1/0,x=null,g=null;return Mi.copy(t).invert(),Zt.matrix.copy(Mi),a.shapecast({boundsTraverseOrder:b=>zr.distanceToBox(b),intersectsBounds:(b,S,_)=>_<m&&_<s?(S&&(Zt.min.copy(b.min),Zt.max.copy(b.max),Zt.needsUpdate=!0),!0):!1,intersectsRange:(b,S)=>{if(e.boundsTree)return e.boundsTree.shapecast({boundsTraverseOrder:I=>Zt.distanceToBox(I),intersectsBounds:(I,P,T)=>T<m&&T<s,intersectsRange:(I,P)=>{for(let T=I,D=I+P;T<D;T++){te(f,3*T,u,c),f.a.applyMatrix4(t),f.b.applyMatrix4(t),f.c.applyMatrix4(t),f.needsUpdate=!0;for(let C=b,M=b+S;C<M;C++){te(h,3*C,d,l),h.needsUpdate=!0;const B=h.distanceToTriangle(f,p,v);if(B<m&&(y.copy(p),w&&w.copy(v),m=B,x=C,g=T),B<n)return!0}}}});{const _=mr(e);for(let I=0,P=_;I<P;I++){te(f,3*I,u,c),f.a.applyMatrix4(t),f.b.applyMatrix4(t),f.c.applyMatrix4(t),f.needsUpdate=!0;for(let T=b,D=b+S;T<D;T++){te(h,3*T,d,l),h.needsUpdate=!0;const C=h.distanceToTriangle(f,p,v);if(C<m&&(y.copy(p),w&&w.copy(v),m=C,x=T,g=I),C<n)return!0}}}}}),fe.releasePrimitive(h),fe.releasePrimitive(f),m===1/0?null:(i.point?i.point.copy(y):i.point=y.clone(),i.distance=m,i.faceIndex=x,r&&(r.point?r.point.copy(w):r.point=w.clone(),r.point.applyMatrix4(Mi),y.applyMatrix4(Mi),r.distance=y.sub(r.point).length(),r.faceIndex=g),i)}function Vl(a,e=null){e&&Array.isArray(e)&&(e=new Set(e));const t=a.geometry,i=t.index?t.index.array:null,r=t.attributes.position;let n,s,o,l,d=0;const c=a._roots;for(let h=0,f=c.length;h<f;h++)n=c[h],s=new Uint32Array(n),o=new Uint16Array(n),l=new Float32Array(n),u(0,d),d+=n.byteLength;function u(h,f,p=!1){const y=h*2;if(j(y,o)){const v=ie(h,s),w=ne(y,o);let m=1/0,x=1/0,g=1/0,b=-1/0,S=-1/0,_=-1/0;for(let I=v,P=v+w;I<P;I++){const T=3*a.resolveTriangleIndex(I);for(let D=0;D<3;D++){let C=T+D;C=i?i[C]:C;const M=r.getX(C),B=r.getY(C),N=r.getZ(C);M<m&&(m=M),M>b&&(b=M),B<x&&(x=B),B>S&&(S=B),N<g&&(g=N),N>_&&(_=N)}}return l[h+0]!==m||l[h+1]!==x||l[h+2]!==g||l[h+3]!==b||l[h+4]!==S||l[h+5]!==_?(l[h+0]=m,l[h+1]=x,l[h+2]=g,l[h+3]=b,l[h+4]=S,l[h+5]=_,!0):!1}else{const v=J(h),w=ee(h,s);let m=p,x=!1,g=!1;if(e){if(!m){const T=v/k+f/Z,D=w/k+f/Z;x=e.has(T),g=e.has(D),m=!x&&!g}}else x=!0,g=!0;const b=m||x,S=m||g;let _=!1;b&&(_=u(v,f,m));let I=!1;S&&(I=u(w,f,m));const P=_||I;if(P)for(let T=0;T<3;T++){const D=v+T,C=w+T,M=l[D],B=l[D+3],N=l[C],G=l[C+3];l[h+T]=M<N?M:N,l[h+T+3]=B>G?B:G}return P}}}function Hl(a,e,t,i,r,n,s){Q.setBuffer(a._roots[e]),ns(0,a,t,i,r,n,s),Q.clearBuffer()}function ns(a,e,t,i,r,n,s){const{float32Array:o,uint16Array:l,uint32Array:d}=Q,c=a*2;if(j(c,l)){const h=ie(a,d),f=ne(c,l);Pl(e,t,i,h,f,r,n,s)}else{const h=J(a);Ye(h,o,i,n,s)&&ns(h,e,t,i,r,n,s);const f=ee(a,d);Ye(f,o,i,n,s)&&ns(f,e,t,i,r,n,s)}}const Ol=["x","y","z"];function Ul(a,e,t,i,r,n){Q.setBuffer(a._roots[e]);const s=as(0,a,t,i,r,n);return Q.clearBuffer(),s}function as(a,e,t,i,r,n){const{float32Array:s,uint16Array:o,uint32Array:l}=Q;let d=a*2;if(j(d,o)){const u=ie(a,l),h=ne(d,o);return Dl(e,t,i,u,h,r,n)}else{const u=_s(a,l),h=Ol[u],p=i.direction[h]>=0;let y,v;p?(y=J(a),v=ee(a,l)):(y=ee(a,l),v=J(a));const m=Ye(y,s,i,r,n)?as(y,e,t,i,r,n):null;if(m){const b=m.point[h];if(p?b<=s[v+u]:b>=s[v+u+3])return m}const g=Ye(v,s,i,r,n)?as(v,e,t,i,r,n):null;return m&&g?m.distance<=g.distance?m:g:m||g||null}}const Ai=new xe,Pt=new ge,Dt=new ge,Jt=new U,nn=new ae,Li=new ae;function Wl(a,e,t,i){Q.setBuffer(a._roots[e]);const r=os(0,a,t,i);return Q.clearBuffer(),r}function os(a,e,t,i,r=null){const{float32Array:n,uint16Array:s,uint32Array:o}=Q;let l=a*2;if(r===null&&(t.boundingBox||t.computeBoundingBox(),nn.set(t.boundingBox.min,t.boundingBox.max,i),r=nn),j(l,s)){const c=e.geometry,u=c.index,h=c.attributes.position,f=t.index,p=t.attributes.position,y=ie(a,o),v=ne(l,s);if(Jt.copy(i).invert(),t.boundsTree)return X(a,n,Li),Li.matrix.copy(Jt),Li.needsUpdate=!0,t.boundsTree.shapecast({intersectsBounds:m=>Li.intersectsBox(m),intersectsTriangle:m=>{m.a.applyMatrix4(i),m.b.applyMatrix4(i),m.c.applyMatrix4(i),m.needsUpdate=!0;for(let x=y,g=v+y;x<g;x++)if(te(Dt,3*e.resolveTriangleIndex(x),u,h),Dt.needsUpdate=!0,m.intersectsTriangle(Dt))return!0;return!1}});{const w=mr(t);for(let m=y,x=v+y;m<x;m++){const g=e.resolveTriangleIndex(m);te(Pt,3*g,u,h),Pt.a.applyMatrix4(Jt),Pt.b.applyMatrix4(Jt),Pt.c.applyMatrix4(Jt),Pt.needsUpdate=!0;for(let b=0,S=w*3;b<S;b+=3)if(te(Dt,b,f,p),Dt.needsUpdate=!0,Pt.intersectsTriangle(Dt))return!0}}}else{const c=J(a),u=ee(a,o);return X(c,n,Ai),!!(r.intersectsBox(Ai)&&os(c,e,t,i,r)||(X(u,n,Ai),r.intersectsBox(Ai)&&os(u,e,t,i,r)))}}const Fi=new U,kr=new ae,ei=new ae,ql=new F,Gl=new F,jl=new F,Ql=new F;function Kl(a,e,t,i={},r={},n=0,s=1/0){e.boundingBox||e.computeBoundingBox(),kr.set(e.boundingBox.min,e.boundingBox.max,t),kr.needsUpdate=!0;const o=a.geometry,l=o.attributes.position,d=o.index,c=e.attributes.position,u=e.index,h=fe.getPrimitive(),f=fe.getPrimitive();let p=ql,y=Gl,v=null,w=null;r&&(v=jl,w=Ql);let m=1/0,x=null,g=null;return Fi.copy(t).invert(),ei.matrix.copy(Fi),a.shapecast({boundsTraverseOrder:b=>kr.distanceToBox(b),intersectsBounds:(b,S,_)=>_<m&&_<s?(S&&(ei.min.copy(b.min),ei.max.copy(b.max),ei.needsUpdate=!0),!0):!1,intersectsRange:(b,S)=>{if(e.boundsTree){const _=e.boundsTree;return _.shapecast({boundsTraverseOrder:I=>ei.distanceToBox(I),intersectsBounds:(I,P,T)=>T<m&&T<s,intersectsRange:(I,P)=>{for(let T=I,D=I+P;T<D;T++){const C=_.resolveTriangleIndex(T);te(f,3*C,u,c),f.a.applyMatrix4(t),f.b.applyMatrix4(t),f.c.applyMatrix4(t),f.needsUpdate=!0;for(let M=b,B=b+S;M<B;M++){const N=a.resolveTriangleIndex(M);te(h,3*N,d,l),h.needsUpdate=!0;const G=h.distanceToTriangle(f,p,v);if(G<m&&(y.copy(p),w&&w.copy(v),m=G,x=M,g=T),G<n)return!0}}}})}else{const _=mr(e);for(let I=0,P=_;I<P;I++){te(f,3*I,u,c),f.a.applyMatrix4(t),f.b.applyMatrix4(t),f.c.applyMatrix4(t),f.needsUpdate=!0;for(let T=b,D=b+S;T<D;T++){const C=a.resolveTriangleIndex(T);te(h,3*C,d,l),h.needsUpdate=!0;const M=h.distanceToTriangle(f,p,v);if(M<m&&(y.copy(p),w&&w.copy(v),m=M,x=T,g=I),M<n)return!0}}}}}),fe.releasePrimitive(h),fe.releasePrimitive(f),m===1/0?null:(i.point?i.point.copy(y):i.point=y.clone(),i.distance=m,i.faceIndex=x,r&&(r.point?r.point.copy(w):r.point=w.clone(),r.point.applyMatrix4(Fi),y.applyMatrix4(Fi),r.distance=y.sub(r.point).length(),r.faceIndex=g),i)}function an(a,e,t){return a===null?null:(a.point.applyMatrix4(e.matrixWorld),a.distance=a.point.distanceTo(t.ray.origin),a.object=e,a)}const Bi=new ae,$i=new sa,on=new F,ln=new U,cn=new F,Vr=["getX","getY","getZ"];class ut extends nr{static serialize(e,t={}){t={cloneBuffers:!0,...t};const i=e.geometry,r=e._roots,n=e._indirectBuffer,s=i.getIndex(),o={version:1,roots:null,index:null,indirectBuffer:null};return t.cloneBuffers?(o.roots=r.map(l=>l.slice()),o.index=s?s.array.slice():null,o.indirectBuffer=n?n.slice():null):(o.roots=r,o.index=s?s.array:null,o.indirectBuffer=n),o}static deserialize(e,t,i={}){i={setIndex:!0,indirect:!!e.indirectBuffer,...i};const{index:r,roots:n,indirectBuffer:s}=e;e.version||(console.warn("MeshBVH.deserialize: Serialization format has been changed and will be fixed up. It is recommended to regenerate any stored serialized data."),l(n));const o=new ut(t,{...i,[pi]:!0});if(o._roots=n,o._indirectBuffer=s||null,i.setIndex){const d=t.getIndex();if(d===null){const c=new at(e.index,1,!1);t.setIndex(c)}else d.array!==r&&(d.array.set(r),d.needsUpdate=!0)}return o;function l(d){for(let c=0;c<d.length;c++){const u=d[c],h=new Uint32Array(u),f=new Uint16Array(u);for(let p=0,y=u.byteLength/Z;p<y;p++){const v=k*p,w=2*v;j(w,f)||(h[v+6]=h[v+6]/k-p)}}}}get primitiveStride(){return 3}get resolveTriangleIndex(){return this.resolvePrimitiveIndex}constructor(e,t={}){t.maxLeafTris&&(console.warn('MeshBVH: "maxLeafTris" option has been deprecated. Use "targetLeafSize", instead.'),t={...t,targetLeafSize:t.maxLeafTris}),super(e,t)}shiftTriangleOffsets(e){return super.shiftPrimitiveOffsets(e)}writePrimitiveBounds(e,t,i){const r=this.geometry,n=this._indirectBuffer,s=r.attributes.position,o=r.index?r.index.array:null,d=(n?n[e]:e)*3;let c=d+0,u=d+1,h=d+2;o&&(c=o[c],u=o[u],h=o[h]);for(let f=0;f<3;f++){const p=s[Vr[f]](c),y=s[Vr[f]](u),v=s[Vr[f]](h);let w=p;y<w&&(w=y),v<w&&(w=v);let m=p;y>m&&(m=y),v>m&&(m=v),t[i+f]=w,t[i+f+3]=m}return t}computePrimitiveBounds(e,t,i){const r=this.geometry,n=this._indirectBuffer,s=r.attributes.position,o=r.index?r.index.array:null,l=s.normalized;if(e<0||t+e-i.offset>i.length/6)throw new Error("MeshBVH: compute triangle bounds range is invalid.");const d=s.array,c=s.offset||0;let u=3;s.isInterleavedBufferAttribute&&(u=s.data.stride);const h=["getX","getY","getZ"],f=i.offset;for(let p=e,y=e+t;p<y;p++){const w=(n?n[p]:p)*3,m=(p-f)*6;let x=w+0,g=w+1,b=w+2;o&&(x=o[x],g=o[g],b=o[b]),l||(x=x*u+c,g=g*u+c,b=b*u+c);for(let S=0;S<3;S++){let _,I,P;l?(_=s[h[S]](x),I=s[h[S]](g),P=s[h[S]](b)):(_=d[x+S],I=d[g+S],P=d[b+S]);let T=_;I<T&&(T=I),P<T&&(T=P);let D=_;I>D&&(D=I),P>D&&(D=P);const C=(D-T)/2,M=S*2;i[m+M+0]=T+C,i[m+M+1]=C+(Math.abs(T)+C)*Yi}}return i}raycastObject3D(e,t,i=[]){const{material:r}=e;if(r===void 0)return;ln.copy(e.matrixWorld).invert(),$i.copy(t.ray).applyMatrix4(ln),cn.setFromMatrixScale(e.matrixWorld),on.copy($i.direction).multiply(cn);const n=on.length(),s=t.near/n,o=t.far/n;if(t.firstHitOnly===!0){let l=this.raycastFirst($i,r,s,o);l=an(l,e,t),l&&i.push(l)}else{const l=this.raycast($i,r,s,o);for(let d=0,c=l.length;d<c;d++){const u=an(l[d],e,t);u&&i.push(u)}}return i}refit(e=null){return(this.indirect?Vl:Rl)(this,e)}raycast(e,t=er,i=0,r=1/0){const n=this._roots,s=[],o=this.indirect?Hl:Al;for(let l=0,d=n.length;l<d;l++)o(this,l,t,e,s,i,r);return s}raycastFirst(e,t=er,i=0,r=1/0){const n=this._roots;let s=null;const o=this.indirect?Ul:Fl;for(let l=0,d=n.length;l<d;l++){const c=o(this,l,t,e,i,r);c!=null&&(s==null||c.distance<s.distance)&&(s=c)}return s}intersectsGeometry(e,t){let i=!1;const r=this._roots,n=this.indirect?Wl:Bl;for(let s=0,o=r.length;s<o&&(i=n(this,s,e,t),!i);s++);return i}shapecast(e){const t=fe.getPrimitive(),i=super.shapecast({...e,intersectsPrimitive:e.intersectsTriangle,scratchPrimitive:t,iterate:this.indirect?Ml:Cl});return fe.releasePrimitive(t),i}bvhcast(e,t,i){let{intersectsRanges:r,intersectsTriangles:n}=i;const s=fe.getPrimitive(),o=this.geometry.index,l=this.geometry.attributes.position,d=this.indirect?p=>{const y=this.resolveTriangleIndex(p);te(s,y*3,o,l)}:p=>{te(s,p*3,o,l)},c=fe.getPrimitive(),u=e.geometry.index,h=e.geometry.attributes.position,f=e.indirect?p=>{const y=e.resolveTriangleIndex(p);te(c,y*3,u,h)}:p=>{te(c,p*3,u,h)};if(n){if(!(e instanceof ut))throw new Error('MeshBVH: "intersectsTriangles" callback can only be used with another MeshBVH.');const p=(y,v,w,m,x,g,b,S)=>{for(let _=w,I=w+m;_<I;_++){f(_),c.a.applyMatrix4(t),c.b.applyMatrix4(t),c.c.applyMatrix4(t),c.needsUpdate=!0;for(let P=y,T=y+v;P<T;P++)if(d(P),s.needsUpdate=!0,n(s,c,P,_,x,g,b,S))return!0}return!1};if(r){const y=r;r=function(v,w,m,x,g,b,S,_){return y(v,w,m,x,g,b,S,_)?!0:p(v,w,m,x,g,b,S,_)}}else r=p}return super.bvhcast(e,t,{intersectsRanges:r})}intersectsBox(e,t){return Bi.set(e.min,e.max,t),Bi.needsUpdate=!0,this.shapecast({intersectsBounds:i=>Bi.intersectsBox(i),intersectsTriangle:i=>Bi.intersectsTriangle(i)})}intersectsSphere(e){return this.shapecast({intersectsBounds:t=>e.intersectsBox(t),intersectsTriangle:t=>t.intersectsSphere(e)})}closestPointToGeometry(e,t,i={},r={},n=0,s=1/0){return(this.indirect?Kl:kl)(this,e,t,i,r,n,s)}closestPointToPoint(e,t={},i=0,r=1/0){return wl(this,e,t,i,r)}}const un=new F,dn=new F,hn=new F,Le=new sa,fn=new U,rt=new F,Hr=new F,Xl=["x","y","z"],Ni=parseInt(cr)>=169,Yl=parseInt(cr)<=161,Ei=new Y,zi=new Y,ki=new Y,pn=new F,mn=new F,gn=new F;class ui extends nr{get primitiveStride(){return 3}constructor(e,t={}){if(!e.isMesh)throw new Error("SkinnedMeshBVH: First argument must be a Mesh.");super(e.geometry,{...t,[pi]:!0}),this.mesh=e,t[pi]||this.init(t)}writePrimitiveBounds(e,t,i){const{mesh:r,geometry:n}=this,s=this._indirectBuffer,o=n.index?n.index.array:null,d=(s?s[e]:e)*3;let c=d+0,u=d+1,h=d+2;o&&(c=o[c],u=o[u],h=o[h]),r.getVertexPosition(c,un),r.getVertexPosition(u,dn),r.getVertexPosition(h,hn);for(let f=0;f<3;f++){const p=Xl[f],y=un[p],v=dn[p],w=hn[p];let m=y;v<m&&(m=v),w<m&&(m=w);let x=y;v>x&&(x=v),w>x&&(x=w),t[i+f]=m,t[i+f+3]=x}return t}shapecast(e){const t=new ge;return super.shapecast({...e,intersectsPrimitive:e.intersectsTriangle,scratchPrimitive:t,iterate:Zl})}raycastObject3D(e,t,i=[]){const{material:r}=e;if(r===void 0)return;const{matrixWorld:n}=e,{firstHitOnly:s}=t;fn.copy(n).invert(),Le.copy(t.ray).applyMatrix4(fn);let o=null,l=1/0;return this.shapecast({boundsTraverseOrder:d=>d.distanceToPoint(Le.origin),intersectsBounds:d=>{if(s){if(!Le.intersectBox(d,Hr))return Mr;let c;return d.containsPoint(Le.origin)?c=0:(Hr.applyMatrix4(n),c=t.ray.origin.distanceTo(Hr)),c<l?Ws:Mr}else return Le.intersectsBox(d)?Ws:Mr},intersectsTriangle:(d,c)=>{let u=null;if(r.side===er?u=Le.intersectTriangle(d.a,d.b,d.c,!0,rt):r.side===gs?u=Le.intersectTriangle(d.c,d.b,d.a,!0,rt):u=Le.intersectTriangle(d.a,d.b,d.c,!1,rt),!u)return;u=u.clone().applyMatrix4(n);const h=t.ray.origin.distanceTo(u);if(h>=t.near&&h<=t.far){if(s&&h>=l)return;const{geometry:f}=this,{index:p}=f,y=this.resolvePrimitiveIndex(c),v=y*3;let w=v+0,m=v+1,x=v+2;p&&(w=p.array[w],m=p.array[m],x=p.array[x]);const g={distance:h,point:u.clone(),object:e,uv:null,uv1:null,normal:null,face:{a:w,b:m,c:x,normal:Se.getNormal(d.a,d.b,d.c,new F),materialIndex:0},faceIndex:y};if(Ni){const I=new F;Se.getBarycoord(rt,d.a,d.b,d.c,I),g.barycoord=I}const b=f.attributes.uv,S=f.attributes.uv1,_=f.attributes.normal;if(b){Ei.fromBufferAttribute(b,w),zi.fromBufferAttribute(b,m),ki.fromBufferAttribute(b,x),g.uv=new Y;const I=Se.getInterpolation(rt,d.a,d.b,d.c,Ei,zi,ki,g.uv);Ni||(g.uv=I)}if(S){Ei.fromBufferAttribute(S,w),zi.fromBufferAttribute(S,m),ki.fromBufferAttribute(S,x),g.uv1=new Y;const I=Se.getInterpolation(rt,d.a,d.b,d.c,Ei,zi,ki,g.uv1);Ni||(g.uv1=I),Yl&&(g.uv2=g.uv1)}if(_){pn.fromBufferAttribute(_,w),mn.fromBufferAttribute(_,m),gn.fromBufferAttribute(_,x),g.normal=new F;const I=Se.getInterpolation(rt,d.a,d.b,d.c,pn,mn,gn,g.normal);g.normal.dot(Le.direction)>0&&g.normal.multiplyScalar(-1),Ni||(g.normal=I)}l=g.distance,o=g,s||i.push(g)}}}),s&&o&&i.push(o),i}}function Zl(a,e,t,i,r,n,s){const{mesh:o,geometry:l}=t,d=l.index?l.index.array:null;for(let c=a,u=e+a;c<u;c++){const h=t.resolvePrimitiveIndex(c);let f=3*h+0,p=3*h+1,y=3*h+2;if(d&&(f=d[f],p=d[p],y=d[y]),o.getVertexPosition(f,s.a),o.getVertexPosition(p,s.b),o.getVertexPosition(y,s.c),s.needsUpdate=!0,i(s,c,r,n))return!0}return!1}const ft=new K({min:"array<f32, 3>",max:"array<f32, 3>"},"BVHBoundingBox");ft.getLength=()=>6;const pt=new K({bounds:"BVHBoundingBox",rightChildOrTriangleOffset:"uint",splitAxisOrTriangleCount:"uint"},"BVHNode");pt.getLength=()=>ft.getLength()+2;const Jl=new K({matrixWorld:"mat4x4f",inverseMatrixWorld:"mat4x4f",visible:"uint",_alignment0:"uint",_alignment1:"uint",_alignment2:"uint"},"TransformStruct"),V=new K({origin:"vec3f",direction:"vec3f",maxDist:"float"},"Ray"),Bt=new K({indices:"vec4u",normal:"vec3f",didHit:"bool",barycoord:"vec3f",objectIndex:"uint",side:"float",dist:"float"},"IntersectionResult"),Vi=new K({faceIndices:"vec4u",closestPoint:"vec3f",found:"bool",barycoord:"vec3f",objectIndex:"uint",faceNormal:"vec3f",side:"float",distanceSq:"float"},"PointQueryResult"),Cs=ur(`

	const BVH_STACK_DEPTH = 60u;
	const INFINITY = 1e20;
	const TRI_INTERSECT_EPSILON = 1e-5;

`),Rs=ur(`
	struct IntersectionResult {
		indices: vec4u,
		normal: vec3f,
		didHit: bool,
		barycoord: vec3f,
		side: f32,
		dist: f32,
	};
`);A(`

	fn getVertexAttribute(
		barycoord: vec3f,
		indices: vec3u,
		attributeBuffer: ptr<storage, array<vec3f>, read>
	) -> vec3f {

		let n0 = attributeBuffer[ indices.x ];
		let n1 = attributeBuffer[ indices.y ];
		let n2 = attributeBuffer[ indices.z ];
		return barycoord.x * n0 + barycoord.y * n1 + barycoord.z * n2;

	}

`);const ec=A(`

	fn intersectsBounds(
		ray: Ray,
		bounds: BVHBoundingBox,
		dist: ptr<function, f32>
	) -> bool {

		let boundsMin = vec3( bounds.min[0], bounds.min[1], bounds.min[2] );
		let boundsMax = vec3( bounds.max[0], bounds.max[1], bounds.max[2] );

		let invDir = 1.0 / ray.direction;
		let tMinPlane = ( boundsMin - ray.origin ) * invDir;
		let tMaxPlane = ( boundsMax - ray.origin ) * invDir;

		let tMinHit = vec3f(
			min( tMinPlane.x, tMaxPlane.x ),
			min( tMinPlane.y, tMaxPlane.y ),
			min( tMinPlane.z, tMaxPlane.z )
		);

		let tMaxHit = vec3f(
			max( tMinPlane.x, tMaxPlane.x ),
			max( tMinPlane.y, tMaxPlane.y ),
			max( tMinPlane.z, tMaxPlane.z )
		);

		let t0 = max( max( tMinHit.x, tMinHit.y ), tMinHit.z );
		let t1 = min( min( tMaxHit.x, tMaxHit.y ), tMaxHit.z );

		( *dist ) = max( t0, 0.0 );

		return t1 >= ( *dist );

	}

`,[V,ft]),ga=A(`

	fn intersectsTriangle( ray: Ray, a: vec3f, b: vec3f, c: vec3f ) -> IntersectionResult {

		var result: IntersectionResult;
		result.didHit = false;

		let edge1 = b - a;
		let edge2 = c - a;
		let n = cross( edge1, edge2 );

		let det = - dot( ray.direction, n );

		if ( abs( det ) < TRI_INTERSECT_EPSILON ) {

			return result;

		}

		let invdet = 1.0 / det;

		let AO = ray.origin - a;
		let DAO = cross( AO, ray.direction );

		let u = dot( edge2, DAO ) * invdet;
		let v = -dot( edge1, DAO ) * invdet;
		let t = dot( AO, n ) * invdet;

		let w = 1.0 - u - v;

		if ( u < - TRI_INTERSECT_EPSILON || v < - TRI_INTERSECT_EPSILON || w < - TRI_INTERSECT_EPSILON || t < TRI_INTERSECT_EPSILON ) {

			return result;

		}

		result.didHit = true;
		result.barycoord = vec3f( w, u, v );
		result.dist = t;
		result.side = sign( det );
		result.normal = result.side * normalize( n );

		return result;

	}

`,[V,Rs,Cs]),tc=A(`

	fn intersectTriangles(
		bvh_position: ptr<storage, array<vec3f>, read>,
		bvh_index: ptr<storage, array<vec3u>, read>,
		offset: u32,
		count: u32,
		ray: Ray
	) -> IntersectionResult {

		var closestResult: IntersectionResult;

		closestResult.didHit = false;
		closestResult.dist = INFINITY;

		for ( var i = offset; i < offset + count; i = i + 1u ) {

			let indices = bvh_index[ i ];
			let a = bvh_position[ indices.x ];
			let b = bvh_position[ indices.y ];
			let c = bvh_position[ indices.z ];

			var triResult = intersectsTriangle( ray, a, b, c );

			if ( triResult.didHit && triResult.dist < closestResult.dist ) {

				closestResult = triResult;
				closestResult.indices = vec4u( indices.xyz, i );

			}

		}

		return closestResult;

	}

`,[ga,V,Rs,Cs]);A(`

	fn bvhIntersectFirstHit(
		bvh_index: ptr<storage, array<vec3u>, read>,
		bvh_position: ptr<storage, array<vec3f>, read>,
		bvh: ptr<storage, array<BVHNode>,read>,
		ray: Ray,
	) -> IntersectionResult {

		var pointer = 0;
		var stack: array<u32, BVH_STACK_DEPTH>;
		stack[ 0 ] = 0u;

		var bestHit: IntersectionResult;

		bestHit.didHit = false;
		bestHit.dist = INFINITY;

		loop {

			if ( pointer < 0 || pointer >= i32( BVH_STACK_DEPTH ) ) {

				break;

			}

			let currNodeIndex = stack[ pointer ];
			let node = bvh[ currNodeIndex ];

			pointer = pointer - 1;

			var boundsHitDistance: f32 = 0.0;

			if ( ! intersectsBounds( ray, node.bounds, &boundsHitDistance ) || boundsHitDistance > bestHit.dist ) {

				continue;

			}

			let boundsInfox = node.splitAxisOrTriangleCount;
			let boundsInfoy = node.rightChildOrTriangleOffset;

			let isLeaf = ( boundsInfox & 0xffff0000u ) != 0u;

			if ( isLeaf ) {

				let count = boundsInfox & 0x0000ffffu;
				let offset = boundsInfoy;

				let localHit = intersectTriangles(
					bvh_position, bvh_index, offset,
					count, ray
				);

				if ( localHit.didHit && localHit.dist < bestHit.dist ) {

					bestHit = localHit;

				}

			} else {

				let leftIndex = currNodeIndex + 1u;
				let splitAxis = boundsInfox & 0x0000ffffu;
				let rightIndex = currNodeIndex + boundsInfoy;

				let leftToRight = ray.direction[splitAxis] >= 0.0;
				let c1 = select( rightIndex, leftIndex, leftToRight );
				let c2 = select( leftIndex, rightIndex, leftToRight );

				pointer = pointer + 1;
				stack[ pointer ] = c2;

				pointer = pointer + 1;
				stack[ pointer ] = c1;

			}

		}

		return bestHit;

	}

`,[tc,ec,V,pt,Rs,Cs]);class xa extends xs{static get type(){return"ProxyCallNode"}constructor(e,t){super(),this.proxyNode=e,this.params=t}setup(){return this.proxyNode.proxyNode.call(...this.params)}}class Ps{get isNode(){return!0}get proxyNode(){const{proxyObject:e,proxyProperty:t}=this,i=t.split(".");let r=e;for(let n=0,s=i.length;n<s;n++)r=r?.[i[n]];return r&&"functionNode"in r?r.functionNode:r??null}constructor(e,t=null){return this.proxyObject=t,this.proxyProperty=e,new Proxy(this,{get(i,r){if(r in i)return Reflect.get(i,r);{const n=i.proxyNode;if(!n)return;const s=Reflect.get(n,r);return typeof s=="function"?s.bind(n):s}},set(i,r,n){if(r in i)return Reflect.set(i,r,n);throw new Error("NodeProxy: Cannot set members of proxied nodes.")}})}}const q=(...a)=>new Ps(...a),H=(...a)=>{const e=new Ps(...a),t=(...i)=>new xa(e,i);return dr.nodeProxyConstructor(t,e)};class ic extends Ps{get proxyNode(){return super.proxyNode||this.fallbackNode}constructor(e,t){super(e,null),Object.defineProperty(this,"fallbackNode",{value:t})}setup(e){return this.proxyObject=e.getContext(),this.proxyNode.setup(e)}}const Wt=(...a)=>{const e=new ic(...a),t=(...i)=>new xa(e,i);return dr.nodeProxyConstructor(t,e)},Ue=new lt,Re=new lt;function rc(a,e){const t=a?a.array:null,i=new Uint32Array(e.length*3);for(let r=0,n=e.length;r<n;r++){const s=3*r,o=3*e[r];for(let l=0;l<3;l++)i[s+l]=t?t[o+l]:o+l}return i}function xn(a,e,t,i){const r=new Uint32Array(i),n=new Float32Array(i);a._roots.forEach(s=>{const o=new Uint16Array(s),l=new Uint32Array(s);for(let d=0,c=s.byteLength/Z;d<c;d++){const u=d*k,h=u*2,f=t*k,p=new Float32Array(s,d*Z,6);if(d===0)for(let v=0;v<3;v++){const w=p[v+0],m=p[v+3];w>m?(n[f+v+0]=1,n[f+v+3]=-1):(n[f+v+0]=w,n[f+v+3]=m)}else n.set(p,f);if(e===null){t++;continue}if(j(h,o)){const v=l[u+6],w=o[h+14],{transformSlot:m,nodeOffset:x}=w===0?{transformSlot:0,nodeOffset:0}:e[v];if(m>16777215)throw new Error(`packBVHBufferUtils: transform slot ${m} exceeds the 24-bit TLAS leaf limit.`);r[f+6]=x,r[f+7]=4278190080|m&16777215}else r[f+6]=l[u+6],r[f+7]=l[u+7];t++}})}function sc(a,e){return va(new Uint16Array(a),new Uint32Array(a),e)}function va(a,e,t){if(j(t*k*2,a))return 1;const r=e[t*k+6];return r+va(a,e,t+r)}function vn(a,e=0){const t=new Uint16Array(a),i=new Uint32Array(a);let r=0;return n(e*k,1),r;function n(s,o){const l=s,d=s*2;if(j(d,t))r=Math.max(o,r);else{const u=ee(l,i),h=J(l);n(h,o+1),n(u,o+1)}}}function nc(a,e,t,i,r,n){const s=new Uint16Array(n),o=new Uint32Array(n),l=new Float32Array(n),d=new Uint16Array(a),c=new Uint32Array(a);for(let u=0;u<t;u++){const h=e+u,f=h*k,p=f*2,y=r*k,v=y*2,w=new Float32Array(a,h*Z,6);if(u===0)for(let x=0;x<3;x++){const g=w[x+0],b=w[x+3];g>b?(l[y+x+0]=1,l[y+x+3]=-1):(l[y+x+0]=g,l[y+x+3]=b)}else l.set(w,y);j(p,d)?(o[y+6]=c[f+6]+i,s[v+14]=d[p+14],s[v+15]=ws):(o[y+6]=c[f+6],o[y+7]=c[f+7]),r++}}function ac(a,e,t,i,r){const{geometry:n}=a,{start:s,count:o,vertexStart:l}=e;if(a.indirect){const d=rc(n.index,a._indirectBuffer);for(let c=0;c<d.length;c++)r[c+i]=d[c]-l+t}else if(n.index)for(let d=0;d<o;d++)r[d+i]=n.index.getX(d+s)-l+t;else for(let d=0;d<o;d++)r[d+i]=d+s+t}function oc(a,e,t,i,r,n){const{geometry:s,mesh:o=null}=a,{vertexStart:l,vertexCount:d}=e,c=new Float32Array(i),u=r.getLength();r.membersLayout.forEach(({name:h},f)=>{const p=s.attributes[h];n.getDefaultAttributeValue(h,Ue);for(let y=0;y<d;y++){if(p){switch(Re.fromBufferAttribute(p,y+l),p.itemSize){case 1:Re.y=Ue.y,Re.z=Ue.z,Re.w=Ue.w;break;case 2:Re.z=Ue.z,Re.w=Ue.w;break;case 3:Re.w=Ue.w;break}o&&(h==="position"||h==="normal"||h==="tangent")&&o.applyBoneTransform(y+l,Re)}else Re.copy(Ue);Re.toArray(c,(t+y)*u+f*4)}})}class lc extends xs{constructor(e){super(),this.literal=e}build(){return this.literal}}class ls extends xs{constructor(e,t="property"){super(),this.node=e,this.output=t}build(e){return this.node.build(e,this.output)}}function cc(a){return a.isNode?new ls(a):null}function ya(a){const e=[];for(const t of a)if(Array.isArray(t))for(const i of t){const r=cc(i);r&&e.push(r)}return e}function ba(a,e){return a.map(t=>(t&&!t.isNode&&t instanceof Function&&(t=t(e)),t&&t.isNode?(t.setup(e),t.isWGSLTagCodeNode?new ls(t,"inline"):new ls(t)):t))}function cs(a,e,t){let i="";for(let r=0,n=a.length;r<n;r++)if(i+=a[r],r<e.length){const s=e[r];Array.isArray(s)||(typeof s=="string"||typeof s=="number"?i+=String(s):i+=s.build(t))}return i}class uc extends yo{static get type(){return"WGSLTagFnNode"}constructor(e,t,i="wgsl"){super("",ya(t),i),this.isWGSLTagFnNode=!0,this.tokens=e,this.args=t}setup(e){super.setup(e),this._normalizedArgs=ba(this.args,e)}getNodeFunction(e){const{tokens:t,_normalizedArgs:i}=this,r=e.getDataFromNode(this);let n=r.nodeFunction;if(n===void 0){let s="";for(let o=0,l=t.length;o<l;o++)if(s+=t[o],o<i.length){const d=i[o];Array.isArray(d)||(typeof d=="string"||typeof d=="number"?s+=String(d):d.isStructLayoutNode?s+=d.getNodeType(e):d.isStruct?s+=d.layout.getNodeType(e):s+="_arg"+o)}s=s.replace(/\/\/.*[\n\r]/g,""),n=e.parser.parseFunction(s),r.nodeFunction=n}return n}generate(e,t){const i=super.generate(e,t),{_normalizedArgs:r}=this,n=cs(this.tokens,r,e),{type:s}=this.getNodeFunction(e),o=e.getCodeFromNode(this,s);return o.code=n.replace(/\/\/.+[\n\r]/g,"").replace(/->\s*void/,"").trim(),i}}class dc extends bo{static get type(){return"WGSLTagCodeNode"}constructor(e,t,i="wgsl"){super("",ya(t),i),this.isWGSLTagCodeNode=!0,this.tokens=e,this.args=t}setup(e){super.setup(e),this._normalizedArgs=ba(this.args,e)}build(e,t){return t==="inline"?cs(this.tokens,this._normalizedArgs,e):super.build(e,t)}generate(e){super.generate(e);const t=e.getCodeFromNode(this,this.getNodeType(e));return t.code=cs(this.tokens,this._normalizedArgs,e),t.code}}const hc=a=>{const e=(...t)=>{if(t.length===1&&t[0]&&typeof t[0]=="object"&&!t[0].isNode){const i=t[0];for(const r in i)typeof i[r]=="string"&&(i[r]=new lc(i[r]))}return a.call(...t)};return dr.nodeProxyConstructor(e,a)},R=(a,...e)=>hc(new uc(a,e)),Mt=(a,...e)=>new dc(a,e),us=ht(60);function fc(a,e){const{name:t=`bvh_shapecast_fn_${Math.random().toString(36).substring(2,7)}`,shapeStruct:i,resultStruct:r=null,prefixFn:n=null,boundsOrderFn:s=null,intersectsBoundsFn:o,intersectRangeFn:l,transformShapeFn:d=null,transformResultFn:c=null,resetShapeFn:u=null}=e,{nodes:h,transforms:f}=a.storage;let p="";n&&(p=Mt`${n}();`);let y="";c&&(y=Mt`${c}( result, objectIndex );`);let v="";d&&(v=Mt`${d}( &localShape, objectIndex );`);let w="";u&&(w=Mt`${u}( objectIndex );`);let m="";s&&(m=Mt`
			let leftToRight = ${s}( localShape, splitAxis, node );
			c1 = select( rightIndex, leftIndex, leftToRight );
			c2 = select( leftIndex, rightIndex, leftToRight );
		`);const x=r?Mt`result: ptr<function, ${r}>`:"",g=r?"result":"",b=R`
		// fn
		fn ${t}( shape: ${i}, ${x} ) -> bool {

			${p}

			var didHit = false;

			var isTLAS = true;
			var pointer: i32 = 0;
			var stack: array<u32, ${us}>;
			stack[ 0 ] = 0u;

			var blasDidHit: bool = false;
			var objectIndex: u32 = 0;
			var localShape: ${i} = shape;

			// the stack depth the current cluster's BLAS drains back down to once it is complete
			var tlasReset: i32 = 0;

			loop {

				// The cluster's BLAS has drained back to its TLAS leaf. Finalize the cluster that
				// was just traversed and resume the TLAS.
				if ( ! isTLAS && tlasReset == pointer ) {

					if ( blasDidHit ) {

						blasDidHit = false;
						didHit = true;
						${y}

					}

					${w}

					objectIndex = 0;
					isTLAS = true;
					localShape = shape;

				}

				// check if we've finished all nodes on the stack (or overrun the stack)
				if ( pointer < 0 || pointer >= i32( ${us} ) ) {

					break;

				}

				let nodeIndex = stack[ pointer ];
				let node = ${h}[ nodeIndex ];
				pointer = pointer - 1;

				// skip the node if we don't intersect the bounds
				if ( ${o}( localShape, node.bounds, ${g} ) == 0u ) {

					continue;

				}

				let infoX = node.splitAxisOrTriangleCount;
				let infoY = node.rightChildOrTriangleOffset;
				let isLeaf = ( infoX & 0xffff0000u ) != 0u;

				if ( isLeaf ) {

					if ( isTLAS ) {

						// the leaf encodes the placement / transform slot in the low 24 bits of infoX
						// and the cluster subtree's absolute node offset in infoY, which is pushed
						// directly as the BLAS entry node. Each TLAS leaf references one cluster.
						objectIndex = infoX & 0x00ffffffu;

						let transform = ${f}[ objectIndex ];
						if ( transform.visible != 0u ) {

							tlasReset = pointer;
							isTLAS = false;
							blasDidHit = false;

							// Transform shape into object local space
							localShape = shape;
							${v}

							pointer = pointer + 1;
							stack[ pointer ] = infoY;

						}

					} else {

						let count = infoX & 0x0000ffffu;
						let offset = infoY;
						blasDidHit = ${l}( localShape, offset, count, ${g} ) || blasDidHit;

					}

				} else {

					let leftIndex = nodeIndex + 1u;
					let splitAxis = infoX & 0x0000ffffu;
					let rightIndex = nodeIndex + infoY;

					var c1 = rightIndex;
					var c2 = leftIndex;
					${m}

					pointer = pointer + 1;
					stack[ pointer ] = c2;

					pointer = pointer + 1;
					stack[ pointer ] = c1;

				}

			}

			return didHit;

		}
	`;return b.outputType=r,b.functionName=t,b}const pc=R`
	// fn
	fn closestPointToTriangle(
		p: vec3f,
		v0: vec3f,
		v1: vec3f,
		v2: vec3f
	) -> vec3f {

		let v10 = v1 - v0;
		let v21 = v2 - v1;
		let v02 = v0 - v2;
		let p0 = p - v0;
		let p1 = p - v1;
		let p2 = p - v2;

		let nor = cross( v10, v02 );
		let q = cross( nor, p0 );
		let d = 1.0 / dot( nor, nor );
		var u = d * dot( q, v02 );
		var v = d * dot( q, v10 );
		var w = 1.0 - u - v;

		if ( u < 0.0 ) {

			w = clamp( dot( p2, v02 ) / dot( v02, v02 ), 0.0, 1.0 );
			u = 0.0;
			v = 1.0 - w;

		} else if ( v < 0.0 ) {

			u = clamp( dot( p0, v10 ) / dot( v10, v10 ), 0.0, 1.0 );
			v = 0.0;
			w = 1.0 - u;

		} else if ( w < 0.0 ) {

			v = clamp( dot( p1, v21 ) / dot( v21, v21 ), 0.0, 1.0 );
			w = 0.0;
			u = 1.0 - v;

		}

		return vec3f( w, u, v );

	}
`,wa=R`
	// fn
	fn intersectRayTriangle( ray: ${V}, a: vec3f, b: vec3f, c: vec3f, threshold: f32 ) -> ${Bt} {

		const DET_EPSILON = 1e-15;

		var result: ${Bt};
		result.didHit = false;

		let edge1 = b - a;
		let edge2 = c - a;
		let n = cross( edge1, edge2 );

		let det = - dot( ray.direction, n );
		if ( abs( det ) < DET_EPSILON ) {

			return result;

		}

		let invdet = 1.0 / det;

		let AO = ray.origin - a;
		let DAO = cross( AO, ray.direction );

		let u = dot( edge2, DAO ) * invdet;
		if ( u < 0.0 || u > 1.0 ) {

			return result;

		}

		let v = - dot( edge1, DAO ) * invdet;
		if ( v < 0.0 || u + v > 1.0 ) {

			return result;

		}

		let t = dot( AO, n ) * invdet;
		let w = 1.0 - u - v;
		if ( t < threshold ) {

			return result;

		}

		result.didHit = true;
		result.barycoord = vec3f( w, u, v );
		result.dist = t;
		result.side = sign( det );
		result.normal = result.side * normalize( n );

		return result;

	}
`,xr=R`
	// fn
	fn ndcToCameraRay( ndc: vec2f, inverseModelViewProjection: mat4x4f ) -> ${V} {

		var homogeneous = vec4f();
		var ray: ${V};

		homogeneous = inverseModelViewProjection * vec4f( ndc, 0.0, 1.0 );
		ray.origin = homogeneous.xyz / homogeneous.w;

		homogeneous = inverseModelViewProjection * vec4f( ndc, 1.0, 1.0 );
		let toFarPlane = ( homogeneous.xyz / homogeneous.w ) - ray.origin;
		ray.maxDist = length( toFarPlane );
		ray.direction = toFarPlane / ray.maxDist;

		return ray;

	}
`;function mc(a){const{index:e,attributes:t,transforms:i}=a.storage,r=Ke(1).toVar(`bvh_rayScalar_${Math.random().toString(36).substring(2,7)}`);return a.getShapecastFn({name:"bvh_RaycastFirstHit",shapeStruct:V,resultStruct:Bt,boundsOrderFn:R`
			fn getBoundsOrder( ray: ${V}, splitAxis: u32, node: ${pt} ) -> bool {

				return ray.direction[ splitAxis ] >= 0.0;

			}
		`,intersectsBoundsFn:R`
			fn rayIntersectsBounds( ray: ${V}, bounds: ${ft}, result: ptr<function, ${Bt}> ) -> u32 {

				let boundsMin = vec3( bounds.min[0], bounds.min[1], bounds.min[2] );
				let boundsMax = vec3( bounds.max[0], bounds.max[1], bounds.max[2] );

				let invDir = 1.0 / ray.direction;
				let tMinPlane = ( boundsMin - ray.origin ) * invDir;
				let tMaxPlane = ( boundsMax - ray.origin ) * invDir;

				let tMinHit = vec3f(
					min( tMinPlane.x, tMaxPlane.x ),
					min( tMinPlane.y, tMaxPlane.y ),
					min( tMinPlane.z, tMaxPlane.z )
				);

				let tMaxHit = vec3f(
					max( tMinPlane.x, tMaxPlane.x ),
					max( tMinPlane.y, tMaxPlane.y ),
					max( tMinPlane.z, tMaxPlane.z )
				);

				let t0 = max( max( tMinHit.x, tMinHit.y ), tMinHit.z );
				let t1 = min( min( tMaxHit.x, tMaxHit.y ), tMaxHit.z );

				let dist = max( t0, 0.0 );
				if ( t1 < dist ) {

					return 0u;

				} else if ( ray.maxDist > 0.0 && dist * ${r} >= ray.maxDist ) {

					return 0u;

				} else if ( result.didHit && dist * ${r} >= result.dist ) {

					return 0u;

				} else {

					return 1u;

				}

			}

		`,intersectRangeFn:R`
			fn intersectRange( ray: ${V}, offset: u32, count: u32, result: ptr<function, ${Bt}> ) -> bool {

				var didHit = false;
				for ( var ti = offset; ti < offset + count; ti = ti + 1u ) {

					let i0 = ${e}[ ti * 3u ];
					let i1 = ${e}[ ti * 3u + 1u ];
					let i2 = ${e}[ ti * 3u + 2u ];

					let a = ${t}[ i0 ].position.xyz;
					let b = ${t}[ i1 ].position.xyz;
					let c = ${t}[ i2 ].position.xyz;

					var triResult = ${wa}( ray, a, b, c, 0.0 );
					triResult.dist *= ${r};
					if ( triResult.didHit && ( ray.maxDist <= 0.0 || triResult.dist < ray.maxDist ) && ( ! result.didHit || triResult.dist < result.dist ) ) {

						result.didHit = true;
						result.dist = triResult.dist;
						result.normal = triResult.normal;
						result.side = triResult.side;
						result.barycoord = triResult.barycoord;
						result.indices = vec4u( i0, i1, i2, ti );

						didHit = true;

					}

				}

				return didHit;

			}
		`,transformShapeFn:R`
			fn transformRay( ray: ptr<function, ${V}>, objectIndex: u32 ) -> void {

				let toLocal = ${i}[ objectIndex ].inverseMatrixWorld;
				ray.origin = ( toLocal * vec4f( ray.origin, 1.0 ) ).xyz;
				ray.direction = ( toLocal * vec4f( ray.direction, 0.0 ) ).xyz;

				let len = length( ray.direction );
				ray.direction /= len;
				${r} = 1.0 / len;

			}
		`,transformResultFn:R`
			fn transformResult( hit: ptr<function, ${Bt}>, objectIndex: u32 ) -> void {

				let toLocal = ${i}[ objectIndex ].inverseMatrixWorld;
				hit.normal = normalize( ( transpose( toLocal ) * vec4f( hit.normal, 0.0 ) ).xyz );
				hit.objectIndex = objectIndex;

			}
		`,resetShapeFn:R`
			fn resetRayScalar( objectIndex: u32 ) -> void {

				${r} = 1.0;

			}
		`})}function gc(a){const{storage:e,structs:t}=a,i=t.attributes.membersLayout.map(({name:r})=>`result.${r} = a0.${r} * barycoord.x + a1.${r} * barycoord.y + a2.${r} * barycoord.z;`).join(`
`);return R`
		// fn
		fn bvh_sampleTrianglePoint( barycoord: vec3f, indices: vec3u ) -> ${t.attributes} {

			var result: ${t.attributes};
			var a0 = ${e.attributes}[ indices.x ];
			var a1 = ${e.attributes}[ indices.y ];
			var a2 = ${e.attributes}[ indices.z ];
			${i}
			return result;

		}
	`}function xc(a){const{index:e,attributes:t,transforms:i}=a.storage,r=wo().toVar("bvh_toWorldMat");return a.getShapecastFn({name:"bvh_ClosestPointToPoint",shapeStruct:"vec3f",resultStruct:Vi,boundsOrderFn:R`
			fn cppBoundsOrder( shape: vec3f, splitAxis: u32, node: ${pt} ) -> bool {

				let toWorld = ${r};

				// get center
				let bMin = vec3f( node.bounds.min[ 0 ], node.bounds.min[ 1 ], node.bounds.min[ 2 ] );
				let bMax = vec3f( node.bounds.max[ 0 ], node.bounds.max[ 1 ], node.bounds.max[ 2 ] );
				let center = bMin * 0.5 + bMax * 0.5;

				// determine the order in world space
				let worldCenter = ( toWorld * vec4f( center, 1.0 ) ).xyz;
				let worldAxis = normalize( toWorld[ splitAxis ].xyz );
				return dot( shape - worldCenter, worldAxis ) <= 0.0;

			}
		`,intersectsBoundsFn:R`
			fn cppIntersectsBounds( shape: vec3f, bounds: ${ft}, result: ptr<function, ${Vi}> ) -> u32 {

				// return 1u;
				// we need to check this no matter what if the result has not been found yet
				if ( ! result.found ) {

					return 1u;

				}

				let toWorld = ${r};

				// transform to world space
				let bMin = vec3f( bounds.min[ 0 ], bounds.min[ 1 ], bounds.min[ 2 ] );
				let bMax = vec3f( bounds.max[ 0 ], bounds.max[ 1 ], bounds.max[ 2 ] );
				let center = ( bMin + bMax ) * 0.5;
				let halfExtent = ( bMax - bMin ) * 0.5;
				let worldCenter = ( toWorld * vec4f( center, 1.0 ) ).xyz;
				let worldHalfExtent =
					abs( toWorld[ 0 ].xyz ) * halfExtent.x +
				    abs( toWorld[ 1 ].xyz ) * halfExtent.y +
				    abs( toWorld[ 2 ].xyz ) * halfExtent.z;
				let worldMin = worldCenter - worldHalfExtent;
				let worldMax = worldCenter + worldHalfExtent;

				// intersect if the distance to the bounds is not bigger than the already found
				let d = shape - clamp( shape, worldMin, worldMax );
				return select( 0u, 1u, dot( d, d ) < result.distanceSq );

			}
		`,intersectRangeFn:R`
			fn cppIntersectsRange( shape: vec3f, offset: u32, count: u32, result: ptr<function, ${Vi}> ) -> bool {

				var didHit = false;
				let toWorld = ${r};

				for ( var i = offset; i < offset + count; i ++ ) {

					// transform the triangle to world space
					let i0 = ${e}[ i * 3u + 0u ];
					let i1 = ${e}[ i * 3u + 1u ];
					let i2 = ${e}[ i * 3u + 2u ];
					let a = ( toWorld * vec4f( ${t}[ i0 ].position.xyz, 1.0 ) ).xyz;
					let b = ( toWorld * vec4f( ${t}[ i1 ].position.xyz, 1.0 ) ).xyz;
					let c = ( toWorld * vec4f( ${t}[ i2 ].position.xyz, 1.0 ) ).xyz;

					let barycoord = ${pc}( shape, a, b, c );
					let closestPoint = barycoord.x * a + barycoord.y * b + barycoord.z * c;
					let delta = shape - closestPoint;
					let distSq = dot( delta, delta );

					// copy the content over
					if ( ! result.found || distSq < result.distanceSq ) {

						let normal = normalize( cross( a - b, b - c ) );

						result.closestPoint = closestPoint;
						result.barycoord = barycoord;
						result.distanceSq = distSq;
						result.faceNormal = normal;
						result.side = sign( dot( normal, delta ) );
						result.faceIndices = vec4u( i0, i1, i2, i );
						result.found = true;
						didHit = true;

					}

				}

				return didHit;

			}
		`,resetShapeFn:R`
				fn cppResetShape( objectIndex: u32 ) -> void {

					// node bounds are transformed by "toWorld" during the bounds tests. Only the
					// object-local BLAS bounds need the object's world matrix - the top-level bounds
					// are already in world space - so restore identity before top-level traversal resumes.
					${r} = mat4x4f(
						1.0, 0.0, 0.0, 0.0,
						0.0, 1.0, 0.0, 0.0,
						0.0, 0.0, 1.0, 0.0,
						0.0, 0.0, 0.0, 1.0
					);

				}
			`,transformShapeFn:R`
			fn cppTransformShape( shape: ptr<function, vec3f>, objectIndex: u32 ) -> void {

				${r} = ${i}[ objectIndex ].matrixWorld;

			}
		`,transformResultFn:R`
			fn cppTransformResult( result: ptr<function, ${Vi}>, objectIndex: u32 ) -> void {

				result.objectIndex = objectIndex;

			}
		`})}const di=24,Or=(1<<di)-1,_a=31-di,vc=(1<<_a)-1,Ur=new U,Wr=new xe,ti=new U;class yc extends ma{constructor(e,t){super(),t={getBVH:(s,o)=>{throw new Error("ClusteredBVH: getBVH callback must be provided ")},shouldCluster:s=>s.isSkinnedMesh||s.isInstancedMesh||s.isBatchedMesh,primitiveLimit:64,matrixWorld:Array.isArray(e)?new U:e.matrixWorld,includeInstances:!0,_strictLeafSize:1,...t};const i=Array.from(Sa(e)),r=Math.ceil(Math.log2(i.length)),n=(1<<r)-1;this.objects=i,this.getBVH=t.getBVH,this.shouldCluster=t.shouldCluster,this.includeInstances=t.includeInstances,this.primitiveLimit=t.primitiveLimit,this.matrixWorld=t.matrixWorld,this.bvhMap=new WeakMap,this.idBits=r,this.idMask=n,this.primitiveBufferStride=2,this.init(t)}init(e){let t=0;const{objects:i,bvhMap:r,matrixWorld:n}=this;Ur.copy(n).invert(),i.forEach(s=>{const o=[];for(let l=0,d=this._getInstanceCount(s);l<d;l++){const c=this.getBVH(s,l);o.push(c),c&&(t+=this.shouldCluster(s)?c._roots.length:this._countRelevantLeafNodes(c))}r.set(s,o)}),this.primitiveBuffer=new Uint32Array(t*2),this._fillPrimitiveBuffer(this.primitiveBuffer),super.init(e)}getRootRanges(){return[{offset:0,count:this.primitiveBuffer.length/this.primitiveBufferStride}]}refit(...e){Ur.copy(this.matrixWorld).invert(),super.refit(...e)}writePrimitiveBounds(e,t,i){const{primitiveBuffer:r,bvhMap:n,objects:s}=this,o=r[2*e+0],l=r[2*e+1],d=s[this.getObjectId(o)],c=this.getInstanceId(o),u=n.get(d)[c],h=this.getBVHRootIndex(l),f=this.getBVHNodeIndex(l);d.isInstancedMesh||d.isBatchedMesh?(d.getMatrixAt(c,ti),ti.premultiply(d.matrixWorld)):ti.copy(d.matrixWorld),ti.premultiply(Ur),X(f,new Float32Array(u._roots[h]),Wr),Wr.applyMatrix4(ti);const{min:p,max:y}=Wr;t[i+0]=p.x,t[i+1]=p.y,t[i+2]=p.z,t[i+3]=y.x,t[i+4]=y.y,t[i+5]=y.z}getInstanceId(e){const{idMask:t,idBits:i}=this;return(e&~t)>>>i}getObjectId(e){const{idMask:t}=this;return e&t}getBVHRootIndex(e){return e>>>di}getBVHNodeIndex(e){return(e&Or)*k}_getInstanceCount(e){const{includeInstances:t}=this;return e.isInstancedMesh&&t?e.count:e.isBatchedMesh&&t?e.instanceCount:1}_fillPrimitiveBuffer(e){const{objects:t,bvhMap:i,idBits:r,primitiveLimit:n}=this;let s=0;const o=(l,d,c,u)=>{if(u>Or)throw new Error(`ClusteredBVH: cluster node index ${u} exceeds the ${di}-bit packing limit and cannot be represented.`);if(c>vc)throw new Error(`ClusteredBVH: bvh root index ${c} exceeds the ${_a}-bit packing limit and cannot be represented.`);e[2*s+0]=l<<r|d,e[2*s+1]=c<<di|u&Or,s++};t.forEach((l,d)=>{i.get(l).forEach((c,u)=>{if(c)if(this.shouldCluster(l))for(let h=0,f=c._roots.length;h<f;h++)o(u,d,h,0);else yn(c,n,(h,f)=>{o(u,d,h,f/k)})})})}_countRelevantLeafNodes(e){const{primitiveLimit:t}=this;let i=0;return yn(e,t,(r,n,s,o)=>{i++,o&&s>=t&&console.warn(`ClusteredBVH: a leaf node with ${s} primitives exceeds the cluster primitive limit of ${t} and cannot be subdivided further.`)}),i}}function yn(a,e,t){const i=a._roots.length;for(let r=0;r<i;r++)qe.setBVH(a,r),qe.traverseBuffer((n,s,o)=>{const l=qe.getRangeStart(o),c=qe.getRangeEnd(o)-l;return c<e||s?(t(r,o,c,s),!0):!1});qe.reset()}function Sa(a,e=new Set){return Array.isArray(a)?a.forEach(t=>Sa(t,e)):a.traverse(t=>{t.isMesh&&e.add(t)}),e}const st=new U,Hi=new U,bc={start:0,count:0,vertexStart:0,vertexCount:0};function wc(a){let e=a;for(;e;){if(e.visible===!1)return!1;e=e.parent}return!0}function bn(a){return a._roots.reduce((e,t)=>e+t.byteLength,0)}function wn(a,e){return`${a}_${e}`}class _c{constructor(e,t={}){const{attributes:i={position:"vec4f"},autogenerateBvh:r=!0}=t;Array.isArray(e)||(e=[e]),e=e.map(n=>{if(n.isObject3D)return n;if(n.isBufferGeometry)return new bi(n);if(n instanceof nr){const s=new bi;return s.geometry.boundsTree=n,s}}),this._bvhCache=new Map,this.autogenerateBvh=r,this.attributes=i,this.objects=e,this.bvh=null,this.storage=new qr,this.structs=new qr({transform:Jl}),this.fns=new qr({raycastFirstHit:mc(this),closestPointToPoint:xc(this),sampleTrianglePoint:null},H)}getRootObject(){let{objects:e}=this;if(e.isObject3D)return e;Array.isArray(e)||(e=[e]),e=e.map(i=>{if(i.isObject3D)return i;if(i.isBufferGeometry)return new bi(i);if(i instanceof nr){const r=new bi;return r.geometry.boundsTree=i,r}});const t=new _o;return t.children=e,t}getShapecastFn(e){return fc(this,e)}update(){const e=this.getRootObject();let t=0;e.traverse(E=>{E.isMesh&&t++}),this.bvh=new yc(e,{strategy:Vt,getBVH:(E,gt)=>this.getBVH(E,gt,bc),primitiveLimit:t<3?1/0:64}),this.dispose();const{attributes:i,structs:r,bvh:n}=this,s=[],o=[],l=new Map;let d=bn(n),c=0,u=0;const h=[];let f=0;const p=this._getTransformMap(n),{primitiveBuffer:y,primitiveBufferStride:v}=n;for(let E=0,gt=y.length;E<gt;E+=v){const xt=y[E],vt=y[E+1],qt=n.objects[n.getObjectId(xt)],Gt=n.getInstanceId(xt),jt={start:0,count:0,vertexStart:0,vertexCount:0},yt=this.getBVH(qt,Gt,jt);if(!yt)throw new Error("BVHComputeData: BVH not found.");let oe=s.find(wt=>wt.bvh===yt);oe||(oe={index:s.length,bvh:yt,range:jt,geometryOffset:0},c+=oe.range.count,u+=oe.range.vertexCount,s.push(oe));const Ze=n.getBVHRootIndex(vt),bt=n.getBVHNodeIndex(vt)/k,yi=`${oe.index}_${Ze}_${bt}`;let Je=l.get(yi);if(Je===void 0){const wt=sc(yt._roots[Ze],bt);Je={data:oe,root:Ze,node:bt,size:wt,base:0},l.set(yi,Je),o.push(Je),d+=wt*Z,f=Math.max(f,vn(yt._roots[Ze],bt))}h.push({transformSlot:p.get(wn(xt,Ze)).slot,subtree:Je})}if(vn(n._roots[0])+f-1>us.value)throw new Error("BVHComputeData: BVH depth overruns the compute stack depth.");const x=Math.max(p.size,2);c=Math.max(c,2),u=Math.max(u,2);const g=new K(i,"bvh_GeometryStruct");let b=0,S=0;const _=new Uint32Array(c),I=new ArrayBuffer(u*g.getLength()*4),P=new ArrayBuffer(d);s.forEach(E=>{E.geometryOffset=S/3,E.bvh.indirect||(E.geometryOffset-=E.range.start/3),ac(E.bvh,E.range,b,S,_),oc(E.bvh,E.range,b,I,g,this),S+=E.range.count,b+=E.range.vertexCount});let T=bn(n)/Z;o.forEach(E=>{E.base=T,nc(E.data.bvh._roots[E.root],E.node,E.size,E.data.geometryOffset,T,P),T+=E.size}),h.forEach(E=>E.nodeOffset=E.subtree.base),xn(n,h,0,P);const D=new ArrayBuffer(r.transform.getLength()*x*4),C=O(new z(new Uint32Array(P),1),pt).toReadOnly().setName("bvh_nodes"),M=new z(new Uint32Array(D),1),B=O(M,r.transform).toReadOnly().setName("bvh_transforms"),N=O(new z(_,1),"uint").toReadOnly().setName("bvh_index"),G=O(new z(new Uint32Array(I),g.getLength()),g).toReadOnly().setName("bvh_attributes");this.storage.transforms=B,this.storage.nodes=C,this.storage.index=N,this.storage.attributes=G,this.structs.attributes=g,Hi.copy(n.matrixWorld).invert(),p.forEach(E=>{this.writeTransformData(E,Hi,E.slot,D)}),this.fns.sampleTrianglePoint=gc(this),this._bvhCache.clear()}updateTransforms(){const{bvh:e,storage:t}=this;e.refit();const i=t.nodes.proxyNode.value;xn(e,null,0,i.array.buffer),i.needsUpdate=!0;const r=t.transforms.proxyNode.value,n=r.array.buffer;Hi.copy(e.matrixWorld).invert(),this._getTransformMap(e).forEach(s=>{this.writeTransformData(s,Hi,s.slot,n)}),r.needsUpdate=!0}writeTransformData(e,t,i,r){const{structs:n}=this,s=new Float32Array(r),o=new Uint32Array(r),{object:l,instanceId:d}=e;l.isInstancedMesh||l.isBatchedMesh?(l.getMatrixAt(d,st),st.premultiply(l.matrixWorld)):st.copy(l.matrixWorld),st.premultiply(t),st.toArray(s,i*n.transform.getLength()),st.invert(),st.toArray(s,i*n.transform.getLength()+16);let c=wc(l);l.isBatchedMesh&&(c=c&&l.getVisibleAt(d)),o[i*n.transform.getLength()+32]=c?1:0}getBVH(e,t,i){const{autogenerateBvh:r,_bvhCache:n}=this;let s=null;if(e.boundsTree||e.isSkinnedMesh){const o=e.geometry;if(i.count=o.index?o.index.count:o.attributes.position.count,i.vertexCount=o.attributes.position.count,s=e.boundsTree||null,s===null&&r){const l=e.uuid;s=n.get(l)||new ui(e),n.set(l,s)}}else if(e.isBatchedMesh){const o=e.getGeometryIdAt(t),l=e.getGeometryRangeAt(o);if(Object.assign(i,l),s=e.boundsTrees[o]||null,s===null&&r){const d=`batched_${e.geometry.uuid}_${l.start}_${l.count}`;s=n.get(d)||new ut(e.geometry,{range:{...i}}),n.set(d,s)}}else{const o=e.geometry;if(i.count=o.index?o.index.count:o.attributes.position.count,i.vertexCount=o.attributes.position.count,s=e.geometry.boundsTree||null,s===null&&r){const l=o.uuid;s=n.get(l)||new ut(o),n.set(l,s)}}return s}getDefaultAttributeValue(e,t){switch(e){case"position":case"color":t.set(1,1,1,1);break;default:t.set(0,0,0,0)}return t}dispose(){const{storage:e}=this;for(const t in e)e[t].value?.dispose()}_getTransformMap(e){const{primitiveBuffer:t,primitiveBufferStride:i}=e,r=new Map;for(let n=0,s=t.length;n<s;n+=i){const o=t[n],l=e.getBVHRootIndex(t[n+1]),d=wn(o,l);if(r.has(d))continue;const c=r.size,u=e.objects[e.getObjectId(o)],h=e.getInstanceId(o);r.set(d,{object:u,instanceId:h,compositeId:o,root:l,slot:c})}return r}}class qr{constructor(e={},t=q){const i={};return new Proxy({...e},{get(r,n){return i[n]||(i[n]=t(n,r)),i[n]},set(r,n,s){return r[n]=s,!0}})}}const Oi=A(`
	fn sampleTexel( tex: texture_2d<f32>, coord: vec2f ) -> vec4f {

		// Manual bilinear filtering using textureLoad to support filterable float32 textures
		// on all devices
		let size = vec2f( textureDimensions( tex, 0 ) );

		// the path tracer stores its color rows top down
		let pxCoord = vec2f( coord.x, 1.0 - coord.y ) * size - 0.5;
		let px = vec2i( floor( pxCoord ) );
		let fr = fract( pxCoord );

		// get the four sibling samples
		let s00 = textureLoad( tex, clamp( px,                 vec2i( 0 ), vec2i( size ) - 1 ), 0 );
		let s10 = textureLoad( tex, clamp( px + vec2i( 1, 0 ), vec2i( 0 ), vec2i( size ) - 1 ), 0 );
		let s01 = textureLoad( tex, clamp( px + vec2i( 0, 1 ), vec2i( 0 ), vec2i( size ) - 1 ), 0 );
		let s11 = textureLoad( tex, clamp( px + vec2i( 1, 1 ), vec2i( 0 ), vec2i( size ) - 1 ), 0 );

		// interpolate on the x axis
		let y0 = mix( s00, s10, fr.x );
		let y1 = mix( s01, s11, fr.x );

		// then y
		return mix( y0, y1, fr.y );

	}
`);class Sc extends hr{get texture(){return this._texNode.value}set texture(e){this._texNode.value=e}get fromTexture(){return this._fromTexNode.value}set fromTexture(e){this._fromTexNode.value=e}get toneMapping(){return this._toneMapping.toneMapping}set toneMapping(e){this._toneMapping.setToneMapping(e)}get transition(){return this._transitionUniform.value}set transition(e){this._transitionUniform.value=e}get exposure(){return this._toneMapping.exposureNode.value}set exposure(e){this._toneMapping.exposureNode.value=e}constructor(e){super();const t=pe(new re);this._texNode=t;const i=pe(new re);this._fromTexNode=i;const r=fr(pr()),n=$(1);this._transitionUniform=n;const s=R`
			fn fade( uv: vec2f ) -> vec4f {

				if ( ${n} <= 0.0 ) {

					return ${Oi}( ${i}, uv );

				} else if ( ${n} >= 1.0 ) {

					return ${Oi}( ${t}, uv );

				} else {

					let col0 = ${Oi}( ${i}, uv );
					let col1 = ${Oi}( ${t}, uv );
					return mix( col0, col1, ${n} );

				}

			}
		`,o=So(fi,1,s(r));this._toneMapping=o,this.transparent=!0,this.colorNode=vs(o.rgb,o.a),this.setValues(e)}}const Ta=R`
	fn debugHeatColor( t: f32 ) -> vec3f {

		let r = clamp( 1.5 - abs( 4.0 * t - 3.0 ), 0.0, 1.0 );
		let g = clamp( 1.5 - abs( 4.0 * t - 2.0 ), 0.0, 1.0 );
		let b = clamp( 1.5 - abs( 4.0 * t - 1.0 ), 0.0, 1.0 );
		return vec3f( r, g, b );

	}
`,Ui=new K({tlasCount:"uint",blasCount:"uint",didHit:"bool",dist:"float"},"DebugBoundsResult");function Tc(a){const{transforms:e,index:t,attributes:i,materials:r}=a.storage,n=$(new U),s=$(new U),o=$(1),l=$(1),d=$(0),c=$(64),u=ht(0).toVar("bvh_debugBoundsLevel"),h=Ke(1).toVar("bvh_debugRayScalar"),f=Ke(0).toVar("bvh_debugMaterialSide"),p=R`
		fn debugGetBoundsOrder( ray: ${V}, splitAxis: u32, node: ${pt} ) -> bool {

			return ray.direction[ splitAxis ] >= 0.0;

		}
	`,y=R`
		fn debugIntersectsBounds( ray: ${V}, bounds: ${ft}, result: ptr<function, ${Ui}> ) -> u32 {

			let boundsMin = vec3( bounds.min[ 0 ], bounds.min[ 1 ], bounds.min[ 2 ] );
			let boundsMax = vec3( bounds.max[ 0 ], bounds.max[ 1 ], bounds.max[ 2 ] );

			let invDir = 1.0 / ray.direction;
			let tMinPlane = ( boundsMin - ray.origin ) * invDir;
			let tMaxPlane = ( boundsMax - ray.origin ) * invDir;

			let tMinHit = min( tMinPlane, tMaxPlane );
			let tMaxHit = max( tMinPlane, tMaxPlane );

			let t0 = max( max( tMinHit.x, tMinHit.y ), tMinHit.z );
			let t1 = min( min( tMaxHit.x, tMaxHit.y ), tMaxHit.z );

			let dist = max( t0, 0.0 );
			if ( t1 < dist ) {

				return 0u;

			} else if ( result.didHit && dist * ${h} >= result.dist ) {

				return 0u;

			}

			if ( ${u} == 1u ) {

				result.blasCount = result.blasCount + 1u;

			} else {

				result.tlasCount = result.tlasCount + 1u;

			}

			return 1u;

		}
	`,v=R`
		fn debugIntersectRange( ray: ${V}, offset: u32, count: u32, result: ptr<function, ${Ui}> ) -> bool {

			var didHit = false;
			if ( ${d} > 0.5 ) {

				for ( var ti = offset; ti < offset + count; ti = ti + 1u ) {

					let i0 = ${t}[ ti * 3u ];
					let i1 = ${t}[ ti * 3u + 1u ];
					let i2 = ${t}[ ti * 3u + 2u ];

					let a = ${i}[ i0 ].position.xyz;
					let b = ${i}[ i1 ].position.xyz;
					let c = ${i}[ i2 ].position.xyz;

					var triResult = ${ga}( ray, a, b, c );
					triResult.dist *= ${h};
					if ( triResult.didHit && ( ! result.didHit || triResult.dist < result.dist ) ) {

						// cull faces that don't match the material side
						if ( ${f} != 0.0 && triResult.side != ${f} ) {

							continue;

						}

						result.didHit = true;
						result.dist = triResult.dist;
						didHit = true;

					}

				}

			}

			return didHit;

		}
	`,w=R`
		fn debugTransformRay( ray: ptr<function, ${V}>, objectIndex: u32 ) -> void {

			let object = ${e}[ objectIndex ];
			let toLocal = object.inverseMatrixWorld;
			ray.origin = ( toLocal * vec4f( ray.origin, 1.0 ) ).xyz;
			ray.direction = ( toLocal * vec4f( ray.direction, 0.0 ) ).xyz;

			let len = length( ray.direction );
			ray.direction = ray.direction / len;
			${h} = 1.0 / len;

			${f} = ${r}[ object.materialIndex ].side;
			${u} = 1u;

		}
	`,m=R`
		fn debugResetLevel( objectIndex: u32 ) -> void {

			${h} = 1.0;
			${u} = 0u;

		}
	`,x=a.getShapecastFn({name:"debugBoundsCount",shapeStruct:V,resultStruct:Ui,boundsOrderFn:p,intersectsBoundsFn:y,intersectRangeFn:v,transformShapeFn:w,resetShapeFn:m}),g=R`
		fn debugBounds( vUv: vec2f ) -> vec4f {

			let ndc = vUv * 2.0 - vec2f( 1.0 );
			var ray = ${xr}( ndc, ${n} * ${s} );
			ray.direction = normalize( ray.direction );

			// count the boxes the ray crosses, pruning those behind the nearest hit surface
			var result: ${Ui};
			${x}( ray, &result );

			let tlas = select( 0u, result.tlasCount, ${o} > 0.5 );
			let blas = select( 0u, result.blasCount, ${l} > 0.5 );
			let count = tlas + blas;

			let t = clamp( f32( count ) / max( ${c}, 1.0 ), 0.0, 1.0 );

			return vec4f( ${Ta}( t ), 1.0 );

		}
	`;return g.uniforms={cameraToModelMatrix:n,inverseProjectionMatrix:s,displayTLAS:o,displayBLAS:l,stopAtSurface:d,saturationCount:c},g}class ce{get computeNode(){return this.kernel.computeNode}get workgroupSize(){return this.kernel.workgroupSize}set needsUpdate(e){this.setWorkgroupSize(...this.workgroupSize)}constructor(e,t={}){const{workgroupSize:i=[64],context:r={}}=t;this._fn=e,this.kernel=null,this.context=r,this.setWorkgroupSize(...i)}defineUniformAccessors(e){for(const t in e){if(t in this)throw new Error(`ComputeNode: Uniform name ${t} is already defined.`);"value"in e[t]&&Object.defineProperty(this,t,{get(){return e[t].value},set(r){e[t].value=r}})}}setWorkgroupSize(e=64,t=1,i=1){const r=this._fn.context(this.context);return r.parameters=this._fn.parameters,this.kernel?.dispose(),this.kernel=r.computeKernel([e,t,i]),this}dispose(){this.kernel?.dispose(),this.kernel=null}getDispatchSize(e=1,t=1,i=1,r=[]){const[n,s,o]=this.workgroupSize;return r.length=3,r[0]=Math.ceil(e/n),r[1]=Math.ceil(t/s),r[2]=Math.ceil(i/o),r}}const _n=ht(256*256),Ia=Ke(1/16777216),Ic=ur(`

	const SOBOL_DIRECTIONS_1 = array<u32, 32>(
		0x80000000u, 0xc0000000u, 0xa0000000u, 0xf0000000u,
		0x88000000u, 0xcc000000u, 0xaa000000u, 0xff000000u,
		0x80800000u, 0xc0c00000u, 0xa0a00000u, 0xf0f00000u,
		0x88880000u, 0xcccc0000u, 0xaaaa0000u, 0xffff0000u,
		0x80008000u, 0xc000c000u, 0xa000a000u, 0xf000f000u,
		0x88008800u, 0xcc00cc00u, 0xaa00aa00u, 0xff00ff00u,
		0x80808080u, 0xc0c0c0c0u, 0xa0a0a0a0u, 0xf0f0f0f0u,
		0x88888888u, 0xccccccccu, 0xaaaaaaaau, 0xffffffffu
	);

	const SOBOL_DIRECTIONS_2 = array<u32, 32>(
		0x80000000u, 0xc0000000u, 0x60000000u, 0x90000000u,
		0xe8000000u, 0x5c000000u, 0x8e000000u, 0xc5000000u,
		0x68800000u, 0x9cc00000u, 0xee600000u, 0x55900000u,
		0x80680000u, 0xc09c0000u, 0x60ee0000u, 0x90550000u,
		0xe8808000u, 0x5cc0c000u, 0x8e606000u, 0xc5909000u,
		0x6868e800u, 0x9c9c5c00u, 0xeeee8e00u, 0x5555c500u,
		0x8000e880u, 0xc0005cc0u, 0x60008e60u, 0x9000c590u,
		0xe8006868u, 0x5c009c9cu, 0x8e00eeeeu, 0xc5005555u
	);

	const SOBOL_DIRECTIONS_3 = array<u32, 32>(
		0x80000000u, 0xc0000000u, 0x20000000u, 0x50000000u,
		0xf8000000u, 0x74000000u, 0xa2000000u, 0x93000000u,
		0xd8800000u, 0x25400000u, 0x59e00000u, 0xe6d00000u,
		0x78080000u, 0xb40c0000u, 0x82020000u, 0xc3050000u,
		0x208f8000u, 0x51474000u, 0xfbea2000u, 0x75d93000u,
		0xa0858800u, 0x914e5400u, 0xdbe79e00u, 0x25db6d00u,
		0x58800080u, 0xe54000c0u, 0x79e00020u, 0xb6d00050u,
		0x800800f8u, 0xc00c0074u, 0x200200a2u, 0x50050093u
	);

	const SOBOL_DIRECTIONS_4 = array<u32, 32>(
		0x80000000u, 0x40000000u, 0x20000000u, 0xb0000000u,
		0xf8000000u, 0xdc000000u, 0x7a000000u, 0x9d000000u,
		0x5a800000u, 0x2fc00000u, 0xa1600000u, 0xf0b00000u,
		0xda880000u, 0x6fc40000u, 0x81620000u, 0x40bb0000u,
		0x22878000u, 0xb3c9c000u, 0xfb65a000u, 0xddb2d000u,
		0x78022800u, 0x9c0b3c00u, 0x5a0fb600u, 0x2d0ddb00u,
		0xa2878080u, 0xf3c9c040u, 0xdb65a020u, 0x6db2d0b0u,
		0x800228f8u, 0x400b3cdcu, 0x200fb67au, 0xb00ddb9du
	);

`),Ca=ht(0).toVar("sobolPixelIndex"),Ra=ht(0).toVar("sobolPathIndex"),Ds=ht(0).toVar("sobolBounceIndex"),Wi=A(`
	fn getMaskedSobol( index: u32, directions: array<u32, 32> ) -> u32 {

		var X = 0u;
		for ( var bit = 0u; bit < 32u; bit ++ ) {

			let mask = ( index >> bit ) & 1u;
			X ^= mask * directions[ bit ];

		}
		return X;

	}
`),Cc=(a=1)=>{if(a<=0)return;const e=a>1?`vec${a}u`:"u32",t=A(`
		fn sobolReverseBits_${e}( in: ${e} ) -> ${e} {

			var x = in;
			x = ( ( ( x & ${e}( 0xaaaaaaaau ) ) >> ${e}( 1 ) ) | ( ( x & ${e}( 0x55555555u ) ) << ${e}( 1 ) ) );
			x = ( ( ( x & ${e}( 0xccccccccu ) ) >> ${e}( 2 ) ) | ( ( x & ${e}( 0x33333333u ) ) << ${e}( 2 ) ) );
			x = ( ( ( x & ${e}( 0xf0f0f0f0u ) ) >> ${e}( 4 ) ) | ( ( x & ${e}( 0x0f0f0f0fu ) ) << ${e}( 4 ) ) );
			x = ( ( ( x & ${e}( 0xff00ff00u ) ) >> ${e}( 8 ) ) | ( ( x & ${e}( 0x00ff00ffu ) ) << ${e}( 8 ) ) );
			return ( ( x >> ${e}( 16 ) ) | ( x << ${e}( 16 ) ) );

		}
	`),i=A(`
		fn sobolHashCombine_${e}( seed: u32, v: ${e} ) -> ${e} {

			return ${e}( seed ) ^ ( v + ${e}( ( seed << 6 ) + ( seed >> 2 ) ) );

		}
	`),r=A(`
		fn sobolLaineKarrasPermutation_${e}( in: ${e}, seed: ${e} ) -> ${e} {

			var x = in;
			x += seed;
			x ^= x * 0x6c50b47cu;
			x ^= x * 0xb82f1e52u;
			x ^= x * 0xc7afe638u;
			x ^= x * 0x8d22f6e6u;
			return x;

		}
	`),n=R`
		fn nestedUniformScrambleBase2_${e}( x: ${e}, seed: ${e} ) -> ${e} {

			var res = ${r}( x, seed );
			res = ${t}( res );
			return res;

		}
	`;return{reverseBits:t,hashCombine:i,lkPermutation:r,scramble:n}},Te=Array.from({length:5},(a,e)=>Cc(e)),Rc=R`
  	${[Ic]}
	fn generateSobolPoint( id: u32 ) -> vec4f {

		var index = id;
		if ( index >= ${_n} ) {

			index = index % ${_n};
			// return vec4( 0.0 );

		}

		// NOTE: this sobol "direction" is also available but we can't write out 5 components
		// uint x = index & 0x00ffffffu;
		let x = ${Te[1].reverseBits}( ${Wi}( index, SOBOL_DIRECTIONS_1 ) ) & 0x00ffffffu;
		let y = ${Te[1].reverseBits}( ${Wi}( index, SOBOL_DIRECTIONS_2 ) ) & 0x00ffffffu;
		let z = ${Te[1].reverseBits}( ${Wi}( index, SOBOL_DIRECTIONS_3 ) ) & 0x00ffffffu;
		let w = ${Te[1].reverseBits}( ${Wi}( index, SOBOL_DIRECTIONS_4 ) ) & 0x00ffffffu;

		return vec4( f32( x ), f32( y ), f32( z ), f32( w ) ) * ${Ia};

	}
`,Sn=A(`
	fn sobolHash( in: u32 ) -> u32 {

		var x = in;
		// finalizer from murmurhash3
		x ^= x >> 16;
		x *= 0x85ebca6bu;
		x ^= x >> 13;
		x *= 0xc2b2ae35u;
		x ^= x >> 16;
		return x;

	}
`),Pc=R`
	fn sobolGetSeed( effect: u32 ) -> u32 {

		return ${Sn}(
			${Te[1].hashCombine}(
				${Te[1].hashCombine}(
					${Sn}( ${Ds} ),
					${Ca}
				),
				effect
			)
		);

	}
`,vr=(a=1,e=Rc)=>{if(a<=0)return;const t=a>1?`vec${a}u`:"u32",i=a>1?`vec${a}f`:"f32";let r=".r",n="1u";return a===2?(r=".rg",n="vec2( 1u, 2u )"):a===3?(r=".rgb",n="vec3( 1u, 2u, 3u )"):a===4&&(r="",n="vec4( 1u, 2u, 3u, 4u )"),R`
		fn sobol${a}( effect: u32 ) -> ${i} {

			let seed = ${Pc}( effect );
			let index = ${Ra};

			let shuffle_seed = ${Te[1].hashCombine}( seed, 0u );
			let shuffled_index = ${Te[1].scramble}( ${Te[1].reverseBits}( index ), shuffle_seed );
			let sobol_pt = ${e}( shuffled_index )${r};
			var result = ${t}( sobol_pt * 16777216.0 );

			let seed2 = ${Te[a].hashCombine}( seed, ${n} );
			result = ${Te[a].scramble}( result, seed2 );

			return ${Ia} * ${i}( result >> ${t}( 8 ) );

		}
	`},Dc=vr(1),Mc=vr(2),Ac=vr(3),Pa=vr(4),Da=R`
	fn sobolInit( pixel: vec2u, pathIndex: u32, bounceIndex: u32 ) -> void {

		${Ca} = ( pixel.x << 16 ) | pixel.y;
		${Ra} = pathIndex;
		${Ds} = bounceIndex;

	}
`,Ma=R`
	fn sobolNextBounce() -> void {

		${Ds}++;

	}
`,Aa=0,La=1,Lc=2,Fa=3,Fc=4,Ba=5,$a=6,Na=7,Ea=50,Ht=Wt("random.rngInit",Da),Tn=Wt("random.rngNextBounce",Ma),ct=Wt("random.rand1",Dc),Ot=Wt("random.rand2",Mc),Ms=Wt("random.rand3",Ac);Wt("random.rand4",Pa);const W=ur(`

	const PI: f32 = 3.141592653589793;
	const EPSILON: f32 = 1e-5;
	const MIN_ROUGHNESS: f32 = 1e-3;
	const MIN_INCIDENT_COS: f32 = 1e-3;

`),$t=new K({color:"vec3f",isTransmissive:"bool",direction:"vec3f",pdf:"float"},"ScatterRecord"),In=new K({reflectance:"vec3f",transmittance:"vec3f",reflectProbability:"float"},"TransmissionFresnel"),Bc=new K({color:"vec3",map:"int",metalness:"float",metalnessMap:"int",roughness:"float",roughnessMap:"int",ior:"float",transmission:"float",transmissionMap:"int",emissiveIntensity:"float",emissive:"vec3",emissiveMap:"int",normalMap:"int",normalScale:"vec2",clearcoat:"float",clearcoatMap:"int",clearcoatNormalMap:"int",clearcoatNormalScale:"vec2",clearcoatRoughness:"float",clearcoatRoughnessMap:"int",iridescenceMap:"int",iridescenceThicknessMap:"int",iridescence:"float",iridescenceIor:"float",iridescenceThicknessMinimum:"float",iridescenceThicknessMaximum:"float",diffuseRoughness:"float",dispersion:"float",specularColor:"vec3",specularColorMap:"int",specularIntensity:"float",specularIntensityMap:"int",thinWall:"int",attenuationColor:"vec3",attenuationDistance:"float",alphaMap:"int",castShadow:"int",opacity:"float",alphaTest:"float",side:"float",matte:"int",sheen:"float",sheenColor:"vec3",sheenColorMap:"int",sheenRoughness:"float",sheenRoughnessMap:"int",vertexColors:"int",flatShading:"int",transparent:"int",fogVolume:"int",anisotropy:"float",anisotropyRotation:"float",anisotropyMap:"int",mapTransform:"mat3",metalnessMapTransform:"mat3",roughnessMapTransform:"mat3",transmissionMapTransform:"mat3",emissiveMapTransform:"mat3",normalMapTransform:"mat3",clearcoatMapTransform:"mat3",clearcoatNormalMapTransform:"mat3",clearcoatRoughnessMapTransform:"mat3",sheenColorMapTransform:"mat3",sheenRoughnessMapTransform:"mat3",iridescenceMapTransform:"mat3",iridescenceThicknessMapTransform:"mat3",specularColorMapTransform:"mat3",specularIntensityMapTransform:"mat3",alphaMapTransform:"mat3",anisotropyMapTransform:"mat3"},"Material"),me=new K({volumeParticle:"bool",faceNormal:"vec3f",frontFace:"bool",normal:"vec3f",normalBasis:"mat3x3f",normalInvBasis:"mat3x3f",eta:"f32",f0:"f32",roughness:"f32",diffuseRoughness:"f32",metalness:"f32",anisotropy:"f32",color:"vec3f",emission:"vec3f",opacity:"f32",ior:"f32",transmission:"f32",thinWall:"bool",attenuationColor:"vec3f",attenuationDistance:" f32",clearcoatNormal:"vec3f",clearcoatBasis:"mat3x3f",clearcoatInvBasis:"mat3x3f",clearcoat:"f32",clearcoatRoughness:"f32",sheen:"f32",sheenColor:"vec3f",sheenRoughness:"f32",iridescence:"f32",iridescenceIor:"f32",iridescenceThickness:"f32",specularColor:"vec3f",specularIntensity:"f32"},"SurfaceRecord");new K({rotation:"mat3x3f",intensity:"float",blur:"float",totalSum:"float"},"EnvironmentInfo");const Cn=new K({color:"vec3f",direction:"vec3f",pdf:"float"},"EnvironmentSample"),ot=new K({position:"vec3f",lightType:"int",color:"vec3f",intensity:"float",u:"vec3f",visibleToCameraRays:"int",v:"vec3f",area:"float",radius:"float",decay:"float",distance:"float",coneCos:"float",penumbraCos:"float",iesProfile:"int"},"Light"),ze=new K({dist:"float",direction:"vec3f",pdf:"float",emission:"vec3f",lightType:"int"},"LightRecord"),$c=new K({diffuse:"float",specular:"float",transmission:"float",clearcoat:"float"},"LobeWeights"),Rn=new K({V:"vec3f",L:"vec3f",H:"vec3f",VdotH:"float"},"BxDFContext"),Nc=A(`

	fn inverse(m: mat3x3f) -> mat3x3f {
		var adj: mat3x3f;
		adj[0][0] =   (m[1][1] * m[2][2] - m[2][1] * m[1][2]);
		adj[1][0] = - (m[1][0] * m[2][2] - m[2][0] * m[1][2]);
		adj[2][0] =   (m[1][0] * m[2][1] - m[2][0] * m[1][1]);
		adj[0][1] = - (m[0][1] * m[2][2] - m[2][1] * m[0][2]);
		adj[1][1] =   (m[0][0] * m[2][2] - m[2][0] * m[0][2]);
		adj[2][1] = - (m[0][0] * m[2][1] - m[2][0] * m[0][1]);
		adj[0][2] =   (m[0][1] * m[1][2] - m[1][1] * m[0][2]);
		adj[1][2] = - (m[0][0] * m[1][2] - m[1][0] * m[0][2]);
		adj[2][2] =   (m[0][0] * m[1][1] - m[1][0] * m[0][1]);

		let det = ( m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1])
			- m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0])
			+ m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]));

		return adj * ( 1.0 / det );
	}

`),Ec=A(`

	fn getBasisFromNormal( normal: vec3f ) -> mat3x3f {

		var other: vec3f;
		if ( abs( normal.x ) > 0.5 ) {

			other = vec3f( 0.0, 1.0, 0.0 );

		} else {

			other = vec3f( 1.0, 0.0, 0.0 );

		}

		let ortho = normalize( cross( normal, other ) );
		let ortho2 = normalize( cross( normal, ortho ) );
		return mat3x3f( ortho2, ortho, normal );

	}

`),De=A(`

	fn iorToF0( ior: f32 ) -> f32 {
		return pow( ( 1 - ior ) / ( 1 + ior ), 2 );
	}

`),zc=A(`

	fn iorToF0General( transmittedIor: f32, incidentIor: f32 ) -> f32 {

		return pow( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ), 2 );

	}

`),kc=A(`

	fn iorToF0GeneralVec( transmittedIor: vec3f, incidentIor: vec3f ) -> vec3f {

		let v = ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor );
		return v * v;

	}

`),Vc=A(`

	fn fresnel0ToIor( f0: vec3f ) -> vec3f {

		let sqrtF0 = sqrt( f0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );

	}

`),mt=A(`

	fn schlickFresnel( cosine: f32, f0: f32 ) -> f32 {

		return f0 + ( 1.0 - f0 ) * pow( 1.0 - cosine, 5.0 );

	}

`),yr=A(`

	fn schlickFresnelVec( cosine: f32, f0: vec3f, f90: vec3f ) -> vec3f {

		return f0 + ( f90 - f0 ) * pow( 1.0 - cosine, 5.0 );

	}

`),As=A(`

	fn totalInternalReflection( cosTheta: f32, eta: f32 ) -> bool {

		let sinTheta = sqrt( 1.0 - cosTheta * cosTheta );
		return eta * sinTheta > 1.0;

	}

`),Hc=A(`

	fn totalInternalReflectionVec( cosTheta: f32, eta: vec3f ) -> vec3<bool> {

		let sinTheta = sqrt( 1.0 - cosTheta * cosTheta );
		return eta * sinTheta > vec3f( 1.0 );

	}

`);A(`

	fn evaluateFresnel( cosine: f32, eta: f32, f0: vec3f, f90: vec3f ) -> vec3f {

		if ( totalInternalReflection( cosine, eta ) ) {

			return f90;

		}

		return f0 + ( f90 - f0 ) * pow( 1.0 - cosine, 5.0 );
	}

`,[As]);const xi=A(`

	fn dielectricFresnel( cosThetaI: f32, eta: f32 ) -> f32 {

		// https://schuttejoe.github.io/post/disneybsdf/
		let ni = eta;
		let nt = 1.0;

		// Check for total internal reflection
		let sinThetaISq = 1.0 - cosThetaI * cosThetaI;
		let sinThetaTSq = eta * eta * sinThetaISq;
		if ( sinThetaTSq >= 1.0 ) {

			return 1.0;

		}

		let sinThetaT = sqrt( sinThetaTSq );
		let cosThetaT = sqrt( max( 0.0, 1.0 - sinThetaT * sinThetaT ) );
		let rParallel = ( ( nt * cosThetaI ) - ( ni * cosThetaT ) ) / ( ( nt * cosThetaI ) + ( ni * cosThetaT ) );
		let rPerpendicular = ( ( ni * cosThetaI ) - ( nt * cosThetaT ) ) / ( ( ni * cosThetaI ) + ( nt * cosThetaT ) );
		return ( rParallel * rParallel + rPerpendicular * rPerpendicular ) / 2.0;

	}

`),Oc=A(`

	fn disneyFresnel( wo: vec3f, wi: vec3f, wh: vec3f, f0: f32, eta: f32, metalness: f32 ) -> f32 {

		let dotHV = dot( wo, wh );
		if ( totalInternalReflection( dotHV, eta ) ) {

			return 1.0;

		}

		let dotHL = dot( wi, wh );
		let dielectricF = dielectricFresnel( abs( dotHV ), eta );
		let metallicF = schlickFresnel( dotHL, f0 );

		return mix( dielectricF, metallicF, metalness );

	}

`,[As,xi,mt]),Ls=A(`

	fn isTerminatingScatter( scatterRec: ScatterRecord ) -> bool {

		return scatterRec.pdf <= 0;

	}

`,[$t]),se=A(`

	fn clampPathContribution( contribution: vec3f, pathDepth: u32, clampDirect: f32, clampIndirect: f32 ) -> vec3f {

		let limit = select( clampIndirect, clampDirect, pathDepth <= 1u ) * 3.0;
		if ( limit <= 0.0 ) {

			return contribution;

		}

		let strength = dot( abs( contribution ), vec3f( 1.0 ) );
		if ( strength > limit ) {

			return contribution * ( limit / strength );

		}

		return contribution;

	}

`),Pn=A(`

	fn applyWrap( v: f32, wrapMode: i32 ) -> f32 {

		var res = v;
		if ( wrapMode == 1 ) {

			// ClampToEdge
			res = clamp( res, 0.0, 1.0 );

		} else if ( wrapMode == 2 ) {

			// MirroredRepeat
			res = 1.0 - abs( 2.0 * fract( res * 0.5 ) - 1.0 );

		} else {

			// Repeat
			res = fract( res );

		}

		return res;

	}

`),zt=A(`

	fn offsetRayOrigin( point: vec3f, direction: vec3f, geometricNormal: vec3f ) -> vec3f {

		let normal = normalize( select( -geometricNormal, geometricNormal, dot( direction, geometricNormal ) >= 0.0 ) );
		let intScale = 256.0;
		let integerOffset = vec3i( intScale * normal );
		let pointBits = bitcast<vec3i>( point );
		let signedOffset = select( integerOffset, -integerOffset, point < vec3f( 0.0 ) );
		let offsetPoint = bitcast<vec3f>( pointBits + signedOffset );
		let origin = 1.0 / 32.0;
		let floatScale = 1.0 / 65536.0;
		return select( offsetPoint, point + floatScale * normal, abs( point ) < vec3f( origin ) );

	}

`),qi=A(`

	fn wrapTexelIndex( i: i32, size: i32, wrapMode: i32 ) -> i32 {

		if ( wrapMode == 0 ) {

			// Repeat wraps to the opposite edge
			return ( ( i % size ) + size ) % size;

		}

		// ClampToEdge and MirroredRepeat both fold back onto the edge texel
		return clamp( i, 0, size - 1 );

	}

`),za=(a,e,t="sampleTexel")=>R`

	fn ${t}( uv: vec2f, packed: i32, lod: f32 ) -> vec4f {

		let texIndex = packed & 0x7FFFFF;
		let wrapS    = ( packed >> 26 ) & 0x3;
		let wrapT    = ( packed >> 28 ) & 0x3;
		let nearest  = ( packed >> 30 ) & 0x1;

		// look up the texture's rect and page within the atlas. three wraps a
		// uniformArray in a struct ( textureInfoStruct ) with a "value" array member.
		let info   = ${a}[ u32( texIndex ) ];
		let offset = vec2f( vec2u( info.x & 0xFFFFu, info.x >> 16u ) );
		let size   = vec2f( vec2u( info.y & 0xFFFFu, info.y >> 16u ) );
		let page   = i32( info.z & 0xFFFFu );

		// wrap is applied on the logical uv first, then remapped into the tile
		let wrappedUv = vec2f(
			${Pn}( uv.x, wrapS ),
			${Pn}( uv.y, wrapT ),
		);

		if ( nearest == 1 ) {

			let tileTexel = clamp( vec2i( wrappedUv * size ), vec2i( 0 ), vec2i( size ) - vec2i( 1 ) );
			return textureLoad( ${e}, vec2i( offset ) + tileTexel, page, 0 );

		} else {

			// The tile's neighbors in the atlas are unrelated textures, so hardware
			// filtering cannot supply the taps that fall outside it. Filter here instead
			// and resolve each tap through the wrap mode.
			let texelPos = wrappedUv * size - vec2f( 0.5 );
			let basePos = floor( texelPos );
			let base = vec2i( basePos );
			let f = texelPos - basePos;

			let intSize = vec2i( size );
			let x0 = ${qi}( base.x,     intSize.x, wrapS );
			let x1 = ${qi}( base.x + 1, intSize.x, wrapS );
			let y0 = ${qi}( base.y,     intSize.y, wrapT );
			let y1 = ${qi}( base.y + 1, intSize.y, wrapT );

			let tile = vec2i( offset );
			let c00 = textureLoad( ${e}, tile + vec2i( x0, y0 ), page, 0 );
			let c10 = textureLoad( ${e}, tile + vec2i( x1, y0 ), page, 0 );
			let c01 = textureLoad( ${e}, tile + vec2i( x0, y1 ), page, 0 );
			let c11 = textureLoad( ${e}, tile + vec2i( x1, y1 ), page, 0 );

			return mix(
				mix( c00, c10, f.x ),
				mix( c01, c11, f.x ),
				f.y,
			);

		}

	}
`,Uc=A(`

	fn sampleSphere( uv: vec2f ) -> vec3f {

		let u = ( uv.x - 0.5 ) * 2.0;
		let t = uv.y * PI * 2.0;
		let f = sqrt( 1.0 - u * u );

		return vec3f( f * cos( t ), f * sin( t ), u );

	}

`,[W]),Wc=A(`

	fn diffuseDirection( wo: vec3f, uv: vec2f ) -> vec3f {

		var lightDirection = sampleSphere( uv );
		lightDirection.z += 1.0;
		lightDirection = normalize( lightDirection );

		return lightDirection;

	}

`,[Uc]),Dn=A(`

	fn getLobeWeights( wo: vec3f, wi: vec3f, woClearcoat: vec3f, wh: vec3f, clearcoatIor: f32, surf: SurfaceRecord ) -> LobeWeights {

		var weights: LobeWeights;
		var remaining = 1.0;

		let clearcoatF0 = iorToF0( clearcoatIor );
		let clearcoatFresnel = schlickFresnel( saturate( woClearcoat.z ), clearcoatF0 );
		weights.clearcoat = surf.clearcoat * clearcoatFresnel;
		remaining -= weights.clearcoat;

		// this specular lobe only handles the opaque portion of the specular
		let fEstimate = disneyFresnel( wo, wi, wh, surf.f0, surf.eta, surf.metalness );
		weights.specular = remaining * ( surf.metalness + ( 1.0 - surf.metalness ) * ( 1.0 - surf.transmission ) * fEstimate );
		remaining -= weights.specular;

		// the transmission lobe covers both the reflected and refracted halves of the transmissive portion
		weights.transmission = remaining * surf.transmission;
		remaining -= weights.transmission;

		weights.diffuse = remaining;

		return weights;

	}

`,[Oc,mt,De,$c,W]),ar=A(`

	fn equirectDirectionToUv(direction: vec3f) -> vec2f {

		// from Spherical.setFromCartesianCoords
		var uv = vec2f( atan2( direction.z, direction.x ), acos( direction.y ) );
		uv /= vec2f( 2.0 * PI, PI );

		// apply adjustments to get values in range [0, 1] and y right side up
		uv.x += 0.5;
		uv.y = 1.0 - uv.y;
		return uv;

	}

`),qc=A(`

	fn sampleHemisphere( n: vec3f, uv: vec2f ) -> vec3f {

		// https://www.rorydriscoll.com/2009/01/07/better-sampling/
		// https://graphics.pixar.com/library/OrthonormalB/paper.pdf
		let sign = select( sign( n.z ), 1.0, n.z == 0.0 );
		let a = - 1.0 / ( sign + n.z );
		let b = n.x * n.y * a;
		let b1 = vec3( 1.0 + sign * n.x * n.x * a, sign * b, - sign * n.x );
		let b2 = vec3( b, sign + n.y * n.y * a, - n.y );

		let r = sqrt( uv.x );
		let theta = 2.0 * PI * uv.y;
		let x = r * cos( theta );
		let y = r * sin( theta );
		return x * b1 + y * b2 + sqrt( 1.0 - uv.x ) * n;

	}

`,[W]),je=A(`

	fn misHeuristic( a: f32, b: f32 ) -> f32 {

		let aa = a * a;
		let bb = b * b;
		return aa / ( aa + bb );

	}

`),ds=A(`

	fn luminance( color: vec3f ) -> f32 {

		return dot( color, vec3f( 0.2126, 0.7152, 0.0722 ) );

	}

`),Gc=A(`

	fn equirectUvToDirection( uvIn: vec2f ) -> vec3f {

		// undo the adjustments applied in equirectDirectionToUv
		var uv = uvIn;
		uv.x -= 0.5;
		uv.y = 1.0 - uv.y;

		let theta = uv.x * 2.0 * PI;
		let phi = uv.y * PI;
		let sinPhi = sin( phi );

		return vec3f( sinPhi * cos( theta ), cos( phi ), sinPhi * sin( theta ) );

	}

`,[W]);A(`

	fn equirectDirectionPdf( direction: vec3f ) -> f32 {

		let uv = equirectDirectionToUv( direction );
		let theta = uv.y * PI;
		let sinTheta = sin( theta );
		if ( sinTheta == 0.0 ) {

			return 0.0;

		}

		return 1.0 / ( 2.0 * PI * PI * sinTheta );

	}

`,[W,ar]);const ka=A(`

	fn weightedAlphaBlend( prevColor: vec4f, newColor: vec4f, weight: f32 ) -> vec4f {

		let invWeight = 1.0 - weight;
		let totalAlpha = prevColor.a * invWeight + newColor.a * weight;
		var blendedColor = vec4f( 0 );
		if ( totalAlpha != 0.0 ) {

			let prevContrib = prevColor.rgb * invWeight * prevColor.a / totalAlpha;
			let resContrib = newColor.rgb * weight * newColor.a / totalAlpha;
			blendedColor = vec4f( prevContrib + resContrib, totalAlpha );

		}

		return blendedColor;

	}

`),Fs=0,Bs=1,Mn=2,An=3,Ln=4,$s=5,mi=1e30,Va=1e-5,Ha=A(`

	fn isMISWeightLight( lightType: i32 ) -> bool {

		return lightType == ${$s} || lightType == ${Bs} || lightType == ${Fs};

	}

`),Fn=A(`

	fn getSpotAttenuation( coneCosine: f32, penumbraCosine: f32, angleCosine: f32 ) -> f32 {

		return smoothstep( coneCosine, penumbraCosine, angleCosine );

	}

`),hs=A(`

	fn getDistanceAttenuation( lightDistance: f32, cutoffDistance: f32, decayExponent: f32 ) -> f32 {

		// based upon Frostbite 3 Moving to Physically-based Rendering
		// https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
		var distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), EPSILON );
		if ( cutoffDistance > 0.0 ) {

			let window = clamp( 1.0 - pow( lightDistance / cutoffDistance, 4.0 ), 0.0, 1.0 );
			distanceFalloff *= window * window;

		}

		return distanceFalloff;

	}

`,[W]),jc=A(`

	fn intersectsRectangle( center: vec3f, normal: vec3f, u: vec3f, v: vec3f, rayOrigin: vec3f, rayDirection: vec3f ) -> f32 {

		let t = dot( center - rayOrigin, normal ) / dot( rayDirection, normal );
		if ( t > EPSILON ) {

			let p = rayOrigin + rayDirection * t;
			let vi = p - center;

			let a1 = dot( u, vi );
			if ( abs( a1 ) <= 0.5 ) {

				let a2 = dot( v, vi );
				if ( abs( a2 ) <= 0.5 ) {

					return t;

				}

			}

		}

		return - 1.0;

	}

`,[W]),Qc=A(`

	fn intersectsCircle( position: vec3f, normal: vec3f, u: vec3f, v: vec3f, rayOrigin: vec3f, rayDirection: vec3f ) -> f32 {

		let t = dot( position - rayOrigin, normal ) / dot( rayDirection, normal );
		if ( t > EPSILON ) {

			let hit = rayOrigin + rayDirection * t;
			let vi = hit - position;

			let a1 = dot( u, vi );
			let a2 = dot( v, vi );
			if ( length( vec2f( a1, a2 ) ) <= 0.5 ) {

				return t;

			}

		}

		return - 1.0;

	}

`,[W]),Kc=A(`

	fn randomAreaLightSample( light: Light, rayOrigin: vec3f, ruv: vec2f ) -> LightRecord {

		var randomPos = vec3f( 0.0 );
		if ( light.lightType == ${Fs} ) {

			randomPos = light.position + light.u * ( ruv.x - 0.5 ) + light.v * ( ruv.y - 0.5 );

		} else if ( light.lightType == ${Bs} ) {

			let r = 0.5 * sqrt( ruv.x );
			let theta = ruv.y * 2.0 * PI;
			randomPos = light.position + light.u * ( r * cos( theta ) ) + light.v * ( r * sin( theta ) );

		}

		let toLight = randomPos - rayOrigin;
		let lightDistSq = dot( toLight, toLight );
		let dist = sqrt( lightDistSq );
		let direction = toLight / dist;
		let lightNormal = normalize( cross( light.u, light.v ) );

		var lightRec: LightRecord;
		lightRec.lightType = light.lightType;
		lightRec.emission = light.color * light.intensity;
		lightRec.dist = dist;
		lightRec.direction = direction;

		// points behind or edge-on to the light receive no contribution
		let cosTheta = dot( direction, lightNormal );
		if ( cosTheta <= 0.0 ) {

			lightRec.pdf = 0.0;

		} else {

			lightRec.pdf = lightDistSq / ( light.area * cosTheta );

		}

		return lightRec;

	}

`,[ot,ze,W]),Xc=A(`

	fn randomSpotLightSample( light: Light, rayOrigin: vec3f, ruv: vec2f ) -> LightRecord {

		let radius = light.radius * sqrt( ruv.x );
		let theta = ruv.y * 2.0 * PI;
		let x = radius * cos( theta );
		let y = radius * sin( theta );

		let u = light.u;
		let v = light.v;
		let normal = normalize( cross( u, v ) );

		let angle = acos( light.coneCos );
		let angleTan = tan( angle );
		let startDistance = light.radius / max( angleTan, EPSILON );

		let randomPos = light.position - normal * startDistance + u * x + v * y;
		let toLight = randomPos - rayOrigin;
		let lightDistSq = dot( toLight, toLight );
		let dist = sqrt( lightDistSq );

		let direction = toLight / max( dist, EPSILON );
		let distanceAttenuation = getDistanceAttenuation( dist, light.distance, light.decay );

		var lightRec: LightRecord;
		lightRec.lightType = light.lightType;
		lightRec.dist = dist;
		lightRec.direction = direction;
		lightRec.emission = light.color * light.intensity * distanceAttenuation;
		lightRec.pdf = 1.0;

		return lightRec;

	}

`,[ot,ze,W,hs]),Yc=A(`

	fn getSpotLightNearest( light: Light, position: vec3f ) -> vec2f {

		let normal = normalize( cross( light.u, light.v ) );
		let startDistance = light.radius / max( tan( acos( light.coneCos ) ), EPSILON );
		let discCenter = light.position - normal * startDistance;

		let toPosition = position - discCenter;
		let along = dot( toPosition, - normal );
		let across = max( length( toPosition + normal * along ) - light.radius, 0.0 );
		let dist = length( vec2f( along, across ) );
		return vec2f( along / max( dist, EPSILON ), dist );

	}

`,[ot,W]),oi=A(`

	fn ggxDirection( incidentDir: vec3f, alpha: vec2f, uv: vec2f ) -> vec3f {

		// Implementation from reference [1]
		// stretch view
		let V = normalize( vec3f( alpha * incidentDir.xy, incidentDir.z ) );

		// orthonormal basis
		var T1: vec3f;
		if ( V.z < 0.9999 ) {

			T1 = normalize( cross( V, vec3( 0.0, 0.0, 1.0 ) ) );

		} else {

			T1 = vec3( 1.0, 0.0, 0.0 );

		}

		let T2 = cross( T1, V );

		// sample point with polar coordinates (r, phi)
		let a = 1.0 / ( 1.0 + V.z );
		let r = sqrt( uv.x );
		var phi: f32;
		if ( uv.y < a ) {

			phi = uv.y / a * PI;

		} else {

			phi = PI + ( uv.y - a ) / ( 1.0 - a ) * PI;

		}

		let P1 = r * cos( phi );
		var P2 = r * sin( phi );
		if ( uv.y >= a ) {

			P2 *= V.z;

		}

		// compute normal
		var N = P1 * T1 + P2 * T2 + V * sqrt( max( 0.0, 1.0 - P1 * P1 - P2 * P2 ) );

		// unstretch
		N = normalize( vec3( alpha * N.xy, max( 0.0, N.z ) ) );

		return N;

	}

`,[W]),Zc=A(`

	fn ggxLambda( V: vec3f, alpha: vec2f ) -> f32 {

		let alphaT = alpha.x;
		let alphaB = alpha.y;

		// abs v.z to support transmitted rays
		let NdotV = max( abs( V.z ), MIN_INCIDENT_COS );
		let cos2 = NdotV * NdotV;
		let t = ( alphaT * alphaT * V.x * V.x + alphaB * alphaB * V.y * V.y ) / cos2;
		let numerator = - 1.0 + sqrt( 1.0 + t );
		return numerator / 2.0;

	}

`,[W]),Ns=A(`

	fn ggxShadowMaskG1( V: vec3f, alpha: vec2f ) -> f32 {

		// TODO: this could be collapsed to a simpler form as an optimization
		return 1.0 / ( 1.0 + ggxLambda( V, alpha ) );

	}

`,[Zc]),Jc=A(`

	fn ggxSmithVisibility( V: vec3f, L: vec3f, alpha: vec2f ) -> f32 {

		let alphaT = alpha.x;
		let alphaB = alpha.y;

		let NdotV = max( V.z, MIN_INCIDENT_COS );
		let NdotL = max( L.z, MIN_INCIDENT_COS );

		let TdotV = V.x;
		let TdotL = L.x;

		let BdotV = V.y;
		let BdotL = L.y;

		let GGXV = NdotL * length( vec3f( alphaT * TdotV, alphaB * BdotV, NdotV ) );
		let GGXL = NdotV * length( vec3f( alphaT * TdotL, alphaB * BdotL, NdotL ) );

		return 0.5 / ( GGXV + GGXL );

	}

`,[W]),br=A(`

	fn ggxDistribution( H: vec3f, alpha: vec2f ) -> f32 {

		let alphaT = alpha.x;
		let alphaB = alpha.y;

		let NdotH = H.z;
		let TdotH = H.x;
		let BdotH = H.y;

		let a2 = alphaT * alphaB;
		let v = vec3f( alphaB * TdotH, alphaT * BdotH, a2 * NdotH );
		let v2 = dot( v, v );
		let w2 = a2 / v2;

		return a2 * w2 * w2 / PI;

	}

`,[W]),li=A(`

	fn ggxReflectionAdjustedPDF( V: vec3f, H: vec3f, alpha: vec2f ) -> f32 {

		let NdotV = max( V.z, MIN_INCIDENT_COS );
		let D = ggxDistribution( H, alpha );
		let G1 = ggxShadowMaskG1( V, alpha );

		return D * G1 / ( 4 * NdotV );

	}
`,[br,Ns]),Oa=A(`

	fn ggxRefractionAdjustedPDF( V: vec3f, L: vec3f, H: vec3f, alpha: vec2f, eta: f32 ) -> f32 {

		let NdotV = max( V.z, MIN_INCIDENT_COS );
		let HdotV = dot( V, H );
		let HdotL = dot( L, H );
		let D = ggxDistribution( H, alpha );
		let G1 = ggxShadowMaskG1( V, alpha );

		let denom = eta * HdotV + HdotL;
		return D * G1 * abs( HdotV ) * abs( HdotL ) / ( NdotV * denom * denom );

	}
`,[br,Ns]),eu=R`

	fn ensureValidReflectionNormal( n: vec3f, ng: vec3f, i: vec3f ) -> vec3f {

		// reflected ray
		let R = 2.0 * dot( n, i ) * n - i;

		let Iz = dot( i, ng );

		// reflection rays may always be at least as shallow as the incoming ray
		let threshold = min( 0.9 * Iz, 0.01 );
		if ( dot( ng, R ) >= threshold ) {

			return n;

		}

		// Form coordinate system with Ng as the Z axis and N inside the X-Z-plane.
   		// The X axis is found by normalizing the component of N that's orthogonal to Ng.
   		// The Y axis isn't actually needed.
		let orthoN = n - dot( n, ng ) * ng;
		let orthoLen = length( orthoN );
		let X = select( n, orthoN / orthoLen, orthoLen != 0.0 );

		// Calculate N.z and N.x in the local coordinate system.
		//
		// The goal of this computation is to find a N' that is rotated towards Ng just enough
   		// to lift R' above the threshold (here called t), therefore dot(R', Ng) = t.
		//
		// See the Blender implementation for a full description of the solution.
		let Ix = dot( i, X );

		let a = Ix * Ix + Iz * Iz;
		let b = 2.0 * ( a + Iz * threshold );
		let c = ( threshold + Iz ) * ( threshold + Iz );

		// only one root is valid; the sign of Ix selects it
		var Nz2: f32;
		if ( Ix < 0.0 ) {

			Nz2 = 0.25 * ( b + sqrt( max( b * b - 4.0 * a * c, 0.0 ) ) ) / a;

		} else {

			Nz2 = 0.25 * ( b - sqrt( max( b * b - 4.0 * a * c, 0.0 ) ) ) / a;

		}

		let Nx = sqrt( max( 1.0 - Nz2, 0.0 ) );
		let Nz = sqrt( max( Nz2, 0.0 ) );

		return Nx * X + Nz * ng;

	}

`,tu=R`

	fn ensureValidViewNormal( n: vec3f, ng: vec3f, view: vec3f ) -> vec3f {

		// ensure the view is at least slightly above the surface normal hemisphere
		const MIN_VIEW_COS = 1e-6;

		// if we're positive already then early out
		let c = dot( n, view );
		if ( c > MIN_VIEW_COS ) {

			return n;

		}

		// perpendicular vector to normal and view
		var perp = n - c * view;
		let perpLen = length( perp );

		// if we reach here that means that he view is nearly the opposite direction and
		// we can't derive plan to rotate on towards the view, so just use the geometry
		// normal. This could likely only really happen with a severe normal map application.
		if ( perpLen <= 1e-6 ) {

			return ng;

		}

		perp = perp / perpLen;

		// rotate the normal to be at larger than the above threshold - pythagorean
		// theorem for generating normal with threshold*view component
		return MIN_VIEW_COS * view + sqrt( 1.0 - MIN_VIEW_COS * MIN_VIEW_COS ) * perp;

	}

`,Ua=3402823466e29,iu=(a,e,t)=>A(`

	fn getSurfaceRecord(
		material: Material,
		vertexData: bvh_GeometryStruct,
		side: f32,
		faceNormal: vec3f,
		view: vec3f,
		blurRoughness: f32,
	) -> SurfaceRecord {

		// "faceNormal" is provided on the hit side so flip it back to the geometric side
		var normal = faceNormal * side;
		if ( material.flatShading == 0 ) {

			normal = normalize( vertexData.normal.xyz );

		}

		var baseNormal = normal;
		if ( material.normalMap != -1 ) {

			// some provided tangents can be malformed (0, 0, 0) causing the normal to be degenerate
			// resulting in NaNs and slow path tracing.
			if ( length( vertexData.tangent.xyz ) > 0.0 && vertexData.tangent.w != 0.0 ) {

				// TODO: consider re-orthonormalizing against the normal here since attribute
				// interpolation could result in drift.
				let tangent = normalize( vertexData.tangent.xyz );
				let bitangent = normalize( cross( baseNormal, tangent ) * vertexData.tangent.w );
				let vTBN = mat3x3f( tangent, bitangent, baseNormal );

				let uvPrime = material.normalMapTransform * vec3( getUvFromChannel( vertexData, material.normalMap ), 1.0 );
				var texNormal = sampleTexel( uvPrime.xy, material.normalMap, 0 ).xyz;
				texNormal = texNormal * 2.0 - 1.0;
				texNormal = texNormal * vec3f( material.normalScale, 1.0 );
				normal = normalize( vTBN * texNormal );

			}

		}

		normal *= side;

		normal = ensureValidViewNormal( normal, faceNormal, view );

		normal = ensureValidReflectionNormal( normal, faceNormal, view );

		var albedo = vec4( material.color, material.opacity );
		if ( material.vertexColors == 1 ) {

			albedo *= getColor( vertexData );

		}

		if ( material.map != -1 ) {

			let uvPrime = material.mapTransform * vec3f( getUvFromChannel( vertexData, material.map ), 1 );
			albedo *= sampleTexel( uvPrime.xy, material.map, 0 );

		}

		if ( material.alphaMap != -1 ) {

			let uvPrime = material.alphaMapTransform * vec3f( getUvFromChannel( vertexData, material.alphaMap ), 1 );
			albedo.a *= sampleTexel( uvPrime.xy, material.alphaMap, 0 ).g;

		}

		var roughness = material.roughness;
		if ( material.roughnessMap != -1 ) {

			let uvPrime = material.roughnessMapTransform * vec3f( getUvFromChannel( vertexData, material.roughnessMap ), 1 );
			let texColor = sampleTexel( uvPrime.xy, material.roughnessMap, 0 );
			roughness *= texColor.g;

		}

		var metalness = material.metalness;
		if ( material.metalnessMap != -1 ) {

			let uvPrime = material.metalnessMapTransform * vec3f( getUvFromChannel( vertexData, material.metalnessMap ), 1 );
			let texColor = sampleTexel( uvPrime.xy, material.metalnessMap, 0 );
			metalness *= texColor.b;

		}

		var emission = material.emissiveIntensity * material.emissive;
		if ( material.emissiveMap != -1 ) {

			let uvPrime = material.emissiveMapTransform * vec3f( getUvFromChannel( vertexData, material.emissiveMap ), 1 );
			let texColor = sampleTexel( uvPrime.xy, material.emissiveMap, 0 );
			emission *= texColor.rgb;

		}

		var transmission = material.transmission;
		if ( material.transmissionMap != -1 ) {

			let uvPrime = material.transmissionMapTransform * vec3f( getUvFromChannel( vertexData, material.transmissionMap ), 1 );
			let texColor = sampleTexel( uvPrime.xy, material.transmissionMap, 0 );
			transmission *= texColor.r;

		}

		var clearcoat = material.clearcoat;
		if ( material.clearcoatMap != -1 ) {

			let uvPrime = material.clearcoatMapTransform * vec3f( getUvFromChannel( vertexData, material.clearcoatMap ), 1 );
			let texColor = sampleTexel( uvPrime.xy, material.clearcoatMap, 0 );
			clearcoat *= texColor.r;

		}

		var clearcoatRoughness = material.clearcoatRoughness;
		if ( material.clearcoatRoughnessMap != -1 ) {

			let uvPrime = material.clearcoatRoughnessMapTransform * vec3f( getUvFromChannel( vertexData, material.clearcoatRoughnessMap ), 1 );
			let texColor = sampleTexel( uvPrime.xy, material.clearcoatRoughnessMap, 0 );
			clearcoatRoughness *= texColor.g;

		}

		var clearcoatNormal = baseNormal;
		if ( material.clearcoatNormalMap != -1 ) {

			// some provided tangents can be malformed (0, 0, 0) causing the normal to be degenerate
			// resulting in NaNs and slow path tracing.
			if ( length( vertexData.tangent.xyz ) > 0.0 && vertexData.tangent.w != 0.0 ) {

				// TODO: consider re-orthonormalizing against the normal here since attribute
				// interpolation could result in drift.
				let tangent = normalize( vertexData.tangent.xyz );
				let bitangent = normalize( cross( baseNormal, tangent ) * vertexData.tangent.w );
				let vTBN = mat3x3f( tangent, bitangent, baseNormal );

				let uvPrime = material.clearcoatNormalMapTransform * vec3( getUvFromChannel( vertexData, material.clearcoatNormalMap ), 1.0 );
				var texNormal = sampleTexel( uvPrime.xy, material.clearcoatNormalMap, 0 ).xyz;
				texNormal = texNormal * 2.0 - 1.0;
				texNormal = texNormal * vec3f( material.clearcoatNormalScale, 1.0 );
				clearcoatNormal = normalize( vTBN * texNormal );

			}

		}

		clearcoatNormal *= side;

		clearcoatNormal = ensureValidViewNormal( clearcoatNormal, faceNormal, view );

		clearcoatNormal = ensureValidReflectionNormal( clearcoatNormal, faceNormal, view );

		var sheenColor = material.sheenColor;
		if ( material.sheenColorMap != -1 ) {

			let uvPrime = material.sheenColorMapTransform * vec3f( getUvFromChannel( vertexData, material.sheenColorMap ), 1 );
			let texColor = sampleTexel( uvPrime.xy, material.sheenColorMap, 0 );
			sheenColor *= texColor.rgb;

		}

		var sheenRoughness = material.sheenRoughness;
		if ( material.sheenRoughnessMap != -1 ) {

			let uvPrime = material.sheenRoughnessMapTransform * vec3f( getUvFromChannel( vertexData, material.sheenRoughnessMap ), 1 );
			let texColor = sampleTexel( uvPrime.xy, material.sheenRoughnessMap, 0 );
			sheenRoughness *= texColor.r;

		}

		var iridescence = material.iridescence;
		if ( material.iridescenceMap != -1 ) {

			let uvPrime = material.iridescenceMapTransform * vec3f( getUvFromChannel( vertexData, material.iridescenceMap ), 1 );
			let texColor = sampleTexel( uvPrime.xy, material.iridescenceMap, 0 );
			iridescence *= texColor.r;

		}

		var iridescenceThickness = material.iridescenceThicknessMaximum;
		if ( material.iridescenceThicknessMap != -1 ) {

			let uvPrime = material.iridescenceThicknessMapTransform * vec3f( getUvFromChannel( vertexData, material.iridescenceThicknessMap ), 1 );
			let texColor = sampleTexel( uvPrime.xy, material.iridescenceThicknessMap, 0 );

			iridescenceThickness = mix(
				material.iridescenceThicknessMinimum,
				material.iridescenceThicknessMaximum,
				texColor.g,
			);

		}

		var specularColor = material.specularColor;
		if ( material.specularColorMap != -1 ) {

			let uvPrime = material.specularColorMapTransform * vec3f( getUvFromChannel( vertexData, material.specularColorMap ), 1 );
			let texColor = sampleTexel( uvPrime.xy, material.specularColorMap, 0 );
			specularColor *= texColor.rgb;

		}

		var specularIntensity = material.specularIntensity;
		if ( material.specularIntensityMap != -1 ) {

			let uvPrime = material.specularIntensityMapTransform * vec3f( getUvFromChannel( vertexData, material.specularIntensityMap ), 1 );
			let texColor = sampleTexel( uvPrime.xy, material.specularIntensityMap, 0 );
			specularIntensity *= texColor.a;

		}

		// extract the anisotropy magnitude vector in tangent space
		var anisotropyDirVec = material.anisotropy * vec2f( cos( material.anisotropyRotation ), sin( material.anisotropyRotation ) );
		if ( material.anisotropyMap != -1 ) {

			let uvPrime = material.anisotropyMapTransform * vec3f( getUvFromChannel( vertexData, material.anisotropyMap ), 1.0 );
			let aniTex = sampleTexel( uvPrime.xy, material.anisotropyMap, 0 );

			// map rg encode the direction ([-1,1]), b the strength; rotate + scale by the material anisotropy.
			let mapDir = aniTex.rg * 2.0 - vec2f( 1.0 );
			let mapStr = aniTex.b;
			let mapLen = length( mapDir );
			if ( mapLen > EPSILON ) {

				anisotropyDirVec = mat2x2f(
					anisotropyDirVec.x, anisotropyDirVec.y,
					- anisotropyDirVec.y, anisotropyDirVec.x
				) * mapStr * mapDir / mapLen;

			}

		}

		// adjust the surface basis to be oriented along the anisotropic vector
		let anisotropyStrength = length( anisotropyDirVec );
		var surfaceBasis = getBasisFromNormal( normal );
		if ( anisotropyStrength > 0.0 && length( vertexData.tangent.xyz ) > 0.0 && vertexData.tangent.w != 0.0 ) {

			let anisotropyDir = anisotropyDirVec / anisotropyStrength;

			// re-orthonormalize the tangent against the shading normal so the frame stays orthonormal -
			// normal map adjustments will cause the normal and tangent to become non-orthonormal.
			let tangent = normalize( vertexData.tangent.xyz - normal * dot( normal, vertexData.tangent.xyz ) );
			let bitangent = cross( normal, tangent ) * vertexData.tangent.w;

			surfaceBasis = mat3x3f(
				tangent * anisotropyDir.x + bitangent * anisotropyDir.y,
				bitangent * anisotropyDir.x - tangent * anisotropyDir.y,
				normal
			);

		}

		var surf: SurfaceRecord;

		surf.volumeParticle = false;
		surf.faceNormal = faceNormal;
		surf.normal = normal;

		surf.metalness = metalness;
		surf.diffuseRoughness = material.diffuseRoughness;
		surf.color = albedo.rgb;
		surf.emission = emission;

		surf.opacity = select( 1.0, albedo.a, material.transparent != 0 );

		surf.ior = material.ior;
		surf.transmission = transmission;
		surf.thinWall = material.thinWall == 1;
		surf.attenuationColor = material.attenuationColor;
		surf.attenuationDistance = material.attenuationDistance;

		surf.clearcoatNormal = clearcoatNormal;
		surf.clearcoat = clearcoat;

		surf.iridescence = iridescence;
		surf.iridescenceIor = material.iridescenceIor;
		surf.iridescenceThickness = iridescenceThickness;

		surf.specularColor = specularColor;
		surf.specularIntensity = specularIntensity;

		surf.sheen = material.sheen;
		surf.sheenColor = sheenColor;

		let minRoughness = max( MIN_ROUGHNESS, blurRoughness );
		surf.roughness = clamp( roughness, minRoughness, 1.0 );
		surf.clearcoatRoughness = clamp( clearcoatRoughness, minRoughness, 1.0 );
		surf.sheenRoughness = clamp( sheenRoughness, minRoughness, 1.0 );
		surf.anisotropy = anisotropyStrength;

		// frontFace is used to determine transmissive properties and PDF. If no transmission is used
		// then we can just always assume this is a front face.
		surf.frontFace = side == 1.0 || transmission == 0.0;
		if ( material.thinWall == 1 || surf.frontFace ) {

			surf.eta = 1.0 / material.ior;

		} else {

			surf.eta = material.ior;

		}
		surf.f0 = iorToF0( surf.eta );

		// get the normal frames
		surf.normalBasis = surfaceBasis;
		surf.normalInvBasis = inverse( surf.normalBasis );

		surf.clearcoatBasis = getBasisFromNormal( surf.clearcoatNormal );
		surf.clearcoatInvBasis = inverse( surf.clearcoatBasis );

		return surf;
	}

`,[Nc,De,Ec,a,e,t,me,W,eu,tu]);A(`

	fn diffuseBrdf( NdotV: f32, NdotL: f32, VdotH: f32, surf: SurfaceRecord ) -> vec3f {

		// https://blog.selfshadow.com/publications/s2015-shading-course/burley/s2015_pbs_disney_bsdf_notes.pdf
		// See equation (4)

		let fl = schlickFresnel( NdotL, 0.0 );
		let fv = schlickFresnel( NdotV, 0.0 );

		let alpha = surf.roughness * surf.roughness;
		let bias = mix( 0.0, 0.5, alpha ) - 1;
		let energyFactor = mix( 1.0, 1.0 / 1.51, alpha );

		let rr = 2.0 * alpha * VdotH * VdotH;
		let retro = rr * ( fl + fv + fl * fv * ( rr + 2.0 * bias ) );
		let fresnel = ( 1.0 + bias * fl ) * ( 1.0f + bias * fv );

		// TODO: subsurface approx?

		return energyFactor * ( surf.color / PI ) * ( retro + fresnel );

	}

`,[W,mt,me]);A(`

	fn lambertBrdf( NdotV: f32, NdotL: f32, VdotH: f32, surf: SurfaceRecord ) -> vec3f {

		return surf.color / PI;

	}

`,[W,me]);const Wa=A(`

	fn specularBrdf( V: vec3f, L: vec3f, H: vec3f, alpha: vec2f ) -> vec3f {

		let alphaT = alpha.x;
		let alphaB = alpha.y;

		let Vis = ggxSmithVisibility( V, L, alpha );
		let D = ggxDistribution( H, alpha );

		return vec3f( D * Vis );

	}

`,[Jc,br]),hi=A(`

	fn isMatchedIor( eta: f32 ) -> bool {

		return abs( eta - 1.0 ) < EPSILON;

	}

`,[W]),qa=A(`

	fn specularBtdf( V: vec3f, L: vec3f, H: vec3f, alpha: vec2f, eta: f32 ) -> vec3f {

		let NdotV = V.z;
		let NdotL = L.z;
		let HdotV = dot( V, H );
		let HdotL = dot( L, H );

		// Heaviside function for G term
		if ( NdotV * HdotV < 0.0 || NdotL * HdotL < 0.0 || HdotV * HdotL > 0.0 ) {

			return vec3f( 0.0 );

		}

		let G1_i = ggxShadowMaskG1( V, alpha );
		let G1_o = ggxShadowMaskG1( L, alpha );

		// separable G2 product, no height correlation
		let denom = eta * HdotV + HdotL;
		let Vis = G1_i * G1_o * abs( HdotV ) * abs( HdotL ) /
			( abs( NdotV ) * abs( NdotL ) * denom * denom );

		let F = dielectricFresnel( abs( HdotV ), eta );

		let D = ggxDistribution( H, alpha );

		return vec3f( ( 1 - F ) * D * Vis );

	}

`,[Ns,br,xi]),Gr=A(`

	fn thinWallTransmissionRoughness( alpha: f32, eta: f32 ) -> f32 {

		let t = 3.4 * ( eta - 1.0 ) * ( eta - 0.5 ) * ( eta - 0.5 ) / ( eta * eta * eta );
		return saturate( alpha * sqrt( max( t, 0.0 ) ) );

	}

`),Ga=A(`

	fn transmissionAttenuation( dist: f32, attColor: vec3f, attDist: f32 ) -> vec3f {

		return pow( attColor, vec3f( dist / attDist ) );

	}

`),wr=360,_r=830,ru=A(`

	fn dispersionIor( ior: f32, dispersion: f32, wavelength: f32 ) -> f32 {

		let nd = max( ior, 1.0 );
		let scale = ( nd - 1.0 ) * max( dispersion, 0.0 ) / 20.0;
		let lambda = clamp( wavelength, ${wr}.0, ${_r}.0 );
		return max( nd + scale * ( 523655.0 / ( lambda * lambda ) - 1.5168 ), 1.0 );

	}

`),ja=R`

	fn applyDispersion( surf: ptr<function, ${me}>, dispersion: f32, wavelength: f32 ) -> void {

		surf.ior = ${ru}( surf.ior, dispersion, wavelength );
		surf.eta = select( surf.ior, 1.0 / surf.ior, surf.thinWall || surf.frontFace );
		surf.f0 = ${De}( surf.eta );

	}

`,Qa=A(`

	fn dispersionColorWeight( wavelength: f32 ) -> vec3f {

		let lambda = clamp( wavelength, ${wr}.0, ${_r}.0 );

		let x1 = ( lambda - 442.0 ) * select( 0.0374, 0.0624, lambda < 442.0 );
		let x2 = ( lambda - 599.8 ) * select( 0.0323, 0.0264, lambda < 599.8 );
		let x3 = ( lambda - 501.1 ) * select( 0.0382, 0.0490, lambda < 501.1 );
		let x = 0.362 * exp( - 0.5 * x1 * x1 ) + 1.056 * exp( - 0.5 * x2 * x2 ) - 0.065 * exp( - 0.5 * x3 * x3 );

		let y1 = ( lambda - 568.8 ) * select( 0.0247, 0.0213, lambda < 568.8 );
		let y2 = ( lambda - 530.9 ) * select( 0.0322, 0.0613, lambda < 530.9 );
		let y = 0.821 * exp( - 0.5 * y1 * y1 ) + 0.286 * exp( - 0.5 * y2 * y2 );

		let z1 = ( lambda - 437.0 ) * select( 0.0278, 0.0845, lambda < 437.0 );
		let z2 = ( lambda - 459.0 ) * select( 0.0725, 0.0385, lambda < 459.0 );
		let z = 1.217 * exp( - 0.5 * z1 * z1 ) + 0.681 * exp( - 0.5 * z2 * z2 );

		let linearRgb = max( vec3f(
			3.2404542 * x - 1.5371385 * y - 0.4985314 * z,
			- 0.9692660 * x + 1.8760108 * y + 0.0415560 * z,
			0.0556434 * x - 0.2040259 * y + 1.0572252 * z,
		), vec3f( 0.0 ) );

		return linearRgb * vec3f( 2.6699448, 4.0708066, 4.2980494 );

	}

`),su=A(`

	fn fresnelMix( VdotH: f32, f0Color: vec3f, ior: f32, eta: f32, weight: f32, base: vec3f, layer: vec3f ) -> vec3f {

		var f0 = iorToF0( ior ) * f0Color;
		f0 = min( f0, vec3f( 1.0 ) );

		// reflect all light on total internal reflection, matching the WebGL evaluateFresnel function
		var fr = vec3f( 1.0 );
		if ( ! totalInternalReflection( abs( VdotH ), eta ) ) {

			fr = schlickFresnelVec( abs( VdotH ), f0, vec3f( 1.0 ) );

		}

		let maxFr = max( max( fr.r, fr.g ), fr.b );

		return ( 1.0 - weight * maxFr ) * base + weight * fr * layer;

	}

`,[yr,De,As]),nu=To(3.2404542,-.969266,.0556434,-1.5371385,1.8760108,-.2040259,-.4985314,.041556,1.0572252),au=R`

	fn evalSensitivity( OPD: f32, shift: vec3f ) -> vec3f {

		let phase = 2.0 * ${Math.PI} * OPD * 1.0e-9;
		const val = vec3(5.4856e-13, 4.4201e-13, 5.2481e-13);
		const pos = vec3(1.6810e+06, 1.7953e+06, 2.2084e+06);
		const _var = vec3(4.3278e+09, 9.3046e+09, 6.6121e+09);

		var xyz = val * sqrt(2.0 * ${Math.PI} * _var) * cos(pos * phase + shift) * exp(-phase * phase * _var);
		xyz.x += 9.7470e-14 * sqrt(2.0 * ${Math.PI} * 4.5282e+09) * cos(2.2399e+06 * phase + shift.x) * exp(-4.5282e+09 * phase * phase);
		xyz /= 1.0685e-7;

		let rgb = ${nu} * xyz;
		return rgb;

	}

`,Ka=A(`

	fn iridescentFresnel(
		cosTheta1: f32, baseF0: vec3f, iridescenceIor: f32,
		outsideIor: f32, iridescenceThickness: f32,
	) -> vec3f {

		let sinTheta2Sq = pow( outsideIor / iridescenceIor, 2.0 ) * ( 1.0 - pow( cosTheta1, 2.0 ) );
		let cosTheta2Sq = 1.0 - sinTheta2Sq;

		// Handle total internal reflection
		if ( cosTheta2Sq < 0.0 ) {

			return vec3( 1.0 );

		}

		let cosTheta2 = sqrt( cosTheta2Sq );

		// First interface: air -> iridescent thin film
		let R0 = iorToF0General( iridescenceIor, outsideIor );
		let R12 = schlickFresnel( cosTheta1, R0 );
		let R21 = R12;
		let T121 = 1.0 - R12;
		let phi12 = select( 0.0, PI, iridescenceIor < outsideIor );
		let phi21 = PI - phi12;

		// Second interface: iridescent thin film -> base material
		let baseIor = fresnel0ToIor( clamp( baseF0, vec3( 0.0 ), vec3( 0.9999 ) ) ); // guard against 1.0
		let R1 = iorToF0GeneralVec( baseIor, vec3( iridescenceIor ) );
		var R23 = schlickFresnelVec( cosTheta2, R1, vec3( 1.0 ) );

		// Handle total internal reflection at the film -> base interface
		// NOTE: Added separately from the original implementation. Is this correct?
		R23 = select( R23, vec3( 1.0 ), totalInternalReflectionVec( cosTheta2, vec3( iridescenceIor ) / baseIor ) );
		let phi23 = select( vec3( 0.0 ), vec3( PI ), baseIor < vec3( iridescenceIor ) );

		// Phase shift
		let OPD = 2.0 * iridescenceIor * iridescenceThickness * cosTheta2;
		let phi = vec3( phi21 ) + phi23;

		// Analytical integration
		// Compound terms
		let R123 = clamp( R12 * R23, vec3( 1e-5 ), vec3( 0.9999 ) );
		let r123 = sqrt( R123 );
		let Rs = T121 * T121 * R23 / ( vec3( 1.0 ) - R123 );

		// Reflectance term for m = 0 (DC term amplitude)
		let C0 = R12 + Rs;
		var I = C0;

		// Reflectance term for m > 0 (pairs of diracs)
		var Cm = Rs - T121;
		for (var m = 1; m <= 2; m += 1) {

			Cm *= r123;
			let Sm = 2.0 * evalSensitivity( f32( m ) * OPD, f32( m ) * phi );
			I += Cm * Sm;

		}

		return max( I, vec3(0.0) );

	}

`,[zc,kc,mt,Vc,au,Hc]),ou=(a=Ka)=>R`

	fn transmissionFresnel( cosTheta: f32, surf: ${me} ) -> ${In} {

		var result: ${In};
		let cosine = saturate( abs( cosTheta ) );
		let matchedIor = ${hi}( surf.eta );
		let airIncident = surf.thinWall || surf.frontFace;
		let dielectricFresnel = ${xi}( cosine, surf.eta );

		// Keep matched media transparent unless a real thin-film layer is present. This avoids
		// introducing the non-physical Schlick F90 reflection produced by KHR_materials_specular
		// when the substrate itself has no IOR boundary.
		var reflectance = vec3f( 0.0 );
		if ( ! matchedIor ) {

			let specularF0 = min( surf.f0 * surf.specularColor, vec3f( 1.0 ) );
			let dielectricReflectance = select(
				vec3f( dielectricFresnel ),
				${yr}( cosine, specularF0, vec3f( 1.0 ) ),
				airIncident,
			);
			reflectance = surf.specularIntensity * dielectricReflectance;

		}

		reflectance = clamp( reflectance, vec3f( 0.0 ), vec3f( 1.0 ) );
		var transmittance = vec3f( 1.0 ) - reflectance;

		if ( surf.iridescence > 0.0 ) {

			// The media on either side of the film are air outside and the volume interior as
			// the base. Swap them on interior hits so film-interface TIR remains possible.
			let outsideIor = select( surf.ior, 1.0, airIncident );
			let filmBaseIor = select( 1.0, surf.ior, airIncident );
			let filmReflectance = clamp( ${a}(
				cosine,
				vec3f( ${De}( filmBaseIor ) ),
				surf.iridescenceIor,
				outsideIor,
				surf.iridescenceThickness,
			), vec3f( 0.0 ), vec3f( 1.0 ) );

			reflectance = mix( reflectance, filmReflectance, surf.iridescence );
			transmittance = mix( transmittance, vec3f( 1.0 ) - filmReflectance, surf.iridescence );

		}

		result.reflectance = reflectance;
		result.transmittance = transmittance;

		// Include the base-color tint in the transmission energy, as Cycles does when it
		// computes the glass reflection probability from its two tinted coefficients.
		let reflectEnergy = dot( reflectance, vec3f( 1.0 / 3.0 ) );
		let transmitEnergy = dot( transmittance * surf.color, vec3f( 1.0 / 3.0 ) );
		let totalEnergy = reflectEnergy + transmitEnergy;
		result.reflectProbability = select( 0.0, reflectEnergy / max( totalEnergy, EPSILON ), totalEnergy > EPSILON );

		return result;

	}

`,lu=A(`

	fn conductorFresnel( VdotH: f32, f0: vec3f, specular: vec3f ) -> vec3f {

		return specular * schlickFresnelVec( abs( VdotH ), f0, vec3f( 1 ) );

	}

`,[yr]),cu=A(`

	fn fresnelCoat( VdotNc: f32, ior: f32, base: vec3f, layer: vec3f, weight: f32 ) -> vec3f {

		let f0 = iorToF0( ior );
		let F = schlickFresnel( abs( VdotNc ), f0 );

		return mix( base, layer, weight * F );

	}

`,[De,mt]),uu=a=>R`

	fn albedo(
		eta: f32,
		includeFresnel: bool,
		includeRefraction: bool,
		globalId: vec3u,
		layer: u32,
	) -> void {

		// The matched-IOR limit is a unit-energy delta transmission event, so it cannot
		// be integrated with the rough BTDF below.
		if ( includeRefraction && ${hi}( eta ) ) {

			textureStore( ${a}, vec3( globalId.xy, layer ), vec4( 1.0 ) );
			return;

		}

		// sample the brdf directions in a grid pattern
		const GRID_SIZE = 64u;

		// TODO: this sampling means that energy at 0.0 & 1.0 roughness (and 0 and 90deg cos) are never
		// written to the texture due to the half texel inset, resulting in small, though possibly noticeable,
		// error in common cases.
		let dimensions = textureDimensions( ${a} ).xy;
		let uv = ( vec2f( globalId.xy ) + vec2f( 0.5 ) ) / vec2f( dimensions );

		let cosThetaO = uv.x;
		let roughness = uv.y;
		let alpha = roughness * roughness;

		let wo = vec3( sqrt( 1 - cosThetaO * cosThetaO ), 0 , cosThetaO );

		let f0 = ${De}( eta );

		var result = 0.0;
		for ( var x = 0u; x < GRID_SIZE; x++ ) {

			for ( var y = 0u; y < GRID_SIZE; y++ ) {

				// calculate the half vector to sample
				let gridPoint = vec2f( vec2u( x, y ) ) + vec2f( 0.5 );
				let sampleUv = gridPoint / f32( GRID_SIZE );
				let wh = ${oi}( wo, vec2( alpha ), sampleUv );

				var f = 1.0;
				if ( includeFresnel ) {

					// use the exact dielectric fresnel so the table agrees with the fresnel used
					// for lobe sampling
					f = ${xi}( dot( wo, wh ), eta );

				}

				// air-incident reflection is evaluated with schlick in bsdfEval - only the
				// volume-incident ( TIR ) glass reflection uses the exact fresnel
				var reflectionF = f;
				if ( eta < 1.0 ) {

					reflectionF = ${mt}( dot( wo, wh ), f0 );

				}

				// reflection lobe - samples landing below the surface are lost
				let wi = - reflect( wo, wh );
				let reflectionPdf = ${li}( wo, wh, vec2f( alpha ) );
				if ( wi.z > 0.0 && reflectionPdf != 0.0 ) {

					let specular = ${Wa}( wo, wi, wh, vec2f( alpha ) );
					result += reflectionF * specular.x * wi.z / reflectionPdf;

				}

				// refraction lobe - the btdf carries its own ( 1 - F ) fresnel weight, and
				// samples landing back above the surface are lost
				if ( includeRefraction ) {

					let wiRefract = refract( - wo, wh, eta );
					if ( wiRefract.z < 0.0 ) {

						let transmission = ${qa}( wo, wiRefract, wh, vec2f( alpha ), eta );
						let pdf = ${Oa}( wo, wiRefract, wh, vec2f( alpha ), eta );
						if ( pdf != 0.0 ) {

							result += transmission.x * abs( wiRefract.z ) / pdf;

						}

					}

				}

			}

		}

		result /= f32( GRID_SIZE * GRID_SIZE );

		textureStore( ${a}, vec3( globalId.xy, layer ), vec4( result ) );

	}

`;function du(a,e=Math.random){for(let t=a.length-1;t>0;t--){const i=~~((e()-1e-6)*t),r=a[t];a[t]=a[i],a[i]=r}}function hu(a,e){a.fill(0);for(let t=0;t<e;t++)a[t]=1}class Bn{constructor(e){this.count=0,this.size=-1,this.sigma=-1,this.radius=-1,this.lookupTable=null,this.score=null,this.binaryPattern=null,this.resize(e),this.setSigma(1.5)}findVoid(){const{score:e,binaryPattern:t}=this;let i=1/0,r=-1;for(let n=0,s=t.length;n<s;n++){if(t[n]!==0)continue;const o=e[n];o<i&&(i=o,r=n)}return r}findCluster(){const{score:e,binaryPattern:t}=this;let i=-1/0,r=-1;for(let n=0,s=t.length;n<s;n++){if(t[n]!==1)continue;const o=e[n];o>i&&(i=o,r=n)}return r}setSigma(e){if(e===this.sigma)return;const t=~~(Math.sqrt(20*e**2)+1),i=2*t+1,r=new Float32Array(i*i),n=e*e;for(let s=-t;s<=t;s++)for(let o=-t;o<=t;o++){const l=(t+o)*i+s+t,d=s*s+o*o;r[l]=Math.E**(-d/(2*n))}this.lookupTable=r,this.sigma=e,this.radius=t}resize(e){this.size!==e&&(this.size=e,this.score=new Float32Array(e*e),this.binaryPattern=new Uint8Array(e*e))}invert(){const{binaryPattern:e,score:t,size:i}=this;t.fill(0);for(let r=0,n=e.length;r<n;r++)if(e[r]===0){const s=~~(r/i),o=r-s*i;this.updateScore(o,s,1),e[r]=1}else e[r]=0}updateScore(e,t,i){const{size:r,score:n,lookupTable:s}=this,o=this.radius,l=2*o+1;for(let d=-o;d<=o;d++)for(let c=-o;c<=o;c++){const u=(o+c)*l+d+o,h=s[u];let f=e+d;f=f<0?r+f:f%r;let p=t+c;p=p<0?r+p:p%r;const y=p*r+f;n[y]+=i*h}}addPointIndex(e){this.binaryPattern[e]=1;const t=this.size,i=~~(e/t),r=e-i*t;this.updateScore(r,i,1),this.count++}removePointIndex(e){this.binaryPattern[e]=0;const t=this.size,i=~~(e/t),r=e-i*t;this.updateScore(r,i,-1),this.count--}copy(e){this.resize(e.size),this.score.set(e.score),this.binaryPattern.set(e.binaryPattern),this.setSigma(e.sigma),this.count=e.count}}class fu{constructor(){this.random=Math.random,this.sigma=1.5,this.size=64,this.majorityPointsRatio=.1,this.samples=new Bn(1),this.savedSamples=new Bn(1)}generate(){const{samples:e,savedSamples:t,sigma:i,majorityPointsRatio:r,size:n}=this;e.resize(n),e.setSigma(i);const s=Math.floor(n*n*r),o=e.binaryPattern;hu(o,s),du(o,this.random);for(let u=0,h=o.length;u<h;u++)o[u]===1&&e.addPointIndex(u);for(;;){const u=e.findCluster();e.removePointIndex(u);const h=e.findVoid();if(u===h){e.addPointIndex(u);break}e.addPointIndex(h)}const l=new Uint32Array(n*n);t.copy(e);let d;for(d=e.count-1;d>=0;){const u=e.findCluster();e.removePointIndex(u),l[u]=d,d--}const c=n*n;for(d=t.count;d<c/2;){const u=t.findVoid();t.addPointIndex(u),l[u]=d,d++}for(t.invert();d<c;){const u=t.findCluster();t.removePointIndex(u),l[u]=d,d++}return{data:l,maxValue:c}}}function pu(a){return a>=3?4:a}function mu(a){switch(a){case 1:return tr;case 2:return Io;default:return Ce}}class gu extends Ie{constructor(e=64,t=1){super(new Float32Array(4),1,1,Ce,Xe),this.minFilter=Ve,this.magFilter=Ve,this.size=e,this.channels=t,this.update()}update(){const e=this.channels,t=this.size,i=new fu;i.channels=e,i.size=t;const r=pu(e),n=mu(r);(this.image.width!==t||n!==this.format)&&(this.image.width=t,this.image.height=t,this.image.data=new Float32Array(t**2*r),this.format=n,this.dispose());const s=this.image.data;for(let o=0,l=e;o<l;o++){const d=i.generate(),c=d.data,u=d.maxValue;for(let h=0,f=c.length;h<f;h++){const p=c[h]/u;s[h*r+o]=p}}this.needsUpdate=!0}}const Xa=64,xu=new gu(Xa,1),vu=pe(xu),Ya=vs(0).toVar("blueDitherSeed"),yu=R`
	fn blueDitherInitialize( pixel: vec2u, pathIndex: u32, bounceIndex: u32 ) -> void {

		let coord = vec2i( pixel % vec2u( ${Xa}u ) );
		${Ya} = textureLoad( ${vu}, coord, 0 );
		${Da}( vec2u( 0 ), pathIndex, bounceIndex );

	}
`,bu=R`
	fn blueDitherNextBounce() -> void {

		${Ma}();

	}
`,Sr=R`
	fn blueDitherRand4( effect: u32 ) -> vec4f {

		// Get the scrambled sobol stratified sample
		let stratifiedSample = ${Pa}( effect );

		// offset it by the blue noise seed and dimension rotation
		return fract( stratifiedSample + ${Ya}.r );

	}
`,wu=R`
	fn blueDitherRand3( effect: u32 ) -> vec3f {

		return ${Sr}( effect ).xyz;

	}
`,_u=R`
	fn blueDitherRand2( effect: u32 ) -> vec2f {

		return ${Sr}( effect ).xy;

	}
`,Su=R`
	fn blueDitherRand1( effect: u32 ) -> f32 {

		return ${Sr}( effect ).x;

	}
`,Tu=Object.freeze(Object.defineProperty({__proto__:null,rand1:Su,rand2:_u,rand3:wu,rand4:Sr,rngInit:yu,rngNextBounce:bu},Symbol.toStringTag,{value:"Module"})),Za=0,Es=1,Ja=2,Iu=2147483648,zs=1073741824,Tr=1073741823;class Cu extends ce{constructor(){const e={bvhData:{value:null},material:{value:null},envInfo:{value:null},lightsInfo:{value:null},prevOutputTarget:Ee(new re(1,1)).toReadOnly(),outputTarget:Ee(new re(1,1)).toWriteOnly(),sampleCountTarget:Ee(new re(1,1)).toReadWrite(),offset:$(new Y),tileSize:$(new Y),seed:$(0),maxBounces:$(5),maxTransparentBounces:$(5,"uint"),misEnabled:$(1,"uint"),maxSamples:$(0,"uint"),filterGlossy:$(1),clampDirect:$(0),clampIndirect:$(10),backgroundInfo:{value:null},transmissiveBackground:$(Es),textures:pe(new Ie),textureSampler:Et(new Ie),globalId:ve},t=q("bvhData.value.fns.raycastFirstHit.outputType",e),i=H("bvhData.value.fns.raycastFirstHit",e),r=H("bvhData.value.fns.raycastShadow",e),n=H("bvhData.value.fns.sampleTrianglePoint",e),s=H("bvhData.value.fns.getSurfaceRecord",e),o=H("bvhData.value.fns.getCameraRay",e),l=H("material.value.bsdfSample",e),d=H("material.value.bsdfEvalPdf",e),c=q("envInfo.value.totalSumNode",e),u=q("envInfo.value.intensityNode",e),h=q("envInfo.value.sampleColor",e),f=q("envInfo.value.sampleDir",e),p=q("envInfo.value.getDirPdf",e),y=q("envInfo.value.getWeight",e),v=q("backgroundInfo.value.sampleColor",e),w=q("lightsInfo.value.countNode",e),m=H("lightsInfo.value.randomLightSample",e),x=H("lightsInfo.value.intersectLightAtIndex",e),g=H("lightsInfo.value.getLightWeight",e),b=H("lightsInfo.value.getLightsWeight",e),S=H("lightsInfo.value.selectLight",e),_=H("lightsInfo.value.isLightVisibleToCamera",e),I=R`

			fn compute(

				// indices and target
				globalId: vec3u,

				// tiles
				offset: vec2u,
				tileSize: vec2u,

				// settings
				seed: u32,
				maxBounces: u32,
				maxTransparentBounces: u32,
				misEnabled: u32,
				maxSamples: u32,
				filterGlossy: f32,
				clampDirect: f32,
				clampIndirect: f32,

				transmissiveBackground: u32,

			) -> void {

				let transforms = &${q("bvhData.value.storage.transforms",e)};
				let materials = &${q("bvhData.value.storage.materials",e)};

				// make sure we don't bleed over the edge of our tile
				if ( globalId.x >= tileSize.x || globalId.y >= tileSize.y ) {

					return;

				}

				// to screen coordinates
				let indexUV = offset + globalId.xy;
				let targetDimensions = textureDimensions( ${e.outputTarget} );
				if ( indexUV.x >= targetDimensions.x || indexUV.y >= targetDimensions.y ) {

					return;

				}

				// skip the pixel once it has hit the sample limit
				let sampleCount = textureLoad( ${e.sampleCountTarget}, indexUV ).r;
				if ( maxSamples != 0u && sampleCount >= maxSamples ) {

					return;

				}

				let uv = vec2f( indexUV ) / vec2f( targetDimensions );
				${Ht}( indexUV.xy, seed, 0 );

				// scene ray
				let jitteredUv = uv + ${Ot}( ${Aa} ) / vec2f( targetDimensions );
				var ray: ${V};
				if ( ! ${o}( jitteredUv, vec2f( targetDimensions ), &ray ) ) {

					return;

				}

				ray.direction = normalize( ray.direction );

				var resultColor = vec4f( 0, 0, 0, 1 );
				var throughputColor = vec3f( 1.0 );
				var bsdfPdf = 0.0;
				var isFullyTransmissive = true;
				var minPdf = 1.0;
				var transparentBounce = 0u;
				// A negative value marks a sampled wavelength whose RGB reconstruction weight has not been applied yet.
				var dispersionWavelength = - mix( ${wr}.0, ${_r}.0, ${ct}( ${Na} ) );

				// one-sample NEE chooses between the analytic lights and the environment
				let envActive = ${c} > 0.0 && ${u} > 0.0;
				let lightsCount = ${w};
				var envWeight = 0.0;
				if ( envActive ) {

					envWeight = ${y}();

				}

				// added last, since a camera ray miss overwrites the pixel with the background
				var lightHits = vec3f( 0.0 );
				var cameraHitLight = false;

				for ( var bounce = 0u; bounce < maxBounces; bounce ++ ) {

					var hitResult: ${t};
					let didHit = ${i}( ray, &hitResult );
					let surfaceDist = select( ${mi}, hitResult.dist, didHit );

					// NEE's total weight at the vertex this ray left, for MIS. Camera rays have none
					let isMISWeighted = misEnabled != 0u && bounce > 0u;
					var lightTotalWeight = 0.0;
					if ( isMISWeighted ) {

						lightTotalWeight = ${b}( ray.origin ) + envWeight;

					}

					// forward hits on area lights. Camera rays only see visibleToCameraRays lights, at full weight
					for ( var li = 0u; li < lightsCount; li ++ ) {

						if ( bounce == 0u && ! ${_}( li ) ) {

							continue;

						}

						var lightRec: ${ze};
						if ( ${x}( ray.origin, ray.direction, li, &lightRec ) && lightRec.dist < surfaceDist ) {

							var misWeight = 1.0;
							if ( isMISWeighted ) {

								let selectionPdf = ${g}( li, ray.origin ) / lightTotalWeight;
								misWeight = ${je}( bsdfPdf, lightRec.pdf * selectionPdf );

							}

							lightHits += ${se}( lightRec.emission * throughputColor * misWeight, bounce, clampDirect, clampIndirect );
							cameraHitLight = cameraHitLight || bounce == 0u;

						}

					}

					if ( didHit ) {

						let objectInfo = transforms[ hitResult.objectIndex ];
						var materialInfo = ( *materials )[ objectInfo.materialIndex ];

						// a matte surface hit by the camera ray renders as a fully transparent
						if ( materialInfo.matte != 0 && bounce == 0u ) {

							resultColor = vec4f( 0.0 );
							break;

						}

						// apply per-object colors
						materialInfo.color *= objectInfo.color.rgb;
						materialInfo.opacity *= objectInfo.color.a;

						let view = - ray.direction;
						var vertexData = ${n}( hitResult.barycoord, hitResult.indices.xyz );
						vertexData.normal = normalize( transpose( objectInfo.inverseMatrixWorld ) * vertexData.normal );
						vertexData.tangent = vec4f( ( objectInfo.matrixWorld * vec4f( vertexData.tangent.xyz, 0.0 ) ).xyz, vertexData.tangent.w );
						vertexData.position = objectInfo.matrixWorld * vertexData.position;

						// blur glossy surfaces after low-probability bounces to suppress fireflies,
						// from the Cycles "filter glossy" approach in integrator/surface_shader.h
						// The smallest pdf seen along the path for the glossy filter is tracked below
						let blurRoughness = sqrt( clamp( 1.0 - filterGlossy * minPdf, 0.0, 1.0 ) ) * 0.5;

						var surface = ${s}( materialInfo, vertexData, hitResult.side, hitResult.normal, view, blurRoughness );

						// Stochastically pass through partially transparent surfaces by restarting
						// the ray at the hit point, advancing the rng but not the bounce count.
						if ( ${ct}( ${Ea} ) > surface.opacity ) {

							// stop once the transparent bounces run out
							if ( transparentBounce >= maxTransparentBounces ) {

								break;

							}

							ray.origin = ${zt}( vertexData.position.xyz, ray.direction, hitResult.normal );
							${Tn}();
							transparentBounce ++;
							bounce --;
							continue;

						}

						let isDispersive = materialInfo.dispersion > 0.0 && surface.ior > 1.0 && surface.transmission > 0.0 && ! surface.thinWall;
						if ( isDispersive ) {

							let wavelength = abs( dispersionWavelength );
							${ja}( &surface, materialInfo.dispersion, wavelength );
							if ( dispersionWavelength < 0.0 ) {

								dispersionWavelength = wavelength;
								throughputColor *= ${Qa}( wavelength );

							}

						}

						// attenuate the light transmitted through the volume when exiting a backface
						if ( hitResult.side < 0.0 && materialInfo.transmission > 0.0 ) {

							throughputColor *= ${Ga}( hitResult.dist, materialInfo.attenuationColor, materialInfo.attenuationDistance );

						}

						// emission, clamped at the depth of the segment that found it, as in Cycles
						let emission = ${se}( throughputColor * surface.emission, bounce, clampDirect, clampIndirect );
						resultColor += vec4f( emission, 0.0 );

						// next event estimation: choose one light or the environment by its estimated
						// contribution
						if ( misEnabled != 0u ) {

							let ruv = ${Ms}( ${Ba} );
							var selectionPdf = 0.0;
							let lightIndex = ${S}( vertexData.position.xyz, envWeight, ruv.x, &selectionPdf );
							if ( selectionPdf > 0.0 ) {

								var lightRec: ${ze};
								if ( envActive && lightIndex == lightsCount ) {

									// the environment, sampled from its CDF, as a light of kind ENVIRONMENT
									let envSample = ${f}( ruv.yz );
									lightRec.direction = envSample.direction;
									lightRec.emission = envSample.color;
									lightRec.pdf = envSample.pdf;
									lightRec.dist = ${mi};
									lightRec.lightType = ${$s};

								} else {

									lightRec = ${m}( lightIndex, vertexData.position.xyz, ruv.yz );

								}

								if ( lightRec.pdf > 0.0 ) {

									let evalRec = ${d}( view, lightRec.direction, surface );
									if ( evalRec.pdf > 0.0 ) {

										var shadowRay: ${V};
										shadowRay.origin = ${zt}( vertexData.position.xyz, lightRec.direction, hitResult.normal );
										shadowRay.direction = lightRec.direction;
										shadowRay.maxDist = lightRec.dist * ( 1.0 - ${Va} );

										// opaque occlusion up to the light distance. A shadow-specific any hit
										// traversal could support tinted shadows from transmissive and partially
										// opaque objects
										var shadowHit: ${t};
										let occluded = ${r}( shadowRay, &shadowHit );
										if ( ! occluded ) {

											let lightPdf = lightRec.pdf * selectionPdf;

											// env + area lights are also bsdf-sampled, so MIS-weight them - punctual lights take full weight,
											// or when a bsdf ray could never reach the light
											let isMISWeighted = ${Ha}( lightRec.lightType ) && ! shadowHit.forwardBlocked;
											let misWeight = select( 1.0, ${je}( lightPdf, evalRec.pdf ), isMISWeighted );
											let directLight = throughputColor * lightRec.emission * evalRec.color * misWeight / lightPdf;
											let contribution = ${se}( directLight, bounce + 1u, clampDirect, clampIndirect );
											resultColor += vec4f( contribution, 0.0 );

										}

									}

								}

							}

						}

						let scatterRec = ${l}( view, surface );
						if ( ${Ls}( scatterRec ) ) {

							break;

						}

						isFullyTransmissive = isFullyTransmissive && scatterRec.isTransmissive;

						// track the smallest pdf seen along the path for the glossy filter
						minPdf = min( minPdf, scatterRec.pdf );

						// russian roulette early out:
						// Matches Cycles path_state_continuation_probability in integrator/path_state.h
						if ( bounce >= 3u ) {

							let rrThroughput = throughputColor * scatterRec.color / scatterRec.pdf;
							let rrProb = saturate( sqrt( max( max( rrThroughput.r, rrThroughput.g ), rrThroughput.b ) ) );
							if ( rrProb <= 0.0 || ${ct}( ${$a} ) > rrProb ) {

								break;

							}

							throughputColor /= rrProb;

						}

						throughputColor *= scatterRec.color;
						throughputColor /= scatterRec.pdf;
						bsdfPdf = scatterRec.pdf;

						// exit if our throughput is 0.0
						if ( all( throughputColor == vec3f( 0.0 ) ) ) {

							break;

						}

						ray.origin = ${zt}( vertexData.position.xyz, scatterRec.direction, hitResult.normal );
						ray.direction = scatterRec.direction;
						ray.maxDist = 0.0;

					} else {

						if ( bounce > 0u && ! isFullyTransmissive ) {

							var misWeight = 1.0;
							if ( isMISWeighted && envActive ) {

								// match the env pdf scaling used by the NEE selection so the two estimators balance
								let envPdf = ${p}( ray.direction ) * envWeight / lightTotalWeight;
								misWeight = ${je}( bsdfPdf, envPdf );

							}

							let environment = ${h}( ray.direction ).rgb * throughputColor * misWeight;
							let contribution = ${se}( environment, bounce, clampDirect, clampIndirect );
							resultColor += vec4f( contribution, 0.0 );

						} else {

							// hit the background
							// support multiple transparent background blending techniques
							let rng = ${Ot}( ${La} );
							let bg = ${v}( ray.direction, rng );
							if ( bounce == 0u ) {

								// sample the background directly if this is the primary ray
								let background = ${se}( bg.a * bg.rgb, bounce, clampDirect, clampIndirect );
								resultColor = vec4f( background, bg.a );

							} else {

								// transmissive ray handling
								let env = ${h}( ray.direction );
								let avg = saturate( dot( throughputColor, vec3f( 1.0 / 3.0 ) ) );
								let transparency = ( 1.0 - bg.a ) * avg;
								var envMisWeight = 1.0;
								if ( misEnabled != 0u && ${c} > 0.0 ) {

									let envPdf = ${p}( ray.direction );
									envMisWeight = ${je}( bsdfPdf, envPdf );

								}

								if ( transmissiveBackground == ${Za}u ) {

									// display the env map through transmissive surfaces
									let background = ${se}( env.rgb * throughputColor * envMisWeight, bounce, clampDirect, clampIndirect );
									resultColor = vec4f(
										resultColor.rgb + background,
										1.0,
									);

								} else if ( transmissiveBackground == ${Ja}u ) {

									// fade the background by the throughput color average
									let background = ${se}( bg.a * bg.rgb * throughputColor * envMisWeight, bounce, clampDirect, clampIndirect );
									resultColor = vec4f(
										resultColor.rgb + background,
										1.0 - transparency,
									);

								} else {

									// fade the background by the throughput color average, mixing in env lighting
									var light = mix( env.rgb, bg.rgb, bg.a ) * envMisWeight;
									let background = ${se}( light * throughputColor, bounce, clampDirect, clampIndirect );
									resultColor = vec4f(
										resultColor.rgb + background,
										1.0 - transparency,
									);

								}

							}

						}

						break;

					}

					${Tn}();

				}

				// visible lights are opaque against a transparent background
				resultColor += vec4f( lightHits, 0.0 );
				if ( cameraHitLight ) {

					resultColor.a = 1.0;

				}

				let nextSampleCount = sampleCount + 1;
				// store the color rows top down to match a rasterized render target
				let colorIndex = vec2u( indexUV.x, targetDimensions.y - 1u - indexUV.y );

				let prevColor = textureLoad( ${e.prevOutputTarget}, colorIndex );
				let blendedColor = ${ka}( prevColor, resultColor, 1.0 / f32( nextSampleCount ) );
				textureStore( ${e.sampleCountTarget}, indexUV, vec4( nextSampleCount ) );
				textureStore( ${e.outputTarget}, colorIndex, blendedColor );

			}`;super(I(e)),this.defineUniformAccessors(e)}}function jr(a){const e=new Uint16Array(a.length);for(let t=0,i=a.length;t<i;++t)e[t]=Ne.toHalfFloat(a[t]);return e}function $n(a,e,t=0,i=a.length){let r=t,n=t+i-1;for(;r<n;){const s=r+n>>1;a[s]<e?r=s+1:n=s}return r-t}function Ru(a,e,t){return .2126*a+.7152*e+.0722*t}function Pu(a,e=de){const t=a.clone();t.source=new Co({...t.image});const{width:i,height:r,data:n}=t.image;let s=n;if(t.type!==e){e===de?s=new Uint16Array(n.length):s=new Float32Array(n.length);let o;n instanceof Int8Array||n instanceof Int16Array||n instanceof Int32Array?o=2**(8*n.BYTES_PER_ELEMENT-1)-1:o=2**(8*n.BYTES_PER_ELEMENT)-1;for(let l=0,d=n.length;l<d;l++){let c=n[l];t.type===de&&(c=Ne.fromHalfFloat(n[l])),t.type!==Xe&&t.type!==de&&(c/=o),e===de&&(s[l]=Ne.toHalfFloat(c))}t.image.data=s,t.type=e}if(t.flipY){const o=s;s=s.slice();for(let l=0;l<r;l++)for(let d=0;d<i;d++){const c=r-l-1,u=4*(l*i+d),h=4*(c*i+d);s[h+0]=o[u+0],s[h+1]=o[u+1],s[h+2]=o[u+2],s[h+3]=o[u+3]}t.flipY=!1,t.image.data=s}return t}class Du{constructor(){const e=new Ie(jr(new Float32Array([0,0,0,0])),1,1);e.type=de,e.format=Ce,e.minFilter=ue,e.magFilter=ue,e.wrapS=Qe,e.wrapT=Qe,e.generateMipmaps=!1,e.needsUpdate=!0;const t=new Ie(jr(new Float32Array([0,1])),1,2);t.type=de,t.format=tr,t.minFilter=ue,t.magFilter=ue,t.generateMipmaps=!1,t.needsUpdate=!0;const i=new Ie(jr(new Float32Array([0,0,1,1])),2,2);i.type=de,i.format=tr,i.minFilter=ue,i.magFilter=ue,i.generateMipmaps=!1,i.needsUpdate=!0,this.map=e,this.marginalWeights=t,this.conditionalWeights=i,this.totalSum=0}getPixelWeight(e,t,i){return Ru(e,t,i)}dispose(){this.marginalWeights.dispose(),this.conditionalWeights.dispose(),this.map.dispose()}updateFrom(e){const t=Pu(e);t.wrapS=Qe,t.wrapT=ir;const{width:i,height:r,data:n}=t.image,s=new Float32Array(i*r),o=new Float32Array(i*r),l=new Float32Array(r),d=new Float32Array(r);let c=0,u=0;for(let v=0;v<r;v++){let w=0;for(let m=0;m<i;m++){const x=v*i+m,g=Ne.fromHalfFloat(n[4*x+0]),b=Ne.fromHalfFloat(n[4*x+1]),S=Ne.fromHalfFloat(n[4*x+2]),_=this.getPixelWeight(g,b,S,v,r);w+=_,c+=_,s[x]=_,o[x]=w}if(w!==0)for(let m=v*i,x=v*i+i;m<x;m++)s[m]/=w,o[m]/=w;u+=w,l[v]=w,d[v]=u}if(u!==0)for(let v=0,w=l.length;v<w;v++)l[v]/=u,d[v]/=u;const h=new Uint16Array(r),f=new Uint16Array(i*r);for(let v=0;v<r;v++){const w=(v+1)/r,m=$n(d,w);h[v]=Ne.toHalfFloat((m+.5)/r)}for(let v=0;v<r;v++)for(let w=0;w<i;w++){const m=v*i+w,x=(w+1)/i,g=$n(o,x,v*i,i);f[m]=Ne.toHalfFloat((g+.5)/i)}this.dispose();const{marginalWeights:p,conditionalWeights:y}=this;p.image={width:r,height:1,data:h},p.needsUpdate=!0,y.image={width:i,height:r,data:f},y.needsUpdate=!0,this.totalSum=c,this.map=t}}const Nn=A(`

	fn equirectLuminancePdf( luminance: f32, totalWeight: f32, resolution: vec2u ) -> f32 {

		return f32( resolution.x * resolution.y ) * luminance / ( 2.0 * PI * PI * totalWeight );

	}

`,[W]);class eo extends Du{constructor(){super(),this.mapNode=pe(this.map),this.mapSampler=Et(this.mapNode),this.marginalNode=pe(this.marginalWeights),this.marginalSampler=Et(this.marginalNode),this.conditionalNode=pe(this.conditionalWeights),this.conditionalSampler=Et(this.conditionalNode),this.rotationNode=$(new na),this.intensityNode=$(1),this.totalSumNode=$(this.totalSum),this._initFns()}getPixelWeight(e,t,i,r,n){const s=Math.PI*(r+.5)/n;return super.getPixelWeight(e,t,i)*Math.sin(s)}updateFrom(e){super.updateFrom(e);const{mapNode:t,marginalNode:i,conditionalNode:r,totalSumNode:n}=this;t.value=this.map,i.value=this.marginalWeights,r.value=this.conditionalWeights,n.value=this.totalSum}_initFns(){const{mapNode:e,mapSampler:t,marginalNode:i,marginalSampler:r,conditionalNode:n,conditionalSampler:s,totalSumNode:o,rotationNode:l,intensityNode:d}=this;this.sampleColor=R`
			fn sampleEnv( direction: vec3f ) -> vec4f {

				let sampleDir = ${l} * direction;
				let mapUv = ${ar}( sampleDir );
				let col = textureSampleLevel( ${e}, ${t}, mapUv, 0 );

				return vec4f( ${d} * col.rgb, col.a );

			}
		`,this.sampleDir=R`
			fn sampleEnvDir( r: vec2f ) -> ${Cn} {

				var result: ${Cn};

				// walk the CDF: marginal picks the row (v), conditional picks the column (u)
				let v = textureSampleLevel( ${i}, ${r}, vec2f( r.x, 0.0 ), 0 ).x;
				let u = textureSampleLevel( ${n}, ${s}, vec2f( r.y, v ), 0 ).x;
				let uv = vec2f( u, v );
				let totalSum = ${o};

				let direction = ${Gc}( uv );
				let color = textureSampleLevel( ${e}, ${t}, uv, 0 ).rgb;

				result.direction = transpose( ${l} ) * direction;
				result.color = color * ${d};

				if ( totalSum != 0.0 ) {

					let lum = ${ds}( color );
					let resolution = textureDimensions( ${e} );
					result.pdf = ${Nn}( lum, totalSum, resolution );

				} else {

					result.pdf = 0.0;

				}

				return result;

			}
		`,this.getWeight=R`
			fn getEnvWeight() -> f32 {

				let resolution = textureDimensions( ${e} );
				return ${d} * ${kt} * ${kt} * ${o} / ( 2.0 * f32( resolution.x * resolution.y ) );

			}
		`,this.getDirPdf=R`
			fn getEnvDirPdf( direction: vec3f ) -> f32 {

				if ( ${o} == 0.0 ) {

					return 0.0;

				}

				let rotatedDir = ${l} * direction;
				let mapUv = ${ar}( rotatedDir );
				let color = textureSampleLevel( ${e}, ${t}, mapUv, 0 ).rgb;
				let lum = ${ds}( color );
				let resolution = textureDimensions( ${e} );

				return ${Nn}( lum, ${o}, resolution );

			}
		`}}class to{get map(){return this.mapNode.value}set map(e){this.mapNode.value=e}get blur(){return this.blurNode.value}set blur(e){this.blurNode.value=e}get rotation(){return this.rotationNode.value}get intensity(){return this.intensityNode.value}set intensity(e){this.intensityNode.value=e}constructor(){const e=new Ie(new Uint8Array([0,0,0,255]),1,1,Ce);e.minFilter=ue,e.magFilter=ue,e.wrapS=Qe,e.wrapT=Qe,e.generateMipmaps=!1,e.needsUpdate=!0,this.mapNode=pe(e),this.mapSampler=Et(this.mapNode),this.blurNode=$(0),this.rotationNode=$(new U),this.intensityNode=$(1),this._initFns()}dispose(){this.map.dispose()}_initFns(){const{mapNode:e,mapSampler:t,blurNode:i,rotationNode:r,intensityNode:n}=this;this.sampleColor=R`
			fn sampleBackground( direction: vec3f, uv: vec2f ) -> vec4f {

				let rotatedDir = ( ${r} * vec4f( direction, 0.0 ) ).xyz;
				let offsetDir = ${qc}( rotatedDir, uv ) * 0.5 * ${i};
				let sampleDir = normalize( rotatedDir + offsetDir );

				let mapUv = ${ar}( sampleDir );
				let col = textureSampleLevel( ${e}, ${t}, mapUv, 0 );

				return vec4f( ${n} * col.rgb, col.a );

			}
		`}}const Mu=4096,En=new oa,zn=new na;function kn(a){return`${a.source.uuid}:${a.source.version}`}function Au(a,e,t,i){if(a[e].x+t>i)return-1;let n=t,s=0,o=e;for(;n>0;){if(o>=a.length)return-1;s=Math.max(s,a[o].y),n-=a[o].width,o++}return s}function Lu(a,e,t,i){const r=e+i,n=[];let s=!1;for(let o=0;o<a.length;o++){const l=a[o],d=l.x+l.width;d<=e?n.push(l):l.x>=r?(s||(n.push({x:e,y:t,width:i}),s=!0),n.push(l)):(s||(n.push({x:e,y:t,width:i}),s=!0),d>r&&n.push({x:r,y:l.y,width:d-r}))}s||n.push({x:e,y:t,width:i}),a.length=0;for(let o=0;o<n.length;o++){const l=n[o],d=a[a.length-1];d&&d.y===l.y&&d.x+d.width===l.x?d.width+=l.width:a.push(l)}}function Vn(a,e,t,i,r){let n=1/0,s=0,o=-1;for(let l=0;l<a.length;l++){const d=Au(a,l,e,i);d>=0&&d+t<=r&&d<n&&(n=d,s=a[l].x,o=l)}return o===-1?null:(Lu(a,s,n+t,e),{x:s,y:n})}class io{get width(){return this.renderTarget.width}get height(){return this.renderTarget.height}get pageCount(){return this.renderTarget.depth}get texture(){return this.renderTarget.texture}constructor(e={}){this.renderTarget=new aa(1,1,{depthBuffer:!1,depth:1,...e}),this.texture.isArrayTexture=!0,this.textureInfo=[new lt],this.hashes=[],this.placements=[],this.quadMesh=new Ro(new Po),this.quadMesh.material.blending=ys}setTextures(e,t){const i=t.map((u,h)=>h);if(i.sort((u,h)=>t[u].source.uuid<t[h].source.uuid?-1:1),t=i.map(u=>t[u]),this._hashesMatch(t)){this._buildCallerTextureInfo(i);return}let r=t.reduce((u,h)=>Math.max(u,h.width,h.height),1);r=Math.min(Mu,r);const n=r,s=r,{renderTarget:o}=this,{placements:l,pageCount:d}=this._packTextures(t,n,s);o.setSize(n,s,d),this.texture.isArrayTexture=!0,this._renderTextures(e,t,l),this.placements=l;const c=new Array(t.length);for(let u=0,h=t.length;u<h;u++){const f=kn(t[u]);c[u]=f}this.hashes=c,this._buildCallerTextureInfo(i)}_buildCallerTextureInfo(e){const t=new Array(e.length);for(let i=0,r=e.length;i<r;i++)t[e[i]]=this.placements[i];this._buildTextureInfo(t)}dispose(){this.renderTarget.dispose(),this.quadMesh.material.dispose()}_hashesMatch(e){const t=this.hashes;if(t.length!==e.length)return!1;for(let i=0,r=e.length;i<r;i++)if(t[i]!==kn(e[i]))return!1;return!0}_packTextures(e,t,i){const r=[];for(let l=0,d=e.length;l<d;l++){const c=e[l];r.push({index:l,w:Math.min(c.width,t),h:Math.min(c.height,i)})}const n=r.sort((l,d)=>d.h-l.h),s=new Array(e.length),o=[];for(let l=0,d=n.length;l<d;l++){const c=n[l];let u=null,h=-1;for(let f=0;f<o.length;f++)if(u=Vn(o[f],c.w,c.h,t,i),u){h=f;break}if(!u){const f=[{x:0,y:0,width:t}];u=Vn(f,c.w,c.h,t,i),o.push(f),h=o.length-1}s[c.index]={x:u.x,y:u.y,w:c.w,h:c.h,page:h}}return{placements:s,pageCount:Math.max(o.length,1)}}_buildTextureInfo(e){const t=this.textureInfo;t.length=0;for(let i=0,r=e.length;i<r;i++){const{x:n,y:s,w:o,h:l,page:d}=e[i],c=new lt;c.x=n&65535|(s&65535)<<16,c.y=o&65535|(l&65535)<<16,c.z=d&65535,c.w=0,t.push(c)}t.length===0&&t.push(new lt(0,0,0,0))}_renderTextures(e,t,i){const{quadMesh:r,renderTarget:n,width:s,height:o}=this,l=e.getRenderTarget(),d=e.toneMapping,c=e.autoClear,u=e.getScissorTest(),h=e.getClearAlpha();e.getClearColor(En),e.toneMapping=fi,e.autoClear=!1,e.setScissorTest(!0),e.setClearColor(0,0);for(let f=0,p=n.depth;f<p;f++)n.viewport.set(0,0,s,o),n.scissor.set(0,0,s,o),e.setRenderTarget(n,f),e.clear();for(let f=0,p=t.length;f<p;f++){const{x:y,y:v,w,h:m,page:x}=i[f],g=t[f];if(n.viewport.set(y,v,w,m),n.scissor.set(y,v,w,m),e.setRenderTarget(n,x),g.isRenderTargetTexture){const b=g.matrixAutoUpdate;zn.copy(g.matrix),g.matrix.identity(),g.matrixAutoUpdate=!1,r.material.map=g,r.render(e),g.matrixAutoUpdate=b,g.matrix.copy(zn)}else{const b=g.clone();b.matrixAutoUpdate=!1,b.matrix.identity(),r.material.map=b,r.render(e),b.dispose()}}n.viewport.set(0,0,s,o),n.scissor.set(0,0,s,o),r.material.map=null,e.setClearColor(En,h),e.setScissorTest(u),e.autoClear=c,e.setRenderTarget(l),e.toneMapping=d}}function Fu(a){let e=0;if(a.byteLength!==0){const t=new Uint8Array(a);for(let i=0;i<a.byteLength;i++){const r=t[i];e=(e<<5)-e+r,e|=0}}return e}const Qr=6,Bu=11,$u=0,Nu=1,Eu=2,zu=3,ku=4,ye=new F,le=new F,Hn=new U,At=new Do,On=new F,Pe=new F,Vu=new F(0,1,0);class Hu{constructor(){const e=new Ie(new Float32Array(4),1,1);e.format=Ce,e.type=Xe,e.wrapS=ir,e.wrapT=ir,e.generateMipmaps=!1,e.minFilter=Ve,e.magFilter=Ve,this.tex=e,this.count=0}updateFrom(e,t=[]){const i=this.tex,r=Math.max(e.length*Qr,1),n=Math.ceil(Math.sqrt(r));i.image.width!==n&&(i.dispose(),i.image.data=new Float32Array(n*n*4),i.image.width=n,i.image.height=n);const s=i.image.data;for(let l=0,d=e.length;l<d;l++){const c=e[l],u=l*Qr*4;let h=0;for(let p=0;p<Qr*4;p++)s[u+p]=0;c.getWorldPosition(le),s[u+h++]=le.x,s[u+h++]=le.y,s[u+h++]=le.z;let f=$u;if(c.isRectAreaLight&&c.isCircular?f=Nu:c.isSpotLight?f=Eu:c.isDirectionalLight||c.isSunLight?f=zu:c.isPointLight&&(f=ku),s[u+h++]=f,s[u+h++]=c.color.r,s[u+h++]=c.color.g,s[u+h++]=c.color.b,s[u+h++]=c.intensity,c.getWorldQuaternion(At),c.isRectAreaLight)ye.set(c.width,0,0).applyQuaternion(At),s[u+h++]=ye.x,s[u+h++]=ye.y,s[u+h++]=ye.z,h++,le.set(0,c.height,0).applyQuaternion(At),s[u+h++]=le.x,s[u+h++]=le.y,s[u+h++]=le.z,s[u+h++]=ye.cross(le).length()*(c.isCircular?Math.PI/4:1);else if(c.isSpotLight){const p=c.radius||0;On.setFromMatrixPosition(c.matrixWorld),Pe.setFromMatrixPosition(c.target.matrixWorld),Hn.lookAt(On,Pe,Vu),At.setFromRotationMatrix(Hn),ye.set(1,0,0).applyQuaternion(At),s[u+h++]=ye.x,s[u+h++]=ye.y,s[u+h++]=ye.z,h++,le.set(0,1,0).applyQuaternion(At),s[u+h++]=le.x,s[u+h++]=le.y,s[u+h++]=le.z,s[u+h++]=Math.PI*p*p,s[u+h++]=p,s[u+h++]=c.decay,s[u+h++]=c.distance,s[u+h++]=Math.cos(c.angle),s[u+h++]=Math.cos(c.angle*(1-c.penumbra)),s[u+h++]=c.iesMap?t.indexOf(c.iesMap):-1}else if(c.isPointLight){const p=ye.setFromMatrixPosition(c.matrixWorld);s[u+h++]=p.x,s[u+h++]=p.y,s[u+h++]=p.z,h++,h+=4,h+=1,s[u+h++]=c.decay,s[u+h++]=c.distance}else if(c.isDirectionalLight){const p=ye.setFromMatrixPosition(c.matrixWorld),y=le.setFromMatrixPosition(c.target.matrixWorld);Pe.subVectors(p,y).normalize(),s[u+h++]=Pe.x,s[u+h++]=Pe.y,s[u+h++]=Pe.z}else c.isSunLight&&(Pe.setFromMatrixPosition(c.matrixWorld).normalize(),s[u+h++]=Pe.x,s[u+h++]=Pe.y,s[u+h++]=Pe.z);s[u+Bu]=c.visibleToCameraRays?1:0}this.count=e.length;const o=Fu(s.buffer);return this.hash!==o?(this.hash=o,i.needsUpdate=!0,!0):!1}}class ro extends Hu{constructor(){super(),this.countNode=$(this.count,"uint"),this.buffer=new z(new Float32Array(2*ot.getLength()),ot.getLength()),this.bufferNode=O(this.buffer,ot).toReadOnly().setName("lights"),this.iesAtlas=new io({type:de}),this.iesProfilesNode=pe(this.iesAtlas.texture),this.iesInfoNode=rr(this.iesAtlas.textureInfo,"uvec4"),this._initFns()}updateFrom(e,t){const i=Array.from(new Set(t.map(c=>c.iesMap).filter(c=>c))),r=super.updateFrom(t,i);this.iesAtlas.setTextures(e,i),this.iesProfilesNode.value=this.iesAtlas.texture;const n=ot.getLength(),s=this.count,o=Math.max(s,2);this.buffer.array.length!==o*n&&(this.buffer.dispose(),this.buffer=new z(new Float32Array(o*n),n),this.bufferNode.value=this.buffer);const l=this.tex.image.data;this.buffer.array.set(l.subarray(0,s*n));const d=new Int32Array(this.buffer.array.buffer);for(let c=0;c<s;c++){const u=c*n;d[u+3]=Math.round(l[u+3]),d[u+11]=Math.round(l[u+11]),d[u+21]=Math.round(l[u+21])}return this.buffer.needsUpdate=!0,this.countNode.value=this.count,r}_initFns(){const{bufferNode:e,countNode:t,iesProfilesNode:i,iesInfoNode:r}=this,n=za(r,i,"sampleIesTexel");this.isLightVisibleToCamera=R`
			fn isLightVisibleToCamera( index: u32 ) -> bool {

				return ${e}[ index ].visibleToCameraRays != 0;

			}
		`,this.getLightWeight=R`
			fn getLightWeight( index: u32, position: vec3f ) -> f32 {

				let light = ${e}[ index ];
				let power = ${ds}( light.color * light.intensity );
				if ( light.lightType == ${Mn} ) {

					// the most any point on the spot's disc lights the position. Ies profiles are not
					// evaluated here
					let nearest = ${Yc}( light, position );
					var attenuation = 1.0;
					if ( light.iesProfile < 0 ) {

						attenuation = ${Fn}( light.coneCos, light.penumbraCos, nearest.x );

					}

					return power * attenuation * ${hs}( nearest.y, light.distance, light.decay );

				} else if ( light.lightType == ${Ln} ) {

					// the point light's world position is packed into the u slot
					let dist = length( light.u - position );
					return power * ${hs}( dist, light.distance, light.decay );

				} else if ( light.lightType == ${An} ) {

					return power;

				} else {

					let toLight = light.position - position;
					let distSq = dot( toLight, toLight );
					if ( distSq == 0.0 ) {

						return 0.0;

					}

					// area lights only emit from their front face, and the distance is held above the size
					// of the light so positions on or near it do not dominate
					let normal = normalize( cross( light.u, light.v ) );
					let cosTheta = dot( toLight, normal ) * inverseSqrt( distSq );
					return power * light.area * max( cosTheta, 0.0 ) / max( distSq, light.area );

				}

			}
		`,this.getLightsWeight=R`
			fn getLightsWeight( position: vec3f ) -> f32 {

				var total = 0.0;
				for ( var i = 0u; i < ${t}; i ++ ) {

					total += ${this.getLightWeight}( i, position );

				}

				return total;

			}
		`,this.selectLight=R`
			fn selectLight( position: vec3f, envWeight: f32, r: f32, selectionPdf: ptr<function, f32> ) -> u32 {

				let count = ${t};
				let totalWeight = ${this.getLightsWeight}( position ) + envWeight;
				if ( totalWeight <= 0.0 ) {

					*selectionPdf = 0.0;
					return 0u;

				}

				let targetWeight = r * totalWeight;
				var accumulated = 0.0;
				var lastWeighted = 0u;
				var index = count;
				for ( var i = 0u; i < count; i ++ ) {

					let lightWeight = ${this.getLightWeight}( i, position );
					accumulated += lightWeight;
					if ( lightWeight > 0.0 ) {

						lastWeighted = i;

					}

					if ( targetWeight < accumulated ) {

						index = i;
						break;

					}

				}

				// rounding can carry the target past the last light when there is no environment
				if ( index == count && envWeight <= 0.0 ) {

					index = lastWeighted;

				}

				var weight = envWeight;
				if ( index < count ) {

					weight = ${this.getLightWeight}( index, position );

				}

				*selectionPdf = weight / totalWeight;
				return index;

			}
		`,this.randomLightSample=R`
			fn randomLightSample( lightIndex: u32, rayOrigin: vec3f, ruv: vec2f ) -> ${ze} {

				let light = ${e}[ lightIndex ];

				var result: ${ze};
				if ( light.lightType == ${Mn} ) {

					result = ${Xc}( light, rayOrigin, ruv );

					let spotNormal = normalize( cross( light.u, light.v ) );
					let cosTheta = dot( result.direction, spotNormal );
					var spotAttenuation: f32;
					if ( light.iesProfile >= 0 ) {

						// half a texel of the profile's tile in the atlas
						let profileInfo = ${r}[ u32( light.iesProfile ) ];
						let texelInset = 0.5 / vec2f( vec2u( profileInfo.y & 0xFFFFu, profileInfo.y >> 16u ) );

						// tilt spans [ 0, 180 ]deg inset to the texel centers, twist covers [ 0, 359 ]deg and wraps
						let tiltAngle = mix( texelInset.x, 1.0 - texelInset.x, acos( cosTheta ) / PI );
						let twistAngle = ( atan2( dot( result.direction, light.v ), dot( result.direction, light.u ) ) + PI ) / ( 2.0 * PI ) + texelInset.y;
						let packedProfile = ( 1 << 26 ) | light.iesProfile;
						spotAttenuation = ${n}( vec2f( tiltAngle, twistAngle ), packedProfile, 0.0 ).r;

					} else {

						spotAttenuation = ${Fn}( light.coneCos, light.penumbraCos, cosTheta );

					}

					result.emission *= spotAttenuation;

				} else if ( light.lightType == ${Ln} ) {

					// the point light's world position is packed into the u slot
					let lightRay = light.u - rayOrigin;
					let lightDist = length( lightRay );
					let cutoffDistance = light.distance;
					var distanceFalloff = 1.0 / max( pow( lightDist, light.decay ), 0.01 );
					if ( cutoffDistance > 0.0 ) {

						let window = clamp( 1.0 - pow( lightDist / cutoffDistance, 4.0 ), 0.0, 1.0 );
						distanceFalloff *= window * window;

					}

					result.direction = normalize( lightRay );
					result.dist = lightDist;
					result.pdf = 1.0;
					result.emission = light.color * light.intensity * distanceFalloff;
					result.lightType = light.lightType;

				} else if ( light.lightType == ${An} ) {

					// the directional light's direction is packed into the u slot
					result.dist = ${mi};
					result.direction = light.u;
					result.pdf = 1.0;
					result.emission = light.color * light.intensity;
					result.lightType = light.lightType;

				} else {

					result = ${Kc}( light, rayOrigin, ruv );

				}

				return result;

			}
		`,this.intersectLightAtIndex=R`
			fn intersectLightAtIndex( rayOrigin: vec3f, rayDirection: vec3f, index: u32, lightRec: ptr<function, ${ze}> ) -> bool {

				let light = ${e}[ index ];

				var u = light.u;
				var v = light.v;
				let normal = normalize( cross( u, v ) );

				// only front-facing area lights can be hit
				if ( dot( normal, rayDirection ) > 0.0 ) {

					u *= 1.0 / dot( u, u );
					v *= 1.0 / dot( v, v );

					var dist = - 1.0;
					if ( light.lightType == ${Fs} ) {

						dist = ${jc}( light.position, normal, u, v, rayOrigin, rayDirection );

					} else if ( light.lightType == ${Bs} ) {

						dist = ${Qc}( light.position, normal, u, v, rayOrigin, rayDirection );

					}

					if ( dist > 0.0 ) {

						let cosTheta = dot( rayDirection, normal );
						lightRec.dist = dist;
						lightRec.pdf = ( dist * dist ) / ( light.area * cosTheta );
						lightRec.emission = light.color * light.intensity;
						lightRec.direction = rayDirection;
						lightRec.lightType = light.lightType;
						return true;

					}

				}

				return false;

			}
		`}dispose(){this.tex.dispose(),this.buffer.dispose(),this.iesAtlas.dispose()}}class Un extends ce{constructor(){const e={globalId:ve,outputTarget:Ee(new re(1,1)).toWriteOnly()},t=R`
			fn compute( globalId: vec3u ) -> void {

				textureStore( ${e.outputTarget}, globalId.xy, vec4( 0, 0, 0, 1 ) );

			}
		`;super(t(e)),this.defineUniformAccessors({target:e.outputTarget})}}class so{constructor(e){this.renderer=e,this.maxBounces=15,this.frameBudget=25e4,this.maxTransparentBounces=15,this.lowResMode=!1,this.maxSamples=0,this._renderTask=null,this.outputTarget=new re(1,1),this.outputTarget.format=Ce,this.outputTarget.type=Xe,this.outputTarget.colorSpace=Vs.workingColorSpace,this.outputTarget.name="Output #0",this.outputTarget.generateMipmaps=!1,this.prevOutputTarget=new re(1,1),this.prevOutputTarget.format=Ce,this.prevOutputTarget.type=Xe,this.prevOutputTarget.colorSpace=Vs.workingColorSpace,this.prevOutputTarget.name="Output #1",this.prevOutputTarget.generateMipmaps=!1,this.sampleCountTarget=new re(1,1),this.sampleCountTarget.format=Mo,this.sampleCountTarget.type=Ao,this.sampleCountTarget.name="Sample Count",this.sampleCountTarget.generateMipmaps=!1,this.sampleCountClearKernel=new Un().setWorkgroupSize(8,8,1),this.outputTargetClearKernel=new Un().setWorkgroupSize(8,8,1)}setRandom(e){}setBVHData(e){}setTextures(e){}setMaterial(e){}setFilterGlossy(e){}setClamping(e,t){}setEnvironment(e,t,i){}setLights(e){}setBackground(e,t,i,r){}rebuild(){this._renderTask=null}setSize(e,t){e=Math.ceil(e),t=Math.ceil(t);const{width:i,height:r}=this.outputTarget;return i===e&&r===t?!1:(this.outputTarget.dispose(),this.prevOutputTarget.dispose(),this.sampleCountTarget.dispose(),this.outputTarget=this.outputTarget.clone(),this.prevOutputTarget=this.outputTarget.clone(),this.sampleCountTarget=this.sampleCountTarget.clone(),this.outputTarget.setSize(e,t),this.prevOutputTarget.setSize(e,t),this.sampleCountTarget.setSize(e,t),this.reset(),!0)}getSize(e){const{width:t,height:i}=this.outputTarget;return e.x=t,e.y=i,e}update(){const{renderer:e}=this;e.initialized&&(this._renderTask||(this._renderTask=this.createRenderTask()),this._renderTask.next())}*createRenderTask(){}async getSampleCountsAsync(){return{min:0,max:0,avg:0}}resetSeed(){}reset(){const{renderer:e,outputTargetClearKernel:t,sampleCountClearKernel:i,outputTarget:r,prevOutputTarget:n,sampleCountTarget:s}=this;if(!e.initialized)return;const{width:o,height:l}=r,d=t.getDispatchSize(o,l);t.target=r,e.compute(t.kernel,d),t.target=n,e.compute(t.kernel,d),i.target=s,e.compute(i.kernel,d),this._renderTask=null}dispose(){this.outputTarget.dispose(),this.prevOutputTarget.dispose(),this.sampleCountTarget.dispose(),this.sampleCountClearKernel.dispose(),this.outputTargetClearKernel.dispose(),this._renderTask=null}}const Kr=new Y;class Ou extends so{constructor(e){super(e),this.envInfo=new eo,this._completedSamples=0,this._tileProgress=0,this.kernel=new Cu().setWorkgroupSize(8,8,1),this.kernel.envInfo=this.envInfo,this.backgroundInfo=new to,this.kernel.backgroundInfo=this.backgroundInfo,this.lightsInfo=new ro,this.kernel.lightsInfo=this.lightsInfo}resetSeed(){this.kernel.seed=0}reset(){super.reset(),this._completedSamples=0,this._tileProgress=0}async getSampleCountsAsync(){if(this.lowResMode)return{min:0,max:0,avg:0};const e=this._completedSamples,t=this._tileProgress;return{min:t===1?e+1:e,max:e+1,avg:e+t}}setBVHData(e){this.kernel.bvhData=e,this.rebuild()}rebuild(){super.rebuild(),this.kernel.needsUpdate=!0,this.reset()}setRandom(e){this.kernel.context.random=e,this.kernel.needsUpdate=!0,this.reset()}setMaterial(e){this.kernel.material=e.getData(),this.kernel.needsUpdate=!0,this.reset()}setFilterGlossy(e){this.kernel.filterGlossy=e===0?Ua:1/e,this.reset()}setClamping(e,t){this.kernel.clampDirect=e,this.kernel.clampIndirect=t,this.reset()}setEnvironment(e){this.envInfo.updateFrom(e)}setLights(e){this.lightsInfo.updateFrom(this.renderer,e),this.reset()}setMultipleImportanceSampling(e){this.kernel.misEnabled=e?1:0,this.reset()}setEnvironmentParams(e,t){const{envInfo:i}=this,r=new U().makeRotationFromEuler(t).invert();i.rotationNode.value.setFromMatrix4(r),i.intensityNode.value=e}setBackground(e){const{backgroundInfo:t}=this;t.dispose(),t.map=e}setBackgroundParams(e,t,i){const{backgroundInfo:r}=this,n=new U().makeRotationFromEuler(t).invert();r.rotationNode.value.copy(n),r.intensity=e,r.blur=i}setTransmissiveBackground(e){this.kernel.transmissiveBackground=e,this.reset()}*createRenderTask(){const{renderer:e,kernel:t,maxBounces:i,maxTransparentBounces:r,outputTarget:n,sampleCountTarget:s,lowResMode:o}=this,l=new Y;t.outputTarget=n,t.sampleCountTarget=s,t.maxBounces=i,t.maxTransparentBounces=r;let d=0;for(;;){if(t.maxSamples=this.maxSamples,this.maxSamples!==0&&d>=this.maxSamples){yield;continue}this.getSize(Kr);const c=Math.max(1,Math.ceil(Kr.x*Kr.y/this.frameBudget));l.x=Math.ceil(Math.sqrt(c)),l.y=Math.ceil(c/l.x);const u=this.lowResMode?1:l.x*l.y;let h=0;const f=t.tileSize;o?this.getSize(f):this.getSize(f).divide(l).ceil();const p=t.getDispatchSize(f.x,f.y);t.seed+=1,e.copyTextureToTexture(this.outputTarget,this.prevOutputTarget),[this.outputTarget,this.prevOutputTarget]=[this.prevOutputTarget,this.outputTarget],t.prevOutputTarget=this.prevOutputTarget,t.outputTarget=this.outputTarget;for(let y=0;y<l.x;y++)for(let v=0;v<l.y;v++)t.offset.set(y,v).multiply(f),e.compute(t.kernel,p),h=Math.min(h+1,u),this._completedSamples=d,this._tileProgress=h/u,yield;d++}}dispose(){super.dispose(),this.envInfo.dispose(),this.lightsInfo.dispose(),this.kernel.dispose()}}class Ir extends K{constructor(e,t,i=[]){super(e,t),this.dependencies=i}setup(e){for(const t of this.dependencies)t.build(e);super.setup(e)}}const dt=new K({throughputColor:"vec3f",currentBounce:"uint",resultColor:"vec4f",emission:"vec3f",scatterPdf:"float",scatterColor:"vec3f",minPdf:"float",origin:"vec3f",isFullyTransmissive:"uint",direction:"vec3f",side:"float",normal:"vec3f",objectIndex:"int",barycoord:"vec3f",pixelIndex:"uint",indices:"vec3u",seed:"uint",lightDirection:"vec3f",lightPdf:"float",lightEmission:"vec3f",lightDist:"float",lightBsdf:"vec3f",lightBsdfPdf:"float",rayIntersectionIndex:"int",shadowRayIntersectionIndex:"int",lightType:"int",dist:"float",alphaDepth:"uint",maxDist:"float",dispersionWavelength:"float"},"RayData"),gi=new K({origin:"vec3f",pixelIndex:"uint",direction:"vec3f",currentBounce:"uint",seed:"uint",alphaDepth:"uint",maxDist:"float",_alignment0:"uint"},"TraceQueuedRay"),Ut=new K({barycoord:"vec3f",objectIndex:"int",position:"vec3f",dist:"float",normal:"vec3f",side:"float",indices:"vec3u",forwardBlocked:"uint"},"TraceResult"),Cr=new Ir({length:"uint",elements:`array<${gi.name}>`},"RayQueue",[gi]);Cr.getLength=()=>4;const or=new Ir({length:{type:"uint",atomic:!0},elements:`array<${gi.name}>`},"RayQueue",[gi]);or.getLength=()=>4;const Rr=new Ir({current:{type:"uint",atomic:!0},elementCount:{type:"uint",atomic:!0},elements:"array<atomic<u32>>"},"PixelQueue");Rr.getLength=()=>2;const no=new Ir({current:"uint",elementCount:"uint",elements:"array<u32>"},"PixelQueue");no.getLength=()=>2;class Uu extends ce{constructor(){const e={rayDataStorage:O(new z(1,1),dt),pixelQueue:O(new z(1,1),no),targetDimensions:$(new Y),frameBudget:$(0,"uint"),globalId:ve},t=R`
			fn compute( targetDimensions: vec2u, frameBudget: u32, globalId: vec3u ) -> void {

				let rayDataStorage = &${e.rayDataStorage};
				let pixelQueue = &${e.pixelQueue};

				if ( globalId.x >= targetDimensions.x || globalId.y >= targetDimensions.y ) {

					return;

				}

				let rayCount = min( frameBudget, arrayLength( rayDataStorage ) );
				let pixelCount = targetDimensions.x * targetDimensions.y;
				if ( globalId.x == 0u && globalId.y == 0u ) {

					pixelQueue.current = 0u;
					pixelQueue.elementCount = select( 0u, pixelCount - rayCount, pixelCount >= rayCount );

				}

				let pixelHash = ( globalId.x << 16 ) | globalId.y;
				let pixelIndex = globalId.x + globalId.y * targetDimensions.x;
				if ( pixelIndex < rayCount ) {

					rayDataStorage[ pixelIndex ].pixelIndex = pixelHash;
					rayDataStorage[ pixelIndex ].resultColor = vec4f( 0.0 );
					rayDataStorage[ pixelIndex ].throughputColor = vec3f( 0.0 );
					rayDataStorage[ pixelIndex ].objectIndex = - 1;
					rayDataStorage[ pixelIndex ].alphaDepth = 0u;
					rayDataStorage[ pixelIndex ].rayIntersectionIndex = - 1;
					rayDataStorage[ pixelIndex ].shadowRayIntersectionIndex = - 1;

				} else {

					pixelQueue.elements[ pixelIndex - rayCount ] = pixelHash;

				}

			}
		`;super(t(e)),this.defineUniformAccessors(e)}}class Wu extends ce{constructor(){const e={envInfo:{value:null},backgroundInfo:{value:null},lightsInfo:{value:null},prevOutputTarget:Ee(new re(1,1)).toReadOnly(),outputTarget:Ee(new re(1,1)).toWriteOnly(),sampleCountTarget:Ee(new re(1,1)).toReadWrite(),misEnabled:$(1,"uint"),rayCount:$(0,"uint"),maxBounces:$(5,"uint"),clampDirect:$(0),clampIndirect:$(10),transmissiveBackground:$(Es),rayDataStorage:O(new z(1,1),dt),rayIntersectionsStorage:O(new z(1,1),Ut),shadowRayIntersectionsStorage:O(new z(1,1),Ut),globalId:ve},t=q("envInfo.value.totalSumNode",e),i=q("envInfo.value.intensityNode",e),r=q("envInfo.value.sampleColor",e),n=q("envInfo.value.sampleDir",e),s=q("envInfo.value.getDirPdf",e),o=q("envInfo.value.getWeight",e),l=q("backgroundInfo.value.sampleColor",e),d=q("lightsInfo.value.countNode",e),c=H("lightsInfo.value.randomLightSample",e),u=H("lightsInfo.value.intersectLightAtIndex",e),h=H("lightsInfo.value.getLightWeight",e),f=H("lightsInfo.value.getLightsWeight",e),p=H("lightsInfo.value.selectLight",e),y=H("lightsInfo.value.isLightVisibleToCamera",e),v=R`

			fn compute(
				// settings
				misEnabled: u32,
				rayCount: u32,
				maxBounces: u32,
				clampDirect: f32,
				clampIndirect: f32,
				transmissiveBackground: u32,

				globalId: vec3u
			) -> void {

				let rayDataStorage = &${e.rayDataStorage};
				let rayIntersectionsStorage = &${e.rayIntersectionsStorage};
				let shadowRayIntersectionsStorage = &${e.shadowRayIntersectionsStorage};

				// bound by "rayCount" rather than the pool length. See MaterialKernel
				let index = globalId.x;
				if ( index >= rayCount ) {

					return;

				}

				// skip slots that have never spawned a ray
				let input = ( *rayDataStorage )[ index ];
				if ( input.rayIntersectionIndex < 0 ) {

					return;

				}

				let indexUV = vec2u( input.pixelIndex >> 16, input.pixelIndex & 0xFFFF );
				${Ht}( indexUV, input.seed, input.currentBounce + input.alphaDepth );

				// one-sample NEE chooses between the analytic lights and the environment, matched with
				// the megakernel
				let envActive = ${t} > 0.0 && ${i} > 0.0;
				let lightsCount = ${d};
				var envWeight = 0.0;
				if ( envActive ) {

					envWeight = ${o}();

				}

				var resultColor = input.resultColor;
				var throughputColor = input.throughputColor;

				// added last, since a camera ray miss overwrites the pixel with the background
				var lightHits = vec3f( 0.0 );
				var cameraHitLight = false;

				// resolve the previous surface's NEE shadow ray (pre-scatter throughput). The index
				// is negative when no shadow ray was enqueued last frame
				if ( input.shadowRayIntersectionIndex >= 0 && input.lightPdf > 0.0 ) {

					let shadowHit = ( *shadowRayIntersectionsStorage )[ u32( input.shadowRayIntersectionIndex ) ];
					let occluded = shadowHit.objectIndex >= 0;
					if ( ! occluded ) {

						// env + area lights are also bsdf-sampled, so MIS-weight them; punctual take full weight,
						// or when a bsdf ray could never reach the light
						let isMISWeighted = ${Ha}( input.lightType ) && shadowHit.forwardBlocked == 0u;
						let misWeight = select( 1.0, ${je}( input.lightPdf, input.lightBsdfPdf ), isMISWeighted );
						let directLight = throughputColor * input.lightEmission * input.lightBsdf * misWeight / input.lightPdf;
						let contribution = ${se}( directLight, input.currentBounce, clampDirect, clampIndirect );
						resultColor += vec4f( contribution, 0.0 );

					}

				}

				// emission gathered at the previous surface (pre-scatter throughput). Found light clamps
				// at the depth of the segment that found it, as in Cycles, so one less than the current
				let emission = ${se}( throughputColor * input.emission, max( input.currentBounce, 1u ) - 1u, clampDirect, clampIndirect );
				resultColor += vec4f( emission, 0.0 );

				// reconstruct the scatter record staged by MaterialKernel
				var scatterRec: ${$t};
				scatterRec.color = input.scatterColor;
				scatterRec.pdf = input.scatterPdf;

				// the bounce limit, russian roulette, and terminating scatter checks all ran in
				// MaterialKernel, which stages a zeroed pdf and skips the bounce trace when they fire
				var isTerminated = all( throughputColor == vec3f( 0.0 ) ) || input.currentBounce >= maxBounces || ${Ls}( scatterRec );

				if ( ! isTerminated ) {

					// apply the scatter across the traced segment
					throughputColor *= scatterRec.color / scatterRec.pdf;

					let hitResult = ( *rayIntersectionsStorage )[ u32( input.rayIntersectionIndex ) ];
					let didHit = hitResult.objectIndex >= 0;
					let surfaceDist = select( ${mi}, hitResult.dist, didHit );

					// NEE's total weight at the vertex this segment left, for MIS. Camera segments have none
					let isMISWeighted = misEnabled != 0u && input.currentBounce > 0u;
					var lightTotalWeight = 0.0;
					if ( isMISWeighted ) {

						lightTotalWeight = ${f}( input.origin ) + envWeight;

					}

					// forward hits on area lights. Camera rays only see visibleToCameraRays lights, at full weight
					for ( var li = 0u; li < lightsCount; li ++ ) {

						if ( input.currentBounce == 0u && ! ${y}( li ) ) {

							continue;

						}

						var lightRec: ${ze};
						if ( ${u}( input.origin, input.direction, li, &lightRec ) && lightRec.dist < surfaceDist ) {

							var misWeight = 1.0;
							if ( isMISWeighted ) {

								let selectionPdf = ${h}( li, input.origin ) / lightTotalWeight;
								misWeight = ${je}( input.scatterPdf, lightRec.pdf * selectionPdf );

							}

							lightHits += ${se}( lightRec.emission * throughputColor * misWeight, input.currentBounce, clampDirect, clampIndirect );
							cameraHitLight = cameraHitLight || input.currentBounce == 0u;

						}

					}

					if ( didHit ) {

						// stage the hit for MaterialKernel
						rayDataStorage[ index ].barycoord = hitResult.barycoord;
						rayDataStorage[ index ].normal = hitResult.normal;
						rayDataStorage[ index ].side = hitResult.side;
						rayDataStorage[ index ].indices = hitResult.indices;
						rayDataStorage[ index ].objectIndex = hitResult.objectIndex;
						rayDataStorage[ index ].dist = hitResult.dist;

						// next event estimation: choose one light or the environment by its estimated
						// contribution. MaterialKernel evaluates the bsdf and enqueues the shadow ray.
						var lightPdf = 0.0;
						if ( misEnabled != 0u ) {

							let ruv = ${Ms}( ${Ba} );
							var selectionPdf = 0.0;
							let lightIndex = ${p}( hitResult.position, envWeight, ruv.x, &selectionPdf );
							if ( selectionPdf > 0.0 ) {

								var lightRec: ${ze};
								if ( envActive && lightIndex == lightsCount ) {

									// the environment, sampled from its CDF, as a light of kind ENVIRONMENT
									let envSample = ${n}( ruv.yz );
									lightRec.direction = envSample.direction;
									lightRec.emission = envSample.color;
									lightRec.pdf = envSample.pdf;
									lightRec.dist = ${mi};
									lightRec.lightType = ${$s};

								} else {

									lightRec = ${c}( lightIndex, hitResult.position, ruv.yz );

								}

								lightPdf = lightRec.pdf * selectionPdf;
								rayDataStorage[ index ].lightDirection = lightRec.direction;
								rayDataStorage[ index ].lightEmission = lightRec.emission;
								rayDataStorage[ index ].lightDist = lightRec.dist;
								rayDataStorage[ index ].lightType = lightRec.lightType;

							}

						}

						rayDataStorage[ index ].lightPdf = lightPdf;

					} else {

						// the segment escaped the scene: gather the environment for opaque paths, or
						// the background for camera segments and fully transmissive paths
						if ( input.currentBounce > 0u && input.isFullyTransmissive == 0u ) {

							var misWeight = 1.0;
							if ( isMISWeighted && envActive ) {

								// match the env pdf scaling used by the NEE selection so the two estimators balance
								let envPdf = ${s}( input.direction ) * envWeight / lightTotalWeight;
								misWeight = ${je}( input.scatterPdf, envPdf );

							}

							let environment = ${r}( input.direction ).rgb * throughputColor * misWeight;
							let contribution = ${se}( environment, input.currentBounce, clampDirect, clampIndirect );
							resultColor += vec4f( contribution, 0.0 );

						} else {

							// hit the background
							// support multiple transparent background blending techniques
							let rng = ${Ot}( ${La} );
							let bg = ${l}( input.direction, rng );
							if ( input.currentBounce == 0u ) {

								// sample the background directly if this is the primary ray
								let background = ${se}( bg.a * bg.rgb, input.currentBounce, clampDirect, clampIndirect );
								resultColor = vec4f( background, bg.a );

							} else {

								// transmissive ray handling
								let env = ${r}( input.direction );
								let avg = saturate( dot( throughputColor, vec3f( 1.0 / 3.0 ) ) );
								let transparency = ( 1.0 - bg.a ) * avg;

								var misWeight = 1.0;
								if ( misEnabled != 0u && envActive ) {

									let envPdf = ${s}( input.direction );
									misWeight = ${je}( input.scatterPdf, envPdf );

								}

								if ( transmissiveBackground == ${Za}u ) {

									// display the env map through transmissive surfaces
									let background = ${se}( env.rgb * throughputColor * misWeight, input.currentBounce, clampDirect, clampIndirect );
									resultColor = vec4f(
										resultColor.rgb + background,
										1.0,
									);

								} else if ( transmissiveBackground == ${Ja}u ) {

									// fade the background by the throughput color average
									let background = ${se}( bg.a * bg.rgb * throughputColor * misWeight, input.currentBounce, clampDirect, clampIndirect );
									resultColor = vec4f(
										resultColor.rgb + background,
										1.0 - transparency,
									);

								} else {

									// fade the background by the throughput color average, mixing in env lighting
									var light = mix( env.rgb, bg.rgb, bg.a ) * misWeight;
									let background = ${se}( light * throughputColor, input.currentBounce, clampDirect, clampIndirect );
									resultColor = vec4f(
										resultColor.rgb + background,
										1.0 - transparency,
									);

								}

							}

						}

						isTerminated = true;

					}

				}

				// visible lights are opaque against a transparent background
				resultColor += vec4f( lightHits, 0.0 );
				if ( cameraHitLight ) {

					resultColor.a = 1.0;

				}

				// the color rows are stored top down to match a rasterized render target
				let colorIndex = vec2u( indexUV.x, textureDimensions( ${e.outputTarget} ).y - 1u - indexUV.y );
				let storedSamples = textureLoad( ${e.sampleCountTarget}, indexUV ).r & ${Tr}u;

				if ( isTerminated ) {

					// blend the finished sample into the output and free the slot for a new camera ray
					let sampleCount = storedSamples + 1;
					let prevColor = textureLoad( ${e.prevOutputTarget}, colorIndex );
					let blendedColor = ${ka}( prevColor, resultColor, 1.0 / f32( sampleCount ) );
					textureStore( ${e.sampleCountTarget}, indexUV, vec4( ${zs}u | sampleCount ) );
					textureStore( ${e.outputTarget}, colorIndex, blendedColor );

					rayDataStorage[ index ].objectIndex = - 1;

				} else {

					// show the path so far, which the first sample overwrites
					if ( storedSamples == 0u ) {

						textureStore( ${e.outputTarget}, colorIndex, resultColor );

					}

					rayDataStorage[ index ].resultColor = resultColor;
					rayDataStorage[ index ].throughputColor = throughputColor;

				}

			}
		`;super(v(e)),this.defineUniformAccessors(e)}}class qu extends ce{constructor(){const e={bvhData:{value:null},material:{value:null},seed:$(0,"uint"),targetDimensions:$(new Y),maxSamples:$(0,"uint"),rayCount:$(0,"uint"),filterGlossy:$(1),maxTransparentBounces:$(5,"uint"),maxBounces:$(5,"uint"),sampleCountTarget:Ee(new re(1,1)).toReadWrite(),rayDataStorage:O(new z(1,1),dt),rayQueue:O(new z(1,1),or),shadowRayQueue:O(new z(1,1),or),pixelQueue:O(new z(1,1),Rr),globalId:ve},t=H("bvhData.value.fns.getCameraRay",e),i=H("bvhData.value.fns.sampleTrianglePoint",e),r=H("bvhData.value.fns.getSurfaceRecord",e),n=H("material.value.bsdfSample",e),s=H("material.value.bsdfEvalPdf",e),o=R`

			fn compute(
				seed: u32,
				targetDimensions: vec2u,
				maxSamples: u32,
				rayCount: u32,
				filterGlossy: f32,
				maxTransparentBounces: u32,
				maxBounces: u32,

				globalId: vec3u
			) -> void {

				let rayDataStorage = &${e.rayDataStorage};
				let rayQueue = &${e.rayQueue};
				let shadowRayQueue = &${e.shadowRayQueue};
				let pixelQueue = &${e.pixelQueue};

				let materials = &${q("bvhData.value.storage.materials",e)};
				let transforms = &${q("bvhData.value.storage.transforms",e)};

				// bound by "rayCount" rather than the pool length. The dispatch rounds up to the
				// workgroup size and those extra slots hold a zeroed pixel index
				let index = globalId.x;
				if ( index >= rayCount ) {

					return;

				}

				let input = ( *rayDataStorage )[ index ];
				if ( input.objectIndex < 0 ) {

					// the slot's path has terminated: recycle the pixel through the overflow queue and
					// generate a fresh camera ray
					var pixelIndex = input.pixelIndex;
					let elementCount = atomicLoad( &pixelQueue.elementCount );
					if ( elementCount > 0u ) {

						// TODO: If we've pulled off a pixel that's already finished we currently just
						// write a no-op ray, wasting a frame. It may be better to iterate over a few
						// points in the queue to see if we can find one we can use.
						let queueIndex = atomicAdd( &pixelQueue.current, 1u ) % elementCount;
						pixelIndex = atomicExchange( &pixelQueue.elements[ queueIndex ], pixelIndex );

					}

					let indexUV = vec2u( pixelIndex >> 16, pixelIndex & 0xFFFF );

					// skip the pixel if it has hit the sample limit
					let combinedField = textureLoad( ${e.sampleCountTarget}, indexUV ).r;
					let samples = ( ${Tr}u & combinedField );
					let isComplete = maxSamples != 0u && samples >= maxSamples;

					if ( isComplete ) {

						rayDataStorage[ index ].pixelIndex = pixelIndex;
						rayDataStorage[ index ].rayIntersectionIndex = - 1;
						rayDataStorage[ index ].shadowRayIntersectionIndex = - 1;
						return;

					}

					${Ht}( indexUV, seed + samples, 0 );

					let uv = vec2f( indexUV ) / vec2f( targetDimensions );
					let jitteredUv = uv + ${Ot}( ${Aa} ) / vec2f( targetDimensions );
					var ray: ${V};
					if ( ! ${t}( jitteredUv, vec2f( targetDimensions ), &ray ) ) {

						// the camera declined the pixel, so leave the slot dormant for this round
						// TODO: same as above - this work is a bit wasteful and leaves slots empty for
						// a frame. Is it possible to quickly skip rays outside the mask or are finished?
						rayDataStorage[ index ].pixelIndex = pixelIndex;
						rayDataStorage[ index ].rayIntersectionIndex = - 1;
						rayDataStorage[ index ].shadowRayIntersectionIndex = - 1;
						return;

					}

					ray.direction = normalize( ray.direction );

					let rayIndex = atomicAdd( &rayQueue.length, 1u );
					rayQueue.elements[ rayIndex ].origin = ray.origin;
					rayQueue.elements[ rayIndex ].direction = ray.direction;
					rayQueue.elements[ rayIndex ].pixelIndex = pixelIndex;
					rayQueue.elements[ rayIndex ].currentBounce = 0u;
					rayQueue.elements[ rayIndex ].seed = seed + samples;
					rayQueue.elements[ rayIndex ].alphaDepth = 0u;
					rayQueue.elements[ rayIndex ].maxDist = ray.maxDist;

					rayDataStorage[ index ].origin = ray.origin;
					rayDataStorage[ index ].direction = ray.direction;
					rayDataStorage[ index ].pixelIndex = pixelIndex;
					rayDataStorage[ index ].seed = seed + samples;
					rayDataStorage[ index ].currentBounce = 0u;
					rayDataStorage[ index ].throughputColor = vec3f( 1.0 );
					rayDataStorage[ index ].resultColor = vec4f( 0.0, 0.0, 0.0, 1.0 );
					rayDataStorage[ index ].scatterColor = vec3f( 1.0 );
					rayDataStorage[ index ].scatterPdf = 1.0;
					rayDataStorage[ index ].minPdf = 1.0;
					rayDataStorage[ index ].isFullyTransmissive = 1u;
					rayDataStorage[ index ].emission = vec3f( 0.0 );
					rayDataStorage[ index ].lightPdf = 0.0;
					rayDataStorage[ index ].alphaDepth = 0u;
					rayDataStorage[ index ].maxDist = ray.maxDist;
					rayDataStorage[ index ].rayIntersectionIndex = i32( rayIndex );
					rayDataStorage[ index ].shadowRayIntersectionIndex = - 1;
					rayDataStorage[ index ].dispersionWavelength = - mix( ${wr}.0, ${_r}.0, ${ct}( ${Na} ) );

					// write the active params & dispatched flag
					textureStore( ${e.sampleCountTarget}, indexUV, vec4( ${Iu}u | ${zs}u | samples ) );

				} else {

					// evaluate the surface staged by LogicKernel
					let indexUV = vec2u( input.pixelIndex >> 16, input.pixelIndex & 0xFFFF );
					${Ht}( indexUV, input.seed, input.currentBounce + input.alphaDepth );

					let objectInfo = transforms[ u32( input.objectIndex ) ];
					var materialInfo = ( *materials )[ objectInfo.materialIndex ];

					// a matte surface hit by the camera ray renders as a fully transparent
					let isMatte = materialInfo.matte != 0 && input.currentBounce == 0u;
					if ( isMatte ) {

						rayDataStorage[ index ].resultColor = vec4f( 0.0 );
						rayDataStorage[ index ].throughputColor = vec3f( 0.0 );
						rayDataStorage[ index ].emission = vec3f( 0.0 );
						rayDataStorage[ index ].lightPdf = 0.0;
						rayDataStorage[ index ].shadowRayIntersectionIndex = - 1;
						return;

					}

					// apply per-object colors
					materialInfo.color *= objectInfo.color.rgb;
					materialInfo.opacity *= objectInfo.color.a;

					var vertexData = ${i}( input.barycoord, input.indices );
					vertexData.normal = normalize( transpose( objectInfo.inverseMatrixWorld ) * vertexData.normal );
					vertexData.tangent = vec4f( ( objectInfo.matrixWorld * vec4f( vertexData.tangent.xyz, 0.0 ) ).xyz, vertexData.tangent.w );
					vertexData.position = objectInfo.matrixWorld * vertexData.position;

					let view = - input.direction;

					// blur glossy surfaces after low-probability bounces to suppress fireflies,
					// from the Cycles "filter glossy" approach in integrator/surface_shader.h
					let blurRoughness = sqrt( clamp( 1.0 - filterGlossy * input.minPdf, 0.0, 1.0 ) ) * 0.5;

					var surface = ${r}( materialInfo, vertexData, input.side, input.normal, view, blurRoughness );

					// Stochastically pass through partially transparent surfaces by re-enqueueing
					// the ray at the hit point, advancing the alpha depth but not the bounce count.
					let passesThrough = ${ct}( ${Ea} ) > surface.opacity;
					if ( passesThrough ) {

						// out of transparent bounces, so stop rather than shading a surface that
						// should be invisible. A zeroed throughput terminates in LogicKernel.
						if ( input.alphaDepth >= maxTransparentBounces ) {

							rayDataStorage[ index ].throughputColor = vec3f( 0.0 );
							rayDataStorage[ index ].emission = vec3f( 0.0 );
							rayDataStorage[ index ].lightPdf = 0.0;
							rayDataStorage[ index ].shadowRayIntersectionIndex = - 1;
							return;

						}

						let alphaIndex = atomicAdd( &rayQueue.length, 1u );
						rayQueue.elements[ alphaIndex ].origin = ${zt}( vertexData.position.xyz, input.direction, input.normal );
						rayQueue.elements[ alphaIndex ].direction = input.direction;
						rayQueue.elements[ alphaIndex ].pixelIndex = input.pixelIndex;
						rayQueue.elements[ alphaIndex ].currentBounce = input.currentBounce;
						rayQueue.elements[ alphaIndex ].seed = input.seed;
						rayQueue.elements[ alphaIndex ].alphaDepth = input.alphaDepth + 1u;
						// the origin advanced to the hit point, so the remaining budget shrinks by the
						// distance already traced
						rayQueue.elements[ alphaIndex ].maxDist = max( input.maxDist - input.dist, 0.0 );

						// the surface is skipped, so no scatter or emission is staged for LogicKernel.
						// "pdf" is left alone so the previous scatter still weights the forward MIS,
						// and "bsdf" matches it so applying the scatter leaves the throughput as is.
						rayDataStorage[ index ].alphaDepth = input.alphaDepth + 1u;
						rayDataStorage[ index ].emission = vec3f( 0.0 );
						rayDataStorage[ index ].scatterColor = vec3f( input.scatterPdf );
						rayDataStorage[ index ].lightPdf = 0.0;
						rayDataStorage[ index ].origin = rayQueue.elements[ alphaIndex ].origin;
						rayDataStorage[ index ].rayIntersectionIndex = i32( alphaIndex );
						rayDataStorage[ index ].shadowRayIntersectionIndex = - 1;
						return;

					}

					// apply the hero wavelength to dispersive surfaces, folding the spectral weight
					// into the throughput at the path's first dispersive interaction
					var throughputColor = input.throughputColor;
					let isDispersive = materialInfo.dispersion > 0.0 && surface.ior > 1.0 && surface.transmission > 0.0 && ! surface.thinWall;
					if ( isDispersive ) {

						let wavelength = abs( input.dispersionWavelength );
						${ja}( &surface, materialInfo.dispersion, wavelength );
						if ( input.dispersionWavelength < 0.0 ) {

							rayDataStorage[ index ].dispersionWavelength = wavelength;
							throughputColor *= ${Qa}( wavelength );
							rayDataStorage[ index ].throughputColor = throughputColor;

						}

					}

					// attenuate the light transmitted through the volume when exiting a backface so
					// the surface's emission and NEE resolve against the attenuated throughput
					if ( input.side < 0.0 && materialInfo.transmission > 0.0 ) {

						throughputColor *= ${Ga}( input.dist, materialInfo.attenuationColor, materialInfo.attenuationDistance );
						rayDataStorage[ index ].throughputColor = throughputColor;

					}

					// sample the next bounce direction and stage the scatter state for LogicKernel
					var scatterRec = ${n}( view, surface );
					let newBounce = input.currentBounce + 1u;

					// decide termination now so finished paths skip the bounce trace entirely - a
					// zeroed pdf reads as a terminating scatter in LogicKernel, which still resolves
					// the surface's emission and NEE before freeing the slot
					var isTerminated = newBounce >= maxBounces || all( scatterRec.color == vec3f( 0.0 ) ) || ${Ls}( scatterRec );

					// russian roulette early out:
					// Matches Cycles path_state_continuation_probability in integrator/path_state.h
					if ( ! isTerminated && newBounce >= 3u ) {

						let rrThroughput = throughputColor * scatterRec.color / scatterRec.pdf;
						let rrProb = saturate( sqrt( max( max( rrThroughput.r, rrThroughput.g ), rrThroughput.b ) ) );
						isTerminated = rrProb <= 0.0 || ${ct}( ${$a} ) > rrProb;
						if ( ! isTerminated ) {

							// fold the survival boost into the scatter color so LogicKernel's
							// throughput update applies it without a separate division
							scatterRec.color /= rrProb;

						}

					}

					// Write the ray storage content here since things like the emissive value is read
					// in the logic kernel on the subsequent frame.
					rayDataStorage[ index ].scatterColor = scatterRec.color;
					rayDataStorage[ index ].scatterPdf = select( scatterRec.pdf, 0.0, isTerminated );
					rayDataStorage[ index ].minPdf = min( input.minPdf, scatterRec.pdf );
					rayDataStorage[ index ].isFullyTransmissive = input.isFullyTransmissive & select( 0u, 1u, scatterRec.isTransmissive );
					rayDataStorage[ index ].emission = surface.emission;
					rayDataStorage[ index ].currentBounce = newBounce;

					// the NEE shadow ray below still resolves the surface's direct light, so only
					// the bounce segment is skipped for finished paths
					if ( ! isTerminated ) {

						let rayIndex = atomicAdd( &rayQueue.length, 1u );
						rayQueue.elements[ rayIndex ].origin = ${zt}( vertexData.position.xyz, scatterRec.direction, input.normal );
						rayQueue.elements[ rayIndex ].direction = scatterRec.direction;
						rayQueue.elements[ rayIndex ].pixelIndex = input.pixelIndex;
						rayQueue.elements[ rayIndex ].currentBounce = newBounce;
						rayQueue.elements[ rayIndex ].seed = input.seed;
						rayQueue.elements[ rayIndex ].alphaDepth = input.alphaDepth;
						rayQueue.elements[ rayIndex ].maxDist = 0.0;
						rayDataStorage[ index ].rayIntersectionIndex = i32( rayIndex );

						rayDataStorage[ index ].origin = rayQueue.elements[ rayIndex ].origin;
						rayDataStorage[ index ].direction = scatterRec.direction;

					}

					// evaluate the bsdf toward the light LogicKernel selected and enqueue the shadow ray.
					// the light pdf will be 0 if NEE is disabled.
					var lightPdf = input.lightPdf;
					if ( lightPdf > 0.0 ) {

						let evalRec = ${s}( view, input.lightDirection, surface );
						if ( evalRec.pdf > 0.0 ) {

							rayDataStorage[ index ].lightBsdf = evalRec.color;
							rayDataStorage[ index ].lightBsdfPdf = evalRec.pdf;

							let shadowIndex = atomicAdd( &shadowRayQueue.length, 1u );
							shadowRayQueue.elements[ shadowIndex ].origin = ${zt}( vertexData.position.xyz, input.lightDirection, input.normal );
							shadowRayQueue.elements[ shadowIndex ].direction = input.lightDirection;
							shadowRayQueue.elements[ shadowIndex ].pixelIndex = input.pixelIndex;
							shadowRayQueue.elements[ shadowIndex ].currentBounce = input.currentBounce;
							shadowRayQueue.elements[ shadowIndex ].seed = input.seed;
							shadowRayQueue.elements[ shadowIndex ].alphaDepth = input.alphaDepth;
							shadowRayQueue.elements[ shadowIndex ].maxDist = input.lightDist * ( 1.0 - ${Va} );
							rayDataStorage[ index ].shadowRayIntersectionIndex = i32( shadowIndex );

						} else {

							lightPdf = 0.0;

						}

					}

					if ( lightPdf <= 0.0 ) {

						rayDataStorage[ index ].lightPdf = 0.0;
						rayDataStorage[ index ].shadowRayIntersectionIndex = - 1;

					}

				}

			}
		`;super(o(e)),this.defineUniformAccessors(e)}}class Gu extends ce{constructor(){const e={bvhData:{value:null},rayQueue:O(new z(1,1),Cr),rayIntersectionsStorage:O(new z(1,1),Ut),globalId:ve},t=q("bvhData.value.fns.raycastFirstHit.outputType",e),i=q("bvhData.value.fns.raycastFirstHit",e),r=R`

			fn compute( globalId: vec3u ) -> void {

				let rayQueue = &${e.rayQueue};
				let rayIntersectionsStorage = &${e.rayIntersectionsStorage};

				let index = globalId.x;
				if ( index >= rayQueue.length ) {

					return;

				}

				let queuedRay = ( *rayQueue ).elements[ index ];
				let indexUV = vec2u( queuedRay.pixelIndex >> 16, queuedRay.pixelIndex & 0xFFFF );
				${Ht}( indexUV, queuedRay.seed, queuedRay.currentBounce + queuedRay.alphaDepth );

				let ray = Ray( queuedRay.origin, queuedRay.direction, queuedRay.maxDist );
				var hitResult: ${t};
				if ( ${i}( ray, &hitResult ) ) {

					rayIntersectionsStorage[ index ].barycoord = hitResult.barycoord;
					rayIntersectionsStorage[ index ].objectIndex = i32( hitResult.objectIndex );
					rayIntersectionsStorage[ index ].position = ray.origin + ray.direction * hitResult.dist;
					rayIntersectionsStorage[ index ].dist = hitResult.dist;
					rayIntersectionsStorage[ index ].normal = hitResult.normal.xyz;
					rayIntersectionsStorage[ index ].side = hitResult.side;
					rayIntersectionsStorage[ index ].indices = hitResult.indices.xyz;

				} else {

					rayIntersectionsStorage[ index ].objectIndex = - 1;

				}

			}
		`;super(r(e)),this.defineUniformAccessors(e)}}class ju extends ce{constructor(){const e={bvhData:{value:null},shadowRayQueue:O(new z(1,1),Cr),shadowRayIntersectionsStorage:O(new z(1,1),Ut),globalId:ve},t=q("bvhData.value.fns.raycastFirstHit.outputType",e),i=q("bvhData.value.fns.raycastShadow",e),r=R`

			fn compute( globalId: vec3u ) -> void {

				let shadowRayQueue = &${e.shadowRayQueue};
				let shadowRayIntersectionsStorage = &${e.shadowRayIntersectionsStorage};

				let index = globalId.x;
				if ( index >= shadowRayQueue.length ) {

					return;

				}

				let queuedRay = ( *shadowRayQueue ).elements[ index ];
				let indexUV = vec2u( queuedRay.pixelIndex >> 16, queuedRay.pixelIndex & 0xFFFF );
				${Ht}( indexUV, queuedRay.seed, queuedRay.currentBounce + queuedRay.alphaDepth );

				let ray = Ray( queuedRay.origin, queuedRay.direction, queuedRay.maxDist );
				var hitResult: ${t};
				if ( ${i}( ray, &hitResult ) ) {

					shadowRayIntersectionsStorage[ index ].objectIndex = i32( hitResult.objectIndex );
					shadowRayIntersectionsStorage[ index ].dist = hitResult.dist;

				} else {

					shadowRayIntersectionsStorage[ index ].objectIndex = - 1;

				}

				shadowRayIntersectionsStorage[ index ].forwardBlocked = u32( hitResult.forwardBlocked );

			}
		`;super(r(e)),this.defineUniformAccessors(e)}}class Wn extends ce{constructor(e=or,t=64){const i={queue:O(new z(1,1),e),outputDispatch:O(new la(3,1),"u32").setName("outputDispatch")},r=R`
			fn compute() -> void {

				let queue = &${i.queue};
				let outputDispatch = &${i.outputDispatch};

				let queueLength = atomicLoad( &queue.length );
				outputDispatch[ 0 ] = ( queueLength + ${t-1}u ) / ${t}u;
				outputDispatch[ 1 ] = 1u;
				outputDispatch[ 2 ] = 1u;

			}
		`;super(r(i)),this.defineUniformAccessors(i)}}class Qu extends ce{constructor(){const e={rayDataStorage:O(new z(1,1),dt),pixelQueue:O(new z(1,1),Rr),start:$(0,"uint"),end:$(0,"uint"),addingSlots:$(0,"uint"),globalId:ve},t=R`
			fn compute( start: u32, end: u32, addingSlots: u32, globalId: vec3u ) -> void {

				let rayDataStorage = &${e.rayDataStorage};
				let pixelQueue = &${e.pixelQueue};

				let index = start + globalId.x;
				if ( index >= end ) {

					return;

				}

				if ( addingSlots == 0u ) {

					// slots being removed hand their pixel back before the pool is discarded
					let queueIndex = atomicAdd( &pixelQueue.elementCount, 1u );
					atomicStore( &pixelQueue.elements[ queueIndex ], rayDataStorage[ index ].pixelIndex );

				} else {

					// the pool never exceeds the pixel count, so the queue holds enough for every new slot
					let previousCount = atomicSub( &pixelQueue.elementCount, 1u );
					rayDataStorage[ index ].pixelIndex = atomicLoad( &pixelQueue.elements[ previousCount - 1u ] );
					rayDataStorage[ index ].resultColor = vec4f( 0.0 );
					rayDataStorage[ index ].throughputColor = vec3f( 0.0 );
					rayDataStorage[ index ].objectIndex = - 1;
					rayDataStorage[ index ].alphaDepth = 0u;
					rayDataStorage[ index ].rayIntersectionIndex = - 1;
					rayDataStorage[ index ].shadowRayIntersectionIndex = - 1;

				}

			}
		`;super(t(e)),this.defineUniformAccessors(e)}}class Ku extends ce{constructor(e={}){const{type:t="u32"}=e,i={globalId:ve,outputTarget:O(new la(1,1),t)},r=R`
			fn compute( globalId: vec3u ) -> void {

				${i.outputTarget}[ globalId.x ] = 0;

			}
		`;super(r(i)),this.defineUniformAccessors({target:i.outputTarget})}}class Xu extends ce{constructor(e){const t={source:O(new z(1,1),e).toReadOnly(),target:O(new z(1,1),e),count:$(0,"uint"),globalId:ve},i=R`
			fn compute( count: u32, globalId: vec3u ) -> void {

				let index = globalId.x;
				if ( index >= count ) {

					return;

				}

				${t.target}[ index ] = ${t.source}[ index ];

			}
		`;super(i(t)),this.defineUniformAccessors(t)}}const Yu=0,Zu=1,Ju=2,ed=3,td=4,qn=5,id=4294967296,ao=new K({minSamples:{type:"uint",atomic:!0},maxSamples:{type:"uint",atomic:!0},totalLo:{type:"uint",atomic:!0},totalHi:{type:"uint",atomic:!0},pixelCount:{type:"uint",atomic:!0}},"SampleCounters");class rd extends ce{constructor(){const e={counters:O(new z(1,1),ao)},t=R`
			fn compute() -> void {

				atomicStore( &${e.counters}.minSamples, 0xFFFFFFFFu );
				atomicStore( &${e.counters}.maxSamples, 0u );
				atomicStore( &${e.counters}.totalLo, 0u );
				atomicStore( &${e.counters}.totalHi, 0u );
				atomicStore( &${e.counters}.pixelCount, 0u );

			}
		`;super(t(e)),this.defineUniformAccessors(e)}}class sd extends ce{constructor(){const e={globalId:ve,counters:O(new z(1,1),ao),sampleCountTarget:Ee(new re(1,1)).toReadOnly()},t=R`
			fn compute( globalId: vec3u ) -> void {

				let targetDimensions = textureDimensions( ${e.sampleCountTarget} );
				if ( globalId.x >= targetDimensions.x || globalId.y >= targetDimensions.y ) {

					return;

				}

				// pixels without a camera ray aren't part of the image, so skip rather than count zero
				let combinedField = textureLoad( ${e.sampleCountTarget}, globalId.xy ).r;
				if ( ( combinedField & ${zs}u ) == 0u ) {

					return;

				}

				let samples = combinedField & ${Tr}u;

				atomicMin( &${e.counters}.minSamples, samples );
				atomicMax( &${e.counters}.maxSamples, samples );
				atomicAdd( &${e.counters}.pixelCount, 1u );

				// the sum overflowed if it came out smaller than the value already there, so carry
				// the wrap into "totalHi"
				let previousTotal = atomicAdd( &${e.counters}.totalLo, samples );
				if ( previousTotal + samples < previousTotal ) {

					atomicAdd( &${e.counters}.totalHi, 1u );

				}

			}
		`;super(t(e)),this.defineUniformAccessors(e)}}const nd=134217728,ad=Math.floor(nd/(dt.getLength()*4)),od=5;class Gn extends so{constructor(e){super(e),this.seed=0,this.envInfo=new eo,this.backgroundInfo=new to,this.lightsInfo=new ro,this.rayCount=0,this.rayDataStorage=null,this.rayQueue=null,this.shadowRayQueue=null,this.rayIntersectionsStorage=null,this.shadowRayIntersectionsStorage=null,this.pixelQueue=null,this.sampleCountersStorage=new z(new Uint32Array(qn),qn),this.sampleCountersStorage.name="Sample Counters",this._samplesPromise=null,this.populatePixelIndicesKernel=new Uu().setWorkgroupSize(8,8,1),this.logicKernel=new Wu().setWorkgroupSize(64,1,1),this.materialKernel=new qu().setWorkgroupSize(64,1,1),this.traceRayKernel=new Gu().setWorkgroupSize(64,1,1),this.traceShadowRayKernel=new ju().setWorkgroupSize(64,1,1),this.rayDispatchConverter=new Wn().setWorkgroupSize(1,1,1),this.shadowDispatchConverter=new Wn().setWorkgroupSize(1,1,1),this.primeSampleCountersKernel=new rd().setWorkgroupSize(1,1,1),this.tallySampleCountsKernel=new sd().setWorkgroupSize(8,8,1),this.resetSlotsKernel=new Qu().setWorkgroupSize(64,1,1),this.copyRayDataKernel=new Xu(dt).setWorkgroupSize(64,1,1),this.logicKernel.envInfo=this.envInfo,this.logicKernel.backgroundInfo=this.backgroundInfo,this.logicKernel.lightsInfo=this.lightsInfo,this.zeroDispatchKernel=new Ku().setWorkgroupSize(1,1,1),this.volumeKernel=null}resetSeed(){this.seed=0}reset(){super.reset(),this._samplesPromise=null}setBVHData(e){this.materialKernel.bvhData=e,this.materialKernel.needsUpdate=!0,this.traceRayKernel.bvhData=e,this.traceRayKernel.needsUpdate=!0,this.traceShadowRayKernel.bvhData=e,this.traceShadowRayKernel.needsUpdate=!0,this.reset()}rebuild(){super.rebuild(),this.materialKernel.needsUpdate=!0,this.reset()}setRandom(e){this.logicKernel.context.random=e,this.logicKernel.needsUpdate=!0,this.materialKernel.context.random=e,this.materialKernel.needsUpdate=!0,this.traceRayKernel.context.random=e,this.traceRayKernel.needsUpdate=!0,this.traceShadowRayKernel.context.random=e,this.traceShadowRayKernel.needsUpdate=!0,this.reset()}setMaterial(e){this.materialKernel.material=e.getData(),this.materialKernel.needsUpdate=!0,this.reset()}setFilterGlossy(e){this.materialKernel.filterGlossy=e===0?Ua:1/e,this.reset()}setClamping(e,t){this.logicKernel.clampDirect=e,this.logicKernel.clampIndirect=t,this.reset()}setTransmissiveBackground(e){this.logicKernel.transmissiveBackground=e,this.reset()}setEnvironment(e){this.envInfo.updateFrom(e)}setLights(e){this.lightsInfo.updateFrom(this.renderer,e),this.reset()}setEnvironmentParams(e,t){const{envInfo:i}=this,r=new U().makeRotationFromEuler(t).invert();i.rotationNode.value.setFromMatrix4(r),i.intensityNode.value=e}setMultipleImportanceSampling(e){this.logicKernel.misEnabled=e?1:0,this.reset()}setBackground(e){const{backgroundInfo:t}=this;t.dispose(),t.map=e}setBackgroundParams(e,t,i){const{backgroundInfo:r}=this,n=new U().makeRotationFromEuler(t).invert();r.rotationNode.value.copy(n),r.intensity=e,r.blur=i}dispose(){super.dispose(),this.envInfo.dispose(),this.lightsInfo.dispose(),this.rayDataStorage?.dispose(),this.rayQueue?.dispose(),this.shadowRayQueue?.dispose(),this.rayIntersectionsStorage?.dispose(),this.shadowRayIntersectionsStorage?.dispose(),this.sampleCountersStorage.dispose(),this.pixelQueue?.dispose(),this.rayDispatchConverter.outputDispatch.dispose(),this.shadowDispatchConverter.outputDispatch.dispose(),this.populatePixelIndicesKernel.dispose(),this.logicKernel.dispose(),this.materialKernel.dispose(),this.traceRayKernel.dispose(),this.traceShadowRayKernel.dispose(),this.rayDispatchConverter.dispose(),this.shadowDispatchConverter.dispose(),this.primeSampleCountersKernel.dispose(),this.tallySampleCountsKernel.dispose(),this.resetSlotsKernel.dispose(),this.copyRayDataKernel.dispose(),this.zeroDispatchKernel.dispose()}_updatePixelQueue(e,t){const i=Rr.getLength()+Math.max(e*t,1);(!this.pixelQueue||this.pixelQueue.array.length<i)&&(this.pixelQueue?.dispose(),this.pixelQueue=new z(new Float32Array(i),i),this.pixelQueue.name="Pixel Queue",this.materialKernel.pixelQueue=this.pixelQueue,this.materialKernel.needsUpdate=!0,this.populatePixelIndicesKernel.pixelQueue=this.pixelQueue,this.populatePixelIndicesKernel.needsUpdate=!0,this.resetSlotsKernel.pixelQueue=this.pixelQueue,this.resetSlotsKernel.needsUpdate=!0)}_resizePool(e){const{renderer:t,resetSlotsKernel:i,copyRayDataKernel:r}=this,n=this.rayCount;i.pixelQueue=this.pixelQueue,e<n&&(i.rayDataStorage=this.rayDataStorage,i.start=e,i.end=n,i.addingSlots=!1,t.compute(i.kernel,i.getDispatchSize(n-e,1,1)));const s=new z(e,dt.getLength());s.name="Ray Data";const o=Cr.getLength()+e*gi.getLength(),l=new z(new Float32Array(o),o);l.name="Ray Queue";const d=new z(new Float32Array(o),o);d.name="Shadow Ray Queue";const c=new z(e,Ut.getLength());c.name="Ray Intersections";const u=new z(e,Ut.getLength());u.name="Shadow Ray Intersections";const h=Math.min(e,n);h>0&&(r.source=this.rayDataStorage,r.target=s,r.count=h,t.compute(r.kernel,r.getDispatchSize(h,1,1))),this.rayDataStorage?.dispose(),this.rayQueue?.dispose(),this.shadowRayQueue?.dispose(),this.rayIntersectionsStorage?.dispose(),this.shadowRayIntersectionsStorage?.dispose(),this.rayDataStorage=s,this.rayQueue=l,this.shadowRayQueue=d,this.rayIntersectionsStorage=c,this.shadowRayIntersectionsStorage=u,this.rayCount=e,this.logicKernel.needsUpdate=!0,this.materialKernel.needsUpdate=!0,this.traceRayKernel.needsUpdate=!0,this.traceShadowRayKernel.needsUpdate=!0,this.populatePixelIndicesKernel.needsUpdate=!0,this.resetSlotsKernel.needsUpdate=!0,e>n&&(i.rayDataStorage=s,i.start=n,i.end=e,i.addingSlots=!0,t.compute(i.kernel,i.getDispatchSize(e-n,1,1)))}_getRequestedSlotCount(e){return Math.min(ad,e,Math.max(1,Math.floor(this.frameBudget)))}_applyBudget(e){const t=this._getRequestedSlotCount(e);t!==this.rayCount&&this._resizePool(t)}*createRenderTask(){const{renderer:e,maxTransparentBounces:t,logicKernel:i,materialKernel:r,traceRayKernel:n,traceShadowRayKernel:s,rayDispatchConverter:o,shadowDispatchConverter:l,zeroDispatchKernel:d,populatePixelIndicesKernel:c}=this,u=new Y;this.getSize(u),this._updatePixelQueue(u.x,u.y);const h=u.x*u.y;for(this._applyBudget(h),d.target=this.rayQueue,e.compute(d.kernel,[1]),d.target=this.shadowRayQueue,e.compute(d.kernel,[1]),c.rayDataStorage=this.rayDataStorage,c.pixelQueue=this.pixelQueue,c.frameBudget=this.rayCount,c.targetDimensions.copy(u),e.compute(c.kernel,c.getDispatchSize(u.x,u.y,1)),this.seed++;;){const f=this.lowResMode?Math.min(this.maxBounces,od):1;for(let p=0;p<f;p++){e.copyTextureToTexture(this.outputTarget,this.prevOutputTarget),[this.outputTarget,this.prevOutputTarget]=[this.prevOutputTarget,this.outputTarget],i.prevOutputTarget=this.prevOutputTarget,i.outputTarget=this.outputTarget,i.sampleCountTarget=this.sampleCountTarget,i.rayDataStorage=this.rayDataStorage,i.rayIntersectionsStorage=this.rayIntersectionsStorage,i.shadowRayIntersectionsStorage=this.shadowRayIntersectionsStorage,i.maxBounces=this.maxBounces,i.rayCount=this.rayCount,e.compute(i.kernel,i.getDispatchSize(this.rayCount,1,1)),this._applyBudget(h);const{rayDataStorage:y,rayQueue:v,shadowRayQueue:w,rayIntersectionsStorage:m,shadowRayIntersectionsStorage:x,rayCount:g}=this;d.target=v,e.compute(d.kernel,[1]),d.target=w,e.compute(d.kernel,[1]),r.rayDataStorage=y,r.rayQueue=v,r.shadowRayQueue=w,r.pixelQueue=this.pixelQueue,r.sampleCountTarget=this.sampleCountTarget,r.seed=this.seed,r.maxSamples=this.maxSamples,r.rayCount=g,r.maxTransparentBounces=t,r.maxBounces=this.maxBounces,r.targetDimensions.copy(u),e.compute(r.kernel,r.getDispatchSize(g,1,1)),o.queue=v,e.compute(o.kernel,[1,1,1]),n.rayQueue=v,n.rayIntersectionsStorage=m,e.compute(n.kernel,o.outputDispatch),l.queue=w,e.compute(l.kernel,[1,1,1]),s.shadowRayQueue=w,s.shadowRayIntersectionsStorage=x,e.compute(s.kernel,l.outputDispatch)}yield}}getSampleCountsAsync(){if(this._samplesPromise===null){const e=this._measureSampleCounts().finally(()=>{this._samplesPromise===e&&(this._samplesPromise=null)});this._samplesPromise=e}return this._samplesPromise}async _measureSampleCounts(){const{renderer:e,sampleCountTarget:t,sampleCountersStorage:i,primeSampleCountersKernel:r,tallySampleCountsKernel:n}=this;if(!e.initialized||this.lowResMode)return{min:0,max:0,avg:0};r.counters=i,e.compute(r.kernel,[1,1,1]),n.counters=i,n.sampleCountTarget=t,e.compute(n.kernel,n.getDispatchSize(t.width,t.height));const s=await e.getArrayBufferAsync(i),o=new Uint32Array(s),l=o[td];if(l===0)return{min:0,max:0,avg:0};const d=o[ed]*id+o[Ju];return{min:o[Yu],max:o[Zu],avg:d/l}}}const ld=`

	// TODO: possibly this should be renamed something related to material or path tracing logic

	#ifndef RAY_OFFSET
	#define RAY_OFFSET 1e-4
	#endif

	// adjust the hit point by the surface normal by a factor of some offset and the
	// maximum component-wise value of the current point to accommodate floating point
	// error as values increase.
	vec3 stepRayOrigin( vec3 rayOrigin, vec3 rayDirection, vec3 offset, float dist ) {

		vec3 point = rayOrigin + rayDirection * dist;
		vec3 absPoint = abs( point );
		float maxPoint = max( absPoint.x, max( absPoint.y, absPoint.z ) );
		return point + offset * ( maxPoint + 1.0 ) * RAY_OFFSET;

	}

	// https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_volume/README.md#attenuation
	vec3 transmissionAttenuation( float dist, vec3 attColor, float attDist ) {

		vec3 ot = - log( attColor ) / attDist;
		return exp( - ot * dist );

	}

	vec3 getHalfVector( vec3 wi, vec3 wo, float eta ) {

		// get the half vector - assuming if the light incident vector is on the other side
		// of the that it's transmissive.
		vec3 h;
		if ( wi.z > 0.0 ) {

			h = normalize( wi + wo );

		} else {

			// Scale by the ior ratio to retrieve the appropriate half vector
			// From Section 2.2 on computing the transmission half vector:
			// https://blog.selfshadow.com/publications/s2015-shading-course/burley/s2015_pbs_disney_bsdf_notes.pdf
			h = normalize( wi + wo * eta );

		}

		h *= sign( h.z );
		return h;

	}

	vec3 getHalfVector( vec3 a, vec3 b ) {

		return normalize( a + b );

	}

	// The discrepancy between interpolated surface normal and geometry normal can cause issues when a ray
	// is cast that is on the top side of the geometry normal plane but below the surface normal plane. If
	// we find a ray like that we ignore it to avoid artifacts.
	// This function returns if the direction is on the same side of both planes.
	bool isDirectionValid( vec3 direction, vec3 surfaceNormal, vec3 geometryNormal ) {

		bool aboveSurfaceNormal = dot( direction, surfaceNormal ) > 0.0;
		bool aboveGeometryNormal = dot( direction, geometryNormal ) > 0.0;
		return aboveSurfaceNormal == aboveGeometryNormal;

	}

	// ray sampling x and z are swapped to align with expected background view
	vec2 equirectDirectionToUv( vec3 direction ) {

		// from Spherical.setFromCartesianCoords
		vec2 uv = vec2( atan( direction.z, direction.x ), acos( direction.y ) );
		uv /= vec2( 2.0 * PI, PI );

		// apply adjustments to get values in range [0, 1] and y right side up
		uv.x += 0.5;
		uv.y = 1.0 - uv.y;
		return uv;

	}

	vec3 equirectUvToDirection( vec2 uv ) {

		// undo above adjustments
		uv.x -= 0.5;
		uv.y = 1.0 - uv.y;

		// from Vector3.setFromSphericalCoords
		float theta = uv.x * 2.0 * PI;
		float phi = uv.y * PI;

		float sinPhi = sin( phi );

		return vec3( sinPhi * cos( theta ), cos( phi ), sinPhi * sin( theta ) );

	}

	// power heuristic for multiple importance sampling
	float misHeuristic( float a, float b ) {

		float aa = a * a;
		float bb = b * b;
		return aa / ( aa + bb );

	}

	// tentFilter from Peter Shirley's 'Realistic Ray Tracing (2nd Edition)' book, pg. 60
	// erichlof/THREE.js-PathTracing-Renderer/
	float tentFilter( float x ) {

		return x < 0.5 ? sqrt( 2.0 * x ) - 1.0 : 1.0 - sqrt( 2.0 - ( 2.0 * x ) );

	}
`;class cd extends $o{constructor(){super({uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:`
				varying vec2 vUv;
				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`
				#define ENVMAP_TYPE_CUBE_UV

				uniform samplerCube envMap;
				uniform float flipEnvMap;
				varying vec2 vUv;

				#include <common>
				#include <cube_uv_reflection_fragment>

				${ld}

				void main() {

					vec3 rayDirection = equirectUvToDirection( vUv );
					rayDirection.x *= flipEnvMap;
					gl_FragColor = textureCube( envMap, rayDirection );

				}`}),this.depthWrite=!1,this.depthTest=!1}}class ud{constructor(e){this._renderer=e,this._quad=new ai(new cd)}generate(e,t=null,i=null){if(!e.isCubeTexture)throw new Error("CubeToEquirectMaterial: Source can only be cube textures.");const r=e.images[0],n=this._renderer,s=this._quad;t===null&&(t=4*r.height),i===null&&(i=2*r.height);const o=new Lo(t,i,{type:Xe,colorSpace:r.colorSpace}),l=r.height,d=Math.log2(l)-2,c=1/l,u=1/(3*Math.max(Math.pow(2,d),112));s.material.defines.CUBEUV_MAX_MIP=`${d}.0`,s.material.defines.CUBEUV_TEXEL_WIDTH=u,s.material.defines.CUBEUV_TEXEL_HEIGHT=c,s.material.uniforms.envMap.value=e,s.material.uniforms.flipEnvMap.value=e.isRenderTargetTexture?1:-1,s.material.needsUpdate=!0;const h=n.getRenderTarget(),f=n.autoClear;n.autoClear=!0,n.setRenderTarget(o),s.render(n),n.setRenderTarget(h),n.autoClear=f;const p=new Uint16Array(t*i*4),y=new Float32Array(t*i*4);n.readRenderTargetPixels(o,0,0,t,i,y),o.dispose();for(let w=0,m=y.length;w<m;w++)p[w]=Ne.toHalfFloat(y[w]);const v=new Ie(p,t,i,Ce,de);return v.minFilter=Fo,v.magFilter=ue,v.wrapS=Qe,v.wrapT=Qe,v.mapping=Bo,v.needsUpdate=!0,v}dispose(){this._quad.dispose()}}function dd(a,e){return a.uuid<e.uuid?1:a.uuid>e.uuid?-1:0}function hd(a){return`${a.source.uuid}:${a.colorSpace}`}function fd(a){const e=[];return a.traverseVisible(t=>{(t.isRectAreaLight||t.isSpotLight||t.isPointLight||t.isDirectionalLight||t.isSunLight)&&e.push(t)}),e.sort(dd)}const ii=new lt,Gi=new K({matrixWorld:"mat4x4f",inverseMatrixWorld:"mat4x4f",visible:"uint",materialIndex:"uint",visibleToShadowRays:"uint",_alignment0:"uint",color:"vec4f"},"TransformStruct"),ji=new K({indices:"vec4u",normal:"vec3f",didHit:"bool",barycoord:"vec3f",objectIndex:"uint",side:"float",dist:"float",forwardBlocked:"bool"},"PathTracerIntersectionResult");class pd extends _c{constructor(e,t={}){super(e,{attributes:{position:"vec4f",normal:"vec4f",tangent:"vec4f",color:"vec4f",uv:"vec4f"},...t}),this.structs.transform=Gi,this.structs.material=Bc,this.storage.materials=null,this.materialsMap=new Map,this.materials=[],this.bvhMap=new Map,this.textureAtlas=new io}updateUvAttributesFromScene(){const{attributes:e}=this,t=new Set(["color"]);for(let i=0;i<8;i++){const r=i===0?"uv":"uv"+i;delete e[r],t.add(r)}this.getRootObject().traverse(i=>{if(i.geometry)for(const r in i.geometry.attributes)t.has(r)&&(e[r]="vec4f")})}updateUvSampleFunction(){const{structs:e,fns:t}=this,i=[];let r=null;e.attributes.membersLayout.forEach(({name:n})=>{if(/^uv/.test(n)){const s=n==="uv"?0:Number(n.replace(/^uv/,""));i.push(`
					case ${s}u: {

						return vertexData.${n}.xy;

					}
				`),r===null&&(r=`vertexData.${n}.xy`)}}),t.getUvFromChannel=R`
			fn getUvFromChannel( vertexData: ${e.attributes}, packed: i32 ) -> vec2f {

				// the uv channel is packed into bits 23-25 of the "*Map" descriptor
				let channel = u32( ( packed >> 23 ) & 0x7 );
				switch ( channel ) {

					${i.join(`
`)}
					default: {

						return ${r??"vec2f( 0.0 )"};

					}

				}

			}
		`}updateColorSampleFn(){const{structs:e,fns:t}=this;!!e.attributes.membersLayout.find(({name:r})=>r==="color")?t.getColor=R`
				fn getColor( vertexData: ${e.attributes} ) -> vec4f {

					return vertexData.color;

				}
			`:t.getColor=R`
				fn getColor( vertexData: ${e.attributes} ) -> vec4f {

					return vec4f( 1.0 );

				}
			`}useTransparencyRaycastFn(){const{textureAtlas:e,storage:t,fns:i}=this,r=e.texture,n=rr(e.textureInfo,"uvec4"),s=za(n,pe(r));i.getSurfaceRecord=iu(s,i.getUvFromChannel,i.getColor);const o=ht().toVar("bvh_materialIndex"),l=Ke(1).toVar("bvh_rayScalar"),d=Ke(1).toVar("bvh_baseOpacity"),c=Hs(!1).toVar("bvh_isShadowRay"),u=Hs(!1).toVar("bvh_skipShadowObject"),h={shapeStruct:V,resultStruct:ji,boundsOrderFn:R`
				fn getBoundsOrder( ray: ${V}, splitAxis: u32, node: ${pt} ) -> bool {

					return ray.direction[ splitAxis ] >= 0.0;

				}
			`,intersectsBoundsFn:R`
				fn rayIntersectsBounds( ray: ${V}, bounds: ${ft}, result: ptr<function, ${ji}> ) -> u32 {

					// early-out if our object is completely transparent
					if ( ${d} == 0.0 ) {

						return 0u;

					}

					let boundsMin = vec3( bounds.min[0], bounds.min[1], bounds.min[2] );
					let boundsMax = vec3( bounds.max[0], bounds.max[1], bounds.max[2] );

					let invDir = 1.0 / ray.direction;
					let tMinPlane = ( boundsMin - ray.origin ) * invDir;
					let tMaxPlane = ( boundsMax - ray.origin ) * invDir;

					let tMinHit = min( tMinPlane, tMaxPlane );
					let tMaxHit = max( tMinPlane, tMaxPlane );

					let t0 = max( max( tMinHit.x, tMinHit.y ), tMinHit.z );
					let t1 = min( min( tMaxHit.x, tMaxHit.y ), tMaxHit.z );

					let dist = max( t0, 0.0 );
					if ( t1 < dist ) {

						return 0u;

					} else if ( ray.maxDist > 0.0 && dist * ${l} >= ray.maxDist ) {

						return 0u;

					} else if ( result.didHit && dist * ${l} >= result.dist ) {

						return 0u;

					} else {

						return 1u;

					}

				}

			`,intersectRangeFn:R`
				fn intersectRange( ray: ${V}, offset: u32, count: u32, result: ptr<function, ${ji}> ) -> bool {

					var didHit = false;
					for ( var ti = offset; ti < offset + count; ti = ti + 1u ) {

						let i0 = ${t.index}[ ti * 3u ];
						let i1 = ${t.index}[ ti * 3u + 1u ];
						let i2 = ${t.index}[ ti * 3u + 2u ];

						let a = ${t.attributes}[ i0 ].position.xyz;
						let b = ${t.attributes}[ i1 ].position.xyz;
						let c = ${t.attributes}[ i2 ].position.xyz;

						var triResult = ${wa}( ray, a, b, c, 0.0 );
						triResult.dist *= ${l};
						if ( triResult.didHit && ( ray.maxDist <= 0.0 || triResult.dist < ray.maxDist ) && ( ! result.didHit || triResult.dist < result.dist ) ) {

							let material = ${t.materials}[ ${o} ];

							// TODO: if material is a transmissive volume we may need to assume double-sidedness
							// shadow rays hit both sides
							if ( ! ${c} && material.side != 0 && triResult.side != material.side ) {

								continue;

							}

							if ( material.transparent != 0 || material.alphaTest > 0.0 ) {

								var opacity = ${d};

								// add support for vertex color opacity
								if ( material.vertexColors == 1 ) {

									let barycoord = triResult.barycoord;
									let a = ${i.getColor}( ${t.attributes}[ i0 ] );
									let b = ${i.getColor}( ${t.attributes}[ i1 ] );
									let c = ${i.getColor}( ${t.attributes}[ i2 ] );
									let col = barycoord.x * a + barycoord.y * b + barycoord.z * c;

									opacity *= col.a;

								}

								// account for alpha component of albedo map
								if ( material.map != - 1 ) {

									let barycoord = triResult.barycoord;
									let a = ${i.getUvFromChannel}( ${t.attributes}[ i0 ], material.map );
									let b = ${i.getUvFromChannel}( ${t.attributes}[ i1 ], material.map );
									let c = ${i.getUvFromChannel}( ${t.attributes}[ i2 ], material.map );
									let uv = barycoord.x * a + barycoord.y * b + barycoord.z * c;
									let uvPrime = material.mapTransform * vec3f( uv, 1 );

									opacity *= ${s}( uvPrime.xy, material.map, 0 ).a;

								}

								// account for green component of alpha map
								if ( material.alphaMap != - 1 ) {

									let barycoord = triResult.barycoord;
									let a = ${i.getUvFromChannel}( ${t.attributes}[ i0 ], material.alphaMap );
									let b = ${i.getUvFromChannel}( ${t.attributes}[ i1 ], material.alphaMap );
									let c = ${i.getUvFromChannel}( ${t.attributes}[ i2 ], material.alphaMap );
									let uv = barycoord.x * a + barycoord.y * b + barycoord.z * c;
									let uvPrime = material.alphaMapTransform * vec3f( uv, 1 );

									opacity *= ${s}( uvPrime.xy, material.alphaMap, 0 ).g;

								}

								// Opacity is resolved at surface processing but skip full transparent hits here.
								if ( material.transparent != 0 && opacity <= 0.0 ) {

									continue;

								}

								if ( opacity < material.alphaTest ) {

									continue;

								}

							}

							// shadow rays pass the objects not visible to them, but a bsdf ray would hit this face
							if ( ${u} ) {

								if ( material.side == 0 || triResult.side == material.side ) {

									result.forwardBlocked = true;

								}

								continue;

							}

							result.didHit = true;
							result.dist = triResult.dist;
							result.normal = triResult.normal;
							result.side = triResult.side;
							result.barycoord = triResult.barycoord;
							result.indices = vec4u( i0, i1, i2, ti );

							didHit = true;

						}

					}

					return didHit;

				}
			`,transformShapeFn:R`
				fn transformRay( ray: ptr<function, ${V}>, objectIndex: u32 ) -> void {

					let toLocal = ${t.transforms}[ objectIndex ].inverseMatrixWorld;
					ray.origin = ( toLocal * vec4f( ray.origin, 1.0 ) ).xyz;
					ray.direction = ( toLocal * vec4f( ray.direction, 0.0 ) ).xyz;

					let len = length( ray.direction );
					ray.direction /= len;
					${l} = 1.0 / len;

					let object = ${t.transforms}[ objectIndex ];
					${o} = object.materialIndex;

					let material = ${t.materials}[ object.materialIndex ];
					if ( material.transparent == 1 ) {

						${d} = material.opacity * object.color.a;

					} else {

						${d} = 1.0;

					}

					${u} = ${c} && object.visibleToShadowRays == 0u;

				}
			`,transformResultFn:R`
				fn transformResult( hit: ptr<function, ${ji}>, objectIndex: u32 ) -> void {

					let toLocal = ${t.transforms}[ objectIndex ].inverseMatrixWorld;
					hit.normal = normalize( ( transpose( toLocal ) * vec4f( hit.normal, 0.0 ) ).xyz );
					hit.objectIndex = objectIndex;

				}
			`,resetShapeFn:R`
				fn resetRayScalar( objectIndex: u32 ) -> void {

					${l} = 1.0;
					${d} = 1.0;

				}
			`};i.raycastFirstHit=this.getShapecastFn({...h,name:"raycastFirstHit",prefixFn:R`
				fn initFirstHitCull() -> void {

					${c} = false;

				}
			`}),i.raycastShadow=this.getShapecastFn({...h,name:"raycastShadow",prefixFn:R`
				fn initShadowCull() -> void {

					${c} = true;

				}
			`})}update(){const{structs:e}=this,t=new z(new Uint8Array,e.material.getLength());this.storage.materials=O(t,e.material).toReadOnly().setName("bvh_materials"),this.updateUvAttributesFromScene(),this.updateMaterialsMap(),super.update(),this.updateUvSampleFunction(),this.updateColorSampleFn(),this.updateMaterials(),this.bvhMap.clear(),this.useTransparencyRaycastFn()}updateMaterialsMap(){const{materials:e,materialsMap:t}=this;t.clear(),e.length=0,this.getRootObject().traverse(r=>{r.material&&(Array.isArray(r.material)?r.material.forEach(n=>n&&i(n)):i(r.material))}),e.sort((r,n)=>r.uuid<n.uuid?1:-1).forEach((r,n)=>{t.set(r,n)});function i(r){t.has(r)||(e.push(r),t.set(r,-1))}}updateMaterials(){this.updateMaterialsMap();const{materials:e,storage:t,structs:i,bvh:r}=this,{materialData:n,textures:s}=this.writeMaterialsBuffer(e),o=t.materials.proxyNode,l=t.transforms.proxyNode,d=n.length/i.material.getLength();o.value.count<d&&(o.value.dispose(),o.value=new z(n,i.material.getLength())),o.value.array.set(n),o.value.needsUpdate=!0,this._getTransformMap(r).forEach(c=>{this.writeMaterialData(c,c.slot,l.value.array.buffer)}),l.value.needsUpdate=!0,this.textures=s}writeMaterialsBuffer(e){function t(h){switch(h){case Qe:return 0;case ir:return 1;case zo:return 2;default:return 0}}function i(h,f){if(f in h&&h[f]){const p=h[f],y=hd(p);o.has(y)||(o.set(y,o.size),l.push(p));const v=o.get(y),w=p.channel&7,m=t(p.wrapS),x=t(p.wrapT);return(p.magFilter===Ve?1:0)<<30|x<<28|m<<26|w<<23|v&8388607}else return-1}function r(h,f,p){return f in h?h[f]:p}function n(h,f,p,y){const v=h[f]&&h[f].isTexture?h[f]:null;if(v){v.matrixAutoUpdate&&v.updateMatrix();const w=v.matrix.elements;for(let m=0;m<3;m++)p[y+4*m+0]=w[3*m+0],p[y+4*m+1]=w[3*m+1],p[y+4*m+2]=w[3*m+2],p[y+4*m+3]=0}return 12}let s=0;const o=new Map,l=[],d=Math.max(e.length,2),c=new Float32Array(d*this.structs.material.getLength()),u=new Int32Array(c.buffer);for(let h=0,f=e.length;h<f;h++){const p=e[h];c[s++]=p.color.r,c[s++]=p.color.g,c[s++]=p.color.b,u[s++]=i(p,"map"),c[s++]=r(p,"metalness",0),u[s++]=i(p,"metalnessMap"),c[s++]=r(p,"roughness",0),u[s++]=i(p,"roughnessMap"),c[s++]=r(p,"ior",1.5),c[s++]=r(p,"transmission",0),u[s++]=i(p,"transmissionMap"),c[s++]=r(p,"emissiveIntensity",0),"emissive"in p?(c[s++]=p.emissive.r,c[s++]=p.emissive.g,c[s++]=p.emissive.b):(c[s++]=0,c[s++]=0,c[s++]=0),u[s++]=i(p,"emissiveMap"),u[s++]=i(p,"normalMap"),s++,"normalScale"in p?(c[s++]=p.normalScale.x,c[s++]=p.normalScale.y):(c[s++]=1,c[s++]=1),c[s++]=r(p,"clearcoat",0),u[s++]=i(p,"clearcoatMap"),u[s++]=i(p,"clearcoatNormalMap"),s++,"clearcoatNormalScale"in p?(c[s++]=p.clearcoatNormalScale.x,c[s++]=p.clearcoatNormalScale.y):(c[s++]=1,c[s++]=1),c[s++]=r(p,"clearcoatRoughness",0),u[s++]=i(p,"clearcoatRoughnessMap"),u[s++]=i(p,"iridescenceMap"),u[s++]=i(p,"iridescenceThicknessMap"),c[s++]=r(p,"iridescence",0),c[s++]=r(p,"iridescenceIOR",1.3);const y=r(p,"iridescenceThicknessRange",[100,400]);c[s++]=y[0],c[s++]=y[1],c[s++]=r(p,"diffuseRoughness",0),c[s++]=r(p,"dispersion",0),"specularColor"in p?(c[s++]=p.specularColor.r,c[s++]=p.specularColor.g,c[s++]=p.specularColor.b):(c[s++]=1,c[s++]=1,c[s++]=1),u[s++]=i(p,"specularColorMap"),c[s++]=r(p,"specularIntensity",1),u[s++]=i(p,"specularIntensityMap");const v=r(p,"thickness",0)===0&&r(p,"attenuationDistance",1/0)===1/0;if(u[s++]=Number(v),s++,"attenuationColor"in p?(c[s++]=p.attenuationColor.r,c[s++]=p.attenuationColor.g,c[s++]=p.attenuationColor.b):(c[s++]=1,c[s++]=1,c[s++]=1),c[s++]=r(p,"attenuationDistance",1/0),u[s++]=i(p,"alphaMap"),u[s++]=Number(r(p,"castShadow",!0)),c[s++]=p.opacity,c[s++]=p.alphaTest,!v&&p.transmission>0)c[s++]=0;else switch(p.side){case er:c[s++]=1;break;case gs:c[s++]=-1;break;case ra:c[s++]=0;break}u[s++]=Number(r(p,"matte",!1)),c[s++]=r(p,"sheen",0),s++,"sheenColor"in p?(c[s++]=p.sheenColor.r,c[s++]=p.sheenColor.g,c[s++]=p.sheenColor.b):(c[s++]=0,c[s++]=0,c[s++]=0),u[s++]=i(p,"sheenColorMap"),c[s++]=r(p,"sheenRoughness",0),u[s++]=i(p,"sheenRoughnessMap"),u[s++]=Number(p.vertexColors),u[s++]=Number(p.flatShading),u[s++]=Number(p.transparent),u[s++]=0,c[s++]=r(p,"anisotropy",0),c[s++]=r(p,"anisotropyRotation",0),u[s++]=i(p,"anisotropyMap"),s++,s++,s++,s+=n(p,"map",c,s),s+=n(p,"metalnessMap",c,s),s+=n(p,"roughnessMap",c,s),s+=n(p,"transmissionMap",c,s),s+=n(p,"emissiveMap",c,s),s+=n(p,"normalMap",c,s),s+=n(p,"clearcoatMap",c,s),s+=n(p,"clearcoatNormalMap",c,s),s+=n(p,"clearcoatRoughnessMap",c,s),s+=n(p,"sheenColorMap",c,s),s+=n(p,"sheenRoughnessMap",c,s),s+=n(p,"iridescenceMap",c,s),s+=n(p,"iridescenceThicknessMap",c,s),s+=n(p,"specularColorMap",c,s),s+=n(p,"specularIntensityMap",c,s),s+=n(p,"alphaMap",c,s),s+=n(p,"anisotropyMap",c,s)}return{materialData:u,textures:l}}writeMaterialData(e,t,i){const{materialsMap:r}=this,{object:n,instanceId:s,root:o}=e;let l=n.material;if(Array.isArray(l)){const{materialIndex:h}=n.geometry.groups[o];l=l[h]}const d=new Uint32Array(i),c=r.has(l)?r.get(l):-1;c===-1&&(d[t*Gi.getLength()+32]=0),d[t*Gi.getLength()+33]=c,n.isInstancedMesh&&n.instanceColor?(n.getColorAt(s,ii),ii.w=1):n.isBatchedMesh&&n._colorsTexture?n.getColorAt(s,ii):ii.setScalar(1);const u=new Float32Array(i);ii.toArray(u,t*Gi.getLength()+36)}writeTransformData(e,t,i,r){super.writeTransformData(e,t,i,r),this.writeMaterialData(e,i,r);const n=new Uint32Array(r);n[i*this.structs.transform.getLength()+34]=e.object.visibleToShadowRays===!1?0:1}getBVH(e,t,i){const{bvhMap:r}=this,n=super.getBVH(e,t,i);if(r.has(n)){const s=r.get(n);if(Object.assign(i,s.range),n!==s.bvh&&n instanceof ui){const o=n.mesh,l=s.bvh.mesh;l.matrixWorld.copy(o.matrixWorld).decompose(l.position,l.quaternion,l.scale),n.refit(),n.getBoundingBox(l.boundingBox),n.geometry.computeBoundingBox()}return s.bvh}else if(n.indirect){const s=new No;s.attributes=n.geometry.attributes;let o;if(n.geometry.index)o=n.geometry.index.array.slice(i.start,i.count+i.start);else{const{start:d,count:c}=i;o=new Uint32Array(c);for(let u=0,h=i.count;u<h;u++)o[u]=d+u}s.index=new at(o,1),i.start=0;let l;if(n instanceof ui){const d=n.mesh,c=new Eo(s);c.copy(d),c.matrixWorld.copy(d.matrixWorld).decompose(c.position,c.quaternion,c.scale),l=new ui(c,{strategy:Vt,targetLeafSize:5})}else l=new ut(s,{strategy:Vt,targetLeafSize:5});return r.set(n,{bvh:l,range:{...i}}),l}else return n}dispose(){const{storage:e}=this;for(const t in e)e[t].value?.dispose()}}class md extends hr{set texture(e){this._texNode.value=e}set layer(e){this._layerUniform.value=e}constructor(){super(),this.blending=ys,this._texNode=pe(new Ie),this._layerUniform=$(0),this.colorNode=A(`
			fn atlasDebug( tex: texture_2d_array<f32>, coord: vec2f, layer: f32 ) -> vec4f {

				// flip y so texel origin shows at the top-left
				let dims = vec2f( textureDimensions( tex, 0 ).xy );
				let texel = vec2i( vec2f( coord.x, 1.0 - coord.y ) * dims );
				return textureLoad( tex, texel, i32( layer ), 0 );

			}
		`)(this._texNode,fr(pr()),this._layerUniform)}}class gd extends hr{set texture(e){this._texNode.value=e}set minCount(e){this._minUniform.value=e}set maxCount(e){this._maxUniform.value=e}constructor(){super(),this.blending=ys,this._texNode=pe(new re(1,1)),this._minUniform=$(0),this._maxUniform=$(1);const e=R`
			fn sampleDensity( tex: texture_2d<u32>, coord: vec2f, minCount: f32, maxCount: f32 ) -> vec4f {

				let dims = vec2f( textureDimensions( tex, 0 ) );
				let texel = vec2i( coord * dims );

				// the high bits hold the ray state flags rather than part of the count
				let samples = textureLoad( tex, texel, 0 ).r & ${Tr}u;

				// stretched across the recorded range rather than from zero, otherwise a converged
				// image with counts bunched near the max reads as uniformly hot
				let range = max( maxCount - minCount, 1.0 );
				let t = clamp( ( f32( samples ) - minCount ) / range, 0.0, 1.0 );

				return vec4f( ${Ta}( t ), 1.0 );

			}
		`;this.colorNode=e(this._texNode,fr(pr()),this._minUniform,this._maxUniform)}}function xd(a,e){if(!a.index){const t=a.attributes.position.count,i=new Array(t);for(let r=0;r<t;r++)i[r]=r;a.setIndex(i)}if(!a.attributes.normal&&e&&e.includes("normal")&&a.computeVertexNormals(),!a.attributes.uv&&e&&e.includes("uv")){const t=a.attributes.position.count;a.setAttribute("uv",new at(new Float32Array(t*2),2,!1))}if(!a.attributes.uv2&&e&&e.includes("uv2")){const t=a.attributes.position.count;a.setAttribute("uv2",new at(new Float32Array(t*2),2,!1))}if(!a.attributes.tangent&&e&&e.includes("tangent"))if(a.attributes.uv&&a.attributes.normal)a.computeTangents();else{const t=a.attributes.position.count;a.setAttribute("tangent",new at(new Float32Array(t*4),4,!1))}if(!a.attributes.color&&e&&e.includes("color")){const t=a.attributes.position.count,i=new Float32Array(t*4);i.fill(1),a.setAttribute("color",new at(i,4))}}class vd{init(){}getBsdfNode(){return R`

			fn bsdfSample( worldWo: vec3f, surf: SurfaceRecord ) -> ScatterRecord {

				var record: ScatterRecord;

				let wo = normalize( surf.normalInvBasis * worldWo );
				let wi = ${Wc}( wo, ${Ot}( ${Fa} ) );
				record.color = surf.color * max( wi.z, 0.0 );
				record.pdf = max( wi.z, 0.0 ) / PI;
				record.direction = normalize( surf.normalBasis * wi );

				return record;

			}

		`}getBsdfEvalPdfNode(){return R`

			fn bsdfEvalPdf( worldWo: vec3f, worldWi: vec3f, surf: SurfaceRecord ) -> ScatterRecord {

				var record: ScatterRecord;
				record.direction = worldWi;

				let wo = normalize( surf.normalInvBasis * worldWo );
				let wi = normalize( surf.normalInvBasis * worldWi );
				record.color = surf.color * max( wi.z, 0.0 );
				record.pdf = max( wi.z, 0.0 ) / PI;

				return record;

			}

		`}getData(){return{bsdfSample:this.getBsdfNode(),bsdfEvalPdf:this.getBsdfEvalPdfNode()}}}const yd=A(`

	fn eonDirectionalAlbedo( mu: f32, roughness: f32, A: f32 ) -> f32 {

		let muComp = 1.0 - mu;
		let gOverPi = muComp * (
			0.0571085289 + muComp * (
				0.491881867 + muComp * (
					- 0.332181442 + muComp * 0.0714429953
				)
			)
		);
		return A * ( 1.0 + roughness * gOverPi );

	}

`),oo=A(`

	fn fonSingleScatter( NdotV: f32, NdotL: f32, VdotH: f32, roughness: f32, A: f32, rho: vec3f ) -> vec3f {

		let VdotL = 2.0 * VdotH * VdotH - 1.0;
		let s = VdotL - NdotV * NdotL;
		let sOverT = select( s, s / max( NdotV, NdotL ), s > 0.0 );

		return ( rho / PI ) * A * ( 1.0 + roughness * sOverT );

	}

`,[W]);A(`

	fn fonBrdf( NdotV: f32, NdotL: f32, VdotH: f32, surf: SurfaceRecord ) -> vec3f {

		let roughness = surf.diffuseRoughness;
		if ( roughness < 1e-5 ) {

			return surf.color / PI;

		}

		let rho = saturate( surf.color );
		let A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );

		return fonSingleScatter( NdotV, NdotL, VdotH, roughness, A, rho );

	}

`,[W,me,oo]);const bd=A(`

	fn eonBrdf( NdotV: f32, NdotL: f32, VdotH: f32, surf: SurfaceRecord ) -> vec3f {

		let roughness = surf.diffuseRoughness;
		if ( roughness < 1e-5 ) {

			return surf.color / PI;

		}

		let rho = saturate( surf.color );
		let A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		let singleScatter = fonSingleScatter( NdotV, NdotL, VdotH, roughness, A, rho );

		let averageDirectionalAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		let directionalAlbedoV = eonDirectionalAlbedo( NdotV, roughness, A );
		let directionalAlbedoL = eonDirectionalAlbedo( NdotL, roughness, A );

		let rhoMultiScatter = rho * rho * averageDirectionalAlbedo /
			max( vec3f( 1e-7 ), vec3f( 1.0 ) - rho * ( 1.0 - averageDirectionalAlbedo ) );
		let multiScatter = ( rhoMultiScatter / PI ) *
			max( 1e-7, 1.0 - directionalAlbedoV ) *
			max( 1e-7, 1.0 - directionalAlbedoL ) /
			max( 1e-7, 1.0 - averageDirectionalAlbedo );

		return singleScatter + multiScatter;

	}

`,[W,me,yd,oo]),lo=A(`

	fn eonLtcCoeffs( mu: f32, roughness: f32 ) -> vec4f {

		let a = 1.0 + roughness * (
			0.303392 + ( - 0.518982 + 0.111709 * mu ) * mu +
			( - 0.276266 + 0.335918 * mu ) * roughness
		);
		let b = roughness * (
			- 1.16407 + 1.15859 * mu + ( 0.150815 - 0.150105 * mu ) * roughness
		) / ( mu * mu * mu - 1.43545 );
		let c = 1.0 + roughness * ( 0.20013 + ( - 0.506373 + 0.261777 * mu ) * mu );
		let d = roughness * (
			0.540852 + ( - 1.01625 + 0.475392 * mu ) * mu
		) / ( - 1.0743 + ( 0.0725628 + mu ) * mu );

		return vec4f( a, b, c, d );

	}

`),co=A(`

	fn eonLtcBasis( wo: vec3f ) -> mat3x3f {

		let lenSqr = dot( wo.xy, wo.xy );
		let invLen = inverseSqrt( max( lenSqr, 1e-7 ) );
		let x = select(
			vec3f( 1.0, 0.0, 0.0 ),
			vec3f( wo.x, wo.y, 0.0 ) * invLen,
			lenSqr > 0.0,
		);
		let y = vec3f( - x.y, x.x, 0.0 );

		return mat3x3f( x, y, vec3f( 0.0, 0.0, 1.0 ) );

	}

`),wd=A(`

	fn eonCltcPdf( wo: vec3f, wi: vec3f, roughness: f32 ) -> f32 {

		let toLtc = transpose( eonLtcBasis( wo ) );
		let wiLtc = toLtc * wi;
		let coeffs = eonLtcCoeffs( saturate( wo.z ), roughness );
		let a = coeffs.x;
		let b = coeffs.y;
		let c = coeffs.z;
		let d = coeffs.w;
		let detM = c * ( a - b * d );
		let wh = vec3f(
			c * ( wiLtc.x - b * wiLtc.z ),
			( a - b * d ) * wiLtc.y,
			- c * ( d * wiLtc.x - a * wiLtc.z ),
		);
		let lenSqr = max( dot( wh, wh ), 1e-7 );
		let vz = inverseSqrt( d * d + 1.0 );
		let s = 0.5 * ( 1.0 + vz );
		let jacobian = detM * detM / ( lenSqr * lenSqr );

		return jacobian * max( wh.z, 0.0 ) / ( PI * s );

	}

`,[W,lo,co]),_d=A(`

	fn eonCltcDirection( wo: vec3f, roughness: f32, uv: vec2f ) -> vec3f {

		let coeffs = eonLtcCoeffs( saturate( wo.z ), roughness );
		let a = coeffs.x;
		let b = coeffs.y;
		let c = coeffs.z;
		let d = coeffs.w;
		let radius = sqrt( uv.x );
		let phi = 2.0 * PI * uv.y;
		let y = radius * sin( phi );
		let vz = inverseSqrt( d * d + 1.0 );
		let s = 0.5 * ( 1.0 + vz );
		let x = - mix( sqrt( max( 1.0 - y * y, 0.0 ) ), radius * cos( phi ), s );
		let wh = vec3f( x, y, sqrt( max( 1.0 - x * x - y * y, 0.0 ) ) );
		let wiUnnormalized = vec3f(
			a * wh.x + b * wh.z,
			c * wh.y,
			d * wh.x + wh.z,
		);
		let wi = normalize( eonLtcBasis( wo ) * wiUnnormalized );

		return wi;

	}

`,[W,lo,co]),Sd=A(`

	fn eonUniformHemisphereSample( uv: vec2f ) -> vec3f {

		let sinTheta = sqrt( max( 1.0 - uv.x * uv.x, 0.0 ) );
		let phi = 2.0 * PI * uv.y;
		return vec3f( sinTheta * cos( phi ), sinTheta * sin( phi ), uv.x );

	}

`,[W]),uo=A(`

	fn eonUniformProbability( wo: vec3f, roughness: f32 ) -> f32 {

		let mu = saturate( wo.z );
		return clamp( pow( roughness, 0.1 ), 0.0, 1.0 ) * (
			0.162925 + ( - 0.372058 + ( 0.538233 - 0.290822 * mu ) * mu ) * mu
		);

	}

`),Td=A(`

	fn eonDirection( wo: vec3f, roughness: f32, uv: vec2f ) -> vec3f {

		let uniformProbability = eonUniformProbability( wo, roughness );
		if ( uv.x <= uniformProbability && uniformProbability > 0.0 ) {

			return eonUniformHemisphereSample( vec2f( uv.x / uniformProbability, uv.y ) );

		}

		let cltcProbability = 1.0 - uniformProbability;
		let cltcUv = vec2f(
			( uv.x - uniformProbability ) / max( cltcProbability, 1e-7 ),
			uv.y,
		);
		return eonCltcDirection( wo, roughness, cltcUv );

	}

`,[_d,Sd,uo]),Id=A(`

	fn eonPdf( wo: vec3f, wi: vec3f, roughness: f32 ) -> f32 {

		// The EON proposal is defined over the positive hemisphere.
		if ( wo.z <= 0.0 || wi.z <= 0.0 ) {

			return 0.0;

		}

		let uniformProbability = eonUniformProbability( wo, roughness );
		let cltcProbability = 1.0 - uniformProbability;
		let uniformPdf = 1.0 / ( 2.0 * PI );

		return uniformProbability * uniformPdf +
			cltcProbability * eonCltcPdf( wo, wi, roughness );

	}

`,[W,wd,uo]),Cd=R`

	fn velvetD( cosThetaH: f32, roughness: f32 ) -> f32 {

		var alpha = max( roughness, 0.07 );
		alpha = alpha * alpha;

		let invAlpha = 1.0 / alpha;
		let sqrCosThetaH = cosThetaH * cosThetaH;
		let sinThetaH = max( 1.0 - sqrCosThetaH, 0.001 );

		return ( 2.0 + invAlpha ) * pow( sinThetaH, 0.5 * invAlpha ) / ( 2.0 * PI );

	}

`,ri=R`

	fn velvetParamsInterpolate( i: i32, oneMinusAlphaSquared: f32 ) -> f32 {

		let p0 = array<f32, 5>( 25.3245, 3.32435, 0.16801, - 1.27393, - 4.85967 );
		let p1 = array<f32, 5>( 21.5473, 3.82987, 0.19823, - 1.97760, - 4.32054 );

		return mix( p1[ i ], p0[ i ], oneMinusAlphaSquared );

	}

`,Xr=R`

	fn velvetL( x: f32, alpha: f32 ) -> f32 {

		let oneMinusAlpha = 1.0 - alpha;
		let oneMinusAlphaSquared = oneMinusAlpha * oneMinusAlpha;

		let a = ${ri}( 0, oneMinusAlphaSquared );
		let b = ${ri}( 1, oneMinusAlphaSquared );
		let c = ${ri}( 2, oneMinusAlphaSquared );
		let d = ${ri}( 3, oneMinusAlphaSquared );
		let e = ${ri}( 4, oneMinusAlphaSquared );

		return a / ( 1.0 + b * pow( abs( x ), c ) ) + d * x + e;

	}

`,jn=R`

	fn velvetLambda( cosTheta: f32, alpha: f32 ) -> f32 {

		if ( abs( cosTheta ) < 0.5 ) {

			return exp( ${Xr}( cosTheta, alpha ) );

		} else {

			return exp( 2.0 * ${Xr}( 0.5, alpha ) - ${Xr}( 1.0 - cosTheta, alpha ) );

		}

	}

`,Rd=R`

	fn velvetG( cosThetaO: f32, cosThetaI: f32, roughness: f32 ) -> f32 {

		var alpha = max( roughness, 0.07 );
		alpha = alpha * alpha;

		return 1.0 / ( 1.0 + ${jn}( cosThetaO, alpha ) + ${jn}( cosThetaI, alpha ) );

	}

`,Qn=R`

	fn directionalAlbedoSheen( cosThetaIn: f32, alpha: f32 ) -> f32 {

		let cosTheta = saturate( cosThetaIn );
		let c = 1.0 - cosTheta;
		let c3 = c * c * c;

		return 0.65584461 * c3 + 1.0 / ( 4.16526551 + exp( -7.97291361 * sqrt( alpha ) + 6.33516894 ) );

	}

`,Pd=R`

	fn sheenAlbedoScaling( wo: vec3f, wi: vec3f, surf: ${me} ) -> f32 {

		var alpha = max( surf.sheenRoughness, 0.07 );
		alpha = alpha * alpha;

		let maxSheenColor = max( max( surf.sheenColor.r, surf.sheenColor.g ), surf.sheenColor.b );

		let eWo = ${Qn}( clamp( wo.z, 0.001, 1.0 ), alpha );
		let eWi = ${Qn}( clamp( wi.z, 0.001, 1.0 ), alpha );

		return min( 1.0 - maxSheenColor * eWo, 1.0 - maxSheenColor * eWi );

	}

`,Dd=R`

	fn sheenColor( wo: vec3f, wi: vec3f, wh: vec3f, surf: ${me} ) -> vec3f {

		let cosThetaO = clamp( wo.z, 0.001, 1.0 );
		let cosThetaI = clamp( wi.z, 0.001, 1.0 );
		let cosThetaH = wh.z;

		let D = ${Cd}( cosThetaH, surf.sheenRoughness );
		let G = ${Rd}( cosThetaO, cosThetaI, surf.sheenRoughness );

		// See equation (1) in http://www.aconty.com/pdf/s2017_pbs_imageworks_sheen.pdf
		var color = surf.sheenColor;
		color *= D * G / ( 4.0 * abs( cosThetaO * cosThetaI ) );

		return color;

	}

`,Qi=32,Ki=16;class Md extends ko{constructor(){super(Qi,Qi,31),this.type=de,this.format=Ce,this.minFilter=ue,this.magFilter=ue,this.dielectricLayerCount=10,this.transmissiveLayerCount=10,this.minIoR=1,this.maxIoR=2.5,this.sampleConductorFn=H("_sampleConductorFn",this),this.sampleDielectricFn=H("_sampleDielectricFn",this),this.sampleTransmissiveFn=H("_sampleTransmissiveFn",this)}generate(e){const{dielectricLayerCount:t,transmissiveLayerCount:i,minIoR:r,maxIoR:n}=this,s={outputTarget:Vo(this).toWriteOnly(),globalId:ve,eta:$(1),layer:$(0,"uint"),includeFresnel:$(0),includeRefraction:$(0)},o=[Qi/Ki,Qi/Ki,1],l=new ce(uu(s.outputTarget)(s),{workgroupSize:[Ki,Ki,1]});s.layer.value=0,s.eta.value=1,s.includeFresnel.value=0,s.includeRefraction.value=0,e.compute(l.kernel,o);for(let y=0;y<t;y++)s.layer.value++,s.eta.value=1/Os.mapLinear(y,0,t-1,r,n),s.includeFresnel.value=1,e.compute(l.kernel,o);s.includeFresnel.value=1,s.includeRefraction.value=1;for(let y=0;y<i;y++){const v=Os.mapLinear(y,0,i-1,r,n);s.layer.value=1+t+y,s.eta.value=1/v,e.compute(l.kernel,o),s.layer.value=1+t+i+y,s.eta.value=v,e.compute(l.kernel,o)}l.dispose();const d=R`
			fn mapLinearClamped( v: f32, a0: f32, a1: f32, b0: f32, b1: f32 ) -> f32 {

				let mapped = saturate( ( v - a0 ) / ( a1 - a0 ) );
				return mix( b0, b1, mapped );

			}
		`,c=Ho(this).setName("turquinTexture"),u=Et(this).setName("turquinSampler"),h=1/(1+t+2*i);this._sampleConductorFn=R`
			fn sampleConductor( cosTheta0: f32, roughness: f32 ) -> f32 {

				let layer = 0.5;
				let uvw = vec3f( cosTheta0, roughness, layer * ${h} );
				return textureSampleLevel( ${c}, ${u}, uvw, 0 ).r;

			}
		`,this._sampleDielectricFn=R`
			fn sampleDielectric( cosTheta0: f32, roughness: f32, ior: f32 ) -> f32 {

				let blockStart = 1.0;
				let layer = ${d}(
					ior,
					f32( ${r} ), f32( ${n} ),
					0.5, f32( ${t} ) - 0.5,
				) + blockStart;

				let uvw = vec3f( cosTheta0, roughness, layer * ${h} );
				return textureSampleLevel( ${c}, ${u}, uvw, 0 ).r;

			}
		`;const f=1+t,p=1+t+i;this._sampleTransmissiveFn=R`
			fn sampleTransmissive( cosTheta0: f32, roughness: f32, ior: f32, entering: bool ) -> f32 {

				let blockStart = select(
					f32( ${p} ),
					f32( ${f} ),
					entering
				);
				let layer = ${d}(
					ior,
					f32( ${r} ), f32( ${n} ),
					0.5, f32( ${i} ) - 0.5,
				) + blockStart;

				let uvw = vec3f( cosTheta0, roughness, layer * ${h} );
				return textureSampleLevel( ${c}, ${u}, uvw, 0 ).r;

			}
		`}}const Kn=Ke(1.5),Xn=Ke(1e6);class Ad extends vd{constructor(e={}){super();const{specularBrdf:t=Wa,specularBtdf:i=qa,diffuseBrdf:r=bd,fresnelMix:n=su,conductorFresnel:s=lu,fresnelCoat:o=cu,iridescentFresnel:l=Ka}=e;this.turquinTexture=new Md,this.specularBrdf=t,this.specularBtdf=i,this.diffuseBrdf=r,this.fresnelMix=n,this.conductorFresnel=s,this.fresnelCoat=o,this.iridescentFresnel=l,this.transmissionFresnel=ou(l)}init(e){this.turquinTexture.generate(e)}getBsdfNode(){this._bsdfEvalFunc=R`

			// The material is organized as one scoped block per lobe in cascade order - clearcoat,
			// sheen, transmission, specular, diffuse - each accumulating into a shared result and
			// guarding its own hemisphere.
			// TODO: energy only cascades downward through front faces, so the layers are always traversed
			// outside-in and cannot reflect energy back into the glass from below.
			fn bsdfEval( ctx: ${Rn}, surf: ${me} ) -> vec3f {

				let NdotV = ctx.V.z;
				let NdotL = ctx.L.z;

				// Each lobe contributes into "result" within its own scope, evaluated in cascade.
				// "attenuation" carries the fraction of energy each layer passes through to
				// the layers beneath it. Every lobe guards its own hemisphere.
				var result = vec3f( 0.0 );
				var attenuation = vec3f( 1.0 );

				// clearcoat
				if ( NdotL > 0.0 && surf.clearcoat > 0.0 ) {

					// the clearcoat evaluates in its own frame
					let toClearcoatMat = surf.clearcoatInvBasis * surf.normalBasis;
					let Vc = normalize( toClearcoatMat * ctx.V );
					let Lc = normalize( toClearcoatMat * ctx.L );
					let Hc = normalize( toClearcoatMat * ctx.H );
					let NdotVc = Vc.z;

					let clearcoatAlpha = surf.clearcoatRoughness * surf.clearcoatRoughness;

					// reuse the same pattern for energy conservation used in the dielectric layer
					let clearcoatEnergySS = max( ${this.turquinTexture.sampleConductorFn}( NdotVc, surf.clearcoatRoughness ), 1e-5 );
					let clearcoatBoost = 1.0 + ${De}( 1.5 ) * ( 1.0 - clearcoatEnergySS ) / clearcoatEnergySS;

					let clearcoatSpecular = ${this.specularBrdf}( Vc, Lc, Hc, vec2( clearcoatAlpha ) ) * clearcoatBoost;
					let clearcoatFresnel = ${mt}( abs( dot( Vc, Hc ) ), ${De}( 1.5 ) );

					// retrieve specular energy reflected by this layer
					let clearcoatFresnelEnergySS = ${this.turquinTexture.sampleDielectricFn}( NdotVc, surf.clearcoatRoughness, 1.5 ) * clearcoatBoost;

					result += surf.clearcoat * clearcoatFresnel * clearcoatSpecular;
					attenuation *= 1.0 - surf.clearcoat * clearcoatFresnelEnergySS;

				}

				// sheen
				if ( NdotL > 0.0 && surf.sheen > 0.0 ) {

					result += attenuation * surf.sheen * ${Dd}( ctx.V, ctx.L, ctx.H, surf );
					attenuation *= mix( 1.0, ${Pd}( ctx.V, ctx.L, surf ), surf.sheen );

				}

				// transmission
				// handles specular reflection and transmission
				if ( surf.transmission > 0.0 ) {

					let matchedIor = ${hi}( surf.eta );

					// anisotropic roughness along tangent, bitangent
					let alphaB = surf.roughness * surf.roughness;
					let alphaT = mix( alphaB, 1.0, surf.anisotropy * surf.anisotropy );
					let alpha = vec2( alphaT, alphaB );

					// multiscatter compensation
					var glassBoost = 0.0;
					if ( matchedIor ) {

						glassBoost = 1.0;

					} else if ( surf.thinWall ) {

						// thin wall halves are reflection-shaped so each is compensated with the conductor albedo at its own roughness.
						glassBoost = 1.0 / max( ${this.turquinTexture.sampleConductorFn}( NdotV, surf.roughness ), 1e-5 );

					} else {

						// volumetric bsdf is scaled by its total reflected + refracted energy
						glassBoost = 1.0 / max( ${this.turquinTexture.sampleTransmissiveFn}( NdotV, surf.roughness, surf.ior, surf.frontFace ), 1e-5 );

					}

					let fresnelCosine = select( ctx.VdotH, NdotV, surf.thinWall );
					let fresnel = ${this.transmissionFresnel}( fresnelCosine, surf );

					if ( NdotL < 0.0 ) {

						var refraction = vec3f( 0.0 );
						if ( surf.thinWall && ! matchedIor ) {

							// evaluate the flipped reflection, compensated at the remapped roughness
							let wiMirror = vec3f( ctx.L.xy, - ctx.L.z );
							let thinWallAlpha = vec2f( ${Gr}( alphaB, surf.ior ) );
							let thinWallEnergySS = max( ${this.turquinTexture.sampleConductorFn}( NdotV, sqrt( thinWallAlpha.x ) ), 1e-5 );
							refraction = fresnel.transmittance * ${this.specularBrdf}( ctx.V, wiMirror, ctx.H, thinWallAlpha ) / thinWallEnergySS;

						} else if ( ! matchedIor ) {

							// The default BTDF contains the plain dielectric Fresnel complement. Replace it
							// with the colored thin-film-aware coefficient shared by sampling and the PDF.
							let dielectricTransmittance = 1.0 - ${xi}( abs( ctx.VdotH ), surf.eta );
							if ( dielectricTransmittance > EPSILON ) {

								refraction = ${this.specularBtdf}( ctx.V, ctx.L, ctx.H, alpha, surf.eta ) *
									fresnel.transmittance / dielectricTransmittance * glassBoost;

							}

						}

						// the refracted half is not attenuated by the layers above
						result += ( 1.0 - surf.metalness ) * surf.transmission * refraction * surf.color;

					} else {

						// the raw single scatter lobe scaled by the glass compensation boost rather
						// than the opaque dielectric boost
						let specular = ${this.specularBrdf}( ctx.V, ctx.L, ctx.H, alpha );
						let dielectricSpecular = specular * glassBoost;

						let reflection = dielectricSpecular * fresnel.reflectance;

						result += attenuation * ( 1.0 - surf.metalness ) * surf.transmission * reflection;

					}

				}

				// specular
				// metallic + dielectric + iridescence
				if ( NdotL > 0.0 ) {

					// anisotropic roughness along tangent, bitangent
					let alphaB = surf.roughness * surf.roughness;
					let alphaT = mix( alphaB, 1.0, surf.anisotropy * surf.anisotropy );
					let alpha = vec2( alphaT, alphaB );

					// Sample the single scatter energy for specular at the given roughness
					let energySS = max( ${this.turquinTexture.sampleConductorFn}( NdotV, surf.roughness ), 1e-5 );
					let specular = ${this.specularBrdf}( ctx.V, ctx.L, ctx.H, alpha );

					// metallic with the multiscatter comp
					let metallicBoost = 1.0 + surf.color * ( 1.0 - energySS ) / energySS;
					let metallicSpecular = specular * metallicBoost;
					var metallicReflectance = ${this.conductorFresnel}( ctx.VdotH, surf.color, vec3f( 1.0 ) );

					// dielectric with the multiscatter comp
					let dielectricBoost = 1.0 + surf.f0 * ( 1.0 - energySS ) / energySS;
					let dielectricSpecular = specular * dielectricBoost;

					// KHR_materials_specular: fold the specular color and intensity into the dielectric f0.
					// Schlick is used on both hit sides, matching Cycles - the opaque specular carries no
					// TIR so the energy removed from the base always matches the energy paid back
					let dielectricF0 = min( surf.f0 * surf.specularColor, vec3f( 1.0 ) );
					let dielectricFr = ${yr}( ctx.VdotH, dielectricF0, vec3f( 1.0 ) );
					var dielectricReflectance = surf.specularIntensity * dielectricFr;

					// iridescence
					var filmFresnelMax = 0.0;
					if ( surf.iridescence > 0.0 ) {

						// the media on either side of the film - air outside and the volume interior
						// as the base on front faces, swapped on back faces so TIR can take effect
						let outsideIor = select( surf.ior, 1.0, surf.frontFace );
						let filmBaseIor = select( 1.0, surf.ior, surf.frontFace );

						let metallicFilmFresnel = ${this.iridescentFresnel}( ctx.VdotH, surf.color, surf.iridescenceIor, outsideIor, surf.iridescenceThickness );
						metallicReflectance = mix( metallicReflectance, metallicFilmFresnel, surf.iridescence );

						let dielectricFilmFresnel = ${this.iridescentFresnel}( ctx.VdotH, vec3f( ${De}( filmBaseIor ) ), surf.iridescenceIor, outsideIor, surf.iridescenceThickness );
						dielectricReflectance = mix( dielectricReflectance, dielectricFilmFresnel, surf.iridescence );
						filmFresnelMax = max( max( dielectricFilmFresnel.r, dielectricFilmFresnel.g ), dielectricFilmFresnel.b );

					}

					let metallic = metallicSpecular * metallicReflectance;
					let dielectric = dielectricSpecular * dielectricReflectance;

					// the energy the specular interface takes from the layers below
					let fresnelEnergySS = ${this.turquinTexture.sampleDielectricFn}( NdotV, surf.roughness, surf.ior ) * dielectricBoost;

					result += attenuation * mix( ( 1.0 - surf.transmission ) * dielectric, metallic, surf.metalness );
					attenuation *= ( 1.0 - surf.metalness ) * mix( 1.0 - fresnelEnergySS, 1.0 - filmFresnelMax, surf.iridescence );

				}

				// diffuse
				if ( NdotL > 0.0 ) {

					// the dielectric base mixes diffuse with transmission - the transmissive half
					// is carried by the glass lobe above
					let diffuseVdotH = sqrt( saturate( 0.5 * ( 1.0 + dot( ctx.V, ctx.L ) ) ) );
					let reflection = ${this.diffuseBrdf}( NdotV, NdotL, diffuseVdotH, surf );
					let diffuse = ( 1.0 - surf.transmission ) * reflection;

					result += attenuation * diffuse;

				}

				return result;

			}

		`;const e=this.getBsdfEvalPdfNode();return R`

			fn bsdfSample( worldWo: vec3f, surf: ${me} ) -> ${$t} {

				var result: ${$t};
				result.color = vec3f( 0.0 );
				result.isTransmissive = false;
				result.direction = vec3f( 0.0 );
				result.pdf = 0.0;

				let wo = normalize( surf.normalInvBasis * worldWo );
				let woClearcoat = normalize( surf.clearcoatInvBasis * worldWo );

				// TODO: mirror bsdfEval's layer structure - the glass layer should own both its
				// reflection and refraction halves
				// lobe selection weights and cumulative bounds in cascade order:
				// clearcoat, specular, transmission, diffuse
				let weights = ${Dn}( wo, wo, woClearcoat, vec3( 0, 0, 1 ), ${Kn}, surf );
				let cdfClearcoat = weights.clearcoat;
				let cdfSpecular = cdfClearcoat + weights.specular;
				let cdfTransmission = cdfSpecular + weights.transmission;
				let cdfTotal = cdfTransmission + weights.diffuse;

				// random samples for lobes
				let lobeSample = ${ct}( ${Lc} ) * cdfTotal;
				let directionUV = ${Ot}( ${Fa} );

				// output
				var wi: vec3f;
				var wh: vec3f;

				// TODO: see if we can clean up these flags so they're not necessary
				var isTransmissionLobe = false;
				var isDeltaTransmission = false;
				var deltaTransmittance = vec3f( 1.0 );
				var deltaProbability = 1.0;
				var isDead = false;

				if ( lobeSample <= cdfClearcoat ) {

					// clearcoat
					let clearcoatAlpha = surf.clearcoatRoughness * surf.clearcoatRoughness;
					let whCoat = ${oi}( woClearcoat, vec2( clearcoatAlpha ), directionUV );
					let wiCoat = - normalize( reflect( woClearcoat, whCoat ) );

					wi = normalize( surf.normalInvBasis * surf.clearcoatBasis * wiCoat );
					wh = normalize( surf.normalInvBasis * surf.clearcoatBasis * whCoat );

					// reflected rays must leave above the geometry surface - flip rays that land
					// below it due to the shading normal. Rays below the shading hemisphere are
					// left as is since their loss is refunded by the energy compensation tables
					let faceNormal = normalize( surf.normalInvBasis * surf.faceNormal );
					let geomDotDir = dot( wi, faceNormal );
					if ( wi.z > 0.0 && geomDotDir < 0.0 ) {

						wi = normalize( wi - 2.0 * geomDotDir * faceNormal );

					}

				} else if ( lobeSample <= cdfSpecular ) {

					// specular
					// anisotropic roughness along tangent, bitangent
					let alphaB = surf.roughness * surf.roughness;
					let alphaT = mix( alphaB, 1.0, surf.anisotropy * surf.anisotropy );
					let alpha = vec2( alphaT, alphaB );

					wh = ${oi}( wo, alpha, directionUV );
					wi = - normalize( reflect( wo, wh ) );

					// reflected rays must leave above the geometry surface - flip rays that land
					// below it due to the shading normal. Rays below the shading hemisphere are
					// left as is since their loss is refunded by the energy compensation tables
					let faceNormal = normalize( surf.normalInvBasis * surf.faceNormal );
					let geomDotDir = dot( wi, faceNormal );
					if ( wi.z > 0.0 && geomDotDir < 0.0 ) {

						wi = normalize( wi - 2.0 * geomDotDir * faceNormal );

					}

				} else if ( lobeSample <= cdfTransmission ) {

					// transmission
					isTransmissionLobe = true;

					// anisotropic roughness along tangent, bitangent
					let alphaB = surf.roughness * surf.roughness;
					let alphaT = mix( alphaB, 1.0, surf.anisotropy * surf.anisotropy );
					let alpha = vec2( alphaT, alphaB );

					// sample the half vector first and select reflection or refraction by the
					// facet fresnel, matching Cycles - total internal reflection drives the
					// fresnel to 1 so TIR facets always reflect with a matching pdf
					wh = ${oi}( wo, alpha, directionUV );

					let fresnelCosine = select( dot( wo, wh ), wo.z, surf.thinWall );
					let fresnel = ${this.transmissionFresnel}( fresnelCosine, surf );

					let fresnelSample = ( lobeSample - cdfSpecular ) / ( cdfTransmission - cdfSpecular );
					let doReflect = fresnelSample < fresnel.reflectProbability;
					if ( doReflect ) {

						wi = - normalize( reflect( wo, wh ) );

					} else if ( ${hi}( surf.eta ) ) {

						// With no IOR boundary, rough transmission collapses to straight-through
						// delta transmission independent of the sampled microfacet.
						wi = - wo;
						wh = vec3f( 0.0, 0.0, 1.0 );
						isDeltaTransmission = true;
						deltaTransmittance = fresnel.transmittance;
						deltaProbability = 1.0 - fresnel.reflectProbability;

					} else if ( surf.thinWall ) {

						// model the double refraction as a single reflection flipped through the
						// surface at the remapped thin wall roughness
						let thinWallAlpha = vec2f( ${Gr}( alphaB, surf.ior ) );
						wh = ${oi}( wo, thinWallAlpha, directionUV );
						wi = - normalize( reflect( wo, wh ) );
						wi = vec3f( wi.xy, - wi.z );

					} else {

						wi = refract( - wo, wh, surf.eta );

					}

					// the facet choice must agree with the resulting hemisphere - reflection above,
					// transmission below. Mismatched samples are dropped since their loss is
					// refunded by the energy compensation tables
					isDead = doReflect != ( wi.z > 0.0 );

				} else if ( lobeSample <= cdfTotal ) {

					// diffuse
					// all diffuse BRDF variants share the EON sampling proposal
					wi = ${Td}( wo, surf.diffuseRoughness, directionUV );
					wh = normalize( wi + wo );

					// reflected rays must leave above the geometry surface - flip rays that land
					// below it due to the shading normal. Rays below the shading hemisphere are
					// left as is since their loss is refunded by the energy compensation tables
					let faceNormal = normalize( surf.normalInvBasis * surf.faceNormal );
					let geomDotDir = dot( wi, faceNormal );
					if ( wi.z > 0.0 && geomDotDir < 0.0 ) {

						wi = normalize( wi - 2.0 * geomDotDir * faceNormal );

					}

				}

				let worldWi = normalize( surf.normalBasis * wi );
				if ( isDeltaTransmission ) {

					// Cycles represents a singular event with a large matching BSDF and PDF. Their
					// ratio preserves throughput while forward MIS correctly gives the event full weight.
					result.color = ( 1.0 - surf.metalness ) * surf.transmission * surf.color *
						deltaTransmittance * ${Xn};
					result.direction = worldWi;
					result.pdf = weights.transmission * deltaProbability * ${Xn};
					result.isTransmissive = dot( worldWi, surf.faceNormal ) < 0.0;

				} else {

					// evaluate the shared eval / pdf function for the sampled direction so the sample
					// and light-sampling paths can never disagree on color or pdf
					result = ${e}( worldWo, worldWi, surf );

				}

				// mismatched glass facets and reflection lobe samples that land below the
				// hemisphere carry no energy - their loss is refunded by the compensation tables
				let invalid = isDead || ( ! isTransmissionLobe && wi.z <= 0.0 );
				result.color *= select( 1.0, 0.0, invalid );

				return result;

			}

		`}getBsdfEvalPdfNode(){if(this._bsdfEvalPdfNode)return this._bsdfEvalPdfNode;this._bsdfEvalFunc||this.getBsdfNode();const e=this._bsdfEvalFunc;return this._bsdfEvalPdfNode=R`

			fn bsdfEvalPdf( worldWo: vec3f, worldWi: vec3f, surf: ${me} ) -> ${$t} {

				var result: ${$t};
				result.color = vec3f( 0.0 );
				result.isTransmissive = false;
				result.direction = worldWi;
				result.pdf = 0.0;

				let wo = normalize( surf.normalInvBasis * worldWo );
				let wi = normalize( surf.normalInvBasis * worldWi );
				let woClearcoat = normalize( surf.clearcoatInvBasis * worldWo );

				let isTransmission = wi.z < 0.0;
				if ( isTransmission && ${hi}( surf.eta ) ) {

					// Delta transmission has no finite solid-angle BSDF or PDF. It is handled
					// explicitly by bsdfSample, matching PBRT-v4's eta == 1 path.
					return result;

				}

				// reconstruct the half vector bsdfSample would have used for this direction -
				// reflections use the standard half vector while refractions use the generalized
				// form scaled by the ior ratio, oriented into the upper hemisphere
				var wh: vec3f;
				if ( ! isTransmission ) {

					wh = normalize( wo + wi );

				} else if ( surf.thinWall ) {

					// thin wall transmission is modeled as a reflection flipped through the surface
					wh = normalize( wo + vec3f( wi.xy, - wi.z ) );

				} else {

					wh = normalize( wi + wo * surf.eta );
					wh *= sign( wh.z );

				}

				let weights = ${Dn}( wo, wo, woClearcoat, vec3( 0, 0, 1 ), ${Kn}, surf );

				// TODO: mirror bsdfEval's layer structure - the glass layer should own both its
				// reflection and refraction halves
				// pdf mixture - every lobe that can produce the direction contributes its share,
				// in the same cascade order and with the same terms as bsdfSample

				// clearcoat
				if ( weights.clearcoat > 0.0 ) {

					// the clearcoat lobe evaluates in its own frame
					let toClearcoatMat = surf.clearcoatInvBasis * surf.normalBasis;
					let wiClearcoat = normalize( toClearcoatMat * wi );
					if ( wiClearcoat.z > 0.0 ) {

						let whClearcoat = normalize( toClearcoatMat * wh );
						let clearcoatAlpha = surf.clearcoatRoughness * surf.clearcoatRoughness;
						result.pdf += weights.clearcoat * ${li}( woClearcoat, whClearcoat, vec2( clearcoatAlpha ) );

					}

				}

				// specular
				if ( weights.specular > 0.0 && wi.z > 0.0 ) {

					// anisotropic roughness along tangent, bitangent
					let alphaB = surf.roughness * surf.roughness;
					let alphaT = mix( alphaB, 1.0, surf.anisotropy * surf.anisotropy );
					let alpha = vec2( alphaT, alphaB );

					result.pdf += weights.specular * ${li}( wo, wh, alpha );

				}

				// transmission
				if ( weights.transmission > 0.0 ) {

					// anisotropic roughness along tangent, bitangent
					let alphaB = surf.roughness * surf.roughness;
					let alphaT = mix( alphaB, 1.0, surf.anisotropy * surf.anisotropy );
					let alpha = vec2( alphaT, alphaB );

					// the glass lobe selects reflection or refraction by the facet fresnel so
					// each side carries the corresponding share of the transmission pdf
					let fresnelCosine = select( dot( wo, wh ), wo.z, surf.thinWall );
					let fresnel = ${this.transmissionFresnel}( fresnelCosine, surf );

					if ( wi.z > 0.0 ) {

						result.pdf += weights.transmission * fresnel.reflectProbability * ${li}( wo, wh, alpha );

					} else if ( surf.thinWall ) {

						// the flipped reflection shares the reflection pdf at the remapped roughness
						let thinWallAlpha = vec2f( ${Gr}( alphaB, surf.ior ) );
						result.pdf += weights.transmission * ( 1.0 - fresnel.reflectProbability ) * ${li}( wo, wh, thinWallAlpha );

					} else {

						result.pdf += weights.transmission * ( 1.0 - fresnel.reflectProbability ) * ${Oa}( wo, wi, wh, alpha, surf.eta );

					}

				}

				// diffuse
				if ( weights.diffuse > 0.0 ) {

					result.pdf += weights.diffuse * ${Id}( wo, wi, surf.diffuseRoughness );

				}

				//

				// construct the scatter context
				var ctx: ${Rn};
				ctx.V = wo;
				ctx.L = wi;
				ctx.H = wh;
				ctx.VdotH = saturate( dot( wo, wh ) );

				// evaluate the bsdf for the direction
				result.color = ${e}( ctx, surf ) * abs( wi.z );

				// a direction crossing below the surface enters or leaves the volume
				result.isTransmissive = isTransmission && dot( worldWi, surf.faceNormal ) < 0.0;

				return result;

			}

		`,this._bsdfEvalPdfNode}}const Lt=new Y,Xi=new oa;class Yn{constructor(e,t){this.key=t,this.renderer=e,this.texture=null,this.hash=null;const i=new Ie(new Uint8Array([255,255,255,255]),1,1);i.minFilter=ue,i.magFilter=ue,this.colorTex=i}dispose(){this.colorTex.dispose(),this.texture?.dispose()}setFromScene(e){const{renderer:t,key:i,colorTex:r}=this;let n=e[i],s="";if(n)n.isColor?(r.image.data[0]=n.r*255,r.image.data[1]=n.g*255,r.image.data[2]=n.b*255,r.image.data[3]=255,n=r,s=r.image.data.join(),r.needsUpdate=s!==this.hash):n.isCubeTexture?(s=null,n=new ud(t).generate(n)):(n=n.clone(),s=n.uuid+"_"+n.version);else{const o=t.getClearAlpha();t.getClearColor(Xi),r.image.data[0]=Xi.r*255,r.image.data[1]=Xi.g*255,r.image.data[2]=Xi.b*255,r.image.data[3]=o*255,n=r,s=r.image.data.join(),r.needsUpdate=s!==this.hash}if(s===null)return this.texture?.dispose(),this.texture=n,this.hash=null,!0;{const o=s!==this.hash;return o&&(this.texture?.dispose(),this.texture=n,this.hash=s),o}}}class Ld{get maxBounces(){return this._pathTracer.maxBounces}set maxBounces(e){this._pathTracer.maxBounces=e,this.reset()}get frameBudget(){return this._pathTracer.frameBudget}set frameBudget(e){this._pathTracer.frameBudget=e}get maxTransparentBounces(){return this._pathTracer.maxTransparentBounces}set maxTransparentBounces(e){this._pathTracer.maxTransparentBounces=e,this.reset()}get maxSamples(){return this._pathTracer.maxSamples}set maxSamples(e){this._pathTracer.maxSamples=e,this._denoiser?.reset()}async getSampleCountsAsync(){const e=this._pathTracer,t=this._lastSampleCounts,i=await e.getSampleCountsAsync();t.min=i.min,t.max=i.max,t.avg=i.avg;const r=this.getRenderTime()/1e3;return t.samplesPerSecond=r>0?t.avg/r:0,{...t}}get transmissiveBackground(){return this._transmissiveBackground}set transmissiveBackground(e){this._transmissiveBackground!==e&&(this._transmissiveBackground=e,this._pathTracer.setTransmissiveBackground(e))}get filterGlossyFactor(){return this._filterGlossyFactor}set filterGlossyFactor(e){this._filterGlossyFactor!==e&&(this._filterGlossyFactor=e,this._pathTracer.setFilterGlossy(e))}get multipleImportanceSampling(){return this._multipleImportanceSampling}set multipleImportanceSampling(e){this._multipleImportanceSampling!==e&&this.setMultipleImportanceSampling(e)}get clampDirect(){return this._clampDirect}set clampDirect(e){e=Math.max(0,e),this._clampDirect!==e&&(this._clampDirect=e,this._pathTracer.setClamping(e,this._clampIndirect))}get clampIndirect(){return this._clampIndirect}set clampIndirect(e){e=Math.max(0,e),this._clampIndirect!==e&&(this._clampIndirect=e,this._pathTracer.setClamping(this._clampDirect,e))}get target(){return this._pathTracer.outputTarget??null}get fadeState(){return this._fadeState}get lowResTarget(){return this._lowResTarget}get lowResMode(){return this._pathTracer.lowResMode}get textureAtlas(){return this._bvhData.textureAtlas}useMegakernel(e){const t=this._pathTracer.maxSamples;this._pathTracer.dispose(),this._pathTracer=e?new Ou(this._renderer):new Gn(this._renderer),this._pathTracer.maxSamples=t,this._pathTracer.setBVHData(this._bvhData),this._pathTracer.setMaterial(this.material),this._pathTracer.setRandom(this.random),this._pathTracer.setMultipleImportanceSampling(this.multipleImportanceSampling),this._pathTracer.setTransmissiveBackground(this._transmissiveBackground),this._pathTracer.setFilterGlossy(this._filterGlossyFactor),this._pathTracer.setClamping(this._clampDirect,this._clampIndirect),this.setCamera(this.camera),this._pathTracer.setEnvironment(this._environmentCache.texture),this._pathTracer.setBackground(this._backgroundCache.texture),this.updateEnvironment(),this.updateLights()}constructor(e){this._renderer=e,this._timer=new Oo,this._environmentCache=new Yn(e,"environment"),this._backgroundCache=new Yn(e,"background"),this._resetTime=-1,this._fadeState=0,this._lastSampleCounts={min:0,max:0,avg:0,samplesPerSecond:0},this._size=new Y,this._blitQuad=new ai(new Sc),this._lowResTarget=new re(1,1),this._lowResTarget.type=Xe,this._lowResTarget.generateMipmaps=!1,this._pathTracer=new Gn(e),this._denoiser=null,this._upscaler=null,this.minSamples=1,this.renderDelay=500,this.fadeDuration=500,this.dynamicLowRes=!0,this.lowResScale=.1,this.renderScale=1,this.synchronizeRenderSize=!0,this.generateMissingAttributes=!0,this.commonAttributes=["normal","tangent"],this.stableNoise=!0,this.pause=!1,this.filterGlossyFactor=1,this._clampDirect=0,this._clampIndirect=10,this.multipleImportanceSampling=!0,this.transmissiveBackground=Es,this.random=Tu,this.material=new Ad,this._invViewProjectionMatrix=$(new U),this._cameraRayFnHandle=null,this.setMaterial(this.material),this.setRandom(this.random),this.setScene(new Uo,new ca)}setMultipleImportanceSampling(e){this._multipleImportanceSampling=e,this._pathTracer.setMultipleImportanceSampling(e),this.reset()}setDenoiser(e){this._denoiser?.reset(),this._denoiser=e,e&&(e.init(this._renderer),e.setScene(this.scene,this.camera))}setUpscaler(e){this._upscaler=e,e&&e.init(this._renderer)}setScene(e,t){e.updateMatrixWorld(!0),t.updateMatrixWorld(),e.traverse(r=>{this.generateMissingAttributes&&r.geometry?.isBufferGeometry&&xd(r.geometry,this.commonAttributes),r.isSkinnedMesh?(r.boundsTree?r.boundsTree.refit():r.boundsTree=new ui(r,{strategy:Vt,targetLeafSize:5,indirect:!0}),r.boundingBox===null&&(r.boundingBox=new xe),r.boundsTree.getBoundingBox(r.boundingBox)):r.isMesh&&(r.geometry.boundsTree||(r.geometry.boundsTree=new ut(r.geometry,{strategy:Vt,targetLeafSize:5})))});const i=new pd(e);i.update(),i.textureAtlas.setTextures(this._renderer,i.textures),this._bvhData&&(this._bvhData.dispose(),this._bvhData.textureAtlas.dispose()),this.scene=e,this._bvhData=i,this._pathTracer.setBVHData(i),this.setCamera(t),this.updateEnvironment(),this.updateLights(),this._denoiser?.setScene(e,t)}getMaterial(){return this.material}setMaterial(e){this.material=e,this._pathTracer.setMaterial(e),this.reset()}setRandom(e){this.random=e,this._pathTracer.setRandom(e),this.reset()}setCamera(e){if(this.camera=e,e.getCameraRayFn)this._cameraRayFnHandle=e.getCameraRayFn();else{const t=this._invViewProjectionMatrix;this._cameraRayFnHandle={update:()=>(e.coordinateSystem=bs,e.updateMatrixWorld(),(e.isOrthographicCamera||e.isPerspectiveCamera)&&e.updateProjectionMatrix(),t.value.multiplyMatrices(e.matrixWorld,e.projectionMatrixInverse),!1),fn:R`
					fn getCameraRay( uv: vec2f, resolution: vec2f, ray: ptr<function, ${V}> ) -> bool {

						let ndc = uv * 2.0 - vec2f( 1.0 );
						*ray = ${xr}( ndc, ${t} );
						return true;

					}
				`}}this._bvhData.fns.getCameraRay=this._cameraRayFnHandle.fn,this._cameraRayFnHandle.update(),this._pathTracer.rebuild(),this.reset()}updateMaterials(){const{_bvhData:e,_renderer:t}=this;e.updateMaterials(),e.textureAtlas.setTextures(t,e.textures),this.reset()}updateTransforms(){this.scene.updateMatrixWorld(!0),this._bvhData.updateTransforms(),this.reset()}updateCamera(){const{_cameraRayFnHandle:e,_pathTracer:t}=this;e.update()&&t.rebuild(),this.reset()}updateEnvironment(){const{_pathTracer:e,scene:t,_environmentCache:i,_backgroundCache:r}=this;i.setFromScene(t)&&e.setEnvironment(i.texture),r.setFromScene(t)&&e.setBackground(r.texture),e.setEnvironmentParams(t.environmentIntensity,t.environmentRotation),e.setBackgroundParams(t.backgroundIntensity,t.backgroundRotation,t.backgroundBlurriness),this.reset()}updateLights(){const{_pathTracer:e,scene:t}=this,i=fd(t);e.setLights(i),this.reset()}setSize(e,t){(this._size.x!==e||this._size.y!==t)&&(this._size.set(e,t),this.reset())}reset(){this._pathTracer.reset(),this._denoiser?.reset(),this._resetTime=-1,this._fadeState=0,this._timer.update(),this._lastSampleCounts={min:0,max:0,avg:0,samplesPerSecond:0},this.stableNoise&&this._pathTracer.resetSeed()}renderSample(){const e=this._renderer,t=this._size,i=this._blitQuad,r=this._pathTracer,n=this._lowResTarget,s=this._timer,{renderDelay:o,dynamicLowRes:l,synchronizeRenderSize:d,renderScale:c,lowResScale:u,minSamples:h,maxSamples:f}=this;if(s.update(),!this._renderer._initialized)return;this.material.initialized||(this.material.init(e),this.material.initialized=!0);let p=1e3*s.getDelta();const y=this._resetTime===-1;y&&(this._resetTime=0,p=0),this._resetTime+=p;const v=e.getRenderTarget(),w=e.autoClear;if(d){e.getDrawingBufferSize(Lt);const D=Math.floor(c*Lt.x),C=Math.floor(c*Lt.y);this.setSize(D,C)}let{width:m,height:x}=t;const g=this._resetTime<o||y&&l&&h!==0;g&&(m=Math.ceil(u*m),x=Math.ceil(u*x)),r.getSize(Lt),(Lt.x!==m||Lt.y!==x)&&(!g&&l&&(n.setSize(Math.ceil(u*m),Math.ceil(u*x)),e.copyTextureToTexture(r.outputTarget,n)),r.setSize(m,x)),!this.pause&&(!g||g&&l)&&(r.lowResMode=g,r.update());const S=this._denoiser,_=this._upscaler,I=!!S&&!S.complete&&!S.running&&f>0;g||((this._fadeState<1&&h>0||I)&&this.getSampleCountsAsync(),this._lastSampleCounts.min>=h&&(this._fadeState+=p/this.fadeDuration,this._fadeState=Math.min(1,this._fadeState)||1));const P=g&&l?1:this._fadeState;let T=r.outputTarget;S&&!g&&(I&&this._lastSampleCounts.min>=f&&S.update(r.outputTarget),T=S.texture??T),_&&!g&&(T=_.upscale(T,this.camera),e.setRenderTarget(v)),e.autoClear=l?!0:P===1,i.material.transition=l?P:1,i.material.opacity=l?1:P,i.material.fromTexture=n,i.material.texture=T,i.render(e),e.autoClear=w,e.setRenderTarget(v)}renderDebugBounds(e={}){const{displayTLAS:t=!0,displayBLAS:i=!0,stopAtSurface:r=!1,saturationCount:n=64}=e,s=this._renderer,o=this.camera;if(!s._initialized)return;o.updateMatrixWorld(),(this._debugBoundsQuad===void 0||this._debugBoundsData!==this._bvhData)&&this._buildDebugBoundsQuad();const l=this._debugBoundsUniforms;l.cameraToModelMatrix.value.copy(o.matrixWorld),l.inverseProjectionMatrix.value.copy(o.projectionMatrixInverse),l.displayTLAS.value=t?1:0,l.displayBLAS.value=i?1:0,l.stopAtSurface.value=r?1:0,l.saturationCount.value=n;const d=s.getRenderTarget(),c=s.autoClear,u=s.toneMapping;s.setRenderTarget(null),s.autoClear=!0,s.toneMapping=fi,this._debugBoundsQuad.render(s),s.setRenderTarget(d),s.autoClear=c,s.toneMapping=u}_buildDebugBoundsQuad(){const e=this._bvhData,t=Tc(e),i=new hr;i.colorNode=t(fr(pr())),this._debugBoundsQuad===void 0?this._debugBoundsQuad=new ai(i):(this._debugBoundsQuad.material.dispose(),this._debugBoundsQuad.material=i),this._debugBoundsUniforms=t.uniforms,this._debugBoundsData=e}renderTextureAtlas(e=0){const t=this._renderer;this._atlasDebugQuad||(this._atlasDebugQuad=new ai(new md));const i=this._atlasDebugQuad;i.material.texture=this.textureAtlas.texture,i.material.layer=e,t.setRenderTarget(null),i.render(t)}renderSampleDensity(){const e=this._renderer;if(!e._initialized)return;this.getSampleCountsAsync(),this._sampleDensityQuad||(this._sampleDensityQuad=new ai(new gd));const t=e.toneMapping;e.toneMapping=fi;const i=this._sampleDensityQuad;i.material.texture=this._pathTracer.sampleCountTarget,i.material.minCount=this._lastSampleCounts.min,i.material.maxCount=this._lastSampleCounts.max,e.setRenderTarget(null),i.render(e),e.toneMapping=t}dispose(){this._pathTracer.dispose(),this._denoiser?.dispose(),this._upscaler?.dispose(),this._bvhData.dispose(),this._bvhData.textureAtlas.dispose(),this._environmentCache.dispose(),this._backgroundCache.dispose(),this._lowResTarget.dispose(),this._blitQuad.dispose(),this._blitQuad.material.dispose(),this._atlasDebugQuad?.dispose(),this._atlasDebugQuad?.material.dispose(),this._sampleDensityQuad?.dispose(),this._sampleDensityQuad?.material.dispose(),this._debugBoundsQuad!==void 0&&(this._debugBoundsQuad.dispose(),this._debugBoundsQuad.material.dispose())}getRenderTime(){return this._resetTime}}class Fd{get texture(){return this._texture}get complete(){return this._complete}get running(){return this._running}constructor(e={}){const{initUNetFromURL:t,auxWeightsUrl:i,colorWeightsUrl:r,useAuxiliaryBuffers:n=!0,maxTileSize:s=null,dynamicTile:o=null}=e;if(!t)throw new Error('OIDNDenoiser: "initUNetFromURL" from "oidn-web" must be provided.');this.initUNetFromURL=t,this.auxWeightsUrl=i,this.colorWeightsUrl=r,this.useAuxiliaryBuffers=n,this.maxTileSize=s,this.dynamicTile=o,this.renderer=null,this.scene=null,this.camera=null,this._texture=null,this._running=!1,this._complete=!1,this._abort=null,this._requestId=0,this._unets={aux:null,color:null},this._resultPipeline=null,this._rawTexture=null,this._auxTarget=null}init(e){this.renderer=e}setScene(e,t){this.scene=e,this.camera=t}update(e){if(this._complete||this._running)return this._texture;let t=null,i=null;if(this.useAuxiliaryBuffers){const r=this._renderAuxiliaryBuffers(e.width,e.height);t=r.textures[0],i=r.textures[1]}return this.denoise(e,t,i),this._texture}async denoise(e,t=null,i=null){if(this._complete||this._running)return;this._running=!0;const r=!!(t&&i),n=++this._requestId;let s;try{s=await this._initUNet(r)}catch(h){throw this._running=!1,h}if(n!==this._requestId||!this._running)return;const{renderer:o}=this,l=o.backend;o.initTexture(e);const{width:d,height:c}=e,u={color:{data:l.get(e).texture,width:d,height:c},progress:h=>this._copyOutputToTexture(h,d,c),done:h=>{this._copyOutputToTexture(h,d,c),this._running=!1,this._complete=!0,this._abort=null}};r&&(o.initTexture(t),o.initTexture(i),u.albedo={data:l.get(t).texture,width:d,height:c},u.normal={data:l.get(i).texture,width:d,height:c}),this._abort=s.tileExecute(u)}reset(){this._abort?.(),this._abort=null,this._texture?.dispose(),this._texture=null,this._rawTexture?.destroy(),this._rawTexture=null,this._running=!1,this._complete=!1}dispose(){this.reset(),this._auxTarget?.dispose(),this._auxTarget=null;for(const e in this._unets)this._unets[e]?.then(t=>t.dispose()),this._unets[e]=null}_renderAuxiliaryBuffers(e,t){const{renderer:i,scene:r,camera:n}=this;this._auxTarget||(this._auxTarget=new aa(1,1,{count:2,type:ua,minFilter:Ve,magFilter:Ve,samples:4}),this._auxTarget.textures[0].name="output",this._auxTarget.textures[1].name="normal");const s=this._auxTarget;s.setSize(e,t);const o=i.getRenderTarget(),l=i.getMRT(),d=i.toneMapping;return i.toneMapping=fi,i.setRenderTarget(s),i.setMRT(Wo({output:qo,normal:vs(Go.mul(.5).add(.5),1)})),i.render(r,n),i.setMRT(l),i.setRenderTarget(o),i.toneMapping=d,s}_initUNet(e){const t=e?"aux":"color";return this._unets[t]||(this._unets[t]=(async()=>{const i=this.renderer.backend.device,r=e?this.auxWeightsUrl:this.colorWeightsUrl;if(!r)throw new Error(`OIDNDenoiser: no ${e?"auxWeightsUrl":"colorWeightsUrl"} was provided.`);const n={aux:e,hdr:!0};return this.maxTileSize!==null&&(n.maxTileSize=this.maxTileSize),this.dynamicTile!==null&&(n.dynamicTile=this.dynamicTile),this.initUNetFromURL(r,{device:i,adapterInfo:i.adapterInfo},n)})()),this._unets[t]}_copyOutputToTexture(e,t,i){const r=this.renderer.backend.device;if(!this._resultPipeline){const l=r.createShaderModule({code:`
					@group( 0 ) @binding( 0 ) var<storage, read> src : array<vec4f>;
					@group( 0 ) @binding( 1 ) var dst : texture_storage_2d<rgba16float, write>;

					@compute @workgroup_size( 8, 8 )
					fn main( @builtin( global_invocation_id ) gid : vec3u ) {

						let dims = textureDimensions( dst );
						if ( gid.x >= dims.x || gid.y >= dims.y ) {

							return;

						}

						textureStore( dst, gid.xy, src[ gid.y * dims.x + gid.x ] );

					}
				`});this._resultPipeline=r.createComputePipeline({layout:"auto",compute:{module:l,entryPoint:"main"}})}(!this._rawTexture||this._rawTexture.width!==t||this._rawTexture.height!==i)&&(this._rawTexture?.destroy(),this._rawTexture=r.createTexture({size:[t,i],format:"rgba16float",usage:GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.TEXTURE_BINDING}),this._texture?.dispose(),this._texture=new jo(this._rawTexture),this._texture.image={width:t,height:i});const n=r.createBindGroup({layout:this._resultPipeline.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:e.data}},{binding:1,resource:this._rawTexture.createView()}]}),s=r.createCommandEncoder(),o=s.beginComputePass();o.setPipeline(this._resultPipeline),o.setBindGroup(0,n),o.dispatchWorkgroups(Math.ceil(t/8),Math.ceil(i/8)),o.end(),r.queue.submit([s.finish()])}}const si=new Y;class Bd{constructor(e={}){const{Upscaler:t,sharpness:i=1}=e;if(!t)throw new Error('FSRUpscaler: the "Upscaler" class from "@pmndrs/upscaler" must be provided.');this.Upscaler=t,this.sharpness=i,this.renderer=null,this._upscaler=null}init(e){this.renderer=e,this._upscaler?.dispose(),this._upscaler=new this.Upscaler({renderer:e}),this._upscaler.init()}upscale(e,t){const{renderer:i,_upscaler:r}=this;return i.initTexture(e),i.getDrawingBufferSize(si),(r.displayWidth!==si.x||r.displayHeight!==si.y||r.renderWidth!==e.width||r.renderHeight!==e.height)&&r.configure({displayWidth:si.x,displayHeight:si.y,renderWidth:e.width,renderHeight:e.height,path:"spatial"}),r.settings.sharpness=this.sharpness,r.dispatch({color:e},t),r.outputTexture}dispose(){this._upscaler?.dispose(),this._upscaler=null}}class $d extends Qo{constructor(){super(),this.isEquirectCamera=!0}}$d.prototype.getCameraRayFn=function(){const e=$(new U);return{fn:R`
		fn getCameraRay( uv: vec2f, resolution: vec2f, ray: ptr<function, ${V}> ) -> bool {

			// screen uv to spherical direction, matching three.js' equirect orientation
			let theta = ( uv.x - 0.5 ) * 2.0 * ${kt};
			let phi = ( 1.0 - uv.y ) * ${kt};
			let sinPhi = sin( phi );
			let direction = vec3f( sinPhi * cos( theta ), cos( phi ), sinPhi * sin( theta ) );

			// equirect ignores the projection - orient by the camera world matrix and place the origin.
			// there is no projection far plane, so the trace distance is unbounded
			ray.origin = ( ${e} * vec4f( 0.0, 0.0, 0.0, 1.0 ) ).xyz;
			ray.direction = ( ${e} * vec4f( direction, 0.0 ) ).xyz;
			ray.maxDist = 0.0;
			return true;

		}
	`,update:()=>(e.value.copy(this.matrixWorld),!1)}};class Nd extends ca{set bokehSize(e){this.fStop=this.getFocalLength()/e}get bokehSize(){return this.getFocalLength()/this.fStop}constructor(...e){super(...e),this.fStop=1.4,this.apertureBlades=0,this.apertureRotation=0,this.focusDistance=25,this.anamorphicRatio=1}copy(e,t){return super.copy(e,t),this.fStop=e.fStop,this.apertureBlades=e.apertureBlades,this.apertureRotation=e.apertureRotation,this.focusDistance=e.focusDistance,this.anamorphicRatio=e.anamorphicRatio,this}}const Ed=R`
	fn sampleCircle( uv: vec2f ) -> vec2f {

		let angle = 2.0 * ${kt} * uv.x;
		let radius = sqrt( uv.y );
		return vec2f( cos( angle ), sin( angle ) ) * radius;

	}
`,zd=R`
	fn sampleTriangle( a: vec2f, b: vec2f, c: vec2f, rIn: vec2f ) -> vec2f {

		let e1 = a - b;
		let e2 = c - b;

		var r = rIn;
		if ( r.x + r.y > 1.0 ) {

			r = vec2f( 1.0 ) - r;

		}

		return e1 * r.x + e2 * r.y;

	}
`,kd=R`
	fn sampleRegularPolygon( sidesIn: i32, uvw: vec3f ) -> vec2f {

		let sides = max( sidesIn, 3 );
		let anglePerSegment = 2.0 * ${kt} / f32( sides );
		let segment = floor( f32( sides ) * uvw.x );

		let angle1 = anglePerSegment * segment;
		let angle2 = angle1 + anglePerSegment;
		let a = vec2f( sin( angle1 ), cos( angle1 ) );
		let b = vec2f( 0.0, 0.0 );
		let c = vec2f( sin( angle2 ), cos( angle2 ) );

		return ${zd}( a, b, c, uvw.yz );

	}
`,Vd=R`
	fn sampleAperture( blades: i32, uvw: vec3f ) -> vec2f {

		if ( blades == 0 ) {

			return ${Ed}( uvw.xy );

		} else {

			return ${kd}( blades, uvw );

		}

	}
`,Hd=R`
	fn rotateVector( v: vec2f, t: f32 ) -> vec2f {

		let vc = cos( t );
		let vs = sin( t );
		return vec2f( v.x * vc - v.y * vs, v.x * vs + v.y * vc );

	}
`;Nd.prototype.getCameraRayFn=function(){const e=$(new U),t=$(new U),i=$(0),r=$(0),n=$(0,"int"),s=$(0),o=$(1);return{fn:R`
		fn getCameraRay( uv: vec2f, resolution: vec2f, ray: ptr<function, ${V}> ) -> bool {

			// base ray
			let ndc = uv * 2.0 - vec2f( 1.0 );
			*ray = ${xr}( ndc, ${e} );

			// camera state
			let forward = normalize( ( ${t} * vec4f( 0.0, 0.0, - 1.0, 0.0 ) ).xyz );
			let cameraOrigin = ( ${t} * vec4f( 0.0, 0.0, 0.0, 1.0 ) ).xyz;

			// depth of field
			// measure focus distance from the camera origin along the optical axis so the focal
			// surface is a flat plane perpendicular to the camera forward vector rather than a sphere
			let focalPoint = cameraOrigin + ray.direction * ( ${i} / dot( ray.direction, forward ) );
			let nearDistance = dot( ray.origin - cameraOrigin, forward );

			// sample the aperture shape
			let shapeUVW = ${Ms}( ${Fc} );
			var apertureSample = ${Vd}( ${n}, shapeUVW );
			apertureSample *= ${r} * 0.5 * 1e-3;

			// rotate + squash the sample for anamorphic apertures
			apertureSample =
				${Hd}( apertureSample, ${s} )
				* vec2f( ${o}, 1.0 / ${o} );

			// aim from the aperture through the focal point, starting on the near plane like the base ray
			ray.origin = cameraOrigin + ( ${t} * vec4f( apertureSample, 0.0, 0.0 ) ).xyz;
			ray.direction = normalize( focalPoint - ray.origin );
			ray.origin += ray.direction * ( nearDistance / dot( ray.direction, forward ) );

			return true;

		}
	`,update:()=>(this.coordinateSystem=bs,this.updateMatrixWorld(),this.updateProjectionMatrix(),e.value.multiplyMatrices(this.matrixWorld,this.projectionMatrixInverse),t.value.copy(this.matrixWorld),i.value=this.focusDistance,r.value=this.bokehSize,n.value=this.apertureBlades,s.value=this.apertureRotation,o.value=this.anamorphicRatio,!1)}};Ko.prototype.getCameraRayFn=function(){const e={fn:null,update:null},t=Xo(0),i=rr([],"mat4"),r=rr([],"vec4");return e.fn=R`
		fn getCameraRay( uv: vec2f, resolution: vec2f, ray: ptr<function, ${V}> ) -> bool {

			let pixel = uv * resolution;

			for ( var i = 0u; i < ${t}u; i ++ ) {

				let viewport = ${r}[ i ];
				let viewportMax = viewport.xy + viewport.zw;
				if ( all( pixel >= viewport.xy ) && all( pixel < viewportMax ) ) {

					let cameraUv = ( pixel - viewport.xy ) / viewport.zw;
					let ndc = cameraUv * 2.0 - vec2f( 1.0 );
					*ray = ${xr}( ndc, ${i}[ i ] );
					return true;

				}

			}

			return false;

		}
	`,e.update=()=>{const{cameras:n}=this,s=t.node.value!==n.length;for(t.node.value=n.length;r.array.length<n.length;)r.array.push(new lt),i.array.push(new U);i.array.length=n.length,r.array.length=n.length;for(let o=0;o<n.length;o++){const l=n[o],d=l.viewport;l.coordinateSystem=bs,l.updateMatrixWorld(),l.updateProjectionMatrix(),i.array[o].multiplyMatrices(l.matrixWorld,l.projectionMatrixInverse),r.array[o].copy(d)}return s},e};var Od=Object.defineProperty,Ud=(a,e,t)=>e in a?Od(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t,L=(a,e,t)=>Ud(a,typeof e!="symbol"?e+"":e,t);const ho=class fo{constructor(e,t,i,r={}){L(this,"label"),L(this,"pipeline"),L(this,"metadata"),L(this,"_device"),this._device=e,this.label=t,this.metadata=Object.freeze({shaderKey:r.shaderKey??`baseline:${t}`,constants:Object.freeze({...r.constants}),assembledChunks:Object.freeze([...r.assembledChunks??[]])});const n=e.createShaderModule({label:`upscale-${t}`,code:i});this.pipeline=e.createComputePipeline({label:`upscale-${t}`,layout:"auto",compute:{module:n,entryPoint:"main",constants:r.constants}})}createBindGroup(e){return this._device.createBindGroup({label:`upscale-${this.label}`,layout:this.pipeline.getBindGroupLayout(0),entries:e.map((t,i)=>({binding:i,resource:t}))})}dispatch(e,t,i,r){const n=fo.WORKGROUP_SIZE;e.setPipeline(this.pipeline),e.setBindGroup(0,t),e.dispatchWorkgroups(Math.ceil(i/n),Math.ceil(r/n))}};L(ho,"WORKGROUP_SIZE",8);let Fe=ho;const po=class fs{constructor(e){L(this,"buffer"),L(this,"_data",new ArrayBuffer(fs.SIZE)),L(this,"_f32",new Float32Array(this._data)),L(this,"_u32",new Uint32Array(this._data)),L(this,"_device"),this._device=e,this.buffer=e.createBuffer({label:"upscale-constants",size:fs.SIZE,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST})}setRenderSize(e,t){this._f32[0]=e,this._f32[1]=t,this._f32[4]=1/e,this._f32[5]=1/t}setDisplaySize(e,t){this._f32[2]=e,this._f32[3]=t,this._f32[6]=1/e,this._f32[7]=1/t}setJitter(e,t,i,r){this._f32[8]=e,this._f32[9]=t,this._f32[10]=i,this._f32[11]=r}setMotionScale(e,t){this._f32[12]=e,this._f32[13]=t}setDepthNearFar(e,t){this._f32[14]=e,this._f32[15]=t}setSharpness(e){this._f32[16]=e}setMaxAccumulation(e){this._f32[17]=e}setExposure(e){this._f32[18]=e}setDeltaTime(e){this._f32[19]=e}setFlags(e){this._u32[20]=e}setFrameIndex(e){this._u32[21]=e}setDebugMode(e){this._u32[22]=e}upload(){this._device.queue.writeBuffer(this.buffer,0,this._data)}dispose(){this.buffer.destroy()}};L(po,"SIZE",256);let Wd=po;const ps=class Ji{constructor(e){if(L(this,"enabled"),L(this,"_device"),L(this,"_slots",[]),L(this,"_active",null),L(this,"_results",new Map),L(this,"_samples",[]),L(this,"_nextFrameTag",null),L(this,"_sequence",0),L(this,"_latestCompletedSequence",-1),L(this,"_epoch",0),L(this,"_authoritative",!1),L(this,"_authoritativeError",null),L(this,"_disposed",!1),this._device=e,this.enabled=e.features.has("timestamp-query"),!this.enabled)return;const t=Ji.MAX_PASSES*2;for(let i=0;i<Ji.SLOT_COUNT;i++)this._slots.push({querySet:e.createQuerySet({label:`upscale-timer-${i}`,type:"timestamp",count:t}),resolveBuffer:e.createBuffer({label:`upscale-timer-resolve-${i}`,size:t*8,usage:GPUBufferUsage.QUERY_RESOLVE|GPUBufferUsage.COPY_SRC}),readBuffer:e.createBuffer({label:`upscale-timer-read-${i}`,size:t*8,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ}),labels:[],frameTag:-1,sequence:-1,epoch:0,state:"idle",pending:null})}setNextFrameTag(e){this._nextFrameTag=e}setAuthoritative(e){if(this._authoritative=e,e&&!this.enabled)throw new Error("Authoritative benchmark timing requires timestamp-query support.")}beginFrame(){if(this._active=null,this._throwAuthoritativeError(),!this.enabled){if(this._authoritative)throw new Error("Authoritative benchmark timing requires timestamp-query support.");return}const e=this._slots.find(t=>t.state==="idle");if(!e){if(this._authoritative)throw new Error("No fresh GPU timestamp readback slot is available.");return}e.labels=[],e.frameTag=this._nextFrameTag??this._sequence,e.sequence=this._sequence++,e.epoch=this._epoch,e.state="encoding",this._nextFrameTag=null,this._active=e}passDescriptor(e){const t=this._active;if(!t)return;if(t.labels.length>=Ji.MAX_PASSES){if(this._authoritative)throw new Error("GPU timer pass capacity exceeded.");return}const i=t.labels.length;return t.labels.push(e),{querySet:t.querySet,beginningOfPassWriteIndex:i*2,endOfPassWriteIndex:i*2+1}}resolve(e){const t=this._active;if(!t||t.labels.length===0)return;const i=t.labels.length*2;e.resolveQuerySet(t.querySet,0,i,t.resolveBuffer,0),e.copyBufferToBuffer(t.resolveBuffer,0,t.readBuffer,0,i*8)}readback(){const e=this._active;if(this._active=null,!e)return;if(e.labels.length===0){if(e.state="idle",this._authoritative)throw new Error("Authoritative GPU frame contained no timed passes.");return}const t=[...e.labels],i=e.frameTag,r=e.sequence,n=e.epoch,s=this._authoritative,o=t.length*2*8;e.state="pending",e.pending=e.readBuffer.mapAsync(GPUMapMode.READ,0,o).then(()=>{const l=new BigUint64Array(e.readBuffer.getMappedRange(0,o)),d=t.map((u,h)=>({label:u,milliseconds:Number(l[h*2+1]-l[h*2])/1e6}));if(e.readBuffer.unmap(),n!==this._epoch||this._disposed||(this._samples.push({frameTag:i,sequence:r,passes:d}),r<=this._latestCompletedSequence))return;this._latestCompletedSequence=r;const c=new Map(this._results);for(const u of d)c.set(u.label,u.milliseconds);this._results=c}).catch(l=>{s&&n===this._epoch&&!this._disposed&&(this._authoritativeError=l instanceof Error?l:new Error(`Authoritative GPU timestamp readback failed: ${String(l)}`))}).finally(()=>{e.pending=null,e.state="idle"})}async waitForAvailableSlot(){if(this._throwAuthoritativeError(),!this.enabled){if(this._authoritative)throw new Error("Authoritative benchmark timing requires timestamp-query support.");return}for(;!this._slots.some(e=>e.state==="idle");){const e=this._slots.flatMap(t=>t.pending?[t.pending]:[]);if(e.length===0)throw new Error("GPU timer slots are unavailable without readbacks.");await Promise.race(e),this._throwAuthoritativeError()}}async drain(){if(this.enabled){for(await this._device.queue.onSubmittedWorkDone();this._slots.some(e=>e.pending);){const e=this._slots.flatMap(t=>t.pending?[t.pending]:[]);await Promise.all(e)}this._throwAuthoritativeError()}}takeSamples(){const e=this._samples.sort((t,i)=>t.sequence-i.sequence);return this._samples=[],e}reset(){this._epoch++,this._active=null,this._results=new Map,this._samples=[],this._nextFrameTag=null,this._latestCompletedSequence=-1,this._authoritativeError=null;for(const e of this._slots)e.state==="encoding"&&(e.state="idle"),e.labels=[]}get timings(){return this._results}_throwAuthoritativeError(){if(!this._authoritative||!this._authoritativeError)return;const e=this._authoritativeError;throw this._authoritativeError=null,new Error("Authoritative GPU timestamp readback failed.",{cause:e})}dispose(){this._disposed=!0,this._epoch++;for(const e of this._slots)e.querySet.destroy(),e.resolveBuffer.destroy(),e.readBuffer.destroy();this._slots.length=0}};L(ps,"MAX_PASSES",16),L(ps,"SLOT_COUNT",8);let qd=ps;function Gd(a){const e=a.backend,t=e?.device;if(!t)throw new Error("@pmndrs/upscaler: renderer has no GPUDevice. Await renderer.init() and ensure the WebGPU backend is active (not the WebGL fallback).");return t}function be(a,e){var t;const i=(t=a.backend.get(e))==null?void 0:t.texture;if(!i)throw new Error(`@pmndrs/upscaler: no GPUTexture behind "${e.name||e.uuid}". Render to it once or call renderer.initTexture(texture) before dispatching.`);return i}function Zn(a,e){let t=0,i=1/e,r=a;for(;r>0;)t+=r%e*i,r=Math.floor(r/e),i/=e;return t}function Jn(a){const e=[];for(let t=1;t<=a;t++)e.push([Zn(t,2)-.5,Zn(t,3)-.5]);return e}function ea(a){return Math.max(1,Math.round(8*a*a))}class jd{constructor(e){L(this,"_sequence"),L(this,"_index",0),this._sequence=Jn(ea(e))}get phaseCount(){return this._sequence.length}get current(){return this._sequence[this._index%this._sequence.length]}get previous(){const e=(this._index+this._sequence.length-1)%this._sequence.length;return this._sequence[e]}advance(){this._index=(this._index+1)%this._sequence.length}reset(){this._index=0}setRatio(e){this._sequence=Jn(ea(e)),this._index=0}}function Qd(a,e,t,i,r){const n=a.view,s={camera:a,view:n?{...n}:null};if(n!=null&&n.enabled)n.offsetX+=e*n.width/i,n.offsetY+=t*n.height/r;else{const o=n??{enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};o.enabled=!0,o.fullWidth=i,o.fullHeight=r,o.offsetX=e,o.offsetY=t,o.width=i,o.height=r,a.view=o}return a.updateProjectionMatrix(),s}function Kd(a){const{camera:e,view:t}=a;t===null?e.view=null:e.view?Object.assign(e.view,t):e.view={...t},e.updateProjectionMatrix()}var nt=(a=>(a.NativeAA="native-aa",a.Quality="quality",a.Balanced="balanced",a.Performance="performance",a.UltraPerformance="ultra-performance",a))(nt||{}),ms=(a=>(a[a.None=0]="None",a[a.MotionVectors=1]="MotionVectors",a[a.Disocclusion=2]="Disocclusion",a[a.Depth=3]="Depth",a[a.AccumulationAge=4]="AccumulationAge",a[a.Locks=5]="Locks",a[a.Exposure=6]="Exposure",a[a.ShadingChange=7]="ShadingChange",a[a.Reactivity=8]="Reactivity",a))(ms||{});const Xd={[nt.NativeAA]:1,[nt.Quality]:1.5,[nt.Balanced]:1.7,[nt.Performance]:2,[nt.UltraPerformance]:3};function Yd(a,e,t){return{width:Math.max(1,Math.floor(a/t)),height:Math.max(1,Math.floor(e/t))}}function Zd(a){return Xd[a]}const ta=1,Jd=2,eh=4,th=8,ih=32,rh=64,sh=128,nh=256,ah=512,oh=1024,Me=`
struct FsrConstants {
    renderSize      : vec2f,  // offset  0 — jittered render resolution (px)
    displaySize     : vec2f,  // offset  8 — output resolution (px)
    renderSizeInv   : vec2f,  // offset 16
    displaySizeInv  : vec2f,  // offset 24
    jitter          : vec2f,  // offset 32 — current sub-pixel offset (render px, top-left origin)
    jitterPrev      : vec2f,  // offset 40
    motionScale     : vec2f,  // offset 48 — NDC velocity delta -> UV delta (0.5, -0.5)
    depthNearFar    : vec2f,  // offset 56 — camera near/far for linearization
    sharpness       : f32,    // offset 64 — RCAS attenuation 0..1 (1 = sharpest)
    maxAccumulation : f32,    // offset 68 — max history sample count
    exposure        : f32,    // offset 72 — pre-exposure before invertible tonemap
    deltaTime       : f32,    // offset 76 — seconds
    flags           : u32,    // offset 80 — FLAG_* bits
    frameIndex      : u32,    // offset 84
    debugMode       : u32,    // offset 88 — DebugView
    _pad            : u32,    // offset 92
}
@group(0) @binding(0) var<uniform> C : FsrConstants;

const FLAG_RESET : u32 = 1u;
const FLAG_REVERSED_DEPTH : u32 = 2u;
const FLAG_PERSPECTIVE : u32 = 4u;
const FLAG_INPUT_REINHARD : u32 = 8u;
const FLAG_INPUT_DISPLAY : u32 = 16u;
const FLAG_LOCKS : u32 = 32u;
const FLAG_AUTO_EXPOSURE : u32 = 64u;
const FLAG_SHADING_CHANGE : u32 = 128u;
const FLAG_REACTIVE : u32 = 256u;
const FLAG_RCAS_DENOISE : u32 = 512u;
const FLAG_EXTERNAL_EXPOSURE : u32 = 1024u;

fn hasFlag(bit : u32) -> bool { return (C.flags & bit) != 0u; }
`,vi=`
fn luma(c : vec3f) -> f32 {
    return dot(c, vec3f(0.2126, 0.7152, 0.0722));
}

fn rgbToYCoCg(c : vec3f) -> vec3f {
    return vec3f(
         0.25 * c.r + 0.5 * c.g + 0.25 * c.b,
         0.5  * c.r             - 0.5  * c.b,
        -0.25 * c.r + 0.5 * c.g - 0.25 * c.b,
    );
}

fn yCoCgToRgb(c : vec3f) -> vec3f {
    return vec3f(
        c.x + c.y - c.z,
        c.x       + c.z,
        c.x - c.y - c.z,
    );
}
`,ks=`
fn tonemapInvertible(c : vec3f) -> vec3f {
    return c / (1.0 + max(max(c.r, c.g), max(c.b, 0.0)));
}

fn tonemapInvert(c : vec3f) -> vec3f {
    let m = min(max(max(c.r, c.g), max(c.b, 0.0)), 0.999);
    return c / (1.0 - m);
}
`,lh=`
fn linearizeDepth(d : f32) -> f32 {
    let near = C.depthNearFar.x;
    let far = C.depthNearFar.y;
    if (!hasFlag(FLAG_PERSPECTIVE)) {
        let t = select(d, 1.0 - d, hasFlag(FLAG_REVERSED_DEPTH));
        return near + t * (far - near);
    }
    if (hasFlag(FLAG_REVERSED_DEPTH)) {
        return (far * near) / (near + d * (far - near));
    }
    return (far * near) / (far - d * (far - near));
}
`;function Ae(...a){const e=new Set,t=[];for(const i of a){const r=i.trim();r.length===0||e.has(r)||(e.add(r),t.push(r))}return t.join(`

`)+`
`}const ch=Ae(Me,vi,ks,`
@group(0) @binding(1) var inputColor : texture_2d<f32>;
@group(0) @binding(2) var dilatedMotion : texture_2d<f32>;
@group(0) @binding(3) var masks : texture_2d<f32>;
@group(0) @binding(4) var historyIn : texture_2d<f32>;
@group(0) @binding(5) var linearSampler : sampler;
@group(0) @binding(6) var historyOut : texture_storage_2d<rgba16float, write>;
@group(0) @binding(7) var locksIn : texture_2d<f32>;
@group(0) @binding(8) var locksOut : texture_storage_2d<rgba16float, write>;
@group(0) @binding(9) var exposureTex : texture_2d<f32>;
@group(0) @binding(10) var reactiveMask : texture_2d<f32>;
@group(0) @binding(11) var exposurePrevTex : texture_2d<f32>;
@group(0) @binding(12) var shadingChangeTex : texture_2d<f32>;

const PI : f32 = 3.14159265358979;
// How hard a fully-reactive pixel snaps to the current frame in the blend.
const REACTIVE_STRENGTH : f32 = 0.9;
// Variance-clip gamma: how many standard deviations of the current
// neighborhood the history may stray before being clipped.
const CLIP_GAMMA : f32 = 1.0;

//* Luminance-stability lock tuning (FSR2/3's thin-feature protection).
// A "lock" marks a stable sub-pixel luminance outlier (a wire, a fence
// picket) and shields it from the variance clip that would otherwise drag its
// bright/dark history toward the darker/brighter neighborhood — the exact
// cause of thin features dimming and shimmering under motion.
const LOCK_DECAY : f32 = 0.08;         // lifetime lost per frame when no feature present
const LOCK_GROW : f32 = 0.5;           // lifetime gained per frame while a feature is present
const LOCK_CONTRAST_LO : f32 = 0.02;   // YCoCg-Y contrast to start treating a pixel as a thin feature
const LOCK_CONTRAST_HI : f32 = 0.12;
const LOCK_PEAK_LO : f32 = 0.6;        // how many neighborhood std-devs marks an outlier
const LOCK_PEAK_HI : f32 = 2.0;
const LOCK_CLAMP_RELAX : f32 = 12.0;   // how much a full lock widens the variance AABB
const LOCK_HISTORY_BOOST : f32 = 0.7;  // how much a full lock favors history in the blend

//* Still-scene convergence relax.
// The variance AABB is built from ONE jitter phase's 3×3 taps, so on
// high-frequency content (sub-texel grid lines, moiré regions) the CONVERGED
// supersampled mean falls outside some phases' boxes — and because the blend
// stores the clipped history back, the buffer is re-snapped to each phase's
// box forever: the still image never stops churning no matter how small alpha
// gets (measured on Q1: disabling the clip drops the same-phase frame diff
// from 0.18 to 0.005). Where rectification has nothing legitimate to catch —
// no motion, converged history, no disocclusion/shading-change/reactivity —
// widen the box so the converged mean survives; any of those signals returns
// the pixel to full rectification. This is the locks mechanism generalized
// (softly, ×9 vs the locks' ×13) from thin features to everywhere.
// Q1-measured (consecutive / same-phase diff): no relax 0.116/0.038 at ×4,
// 0.112/0.018 at ×8, rectification fully off 0.109/0.005.
const STILL_CLAMP_RELAX : f32 = 8.0;   // box widening at full stillness + convergence
const STILL_MOTION_LO : f32 = 0.05;    // render-texel motion where the relax starts fading
const STILL_MOTION_HI : f32 = 0.5;     // ...and where it is fully off

//* Shading-change aging (FSR2/3's "luminance instability").
// The detection itself lives in the dedicated signed-difference pyramid pass
// (shadingChange.ts) — a coarse-mip signal that fires on coherent regional luma
// changes and cancels alias flicker. Where it fires, history is aged so the
// surface re-converges to its new shading instead of ghosting the old.
const SHADING_AGE : f32 = 0.75;        // max fraction of accumulation dropped on a full change

// Lanczos2 kernel (the same window FSR2 uses for its upsample taps).
fn lanczos2(x : f32) -> f32 {
    let ax = abs(x);
    if (ax < 1.0e-4) { return 1.0; }
    if (ax >= 2.0) { return 0.0; }
    let px = PI * ax;
    return 2.0 * sin(px) * sin(px * 0.5) / (px * px);
}

// Catmull-Rom history sampling via 5 bilinear fetches (Jimenez SIGGRAPH'16).
// Bicubic keeps reprojected history crisp where bilinear would smear it.
fn sampleHistoryCatmullRom(uv : vec2f) -> vec4f {
    let samplePos = uv * C.displaySize;
    let texPos1 = floor(samplePos - 0.5) + 0.5;
    let f = samplePos - texPos1;

    let w0 = f * (-0.5 + f * (1.0 - 0.5 * f));
    let w1 = 1.0 + f * f * (-2.5 + 1.5 * f);
    let w2 = f * (0.5 + f * (2.0 - 1.5 * f));
    let w3 = f * f * (-0.5 + 0.5 * f);
    let w12 = w1 + w2;
    let offset12 = w2 / w12;

    let texPos0 = (texPos1 - 1.0) * C.displaySizeInv;
    let texPos3 = (texPos1 + 2.0) * C.displaySizeInv;
    let texPos12 = (texPos1 + offset12) * C.displaySizeInv;

    var result =
        textureSampleLevel(historyIn, linearSampler, vec2f(texPos0.x, texPos12.y), 0.0) * (w0.x * w12.y) +
        textureSampleLevel(historyIn, linearSampler, vec2f(texPos12.x, texPos0.y), 0.0) * (w12.x * w0.y) +
        textureSampleLevel(historyIn, linearSampler, texPos12, 0.0) * (w12.x * w12.y) +
        textureSampleLevel(historyIn, linearSampler, vec2f(texPos3.x, texPos12.y), 0.0) * (w3.x * w12.y) +
        textureSampleLevel(historyIn, linearSampler, vec2f(texPos12.x, texPos3.y), 0.0) * (w12.x * w3.y);
    // Corner taps are dropped, so renormalize by the weight actually used.
    let wSum = w0.x * w12.y + w12.x * w0.y + w12.x * w12.y + w3.x * w12.y + w12.x * w3.y;
    result = result / wSum;
    return max(result, vec4f(0.0));
}

// Clips a color toward the AABB center (Playdead's variance clipping) —
// gentler than a hard clamp, no hue snapping at box corners.
fn clipToAABB(center : vec3f, extents : vec3f, color : vec3f) -> vec3f {
    let dir = color - center;
    let scale = extents / max(abs(dir), vec3f(1.0e-6));
    let t = min(1.0, min(scale.x, min(scale.y, scale.z)));
    return center + dir * t;
}

@compute @workgroup_size(8, 8)
fn main(@builtin(global_invocation_id) gid : vec3u) {
    if (any(vec2f(gid.xy) >= C.displaySize)) { return; }

    let uv = (vec2f(gid.xy) + 0.5) * C.displaySizeInv;
    let renderCoord = clamp(vec2i(uv * C.renderSize), vec2i(0), vec2i(C.renderSize) - 1);
    let motion = textureLoad(dilatedMotion, renderCoord, 0).xy;
    let disocclusion = textureLoad(masks, renderCoord, 0).r;
    // Pre-exposure for this frame (auto or manual) — divided back out at output.
    // .b carries the app's host pre-exposure (1.0 when none is supplied).
    let frameInfo = textureLoad(exposureTex, vec2i(0), 0);
    let exposure = frameInfo.r;
    // Reactive mask: pixels the caller flags (particles, transparents) should
    // lean on the current frame instead of ghosting through history.
    var reactivity = 0.0;
    if (hasFlag(FLAG_REACTIVE)) {
        let rdim = vec2i(textureDimensions(reactiveMask));
        reactivity = clamp(textureLoad(reactiveMask, clamp(renderCoord, vec2i(0), rdim - 1), 0).r, 0.0, 1.0);
    }

    //* Current Frame Upsample (jitter-aware Lanczos2)
    // srcPos is the display pixel in render texel-index space, shifted by
    // the jitter so distances are measured to where samples actually landed.
    let srcPos = uv * C.renderSize - 0.5 - C.jitter;
    let baseTexel = vec2i(round(srcPos));
    let maxCoord = vec2i(C.renderSize) - 1;

    var colorSum = vec3f(0.0);
    var alphaSum = 0.0;
    var weightSum = 0.0;
    var m1 = vec3f(0.0); // YCoCg first moment
    var m2 = vec3f(0.0); // YCoCg second moment
    var boxMin = vec3f(1.0e5);
    var boxMax = vec3f(-1.0e5);
    var alphaMin = 1.0e5;
    var alphaMax = -1.0e5;

    for (var y = -1; y <= 1; y++) {
        for (var x = -1; x <= 1; x++) {
            let coord = clamp(baseTexel + vec2i(x, y), vec2i(0), maxCoord);
            let d = srcPos - vec2f(coord);
            let w = lanczos2(d.x) * lanczos2(d.y);
            let src = textureLoad(inputColor, coord, 0);
            let c = tonemapInvertible(src.rgb * exposure);
            colorSum += c * w;
            // Alpha takes the same weights but none of the conditioning — it is
            // already bounded, and tonemapping a coverage value is meaningless.
            alphaSum += src.a * w;
            weightSum += w;

            let ycc = rgbToYCoCg(c);
            m1 += ycc;
            m2 += ycc * ycc;
            boxMin = min(boxMin, ycc);
            boxMax = max(boxMax, ycc);
            alphaMin = min(alphaMin, src.a);
            alphaMax = max(alphaMax, src.a);
        }
    }

    // Lanczos lobes go negative — dering by clamping into the local box.
    var current = yCoCgToRgb(clamp(
        rgbToYCoCg(colorSum / max(weightSum, 1.0e-4)),
        boxMin, boxMax,
    ));
    let currentAlpha = clamp(alphaSum / max(weightSum, 1.0e-4), alphaMin, alphaMax);

    // Confidence in the current sample: 1 when a jittered sample landed on
    // this display pixel, lower when we're interpolating between samples.
    let sampleDist = length(srcPos - vec2f(baseTexel));
    let confidence = clamp(1.0 - sampleDist, 0.25, 1.0);

    //* History Reprojection
    let prevUV = uv - motion;
    let offscreen = any(prevUV < vec2f(0.0)) || any(prevUV > vec2f(1.0));

    if (hasFlag(FLAG_RESET) || offscreen) {
        textureStore(historyOut, gid.xy, vec4f(current, 1.0 / C.maxAccumulation));
        textureStore(locksOut, gid.xy, vec4f(0.0, 0.0, 0.0, currentAlpha));
        return;
    }

    var history = sampleHistoryCatmullRom(prevUV);

    //* Host Pre-Exposure Delta (FSR3's DeltaPreExposure)
    // If the app changed the pre-exposure baked into its render since last
    // frame, the reprojected history is in the old brightness domain and would
    // read as a full-screen shading change — ratio-correct it in linear space.
    // Without a preExposureTexture input both texels publish 1.0 and this is
    // skipped, leaving the pass bit-identical. Conditioning exposure is
    // deliberately not corrected here: it adapts smoothly by design.
    let hostPrev = textureLoad(exposurePrevTex, vec2i(0), 0).b;
    var hostRatio = 1.0;
    if (hostPrev > 1.0e-4 && frameInfo.b > 1.0e-4) { hostRatio = frameInfo.b / hostPrev; }
    if (abs(hostRatio - 1.0) > 1.0e-3) {
        history = vec4f(tonemapInvertible(tonemapInvert(history.rgb) * hostRatio), history.a);
    }

    var sampleCount = history.a * C.maxAccumulation;

    //* Neighborhood Statistics (YCoCg)
    let mean = m1 / 9.0;
    let variance = max(m2 / 9.0 - mean * mean, vec3f(0.0));
    let curY = rgbToYCoCg(current).x;
    let contrast = boxMax.x - boxMin.x;

    //* Shading Change (from the signed-difference pyramid pass)
    // Half-render-resolution response in [0,1]; a zero dummy is bound when the
    // detector is disabled.
    var shadingChange = 0.0;
    if (hasFlag(FLAG_SHADING_CHANGE)) {
        let scDim = vec2i(textureDimensions(shadingChangeTex));
        let scCoord = clamp(renderCoord / 2, vec2i(0), scDim - 1);
        shadingChange = clamp(textureLoad(shadingChangeTex, scCoord, 0).r, 0.0, 1.0);
    }

    //* Luminance-Stability Lock
    // Detect a thin feature (a luminance outlier vs the neighborhood) that is
    // temporally stable, and grow a lock on it; the lock then shields the
    // feature from rectification below. Locks reproject through motion just
    // like the color history.
    //
    // The fetch is hoisted out of the branch because the alpha history shares
    // it (locks .a); with locks on — the default — that costs nothing new.
    let lockPrev = textureSampleLevel(locksIn, linearSampler, prevUV, 0.0);
    var lockLife = 0.0;
    var lockedLuma = curY;
    if (hasFlag(FLAG_LOCKS)) {
        // Thin feature = a luminance outlier vs its neighborhood with real
        // local contrast. Creation does NOT require frame-to-frame stability
        // (thin features alias under motion); instability is what breaks it.
        let peakiness = abs(curY - mean.x) / max(sqrt(variance.x), 1.0e-3);
        let featureStrength =
            smoothstep(LOCK_PEAK_LO, LOCK_PEAK_HI, peakiness) *
            smoothstep(LOCK_CONTRAST_LO, LOCK_CONTRAST_HI, contrast);

        lockedLuma = select(lockPrev.g, curY, lockPrev.r < 0.05);
        // Grow the lock while a feature is present, decay it otherwise.
        lockLife = lockPrev.r + select(-LOCK_DECAY, LOCK_GROW * featureStrength, featureStrength > 0.1);
        // Break on disocclusion or a shading change measured against the lock's
        // OWN tracked luma — not the neighborhood-mean detector, which on a thin
        // bright feature always disagrees with the (background-dominated) mean
        // and would break every lock. The mean-based detector only ages
        // non-locked history below.
        let lockShading = smoothstep(max(contrast, 1.0e-3), max(contrast, 1.0e-3) * 2.0, abs(curY - lockedLuma));
        lockLife = clamp(lockLife * (1.0 - disocclusion) * (1.0 - lockShading), 0.0, 1.0);
        // Reactive pixels (particles/transparents) are not stable thin features
        // to protect — don't let them form locks.
        lockLife = lockLife * (1.0 - reactivity);
    }

    //* History Rectification
    // Variance AABB of the current neighborhood in YCoCg; clip history into
    // it so shading changes cannot ghost. A lock widens the box so a protected
    // thin feature keeps its accumulated value instead of being pulled toward
    // the (darker/brighter) neighborhood mean.
    let motionTexels = length(motion * C.renderSize);
    let stillRelax = STILL_CLAMP_RELAX *
        (1.0 - smoothstep(STILL_MOTION_LO, STILL_MOTION_HI, motionTexels)) *
        clamp(sampleCount / C.maxAccumulation, 0.0, 1.0) *
        (1.0 - disocclusion) * (1.0 - shadingChange) * (1.0 - reactivity);
    let extents = sqrt(variance) * CLIP_GAMMA *
        (1.0 + lockLife * LOCK_CLAMP_RELAX + stillRelax);
    let historyYcc = rgbToYCoCg(history.rgb);
    let clippedYcc = clipToAABB(mean, extents, historyYcc);
    let rectifiedHistory = yCoCgToRgb(clippedYcc);

    // Disocclusion discards history outright. Deliberately NO aging by clip
    // magnitude (an earlier form aged by clipAmount): the neighborhood box is
    // built from the current jitter phase's taps, so at any contrasty edge the
    // CONVERGED history sits outside some phases' boxes and a clip-driven age
    // makes convergence unreachable — sample count saturates at a low
    // equilibrium and the still-scene output shimmers forever (consumer
    // report 3's rolling accumulation age). Stale shading is already handled
    // by the clip itself plus the shading-change detector's SHADING_AGE path;
    // this matches FSR2, which never ages history on rectification strength.
    sampleCount *= (1.0 - disocclusion);
    // A detected shading change ages history so the new shading converges fast;
    // a lock protects its thin feature from this (aliasing there is not a change).
    sampleCount *= (1.0 - SHADING_AGE * shadingChange * (1.0 - lockLife));
    // Reactive pixels keep almost no history so fast transparent motion doesn't
    // smear a trail behind it.
    sampleCount *= (1.0 - REACTIVE_STRENGTH * reactivity);

    //* Blend — locked features lean on the accumulated history so sub-pixel
    //* detail persists under motion instead of dimming.
    let newCount = min(sampleCount + 1.0, C.maxAccumulation);
    let baseAlpha = clamp(confidence / newCount, 1.0 / C.maxAccumulation, 1.0);
    var alpha = max(baseAlpha * (1.0 - LOCK_HISTORY_BOOST * lockLife), 1.0 / (C.maxAccumulation * 2.0));
    // Snap reactive pixels toward the current frame regardless of accumulation.
    alpha = mix(alpha, 1.0, REACTIVE_STRENGTH * reactivity);
    let result = mix(rectifiedHistory, current, alpha);

    //* Alpha Resolve
    // Alpha gets the color blend weight, so a coverage edge converges on the
    // same schedule as the color it belongs to. Its rectification is the local
    // 3x3 alpha range rather than a variance AABB: at a coverage edge the
    // jittered taps span the whole 0..1 range, so history passes untouched and
    // accumulates; on a flat region the range collapses and stale alpha cannot
    // ghost.
    // Still-scene relax, as for color: a feature thinner than a render texel
    // leaves some jitter phases with an all-0 (or all-1) 3x3, which would
    // re-snap the converged coverage every cycle. Where the color box is
    // widened because rectification has nothing legitimate to catch (still,
    // converged, no disocclusion / shading change / reactivity), the alpha
    // history passes unclamped; any of those signals restores the clamp.
    // The max() keeps this defined when the relax is tuned to 0 (stillRelax
    // is then 0 too, so the clamp stays hard); for any positive constant it
    // folds to the constant itself.
    let alphaRelax = stillRelax / max(STILL_CLAMP_RELAX, 1.0e-6);
    let rectifiedAlpha = mix(clamp(lockPrev.a, alphaMin, alphaMax), lockPrev.a, alphaRelax);
    let resultAlpha = clamp(mix(rectifiedAlpha, currentAlpha, alpha), 0.0, 1.0);

    textureStore(historyOut, gid.xy, vec4f(result, newCount / C.maxAccumulation));
    // b = shading-change factor (for the debug view); a = resolved alpha.
    textureStore(locksOut, gid.xy, vec4f(lockLife, lockedLuma, shadingChange, resultAlpha));
}
`),uh=Ae(Me,ks,`
@group(0) @binding(1) var inputColor : texture_2d<f32>;
@group(0) @binding(2) var linearSampler : sampler;
@group(0) @binding(3) var exposureTex : texture_2d<f32>;
@group(0) @binding(4) var outputColor : texture_storage_2d<rgba16float, write>;
@group(0) @binding(5) var alphaSource : texture_2d<f32>;

@compute @workgroup_size(8, 8)
fn main(@builtin(global_invocation_id) gid : vec3u) {
    if (any(vec2f(gid.xy) >= C.displaySize)) { return; }

    let uv = (vec2f(gid.xy) + 0.5) * C.displaySizeInv;
    var c = textureSampleLevel(inputColor, linearSampler, uv, 0.0).rgb;

    if (hasFlag(FLAG_INPUT_REINHARD)) {
        // Undo the pre-exposure the accumulate pass baked in before tonemapping.
        let exposure = max(textureLoad(exposureTex, vec2i(0), 0).r, 1.0e-4);
        c = tonemapInvert(c) / exposure;
    }

    let a = textureSampleLevel(alphaSource, linearSampler, uv, 0.0).a;
    textureStore(outputColor, gid.xy, vec4f(c, a));
}
`),dh=Ae(Me,vi,`
@group(0) @binding(1) var dilatedMotion : texture_2d<f32>;
@group(0) @binding(2) var masks : texture_2d<f32>;
@group(0) @binding(3) var dilatedDepth : texture_2d<f32>;
@group(0) @binding(4) var historyIn : texture_2d<f32>;
@group(0) @binding(5) var locksIn : texture_2d<f32>;
@group(0) @binding(6) var exposureTex : texture_2d<f32>;
@group(0) @binding(7) var inputColor : texture_2d<f32>;
@group(0) @binding(8) var reactiveMask : texture_2d<f32>;
@group(0) @binding(9) var outputColor : texture_storage_2d<rgba16float, write>;

// Simple HSV-ish direction coloring for motion vectors.
fn motionToColor(m : vec2f) -> vec3f {
    // sqrt response so slow sub-pixel motion is still visible without the
    // fast-motion end saturating instantly (linear scaling reads as "black").
    let mag = clamp(sqrt(length(m) * 8.0), 0.0, 1.0);
    let dir = normalize(select(m, vec2f(1.0, 0.0), length(m) < 1.0e-6));
    return vec3f(0.5 + 0.5 * dir.x * mag, 0.5 + 0.5 * dir.y * mag, mag);
}

@compute @workgroup_size(8, 8)
fn main(@builtin(global_invocation_id) gid : vec3u) {
    if (any(vec2f(gid.xy) >= C.displaySize)) { return; }

    let uv = (vec2f(gid.xy) + 0.5) * C.displaySizeInv;
    let renderCoord = clamp(vec2i(uv * C.renderSize), vec2i(0), vec2i(C.renderSize) - 1);

    var c = vec3f(0.0);
    switch (C.debugMode) {
        case 1u: { // Motion vectors
            c = motionToColor(textureLoad(dilatedMotion, renderCoord, 0).xy);
        }
        case 2u: { // Disocclusion mask
            c = vec3f(textureLoad(masks, renderCoord, 0).r);
        }
        case 3u: { // Linear depth, log-scaled into visible range
            let d = textureLoad(dilatedDepth, renderCoord, 0).r;
            c = vec3f(clamp(log2(1.0 + d) / 8.0, 0.0, 1.0));
        }
        case 4u: { // Accumulation age
            c = vec3f(textureLoad(historyIn, vec2i(gid.xy), 0).a);
        }
        case 5u: { // Luminance-stability locks (r = lifetime)
            c = vec3f(textureLoad(locksIn, vec2i(gid.xy), 0).r);
        }
        case 6u: { // Auto-exposed scene luminance — should read near mid-grey
            let exposure = textureLoad(exposureTex, vec2i(0), 0).r;
            let l = luma(textureLoad(inputColor, renderCoord, 0).rgb) * exposure;
            c = vec3f(clamp(l, 0.0, 1.0));
        }
        case 7u: { // Shading-change factor (packed into locks.b by accumulate)
            c = vec3f(textureLoad(locksIn, vec2i(gid.xy), 0).b);
        }
        case 8u: { // Reactive mask
            let rdim = vec2i(textureDimensions(reactiveMask));
            c = vec3f(textureLoad(reactiveMask, clamp(renderCoord, vec2i(0), rdim - 1), 0).r);
        }
        default: {}
    }

    textureStore(outputColor, gid.xy, vec4f(c, 1.0));
}
`),hh=Ae(Me,`
@group(0) @binding(1) var inputColor : texture_2d<f32>;
@group(0) @binding(2) var outputColor : texture_storage_2d<rgba16float, write>;

// Loads a render-resolution texel in the caller's color domain, alpha included.
fn easuLoad(p : vec2i) -> vec4f {
    let clamped = clamp(p, vec2i(0), vec2i(C.renderSize) - 1);
    return textureLoad(inputColor, clamped, 0);
}

// EASU operates on a green-weighted luma: L = 0.5*R + G + 0.5*B.
fn easuLuma(c : vec4f) -> f32 {
    return 0.5 * c.r + c.g + 0.5 * c.b;
}

// Gradient analysis for one of the 4 nearest texels ('c' center of a +
// pattern: a above, b left, d right, e below). Accumulates the bilinearly
// weighted edge direction and edge strength (FsrEasuSetF).
fn easuSet(
    dir : ptr<function, vec2f>, len : ptr<function, f32>,
    w : f32,
    lA : f32, lB : f32, lC : f32, lD : f32, lE : f32,
) {
    //* Horizontal Gradient
    let dc = lD - lC;
    let cb = lC - lB;
    var lenX = max(abs(dc), abs(cb));
    lenX = 1.0 / max(lenX, 1.0e-5);
    let dirX = lD - lB;
    (*dir).x += dirX * w;
    lenX = clamp(abs(dirX) * lenX, 0.0, 1.0);
    lenX *= lenX;
    *len += lenX * w;

    //* Vertical Gradient
    let ec = lE - lC;
    let ca = lC - lA;
    var lenY = max(abs(ec), abs(ca));
    lenY = 1.0 / max(lenY, 1.0e-5);
    let dirY = lE - lA;
    (*dir).y += dirY * w;
    lenY = clamp(abs(dirY) * lenY, 0.0, 1.0);
    lenY *= lenY;
    *len += lenY * w;
}

// One kernel tap: rotate the offset into edge space, apply anisotropy, then
// evaluate the polynomial Lanczos2 approximation (FsrEasuTapF).
fn easuTap(
    aC : ptr<function, vec4f>, aW : ptr<function, f32>,
    off : vec2f, dir : vec2f, len : vec2f, lob : f32, clp : f32, c : vec4f,
) {
    var v = vec2f(
        off.x * dir.x + off.y * dir.y,
        off.x * (-dir.y) + off.y * dir.x,
    );
    v *= len;
    var d2 = dot(v, v);
    d2 = min(d2, clp);
    // (25/16 * (2/5 x² - 1)² - 9/16) * (lob x² - 1)²  — base * window
    var wB = (2.0 / 5.0) * d2 - 1.0;
    var wA = lob * d2 - 1.0;
    wB *= wB;
    wA *= wA;
    wB = (25.0 / 16.0) * wB - (25.0 / 16.0 - 1.0);
    let w = wB * wA;
    *aC += c * w;
    *aW += w;
}

@compute @workgroup_size(8, 8)
fn main(@builtin(global_invocation_id) gid : vec3u) {
    if (any(vec2f(gid.xy) >= C.displaySize)) { return; }

    //* Source Position
    // Map the output pixel into render-texture space and split into the
    // integer base + sub-texel offset used for kernel/gradient weights.
    var pp = (vec2f(gid.xy) + 0.5) * C.renderSize * C.displaySizeInv - 0.5;
    let fp = floor(pp);
    pp -= fp;
    let ip = vec2i(fp);

    //* 12-Tap Footprint
    //    b c
    //  e f g h
    //  i j k l
    //    n o
    let cB = easuLoad(ip + vec2i(0, -1));
    let cC = easuLoad(ip + vec2i(1, -1));
    let cE = easuLoad(ip + vec2i(-1, 0));
    let cF = easuLoad(ip + vec2i(0, 0));
    let cG = easuLoad(ip + vec2i(1, 0));
    let cH = easuLoad(ip + vec2i(2, 0));
    let cI = easuLoad(ip + vec2i(-1, 1));
    let cJ = easuLoad(ip + vec2i(0, 1));
    let cK = easuLoad(ip + vec2i(1, 1));
    let cL = easuLoad(ip + vec2i(2, 1));
    let cN = easuLoad(ip + vec2i(0, 2));
    let cO = easuLoad(ip + vec2i(1, 2));

    let lB = easuLuma(cB); let lC = easuLuma(cC);
    let lE = easuLuma(cE); let lF = easuLuma(cF);
    let lG = easuLuma(cG); let lH = easuLuma(cH);
    let lI = easuLuma(cI); let lJ = easuLuma(cJ);
    let lK = easuLuma(cK); let lL = easuLuma(cL);
    let lN = easuLuma(cN); let lO = easuLuma(cO);

    //* Edge Analysis
    // Bilinear blend of the gradient analysis at the 4 nearest texels
    // (f, g, j, k), weighted by the sub-texel position.
    var dir = vec2f(0.0);
    var len = 0.0;
    easuSet(&dir, &len, (1.0 - pp.x) * (1.0 - pp.y), lB, lE, lF, lG, lJ);
    easuSet(&dir, &len, pp.x * (1.0 - pp.y), lC, lF, lG, lH, lK);
    easuSet(&dir, &len, (1.0 - pp.x) * pp.y, lF, lI, lJ, lK, lN);
    easuSet(&dir, &len, pp.x * pp.y, lG, lJ, lK, lL, lO);

    //* Kernel Shaping
    // Normalize the direction; degenerate (flat) regions fall back to axis
    // aligned with zero edge strength.
    let dir2 = dir * dir;
    var dirR = dir2.x + dir2.y;
    let zro = dirR < (1.0 / 32768.0);
    dirR = inverseSqrt(max(dirR, 1.0e-12));
    dirR = select(dirR, 1.0, zro);
    dir.x = select(dir.x, 1.0, zro);
    dir *= dirR;
    // Edge strength from {0..2} to {0..1}, shaped with a square.
    len = len * 0.5;
    len *= len;
    // Stretch the kernel along the edge: 1.0 axis-aligned up to sqrt(2)
    // on diagonals, and contract it across the edge.
    let stretch = (dir.x * dir.x + dir.y * dir.y) / max(abs(dir.x), abs(dir.y));
    let len2 = vec2f(1.0 + (stretch - 1.0) * len, 1.0 - 0.5 * len);
    // Negative lobe strength and window clipping point.
    let lob = 0.5 + ((1.0 / 4.0 - 0.04) - 0.5) * len;
    let clp = 1.0 / lob;

    //* Accumulation
    // Dering clamp uses the 4 nearest texels only.
    let min4 = min(min(cF, cG), min(cJ, cK));
    let max4 = max(max(cF, cG), max(cJ, cK));
    var aC = vec4f(0.0);
    var aW = 0.0;
    easuTap(&aC, &aW, vec2f(0.0, -1.0) - pp, dir, len2, lob, clp, cB);
    easuTap(&aC, &aW, vec2f(1.0, -1.0) - pp, dir, len2, lob, clp, cC);
    easuTap(&aC, &aW, vec2f(-1.0, 0.0) - pp, dir, len2, lob, clp, cE);
    easuTap(&aC, &aW, vec2f(0.0, 0.0) - pp, dir, len2, lob, clp, cF);
    easuTap(&aC, &aW, vec2f(1.0, 0.0) - pp, dir, len2, lob, clp, cG);
    easuTap(&aC, &aW, vec2f(2.0, 0.0) - pp, dir, len2, lob, clp, cH);
    easuTap(&aC, &aW, vec2f(-1.0, 1.0) - pp, dir, len2, lob, clp, cI);
    easuTap(&aC, &aW, vec2f(0.0, 1.0) - pp, dir, len2, lob, clp, cJ);
    easuTap(&aC, &aW, vec2f(1.0, 1.0) - pp, dir, len2, lob, clp, cK);
    easuTap(&aC, &aW, vec2f(2.0, 1.0) - pp, dir, len2, lob, clp, cL);
    easuTap(&aC, &aW, vec2f(0.0, 2.0) - pp, dir, len2, lob, clp, cN);
    easuTap(&aC, &aW, vec2f(1.0, 2.0) - pp, dir, len2, lob, clp, cO);

    let pix = min(max4, max(min4, aC / aW));
    textureStore(outputColor, gid.xy, pix);
}
`),fh=Ae(Me,`
@group(0) @binding(1) var opaqueColor : texture_2d<f32>;
@group(0) @binding(2) var finalColor : texture_2d<f32>;
@group(0) @binding(3) var reactiveOut : texture_storage_2d<rgba8unorm, write>;
@group(0) @binding(4) var incomingReactive : texture_2d<f32>;

// Below this per-channel difference the pixel is treated as unchanged (opaque);
// above it, scaled up to a cap so a faint transparent still reacts meaningfully.
const REACTIVE_THRESHOLD : f32 = 0.04;
const REACTIVE_SCALE : f32 = 2.0;
const REACTIVE_MAX : f32 = 0.9;

@compute @workgroup_size(8, 8)
fn main(@builtin(global_invocation_id) gid : vec3u) {
    if (any(vec2f(gid.xy) >= C.renderSize)) { return; }
    let p = vec2i(gid.xy);
    let o = textureLoad(opaqueColor, p, 0).rgb;
    let f = textureLoad(finalColor, p, 0).rgb;
    let d = abs(f - o);
    let diff = max(d.r, max(d.g, d.b));
    let generated = clamp((diff - REACTIVE_THRESHOLD) * REACTIVE_SCALE, 0.0, REACTIVE_MAX);
    // Merge, don't overwrite: the strongest reactivity claim wins. The dummy
    // is 1×1 — clamp the load so any render-res incoming mask reads per-texel
    // while the dummy reads its lone zero everywhere.
    let incomingSize = vec2i(textureDimensions(incomingReactive));
    let incoming = textureLoad(incomingReactive, min(p, incomingSize - 1), 0).r;
    let reactive = max(generated, clamp(incoming, 0.0, 1.0));
    textureStore(reactiveOut, p, vec4f(reactive, 0.0, 0.0, 1.0));
}
`),ph=Ae(Me,vi,`
@group(0) @binding(1) var inputColor : texture_2d<f32>;
@group(0) @binding(2) var linearSampler : sampler;
@group(0) @binding(3) var prevExposure : texture_2d<f32>;
@group(0) @binding(4) var exposureOut : texture_storage_2d<rgba16float, write>;
@group(0) @binding(5) var externalExposure : texture_2d<f32>;
@group(0) @binding(6) var hostPreExposure : texture_2d<f32>;

// 32×32 = 1024 bilinear taps across the whole frame — a coarse but stable
// average for exposure (each tap already averages 4 texels).
const EXPOSURE_TAPS : u32 = 32u;
// Middle-grey target: the exposure maps average scene luma to this.
const EXPOSURE_KEY : f32 = 0.18;
// Clamp so a pitch-black or fully blown-out frame can't drive exposure to
// infinity/zero and destabilize the accumulation it is meant to steady.
const EXPOSURE_MIN : f32 = 0.02;
const EXPOSURE_MAX : f32 = 80.0;
// Eye-adaptation rate (per second) toward the target exposure.
const ADAPT_SPEED : f32 = 2.5;

@compute @workgroup_size(8, 8)
fn main(@builtin(global_invocation_id) gid : vec3u) {
    if (any(vec2f(gid.xy) >= C.displaySize)) { return; }
    // Single-thread reduction — the other 63 lanes of the lone workgroup idle.
    if (any(gid.xy != vec2u(0u))) { return; }

    // Geometric mean of luminance (average in log space) resists a few bright
    // pixels dragging the whole exposure, matching FSR2's log-average.
    var logSum = 0.0;
    for (var y = 0u; y < EXPOSURE_TAPS; y = y + 1u) {
        for (var x = 0u; x < EXPOSURE_TAPS; x = x + 1u) {
            let uv = (vec2f(f32(x), f32(y)) + 0.5) / f32(EXPOSURE_TAPS);
            let c = textureSampleLevel(inputColor, linearSampler, uv, 0.0).rgb;
            logSum = logSum + log2(max(luma(c), 1.0e-4));
        }
    }
    // Meter host-invariantly (FSR2 divides pre-exposure out of every input
    // load): the app already metered what it baked in, so a host pre-exposure
    // step must not send auto-exposure re-adapting — that multi-frame
    // conditioning drift would desynchronize history from the current frame
    // and read as a full-screen shading change.
    let hostRaw = textureLoad(hostPreExposure, vec2i(0), 0).r;
    let host = select(1.0, hostRaw, hostRaw > 0.0);
    let avgLum = exp2(logSum / f32(EXPOSURE_TAPS * EXPOSURE_TAPS)) / host;

    let targetExposure = clamp(EXPOSURE_KEY / max(avgLum, 1.0e-4), EXPOSURE_MIN, EXPOSURE_MAX);

    // Ease toward the target for eye-adaptation; snap on reset so a stale value
    // doesn't slowly fade in after a camera cut / resize.
    let prev = textureLoad(prevExposure, vec2i(0), 0).r;
    var exposure = targetExposure;
    if (!hasFlag(FLAG_RESET) && prev > 0.0) {
        let rate = clamp(1.0 - exp2(-C.deltaTime * ADAPT_SPEED), 0.0, 1.0);
        exposure = prev + (targetExposure - prev) * rate;
    }

    // Manual override: when auto-exposure is off, publish the fixed setting so
    // downstream passes read exposure from one place regardless of mode.
    exposure = select(C.exposure, exposure, hasFlag(FLAG_AUTO_EXPOSURE));

    // App-supplied exposure wins over both: a pipeline that already computes
    // exposure (its own metering pass) feeds it here, and every downstream
    // pass keeps reading this one 1×1 value. avgLum stays our own measurement
    // so the shading-change detector still has a neighbourhood reference.
    let ext = textureLoad(externalExposure, vec2i(0), 0).r;
    exposure = select(exposure, ext, hasFlag(FLAG_EXTERNAL_EXPOSURE));

    // Host pre-exposure rides along in .b: 0 (the dummy) means "not supplied"
    // and publishes as 1.0 so the accumulate-side ratio correction is inert.
    textureStore(exposureOut, vec2i(0), vec4f(exposure, avgLum, host, 0.0));
}
`);function Pr(a,e=!1){return Ae(Me,ks,`
@group(0) @binding(1) var inputColor : texture_2d<f32>;
@group(0) @binding(2) var exposureTex : texture_2d<f32>;
@group(0) @binding(3) var outputColor : texture_storage_2d<rgba16float, write>;
@group(0) @binding(4) var alphaSource : texture_2d<f32>;

// Maximum sharpening lobe magnitude — set so a single tap cannot exceed the
// local contrast ring (0.25 - 1/16 in the reference).
const RCAS_LIMIT : f32 = 0.25 - (1.0 / 16.0);
${e?`
// Loads a display-resolution texel as-is: conditioned tonemap-space history on
// the temporal path, the caller's linear domain on the spatial path (main
// conditions those taps itself).
fn rcasLoad(p : vec2i) -> vec3f {
    let clamped = clamp(p, vec2i(0), vec2i(C.displaySize) - 1);
    return textureLoad(inputColor, clamped, 0).rgb;
}`:`
// Loads a display-resolution texel in the caller's linear/HDR domain.
fn rcasLoad(p : vec2i) -> vec3f {
    let clamped = clamp(p, vec2i(0), vec2i(C.displaySize) - 1);
    let c = textureLoad(inputColor, clamped, 0).rgb;
    if (hasFlag(FLAG_INPUT_REINHARD)) {
        // Undo the pre-exposure the accumulate pass baked in before tonemapping.
        let exposure = max(textureLoad(exposureTex, vec2i(0), 0).r, 1.0e-4);
        return tonemapInvert(c) / exposure;
    }
    return c;
}`}

@compute @workgroup_size(8, 8)
fn main(@builtin(global_invocation_id) gid : vec3u) {
    if (any(vec2f(gid.xy) >= C.displaySize)) { return; }
    let sp = vec2i(gid.xy);

    //* Cross Neighborhood
    //   b
    // d e f
    //   h
${e?`    let bIn = rcasLoad(sp + vec2i(0, -1));
    let dIn = rcasLoad(sp + vec2i(-1, 0));
    let eIn = rcasLoad(sp);
    let fIn = rcasLoad(sp + vec2i(1, 0));
    let hIn = rcasLoad(sp + vec2i(0, 1));
    // The limiter below assumes [0,1]. Accumulate history already arrives
    // conditioned; the spatial path's linear/HDR taps get the same invertible
    // tonemap here, so both paths sharpen in one bounded space. A uniform
    // branch, not select(), so the temporal path pays nothing for it.
    var b = bIn;
    var d = dIn;
    var e = eIn;
    var f = fIn;
    var h = hIn;
    if (!hasFlag(FLAG_INPUT_REINHARD)) {
        b = tonemapInvertible(bIn);
        d = tonemapInvertible(dIn);
        e = tonemapInvertible(eIn);
        f = tonemapInvertible(fIn);
        h = tonemapInvertible(hIn);
    }`:`    let b = rcasLoad(sp + vec2i(0, -1));
    let d = rcasLoad(sp + vec2i(-1, 0));
    let e = rcasLoad(sp);
    let f = rcasLoad(sp + vec2i(1, 0));
    let h = rcasLoad(sp + vec2i(0, 1));`}
${a?`
    // FSR's inexpensive luma is scaled by two; the scale cancels in ratios.
    let bL = 0.5 * b.r + b.g + 0.5 * b.b;
    let dL = 0.5 * d.r + d.g + 0.5 * d.b;
    let eL = 0.5 * e.r + e.g + 0.5 * e.b;
    let fL = 0.5 * f.r + f.g + 0.5 * f.b;
    let hL = 0.5 * h.r + h.g + 0.5 * h.b;
`:""}

    //* Sharpening Lobe
    // Min/max ring per channel bounds how strong the negative lobe may be
    // before the output would exceed local contrast.
    let mn4 = min(min(b, d), min(f, h));
    let mx4 = max(max(b, d), max(f, h));
${a?`
    let lowerLimiterMultiplier = clamp(
        eL / min(min(bL, dL), min(fL, hL)),
        0.0,
        1.0
    );
`:""}
    let hitMin = mn4 / (4.0 * mx4)${a?" * lowerLimiterMultiplier":""};
    let hitMax = (vec3f(1.0) - mx4) / (4.0 * mn4 - 4.0);
    let lobeRGB = max(-hitMin, hitMax);
    // C.sharpness 1 -> 0 attenuation stops (sharpest), 0 -> 2 stops.
    let peak = exp2(-2.0 * (1.0 - C.sharpness));
    var lobe = max(-RCAS_LIMIT, min(max(lobeRGB.r, max(lobeRGB.g, lobeRGB.b)), 0.0)) * peak;

    //* Denoise (FSR1's FSR_RCAS_DENOISE)
    // A lone luma outlier vs its cross-neighborhood, normalized by the local
    // range, reads as noise; attenuate the lobe there (up to 50%) so RCAS
    // doesn't amplify grain from noisy inputs (e.g. reduced-res SSR/GI).
    if (hasFlag(FLAG_RCAS_DENOISE)) {
${a?`
        let mn = min(min(min(bL, dL), eL), min(fL, hL));
        let mx = max(max(max(bL, dL), eL), max(fL, hL));
        var nz = 0.25 * (bL + dL + fL + hL) - eL;
        nz = clamp(abs(nz) / max(mx - mn, 1.0e-4), 0.0, 1.0);
        lobe *= 1.0 - 0.5 * nz;
`:`
        let mn = min(min(b.g, d.g), min(f.g, h.g));
        let mx = max(max(b.g, d.g), max(f.g, h.g));
        var nz = 0.25 * (b.g + d.g + f.g + h.g) - e.g;
        nz = clamp(abs(nz) / max(mx - mn, 1.0e-4), 0.0, 1.0);
        lobe *= 1.0 - 0.5 * nz;
`}
    }

    //* Resolve
    let rcpL = 1.0 / (4.0 * lobe + 1.0);
${e?`
    var pix = (lobe * b + lobe * d + lobe * h + lobe * f + e) * rcpL;
    if (hasFlag(FLAG_INPUT_REINHARD)) {
        // Undo the accumulate conditioning once on the sharpened result: invert
        // the tonemap, then divide out the baked-in pre-exposure.
        let exposure = max(textureLoad(exposureTex, vec2i(0), 0).r, 1.0e-4);
        pix = tonemapInvert(max(pix, vec3f(0.0))) / exposure;
    } else {
        // Spatial: invert the tap conditioning once. Unlike accumulate history,
        // this input has no pre-exposure bounding it, so two guards:
        // - anchor on the exact linear center — an unsharpened pixel passes
        //   through bit-exact, and values beyond tonemapInvert's clamp
        //   (linear ~1000) are not flattened to it;
        // - cap at linear RCAS's own maximum gain for this sharpness. An
        //   isolated peak overshoots the conditioned range, and inverting that
        //   multiplies it up to ~1000x (a lone 0.5 on near-black became 1303
        //   at sharpness 1 in GPU probes).
        let maxIn = max(max(max(bIn, dIn), max(fIn, hIn)), max(eIn, vec3f(0.0)));
        let maxGain = 1.0 / (1.0 - 4.0 * RCAS_LIMIT * peak);
        pix = clamp(
            eIn + tonemapInvert(max(pix, vec3f(0.0))) - tonemapInvert(e),
            vec3f(0.0),
            maxIn * maxGain
        );
    }`:`
    let pix = (lobe * b + lobe * d + lobe * h + lobe * f + e) * rcpL;`}

    textureStore(outputColor, gid.xy, vec4f(pix, textureLoad(alphaSource, sp, 0).a));
}
`)}function mo(a){const e=Pr(!0);return a==="hoisted"?e.replace(`fn rcasLoad(p : vec2i) -> vec3f {
    let clamped = clamp(p, vec2i(0), vec2i(C.displaySize) - 1);
    let c = textureLoad(inputColor, clamped, 0).rgb;
    if (hasFlag(FLAG_INPUT_REINHARD)) {
        // Undo the pre-exposure the accumulate pass baked in before tonemapping.
        let exposure = max(textureLoad(exposureTex, vec2i(0), 0).r, 1.0e-4);
        return tonemapInvert(c) / exposure;
    }
    return c;
}`,`fn rcasLoad(p : vec2i, rcpExposure : f32) -> vec3f {
    let clamped = clamp(p, vec2i(0), vec2i(C.displaySize) - 1);
    let c = textureLoad(inputColor, clamped, 0).rgb;
    if (hasFlag(FLAG_INPUT_REINHARD)) {
        return tonemapInvert(c) * rcpExposure;
    }
    return c;
}`).replace("    let sp = vec2i(gid.xy);",`    let sp = vec2i(gid.xy);
    // Undo the pre-exposure the accumulate pass baked in — once, not per tap.
    var rcpExposure = 1.0;
    if (hasFlag(FLAG_INPUT_REINHARD)) {
        rcpExposure = 1.0 / max(textureLoad(exposureTex, vec2i(0), 0).r, 1.0e-4);
    }`).replace(/rcasLoad\(sp( \+ vec2i\(-?\d, -?\d\))?\)/g,t=>t.replace(/\)$/,", rcpExposure)")):e.replace(`fn rcasLoad(p : vec2i) -> vec3f {
    let clamped = clamp(p, vec2i(0), vec2i(C.displaySize) - 1);
    let c = textureLoad(inputColor, clamped, 0).rgb;
    if (hasFlag(FLAG_INPUT_REINHARD)) {
        // Undo the pre-exposure the accumulate pass baked in before tonemapping.
        let exposure = max(textureLoad(exposureTex, vec2i(0), 0).r, 1.0e-4);
        return tonemapInvert(c) / exposure;
    }
    return c;
}`,`fn rcasLoad(p : vec2i) -> vec3f {
    let clamped = clamp(p, vec2i(0), vec2i(C.displaySize) - 1);
    return textureLoad(inputColor, clamped, 0).rgb;
}`).replace(`    let pix = (lobe * b + lobe * d + lobe * h + lobe * f + e) * rcpL;

    textureStore(outputColor, gid.xy, vec4f(pix, textureLoad(alphaSource, sp, 0).a));`,`    var pix = (lobe * b + lobe * d + lobe * h + lobe * f + e) * rcpL;
    if (hasFlag(FLAG_INPUT_REINHARD)) {
        // Undo the conditioning once on the sharpened result instead of per tap.
        let exposure = max(textureLoad(exposureTex, vec2i(0), 0).r, 1.0e-4);
        pix = tonemapInvert(max(pix, vec3f(0.0))) / exposure;
    }

    textureStore(outputColor, gid.xy, vec4f(pix, textureLoad(alphaSource, sp, 0).a));`)}Pr(!1);Pr(!0);const mh=Pr(!0,!0);mo("hoisted");mo("tonemap-space");const gh=Ae(Me,lh,`
@group(0) @binding(1) var sceneDepth : texture_depth_2d;
@group(0) @binding(2) var sceneVelocity : texture_2d<f32>;
@group(0) @binding(3) var previousDepth : texture_2d<f32>;
@group(0) @binding(4) var dilatedDepth : texture_storage_2d<r32float, write>;
@group(0) @binding(5) var dilatedMotion : texture_storage_2d<rgba16float, write>;
@group(0) @binding(6) var maskOutput : texture_storage_2d<rgba8unorm, write>;

// AMD's separation tolerance (ffx_fsr2_depth_clip.h): the minimum view-depth
// gap that reads as a different surface scales with viewport resolution and
// scene depth, absorbing depth-buffer quantization without a scene-tuned guess.
const DEPTH_SEPARATION_CONSTANT : f32 = 1.37e-5;
// Bilinear taps lighter than this cannot vote (matches the reference).
const DEPTH_TAP_WEIGHT_FLOOR : f32 = 6.1e-4;

@compute @workgroup_size(8, 8)
fn main(@builtin(global_invocation_id) gid : vec3u) {
    if (any(vec2f(gid.xy) >= C.renderSize)) { return; }
    let center = vec2i(gid.xy);
    let maxCoord = vec2i(C.renderSize) - 1;

    //* Nearest Depth Search (dilate)
    // With a reversed depth buffer larger values are nearer; otherwise smaller.
    let reversed = hasFlag(FLAG_REVERSED_DEPTH);
    var bestDepth = textureLoad(sceneDepth, center, 0);
    var farthestDepth = bestDepth;
    var bestCoord = center;
    for (var y = -1; y <= 1; y++) {
        for (var x = -1; x <= 1; x++) {
            if (x == 0 && y == 0) { continue; }
            let p = clamp(center + vec2i(x, y), vec2i(0), maxCoord);
            let d = textureLoad(sceneDepth, p, 0);
            // Parenthesize the comparisons: WGSL otherwise parses the
            // '<' ... '>' as a template argument list and fails to compile.
            let nearer = select((d < bestDepth), (d > bestDepth), reversed);
            if (nearer) {
                bestDepth = d;
                bestCoord = p;
            }
            let farther = select((d > farthestDepth), (d < farthestDepth), reversed);
            if (farther) { farthestDepth = d; }
        }
    }

    let curDepth = linearizeDepth(bestDepth);
    // The neighborhood's own depth relief in view units — how much the local
    // surface slopes across one texel ring. A reprojected tap can legitimately
    // land anywhere inside this relief without being a different surface.
    let localRelief = max(linearizeDepth(farthestDepth) - curDepth, 0.0);
    let uvDelta = textureLoad(sceneVelocity, bestCoord, 0).xy * C.motionScale;
    textureStore(dilatedDepth, gid.xy, vec4f(curDepth, 0.0, 0.0, 0.0));
    textureStore(dilatedMotion, gid.xy, vec4f(uvDelta, 0.0, 0.0));

    //* Depth Clip — disocclusion from the just-dilated depth + motion.
    // Derived from AMD's formulation (ffx_fsr2_depth_clip.h ComputeDepthClip,
    // via the GPU-verified candidate port): each bilinear tap of last frame's
    // dilated depth votes a confidence that its separation from the current
    // depth is within the viewport/depth-scaled tolerance. We diverge in the
    // aggregation — the best tap wins instead of a positive-separation-only
    // weighted mean — because our cross-frame compare (unlike upstream's
    // same-frame scatter) carries the previous frame's silhouette
    // quantization; see the vote comment below.
    let uv = (vec2f(gid.xy) + 0.5) * C.renderSizeInv;
    // Texel i samples the scene at i + jitter, so the previous frame's
    // equivalent position shifts by the jitter delta — without this the
    // comparison point oscillates ±½ texel with the jitter sequence, which
    // on a depth gradient reads as per-phase disocclusion flicker.
    let prevUV = uv - uvDelta + (C.jitter - C.jitterPrev) * C.renderSizeInv;
    if (any(prevUV < vec2f(0.0)) || any(prevUV > vec2f(1.0))) {
        textureStore(maskOutput, gid.xy, vec4f(1.0, 0.0, 0.0, 1.0));
        return;
    }
    let samplePosition = prevUV * C.renderSize - 0.5;
    let base = vec2i(floor(samplePosition));
    let fraction = fract(samplePosition);
    let offsets = array<vec2i, 4>(vec2i(0, 0), vec2i(1, 0), vec2i(0, 1), vec2i(1, 1));
    let weights = vec4f(
        (1.0 - fraction.x) * (1.0 - fraction.y),
        fraction.x * (1.0 - fraction.y),
        (1.0 - fraction.x) * fraction.y,
        fraction.x * fraction.y
    );
    let halfViewportWidth = length(C.renderSize * 0.5);
    var surfaceConfidence = 0.0;
    var sawValidTap = false;
    for (var index = 0; index < 4; index++) {
        let weight = weights[index];
        if (weight <= DEPTH_TAP_WEIGHT_FLOOR) { continue; }
        let p = clamp(base + offsets[index], vec2i(0), maxCoord);
        let prevDepth = textureLoad(previousDepth, p, 0).r;
        let difference = curDepth - prevDepth;
        // A tap at or behind the current surface recognizes it as visible last
        // frame — full confidence. Taps in front witness a possible occluder,
        // with confidence falling as the separation exceeds the tolerance.
        var tapConfidence = 1.0;
        if (difference > 0.0) {
            // Tolerance: the viewport/depth-scaled quantization term (reference
            // formulation), widened by the neighborhood's own relief so a
            // slope's legitimate per-texel depth change is not read as
            // separation.
            let required = max(
                DEPTH_SEPARATION_CONSTANT * halfViewportWidth * max(curDepth, prevDepth),
                localRelief,
            );
            tapConfidence = clamp(required / max(difference, 1.0e-7), 0.0, 1.0);
        }
        // MAX vote, not a weighted mean: the previous dilated-depth field is
        // quantized to texels, so its silhouette boundary lands up to a texel
        // away from this frame's — on a still scene one straddling tap then
        // reads the old occluder and, under a mean (worse: under the old
        // positive-difference-only vote, where agreeing taps carried no
        // weight), re-disoccludes every silhouette every frame — rolling
        // accumulation-age rings and permanent edge shimmer (consumer report
        // 3). If ANY footprint tap recognizes the current surface, it is the
        // same surface; a genuine disocclusion trail has every tap on the old
        // occluder and still reads ~1.
        surfaceConfidence = max(surfaceConfidence, tapConfidence);
        sawValidTap = true;
    }
    let disocclusion = select(0.0, clamp(1.0 - surfaceConfidence, 0.0, 1.0), sawValidTap);
    textureStore(maskOutput, gid.xy, vec4f(disocclusion, 0.0, 0.0, 1.0));
}
`),xh=Ae(Me,vi,`
@group(0) @binding(1) var inputColor : texture_2d<f32>;
@group(0) @binding(2) var lumaHistoryIn : texture_2d<f32>;
@group(0) @binding(3) var dilatedMotion : texture_2d<f32>;
@group(0) @binding(4) var exposureTex : texture_2d<f32>;
@group(0) @binding(5) var exposurePrevTex : texture_2d<f32>;
@group(0) @binding(6) var lumaHistoryOut : texture_storage_2d<r32float, write>;
@group(0) @binding(7) var shadingChangeOut : texture_storage_2d<r32float, write>;
@group(0) @binding(8) var masks : texture_2d<f32>;

// Per-thread block state: x = current-luma sum, y = reprojected previous-luma
// sum, z = current-luma² sum (for the block's coefficient of variation).
// Luma is averaged BEFORE taking any ratio: per-texel relative differences are
// asymmetric (the darker side of any jitter/alias residue always yields the
// larger ratio), so their signed mean carries a coherent bias on
// high-frequency content — measured as a 0.07–0.10 still-scene floor.
var<workgroup> tileSums : array<vec3f, 64>;

// Per-scale base noise floors for the relative difference of block means.
// Only the 4×4 and 8×8 scales contribute to the response — this is the
// "coarse mip" of the roadmap item: 2×2 means of a thin feature still swing
// under sub-pixel jitter no matter the floor (measured as per-block speckle on
// grid intersections and silhouettes), while a genuinely changing small
// feature still moves its containing 4×4 mean.
const SHADING_FLOOR_MID : f32 = 0.08;    // 4×4 render-texel means
const SHADING_FLOOR_COARSE : f32 = 0.04; // 8×8
// Adaptive part: jitter/alias flicker of a block mean scales with the block's
// own luma contrast, so the floor grows with its coefficient of variation.
// Flat regions (cv ≈ 0) stay maximally sensitive; a checkerboard block
// (cv ≈ 1) is inherently ambiguous and defers to the variance-clip path.
const SHADING_FLOOR_CV : f32 = 0.35;

// Sums this texel's current luma, the previous frame's luma reprojected to the
// same world position (jitter-delta compensated, bilinear — r32float is not
// filterable), and current luma². Reset/offscreen texels contribute neutrally
// (prev = cur), and disoccluded texels are neutralized toward it — their
// previous luma belongs to another surface, and disocclusion already discards
// that history downstream.
fn lumaPair(coord : vec2i, currentLuma : f32, hostRatio : f32, conditioning : f32) -> vec3f {
    let neutral = vec3f(currentLuma, currentLuma, currentLuma * currentLuma);
    if (hasFlag(FLAG_RESET)) { return neutral; }
    let uv = (vec2f(coord) + 0.5) * C.renderSizeInv;
    let motion = textureLoad(dilatedMotion, coord, 0).xy;
    // Texel i samples the scene at i + jitter, so the previous frame's
    // equivalent position shifts by the jitter delta.
    let previousUv = uv - motion + (C.jitter - C.jitterPrev) * C.renderSizeInv;
    if (any(previousUv < vec2f(0.0)) || any(previousUv > vec2f(1.0))) {
        return neutral;
    }
    let pos = previousUv * C.renderSize - 0.5;
    let base = floor(pos);
    let fraction = pos - base;
    let maxCoord = vec2i(C.renderSize) - 1;
    let p00 = clamp(vec2i(base), vec2i(0), maxCoord);
    let p11 = clamp(vec2i(base) + 1, vec2i(0), maxCoord);
    let l00 = textureLoad(lumaHistoryIn, p00, 0).r;
    let l10 = textureLoad(lumaHistoryIn, vec2i(p11.x, p00.y), 0).r;
    let l01 = textureLoad(lumaHistoryIn, vec2i(p00.x, p11.y), 0).r;
    let l11 = textureLoad(lumaHistoryIn, p11, 0).r;
    let previousHostLuma = mix(mix(l00, l10, fraction.x), mix(l01, l11, fraction.x), fraction.y);
    var previousLuma = previousHostLuma * hostRatio * conditioning;
    let disocclusion = textureLoad(masks, coord, 0).r;
    previousLuma = mix(previousLuma, currentLuma, clamp(disocclusion, 0.0, 1.0));
    return vec3f(currentLuma, previousLuma, currentLuma * currentLuma);
}

// Relative difference of two block means, gated by the scale's base floor
// plus the block's own contrast-scaled flicker allowance.
fn scaleResponse(sums : vec3f, count : f32, floorBase : f32) -> f32 {
    let maximum = max(sums.x, sums.y);
    if (maximum <= 1.0e-5) { return 0.0; }
    let mean = sums.x / count;
    let variance = max(sums.z / count - mean * mean, 0.0);
    let cv = sqrt(variance) / max(mean, 1.0e-4);
    let floorValue = floorBase + SHADING_FLOOR_CV * cv;
    let relative = 1.0 - min(sums.x, sums.y) / maximum;
    return smoothstep(floorValue, floorValue * 3.0, relative);
}

@compute @workgroup_size(8, 8)
fn main(
    @builtin(global_invocation_id) gid : vec3u,
    @builtin(local_invocation_id) lid : vec3u,
    @builtin(local_invocation_index) lidx : u32,
) {
    // Hoisted once per invocation — the source-style candidate reloaded these
    // 1×1 texels inside every reduction tap, which dominated its cost.
    let frameInfo = textureLoad(exposureTex, vec2i(0), 0);
    let hostPrev = textureLoad(exposurePrevTex, vec2i(0), 0).b;
    let hostRatio = select(1.0, frameInfo.b / hostPrev, hostPrev > 1.0e-4 && frameInfo.b > 1.0e-4);
    let conditioning = max(frameInfo.r, 1.0e-4);

    //* Fine Sums + Luma History (2×2 render block per thread)
    let origin = vec2i(gid.xy) * 2;
    let maxCoord = vec2i(C.renderSize) - 1;
    var sums0 = vec3f(0.0);
    for (var y = 0; y < 2; y++) {
        for (var x = 0; x < 2; x++) {
            let coord = clamp(origin + vec2i(x, y), vec2i(0), maxCoord);
            // History stays in the caller's host domain; host + conditioning
            // are applied to both sides of the comparison only.
            let hostLuma = luma(textureLoad(inputColor, coord, 0).rgb);
            textureStore(lumaHistoryOut, origin + vec2i(x, y), vec4f(hostLuma, 0.0, 0.0, 0.0));
            sums0 += lumaPair(coord, hostLuma * conditioning, hostRatio, conditioning);
        }
    }
    tileSums[lidx] = sums0;
    workgroupBarrier();

    // Grid guards sit AFTER the barrier: every invocation must reach it
    // (uniform control flow), and out-of-range texture writes above are no-ops.
    if (any(vec2f(gid.xy) >= C.renderSize)) { return; }
    let outputSize = vec2u(textureDimensions(shadingChangeOut));
    if (any(gid.xy >= outputSize)) { return; }

    //* Coarse Sums (workgroup-local: 4×4 render per mid, 8×8 per coarse)
    let base1 = (lid.xy / 2u) * 2u;
    var sums1 = vec3f(0.0);
    for (var y = 0u; y < 2u; y++) {
        for (var x = 0u; x < 2u; x++) {
            sums1 += tileSums[(base1.y + y) * 8u + base1.x + x];
        }
    }

    let base2 = (lid.xy / 4u) * 4u;
    var sums2 = vec3f(0.0);
    for (var y = 0u; y < 4u; y++) {
        for (var x = 0u; x < 4u; x++) {
            sums2 += tileSums[(base2.y + y) * 8u + base2.x + x];
        }
    }

    //* Resolve — strongest floor-gated mean-ratio across the coarse scales.
    let response = max(
        scaleResponse(sums1, 16.0, SHADING_FLOOR_MID),
        scaleResponse(sums2, 64.0, SHADING_FLOOR_COARSE),
    );
    textureStore(shadingChangeOut, vec2i(gid.xy), vec4f(response, 0.0, 0.0, 1.0));
}
`);class vh{constructor(e){L(this,"settings",{sharpness:.8,rcasDenoise:!1,maxAccumulation:24,exposure:1,autoExposure:!0,lockThinFeatures:!0,detectShadingChanges:!0,debugView:ms.None}),L(this,"unjitteredProjectionMatrix",new U),L(this,"_renderer"),L(this,"_rcasShader"),L(this,"_device"),L(this,"_constants"),L(this,"_timer"),L(this,"_linearSampler"),L(this,"_blitPass"),L(this,"_easuPass"),L(this,"_rcasPass"),L(this,"_reconstructPass"),L(this,"_accumulatePass"),L(this,"_exposurePass"),L(this,"_generateReactivePass"),L(this,"_shadingChangePass"),L(this,"_debugPass"),L(this,"_path","temporal"),L(this,"_displayWidth",0),L(this,"_displayHeight",0),L(this,"_renderWidth",0),L(this,"_renderHeight",0),L(this,"_ratio",1),L(this,"_jitter"),L(this,"_jitterEnabled",!0),L(this,"_viewSnapshot",null),L(this,"_frameIndex",0),L(this,"_pendingReset",!0),L(this,"_warnedMsaa",!1),L(this,"_historyIndex",0),L(this,"_depthIndex",0),L(this,"_initialized",!1),L(this,"_output",null),L(this,"_outputGPU",null),L(this,"_history",null),L(this,"_locks",null),L(this,"_dilatedDepth",null),L(this,"_dilatedMotion",null),L(this,"_masks",null),L(this,"_easuOutput",null),L(this,"_exposure",null),L(this,"_reactiveDummy",null),L(this,"_reactiveGenerated",null),L(this,"_shadingLumaHistory",null),L(this,"_shadingSignal",null),L(this,"_guideTex",{dilatedMotion:null,dilatedDepth:null,masks:null,reactiveGenerated:null,shadingSignal:null,exposure:null,locks:null,history:null}),L(this,"_guides",null),L(this,"_latestDepthWrite",0),L(this,"_latestHistoryWrite",0),L(this,"_guidesPending",!1),this._renderer=e.renderer,this._rcasShader=e._rcasShader??mh}init(){if(this._initialized)return;const e=Gd(this._renderer);this._device=e,this._constants=new Wd(e),this._timer=new qd(e),this._linearSampler=e.createSampler({label:"upscale-linear-clamp",magFilter:"linear",minFilter:"linear",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"}),this._blitPass=new Fe(e,"blit",uh),this._easuPass=new Fe(e,"easu",hh),this._rcasPass=new Fe(e,"rcas",this._rcasShader),this._reconstructPass=new Fe(e,"reconstruct",gh),this._accumulatePass=new Fe(e,"accumulate",ch,{shaderKey:"baseline:accumulate",assembledChunks:[]}),this._exposurePass=new Fe(e,"exposure",ph),this._shadingChangePass=new Fe(e,"shading-change",xh),this._generateReactivePass=new Fe(e,"gen-reactive",fh),this._debugPass=new Fe(e,"debug",dh,{shaderKey:"baseline:debug",assembledChunks:[]}),this._jitter=new jd(this._ratio),this._initialized=!0}configure(e){if(this._initialized||this.init(),this._path=e.path??"temporal",this._jitterEnabled=e.jitter??!0,this._displayWidth=Math.max(1,Math.floor(e.displayWidth)),this._displayHeight=Math.max(1,Math.floor(e.displayHeight)),e.renderWidth&&e.renderHeight)this._renderWidth=Math.max(1,Math.floor(e.renderWidth)),this._renderHeight=Math.max(1,Math.floor(e.renderHeight)),this._ratio=this._displayWidth/this._renderWidth;else{this._ratio=e.customUpscaleRatio??Zd(e.qualityMode??nt.Quality);const t=Yd(this._displayWidth,this._displayHeight,this._ratio);this._renderWidth=t.width,this._renderHeight=t.height}this._jitter.setRatio(this._ratio),this._allocateTextures(),this.resetHistory()}get renderWidth(){return this._renderWidth}get renderHeight(){return this._renderHeight}get displayWidth(){return this._displayWidth}get displayHeight(){return this._displayHeight}get upscaleRatio(){return this._ratio}get jitterPhaseCount(){return this._jitter.phaseCount}get outputTexture(){if(!this._output)throw this._path==="guides"?new Error("@pmndrs/upscaler: the 'guides' path produces no upscaled output — consume the guides bundle instead (upscaler.guides)."):new Error("@pmndrs/upscaler: configure() must run before outputTexture is used.");return this._output}get guides(){if(!this._guides)throw new Error("@pmndrs/upscaler: guides are only available on the temporal or guides paths, after configure().");return this._guides}get guidesPending(){return this._guidesPending}get gpuTimings(){return this._timer.timings}resetHistory(){this._pendingReset=!0,this._jitter.reset()}beginFrame(e){if(this._restoreView(),e.updateProjectionMatrix(),this.unjitteredProjectionMatrix.copy(e.projectionMatrix),this._path!=="temporal"||!this._jitterEnabled)return;this._jitter.advance();const[t,i]=this._jitter.current;this._viewSnapshot=Qd(e,t,i,this._renderWidth,this._renderHeight)}endFrame(e){this._restoreView()}_restoreView(){this._viewSnapshot&&(Kd(this._viewSnapshot),this._viewSnapshot=null)}dispatch(e,t){if(this._path==="guides")throw new Error("@pmndrs/upscaler: the 'guides' path has no upscale — drive it with dispatchGuides().");if(this._guidesPending)throw new Error("@pmndrs/upscaler: a split frame is in flight — finish it with dispatchUpscale() instead of dispatch().");if(!this._output||!this._outputGPU)throw new Error("@pmndrs/upscaler: configure() must run before dispatch().");this._writeConstants(e,t),this._constants.upload();const i=be(this._renderer,e.color);this._checkMsaa(i,"color");const r=this._device.createCommandEncoder({label:"upscale"});switch(this._timer.beginFrame(),this._path){case"bilinear":this._encodeBlit(r,i.createView(),this._exposure[0].createView(),i.createView());break;case"spatial":this._encodeSpatial(r,i);break;case"temporal":this._encodeTemporal(r,i,e);break}this._timer.resolve(r),this._device.queue.submit([r.finish()]),this._timer.readback(),this._frameIndex++,this._pendingReset=!1,this._path==="temporal"&&(this._historyIndex=1-this._historyIndex,this._depthIndex=1-this._depthIndex)}dispatchGuides(e,t){if(this._path!=="temporal"&&this._path!=="guides")throw new Error(`@pmndrs/upscaler: dispatchGuides() requires the temporal or guides path (got '${this._path}').`);if(!this._dilatedMotion)throw new Error("@pmndrs/upscaler: configure() must run before dispatchGuides().");if(this._guidesPending)throw new Error("@pmndrs/upscaler: dispatchGuides() already ran this frame — finish with dispatchUpscale().");this._writeConstants(e,t),this._constants.upload();const i=this._device.createCommandEncoder({label:"upscale-guides"});this._timer.beginFrame(),this._encodeGuides(i,e),this._timer.resolve(i),this._device.queue.submit([i.finish()]),this._timer.readback(),this._path==="guides"?(this._frameIndex++,this._pendingReset=!1,this._depthIndex=1-this._depthIndex):this._guidesPending=!0}dispatchUpscale(e,t){if(this._path!=="temporal")throw new Error(`@pmndrs/upscaler: dispatchUpscale() requires the temporal path (got '${this._path}').`);if(!this._guidesPending)throw new Error("@pmndrs/upscaler: call dispatchGuides() first (or use the all-in-one dispatch()).");if(!this._output||!this._outputGPU)throw new Error("@pmndrs/upscaler: configure() must run before dispatchUpscale().");this._writeConstants(e,t),this._constants.upload();const i=be(this._renderer,e.color);this._checkMsaa(i,"color");const r=this._device.createCommandEncoder({label:"upscale-late"});this._timer.beginFrame(),this._encodeLate(r,i,e),this._timer.resolve(r),this._device.queue.submit([r.finish()]),this._timer.readback(),this._guidesPending=!1,this._frameIndex++,this._pendingReset=!1,this._historyIndex=1-this._historyIndex,this._depthIndex=1-this._depthIndex}dispose(){var e,t;this._destroyTextures(),(e=this._constants)==null||e.dispose(),(t=this._timer)==null||t.dispose(),this._initialized=!1}_encodeBlit(e,t,i,r){const n=this._blitPass.createBindGroup([{buffer:this._constants.buffer},t,this._linearSampler,i,this._outputView(),r]),s=e.beginComputePass({label:"upscale-blit",timestampWrites:this._timer.passDescriptor("blit")});this._blitPass.dispatch(s,n,this._displayWidth,this._displayHeight),s.end()}_encodeSpatial(e,t){const i=this._easuPass.createBindGroup([{buffer:this._constants.buffer},t.createView(),this._easuOutput.createView()]),r=e.beginComputePass({label:"upscale-easu",timestampWrites:this._timer.passDescriptor("easu")});this._easuPass.dispatch(r,i,this._displayWidth,this._displayHeight),r.end();const n=this._exposure[0].createView();this.settings.sharpness>0?this._encodeRcas(e,this._easuOutput.createView(),n,this._easuOutput.createView()):this._encodeBlit(e,this._easuOutput.createView(),n,this._easuOutput.createView())}_encodeTemporal(e,t,i){if(!i.depth||!i.velocity)throw new Error("@pmndrs/upscaler: the temporal path requires depth and velocity inputs.");this._encodeGuides(e,{depth:i.depth,velocity:i.velocity}),this._encodeLate(e,t,i)}_encodeGuides(e,t){const i=be(this._renderer,t.depth),r=be(this._renderer,t.velocity);this._checkMsaa(i,"depth"),this._checkMsaa(r,"velocity");const n=i.createView(i.format.includes("stencil")?{aspect:"depth-only"}:void 0),s=this._dilatedDepth[this._depthIndex],o=this._dilatedDepth[1-this._depthIndex];this._latestDepthWrite=this._depthIndex;const l=this._reconstructPass.createBindGroup([{buffer:this._constants.buffer},n,r.createView(),o.createView(),s.createView(),this._dilatedMotion.createView(),this._masks.createView()]),d=e.beginComputePass({label:"upscale-reconstruct",timestampWrites:this._timer.passDescriptor("reconstruct")});this._reconstructPass.dispatch(d,l,this._renderWidth,this._renderHeight),d.end()}_encodeLate(e,t,i){const r=this._dilatedDepth[this._depthIndex],n=this._history[this._historyIndex];this._latestHistoryWrite=1-this._historyIndex;const s=this._history[1-this._historyIndex],o=this._locks[this._historyIndex],l=this._locks[1-this._historyIndex],d=this._exposure[this._historyIndex],c=this._exposure[1-this._historyIndex];let u;if(i.reactiveOpaqueColor){let x=this._reactiveDummy.createView();if(i.reactive){const _=be(this._renderer,i.reactive);if(_===this._reactiveGenerated)throw new Error("@pmndrs/upscaler: `reactive` must not be the generated mask itself (guides.reactive) while `reactiveOpaqueColor` is set — the generator writes that texture. Pass one of the two, not both.");x=_.createView()}const g=be(this._renderer,i.reactiveOpaqueColor),b=this._generateReactivePass.createBindGroup([{buffer:this._constants.buffer},g.createView(),t.createView(),this._reactiveGenerated.createView(),x]),S=e.beginComputePass({label:"upscale-gen-reactive",timestampWrites:this._timer.passDescriptor("genReactive")});this._generateReactivePass.dispatch(S,b,this._renderWidth,this._renderHeight),S.end(),u=this._reactiveGenerated.createView()}else i.reactive?u=be(this._renderer,i.reactive).createView():u=this._reactiveDummy.createView();const h=i.exposureTexture?be(this._renderer,i.exposureTexture).createView():this._reactiveDummy.createView(),f=i.preExposureTexture?be(this._renderer,i.preExposureTexture).createView():this._reactiveDummy.createView(),p=this._exposurePass.createBindGroup([{buffer:this._constants.buffer},t.createView(),this._linearSampler,d.createView(),c.createView(),h,f]),y=e.beginComputePass({label:"upscale-exposure",timestampWrites:this._timer.passDescriptor("exposure")});this._exposurePass.dispatch(y,p,8,8),y.end();let v=this._reactiveDummy.createView();if(this.settings.detectShadingChanges){const x=this._shadingLumaHistory[this._historyIndex],g=this._shadingLumaHistory[1-this._historyIndex],b=this._shadingChangePass.createBindGroup([{buffer:this._constants.buffer},t.createView(),x.createView(),this._dilatedMotion.createView(),c.createView(),d.createView(),g.createView(),this._shadingSignal.createView(),this._masks.createView()]),S=e.beginComputePass({label:"upscale-shading-change",timestampWrites:this._timer.passDescriptor("shadingChange")});this._shadingChangePass.dispatch(S,b,Math.max(1,Math.ceil(this._renderWidth/2)),Math.max(1,Math.ceil(this._renderHeight/2))),S.end(),v=this._shadingSignal.createView()}const w=this._accumulatePass.createBindGroup([{buffer:this._constants.buffer},t.createView(),this._dilatedMotion.createView(),this._masks.createView(),n.createView(),this._linearSampler,s.createView(),o.createView(),l.createView(),c.createView(),u,d.createView(),v]),m=e.beginComputePass({label:"upscale-accumulate",timestampWrites:this._timer.passDescriptor("accumulate")});if(this._accumulatePass.dispatch(m,w,this._displayWidth,this._displayHeight),m.end(),this.settings.debugView!==ms.None){const x=this._debugPass.createBindGroup([{buffer:this._constants.buffer},this._dilatedMotion.createView(),this._masks.createView(),r.createView(),s.createView(),l.createView(),c.createView(),t.createView(),u,this._outputView()]),g=e.beginComputePass({label:"upscale-debug",timestampWrites:this._timer.passDescriptor("output")});this._debugPass.dispatch(g,x,this._displayWidth,this._displayHeight),g.end()}else this.settings.sharpness>0?this._encodeRcas(e,s.createView(),c.createView(),l.createView()):this._encodeBlit(e,s.createView(),c.createView(),l.createView())}_encodeRcas(e,t,i,r){const n=this._rcasPass.createBindGroup([{buffer:this._constants.buffer},t,i,this._outputView(),r]),s=e.beginComputePass({label:"upscale-rcas",timestampWrites:this._timer.passDescriptor("rcas")});this._rcasPass.dispatch(s,n,this._displayWidth,this._displayHeight),s.end()}_checkMsaa(e,t){this._warnedMsaa||e.sampleCount<=1||(this._warnedMsaa=!0,console.warn(`@pmndrs/upscaler: the ${t} input is multisampled (sampleCount=${e.sampleCount}). FSR does its own anti-aliasing — feed it an aliased, single-sample, jittered render with MSAA disabled. Multisampled inputs are not supported.`))}_outputView(){return this._outputGPU.createView({baseMipLevel:0,mipLevelCount:1})}_baseFlags(){let e=0;return this._pendingReset&&(e|=ta),this._renderer.reversedDepthBuffer&&(e|=Jd),e}_writeConstants(e,t){const i=this._constants;if(i.setRenderSize(this._renderWidth,this._renderHeight),i.setDisplaySize(this._displayWidth,this._displayHeight),this._path==="temporal"&&this._jitterEnabled){const[n,s]=this._jitter.current,[o,l]=this._jitter.previous;i.setJitter(n,s,o,l)}else i.setJitter(0,0,0,0);i.setMotionScale(.5,-.5),i.setDepthNearFar(t.near,t.far),i.setSharpness(Math.min(1,Math.max(0,this.settings.sharpness))),i.setMaxAccumulation(Math.max(1,this.settings.maxAccumulation)),i.setExposure(this.settings.exposure),i.setDeltaTime(e.deltaTime??1/60),i.setFrameIndex(this._frameIndex),i.setDebugMode(this.settings.debugView);let r=this._baseFlags();e.reset&&(this._pendingReset=!0,r|=ta),t.isPerspectiveCamera&&(r|=eh),this._path==="temporal"&&(r|=th),this.settings.lockThinFeatures&&(r|=ih),this.settings.autoExposure&&(r|=rh),this.settings.detectShadingChanges&&(r|=sh),(e.reactive||e.reactiveOpaqueColor)&&(r|=nh),e.exposureTexture&&(r|=oh),this.settings.rcasDenoise&&(r|=ah),i.setFlags(r)}_createTexture(e,t,i,r){return this._device.createTexture({label:`upscale-${e}`,size:{width:t,height:i},format:r,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.STORAGE_BINDING})}_createSharedTexture(e,t,i,r){const n=new re(t,i);switch(n.name=`upscale-${e}`,n.colorSpace=Us,n.generateMipmaps=!1,r){case"r32float":n.format=tr,n.type=Xe,n.minFilter=Ve,n.magFilter=Ve;break;case"rgba8unorm":n.format=Ce,n.type=ua;break;case"rgba16float":n.format=Ce,n.type=de;break}return this._renderer.initTexture(n),{tex:n,gpu:be(this._renderer,n)}}_allocateTextures(){this._destroyTextures();const e=this._renderWidth,t=this._renderHeight,i=this._displayWidth,r=this._displayHeight,n=this._path==="guides";if(!n){this._output=new re(i,r),this._output.name="upscale-output",this._output.colorSpace=Us,this._output.type=de,this._output.generateMipmaps=!1,this._renderer.initTexture(this._output),this._outputGPU=be(this._renderer,this._output);const s=this._createSharedTexture("exposure-0",1,1,"rgba16float"),o=this._createSharedTexture("exposure-1",1,1,"rgba16float");this._guideTex.exposure=[s.tex,o.tex],this._exposure=[s.gpu,o.gpu],this._reactiveDummy=this._device.createTexture({label:"upscale-reactive-dummy",size:{width:1,height:1},format:"r8unorm",usage:GPUTextureUsage.TEXTURE_BINDING})}if(this._path==="spatial"&&(this._easuOutput=this._createTexture("easu-output",i,r,"rgba16float")),this._path==="temporal"||n){const s=this._createSharedTexture("dilated-depth-0",e,t,"r32float"),o=this._createSharedTexture("dilated-depth-1",e,t,"r32float");this._guideTex.dilatedDepth=[s.tex,o.tex],this._dilatedDepth=[s.gpu,o.gpu];const l=this._createSharedTexture("dilated-motion",e,t,"rgba16float");this._guideTex.dilatedMotion=l.tex,this._dilatedMotion=l.gpu;const d=this._createSharedTexture("masks",e,t,"rgba8unorm");this._guideTex.masks=d.tex,this._masks=d.gpu,this._latestDepthWrite=this._depthIndex}if(this._path==="temporal"){const s=this._createSharedTexture("history-0",i,r,"rgba16float"),o=this._createSharedTexture("history-1",i,r,"rgba16float");this._guideTex.history=[s.tex,o.tex],this._history=[s.gpu,o.gpu];const l=this._createSharedTexture("locks-0",i,r,"rgba16float"),d=this._createSharedTexture("locks-1",i,r,"rgba16float");this._guideTex.locks=[l.tex,d.tex],this._locks=[l.gpu,d.gpu];const c=this._createSharedTexture("reactive-gen",e,t,"rgba8unorm");this._guideTex.reactiveGenerated=c.tex,this._reactiveGenerated=c.gpu,this._latestHistoryWrite=this._historyIndex,this._shadingLumaHistory=[this._createTexture("shading-luma-0",e,t,"r32float"),this._createTexture("shading-luma-1",e,t,"r32float")];const u=this._createSharedTexture("shading-signal",Math.max(1,Math.ceil(e/2)),Math.max(1,Math.ceil(t/2)),"r32float");this._guideTex.shadingSignal=u.tex,this._shadingSignal=u.gpu}this._guides=this._path==="temporal"||n?this._buildGuides():null}_buildGuides(){const e=this;return{get dilatedMotion(){return e._guideTex.dilatedMotion},get dilatedDepth(){return e._guideTex.dilatedDepth[e._latestDepthWrite]},get previousDepth(){return e._guideTex.dilatedDepth[1-e._latestDepthWrite]},get disocclusion(){return e._guideTex.masks},get reactive(){return e._guideTex.reactiveGenerated},get shadingChange(){return e._guideTex.shadingSignal},get exposure(){var t;return((t=e._guideTex.exposure)==null?void 0:t[e._latestHistoryWrite])??null},get lockStatus(){var t;return((t=e._guideTex.locks)==null?void 0:t[e._latestHistoryWrite])??null},get history(){var t;return((t=e._guideTex.history)==null?void 0:t[e._latestHistoryWrite])??null}}}_destroyTextures(){var e,t,i,r,n,s,o,l,d,c,u;(e=this._output)==null||e.dispose(),this._output=null,this._outputGPU=null,(t=this._easuOutput)==null||t.destroy(),this._easuOutput=null;const h=this._guideTex;(i=h.dilatedMotion)==null||i.dispose(),(r=h.masks)==null||r.dispose(),(n=h.reactiveGenerated)==null||n.dispose(),(s=h.shadingSignal)==null||s.dispose(),(o=h.dilatedDepth)==null||o.forEach(f=>f.dispose()),(l=h.exposure)==null||l.forEach(f=>f.dispose()),(d=h.locks)==null||d.forEach(f=>f.dispose()),(c=h.history)==null||c.forEach(f=>f.dispose()),this._guideTex={dilatedMotion:null,dilatedDepth:null,masks:null,reactiveGenerated:null,shadingSignal:null,exposure:null,locks:null,history:null},this._guides=null,this._guidesPending=!1,this._history=null,this._locks=null,this._dilatedDepth=null,this._dilatedMotion=null,this._masks=null,this._exposure=null,this._reactiveGenerated=null,this._shadingSignal=null,(u=this._reactiveDummy)==null||u.destroy(),this._reactiveDummy=null,this._shadingLumaHistory&&(this._shadingLumaHistory.forEach(f=>f.destroy()),this._shadingLumaHistory=null)}}Ae(Me,vi,`
@group(0) @binding(1) var sourceTexture : texture_2d<f32>;
@group(0) @binding(2) var momentsOut : texture_storage_2d<rgba16float, write>;
@group(0) @binding(3) var coarseOut : texture_storage_2d<rgba16float, write>;

// Declared here, not in the shared constants chunk: only this standalone pass
// reads it, and touching WGSL_CONSTANTS re-fingerprints every shader.
const FLAG_MOMENTS_YCOCG : u32 = 2048u;

// Per-thread (scalar, scalar²), shared for the workgroup-local reduction.
var<workgroup> tileMoments : array<vec2f, 64>;

fn scalarOf(c : vec3f) -> f32 {
    return select(luma(c), (c.r + 2.0 * c.g + c.b) * 0.25, hasFlag(FLAG_MOMENTS_YCOCG));
}

@compute @workgroup_size(8, 8)
fn main(
    @builtin(global_invocation_id) gid : vec3u,
    @builtin(local_invocation_id) lid : vec3u,
    @builtin(local_invocation_index) lidx : u32,
) {
    let maxCoord = vec2i(C.renderSize) - 1;
    let coord = clamp(vec2i(gid.xy), vec2i(0), maxCoord);
    let s = scalarOf(textureLoad(sourceTexture, coord, 0).rgb);
    let m = vec2f(s, s * s);
    // Out-of-range stores are no-ops, so writing before the guard is safe.
    textureStore(momentsOut, vec2i(gid.xy), vec4f(m, 0.0, 0.0));
    tileMoments[lidx] = m;
    workgroupBarrier();

    // Grid guards sit AFTER the barrier: every invocation must reach it
    // (uniform control flow).
    if (any(vec2f(gid.xy) >= C.renderSize)) { return; }

    //* Coarse Level — 4×4 block means, one writer thread per block.
    if ((lid.x % 4u) != 0u || (lid.y % 4u) != 0u) { return; }
    var sum = vec2f(0.0);
    for (var y = 0u; y < 4u; y++) {
        for (var x = 0u; x < 4u; x++) {
            sum += tileMoments[(lid.y + y) * 8u + lid.x + x];
        }
    }
    let coarseCoord = vec2i(gid.xy) / 4;
    if (any(coarseCoord >= vec2i(textureDimensions(coarseOut)))) { return; }
    textureStore(coarseOut, coarseCoord, vec4f(sum / 16.0, 0.0, 0.0));
}
`);function yh(a){const e=a.OnBeforeRenderPipeline,t=a.OnAfterRenderPipeline;return typeof e!="function"||typeof t!="function"?null:{onBefore:e,onAfter:t}}yh(dr);const ni={renderScale:.5,maxSamples:6,denoise:!0,upscale:!0,sharpness:1},bh="./oidn/rt_hdr_alb_nrm.tza";let _e=null,lr=null,Nt=null;function go(a){if(_e)return _e;_e=new Ld(a),_e.renderScale=ni.renderScale,_e.maxSamples=ni.maxSamples,lr=new Fd({initUNetFromURL:Zo,auxWeightsUrl:bh}),_e.setDenoiser(ni.denoise?lr:null);const e=new Bd({Upscaler:vh});return e.sharpness=ni.sharpness,_e.setUpscaler(ni.upscale?e:null),window.__gpupt=_e,_e}function xo(a,e,t){const i=[];e.traverse(r=>{const n=r;n.isLight&&n.visible&&!n.isAmbientLight&&n.intensity<=0&&(n.visible=!1,i.push(n))});try{a.setScene(e,t)}finally{i.forEach(r=>r.visible=!0)}}async function Sh(a,e,t,i){const r=go(a),n=lr._initUNet(!0);xo(r,e,t),r.renderSample(),lr._renderAuxiliaryBuffers(64,64),r.reset(),i(),await n}function Th(a,e,t,i){const r=go(a);Nt||(Nt={tm:a.toneMapping,exp:a.toneMappingExposure}),a.toneMapping=Yo,a.toneMappingExposure=i,xo(r,e,t)}function Ih(a){Nt&&(a.toneMapping=Nt.tm,a.toneMappingExposure=Nt.exp,Nt=null)}function Ch(){_e?.renderSample()}const Rh=()=>_e?.updateCamera();export{ni as GPUPT,Rh as gpuPtCamera,Ih as hideGpuPt,Sh as prewarmGpuPt,Ch as renderGpuPt,Th as showGpuPt};
