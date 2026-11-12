const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./TinyBvhBuilder--dIW-JEv.js","./version-CGX9hwui.js","./index-ZIGozY9A.js","./index-ymtzkAVC.css","./oidnNetwork-BNCLHZ9w.js","./main-CnVK-bUC.js"])))=>i.map(i=>d[i]);
import{_ as Mo}from"./index-ZIGozY9A.js";const Io=5,Po=1,So=2,Kr=.6,Do=.4,To=.1,qi=.02,Ro=1e-4,Uo=.05,Xr=4,Zr=Object.freeze({strength:1,searchRadius:Io,patchRadius:Po,albedoBandwidth:Do,normalBandwidth:Uo,iterations:So}),uA={searchRadius:Io,patchRadius:Po,albedoBandwidth:Do,normalBandwidth:Uo,iterations:So};function Lo(i={}){const e={...Zr};for(const a of Object.keys(e)){const r=i[a];r!==void 0&&(e[a]=r)}if(!Number.isFinite(e.strength)||e.strength<=0)throw new Error("strength must be finite and positive");for(const[a,r,n]of[["searchRadius",1,16],["patchRadius",0,3],["iterations",1,Xr]])if(!Number.isInteger(e[a])||e[a]<r||e[a]>n)throw new Error(`${a} must be an integer from ${r} to ${n}`);for(const a of["albedoBandwidth","normalBandwidth"])if(!Number.isFinite(e[a])||e[a]<1e-4||e[a]>10)throw new Error(`${a} must be finite and from 0.0001 to 10`);const{strength:t,...A}=e;return{type:"jnlm",strength:t,shape:A,dispose(){}}}function Oo(i){return 2**i}function $n(){var i=new Float32Array(9);return i[0]=1,i[4]=1,i[8]=1,i}function hf(i,e){var t=e[0],A=e[1],a=e[2],r=e[3],n=e[4],s=e[5],o=e[6],l=e[7],c=e[8],f=e[9],p=e[10],h=e[11],u=e[12],d=e[13],m=e[14],v=e[15],g=t*s-A*n,w=t*o-a*n,B=t*l-r*n,E=A*o-a*s,b=A*l-r*s,x=a*l-r*o,y=c*d-f*u,T=c*m-p*u,I=c*v-h*u,P=f*m-p*d,S=f*v-h*d,R=p*v-h*m,L=g*R-w*S+B*P+E*I-b*T+x*y;return L?(L=1/L,i[0]=(s*R-o*S+l*P)*L,i[1]=(o*I-n*R-l*T)*L,i[2]=(n*S-s*I+l*y)*L,i[3]=(a*S-A*R-r*P)*L,i[4]=(t*R-a*I+r*T)*L,i[5]=(A*I-t*S-r*y)*L,i[6]=(d*x-m*b+v*E)*L,i[7]=(m*B-u*x-v*w)*L,i[8]=(u*b-d*B+v*g)*L,i):null}function en(i,e){return i[0]=e[0],i[1]=e[1],i[2]=e[2],i[3]=e[3],i[4]=e[4],i[5]=e[5],i[6]=e[6],i[7]=e[7],i[8]=e[8],i[9]=e[9],i[10]=e[10],i[11]=e[11],i[12]=e[12],i[13]=e[13],i[14]=e[14],i[15]=e[15],i}function ti(){var i=new Float32Array(16);return i[0]=1,i[5]=1,i[10]=1,i[15]=1,i}function BA(i,e){var t=e[0],A=e[1],a=e[2],r=e[3],n=e[4],s=e[5],o=e[6],l=e[7],c=e[8],f=e[9],p=e[10],h=e[11],u=e[12],d=e[13],m=e[14],v=e[15],g=t*s-A*n,w=t*o-a*n,B=t*l-r*n,E=A*o-a*s,b=A*l-r*s,x=a*l-r*o,y=c*d-f*u,T=c*m-p*u,I=c*v-h*u,P=f*m-p*d,S=f*v-h*d,R=p*v-h*m,L=g*R-w*S+B*P+E*I-b*T+x*y;return L?(L=1/L,i[0]=(s*R-o*S+l*P)*L,i[1]=(a*S-A*R-r*P)*L,i[2]=(d*x-m*b+v*E)*L,i[3]=(p*b-f*x-h*E)*L,i[4]=(o*I-n*R-l*T)*L,i[5]=(t*R-a*I+r*T)*L,i[6]=(m*B-u*x-v*w)*L,i[7]=(c*x-p*B+h*w)*L,i[8]=(n*S-s*I+l*y)*L,i[9]=(A*I-t*S-r*y)*L,i[10]=(u*b-d*B+v*g)*L,i[11]=(f*B-c*b-h*g)*L,i[12]=(s*T-n*P-o*y)*L,i[13]=(t*P-A*T+a*y)*L,i[14]=(d*w-u*E-m*g)*L,i[15]=(c*E-f*w+p*g)*L,i):null}function pf(i,e,t,A){var a=e[0],r=e[1],n=e[2],s=A[0],o=A[1],l=A[2],c=a-t[0],f=r-t[1],p=n-t[2],h=c*c+f*f+p*p;h>0&&(h=1/Math.sqrt(h),c=c*h,f=f*h,p=p*h);var u=o*p-l*f,d=l*c-s*p,m=s*f-o*c;return h=u*u+d*d+m*m,h>0&&(h=1/Math.sqrt(h),u=u*h,d=d*h,m=m*h),i[0]=u,i[1]=d,i[2]=m,i[3]=0,i[4]=f*m-p*d,i[5]=p*u-c*m,i[6]=c*d-f*u,i[7]=0,i[8]=c,i[9]=f,i[10]=p,i[11]=0,i[12]=a,i[13]=r,i[14]=n,i[15]=1,i}function mf(i,e){var t=e[0],A=e[1],a=e[2],r=e[4],n=e[5],s=e[6],o=e[8],l=e[9],c=e[10];return i[0]=Math.sqrt(t*t+A*A+a*a),i[1]=Math.sqrt(r*r+n*n+s*s),i[2]=Math.sqrt(o*o+l*l+c*c),i}const ZA=Tr;function Tr(i,e,t){var A=e[0],a=e[1],r=e[2],n=e[3],s=e[4],o=e[5],l=e[6],c=e[7],f=e[8],p=e[9],h=e[10],u=e[11],d=e[12],m=e[13],v=e[14],g=e[15],w=t[0],B=t[1],E=t[2],b=t[3];return i[0]=w*A+B*s+E*f+b*d,i[1]=w*a+B*o+E*p+b*m,i[2]=w*r+B*l+E*h+b*v,i[3]=w*n+B*c+E*u+b*g,w=t[4],B=t[5],E=t[6],b=t[7],i[4]=w*A+B*s+E*f+b*d,i[5]=w*a+B*o+E*p+b*m,i[6]=w*r+B*l+E*h+b*v,i[7]=w*n+B*c+E*u+b*g,w=t[8],B=t[9],E=t[10],b=t[11],i[8]=w*A+B*s+E*f+b*d,i[9]=w*a+B*o+E*p+b*m,i[10]=w*r+B*l+E*h+b*v,i[11]=w*n+B*c+E*u+b*g,w=t[12],B=t[13],E=t[14],b=t[15],i[12]=w*A+B*s+E*f+b*d,i[13]=w*a+B*o+E*p+b*m,i[14]=w*r+B*l+E*h+b*v,i[15]=w*n+B*c+E*u+b*g,i}const gf=vf;function vf(i,e,t,A,a,r,n){var s=1/(e-t),o=1/(A-a),l=1/(r-n);return i[0]=-2*s,i[1]=0,i[2]=0,i[3]=0,i[4]=0,i[5]=-2*o,i[6]=0,i[7]=0,i[8]=0,i[9]=0,i[10]=2*l,i[11]=0,i[12]=(e+t)*s,i[13]=(a+A)*o,i[14]=(n+r)*l,i[15]=1,i}const Bf=wf;function wf(i,e,t,A,a){var r=1/Math.tan(e/2);if(i[0]=r/t,i[1]=0,i[2]=0,i[3]=0,i[4]=0,i[5]=r,i[6]=0,i[7]=0,i[8]=0,i[9]=0,i[11]=-1,i[12]=0,i[13]=0,i[15]=0,a!=null&&a!==1/0){var n=1/(A-a);i[10]=(a+A)*n,i[14]=2*a*A*n}else i[10]=-1,i[14]=-2*A;return i}function Ef(i,e,t){var A=t[0],a=t[1],r=t[2];return i[0]=e[0]*A,i[1]=e[1]*A,i[2]=e[2]*A,i[3]=e[3]*A,i[4]=e[4]*a,i[5]=e[5]*a,i[6]=e[6]*a,i[7]=e[7]*a,i[8]=e[8]*r,i[9]=e[9]*r,i[10]=e[10]*r,i[11]=e[11]*r,i[12]=e[12],i[13]=e[13],i[14]=e[14],i[15]=e[15],i}function bf(i,e,t){var A=Math.sin(t),a=Math.cos(t),r=e[0],n=e[1],s=e[2],o=e[3],l=e[4],c=e[5],f=e[6],p=e[7];return e!==i&&(i[8]=e[8],i[9]=e[9],i[10]=e[10],i[11]=e[11],i[12]=e[12],i[13]=e[13],i[14]=e[14],i[15]=e[15]),i[0]=r*a+l*A,i[1]=n*a+c*A,i[2]=s*a+f*A,i[3]=o*a+p*A,i[4]=l*a-r*A,i[5]=c*a-n*A,i[6]=f*a-s*A,i[7]=p*a-o*A,i}function Kn(i,e){return i[0]=e[0],i[1]=e[1],i}function ji(){var i=new Float32Array(2);return i}function Xn(i,e,t){return i[0]=Math.max(e[0],t[0]),i[1]=Math.max(e[1],t[1]),i}function Zn(i,e,t){return i[0]=Math.min(e[0],t[0]),i[1]=Math.min(e[1],t[1]),i}function qa(i,e,t){return i[0]=e[0]*t,i[1]=e[1]*t,i}function At(i,e,t){return i[0]=e,i[1]=t,i}const _f=yf;function yf(i,e,t){return i[0]=e[0]-t[0],i[1]=e[1]-t[1],i}function Ja(i){var e=new Float32Array(3);return e[0]=i[0],e[1]=i[1],e[2]=i[2],e}function Fo(i,e){return i[0]=e[0],i[1]=e[1],i[2]=e[2],i}function me(){var i=new Float32Array(3);return i}function tn(i,e,t){var A=e[0],a=e[1],r=e[2],n=t[0],s=t[1],o=t[2];return i[0]=a*o-r*s,i[1]=r*n-A*o,i[2]=A*s-a*n,i}function es(i,e,t){var A=new Float32Array(3);return A[0]=i,A[1]=e,A[2]=t,A}function xf(i){var e=i[0],t=i[1],A=i[2];return Math.sqrt(e*e+t*t+A*A)}function zo(i,e,t){return i[0]=Math.max(e[0],t[0]),i[1]=Math.max(e[1],t[1]),i[2]=Math.max(e[2],t[2]),i}function ko(i,e,t){return i[0]=Math.min(e[0],t[0]),i[1]=Math.min(e[1],t[1]),i[2]=Math.min(e[2],t[2]),i}function Ft(i,e){var t=e[0],A=e[1],a=e[2],r=t*t+A*A+a*a;return r>0&&(r=1/Math.sqrt(r)),i[0]=e[0]*r,i[1]=e[1]*r,i[2]=e[2]*r,i}function qe(i,e,t,A){return i[0]=e,i[1]=t,i[2]=A,i}const $i=Cf;function Cf(i,e,t){return i[0]=e[0]-t[0],i[1]=e[1]-t[1],i[2]=e[2]-t[2],i}function ts(i,e,t){var A=e[0],a=e[1],r=e[2];return i[0]=A*t[0]+a*t[3]+r*t[6],i[1]=A*t[1]+a*t[4]+r*t[7],i[2]=A*t[2]+a*t[5]+r*t[8],i}function An(i,e,t){var A=e[0],a=e[1],r=e[2],n=t[3]*A+t[7]*a+t[11]*r+t[15];return n=n||1,i[0]=(t[0]*A+t[4]*a+t[8]*r+t[12])/n,i[1]=(t[1]*A+t[5]*a+t[9]*r+t[13])/n,i[2]=(t[2]*A+t[6]*a+t[10]*r+t[14])/n,i}const ai=me();function dA(i,e,t,A,a,r){e=e||3,t=t||0;const n=i.length;for(let s=t;s<n;s+=e)ai[0]=i[s],ai[1]=i[s+1],ai[2]=i[s+2],a(ai,ai,r),i[s]=ai[0],i[s+1]=ai[1],i[s+2]=ai[2];return i}function Q(i,e){return i[e]}function We(i,e,t){i[e]=t}class Ti{name="";transform=ti();get position(){return[Q(this.transform,12),Q(this.transform,13),Q(this.transform,14)]}set position(e){We(this.transform,12,Q(e,0)),We(this.transform,13,Q(e,1)),We(this.transform,14,Q(e,2))}lookAt(e,t=[0,1,0]){const A=mf(new Float32Array(3),this.transform),a=this.position,r=[Q(e,0)-Q(a,0),Q(e,1)-Q(a,1),Q(e,2)-Q(a,2)],n=[r[1]*Q(t,2)-r[2]*Q(t,1),r[2]*Q(t,0)-r[0]*Q(t,2),r[0]*Q(t,1)-r[1]*Q(t,0)],s=Math.hypot(...n)>1e-8?t:Math.abs(r[2])<Math.hypot(...r)*.99?[0,0,-1]:[1,0,0];return pf(this.transform,a,e,s),Ef(this.transform,this.transform,A),this}}class wA extends Ti{projection="perspective";fStop=0;focusDistance=10;sensorHeight=24;metersPerUnit=1;fov=45;near;far;aspect=void 0;left=-1;right=1;top=1;bottom=-1;zoom=1;constructor(e){super(),this.projection=e.projection,this.near=e.near??.1,this.far=e.far??2e3,e.projection==="perspective"?(this.fov=e.fov??45,this.aspect=e.aspect):(this.left=e.left??-1,this.right=e.right??1,this.bottom=e.bottom??-1,this.top=e.top??1)}copy(e){const t=this;return t.projection=e.projection,t.fov=e.fov,t.near=e.near,t.far=e.far,t.aspect=e.aspect,t.zoom=e.zoom,t.fStop=e.fStop,t.focusDistance=e.focusDistance,t.sensorHeight=e.sensorHeight,t.metersPerUnit=e.metersPerUnit,t.left=e.left,t.right=e.right,t.top=e.top,t.bottom=e.bottom,en(t.transform,e.transform),this}clone(){return(this.projection==="perspective"?new wA({projection:"perspective"}):new wA({projection:"orthographic"})).copy(this)}getProjectionMatrix(e=1){const t=this,A=[];if(t.projection==="perspective"){const a=t.fov*Math.PI/180,r=2*Math.atan(Math.tan(a/2)/Math.max(t.zoom,Number.EPSILON));return Bf(A,r,t.aspect??e,t.near,t.far)}return gf(A,(t.left+t.right)/2-(t.right-t.left)/(2*t.zoom),(t.left+t.right)/2+(t.right-t.left)/(2*t.zoom),(t.bottom+t.top)/2-(t.top-t.bottom)/(2*t.zoom),(t.bottom+t.top)/2+(t.top-t.bottom)/(2*t.zoom),t.near,t.far)}}const eA=["depth","position","roughness","diffuseAlbedo","specularAlbedo","id","motion"],ea=4294967295,rA={accumulatedBytes:64,centerBytes:32};let is=0;function No(){if(is>=ea)throw new RangeError("AOV ID space exhausted");return is++}function Ji(i){if(!Number.isInteger(i)||i<0||i>=ea)throw new RangeError("AOV ID must be uint32 excluding 0xFFFFFFFF");return i}function ht(i){let e=0;for(const t of i){const A=eA.indexOf(t);if(A<0)throw new RangeError(`Unknown AOV: ${t}`);e|=1<<A}return e}class Go{frame;instances=new Map;clear(){this.frame=void 0,this.instances.clear()}previous(e){const t=this.frame;return t&&t.width===e.width&&t.height===e.height&&t.projection===e.projection?t:void 0}match(e,t){const A=this.previous(e)?this.instances.get(`${t.object}:${t.instance}`):void 0;return A&&A.topology===t.topology&&A.vertices===t.vertices?A:void 0}accept(e){this.frame={...e,cameraEye:e.cameraEye?.slice(),cameraForward:e.cameraForward?.slice(),viewProjection:e.viewProjection.slice(),instances:e.instances.map(t=>({...t,transform:t.transform.slice()}))},this.instances.clear();for(const t of this.frame.instances)this.instances.set(`${t.object}:${t.instance}`,t)}}const $a=new WeakMap;class Ho extends Ti{get aovId(){return $a.get(this)}set aovId(e){$a.set(this,Ji(e))}materials;geometry;_instances;get instanceData(){const e=this._instances;return e?{count:e.count,transforms:e.transforms,colors:e.colors,transformsVersion:e.transformsVersion,colorsVersion:e.colorsVersion}:void 0}get instanceState(){return this._instances}setInstanceState(e){this._instances=e}constructor(e,t){super(),$a.set(this,No()),this.geometry=e,this.materials=Array.isArray(t)?t:[t]}}class Wo extends Ho{constructor(e,t){super(e,t)}}class rt extends Wo{get instanceData(){return this}transforms;count;colors;get version(){return this._version}_version=0;_transformVersion=0;_colorVersion=0;get transformsVersion(){return this._transformVersion}get colorsVersion(){return this._colorVersion}constructor(e,t,A){if(super(e,t),this.count=A.count,this.transforms=A.transforms??new Float32Array(this.count*16),this.colors=A.colors,this.validate(),!A.transforms)for(let a=0;a<this.count;a++){const r=a*16;this.transforms[r]=this.transforms[r+5]=this.transforms[r+10]=this.transforms[r+15]=1}}markUpdated(){return this.validate(),this._transformVersion++,this._colorVersion++,this._version++,this}markTransformsUpdated(e=0,t=this.count-e){if(this.validate(),!Number.isInteger(e)||!Number.isInteger(t)||e<0||t<0||e+t>this.count)throw new RangeError("Instance transform range must fit the active count.");return this._transformVersion++,this._version++,this}markColorsUpdated(e=0,t=this.count-e){if(this.validate(),!Number.isInteger(e)||!Number.isInteger(t)||e<0||t<0||e+t>this.count)throw new RangeError("Instance color range must fit the active count.");return this._colorVersion++,this._version++,this}validate(){if(!Number.isInteger(this.count)||this.count<0||!(this.transforms instanceof Float32Array)||this.transforms.length<this.count*16)throw new RangeError("InstancedMesh requires a nonnegative count and at least 16 * count Float32 transforms.");if(this.colors!==void 0&&(!(this.colors instanceof Float32Array)||this.colors.length<this.count*3))throw new RangeError("InstancedMesh colors must contain at least 3 * count Float32 values.")}}function an(i){return i instanceof Uint32Array?i:new Uint32Array(i)}function $(i,e){return i[e]}function St(i){return i.length}function jo(i){if(!i.vertexCount)return;const e=an(i.indices.array),t=i.position.array,A=new Float32Array(t.length);i.normal=new Ce(A,3);const a=me(),r=me(),n=me(),s=me(),o=me(),l=me(),c=e?St(e):i.vertexCount;let f,p,h;for(let u=0;u<c;){e?(f=$(e,u++),p=$(e,u++),h=$(e,u++)):(f=u++,p=u++,h=u++),qe(a,t[f*3],t[f*3+1],t[f*3+2]),qe(r,t[p*3],t[p*3+1],t[p*3+2]),qe(n,t[h*3],t[h*3+1],t[h*3+2]),$i(s,a,r),$i(o,r,n),tn(l,s,o);for(let d=0;d<3;d++)A[f*3+d]=A[f*3+d]+l[d],A[p*3+d]=A[p*3+d]+l[d],A[h*3+d]=A[h*3+d]+l[d]}for(let u=0;u<A.length;)qe(l,A[u],A[u+1],A[u+2]),Ft(l,l),A[u++]=l[0],A[u++]=l[1],A[u++]=l[2]}const rn=new WeakSet;function Yo(i){return!!i.tangent&&rn.has(i.tangent)}function Vo(i){if(!i.position||!i.uv||!i.normal)return;const e=i.vertexCount;if(!e)return;const t=new Float32Array(e*3);qo(i,new Float32Array(e*3),t),i.tangent=new Ce(t,3),rn.add(i.tangent)}const As=new WeakMap;function Qf(i){if(!i.position||!i.uv||!i.normal)return;const e=i.vertexCount;if(!e)return;let t=As.get(i);t?.length!==e*3&&(t=new Float32Array(e*3),As.set(i,t)),i.tangent?.array.length!==e*3&&(i.tangent=new Ce(new Float32Array(e*3),3)),qo(i,t,i.tangent.array),rn.add(i.tangent)}function qo(i,e,t){const A=i.uv?.array,a=i.normal?.array,r=i.position?.array;if(!A||!a||!r||!i.vertexCount)return;const n=i.vertexCount;e.fill(0);const s=an(i.indices.array),o=s?St(s):n;for(let l=0;l+2<o;l+=3){const c=s?$(s,l):l,f=s?$(s,l+1):l+1,p=s?$(s,l+2):l+2,h=r[f*3]-r[c*3],u=r[f*3+1]-r[c*3+1],d=r[f*3+2]-r[c*3+2],m=r[p*3]-r[c*3],v=r[p*3+1]-r[c*3+1],g=r[p*3+2]-r[c*3+2],w=A[f*2]-A[c*2],B=A[f*2+1]-A[c*2+1],E=A[p*2]-A[c*2],b=A[p*2+1]-A[c*2+1],x=w*b-E*B;if(Math.abs(x)<1e-12)continue;const y=1/x,T=(h*b-m*B)*y,I=(u*b-v*B)*y,P=(d*b-g*B)*y;for(let S=0;S<3;S++){const R=S===0?c:S===1?f:p;e[R*3]+=T,e[R*3+1]+=I,e[R*3+2]+=P}}for(let l=0;l<n;l++){const c=l*3,f=a[c],p=a[c+1],h=a[c+2],u=e[c]*f+e[c+1]*p+e[c+2]*h;let d=e[c]-f*u,m=e[c+1]-p*u,v=e[c+2]-h*u;const g=Math.hypot(d,m,v);g>1e-8?(d/=g,m/=g,v/=g):d=m=v=0,t[c]=d,t[c+1]=m,t[c+2]=v}}function Jo(i){const e=i.position.array,t=i.boundingBox.min,A=i.boundingBox.max;if(e&&e.length){qe(t,e[0],e[1],e[2]),qe(A,e[0],e[1],e[2]);for(let a=3;a<e.length;){const r=e[a++],n=e[a++],s=e[a++];r<Q(t,0)&&We(t,0,r),n<Q(t,1)&&We(t,1,n),s<Q(t,2)&&We(t,2,s),r>Q(A,0)&&We(A,0,r),n>Q(A,1)&&We(A,1,n),s>Q(A,2)&&We(A,2,s)}}}class Ce{array;itemSize;constructor(e,t){this.array=e,this.itemSize=t}static getItem(e,t,A){const a=e.array,r=e.itemSize,n=A*r;for(let s=0;s<r;s++)t[s]=$(a,n+s)}static getCount(e){return St(e.array)/e.itemSize}}function Mf(i){const e=new Uint32Array(i);for(let t=0;t<e.length;t++)e[t]=t;return new Ce(e,1)}class oi{version=0;_topologyVersion=0;get topologyVersion(){return this._topologyVersion}dynamic=!1;position;normal;tangent;uv;uv1;color;indices;_indexSource;_indexVersion=-1;_indices32=new Uint32Array(0);get indexArray(){const e=this.indices.array;return e instanceof Uint32Array?(this._indexSource&&(this._indexSource=void 0,this._indices32=new Uint32Array(0),this._indexVersion=-1),e):((this._indexSource!==e||this._indexVersion!==this.topologyVersion||this._indices32.length!==e.length)&&(this._indices32=new Uint32Array(e),this._indexSource=e,this._indexVersion=this.topologyVersion),this._indices32)}materialIndex;boundingBox={min:me(),max:me()};constructor(e){this.position=e.position,this.indices=e.indices??Mf(this.vertexCount),this.normal=e.normal??new Ce(new Float32Array(this.vertexCount*3),3),e.normal||jo(this),this.tangent=e.tangent,this.uv=e.uv,this.uv1=e.uv1,this.color=e.color,this.materialIndex=e.materialIndex}markUpdated(){return this._topologyVersion++,this.version++,this}markVerticesUpdated(){return this.version++,this}get vertexCount(){return this.position.array.length/this.position.itemSize}get triangleCount(){return St(this.indices.array)/3}}function nn(i){if(i==="openpbr")return 0;if(i==="gltf")return 1;throw new Error(`Invalid specularAnisotropyModel: ${String(i)}. Expected openpbr or gltf.`)}function as(i,e){return Number.isFinite(i)?Math.min(1,Math.max(0,i)):e}const If=["r","g","b","a"];function sn(i){const e=If.indexOf(i);if(e<0)throw new Error(`Invalid thinFilmMapChannel: ${String(i)}; expected r, g, b or a`);return e}function rs(i,e){return Number.isFinite(i)?Math.max(0,i):e}const ns={specularRoughnessAnisotropy:"specularAnisotropy",coatRoughnessAnisotropy:"coatAnisotropy",subsurfaceScatterAnisotropy:"subsurfaceAnisotropy",geometryOpacity:"opacity",geometryThinWalled:"thinWalled"};function $o(i){const e={...i};for(const t of Object.keys(ns)){const A=ns[t];if(i[t]!==void 0){if(i[A]!==void 0&&i[A]!==i[t])throw new Error(`Conflicting OpenPBR material parameters: ${t} and ${A}`);Object.assign(e,{[A]:i[t]}),delete e[t]}}return e}const Ko=[{key:"baseWeight",type:"float",default:1,category:"param"},{key:"baseColor",type:"color",default:[.8,.8,.8],category:"param"},{key:"baseDiffuseRoughness",type:"float",default:0,category:"param"},{key:"baseMetalness",type:"float",default:0,category:"param"},{key:"specularWeight",type:"float",default:1,category:"param"},{key:"specularColor",type:"color",default:[1,1,1],category:"param"},{key:"specularRoughness",type:"float",default:.3,category:"param"},{key:"specularIor",type:"float",default:1.5,category:"param"},{key:"specularAnisotropy",type:"float",default:0,category:"param"},{key:"transmissionWeight",type:"float",default:0,category:"param"},{key:"transmissionColor",type:"color",default:[1,1,1],category:"param"},{key:"transmissionDepth",type:"float",default:0,category:"param"},{key:"transmissionScatter",type:"color",default:[0,0,0],category:"param"},{key:"transmissionScatterAnisotropy",type:"float",default:0,category:"param"},{key:"transmissionDispersionScale",type:"float",default:0,category:"param"},{key:"transmissionDispersionAbbeNumber",type:"float",default:20,category:"param"},{key:"subsurfaceWeight",type:"float",default:0,category:"param"},{key:"subsurfaceColor",type:"color",default:[.8,.8,.8],category:"param"},{key:"subsurfaceRadius",type:"float",default:1,category:"param"},{key:"subsurfaceRadiusScale",type:"color",default:[1,.5,.25],category:"param"},{key:"subsurfaceAnisotropy",type:"float",default:0,category:"param"},{key:"fuzzWeight",type:"float",default:0,category:"param"},{key:"fuzzColor",type:"color",default:[1,1,1],category:"param"},{key:"fuzzRoughness",type:"float",default:.5,category:"param"},{key:"coatWeight",type:"float",default:0,category:"param"},{key:"coatColor",type:"color",default:[1,1,1],category:"param"},{key:"coatRoughness",type:"float",default:0,category:"param"},{key:"coatAnisotropy",type:"float",default:0,category:"param"},{key:"coatIor",type:"float",default:1.6,category:"param"},{key:"coatDarkening",type:"float",default:1,category:"param"},{key:"thinFilmWeight",type:"float",default:0,category:"param"},{key:"thinFilmThickness",type:"float",default:.5,category:"param"},{key:"thinFilmIor",type:"float",default:1.4,category:"param"},{key:"emissionColor",type:"color",default:[1,1,1],category:"param"},{key:"emissionLuminance",type:"float",default:0,category:"param"},{key:"opacity",type:"float",default:1,category:"param"},{key:"thinWalled",type:"bool",default:!1,category:"param"},{key:"doubleSided",type:"bool",default:!1,category:"param"},{key:"map",type:"texture",default:void 0,category:"texture"},{key:"alphaMap",type:"texture",default:void 0,category:"texture"},{key:"alphaMode",type:"enum",default:"auto",category:"param"},{key:"alphaCutoff",type:"float",default:0,category:"param"},{key:"emissiveMap",type:"texture",default:void 0,category:"texture"},{key:"normalMap",type:"texture",default:void 0,category:"texture"},{key:"normalScale",type:"vec2",default:[1,1],category:"param"},{key:"metallicRoughnessMap",type:"texture",default:void 0,category:"texture"},{key:"roughnessMap",type:"texture",default:void 0,category:"texture"},{key:"metalnessMap",type:"texture",default:void 0,category:"texture"},{key:"transmissionMap",type:"texture",default:void 0,category:"texture"},{key:"thinFilmMap",type:"texture",default:void 0,category:"texture"},{key:"shadowCatcher",type:"bool",default:!1,category:"param"},{key:"unlit",type:"bool",default:!1,category:"param"},{key:"bevelSize",type:"float",default:0,category:"param"},{key:"mapAlphaUsage",type:"enum",default:"opaque",category:"param"},{key:"uvProjection",type:"enum",default:"none",category:"param"},{key:"uvProjectionScale",type:"vec2",default:[1,1],category:"param"},{key:"displacementUvProjection",type:"enum",default:"none",category:"geometry"},{key:"displacementUvProjectionScale",type:"float",default:1,category:"geometry"},{key:"displacementMap",type:"texture",default:void 0,category:"texture"},{key:"displacementScale",type:"float",default:.1,category:"geometry"},{key:"displacementStepSize",type:"float",default:0,category:"geometry"},{key:"thinFilmThicknessMinimum",type:"float",default:0,category:"param"},{key:"thinFilmMapChannel",type:"enum",default:"r",category:"param"},{key:"coatWeightMap",type:"texture",default:void 0,category:"texture"},{key:"coatRoughnessMap",type:"texture",default:void 0,category:"texture"},{key:"fuzzColorMap",type:"texture",default:void 0,category:"texture"},{key:"fuzzRoughnessMap",type:"texture",default:void 0,category:"texture"},{key:"specularWeightMap",type:"texture",default:void 0,category:"texture"},{key:"specularColorMap",type:"texture",default:void 0,category:"texture"},{key:"anisotropyMap",type:"texture",default:void 0,category:"texture"},{key:"specularAnisotropyRotation",type:"float",default:0,category:"param"},{key:"coatAnisotropyRotation",type:"float",default:0,category:"param"},{key:"specularAnisotropyModel",type:"enum",default:"openpbr",category:"param"},{key:"coatNormalMap",type:"texture",default:void 0,category:"texture"},{key:"coatNormalScale",type:"vec2",default:[1,1],category:"param"},{key:"displacementBias",type:"float",default:0,category:"geometry"}],ss=["baseWeight","baseColor","baseDiffuseRoughness","baseMetalness","specularWeight","specularColor","specularRoughness","specularIor","specularAnisotropy","transmissionWeight","transmissionColor","transmissionDepth","transmissionScatter","transmissionScatterAnisotropy","transmissionDispersionScale","transmissionDispersionAbbeNumber","subsurfaceWeight","subsurfaceColor","subsurfaceRadius","subsurfaceRadiusScale","subsurfaceAnisotropy","fuzzWeight","fuzzColor","fuzzRoughness","coatWeight","coatColor","coatRoughness","coatAnisotropy","coatIor","coatDarkening","thinFilmWeight","thinFilmThickness","thinFilmIor","emissionColor","emissionLuminance","opacity","thinWalled","doubleSided","map","alphaMap","alphaMode","alphaCutoff","emissiveMap","normalMap","normalScale","metallicRoughnessMap","roughnessMap","metalnessMap","transmissionMap","thinFilmMap","shadowCatcher","unlit","bevelSize","mapAlphaUsage","uvProjection","uvProjectionScale","displacementUvProjection","displacementUvProjectionScale","displacementMap","displacementScale","displacementStepSize","thinFilmThicknessMinimum","thinFilmMapChannel","coatWeightMap","coatRoughnessMap","fuzzColorMap","fuzzRoughnessMap","specularWeightMap","specularColorMap","anisotropyMap","specularAnisotropyRotation","coatAnisotropyRotation","specularAnisotropyModel","coatNormalMap","coatNormalScale","displacementBias"],Xo=["map","alphaMap","emissiveMap","normalMap","metallicRoughnessMap","roughnessMap","metalnessMap","transmissionMap","thinFilmMap","displacementMap","coatWeightMap","coatRoughnessMap","fuzzColorMap","fuzzRoughnessMap","specularWeightMap","specularColorMap","anisotropyMap","coatNormalMap"],Pf=["displacementUvProjection","displacementUvProjectionScale","displacementScale","displacementStepSize","displacementBias"],Sf=["baseWeight","baseColor","baseDiffuseRoughness","baseMetalness","specularWeight","specularColor","specularRoughness","specularIor","specularAnisotropy","transmissionWeight","transmissionColor","transmissionDepth","transmissionScatter","transmissionScatterAnisotropy","transmissionDispersionScale","transmissionDispersionAbbeNumber","subsurfaceWeight","subsurfaceColor","subsurfaceRadius","subsurfaceRadiusScale","subsurfaceAnisotropy","fuzzWeight","fuzzColor","fuzzRoughness","coatWeight","coatColor","coatRoughness","coatAnisotropy","coatIor","coatDarkening","thinFilmWeight","thinFilmThickness","thinFilmIor","emissionColor","emissionLuminance","opacity","thinWalled","doubleSided","alphaMode","alphaCutoff","normalScale","shadowCatcher","unlit","bevelSize","mapAlphaUsage","uvProjection","uvProjectionScale","thinFilmThicknessMinimum","thinFilmMapChannel","specularAnisotropyRotation","coatAnisotropyRotation","specularAnisotropyModel","coatNormalScale"],Zo=new Map;for(const i of Ko)Zo.set(i.key,i.default);function X(i){const e=Zo.get(i);return Array.isArray(e)?e.slice():e}function Df(i,e){const t=$o(e);t.thinFilmMapChannel!==void 0&&sn(t.thinFilmMapChannel),t.specularAnisotropyModel!==void 0&&nn(t.specularAnisotropyModel),t.baseWeight!==void 0&&(i.baseWeight=t.baseWeight),t.baseColor!==void 0&&(i.baseColor=t.baseColor),t.baseDiffuseRoughness!==void 0&&(i.baseDiffuseRoughness=t.baseDiffuseRoughness),t.baseMetalness!==void 0&&(i.baseMetalness=t.baseMetalness),t.specularWeight!==void 0&&(i.specularWeight=t.specularWeight),t.specularColor!==void 0&&(i.specularColor=t.specularColor),t.specularRoughness!==void 0&&(i.specularRoughness=t.specularRoughness),t.specularIor!==void 0&&(i.specularIor=t.specularIor),t.specularAnisotropy!==void 0&&(i.specularAnisotropy=t.specularAnisotropy),t.transmissionWeight!==void 0&&(i.transmissionWeight=t.transmissionWeight),t.transmissionColor!==void 0&&(i.transmissionColor=t.transmissionColor),t.transmissionDepth!==void 0&&(i.transmissionDepth=t.transmissionDepth),t.transmissionScatter!==void 0&&(i.transmissionScatter=t.transmissionScatter),t.transmissionScatterAnisotropy!==void 0&&(i.transmissionScatterAnisotropy=t.transmissionScatterAnisotropy),t.transmissionDispersionScale!==void 0&&(i.transmissionDispersionScale=t.transmissionDispersionScale),t.transmissionDispersionAbbeNumber!==void 0&&(i.transmissionDispersionAbbeNumber=t.transmissionDispersionAbbeNumber),t.subsurfaceWeight!==void 0&&(i.subsurfaceWeight=t.subsurfaceWeight),t.subsurfaceColor!==void 0&&(i.subsurfaceColor=t.subsurfaceColor),t.subsurfaceRadius!==void 0&&(i.subsurfaceRadius=t.subsurfaceRadius),t.subsurfaceRadiusScale!==void 0&&(i.subsurfaceRadiusScale=t.subsurfaceRadiusScale),t.subsurfaceAnisotropy!==void 0&&(i.subsurfaceAnisotropy=t.subsurfaceAnisotropy),t.fuzzWeight!==void 0&&(i.fuzzWeight=t.fuzzWeight),t.fuzzColor!==void 0&&(i.fuzzColor=t.fuzzColor),t.fuzzRoughness!==void 0&&(i.fuzzRoughness=t.fuzzRoughness),t.coatWeight!==void 0&&(i.coatWeight=t.coatWeight),t.coatColor!==void 0&&(i.coatColor=t.coatColor),t.coatRoughness!==void 0&&(i.coatRoughness=t.coatRoughness),t.coatAnisotropy!==void 0&&(i.coatAnisotropy=t.coatAnisotropy),t.coatIor!==void 0&&(i.coatIor=t.coatIor),t.coatDarkening!==void 0&&(i.coatDarkening=t.coatDarkening),t.thinFilmWeight!==void 0&&(i.thinFilmWeight=t.thinFilmWeight),t.thinFilmThickness!==void 0&&(i.thinFilmThickness=t.thinFilmThickness),t.thinFilmIor!==void 0&&(i.thinFilmIor=t.thinFilmIor),t.emissionColor!==void 0&&(i.emissionColor=t.emissionColor),t.emissionLuminance!==void 0&&(i.emissionLuminance=t.emissionLuminance),t.opacity!==void 0&&(i.opacity=t.opacity),t.thinWalled!==void 0&&(i.thinWalled=t.thinWalled),t.doubleSided!==void 0&&(i.doubleSided=t.doubleSided),t.map!==void 0&&(i.map=t.map),t.alphaMap!==void 0&&(i.alphaMap=t.alphaMap),t.alphaMode!==void 0&&(i.alphaMode=t.alphaMode),t.alphaCutoff!==void 0&&(i.alphaCutoff=t.alphaCutoff),t.emissiveMap!==void 0&&(i.emissiveMap=t.emissiveMap),t.normalMap!==void 0&&(i.normalMap=t.normalMap),t.normalScale!==void 0&&(i.normalScale=t.normalScale),t.metallicRoughnessMap!==void 0&&(i.metallicRoughnessMap=t.metallicRoughnessMap),t.roughnessMap!==void 0&&(i.roughnessMap=t.roughnessMap),t.metalnessMap!==void 0&&(i.metalnessMap=t.metalnessMap),t.transmissionMap!==void 0&&(i.transmissionMap=t.transmissionMap),t.thinFilmMap!==void 0&&(i.thinFilmMap=t.thinFilmMap),t.shadowCatcher!==void 0&&(i.shadowCatcher=t.shadowCatcher),t.unlit!==void 0&&(i.unlit=t.unlit),t.bevelSize!==void 0&&(i.bevelSize=t.bevelSize),t.mapAlphaUsage!==void 0&&(i.mapAlphaUsage=t.mapAlphaUsage),t.uvProjection!==void 0&&(i.uvProjection=t.uvProjection),t.uvProjectionScale!==void 0&&(i.uvProjectionScale=t.uvProjectionScale),t.displacementUvProjection!==void 0&&(i.displacementUvProjection=t.displacementUvProjection),t.displacementUvProjectionScale!==void 0&&(i.displacementUvProjectionScale=t.displacementUvProjectionScale),t.displacementMap!==void 0&&(i.displacementMap=t.displacementMap),t.displacementScale!==void 0&&(i.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(i.displacementBias=t.displacementBias),t.displacementStepSize!==void 0&&(i.displacementStepSize=t.displacementStepSize),t.thinFilmThicknessMinimum!==void 0&&(i.thinFilmThicknessMinimum=t.thinFilmThicknessMinimum),t.thinFilmMapChannel!==void 0&&(i.thinFilmMapChannel=t.thinFilmMapChannel),t.coatWeightMap!==void 0&&(i.coatWeightMap=t.coatWeightMap),t.coatRoughnessMap!==void 0&&(i.coatRoughnessMap=t.coatRoughnessMap),t.fuzzColorMap!==void 0&&(i.fuzzColorMap=t.fuzzColorMap),t.fuzzRoughnessMap!==void 0&&(i.fuzzRoughnessMap=t.fuzzRoughnessMap),t.specularWeightMap!==void 0&&(i.specularWeightMap=t.specularWeightMap),t.specularColorMap!==void 0&&(i.specularColorMap=t.specularColorMap),t.anisotropyMap!==void 0&&(i.anisotropyMap=t.anisotropyMap),t.specularAnisotropyRotation!==void 0&&(i.specularAnisotropyRotation=t.specularAnisotropyRotation),t.coatAnisotropyRotation!==void 0&&(i.coatAnisotropyRotation=t.coatAnisotropyRotation),t.specularAnisotropyModel!==void 0&&(i.specularAnisotropyModel=t.specularAnisotropyModel),t.coatNormalMap!==void 0&&(i.coatNormalMap=t.coatNormalMap),t.coatNormalScale!==void 0&&(i.coatNormalScale=t.coatNormalScale)}let el=1;const Ka=new WeakMap;function Tf(){el=1}function Ae(i){return i==null?"$":String(i)}function $t(i){return i==null?"$":[i[0],i[1],i[2]].join("_")}function Xa(i){if(i==null)return"$";if(i instanceof Float32Array){const e=[];for(let t=0;t<i.length;t++)e.push(i[t]);return e.join("_")}return[i[0],i[1]].join("_")}function at(i){return i?(Ka.has(i)||Ka.set(i,el++),`${Ka.get(i)}@${i.version}`):"$"}function ii(i){return[Ae(i.baseWeight),$t(i.baseColor),Ae(i.baseDiffuseRoughness),Ae(i.baseMetalness),Ae(i.specularWeight),$t(i.specularColor),Ae(i.specularRoughness),Ae(i.specularIor),Ae(i.specularAnisotropy),Ae(i.transmissionWeight),$t(i.transmissionColor),Ae(i.transmissionDepth),$t(i.transmissionScatter),Ae(i.transmissionScatterAnisotropy),Ae(i.transmissionDispersionScale),Ae(i.transmissionDispersionAbbeNumber),Ae(i.subsurfaceWeight),$t(i.subsurfaceColor),Ae(i.subsurfaceRadius),$t(i.subsurfaceRadiusScale),Ae(i.subsurfaceAnisotropy),Ae(i.fuzzWeight),$t(i.fuzzColor),Ae(i.fuzzRoughness),Ae(i.coatWeight),$t(i.coatColor),Ae(i.coatRoughness),Ae(i.coatAnisotropy),Ae(i.coatIor),Ae(i.coatDarkening),Ae(i.thinFilmWeight),Ae(i.thinFilmThickness),Ae(i.thinFilmIor),$t(i.emissionColor),Ae(i.emissionLuminance),Ae(i.opacity),Ae(i.thinWalled),Ae(i.doubleSided),at(i.map),at(i.alphaMap),Ae(i.alphaMode),Ae(i.alphaCutoff),at(i.emissiveMap),at(i.normalMap),Xa(i.normalScale),at(i.metallicRoughnessMap),at(i.roughnessMap),at(i.metalnessMap),at(i.transmissionMap),at(i.thinFilmMap),Ae(i.shadowCatcher),Ae(i.unlit),Ae(i.bevelSize),Ae(i.mapAlphaUsage),Ae(i.uvProjection),Xa(i.uvProjectionScale),Ae(i.displacementUvProjection),Ae(i.displacementUvProjectionScale),at(i.displacementMap),Ae(i.displacementScale),Ae(i.displacementStepSize),Ae(i.thinFilmThicknessMinimum),Ae(i.thinFilmMapChannel),at(i.coatWeightMap),at(i.coatRoughnessMap),at(i.fuzzColorMap),at(i.fuzzRoughnessMap),at(i.specularWeightMap),at(i.specularColorMap),at(i.anisotropyMap),Ae(i.specularAnisotropyRotation),Ae(i.coatAnisotropyRotation),Ae(i.specularAnisotropyModel),at(i.coatNormalMap),Xa(i.coatNormalScale),Ae(i.displacementBias)].join("_")}const Pi={opaque:0,alpha:2,transmission:3},xt={none:0,spherical:1,cylindrical:2,triplanar:3},si={opaque:0,mask:1,blend:2},Za=new WeakMap;class tl{get aovId(){return Za.get(this)}set aovId(e){Za.set(this,Ji(e))}constructor(e={}){Za.set(this,No()),Df(this,e),e.aovId!==void 0&&(this.aovId=Ji(e.aovId))}baseWeight=X("baseWeight");baseColor=X("baseColor");baseDiffuseRoughness=X("baseDiffuseRoughness");baseMetalness=X("baseMetalness");specularWeight=X("specularWeight");specularColor=X("specularColor");specularRoughness=X("specularRoughness");specularIor=X("specularIor");specularAnisotropy=X("specularAnisotropy");transmissionWeight=X("transmissionWeight");transmissionColor=X("transmissionColor");transmissionDepth=X("transmissionDepth");transmissionScatter=X("transmissionScatter");transmissionScatterAnisotropy=X("transmissionScatterAnisotropy");transmissionDispersionScale=X("transmissionDispersionScale");transmissionDispersionAbbeNumber=X("transmissionDispersionAbbeNumber");subsurfaceWeight=X("subsurfaceWeight");subsurfaceColor=X("subsurfaceColor");subsurfaceRadius=X("subsurfaceRadius");subsurfaceRadiusScale=X("subsurfaceRadiusScale");subsurfaceAnisotropy=X("subsurfaceAnisotropy");fuzzWeight=X("fuzzWeight");fuzzColor=X("fuzzColor");fuzzRoughness=X("fuzzRoughness");coatWeight=X("coatWeight");coatColor=X("coatColor");coatRoughness=X("coatRoughness");coatAnisotropy=X("coatAnisotropy");coatIor=X("coatIor");coatDarkening=X("coatDarkening");thinFilmWeight=X("thinFilmWeight");thinFilmThickness=X("thinFilmThickness");thinFilmIor=X("thinFilmIor");thinFilmThicknessMinimum=X("thinFilmThicknessMinimum");thinFilmMapChannel=X("thinFilmMapChannel");emissionColor=X("emissionColor");emissionLuminance=X("emissionLuminance");opacity=X("opacity");thinWalled=X("thinWalled");doubleSided=X("doubleSided");map;alphaMap;alphaMode=X("alphaMode");alphaCutoff=X("alphaCutoff");emissiveMap;normalMap;normalScale=X("normalScale");metallicRoughnessMap;roughnessMap;metalnessMap;transmissionMap;thinFilmMap;coatWeightMap;coatRoughnessMap;fuzzColorMap;fuzzRoughnessMap;specularWeightMap;specularColorMap;specularAnisotropyModel="openpbr";anisotropyMap;coatNormalMap;coatNormalScale=X("coatNormalScale");specularAnisotropyRotation=0;coatAnisotropyRotation=0;get specularRoughnessAnisotropy(){return this.specularAnisotropy}set specularRoughnessAnisotropy(e){this.specularAnisotropy=e}get coatRoughnessAnisotropy(){return this.coatAnisotropy}set coatRoughnessAnisotropy(e){this.coatAnisotropy=e}get subsurfaceScatterAnisotropy(){return this.subsurfaceAnisotropy}set subsurfaceScatterAnisotropy(e){this.subsurfaceAnisotropy=e}get geometryOpacity(){return this.opacity}set geometryOpacity(e){this.opacity=e}get geometryThinWalled(){return this.thinWalled}set geometryThinWalled(e){this.thinWalled=e}shadowCatcher=X("shadowCatcher");unlit=X("unlit");bevelSize=X("bevelSize");mapAlphaUsage=X("mapAlphaUsage");uvProjection=X("uvProjection");uvProjectionScale=X("uvProjectionScale");displacementMap;displacementUvProjection=X("displacementUvProjection");displacementUvProjectionScale=X("displacementUvProjectionScale");displacementScale=X("displacementScale");displacementBias=X("displacementBias");displacementStepSize=X("displacementStepSize")}function pA(i){return i.alphaMode!=="auto"?i.alphaMode:i.alphaCutoff>0?"mask":i.opacity<1||i.mapAlphaUsage==="alpha"||i.alphaMap?"blend":"opaque"}class il extends tl{constructor(e={}){super(e)}}function Ki(i){return i==="clamp-to-edge"?1:i==="mirrored-repeat"?2:0}class Rf{image;version=0;flipY=!1;uvScale=[1,1];uvOffset=[0,0];wrapS="repeat";wrapT="repeat";colorSpace;uvChannel=0;constructor(e){this.image=e}markUpdated(){return this.version++,this}}class Nt extends Rf{source;constructor(e){super(e)}}function jt(i){return!!(i&&i.data)}function IA(i){return!!i&&i.type==="ProceduralSky"}const Uf=40,Lf=15,Of=50;function Al(i){const e=er(Uf),t=r=>{const n=er(15*(r-12));return Math.atan2(Math.sin(n),Math.cos(n)*Math.sin(e))+Math.PI},A=er(15*(i-12));return{elevation:Math.asin(Math.cos(e)*Math.cos(A))*180/Math.PI,azimuth:Of+(t(i)-t(Lf))*180/Math.PI}}function er(i){return i*Math.PI/180}class Ff{type="AmbientLight";color=[1,1,1];intensity=1;constructor(e={}){this.color=e.color??[1,1,1],this.intensity=e.intensity??1}}class zf extends Ti{type="DirectionalLight";color=[1,1,1];intensity=1;constructor(e={}){super(),this.color=e.color??[1,1,1],this.intensity=e.intensity??1}}class kf extends Ti{type="RectLight";size=[1,1];color=[1,1,1];intensity=1;texture=void 0;spread=1;constructor(e={}){super(),this.size=e.size??[1,1],this.color=e.color??[1,1,1],this.intensity=e.intensity??1,this.texture=e.texture??void 0,this.spread=e.spread??1}}class Nf extends kf{constructor(e={}){super(e)}}class Gf extends Ti{type="SphereLight";color=[1,1,1];intensity=1;radius=1;constructor(e={}){super(),this.color=e.color??[1,1,1],this.intensity=e.intensity??1,this.radius=e.radius??1}}class Hf extends Ti{type="SpotLight";color=[1,1,1];intensity=1;radius=.01;innerAngle=30;outerAngle=45;iesProfile=void 0;constructor(e={}){super(),this.color=e.color??[1,1,1],this.intensity=e.intensity??1,this.radius=e.radius??.01,this.innerAngle=e.innerAngle??30,this.outerAngle=e.outerAngle??45,this.iesProfile=e.iesProfile??void 0}}class Wf extends Ti{type="EnvironmentLight";map;intensity=1;constructor(e){super(),this.map=e.map,this.intensity=e.intensity??1}}class jf extends Wf{constructor(e){super(e)}}const vi=128;function os(i,e){if(e.length===1||i<=e[0])return 0;const t=e.length-1;if(i>=e[t])return t;for(let A=1;A<=t;A++)if(i<=e[A])return A-1+(i-e[A-1])/(e[A]-e[A-1]);return t}function Oi(i,e,t){return i+(e-i)*t}class Yf{name;verticalAngles;horizontalAngles;candelaValues;peakCandela;data;type="IESProfile";size=vi;constructor(e,t,A,a,r,n){this.name=e,this.verticalAngles=t,this.horizontalAngles=A,this.candelaValues=a,this.peakCandela=r,this.data=n}evaluateAngles(e,t){if(e>this.verticalAngles[this.verticalAngles.length-1])return 0;let A=t;const a=this.horizontalAngles[this.horizontalAngles.length-1];a<=180?(A=Math.abs(A),a===90&&A>90&&(A=180-A)):A<0&&(A+=360);const r=os(e,this.verticalAngles),n=os(A,this.horizontalAngles),s=Math.floor(r),o=Math.ceil(r),l=Math.floor(n),c=Math.ceil(n),f=r-s,p=n-l,h=this.verticalAngles.length,u=this.candelaValues[l*h+s],d=this.candelaValues[l*h+o],m=this.candelaValues[c*h+s],v=this.candelaValues[c*h+o];return Oi(Oi(u,d,f),Oi(m,v,f),p)/this.peakCandela}sampleBaked(e,t,A=0){const a=e/Math.PI,r=(t-A)/(2*Math.PI)+.5,n=a*vi-.5,s=r*vi-.5,o=Math.floor(n),l=Math.floor(s),c=n-o,f=s-l,p=u=>(u%vi+vi)%vi,h=(u,d)=>this.data[p(d)*vi+p(u)];return Oi(Oi(h(o,l),h(o+1,l),c),Oi(h(o,l+1),h(o+1,l+1),c),f)}}function ae(i,e){if(!Array.isArray(i)&&!ArrayBuffer.isView(i))return!1;const t=i;if(!Array.isArray(e)||t.length!==e.length)return!1;for(let A=0;A<t.length;A++)if(!Object.is(t[A],e[A]))return!1;return!0}function al(i,e){{const t=i.baseWeight,A=e[0];if(!Object.is(t,A)&&!ae(t,A))return!1}{const t=i.baseColor,A=e[1];if(Array.isArray(t)||ArrayBuffer.isView(t)){const a=t;if(!Array.isArray(A)||a.length!==A.length)return!1;for(let r=0;r<a.length;r++)if(!Object.is(a[r],A[r]))return!1}else if(!Object.is(t,A))return!1}{const t=i.baseDiffuseRoughness,A=e[2];if(!Object.is(t,A)&&!ae(t,A))return!1}{const t=i.baseMetalness,A=e[3];if(!Object.is(t,A)&&!ae(t,A))return!1}{const t=i.specularWeight,A=e[4];if(!Object.is(t,A)&&!ae(t,A))return!1}{const t=i.specularColor,A=e[5];if(Array.isArray(t)||ArrayBuffer.isView(t)){const a=t;if(!Array.isArray(A)||a.length!==A.length)return!1;for(let r=0;r<a.length;r++)if(!Object.is(a[r],A[r]))return!1}else if(!Object.is(t,A))return!1}{const t=i.specularRoughness,A=e[6];if(!Object.is(t,A)&&!ae(t,A))return!1}{const t=i.specularIor,A=e[7];if(!Object.is(t,A)&&!ae(t,A))return!1}{const t=i.specularAnisotropy,A=e[8];if(!Object.is(t,A)&&!ae(t,A))return!1}{const t=i.transmissionWeight,A=e[9];if(!Object.is(t,A)&&!ae(t,A))return!1}{const t=i.transmissionColor,A=e[10];if(Array.isArray(t)||ArrayBuffer.isView(t)){const a=t;if(!Array.isArray(A)||a.length!==A.length)return!1;for(let r=0;r<a.length;r++)if(!Object.is(a[r],A[r]))return!1}else if(!Object.is(t,A))return!1}{const t=i.transmissionDepth,A=e[11];if(!Object.is(t,A)&&!ae(t,A))return!1}{const t=i.transmissionScatter,A=e[12];if(Array.isArray(t)||ArrayBuffer.isView(t)){const a=t;if(!Array.isArray(A)||a.length!==A.length)return!1;for(let r=0;r<a.length;r++)if(!Object.is(a[r],A[r]))return!1}else if(!Object.is(t,A))return!1}{const t=i.transmissionScatterAnisotropy,A=e[13];if(!Object.is(t,A)&&!ae(t,A))return!1}{const t=i.transmissionDispersionScale,A=e[14];if(!Object.is(t,A)&&!ae(t,A))return!1}{const t=i.transmissionDispersionAbbeNumber,A=e[15];if(!Object.is(t,A)&&!ae(t,A))return!1}{const t=i.subsurfaceWeight,A=e[16];if(!Object.is(t,A)&&!ae(t,A))return!1}{const t=i.subsurfaceColor,A=e[17];if(Array.isArray(t)||ArrayBuffer.isView(t)){const a=t;if(!Array.isArray(A)||a.length!==A.length)return!1;for(let r=0;r<a.length;r++)if(!Object.is(a[r],A[r]))return!1}else if(!Object.is(t,A))return!1}{const t=i.subsurfaceRadius,A=e[18];if(!Object.is(t,A)&&!ae(t,A))return!1}{const t=i.subsurfaceRadiusScale,A=e[19];if(Array.isArray(t)||ArrayBuffer.isView(t)){const a=t;if(!Array.isArray(A)||a.length!==A.length)return!1;for(let r=0;r<a.length;r++)if(!Object.is(a[r],A[r]))return!1}else if(!Object.is(t,A))return!1}{const t=i.subsurfaceAnisotropy,A=e[20];if(!Object.is(t,A)&&!ae(t,A))return!1}{const t=i.fuzzWeight,A=e[21];if(!Object.is(t,A)&&!ae(t,A))return!1}{const t=i.fuzzColor,A=e[22];if(Array.isArray(t)||ArrayBuffer.isView(t)){const a=t;if(!Array.isArray(A)||a.length!==A.length)return!1;for(let r=0;r<a.length;r++)if(!Object.is(a[r],A[r]))return!1}else if(!Object.is(t,A))return!1}{const t=i.fuzzRoughness,A=e[23];if(!Object.is(t,A)&&!ae(t,A))return!1}{const t=i.coatWeight,A=e[24];if(!Object.is(t,A)&&!ae(t,A))return!1}{const t=i.coatColor,A=e[25];if(Array.isArray(t)||ArrayBuffer.isView(t)){const a=t;if(!Array.isArray(A)||a.length!==A.length)return!1;for(let r=0;r<a.length;r++)if(!Object.is(a[r],A[r]))return!1}else if(!Object.is(t,A))return!1}{const t=i.coatRoughness,A=e[26];if(!Object.is(t,A)&&!ae(t,A))return!1}{const t=i.coatAnisotropy,A=e[27];if(!Object.is(t,A)&&!ae(t,A))return!1}{const t=i.coatIor,A=e[28];if(!Object.is(t,A)&&!ae(t,A))return!1}{const t=i.coatDarkening,A=e[29];if(!Object.is(t,A)&&!ae(t,A))return!1}{const t=i.thinFilmWeight,A=e[30];if(!Object.is(t,A)&&!ae(t,A))return!1}{const t=i.thinFilmThickness,A=e[31];if(!Object.is(t,A)&&!ae(t,A))return!1}{const t=i.thinFilmIor,A=e[32];if(!Object.is(t,A)&&!ae(t,A))return!1}{const t=i.emissionColor,A=e[33];if(Array.isArray(t)||ArrayBuffer.isView(t)){const a=t;if(!Array.isArray(A)||a.length!==A.length)return!1;for(let r=0;r<a.length;r++)if(!Object.is(a[r],A[r]))return!1}else if(!Object.is(t,A))return!1}{const t=i.emissionLuminance,A=e[34];if(!Object.is(t,A)&&!ae(t,A))return!1}{const t=i.opacity,A=e[35];if(!Object.is(t,A)&&!ae(t,A))return!1}{const t=i.thinWalled,A=e[36];if(!Object.is(t,A)&&!ae(t,A))return!1}{const t=i.doubleSided,A=e[37];if(!Object.is(t,A)&&!ae(t,A))return!1}{const t=i.alphaMode,A=e[38];if(!Object.is(t,A)&&!ae(t,A))return!1}{const t=i.alphaCutoff,A=e[39];if(!Object.is(t,A)&&!ae(t,A))return!1}{const t=i.normalScale,A=e[40];if(Array.isArray(t)||ArrayBuffer.isView(t)){const a=t;if(!Array.isArray(A)||a.length!==A.length)return!1;for(let r=0;r<a.length;r++)if(!Object.is(a[r],A[r]))return!1}else if(!Object.is(t,A))return!1}{const t=i.shadowCatcher,A=e[41];if(!Object.is(t,A)&&!ae(t,A))return!1}{const t=i.unlit,A=e[42];if(!Object.is(t,A)&&!ae(t,A))return!1}{const t=i.bevelSize,A=e[43];if(!Object.is(t,A)&&!ae(t,A))return!1}{const t=i.mapAlphaUsage,A=e[44];if(!Object.is(t,A)&&!ae(t,A))return!1}{const t=i.uvProjection,A=e[45];if(!Object.is(t,A)&&!ae(t,A))return!1}{const t=i.uvProjectionScale,A=e[46];if(Array.isArray(t)||ArrayBuffer.isView(t)){const a=t;if(!Array.isArray(A)||a.length!==A.length)return!1;for(let r=0;r<a.length;r++)if(!Object.is(a[r],A[r]))return!1}else if(!Object.is(t,A))return!1}{const t=i.displacementUvProjection,A=e[47];if(!Object.is(t,A)&&!ae(t,A))return!1}{const t=i.displacementUvProjectionScale,A=e[48];if(!Object.is(t,A)&&!ae(t,A))return!1}{const t=i.displacementScale,A=e[49];if(!Object.is(t,A)&&!ae(t,A))return!1}{const t=i.displacementStepSize,A=e[50];if(!Object.is(t,A)&&!ae(t,A))return!1}{const t=i.thinFilmThicknessMinimum,A=e[51];if(!Object.is(t,A)&&!ae(t,A))return!1}{const t=i.thinFilmMapChannel,A=e[52];if(!Object.is(t,A)&&!ae(t,A))return!1}{const t=i.specularAnisotropyRotation,A=e[53];if(!Object.is(t,A)&&!ae(t,A))return!1}{const t=i.coatAnisotropyRotation,A=e[54];if(!Object.is(t,A)&&!ae(t,A))return!1}{const t=i.specularAnisotropyModel,A=e[55];if(!Object.is(t,A)&&!ae(t,A))return!1}{const t=i.coatNormalScale,A=e[56];if(Array.isArray(t)||ArrayBuffer.isView(t)){const a=t;if(!Array.isArray(A)||a.length!==A.length)return!1;for(let r=0;r<a.length;r++)if(!Object.is(a[r],A[r]))return!1}else if(!Object.is(t,A))return!1}{const t=i.displacementBias,A=e[57];if(!Object.is(t,A)&&!ae(t,A))return!1}return!0}function Vf(i,e){let t=0;{const A=i.map;if(typeof A!="number"){if(A){if(e[t++]!==A||e[t++]!==A.version||e[t++]!==A.image||e[t++]!==A.flipY||e[t++]!==A.uvScale||e[t++]!==A.uvOffset||e[t++]!==A.uvChannel||e[t++]!==A.wrapS||e[t++]!==A.wrapT||e[t++]!==A.colorSpace)return!0}else if(e[t++]!==void 0)return!0}}{const A=i.alphaMap;if(typeof A!="number"){if(A){if(e[t++]!==A||e[t++]!==A.version||e[t++]!==A.image||e[t++]!==A.flipY||e[t++]!==A.uvScale||e[t++]!==A.uvOffset||e[t++]!==A.uvChannel||e[t++]!==A.wrapS||e[t++]!==A.wrapT||e[t++]!==A.colorSpace)return!0}else if(e[t++]!==void 0)return!0}}{const A=i.emissiveMap;if(typeof A!="number"){if(A){if(e[t++]!==A||e[t++]!==A.version||e[t++]!==A.image||e[t++]!==A.flipY||e[t++]!==A.uvScale||e[t++]!==A.uvOffset||e[t++]!==A.uvChannel||e[t++]!==A.wrapS||e[t++]!==A.wrapT||e[t++]!==A.colorSpace)return!0}else if(e[t++]!==void 0)return!0}}{const A=i.normalMap;if(typeof A!="number"){if(A){if(e[t++]!==A||e[t++]!==A.version||e[t++]!==A.image||e[t++]!==A.flipY||e[t++]!==A.uvScale||e[t++]!==A.uvOffset||e[t++]!==A.uvChannel||e[t++]!==A.wrapS||e[t++]!==A.wrapT||e[t++]!==A.colorSpace)return!0}else if(e[t++]!==void 0)return!0}}{const A=i.metallicRoughnessMap;if(typeof A!="number"){if(A){if(e[t++]!==A||e[t++]!==A.version||e[t++]!==A.image||e[t++]!==A.flipY||e[t++]!==A.uvScale||e[t++]!==A.uvOffset||e[t++]!==A.uvChannel||e[t++]!==A.wrapS||e[t++]!==A.wrapT||e[t++]!==A.colorSpace)return!0}else if(e[t++]!==void 0)return!0}}{const A=i.roughnessMap;if(typeof A!="number"){if(A){if(e[t++]!==A||e[t++]!==A.version||e[t++]!==A.image||e[t++]!==A.flipY||e[t++]!==A.uvScale||e[t++]!==A.uvOffset||e[t++]!==A.uvChannel||e[t++]!==A.wrapS||e[t++]!==A.wrapT||e[t++]!==A.colorSpace)return!0}else if(e[t++]!==void 0)return!0}}{const A=i.metalnessMap;if(typeof A!="number"){if(A){if(e[t++]!==A||e[t++]!==A.version||e[t++]!==A.image||e[t++]!==A.flipY||e[t++]!==A.uvScale||e[t++]!==A.uvOffset||e[t++]!==A.uvChannel||e[t++]!==A.wrapS||e[t++]!==A.wrapT||e[t++]!==A.colorSpace)return!0}else if(e[t++]!==void 0)return!0}}{const A=i.transmissionMap;if(typeof A!="number"){if(A){if(e[t++]!==A||e[t++]!==A.version||e[t++]!==A.image||e[t++]!==A.flipY||e[t++]!==A.uvScale||e[t++]!==A.uvOffset||e[t++]!==A.uvChannel||e[t++]!==A.wrapS||e[t++]!==A.wrapT||e[t++]!==A.colorSpace)return!0}else if(e[t++]!==void 0)return!0}}{const A=i.thinFilmMap;if(typeof A!="number"){if(A){if(e[t++]!==A||e[t++]!==A.version||e[t++]!==A.image||e[t++]!==A.flipY||e[t++]!==A.uvScale||e[t++]!==A.uvOffset||e[t++]!==A.uvChannel||e[t++]!==A.wrapS||e[t++]!==A.wrapT||e[t++]!==A.colorSpace)return!0}else if(e[t++]!==void 0)return!0}}{const A=i.displacementMap;if(typeof A!="number"){if(A){if(e[t++]!==A||e[t++]!==A.version||e[t++]!==A.image||e[t++]!==A.flipY||e[t++]!==A.uvScale||e[t++]!==A.uvOffset||e[t++]!==A.uvChannel||e[t++]!==A.wrapS||e[t++]!==A.wrapT||e[t++]!==A.colorSpace)return!0}else if(e[t++]!==void 0)return!0}}{const A=i.coatWeightMap;if(typeof A!="number"){if(A){if(e[t++]!==A||e[t++]!==A.version||e[t++]!==A.image||e[t++]!==A.flipY||e[t++]!==A.uvScale||e[t++]!==A.uvOffset||e[t++]!==A.uvChannel||e[t++]!==A.wrapS||e[t++]!==A.wrapT||e[t++]!==A.colorSpace)return!0}else if(e[t++]!==void 0)return!0}}{const A=i.coatRoughnessMap;if(typeof A!="number"){if(A){if(e[t++]!==A||e[t++]!==A.version||e[t++]!==A.image||e[t++]!==A.flipY||e[t++]!==A.uvScale||e[t++]!==A.uvOffset||e[t++]!==A.uvChannel||e[t++]!==A.wrapS||e[t++]!==A.wrapT||e[t++]!==A.colorSpace)return!0}else if(e[t++]!==void 0)return!0}}{const A=i.fuzzColorMap;if(typeof A!="number"){if(A){if(e[t++]!==A||e[t++]!==A.version||e[t++]!==A.image||e[t++]!==A.flipY||e[t++]!==A.uvScale||e[t++]!==A.uvOffset||e[t++]!==A.uvChannel||e[t++]!==A.wrapS||e[t++]!==A.wrapT||e[t++]!==A.colorSpace)return!0}else if(e[t++]!==void 0)return!0}}{const A=i.fuzzRoughnessMap;if(typeof A!="number"){if(A){if(e[t++]!==A||e[t++]!==A.version||e[t++]!==A.image||e[t++]!==A.flipY||e[t++]!==A.uvScale||e[t++]!==A.uvOffset||e[t++]!==A.uvChannel||e[t++]!==A.wrapS||e[t++]!==A.wrapT||e[t++]!==A.colorSpace)return!0}else if(e[t++]!==void 0)return!0}}{const A=i.specularWeightMap;if(typeof A!="number"){if(A){if(e[t++]!==A||e[t++]!==A.version||e[t++]!==A.image||e[t++]!==A.flipY||e[t++]!==A.uvScale||e[t++]!==A.uvOffset||e[t++]!==A.uvChannel||e[t++]!==A.wrapS||e[t++]!==A.wrapT||e[t++]!==A.colorSpace)return!0}else if(e[t++]!==void 0)return!0}}{const A=i.specularColorMap;if(typeof A!="number"){if(A){if(e[t++]!==A||e[t++]!==A.version||e[t++]!==A.image||e[t++]!==A.flipY||e[t++]!==A.uvScale||e[t++]!==A.uvOffset||e[t++]!==A.uvChannel||e[t++]!==A.wrapS||e[t++]!==A.wrapT||e[t++]!==A.colorSpace)return!0}else if(e[t++]!==void 0)return!0}}{const A=i.anisotropyMap;if(typeof A!="number"){if(A){if(e[t++]!==A||e[t++]!==A.version||e[t++]!==A.image||e[t++]!==A.flipY||e[t++]!==A.uvScale||e[t++]!==A.uvOffset||e[t++]!==A.uvChannel||e[t++]!==A.wrapS||e[t++]!==A.wrapT||e[t++]!==A.colorSpace)return!0}else if(e[t++]!==void 0)return!0}}{const A=i.coatNormalMap;if(typeof A!="number"){if(A){if(e[t++]!==A||e[t++]!==A.version||e[t++]!==A.image||e[t++]!==A.flipY||e[t++]!==A.uvScale||e[t++]!==A.uvOffset||e[t++]!==A.uvChannel||e[t++]!==A.wrapS||e[t++]!==A.wrapT||e[t++]!==A.colorSpace)return!0}else if(e[t++]!==void 0)return!0}}return t!==e.length}function hA(i,e){return i===void 0||e===void 0?i===void 0&&e===void 0:i===e}function qf(i,e){return i===void 0||e===void 0?i===void 0&&e===void 0:i===e}function Jf(i,e){return i instanceof Uint16Array?e instanceof Uint16Array&&i===e:e instanceof Uint16Array?!1:i===e}function tr(i){return i instanceof Uint16Array,i.length}function $f(i,e,t){if(i instanceof Float32Array){for(let A=0;A<16;A++)if(!Object.is(i[A],e[t+A]))return!1}else for(let A=0;A<16;A++)if(!Object.is(i[A],e[t+A]))return!1;return!0}function Kf(i,e,t){i instanceof Float32Array,e.set(i,t)}class Xf{position;positionSize;normal;normalSize;indices;indicesLength;indicesSize;tangent=void 0;tangentSize=0;uv=void 0;uvSize=0;uv1=void 0;uv1Size=0;color=void 0;colorSize=0;materialIndex=void 0;materialIndexSize=0;lengths=[0,0,0,0,0,0,0];constructor(e){this.position=e.position.array,this.positionSize=e.position.itemSize,this.normal=e.normal.array,this.normalSize=e.normal.itemSize,this.indices=e.indices.array,this.indicesLength=tr(e.indices.array),this.indicesSize=e.indices.itemSize,this.capture(e)}capture(e){this.position=e.position.array,this.positionSize=e.position.itemSize,this.normal=e.normal.array,this.normalSize=e.normal.itemSize,this.indices=e.indices.array,this.indicesLength=tr(e.indices.array),this.indicesSize=e.indices.itemSize;const t=e.tangent,A=e.uv,a=e.uv1,r=e.color,n=e.materialIndex;this.tangent=t?t.array:void 0,this.tangentSize=t?t.itemSize:0,this.uv=A?A.array:void 0,this.uvSize=A?A.itemSize:0,this.uv1=a?a.array:void 0,this.uv1Size=a?a.itemSize:0,this.color=r?r.array:void 0,this.colorSize=r?r.itemSize:0,this.materialIndex=n?n.array:void 0,this.materialIndexSize=n?n.itemSize:0;const s=this.lengths;s[0]=e.position.array.length,s[1]=e.normal.array.length,s[2]=t?t.array.length:-1,s[3]=A?A.array.length:-1,s[4]=a?a.array.length:-1,s[5]=r?r.array.length:-1,s[6]=n?n.array.length:-1}matches(e){const t=e.tangent,A=e.uv,a=e.uv1,r=e.color,n=e.materialIndex,s=this.lengths;return this.position===e.position.array&&this.positionSize===e.position.itemSize&&s[0]===e.position.array.length&&this.normal===e.normal.array&&this.normalSize===e.normal.itemSize&&s[1]===e.normal.array.length&&Jf(this.indices,e.indices.array)&&this.indicesLength===tr(e.indices.array)&&this.indicesSize===e.indices.itemSize&&hA(this.tangent,t?t.array:void 0)&&this.tangentSize===(t?t.itemSize:0)&&s[2]===(t?t.array.length:-1)&&hA(this.uv,A?A.array:void 0)&&this.uvSize===(A?A.itemSize:0)&&s[3]===(A?A.array.length:-1)&&hA(this.uv1,a?a.array:void 0)&&this.uv1Size===(a?a.itemSize:0)&&s[4]===(a?a.array.length:-1)&&hA(this.color,r?r.array:void 0)&&this.colorSize===(r?r.itemSize:0)&&s[5]===(r?r.array.length:-1)&&qf(this.materialIndex,n?n.array:void 0)&&this.materialIndexSize===(n?n.itemSize:0)&&s[6]===(n?n.array.length:-1)}}class Zf{aovId;mesh;geometry;version;dynamic;storage;materials=[];instanced=!1;instanceCount=0;instanceVersion=0;colorVersion=0;instanceTransforms=void 0;instanceColors=void 0;constructor(e){this.aovId=e.aovId,this.mesh=e,this.geometry=e.geometry,this.version=e.geometry.version,this.dynamic=e.geometry.dynamic,this.storage=new Xf(e.geometry)}capture(e){this.aovId=e.aovId,this.mesh=e,this.geometry=e.geometry,this.version=e.geometry.version,this.dynamic=e.geometry.dynamic,this.storage.capture(e.geometry);const t=e.instanceData;this.instanced=t!==void 0,this.instanceCount=t?t.count:0,this.instanceVersion=t?t.transformsVersion:0,this.colorVersion=t?t.colorsVersion:0,this.instanceTransforms=t?t.transforms:void 0,this.instanceColors=t?t.colors:void 0,this.materials.length=0;for(let A=0;A<e.materials.length;A++)this.materials.push(e.materials[A])}}class eu{meshList;meshes=[];matrices;materials=new Map;lightList;lights=[];background;constructor(e,t,A){this.meshList=e,this.matrices=new Float64Array(e.length*16),this.lightList=t,this.background=A}}class tu{adapter;snapshot=void 0;pending=void 0;spare=void 0;seen=new Set;constructor(e){this.adapter=e}detect(e){const t=this.adapter,A=this.snapshot,a=e.meshes;let r=A===void 0||A.meshList!==a||A.meshes.length!==a.length;const n=[],s=[],o=new Set,l=[],c=this.seen;c.clear();for(let d=0;d<a.length;d++){const m=a[d],v=A!==void 0&&d<A.meshes.length?A.meshes[d]:void 0;let g=!1;const w=m.instanceData;if(w&&(t.validateMesh(m),(v===void 0||!v.instanced||v.instanceCount!==w.count)&&(r=!0),v!==void 0&&v.mesh===m&&(v.colorVersion!==w.colorsVersion||!hA(v.instanceColors,w.colors))&&s.push(m),v!==void 0&&v.mesh===m&&(v.instanceVersion!==w.transformsVersion||v.instanceTransforms!==w.transforms)&&(n.push(m),g=!0)),v===void 0||v.mesh!==m||v.aovId!==m.aovId||v.geometry!==m.geometry||v.dynamic!==m.geometry.dynamic||!v.storage.matches(m.geometry)||v.materials.length!==m.materials.length)r=!0;else for(let B=0;B<m.materials.length;B++)if(v.materials[B]!==m.materials[B]){r=!0;break}v!==void 0&&v.geometry===m.geometry&&v.version!==m.geometry.version&&o.add(m.geometry),v!==void 0&&v.mesh===m&&A!==void 0&&!$f(m.transform,A.matrices,d*16)&&(g||n.push(m));for(let B=0;B<m.materials.length;B++){const E=m.materials[B];if(c.has(E))continue;c.add(E);const b=A!==void 0?A.materials.get(E):void 0;(b===void 0||!t.materialMatches(E,b))&&l.push(E)}}const f=[];for(let d=0;d<e.lights.length;d++)f.push(t.captureLight(e.lights[d]));const p=t.captureBackground(e.background);let h=A===void 0||A.lightList!==e.lights||f.length!==A.lights.length;if(A!==void 0&&!h){for(let d=0;d<f.length;d++)if(!t.lightsEqual(f[d],A.lights[d])){h=!0;break}}const u={meshes:r?"full":n.length>0||s.length>0||l.length>0||o.size>0?"incremental":"none",transforms:n,colors:s,materials:l,geometries:[...o],lights:h,background:A===void 0||!t.backgroundsEqual(p,A.background)};if(u.meshes!=="none"||u.lights||u.background){let d=this.spare;(d===void 0||d.meshList!==a||d.meshes.length!==a.length)&&(d=new eu(a,e.lights,p),this.spare=d);for(let g=0;g<a.length;g++){const w=a[g];let B=g<d.meshes.length?d.meshes[g]:void 0;B===void 0&&(B=new Zf(w),d.meshes.push(B)),B.capture(w),Kf(w.transform,d.matrices,g*16)}const m=d.materials;d.materials=new Map;const v=new Set(l);for(const g of c){const w=A!==void 0?A.materials.get(g):void 0;if(w!==void 0&&!v.has(g))d.materials.set(g,w);else{const B=m.get(g);d.materials.set(g,t.captureMaterial(g,w,B!==w?B:void 0))}}d.lightList=e.lights,d.lights=f,d.background=p,this.pending=d}else this.pending=A;return u}commit(){this.pending!==void 0&&this.pending!==this.snapshot&&(this.spare=this.snapshot,this.snapshot=this.pending),this.pending=void 0}reset(){this.snapshot=void 0,this.pending=void 0,this.spare=void 0,this.seen.clear()}}function Si(i){const e=[i];for(const t of Object.keys(i)){const A=i[t];e.push(t),A instanceof Nt?e.push(...rl(A)):Array.isArray(A)||ArrayBuffer.isView(A)?e.push(...Array.from(A)):e.push(A)}return e}function rl(i){return i?[i,i.version,i.image,i.flipY,i.uvScale,i.uvOffset,i.uvChannel,i.wrapS,i.wrapT,i.colorSpace]:[void 0]}function _t(i,e){return i.length===e.length&&i.every((t,A)=>Object.is(t,e[A]))}function iu(i){return i instanceof Nt?rl(i):Array.isArray(i)?[i,...i]:i?Si(i):[void 0]}function Au(i,e){let t=0;for(const A of Xo){const a=i[A];if(typeof a!="number"){if(!a){e[t++]=void 0;continue}e[t++]=a,e[t++]=a.version,e[t++]=a.image,e[t++]=a.flipY,e[t++]=a.uvScale,e[t++]=a.uvOffset,e[t++]=a.uvChannel,e[t++]=a.wrapS,e[t++]=a.wrapT,e[t++]=a.colorSpace}}e.length=t}const au=Ko.filter(i=>i.type!=="texture").map(i=>i.key);function nl(i,e){return au.map((t,A)=>{const a=i[t];if(Array.isArray(a)||ArrayBuffer.isView(a)){const r=a,n=e?.[A];if(Array.isArray(n)&&n.length===r.length){let s=!0;for(let o=0;o<r.length;o++)if(!Object.is(r[o],n[o])){s=!1;break}if(s)return n}return Array.from(r)}return a})}const ru={validateMesh:i=>{i instanceof rt&&i.validate()},captureMaterial:(i,e,t)=>{const A=t??{aovId:i.aovId,values:[],textures:[]};return A.aovId=i.aovId,A.values=nl(i,e?.values),Au(i,A.textures),A},materialMatches:(i,e)=>i.aovId===e.aovId&&al(i,e.values)&&!Vf(i,e.textures),captureLight:i=>Si(i),lightsEqual:_t,captureBackground:iu,backgroundsEqual:_t};class nu{_tracker=new tu(ru);detect(e){return this._tracker.detect(e)}commit(){this._tracker.commit()}reset(){this._tracker.reset()}}class su{engine;_active=!1;_activeUntil=-1/0;constructor(e){this.engine=e}get active(){return this._active||performance.now()<this._activeUntil}setActive(e){this._active=e}activateFor(e){this._activeUntil=Math.max(this._activeUntil,performance.now()+Math.max(0,e))}dispose(){this._active=!1,this._activeUntil=-1/0}}const ta=new WeakMap;function ou(i){i.markVerticesUpdated(),ta.set(i,i.version)}function sl(i){return ta.get(i)===i.version}function lu(i,e){sl(i)?ta.set(e,e.version):ta.delete(e)}const cu=["position","normal","tangent","skinIndex","skinWeight"];function Bi(i){const e=i,t=e.isInterleavedBufferAttribute?e.data.array:i.array,A=e.isInterleavedBufferAttribute?e.data.stride:i.itemSize,a=e.isInterleavedBufferAttribute?e.offset:0;if(!i.normalized&&!i.isFloat16BufferAttribute)return{array:t,stride:A,offset:a};const r=new Float64Array(i.count*i.itemSize);let n=1,s=!1;i.normalized&&(t instanceof Uint8Array||t instanceof Uint8ClampedArray?n=255:t instanceof Uint16Array?n=65535:t instanceof Uint32Array?n=4294967295:t instanceof Int8Array?(n=127,s=!0):t instanceof Int16Array?(n=32767,s=!0):t instanceof Int32Array&&(n=2147483647,s=!0));const o=i.isFloat16BufferAttribute;for(let l=0;l<i.count;l++)for(let c=0;c<i.itemSize;c++){let f=t[l*A+a+c];if(o){const p=f>>10&31,h=f&1023;f=(f&32768?-1:1)*(p===31?h?NaN:1/0:p===0?h*2**-24:(1+h/1024)*2**(p-15))}f/=n,r[l*i.itemSize+c]=s?Math.max(-1,f):f}return{array:r,stride:i.itemSize,offset:0}}function Fi(i,e,t){return i.array[e*i.stride+i.offset+t]}function fu(i){return!!i.isSkinnedMesh||!!i.morphTargetInfluences&&(!!i.geometry.morphAttributes.position?.length||!!i.geometry.morphAttributes.normal?.length)}class uu{geometry;position;normal;tangent;_accepted=[];_next=[];_bones=new Float32Array(0);_boundBones=new Float64Array(0);_temporary=new Float64Array(16);_skin=new Float64Array(16);_vector=new Float64Array(3);_initialized=!1;constructor(e){this.geometry=e;const t=e.attributes.position.count;this.position=new Float32Array(t*3),e.attributes.normal&&(this.normal=new Float32Array(t*3)),e.attributes.tangent&&(this.tangent=new Float32Array(t*Math.min(4,e.attributes.tangent.itemSize)))}matches(e){return this.geometry===e&&this.position.length===e.attributes.position.count*3&&!!this.normal==!!e.attributes.normal&&!!this.tangent==!!e.attributes.tangent&&(!this.tangent||this.tangent.length===e.attributes.position.count*Math.min(4,e.attributes.tangent.itemSize))}update(e){const t=e.geometry,A=e;A.isSkinnedMesh&&A.skeleton.update();const a=this._next;a.length=0,a.push(t,t.morphTargetsRelative);const r=g=>{if(!g){a.push(void 0);return}const w=g,B=w.isInterleavedBufferAttribute?w.data:g;a.push(g,B.array,B.version,g.count,g.itemSize,g.normalized,w.offset,w.data?.stride)};for(const g of cu)r(t.getAttribute(g));for(const g of["position","normal"]){const w=t.morphAttributes[g];if(a.push(w?.length),w)for(const B of w)r(B)}const n=e.morphTargetInfluences;if(a.push(n?.length),n)for(const g of n)a.push(g);if(A.isSkinnedMesh){a.push(A.skeleton,A.skeleton.boneMatrices.length);for(const g of A.bindMatrix.elements)a.push(g);for(const g of A.bindMatrixInverse.elements)a.push(g)}const s=A.isSkinnedMesh?A.skeleton.boneMatrices:void 0;let o=!!s&&s.length!==this._bones.length;if(s&&!o){for(let g=0;g<s.length;g++)if(!Object.is(s[g],this._bones[g])){o=!0;break}}if(this._initialized&&!o&&a.length===this._accepted.length&&a.every((g,w)=>Object.is(g,this._accepted[w])))return!1;const l=Bi(t.getAttribute("position")),c=this.normal&&Bi(t.getAttribute("normal")),f=this.tangent&&Bi(t.getAttribute("tangent")),p=s&&Bi(t.getAttribute("skinIndex")),h=s&&Bi(t.getAttribute("skinWeight")),u=t.morphAttributes.position?.map(Bi),d=t.morphAttributes.normal?.map(Bi);if(s){this._bones.length!==s.length&&(this._bones=new Float32Array(s.length),this._boundBones=new Float64Array(s.length)),this._bones.set(s);for(let g=0;g<s.length;g+=16)Tr(this._temporary,s.subarray(g,g+16),A.bindMatrix.elements),Tr(this._boundBones.subarray(g,g+16),A.bindMatrixInverse.elements,this._temporary)}const m=(g,w,B)=>{for(let E=0;E<3;E++){const b=Fi(g,B,E);let x=b;if(n&&w)for(let y=0;y<w.length;y++){const T=n[y]??0;T&&(x+=T*(Fi(w[y],B,E)-(t.morphTargetsRelative?0:b)))}this._vector[E]=x}},v=(g,w,B,E=3)=>{let b=this._vector[0],x=this._vector[1],y=this._vector[2];if(A.isSkinnedMesh){const T=this._skin,I=T[0]*b+T[4]*x+T[8]*y+(B?T[12]:0),P=T[1]*b+T[5]*x+T[9]*y+(B?T[13]:0),S=T[2]*b+T[6]*x+T[10]*y+(B?T[14]:0);if(b=I,x=P,y=S,!B){const R=Math.hypot(b,x,y);R&&(b/=R,x/=R,y/=R)}}g[w*E]=b,g[w*E+1]=x,g[w*E+2]=y};for(let g=0;g<this.position.length/3;g++){if(A.isSkinnedMesh){this._skin.fill(0);for(let w=0;w<4;w++){const B=Fi(p,g,w),E=Fi(h,g,w);if(!E)continue;const b=B*16;for(let x=0;x<16;x++)this._skin[x]+=E*this._boundBones[b+x]}}if(m(l,u,g),v(this.position,g,!0),this.normal&&(m(c,d,g),v(this.normal,g,!1)),this.tangent){for(let B=0;B<3;B++)this._vector[B]=Fi(f,g,B);const w=this.tangent.length/(this.position.length/3);v(this.tangent,g,!1,w),w===4&&(this.tangent[g*4+3]=Fi(f,g,3))}}return this._next=this._accepted,this._accepted=a,this._initialized=!0,!0}}function Ve(i,e){if(!i)return;const t=[i.version,i.image,i.flipY,i.repeat.x,i.repeat.y,i.offset.x,i.offset.y,i.channel,i.wrapS,i.wrapT,i.colorSpace],A=e.get(i);if(A&&_t(A.state,t))return A.texture;const a=hu(i),r=A?.texture??new Nt(a);r.image=a,r.source=i,r.flipY=i.flipY,r.uvScale=[i.repeat.x,i.repeat.y],r.uvOffset=[i.offset.x,i.offset.y],r.uvChannel=i.channel===1?1:0;const n=s=>s===1001?"clamp-to-edge":s===1002?"mirrored-repeat":"repeat";return r.wrapS=n(i.wrapS),r.wrapT=n(i.wrapT),r.colorSpace=i.colorSpace==="srgb"?"srgb":i.colorSpace==="srgb-linear"||i.colorSpace===""?"linear":void 0,A?r.markUpdated():r.version=i.version,e.set(i,{texture:r,state:t}),r}function du(i){const e=i&32768?-1:1,t=i>>10&31,A=i&1023;return t===0?e*Math.pow(2,-14)*(A/1024):t===31?A?NaN:e*(1/0):e*Math.pow(2,t-15)*(1+A/1024)}function hu(i){const e=i.image;if(!e?.data)return e;const t=i.format===1028?1:i.format===1030?2:i.format===1022?3:i.format===1023?4:0;if(!t)throw new Error(`Unsupported Three.js data texture format: ${i.format}`);const A=e.data;if(A.length!==e.width*e.height*t)throw new Error("Three.js data texture length does not match its format and dimensions.");const a=i.type===1016;if(t===4&&!a&&(A instanceof Float32Array||A instanceof Uint8Array||A instanceof Uint8ClampedArray||A instanceof Int32Array))return e;const r=A instanceof Uint8Array||A instanceof Uint8ClampedArray,n=r?new Uint8Array(e.width*e.height*4):new Float32Array(e.width*e.height*4),s=o=>{const l=A[o];return a?du(l):A instanceof Uint16Array?l/65535:A instanceof Uint32Array?l/4294967295:A instanceof Int8Array?Math.max(-1,l/127):A instanceof Int16Array?Math.max(-1,l/32767):l};for(let o=0;o<e.width*e.height;o++)n[o*4]=s(o*t),n[o*4+1]=t>1?s(o*t+1):0,n[o*4+2]=t>2?s(o*t+2):0,n[o*4+3]=t===4?s(o*t+3):r?255:1;return{width:e.width,height:e.height,data:n}}function ir(i,e){if(!i?.image?.data||!i.image.width||!i.image.height)return;const t=e.get(i),A=Ve(i,e);if(t?.state===e.get(i)?.state)return A;const a=A.image.data,{width:r,height:n}=i.image;return A.image={data:i.flipY?a:pu(a,r,n),width:r,height:n},A.flipY=!1,A}function pu(i,e,t){if(t<=1)return i;const A=i.length/t,a=new i.constructor(i.length);for(let r=0;r<t;r++)a.set(i.subarray((t-1-r)*A,(t-r)*A),r*A);return a}function mu(i,e){const t=new il;if(i.userData.mutracerShadowCatcher===!0)return t.shadowCatcher=!0,t;if(i.isMeshBasicMaterial){const b=i;return t.unlit=!0,t.baseWeight=0,t.specularWeight=0,t.baseColor=b.color.toArray(),t.emissionColor=t.baseColor,t.emissionLuminance=1,t.map=Ve(b.map,e),t.emissiveMap=t.map,t.alphaMap=Ve(b.alphaMap,e),t.geometryOpacity=b.opacity,t.alphaCutoff=Math.max(0,b.alphaTest),t.alphaMode=b.alphaTest>0?"mask":b.transparent||b.opacity<1||b.alphaMap?"blend":"opaque",t.mapAlphaUsage=t.alphaMode==="opaque"?"opaque":"alpha",t.doubleSided=b.side===2,t}const A=i;t.baseColor=A.color.toArray(),t.emissionColor=A.emissive&&A.emissive.toArray(),t.specularRoughness=A.roughness,t.baseMetalness=A.metalness,t.emissionLuminance=A.emissiveIntensity,t.normalScale=A.normalScale&&A.normalScale.toArray();const a=A.userData.mutracerUvProjection;(a==="triplanar"||a==="spherical"||a==="cylindrical"||a==="none")&&(t.uvProjection=a);const r=A.userData.mutracerUvProjectionScale;if(Array.isArray(r)&&r.length>=2){const b=Math.max(Number(A.userData.mutracerUvReferenceLength)||1,1e-6),x=Math.max(Number(r[0])||1e-6,1e-6),y=Math.max(Number(r[1])||1e-6,1e-6);t.uvProjectionScale=t.uvProjection==="triplanar"?[x/b,y/b]:t.uvProjection==="cylindrical"?[x,y/b]:[x,y]}t.map=Ve(A.map,e),t.alphaMap=Ve(A.alphaMap,e),t.alphaCutoff=Math.max(0,Number.isFinite(A.alphaTest)?A.alphaTest:0),t.emissiveMap=Ve(A.emissiveMap,e),t.normalMap=Ve(A.normalMap,e),t.displacementMap=Ve(A.displacementMap,e);const n=Number(A.displacementBias);Number.isFinite(n)&&(t.displacementBias=n);const s=Number(A.displacementScale);t.displacementScale=Number.isFinite(s)&&(A.displacementMap!=null||s!==1)?s:t.displacementScale;const o=Number(A.userData.mutracerDisplacementStepSize);Number.isFinite(o)&&(t.displacementStepSize=Math.max(0,o));const l=A.userData.mutracerDisplacementUvProjection;(l==="triplanar"||l==="spherical"||l==="cylindrical"||l==="none")&&(t.displacementUvProjection=l);const c=Number(A.userData.mutracerDisplacementUvProjectionScale);Number.isFinite(c)&&(t.displacementUvProjectionScale=Math.max(c,1e-6)),A.roughnessMap&&A.roughnessMap===A.metalnessMap?t.metallicRoughnessMap=Ve(A.roughnessMap,e):(t.roughnessMap=Ve(A.roughnessMap,e),t.metalnessMap=Ve(A.metalnessMap,e));const f=A;if(f.type==="MeshPhysicalMaterial"){t.transmissionWeight=f.transmission,t.transmissionMap=Ve(f.transmissionMap,e),t.specularIor=f.ior;const b=f.metalness===1&&!f.metalnessMap;t.specularWeight=b?1:f.specularIntensity,f.specularColor&&!b&&(t.specularColor=f.specularColor.toArray()),t.coatWeightMap=Ve(f.clearcoatMap,e),t.coatRoughnessMap=Ve(f.clearcoatRoughnessMap,e),t.coatNormalMap=Ve(f.clearcoatNormalMap,e),t.coatNormalScale=f.clearcoatNormalScale.toArray(),t.fuzzColorMap=Ve(f.sheenColorMap,e),t.fuzzRoughnessMap=Ve(f.sheenRoughnessMap,e),b||(t.specularWeightMap=Ve(f.specularIntensityMap,e),t.specularColorMap=Ve(f.specularColorMap,e)),t.coatWeight=f.clearcoat,t.coatRoughness=f.clearcoatRoughness,t.coatIor=1.5,t.coatDarkening=0,t.fuzzWeight=f.sheen,t.fuzzRoughness=f.sheenRoughness,f.sheenColor&&(t.fuzzColor=f.sheenColor.toArray()),f.attenuationColor&&(t.transmissionColor=f.attenuationColor.toArray()),Number.isFinite(f.attenuationDistance)&&(t.transmissionDepth=Math.max(0,f.attenuationDistance))}const p=Number(f.dispersion);t.transmissionDispersionScale=Number.isFinite(p)?Math.min(1,Math.max(0,p)):0;const h=f;t.thinFilmThickness=Math.min(20,Math.max(0,(h.iridescenceThicknessRange?.[1]??500)/1e3)),t.thinFilmWeight=Math.min(1,Math.max(0,h.iridescence??0)),t.thinFilmIor=Math.min(2.5,Math.max(1,h.iridescenceIOR??1.4));const u=A.userData.mutracerThinFilmMap,d=A.userData.mutracerThinFilmMap??h.iridescenceThicknessMap??void 0;d&&(t.thinFilmMap=Ve(d,e),u||(t.thinFilmThicknessMinimum=Math.min(20,Math.max(0,(h.iridescenceThicknessRange?.[0]??0)/1e3)),t.thinFilmMapChannel="g"));const m=Number(f.anisotropy);if(t.specularRoughnessAnisotropy=Number.isFinite(m)?Math.min(1,Math.max(0,m)):0,f.isMeshPhysicalMaterial){t.specularAnisotropyModel="gltf",t.anisotropyMap=Ve(f.anisotropyMap,e);const b=Number(f.anisotropyRotation);t.specularAnisotropyRotation=Number.isFinite(b)?b:0}const v=A.userData.mutracerOpenPBR,g=v?$o(v):void 0,w=(b,x,y=0,T=1)=>{const I=Number(b);return Number.isFinite(I)?Math.min(T,Math.max(y,I)):x},B=(b,x)=>{const y=b;return y&&y.length>=3?[w(y[0],x[0]),w(y[1],x[1]),w(y[2],x[2])]:x};if(g){for(const x of["displacementScale","displacementBias","displacementStepSize"]){const y=g[x];typeof y=="number"&&Number.isFinite(y)&&(t[x]=x==="displacementStepSize"?Math.max(0,y):y)}g.specularAnisotropyModel!==void 0&&(nn(g.specularAnisotropyModel),t.specularAnisotropyModel=g.specularAnisotropyModel),g.specularAnisotropy!==void 0&&g.specularAnisotropyModel!=="gltf"&&(t.specularAnisotropyModel="openpbr",t.anisotropyMap=void 0,t.specularAnisotropyRotation=0);for(const x of["coatWeightMap","coatRoughnessMap","fuzzColorMap","fuzzRoughnessMap","specularWeightMap","specularColorMap","anisotropyMap","coatNormalMap"]){const y=g[x];y===null?t[x]=void 0:y instanceof Nt?t[x]=y:y&&y.isTexture&&typeof y.clone=="function"&&(t[x]=Ve(y,e))}t.specularAnisotropyRotation=w(g.specularAnisotropyRotation,t.specularAnisotropyRotation,-1/0,1/0),t.coatAnisotropyRotation=w(g.coatAnisotropyRotation,t.coatAnisotropyRotation,-1/0,1/0);const b=g.coatNormalScale;b&&b.length>=2&&(t.coatNormalScale=[w(b[0],t.coatNormalScale[0],-1/0,1/0),w(b[1],t.coatNormalScale[1],-1/0,1/0)]),t.baseWeight=w(g.baseWeight,t.baseWeight),t.baseDiffuseRoughness=w(g.baseDiffuseRoughness,t.baseDiffuseRoughness),t.specularWeight=w(g.specularWeight,t.specularWeight),t.specularColor=B(g.specularColor,t.specularColor),t.transmissionScatter=B(g.transmissionScatter,t.transmissionScatter),t.transmissionScatterAnisotropy=w(g.transmissionScatterAnisotropy,t.transmissionScatterAnisotropy,-.95,.95),t.transmissionDispersionScale=w(g.transmissionDispersionScale,t.transmissionDispersionScale),t.transmissionDispersionAbbeNumber=w(g.transmissionDispersionAbbeNumber,t.transmissionDispersionAbbeNumber,1,100),t.subsurfaceWeight=w(g.subsurfaceWeight,t.subsurfaceWeight),t.subsurfaceColor=B(g.subsurfaceColor,t.subsurfaceColor),t.subsurfaceRadius=w(g.subsurfaceRadius,t.subsurfaceRadius,0,1/0),t.subsurfaceRadiusScale=B(g.subsurfaceRadiusScale,t.subsurfaceRadiusScale),t.subsurfaceScatterAnisotropy=w(g.subsurfaceAnisotropy,t.subsurfaceAnisotropy,-.95,.95),t.coatWeight=w(g.coatWeight,t.coatWeight),t.coatColor=B(g.coatColor,t.coatColor),t.coatRoughness=w(g.coatRoughness,t.coatRoughness),t.coatRoughnessAnisotropy=w(g.coatAnisotropy,t.coatAnisotropy),t.coatIor=w(g.coatIor,t.coatIor,1,2.5),t.coatDarkening=w(g.coatDarkening,t.coatDarkening),t.fuzzWeight=w(g.fuzzWeight,t.fuzzWeight),t.fuzzColor=B(g.fuzzColor,t.fuzzColor),t.fuzzRoughness=w(g.fuzzRoughness,t.fuzzRoughness),"thinWalled"in g&&(t.geometryThinWalled=g.thinWalled===!0),t.thinFilmWeight=w(g.thinFilmWeight,t.thinFilmWeight),t.thinFilmThickness=w(g.thinFilmThickness,t.thinFilmThickness,0,20),t.thinFilmThicknessMinimum=w(g.thinFilmThicknessMinimum,t.thinFilmThicknessMinimum,0,20),g.thinFilmMapChannel!==void 0&&(t.thinFilmMapChannel=["r","g","b","a"][sn(g.thinFilmMapChannel)]),g.thinFilmMap instanceof Nt?t.thinFilmMap=g.thinFilmMap:g.thinFilmMap&&g.thinFilmMap.isTexture&&(t.thinFilmMap=Ve(g.thinFilmMap,e)),t.thinFilmIor=w(g.thinFilmIor,t.thinFilmIor,1,2.5)}t.geometryOpacity=A.opacity,t.doubleSided=A.side===2,g&&(t.specularRoughnessAnisotropy=w(g.specularAnisotropy,t.specularRoughnessAnisotropy),t.geometryOpacity=w(g.opacity,t.geometryOpacity));const E=Number(A.userData.mutracerBevelSize);return t.bevelSize=Number.isFinite(E)?Math.max(0,E):0,t.mapAlphaUsage=A.transparent||A.alphaMap||A.alphaTest>0?"alpha":"opaque",t.alphaMode=A.alphaTest>0?"mask":A.transparent||t.geometryOpacity<1||A.alphaMap?"blend":"opaque",A.side===1&&(t.displacementScale=-t.displacementScale,t.displacementBias=-t.displacementBias),t}function zi(i,e=i.itemSize){const t=new Float32Array(i.count*e);if(i.array instanceof Float32Array&&!i.normalized){const a=i;if(!a.isInterleavedBufferAttribute&&e===i.itemSize)t.set(i.array.subarray(0,t.length));else{const r=a.isInterleavedBufferAttribute?a.data.stride:i.itemSize,n=a.isInterleavedBufferAttribute?a.offset:0;for(let s=0;s<i.count;s++){const o=s*r+n,l=s*e;for(let c=0;c<e;c++)t[l+c]=i.array[o+c]}}return t}const A=[i.getX,i.getY,i.getZ,i.getW];for(let a=0;a<i.count;a++)for(let r=0;r<e;r++)t[a*e+r]=A[r].call(i,a);return t}function gu(i,e,t,A){const a=i.getAttribute("position"),r=i.getAttribute("normal"),n=i.getAttribute("tangent"),s=i.getAttribute("uv"),o=i.getAttribute("uv1"),l=t&&i.getAttribute("color"),c=i.getIndex(),f=c?c.array.length:a.count,p=g=>{const w=Math.trunc(g)||0;return w<0?Math.max(f+w,0):Math.min(w,f)},h=e?p(e.start):0,u=e?p(e.start+e.count):f;let d=Math.max(u-h,0);if(d-=d%3,d===0)return null;const m=new Uint32Array(d);if(c)m.set(c.array.subarray(h,h+d));else for(let g=0;g<d;g++)m[g]=h+g;if(A)for(let g=0;g<m.length;g+=3){const w=m[g+1];m[g+1]=m[g+2],m[g+2]=w}const v=new oi({position:new Ce(zi(a),a.itemSize),normal:r&&new Ce(zi(r),r.itemSize),tangent:n&&new Ce(zi(n,Math.min(4,n.itemSize)),Math.min(4,n.itemSize)),uv:s&&new Ce(zi(s),s.itemSize),uv1:o&&new Ce(zi(o),o.itemSize),color:l?new Ce(zi(l,3),3):void 0,indices:new Ce(m,1)});return A&&(r&&ol(v),ll(v)),Jo(v),v}function ol(i){const e=i.normal.array;for(let t=0;t<e.length;t++)e[t]=-e[t]}function ll(i){const e=i.tangent;if(e?.itemSize===4)for(let t=3;t<e.array.length;t+=4)e.array[t]*=-1}function ls(){return{updateId:0,textures:new WeakMap,equirectTextures:new WeakMap,materials:new WeakMap,geometries:new WeakMap,materialHooks:new WeakMap,lightHooks:new WeakMap,poseChanged:!1,meshes:new WeakMap,lights:new WeakMap,deformedGeometries:new WeakMap,deformations:new WeakMap,instanceMeshes:new WeakMap,projectionVariants:new Map,warned:new WeakSet}}const ia=["position","normal","tangent","uv","uv1","color","index"];function vu(i,e){const t=[];for(let A=0;A<ia.length;A++){const a=ia[A],r=a==="index"?i.index:i.getAttribute(a);if(!r){t.push(void 0);continue}const n=r,s=n.isInterleavedBufferAttribute?n.data:r;t.push(r,s,e&&A<3?void 0:s.version,s.array,r.count,r.itemSize,r.normalized,n.offset,n.data?.stride)}return t}function Bu(i,e,t){let A=0;for(let a=0;a<ia.length;a++){const r=ia[a],n=r==="index"?i.index:i.getAttribute(r);if(!n){if(e[A++]!==void 0)return!1;continue}const s=n,o=s.isInterleavedBufferAttribute?s.data:n;if(e[A++]!==n||e[A++]!==o||!Object.is(e[A++],t&&a<3?void 0:o.version)||e[A++]!==o.array||!Object.is(e[A++],n.count)||!Object.is(e[A++],n.itemSize)||!Object.is(e[A++],n.normalized)||!Object.is(e[A++],s.offset)||!Object.is(e[A++],s.data?.stride))return!1}return A===e.length}function ki(i,e,t){const A=i.lights.get(e);if(!A||A.type!==t.type)return i.lights.set(e,t),t;for(const a of Object.keys(t)){const r=A[a],n=t[a];Array.isArray(r)&&Array.isArray(n)&&_t(r,n)||(A[a]=n)}return A}function wu(i,e,t){const A=++t.updateId,a=[],r=[],n=t.textures,s=new Set,o=new Map;function l(_,F){let V=o.get(F);if(V===void 0&&(V=ii(F),o.set(F,V)),!(_.base===F&&_.hash===V&&al(F,_.parameters))){for(const Z of ss)_.material[Z]=F[Z];_.autoUvProjection&&(_.material.uvProjection="triplanar"),_.autoDisplacementUvProjection&&(_.material.displacementUvProjection="triplanar"),_.parameters=nl(F),_.hash=V,_.base=F}}function c(_,F,V,Z){if(!V&&!Z)return F;let ie=t.projectionVariants.get(_);ie||(ie=new Map,t.projectionVariants.set(_,ie));const N=`${+V}:${+Z}`;let K=ie.get(N);return K||(K={material:new il,parameters:[],autoUvProjection:V,autoDisplacementUvProjection:Z},ie.set(N,K)),l(K,F),K.material}function f(_){if(!e.convertMaterial)return;let F=t.materialHooks.get(_);return(!F||F.version!==_.version)&&(F={version:_.version,value:e.convertMaterial(_)},t.materialHooks.set(_,F)),F.value}function p(_){if(!e.convertLight)return;const F=_.userData.mutracerVersion,V=typeof F=="number"?F:void 0;let Z=t.lightHooks.get(_);return(!Z||Z.version!==V)&&(Z={version:V,value:e.convertLight(_)},t.lightHooks.set(_,Z)),Z.value}function h(_){const F=f(_);if(F!==void 0)return F;const V=t.materials.get(_);if(s.has(_))return V.material;const Z=mu(_,n),ie=ii(Z);let N=Z;if(V){if(V.hash!==ie){for(const K of ss)V.material[K]=Z[K];V.hash=ie}N=V.material}else t.materials.set(_,{material:N,hash:ie});return s.add(_),N}function u(_){return _.isMesh}function d(_){return _.isDirectionalLight}function m(_){return _.isAmbientLight}function v(_){return _.isRectAreaLight}function g(_){return _.type==="PointLight"}function w(_){return _.type==="SpotLight"}i.updateMatrixWorld(!0),i.traverseVisible(_=>{if(_.isLight){const F=p(_);if(F!==void 0){F!==null&&r.push(F);return}}if(u(_)){if(_.userData.viewerEnvironment||_.userData.viewerRealtimeDisplacement)return;const F=Array.isArray(_.material)?_.material:[_.material];if(F.some(V=>f(V)===null))return;if(!_.geometry)console.warn(_,"must have a geometry property");else if(F.some(V=>f(V)===void 0&&!V.isMeshStandardMaterial&&!V.isMeshBasicMaterial&&V.userData.mutracerShadowCatcher!==!0))console.warn(_,"must use MeshStandardMaterial or MeshBasicMaterial in order to be rendered.");else{const V=_,Z=_.isBatchedMesh||V.isInstancedMesh&&(!!V.morphTexture||_.isSkinnedMesh);Z&&!t.warned.has(_)&&(console.warn("MuTracer: BatchedMesh, instanced morph targets and skinned instancing are not supported; converting as an ordinary mesh.",_),t.warned.add(_));const ie=V.isInstancedMesh&&!Z;let N,K=!1;!Z&&fu(_)&&(N=t.deformations.get(_),N?.matches(_.geometry)||(N=new uu(_.geometry),t.deformations.set(_,N),t.deformedGeometries.delete(_)),K=N.update(_),t.poseChanged||=K);const ge=F,ue=ge.length>1&&_.geometry.groups.length?_.geometry.groups:[{start:0,count:1/0,materialIndex:0}];let de=N?t.deformedGeometries.get(_):t.geometries.get(_.geometry);(!de||de.checkedAt!==A)&&((!de||!Bu(_.geometry,de.state,!!N))&&(de={state:vu(_.geometry,!!N),groups:new Map,checkedAt:A},N?t.deformedGeometries.set(_,de):t.geometries.set(_.geometry,de)),de.checkedAt=A);const Ee=de;ue.forEach((_e,W)=>{const le=Number.isFinite(_e.count)?_e.count:_.geometry.getIndex()?.count??_.geometry.getAttribute("position").count,ye=ge[_e.materialIndex??0],ne=ye.vertexColors===!0,Qe=ye.side===1,Je=`${_e.start}:${le}:${ne}:${Qe}`;let se=Ee.groups.get(Je);const et=!se;if(!se){const ve=gu(_.geometry,{start:_e.start,count:le},ne,Qe);if(!ve)return;se=ve,Ee.groups.set(Je,se)}if(N&&(K||et||t.meshes.get(_)?.get(W)?.geometry!==se)){if(se.dynamic=!0,se.position.array.set(N.position),N.normal)se.normal.array.set(N.normal),Qe&&ol(se);else{const ve=se.normal;jo(se),ve.array.set(se.normal.array),se.normal=ve}N.tangent&&se.tangent&&(se.tangent.array.set(N.tangent),Qe&&ll(se)),_.geometry.getAttribute("tangent")||Qf(se),Jo(se),et||ou(se)}let Se=h(ye);const oe=Se,be=!se.uv&&oe.uvProjection==="none"&&!!(oe.map||oe.normalMap||oe.emissiveMap||oe.metallicRoughnessMap||oe.roughnessMap||oe.metalnessMap||oe.thinFilmMap||oe.coatWeightMap||oe.coatRoughnessMap||oe.fuzzColorMap||oe.fuzzRoughnessMap||oe.specularWeightMap||oe.specularColorMap||oe.anisotropyMap||oe.coatNormalMap),Ie=!se.uv&&!!oe.displacementMap&&oe.displacementUvProjection==="none",je=ie?V.count:1;if(ie){let ve=t.instanceMeshes.get(_);ve||(ve=new Map,t.instanceMeshes.set(_,ve));const Pe=c(ye,oe,be,Ie);let ce=ve.get(W);ce||(ce=new rt(se,Pe,{count:je}),ce.transform=_.matrixWorld.elements.slice(),ve.set(W,ce)),ce.geometry=se,ce.materials[0]!==Pe&&(ce.materials=[Pe]);let vt=ce.count!==je;ce.transforms.length<je*16&&(ce.transforms=new Float32Array(je*16),vt=!0);const fe=V.instanceColor;let Le=!1;if(fe){(!ce.colors||ce.colors.length<je*3)&&(ce.colors=new Float32Array(je*3));for(let xe=0;xe<je;xe++)for(let D=0;D<3;D++){const Y=Math.fround(D===0?fe.getX(xe):D===1?fe.getY(xe):fe.getZ(xe));Object.is(ce.colors[xe*3+D],Y)||(ce.colors[xe*3+D]=Y,Le=!0)}}else ce.colors=void 0;ce.count=je;const ke=V.instanceMatrix;for(let xe=0;xe<je;xe++)for(let D=0;D<16;D++){const Y=Math.fround(ke.array[xe*ke.itemSize+D]);Object.is(ce.transforms[xe*16+D],Y)||(ce.transforms[xe*16+D]=Y,vt=!0)}for(let xe=0;xe<16;xe++)ce.transform[xe]=_.matrixWorld.elements[xe];vt&&ce.markTransformsUpdated(),Le&&ce.markColorsUpdated(),ce.name=_.name||`Mesh ${a.length+1}${ue.length>1?`.${W+1}`:""}`,je>0&&(a.push(ce),e.onMeshConverted?.(ce,_,_e,W))}else{Se=c(ye,oe,be,Ie);let ve=t.meshes.get(_);ve||(ve=new Map,t.meshes.set(_,ve));let Pe=ve.get(W);Pe||(Pe=new Wo(se,Se),Pe.transform=_.matrixWorld.elements.slice(),ve.set(W,Pe)),Pe.geometry=se,Pe.materials[0]!==Se&&(Pe.materials=[Se]),Pe.name=_.name||`Mesh ${a.length+1}${ue.length>1?`.${W+1}`:""}`;for(let ce=0;ce<16;ce++)Pe.transform[ce]=_.matrixWorld.elements[ce];a.push(Pe),e.onMeshConverted?.(Pe,_,_e,W)}})}}else if(d(_)){const F=new zf({color:_.color.toArray(),intensity:_.intensity});F.transform=Array.from(F.transform),F.position=_.getWorldPosition(_.position.clone()).toArray(),F.lookAt(_.target.getWorldPosition(_.target.position.clone()).toArray()),r.push(ki(t,_,F))}else if(v(_)){const F=_.matrixWorld.clone(),V=_.getWorldQuaternion(_.quaternion.clone()).normalize(),Z=_.getWorldPosition(_.position.clone()),ie=F.elements,N=Math.hypot(ie[0],ie[1],ie[2]),K=Math.hypot(ie[4],ie[5],ie[6]),ge=new Nf({size:[_.width*N,_.height*K],color:_.color.toArray(),intensity:_.intensity});F.compose(Z,V,_.scale.clone().set(1,1,1)),ge.transform=F.elements.slice(),r.push(ki(t,_,ge))}else if(w(_)){const F=_.getWorldPosition(_.position.clone()),V=_.target.getWorldPosition(_.target.position.clone()),Z=_.angle*180/Math.PI,ie=_.userData.mutracerIesProfile;if(ie!=null&&!(ie instanceof Yf))throw new Error(`THREE.SpotLight "${_.name||"<unnamed>"}" has an invalid mutracerIesProfile`);const N=new Hf({color:_.color.toArray(),intensity:_.intensity,radius:_.userData.mutracerRadius??.01,innerAngle:Z*(1-_.penumbra),outerAngle:Z,iesProfile:ie});N.transform=Array.from(N.transform),N.position=F.toArray(),N.lookAt(V.toArray());const K=-(_.userData.mutracerIesRotation??0)*Math.PI/180;K&&bf(N.transform,N.transform,K),r.push(ki(t,_,N))}else if(g(_)){const F=_.matrixWorld.elements,V=[F[12],F[13],F[14]];r.push(ki(t,_,Object.assign(new Gf({color:_.color.toArray(),intensity:_.intensity,radius:_.userData.mutracerRadius??.25}),{transform:[1,0,0,0,0,1,0,0,0,0,1,0,...V,1]})))}else m(_)&&r.push(ki(t,_,new Ff({color:_.color.toArray(),intensity:_.intensity})))});const B=i.environment,E=e.environment??ir(B,t.equirectTextures),b=e.environment??B,x=b&&E?ki(t,b,new jf({map:E,intensity:i.environmentIntensity})):void 0;x&&(x.transform=i.matrix.clone().makeRotationFromEuler(i.environmentRotation).elements.slice(),r.push(x));const y=i.userData.mutracerGroundedSkybox,T=y&&(y.texture instanceof Nt?y.texture:ir(y.texture,t.equirectTextures));let P=i.userData.mutracerHiddenBackground===!0?[0,0,0,0]:y&&T?{type:"GroundedSkybox",map:T,height:y.height,radius:y.radius,groundHeight:y.groundHeight,center:y.center,rotation:y.rotation,intensity:y.intensity}:i.background?i.background.isColor?[...i.background.toArray(),1]:i.background===i.environment&&x?x.map:ir(i.background,t.equirectTextures):void 0;const S=i.backgroundRotation,R=!!S&&(S.x!==0||S.y!==0||S.z!==0),L=i.backgroundIntensity??1;P instanceof Nt&&(R||L!==1)&&(P={type:"Equirect",map:P,transform:R?i.matrix.clone().makeRotationFromEuler(S).elements.slice():void 0,intensity:L!==1?L:void 0});const H=t.background;Array.isArray(P)&&Array.isArray(H)&&_t(P,H)?P=H:P&&H&&!Array.isArray(P)&&!Array.isArray(H)&&!(P instanceof Nt)&&!(H instanceof Nt)&&P.type===H.type&&(_t(Si(P).slice(1),Si(H).slice(1))||Object.assign(H,P),P=H),t.background=P;const J=new Set(a.flatMap(_=>_.materials));for(const[_,F]of t.projectionVariants){for(const[V,Z]of F)J.has(Z.material)||F.delete(V);F.size||t.projectionVariants.delete(_)}return{background:P,meshes:a,lights:r}}function Ar(i,e){if(!i||!e.getPolarAngle||!e.getAzimuthalAngle)return;i.parent?.updateWorldMatrix(!0,!1);const t=[i,e.update,i.parent,...i.position.toArray(),...i.quaternion.toArray(),...i.scale.toArray(),...i.up.toArray(),i.zoom,...i.parent?.matrixWorld.elements??[]];for(const[A,a]of Object.entries(e)){if(A.startsWith("_")||A==="state")continue;const r=a;r?.isVector3?t.push(A,...r.toArray()):(typeof a=="number"||typeof a=="boolean"||typeof a=="string")&&t.push(A,a)}return t}class Eu extends su{_options;scene;_camera;_store=ls();_disposed=!1;_started=!1;_gestureChanged=!1;_cameraState=[];_lastUpdate;_idleControlsState;_start=()=>{this._started=!0,this._gestureChanged=!1};_end=()=>{this._started=!1};constructor(e,t={}){super(e),this._options=t,t.scene&&(this.scene={meshes:[],lights:[]}),t.controls?.addEventListener("start",this._start),t.controls?.addEventListener("end",this._end)}update(){if(this._disposed)throw new Error("THREESync has been disposed");const e=performance.now(),t=this._options.controls,A=this._options.camera,a=this._lastUpdate===void 0?0:Math.max(0,(e-this._lastUpdate)/1e3),r=Math.min(.1,a);this._lastUpdate=e;let n=!1,s=!1;if(t&&this._options.updateControls!==!1){const l=Ar(A,t);if(!((!this._started||!this._gestureChanged)&&!t.autoRotate&&l&&this._idleControlsState&&_t(l,this._idleControlsState))){this._idleControlsState=void 0;const f=A?.position.clone(),p=A?.quaternion.clone(),h=A?.zoom,u=t.target?.clone(),d=t.dampingFactor,m=t.enableDamping&&d!==void 0&&d>=0&&d<=1?1-Math.pow(1-d,a*60):void 0;m!==void 0&&(t.dampingFactor=m);try{n=!!t.update(r)}finally{m!==void 0&&(t.dampingFactor=d)}if(!this._started&&!t.autoRotate&&t.enableDamping&&f&&A&&t.target){const v=m?d/m:1,g=f.distanceTo(A.position)*v,w=Math.abs(Math.log(A.zoom/h))*v,B=g>0||A.zoom!==h||!!(l&&(!p.equals(A.quaternion)||!u.equals(t.target)));if((n||B)&&g<5e-4*A.position.distanceTo(t.target)&&w<5e-4){t.enableDamping=!1;try{t.update(0)}finally{t.enableDamping=!0}n=!1,s=!0}l&&(s||!n&&!B)&&(this._idleControlsState=Ar(A,t))}else l&&!this._started&&!t.autoRotate&&!n&&(this._idleControlsState=Ar(A,t))}}if(this._store.poseChanged=!1,this._options.scene&&this.scene){const l=wu(this._options.scene,this._options,this._store);_t(this.scene.meshes,l.meshes)||(this.scene.meshes=l.meshes),_t(this.scene.lights,l.lights)||(this.scene.lights=l.lights),this.scene.background=l.background,this.engine.scene=this.scene}let o=!1;if(A){A.updateWorldMatrix(!0,!1);const l=bu(A),c=Si(l).slice(1);o=this._cameraState.length>0&&!_t(c,this._cameraState),this._cameraState=c,this._camera?this._camera.copy(l):this._camera=l,this.engine.camera=this._camera}this._started&&(n||o)&&(this._gestureChanged=!0),this.setActive(this._started&&this._gestureChanged||n||this._store.poseChanged||o&&!s)}dispose(){this._disposed||(this._options.controls?.removeEventListener("start",this._start),this._options.controls?.removeEventListener("end",this._end),this._store=ls(),this._idleControlsState=void 0,this._disposed=!0,super.dispose())}}function bu(i,e={}){const t=i.fov?new wA({projection:"perspective",fov:i.fov,aspect:i.aspect,near:i.near,far:i.far}):new wA({projection:"orthographic",left:i.left,right:i.right,bottom:i.bottom,top:i.top,near:i.near,far:i.far});i.updateWorldMatrix(!0,!1),t.zoom=i.zoom,t.transform=i.matrixWorld.elements.slice();const A=i;if(A.isPerspectiveCamera){A.focus>0&&(t.focusDistance=A.focus);const a=A.getFilmHeight();a>0&&(t.sensorHeight=a)}return e.fStop!==void 0&&(t.fStop=e.fStop),e.focusDistance!==void 0&&(t.focusDistance=e.focusDistance),e.metersPerUnit!==void 0&&(t.metersPerUnit=e.metersPerUnit),t}const cl=["map","alphaMap","normalMap","emissiveMap","metallicRoughnessMap","roughnessMap","metalnessMap","transmissionMap","thinFilmMap","displacementMap","coatWeightMap","coatRoughnessMap","fuzzColorMap","fuzzRoughnessMap","specularWeightMap","specularColorMap","anisotropyMap","coatNormalMap"];function k(i,e,t,A=!1){return{name:i,source:e,type:t,reserved:A}}const Ca=[{name:"COLOR",fields:[k("color","color","vec3f"),k("matType","type","f32")]},{name:"ROUGHNESS_NORMAL",fields:[k("roughness","roughness","f32"),k("normalMapIndex","normalMapIndex","f32"),k("normalMapScale","normalScale","vec2f")]},{name:"METALLIC_MAPS",fields:[k("metallic","metallic","f32"),k("anisotropy","anisotropy","f32"),k("diffuseMapIndex","diffuseMapIndex","f32"),k("mrtMapIndex","metallicRoughnessMapIndex","f32")]},{name:"EMISSION",fields:[k("emission","emission","vec3f"),k("emissiveMapIndex","emissiveMapIndex","f32")]},{name:"IOR_TRANSMISSION",fields:[k("ior","ior","f32"),k("transmission","transmission","f32"),k("mediumType","mediumType","f32",!0),k("thin","thin","f32")]},{name:"MISC",fields:[k("bevel","bevelSize","f32"),k("dispersion","dispersion","f32"),k("thinFilmThickness","thinFilmThickness","f32"),k("mapAlphaUsage","mapAlphaUsage","f32")]},{name:"LAYER_MAPS",fields:[k("coatWeightMapIndex","coatWeightMapIndex","f32"),k("coatRoughnessMapIndex","coatRoughnessMapIndex","f32"),k("coatNormalMapIndex","coatNormalMapIndex","f32"),k("fuzzColorMapIndex","fuzzColorMapIndex","f32")]},{name:"UV",fields:[k("uvProjection","uvProjection","f32"),k("displacementMapIndex","displacementMapIndex","f32"),k("uvScale","uvScale","vec2f")]},{name:"DISPLACEMENT",fields:[k("displacementStepSize","displacementStepSize","f32"),k("displacementBias","displacementBias","f32"),k("displacementUvProjection","displacementUvProjection","f32"),k("displacementUvProjectionScale","displacementUvProjectionScale","f32")]},{name:"ALPHA_FILM",fields:[k("alpha","alpha","f32"),k("thinFilmMapIndex","thinFilmMapIndex","f32"),k("thinFilmIor","thinFilmIor","f32"),k("transmissionMapIndex","transmissionMapIndex","f32")]},{name:"BASE_CONTROLS",fields:[k("baseWeight","baseWeight","f32"),k("baseDiffuseRoughness","baseDiffuseRoughness","f32"),k("specularWeight","specularWeight","f32"),k("subsurfaceWeight","subsurfaceWeight","f32")]},{name:"SPECULAR_FUZZ",fields:[k("specularColor","specularColor","vec3f"),k("fuzzWeight","fuzzWeight","f32")]},{name:"TRANSMISSION_COLOR",fields:[k("transmissionColor","transmissionColor","vec3f"),k("transmissionDepth","transmissionDepth","f32")]},{name:"TRANSMISSION_SCATTER",fields:[k("transmissionScatter","transmissionScatter","vec3f"),k("transmissionScatterAnisotropy","transmissionScatterAnisotropy","f32")]},{name:"SUBSURFACE",fields:[k("subsurfaceColor","subsurfaceColor","vec3f"),k("subsurfaceRadius","subsurfaceRadius","f32")]},{name:"FUZZ",fields:[k("fuzzColor","fuzzColor","vec3f"),k("fuzzRoughness","fuzzRoughness","f32")]},{name:"COAT",fields:[k("coatColor","coatColor","vec3f"),k("coatWeight","coatWeight","f32")]},{name:"COAT_CONTROLS",fields:[k("coatRoughness","coatRoughness","f32"),k("coatAnisotropy","coatAnisotropy","f32"),k("coatIor","coatIor","f32"),k("coatDarkening","coatDarkening","f32")]},{name:"FILM_DISPERSION",fields:[k("thinFilmWeight","thinFilmWeight","f32"),k("dispersionAbbeNumber","dispersionAbbeNumber","f32"),k("subsurfaceScatterAnisotropy","subsurfaceScatterAnisotropy","f32"),k("fuzzRoughnessMapIndex","fuzzRoughnessMapIndex","f32")]},{name:"SUBSURFACE_RADIUS",fields:[k("subsurfaceRadiusScale","subsurfaceRadiusScale","vec3f"),k("specularWeightMapIndex","specularWeightMapIndex","f32")]},{name:"MEDIUM_EXTINCTION",fields:[k("mediumExtinction","mediumExtinction","vec3f"),k("mediumAnisotropy","mediumAnisotropy","f32")]},{name:"MEDIUM_SCATTERING",fields:[k("mediumScattering","mediumScattering","vec3f"),k("specularColorMapIndex","specularColorMapIndex","f32")]},{name:"STANDALONE_MAPS",fields:[k("roughnessMapIndex","roughnessMapIndex","f32"),k("metalnessMapIndex","metalnessMapIndex","f32"),k("alphaMapIndex","alphaMapIndex","f32"),k("alphaCutoff","alphaCutoff","f32")]},{name:"ALPHA",fields:[k("_padding1",null,"f32",!0),k("_padding2",null,"f32",!0),k("doubleSided","doubleSided","f32"),k("alphaMode","alphaMode","f32")]},{name:"DIRECTION_NORMAL",fields:[k("anisotropyMapIndex","anisotropyMapIndex","f32"),k("specularAnisotropyRotation","specularAnisotropyRotation","f32"),k("coatNormalScale","coatNormalScale","vec2f")]},{name:"FILM_TEXTURE",fields:[k("coatAnisotropyRotation","coatAnisotropyRotation","f32"),k("specularAnisotropyModel","specularAnisotropyModel","f32"),k("thinFilmThicknessMinimum","thinFilmThicknessMinimum","f32"),k("thinFilmMapChannel","thinFilmMapChannel","f32")]}],on=Ca.length,Aa=on*4,Rr={f32:1,vec2f:2,vec3f:3};function ln(){return Ca.flatMap((i,e)=>{let t=0;return i.fields.map(A=>{const a=e*16+t*4;return t+=Rr[A.type],{name:A.name,source:A.source,type:A.type,reserved:A.reserved,row:e,component:a%16/4,offset:a}})})}function _u(){let i=0;const e=ln().map(t=>{const A=t.type==="vec3f"?16:Rr[t.type]*4,a=Math.ceil(i/A)*A;if(a!==t.offset)throw new Error(`Misaligned material field: ${t.name}`);return i=a+Rr[t.type]*4,`  ${t.name}: ${t.type},`});if(Math.ceil(i/16)*16!==on*16)throw new Error("Invalid material buffer size");return`struct MaterialBuffer {
${e.join(`
`)}
};`}function yu(){return[`const int MAT_DATA_SIZE = ${on};`,...Ca.map((i,e)=>`const int MAT_ROW_${i.name} = ${e};`)].join(`
`)}const xu=[{property:"map",index:"diffuseMapIndex",target:"baseColor/alpha/transmissionWeight",channel:"rgb/a",colorSpace:"srgb",operation:"custom",define:"NUM_DIFFUSE_MAPS",feature:"USE_DIFFUSE_MAPS",featureBit:2**1,sampling:"manual"},{property:"alphaMap",index:"alphaMapIndex",target:"alpha",channel:"g",colorSpace:"linear",operation:"multiply",define:"NUM_ALPHA_MAPS",feature:"USE_ALPHA_MAPS",featureBit:2**2,sampling:"multiply"},{property:"normalMap",index:"normalMapIndex",target:"normal",channel:"rgb",colorSpace:"linear",operation:"custom",define:"NUM_NORMAL_MAPS",feature:"USE_NORMAL_MAPS",featureBit:2**9,sampling:"manual"},{property:"emissiveMap",index:"emissiveMapIndex",target:"emission",channel:"rgb",colorSpace:"srgb",operation:"custom",define:"NUM_EMISSIVE_MAPS",feature:"USE_EMISSIVE_MAPS",featureBit:2**7,sampling:"manual"},{property:"metallicRoughnessMap",index:"metallicRoughnessMapIndex",target:"baseMetalness/specularRoughness",channel:"b/g",colorSpace:"linear",operation:"custom",define:"NUM_METALLIC_ROUGHNESS_MAPS",feature:"USE_METALLIC_ROUGHNESS_MAPS",featureBit:2**3,sampling:"manual"},{property:"roughnessMap",index:"roughnessMapIndex",target:"specularRoughness",channel:"g",colorSpace:"linear",operation:"multiply",define:"NUM_ROUGHNESS_MAPS",feature:"USE_ROUGHNESS_MAPS",featureBit:2**4,sampling:"multiply"},{property:"metalnessMap",index:"metalnessMapIndex",target:"baseMetalness",channel:"b",colorSpace:"linear",operation:"multiply",define:"NUM_METALNESS_MAPS",feature:"USE_METALNESS_MAPS",featureBit:2**5,sampling:"multiply"},{property:"transmissionMap",index:"transmissionMapIndex",target:"transmissionWeight",channel:"r",colorSpace:"linear",operation:"multiply",define:"NUM_TRANSMISSION_MAPS",feature:"USE_TRANSMISSION_MAPS",featureBit:2**6,sampling:"multiply"},{property:"thinFilmMap",index:"thinFilmMapIndex",target:"thinFilmThickness",channel:"per-material",colorSpace:"linear",operation:"custom",define:"NUM_THIN_FILM_MAPS",feature:"USE_THIN_FILM_MAPS",featureBit:2**8,sampling:"manual"},{property:"displacementMap",index:"displacementMapIndex",target:"displacement",channel:"r",colorSpace:"linear",operation:"custom",define:null,feature:null,featureBit:0,sampling:"manual"},{property:"coatWeightMap",index:"coatWeightMapIndex",target:"coatWeight",channel:"r",colorSpace:"linear",operation:"multiply",define:"NUM_COAT_WEIGHT_MAPS",feature:"USE_COAT_WEIGHT_MAPS",featureBit:2**15,sampling:"multiply"},{property:"coatRoughnessMap",index:"coatRoughnessMapIndex",target:"coatRoughness",channel:"g",colorSpace:"linear",operation:"multiply",define:"NUM_COAT_ROUGHNESS_MAPS",feature:"USE_COAT_ROUGHNESS_MAPS",featureBit:2**16,sampling:"multiply"},{property:"fuzzColorMap",index:"fuzzColorMapIndex",target:"fuzzColor",channel:"rgb",colorSpace:"srgb",operation:"multiply",define:"NUM_FUZZ_COLOR_MAPS",feature:"USE_FUZZ_COLOR_MAPS",featureBit:2**18,sampling:"multiply"},{property:"fuzzRoughnessMap",index:"fuzzRoughnessMapIndex",target:"fuzzRoughness",channel:"a",colorSpace:"linear",operation:"multiply",define:"NUM_FUZZ_ROUGHNESS_MAPS",feature:"USE_FUZZ_ROUGHNESS_MAPS",featureBit:2**19,sampling:"multiply"},{property:"specularWeightMap",index:"specularWeightMapIndex",target:"specularWeight",channel:"a",colorSpace:"linear",operation:"multiply",define:"NUM_SPECULAR_WEIGHT_MAPS",feature:"USE_SPECULAR_WEIGHT_MAPS",featureBit:2**20,sampling:"multiply"},{property:"specularColorMap",index:"specularColorMapIndex",target:"specularColor",channel:"rgb",colorSpace:"srgb",operation:"multiply",define:"NUM_SPECULAR_COLOR_MAPS",feature:"USE_SPECULAR_COLOR_MAPS",featureBit:2**21,sampling:"multiply"},{property:"anisotropyMap",index:"anisotropyMapIndex",target:"specularAnisotropy/direction",channel:"rg/b",colorSpace:"linear",operation:"custom",define:"NUM_ANISOTROPY_MAPS",feature:"USE_ANISOTROPY_MAPS",featureBit:2**22,sampling:"manual"},{property:"coatNormalMap",index:"coatNormalMapIndex",target:"coatNormal",channel:"rgb",colorSpace:"linear",operation:"custom",define:"NUM_COAT_NORMAL_MAPS",feature:"USE_COAT_NORMAL_MAPS",featureBit:2**17,sampling:"manual"}],fl=xu,PA=fl.map(i=>{const e=ln().find(t=>t.source===i.index);if(!e)throw new Error(`Missing packed texture index: ${i.property}`);return{property:i.property,index:i.index,target:i.target,channel:i.channel,colorSpace:i.colorSpace,operation:i.operation,define:i.define,feature:i.feature,featureBit:i.featureBit,sampling:i.sampling,packed:{row:e.row,component:e.component,wgslField:e.name,glslRow:`MAT_ROW_${Ca[e.row].name}`,glslComponent:"xyzw"[e.component]}}}),ul={},dl=[];for(const i of fl)i.feature&&(ul[i.feature]=i.featureBit),i.define&&dl.push(i.define);function Cu(i){const e={};for(const t of PA)t.feature&&t.define&&(e[t.feature]=Number(i[t.define])>0);return e}function Xe(i,e){const t=PA.find(r=>r.property===i);if(!t||t.sampling!=="multiply")throw new Error(`Handwritten texture slot: ${i}`);const A=t.index,a=r=>t.colorSpace==="srgb"?`decodeMapColor(${A}, ${r})`:r;return e==="wgsl"?`
  if (${t.feature}) {
    let ${A} = i32(matData.${t.packed.wgslField});
    if (${A} >= 0) {
      (*ma).${t.target} *= ${a(`sampleMap(
        ${A}, getMapUvSet(${A}, uv, uv1)
      ).${t.channel}`)};
    }
  }
`:`
  #ifdef ${t.define}
    int ${A} = int(fetchMatData(i + ${t.packed.glslRow}).${t.packed.glslComponent});
    if (${A} >= 0) {
      mat.${t.target} *= ${a(`sampleMap(
        ${A}, getMapUvSet(${A}, uv, uv1)
      ).${t.channel}`)};
    }
  #endif
`}function hl(i){const e=PA.find(t=>t.property==="thinFilmMap");return i==="wgsl"?`
  if (${e.feature}) {
    let thinFilmMapIndex = i32(matData.${e.packed.wgslField});
    if (thinFilmMapIndex >= 0) {
      let filmTexel = sampleMap(thinFilmMapIndex, getMapUvSet(thinFilmMapIndex, uv, uv1));
      // Preserve the legacy nm conversion followed by R multiplication exactly.
      if (matData.thinFilmThicknessMinimum == 0.0 && matData.thinFilmMapChannel == 0.0) {
        (*ma).thinFilmThickness *= filmTexel.r;
      } else {
        (*ma).thinFilmThickness = mix(matData.thinFilmThicknessMinimum,
          matData.thinFilmThickness, filmTexel[i32(matData.thinFilmMapChannel)]) * 1000.0;
      }
    }
  }
`:`
  #ifdef ${e.define}
    int thinFilmMapIndex = int(fetchMatData(i + ${e.packed.glslRow}).${e.packed.glslComponent});
    if (thinFilmMapIndex >= 0) {
      vec4 filmTexel = sampleMap(thinFilmMapIndex, getMapUvSet(thinFilmMapIndex, uv, uv1));
      vec4 filmTextureParams = fetchMatData(i + MAT_ROW_FILM_TEXTURE);
      if (filmTextureParams.z == 0.0 && filmTextureParams.w == 0.0) {
        mat.thinFilmThickness *= filmTexel.r;
      } else {
        mat.thinFilmThickness = mix(filmTextureParams.z, misc.b,
          filmTexel[int(filmTextureParams.w)]) * 1000.0;
      }
    }
  #endif
`}function pl(i,e){const t={textures:[],indices:{}};for(const A of e)t.indices[A]=Qu(i,A,t.textures);return t}function Qu(i,e,t){const A=[];for(const a of i)if(!(a[e]&&a[e].image))A.push(-1);else{let n=t.indexOf(a[e]);n>=0?A.push(n):(A.push(t.length),t.push(a[e]))}return A}const cn=3,fn=2;function EA(i){const e=[i.emissionColor[0]*i.emissionLuminance,i.emissionColor[1]*i.emissionLuminance,i.emissionColor[2]*i.emissionLuminance];if(i.unlit||i.shadowCatcher||i.coatWeight<=0||i.coatWeightMap)return e;const t=Math.min(i.coatWeight,1);return e[0]=e[0]*(1+t*(Math.sqrt(Math.max(i.coatColor[0],0))-1)),e[1]=e[1]*(1+t*(Math.sqrt(Math.max(i.coatColor[1],0))-1)),e[2]=e[2]*(1+t*(Math.sqrt(Math.max(i.coatColor[2],0))-1)),e}function un(i){return!i.thinWalled&&(i.transmissionWeight>0&&i.transmissionDepth>0||i.subsurfaceWeight>0)}function ar(i,e){const t=Number(i);return Number.isFinite(t)?Math.min(1,Math.max(0,t)):e}function It(i,e=0){return[ar(i[0],e),ar(i[1],e),ar(i[2],e)]}function Ot(i,e){return e===0?i[0]:e===1?i[1]:i[2]}function aa(i,e){return[e(i[0],0),e(i[1],1),e(i[2],2)]}function cs(i){return[i(0),i(1),i(2)]}function Mu(){return{anisotropy:0,extinction:[0,0,0],scattering:[0,0,0]}}function Iu(i){const e=Math.min(1,Math.max(0,i.transmissionWeight)),t=Math.max(0,i.transmissionDepth);if(e<=0||t<=0||i.thinWalled)return;const A=It(i.transmissionColor,1),a=It(i.transmissionScatter),r=aa(A,s=>Math.max(0,-Math.log(Math.max(s,1e-6))/t)),n=aa(a,(s,o)=>Ot(r,o)*s);return{anisotropy:Math.min(.999,Math.max(-.999,i.transmissionScatterAnisotropy)),extinction:r,scattering:n}}function Pu(i){if(Math.min(1,Math.max(0,i.subsurfaceWeight))<=0||i.thinWalled)return;const t=Math.max(i.subsurfaceRadius,.001),A=It(i.subsurfaceRadiusScale,1),a=It(i.subsurfaceColor),r=Math.min(.999,Math.max(-.999,i.subsurfaceAnisotropy)),n=aa(A,o=>1/Math.max(t*o,.001)),s=aa(a,(o,l)=>{const c=4.09712+4.20863*o-Math.sqrt(9.59217+41.6808*o+17.7126*o*o),f=c*c,p=Math.min(1,Math.max(0,(1-f)/(1-r*f)));return Ot(n,l)*p});return{anisotropy:r,extinction:n,scattering:s}}function Su(i,e,t){const A=e?Math.min(1,Math.max(0,i.transmissionWeight)):0,a=t?(1-A)*Math.min(1,Math.max(0,i.subsurfaceWeight)):0,r=A+a;if(r<=0)return;const n=A/r,s=a/r,o=cs(f=>{const p=e?Ot(e.extinction,f)-Ot(e.scattering,f):0,h=t?Ot(t.extinction,f)-Ot(t.scattering,f):0,u=p*n+h*s,d=((e?Ot(e.scattering,f):0)||0)*n+((t?Ot(t.scattering,f):0)||0)*s;return Math.max(0,u+d)}),l=cs(f=>((e?Ot(e.scattering,f):0)||0)*n+((t?Ot(t.scattering,f):0)||0)*s);return{anisotropy:(e?.anisotropy||0)*n+(t?.anisotropy||0)*s,extinction:o,scattering:l}}function Du(i){return Su(i,Iu(i),Pu(i))??Mu()}function ml(i){const e=i.map(Du);return{color:i.map(t=>[t.baseColor[0],t.baseColor[1],t.baseColor[2]]),roughness:i.map(t=>t.specularAnisotropyModel==="gltf"?as(t.specularRoughness,.3):t.specularRoughness),emission:i.map(EA),metallic:i.map(t=>t.baseMetalness),ior:i.map(t=>t.specularIor),dispersion:i.map(t=>t.transmissionDispersionScale),thin:i.map(t=>Number(t.thinWalled)),bevelSize:i.map(t=>t.bevelSize),transmission:i.map(t=>t.transmissionWeight),anisotropy:i.map(t=>t.specularAnisotropyModel==="gltf"?as(t.specularAnisotropy,0):t.specularAnisotropy),specularAnisotropyModel:i.map(t=>nn(t.specularAnisotropyModel)),thinFilmThickness:i.map(t=>rs(t.thinFilmThickness,.5)),thinFilmThicknessMinimum:i.map(t=>rs(t.thinFilmThicknessMinimum,0)),thinFilmMapChannel:i.map(t=>sn(t.thinFilmMapChannel)),thinFilmIor:i.map(t=>t.thinFilmIor),normalScale:i.map(t=>t.normalScale),mapAlphaUsage:i.map(t=>Pi[t.mapAlphaUsage]),type:i.map(t=>t.shadowCatcher?cn:t.unlit?fn:0),mediumType:i.map(t=>Number(un(t))),specularAnisotropyRotation:i.map(t=>Number.isFinite(t.specularAnisotropyRotation)?t.specularAnisotropyRotation:0),coatAnisotropyRotation:i.map(t=>Number.isFinite(t.coatAnisotropyRotation)?t.coatAnisotropyRotation:0),coatNormalScale:i.map(t=>t.coatNormalScale),uvProjection:i.map(t=>xt[t.uvProjection]||0),uvScale:i.map(t=>t.uvProjectionScale||[1,1]),displacementUvProjection:i.map(t=>xt[t.displacementUvProjection]||0),displacementUvProjectionScale:i.map(t=>t.displacementUvProjectionScale||1),displacementBias:i.map(t=>t.displacementBias),displacementStepSize:i.map(t=>Number.isFinite(t.displacementStepSize)&&t.displacementStepSize>0?t.displacementStepSize:0),alpha:i.map(t=>t.opacity),alphaMode:i.map(t=>si[pA(t)]),alphaCutoff:i.map(t=>Math.max(0,t.alphaCutoff)),doubleSided:i.map(t=>Number(t.doubleSided)),baseWeight:i.map(t=>t.baseWeight),baseDiffuseRoughness:i.map(t=>t.baseDiffuseRoughness),specularWeight:i.map(t=>t.specularWeight),specularColor:i.map(t=>It(t.specularColor,1)),transmissionColor:i.map(t=>It(t.transmissionColor,1)),transmissionDepth:i.map(t=>Math.max(0,t.transmissionDepth)),transmissionScatter:i.map(t=>It(t.transmissionScatter)),transmissionScatterAnisotropy:i.map(t=>t.transmissionScatterAnisotropy),subsurfaceWeight:i.map(t=>t.subsurfaceWeight),subsurfaceColor:i.map(t=>It(t.subsurfaceColor)),subsurfaceRadius:i.map(t=>Math.max(0,t.subsurfaceRadius)),subsurfaceRadiusScale:i.map(t=>It(t.subsurfaceRadiusScale)),subsurfaceScatterAnisotropy:i.map(t=>t.subsurfaceAnisotropy),fuzzWeight:i.map(t=>t.fuzzWeight),fuzzColor:i.map(t=>It(t.fuzzColor,1)),fuzzRoughness:i.map(t=>t.fuzzRoughness),coatWeight:i.map(t=>t.coatWeight),coatColor:i.map(t=>It(t.coatColor,1)),coatRoughness:i.map(t=>t.coatRoughness),coatAnisotropy:i.map(t=>t.coatAnisotropy),coatIor:i.map(t=>t.coatIor),coatDarkening:i.map(t=>t.coatDarkening),thinFilmWeight:i.map(t=>t.thinFilmWeight),dispersionAbbeNumber:i.map(t=>t.transmissionDispersionAbbeNumber),mediumExtinction:e.map(t=>t.extinction),mediumScattering:e.map(t=>t.scattering),mediumAnisotropy:e.map(t=>t.anisotropy)}}function gl(i){return{...ml(i),diffuseMapIndex:[],alphaMapIndex:[],normalMapIndex:[],emissiveMapIndex:[],metallicRoughnessMapIndex:[],roughnessMapIndex:[],metalnessMapIndex:[],transmissionMapIndex:[],thinFilmMapIndex:[],displacementMapIndex:[],coatWeightMapIndex:[],coatRoughnessMapIndex:[],fuzzColorMapIndex:[],fuzzRoughnessMapIndex:[],specularWeightMapIndex:[],specularColorMapIndex:[],anisotropyMapIndex:[],coatNormalMapIndex:[],mapInfo:[],mapTransform:[],mapWrap:[],mapUvChannel:[],mapColorLinear:[]}}function dn(i,e){const t=ml(e);i.color=t.color,i.roughness=t.roughness,i.emission=t.emission,i.metallic=t.metallic,i.ior=t.ior,i.dispersion=t.dispersion,i.thin=t.thin,i.bevelSize=t.bevelSize,i.transmission=t.transmission,i.anisotropy=t.anisotropy,i.specularAnisotropyModel=t.specularAnisotropyModel,i.thinFilmThickness=t.thinFilmThickness,i.thinFilmThicknessMinimum=t.thinFilmThicknessMinimum,i.thinFilmMapChannel=t.thinFilmMapChannel,i.thinFilmIor=t.thinFilmIor,i.normalScale=t.normalScale,i.mapAlphaUsage=t.mapAlphaUsage,i.type=t.type,i.mediumType=t.mediumType,i.specularAnisotropyRotation=t.specularAnisotropyRotation,i.coatAnisotropyRotation=t.coatAnisotropyRotation,i.coatNormalScale=t.coatNormalScale,i.uvProjection=t.uvProjection,i.uvScale=t.uvScale,i.displacementUvProjection=t.displacementUvProjection,i.displacementUvProjectionScale=t.displacementUvProjectionScale,i.displacementStepSize=t.displacementStepSize,i.alpha=t.alpha,i.alphaMode=t.alphaMode,i.alphaCutoff=t.alphaCutoff,i.doubleSided=t.doubleSided,i.baseWeight=t.baseWeight,i.baseDiffuseRoughness=t.baseDiffuseRoughness,i.specularWeight=t.specularWeight,i.specularColor=t.specularColor,i.transmissionColor=t.transmissionColor,i.transmissionDepth=t.transmissionDepth,i.transmissionScatter=t.transmissionScatter,i.transmissionScatterAnisotropy=t.transmissionScatterAnisotropy,i.subsurfaceWeight=t.subsurfaceWeight,i.subsurfaceColor=t.subsurfaceColor,i.subsurfaceRadius=t.subsurfaceRadius,i.subsurfaceRadiusScale=t.subsurfaceRadiusScale,i.subsurfaceScatterAnisotropy=t.subsurfaceScatterAnisotropy,i.fuzzWeight=t.fuzzWeight,i.fuzzColor=t.fuzzColor,i.fuzzRoughness=t.fuzzRoughness,i.coatWeight=t.coatWeight,i.coatColor=t.coatColor,i.coatRoughness=t.coatRoughness,i.coatAnisotropy=t.coatAnisotropy,i.coatIor=t.coatIor,i.coatDarkening=t.coatDarkening,i.thinFilmWeight=t.thinFilmWeight,i.dispersionAbbeNumber=t.dispersionAbbeNumber,i.mediumExtinction=t.mediumExtinction,i.mediumScattering=t.mediumScattering,i.mediumAnisotropy=t.mediumAnisotropy}const Tu={f32:1,vec2f:2,vec3f:3};function Mt(i){const e=[];if(!i)return e;for(const t of i){const A=t;for(let a=0;a<A.length;a++)e.push(A[a])}return e}function rr(i){const e=[];if(!i)return e;for(const t of i)if(t instanceof Float32Array)e.push(t.length===0?0:t.length===1?t[0]:NaN);else for(let A=0;A<t.length;A++)e.push(t[A]);return e}function hn(i){const e={color:Mt(i.color),type:i.type?.flat()??[],roughness:i.roughness?.flat()??[],normalMapIndex:i.normalMapIndex?.flat()??[],normalScale:rr(i.normalScale),metallic:i.metallic?.flat()??[],anisotropy:i.anisotropy?.flat()??[],diffuseMapIndex:i.diffuseMapIndex?.flat()??[],metallicRoughnessMapIndex:i.metallicRoughnessMapIndex?.flat()??[],emission:Mt(i.emission),emissiveMapIndex:i.emissiveMapIndex?.flat()??[],ior:i.ior?.flat()??[],transmission:i.transmission?.flat()??[],mediumType:i.mediumType?.flat()??[],thin:i.thin?.flat()??[],bevelSize:i.bevelSize?.flat()??[],dispersion:i.dispersion?.flat()??[],thinFilmThickness:i.thinFilmThickness?.flat()??[],mapAlphaUsage:i.mapAlphaUsage?.flat()??[],coatWeightMapIndex:i.coatWeightMapIndex?.flat()??[],coatRoughnessMapIndex:i.coatRoughnessMapIndex?.flat()??[],coatNormalMapIndex:i.coatNormalMapIndex?.flat()??[],fuzzColorMapIndex:i.fuzzColorMapIndex?.flat()??[],uvProjection:i.uvProjection?.flat()??[],displacementMapIndex:i.displacementMapIndex?.flat()??[],uvScale:rr(i.uvScale),displacementStepSize:i.displacementStepSize?.flat()??[],displacementBias:i.displacementBias?.flat()??[],displacementUvProjection:i.displacementUvProjection?.flat()??[],displacementUvProjectionScale:i.displacementUvProjectionScale?.flat()??[],alpha:i.alpha?.flat()??[],thinFilmMapIndex:i.thinFilmMapIndex?.flat()??[],thinFilmIor:i.thinFilmIor?.flat()??[],transmissionMapIndex:i.transmissionMapIndex?.flat()??[],baseWeight:i.baseWeight?.flat()??[],baseDiffuseRoughness:i.baseDiffuseRoughness?.flat()??[],specularWeight:i.specularWeight?.flat()??[],subsurfaceWeight:i.subsurfaceWeight?.flat()??[],specularColor:Mt(i.specularColor),fuzzWeight:i.fuzzWeight?.flat()??[],transmissionColor:Mt(i.transmissionColor),transmissionDepth:i.transmissionDepth?.flat()??[],transmissionScatter:Mt(i.transmissionScatter),transmissionScatterAnisotropy:i.transmissionScatterAnisotropy?.flat()??[],subsurfaceColor:Mt(i.subsurfaceColor),subsurfaceRadius:i.subsurfaceRadius?.flat()??[],fuzzColor:Mt(i.fuzzColor),fuzzRoughness:i.fuzzRoughness?.flat()??[],coatColor:Mt(i.coatColor),coatWeight:i.coatWeight?.flat()??[],coatRoughness:i.coatRoughness?.flat()??[],coatAnisotropy:i.coatAnisotropy?.flat()??[],coatIor:i.coatIor?.flat()??[],coatDarkening:i.coatDarkening?.flat()??[],thinFilmWeight:i.thinFilmWeight?.flat()??[],dispersionAbbeNumber:i.dispersionAbbeNumber?.flat()??[],subsurfaceScatterAnisotropy:i.subsurfaceScatterAnisotropy?.flat()??[],fuzzRoughnessMapIndex:i.fuzzRoughnessMapIndex?.flat()??[],subsurfaceRadiusScale:Mt(i.subsurfaceRadiusScale),specularWeightMapIndex:i.specularWeightMapIndex?.flat()??[],mediumExtinction:Mt(i.mediumExtinction),mediumAnisotropy:i.mediumAnisotropy?.flat()??[],mediumScattering:Mt(i.mediumScattering),specularColorMapIndex:i.specularColorMapIndex?.flat()??[],roughnessMapIndex:i.roughnessMapIndex?.flat()??[],metalnessMapIndex:i.metalnessMapIndex?.flat()??[],alphaMapIndex:i.alphaMapIndex?.flat()??[],alphaCutoff:i.alphaCutoff?.flat()??[],doubleSided:i.doubleSided?.flat()??[],alphaMode:i.alphaMode?.flat()??[],anisotropyMapIndex:i.anisotropyMapIndex?.flat()??[],specularAnisotropyRotation:i.specularAnisotropyRotation?.flat()??[],coatNormalScale:rr(i.coatNormalScale),coatAnisotropyRotation:i.coatAnisotropyRotation?.flat()??[],specularAnisotropyModel:i.specularAnisotropyModel?.flat()??[],thinFilmThicknessMinimum:i.thinFilmThicknessMinimum?.flat()??[],thinFilmMapChannel:i.thinFilmMapChannel?.flat()??[]},t=ln().map(a=>({type:a.type,offset:a.offset,values:a.source===null?i.type.map(()=>0):e[a.source]??[]})),A=new Float32Array(i.type.length*Aa);for(let a=0;a<i.type.length;a++)for(const r of t){const n=Tu[r.type];for(let s=0;s<n;s++)A[a*Aa+r.offset/4+s]=Number(r.values[a*n+s]??-1)}return A}const Di=384*1024*1024;function fs(i,e,t){const A=[],a=new Array(i.length),r=i.map((n,s)=>({height:Math.max(1,Math.floor(n.image.height*t)),index:s,width:Math.max(1,Math.floor(n.image.width*t))})).sort((n,s)=>s.height-n.height||s.width-n.width);for(const n of r){let s;for(let o=0;o<A.length&&!s;o++){const l=A[o];for(const c of l.shelves)if(n.height<=c.height&&c.x+n.width<=e){s={height:n.height,index:n.index,width:n.width,layer:o,x:c.x,y:c.y},c.x+=n.width;break}!s&&l.nextY+n.height<=e&&(s={height:n.height,index:n.index,width:n.width,layer:o,x:0,y:l.nextY},l.shelves.push({height:n.height,x:n.width,y:l.nextY}),l.nextY+=n.height)}if(!s){const o=A.length;s={height:n.height,index:n.index,width:n.width,layer:o,x:0,y:0},A.push({nextY:n.height,placements:[],shelves:[{height:n.height,x:n.width,y:0}]})}A[s.layer].placements.push(s),a[n.index]=s}return{pages:A,placements:a}}function Ru(i,e,t={},A=e.some(a=>!!a)){const a=A?8:4;if(!i.length)return{pages:[],placements:[],width:1,height:1,floatStorage:A,bytesPerPixel:a,mapInfo:[],mapTransform:[],mapWrap:[],mapUvChannel:[],mapColorLinear:e,stats:{estimatedBytes:0,height:1,layers:0,packTimeMs:0,scale:1,sourcePixels:0,textureCount:0,width:1}};const r=t.maxTextureArrayLayers??1/0,n=t.maxTextureDimension2D??1/0,s=t.maxTextureArrayBytes??Di,o=i.reduce((B,E)=>B+E.image.width*E.image.height,0),l=i.reduce((B,E)=>Math.max(B,E.image.width,E.image.height),1),c=Math.max(1,Math.floor(Math.sqrt(s/a))),f=Math.max(1,Math.floor(Math.min(l,n,c))),p=f*f*a,h=Math.max(1,Math.min(r,Math.floor(s/p))),u=Math.min(1,f/l);let d=fs(i,f,u),m=u;if(d.pages.length>h){let B=0,E=u,b,x=0;for(let y=0;y<14;y++){const T=(B+E)/2,I=fs(i,f,T);I.pages.length<=h?(B=T,x=T,b=I):E=T}if(!b)throw new Error(`Unable to fit ${i.length} textures into ${h} atlas layers.`);d=b,m=x}const v=d.placements.reduce((B,E)=>Math.max(B,E.x+E.width),1),g=d.placements.reduce((B,E)=>Math.max(B,E.y+E.height),1),w=d.placements.flatMap(B=>{const E=(B.x+.5)/v,b=(B.y+.5)/g;return[Math.max(B.width-1,0)/v,Math.max(B.height-1,0)/g,B.layer+E,b]});return{pages:d.pages,placements:d.placements,width:v,height:g,floatStorage:A,bytesPerPixel:a,mapInfo:w,mapTransform:i.flatMap(B=>[B.uvScale[0],B.uvScale[1],B.uvOffset[0],B.uvOffset[1]]),mapWrap:i.flatMap(B=>[Ki(B.wrapS),Ki(B.wrapT)]),mapUvChannel:i.map(B=>B.uvChannel),mapColorLinear:e,stats:{estimatedBytes:v*g*d.pages.length*a,height:g,layers:d.pages.length,packTimeMs:0,scale:m,sourcePixels:o,textureCount:i.length,width:v}}}class Uu{bufferData;textures;displacementMaps;lightTexturesIndices=[];defines={};atlas;constructor(e,t,A,a={},r){const n=pl(e,cl);this.displacementMaps=n.indices.displacementMap.map(s=>n.textures[s]).filter(s=>!!s),this.textures=n.textures.slice();for(const s of t)s?(this.lightTexturesIndices.push(this.textures.length),this.textures.push(s)):this.lightTexturesIndices.push(-1);this.bufferData=gl(e),this.bufferData.diffuseMapIndex=n.indices.map,this.bufferData.alphaMapIndex=n.indices.alphaMap,this.bufferData.normalMapIndex=n.indices.normalMap,this.bufferData.emissiveMapIndex=n.indices.emissiveMap,this.bufferData.metallicRoughnessMapIndex=n.indices.metallicRoughnessMap,this.bufferData.roughnessMapIndex=n.indices.roughnessMap,this.bufferData.metalnessMapIndex=n.indices.metalnessMap,this.bufferData.transmissionMapIndex=n.indices.transmissionMap,this.bufferData.thinFilmMapIndex=n.indices.thinFilmMap,this.bufferData.displacementMapIndex=n.indices.displacementMap,this.bufferData.coatWeightMapIndex=n.indices.coatWeightMap,this.bufferData.coatRoughnessMapIndex=n.indices.coatRoughnessMap,this.bufferData.fuzzColorMapIndex=n.indices.fuzzColorMap,this.bufferData.fuzzRoughnessMapIndex=n.indices.fuzzRoughnessMap,this.bufferData.specularWeightMapIndex=n.indices.specularWeightMap,this.bufferData.specularColorMapIndex=n.indices.specularColorMap,this.bufferData.anisotropyMapIndex=n.indices.anisotropyMap,this.bufferData.coatNormalMapIndex=n.indices.coatNormalMap,this.atlas=Ru(this.textures,this.textures.map(A),a,r?this.textures.some(r):void 0),this.bufferData.mapInfo=this.atlas.mapInfo,this.bufferData.mapTransform=this.atlas.mapTransform,this.bufferData.mapWrap=this.atlas.mapWrap,this.bufferData.mapUvChannel=this.atlas.mapUvChannel,this.bufferData.mapColorLinear=this.atlas.mapColorLinear,this.defines={NUM_MAPS:this.textures.length};for(const s of PA)s.define&&(this.defines[s.define]=n.indices[s.property].filter(o=>o>=0).length)}repackParams(e){dn(this.bufferData,e)}getBufferArray(){return hn(this.bufferData)}}function Qa(i){return i.length}function Qi(i,e){return i[e]}function us(i){const e=Math.floor(i),t=i-e;return e+ +(t>.5||t===.5&&e%2===1)}function pn(i){const e=i<0||Object.is(i,-0)?32768:0,t=Math.abs(i);if(Number.isNaN(t))return 32256;if(t>=65520)return e|31744;if(t<2**-14)return e|us(t*2**24);const A=Math.floor(Math.log2(t));return e|(A+14)*1024+us(t/2**(A-10))}function vl(i,e,t){i[e]=t}function Bl(i,e,t,A,a){const r=A.image;if(!(r.data instanceof Uint8Array||r.data instanceof Uint8ClampedArray)&&!(r.data instanceof Float32Array)&&!(r.data instanceof Int32Array))throw new Error("Material texture data must be Uint8Array, Uint8ClampedArray, Float32Array or Int32Array.");if(!(!a&&i instanceof Uint8Array&&t.width===r.width&&t.height===r.height&&(r.data instanceof Uint8Array&&ds(i,e,t,r.data,r.width,r.height,A.flipY)||r.data instanceof Uint8ClampedArray&&ds(i,e,t,r.data,r.width,r.height,A.flipY))))return i instanceof Uint16Array,hs(i,e,t,A,a)}function ds(i,e,t,A,a,r,n){if(Qa(A)!==a*r*4)throw new Error("Material texture RGBA source length does not match its dimensions.");if(A.buffer===i.buffer)return!1;const s=a*4;for(let o=0;o<t.height;o++){const l=n?r-o-1:o;i.set(A.subarray(l*s,(l+1)*s),((t.y+o)*e+t.x)*4)}return!0}function hs(i,e,t,A,a){const r=A.image;return r.data instanceof Uint8Array||r.data instanceof Uint8ClampedArray?FA(i,e,t,r.data,r.width,r.height,A.flipY,a,255):(r.data instanceof Float32Array,FA(i,e,t,r.data,r.width,r.height,A.flipY,a,1))}function FA(i,e,t,A,a,r,n,s,o){if(Qa(A)!==a*r*4)throw new Error("Material texture RGBA source length does not match its dimensions.");for(let l=0;l<t.height;l++){let c=Math.min(r-1,Math.floor((l+.5)*r/t.height));n&&(c=r-1-c);for(let f=0;f<t.width;f++){const p=Math.min(a-1,Math.floor((f+.5)*a/t.width)),h=(c*a+p)*4,u=((t.y+l)*e+t.x+f)*4;for(let d=0;d<4;d++){const m=Qi(A,h+d);vl(i,u+d,s?pn(m/o):m)}}}}function hi(i=300,e=150,t=!1){if(!t&&typeof document<"u"){const A=document.createElement("canvas");return A.width=i,A.height=e,A}if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(i,e);throw new Error("Canvas creation requires document or OffscreenCanvas.")}function he(i,...e){return i.reduce((t,A,a)=>t+(a?String(e[a-1]??""):"")+A,"")}function SA(i){return typeof i=="string"&&(i={main:i}),{defines:i.defines||{},uniforms:i.uniforms||{},main:i.main||"",functions:i.functions||[]}}class M{static uniform(e,t){return{type:e,value:t}}static arrayUniform(e,t,A){return{type:e,len:t,value:A,array:!0}}}class ut{name;outputs;outputTypes;defines;uniforms;functions;main;parallelCompile=!1;constructor(e){const t=e.includes||[];this.name=e.name||"",this.outputs=e.outputs||["color"],this.outputTypes=e.outputTypes??{},this.defines=Object.assign({},...t.map(A=>A.defines),e.defines||{}),this.uniforms=Object.assign({},...t.map(A=>A.uniforms),e.uniforms||{}),this.functions=t.flatMap(A=>A.functions||[]),this.main=e.main}}const ee={FLOAT:5126,HALF_FLOAT:5131,UNSIGNED_BYTE:5121,LINEAR:9729,NEAREST:9728,CLAMP_TO_EDGE:33071,TEXTURE_2D:3553,TEXTURE_2D_ARRAY:35866};function YA(i){return!!i&&typeof i=="object"&&"data"in i}class Te{_source;width=1;height=1;target=ee.TEXTURE_2D;_options;_texture;_dirty=!0;_allocated=!1;constructor(e={}){this._options=e,this.source=e.source,this.width=e.width||1,this.height=e.height||1}get storageType(){return this._options.type??ee.UNSIGNED_BYTE}get isByteEncoded(){return(this._options.type??ee.UNSIGNED_BYTE)===ee.UNSIGNED_BYTE}getMemoryBytes(){if(!this._allocated)return 0;const e=this._options.type===ee.FLOAT?4:this._options.type===ee.HALF_FLOAT?2:1;return this.width*this.height*4*e}get source(){return this._source}set source(e){this._source!==e&&(this._source=e,this._dirty=!0,this._allocated=!1)}dirty(){this._dirty=!0}resize(e,t){(this.width!==e||this.height!==t)&&(this.width=e,this.height=t,this._dirty=!0,this._allocated=!1)}ensureStorage(e,t,A,a=this._options){const r=(this._options.type??ee.UNSIGNED_BYTE)!==(a.type??this._options.type??ee.UNSIGNED_BYTE)||this._options.sRGB!==(a.sRGB??this._options.sRGB);if(this._options={...this._options,...a},r&&(this._dirty=!0,this._allocated=!1),this.resize(Math.max(1,t),Math.max(1,A)),this._ensureTexture(e),!this._allocated||this._dirty){this._bindAndConfigure(e);const{internalFormat:n,format:s,type:o}=this._format(e);e.texImage2D(e.TEXTURE_2D,0,n,this.width,this.height,0,s,o,null),this._allocated=!0,this._dirty=!1}return this}bind(e,t){this._ensureTexture(e),e.activeTexture(e.TEXTURE0+t),this._bindAndConfigure(e),(this._dirty||!this._allocated)&&this._upload(e)}updateDataRange(e,t,A,a){if(!a)return;const r=this.source;if(!YA(r)||A<0||a<0||A%t.BYTES_PER_ELEMENT||a%t.BYTES_PER_ELEMENT||A+a>t.byteLength||A+a>r.data.byteLength)throw new RangeError("Invalid data texture byte range");if(r.data.set(t.subarray(A/t.BYTES_PER_ELEMENT,(A+a)/t.BYTES_PER_ELEMENT),A/r.data.BYTES_PER_ELEMENT),this._ensureTexture(e),this._bindAndConfigure(e),this._dirty||!this._allocated){this._upload(e);return}const n=r.data.length/(r.width*r.height),s=r.width*n*r.data.BYTES_PER_ELEMENT,o=Math.floor(A/s),l=Math.ceil((A+a)/s),{format:c,type:f}=this._format(e,n);e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,this._options.flipY?1:0),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,this._options.premultiplyAlpha?1:0),e.texSubImage2D(e.TEXTURE_2D,0,0,o,r.width,l-o,c,f,r.data.subarray(o*r.width*n,l*r.width*n))}getWebGLTexture(e){return this._ensureTexture(e),this._texture}dispose(e){this._texture&&e.deleteTexture(this._texture),this._texture=void 0,this._allocated=!1,this._dirty=!0}_ensureTexture(e){this._texture||(this._texture=e.createTexture(),this._dirty=!0,this._allocated=!1)}_bindAndConfigure(e){e.bindTexture(e.TEXTURE_2D,this._texture),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,this._options.minFilter||e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,this._options.magFilter||e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,this._options.wrapS||e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,this._options.wrapT||e.CLAMP_TO_EDGE)}_format(e,t=4){const A=this._options.type||e.UNSIGNED_BYTE;if(A===e.UNSIGNED_INT)return{type:A,format:e.RGBA_INTEGER,internalFormat:e.RGBA32UI};const a=[e.RED,e.RG,e.RGB,e.RGBA],r=[e.R32F,e.RG32F,e.RGB32F,e.RGBA32F],n=[e.R16F,e.RG16F,e.RGB16F,e.RGBA16F];return{type:A,format:a[t-1],internalFormat:A===e.FLOAT?r[t-1]:A===e.HALF_FLOAT?n[t-1]:this._options.sRGB?e.SRGB8_ALPHA8:e.RGBA8}}_upload(e){const t=this.source,A=t&&YA(t)?t.data.byteLength/t.data.BYTES_PER_ELEMENT/(t.width*t.height):4,{internalFormat:a,format:r,type:n}=this._format(e,A);e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,this._options.flipY?1:0),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,this._options.premultiplyAlpha?1:0),t&&YA(t)?(this.width=t.width,this.height=t.height,e.texImage2D(e.TEXTURE_2D,0,a,t.width,t.height,0,r,n,t.data)):t&&!Array.isArray(t)?(this.width=t.width,this.height=t.height,e.texImage2D(e.TEXTURE_2D,0,a,r,n,t)):e.texImage2D(e.TEXTURE_2D,0,a,this.width,this.height,0,r,n,null),this._options.useMipmap&&e.generateMipmap(e.TEXTURE_2D),this._dirty=!1,this._allocated=!0}}class ps extends Te{target=ee.TEXTURE_2D_ARRAY;get flipYArray(){return this._options.flipYArray||[]}_bindAndConfigure(e){e.bindTexture(e.TEXTURE_2D_ARRAY,this._texture),e.texParameteri(e.TEXTURE_2D_ARRAY,e.TEXTURE_MIN_FILTER,this._options.minFilter||e.LINEAR),e.texParameteri(e.TEXTURE_2D_ARRAY,e.TEXTURE_MAG_FILTER,this._options.magFilter||e.LINEAR),e.texParameteri(e.TEXTURE_2D_ARRAY,e.TEXTURE_WRAP_S,this._options.wrapS||e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D_ARRAY,e.TEXTURE_WRAP_T,this._options.wrapT||e.CLAMP_TO_EDGE)}_upload(e){const t=this.source||[],A=Math.max(1,t.length),a=e.getParameter(e.MAX_TEXTURE_SIZE),r=e.getParameter(e.MAX_ARRAY_TEXTURE_LAYERS);if(this.width>a||this.height>a||A>r)throw new Error(`Texture array ${this.width}x${this.height}x${A} exceeds WebGL limits ${a}x${a}x${r}.`);const n=this.storageType,s=n===e.HALF_FLOAT?e.RGBA16F:n===e.FLOAT?e.RGBA32F:this._options.sRGB?e.SRGB8_ALPHA8:e.RGBA8;for(;e.getError()!==e.NO_ERROR;);e.texImage3D(e.TEXTURE_2D_ARRAY,0,s,this.width,this.height,A,0,e.RGBA,n,null);const o=e.getError();if(o!==e.NO_ERROR)throw new Error(`WebGL could not allocate texture array ${this.width}x${this.height}x${A} (error 0x${o.toString(16)}).`);t.forEach((l,c)=>{e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,this._options.flipYArray?.[c]??this._options.flipY?1:0),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,0),e.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,c,l.width,l.height,1,e.RGBA,n,YA(l)?l.data:l);const f=e.getError();if(f!==e.NO_ERROR)throw new Error(`WebGL could not upload texture array layer ${c} (error 0x${f.toString(16)}).`)}),this._dirty=!1,this._allocated=!0}bind(e,t){this._ensureTexture(e),e.activeTexture(e.TEXTURE0+t),this._bindAndConfigure(e),(this._dirty||!this._allocated)&&this._upload(e)}}class ms{shader;uniforms;defines;_programs=new Map;constructor(e){this.shader=e,this.uniforms=Object.fromEntries(Object.entries(e.uniforms).map(([t,A])=>[t,{...A,value:Lu(A.value)}])),this.defines={...e.defines}}set(e,t){if(t===void 0||!this.uniforms[e])return!1;const A=this.uniforms[e].value!==t;return this.uniforms[e].value=t,A}setUniforms(e){Object.entries(e).forEach(([t,A])=>this.set(t,A))}get(e){return this.uniforms[e]?.value}setDefine(e,t){this.defines[e]=t}deleteDefine(e){delete this.defines[e]}getProgram(e){const t={};for(const[n,s]of Object.entries(this.uniforms))gs(s.type)&&s.value&&(t[`${n.toUpperCase()}_ENABLED`]=null);const A={...this.defines,...t},a=JSON.stringify(A);let r=this._programs.get(a);return r||(r=e.createProgram(this.shader,A),this._programs.set(a,r)),r}bind(e){const t=e.gl,A=this.getProgram(e);if(!e.isProgramCompiled(A))return!1;t.useProgram(A);let a=0;for(const[r,n]of Object.entries(this.uniforms)){const s=t.getUniformLocation(A,r);if(s===null)continue;const o=n.value;gs(n.type)?((o||e.emptyTexture).bind(t,a),t.uniform1i(s,a++)):Fu(t,s,n,o)}return!0}}function Lu(i){return Array.isArray(i)?i.slice():i}function gs(i){return i.includes("sampler")}function Ou(i){return i?ArrayBuffer.isView(i)?i:Array.isArray(i)?i.flat(1/0):[i]:[]}function Fu(i,e,t,A){if(A==null)return;const a=Ou(A);if(t.array){t.type==="int"?i.uniform1iv(e,a):t.type==="vec2"?i.uniform2fv(e,a):t.type==="vec3"?i.uniform3fv(e,a):t.type==="vec4"?i.uniform4fv(e,a):i.uniform1fv(e,a);return}switch(t.type){case"bool":case"int":i.uniform1i(e,Number(A));break;case"float":i.uniform1f(e,Number(A));break;case"vec2":i.uniform2fv(e,a);break;case"vec3":i.uniform3fv(e,a);break;case"vec4":i.uniform4fv(e,a);break;case"ivec2":i.uniform2iv(e,a);break;case"ivec3":i.uniform3iv(e,a);break;case"ivec4":i.uniform4iv(e,a);break;case"mat3":i.uniformMatrix3fv(e,!1,a);break;case"mat4":i.uniformMatrix4fv(e,!1,a);break}}const vs=`#version 300 es
precision highp float;
out vec2 v_Texcoord;
void main() {
vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
v_Texcoord = p;
gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;function zu(i,e){const t=Object.entries(e).filter(([,r])=>r!==!1&&r!==void 0).map(([r,n])=>n===null||n===!0?`#define ${r}`:`#define ${r} ${n}`).join(`
`),A=Object.entries(i.uniforms).map(([r,n])=>{const s=n.array&&isNaN(Number(n.len)),o=`uniform ${n.type} ${r}${n.array?`[${n.len}]`:""};`;return s?`#ifdef ${n.len}
${o}
#endif`:o}).join(`
`),a=i.outputs.map((r,n)=>`layout(location=${n}) out highp ${i.outputTypes[r]??"vec4"} out_${r};`).join(`
`);return`#version 300 es
precision highp float;
precision highp int;
precision highp sampler2D;
precision highp sampler2DArray;
precision highp usampler2D;
${t}
${a}
${A}
in vec2 v_Texcoord;
${i.functions.map(r=>r()).join(`
`)}
${i.main}`}class ku{canvas;gl;emptyTexture=new Te;_viewport=[0,0,1,1];_viewportStack=[];_programs=new Set;_parallel;_pendingPrograms=new Map;_programErrors=new Map;_compilationStart=0;_compilationRecords=[];constructor(e){this.canvas=e.canvas;const t=e.canvas.getContext("webgl2",e);if(!t)throw new Error("WebGL 2.0 is required");this.gl=t,t.getExtension("EXT_color_buffer_float"),t.getExtension("OES_texture_float_linear"),this._parallel=e.parallelShaderCompile&&t.getExtension("KHR_parallel_shader_compile")||void 0,this.resize(this.canvas.width,this.canvas.height)}createProgram(e,t){const A=this.gl,a=performance.now();this._compilationRecords.length||(this._compilationStart=a);const r=zu(e,t),n=performance.now()-a,s=vs+r;let o=2166136261;for(let u=0;u<s.length;u++)o=Math.imul(o^s.charCodeAt(u),16777619);const l=performance.now(),c=A.createProgram(),f=!!this._parallel&&e.parallelCompile,p=[],h=(u,d)=>{const m=A.createShader(u);if(p.push(m),A.shaderSource(m,d),A.compileShader(m),!f&&!A.getShaderParameter(m,A.COMPILE_STATUS)){const v=A.getShaderInfoLog(m);throw A.deleteShader(m),new Error(`${e.name||"WebGL shader"}: ${v}
${d}`)}A.attachShader(c,m),f||A.deleteShader(m)};if(h(A.VERTEX_SHADER,vs),h(A.FRAGMENT_SHADER,r),A.linkProgram(c),f)this._pendingPrograms.set(c,{shader:e,shaders:p});else if(!A.getProgramParameter(c,A.LINK_STATUS))throw new Error(`${e.name||"WebGL program"}: ${A.getProgramInfoLog(c)}`);return this._programs.add(c),this._compilationRecords.push({program:c,label:e.name||"WebGL program",bytes:new TextEncoder().encode(s).byteLength,lines:s.split(`
`).length,fingerprint:(o>>>0).toString(16).padStart(8,"0"),startedAt:a,generationMs:n,creationMs:performance.now()-l,completedAt:f?void 0:performance.now()}),c}isProgramCompiled(e){const t=this._programErrors.get(e);if(t)throw t;const A=this._pendingPrograms.get(e);if(!A)return!0;const a=this.gl;if(!a.getProgramParameter(e,this._parallel.COMPLETION_STATUS_KHR))return!1;this._pendingPrograms.delete(e);try{if(!a.getProgramParameter(e,a.LINK_STATUS)){const n=A.shaders.filter(o=>!a.getShaderParameter(o,a.COMPILE_STATUS)).map(o=>`${a.getShaderInfoLog(o)}
${a.getShaderSource(o)}`).join(`
`),s=new Error(`${A.shader.name||"WebGL program"}: ${a.getProgramInfoLog(e)}${n?`
`+n:""}`);throw this._programErrors.set(e,s),s}}finally{A.shaders.forEach(n=>a.deleteShader(n))}const r=this._compilationRecords.find(n=>n.program===e);return r&&(r.completedAt=performance.now()),!0}getShaderCompilationDiagnostics(){const e=performance.now(),t=this._compilationRecords;for(const o of t)o.completedAt===void 0&&this.isProgramCompiled(o.program)&&(o.completedAt=e);const A=t.filter(o=>o.completedAt!==void 0),a=A.length===t.length&&t.length>0?Math.max(...A.map(o=>o.completedAt))-this._compilationStart:void 0,r=t.flatMap(o=>[{time:o.startedAt,change:1},...o.completedAt===void 0?[]:[{time:o.completedAt,change:-1}]]).sort((o,l)=>o.time-l.time||o.change-l.change);let n=0,s=0;for(const o of r)n+=o.change,s=Math.max(s,n);return{status:A.length===t.length?"ready":"compiling",sourceBytes:t.reduce((o,l)=>o+l.bytes,0),sourceLines:t.reduce((o,l)=>o+l.lines,0),pipelineCount:t.length,completedPipelineCount:A.length,sourceGenerationTimeMs:t.reduce((o,l)=>o+l.generationMs,0),moduleCreationTimeMs:t.reduce((o,l)=>o+l.creationMs,0),modules:t.map(o=>({label:o.label,sourceBytes:o.bytes,sourceLines:o.lines,sourceFingerprint:o.fingerprint})),pipelines:t.map(o=>({label:o.label,entryPoint:"main",firstFrameRequired:!0,status:o.completedAt===void 0?"compiling":"ready",startedAtMs:o.startedAt-this._compilationStart,endedAtMs:o.completedAt===void 0?void 0:o.completedAt-this._compilationStart,durationMs:o.completedAt===void 0?void 0:o.completedAt-o.startedAt})),maximumConcurrentPipelineCount:this._parallel?t.length:Math.min(t.length,1),peakConcurrentPipelineCount:s,pipelineCompilationTimeMs:a,totalTimeMs:a}}isAllProgramCompiled(){for(const e of this._programs)if(!this.isProgramCompiled(e))return!1;return!0}resize(e,t){this.canvas.width=e,this.canvas.height=t,this.setViewport(0,0,e,t)}getWidth(){return this.canvas.width}getHeight(){return this.canvas.height}saveViewport(){this._viewportStack.push([...this._viewport])}restoreViewport(){const e=this._viewportStack.pop();e&&this.setViewport(...e)}setViewport(e,t,A,a){this._viewport=[e,t,A,a],this.gl.viewport(e,t,A,a)}dispose(){this._pendingPrograms.forEach(e=>e.shaders.forEach(t=>this.gl.deleteShader(t))),this._pendingPrograms.clear(),this._programErrors.clear(),this._programs.forEach(e=>this.gl.deleteProgram(e)),this._programs.clear(),this._compilationRecords=[],this.emptyTexture.dispose(this.gl)}}class ra{_frameBuffer;_attachments=[];attach(e){this._attachments=[e]}bind(e,t,A=e.gl.FRAMEBUFFER){const a=e.gl,r=this._attachments.length;t&&(this._attachments=t),t=this._attachments,this._frameBuffer||=a.createFramebuffer(),a.bindFramebuffer(A,this._frameBuffer);for(let n=t.length;n<r;n++)a.framebufferTexture2D(A,a.COLOR_ATTACHMENT0+n,a.TEXTURE_2D,null,0);t.forEach((n,s)=>{n.bind(a,0),a.framebufferTexture2D(A,a.COLOR_ATTACHMENT0+s,a.TEXTURE_2D,n.getWebGLTexture(a),0)}),A!==a.READ_FRAMEBUFFER&&a.drawBuffers(t.map((n,s)=>a.COLOR_ATTACHMENT0+s))}dispose(e){this._frameBuffer&&e.gl.deleteFramebuffer(this._frameBuffer),this._frameBuffer=void 0}}function Nu(i,e){const t=new i.constructor(e);return t.set(i),t}function _i(i){const e=Math.round(Math.log2(Math.sqrt(i))),t=2**e,A=Math.ceil(i/t);return{columnsLog:e,columns:t,rows:A,size:A*t}}function wt(i,e,t){const A=_i(e.length/t);return i.source={data:Nu(e,A.size*t),width:A.columns,height:A.rows},A}const nr={wrapS:ee.CLAMP_TO_EDGE,wrapT:ee.CLAMP_TO_EDGE,type:ee.FLOAT,minFilter:ee.LINEAR,magFilter:ee.LINEAR,flipY:!1,useMipmap:!1},ct={wrapS:ee.CLAMP_TO_EDGE,wrapT:ee.CLAMP_TO_EDGE,minFilter:ee.NEAREST,magFilter:ee.NEAREST,type:ee.FLOAT,flipY:!1,useMipmap:!1};function wl(i,e){return hi(i,e)}function Gu(i,e,t,A,a){const r=a?new Uint16Array(i*e*4):new Uint8Array(i*e*4),n=t.placements.filter(s=>!jt(A[s.index].image));if(n.length){const o=wl(i,e).getContext("2d");if(!o)throw new Error("Unable to create a canvas for the texture atlas.");for(const c of n)El(o,c,A[c.index]);const l=o.getImageData(0,0,i,e).data;for(let c=0;c<l.length;c++)vl(r,c,a?pn(l[c]/255):l[c])}for(const s of t.placements){const o=A[s.index],l=o.image;jt(l)&&Bl(r,i,s,{image:l,flipY:o.flipY},a)}return{data:r,width:i,height:e}}function El(i,e,t){t.flipY?(i.save(),i.translate(e.x,e.y+e.height),i.scale(1,-1),i.drawImage(t.image,0,0,e.width,e.height),i.restore()):i.drawImage(t.image,e.x,e.y,e.width,e.height)}function Hu(i,e,t=!1){const A=performance.now();if(!i.length)return{stats:{estimatedBytes:0,height:1,layers:0,packTimeMs:performance.now()-A,scale:1,sourcePixels:0,textureCount:0,width:1},texture:new ps({width:1,height:1,sRGB:t,source:[],minFilter:ee.LINEAR,magFilter:ee.LINEAR,wrapS:ee.CLAMP_TO_EDGE,wrapT:ee.CLAMP_TO_EDGE})};const a=i.some(c=>jt(c.image)),r=e.width,n=e.height,s=e.floatStorage,o=e.pages.map(c=>{if(a)return Gu(r,n,c,i,s);const f=wl(r,n),p=f.getContext("2d");if(!p)throw new Error("Unable to create a canvas for the texture atlas.");for(const h of c.placements)El(p,h,i[h.index]);return f});return e.stats.scale<.999&&console.warn(`Texture atlas downscaled to ${(e.stats.scale*100).toFixed(1)}% to fit the GPU budget.`),{texture:new ps({width:r,height:n,sRGB:t,type:s?ee.HALF_FLOAT:ee.UNSIGNED_BYTE,source:o,flipY:!1,flipYArray:o.map(()=>!1),minFilter:ee.LINEAR,magFilter:ee.LINEAR,wrapS:ee.CLAMP_TO_EDGE,wrapT:ee.CLAMP_TO_EDGE}),stats:{...e.stats,packTimeMs:performance.now()-A}}}class na{texture;textureAtlasStats;defines={};bufferData;_matBufferTex=new Te(ct);_materialBufferColumnsLog=0;_displacementMaps=[];_lightTexturesIndices=[];constructor(e,t,A={}){const a=performance.now(),r=new Uu(e,t.map(o=>o.type==="RectLight"?o.texture:void 0),o=>{const l=o.image;return Number(o.colorSpace?o.colorSpace==="linear":jt(l)&&!(l.data instanceof Uint8Array)&&!(l.data instanceof Uint8ClampedArray))},A,o=>{const l=o.image;return jt(l)&&!(l.data instanceof Uint8Array)&&!(l.data instanceof Uint8ClampedArray)});if(r.textures.some(o=>IA(o.image)))throw new Error("ProceduralSky is only supported as an environment or background.");const{texture:n,stats:s}=Hu(r.textures,r.atlas);this.texture=n,this.textureAtlasStats={...s,packTimeMs:performance.now()-a},this.bufferData=r.bufferData,this.defines=r.defines,this._displacementMaps=r.displacementMaps,this._lightTexturesIndices=r.lightTexturesIndices,this._updateBuffer()}repackParams(e){dn(this.bufferData,e),this._updateBuffer()}getBufferArray(){return hn(this.bufferData)}getDisplacementMaps(){return this._displacementMaps}getLightTexturesIndices(){return this._lightTexturesIndices}_updateBuffer(){this._materialBufferColumnsLog=wt(this._matBufferTex,this.getBufferArray(),4).columnsLog}setToPass(e){e.setUniform("map",this.texture||null),e.setUniform("mapInfo",this.bufferData.mapInfo),e.setUniform("mapTransform",this.bufferData.mapTransform),e.setUniform("mapWrap",this.bufferData.mapWrap),e.setUniform("mapUvChannel",this.bufferData.mapUvChannel),e.setUniform("mapColorLinear",this.bufferData.mapColorLinear),e.setUniforms({materialBuffer:this._matBufferTex,materialBufferColumns:this._materialBufferColumnsLog})}dispose(e){this.texture?.dispose(e),this._matBufferTex.dispose(e)}}class xi extends Error{constructor(e){super(e),this.name="BvhWorkerUnavailableError"}}class mA extends Error{constructor(){super("BVH worker pool was disposed."),this.name="BvhWorkerDisposedError"}}function mn(i){if(i!=="auto"){if(!Number.isSafeInteger(i)||i<1)throw new RangeError('bvhWorkerCount must be "auto" or a positive safe integer.');return i}const e=typeof navigator>"u"?2:navigator.hardwareConcurrency;return Number.isFinite(e)?Math.max(1,Math.min(4,Math.floor(e)-1)):1}class Wu{worker;nextId=0;pending=new Map;failed=!1;constructor(e){this.worker=e,e.onmessage=({data:t})=>{const A=this.pending.get(t.id);A&&(this.pending.delete(t.id),"error"in t?A.reject(new Error(t.error)):A.resolve(t.bvh))},e.onerror=t=>{t.preventDefault(),this.fail(new xi(t.message||"BVH worker failed."))},e.onmessageerror=()=>this.fail(new xi("Unable to receive BVH worker result."))}fail(e){this.failed||(this.failed=!0,this.worker.onmessage=this.worker.onerror=this.worker.onmessageerror=null,this.worker.terminate(),this.pending.forEach(t=>t.reject(e)),this.pending.clear())}dispose(){this.fail(new mA)}build(e){if(this.failed)return Promise.reject(new xi("BVH worker is unavailable."));const t=this.nextId++;return new Promise((A,a)=>{this.pending.set(t,{resolve:A,reject:a});try{const r={...e.position,array:e.position.array.slice()},n={...e.indices,array:e.indices.array.slice()},s=e.normal&&{...e.normal,array:e.normal.array.slice()},o=e.trianglesDisplacement?.slice(),l=[r.array.buffer,n.array.buffer];s&&l.push(s.array.buffer),o&&l.push(o.buffer),this.worker.postMessage({...e,id:t,position:r,indices:n,normal:s,trianglesDisplacement:o},l)}catch(r){this.fail(new xi(r instanceof Error?r.message:String(r)))}})}}class gn{size;slots=[];queue=[];stopped;constructor(e){this.size=e,mn(e)}build(e){return this.stopped?Promise.reject(this.stopped):new Promise((t,A)=>{this.queue.push({request:e,resolve:t,reject:A}),this.dispatch()})}stop(e){this.stopped??=e;for(const t of this.queue.splice(0))t.reject(this.stopped)}dispatch(){for(;this.queue.length&&!this.stopped;){let e=this.slots.find(a=>!a.busy);if(!e){if(this.slots.length>=this.size)return;try{e={client:new Wu(new Worker(new URL(""+new URL("bvh.worker-DcfjwtHk.js",import.meta.url).href,import.meta.url),{type:"module"})),busy:!1},this.slots.push(e)}catch(a){this.stop(new xi(a instanceof Error?a.message:String(a)));return}}const t=this.queue.shift(),A=e;A.busy=!0,A.client.build(t.request).then(t.resolve,a=>{a instanceof xi&&this.stop(a),t.reject(a)}).finally(()=>{A.busy=!1,this.dispatch()})}}dispose(){this.stop(new mA);for(const e of this.slots)e.client.dispose();this.slots=[]}}function Bs(){return typeof Worker<"u"}async function ju(i,e=0,t,A="builtin",a="bvh2",r=!1,n){const s=n??new gn(1);try{return await s.build({position:i.position,normal:t?i.normal:void 0,indices:i.indices,dynamic:i.dynamic,builder:A,layout:a,displacementScale:e,trianglesDisplacement:t,spatialSplits:r})}finally{n||s.dispose()}}const nA=["webgpu","webgl"],Ma=[{key:"bvhBuilder",default:"builtin",kind:"bvh",backends:nA,parameter:"builder"},{key:"bvhLayout",default:"bvh2",kind:"bvh",backends:nA,parameter:"layout"},{key:"bvhSpatialSplits",default:!1,kind:"bvh",backends:nA,parameter:"spatialSplits"},{key:"bvhWorkerCount",default:"auto",kind:"bvh",backends:nA,normalize:mn},{key:"textureAtlasBudgetBytes",default:Di,kind:"resources",backends:nA}];function Yu(i){return Object.fromEntries(Ma.flatMap(e=>"parameter"in e?[[e.parameter,i[e.key]]]:[]))}function Vu(i,e){return JSON.stringify(Ma.filter(t=>t.kind===e&&!("normalize"in t)).map(t=>i[t.key]))}function qu(i){const e=Ma.find(t=>"normalize"in t);return"normalize"in e?e.normalize(i.bvhWorkerCount):1}function sr(i){const e=Ma.find(t=>t.kind==="resources");return i[e.key]}const Ju={maxStorageBuffersPerShaderStage:8,maxStorageBufferBindingSize:12288,maxBufferSize:12288,maxSampledTexturesPerShaderStage:8,maxStorageTexturesPerShaderStage:1,maxComputeWorkgroupStorageSize:0,maxComputeWorkgroupSizeX:64,maxComputeWorkgroupSizeY:16,maxComputeInvocationsPerWorkgroup:256,maxBindGroups:4};function ws(i){const e=[];for(const[t,A]of Object.entries(Ju)){const a=i.limits[t];(typeof a!="number"||a<A)&&e.push(`${t}: requires ${A}, actual ${a}`)}if(e.length)throw new Error(`GPUDevice does not meet MuTracer requirements:
${e.join(`
`)}`)}function Es(i){const e=[];for(const a of["timestamp-query","bgra8unorm-storage","shader-f16","subgroups","texture-formats-tier1","texture-formats-tier2","float32-filterable"])i.features.has(a)&&e.push(a);const t=i.limits,A={};for(const a of["maxComputeWorkgroupStorageSize","maxComputeWorkgroupsPerDimension","maxStorageBufferBindingSize","maxStorageBuffersPerShaderStage","maxSampledTexturesPerShaderStage","maxStorageTexturesPerShaderStage","maxBufferSize","maxTextureArrayLayers","maxComputeWorkgroupSizeX","maxComputeInvocationsPerWorkgroup"])A[a]=t[a];return{requiredFeatures:e,requiredLimits:A}}const bl=65536,sa=10;function _l(i){for(const[e,t]of[["sampling-resource-table","resource_table"],["chromium-experimental-sampling-resource-table","chromium_experimental_resource_table"]])if(i.has(e))return{feature:e,enable:t}}function vn(i,e=0){if(i.limits.maxStorageBuffersPerShaderStage<9)return"Bindless textures require 9 storage buffers per shader stage.";if(e+sa>bl)return"Scene exceeds resource-table slot capacity.";const t=Math.max(1,e)*48;if(t>i.limits.maxStorageBufferBindingSize||t>i.limits.maxBufferSize)return"Texture metadata exceeds device buffer limits."}function yl(i,e){return i.createResourceTable({size:e,label:"Material textures"})}function VA(i,e){i.setResourceTable(e)}function or(i){return{...i,usesResourceTable:!0}}const bs=new WeakMap;function $u(i,e){let t=bs.get(i);return t||(t=Ku(i,e),bs.set(i,t)),t}async function Ku(i,e){const t=vn(i);if(t)return t;if(typeof i.createResourceTable!="function")return"Resource-table API is unavailable.";let A;const a=[],r=[];i.pushErrorScope("validation");let n;try{A=yl(i,3);for(let m=0;m<2;m++){const v=i.createTexture({size:[1,1],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST});a.push(v),i.queue.writeTexture({texture:v},new Uint8Array(m?[0,255,0,255]:[255,0,0,255]),{bytesPerRow:4},[1,1]),A.update(m,v.createView())}A.update(2,i.createSampler({minFilter:"linear",magFilter:"linear"}));const o=i.createShaderModule({code:`enable ${e.enable};
@group(0) @binding(0) var<storage, read_write> result: array<vec4f>;
@compute @workgroup_size(2) fn main(@builtin(local_invocation_index) index: u32) {
  let tex = getResource<texture_2d<f32>>(index);
  let samp = getResource<sampler>(2);
  result[index] = textureSampleLevel(tex, samp, vec2f(0.5), 0.0);
}`}),l=await i.createComputePipelineAsync({layout:"auto",compute:{module:o}}),c=i.createBuffer({size:32,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC}),f=i.createBuffer({size:32,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});r.push(c,f);const p=i.createBindGroup({layout:l.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:c}}]}),h=i.createCommandEncoder(),u=h.beginComputePass();u.setPipeline(l),VA(u,A),u.setBindGroup(0,p),u.dispatchWorkgroups(1),u.end(),h.copyBufferToBuffer(c,0,f,0,32),i.queue.submit([h.finish()]),await f.mapAsync(GPUMapMode.READ);const d=new Float32Array(f.getMappedRange());[1,0,0,1,0,1,0,1].some((m,v)=>d[v]!==m)&&(n="Resource-table sampling probe returned incorrect pixels."),f.unmap()}catch(o){n=o instanceof Error?o.message:String(o)}finally{A?.destroy(),a.forEach(o=>o.destroy()),r.forEach(o=>o.destroy())}const s=await i.popErrorScope();return n??s?.message}function Ur(i){const e=i.clone(),t=i.transform;return e.transform=(t instanceof Float32Array,t.slice()),e}const xl={depthRange:[0,10],positionScale:1,motionScale:16,idComponent:"object"},Bn=["object","instance","material","primitive"];function Wt(i){return eA.find(e=>e===i)}function wn(i){const e=i.depthRange;if(!Array.isArray(e)||e.length!==2||!e.every(Number.isFinite)||e[0]<0||e[1]<=e[0])throw new RangeError("aovDepthRange requires 0 <= near < far");if(!e.map(Math.fround).every(Number.isFinite)||Math.fround(e[1])<=Math.fround(e[0]))throw new RangeError("aovDepthRange must remain finite and increasing in float32");for(const t of[i.positionScale,i.motionScale])if(!Number.isFinite(t)||!Number.isFinite(Math.fround(t))||Math.fround(t)<=0)throw new RangeError("AOV display scales must be finite and positive in float32");if(!Bn.includes(i.idComponent))throw new RangeError("Unknown AOV ID component")}function Xu(i,e,t,A,a,r){wn(a);const n=new Uint32Array(12),s=new Float32Array(n.buffer);return n.set([i,e,t,eA.indexOf(A)]),s.set([...a.depthRange,a.positionScale,a.motionScale],4),n[8]=Bn.indexOf(a.idComponent),n[9]=+r,n}const lt=["webgpu","webgl"],Zu={toneMapping:{key:"toneMapping",default:"agx",kind:"display",backends:lt,group:"toneMapping",parameter:"toneMapping"},toneMappingExposure:{key:"toneMappingExposure",default:1,kind:"display",backends:lt,group:"toneMapping",parameter:"exposure"},contrast:{key:"contrast",default:1,kind:"display",backends:lt,group:"toneMapping",parameter:"contrast"},saturation:{key:"saturation",default:1,kind:"display",backends:lt,group:"toneMapping",parameter:"saturation"},temperature:{key:"temperature",default:0,kind:"display",backends:lt,group:"toneMapping",parameter:"temperature"},tint:{key:"tint",default:0,kind:"display",backends:lt,group:"toneMapping",parameter:"tint"},vignette:{key:"vignette",default:0,kind:"display",backends:lt,group:"toneMapping",parameter:"vignette"},bloomIntensity:{key:"bloomIntensity",default:0,kind:"display",backends:lt,group:"bloom",parameter:"intensity"},bloomThreshold:{key:"bloomThreshold",default:1,kind:"display",backends:lt,group:"bloom",parameter:"threshold"},bloomRadius:{key:"bloomRadius",default:.6,kind:"display",backends:lt,group:"bloom",parameter:"radius"},hdrOutputEnabled:{key:"hdrOutputEnabled",default:!1,kind:"display",backends:["webgpu"],group:"hdr",parameter:"enabled"},aovDepthRange:{key:"aovDepthRange",default:[0,10],kind:"display",backends:lt,group:"aov",parameter:"depthRange"},aovPositionScale:{key:"aovPositionScale",default:1,kind:"display",backends:lt,group:"aov",parameter:"positionScale"},aovMotionScale:{key:"aovMotionScale",default:16,kind:"display",backends:lt,group:"aov",parameter:"motionScale"},aovIdComponent:{key:"aovIdComponent",default:"object",kind:"display",backends:lt,group:"aov",parameter:"idComponent"},channel:{key:"channel",default:"final",kind:"display",backends:lt,group:"channel",parameter:"channel"},shadowCatcherColor:{key:"shadowCatcherColor",default:[0,0,0],kind:"display",backends:lt,group:"catcher",parameter:"color"},shadowCatcherAlpha:{key:"shadowCatcherAlpha",default:1,kind:"display",backends:lt,group:"catcher",parameter:"alpha"}},En=Object.values(Zu);function ed(i){return JSON.stringify(En.map(e=>i[e.key]))}const td=En.filter(i=>i.group!=="channel"&&i.group!=="aov");function id(i){return JSON.stringify(td.map(e=>i[e.key]))}function Ad(i,e){const t=new Map;for(const A of En){let a=t.get(A.group);a||t.set(A.group,a={}),a[A.parameter]=i[A.key]}e.setToneMappingParams(t.get("toneMapping")),e.setBloomParams(t.get("bloom")),e.setHDROutputEnabled?.(t.get("hdr").enabled),e.setOutput(t.get("channel").channel),e.setAovDisplayOptions?.(t.get("aov")),e.setShadowCatcherParams(t.get("catcher").color,t.get("catcher").alpha)}class bn{engine;canvas;toneMapping="agx";toneMappingExposure=1;contrast=1;saturation=1;temperature=0;tint=0;vignette=0;bloomIntensity=0;bloomThreshold=1;bloomRadius=.6;hdrOutputEnabled=!1;channel="final";aovDepthRange=[0,10];aovPositionScale=1;aovMotionScale=16;aovIdComponent="object";shadowCatcherColor=[0,0,0];shadowCatcherAlpha=1;constructor(e,t){this.engine=e,this.canvas=t}static _create(e,t){return new bn(e,t)}setSize(e,t){if(!Number.isFinite(e)||!Number.isFinite(t)||e<1||t<1)throw new Error("Display dimensions must be positive.");e=Math.round(e),t=Math.round(t),this.canvas.width!==e&&(this.canvas.width=e),this.canvas.height!==t&&(this.canvas.height=t)}_filterSettings=new WeakMap;settings=new WeakMap;_configure(e){if(e._engine!==this.engine)throw new Error("Render belongs to another engine.");const t=e._output;if(!t)return;const A=Wt(this.channel);if(!A&&!["final","normal","albedo","shadow","shadowCatcher"].includes(this.channel))throw new RangeError("Unknown display channel");if(A&&!e.aovs.includes(A))throw new Error(`AOV ${A} is not enabled on the selected render`);wn({depthRange:this.aovDepthRange,positionScale:this.aovPositionScale,motionScale:this.aovMotionScale,idComponent:this.aovIdComponent});const a=ed(this),r=id(this),n=this.settings.get(e);n!==a&&(this.settings.set(e,a),n!==void 0&&this._filterSettings.get(e)!==r&&e._displayChanged(),this._filterSettings.set(e,r)),t.activate(),Ad(this,t)}_postProcesses=[];_warnedPostProcess=!1;addPostProcess(e){const t={pass:e};return this._postProcesses.push(t),this.engine.backend==="webgl"&&this.warnPostProcess(),()=>{const A=this._postProcesses.indexOf(t);A>=0&&this._postProcesses.splice(A,1)}}warnPostProcess(){this._warnedPostProcess||(this._warnedPostProcess=!0,console.warn("Display post-processing requires WebGPU; passes are ignored on WebGL."))}compose(e){if(e._engine!==this.engine)throw new Error("Render belongs to another engine.");const t=e._output;if(!t)return;const A=Wt(this.channel);if(!(!A&&!t.presentationComplete)){if(A&&!e.aovs.includes(A))throw new Error(`AOV ${A} is not enabled on the selected render`);if(!(A&&t.aovReady&&!t.aovReady(A))){this._configure(e),t.drawPostProcess(),this._postProcesses.length&&this.engine.backend==="webgl"&&this.warnPostProcess();try{t.applyPostProcesses?.(this._postProcesses.map(a=>a.pass),e)}catch(a){this.engine._notifyError(a)}return t}}}present(e){if(e._engine!==this.engine)throw new Error("Render belongs to another engine.");const t=this.channel==="final"&&e.fallback?e._presentable:e._completeFor(this.channel),A=e.fallback,a=t?e:A&&(this.channel==="final"?A._presentable:A._completeFor(this.channel))?A:void 0;if(!a)return;const r=this.compose(a);if(r)return this.engine._present(r),a}async toBlob(e,t={}){const A=this.compose(e);if(!A)throw new Error("Render has no complete image.");const a=await A.readPresentation(),r=hi(a.width,a.height,"convertToBlob"in this.canvas),n=r.getContext("2d");if(!n)throw new Error("The image encoding context is not available.");const s=new Uint8ClampedArray(a.data.length);for(let o=0;o<s.length;o++)s[o]=Math.round(Math.min(1,Math.max(0,a.data[o]))*255);return n.putImageData(new ImageData(s,a.width,a.height),0,0),"convertToBlob"in r?r.convertToBlob({type:t.type??"image/png",quality:t.quality}):new Promise((o,l)=>r.toBlob(c=>c?o(c):l(new Error("The image could not be encoded")),t.type??"image/png",t.quality))}}class _n{listeners=new Map;on(e,t){let A=this.listeners.get(e);return A||this.listeners.set(e,A=new Set),A.add(t),()=>{A.delete(t)}}emit(e,t){for(const A of[...this.listeners.get(e)??[]])try{A(t)}catch(a){console.error("Event listener failed.",a)}}clear(){this.listeners.clear()}}const qA=new WeakMap;function ad(i,e){const t=He(i),A=qA.get(i)??(t?{builder:t.builder??"builtin",layout:t.layout??"bvh2",spatialSplits:!1}:void 0);return!!A&&A.builder===e.builder&&A.layout===e.layout&&A.spatialSplits===e.spatialSplits}const Lr=new WeakMap;function He(i){return Lr.get(i)}function Yt(i,e,t){e?(Lr.set(i,e),t?qA.set(i,{...t}):qA.delete(i)):(Lr.delete(i),qA.delete(i))}class rd{copies=new WeakMap;geometryVersions=new WeakMap;instanceVersions=new WeakMap;value;copying=new WeakSet;copy(e,t=!1){if(!e||typeof e!="object")return e;const A=e;if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof OffscreenCanvas<"u"&&A instanceof OffscreenCanvas||typeof ImageBitmap<"u"&&A instanceof ImageBitmap){const r=A;let n=this.copies.get(A);n||(n=hi(r.width,r.height),this.copies.set(A,n)),n.width=r.width,n.height=r.height;const s=n.getContext("2d");if(!s)throw new Error("Texture snapshot context is not available.");return s.drawImage(r,0,0),n}if(typeof Node<"u"&&A instanceof Node)return e;if(e instanceof oi&&this.geometryVersions.get(e)===e.version)return this.copies.get(e);if(ArrayBuffer.isView(e)){const r=this.copies.get(A);if(r?.constructor===e.constructor&&r.length===e.length)return r.set(e),r;const n=e.slice();return this.copies.set(A,n),n}if(e instanceof ArrayBuffer)return e.slice(0);let a=this.copies.get(A);if(a||(a=Array.isArray(e)?[]:Object.create(Object.getPrototypeOf(e)),this.copies.set(A,a)),(e instanceof Ho||e instanceof tl)&&(a.aovId=e.aovId),this.copying.has(A))return a;this.copying.add(A);try{for(const r of Object.keys(e))if(e instanceof rt&&(r==="transforms"||r==="colors")){const n=this.instanceVersions.get(e),s=r==="transforms"?e.transformsVersion:e.colorsVersion,o=r==="transforms"?n?.transformsVersion:n?.colorsVersion,l=e[r];(!n||o!==s||n[r]!==l)&&(l?n?.[r]===l&&a[r]?.length===l.length?a[r].set(l):a[r]=l.slice():a[r]=void 0)}else a[r]=e instanceof Nt&&r==="source"?e.source:this.copy(e[r],t)}finally{this.copying.delete(A)}if(Array.isArray(e)&&(a.length=e.length),e instanceof rt&&this.instanceVersions.set(e,{transformsVersion:e.transformsVersion,transforms:e.transforms,colorsVersion:e.colorsVersion,colors:e.colors}),e instanceof oi){this.geometryVersions.set(e,e.version);const r=He(e);(r||!t)&&Yt(a,r),lu(e,a)}return a}mirror(e){return this.copies.get(e)}capture(e,t){if(!this.value||t.meshes==="full")this.value={meshes:this.copy(e.meshes),lights:this.copy(e.lights),background:this.copy(e.background)};else{for(const A of t.transforms)this.copy(A.transform),A instanceof rt&&this.copy(A,!0);for(const A of t.colors)this.copy(A,!0);for(const A of t.geometries)this.copy(A,!0);for(const A of t.materials)this.copy(A);t.lights&&(this.value.lights=this.copy(e.lights)),t.background&&(this.value.background=this.copy(e.background))}return this.value}}function Ze(i){return i instanceof Float64Array?i:i instanceof Float32Array?new Float64Array(i):new Float64Array(i)}function _s(i,e){return i instanceof Float32Array||i instanceof Float64Array,lr(i,e)}function lr(i,e){for(let t=0;t<e.length;t++)We(i,t,e[t])}const JA=1,$A=2,oa=3,nd=0,sd=1,od=2,Ia=1,Pa=2,Sa=3,Da=4;function ld(i,e,t,A,a){Mn(i);const r=i.length,n=6,s=new Float32Array(r*n*4);function o(l,c){for(let f=0;f<3;f++)s[f+l*4]=Q(c,f)}for(let l=0;l<r;l++){const c=i[l],f=c.color,p=c.intensity,h=l*n;o(h,[Q(c.transform,12),Q(c.transform,13),Q(c.transform,14)]),s[h*4+3]=t(l)??1/Math.max(r,1);const u=c.type==="SpotLight"?Qn(c):p;o(h+1,[f[0]*u,f[1]*u,f[2]*u]),s[(h+1)*4+3]=A(l)??(l+1)/r,c.type==="RectLight"?(o(h+2,ca(c,0)),s[(h+2)*4+3]=c.spread,o(h+3,ca(c,1)),s[(h+3)*4+3]=e[l]??-1,o(h+4,[c.spread,yn(c),Sa])):c.type==="SphereLight"?o(h+4,[c.radius,xn(c),Pa]):c.type==="SpotLight"?(o(h+2,la(c)),o(h+3,[Math.cos(c.outerAngle*Math.PI/180),Math.cos(Math.min(c.innerAngle,c.outerAngle)*Math.PI/180),0]),s[(h+3)*4+3]=a(l)??-1,o(h+4,[c.radius,Cn(c),Da])):c.type==="DirectionalLight"&&(o(h+2,la(c)),o(h+4,[0,0,Ia])),o(h+5,Ta(c).x)}return s}function Ta(i){const e=Ze(i.transform),t=(s,o)=>{const l=Math.hypot(Q(s,0),Q(s,1),Q(s,2));return l>1e-12?[Q(s,0)/l,Q(s,1)/l,Q(s,2)/l]:o},A=t([Q(e,8),Q(e,9),Q(e,10)],[0,0,1]),a=Q(e,0)*Q(A,0)+Q(e,1)*Q(A,1)+Q(e,2)*Q(A,2);let r=[Q(e,0)-a*Q(A,0),Q(e,1)-a*Q(A,1),Q(e,2)-a*Q(A,2)];Math.hypot(...r)<=1e-12&&(r=Math.abs(Q(A,1))<.99?[Q(A,2),0,-Q(A,0)]:[1,0,0]),r=t(r,[1,0,0]);const n=[Q(A,1)*Q(r,2)-Q(A,2)*Q(r,1),Q(A,2)*Q(r,0)-Q(A,0)*Q(r,2),Q(A,0)*Q(r,1)-Q(A,1)*Q(r,0)];return{x:r,y:n,direction:[-Q(A,0)||0,-Q(A,1)||0,-Q(A,2)||0]}}function la(i){return Ta(i).direction}function ca(i,e){const t=Ta(i),A=e?t.y:t.x,r=Ze(i.size)[e]*(e?-1:1);return[Q(A,0)*r,Q(A,1)*r,Q(A,2)*r]}function yn(i){const e=Ze(i.size);return e[0]*e[1]}function xn(i){return 4*Math.PI*i.radius**2}function Cn(i){return 4*Math.PI*i.radius**2}function Qn(i){return i.radius===0?i.intensity:i.intensity/(Math.PI*i.radius**2)}function ys(i){const e=Math.cos(i.outerAngle*Math.PI/180);return .5*(1-.5*(Math.cos(Math.min(i.innerAngle,i.outerAngle)*Math.PI/180)+e))}const xs=new WeakSet;function Mn(i,e){for(const t of i){if(t.type==="EnvironmentLight")continue;let A=!1;const a=(r,n,s,o)=>{const l=Math.min(s,Math.max(n,Number.isFinite(r)?r:o));return A||=!Object.is(l,r),l};switch(t.type){case"AmbientLight":sA(t,a);break;case"DirectionalLight":sA(t,a);break;case"RectLight":sA(t,a);break;case"SphereLight":sA(t,a);break;case"SpotLight":sA(t,a);break}if(t.type!=="AmbientLight"){const r=t.transform;A=(r instanceof Float32Array,Cs(r)||A)}if(t.type==="RectLight"){const r=t.size;r instanceof Float32Array,r[0]=a(r[0],0,Number.MAX_VALUE,1),r[1]=a(r[1],0,Number.MAX_VALUE,1),t.spread=a(t.spread,0,1,1)}if(t.type==="SphereLight"&&(t.radius=a(t.radius,0,Number.MAX_VALUE,1)),t.type==="SpotLight"&&(t.radius=a(t.radius,0,Number.MAX_VALUE,.01)),t.type==="SpotLight"&&(t.outerAngle=a(t.outerAngle,Number.EPSILON,180,45),t.innerAngle=a(t.innerAngle,0,t.outerAngle,30)),A&&!xs.has(t)){xs.add(t);const r=new Error(`Invalid ${t.type} values were clamped.`);console.warn(r.message),e?.(r)}}}function sA(i,e){i.intensity=e(i.intensity,0,Number.MAX_VALUE,1),i.color[0]=e(i.color[0],0,Number.MAX_VALUE,1),i.color[1]=e(i.color[1],0,Number.MAX_VALUE,1),i.color[2]=e(i.color[2],0,Number.MAX_VALUE,1)}function Cs(i){let e=!1;for(let t=0;t<16;t++)Number.isFinite(Q(i,t))||(We(i,t,t%5===0?1:0),e=!0);return e}function cd(i,e,t=[],A=[],a=[]){return ld(i,e,r=>t[r],r=>A[r],r=>a[r])}class Yi{min;max;constructor(){this.min=new Float64Array([1/0,1/0,1/0]),this.max=new Float64Array([-1/0,-1/0,-1/0])}}class bA{length=0;transforms;colors;bounds;blasIndices;materials;displacement;sourceIndices;bindingSlots=[];bindingIndices;localIndices;view={blasIndex:0,bounds:new Yi,transform:new Float64Array(16),materialsIndices:[0],color:[1,1,1]};constructor(e){this.bindingIndices=new Uint32Array(e),this.localIndices=new Uint32Array(e),this.colors=new Float32Array(e*3),this.transforms=new Float64Array(e*16),this.bounds=new Float32Array(e*6),this.blasIndices=new Uint32Array(e),this.materials=new Int32Array(e),this.displacement=new Float64Array(e),this.sourceIndices=new Uint32Array(e)}copy(){const e=new bA(this.transforms.length/16);return e.length=this.length,e.bindingSlots=this.bindingSlots,e.transforms.set(this.transforms),e.bounds.set(this.bounds),e.colors.set(this.colors),e.blasIndices.set(this.blasIndices),e.materials.set(this.materials),e.displacement.set(this.displacement),e.sourceIndices.set(this.sourceIndices),e.bindingIndices.set(this.bindingIndices),e.localIndices.set(this.localIndices),e}read(e){const t=this.view;t.blasIndex=this.blasIndices[e],t.materialsIndices[0]=this.materials[e],t.displacementScale=this.displacement[e];for(let a=0;a<16;a++)We(t.transform,a,this.transforms[e*16+a]);const A=t.color;A[0]=this.colors[e*3],A[1]=this.colors[e*3+1],A[2]=this.colors[e*3+2];for(let a=0;a<3;a++)We(t.bounds.min,a,this.bounds[e*6+a]),We(t.bounds.max,a,this.bounds[e*6+a+3]);return t}}function Mi(i,e){return Array.isArray(i)?i[e]:i.read(e)}function Cl(i,e){if(yi(i)!==yi(e))return!1;if(!Array.isArray(i)&&!Array.isArray(e)){for(let t=0;t<i.length;t++)if(i.sourceIndices[t]!==e.sourceIndices[t])return!1}return!0}function yi(i){return Array.isArray(i),i.length}function ri(i){return i.instanceData?.count??1}function fa(i,e,t,A=Ze(i.transform)){const a=i.instanceData;if(!a)return en(t,A);const r=a.transforms,n=e*16;for(let s=0;s<4;s++){const o=n+s*4,l=r[o],c=r[o+1],f=r[o+2],p=r[o+3];for(let h=0;h<4;h++)We(t,s*4+h,Q(A,h)*l+Q(A,h+4)*c+Q(A,h+8)*f+Q(A,h+12)*p)}return t}const Qs=new WeakSet;function Ql(i,e,t){const A=i.materialIndex;if(!A)return 0;const a=A.array[e];return A.itemSize===1&&Number.isInteger(a)&&a>=0&&a<t?a:(Qs.has(A.array)||(Qs.add(A.array),console.warn("Invalid geometry.materialIndex; expected itemSize 1 and an index within mesh.materials. Falling back to material 0.")),0)}function Ml(i,e,t,A=0,a=!1){const r=i.vertexCount;if(t.fill(0,A*4,(A+r)*4),!(!i.materialIndex&&!a))for(let n=0;n<r;n++){const s=Ql(i,n,e.length);t[(A+n)*4]=ua(e[s]??0,1)}}function ua(i,e){return Math.round(e*255)+(i<<8)}const cr=[.2126,.7152,.0722];function li(i){return Math.max(i[0]*cr[0]+i[1]*cr[1]+i[2]*cr[2],0)}function Il(i){const e=li(i.color)*i.intensity;if(!(e>0))return 0;if(i.type==="RectLight")return e*Math.PI*Math.max(yn(i),0);if(i.type==="SphereLight")return i.radius===0?e*4*Math.PI:e*Math.PI*Math.max(xn(i),0);if(i.type==="SpotLight"){const t=li(i.color)*Qn(i);return i.radius===0?e*4*Math.PI*ys(i):t*Math.PI*Cn(i)*ys(i)}return e*4*Math.PI}function Pl(i,e=0){const t=new Int32Array(i.length).fill(-1),A=[],a=new Map;i.forEach((n,s)=>{if(n.type!=="SpotLight"||!n.iesProfile)return;let o=a.get(n.iesProfile);o==null&&(o=A.length,a.set(n.iesProfile,o),A.push(n.iesProfile)),t[s]=e+o*(16384/4)});const r=new Float32Array(A.length*128*128);return A.forEach((n,s)=>r.set(n.data,s*128*128)),{data:r,offsets:t,texelCount:r.length/4}}const Ms=new WeakMap;function Sl(i){if(!i?.data||!i.width||!i.height)return 0;const e=Ms.get(i);if(e!==void 0)return e;const{data:t,width:A,height:a}=i,r=gd(t,A,a);return Ms.set(i,r),r}class _A{count=0;sourceTypes=new Uint32Array(0);sourceIndices=new Uint32Array(0);weights=new Float64Array(0);reserve(e){this.count=0,this.weights.length<e&&(this.sourceTypes=new Uint32Array(e),this.sourceIndices=new Uint32Array(e),this.weights=new Float64Array(e))}push(e,t,A){if(!(A>0)||!isFinite(A))return;const a=this.count++;this.sourceTypes[a]=e,this.sourceIndices[a]=t,this.weights[a]=A}}function Dl(i){let e;if(!Array.isArray(i))e=i;else{e=new _A,e.reserve(i.length);for(const h of i)e.push(h.sourceType,h.sourceIndex,h.weight)}const t=e.count;let A=0;for(let h=0;h<t;h++)A+=e.weights[h];if(!t||!(A>0))return{choices:new Uint32Array(4),pmfs:new Float32Array(0),totalWeight:0};const a=new Float32Array(t),r=new Float64Array(t),n=new Uint32Array(t),s=new Uint32Array(t);let o=0,l=0;for(let h=0;h<t;h++)a[h]=e.weights[h]/A,r[h]=a[h]*t,r[h]<1?n[o++]=h:s[l++]=h;const c=new ArrayBuffer(t*16),f=new Float32Array(c),p=new Int32Array(c);for(;o&&l;){const h=n[--o]+0,u=s[--l]+0;f[h*4]=r[h],p[h*4+1]=u,r[u]=r[u]+r[h]-1,r[u]<1?n[o++]=u:s[l++]=u}for(let h=0;h<o;h++){const u=n[h];f[u*4]=1,p[u*4+1]=u}for(let h=0;h<l;h++){const u=s[h];f[u*4]=1,p[u*4+1]=u}for(let h=0;h<t;h++)p[h*4+2]=e.sourceTypes[h],p[h*4+3]=e.sourceIndices[h];return{choices:new Uint32Array(c),pmfs:a,totalWeight:A}}function fd(i,e=new _A){let t=0;for(let A=0;A<i.count;A++)i.sourceTypes[A]===oa&&t++;if(t){e.reserve(i.count-t);for(let A=0;A<i.count;A++)i.sourceTypes[A]!==oa&&e.push(i.sourceTypes[A],i.sourceIndices[A],i.weights[A]);return Dl(e)}}function ud(i,e,t,A){return Ql(i,e[t],A)}function dd(i,e){const t=[],A=[me(),me(),me()],a=[me(),me(),me()],r=me(),n=me(),s=me();for(const{mesh:o,geometry:l,materialIndices:c}of i){const f=[];for(let u=0;u<Math.max(1,c.length);u++){const d=e[c[u]??c[0]??0];f.push(!d||d.shadowCatcher||d.unlit?0:li(EA(d)))}const p=new Float64Array(16),h=Ze(o.transform);for(let u=0;u<ri(o);u++){fa(o,u,p,h);const d=l.indexArray,m=l.position.array,v=l.uv?.array,g=l.uv1?.array??v;for(let w=0;w<St(d);w+=3){const B=ud(l,d,w,c.length),E=c[B]??c[0]??0,b=f[B];if(!(b>1e-8))continue;const x=[$(d,w),$(d,w+1),$(d,w+2)];for(let P=0;P<3;P++){const S=x[P];qe(A[P],m[S*l.position.itemSize],m[S*l.position.itemSize+1],m[S*l.position.itemSize+2]),An(a[P],A[P],p)}$i(r,a[1],a[0]),$i(n,a[2],a[0]),tn(s,r,n);const y=.5*xf(s);if(!(y>1e-10)||!isFinite(y))continue;const T=x.map(P=>v?[v[P*2],v[P*2+1]]:[0,0]),I=x.map(P=>g?[g[P*2],g[P*2+1]]:[0,0]);t.push({p0:Ja(a[0]),p1:Ja(a[1]),p2:Ja(a[2]),uv0:T[0],uv1:T[1],uv2:T[2],secondaryUv0:I[0],secondaryUv1:I[1],secondaryUv2:I[2],materialIndex:E,area:y,samplingLuminance:b,selectionPmf:0})}}}return t}function fr(i,e,t){if(i.buffer===t.buffer){i.set(t,e);return}i[e]=t[0],i[e+1]=t[1],i[e+2]=t[2]}function hd(i,e=new Float32Array(Math.max(i.length,1)*24)){return i.forEach((t,A)=>{const a=A*24;fr(e,a,t.p0),e[a+3]=t.selectionPmf,fr(e,a+4,t.p1),e[a+7]=t.area,fr(e,a+8,t.p2),e[a+11]=t.materialIndex,e[a+12]=t.uv0[0],e[a+13]=t.uv0[1],e[a+14]=t.uv1[0],e[a+15]=t.uv1[1],e[a+16]=t.uv2[0],e[a+17]=t.uv2[1],e[a+18]=t.secondaryUv0[0],e[a+19]=t.secondaryUv0[1],e[a+20]=t.secondaryUv1[0],e[a+21]=t.secondaryUv1[1],e[a+22]=t.secondaryUv2[0],e[a+23]=t.secondaryUv2[1]}),e}const Is=new WeakMap;class Ps{constructor(){Is.set(this,new WeakMap)}_triangles=[];collect(e,t){const A=Is.get(this);this._triangles.length=0;for(const a of e){const{mesh:r,geometry:n,materialIndices:s}=a,o=h=>{const u=t[h];return!!u&&!u.unlit&&!u.shadowCatcher&&li(EA(u))>1e-8},l=r.instanceData?.transformsVersion??0,c=ri(r),f=r.instanceData?.transforms;let p=A.get(r);if(!p||p.geometry!==n||p.version!==n.version||p.instanceVersion!==l||p.instanceCount!==c||p.instanceTransforms!==f||p.indices.length!==s.length||s.some((h,u)=>p.indices[u]!==h||p.activity[u]!==o(h))||md(r,p.matrix))p={geometry:n,version:n.version,instanceVersion:l,instanceCount:c,instanceTransforms:f,matrix:pd(r),indices:s.slice(),activity:s.map(o),triangles:dd([a],t)},A.set(r,p);else for(const h of p.triangles){const u=t[h.materialIndex];h.samplingLuminance=li(EA(u))}for(const h of p.triangles)this._triangles.push(h)}return this._triangles}}function pd(i){return Ze(i.transform)}function md(i,e){const t=Ze(i.transform);for(let A=0;A<t.length;A++)if(!Object.is(t[A],e[A]))return!0;return!1}function gd(i,e,t){return i instanceof Uint8Array||i instanceof Uint8ClampedArray?zA(i,e,t,1/255):(i instanceof Float32Array,zA(i,e,t,1))}function zA(i,e,t,A){const a=Math.max(Math.floor(Qa(i)/(e*t)),1);let r=0;for(let n=0;n<t;n++){const s=Math.sin(Math.PI*(n+.5)/t);for(let o=0;o<e;o++){const l=(n*e+o)*a;r+=li([Qi(i,l)*A,Qi(i,l+Math.min(1,a-1))*A,Qi(i,l+Math.min(2,a-1))*A])*s}}return r*(2*Math.PI*Math.PI)/(e*t)}function Tl(i){let e=1/0,t=1/0,A=1/0,a=-1/0,r=-1/0,n=-1/0;const s=i.position.array,o=i.position.itemSize;for(let l=0;l+2<s.length;l+=o){const c=s[l],f=s[l+1],p=s[l+2];!Number.isFinite(c)||!Number.isFinite(f)||!Number.isFinite(p)||(e=Math.min(e,c),t=Math.min(t,f),A=Math.min(A,p),a=Math.max(a,c),r=Math.max(r,f),n=Math.max(n,p))}return[es(e,t,A),es(a,r,n)]}function In(i){const e=He(i),t=new Float32Array(e.buffer);if(e.layout==="bvh4")return[[t[0],t[1],t[2]],[t[0]+t[3],t[1]+t[4],t[2]+t[5]]];if(e.layout==="bvh-gpu")return new Uint32Array(e.buffer)[11]===0?[[Math.min(t[0],t[8]),Math.min(t[1],t[9]),Math.min(t[2],t[10])],[Math.max(t[4],t[12]),Math.max(t[5],t[13]),Math.max(t[6],t[14])]]:Tl(i);if(e.layout==="cwbvh"){const A=new Uint32Array(e.buffer),a=A[3],r=l=>l<<24>>24,n=[2**r(a),2**r(a>>8),2**r(a>>16)],s=[t[0],t[1],t[2]],o=[...s];for(let l=0;l<8;l++){if(!(A[6+(l>>2)]>>(l&3)*8&255))continue;const f=(l&3)*8,p=l>>2;o[0]=Math.max(o[0],s[0]+(A[14+p]>>f&255)*n[0]),o[1]=Math.max(o[1],s[1]+(A[16+p]>>f&255)*n[1]),o[2]=Math.max(o[2],s[2]+(A[18+p]>>f&255)*n[2])}return[s,o]}return[[t[0],t[1],t[2]],[t[4],t[5],t[6]]]}function KA(i,e,t,A=Or(),a=me()){const r=Ze(e),n=Ze(t[0]),s=Ze(t[1]),{min:o,max:l}=A;qe(o,1/0,1/0,1/0),qe(l,-1/0,-1/0,-1/0);for(let c=0;c<8;c++)qe(a,c&1?s[0]:n[0],c&2?s[1]:n[1],c&4?s[2]:n[2]),An(a,a,r),zt(a)&&(ko(o,o,a),zo(l,l,a));return A}function Ii(i,e,t){if(e&&!Array.isArray(e)&&t&&e.bindingSlots.length===i.length&&e.bindingSlots.every((r,n)=>r.length===ri(i[n].mesh))){const r=e.copy(),n=new Float64Array(16),s=Or(),o=me();let l=!1;const c=new Map;for(const f of t){const p=i[e.bindingIndices[f]],h=e.localIndices[f];if(!p||h>=ri(p.mesh)){l=!0;break}let u=c.get(p.mesh);u||(u=Ze(p.mesh.transform),c.set(p.mesh,u)),fa(p.mesh,h,n,u);const d=KA(p.geometry,n,p.bvhBounds,s,o);if(!zt(d.min)||!zt(d.max)||!zt(n)){l=!0;break}r.transforms.set(n,f*16),r.bounds.set(d.min,f*6),r.bounds.set(d.max,f*6+3)}if(!l)return r}if(i.some(r=>r.mesh.instanceData!=null)){const r=new bA(i.reduce((c,f)=>c+ri(f.mesh),0)),n=new Float64Array(16),s=Or(),o=me();let l=0;for(let c=0;c<i.length;c++){const f=i[c],p=[];r.bindingSlots.push(p);const{mesh:h,geometry:u,bvhBounds:d,blasIndex:m,materialIndices:v,displacementScale:g}=f,w=Ze(h.transform);for(let B=0;B<ri(h);B++,l++){fa(h,B,n,w);const E=KA(u,n,d,s,o);if(!zt(E.min)||!zt(E.max)||!zt(n))continue;const b=r.length++;r.sourceIndices[b]=l,r.bindingIndices[b]=c,r.localIndices[b]=B,p.push(b),r.transforms.set(n,b*16),r.bounds.set(E.min,b*6),r.bounds.set(E.max,b*6+3),r.blasIndices[b]=m,r.materials[b]=ua(v[0],1),r.displacement[b]=g;const x=h.instanceData?.colors;for(let y=0;y<3;y++)r.colors[b*3+y]=x?.[B*3+y]??1}}return r}const A=({mesh:r,geometry:n,blasIndex:s,materialIndices:o,displacementScale:l,bvhBounds:c})=>({bounds:KA(n,r.transform,c),blasIndex:s,transform:Ze(r.transform),materialsIndices:o.map(f=>ua(f,1)),displacementScale:l});if(!e||!t||!Array.isArray(e))return i.map(A);const a=e.slice();return t.forEach(r=>{const n=i[r];n&&(a[r]=A(n))}),a}function Rl(i,e,t){const A=new Set;for(let a=0;a<i.length;a++)if(e.has(i[a].mesh))if(Array.isArray(t))A.add(a);else for(const r of t.bindingSlots[a]??[])A.add(r);return A}function vd(i,e,t=In,A=!0){const a=new Map,r=new Map,n=new Map,s=[],o=[],l=[],c=[],f=[],p=i.filter(d=>d.geometry.position?.array.length>0).map(d=>{let{geometry:m,displacementScale:v}=e(d),g=n.get(m);if(!g){const y=t(m);g=[Ze(y[0]),Ze(y[1])],n.set(m,g)}const w=[g[0].slice(),g[1].slice()],B=KA(m,d.transform,w);let E=r.get(m);const b=d.materials.map(y=>{const T=y;return a.has(T)||(a.set(T,o.length),o.push(y)),a.get(T)});if(E!=null&&m.materialIndex&&(b.length!==l[E].length||b.some((y,T)=>y!==l[E][T]))){const y=He(m);m=new oi(m),Yt(m,y),E=void 0}E==null&&(E=s.length,r.set(m,s.length),s.push(m),l.push(b));const x={bounds:B,blasIndex:E,transform:Ze(d.transform),materialsIndices:b.map(y=>ua(y,1)),displacementScale:v};if(!(d.instanceData==null&&(!zt(B.min)||!zt(B.max)||!zt(d.transform))))return d.materials.some(y=>!y.unlit&&!y.shadowCatcher&&li(y.emissionColor)*y.emissionLuminance>1e-8)&&c.push({mesh:d,geometry:m,materialIndices:b}),f.push({mesh:d,geometry:m,blasIndex:E,materialIndices:b,displacementScale:v,bvhBounds:w}),x}).filter(d=>d!=null),h=new Map;return{geometry:Ul(s,l,h),geometries:s,geometryRegions:h,geometryStates:new Map(f.map(d=>{const m=d.mesh.geometry;return[m,{topologyVersion:m.topologyVersion,indices:m.indices.array,indexCount:m.indexArray.length}]})),instances:i.some(d=>d.instanceData!=null)?Ii(f):p,materials:o,instanceBindings:f,emissiveBindings:c,blases:A?s.map(d=>({bvh:He(d),verticesCount:d.vertexCount,trainglesCount:d.indexArray.length/3})):[]}}function Ul(i,e,t,A=!1){const a=i.reduce((w,B)=>w+B.vertexCount,0),r=i.reduce((w,B)=>w+B.indexArray.length,0),n=new Ce(new Float32Array(3*a),3),s=new Ce(new Float32Array(3*a),3),o=new Ce(new Float32Array(2*a),2),l=new Ce(new Float32Array(2*a),2),c=new Ce(new Uint32Array(r),1),f=new Ce(new Int32Array(4*a),4),p=A?i.find(w=>w.color||w.tangent):void 0,h=A?!!p?.color:i.some(w=>w.color),u=A?!p?.color&&!!p?.tangent:i.some(w=>w.tangent),d=A?3:4,m=new oi({position:n,normal:s,uv:o,uv1:l,materialIndex:f,color:h?new Ce(new Float32Array(3*a).fill(1),3):void 0,tangent:u?new Ce(new Float32Array(d*a),d):void 0,indices:c});let v=0,g=0;return i.forEach((w,B)=>{const E=w.vertexCount,b=e[B];if(t.set(w,{vertexOffset:v,indexOffset:g,materialIndices:b}),n.array.set(w.position.array,v*3),s.array.set(w.normal.array,v*3),w.uv&&o.array.set(w.uv.array,v*2),l.array.set((w.uv1??w.uv)?.array??new Float32Array(E*2),v*2),m.color&&w.color&&m.color.array.set(w.color.array,v*3),m.tangent&&w.tangent){const y=w.tangent;if(A)m.tangent.array.set(y.array,v*d);else for(let T=0;T<E;T++)for(let I=0;I<4;I++)m.tangent.array[(v+T)*4+I]=I<y.itemSize?y.array[T*y.itemSize+I]:Yo(w)?0:2}Ml(w,b,f.array,v,A);const x=w.indexArray;for(let y=0;y<St(x);y++)c.array[g+y]=v+$(x,y);v+=E,g+=St(x)}),m}function Pn(i){const e=i.indexArray,t=i.position.array;i.normal=new Ce(new Float32Array(t.length),3);const A=i.normal.array,a=me(),r=me(),n=me(),s=me(),o=me(),l=me(),c=e?e.length:i.vertexCount;let f,p,h;for(let u=0;u<c;){e?(f=$(e,u++),p=$(e,u++),h=$(e,u++)):(f=u++,p=u++,h=u++),qe(a,t[f*3],t[f*3+1],t[f*3+2]),qe(r,t[p*3],t[p*3+1],t[p*3+2]),qe(n,t[h*3],t[h*3+1],t[h*3+2]),$i(s,a,r),$i(o,r,n),tn(l,s,o);for(let d=0;d<3;d++)A[f*3+d]=A[f*3+d]+l[d],A[p*3+d]=A[p*3+d]+l[d],A[h*3+d]=A[h*3+d]+l[d]}for(let u=0;u<A.length;)qe(l,A[u],A[u+1],A[u+2]),Ft(l,l),A[u++]=l[0],A[u++]=l[1],A[u++]=l[2]}function zt(i){return i instanceof Float32Array||i instanceof Float64Array,ur(i)}function ur(i){const e=i.length;for(let t=0;t<e;t++)if(!Number.isFinite(Q(i,t)))return!1;return!0}function Or(){return new Yi}function Bd(i,e){if(e===0)return i;const t=i.position.array.slice(),A=i.normal.array;for(let r=0;r<i.vertexCount;r++){const n=r*i.position.itemSize,s=r*i.normal.itemSize,o=Math.hypot(A[s],A[s+1],A[s+2]);if(o>0)for(let l=0;l<3;l++)t[n+l]+=A[s+l]/o*e}const a=new oi(i);return a.position=new Ce(t,i.position.itemSize),a}function wd(i,e,t){const A=[],a=Math.log2(i);let r=i;for(let n=0;n<=a;n++){const s=A[Math.max(0,n-1)],o=new Uint8Array(r*r*2);A.push(o);const l=n===0?e:2;for(let c=0;c<r;c++)for(let f=0;f<r;f++){const p=c*r+f,h=p*l;let u=0,d=0;if(n==0){if(u=t(h),d=u,c<r-1&&f<r-1){const m=t(h+(r+1)*l);u=Math.min(u,m),d=Math.max(d,m)}if(c<r-1){const m=t(h+r*l);u=Math.min(u,m),d=Math.max(d,m)}if(f<r-1){const m=t(h+l);u=Math.min(u,m),d=Math.max(d,m)}}else{const m=f*2,v=c*2,g=r*2,w=(v*g+m)*l,B=w,E=w+l,b=w+g*l,x=w+g*l+l;u=Math.min(s[B],s[E],s[b],s[x]),d=Math.max(s[B+1],s[E+1],s[b+1],s[x+1])}o[p*2]=u,o[p*2+1]=d}r=r/2}return A}function dr(i,e){const t=Math.atan2(Q(i,0),Q(i,2))/(2*Math.PI)+.5,A=Math.acos(Q(i,1))/Math.PI;At(e,t,1-A)}function Ed(i,e,t,A,a,r){dr(i,A),dr(e,a),dr(t,r);let n=!1;for(let s=0;s<2;s++)if(Math.abs(Q(A,s)-Q(a,s))>.5||Math.abs(Q(A,s)-Q(r,s))>.5||Math.abs(Q(a,s)-Q(r,s))>.5){const o=Math.max(Q(A,s),Q(a,s),Q(r,s));o-Q(A,s)>.5&&(We(A,s,Q(A,s)+1),n=!0),o-Q(a,s)>.5&&(We(a,s,Q(a,s)+1),n=!0),o-Q(r,s)>.5&&(We(r,s,Q(r,s)+1),n=!0)}return n}function hr(i){const e=Math.abs(Q(i,0)),t=Math.abs(Q(i,1)),A=Math.abs(Q(i,2));return e>t&&e>A?0:t>A?1:2}function bd(i,e,t,A,a,r,n,s,o){const l=Math.max(Math.abs(Q(A,0)),Math.abs(Q(a,0)),Math.abs(Q(r,0))),c=Math.max(Math.abs(Q(A,1)),Math.abs(Q(a,1)),Math.abs(Q(r,1))),f=Math.max(Math.abs(Q(A,2)),Math.abs(Q(a,2)),Math.abs(Q(r,2)));l>c&&l>f?(At(n,Q(i,1),Q(i,2)),At(s,Q(e,1),Q(e,2)),At(o,Q(t,1),Q(t,2))):c>l&&c>f?(At(n,Q(i,0),Q(i,2)),At(s,Q(e,0),Q(e,2)),At(o,Q(t,0),Q(t,2))):(At(n,Q(i,0),Q(i,1)),At(s,Q(e,0),Q(e,1)),At(o,Q(t,0),Q(t,1)))}function _d(i,e,t,A){let a=_f(ji(),e,i),r=Math.max(a[0],a[1]),n=t-Math.floor(Math.log2(Math.floor(1/r)))-1;isFinite(n)||(n=t),n=Math.max(n,0);let s=0;for(;;){const o=Math.pow(2,t-n),l=Math.floor(o*Q(i,0)),c=Math.floor(o*Q(i,1)),f=Math.floor(o*Q(e,0)),p=Math.floor(o*Q(e,1));if(f-l<2&&p-c<2&&n>=0||n>=t){for(let h=c;h<=p;h++)for(let u=l;u<=f;u++)s<A.length&&(qe(A[s],Math.floor(u),Math.floor(h),n),s++);break}n++}return s}function Ll(i){if(i<1e5)return;const e=new Float32Array(i*2);for(let t=0;t<i;t++)e[t*2+1]=1;return e}function yd(i,e,t,A,a){const r=i.indexArray,n=i.uv?.array,s=a.displacementUvProjection;if(!n&&s==="none")throw new Error("UV displacement requires texture coordinates; use triplanar, spherical, or cylindrical projection for a UV-less mesh.");const o=Ll(St(r)/3);if(o)return o;const l=Math.log2(t),c=new Float32Array(St(r)/3*2),f=i.normal.array,p=i.position.array,h=ji(),u=ji(),d=ji(),m=me(),v=me(),g=me(),w=me(),B=me(),E=me(),b=s==="triplanar",x=s==="spherical",y=s==="cylindrical",T=a.displacementUvProjectionScale,I=ji(),P=ji(),S=[];for(let R=0;R<100;R++)S.push(new Float64Array(3));for(let R=0;R<St(r);R+=3){const L=$(r,R),H=$(r,R+1),J=$(r,R+2),_=L*2,F=H*2,V=J*2,Z=L*3,ie=H*3,N=J*3;n?(At(h,$(n,_),$(n,_+1)),At(u,$(n,F),$(n,F+1)),At(d,$(n,V),$(n,V+1))):(At(h,0,0),At(u,0,0),At(d,0,0));let K=!1;if(b||x||y)if(qe(w,$(f,Z),$(f,Z+1),$(f,Z+2)),qe(B,$(f,ie),$(f,ie+1),$(f,ie+2)),qe(E,$(f,N),$(f,N+1),$(f,N+2)),Ft(w,w),Ft(B,B),Ft(E,E),(b||x||y)&&(qe(m,$(p,Z),$(p,Z+1),$(p,Z+2)),qe(v,$(p,ie),$(p,ie+1),$(p,ie+2)),qe(g,$(p,N),$(p,N+1),$(p,N+2))),b){const de=hr(w),Ee=hr(B),_e=hr(E);de===Ee&&Ee===_e||(K=!0),bd(m,v,g,w,B,E,h,u,d)}else if(x)Ft(m,m),Ft(v,v),Ft(g,g),K=Ed(m,v,g,h,u,d);else{const de=Math.atan2(m[2],m[0])/(Math.PI*2)+.5,Ee=Math.atan2(v[2],v[0])/(Math.PI*2)+.5,_e=Math.atan2(g[2],g[0])/(Math.PI*2)+.5;At(h,de,m[1]),At(u,Ee,v[1]),At(d,_e,g[1]),K=Math.max(de,Ee,_e)-Math.min(de,Ee,_e)>.5}qa(h,h,T),qa(u,u,T),qa(d,d,T);let ge=1/0,ue=-1/0;if(K)ge=0,ue=255;else{Kn(P,h),Kn(I,h),Zn(I,I,u),Zn(I,I,d),Xn(P,P,u),Xn(P,P,d);const de=_d(I,P,l,S);for(let Ee=0;Ee<de;Ee++){const _e=Q(S[Ee],2),W=Math.pow(2,l-_e),le=e[_e],ye=(Q(S[Ee],0)%W+W)%W;let ne=(Q(S[Ee],1)%W+W)%W;A&&(ne=W-ne-1);const Qe=(ne*W+ye)*2;ge=Math.min(ge,le[Qe]),ue=Math.max(ue,le[Qe+1])}}c[R/3*2]=Math.max((Math.floor(ge)-4)/255,0),c[R/3*2+1]=Math.min((Math.ceil(ue)+4)/255,1)}return c}const Ge=8,Ss=1,xd=1,Fe=1e30,mt=new Float64Array(3*Ge*3),gt=new Float64Array(3*Ge*3),Ni=new Uint32Array(3*Ge),Ds=new Float64Array(Ge-1),Ts=new Float64Array(Ge-1);function kA(i,e,t){const A=(i-e)*t|0;return A<0?0:A>Ge-1?Ge-1:A}function pr(i,e,t,A,a,r,n){mt[i]=Math.min(mt[i],e),mt[i+1]=Math.min(mt[i+1],t),mt[i+2]=Math.min(mt[i+2],A),gt[i]=Math.max(gt[i],a),gt[i+1]=Math.max(gt[i+1],r),gt[i+2]=Math.max(gt[i+2],n)}function Ol(i,e){const t=Math.max(1,e*2-1),A=new Float32Array(t*6),a=new Uint32Array(t),r=new Uint32Array(t),n=new Uint32Array(e);if(e===0)return{nodeCount:0,bounds:A,leftFirst:a,primCount:r,primIndices:n};const s=new Float32Array(e*3);let o=Fe,l=Fe,c=Fe,f=-Fe,p=-Fe,h=-Fe;for(let B=0;B<e;B++){const E=B*6,b=B*3,x=i[E],y=i[E+1],T=i[E+2],I=i[E+3],P=i[E+4],S=i[E+5];s[b]=(x+I)*.5,s[b+1]=(y+P)*.5,s[b+2]=(T+S)*.5,x<o&&(o=x),y<l&&(l=y),T<c&&(c=T),I>f&&(f=I),P>p&&(p=P),S>h&&(h=S),n[B]=B}A[0]=o,A[1]=l,A[2]=c,A[3]=f,A[4]=p,A[5]=h,a[0]=0,r[0]=e;const u=(f-o)*1e-20,d=(p-l)*1e-20,m=(h-c)*1e-20;let v=1;const g=[];let w=0;for(;;){for(;;){const B=w*6,E=A[B],b=A[B+1],x=A[B+2],y=A[B+3]-E,T=A[B+4]-b,I=A[B+5]-x,P=y*T+T*I+I*y;if(P===0)break;const S=a[w],R=r[w];if(R===1)break;const L=y>u?Ge/y:0,H=T>d?Ge/T:0,J=I>m?Ge/I:0;for(let W=0;W<3*Ge*3;W++)mt[W]=Fe,gt[W]=-Fe;Ni.fill(0);for(let W=S,le=S+R;W<le;W++){const ye=n[W],ne=ye*3,Qe=ye*6,Je=i[Qe],se=i[Qe+1],et=i[Qe+2],Se=i[Qe+3],oe=i[Qe+4],be=i[Qe+5],Ie=kA(s[ne],E,L),je=Ge+kA(s[ne+1],b,H),ve=2*Ge+kA(s[ne+2],x,J);Ni[Ie]++,Ni[je]++,Ni[ve]++,pr(Ie*3,Je,se,et,Se,oe,be),pr(je*3,Je,se,et,Se,oe,be),pr(ve*3,Je,se,et,Se,oe,be)}let _=Fe,F=0,V=0;for(let W=0;W<3;W++){if(!((W===0?y:W===1?T:I)>(W===0?u:W===1?d:m)))continue;let ne=Fe,Qe=Fe,Je=Fe,se=-Fe,et=-Fe,Se=-Fe,oe=Fe,be=Fe,Ie=Fe,je=-Fe,ve=-Fe,Pe=-Fe,ce=0,vt=0;for(let fe=0;fe<Ge-1;fe++){const Le=(W*Ge+fe)*3,ke=(W*Ge+Ge-1-fe)*3;ne=Math.min(ne,mt[Le]),Qe=Math.min(Qe,mt[Le+1]),Je=Math.min(Je,mt[Le+2]),se=Math.max(se,gt[Le]),et=Math.max(et,gt[Le+1]),Se=Math.max(Se,gt[Le+2]),oe=Math.min(oe,mt[ke]),be=Math.min(be,mt[ke+1]),Ie=Math.min(Ie,mt[ke+2]),je=Math.max(je,gt[ke]),ve=Math.max(ve,gt[ke+1]),Pe=Math.max(Pe,gt[ke+2]),ce+=Ni[W*Ge+fe],vt+=Ni[W*Ge+Ge-1-fe];const xe=se-ne,D=et-Qe,Y=Se-Je,q=je-oe,Be=ve-be,pe=Pe-Ie;Ds[fe]=ce===0?Fe:(xe*D+D*Y+Y*xe)*ce,Ts[Ge-2-fe]=vt===0?Fe:(q*Be+Be*pe+pe*q)*vt}for(let fe=0;fe<Ge-1;fe++){const Le=Ds[fe]+Ts[fe];Le<_&&(_=Le,F=W,V=fe)}}if(_=xd+Ss*_/P,!(_<R*Ss))break;const Z=F===0?L:F===1?H:J,ie=F===0?E:F===1?b:x;let N=S+R,K=S;for(let W=0;W<R;W++){const le=n[K];kA(s[le*3+F],ie,Z)<=V?K++:(n[K+0]=n[--N],n[N]=le)}const ge=K-S,ue=R-ge;if(ge===0||ue===0)break;const de=v;v+=2;const Ee=de*6,_e=Ee+6;for(let W=0;W<3;W++)A[Ee+W]=A[_e+W]=Fe,A[Ee+3+W]=A[_e+3+W]=-Fe;for(let W=0;W<Ge;W++){const le=(F*Ge+W)*3,ye=W<=V?Ee:_e;for(let ne=0;ne<3;ne++)mt[le+ne]<A[ye+ne]&&(A[ye+ne]=mt[le+ne]),gt[le+ne]>A[ye+3+ne]&&(A[ye+3+ne]=gt[le+ne])}a[de]=S,r[de]=ge,a[de+1]=N,r[de+1]=ue,a[w]=de,r[w]=0,g.push(de+1),w=de}if(!g.length)break;w=g.pop()}return{nodeCount:v,bounds:A,leftFirst:a,primCount:r,primIndices:n}}function Fl(i){const{nodeCount:e,leftFirst:t,primCount:A}=i,a=new Uint32Array(e),r=new Uint32Array(e);let n=0,s=0,o=0;if(!e)return{order:a,offsets:r,vec4Count:n,maxDepth:s,maxLeafPrimitives:o};const l=[0,1];let c=0;for(;l.length;){const f=l.pop(),p=l.pop();a[c++]=p,r[p]=n,f>s&&(s=f);const h=A[p];n+=2+h,h?h>o&&(o=h):l.push(t[p]+1,f+1,t[p],f+1)}return{order:a,offsets:r,vec4Count:n,maxDepth:s,maxLeafPrimitives:o}}function Cd(i,e){const t=Math.fround(i),A=Math.fround(e),a=Math.max(0,Math.min(255,Math.floor(Math.fround(t*255)))),r=Math.abs(Math.fround(A-t))<Math.fround(1e-6)?a:Math.max(0,Math.min(255,Math.ceil(Math.fround(A*255))));return a<<8|r}const te=10,yA=te*4,Qd=30,Md=1073741823,Id={bvh2:0,bvh4:1,"bvh-gpu":2,cwbvh:3};function Pd(i,e){if(!Number.isSafeInteger(i)||i<0||i>Md)throw new Error(`BLAS offset ${i} exceeds the packed 30-bit range`);return i|Id[e]<<Qd|0}function Rs(i,e,t){return ko(i.min,e.min,t.min),zo(i.max,e.max,t.max),i}const Us=64;function mr(i,e){return{tlas:Math.min(Us,Math.max(1,i.maxDepth)),blas:Math.min(Us,e.reduce((t,A)=>Math.max(t,A.bvh.maxDepth),1))}}function XA(i){const e=i.map(r=>new Float32Array(r.bvh.buffer)),t=e.reduce((r,n)=>r+n.length,0),A=new Float32Array(t);let a=0;for(let r=0;r<i.length;r++)A.set(e[r],a),a+=e[r].length;return A.buffer}function zl(i,e){const t=Math.min(Math.floor(i*255),255),A=Math.abs(e-i)<1e-6?t:Math.min(Math.ceil(e*255),255);return(t<<8)+A}function kl(i,e,t,A,a,r,n,s,o,l,c){let f=1/0,p=1/0,h=1/0,u=-1/0,d=-1/0,m=-1/0;for(let v=0;v<3;v++){const g=v===0?a:v===1?r:n,w=g*e,B=i[w],E=i[w+1],b=i[w+2];if(t){const x=g*A;let y=t[x],T=t[x+1],I=t[x+2];const P=Math.sqrt(y*y+T*T+I*I);P>0&&(y/=P,T/=P,I/=P);for(let S=0;S<2;S++){const R=S===0?s:o,L=B+y*R,H=E+T*R,J=b+I*R;f=Math.min(f,L),p=Math.min(p,H),h=Math.min(h,J),u=Math.max(u,L),d=Math.max(d,H),m=Math.max(m,J)}}else f=Math.min(f,B),p=Math.min(p,E),h=Math.min(h,b),u=Math.max(u,B),d=Math.max(d,E),m=Math.max(m,b)}return l[c]=f,l[c+1]=p,l[c+2]=h,l[c+3]=u,l[c+4]=d,l[c+5]=m,isFinite(f)&&isFinite(p)&&isFinite(h)&&isFinite(u)&&isFinite(d)&&isFinite(m)}function Fr(i){return{builder:"builtin",buildSurfaceArea:i?void 0:0,maxDepth:0,maxLeafPrimitives:0,buffer:new ArrayBuffer(0),layout:"bvh2",instancesBuffer:i?new ArrayBuffer(0):void 0}}function Ra(i,e=0,t){const A=i.position,a=i.indices;if(!A||!a||!A.array.length)return Fr(!1);const r=an(a.array),n=A.array,s=A.itemSize,o=t?i.normal:void 0,l=o?.array,c=o?.itemSize??0,f=Math.floor(St(r)/3),p=new Float32Array(f*6),h=new Uint32Array(f);let u=0;for(let L=0;L<f;L++){let H=0,J=0;l&&(H=t[L*2]*e,J=t[L*2+1]*e,(isNaN(H)||isNaN(J))&&(H=0,J=e)),kl(n,s,l,c,$(r,L*3),$(r,L*3+1),$(r,L*3+2),H,J,p,u*6)&&(h[u++]=L)}if(!u)return Fr(!1);const d=Ol(p,u),{order:m,offsets:v,vec4Count:g,maxDepth:w,maxLeafPrimitives:B}=Fl(d),{bounds:E,leftFirst:b,primCount:x,primIndices:y}=d,T=new ArrayBuffer(g*16),I=new Float32Array(T),P=new Int32Array(T);let S=0;const R=[];for(let L=0;L<m.length;L++){const H=m[L],J=v[H]*4,_=H*6;I[J]=E[_],I[J+1]=E[_+1],I[J+2]=E[_+2],I[J+4]=E[_+3],I[J+5]=E[_+4],I[J+6]=E[_+5];const F=E[_+3]-E[_],V=E[_+4]-E[_+1],Z=E[_+5]-E[_+2];S+=2*(F*Z+F*V+Z*V);const ie=x[H];if(!ie){P[J+3]=v[b[H]+1];continue}P[J+3]=-ie;for(let N=0;N<ie;N++){const K=h[y[b[H]+N]],ge=J+8+N*4;t&&R.push(ge/4,K),P[ge]=$(r,K*3),P[ge+1]=$(r,K*3+1),P[ge+2]=$(r,K*3+2),P[ge+3]=t?zl(t[K*2],t[K*2+1]):0}}return{builder:"builtin",triangleIds:t?new Uint32Array(R):void 0,buildSurfaceArea:S,maxDepth:w,maxLeafPrimitives:B,buffer:T,layout:"bvh2"}}function Nl(i){let e=0,t=0;const A={blasOffsets:[],vertexOffsets:[],layouts:[]};return i.forEach(a=>{A.blasOffsets.push(e),A.vertexOffsets.push(t),A.layouts.push(a.bvh.layout??"bvh2"),e+=a.bvh.buffer.byteLength/16,t+=a.verticesCount}),A}function Gl(i,e,t){const{min:A,max:a}=i.bounds;let r=0,n=0,s=0;const o=i.displacementScale;if(o){const l=i.transform;r=Math.max(0,o*Math.hypot(Q(l,0),Q(l,1),Q(l,2))),n=Math.max(0,o*Math.hypot(Q(l,4),Q(l,5),Q(l,6))),s=Math.max(0,o*Math.hypot(Q(l,8),Q(l,9),Q(l,10)))}e[t]=Q(A,0)-r,e[t+1]=Q(A,1)-n,e[t+2]=Q(A,2)-s,e[t+3]=Q(a,0)+r,e[t+4]=Q(a,1)+n,e[t+5]=Q(a,2)+s}function Hl(i,e,t){const A=t.color;i[e]=A?A[0]:1,i[e+1]=A?A[1]:1,i[e+2]=A?A[2]:1}function Wl(i,e,t,A,a){const r=t*yA;i[r]=Pd(a.blasOffsets[A.blasIndex],a.layouts[A.blasIndex]),i[r+1]=a.vertexOffsets[A.blasIndex],i[r+2]=A.materialsIndices[0]||0,e[r+3]=A.displacementScale||0,Hl(e,r+36,A),e[r+39]=0;const n=BA(new Float64Array(16),A.transform);for(let s=0;s<16;s++)e[r+4+s]=n[s],e[r+20+s]=Q(A.transform,s)}function gA(i,e){if(!yi(i))return Fr(!0);const t=Nl(e),A=new Float32Array(yi(i)*6);for(let E=0;E<yi(i);E++)Gl(Mi(i,E),A,E*6);const a=Ol(A,yi(i)),{order:r,offsets:n,vec4Count:s,maxDepth:o,maxLeafPrimitives:l}=Fl(a),{bounds:c,leftFirst:f,primCount:p,primIndices:h}=a,u=new ArrayBuffer(s*16),d=new Float32Array(u),m=new Int32Array(u),v=new ArrayBuffer(yi(i)*yA*4),g=new Int32Array(v),w=new Float32Array(v);let B=0;for(let E=0;E<r.length;E++){const b=r[E],x=n[b]*4,y=b*6;d[x]=c[y],d[x+1]=c[y+1],d[x+2]=c[y+2],d[x+4]=c[y+3],d[x+5]=c[y+4],d[x+6]=c[y+5];const T=p[b];if(!T){m[x+3]=n[f[b]+1];continue}m[x+3]=-T;for(let I=0;I<T;I++){const P=h[f[b]+I],S=Mi(i,P),R=x+8+I*4;m[R]=B,m[R+1]=t.blasOffsets[S.blasIndex],m[R+2]=P,Wl(g,w,B,S,t),B++}}return{builder:"builtin",maxDepth:o,maxLeafPrimitives:l,buffer:u,layout:"bvh2",instancesBuffer:v}}const Ls=new WeakMap;function jl(i,e){const t=Ls.get(i);if(t)return t;const A={parent:new Map,depth:new Map,leavesBySource:new Map,instancesByLeaf:new Map},a=(r,n,s)=>{A.depth.set(r,s),n!=null&&A.parent.set(r,n);const o=r*4,l=e[o+3];if(l>=0){a(r+2,r,s+1),a(l,r,s+1);return}const c=[];for(let f=0;f<-l;f++){const p=o+8+f*4,h=e[p],u=e[p+2];c.push({source:u,target:h});const d=A.leavesBySource.get(u)??new Set;d.add(r),A.leavesBySource.set(u,d)}A.instancesByLeaf.set(r,c)};return a(0,void 0,0),Ls.set(i,A),A}function xA(i){const e=i.filter(({size:A})=>A>0).sort((A,a)=>A.offset-a.offset),t=[];for(const A of e){const a=t[t.length-1];a&&A.offset<=a.offset+a.size?a.size=Math.max(a.size,A.offset+A.size-a.offset):t.push({offset:A.offset,size:A.size})}return t}function da(i,e,t,A){if(!i.instancesBuffer||!i.buffer.byteLength)return{tlasRanges:[],instanceRanges:[]};const a=new Float32Array(i.buffer),r=new Int32Array(i.buffer),n=new Float32Array(i.instancesBuffer),s=new Int32Array(i.instancesBuffer),o=Nl(t),l=new Float32Array(6);function c(B,E){Wl(s,n,B,Mi(e,E),o)}function f(B,E){Gl(E,l,0),We(B.min,0,Math.min(Q(B.min,0),l[0])),We(B.min,1,Math.min(Q(B.min,1),l[1])),We(B.min,2,Math.min(Q(B.min,2),l[2])),We(B.max,0,Math.max(Q(B.max,0),l[3])),We(B.max,1,Math.max(Q(B.max,1),l[4])),We(B.max,2,Math.max(Q(B.max,2),l[5]))}function p(B,E){const b=B*4;a[b]=Q(E.min,0),a[b+1]=Q(E.min,1),a[b+2]=Q(E.min,2),a[b+4]=Q(E.max,0),a[b+5]=Q(E.max,1),a[b+6]=Q(E.max,2)}function h(B){const E=B*4,b=new Yi;return qe(b.min,a[E],a[E+1],a[E+2]),qe(b.max,a[E+4],a[E+5],a[E+6]),b}function u(B){const E=B*4,b=new Yi,x=r[E+3];if(x>=0){const y=u(B+2),T=u(x);Rs(b,y,T)}else for(let y=0;y<-x;y++){const T=E+8+y*4,I=r[T],P=r[T+2],S=Mi(e,P);S&&(f(b,S),c(I,P))}return p(B,b),b}if(!A)return u(0),{tlasRanges:[{offset:0,size:i.buffer.byteLength}],instanceRanges:[{offset:0,size:i.instancesBuffer.byteLength}]};const d=jl(i,r),m=new Set,v=[];for(const B of A){const E=d.leavesBySource.get(B);if(E){E.forEach(b=>m.add(b));for(const b of E)for(const x of d.instancesByLeaf.get(b)??[])x.source===B&&(c(x.target,B),v.push({offset:x.target*yA*4,size:yA*4}))}}const g=new Set;for(const B of m){const E=new Yi;for(const{source:x}of d.instancesByLeaf.get(B)??[]){const y=Mi(e,x);y&&f(E,y)}p(B,E),g.add(B);let b=d.parent.get(B);for(;b!=null;)g.add(b),b=d.parent.get(b)}const w=[...g].filter(B=>r[B*4+3]>=0).sort((B,E)=>(d.depth.get(E)??0)-(d.depth.get(B)??0));for(const B of w){const E=r[B*4+3],b=new Yi;Rs(b,h(B+2),h(E)),p(B,b)}return{tlasRanges:xA([...g].map(B=>({offset:B*16,size:32}))),instanceRanges:xA(v)}}const Sd=2,Os=new WeakMap;function Dd(i){const e=Os.get(i);if(e)return e;const t=new Int32Array(i),A=new Int32Array(t.length/4),a=[],r=[],n=[0];for(;n.length;){const o=n.pop();r.push(o);const l=o*4,c=t[l+3];if(c>=0){n.push(c,o+2);continue}A[o]=a.length;const f=a.length;a.push(0);for(let p=0;p<-c;p++)for(let h=0;h<3;h++){const u=t[l+8+p*4+h];let d=!1;for(let m=f+1;m<a.length;m++)if(a[m]===u){d=!0;break}d||a.push(u)}a[f]=a.length-f-1}const s={offsets:A,vertices:new Uint32Array(a),postorder:new Int32Array(r.reverse())};return Os.set(i,s),s}function Sn(i,e,t){if((i.layout??"bvh2")!=="bvh2"||!i.buffer.byteLength)return!1;const{offsets:A,vertices:a,postorder:r}=Dd(i.buffer),n=new Float32Array(i.buffer),s=new Int32Array(i.buffer),o=e.position.array,l=e.position.itemSize,c=new Int32Array(t?n.length/4:0).fill(-1),f=new Float32Array(6);if(t){const h=i.triangleIds;if(!(h instanceof Uint32Array))return!1;for(let u=0;u<h.length;u+=2){const d=Number(h[u]);c[d]=h[u+1]}}if(i.buildSurfaceArea==null){let h=0;for(const u of r){const d=u*4,m=n[d+4]-n[d],v=n[d+5]-n[d+1],g=n[d+6]-n[d+2];h+=2*(m*g+m*v+g*v)}i.buildSurfaceArea=h}let p=0;for(let h=0;h<r.length;h++){const u=r[h],d=u*4,m=s[d+3];let v=1/0,g=1/0,w=1/0,B=-1/0,E=-1/0,b=-1/0;if(m>=0){const I=d+8,P=m*4;v=Math.min(n[I],n[P]),g=Math.min(n[I+1],n[P+1]),w=Math.min(n[I+2],n[P+2]),B=Math.max(n[I+4],n[P+4]),E=Math.max(n[I+5],n[P+5]),b=Math.max(n[I+6],n[P+6])}else if(t)for(let I=0;I<-m;I++){const P=d+8+I*4,S=s[P],R=s[P+1],L=s[P+2],H=c[P/4];if(H<0)return!1;const J=t.ranges[H*2],_=t.ranges[H*2+1];if(!kl(o,l,t.normal,3,S,R,L,J*t.scale,_*t.scale,f,0))return!1;s[P+3]=i.builder==="tinybvh"?Cd(J,_):zl(J,_),v=Math.min(v,f[0]),g=Math.min(g,f[1]),w=Math.min(w,f[2]),B=Math.max(B,f[3]),E=Math.max(E,f[4]),b=Math.max(b,f[5])}else{const I=A[u],P=I+1+a[I];for(let S=I+1;S<P;S++){const R=a[S]*l,L=o[R],H=o[R+1],J=o[R+2];!isFinite(L)||!isFinite(H)||!isFinite(J)||(v=Math.min(v,L),g=Math.min(g,H),w=Math.min(w,J),B=Math.max(B,L),E=Math.max(E,H),b=Math.max(b,J))}}const x=B-v,y=E-g,T=b-w;p+=2*(x*T+x*y+T*y),n[d]=v,n[d+1]=g,n[d+2]=w,n[d+4]=B,n[d+5]=E,n[d+6]=b}return!e.dynamic||!(p>i.buildSurfaceArea*Sd)}function Yl(i,e,t){if(!i.instancesBuffer||!i.buffer.byteLength||!t.size)return[];const A=jl(i,new Int32Array(i.buffer)),a=new Float32Array(i.instancesBuffer),r=[];for(const n of t){const s=A.leavesBySource.get(n);if(s)for(const o of s)for(const l of A.instancesByLeaf.get(o)??[]){if(l.source!==n)continue;const c=l.target*yA+36;Hl(a,c,Mi(e,n)),r.push({offset:c*4,size:16})}}return xA(r)}function ha(i){return i.materials[0]}function Ua(i){return ha(i).displacementMap}function DA(i){return i.materials[0].displacementScale}const zr=new WeakMap;let Td=1;const Fs=new WeakMap;function zs(i){let e=Fs.get(i);return e==null&&(e=Td++,Fs.set(i,e)),e}function La(i){const e=i.image;return[zs(i.source??i),zs(e),i.version,e.width,e.height].join("|")}const oA=new Map;function Oa(i){const e=i.geometry,t=ha(i),A=t?.displacementMap;if(!t)return;const a=DA(i);if(A&&(a!==0||t.displacementBias!==0))return["displacement",e.version,La(A),+A.flipY,A.uvScale.join(","),A.uvOffset.join(","),A.uvChannel,A.wrapS,A.wrapT,A.colorSpace,a,t.displacementBias,t.displacementUvProjectionScale,t.displacementUvProjection].join("|")}function Rd(i){const e=Oa(i);if(e==null)return i.geometry;const t=zr.get(i.geometry)?.get(e);if(!t){const A=new oi(i.geometry);return A.dynamic=i.geometry.dynamic,A.version=i.geometry.version,Ud(i,A)}return t}function Ud(i,e){const t=Oa(i);if(t==null)return i.geometry;let A=zr.get(i.geometry);return A||(A=new Map,zr.set(i.geometry,A)),A.size>=4&&!A.has(t)&&A.clear(),A.set(t,e),e}function CA(i){return Rd(i)??i.geometry}function Ld(i,e){const t=e.width;let A,a,r;if(jt(e))A=e.data,a=Math.max(1,Math.floor(e.data.length/(e.width*e.height))),r=e.data instanceof Uint8Array||e.data instanceof Uint8ClampedArray?s=>s:s=>Math.round(Math.min(Math.max(s,0),1)*255);else{const n=hi(),s=n.getContext("2d");if(!s)throw new Error("The displacement texture is not CPU-readable.");if(n.width=t,n.height=t,IA(e))throw new Error("ProceduralSky is only supported as an environment or background.");s.drawImage(e,0,0,t,t),A=s.getImageData(0,0,t,t).data,a=4,r=o=>o}return wd(t,a,n=>r(A[n]))}function Od(i,e,t){const A=i.indexArray,a=i.uv?.array,r=t.displacementUvProjection;if(!e)return;if(!a&&r==="none")throw new Error("UV displacement requires texture coordinates; use triplanar, spherical, or cylindrical projection for a UV-less mesh.");const n=e.image,s=e.flipY;if(!n.width||!n.height)return;const o=A.length/3,l=Ll(o);if(l)return l;const c=La(e);let f=oA.get(c);return f||(f=Ld(i,n),oA.size>=4&&oA.delete(oA.keys().next().value),oA.set(c,f)),yd(i,f,n.width,s,t)}const ks=new WeakSet;function Fd(i){for(const{geometry:e,materials:t}of i)!e.tangent&&!ks.has(e)&&t.some(A=>A.anisotropyMap||A.specularAnisotropyRotation!==0||A.coatAnisotropyRotation!==0||A.specularAnisotropyModel==="gltf"&&A.specularAnisotropy>0)&&(console.warn("MuTracer: anisotropy direction has no vertex tangent; deriving a frame from the selected UV set with a stable fallback for degenerate UVs."),ks.add(e)),e.position?.array.length&&(e.normal||Pn(e),!e.tangent&&e.uv&&Vo(e))}function Vl(i,e=!0){const t=e?CA(i):i.geometry;return t.normal||Pn(t),!t.tangent&&t.uv&&Vo(t),t}function ql(i){const e=Vl(i),t=Ua(i),A=t?DA(i):0,a=A!==0?Od(e,t,ha(i)):void 0,r=t?ha(i).displacementBias:0;return{geometry:Bd(e,r),displacementScale:A,trianglesDisplacement:a}}function kr(i,e){return!!i.geometry.position?.array.length&&!i.geometry.dynamic&&(!He(CA(i))||!!e&&!ad(CA(i),e))}function zd(i,e){const t=Ua(i);return{geometry:i.geometry,version:i.geometry.version,cacheKey:Oa(i),bvh:He(e),displacementMap:t,displacementScale:DA(i),displacementTextureKey:t?La(t):void 0}}function Ns(i,e,t){return i.geometry===t.geometry&&i.geometry.version===t.version&&Oa(i)===t.cacheKey&&He(e)===t.bvh&&Ua(i)===t.displacementMap&&DA(i)===t.displacementScale&&(!t.displacementMap||La(t.displacementMap)===t.displacementTextureKey)}function kd(i,e=!0){const t=Vl(i,e),A=e&&Ua(i)?DA(i):0;if(t.dynamic&&He(t)?.builder!=="builtin"&&Yt(t,void 0),!He(t)){const a=e?ql(i):{geometry:t,displacementScale:A,trianglesDisplacement:void 0};Yt(t,Ra(a.geometry,a.displacementScale,a.trianglesDisplacement))}return{geometry:t,displacementScale:A}}function Jl(i,e={}){return vd(i,t=>kd(t,e.displacement!==!1))}function $l(i,e,t){const A=new Set;if(Array.isArray(e))return A;let a=0,r=0;for(const{mesh:n}of i){const s=ri(n),o=a+s;for(;r<e.length&&e.sourceIndices[r]<o;){if(t.has(n)){const l=e.sourceIndices[r]-a,c=n instanceof rt?n.colors:void 0;for(let f=0;f<3;f++)e.colors[r*3+f]=c?.[l*3+f]??1;A.add(r)}r++}a=o}return A}async function Nd(i,e){const t={geometryCount:0,bvhTimeMs:0,failedMeshes:[],workerUnavailable:!1,tinyBvhUnavailable:!1},A=new Map;for(const f of i){if(!f.geometry.position?.array.length||f.geometry.dynamic)continue;const p=CA(f);if(!(A.has(p)||!kr(f,e.config??e)&&!e.rebuild))try{A.set(p,{mesh:f,snapshot:zd(f,p)})}catch{t.failedMeshes.push(f)}}const a=e.useWorker?e.workerPool??new gn(1):void 0;async function r(f,p,h){const{geometry:u,displacementScale:d,trianglesDisplacement:m}=f;let v;if(h)v=await ju(u,d,m,p,p==="tinybvh"?e.layout:"bvh2",e.spatialSplits,a);else if(p==="tinybvh"){const{buildTinyBvh:g}=await Mo(async()=>{const{buildTinyBvh:w}=await import("./TinyBvhBuilder--dIW-JEv.js");return{buildTinyBvh:w}},__vite__mapDeps([0,1,2,3]),import.meta.url);v=await g(u,d,m,e.layout,e.spatialSplits)}else{const g=performance.now();v={...Ra(u,d,m),bvhTimeMs:performance.now()-g}}if(p==="tinybvh"&&(v.builder!=="tinybvh"||!v.buffer.byteLength))throw new Error("TinyBVH did not build every scene geometry.");return t.bvhTimeMs+=v.bvhTimeMs??0,v}async function n(f){let p=e.builder,h=e.useWorker&&!t.workerUnavailable;for(;;){if(e.isCancelled?.())throw new mA;try{return await r(f,p,h)}catch(u){if(u instanceof mA)throw u;if(u instanceof xi&&h)t.workerUnavailable=!0,h=!1;else if(p==="tinybvh")t.tinyBvhUnavailable=!0,p="builtin",h=e.useWorker&&!t.workerUnavailable;else throw u}}}let s=0;const o=[...A].sort(([f],[p])=>(p.indices?.array.length??0)-(f.indices?.array.length??0));let l=0;async function c(){for(;l<o.length&&!e.isCancelled?.();){const[f,{mesh:p,snapshot:h}]=o[l++];try{if(!Ns(p,f,h))continue;const u=ql(p),d=await n(u);!e.isCancelled?.()&&Ns(p,f,h)&&(Yt(f,d,e.config??e),t.geometryCount++)}catch(u){u instanceof mA||t.failedMeshes.push(p)}finally{if(!e.isCancelled?.())try{e.onProgress?.(++s/A.size)}catch{}}}}try{await Promise.allSettled(Array.from({length:Math.min(a?.size??1,A.size)},c))}finally{e.workerPool||a?.dispose()}return t}const Gt=7,Kl=Gt**2;function Dn(i,e){if(![i.x,i.y,i.size,e].every(Number.isFinite)||i.x<0||i.x>1||i.y<0||i.y>1||i.size<0||e<=0)throw new RangeError("Depth sampling requires a viewport center in 0..1, a non-negative size and a positive aspect.");return new Float32Array([i.x,1-i.y,i.size/e,i.size])}function Xl(i){const e=new Float32Array(Kl);for(let t=0;t<e.length;t++)e[t]=i[t*4];return e}const Zl=`
fn linearToSrgb(color: vec3f) -> vec3f {
let linear = max(color, vec3f(0.0));
let low = linear * 12.92;
let high = 1.055 * pow(linear, vec3f(1.0 / 2.4)) - 0.055;
return select(high, low, linear <= vec3f(0.0031308));
}
`,Gd=`

fn ky(color: vec3f) -> vec3f {
return clamp(color, vec3f(0.0), vec3f(1.0));
}
fn jf(color: vec3f) -> vec3f {
return clamp(color / (vec3f(1.0) + color), vec3f(0.0), vec3f(1.0));
}
fn kj(jR: vec3f) -> vec3f {
let color = max(vec3f(0.0), jR - 0.004);
return pow((color * (6.2 * color + 0.5)) /
(color * (6.2 * color + 1.7) + 0.06), vec3f(2.2));
}
fn pH(value: vec3f) -> vec3f {
let lv = value * (value + 0.0245786) - 0.000090537;
let aq = value * (0.983729 * value + 0.4329510) + 0.238081;
return lv / aq;
}
fn mh(jR: vec3f) -> vec3f {
let qs = mat3x3f(
vec3f(0.59719, 0.07600, 0.02840),
vec3f(0.35458, 0.90834, 0.13383),
vec3f(0.04823, 0.01566, 0.83777)
);
let outputMatrix = mat3x3f(
vec3f(1.60475, -0.10208, -0.00327),
vec3f(-0.53108, 1.10813, -0.07276),
vec3f(-0.07367, -0.00605, 1.07602)
);
let color = qs * (jR / 0.6);
return clamp(outputMatrix * pH(color), vec3f(0.0), vec3f(1.0));
}
fn gh(value: vec3f) -> vec3f {
let nM = value * value;
let rR = nM * nM;
return 15.5 * rR * nM - 40.14 * rR * value
+ 31.96 * rR - 6.868 * nM * value
+ 0.4298 * nM + 0.1191 * value - 0.00232;
}
fn mM(jR: vec3f) -> vec3f {
let nP = mat3x3f(
vec3f(1.6605, -0.1246, -0.0182),
vec3f(-0.5876, 1.1329, -0.1006),
vec3f(-0.0728, -0.0083, 1.1187)
);
let nQ = mat3x3f(
vec3f(0.6274, 0.0691, 0.0164),
vec3f(0.3293, 0.9195, 0.0880),
vec3f(0.0433, 0.0113, 0.8956)
);
let qu = mat3x3f(
vec3f(0.856627153315983, 0.137318972929847, 0.11189821299995),
vec3f(0.0951212405381588, 0.761241990602591, 0.0767994186031903),
vec3f(0.0482516061458583, 0.101439036467562, 0.811302368396859)
);
let pt = mat3x3f(
vec3f(1.1271005818144368, -0.1413297634984383, -0.14132976349843826),
vec3f(-0.11060664309660323, 1.157823702216272, -0.11060664309660294),
vec3f(-0.016493938717834573, -0.016493938717834257, 1.2519364065950405)
);
var color = qu * (nQ * jR);
color = clamp((log2(max(color, vec3f(1e-10))) + 12.47393) / 16.5, vec3f(0.0), vec3f(1.0));
color = pt * gh(color);
color = pow(max(color, vec3f(0.0)), vec3f(2.2));
return clamp(nP * color, vec3f(0.0), vec3f(1.0));
}
fn cp(color: vec3f) -> vec3f {
let toneMappingMode = i32(toneMappingParams.x);
if (toneMappingMode == 1) { return mh(color); }
if (toneMappingMode == 2) { return kj(color); }
if (toneMappingMode == 3) { return jf(color); }
if (toneMappingMode == 4) { return ky(color); }
return mM(color);
}
${Zl}
fn gq(jR: vec3f) -> vec3f {
let contrast = colorGradingParams.x;
let saturation = colorGradingParams.y;
let temperature = colorGradingParams.z;
let tint = colorGradingParams.w;
let uH = vec3f(
1.0 + temperature * 0.16 + tint * 0.04,
1.0 - tint * 0.12,
1.0 - temperature * 0.16 + tint * 0.04
);
var color = max(jR * uH, vec3f(0.0));
color = max((color - 0.18) * contrast + 0.18, vec3f(0.0));
let luminance = dot(color, vec3f(0.2126, 0.7152, 0.0722));
return max(mix(vec3f(luminance), color, saturation), vec3f(0.0));
}
`;function Hd(i="srgb"){return`

var finalColor = load_colorTex(uv, 0);
var jI = vec4(0.0);
if (bloomIntensity > 0.0) {
jI = load_bloomTex(uv, 0) * bloomIntensity;
finalColor = vec4f(finalColor.rgb + jI.rgb, finalColor.a);
}

var gradedColor = gq(finalColor.rgb * exposure);
let ja = smoothstep(0.2, 0.72, distance(vec2f(uv) / vec2f(colorTexRegion()), vec2f(0.5)));
gradedColor *= 1.0 - toneMappingParams.y * ja;
let gQ = hdrOutputEnabled > 0.5;
if (!gQ) {
gradedColor = cp(gradedColor);
}
let mZ = select(
${i==="srgb"?"linearToSrgb(gradedColor)":"pow(max(gradedColor, vec3f(0.0)), vec3f(1.0 / 2.2))"},
linearToSrgb(gradedColor),
gQ
);
var oV = mZ;
if (flatBackgroundColor.a > 0.5) {
let jD = clamp(
load_flatBackgroundMaskTex(uv, 0).a,
0.0,
1.0
);
let pX = linearToSrgb(max(flatBackgroundColor.rgb, vec3f(0.0)));
oV = mix(pX, mZ, jD);
if (bloomIntensity > 0.0) {
var unbloomedColor = gq(
max(finalColor.rgb - jI.rgb, vec3f(0.0))
* exposure
);
unbloomedColor *= 1.0 - toneMappingParams.y * ja;
if (!gQ) {
unbloomedColor = cp(unbloomedColor);
}
let sG = select(
${i==="srgb"?"linearToSrgb(unbloomedColor)":"pow(max(unbloomedColor, vec3f(0.0)), vec3f(1.0 / 2.2))"},
linearToSrgb(unbloomedColor),
gQ
);
oV += max(mZ - sG, vec3f(0.0))
* (1.0 - jD);
}
}
finalColor = vec4f(oV, finalColor.a);
if (bloomIntensity > 0.0) {
finalColor.a = max(finalColor.a, min(dot(jI.rgb, vec3f(0.2125, 0.7154, 0.0721)), 1.0));
}

if (shadowCatcherEnabled > 0.5) {
let shadowCatcher = load_shadowCatcherTex(uv, 0);
let coverage = clamp(shadowCatcher.r, 0.0, 1.0);
let opacity = max(clamp(shadowCatcher.a / max(coverage, 0.000001), 0.0, 1.0) - (1.0 - shadowCatcherAlpha), 0.0);
if (coverage > 0.0 || flatBackgroundColor.a > 0.5) {
let foreground = load_foregroundTex(uv, 0);
let background = load_catcherBackgroundTex(uv, 0);




let ln = select(0.0, clamp(background.a - coverage, 0.0, 1.0 - coverage), flatBackgroundColor.a > 0.5);
var foregroundColor = gq((foreground.rgb + jI.rgb) * exposure);
var backgroundColor = gq((background.rgb / max(background.a, 0.000001) + jI.rgb) * exposure);
foregroundColor *= 1.0 - toneMappingParams.y * ja;
backgroundColor *= 1.0 - toneMappingParams.y * ja;
if (!gQ) {
foregroundColor = cp(foregroundColor);
backgroundColor = cp(backgroundColor);
}
foregroundColor = select(${i==="srgb"?"linearToSrgb(foregroundColor)":"pow(max(foregroundColor, vec3f(0.0)), vec3f(1.0 / 2.2))"}, linearToSrgb(foregroundColor), gQ);
backgroundColor = select(${i==="srgb"?"linearToSrgb(backgroundColor)":"pow(max(backgroundColor, vec3f(0.0)), vec3f(1.0 / 2.2))"}, linearToSrgb(backgroundColor), gQ);
if (flatBackgroundColor.a > 0.5) {
var unbloomedBackground = gq(background.rgb / max(background.a, 0.000001) * exposure);
unbloomedBackground *= 1.0 - toneMappingParams.y * ja;
if (!gQ) { unbloomedBackground = cp(unbloomedBackground); }
let nd = select(${i==="srgb"?"linearToSrgb(unbloomedBackground)":"pow(max(unbloomedBackground, vec3f(0.0)), vec3f(1.0 / 2.2))"}, linearToSrgb(unbloomedBackground), gQ);
let vL = select(vec3f(0.0), max(backgroundColor - nd, vec3f(0.0)), bloomIntensity > 0.0);
backgroundColor = linearToSrgb(max(flatBackgroundColor.rgb, vec3f(0.0))) + vL;
}


let gf = coverage * opacity;
let mR = clamp(dot(jI.rgb, vec3f(0.2125, 0.7154, 0.0721)), 0.0, 1.0);
let hJ = max(foreground.a, mR * (1.0 - coverage - ln));
let jz = max(background.a, mR * coverage);
let kX = (jz - ln) * (1.0 - opacity) + ln;
let alpha = hJ + kX + gf;
let premultiplied = foregroundColor * hJ
+ backgroundColor * kX
+ shadowCatcherColor * gf;
finalColor = vec4f(premultiplied / max(alpha, 0.000001), alpha);
}
}

output.color = finalColor;


`}const Wd=Hd();function jd(i="output.denoiseColor",e="finalColor",t="srgb"){const A="select(pow((encoded + 0.055) / 1.055, vec3f(2.4)), encoded / 12.92, encoded <= vec3f(0.04045))";return`
let encoded = max(${e}.rgb, vec3f(0.0));
let um = ${t==="srgb"?A:`select(pow(encoded, vec3f(2.2)), ${A}, gQ)`};
${i} = vec4f(um, ${e}.a);

`}function Yd(i="output.denoiseAlbedo"){return`



let rawAlbedo = load_flatBackgroundMaskTex(uv, 0);
var pS = rawAlbedo.rgb;
if (shadowCatcherEnabled > 0.5 && flatBackgroundColor.a < 0.5) {
let coverage = clamp(load_shadowCatcherTex(uv, 0).r, 0.0, 1.0);
let background = load_catcherBackgroundTex(uv, 0);
if (coverage > 0.0 && background.a > 0.0) {
var iO = gq(background.rgb / background.a * exposure);
iO *= 1.0 - toneMappingParams.y * ja;
if (!gQ) { iO = cp(iO); }



let sA = clamp(background.a, 0.0, coverage);
pS += sA * (clamp(iO, vec3f(0.0), vec3f(1.0)) - vec3f(1.0));
}
}
${i} = vec4f(clamp(pS, vec3f(0.0), vec3f(1.0)), rawAlbedo.a);
`}const Vd=jd()+Yd();function qd(i="srgb"){return`
let denoised = load_colorTex(uv, 0);



let alpha = select(load_composedTex(uv, 0).a, clamp(denoised.a, 0.0, 1.0), denoisedAlpha > 0.5);
let linear = max(denoised.rgb, vec3f(0.0));
let encoded = ${i==="srgb"?"linearToSrgb(linear)":"select(pow(linear, vec3f(1.0 / 2.2)), linearToSrgb(linear), hdrOutputEnabled > 0.5)"};
output.color = vec4f(select(vec3f(0.0), encoded, alpha > 0.0), alpha);
`}const Jd=qd(),ec=`
fn fK(color: f32, count: f32, hit: f32, ur: f32, rgb: bool) -> f32 {
if (count <= 0.0) {
return 0.0;
}
let total = max(count, ur);
let divisor = select(total, hit, (rgb && (hit > 0.0)));
return (color / divisor);
}
fn jQ(color: f32, coverage: f32, flat: bool, rgb: bool) -> f32 {
if ((flat && rgb) && (coverage > 0.0)) {
return (color * coverage);
}
return color;
}
`,gr=`
fn sT(value: vec3f) -> vec3f {
let linear = clamp(value, vec3f(0.0), vec3f(1.0));
return select(1.055 * pow(linear, vec3f(1.0 / 2.4)) - 0.055,
12.92 * linear, linear <= vec3f(0.0031308));
}
fn sS(value: vec3f) -> vec3f {
let encoded = clamp(value, vec3f(0.0), vec3f(1.0));
return select(pow((encoded + 0.055) / 1.055, vec3f(2.4)),
encoded / 12.92, encoded <= vec3f(0.04045));
}
fn rL(value: vec3f) -> vec3f {
return clamp(value, vec3f(0.0), vec3f(1.0));
}
`;function $d(i){return`
struct DisplayAovAccum { geometry: vec4f, position: vec4f, diffuse: vec4f, specular: vec4f, }
struct DisplayAovCenter { identity: vec4u, motion: vec4f, }
struct DisplayAovParams { sizeKind: vec4u, mapping: vec4f, flags: vec4u, }
@group(0) @binding(0) var<storage, read> accumulation: array<DisplayAovAccum>;
@group(0) @binding(1) var<storage, read> center: array<DisplayAovCenter>;
@group(0) @binding(2) var image: texture_storage_2d<${i}, write>;
@group(0) @binding(3) var<uniform> params: DisplayAovParams;

fn tF(input: u32) -> u32 {
var v = input;
v = (v ^ (v >> 16u)) * 0x7feb352du;
v = (v ^ (v >> 15u)) * 0x846ca68bu;
return v ^ (v >> 16u);
}
fn tG(rgb: vec3f) -> vec3f {
return select(1.055 * pow(max(rgb, vec3f(0.0)), vec3f(1.0 / 2.4)) - 0.055,
12.92 * rgb, rgb <= vec3f(0.0031308));
}
fn sE(rgb: vec3f) -> vec3f {
return select(pow((rgb + 0.055) / 1.055, vec3f(2.4)), rgb / 12.92,
rgb <= vec3f(0.04045));
}
@compute @workgroup_size(8, 8)
fn main(@builtin(global_invocation_id) id: vec3u) {
let size = params.sizeKind.xy;
if (any(id.xy >= size)) { return; }
let index = id.x + (size.y - 1u - id.y) * size.x;
let kind = params.sizeKind.w;
let pixel = accumulation[index];
let hit = pixel.position.w;
var color = vec3f(0.0);
var alpha = hit / f32(max(params.sizeKind.z, 1u));
let inv = 1.0 / max(hit, 1.0);
if (kind == 0u) {
color = vec3f(clamp((pixel.geometry.x * inv - params.mapping.x) /
(params.mapping.y - params.mapping.x), 0.0, 1.0));
} else if (kind == 1u) {
color = clamp(pixel.position.xyz * inv / params.mapping.z * 0.5 + 0.5,
vec3f(0.0), vec3f(1.0));
} else if (kind == 2u) {
color = clamp(pixel.geometry.yzw * inv, vec3f(0.0), vec3f(1.0));
} else if (kind == 3u || kind == 4u) {
let r = select(pixel.diffuse, pixel.specular, kind == 4u);
alpha = r.w / f32(max(params.sizeKind.z, 1u));
color = tG(clamp(r.xyz / max(r.w, 1.0), vec3f(0.0), vec3f(1.0)));
} else if (kind == 5u) {
let identity = center[index].identity;
alpha = select(1.0, 0.0, identity.x == 0xffffffffu);
let hash = tF(identity[params.flags.x]);
color = 0.2 + 0.8 * vec3f(f32(hash & 255u), f32((hash >> 8u) & 255u),
f32((hash >> 16u) & 255u)) / 255.0;
} else {
let m = center[index].motion;
alpha = select(0.0, 1.0, m.w == 3.0);
let gR = length(m.xy);
var hue = 0.0;
if (gR > 0.0) { hue = fract(atan2(m.y, m.x) / 6.28318530718 + 1.0); }
let p = abs(fract(vec3f(hue) + vec3f(0.0, 2.0 / 3.0, 1.0 / 3.0)) * 6.0 - 3.0);
color = clamp(p - 1.0, vec3f(0.0), vec3f(1.0)) * clamp(gR / params.mapping.w, 0.0, 1.0);
}
if (alpha <= 0.0) { color = vec3f(0.0); }
if (params.flags.y != 0u) { color = sE(color); }
textureStore(image, vec2i(id.xy), vec4f(color, clamp(alpha, 0.0, 1.0)));
}
`}const Kd=`
struct AovResolvedAccumulation { geometry: vec4f, position: vec4f, diffuse: vec4f, specular: vec4f, }
struct AovResolvedCenter { identity: vec4u, motion: vec4f, }
@group(0) @binding(0) var<storage,read> accumulation: array<AovResolvedAccumulation>;
@group(0) @binding(1) var<storage,read> center: array<AovResolvedCenter>;
@group(0) @binding(3) var<uniform> parameters: vec4u;
fn ox(source: u32, kind: u32) -> vec4u {
if(kind==5u){return center[source].identity;}
var value=vec4f(0.0);
if(kind==6u){let motion=center[source].motion;value=vec4f(motion.xy,0.0,motion.w);}
else{
let pixel=accumulation[source];let hits=pixel.position.w;
let scale=select(0.0,1.0/max(hits,1.0),hits>0.0);let coverage=hits/f32(max(parameters.z,1u));
if(kind==0u){value=vec4f(pixel.geometry.x*scale,0.0,0.0,coverage);}
else if(kind==1u){value=vec4f(pixel.position.xyz*scale,coverage);}
else if(kind==2u){value=vec4f(pixel.geometry.yzw*scale,coverage);}
else{let reflectance=select(pixel.diffuse,pixel.specular,kind==4u);
let inv=select(0.0,1.0/max(reflectance.w,1.0),reflectance.w>0.0);
value=vec4f(reflectance.xyz*inv,reflectance.w/f32(max(parameters.z,1u)));
}
}
return bitcast<vec4u>(value);
}
`,Nr=6,tc=i=>i===0?2:i+3;function Xd(i){if(!i.length||i.length>Nr)throw new RangeError("Invalid AOV snapshot batch size");return Kd+i.map((e,t)=>`@group(0) @binding(${tc(t)}) var<storage,read_write> output${t}: array<vec4u>;`).join(`
`)+`
@compute @workgroup_size(8,8)
fn main(@builtin(global_invocation_id) id: vec3u) {
let width=parameters.x;let height=parameters.y;
if(id.x>=width||id.y>=height){return;}
let index=id.x+id.y*width;
let source=id.x+(height-1u-id.y)*width;
${i.map((e,t)=>`output${t}[index]=ox(source,${eA.indexOf(e)}u);`).join(`
  `)}
}
`}class Zd{device;history=new Go;width=0;height=0;samples=0;centerReady=!1;accumulation;center;previousCenter;scene;frame;displayPipeline;displayTexture;resolvePipelines=new Map;scenePrimitives;scenePrimitiveOffset=0;snapshotGeneration=0;snapshotPool=new Map;snapshotLeases=new WeakMap;snapshotBuffers=new Set;constructor(e){this.device=e}reset(){if(this.centerReady&&this.center&&this.previousCenter){const e=this.device.createCommandEncoder();e.copyBufferToBuffer(this.center,0,this.previousCenter,0,this.center.size),this.device.queue.submit([e.finish()])}this.samples=0,this.centerReady=!1,this.frame=void 0}resize(e,t){if(e===this.width&&t===this.height)return;if(e*t*rA.accumulatedBytes>this.device.limits.maxStorageBufferBindingSize||e*t*rA.accumulatedBytes>this.device.limits.maxBufferSize)throw new RangeError("AOV accumulation exceeds device buffer limits");this.dispose(),this.history.clear(),this.reset(),this.width=e,this.height=t;const A=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST|GPUBufferUsage.COPY_SRC;this.accumulation=this.device.createBuffer({label:"AOV accumulation",size:e*t*rA.accumulatedBytes,usage:A}),this.previousCenter=this.device.createBuffer({label:"Previous AOV center",size:e*t*rA.centerBytes,usage:A}),this.center=this.device.createBuffer({label:"AOV center",size:e*t*rA.centerBytes,usage:A})}setScene(e,t){const A=e.byteLength+(t?.byteLength??0);if(A>this.device.limits.maxStorageBufferBindingSize)throw new RangeError("AOV scene metadata exceeds device storage binding limit");let a=!1;(!this.scene||this.scene.size<A)&&(this.scene?.destroy(),this.scene=this.device.createBuffer({label:"AOV identities/history",size:Math.max(16,A),usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),a=!0),this.device.queue.writeBuffer(this.scene,0,e),t&&(a||this.scenePrimitives!==t||this.scenePrimitiveOffset!==e.byteLength)&&this.device.queue.writeBuffer(this.scene,e.byteLength,t),this.scenePrimitives=t,this.scenePrimitiveOffset=e.byteLength}get bytes(){return(this.accumulation?.size??0)+(this.center?.size??0)+(this.previousCenter?.size??0)+(this.scene?.size??0)+(this.displayTexture?this.width*this.height*8:0)+[...this.snapshotBuffers].reduce((e,t)=>e+t.size,0)}snapshot(e){if(!this.accumulation||!this.center||!this.samples)throw new Error("AOV output is not ready");const t=this.device;ht(e);const A=eA.filter(s=>e.includes(s)),a=[];for(let s=0;s<A.length;s+=Nr){const o=A.slice(s,s+Nr),l=o.join(",");let c=this.resolvePipelines.get(l);c||(c=t.createComputePipeline({label:"AOV snapshot",layout:"auto",compute:{module:t.createShaderModule({code:Xd(o)}),entryPoint:"main"}}),this.resolvePipelines.set(l,c)),a.push({kinds:o,pipeline:c})}const r={};if(!a.length)return r;const n=t.createBuffer({size:16,usage:GPUBufferUsage.UNIFORM,mappedAtCreation:!0});new Uint32Array(n.getMappedRange()).set([this.width,this.height,this.samples,0]),n.unmap();try{const s=t.createCommandEncoder({label:"AOV snapshot"}),o=s.beginComputePass();for(const{kinds:l,pipeline:c}of a){const f=[{binding:0,resource:{buffer:this.accumulation}},{binding:1,resource:{buffer:this.center}},{binding:3,resource:{buffer:n}}];l.forEach((p,h)=>{const u=this.snapshotPool.get(p)??t.createBuffer({label:`Custom ${p} input`,size:this.width*this.height*16,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST});this.snapshotPool.delete(p),this.snapshotLeases.set(u,{kind:p,generation:this.snapshotGeneration}),this.snapshotBuffers.add(u),r[p]=u,f.push({binding:tc(h),resource:{buffer:u}})}),o.setPipeline(c),o.setBindGroup(0,t.createBindGroup({layout:c.getBindGroupLayout(0),entries:f})),o.dispatchWorkgroups(Math.ceil(this.width/8),Math.ceil(this.height/8))}return o.end(),t.queue.submit([s.finish()]),r}catch(s){throw Object.values(r).forEach(o=>{o&&(this.snapshotLeases.delete(o),this.snapshotBuffers.delete(o),o.destroy())}),s}finally{n.destroy()}}releaseSnapshot(e){for(const t of Object.values(e)){if(!t)continue;const A=this.snapshotLeases.get(t);A&&(this.snapshotLeases.delete(t),A.generation===this.snapshotGeneration&&!this.snapshotPool.has(A.kind)?this.snapshotPool.set(A.kind,t):(this.snapshotBuffers.delete(t),t.destroy()))}}visualize(e,t,A){if(!this.accumulation||!this.center||!this.samples)throw new Error("AOV output is not ready");const a=this.device;this.displayPipeline??=a.createComputePipeline({label:"AOV visualization",layout:"auto",compute:{module:a.createShaderModule({code:$d("rgba16float")}),entryPoint:"main"}}),(!this.displayTexture||this.displayTexture.width!==this.width||this.displayTexture.height!==this.height)&&(this.displayTexture?.destroy(),this.displayTexture=a.createTexture({label:"AOV display image",size:[this.width,this.height],format:"rgba16float",usage:GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_SRC}));const r=Xu(this.width,this.height,this.samples,e,t,A),n=a.createBuffer({size:48,usage:GPUBufferUsage.UNIFORM,mappedAtCreation:!0});new Uint32Array(n.getMappedRange()).set(r),n.unmap();const s=a.createBindGroup({layout:this.displayPipeline.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.accumulation}},{binding:1,resource:{buffer:this.center}},{binding:2,resource:this.displayTexture.createView()},{binding:3,resource:{buffer:n}}]}),o=a.createCommandEncoder(),l=o.beginComputePass();return l.setPipeline(this.displayPipeline),l.setBindGroup(0,s),l.dispatchWorkgroups(Math.ceil(this.width/8),Math.ceil(this.height/8)),l.end(),a.queue.submit([o.finish()]),n.destroy(),this.displayTexture}async read(e){const t=e==="id"||e==="motion",A=t?this.center:this.accumulation,a=this.device.createBuffer({size:A.size,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST});try{const r=this.device.createCommandEncoder();r.copyBufferToBuffer(A,0,a,0,A.size),this.device.queue.submit([r.finish()]),await a.mapAsync(GPUMapMode.READ);const n=new Float32Array(a.getMappedRange()),s=new Uint32Array(n.buffer),o=e==="id"?new Uint32Array(this.width*this.height*4):new Float32Array(this.width*this.height*4);for(let l=0;l<this.height;l++)for(let c=0;c<this.width;c++){const f=(l*this.width+c)*4,p=(this.height-1-l)*this.width+c,h=p*(t?8:16);if(e==="id")o.set(s.subarray(h,h+4),f);else if(e==="motion")o.set([n[h+4],n[h+5],0,n[h+7]],f);else{const u=n[h+7],d=u/Math.max(1,this.samples),m=u>0?1/u:0;if(e==="depth")o.set([n[h]*m,0,0,d],f);else if(e==="position")o.set([n[h+4]*m,n[h+5]*m,n[h+6]*m,d],f);else if(e==="roughness")o.set([n[h+1]*m,n[h+2]*m,n[h+3]*m,d],f);else{const v=e==="diffuseAlbedo"?h+8:h+12,g=n[v+3],w=g>0?1/g:0;o.set([n[v]*w,n[v+1]*w,n[v+2]*w,g/Math.max(1,this.samples)],f)}}}return{width:this.width,height:this.height,data:o}}finally{a.mapState==="mapped"&&a.unmap(),a.destroy()}}dispose(){const e=this.displayTexture;this.displayTexture=void 0,this.scenePrimitives=void 0,this.scenePrimitiveOffset=0,this.snapshotGeneration++;const t=[...this.snapshotPool.values()];this.snapshotPool.clear(),t.forEach(a=>this.snapshotBuffers.delete(a));const A=[this.accumulation,this.center,this.scene,this.previousCenter,...t];this.accumulation=this.center=this.scene=this.previousCenter=void 0,this.device.queue.onSubmittedWorkDone().catch(()=>{}).then(()=>{e?.destroy(),A.forEach(a=>a?.destroy())})}}function Xi(i){if(typeof requestAnimationFrame=="function"){const t=requestAnimationFrame(i);return()=>cancelAnimationFrame(t)}const e=setTimeout(()=>i(performance.now()),16);return()=>clearTimeout(e)}function TA(i){if(!i)return 0;const e=i.format==="rgba32float"?16:i.format==="rgba16float"?8:(i.format==="r32float",4);return i.width*i.height*i.depthOrArrayLayers*e}class eh{device;textures=[];image;constructor(e){this.device=e}get output(){return this.image}reset(){this.image=void 0}getMemoryBytes(){return this.textures.reduce((e,t)=>e+TA(t),0)}retire(e){e.length&&this.device.queue.onSubmittedWorkDone().catch(()=>{}).then(()=>e.forEach(t=>t.destroy()))}dispose(){this.reset(),this.retire(this.textures),this.textures=[]}run(e,t,A){if(this.reset(),!t.length)return;(this.textures.length===0||this.textures[0].width!==e.width||this.textures[0].height!==e.height||this.textures[0].format!==e.format)&&(this.retire(this.textures),this.textures=Array.from({length:2},(n,s)=>this.device.createTexture({label:`Display post-process ${s}`,size:{width:e.width,height:e.height},format:e.format,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.COPY_SRC|GPUTextureUsage.COPY_DST})));const a=this.device.createCommandEncoder();let r=e;for(let n=0;n<t.length;n++){const s=this.textures[n%2];t[n]({device:this.device,encoder:a,input:r,output:s,width:e.width,height:e.height,render:A}),r=s}this.device.queue.submit([a.finish()]),this.image=r}}const th=`
let original = load_originalTex(uv, 0).rgb;
let filtered = load_filteredTex(uv, 0).rgb;
let foreground = load_foregroundTex(uv, 0);
let background = load_backgroundTex(uv, 0);

var ni = foreground;
var nh = background;
if (any(filtered != original)) {
let wa = abs(original) > vec3f(0.000001);
let aq = select(vec3f(1.0), original, wa);
let scale = select(vec3f(1.0), filtered / aq, wa);
let vD = select(filtered - original, vec3f(0.0), wa);
ni = vec4f(foreground.rgb * scale + vD, foreground.a);

nh = vec4f(background.rgb * scale + vD * background.a, background.a);
}
output.foreground = ni;
output.background = nh;
`,ih=`
if (globalId.x >= u32(imageSize.x) || globalId.y >= u32(imageSize.y)) { return; }
let index = globalId.x + globalId.y * u32(imageSize.x);
out_color[index] = vec4f(in_filtered[index].rgb, in_original[index].a);
`;class Ah{device;standardFormat;context;hdr=!1;compatibleHDR;constructor(e,t,A){this.device=t,this.standardFormat=A,this.context=e.getContext("webgpu"),this.context.configure({device:t,format:A,alphaMode:"premultiplied"})}get format(){return this.hdr?"rgba16float":this.standardFormat}get supportsHDR(){if(this.compatibleHDR!==void 0)return this.compatibleHDR;this.compatibleHDR=!1;let e=null;try{if(e=hi().getContext("webgpu"),!e)return!1;e.configure({device:this.device,format:"rgba16float",alphaMode:"premultiplied",colorSpace:"srgb",toneMapping:{mode:"extended"}});const t=e.getConfiguration?.();this.compatibleHDR=t?.format==="rgba16float"&&t.toneMapping?.mode==="extended"}catch{this.compatibleHDR=!1}finally{e?.unconfigure?.()}return this.compatibleHDR}configure(e){const t=e&&this.supportsHDR;t!==this.hdr&&(this.hdr=t,this.context.configure(t?{device:this.device,format:"rgba16float",alphaMode:"premultiplied",colorSpace:"srgb",toneMapping:{mode:"extended"}}:{device:this.device,format:this.standardFormat,alphaMode:"premultiplied"}))}dispose(){this.context.unconfigure?.()}}class vr{device;buffer;constructor(e){this.device=e}get(e,t=!1){if(!this.buffer||(t?this.buffer.size!==e:this.buffer.size<e)){const A=this.buffer;this.buffer=this.device.createBuffer({label:"Shared inference input",size:e,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST|GPUBufferUsage.COPY_SRC}),A&&this.device.queue.onSubmittedWorkDone().catch(()=>{}).then(()=>A.destroy())}return this.buffer}getMemoryBytes(){return this.buffer?.size??0}dispose(){this.buffer?.destroy()}}const ic=new WeakMap;function Tn(i,e,t){ic.set(i,{width:e,height:t})}function Ac(i){return ic.get(i)??{width:i.width,height:i.height}}class ah{device;texture;constructor(e){this.device=e}get(e,t){if(!this.texture||e>this.texture.width||t>this.texture.height){e=Math.max(e,this.texture?.width??0),t=Math.max(t,this.texture?.height??0);const A=this.texture;this.texture=this.device.createTexture({label:"Shared denoised conversion",size:{width:e,height:t},format:"rgba32float",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.COPY_SRC}),A&&this.device.queue.onSubmittedWorkDone().catch(()=>{}).then(()=>A.destroy())}return this.texture}setRegion(e,t){this.texture&&Tn(this.texture,e,t)}getMemoryBytes(){return TA(this.texture)}dispose(){this.texture?.destroy()}}class ac{release;constructor(e=t=>t()){this.release=e}resources=new Map;get(e,t){let A=this.resources.get(e);return A||(A=t(),A.reserveCapacity?.(),this.resources.set(e,A)),A}getMemoryBytes(){return Array.from(this.resources.values()).reduce((e,t)=>e+(t.getMemoryBytes?.()??0),0)}dispose(){const e=Array.from(this.resources.values());this.resources.clear(),this.release(()=>{for(const t of e)t.dispose()})}}class rh{queue;pendingMs=0;pending=new Set;constructor(e){this.queue=e}available(e){return Math.max(0,e-this.pendingMs)}whenAvailable(){return this.pending.values().next().value??Promise.resolve()}track(e){this.pendingMs+=e;const t=()=>{this.pendingMs=Math.max(0,this.pendingMs-e),this.pending.delete(A),this.pending.size||(this.pendingMs=0)},A=this.queue.onSubmittedWorkDone().then(t,t);this.pending.add(A)}}function rc(i,e,t=!1,A){const a=new Set,r=new Map;let n,s;return{getSharedMemoryBytes:()=>A?.getMemoryBytes()??0,createTarget(o){const l=e(),c={...l,get presentationComplete(){return l.presentationComplete},get presentationDenoised(){return l.presentationDenoised},label:o,configure(f){r.set(c,{...f}),l.configure(f)},activate(){n=c,t&&i.setBounce(Math.max(1,...Array.from(r.values(),f=>f.bounces))),l.activate()}};return c.synchronizeBackground(s),a.add(c),c},releaseTarget(o){a.delete(o)&&(r.delete(o),o.dispose())},setMeshes:(o,l)=>i.setMeshes(o,l),setLights:o=>i.setLights(o),setBackground(o){s=o,i.setBackground(o);for(const l of a)l.synchronizeBackground(o)},setTextureAtlasBudget:o=>i.setTextureAtlasBudget(o),async readDepthSamples(o,l){return i.setCamera(o),i.readDepthSamples(l,o.aspect)},getDiagnostics(){return{...i.getDiagnostics(),...n?.getDiagnostics(),targets:Array.from(a,o=>({label:o.label,...o.getMemory()}))}},dispose(){for(const o of a)o.dispose();a.clear(),r.clear(),i.dispose(),A?.dispose()}}}function nh(i,e,t=!1){return i.map((A,a)=>`
fn ${A}Region() -> vec2u {
return ${t?`imageRegions[${a}].xy`:`textureDimensions(${A})`};
}
fn load_${A}(pixel: vec2i, level: i32) -> vec4f {
${t?`if (any(pixel < vec2i(0)) || any(pixel >= vec2i(${A}Region()))) { return vec4f(0.0); }`:""}
return textureLoad(${A}, pixel, level);
}
${e.map(r=>`
fn sample_${A}_${r}(coord: vec2f) -> vec4f {
${t?`
let kH = textureDimensions(${A});
if (all(kH == ${A}Region())) { return textureSampleLevel(${A}, ${r}, coord, 0.0); }
let pixel = clamp(coord * vec2f(${A}Region()), vec2f(0.5), vec2f(${A}Region()) - vec2f(0.5));
return textureSampleLevel(${A}, ${r}, pixel / vec2f(kH), 0.0);`:`return textureSample(${A}, ${r}, coord);`}
}`).join("")}`).join("")}function sh(i,e=!1){return i.map(t=>`
ivec2 ${t}Region() {
return ${e?`${t}RegionSize`:`textureSize(${t}, 0)`};
}
vec4 load_${t}(ivec2 pixel, int level) {
${e?`if (any(lessThan(pixel, ivec2(0))) || any(greaterThanEqual(pixel, ${t}Region()))) return vec4(0.0);`:""}
return texelFetch(${t}, pixel, level);
}
vec4 sample_${t}(vec2 coord) {
${e?`
ivec2 kH = textureSize(${t}, 0);
if (all(equal(kH, ${t}Region()))) return texture(${t}, coord);
vec2 pixel = clamp(coord * vec2(${t}Region()), vec2(0.5), vec2(${t}Region()) - vec2(0.5));
return texture(${t}, pixel / vec2(kH));`:`return texture(${t}, coord);`}
}`).join("")}function vA(i,e=0,t=8){return Math.max(e,t,2**Math.ceil(Math.log2(Math.max(1,i))))}class nc{device;modules=new Map;moduleIds=new Map;bindGroupLayouts=new Map;layouts=new Map;pipelines=new Map;renderPipelines=new Map;computePipelines=new Map;ids=new WeakMap;nextId=0;constructor(e){this.device=e}id(e){let t=this.ids.get(e);return t===void 0&&(t=++this.nextId,this.ids.set(e,t)),t}remember(e,t,A,a){return e.delete(t),e.set(t,A),e.size>a&&e.delete(e.keys().next().value),A}createShaderModule(e){const t=e.code,A=this.remember(this.modules,t,this.modules.get(t)??this.device.createShaderModule(e),8),a=this.remember(this.moduleIds,t,this.moduleIds.get(t)??this.id(A),128);return this.ids.set(A,a),A}createBindGroupLayout(e){const t=Array.from(e.entries),A=JSON.stringify(t);return this.remember(this.bindGroupLayouts,A,this.bindGroupLayouts.get(A)??this.device.createBindGroupLayout({...e,entries:t}),32)}createPipelineLayout(e){const t=Array.from(e.bindGroupLayouts),{bindGroupLayouts:A,label:a,...r}=e,n=JSON.stringify([r,t.map(s=>s==null?null:this.id(s))]);return this.remember(this.layouts,n,this.layouts.get(n)??this.device.createPipelineLayout({...e,bindGroupLayouts:t}),16)}createComputePipelineAsync(e){const{compute:t,layout:A}=e,a=JSON.stringify([this.id(t.module),A==="auto"?"auto":this.id(A),t.entryPoint,Object.entries(t.constants??{}).sort(([n],[s])=>n.localeCompare(s))]);let r=this.pipelines.get(a);if(!r){r=this.device.createComputePipelineAsync(e);const n=r;n.catch(()=>{this.pipelines.get(a)===n&&this.pipelines.delete(a)})}return this.remember(this.pipelines,a,r,128)}createRenderPipeline(e){const{label:t,vertex:A,fragment:a,...r}=e,n=JSON.stringify([r,{...A,module:this.id(A.module)},a&&{...a,module:this.id(a.module)}]);return this.remember(this.renderPipelines,n,this.renderPipelines.get(n)??this.device.createRenderPipeline(e),128)}createComputePipeline(e){const{label:t,compute:A,...a}=e,r=JSON.stringify([a,{...A,module:this.id(A.module)}]);return this.remember(this.computePipelines,r,this.computePipelines.get(r)??this.device.createComputePipeline(e),128)}clear(){this.modules.clear(),this.moduleIds.clear(),this.bindGroupLayouts.clear(),this.layouts.clear(),this.pipelines.clear(),this.renderPipelines.clear(),this.computePipelines.clear()}}const Gs=new WeakMap;function bt(i){let e=Gs.get(i);return e||Gs.set(i,e=new nc(i)),e}const Gr=`
@vertex
fn main(
@builtin(vertex_index) vertexIndex: u32
) -> @builtin(position) vec4f {
const pos = array(
vec2(-1.0, -1.0), vec2(1.0, -1.0), vec2(-1.0, 1.0),
vec2(-1.0, 1.0), vec2(1.0, -1.0), vec2(1.0, 1.0),
);

return vec4<f32>(pos[vertexIndex], 0.0, 1.0);
}
`;function oh(i,e){return i.format===e.format}function pa(i,e){return i instanceof Float32Array||i instanceof Int32Array||i instanceof Uint32Array?i:(typeof i=="number"&&(i=[i]),e==="i32"||e.endsWith("i")?new Int32Array(i):e==="u32"||e.endsWith("u")?new Uint32Array(i):new Float32Array(i))}class Pt{_label;_device;_outputTextures={};_outputParams={};_pipeline;_bindGroups=[];_needsUpdatePipeline=!0;_needsUpdateOutputTextures=!0;_renderToScreen;_inputs=[];_inputViewDimensions={};_outputs=[];_uniforms=[];_uniformsMap={};_uniformBuffers={};_samplers={};_capacityWidth=0;_capacityHeight=0;_reserveCapacity=!1;_regionNames=[];_width=10;_height=10;_fsCode="";_fsMain;_fsDefine;_textureWillBeRead;constructor(e,t,A){this._label=e,this._device=t,this._fsMain=A.fsMain,this._fsDefine=A.fsDefine,this._inputs=A.inputs,this._inputViewDimensions=A.inputViewDimensions||{},this._outputs=A.outputs,this._uniforms=(A.uniforms||[]).concat({label:"viewportSize",type:"vec2f",data:[0,0]}),this._samplers=A.samplers||{},this._uniformsMap=this._uniforms.reduce((a,r)=>(a[r.label]=r,a),{}),this._textureWillBeRead=A.textureWillBeRead||!1,this._uniforms.forEach(a=>{const r=pa(a.data,a.type);this._uniformBuffers[a.label]=t.createBuffer({label:this._label,size:r.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this._device.queue.writeBuffer(this._uniformBuffers[a.label],0,r)})}reserveCapacity(){if(this._reserveCapacity)return;this._reserveCapacity=!0,this._capacityWidth=this._width,this._capacityHeight=this._height;const e=this._inputs.filter(t=>!this._inputViewDimensions[t]||this._inputViewDimensions[t]==="2d");if(this._regionNames=e,e.length){const t={label:"imageRegions",type:`array<vec4u, ${e.length}>`,data:new Uint32Array(e.length*4)};this._uniforms.push(t),this._uniformsMap[t.label]=t,this._uniformBuffers[t.label]=this._device.createBuffer({label:`${this._label}.${t.label}`,size:e.length*16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST})}this._needsUpdatePipeline=!0,this._fsCode=""}setSize(e,t){e=Math.max(1,Math.ceil(e)),t=Math.max(1,Math.ceil(t));const A=e!==this._width||t!==this._height;if(this._width=e,this._height=t,A){const a=Math.max(this._capacityWidth,e),r=Math.max(this._capacityHeight,t);this._needsUpdateOutputTextures||=!this._reserveCapacity||a!==this._capacityWidth||r!==this._capacityHeight,this._capacityWidth=a,this._capacityHeight=r,this._needsUpdatePipeline=!0,this.setUniform("viewportSize",[e,t])}}setOutputParams(e){const t=!!this._renderToScreen;this._renderToScreen=void 0;const A=Object.keys(e).some(a=>!oh(e[a],this._outputParams[a]||{}));this._needsUpdateOutputTextures||=A,this._needsUpdatePipeline||=A||t,(A||t)&&(this._fsCode=""),this._outputParams=e}setRenderToScreen(e,t){(!this._renderToScreen||this._renderToScreen.presentationFormat!==t)&&(this._needsUpdatePipeline=!0,this._fsCode=""),this._renderToScreen={screenTexture:e,presentationFormat:t}}setUniform(e,t){const A=this._uniformBuffers[e];this._device.queue.writeBuffer(A,0,pa(t,this._uniformsMap[e].type))}_retainedOutputs=new Set;retainOutput(e){Object.values(this._outputTextures).includes(e)&&this._retainedOutputs.add(e)}releaseOutput(e){this._retainedOutputs.delete(e)&&(Object.values(this._outputTextures).includes(e)||this._device.queue.onSubmittedWorkDone().catch(()=>{}).then(()=>e.destroy()))}getOutput(e){return this._outputTextures[e]}getMemoryBytes(){return Object.values(this._uniformBuffers).reduce((e,t)=>e+t.size,0)+Array.from(new Set([...Object.values(this._outputTextures),...this._retainedOutputs])).reduce((e,t)=>e+TA(t),0)}dispose(){Object.keys(this._uniformBuffers).forEach(e=>{this._uniformBuffers[e].destroy()}),new Set([...Object.values(this._outputTextures),...this._retainedOutputs]).forEach(e=>e.destroy()),this._retainedOutputs.clear()}_createTexture(e){return this._device.createTexture({label:this._label,size:{width:this._reserveCapacity?this._capacityWidth:this._width,height:this._reserveCapacity?this._capacityHeight:this._height,depthOrArrayLayers:1},format:e.format,usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING|(this._textureWillBeRead?GPUTextureUsage.COPY_SRC:0)})}_updateOutputTextures(e){const t=this._outputParams;for(const A in t){if(e?.includes(A))continue;const a=t[A];this._retainedOutputs.has(this._outputTextures[A])||this._outputTextures[A]?.destroy(),this._outputTextures[A]=this._createTexture(a)}}_updatePipeline(){if(!this._needsUpdatePipeline)return;this._needsUpdatePipeline=!1;const e=this._outputParams,t=this._device,A=this._getFullFs();if(A===this._fsCode)return;const{screenTexture:a,presentationFormat:r}=this._renderToScreen||{};this._fsCode=A,this._pipeline=bt(t).createRenderPipeline({label:this._label,layout:"auto",vertex:{module:bt(t).createShaderModule({label:this._label,code:Gr}),entryPoint:"main"},fragment:{module:bt(t).createShaderModule({label:this._label,code:A}),entryPoint:"main",targets:a?[{format:r}]:this._outputs.map(n=>({format:e[n].format}))},primitive:{topology:"triangle-list"}}),this._updateBindGroups()}_getFullFs(){const e=this._inputs,t=e.length,A=t>0;return`
${e.sort().map((r,n)=>{const o=this._inputViewDimensions[r]==="3d"?"texture_3d":"texture_2d";return`@group(0) @binding(${n}) var ${r}: ${o}<f32>;`}).join(`
`)}

${A?Object.keys(this._samplers).sort().map((r,n)=>`@group(0) @binding(${n+t}) var ${r}: sampler;`).join(`
`):""}
${this._uniforms.map((r,n)=>`@group(${A?1:0}) @binding(${n}) var<uniform> ${r.label}: ${r.type};`).join(`
`)}
struct qa {
${this._outputs.map((r,n)=>`@location(${n}) ${r}: vec4f,`).join(`
`)}
}
${nh(this._reserveCapacity?this._regionNames:e.filter(r=>!this._inputViewDimensions[r]||this._inputViewDimensions[r]==="2d"),Object.keys(this._samplers),this._reserveCapacity)}
${this._fsDefine??""}
@fragment
fn main(
@builtin(position) coord: vec4f
) -> qa {
let uv = vec2i(floor(coord.xy));
let uv2 = coord.xy / viewportSize;
var output: qa;
${this._fsMain}
return output;
}
`}_updateBindGroups(){const e=[],t=this._device,A=this._inputs.length>0?1:0;this._uniforms.length>0&&(e[A]=t.createBindGroup({label:this._label,layout:this._pipeline.getBindGroupLayout(A),entries:this._uniforms.map((a,r)=>({binding:r,resource:{buffer:this._uniformBuffers[a.label]}}))})),this._bindGroups=e}createPass(e,t,A){if(this._needsUpdateOutputTextures&&!this._renderToScreen&&(this._updateOutputTextures(Object.keys(A||{})),this._needsUpdateOutputTextures=!1),this._regionNames.length){const s=new Uint32Array(this._regionNames.length*4);for(const[o,l]of this._regionNames.entries()){const c=Ac(t[l]);s.set([c.width,c.height],o*4)}this.setUniform("imageRegions",s)}for(const s of Object.values(this._outputTextures))Tn(s,this._width,this._height);this._updatePipeline();const a=this._inputs.length;a>0&&(this._bindGroups[0]=this._device.createBindGroup({label:this._label,layout:this._pipeline.getBindGroupLayout(0),entries:[...this._inputs.map((s,o)=>({binding:o,resource:t[s].createView(this._inputViewDimensions[s]?{dimension:this._inputViewDimensions[s]}:void 0)})),...Object.keys(this._samplers).map((s,o)=>({binding:o+a,resource:this._samplers[s]}))]}));const r={...this._outputTextures,...A},n=e.beginRenderPass({colorAttachments:this._renderToScreen?[{view:this._renderToScreen.screenTexture.createView(),clearValue:{r:0,g:0,b:0,a:0},storeOp:"store",loadOp:"clear"}]:this._outputs.map(s=>({view:r[s].createView(),clearValue:{r:0,g:0,b:0,a:0},loadOp:"clear",storeOp:"store"}))});n.setViewport(0,0,this._width,this._height,0,1),n.setScissorRect(0,0,this._width,this._height),n.setPipeline(this._pipeline),this._bindGroups.forEach((s,o)=>{n.setBindGroup(o,s)}),n.draw(6,1,0,0),n.end()}}class sc{blases=new WeakMap;parts=[];tlasRecords=-1;combined;get(e,t){const A=e.blases.map((r,n)=>{const s=e.geometries[n],o=s.indexArray,l=r.bvh.buffer,c=r.bvh.triangleIds,f=this.blases.get(l);if(f&&f.geometry===s&&f.indices===o&&f.topology===s.topologyVersion&&f.triangleIds===c)return f.ids;const p=new Uint32Array(l),h=new Uint32Array(p.length/4).fill(ea),u=new Map;for(let d=0;d<o.length/3;d++)u.set(`${o[d*3]},${o[d*3+1]},${o[d*3+2]}`,d);for(let d=0;d<h.length;d++){const m=u.get(`${p[d*4]},${p[d*4+1]},${p[d*4+2]}`);m!==void 0&&(h[d]=m)}if(c)for(let d=0;d<c.length;d+=2)h[c[d]]=c[d+1];return this.blases.set(l,{geometry:s,indices:o,topology:s.topologyVersion,triangleIds:c,ids:h}),h}),a=t.buffer.byteLength/16;if(!this.combined||this.tlasRecords!==a||A.length!==this.parts.length||A.some((r,n)=>r!==this.parts[n])){const r=new Uint32Array(a+A.reduce((s,o)=>s+o.length,0)).fill(ea);let n=a;for(const s of A)r.set(s,n),n+=s.length;this.combined=r,this.parts=A,this.tlasRecords=a}return this.combined}}const Hs=new WeakMap;let lh=1;function ch(i){let e=Hs.get(i);return e===void 0&&(e=lh++,Hs.set(i,e)),e}function fh(i){const e=new Uint32Array(i.buffer),t=new Int32Array(i.buffer),A=new Uint32Array((i.instancesBuffer?.byteLength??0)/160);if(!i.buffer.byteLength){for(let r=0;r<A.length;r++)A[r]=r;return A}function a(r){const n=r*4,s=t[n+3];if(s>=0)a(r+2),a(s);else for(let o=0;o<-s;o++)A[e[n+8+o*4]]=e[n+10+o*4]}return A.length&&a(0),A}function oc(i,e,t,A,a,r,n,s=!0){const o=fh(e),l=i.instances,c={width:A,height:a,projection:JSON.stringify(Array.from(t.getProjectionMatrix(A/a))),viewProjection:new Float32Array(16),instances:[]},f=ti();BA(f,t.transform),ZA(c.viewProjection,t.getProjectionMatrix(A/a),f);const p=new Float32Array([t.transform[12],t.transform[13],t.transform[14],1]),h=Math.hypot(t.transform[8],t.transform[9],t.transform[10]),u=new Float32Array([-t.transform[8]/h,-t.transform[9]/h,-t.transform[10]/h,0]);c.cameraEye=p,c.cameraForward=u;const d=[];for(let P=0;P<o.length;P++){const S=o[P],L=i.instanceBindings[l instanceof bA?l.bindingIndices[S]:S].mesh,H=L.geometry;d.push({object:Ji(L.aovId),instance:l instanceof bA?l.localIndices[S]:0,topology:ch(H)+H.topologyVersion*4294967296,vertices:H.version,transform:new Float32Array(Mi(l,S).transform)})}c.instances=d;const m=52+o.length*24,v=m+i.materials.length,g=n?.length??e.buffer.byteLength/16+i.blases.reduce((P,S)=>P+S.bvh.buffer.byteLength/16,0),w=new Uint32Array(v+(s?g:0)),B=new Float32Array(w.buffer),E=r.previous(c);E&&B.set(E.viewProjection),w[16]=m,w[17]=v;const b=new Float32Array(Array.from(t.getProjectionMatrix(A/a)));let x=2166136261;for(const P of new Uint32Array(b.buffer))x=Math.imul(x^P,16777619)>>>0;w[18]=x,B.set(c.viewProjection,20),B.set(p,36),B.set(u,40),E?.cameraEye&&E.cameraForward&&(B.set(E.cameraEye,44),B.set(E.cameraForward,48));const y=new Set;for(const P of i.instanceBindings){const S=Ji(P.mesh.aovId);if(y.has(S))throw new Error("AOV object IDs must be unique");y.add(S)}d.forEach((P,S)=>{const R=52+S*24;w[R]=P.object,w[R+1]=P.instance;const L=r.match(c,P),H=ti();if(L&&BA(H,P.transform)){const J=ti();ZA(J,L.transform,H),B.set(Array.from(J),R+4),w[R+2]=1}});const T=new Set;if(i.materials.forEach((P,S)=>{const R=Ji(P.aovId);if(T.has(R))throw new Error("AOV material IDs must be unique");T.add(R),w[m+S]=R}),!s)return{words:w,frame:c};if(w.fill(4294967295,v),n)return w.set(n,v),{words:w,frame:c};let I=e.buffer.byteLength/16;return i.blases.forEach((P,S)=>{const R=new Uint32Array(P.bvh.buffer),L=i.geometries[S].indexArray,H=new Map;for(let _=0;_<L.length/3;_++)H.set(`${L[_*3]},${L[_*3+1]},${L[_*3+2]}`,_);for(let _=0;_<R.length/4;_++){const F=H.get(`${R[_*4]},${R[_*4+1]},${R[_*4+2]}`);F!==void 0&&(w[v+I+_]=F)}const J=P.bvh.triangleIds;if(J)for(let _=0;_<J.length;_+=2)w[v+I+J[_]]=J[_+1];I+=R.length/4}),{words:w,frame:c}}function uh(i){const e=i.ambient[0]*.2126+i.ambient[1]*.7152+i.ambient[2]*.0722;return 4*Math.PI*(i.intensity+Math.max(0,e))}const lc=.4,cc=5,fc=[.2,.18,.15],uc=Math.PI,Hr=.488,dh=`
struct Params { sun: vec4f, sunWorld: vec4f, size: vec4f, scale: vec4f, ambient: vec4f }
@group(0) @binding(0) var<uniform> params: Params;
@group(0) @binding(1) var transmittanceTable: texture_2d<f32>;
@group(0) @binding(2) var multipleTable: texture_2d<f32>;
@group(0) @binding(3) var skyTable: texture_2d<f32>;
@group(0) @binding(4) var irradianceTable: texture_2d<f32>;
@group(0) @binding(5) var output: texture_storage_2d<rgba32float, write>;
const PI = 3.14159265358979;
const R_GROUND = 6360.0;
const R_TOP = 6460.0;
const CAMERA_ALTITUDE = 0.2;
const RAYLEIGH = vec3f(5.802e-3, 13.558e-3, 33.1e-3);
const MIE_SCATTERING = 3.996e-3;
const MIE_EXTINCTION = 4.44e-3;
const MIE_G = 0.8;
const OZONE = vec3f(0.65e-3, 1.881e-3, 0.085e-3);
const ALBEDO = vec3f(${fc.join(", ")});
const T_SIZE = vec2u(256, 64);
const MS_ALTITUDES = 32u;
const SV_SIZE = vec2u(96, 192);

fn br(r: f32, mu: f32, radius: f32) -> f32 { return (radius - r) * (radius + r) + r * r * mu * mu; }
fn np(r: f32, mu: f32) -> bool { return mu < 0.0 && br(r, mu, R_GROUND) >= 0.0; }
fn ll(r: f32, mu: f32) -> f32 { return max(-r * mu - sqrt(max(br(r, mu, R_GROUND), 0.0)), 0.0); }
fn jm(r: f32, mu: f32) -> f32 { return max(-r * mu + sqrt(max(br(r, mu, R_TOP), 0.0)), 0.0); }
fn oz(r: f32) -> vec3f {
let h = max(r - R_GROUND, 0.0);
return vec3f(exp(-h / 8.0), exp(-h / 1.2) * ${cc}, max(0.0, 1.0 - abs(h - 25.0) / 15.0));
}
fn extinction(d: vec3f) -> vec3f { return RAYLEIGH * d.x + MIE_EXTINCTION * d.y + OZONE * d.z; }
fn mP(x: f32) -> f32 { return x * x * (R_TOP - R_GROUND); }
fn hR(h: f32) -> f32 { return sqrt(clamp(h / (R_TOP - R_GROUND), 0.0, 1.0)); }
fn fh(table: texture_2d<f32>, p: vec2f) -> vec3f {
let size = vec2i(textureDimensions(table));
let q = clamp(p, vec2f(0.0), vec2f(size - 1));
let i = min(vec2i(floor(q)), max(size - 2, vec2i(0)));
let f = clamp(q - vec2f(i), vec2f(0.0), vec2f(1.0));
let j = min(i + 1, size - 1);
let a = textureLoad(table, i, 0).rgb;
let b = textureLoad(table, vec2i(j.x, i.y), 0).rgb;
let c = textureLoad(table, vec2i(i.x, j.y), 0).rgb;
let d = textureLoad(table, j, 0).rgb;
return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}
fn fO(r: f32, mu: f32) -> vec3f {
return fh(transmittanceTable, vec2f((clamp(mu, -1.0, 1.0) + 1.0) * 0.5 * f32(T_SIZE.x - 1u), hR(r - R_GROUND) * f32(T_SIZE.y - 1u)));
}
fn mW(nu: f32) -> f32 {
let g2 = MIE_G * MIE_G;
return 3.0 / (8.0 * PI) * ((1.0 - g2) * (1.0 + nu * nu)) / ((2.0 + g2) * pow(1.0 + g2 - 2.0 * MIE_G * nu, 1.5));
}
struct xJ { radiance: vec3f, throughput: vec3f }
fn vt(origin: vec3f, dir: vec3f, steps: u32, full: bool, uw: vec3f) -> xJ {
let r = length(origin);
let mu = dot(origin, dir) / r;
let ground = np(r, mu);
var len = jm(r, mu);
if (ground) { len = ll(r, mu); }
let nu = dot(dir, params.sun.xyz);
var jv = 1.0 / (4.0 * PI);
var sn = jv;
if (full) { jv = 3.0 / (16.0 * PI) * (1.0 + nu * nu); sn = mW(nu); }
var result = xJ(vec3f(0.0), vec3f(0.0));
var view = vec3f(1.0);
var previous = 0.0;
for (var i = 0u; i < steps; i++) {
let s = f32(i + 1u) / f32(steps);
let next = len * s * s;
let dt = next - previous;
let p = origin + dir * (0.5 * (previous + next));
previous = next;
let pr = length(p);
let d = oz(pr);
let e = extinction(d);
let vb = fO(pr, dot(p, params.sun.xyz) / pr);
let nG = RAYLEIGH * d.x;
let nF = MIE_SCATTERING * d.y;
var ms = vec3f(0.0);
if (full) { ms = fh(multipleTable, vec2f(hR(pr - R_GROUND) * f32(MS_ALTITUDES - 1u), 0.0)); }
let source = vb * (nG * jv + nF * sn) + (nG + nF) * ms;
let st = exp(-e * dt);
let weight = (1.0 - st) / max(e, vec3f(1e-9));
result.radiance += view * source * weight;
result.throughput += view * (nG + nF) * weight;
view *= st;
}
if (ground) {
let p = origin + dir * len;
let pr = length(p);
let tC = dot(p, params.sun.xyz) / pr;
let irradiance = fO(pr, tC) * max(tC, 0.0) + uw;
result.radiance += view * ALBEDO / PI * irradiance;
}
return result;
}
fn qk(row: f32) -> f32 {
let x = row / f32(SV_SIZE.y - 1u) * 2.0 - 1.0;
return sign(x) * x * x * (PI / 2.0);
}
fn ik(e: f32) -> f32 {
let x = sign(e) * sqrt(abs(e) / (PI / 2.0));
return clamp((x + 1.0) * 0.5, 0.0, 1.0) * f32(SV_SIZE.y - 1u);
}
@compute @workgroup_size(8, 8)
fn transmittance(@builtin(global_invocation_id) id: vec3u) {
if (any(id.xy >= T_SIZE)) { return; }
let mu = f32(id.x) / f32(T_SIZE.x - 1u) * 2.0 - 1.0;
let r = R_GROUND + mP(f32(id.y) / f32(T_SIZE.y - 1u));
if (np(r, mu)) { textureStore(output, vec2i(id.xy), vec4f(0.0, 0.0, 0.0, 1.0)); return; }
let len = jm(r, mu);
var depth = vec3f(0.0);
for (var i = 0u; i < 48u; i++) {
let t = (f32(i) + 0.5) / 48.0 * len;
depth += extinction(oz(sqrt(t * t + 2.0 * r * mu * t + r * r))) * (len / 48.0);
}
textureStore(output, vec2i(id.xy), vec4f(exp(-depth), 1.0));
}
@compute @workgroup_size(8, 8)
fn multiple(@builtin(global_invocation_id) id: vec3u) {
if (id.x >= MS_ALTITUDES || id.y > 0u) { return; }
let r = R_GROUND + mP(f32(id.x) / f32(MS_ALTITUDES - 1u));
var second = vec3f(0.0);
var qK = vec3f(0.0);
for (var i = 0u; i < 64u; i++) {
let mu = 1.0 - 2.0 * (f32(i) + 0.5) / 64.0;
let phi = f32(i) * PI * (3.0 - sqrt(5.0));
let s = sqrt(1.0 - mu * mu);
let result = vt(vec3f(0.0, r, 0.0), vec3f(s * cos(phi), mu, s * sin(phi)), 20u, false, vec3f(0.0));
second += result.radiance / 64.0;
qK += result.throughput / 64.0;
}
textureStore(output, vec2i(id.xy), vec4f(second / (1.0 - qK), 1.0));
}
@compute @workgroup_size(8, 8)
fn skyView(@builtin(global_invocation_id) id: vec3u) {
if (any(id.xy >= SV_SIZE)) { return; }
let e = qk(f32(id.y));
let phi = f32(id.x) / f32(SV_SIZE.x - 1u) * PI;
var sky = vec3f(0.0);
if (params.size.w > 0.0) { sky = textureLoad(irradianceTable, vec2i(0), 0).rgb; }
let result = vt(vec3f(0.0, R_GROUND + CAMERA_ALTITUDE, 0.0), vec3f(cos(e) * cos(phi), sin(e), cos(e) * sin(phi)), 40u, true, sky);
textureStore(output, vec2i(id.xy), vec4f(result.radiance, 1.0));
}
@compute @workgroup_size(8, 8)
fn irradiance(@builtin(global_invocation_id) id: vec3u) {
if (id.x >= 2u || id.y > 0u) { return; }
var sky = vec3f(0.0);
for (var i = 0u; i < 128u; i++) {
let e = (f32(i) + 0.5) / 128.0 * (PI / 2.0);
let weight = 2.0 * sin(e) * cos(e) * (PI / 2.0 / 128.0) * (PI / 48.0);
for (var j = 0u; j < 48u; j++) {
let phi = (f32(j) + 0.5) / 48.0 * PI;
sky += fh(skyTable, vec2f(phi / PI * f32(SV_SIZE.x - 1u), ik(e))) * weight;
}
}
if (id.x == 0u) { textureStore(output, vec2i(id.xy), vec4f(sky, 1.0)); return; }
let vb = fO(R_GROUND + CAMERA_ALTITUDE, params.sun.y);
let xc = vec3f(0.2126, 0.7152, 0.0722);
let horizontal = dot(sky, xc) + dot(vb, xc) * max(params.sun.y, 0.0);
let scale = ${uc} / sqrt(max(horizontal, ${Hr} * 1e-3) * ${Hr});
textureStore(output, vec2i(id.xy), vec4f(vb, scale));
}
fn hn(dk: vec2f) -> vec3f {
let theta = dk.y / params.size.y * PI;
let phi = dk.x / params.size.x * 2.0 * PI;
return vec3f(-sin(theta) * cos(phi), cos(theta), -sin(theta) * sin(phi));
}
@compute @workgroup_size(8, 8)
fn map(@builtin(global_invocation_id) id: vec3u) {
if (any(id.xy >= vec2u(params.size.xy))) { return; }
let dk = vec2f(id.xy) + 0.5;
let dir = hn(dk);
let th = abs(atan2(dir.z, dir.x) - params.sun.w);
let wr = th - floor(th / (2.0 * PI)) * (2.0 * PI);
let ek = min(wr, 2.0 * PI - wr);
let e = asin(clamp(dir.y, -1.0, 1.0));
var radiance = fh(skyTable, vec2f(ek / PI * f32(SV_SIZE.x - 1u), ik(e)));
let sun = textureLoad(irradianceTable, vec2i(1, 0), 0);
let radius = params.sunWorld.w;
let rP = PI / params.size.y;
if (acos(clamp(dot(dir, params.sunWorld.xyz), -1.0, 1.0)) < radius + 3.0 * rP / max(sqrt(1.0 - dir.y * dir.y), 0.05)) {
var coverage = 0.0;
for (var y = 0u; y < 6u; y++) { for (var x = 0u; x < 6u; x++) {
let d = hn(dk - 0.5 + (vec2f(f32(x), f32(y)) + 0.5) / 6.0);
let angle = 2.0 * asin(min(length(d - params.sunWorld.xyz) * 0.5, 1.0));
let t = angle / radius;
if (t < 1.0) { coverage += 1.0 - 0.6 * (1.0 - sqrt(1.0 - t * t)); }
} }
let rO = 2.0 * PI * (1.0 - cos(radius));
radiance += coverage / 36.0 / (rO * (1.0 - 0.6 / 3.0)) * sun.rgb;
}
textureStore(output, vec2i(id.xy), vec4f(radiance * sun.a * params.scale.xyz + params.ambient.xyz, 1.0));
}
`;class Ws{device;tables;uniforms;pipelines;inputs={transmittance:[],multiple:[1,2],skyView:[1,2,4],irradiance:[1,3],map:[3,4]};time;constructor(e){this.device=e;const t=(a,r,n)=>e.createTexture({label:a,size:[r,n],format:"rgba32float",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.STORAGE_BINDING});this.tables={transmittance:t("Sky transmittance",256,64),multiple:t("Sky multiple scattering",32,1),skyView:t("Sky view",96,192),irradiance:t("Sky irradiance",2,1)},this.uniforms=[0,1].map(()=>e.createBuffer({label:"Sky parameters",size:80,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}));const A=e.createShaderModule({label:"Procedural sky",code:dh});this.pipelines={};for(const a of Object.keys(this.inputs)){const r=e.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},...this.inputs[a].map(n=>({binding:n,visibility:GPUShaderStage.COMPUTE,texture:{sampleType:"unfilterable-float"}})),{binding:5,visibility:GPUShaderStage.COMPUTE,storageTexture:{access:"write-only",format:"rgba32float"}}]});this.pipelines[a]=e.createComputePipeline({label:`Sky ${a}`,layout:e.createPipelineLayout({bindGroupLayouts:[r]}),compute:{module:A,entryPoint:a}})}}bake(e,t){const{width:A,height:a,sky:r,intensity:n,ambient:s}=e;if(A>this.device.limits.maxTextureDimension2D||a>this.device.limits.maxTextureDimension2D)throw new RangeError("ProceduralSky resolution exceeds the device texture size limit.");const{elevation:o,azimuth:l}=Al(r.time),c=o*Math.PI/180,f=l*Math.PI/180,p=new Float32Array([Math.cos(c),Math.sin(c),0,f,Math.cos(c)*Math.cos(f),Math.sin(c),Math.cos(c)*Math.sin(f),lc*Math.PI/180,A,a,0,0,n,n,n,1,...s,0]);this.device.queue.writeBuffer(this.uniforms[0],0,p),p[11]=1,this.device.queue.writeBuffer(this.uniforms[1],0,p);const h=this.device.createCommandEncoder({label:"Procedural sky"}),u=(d,m,v=!1)=>{const g=this.pipelines[d],w={1:this.tables.transmittance,2:d==="multiple"?this.tables.transmittance:this.tables.multiple,3:this.tables.skyView,4:this.tables.irradiance},B=this.device.createBindGroup({layout:g.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniforms[v?1:0]}},...this.inputs[d].map(b=>({binding:b,resource:w[b].createView()})),{binding:5,resource:m.createView()}]}),E=h.beginComputePass({label:`Sky ${d}`});E.setPipeline(g),E.setBindGroup(0,B),E.dispatchWorkgroups(Math.ceil(m.width/8),Math.ceil(m.height/8)),E.end()};this.time===void 0&&u("transmittance",this.tables.transmittance),this.time!==r.time&&(u("multiple",this.tables.multiple),u("skyView",this.tables.skyView),u("irradiance",this.tables.irradiance),u("skyView",this.tables.skyView,!0)),u("map",t,!0),this.device.queue.submit([h.finish()]),this.time=r.time}dispose(){Object.values(this.tables).forEach(e=>e.destroy()),this.uniforms.forEach(e=>e.destroy())}}const hh=200,js=64,Ys=6;function ph(){const i=new ArrayBuffer(320),e={outputSize:new Float32Array(i,0,2),sampleCount:new Float32Array(i,8,1),scaleOffset:new Float32Array(i,16,4),lightsCount:new Int32Array(i,32,1),transmissiveOutputAlphaMin:new Float32Array(i,36,1),jitter:new Float32Array(i,40,2),backgroundColor:new Float32Array(i,48,4),groundedBackgroundParams:new Float32Array(i,64,4),groundedBackgroundCenter:new Float32Array(i,80,2),blasOffset:new Int32Array(i,88,1),isEmpty:new Int32Array(i,92,1),bevel:new Int32Array(i,96,1),dispersionWavelengths:new Int32Array(i,100,1),envLightPmf:new Float32Array(i,104,1),lightChoiceCount:new Int32Array(i,108,1),lightWeightTotal:new Float32Array(i,112,1),lightSamplingTextureWidth:new Int32Array(i,116,1),lightChoiceTexelOffset:new Int32Array(i,120,1),bounces:new Int32Array(i,124,1),varianceMoments:new Int32Array(i,128,1),adaptiveSampling:new Int32Array(i,132,1),clamping:new Float32Array(i,136,1),directLightCandidates:new Int32Array(i,140,1),backgroundFlags:new Int32Array(i,144,1),loopUnrollGuard:new Uint32Array(i,148,1),sceneFeatureFlags:new Uint32Array(i,152,1),sequenceSeed:new Uint32Array(i,156,1),zSobolLogSPP:new Uint32Array(i,160,1),sampleSequenceOffset:new Uint32Array(i,164,1),shadowCatcherChoiceOffset:new Int32Array(i,168,1),shadowCatcherChoiceCount:new Int32Array(i,172,1),environmentRotation:new Float32Array(i,176,16),backgroundMapTransform:new Float32Array(i,240,4),backgroundMapRotation:new Float32Array(i,256,16)};return e.loopUnrollGuard[0]=4,e.environmentRotation.set([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]),e.backgroundMapRotation.set([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]),e.backgroundMapTransform.set([1,0,1,0]),e.bevel[0]=1,e.dispersionWavelengths[0]=3,{buffer:i,views:e}}function mh(i,e,t,A){Mn(i);const a=i.length;a>js&&console.warn(`Too many lights, only the first ${js} lights will be used.`);const r=new Float32Array(a*Ys*4);function n(o,l){for(let c=0;c<3;c++)r[c+o*4]=Q(l,c)}const s={DirectionalLight:Ia,SphereLight:Pa,RectLight:Sa,SpotLight:Da};for(let o=0;o<a;o++){const l=i[o],c=Ze(l.transform),f=l.color,p=l.intensity,h=o*Ys;n(h,[c[12],c[13],c[14]]),r[h*4+3]=s[l.type];const u=l.type==="SpotLight"?Qn(l):p;n(h+1,[f[0]*u,f[1]*u,f[2]*u]),l.type==="RectLight"?(r[(h+1)*4+3]=yn(l),n(h+2,ca(l,0)),r[(h+2)*4+3]=l.spread,n(h+3,ca(l,1))):l.type==="SphereLight"?(r[(h+1)*4+3]=xn(l),r[(h+2)*4+3]=l.radius):l.type==="SpotLight"?(r[(h+1)*4+3]=Cn(l),n(h+2,la(l)),r[(h+2)*4+3]=l.radius,n(h+3,[Math.cos(l.outerAngle*Math.PI/180),Math.cos(Math.min(l.innerAngle,l.outerAngle)*Math.PI/180),0])):l.type==="DirectionalLight"&&n(h+2,la(l)),r[(h+3)*4+3]=l.type==="SpotLight"?A(o)??-1:e[o]??-1,r[(h+4)*4]=t[o]??0,n(h+5,Ta(l).x)}return r}const Kt=20;function ma(i){return Math.min(Kt,Math.max(1,Number.isNaN(i)?1:Math.round(i)))}const Fa=8,gh=1,vh=32,dc=4,Bh=1,wh=16;function Rn(i){return Number.isFinite(i)?Math.min(wh,Math.max(Bh,Math.round(i))):dc}function Un(i){return Number.isFinite(i)?Math.min(vh,Math.max(gh,Math.round(i))):Fa}function hc(i){const e={sobol:0,zsobol:1,random:2}[i];if(e===void 0)throw new Error(`Unknown sampling pattern: ${i}`);return e}function pc(i){return Number.isFinite(i)?Math.min(16,Math.max(0,Math.ceil(Math.log2(Math.max(1,i))))):16}const Eh=[[0,1,2,3],[0,1,3,2],[0,2,1,3],[0,2,3,1],[0,3,2,1],[0,3,1,2],[1,0,2,3],[1,0,3,2],[1,2,0,3],[1,2,3,0],[1,3,2,0],[1,3,0,2],[2,1,0,3],[2,1,3,0],[2,0,1,3],[2,0,3,1],[2,3,0,1],[2,3,1,0],[3,1,2,0],[3,1,0,2],[3,2,1,0],[3,2,0,1],[3,0,2,1],[3,0,1,2]].map(i=>i.reduce((e,t,A)=>e|t<<2*A,0)),mc=Array.from({length:6},(i,e)=>Eh.slice(e*4,e*4+4).reduce((t,A,a)=>t|A<<a*8,0)>>>0),gc=[[1,2863311530],[2,3435973836],[4,4042322160],[8,4278255360],[16,4294901760]];function bh(){return{USE_BACKGROUND:!1,USE_BACKGROUND_MAP:!1,USE_GROUNDED_BACKGROUND:!1,SAMPLING_PATTERN:0,BEVEL_SAMPLES:Fa}}function _h(i){const e=["position","normal","uv","uv1","color","tangent","materialIndex"],t=[],A={USE_UV:i.uv!=null,USE_VERTEX_COLOR:i.color!=null};let a=0;for(const r of e)t.push(a),A[r.toUpperCase()+"_OFF"]=a/4,i[r]&&(a+=4);return A.ATTR_STRIDE=a/4,{stride:a,offsets:t,constants:A}}function yh(i,e,t={}){return{TLAS_STACK_SIZE:vA(i,Number(t.TLAS_STACK_SIZE??0)),BLAS_STACK_SIZE:vA(e,Number(t.BLAS_STACK_SIZE??0),32)}}function xh(i,e){i.bounces[0]=ma(e.bounces),i.bevel[0]=Number(e.bevel),i.dispersionWavelengths[0]=e.dispersionWavelengths,i.directLightCandidates[0]=Rn(e.directLightCandidates)}function Ch(i,e,t){const A=hc(i);return{code:A,logSPP:pc(A===1?e-1:e),seed:t>>>0}}function Qh(i,e){i.sequenceSeed[0]=e.seed,i.zSobolLogSPP[0]=e.logSPP}function Mh(i,e,t,A,a=new _A,r,n){a.reserve(1+i.length+e.length),a.push(JA,0,t);for(let x=0;x<i.length;x++)a.push($A,x,Il(i[x]));for(let x=0;x<e.length;x++)a.push(oa,x,e[x].area*e[x].samplingLuminance);const s=Dl(a),o=fd(a,n),l=o?a.count:0,c=o?o.pmfs.length:a.count,f={environment:{count:0,weight:0,pmf:0},infinite:{count:0,weight:0,pmf:0},localAndEmissive:{count:0,weight:0,pmf:0}},p=[f.environment,f.infinite,f.localAndEmissive],h=new Array(i.length).fill(0);let u=0;for(let x=0;x<a.count;x++){const y=a.sourceTypes[x],T=a.sourceIndices[x],I=s.pmfs[x],P=y===JA?nd:y===$A&&i[T]?.type==="DirectionalLight"?sd:od,S=p[P];S.count++,S.weight+=a.weights[x],S.pmf+=I,y===JA?u=I:y===$A?h[T]=I:e[T].selectionPmf=I}const d=Math.max(a.count+(o?c:0),1),m=e.length*6,v=m+d,g=Pl(i,v),w=Math.max(v+g.texelCount,1),B=Math.min(A,Math.max(16,Math.ceil(Math.sqrt(w)/16)*16)),E=Math.ceil(w/B);if(E>A)throw new Error("Too many emissive triangles for the light sampling texture.");const b=r?.length===B*E*4?r:new Float32Array(B*E*4);return b.fill(0),e.length&&hd(e,b),new Uint32Array(b.buffer).set(s.choices,m*4),o&&c&&new Uint32Array(b.buffer).set(o.choices,(m+a.count)*4),b.set(g.data,v*4),{lightData:b,lightWidth:B,lightHeight:E,analyticPmfs:h,profiles:g,environmentPmf:u,choiceCount:a.count,totalWeight:s.totalWeight,emissiveTexels:m,domains:f,shadowCatcherChoiceOffset:l,shadowCatcherChoiceCount:c}}function Ih(i,e){i.envLightPmf[0]=e.environmentPmf,i.lightChoiceCount[0]=e.choiceCount,i.shadowCatcherChoiceOffset[0]=e.shadowCatcherChoiceOffset,i.shadowCatcherChoiceCount[0]=e.shadowCatcherChoiceCount,i.lightWeightTotal[0]=e.totalWeight,i.lightSamplingTextureWidth[0]=e.lightWidth,i.lightChoiceTexelOffset[0]=e.emissiveTexels}function Ph(i,e,t,A){return mh(i,e,t,A)}const it={BVH:1,INSTANCES:2,ATTRIBUTES:3,MATERIALS:4,MAP_INFO:5,CAMERA:6,TRACE_UNIFORM:7,LIGHT_UNIFORM:8,COLOR:10,NORMAL:11,ALBEDO:12,SHADOW_CATCHER:13,ATLAS:20,ENVIRONMENT:21,ENVIRONMENT_CDF:22,BACKGROUND:23,LIGHT_SAMPLING:24,ENERGY_LUT:25,DISPLACEMENT:26},Sh={MATERIAL:40},yt=(i,e,t,A)=>({name:i,resource:e,kind:"buffer",layout:{binding:t,visibility:4,buffer:{type:A}}}),wi=(i,e,t,A=!1,a=!1)=>({name:i,resource:e,kind:"texture",layout:{binding:t,visibility:4,texture:{viewDimension:A?"2d-array":"2d",sampleType:a?"float":"unfilterable-float"}}}),Dh=[{name:"SCENE",label:"Buffers",bindings:[yt("BVH",it.BVH,0,"read-only-storage"),yt("INSTANCES",it.INSTANCES,1,"read-only-storage"),yt("ATTRIBUTES",it.ATTRIBUTES,2,"read-only-storage"),yt("MATERIALS",it.MATERIALS,3,"read-only-storage")]},{name:"TEXTURES",label:"Textures",bindings:[{name:"SAMPLER",resource:Sh.MATERIAL,kind:"sampler",layout:{binding:0,visibility:4,sampler:{}}},wi("ATLAS",it.ATLAS,1,!0,!0),yt("MAP_INFO",it.MAP_INFO,3,"uniform"),wi("ENVIRONMENT",it.ENVIRONMENT,4),wi("ENVIRONMENT_CDF",it.ENVIRONMENT_CDF,5),wi("BACKGROUND",it.BACKGROUND,6),wi("LIGHT_SAMPLING",it.LIGHT_SAMPLING,8),wi("ENERGY_LUT",it.ENERGY_LUT,9),wi("DISPLACEMENT",it.DISPLACEMENT,10)]},{name:"FRAME",label:"Uniforms",bindings:[yt("CAMERA",it.CAMERA,0,"uniform"),yt("TRACE_UNIFORM",it.TRACE_UNIFORM,1,"uniform"),yt("LIGHT_UNIFORM",it.LIGHT_UNIFORM,2,"uniform")]},{name:"OUTPUT",label:"Ray Trace Out Buffers",bindings:[yt("COLOR",it.COLOR,0,"storage"),yt("NORMAL",it.NORMAL,1,"storage"),yt("ALBEDO",it.ALBEDO,2,"storage"),yt("SHADOW_CATCHER",it.SHADOW_CATCHER,3,"storage")]}];function vc(){return Dh.map(i=>({label:i.label,entries:i.bindings.map(e=>e.layout)}))}class Vs{bufferData;textures;defines;lightIndices=[];displacementMaps;constructor(e,t){const A=pl(e,cl);this.textures=A.textures.slice(),this.displacementMaps=A.indices.displacementMap.map(a=>A.textures[a]).filter(Boolean);for(const a of t){const r=a.type==="RectLight"?a.texture:void 0;this.lightIndices.push(r?this.textures.length:-1),r&&this.textures.push(r)}this.bufferData=gl(e),this.defines={NUM_MAPS:this.textures.length};for(const a of PA)this.bufferData[a.index]=A.indices[a.property],a.define&&(this.defines[a.define]=A.indices[a.property].filter(r=>r>=0).length);this.bufferData.mapUvChannel=this.textures.map(a=>a.uvChannel),this.bufferData.mapColorLinear=this.textures.map(wc),this.bufferData.mapTransform=this.textures.flatMap(a=>[...a.uvScale,...a.uvOffset]),this.bufferData.mapWrap=this.textures.flatMap(a=>[Ki(a.wrapS),Ki(a.wrapT)])}repackParams(e){dn(this.bufferData,e)}getBufferArray(){return hn(this.bufferData)}getLightTexturesIndices(){return this.lightIndices}getDisplacementMaps(){return this.displacementMaps}}function Bc(i){const e=i.image;return jt(e)&&!(e.data instanceof Uint8Array)&&!(e.data instanceof Uint8ClampedArray)}function wc(i){return Number(i.colorSpace?i.colorSpace==="linear":Bc(i))}function Th(i,e,t){const A=i.some(Bc),a=A?8:4,r=[...new Map(i.map((c,f)=>[c,f])).values()];for(const{image:c}of i)if(!Number.isSafeInteger(c.width)||!Number.isSafeInteger(c.height)||c.width<1||c.height<1)throw new Error("Material textures require positive integer dimensions.");const n=c=>i.map(f=>({width:Math.max(1,Math.floor(f.image.width*c)),height:Math.max(1,Math.floor(f.image.height*c))})),s=c=>r.reduce((f,p)=>f+c[p].width*c[p].height*a,0);if(r.length*a>e)throw new Error("Material textures cannot fit the budget even at 1×1.");let o=i.reduce((c,f)=>Math.min(c,t/Math.max(f.image.width,f.image.height)),1);if(s(n(o))>e){let c=0,f=o;for(let p=0;p<40;p++){const h=(c+f)/2;s(n(h))<=e?c=h:f=h}o=c}const l=n(o);return{sizes:l,scale:o,floatStorage:A,bytesPerPixel:a,estimatedBytes:s(l)}}function Rh(i,e,t){const A=t?new Uint16Array(e.width*e.height*4):new Uint8Array(e.width*e.height*4);if(jt(i.image))Bl(A,e.width,{x:0,y:0,...e},{image:i.image,flipY:i.flipY},t);else{const a=hi(e.width,e.height),r=a.getContext("2d");if(!r)throw new Error("Unable to prepare material texture pixels.");if(i.flipY&&(r.translate(0,e.height),r.scale(1,-1)),IA(i.image))throw new Error("ProceduralSky is only supported as an environment or background.");r.drawImage(i.image,0,0,e.width,e.height);const n=r.getImageData(0,0,e.width,e.height).data;for(let s=0;s<n.length;s++)A[s]=t?pn(n[s]/255):n[s]}return A}function Uh(i,e,t){const A=new ArrayBuffer(t*48),a=new Float32Array(A),r=new Uint32Array(A);return i.forEach((n,s)=>{const o=s*12;a.set([...n.uvScale,...n.uvOffset],o),r.set([sa+s,1+Ki(n.wrapS)*3+Ki(n.wrapT),n.uvChannel,wc(n),e[s].width,e[s].height],o+4)}),A}class Lh{device;table;metadata;retirement;entries=new Map;logical=[];samplers;fallback;disposed=!1;generation=0;metadataCapacity=0;retiredBytes=0;destroyRetired;stats={textureCount:0,estimatedBytes:0,scale:1};constructor(e){this.device=e;const t=["repeat","clamp-to-edge","mirror-repeat"];this.samplers=t.flatMap(A=>t.map(a=>e.createSampler({minFilter:"linear",magFilter:"linear",addressModeU:A,addressModeV:a}))),this.fallback=e.createTexture({size:[1,1],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST}),e.queue.writeTexture({texture:this.fallback},new Uint8Array([255,255,255,255]),{bytesPerRow:4},[1,1])}get revision(){return this.generation}get diagnostics(){return{...this.stats,metadataBytes:this.metadata?.size??0,resourceTableCapacity:this.table?.size??0,retiredBytes:this.retiredBytes}}update(e,t){if(this.disposed)throw new Error("Bindless textures are disposed.");if(this.retirement)throw new Error("Previous resource-table generation has not retired.");const A=vn(this.device,e.length);if(A)throw new Error(A);const a=Th(e,t,this.device.limits.maxTextureDimension2D),r=a.floatStorage?"rgba16float":"rgba8unorm",n=new Map,s=[];let o,l;try{e.forEach((g,w)=>{if(n.has(g))return;const B=a.sizes[w],E=this.entries.get(g),b=E&&E.width===B.width&&E.height===B.height&&E.format===r,x=b?E.gpu:this.device.createTexture({label:"Material texture",size:[B.width,B.height],format:r,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST});if(b||s.push(x),!b||E.image!==g.image||E.version!==g.version||E.flipY!==g.flipY||E.sourceWidth!==g.image.width||E.sourceHeight!==g.image.height){const y=Rh(g,B,a.floatStorage);this.device.queue.writeTexture({texture:x},y,{bytesPerRow:B.width*a.bytesPerPixel},[B.width,B.height])}n.set(g,{gpu:x,image:g.image,version:g.version,sourceWidth:g.image.width,sourceHeight:g.image.height,flipY:g.flipY,format:r,...B})});const c=e.map(g=>n.get(g).gpu);if(!this.table||c.length!==this.logical.length||c.some((g,w)=>g!==this.logical[w])){const g=Math.min(bl,2**Math.ceil(Math.log2(Math.max(16,e.length+sa))));o=yl(this.device,g),o.update(0,this.fallback.createView()),this.samplers.forEach((w,B)=>o.update(B+1,w)),c.forEach((w,B)=>o.update(sa+B,w.createView()))}const p=Math.floor(Math.min(this.device.limits.maxStorageBufferBindingSize,this.device.limits.maxBufferSize)/48),h=Math.min(p,Math.max(this.metadataCapacity,2**Math.ceil(Math.log2(Math.max(1,e.length)))));(!this.metadata||h!==this.metadataCapacity)&&(l=this.device.createBuffer({label:"Material texture metadata",size:h*48,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST})),this.device.queue.writeBuffer(l??this.metadata,0,Uh(e,a.sizes,h));const u=o?this.table:void 0,d=l?this.metadata:void 0,m=new Set(c),v=[...new Set([...this.entries.values()].map(g=>g.gpu))].filter(g=>!m.has(g));if(this.entries=n,this.logical=c,o&&(this.table=o),l&&(this.metadata=l),this.metadataCapacity=h,this.generation++,this.stats={textureCount:e.length,estimatedBytes:[...new Set(c)].reduce((g,w)=>g+w.width*w.height*a.bytesPerPixel,0),scale:a.scale},u||d||v.length){this.retiredBytes=(d?.size??0)+v.reduce((w,B)=>w+B.width*B.height*(B.format==="rgba16float"?8:4),0);const g=()=>{u?.destroy(),d?.destroy(),v.forEach(w=>w.destroy()),this.retiredBytes=0};this.destroyRetired=g,this.retirement=this.device.queue.onSubmittedWorkDone().catch(()=>{}).then(()=>{this.destroyRetired===g&&(g(),this.destroyRetired=void 0,this.retirement=void 0)})}}catch(c){throw o?.destroy(),l?.destroy(),s.forEach(f=>f.destroy()),c}}dispose(){this.disposed||(this.disposed=!0,this.generation++,this.destroyRetired?.(),this.destroyRetired=void 0,this.retirement=void 0,this.table?.destroy(),this.metadata?.destroy(),this.fallback.destroy(),new Set([...this.entries.values()].map(e=>e.gpu)).forEach(e=>e.destroy()),this.entries.clear(),this.logical=[])}}function Oh(i,e){const t=i.indexOf("fn decodeMapColor("),A=i.indexOf("fn getMaterialEmission(",t),a=/@group\(1\) @binding\(0\) var mapSampler: sampler;[\s\S]*?@group\(1\) @binding\(3\) var<uniform> mapInfo: array<vec4f, NUM_MAPS \* 3>;/;if(t<0||A<t||!a.test(i))throw new Error("Shared shader material sampling boundary changed.");return`enable ${e};
`+(i.slice(0,t)+kh+i.slice(A)).replace(a,zh).replace(/mapInfo\[([^\]\n]+) \+ NUM_MAPS \* 2\]\.x > 0\.5/g,"materialTextureInfo[$1].resources.z != 0u").replace(/@group\((\d)\) @binding\((\d+)\)/g,(r,n,s)=>{const o=Number(n);return o===0?r:`@group(${o===1?0:o-1}) @binding(${Number(s)+(o===1?4:0)})`})}function Fh(){const i=vc().map((e,t)=>t!==1?e:{...e,entries:Array.from(e.entries).filter(A=>A.binding!==0&&A.binding!==1).map(A=>A.binding===3?{binding:3,visibility:GPUShaderStage.COMPUTE,buffer:{type:"read-only-storage"}}:A)});return[{label:"Bindless scene",entries:[...i[0].entries,...Array.from(i[1].entries).map(e=>({...e,binding:e.binding+4}))]},i[2],i[3]]}const zh=`struct MaterialTextureInfo {
uvTransform: vec4f,
resources: vec4u,
extent: vec4u,
};
@group(1) @binding(3) var<storage, read> materialTextureInfo: array<MaterialTextureInfo>;`,kh=`fn decodeMapColor(idx: i32, c: vec3f) -> vec3f {
if (materialTextureInfo[idx].resources.w != 0u) { return c; }
return mG(c);
}
fn ah(val: i32) -> vec2f {
return vec2f(f32(val >> 8), f32(val & 0xff) / 255.0);
}
fn jO(idx: i32) -> vec2f { return vec2f(materialTextureInfo[idx].extent.xy); }
fn getMapUvSet(idx: i32, uv: vec2f, uv1: vec2f) -> vec2f {
return select(uv, uv1, materialTextureInfo[idx].resources.z != 0u);
}
fn sampleMap(idx: i32, uv: vec2f) -> vec4f {
let info = materialTextureInfo[idx];
let tex = getResource<texture_2d<f32>>(info.resources.x);
let samp = getResource<sampler>(info.resources.y);
return textureSampleLevel(tex, samp, uv * info.uvTransform.xy + info.uvTransform.zw, 0.0);
}
`,Xt={USE_ENVMAP:1,...ul,HAS_THIN_FILM:2**10,HAS_COAT:2**11,HAS_FUZZ:2**12,HAS_SUBSURFACE:2**13,HAS_SHADOW_CATCHER:2**14};function Ec(i){let e=0;for(const[t,A]of Object.entries(Xt))i[t]&&(e|=A);return e}const QA={transmission:1,metal:2},kt={SphereLight:1,RectLight:2,SpotLight:4,DirectionalLight:8,emissive:16},Nh=3,Gh=31;function Hh(i,e){let t=e>0?kt.emissive:0;for(const A of i)switch(A){case"SphereLight":t|=kt.SphereLight;break;case"RectLight":t|=kt.RectLight;break;case"SpotLight":t|=kt.SpotLight;break;case"DirectionalLight":t|=kt.DirectionalLight;break}return t}function Wh(i,e){return(i.SCENE_CAPABILITIES&e.SCENE_CAPABILITIES)===e.SCENE_CAPABILITIES&&(i.MATERIAL_CAPABILITIES&e.MATERIAL_CAPABILITIES)===e.MATERIAL_CAPABILITIES&&(i.LIGHT_CAPABILITIES&e.LIGHT_CAPABILITIES)===e.LIGHT_CAPABILITIES}function qs(i,e){let t=Ec(i)|(e?.SCENE_CAPABILITIES??0);const A=QA.metal|Number(i.MATERIAL_CAPABILITIES??0)|(e?.MATERIAL_CAPABILITIES??0),a=Xt.HAS_COAT|Xt.HAS_FUZZ;return(t&a)!==0&&(t|=a),{SCENE_CAPABILITIES:t,MATERIAL_CAPABILITIES:A,LIGHT_CAPABILITIES:Number(i.LIGHT_CAPABILITIES??0)|(e?.LIGHT_CAPABILITIES??0)}}function jh(i,e,t,A,a=0){const r=i.some(c=>c.bevelSize>0),n=i.some(c=>c.transmissionDispersionScale>0),s=i.some(un),o=Math.max(Math.ceil(+e.defines.NUM_MAPS/10)*10,Number(a??0),20),l=i.some(c=>c.coatWeight>0&&(!!c.normalMap||!!c.coatNormalMap));return{MATERIAL_CAPABILITIES:(i.some(c=>c.transmissionWeight!==0||!!c.map&&c.mapAlphaUsage==="transmission")?QA.transmission:0)|(i.some(c=>c.baseMetalness!==0)?QA.metal:0),USE_UV1:e.bufferData.mapUvChannel.some(c=>c>.5),USE_TANGENT:t.tangent!=null&&i.some(c=>c.specularAnisotropy>0||c.coatAnisotropy>0||!!c.coatNormalMap&&c.coatWeight>0),USE_COAT_NORMAL_FRAMES:l,USE_ANISOTROPY_DIRECTIONS:l||i.some(c=>c.specularAnisotropy>0&&(c.specularAnisotropyModel==="gltf"||!!c.anisotropyMap||c.specularAnisotropyRotation!==0)||c.coatAnisotropy>0&&c.coatAnisotropyRotation!==0),HAS_MEDIUM:s,HAS_SHADOW_CATCHER:i.some(c=>c.shadowCatcher),HAS_THIN_FILM:i.some(c=>c.thinFilmWeight>0),HAS_COAT:i.some(c=>c.coatWeight>0),HAS_FUZZ:i.some(c=>c.fuzzWeight>0),HAS_SUBSURFACE:i.some(c=>c.subsurfaceWeight>0),HAS_BEVEL:r,HAS_ALPHA_MASK:i.some(c=>pA(c)==="mask"),HAS_ALPHA_BLEND:i.some(c=>pA(c)==="blend"),HAS_ALPHA:i.some(c=>pA(c)!=="opaque"),SPECTRAL:n,BEVEL_SAMPLES:A,USE_RR:!0,RR_MAX:s?12:2,NUM_UNIFORM_LIGHTS:64,...e.defines,NUM_MAPS:o,...Cu(e.defines),USE_NORMAL_MAPS:+e.defines.NUM_NORMAL_MAPS>0}}const Yh=48,za=`
struct ShadowCatcherAccumulation {

mask: vec4f,
background: vec4f,


moments: vec4f,
}
`,Vh=`
const hp: array<vec4f, 128> = array<vec4f, 128>(
vec4f(-0.971247852, -0.202764958, 0.999698818, 0.0245412290),
vec4f(-0.808660269, 0.547487736, 0.997290432, 0.0735645667),
vec4f(-0.942509234, 0.187289074, 0.992479563, 0.122410677),
vec4f(-0.763038993, -0.558020830, 0.985277653, 0.170961902),
vec4f(-0.929654300, -0.00785388052, 0.975702107, 0.219101235),
vec4f(-0.656618595, 0.740912974, 0.963776052, 0.266712785),
vec4f(-0.817265987, 0.373183846, 0.949528158, 0.313681751),
vec4f(-0.793490529, -0.386950523, 0.932992816, 0.359895051),
vec4f(-0.860713601, -0.105764769, 0.914209723, 0.405241340),
vec4f(-0.604139447, 0.619064212, 0.893224299, 0.449611336),
vec4f(-0.787263036, 0.281084418, 0.870086968, 0.492898226),
vec4f(-0.673318744, -0.468566477, 0.844853580, 0.534997642),
vec4f(-0.799623907, 0.0901312605, 0.817584813, 0.575808227),
vec4f(-0.570307195, -0.676738262, 0.788346410, 0.615231633),
vec4f(-0.627450705, 0.452229142, 0.757208824, 0.653172851),
vec4f(-0.698281944, -0.294418186, 0.724247098, 0.689540565),
vec4f(-0.726036906, -0.153989345, 0.689540505, 0.724247098),
vec4f(-0.523753047, 0.608020604, 0.653172791, 0.757208884),
vec4f(-0.671607554, 0.233185455, 0.615231574, 0.788346410),
vec4f(-0.491990626, -0.494420350, 0.575808167, 0.817584813),
vec4f(-0.678437173, 0.0412081257, 0.534997642, 0.844853580),
vec4f(-0.495611340, -0.807542920, 0.492898196, 0.870086968),
vec4f(-0.508582473, 0.402262419, 0.449611306, 0.893224299),
vec4f(-0.537693322, -0.333672792, 0.405241281, 0.914209783),
vec4f(-0.614562631, -0.0568606183, 0.359894961, 0.932992816),
vec4f(-0.452296555, 0.809743226, 0.313681662, 0.949528217),
vec4f(-0.492342144, 0.317682207, 0.266712755, 0.963776052),
vec4f(-0.403601944, -0.406031638, 0.219101220, 0.975702107),
vec4f(-0.537260950, 0.137945175, 0.170961857, 0.985277653),
vec4f(-0.404928178, -0.715918541, 0.122410625, 0.992479563),
vec4f(-0.386338592, 0.556550741, 0.0735644922, 0.997290432),
vec4f(-0.445942074, -0.242918074, 0.0245411359, 0.999698818),
vec4f(-0.459759980, -0.175696611, -0.0245412234, 0.999698818),
vec4f(-0.359771132, 0.682195961, -0.0735645741, 0.997290432),
vec4f(-0.412575692, 0.205535084, -0.122410707, 0.992479503),
vec4f(-0.336475104, -0.646421731, -0.170961946, 0.985277653),
vec4f(-0.429363400, 0.0166855231, -0.219101310, 0.975702107),
vec4f(-0.319253087, -0.925218344, -0.266712844, 0.963776052),
vec4f(-0.294470191, 0.430103362, -0.313681722, 0.949528158),
vec4f(-0.281283021, -0.387403429, -0.359895051, 0.932992816),
vec4f(-0.358183086, -0.0808178857, -0.405241340, 0.914209723),
vec4f(-0.271769434, 0.854052365, -0.449611366, 0.893224299),
vec4f(-0.244775921, 0.311606824, -0.492898166, 0.870087028),
vec4f(-0.244355842, -0.552090824, -0.534997702, 0.844853520),
vec4f(-0.283291280, 0.112162955, -0.575808167, 0.817584813),
vec4f(-0.224362880, -0.823741674, -0.615231693, 0.788346350),
vec4f(-0.210826442, 0.610893846, -0.653172851, 0.757208824),
vec4f(-0.191608176, -0.297364026, -0.689540684, 0.724246979),
vec4f(-0.207833603, -0.124338157, -0.724247158, 0.689540505),
vec4f(-0.176593989, 0.814833522, -0.757208824, 0.653172851),
vec4f(-0.158949688, 0.293469012, -0.788346469, 0.615231514),
vec4f(-0.152046368, -0.648668587, -0.817584813, 0.575808167),
vec4f(-0.167782038, 0.0643178672, -0.844853640, 0.534997463),
vec4f(-0.128430068, -0.907204390, -0.870087028, 0.492898136),
vec4f(-0.115809105, 0.572147131, -0.893224299, 0.449611366),
vec4f(-0.103222348, -0.403248310, -0.914209783, 0.405241221),
vec4f(-0.112737618, -0.0319865458, -0.932992816, 0.359895051),
vec4f(-0.0796749964, 0.955433667, -0.949528217, 0.313681602),
vec4f(-0.0672519580, 0.453793734, -0.963776052, 0.266712725),
vec4f(-0.0551275201, -0.538435221, -0.975702167, 0.219101071),
vec4f(-0.0426490456, 0.204346836, -0.985277653, 0.170961812),
vec4f(-0.0306719355, -0.790655255, -0.992479503, 0.122410700),
vec4f(-0.0184057076, 0.708510995, -0.997290492, 0.0735644475),
vec4f(-0.00613544276, -0.291185349, -0.999698818, 0.0245412104),
vec4f(0.00613530306, -0.244297966, -0.999698818, -0.0245413855),
vec4f(0.0184059385, 0.755400777, -0.997290432, -0.0735646188),
vec4f(0.0306059923, 0.253786176, -0.992479503, -0.122410871),
vec4f(0.0429276451, -0.743136168, -0.985277653, -0.170961991),
vec4f(0.0701737553, 0.00441496586, -0.975702107, -0.219101235),
vec4f(0.0674433559, -0.992085159, -0.963776052, -0.266712904),
vec4f(0.0794365108, 0.499346048, -0.949528158, -0.313681781),
vec4f(0.0915081054, -0.485832185, -0.932992756, -0.359895200),
vec4f(0.101071075, -0.0861614645, -0.914209723, -0.405241400),
vec4f(0.116242222, 0.872919321, -0.893224180, -0.449611515),
vec4f(0.126407236, 0.359021723, -0.870086908, -0.492898285),
vec4f(0.139908314, -0.603366435, -0.844853580, -0.534997642),
vec4f(0.168981716, 0.0979395211, -0.817584693, -0.575808346),
vec4f(0.164669126, -0.853637457, -0.788346410, -0.615231633),
vec4f(0.175589874, 0.605686426, -0.757208705, -0.653172970),
vec4f(0.181917489, -0.321471483, -0.724247038, -0.689540625),
vec4f(0.219242185, -0.135647133, -0.689540565, -0.724247098),
vec4f(0.212299466, 0.790099680, -0.653172910, -0.757208765),
vec4f(0.208243251, 0.240495890, -0.615231574, -0.788346469),
vec4f(0.234419063, -0.640313387, -0.575808048, -0.817584932),
vec4f(0.315854102, 0.0532567836, -0.534997344, -0.844853759),
vec4f(0.260333687, -0.894772291, -0.492898196, -0.870086968),
vec4f(0.265374005, 0.502337217, -0.449611217, -0.893224359),
vec4f(0.267429054, -0.339113116, -0.405241072, -0.914209843),
vec4f(0.380209267, -0.0445682108, -0.359895110, -0.932992756),
vec4f(0.307221651, 0.891683638, -0.313681692, -0.949528217),
vec4f(0.296788067, 0.329054117, -0.266712576, -0.963776112),
vec4f(0.317195147, -0.457708418, -0.219100907, -0.975702226),
vec4f(0.419729054, 0.148764044, -0.170961887, -0.985277653),
vec4f(0.349995196, -0.727014899, -0.122410536, -0.992479563),
vec4f(0.356363803, 0.594497383, -0.0735642835, -0.997290492),
vec4f(0.434345096, -0.231501341, -0.0245412868, -0.999698818),
vec4f(0.480473697, -0.164373189, 0.0245413091, -0.999698818),
vec4f(0.392657876, 0.681903303, 0.0735647827, -0.997290432),
vec4f(0.492657542, 0.218807966, 0.122411035, -0.992479503),
vec4f(0.409054011, -0.584142148, 0.170961916, -0.985277653),
vec4f(0.569577277, 0.0289491210, 0.219101399, -0.975702107),
vec4f(0.442882210, -0.855257273, 0.266713053, -0.963775992),
vec4f(0.459734946, 0.387970626, 0.313681692, -0.949528217),
vec4f(0.513070345, -0.343044043, 0.359895140, -0.932992756),
vec4f(0.629031241, -0.0690753013, 0.405241549, -0.914209664),
vec4f(0.483215511, 0.773316741, 0.449611664, -0.893224120),
vec4f(0.586818159, 0.310843110, 0.492898226, -0.870086968),
vec4f(0.528679490, -0.427168757, 0.534997761, -0.844853461),
vec4f(0.683721542, 0.126429096, 0.575808465, -0.817584634),
vec4f(0.517971814, -0.658907175, 0.615231574, -0.788346410),
vec4f(0.548397303, 0.476606160, 0.653172910, -0.757208765),
vec4f(0.695181608, -0.259932309, 0.689540744, -0.724246919),
vec4f(0.748597383, -0.117820688, 0.724247038, -0.689540625),
vec4f(0.556980729, 0.641256869, 0.757208884, -0.653172791),
vec4f(0.741829991, 0.268901259, 0.788346529, -0.615231454),
vec4f(0.647817433, -0.477341115, 0.817584991, -0.575807929),
vec4f(0.816602290, 0.0779312477, 0.844853580, -0.534997642),
vec4f(0.599919200, -0.671730816, 0.870087087, -0.492898077),
vec4f(0.724726558, 0.447135508, 0.893224418, -0.449611068),
vec4f(0.810727239, -0.307791352, 0.914209723, -0.405241370),
vec4f(0.882583082, -0.0201240778, 0.932992816, -0.359894961),
vec4f(0.645550549, 0.729843259, 0.949528277, -0.313681543),
vec4f(0.839177251, 0.362342149, 0.963776171, -0.266712397),
vec4f(0.839526892, -0.399391353, 0.975702107, -0.219101220),
vec4f(0.928934336, 0.175204813, 0.985277653, -0.170961723),
vec4f(0.774228692, -0.569184363, 0.992479563, -0.122410372),
vec4f(0.815476179, 0.537282884, 0.997290432, -0.0735645965),
vec4f(0.968665719, -0.214761987, 0.999698818, -0.0245411228)
);
`,qh=Vh+`
struct oa {
diffuse: vec3f,
specular: vec3f,
}
fn hN(prepared: ag, qQ: bool, kY: bool) -> oa {
var result = oa();
let view = prepared.viewLocal;
if (view.z <= 1e-6) { return result; }
let material = prepared.material;
let alpha = vec2f(material.alphaX, material.alphaY);
let mg = aF(view, alpha);
let jl = prepared.weights[OPENPBR_LOBE_DIFFUSE];
let gb = prepared.weights[OPENPBR_LOBE_METAL];
let specularWeight = prepared.weights[OPENPBR_LOBE_SPECULAR];
var ei = 1.0;
if (kY && prepared.dielectricMsProbability > 0.0) {
ei = max(bf(prepared.refractionEtaTOverEtaI, prepared.specularAlpha), 1e-12);
}
let cr = normalize(vec3f(alpha, 1.0) * view);
let qP = min(cr.z, 1.0);
let kh = 1.0 + qP;
let count = 256u * min(rtUniform.loopUnrollGuard, 4u) / 4u;
for (var i = 0u; i < count; i++) {
let vV = i / 2u;
let u = vec2f((f32(vV) + 0.5) / f32(count / 2u),
fract(f32(reverseBits(vV)) * 2.3283064365386963e-10 + 0.37));
let kK = hp[vV];


let hO = prepared.specularAlpha < 0.001 || count != 256u;
var light = vec3f(kK.xy, sqrt(max(0.0, 1.0 - dot(kK.xy, kK.xy))));
if (hO) { light = aO(u); }
if ((i & 1u) != 0u) {
let kC = (1.0 - u.y) * kh;
let ex = sqrt(max(0.0, (kC + (1.0 - qP)) * (u.y * kh)));
var half = normalize(vec3f(alpha, 1.0) * vec3f(cr.xy + ex * kK.zw, kC));
if (hO) { half = aD(view, alpha, u); }
light = reflect(-view, half);
}

if (light.z <= 0.0) { continue; }
let half = normalize(view + light);
let qH = mg * cW(half, alpha) / (4.0 * view.z);
let pdf = 0.5 * (light.z * INVPI + qH);


let aA = openpbr_to_local(prepared.basis, openpbr_to_world(prepared.basis, light));
if (aA.z <= 0.0) { continue; }
let scale = abs(aA.z) / (pdf * f32(count));
if (qQ && jl > 0.0) {
let compensation = prepared.diffuseSpecularEnergyCompensation * aw(
prepared.specularEtaTOverEtaI, prepared.specularAlpha, abs(aA.z));
var sZ = 0.0;
result.diffuse += jl * bJ(material, prepared.diffuseColor,
view, aA, compensation, &sZ) * scale;
}
if (kY) {
let jn = normalize(view + aA);
let bm = abs(dot(view, jn));
var bG = vec3f(0.0);
if (specularWeight > 0.0) {
var dielectric = vec3f(af(bm, material.relativeIor));
if (material.thinWalled) { dielectric = av(dielectric, material.transmissionWeight); }
bG += specularWeight * material.specularColor * dielectric;
}
if (gb > 0.0) {
bG += gb * material.specularWeight * cw(bm,
material.baseWeight * material.baseColor, material.specularColor);
}
let rJ = cW(jn, alpha) * mg
* aF(aA, alpha) / (4.0 * max(aA.z * view.z, 1e-8));
var reflection = bG * rJ;
if (gb > 0.0 && prepared.metalMsFactor > 0.0) {
let cL = min(prepared.metalMsFactor * aV(prepared.specularAlpha, aA.z), 1.0 / max(aA.z, 1e-8));
reflection += gb * prepared.metalMsScale * cL * INVPI;
}
if (prepared.dielectricMsProbability > 0.0) {
let oZ = prepared.dielectricMsViewLoss * bb(
prepared.refractionEtaTOverEtaI, prepared.specularAlpha, abs(aA.z)) / ei;
let cL = min(oZ * prepared.dielectricMsReflectionRatio, 1.0 / abs(aA.z));
reflection += prepared.dielectricMsReflectionScale * cL * INVPI;
}
result.specular += reflection * scale;
}
}
return result;
}
fn vT(prepared: ag) -> oa {
return hN(prepared, true, true);
}
`,Jh=`
override AOV_REFLECTANCE: bool = true;
struct AovAccumulation {
depthRoughness: vec4f,
position: vec4f,
diffuse: vec4f,
specular: vec4f,
}
struct AovCenter { identity: vec4u, motion: vec4f, }
@group(3) @binding(5) var<storage, read_write> aovAccum: array<AovAccumulation>;
@group(3) @binding(6) var<storage, read_write> aovCenter: array<AovCenter>;
@group(3) @binding(7) var<storage, read> aovScene: array<u32>;
@group(3) @binding(9) var<storage, read> aovPrevious: array<AovCenter>;
@group(3) @binding(8) var<uniform> aovParameters: vec4u;

fn ow(offset: u32) -> mat4x4f {
return mat4x4f(bitcast<vec4f>(vec4u(aovScene[offset], aovScene[offset+1u], aovScene[offset+2u], aovScene[offset+3u])),
bitcast<vec4f>(vec4u(aovScene[offset+4u], aovScene[offset+5u], aovScene[offset+6u], aovScene[offset+7u])),
bitcast<vec4f>(vec4u(aovScene[offset+8u], aovScene[offset+9u], aovScene[offset+10u], aovScene[offset+11u])),
bitcast<vec4f>(vec4u(aovScene[offset+12u], aovScene[offset+13u], aovScene[offset+14u], aovScene[offset+15u])));
}
fn iN(offset:u32)->vec3f {return bitcast<vec3f>(vec3u(aovScene[offset],aovScene[offset+1u],aovScene[offset+2u]));}
fn mQ(xe: Ray, si: ptr<function, SurfaceInteraction>, material: ptr<function, OpenPbrResolvedMaterial>) -> bool {
var ray = xe;
(*si).triangleIndex = -1;
for (var layer = 0; layer < 32; layer++) {
intersectScene(ray, si, 0, false, false);
if (!(*si).hit) { return false; }
dg(material, (*si).materialIndex, (*si).uv, (*si).uv1, (*si).instanceIndex, (*si).vertexColor);
if ((*material).materialType != SHADOW_CATCHER && (*material).alpha >= 0.5) { return true; }
ray.o = (*si).position + ray.d * (EPS * 0.02);
}
return false;
}
@compute @workgroup_size(8, 8)
fn aovTrace(@builtin(global_invocation_id) id: vec3u) {
let size = aovParameters.xy;
if (any(id.xy >= size)) { return; }
let index = id.x + id.y * size.x;
let sample = aovParameters.z;
if (sample == 0u) { aovAccum[index] = AovAccumulation(); }
aZ = id.xy; aQ = sample + rtUniform.sampleSequenceOffset;
bT = 0u; cP = 0u;
gW(id.xy, i32(aQ ^ dG(rtUniform.sequenceSeed)));
let uv = (vec2f(id.xy) + dZ(CAMERA_PIXEL)) / vec2f(size);
var ray = fj(uv);
if (cameraUniform.apertureRadius > 0.0) {
let eye = cameraUniform.viewInv[3].xyz;
let forward = -normalize(cameraUniform.viewInv[2].xyz);
let jN = eye + ray.d * (cameraUniform.focusDistance / dot(ray.d, forward));
let xU = cameraUniform.apertureRadius * kN(dZ(CAMERA_LENS));
let origin = (cameraUniform.viewInv * vec4f(xU, 0.0, 1.0)).xyz;
gC(&ray, origin, normalize(jN-origin));
}
var si: SurfaceInteraction; var material: OpenPbrResolvedMaterial;
if (!mQ(ray, &si, &material)) { return; }
let depth = max(dot(si.position-cameraUniform.viewInv[3].xyz, -normalize(cameraUniform.viewInv[2].xyz)), 0.0);
let unsupported = (material.materialType != STANDARD) | (material.alpha < 1.0) |
(material.coatWeight > 0.0) | (material.fuzzWeight > 0.0) |
(material.specularAnisotropy > 0.0) | (material.subsurfaceWeight > 0.0) |
(dot(material.mediumScattering, material.mediumScattering) > 0.0) |
(material.bevel > 0.0) | (material.thinFilmWeight > 0.0) |
(material.transmissionDispersionScale > 0.0);
aovAccum[index].depthRoughness += vec4f(depth, material.specularRoughness, material.baseMetalness, select(0.0,1.0,unsupported));
if (AOV_REFLECTANCE && (aovParameters.w & 24u) != 0u && !unsupported) {
var normal=si.normal; var face=si.faceNormal;
var cosine=-dot(normal,ray.d); var fu=-dot(face,ray.d);
if (material.thinWalled && (material.transmissionWeight>0.0 || material.subsurfaceWeight>0.0)) {
if(cosine<0.0){normal=-normal;cosine=-cosine;}
if(fu<0.0){face=-face;fu=-fu;}
}
if(fu>=0.0 && cosine<0.0){normal=face;cosine=fu;}
normal=select(-normal,normal,cosine>=0.0);
material.inside=(cosine<=0.0) && !material.thinWalled;
material.relativeIor=select(material.specularIor,1.0/material.specularIor,cosine>0.0);
let prepared=ds(si.tangent,material,-ray.d,normal);
let reflectance=hN(prepared, (aovParameters.w & 8u) != 0u, (aovParameters.w & 16u) != 0u);
aovAccum[index].diffuse+=vec4f(reflectance.diffuse,1.0);
aovAccum[index].specular+=vec4f(reflectance.specular,1.0);
}
aovAccum[index].position += vec4f(si.position, 1.0);
}
@compute @workgroup_size(8, 8)
fn aovTraceCenter(@builtin(global_invocation_id) id: vec3u) {
let size = aovParameters.xy;
if (any(id.xy >= size)) { return; }
let index = id.x + id.y * size.x;
aovCenter[index] = AovCenter(vec4u(0xffffffffu), vec4f(0.0));
let uv = (vec2f(id.xy) + 0.5) / vec2f(size);
let ray = fj(uv);
var si: SurfaceInteraction; var material: OpenPbrResolvedMaterial;
if (!mQ(ray, &si, &material)) { return; }
let offset = 52u + u32(si.instanceIndex) * 24u;
let materialOffset = aovScene[16u];
let primitiveOffset = aovScene[17u];
aovCenter[index].identity = vec4u(aovScene[offset], aovScene[offset+1u],
aovScene[materialOffset + u32(si.materialIndex)], aovScene[primitiveOffset + u32(si.triangleIndex)]);
aovCenter[index].motion.z = dot(si.position-iN(36u),iN(40u));
if (aovScene[offset+2u] == 0u) { return; }
let qA = ow(offset+4u) * vec4f(si.position,1.0);
let ps = ow(0u) * qA;
if (ps.w <= 0.0) { return; }
let tX=ps.xyz/ps.w;
let iz=(tX.xy*0.5+0.5)*vec2f(size);
if (any(iz < vec2f(0.0)) || any(iz >= vec2f(size)) || abs(tX.z)>1.0) { return; }
let previous=aovPrevious[u32(iz.x)+u32(iz.y)*size.x];
let qz=dot(qA.xyz-iN(44u),iN(48u));
if (any(previous.identity.xy != aovCenter[index].identity.xy) || abs(previous.motion.z-qz)>max(1e-4,abs(qz)*1e-3)) { return; }
let motion=(iz-(vec2f(id.xy)+0.5))*vec2f(1.0,-1.0);
aovCenter[index].motion=vec4f(motion,aovCenter[index].motion.z,3.0);
}
`,$h=`
@group(3) @binding(4) var<uniform> depthArea: vec4f;

@compute @workgroup_size(${Gt}, ${Gt})
fn depthQuery(@builtin(global_invocation_id) id: vec3u) {
let index = id.x + id.y * ${Gt}u;
let offset = vec2f(id.xy) / ${Gt-1}.0 * 2.0 - 1.0;
let uv = depthArea.xy + depthArea.zw * offset * vec2f(1.0, -1.0);
outColor[index] = vec4f(0.0);
if (any(uv < vec2f(0.0)) || any(uv > vec2f(1.0))) { return; }
var ray = fj(uv);
let eye = cameraUniform.viewInv[3].xyz;
let forward = -normalize(cameraUniform.viewInv[2].xyz);
var si: SurfaceInteraction;
si.triangleIndex = -1;



for (var layer = 0; layer < 32; layer++) {
intersectScene(ray, &si, 0, false, false);
if (!si.hit) { return; }
var material: OpenPbrResolvedMaterial;
dg(&material, si.materialIndex, si.uv, si.uv1, si.instanceIndex, si.vertexColor);
if (material.materialType != SHADOW_CATCHER && material.alpha > 0.0) {
outColor[index] = vec4f(max(dot(si.position - eye, forward), 0.0), 0.0, 0.0, 0.0);
return;
}
ray.o = si.position + ray.d * (EPS * 0.02);
}
}
`,Kh=`

const PI = 3.14159265359;
const TWOPI = 6.28318530718;
const INVPI = 0.31830988618;
const INVPI2 = 0.10132118364;
const EPS = 0.0005;
const INV4PI = 0.07957747154594766;
const INF = 1.0e+38;
const ROUGHNESS_MIN = 0.001;



fn sR(position: vec3f, geometricNormal: vec3f, direction: vec3f) -> vec3f {
let normal = select(-geometricNormal, geometricNormal, dot(geometricNormal, direction) >= 0.0);
let rm = vec3i(256.0 * normal);
let bits = bitcast<vec3i>(position);
let xC = bitcast<vec3f>(bits + select(rm, -rm, position < vec3f(0.0)));
return select(xC, position + normal / 65536.0, abs(position) < vec3f(1.0 / 32.0));
}

`;function Xh({hasAnisotropyDirections:i=!0,hasCoatNormals:e=!1,hasSceneAlpha:t=!0,lightCapabilities:A=Gh}){return`

const luminance = vec3f(0.2126, 0.7152, 0.0722);
const RAY_MAX_DISTANCE = 9999.0;

const STANDARD = 0;
const UNLIT = ${fn};
const SHADOW_CATCHER = ${cn};

const RECT_LIGHT = ${Sa};
const SPHERE_LIGHT = ${Pa};
const DIRECTIONAL_LIGHT = ${Ia};
const SPOT_LIGHT = ${Da};
const HAS_SCENE_SPHERE_LIGHT = ${(A&kt.SphereLight)!==0};
const HAS_SCENE_RECT_LIGHT = ${(A&kt.RectLight)!==0};
const HAS_SCENE_SPOT_LIGHT = ${(A&kt.SpotLight)!==0};
const HAS_SCENE_DIRECTIONAL_LIGHT = ${(A&kt.DirectionalLight)!==0};
const HAS_SCENE_EMISSIVE_LIGHT = ${(A&kt.emissive)!==0};

struct Ray {
o: vec3f,
d: vec3f,
};

struct SurfaceInteraction {
position: vec3f,



albedoSampled: bool,

normal: vec3f, 
${e?`
coatNormal: vec3f, 
`:""}
vertexNormal: vec3f, 
shadowOffset: vec3f, 

faceNormal: vec3f, 
hit: bool,

tangent: vec3f,
${i?`
directionTangent: vec3f,
directionBitangent: vec3f,
geometryTangent: vec3f,
geometryBitangent: vec3f,
`:""}
uv: vec2f,
uv1: vec2f,
vertexColor: vec3f,

triangleIndex: i32,
instanceIndex: i32,
materialIndex: i32,
barycentrics: vec2f,

wavelength: f32,

mediumType: i32,
mediumExtinction: vec3f,
mediumScattering: vec3f,
mediumAnisotropy: f32,

};




struct OpenPbrResolvedMaterial {
baseColor: vec3f,
transmissionWeight: f32,

emission: vec3f,
specularAnisotropy: f32,

baseMetalness: f32,
specularIor: f32,
specularRoughness: f32,

transmissionDispersionScale: f32,
dispersionAbbeNumber: f32,
thinFilmThickness: f32,
thinFilmIor: f32,
thinFilmWeight: f32,


mediumType: i32,
mediumExtinction: vec3f,
mediumScattering: vec3f,
mediumAnisotropy: f32,

baseWeight: f32,
diffuseRoughness: f32,
specularWeight: f32,
specularColor: vec3f,
subsurfaceWeight: f32,
subsurfaceColor: vec3f,
transmissionColor: vec3f,
fuzzWeight: f32,
fuzzColor: vec3f,
fuzzRoughness: f32,
coatWeight: f32,
coatColor: vec3f,
coatRoughness: f32,
coatAnisotropy: f32,
${i?`
anisotropyDirection: vec2f,
anisotropyDirectionEnabled: bool,
coatAnisotropyRotation: f32,
${i?`
directionTangent: vec3f,
directionBitangent: vec3f,
geometryTangent: vec3f,
geometryBitangent: vec3f,
`:""}
`:""}
${e?`
coatNormal: vec3f,
coatNormalEnabled: bool,
geometricNormal: vec3f, 
`:""}
coatIor: f32,
coatDarkening: f32,


alpha: f32,
${t?"alphaMode: i32,":""}

materialType: i32,

bevel: f32,

relativeIor: f32,
inside: bool,

alphaX: f32,
alphaY: f32,
thinWalled: bool,
};

struct Path {
ray: Ray,
li: vec3f,
alpha: f32,
beta: vec3f,
fromEye: bool,
abort: bool,
scatteringPdf: f32,
scatteringIsDelta: bool,
isNextRefraction: bool,
};

struct LightSampleRec {
normal: vec3f,
emission: vec3f,
direction: vec3f,
dist: f32,
pdf: f32,



selectionPmf: f32,
isDelta: bool,

sourceType: u32,
sourceIndex: u32,
};

struct Light {
position: vec3f,
litType: f32,

emission: vec3f,
area: f32,

u: vec3f,

radiusOrSpread: f32,

v: vec3f,
textureIndex: f32,

selectionPmf: f32,
_samplingPadding0: f32,
_samplingPadding1: f32,
_samplingPadding2: f32,
iesReference: vec3f,
_iesPadding: f32,
};

struct EmissiveTriangle {
p0: vec3f,
selectionPmf: f32,
p1: vec3f,
area: f32,
p2: vec3f,
materialIndex: f32,
uv0: vec2f,
uv1: vec2f,
uv2: vec2f,
secondaryUv0: vec2f,
secondaryUv1: vec2f,
secondaryUv2: vec2f,
};

struct qb {
probability: f32,
aliasIndex: i32,
sourceType: i32,
sourceIndex: i32,
};

${_u()}

struct CameraUniform {
viewProjectionInv: mat4x4<f32>,
viewInv: mat4x4<f32>,
apertureRadius: f32,
focusDistance: f32,
};

struct RayTraceUniform {
outputSize: vec2f,
sampleCount: f32,
scaleOffset: vec4f,
lightsCount: i32,
transmissiveOutputAlphaMin: f32,
jitter: vec2f,
backgroundColor: vec4f,
groundedBackgroundParams: vec4f,
groundedBackgroundCenter: vec2f,
blasOffset: i32,
isEmpty: i32,
bevel: i32,
dispersionWavelengths: i32,
envLightPmf: f32,
lightChoiceCount: i32,
lightWeightTotal: f32,
lightSamplingTextureWidth: i32,
lightChoiceTexelOffset: i32,
bounces: i32,
varianceMoments: i32,
adaptiveSampling: i32,
clamping: f32,
directLightCandidates: i32,
backgroundFlags: i32,

loopUnrollGuard: u32,
sceneFeatureFlags: u32,
sequenceSeed: u32,
zSobolLogSPP: u32,
sampleSequenceOffset: u32,

shadowCatcherChoiceOffset: i32,
shadowCatcherChoiceCount: i32,
environmentRotation: mat4x4f,
backgroundMapTransform: vec4f,
backgroundMapRotation: mat4x4f,
}


@group(0) @binding(0) var<storage, read> bvhBuffer: array<vec4f>;
@group(0) @binding(1) var<storage, read> instancesBuffer: array<vec4f>;
@group(0) @binding(2) var<storage, read> attrBuffers: array<${i?"vec4f":"vec3f"}>;
@group(0) @binding(3) var<storage, read> materialsBuffer: array<MaterialBuffer>;


@group(1) @binding(0) var mapSampler: sampler;
@group(1) @binding(1) var map: texture_2d_array<f32>;


@group(1) @binding(3) var<uniform> mapInfo: array<vec4f, NUM_MAPS * 3>;
@group(1) @binding(4) var envMap: texture_2d<f32>;
@group(1) @binding(5) var envMapDistribution: texture_2d<f32>;
@group(1) @binding(6) var backgroundMap: texture_2d<f32>;
@group(1) @binding(8) var lightSamplingData: texture_2d<f32>;
@group(1) @binding(9) var openPbrEnergyLut: texture_2d<f32>;
@group(1) @binding(10) var adaptiveSampleTargets: texture_2d<f32>;

fn cS(el: i32, mc: i32) -> f32 {
let iK = el + mc / 4;
let width = rtUniform.lightSamplingTextureWidth;
let packed = textureLoad(lightSamplingData, vec2i(iK % width, iK / width), 0);
return packed[mc % 4];
}

fn lB(el: i32, uv: vec2f) -> f32 {
if (el < 0) { return 1.0; }
let pixel = fract(uv) * 128.0 - vec2f(0.5);
let x0 = i32(floor(pixel.x));
let y0 = i32(floor(pixel.y));
let fx = fract(pixel.x);
let fy = fract(pixel.y);
let xa = select(x0, 127, x0 < 0);
let xb = select(x0 + 1, 0, x0 >= 127);
let ya = select(y0, 127, y0 < 0);
let yb = select(y0 + 1, 0, y0 >= 127);
let a = cS(el, ya * 128 + xa);
let b = cS(el, ya * 128 + xb);
let c = cS(el, yb * 128 + xa);
let d = cS(el, yb * 128 + xb);
return mix(mix(a, b, fx), mix(c, d, fx), fy);
}

fn bP(light: Light, dV: vec3f) -> f32 {
let axis = normalize(light.u);
let ci = dot(axis, dV);
var vm = select(0.0, 1.0, ci >= light.v.x);
if (light.v.y > light.v.x + 1e-6) {
vm = smoothstep(light.v.x, light.v.y, ci);
}
if (vm <= 0.0 || light.textureIndex < 0.0) { return vm; }
let vK = light.iesReference;
let xj = cross(axis, vK);
let vertical = acos(clamp(ci, -1.0, 1.0));
let horizontal = atan2(dot(dV, xj), dot(dV, vK));
return vm * lB(i32(light.textureIndex), vec2f(vertical / PI, horizontal / TWOPI + 0.5));
}




@group(2) @binding(0) var<uniform> cameraUniform: CameraUniform;
@group(2) @binding(1) var<uniform> rtUniform: RayTraceUniform;

@group(2) @binding(2) var<uniform> analyticLights: array<Light, NUM_UNIFORM_LIGHTS>;


fn gC(ray: ptr<function, Ray>, origin: vec3f, direction: vec3f) {
(*ray).o = origin;
(*ray).d = direction;
}
`}function bc({hasAnisotropyDirections:i=!0,hasCoatNormals:e=!1,hasSceneAlpha:t=!0,hasTransmission:A=!0,hasMetalness:a=!0}={}){const r=t?"(*ma).alphaMode = i32(matData.alphaMode);":"",n=t?`
if ((*ma).alphaMode == ${si.opaque}) {
(*ma).alpha = 1.0;
}
else if ((*ma).alphaMode == ${si.mask}) {
(*ma).alpha = select(0.0, 1.0, (*ma).alpha >= matData.alphaCutoff);
}`:"(*ma).alpha = 1.0;";return`

${i?`fn fv(roughness: f32, strength: f32) -> vec2f {
if (strength == 0.0) { return vec2f(roughness, 0.0); }
let u = roughness * roughness;
let a = u + (1.0 - u) * strength * strength;
if (a == 0.0) { return vec2f(0.0); }
return vec2f(pow((a*a + u*u) * 0.5, 0.25), clamp(1.0 - u/a, 0.0, 1.0));
}
`:""}

fn mG(c: vec3f) -> vec3f {
return mix(pow(c * 0.9478672986 + 0.0521327014, vec3f(2.4)), c * 0.0773993808, vec3f(c < vec3f(0.04045)));
}

fn decodeMapColor(idx: i32, c: vec3f) -> vec3f {
if (mapInfo[idx + NUM_MAPS * 2].y > 0.5) { return c; }
return mG(c);
}

fn ah(val: i32) -> vec2f {
return vec2f(f32(val >> 8), f32(val & 0xff) / 255.0);
}

fn jO(idx: i32) -> vec2f {
return mapInfo[idx].xy;
}

fn lT(idx: i32) -> i32 {
return i32(floor(mapInfo[idx].z));
}

fn kt(idx: i32) -> vec2f {
return vec2f(fract(mapInfo[idx].z), mapInfo[idx].w);
}

fn gg(value: f32, mode: f32) -> f32 {
if (mode < 0.5) { return fract(value); }
if (mode < 1.5) { return clamp(value, 0.0, 1.0); }
return 1.0 - abs(1.0 - (value - 2.0 * floor(value * 0.5)));
}

fn kZ(idx: i32, uv: vec2f) -> vec2f {
let transform = mapInfo[idx + NUM_MAPS];
let modes = mapInfo[idx + NUM_MAPS * 2].zw;
let value = uv * transform.xy + transform.zw;
return vec2f(gg(value.x, modes.x), gg(value.y, modes.y));
}

fn tJ(idx: i32, uv: vec2f) -> vec2f {
let rN = kZ(idx, uv);
let jH = 1.0 / vec2f(textureDimensions(map).xy);
let eo = kt(idx);
let kS = jO(idx) + jH;
let pJ = eo - 0.5 * jH;
let ml = eo + kS - jH;
return clamp(
pJ + rN * kS,
eo,
ml
);
}

fn getMapUvSet(idx: i32, uv: vec2f, uv1: vec2f) -> vec2f {
return select(uv, uv1, mapInfo[idx + NUM_MAPS * 2].x > 0.5);
}

fn sampleMap(idx: i32, uv: vec2f) -> vec4f {
let size = vec2i(round(jO(idx) * vec2f(textureDimensions(map).xy) + vec2f(1.0)));
let dk = kZ(idx, uv) * vec2f(size) - vec2f(0.5);
let modes = mapInfo[idx + NUM_MAPS * 2].zw;


if ((size.x > 1 && modes.x < 0.5 && (dk.x < 0.0 || dk.x > f32(size.x - 1))) ||
(size.y > 1 && modes.y < 0.5 && (dk.y < 0.0 || dk.y > f32(size.y - 1)))) {
let base = vec2i(floor(dk));
let weight = fract(dk);
let origin = vec2i(round(kt(idx) * vec2f(textureDimensions(map).xy) - vec2f(0.5)));
return mix(
mix(fe(idx, base, size, origin, modes), fe(idx, base + vec2i(1, 0), size, origin, modes), weight.x),
mix(fe(idx, base + vec2i(0, 1), size, origin, modes), fe(idx, base + vec2i(1, 1), size, origin, modes), weight.x), weight.y);
}
return textureSampleLevel(map, mapSampler, tJ(idx, uv), lT(idx), 0.0);
}

fn fe(idx: i32, jJ: vec2i, size: vec2i, origin: vec2i, modes: vec2f) -> vec4f {
var p = clamp(jJ, vec2i(0), size - vec2i(1));
if (modes.x < 0.5) { p.x = ((jJ.x % size.x) + size.x) % size.x; }
if (modes.y < 0.5) { p.y = ((jJ.y % size.y) + size.y) % size.y; }
return textureLoad(map, origin + p, lT(idx), 0);
}


fn getMaterialEmission(materialIndex: i32, uv: vec2f, uv1: vec2f) -> vec3f {
let matData = materialsBuffer[materialIndex];
var emission = matData.emission;
if (USE_EMISSIVE_MAPS) {
let emissiveMapIndex = i32(matData.emissiveMapIndex);
if (emissiveMapIndex >= 0) {
emission *= decodeMapColor(emissiveMapIndex, sampleMap(
emissiveMapIndex, getMapUvSet(emissiveMapIndex, uv, uv1)
).rgb);
}
}
if (USE_COAT_WEIGHT_MAPS && matData.matType == 0.0) {
let coatWeightMapIndex = i32(matData.coatWeightMapIndex);
if (coatWeightMapIndex >= 0) {
let coatWeight = clamp(matData.coatWeight, 0.0, 1.0) * sampleMap(
coatWeightMapIndex, getMapUvSet(coatWeightMapIndex, uv, uv1)
).r;
emission *= mix(vec3f(1.0), sqrt(max(matData.coatColor, vec3f(0.0))), coatWeight);
}
}
return emission;
}


fn aN(roughness: f32, anisotropy: f32) -> vec2f {
let alpha = roughness * roughness;
let qe = ROUGHNESS_MIN * ROUGHNESS_MIN;
if (anisotropy == 0.0) { return vec2f(max(qe, alpha)); }
let dw = 1.0 - anisotropy;
let tp = alpha * sqrt(2.0 / (1.0 + dw * dw));
return max(vec2f(qe), vec2f(tp, dw * tp));
}

fn lp(instanceIndex: i32) -> vec3f {
if (instanceIndex < 0) { return vec3f(1.0); }
return instancesBuffer[instanceIndex * ${te} + 9].xyz;
}

fn dg(
ma: ptr<function, OpenPbrResolvedMaterial>,
materialIndex: i32,
uv: vec2f,
uv1: vec2f,
instanceIndex: i32,
vertexColor: vec3f
) {
let matData = materialsBuffer[materialIndex];

(*ma).baseColor = matData.color;
(*ma).materialType = i32(matData.matType);
(*ma).specularRoughness = matData.roughness;
(*ma).baseMetalness = matData.metallic;
(*ma).specularAnisotropy = clamp(matData.anisotropy, 0.0, 1.0);
(*ma).emission = getMaterialEmission(materialIndex, uv, uv1);
(*ma).inside = false;
(*ma).specularIor = matData.ior;
(*ma).transmissionWeight = matData.transmission;
(*ma).thinWalled = matData.thin > 0.5;
(*ma).bevel = matData.bevel;
(*ma).transmissionDispersionScale = matData.dispersion;
(*ma).dispersionAbbeNumber = max(matData.dispersionAbbeNumber, 1e-6);
(*ma).mediumExtinction = max(matData.mediumExtinction, vec3f(0.0));
(*ma).mediumScattering = max(matData.mediumScattering, vec3f(0.0));
(*ma).mediumAnisotropy = clamp(matData.mediumAnisotropy, -1.0, 1.0);
(*ma).mediumType = select(0, 1, max(max((*ma).mediumExtinction.x, (*ma).mediumExtinction.y), (*ma).mediumExtinction.z) > 0.0);
(*ma).alpha = matData.alpha;
${r}

(*ma).thinFilmThickness = matData.thinFilmThickness * 1000.0;
(*ma).thinFilmIor = matData.thinFilmIor;
(*ma).thinFilmWeight = select(0.0, clamp(matData.thinFilmWeight, 0.0, 1.0), HAS_THIN_FILM);
(*ma).baseWeight = clamp(matData.baseWeight, 0.0, 1.0);
(*ma).diffuseRoughness = clamp(matData.baseDiffuseRoughness, 0.0, 1.0);
(*ma).specularWeight = max(matData.specularWeight, 0.0);
(*ma).specularColor = max(matData.specularColor, vec3f(0.0));
(*ma).subsurfaceWeight = select(0.0, clamp(matData.subsurfaceWeight, 0.0, 1.0), HAS_SUBSURFACE);
(*ma).subsurfaceColor = max(matData.subsurfaceColor, vec3f(0.0));
(*ma).transmissionColor = max(matData.transmissionColor, vec3f(0.0));
(*ma).fuzzWeight = select(0.0, clamp(matData.fuzzWeight, 0.0, 1.0), HAS_FUZZ);
(*ma).fuzzColor = max(matData.fuzzColor, vec3f(0.0));
(*ma).fuzzRoughness = clamp(matData.fuzzRoughness, 0.0, 1.0);
(*ma).coatWeight = select(0.0, clamp(matData.coatWeight, 0.0, 1.0), HAS_COAT);
(*ma).coatColor = max(matData.coatColor, vec3f(0.0));
(*ma).coatRoughness = clamp(matData.coatRoughness, ROUGHNESS_MIN, 1.0);
(*ma).coatAnisotropy = clamp(matData.coatAnisotropy, 0.0, 1.0);
(*ma).coatIor = max(matData.coatIor, 1.0);
(*ma).coatDarkening = clamp(matData.coatDarkening, 0.0, 1.0);

if (USE_DIFFUSE_MAPS) {
let diffuseMapIndex = i32(matData.diffuseMapIndex);
if (diffuseMapIndex >= 0) {

let diffuse = sampleMap(
diffuseMapIndex, getMapUvSet(diffuseMapIndex, uv, uv1)
);


(*ma).baseColor *= decodeMapColor(diffuseMapIndex, diffuse.rgb);


if (matData.mapAlphaUsage == ${Pi.transmission}) {
(*ma).transmissionWeight = 1.0 - diffuse.a;
}
else if (matData.mapAlphaUsage == ${Pi.alpha}) {
(*ma).alpha *= diffuse.a;
}
}
}

${Xe("alphaMap","wgsl")}

${n}

${Xe("transmissionMap","wgsl")}

if (USE_METALLIC_ROUGHNESS_MAPS) {

let mrtMapIndex = i32(matData.mrtMapIndex);
if (mrtMapIndex >= 0) {
let gc = sampleMap(
mrtMapIndex, getMapUvSet(mrtMapIndex, uv, uv1)
);
(*ma).baseMetalness *= gc.b;
(*ma).specularRoughness *= gc.g;
}
}

${Xe("roughnessMap","wgsl")}

${Xe("metalnessMap","wgsl")}

${hl("wgsl")}

${Xe("coatWeightMap","wgsl")}

${e?`

(*ma).coatNormalEnabled = (*ma).coatWeight > 0.0 && (matData.normalMapIndex >= 0.0 || matData.coatNormalMapIndex >= 0.0);
`:""}

${Xe("coatRoughnessMap","wgsl")}

${Xe("fuzzColorMap","wgsl")}

${Xe("fuzzRoughnessMap","wgsl")}

${Xe("specularWeightMap","wgsl")}

${Xe("specularColorMap","wgsl")}

${i?`
(*ma).anisotropyDirection = vec2f(1.0, 0.0);
(*ma).anisotropyDirectionEnabled = matData.specularAnisotropyRotation != 0.0;
(*ma).coatAnisotropyRotation = matData.coatAnisotropyRotation;
if (USE_ANISOTROPY_MAPS && matData.anisotropyMapIndex >= 0.0) {
let index = i32(matData.anisotropyMapIndex);
let dk = sampleMap(index, getMapUvSet(index, uv, uv1));
(*ma).specularAnisotropy *= dk.b;
let direction = dk.rg * 2.0 - 1.0;
if (dot(direction, direction) > 1e-4) { (*ma).anisotropyDirection = normalize(direction); }
(*ma).anisotropyDirectionEnabled = true;
}
if (matData.specularAnisotropyModel > 0.5 && (*ma).specularAnisotropy > 0.0) {
let tU = fv(clamp((*ma).specularRoughness, 0.0, 1.0), (*ma).specularAnisotropy);
(*ma).specularRoughness = tU.x;
(*ma).specularAnisotropy = tU.y;
}
if ((*ma).anisotropyDirectionEnabled) {
let theta = matData.specularAnisotropyRotation;
let d = (*ma).anisotropyDirection;
(*ma).anisotropyDirection = vec2f(cos(theta)*d.x - sin(theta)*d.y, sin(theta)*d.x + cos(theta)*d.y);
}

`:""}


if ((*ma).coatWeight > 0.0 && (*ma).coatRoughness > 0.0) {
let ih = (*ma).specularRoughness * (*ma).specularRoughness;
let ij = (*ma).coatRoughness * (*ma).coatRoughness;
(*ma).specularRoughness = mix((*ma).specularRoughness,
pow(min(1.0, ih * ih + 2.0 * ij * ij), 0.25), (*ma).coatWeight);
}
${A?"":"(*ma).transmissionWeight = 0.0;"}
${a?"":"(*ma).baseMetalness = 0.0;"}
let color = lp(instanceIndex) * vertexColor;
(*ma).baseColor *= color;
if ((*ma).materialType == UNLIT) { (*ma).emission *= color; }

(*ma).specularRoughness = clamp((*ma).specularRoughness, ROUGHNESS_MIN, 1.0);
(*ma).baseMetalness = clamp((*ma).baseMetalness, 0.0, 1.0);
let specularAlpha = aN((*ma).specularRoughness, (*ma).specularAnisotropy);
(*ma).alphaX = specularAlpha.x;
(*ma).alphaY = specularAlpha.y;
}

fn pd(materialIndex: i32, uv: vec2f, normal: vec3f, dp1: vec3f, dp2: vec3f, oW: vec2f, oX: vec2f) -> vec3f {
let matData = materialsBuffer[materialIndex];
let normalMapIndex = i32(matData.normalMapIndex);
if (normalMapIndex >= 0) {



let sb = cross(dp2, normal);
let sa = cross(normal, dp1);
var dpdu = sb * oW.x + sa * oX.x;
var tH = sb * oW.y + sa * oX.y;
let ej = max(dot(dpdu, dpdu), dot(tH, tH));
if (ej > 1e-12) {
let tO = inverseSqrt(ej);
dpdu *= tO;
tH *= tO;
}
else {


let oo = select(
vec3f(0.0, 1.0, 0.0),
vec3f(0.0, 0.0, 1.0),
abs(normal.z) < 0.999
);
dpdu = normalize(cross(oo, normal));
tH = cross(normal, dpdu);
}

var n = 2.0 * sampleMap(normalMapIndex, uv).rgb - 1.0;
n = normalize(vec3(n.xy * matData.normalMapScale, n.z));

let tbn = mat3x3(dpdu, tH, normal);

return normalize(tbn * n);
} else {
return normal;
}
}
`}bc();const Zh=`


struct kc {
barycentric: vec3f,
t: f32,
normal: vec3f,

}

fn wO(
uu: f32,
vA: vec3f, vB: vec3f,
eAC: vec3f, eBD: vec3f,
je: vec3f,
qT: f32,
qV: ptr<function, f32>
) -> bool {
if (uu >= 0.0 && uu <= 1.0) {
let pAB = mix(vA, vB, uu);
let pCD = mix(eAC, eBD, uu);
var n = cross(je, pCD);
let xf = 1.0 / dot(n, n);
n = cross(n, pAB);
let tt = dot(n, pCD) * xf;
let vv = dot(n, je) * xf;
if (vv >= 0.0 && vv <= 1.0 && tt > qT && tt < *qV) {
*qV = tt;
return true;
}
}
return false;
}

fn hx(
qF: vec3f, je: vec3f, qT: f32, uM: f32,
pA: vec3f, pB: vec3f, pC: vec3f, pD: vec3f,
qV: ptr<function, f32>
) -> bool {
let eAB = pB - pA;
let eAC = pC - pA;
let eBD = pD - pB;
let eCD = pD - pC;
let vA = pA - qF;
let vB = pB - qF;

var u1: f32;
var u2: f32;
{
let qN = cross(eAB, -eCD);
let a = dot(qN, je);
var b = dot(cross(vB, je), eBD);
let c = dot(cross(vA, je), eAC);
b -= a + c;

let det = b * b - 4.0 * a * c;
if (det < 0.0) {
return false;
}

if (a == 0.0) {
u1 = -c / b;
u2 = -1.0;
} else {
let xF = sqrt(det);
let yo = -0.5 * (b + sign(b) * xF);
u1 = yo / a;
u2 = c / yo;
}
}

*qV = uM;

var hit = false;

hit = wO(u1, vA, vB, eAC, eBD, je, qT, qV) || 
wO(u2, vA, vB, eAC, eBD, je, qT, qV);
if (!hit) {
return false;
}

return true;
}

fn tM(
qF: vec3f, je: vec3f, qT: f32, uM: f32,
pA: vec3f, pB: vec3f, pC: vec3f,
pD: vec3f, pE: vec3f, pF: vec3f,

bX: ptr<function, f32>,
bW: ptr<function, f32>
) -> bool {
*bX = INF;
*bW = -INF;

let xV = maxDimension(abs(je));
let gY = nk(je, xV);
var tt: f32;

tt = ga(
qF, je,
fP(pC, pB, pA), xV, gY, INF
).t;
if (tt > 0.0) {
*bX = min(*bX, tt);
*bW = max(*bW, tt);
}
tt = ga(
qF, je,
fP(pD, pE, pF), xV, gY, INF
).t;
if (tt > 0.0) {
*bX = min(*bX, tt);
*bW = max(*bW, tt);
}
if (hx(
qF, je, -INF, INF,
pA, pB, pD, pE,
&tt)) {
*bX = min(*bX, tt);
*bW = max(*bW, tt);
}
if (hx(
qF, je, -INF, INF,
pB, pC, pE, pF,
&tt)) {
*bX = min(*bX, tt);
*bW = max(*bW, tt);
}
if (hx(
qF, je, -INF, INF,
pC, pA, pF, pD,
&tt)) {
*bX = min(*bX, tt);
*bW = max(*bW, tt);
}

*bX = max(*bX, qT);
*bW = min(*bW, uM);

return *bX <= *bW && *bW > 0.0;
}
`,ep=`

${Zh}

fn mz(p: vec3f, p0: vec3f, p1: vec3f, p2: vec3f) -> vec3f {
let v0 = p1 - p0;
let v1 = p2 - p0;
let v2 = p - p0;

let d00 = dot(v0, v0);
let d01 = dot(v0, v1);
let d11 = dot(v1, v1);
let d20 = dot(v2, v0);
let d21 = dot(v2, v1);

let vs = 1.0 / (d00 * d11 - d01 * d01);
let v = clamp((d11 * d20 - d01 * d21) * vs, 0.0, 1.0);
let w = clamp((d00 * d21 - d01 * d20) * vs, 0.0, 1.0);
let u = 1.0 - v - w;

return vec3f(u, v, w);
}



fn pY(
rs: vec3f, rS: vec3f, yt: f32,
_pA: vec3f, _pB: vec3f, _pC: vec3f,
_nA: vec3f, _nB: vec3f, _nC: vec3f,
xm: vec2f, xn: vec2f, xo: vec2f,

ku: i32,
xl: vec2f,

yd: f32, yc: f32,
hScale: f32,
wk: f32,
vH: f32,
uvProjection: i32,
uvScale: vec2f,
xM: bool,
sk: bool
) -> kc {



let DT = select(max(abs(hScale) / 32.0, 1e-12), vH, vH > 0.0);
let dt = DT / length(rS);
let dbx = 0.001;
let dby = 0.001;

var result: kc;
result.t = INF;

var bX = INF;
var bW = -INF;

let sg = sign(hScale);
let wC = abs(hScale);

let uC = sg * normalize(cross(_pB - _pA, _pC - _pA));


let dA = dot(_nA, uC);
let dB = dot(_nB, uC);
let dC = dot(_nC, uC);

var minH = yd * hScale * min(min(dA, dB), dC);
var maxH = yc * hScale * max(max(dA, dB), dC);




let vC = abs(maxH) - abs(minH);


minH = sign(minH) * max(abs(minH) - DT * 2.0, 0.0);
if (vC < DT * 2.0) {
maxH = sign(maxH) * min(abs(maxH) + DT * 2.0, abs(hScale));
}

let pA = _pA + _nA * minH / dA;
let pB = _pB + _nB * minH / dB;
let pC = _pC + _nC * minH / dC;

let pD = _pA + _nA * maxH / dA;
let pE = _pB + _nB * maxH / dB;
let pF = _pC + _nC * maxH / dC;

if (!tM(
rs, rS, 0.0, INF,
pA, pB, pC,
pD, pE, pF,

&bX, &bW
)) {
return result;
}

var yp = false;

if (bW == bX) {
bX = 0.0;
}

var t = bX + dt * eC(2u);
var s = rs + rS * t;
var vq = dot(s - _pA, uC);
var wV = select(0.0, INF, sg < 0.0);

var c0 = _pA + _nA * vq / dA;
var c1 = _pB + _nB * vq / dB;
var c2 = _pC + _nC * vq / dC;

var uV: vec3f;

vq = abs(vq);

var sf = vq - wV;
var qU = sf;
var step = 0;

while (true) {

let b = mz(s, c0, c1, c2);

uV = _pA * b.x + _pB * b.y + _pC * b.z;

vq = distance(uV, s);

var uv: vec2f;
if (uvProjection > 0) {
let n = normalize(_nA * b.x + _nB * b.y + _nC * b.z);
uv = gU(uvProjection, uV - (_nA * b.x + _nB * b.y + _nC * b.z) * wk, n) * uvScale;
}
else {
uv = xm * b.x + xn * b.y + xo * b.z;
}
let h = sampleMap(ku, uv).x;

wV = max(wC * h, DT);


let dh = dot(uC, s - c0);
c0 = c0 + _nA * dh / dA;
c1 = c1 + _nB * dh / dB;
c2 = c2 + _nC * dh / dC;

qU = sf;
sf = vq - wV;

if (!(select(sf * sg, sf * qU, sk) > 0.0
&& t < bW + dt) 

&& step > 0) {
break;
}

step++;
t = t + dt;
s = s + rS * dt;
}

if (select(sf * sg, sf * qU, sk) <= 0.0) {
let dtt = dt * (abs(sf) / (abs(qU) + abs(sf) + EPS));
t = t - dtt;

let yr = rs + rS * t;
let b = mz(yr, c0, c1, c2);

let N = normalize(_nA * b.x + _nB * b.y + _nC * b.z);

let p_a = _pA * b.x + _pB * b.y + _pC * b.z;
let p_b = _pA * (b.x + dbx) + _pB * b.y + _pC * (b.z - dbx);
let p_c = _pA * b.x + _pB * (b.y + dby) + _pC * (b.z - dby);

var xX: vec2f;
var xY: vec2f;
var xZ: vec2f;

if (uvProjection > 0) {
let NA = normalize(_nA * b.x + _nB * b.y + _nC * b.z);
let NB = normalize(_nA * (b.x + dbx) + _nB * b.y + _nC * (b.z - dbx));
let NC = normalize(_nA * b.x + _nB * (b.y + dby) + _nC * (b.z - dby));  
xX = gU(uvProjection, p_a - (_nA * b.x + _nB * b.y + _nC * b.z) * wk, NA) * uvScale;
xY = gU(uvProjection, p_b - (_nA * (b.x + dbx) + _nB * b.y + _nC * (b.z - dbx)) * wk, NB) * uvScale;
xZ = gU(uvProjection, p_c - (_nA * b.x + _nB * (b.y + dby) + _nC * (b.z - dby)) * wk, NC) * uvScale;
}
else {
xX = xm * b.x + xn * b.y + xo * b.z;
xY = xm * (b.x + dbx) + xn * b.y + xo * (b.z - dbx);
xZ = xm * b.x + xn * (b.y + dby) + xo * (b.z - dby);
}

let s_a = p_a + sg * N * sampleMap(ku, xX).x * hScale;
let s_b = p_b + sg * N * sampleMap(ku, xY).x * hScale;
let s_c = p_c + sg * N * sampleMap(ku, xZ).x * hScale;

let N_s = -sg * normalize(cross(s_c - s_a, s_b - s_a));

result.t = t;
result.barycentric = b;
result.normal = normalize(N_s - uC + sg * N);
}

return result;

}
`;function tp(i=!0){return`
fn oC(
qq: i32,
index: vec3i,
aC: vec3f,
fi: vec3f,
eL: vec3f
) -> bool {
var materialIndex = qq;
let m0 = vec3i(attrBuffers[index.x * ATTR_STRIDE + MATERIALINDEX_OFF]${i?".xyz":""});
let m1 = vec3i(attrBuffers[index.y * ATTR_STRIDE + MATERIALINDEX_OFF]${i?".xyz":""});
let m2 = vec3i(attrBuffers[index.z * ATTR_STRIDE + MATERIALINDEX_OFF]${i?".xyz":""});

if (m0.x > 0 || m1.x > 0 || m2.x > 0) {
materialIndex = fF(m0, m1, m2, aC);
}

let ma = materialsBuffer[materialIndex];
var alpha = ma.alpha;
if (USE_DIFFUSE_MAPS &&
ma.mapAlphaUsage == ${Pi.alpha}) {
let diffuseMapIndex = i32(ma.diffuseMapIndex);
if (diffuseMapIndex >= 0) {
let uvProjection = i32(ma.uvProjection);
let uv0 = attrBuffers[index.x * ATTR_STRIDE + UV_OFF].xy;
let uv1 = attrBuffers[index.y * ATTR_STRIDE + UV_OFF].xy;
let uv2 = attrBuffers[index.z * ATTR_STRIDE + UV_OFF].xy;
var uv = aC.x * uv0 +
aC.y * uv1 + aC.z * uv2;
if (uvProjection > 0) {
uv = gU(uvProjection, fi, eL);
}
uv *= ma.uvScale;
if (uvProjection == ${xt.triplanar}) {
uv = fract(uv);
}
alpha *= sampleMap(diffuseMapIndex, uv).a;
}
}

if (USE_ALPHA_MAPS) {
let alphaMapIndex = i32(ma.alphaMapIndex);
if (alphaMapIndex >= 0) {
let uvProjection = i32(ma.uvProjection);
let uv0 = attrBuffers[index.x * ATTR_STRIDE + UV_OFF].xy;
let uv1 = attrBuffers[index.y * ATTR_STRIDE + UV_OFF].xy;
let uv2 = attrBuffers[index.z * ATTR_STRIDE + UV_OFF].xy;
var uv = aC.x * uv0 +
aC.y * uv1 + aC.z * uv2;
if (uvProjection > 0) {
uv = gU(uvProjection, fi, eL);
}
uv *= ma.uvScale;
if (uvProjection == ${xt.triplanar}) {
uv = fract(uv);
}
alpha *= sampleMap(alphaMapIndex, uv).g;
}
}

let alphaMode = i32(ma.alphaMode);
if (alphaMode == ${si.opaque}) {
alpha = 1.0;
}
else if (alphaMode == ${si.mask}) {
alpha = select(0.0, 1.0, alpha >= ma.alphaCutoff);
}
if (alphaMode == ${si.blend}) {
return eC(1u) <= alpha;
}
return alpha >= 1.0;
}
`}const ip=ep,_c=function(){return`
let hit = ga(o, d, tri, eq, gY, tMax);
if (hit.t > 0.0) {
let e1 = tri.p1 - tri.p0;
let e2 = tri.p2 - tri.p0;
eL = normalize(cross(e1, e2));
let kP = i32(ah(bitcast<i32>(pi.z)).x);
let jd = materialsBuffer[kP].doubleSided > 0.5;
if (!doubleSided && !jd && dot(eL, d) > 0.0) {
eL = vec3f(0.0);
continue;
}

tMax = hit.t;
sj = true;
pl = true;
fi = o + tMax * d;
aC = hit.barycentric;
}
`};function Ap(i){return`
let lH = pY(
o, d, tMax,
tri.p0, tri.p1, tri.p2,
n0, n1, n2,
uv0, uv1, uv2,
displacementMapIndex,
jO(displacementMapIndex),
minH, maxH,
hScale,
matData.displacementBias,
matData.displacementStepSize,
i32(matData.displacementUvProjection),
displacementUvProjectionScale,
${i?"true":"false"},
jA
);
`}const ap=function(i,e){return`

let hScale = pi.w;
let uQ = bitcast<i32>(r3.w);

let materialIndex = i32(ah(bitcast<i32>(pi.z)).x);
let matData = materialsBuffer[materialIndex];
let n0 = normalize(attrBuffers[index.x * ATTR_STRIDE + NORMAL_OFF]${e?".xyz":""});
let n1 = normalize(attrBuffers[index.y * ATTR_STRIDE + NORMAL_OFF]${e?".xyz":""});
let n2 = normalize(attrBuffers[index.z * ATTR_STRIDE + NORMAL_OFF]${e?".xyz":""});
if (matData.displacementMapIndex >= 0.0 && matData.displacementBias != 0.0) {
tri.p0 += n0 * matData.displacementBias;
tri.p1 += n1 * matData.displacementBias;
tri.p2 += n2 * matData.displacementBias;
}
if (abs(hScale) > 0.0 && uQ > 0) {
let minH = f32(uQ >> 8) / 255.0;
let maxH = f32(uQ & 0xff) / 255.0;
let displacementUvProjectionScale = vec2f(matData.displacementUvProjectionScale);
let displacementMapIndex = i32(matData.displacementMapIndex);


var uv0 = attrBuffers[index.x * ATTR_STRIDE + UV_OFF].xy;
var uv1 = attrBuffers[index.y * ATTR_STRIDE + UV_OFF].xy;
var uv2 = attrBuffers[index.z * ATTR_STRIDE + UV_OFF].xy;

${Ap(i)}

if (lH.t < tMax) {
eL = lH.normal;


tMax = lH.t;

aC = lH.barycentric;
fi = o + tMax * d;

bZ = true;
sj = true;
pl = true;
}
}
else {
${_c()}
}
`},rp=`
fn bA(value: u32) -> vec4f {
return vec4f(
f32(value & 0xffu),
f32((value >> 8u) & 0xffu),
f32((value >> 16u) & 0xffu),
f32(value >> 24u)
);
}







fn lb(value: u32) -> u32 {
return (bitcast<u32>(f32(value)) >> 23u) - 127u;
}

fn oT(value: u32) -> u32 {
return (bitcast<u32>(f32(value)) >> 23u) - 127u;
}

fn pj(
node: i32,
uJ: i32,
n0: vec4f,
o: vec3f,
gr: vec3f,
tMax: f32
) -> u32 {
let i = node + uJ;
let n2 = bvhBuffer[i + 2];
let n3 = bvhBuffer[i + 3];
let n4 = bvhBuffer[i + 4];
let header = bitcast<u32>(n0.w);
let sH = bitcast<i32>((header & 0xffu) << 24u) >> 24;
let sI = bitcast<i32>(((header >> 8u) & 0xffu) << 24u) >> 24;
let sJ = bitcast<i32>(((header >> 16u) & 0xffu) << 24u) >> 24;
let hZ = vec3f(
bitcast<f32>(u32(sH + 127) << 23u),
bitcast<f32>(u32(sI + 127) << 23u),
bitcast<f32>(u32(sJ + 127) << 23u)
);
let padding = fk(gr, o);
let eS = (n0.xyz - o) * gr;
let dq = hZ * gr;



let vc = bitcast<vec4u>(n2);
let vd = bitcast<vec4u>(n3);
let ve = bitcast<vec4u>(n4);
let negative = gr < vec3f(0.0);
let wn = select(vc.xy, vd.zw, negative.x);
let xt = select(vd.zw, vc.xy, negative.x);
let wo = select(vc.zw, ve.xy, negative.y);
let xu = select(ve.xy, vc.zw, negative.y);
let wp = select(vd.xy, ve.zw, negative.z);
let xv = select(ve.zw, vd.xy, negative.z);

let yl = max(
max(
bA(wn.x) * dq.x + eS.x - vec4f(padding.x),
bA(wo.x) * dq.y + eS.y - vec4f(padding.y)
),
bA(wp.x) * dq.z + eS.z - vec4f(padding.z)
);
let yg = min(
min(
bA(xt.x) * dq.x + eS.x + vec4f(padding.x),
bA(xu.x) * dq.y + eS.y + vec4f(padding.y)
),
bA(xv.x) * dq.z + eS.z + vec4f(padding.z)
);
let ym = max(
max(
bA(wn.y) * dq.x + eS.x - vec4f(padding.x),
bA(wo.y) * dq.y + eS.y - vec4f(padding.y)
),
bA(wp.y) * dq.z + eS.z - vec4f(padding.z)
);
let yh = min(
min(
bA(xt.y) * dq.x + eS.x + vec4f(padding.x),
bA(xu.y) * dq.y + eS.y + vec4f(padding.y)
),
bA(xv.y) * dq.z + eS.z + vec4f(padding.z)
);

let wl = (yl <= min(yg, vec4f(tMax))) & (yg > vec4f(0.0));
let wm = (ym <= min(yh, vec4f(tMax))) & (yh > vec4f(0.0));
return select(0u, 1u, wl.x)
| select(0u, 2u, wl.y)
| select(0u, 4u, wl.z)
| select(0u, 8u, wl.w)
| select(0u, 16u, wm.x)
| select(0u, 32u, wm.y)
| select(0u, 64u, wm.z)
| select(0u, 128u, wm.w);
}

`;function Br(i,e,t,A,a,r=""){const n=`
let pi = instancesBuffer[bY * ${te}];
let vertexOffset = vec3i(bitcast<i32>(pi.y));
for (var k = 0; k < primitiveCount; k++) {
let triangleIndex = primitiveOffset + k;
${r}
if (bounces > 0 && triangleIndex == fV) {
continue;
}

let r3 = bvhBuffer[triangleIndex];
let index = bitcast<vec3i>(r3.xyz) + vertexOffset;
var tri = fP(
attrBuffers[index.x * ATTR_STRIDE + POSITION_OFF]${a?".xyz":""},
attrBuffers[index.y * ATTR_STRIDE + POSITION_OFF]${a?".xyz":""},
attrBuffers[index.z * ATTR_STRIDE + POSITION_OFF]${a?".xyz":""}
);
var pl = false;

${e?ap(t,a):_c()}
if (pl) {
${i}
}
}
`;return`
var d = ray.d;
var o = ray.o;
var jE = -1;
var gr = fo(d);
var bZ = false;
var sj = false;
var fi: vec3f;
var eL: vec3f;
var aC: vec3f;


if (cU(o, bvhBuffer[0].xyz, bvhBuffer[1].xyz, gr, tMax) > 0.0) {
jE = 0;
mK[0] = 0;
}
while (jE >= 0) {
let ul = mK[jE];
jE--;
o = ray.o;
d = ray.d;
gr = fo(d);

let xW = bvhBuffer[ul];
let ff = bitcast<i32>(xW.w);
if (ff >= 0) {
let left = ul + 2;
let right = ff;
let d0 = cU(
o,
bvhBuffer[left].xyz,
bvhBuffer[left + 1].xyz,
gr,
tMax
);
let d1 = cU(
o,
bvhBuffer[right].xyz,
bvhBuffer[right + 1].xyz,
gr,
tMax
);

if (d0 > d1) {
if (d0 > 0.0) { jE++; mK[jE] = left; }
if (d1 > 0.0) { jE++; mK[jE] = right; }
}
else {
if (d1 > 0.0) { jE++; mK[jE] = right; }
if (d0 > 0.0) { jE++; mK[jE] = left; }
}
}
else {
let rQ = -ff;


for (
var nq = rQ - 1;
nq >= 0;
nq--
) {
let qv = bvhBuffer[ul + 2 + nq];
let bY = bitcast<i32>(qv.x);
let wL = bitcast<i32>(qv.y);
let pi = instancesBuffer[bY * ${te}];
let w2l = mat4x4<f32>(
instancesBuffer[bY * ${te} + 1],
instancesBuffer[bY * ${te} + 2],
instancesBuffer[bY * ${te} + 3],
instancesBuffer[bY * ${te} + 4]
);
o = (w2l * vec4f(ray.o, 1.0)).xyz;
d = (w2l * vec4f(ray.d, 0.0)).xyz;
gr = fo(d);
eq = maxDimension(abs(d));
gY = nk(d, eq);

let fY = bitcast<u32>(pi.x);
let he = fY >> 30u;
let blasOffset = i32(fY & 0x3fffffffu);
let bw = rtUniform.blasOffset;

${(A&8)!==0?`
if (he == 3u) {




var qj = -1;
var td = 0u;
var lJ = 0u;

var eD = 0x80000000u;
let vU = select(0u, 4u, d.x < 0.0)
| select(0u, 2u, d.y < 0.0)
| select(0u, 1u, d.z < 0.0);
let rn = 7u - vU;




while (td < 4096u) {
td++;

let internalMask = eD & 0xffu;
let ri =
lb(eD >> 24u) + 24u;
eD &= ~(1u << ri);
if ((eD & 0xff000000u) != 0u) {
qj++;

tD[qj] = vec2u(lJ, eD);
}

let slot = (ri - 24u) ^ rn;
let om = (1u << slot) - 1u;
let relativeIndex = countOneBits(internalMask & om);
let tA = lJ + relativeIndex;
let node = blasOffset + i32(tA * 5u);
let jZ = bvhBuffer[node + bw];
let vG = pj(
node, bw, jZ, o, gr, tMax
);


eD = 0u;
if (vG != 0u) {
let fU = bvhBuffer[node + bw + 1];
let sP = bitcast<u32>(jZ.w) >> 24u;
var uO = 0u;
var kM = vG;
while (kM != 0u) {
let sC = lb(kM);
kM &= ~(1u << sC);
let tT = select(
bitcast<u32>(fU.z),
bitcast<u32>(fU.w),
sC >= 4u
);
let uB =
(tT >> ((sC & 3u) * 8u)) & 0xffu;
let kb = uB & 0x1fu;
let wK = select(
kb,
kb ^ rn,
kb >= 24u
);
let wt = (uB >> 5u) & 0x7u;
uO |= wt << wK;
}

lJ = bitcast<u32>(fU.x);
eD = (uO & 0xff000000u) | sP;
let pM = bitcast<u32>(fU.y);
var pN = uO & 0x00ffffffu;
while (pN != 0u) {
let oO = oT(pN);
pN &= ~(1u << oO);
let primitiveCount = 1;
let primitiveOffset = bw + blasOffset
+ i32(pM + oO);
${n}
}
}

if ((eD & 0xff000000u) != 0u) { continue; }
if (qj >= 0) {
let ro = tD[qj];
lJ = ro.x;
eD = ro.y;
qj--;
}
else { break; }
}
}
`:""}

var eh = -1;
if (he != 3u) {
eh = 0;

gJ[0] = wL;
}

while (eh >= 0) {

let node = gJ[eh];
eh--;
var primitiveCount = 0;
var primitiveOffset = 0;

${(A&4)!==0?`
if (he == 2u) {
let i = node + bw;
let wP = bvhBuffer[i];
let wQ = bvhBuffer[i + 1];
let wR = bvhBuffer[i + 2];
let wS = bvhBuffer[i + 3];
primitiveCount = i32(bitcast<u32>(wR.w));
if (primitiveCount > 0) {
primitiveOffset = bw + blasOffset
+ i32(bitcast<u32>(wS.w));
}
else {
let left = blasOffset + i32(bitcast<u32>(wP.w) * 4u);
let right = blasOffset + i32(bitcast<u32>(wQ.w) * 4u);
let pm = cU(
o, wP.xyz, wQ.xyz, gr, tMax
);
let oq = cU(
o, wR.xyz, wS.xyz, gr, tMax
);
if (pm > oq) {
if (pm > 0.0) {
eh++; gJ[eh] = left;
}
if (oq > 0.0) {
eh++; gJ[eh] = right;
}
}
else {
if (oq > 0.0) {
eh++; gJ[eh] = right;
}
if (pm > 0.0) {
eh++; gJ[eh] = left;
}
}
}
}
`:""}
${(A&2)!==0?`
if (he == 1u) {
let iw = bitcast<u32>(node);
if ((iw & 0x80000000u) != 0u) {
primitiveCount = i32((iw >> 23u) & 0xffu);
primitiveOffset = bw + blasOffset
+ i32(iw & 0x007fffffu);
}
else {
let i = node + bw;
let vJ = bvhBuffer[i];
let sz = bvhBuffer[i + 1];
let qR = bvhBuffer[i + 2];
let oQ = bvhBuffer[i + 3];
let nodeMin = vJ.xyz;
let er = vec3f(vJ.w, sz.x, sz.y);
let mT = array<u32, 4>(
bitcast<u32>(sz.z), bitcast<u32>(sz.w),
bitcast<u32>(qR.x), bitcast<u32>(qR.y)
);


let negative = gr < vec3f(0.0);
let wn = unpack4x8unorm(bitcast<u32>(select(qR.z, oQ.y, negative.x)));
let xt = unpack4x8unorm(bitcast<u32>(select(oQ.y, qR.z, negative.x)));
let wo = unpack4x8unorm(bitcast<u32>(select(qR.w, oQ.z, negative.y)));
let xu = unpack4x8unorm(bitcast<u32>(select(oQ.z, qR.w, negative.y)));
let wp = unpack4x8unorm(bitcast<u32>(select(oQ.x, oQ.w, negative.z)));
let xv = unpack4x8unorm(bitcast<u32>(select(oQ.w, oQ.x, negative.z)));
let padding = fk(gr, o);
let nJ = max(
max(
(nodeMin.x + wn * er.x - o.x) * gr.x - vec4f(padding.x),
(nodeMin.y + wo * er.y - o.y) * gr.y - vec4f(padding.y)
),
(nodeMin.z + wp * er.z - o.z) * gr.z - vec4f(padding.z)
);
let sY = min(
min(
(nodeMin.x + xt * er.x - o.x) * gr.x + vec4f(padding.x),
(nodeMin.y + xu * er.y - o.y) * gr.y + vec4f(padding.y)
),
(nodeMin.z + xv * er.z - o.z) * gr.z + vec4f(padding.z)
);
var distance = select(sY, nJ, nJ > vec4f(0.0));
distance = select(
distance,
vec4f(-1.0),
nJ > min(sY, vec4f(tMax))
);
var fq = array<f32, 4>(
distance.x,
distance.y,
distance.z,
distance.w
);


for (var order = 0; order < 4; order++) {
var em = -1.0;
var eB = -1;
for (var child = 0; child < 4; child++) {
if (
mT[child] != 0u &&
fq[child] > em
) {
em = fq[child];
eB = child;
}
}
if (eB >= 0 && em > 0.0) {
let oy = mT[eB];
var ki = bitcast<i32>(oy);
if ((oy & 0x80000000u) == 0u) {
ki += blasOffset;
}
eh++;
gJ[eh] = ki;
fq[eB] = -1.0;
}
}
}
}
`:""}
${(A&1)!==0?`
if (he == 0u) {
let i = node + bw;
let r1 = bvhBuffer[i];
let bl = bitcast<i32>(r1.w);

if (bl >= 0) {
let left = node + 2;
let right = bl + blasOffset;
let d0 = cU(
o,
bvhBuffer[left + bw].xyz,
bvhBuffer[left + 1 + bw].xyz,
gr,
tMax
);
let d1 = cU(
o,
bvhBuffer[right + bw].xyz,
bvhBuffer[right + 1 + bw].xyz,
gr,
tMax
);

if (d0 > d1) {
if (d0 > 0.0) {
eh++; gJ[eh] = left;

}
if (d1 > 0.0) {
eh++; gJ[eh] = right;

}
}
else {
if (d1 > 0.0) {
eh++; gJ[eh] = right;

}
if (d0 > 0.0) {
eh++; gJ[eh] = left;

}
}
}
else {
primitiveCount = -bl;
primitiveOffset = i + 2;
}
}
`:""}
if (primitiveCount > 0) {
${n}
}
}
}
}
}

`}function np({hasDisplacement:i,hasAnisotropyDirections:e=!0,hasCoatNormals:t=!1,blasLayoutMask:A=1,closestName:a="intersectScene",shadowName:r="intersectSceneShadow",bevelName:n="intersectSceneBevel",closestHitHook:s=""}){return`
fn ${a}(ray: Ray, si: ptr<function, SurfaceInteraction>, bounces: i32, doubleSided: bool, jA: bool) {

(*si).hit = false;

if (rtUniform.isEmpty > 0) {
return;
}

var tMax = RAY_MAX_DISTANCE;
var eq: i32;
var gY: vec3f;

var hK: vec3i;
var mk: fP;
var ap: i32;
var fV: i32 = (*si).triangleIndex;

${Br(`
(*si).triangleIndex = triangleIndex;
mk = tri;
hK = index;
ap = bY;
`,i,!1,A,e)}

${s}  if (sj) {
mV(
si,
mk,
aC,
hK,
bZ,
ap,
eL,
fi,
-1
);
}
}


fn ${n}(ray: Ray, si: ptr<function, SurfaceInteraction>, instanceIndex: i32, maxDistance: f32) {
(*si).hit = false;

if (rtUniform.isEmpty > 0) {
return;
}

let bounces = 0;
let doubleSided = true;
let jA = false;
var tMax = maxDistance;
var eq: i32;
var gY: vec3f;
var hK: vec3i;
var mk: fP;
var ap: i32;
var fV: i32 = -1;

${Br(`
(*si).triangleIndex = triangleIndex;
mk = tri;
hK = index;
ap = bY;
`,i,!1,A,e,`
if (bY != instanceIndex) {
continue;
}
`)}

if (sj) {
(*si).instanceIndex = ap;
(*si).normal = eL;
(*si).position = fi;
(*si).materialIndex = i32(ah(bitcast<i32>(instancesBuffer[ap * ${te}].z)).x);
hH(
si,
mk,
aC,
hK,
bZ,
-1
);

let l2w = mat4x4<f32>(
instancesBuffer[ap * ${te} + 5],
instancesBuffer[ap * ${te} + 6],
instancesBuffer[ap * ${te} + 7],
instancesBuffer[ap * ${te} + 8]
);
let w2l = mat4x4<f32>(
instancesBuffer[ap * ${te} + 1],
instancesBuffer[ap * ${te} + 2],
instancesBuffer[ap * ${te} + 3],
instancesBuffer[ap * ${te} + 4]
);
let aH = transpose(mat3x3<f32>(
w2l[0].xyz,
w2l[1].xyz,
w2l[2].xyz
));
(*si).faceNormal = normalize(aH * eL);
(*si).vertexNormal = normalize(aH * (*si).vertexNormal);
(*si).normal = normalize(aH * (*si).normal);
${t?"  (*si).coatNormal = normalize(aH * (*si).coatNormal);":""}
if (USE_TANGENT && dot((*si).tangent, (*si).tangent) > 0.0) {
(*si).tangent = normalize((l2w * vec4f((*si).tangent, 0.0)).xyz);
}
${e?`
(*si).directionTangent = (l2w * vec4f((*si).directionTangent, 0.0)).xyz;
(*si).directionBitangent = (l2w * vec4f((*si).directionBitangent, 0.0)).xyz;
(*si).geometryTangent = (l2w * vec4f((*si).geometryTangent, 0.0)).xyz;
(*si).geometryBitangent = (l2w * vec4f((*si).geometryBitangent, 0.0)).xyz;
`:""}
(*si).shadowOffset = (l2w * vec4f((*si).shadowOffset, 0.0)).xyz;
(*si).position = (l2w * vec4((*si).position, 1.0)).xyz;
}
}

fn ${r}(ray: Ray, lightDistance: f32, kn: i32) -> bool {
if (rtUniform.isEmpty > 0) {
return false;
}

let doubleSided = true;
let rq = min(max(lightDistance, 0.0), RAY_MAX_DISTANCE);
var tMax = rq;
var eq: i32;
var gY: vec3f;

let bounces = 1;
var jA = false;
var fV: i32 = kn;

${Br(`



var jS = true;

if (jS) {
if (HAS_ALPHA) {
let materialIndex = i32(ah(bitcast<i32>(pi.z)).x);
if (!oC(
materialIndex,
index,
aC,
fi,
eL
)) {

tMax = rq;
jS = false;
}
}
}
if (jS) {
return true;
}
`,i,!0,A,e)}

return false;
}

`}function sp({hasDisplacement:i,hasAnisotropyDirections:e=!0,hasCoatNormals:t=!1,blasLayoutMask:A=1,sceneIntersections:a=""}){return`





var<private> mK: array<i32, TLAS_STACK_SIZE>;
var<private> gJ: array<i32, BLAS_STACK_SIZE>;
${(A&8)!==0?"var<private> tD: array<vec2u, BLAS_STACK_SIZE>;":""}

${i?ip:""}
${(A&8)!==0?rp:""}

struct fP {
p0: vec3f,
p1: vec3f,
p2: vec3f,
};

fn hL(rad: f32, pos: vec3f, r: Ray) -> f32 {
let op: vec3f = pos - r.o;
let eps: f32 = 0.001;
let b: f32 = dot(op, r.d);
var det: f32 = b * b - dot(op, op) + rad * rad;
if (det < 0.0) {
return INF;
}

det = sqrt(det);
let t1: f32 = b - det;
if (t1 > eps) {
return t1;
}

let t2: f32 = b + det;
if (t2 > eps) {
return t2;
}

return INF;
}

fn og(pos: vec3f, u: vec3f, v: vec3f, n: vec3f, r: Ray) -> f32 {
let dt: f32 = dot(r.d, n);
let t: f32 = (dot(n, pos) - dot(n, r.o)) / dt;

if (t > EPS) {
let p: vec3f = r.o + r.d * t;
let vi: vec3f = p - pos;
let a1: f32 = dot(u / dot(u, u), vi);
if (a1 >= 0.0 && a1 <= 1.0) {
let a2: f32 = dot(v / dot(v, v), vi);
if (a2 >= 0.0 && a2 <= 1.0) {
return t;
}
}
}

return INF;
}

fn sphereSolidAnglePdf(origin: vec3f, center: vec3f, radius: f32) -> f32 {
let ak = distance(origin, center);
if (ak <= radius) { return INV4PI; }
let jV = min(1.0, radius * radius / (ak * ak));
let cosThetaMax = sqrt(max(0.0, 1.0 - jV));
return 1.0 / max(TWOPI * (1.0 - cosThetaMax), 1e-8);
}

fn nr(r: Ray, light: Light, lightSample: ptr<function, LightSampleRec>) -> f32 {


var d: f32 = INF;
(*lightSample).direction = r.d;
(*lightSample).normal = -r.d;
(*lightSample).dist = INF;
(*lightSample).pdf = 0.0;
(*lightSample).emission = vec3f(0.0);
(*lightSample).isDelta = false;
var u = light.u;
var v = light.v;
var ec = i32(light.litType);

if (HAS_SCENE_RECT_LIGHT && ec == RECT_LIGHT) {

var pos = light.position - u * 0.5 - v * 0.5;
var normal = normalize(cross(u, v));
if (dot(normal, r.d) > 0.0) { 
return INF;
}

d = og(pos, u, v, normal, r);
if (d < 0.0) {
d = INF;
}
else {
var ci: f32 = dot(-r.d, normal);
let spread = light.radiusOrSpread;
if (ci >= cos(spread * PI / 2.0)) {
(*lightSample).direction = r.d;
(*lightSample).normal = normal;
(*lightSample).dist = d;
(*lightSample).pdf = (d * d) / (light.area * ci);
(*lightSample).emission = light.emission;
(*lightSample).isDelta = false;
}
else {
d = INF;
}
}
}

else if (HAS_SCENE_SPHERE_LIGHT && ec == SPHERE_LIGHT) {
if (light.radiusOrSpread <= 0.0) {
let kT = light.position - r.o;
let projection = dot(kT, r.d);
let bk = kT - projection * r.d;
if (projection <= EPS || dot(bk, bk) > 1e-8) {
return INF;
}
d = projection;
(*lightSample).direction = r.d;
(*lightSample).normal = -r.d;
(*lightSample).dist = d;
(*lightSample).pdf = 1.0;
(*lightSample).isDelta = true;
}
else {
d = hL(light.radiusOrSpread, light.position, r);
(*lightSample).isDelta = false;
if (d > 0.0 && d != INF) {
(*lightSample).direction = r.d;
(*lightSample).dist = d;
(*lightSample).normal = normalize(
r.o + r.d * d - light.position
);
(*lightSample).pdf = sphereSolidAnglePdf(
r.o,
light.position,
light.radiusOrSpread
);
}
}
if (d < 0.0) {
d = INF;
}
else {
(*lightSample).direction = r.d;
(*lightSample).dist = d;
(*lightSample).emission = select(
light.emission,
light.emission / max(d * d, 1e-8),
light.radiusOrSpread <= 0.0
);
}
}

else if (HAS_SCENE_SPOT_LIGHT && ec == SPOT_LIGHT) {
if (light.radiusOrSpread <= 0.0) {
let kT = light.position - r.o;
let projection = dot(kT, r.d);
let bk = kT - projection * r.d;
if (projection <= EPS || dot(bk, bk) > 1e-8) {
return INF;
}
d = projection;
(*lightSample).direction = r.d;
(*lightSample).normal = -r.d;
(*lightSample).dist = d;
(*lightSample).pdf = 1.0;
(*lightSample).isDelta = true;
}
else {
d = hL(light.radiusOrSpread, light.position, r);
(*lightSample).isDelta = false;
}
if (d != INF) {
let wW = r.o + d * r.d;
let nv = bP(light, normalize(r.o - wW));
if (nv <= 0.0) { return INF; }
if (light.radiusOrSpread > 0.0) {
(*lightSample).direction = r.d;
(*lightSample).dist = d;
(*lightSample).normal = normalize(
r.o + r.d * d - light.position
);
(*lightSample).pdf = sphereSolidAnglePdf(r.o, light.position, light.radiusOrSpread);
}
(*lightSample).emission = light.emission * nv * select(
1.0,
1.0 / max(d * d, 1e-8),
light.radiusOrSpread <= 0.0
);
}
}

else if (ec != RECT_LIGHT && ec != SPHERE_LIGHT && ec != SPOT_LIGHT) {

d = INF;
}

return d;
}

fn fF(m0: vec3i, m1: vec3i, m2: vec3i, eU: vec3f) -> i32 {
let m00 = ah(m0.x);
let m01 = ah(m0.y);
let m02 = ah(m0.z);
let m10 = ah(m1.x);
let m11 = ah(m1.y);
let m12 = ah(m1.z);
let m20 = ah(m2.x);
let m21 = ah(m2.y);
let m22 = ah(m2.z);
var w00 = m00.y * eU.x;
var w01 = m01.y * eU.x;
var w02 = m02.y * eU.x;
var w10 = m10.y * eU.y;
var w11 = m11.y * eU.y;
var w12 = m12.y * eU.y;
var w20 = m20.y * eU.z;
var w21 = m21.y * eU.z;
var w22 = m22.y * eU.z;

var hy = w00 + w01 + w02 + w10 + w11 + w12 + w20 + w21 + w22;

w00 = w00 / hy;
w01 = w01 / hy + w00;
w02 = w02 / hy + w01;
w10 = w10 / hy + w02;
w11 = w11 / hy + w10;
w12 = w12 / hy + w11;
w20 = w20 / hy + w12;
w21 = w21 / hy + w20;
w22 = w22 / hy + w21;

let rand = eC(0u);
var oh: f32;
if (rand < w00) {
oh = m00.x;
} else if (rand < w01) {
oh = m01.x;
} else if (rand < w02) {
oh = m02.x;
} else if (rand < w10) {
oh = m10.x;
} else if (rand < w11) {
oh = m11.x;
} else if (rand < w12) {
oh = m12.x;
} else if (rand < w20) {
oh = m20.x;
} else if (rand < w21) {
oh = m21.x;
} else {
oh = m22.x;
}
return i32(oh);
}

fn mF(
pW: i32,
index: vec3i,
eU: vec3f
) -> i32 {
let m0 = vec3i(attrBuffers[index.x * ATTR_STRIDE + MATERIALINDEX_OFF]${e?".xyz":""});
let m1 = vec3i(attrBuffers[index.y * ATTR_STRIDE + MATERIALINDEX_OFF]${e?".xyz":""});
let m2 = vec3i(attrBuffers[index.z * ATTR_STRIDE + MATERIALINDEX_OFF]${e?".xyz":""});
if (m0.x > 0 || m1.x > 0 || m2.x > 0) {
return fF(m0, m1, m2, eU);
}
return pW;
}



${e?`
fn eP(normal: vec3f, dp1: vec3f, dp2: vec3f, oW: vec2f, oX: vec2f, input: vec4f) -> mat2x3f {
let determinant = oW.x * oX.y - oW.y * oX.x;
var t = input.xyz;
var b = vec3f(0.0);

var sign = select(input.w, 0.0, abs(input.w) > 1.5);
if (abs(determinant) > 1e-12) {
let dt = (dp1 * oX.y - dp2 * oW.y) / determinant;
let db = (dp2 * oW.x - dp1 * oX.x) / determinant;
if (dot(t, t) < 1e-8) { t = dt; }
if (sign == 0.0) { sign = select(1.0, -1.0, dot(cross(normal, dt), db) < 0.0); }
}
t -= normal * dot(normal, t);
if (dot(t, t) < 1e-8) {
let iI = select(-1.0, 1.0, normal.z >= 0.0);
let cL = -1.0 / (iI + normal.z);
let xy = normal.x * normal.y * cL;
t = vec3f(1.0 + iI * normal.x * normal.x * cL, iI * xy, -iI * normal.x);
b = vec3f(xy, iI + normal.y * normal.y * cL, -normal.y);
}
else { t = normalize(t); b = normalize(cross(normal, t)); }
return mat2x3f(t, b * select(1.0, -1.0, sign < 0.0));
}

`:""}
fn hH(
si: ptr<function, SurfaceInteraction>,
tri: fP,
eU: vec3f,
index: vec3i,
bZ: bool,
fM: i32
) {
(*si).hit = true;

let material = materialsBuffer[(*si).materialIndex];
let uvProjection = i32(material.uvProjection);

let i0 = index.x;
let i1 = index.y;
let i2 = index.z;
(*si).vertexColor = vec3f(1.0);
if (USE_VERTEX_COLOR) {
(*si).vertexColor = eU.x * attrBuffers[i0 * ATTR_STRIDE + COLOR_OFF].xyz
+ eU.y * attrBuffers[i1 * ATTR_STRIDE + COLOR_OFF].xyz
+ eU.z * attrBuffers[i2 * ATTR_STRIDE + COLOR_OFF].xyz;
}
let pU = uvProjection == ${xt.spherical};

var normal: vec3f = (*si).normal;
var hq: vec3f;
var n0 = vec3f(0.0);
var n1 = vec3f(0.0);
var n2 = vec3f(0.0);


if (!bZ || pU) {
n0 = attrBuffers[i0 * ATTR_STRIDE + NORMAL_OFF]${e?".xyz":""};
n1 = attrBuffers[i1 * ATTR_STRIDE + NORMAL_OFF]${e?".xyz":""};
n2 = attrBuffers[i2 * ATTR_STRIDE + NORMAL_OFF]${e?".xyz":""};
hq = normalize(eU.x * n0 + eU.y * n1 + eU.z * n2);
if (!bZ) {
normal = hq;
}
}

var uv: vec2f;
var uv0: vec2f;
var uv1: vec2f;
var uv2: vec2f;
var dj = vec2f(0.0);
if (USE_UV) {
uv0 = attrBuffers[i0 * ATTR_STRIDE + UV_OFF].xy;
uv1 = attrBuffers[i1 * ATTR_STRIDE + UV_OFF].xy;
uv2 = attrBuffers[i2 * ATTR_STRIDE + UV_OFF].xy;
uv = eU.x * uv0 + eU.y * uv1 + eU.z * uv2;
if (USE_UV1) {
let secondaryUv0 = attrBuffers[i0 * ATTR_STRIDE + UV1_OFF].xy;
let secondaryUv1 = attrBuffers[i1 * ATTR_STRIDE + UV1_OFF].xy;
let secondaryUv2 = attrBuffers[i2 * ATTR_STRIDE + UV1_OFF].xy;
dj = eU.x * secondaryUv0
+ eU.y * secondaryUv1
+ eU.z * secondaryUv2;
}
}

if (USE_TANGENT) {
let t0 = attrBuffers[i0 * ATTR_STRIDE + TANGENT_OFF]${e?".xyz":""};
let t1 = attrBuffers[i1 * ATTR_STRIDE + TANGENT_OFF]${e?".xyz":""};
let t2 = attrBuffers[i2 * ATTR_STRIDE + TANGENT_OFF]${e?".xyz":""};
(*si).tangent = normalize(eU.x * t0 + eU.y * t1 + eU.z * t2);
}

if (fM >= 0) {
(*si).materialIndex = fM;
}
else {
(*si).materialIndex = mF(
(*si).materialIndex,
index,
eU
);
}

if (uvProjection > 0) {

uv = gU(uvProjection, (*si).position, select(normal, hq, pU));
dj = uv;
}

uv = uv * material.uvScale;
dj = dj * material.uvScale;


if (uvProjection == ${xt.triplanar}) {
uv = fract(uv);
}

${e?`
${t?"  (*si).coatNormal = normal;":""}
let directionMaterial = materialsBuffer[(*si).materialIndex];
if (directionMaterial.anisotropyMapIndex >= 0.0 || directionMaterial.specularAnisotropyRotation != 0.0 || directionMaterial.coatAnisotropyRotation != 0.0${t?" || directionMaterial.coatWeight > 0.0":""}) {
let dp1 = tri.p0 - tri.p2;
let dp2 = tri.p1 - tri.p2;
var aX = vec4f(0.0);
if (USE_TANGENT) {
aX = eU.x * attrBuffers[i0 * ATTR_STRIDE + TANGENT_OFF]
+ eU.y * attrBuffers[i1 * ATTR_STRIDE + TANGENT_OFF]
+ eU.z * attrBuffers[i2 * ATTR_STRIDE + TANGENT_OFF];
}
let fc = eP(normal, dp1, dp2, uv0-uv2, uv1-uv2, aX);
(*si).geometryTangent = fc[0];
(*si).geometryBitangent = fc[1];
var gm = fc;
if (USE_UV1 && directionMaterial.anisotropyMapIndex >= 0.0 && mapInfo[i32(directionMaterial.anisotropyMapIndex) + NUM_MAPS * 2].x > 0.5) {
let a = attrBuffers[i0 * ATTR_STRIDE + UV1_OFF].xy;
let b = attrBuffers[i1 * ATTR_STRIDE + UV1_OFF].xy;
let c = attrBuffers[i2 * ATTR_STRIDE + UV1_OFF].xy;
gm = eP(normal, dp1, dp2, a-c, b-c, select(aX, vec4f(0.0), aX.w == 0.0));
}
(*si).directionTangent = gm[0];
(*si).directionBitangent = gm[1];
${t?`
if (USE_COAT_NORMAL_MAPS && directionMaterial.coatNormalMapIndex >= 0.0) {
let lg = i32(directionMaterial.coatNormalMapIndex);
var mU = fc;
if (USE_UV1 && mapInfo[lg + NUM_MAPS * 2].x > 0.5) {
let a = attrBuffers[i0 * ATTR_STRIDE + UV1_OFF].xy;
let b = attrBuffers[i1 * ATTR_STRIDE + UV1_OFF].xy;
let c = attrBuffers[i2 * ATTR_STRIDE + UV1_OFF].xy;
mU = eP(normal, dp1, dp2, a-c, b-c,
select(aX, vec4f(0.0), aX.w == 0.0));
}


let decoded = sampleMap(lg, getMapUvSet(lg, uv,
select(dj, uv, uvProjection > 0))).rgb * 2.0 - 1.0;
let mapped = mU[0] * decoded.x * directionMaterial.coatNormalScale.x
+ mU[1] * decoded.y * directionMaterial.coatNormalScale.y + normal * decoded.z;
if (dot(mapped, mapped) > 1e-12) { (*si).coatNormal = normalize(mapped); }
}
`:""}
}

`:""}
(*si).normal = normal;
(*si).vertexNormal = normal;
(*si).shadowOffset = vec3f(0.0);
if (!bZ) {



let geometricNormal = normalize(cross(tri.p1 - tri.p0, tri.p2 - tri.p0));
let kR = eU.x * n0 + eU.y * n1 + eU.z * n2;
let a = dot(n2 - n0, tri.p0 - tri.p2);
let b = dot(n2 - n1, tri.p1 - tri.p2);
let c = dot(n1 - n0, tri.p1 - tri.p0);
var h = a * eU.x * (eU.x - 1.0)
+ (a + b + c) * eU.x * eU.y
+ b * eU.y * (eU.y - 1.0);
if (dot(kR, geometricNormal) > 0.0) {
var h0 = max(max(dot(tri.p1 - tri.p0, n0), dot(tri.p2 - tri.p0, n0)), 0.0);
var h1 = max(max(dot(tri.p0 - tri.p1, n1), dot(tri.p2 - tri.p1, n1)), 0.0);
var h2 = max(max(dot(tri.p0 - tri.p2, n2), dot(tri.p1 - tri.p2, n2)), 0.0);
h0 = max(dot(tri.p0 - (*si).position, n0) + h0, 0.0);
h1 = max(dot(tri.p1 - (*si).position, n1) + h1, 0.0);
h2 = max(dot(tri.p2 - (*si).position, n2) + h2, 0.0);
h = max(min(min(h0, h1), h2), h * 0.5);
}
else {
var h0 = max(max(dot(tri.p0 - tri.p1, n0), dot(tri.p0 - tri.p2, n0)), 0.0);
var h1 = max(max(dot(tri.p1 - tri.p0, n1), dot(tri.p1 - tri.p2, n1)), 0.0);
var h2 = max(max(dot(tri.p2 - tri.p0, n2), dot(tri.p2 - tri.p1, n2)), 0.0);
h0 = max(dot((*si).position - tri.p0, n0) + h0, 0.0);
h1 = max(dot((*si).position - tri.p1, n1) + h1, 0.0);
h2 = max(dot((*si).position - tri.p2, n2) + h2, 0.0);
h = min(-min(min(h0, h1), h2), h * 0.5);
}
(*si).shadowOffset = kR * h;
}
(*si).uv = uv;
(*si).uv1 = dj;
if (USE_NORMAL_MAPS) {
let dp1 = tri.p0 - tri.p2;
let dp2 = tri.p1 - tri.p2;
let oW = uv0 - uv2;
let oX = uv1 - uv2;
(*si).normal = pd(
(*si).materialIndex, uv, normal, dp1, dp2, oW, oX
);
}
}

struct eK {
t: f32,
barycentric: vec3f,
};





fn ga(o: vec3f, d: vec3f, tri: fP, eq: i32, gY: vec3f, tMax: f32) -> eK {
var ti: eK;


var p0t = tri.p0 - o;
var p1t = tri.p1 - o;
var p2t = tri.p2 - o;


if (eq == 0) {
p0t = p0t.yzx;
p1t = p1t.yzx;
p2t = p2t.yzx;
} else if (eq == 1) {
p0t = p0t.zxy;
p1t = p1t.zxy;
p2t = p2t.zxy;
}



p0t = vec3f(p0t.xy + gY.xy * p0t.z, p0t.z);
p1t = vec3f(p1t.xy + gY.xy * p1t.z, p1t.z);
p2t = vec3f(p2t.xy + gY.xy * p2t.z, p2t.z);


var e = vec3f(
p1t.x * p2t.y - p1t.y * p2t.x,
p2t.x * p0t.y - p2t.y * p0t.x,
p0t.x * p1t.y - p0t.y * p1t.x
);

if (DEPTH_QUERY_MODE) {


let sF = abs(vec3f(p1t.x * p2t.y, p2t.x * p0t.y, p0t.x * p1t.y))
+ abs(vec3f(p1t.y * p2t.x, p2t.y * p0t.x, p0t.y * p1t.x));
e = select(e, vec3f(0.0), abs(e) <= sF * 1e-6);
}


if (any(e < vec3f(0)) && any(e > vec3f(0))) {
return ti;
}

let det = e.x + e.y + e.z;
if (DEPTH_QUERY_MODE && det == 0.0) { return ti; }

p0t.z *= gY.z;
p1t.z *= gY.z;
p2t.z *= gY.z;
let sw = (e.x * p0t.z + e.y * p1t.z + e.z * p2t.z);


if (abs(sw) > abs(tMax * det)) {
return ti;
}

let tN = 1. / det;
ti.t = sw * tN;
ti.barycentric = e * tN;

return ti;
}




override DEPTH_QUERY_MODE: bool = false;

fn fo(d: vec3f) -> vec3f {
if (!DEPTH_QUERY_MODE) { return 1.0 / d; }
return 1.0 / select(d, select(vec3f(1e-20), vec3f(-1e-20), d < vec3f(0.0)), abs(d) < vec3f(1e-20));
}

fn fk(gr: vec3f, o: vec3f) -> vec3f {
if (!DEPTH_QUERY_MODE) { return vec3f(0.0); }
return abs(gr) * max(vec3f(1.0), abs(o)) * 1e-6;
}



fn cU(o: vec3f, xq: vec3f, xp: vec3f, gr: vec3f, tMax: f32) -> f32 {
let wG = (xq - o) * gr;
let wI = (xp - o) * gr;
let padding = fk(gr, o);
let nJ = min(wG, wI) - padding;
let sY = max(wG, wI) + padding;
let t0 = max(nJ.x, max(nJ.y, nJ.z));
let t1 = min(sY.x, min(sY.y, sY.z));
return select(select(t1, t0, t0 > 0.0), -1.0, (t0 > t1 || t0 > tMax));
}

fn maxDimension(v: vec3f) -> i32 {
return select(select(2, 1, v.y > v.z), select(2, 0, v.x > v.z), v.x > v.y);
}

fn nk(d: vec3f, eq: i32) -> vec3f {


if (eq == 0) {
return vec3f(-d.y, -d.z, 1.0) / d.x;
} else if (eq == 1) {
return vec3f(-d.z, -d.x, 1.0) / d.y;
} else {
return vec3f(-d.x, -d.y, 1.0) / d.z;
}
}

fn mV(
si: ptr<function, SurfaceInteraction>,
mk: fP,
aC: vec3f,
hK: vec3i,
bZ: bool,
ap: i32,
eL: vec3f,
fi: vec3f,
fM: i32
) {
(*si).instanceIndex = ap;
(*si).barycentrics = aC.xy;
(*si).normal = eL;
(*si).position = fi;
(*si).materialIndex = i32(ah(
bitcast<i32>(instancesBuffer[ap * ${te}].z)
).x);


hH(
si,
mk,
aC,
hK,
bZ,
fM
);

let l2w = mat4x4<f32>(
instancesBuffer[ap * ${te} + 5],
instancesBuffer[ap * ${te} + 6],
instancesBuffer[ap * ${te} + 7],
instancesBuffer[ap * ${te} + 8]
);
let w2l = mat4x4<f32>(
instancesBuffer[ap * ${te} + 1],
instancesBuffer[ap * ${te} + 2],
instancesBuffer[ap * ${te} + 3],
instancesBuffer[ap * ${te} + 4]
);
let aH = transpose(mat3x3<f32>(
w2l[0].xyz,
w2l[1].xyz,
w2l[2].xyz
));

(*si).faceNormal = normalize(aH * eL);
(*si).vertexNormal = normalize(aH * (*si).vertexNormal);
(*si).normal = normalize(aH * (*si).normal);
${t?"  (*si).coatNormal = normalize(aH * (*si).coatNormal);":""}
if (USE_TANGENT && dot((*si).tangent, (*si).tangent) > 0.0) {
(*si).tangent = normalize((l2w * vec4f((*si).tangent, 0.0)).xyz);
}
${e?`
(*si).directionTangent = (l2w * vec4f((*si).directionTangent, 0.0)).xyz;
(*si).directionBitangent = (l2w * vec4f((*si).directionBitangent, 0.0)).xyz;
(*si).geometryTangent = (l2w * vec4f((*si).geometryTangent, 0.0)).xyz;
(*si).geometryBitangent = (l2w * vec4f((*si).geometryBitangent, 0.0)).xyz;
`:""}
(*si).shadowOffset = (l2w * vec4f((*si).shadowOffset, 0.0)).xyz;
(*si).position = (l2w * vec4((*si).position, 1.0)).xyz;
}


${tp(e)}



${a||np({hasDisplacement:i,hasAnisotropyDirections:e,hasCoatNormals:t,blasLayoutMask:A})}`}const op=`
const CAMERA_PIXEL = 0u;
const CAMERA_LENS = 1u;
const CAMERA_WAVELENGTH = 2u;
const CAMERA_BEVEL_BASE = 3u;
const LIGHT_SELECT = 0u;
const LIGHT_POSITION = 1u;
const BSDF_LOBE = 2u;
const BSDF_DIRECTION = 3u;
const MEDIUM_CHANNEL = 4u;
const MEDIUM_DISTANCE = 5u;
const PHASE_DIRECTION = 6u;
const RUSSIAN_ROULETTE = 7u;
const BOUNCE_STRIDE = 64u;



var<private> aZ: vec2u;
var<private> aQ: u32;
var<private> bT: u32 = 0u;
var<private> cP: u32 = 0u;
fn dG(kW: u32) -> u32 {
var x = kW;
x ^= x >> 16u; x *= 0x7feb352du;
x ^= x >> 15u; x *= 0x846ca68bu;
return x ^ (x >> 16u);
}
fn ar(a: u32, b: u32) -> u32 {
return dG(a ^ dG(b + 0x9e3779b9u));
}
fn iV(kW: u32, seed: u32) -> u32 {
var x = kW + seed;
x ^= x * 0x6c50b47cu; x ^= x * 0xb82f1e52u;
x ^= x * 0xc7afe638u; x ^= x * 0x8d22f6e6u;
return x;
}
fn ua(x: u32, seed: u32) -> u32 {
return reverseBits(iV(reverseBits(x), seed));
}

fn su(kW: u32) -> u32 {
var r = reverseBits(kW);
${gc.map(([i,e])=>`r ^= (r << ${i}u) & 0x${e.toString(16)}u;`).join(`
  `)}
return r;
}
fn xE(index: u32, seed: u32) -> vec2f {
let i = ua(index, ar(seed, 0u));
let x = reverseBits(iV(i, ar(seed, 1u)));
let y = ua(su(i), ar(seed, 2u));
return vec2f(f32(x >> 8u), f32(y >> 8u)) * (1.0 / 16777216.0);
}
fn uR(p: vec2u) -> u32 {
var v = p & vec2u(255u);
v = (v | (v << vec2u(4u))) & vec2u(0x0f0fu);
v = (v | (v << vec2u(2u))) & vec2u(0x3333u);
v = (v | (v << vec2u(1u))) & vec2u(0x5555u);
return v.x | (v.y << 1u);
}
${mc.map((i,e)=>`const Z_PERM_${e} = ${i}u;`).join(`
`)}
fn la(uU: u32) -> u32 {
let group = uU >> 2u;
var word = Z_PERM_5;
${[0,1,2,3,4].map(i=>`word = select(word, Z_PERM_${i}, group == ${i}u);`).join(`
  `)}
return (word >> ((uU & 3u) * 8u)) & 255u;
}
fn qS(lu: u32, dim: u32, logSPP: u32) -> u32 {
let odd = logSPP & 1u;
let vN = 8u + ((logSPP + 1u) >> 1u);
var result = 0u;
for (var digit = i32(vN) - 1; digit >= i32(odd); digit--) {
let shift = 2u*u32(digit) - odd;

var tL = 0u;
if (shift < 30u) { tL = lu >> (shift + 2u); }
let uU = (dG(tL ^ (0x55555555u * dim)) >> 24u) % 24u;
let d = (lu >> shift) & 3u;
result |= ((la(uU) >> (2u*d)) & 3u) << shift;
}
if (odd != 0u) {
result |= (lu & 1u) ^ (dG((lu >> 1u) ^ (0x55555555u * dim)) & 1u);
}
return result;
}



fn cE(slot: u32) -> u32 {
return CAMERA_BEVEL_BASE + u32(BEVEL_SAMPLES) + bT * BOUNCE_STRIDE + slot;
}
fn sl(candidate: u32, slot: u32) -> u32 {
if (candidate == 0u) {
if (slot == 2u) { return cE(8u); }
return cE(slot);
}
return cE(9u + (candidate - 1u) * 3u + slot);
}


var<private> hA: vec4u;
var<private> hB: u32;
var<private> fQ: bool = false;
var<private> dv: bool = false;
var<private> dQ: u32;
var<private> gK: u32;
var<private> fa: vec2f;
fn dN(dim: u32) {

let kI = aZ.x + aZ.y * u32(rtUniform.outputSize.x);
let key = vec4u(dim, aQ, kI, rtUniform.sequenceSeed);
if (fQ && all(hA == key) && hB == rtUniform.zSobolLogSPP) { return; }
hA = key; hB = rtUniform.zSobolLogSPP;
fQ = true; dv = false;
var seed = ar(ar(kI, dim), rtUniform.sequenceSeed);
var index = aQ;
if (SAMPLING_PATTERN == 1) {
var logSPP = rtUniform.zSobolLogSPP;
if (index == 0u) { logSPP = 0u; }
else { index -= 1u; }

var jw = index >> logSPP;
let mask = (1u << logSPP) - 1u;
let lu = (uR(aZ) << logSPP) | (index & mask);
index = qS(lu, dim, logSPP);
let tile = aZ >> vec2u(8u);
seed = ar(ar(dim, rtUniform.sequenceSeed), ar(tile.x, tile.y));

if (aQ != 0u) { jw += 1u; }
seed = ar(seed, jw);
}
dQ = ua(index, ar(seed, 0u));
gK = seed;
let x = reverseBits(iV(dQ, ar(seed, 1u)));
fa.x = f32(x >> 8u) * (1.0 / 16777216.0);
}
fn lC(dim: u32) -> vec2f {
dN(dim);
if (!dv) {
let y = ua(su(dQ), ar(gK, 2u));
fa.y = f32(y >> 8u) * (1.0 / 16777216.0);
dv = true;
}
return EPS + (1.0 - 2.0*EPS) * fa;
}
fn dp(dim: u32) -> f32 {
if (SAMPLING_PATTERN == 2) { return EPS + (1.0 - 2.0*EPS)*rand(); }
dN(dim);
return EPS + (1.0 - 2.0*EPS) * fa.x;
}
fn dZ(dim: u32) -> vec2f {
if (SAMPLING_PATTERN == 2) {
let x = dp(dim); let y = dp(dim);
return vec2f(x,y);
}
return lC(dim);
}

fn eC(slot: u32) -> f32 {
let dim = ar(ar(bT, slot), cP) | 0x80000000u;
cP += 1u;
if (SAMPLING_PATTERN == 2) { return EPS + (1.0 - 2.0*EPS)*rand(); }

let kI = aZ.x + aZ.y * u32(rtUniform.outputSize.x);
let seed = ar(ar(kI, dim), rtUniform.sequenceSeed);
let i = ua(aQ, ar(seed, 0u));
let x = reverseBits(iV(i, ar(seed, 1u)));
return EPS + (1.0 - 2.0*EPS) * (f32(x >> 8u) * (1.0 / 16777216.0));
}
`,lp=`
var<private> s0: vec4u;

fn gW(p: vec2u, frame: i32) {

s0 = vec4u(p, u32(frame), u32(p.x) + u32(p.y));
}


fn xd() {
s0 = s0 * 1664525u + 1013904223u;
s0.x += s0.y*s0.w; s0.y += s0.z*s0.x; s0.z += s0.x*s0.y; s0.w += s0.y*s0.z;
s0 = s0 ^ (s0>>vec4(16u));
s0.x += s0.y*s0.w; s0.y += s0.z*s0.x; s0.z += s0.x*s0.y; s0.w += s0.y*s0.z;
}

fn rand() -> f32 {
xd(); return f32(s0.x)/f32(0xffffffffu);
}

`;function cp(i=!0,e=!1){return`

struct ob {
ray: Ray,
maxDistance: f32,
triangleIndex: i32,
contribution: vec3f,


risTarget: f32,
lightSelectionPmf: f32,
valid: bool,
}

fn sd(
si: ptr<function, SurfaceInteraction>,
ma: OpenPbrResolvedMaterial,
aa: ptr<function, Path>,
ffnormal: vec3f,
eM: bool,
lightSample: LightSampleRec,
f: vec3f,
scatteringPdf: f32,
gz: ptr<function, ob>
) -> bool {
(*gz).valid = false;
(*gz).lightSelectionPmf = 0.0;
(*gz).risTarget = 0.0;
var Li = lightSample.emission;

let lightDir = lightSample.direction;
let qY = -(*aa).ray.d;
let fA = lightSample.pdf;
let lightSelectionPmf = lightSample.selectionPmf;


${e?`var cosThetaL = dot(ffnormal, lightDir);
if (eM && ma.coatNormalEnabled) { cosThetaL = dot(ma.geometricNormal, lightDir); }`:"let cosThetaL = dot(ffnormal, lightDir);"}

if ((fA <= 0.0) | (lightSelectionPmf <= 0.0) |
(max(max(Li.x, Li.y), Li.z) <= 0.0)) {
return false;
}

if ((scatteringPdf <= 0.0) | (max(max(f.x, f.y), f.z) <= 0.0)) {
return false;
}

var ns: Ray;
var hw = (*si).position + EPS * lightDir;
if (eM) {
hw = sR((*si).position, (*si).faceNormal, lightDir);
let ch = 0.1;
var dL = dot((*si).normal, lightDir);
${e?"    if (ma.coatNormalEnabled) { dL = dot((*si).faceNormal, lightDir); }":""}
let geometricNormal = select(
(*si).faceNormal,
-(*si).faceNormal,
dL < 0.0
);
dL = abs(dL);
let iq = dot(geometricNormal, lightDir);
let pq = select(
clamp(1.0 - iq / ch, 0.0, 1.0),
clamp(
2.0 - (iq + dL) / ch,
0.0,
1.0
),
dL < ch
);
hw += (*si).shadowOffset * pq;
}




var mA = lightDir;
var nN = lightSample.dist - EPS;
if (lightSample.sourceType == 1u) {
let uo =
(*si).position + lightSample.direction * lightSample.dist;
let rc = uo + EPS * lightSample.normal;
let rr = rc - hw;
nN = length(rr);
mA = normalize(rr);
}
gC(&ns, hw, mA);




if (eM & (cosThetaL < 0.0) & (lightSample.sourceType == 0u)) {
let background = hX(ns);
Li = background.rgb * background.a;
}
if (SPECTRAL) {
Li = aj(Li, (*si).wavelength);
}



let fl = select(
uS(fA, scatteringPdf),
1.0,
lightSample.isDelta
);
if (fl > 0.0) {
let kV = Li * f / fA * (*aa).beta;
(*gz).risTarget = max(
dot(max(kV * lightSelectionPmf, vec3f(0.0)), luminance),
0.0
);
(*gz).ray = ns;
(*gz).maxDistance = nN;
(*gz).triangleIndex = (*si).triangleIndex;
(*gz).contribution = fl * kV;
(*gz).lightSelectionPmf = lightSelectionPmf;
(*gz).valid = true;
return true;
}
return false;
}

struct qc {
direction: vec3f,
response: vec3f,
pdf: f32,
transmission: bool,
}

fn sW(
si: ptr<function, SurfaceInteraction>,
ma: OpenPbrResolvedMaterial,
prepared: ag,
aa: ptr<function, Path>,
ffnormal: vec3f,
eM: bool
) -> qc {
let candidateCount = kB();
var selected: ob;
selected.valid = false;
var nH = 0.0;
var mq = 0.0;
var result: qc;




for (var event = 0u; event <= candidateCount; event++) {
let rX = event == candidateCount;
var lightSample: LightSampleRec;
var lightDir: vec3f;
var scatteringPdf = 0.0;
var response = vec3f(0.0);
var tE = false;
if (rX) {
var rU = 1.0;
var valid = selected.valid;
if (candidateCount > 1u) {
valid = valid & (nH > 0.0);
if (valid) {
rU = selected.lightSelectionPmf * mq /
(f32(candidateCount) * nH);
}
}
if (valid && !intersectSceneShadow(selected.ray, selected.maxDistance, selected.triangleIndex)) {
(*aa).li += selected.contribution * rU;
}
if (!eM) {
result.direction = fH(-(*aa).ray.d,
(*si).mediumAnisotropy, dZ(cE(PHASE_DIRECTION)));
result.pdf = bL(
dot(result.direction, -(*aa).ray.d), (*si).mediumAnisotropy);
return result;
}
let vR = vec3f(dZ(cE(BSDF_DIRECTION)), dp(cE(BSDF_LOBE)));
tE = !prepared.material.thinWalled &
(abs(prepared.material.relativeIor - 1.0) <= 1e-6) &
(prepared.probabilities[OPENPBR_LOBE_TRANSMISSION] >= 1.0 - 1e-6);
if (tE) {
lightDir = openpbr_to_world(prepared.basis, -prepared.viewLocal);
response = bh(prepared.material) * cF(prepared,
${e?"select(-prepared.viewLocal.z, dot(prepared.coatBasis.normal, lightDir), prepared.material.coatNormalEnabled)":"-prepared.viewLocal.z"});
scatteringPdf = 1.0;
result.transmission = true;
} else {
var roughness = 1.0; var specular = false; var diffuse = true;
var jT = u32(OPENPBR_LOBE_DIFFUSE);

var transmission = false;
if (!jq(prepared, vR, &lightDir, &transmission,
&roughness, &specular, &diffuse, &jT)) { return result; }
result.transmission = transmission;
}
} else {
let lV = vec3f(dZ(sl(event, 1u)), dp(sl(event, 0u)));
nE((*si).position, lV, event, candidateCount, &lightSample);
lightDir = lightSample.direction;
if ((lightSample.pdf <= 0.0) | (lightSample.selectionPmf <= 0.0) |
(max(max(lightSample.emission.x, lightSample.emission.y), lightSample.emission.z) <= 0.0)) { continue; }
${e?`var cosThetaL = dot(ffnormal, lightDir);
if (eM & ma.coatNormalEnabled) { cosThetaL = dot(ma.geometricNormal, lightDir); }`:"let cosThetaL = dot(ffnormal, lightDir);"}
if (eM & (cosThetaL <= 0.0) & (ma.transmissionWeight <= 0.0) & (ma.subsurfaceWeight <= 0.0)) { continue; }
}
if (!tE) {
if (eM) {
response = bO(prepared, lightDir, &scatteringPdf);
} else {
scatteringPdf = bL(
dot(-(*aa).ray.d, lightDir), (*si).mediumAnisotropy);
response = vec3f(scatteringPdf);
}
}
if (rX) {
result.direction = lightDir; result.response = response; result.pdf = scatteringPdf;
return result;
}
var candidate: ob;
let tv = sd(si, ma, aa, ffnormal, eM,
lightSample, response, scatteringPdf, &candidate);
if (!tv) { continue; }
if (candidateCount == 1u) {
selected = candidate;
continue;
}
let kO = candidate.risTarget / max(candidate.lightSelectionPmf, 1e-20);
if (!(kO > 0.0) | (kO != kO)) { continue; }
mq += kO;
if (!selected.valid ||
qx(event) * mq <= kO) {
selected = candidate;
nH = candidate.risTarget;
}
}
return result;
}

fn qm(
si: ptr<function, SurfaceInteraction>,
aa: ptr<function, Path>
) -> f32 {
if ((*aa).fromEye | (rtUniform.lightWeightTotal <= 0.0) |
(i32(materialsBuffer[(*si).materialIndex].matType) == UNLIT)) {
return 1.0;
}
let samplingLuminance = dot(
materialsBuffer[(*si).materialIndex].emission,
luminance
);
let qi = dot((*si).faceNormal, -(*aa).ray.d);
if ((samplingLuminance <= 0.0) | (qi <= 0.0)) {
return 1.0;
}
let te = distance((*si).position, (*aa).ray.o);
let fA = samplingLuminance / rtUniform.lightWeightTotal *
te * te / max(qi, 1e-8);
return gj((*aa).scatteringPdf, fA);
}

${e?`


fn fT(input: vec3f, face: vec3f, view: vec3f) -> vec3f {
let front = dot(face, view) >= 0.0;
let vP = select(-face, face, front);
let sc = select(-input, input, front);
if ((dot(input, face) <= 0.0) | (dot(sc, view) <= 1e-6)) { return vP; }
return sc;
}
`:""}
fn mL(
si: ptr<function, SurfaceInteraction>,
ma: ptr<function, OpenPbrResolvedMaterial>,
aa: ptr<function, Path>
) {
${e?`
let bK = (*si).faceNormal;
let nB = (*si).normal;
`:""}
var sO: f32 = -dot((*si).faceNormal, (*aa).ray.d);
var tV: f32 = -dot((*si).normal, (*aa).ray.d);
if ((((*ma).transmissionWeight > 0.0) | ((*ma).subsurfaceWeight > 0.0)) & (*ma).thinWalled) {

if (sO < 0.0) {
(*si).faceNormal = -(*si).faceNormal;
sO = -sO;
}
if (tV < 0.0) {
(*si).normal = -(*si).normal;
tV = -tV;
}
}


var qM: bool = (sO >= 0.0) & (tV < 0.0);
var ndv: f32 = select(tV, sO, qM);
var N: vec3f = select((*si).normal, (*si).faceNormal, qM);

(*ma).inside = (ndv <= 0.0) & !(*ma).thinWalled;

(*ma).relativeIor = select((*ma).specularIor, (1.0 / (*ma).specularIor), ndv > 0.0);
var ffnormal = select(-N, N, ndv >= 0.0);
${e?`
if ((*ma).coatNormalEnabled) {
let view = -(*aa).ray.d;
let gp = dot(bK, view);
(*ma).geometricNormal = select(-bK, bK, gp >= 0.0);
ffnormal = fT(nB, bK, view);
(*ma).coatNormal = fT((*si).coatNormal, bK, view);
(*ma).inside = (gp <= 0.0) & !(*ma).thinWalled;
(*ma).relativeIor = select((*ma).specularIor, 1.0 / (*ma).specularIor, (gp > 0.0) | (*ma).thinWalled);
}
`:""}

(*aa).scatteringIsDelta = false;
var bs = false;
var hC = false;
let mediumType = (*si).mediumType;

var scatteringPdf: f32;
var dH: vec3f;

if (HAS_MEDIUM) {
let d = distance((*si).position, (*aa).ray.o);
let os = (*aa).ray.o;
let extinction = (*si).mediumExtinction;
let scattering = min((*si).mediumScattering, extinction);
let tR = max(max(extinction.x, extinction.y), extinction.z);
if ((mediumType > 0) & (tR > 0.0)) {


let oi = min(i32(dp(cE(MEDIUM_CHANNEL)) * 3.0), 2);
let fS = extinction[oi];
let iH = select(
d,
min(-log(max(dp(cE(MEDIUM_DISTANCE)), 1e-7)) / fS, d),
fS > 0.0
);
bs = iH < d;
let transmittance = exp(-extinction * iH);
let oU = select(
transmittance,
extinction * transmittance,
bs
);
let oE = max((oU.x + oU.y + oU.z) / 3.0, 1e-8);
if (bs) {
(*aa).beta *= transmittance * scattering / oE;

(*aa).ray.o = os + iH * (*aa).ray.d;
(*si).position = (*aa).ray.o;
}
else {
(*aa).beta *= transmittance / oE;
}
}
}

if (!bs) {
(*aa).li += qm(si, aa) * (*ma).emission * (*aa).beta;
}
if ((*ma).materialType == UNLIT) {
(*aa).abort = true;
return;
}


var prepared: ag;
if (!bs) {
${i?`
(*ma).directionTangent = (*si).directionTangent;
(*ma).directionBitangent = (*si).directionBitangent;
(*ma).geometryTangent = (*si).geometryTangent;
(*ma).geometryBitangent = (*si).geometryBitangent;
`:""}
prepared = ds((*si).tangent, *ma, -(*aa).ray.d, ffnormal);
}
let qW = sW(si, *ma, prepared, aa, ffnormal, !bs);
dH = qW.direction;
scatteringPdf = qW.pdf;
if (!bs) {
let f = qW.response;
let isNextRefraction = qW.transmission;




if (!(scatteringPdf > 0.0) |
!all(f == f) | !all(abs(f) < vec3f(3.402823e38)) |
(dot(dH, dH) < 0.5)) {
(*aa).scatteringPdf = 0.0;
(*aa).abort = true;
return;
}


(*aa).scatteringIsDelta = !prepared.material.thinWalled &
(abs(prepared.material.relativeIor - 1.0) <= 1e-6) &
(prepared.probabilities[OPENPBR_LOBE_TRANSMISSION] >= 1.0 - 1e-6);
(*aa).beta *= f / scatteringPdf;

hC = isNextRefraction & !(*ma).thinWalled;
(*aa).isNextRefraction = isNextRefraction;


(*aa).ray.o = (*si).position + EPS * dH;
${e?`
if ((*ma).coatNormalEnabled) { (*aa).ray.o = (*si).position + EPS * select(-bK, bK, dot(bK, dH) >= 0.0); }
`:""}
}
(*aa).scatteringPdf = scatteringPdf;
(*aa).ray.d = dH;
if (bs) {
(*aa).isNextRefraction = false;
}

(*aa).fromEye = false;

if (HAS_MEDIUM) {


if (!bs & hC & ((*ma).mediumType > 0)) {
if (sO >= 0.0) {
(*si).mediumType = (*ma).mediumType;
(*si).mediumExtinction = (*ma).mediumExtinction;
(*si).mediumScattering = (*ma).mediumScattering;
(*si).mediumAnisotropy = (*ma).mediumAnisotropy;
}
else {
(*si).mediumType = 0;
(*si).mediumExtinction = vec3f(0.0);
(*si).mediumScattering = vec3f(0.0);
(*si).mediumAnisotropy = 0.0;
}
}
}
}
`}const fp=`
fn eY(light: Light, fI: vec3f, jt: vec2f, lightSample: ptr<function, LightSampleRec>) {
let iQ = light.position - fI;
let ak = length(iQ);
if (light.radiusOrSpread <= 0.0) {



if (ak <= 1e-6) {
(*lightSample).direction = vec3f(0.0, 0.0, 1.0);
(*lightSample).normal = vec3f(0.0, 0.0, -1.0);
(*lightSample).dist = 0.0;
(*lightSample).pdf = 1.0;
(*lightSample).emission = vec3f(0.0);
(*lightSample).isDelta = true;
return;
}
(*lightSample).direction = iQ / ak;
(*lightSample).normal = -(*lightSample).direction;
(*lightSample).dist = ak;
(*lightSample).pdf = 1.0;
(*lightSample).emission = light.emission /
max(ak * ak, 1e-8);
(*lightSample).isDelta = true;
return;
}
let radius = max(light.radiusOrSpread, 1e-6);
(*lightSample).isDelta = false;
var gX: vec3f;

if (ak <= radius) {
let z = 1.0 - 2.0 * jt.x;
let ex = sqrt(max(0.0, 1.0 - z * z));
let azimuth = TWOPI * jt.y;
gX = vec3f(
ex * cos(azimuth),
ex * sin(azimuth),
z
);
(*lightSample).pdf = INV4PI;
}
else {
let ui = iQ / ak;
let jV = min(
1.0,
radius * radius / (ak * ak)
);
let cosThetaMax = sqrt(max(0.0, 1.0 - jV));
let ci = mix(1.0, cosThetaMax, jt.x);
let sinTheta = sqrt(max(0.0, 1.0 - ci * ci));
let azimuth = TWOPI * jt.y;
var tangent: vec3f;
var bitangent: vec3f;
aP(ui, &tangent, &bitangent);
gX = ui * ci
+ tangent * (sinTheta * cos(azimuth))
+ bitangent * (sinTheta * sin(azimuth));
(*lightSample).pdf = 1.0 / max(
TWOPI * (1.0 - cosThetaMax),
1e-8
);
}

let iR = dot(gX, iQ);
let ra = dot(iQ, iQ);
let br = iR * iR
- ra + radius * radius;
let cV = iR - sqrt(max(0.0, br));
let cM = iR + sqrt(max(0.0, br));
(*lightSample).dist = select(cM, cV, cV > 1e-6);
(*lightSample).direction = gX;
let tl = fI + gX * (*lightSample).dist;
(*lightSample).normal = normalize(tl - light.position);
(*lightSample).emission = light.emission;
}

fn dn(
light: Light,
surfacePoint: vec3f,
lowerLeft: vec3f,
result: ptr<function, LightSampleRec>
) {
if (light.textureIndex < 0.0) {
return;
}
let width = length(light.u);
let height = length(light.v);
let ek = surfacePoint - lowerLeft;
let uv = vec2f(
dot(ek, light.u / width) / width,
dot(ek, light.v / height) / height
);
(*result).emission *= sampleMap(i32(light.textureIndex), uv).rgb;
}

fn kw(
light: Light,
shadingPoint: vec3f,
samplePoint: vec2f,
result: ptr<function, LightSampleRec>
) {
let normal = normalize(cross(light.u, light.v));
let lowerLeft = light.position - 0.5 * (light.u + light.v);
let spread = clamp(light.radiusOrSpread, 0.0, 1.0);

if (spread <= 0.001) {
let gw = dot(normal, shadingPoint - light.position);
let surfacePoint = shadingPoint - normal * gw;
let ek = surfacePoint - lowerLeft;
let width = length(light.u);
let height = length(light.v);
let uv = vec2f(
dot(ek, light.u / width) / width,
dot(ek, light.v / height) / height
);
if (gw <= 0.0 || any(uv < vec2f(0.0)) || any(uv > vec2f(1.0))) {
(*result).emission = vec3f(0.0);
(*result).pdf = 0.0;
return;
}
(*result).direction = -normal;
(*result).dist = gw;
(*result).normal = normal;
(*result).emission = light.emission;
(*result).pdf = 1.0;
(*result).isDelta = true;
dn(light, surfacePoint, lowerLeft, result);
return;
}

let surfacePoint = lowerLeft
+ light.u * samplePoint.x
+ light.v * samplePoint.y;
let offset = surfacePoint - shadingPoint;
let hE = dot(offset, offset);
(*result).dist = sqrt(hE);
(*result).direction = offset / (*result).dist;
(*result).normal = normal;
let gn = dot(-(*result).direction, normal);
let pK = cos(0.5 * PI * spread);
if (gn <= 0.0 || gn < pK) {
(*result).emission = vec3f(0.0);
(*result).pdf = 0.0;
return;
}
(*result).emission = light.emission;
(*result).pdf = hE / max(light.area * gn, 1e-8);
dn(light, surfacePoint, lowerLeft, result);
}

fn gs(
light: Light,
result: ptr<function, LightSampleRec>
) {
(*result).direction = normalize(-light.u);
(*result).normal = -(*result).direction;
(*result).emission = light.emission;
(*result).dist = INF;
(*result).pdf = 1.0;
(*result).isDelta = true;
}

fn kx(
light: Light,
shadingPoint: vec3f,
samplePoint: vec2f,
result: ptr<function, LightSampleRec>
) {
eY(light, shadingPoint, samplePoint, result);
let surfacePoint = shadingPoint + (*result).direction * (*result).dist;
let dV = normalize(shadingPoint - surfacePoint);
(*result).emission *= bP(light, dV);
}

fn jg(
light: Light,
shadingPoint: vec3f,
samplePoint: vec2f,
result: ptr<function, LightSampleRec>
) {
let ec = i32(light.litType);
if (HAS_SCENE_RECT_LIGHT && ec == RECT_LIGHT) {
kw(light, shadingPoint, samplePoint, result);
return;
}
if (HAS_SCENE_SPHERE_LIGHT && ec == SPHERE_LIGHT) {
eY(light, shadingPoint, samplePoint, result);
return;
}
if (HAS_SCENE_SPOT_LIGHT && ec == SPOT_LIGHT) {
kx(light, shadingPoint, samplePoint, result);
return;
}
if (HAS_SCENE_DIRECTIONAL_LIGHT && ec == DIRECTIONAL_LIGHT) {
gs(light, result);
}
}

fn nD(jt: vec2f, lightSample: ptr<function, LightSampleRec>) {
var uv: vec2f;

var pdf: f32;
let direction = pI(jt, &uv, &pdf);
(*lightSample).pdf = pdf;
(*lightSample).direction = direction;
(*lightSample).emission = textureLinear(envMap, uv).rgb;
(*lightSample).dist = INF;
}

fn ca(iK: i32) -> vec4f {
let width = rtUniform.lightSamplingTextureWidth;
return textureLoad(
lightSamplingData,
vec2i(iK % width, iK / width),
0
);
}

fn rb(index: i32) -> EmissiveTriangle {
let offset = index * 6;
let a = ca(offset);
let b = ca(offset + 1);
let c = ca(offset + 2);
let d = ca(offset + 3);
let e = ca(offset + 4);
let f = ca(offset + 5);
return EmissiveTriangle(
a.xyz, a.w,
b.xyz, b.w,
c.xyz, c.w,
d.xy, d.zw, e.xy,
e.zw, f.xy, f.zw
);
}

fn tI(index: i32) -> qb {
let data = ca(rtUniform.lightChoiceTexelOffset + index);
return qb(
data.x,
bitcast<i32>(data.y),
bitcast<i32>(data.z),
bitcast<i32>(data.w)
);
}

fn ka(nZ: i32, index: i32) -> qb {
return tI(nZ + index);
}

fn nR(
rnd: vec3f,
mS: u32,
candidateCount: u32
) -> vec3f {
var uk = rnd;
let count = max(candidateCount, 1u);
uk.z = (rnd.z + f32(min(mS, count - 1u))) /
f32(count);
return uk;
}

fn mH(
triangle: EmissiveTriangle,
fI: vec3f,
jt: vec2f,
lightSample: ptr<function, LightSampleRec>
) {
let xh = sqrt(jt.x);
let barycentric = vec3f(
1.0 - xh,
xh * (1.0 - jt.y),
xh * jt.y
);
let uq =
barycentric.x * triangle.p0 +
barycentric.y * triangle.p1 +
barycentric.z * triangle.p2;
let uv =
barycentric.x * triangle.uv0 +
barycentric.y * triangle.uv1 +
barycentric.z * triangle.uv2;
let dj =
barycentric.x * triangle.secondaryUv0 +
barycentric.y * triangle.secondaryUv1 +
barycentric.z * triangle.secondaryUv2;
let normal = normalize(cross(triangle.p1 - triangle.p0, triangle.p2 - triangle.p0));
(*lightSample).direction = uq - fI;
(*lightSample).dist = length((*lightSample).direction);
if ((*lightSample).dist <= EPS) {
(*lightSample).emission = vec3f(0.0);
(*lightSample).pdf = 0.0;
return;
}
(*lightSample).direction /= (*lightSample).dist;
(*lightSample).normal = normal;
let qi = dot(normal, -(*lightSample).direction);
if (qi <= 0.0) {
(*lightSample).emission = vec3f(0.0);
(*lightSample).pdf = 0.0;
return;
}
(*lightSample).emission = getMaterialEmission(
i32(triangle.materialIndex), uv, dj
);
(*lightSample).selectionPmf = triangle.selectionPmf;
(*lightSample).pdf = triangle.selectionPmf *
((*lightSample).dist * (*lightSample).dist) /
max(triangle.area * qi, 1e-8);
}

fn hv(
fI: vec3f,
rnd: vec3f,
nZ: i32,
choiceCount: i32,
nX: f32,
lightSample: ptr<function, LightSampleRec>
) {
(*lightSample).emission = vec3f(0.0);
(*lightSample).pdf = 0.0;
(*lightSample).selectionPmf = 0.0;
(*lightSample).dist = INF;
(*lightSample).isDelta = false;
(*lightSample).sourceType = 0u;
(*lightSample).sourceIndex = 0xffffffffu;
if (choiceCount <= 0) {
return;
}

let sq = rnd.z * f32(choiceCount);
let column = min(i32(sq), choiceCount - 1);
let rW = ka(nZ, column);
let lM = select(
rW.aliasIndex,
column,
fract(sq) < rW.probability
);
let qh = ka(nZ, lM);
if (USE_ENVMAP && qh.sourceType == ${JA}) {
(*lightSample).sourceType = 0u;
(*lightSample).sourceIndex = u32(qh.sourceIndex);
nD(rnd.xy, lightSample);
(*lightSample).selectionPmf = rtUniform.envLightPmf;
(*lightSample).pdf *= rtUniform.envLightPmf;
}
else if (qh.sourceType == ${$A}) {
(*lightSample).sourceType = 2u;
(*lightSample).sourceIndex = u32(qh.sourceIndex);
let light = analyticLights[qh.sourceIndex];
jg(light, fI, rnd.xy, lightSample);
(*lightSample).selectionPmf = light.selectionPmf;
(*lightSample).pdf *= light.selectionPmf;
}
else if (HAS_SCENE_EMISSIVE_LIGHT && qh.sourceType == ${oa}) {
(*lightSample).sourceType = 1u;
(*lightSample).sourceIndex = u32(qh.sourceIndex);
mH(
rb(qh.sourceIndex),
fI,
rnd.xy,
lightSample
);
}
(*lightSample).selectionPmf *= nX;
(*lightSample).pdf *= nX;
}

fn sampleLight(
fI: vec3f,
rnd: vec3f,
lightSample: ptr<function, LightSampleRec>,
tk: bool
) {
hv(
fI,
rnd,
0,
rtUniform.lightChoiceCount,
1.0,
lightSample
);
}



fn nE(
fI: vec3f,
rnd: vec3f,
mS: u32,
candidateCount: u32,
lightSample: ptr<function, LightSampleRec>
) {
hv(
fI,
nR(rnd, mS, candidateCount),
0,
rtUniform.lightChoiceCount,
1.0,
lightSample
);
}
`,up=32,Zt=up,ni=1056,Zi=1088,dt=1089,Ht=2113,ei=2145,MA=2177,dp=["AAD60AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8f7/AAAAACUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPYDAQAAAAAAAAAAAAAA","AAAAAAAAAAAAAAAAAAAB/wAAAQD///wLAwIBAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/v8ACgD1//8PCAQCAQEBAQEAAAAAAAAAAAAAAAAAAAAAAAEH+v8A","MgAz/wAHCwcFAwIBAQABAQEAAAAAAAAAAAAAAAAAAQIK+AAAlQAm/wABCAgGBAMDAQEBAAABAQAAAAAAAAAAAAABAQIN9P4AHgHE///+BQgHBgUDAwMBAgEA","AAEAAAAAAAAAAAEAAQUN9P0AHwHL/QD+AQUHBwYFBAMDAQECAQABAQAAAAAAAAABAgQK9PwAGgI9/v/9/wIEBQUFBAMDAwIBAQEAAAAAAAAAAQECAwYJ9fsA","yAL7/P79/f8CBAUEBQQDAwMCAQEBAAEAAAAAAAABAwcI+PsAsANT/P79/f4AAQIEAwQDAwICAgEBAQAAAAAAAAECBAYF+foA3gQe/Pz7+/z9/wABAgIDAgIC","AQEBAAABAAAAAQECBAYF+/oA5wU/+/v6+vv8/f7/AAABAQEBAQEAAQAAAAABAAIDBAYD/PsAhQYb+/n6+vr6+/3+/wAAAAEBAQEBAAEAAQEBAgIDBQYE/fwA","jgIl+wD/AAABAgMDBAUGBwcHCAkJCQkJCQkKCgsMDQ0KA/0A4QI9+wAAAAABAQIEBAYGBwgJCQkKCwsLCwwMDQ4ODg0KBAAANgMP/AABAAEBAgMDBQUGCAgJ","CgoLCwwNDQ4ODw8QEA8LBgEAjwPH/AAAAQECAgMEBAYHBwkJCgsLDQ0ODw8QERESEhANCAIA8QMN/gABAQEBAwMEBQUHCAgKCwwNDQ4PEBEREhMSEREOCAQA","SQQw/wAAAQIDAgMEBQYGBwkJCwwNDg8PEBESEhMTExANCgQAmAR4AAAAAQICBAQEBQYHCAkKCgsMDQ8QERETExITEhAOCQUA5QSuAQABAQICAwMFBgYHCAkK","CwwNDg4PEBEREhIREBAMCQUAPwW7AgABAQEDAwQEBQYHBwgJCgsMDA0ODxAQEBEQDw0MCQQAgwWhAwAAAgICAwQEBQYGCAgJCQoKDA0NDQ4ODg4ODgwKBwQA","vAUpBAABAQIDAwQFBQUGBgcICQkLCwsMDQwNDQ0NCwoIBwQAAgbvBAABAQICAwMEBAUGBwcHCAkICQoKCgsKCwoJCQgHBAIALgYxBQAAAQICAgMEBQUFBQYH","BwcICAgJCQkJCAgIBwcFBAIAUQY9BQABAQEDAwQDBAUFBgYGBwcHBwgHBwcICAcHBgUFAwIAcgY+BQAAAgICAwMEBAQFBQUFBgYHBwYHBwcGBgYFBQQDAwEA","hQYlBQABAQICAwMEBAQFBQUGBQYFBgYGBgUGBQUEBAMCAQEAjAbjBAABAQECAgMDBAUEBAUFBQUFBQUFBQUEBAQEAwMDAgEAqI78BQDx49bJvbGmm5GIf3Zt","ZV1WTkdAOTMtJyEcFxIN/gMAAAAAACQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPcDAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/wAA","AQD///wLAwIBAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAEL/wAADAD4//8OCAQCAQEBAQAAAAAAAAAAAAAAAAAAAAAAAQES/f8ANQAt/wAICgYEAwIBAQEBAQEA","AAAAAAAAAAAAAAABAAIR+v8AmAAl//8BCQkHBAMCAQEBAAABAAAAAAAAAAAAAAAAAQQP+P8ALQEAAAD+BAcHBgUEAwIBAQEAAQEAAAAAAAAAAAEBAgYL9v0A","LQEk/gD9AQUGBgYFBAMDAgEBAQABAAAAAAAAAQABAwYH9f0AKgI8/v/+/wIEBQUEBAQDAwICAQEAAQAAAAAAAAECBAcG9fwA5gIc/f78/v8CBAQFBAQDAgIB","AQEBAAEAAAAAAAECBAgF9/wA1APj/P39/P4AAQIDAwMDAwICAQEBAQAAAAABAQECBAcD+PsAAwU7/P37+/z9/wABAgICAgICAgEAAAAAAAAAAAIDBAYD+vsA","CwbD+/r7+vv8/P7/AAAAAQEBAAABAAAAAAAAAQEDBQYC+vsAdgaD+/r5+vr6/P3+/gABAAEBAgIBAQEBAQICAwMEBgYC/fsApQJe+wAAAAABAgIDBQUGBwcH","CAgICQkJCQkKCgwMDQwIAP4A+QKG+wAAAAABAQIDBAUGBwgJCAkKCgoLCwwMDQ0ODg0JA/8ATwNI/AAAAAEBAgMDBAUGBwgICgoKCwwMDQ0ODg8QDw4KBQAA","pQPp/AABAQEBAgMEBAUGBwgJCQsMDA0ODg8PEREREQ4LBgIA+wPw/QAAAQECAgMEBQYGBwgJCwsMDQ4OEBARERISERAMCAMAZgQD/wABAQICAwMEBQYHCAgK","CgsMDQ4QEBESEhISEQ8NCAMAsQRUAAAAAQECAwQEBQUHBwkJCwwNDg4PEBEREhIREQ8MCAQA+QRVAQABAQIDAwMEBQYHCAkKCgsMDQ4PEBARERIREA4MCQUA","UwVmAgAAAgICAwQFBQYGCAgJCgsMDQ4ODg8QEA8QDg0KBwQAkwUXAwABAQIDAwQFBgYHBwgJCgoLCwwNDg8ODw8ODQwKBwQA1wUOBAABAQICAwQEBQYGBwgI","CAoKCwsLDAwNDAwLCwkIBgIAAAZWBAAAAgIDBAQEBQUGBwcICQgJCgoLCwsLCwoKCQkHBQMAQQatBAABAQIDAwMEBAYGBgYHBwgICAkJCQkJCQkICAYFBAIA","YAbjBAABAQICAwQEBQUFBQcGBwcICAgICAgICAcHBgYEAwIAeAb5BAAAAQICAgMEBAQFBgUGBgcGBwcHBwYGBgYFBQQEAgEAkQatBAABAgEDAwMEBAUFBQYG","BgYGBgYGBgYGBQUFBAMDAwIAkgabBAABAQICAwQEBAQFBQUFBQUGBQUFBQUFBQQEAwMCAQAAzowhBwDx49bJvbGmnJKIf3ZuZl5WT0hBOjQtJyIcFxKxAAMA","AAAAACQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+AAAAAAAAAPYDAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADzAAAAAQD///0LAwIBAQAAAAAAAAAA","AAAAAAAAAAAAAAAAAAHv/wAAEQD6//8OBwMCAQEBAQAAAAAAAAAAAAAAAAAAAAAAAQL3/v8APAAp//8HCwcEAwIBAQEBAQEAAAAAAAAAAAAAAAABAQT8/QAA","mQAj/wABCAgGBAMCAQEBAAABAAAAAAAAAAAAAAEAAQb++v8AOgELAAD+BAgHBgUEAwIBAQEAAQEAAAAAAAAAAAACAwgA+P4AOgE9/v/+AgQHBgUEAwMCAgEB","AQABAAAAAAAAAQEBBAj/9/0APwJa/v/9/gIEBQUFBAQDAgICAQEAAQAAAAABAAECBAkA9/0ABAP8/f/9/v8BAwQEBAMDAwIBAQEBAAAAAAAAAQEDBQkA9vwA","/QP9/P38/P7/AQIDAwMDAgICAQAAAAEAAAAAAQIDBQcA+PwALwWB/Pz8+/z+/gAAAgICAgEBAQEBAQAAAAAAAQIDBgYA+fsAQwY4/Pv6+vv7/f7//wAAAQEB","AQEAAAAAAAEBAQIEBQUA+vwAWQbB+/r6+/r7/P3+/wABAAEBAQEBAQECAgECAwQFBgYB+/wAwgLI+wAA/wABAQIEBAUFBwcHCAgJCQkICQoKCgsMDQsGAP0A","FQP0+wAAAAAAAgIDBAQGBgcICAkJCQoLCwsMDQ0ODQsHAf8AbANX/AAAAQECAQIDBAUGBwgICQoKCwsMDA0ODg8PDw0IAwAAwAMw/QAAAAEBAgMDBAUGBwgJ","CQoLDA0NDg8PEBEQDw0KBQAAFQTa/QABAQECAwMEBQYGBwgJCgsMDQ0ODxAREREREQ4KBgMAfwQe/wAAAQICAgMEBQUGBwgJCwsMDA4PEBAREhEREA4LBwIA","ywTj/wABAQECAwQEBQYHCAgKCgsMDg4PEBERERISEA4MCAQADAU0AQABAgICAwQEBQYHCAkJCgsMDQ4PDxAQERAQDw4KBwQAcwX2AQAAAQIDAwMFBQYHBwgJ","CgsMDA0ODg8PDxAODQwKBwMAnQXyAgABAQIDBAQFBQYGBwgJCgoLDAwMDg0ODg0NDAsJBgMA8wV9AwAAAgICAwQEBgYHCAgICQoKCgwMDA0NDAwMCwkHBgMA","Hwb8AwABAQIDAwQEBQUGBgcICAkKCgoLCgoLCwsKCQgHBQMASwZTBAABAQICAwQFBAYGBwcICAgICQkJCgoJCQgICAYFAwIAagZWBAAAAgIDBAQEBQUGBgcH","BwgICAgICAgICAgHBgYFBAIAhgafBAABAQIDAwMEBQUFBQYGBwYHBwcHBwcHBgYFBQQDAgEAlgZrBAABAQICAwQEBAUFBgUGBgYGBgYGBgYFBgUFBAMDAgEA","mAYhBAAAAgIDAwMEBAQFBQYFBQYGBgYGBgUGBQUEBAQCAgEAoYrZBwDy49bJvbKnnZOJgHdvZ19XUElCOzUuKCIdFxLpAgMAAAAAACMAAAAAAAAAAAAAAAAA","AAAAAAAAAAAAAAAAAAAAAAAAAAAAAPcDAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+AAAAAQAAAPwLAwIBAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAL6/wAA","GAD7//8NBwMCAQEBAQAAAAAAAAAAAAAAAAAAAAAAAQX1/wAAPgAl/wAICgcEAgIBAQEBAQAAAAAAAAAAAAAAAAABAgfy/gAAnwDQ/wABCQgGBQMCAQEBAAEB","AAAAAAAAAAAAAAEBAgrz+/4AQgFf///+BAcHBQQEAwIBAQEAAQEAAAAAAAAAAQECBAv1+/8AUQHb/gD9AQUGBgYEAwMCAgEBAAABAAAAAAAAAAECBQv3+f4A","XwJy/v/9/wEEBQUEBAMDAgEBAQAAAAAAAAABAQECBgr6+P0AKwMe/v79/QABAwMEBAMDAgICAQEAAQAAAAAAAQIEBgf7+P0AKQQb/f79/P3/AQIDAgMCAgIB","AQEBAAAAAAABAQIEBgf8+PwAZAVC/fz7+/z9/gAAAQICAgEBAQEAAAAAAAEAAQIEBgX9+PwAdwaB/Pr6+vv8/f3/AAAAAAEBAQAAAAAAAAABAQMEBgT++vwA","PwZB/Pv7+/r7/P7+/wABAgEBAQICAgICAgIDBAUGBwX/+/wA4QL++wD/AAABAQIDBAQFBgcICAcICAkJCQoKCwsMDAoE/v4ANgNu/AAAAAAAAQIDBAUGBgcH","CAkJCgoKCwsMDQ4ODAoFAP4AjAO9/AABAAEBAgIDBAUFBgcICQkKCgsMDQ0ODg4ODgsGAgAA4QM3/QAAAQECAgIDBAQGBwgICQoLDAwNDQ8PEBAQDgsIBAAA","NQQW/gAAAQEBAgMEBAYGBwgJCQsLDA0ODw8QEBAQDw0JBAIAoQT1/gABAAICAwMEBQUGBwgJCgsMDQ4ODxAQEREQDwwKBgIA4wTV/wAAAgEDAgQEBAYHBwgJ","CwsMDQ0PDxAQEBEQDw0JBgMANwXfAAABAQICBAQEBgYGCAgJCgsMDA4ODw8QEA8PDgwKBwMAgAWdAQABAQIDAwQFBQYHCAkKCgsMDQ0ODw8PDw8ODQwJBgMA","yQWIAgAAAQICAwMFBQYHBwgJCQoKCwwMDQ4ODg0NCwoIBgMA/QUQAwABAgIDBAUEBgYHBwgICQoLCwsMDAwMDAwLCgkHBQMANAaCAwABAQIDAwQFBQYGBwcI","CQkJCgsKCwsLCwoKCQcHBQIAXgbwAwAAAgIDAwMEBQUGBwcICAgJCQkKCQkJCQkICAcFAwIAdQYABAABAQMCBAQFBQYGBgcHBwgICAgICAgIBwcHBgUEAwIA","lAYTBAABAgIDAwQEBQUGBgYGBwcHBwgICAcHBwcFBQQEAwEAowYFBAABAQIDAwQEBAUFBgYGBgYHBwYGBgcGBgUFBAQCAgEAogblAwAAAQICAwQEBQQFBQYG","BgYGBgYGBQUFBAQEBAMDAQEAEIgoCADy5NbKvrKonZSKgXhwaGBYUUpDPTYwKiQeGBP4BQMAAAAAACMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA","AAAAAPYDAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAL/AAAAAQAAAP0KAwIBAQAAAAAAAAAAAAAAAAAAAAAAAAAAAQj+/wAAHwD8//8OBwMCAQEBAQAAAAAA","AAAAAAAAAAAAAAABAQ37/wAAQAAh/wAHCgcEAgIBAAEBAQAAAAAAAAAAAAAAAAEAAxH5/wAApADn/wABCAgGBQMCAgEBAAEBAAAAAAAAAAAAAQACBA71/P8A","UgH9///+BAcHBQQDAgIBAQEAAQAAAAAAAAAAAAECBgz0/P8AaAFL/gD+AQQFBgUFBAMCAgEBAAEAAAAAAAABAQIDBwn1+/4AewIE///9/wIEBAUEBAMCAgEB","AQABAAAAAAAAAQIEBwf3+v4AUgM6/v79/f8BAwMEAwMDAgIBAQEAAQAAAAEBAQIFCAX3+f0AXgSl/f38/f3/AQICAgICAgICAQEBAAAAAAAAAQMEBwT5+f0A","oAV3/fz7+/z9/v8AAQECAQEBAQAAAAAAAAABAgMFBgP7+f0AvAbm/Pv6+vr8/P7+/wAAAAAAAAAAAAAAAAEBAgMFBgL7+fwAMwam/Pv7+vv7/f3/AAABAgIC","AgICAgICAwMEBQYHBgT++/0ABQO//AAAAAABAQIDBAUFBgYHBwgICAkJCQoLCwwMCwcB/f0AWwOq/AAAAAEAAQIDAwQFBgcHCAgJCgoLCwsMDQ0NDAgE//8A","sAMX/QAAAAABAgICBAUGBgcICQkKCgsLDQ0NDg4ODQoEAf8AAwRb/QABAQECAgMEBAUFBgcICQoKCwwNDQ4PDw8PDQoHAgAAbQRZ/gAAAQEBAgIDBAUGBwgI","CQoLDAwNDg8PDxAPDQoHBAEAuQTu/gAAAQICAgQEBQUGBwcJCQsMDA4ODw8QEBAPDQsIBAEABQXG/wABAQECAwMEBAYHBwkJCgsLDQ0PDxAQEA8ODgwIBQIA","YgWOAAABAQIDAwQEBgUGCAgJCgsMDA0NDg8PEA8PDQsIBgMAowV5AQAAAQICAwQFBQYHBwgJCgoLDA0ODg4ODg4NCwoIBQMA3AUQAgABAgIDBAQFBQcHCAgJ","CgoLDAwMDQ0ODQ0MCwkIBQIAHAavAgABAQIDAwQEBgYGBwgJCQoKCwsMDAwMDAsKCggGBQMAUwYEAwABAgIDBAQFBQYHBwgICQkKCgsLCwsKCgoKCAgGBAIA","bgZZAwAAAQMDAwQFBQYGBwgICAkJCQkJCQkKCQkICAYFBAIAkAaWAwABAgIDBAQFBgUGBgYHCAgICAgICAkICAcGBgUFAwIApQaxAwABAQICAwQEBAUGBwcH","BgcHCAgICAcHBgYGBQQDAgEAqQaLAwABAgIDAwQEBQYGBgYGBwcHBgcHBgYGBgYFBAQDAgEAoAaAAwAAAQIDBAQFBQUFBQYGBgYGBwYFBgYFBQQEBAMCAgEA","DoU7CADy5NfKvrOonpSLgnlxaWFaUktFPjcxKyUfGb4BBgMAAAAAACIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAAAAAAAAPcDAQAAAAAAAAAAAAAA","AAAAAAAAAAAAAAAAAPj/AAAAAQAAAP0KAwIBAQAAAAAAAAAAAAAAAAAAAAAAAAAAAfL//wAAJQD9//8NBwMCAQEBAQAAAAAAAAAAAAAAAAAAAAABA/P+AAAA","QwAd/wAHCgcEAgIBAAEBAQAAAAAAAAAAAAAAAAEBBvn8/wAAsgDx/wABCAcGBAMCAgEAAAEBAAAAAAAAAAAAAQEDB/z5/f8AXQEIAP//BAcGBgQDAgICAQAA","AQAAAAAAAAABAQEDCv73/v8AiAHS/gD9AQQGBQUEAwICAQEBAAEAAAAAAAEAAQMFCv/3+/8ApQIO///9/gIDBQQEBAMCAgIBAQABAAAAAAABAQIFCf/2/P4A","hgNo/v79/f8BAgQEAwMCAgEBAQEAAAAAAAABAgQGCP/3+v4AngTG/f39/f3/AQECAgIDAgIBAAAAAAAAAAEBAgMGBwD4+v4A5QUW/vz7+/z9/v8AAQEBAQEB","AQAAAAAAAQABAgQGBv/5+v0A/wZD/fr6+vr7/P3+/wD/AAAAAAAAAAAAAAECAwQFBAD6+v0AKAZO/fz7+/z8/f7/AAABAgICAgMDAwMDAwQEBQcIBgH8+v0A","MAMp/QAA//8BAQIDAwUGBQYHBwcICAgJCgoLDAwLCgX//f4AhQMl/QAAAQEAAQICBAQFBgcHCAkICgoKCwwMDQ0NCgYB/v4A2ANa/QAAAAABAQIDAwQFBgYI","CQkKCgsMDAwODg4NCwcDAP8ARgT0/QAAAAEBAgIDBAUFBwcHCAkKCwwNDQ4ODg4NCwgEAf8AkQRk/gABAQECAgMDBAUGBggJCQoLDAwNDg8PDw8ODAkGAgEA","4ATk/gAAAQICAwMEBQUGBwgICgsLDA0ODw8PDw8NDAkGBAEAPwXe/wABAQECAgMEBAYGBwgJCQoMDA0NDg4PDw4ODAoHBAEAhQVZAAAAAQIDAwQEBgUHBwgJ","CgsLDA0ODg8PDw4NCwkHBAMAwwUzAQABAgICBAQFBQYHCAgJCgoLDA0NDQ0NDQ0MCwkHBQIABwa1AQABAQIDAwQFBQcHBwgJCgoLCwsMDQ0NDAwLCgkHBAIA","QwZLAgAAAgIDBAQFBgYGCAgJCQoKCwsLCwwLDAoKCQcGBAIAZgaaAgABAQMDAwUFBQYHBwgICQkKCgsLCwoLCgoICAcFBAIAjQbsAgABAgIDBAQFBgYHBwcI","CAkJCQkJCQkJCAgIBgYFBAIApgb2AgABAQIDBAQEBQYGBwgHCAgICAkJCQkICAgHBwUEAwEAsQY6AwABAgMDAwQFBQUGBgYHBwcICAcHBwcHBwYGBAQDAgEA","sQYCAwAAAQIDBAQFBQYGBgcHBwcHBwcHBwcGBgUFBQQDAgIAtAYlAwABAgICAwQEBQUFBgYGBgYGBgYGBgUFBQUEAwMDAgAAZ4HXBwDy5NfLv7Spn5WMg3py","amNbVE1GPzkzLCYgG/MFBwUAAAAAACEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPgDAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf4AAAAA","AgAAAPwKAwIBAQAAAAAAAAAAAAAAAAAAAAAAAAABBv3//wAAKQD+/wANBwMCAQEBAQAAAAAAAAAAAAAAAAAAAAEBCvn/AP8ASgDO/wAHCQYEAgIBAAEBAAAA","AAAAAAAAAAAAAQEDDvb9/wAAvQBB/wABCAgFBAMCAgEAAQEAAAAAAAAAAAABAAEEDvT8/wAAcgELAP/+BAcHBQQDAgICAQABAQAAAAAAAAEAAgMGDfX7/v8A","pwEA/wD+AQQFBgQEAwIBAQEBAAEAAAAAAAABAQMHCvb5/f8AzgIe///9/wEEBAUEBAMDAgEAAQAAAAAAAQABAgQICPj4/P8AwwP6/v79/f8BAgMDAwICAgIB","AAABAAAAAAEBAwUHBvr4/P4A5wRc/v38/P3+AQECAQICAQEBAQEAAAAAAAECAwQHBPr4+/4ANwZD/vz7+/z9/f8AAQEAAQEBAAAAAAAAAQECAwUGA/z4+v4A","Zgfa/fr6+fr7/P39//8AAAAAAAAAAAABAAECAwUGA/35+/0AGAax/fz8/Pz8/v4A/wEBAgICAwICAwMDBAUGBwgHBP77+/4AYgOn/QAAAAABAQICBAQFBQYH","BwgJCAkKCgoLDAwLCAL+/P4AwgOw/QAAAAAAAQIDAwUFBgYHCAgICgoKCwwMDQwLCAT//v4AIATf/QAAAAABAQICBAQFBgcHCAkKCgsMDA0ODQ0LCAUB//8A","bAQf/gAAAQEBAgIDBAQGBgcICAoKCwwMDg4ODg4MCgYDAP8AzgTB/gAAAAECAgIEBAUFBgcICQkLDAwNDQ4ODg0MCQYEAQAAGwUg/wABAQICAgMDBAUGBwgJ","CgsLCw0NDg4ODg4MCggEAwEAdAXI/wAAAgECAwQEBQYHBwgICQoLDAwODg4ODg0MCwgGAwEAtAVeAAABAQICAwQFBQYGCAgJCgoLDA0NDQ4ODQwMCQgFAwEA","+gXqAAABAQIDAwQEBQYHBwgJCQsLDAwMDQ0NDQwKCgcGBAIANAZhAQAAAgIDBAQFBgYHCAgJCgoLCwsMDAwMDAsKCQgGAwEAXwbcAQABAQMDBAQFBQYHBwgJ","CQkKCgsLCwsLCgoKCAcFBAIAjQYsAgABAgIDAwQFBgYGBwgICQoJCgoKCgoKCgkIBwYFAwIAqwZVAgABAQIDBAUFBQYHBwgICAgJCQkJCgkICAgHBwUEAwIA","uwaUAgABAgMDBAQFBgYGBwcICAgJCQkJCAgICAcGBQUEAwEAvgaYAgABAgIDAwQFBQYHBwcHBwgHBwcHBwcHBgYGBQQDAgEAyAazAgAAAQIDBAUFBQYFBgYG","BwcHBwcHBwcGBgUFBAQDAgEAtQaPAgABAgMDBAQEBQUGBgYHBgYGBwYGBgUGBQUEBAMDAgEADH32BgDy5NfLv7SqoJaNhHxzbGRdVU9IQTs0LigiyQMJCAUA","AAAAACEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAAAAAAAAAPcDAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+wAAAAAAAgAAAP0KAwEBAQAAAAAAAAAA","AAAAAAAAAAAAAAAC9P4AAAAALwD+//8NBwQCAQEBAQAAAAAAAAAAAAAAAAAAAQEE9P3/AAAAYADp/wAGCQYDAgIBAAEBAAAAAAAAAAAAAAABAAIG9vv+//8A","vQAn/wECCAgGBAICAgEAAQEAAAAAAAAAAAEAAgMK+/r+/wAAiQFsAP/+BAYGBQQDAgEBAQABAAAAAAAAAAABAQQL/ff8/wAA3AGr/gD+AQQGBQUDAwMCAQEA","AQAAAAAAAQEBAwYK/vf8/v8ABQPZ///9/gEDBAQEAwICAQEBAAEAAAAAAAACAwYK//b5/f8ADAQL//78/f8BAgMDAwMCAgEBAQAAAAABAQICBAcH/vf6/f8A","QAWI/v38/P3+AAECAQECAQEAAAAAAAAAAAEDBAYHAPn5/P4AmAbY/vv7+/z9/v7/AQEAAQEBAAAAAAAAAQICBQYF/vj5+/4AxAcd/vv6+fr6/P3+/v8A//8A","AAAAAAABAQIEBAUEAPv5/P4AIgZY/vz8/Pz9/f//AAEBAgMCAwMEBAQEBQUGCAgGAfz7+/4ArANF/gAAAAAAAQEDBAQFBgYHBwgICAkKCgsMDAsJBP/8/f4A","AgRC/gAAAAABAQICAwQFBgYHCAgJCgsKDAwMDAwJBgH+/f8AXQRn/gAAAQEBAgIDAwQFBgcICAkJCgsMDA0NDQwKBgMA//4AwASc/gABAAABAQIDBAUFBgcH","CQkKCwsNDQ0ODQwJBwMB//8ACAXu/gAAAQECAwMDBAUGBgcJCQoLCwwMDQ4ODQwLBwUCAQAAZAVZ/wAAAQICAgMEBAUGBwgICQoLDA0NDg4NDQsKCAYDAQAA","swXx/wABAQECAwQEBQUGBwgICQoLDAwNDQ0NDQwKCQYEAQEA9AU5AAABAQICAwMEBQYHBwgJCgsLCwwNDQ0NDAsKCAYEAwEAKwarAAAAAgIDAwQFBgYGCAgJ","CQoLCwwMDAwMCwsJCAYFAwEAcQY6AQABAQMDBAQFBQYHBwgJCgoKCwsLCwsLCwkJBwYEAwEAkAZaAQABAgIDAwUFBgYHBwgICQkKCgoKCwsKCQoIBwYFAwIA","tQa7AQABAQIDBAQFBQcHCAgJCAkJCgoKCgkJCQgIBwYEAgEAygYAAgAAAgMDBAUFBgYGBwcHCQkJCQkJCAkICAcGBgQEAwEAzwYKAgABAgIDBAQFBgYHBwgI","BwgICAgICAgIBwYGBQUDAgIA2QYLAgABAQMDBAQFBQYGBwcHCAcICAgICAcHBgYFBQQDAwEAywYXAgABAgIDAwUFBQYGBgYHBwcHBwcHBgYGBgYFBAMDAgEA","tgYdAgABAgIEBAQEBQUGBgYGBgcGBgYGBgUFBQQEAwMCAQEAzHeVBQDy5NjLwLWroZeOhX11bWVeV1BJQz02MCok/wwNCgUAAAAAACAAAAAAAAAAAAAAAAAA","AAAAAAAAAAAAAAACAAAAAAAAAAAAAPgDAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/wAAAAAAAgAAAP0KAwEBAQAAAAAAAAAAAAAAAAAAAAAAAAEW/gAAAAAA","NgD///8MBgQCAQEBAQAAAAAAAAAAAAAAAAAAAQMT+/7//wAAdwDz/wAHCgYDAgIBAAEBAAAAAAAAAAAAAAABAQQN+P7/AP8AygAb/wEBBwcGBAICAgEAAQEA","AAAAAAAAAQEBAwcK+P3/AAEAqQHVAP/+BAcGBQQCAgEBAQABAAAAAAAAAAECBAkH9fr9/v8ADQIM/wD+AQQFBQQEAgICAQEAAQAAAAABAAECBAkF9vr9//8A","TgOz///9/gEDBAQDAwMCAQEBAAAAAAAAAQIDBgkE9/j8/gAAagRD//79/f4BAQMDAwIBAQEAAAAAAAAAAQEEBggD+Pj7/f8AtQXv/v38/P3+AAABAQECAQAB","AAEAAAEBAQMDBgcC+vj7/v8AFwcf//v7+/v8/v8AAAAAAQAAAP8AAAABAgIEBQYB+/j6/P4ANAja/vr5+fr7+/z9/v///wD/AAAAAAABAgMFBQQB+/n6/P4A","IwaY/v39/f39/v8AAQECAgMEBAQEBQUFBgcICQgD/vv7/f8ACQTo/gAAAAAAAQICAwUFBgYGBwgICQoKCwwMCwkGAf78/f4AWwTS/gAAAAABAQIDBAQFBgcI","CAgKCQoLDAwMDAoGAv79/f8AswTp/gAAAAEBAgIDAwQFBgYHCAoJCwwMDA0MCwkHAwH+/v8AFgUe/wAAAQEBAQIDBAUFBgcICQkLCwsNDQ0NDAoHBQEA//8A","aAVS/wABAAECAgMDBAQGBggICQoKCwwMDQ0NDAoIBQMB//8AsgWs/wAAAQECAwMEBAYGBwcJCQoLDAwNDAwMCwoIBgMBAQAAAAbu/wABAQICAwMEBQUGBwgI","CQoLCwwMDQ0MCwoIBgUDAQAAQgZJAAAAAgICAwQEBQYHBwgJCgoKCwwMDAsLCwoIBgQDAQAAdgadAAABAQIDAwQFBQYGCAgICQoLCwsLCwwLCgkIBwUDAgEA","pwbFAAABAgIDBAQFBgYHBwgJCQkKCwsLCwoKCQgIBgUDAgEAyQYlAQABAQIDAwUFBgYHCAgICQoJCQoKCgoJCQgHBgQEAgEA4wZMAQAAAgMDBAQFBQcHBwgJ","CQkKCgkJCQgICAcGBQUDAgEA8AZ7AQABAQIDBAUFBgYGBwcICAgICAgJCAgIBwcGBQQDAwEA5gZ5AQABAgMEBAQFBgYHBwgHBwgICAgHCAgHBgYFBQQDAgEA","6QaeAQABAgIDBAUFBQYGBgYHCAcHBwgIBgYGBgUFBAMDAQEA0gaLAQABAgMDBAQFBgYGBwcHBwcHBwYGBwYGBQUEBAMCAgEAtAaUAQABAQIDBAQFBQUGBgYG","BgYHBwYGBQYFBQQEAwMCAgEAX3G1AwDy5djMwLaroZiPhn52bmdfWFJLRT44Miz9EBMQCwYAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA","AAAAAPgDAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAT/AAAAAAAAAwAAAP0JAgEBAAAAAAAAAAAAAAAAAAAAAAAAAQ39//8AAAAAPAD///8NBwQCAgEBAQAAAAAA","AAAAAAAAAAABAhL5/gAAAAAAjgD5/wAGCQYDAgEBAAEAAAAAAAAAAAAAAAEBBBD3/f7/AP8A4AAU/wECCAcGBAMBAQEBAQAAAAAAAAABAQEDBw72/P8AAAEA","0wHpAAD+BAYGBAQDAgEBAAEAAAAAAAAAAQIDCAr2+fz+/v8AUwIQ///+AAQFBQQEAwIBAQABAAAAAAEAAQIFCQj3+f3+AAAAqgPx///9/wECBAQDAwICAQEA","AAAAAAABAgMFCQX4+Pr9/v8A5gTF//79/f4BAQICAgIBAQEBAQAAAAABAQMGCAT69/r9/gAAQwZQ//37+/3+AAABAQEBAQAAAAAAAAEBAwQGBgP7+Pr8/v8A","uQdI//v7+/v8/f7//wAAAAAAAAAAAQECAgQFBgL7+fn7/v8Awwhd//r5+fr6+/39/v7//wD//wAAAAECAwUGBQL9+fr7/f8AOgY1//3+/f3+//8AAQIDAwME","BQUFBgYHCAgJCAT/+/r8/f4AcwR+/wD/AAAAAQIDBAQFBgYHBwgJCQoLDAwLCQYB/vz8/f8AwgQr/wABAAABAQIDAwUFBgcICAkKCwsLDAwLCgcD//79/v8A","MgWC/wAAAAEBAQICBAQFBgcHCQkKCwwMDAwMCgcEAf7+/v8AfAWN/wAAAQEBAgIEBAUGBgcJCQoLCwwNDA0LCQcEAgD+/v8AzwXc/wAAAQECAwMDBAUFBwgI","CQoKCwsMDQsLCgcGAwEA//8AIgbc/wABAQECAgMEBQUHBwgICQoLDAwMDAwLCQgFAwEAAP8AZQYqAAAAAQICAwQEBAYGBwcJCgoLCwwLCwsKCQgGBAMBAAAA","nAY5AAABAQIDAwMFBgUGBwgJCQoKCwsMCwsKCQcGBQMCAQAAygaUAAABAgIDBAUEBQcHCAgICQkKCgoKCgkJCAcGBAMCAQAA7QakAAABAQICAwQFBgYHBwgJ","CQoJCgoKCgoJCAcGBQMCAQEABwfJAAAAAgMEBAQFBQYHCAgICQkKCQkJCQgICAcGBAQCAQEAHQfjAAABAQIDBAUGBgYHBwgICAgICQkICAgHBgYFBQMDAgAA","BgcQAQABAgMDBAQFBgcGBwcICAgICAgICAcHBwUFBAMCAQEADQcJAQABAgIDBAUFBQYHBwcHBwgIBwcHBwcGBQYEBAMDAgEA9QYTAQABAgMEBAQFBgYGBgcH","BwcHBwcHBgYGBgQEAwMCAQEAzgYPAQABAgIDBAUFBQUGBgYGBwYHBwYGBgUFBAUEBAMCAgAApwYOAQABAQMDAwQFBQYGBgcHBgcGBgYGBQUFBQQEAwMCAQEA","d2mAAQDy5djMwbaropiPh352b2dgWVNMRkA5MwMVGBYSDQcAAAAAAB8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAPgDAQAAAAAAAAAAAAAA","AAAAAAAAAAAACv8AAAAAAAAABAAAAP4JAgEBAAAAAAAAAAAAAAAAAAAAAAABFf3/AAAAAAAAQwD///8NBwQCAgEBAAAAAAAAAAAAAAAAAQEDEvr+/wAAAAAA","rQD8/wEGCQUDAgEAAQEAAAAAAAAAAAAAAAIFD/j9//8AAAAACQHI/wABBwgFAwMCAQABAQAAAAAAAAEBAgMIC/b8/f//AP8ADAI5AAD/BAYGBQMDAgIBAAEA","AAAAAAABAgQJCPb5/f7//wAAswKr/wD+AQMFBQQDAgEBAQAAAAAAAQECAgUKBvf5/P7/AAAAJwQSAP79/gECAwQDAwIBAQABAAAAAAABBAYJBPn4+v3+/wAA","iwW4//78/f4AAQECAQIBAAEAAAAAAAICAwYIBPn3+vz+//8ABQea//z8+/3+/wAAAQABAQAAAAABAQEDBAYGAvv4+vv9/gAAdwje//v6+vr8/f7//wD//wAA","AAAAAQIDBQYGAfz5+fv9/v8AgQmG//r5+vr6+/z9/v7/AP//AAABAgIDBQYEAfz5+fv8/v8AVwbL//7+/f7+/wABAgMDAwQFBQYGBwgJCQkIBP/8+/v9/v8A","+ATf/wAAAAABAQICAwQGBgcICQkKCgsMDAsJBgL+/Pz9/v8AYwXH/wAAAAABAgIDBAUFBwcICAoKCwwMDAsJBgL//f39/v8AvAXn/wAAAQEBAQIDBAQGBggI","CQoLDAwMDAsKBwQB//79/v8AEAbt/wABAAEBAgMEBAUGBwgICgoLCwwMCwsJBgQBAP7///8AXgYQAAAAAQECAwMEBQYGBwcJCQoLDAsMCwoIBwQDAAD+/v8A","lwYTAAABAgICAwQEBQUGBwkJCgsLCwwLCwoJBwYDAgAAAAAA4wZNAAAAAQIDAwMEBQYHCAgJCQkKCgoKCgkIBwUEAgEA//8AEgdJAAABAQIDAwQFBQYHBwgI","CgoKCwsLCgkIBwUEAgEAAAAAKQd2AAABAgICBAUFBgcHCAgJCQkKCQkJCQkIBgUEAwIBAAAARwd9AAABAQMEAwQFBQYGBwgICAkJCQkJCAcHBgYEAwIBAQAA","TAeEAAAAAgIDBAUFBgYHBwcICQkICQkICAgGBgUEBAICAQAARAefAAABAgIDBAQFBgYHBwgIBwgICAgHBwYGBgQEAwIBAAEAOAekAAABAQMDBAUFBgcGBwcH","CAcIBwcHBwYGBQUEAwMCAQAAGAekAAABAgMEBAUFBQYHBwcHBwcHBwYHBgYFBQQDAgIBAQEA8QajAAABAgIDBAQGBgUGBgYHBwcGBwcGBgUFBAQDAwICAQAA","wAafAAABAgMDBAQEBQYGBgYGBgYHBgUFBQUFBAMEAwICAQAAhwadAAABAgIDBAUFBQUFBgYGBgYFBQYFBQUEBAQCAgIBAQEApV93/wDy5NjMwLWroZiPhn52","bmdgWVJMRT/aEh0fHRkUDwgAAAAAAB8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPgDAQAAAAAAAAAAAAAAAAAAAAAAAAH7AAAAAAAAAAAA","BwAAAP4JAgEBAAAAAAAAAAAAAAAAAAAAAQL2/v8AAAAAAAAATQD//wAMBwQCAgEBAAAAAAAAAAAAAAABAQf2/P//AAAAAAAAzwD+/wAHCQUDAgEAAQEAAAAA","AAAAAAEBAwn4+v3///8A/wAAUQHv/wEBBwcFAwMCAQABAAAAAAAAAQECBQ38+f3+/wD/AAAAXAITAAD/BAYGBQMCAQEAAQAAAAABAAEDBgz+9/r9/v8AAAAA","RgPp///+AAQEBAMDAgIBAAAAAAAAAQIEBwv/9/r9/v//AP8A6AQCAP/9/gACAwMDAgEBAQEAAAAAAgMECAj/9/n7/f7//wAAdgb1//38/f4AAAIBAgEBAAAA","AAEBAQIFBwf/+Pj6/P7//wAAEAjq//z7+/z9//8AAAAAAAAAAAABAgQFBwYA+vj6/P3+/wAAZgn+//v6+vr7/P7+////AP8AAAECAwQGBgT/+vn5+/z+//8A","fwrz//n5+fr6+/v9/f///wAAAQECAwQFBQP/+/n6+/3+/wAAaAb3///+/v4AAAECAwMEBQYGBwgICQoKCggD//z7/Pz9//8AxgUBAAAAAAAAAgMDBAUGBwcJ","CQoLDAwMCggEAP78/P3+/v8AIAYGAAABAQEBAQIDBAUGBwkJCgsMDAwMCwgFAv7+/f7+/wAAfQYRAAAAAAECAgMEBQYHBwgJCgsLDAwLCggGAgH+/v3+//8A","0gYcAAAAAQECAwMEBQUGCAgKCwsMDAwLCggFBAEA/v///wAACgcnAAABAQICAwQEBQYHBwkJCgoLCwsLCQgGAwIAAP////8ATwczAAABAQIDAwMFBQcHCAkJ","CgsLCwsKCQcGBQIBAP///wAAcQc/AAAAAgICAwUFBgYICAgKCQoKCgoJCAcGBAMCAQD/AAAAlwdHAAABAQIDBAQFBgcHCAgICgkKCQkJCAcGBQMCAQAA//8A","qQdSAAABAgMDBAQFBgYHCAkJCAkJCQgICAcFBAQDAQEBAAAAlAdXAAABAgIEBAUFBgcHBwgICQkICAgHBgYGBAMCAgEAAAAAjwdcAAABAQMDBAUGBgYHBwcI","CAgICAgHBwYFBQQDAQEBAQAAcAdeAAABAgMEBAUFBQcHCAcHBwcHBwYHBgUEBAMCAgEAAAAASQdgAAABAgIDBAUFBgYGBgcHBwcHBwcFBQUFAwMDAgIBAAAA","EQddAAABAgMDBQQGBgYGBwcHBwcGBgYGBQUEBAMCAgEBAQAA1AZbAAABAgMEBAUFBQUGBgYGBgYGBgUFBQQEAwMDAgEBAAEAjwZXAAABAgIDAwQFBQYGBgYG","BgYGBQUFBAQDBAMCAgIBAQAARQZSAAABAgMDBAUEBQUFBQYGBQUFBQUEBQQEAwICAgEBAAAAW1PY/gDx49bKvrKonpSLgnlxamJbVE1HxxMgIyIfGhYRDAYA","AAAAAB8AAAAAAAAAAAAAAAAAAAAAAAAA/wAAAAAAAAAAAAAAAQAAAPgDAQAAAAAAAAAAAAAAAAAAAAAB+f8AAAAAAAAAAAAADAAAAP4JAgEBAAAAAAAAAAAA","AAAAAAEC9f7//wAAAAAAAAAAdQAAAAAMBwQBAQEAAAAAAAAAAAAAAQEG+vv/AAD/AAAAAAAA8wD//wEHCQUEAgEBAQAAAAAAAAABAQMJ/vn8/v8AAAD/AAAA","sQH5/wABBwcFBAICAQEAAAAAAAEBAgULAff8/v////8A/wAA/QIJAAH/AwYFBAMCAQEBAAAAAAABAwYMAff6/P7/AAAAAQAAMQT3///9AQMEBAMCAQAAAAAA","AQECBAcLAvj5/P3+//8A/wAAEAYCAP/9/QACAgICAgEBAQAAAAECBAcJAfj4+/z+/gD/AAAA1Qf9//z8/P3/AAEAAAEAAAAAAQIDBQgHAPn5+fz9//8AAAAA","gAn7//z7+/v8/v8AAP8A/wABAQIEBQYGAfv4+vv9/f7/AAAA7QoCAPr5+fr7/P3+/v//AAAAAQIDBQYEAPv5+fv8/v////8AhAsAAPn5+fn6+/z9/v//AAEC","AwQFBgYEAPz6+vv8/f7/AAAAmwYCAAAAAAABAQIDBQYHBwgJCgsMDAsJBQD9/Pz9/v7//wAA3QYIAAAAAAEBAgMEBQYHCQkKCwwNDQsJBQL//f39/f//AAAA","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","wQQHAAABAwMEBQUFBQUEBAMDAwICAQEBAQAAAAAAAAAAAAAAPAQHAAABAgMEBAUEBQQFAwQDAwICAgEAAAAAAAAAAAAAAAAAvwMGAAACAwMDBAQFBAQDBAMD","AgMBAQEBAAEAAAAAAAAAAAAAUQMGAAABAgMEBAQEBAQEAwMDAgECAQEBAQAAAAAAAAAAAAAA7wIFAAABAgMDBAQEBAQEBAMCAwIBAQEAAAAAAAAAAAAAAAAA","Exg1AADn0r6rmYl6bF9TSD41LCUeGBIOCgcFAwICAQEBAAAAxSYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHSsAAAAAAAAAAAAAAAAAAAAA","AAAAAAAAAAAAAAAAAAAAAAAAe0QAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAizUAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA","TBwAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAzAwAAAD//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAArAUAAAD+AAAAAAAAAAAAAAAA","AAAAAAAAAAAAAAAAAAAAAAAAlwIAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQQEAAAAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA","owAAAAD//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWAAAAAD/AAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAA/wAAAAAAAAAAAAAA","AAAAAAAAAAAAAAAAAAAAAAAAHQAAAAAA/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEgAAAAACBQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA","CQAAAAD9AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQAAAAD6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAD8AAAAAAAAAAAAAAAA","AAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA","AgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAA","AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEB","AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA","AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA","AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABz8AAAD+////////////////","////////////////////////YEsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEkAAAD+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA","LhwAAAD8/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA3QkAAAD5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAoAMAAAD6/v8AAAAAAAAAAAAA","AAAAAAAAAAAAAAAAAAAAAAAAcQEAAAD5/v//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAoAAAAAD7/wD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA","SgAAAAD7/f8CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJAAAAAD6/v4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAD8AvwAAAAAAAAAAAAA","AAAAAAAAAAAAAAAAAAAAAAAACgAAAAAC+gkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAAAAD69gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA","AwAAAAAPGQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAADxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAADeAAAAAAAAAAAAAAAA","AAAAAAAAAAAAAAAAAAAAAAAAAQAAAADWAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAB/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA","AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA","AAAAAAAAAAAAAAAAAAAAAAAAAQAAAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA","AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA","AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA","AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA","AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAdgJr/wBCdZm0yNbg6O7y9fj5+/z9/f7+/v7/////////////","EiQAAADh6e/09vn7/P3+//7/////AP8AAAAAAAAAAAAAAAAAEw4AAAD39vn6/P3+/v///wAAAAAAAAAAAAAAAAAAAAAAAAAA0xYAAAD38fL1+Pr7/f3+/v//","//8A/wAAAAD/AAAAAAAAAAAASRgAAAD/8vHz9ff6+/z9/v7//wD/AAD/AAAAAAAAAAAAAAAA5xYAAAAA+PTz9ff4+vz8/f7+//////8AAAAA/wAAAAAAAAAA","lBQAAAD//ff19fb4+fr8/f3+/v//AAAA/wAAAAAAAAAAAAAA+REBAAD//vr49vf4+fr7/P3+/v7/////AP8AAP8AAAAAAAAAag8AAAAA/v36+fj4+fr7/P39","/v7//////wAAAAAAAAAAAAAADQ0AAAAA//78+vn5+vr7+/z9/v7+/v8AAAD/AAD/AAAAAAAA8goAAAAAAP79/Pv7+vv7/Pz9/f7+//////8A/wAA/wAAAAAA","IAkBAAABAP/+/fz7+/v7/Pz8/f7+/v//////AAAAAAAAAAAAkwcBAAABAP/+/v38/Pz8/P39/f3+//7+/wAAAP8AAP8AAAAARQYBAAABAAD//v7+/f39/f39","/v7+/v///////wD/AAAAAAAALwUCAAABAQAA//79/v39/f3+/f7+/v7///////8AAAD/AAAASQQCAAAAAQD//////v7+/v7+/v7///////8AAAAA/wAAAAAA","jAMDAAABAQEAAP///v7+/v7+/v7+/v///////wD/AAAAAAAA7wIDAAABAQEBAAD//////v7+/////////wD/AP8AAAAAAAAAcAIEAAABAQEBAAD/AP//////","////////AP8A/wAAAP8A/wAACAIFAAABAQEAAAAA////////////////////AP///wAAAAAAsQEGAAABAQEBAQAAAAD//////////////wAA/wAAAAAAAAAA","bAEGAAAAAQEBAQEBAAAAAAAA//////8A////AP8AAAD/AAAAMQEGAAABAQEBAQAAAAAAAAD/AAAAAAD/AAAAAAAAAAAAAAAAAQEHAAABAgICAQEBAQAAAP8A","////AP8AAP///wD///8AAAAA2gAHAAABAQEBAQEBAQEBAAAAAAAA/wD//wAAAP8AAAAAAP8AugAHAAABAQEBAQIBAAAAAAAAAAAAAAAAAP8AAAAAAAAAAAAA","ngAHAAAAAQICAgEBAQEAAAAAAP//AP8A/wD//wD/AAAAAAEAiAAHAAABAQEBAQEBAQEBAQEAAAAA/wD/AAAAAP8A/wAA//8AdQAGAAABAQEBAQEBAQAAAAAA","AAAAAAAAAP8AAAAAAAAAAAAAZAAHAAABAgICAgEBAQEBAQAAAAAAAP8A/wD//wAAAP//AAAAWAAFAAAAAQECAQIBAQEBAAEAAAAAAAAAAAAAAAD/AAAAAAAA","TAAGAAABAQIBAgEBAQEAAAAAAAAAAAD/AP8AAP8A/wAAAAAAZAQT/gAWJC0yNDU0MS4sKSUiHxwYFhQRDw4LCQgHBgQDAgEA7iIAAADf5+zw9Pb4+vv8/f3+","/v7///8AAP8AAAAAAAAAAAAAIAoAAAD6+Pn7+/z9/v7+////AAAAAAAAAAAAAAAAAAAAAAAA8BIAAAD78/T1+Pn6+/39/f///v///////wAAAAAAAAAAAAAA","MBUAAAAB9fLz9Pf5+vv8/f3+/////wAAAAD/AAD/AAAAAAAAtxQAAAAC+/X09PX3+Pr7/P39/v7///////8AAAAAAAAAAAAAPxMAAAD//vn29vb2+Pn7+/z9","/f7+//8AAAAA/wAA/wAAAAAAYBECAAD///z59/f3+Pn6+/z9/f7+/v//////AAAAAAAAAAAAZA///wAA//77+fj4+Pn5+/v8/f3+//7//wAAAP8AAAAAAAAA","dA0CAAAAAP/+/Pr6+vn6+vv7/P3+/v/+/////wAAAP8AAAAApgsCAAAA///+/fz7+vr7+/v8/f39/f7/////AAD/AAAAAAAAAwoCAAABAP///v38/Pz7+/z8","/P39/v7+//8A//8AAAD/AAAAkQgEAAAAAQD//v79/Pz8/Pz9/f3+/v7+/v///////wAAAAAATQcEAAABAQAAAP///v39/f38/f39/f7///7//wAAAAAAAAAA","NQYHAAABAQEA///+/v79/v3+/f7+/v7+/v//AP//AP8A/wAARgUIAAABAQEAAAAA/////v7+/v3+//7//////wAA/wAAAAAAegQLAAABAQEBAQD/AP///v/+","/v/+/v/+////////AAAAAAAAzwMNAAABAQEBAAAA//////////7///////////8A/wD/AAAAPQMQAAABAQEBAQABAAD/AP//////////////AAAAAP8AAAAA","wwISAAABAQIBAQEAAQAA/////wD//////wAA////AAAAAP8AWwIVAAAAAgECAgEBAAAAAAAAAP8A//8A/////wAA/wAAAAAABgIWAAABAQIBAQEBAQEBAAAA","AAD/AAD/AP//AP//AP8AAAAAvAEYAAABAQECAQIBAQAAAQAA//8A//8A/wAAAAAAAAD//wAAfwEZAAABAQEBAgEBAQEBAAAAAAD/AAD/AP///////wAAAAAA","SwEZAAABAgICAQEBAQEAAAAAAAAA//8A/wAAAAAAAAAAAAAAHwEZAAAAAQEBAgIBAQEBAQEAAAAAAAD/AP8A/wAAAP8AAAAA+wAZAAABAQICAQEBAQAAAAAA","AAD/AP8AAAD/AP///wD/AAAA2wAZAAABAQEBAQEBAAEBAAAAAP8A/wD///8A/wAAAAAAAAAAwAAXAAAAAQEBAgECAQEAAQAAAAAAAAAAAAD/AP8AAP8A/wAA","qQAWAAABAQICAQIBAQEBAAEAAAAAAAAA/wAA/wD//wAAAAAAlgAVAAAAAQEBAQEBAQEBAQABAAAAAP//AP//AAAAAAAAAAAAhAATAAABAQEBAgEBAQEBAQEA","AQEAAAAAAAAAAAAAAAD/AAAAwQZW/AAVJS41ODo5OTYzMC0qJyMhHRsYFRMQDgsJCAYFAwEAdiIAAADf5evu8fT3+Pn7/P3+/v/+//////8AAAAAAAAAAAAA","bQgAAAD8+fr7/P39/v////////8AAAAAAAAA/wAAAAAAAAAAKBEAAAD89PT29/j6+vv8/f7+/v////8AAAAAAAAA/wAAAAAApRMAAAAC9vPz9fb4+vv8/P39","/v7//////wD/AAAAAAAAAAAAgBMAAAAC/PX09Pb2+Pn6/Pz9/v7+////AP8AAP8AAAAAAAAAXxL//wAA//r39vX39/n6+vv9/f7+/v////8AAAAAAAAAAAAA","zxAFAAD/AP359/f3+Pj5+/v8/P39/v7//wD//wAAAP8AAAAAGA/+/wD////9+vn4+Pn5+vv7/P3+/v/+////AAD/AAAAAAAAYA0EAAAAAP/+/fv6+fn6+vv7","/Pz9/v7///////8AAAD/AAAAvQsEAAAAAAD+/fz7+/v6+vv8/P39/f3+/v4A//8A/wAAAAAAOgoFAAABAP8A//79/Pv8/Pv8/Pz9/f7+/v/+/wD/AAAAAAAA","3QgIAAABAAD///7+/f38/P38/f39/v7+////////AP8A/wAAqAcKAAABAQEAAAD///79/f39/f39/f7+/v7///8A/wAAAAAAmQYOAAAAAQEBAP////7//v39","/v7+/v7+////AAD/AAAAAAAArgUTAAABAQEBAAAA///+/v///v7+/v7//v////8A////AAAA4gQXAAABAQEBAQEAAAAAAP7+/v7+////////////AAAAAAAA","NAQcAAABAgEBAQEAAAD//wD///////7+//////8A/wAAAP8AoAMgAAABAQIBAQABAAAAAP8AAP8A/wAA/////wD/AP8AAAAAIAMmAAABAQECAQIBAQABAAAA","/wD///////8AAP8AAAD/AAAAtQIqAAABAgIBAgEBAQEAAAAAAAAAAP//AAD//wD//wAA/wAAWAIvAAABAQECAQEBAQEBAAAAAP///wAA//8AAP8AAP8AAAAA","CwIxAAAAAQIBAgEBAQAAAQEAAAAAAP//AAD//wD//wAAAAAAyAEzAAABAQECAQIBAQEBAAAAAAD//wAA//8AAP8AAAAAAAAAkAE0AAABAgEBAgEBAQEAAQAA","AAAAAP//AP///wD/AAD/AAAAXwE0AAABAQIBAQECAQEBAAAA//8AAAAA/wD/AP8A//8A/wAANgEzAAAAAQECAQIBAQAAAAAAAAD///////8A/wD/AAAAAAAA","EwEyAAABAQEBAgEBAAEBAQAAAAAAAAAAAAD///8A////AAAA9AAwAAAAAQEBAQEBAQEAAAEAAAAA////////AAD/AAAAAP8A2gAtAAABAQEBAQEBAQABAAAA","AP//AAD/AAAA//8A/wAAAAAAxAAqAAAAAAEBAQEAAQEAAQAAAAAAAAAA//8AAAD/AP///wAArwAnAAABAQECAQEBAQEBAAAAAAAAAP8AAAD/AAAAAAAAAAAA","HAlM+gAVJC81Ojs8Ozo4NTMvLCkmIh8cGRYUEA4MCQgGBAIANyIAAADe5ent8PT29/j6+/z9/f7+/v//////AAAAAAAAAAAAgwcAAAD8+vv8/Pz9/v/+////","AP//AAAAAAAAAAAAAAAAAAAAJRAAAAD99PT19/n6+/v8/f3+/v//////AAAAAP8AAAAAAAAAuRIAAAAE9/P09fb3+fr7/P39/v7//////wAAAAAAAAAAAAAA","uRL//wAC/ff09PX39/n7+/z9/f7+/v///////wAAAP8AAAAAwRH//wAA//r39vb2+Pj5+vv8/P3+/v////8AAAD/AAAAAAAAWxAIAAD/AP76+Pf39/n5+vr7","/f39/v7///////8AAAAAAAAAyA7+/wD/AP/9+vn4+Pj5+vv7+/z9/v7+////AAAAAAD/AAAAMA0HAAAA///+/fv7+vr6+vr7/P39/f7+/v///////wAAAAAA","pwsGAAAAAAD//v37+/r6+vv8/Pz9/f3+/////wAAAAAAAAAAOgoIAAAAAAAA//7+/Pz8/Pz8/Pz8/f7+/v7///////8AAAAA7QgPAAABAQAAAP/+/v38/Pz8","/P39/v3+/v////8AAAAA/wAAxQcRAAABAQAAAAD///7+/v39/v3+/f7+//7+////AAAAAAAAvgYYAAABAQEBAAAA/////v7+/f79/v7+/v//////////AAAA","2AUfAAABAQEAAAAAAAD////+//7//////////wAAAAAAAAAAEgUmAAABAQICAQEAAAD////////+/v7//v///////wAAAAAAZQQuAAABAQEBAgEBAAABAAAA","//8A////AP//AP8AAP8AAP8A0gM2AAAAAgEBAQEBAQAAAAAAAAD/AAD///8A/wD//wD/AAAAUwM/AAABAQICAQEBAQEAAQAA//8A//////////8AAAAA/wAA","5gJFAAABAQIBAgEBAQEBAAAAAAD/AAAAAAAAAAD/AP8AAAAAigJMAAABAgECAQIBAQEBAAAAAAAA//////////8A/wAAAAAAOgJQAAABAQEBAgEBAQAAAQEA","AAAAAAAAAAAAAAD/AAD/AAAA9wFTAAAAAQICAQECAQEBAAAAAP//AP////////8A//8AAAAAvAFVAAABAQEBAQEBAQEAAAAAAAAA/wAA////AAD/AAAA/wAA","iwFVAAABAQEBAQEAAAAAAAD//wD//////wD///8A////AAAAYAFUAAAAAQECAgEBAQEAAAAAAP//////AP8A/////wAAAAAAOwFRAAABAQEBAQEBAAABAAAA","//8AAP//////////AP8AAP8AGwFNAAAAAQEBAAEBAQAAAf8AAAD//wD//////wAA/wD//wAAAAFJAAABAAEAAQEAAQEAAAD/AAAAAP8A////AP//AP8AAAAA","5wBEAAAAAQEBAQEBAAABAAEAAP8A/wD/AAAA/wAAAAAAAAAA0gBAAAABAQEBAQEBAQEAAAAAAAD/AP8A/wD/AP///wD/AAAAcAsJ+AAVJC83Oz0+Pj07OTUz","LywpJiIfHBgWExEOCwkHBAIAFCIAAADe5Ons8PP19/j5+vz8/f7+/v//AAAAAP8AAAAAAAAA+QYAAAD8+/v8/Pz9/f7///8A//8AAAAA/wAAAAAAAAAAAAAA","hw8AAAD+9PT29/n6+/v8/f39////////AP8A/wAAAAAAAAAAHxIAAAAD+PTz9fb3+Pr7+/39/f7+/v///wD/AAAAAP8AAAAALxL//wAD/fb19PX3+Pn6+/v9","/f3+//////8AAAD/AAAAAAAATBH//wAA//v39vb29/j5+vv7/P39/v7///////8AAAAAAAAA+g8LAAD/Af77+Pf3+Pj5+vv8/P3+/f7+////AAAAAAAAAAAA","fQ7+/wD////9+/n4+Pn4+vr7/Pz8/v7//////////wD/AAAA+AwKAAAAAAD+/fz7+vn6+vr7/Pz9/f7+/v///wAAAAAAAAAAgAsJAAAAAAD///38+/v7+vv7","+/39/f39/v7/////AP8AAAAAIQoNAAAAAAAA//79/fz8/Pz8/Pz8/f3+/v////8A/wAA/wAA4QgVAAABAAAAAP///v79/fz8/f39/f7+//7+////AAAAAAAA","wgcbAAABAQEBAAD//v7+/f7+/f3+/v7+/v///wAA////AAAAxAYiAAABAQAAAAAAAP/+//7+/v7+/v7+/v7/////AAAAAAAA5QUuAAABAQIBAQEBAAAA///+","//7+/v///////////wAAAAAAIgU3AAAAAgEBAQEAAQAAAAAA/wD///7/////AP8AAP8AAP8AewREAAABAQECAQEBAAEAAAAAAP8AAAD//wD//wD//wD/AAAA","6QNPAAABAQIBAgEBAQEBAAAAAAD///8AAP8A//8AAAAA/wAAbQNaAAABAgECAQIBAQAAAQAAAAAAAAD//wD/AAD/AAAAAAAAAgNkAAABAQIBAgECAQEBAAAA","AAAAAP8AAP8A//8A//8AAAAApgJtAAABAQECAQEBAQEBAQEAAP8A/wD//wD/AAAAAAAAAAAAWQJ0AAAAAQIBAQEBAQEAAAAA/wD/AP8AAP8A////////AAAA","FAJ4AAABAQECAQEBAQAAAAAAAAAA/wD//////wD/AAAA/wAA3AF6AAABAQEBAQEAAAABAP//////////////AP8A////AAAAqQF6AAAAAQEBAQEBAQEAAAAA","AP//////////////AAAAAAAAfwF4AAABAQEBAQEAAAD//wD/////////////////////AP8AWgF0AAAAAAAAAQABAAAAAP8A/////////////////wAA/wAA","OgFvAAAAAQEBAQEAAAAAAAD/AAD///////////////8AAAAAHQFpAAABAQEBAAABAQAAAAAA//////////////8AAAD/AAAABgFiAAAAAAEAAQEAAAAAAP//","AAAAAP///////wD///8A/wAA7wBbAAABAQABAAEBAQAAAAAAAP8A/wAAAAAAAP8AAAAAAAAAvA2e9QAVJjE5PkBAQEA+Ozk2Mi8rKSUiHhsYFRIPDAoHBQIA","ASIAAADe4+js7/L19vj5+vv8/f7+/v7+//8A/wAAAAAAAAAAqAYAAAD9+/v7/Pz9/v7///////8AAAAAAAD/AAAAAP8AAAAAIQ8AAAD+9PX29/n6+/v8/f3+","/v/+//8A/wAAAAAAAAAAAAAAtxEAAAAE+PT09fb3+Pr7+/39/v3//v//AP8AAAD/AAAAAAAAyhH//wAC/fb09PX2+Pn5+/v8/P7+/v/+/wD///8AAAAAAAAA","7xD//wAAAPz49vb29/j5+vv7/f39/v7/////AAAAAAAAAAAAqA8OAAD/Af76+ff39/j5+fr8+/z9/v7+/v8A/wAA/wD/AAAANw7//wD////++/n5+Pj5+vr6","/Pz9/f7+//7/////AAAAAAAAvQwNAAAAAAD+/fz7+vr6+vv7+/z8/f3+/v//AP8AAAAAAAAAUAsNAAAAAAAA//38/Pv6+/v8/Pz9/f7+/v/+/wD///8A/wAA","/AkSAAABAAAA///+/fz8/Pz7/P38/f3+/v7/////AAAAAAAAxggdAAAAAQAAAP///v7+/Pz9/f3+/f7+/v7///8A/wAAAAAArwcjAAABAAEAAAH///7+/v7+","/f39/v3+///+/v//AP//AAAAtwYwAAABAQABAQAAAAD////+//7+/v/+/v//AP8A/wAAAAAA3wU9AAABAQIBAQEBAAAAAP///////////////wD/AAAAAAAA","IgVLAAABAgECAQEBAQEAAAAA/wD///////8A//8AAP8AAP8AfwRaAAAAAQEBAQEBAQABAAAAAP8AAP8AAP//AAD//wD/AAAA8QNqAAABAQIBAgEBAQEBAQAA","AAAAAAD//wAA//8AAAAA/wAAeAN5AAABAgECAQIBAQEAAAEAAAAAAAAAAP//AAD/AAAAAAAAEAOGAAABAQIBAQEBAQEBAQABAAAA//8AAAAA//8A//8AAAAA","tgKSAAABAQECAgEBAQAAAAAAAAD/AAD/////AAAAAAAAAAAAawKaAAAAAQEBAQEBAAEAAAD/AP8A/////wAA////////AAAAKQKgAAABAQEBAQEBAQAAAAAA","/wD/////////////AAAA/wAA8AGiAAAAAQEBAQAAAAAAAP////////////7+////////AAAAwAGjAAABAAEBAAEAAAAA//////7+//7///////////8AAP8A","lwGfAAAAAQEAAQAAAAD//////////v/+/v///////wD//wAAcgGaAAABAQABAAABAP8AAAD///////////7//v////8AAAAAUgGTAAAAAAEAAQEAAAD/////","//////7////+////////AAAAOAGLAAAAAAABAAAAAAAAAP8A//////////////8AAAAA/wAAHgGCAAAAAQEAAAAAAAAA/wD/AAD//wD///8AAP//////AAAA","CQF4AAABAAABAQEAAAAAAAAA//8AAP///wD//wAAAAAAAP8AAxAZ8wAWKDM7QEJEREJAPjs4NTIuKickIR0aFxMQDQsIBQMA9iEAAADd4+jr7/L09vj6+/v8","/f3+/////////wAAAP8AAAAAegYAAAD9+vv8/P39/f7+/v///wD//wAAAAAAAAAAAAAAAAAA4A4AAAD/9fX29/j6+/v8/f3+/v7//////wAAAAD/AAAAAAAA","bhEAAAAE+PPz9Pb3+Pr7+/39/v7+////////AAAAAAAAAAAAfhH//wAD/ff19fX2+Pj5+/v8/P3+/v7///8A//8AAAAAAAAApBD//wAAAfz39vb29/j5+vv7","/f39/f7+////AAAAAAD/AAAAYA8SAAD/AP77+Pf39/j5+fr7+/z9/v7//////////wAAAAAA9Q3+/wD/AP/++/r5+Pn5+vr7/Pz9/f7+/v///wAAAAAAAAAA","ggwRAAD/AAD//vz7+vn5+vv7+/z8/f3+/v7/////AP8AAAAAHAsRAAAA/wD///38/Pz7+/v7/Pz9/f79/v////8A/wAA/wAA0AkXAAABAQAA///+/fz8+/v8","/P38/f3+//7/////AAAAAAAAoQglAAAAAAEBAAAA//7+/v39/f3+/v7+/v/+/wAA/wD/AAAAkQcvAAABAQAAAQD//////v7+/v39/f7+/v7/////AP8AAAAA","oAY8AAABAQEBAQEBAAD//////v////7//////////wAAAAAAzgVOAAABAQEBAQABAQEAAAD/AP//////////AP8AAAAAAAAAFgVgAAABAQIBAQIBAQABAAAA","/wD//wD//wAA/wAAAP8AAP8AdwRzAAABAgECAQEBAQEBAQEAAQAAAP8AAP//AAD//wAAAAAA7wOGAAABAQEBAQEBAQEAAQABAAAAAAAAAAAAAP8AAAD/AAAA","eQOZAAAAAQICAgEBAQEBAAEAAAAAAAAAAAAA/wAAAAAA/wAAFQOqAAABAQEBAQEBAQEBAQAAAAAAAAD//wD/AAD/AAAAAAAAvgK4AAABAQEBAQEBAAAAAAAA","AAAA//8A//8A//8A//8AAAAAdQLDAAAAAQIBAQEAAQAA//8A////////////////AAD/AAAANgLKAAABAQABAQEBAAD/AAD////////+//////////8A/wAA","/wHNAAAAAQEBAAAA//8A///+//7+/v7///7+////////AAAA0gHMAAABAAEAAAD/AAD///7//v/+///+/v7//v////8AAP8AqAHJAAAAAQAAAQAAAP//////","/v7//v7+/v/+//7//////wAAhgHCAAAAAAABAAAA///////+//7+/v7//v7+/v/+/wD/AAAAaAG5AAABAAEAAAAAAAD////////////+//////////8A/wAA","TQGvAAAAAAAAAAAA//8A///////+//7///////8A////AAAANQGjAAAAAQAAAAAAAAD/AP8A//8A/////////////wAAAP8AIAGXAAAAAAEBAQAAAAAAAAD/","AAD//wD///8AAAD/AP8A/wAAQRKD8AAYKjU9QkZGR0VDQD47NzQxLSkmIx8bGBQSDgwIBgMA8yEAAADc4ujs7/H09vj5+vv8/f39/v///////wAAAP8AAAAA","YwYAAAD9+/v7/P3+/f7///////8AAP8A/wAAAAAAAAAAAAAAuQ4AAAD/9fT29/j5+/v8/f3+/v/+/wD/AP8AAAD/AAAAAAAAOhEAAAAE9/T09fb3+Pr6+/z8","/f3//v7//wD///8AAAAAAAAAQxEAAAAD/vf09PX29/j6+vz8/f79/v////8AAAAAAAAAAAAAZBD+/wAAAPv49vb29/j5+vr8/Pz+/v7+/////wAA/wD/AAAA","IA8WAAD/Af/7+ff3+Pj4+vr7/P38/f7+/v//AP//AAAAAAAAtg3+/wD/AP/9+/r5+Pj5+fv7+/z9/v3+/////wAAAAAAAAAARwwVAAAAAAAA/vz7+vr6+vr6","/Pz9/f7+/v7///////8AAAAA5woWAAAA/wD///79/Pz7+/v8+/z8/f3+/v////8AAAAA/wAAnwkcAAAAAAAA///+/v38/Pz8/fz9/f7+/v7+////AAAAAAAA","dgguAAABAQEBAQD///7+/v39/f79/f3+////////////AAAAbQc5AAABAQAAAAAB/////v/+/v3+/v/+/v7//wAAAAAAAAAAggZKAAAAAQEBAQEAAQAAAP//","//////7//////////wAAAAAAtQVgAAABAQEBAQEBAQEBAAAA/wD//wD//wD/AAAAAAAAAAAAAgV1AAABAQICAQEBAQEAAQEAAAAAAP8AAP8A//8AAAAAAAAA","aQSMAAABAQEBAgICAQEBAQABAQAAAAAAAAAAAAAAAP8AAAAA5QOkAAABAgICAQEBAQEBAAEAAAABAAAAAAAAAAAAAAAAAAAAdAO7AAABAQEBAQEBAQEBAQAB","AQAAAAAA/wAAAAD//wAAAP8AEwPPAAABAQEBAQEBAAAAAAAA/wAAAAD/AP//AP8AAAD/AAAAwQLgAAAAAQEBAQEAAQAAAAD/AAD//////wD//wD/AP8A/wAA","egLsAAABAQEBAQAAAAAA//////7///////7///8A/wAAAAAAPgL1AAAAAAEAAAAA/////////v/+/v7//v///v/+////AAAACgL5AAAAAQABAAAA///+//7+","/v7+/v7+/v7+//7//////wAA3gH4AAABAAAAAP//AP///v/+/v7+/v79/v7+/v7/////AP8AtwH0AAAAAAEAAAD///////7+/v7+/v7+/v7+/v/+/v8A/wAA","lwHrAAAAAAAAAAAA/////v7///7+/v7+/v7+//7//////wAAegHgAAAAAQAAAP/////+///+/v7+/v7///7//v//////AAAAYAHUAAAAAAAA/wAAAP8A////","///////+/v///////wAAAP8ASQHGAAAAAAAAAAAA/wD/////////////////////AP///wAANQG3AAABAAAAAQAAAAAAAAAA//////8AAAD/AAAA/wAAAAAA","eBTj7QAZLDlBRUlJSkhGREA9OjczLysnIyAdGRUSDwwJBgMA9CEAAADc4ufr7/H09ff5+vv8/f39/v//AP///wAAAP8AAAAAXQYAAAD9+/v8/P39/v/+/v//","//8AAP///wAAAAAAAAAAAAAAow4AAAD+9PT19/j6+vv8/f3+/v/+//8AAP8AAAD/AAAAAAAAFhEAAAAF+PT09fb3+fn7+/z8/f3//v///wD///8AAAAAAAAA","ExH//wAD/vf09PX29/n5+/z8/f39/v/+//8AAAAAAAAAAAAALRD//wAAAPv49vb29/f5+fr8/P39/v7//////wAA/wD/AAAA5g4ZAAD/Af/7+ff39/j5+vr7","/Pz9/f7+/v//AP//AAAAAAAAeg3//wD/AP/++/r5+fn4+fv7+/39/f3+//7///8AAAAAAAAADQwZAAAAAAH//vz7+vr6+vr6/Pz8/f7+/v///wD///8AAAAA","rwoaAAAA/wAA//79/Pv8/Pv8+/z9/f3+/v7+//8AAAAA/wAAbAkiAAAAAQAAAP/+/v78/P38/fz9/v7+/v//////AAAAAAAASAg3AAAAAAABAAEA//7+/v3+","/f7+/f7+////////////AAAARAdEAAABAQEAAQABAAAA///+//7+//7+/v7//wAAAAAAAAAAXgZZAAABAQEBAQEAAQAAAP///////////wD/AP8A/wAAAAAA","lwVxAAABAQEBAQECAQEBAAEBAAAA//8AAP8A/wD/AAAAAAAA6wSLAAABAQECAQIBAQEBAQEAAAAAAAAAAAAAAAAAAAAAAAAAVQSnAAABAQIBAgEBAQIBAQEB","AQEAAQEAAAAAAAAAAAAAAAAA1wPCAAABAgEBAQEBAQABAQABAAABAAAAAAAAAAAAAAAAAAAAagPdAAAAAQECAQEBAQEAAAEAAQEAAAAAAAAAAAAAAAAAAAAA","DQP0AAABAQEBAQEBAAAAAAAA////AAAA/wD///8AAP8AAAAAvgIIAQABAQEAAQAAAAAAAP//AP//////AP//AAD//wD/AP8AfAIYAQAAAAEBAAD/AP//////","/v///v7+/v7//v7///8A/wAAQgIhAQAAAQAAAAAA///+/v7+/v7+/v7+/v7+////////AAAAEgIlAQABAAAA/////////v79/v39/v3+/v7+/v7+/////wAA","5wElAQAAAAAAAP///v7+/v3+/f79/f79/f7+/v7//v////8AxAEfAQAAAAD//wD///7+/v7+/v3+/f3+/v3+/v7+////AAAApQEVAQAAAAAAAP/////+/v7+","/f7+/v79/f7+/v/+//8A/wAAigEIAQAAAAAA/////////v7+//7+/v7+//7+/v7//v//AP8AcQH5AAAAAAAAAAD////////+/v7+/v7//v//////AP///wAA","XAHpAAAAAAAAAP8A//////////////////////////8AAAAASAHXAAAAAAAAAAEAAAAAAAAA/wD/AP///////wAAAAAAAAAAphZB6wAbLjtESUtNTUtJRkNA","PTg1MC0pJiIeGxYTDw0JBgMA+SEAAADb4ufr7/L09vj5+vv7/P3+/v///////wAAAP8AAAAAZAYAAAD9+/v7/P39/f7+//8A/wD/AP8A/wAAAAAAAAAAAAAA","mQ4AAAD+9PX29/j5+/v8/f39/v7//wD/AP8AAAD/AAAAAAAA/RAAAAAF+PPz9PX3+Pn6+/z9/v3+/v7//wD///8AAAAAAAAA7BAAAAAD/vf09PX29/n6+vv8","/P79/v/+//8AAAAAAAAAAAAA/Q/+/wABAPv49vb29/f5+vv7/Pz+/v7//////wAA/wD/AAAArw4dAAD/Af/7+ff39/j4+fr7/P38/f7+/v//AP//AAAAAAAA","QQ0AAAD/AAD+/Pr5+fn5+vr7+/z9/v3+//7///8AAAAAAAAA0gscAAD/AAAA/v37+vr6+vv7/Pz9/f7+/v///wD///8AAAAAdwofAAAAAAAA//7+/fz8/Pv8","/Pz8/f3+/v7+//8AAAAA/wAAOAkoAAABAAEAAAD+/v39/P38/f39/f7+/v//////AAAAAAAAFwhAAAAAAAABAQAA///+/v7+/f7+/v7+/////wAA/wAAAAAA","GAdPAAABAQEAAQEBAAAAAP////7/////////////AP//AAAAOAZnAAABAQEBAQEBAgEAAAD//wD///////8AAAAAAAAAAAAAdgWEAAABAQECAQECAQEBAQAB","AQAAAAAAAAAAAP8AAAAAAAAAzgShAAAAAQEBAQIBAQECAQEBAQEBAAAAAAAAAAEAAAAAAAAAPwTBAAABAgEBAQEBAgIBAQIBAQAAAQEBAAAAAAAAAAAAAAAA","xQPhAAABAQICAgEBAAEBAQABAAEBAAAAAQEAAAAAAAAAAAAAXAP/AAABAQEBAQEBAQAAAAEAAQAAAQAAAAAAAAAAAAAAAAAABQMaAQABAQEAAAAAAAAAAP8A","/wAA/wAA//8AAP8A/wAAAAAAuQIyAQAAAAABAAAAAP/////+//7+//7+/////wD/AP8AAAAAegJCAQAAAQEAAAD//v///v7+/v7+/v7//v7+/v7//wD///8A","RQJOAQABAAAAAP////79/v7+/f7+/f79/v7+/v7+////AAAAFwJSAQAAAAD////+/v7+/v39/f39/f39/f39/v7+/v7//wAA7wFRAQAAAP8A//7//v7+/f39","/fz8/f39/f7+/v7+/v////8AzgFLAQAAAAD////+/v79/f79/f39/f39/f39/f7/////AAAAsgE/AQAAAAAA//////7+/v3+/f7+/f3+/v7+/v7+/v7//wAA","lwEwAQAAAAD/AP////7//v79/v79/v79/v7+///+//8AAP8AggEgAQAAAP8A/////v/+//////7//v7//v7//v7//wD//wAAbQELAQAAAAAAAAD/AP8A////","/v/+///+//////////8AAAAAWgH4AAAAAAAAAAAAAAD/////AP8A//8A////AAAAAAD/AAAAyhig6AAcMD9HTE9QT05MSUZCPjo2My8qJyMfGxcUEA0KBgMA","ASIAAADb4ubr7/L09vj5+vv8/f7+/v7//////wAAAP8AAAAAcwYAAAD9+vv7/P3+/v7+/////////wAA/wAAAAAAAAAAAAAAmg4AAAD+9fT29/j5+vv8/f3+","/v7/////AP8AAAD/AAAAAAAA7BAAAAAF9/Tz9PX3+fr7+/z8/f7+//7//wD///8AAAAAAAAAzBAAAAAD/vb09PX29/j5+vv8/f3+/v////8AAAAAAAAAAAAA","0Q///wAAAfz49vb29/j5+vv8/P39/f7+/////wAA/wD/AAAAfA4gAAD/Af/7+ff39/j5+vr7/Pz9/v7+/v//AP//AAAAAAAACQ0AAAAAAAD+/Pr5+fn5+fr7","+/z9/f3+/////wAAAAAAAAAAmQsgAAD//wAA/v37+vr6+/v7/Pz8/f7+/v7///////8AAAAAPgokAAAAAAAA//7+/fz7+/v8/P39/f7+/v////8AAAAA/wAA","AgkuAAAAAAEBAQD//v3+/f39/f39/v3+//7/////AAAAAAAA5QdJAAABAQAAAAEAAAD+/v79/v7+/v///v///wAA/wAAAAAA6gZaAAABAQEBAQEBAQAAAAAA","////////////AP//AP//AAAAEAZ2AAAAAQEBAgECAQEBAQAAAAAA////AAAAAAAAAAAAAAAAUgWWAAABAQEBAQIBAQICAQEBAAAAAQEBAAAAAAAAAAABAAAA","sAS4AAABAQECAQECAgEBAgIBAgEBAQAAAQEAAAABAAEAAAAAJgTbAAABAQIBAgEBAQICAQEBAQEBAQEBAAABAAEAAAAAAAAAsQP/AAABAQEBAQEBAQEBAQEB","AQEBAAEBAQEAAQAAAQAAAQAATQMiAQABAQEBAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+QJAAQAAAQAAAQAA//////8A/wD/AP///////wAA/wAA/wAA","sgJbAQABAAEA///////////+/v7//v7+////////AP//AAAAdwJtAQAAAQAAAP///v7+/f39/v39/f7+/v7+/v7+/v8AAP8ARQJ6AQAAAAAA///+/v39/f39","/P39/f39/f3+/v7//////wAAGgJ/AQAA//////7+/v79/f39/fz8/Pz9/P39/f7+/v7//wAA9gF+AQAAAAD//v7+/f39/fz8/P38/f38/f39/v39/v/+//8A","1wF2AQAAAP/////+/v39/f39/fz9/Pz9/f39/f7+////AAAAvAFqAQAAAP////7+/v7+/f39/f39/f39/f39/v7+/v7//wAApQFYAQAA/wD//////v7+/v79","/f39/v79/v7+/v7///////8AkAFFAQD/AAAA///////+/v7+/v7+/v7//v7//v////8AAAAAfQEvAQAAAAAAAAD//////////////v7+/////////wD/AAAA","bAEZAQAAAP8AAAAAAAD/AP8A////AAD/////AP////8A/wAA5RoE5gAfM0JKUFJTU1FPTElEQT05NDAsKCQgHBgVEQ4KBwMACiIAAADa4ufr7vL09vj5+vv8","/f39/v7//////wAAAP8AAAAAigYAAAD8+vr8/f3+/v7//v///wAAAAAAAAAAAAAAAAAAAAAAog4AAAD+9PT19vj5+vv8/f3+/v7//////wAAAAD/AAAAAAAA","4BAAAAAG9/Pz9Pb3+Pn6+/z8/f7+/v//////AP8AAAAAAAAAsRAAAAAD/vf09fT2+Pn6+/v8/f39/v7///8A/wAAAAAAAAAAqQ///wAAAfz49fb29/j5+vv8","/P3+/v7+////AAAA/wD/AAAASw4kAAD/Af/7+fj39/j4+fr7+/z8/f7/////////AAAAAAAA0gwAAAD/AAD//Pr5+fj5+vv7/Pz9/f7+/v///wAAAAAAAAAA","YQskAAAAAAD//vz8+vv7+vr7/Pz9/v3+/v7/////AP8AAAAABgooAAAAAAEBAP/+/fz8/Pz8/P39/f7+//////8A/wAA/wAAywg0AAAAAAAAAQD///79/f39","/f39/v7+/v///wD/AAAAAAAAsgdSAAABAQEBAQEBAAD//////v7//v//////AP8AAAAAAAAAuwZmAAABAAABAQEBAQABAAD/AAD///////8A/wAA/wAAAAAA","5gWEAAAAAQEBAQICAgIBAQABAAAAAAAAAAAAAAAAAAAAAAAALQWpAAABAQICAgIBAgICAgIBAgEBAQEBAQEAAQAAAQAAAAAAkQTNAAABAgEBAQECAQICAgIC","AQIBAQEBAQABAAEAAAAAAQAACwT3AAABAQEBAQEBAgEBAQECAgECAgEBAQEAAQABAAAAAAAAmwMfAQABAQEBAQEBAAEBAQEAAQEBAAEAAAEBAAAAAQEAAAAA","PANEAQAAAQEBAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAA7AJlAQABAAAAAAD/AP///////v//AP//AP//AP8A//8AAAAAqwKCAQAAAAD/AP///v7+/v7+","/v79/f7//v//////AAAA/wAAcgKYAQAAAAAA/v7+/f39/fz9/fz9/f39/f39/f7+/v//AAAARAKnAQAAAP////79/v38/P38/Pz8/Pz8/f39/v7+/v7///8A","HAKsAQAAAAD+/v7+/f39/Pv7+/z8/Pz8/Pz9/f3+/v///wAA+wGqAQAA/////v79/fz8/Pz8/Pz7/Pz8/P39/f39/v7+//8A3wGhAQAAAP////7+/f39/f38","/Pz9/Pz8/fz9/f7+/v7/AAAAxgGUAQAA/////v7+/f79/P39/fz8/f39/P39/f3+//////8AsAGAAQD/AAD////+//3+/v39/f39/f3+/v7+/v7+/v///wAA","ngFrAQAAAP////7//v/+/v7+/v7+/v7+/v7+////////AAAAjAFSAQAAAAAAAAD//////////////v7+//////////8A/wAAfAE4AQAAAAAAAAAAAP//////","////AAD///////8AAAAAAAAA9hxx4wAgNkVOU1ZXVlVST0tHQz86NTEuKSUhHRkVEQ4KBwMAFSIAAADa4ebr7/L09vj5+vv8/P3+/////////wAAAP8AAAAA","pgYAAAD8+vv7/Pz9/v7+////AP//////AAAAAAAAAAAAAAAArw4AAAD+9PT29/j5+vv8/P3+/v////8A/wAAAAD/AAAAAAAA2xAAAAAF9/Pz9Pb3+fn7/Pz8","/f3+/v//AP8AAAAAAAAAAAAAmRD//wAE/fb09PX29/n5+vz9/f7+///+/v////8AAAAAAAAAhA///wAAAvz39vX39/j5+vr7/Pz9/f7/////AAAAAAD/AAAA","Gw4oAAD/Af/8+fj39/j5+vv7/P39/v7+/////////wAAAAAAnQwBAAD/AAD+/Pr5+fn5+vr7+/z9/f7+/v///wAAAAAAAAAAKQsoAAAAAAEA/v38+/r7+vv8","/Pz9/f3+////////AP8AAAAAzgktAAAAAAABAP/+/f38/Pz8/f39/v7+/v7/AP8A/wAA/wAAlAg5AAAAAAEBAQEA//7+/v79/f7+/v7//////wAAAAAAAAAA","fgdbAAABAQABAQEAAQAA//7///7+/////wAA////AAAAAAAAjAZyAAABAAEBAgICAQEBAQEAAAAA/wD/AP//AAAAAAAAAAAAuwWSAAAAAQEBAQECAgIBAQEB","AQEBAQABAAEBAAEAAAAAAQAACAW7AAABAQIBAgICAwMDAwICAQIBAQEBAQAAAQABAAAAAAAAcATmAAABAgEBAQICAQICAgMCAgECAgIBAQEBAQEAAQEAAAAA","8AMTAQABAQECAQEBAgEBAQECAgIBAQEBAQEBAAABAAABAAAAhAM+AQABAQEAAQAAAAEBAQEBAQEBAQEBAQEBAQEAAQAAAAAAKgNnAQAAAAAAAAAAAP//AAAA","AAAAAAAAAAAAAAAAAAAAAAAA3wKIAQABAQAA/////v///v7+/v7/////////AP8A/wAAAAAAoAKnAQAAAAAA//7+/v39/f39/f79/f3+/v///v///wD/AAAA","bQLCAQAA///+/v79/f38/Pz8/Pz8/P38/f39/v7+//7//wAAQgLSAQAAAP///v39/Pv8/Pv7+/v7/Pv8/Pz8/f3+/v////8AHQLYAQD////+/v79/Pz8+/v7","+/v8+/z8/Pz9/P39/v7//wAA/wHWAQAA///+/v38/fz7+/z7+/v7+/v7+/z8/f3+/f7+//8A5gHNAQAAAP///v7+/f38/Pv8/Pv7/Pz8/Pz9/f39/v7/AAAA","zwG9AQD////+/v39/f39/f38/P38/Pz9/f39/f7+/v////8AvAGnAQAAAP/////+/v7+/f39/f39/f39/f39/v7+//7//wAAqwGQAQAA/wAA/////v7+/v7+","/v3+/v7+/v7+/v7/////AAAAmgF1AQAAAP///////////////v///v7+/////////wAA/wAAjAFYAQAAAAAAAAAAAP//////AP///wAA/////wD/////AAAA","/B7n4AAiOUhSV1paWVhVUU1JRUA8ODMuKiYiHhkWEg8LBwMAISIAAADZ4efr7/L09/j5+/v8/P7+/v7//wAA/wAAAP8AAAAAxwYAAAD8+vr7/Pz+/f7+/v//","AP//AAAAAP8AAAAAAAAAAAAAwQ4AAAD+9PT19/j5+/v8/f7+/v//////AAD/AAAAAAAAAAAA1xD//wAF9vPz9Pb3+Pr7+/z9/f3+/v////8AAAD/AAAAAAAA","hRAAAAAE/vb09PX29/j5+/v8/f7+/v7//wD///8AAAAAAAAAYQ///wAAAfz49vX29/j5+vv8/P39/v7+////AAAAAAD/AAAA7Q0sAAAAAv/7+fj4+Pj5+vr7","/Pz9/v7//v///////wAAAAAAaQwBAAD/AAH//Pr5+fn6+vv7/Pz9/f7+//4A/wAAAAAAAAAA8QosAAD/AAEA//78+/v7+/v8/P39/f7+/v//AP8AAAAAAAAA","lgkxAAAAAAABAP/+/v38/Pz8/P39/v7+/////wD///8AAAAAXghAAAAAAAEBAQEA///+/v7+/v7+/v7///////8AAAAAAAAASwdkAAABAQEBAgECAQAA/wD/","////////////AAAAAAAA/wAAXAZ8AAABAQACAQICAgICAgEBAQAAAAAAAAAAAAAAAAAAAQAAkAWhAAAAAQIBAgICAwMCAgIBAQECAQEBAQEBAAAAAAEAAAAA","4QTQAAABAQEBAgICAgIDAwIDAgICAgIBAQEBAQEBAQAAAAAATwT9AAABAQECAQICAgICAgMCAwMCAgICAQIBAQEAAQABAAAA0wMwAQABAQEAAQEBAQICAgEC","AgICAgEBAgEBAQEBAAEAAAD/bQNgAQABAQEBAAAAAAAAAAEBAQAAAQEBAQABAQAAAAAAAAAAFwOIAQAAAAAA/////////////wAA/wAA/wAAAAAAAAAAAAAA","0QKrAQAAAP/////+/v7+/v7+/v7+/////////wAAAAAAAAAAlwLJAQAAAAD///3+/fz8/Pz8/P39/f39/v7+//////8AAAABZgLoAQAA///+/f38/Pz8/Pz7","/Pv8+/z8/f39/f3+////AAAAPwL9AQAAAP7+/f38/Pv7+vr7+vr6+/v8+/z8/f3+/v7///8AHgIEAgAA///+/vz8+/v6+/r6+vv6+/r6+/v8/P39/f7+/wAA","AwIBAgD///7+/f39/Pz8+/v7+/r7+vv7+/z8/Pz9/f7+//8A7AH3AQAA///+/v38/Pz7+/v7+/v7+/v8/Pz8/P39/v7//wAA2AHmAQD////+/v7+/fz9/Pz8","/Pz8/Pz8/Pz9/v7+/v////8AxgHOAQAAAP///v7+/v79/f39/P39/f39/v7+/f7+//7//wAAtwG0AQAA///////+/v7+/v79/v39/v7+/f7+/v7+/v///wAA","qQGXAQAAAAD//////////////v///v7+//7+////AAD/AAAAmwF4AQAAAAAAAAD/AP//////AP///wAA/wAAAP8A//8AAAAA9yBo3gAjPEtWW11fXFtXVE9L","R0I+OTQvLCciHhsWEg8LBwMALiIAAADZ4Ofr7/P09/j6+vz9/P79//////8AAP8AAAAAAAAA6wYAAAD8+vr7/Pz9/v7+////AP8A//8AAAAAAAAAAP8AAAAA","1Q4AAAD+8/T19/j6+vv8/f39/v7//wD//////wAAAAAAAAAA2BAAAAAF9/Lz9Pb3+fr7+/z9/f7+//7//wAAAAD/AAAAAAAAchAAAAAE/vf09PX29/j6+/z8","/f7+/v////////8AAAAAAAAAPw///wABAfv49vX29/n5+vv8/P39/v7///8AAAAAAAAAAAAAwg0vAAD/AgD7+fj4+Pj5+vr7/Pz9/f7+/////wAA/wD/AAAA","NQwBAAD/AAH//Pv5+fn5+vv8/P39/v7//v//AP//AAAAAAAAugoxAAD/AAEB//38+/v7+/v8/Pz9/f7+//////8AAAAAAAAAXwk1AAAAAAABAQD//v39/f38","/f7+/v7+/////wD/AP8AAAAAJwhGAAABAQEBAQEBAAD//v7+//7+//////8AAAAA/wAAAAAAFwdsAAAAAAECAgICAgEBAAAA//8A//8A/wD/AAAAAAAAAAAA","LQaHAAABAQEBAgMCAgICAgIBAQEAAQEAAQABAAAAAQEAAAAAZAWzAAABAQEBAgIDAwMDAwIDAgICAQEBAQEAAQABAAABAAAAuwTiAAABAQECAgICAwMDAwQD","AwMDAwICAQECAQEBAQAAAAAALgQYAQAAAQEBAQICAgMDAwIDAwICAgICAgIBAQEAAAEAAAD/twNPAQABAQEBAQABAQEBAgICAgICAgICAgEBAQEBAQAAAP8A","VQOAAQABAQAA/wAAAAAAAAAAAAEBAQEAAAEBAAEAAAAAAAD/BAOpAQAAAAD///7+/v7+/v////////8AAAAAAP8AAAAAAAAAwgLLAQAAAAD///79/f39/f39","/v7+/v/+////AAAAAAAAAAABjALrAQAA///+/f39/Pz8/Pz8/Pz8/fz+/f3+/v///wAAAAEAYAIKAgAA//7+/f38/Pv7+vr6+vr7+/z7/P39/f3+////AAAB","PAImAgD///79/fv7+vr5+vr6+vr6+vr7+/v7/P39/f7//wAAHgIvAgAA//79/Pz7+/r6+vn5+fn5+fr6+/v8/Pz9/f3+//8ABgIsAgD///7+/f38/Pv7+vr6","+vr6+vr7+/v7/P39/v7+/v8A8gEgAgAA///+/vz8+/z7+/v7+/v7+/v7+/z8/Pz9/f7/AAAA3wEOAgD///7+/f79/fz8/Pz7+/v7/Pz8/Pz9/f39/v7///8A","0QH1AQAA//////7+/f39/fz9/f39/P38/f39/v7+/v/+/wAAwwHYAQAAAAD+/v7+//7+/f79/f39/v3+/v7+/v7///8A/wAAtgG4AQAAAP8A/////v//////","/////v///v//////////AAAAqQGXAQAA/wAAAAAAAP//////////AP//AP///wD/AAAAAP8AIUFmxwDu3s7As6idlY6IhIKBgYOHi5GYn6ixusPN1t/o8PkA","OwNDAgAAAAAAAAAAAAABAQAAAQEAAQEBAQEBAQEBAQEBAQAAswOTAgAAAAAAAAAAAAAAAAABAAEBAQEBAQEBAQEBAQEAAAAAQQThAgAAAAAAAAABAAEAAAEA","AQEBAQEBAgEBAQEBAAABAAEA7QQ7AwAAAAAAAAAAAAAAAQEBAQECAQICAQICAgIBAgEAAQAAvgWmAwAAAAAAAAAAAQABAAABAQEBAgECAgICAgECAQEBAQAA","vAYYBAAAAAAAAQAAAAEAAQEBAQECAgICAgICAgICAQIBAAEA9gejBAAAAAAAAAAAAAABAQECAgICAgMCAwMDAgMCAgEBAQAAgQkuBQAAAAAAAAABAQEBAQIB","AgMDAwMEAwMDBAMDAwICAQAAdAvDBQAAAAAAAAAAAAEBAgIDAwMDBAQEBQUEBAMDAgICAQEA9Q1nBgAAAAAAAAEAAQECAgIDBAQFBQYFBQUGBQUEBAMCAgEA","PxELBwAAAAAAAAABAQECAwQEBQYGBwcICAcGBgYFBAQCAQAApBVoBwAAAAAAAQEBAgMEBQYHCAkKCgsLCwsKCQgHBgQEAgIArxtIBwAAAAEBAQEDBAUGCAoN","Dg8QEREREA8ODAsJCAYEAwEAWCQXBgAAAAABAgUGCQ4SFRkcHiAhIB8dGxkWFBAOCggGBAIAsTGkAgAARIfJ6OPu5dnMvq6djX1tX1FFOjAoIBoUEAwIBQIA","DQAAAAAAPPgzEREAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkfmS/wAAgYQMFSEwP1BhcYCPnKizvcbO1dzh5uvv8/b5/P4AG/ss/wAAAP/8+vfz8e3r6uno","6Onq6+zu8PHz9fb4+fv8/f8AsPv1/gAAAP///fz6+Pf18/Py8vLy8vPz9PT29/j5+vv9/v8A/PvS/gAA/wD///38+/r5+Pb29vX19fX29vj4+Pr6/P39/v8A","K/y7/gAAAAD//v79/Pv6+fn49/f39/j3+Pj5+vr7/Pz+//8ATPyq/gAAAAAAAP/+/fz7+/r6+fn5+fj5+fr6+/v8/P7+/v8AZvyh/gAAAP///////v39/Pv6","+/r5+vr6+vr6+/z9/f3+/wAAfPyb/gAAAAAA///+/v79/Pz8+/v7+vr7+/v8/Pz8/f7+//8AkPyZ/gAAAAAAAP///v79/f38+/v7+/v7+/v8/P39/v7//wAA","pPya/gAAAAAA//////7+/fz8/Pz8/Pz8/P38/P3+/v7+//8AuPyc/gAAAAD/AP////7+/v79/fz8/Pz8/Pz9/f3+/v///wAAyvyg/gAAAAAAAAD////+/v39","/f39/f38/f39/v79/v7///8A3fyl/gAAAAAA/wAA///+/v7+/f39/P39/f39/f7//v//AAAA8Pyr/gAAAAAAAP////7//v7+/v79/v3+/f7+/v7+/////wAA","Av2x/gAAAAAAAAD///////7+/v39/f39/v3+/v7+////AAAA"].join(""),hp="zThrEgAAAP/+/Pn28ezl3tfOxbyyp5yQhHhrX1JGOS0iFgsBAABVHv8BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC39wAcBwIBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADX/ACBJREJBgQCAQEBAQAAAAAAAAAAAAAAAAAAAAAAAAAAAACABMNhPR8SCwgGBQQDAgIBAQEBAAAAAAAAAAAAAAAAAAAAAAAXBtQANigaEgwJBwUEAwMEAwMCAwIBAQEAAAAAAAAAAAAABAD4APoAODotIRkTDgwJCAcFBQMDAgMDAwMDAwMCAgEAAAAA/wCI///7KDs4LiQcFhANCgcGBAQDAgEBAP////7//wAAAAAAEQBXAfvnABwpLCgjHhoWEhANCwoICAcGBQUEAwQDAgEBAQAADQFAAP7y/xQkKywpJSAbGBQRDwwLCAcGBQQEAwIBAQEBAAAALwEwAfvv8QAQGyEkIyEfHBkWExAODQsJCAcFBQMDAwIBAQEAiQEaAfz08/sHEhsgIiMhHx0aGBYTEQ4NCwkJBwYFAwMDAgEAXwJbAfjy8vcACREYHR4gHx4dGhgWExIPDgwKCAcGBQMCAQAA8QLnAfXy7/L4AAgOFBkbHR0cGxoYFxQTEA4MCwkHBgUDAgEAzgNTAvDu7u/z+gEIDhIWGBobGxoZFxYUExEPDQwKCAYFAwIAzQTQAujo6evw9PsBBgwRFRcYGhoaGRgWFBMRDwwLCQcFBAIA1QVrA9ze4OTo7vP6AAYKDhIVFxgYGRgXFhQTEQ8NCgkGBAIALwUYBODh4uPl6e7y+f4ECQ4TFRkcHR8gICEgICAeHhwbGRgX6QLMBAD79vLv7u/x9Pj8AgYLERUaHyImKiwvMTM1Njc4OTk5RgOjBQD79/Tx8O7v8PP2+f4CBgoOEhcbHiEkJyksLjAyMzQ2owORBgD8+PXz8O/v8PDz9ff6/gEFCAwPEhYZHB8hIyYoKiwt/wOTBwD9+fbz8fHw7/Dw8fP19/r9AAIFCAsOEBMWGRsdICIkWQS4CAD8+vf18/Hv7+/v8PHy8/X2+Pv9AAIEBwkLDQ8SFBYYrwT7CQD++vf19PLx8O/v7+/v8PHz9PX3+Pr8/gACBAYICQsNAAVjCwD9+/n39PPy8PDv7u7v7/Dv8PHy8/T29/j5+/3+AAIDTAXMCwD+/Pv5+Pb19PPz8/Ly8vLz8/P09fb29/j6+vv8/v4AjwWNCwD//vz7+vn5+Pf39vf29vb29/f3+Pj5+fv7/P3+/v8AywUlCwD//v38/Pz6+/r6+vn6+vn6+fr6+vr7/Pv8/f3+/gAA/QWbCgD///7+/f39/P37/Pz7+/z7/Pz8/P38/f79/v7+//8AJwb+CQAA//////7+/v3+/f39/f39/f39/v3+/v7///8AAAAARQZSCQAAAAD//////////////////////v///v///wD/AAAAWwacCAD//wAA//8A//////////////8AAAAAAP8AAP8A/wAA",pp=["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","AAAWAAAEBgcICQkJCQcHBwYGBQUEBAMDAgICAQEBAQAAAQAAAAAVAAADBQcICAgICAgIBwcGBQQEAwMDAwICAgEBAAEBAAAAAAARAAACBQYICAgICAgHBwYF","BgUFBQQDAgMCAgIBAQEBAAAAAAAQAAADBAYGCAgIBwcHBwcHBQYFBAQEBAMDAgICAgEAAQAAAAANAAACBAUGBgcHCAgIBwYGBgUFBQQEAwMCAgIBAQEBAAEA","AAANAAACBAUGBwcHBwcHBgcGBgYFBAQEBAMDAwICAQEBAQAAAAALAAABAwQFBQYHBwcGBwYGBgUFBQUEAwMDAwICAgEBAAAAAAAKAAACAwQFBgYGBgYHBwcH","BgYGBQUEBQQEAwMCAgIBAQAAAAAKAAABAgQEBQUGBgYGBgYGBgYFBgUFBAQDAwIDAgEBAQEAAAAIAAABAwMEBAUFBgYGBgYGBgYGBQUFBAQEAwMCAgIBAQAA","AAAIAAACAgMEBQUGBgYGBgYGBgUFBQUEBQQDAwMDAgICAQEAAAAHAAABAgIDBAUEBQYGBgYGBgYGBgUFBAQEBAQCAgIBAQAAAAB4AAEQHy47R1NfaXN9ho+X","n6eutbzDyc/V2t/l6u7z9/wAAAB7GP8BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOBwAHAgEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA","AABIOAAGAgEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC2PwAJAwEBAAEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABKgAQBQMBAQAAAQEAAAAA","AAAAAAAAAAAAAAAAAAAAAAAAAADnFwAUCQQDAgIBAAABAQEAAAAAAAAAAAAAAAAAAAAAAAAAAACEDQAXDAcEAwIBAgEBAAABAQEBAAAAAAAAAAAAAAAAAAAA","AADtBwAWDwkGAwICAQEBAQEAAAAAAQEBAAAAAAAAAAAAAAAAAADlBAAUEAsHBgQDAgIBAQEBAQEAAAAAAQEAAAAAAAAAAAAAAAAhAwAREQwJBgUEAwICAgEB","AQABAQAAAAABAQAAAAAAAAAAAAAaAgAPEA4LCAYFBAMCAgICAQEBAAEBAAAAAAEBAAAAAAAAAAB7AQANDw0LCQcGBQQDAgICAQIBAQEAAQEAAAAAAQAAAAAA","AAASAQAKDg4MCgkGBQUEBAICAgEBAgEBAQABAQAAAAEAAAAAAADIAAAJDA0MCggIBwUFAwQCAwICAQEBAQEBAAEAAAABAAAAAACYAAAHCwwLCwoIBgYFBQME","AgMCAgICAQEAAQABAAAAAQAAAAB2AAAHCgsLCwkICAcGBQUDBAICAgEBAQEBAQEAAQAAAAAAAABdAAAFCQoLCgoJCAcGBQUFAwQDAgMCAgIBAQEBAAEAAAAA","AABMAAAFBwkKCgkJCAcGBgUEBQMDAwICAQECAQEBAQABAAAAAAA9AAAEBwkJCQoJCAgHBgUFBAQEAwMDAwIBAQEBAQEAAAEAAAAyAAADBgcICQkJCQcIBwYG","BQUEBAMCAgICAQEBAQAAAQAAAAAqAAAEBQcICAgICAgHBwcGBQQEAwMDAwICAgEBAAEBAAAAAAAkAAACBQYICAgICAgHBwYGBgUFBQQDAgMCAgIBAgEBAAAA","AAAeAAADBAYGCAgIBwcHBwcGBQYFBAQEBAMDAgICAQEAAQAAAAAaAAACBAUGBgcHCAgIBwYGBgUFBQQEAwMCAgIBAQEBAAEAAAAWAAACBAUGBwcHBwcHBgcG","BgYFBAQEBAMDAwICAQEBAQAAAAAUAAABAwQFBQYHBwcGBwYGBgUFBQUEBAMDAwICAgEBAAAAAAARAAACAwQFBgYGBgYHBwcHBgYGBQUFBAQEAwMCAgIBAQAA","AAAPAAABAgQEBQUGBgYGBgYGBgYFBgUEBAQDAwIDAgEBAQEAAAAOAAABAwMEBAUFBgYGBgYGBgYGBQUFBAQEAwMCAgIBAQAAAAAMAAACAgMEBQUGBgYGBgYG","BgUFBQUFBQQDAwMDAgICAQEAAAAKAAABAgIDBAUEBQYGBgYGBgYGBgUEBAQEBAQCAgIBAQAAAACRAAEQHy47R1NfaXN9ho+Xn6eutbzDyc/V2t/l6u7z9/wA","AAAYHv8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABx9wAYBAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8/ABwGwoEAgEBAAAAAAAA","AAAAAAAAAAAAAAAAAAAAAAAAAAD4AOF3ORgMBwUCAgIBAQEBAAAAAAAAAAAAAAAAAAAAAAAAAACeBM8ALx0RCQUFAwICAQEAAQEBAQEBAAAAAAAAAAAAAAAA","AABeAAIAMiweFA0IBgQEAwICAgEBAQEAAQEBAQEAAAAAAAAAAQAT/xgAJi8nHRUPCwkGBQQEAwMCAgECAQEBAAABAQEAAAAAAACr/yMAESIlIRoUEAwKCAcF","BAQDAgICAgEBAgEBAAABAAAABADQAhPv8AEMEBEQDgsJCAYGBQMDAwMCAgIBAAEAAQAAAQAABAA/BgDp4uz3AAQGBgcGBQUEAwMDAgEBAQEBAQABAAEAAAAA","BgAJCAD17e/1+wACBAQEBAMDAwMCAgIBAQEBAQEAAAAAAAAADgDHCQD89/b4+/4BAgMDAwMCAwICAgICAQEBAAABAQAAAAAADwBYCwAA/vz8/f4AAQECAgMD","AgICAQEBAQEAAQEAAAABAAAAGwB2DAACAQAA/wEBAQICAwICAgICAgEBAQABAQEAAQEAAAAAGQBCDQAEBAMCAgECAgIDAgICAgICAgICAQIBAAABAAAAAAEA","KACRDQADBQUEBAQDAwQDAwMDAgICAQIBAgEBAQEAAAAAAAAALwCFDQAEBQUGBQQEBAMDAwMCAwICAgECAQEBAQEBAQEAAQAAPQAWDQAEBQYGBgYFBQUEBAME","AwMCAgIBAgEBAQABAAABAAAANQBwDAADBQYGBgYGBgUFBAUDAwMDAwMCAgICAQEBAQAAAAAASACbCwADBQYGBwYGBQUFBQQEBAQDAwIDAQIBAgEAAQEAAAAA","PgCxCgACBQYHBgcHBwYGBQUFBAMDAwMCAwICAQICAQEBAAAATADJCQADBAUGBwYGBgYGBgUFBAUEAwMDAgICAgEBAQABAQAAYgDLCAACBAUFBgcGBgYGBgUF","BQQEBAMDAwICAgIBAQEAAAAAYgDyBwACAwQGBgYHBwcGBQYFBQUFBAQDAwMCAgICAQEBAAEAfAAiBwABAwUFBQYGBgYGBgYGBQUEBAQEAwMDAgEBAQEAAQAA","dgBcBgACAwMEBQUGBgYGBgUFBgUFBQQEBAMDAgICAQEBAAAAigCoBQABAgQEBQYFBgYGBgYGBQUFBAQEAwMCAwMCAgEBAQAApgACBQACAwMEBQUGBQUFBgYF","BQUFBQUEBAQEAwICAgIBAQAApgB5BAABAgMEBAQEBQYGBQUGBgUFBQQEBAMDAwMCAQEBAAEA0gDyAwABAgMDBAUFBQUFBgYFBQUFBQUEBAQDAwICAgIBAQAA","5gB+AwABAQIDAwQEBQUFBQUFBQUFBAQFBAQEAwMDAgEBAQAAwfjbHwEPHis4RE9bZW95gouUnKSrs7rAx83T2d/k6u/0+P0AAAAlHv8AAAAAAAAAAAAAAAAA","AAAAAAAAAAAAAAAAAAAAAAAAAACE9wAaBQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/ABzHAsFAwIBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA","AAC7AdhyOxoNBwQDAgIBAQEAAAAAAAAAAAAAAAAAAAAAAAAAAADXBM8AMB8SCwcEBAICAQEBAQEBAQEAAAAAAAAAAAAAAAAAAABEAP0ANC8gFQ4KBgUEAwIC","AgEBAAABAQEBAQEAAAAAAAAAAwCt/g8AKDQsIBcRDQkHBgQEAwMCAgICAQEAAAABAQEAAAAABQDF/hgAFykrJyAYEg4LCQgFBAMDAwIBAgECAQEBAAABAAAA","BAAsABj6ABIdHh0ZFRIOCwkIBwYFBAMDAgIBAgEAAQAAAQAACQDiAB0C+wQPFhcYFRIQDQsKCAcGBQUDAwICAQICAQEAAAEAEwCmBADs4uXv+AADBwcHBwcG","BQQEAwIDAgICAQAAAAABAP8AGQACBgD17Ovv9fr+AQMEBQQEBAQDAwMCAgIBAQEBAQEAAAEAIgBYBwD69PLz9vn9/wECAgMDAwMCAwIDAgEBAgEBAAAAAAAA","LwCZCAD/+/n5+fr8/gABAgICAgICAQIBAQICAQEAAQAAAAAAPQC8CQAA//38/f7+//8AAQICAgICAgEBAQEBAQEBAAEBAQAAQACbCgACAgEA//8AAAEBAQEC","AgICAgICAgEBAAABAQAAAAAAUwBJCwACAwMCAgEBAQICAgICAgECAQIBAQEBAQEAAAEAAAAAWwCiCwADBAQEAwMDAwICAgICAgMCAgECAQIBAQEBAQAAAAAA","bwC6CwADBAQFBQQDAwMDAwMCAwICAgIBAgEBAQEBAAABAAAAeACUCwACBAUFBQUFBQQEBAMEAwMDAwICAgEBAQEAAQEAAQAAcAA4CwACAwUFBQUFBQUFBAUD","AwMDAwMDAgICAgECAQEBAAAAlAC+CgACBAQFBgYGBQUFBQQFBAQDAwMCAgICAgIBAQEAAAAApQAhCgACAwUFBQYGBgYFBQUEBAQEAwMDAwMCAQEBAQABAQEA","zgB9CQACAwQFBQUFBQUFBQUFBAQDBAMDAgICAgIBAQEAAAAA5AC7CAACAwQEBQUGBgYGBgUFBQQFAwQDAwICAgECAQEBAAAAAgEOCAABAwMEBQYFBQYFBQUF","BQUEBAMEAwMDAgIBAQEBAQAAEAFiBwABAgMEBQQFBgUGBQUFBQQEBQQDBAMCAgICAgEAAAAAIgG3BgABAgMEBAUFBQUFBgYFBQUFBAQEAwMDAwICAQEBAAAA","QQEeBgACAgMEBAQFBQUFBQUFBQUFBQUEBAQDAwMCAgEBAQAAVAGLBQAAAgMDAwUEBQUFBQUFBQUEBAQEBAMDAwICAgIBAQEAZgEFBQABAgIDBAMEBAUFBQUF","BQUFBQQEBAQEAwMCAgEBAAAA0vItMgEPHCk1QU1YYmx2f4iRmaGpsLi/xczS2N7k6e/0+f0AAAArHv8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA","AACL9wAaBQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACL/AB1HQwGAwIBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAtVwOxoNCAQDAwIBAQAA","AAAAAAAAAAAAAAAAAAAAAAAAAADyBM8AMSATCwcFAwICAQIBAQEBAQEAAAAAAAAAAAAAAAAAAABJAPsANDEiFg8KBwYEBAICAgEBAAABAQEBAQEAAAAAAAAA","CACF/gwAKjUtIhoSDQkHBQUEAwMCAgIBAQEAAAABAQAAAAAAAQDw/hH7EygrJx8ZFBAMCQcGBQQDAwICAQECAQEBAAEBAAAACwDr/xH4ABIeIB8bFhIPDQoI","BgUFBAMDAwIBAQEAAQAAAQAAFQD6/xsDAAoVGxwbGRUTDw0LCQgGBQUEAwICAgEBAQEAAAAAFAAwARgD+f0EDBATExIQDw0LCggHBwYFBAQDAgICAQEBAAEA","KABtBADy5+Xs8/r/AgUGBgYGBgUFBAMDAwICAgEBAAAAAAAALgCGBQD38O3u8vf7/wECAwQFBAQEAwMCAgICAgIBAQEBAQAARwC5BgD89vTz9ff5/P4AAQIC","AwMCAgICAgIBAQEBAQAAAAAAUQDEBwD+/Pn5+fn7/P7/AQEBAQICAgICAQEBAQEAAAEAAAAAYwDHCAAB//78/P39/v4AAAABAQECAgEBAQEBAQABAQAAAAAA","bQCXCQABAgAA/////wAAAAEBAgIBAQIBAgEBAQEBAQEBAAAAewA6CgACAgMCAgEBAQEBAQICAQECAgECAQICAQEBAAAAAQAAiwCaCgACAwMEAgICAgICAgIC","AgICAgICAgEBAQEAAQEBAAAAqgDSCgACAwQDBAQDAwMDAwICAwMCAgICAgIBAQEBAQAAAAAAwgDECgACAwQFBQQFBAQDBAQDAwIDAgICAQECAQEBAAEBAAEA","7QCcCgACBAQEBAUEBQQEAwMEAwMCAwMCAgIBAQEBAQAAAf8ACAFDCgABAwQFBQUFBQUFBQQEAwQDAwICAgICAgEBAQEAAAEAKQHRCQACAgMEBQUFBQUFBQUE","BAMEAwMDAwICAQIBAQABAAAALAFPCQACAwQEBQUGBQUFBAUFBQUEBAMDAwMCAgEBAQEAAAAARgG5CAABAgMEBAUFBQUFBgUEBQQEAwQDAwICAwICAQEBAQAA","bQEpCAABAwMEBAUFBQUFBQUFBAUEBQQEAwMDAgICAQEBAAAAhwGKBwABAgMDBAQEBQYGBQUFBQQFBAQEAwQDAwMCAgIAAQAApQHsBgABAgMEBAQFBQQFBQUF","BQUEBAQEBAMDAgICAgEBAAEAwwFnBgABAQIDBAQEBAUEBQUFBQUFBQQDBAMDAwICAQECAQAA/QHYBQABAgICAwQEBQUFBQUFBQQFBAUEBAQDAwMCAgIBAQAA","qu0iPwEOGyg0P0pVX2lzfIWOlp+mrrW9w8rR193j6e7z+P0AAAAvHv8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACM9wAaBQEAAAAAAAAAAAAA","AAAAAAAAAAAAAAAAAAAAAAAAAACO/AB2HgwGAwIBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAvAtNvOxsOCAUDAwIBAQAAAAAAAAAAAAAAAAAAAAAAAAAA","AAANBc8AMSATDAcFAwMCAQIBAQEBAQEAAAAAAAAAAAAAAAAAAABNAPsANTEiFg8LCAUFBAICAgEBAAABAQEBAQEAAAAAAAAACABu/gsAKjcvIxoTDgoHBQUE","AwMCAgIBAQAAAAABAQEAAAAABAAV/wz4EScrJyAZEw8MCgcGBQQDAwICAQIBAQEBAAABAAAAEwDC/w73ABMfIh8cGBQQDQsIBwYFBAMDAwICAQEAAQAAAAAA","EgC3/xYCAAsWHB4cGhYTEA4MCQgHBgUEAwMCAgEBAQEAAQEAIQA8ABwIAAMMExcYFxcUEg8ODAkIBwYGBQMEAwICAQEBAAAALwB7Agz88fH1/QMICgsMCwsJ","CQgHBgYEBAQDAgICAQEBAQAARwCSBAD17ens7/X5/gEDBAQFBQUEBAMDAgICAgIBAQAAAAAAVgCOBQD69PDw8/X5/P7/AQMDAgMDAwMCAwIBAQEBAQEAAAAA","YACYBgD9+ff19ff5+/z/AAACAwIDAgICAQICAgEBAQABAAAAbwCRBwAA/fv6+vr7/P7+AAEAAQICAgICAgEBAQEBAAEAAQAAgwBrCAAAAP/+/v79/f7//wAB","AQEBAgECAQIBAQEBAQEBAAAApAAnCQABAQEA//////8AAAABAQECAQIBAgEBAQEAAQAAAAAAwgC0CQACAgICAgEBAQEBAQEBAQIBAQECAQEBAQEBAAEAAAEA","7wAKCgACAwMDAwMDAgICAgICAgEBAgIBAgEBAQEBAQABAP8A+wA9CgABAwMEAwMDAwMDAwMCAgMDAgICAQICAQEAAAAAAQEAMAE6CgACAwQEBAQEBAQDAwMD","AwICAgICAgEBAQABAQEAAAAAPgEZCgABAgMEBQUEBQQEBAQEAwMDAwICAgICAgIBAQAAAAAAXQHLCQACAwQEBAUFBQUFBQQEBAQDAwMDAgICAQEBAAEBAAAA","gwFvCQABAgMEBAQFBAUFBAQEBAQEAwMCAwMCAgICAgEAAQAAjQH8CAACAwMDBQUFBQUFBQUFBQQEBAQEAwICAgIBAQEBAAAAzQF8CAABAgMEBAQEBQUFBQUE","BAUEBAMDAwMDAwICAQEBAQAA+AH4BwABAgMDBAQFBQQEBQUFBQQEBAQEAwMCAgICAgEBAAEADAJyBwABAgIDAwQEBAUFBQUFBQUFBAQEBAQDAwICAQIBAQAA","UQLeBgABAQMDAwQEBQUFBAQFBAQEBQQDAwMDAgICAgEBAAAAcAJjBgAAAgIDBAQEBAQEBQUEBQUFBAQEBAMDAwMCAgEBAQAA0+j1SAEOGiYyPUhTXWdxeoOM","lJykrLS7wsnQ1tzi6O7z+P0AAAAwHv8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACN9wAaBQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA","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","cwDsAwD38Ovr7vL3+/4AAwQFBQYFBQQEBAMDAwMCAQEBAQEAmwDMBAD79fHw8fP1+Pv9/wECAwMDAwMCAgICAQEBAQEBAAAAvwCbBQD9+vf29fb3+fr9/v8A","AAECAgMDAgIBAgEBAQAAAQAA4AB5BgD//Pv5+fn6+vz8/f7/AAEBAQEBAgECAQEAAAEAAAAAGwE0BwAA//79/fz8/Pz9/v//AAABAQEBAAEBAQEBAQAAAP8A","MAHmBwAAAAD//v/+//////8AAAAAAQEBAgIBAQEBAQABAAEAiQFuCAABAgEBAQAAAP8AAAAAAQABAAABAAABAAAAAAH/AAAAkAHgCAABAgICAgICAQIBAQEB","AQIBAgIBAgIBAgEBAQABAAAAwQElCQACAQIDAwMDAgICAgICAgICAQECAQEBAQEBAAEBAQAAAQJMCQABAwMDAwMDAwMDAwMDAgICAgIBAgIBAQEBAQAAAAAA","NwJKCQABAgMDAwMDBAMEAwMDAwMCAwICAgECAQEBAQEAAAAASQIsCQABAgMDBAQFBAUEBAQEBAMEAwMDAgMCAgIBAQEBAQAAmAIBCQABAgIEBAQEBAQEBAUE","BAQDAwQDAwICAgICAQEAAAAAoQKwCAABAgMDAwQEBQUFBQQEBAQEBAMDAwMDAgICAgECAQEA5gJdCAABAQIDBAQEBAQEBQUFBAQFBAQEAwMDAwIBAQEBAAAA","BgMACAABAgMCAwQEBAQFBAQEBQUEBAQEBAMDAgICAgIAAQAAWwOTBwABAQIDAwMDBAQEBQQFBAQEBAMDAwMCAwICAQEBAAAAggMhBwAAAgECAwMEBAQEBAUE","BQQEBAQEAwMDAgMCAgEBAQEAb9x1XAENGCQvOUROWGJrdH2Gjpefp6+2vsXM09ng5uzy9/wAAAAxHv8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA","AACN9wAaBQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACS/AB3Hw0GAwIBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABfAtFuOxoOCQUDAwIBAQEA","AAAAAAAAAAAAAAAAAAAAAAAAAAAVBc8AMSIUDAgGBAMDAgEBAQEBAQEAAAAAAAAAAAAAAAAAAABSAPoANTIjFxALCAYEAwMDAgEBAAABAQEBAQEAAAAAAAAA","FgBk/gcAKzgxJRsUDgsIBgUEAwMCAgIBAQAAAAAAAAAAAAAABQA7/wf0DyUrKCEaFRANCwgGBQQEAwICAgICAQEBAQEBAAAAJACd/wj1ABQhIyEdGRQRDQsJ","CAYFBAMDAgIBAQEBAAAAAAAAJgBc/xD/AA0YHiEfHBkVEg8NCwkHBwYFBAMCAgEBAgEAAQAAOQC2/xQFAAUPFxocGxoXFRIQDQwKCAgGBQQEAwMCAQEBAAEA","WQBUABYHAAAFDBEVFhYWFBEPDgwLCQcHBgUEBAMDAgEBAP8AZwACARYKAP7/BAkMDxAREBEPDgwLCgkHBgYFBAMCAgICAgEAhACjAwD37+rr7vH2+/8AAwQF","BQYFBQQEBAMDAgIDAgEBAQEAtQBvBAD69PHv8PP2+Pr9AAECAwMDAwMDAgMCAgIBAAEAAAAA3AA/BQD8+PX09PX2+Pr8/f8AAQICAwMCAwECAgEAAQAA//8A","9wATBgD//Pr5+Pj5+vv8/f7/AAACAQECAgIBAQEBAQEAAQEAKgHMBgD///38+/v7/Pz+/v7//wAAAQIBAQICAQEBAQABAAAAcwF8BwAAAP///v7+/f79/v8A","/wAAAAABAAABAQEBAAEAAAAAlQERCAABAAEAAAD///8A/wAAAQABAQEBAgEAAQAAAQAAAAAAzgGICAABAgICAgEBAQEAAQAAAQEAAQEBAQEBAQEBAAEAAAAA","7QHeCAABAgICAgICAgICAgICAQICAgEBAQICAQEBAQABAQAANgIOCQABAgIDAwMDAwIDAgMCAwICAQICAQEBAQEBAQEAAAAAZgIZCQACAgMDAwQEAwQDBAMD","AgMDAwICAgIBAQEBAQEBAQAApAIQCQABAgMDBAMDBAQEAwMEBAMDAwMDAgICAgIBAQAAAAAAtgLpCAABAgIDAwQEBAQEBQUEBAQDAwMDAwIDAgICAQIBAAEA","+gKtCAABAQMDBAQEBQQEBAQEBAQEBAQDAwMCAgIBAQEBAQAAMwNhCAAAAgIDAwMEBAUFBAQFBAQEBAMDAwMDAgICAgEBAAAAYgMMCAABAgIDAwQEBAQEBQUE","BAQEAwQEBAMCAwICAQEBAQAAngOrBwABAQICAwMEBAQEBAQEBQQEBQQDAwMDAwICAgEBAAEAkQNCBwABAQICAwMDBAQFBAUFBAUFBAQEBAQEAwMCAgIBAQAA","9dj8YAEMGCMuOENNVmBpc3uEjZWdpa21vMPK0djf5evx9/wAAAAxHv8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACN9wAaBQEAAAAAAAAAAAAA","AAAAAAAAAAAAAAAAAAAAAAAAAACR/AB3Hw0GAwIBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABcAtFuOxoOCQUDAwIBAQEAAAAAAAAAAAAAAAAAAAAAAAAA","AAAVBc8AMSIUDAgGBAMDAgECAQEBAQEAAAAAAAAAAAAAAAAAAABQAPkANTIkGBALCAYEAwMCAgEBAQABAQEBAQEAAAAAAAAAGABj/ggAKzgwJRwVDwsIBwUE","AwMCAQICAQAAAAAAAAAAAAAACgA//wb0DyUsJyAaFRANCggGBQQEAwIBAgICAQEBAQEAAAAAKQCb/wf1ABQgIyEdGBURDQsJCAYFBAQDAgIBAQABAAAAAAAA","JwBT/w/+AA4ZHyEfHRkWExANCwoHBwUFBAMDAgIBAgEBAQAAPgC5/xIE/wQOFxscGxoXFRIQDQsKCAcGBQUDBAMCAQEBAAAAXQBGABUG/wAGDBIVFxYWExIQ","Dw0LCggHBgUFAwMDAgIBAQEAawDBABcLAv8BBgoOEBMTExERDw0NCwoIBwYFBQQDAwICAgEApQD8AgX78+/v8vb6/gEDBQcGBwgGBQYFBAQDAgICAQEA/wAA","wQAoBAD69PDv8PL1+fv9AAECAwMEBAMEAwICAgEBAQABAQAA8gDwBAD8+PXz8/T29/n8/f8AAAEBAgIBAwICAQIBAAEAAP8AEAHABQD++/n49/f4+fr7/f4A","AAECAgIDAgICAgEBAgAAAAEAUwF7BgD//v37+vv7+/z9/f7+AP8AAQEBAQEBAgEBAAEBAAAAlwEpBwAAAP7+/v39/f39/v7//wAAAAAAAAEBAAEBAQEAAAAA","sQHABwABAAAA///+//////8AAAAAAQEBAgEBAQEBAQABAQAA7wE1CAABAQIBAQEBAAABAAEAAQEBAAEBAAEBAQEAAAEBAAAAMAKZCAABAgICAgICAgIBAgEC","AQEBAgEBAQEBAQABAQAAAAAAZQLUCAABAgICAwIDAgICAgICAgICAQICAgEBAQEBAAAAAQAAsgLvCAABAgIDAwMDAwMDAwMCAgMCAgIBAQIBAQEBAQEA/wAA","1gLvCAABAQMDAwQDBAQEAwMEBAMDAwIDAwICAgIBAQEBAQAA7wLQCAABAgIDBAQEBAQEBQQEBAQEBAQDAgIDAgICAgEBAAEAPwOhCAABAgMDAwMEBAQEBAUE","BAMEAwMDAwMCAgIBAQEAAQAAYANiCAABAgIDAwQEBAQFBAQEBAUEBAQEBAMDAwICAQEBAQAAkgMSCAABAQIDAwMEBAUEBQQFBAQEBAQDAwMDAgICAgIBAAEA","tQO0BwAAAgICAwQDBAQEBAUEBQQEBAQEBAQDAwICAgEBAQAA5QNYBwABAQICAwMEBAQEBAQFBAUEBAQEAwMDAwMCAgICAQAAv9X3ZAEMFyItN0FLVV5ocXqC","i5OcpKuzu8LJ0Nfe5Orw9vwAAAAwHv8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACN9wAaBQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA","AACR/AB3Hw0GAwIBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABWAtFuOxoOCQUDAwIBAQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAUBc8AMSIUDAgGBAMDAgEC","AQEBAQEAAAAAAAAAAAAAAAAAAABRAPkANTIkGBALCAYEBAMCAgIBAQABAQEBAQEAAAAAAAAAHABd/gcALDgwJRwVDwsIBgUEAwICAQICAQAAAAAAAAAAAAAA","CQBE/wb0DiUsJyAaFRANCggGBgUEAwIBAgICAQECAQEAAAAALACU/wb0ABUgJCIdGRUSDgsKBwUFBQQDAgIBAQAAAAABAAAALwBN/w//AA0aHyEgHBoVEhAN","CwoIBgUFBAMDAwIBAgEAAQAAQQC+/xAC/wQOFhscHBkYFRIQDgwKCAgGBQUEAwMDAQEBAAEAXwA8ABQG/wAGDRIVFxcWFRMQDw0LCwgHBwUEBAMCAwICAQAA","gwCjABcLAQACBwsPERMTExIRDw0MCwoJBwYGBAQDAgIBAQEAsQBaAgoA+fTz9/v/AgUHCAkJCQkIBwcGBQUDAwICAQEAAP8A1gDwAwD58+/v7/H1+fv9AAED","AwQFBAMDAwMDAgICAQABAQAAAwGzBAD89/Ty8vT19/r8/f8AAQICAwMDAwICAgIBAQEBAAEALwF7BQD++/j39vb3+Pn7/P7/AAABAQECAQICAgEBAQEAAAAA","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","2QLLBwABAQEBAQEAAQEAAAABAQEAAQEAAAABAAAAAAEAAP8AGwMlCAABAQECAQECAQEBAQEBAQEBAQECAQEBAQEBAQAAAAEAYwNZCAAAAQICAwMCAwICAgIC","AgICAgIBAgIBAQEBAQEAAP8ApgNxCAABAgMCAgMDAwMDAwMCAgICAgICAgIBAgEBAAEBAQEAxwN6CAABAgIDAwMEAwQEBAQEBAQEAwMDAgIDAQIBAgEBAQAA","+gNmCAABAQIDAwMDBAQEBAQEBAMEBAMDAwMCAwICAQEBAAEARARFCAABAgICAwMEBAQEBAQEBAQDBAQEBAMDAgICAgEBAQAAYQQOCAABAQIDAwQEBAQFBAQF","BAUFBAQDAwMDAwICAgIBAAAAcwTJBwAAAgICAwMDBAQEBQUEBQQEBAQFBAQDAwMCAgEBAQEAnAR9BwABAQIDAwMEBAQEBAQFBAUFBQUEBAMEAwMDAgICAQAA","GMqGcAELFR8pMz1GT1lia3R8hY2VnaWttb3EzNPa4eju9fsAAAAuHv8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACL9wAaBQEAAAAAAAAAAAAA","AAAAAAAAAAAAAAAAAAAAAAAAAACL/AB2Hg0GAwIBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA5AtJvPBoOCQUDAwICAQEAAAAAAAAAAAAAAAAAAAAAAAAA","AAALBc4AMSIUDAgGBAMCAgECAQEBAQEAAAAAAAAAAAAAAAAAAQBKAPgANTIjGBALCAYFBAMCAgIBAQABAQEBAQEAAAAAAAAAKABb/gcAKzgxJRwVDwsIBgUE","BAMCAgIBAQEAAAABAAAAAAAACABE/wTzDyUrJyEaFRENCwkHBQQEAwMDAgECAgEBAQEBAAAAPgCF/wX0ABUiJSEeGhUSDgsJCAYFBAMDAgIBAAEAAQAAAAAA","NgBG/wz9AA0ZICIhHRsWExEODAoJBwYFBQQDAwICAQIBAQEAVADH/w4A/QQOFRsbHBkYFhIRDgwKCQgGBQUFAwMCAgEAAQAAfgAeABAF/gAHDhMXGBgYFRQS","EA8NCwkJBwYEBQMDAgICAAAAtwCAABQIAQACCA0RExQUFBMREA4MDAoICAYFBAQDAgAAAQAA4QAKARQLBAAAAwcKDQ8QEREQDw4NCwsJCAcHBQQDAwMCAAAA","BAHlAgb+9/Pz9PX5/AACBAUGBwcIBwYGBQUEBAMDAgICAgEASQEFBAD79vLw8PL09/n7/f8BAgMDBAQEBAMEAwMCAgEBAQEAmgG+BAD9+fb19PT19vj6+/3+","/wAAAQICAgIBAgEBAQEAAAAA5gFvBQD++/r49/j4+Pn6/P39/v8AAAABAQEBAAEBAQAAAP8ALAITBgD//v38+/r6+/v7/Pz+/v7//wAAAAEBAQEBAQEBAAEA","fgKuBgAAAP79/f39/Pz9/f7+////AP8AAQAAAQEBAAAAAQAAzwI7BwAAAAAA///+/v7+/v7+//8A/wAA/wEBAAAAAAEA/wAADAOmBwAAAQEBAQAAAAAAAAAA","/wAAAQEAAQAAAAAAAAABAAAARQMACAABAQEBAgIBAgIBAQEBAQEBAQEBAAEBAQEBAQAAAQAAjQMzCAABAQICAgIDAgICAgICAgICAQEBAgEBAQEBAQEAAAAA","4wNWCAABAgIDAgMDAwMDAwIDAwMCAgICAgEBAQEAAAAAAAAA8gNnCAABAQICAwMDAwMEAwQDAwMDAwMDAgMCAgICAgEBAQAAOQRZCAAAAgMDAwMDBAQEBAQE","BAQEBAMDAwIDAwIBAQEBAAEAXwQ4CAABAQICAwQEBAQEBAQFBAQEBAQEBAQDAgIDAgIBAQAAjgQLCAABAgIDAwMEBAQEBQUEBAQEBAQDAwMDAwICAQEBAQAA","oATLBwABAQICAwMEBAUEBAQFBQUEBAQFBAQDAwMCAwICAQEA1wSFBwAAAQEDAwMDBAMEBAUEBAQFBQUEBAMEAwMDAgIBAAAAW8fAcgELFR8oMjxFTlhhanJ7","hIyUnKSstLzDy9LZ4Ofu9fsAAAAsHv8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACM9wAaBQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA","AACJ/AB2Hg0GAwIBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAvAtJvPBoOCQUDAwICAQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAFBc4AMSEUDAgGBAMCAgEC","AQEBAQEAAAAAAAAAAAAAAAAAAQBHAPgANTIjFxALCAYFBAMCAwIBAQEBAQEBAQEBAAAAAAAALABc/gcAKzkxJRwVDwsIBgUEAwMDAgEBAQEAAAD/AAAAAAAA","CgBC/wTzDyUrKCEaFRENCwkHBQQDAwMDAgECAQECAQEBAAAAOwCE/wX0ABUiJSEfGhYSDgwKCAcGBAQDAwICAgEBAQEAAQAAQgBM/wv9AA0ZICIgHRoWExAO","DAkIBwUFBAQCAgIBAQABAAAAWADB/w0A/QQOFhwcHBoYFhMQDg0KCQgGBQUFAwMCAgEAAQEAhwAfABAD/QAHDRMXGRgYFhQSEA4NCwoJBwYFBQMDAgICAAAA","swB4ABMJAQADCQ0RExQVFRMSEQ8ODQoJCAcFBQQDAwIBAQEA6wADARQKBAAAAwcKDRAQEBERDw4NCwsJCQcHBQUEAgICAQAAHQGGAgkB+vb29/j8/wIEBgcH","CQkICAcHBgUFBAMDAwIBAQAAaQHmAwD79vLw8PL09/n8/f8BAQIDBAQDAwMCAwICAQEBAAEAogGcBAD9+fb08/T19vj5/P3+AAEBAQIDAwMDAgMCAgIBAQAA","+wFIBQD9+/r49/f3+Pn6+/3+/v4AAAABAQEBAQEBAQAAAQAAVwLuBQD//vz7+vr6+vr7+/z8/v/+/wAA/wAAAAAAAAEA/wAAmgKKBgAA//79/fz8/Pz8/f3+","/v7/AAAAAQEBAQEBAQABAQAAAAMWBwAA///////+/f3+/v7+/v///v//AAD/AP//AAD/AAAAJAOABwABAQEBAQAAAAAA/wAAAAAAAQAAAAABAAEBAAABAAAA","hgPgBwAAAQEBAQEBAQEAAQABAAABAAABAAABAQAAAAAAAAAAtwMaCAABAgICAgICAgICAgIBAgICAgIBAgEBAQIBAQEAAAAA/QM8CAABAQICAgMDAwMDAwMD","AwMCAgICAgIBAQEBAQEBAAAANwRQCAABAgIDAwMDAwMEAwMDAwMDAwMDAgICAgEBAQEBAQEAWgRICAABAQICAwMEBAQEBAQEBAQEBAQDAwMDAgICAQEBAQAA","kAQwCAAAAgIDAwQDBAQEBQUFBAQEBAMEBAMDAwICAgEBAAAApQQBCAABAQIDAwMEBAUEBAQEBQQEBAUEAwQDAwMDAgIBAQAA0QTKBwABAQICAwMEBAQFBQUF","BAUFBQQEBAQDAwMCAgIBAQEA7ASIBwAAAgICAwQDBAQEBAQFBQUEBAQEBAQEAwMDAgEBAQAAVuzQPQHB3Ov9Dx8vPUpWYm13gYmSmaCmrLC2u7/Dx8vP0tbX","uQHZ/wD8/f7+/v/+/v8AAAAAAAAAAAAAAAD/////AP////7/MALQ/wD0+/z9//7/AP///wAAAAAAAAAAAAAAAAD//////v/+qAG6/wD8/f/+/f7+/v//AAAA","AAAAAAAA/wAAAP/////+//7/QQKn/wD8/P39/v3///8AAP8AAAAAAAAAAP///////v///v79xAGO/wD7/fz9/f7+/////wD//wAAAP//AAD///////7+/v7+","wgGf/wAC+/v8/f79/f7+//8AAQAAAAAA//7//v7+/v39/fz8VQJGAAD4+fr7+/v8/f3+/wAA/wAA/////v79/Pz8+/v7+vv72gF2AADv9vr6+vr8/f8A/wAA","AAAAAAD////+/vz6+vr5+fn4uwG/AAAA+PX4+fv9/wAAAQAAAQD/AP///v79/Pz8+vj39/b2PwHdAADo9vb2/P8AAAABAAEBAAAA///+/v39/fz7+/r59vTz","0P8GAQDz7/n/AQICAgIBAgEAAP///v39/fz7+vr5+Pn49/b1//2CAADx+AIEBAUFBQQEAgIBAAD+/f37+vn5+Pf39/X09fTzKPqh/wDpCQ0MCQkJBwcEBAEA","/vz7+vj39fTz8vHw7+/v7u7u6fFT/QAhFBEUExENCwcFAP359vLv6+jl4+Hf3t3c29vc3N3e4NwFyACnYf2fYTojFAwHBgcKDhUbJC03QUtVX2lzfYaOl5+m","RP96cAABDVGXxN3r8/f6/P3+//8AABQ9ZYScr8DQ2eLr8vr/VQGjSf8JBgQDAgEBAAAAAAAAAQEBAu7GnoBpVkY2LiUdFg8KswGmJgAaBAMDAgIBAQEAAAAA","//8A/wD/AP//AP8AAAEAAQEBRQKgGAAiBQUDAwICAgEBAQAAAAD/AP8AAAAAAAEBAQECAgID+AJTEQAZGAUFAwMCAQEBAAEAAAAAAAAAAAEBAQEBAQECAgIC","0APFDAALEBcGBAMDAgEBAQAAAAAAAAAAAAAAAQEBAgICAwMHpwSLCgD3Dg8SCQQCAgIBAAABAAAAAAAAAAEBAQECAgMECA0OkgVwCAAOCAYLDAoEAwIBAQEA","AAAAAAABAQABAQICBQgLCgkIdgbNBgD3AAYGCAgJBQICAQAAAAAAAAEAAAEBAgUIBwcGBgUFZgciBgD9/wACAgIEBQUDAgEAAAAAAAAAAgMFBQUEBAMDAgIC","twihBAAE/f3+/wEAAAEBAQEBAQAAAAECAQEBAQAAAAD////+pggFBAD7/fz9/f7+/////wD//wAAAP//AAD///////7+/v7+dQcKBAD8/P39/v3///8AAP8A","AAAAAAAAAP///////v///v79hwYVAwD8/f/+/f7+/v//AAAAAAAAAAAA/wAAAP/////+//7/0gVIAwD0+/z9//7/AP///wAAAAAAAAAAAAD/AAD//////v/+","NwWeAgD8/f7+/v/+/v8AAAAAAAAAAAAAAAAA////AP////7/"].join(""),mp="AAAAAAcAHgBVALwAYQFXAq8DfAXJB6EKDw4WEr8WCRzvIXAogi8VNxk/gEc8UDNZUGJ8a6N0r32Ohi6Pgpd/nw==",gp="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";let wr;function yc(){if(wr)return wr;const i=atob(dp)+atob(hp)+atob(pp),e=new Float32Array(Zt*MA);let t=0,A=0;const a=new Uint8Array(Zt);let r=0;for(let s=0;s<MA;s++){if(s===Zi||s>=Ht&&s<ei)continue;const o=r++*(Zt+4);t=t+(i.charCodeAt(o)|i.charCodeAt(o+1)<<8)&65535,A=A+(i.charCodeAt(o+2)|i.charCodeAt(o+3)<<8)&65535;for(let l=0;l<Zt;l++){const c=a[l]+i.charCodeAt(o+4+l)&255;a[l]=c,e[s*Zt+l]=(t+(A-t)*c/255)/65535}}const n=atob(mp)+atob(gp);for(let s=0;s<1056;s++){const o=(n.charCodeAt(s*2)|n.charCodeAt(s*2+1)<<8)/65535,l=s<32?Zi*32+s:Ht*32+s-32;e[l]=o}return wr=e,e}const Js=[0,1,2,3,4,5,6];function vp(i=!0,e=!1){return`
const OPENPBR_LOBE_FUZZ: i32 = 0;
const OPENPBR_LOBE_COAT: i32 = 1;
const OPENPBR_LOBE_METAL: i32 = 2;
const OPENPBR_LOBE_SPECULAR: i32 = 3;
const OPENPBR_LOBE_TRANSMISSION: i32 = 4;
const OPENPBR_LOBE_DIFFUSE: i32 = 5;
const OPENPBR_LOBE_SUBSURFACE: i32 = 6;
const OPENPBR_LOBE_COUNT: i32 = ${Js.length};




struct bq {
tangent: vec3f,
bitangent: vec3f,
normal: vec3f,
};

struct ag {
material: OpenPbrResolvedMaterial,
basis: bq,
${i?`
coatBasis: bq,
directionFrames: bool,
`:""}
${e?"    coatViewLocal: vec3f,":""}
viewLocal: vec3f,
diffuseColor: vec3f,
specularEtaTOverEtaI: f32,
refractionEtaTOverEtaI: f32,
transmissionReflectionIor: f32,
thinFilmExteriorIor: f32,
thinFilmBaseIor: f32,
specularAlpha: f32,
diffuseSpecularEnergyCompensation: f32,
coatBaseScale: vec3f,
metalMsScale: vec3f,
metalMsFactor: f32,
metalMsProbability: f32,

dielectricMsReflectionScale: vec3f,
dielectricMsTransmissionScale: vec3f,
dielectricMsViewLoss: f32,
dielectricMsReflectionRatio: f32,
dielectricMsProbability: f32,

weights: array<f32, OPENPBR_LOBE_COUNT>,
probabilities: array<f32, OPENPBR_LOBE_COUNT>,
};

fn aE(color: vec3f) -> f32 {
return dot(color, vec3f(0.212671, 0.715160, 0.072169));
}

fn dd(bE: f32) -> f32 {
let value = (bE - 1.0) / (bE + 1.0);
return value * value;
}

fn bi(
bE: f32,
specularWeight: f32
) -> f32 {
let uh = min(
dd(bE) * specularWeight,
0.9999
);
let uj = sqrt(uh);
let lR = (1.0 + uj) / (1.0 - uj);
return select(lR, 1.0 / lR, bE < 1.0);
}

fn af(ci: f32, relativeIor: f32) -> f32 {
if (abs(relativeIor - 1.0) < 1e-6) {
return 0.0;
}
return cC(ci, relativeIor);
}

fn aG(ior: f32) -> f32 {
if (ior < 1.0) {
return 15.0 - ((1.0 / ior - 1.0) / 1.5) * 15.0;
}
return 16.0 + ((ior - 1.0) / 1.5) * 15.0;
}

fn F(tB: i32, row: i32) -> f32 {
return textureLoad(openPbrEnergyLut, vec2i(tB, row), 0).r;
}

fn gt(
dU: f32,
bV: f32,
im: f32
) -> f32 {
let bH = clamp(dU, 0.0, 31.0);
let aL = clamp(bV, 0.0, 31.0);
let bD = clamp(im, 0.0, 31.0);
let ef = i32(floor(bH));
let aT = i32(floor(aL));
let cQ = i32(floor(bD));
let hU = min(ef + 1, 31);
let cu = min(aT + 1, 31);
let fb = min(cQ + 1, 31);
let cv = bH - f32(ef);
let cI = aL - f32(aT);
let lj = bD - f32(cQ);

let wb = F(cQ, ef * 32 + aT);
let wc = F(fb, ef * 32 + aT);
let wd = F(cQ, ef * 32 + cu);
let wf = F(fb, ef * 32 + cu);
let wg = F(cQ, hU * 32 + aT);
let wh = F(fb, hU * 32 + aT);
let wi = F(cQ, hU * 32 + cu);
let wj = F(fb, hU * 32 + cu);
let v00 = mix(wb, wg, cv);
let v01 = mix(wc, wh, cv);
let v10 = mix(wd, wi, cv);
let v11 = mix(wf, wj, cv);
return mix(
mix(v00, v10, cI),
mix(v01, v11, cI),
lj
);
}

fn gS(dU: f32, bV: f32) -> f32 {
let bH = clamp(dU, 0.0, 31.0);
let aL = clamp(bV, 0.0, 31.0);
let ef = i32(floor(bH));
let aT = i32(floor(aL));
let hU = min(ef + 1, 31);
let cu = min(aT + 1, 31);
let cv = bH - f32(ef);
let cI = aL - f32(aT);
let v00 = F(aT, 1024 + ef);
let v01 = F(cu, 1024 + ef);
let v10 = F(aT, 1024 + hU);
let v11 = F(cu, 1024 + hU);
return mix(
mix(v00, v10, cv),
mix(v01, v11, cv),
cI
);
}



fn ev(
dU: f32,
bV: f32,
im: f32
) -> f32 {
let bH = clamp(dU, 0.0, 31.0);
let aL = clamp(bV, 0.0, 31.0);
let bD = clamp(im, 0.0, 31.0);
let ef = i32(floor(bH));
let aT = i32(floor(aL));
let cQ = i32(floor(bD));
let hU = min(ef + 1, 31);
let cu = min(aT + 1, 31);
let fb = min(cQ + 1, 31);
let cv = bH - f32(ef);
let cI = aL - f32(aT);
let lj = bD - f32(cQ);

let wb = F(cQ, ${dt} + ef * 32 + aT);
let wc = F(fb, ${dt} + ef * 32 + aT);
let wd = F(cQ, ${dt} + ef * 32 + cu);
let wf = F(fb, ${dt} + ef * 32 + cu);
let wg = F(cQ, ${dt} + hU * 32 + aT);
let wh = F(fb, ${dt} + hU * 32 + aT);
let wi = F(cQ, ${dt} + hU * 32 + cu);
let wj = F(fb, ${dt} + hU * 32 + cu);
let v00 = mix(wb, wg, cv);
let v01 = mix(wc, wh, cv);
let v10 = mix(wd, wi, cv);
let v11 = mix(wf, wj, cv);
return mix(
mix(v00, v10, cI),
mix(v01, v11, cI),
lj
);
}

fn eu(dU: f32, bV: f32) -> f32 {
let bH = clamp(dU, 0.0, 31.0);
let aL = clamp(bV, 0.0, 31.0);
let ef = i32(floor(bH));
let aT = i32(floor(aL));
let hU = min(ef + 1, 31);
let cu = min(aT + 1, 31);
let cv = bH - f32(ef);
let cI = aL - f32(aT);
let v00 = F(aT, ${Ht} + ef);
let v01 = F(cu, ${Ht} + ef);
let v10 = F(aT, ${Ht} + hU);
let v11 = F(cu, ${Ht} + hU);
return mix(
mix(v00, v10, cv),
mix(v01, v11, cv),
cI
);
}

fn eR(dU: f32, bV: f32) -> f32 {
let bH = clamp(dU, 0.0, 31.0);
let aL = clamp(bV, 0.0, 31.0);
let ef = i32(floor(bH));
let aT = i32(floor(aL));
let hU = min(ef + 1, 31);
let cu = min(aT + 1, 31);
let cv = bH - f32(ef);
let cI = aL - f32(aT);
let v00 = F(aT, ${ei} + ef);
let v01 = F(cu, ${ei} + ef);
let v10 = F(aT, ${ei} + hU);
let v11 = F(cu, ${ei} + hU);
return mix(
mix(v00, v10, cv),
mix(v01, v11, cv),
cI
);
}

fn bb(ior: f32, alpha: f32, cosine: f32) -> f32 {
return ev(aG(ior), sqrt(alpha) * 31.0, cosine * 31.0);
}
fn bf(ior: f32, alpha: f32) -> f32 {
return eu(aG(ior), sqrt(alpha) * 31.0);
}
fn ck(ior: f32, alpha: f32) -> f32 {
return eR(aG(ior), sqrt(alpha) * 31.0);
}



fn aV(alpha: f32, cosine: f32) -> f32 {
let iF = clamp(sqrt(alpha) * 31.0, 0.0, 31.0);
let bD = clamp(cosine * 31.0, 0.0, 31.0);
let r0 = i32(floor(iF));
let c0 = i32(floor(bD));
let r1 = min(r0 + 1, 31);
let c1 = min(c0 + 1, 31);
return mix(
mix(F(c0, ${ni} + r0), F(c1, ${ni} + r0), fract(bD)),
mix(F(c0, ${ni} + r1), F(c1, ${ni} + r1), fract(bD)),
fract(iF));
}

fn cD(alpha: f32) -> f32 {
let index = clamp(sqrt(alpha) * 31.0, 0.0, 31.0);
let i0 = i32(floor(index));
return mix(F(i0, ${Zi}),
F(min(i0 + 1, 31), ${Zi}), fract(index));
}

fn bd(value: f32, ior: f32) -> f32 {
if ((ior > 2.5) | (ior < 0.4)) {
let vu = dd(2.5);
let progress = (dd(ior) - vu) / (1.0 - vu);
return (1.0 - progress) * value;
}
return value;
}

fn aw(
ior: f32,
alpha: f32,
cosine: f32
) -> f32 {
let value = gt(
aG(ior),
sqrt(alpha) * 31.0,
cosine * 31.0
);
return bd(value, ior);
}

fn cA(ior: f32, alpha: f32) -> f32 {
let value = gS(
aG(ior),
sqrt(alpha) * 31.0
);
return bd(value, ior);
}

fn openpbr_to_world(basis: bq, direction: vec3f) -> vec3f {
return direction.x * basis.tangent
+ direction.y * basis.bitangent
+ direction.z * basis.normal;
}

fn openpbr_to_local(basis: bq, direction: vec3f) -> vec3f {
return vec3f(
dot(direction, basis.tangent),
dot(direction, basis.bitangent),
dot(direction, basis.normal)
);
}

fn fD(
aX: vec3f,
normal: vec3f,
anisotropy: f32
) -> bq {
var basis: bq;
basis.normal = normal;
var tangent = aX;
var bitangent = vec3f(0.0);
if ((dot(tangent, tangent) < 0.001) | (anisotropy <= 0.0)) {
aP(normal, &tangent, &bitangent);
}
else {
bitangent = normalize(cross(normal, tangent));
tangent = normalize(cross(bitangent, normal));
}
basis.tangent = tangent;
basis.bitangent = bitangent;
return basis;
}

fn kF(
aB: f32,
am: f32,
J: f32,
ae: f32
) -> f32 {
return (aB * J - am * ae)
/ (aB * J + am * ae);
}

fn kE(
aB: f32,
am: f32,
J: f32,
ae: f32
) -> f32 {
return (am * J - aB * ae)
/ (aB * ae + am * J);
}

fn ht(
aB: f32,
am: f32,
J: f32,
ae: f32
) -> f32 {
return 2.0 * aB * J
/ (aB * J + am * ae);
}

fn hs(
aB: f32,
am: f32,
J: f32,
ae: f32
) -> f32 {
return 2.0 * aB * J
/ (aB * ae + am * J);
}

fn aY(a: vec2f, b: vec2f) -> vec2f {
return vec2f(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
}

fn bj(a: vec2f, b: vec2f) -> vec2f {
let aq = max(dot(b, b), 1e-9);
return vec2f(
(a.x * b.x + a.y * b.y) / aq,
(a.y * b.x - a.x * b.y) / aq
);
}

fn iA(value: vec2f) -> vec2f {
let gR = length(value);
let uf = sqrt(max(0.0, 0.5 * (gR + value.x)));
let fw = sqrt(max(0.0, 0.5 * (gR - value.x)));
return vec2f(uf, select(-fw, fw, value.y >= 0.0));
}

fn ce(
J: f32,
aB: f32,
am: vec2f,
rM: bool
) -> vec2f {
let pg = sqrt(max(0.0, 1.0 - J * J));
let tP = bj(vec2f(aB, 0.0), am);
let hQ = tP * pg;
var ae = iA(
vec2f(1.0, 0.0) - aY(hQ, hQ)
);
if (aY(am, ae).y < 0.0) {
ae = -ae;
}

let fZ = vec2f(aB * J, 0.0);
let eJ = aY(am, ae);
if (rM) {
let cl = am * J;
let cj = ae * aB;
return bj(
cl - cj,
cl + cj
);
}
return bj(
fZ - eJ,
fZ + eJ
);
}

fn eE(
iZ: f32,
ha: f32,
pw: f32,
nL: f32,
kL: vec2f,
phase: f32
) -> f32 {
let ol = vec2f(cos(phase), sin(phase));
let iD = aY(kL, ol);
let lv = iD * (ha * nL);
let aq = vec2f(1.0, 0.0) - iD * pw;
let hP = vec2f(iZ, 0.0)
+ bj(lv, aq);
return dot(hP, hP);
}

fn au(
J: f32,
wavelength: f32,
ct: f32,
aR: f32,
cn: f32,
eG: vec2f
) -> f32 {
let dF = clamp(abs(J), 1e-5, 1.0);
let hI = pow(aR / cn, 2.0)
* (1.0 - dF * dF);
if (hI >= 1.0) {
return 1.0;
}
let dc = sqrt(1.0 - hI);
let lL = kF(
aR, cn, dF, dc
);
let lK = kE(
aR, cn, dF, dc
);
let jG = ht(
aR, cn, dF, dc
);
let jF = hs(
aR, cn, dF, dc
);
let gG = cn * dc
/ max(aR * dF, 1e-9);
let phase = 2.0 * PI * (2.0 * cn * ct * dc) / wavelength;
var reflectance = 0.0;

for (var kJ = 0u; kJ < (rtUniform.loopUnrollGuard >> 1u); kJ++) {
let iZ = select(lL, lK, kJ == 1u);
let ha = select(jG, jF, kJ == 1u);
let kL = ce(
dc, cn, eG, kJ == 1u);
reflectance += eE(iZ, ha,
-iZ, ha * gG, kL, phase);
}
return clamp(0.5 * reflectance, 0.0, 1.0);
}




fn cw(cosine: f32, f0: vec3f, tint: vec3f) -> vec3f {
let sr = mix(f0, vec3f(1.0), aI(cosine));
if (all(tint == vec3f(1.0))) { return sr; }
let dD = 1.0 / 7.0;
let mY = 1.0 - dD;
let fX = mix(f0, vec3f(1.0), aI(dD));
let dw = 1.0 - cosine;
let ru = cosine * aI(cosine) * dw
/ (dD * pow(mY, 6.0));
return clamp(sr - ru * (fX - tint * fX), vec3f(0.0), vec3f(1.0));
}

fn cX(f0: f32, uN: f32) -> vec2f {
let dY = clamp(f0, 0.0, 0.99);
let gZ = sqrt(dY);
let rK = (1.0 - dY) / (1.0 + dY);
let rH = (1.0 + gZ) / max(1.0 - gZ, 1e-9);
let ior = mix(rH, rK, clamp(uN, 0.0, 1.0));
let kp = (
(ior + 1.0) * (ior + 1.0) * dY
- (ior - 1.0) * (ior - 1.0)
) / max(1.0 - dY, 1e-9);
return vec2f(ior, sqrt(max(kp, 0.0)));
}


fn bS(ct: f32, weight: f32) -> f32 {
return clamp(weight, 0.0, 1.0) * smoothstep(1e-9, 30.0, ct);
}



fn bJ(
material: OpenPbrResolvedMaterial,
color: vec3f,
viewLocal: vec3f,
lightLocal: vec3f,
fJ: f32,
pdf: ptr<function, f32>
) -> vec3f {
*pdf = 0.0;
if (lightLocal.z <= 0.0) {
return vec3f(0.0);
}

let roughness = material.diffuseRoughness;
let hl = 0.5 - 2.0 / (3.0 * PI);
let pc = 2.0 / 3.0 - 28.0 / (15.0 * PI);
let pp = lightLocal.z;
let nt = viewLocal.z;
let directional = dot(lightLocal, viewLocal) - pp * nt;
let hh = select(
directional,
directional / max(max(pp, nt), 1e-7),
directional > 0.0
);
let iJ = 1.0 / (1.0 + hl * roughness);
let ot = color * INVPI * iJ
* (1.0 + roughness * hh);

let dr = 1.0 - pp;
let outputComplement = 1.0 - nt;
let ph = dr * (
0.0571085289 + dr * (
0.491881867 + dr * (
-0.332181442 + dr * 0.0714429953
)
)
);
let outputGOverPi = outputComplement * (
0.0571085289 + outputComplement * (
0.491881867 + outputComplement * (
-0.332181442 + outputComplement * 0.0714429953
)
)
);
let qr = (1.0 + roughness * ph)
/ (1.0 + hl * roughness);
let outputAlbedo = (1.0 + roughness * outputGOverPi)
/ (1.0 + hl * roughness);
let gi = iJ * (1.0 + pc * roughness);
let hV = color * color * gi
/ max(vec3f(1e-7), vec3f(1.0) - color * (1.0 - gi));
let mn = hV * INVPI
* max(1e-7, 1.0 - outputAlbedo)
* max(1e-7, 1.0 - qr)
/ max(1e-7, 1.0 - gi);
*pdf = lightLocal.z * INVPI;
return (ot + mn) * fJ;
}

fn aU(viewCosine: f32, roughness: f32) -> f32 {
let x = clamp(viewCosine, 0.0, 1.0);
let y = clamp(roughness, 0.01, 1.0);
let scale = y * (0.0206607 + 1.58491 * y)
/ (0.0379424 + y * (1.32227 + y));
let mean = y * (-0.193854 + y * (-1.14885 + y * (1.7932 - 0.95943 * y * y)))
/ (0.046391 + y);
let offset = y * (0.000654023 + (-0.0207818 + 0.119681 * y) * y)
/ (1.26264 + y * (-1.92021 + y));
let gaussian = exp(-0.5 * pow((x - mean) / scale, 2.0))
/ (scale * sqrt(2.0 * PI));
return max(gaussian + offset, 0.0);
}

fn kD(
material: OpenPbrResolvedMaterial,
viewLocal: vec3f,
lightLocal: vec3f,
pdf: ptr<function, f32>
) -> vec3f {
*pdf = 0.0;
if ((viewLocal.z <= 0.0) | (lightLocal.z <= 0.0)) {
return vec3f(0.0);
}
let albedo = aU(
viewLocal.z,
material.fuzzRoughness
);
*pdf = lightLocal.z * INVPI;
return material.fuzzColor * albedo * INVPI;
}

fn ao(
material: OpenPbrResolvedMaterial,
viewLocal: vec3f,
lightLocal: vec3f,
ad: vec3f,
bG: vec3f,
pdf: ptr<function, f32>
) -> vec3f {
*pdf = 0.0;
if (lightLocal.z <= 0.0) {
return vec3f(0.0);
}

let alpha = vec2f(material.alphaX, material.alphaY);
let distribution = cW(ad, alpha);
let kz = aF(viewLocal, alpha);
let ep = kz
* aF(lightLocal, alpha);

*pdf = kz * distribution / (4.0 * max(viewLocal.z, 1e-8));
return bG * distribution * ep
/ (4.0 * max(lightLocal.z * viewLocal.z, 1e-8));
}

fn dE(
material: OpenPbrResolvedMaterial,
relativeIor: f32,
tint: vec3f,
viewLocal: vec3f,
lightLocal: vec3f,
ad: vec3f,
bG: vec3f,
pdf: ptr<function, f32>
) -> vec3f {
*pdf = 0.0;
if (lightLocal.z >= 0.0) {
return vec3f(0.0);
}

let ls = dot(lightLocal, ad);
let bm = dot(viewLocal, ad);


if ((bm <= 0.0) | (ls >= 0.0)) {
return vec3f(0.0);
}
let alpha = vec2f(material.alphaX, material.alphaY);
let distribution = cW(ad, alpha);
let kz = aF(viewLocal, alpha);
let ep = kz
* aF(lightLocal, alpha);
var aq = ls + bm * relativeIor;
aq *= aq;
let qw = abs(ls) / max(aq, 1e-8);
let jU = relativeIor * relativeIor;

*pdf = kz * max(0.0, bm) * distribution * qw
/ max(viewLocal.z, 1e-8);
return tint * (vec3f(1.0) - bG) * distribution * ep
* abs(bm) * qw * jU
/ max(abs(lightLocal.z * viewLocal.z), 1e-8);
}

fn bh(material: OpenPbrResolvedMaterial) -> vec3f {
if (HAS_MEDIUM & (material.mediumType > 0)) {
return vec3f(1.0);
}
return material.transmissionColor;
}

fn cZ(ai: f32) -> f32 {
return 2.0 * ai / (1.0 + ai);
}

fn av(
ai: vec3f,
transmissionWeight: f32
) -> vec3f {
let gA = 2.0 * ai
/ (vec3f(1.0) + ai);
return mix(
ai,
gA,
clamp(transmissionWeight, 0.0, 1.0)
);
}

fn bN(
material: OpenPbrResolvedMaterial,
J: f32,
bE: f32
) -> vec3f {
let tint = bh(material);
if (!material.thinWalled) {
return tint;
}
let jc = max(0.0, 1.0 - J * J);
let ea = jc
/ max(bE * bE, 1e-9);
if (ea >= 1.0) {
return vec3f(0.0);
}
let ae = sqrt(1.0 - ea);
return pow(max(tint, vec3f(0.0)), vec3f(1.0 / max(ae, 1e-5)));
}

fn dX(
material: OpenPbrResolvedMaterial,
viewLocal: vec3f,
lightLocal: vec3f,
pdf: ptr<function, f32>
) -> vec3f {
*pdf = 0.0;
if ((viewLocal.z <= 0.0) | (lightLocal.z >= 0.0)) {
return vec3f(0.0);
}
let ae = -lightLocal.z;
let oY = cC(
viewLocal.z,
material.relativeIor
);
*pdf = ae * INVPI;
return vec3f(1.0 - oY) * INVPI;
}

fn eg(prepared: ptr<function, ag>) {


let sM = min(OPENPBR_LOBE_COUNT, i32(rtUniform.loopUnrollGuard * 2u));
var total = (*prepared).probabilities[OPENPBR_LOBE_FUZZ];
for (var jT = 1; jT < sM; jT++) {
total += (*prepared).probabilities[jT];
}
if (total <= 1e-8) {
for (var jT = 0; jT < sM; jT++) {
(*prepared).probabilities[jT] = 0.0;
}
return;
}
let pk = 1.0 / total;
for (var jT = 0; jT < sM; jT++) {
(*prepared).probabilities[jT] *= pk;
}
}



fn bR(eta: f32) -> f32 {
if (abs(eta - 1.0) < 1e-6) { return 0.0; }
if (eta > 1.0) { return (eta - 1.0) / (4.08567 + 1.00071 * eta); }
return 0.997118 + 0.1014 * eta - 0.965241 * eta * eta - 0.130607 * eta * eta * eta;
}

fn bU(f0: vec3f, tint: vec3f) -> vec3f {
let dD = 1.0 / 7.0;
let fX = mix(f0, vec3f(1.0), aI(dD));
let b = fX * (vec3f(1.0) - tint) / (dD * pow(1.0 - dD, 6.0));
return clamp(f0 + (vec3f(1.0) - f0) / 21.0 - b / 126.0, vec3f(0.0), vec3f(1.0));
}



fn cN(material: OpenPbrResolvedMaterial, cosine: f32) -> vec3f {
if (cosine <= 0.0) { return vec3f(1.0); }
let mp = sqrt(max(0.0, 1.0 - (1.0 - cosine * cosine) / (material.coatIor * material.coatIor)));
let uT = pow(max(material.coatColor, vec3f(0.0)), vec3f(0.5 / max(mp, 1e-5)));
return mix(vec3f(1.0), uT, material.coatWeight);
}

fn gF(material: OpenPbrResolvedMaterial, cosine: f32) -> f32 {
if (material.coatRoughness <= ROUGHNESS_MIN) {
return af(cosine, 1.0 / material.coatIor);
}


return clamp(1.0 - aw(material.coatIor,
material.coatRoughness * material.coatRoughness, cosine), 0.0, 1.0);
}

fn hr(prepared: ag) -> vec3f {
let material = prepared.material;
let dielectric = 1.0 - material.baseMetalness;
let opaque = dielectric * (1.0 - material.transmissionWeight) * (1.0 - material.subsurfaceWeight);
let sss = dielectric * (1.0 - material.transmissionWeight) * material.subsurfaceWeight;
let vI = dielectric * material.transmissionWeight;
let gd = bR(prepared.specularEtaTOverEtaI);
let lE = bR(1.0 / prepared.transmissionReflectionIor);
let qI = clamp(opaque * gd + (sss + vI) * lE + material.baseMetalness, 0.0, 1.0);
let jM = mix(1.0, material.specularRoughness, qI);
let ks = bR(material.coatIor);
let kr = 1.0 - (1.0 - ks) / (material.coatIor * material.coatIor);
let k = mix(ks, kr, jM);
let eb = material.baseMetalness * material.specularWeight * bU(material.baseWeight * material.baseColor, material.specularColor)
+ opaque * mix(material.baseWeight * material.baseColor, vec3f(1.0), gd)
+ sss * material.subsurfaceColor + vec3f(vI);
let rZ = vec3f(1.0 - k) / max(vec3f(1.0) - eb * k, vec3f(1e-6));
return mix(vec3f(1.0), rZ, material.coatWeight * material.coatDarkening);
}

fn cF(prepared: ag, lU: f32) -> vec3f {
if (prepared.material.coatWeight <= 0.0) { return vec3f(1.0); }
if (prepared.material.inside) {

return cN(prepared.material, -lU);
}

return prepared.coatBaseScale * cN(prepared.material, lU);
}


${i?`
fn dM(fallback: bq, tangent: vec3f, bitangent: vec3f, direction: vec2f) -> bq {
var t = tangent - fallback.normal * dot(fallback.normal, tangent);
if (dot(t, t) < 1e-8) { t = fallback.tangent; }
t = normalize(t);
let b = cross(fallback.normal, t) * select(1.0, -1.0, dot(cross(fallback.normal, t), bitangent) < 0.0);
t = t * direction.x + b * direction.y;
if (dot(t, t) < 1e-8) { return fallback; }
var basis = fallback;
basis.tangent = normalize(t);
basis.bitangent = normalize(cross(basis.normal, basis.tangent));
basis.tangent = normalize(cross(basis.bitangent, basis.normal));
return basis;
}

`:""}
fn ds(
tangent: vec3f,
material: OpenPbrResolvedMaterial,
bM: vec3f,
normal: vec3f
) -> ag {
var prepared: ag;
prepared.material = material;
prepared.basis = fD(
tangent,
normal,
max(material.specularAnisotropy, material.coatAnisotropy)
);
${i?`
prepared.coatBasis = prepared.basis;
prepared.directionFrames = false;
${e?`


if (material.coatNormalEnabled) {
prepared.coatBasis = fD(material.geometryTangent, material.coatNormal, material.coatAnisotropy);
prepared.directionFrames = true;
}
`:""}
if ((material.specularAnisotropy > 0.0) & material.anisotropyDirectionEnabled) {
prepared.basis = dM(prepared.basis, material.directionTangent, material.directionBitangent, material.anisotropyDirection);
prepared.directionFrames = true;
}
if ((material.coatAnisotropy > 0.0) & (material.coatAnisotropyRotation != 0.0)) {
prepared.coatBasis = dM(prepared.coatBasis, material.geometryTangent, material.geometryBitangent, vec2f(cos(material.coatAnisotropyRotation), sin(material.coatAnisotropyRotation)));
prepared.directionFrames = true;
}
`:""}
prepared.viewLocal = openpbr_to_local(prepared.basis, bM);
${e?"    prepared.coatViewLocal = openpbr_to_local(prepared.coatBasis, bM);":""}
prepared.diffuseColor = material.baseColor;

let cK = 1.0 - material.baseMetalness;
let dW = cK
* (1.0 - material.transmissionWeight);
prepared.weights[OPENPBR_LOBE_FUZZ] = material.fuzzWeight;
prepared.weights[OPENPBR_LOBE_COAT] = material.coatWeight;
if (material.inside) { prepared.weights[OPENPBR_LOBE_COAT] = 0.0; }
prepared.weights[OPENPBR_LOBE_METAL] = material.baseMetalness;
prepared.weights[OPENPBR_LOBE_SPECULAR] = cK;
prepared.weights[OPENPBR_LOBE_TRANSMISSION] = cK
* material.transmissionWeight;
prepared.weights[OPENPBR_LOBE_DIFFUSE] = dW
* (1.0 - material.subsurfaceWeight) * material.baseWeight;
prepared.weights[OPENPBR_LOBE_SUBSURFACE] = dW
* material.subsurfaceWeight;

prepared.specularEtaTOverEtaI = bi(
1.0 / material.relativeIor,
material.specularWeight
);
prepared.material.relativeIor = 1.0 / prepared.specularEtaTOverEtaI;
prepared.refractionEtaTOverEtaI = prepared.specularEtaTOverEtaI;
prepared.transmissionReflectionIor = prepared.material.relativeIor;


if (material.coatWeight > 0.0) {
var cm = 1.0;
if (!material.inside) { cm = mix(1.0, material.coatIor, material.coatWeight); }
let bB = cm * bi(
material.specularIor / cm, material.specularWeight);
var eF = bB / cm;
if ((cm > bB) & (bB >= 1.0)) {
eF = 1.0 / eF;
}
prepared.specularEtaTOverEtaI = eF;
prepared.transmissionReflectionIor = 1.0 / eF;
prepared.refractionEtaTOverEtaI = bB;
if (material.inside) {
prepared.refractionEtaTOverEtaI = 1.0 / bB;
prepared.transmissionReflectionIor = bB;
}
prepared.material.relativeIor = 1.0 / prepared.refractionEtaTOverEtaI;
}



prepared.thinFilmExteriorIor = 1.0;
prepared.thinFilmBaseIor = prepared.specularEtaTOverEtaI;
if (material.coatWeight > 0.0) {
if (material.inside) {
prepared.thinFilmExteriorIor = 1.0 / prepared.refractionEtaTOverEtaI;
prepared.thinFilmBaseIor = 1.0;
}
else {
prepared.thinFilmExteriorIor = mix(1.0, material.coatIor, material.coatWeight);
prepared.thinFilmBaseIor = prepared.refractionEtaTOverEtaI;
}
}
prepared.specularAlpha = material.specularRoughness
* material.specularRoughness;
let viewCosine = abs(prepared.viewLocal.z);
let ai = af(
viewCosine,
1.0 / prepared.specularEtaTOverEtaI
);
let fN = material.specularColor * select(
ai,
mix(
ai,
cZ(ai),
material.transmissionWeight
),
material.thinWalled
);
let iv = material.specularWeight * cw(
viewCosine,
material.baseWeight * material.baseColor,
material.specularColor
);
let eZ = select(
af(viewCosine, prepared.transmissionReflectionIor),
cZ(af(viewCosine, prepared.transmissionReflectionIor)),
material.thinWalled
);
let hb = bN(
material,
viewCosine,
prepared.refractionEtaTOverEtaI
);
let iM = aw(
prepared.specularEtaTOverEtaI,
prepared.specularAlpha,
viewCosine
);
let gH = cA(
prepared.specularEtaTOverEtaI,
prepared.specularAlpha
);
prepared.diffuseSpecularEnergyCompensation = iM
/ max(gH, 1e-12);

prepared.probabilities[OPENPBR_LOBE_FUZZ] = prepared.weights[OPENPBR_LOBE_FUZZ]
* aE(material.fuzzColor)
* max(aU(
viewCosine,
material.fuzzRoughness
), 0.02);
prepared.probabilities[OPENPBR_LOBE_COAT] = 0.0;
prepared.coatBaseScale = vec3f(1.0);
if ((material.coatWeight > 0.0) & !material.inside) {
${e?"let coatViewCosine = select(viewCosine, max(prepared.coatViewLocal.z, 0.0), material.coatNormalEnabled);":""}
let lf = gF(material, ${e?"coatViewCosine":"viewCosine"});
prepared.probabilities[OPENPBR_LOBE_COAT] = prepared.weights[OPENPBR_LOBE_COAT] * lf;
prepared.coatBaseScale = cN(material, ${e?"coatViewCosine":"viewCosine"})
* (1.0 - prepared.weights[OPENPBR_LOBE_COAT] * lf) * hr(prepared);
}
prepared.probabilities[OPENPBR_LOBE_METAL] = prepared.weights[OPENPBR_LOBE_METAL]
* aE(iv);
prepared.metalMsScale = vec3f(0.0);
prepared.metalMsFactor = 0.0;
prepared.metalMsProbability = 0.0;


if ((material.specularRoughness >= 0.04) & (prepared.weights[OPENPBR_LOBE_METAL] > 0.0)) {
let ig = bU(material.baseWeight * material.baseColor, material.specularColor);
prepared.metalMsScale = material.specularWeight * ig * ig;
let qO = aV(prepared.specularAlpha, viewCosine);
prepared.metalMsFactor = qO / max(cD(prepared.specularAlpha), 1e-12);
let fC = prepared.weights[OPENPBR_LOBE_METAL] * aE(prepared.metalMsScale) * qO;
prepared.probabilities[OPENPBR_LOBE_METAL] += fC;
prepared.metalMsProbability = fC / max(prepared.probabilities[OPENPBR_LOBE_METAL], 1e-12);
}
prepared.probabilities[OPENPBR_LOBE_SPECULAR] = prepared.weights[OPENPBR_LOBE_SPECULAR]
* aE(fN);
prepared.probabilities[OPENPBR_LOBE_TRANSMISSION] = prepared.weights[OPENPBR_LOBE_TRANSMISSION]
* (1.0 - eZ)
* aE(hb);






prepared.dielectricMsReflectionScale = vec3f(0.0);
prepared.dielectricMsTransmissionScale = vec3f(0.0);
prepared.dielectricMsViewLoss = 0.0;
prepared.dielectricMsReflectionRatio = 0.0;
prepared.dielectricMsProbability = 0.0;
if (!material.thinWalled & (material.transmissionWeight > 0.0) &
(prepared.specularAlpha >= 0.0016) & (prepared.weights[OPENPBR_LOBE_TRANSMISSION] > 0.0) &
(abs(prepared.refractionEtaTOverEtaI - 1.0) > 1e-6)) {
let mo = prepared.weights[OPENPBR_LOBE_TRANSMISSION] + prepared.weights[OPENPBR_LOBE_SUBSURFACE];
prepared.dielectricMsReflectionScale = select(material.specularColor, vec3f(1.0), material.inside) * mo;
prepared.dielectricMsTransmissionScale = hb * prepared.weights[OPENPBR_LOBE_TRANSMISSION]
+ vec3f(prepared.weights[OPENPBR_LOBE_SUBSURFACE]);
prepared.dielectricMsReflectionRatio = ck(prepared.refractionEtaTOverEtaI, prepared.specularAlpha);
prepared.dielectricMsViewLoss = bb(prepared.refractionEtaTOverEtaI, prepared.specularAlpha, viewCosine);
let oR = mix(prepared.dielectricMsTransmissionScale, prepared.dielectricMsReflectionScale, prepared.dielectricMsReflectionRatio);
let fC = aE(oR) * prepared.dielectricMsViewLoss;
prepared.probabilities[OPENPBR_LOBE_TRANSMISSION] += fC;
prepared.dielectricMsProbability = fC / max(prepared.probabilities[OPENPBR_LOBE_TRANSMISSION], 1e-12);
}
prepared.probabilities[OPENPBR_LOBE_DIFFUSE] = prepared.weights[OPENPBR_LOBE_DIFFUSE]
* aE(prepared.diffuseColor)
* prepared.diffuseSpecularEnergyCompensation;
prepared.probabilities[OPENPBR_LOBE_SUBSURFACE] = prepared.weights[OPENPBR_LOBE_SUBSURFACE]
* (1.0 - eZ)
* aE(material.subsurfaceColor)
* prepared.diffuseSpecularEnergyCompensation;


if ((material.coatWeight > 0.0) & HAS_THIN_FILM & (material.thinFilmWeight > 0.0)) {
let lS = 0.02 * bS(material.thinFilmThickness, material.thinFilmWeight);
prepared.probabilities[OPENPBR_LOBE_SPECULAR] = max(prepared.probabilities[OPENPBR_LOBE_SPECULAR], prepared.weights[OPENPBR_LOBE_SPECULAR] * lS);
prepared.probabilities[OPENPBR_LOBE_METAL] = max(prepared.probabilities[OPENPBR_LOBE_METAL], prepared.weights[OPENPBR_LOBE_METAL] * material.specularWeight * lS);
}
if ((material.coatWeight > 0.0) & !material.inside) {
let gI = max(max(prepared.coatBaseScale.x, prepared.coatBaseScale.y), prepared.coatBaseScale.z);
prepared.probabilities[OPENPBR_LOBE_METAL] *= gI;
prepared.probabilities[OPENPBR_LOBE_SPECULAR] *= gI;
prepared.probabilities[OPENPBR_LOBE_TRANSMISSION] *= gI;
prepared.probabilities[OPENPBR_LOBE_DIFFUSE] *= gI;
prepared.probabilities[OPENPBR_LOBE_SUBSURFACE] *= gI;
}
eg(&prepared);
return prepared;
}


fn cY(prepared: ag, cosine: f32, reflection: bool) -> f32 {
if (prepared.material.coatWeight <= 0.0) {
return af(cosine, prepared.material.relativeIor);
}
let kU = af(cosine, prepared.transmissionReflectionIor);
if (!reflection) { return kU; }
let oj = af(cosine, 1.0 / prepared.specularEtaTOverEtaI);
let sQ = prepared.material.transmissionWeight + (1.0 - prepared.material.transmissionWeight) * prepared.material.subsurfaceWeight;
return mix(oj, kU, sQ);
}

fn nA(
prepared: ag,
lightDirection: vec3f,
hc: i32,
pdf: ptr<function, f32>
) -> vec3f {
let material = prepared.material;
let viewLocal = prepared.viewLocal;
let lightLocal = openpbr_to_local(prepared.basis, lightDirection);
let reflection = lightLocal.z * viewLocal.z > 0.0;
${e?`
let independentCoat = material.coatNormalEnabled;
let geometricReflection = dot(material.geometricNormal, lightDirection) > 0.0;
let coatLightCosine = dot(prepared.coatBasis.normal, lightDirection);
let coatReflection = geometricReflection & (prepared.coatViewLocal.z > 0.0) & (coatLightCosine > 0.0);
`:""}

var ad: vec3f;
if (reflection) {
ad = normalize(lightLocal + viewLocal);
}
else {
ad = normalize(lightLocal + viewLocal * material.relativeIor);
}
if (ad.z < 0.0) {
ad = -ad;
}

var response = vec3f(0.0);
*pdf = 0.0;
var aM = 0.0;
let mO = hc < 0;
let ws = mO | (hc == OPENPBR_LOBE_FUZZ);
let uA = mO | (hc == OPENPBR_LOBE_COAT);
let tn = mO | (hc == OPENPBR_LOBE_METAL);
let rf = mO | (hc == OPENPBR_LOBE_SPECULAR);
let kd = mO | (hc == OPENPBR_LOBE_TRANSMISSION);
let uF = mO | (hc == OPENPBR_LOBE_DIFFUSE);
let pP = mO | (hc == OPENPBR_LOBE_SUBSURFACE);
let bm = abs(dot(viewLocal, ad));



var du = ad;
var jK = bm;
if (!reflection & material.thinWalled) {
du = normalize(vec3f(lightLocal.xy, -lightLocal.z) + viewLocal);
if (du.z < 0.0) { du = -du; }
jK = abs(dot(viewLocal, du));
}
let ne =
(reflection & (prepared.weights[OPENPBR_LOBE_SPECULAR] > 0.0) & rf) |
(!reflection & (prepared.weights[OPENPBR_LOBE_TRANSMISSION] > 0.0) & kd);
let rk = reflection & (prepared.weights[OPENPBR_LOBE_METAL] > 0.0) & tn;
var oA: array<vec3f, 2>;
if (ne) {
oA[0] = vec3f(cY(prepared, jK, reflection));
}
if (rk) {
oA[1] = cw(bm, material.baseWeight * material.baseColor, material.specularColor);
}
if (HAS_THIN_FILM & (material.thinFilmWeight > 0.0)) {
let wavelengths = vec3f(620.0, 540.0, 450.0);

for (var lD = 0u; lD < (rtUniform.loopUnrollGuard >> 1u); lD++) {
if (!select(ne, rk, lD == 1u)) { continue; }
var yi = vec3f(0.0);
let J = select(jK, bm, lD == 1u);
for (var channel = 0u; channel + 1u < rtUniform.loopUnrollGuard; channel++) {
var ior = vec2f(prepared.thinFilmBaseIor, 0.0);
if (lD == 1u) {
ior = cX(material.baseWeight * material.baseColor[channel], material.specularColor[channel]);
}
yi[channel] = au(J,
wavelengths[channel], material.thinFilmThickness, prepared.thinFilmExteriorIor, material.thinFilmIor, ior);
}
oA[lD] = mix(oA[lD], yi,
bS(material.thinFilmThickness, material.thinFilmWeight));
}
}
let ey = oA[0];
let diffuseSpecularEnergyCompensation =
prepared.diffuseSpecularEnergyCompensation
* aw(
prepared.specularEtaTOverEtaI,
prepared.specularAlpha,
abs(lightLocal.z)
);

${e?`

if (!independentCoat | ((lightLocal.z != 0.0) & (reflection == geometricReflection))) {
`:""}
if (reflection) {
if ((prepared.weights[OPENPBR_LOBE_DIFFUSE] > 0.0) & uF) {
response += prepared.weights[OPENPBR_LOBE_DIFFUSE] * bJ(
material,
prepared.diffuseColor,
viewLocal,
lightLocal,
diffuseSpecularEnergyCompensation,
&aM
);
*pdf += prepared.probabilities[OPENPBR_LOBE_DIFFUSE] * aM;
}

if ((prepared.weights[OPENPBR_LOBE_SUBSURFACE] > 0.0) & material.thinWalled & pP) {
response += 0.5 * prepared.weights[OPENPBR_LOBE_SUBSURFACE] * bJ(
material,
material.subsurfaceColor,
viewLocal,
lightLocal,
diffuseSpecularEnergyCompensation,
&aM
);
*pdf += prepared.probabilities[OPENPBR_LOBE_SUBSURFACE] * 0.5 * aM;
}

if ((prepared.weights[OPENPBR_LOBE_SPECULAR] > 0.0) & rf) {
var cB = ey;
if (material.thinWalled) {
cB = av(
cB,
material.transmissionWeight
);
}
let bG = material.specularColor * cB;
response += prepared.weights[OPENPBR_LOBE_SPECULAR] * ao(
material,
viewLocal,
lightLocal,
ad,
bG,
&aM
);
*pdf += prepared.probabilities[OPENPBR_LOBE_SPECULAR] * aM;
}

if ((prepared.weights[OPENPBR_LOBE_METAL] > 0.0) & tn) {
let bG = material.specularWeight * oA[1];
response += prepared.weights[OPENPBR_LOBE_METAL] * ao(
material,
viewLocal,
lightLocal,
ad,
bG,
&aM
);
if (prepared.metalMsFactor > 0.0) {
let cL = min(prepared.metalMsFactor * aV(prepared.specularAlpha, lightLocal.z), 1.0 / max(lightLocal.z, 1e-8));
response += prepared.weights[OPENPBR_LOBE_METAL] * prepared.metalMsScale * cL * INVPI;
aM = mix(aM, 0.5 * INVPI, prepared.metalMsProbability);
}
*pdf += prepared.probabilities[OPENPBR_LOBE_METAL] * aM;
}
}
else {
let bG = ey;
if ((prepared.weights[OPENPBR_LOBE_TRANSMISSION] > 0.0) & kd) {
if (material.thinWalled) {
let lI = vec3f(lightLocal.xy, -lightLocal.z);
let gA = av(
ey,
1.0
);
let tint = bN(
material,
abs(viewLocal.z),
prepared.refractionEtaTOverEtaI
);
response += prepared.weights[OPENPBR_LOBE_TRANSMISSION]
* ao(
material,
viewLocal,
lI,
du,
tint * (vec3f(1.0) - gA),
&aM
);
}
else {
response += prepared.weights[OPENPBR_LOBE_TRANSMISSION]
* dE(
material,
material.relativeIor,
bh(material),
viewLocal,
lightLocal,
ad,
bG,
&aM
);
}
if (prepared.dielectricMsProbability > 0.0) {
aM *= 1.0 - prepared.dielectricMsProbability;
}
*pdf += prepared.probabilities[OPENPBR_LOBE_TRANSMISSION] * aM;
}
if ((prepared.weights[OPENPBR_LOBE_SUBSURFACE] > 0.0) & pP) {
if (material.thinWalled) {
let pb = vec3f(lightLocal.xy, -lightLocal.z);
response += 0.5 * prepared.weights[OPENPBR_LOBE_SUBSURFACE]
* bJ(
material,
material.subsurfaceColor,
viewLocal,
pb,
diffuseSpecularEnergyCompensation,
&aM
);
aM *= 0.5;
}
else {
response += prepared.weights[OPENPBR_LOBE_SUBSURFACE] * dX(
material,
viewLocal,
lightLocal,
&aM
);
}
*pdf += prepared.probabilities[OPENPBR_LOBE_SUBSURFACE] * aM;
}
}




if ((prepared.dielectricMsProbability > 0.0) & kd) {
let cosine = abs(lightLocal.z);
if (cosine > 0.0) {
let ior = select(1.0 / prepared.refractionEtaTOverEtaI, prepared.refractionEtaTOverEtaI, reflection);
let ju = select(1.0 - prepared.dielectricMsReflectionRatio, prepared.dielectricMsReflectionRatio, reflection);
let oZ = prepared.dielectricMsViewLoss * bb(ior, prepared.specularAlpha, cosine)
/ max(bf(ior, prepared.specularAlpha), 1e-12);
let cL = min(oZ * ju, 1.0 / cosine);
let scale = select(prepared.dielectricMsTransmissionScale, prepared.dielectricMsReflectionScale, reflection);
response += scale * cL * INVPI;
*pdf += prepared.probabilities[OPENPBR_LOBE_TRANSMISSION] * prepared.dielectricMsProbability * ju * 0.5 * INVPI;
}
}

${e?"    } ":""}
if (material.coatWeight > 0.0) {
response *= cF(prepared, ${e?"select(lightLocal.z, coatLightCosine, independentCoat)":"lightLocal.z"});
}
${e?`

if (independentCoat) { response *= abs(lightLocal.z); }
`:""}

${i?`
if (${e?"select(reflection, coatReflection, independentCoat)":"reflection"} & (prepared.weights[OPENPBR_LOBE_COAT] > 0.0)) {
var dT = viewLocal;
var lh = lightLocal;
var gL = ad;
var kk = bm;
if (prepared.directionFrames) {
dT = ${e?"select(openpbr_to_local(prepared.coatBasis, openpbr_to_world(prepared.basis, viewLocal)), prepared.coatViewLocal, independentCoat)":"openpbr_to_local(prepared.coatBasis, openpbr_to_world(prepared.basis, viewLocal))"};
lh = openpbr_to_local(prepared.coatBasis, lightDirection);
gL = normalize(lh + dT);
if (gL.z < 0.0) { gL = -gL; }
kk = abs(dot(dT, gL));
}

let lQ = vec3f(af(
kk,
1.0 / material.coatIor
));
var dS = material;
let jX = aN(material.coatRoughness, material.coatAnisotropy);
dS.alphaX = jX.x;
dS.alphaY = jX.y;
if (uA) {
response += prepared.weights[OPENPBR_LOBE_COAT]${e?" * select(1.0, max(coatLightCosine, 0.0), independentCoat)":""} * ao(
dS,
dT,
lh,
gL,
lQ,
&aM
);
*pdf += prepared.probabilities[OPENPBR_LOBE_COAT] * aM;
}
}
`:`
if (${e?"select(reflection, coatReflection, independentCoat)":"reflection"} & (prepared.weights[OPENPBR_LOBE_COAT] > 0.0)) {
let lQ = vec3f(af(
bm,
1.0 / material.coatIor
));
var dS = material;
let jX = aN(material.coatRoughness, material.coatAnisotropy);
dS.alphaX = jX.x;
dS.alphaY = jX.y;
if (uA) {
response += prepared.weights[OPENPBR_LOBE_COAT]${e?" * select(1.0, max(coatLightCosine, 0.0), independentCoat)":""} * ao(
dS,
viewLocal,
lightLocal,
ad,
lQ,
&aM
);
*pdf += prepared.probabilities[OPENPBR_LOBE_COAT] * aM;
}
}
`}

if (${e?"select(reflection, geometricReflection, independentCoat)":"reflection"} & (prepared.weights[OPENPBR_LOBE_FUZZ] > 0.0)) {
let rC = aU(
abs(viewLocal.z),
material.fuzzRoughness
);
response *= max(
vec3f(0.0),
vec3f(1.0 - prepared.weights[OPENPBR_LOBE_FUZZ] * rC)
);
if (ws) {
response += prepared.weights[OPENPBR_LOBE_FUZZ]${e?" * select(1.0, max(lightLocal.z, 0.0), independentCoat)":""} * kD(
material,
viewLocal,
lightLocal,
&aM
);
*pdf += prepared.probabilities[OPENPBR_LOBE_FUZZ] * aM;
}
}

return response * ${e?"select(abs(lightLocal.z), 1.0, independentCoat)":"abs(lightLocal.z)"};
}

fn bO(
prepared: ag,
lightDirection: vec3f,
pdf: ptr<function, f32>
) -> vec3f {
return nA(prepared, lightDirection, -1, pdf);
}





fn sp(
tangent: vec3f,
material: OpenPbrResolvedMaterial,
bM: vec3f,
normal: vec3f,
lightDirection: vec3f,
pdf: ptr<function, f32>
) -> vec3f {
let prepared = ds(
tangent,
material,
bM,
normal
);
return bO(prepared, lightDirection, pdf);
}





fn jq(
prepared: ag, cq: vec3f,
lightDirection: ptr<function, vec3f>, isTransmissionEvent: ptr<function, bool>,
aS: ptr<function, f32>, bu: ptr<function, bool>,
cO: ptr<function, bool>, bn: ptr<function, u32>
) -> bool {
let material = prepared.material;
let viewLocal = prepared.viewLocal;
var cH = cq.x;
let fL = cq.y;
let bv = cq.z;
*isTransmissionEvent = false;
*aS = 1.0;
*bu = false;
*cO = false;
*bn = u32(OPENPBR_LOBE_DIFFUSE);
*lightDirection = prepared.basis.normal;

var cdf: array<f32, OPENPBR_LOBE_COUNT>;
cdf[OPENPBR_LOBE_FUZZ] = prepared.probabilities[OPENPBR_LOBE_FUZZ];
${Js.slice(1).map(t=>`cdf[${t}] = cdf[${t-1}] + prepared.probabilities[${t}];`).join(`
    `)}
if (cdf[OPENPBR_LOBE_SUBSURFACE] <= 0.0) {
return false;
}

var lightLocal: vec3f;
if ((bv < cdf[OPENPBR_LOBE_FUZZ]) | (
(bv >= cdf[OPENPBR_LOBE_TRANSMISSION]) & (bv < cdf[OPENPBR_LOBE_DIFFUSE])
)) {
let qG = bv < cdf[OPENPBR_LOBE_FUZZ];
*aS = select(
1.0,
material.fuzzRoughness,
qG
);
*cO = !qG;
*bn = select(
u32(OPENPBR_LOBE_DIFFUSE),
u32(OPENPBR_LOBE_FUZZ),
qG
);
lightLocal = aO(vec2f(cH, fL));
}
${i?`
else if (bv < cdf[OPENPBR_LOBE_COAT]) {
*aS = material.coatRoughness;
*bu = true;
*bn = u32(OPENPBR_LOBE_COAT);
var dT = viewLocal;
if (prepared.directionFrames) { dT = ${e?"select(openpbr_to_local(prepared.coatBasis, openpbr_to_world(prepared.basis, viewLocal)), prepared.coatViewLocal, material.coatNormalEnabled)":"openpbr_to_local(prepared.coatBasis, openpbr_to_world(prepared.basis, viewLocal))"}; }
var ad = aD(
dT,

aN(material.coatRoughness, material.coatAnisotropy),
vec2f(cH, fL)
);
if (ad.z < 0.0) {
ad = -ad;
}
lightLocal = normalize(reflect(-dT, ad));
${e?`
if (material.coatNormalEnabled) {

*lightDirection = openpbr_to_world(prepared.coatBasis, lightLocal);
return (lightLocal.z > 0.0) & (dot(material.geometricNormal, *lightDirection) > 0.0);
}
`:""}
if (prepared.directionFrames) { lightLocal = openpbr_to_local(prepared.basis, openpbr_to_world(prepared.coatBasis, lightLocal)); }
}
`:`
else if (bv < cdf[OPENPBR_LOBE_COAT]) {
*aS = material.coatRoughness;
*bu = true;
*bn = u32(OPENPBR_LOBE_COAT);
var ad = aD(
viewLocal,

aN(material.coatRoughness, material.coatAnisotropy),
vec2f(cH, fL)
);
if (ad.z < 0.0) {
ad = -ad;
}
lightLocal = normalize(reflect(-viewLocal, ad));
}
`}
else if (bv < cdf[OPENPBR_LOBE_SPECULAR]) {
*aS = material.specularRoughness;
*bu = true;
*bn = select(
u32(OPENPBR_LOBE_SPECULAR),
u32(OPENPBR_LOBE_METAL),
bv < cdf[OPENPBR_LOBE_METAL]
);
let uP = bv < cdf[OPENPBR_LOBE_METAL];
let sN = (bv - cdf[OPENPBR_LOBE_COAT]) / max(prepared.probabilities[OPENPBR_LOBE_METAL], 1e-12);
if (uP & (sN < prepared.metalMsProbability)) {
let z = cH;
let ex = sqrt(max(0.0, 1.0 - z * z));
let azimuth = TWOPI * fL;
lightLocal = vec3f(ex * cos(azimuth), ex * sin(azimuth), z);
}
else {
var ad = aD(
viewLocal,
vec2f(material.alphaX, material.alphaY),
vec2f(cH, fL)
);
if (ad.z < 0.0) {
ad = -ad;
}
lightLocal = normalize(reflect(-viewLocal, ad));
}
}
else if (bv < cdf[OPENPBR_LOBE_TRANSMISSION]) {
*aS = material.specularRoughness;
*bu = true;
*isTransmissionEvent = true;
*bn = u32(OPENPBR_LOBE_TRANSMISSION);


let vS = (bv - cdf[OPENPBR_LOBE_SPECULAR]) / max(prepared.probabilities[OPENPBR_LOBE_TRANSMISSION], 1e-12);
if ((prepared.dielectricMsProbability > 0.0) & (vS < prepared.dielectricMsProbability)) {
let ju = prepared.dielectricMsReflectionRatio;
let mJ = cH < ju;
var z: f32;
if (mJ) { z = min(cH / ju, 0.99999994); }
else { z = -min((cH - ju) / (1.0 - ju), 0.99999994); }
let ex = sqrt(max(0.0, 1.0 - z * z));
let azimuth = TWOPI * fL;
lightLocal = vec3f(ex * cos(azimuth), ex * sin(azimuth), z);
*isTransmissionEvent = !mJ;
*bn = select(u32(OPENPBR_LOBE_TRANSMISSION), u32(OPENPBR_LOBE_SPECULAR), mJ);
}
else {
var ad = aD(
viewLocal,
vec2f(material.alphaX, material.alphaY),
vec2f(cH, fL)
);
if (ad.z < 0.0) {
ad = -ad;
}
if (material.thinWalled) {
let iC = normalize(reflect(-viewLocal, ad));
lightLocal = vec3f(iC.xy, -iC.z);
}
else {
lightLocal = refract(
-viewLocal,
ad,
prepared.material.relativeIor
);
if (dot(lightLocal, lightLocal) <= 1e-8) {
*isTransmissionEvent = false;
return false;
}
lightLocal = normalize(lightLocal);
}
}
}
else {
*aS = 1.0;
*cO = true;
*isTransmissionEvent = true;
*bn = u32(OPENPBR_LOBE_SUBSURFACE);
if (material.thinWalled) {
let qL = cH >= 0.5;
if (qL) {
cH = (cH - 0.5) * 2.0;
}
else {
cH *= 2.0;
}
lightLocal = aO(vec2f(cH, fL));
if (qL) {
lightLocal.z = -lightLocal.z;
}
else {
*isTransmissionEvent = false;
}
}
else {
lightLocal = aO(vec2f(cH, fL));
lightLocal.z = -lightLocal.z;
}
}

*lightDirection = openpbr_to_world(prepared.basis, lightLocal);



if ((lightLocal.z == 0.0) | ((lightLocal.z < 0.0) != *isTransmissionEvent)) {
return false;
}
${e?`
if (material.coatNormalEnabled &
((dot(material.geometricNormal, *lightDirection) <= 0.0) != *isTransmissionEvent)) { return false; }
`:""}
return true;
}

fn eN(
prepared: ag,
cq: vec3f,
lightDirection: ptr<function, vec3f>,
pdf: ptr<function, f32>,
isTransmissionEvent: ptr<function, bool>,
aS: ptr<function, f32>,
bu: ptr<function, bool>,
cO: ptr<function, bool>,
bn: ptr<function, u32>,
lW: ptr<function, f32>,
kq: ptr<function, vec3f>
) -> vec3f {
*pdf = 0.0;
*lW = 0.0;
*kq = vec3f(0.0);




if (!prepared.material.thinWalled &
(abs(prepared.material.relativeIor - 1.0) <= 1e-6) &
(prepared.probabilities[OPENPBR_LOBE_TRANSMISSION] >= 1.0 - 1e-6)) {
*lightDirection = openpbr_to_world(
prepared.basis,
-prepared.viewLocal
);
let oF = bh(prepared.material)
* cF(prepared, ${e?"select(-prepared.viewLocal.z, dot(prepared.coatBasis.normal, *lightDirection), prepared.material.coatNormalEnabled)":"-prepared.viewLocal.z"});
*pdf = 1.0;
*lW = 1.0;
*kq = oF;
*isTransmissionEvent = true;
*aS = 0.0;
*bu = true;
*cO = false;
*bn = u32(OPENPBR_LOBE_TRANSMISSION);
return oF;
}
if (!jq(prepared, cq, lightDirection,
isTransmissionEvent, aS, bu,
cO, bn)) { return vec3f(0.0); }
let response = bO(prepared, *lightDirection, pdf);
*lW = *pdf;
*kq = response;
return response;
}

fn tZ(
tangent: vec3f,
material: OpenPbrResolvedMaterial,
cq: vec3f,
bM: vec3f,
normal: vec3f,
lightDirection: ptr<function, vec3f>,
pdf: ptr<function, f32>,
isTransmissionEvent: ptr<function, bool>,
aS: ptr<function, f32>,
bu: ptr<function, bool>,
cO: ptr<function, bool>,
bn: ptr<function, u32>,
lW: ptr<function, f32>
) -> vec3f {
let prepared = ds(
tangent,
material,
bM,
normal
);
var kq = vec3f(0.0);
return eN(
prepared,
cq,
lightDirection,
pdf,
isTransmissionEvent,
aS,
bu,
cO,
bn,
lW,
&kq
);
}`}const Bp=`




fn aD(view: vec3f, alpha: vec2f, samplePoint: vec2f) -> vec3f {
let sv = vec3f(alpha, 1.0);
let cr = normalize(sv * view);
let qP = min(cr.z, 1.0);
let kh = 1.0 + qP;
let kC = (1.0 - samplePoint.y) * kh;
let sU = samplePoint.y * kh;
let tY = kC + (1.0 - qP);
let ex = sqrt(max(0.0, tY * sU));
let azimuth = TWOPI * samplePoint.x;
let mr = vec3f(
cr.x + ex * cos(azimuth),
cr.y + ex * sin(azimuth),
kC
);
return normalize(sv * mr);
}

fn cW(pf: vec3f, alpha: vec2f) -> f32 {
let hF = vec3f(
pf.x / alpha.x,
pf.y / alpha.y,
pf.z
);
let aq = dot(hF, hF);
return 1.0 / (
PI * alpha.x * alpha.y * aq * aq
);
}

fn aF(direction: vec3f, alpha: vec2f) -> f32 {
let eQ = abs(direction.z);
if (eQ <= 1e-8) {
return 0.0;
}
let iE = alpha * direction.xy;
let mt = dot(iE, iE)
/ (eQ * eQ);
return 2.0 / (1.0 + sqrt(1.0 + mt));
}

fn aI(cosine: f32) -> f32 {
let dw = clamp(1.0 - cosine, 0.0, 1.0);
return pow(dw, 5.0);
}

fn cC(J: f32, cR: f32) -> f32 {
let iS = clamp(abs(J), 0.0, 1.0);
let kQ = cR * cR
* max(0.0, 1.0 - iS * iS);
if (kQ >= 1.0) {
return 1.0;
}

let mD = sqrt(max(0.0, 1.0 - kQ));
let bk = (iS - cR * mD)
/ max(iS + cR * mD, 1e-8);
let qC = (cR * iS - mD)
/ max(cR * iS + mD, 1e-8);
return 0.5 * (
bk * bk + qC * qC
);
}

fn gy(samplePoint: vec2f) -> vec2f {
let offset = 2.0 * samplePoint - vec2f(1.0);
if (offset.x == 0.0 && offset.y == 0.0) {
return vec2f(0.0);
}

var radius: f32;
var angle: f32;
if (abs(offset.x) > abs(offset.y)) {
radius = offset.x;
angle = 0.25 * PI * (offset.y / offset.x);
}
else {
radius = offset.y;
angle = 0.5 * PI - 0.25 * PI * (offset.x / offset.y);
}
return radius * vec2f(cos(angle), sin(angle));
}

fn aO(samplePoint: vec2f) -> vec3f {
let lk = gy(samplePoint);
return vec3f(
lk,
sqrt(max(0.0, 1.0 - dot(lk, lk)))
);
}

fn aK(qo: f32, oJ: f32) -> f32 {
let scale = max(qo, oJ);
if (scale <= 0.0) {
return 0.0;
}
let normalized = vec2f(qo, oJ) / scale;
let pL = normalized * normalized;
return pL.x / (pL.x + pL.y);
}

fn aP(
normal: vec3f,
tangent: ptr<function, vec3f>,
bitangent: ptr<function, vec3f>
) {
let iI = select(-1.0, 1.0, normal.z >= 0.0);
let cL = -1.0 / (iI + normal.z);
let xy = normal.x * normal.y * cL;
*tangent = vec3f(
1.0 + iI * normal.x * normal.x * cL,
iI * xy,
-iI * normal.x
);
*bitangent = vec3f(
xy,
iI + normal.y * normal.y * cL,
-normal.y
);
}

fn aj(rgb: vec3f, wavelength: f32) -> vec3f {
if (wavelength == 0.0) {
return rgb;
}
if (wavelength > 600.0) {
return vec3f(rgb.r, 0.0, 0.0);
}
if (wavelength > 500.0) {
return vec3f(0.0, rgb.g, 0.0);
}
return vec3f(0.0, 0.0, rgb.b);
}

fn ee(
wavelength: f32,
hu: f32,
hD: f32,
rt: f32
) -> f32 {
if (wavelength == 0.0 || hD <= 0.0) {
return hu;
}

let FRAUNHOFER_C = 656.3;
let FRAUNHOFER_D = 587.6;
let FRAUNHOFER_F = 486.1;
let kv = 1.0 / (
1.0 / (FRAUNHOFER_F * FRAUNHOFER_F)
- 1.0 / (FRAUNHOFER_C * FRAUNHOFER_C)
);
let oe = max(rt / hD, 1e-6);
let rV = (hu - 1.0) * kv / oe;
let uK = hu
- rV / (FRAUNHOFER_D * FRAUNHOFER_D);
return uK + rV / (wavelength * wavelength);
}

fn fH(
gO: vec3f,
anisotropy: f32,
samplePoint: vec2f
) -> vec3f {
var cosine: f32;
if (abs(anisotropy) < 0.001) {
cosine = 1.0 - 2.0 * samplePoint.y;
}
else {
let ju = (1.0 - anisotropy * anisotropy)
/ (1.0 + anisotropy - 2.0 * anisotropy * samplePoint.y);
cosine = (
ju * ju - 1.0 - anisotropy * anisotropy
) / (2.0 * anisotropy);
}

let vF = sqrt(max(0.0, 1.0 - cosine * cosine));
let azimuth = TWOPI * samplePoint.x;
var tangent: vec3f;
var bitangent: vec3f;
aP(gO, &tangent, &bitangent);
return tangent * (vF * cos(azimuth))
+ bitangent * (vF * sin(azimuth))
+ gO * cosine;
}

fn bL(cosine: f32, anisotropy: f32) -> f32 {
let aq = 1.0 + anisotropy * anisotropy
+ 2.0 * anisotropy * cosine;
return INV4PI * (1.0 - anisotropy * anisotropy)
/ (aq * sqrt(aq));
}
`,wp=`




const SHADOW_CATCHER_LIGHT_SAMPLES = 4u;






fn sampleShadowCatcher(si: SurfaceInteraction, bounce: i32, aa: ptr<function, Path>) -> vec2f {
let qY = -(*aa).ray.d;
var counts = vec2f(0.0);



if (rtUniform.shadowCatcherChoiceCount > 0) {
for (var candidate = 0u; candidate < SHADOW_CATCHER_LIGHT_SAMPLES; candidate++) {
var lightSample: LightSampleRec;
let lV = vec3f(dZ(sl(candidate, 1u)), dp(sl(candidate, 0u)));
hv(
si.position,
lV,
rtUniform.shadowCatcherChoiceOffset,
rtUniform.shadowCatcherChoiceCount,
1.0,
&lightSample
);
let lightDir = lightSample.direction;
let cosThetaL = dot(si.normal, lightDir);
let qB = dot(si.normal, qY) * cosThetaL;
if (lightSample.pdf > 0.0 && qB >= 0.0) {
if (dot(lightSample.emission, luminance) * abs(cosThetaL) > 0.0) {
var ray: Ray;
gC(&ray, si.position + EPS * lightDir, lightDir);
let lY = intersectSceneShadow(ray, lightSample.dist - EPS, si.triangleIndex);
counts += vec2f(select(0.0, 1.0, lY), 1.0);
}
}
}
}
(*aa).fromEye = false;
return counts;
}
`,Ep=`

fn textureLinear(tex: texture_2d<f32>, _uv: vec2f) -> vec4f {



let size = vec2f(textureDimensions(tex, 0));

let yq = _uv * size - vec2f(0.5);
let xI = floor(yq);
let f = fract(yq);
let xH = vec2i(xI);
let maximum = vec2i(size) - vec2i(1);


let s1 = textureLoad(tex, clamp(xH + vec2i(0, 0), vec2i(0), maximum), 0);
let s2 = textureLoad(tex, clamp(xH + vec2i(1, 0), vec2i(0), maximum), 0);
let s3 = textureLoad(tex, clamp(xH + vec2i(0, 1), vec2i(0), maximum), 0);
let s4 = textureLoad(tex, clamp(xH + vec2i(1, 1), vec2i(0), maximum), 0);

return mix(mix(s1, s2, f.x), mix(s3, s4, f.x), f.y);

}

fn eV(gx: vec3f) -> vec2f {
var phi = atan2(-gx.z, -gx.x);
if (phi < 0.0) {
phi += TWOPI;
}
let theta = acos(clamp(gx.y, -1.0, 1.0));
return vec2f(phi * 0.5 * INVPI, theta * INVPI);
}

fn ko() -> mat3x3f {
return mat3x3f(rtUniform.environmentRotation[0].xyz, rtUniform.environmentRotation[1].xyz, rtUniform.environmentRotation[2].xyz);
}

fn dm(nO: vec3f) -> vec2f {
return eV(transpose(ko()) * nO);
}

fn rE(u: f32, vOffset: ptr<function, i32>, pdf: ptr<function, vec2f>) -> f32 {
let size = vec2i(textureDimensions(envMap, 0));

var left = 0;
var right = size.y + 1; 
while (left < right) {
let mid = (left + right) >> 1;
let s = textureLoad(envMapDistribution, vec2i(0, mid), 0).x;
if (s <= u) {
left = mid + 1;
} else {
right = mid;
}
}
*vOffset = left - 1;



let s0 = textureLoad(envMapDistribution, vec2i(0, *vOffset), 0).xy;
let s1 = textureLoad(envMapDistribution, vec2i(0, *vOffset + 1), 0).xy;

(*pdf).y = s0.y;

return (f32(*vOffset) +  (u - s0.x) / (s1.x - s0.x)) / f32(size.y);
}

fn rD(u: f32, vOffset: i32, pdf: ptr<function, vec2f>) -> f32 {
let size = vec2i(textureDimensions(envMap, 0));

var left = 0;
var right = size.x + 1; 
while (left < right) {
let mid = (left + right) >> 1;
let s = textureLoad(envMapDistribution, vec2i(1 + mid, vOffset), 0).x;
if (s <= u) {
left = mid + 1;
} else {
right = mid;
}
}
let pO = left - 1;



let s0 = textureLoad(envMapDistribution, vec2i(1 + pO, vOffset), 0).xy;
let s1 = textureLoad(envMapDistribution, vec2i(1 + pO + 1, vOffset), 0).xy;

(*pdf).x = s0.y;

return (f32(pO) + (u - s0.x) / (s1.x - s0.x)) / f32(size.x);
}



fn eW(ew: vec2f, v: f32) -> f32 {
if (!(v > 0.0 && v < 1.0)) { return 0.0; }
let sinTheta = sin(min(v, 1.0 - v) * PI);
return ew.x * ew.y * INVPI2 / (2.0 * sinTheta);
}


fn pI(random: vec2f, uv: ptr<function, vec2f>, pdf: ptr<function, f32>) -> vec3f {
var ew: vec2f;
var vOffset: i32;

(*uv).y = rE(random.x, &vOffset, &ew);
(*uv).x = rD(random.y, vOffset, &ew);

let phi = (*uv).x * TWOPI;
let theta = (*uv).y * PI;
let ci = cos(theta);
let sinTheta = sin(theta);
let vM = cos(phi);
let vX = sin(phi);

let dir = vec3f(-sinTheta * vM, ci, -sinTheta * vX);

*pdf = eW(ew, (*uv).y);

return ko() * dir;
}

fn iT(_uv: vec2f) -> f32 {
let size = vec2f(textureDimensions(envMap, 0));

let xO = clamp(vec2i(_uv * size), vec2i(0), vec2i(size) - vec2i(1));

let ub = textureLoad(envMapDistribution, vec2i(1 + xO.x, xO.y), 0).y;
let uc = textureLoad(envMapDistribution, vec2i(0, xO.y), 0).y;

return eW(vec2f(ub, uc), _uv.y);
}


`,bp=`

fn sphericalProjection(pos: vec3f) -> vec2f {
let n = normalize(pos);
let theta = atan2(n.x, n.z) / (2.0 * PI) + 0.5;
let phi = acos(n.y) / PI;
return vec2f(theta, 1.0 - phi);
}
fn jh(pos: vec3f, normal: vec3f) -> vec2f {
let dI = abs(normal);
var uv = vec2f(0.0);
if (dI.x > dI.y && dI.x > dI.z) {
uv = pos.yz;
} else if (dI.y > dI.x && dI.y > dI.z) {
uv = pos.xz;
} else {
uv = pos.xy;
}
return uv;
}




fn hT(pos: vec3f, normal: vec3f) -> vec2f {
let theta = atan2(pos.z, pos.x) / (2.0 * PI) + 0.5;
return vec2f(theta, pos.y);
}

fn gU(fE: i32, pos: vec3f, normal: vec3f) -> vec2f {
if (fE == ${xt.triplanar}) {
return jh(pos, normal);
} else if (fE == ${xt.spherical}) {
return sphericalProjection(pos);
} else if (fE == ${xt.cylindrical}) {
return hT(pos, normal);
}
return vec2f(0.0);
}
`,ga=8;function _p({hasDisplacement:i,hasAnisotropyDirections:e=!1,hasCoatNormals:t=!1,hasAlpha:A=!0,hasSceneAlpha:a=!0,blasLayoutMask:r=1,spectral:n,sceneCapabilities:s,dynamicEnvironment:o=!1,materialCapabilities:l=Nh,lightCapabilities:c},f="",p=!1,h){e||=t;const u=A,d=s===void 0||(s&Xt.HAS_SHADOW_CATCHER)!==0,m=`
var si: SurfaceInteraction;
var ma: OpenPbrResolvedMaterial;
si.albedoSampled = false;
si.mediumType = 0;
si.mediumExtinction = vec3f(0.0);
si.mediumScattering = vec3f(0.0);
si.mediumAnisotropy = 0.0;
si.barycentrics = vec2f(0.0);

`,v=`  if (${d?"si.hit && ma.materialType == SHADOW_CATCHER":"false"}) {
(*outAux).isShadowCatcher = true;


(*outAux).albedo = vec3f(1.0);
(*outAux).normal = select(si.normal, -si.normal, dot(si.normal, ray.d) > 0.0);
var aa: Path;
aa.ray = ray;
aa.fromEye = true;
(*outAux).shadowCounts = sampleShadowCatcher(si, 0, &aa);


return vec4f(1.0);
}
else {
if (HAS_BEVEL && rtUniform.bevel != 0) {
if (ma.bevel > 0.0) {
si.normal = nj(si, ma.bevel);
}
}



if (si.hit && (ma.materialType == STANDARD || ma.materialType == UNLIT)) {
(*outAux).albedo = select(ma.baseColor, vec3f(1.0), ma.transmissionWeight > 0.5);
(*outAux).normal = select(
si.normal,
-si.normal,
dot(si.normal, si.position - cameraUniform.viewInv[3].xyz) > 0.0
);



si.albedoSampled = ma.transmissionWeight > 0.5;
}

(*outAux).isShadowCatcher = false;


}
`;let w=`

${Kh}

${Xh({hasSceneAlpha:a,hasAnisotropyDirections:e,hasCoatNormals:t,lightCapabilities:c})}

${bp}

${bc({hasSceneAlpha:a,hasAnisotropyDirections:e,hasCoatNormals:t,hasTransmission:(l&QA.transmission)!==0,hasMetalness:(l&QA.metal)!==0})}

${sp({hasDisplacement:i,blasLayoutMask:r,hasAnisotropyDirections:e,hasCoatNormals:t,sceneIntersections:f})}
${lp}
${op}
${Ep}

${Bp}
${vp(e,t)}
${fp}


var<private> vg: u32 = 0u;



fn kB() -> u32 {
return u32(max(rtUniform.directLightCandidates, 1));
}




fn qx(ys: u32) -> f32 {




if (SAMPLING_PATTERN == 2) { _ = rand(); }
let kI = aZ.x + aZ.y * u32(rtUniform.outputSize.x);
let key = ar(ar(kI, aQ), rtUniform.sequenceSeed);
let dimension = ar(bT, ys) ^ 0xa511e9b3u;
return f32(dG(key ^ dimension) >> 8u) * (1.0 / 16777216.0);
}



fn uS(fA: f32, scatteringPdf: f32) -> f32 {
let candidateCount = kB();
if (candidateCount <= 1u) {
return aK(fA, scatteringPdf);
}
let jb = f32(candidateCount) * fA;
return jb /
max(jb + scatteringPdf, 1e-20);
}


fn gj(scatteringPdf: f32, fA: f32) -> f32 {
let candidateCount = kB();
if (candidateCount <= 1u) {
return aK(scatteringPdf, fA);
}
let jb = f32(candidateCount) * fA;
return scatteringPdf /
max(scatteringPdf + jb, 1e-20);
}

${cp(e,t)}
${wp}


@group(3) @binding(0) var<storage, read_write> outColor: array<vec4f>;
@group(3) @binding(1) var<storage, read_write> outNormal: array<vec4f>;
@group(3) @binding(2) var<storage, read_write> outAlbedo: array<vec4f>;

${za}
@group(3) @binding(3) var<storage, read_write> outShadowCatcher: array<ShadowCatcherAccumulation>;


fn ie(
gv: u32,
radiance: vec3f,
normal: vec3f
) {
if (rtUniform.varianceMoments != 0) {
let value = dot(radiance, luminance);
outNormal[gv] += vec4f(value * value, 0.0, 0.0, 1.0);
}
else {
outNormal[gv] += vec4f(normal, 1.0);
}
}



fn ji(gv: u32, value: f32) {
outShadowCatcher[gv].moments += vec4f(value, value * value, 0.0, 0.0);
}


struct RayTraceAuxiliary {

albedo: vec3f,
isShadowCatcher: bool,
normal: vec3f,
isBlank: bool,

shadowCounts: vec2f,
}

fn dK(point: vec3f, height: f32, radius: f32) -> f32 {
let ge = length(point);
if (ge < 0.00001) {
return -radius;
}

let iX = radius * point.y / ge;
let iL = -1.5 * height;
var eH: f32;
if (iX >= 0.0) {
eH = radius;
}
else if (iX < iL) {
eH = -height * ge / point.y;
}
else {
let cL = 1.0
- iX * iX / (3.0 * iL * iL);
eH = radius * cL;
}
return ge - eH;
}

fn fd(origin: vec3f, direction: vec3f) -> vec3f {
if (!USE_GROUNDED_BACKGROUND) {
return direction;
}
let params = rtUniform.groundedBackgroundParams;
let cf = normalize(direction);
let center = vec3f(
rtUniform.groundedBackgroundCenter.x,
params.z + params.x,
rtUniform.groundedBackgroundCenter.y
);
let bI = origin - center;
let eT = dot(bI, cf);
let br = eT * eT
- dot(bI, bI) + params.y * params.y;
if (
br <= 0.0
|| dK(bI, params.x, params.y) > 0.0
) {
return direction;
}

var cM = -eT + sqrt(br);
if (cM <= 0.0) {
return direction;
}

let oK = bI + cf * cM;
if (oK.y >= 0.0) {
return normalize(oK);
}

if (cf.y < -0.00001 && params.y > 1.5 * params.x) {
let ir = (-params.x - bI.y) / cf.y;
let oB = bI + cf * ir;
let pe = (2.0 / 3.0)
* sqrt(params.y * params.y - 2.25 * params.x * params.x);
if (ir > 0.0 && length(oB.xz) <= pe) {
return normalize(oB);
}
}

var cV = 0.0;
for (var i = 0; i < 14; i++) {
let fB = (cV + cM) * 0.5;
let qy = bI + cf * fB;
if (dK(qy, params.x, params.y) > 0.0) {
cM = fB;
}
else {
cV = fB;
}
}
let hit = bI + cf * ((cV + cM) * 0.5);
return normalize(hit);
}

fn hX(ray: Ray) -> vec4f {
var bg = vec4f(0.0);
if (USE_BACKGROUND_MAP) {
let d = fd(ray.o, ray.d);
let t = rtUniform.backgroundMapTransform;
let qZ = vec3f(t.x * d.x - t.y * d.z, d.y, t.y * d.x + t.x * d.z);
let rotation = rtUniform.backgroundMapRotation;
let hn = transpose(mat3x3f(rotation[0].xyz, rotation[1].xyz, rotation[2].xyz)) * qZ;
let bc = textureLinear(backgroundMap, eV(hn));
bg = vec4f(bc.rgb * t.z, bc.a);
}
else if (USE_BACKGROUND) {
bg = rtUniform.backgroundColor;
}
else if (USE_ENVMAP) {
bg = textureLinear(envMap, dm(ray.d));
}
return bg;
}

fn di(ray: Ray, wavelength: f32) -> vec4f {
let bg = hX(ray);
if (SPECTRAL) {
return vec4f(aj(bg.rgb, wavelength), bg.a);
}
return bg;
}



fn nY(uv: vec2f, aa: ptr<function, Path>, depth: ptr<function, i32>, si: ptr<function, SurfaceInteraction>, ma: ptr<function, OpenPbrResolvedMaterial>, outAux: ptr<function, RayTraceAuxiliary>, fm: ptr<function, bool>) {
*fm = false;
bT = u32(max(*depth, 0));
let matType = (*ma).materialType;
let isShadowCatcher = ${d?"matType == SHADOW_CATCHER":"false"};
if (isShadowCatcher) {
if ((*aa).fromEye) {
(*si).hit = false;
}
else {



if (USE_ENVMAP) {
if ((*aa).isNextRefraction) {


let bg = di(
(*aa).ray,
(*si).wavelength
);
let da = select(gj((*aa).scatteringPdf,
iT(dm((*aa).ray.d)) * rtUniform.envLightPmf),
1.0, (*aa).scatteringIsDelta);
(*aa).li += da * (*aa).beta * bg.rgb * bg.a;
(*aa).alpha = max((*aa).alpha, bg.a);
}
else {
let vo = dm((*aa).ray.d);
var emission = textureLinear(envMap, vo).rgb;
if (SPECTRAL) {
emission = aj(emission, (*si).wavelength);
}
(*aa).li += (*aa).beta * emission *
gj((*aa).scatteringPdf, iT(vo));
}
}
else {
let bg = di(
(*aa).ray,
(*si).wavelength
);
(*aa).li += (*aa).beta * bg.rgb * bg.a;
}
(*aa).abort = true;
return;
}
}
if (!(*si).hit) {



let bg = di(
(*aa).ray,
(*si).wavelength
);
if ((*aa).fromEye) {

(*aa).li = (*aa).beta * bg.rgb * bg.a;
(*aa).alpha = bg.a;

(*outAux).isBlank = bg.a < 0.001 ||
(USE_BACKGROUND && !USE_BACKGROUND_MAP);
}
else {
let cam = fj(uv);
let nK = dot(cam.d, (*aa).ray.d) > 0.0;
if (rtUniform.transmissiveOutputAlphaMin < 1.0) {
if (nK) {
(*aa).alpha = max((*aa).alpha, bg.a);
} else {
(*aa).alpha = 1.0;
}
}
if (!USE_ENVMAP) {


if (nK) {


(*aa).li += (*aa).beta *
gj((*aa).scatteringPdf, 1.0) * bg.rgb;
}
}
}
(*aa).abort = true;
return;
}


if ((matType == STANDARD || matType == UNLIT)) {
let alpha = clamp((*ma).alpha, 0.0, 1.0);

if (alpha < 1.0) {


if (alpha <= 0.0 || eC(3u) > alpha) {
(*fm) = true;
}
}
if (!(*fm) && rtUniform.transmissiveOutputAlphaMin < 1.0) {


let outputAlpha = max(1.0 - (*ma).transmissionWeight, 1.0 - pow(1.0 - rtUniform.transmissiveOutputAlphaMin, f32(*depth)));
(*aa).alpha = max(outputAlpha, (*aa).alpha);
}
if (!(*fm)) {
vg = u32(max(*depth, 0));
mL(si, ma, aa);
}
else {


(*aa).ray.o = (*si).position + (*aa).ray.d * EPS;
}
}

if (!(*si).albedoSampled && !(*fm)) {

if ((matType == STANDARD || matType == UNLIT)) {
if (!((*ma).transmissionWeight > 0.5 ||
((*ma).specularRoughness <= 0.02 && (*ma).baseMetalness > 0.98))) {
(*outAux).albedo = (*ma).baseColor;
(*outAux).normal = select(
(*si).normal,
-(*si).normal,
dot(
(*si).normal,
(*si).position - cameraUniform.viewInv[3].xyz
) > 0.0
);
(*si).albedoSampled = true;
}

if (*depth > 4) {
(*si).albedoSampled = true;
}
}
}


if (USE_RR) {
if (*depth >= RR_MAX && !(*fm)) {
let pG = (*aa).beta;

let pn = max(max(pG.x, pG.y), pG.z);
let q: f32 = max(0.0, 1.0 - pn);
if (dp(cE(RUSSIAN_ROULETTE)) < q) {


(*aa).alpha = 1.0;
(*aa).abort = true;
}
else {
(*aa).beta /= 1.0 - q;
}
}
}
if ((*aa).abort) {
return;
}


}

fn kl(aa: ptr<function, Path>, depth: ptr<function, i32>, si: ptr<function, SurfaceInteraction>, ma: ptr<function, OpenPbrResolvedMaterial>, aJ: bool) {
if (SPECTRAL) {

if ((*ma).transmissionWeight > 0.001) {
(*ma).specularIor = ee(
(*si).wavelength,
(*ma).specularIor,
(*ma).transmissionDispersionScale,
(*ma).dispersionAbbeNumber
);
}
}

if (aJ) {
return;
}


var lightSample: LightSampleRec;
let hM = eC(3u) < (*ma).alpha;
for (var i = 0; i < rtUniform.lightsCount; i++) {

let light: Light = analyticLights[i];
let d = nr((*aa).ray, light, &lightSample);
lightSample.pdf *= light.selectionPmf;
let lY = (*si).hit && d > distance((*si).position, (*aa).ray.o);
if (d != INF && !(lY && hM)) {
let fl = gj((*aa).scatteringPdf, lightSample.pdf);
if (SPECTRAL) {
lightSample.emission = aj(lightSample.emission, (*si).wavelength);
}
(*aa).li += fl * (*aa).beta * lightSample.emission;
(*aa).alpha = 1.0;
(*aa).abort = true;
}
}

if (USE_ENVMAP) {
if (!((*si).hit && hM)) {
if ((*aa).isNextRefraction) {



let bg = di(
(*aa).ray,
(*si).wavelength
);
let da = select(gj((*aa).scatteringPdf,
iT(dm((*aa).ray.d)) * rtUniform.envLightPmf),
1.0, (*aa).scatteringIsDelta);
(*aa).li += da * (*aa).beta * bg.rgb * bg.a;
(*aa).alpha = max((*aa).alpha, bg.a);
(*aa).abort = true;
return;
}
let _uv = dm((*aa).ray.d);
var emission = textureLinear(envMap, _uv).rgb;
let fl = gj(
(*aa).scatteringPdf,
iT(_uv) * rtUniform.envLightPmf
);
if (SPECTRAL) {
emission = aj(emission, (*si).wavelength);
}

if (!USE_BACKGROUND) {
(*aa).alpha = 1.0;
}
(*aa).li += (*aa).beta * emission * fl;
(*aa).abort = true;
}
}

*depth = *depth + 1;
}

fn fj(coord: vec2f) -> Ray {
let origin = cameraUniform.viewProjectionInv * vec4f(coord * 2.0 - 1.0, -1.0, 1.0);
let center = cameraUniform.viewProjectionInv * vec4f(coord * 2.0 - 1.0, 1.0, 1.0);
var cam: Ray;
gC(&cam, origin.xyz / origin.w, normalize(center.xyz * origin.w - origin.xyz * center.w));

return cam;
}


fn ld(radius: f32, xi: f32) -> vec2f {
var x = 0.25;
for (var oD = 0; oD < 10; oD++) {
let x2 = x * x;
let x3 = x2 * x;
let lw = 1.0 - x;
let value = 10.0 * x2 - 20.0 * x3 + 15.0 * x2 * x2 -
4.0 * x2 * x3 - xi;
let mX = 20.0 * x * lw * lw * lw;
if (abs(value) < 1e-6 || mX == 0.0) { break; }
x = clamp(x - value / mX, 0.0, 1.0);
}
let jL = x * radius;
return vec2f(jL, sqrt(max(radius * radius - jL * jL, 0.0)));
}

fn jj(radius: f32, gM: f32) -> f32 {
if (gM >= radius) { return 0.0; }
let pa = radius - gM;
return pa * pa * pa;
}


fn nj(source: SurfaceInteraction, radius: f32) -> vec3f {
var geometricNormal = source.faceNormal;
if (dot(geometricNormal, source.vertexNormal) < 0.0) {
geometricNormal = -geometricNormal;
}
var tangent: vec3f;
var bitangent: vec3f;
aP(geometricNormal, &tangent, &bitangent);
var iW = vec3f(0.0);

for (var iG = 0; iG < BEVEL_SAMPLES; iG++) {
let qf = dZ(CAMERA_BEVEL_BASE + u32(iG));
var cJ = qf.x;
let pv = qf.y;
var dz = geometricNormal;
var fW = tangent;
var eA = bitangent;
var gu = 0.5;
var iB = 0.25;
var gT = 0.25;
if (cJ < 0.5) {
cJ *= 2.0;
}
else if (cJ < 0.75) {
let nI = dz;
dz = fW;
fW = nI;
gu = 0.25;
iB = 0.5;
cJ = (cJ - 0.5) * 4.0;
}
else {
let nI = dz;
dz = eA;
eA = nI;
gu = 0.25;
gT = 0.5;
cJ = (cJ - 0.75) * 4.0;
}

let hj = ld(radius, pv);
let phi = TWOPI * cJ;
let rw = hj.x *
(cos(phi) * fW + sin(phi) * eA);
var ray: Ray;
gC(
&ray,
source.position + dz * hj.y + rw,
-dz
);
var hit: SurfaceInteraction;
intersectSceneBevel(
ray,
&hit,
source.instanceIndex,
max(2.0 * hj.y, EPS)
);
if (!hit.hit) { continue; }

let lA = gu * abs(dot(dz, hit.faceNormal));
let nC = iB * abs(dot(fW, hit.faceNormal));
let kG = gT * abs(dot(eA, hit.faceNormal));
var weight = lA / max(
lA * lA + nC * nC +
kG * kG,
1e-8
);
weight *= jj(radius, distance(hit.position, source.position)) /
max(jj(radius, hj.x), 1e-8);
iW += weight * hit.vertexNormal;
}

if (dot(iW, iW) <= 1e-12) { return source.normal; }
let kg = normalize(iW);
let result = source.normal + kg - source.vertexNormal;
if (dot(result, result) > 1e-12) { return normalize(result); }
return source.normal;
}

fn cT(uv: vec2f, si: ptr<function, SurfaceInteraction>, ray: Ray, ma: ptr<function, OpenPbrResolvedMaterial>, outAux: ptr<function, RayTraceAuxiliary>, sh: bool) -> vec4f {
var aa: Path;
aa.ray = ray;
aa.li = vec3f(0.0);
aa.alpha = select(1.0, 0.0, rtUniform.transmissiveOutputAlphaMin < 1.0);
aa.beta = vec3f(1.0);
aa.fromEye = true;
aa.scatteringPdf = 0.0;
aa.scatteringIsDelta = false;
aa.isNextRefraction = false;
aa.abort = false;

let bounceLimit = max(rtUniform.bounces, 0);
let ft = min(bounceLimit * 3, ${Kt});
var depth = 0;
var aJ = false;
var bQ = false;




for (var event = 0; event <= ft; event++) {
if ((event != 0) | sh) {
intersectScene(aa.ray, si, depth, event != 0, aa.isNextRefraction);
dg(ma, (*si).materialIndex, (*si).uv, (*si).uv1, (*si).instanceIndex, (*si).vertexColor);
}
if (event == 0) {
if (sh & (*si).hit & ((*ma).materialType == STANDARD)) {
(*outAux).albedo = select((*ma).baseColor, vec3f(1.0), (*ma).transmissionWeight > 0.5);
(*outAux).normal = select((*si).normal, -(*si).normal,
dot((*si).normal, (*si).position - cameraUniform.viewInv[3].xyz) > 0.0);
(*si).albedoSampled = (*ma).transmissionWeight > 0.5;
}
bQ = ((*ma).transmissionWeight < 0.001) & ((*ma).subsurfaceWeight < 0.001) & ((*ma).alpha > 0.99);
} else {
kl(&aa, &depth, si, ma, aJ);
}
if (bQ & (event > bounceLimit)) { aa.abort = true; }
if (aa.abort | (event >= ft)) { break; }
nY(uv, &aa, &depth, si, ma, outAux, &aJ);
if (aa.abort) { break; }
}

return vec4f(aa.li, aa.alpha);
}

fn iU(uv: vec2f, si: ptr<function, SurfaceInteraction>, ray: Ray, ma: ptr<function, OpenPbrResolvedMaterial>, outAux: ptr<function, RayTraceAuxiliary>) -> vec4f {
${u?`let coverage = clamp((*ma).alpha, 0.0, 1.0);




let split = (*si).hit & (((*ma).materialType == STANDARD) | ((*ma).materialType == UNLIT)) & (coverage < 1.0);
var sB = ray;
var tr = *si;
var tq = *ma;
var iP = *outAux;
if (split) {
sB.o = (*si).position + ray.d * (EPS * 0.02);
tr.albedoSampled = false;
}
var back: vec4f;
var ez: RayTraceAuxiliary;


let vh = select(1u, rtUniform.loopUnrollGuard >> 1u, split & (coverage > 0.0));
for (var uI = 0u; uI < vh; uI++) {
let result = cT(uv, &tr, sB, &tq, &iP, split & (uI == 0u));
if (!split | (coverage <= 0.0)) { *outAux = iP; return result; }
if (uI == 0u) {
back = result; ez = iP;
tr = *si; tq = *ma; tq.alpha = 1.0;
sB = ray; iP = *outAux;
} else {
(*outAux).albedo = mix(ez.albedo, iP.albedo, coverage);
let dl = mix(ez.normal, iP.normal, coverage);
(*outAux).normal = select(vec3f(0.0), normalize(dl), dot(dl, dl) > 1e-12);
(*outAux).isBlank = ez.isBlank & iP.isBlank;
(*outAux).isShadowCatcher = ez.isShadowCatcher & iP.isShadowCatcher;
(*outAux).shadowCounts = mix(ez.shadowCounts, iP.shadowCounts, coverage);
return mix(back, result, coverage);
}
}
return vec4f(0.0);`:"return cT(uv, si, ray, ma, outAux, false);"}
}



${n===!1&&u?`fn iu(uv: vec2f, ray: Ray, outAux: ptr<function, RayTraceAuxiliary>) -> vec4f {
${m}
var oI: SurfaceInteraction;
var oH: OpenPbrResolvedMaterial;
var ue: RayTraceAuxiliary;
var iY = false;
var query = true;
var split = false;
var coverage = 1.0;
var front = false;
var back: vec4f;
var ez: RayTraceAuxiliary;
var aa: Path; aa.ray = ray;
aa.alpha = select(1.0, 0.0, rtUniform.transmissiveOutputAlphaMin < 1.0);
aa.beta = vec3f(1.0); aa.fromEye = true;
let bounceLimit = max(rtUniform.bounces, 0);
let ft = min(bounceLimit * 3, ${Kt});
var event = 0; var depth = 0; var aJ = false;
var bQ = false;


for (var step = 0; step < (${Kt} + 1) * 2 + 2; step++) {
if (query) {
intersectScene(aa.ray, &si, depth, event != 0, aa.isNextRefraction);
dg(&ma, si.materialIndex, si.uv, si.uv1, si.instanceIndex, si.vertexColor);
}
query = true;
if (!iY) {
${v}
oI = si; oH = ma; ue = *outAux;
iY = true;
coverage = clamp(ma.alpha, 0.0, 1.0);
split = si.hit & ((ma.materialType == STANDARD) | (ma.materialType == UNLIT)) & (coverage < 1.0);
if (split) {
aa.ray.o = si.position + ray.d * (EPS * 0.02);
si.albedoSampled = false;
continue;
}
} else if ((event == 0) & !front & split) {
if (si.hit & (ma.materialType == STANDARD)) {
(*outAux).albedo = select(ma.baseColor, vec3f(1.0), ma.transmissionWeight > 0.5);
(*outAux).normal = select(si.normal, -si.normal,
dot(si.normal, si.position - cameraUniform.viewInv[3].xyz) > 0.0);
si.albedoSampled = ma.transmissionWeight > 0.5;
}
}
if (event == 0) {
bQ = (ma.transmissionWeight < 0.001) & (ma.subsurfaceWeight < 0.001) & (ma.alpha > 0.99);
} else {
kl(&aa, &depth, &si, &ma, aJ);
}
if (bQ & (event > bounceLimit)) { aa.abort = true; }
if (!aa.abort & (event < ft)) {
nY(uv, &aa, &depth, &si, &ma, outAux, &aJ);
}
if (aa.abort | (event >= ft)) {
let result = vec4f(aa.li, aa.alpha);
if (!split | (coverage <= 0.0)) { return result; }
if (front) {
(*outAux).albedo = mix(ez.albedo, (*outAux).albedo, coverage);
let dl = mix(ez.normal, (*outAux).normal, coverage);
(*outAux).normal = select(vec3f(0.0), normalize(dl), dot(dl, dl) > 1e-12);
(*outAux).isBlank = ez.isBlank & (*outAux).isBlank;
(*outAux).isShadowCatcher = ez.isShadowCatcher & (*outAux).isShadowCatcher;
(*outAux).shadowCounts = mix(ez.shadowCounts, (*outAux).shadowCounts, coverage);
return mix(back, result, coverage);
}
back = result; ez = *outAux;
front = true; query = false; event = 0; depth = 0; aJ = false;
si = oI; ma = oH; ma.alpha = 1.0; *outAux = ue;
aa = Path(); aa.ray = ray; aa.beta = vec3f(1.0); aa.fromEye = true;
aa.alpha = select(1.0, 0.0, rtUniform.transmissiveOutputAlphaMin < 1.0);
} else { event++; }
}
return vec4f(0.0);
}
`:n===!1&&!u?`fn iu(uv: vec2f, ray: Ray, outAux: ptr<function, RayTraceAuxiliary>) -> vec4f {
${m}
var aa: Path;
aa.ray = ray;
aa.alpha = select(1.0, 0.0, rtUniform.transmissiveOutputAlphaMin < 1.0);
aa.beta = vec3f(1.0);
aa.fromEye = true;
let bounceLimit = max(rtUniform.bounces, 0);
let ft = min(bounceLimit * 3, ${Kt});
var bQ = false;
var depth = 0;
var aJ = false;



for (var event = 0; event <= ft; event++) {
intersectScene(aa.ray, &si, depth, event != 0, aa.isNextRefraction);
dg(&ma, si.materialIndex, si.uv, si.uv1, si.instanceIndex, si.vertexColor);
if (event == 0) {
${v}
bQ = ma.transmissionWeight < 0.001 && ma.subsurfaceWeight < 0.001 && ma.alpha > 0.99;
} else {
kl(&aa, &depth, &si, &ma, aJ);
}
if (bQ && event > bounceLimit) { aa.abort = true; }
if (aa.abort || event >= ft) { break; }
nY(uv, &aa, &depth, &si, &ma, outAux, &aJ);
if (aa.abort) { break; }
}
return vec4f(aa.li, aa.alpha);
}
`:n===!0&&!u?`
fn iu(uv: vec2f, ray: Ray, outAux: ptr<function, RayTraceAuxiliary>) -> vec4f {
${m}
var oI: SurfaceInteraction;
var oH: OpenPbrResolvedMaterial;
var iY = false;
var aa: Path; aa.ray = ray;
let bounceLimit = max(rtUniform.bounces, 0);
let ft = min(bounceLimit * 3, ${Kt});
var depth = 0; var event = 0; var aJ = false;
var bQ = false;
var mx = 0;
let bo = rtUniform.dispersionWavelengths == 1;
var df = false;
var eX = 0;
var hz: vec4u;
var eO = 0u;
var ba: RayTraceAuxiliary;
let wavelengths = array<f32, 3>(650.0, 510.0, 475.0);
var color = vec3f(0.0); var alpha = 0.0;
var dO = vec3f(0.0);
var dP = vec3f(0.0);
var mN = true;



let wF = min((${Kt} + 1) * 3, i32(rtUniform.loopUnrollGuard * ${Math.ceil((Kt+1)*3/4)}u));
for (var step = 0; step < wF; step++) {
if (!iY | ((event != 0) & !aa.abort)) {
intersectScene(aa.ray, &si, depth, event != 0, aa.isNextRefraction);
dg(&ma, si.materialIndex, si.uv, si.uv1, si.instanceIndex, si.vertexColor);
}
if (event == 0) {
if (!iY) {
${v}
oI = si; oH = ma; iY = true;
hz = s0; eO = cP;
df = si.hit & (ma.transmissionWeight > 0.001) & (ma.transmissionDispersionScale > 0.001);
if (bo & df) {
eX = min(i32(floor(dp(CAMERA_WAVELENGTH) * 3.0)), 2);
}
}
si = oI; ma = oH; ba = *outAux;
if (!bo) {
s0 = hz; cP = eO; bT = 0u;
ba.isBlank = false; ba.isShadowCatcher = false;
}
si.wavelength = 0.0;
if (!bo | df) {
si.wavelength = wavelengths[select(mx, eX, bo)];
ma.specularIor = ee(si.wavelength, ma.specularIor,
ma.transmissionDispersionScale, ma.dispersionAbbeNumber);
}
aa = Path(); aa.ray = ray; aa.beta = vec3f(1.0); aa.fromEye = true;
aa.alpha = select(1.0, 0.0, rtUniform.transmissiveOutputAlphaMin < 1.0);
depth = 0; aJ = false;
bQ = (ma.transmissionWeight < 0.001) & (ma.subsurfaceWeight < 0.001) & (ma.alpha > 0.99);
} else if (!aa.abort) {
kl(&aa, &depth, &si, &ma, aJ);
}
if (bQ & (event > bounceLimit)) { aa.abort = true; }
if (!aa.abort & (event < ft)) {
nY(uv, &aa, &depth, &si, &ma, &ba, &aJ);
}
if (aa.abort | (event >= ft)) {
let result = vec4f(aa.li, aa.alpha);
if (bo) {
*outAux = ba;
let scale = select(1.0, 3.0, df);
return vec4f(result.rgb * scale, result.a);
}
color += result.rgb; alpha = max(alpha, result.a);
dO += ba.albedo;
dP += ba.normal;
mN = mN & ba.isBlank;
mx++;
if (mx >= 3) {
(*outAux).albedo = dO / 3.0;
(*outAux).normal = dP / 3.0;
(*outAux).isBlank = mN;
return vec4f(color, alpha);
}
event = 0;
} else { event++; }
}
return vec4f(0.0);
}
`:`fn iu(uv: vec2f, ray: Ray, outAux: ptr<function, RayTraceAuxiliary>) -> vec4f {
${m}
intersectScene(ray, &si, 0, false, false);
dg(&ma, si.materialIndex, si.uv, si.uv1, si.instanceIndex, si.vertexColor);
${v}
if (SPECTRAL) {




let ug = array<f32, 3>(650.0, 510.0, 475.0);
var vl = vec3f(0.0);
var alpha = 0.0;
var dO = vec3f(0.0);
var dP = vec3f(0.0);
var mN = true;
var si2 = si;
var ma2 = ma;
let hz = s0;
let eO = cP;
let bo = rtUniform.dispersionWavelengths == 1;
let df = si.hit &&
ma.transmissionWeight > 0.001 &&
ma.transmissionDispersionScale > 0.001;
let tm = select(3, 1, bo);
var eX = 0;
if (bo && df) {


eX = min(i32(floor(dp(CAMERA_WAVELENGTH) * 3.0)), 2);
}
for (var i = 0; i < tm; i++) {



if (!bo) {
s0 = hz;
cP = eO;
bT = 0u;
}
si.wavelength = 0.0;
if (!bo || df) {
si.wavelength = ug[select(i, eX, bo)];
ma.specularIor = ee(
si.wavelength,
ma.specularIor,
ma.transmissionDispersionScale,
ma.dispersionAbbeNumber
);
}
var ba: RayTraceAuxiliary;
if (bo) {
ba = *outAux;
} else {
ba.albedo = (*outAux).albedo;
ba.normal = (*outAux).normal;
ba.isBlank = false;
ba.isShadowCatcher = false;
}
let res = iU(uv, &si, ray, &ma, &ba);
if (bo) {
*outAux = ba;
let scale = select(1.0, 3.0, df);
return vec4f(res.rgb * scale, res.a);
}
vl += res.rgb;
alpha = max(alpha, res.a);
dO += ba.albedo;
dP += ba.normal;
mN = mN && ba.isBlank;
si = si2;
ma = ma2;
}
(*outAux).albedo = dO / 3.0;
(*outAux).normal = dP / 3.0;
(*outAux).isBlank = mN;
return vec4f(vl, alpha);
}
else {
return iU(uv, &si, ray, &ma, outAux);
}
}
`}

fn kN(ip: vec2f) -> vec2f {
let p = 2.0 * ip - 1.0;
let greater = abs(p.x) > abs(p.y);
let r = select(p.y, p.x, greater);
let theta = select(PI * (0.5 - 0.25 * p.x / p.y), 0.25 * PI * p.y / p.x, greater);
return r * vec2f(cos(theta), sin(theta));
}


@compute @workgroup_size(${ga}, ${ga}, 1)
fn main(@builtin(global_invocation_id) globalId: vec3u) {
let outputSize = rtUniform.outputSize;
let scaleOffset = rtUniform.scaleOffset;
var jitter = rtUniform.jitter;

${p?`  if (globalId.y >= mtPathParameters.y) { return; }
let pathId = vec2u(globalId.x, globalId.y + mtPathParameters.x);
`:""}  let coord = ${p?"pathId":"globalId.xy"} * vec2u(scaleOffset.xy) + vec2u(scaleOffset.zw);
if (coord.x >= u32(outputSize.x) || coord.y >= u32(outputSize.y)) {
return;
}
let idx = coord.x + coord.y * u32(outputSize.x);

if (
rtUniform.adaptiveSampling != 0 &&
outNormal[idx].a >= textureLoad(
adaptiveSampleTargets,
vec2i(coord),
0
).r
) {
return;
}




let uv = (vec2<f32>(f32(coord.x), f32(coord.y)) + vec2f(0.5)) / outputSize;

aZ = coord;
aQ = u32(outNormal[idx].a) + rtUniform.sampleSequenceOffset;
bT = 0u; cP = 0u;
if (SAMPLING_PATTERN == 0 || SAMPLING_PATTERN == 1) {
jitter = (dZ(CAMERA_PIXEL) - 0.5) / outputSize;
}
gW(coord, i32(aQ ^ dG(rtUniform.sequenceSeed)));
var cam = fj(uv + jitter);

if (cameraUniform.apertureRadius > 0.0) {

let eye = cameraUniform.viewInv[3].xyz;
let forward = -normalize(cameraUniform.viewInv[2].xyz);
let jN = eye + cam.d * (cameraUniform.focusDistance / dot(cam.d, forward));
let sK = cameraUniform.apertureRadius * kN(dZ(CAMERA_LENS));
let origin = (cameraUniform.viewInv * vec4f(sK, 0.0, 1.0)).xyz;
let dir = normalize(jN - origin);
gC(&cam, origin, dir);
}

var outAux: RayTraceAuxiliary;
outAux.albedo = vec3f(0.0);
outAux.normal = vec3f(0.0);
outAux.isBlank = false;
outAux.isShadowCatcher = false;
${p?`  mtPathBegin(coord);
`:""}  var aW = iu(uv + jitter, cam, &outAux);



if (rtUniform.clamping > 0.0) {
let clamping = rtUniform.clamping;
aW = vec4(clamp(aW.rgb, -vec3f(clamping), vec3f(clamping)), aW.a);
}
if (!(aW.x < INF && aW.x > -EPS)) {
aW = vec4f(0.0, 0.0, 0.0, 1.0);
}

if (outAux.isShadowCatcher) {


let bc = hX(cam);
let rh = select(0.0, 1.0, bc.a >= 0.01);
let jW = vec4f(bc.rgb * bc.a, bc.a);



outShadowCatcher[idx].mask += vec4f(1.0, bc.a, rh, 0.0);
outShadowCatcher[idx].moments += vec4f(0.0, 0.0, outAux.shadowCounts);
outShadowCatcher[idx].background += jW;
outColor[idx] += jW;
outAlbedo[idx] += vec4f(outAux.albedo, rh);
ie(idx, bc.rgb, outAux.normal);


let counts = outAux.shadowCounts;
let visibility = 1.0 - select(0.0, counts.x / counts.y, counts.y > 0.0);
ji(idx, visibility * select(
1.0, dot(bc.rgb, luminance), bc.a >= 0.01
));
}
else {
if (HAS_SHADOW_CATCHER && outAux.isBlank && USE_BACKGROUND && !USE_BACKGROUND_MAP && rtUniform.backgroundColor.a >= 0.99999) {





outShadowCatcher[idx].background += aW;
outShadowCatcher[idx].mask.g += aW.a;
}
outColor[idx] += aW;
outAlbedo[idx] += vec4f(outAux.albedo, select(1.0, 0.0, outAux.isBlank));
ie(idx, aW.rgb, outAux.normal);
ji(idx, dot(aW.rgb, luminance));
}
${p?`  mtPathEnd(outAux.normal, outAux.albedo);
`:""}}
`+$h+qh+Jh;const B={USE_BACKGROUND:1,USE_BACKGROUND_MAP:2,USE_GROUNDED_BACKGROUND:4};return w=w.replace(/\b(?:USE_BACKGROUND|USE_BACKGROUND_MAP|USE_GROUNDED_BACKGROUND)\b/g,E=>`((rtUniform.backgroundFlags & ${B[E]}) != 0)`),w=w.replace(new RegExp(`\\b(?:${Object.keys(Xt).join("|")})\\b`,"g"),E=>s===void 0||o&&E==="USE_ENVMAP"&&(s&Xt[E])!==0?`((rtUniform.sceneFeatureFlags & ${Xt[E]}u) != 0u)`:(s&Xt[E])!==0?"true":"false"),w}const Ln=["NUM_MAPS","TLAS_STACK_SIZE","BLAS_STACK_SIZE","NUM_UNIFORM_LIGHTS"],yp=[...Object.keys(Xt),"USE_BACKGROUND","USE_BACKGROUND_MAP","USE_GROUNDED_BACKGROUND",...dl,"USE_ANISOTROPY_DIRECTIONS","USE_COAT_NORMAL_FRAMES","HAS_ALPHA_BLEND","HAS_ALPHA_MASK"];function Wr(i){return Object.keys(i).sort().filter(e=>!Ln.includes(e)&&!yp.includes(e))}function xp(i,e=!1){const t=Ln.map(r=>`const ${r} = ${i[r]};`).join(`
`),a=Wr(i).map(r=>{const n=i[r];return`${e?"const":"override"} ${r} = ${typeof n=="boolean"?n?"true":"false":n.toString()};`}).join(`
`);return`
${t}
${a}
`}function Cp(i,e,t=!1,A="",a=!1,r){return xp(i,t)+_p({...e,spectral:t?!!i.SPECTRAL:void 0,sceneCapabilities:t&&i.SCENE_CAPABILITIES!==void 0?Number(i.SCENE_CAPABILITIES):void 0,materialCapabilities:t&&i.MATERIAL_CAPABILITIES!==void 0?Number(i.MATERIAL_CAPABILITIES):void 0,lightCapabilities:t&&i.LIGHT_CAPABILITIES!==void 0?Number(i.LIGHT_CAPABILITIES):void 0},A,a)}function Qp(i){return i.projection!=="perspective"?0:.5*i.sensorHeight*Math.max(i.zoom,Number.EPSILON)/Math.tan(i.fov*Math.PI/360)}function va(i){if(!(i.fStop>0)||!(i.metersPerUnit>0))return 0;const e=Qp(i)/(2*i.fStop)/1e3/i.metersPerUnit;return Number.isFinite(e)&&e>0?e:0}function $s(i,e,t,A){const a=new Float32Array(36);for(let r=0;r<16;r++)a[r]=i[r],a[16+r]=e[r];return a[32]=t,a[33]=A,a}const Gi=new WeakMap;let Ks=1;function NA(i){return i?(Gi.has(i)||Gi.set(i,Ks++),Gi.has(i.image)||Gi.set(i.image,Ks++),[Gi.get(i),Gi.get(i.image),i.version,i.uvScale.join(","),i.uvOffset.join(","),i.uvChannel,i.flipY,i.wrapS,i.wrapT,i.colorSpace].join(":")):"-"}function Er(i,e){return JSON.stringify(e.map(t=>i[t]))}function Xs(i){return{paramKey:Er(i,Sf),textureKey:Xo.map(e=>{const t=i[e];return typeof t=="number"?String(t):NA(t)}).join("|"),geometryKey:Er(i,Pf)+"|"+NA(i.displacementMap),emissive:Er(i,["emissionColor","emissionLuminance","coatWeight","coatColor","unlit","shadowCatcher"])+"|"+NA(i.coatWeightMap),emissiveMap:NA(i.emissiveMap)}}function Ba(i){return!i.unlit&&!i.shadowCatcher&&li(EA(i))>1e-8}class xc{_snapshots=new WeakMap;capture(e){for(const t of e)this._snapshots.set(t,Xs(t))}classify(e){let t="params",A=!1,a=!1;const r={params:0,emission:1,textures:2,geometry:3};for(const n of e){const s=this._snapshots.get(n),o=Xs(n),l=!s||s.emissive!==o.emissive;A||=l,a||=!s||s.emissiveMap!==o.emissiveMap;const c=!s||o.geometryKey!==s.geometryKey?"geometry":o.textureKey!==s.textureKey?"textures":l?"emission":"params";r[c]>r[t]&&(t=c)}return{level:t,emission:A,emissiveMap:a}}}const Mp=["position","normal","tangent","color","uv","uv1","indices","materialIndex"];function Zs(i){return[i.version,i.dynamic,He(i),...Mp.flatMap(e=>{const t=i[e];return[t?.array,t?.array.length,t?.itemSize]})]}class Cc{_states=new Map;capture(e){this._states.clear();for(const t of e.instanceBindings)t.mesh.geometry===t.geometry&&this._states.set(t.geometry,Zs(t.geometry))}update(e,t){const A=new Map(e.geometries.map((h,u)=>[h,u])),a=new Set;for(const h of t){const u=this._states.get(h.geometry);if(!u||h.materials.length!==1||h.geometry.materialIndex||h.materials[0].displacementMap)return;if(!a.has(h.geometry)){if(Zs(h.geometry).some((m,v)=>m!==u[v]))return;a.add(h.geometry)}}const r=[],n=new Map,s=new Map(e.instanceBindings.map(h=>[h.geometry,h])),o=t.filter(h=>h.geometry.position.array.length>0).map(h=>{const u=h.materials[0];let d=n.get(u);d==null&&(d=r.length,r.push(u),n.set(u,d));const m=s.get(h.geometry);return{mesh:h,geometry:h.geometry,blasIndex:A.get(h.geometry),materialIndices:[d],displacementScale:0,bvhBounds:m?.bvhBounds??In(h.geometry)}}),l=Ii(o);if(t.some(h=>h instanceof rt))return{...e,materials:r,instances:l,instanceBindings:o,emissiveBindings:o.filter(h=>Ba(r[h.materialIndices[0]]))};const c=l,f=c.map((h,u)=>h.bounds.min.every(Number.isFinite)&&h.bounds.max.every(Number.isFinite)&&h.transform.every(Number.isFinite)?u:-1).filter(h=>h>=0),p=f.map(h=>o[h]);return{...e,materials:r,instances:f.map(h=>c[h]),instanceBindings:p,emissiveBindings:p.filter(h=>Ba(r[h.materialIndices[0]]))}}}const Ip=["position","normal","uv","uv1","color","tangent","materialIndex"],eo=new WeakMap;function jr(i){let e=eo.get(i);if(!e){e={source:new Map,prepared:new Map};for(const t of i.instanceBindings)for(const[A,a]of[[e.source,t.mesh.geometry],[e.prepared,t.geometry]]){let r=A.get(a);r||A.set(a,r=[]),r.push(t)}eo.set(i,e)}return e}function Qc(i,e){return e.every(t=>{const A=jr(i).source.get(t)??[];return A.length>0&&A.every(a=>!a.mesh.materials.some(r=>r.displacementMap)&&a.geometry.position.array===t.position.array)})}function Pp(i,e,t,A,a){const{vertexOffset:r,indexOffset:n,materialIndices:s}=t,o=i.vertexCount;for(const c of Ip){if(c==="materialIndex"||a&&c!=="position"&&c!=="normal"&&c!=="tangent")continue;const f=e[c];if(!f)continue;const p=c==="uv1"?i.uv1??i.uv:i[c],h=r*f.itemSize;if(p&&p.itemSize!==f.itemSize)for(let u=0;u<o;u++)for(let d=0;d<f.itemSize;d++)f.array[h+u*f.itemSize+d]=d<p.itemSize?p.array[u*p.itemSize+d]:c==="tangent"&&!Yo(i)?2:0;else p?f.array.set(p.array,h):f.array.fill(c==="color"?1:0,h,h+o*f.itemSize)}if(!A)return;Ml(i,s,e.materialIndex.array,r);const l=i.indexArray;for(let c=0;c<l.length;c++)Sp(e,n+c,l[c]+r)}function On(i,e){const t=i?.geometryStates.get(e);return!!t&&(t.topologyVersion!==e.topologyVersion||t.indices!==e.indices.array||t.indexCount!==e.indexArray.length)}function Mc(i,e,t={}){const A=[],a=[],r=new Set;let n=!1,s=!1,o=0;const l=new Map;i.geometries.forEach((c,f)=>{const p=jr(i).prepared.get(c)?.[0].mesh.geometry??c,h=f<i.blases.length?i.blases[f].bvh:void 0;if(e.has(p)){const u=i.geometryRegions.get(c),d=On(i,p),m=!d&&sl(p);if(t.softwareBvhs!==!1){const w=t.displacement?.get(c),B=w?c:p;let E=l.get(B);if(!E){E=w?He(c)??He(p):He(p);const b=w?{normal:p.normal.array,scale:w.scale,ranges:w.ranges}:void 0;(d||!E||p.dynamic&&E.builder!=="builtin"||!Sn(E,p,b))&&(E=Ra(p,w?.scale,w?.ranges)),Yt(p,E),l.set(B,E)}Yt(c,E),i.blases[f].bvh=E,n||=h?.buffer.byteLength!==E.buffer.byteLength,s||=h?.buffer.byteLength!==E.buffer.byteLength||h?.layout!==E.layout,a.push({blas:E,offset:o})}c.version=p.version,Pp(p,i.geometry,u,d,m);const v=p.vertexCount,g=A[A.length-1];g&&g.first+g.count===u.vertexOffset&&g.topologyChanged===d&&g.deformationOnly===m?g.count+=v:A.push({first:u.vertexOffset,count:v,topologyChanged:d,deformationOnly:m});for(const w of jr(i).prepared.get(c)??[]){const B=t.softwareBvhs===!1?Tl(c):In(c);_s(w.bvhBounds[0],Ze(B[0])),_s(w.bvhBounds[1],Ze(B[1])),r.add(w.mesh)}}f<i.blases.length&&(o+=i.blases[f].bvh.buffer.byteLength)});for(const c of e)i.geometryStates.set(c,{topologyVersion:c.topologyVersion,indices:c.indices.array,indexCount:c.indexArray.length});return{vertices:A,blases:a,meshes:r,resized:n,relocated:s}}function Sp(i,e,t){const A=i.indexArray;A[e]=t}function Ei(i,e,t,A,a,r,n=a){if(!i)return;const s=i.array,o=i.itemSize;let l=n*t+A,c=a*o;if(o===1){for(let f=0;f<r;f++,l+=t,c+=o)e[l]=$(s,c);return}if(o===2){for(let f=0;f<r;f++,l+=t,c+=o)e[l]=$(s,c),e[l+1]=$(s,c+1);return}if(o===3){for(let f=0;f<r;f++,l+=t,c+=o)e[l]=$(s,c),e[l+1]=$(s,c+1),e[l+2]=$(s,c+2);return}if(o===4){for(let f=0;f<r;f++,l+=t,c+=o)e[l]=$(s,c),e[l+1]=$(s,c+1),e[l+2]=$(s,c+2),e[l+3]=$(s,c+3);return}for(let f=0;f<r;f++,l+=t,c+=o)for(let p=0;p<o;p++)e[l+p]=$(s,c+p)}function to(i,e,t,A,a,r,n=!0,s=!1,o=a){Ei(i.position,e,t,A[0],a,r,o),Ei(i.normal,e,t,A[1],a,r,o),s||(Ei(i.uv,e,t,A[2],a,r,o),Ei(i.uv1,e,t,A[3],a,r,o),Ei(i.color,e,t,A[4],a,r,o)),Ei(i.tangent,e,t,A[5],a,r,o),n&&Ei(i.materialIndex,e,t,A[6],a,r,o)}function Ic(i){const e=new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]);if(i)for(let t=0;t<3;t++){const A=t*4,a=Math.hypot(i[A],i[A+1],i[A+2]);if(a>0)for(let r=0;r<3;r++)e[A+r]=i[A+r]/a}return e}function Pc(i){const e=i.find(t=>t.type==="EnvironmentLight");return Ic(e?.type==="EnvironmentLight"?e.transform:void 0)}function Sc(i){return Ic(i&&!Array.isArray(i)&&"type"in i&&i.type==="Equirect"?i.transform:void 0)}function Yr(i){const e=i&&!Array.isArray(i)&&"type"in i?i:void 0,t=e?.type==="GroundedSkybox"?e.rotation??0:0;return new Float32Array([Math.cos(t),Math.sin(t),Math.max(0,e?.intensity??1),0])}const io=new WeakMap,Ao={width:8,height:4};function Dc(i){let e;if(Array.isArray(i))e=Tc(1,1,i);else{const t="map"in i?i.map:i,A=io.get(t);if(A?.image===t.image&&A.version===t.version)return A.result;if(IA(t.image))e=Rc(t.image,1);else if(jt(t.image))e={width:t.image.width,height:t.image.height,data:t.image.data};else return;io.set(t,{image:t.image,version:t.version,result:e})}return e}function Dp(i,e){let t=Tp(e);if("sky"in t){for(const A of i)for(let a=0;a<3;a++)t.ambient[a]+=A.color[a]*A.intensity;return t}return i.length>0&&e.length>0&&(t={width:t.width,height:t.height,data:t.data.slice()}),i.forEach(A=>{Up(A,t)}),t}const ao=new WeakMap;function Tp(i){let e;if(i.length>0){const t=i[0];if(IA(t.map.image)){const a=Number.isFinite(t.intensity)?Math.max(0,t.intensity):1;return Rc(t.map.image,a)}e={width:t.map.image.width,height:t.map.image.height,data:t.map.image.data,distributionCacheKey:t.map.source??t.map.image.data,distributionCacheVersion:t.map.version};const A=Number.isFinite(t.intensity)?Math.max(0,t.intensity):1;if(A!==1||!(e.data instanceof Float32Array)){const a=ao.get(t);if(a&&a.data===e.data&&a.width===e.width&&a.height===e.height&&a.version===t.map.version&&a.intensity===A)return a.image;const r=e.data instanceof Uint8Array||e.data instanceof Uint8ClampedArray?1/255:1,n=Float32Array.from(e.data,(o,l)=>o*r*(l%4===3?1:A)),s={width:e.width,height:e.height,data:n};ao.set(t,{data:e.data,width:e.width,height:e.height,version:t.map.version,intensity:A,image:s}),e=s}}else e=Tc(Ao.width,Ao.height,[0,0,0,1]);return e}function Tc(i,e,t,A){const a=i*e,r=new Float32Array(a*4);return t&&Array.isArray(t)&&Rp(r,t,A),{width:i,height:e,data:r}}function Rp(i,e,t=1){for(let A=0;A<i.length;)i[A++]=e[0]*t,i[A++]=e[1]*t,i[A++]=e[2]*t,i[A++]=e[3];return i}function Up(i,e){const t=i.color,A=i.intensity,a=e.data;for(let r=0;r<a.length;)a[r++]+=t[0]*A,a[r++]+=t[1]*A,a[r++]+=t[2]*A,r++}function Rc(i,e){return{sky:i,width:i.width,height:i.height,intensity:e,ambient:[0,0,0]}}class Uc{_snapshot=[];_image;update(e){const t=e.filter(r=>r.type==="AmbientLight"),A=e.filter(r=>r.type==="EnvironmentLight"),a=[...t.map(Si),...A.map(r=>[r,r.map,r.map.image,r.map.version,r.map.source,r.intensity])];return(a.length!==this._snapshot.length||a.some((r,n)=>!_t(r,this._snapshot[n])))&&(this._image=a.length?Dp(t,A):void 0,this._snapshot=a),this._image}}class Lc{_snapshot=[];_hadTexture=!1;update(e){const t=e.map(n=>n.type==="RectLight"?n.texture:void 0),A=t.flatMap(n=>n?[n,n.version,n.image,n.flipY,...n.uvScale,...n.uvOffset,n.uvChannel,n.wrapS,n.wrapT,n.colorSpace]:[void 0]),a=t.some(n=>!!n),r=(this._hadTexture||a)&&!_t(A,this._snapshot);return this._snapshot=A,this._hadTexture=a,r}}const Lp=`
@group(0) @binding(0) var radiance: texture_2d<f32>;

@group(0) @binding(1) var<storage, read_write> pixels: array<vec2f>;
@group(0) @binding(2) var<storage, read_write> rows: array<vec2f>;
@group(0) @binding(3) var output: texture_storage_2d<rg32float, write>;
var<workgroup> scan: array<f32, 256>;
var<workgroup> tw: f32;

fn rl(pZ: u32) {
workgroupBarrier();
for (var offset = 1u; offset < 256u; offset *= 2u) {
var previous = 0.0;
if (pZ >= offset) { previous = scan[pZ - offset]; }
workgroupBarrier();
scan[pZ] += previous;
workgroupBarrier();
}
}

@compute @workgroup_size(256)
fn scanRows(@builtin(workgroup_id) group: vec3u, @builtin(local_invocation_index) pZ: u32) {
let size = textureDimensions(radiance);
let y = group.x;
if (pZ == 0u) { tw = 0.0; }
workgroupBarrier();
for (var start = 0u; start < size.x; start += 256u) {
let x = start + pZ;
var weight = 0.0;
if (x < size.x) {

var maximum = 0.0;
for (var dy = -1; dy <= 1; dy++) {
for (var dx = -1; dx <= 1; dx++) {
let p = clamp(vec2i(i32(x) + dx, i32(y) + dy), vec2i(0), vec2i(size) - 1);
maximum = max(maximum, dot(textureLoad(radiance, p, 0).rgb, vec3f(0.2126, 0.7152, 0.0722)));
}
}
weight = max(maximum, 1e-12) * sin(3.141592653589793 * (f32(y) + 0.5) / f32(size.y));
}
scan[pZ] = weight / f32(size.x);
rl(pZ);
if (x < size.x) { pixels[y * size.x + x] = vec2f(tw + scan[pZ], weight); }
workgroupBarrier();
if (pZ == 0u) { tw += scan[255]; }
workgroupBarrier();
}
if (pZ == 0u) { rows[y] = vec2f(0.0, tw); }
}

@compute @workgroup_size(256)
fn scanMarginal(@builtin(local_invocation_index) pZ: u32) {
let height = textureDimensions(radiance).y;
if (pZ == 0u) { tw = 0.0; }
workgroupBarrier();
for (var start = 0u; start < height; start += 256u) {
let y = start + pZ;
var integral = 0.0;
if (y < height) { integral = rows[y].y; }
scan[pZ] = integral / f32(height);
rl(pZ);
if (y < height) { rows[y].x = tw + scan[pZ]; }
workgroupBarrier();
if (pZ == 0u) { tw += scan[255]; }
workgroupBarrier();
}
}

@compute @workgroup_size(16, 16)
fn normalize(@builtin(global_invocation_id) id: vec3u) {
let size = textureDimensions(radiance);
let x = id.x;
let y = id.y;
if (x >= size.x + 2u || y >= size.y + 1u) { return; }
var value = vec2f(0.0);
if (x == 0u) {
let total = rows[size.y - 1u].x;
if (y > 0u) { value.x = rows[y - 1u].x / total; }
if (y < size.y) { value.y = rows[y].y / total; }
} else if (y < size.y) {
let integral = rows[y].y;
if (x > 1u) { value.x = pixels[y * size.x + x - 2u].x / integral; }
if (x <= size.x) { value.y = pixels[y * size.x + x - 1u].y / integral; }
}
textureStore(output, vec2i(id.xy), vec4f(value, 0.0, 0.0));
}
`;class ro{device;layout;pipelines;pixels;rows;static supported(e,t,A){return t*A*8<=Math.min(e.limits.maxStorageBufferBindingSize,e.limits.maxBufferSize)}constructor(e){this.device=e,this.layout=e.createBindGroupLayout({label:"Environment distribution",entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,texture:{sampleType:"unfilterable-float"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:3,visibility:GPUShaderStage.COMPUTE,storageTexture:{access:"write-only",format:"rg32float"}}]});const t=e.createShaderModule({label:"Environment distribution",code:Lp}),A=e.createPipelineLayout({bindGroupLayouts:[this.layout]});this.pipelines=["scanRows","scanMarginal","normalize"].map(a=>e.createComputePipeline({label:`Environment distribution ${a}`,layout:A,compute:{module:t,entryPoint:a}}))}build(e,t){const{width:A,height:a}=e;(this.pixels?.size!==A*a*8||this.rows?.size!==a*8)&&(this.dispose(),this.pixels=this.device.createBuffer({label:"Environment row scans",size:A*a*8,usage:GPUBufferUsage.STORAGE}),this.rows=this.device.createBuffer({label:"Environment marginal scan",size:a*8,usage:GPUBufferUsage.STORAGE}));const r=this.device.createBindGroup({layout:this.layout,entries:[{binding:0,resource:e.createView()},{binding:1,resource:{buffer:this.pixels}},{binding:2,resource:{buffer:this.rows}},{binding:3,resource:t.createView()}]}),n=this.device.createCommandEncoder({label:"Environment distribution"}),s=[[a,1],[1,1],[Math.ceil((A+2)/16),Math.ceil((a+1)/16)]];this.pipelines.forEach((o,l)=>{const c=n.beginComputePass();c.setPipeline(o),c.setBindGroup(0,r),c.dispatchWorkgroups(...s[l]),c.end()}),this.device.queue.submit([n.finish()])}dispose(){this.pixels?.destroy(),this.rows?.destroy(),this.pixels=void 0,this.rows=void 0}}function no(i){return`${i.SCENE_CAPABILITIES},${i.MATERIAL_CAPABILITIES},${i.LIGHT_CAPABILITIES}`}function Op(i){let e=0;for(let t of[i.SCENE_CAPABILITIES,i.MATERIAL_CAPABILITIES,i.LIGHT_CAPABILITIES])for(;t;)t&=t-1,e++;return e}class Fp{capacity;variants=new Map;constructor(e=128){this.capacity=e}find(e,t){let a=e+":"+no(t),r=this.variants.get(a);if(!r){let n=1/0;for(const[s,o]of this.variants){if(o.structure!==e||!Wh(o.capabilities,t))continue;const l=Op(o.capabilities);l<=n&&(a=s,r=o,n=l)}}if(r)return this.variants.delete(a),this.variants.set(a,r),r.capabilities}remember(e,t){const A=e+":"+no(t);this.variants.delete(A),this.variants.set(A,{structure:e,capabilities:t}),this.variants.size>this.capacity&&this.variants.delete(this.variants.keys().next().value)}clear(){this.variants.clear()}}function Oc(i,e,t){return Math.min(Math.max(i,e),t)}function Fc(i,e,t=1e-4){for(let A=0;A<i.length;A++)if(Math.abs(i[A]-e[A])>t)return!1;return!0}const zp=typeof navigator<"u"&&navigator.userAgent.match("Macintosh");let lA;function zc(){if(lA!==void 0)return lA;if(lA=!1,zp)try{const i=hi().getContext("webgl"),e=i&&i.getExtension("WEBGL_debug_renderer_info"),t=e&&i.getParameter(e.UNMASKED_RENDERER_WEBGL)||"";t.match(/Apple M/)||t.match(/Apple GPU/)||(lA=!0)}catch{}return lA}const kp=.125;function Np(i,e,t,A,a=i,r=kp){const n=i*Math.sqrt(t/Math.max(e,.1)),s=n<.25?128:16,o=Oc(Math.round(n*s)/s,r,Math.max(r,A));return Math.abs(Math.log(o/a))>=Math.log(1.15)?o:a}const so=new WeakMap;function Vr(i){return"sky"in i?i:i.distributionCacheKey??i.data}function kc(i,e){return i===e?!0:!i||!e?!1:Vr(i)===Vr(e)&&i.width===e.width&&i.height===e.height&&("sky"in i?0:i.distributionCacheVersion??0)===("sky"in e?0:e.distributionCacheVersion??0)}function Nc(i){const e=Vr(i),t=i.distributionCacheVersion??0,A=so.get(e);if(A&&A.width===i.width&&A.height===i.height&&A.version===t)return A.distribution;const a=i.data,r=i.width+2,n=i.height+1,s=Gp(r,n,2),o={width:r,height:n,data:s.array},l=Hp(a,i.width,i.height),c=new Float32Array(i.width*i.height);for(let p=0;p<i.height;p++){const h=p*i.width;for(let u=0;u<i.width;u++)c[h+u]=Math.max(0,l[h+Math.max(0,u-1)],l[h+u],l[h+Math.min(i.width-1,u+1)])}for(let p=0;p<i.height;p++){const h=Math.sin(Math.PI*(p+.5)/i.height),u=Math.max(0,p-1)*i.width,d=p*i.width,m=Math.min(i.height-1,p+1)*i.width;for(let g=0;g<i.width;g++){const w=Math.max(c[u+g],c[d+g],c[m+g],1e-12)*h;s.set(g+2,p,0,s.get(g+1,p,0)+w/i.width),s.set(g+1,p,1,w)}const v=s.get(o.width-1,p,0);for(let g=1;g<s.width;g++)s.set(g,p,0,s.get(g,p,0)/v),s.set(g,p,1,s.get(g,p,1)/v);s.set(0,p+1,0,s.get(0,p,0)+v/i.height),s.set(0,p,1,v)}const f=s.get(0,s.height-1,0);for(let p=0;p<s.height;p++)s.set(0,p,0,s.get(0,p,0)/f),s.set(0,p,1,s.get(0,p,1)/f);return o.data=s.array,so.set(e,{width:i.width,height:i.height,version:t,distribution:o}),o}function Gp(i,e,t){const A=new Float32Array(t*i*e);return{set(a,r,n,s){A[t*(r*i+a)+n]=s},get(a,r,n){return A[t*(r*i+a)+n]},width:i,height:e,channels:t,array:A}}function Hp(i,e,t){return i instanceof Uint8Array||i instanceof Uint8ClampedArray?GA(i,e,t,1/255):(i instanceof Float32Array,GA(i,e,t,1))}function GA(i,e,t,A){const a=Math.max(Math.floor(Qa(i)/(e*t)),1),r=new Float32Array(e*t);for(let n=0;n<t;n++)for(let s=0;s<e;s++){const o=a*(n*e+s);r[n*e+s]=A*(.2126*Qi(i,o)+.7152*Qi(i,o+Math.min(1,a-1))+.0722*Qi(i,o+Math.min(2,a-1)))}return r}const Wp=`
struct OfflineAdaptiveParams {
width: u32,
height: u32,
tileSize: u32,
columns: u32,
rows: u32,
maxSamples: u32,
minSamples: u32,
hasPrevious: u32,
absoluteError: f32,
relativeError: f32,
confidence: f32,
_padding: f32,
}

@group(0) @binding(0) var<uniform> params: OfflineAdaptiveParams;
@group(0) @binding(1) var<storage, read> pilotColor: array<f32>;
@group(0) @binding(2) var<storage, read> pilotMoments: array<f32>;
@group(0) @binding(3) var<storage, read> previousVariance: array<f32>;
@group(0) @binding(4) var<storage, read_write> tileMeans: array<f32>;
@group(0) @binding(5) var<storage, read_write> tileVariances: array<f32>;
@group(0) @binding(6) var<storage, read_write> tileTargets: array<u32>;
@group(0) @binding(7) var targetTexture: texture_storage_2d<r32float, write>;

const LUMINANCE = vec3f(0.2126, 0.7152, 0.0722);

@compute @workgroup_size(64)
fn main(@builtin(global_invocation_id) vQ: vec3u) {
let tile = vQ.x;
let tileCount = params.columns * params.rows;
if (tile >= tileCount) {
return;
}

let tileX = tile % params.columns;
let tileY = tile / params.columns;
let vY = tileX * params.tileSize;
let vZ = tileY * params.tileSize;
let ye = min(vY + params.tileSize, params.width);
let yf = min(vZ + params.tileSize, params.height);
var nW = 0.0;
var jB = 0.0;
var count = 0u;

for (var y = vZ; y < yf; y++) {
for (var x = vY; x < ye; x++) {
let pixel = y * params.width + x;
let offset = pixel * 4u;
let samples = pilotMoments[offset + 3u];
if (samples <= 0.0) {
continue;
}
let mean = dot(
vec3f(
pilotColor[offset],
pilotColor[offset + 1u],
pilotColor[offset + 2u]
),
LUMINANCE
) / samples;
let va = pilotMoments[offset] / samples;
let qg = max(va - mean * mean, 0.0);
var variance = qg;
if (samples > 1.0) {
variance = qg * samples / (samples - 1.0);
}
nW += mean;
jB = max(jB, variance);
count += 1u;
}
}

let mean = nW / f32(max(count, 1u));
var pT = 0.0;
if (params.hasPrevious != 0u) {
pT = previousVariance[tile];
}
let tu = max(jB, pT);
let uD = params.absoluteError + params.relativeError * abs(mean);
let required = ceil(
params.confidence * params.confidence * tu /
max(uD * uD, 1e-16)
);
let targetSamples = u32(min(
f32(params.maxSamples),
max(f32(params.minSamples), required)
));

tileMeans[tile] = mean;


tileVariances[tile] = jB;
tileTargets[tile] = targetSamples;

for (var y = vZ; y < yf; y++) {
for (var x = vY; x < ye; x++) {
textureStore(
targetTexture,
vec2i(i32(x), i32(y)),
vec4f(f32(targetSamples), 0.0, 0.0, 0.0)
);
}
}
}
`;function br(i,e){return Number.isFinite(i)?Math.max(1,Math.round(i)):e}function jp(i,e,t,A,a,r){return!!i&&i.width===e&&i.height===t&&i.tileSize===A&&i.columns===a&&i.rows===r&&i.variance.length===a*r}function Yp(i,e,t){const A=br(i.maxSamples,1),a=Math.min(A,br(i.minSamples,Math.min(A,16))),r=br(i.tileSize,16),n=Math.ceil(e/r),s=Math.ceil(t/r);return{maxSamples:A,minSamples:a,tileSize:r,columns:n,rows:s,absoluteError:Math.max(i.absoluteError??.002,1e-8),relativeError:Math.max(i.relativeError??.03,0),confidence:Math.max(i.confidence??1.96,.01),previous:jp(i.previous,e,t,r,n,s)?i.previous:void 0}}const _r=Float32Array,HA=64,Vp=6;function wa(i){if(i instanceof Error)return i.message;if(typeof i=="string")return i;if(i&&typeof i=="object"&&"message"in i){const e=i.message;if(typeof e=="string"&&e.length>0)return e}return String(i)}function oo(...i){return[...new Set(i.filter(e=>e!=null).map(wa).filter(Boolean))].join(`
`)}function Lt(){return typeof performance>"u"?Date.now():performance.now()}function qp(i){let e=1;for(let t=i.indexOf(`
`);t>=0;t=i.indexOf(`
`,t+1))e++;return e}function Jp(i){let e=2166136261;for(let t=0;t<i.length;t++)e=Math.imul(e^i.charCodeAt(t),16777619);return(e>>>0).toString(16).padStart(8,"0")}function $p(...i){return i.some(e=>/(?:compute )?library failed creation/i.test(wa(e)))}function Kp(i,e,t,A=[]){return Ph(i,e,t,a=>A[a])}class Xp{_textureSelection;_aovPrimitiveCache=new sc;_device;_rayTracePipeline;_targetAspect=1;_width=0;_height=0;_meshes=[];_sceneEnvironment=new Uc;_rectLightTextures=new Lc;_analyticLights=[];_iesProfileTexelOffsets=new Int32Array(0);_materialChanges=new xc;_pendingMaterialUpdate;_materialData;_bindless;_retiredBindless=new Set;_disposed=!1;_maxTextureArrayBytes=Di;_pendingGeometryUpdates=new Set;_needsUpdateMeshData=!0;_needsUpdateMeshMembership=!1;_needsRefitTLAS=!1;_preparedMeshData;_membershipCache=new Cc;_pendingMembershipData;_residentPreparedMeshData;_tlas;_meshSnapshot=[];_snapshotByMesh=new WeakMap;_residentSnapshotByMesh=new WeakMap;_dirtyTransformMeshes=new Set;_dirtyColorMeshes=new Set;_geometriesNeedRefit=new Set;_needsUpdateAnalyticLightsBuffer=!0;_activeTarget={};_targetOutputs=new Map;releaseTarget(e){const t=this._targetOutputs.get(e);if(t){this._targetOutputs.delete(e);for(const A of t.buffers)A.destroy();this._activeTarget===e&&(this._rayTraceBindGroups=void 0,this._needsUpdateBindGroups=!0)}}getTargetMemoryBytes(e){return this._targetOutputs.get(e)?.buffers.reduce((t,A)=>t+A.size,0)??0}useTarget(e){this._activeTarget=e;const t=this._targetOutputs.get(e);[this._outColorBuffer,this._outNormalBuffer,this._outAlbedoBuffer,this._outShadowCatcherBuffer]=t?.buffers??[],t?.bindGroup&&t.pipeline===this._rayTracePipeline&&this._rayTraceBindGroups?this._rayTraceBindGroups[this._bindless?2:3]=t.bindGroup:this._needsUpdateBindGroups=!0}_outColorBuffer;_outNormalBuffer;_outAlbedoBuffer;_outShadowCatcherBuffer;_uniforms;_rtUniform=ph();_mapInfoUniform;_attributeData;_attributeStride=0;_attributeOffsets=[];_attrBuffers;_materialsBuffer;_lightSamplingTexture;_lightSamplingTextureSize=[0,0];_lightDomainDiagnostics={environment:{count:0,weight:0,pmf:0},infinite:{count:0,weight:0,pmf:0},localAndEmissive:{count:0,weight:0,pmf:0}};_openPbrEnergyLut;_bvhBuffer;_instancesBuffer;_emissiveCache=new Ps;_lightChoices=new _A;_shadowCatcherLightChoices=new _A;_lightSamplingData;_lightSamplingScratch;_lightSamplingTriangleCount=-1;_emissiveTriangles=[];_analyticLightSelectionPmfs=[];_needsUpdateLightSamplingData=!0;_adaptiveSamplingTexture;_adaptiveSamplingTextureSize=[1,1];_offlineAdaptivePipeline;_offlineAdaptiveHistory;_mapsSampler;_maps;_envImageSource;_envTex;_envDistributionTex;_envDistribution;_skyBaker;_backgroundImageSource;_backgroundTex;_rayTracePipelineLayout;_rayTraceBindGroups;_blasLayoutMask=1;_compiledBlasLayoutMask=0;_compiledAnisotropyDirections=!1;_compiledCoatNormals=!1;_compiledHasAlpha=!0;_compiledSceneHasAlpha=!0;_alphaBlendStrategy="stochastic";_constants=bh();_retainedShaderCapabilities;_retainedShaderStructure;_shaderCapabilities=new Fp;_prevPipelineConstants={};_prevDefinesCode="";_prevPipelineInputs;_hasTransmission=!1;_hasShadowCatcher=!1;_hasDisplacement=!1;_bounces=-1;_bevelSamples=Fa;_directLightCandidates=dc;_clamping;_transmissiveAlphaMin=1;_viewProjInv=ti();_cameraWorld=ti();_apertureRadius=0;_focusDistance=10;_needsUpdateBindGroups=!0;_computeShaderModule;_aovPipelines=new WeakMap;_depthCompute;_depthTracePipeline;_depthPipeline;_shaderCache;_debugBVHBuffer;_isCompilingShader=!1;_shaderCompilationDiagnostics;_pipelineError;_bakePipelineConstants=!0;_failedPipelineSignature;constructor(e,t={requested:"atlas"}){this._textureSelection=t,this._device=e,this._shaderCache=new nc(e),t.support&&(this._bindless=new Lh(e)),this._uniforms={cameraUniform:this._uniformBuffer(144),rtUniform:this._uniformBuffer(this._rtUniform.buffer.byteLength),analyticLights:this._uniformBuffer(HA*Vp*4*4)},this._mapInfoUniform=this._uniformBuffer(16),this._openPbrEnergyLut=e.createTexture({format:"r32float",label:"OpenPBR opaque dielectric energy compensation",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST,size:{width:Zt,height:MA}}),e.queue.writeTexture({texture:this._openPbrEnergyLut},yc(),{bytesPerRow:Zt*Float32Array.BYTES_PER_ELEMENT},{width:Zt,height:MA}),this._mapsSampler=e.createSampler({minFilter:"linear",magFilter:"linear",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"}),this._setBackgroundMap(void 0),this._adaptiveSamplingTexture=e.createTexture({format:"r32float",label:"Adaptive sample targets placeholder",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.STORAGE_BINDING,size:[1,1]}),e.queue.writeTexture({texture:this._adaptiveSamplingTexture},new Float32Array([Number.MAX_SAFE_INTEGER]),{bytesPerRow:4},[1,1])}getOutputBuffer(){return{color:this._outColorBuffer,normal:this._outNormalBuffer,albedo:this._outAlbedoBuffer,shadowCatcher:this._outShadowCatcherBuffer}}_ensureAdaptiveSamplingTexture(e,t){this._adaptiveSamplingTextureSize[0]===e&&this._adaptiveSamplingTextureSize[1]===t||(this._adaptiveSamplingTexture.destroy(),this._adaptiveSamplingTexture=this._device.createTexture({format:"r32float",label:"Adaptive sample targets",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.STORAGE_BINDING,size:[e,t]}),this._adaptiveSamplingTextureSize=[e,t],this._needsUpdateBindGroups=!0)}async prepareOfflineAdaptiveSampling(e){const t=this._width,A=this._height;if(!t||!A||!this._outColorBuffer||!this._outNormalBuffer)return;const a=Yp(e,t,A),{maxSamples:r,minSamples:n,tileSize:s,columns:o,rows:l,absoluteError:c,relativeError:f,confidence:p,previous:h}=a,u=o*l,d=u*Float32Array.BYTES_PER_ELEMENT,m=this._offlineAdaptiveHistory;let v=!1,g;h&&m?.history===h?g=m.varianceBuffer:(g=this._device.createBuffer({label:h?"Offline previous tile variance upload":"Offline empty tile variance",size:h?d:Float32Array.BYTES_PER_ELEMENT,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this._device.queue.writeBuffer(g,0,h?.variance??new Float32Array(1)),v=!0);const w=this._device.createBuffer({label:"Offline adaptive sampling parameters",size:48,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),B=new ArrayBuffer(48);new Uint32Array(B,0,8).set([t,A,s,o,l,r,n,h?1:0]),new Float32Array(B,32,4).set([c,f,p,0]),this._device.queue.writeBuffer(w,0,B);const E=this._device.createBuffer({label:"Offline tile mean luminance",size:d,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC}),b=this._device.createBuffer({label:"Offline current tile variance",size:d,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC}),x=this._device.createBuffer({label:"Offline tile sample targets",size:d,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC}),y=this._device.createBuffer({label:"Offline compact tile history readback",size:d*3,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});this._ensureAdaptiveSamplingTexture(t,A),this._offlineAdaptivePipeline??=await this._device.createComputePipelineAsync({label:"Offline adaptive sampling planner",layout:"auto",compute:{module:this._device.createShaderModule({label:"Offline adaptive sampling planner",code:Wp}),entryPoint:"main"}});const T=this._device.createBindGroup({label:"Offline adaptive sampling planner",layout:this._offlineAdaptivePipeline.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:w}},{binding:1,resource:{buffer:this._outColorBuffer}},{binding:2,resource:{buffer:this._outNormalBuffer}},{binding:3,resource:{buffer:g}},{binding:4,resource:{buffer:E}},{binding:5,resource:{buffer:b}},{binding:6,resource:{buffer:x}},{binding:7,resource:this._adaptiveSamplingTexture.createView()}]}),I=this._device.createCommandEncoder({label:"Offline adaptive sampling planner"}),P=I.beginComputePass({label:"Offline adaptive sampling planner"});P.setPipeline(this._offlineAdaptivePipeline),P.setBindGroup(0,T),P.dispatchWorkgroups(Math.ceil(u/64)),P.end(),I.copyBufferToBuffer(E,0,y,0,d),I.copyBufferToBuffer(b,0,y,d,d),I.copyBufferToBuffer(x,0,y,d*2,d),this._device.queue.submit([I.finish()]);let S=!1;try{await y.mapAsync(GPUMapMode.READ);const R=y.getMappedRange(),L=new Float32Array(R,0,u).slice(),H=new Float32Array(R,d,u).slice(),J=new Uint32Array(R,d*2,u).slice(),_={width:t,height:A,tileSize:s,columns:o,rows:l,meanLuminance:L,variance:H,sampleTargets:J};let F=n,V=0;for(let Z=0;Z<u;Z++){const ie=J[Z];F=Math.max(F,ie);const N=Z%o,K=Math.floor(Z/o),ge=Math.min(s,t-N*s),ue=Math.min(s,A-K*s);V+=ie*ge*ue}return this._offlineAdaptiveHistory={history:_,varianceBuffer:b},this._rtUniform.views.adaptiveSampling[0]=1,S=!0,m?.varianceBuffer!==b&&m?.varianceBuffer.destroy(),{maximumTarget:F,averageTarget:V/(t*A),history:_}}finally{y.mapState==="mapped"&&y.unmap(),y.destroy(),E.destroy(),x.destroy(),w.destroy(),v&&g.destroy(),S||b.destroy()}}_createPipelineLayout(){const e={label:"Ray Trace Pipeline Layout",bindGroupLayouts:(this._bindless?Fh():vc()).map(t=>this._shaderCache.createBindGroupLayout(t))};this._rayTracePipelineLayout=this._shaderCache.createPipelineLayout(this._bindless?or(e):e)}_updateGPUBuffer(e,t,A,a=hh){const r=this._device,n=Math.max(A.byteLength,a);return(t==null||t.size<n)&&(this._needsUpdateBindGroups=!0,t&&t.destroy(),t=r.createBuffer({label:e,size:n,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST|GPUBufferUsage.COPY_SRC})),this._device.queue.writeBuffer(t,0,A.buffer),t}_uniformBuffer(e){return this._needsUpdateBindGroups=!0,this._device.createBuffer({size:e,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST})}async updatePipeline(){if(this._isCompilingShader)return;this._isCompilingShader=!0;let e,t,A;try{if(this._bindless?.retirement&&await this._bindless.retirement,this._disposed)return;this._needsUpdateMeshData?this._updateMeshData():this._needsUpdateMeshMembership&&this._updateMeshMembership(),this._pendingGeometryUpdates.size&&this._updateGeometryData(),this._needsRefitTLAS&&this._refitMeshInstances(),this._dirtyColorMeshes.size&&this._updateMeshColors(),this._pendingMaterialUpdate&&this._updateMaterialData(),this._needsUpdateLightSamplingData&&this._updateLightSamplingData();const a=this._device,r=JSON.stringify([this._constants,this._hasDisplacement,this._alphaBlendStrategy,this._blasLayoutMask,this._bakePipelineConstants]);if(r===this._prevPipelineInputs&&this._rayTracePipeline&&this._rayTraceBindGroups&&!this._needsUpdateBindGroups)return;this._rtUniform.views.sceneFeatureFlags[0]=Ec(this._constants);const n=qs(this._constants),s={...this._constants,...n},o=!!s.HAS_ALPHA_BLEND&&this._alphaBlendStrategy==="deterministic-source-over",l=!!s.HAS_ALPHA,c=Wr(s),f=Ln.map(y=>`const ${y} = ${s[y]};`).join(`
`),p={hasDisplacement:this._hasDisplacement,hasAlpha:o,hasSceneAlpha:l,hasAnisotropyDirections:!!s.USE_ANISOTROPY_DIRECTIONS,hasCoatNormals:!!s.USE_COAT_NORMAL_FRAMES,blasLayoutMask:this._blasLayoutMask,bakePipelineConstants:this._bakePipelineConstants},h=JSON.stringify({...p,defineCode:f,constants:c.filter(y=>!(y in n)).map(y=>[y,s[y]])}),u=this._shaderCapabilities.find(h,n)??qs(this._constants,h===this._retainedShaderStructure?this._retainedShaderCapabilities:void 0);Object.assign(s,u);const d=JSON.stringify({...p,constants:Object.keys(s).sort().map(y=>[y,s[y]])});if(e=d,d===this._failedPipelineSignature)return;this._pipelineError=void 0;const m=Wr(this._prevPipelineConstants),v=!this._rayTracePipelineLayout||!this._computeShaderModule||c.join(",")!==m.join(",")||f!==this._prevDefinesCode||o!==this._compiledHasAlpha||l!==this._compiledSceneHasAlpha||!!s.USE_ANISOTROPY_DIRECTIONS!==this._compiledAnisotropyDirections||!!s.USE_COAT_NORMAL_FRAMES!==this._compiledCoatNormals||this._blasLayoutMask!==this._compiledBlasLayoutMask||this._bakePipelineConstants&&c.some(y=>s[y]!==this._prevPipelineConstants[y]),g=v||c.some(y=>s[y]!==this._prevPipelineConstants[y]);t=g?Lt():void 0;let w=0,B=0,E=this._shaderCompilationDiagnostics?.sourceBytes??0,b=this._shaderCompilationDiagnostics?.sourceLines??0,x=this._shaderCompilationDiagnostics?.modules[0]?.sourceFingerprint??"";if(v){const y=Lt();let T=Cp(s,{hasDisplacement:this._hasDisplacement,hasAlpha:o,hasSceneAlpha:l,hasAnisotropyDirections:!!s.USE_ANISOTROPY_DIRECTIONS,hasCoatNormals:!!s.USE_COAT_NORMAL_FRAMES,blasLayoutMask:this._blasLayoutMask,dynamicEnvironment:!0},this._bakePipelineConstants);this._bindless&&(T=Oh(T,this._textureSelection.support.enable)),E=T.length,b=qp(T),x=Jp(T),w=Lt()-y;const I=Lt();this._computeShaderModule=this._shaderCache.createShaderModule({label:"Ray Trace",code:T}),B=Lt()-I,this._compiledHasAlpha=o,this._compiledSceneHasAlpha=l,this._compiledAnisotropyDirections=!!s.USE_ANISOTROPY_DIRECTIONS,this._compiledCoatNormals=!!s.USE_COAT_NORMAL_FRAMES,this._compiledBlasLayoutMask=this._blasLayoutMask}if(g){if(!this._rayTracePipelineLayout){a.pushErrorScope("validation");let T=!0;try{this._createPipelineLayout();const I=await a.popErrorScope();if(T=!1,I)throw I}catch(I){const P=T?await a.popErrorScope().catch(()=>null):null;this._rayTracePipelineLayout=void 0;const S=oo(I,P);throw new Error(`Unable to create the ray tracing pipeline layout: ${S}`)}}this._prevPipelineConstants={...s},this._prevDefinesCode=f,this._needsUpdateBindGroups=!0,a.pushErrorScope("validation");let y=!0;try{const T=this._bakePipelineConstants?void 0:c.reduce((L,H)=>(L[H]=+s[H],L),{}),I={label:"Ray Trace",entryPoint:"main",firstFrameRequired:!0,status:"compiling"};A=Lt(),I.startedAtMs=0,I.concurrentCompilationCount=1,this._shaderCompilationDiagnostics={status:"compiling",sourceBytes:E,sourceLines:b,pipelineCount:1,completedPipelineCount:0,sourceGenerationTimeMs:w,moduleCreationTimeMs:B,modules:[{label:"Ray Trace",sourceBytes:E,sourceLines:b,sourceFingerprint:x}],pipelines:[{...I}],maximumConcurrentPipelineCount:1,peakConcurrentPipelineCount:1};let P;try{P=await this._shaderCache.createComputePipelineAsync({label:"Ray Trace",layout:this._rayTracePipelineLayout,compute:{module:this._computeShaderModule,entryPoint:"main",constants:T}}),I.status="ready"}catch(L){I.status="failed",I.error=wa(L);const J=((await this._computeShaderModule.getCompilationInfo().catch(()=>{}))?.messages??[]).filter(_=>_.type==="error");throw J.length?new Error(J.map(_=>`Ray Trace WGSL ${_.lineNum}:${_.linePos} ${_.message}`).join(`
`)):L}finally{I.endedAtMs=Lt()-A,I.durationMs=I.endedAtMs}this._rayTracePipeline=P,this._depthCompute={module:this._computeShaderModule,constants:T};const S=await a.popErrorScope();if(y=!1,S)throw S;const R=Lt();this._shaderCompilationDiagnostics={...this._shaderCompilationDiagnostics,status:"ready",completedPipelineCount:1,pipelines:[{...I}],pipelineCompilationTimeMs:R-A,totalTimeMs:R-t}}catch(T){const I=y?await a.popErrorScope().catch(()=>null):null,P=oo(T,I);if(!this._bakePipelineConstants&&$p(T,I)){const S=Lt();this._shaderCompilationDiagnostics?.status==="compiling"&&(this._shaderCompilationDiagnostics={...this._shaderCompilationDiagnostics,status:"failed",pipelineCompilationTimeMs:A==null?void 0:S-A,totalTimeMs:t==null?void 0:S-t,error:P}),this._bakePipelineConstants=!0,this._rayTracePipeline=void 0,this._rayTraceBindGroups=void 0,this._computeShaderModule=void 0,this._prevPipelineConstants={},console.warn("WebGPU pipeline specialization failed; retrying with constants baked into WGSL.");return}throw new Error(P)}}if(this._disposed)return;this._needsUpdateBindGroups&&(this._needsUpdateBindGroups=!1,this._updateBindGroups()),this._retainedShaderCapabilities=u,this._retainedShaderStructure=h,this._shaderCapabilities.remember(h,u),this._prevPipelineInputs=r,this._failedPipelineSignature=void 0}catch(a){if(this._disposed)return;this._pipelineError=a;const r=Lt();this._shaderCompilationDiagnostics?.status==="compiling"&&(this._shaderCompilationDiagnostics={...this._shaderCompilationDiagnostics,status:"failed",pipelineCompilationTimeMs:A==null?void 0:r-A,totalTimeMs:t==null?void 0:r-t,error:wa(a)}),this._failedPipelineSignature=e,this._rayTracePipeline=void 0,this._rayTraceBindGroups=void 0,this._prevPipelineConstants={},this._needsUpdateBindGroups=!0,console.error("Failed to update WebGPU ray tracing pipeline.",a)}finally{this._isCompilingShader=!1}}_prepareAovPipelines(e){const t=this._rayTracePipeline;if(!t||!this._depthCompute)return;const A=(ht(e)&24)!==0;let a=this._aovPipelines.get(t);a||(a=new Map,this._aovPipelines.set(t,a));let r=a.get(A);if(!r){r={},a.set(A,r);const n=r,s=this._bindless,o=s?2:3,l=this._device.createBindGroupLayout({entries:[{binding:5,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:6,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:7,visibility:GPUShaderStage.COMPUTE,buffer:{type:"read-only-storage"}},{binding:8,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}},{binding:9,visibility:GPUShaderStage.COMPUTE,buffer:{type:"read-only-storage"}}]}),c={bindGroupLayouts:Array.from({length:o},(h,u)=>t.getBindGroupLayout(u)).concat(l)},f=this._device.createPipelineLayout(s?or(c):c),p={...this._depthCompute,constants:{...this._depthCompute.constants,DEPTH_QUERY_MODE:1,AOV_REFLECTANCE:A?1:0}};Promise.all([this._shaderCache.createComputePipelineAsync({label:"AOV accumulation",layout:f,compute:{...p,entryPoint:"aovTrace"}}),this._shaderCache.createComputePipelineAsync({label:"AOV center",layout:f,compute:{...p,entryPoint:"aovTraceCenter"}})]).then(([h,u])=>{n.accumulation=h,n.center=u},h=>{n.error=h})}if(r.error)throw r.error;return r}prepareAovs(e){const t=this._prepareAovPipelines(e);return!!t?.accumulation&&!!t.center}renderAovs(e,t,A,a,r){const n=this._rayTraceBindGroups;if(!n||!this._tlas||!this._preparedMeshData||!r.length)return!1;const s=this._prepareAovPipelines(r);if(!s?.accumulation||!s.center)return!1;e.resize(this._width,this._height);const o=this._bindless,l=o?2:3,c=Math.min(A,a);if(e.centerReady&&e.samples>=c)return!0;if(!e.frame){const h=this._aovPrimitiveCache.get(this._preparedMeshData,this._tlas),u=oc(this._preparedMeshData,this._tlas,t,this._width,this._height,e.history,h,!1);e.frame=u.frame,e.setScene(u.words,h)}this._device.queue.writeBuffer(this._uniforms.rtUniform,0,this._rtUniform.buffer),this._device.queue.writeBuffer(this._uniforms.cameraUniform,0,$s(this._viewProjInv,this._cameraWorld,this._apertureRadius,this._focusDistance));const f=this._device,p=(h,u)=>{const d=f.createBuffer({size:16,usage:GPUBufferUsage.UNIFORM,mappedAtCreation:!0});new Uint32Array(d.getMappedRange()).set([e.width,e.height,u,ht(r)]),d.unmap();const m=f.createBindGroup({layout:h.getBindGroupLayout(l),entries:[{binding:5,resource:{buffer:e.accumulation}},{binding:6,resource:{buffer:e.center}},{binding:7,resource:{buffer:e.scene}},{binding:8,resource:{buffer:d}},{binding:9,resource:{buffer:e.previousCenter}}]}),v=f.createCommandEncoder({label:"AOV"}),g=v.beginComputePass();o?.table&&VA(g,o.table),g.setPipeline(h);for(let w=0;w<l;w++)g.setBindGroup(w,n[w]);g.setBindGroup(l,m),g.dispatchWorkgroups(Math.ceil(e.width/8),Math.ceil(e.height/8)),g.end(),f.queue.submit([v.finish()]),d.destroy()};for(e.centerReady||(p(s.center,0),e.centerReady=!0,e.history.accept(e.frame)),(ht(r)&31)===0&&(e.samples=c);e.samples<c;)p(s.accumulation,e.samples),e.samples++;return!0}async readDepthSamples(e,t){const A=this._rayTracePipeline,a=this._rayTraceBindGroups,r=this._bindless,n=r?.revision;if(!A||!a||!this._depthCompute||this._isCompilingShader)return;const s=Dn(e,t??this._width/this._height);if(this._depthTracePipeline!==A||!this._depthPipeline){const u=this._shaderCache.createBindGroupLayout({label:"Depth query output",entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:4,visibility:GPUShaderStage.COMPUTE,buffer:{type:"uniform"}}]}),d={label:"Depth query layout",bindGroupLayouts:(r?[0,1]:[0,1,2]).map(v=>A.getBindGroupLayout(v)).concat(u)},m=this._shaderCache.createPipelineLayout(r?or(d):d);this._depthTracePipeline=A,this._depthPipeline=this._shaderCache.createComputePipelineAsync({label:"Depth query",layout:m,compute:{...this._depthCompute,entryPoint:"depthQuery",constants:{...this._depthCompute.constants,DEPTH_QUERY_MODE:1}}})}const o=await this._depthPipeline;if(A!==this._rayTracePipeline||a!==this._rayTraceBindGroups||r!==this._bindless||n!==r?.revision)return;const l=this._device,c=Kl*16,f=l.createBuffer({label:"Depth samples",size:c,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC}),p=l.createBuffer({label:"Depth readback",size:c,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),h=l.createBuffer({label:"Depth area",size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});try{l.queue.writeBuffer(h,0,s);const u=l.createBindGroup({layout:o.getBindGroupLayout(r?2:3),entries:[{binding:0,resource:{buffer:f}},{binding:4,resource:{buffer:h}}]}),d=l.createCommandEncoder({label:"Depth query"}),m=d.beginComputePass();r?.table&&VA(m,r.table),m.setPipeline(o);for(let v=0;v<(r?2:3);v++)m.setBindGroup(v,a[v]);return m.setBindGroup(r?2:3,u),m.dispatchWorkgroups(1),m.end(),d.copyBufferToBuffer(f,0,p,0,c),l.queue.submit([d.finish()]),await p.mapAsync(GPUMapMode.READ),Xl(new Float32Array(p.getMappedRange()))}finally{p.mapState==="mapped"&&p.unmap(),p.destroy(),f.destroy(),h.destroy()}}isCompilingShader(){return this._isCompilingShader}isPipelineReady(){return!!this._rayTracePipeline&&!!this._rayTraceBindGroups}getPipelineError(){return this._pipelineError}_updateBindGroups(){const{_device:e}=this,t=this._rayTracePipeline;if(!t)throw new Error("WebGPU ray tracing bind-group pipeline is not ready.");if(!this._bvhBuffer||!this._instancesBuffer)throw new Error("WebGPU BVH buffers are not ready.");const A=[this._bvhBuffer,this._instancesBuffer,this._attrBuffers,this._materialsBuffer].map((c,f)=>({binding:f,resource:{buffer:c}})),a=[...this._bindless?[]:[{binding:0,resource:this._mapsSampler},{binding:1,resource:this._maps.createView()}],{binding:3,resource:{buffer:this._bindless?.metadata??this._mapInfoUniform}},{binding:4,resource:this._envTex.createView()},{binding:5,resource:this._envDistributionTex.createView()},{binding:6,resource:this._backgroundTex.createView()},{binding:8,resource:this._lightSamplingTexture.createView()},{binding:9,resource:this._openPbrEnergyLut.createView()},{binding:10,resource:this._adaptiveSamplingTexture.createView()}],r=e.createBindGroup({layout:t.getBindGroupLayout(0),entries:this._bindless?A.concat(a.map(c=>({...c,binding:c.binding+4}))):A}),n=this._bindless?void 0:e.createBindGroup({layout:t.getBindGroupLayout(1),entries:a}),s=e.createBindGroup({layout:t.getBindGroupLayout(this._bindless?1:2),entries:Object.keys(this._uniforms).map((c,f)=>({binding:f,resource:{buffer:this._uniforms[c]}}))}),o=this._targetOutputs.get(this._activeTarget),l=o.pipeline===t&&o.bindGroup||e.createBindGroup({layout:t.getBindGroupLayout(this._bindless?2:3),entries:[this._outColorBuffer,this._outNormalBuffer,this._outAlbedoBuffer,this._outShadowCatcherBuffer].map((c,f)=>({binding:f,resource:{buffer:c}}))});o.bindGroup=l,o.pipeline=t,this._rayTraceBindGroups=[r,...n?[n]:[],s,l]}createPass(e,t,A,a){if(this._needsUpdateAnalyticLightsBuffer){const c=Kp(this._analyticLights,this._materialData.getLightTexturesIndices(),this._analyticLightSelectionPmfs,this._iesProfileTexelOffsets);this._device.queue.writeBuffer(this._uniforms.analyticLights,0,c.buffer,0,c.buffer.byteLength),this._needsUpdateAnalyticLightsBuffer=!1}const r=Math.ceil(this._width/A[0]),n=Math.ceil(this._height/A[1]);this._device.queue.writeBuffer(this._uniforms.rtUniform,0,this._rtUniform.buffer),t&&(e.clearBuffer(this._outColorBuffer),e.clearBuffer(this._outNormalBuffer),e.clearBuffer(this._outAlbedoBuffer),e.clearBuffer(this._outShadowCatcherBuffer));const s={},o=a?.querySet;o&&(s.timestampWrites={querySet:o,beginningOfPassWriteIndex:0,endOfPassWriteIndex:1});const l=e.beginComputePass(s);if(this._bindless?.table&&VA(l,this._bindless.table),!this._rayTracePipeline||!this._rayTraceBindGroups)throw new Error("WebGPU ray tracing pass was submitted before it was ready.");l.setPipeline(this._rayTracePipeline),this._rayTraceBindGroups.forEach((c,f)=>{l.setBindGroup(f,c)}),l.dispatchWorkgroups(Math.ceil(r/ga),Math.ceil(n/ga),1),l.end()}async getDebugBVHData(){if(!this._debugBVHBuffer)throw new Error("software-bvh exposes no CPU-readable BVH debug buffer");return{buffer:this._debugBVHBuffer}}getDiagnostics(){const e=this._materialData instanceof na?this._materialData.textureAtlasStats:void 0;return{textureAtlas:e,materialTextures:{requested:this._textureSelection.requested,active:this._bindless?"bindless":"atlas",fallbackReason:this._textureSelection.fallbackReason,...this._bindless?.diagnostics??{textureCount:e?.textureCount??0,estimatedBytes:e?.estimatedBytes??0,scale:e?.scale??1,metadataBytes:0,resourceTableCapacity:0,retiredBytes:0}},shaderCompilation:this._shaderCompilationDiagnostics,lightSampling:{emissiveTriangles:this._emissiveTriangles.length,activeChoices:this._rtUniform.views.lightChoiceCount[0],totalWeight:this._rtUniform.views.lightWeightTotal[0],domains:this._lightDomainDiagnostics},bvh:{tlasTraversalStackSize:this._constants.TLAS_STACK_SIZE,blasTraversalStackSize:this._constants.BLAS_STACK_SIZE}}}setAlphaBlendStrategy(e){const t=e==="deterministic-source-over"?e:"stochastic";return t===this._alphaBlendStrategy?!1:(this._alphaBlendStrategy=t,this._constants.HAS_ALPHA_BLEND&&(this._computeShaderModule=void 0,this._rayTracePipeline=void 0,this._rayTracePipelineLayout=void 0,this._rayTraceBindGroups=void 0,this._prevPipelineConstants={},this._failedPipelineSignature=void 0,this._needsUpdateBindGroups=!0),!0)}hasDepthOfField(){return this._apertureRadius>0}setBounce(e){const t=ma(e),A=this._bounces!==t;return this._bounces=t,this._rtUniform.views.bounces[0]=t,A}setDirectLightCandidates(e){const t=Rn(e),A=this._directLightCandidates!==t;return this._directLightCandidates=t,this._rtUniform.views.directLightCandidates[0]=t,A}setClamping(e){const t=this._clamping!==e;return this._rtUniform.views.clamping[0]=e??0,this._clamping=e,t}setBevelSamples(e){const t=Un(e),A=this._bevelSamples!==t;return A&&(this._bevelSamples=t,this._constants.BEVEL_SAMPLES=t),A}setSamplingPattern(e,t,A=0){const a=Ch(e,t,A),{code:r,logSPP:n}=a,s=this._rtUniform.views,o=this._constants.SAMPLING_PATTERN!==r||s.sequenceSeed[0]!==A>>>0||r===1&&s.zSobolLogSPP[0]!==n;return this._constants.SAMPLING_PATTERN=r,Qh(s,a),o}setSampleSequenceOffset(e){this._rtUniform.views.sampleSequenceOffset[0]=e}setVarianceMoments(e){this._rtUniform.views.varianceMoments[0]=e?1:0}setAdaptiveSamplingTargets(e){if(this._rtUniform.views.adaptiveSampling[0]=e?1:0,!e)return;const{width:t,height:A,data:a}=e;if(t<=0||A<=0||a.length!==t*A)throw new Error("Adaptive sample targets do not match their dimensions.");this._ensureAdaptiveSamplingTexture(t,A),this._device.queue.writeTexture({texture:this._adaptiveSamplingTexture},a,{bytesPerRow:t*Float32Array.BYTES_PER_ELEMENT},[t,A])}setQuality(e){xh(this._rtUniform.views,e)}_setEnvMap(e){const t=this._device;if(!kc(e,this._envImageSource)||!this._envTex){this._envImageSource=e;const A=e&&"sky"in e?e:void 0;if(A&&(A.width+2>t.limits.maxTextureDimension2D||A.height+1>t.limits.maxTextureDimension2D))throw new RangeError("ProceduralSky resolution exceeds the device texture size limit.");const a=e&&(A||e.width*e.height>=65536)&&ro.supported(t,e.width,e.height);if(A&&!a)throw new RangeError("ProceduralSky resolution exceeds the GPU sampling storage limit; reduce resolution.");const r=e&&!("sky"in e)&&!a?Nc(e):void 0,n=e?e.width+2:1,s=e?e.height+1:1,o=e?.width??1,l=e?.height??1,c=!this._envTex||this._envTex.width!==o||this._envTex.height!==l||!this._envDistributionTex||this._envDistributionTex.width!==n||this._envDistributionTex.height!==s;if(c){this._envTex?.destroy(),this._envDistributionTex?.destroy();const f=GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT;this._envTex=t.createTexture({format:"rgba32float",usage:f|GPUTextureUsage.STORAGE_BINDING,label:"Env",size:{width:o,height:l,depthOrArrayLayers:1}}),this._envDistributionTex=t.createTexture({format:"rg32float",usage:f|GPUTextureUsage.STORAGE_BINDING,label:"Env Distribution",size:{width:n,height:s,depthOrArrayLayers:1}})}e?("sky"in e?(this._skyBaker??=new Ws(t),this._skyBaker.bake(e,this._envTex)):t.queue.writeTexture({texture:this._envTex},e.data.buffer,{bytesPerRow:e.width*4*4},{width:e.width,height:e.height,depthOrArrayLayers:1}),a?(this._envDistribution??=new ro(t),this._envDistribution.build(this._envTex,this._envDistributionTex)):r&&(this._envDistribution?.dispose(),t.queue.writeTexture({texture:this._envDistributionTex},r.data.buffer,{bytesPerRow:r.width*4*2},{width:r.width,height:r.height,depthOrArrayLayers:1}))):this._envDistribution?.dispose(),this._needsUpdateBindGroups||=c}this._constants.USE_ENVMAP=!!e}setMeshes(e,t){for(const u of t?.colors??[])this._dirtyColorMeshes.add(u);if(t&&this._preparedMeshData&&this._materialData&&!this._needsUpdateMeshData&&!this._needsUpdateMeshMembership&&e===this._meshes){const u=this._materialChanges.classify(t.materials??[]);if(u.level!=="geometry"&&Qc(this._preparedMeshData,t.geometries??[])){if(t.materials?.length){const d=this._pendingMaterialUpdate;this._pendingMaterialUpdate={level:d?.level==="textures"?"textures":u.level,emission:!!d?.emission||u.emission,emissiveMap:!!d?.emissiveMap||u.emissiveMap,materials:new Set([...d?.materials??[],...t.materials])},this._meshSnapshot.forEach(m=>{m.materialKeys=m.materials.map(ii)})}for(const d of t.geometries??[])this._pendingGeometryUpdates.add(d);for(const d of this._meshSnapshot)this._pendingGeometryUpdates.has(d.geometry)&&(d.geometryVersion=d.geometry.version);for(const d of t.transforms??[]){const m=this._snapshotByMesh.get(d);m&&(m.matrix=Array.from(d.transform),this._dirtyTransformMeshes.add(d),this._needsRefitTLAS=!0)}return!!t.materials?.length||!!t.transforms?.length||!!t.colors?.length||!!t.geometries?.length}}const A=t?.materials?.length||t?.colors?.length?void 0:t?.transforms,a=!!t?.materials?.length;if(A&&!A.some(u=>u instanceof rt)&&e===this._meshes&&this._meshSnapshot.length===e.length&&this._meshSnapshot.every(u=>u.geometryVersion===u.geometry.version&&u.bvh===He(u.geometry))){let u=!1;for(const d of A){const m=this._snapshotByMesh.get(d);if(!m)continue;const v=d.transform;m.matrix.length===v.length&&m.matrix.every((g,w)=>g===v[w])||(m.matrix=Array.from(v),this._dirtyTransformMeshes.add(d),u=!0)}return u&&(this._needsRefitTLAS=!0),u}const r=this._meshSnapshot,n=e.map(u=>({mesh:u,instanceCount:u instanceof rt?u.count:1,instanceVersion:u instanceof rt?u.transformsVersion:0,instanceTransforms:u instanceof rt?u.transforms:void 0,instanceColors:u instanceof rt?u.colors:void 0,colorVersion:u instanceof rt?u.colorsVersion:0,geometry:u.geometry,bvh:He(u.geometry),materials:u.materials.slice(),materialKeys:u.materials.map(ii),geometryVersion:u.geometry.version,positionArray:u.geometry.position.array,positionItemSize:u.geometry.position.itemSize,indexArray:u.geometry.indices.array,indexItemSize:u.geometry.indices.itemSize,materialIndexArray:u.geometry.materialIndex?.array,materialIndexItemSize:u.geometry.materialIndex?.itemSize,matrix:Array.from(u.transform)})),s=n.length!==r.length||n.some((u,d)=>u.mesh!==r[d]?.mesh||u.instanceCount!==r[d]?.instanceCount||u.materials.some((m,v)=>m!==r[d]?.materials[v])),o=!this._needsUpdateMeshData&&s&&this._preparedMeshData?this._membershipCache.update(this._preparedMeshData,e):void 0;if(o){const u=new Map(r.flatMap(m=>m.materials.map((v,g)=>[v,m.materialKeys[g]]))),d=o.materials.length!==this._preparedMeshData.materials.length||o.materials.some((m,v)=>m!==this._preparedMeshData.materials[v]||u.has(m)&&ii(m)!==u.get(m));return this._pendingMembershipData=o,this._meshes=e,this._meshSnapshot=n,this._snapshotByMesh=new WeakMap,n.forEach(m=>this._snapshotByMesh.set(m.mesh,m)),this._needsUpdateMeshMembership=!0,this._needsRefitTLAS=!1,this._dirtyTransformMeshes.clear(),d&&(this._pendingMaterialUpdate={level:"textures",emission:!0,emissiveMap:!0,materials:new Set(o.materials)}),!0}if(!!this._residentPreparedMeshData&&(n.length!==r.length||n.some((u,d)=>u.mesh!==r[d]?.mesh))&&n.every(u=>{const d=this._residentSnapshotByMesh.get(u.mesh);return!!d&&u.colorVersion===d.colorVersion&&u.instanceColors===d.instanceColors&&u.geometry===d.geometry&&u.bvh===d.bvh&&u.materials.length===d.materials.length&&u.materials.every((m,v)=>m===d.materials[v])&&u.materialKeys.every((m,v)=>m===d.materialKeys[v])&&u.geometryVersion===d.geometryVersion&&this._materialChanges.classify(u.materials).level==="params"&&u.positionArray===d.positionArray&&u.indexArray===d.indexArray&&u.materialIndexArray===d.materialIndexArray&&u.matrix.every((m,v)=>m===d.matrix[v])}))return this._meshes=e,this._meshSnapshot=n,this._snapshotByMesh=new WeakMap,n.forEach(u=>{this._snapshotByMesh.set(u.mesh,u)}),this._needsUpdateMeshMembership=!0,this._needsRefitTLAS=!1,this._dirtyTransformMeshes.clear(),!0;const c=n.length!==r.length||n.some((u,d)=>{const m=r[d];return!m||u.mesh!==m.mesh||u.instanceCount!==m.instanceCount||u.geometry!==m.geometry||u.bvh!==m.bvh||u.colorVersion!==m.colorVersion||u.instanceColors!==m.instanceColors||u.materials.length!==m.materials.length||u.materials.some((v,g)=>v!==m.materials[g])||u.materialKeys.some((v,g)=>v!==m.materialKeys[g])||u.positionArray!==m.positionArray||u.positionArray.length!==m.positionArray.length||u.positionItemSize!==m.positionItemSize||u.indexArray!==m.indexArray||u.indexArray.length!==m.indexArray.length||u.indexItemSize!==m.indexItemSize||u.materialIndexArray!==m.materialIndexArray||u.materialIndexArray?.length!==m.materialIndexArray?.length||u.materialIndexItemSize!==m.materialIndexItemSize}),f=!c&&n.some((u,d)=>u.geometryVersion!==r[d].geometryVersion),p=c||f,h=!c&&n.some((u,d)=>u.instanceVersion!==r[d].instanceVersion||u.instanceTransforms!==r[d].instanceTransforms||u.matrix.some((m,v)=>m!==r[d].matrix[v]));return this._meshes=e,n.forEach((u,d)=>{const m=r[d];m?.geometry===u.geometry&&(m.positionArray!==u.positionArray||m.indexArray!==u.indexArray)&&(Yt(u.geometry,void 0),this._geometriesNeedRefit.add(u.geometry)),u.geometryVersion>0&&(!m||u.geometry!==m.geometry||u.geometryVersion!==m.geometryVersion)&&this._geometriesNeedRefit.add(u.geometry)}),this._meshSnapshot=n,this._snapshotByMesh=new WeakMap,n.forEach(u=>{this._snapshotByMesh.set(u.mesh,u)}),p?(this._needsUpdateMeshData=!0,this._needsUpdateMeshMembership=!1,this._needsRefitTLAS=!1,this._dirtyTransformMeshes.clear()):h&&(this._needsRefitTLAS=!0,n.forEach((u,d)=>{(u.instanceVersion!==r[d].instanceVersion||u.instanceTransforms!==r[d].instanceTransforms||u.matrix.some((m,v)=>m!==r[d]?.matrix[v]))&&this._dirtyTransformMeshes.add(u.mesh)})),(a||!t&&!p&&!h)&&(this._needsUpdateMeshData=!0),p||h||a||!t}setTextureAtlasBudget(e){const t=Number.isFinite(e)?Math.max(4,Math.floor(e)):Di;return t===this._maxTextureArrayBytes?!1:(this._maxTextureArrayBytes=t,this._needsUpdateMeshData=!0,!0)}setBackground(e){this._rtUniform.views.backgroundMapTransform.set(Yr(e)),this._rtUniform.views.backgroundMapRotation.set(Sc(e)),this._constants.USE_BACKGROUND=!!e;const t=e&&!Array.isArray(e)?Dc(e):void 0;this._constants.USE_BACKGROUND_MAP=!!t,Array.isArray(e)&&this._rtUniform.views.backgroundColor.set(new _r(e));const A=e&&!Array.isArray(e)&&"type"in e&&e.type==="GroundedSkybox"?e:void 0;this._rtUniform.views.groundedBackgroundParams.set(A?[Math.max(A.height,1e-4),Math.max(A.radius,1e-4),A.groundHeight??0,1]:[0,0,0,0]),this._rtUniform.views.groundedBackgroundCenter.set(A?.center??[0,0]),this._constants.USE_GROUNDED_BACKGROUND=!!A,this._rtUniform.views.backgroundFlags[0]=(e?1:0)|(t?2:0)|(A?4:0)|this._rtUniform.views.backgroundFlags[0]&2147483648,this._setBackgroundMap(t)}_setBackgroundMap(e){if(e===this._backgroundImageSource&&this._backgroundTex)return;this._backgroundImageSource=e;const t=e?.width??1,A=e?.height??1;if(e&&"sky"in e&&(t>this._device.limits.maxTextureDimension2D||A>this._device.limits.maxTextureDimension2D))throw new RangeError("ProceduralSky resolution exceeds the device texture size limit.");const a=!this._backgroundTex||this._backgroundTex.width!==t||this._backgroundTex.height!==A;if(a&&(this._backgroundTex?.destroy(),this._backgroundTex=this._device.createTexture({format:"rgba32float",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.STORAGE_BINDING,label:"Background",size:{width:t,height:A,depthOrArrayLayers:1}})),e&&"sky"in e)this._skyBaker??=new Ws(this._device),this._skyBaker.bake(e,this._backgroundTex);else if(e){const r=e.data,n=r instanceof Float32Array?r:r instanceof Uint8Array||r instanceof Uint8ClampedArray?Float32Array.from(r,s=>s/255):Float32Array.from(r);this._device.queue.writeTexture({texture:this._backgroundTex},n.buffer,{bytesPerRow:t*4*4},{width:t,height:A,depthOrArrayLayers:1})}this._needsUpdateBindGroups||=a}_updateLightSamplingData(){this._constants.LIGHT_CAPABILITIES=Hh(this._analyticLights.map(f=>f.type),this._emissiveTriangles.length);const e=Mh(this._analyticLights,this._emissiveTriangles,this._envImageSource&&"sky"in this._envImageSource?uh(this._envImageSource):Sl(this._envImageSource),this._device.limits.maxTextureDimension2D,this._lightChoices,this._lightSamplingScratch,this._shadowCatcherLightChoices);this._analyticLightSelectionPmfs=e.analyticPmfs,this._iesProfileTexelOffsets=e.profiles.offsets,this._lightDomainDiagnostics=e.domains;const{lightWidth:t,lightHeight:A,lightData:a}=e;Ih(this._rtUniform.views,e);const r=!this._lightSamplingTexture||t!==this._lightSamplingTextureSize[0]||A!==this._lightSamplingTextureSize[1];(!this._lightSamplingTexture||t!==this._lightSamplingTextureSize[0]||A!==this._lightSamplingTextureSize[1])&&(this._lightSamplingTexture?.destroy(),this._lightSamplingTexture=this._device.createTexture({label:"Light sampling data",size:[t,A],format:"rgba32float",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST}),this._lightSamplingTextureSize=[t,A],this._needsUpdateBindGroups=!0);const n=this._lightSamplingData,s=r||!n||this._lightSamplingTriangleCount!==this._emissiveTriangles.length,o=new Uint32Array(a.buffer),l=n&&new Uint32Array(n.buffer);let c=-1;for(let f=0;f<=A;f++){let p=f<A&&s;if(f<A&&!s){for(let h=f*t*4;h<(f+1)*t*4;h++)if(o[h]!==l[h]){p=!0;break}}p&&c<0&&(c=f),!p&&c>=0&&(this._device.queue.writeTexture({texture:this._lightSamplingTexture,origin:[0,c]},a.subarray(c*t*4,f*t*4),{bytesPerRow:t*16},{width:t,height:f-c}),c=-1)}this._lightSamplingScratch=n,this._lightSamplingData=a,this._lightSamplingTriangleCount=this._emissiveTriangles.length,this._needsUpdateAnalyticLightsBuffer=!0,this._needsUpdateLightSamplingData=!1}_uploadBVH(e,t){const A=mr(e,t);this._constants.TLAS_STACK_SIZE=vA(A.tlas,Number(this._constants.TLAS_STACK_SIZE??0)),this._constants.BLAS_STACK_SIZE=vA(A.blas,Number(this._constants.BLAS_STACK_SIZE??0),32);const a=new Float32Array(e.buffer),r=new Float32Array(XA(t)),n=new Float32Array(a.length+r.length),s=a.length/4;n.set(a),n.set(r,s*4);const o=this._updateGPUBuffer("BVH",this._bvhBuffer,n),l=this._updateGPUBuffer("Instances",this._instancesBuffer,new Float32Array(e.instancesBuffer));(o!==this._bvhBuffer||l!==this._instancesBuffer)&&(this._needsUpdateBindGroups=!0),this._bvhBuffer=o,this._instancesBuffer=l,this._debugBVHBuffer=n.buffer.slice(0),this._rtUniform.views.blasOffset.set([s])}_updateMeshData(){this._pendingGeometryUpdates.clear(),this._emissiveCache=new Ps;const e=this._meshes;for(const u of this._geometriesNeedRefit)(e.some(m=>m.geometry===u&&!!m.materials[0]?.displacementMap&&(m.materials[0].displacementScale!==0||m.materials[0].displacementBias!==0))||On(this._preparedMeshData,u)||!He(u)||!Sn(He(u),u))&&Yt(u,void 0);this._geometriesNeedRefit.clear();const t=Jl(e);this._preparedMeshData=t,this._membershipCache.capture(t),this._pendingMembershipData=void 0,this._needsUpdateMeshMembership=!1;const A=t.geometry,a=t.materials,r=e.length===0||t.instances.length===0,n=gA(t.instances,t.blases);this._tlas=n,this._uploadBVH(n,t.blases);const s=this._materialData=this._createMaterialData(a,this._analyticLights,{maxTextureArrayBytes:this._maxTextureArrayBytes,maxTextureArrayLayers:this._device.limits.maxTextureArrayLayers,maxTextureDimension2D:this._device.limits.maxTextureDimension2D});this._emissiveTriangles=this._emissiveCache.collect(t.emissiveBindings,a),this._needsUpdateLightSamplingData=!0;const o=_h(A),{stride:l,offsets:c}=o,f=new _r(A.vertexCount*l);to(A,f,l,c,0,A.vertexCount),this._attributeData=f,this._attributeStride=l,this._attributeOffsets=c,this._attrBuffers=this._updateGPUBuffer("Attributes",this._attrBuffers,f),this._materialsBuffer=this._updateGPUBuffer("Materials",this._materialsBuffer,s.getBufferArray(),Aa*4);const p=mr(n,t.blases),h={bvh2:1,bvh4:2,"bvh-gpu":4,cwbvh:8};this._blasLayoutMask=t.blases.reduce((u,d)=>u|h[d.bvh.layout??"bvh2"],0),Object.assign(this._constants,yh(p.tlas,p.blas,this._constants),o.constants),this._updateMaterialConstants(a,s,A),this._updateTextures(s),this._needsUpdateBindGroups=!0,this._rtUniform.views.isEmpty[0]=+r,this._meshSnapshot.forEach(u=>{u.bvh=He(u.geometry)}),this._residentPreparedMeshData=t,this._residentSnapshotByMesh=new WeakMap,this._meshSnapshot.forEach(u=>{this._residentSnapshotByMesh.set(u.mesh,u)}),this._materialChanges.capture(a),this._pendingMaterialUpdate=void 0,this._needsUpdateMeshData=!1,this._needsUpdateMeshMembership=!1,this._needsRefitTLAS=!1}_updateMaterialConstants(e,t,A){const a=e.some(n=>n.transmissionWeight>0);a!==this._hasTransmission&&(this._hasTransmission=a),this._hasShadowCatcher=e.some(n=>n.shadowCatcher);const r=t.getDisplacementMaps().length>0;r!==this._hasDisplacement&&(this._hasDisplacement=r,this._rayTracePipelineLayout=void 0),Object.assign(this._constants,jh(e,t,A,this._bevelSamples,Number(this._constants.NUM_MAPS??0))),this._bindless&&(this._constants.NUM_MAPS=20)}_updateGeometryData(){const e=this._preparedMeshData,t=this._tlas,A=Mc(e,this._pendingGeometryUpdates);for(const{first:n,count:s,topologyChanged:o,deformationOnly:l}of A.vertices){to(e.geometry,this._attributeData,this._attributeStride,this._attributeOffsets,n,s,o,l);const c=n*this._attributeStride*4,f=s*this._attributeStride*4;this._device.queue.writeBuffer(this._attrBuffers,c,this._attributeData.buffer,c,f)}for(const n of A.meshes)this._dirtyTransformMeshes.add(n);if(A.relocated)for(const n of e.instanceBindings)this._dirtyTransformMeshes.add(n.mesh);if(A.resized)e.instances=Ii(e.instanceBindings),da(t,e.instances,e.blases),this._uploadBVH(t,e.blases);else{const n=new Uint8Array(this._debugBVHBuffer),s=[];for(const{blas:o,offset:l}of A.blases){const c=t.buffer.byteLength+l;n.set(new Uint8Array(o.buffer),c),s.push({offset:c,size:o.buffer.byteLength})}for(const{offset:o,size:l}of xA(s))this._device.queue.writeBuffer(this._bvhBuffer,o,this._debugBVHBuffer,o,l)}const a={bvh2:1,bvh4:2,"bvh-gpu":4,cwbvh:8};this._blasLayoutMask=e.blases.reduce((n,s)=>n|a[s.bvh.layout??"bvh2"],0);const r=mr(t,e.blases);this._constants.BLAS_STACK_SIZE=vA(r.blas,Number(this._constants.BLAS_STACK_SIZE??0),32),this._meshSnapshot.forEach(n=>{n.bvh=He(n.geometry)}),this._needsRefitTLAS=!0,this._pendingGeometryUpdates.clear()}_updateMaterialData(){const e=this._pendingMaterialUpdate,t=this._preparedMeshData;let A=this._materialData;if(e.level==="textures"?(A=this._materialData=this._createMaterialData(t.materials,this._analyticLights,{maxTextureArrayBytes:this._maxTextureArrayBytes,maxTextureArrayLayers:this._device.limits.maxTextureArrayLayers,maxTextureDimension2D:this._device.limits.maxTextureDimension2D}),this._updateTextures(A)):A.repackParams(t.materials),this._materialsBuffer=this._updateGPUBuffer("Materials",this._materialsBuffer,A.getBufferArray(),Aa*4),this._updateMaterialConstants(t.materials,A,t.geometry),e.emission||e.emissiveMap){const a=this._residentPreparedMeshData;a.emissiveBindings=a.instanceBindings.filter(n=>n.materialIndices.some(s=>Ba(t.materials[s])));const r=new Set(this._meshes);t.emissiveBindings=a.emissiveBindings.filter(n=>r.has(n.mesh)),this._emissiveTriangles=this._emissiveCache.collect(t.emissiveBindings,t.materials),this._needsUpdateLightSamplingData=!0}this._needsUpdateBindGroups=!0,this._materialChanges.capture([...e.materials]),this._pendingMaterialUpdate=void 0}_updateMeshMembership(){const e=this._pendingMembershipData??this._residentPreparedMeshData,t=this._pendingMembershipData;if(!e){this._needsUpdateMeshData=!0,this._needsUpdateMeshMembership=!1;return}const A=new Set(this._meshes),a=e.instanceBindings.filter(({mesh:l})=>A.has(l)),r=e.emissiveBindings.filter(({mesh:l})=>A.has(l)),n=Ii(a),s={...e,instances:n,instanceBindings:a,emissiveBindings:r};this._preparedMeshData=s,t&&(this._residentPreparedMeshData=s),this._pendingMembershipData=void 0;const o=gA(n,s.blases);this._tlas=o,this._uploadBVH(o,s.blases),this._emissiveTriangles=this._emissiveCache.collect(r,s.materials),this._needsUpdateLightSamplingData=!0,this._rtUniform.views.isEmpty[0]=+(n.length===0),this._meshSnapshot.forEach(l=>{l.bvh=He(l.geometry)}),this._needsUpdateMeshMembership=!1}_updateMeshColors(){const e=this._preparedMeshData,t=this._tlas;if(e&&t){const A=$l(e.instanceBindings,e.instances,this._dirtyColorMeshes),a=Yl(t,e.instances,A);if(this._instancesBuffer)for(const{offset:r,size:n}of a)this._device.queue.writeBuffer(this._instancesBuffer,r,t.instancesBuffer,r,n)}this._dirtyColorMeshes.clear()}_refitMeshInstances(){const e=this._preparedMeshData,t=this._tlas;if(!e||!t||!this._bvhBuffer||!this._instancesBuffer){this._needsUpdateMeshData=!0,this._needsRefitTLAS=!1;return}const A=Rl(e.instanceBindings,this._dirtyTransformMeshes,e.instances),a=A.size>0,r=e.instances;if(e.instances=Ii(e.instanceBindings,a?e.instances:void 0,a?A:void 0),!Cl(r,e.instances)){this._tlas=gA(e.instances,e.blases),this._uploadBVH(this._tlas,e.blases),this._emissiveTriangles=this._emissiveCache.collect(e.emissiveBindings,e.materials),this._needsUpdateLightSamplingData=!0,this._rtUniform.views.isEmpty[0]=+(e.instances.length===0),this._dirtyTransformMeshes.clear(),this._needsRefitTLAS=!1;return}const n=da(t,e.instances,e.blases,a?A:void 0),s=new Float32Array(t.buffer);for(const{offset:o,size:l}of n.tlasRanges)this._device.queue.writeBuffer(this._bvhBuffer,o,t.buffer,o,l);for(const{offset:o,size:l}of n.instanceRanges)this._device.queue.writeBuffer(this._instancesBuffer,o,t.instancesBuffer,o,l);this._debugBVHBuffer&&new Float32Array(this._debugBVHBuffer).set(s),(!a||e.emissiveBindings.some(({mesh:o})=>this._dirtyTransformMeshes.has(o)))&&(this._emissiveTriangles=this._emissiveCache.collect(e.emissiveBindings,e.materials),this._needsUpdateLightSamplingData=!0),this._dirtyTransformMeshes.clear(),this._needsRefitTLAS=!1}_createMaterialData(...e){if(this._bindless){const t=new Vs(e[0],e[1]),A=vn(this._device,t.textures.length);if(!A)return t;this._textureSelection.fallbackReason=A;const a=this._bindless;this._retiredBindless.add(a),this._device.queue.onSubmittedWorkDone().catch(()=>{}).then(()=>{a.dispose(),this._retiredBindless.delete(a)}),this._bindless=void 0,this._computeShaderModule=void 0,this._rayTracePipelineLayout=void 0}return new na(...e)}_updateTextures(e){if(e instanceof Vs){this._bindless.update(e.textures,this._maxTextureArrayBytes),this._needsUpdateBindGroups=!0;return}const t=e.bufferData.mapInfo??[0,0,0,0],A=e.bufferData.mapTransform??[1,1,0,0],a=e.bufferData.mapUvChannel??[0],r=e.bufferData.mapColorLinear,n=+this._constants.NUM_MAPS,s=new _r(n*12);for(let v=0;v<t.length;v++)s[v]=t[v];for(let v=0;v<A.length;v++)s[n*4+v]=A[v];for(let v=0;v<a.length;v++)s[n*8+v*4]=a[v],s[n*8+v*4+1]=r[v],s[n*8+v*4+2]=e.bufferData.mapWrap[v*2],s[n*8+v*4+3]=e.bufferData.mapWrap[v*2+1];let o=this._mapInfoUniform;(!o||o.size!==s.byteLength)&&(o?.destroy(),o=this._uniformBuffer(s.byteLength),this._mapInfoUniform=o),this._device.queue.writeBuffer(o,0,s);const l=e.texture,c=this._maps,f=l?.storageType===ee.HALF_FLOAT?"rgba16float":"rgba8unorm",p=f==="rgba16float"?8:4,h=Math.max(l?.width??1,1),u=Math.max(l?.height??1,1),d=Math.max(l?.source.length??1,2),m=this._device.limits.maxTextureArrayLayers;if(d>m)throw new Error(`The scene needs ${d} texture-array layers, but this GPU device supports ${m}.`);(!c||f!==c.format||h!==c.width||u!==c.height||d!==c.depthOrArrayLayers)&&(c&&c.destroy(),this._maps=this._device.createTexture({format:f,label:"Maps",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT,size:{width:h,height:u,depthOrArrayLayers:d}}),this._needsUpdateBindGroups=!0),l?.source.forEach((v,g)=>{if(jt(v)){if(!(v.data instanceof Uint8Array)&&!(v.data instanceof Uint16Array))throw new Error("Material texture atlas GPU upload requires RGBA8 or RGBA16F data.");this._device.queue.writeTexture({texture:this._maps,origin:[0,0,g]},v.data,{bytesPerRow:v.width*p,rowsPerImage:v.height},{width:v.width,height:v.height,depthOrArrayLayers:1});return}this._device.queue.copyExternalImageToTexture({source:v,flipY:l.flipYArray[g]},{texture:this._maps,origin:[0,0,g]},[v.width,v.height])})}setLights(e){const t=e.filter(s=>s.type==="DirectionalLight"||s.type==="SphereLight"||s.type==="SpotLight"||s.type==="RectLight");t.length>HA&&console.warn(`Too many lights, only the first ${HA} lights will be used.`);const A=t.slice(0,HA),a=A.length,r=this._sceneEnvironment.update(e);this._rtUniform.views.environmentRotation.set(Pc(e)),this._rtUniform.views.lightsCount[0]=a,this._setEnvMap(r);const n=this._rectLightTextures.update(A);this._analyticLights=A,n&&(this._needsUpdateMeshData=!0),this._needsUpdateAnalyticLightsBuffer=!0,this._needsUpdateLightSamplingData=!0}_updateViewProjInv(e,t){BA(t,e.getProjectionMatrix(this._targetAspect)),ZA(t,e.transform,t)}setCamera(e){const t=this._viewProjInv;this._apertureRadius=va(e),this._focusDistance=e.focusDistance,this._updateViewProjInv(e,t),en(this._cameraWorld,e.transform)}cameraChanged(e){const t=ti();return this._updateViewProjInv(e,t),!Fc(this._viewProjInv,t)||va(e)!==this._apertureRadius||e.focusDistance!==this._focusDistance}setSize(e,t,A=e/t){this._targetAspect=A,this._width=e,this._height=t;const a=this._rtUniform.views.outputSize;a[0]=e,a[1]=t;const r=this._outColorBuffer,n=e*t*4*4;if(r&&r.size===n)return;this._needsUpdateBindGroups=!0;const s=[];for(let o of["Color","Normal","Albedo","ShadowCatcher"]){const l=this[`_out${o}Buffer`];l&&s.push(l),this[`_out${o}Buffer`]=this._device.createBuffer({label:"Ray Trace "+o,size:o==="ShadowCatcher"?e*t*Yh:n,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST|GPUBufferUsage.COPY_SRC})}this._targetOutputs.set(this._activeTarget,{buffers:[this._outColorBuffer,this._outNormalBuffer,this._outAlbedoBuffer,this._outShadowCatcherBuffer]}),this._device.queue.onSubmittedWorkDone().catch(()=>{}).then(()=>s.forEach(o=>o.destroy()))}setJitter(e,t){const A=this._rtUniform.views.jitter;A[0]=e,A[1]=t,this._device.queue.writeBuffer(this._uniforms.cameraUniform,0,$s(this._viewProjInv,this._cameraWorld,this._apertureRadius,this._focusDistance))}setSampleTiles(e,t,A,a){const r=this._rtUniform.views.scaleOffset;r[0]=e,r[1]=t,r[2]=A,r[3]=a}setSampleCount(e){this._rtUniform.views.sampleCount[0]=e}setTransmissiveOutputAlphaMin(e){this._rtUniform.views.transmissiveOutputAlphaMin[0]=e;const t=this._transmissiveAlphaMin!==e;return this._transmissiveAlphaMin=e,t}needsDenoiseAlpha(){return this._hasShadowCatcher||this._transmissiveAlphaMin<1&&this._hasTransmission}hasShadowCatcher(){return this._hasShadowCatcher}dispose(){this._disposed=!0,this._envDistribution?.dispose(),this._skyBaker?.dispose(),this._bindless?.dispose(),this._retiredBindless.forEach(A=>A.dispose()),this._retiredBindless.clear(),this._shaderCache.clear(),this._shaderCapabilities.clear(),new Set([...Array.from(this._targetOutputs.values()).flatMap(A=>A.buffers),this._mapInfoUniform,this._attrBuffers,this._materialsBuffer,this._bvhBuffer,this._instancesBuffer,this._offlineAdaptiveHistory?.varianceBuffer,...Object.values(this._uniforms)]).forEach(A=>A?.destroy()),new Set([this._maps,this._lightSamplingTexture,this._openPbrEnergyLut,this._envTex,this._envDistributionTex,this._backgroundTex,this._adaptiveSamplingTexture]).forEach(A=>A?.destroy()),this._rayTracePipeline=void 0,this._rayTraceBindGroups=void 0}}function Ea(i,e){for(var t=0,A=1/e,a=i;a>0;)t=t+A*(a%e),a=Math.floor(a/e),A=A/e;return t}function Gc(i){let e=21,t=1/0,A=-1,a=1,r=1,n,s,o,l,c=0,f=0,p=0,h=0,u=i?im(i):6e5;function d(){A=-1,p=0,h=0}function m(B,E){c=B,f=E,d(),v()}function v(){const E=c/f;n=Math.ceil(3e3/Math.max(Math.round(3e3/Math.sqrt(u*E)),1)),s=Math.ceil(n/E),n>c&&s>f?(o=1,l=1,a=1,r=Math.round(n/c)*Math.round(s/f)):(r=1,o=Math.ceil(c/n),l=Math.ceil(f/s),a=o*l),a>t&&(a=t,o=Math.ceil(Math.sqrt(a)),l=Math.ceil(a/o),a=o*l,n=Math.ceil(c/o),s=Math.ceil(f/l))}function g(){const B=p/h,E=e-B;u+=5e3*Math.sign(E)*Math.sqrt(Math.abs(E)),u=Math.max(u,8192)}function w(B){A>=0&&B!=null&&Number.isFinite(B)&&B>0&&(p+=B,h++),A++,A%a===0&&(h&&(g(),v()),p=0,h=0,A=0);const E=A===a-1,b=A%o,x=Math.floor(A/o)%l;return{xIndex:b,yIndex:x,columns:o,rows:l,x:b*n,y:x*s,tileWidth:n,tileHeight:s,isFirstTile:A===0,isLastTile:E,samplesPerFrame:r}}return{nextTile:w,reset:d,setSize:m,setMaxTiles(B){t=B},setDesiredMsPerTile(B){e=B},getDesiredMsPerTile(){return e}}}function Zp(i,e,t,A,a,r){const n=[i,e],s=t>0?A/t:1,o=Oc(s,.25,4),l=Math.sqrt(o),c=o/l;let f=Math.ceil(l*a[0]),p=Math.ceil(c*a[1]),h=1;f>n[0]*2&&(h*=Math.floor(f/n[0])),f=Math.min(f,n[0]),p>n[1]*2&&(h*=Math.floor(p/n[1])),p=Math.min(p,n[1]);let u=Math.round(i/f),d=Math.round(e/p);f=Math.ceil(i/u),p=Math.ceil(e/d);let m=d*u;return m>r&&(m=r,u=Math.ceil(Math.sqrt(m)),d=Math.ceil(m/u),m=u*d,f=Math.ceil(i/u),p=Math.ceil(e/d)),{tileWidth:f,tileHeight:p,columns:u,rows:d,numTiles:m,samplesPerFrame:h}}const lo=262144;function em(i,e){const t=i>0&&e>0?i/e:1;return[Math.min(i,Math.max(1,Math.round(Math.sqrt(lo*t)))),Math.min(e,Math.max(1,Math.round(Math.sqrt(lo/t))))]}function tm(){let i=1,e=-1,t=-1,A=0,a=-1,r=0,n=0,s=[64,64],o=0,l=0,c=0,f=0,p=0,h=1,u=0,d=0,m=1/0;function v(){e++;const g=n>0?r/n:t;if(e%i===0&&(e=0),e===0&&A!==a){a=A;const b=Zp(o,l,g,c,t>=0?s:em(o,l),m);r=0,n=0,f=b.tileWidth,p=b.tileHeight,u=b.columns,d=b.rows,i=b.numTiles,h=b.samplesPerFrame}const w=e%u,B=Math.floor(e/u)%d,E=e===i-1;return s=[f,p],{xIndex:w,yIndex:B,columns:u,rows:d,x:w*f,y:B*p,tileWidth:f,tileHeight:p,isFirstTile:e===0,isLastTile:E,samplesPerFrame:h}}return{nextTile:v,reset(){e=-1},setSize(g,w){(o!==g||l!==w)&&A++,o=g,l=w},setMaxTiles(g){m!==g&&A++,m=g},setDesiredMsPerTile(g){c!==g&&A++,c=g},needsUpdatePredicting(){A++,t=-1,r=0,n=0},setLastTraceTime(g){A++,t=g,n++,r+=g},getLastTraceTime(){return t},getDesiredMsPerTile(){return c}}}function im(i){return i.getParameter(i.MAX_RENDERBUFFER_SIZE)<=8192?2e5:1e6}function co(i=!1,e=!0){return`
${ec}
@group(0) @binding(0) var<storage, read> colorBuffer: array<vec4f>;
@group(0) @binding(1) var<storage, read> normalBuffer: array<vec4f>;
@group(0) @binding(2) var<storage, read> albedoBuffer: array<vec4f>;
${za}
@group(0) @binding(3) var<storage, read> shadowCatcherBuffer: array<ShadowCatcherAccumulation>;

@group(1) @binding(0) var<uniform> sampleCount: f32;
@group(1) @binding(1) var<uniform> sampleTileGrid: vec2u;

override outputWidth: f32;
override outputHeight: f32;

struct qa {
${i?`@location(0) foreground: vec4f,
@location(1) catcherBackground: vec4f`:`@location(0) color: vec4f,
@location(1) normal: vec4f,
@location(2) albedo: vec4f${e?`,
  @location(3) shadowCatcher: vec4f`:""}`}
}
@fragment
fn main(@builtin(position) coord: vec4f) -> qa {
let size = vec2u(u32(outputWidth), u32(outputHeight));
let pixel = vec2u(u32(coord.x), size.y - u32(coord.y) - 1u);
var idx = pixel.x + pixel.y * size.x;




if (sampleCount < 1.0 && normalBuffer[idx].a <= 0.0) {
let wU = max(sampleTileGrid, vec2u(1u));
let wq = min(
((pixel + wU / 2u) / wU) * wU,
((size - vec2u(1u)) / wU) * wU
);
let tW = wq.x + wq.y * size.x;
if (normalBuffer[tW].a > 0.0) {
idx = tW;
}
}
var output: qa;
if (normalBuffer[idx].a <= 0.0) {
${i?`output.foreground = vec4f(0.0);
output.catcherBackground = vec4f(0.0);`:`output.color = vec4f(0.0);
output.normal = vec4f(0.0);
output.albedo = vec4f(0.0);
${e?"output.shadowCatcher = vec4f(0.0);":""}`}
return output;
}
let color = colorBuffer[idx];
let normal = normalBuffer[idx];
let albedo = albedoBuffer[idx];
let hit = albedo.a;




let total = max(normal.a, 1.0);
${i?`
let shadow = shadowCatcherBuffer[idx];
let jo = max(hit - shadow.mask.b, 0.0);


output.foreground = vec4f(
(color.rgb - shadow.background.rgb)
/ select(total, jo, jo > 0.0),
clamp((color.a - shadow.mask.g) / total, 0.0, 1.0)
);
output.catcherBackground = shadow.background / total;
`:`output.color = vec4f(


vec3f(fK(color.r,normal.a,hit,1.0,true),
fK(color.g,normal.a,hit,1.0,true),
fK(color.b,normal.a,hit,1.0,true)),
fK(color.a,normal.a,hit,1.0,false)
);

output.normal = vec4f(0.0);

if (dot(normal.rgb, normal.rgb) > 0.1) {
output.normal = vec4f(normal.rgb / total * 0.5 + 0.5, 1.0);
}
output.albedo = vec4f(albedo.rgb / total, clamp(hit / total, 0.0, 1.0));
${e?`let shadow = shadowCatcherBuffer[idx];



output.shadowCatcher = vec4f(shadow.mask.rgb / total,
shadow.mask.r / total * select(0.0, shadow.moments.z / shadow.moments.w, shadow.moments.w > 0.0));`:""}
`}
return output;
}
`}class Am{zeroTexture;_device;_pipeline;_layersPipeline;_foregroundTexture;_catcherBackgroundTexture;_colorTexture;_normalTexture;_albedoTexture;_shadowCatcherTexture;_uniformBindGroup;_uniformsBuffers;_width=1;_height=1;_hasCatcher=!1;_needsUpdatePipeline=!0;constructor(e,t){this.zeroTexture=t,this._device=e,this._uniformsBuffers={sampleCount:e.createBuffer({size:4,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),sampleTileGrid:e.createBuffer({size:8,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST})}}_retainedOutputs=new Set;retainOutput(e){["color","normal","albedo","shadowCatcher","foreground","catcherBackground"].some(A=>this.getOutput(A)===e)&&this._retainedOutputs.add(e)}releaseOutput(e){if(!this._retainedOutputs.delete(e))return;["color","normal","albedo","shadowCatcher","foreground","catcherBackground"].some(A=>this.getOutput(A)===e)||this._device.queue.onSubmittedWorkDone().catch(()=>{}).then(()=>e.destroy())}getOutput(e){return this[`_${e}Texture`]??this.zeroTexture}_createTextures(){const{_device:e,_width:t,_height:A}=this,a={size:{width:t,height:A,depthOrArrayLayers:1},format:"rgba8unorm",usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_SRC};this._destroyTextures(),this._colorTexture=e.createTexture({...a,label:"Ray Trace Color",format:"rgba16float",usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_SRC}),this._normalTexture=e.createTexture({...a,label:"Ray Trace Normal",usage:a.usage|GPUTextureUsage.COPY_SRC}),this._albedoTexture=e.createTexture({...a,label:"Ray Trace Albedo"}),this._hasCatcher?(this._foregroundTexture=e.createTexture({...a,label:"Ray Trace Foreground",format:"rgba16float"}),this._catcherBackgroundTexture=e.createTexture({...a,label:"Ray Trace Catcher Background",format:"rgba16float"}),this._shadowCatcherTexture=e.createTexture({...a,label:"Ray Trace Shadow Catcher",format:"rgba16float"})):this._foregroundTexture=this._catcherBackgroundTexture=this._shadowCatcherTexture=void 0}_updateBindGroups(){const e=this._device;this._uniformBindGroup=e.createBindGroup({layout:this._pipeline.getBindGroupLayout(1),entries:[{binding:0,resource:{buffer:this._uniformsBuffers.sampleCount}},{binding:1,resource:{buffer:this._uniformsBuffers.sampleTileGrid}}]})}_updatePipeline(){if(!this._needsUpdatePipeline)return;this._needsUpdatePipeline=!1;const e=this._device;this._pipeline=bt(e).createRenderPipeline({label:"rayTraceOutput",layout:"auto",vertex:{module:bt(e).createShaderModule({code:Gr}),entryPoint:"main"},fragment:{module:bt(e).createShaderModule({code:co(!1,this._hasCatcher)}),entryPoint:"main",targets:[{format:"rgba16float"},{format:"rgba8unorm"},{format:"rgba8unorm"},...this._hasCatcher?[{format:"rgba16float"}]:[]],constants:{outputWidth:this._width,outputHeight:this._height}}}),this._hasCatcher&&(this._layersPipeline=bt(e).createRenderPipeline({label:"rayTraceLayers",layout:"auto",vertex:{module:bt(e).createShaderModule({code:Gr}),entryPoint:"main"},fragment:{module:bt(e).createShaderModule({code:co(!0)}),entryPoint:"main",targets:[{format:"rgba16float"},{format:"rgba16float"}],constants:{outputWidth:this._width,outputHeight:this._height}}})),this._updateBindGroups()}setSize(e,t){(this._width!==e||this._height!==t||!this._colorTexture)&&(this._width=e,this._height=t,this._createTextures(),this._needsUpdatePipeline=!0)}setSampleCount(e){this._device.queue.writeBuffer(this._uniformsBuffers.sampleCount,0,new Float32Array([e]))}setSampleTileGrid(e,t){this._device.queue.writeBuffer(this._uniformsBuffers.sampleTileGrid,0,new Uint32Array([e,t]))}createPass(e,t,A=!1){this._hasCatcher!==A&&(this._hasCatcher=A,this._createTextures(),this._needsUpdatePipeline=!0),this._updatePipeline(),this._createOutputPass(e,t,!1),A&&this._createOutputPass(e,t,!0)}_createOutputPass(e,t,A){const a=A?this._layersPipeline:this._pipeline,r=A?[this._foregroundTexture,this._catcherBackgroundTexture]:[this._colorTexture,this._normalTexture,this._albedoTexture,...this._hasCatcher?[this._shadowCatcherTexture]:[]],n=e.beginRenderPass({colorAttachments:r.map(s=>({view:s.createView(),loadValue:{r:0,g:0,b:0,a:0},storeOp:"store",loadOp:"clear"}))});n.setPipeline(a),n.setBindGroup(0,this._device.createBindGroup({label:"rayTraceOutput",layout:a.getBindGroupLayout(0),entries:[t.color,t.normal,t.albedo,t.shadowCatcher].map((s,o)=>({binding:o,resource:{buffer:s,...o===3?{offset:t.shadowCatcherOffset??0}:{}}})).filter(s=>s.binding<3||this._hasCatcher||A)})),n.setBindGroup(1,A?this._device.createBindGroup({layout:a.getBindGroupLayout(1),entries:Object.values(this._uniformsBuffers).map((s,o)=>({binding:o,resource:{buffer:s}}))}):this._uniformBindGroup),n.draw(6,1,0,0),n.end()}_destroyTextures(){if(!this._colorTexture)return;const e=[this._colorTexture,this._normalTexture,this._albedoTexture,this._shadowCatcherTexture,this._foregroundTexture,this._catcherBackgroundTexture].filter(t=>!!t&&!this._retainedOutputs.has(t));this._device.queue.onSubmittedWorkDone().catch(()=>{}).then(()=>e.forEach(t=>t.destroy()))}getMemoryBytes(){const e=["color","normal","albedo","shadowCatcher","foreground","catcherBackground"];return Object.values(this._uniformsBuffers).reduce((t,A)=>t+A.size,0)+Array.from(new Set([...e.map(t=>this[`_${t}Texture`]),...this._retainedOutputs])).reduce((t,A)=>t+TA(A),0)}dispose(){const e=Array.from(this._retainedOutputs);this._device.queue.onSubmittedWorkDone().catch(()=>{}).then(()=>e.forEach(t=>t.destroy())),this._destroyTextures(),this._retainedOutputs.clear(),Object.keys(this._uniformsBuffers).forEach(t=>{this._uniformsBuffers[t].destroy()})}}const am=`
fn tS(a: vec4f, b: vec4f, c: vec4f) -> vec4f {
return a + b + c - min(min(a, b), c) - max(max(a, b), c);
}
`,rm=`

let d = vec3i(1, 1, 0);

var dk = load_colorTex(uv, 0);
let s1 = load_colorTex(uv - d.xz, 0);
let s2 = load_colorTex(uv + d.xz, 0);
let s3 = load_colorTex(uv - d.zy, 0);
let s4 = load_colorTex(uv + d.zy, 0);
dk = tS(tS(dk, s1, s2), s3, s4);


let lum = dot(dk.rgb, vec3f(0.2125, 0.7154, 0.0721));
var color: vec4f;
if (lum > threshold && dk.a > 0.0) {
color = vec4f(dk.rgb * scale, dk.a);
} else {

color = vec4f(vec3(0.0), dk.a);
}
output.color = color;
`,nm=`
fn xP(c: vec3f) -> f32 {
return max(max(c.r, c.g), c.b);
}
`,sm=`
let size = vec2f(colorTexRegion());
let d = vec4f(-1.0, -1.0, 1.0, 1.0) / size.xyxy;

output.color = sample_colorTex_linearSampler(uv2 + d.xy) * 0.25
+ sample_colorTex_linearSampler(uv2 + d.zy) * 0.25
+ sample_colorTex_linearSampler(uv2 + d.xw) * 0.25
+ sample_colorTex_linearSampler(uv2 + d.zw) * 0.25;
`,om=`
const xT = array<f32, 9>(0.07, 0.09, 0.12, 0.14, 0.16, 0.14, 0.12, 0.09, 0.07);
`,lm=`
let xG = vec2f(colorTexRegion());
let off = direction / xG * size;

var sum = vec4f(0.0);
var uE = 0.0;
for (var i = 0; i < 9; i++) {
let w = xT[i];
sum += sample_colorTex_linearSampler(uv2 + off * f32(i - 4)) * w;
uE += w;
}
output.color = sum / max(uE, 0.01);
`,cm=`
let xQ = sample_colorTex1_linearSampler(uv2);
let xR = sample_colorTex2_linearSampler(uv2);
output.color = mix(xQ, xR, weight);
`,Hc=6;function fm(i){return Math.max(Math.min(i*2,1),.2)}function um(i){return 1-Math.max(Math.min(i**.3*.8,.8),0)}function dm(i){const t=1+i,A=t+i,a=A+i,r=a+i-1,n=[[0,r,r,0,0,0]];for(let s=0;s<i;s++){const o=s===0?0:1+s-1;n.push([1,o,o,1+s,0,0])}for(let s=i-1;s>=0;s--)n.push([2,1+s,1+s,t+s,1,0]),n.push([2,t+s,t+s,A+s,0,1]);for(let s=i-2;s>=0;s--)n.push([3,s===i-2?A+i-1:a+s+1,A+s,a+s,0,0]);return n}const hm=dm(Hc),fo=Hc-1,Fn={magFilter:"linear",minFilter:"linear"};function pm(i){return new Pt("bright",i,{inputs:["colorTex"],outputs:["color"],uniforms:[{label:"threshold",type:"f32",data:1},{label:"scale",type:"f32",data:1}],fsDefine:am,fsMain:rm})}function mm(i){return new Pt("downsample",i,{inputs:["colorTex"],outputs:["color"],uniforms:[],samplers:{linearSampler:i.createSampler(Fn)},fsDefine:nm,fsMain:sm})}function uo(i){return new Pt("gaussian",i,{inputs:["colorTex"],outputs:["color"],uniforms:[{label:"direction",type:"vec2f",data:[1,0]},{label:"size",type:"f32",data:1}],samplers:{linearSampler:i.createSampler(Fn)},fsDefine:om,fsMain:lm})}function gm(i){return new Pt("blend",i,{inputs:["colorTex1","colorTex2"],outputs:["color"],uniforms:[{label:"weight",type:"f32",data:.3}],samplers:{linearSampler:i.createSampler(Fn)},fsMain:cm})}class vm{_brightPass;_downsamplePasses=[];_blurHPasses=[];_blurVPasses=[];_blendPasses=[];constructor(e){this._brightPass=pm(e);const t={color:{format:"rgba16float"}};this._brightPass.setOutputParams(t);for(let A=0;A<=fo;A++){const a=mm(e),r=uo(e),n=uo(e);if(a.setOutputParams(t),r.setOutputParams(t),n.setOutputParams(t),r.setUniform("direction",[1,0]),n.setUniform("direction",[0,1]),this._downsamplePasses.push(a),this._blurHPasses.push(r),this._blurVPasses.push(n),A>0){const s=gm(e);s.setOutputParams(t),this._blendPasses.push(s)}}}reserveCapacity(){[this._brightPass,...this._downsamplePasses,...this._blurHPasses,...this._blurVPasses,...this._blendPasses].forEach(e=>e.reserveCapacity())}setSize(e,t){this._brightPass.setSize(e,t);for(let A=0;A<=fo;A++)this._downsamplePasses[A].setSize(e>>A+1,t>>A+1),this._blurHPasses[A].setSize(e>>A+1,t>>A+1),this._blurVPasses[A].setSize(e>>A,t>>A),A>0&&this._blendPasses[A-1].setSize(e>>A-1,t>>A-1)}setBrightThreshold(e){this._brightPass.setUniform("threshold",e)}setRadius(e){this._blendPasses.forEach(t=>{t.setUniform("weight",um(e))}),[...this._blurHPasses,...this._blurVPasses].forEach(t=>{t.setUniform("size",fm(e))})}createPass(e,t){const A=[this._brightPass,...this._downsamplePasses,...this._blurHPasses,...this._blurVPasses,...this._blendPasses],a=r=>r===A.length?t:A[r].getOutput("color");for(const[,r,n,s]of hm)A[s].createPass(e,{colorTex:a(r),colorTex1:a(r),colorTex2:a(n)});return this._blendPasses[0].getOutput("color")}getMemoryBytes(){return[this._brightPass,...this._downsamplePasses,...this._blurHPasses,...this._blurVPasses,...this._blendPasses].reduce((e,t)=>e+t.getMemoryBytes(),0)}dispose(){this._brightPass.dispose(),[...this._downsamplePasses,...this._blurHPasses,...this._blurVPasses,...this._blendPasses].forEach(e=>e.dispose())}getOutput(){return this._blendPasses[0].getOutput("color")}}function Bm(i,e){return i.channels===e.channels&&i.type===e.type&&i.count===e.count&&i.atomic===e.atomic}const ho=8;class cA{_label;_device;_outputBuffers={};_outputParams={};_pipeline;_bindGroups=[];_needsUpdatePipeline=!0;_inputs=[];_outputs=[];_uniforms=[];_uniformsMap={};_uniformBuffers={};_capacityWidth=0;_capacityHeight=0;_reserveCapacity=!1;_width=10;_height=10;_execWidth;_execHeight;_workGroupSize=[ho,ho];_csCode="";_csMain;_csDefine;_groupOffsets={inputs:0,uniforms:1,outputs:2};constructor(e,t,A){this._label=e,this._device=t,this._csMain=A.csMain,this._csDefine=A.csDefine,this._inputs=A.inputs,this._outputs=A.outputs;const a=A.uniforms||[];this._uniforms=a,this._uniformsMap=this._uniforms.reduce((r,n)=>(r[n.label]=n,r),{}),a.forEach(r=>{const n=pa(r.data,r.type);this._uniformBuffers[r.label]=t.createBuffer({label:this._label+"."+r.label,size:n.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this._device.queue.writeBuffer(this._uniformBuffers[r.label],0,n)})}setCSCode({csDefine:e,csMain:t}){this._csDefine=e,this._csMain=t,this._needsUpdatePipeline=!0}reserveCapacity(){this._reserveCapacity=!0,this._capacityWidth=this._width,this._capacityHeight=this._height}setSize(e,t){e=Math.max(1,Math.ceil(e)),t=Math.max(1,Math.ceil(t));const A=e!==this._width||t!==this._height;if(this._width=e,this._height=t,A){this._needsUpdatePipeline=!0;const a=Math.max(this._capacityWidth,e),r=Math.max(this._capacityHeight,t),n=a!==this._capacityWidth||r!==this._capacityHeight;if(this._capacityWidth=a,this._capacityHeight=r,this._reserveCapacity&&!n)return;for(const s in this._outputBuffers)this._outputBuffers[s].destroy();this._outputBuffers={}}}setExecuteSize(e,t){e=Math.max(1,Math.ceil(e)),t=Math.max(1,Math.ceil(t)),this._execWidth=e,this._execHeight=t}setOutputParams(e){this._invalidateChangedOutputBuffers(e),this._outputParams=e,this._needsUpdatePipeline=!0}setUniform(e,t){const A=this._uniformBuffers[e];this._device.queue.writeBuffer(A,0,pa(t,this._uniformsMap[e].type))}getOutput(e){const t=this._outputBuffers;return t[e]||(t[e]=this._createBuffer(e,this._outputParams[e]||{})),t[e]}getMemoryBytes(){return[...Object.values(this._uniformBuffers),...Object.values(this._outputBuffers)].reduce((e,t)=>e+t.size,0)}dispose(){Object.keys(this._uniformBuffers).forEach(e=>{this._uniformBuffers[e].destroy()}),Object.keys(this._outputBuffers).forEach(e=>{this._outputBuffers[e].destroy()})}setWorkGroupSize(e,t){this._needsUpdatePipeline=e!==this._workGroupSize[0]||t!==this._workGroupSize[1],this._workGroupSize=[e,t]}_getActualWorkgroupSize(){return[Math.min(this._workGroupSize[0],this._execWidth??this._width),Math.min(this._workGroupSize[1],this._execHeight??this._height)]}_createBuffer(e,t){const A=t.channels??4,a=(this._reserveCapacity?this._capacityWidth*this._capacityHeight:this._width*this._height)*A*(t.count??1)*4;return this._device.createBuffer({label:this._label+"."+e,size:Math.max(a,80),usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC})}_invalidateChangedOutputBuffers(e){const t=this._outputBuffers,A=this._outputParams;for(const a in t)Bm(e[a]||{},A[a]||{})||(t[a].destroy(),delete t[a])}_updateOutputBuffers(e){const t=this._outputBuffers,A=this._outputParams;for(const a in A)!t[a]&&!e?.includes(a)&&(t[a]=this._createBuffer(a,A[a]))}_updatePipeline(e,t){if(!this._needsUpdatePipeline)return;this._needsUpdatePipeline=!1;const A=this._device,a=this._getFullCs(e,t);a!==this._csCode&&(this._csCode=a,this._pipeline=bt(A).createComputePipeline({label:this._label,layout:"auto",compute:{module:bt(A).createShaderModule({label:this._label,code:a}),entryPoint:"main"}}),this._updateBindGroups())}_getFullCs(e,t){const A=this._inputs,a=this._uniforms;let r=0;const n=this._groupOffsets={inputs:0,uniforms:0,outputs:0},s=this._getActualWorkgroupSize();A.length>0&&r++,a.length>0&&(n.uniforms=r,r++);function o(c){const{type:f="f32",channels:p}=c;let h=p===1?f:`vec${p}${f[0]}`;return c.atomic&&(h=`atomic<${h}>`),h}return n.outputs=r,`
${A.sort().map((c,f)=>{const p=`@group(${n.inputs}) @binding(${f}) `,h=`in_${c}`;return t[c]==="texture"?`${p} var ${h}: texture_2d<f32>;`:`${p} var<storage, read> ${h}: array<${o(e[c])}>;`}).join(`
`)}
${this._uniforms.map((c,f)=>`@group(${n.uniforms}) @binding(${f}) var<uniform> ${c.label}: ${c.type};`).join(`
`)}

${this._outputs.map((c,f)=>`@group(${n.outputs}) @binding(${f}) var<storage, read_write> out_${c}: array<${o(this._outputParams[c]||{})}>;`).join(`
`)}
${this._csDefine??""}
@compute @workgroup_size(${s[0]}, ${s[1]}, 1)
fn main(@builtin(global_invocation_id) globalId: vec3u) {
${this._csMain}
}
`}_updateBindGroups(){const e=[],t=this._device,A=this._groupOffsets;this._uniforms.length>0&&(e[A.uniforms]=t.createBindGroup({label:this._label+".uniforms",layout:this._pipeline.getBindGroupLayout(A.uniforms),entries:this._uniforms.map((a,r)=>({binding:r,resource:{buffer:this._uniformBuffers[a.label]}}))})),this._bindGroups=e}createPass(e,t,A){this._updateOutputBuffers(Object.keys(A||{}));const a={...this._outputBuffers,...A},r=this._inputs.reduce((l,c)=>(l[c]=t[c].buffer?"buffer":"texture",l),{});this._updatePipeline(t,r);const n=this._groupOffsets;this._inputs.length>0&&(this._bindGroups[n.inputs]=this._device.createBindGroup({label:this._label+".inputs",layout:this._pipeline.getBindGroupLayout(n.inputs),entries:this._inputs.map((l,c)=>({binding:c,resource:t[l].buffer?{buffer:t[l].buffer}:t[l].texture.createView()}))})),this._bindGroups[n.outputs]=this._device.createBindGroup({label:this._label+".outputs",layout:this._pipeline.getBindGroupLayout(n.outputs),entries:this._outputs.map((l,c)=>({binding:c,resource:{buffer:a[l]}}))});const s=e.beginComputePass();s.setPipeline(this._pipeline),this._bindGroups.forEach((l,c)=>{s.setBindGroup(c,l)});const o=this._getActualWorkgroupSize();s.dispatchWorkgroups(Math.ceil((this._execWidth??this._width)/o[0]),Math.ceil((this._execHeight??this._height)/o[1]),1),s.end()}}const wm=`
@group(0) @binding(0) var inputTexture: texture_2d<f32>;
@group(0) @binding(1) var<storage, read_write> peakBits: atomic<u32>;

@compute @workgroup_size(16, 16)
fn main(@builtin(global_invocation_id) id: vec3u) {
let size = textureDimensions(inputTexture);
if (id.x >= size.x || id.y >= size.y) { return; }
let color = max(textureLoad(inputTexture, vec2i(id.xy), 0).rgb, vec3f(0.0));
let peak = max(color.r, max(color.g, color.b));
if (peak < 65504.0) {
atomicMax(&peakBits, bitcast<u32>(peak));
}
}
`;class Em{device;peakBuffer;readbackBuffer;pipeline;pending=!1;disposed=!1;lastSubmissionTime=-1/0;peakDisplayValue=0;constructor(e){this.device=e,this.peakBuffer=e.createBuffer({label:"HDR display peak",size:Uint32Array.BYTES_PER_ELEMENT,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST}),this.readbackBuffer=e.createBuffer({label:"HDR display peak readback",size:Uint32Array.BYTES_PER_ELEMENT,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ}),this.pipeline=e.createComputePipeline({label:"HDR display peak",layout:"auto",compute:{module:e.createShaderModule({label:"HDR display peak",code:wm}),entryPoint:"main"}})}encode(e,t,A,a,r=performance.now()){if(this.pending||r-this.lastSubmissionTime<500)return!1;this.pending=!0,this.lastSubmissionTime=r,e.clearBuffer(this.peakBuffer);const n=this.device.createBindGroup({label:"HDR display peak",layout:this.pipeline.getBindGroupLayout(0),entries:[{binding:0,resource:t.createView()},{binding:1,resource:{buffer:this.peakBuffer}}]}),s=e.beginComputePass({label:"HDR display peak"});return s.setPipeline(this.pipeline),s.setBindGroup(0,n),s.dispatchWorkgroups(Math.ceil(A/16),Math.ceil(a/16)),s.end(),e.copyBufferToBuffer(this.peakBuffer,0,this.readbackBuffer,0,Uint32Array.BYTES_PER_ELEMENT),!0}async resolve(){if(!(!this.pending||this.disposed))try{await this.readbackBuffer.mapAsync(GPUMapMode.READ);const e=this.readbackBuffer.getMappedRange(),t=new Uint32Array(e)[0],A=new ArrayBuffer(Float32Array.BYTES_PER_ELEMENT);new Uint32Array(A)[0]=t,this.peakDisplayValue=new Float32Array(A)[0],this.readbackBuffer.unmap()}catch{this.readbackBuffer.mapState==="mapped"&&this.readbackBuffer.unmap()}finally{this.pending=!1}}getPeakDisplayValue(){return this.peakDisplayValue}reset(){this.peakDisplayValue=0,this.lastSubmissionTime=-1/0}getMemoryBytes(){return this.peakBuffer.size+this.readbackBuffer.size}dispose(){this.disposed=!0,this.device.queue.onSubmittedWorkDone().catch(()=>{}).then(()=>{this.peakBuffer.destroy(),this.readbackBuffer.destroy()})}}function yr(i,e,t){return i==="textures"?`@group(0) @binding(${e}) var ${t}: texture_2d<f32>;`:`@group(0) @binding(${e}) var<storage, read> ${t}: array<vec4f>;`}function Hi(i,e,t){return i==="textures"?`textureLoad(${e}, ${t}, 0)`:`${e}[gv(${t})]`}function bm(i,e,t,A){const a=new ArrayBuffer(16);return new Uint32Array(a,0,2).set([i,e]),new Float32Array(a,8,2).set([Kr*Math.max(t,.001),Oo(A)]),a}const Vt=8,ka=`
struct JNLMParams {
size: vec2u,
colorSensitivity: f32,

dilation: f32,
}
@group(0) @binding(0) var<uniform> params: JNLMParams;
`,_m=`
${ka}
${za}
@group(0) @binding(1) var<storage, read> accumulation: array<ShadowCatcherAccumulation>;
@group(0) @binding(2) var<storage, read> normalBuffer: array<vec4f>;
@group(0) @binding(3) var<storage, read_write> rawGuide: array<vec2f>;

@compute @workgroup_size(${Vt}, ${Vt}, 1)
fn main(@builtin(global_invocation_id) id: vec3u) {
let size = params.size;
if (id.x >= size.x || id.y >= size.y) { return; }
let qE = id.x + (size.y - 1u - id.y) * size.x;
let n = normalBuffer[qE].a;
let moments = accumulation[qE].moments;
let mean = moments.x / max(n, 1.0);

var variance = -1.0;
if (n >= 2.0) {
variance = max(moments.y - n * mean * mean, 0.0) / (n * (n - 1.0));
}
rawGuide[id.x + id.y * size.x] = vec2f(mean, variance);
}
`,ym=`
${ka}
@group(0) @binding(1) var<storage, read> rawGuide: array<vec2f>;
@group(0) @binding(2) var<storage, read_write> guide: array<vec2f>;

@compute @workgroup_size(${Vt}, ${Vt}, 1)
fn main(@builtin(global_invocation_id) id: vec3u) {
let size = params.size;
if (id.x >= size.x || id.y >= size.y) { return; }
let center = rawGuide[id.x + id.y * size.x];
var mf = 0.0;
var jx = 0.0;
var nW = 0.0;
var jp = 0.0;
for (var dy = -1; dy <= 1; dy++) {
for (var dx = -1; dx <= 1; dx++) {
let q = clamp(vec2i(id.xy) + vec2i(dx, dy), vec2i(0), vec2i(size) - 1);
let value = rawGuide[u32(q.x) + u32(q.y) * size.x];
nW += value.x;
jp += value.x * value.x;
if (value.y >= 0.0) {
mf += value.y;
jx += 1.0;
}
}
}
var variance: f32;
if (center.y >= 0.0) {
variance = mf / jx;
} else {
let me = nW / 9.0;
variance = max(jp / 9.0 - me * me, 0.0) * 9.0 / 8.0;
}
guide[id.x + id.y * size.x] = vec2f(center.x, variance);
}
`;function xm(i="textures"){return`
${ka}
@group(0) @binding(1) var colorTex: texture_2d<f32>;
@group(0) @binding(2) var<storage, read_write> outColor: array<vec4f>;
${i==="buffers"?`${za}
@group(0) @binding(3) var<storage, read> normalAccumulation: array<vec4f>;
@group(0) @binding(4) var<storage, read_write> normal: array<vec4f>;
@group(0) @binding(5) var<storage, read> shadowAccumulation: array<ShadowCatcherAccumulation>;
@group(0) @binding(6) var<storage, read_write> shadow: array<vec4f>;
@group(0) @binding(7) var albedoTex: texture_2d<f32>;
@group(0) @binding(8) var<storage, read_write> albedo: array<vec4f>;`:""}

@compute @workgroup_size(${Vt}, ${Vt}, 1)
fn main(@builtin(global_invocation_id) id: vec3u) {
if (id.x >= params.size.x || id.y >= params.size.y) { return; }
outColor[id.x + id.y * params.size.x] = textureLoad(colorTex, vec2i(id.xy), 0);
${i==="buffers"?`  let index = id.x + id.y * params.size.x;
let qE = id.x + (params.size.y - 1u - id.y) * params.size.x;
let n = normalAccumulation[qE];
let samples = max(n.a, 1.0);
normal[index] = vec4f(n.rgb / samples * 0.5 + 0.5, select(0.0, 1.0, dot(n.rgb, n.rgb) > 0.1));
shadow[index] = shadowAccumulation[qE].mask / samples;
albedo[index] = textureLoad(albedoTex, vec2i(id.xy), 0);`:""}
}
`}const Cm=xm();function Qm({searchRadius:i,patchRadius:e,albedoBandwidth:t,normalBandwidth:A}=uA,a="textures"){const r=(2*e+1)**2;return`
${ka}
@group(0) @binding(1) var<storage, read> guide: array<vec2f>;
@group(0) @binding(2) var<storage, read> color: array<vec4f>;
${yr(a,3,"albedoTex")}
${yr(a,4,"normalTex")}
@group(0) @binding(5) var<storage, read_write> outColor: array<vec4f>;
@group(0) @binding(6) var<storage, read_write> outGuide: array<vec2f>;
${yr(a,7,"shadowCatcherTex")}

const SEARCH_RADIUS = ${i};
const PATCH_RADIUS = ${e};
const PATCH_SIZE = ${r};

const VARIANCE_CANCELLATION = 1.0;

const INV_ALBEDO_BANDWIDTH2 = ${(1/t**2).toFixed(6)};
const INV_COVERAGE_BANDWIDTH2 = ${(1/To**2).toFixed(6)};
const INV_NORMAL_BANDWIDTH2 = ${(1/A**2).toFixed(6)};


const CENTER_WEIGHT_MIN = 0.01;

fn gv(p: vec2i) -> u32 {
let q = clamp(p, vec2i(0), vec2i(params.size) - 1);
return u32(q.x) + u32(q.y) * params.size.x;
}

fn mi(q: vec2i, bC: vec4f, hg: vec3f) -> f32 {
let albedo = ${Hi(a,"albedoTex","q")};


let qd = max((albedo.rgb + bC.rgb) * 0.5, vec3f(${qi}));
let lN = (albedo.rgb - bC.rgb) / qd;
let jk = albedo.a - bC.a;
let lX = ${Hi(a,"normalTex","q")}.rgb - hg;
return max(
dot(lN, lN) * INV_ALBEDO_BANDWIDTH2
+ jk * jk * INV_COVERAGE_BANDWIDTH2,
dot(lX, lX) * INV_NORMAL_BANDWIDTH2
);
}

fn premultiplied(c: vec4f) -> vec4f {
return vec4f(c.rgb * c.a, c.a);
}

@compute @workgroup_size(${Vt}, ${Vt}, 1)
fn main(@builtin(global_invocation_id) id: vec3u) {
let size = vec2i(params.size);
let p = vec2i(id.xy);
if (p.x >= size.x || p.y >= size.y) { return; }
let step = i32(params.dilation);
let bC = ${Hi(a,"albedoTex","p")};
let fR = ${Hi(a,"normalTex","p")};
let hg = fR.rgb;
let index = gv(p);


if (fR.a <= 0.0 && ${Hi(a,"shadowCatcherTex","p")}.r <= 0.0) {
outColor[index] = color[index];
outGuide[index] = guide[index];
return;
}

var lP: array<vec2f, PATCH_SIZE>;
var k = 0;
for (var dy = -PATCH_RADIUS; dy <= PATCH_RADIUS; dy++) {
for (var dx = -PATCH_RADIUS; dx <= PATCH_RADIUS; dx++) {
lP[k] = guide[gv(p + vec2i(dx, dy) * step)];
k++;
}
}
let k2 = params.colorSensitivity * params.colorSensitivity;

var sum = vec4f(0.0);
let hk = max(bC.rgb, vec3f(${qi}));
var ng = vec3f(0.0);
var gN = vec3f(0.0);
var hG = vec3f(0.0);
var qp = 0.0;
var gP = 0.0;
var oP = 0.0;
var lt = 0.0;
for (var sy = -SEARCH_RADIUS; sy <= SEARCH_RADIUS; sy++) {
for (var sx = -SEARCH_RADIUS; sx <= SEARCH_RADIUS; sx++) {
let q = p + vec2i(sx, sy) * step;
if (
(sx == 0 && sy == 0) ||
q.x < 0 || q.y < 0 || q.x >= size.x || q.y >= size.y
) { continue; }

let features = mi(q, bC, hg);
if (features > 16.0) { continue; }

var gk = 0.0;
k = 0;
for (var dy = -PATCH_RADIUS; dy <= PATCH_RADIUS; dy++) {
for (var dx = -PATCH_RADIUS; dx <= PATCH_RADIUS; dx++) {
let a = lP[k];
let b = guide[gv(q + vec2i(dx, dy) * step)];
let rZ = a.x - b.x;
gk += (rZ * rZ
- VARIANCE_CANCELLATION * (a.y + min(a.y, b.y)))
/ (1e-10 + k2 * (a.y + b.y));
k++;
}
}
gk /= f32(PATCH_SIZE);

let weight = exp(-max(max(gk, 0.0), features));
let index = gv(q);
let c = color[index];
let g = guide[index];

let a = (${Hi(a,"albedoTex","q")}.rgb - bC.rgb) / hk;
let value = premultiplied(c);
sum += value * weight;
ng += a * weight;
gN += a * a * weight;
hG += a * value.rgb * weight;
qp += g.x * weight;
gP += g.y * weight * weight;
oP += weight;
lt = max(lt, weight);
}
}



let center = color[index];
let lO = guide[index];
let dR = max(lt, CENTER_WEIGHT_MIN);
let totalWeight = oP + dR;
let vj = premultiplied(center);
let mean = (sum + vj * dR) / totalWeight;


let eI = ng / totalWeight;
let mj = max(gN / totalWeight - eI * eI, vec3f(0.0));
let rv = hG / totalWeight - eI * mean.rgb;



let rI = bC.rgb + eI * hk;
let po = mean.rgb * hk / max(rI, vec3f(${qi}));
let xg = clamp(rv / (mj + vec3f(${Ro})), vec3f(0.0), po);
let sD = mean.rgb - xg * eI;
let filtered = vec4f(max(sD, vec3f(0.0)), max(mean.a, 0.0));
let rgb = select(
center.rgb,
filtered.rgb / max(filtered.a, 1e-6),
filtered.a > 1e-6
);
outColor[index] = vec4f(rgb, filtered.a);
outGuide[index] = vec2f(
(qp + lO.x * dR) / totalWeight,
(gP + lO.y * dR * dR)
/ (totalWeight * totalWeight)
);
}
`}const po=Xr;class Mm{_device;_paramsBuffers=[];_guidePipeline;_variancePipeline;_loadColorPipeline;_filterPipeline;_filterShapeKey="";_guides=[];_colors=[];_width=0;_height=0;constructor(e){this._device=e;for(let t=0;t<=po;t++)this._paramsBuffers.push(e.createBuffer({label:"JNLM params",size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}));this._guidePipeline=this._createPipeline("JNLM guide",_m),this._variancePipeline=this._createPipeline("JNLM variance",ym),this._loadColorPipeline=this._createPipeline("JNLM load color",Cm)}_createPipeline(e,t){return bt(this._device).createComputePipeline({label:e,layout:"auto",compute:{module:bt(this._device).createShaderModule({label:e,code:t}),entryPoint:"main"}})}_getFilterPipeline(e){const t=JSON.stringify(e);return(!this._filterPipeline||t!==this._filterShapeKey)&&(this._filterPipeline=this._createPipeline("JNLM filter",Qm(e)),this._filterShapeKey=t),this._filterPipeline}reserveCapacity(){}_ensureBuffers(e,t){if(e<=this._width&&t<=this._height&&this._colors.length)return;e=Math.max(e,this._width),t=Math.max(t,this._height),this._destroyBuffers();const A=e*t,a=(r,n)=>this._device.createBuffer({label:r,size:A*n,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC});this._guides=[a("JNLM guide A",8),a("JNLM guide B",8)],this._colors=[a("JNLM color A",16),a("JNLM color B",16)],this._width=e,this._height=t}_destroyBuffers(){for(const e of[...this._guides,...this._colors])e.destroy();this._guides=[],this._colors=[]}encode(e,t){const{width:A,height:a,shape:r}=t;this._ensureBuffers(A,a);const n=Math.min(Math.max(Math.round(r.iterations),1),po);this._paramsBuffers.forEach((b,x)=>{const y=bm(A,a,t.strength,Math.max(x-1,0));this._device.queue.writeBuffer(b,0,y)});const s=this._device,o=this._getFilterPipeline(r),l=(b,x,y)=>s.createBindGroup({layout:b.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:x}},...y.map((T,I)=>({binding:I+1,resource:T}))]}),[c,f]=this._guides,[p,h]=this._colors,u=this._paramsBuffers[0],d=[[this._guidePipeline,l(this._guidePipeline,u,[{buffer:t.accumulation},{buffer:t.normalAccumulation},{buffer:f}])],[this._variancePipeline,l(this._variancePipeline,u,[{buffer:f},{buffer:c}])],[this._loadColorPipeline,l(this._loadColorPipeline,u,[t.color.createView(),{buffer:p}])]],m=t.albedo.createView(),v=t.normal.createView(),g=t.shadowCatcher.createView();let w=[c,f],B=[p,h];for(let b=1;b<=n;b++)d.push([o,l(o,this._paramsBuffers[b],[{buffer:w[0]},{buffer:B[0]},m,v,{buffer:B[1]},{buffer:w[1]},g])]),w=[w[1],w[0]],B=[B[1],B[0]];const E=e.beginComputePass({label:"JNLM denoise"});for(const[b,x]of d)E.setPipeline(b),E.setBindGroup(0,x),E.dispatchWorkgroups(Math.ceil(A/Vt),Math.ceil(a/Vt));return E.end(),B[0]}getMemoryBytes(){return[...this._paramsBuffers,...this._guides,...this._colors].reduce((e,t)=>e+t.size,0)}dispose(){for(const e of this._paramsBuffers)e.destroy();this._destroyBuffers()}}const Im=`
if (globalId.x >= u32(imageSize.x) || globalId.y >= u32(imageSize.y)) { return; }
let index = globalId.x + globalId.y * u32(imageSize.x);
let raw = textureLoad(in_albedo, vec2u(globalId.xy), 0);
let encoded = sT(raw.rgb);
out_albedo[index] = vec4f(encoded, raw.a);
`,Pm=`
if (globalId.x >= u32(imageSize.x) || globalId.y >= u32(imageSize.y)) { return; }
let index = globalId.x + globalId.y * u32(imageSize.x);
let filtered = in_albedo[index];
let linear = sS(filtered.rgb);
var result = linear;
let jD = textureLoad(in_rawAlbedo, vec2i(globalId.xy), 0).a;
if (preserveSurfaceTexture != 0u) {



let pixel = vec2i(globalId.xy);
let center = textureLoad(in_rawNormal, pixel, 0);
let n = normalize(center.rgb * 2.0 - 1.0 + vec3f(1e-8));
var oc = 0.0;
for (var y = -1; y <= 1; y++) {
for (var x = -1; x <= 1; x++) {
let vw = textureLoad(in_rawNormal,
clamp(pixel + vec2i(x, y), vec2i(0), imageSize - 1), 0);
let nn = normalize(vw.rgb * 2.0 - 1.0 + vec3f(1e-8));
oc = max(oc,
max(1.0 - dot(n, nn), abs(center.a - vw.a)));
}
}
let vO = smoothstep(0.02, 0.1, oc);
let raw = clamp(textureLoad(in_rawAlbedo, pixel, 0).rgb,
vec3f(0.0), vec3f(1.0));
result = mix(raw, linear, vO);
}
out_albedo[index] = vec4f(result, jD);
`,Sm=`
if (globalId.x >= u32(imageSize.x) || globalId.y >= u32(imageSize.y)) { return; }
let index = globalId.x + globalId.y * u32(imageSize.x);
out_normal[index] = vec4f(rL(in_normal[index].rgb), 1.0);
`;function Dm(i){try{const e=i.createQuerySet({type:"timestamp",count:2}),t=i.createBuffer({size:e.count*8,usage:GPUBufferUsage.QUERY_RESOLVE|GPUBufferUsage.COPY_SRC}),A=i.createBuffer({size:t.size,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});return{querySet:e,resolveBuffer:t,resultBuffer:A}}catch(e){console.error(e);return}}function Tm(i,e,t,A,a,r,n){let s=()=>{},o=!1,l=1/0,c=!1,f=!1,p=0,h=!1,u=0;const d=new Zd(e);let m,v=0,g=32,w,B=0,E,b,x=Promise.resolve(),y=!0,T=!1,I=!0,P=!1,S=0,R=0,L=0,H=0;const J={};let _,F=0,V=!1,Z=[0,0,0,0],ie=[0,0,0,0],N,K=!1;const ge=new eh(e);let ue=!1,de=21,Ee=0,_e=0,W=1,le=.6,ye=1,ne=0,Qe=1,Je=1,se=0,et=0,Se=0,oe=!1,be=!1,Ie="final",je=xl,ve=me(),Pe=1,ce=performance.now(),vt=0,fe,Le,ke=!1,xe=!1,D,Y,q=0,Be=!1,pe;function Oe(){D?.abort(),D=void 0,q++;const C=pe;if(pe=void 0,C)try{C.abort()}finally{C.finish()}}function Ye(C,U){return C!==q?Promise.resolve():new Promise((O,z)=>{let G=!1,j;const re=()=>{G||(G=!0,pe===j&&(pe=void 0),O())},we=Ue=>{G||(G=!0,pe===j&&(pe=void 0),z(Ue))};try{const Ue=U(re,we);if(j={abort:Ue,finish:re},G)return;if(C!==q){Ue(),re();return}pe=j}catch(Ue){pe===j&&(pe=void 0),G=!0,z(Ue)}})}const pi=A.context,tA=e.features.has("timestamp-query")?a.get("trace timing",()=>{const C=Dm(e);return{query:C,getMemoryBytes:()=>C?C.resolveBuffer.size+C.resultBuffer.size:0,dispose(){C?.querySet.destroy(),C?.resolveBuffer.destroy(),C?.resultBuffer.destroy()}}}).query:void 0,pt=Gc(),tt=tA?tm():void 0;pt.setDesiredMsPerTile(de),tt?.setDesiredMsPerTile(de);function Ri(){B++,tt?.needsUpdatePredicting(),E=void 0,I=p===0,P=!1}const Kc=a.get("empty texture",()=>{const C=e.createTexture({label:"Shared empty image",size:{width:1,height:1},format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING});return{texture:C,getMemoryBytes:()=>4,dispose:()=>C.destroy()}}).texture,Dt=new Am(e,Kc),$e=C=>Dt.getOutput(C);let Tt;const UA=a.get("rawOutputPass",()=>new Pt("raw output",e,{textureWillBeRead:!0,inputs:["colorTex","coverageTex"],outputs:["color"],uniforms:[{label:"flatBackgroundColor",type:"vec4f",data:[0,0,0,0]}],fsDefine:ec,fsMain:`
var color = load_colorTex(uv, 0);
let coverage = clamp(load_coverageTex(uv, 0).a, 0.0, 1.0);
color = vec4f(
jQ(color.r, coverage, flatBackgroundColor.a > 0.5, true),
jQ(color.g, coverage, flatBackgroundColor.a > 0.5, true),
jQ(color.b, coverage, flatBackgroundColor.a > 0.5, true), color.a);
output.color = color;
`})),Rt=a.get("readbackPass",()=>new Pt("output readback",e,{textureWillBeRead:!0,inputs:["inputTex"],outputs:["color"],fsMain:"output.color = load_inputTex(uv, 0);"}));Rt.setOutputParams({color:{format:"rgba32float"}});let Wa;const Me=a.get("composePass",()=>new Pt("compose",e,{textureWillBeRead:!0,fsMain:Wd+Vd,fsDefine:Gd,uniforms:[{label:"exposure",type:"f32",data:ye},{label:"toneMappingParams",type:"vec2f",data:[ne,Se]},{label:"hdrOutputEnabled",type:"f32",data:0},{label:"colorGradingParams",type:"vec4f",data:[Qe,Je,se,et]},{label:"flatBackgroundColor",type:"vec4f",data:[0,0,0,0]},{label:"shadowCatcherColor",type:"vec3f",data:ve},{label:"shadowCatcherAlpha",type:"f32",data:Pe},{label:"shadowCatcherEnabled",type:"f32",data:0},{label:"bloomIntensity",type:"f32",data:.25}],outputs:["color","denoiseColor","denoiseAlbedo"],inputs:["colorTex","foregroundTex","catcherBackgroundTex","flatBackgroundMaskTex","shadowCatcherTex","bloomTex"]}));let mi="rgba8unorm";Me.setOutputParams({color:{format:mi},denoiseColor:{format:"rgba32float"},denoiseAlbedo:{format:"rgba8unorm"}});const Ct=a.get("compositeDenoiseDisplayPass",()=>new Pt("OIDN composed display",e,{textureWillBeRead:!0,fsMain:Jd,fsDefine:Zl,uniforms:[{label:"denoisedAlpha",type:"f32",data:0}],outputs:["color"],inputs:["colorTex","composedTex"]}));Ct.setOutputParams({color:{format:"rgba8unorm"}});const iA=[{label:"imageSize",type:"vec2i",data:new Int32Array([1,1])}],LA=a.get("oidnAlbedoEncodePass",()=>new cA("OIDN albedo sRGB encode",e,{inputs:["albedo"],outputs:["albedo"],uniforms:iA,csDefine:gr,csMain:Im})),AA=a.get("oidnAlbedoDecodePass",()=>new cA("OIDN albedo sRGB decode",e,{inputs:["albedo","rawAlbedo","rawNormal"],outputs:["albedo"],uniforms:[...iA,{label:"preserveSurfaceTexture",type:"u32",data:0}],csDefine:gr,csMain:Pm})),OA=a.get("oidnNormalSanitizePass",()=>new cA("OIDN normal sanitize",e,{inputs:["normal"],outputs:["normal"],uniforms:iA,csDefine:gr,csMain:Sm}));LA.setOutputParams({albedo:{channels:4}}),AA.setOutputParams({albedo:{channels:4}}),OA.setOutputParams({normal:{channels:4}});const aA=a.get("outputPass",()=>new Pt("output",e,{fsMain:`
let xs = min(
vec2i(uv2 * vec2f(colorTexRegion())),
vec2i(colorTexRegion()) - vec2i(1)
);
var color = load_colorTex(xs, 0);
color = vec4(color.rgb * color.a, color.a);
output.color = color;
`,outputs:["color"],inputs:["colorTex"]}));aA.setOutputParams({color:{format:"rgba8unorm"}});function Xc(C,U){aA.setRenderToScreen(pi.getCurrentTexture(),A.format),aA.createPass(C,{colorTex:U})}function Zc(C,U){const O=v+u,z=Ea(O,2)-.5,G=Ea(O,3)-.5;t.setJitter(z/C,G/U)}function Hn(C,U){const O=e.createCommandEncoder();t.setSampleCount(v+u),t.setSampleSequenceOffset(u),Zc(S,R);const z=tA,G=z?.resultBuffer.mapState==="unmapped";t.createPass(O,C,U,z?{querySet:z.querySet}:void 0),z&&(O.resolveQuerySet(z.querySet,0,z.querySet.count,z.resolveBuffer,0),G&&O.copyBufferToBuffer(z.resolveBuffer,0,z.resultBuffer,0,z.resultBuffer.size)),e.queue.submit([O.finish()]);const j=tt,re=B;if(z&&G&&j){const we=U[0]*U[1];x=z.resultBuffer.mapAsync(GPUMapMode.READ).then(()=>{const Ue=z.resultBuffer.getMappedRange(),Re=new BigInt64Array(Ue,0,2),Ne=Math.max(Number(Re[1]-Re[0])/1e6,.1);!T&&re===B&&!y&&(E={tileTimeMs:Ne,tileTimePerSampleMs:Ne,estimatedFullFrameTimeMs:Ne*we,tileCount:we},j.setLastTraceTime(Ne)),z.resultBuffer.unmap()}).catch(()=>{z.resultBuffer.mapState==="mapped"&&z.resultBuffer.unmap()})}}function ja(){ue=!1}function Ya(){ke&&(Oe(),ue=!1)}function ef(C,U,O){if(!U)return;const z=a.get("denoised conversion",()=>new ah(e));return O=z.get(S,R),z.setRegion(S,R),C.copyBufferToTexture({buffer:U,bytesPerRow:16*S},{texture:O},{width:S,height:R,depthOrArrayLayers:1}),O}function Ui(C,U,O){const z=U.width*U.height*16;return(!O||O.size!==z)&&(O?.destroy(),O=e.createBuffer({label:"Persistent denoised output",size:z,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.COPY_SRC})),C.copyBufferToBuffer(U.data,0,O,0,z),O}function tf(){Me.setSize(S,R),Me.setOutputParams({color:{format:mi},denoiseColor:{format:"rgba32float"},denoiseAlbedo:{format:"rgba8unorm"}}),Me.setUniform("exposure",ye),Me.setUniform("toneMappingParams",[ne,Se]),Me.setUniform("colorGradingParams",[Qe,Je,se,et]),Me.setUniform("hdrOutputEnabled",+be),Me.setUniform("shadowCatcherColor",ve),Me.setUniform("shadowCatcherAlpha",Pe),Ct.setSize(S,R),Ct.setOutputParams({color:{format:mi}}),Ct.setUniform("denoisedAlpha",ue&&ke?+t.needsDenoiseAlpha():0)}function Wn(C,U,O,z=!1){const G=a.get(U,()=>new vr(e)).get(S*R*16,z);return C.copyTextureToBuffer({texture:O},{buffer:G,bytesPerRow:S*16},{width:S,height:R}),G}function Li(C,U,O=!1){const z=a.get(C,()=>new cA(`${C} copy`,e,{inputs:["guide"],outputs:["color"],uniforms:iA,csMain:"if (globalId.x >= u32(imageSize.x) || globalId.y >= u32(imageSize.y)) {return;} out_color[globalId.x + globalId.y * u32(imageSize.x)] = textureLoad(in_guide, vec2i(globalId.xy), 0);"}));z.setOutputParams({color:{channels:4}}),z.setSize(S,R),z.setUniform("imageSize",[S,R]);const G=O?a.get(`${C} buffer`,()=>new vr(e)).get(S*R*16,!0):void 0,j=e.createCommandEncoder();return z.createPass(j,{guide:{texture:U,channels:4}},G?{color:G}:void 0),e.queue.submit([j.finish()]),G??z.getOutput("color")}function qt(C,U,O=!1){ge.reset(),O&&(F=v,V=t.hasShadowCatcher(),ie=Z.slice()),Me.setUniform("flatBackgroundColor",ie),UA.setUniform("flatBackgroundColor",ie);const z=Wt(Ie);if(z&&v===0){if(!_?.aovs?.includes(z))throw new Error(`AOV ${z} is not enabled`);if(!d.samples)return;jn(C,d.visualize(z,je,be));return}if(F<1)return;tf(),ue&&(Le=ef(C,fe,Le)),O&&(Dt.setSampleCount(v),Dt.createPass(C,t.getOutputBuffer(),V)),Me.setUniform("shadowCatcherEnabled",+V);let G=$e(V?"foreground":"color");const j=ue&&xe&&Le?Le:$e("color");let re=$e("catcherBackground");if(ue&&xe&&Le&&V){const De=a.get("custom HDR layers",()=>new Pt("Custom HDR layers",e,{textureWillBeRead:!0,inputs:["originalTex","filteredTex","foregroundTex","backgroundTex"],outputs:["foreground","background"],fsMain:th}));De.setOutputParams({foreground:{format:"rgba32float"},background:{format:"rgba32float"}}),De.setSize(S,R),b?.push("CorrectLayers:SceneLinear"),De.createPass(C,{originalTex:$e("color"),filteredTex:Le,foregroundTex:G,backgroundTex:re}),G=De.getOutput("foreground"),re=De.getOutput("background")}const we=Ee>0,Ue=a.get("bloom state",()=>({owner:void 0,settings:"",dispose(){}})),Re=`${W}/${le}/${+(ue&&xe)}`,Ne=we&&v>=10&&(v-_e>=10||Ue.owner!==J||Ue.settings!==Re);let st=Ee;Ne?(Tt||(Tt=a.get("bloom",()=>new vm(e)),Tt.setSize(S,R)),Tt.setSize(S,R),Ue.owner=J,Ue.settings=Re,_e=v,Tt.setBrightThreshold(W),Tt.setRadius(le),b?.push("Bloom:SceneLinear"),Tt.createPass(C,j)):we&&v<10&&(st=0),Me.setUniform("bloomIntensity",st),b?.push("Compose:DisplayLinear+DisplayEncoded"),Me.createPass(C,{colorTex:j,foregroundTex:G,catcherBackgroundTex:re,flatBackgroundMaskTex:$e("albedo"),shadowCatcherTex:$e("shadowCatcher"),bloomTex:we&&Tt?Tt.getOutput():j}),ue&&!xe&&ke&&Le&&(b?.push("Encode:DisplayEncoded"),Ct.createPass(C,{colorTex:Le,composedTex:Me.getOutput("denoiseColor")}));let Ut=(ue&&fe?xe?Me.getOutput("color"):ke?Ct.getOutput("color"):Le:void 0)||Me.getOutput("color");if(z){if(!_?.aovs?.includes(z))throw new Error(`AOV ${z} is not enabled`);Ut=d.visualize(z,je,be)}jn(C,Ut)}function jn(C,U){const O=be?Wa??=a.get("hdrPeak",()=>new Em(e)):void 0,z=O?.encode(C,U,S,R)??!1;if(Ie==="normal"||Ie==="albedo"?(b?.push("AOV:Raw"),U=$e(Ie)):Ie==="shadowCatcher"&&(b?.push("AOV:Raw"),U=$e("shadowCatcher")),(U.width<S||U.height<R)&&(Rt.setSize(S,R),Rt.createPass(C,{inputTex:U}),U=Rt.getOutput("color")),!(Be&&Ie==="final"&&!ue&&K)){const j=S,re=R;if(!N||N.width!==j||N.height!==re||N.format!==U.format){const we=N;N=e.createTexture({label:"Render complete image",size:{width:j,height:re},format:U.format,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.COPY_SRC}),we&&e.queue.onSubmittedWorkDone().catch(()=>{}).then(()=>we.destroy())}C.copyTextureToTexture({texture:U},{texture:N},{width:j,height:re}),K=Ie==="final"&&ue}const G=C.finish();e.queue.submit([G]),z&&O?.resolve()}function Va(){f&&(f=!1,qt(e.createCommandEncoder(),!1,!0))}function Af(C,U){if(Oe(),t.isCompilingShader())return y=!0,v=0,!0;t.setCamera(C),m=C;const O=y;if(O&&d.reset(),O&&(f=!1,_e=0,ue=!1,B++,w=void 0,t.setCamera(C),(tt||pt).reset(),y=!1,v=0),t.updatePipeline(),t.isCompilingShader()||!t.isPipelineReady())return y=!0,v=0,!0;if(_?.aovs?.length&&!t.prepareAovs(_.aovs))return!0;(!Be||y)&&ja(),P&&((tt||pt).reset(),P=!1),p===0&&O&&tt&&I&&tA?.resultBuffer.mapState==="unmapped"&&((tt||pt).reset(),P=!0,tt.needsUpdatePredicting(),I=!1);const z=v,G=E?.estimatedFullFrameTimeMs,j=p===0&&o,re=Math.min(de,l);if(j&&!O&&!P&&G!==void 0&&n.available(re)<Math.min(G,re))return!1;const we=j&&v>0&&!O&&!P&&E?.tileCount===1&&G!==void 0&&G<=re/2,Ue=we?Math.min(64,Math.floor(n.available(re)/G)):1;if(we&&Ue===0)return!1;const Re=performance.now();of(!O);const Ne=U,st=Math.min(Ne,v+(p>0?p:Ue));do{let{xIndex:Ut,yIndex:De,columns:ot,rows:Ke,isFirstTile:Bt,isLastTile:Et,samplesPerFrame:Qt}=(tt||pt).nextTile(w);if(Dt.setSampleTileGrid(ot,Ke),(p>0||we)&&ot*Ke===1?Qt=st-v:o||(Qt=1),ot*Ke===1){t.setSampleTiles(1,1,0,0);let Jt=0;for(;Jt<Qt&&v<Ne&&v<st&&(Hn(v===0,[1,1]),v++,Jt++,j&&!P&&G!==void 0&&n.track(G),!(we&&performance.now()-Re>=4)););}else t.setSampleTiles(ot,Ke,Ut,De),Hn(v===0&&Bt,[ot,Ke]),j&&!P&&G!==void 0&&n.track(G/(ot*Ke)),Et&&v++}while(p>0&&v<st&&v<Ne);if(P)return v=0,!1;if(v!==z&&_?.aovs?.length&&t.renderAovs(d,C,v,_.aovSamples??16,_.aovs),v!==z&&j&&c&&v<Ne)f=!0;else if(v!==z&&(!h||v>=Ne)){f=!1;const Ut=e.createCommandEncoder();qt(Ut,v>=Ne,!0)}return v!==z&&s(v,z===0,g),!1}function Yn(C,U){return Math.ceil(C/U)*U}function af(){if(!L||!H)return;t.useTarget(J);const C=1,U=Yn(Math.max(1,Math.round(L*C)),16),O=Yn(Math.max(1,Math.round(H*C)),16);if(U===S&&O===R){t.setSize(U,O,L/H);return}Oe(),ja(),B++,S=U,R=O,(tt||pt).setSize(S,R),t.setSize(S,R,L/H),Dt.setSize(S,R),Me.setSize(S,R),Ct.setSize(S,R),Tt?.setSize(S,R),F=0,v=0,F=0,y=!0}function Vn(C,U){C===L&&U===H||(L=C,H=U,Ri(),af(),aA.setSize(L,H),y=!0)}function rf(C){const U=Array.isArray(C)&&C[3]>=.99999?C:void 0;Z=U?[U[0],U[1],U[2],1]:[0,0,0,0]}function nf(C){const U=C.exposure??1,O={agx:0,aces:1,cineon:2,reinhard:3,linear:4}[C.toneMapping??"agx"]??0,z=C.contrast??1,G=C.saturation??1,j=C.temperature??0,re=C.tint??0,we=C.vignette??0;return U===ye&&O===ne&&z===Qe&&G===Je&&j===se&&re===et&&we===Se?!1:(Ya(),ye=U,ne=O,Qe=z,Je=G,se=j,et=re,Se=we,Me.setUniform("exposure",ye),Me.setUniform("toneMappingParams",[ne,Se]),Me.setUniform("colorGradingParams",[Qe,Je,se,et]),!0)}function sf(C){if(C===oe)return!1;Ya(),oe=C;const U=be;be=C&&A.supportsHDR;const O=be?"rgba16float":"rgba8unorm";return O!==mi&&(mi=O,Me.setOutputParams({color:{format:mi},denoiseColor:{format:"rgba32float"},denoiseAlbedo:{format:"rgba8unorm"}})),U!==be&&Wa?.reset(),Ct.setOutputParams({color:{format:mi}}),Me.setUniform("hdrOutputEnabled",be?1:0),U!==be}function of(C){const U=performance.now(),O=B,z=pt;(typeof requestAnimationFrame=="function"?requestAnimationFrame:j=>setTimeout(()=>j(performance.now()),0))(()=>{g=Math.max(performance.now()-U-vt,vt>0?16:8),vt=0,O===B&&z===pt&&!y&&(w=C?g:void 0)})}function qn(){typeof document<"u"&&document.hidden?ce=performance.now():vt=performance.now()-ce}function lf(C){const U=q;Y??=a.get("jnlm",()=>new Mm(e));const O=t.getOutputBuffer(),z=e.createCommandEncoder({label:"JNLM denoise"});b?.push("Denoise:DisplayLinear");const G=Y.encode(z,{width:S,height:R,accumulation:O.shadowCatcher,normalAccumulation:O.normal,color:Me.getOutput("denoiseColor"),albedo:$e("albedo"),normal:$e("normal"),shadowCatcher:$e("shadowCatcher"),strength:C.strength,shape:C.shape});return fe=Ui(z,{data:G,width:S,height:R},fe),ke=!0,ue=!0,Ct.setUniform("denoisedAlpha",+t.needsDenoiseAlpha()),qt(z),e.queue.onSubmittedWorkDone().then(()=>U===q)}function cf(C,U,O,z=[]){const G=q,j=D=new AbortController,re=()=>j.abort();O?.addEventListener("abort",re,{once:!0}),O?.aborted&&re();const we=(async()=>{if(j.signal.aborted)return!1;const Ue=Li("Custom HDR input",$e("color"),!0),Re=S,Ne=R,st=Li("Custom albedo",$e("albedo"),!0),Ut=Li("Custom normal",$e("normal"),!0),De=a.get("Custom output",()=>new vr(e)).get(Re*Ne*16,!0),ot=z.length?d.snapshot(z):void 0;b?.push("Denoise:SceneLinear");try{await C.denoise({device:e,width:Re,height:Ne,color:Ue,albedo:st,normal:Ut,output:De,aovs:ot},{signal:j.signal,schedule:U})}finally{ot&&e.queue.onSubmittedWorkDone().catch(()=>{}).then(()=>d.releaseSnapshot(ot))}if(j.signal.aborted||T||G!==q)return!1;const Ke=a.get("custom coverage",()=>new cA("Custom coverage",e,{inputs:["filtered","original"],outputs:["color"],uniforms:iA,csMain:ih}));Ke.setOutputParams({color:{channels:4}}),Ke.setSize(Re,Ne),Ke.setUniform("imageSize",[Re,Ne]);const Bt=e.createCommandEncoder({label:"Custom HDR result"});return Ke.createPass(Bt,{filtered:{buffer:De,channels:4},original:{buffer:Ue,channels:4}}),fe=Ui(Bt,{data:Ke.getOutput("color"),width:Re,height:Ne},fe),xe=!0,ke=!1,ue=!0,qt(Bt),await e.queue.onSubmittedWorkDone(),!j.signal.aborted&&!T&&G===q})();return r.add(we),we.finally(()=>{r.delete(we),O?.removeEventListener("abort",re),D===j&&(D=void 0)}).catch(()=>{}),we}function ff(C,U,O="converged",z){if(Oe(),y||v<1)return Promise.resolve(!1);if(Ie!=="final"&&Ie!=="shadow")return Promise.resolve(!0);if(Va(),C.kind==="custom")return cf(C.denoiser,O,z,C.aovs);if(xe=!1,C.kind==="jnlm")return lf(C.denoiser);const G=C.denoiser;Ct.setUniform("denoisedAlpha",0);const j=q,re={width:S,height:R},we=e.createCommandEncoder(),Ue=Wn(we,"OIDN color input",Me.getOutput("denoiseColor"));e.queue.submit([we.finish()]);for(const De of[LA,AA,OA])De.setSize(S,R),De.setUniform("imageSize",[S,R]);const Re={...O!=="converged"?{tileOverlap:80,wholeImage:O==="every-sample"}:{},scheduling:O==="every-sample"?"event-loop":"animation-frame"};async function Ne(){const De=G.auxiliaryDenoisers;if(!De)return{albedo:{data:Li("OIDN raw albedo",Me.getOutput("denoiseAlbedo")),...re},normal:{data:Li("OIDN raw normal",$e("normal")),...re}};if(j!==q)return;const ot=e.createCommandEncoder();LA.createPass(ot,{albedo:{texture:Me.getOutput("denoiseAlbedo"),channels:4}}),e.queue.submit([ot.finish()]);let Ke;if(await Ye(j,(Jt,gi)=>De.albedo.tileExecute({...Re,color:{data:LA.getOutput("albedo"),...re},done(Ai){Ke=Ai,Jt()},error:gi})),j!==q||!Ke)return;const Bt=e.createCommandEncoder();AA.setUniform("preserveSurfaceTexture",0),AA.createPass(Bt,{albedo:{buffer:Ke.data,channels:4},rawAlbedo:{texture:Me.getOutput("denoiseAlbedo"),channels:4},rawNormal:{texture:$e("normal"),channels:4}}),e.queue.submit([Bt.finish()]);let Et;if(await Ye(j,(Jt,gi)=>De.normal.tileExecute({...Re,color:{data:Li("OIDN raw normal",$e("normal")),...re},done(Ai){Et=Ai,Jt()},error:gi})),j!==q||!Et)return;const Qt=e.createCommandEncoder();return OA.createPass(Qt,{normal:{buffer:Et.data,channels:4}}),e.queue.submit([Qt.finish()]),{albedo:{data:AA.getOutput("albedo"),...re},normal:{data:OA.getOutput("normal"),...re}}}function st(De){return j!==q?Promise.resolve():(b?.push("Denoise:DisplayLinear"),Ye(j,(ot,Ke)=>G.tileExecute({...Re,color:{data:Ue,...re},albedo:De.albedo,normal:De.normal,progress(Bt,Et,Qt,Jt,gi){if(j!==q||O!=="converged"&&Jt+1<gi)return;const Ai=e.createCommandEncoder();fe=Ui(Ai,Bt,fe),ke=!0,ue=!0,qt(Ai,!1)},done(Bt){if(j===q){const Et=e.createCommandEncoder();fe=Ui(Et,Bt,fe),ke=!0,ue=!0,qt(Et,!1)}ot()},error:Ke})))}function Ut(){if(!U||j!==q)return Promise.resolve();const De=e.createCommandEncoder();Rt.setSize(S,R),Rt.createPass(De,{inputTex:ke?Ct.getOutput("color"):Me.getOutput("color")});const ot=Wn(De,"OIDN alpha input",Rt.getOutput("color"));return e.queue.submit([De.finish()]),Ye(j,(Ke,Bt)=>U.tileExecute({...Re,color:{data:ot,...re},denoiseAlpha:!0,progress(Et,Qt,Jt,gi,Ai){if(j!==q||O!=="converged"&&gi+1<Ai)return;const Jn=e.createCommandEncoder();fe=Ui(Jn,Et,fe),ke=!1,ue=!0,qt(Jn,!1)},done(Et){if(j===q){const Qt=e.createCommandEncoder();fe=Ui(Qt,Et,fe),ke=!1,ue=!0,qt(Qt,!1)}Ke()},error:Bt}))}return Ne().then(async De=>{De&&j===q&&await st(De)}).then(()=>{if(j===q&&t.needsDenoiseAlpha())return Ut()}).then(()=>j===q)}typeof document<"u"&&document.addEventListener("visibilitychange",qn);function uf(){T||(typeof document<"u"&&document.removeEventListener("visibilitychange",qn),T=!0,B++,Oe(),Promise.all([e.queue.onSubmittedWorkDone().catch(()=>{}),x]).then(()=>{t.releaseTarget(J),d.dispose(),fe?.destroy(),N?.destroy(),ge.dispose(),Dt.dispose()}))}function df(){t.useTarget(J),S&&R&&t.setSize(S,R,L/H),_&&(t.setQuality(_),t.setClamping(_.clamping),t.setTransmissiveOutputAlphaMin(_.transmissiveOutputAlphaMin),t.setBevelSamples(_.bevelSamples),t.setAlphaBlendStrategy(_.alphaBlendStrategy),t.setSamplingPattern(_.samplingPattern,_.maxSamples))}return{invalidateTiming:Ri,invalidateDenoisedOutput(){Oe(),ue=!1,Be=!1},configure(C){if((!_||["bounces","bevel","bevelSamples","directLightCandidates","dispersionWavelengths","alphaBlendStrategy","samplingPattern","clamping","transmissiveOutputAlphaMin"].some(j=>_[j]!==C[j]))&&Ri(),C.aovs?.length&&(!Number.isInteger(C.aovSamples??16)||(C.aovSamples??16)<1))throw new RangeError("aovSamples must be a positive integer");const O=ht(_?.aovs??[]),z=ht(C.aovs??[]);(O!==z||_?.aovSamples!==C.aovSamples)&&(d.samples=0),_={...C,aovs:[...C.aovs??[]]};const G=Wt(Ie);G&&!C.aovs?.includes(G)&&(Ie="final"),O&&!z&&(d.dispose(),d.history.clear(),d.width=d.height=0,d.reset()),de=Math.max(1,C.timeBudgetMs),o=C.batchSamples,pt.setDesiredMsPerTile(de),pt.setMaxTiles(C.maxTiles),tt?.setDesiredMsPerTile(de),tt?.setMaxTiles(C.maxTiles)},synchronizeBackground:rf,activate:df,canCompleteSampleWithin(C){return(E?.estimatedFullFrameTimeMs??g)<=C},setRealtimeBatchBudget(C){l=C},setRealtimeDeferPostProcess(C){c=C},getRealtimeSampleTime(){return E?.tileCount===1?E.estimatedFullFrameTimeMs:void 0},whenTraceAvailable(){return n.whenAvailable()},get presentationComplete(){return!!N},get presentationDenoised(){return K},present(){if(!N)return;A.configure(be);const C=e.createCommandEncoder();aA.setSize(i.width,i.height),Xc(C,ge.output??N),e.queue.submit([C.finish()])},getMemory(){return{width:S,height:R,bytes:d.bytes+t.getTargetMemoryBytes(J)+Dt.getMemoryBytes()+TA(N)+ge.getMemoryBytes()+(fe?.size??0)}},isFirstFrame(){return y},restartSamples(){d.reset(),B++,Oe(),Be=!1,ue=!1,K=!1,F=0,f=!1,_e=0,(tt||pt).reset(),P=!1,y=!0,v=0},getOutputTexture(C){return Va(),C==="hdr"?F>0?$e("color"):void 0:ge.output??N},applyPostProcesses(C,U){N&&ge.run(N,C,U)},trace:Af,drawPostProcess(){const C=f;f=!1,qt(e.createCommandEncoder(),!0,C)},performDenoise:ff,cancelDenoise:Oe,setSize:Vn,setHDROutputEnabled:sf,setToneMappingParams:nf,async readPresentation(){if(!N)throw new Error("Render has no complete image.");const C=ge.output??N,U=C.width,O=C.height,z=Math.ceil(U*16/256)*256,G=e.createBuffer({size:z*O,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ}),j=e.createCommandEncoder(),re=be&&Wt(Ie)?a.get("AOV encoded readback",()=>new Pt("AOV encoded readback",e,{textureWillBeRead:!0,inputs:["inputTex"],outputs:["color"],fsMain:"let c=load_inputTex(uv,0);let rgb=select(1.055*pow(max(c.rgb,vec3f(0.0)),vec3f(1.0/2.4))-0.055,12.92*c.rgb,c.rgb<=vec3f(0.0031308));output.color=vec4f(rgb,c.a);"})):Rt;re.setOutputParams({color:{format:"rgba32float"}}),re.setSize(U,O),re.createPass(j,{inputTex:C}),j.copyTextureToBuffer({texture:re.getOutput("color")},{buffer:G,bytesPerRow:z},{width:U,height:O}),e.queue.submit([j.finish()]);try{await G.mapAsync(GPUMapMode.READ);const we=new Float32Array(G.getMappedRange()),Ue=new Float32Array(U*O*4);for(let Re=0;Re<O;Re++)Ue.set(we.subarray(Re*z/4,Re*z/4+U*4),Re*U*4);return{width:U,height:O,data:Ue}}finally{G.unmap(),G.destroy()}},aovReady(C){return!!_?.aovs?.includes(C)&&d.samples>0},getAovSamples(){return d.samples},restartAovs(){d.reset()},refineAovs(C,U=v){return U<1||!_?.aovs?.length?!0:(t.setCamera(C),m=C,t.updatePipeline(),t.isCompilingShader()||!t.isPipelineReady()?!1:t.renderAovs(d,C,U,_.aovSamples??16,_.aovs))},async readAov(C){if(!_?.aovs?.includes(C)||!m||v<1&&d.samples<1)throw new Error("AOV output is not ready");for(t.setCamera(m);!t.renderAovs(d,m,Math.max(v,d.samples),_.aovSamples??16,_.aovs);){if(T)throw new Error("AOV compilation was interrupted");await new Promise(U=>Xi(()=>U()))}return d.read(C)},async readOutput(C){Va(),UA.setUniform("flatBackgroundColor",ie);const U=S,O=R,z=Math.ceil(U*16/256)*256,G=e.createBuffer({size:z*O,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ}),j=e.createCommandEncoder(),re=C==="denoised"&&ue?fe:void 0;C==="denoised"&&!re&&(C="hdr");const we=C==="hdr"?UA:Rt;we.setOutputParams({color:{format:"rgba32float"}}),we.setSize(U,O),re?j.copyBufferToBuffer(re,0,G,0,U*O*16):C==="hdr"?UA.createPass(j,{colorTex:$e("color"),coverageTex:$e("albedo")}):Rt.createPass(j,{inputTex:$e(C)}),re||j.copyTextureToBuffer({texture:we.getOutput("color")},{buffer:G,bytesPerRow:z},{width:U,height:O,depthOrArrayLayers:1}),e.queue.submit([j.finish()]);try{await G.mapAsync(GPUMapMode.READ);const Ue=new Float32Array(G.getMappedRange()),Re=new Float32Array(U*O*4),Ne=re?U*4:z/4;for(let st=0;st<O;st++)Re.set(Ue.subarray(st*Ne,st*Ne+U*4),st*U*4);return{data:Re,width:U,height:O}}finally{G.unmap(),G.destroy()}},setPreserveDenoisedOutput(C){Be=C},setOfflineRenderOptions(C){const U=p>0;p=Math.max(0,Math.round(C.samplesPerBatch)),h=C.deferPostProcess,u=Math.max(0,Math.round(C.sampleSequenceOffset)),p>0&&P&&((tt||pt).reset(),P=!1),p>0?I=!1:U&&Ri()},setVarianceMoments(C){t.setVarianceMoments(C)},setAdaptiveSamplingTargets(C){t.setAdaptiveSamplingTargets(C)},prepareOfflineAdaptiveSampling(C){return t.prepareOfflineAdaptiveSampling(C)},getTotalSamplesRendered(){return v},_displayParity(){return{record(C){b=C},load(C){Oe(),ja(),Vn(C.width,C.height),t.useTarget(J),t.setSize(S,R,L/H);const U=t.getOutputBuffer(),O=new Float32Array(C.width*C.height*12);for(let G=0;G<C.width*C.height;G++)O.set(C.shadow.subarray(G*8,G*8+8),G*12),O.set(C.moments.subarray(G*4,G*4+4),G*12+8);for(const[G,j]of[[U.color,C.color],[U.albedo,C.albedo],[U.normal,C.normal],[U.shadowCatcher,O]])e.queue.writeBuffer(G,0,j);v=F=C.samples,V=C.catcher,y=!1,f=!1,_e=0,Dt.setSampleCount(v),Dt.setSampleTileGrid(1,1);const z=e.createCommandEncoder();Dt.createPass(z,U,V),e.queue.submit([z.finish()])}}},getDiagnostics(){return{...t.getDiagnostics(),hdrPresentation:{requested:oe,active:A.hdr,peakDisplayValue:A.hdr?Wa?.getPeakDisplayValue():void 0},gpuTraceTiming:E}},async flushDiagnostics(){await e.queue.onSubmittedWorkDone(),await x},setBloomParams({intensity:C,threshold:U,radius:O}){const z=U!==W||C!==Ee||O!==le;return z&&Ya(),W=U,Ee=C,le=O,z},setShadowCatcherParams(C,U){const O=C[0]!==ve[0]||C[1]!==ve[1]||C[2]!==ve[2]||U!==Pe;return O&&(Fo(ve,C),Pe=U,Me.setUniform("shadowCatcherColor",C),Me.setUniform("shadowCatcherAlpha",U)),O},setOnSampleRendered(C){s=C},setAovDisplayOptions(C){je={...C,depthRange:[...C.depthRange]}},setOutput(C){return Ie===C?!1:(Ie=C,!0)},dispose:uf}}function Rm(i,e,t={}){const A=new Xp(e,t.materialTextures),a=new rh(e.queue),r=new Set,n=new ac(o=>{Promise.resolve().then(()=>Promise.allSettled([...r])).then(()=>e.queue.onSubmittedWorkDone()).catch(()=>{}).then(o)}),s=n.get("canvas",()=>new Ah(i,e,t.presentationFormat??navigator.gpu.getPreferredCanvasFormat()));return rc(A,()=>Tm(i,e,A,s,n,r,a),!1,n)}const Um=new ut({name:"AOV display",outputs:["color"],uniforms:{geometry:M.uniform("sampler2D"),position:M.uniform("sampler2D"),diffuse:M.uniform("sampler2D"),specular:M.uniform("sampler2D"),identity:M.uniform("usampler2D"),motion:M.uniform("sampler2D"),kind:M.uniform("int"),samples:M.uniform("float"),mapping:M.uniform("vec4"),idComponent:M.uniform("int")},main:`
uint vn(uint v) {
v = (v ^ (v >> 16u)) * 0x7feb352du;
v = (v ^ (v >> 15u)) * 0x846ca68bu;
return v ^ (v >> 16u);
}
vec3 srgb(vec3 rgb) {
return mix(1.055 * pow(max(rgb, vec3(0.0)), vec3(1.0 / 2.4)) - 0.055,
12.92 * rgb, lessThanEqual(rgb, vec3(0.0031308)));
}
void main() {
ivec2 p = ivec2(gl_FragCoord.xy);
vec4 point = texelFetch(position, p, 0), g = texelFetch(geometry, p, 0);
float inv = 1.0 / max(point.w, 1.0), alpha = point.w / max(samples, 1.0);
vec3 color = vec3(0.0);
if (kind == 0) {
color = vec3(clamp((g.x * inv - mapping.x) / (mapping.y - mapping.x), 0.0, 1.0));
} else if (kind == 1) {
color = clamp(point.xyz * inv / mapping.z * .5 + .5, 0.0, 1.0);
} else if (kind == 2) {
color = clamp(g.yzw * inv, 0.0, 1.0);
} else if (kind == 3 || kind == 4) {
vec4 r = kind == 3 ? texelFetch(diffuse, p, 0) : texelFetch(specular, p, 0);
alpha = r.w / max(samples, 1.0);
color = srgb(clamp(r.xyz / max(r.w, 1.0), 0.0, 1.0));
} else if (kind == 5) {
uvec4 ids = texelFetch(identity, p, 0);
alpha = ids.x == 0xffffffffu ? 0.0 : 1.0;
uint h = vn(ids[idComponent]);
color = .2 + .8 * vec3(float(h & 255u), float((h >> 8u) & 255u),
float((h >> 16u) & 255u)) / 255.0;
} else {
vec4 m = texelFetch(motion, p, 0);
alpha = m.w == 3.0 ? 1.0 : 0.0;
float gR = length(m.xy), hue = 0.0;
if (gR > 0.0) hue = fract(atan(m.y, m.x) / 6.28318530718 + 1.0);
vec3 v = abs(fract(vec3(hue) + vec3(0.0, 2.0 / 3.0, 1.0 / 3.0)) * 6.0 - 3.0);
color = clamp(v - 1.0, 0.0, 1.0) * clamp(gR / mapping.w, 0.0, 1.0);
}
if (alpha <= 0.0) color = vec3(0.0);
out_color = vec4(color, clamp(alpha, 0.0, 1.0));
}`});class nt{_renderer;_bindings;_sourceShader;_outputs;_frameBuffer=new ra;_outputTextures={};_targetOutputs=new Map;useTarget(e){let t=this._targetOutputs.get(e);t||this._targetOutputs.set(e,t={}),this._outputTextures=t}_outputParams={};_reserveCapacity=!1;_capacityWidth=1;_capacityHeight=1;_width=1;_height=1;_renderToScreen=!1;constructor(e,t,A){this._renderer=t,this._sourceShader=A.shader,this._bindings=new ms(this._samplingShader(A.shader)),this._outputs=A.outputs||A.shader.outputs,this.setOutputParams(Object.fromEntries(this._outputs.map(a=>[a,A.outputParams?.[a]||{}])))}reserveCapacity(){this._reserveCapacity||(this._reserveCapacity=!0,this._bindings=new ms(this._samplingShader(this._sourceShader,!0,this._bindings.uniforms,this._bindings.defines)))}_samplingShader(e,t=!1,A=e.uniforms,a=e.defines){const r=Object.keys(e.uniforms).filter(s=>e.uniforms[s].type==="sampler2D");if(A={...A},t)for(const s of r)A[`${s}RegionSize`]={type:"ivec2",value:[1,1]};const n=new ut({name:e.name,outputs:e.outputs,outputTypes:e.outputTypes,defines:a,uniforms:A,includes:[{defines:{},uniforms:{},main:"",functions:[()=>sh(r,t),...e.functions]}],main:e.main});return n.parallelCompile=e.parallelCompile,n}setSize(e,t){this._width===e&&this._height===t||(this._width=Math.max(1,e),this._height=Math.max(1,t),this._capacityWidth=Math.max(this._capacityWidth,this._width),this._capacityHeight=Math.max(this._capacityHeight,this._height),this.setUniform("viewportSize",[this._width,this._height]))}setOutputs(e){for(const t of this._outputs)e.includes(t)||(this._outputTextures[t]?.dispose(this._renderer.gl),delete this._outputTextures[t]);this._outputs.splice(0,this._outputs.length,...e)}setOutputParams(e){this._outputParams=e}setRenderToScreen(e=!0){this._renderToScreen=e}setUniform(e,t){return this._bindings.set(e,t)}setUniforms(e){this._bindings.setUniforms(e)}getUniform(e){return this._bindings.get(e)}setDefines(e){let t=!1;for(const[A,a]of Object.entries(e)){const r=this._bindings.defines[A];a?r!==a&&(this._bindings.setDefine(A,a),t=!0):A in this._bindings.defines&&(this._bindings.deleteDefine(A),t=!0)}return t}_retainedOutputs=new Set;retainOutput(e){Object.values(this._outputTextures).includes(e)&&this._retainedOutputs.add(e)}releaseOutput(e){this._retainedOutputs.delete(e)&&(Object.values(this._outputTextures).includes(e)||e.dispose(this._renderer.gl))}loadDiagnosticOutputs(e){for(const t of Object.keys(e))this._outputTextures[t]?.dispose(this._renderer.gl),this._outputTextures[t]=e[t]}getOutput(e){return this._outputTextures[e]}_prepareOutputs(e){const t=this._renderer.gl;for(const A of this._outputs){const a=e?.[A],r=this._outputTextures[A],n=r&&this._retainedOutputs.has(r)&&(r.width!==this._width||r.height!==this._height),s=a||(n?new Te(this._outputParams[A]):void 0)||this._outputTextures[A]||new Te(this._outputParams[A]);s.ensureStorage(t,this._reserveCapacity?this._capacityWidth:this._width,this._reserveCapacity?this._capacityHeight:this._height,this._outputParams[A]),this._outputTextures[A]=s,Tn(s,this._width,this._height)}}isProgramReady(e){return e&&this._bindings.setUniforms(e),this._renderer.isProgramCompiled(this._bindings.getProgram(this._renderer))}createPass(e,t,A={}){const a=this._renderer,r=a.gl;this._renderToScreen?r.bindFramebuffer(r.FRAMEBUFFER,null):(this._prepareOutputs(t),this._frameBuffer.bind(a,this._outputs.map(s=>this._outputTextures[s])));const n=A.viewport||{x:0,y:0,width:this._width,height:this._height};if(a.setViewport(n.x,n.y,n.width,n.height),A.clear&&(r.disable(r.SCISSOR_TEST),r.clearColor(0,0,0,0),r.clear(r.COLOR_BUFFER_BIT)),A.scissor?(r.enable(r.SCISSOR_TEST),r.scissor(A.scissor.x,A.scissor.y,A.scissor.width,A.scissor.height)):r.disable(r.SCISSOR_TEST),this._reserveCapacity)for(const[s,o]of Object.entries(e)){const l=Ac(o);this.setUniform(`${s}RegionSize`,[l.width,l.height])}return this._bindings.setUniforms(e),this._bindings.bind(a)?(r.disable(r.DEPTH_TEST),A.blend?(r.enable(r.BLEND),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ONE)):r.disable(r.BLEND),r.drawArrays(r.TRIANGLES,0,3),r.disable(r.SCISSOR_TEST),!0):(r.disable(r.SCISSOR_TEST),!1)}releaseTarget(e){const t=this._targetOutputs.get(e);if(t){this._targetOutputs.delete(e);for(const A of Object.values(t))A.dispose(this._renderer.gl);t===this._outputTextures&&(this._outputTextures={})}}getMemoryBytes(e){const t=e?this._targetOutputs.get(e)??{}:this._outputTextures;return Array.from(new Set([...Object.values(t),...this._retainedOutputs])).reduce((A,a)=>A+a.getMemoryBytes(),0)}dispose(){const e=this._renderer.gl;Array.from(new Set([this._outputTextures,...this._targetOutputs.values()])).flatMap(t=>Object.values(t)).forEach(t=>t.dispose(e)),this._retainedOutputs.forEach(t=>t.dispose(e)),this._retainedOutputs.clear(),this._frameBuffer.dispose(this._renderer)}}async function Lm(i,e,t,A){const a=i.createBuffer();if(!a)throw new Error("Unable to allocate depth readback buffer.");let r=null;const n=new Float32Array(e*t*4),s=i.getParameter(i.PIXEL_PACK_BUFFER_BINDING);try{if(i.bindBuffer(i.PIXEL_PACK_BUFFER,a),i.bufferData(i.PIXEL_PACK_BUFFER,n.byteLength,i.STREAM_READ),i.readPixels(0,0,e,t,i.RGBA,i.FLOAT,0),i.bindBuffer(i.PIXEL_PACK_BUFFER,s),r=i.fenceSync(i.SYNC_GPU_COMMANDS_COMPLETE,0),!r)throw new Error("Unable to create depth readback fence.");i.flush();const o=performance.now();return await new Promise((l,c)=>{let f;const p=d=>{clearTimeout(f),A.removeEventListener("abort",h),d?c(d):l()},h=()=>p(new Error("Depth query cancelled.")),u=()=>{if(A.aborted){h();return}const d=i.clientWaitSync(r,0,0);d===i.WAIT_FAILED||i.isContextLost()?p(new Error("Depth readback failed.")):d===i.ALREADY_SIGNALED||d===i.CONDITION_SATISFIED?p():performance.now()-o>5e3?p(new Error("Depth readback timed out.")):f=setTimeout(u,16)};A.addEventListener("abort",h,{once:!0}),f=setTimeout(u,0)}),i.bindBuffer(i.PIXEL_PACK_BUFFER,a),i.getBufferSubData(i.PIXEL_PACK_BUFFER,0,n),n}finally{i.bindBuffer(i.PIXEL_PACK_BUFFER,s),r&&i.deleteSync(r),i.deleteBuffer(a)}}function ba(i,e,t,A){const a=A?new Uint8Array(e*t*4):new Float32Array(e*t*4);i.readPixels(0,0,e,t,i.RGBA,A?i.UNSIGNED_BYTE:i.FLOAT,a);const r=new Float32Array(a.length);for(let n=0;n<t;n++)for(let s=0;s<e*4;s++)r[n*e*4+s]=a[(t-n-1)*e*4+s]/(A?255:1);return r}const Om=["geometry","position","diffuse","specular"];class Fm{renderer;displayPass;history=new Go;width=0;height=0;samples=0;centerReady=!1;frame;accumulation=[];previousCenter;center;scene=new Te({type:5125,minFilter:9728,magFilter:9728});constructor(e){this.renderer=e}reset(){if(this.centerReady){const e=this.previousCenter;this.previousCenter=this.center,this.center=e}this.samples=0,this.centerReady=!1,this.frame=void 0}resize(e,t){if(e===this.width&&t===this.height)return;this.dispose(),this.history.clear(),this.reset(),this.width=e,this.height=t;const A={width:e,height:t,type:5126,minFilter:9728,magFilter:9728};for(let a=0;a<2;a++)this.accumulation.push(Object.fromEntries(Om.map(r=>[r,new Te(A)])));this.previousCenter={id:new Te({...A,type:5125}),motion:new Te(A)},this.center={id:new Te({...A,type:5125}),motion:new Te(A)}}setScene(e){const t=Math.min(1024,Math.max(1,Math.ceil(e.length/4))),A=Math.ceil(e.length/(t*4)),a=new Uint32Array(t*A*4);a.set(e),this.scene.source={data:a,width:t,height:A}}visualize(e,t){if(!this.samples||!this.center)throw new Error("AOV output is not ready");wn(t),this.displayPass??=new nt("AOV display",this.renderer,{shader:Um,outputs:["color"]});const A=this.displayPass;return A.setSize(this.width,this.height),A.setUniforms({kind:eA.indexOf(e),samples:this.samples,mapping:[...t.depthRange,t.positionScale,t.motionScale],idComponent:Bn.indexOf(t.idComponent)}),A.createPass({...this.accumulation[(this.samples-1)%2],identity:this.center.id,motion:this.center.motion}),A.getOutput("color")}async read(e){const t=this.renderer.gl,A=new ra,a=this.width,r=this.height;try{const n=this.accumulation[(this.samples-1)%2],s=e==="depth"||e==="roughness"?"geometry":e==="diffuseAlbedo"?"diffuse":e==="specularAlbedo"?"specular":"position";if(A.bind(this.renderer,[e==="id"?this.center.id:e==="motion"?this.center.motion:n[s]]),e==="id"){const c=new Uint32Array(a*r*4),f=new Uint32Array(c.length);t.readPixels(0,0,a,r,t.RGBA_INTEGER,t.UNSIGNED_INT,c);for(let p=0;p<r;p++)f.set(c.subarray((r-1-p)*a*4,(r-p)*a*4),p*a*4);return{width:a,height:r,data:f}}const o=ba(t,a,r,!1);if(e==="motion"){for(let c=2;c<o.length;c+=4)o[c]=0;return{width:a,height:r,data:o}}A.bind(this.renderer,[n.position]);const l=ba(t,a,r,!1);for(let c=0;c<a*r;c++){const f=c*4,p=l[f+3],h=p>0?1/p:0,u=p/Math.max(1,this.samples);if(e==="depth")o.set([o[f]*h,0,0,u],f);else if(e==="roughness")o.set([o[f+1]*h,o[f+2]*h,o[f+3]*h,u],f);else if(e==="position")o.set([o[f]*h,o[f+1]*h,o[f+2]*h,u],f);else{const d=o[f+3],m=d>0?1/d:0;o.set([o[f]*m,o[f+1]*m,o[f+2]*m,d/Math.max(1,this.samples)],f)}}return{width:a,height:r,data:o}}finally{A.dispose(this.renderer)}}get bytes(){return this.width*this.height*(192+(this.displayPass?4:0))+this.scene.width*this.scene.height*16}dispose(){this.displayPass?.dispose(),this.displayPass=void 0;const e=this.renderer.gl;for(const t of this.accumulation)for(const A of Object.values(t))A.dispose(e);this.accumulation.length=0,this.center?.id.dispose(e),this.center?.motion.dispose(e),this.center=void 0,this.previousCenter?.id.dispose(e),this.previousCenter?.motion.dispose(e),this.previousCenter=void 0,this.scene.dispose(e)}}class zm{renderer;readFrameBuffer=new ra;drawFrameBuffer=new ra;constructor(e){this.renderer=e}copy(e,t,A,a){a??=new Te({type:e.storageType});const r=this.renderer.gl;a.ensureStorage(r,t,A,{type:e.storageType}),this.readFrameBuffer.bind(this.renderer,[e],r.READ_FRAMEBUFFER),this.drawFrameBuffer.bind(this.renderer,[a],r.DRAW_FRAMEBUFFER),(e.width<t||e.height<A)&&(r.disable(r.SCISSOR_TEST),r.clearColor(0,0,0,0),r.clear(r.COLOR_BUFFER_BIT));const n=Math.min(t,e.width),s=Math.min(A,e.height);return r.blitFramebuffer(0,0,n,s,0,0,n,s,r.COLOR_BUFFER_BIT,r.NEAREST),a}dispose(){this.readFrameBuffer.dispose(this.renderer),this.drawFrameBuffer.dispose(this.renderer)}}const Wc=he`
const int OPENPBR_LOBE_FUZZ = 0;
const int OPENPBR_LOBE_COAT = 1;
const int OPENPBR_LOBE_METAL = 2;
const int OPENPBR_LOBE_SPECULAR = 3;
const int OPENPBR_LOBE_TRANSMISSION = 4;
const int OPENPBR_LOBE_DIFFUSE = 5;
const int OPENPBR_LOBE_SUBSURFACE = 6;
const int OPENPBR_LOBE_COUNT = 7;

struct bq {
vec3 tangent;
vec3 bitangent;
vec3 normal;
};

struct ag {
OpenPbrResolvedMaterial material;
bq basis;
bq coatBasis;
bool directionFrames;
#ifdef USE_COAT_NORMAL_FRAMES
vec3 coatViewLocal;
#endif
vec3 viewLocal;
vec3 diffuseColor;
float specularEtaTOverEtaI;
float refractionEtaTOverEtaI;
float transmissionReflectionIor;
float thinFilmExteriorIor;
float thinFilmBaseIor;
float specularAlpha;
float diffuseSpecularEnergyCompensation;
vec3 coatBaseScale;
vec3 metalMsScale;
float metalMsFactor;
float metalMsProbability;

vec3 dielectricMsReflectionScale;
vec3 dielectricMsTransmissionScale;
float dielectricMsViewLoss;
float dielectricMsReflectionRatio;
float dielectricMsProbability;

float weights[OPENPBR_LOBE_COUNT];
float probabilities[OPENPBR_LOBE_COUNT];
};

float aE(vec3 color) {
return dot(color, vec3(0.212671, 0.715160, 0.072169));
}

float dd(float bE) {
float value = (bE - 1.0) / (bE + 1.0);
return value * value;
}

float bi(
float bE,
float specularWeight
) {
float uh = min(
dd(bE) * specularWeight,
0.9999
);
float uj = sqrt(uh);
float lR = (1.0 + uj) / (1.0 - uj);
return bE < 1.0 ? 1.0 / lR : lR;
}

float af(float ci, float relativeIor) {
if (abs(relativeIor - 1.0) < 1e-6) {
return 0.0;
}
return cC(ci, relativeIor);
}

float aG(float ior) {
if (ior < 1.0) {
return 15.0 - ((1.0 / ior - 1.0) / 1.5) * 15.0;
}
return 16.0 + ((ior - 1.0) / 1.5) * 15.0;
}

float F(int tB, int row) {
return texelFetch(openPbrEnergyLut, ivec2(tB, row), 0).r;
}

float gt(
float dU,
float bV,
float im
) {
float bH = clamp(dU, 0.0, 31.0);
float aL = clamp(bV, 0.0, 31.0);
float bD = clamp(im, 0.0, 31.0);
int ef = int(floor(bH));
int aT = int(floor(aL));
int cQ = int(floor(bD));
int hU = min(ef + 1, 31);
int cu = min(aT + 1, 31);
int fb = min(cQ + 1, 31);
float cv = bH - float(ef);
float cI = aL - float(aT);
float lj = bD - float(cQ);

float wb = F(cQ, ef * 32 + aT);
float wc = F(fb, ef * 32 + aT);
float wd = F(cQ, ef * 32 + cu);
float wf = F(fb, ef * 32 + cu);
float wg = F(cQ, hU * 32 + aT);
float wh = F(fb, hU * 32 + aT);
float wi = F(cQ, hU * 32 + cu);
float wj = F(fb, hU * 32 + cu);
float v00 = mix(wb, wg, cv);
float v01 = mix(wc, wh, cv);
float v10 = mix(wd, wi, cv);
float v11 = mix(wf, wj, cv);
return mix(
mix(v00, v10, cI),
mix(v01, v11, cI),
lj
);
}

float gS(float dU, float bV) {
float bH = clamp(dU, 0.0, 31.0);
float aL = clamp(bV, 0.0, 31.0);
int ef = int(floor(bH));
int aT = int(floor(aL));
int hU = min(ef + 1, 31);
int cu = min(aT + 1, 31);
float cv = bH - float(ef);
float cI = aL - float(aT);
float v00 = F(aT, 1024 + ef);
float v01 = F(cu, 1024 + ef);
float v10 = F(aT, 1024 + hU);
float v11 = F(cu, 1024 + hU);
return mix(
mix(v00, v10, cv),
mix(v01, v11, cv),
cI
);
}



float ev(
float dU,
float bV,
float im
) {
float bH = clamp(dU, 0.0, 31.0);
float aL = clamp(bV, 0.0, 31.0);
float bD = clamp(im, 0.0, 31.0);
int ef = int(floor(bH));
int aT = int(floor(aL));
int cQ = int(floor(bD));
int hU = min(ef + 1, 31);
int cu = min(aT + 1, 31);
int fb = min(cQ + 1, 31);
float cv = bH - float(ef);
float cI = aL - float(aT);
float lj = bD - float(cQ);

float wb = F(cQ, ${dt} + ef * 32 + aT);
float wc = F(fb, ${dt} + ef * 32 + aT);
float wd = F(cQ, ${dt} + ef * 32 + cu);
float wf = F(fb, ${dt} + ef * 32 + cu);
float wg = F(cQ, ${dt} + hU * 32 + aT);
float wh = F(fb, ${dt} + hU * 32 + aT);
float wi = F(cQ, ${dt} + hU * 32 + cu);
float wj = F(fb, ${dt} + hU * 32 + cu);
float v00 = mix(wb, wg, cv);
float v01 = mix(wc, wh, cv);
float v10 = mix(wd, wi, cv);
float v11 = mix(wf, wj, cv);
return mix(
mix(v00, v10, cI),
mix(v01, v11, cI),
lj
);
}

float eu(float dU, float bV) {
float bH = clamp(dU, 0.0, 31.0);
float aL = clamp(bV, 0.0, 31.0);
int ef = int(floor(bH));
int aT = int(floor(aL));
int hU = min(ef + 1, 31);
int cu = min(aT + 1, 31);
float cv = bH - float(ef);
float cI = aL - float(aT);
float v00 = F(aT, ${Ht} + ef);
float v01 = F(cu, ${Ht} + ef);
float v10 = F(aT, ${Ht} + hU);
float v11 = F(cu, ${Ht} + hU);
return mix(
mix(v00, v10, cv),
mix(v01, v11, cv),
cI
);
}

float eR(float dU, float bV) {
float bH = clamp(dU, 0.0, 31.0);
float aL = clamp(bV, 0.0, 31.0);
int ef = int(floor(bH));
int aT = int(floor(aL));
int hU = min(ef + 1, 31);
int cu = min(aT + 1, 31);
float cv = bH - float(ef);
float cI = aL - float(aT);
float v00 = F(aT, ${ei} + ef);
float v01 = F(cu, ${ei} + ef);
float v10 = F(aT, ${ei} + hU);
float v11 = F(cu, ${ei} + hU);
return mix(
mix(v00, v10, cv),
mix(v01, v11, cv),
cI
);
}

float bb(float ior, float alpha, float cosine) {
return ev(aG(ior), sqrt(alpha) * 31.0, cosine * 31.0);
}
float bf(float ior, float alpha) {
return eu(aG(ior), sqrt(alpha) * 31.0);
}
float ck(float ior, float alpha) {
return eR(aG(ior), sqrt(alpha) * 31.0);
}


float aV(float alpha, float cosine) {
float iF = clamp(sqrt(alpha) * 31.0, 0.0, 31.0);
float bD = clamp(cosine * 31.0, 0.0, 31.0);
int r0 = int(floor(iF));
int c0 = int(floor(bD));
int r1 = min(r0 + 1, 31);
int c1 = min(c0 + 1, 31);
return mix(
mix(F(c0, ${ni} + r0), F(c1, ${ni} + r0), fract(bD)),
mix(F(c0, ${ni} + r1), F(c1, ${ni} + r1), fract(bD)),
fract(iF));
}

float cD(float alpha) {
float index = clamp(sqrt(alpha) * 31.0, 0.0, 31.0);
int i0 = int(floor(index));
return mix(F(i0, ${Zi}),
F(min(i0 + 1, 31), ${Zi}), fract(index));
}

float bd(float value, float ior) {
if (ior > 2.5 || ior < 0.4) {
float vu = dd(2.5);
float progress = (dd(ior) - vu) / (1.0 - vu);
return (1.0 - progress) * value;
}
return value;
}

float aw(
float ior,
float alpha,
float cosine
) {
float value = gt(
aG(ior),
sqrt(alpha) * 31.0,
cosine * 31.0
);
return bd(value, ior);
}

float cA(float ior, float alpha) {
float value = gS(
aG(ior),
sqrt(alpha) * 31.0
);
return bd(value, ior);
}

vec3 openpbr_to_world(bq basis, vec3 direction) {
return direction.x * basis.tangent
+ direction.y * basis.bitangent
+ direction.z * basis.normal;
}

vec3 openpbr_to_local(bq basis, vec3 direction) {
return vec3(
dot(direction, basis.tangent),
dot(direction, basis.bitangent),
dot(direction, basis.normal)
);
}

bq fD(
vec3 aX,
vec3 normal,
float anisotropy
) {
bq basis;
basis.normal = normal;
basis.tangent = vec3(0.0);
#ifdef USE_TANGENT
basis.tangent = aX;
#endif
if (dot(basis.tangent, basis.tangent) < 0.001 || anisotropy <= 0.0) {
aP(normal, basis.tangent, basis.bitangent);
}
else {
basis.bitangent = normalize(cross(normal, basis.tangent));
basis.tangent = normalize(cross(basis.bitangent, normal));
}
return basis;
}

float kF(
float aB,
float am,
float J,
float ae
) {
return (aB * J - am * ae)
/ (aB * J + am * ae);
}

float kE(
float aB,
float am,
float J,
float ae
) {
return (am * J - aB * ae)
/ (aB * ae + am * J);
}

float ht(
float aB,
float am,
float J,
float ae
) {
return 2.0 * aB * J
/ (aB * J + am * ae);
}

float hs(
float aB,
float am,
float J,
float ae
) {
return 2.0 * aB * J
/ (aB * ae + am * J);
}

vec2 aY(vec2 a, vec2 b) {
return vec2(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
}

vec2 bj(vec2 a, vec2 b) {
float aq = max(dot(b, b), 1e-9);
return vec2(
(a.x * b.x + a.y * b.y) / aq,
(a.y * b.x - a.x * b.y) / aq
);
}

vec2 iA(vec2 value) {
float gR = length(value);
float uf = sqrt(max(0.0, 0.5 * (gR + value.x)));
float fw = sqrt(max(0.0, 0.5 * (gR - value.x)));
return vec2(uf, value.y >= 0.0 ? fw : -fw);
}

vec2 ce(
float J,
float aB,
vec2 am,
bool rM
) {
float pg = sqrt(max(0.0, 1.0 - J * J));
vec2 tP = bj(vec2(aB, 0.0), am);
vec2 hQ = tP * pg;
vec2 ae = iA(
vec2(1.0, 0.0) - aY(hQ, hQ)
);
if (aY(am, ae).y < 0.0) {
ae = -ae;
}

vec2 fZ = vec2(aB * J, 0.0);
vec2 eJ = aY(am, ae);
if (rM) {
vec2 cl = am * J;
vec2 cj = ae * aB;
return bj(
cl - cj,
cl + cj
);
}
return bj(
fZ - eJ,
fZ + eJ
);
}

float eE(
float iZ,
float ha,
float pw,
float nL,
vec2 kL,
float phase
) {
vec2 ol = vec2(cos(phase), sin(phase));
vec2 iD = aY(kL, ol);
vec2 lv = iD * (ha * nL);
vec2 aq = vec2(1.0, 0.0) - iD * pw;
vec2 hP = vec2(iZ, 0.0)
+ bj(lv, aq);
return dot(hP, hP);
}

float au(
float J,
float wavelength,
float ct,
float aR,
float cn,
vec2 eG
) {
J = clamp(abs(J), 1e-5, 1.0);
float hI = pow(aR / cn, 2.0)
* (1.0 - J * J);
if (hI >= 1.0) {
return 1.0;
}
float dc = sqrt(1.0 - hI);
float lL = kF(
aR, cn, J, dc
);
float lK = kE(
aR, cn, J, dc
);
float jG = ht(
aR, cn, J, dc
);
float jF = hs(
aR, cn, J, dc
);
float gG = cn * dc
/ max(aR * J, 1e-9);
vec2 ut = ce(
dc, cn, eG, false
);
vec2 us = ce(
dc, cn, eG, true
);
float phase = 2.0 * PI * (2.0 * cn * ct * dc) / wavelength;
float uZ = eE(
lL,
jG,
-lL,
jG * gG,
ut,
phase
);
float uY = eE(
lK,
jF,
-lK,
jF * gG,
us,
phase
);
return clamp(0.5 * (uZ + uY), 0.0, 1.0);
}

vec3 hW(
float J,
float ct,
float cn,
float eG,
float aR
) {
return vec3(
au(
J, 620.0, ct, aR, cn, vec2(eG, 0.0)
),
au(
J, 540.0, ct, aR, cn, vec2(eG, 0.0)
),
au(
J, 450.0, ct, aR, cn, vec2(eG, 0.0)
)
);
}



vec3 cw(float cosine, vec3 f0, vec3 tint) {
vec3 sr = mix(f0, vec3(1.0), aI(cosine));
if (all(equal(tint, vec3(1.0)))) { return sr; }
float dD = 1.0 / 7.0;
float mY = 1.0 - dD;
vec3 fX = mix(f0, vec3(1.0), aI(dD));
float dw = 1.0 - cosine;
float ru = cosine * aI(cosine) * dw
/ (dD * pow(mY, 6.0));
return clamp(sr - ru * (fX - tint * fX), vec3(0.0), vec3(1.0));
}

vec2 cX(float f0, float uN) {
float dY = clamp(f0, 0.0, 0.99);
float gZ = sqrt(dY);
float rK = (1.0 - dY) / (1.0 + dY);
float rH = (1.0 + gZ) / max(1.0 - gZ, 1e-9);
float ior = mix(rH, rK, clamp(uN, 0.0, 1.0));
float kp = (
(ior + 1.0) * (ior + 1.0) * dY
- (ior - 1.0) * (ior - 1.0)
) / max(1.0 - dY, 1e-9);
return vec2(ior, sqrt(max(kp, 0.0)));
}

vec3 jr(
float J,
float ct,
float cn,
vec3 sm,
vec3 kA,
float aR
) {
return vec3(
au(
J,
620.0,
ct,
aR,
cn,
cX(sm.r, kA.r)
),
au(
J,
540.0,
ct,
aR,
cn,
cX(sm.g, kA.g)
),
au(
J,
450.0,
ct,
aR,
cn,
cX(sm.b, kA.b)
)
);
}

float bS(float ct, float weight) {
return clamp(weight, 0.0, 1.0) * smoothstep(1e-9, 30.0, ct);
}

vec3 cc(
vec3 ey,
float J,
float ct,
float cn,
float eG,
float weight,
float aR
) {
vec3 qn = hW(
J,
ct,
cn,
eG,
aR
);
return mix(
ey,
qn,
bS(ct, weight)
);
}

vec3 lZ(
vec3 ey,
float J,
float ct,
float cn,
vec3 sm,
vec3 kA,
float weight,
float aR
) {
vec3 qn = jr(
J,
ct,
cn,
sm,
kA,
aR
);
return mix(
ey,
qn,
bS(ct, weight)
);
}

vec3 bJ(
OpenPbrResolvedMaterial material,
vec3 color,
vec3 viewLocal,
vec3 lightLocal,
float fJ,
out float pdf
) {
pdf = 0.0;
if (lightLocal.z <= 0.0) {
return vec3(0.0);
}

float roughness = material.diffuseRoughness;
float hl = 0.5 - 2.0 / (3.0 * PI);
float pc = 2.0 / 3.0 - 28.0 / (15.0 * PI);
float pp = lightLocal.z;
float nt = viewLocal.z;
float directional = dot(lightLocal, viewLocal) - pp * nt;
float hh = directional > 0.0
? directional / max(max(pp, nt), 1e-7)
: directional;
float iJ = 1.0 / (1.0 + hl * roughness);
vec3 ot = color * INVPI * iJ
* (1.0 + roughness * hh);

float dr = 1.0 - pp;
float outputComplement = 1.0 - nt;
float ph = dr * (
0.0571085289 + dr * (
0.491881867 + dr * (
-0.332181442 + dr * 0.0714429953
)
)
);
float outputGOverPi = outputComplement * (
0.0571085289 + outputComplement * (
0.491881867 + outputComplement * (
-0.332181442 + outputComplement * 0.0714429953
)
)
);
float qr = (1.0 + roughness * ph)
/ (1.0 + hl * roughness);
float outputAlbedo = (1.0 + roughness * outputGOverPi)
/ (1.0 + hl * roughness);
float gi = iJ * (1.0 + pc * roughness);
vec3 hV = color * color * gi
/ max(vec3(1e-7), vec3(1.0) - color * (1.0 - gi));
vec3 mn = hV * INVPI
* max(1e-7, 1.0 - outputAlbedo)
* max(1e-7, 1.0 - qr)
/ max(1e-7, 1.0 - gi);
pdf = lightLocal.z * INVPI;
return (ot + mn) * fJ;
}

float aU(float viewCosine, float roughness) {
float x = clamp(viewCosine, 0.0, 1.0);
float y = clamp(roughness, 0.01, 1.0);
float scale = y * (0.0206607 + 1.58491 * y)
/ (0.0379424 + y * (1.32227 + y));
float mean = y * (-0.193854 + y * (-1.14885 + y * (1.7932 - 0.95943 * y * y)))
/ (0.046391 + y);
float offset = y * (0.000654023 + (-0.0207818 + 0.119681 * y) * y)
/ (1.26264 + y * (-1.92021 + y));
float gaussian = exp(-0.5 * pow((x - mean) / scale, 2.0))
/ (scale * sqrt(2.0 * PI));
return max(gaussian + offset, 0.0);
}

vec3 kD(
OpenPbrResolvedMaterial material,
vec3 viewLocal,
vec3 lightLocal,
out float pdf
) {
pdf = 0.0;
if (viewLocal.z <= 0.0 || lightLocal.z <= 0.0) {
return vec3(0.0);
}
float albedo = aU(
viewLocal.z,
material.fuzzRoughness
);
pdf = lightLocal.z * INVPI;
return material.fuzzColor * albedo * INVPI;
}

vec3 ao(
OpenPbrResolvedMaterial material,
vec3 viewLocal,
vec3 lightLocal,
vec3 ad,
vec3 bG,
out float pdf
) {
pdf = 0.0;
if (lightLocal.z <= 0.0) {
return vec3(0.0);
}

vec2 alpha = vec2(material.alphaX, material.alphaY);
float distribution = cW(ad, alpha);
float kz = aF(viewLocal, alpha);
float ep = kz
* aF(lightLocal, alpha);

pdf = kz * distribution / (4.0 * max(viewLocal.z, 1e-8));
return bG * distribution * ep
/ (4.0 * max(lightLocal.z * viewLocal.z, 1e-8));
}

vec3 dE(
OpenPbrResolvedMaterial material,
float relativeIor,
vec3 tint,
vec3 viewLocal,
vec3 lightLocal,
vec3 ad,
vec3 bG,
out float pdf
) {
pdf = 0.0;
if (lightLocal.z >= 0.0) {
return vec3(0.0);
}

float ls = dot(lightLocal, ad);
float bm = dot(viewLocal, ad);


if (bm <= 0.0 || ls >= 0.0) {
return vec3(0.0);
}
vec2 alpha = vec2(material.alphaX, material.alphaY);
float distribution = cW(ad, alpha);
float kz = aF(viewLocal, alpha);
float ep = kz
* aF(lightLocal, alpha);
float aq = ls + bm * relativeIor;
aq *= aq;
float qw = abs(ls) / max(aq, 1e-8);
float jU = relativeIor * relativeIor;

pdf = kz * max(0.0, bm) * distribution * qw
/ max(viewLocal.z, 1e-8);
return tint * (vec3(1.0) - bG) * distribution * ep
* abs(bm) * qw * jU
/ max(abs(lightLocal.z * viewLocal.z), 1e-8);
}

vec3 bh(OpenPbrResolvedMaterial material) {
#ifdef HAS_MEDIUM
if (material.mediumType > 0) {
return vec3(1.0);
}
#endif
return material.transmissionColor;
}

float cZ(float ai) {
return 2.0 * ai / (1.0 + ai);
}

vec3 av(
vec3 ai,
float transmissionWeight
) {
vec3 gA = 2.0 * ai
/ (vec3(1.0) + ai);
return mix(
ai,
gA,
clamp(transmissionWeight, 0.0, 1.0)
);
}

vec3 bN(
OpenPbrResolvedMaterial material,
float J,
float bE
) {
vec3 tint = bh(material);
if (!material.thinWalled) {
return tint;
}
float jc = max(0.0, 1.0 - J * J);
float ea = jc
/ max(bE * bE, 1e-9);
if (ea >= 1.0) {
return vec3(0.0);
}
float ae = sqrt(1.0 - ea);
return pow(max(tint, vec3(0.0)), vec3(1.0 / max(ae, 1e-5)));
}

vec3 dX(
OpenPbrResolvedMaterial material,
vec3 viewLocal,
vec3 lightLocal,
out float pdf
) {
pdf = 0.0;
if (viewLocal.z <= 0.0 || lightLocal.z >= 0.0) {
return vec3(0.0);
}
float ae = -lightLocal.z;
float oY = cC(
viewLocal.z,
material.relativeIor
);
pdf = ae * INVPI;
return vec3(1.0 - oY) * INVPI;
}

void eg(inout ag prepared) {
float total = prepared.probabilities[OPENPBR_LOBE_FUZZ];
for (int jT = 1; jT < OPENPBR_LOBE_COUNT; jT++) {
total += prepared.probabilities[jT];
}
if (total <= 1e-8) {
for (int jT = 0; jT < OPENPBR_LOBE_COUNT; jT++) {
prepared.probabilities[jT] = 0.0;
}
return;
}
float pk = 1.0 / total;
for (int jT = 0; jT < OPENPBR_LOBE_COUNT; jT++) {
prepared.probabilities[jT] *= pk;
}
}



float bR(float eta) {
if (abs(eta - 1.0) < 1e-6) { return 0.0; }
if (eta > 1.0) { return (eta - 1.0) / (4.08567 + 1.00071 * eta); }
return 0.997118 + 0.1014 * eta - 0.965241 * eta * eta - 0.130607 * eta * eta * eta;
}

vec3 bU(vec3 f0, vec3 tint) {
float dD = 1.0 / 7.0;
vec3 fX = mix(f0, vec3(1.0), aI(dD));
vec3 b = fX * (vec3(1.0) - tint) / (dD * pow(1.0 - dD, 6.0));
return clamp(f0 + (vec3(1.0) - f0) / 21.0 - b / 126.0, vec3(0.0), vec3(1.0));
}



vec3 cN(OpenPbrResolvedMaterial material, float cosine) {
if (cosine <= 0.0) { return vec3(1.0); }
float mp = sqrt(max(0.0, 1.0 - (1.0 - cosine * cosine) / (material.coatIor * material.coatIor)));
vec3 uT = pow(max(material.coatColor, vec3(0.0)), vec3(0.5 / max(mp, 1e-5)));
return mix(vec3(1.0), uT, material.coatWeight);
}

float gF(OpenPbrResolvedMaterial material, float cosine) {
if (material.coatRoughness <= ROUGHNESS_MIN) {
return af(cosine, 1.0 / material.coatIor);
}


return clamp(1.0 - aw(material.coatIor,
material.coatRoughness * material.coatRoughness, cosine), 0.0, 1.0);
}

vec3 hr(ag prepared) {
OpenPbrResolvedMaterial material = prepared.material;
float dielectric = 1.0 - material.baseMetalness;
float opaque = dielectric * (1.0 - material.transmissionWeight) * (1.0 - material.subsurfaceWeight);
float sss = dielectric * (1.0 - material.transmissionWeight) * material.subsurfaceWeight;
float vI = dielectric * material.transmissionWeight;
float gd = bR(prepared.specularEtaTOverEtaI);
float lE = bR(1.0 / prepared.transmissionReflectionIor);
float qI = clamp(opaque * gd + (sss + vI) * lE + material.baseMetalness, 0.0, 1.0);
float jM = mix(1.0, material.specularRoughness, qI);
float ks = bR(material.coatIor);
float kr = 1.0 - (1.0 - ks) / (material.coatIor * material.coatIor);
float k = mix(ks, kr, jM);
vec3 eb = material.baseMetalness * material.specularWeight * bU(material.baseWeight * material.baseColor, material.specularColor)
+ opaque * mix(material.baseWeight * material.baseColor, vec3(1.0), gd)
+ sss * material.subsurfaceColor + vec3(vI);
vec3 rZ = vec3(1.0 - k) / max(vec3(1.0) - eb * k, vec3(1e-6));
return mix(vec3(1.0), rZ, material.coatWeight * material.coatDarkening);
}

vec3 cF(ag prepared, float lU) {
if (prepared.material.coatWeight <= 0.0) { return vec3(1.0); }
if (prepared.material.inside) {

return cN(prepared.material, -lU);
}

return prepared.coatBaseScale * cN(prepared.material, lU);
}


bq dM(bq fallback, vec3 tangent, vec3 bitangent, vec2 direction) {
vec3 t = tangent - fallback.normal * dot(fallback.normal, tangent);
if (dot(t, t) < 1e-8) { t = fallback.tangent; }
t = normalize(t);
vec3 b = cross(fallback.normal, t) * (dot(cross(fallback.normal, t), bitangent) < 0.0 ? -1.0 : 1.0);
t = t * direction.x + b * direction.y;
if (dot(t, t) < 1e-8) { return fallback; }
bq basis = fallback;
basis.tangent = normalize(t);
basis.bitangent = normalize(cross(basis.normal, basis.tangent));
basis.tangent = normalize(cross(basis.bitangent, basis.normal));
return basis;
}

ag ds(
vec3 tangent,
OpenPbrResolvedMaterial material,
vec3 bM,
vec3 normal
) {
ag prepared;
prepared.material = material;
prepared.basis = fD(
tangent,
normal,
max(material.specularAnisotropy, material.coatAnisotropy)
);
prepared.coatBasis = prepared.basis;
prepared.directionFrames = false;
#ifdef USE_COAT_NORMAL_FRAMES


if (material.coatNormalEnabled) {
prepared.coatBasis = fD(material.geometryTangent, material.coatNormal, material.coatAnisotropy);
prepared.directionFrames = true;
}
#endif
if (material.specularAnisotropy > 0.0 && material.anisotropyDirectionEnabled) {
prepared.basis = dM(prepared.basis, material.directionTangent, material.directionBitangent, material.anisotropyDirection);
prepared.directionFrames = true;
}
if (material.coatAnisotropy > 0.0 && material.coatAnisotropyRotation != 0.0) {
prepared.coatBasis = dM(prepared.coatBasis, material.geometryTangent, material.geometryBitangent, vec2(cos(material.coatAnisotropyRotation), sin(material.coatAnisotropyRotation)));
prepared.directionFrames = true;
}
prepared.viewLocal = openpbr_to_local(prepared.basis, bM);
#ifdef USE_COAT_NORMAL_FRAMES
prepared.coatViewLocal = openpbr_to_local(prepared.coatBasis, bM);
#endif
prepared.diffuseColor = material.baseColor;

float cK = 1.0 - material.baseMetalness;
float dW = cK
* (1.0 - material.transmissionWeight);
prepared.weights[OPENPBR_LOBE_FUZZ] = material.fuzzWeight;
prepared.weights[OPENPBR_LOBE_COAT] = material.coatWeight;
if (material.inside) { prepared.weights[OPENPBR_LOBE_COAT] = 0.0; }
prepared.weights[OPENPBR_LOBE_METAL] = material.baseMetalness;
prepared.weights[OPENPBR_LOBE_SPECULAR] = cK;
prepared.weights[OPENPBR_LOBE_TRANSMISSION] = cK
* material.transmissionWeight;
prepared.weights[OPENPBR_LOBE_DIFFUSE] = dW
* (1.0 - material.subsurfaceWeight) * material.baseWeight;
prepared.weights[OPENPBR_LOBE_SUBSURFACE] = dW
* material.subsurfaceWeight;

prepared.specularEtaTOverEtaI = bi(
1.0 / material.relativeIor,
material.specularWeight
);
prepared.material.relativeIor = 1.0 / prepared.specularEtaTOverEtaI;
prepared.refractionEtaTOverEtaI = prepared.specularEtaTOverEtaI;
prepared.transmissionReflectionIor = prepared.material.relativeIor;


if (material.coatWeight > 0.0) {
float cm = 1.0;
if (!material.inside) { cm = mix(1.0, material.coatIor, material.coatWeight); }
float bB = cm * bi(
material.specularIor / cm, material.specularWeight);
float eF = bB / cm;
if (cm > bB && bB >= 1.0) {
eF = 1.0 / eF;
}
prepared.specularEtaTOverEtaI = eF;
prepared.transmissionReflectionIor = 1.0 / eF;
prepared.refractionEtaTOverEtaI = bB;
if (material.inside) {
prepared.refractionEtaTOverEtaI = 1.0 / bB;
prepared.transmissionReflectionIor = bB;
}
prepared.material.relativeIor = 1.0 / prepared.refractionEtaTOverEtaI;
}



prepared.thinFilmExteriorIor = 1.0;
prepared.thinFilmBaseIor = prepared.specularEtaTOverEtaI;
if (material.coatWeight > 0.0) {
if (material.inside) {
prepared.thinFilmExteriorIor = 1.0 / prepared.refractionEtaTOverEtaI;
prepared.thinFilmBaseIor = 1.0;
}
else {
prepared.thinFilmExteriorIor = mix(1.0, material.coatIor, material.coatWeight);
prepared.thinFilmBaseIor = prepared.refractionEtaTOverEtaI;
}
}
prepared.specularAlpha = material.specularRoughness
* material.specularRoughness;
float viewCosine = abs(prepared.viewLocal.z);
float ai = af(
viewCosine,
1.0 / prepared.specularEtaTOverEtaI
);
vec3 fN = material.specularColor * (
material.thinWalled
? mix(
ai,
cZ(ai),
material.transmissionWeight
)
: ai
);
vec3 iv = material.specularWeight * cw(
viewCosine,
material.baseWeight * material.baseColor,
material.specularColor
);
float eZ = material.thinWalled
? cZ(af(viewCosine, prepared.transmissionReflectionIor))
: af(viewCosine, prepared.transmissionReflectionIor);
vec3 hb = bN(
material,
viewCosine,
prepared.refractionEtaTOverEtaI
);
float iM = aw(
prepared.specularEtaTOverEtaI,
prepared.specularAlpha,
viewCosine
);
float gH = cA(
prepared.specularEtaTOverEtaI,
prepared.specularAlpha
);
prepared.diffuseSpecularEnergyCompensation = iM
/ max(gH, 1e-12);

prepared.probabilities[OPENPBR_LOBE_FUZZ] = prepared.weights[OPENPBR_LOBE_FUZZ]
* aE(material.fuzzColor)
* max(aU(
viewCosine,
material.fuzzRoughness
), 0.02);
prepared.probabilities[OPENPBR_LOBE_COAT] = 0.0;
prepared.coatBaseScale = vec3(1.0);
if (material.coatWeight > 0.0 && !material.inside) {
#ifdef USE_COAT_NORMAL_FRAMES
float coatViewCosine = material.coatNormalEnabled ? max(prepared.coatViewLocal.z, 0.0) : viewCosine;
float lf = gF(material, coatViewCosine);
#else
float lf = gF(material, viewCosine);
#endif
prepared.probabilities[OPENPBR_LOBE_COAT] = prepared.weights[OPENPBR_LOBE_COAT] * lf;
prepared.coatBaseScale = cN(material,
#ifdef USE_COAT_NORMAL_FRAMES
coatViewCosine
#else
viewCosine
#endif
)
* (1.0 - prepared.weights[OPENPBR_LOBE_COAT] * lf) * hr(prepared);
}
prepared.probabilities[OPENPBR_LOBE_METAL] = prepared.weights[OPENPBR_LOBE_METAL]
* aE(iv);
prepared.metalMsScale = vec3(0.0);
prepared.metalMsFactor = 0.0;
prepared.metalMsProbability = 0.0;
if (material.specularRoughness >= 0.04 && prepared.weights[OPENPBR_LOBE_METAL] > 0.0) {
vec3 ig = bU(material.baseWeight * material.baseColor, material.specularColor);
prepared.metalMsScale = material.specularWeight * ig * ig;
float qO = aV(prepared.specularAlpha, viewCosine);
prepared.metalMsFactor = qO / max(cD(prepared.specularAlpha), 1e-12);
float fC = prepared.weights[OPENPBR_LOBE_METAL] * aE(prepared.metalMsScale) * qO;
prepared.probabilities[OPENPBR_LOBE_METAL] += fC;
prepared.metalMsProbability = fC / max(prepared.probabilities[OPENPBR_LOBE_METAL], 1e-12);
}
prepared.probabilities[OPENPBR_LOBE_SPECULAR] = prepared.weights[OPENPBR_LOBE_SPECULAR]
* aE(fN);
prepared.probabilities[OPENPBR_LOBE_TRANSMISSION] = prepared.weights[OPENPBR_LOBE_TRANSMISSION]
* (1.0 - eZ)
* aE(hb);






prepared.dielectricMsReflectionScale = vec3(0.0);
prepared.dielectricMsTransmissionScale = vec3(0.0);
prepared.dielectricMsViewLoss = 0.0;
prepared.dielectricMsReflectionRatio = 0.0;
prepared.dielectricMsProbability = 0.0;
if (!material.thinWalled && material.transmissionWeight > 0.0 &&
prepared.specularAlpha >= 0.0016 && prepared.weights[OPENPBR_LOBE_TRANSMISSION] > 0.0 &&
abs(prepared.refractionEtaTOverEtaI - 1.0) > 1e-6) {
float mo = prepared.weights[OPENPBR_LOBE_TRANSMISSION] + prepared.weights[OPENPBR_LOBE_SUBSURFACE];
prepared.dielectricMsReflectionScale = (material.inside ? vec3(1.0) : material.specularColor) * mo;
prepared.dielectricMsTransmissionScale = hb * prepared.weights[OPENPBR_LOBE_TRANSMISSION]
+ vec3(prepared.weights[OPENPBR_LOBE_SUBSURFACE]);
prepared.dielectricMsReflectionRatio = ck(prepared.refractionEtaTOverEtaI, prepared.specularAlpha);
prepared.dielectricMsViewLoss = bb(prepared.refractionEtaTOverEtaI, prepared.specularAlpha, viewCosine);
vec3 oR = mix(prepared.dielectricMsTransmissionScale, prepared.dielectricMsReflectionScale, prepared.dielectricMsReflectionRatio);
float fC = aE(oR) * prepared.dielectricMsViewLoss;
prepared.probabilities[OPENPBR_LOBE_TRANSMISSION] += fC;
prepared.dielectricMsProbability = fC / max(prepared.probabilities[OPENPBR_LOBE_TRANSMISSION], 1e-12);
}
prepared.probabilities[OPENPBR_LOBE_DIFFUSE] = prepared.weights[OPENPBR_LOBE_DIFFUSE]
* aE(prepared.diffuseColor)
* prepared.diffuseSpecularEnergyCompensation;
prepared.probabilities[OPENPBR_LOBE_SUBSURFACE] = prepared.weights[OPENPBR_LOBE_SUBSURFACE]
* (1.0 - eZ)
* aE(material.subsurfaceColor)
* prepared.diffuseSpecularEnergyCompensation;


if (material.coatWeight > 0.0 && material.thinFilmWeight > 0.0) {
float lS = 0.02 * bS(material.thinFilmThickness, material.thinFilmWeight);
prepared.probabilities[OPENPBR_LOBE_SPECULAR] = max(prepared.probabilities[OPENPBR_LOBE_SPECULAR], prepared.weights[OPENPBR_LOBE_SPECULAR] * lS);
prepared.probabilities[OPENPBR_LOBE_METAL] = max(prepared.probabilities[OPENPBR_LOBE_METAL], prepared.weights[OPENPBR_LOBE_METAL] * material.specularWeight * lS);
}
if (material.coatWeight > 0.0 && !material.inside) {
float gI = max(max(prepared.coatBaseScale.x, prepared.coatBaseScale.y), prepared.coatBaseScale.z);
prepared.probabilities[OPENPBR_LOBE_METAL] *= gI;
prepared.probabilities[OPENPBR_LOBE_SPECULAR] *= gI;
prepared.probabilities[OPENPBR_LOBE_TRANSMISSION] *= gI;
prepared.probabilities[OPENPBR_LOBE_DIFFUSE] *= gI;
prepared.probabilities[OPENPBR_LOBE_SUBSURFACE] *= gI;
}
eg(prepared);
return prepared;
}

float cY(ag prepared, float cosine, bool reflection) {
if (prepared.material.coatWeight <= 0.0) {
return af(cosine, prepared.material.relativeIor);
}
float kU = af(cosine, prepared.transmissionReflectionIor);
if (!reflection) { return kU; }
float oj = af(cosine, 1.0 / prepared.specularEtaTOverEtaI);
float sQ = prepared.material.transmissionWeight + (1.0 - prepared.material.transmissionWeight) * prepared.material.subsurfaceWeight;
return mix(oj, kU, sQ);
}

vec3 bO(
ag prepared,
vec3 lightDirection,
out float pdf
) {
OpenPbrResolvedMaterial material = prepared.material;
vec3 viewLocal = prepared.viewLocal;
vec3 lightLocal = openpbr_to_local(prepared.basis, lightDirection);
bool reflection = lightLocal.z * viewLocal.z > 0.0;
#ifdef USE_COAT_NORMAL_FRAMES
bool independentCoat = material.coatNormalEnabled;
bool geometricReflection = dot(material.geometricNormal, lightDirection) > 0.0;
float coatLightCosine = dot(prepared.coatBasis.normal, lightDirection);
bool coatReflection = geometricReflection && prepared.coatViewLocal.z > 0.0 && coatLightCosine > 0.0;
#endif

vec3 ad;
if (reflection) {
ad = normalize(lightLocal + viewLocal);
}
else {
ad = normalize(lightLocal + viewLocal * material.relativeIor);
}
if (ad.z < 0.0) {
ad = -ad;
}

vec3 response = vec3(0.0);
pdf = 0.0;
float aM = 0.0;
float bm = abs(dot(viewLocal, ad));
float diffuseSpecularEnergyCompensation =
prepared.diffuseSpecularEnergyCompensation
* aw(
prepared.specularEtaTOverEtaI,
prepared.specularAlpha,
abs(lightLocal.z)
);

#ifdef USE_COAT_NORMAL_FRAMES
if (!independentCoat || (lightLocal.z != 0.0 && reflection == geometricReflection)) {
#endif
if (reflection) {
if (prepared.weights[OPENPBR_LOBE_DIFFUSE] > 0.0) {
response += prepared.weights[OPENPBR_LOBE_DIFFUSE] * bJ(
material,
prepared.diffuseColor,
viewLocal,
lightLocal,
diffuseSpecularEnergyCompensation,
aM
);
pdf += prepared.probabilities[OPENPBR_LOBE_DIFFUSE] * aM;
}

if (prepared.weights[OPENPBR_LOBE_SUBSURFACE] > 0.0 && material.thinWalled) {
response += 0.5 * prepared.weights[OPENPBR_LOBE_SUBSURFACE] * bJ(
material,
material.subsurfaceColor,
viewLocal,
lightLocal,
diffuseSpecularEnergyCompensation,
aM
);
pdf += prepared.probabilities[OPENPBR_LOBE_SUBSURFACE] * 0.5 * aM;
}

if (prepared.weights[OPENPBR_LOBE_SPECULAR] > 0.0) {
vec3 cB = vec3(cY(prepared, bm, true));
if (material.thinFilmWeight > 0.0) {
cB = cc(
cB,
bm,
material.thinFilmThickness,
material.thinFilmIor,
prepared.thinFilmBaseIor,
material.thinFilmWeight,
prepared.thinFilmExteriorIor
);
}
if (material.thinWalled) {
cB = av(
cB,
material.transmissionWeight
);
}
vec3 bG = material.specularColor * cB;
response += prepared.weights[OPENPBR_LOBE_SPECULAR] * ao(
material,
viewLocal,
lightLocal,
ad,
bG,
aM
);
pdf += prepared.probabilities[OPENPBR_LOBE_SPECULAR] * aM;
}

if (prepared.weights[OPENPBR_LOBE_METAL] > 0.0) {
vec3 bG = cw(
bm,
material.baseWeight * material.baseColor,
material.specularColor
);
if (material.thinFilmWeight > 0.0) {
bG = lZ(
bG,
bm,
material.thinFilmThickness,
material.thinFilmIor,
material.baseWeight * material.baseColor,
material.specularColor,
material.thinFilmWeight,
prepared.thinFilmExteriorIor
);
}
bG *= material.specularWeight;
response += prepared.weights[OPENPBR_LOBE_METAL] * ao(
material,
viewLocal,
lightLocal,
ad,
bG,
aM
);
if (prepared.metalMsFactor > 0.0) {
float cL = min(prepared.metalMsFactor * aV(prepared.specularAlpha, lightLocal.z), 1.0 / max(lightLocal.z, 1e-8));
response += prepared.weights[OPENPBR_LOBE_METAL] * prepared.metalMsScale * cL * INVPI;
aM = mix(aM, 0.5 * INVPI, prepared.metalMsProbability);
}
pdf += prepared.probabilities[OPENPBR_LOBE_METAL] * aM;
}
}
else {
vec3 bG = vec3(cY(prepared, bm, false));
if (material.thinFilmWeight > 0.0) {
bG = cc(
bG,
bm,
material.thinFilmThickness,
material.thinFilmIor,
prepared.thinFilmBaseIor,
material.thinFilmWeight,
prepared.thinFilmExteriorIor
);
}
if (prepared.weights[OPENPBR_LOBE_TRANSMISSION] > 0.0) {
if (material.thinWalled) {
vec3 lI = vec3(lightLocal.xy, -lightLocal.z);
vec3 du = normalize(lI + viewLocal);
if (du.z < 0.0) {
du = -du;
}
float oM = abs(dot(viewLocal, du));
vec3 mv = vec3(cY(prepared, oM, false));
if (material.thinFilmWeight > 0.0) {
mv = cc(
mv,
oM,
material.thinFilmThickness,
material.thinFilmIor,
prepared.thinFilmBaseIor,
material.thinFilmWeight,
prepared.thinFilmExteriorIor
);
}
vec3 gA = av(
mv,
1.0
);
vec3 tint = bN(
material,
abs(viewLocal.z),
prepared.refractionEtaTOverEtaI
);
response += prepared.weights[OPENPBR_LOBE_TRANSMISSION]
* ao(
material,
viewLocal,
lI,
du,
tint * (vec3(1.0) - gA),
aM
);
}
else {
response += prepared.weights[OPENPBR_LOBE_TRANSMISSION]
* dE(
material,
material.relativeIor,
bh(material),
viewLocal,
lightLocal,
ad,
bG,
aM
);
}
if (prepared.dielectricMsProbability > 0.0) {
aM *= 1.0 - prepared.dielectricMsProbability;
}
pdf += prepared.probabilities[OPENPBR_LOBE_TRANSMISSION] * aM;
}
if (prepared.weights[OPENPBR_LOBE_SUBSURFACE] > 0.0) {
if (material.thinWalled) {
vec3 pb = vec3(lightLocal.xy, -lightLocal.z);
response += 0.5 * prepared.weights[OPENPBR_LOBE_SUBSURFACE]
* bJ(
material,
material.subsurfaceColor,
viewLocal,
pb,
diffuseSpecularEnergyCompensation,
aM
);
aM *= 0.5;
}
else {
response += prepared.weights[OPENPBR_LOBE_SUBSURFACE] * dX(
material,
viewLocal,
lightLocal,
aM
);
}
pdf += prepared.probabilities[OPENPBR_LOBE_SUBSURFACE] * aM;
}
}




if (prepared.dielectricMsProbability > 0.0) {
float cosine = abs(lightLocal.z);
if (cosine > 0.0) {
float ior = (reflection ? prepared.refractionEtaTOverEtaI : 1.0 / prepared.refractionEtaTOverEtaI);
float ju = (reflection ? prepared.dielectricMsReflectionRatio : 1.0 - prepared.dielectricMsReflectionRatio);
float oZ = prepared.dielectricMsViewLoss * bb(ior, prepared.specularAlpha, cosine)
/ max(bf(ior, prepared.specularAlpha), 1e-12);
float cL = min(oZ * ju, 1.0 / cosine);
vec3 scale = (reflection ? prepared.dielectricMsReflectionScale : prepared.dielectricMsTransmissionScale);
response += scale * cL * INVPI;
pdf += prepared.probabilities[OPENPBR_LOBE_TRANSMISSION] * prepared.dielectricMsProbability * ju * 0.5 * INVPI;
}
}

#ifdef USE_COAT_NORMAL_FRAMES
} 
#endif
if (material.coatWeight > 0.0) {
response *= cF(prepared,
#ifdef USE_COAT_NORMAL_FRAMES
independentCoat ? coatLightCosine : lightLocal.z
#else
lightLocal.z
#endif
);
}
#ifdef USE_COAT_NORMAL_FRAMES
if (independentCoat) { response *= abs(lightLocal.z); }
#endif

if (
#ifdef USE_COAT_NORMAL_FRAMES
(independentCoat ? coatReflection : reflection)
#else
reflection
#endif
&& prepared.weights[OPENPBR_LOBE_COAT] > 0.0) {
vec3 dT = viewLocal;
vec3 lh = lightLocal;
vec3 gL = ad;
float kk = bm;
if (prepared.directionFrames) {
dT = openpbr_to_local(prepared.coatBasis, openpbr_to_world(prepared.basis, viewLocal));
#ifdef USE_COAT_NORMAL_FRAMES
if (independentCoat) { dT = prepared.coatViewLocal; }
#endif
lh = openpbr_to_local(prepared.coatBasis, lightDirection);
gL = normalize(lh + dT);
if (gL.z < 0.0) { gL = -gL; }
kk = abs(dot(dT, gL));
}

vec3 lQ = vec3(af(
kk,
1.0 / material.coatIor
));
OpenPbrResolvedMaterial dS = material;
vec2 jX = aN(material.coatRoughness, material.coatAnisotropy);
dS.alphaX = jX.x;
dS.alphaY = jX.y;
response += prepared.weights[OPENPBR_LOBE_COAT]
#ifdef USE_COAT_NORMAL_FRAMES
* (independentCoat ? max(coatLightCosine, 0.0) : 1.0)
#endif
* ao(
dS,
dT,
lh,
gL,
lQ,
aM
);
pdf += prepared.probabilities[OPENPBR_LOBE_COAT] * aM;
}

if (
#ifdef USE_COAT_NORMAL_FRAMES
(independentCoat ? geometricReflection : reflection)
#else
reflection
#endif
&& prepared.weights[OPENPBR_LOBE_FUZZ] > 0.0) {
float rC = aU(
abs(viewLocal.z),
material.fuzzRoughness
);
response *= max(
vec3(0.0),
vec3(1.0 - prepared.weights[OPENPBR_LOBE_FUZZ] * rC)
);
response += prepared.weights[OPENPBR_LOBE_FUZZ]
#ifdef USE_COAT_NORMAL_FRAMES
* (independentCoat ? max(lightLocal.z, 0.0) : 1.0)
#endif
* kD(
material,
viewLocal,
lightLocal,
aM
);
pdf += prepared.probabilities[OPENPBR_LOBE_FUZZ] * aM;
}

#ifdef USE_COAT_NORMAL_FRAMES
if (independentCoat) { return response; }
#endif
return response * abs(lightLocal.z);
}

vec3 sp(
vec3 tangent,
OpenPbrResolvedMaterial material,
vec3 bM,
vec3 normal,
vec3 lightDirection,
out float pdf
) {
ag prepared = ds(
tangent,
material,
bM,
normal
);
return bO(prepared, lightDirection, pdf);
}

float xN(
vec3 tangent,
OpenPbrResolvedMaterial material,
vec3 bM,
vec3 normal,
vec3 lightDirection
) {
float pdf;
sp(
tangent,
material,
bM,
normal,
lightDirection,
pdf
);
return pdf;
}

vec3 eN(
ag prepared,
vec3 cq,
out vec3 lightDirection,
out float pdf,
out bool isTransmissionEvent
) {
OpenPbrResolvedMaterial material = prepared.material;
vec3 viewLocal = prepared.viewLocal;
float cH = cq.x;
float fL = cq.y;
float bv = cq.z;
pdf = 0.0;
isTransmissionEvent = false;
lightDirection = prepared.basis.normal;



if (!prepared.material.thinWalled &&
abs(prepared.material.relativeIor - 1.0) <= 1e-6 &&
prepared.probabilities[OPENPBR_LOBE_TRANSMISSION] >= 1.0 - 1e-6) {
lightDirection = openpbr_to_world(prepared.basis, -viewLocal);
pdf = 1.0;
isTransmissionEvent = true;
return (bh(prepared.material) * cF(prepared,
#ifdef USE_COAT_NORMAL_FRAMES
prepared.material.coatNormalEnabled ? dot(prepared.coatBasis.normal, lightDirection) : -prepared.viewLocal.z
#else
-prepared.viewLocal.z
#endif
));
}

float cdf[OPENPBR_LOBE_COUNT];
cdf[OPENPBR_LOBE_FUZZ] = prepared.probabilities[OPENPBR_LOBE_FUZZ];
for (int jT = 1; jT < OPENPBR_LOBE_COUNT; jT++) {
cdf[jT] = cdf[jT - 1] + prepared.probabilities[jT];
}
if (cdf[OPENPBR_LOBE_SUBSURFACE] <= 0.0) {
return vec3(0.0);
}

vec3 lightLocal;
if (bv < cdf[OPENPBR_LOBE_FUZZ] || (
bv >= cdf[OPENPBR_LOBE_TRANSMISSION] && bv < cdf[OPENPBR_LOBE_DIFFUSE]
)) {
lightLocal = aO(vec2(cH, fL));
}
else if (bv < cdf[OPENPBR_LOBE_COAT]) {
vec3 dT = viewLocal;
if (prepared.directionFrames) { dT = openpbr_to_local(prepared.coatBasis, openpbr_to_world(prepared.basis, viewLocal)); }
#ifdef USE_COAT_NORMAL_FRAMES
if (material.coatNormalEnabled) { dT = prepared.coatViewLocal; }
#endif
vec3 ad = aD(
dT,

aN(material.coatRoughness, material.coatAnisotropy),
vec2(cH, fL)
);
if (ad.z < 0.0) {
ad = -ad;
}
lightLocal = normalize(reflect(-dT, ad));
#ifdef USE_COAT_NORMAL_FRAMES
if (material.coatNormalEnabled) {
lightDirection = openpbr_to_world(prepared.coatBasis, lightLocal);
if (lightLocal.z <= 0.0 || dot(material.geometricNormal, lightDirection) <= 0.0) { return vec3(0.0); }
return bO(prepared, lightDirection, pdf);
}
#endif
if (prepared.directionFrames) { lightLocal = openpbr_to_local(prepared.basis, openpbr_to_world(prepared.coatBasis, lightLocal)); }
}
else if (bv < cdf[OPENPBR_LOBE_SPECULAR]) {
bool uP = bv < cdf[OPENPBR_LOBE_METAL];
float sN = (bv - cdf[OPENPBR_LOBE_COAT]) / max(prepared.probabilities[OPENPBR_LOBE_METAL], 1e-12);
if (uP && sN < prepared.metalMsProbability) {
float z = cH;
float ex = sqrt(max(0.0, 1.0 - z * z));
float azimuth = TWOPI * fL;
lightLocal = vec3(ex * cos(azimuth), ex * sin(azimuth), z);
}
else {
vec3 ad = aD(
viewLocal,
vec2(material.alphaX, material.alphaY),
vec2(cH, fL)
);
if (ad.z < 0.0) {
ad = -ad;
}
lightLocal = normalize(reflect(-viewLocal, ad));
}
}
else if (bv < cdf[OPENPBR_LOBE_TRANSMISSION]) {
isTransmissionEvent = true;


float vS = (bv - cdf[OPENPBR_LOBE_SPECULAR]) / max(prepared.probabilities[OPENPBR_LOBE_TRANSMISSION], 1e-12);
if (prepared.dielectricMsProbability > 0.0 && vS < prepared.dielectricMsProbability) {
float ju = prepared.dielectricMsReflectionRatio;
bool mJ = cH < ju;
float z;
if (mJ) { z = min(cH / ju, 0.99999994); }
else { z = -min((cH - ju) / (1.0 - ju), 0.99999994); }
float ex = sqrt(max(0.0, 1.0 - z * z));
float azimuth = TWOPI * fL;
lightLocal = vec3(ex * cos(azimuth), ex * sin(azimuth), z);
isTransmissionEvent = !mJ;
}
else {
vec3 ad = aD(
viewLocal,
vec2(material.alphaX, material.alphaY),
vec2(cH, fL)
);
if (ad.z < 0.0) {
ad = -ad;
}
float bm = abs(dot(viewLocal, ad));
vec3 bG = vec3(af(
bm,
prepared.material.relativeIor
));
if (material.thinFilmWeight > 0.0) {
bG = cc(
bG,
bm,
material.thinFilmThickness,
material.thinFilmIor,
prepared.thinFilmBaseIor,
material.thinFilmWeight,
prepared.thinFilmExteriorIor
);
}
if (material.thinWalled) {
vec3 iC = normalize(reflect(-viewLocal, ad));
lightLocal = vec3(iC.xy, -iC.z);
}
else {
lightLocal = refract(
-viewLocal,
ad,
prepared.material.relativeIor
);
if (dot(lightLocal, lightLocal) <= 1e-8) {
isTransmissionEvent = false;
return vec3(0.0);
}
lightLocal = normalize(lightLocal);
}
}
}
else {
isTransmissionEvent = true;
if (material.thinWalled) {
float lq = cH;
bool qL = lq >= 0.5;
cH = qL
? (lq - 0.5) * 2.0
: lq * 2.0;
lightLocal = aO(vec2(cH, fL));
if (qL) {
lightLocal.z = -lightLocal.z;
}
else {
isTransmissionEvent = false;
}
}
else {
lightLocal = aO(vec2(cH, fL));
lightLocal.z = -lightLocal.z;
}
}

lightDirection = openpbr_to_world(prepared.basis, lightLocal);

if (lightLocal.z == 0.0 || (lightLocal.z < 0.0) != isTransmissionEvent) {
return vec3(0.0);
}
#ifdef USE_COAT_NORMAL_FRAMES
if (material.coatNormalEnabled &&
((dot(material.geometricNormal, lightDirection) <= 0.0) != isTransmissionEvent)) { return vec3(0.0); }
#endif
return bO(prepared, lightDirection, pdf);
}

vec3 tZ(
vec3 tangent,
OpenPbrResolvedMaterial material,
vec3 cq,
vec3 bM,
vec3 normal,
out vec3 lightDirection,
out float pdf,
out bool isTransmissionEvent
) {
ag prepared = ds(tangent, material, bM, normal);
return eN(prepared, cq, lightDirection, pdf, isTransmissionEvent);
}`,zn=he`




vec3 aD(vec3 view, vec2 alpha, vec2 samplePoint) {
vec3 sv = vec3(alpha, 1.0);
vec3 cr = normalize(sv * view);
float qP = min(cr.z, 1.0);
float kh = 1.0 + qP;
float kC = (1.0 - samplePoint.y) * kh;
float sU = samplePoint.y * kh;
float tY = kC + (1.0 - qP);
float ex = sqrt(max(0.0, tY * sU));
float azimuth = TWOPI * samplePoint.x;
vec3 mr = vec3(
cr.x + ex * cos(azimuth),
cr.y + ex * sin(azimuth),
kC
);
return normalize(sv * mr);
}

float cW(vec3 pf, vec2 alpha) {
vec3 hF = vec3(
pf.x / alpha.x,
pf.y / alpha.y,
pf.z
);
float aq = dot(hF, hF);
return 1.0 / (
PI * alpha.x * alpha.y * aq * aq
);
}

float aF(vec3 direction, vec2 alpha) {
float eQ = abs(direction.z);
if (eQ <= 1e-8) {
return 0.0;
}
vec2 iE = alpha * direction.xy;
float mt = dot(iE, iE)
/ (eQ * eQ);
return 2.0 / (1.0 + sqrt(1.0 + mt));
}

float aI(float cosine) {
float dw = clamp(1.0 - cosine, 0.0, 1.0);
return pow(dw, 5.0);
}

float cC(float J, float cR) {
float iS = clamp(abs(J), 0.0, 1.0);
float kQ = cR * cR
* max(0.0, 1.0 - iS * iS);
if (kQ >= 1.0) {
return 1.0;
}

float mD = sqrt(max(0.0, 1.0 - kQ));
float bk = (iS - cR * mD)
/ max(iS + cR * mD, 1e-8);
float qC = (cR * iS - mD)
/ max(cR * iS + mD, 1e-8);
return 0.5 * (
bk * bk + qC * qC
);
}

vec2 gy(vec2 samplePoint) {
vec2 offset = 2.0 * samplePoint - vec2(1.0);
if (offset.x == 0.0 && offset.y == 0.0) {
return vec2(0.0);
}

float radius;
float angle;
if (abs(offset.x) > abs(offset.y)) {
radius = offset.x;
angle = 0.25 * PI * (offset.y / offset.x);
}
else {
radius = offset.y;
angle = 0.5 * PI - 0.25 * PI * (offset.x / offset.y);
}
return radius * vec2(cos(angle), sin(angle));
}

vec3 aO(vec2 samplePoint) {
vec2 lk = gy(samplePoint);
return vec3(
lk,
sqrt(max(0.0, 1.0 - dot(lk, lk)))
);
}

float aK(float qo, float oJ) {
float scale = max(qo, oJ);
if (scale <= 0.0) {
return 0.0;
}
vec2 normalized = vec2(qo, oJ) / scale;
vec2 pL = normalized * normalized;
return pL.x / (pL.x + pL.y);
}

void aP(in vec3 normal, out vec3 tangent, out vec3 bitangent) {
float iI = normal.z >= 0.0 ? 1.0 : -1.0;
float cL = -1.0 / (iI + normal.z);
float xy = normal.x * normal.y * cL;
tangent = vec3(
1.0 + iI * normal.x * normal.x * cL,
iI * xy,
-iI * normal.x
);
bitangent = vec3(
xy,
iI + normal.y * normal.y * cL,
-normal.y
);
}

vec3 aj(vec3 rgb, float wavelength) {
if (wavelength == 0.0) {
return rgb;
}
vec3 vk = wavelength > 600.0
? vec3(1.0, 0.0, 0.0)
: wavelength > 500.0
? vec3(0.0, 1.0, 0.0)
: vec3(0.0, 0.0, 1.0);
return rgb * vk;
}

float ee(
float wavelength,
float hu,
float hD,
float rt
) {
if (wavelength == 0.0 || hD <= 0.0) {
return hu;
}

const float FRAUNHOFER_C = 656.3;
const float FRAUNHOFER_D = 587.6;
const float FRAUNHOFER_F = 486.1;
float kv = 1.0 / (
1.0 / (FRAUNHOFER_F * FRAUNHOFER_F)
- 1.0 / (FRAUNHOFER_C * FRAUNHOFER_C)
);
float oe = max(rt / hD, 1e-6);
float rV = (hu - 1.0) * kv / oe;
float uK = hu
- rV / (FRAUNHOFER_D * FRAUNHOFER_D);
return uK + rV / (wavelength * wavelength);
}

vec3 fH(
vec3 gO,
float anisotropy,
vec2 samplePoint
) {
float cosine;
if (abs(anisotropy) < 0.001) {
cosine = 1.0 - 2.0 * samplePoint.y;
}
else {
float ju = (1.0 - anisotropy * anisotropy)
/ (1.0 + anisotropy - 2.0 * anisotropy * samplePoint.y);
cosine = (
ju * ju - 1.0 - anisotropy * anisotropy
) / (2.0 * anisotropy);
}

float vF = sqrt(max(0.0, 1.0 - cosine * cosine));
float azimuth = TWOPI * samplePoint.x;
vec3 tangent;
vec3 bitangent;
aP(gO, tangent, bitangent);
return tangent * (vF * cos(azimuth))
+ bitangent * (vF * sin(azimuth))
+ gO * cosine;
}

float bL(float cosine, float anisotropy) {
float aq = 1.0 + anisotropy * anisotropy
+ 2.0 * anisotropy * cosine;
return INV4PI * (1.0 - anisotropy * anisotropy)
/ (aq * sqrt(aq));
}
`,km=`
const vec4 hp[128] = vec4[128](
vec4(-0.971247852, -0.202764958, 0.999698818, 0.0245412290),
vec4(-0.808660269, 0.547487736, 0.997290432, 0.0735645667),
vec4(-0.942509234, 0.187289074, 0.992479563, 0.122410677),
vec4(-0.763038993, -0.558020830, 0.985277653, 0.170961902),
vec4(-0.929654300, -0.00785388052, 0.975702107, 0.219101235),
vec4(-0.656618595, 0.740912974, 0.963776052, 0.266712785),
vec4(-0.817265987, 0.373183846, 0.949528158, 0.313681751),
vec4(-0.793490529, -0.386950523, 0.932992816, 0.359895051),
vec4(-0.860713601, -0.105764769, 0.914209723, 0.405241340),
vec4(-0.604139447, 0.619064212, 0.893224299, 0.449611336),
vec4(-0.787263036, 0.281084418, 0.870086968, 0.492898226),
vec4(-0.673318744, -0.468566477, 0.844853580, 0.534997642),
vec4(-0.799623907, 0.0901312605, 0.817584813, 0.575808227),
vec4(-0.570307195, -0.676738262, 0.788346410, 0.615231633),
vec4(-0.627450705, 0.452229142, 0.757208824, 0.653172851),
vec4(-0.698281944, -0.294418186, 0.724247098, 0.689540565),
vec4(-0.726036906, -0.153989345, 0.689540505, 0.724247098),
vec4(-0.523753047, 0.608020604, 0.653172791, 0.757208884),
vec4(-0.671607554, 0.233185455, 0.615231574, 0.788346410),
vec4(-0.491990626, -0.494420350, 0.575808167, 0.817584813),
vec4(-0.678437173, 0.0412081257, 0.534997642, 0.844853580),
vec4(-0.495611340, -0.807542920, 0.492898196, 0.870086968),
vec4(-0.508582473, 0.402262419, 0.449611306, 0.893224299),
vec4(-0.537693322, -0.333672792, 0.405241281, 0.914209783),
vec4(-0.614562631, -0.0568606183, 0.359894961, 0.932992816),
vec4(-0.452296555, 0.809743226, 0.313681662, 0.949528217),
vec4(-0.492342144, 0.317682207, 0.266712755, 0.963776052),
vec4(-0.403601944, -0.406031638, 0.219101220, 0.975702107),
vec4(-0.537260950, 0.137945175, 0.170961857, 0.985277653),
vec4(-0.404928178, -0.715918541, 0.122410625, 0.992479563),
vec4(-0.386338592, 0.556550741, 0.0735644922, 0.997290432),
vec4(-0.445942074, -0.242918074, 0.0245411359, 0.999698818),
vec4(-0.459759980, -0.175696611, -0.0245412234, 0.999698818),
vec4(-0.359771132, 0.682195961, -0.0735645741, 0.997290432),
vec4(-0.412575692, 0.205535084, -0.122410707, 0.992479503),
vec4(-0.336475104, -0.646421731, -0.170961946, 0.985277653),
vec4(-0.429363400, 0.0166855231, -0.219101310, 0.975702107),
vec4(-0.319253087, -0.925218344, -0.266712844, 0.963776052),
vec4(-0.294470191, 0.430103362, -0.313681722, 0.949528158),
vec4(-0.281283021, -0.387403429, -0.359895051, 0.932992816),
vec4(-0.358183086, -0.0808178857, -0.405241340, 0.914209723),
vec4(-0.271769434, 0.854052365, -0.449611366, 0.893224299),
vec4(-0.244775921, 0.311606824, -0.492898166, 0.870087028),
vec4(-0.244355842, -0.552090824, -0.534997702, 0.844853520),
vec4(-0.283291280, 0.112162955, -0.575808167, 0.817584813),
vec4(-0.224362880, -0.823741674, -0.615231693, 0.788346350),
vec4(-0.210826442, 0.610893846, -0.653172851, 0.757208824),
vec4(-0.191608176, -0.297364026, -0.689540684, 0.724246979),
vec4(-0.207833603, -0.124338157, -0.724247158, 0.689540505),
vec4(-0.176593989, 0.814833522, -0.757208824, 0.653172851),
vec4(-0.158949688, 0.293469012, -0.788346469, 0.615231514),
vec4(-0.152046368, -0.648668587, -0.817584813, 0.575808167),
vec4(-0.167782038, 0.0643178672, -0.844853640, 0.534997463),
vec4(-0.128430068, -0.907204390, -0.870087028, 0.492898136),
vec4(-0.115809105, 0.572147131, -0.893224299, 0.449611366),
vec4(-0.103222348, -0.403248310, -0.914209783, 0.405241221),
vec4(-0.112737618, -0.0319865458, -0.932992816, 0.359895051),
vec4(-0.0796749964, 0.955433667, -0.949528217, 0.313681602),
vec4(-0.0672519580, 0.453793734, -0.963776052, 0.266712725),
vec4(-0.0551275201, -0.538435221, -0.975702167, 0.219101071),
vec4(-0.0426490456, 0.204346836, -0.985277653, 0.170961812),
vec4(-0.0306719355, -0.790655255, -0.992479503, 0.122410700),
vec4(-0.0184057076, 0.708510995, -0.997290492, 0.0735644475),
vec4(-0.00613544276, -0.291185349, -0.999698818, 0.0245412104),
vec4(0.00613530306, -0.244297966, -0.999698818, -0.0245413855),
vec4(0.0184059385, 0.755400777, -0.997290432, -0.0735646188),
vec4(0.0306059923, 0.253786176, -0.992479503, -0.122410871),
vec4(0.0429276451, -0.743136168, -0.985277653, -0.170961991),
vec4(0.0701737553, 0.00441496586, -0.975702107, -0.219101235),
vec4(0.0674433559, -0.992085159, -0.963776052, -0.266712904),
vec4(0.0794365108, 0.499346048, -0.949528158, -0.313681781),
vec4(0.0915081054, -0.485832185, -0.932992756, -0.359895200),
vec4(0.101071075, -0.0861614645, -0.914209723, -0.405241400),
vec4(0.116242222, 0.872919321, -0.893224180, -0.449611515),
vec4(0.126407236, 0.359021723, -0.870086908, -0.492898285),
vec4(0.139908314, -0.603366435, -0.844853580, -0.534997642),
vec4(0.168981716, 0.0979395211, -0.817584693, -0.575808346),
vec4(0.164669126, -0.853637457, -0.788346410, -0.615231633),
vec4(0.175589874, 0.605686426, -0.757208705, -0.653172970),
vec4(0.181917489, -0.321471483, -0.724247038, -0.689540625),
vec4(0.219242185, -0.135647133, -0.689540565, -0.724247098),
vec4(0.212299466, 0.790099680, -0.653172910, -0.757208765),
vec4(0.208243251, 0.240495890, -0.615231574, -0.788346469),
vec4(0.234419063, -0.640313387, -0.575808048, -0.817584932),
vec4(0.315854102, 0.0532567836, -0.534997344, -0.844853759),
vec4(0.260333687, -0.894772291, -0.492898196, -0.870086968),
vec4(0.265374005, 0.502337217, -0.449611217, -0.893224359),
vec4(0.267429054, -0.339113116, -0.405241072, -0.914209843),
vec4(0.380209267, -0.0445682108, -0.359895110, -0.932992756),
vec4(0.307221651, 0.891683638, -0.313681692, -0.949528217),
vec4(0.296788067, 0.329054117, -0.266712576, -0.963776112),
vec4(0.317195147, -0.457708418, -0.219100907, -0.975702226),
vec4(0.419729054, 0.148764044, -0.170961887, -0.985277653),
vec4(0.349995196, -0.727014899, -0.122410536, -0.992479563),
vec4(0.356363803, 0.594497383, -0.0735642835, -0.997290492),
vec4(0.434345096, -0.231501341, -0.0245412868, -0.999698818),
vec4(0.480473697, -0.164373189, 0.0245413091, -0.999698818),
vec4(0.392657876, 0.681903303, 0.0735647827, -0.997290432),
vec4(0.492657542, 0.218807966, 0.122411035, -0.992479503),
vec4(0.409054011, -0.584142148, 0.170961916, -0.985277653),
vec4(0.569577277, 0.0289491210, 0.219101399, -0.975702107),
vec4(0.442882210, -0.855257273, 0.266713053, -0.963775992),
vec4(0.459734946, 0.387970626, 0.313681692, -0.949528217),
vec4(0.513070345, -0.343044043, 0.359895140, -0.932992756),
vec4(0.629031241, -0.0690753013, 0.405241549, -0.914209664),
vec4(0.483215511, 0.773316741, 0.449611664, -0.893224120),
vec4(0.586818159, 0.310843110, 0.492898226, -0.870086968),
vec4(0.528679490, -0.427168757, 0.534997761, -0.844853461),
vec4(0.683721542, 0.126429096, 0.575808465, -0.817584634),
vec4(0.517971814, -0.658907175, 0.615231574, -0.788346410),
vec4(0.548397303, 0.476606160, 0.653172910, -0.757208765),
vec4(0.695181608, -0.259932309, 0.689540744, -0.724246919),
vec4(0.748597383, -0.117820688, 0.724247038, -0.689540625),
vec4(0.556980729, 0.641256869, 0.757208884, -0.653172791),
vec4(0.741829991, 0.268901259, 0.788346529, -0.615231454),
vec4(0.647817433, -0.477341115, 0.817584991, -0.575807929),
vec4(0.816602290, 0.0779312477, 0.844853580, -0.534997642),
vec4(0.599919200, -0.671730816, 0.870087087, -0.492898077),
vec4(0.724726558, 0.447135508, 0.893224418, -0.449611068),
vec4(0.810727239, -0.307791352, 0.914209723, -0.405241370),
vec4(0.882583082, -0.0201240778, 0.932992816, -0.359894961),
vec4(0.645550549, 0.729843259, 0.949528277, -0.313681543),
vec4(0.839177251, 0.362342149, 0.963776171, -0.266712397),
vec4(0.839526892, -0.399391353, 0.975702107, -0.219101220),
vec4(0.928934336, 0.175204813, 0.985277653, -0.170961723),
vec4(0.774228692, -0.569184363, 0.992479563, -0.122410372),
vec4(0.815476179, 0.537282884, 0.997290432, -0.0735645965),
vec4(0.968665719, -0.214761987, 0.999698818, -0.0245411228)
);
`,Nm=km+`
void aovReflectance(ag prepared, bool qQ, bool kY, out vec3 diffuse, out vec3 specular) {
diffuse=vec3(0.0); specular=vec3(0.0);
vec3 view = prepared.viewLocal;
if (view.z <= 1e-6) { return; }
OpenPbrResolvedMaterial material = prepared.material;
vec2 alpha = vec2(material.alphaX, material.alphaY);
float mg = aF(view, alpha);
float jl = prepared.weights[OPENPBR_LOBE_DIFFUSE];
float gb = prepared.weights[OPENPBR_LOBE_METAL];
float specularWeight = prepared.weights[OPENPBR_LOBE_SPECULAR];
float ei = 1.0;
if (kY && prepared.dielectricMsProbability > 0.0) {
ei = max(bf(prepared.refractionEtaTOverEtaI, prepared.specularAlpha), 1e-12);
}
vec3 cr = normalize(vec3(alpha, 1.0) * view);
float qP = min(cr.z, 1.0);
float kh = 1.0 + qP;
uint count = 256u;
for (uint i = 0u; i < uint(NO_UNROLL(256)); i++) {
uint vV = i / 2u;
vec2 u = vec2((float(vV) + 0.5) / float(count / 2u),
fract(float(reverseBits(vV)) * 2.3283064365386963e-10 + 0.37));
vec4 kK = hp[vV];

bool hO = prepared.specularAlpha < 0.001;
vec3 light = vec3(kK.xy, sqrt(max(0.0, 1.0 - dot(kK.xy, kK.xy))));
if (hO) { light = aO(u); }
if ((i & 1u) != 0u) {
float kC = (1.0 - u.y) * kh;
float ex = sqrt(max(0.0, (kC + (1.0 - qP)) * (u.y * kh)));
vec3 ad = normalize(vec3(alpha, 1.0) * vec3(cr.xy + ex * kK.zw, kC));
if (hO) { ad = aD(view, alpha, u); }
light = reflect(-view, ad);
}

if (light.z <= 0.0) { continue; }
vec3 ad = normalize(view + light);
float qH = mg * cW(ad, alpha) / (4.0 * view.z);
float pdf = 0.5 * (light.z * INVPI + qH);


vec3 aA = openpbr_to_local(prepared.basis, openpbr_to_world(prepared.basis, light));
if (aA.z <= 0.0) { continue; }
float scale = abs(aA.z) / (pdf * float(count));
if (qQ && jl > 0.0) {
float compensation = prepared.diffuseSpecularEnergyCompensation * aw(
prepared.specularEtaTOverEtaI, prepared.specularAlpha, abs(aA.z));
float sZ = 0.0;
diffuse += jl * bJ(material, prepared.diffuseColor,
view, aA, compensation, sZ) * scale;
}
if (kY) {
vec3 jn = normalize(view + aA);
float bm = abs(dot(view, jn));
vec3 bG = vec3(0.0);
if (specularWeight > 0.0) {
vec3 dielectric = vec3(af(bm, material.relativeIor));
if (material.thinWalled) { dielectric = av(dielectric, material.transmissionWeight); }
bG += specularWeight * material.specularColor * dielectric;
}
if (gb > 0.0) {
bG += gb * material.specularWeight * cw(bm,
material.baseWeight * material.baseColor, material.specularColor);
}
float rJ = cW(jn, alpha) * mg
* aF(aA, alpha) / (4.0 * max(aA.z * view.z, 1e-8));
vec3 reflection = bG * rJ;
if (gb > 0.0 && prepared.metalMsFactor > 0.0) {
float cL = min(prepared.metalMsFactor * aV(prepared.specularAlpha, aA.z), 1.0 / max(aA.z, 1e-8));
reflection += gb * prepared.metalMsScale * cL * INVPI;
}
if (prepared.dielectricMsProbability > 0.0) {
float oZ = prepared.dielectricMsViewLoss * bb(
prepared.refractionEtaTOverEtaI, prepared.specularAlpha, abs(aA.z)) / ei;
float cL = min(oZ * prepared.dielectricMsReflectionRatio, 1.0 / abs(aA.z));
reflection += prepared.dielectricMsReflectionScale * cL * INVPI;
}
specular += reflection * scale;
}
}
return;
}
`,Na=he`
#define PI 3.14159265359
#define TWOPI 6.28318530718
#define INVPI 0.31830988618
#define INVPI2 0.10132118364
#define EPS 0.0005
#define INF 1.0e999
#define INV4PI 0.07957747154594766

#define ROUGHNESS_MIN 0.001

`,ci=SA({uniforms:{lightsTex:M.uniform("sampler2D"),iesProfileData:M.uniform("sampler2D"),iesProfileColumns:M.uniform("int",1),pixelSize:M.uniform("vec2"),jitter:M.uniform("vec2"),sampleCount:M.uniform("int"),envLightSelectionPmf:M.uniform("float",0)},defines:{STANDARD:0,UNLIT:fn,SHADOW_CATCHER:cn,SPOT_LIGHT:Da},main:he`

const vec3 luminance = vec3(0.2126, 0.7152, 0.0722);
const int xk = 8;

#define RAY_MAX_DISTANCE 9999.0

#define NO_UNROLL(X) (X + min(0, sampleCount))
#define NO_UNROLLU(X) (X + uint(min(0, sampleCount)))

struct Ray {
vec3 o;
vec3 d;
float tMax;
};

struct SurfaceInteraction {
bool hit;
vec3 position;
vec3 normal; 
#ifdef USE_COAT_NORMAL_FRAMES
vec3 coatNormal;
#endif
vec3 vertexNormal; 
vec3 shadowOffset; 

vec2 uv;
vec2 uv1;
vec3 vertexColor;

#ifdef USE_TANGENT
vec3 tangent;
#endif
vec3 directionTangent;
vec3 directionBitangent;
vec3 geometryTangent;
vec3 geometryBitangent;
vec3 faceNormal; 

bool isTransparency;



bool albedoSampled;

int triangleIndex;
int instanceIndex;
int materialIndex;

int mediumType;
vec3 mediumExtinction;
vec3 mediumScattering;
float mediumAnisotropy;
};




struct OpenPbrResolvedMaterial {
int materialType;

float specularRoughness;
float baseMetalness;
vec3 baseColor;
float specularIor;
vec3 emission;
float transmissionWeight;
bool thinWalled;
float specularAnisotropy;
float alpha;

float transmissionDispersionScale;
float dispersionAbbeNumber;
float thinFilmThickness;
float thinFilmIor;
float thinFilmWeight;


int mediumType;
vec3 mediumExtinction;
vec3 mediumScattering;
float mediumAnisotropy;

float baseWeight;
float diffuseRoughness;
float specularWeight;
vec3 specularColor;
float subsurfaceWeight;
vec3 subsurfaceColor;
vec3 transmissionColor;
float fuzzWeight;
vec3 fuzzColor;
float fuzzRoughness;
float coatWeight;
vec3 coatColor;
float coatRoughness;
float coatAnisotropy;
vec2 anisotropyDirection;
bool anisotropyDirectionEnabled;
float coatAnisotropyRotation;
vec3 directionTangent;
vec3 directionBitangent;
vec3 geometryTangent;
vec3 geometryBitangent;
#ifdef USE_COAT_NORMAL_FRAMES
vec3 coatNormal;
bool coatNormalEnabled;
vec3 geometricNormal;
#endif
float coatIor;
float coatDarkening;

float bevel;


float relativeIor;
bool inside;
float alphaX;
float alphaY;
};


struct Light {
vec3 position;
vec3 emission;
vec3 u;
vec3 v;
float radius;
float area;
float type;
int textureIndex;
float spread;
float selectionPmf;
float selectionCdf;
vec3 iesReference;
};

void gC(inout Ray ray, vec3 origin, vec3 direction) {
ray.o = origin;
ray.d = direction;
ray.tMax = RAY_MAX_DISTANCE;
}


ivec2 hd(int i, int jY) {
ivec2 u;
u.y = i >> jY; 
u.x = i - (u.y << jY); 
return u;
}

vec4 lm(sampler2D s, int i, int jY) {
return texelFetch(s, hd(i, jY), 0);
}

ivec4 lm(highp isampler2D s, int i, int jY) {
return texelFetch(s, hd(i, jY), 0);
}

struct Path {
Ray ray;
vec3 li;
float alpha;
vec3 beta;
bool fromEye;
bool abort;
float scatteringPdf;
bool scatteringIsDelta;
bool isNextRefraction;
};

struct LightSampleRec {
vec3 normal;
vec3 emission;
vec3 direction;
float dist;
float pdf;
bool isDelta;
};


Light rB(int i) {
int firstTexel = i * 6;
vec4 qD = texelFetch(
lightsTex,
ivec2(firstTexel, 0),
0
);
vec4 ql = texelFetch(
lightsTex,
ivec2(firstTexel + 1, 0),
0
);
vec4 oL = texelFetch(
lightsTex,
ivec2(firstTexel + 2, 0),
0
);
vec4 my = texelFetch(
lightsTex,
ivec2(firstTexel + 3, 0),
0
);
vec4 shape = texelFetch(
lightsTex,
ivec2(firstTexel + 4, 0),
0
);
return Light(
qD.xyz,
ql.xyz,
oL.xyz,
my.xyz,
shape.x,
shape.y,
shape.z,
int(my.w),
oL.w,
qD.w,
ql.w,
texelFetch(lightsTex, ivec2(firstTexel + 5, 0), 0).xyz
);
}

float cS(int el, int mc) {
int iK = el + mc / 4;
vec4 packed = texelFetch(
iesProfileData,
ivec2(iK % iesProfileColumns, iK / iesProfileColumns),
0
);
return packed[mc % 4];
}

float lB(int el, vec2 uv) {
if (el < 0) return 1.0;
vec2 pixel = fract(uv) * 128.0 - 0.5;
ivec2 p0 = ivec2(floor(pixel));
vec2 f = fract(pixel);
int xa = p0.x < 0 ? 127 : p0.x;
int xb = p0.x >= 127 ? 0 : p0.x + 1;
int ya = p0.y < 0 ? 127 : p0.y;
int yb = p0.y >= 127 ? 0 : p0.y + 1;
float a = cS(el, ya * 128 + xa);
float b = cS(el, ya * 128 + xb);
float c = cS(el, yb * 128 + xa);
float d = cS(el, yb * 128 + xb);
return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float bP(Light light, vec3 dV) {
vec3 axis = normalize(light.u);
float ci = dot(axis, dV);
float vm = light.v.y > light.v.x + 1e-6
? smoothstep(light.v.x, light.v.y, ci)
: step(light.v.x, ci);
if (vm <= 0.0 || light.textureIndex < 0) return vm;
vec3 vK = light.iesReference;
vec3 xj = cross(axis, vK);
float vertical = acos(clamp(ci, -1.0, 1.0));
float horizontal = atan(dot(dV, xj), dot(dV, vK));
return vm * lB(light.textureIndex, vec2(vertical / PI, horizontal / TWOPI + 0.5));
}
`}),fi=SA({uniforms:{materialBuffer:M.uniform("sampler2D"),materialBufferColumns:M.uniform("int",1),mapInfo:M.arrayUniform("vec4","NUM_MAPS"),mapTransform:M.arrayUniform("vec4","NUM_MAPS"),mapUvChannel:M.arrayUniform("float","NUM_MAPS"),mapColorLinear:M.arrayUniform("float","NUM_MAPS"),mapWrap:M.arrayUniform("vec2","NUM_MAPS"),map:M.uniform("sampler2DArray")},defines:{NUM_MATERIALS:1},main:he`
${yu()}
#ifdef HAS_GLTF_ANISOTROPY
vec2 fv(float roughness, float strength) {
if (strength == 0.0) { return vec2(roughness, 0.0); }
float u = roughness * roughness;
float a = u + (1.0 - u) * strength * strength;
if (a == 0.0) { return vec2(0.0); }
return vec2(pow((a*a + u*u) * 0.5, 0.25), clamp(1.0 - u/a, 0.0, 1.0));
}

#endif

vec3 mG(vec3 c) {
return mix(pow(c * 0.9478672986 + 0.0521327014, vec3(2.4)), c * 0.0773993808, vec3(lessThan(c, vec3(0.04045))));
}
vec4 fetchMatData(int i) {
return lm(materialBuffer, i, materialBufferColumns);
}


float mb(float alpha, int alphaMode, float alphaCutoff) {
if (alphaMode == ${si.opaque}) {
return 1.0;
}
if (alphaMode == ${si.mask}) {
return alpha >= alphaCutoff ? 1.0 : 0.0;
}
return alpha;
}

float xS(int idx) {
return fetchMatData(idx * MAT_DATA_SIZE + MAT_ROW_COLOR).w;
}

vec2 ah(int val) {
return vec2(float(val >> 8), float(val & 0xff) / 255.0);
}

#ifdef NUM_MAPS
vec3 decodeMapColor(int index, vec3 c) {
if (mapColorLinear[index] > 0.5) { return c; }
return mG(c);
}

vec2 jO(int index) {
return mapInfo[index].xy;
}

float lT(int index) {
return floor(mapInfo[index].z);
}

vec2 kt(int index) {
return vec2(fract(mapInfo[index].z), mapInfo[index].w);
}

float gg(float value, float mode) {
if (mode < 0.5) return fract(value);
if (mode < 1.5) return clamp(value, 0.0, 1.0);
return 1.0 - abs(1.0 - (value - 2.0 * floor(value * 0.5)));
}

vec2 kZ(int index, vec2 uv) {
vec4 transform = mapTransform[index];
vec2 value = uv * transform.xy + transform.zw;
return vec2(gg(value.x, mapWrap[index].x), gg(value.y, mapWrap[index].y));
}

vec2 tJ(int index, vec2 uv) {
vec2 rN = kZ(index, uv);
vec2 jH = 1.0 / vec2(textureSize(map, 0).xy);
vec2 eo = kt(index);
vec2 kS = jO(index) + jH;
vec2 pJ = eo - 0.5 * jH;
vec2 ml = eo + kS - jH;
return clamp(
pJ + rN * kS,
eo,
ml
);
}

vec2 getMapUvSet(int index, vec2 uv, vec2 uv1) {
return mapUvChannel[index] > 0.5 ? uv1 : uv;
}

vec4 fe(int index, ivec2 jJ, ivec2 size, ivec2 origin, vec2 modes) {
ivec2 p = clamp(jJ, ivec2(0), size - 1);
if (modes.x < 0.5) p.x = ((jJ.x % size.x) + size.x) % size.x;
if (modes.y < 0.5) p.y = ((jJ.y % size.y) + size.y) % size.y;
return texelFetch(map, ivec3(origin + p, int(lT(index))), 0);
}

vec4 sampleMap(int index, vec2 uv) {
ivec2 size = ivec2(round(jO(index) * vec2(textureSize(map, 0).xy) + 1.0));
vec2 dk = kZ(index, uv) * vec2(size) - 0.5;
vec2 modes = mapWrap[index];
if ((size.x > 1 && modes.x < 0.5 && (dk.x < 0.0 || dk.x > float(size.x - 1))) ||
(size.y > 1 && modes.y < 0.5 && (dk.y < 0.0 || dk.y > float(size.y - 1)))) {
ivec2 base = ivec2(floor(dk));
vec2 weight = fract(dk);
ivec2 origin = ivec2(round(kt(index) * vec2(textureSize(map, 0).xy) - 0.5));
return mix(
mix(fe(index, base, size, origin, modes), fe(index, base + ivec2(1, 0), size, origin, modes), weight.x),
mix(fe(index, base + ivec2(0, 1), size, origin, modes), fe(index, base + ivec2(1, 1), size, origin, modes), weight.x), weight.y);
}
return texture(map, vec3(tJ(index, uv), lT(index)));
}
#endif


vec2 aN(float roughness, float anisotropy) {
float alpha = roughness * roughness;
float qe = ROUGHNESS_MIN * ROUGHNESS_MIN;
if (anisotropy == 0.0) { return vec2(max(qe, alpha)); }
float dw = 1.0 - anisotropy;
float tp = alpha * sqrt(2.0 / (1.0 + dw * dw));
return max(vec2(qe), vec2(tp, dw * tp));
}

vec4 bF(int i);
vec3 lp(int instanceIndex) {
if (instanceIndex < 0) return vec3(1.0);
return bF(instanceIndex * ${te+""} + 9).rgb;
}

void dg(
inout OpenPbrResolvedMaterial mat,
int materialIndex,
vec2 uv,
vec2 uv1,
int instanceIndex,
vec3 vertexColor
) {
int i = materialIndex * MAT_DATA_SIZE;
vec4 pR = fetchMatData(i + MAT_ROW_COLOR);
vec4 fG = fetchMatData(i + MAT_ROW_ROUGHNESS_NORMAL);
vec4 gE = fetchMatData(i + MAT_ROW_METALLIC_MAPS);
vec4 hY = fetchMatData(i + MAT_ROW_EMISSION);
vec4 hm = fetchMatData(i + MAT_ROW_IOR_TRANSMISSION);
vec4 misc = fetchMatData(i + MAT_ROW_MISC);
vec4 ov = fetchMatData(i + MAT_ROW_ALPHA_FILM);
vec4 mB = fetchMatData(i + MAT_ROW_BASE_CONTROLS);
vec4 pV = fetchMatData(i + MAT_ROW_SPECULAR_FUZZ);
vec4 subsurface = fetchMatData(i + MAT_ROW_SUBSURFACE);
vec4 yj = fetchMatData(i + MAT_ROW_FUZZ);
vec4 xr = fetchMatData(i + MAT_ROW_COAT);
vec4 mC = fetchMatData(i + MAT_ROW_COAT_CONTROLS);
vec4 nV = fetchMatData(i + MAT_ROW_FILM_DISPERSION);
vec4 ou = fetchMatData(i + MAT_ROW_STANDALONE_MAPS);
int mapAlphaUsage = int(misc.a);

mat.baseColor = pR.rgb;
mat.materialType = int(pR.w);
mat.specularRoughness = fG.x;
mat.baseMetalness = gE.x;
mat.specularAnisotropy = clamp(gE.y, 0.0, 1.0);
mat.emission = hY.rgb;
mat.inside = false;
mat.specularIor = hm.x;
mat.transmissionWeight = hm.y;
#ifdef HAS_MEDIUM
mat.mediumType = int(hm.z);
#else
mat.mediumType = 0;
#endif
mat.thinWalled = hm.w > 0.5;
mat.bevel = misc.r;
mat.transmissionDispersionScale = misc.g;
mat.dispersionAbbeNumber = max(nV.y, 1e-6);
mat.thinFilmThickness = misc.b;
mat.thinFilmIor = ov.b;
mat.thinFilmWeight = clamp(nV.x, 0.0, 1.0);

mat.thinFilmThickness *= 1000.0;
mat.baseWeight = clamp(mB.x, 0.0, 1.0);
mat.diffuseRoughness = clamp(mB.y, 0.0, 1.0);
mat.specularWeight = max(0.0, mB.z);
mat.subsurfaceWeight = clamp(mB.w, 0.0, 1.0);
mat.specularColor = max(pV.rgb, vec3(0.0));
mat.fuzzWeight = clamp(pV.w, 0.0, 1.0);
mat.subsurfaceColor = max(subsurface.rgb, vec3(0.0));
mat.transmissionColor = max(fetchMatData(i + MAT_ROW_TRANSMISSION_COLOR).rgb, vec3(0.0));
mat.fuzzColor = max(yj.rgb, vec3(0.0));
mat.fuzzRoughness = clamp(yj.w, 0.0, 1.0);
mat.coatColor = max(xr.rgb, vec3(0.0));
mat.coatWeight = clamp(xr.w, 0.0, 1.0);
mat.coatRoughness = clamp(mC.x, ROUGHNESS_MIN, 1.0);
mat.coatAnisotropy = clamp(mC.y, 0.0, 1.0);
mat.coatIor = max(mC.z, 1.0);
mat.coatDarkening = clamp(mC.w, 0.0, 1.0);

#ifdef HAS_MEDIUM
mat.mediumExtinction = max(fetchMatData(i + MAT_ROW_MEDIUM_EXTINCTION).rgb, vec3(0.0));
mat.mediumAnisotropy = clamp(fetchMatData(i + MAT_ROW_MEDIUM_EXTINCTION).a, -1.0, 1.0);
mat.mediumScattering = max(fetchMatData(i + MAT_ROW_MEDIUM_SCATTERING).rgb, vec3(0.0));
mat.mediumType = max(max(mat.mediumExtinction.x, mat.mediumExtinction.y), mat.mediumExtinction.z) > 0.0 ? 1 : 0;
#endif


#ifdef HAS_ALPHA
mat.alpha = ov.r;
#else
mat.alpha = 1.0;
#endif

#ifdef NUM_DIFFUSE_MAPS
int diffuseMapIndex = int(gE.z);
if (diffuseMapIndex >= 0) {
vec4 diffuse = sampleMap(
diffuseMapIndex, getMapUvSet(diffuseMapIndex, uv, uv1)
);


mat.baseColor *= decodeMapColor(diffuseMapIndex, diffuse.rgb);


if (mapAlphaUsage == ${Pi.transmission+""}) {
mat.transmissionWeight = 1.0 - diffuse.a;
}
else if (mapAlphaUsage == ${Pi.alpha+""}) {
mat.alpha *= diffuse.a;
}
}
#endif

${Xe("alphaMap","glsl")}

mat.alpha = mb(
mat.alpha, int(fetchMatData(i + MAT_ROW_ALPHA).w), ou.w
);

${Xe("transmissionMap","glsl")}

#ifdef NUM_METALLIC_ROUGHNESS_MAPS
int metallicRoughnessMapIndex = int(gE.w);
if (metallicRoughnessMapIndex >= 0) {
vec4 gc = sampleMap(
metallicRoughnessMapIndex,
getMapUvSet(metallicRoughnessMapIndex, uv, uv1)
);
mat.baseMetalness *= gc.b;
mat.specularRoughness *= gc.g;
}
#endif

${Xe("roughnessMap","glsl")}

${Xe("metalnessMap","glsl")}

#ifdef NUM_EMISSIVE_MAPS
int emissiveMapIndex = int(hY.w);
if (emissiveMapIndex >= 0) {
vec3 emissive = sampleMap(
emissiveMapIndex, getMapUvSet(emissiveMapIndex, uv, uv1)
).rgb;
mat.emission *= decodeMapColor(emissiveMapIndex, emissive);
}
#endif

#ifdef NUM_COAT_WEIGHT_MAPS
int il = int(fetchMatData(i + MAT_ROW_LAYER_MAPS).x);
if (il >= 0 && mat.materialType == 0) {
float rA = clamp(xr.w, 0.0, 1.0) * sampleMap(
il, getMapUvSet(il, uv, uv1)
).r;
mat.emission *= mix(vec3(1.0), sqrt(max(xr.rgb, vec3(0.0))), rA);
}
#endif

${hl("glsl")}

${Xe("coatWeightMap","glsl")}
#ifdef USE_COAT_NORMAL_FRAMES

mat.coatNormalEnabled = mat.coatWeight > 0.0 && (fG.y >= 0.0 || fetchMatData(i + MAT_ROW_LAYER_MAPS).z >= 0.0);
#endif

${Xe("coatRoughnessMap","glsl")}

${Xe("fuzzColorMap","glsl")}

${Xe("fuzzRoughnessMap","glsl")}

${Xe("specularWeightMap","glsl")}

${Xe("specularColorMap","glsl")}

vec4 lG = fetchMatData(i + MAT_ROW_DIRECTION_NORMAL);
mat.anisotropyDirection = vec2(1.0, 0.0);
mat.anisotropyDirectionEnabled = lG.y != 0.0;
mat.coatAnisotropyRotation = fetchMatData(i + MAT_ROW_FILM_TEXTURE).x;
#ifdef NUM_ANISOTROPY_MAPS
if (lG.x >= 0.0) {
int index = int(lG.x);
vec4 dk = sampleMap(index, getMapUvSet(index, uv, uv1));
mat.specularAnisotropy *= dk.b;
vec2 direction = dk.rg * 2.0 - 1.0;
if (dot(direction, direction) > 1e-4) mat.anisotropyDirection = normalize(direction);
mat.anisotropyDirectionEnabled = true;
}
#endif
#ifdef HAS_GLTF_ANISOTROPY
if (fetchMatData(i + MAT_ROW_FILM_TEXTURE).y > 0.5 && mat.specularAnisotropy > 0.0) {
vec2 tU = fv(clamp(mat.specularRoughness, 0.0, 1.0), mat.specularAnisotropy);
mat.specularRoughness = tU.x;
mat.specularAnisotropy = tU.y;
}
#endif
if (mat.anisotropyDirectionEnabled) {
float theta = lG.y;
vec2 d = mat.anisotropyDirection;
mat.anisotropyDirection = vec2(cos(theta)*d.x - sin(theta)*d.y, sin(theta)*d.x + cos(theta)*d.y);
}



if (mat.coatWeight > 0.0 && mat.coatRoughness > 0.0) {
float ih = mat.specularRoughness * mat.specularRoughness;
float ij = mat.coatRoughness * mat.coatRoughness;
mat.specularRoughness = mix(mat.specularRoughness,
pow(min(1.0, ih * ih + 2.0 * ij * ij), 0.25), mat.coatWeight);
}
vec3 color = lp(instanceIndex) * vertexColor;
mat.baseColor *= color;
if (mat.materialType == UNLIT) mat.emission *= color;

mat.specularRoughness = clamp(mat.specularRoughness, ROUGHNESS_MIN, 1.0);
mat.baseMetalness = clamp(mat.baseMetalness, 0.0, 1.0);
vec2 specularAlpha = aN(mat.specularRoughness, mat.specularAnisotropy);
mat.alphaX = specularAlpha.x;
mat.alphaY = specularAlpha.y;
}

#if defined(NUM_NORMAL_MAPS)
vec3 pd(int materialIndex, vec2 uv, vec3 normal, vec3 dp1, vec3 dp2, vec2 oW, vec2 oX) {
int i = materialIndex * MAT_DATA_SIZE;
vec4 fG = fetchMatData(i + MAT_ROW_ROUGHNESS_NORMAL);
int normalMapIndex = int(fG.y);
if (normalMapIndex >= 0) {



vec3 sb = cross(dp2, normal);
vec3 sa = cross(normal, dp1);
vec3 dpdu = sb * oW.x + sa * oX.x;
vec3 tH = sb * oW.y + sa * oX.y;
float ej = max(dot(dpdu, dpdu), dot(tH, tH));
if (ej > 1e-12) {
float tO = inversesqrt(ej);
dpdu *= tO;
tH *= tO;
}
else {



vec3 oo = abs(normal.z) < 0.999
? vec3(0.0, 0.0, 1.0)
: vec3(0.0, 1.0, 0.0);
dpdu = normalize(cross(oo, normal));
tH = cross(normal, dpdu);
}

vec3 n = 2.0 * sampleMap(normalMapIndex, uv).rgb - 1.0;
n.xy *= fG.zw;
n = normalize(n);

mat3 tbn = mat3(dpdu, tH, normal);

return normalize(tbn * n);
} else {
return normal;
}
}
#endif

`});function xr(i,e="",t="RAY_MAX_DISTANCE"){const A=he`
ivec3 vertexOffset = ivec3(floatBitsToInt(bF(bY * ${te}).y));
for (int k = 0; k < primitiveCount; k++) {
int triangleIndex = primitiveOffset + k;
${e}
vec4 r3 = dJ(triangleIndex);
ivec3 index = floatBitsToInt(r3.xyz) + vertexOffset;
fP tri = fP(
lm(positionBuffer, index.x, vertexColumns).xyz,
lm(positionBuffer, index.y, vertexColumns).xyz,
lm(positionBuffer, index.z, vertexColumns).xyz
);
eK hit = ga(o, d, tri, eq, gY, tMax);

if (hit.t > 0.0) {
tMax = hit.t;
vec3 e1 = tri.p1 - tri.p0;
vec3 e2 = tri.p2 - tri.p0;
vec3 faceNormal = normalize(cross(e1, e2));
int kP = int(ah(
floatBitsToInt(bF(bY * ${te}).z)
).x);
bool jd = fetchMatData(
kP * MAT_DATA_SIZE + MAT_ROW_ALPHA
).z > 0.5;
if (!doubleSided && !jd && dot(faceNormal, d) > 0.0) {
continue;
}

${i}
}
}
`;return he`
ivec2 stack[STACK_SIZE];
int top = -1;
int ud = -1;
float tMax = ${t};

vec3 o = ray.o;
vec3 d = ray.d;

bool sj = false;
vec3 hS;
vec3 aC;
ivec3 hK;

fP mk;


top = 0;
stack[0] = ivec2(0, -1);

int yk = 0;
while(top >= 0 && yk < 5000) {
yk++;
ivec2 node = stack[top--];

int bY = node.y;

if (bY != ud) {
if (bY < 0) {
o = ray.o;
d = ray.d;
}
else {
mat4 w2l = mat4(
bF(bY * ${te} + 1),
bF(bY * ${te} + 2),
bF(bY * ${te} + 3),
bF(bY * ${te} + 4)
);
o = (w2l * vec4(ray.o, 1.0)).xyz;
d = (w2l * vec4(ray.d, 0.0)).xyz;
}
eq = maxDimension(abs(d));
gY = nk(d, eq);
ud = bY;
}

int bw = bY < 0 ? 0 : blasOffset;
uint fY = bY < 0 ? 0u : floatBitsToUint(bF(bY * ${te}).x);
int he = int(fY >> 30u);
int fg = int(fY & 0x3fffffffu);
int primitiveCount = 0;
int primitiveOffset = 0;

if (he == 3) {
uint iw = uint(node.x);
if ((iw & 0x80000000u) != 0u) {
primitiveCount = int((iw >> 23u) & 0xffu);
primitiveOffset = bw + fg + int(iw & 0x007fffffu);
}
else {
int i = node.x + bw;
vec4 jZ = dJ(i);
vec4 fU = dJ(i + 1);
vec4 nS = dJ(i + 2);
vec4 nT = dJ(i + 3);
vec4 nU = dJ(i + 4);
uint header = floatBitsToUint(jZ.w);
int sH = int(header << 24u) >> 24;
int sI = int((header >> 8u) << 24u) >> 24;
int sJ = int((header >> 16u) << 24u) >> 24;
vec3 hZ = vec3(
uintBitsToFloat(uint(sH + 127) << 23u),
uintBitsToFloat(uint(sI + 127) << 23u),
uintBitsToFloat(uint(sJ + 127) << 23u)
);
uint childBase = floatBitsToUint(fU.x);
uint pM = floatBitsToUint(fU.y);
uint internalMask = header >> 24u;
uint vU = (d.x < 0.0 ? 4u : 0u) |
(d.y < 0.0 ? 2u : 0u) |
(d.z < 0.0 ? 1u : 0u);
uint gV[12] = uint[12](
floatBitsToUint(nS.x), floatBitsToUint(nS.y),
floatBitsToUint(nS.z), floatBitsToUint(nS.w),
floatBitsToUint(nT.x), floatBitsToUint(nT.y),
floatBitsToUint(nT.z), floatBitsToUint(nT.w),
floatBitsToUint(nU.x), floatBitsToUint(nU.y),
floatBitsToUint(nU.z), floatBitsToUint(nU.w)
);

for (int order = 7; order >= 0; order--) {
uint slot = uint(order) ^ vU;
uint tT = slot >= 4u
? floatBitsToUint(fU.w)
: floatBitsToUint(fU.z);
uint meta = (tT >> ((slot & 3u) * 8u)) & 0xffu;
if (meta == 0u) continue;
uint mI = (slot & 3u) * 8u;
uint lF = slot >> 2u;
vec3 uX = vec3(
float((gV[lF] >> mI) & 0xffu),
float((gV[2u + lF] >> mI) & 0xffu),
float((gV[4u + lF] >> mI) & 0xffu)
);
vec3 uW = vec3(
float((gV[6u + lF] >> mI) & 0xffu),
float((gV[8u + lF] >> mI) & 0xffu),
float((gV[10u + lF] >> mI) & 0xffu)
);
vec3 wN = jZ.xyz + uX * hZ;
vec3 wM = jZ.xyz + uW * hZ;
if (cU(o, d, wN, wM, tMax) <= 0.0) continue;
uint kb = meta & 0x1fu;
if (kb >= 24u) {
uint om = internalMask & ((1u << slot) - 1u);
uint un = childBase + rY(om);
stack[++top] = ivec2(
fg + int(un * 5u), bY
);
}
else {
uint triangleCount = rY(meta >> 5u);
uint sV = pM + kb;
uint wZ = 0x80000000u |
(triangleCount << 23u) |
(sV & 0x007fffffu);
stack[++top] = ivec2(int(wZ), bY);
}
}
}
}
else if (he == 2) {
int i = node.x + bw;
vec4 wP = dJ(i);
vec4 wQ = dJ(i + 1);
vec4 wR = dJ(i + 2);
vec4 wS = dJ(i + 3);
primitiveCount = int(floatBitsToUint(wR.w));
if (primitiveCount > 0) {
primitiveOffset = bw + fg + int(floatBitsToUint(wS.w));
}
else {
int left = fg + int(floatBitsToUint(wP.w) * 4u);
int right = fg + int(floatBitsToUint(wQ.w) * 4u);
float d0 = cU(o, d, wP.xyz, wQ.xyz, tMax);
float d1 = cU(o, d, wR.xyz, wS.xyz, tMax);
if (d0 > d1) {
if (d0 > 0.0) stack[++top] = ivec2(left, bY);
if (d1 > 0.0) stack[++top] = ivec2(right, bY);
}
else {
if (d1 > 0.0) stack[++top] = ivec2(right, bY);
if (d0 > 0.0) stack[++top] = ivec2(left, bY);
}
}
}
else if (he == 1) {
uint iw = uint(node.x);
if ((iw & 0x80000000u) != 0u) {
primitiveCount = int((iw >> 23u) & 0xffu);
primitiveOffset = bw + fg + int(iw & 0x007fffffu);
}
else {
int i = node.x + bw;
vec4 vJ = dJ(i);
vec4 sz = dJ(i + 1);
vec4 qR = dJ(i + 2);
vec4 oQ = dJ(i + 3);
vec3 nodeMin = vJ.xyz;
vec3 er = vec3(vJ.w, sz.x, sz.y);
uint mT[4] = uint[4](
floatBitsToUint(sz.z), floatBitsToUint(sz.w),
floatBitsToUint(qR.x), floatBitsToUint(qR.y)
);
vec4 wx = fp(floatBitsToUint(qR.z));
vec4 wy = fp(floatBitsToUint(qR.w));
vec4 wB = fp(floatBitsToUint(oQ.x));
vec4 wu = fp(floatBitsToUint(oQ.y));
vec4 wv = fp(floatBitsToUint(oQ.z));
vec4 ww = fp(floatBitsToUint(oQ.w));
vec3 gr = fo(d);
vec3 padding = fk(gr, o);
vec4 tx0 = (nodeMin.x + wx * er.x - o.x) * gr.x;
vec4 tx1 = (nodeMin.x + wu * er.x - o.x) * gr.x;
vec4 ty0 = (nodeMin.y + wy * er.y - o.y) * gr.y;
vec4 ty1 = (nodeMin.y + wv * er.y - o.y) * gr.y;
vec4 tz0 = (nodeMin.z + wB * er.z - o.z) * gr.z;
vec4 tz1 = (nodeMin.z + ww * er.z - o.z) * gr.z;
vec4 nJ = max(max((min(tx0, tx1) - vec4(padding.x)), (min(ty0, ty1) - vec4(padding.y))), (min(tz0, tz1) - vec4(padding.z)));
vec4 sY = min(min((max(tx0, tx1) + vec4(padding.x)), (max(ty0, ty1) + vec4(padding.y))), (max(tz0, tz1) + vec4(padding.z)));
vec4 distance = mix(sY, nJ, greaterThan(nJ, vec4(0.0)));
distance = mix(distance, vec4(-1.0), greaterThan(nJ, min(sY, vec4(tMax))));
float fq[4] = float[4](distance.x, distance.y, distance.z, distance.w);


for (int order = 0; order < 4; order++) {
float em = -1.0;
int eB = -1;
for (int child = 0; child < 4; child++) {
if (mT[child] != 0u && fq[child] > em) {
em = fq[child];
eB = child;
}
}
if (eB >= 0 && em > 0.0) {
uint oy = mT[eB];
int ki = int(oy);
if ((oy & 0x80000000u) == 0u) {
ki += fg;
}
stack[++top] = ivec2(ki, bY);
fq[eB] = -1.0;
}
}
}
}
else {
int i = node.x + bw;
vec4 r1 = dJ(i);
int bl = floatBitsToInt(r1.w);

if (bl >= 0) {
int left = node.x + 2;
int right = bl + fg;

float d0 = cU(o, d, dJ(left + bw).xyz, dJ(left + 1 + bw).xyz, tMax);
float d1 = cU(o, d, dJ(right + bw).xyz, dJ(right + 1 + bw).xyz, tMax);
if (d0 > d1) {
if (d0 > 0.0) {
stack[++top] = ivec2(left, bY);
}
if (d1 > 0.0) {
stack[++top] = ivec2(right, bY);
}
}
else {
if (d1 > 0.0) {
stack[++top] = ivec2(right, bY);
}
if (d0 > 0.0) {
stack[++top] = ivec2(left, bY);
}
}
}
else {
if (bY < 0) {
for (int k = 0; k < -bl; k++) {
vec4 r3 = dJ(i + 2 + k);
stack[++top] = ivec2(floatBitsToInt(r3.y), floatBitsToInt(r3.x));
}
}
else {
primitiveCount = -bl;
primitiveOffset = i + 2;
}
}
}
if (primitiveCount > 0) {
${A}
}
}
`}const ui=SA({uniforms:{positionBuffer:M.uniform("sampler2D"),normalBuffer:M.uniform("sampler2D"),tangentBuffer:M.uniform("sampler2D"),uvBuffer:M.uniform("sampler2D"),uv1Buffer:M.uniform("sampler2D"),colorBuffer:M.uniform("sampler2D"),materialIndexBuffer:M.uniform("sampler2D"),bvhBuffer:M.uniform("sampler2D"),instancesBuffer:M.uniform("sampler2D"),bvhColumns:M.uniform("int",1),vertexColumns:M.uniform("int",1),instancesColumns:M.uniform("int",1),blasOffset:M.uniform("int"),isEmptyScene:M.uniform("bool")},main:he`

struct fP {
vec3 p0;
vec3 p1;
vec3 p2;
};
#ifdef NUM_LIGHTS
float hL(float rad, vec3 pos, Ray r) {
vec3 op = pos - r.o;
float eps = 0.001;
float b = dot(op, r.d);
float det = b * b - dot(op, op) + rad * rad;
if (det < 0.0)
return INF;

det = sqrt(det);
float t1 = b - det;
if (t1 > eps)
return t1;

float t2 = b + det;
if (t2 > eps)
return t2;

return INF;
}

float og(vec3 pos, vec3 u, vec3 v, vec3 n, Ray r) {
float dt = dot(r.d, n);
float t = (dot(n, pos) - dot(n, r.o)) / dt;

if (t > EPS) {
vec3 p = r.o + r.d * t;
vec3 vi = p - pos;
float a1 = dot(u / dot(u, u), vi);
if (a1 >= 0.0 && a1 <= 1.0) {
float a2 = dot(v / dot(v, v), vi);
if (a2 >= 0.0 && a2 <= 1.0) {
return t;
}
}
}

return INF;
}

float nr(Ray r, Light light, out LightSampleRec lightSample) {



float d = INF;
vec3 u = light.u;
vec3 v = light.v;
int type = int(light.type);

#ifdef HAS_RECT_LIGHTS
if (type == RECT_LIGHT) {

vec3 pos = light.position-u*0.5-v*0.5;
vec3 normal = normalize(cross(u, v));
if (dot(normal, r.d) > 0.) 
return INF;

d = og(pos, u, v, normal, r);
if (d < 0.) {
d = INF;
}
else {
float ci = dot(-r.d, normal);
float spread = light.spread;
if (ci >= cos(spread * PI / 2.0)) {
lightSample.pdf = (d * d) / (light.area * ci);
lightSample.emission = light.emission;
}
}
}
#endif
#ifdef HAS_SPHERE_LIGHTS
if (type == SPHERE_LIGHT) {
if (light.radius <= 0.0) {
vec3 kT = light.position - r.o;
float projection = dot(kT, r.d);
vec3 bk = kT - projection * r.d;
if (projection <= EPS || dot(bk, bk) > 1e-8) return INF;
d = projection;
lightSample.direction = r.d;
lightSample.normal = -r.d;
lightSample.dist = d;
lightSample.pdf = 1.0;
lightSample.isDelta = true;
} else {
d = hL(light.radius, light.position, r);
lightSample.isDelta = false;
}
if (d < 0.) {
d = INF;
}
else {
float ak = distance(r.o, light.position);
float cosThetaMax = ak <= light.radius
? -1.0
: sqrt(max(0.0, 1.0 - light.radius * light.radius / (ak * ak)));
if (light.radius > 0.0) {
lightSample.pdf = ak <= light.radius
? INV4PI
: 1.0 / max(TWOPI * (1.0 - cosThetaMax), 1e-8);
}
lightSample.emission = light.radius <= 0.0
? light.emission / max(d * d, 1e-8)
: light.emission;
}
}
#endif
#ifdef HAS_SPOT_LIGHTS
if (type == SPOT_LIGHT) {
if (light.radius <= 0.0) {
vec3 kT = light.position - r.o;
float projection = dot(kT, r.d);
vec3 bk = kT - projection * r.d;
if (projection <= EPS || dot(bk, bk) > 1e-8) return INF;
d = projection;
lightSample.direction = r.d;
lightSample.normal = -r.d;
lightSample.dist = d;
lightSample.pdf = 1.0;
lightSample.isDelta = true;
} else {
d = hL(light.radius, light.position, r);
lightSample.isDelta = false;
}
if (d != INF) {
vec3 wW = r.o + d * r.d;
float nv = bP(light, normalize(r.o - wW));
if (nv <= 0.0) return INF;
float ak = distance(r.o, light.position);
float cosThetaMax = ak <= light.radius
? -1.0
: sqrt(max(0.0, 1.0 - light.radius * light.radius / (ak * ak)));
if (light.radius > 0.0) {
lightSample.pdf = ak <= light.radius
? INV4PI
: 1.0 / max(TWOPI * (1.0 - cosThetaMax), 1e-8);
}
lightSample.emission = light.emission * nv * (light.radius <= 0.0
? 1.0 / max(d * d, 1e-8)
: 1.0);
}
}
#endif

return d;
}
#endif

int fF(ivec4 m0, ivec4 m1, ivec4 m2, vec3 eU) {
vec2 m00 = ah(m0.x);
vec2 m01 = ah(m0.y);
vec2 m02 = ah(m0.z);
vec2 m10 = ah(m1.x);
vec2 m11 = ah(m1.y);
vec2 m12 = ah(m1.z);
vec2 m20 = ah(m2.x);
vec2 m21 = ah(m2.y);
vec2 m22 = ah(m2.z);
float w00 = m00.y * eU.x;
float w01 = m01.y * eU.x;
float w02 = m02.y * eU.x;
float w10 = m10.y * eU.y;
float w11 = m11.y * eU.y;
float w12 = m12.y * eU.y;
float w20 = m20.y * eU.z;
float w21 = m21.y * eU.z;
float w22 = m22.y * eU.z;

float hy = w00 + w01 + w02 + w10 + w11 + w12 + w20 + w21 + w22;

w00 = w00 / hy;
w01 = w01 / hy + w00;
w02 = w02 / hy + w01;
w10 = w10 / hy + w02;
w11 = w11 / hy + w10;
w12 = w12 / hy + w11;
w20 = w20 / hy + w12;
w21 = w21 / hy + w20;
w22 = w22 / hy + w21;

float rand = eC(0u);
float oh;
if (rand < w00) {
oh = m00.x;
} else if (rand < w01) {
oh = m01.x;
} else if (rand < w02) {
oh = m02.x;
} else if (rand < w10) {
oh = m10.x;
} else if (rand < w11) {
oh = m11.x;
} else if (rand < w12) {
oh = m12.x;
} else if (rand < w20) {
oh = m20.x;
} else if (rand < w21) {
oh = m21.x;
} else {
oh = m22.x;
}
return int(oh);
}


vec4 bF(int i);


mat2x3 eP(vec3 normal, vec3 dp1, vec3 dp2, vec2 oW, vec2 oX, vec4 aX) {
float determinant = oW.x * oX.y - oW.y * oX.x;
vec3 t = aX.xyz;
vec3 b = vec3(0.0);

float rF = abs(aX.w) > 1.5 ? 0.0 : aX.w;
if (abs(determinant) > 1e-12) {
vec3 dt = (dp1 * oX.y - dp2 * oW.y) / determinant;
vec3 db = (dp2 * oW.x - dp1 * oX.x) / determinant;
if (dot(t, t) < 1e-8) { t = dt; }
if (rF == 0.0) { rF = (dot(cross(normal, dt), db) < 0.0 ? -1.0 : 1.0); }
}
t -= normal * dot(normal, t);
if (dot(t, t) < 1e-8) {
float iI = (normal.z >= 0.0 ? 1.0 : -1.0);
float cL = -1.0 / (iI + normal.z);
float xy = normal.x * normal.y * cL;
t = vec3(1.0 + iI * normal.x * normal.x * cL, iI * xy, -iI * normal.x);
b = vec3(xy, iI + normal.y * normal.y * cL, -normal.y);
}
else { t = normalize(t); b = normalize(cross(normal, t)); }
return mat2x3(t, b * (rF < 0.0 ? -1.0 : 1.0));
}

void hH(inout SurfaceInteraction si, fP tri, vec3 barycentric, ivec3 index) {
si.hit = true;
si.position = barycentric.x * tri.p0 + barycentric.y * tri.p1 + barycentric.z * tri.p2;
ivec2 i0 = hd(index.x, vertexColumns);
ivec2 i1 = hd(index.y, vertexColumns);
ivec2 i2 = hd(index.z, vertexColumns);
si.vertexColor = vec3(1.0);
#ifdef USE_VERTEX_COLOR
si.vertexColor = barycentric.x * texelFetch(colorBuffer, i0, 0).rgb
+ barycentric.y * texelFetch(colorBuffer, i1, 0).rgb
+ barycentric.z * texelFetch(colorBuffer, i2, 0).rgb;
#endif

vec3 n0 = texelFetch(normalBuffer, i0, 0).xyz;
vec3 n1 = texelFetch(normalBuffer, i1, 0).xyz;
vec3 n2 = texelFetch(normalBuffer, i2, 0).xyz;
vec3 normal = normalize(barycentric.x * n0 + barycentric.y * n1 + barycentric.z * n2);
si.vertexNormal = normal;





vec3 geometricNormal = normalize(cross(tri.p1 - tri.p0, tri.p2 - tri.p0));
vec3 kR = barycentric.x * n0 + barycentric.y * n1 + barycentric.z * n2;
float a = dot(n2 - n0, tri.p0 - tri.p2);
float b = dot(n2 - n1, tri.p1 - tri.p2);
float c = dot(n1 - n0, tri.p1 - tri.p0);
float h = a * barycentric.x * (barycentric.x - 1.0)
+ (a + b + c) * barycentric.x * barycentric.y
+ b * barycentric.y * (barycentric.y - 1.0);
if (dot(kR, geometricNormal) > 0.0) {
float h0 = max(max(dot(tri.p1 - tri.p0, n0), dot(tri.p2 - tri.p0, n0)), 0.0);
float h1 = max(max(dot(tri.p0 - tri.p1, n1), dot(tri.p2 - tri.p1, n1)), 0.0);
float h2 = max(max(dot(tri.p0 - tri.p2, n2), dot(tri.p1 - tri.p2, n2)), 0.0);
h0 = max(dot(tri.p0 - si.position, n0) + h0, 0.0);
h1 = max(dot(tri.p1 - si.position, n1) + h1, 0.0);
h2 = max(dot(tri.p2 - si.position, n2) + h2, 0.0);
h = max(min(min(h0, h1), h2), h * 0.5);
}
else {
float h0 = max(max(dot(tri.p0 - tri.p1, n0), dot(tri.p0 - tri.p2, n0)), 0.0);
float h1 = max(max(dot(tri.p1 - tri.p0, n1), dot(tri.p1 - tri.p2, n1)), 0.0);
float h2 = max(max(dot(tri.p2 - tri.p0, n2), dot(tri.p2 - tri.p1, n2)), 0.0);
h0 = max(dot(si.position - tri.p0, n0) + h0, 0.0);
h1 = max(dot(si.position - tri.p1, n1) + h1, 0.0);
h2 = max(dot(si.position - tri.p2, n2) + h2, 0.0);
h = min(-min(min(h0, h1), h2), h * 0.5);
}
si.shadowOffset = kR * h;


ivec4 m0 = ivec4(texelFetch(materialIndexBuffer, i0, 0));
ivec4 m1 = ivec4(texelFetch(materialIndexBuffer, i1, 0));
ivec4 m2 = ivec4(texelFetch(materialIndexBuffer, i2, 0));

if (m0.x > 0 || m1.x > 0 || m2.x > 0) {
si.materialIndex = fF(m0, m1, m2, barycentric);
}

vec2 uv0 = texelFetch(uvBuffer, i0, 0).xy;
vec2 uv1 = texelFetch(uvBuffer, i1, 0).xy;
vec2 uv2 = texelFetch(uvBuffer, i2, 0).xy;
#if defined(NUM_DIFFUSE_MAPS) || defined(NUM_NORMAL_MAPS) || defined(NUM_METALLIC_ROUGHNESS_MAPS) || defined(NUM_ROUGHNESS_MAPS) || defined(NUM_METALNESS_MAPS) || defined(NUM_EMISSIVE_MAPS) || defined(NUM_THIN_FILM_MAPS) || defined(NUM_ANISOTROPY_MAPS) || defined(NUM_COAT_NORMAL_MAPS)
vec2 uv = barycentric.x * uv0 + barycentric.y * uv1 + barycentric.z * uv2;
vec2 secondaryUv0 = texelFetch(uv1Buffer, i0, 0).xy;
vec2 secondaryUv1 = texelFetch(uv1Buffer, i1, 0).xy;
vec2 secondaryUv2 = texelFetch(uv1Buffer, i2, 0).xy;
vec2 dj = barycentric.x * secondaryUv0
+ barycentric.y * secondaryUv1
+ barycentric.z * secondaryUv2;

vec4 mw = fetchMatData(si.materialIndex * MAT_DATA_SIZE + MAT_ROW_UV);
int uvProjection = int(mw.r);
if (uvProjection > 0) {
uv = gU(uvProjection, si.position, normal, mw.zw);
dj = uv;
} else {
uv *= mw.zw;
dj *= mw.zw;
}
#else
vec2 uv = vec2(0.0);
vec2 dj = vec2(0.0);
#endif

#ifdef USE_COAT_NORMAL_FRAMES
si.coatNormal = normal;
#ifdef NUM_COAT_NORMAL_MAPS
float pQ = fetchMatData(si.materialIndex * MAT_DATA_SIZE + MAT_ROW_LAYER_MAPS).z;
#endif
#endif
vec4 directionMaterial = fetchMatData(si.materialIndex * MAT_DATA_SIZE + MAT_ROW_DIRECTION_NORMAL);
float uL = fetchMatData(si.materialIndex * MAT_DATA_SIZE + MAT_ROW_FILM_TEXTURE).x;
if (directionMaterial.x >= 0.0 || directionMaterial.y != 0.0 || uL != 0.0
#ifdef USE_COAT_NORMAL_FRAMES
|| fetchMatData(si.materialIndex * MAT_DATA_SIZE + MAT_ROW_COAT).w > 0.0
#endif
) {
vec3 dp1 = tri.p0 - tri.p2;
vec3 dp2 = tri.p1 - tri.p2;
vec4 aX = vec4(0.0);
#ifdef USE_TANGENT
aX = barycentric.x * texelFetch(tangentBuffer, i0, 0)
+ barycentric.y * texelFetch(tangentBuffer, i1, 0)
+ barycentric.z * texelFetch(tangentBuffer, i2, 0);
#endif
mat2x3 fc = eP(normal, dp1, dp2, uv0-uv2, uv1-uv2, aX);
si.geometryTangent = fc[0];
si.geometryBitangent = fc[1];
mat2x3 gm = fc;
#ifdef NUM_ANISOTROPY_MAPS
if (directionMaterial.x >= 0.0 && mapUvChannel[int(directionMaterial.x)] > 0.5) {
vec2 a = texelFetch(uv1Buffer, i0, 0).xy;
vec2 b = texelFetch(uv1Buffer, i1, 0).xy;
vec2 c = texelFetch(uv1Buffer, i2, 0).xy;
gm = eP(normal, dp1, dp2, a-c, b-c, (aX.w == 0.0 ? vec4(0.0) : aX));
}
#endif
si.directionTangent = gm[0];
si.directionBitangent = gm[1];
#if defined(USE_COAT_NORMAL_FRAMES) && defined(NUM_COAT_NORMAL_MAPS)
if (pQ >= 0.0) {
int lg = int(pQ);
mat2x3 mU = fc;
if (mapUvChannel[lg] > 0.5) {
vec2 a = texelFetch(uv1Buffer, i0, 0).xy;
vec2 b = texelFetch(uv1Buffer, i1, 0).xy;
vec2 c = texelFetch(uv1Buffer, i2, 0).xy;
mU = eP(normal, dp1, dp2, a-c, b-c,
aX.w == 0.0 ? vec4(0.0) : aX);
}
vec3 decoded = sampleMap(lg, getMapUvSet(lg, uv, dj)).rgb * 2.0 - 1.0;
vec3 mapped = mU[0] * decoded.x * directionMaterial.z
+ mU[1] * decoded.y * directionMaterial.w + normal * decoded.z;
if (dot(mapped, mapped) > 1e-12) { si.coatNormal = normalize(mapped); }
}
#endif
}

si.uv = uv;
si.uv1 = dj;

#ifdef USE_TANGENT
vec3 t0 = texelFetch(tangentBuffer, i0, 0).xyz;
vec3 t1 = texelFetch(tangentBuffer, i1, 0).xyz;
vec3 t2 = texelFetch(tangentBuffer, i2, 0).xyz;
si.tangent = normalize(barycentric.x * t0 + barycentric.y * t1 + barycentric.z * t2);
#endif
#if defined(NUM_NORMAL_MAPS)
vec3 dp1 = tri.p0 - tri.p2;
vec3 dp2 = tri.p1 - tri.p2;
vec2 oW = uv0 - uv2;
vec2 oX = uv1 - uv2;
si.normal = pd(
si.materialIndex, uv, normal, dp1, dp2, oW, oX
);
#else
si.normal = normal;
#endif
}

struct eK {
float t;
vec3 barycentric;
};

vec4 dJ(int i) {
return lm(bvhBuffer, i, bvhColumns);
}

vec4 bF(int i) {
return lm(instancesBuffer, i, instancesColumns);
}



uint rY(uint value) {
value -= (value >> 1u) & 0x55555555u;
value = (value & 0x33333333u) + ((value >> 2u) & 0x33333333u);
value = (value + (value >> 4u)) & 0x0f0f0f0fu;
return (value * 0x01010101u) >> 24u;
}

vec4 fp(uint mE) {
return vec4(
float(mE & 0xffu),
float((mE >> 8u) & 0xffu),
float((mE >> 16u) & 0xffu),
float(mE >> 24u)
) / 255.0;
}




eK ga(vec3 o, vec3 d, fP tri, int eq, vec3 gY, float tMax) {
eK ti;


vec3 p0t = tri.p0 - o;
vec3 p1t = tri.p1 - o;
vec3 p2t = tri.p2 - o;


if (eq == 0) {
p0t = p0t.yzx;
p1t = p1t.yzx;
p2t = p2t.yzx;
} else if (eq == 1) {
p0t = p0t.zxy;
p1t = p1t.zxy;
p2t = p2t.zxy;
}


p0t.xy += gY.xy * p0t.z;
p1t.xy += gY.xy * p1t.z;
p2t.xy += gY.xy * p2t.z;


vec3 e = vec3(
p1t.x * p2t.y - p1t.y * p2t.x,
p2t.x * p0t.y - p2t.y * p0t.x,
p0t.x * p1t.y - p0t.y * p1t.x
);

#ifdef DEPTH_QUERY_MODE
vec3 sF = abs(vec3(p1t.x * p2t.y, p2t.x * p0t.y, p0t.x * p1t.y))
+ abs(vec3(p1t.y * p2t.x, p2t.y * p0t.x, p0t.y * p1t.x));
e = mix(e, vec3(0.0), lessThanEqual(abs(e), sF * 1e-6));
#endif


if (any(lessThan(e, vec3(0))) && any(greaterThan(e, vec3(0)))) {
return ti;
}

float det = e.x + e.y + e.z;
#ifdef DEPTH_QUERY_MODE
if (det == 0.0) return ti;
#endif

p0t.z *= gY.z;
p1t.z *= gY.z;
p2t.z *= gY.z;
float sw = (e.x * p0t.z + e.y * p1t.z + e.z * p2t.z);


if (abs(sw) > abs(tMax * det)) {
return ti;
}

float tN = 1. / det;
ti.t = sw * tN;
ti.barycentric = e * tN;

return ti;
}

struct Box {
vec3 min;
vec3 max;
};


vec3 fo(vec3 d) {
#ifdef DEPTH_QUERY_MODE
vec3 aq = mix(d, mix(vec3(1e-20), vec3(-1e-20), lessThan(d, vec3(0.0))), lessThan(abs(d), vec3(1e-20)));
return 1.0 / aq;
#else
return 1.0 / d;
#endif
}

vec3 fk(vec3 gr, vec3 o) {
#ifdef DEPTH_QUERY_MODE
return abs(gr) * max(vec3(1.0), abs(o)) * 1e-6;
#else
return vec3(0.0);
#endif
}



float cU(vec3 o, vec3 d, vec3 xq, vec3 xp, float tMax) {
#ifdef DEPTH_QUERY_MODE
vec3 gr = fo(d);
vec3 wG = (xq - o) * gr;
vec3 wI = (xp - o) * gr;
vec3 padding = fk(gr, o);
#else
vec3 wG = (xq - o) / d;
vec3 wI = (xp - o) / d;
vec3 padding = vec3(0.0);
#endif
vec3 nJ = min(wG, wI) - padding;
vec3 sY = max(wG, wI) + padding;
float t0 = max(nJ.x, max(nJ.y, nJ.z));
float t1 = min(sY.x, min(sY.y, sY.z));

return (t0 > t1 || t0 > tMax) ? -1.0 : (t0 > 0.0 ? t0 : t1);
}

int maxDimension(vec3 v) {
return v.x > v.y ? (v.x > v.z ? 0 : 2) : (v.y > v.z ? 1 : 2);
}

vec3 nk(vec3 d, int eq) {


if (eq == 0) {
return vec3(-d.y, -d.z, 1.0) / d.x;
} else if (eq == 1) {
return vec3(-d.z, -d.x, 1.0) / d.y;
} else {
return vec3(-d.x, -d.y, 1.0) / d.z;
}
}


void intersectScene(in Ray ray, inout SurfaceInteraction si, bool doubleSided) {
si.hit = false;

if (isEmptyScene) {
return;
}

int eq = maxDimension(abs(ray.d));
vec3 gY = nk(ray.d, eq);
int ap;

${xr(he`
si.triangleIndex = triangleIndex;
mk = tri;
hS = faceNormal;
aC = hit.barycentric;
hK = index;
sj = true;
ap = bY;
`)}

if (sj) {
si.instanceIndex = ap;
si.materialIndex = int(ah(floatBitsToInt(bF(ap * ${te}).z)).x);

hH(si, mk, aC, hK);
mat4 l2w = mat4(
bF(ap * ${te} + 5),
bF(ap * ${te} + 6),
bF(ap * ${te} + 7),
bF(ap * ${te} + 8)
);
mat4 w2l = mat4(
bF(ap * ${te} + 1),
bF(ap * ${te} + 2),
bF(ap * ${te} + 3),
bF(ap * ${te} + 4)
);
mat3 aH = transpose(mat3(w2l));
si.faceNormal = normalize(aH * hS);
si.vertexNormal = normalize(aH * si.vertexNormal);
si.normal = normalize(aH * si.normal);
#ifdef USE_COAT_NORMAL_FRAMES
si.coatNormal = normalize(aH * si.coatNormal);
#endif
#ifdef USE_TANGENT
if (dot(si.tangent, si.tangent) > 0.0) {
si.tangent = normalize(mat3(l2w) * si.tangent);
}
#endif
si.shadowOffset = (l2w * vec4(si.shadowOffset, 0.0)).xyz;
si.directionTangent = mat3(l2w) * si.directionTangent;
si.directionBitangent = mat3(l2w) * si.directionBitangent;
si.geometryTangent = mat3(l2w) * si.geometryTangent;
si.geometryBitangent = mat3(l2w) * si.geometryBitangent;
si.position = (l2w * vec4(si.position, 1.0)).xyz;
}
}


void intersectSceneBevel(in Ray ray, inout SurfaceInteraction si, int instanceIndex, float maxDistance) {
si.hit = false;

if (isEmptyScene) {
return;
}

bool doubleSided = true;
int eq = maxDimension(abs(ray.d));
vec3 gY = nk(ray.d, eq);
int ap;

${xr(he`
si.triangleIndex = triangleIndex;
mk = tri;
hS = faceNormal;
aC = hit.barycentric;
hK = index;
sj = true;
ap = bY;
`,he`
if (bY != instanceIndex) {
continue;
}
`,"maxDistance")}

if (sj) {
si.instanceIndex = ap;
si.materialIndex = int(ah(floatBitsToInt(bF(ap * ${te}).z)).x);
hH(si, mk, aC, hK);
mat4 l2w = mat4(
bF(ap * ${te} + 5),
bF(ap * ${te} + 6),
bF(ap * ${te} + 7),
bF(ap * ${te} + 8)
);
mat4 w2l = mat4(
bF(ap * ${te} + 1),
bF(ap * ${te} + 2),
bF(ap * ${te} + 3),
bF(ap * ${te} + 4)
);
mat3 aH = transpose(mat3(w2l));
si.faceNormal = normalize(aH * hS);
si.vertexNormal = normalize(aH * si.vertexNormal);
si.normal = normalize(aH * si.normal);
#ifdef USE_COAT_NORMAL_FRAMES
si.coatNormal = normalize(aH * si.coatNormal);
#endif
#ifdef USE_TANGENT
if (dot(si.tangent, si.tangent) > 0.0) {
si.tangent = normalize(mat3(l2w) * si.tangent);
}
#endif
si.shadowOffset = (l2w * vec4(si.shadowOffset, 0.0)).xyz;
si.directionTangent = mat3(l2w) * si.directionTangent;
si.directionBitangent = mat3(l2w) * si.directionBitangent;
si.geometryTangent = mat3(l2w) * si.geometryTangent;
si.geometryBitangent = mat3(l2w) * si.geometryBitangent;
si.position = (l2w * vec4(si.position, 1.0)).xyz;
}
}

bool intersectSceneShadow(in Ray ray, float lightDistance, int kn) {

if (isEmptyScene) {
return false;
}

bool doubleSided = true;
int eq = maxDimension(abs(ray.d));
vec3 gY = nk(ray.d, eq);

${xr(he`


bool jS = true;
vec3 barycentric = hit.barycentric;
vec3 position = barycentric.x * tri.p0 + barycentric.y * tri.p1 + barycentric.z * tri.p2;

if (jS) {
#ifdef HAS_ALPHA
int materialIndex = int(ah(floatBitsToInt(bF(bY * ${te}).z)).x);
ivec2 i0 = hd(index.x, vertexColumns);
ivec2 i1 = hd(index.y, vertexColumns);
ivec2 i2 = hd(index.z, vertexColumns);
ivec4 m0 = ivec4(texelFetch(materialIndexBuffer, i0, 0));
ivec4 m1 = ivec4(texelFetch(materialIndexBuffer, i1, 0));
ivec4 m2 = ivec4(texelFetch(materialIndexBuffer, i2, 0));

if (m0.x > 0 || m1.x > 0 || m2.x > 0) {
materialIndex = fF(m0, m1, m2, barycentric);
}

int ii = materialIndex * MAT_DATA_SIZE;
int mapAlphaUsage = int(fetchMatData(ii + MAT_ROW_MISC).a);
float alpha = fetchMatData(ii + MAT_ROW_ALPHA_FILM).r;
#ifdef NUM_DIFFUSE_MAPS
if (mapAlphaUsage == ${Pi.alpha+""}) {
int diffuseMapIndex = int(fetchMatData(ii + MAT_ROW_METALLIC_MAPS).z);
if (diffuseMapIndex >= 0) {
vec2 uv0 = texelFetch(uvBuffer, i0, 0).xy;
vec2 uv1 = texelFetch(uvBuffer, i1, 0).xy;
vec2 uv2 = texelFetch(uvBuffer, i2, 0).xy;
vec2 uv = barycentric.x * uv0 + barycentric.y * uv1 + barycentric.z * uv2;
vec4 mw = fetchMatData(ii + MAT_ROW_UV);
int uvProjection = int(mw.r);
if (uvProjection > 0) {
uv = gU(uvProjection, position, hS, mw.zw);
} else {
uv *= mw.zw;
}

alpha *= sampleMap(diffuseMapIndex, uv).a;
}
}
#endif
#ifdef NUM_ALPHA_MAPS
int alphaMapIndex = int(fetchMatData(ii + MAT_ROW_STANDALONE_MAPS).z);
if (alphaMapIndex >= 0) {
vec2 uv0 = texelFetch(uvBuffer, i0, 0).xy;
vec2 uv1 = texelFetch(uvBuffer, i1, 0).xy;
vec2 uv2 = texelFetch(uvBuffer, i2, 0).xy;
vec2 uv = barycentric.x * uv0 + barycentric.y * uv1 + barycentric.z * uv2;
vec4 mw = fetchMatData(ii + MAT_ROW_UV);
int uvProjection = int(mw.r);
if (uvProjection > 0) {
uv = gU(uvProjection, position, hS, mw.zw);
} else {
uv *= mw.zw;
}
alpha *= sampleMap(alphaMapIndex, uv).g;
}
#endif
float alphaCutoff = fetchMatData(ii + MAT_ROW_STANDALONE_MAPS).a;
alpha = mb(
alpha, int(fetchMatData(ii + MAT_ROW_ALPHA).w), alphaCutoff
);
if (eC(0u) > alpha) {

tMax = min(max(lightDistance, 0.0), RAY_MAX_DISTANCE);
jS = false;
}
#endif
}
if (jS) {
return true;
}
`,he`
if (triangleIndex == kn) {
continue;
}
`,"min(max(lightDistance, 0.0), RAY_MAX_DISTANCE)")}
return false;
}
`}),Ga=he`
vec2 sphericalProjection(vec3 pos) {
vec3 n = normalize(pos);
float theta = atan(n.x, n.z) / (2.0 * PI) + 0.5;
float phi = acos(n.y) / PI;
return vec2(theta, 1.0 - phi);
}

vec2 jh(vec3 pos, vec3 normal, vec2 uvScale) {
vec3 dI = abs(normal);
vec2 uv = vec2(0.0);
if (dI.x > dI.y && dI.x > dI.z) {
uv = pos.yz;
} else if (dI.y > dI.x && dI.y > dI.z) {
uv = pos.xz;
} else {
uv = pos.xy;
}
return fract(uv * uvScale);
}

































vec2 hT(vec3 pos, vec3 normal) {
float theta = atan(pos.z, pos.x) / (2.0 * PI) + 0.5;
return vec2(theta, pos.y);
}

vec2 gU(int fE, vec3 pos, vec3 normal, vec2 uvScale) {
if (fE == ${xt.triplanar+""}) {
return jh(pos, normal, uvScale);
} else if (fE == ${xt.spherical+""}) {
return sphericalProjection(pos) * uvScale;
} else if (fE == ${xt.cylindrical+""}) {
return hT(pos, normal) * uvScale;
}
return vec2(0.0);
}
`,Gm=`
uint reverseBits(uint x) {
x = ((x & 0x55555555u) << 1u) | ((x >> 1u) & 0x55555555u);
x = ((x & 0x33333333u) << 2u) | ((x >> 2u) & 0x33333333u);
x = ((x & 0x0f0f0f0fu) << 4u) | ((x >> 4u) & 0x0f0f0f0fu);
x = ((x & 0x00ff00ffu) << 8u) | ((x >> 8u) & 0x00ff00ffu);
return (x << 16u) | (x >> 16u);
}

const uint CAMERA_PIXEL = 0u;
const uint CAMERA_LENS = 1u;
const uint CAMERA_WAVELENGTH = 2u;
const uint CAMERA_BEVEL_BASE = 3u;
const uint LIGHT_SELECT = 0u;
const uint LIGHT_POSITION = 1u;
const uint BSDF_LOBE = 2u;
const uint BSDF_DIRECTION = 3u;
const uint MEDIUM_CHANNEL = 4u;
const uint MEDIUM_DISTANCE = 5u;
const uint PHASE_DIRECTION = 6u;
const uint RUSSIAN_ROULETTE = 7u;
const uint BOUNCE_STRIDE = 64u;



uvec2 aZ;
uint aQ;
uint bT = 0u;
uint cP = 0u;
uint dG(uint kW) {
uint x = kW;
x ^= x >> 16u; x *= 0x7feb352du;
x ^= x >> 15u; x *= 0x846ca68bu;
return x ^ (x >> 16u);
}
uint ar(uint a, uint b) {
return dG(a ^ dG(b + 0x9e3779b9u));
}
uint iV(uint kW, uint seed) {
uint x = kW + seed;
x ^= x * 0x6c50b47cu; x ^= x * 0xb82f1e52u;
x ^= x * 0xc7afe638u; x ^= x * 0x8d22f6e6u;
return x;
}
uint ua(uint x, uint seed) {
return reverseBits(iV(reverseBits(x), seed));
}

uint su(uint kW) {
uint r = reverseBits(kW);
${gc.map(([i,e])=>`r ^= (r << ${i}u) & 0x${e.toString(16)}u;`).join(`
  `)}
return r;
}
vec2 xE(uint index, uint seed) {
uint i = ua(index, ar(seed, 0u));
uint x = reverseBits(iV(i, ar(seed, 1u)));
uint y = ua(su(i), ar(seed, 2u));
return vec2(float(x >> 8u), float(y >> 8u)) * (1.0 / 16777216.0);
}
uint uR(uvec2 p) {
uvec2 v = p & uvec2(255u);
v = (v | (v << uvec2(4u))) & uvec2(0x0f0fu);
v = (v | (v << uvec2(2u))) & uvec2(0x3333u);
v = (v | (v << uvec2(1u))) & uvec2(0x5555u);
return v.x | (v.y << 1u);
}
${mc.map((i,e)=>`const uint Z_PERM_${e} = ${i}u;`).join(`
`)}
uint la(uint uU) {
uint group = uU >> 2u;
uint word = Z_PERM_5;
${[0,1,2,3,4].map(i=>`word = group == ${i}u ? Z_PERM_${i} : word;`).join(`
  `)}
return (word >> ((uU & 3u) * 8u)) & 255u;
}
uint qS(uint lu, uint dim, uint logSPP) {
uint odd = logSPP & 1u;
uint vN = 8u + ((logSPP + 1u) >> 1u);
uint result = 0u;
for (int digit = int(vN) - 1; digit >= int(odd); digit--) {
uint shift = 2u*uint(digit) - odd;

uint tL = 0u;
if (shift < 30u) { tL = lu >> (shift + 2u); }
uint uU = (dG(tL ^ (0x55555555u * dim)) >> 24u) % 24u;
uint d = (lu >> shift) & 3u;
result |= ((la(uU) >> (2u*d)) & 3u) << shift;
}
if (odd != 0u) {
result |= (lu & 1u) ^ (dG((lu >> 1u) ^ (0x55555555u * dim)) & 1u);
}
return result;
}



uint cE(uint slot) {
return CAMERA_BEVEL_BASE + uint(BEVEL_SAMPLES) + bT * BOUNCE_STRIDE + slot;
}

uvec4 hA;
uint hB;
bool fQ = false;
bool dv = false;
uint dQ;
uint gK;
vec2 fa;
void dN(uint dim) {

uint kI = aZ.x + aZ.y * uint(round(1.0 / pixelSize.x));
uvec4 key = uvec4(dim, aQ, kI, uint(sequenceSeed));
if (fQ && all(equal(hA, key)) && hB == uint(zSobolLogSPP)) { return; }
hA = key; hB = uint(zSobolLogSPP);
fQ = true; dv = false;
uint seed = ar(ar(kI, dim), uint(sequenceSeed));
uint index = aQ;
if (samplingPattern == 1) {
uint logSPP = uint(zSobolLogSPP);
if (index == 0u) { logSPP = 0u; }
else { index -= 1u; }

uint jw = index >> logSPP;
uint mask = (1u << logSPP) - 1u;
uint lu = (uR(aZ) << logSPP) | (index & mask);
index = qS(lu, dim, logSPP);
uvec2 tile = aZ >> uvec2(8u);
seed = ar(ar(dim, uint(sequenceSeed)), ar(tile.x, tile.y));

if (aQ != 0u) { jw += 1u; }
seed = ar(seed, jw);
}
dQ = ua(index, ar(seed, 0u));
gK = seed;
uint x = reverseBits(iV(dQ, ar(seed, 1u)));
fa.x = float(x >> 8u) * (1.0 / 16777216.0);
}
vec2 lC(uint dim) {
dN(dim);
if (!dv) {
uint y = ua(su(dQ), ar(gK, 2u));
fa.y = float(y >> 8u) * (1.0 / 16777216.0);
dv = true;
}
return EPS + (1.0 - 2.0*EPS) * fa;
}
float dp(uint dim) {
if (samplingPattern == 2) { return EPS + (1.0 - 2.0*EPS)*rand(); }
dN(dim);
return EPS + (1.0 - 2.0*EPS) * fa.x;
}
vec2 dZ(uint dim) {
if (samplingPattern == 2) {
float x = dp(dim); float y = dp(dim);
return vec2(x,y);
}
return lC(dim);
}

float eC(uint slot) {
uint dim = ar(ar(bT, slot), cP) | 0x80000000u;
cP += 1u;
if (samplingPattern == 2) { return EPS + (1.0 - 2.0*EPS)*rand(); }

uint kI = aZ.x + aZ.y * uint(round(1.0 / pixelSize.x));
uint seed = ar(ar(kI, dim), uint(sequenceSeed));
uint i = ua(aQ, ar(seed, 0u));
uint x = reverseBits(iV(i, ar(seed, 1u)));
return EPS + (1.0 - 2.0*EPS) * (float(x >> 8u) * (1.0 / 16777216.0));
}
`,di=SA({uniforms:{samplingPattern:M.uniform("int",0),sequenceSeed:M.uniform("int",0),zSobolLogSPP:M.uniform("int",0)},main:he`

${Gm}

void rG() {
aZ = uvec2(v_Texcoord / pixelSize);
aQ = uint(sampleCount);
bT = 0u; cP = 0u;
}

vec2 tg() {
if (samplingPattern == 0 || samplingPattern == 1) {
return (dZ(CAMERA_PIXEL) - 0.5) * pixelSize;
}
return jitter;
}
`}),kn=`
Ray fj(vec2 coord) {
vec4 origin = viewProjectionInv * vec4(coord * 2.0 - 1.0, -1.0, 1.0);
vec4 target = viewProjectionInv * vec4(coord * 2.0 - 1.0, 1.0, 1.0);
Ray cam;
gC(cam, origin.xyz / origin.w, normalize(target.xyz * origin.w - origin.xyz * target.w));

return cam;
}

vec2 kN(vec2 p) {
p = 2.0 * p - 1.0;
bool greater = abs(p.x) > abs(p.y);
float r = greater ? p.x : p.y;
float theta = greater ? 0.25 * PI * p.y / p.x : PI * (0.5 - 0.25 * p.x / p.y);
return r * vec2(cos(theta), sin(theta));
}

Ray oG() {
Ray cam = fj(v_Texcoord + tg());
if (cameraApertureRadius > 0.0) {

vec3 eye = viewInv[3].xyz;
vec3 forward = -normalize(viewInv[2].xyz);
vec3 jN = eye + cam.d * (cameraFocusDistance / dot(cam.d, forward));
vec2 sK = cameraApertureRadius * kN(dZ(CAMERA_LENS));
vec3 origin = vec3(viewInv * vec4(sK, 0.0, 1.0));
gC(cam, origin, normalize(jN - origin));
}
return cam;
}
`,Ha=he`
uvec4 s0;

void gW(vec2 p, int frame) {

s0 = uvec4(p, uint(frame), uint(p.x) + uint(p.y));
}


void xd(inout uvec4 v) {
v = v * 1664525u + 1013904223u;
v.x += v.y*v.w; v.y += v.z*v.x; v.z += v.x*v.y; v.w += v.y*v.z;
v = v ^ (v>>16u);
v.x += v.y*v.w; v.y += v.z*v.x; v.z += v.x*v.y; v.w += v.y*v.z;
}

float rand() {
xd(s0); return float(s0.x)/float(0xffffffffu);
}

`,Hm=`
uint ke(int index) { ivec2 size = textureSize(aovScene,0); uvec4 v = texelFetch(aovScene, ivec2((index/4)%size.x, (index/4)/size.x),0); return v[index%4]; }
vec3 iN(int offset){return vec3(uintBitsToFloat(ke(offset)),uintBitsToFloat(ke(offset+1)),uintBitsToFloat(ke(offset+2)));}
mat4 ow(int offset) { mat4 m; for (int i=0;i<4;i++) for(int j=0;j<4;j++) m[i][j]=uintBitsToFloat(ke(offset+i*4+j)); return m; }
Ray wJ(vec2 uv) {
vec4 origin = viewProjectionInv*vec4(uv*2.0-1.0,-1.0,1.0);
vec4 target = viewProjectionInv*vec4(uv*2.0-1.0,1.0,1.0);
Ray ray; gC(ray, origin.xyz/origin.w, normalize(target.xyz*origin.w-origin.xyz*target.w)); return ray;
}
bool mQ(Ray wX, out SurfaceInteraction si, out OpenPbrResolvedMaterial material) {
Ray ray=wX; si.triangleIndex=-1;
for(int layer=0;layer<32;layer++) {
intersectScene(ray,si,false); if(!si.hit) return false;
dg(material,si.materialIndex,si.uv,si.uv1,si.instanceIndex,si.vertexColor);
if(material.materialType!=SHADOW_CATCHER && material.alpha>=0.5) return true;
ray.o=si.position+ray.d*(EPS*0.02);
}
return false;
}
`;function mo(i){const e=new ut({name:i?"AOV center":"AOV accumulation",outputs:i?["id","motion"]:["geometry","position","diffuse","specular"],outputTypes:i?{id:"uvec4"}:{},defines:{DEPTH_QUERY_MODE:!0},includes:[ci,fi,ui,di],uniforms:{viewProjectionInv:M.uniform("mat4"),viewInv:M.uniform("mat4"),cameraApertureRadius:M.uniform("float",0),cameraFocusDistance:M.uniform("float",10),viewportSize:M.uniform("vec2"),aovScene:M.uniform("usampler2D"),previousId:M.uniform("usampler2D"),previousMotion:M.uniform("sampler2D"),previousGeometry:M.uniform("sampler2D"),previousPosition:M.uniform("sampler2D"),previousDiffuse:M.uniform("sampler2D"),previousSpecular:M.uniform("sampler2D"),openPbrEnergyLut:M.uniform("sampler2D"),aovMask:M.uniform("int",0),aovSample:M.uniform("int",0)},main:`
${Na}
${Ha}
${di.main}
${ci.main}
${Ga}
${fi.main}
${ui.main}
${kn}
${i?"":zn+Wc+Nm}
${Hm}
void main() {
${i?`
out_id=uvec4(0xffffffffu); out_motion=vec4(0.0);
Ray ray=wJ((floor(gl_FragCoord.xy)+0.5)/viewportSize);
SurfaceInteraction si; OpenPbrResolvedMaterial material;
if(!mQ(ray,si,material)) return;
int offset=52+si.instanceIndex*24;
out_id=uvec4(ke(offset),ke(offset+1),ke(int(ke(16))+si.materialIndex),ke(int(ke(17))+si.triangleIndex));
out_motion.z=dot(si.position-iN(36),iN(40));
if(ke(offset+2)==0u)return;
vec4 qA=ow(offset+4)*vec4(si.position,1.0);
vec4 ps=ow(0)*qA;
if(ps.w<=0.0)return;
vec3 tX=ps.xyz/ps.w;vec2 iz=(tX.xy*0.5+0.5)*viewportSize;
if(any(lessThan(iz,vec2(0.0)))||any(greaterThanEqual(iz,viewportSize))||abs(tX.z)>1.0)return;
uvec4 identity=texelFetch(previousId,ivec2(iz),0);float qz=texelFetch(previousMotion,ivec2(iz),0).z;
if(any(notEqual(identity.xy,out_id.xy))||abs(qz-dot(qA.xyz-iN(44),iN(48)))>max(1e-4,abs(qz)*1e-3))return;
out_motion=vec4((iz-gl_FragCoord.xy)*vec2(1.0,-1.0),out_motion.z,3.0);
`:`
ivec2 coord=ivec2(gl_FragCoord.xy);
out_geometry=aovSample==0 ? vec4(0.0) : texelFetch(previousGeometry,coord,0);
out_position=aovSample==0 ? vec4(0.0) : texelFetch(previousPosition,coord,0);
out_diffuse=aovSample==0 ? vec4(0.0) : texelFetch(previousDiffuse,coord,0);
out_specular=aovSample==0 ? vec4(0.0) : texelFetch(previousSpecular,coord,0);
rG(); aZ=uvec2(floor(gl_FragCoord.xy));
gW(floor(gl_FragCoord.xy),int(aQ ^ dG(uint(sequenceSeed))));
Ray ray=wJ((floor(gl_FragCoord.xy)+dZ(CAMERA_PIXEL))/viewportSize);
if(cameraApertureRadius>0.0) {
vec3 eye=viewInv[3].xyz, forward=-normalize(viewInv[2].xyz);
vec3 jN=eye+ray.d*(cameraFocusDistance/dot(ray.d,forward));
vec2 xU=cameraApertureRadius*kN(dZ(CAMERA_LENS));
vec3 origin=(viewInv*vec4(xU,0.0,1.0)).xyz;
gC(ray,origin,normalize(jN-origin));
}
SurfaceInteraction si; OpenPbrResolvedMaterial material;
if(!mQ(ray,si,material)) return;
float depth=max(dot(si.position-viewInv[3].xyz,-normalize(viewInv[2].xyz)),0.0);
bool unsupported=material.materialType!=STANDARD || material.alpha<1.0 || material.coatWeight>0.0 || material.fuzzWeight>0.0 || material.specularAnisotropy>0.0 || material.subsurfaceWeight>0.0 || dot(material.mediumScattering,material.mediumScattering)>0.0 || material.bevel>0.0 || material.thinFilmWeight>0.0 || material.transmissionDispersionScale>0.0;
out_geometry+=vec4(depth,material.specularRoughness,material.baseMetalness,unsupported?1.0:0.0);
#ifdef AOV_REFLECTANCE
if((aovMask&24)!=0 && !unsupported){
vec3 normal=si.normal,face=si.faceNormal;float cosine=-dot(normal,ray.d),fu=-dot(face,ray.d);
if(material.thinWalled&&(material.transmissionWeight>0.0||material.subsurfaceWeight>0.0)){
if(cosine<0.0){normal=-normal;cosine=-cosine;}if(fu<0.0){face=-face;fu=-fu;}
}
if(fu>=0.0&&cosine<0.0){normal=face;cosine=fu;}
if(cosine<0.0)normal=-normal;
material.inside=cosine<=0.0&&!material.thinWalled;material.relativeIor=cosine>0.0?1.0/material.specularIor:material.specularIor;
vec3 tangent=vec3(0.0);
#ifdef USE_TANGENT
tangent=si.tangent;
#endif
ag prepared=ds(tangent,material,-ray.d,normal);
vec3 diffuse,specular;aovReflectance(prepared,(aovMask&8)!=0,(aovMask&16)!=0,diffuse,specular);
out_diffuse+=vec4(diffuse,1.0);out_specular+=vec4(specular,1.0);
}
#endif
out_position+=vec4(si.position,1.0);
`}
}
`});return e.parallelCompile=!0,e}const qr=[256,64],jc=[32,1],Jr=[96,192],RA=`#version 300 es
precision highp float;
precision highp int;
precision highp sampler2D;
out vec4 color;
const float PI = 3.14159265358979;
const float R_GROUND = 6360.0;
const float R_TOP = 6460.0;
const float CAMERA_ALTITUDE = 0.2;
const vec3 RAYLEIGH = vec3(5.802e-3, 13.558e-3, 33.1e-3);
const float MIE_SCATTERING = 3.996e-3;
const float MIE_EXTINCTION = 4.44e-3;
const float MIE_G = 0.8;
const vec3 OZONE = vec3(0.65e-3, 1.881e-3, 0.085e-3);
const ivec2 T_SIZE = ivec2(${qr[0]}, ${qr[1]});
const int MS_ALTITUDES = ${jc[0]};
const ivec2 SV_SIZE = ivec2(${Jr[0]}, ${Jr[1]});
uniform vec3 uSun; 
uniform float uTurbidity;
uniform vec3 uAlbedo;


float br(float r, float mu, float radius) { return (radius - r) * (radius + r) + r * r * mu * mu; }
bool np(float r, float mu) { return mu < 0.0 && br(r, mu, R_GROUND) >= 0.0; }
float ll(float r, float mu) { return max(-r * mu - sqrt(max(br(r, mu, R_GROUND), 0.0)), 0.0); }
float jm(float r, float mu) { return max(-r * mu + sqrt(max(br(r, mu, R_TOP), 0.0)), 0.0); }


vec3 oz(float r) {
float h = max(r - R_GROUND, 0.0);
return vec3(exp(-h / 8.0), exp(-h / 1.2) * uTurbidity, max(0.0, 1.0 - abs(h - 25.0) / 15.0));
}
vec3 extinction(vec3 d) { return RAYLEIGH * d.x + MIE_EXTINCTION * d.y + OZONE * d.z; }

float mP(float x) { return x * x * (R_TOP - R_GROUND); }
float hR(float h) { return sqrt(clamp(h / (R_TOP - R_GROUND), 0.0, 1.0)); }


vec3 fh(sampler2D table, vec2 p) {
ivec2 size = textureSize(table, 0);
vec2 q = clamp(p, vec2(0.0), vec2(size - 1));
ivec2 i = min(ivec2(floor(q)), max(size - 2, ivec2(0)));
vec2 f = clamp(q - vec2(i), 0.0, 1.0);
ivec2 j = min(i + 1, size - 1);
vec3 a = texelFetch(table, i, 0).rgb, b = texelFetch(table, ivec2(j.x, i.y), 0).rgb;
vec3 c = texelFetch(table, ivec2(i.x, j.y), 0).rgb, d = texelFetch(table, j, 0).rgb;
return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}
`,Yc=`
uniform sampler2D uTransmittance;
uniform sampler2D uMultiple;
uniform bool uFull;
uniform vec3 uSkyIrradiance;


vec3 fO(float r, float mu) {
return fh(uTransmittance, vec2((clamp(mu, -1.0, 1.0) + 1.0) * 0.5 * float(T_SIZE.x - 1),
hR(r - R_GROUND) * float(T_SIZE.y - 1)));
}

float mW(float nu) {
float g2 = MIE_G * MIE_G;
return 3.0 / (8.0 * PI) * ((1.0 - g2) * (1.0 + nu * nu)) / ((2.0 + g2) * pow(1.0 + g2 - 2.0 * MIE_G * nu, 1.5));
}






void vt(vec3 origin, vec3 dir, int steps, out vec3 radiance, out vec3 throughput) {
float r = length(origin);
float mu = dot(origin, dir) / r;
bool ground = np(r, mu);
float len = ground ? ll(r, mu) : jm(r, mu);
float nu = dot(dir, uSun);
float jv = uFull ? 3.0 / (16.0 * PI) * (1.0 + nu * nu) : 1.0 / (4.0 * PI);
float sn = uFull ? mW(nu) : 1.0 / (4.0 * PI);
radiance = vec3(0.0);
throughput = vec3(0.0);
vec3 view = vec3(1.0);
float previous = 0.0;
for (int i = 0; i < steps; i++) {

float s = float(i + 1) / float(steps);
float next = len * s * s;
float dt = next - previous;
vec3 p = origin + dir * (0.5 * (previous + next));
previous = next;
float pr = length(p);
vec3 d = oz(pr);
vec3 e = extinction(d);
vec3 vb = fO(pr, dot(p, uSun) / pr);
vec3 nG = RAYLEIGH * d.x;
float nF = MIE_SCATTERING * d.y;
vec3 ms = vec3(0.0);
if (uFull) {
float x = hR(pr - R_GROUND) * float(MS_ALTITUDES - 1);
ms = fh(uMultiple, vec2(x, 0.0));
}
vec3 source = vb * (nG * jv + nF * sn) + (nG + nF) * ms;

vec3 st = exp(-e * dt);
vec3 weight = (1.0 - st) / max(e, vec3(1e-9));
radiance += view * source * weight;
throughput += view * (nG + nF) * weight;
view *= st;
}
if (ground) {
vec3 p = origin + dir * len;
float pr = length(p);
float tC = dot(p, uSun) / pr;
vec3 irradiance = fO(pr, tC) * max(tC, 0.0) + uSkyIrradiance;
radiance += view * uAlbedo / PI * irradiance;
}
}
`,Wm=RA+`
void main() {
ivec2 p = ivec2(gl_FragCoord.xy);
float mu = float(p.x) / float(T_SIZE.x - 1) * 2.0 - 1.0;
float r = R_GROUND + mP(float(p.y) / float(T_SIZE.y - 1));
if (np(r, mu)) { color = vec4(0.0, 0.0, 0.0, 1.0); return; }
float len = jm(r, mu);
vec3 depth = vec3(0.0);
const int STEPS = 48;
for (int i = 0; i < STEPS; i++) {
float t = (float(i) + 0.5) / float(STEPS) * len;
depth += extinction(oz(sqrt(t * t + 2.0 * r * mu * t + r * r))) * (len / float(STEPS));
}
color = vec4(exp(-depth), 1.0);
}
`,jm=RA+Yc+`
void main() {
float r = R_GROUND + mP(floor(gl_FragCoord.x) / float(MS_ALTITUDES - 1));
const int DIRECTIONS = 64;
vec3 second = vec3(0.0), qK = vec3(0.0);
for (int i = 0; i < DIRECTIONS; i++) {

float mu = 1.0 - 2.0 * (float(i) + 0.5) / float(DIRECTIONS);
float phi = float(i) * PI * (3.0 - sqrt(5.0));
float s = sqrt(1.0 - mu * mu);
vec3 radiance, throughput;
vt(vec3(0.0, r, 0.0), vec3(s * cos(phi), mu, s * sin(phi)), 20, radiance, throughput);
second += radiance / float(DIRECTIONS);
qK += throughput / float(DIRECTIONS);
}
color = vec4(second / (1.0 - qK), 1.0);
}
`,Nn=`
float qk(float row) {
float x = row / float(SV_SIZE.y - 1) * 2.0 - 1.0;
return sign(x) * x * x * (PI / 2.0);
}
float ik(float e) {
float x = sign(e) * sqrt(abs(e) / (PI / 2.0));
return clamp((x + 1.0) * 0.5, 0.0, 1.0) * float(SV_SIZE.y - 1);
}
`,Ym=RA+Yc+Nn+`
void main() {
ivec2 p = ivec2(gl_FragCoord.xy);
float e = qk(float(p.y));
float phi = float(p.x) / float(SV_SIZE.x - 1) * PI;
vec3 radiance, throughput;
vt(vec3(0.0, R_GROUND + CAMERA_ALTITUDE, 0.0), vec3(cos(e) * cos(phi), sin(e), cos(e) * sin(phi)), 40, radiance, throughput);
color = vec4(radiance, 1.0);
}
`,Vm=RA+Nn+`
uniform sampler2D uTransmittance;
uniform sampler2D uSkyView;
void main() {
vec3 sky = vec3(0.0);
const int ROWS = 128, COLUMNS = 48;
for (int i = 0; i < ROWS; i++) {
float e = (float(i) + 0.5) / float(ROWS) * (PI / 2.0);

float weight = 2.0 * sin(e) * cos(e) * (PI / 2.0 / float(ROWS)) * (PI / float(COLUMNS));
for (int j = 0; j < COLUMNS; j++) {
float phi = (float(j) + 0.5) / float(COLUMNS) * PI;
sky += fh(uSkyView, vec2(phi / PI * float(SV_SIZE.x - 1), ik(e))) * weight;
}
}
if (int(gl_FragCoord.x) == 0) { color = vec4(sky, 1.0); return; }
float r = R_GROUND + CAMERA_ALTITUDE;
vec3 vb = fh(uTransmittance, vec2((uSun.y + 1.0) * 0.5 * float(T_SIZE.x - 1), hR(CAMERA_ALTITUDE) * float(T_SIZE.y - 1)));
vec3 xc = vec3(0.2126, 0.7152, 0.0722);
float horizontal = dot(sky, xc) + dot(vb, xc) * max(uSun.y, 0.0);


const float REFERENCE = ${Hr};
float scale = ${uc} / sqrt(max(horizontal, REFERENCE * 1e-3) * REFERENCE);
color = vec4(vb, scale);
}
`,qm=RA+Nn+`
uniform sampler2D uSkyView;
uniform sampler2D uIrradiance;
uniform vec2 uSize;
uniform float uAzimuth;
uniform vec3 uSunWorld;
uniform float uSunRadius;


vec3 hn(vec2 dk) {
float theta = dk.y / uSize.y * PI;
float phi = dk.x / uSize.x * 2.0 * PI;
return vec3(-sin(theta) * cos(phi), cos(theta), -sin(theta) * sin(phi));
}

void main() {
vec3 dir = hn(gl_FragCoord.xy);
float ek = abs(atan(dir.z, dir.x) - uAzimuth);
ek = min(mod(ek, 2.0 * PI), 2.0 * PI - mod(ek, 2.0 * PI));
float e = asin(clamp(dir.y, -1.0, 1.0));
vec3 radiance = fh(uSkyView, vec2(ek / PI * float(SV_SIZE.x - 1), ik(e)));
vec4 sun = texelFetch(uIrradiance, ivec2(1, 0), 0);


float rP = PI / uSize.y;
if (acos(clamp(dot(dir, uSunWorld), -1.0, 1.0)) < uSunRadius + 3.0 * rP / max(sqrt(1.0 - dir.y * dir.y), 0.05)) {
const int N = 6;
const float LIMB = 0.6;
float coverage = 0.0;
for (int y = 0; y < N; y++) for (int x = 0; x < N; x++) {
vec3 d = hn(gl_FragCoord.xy - 0.5 + (vec2(x, y) + 0.5) / float(N));

float angle = 2.0 * asin(min(length(d - uSunWorld) * 0.5, 1.0));
float t = angle / uSunRadius;
if (t < 1.0) coverage += 1.0 - LIMB * (1.0 - sqrt(1.0 - t * t));
}
float rO = 2.0 * PI * (1.0 - cos(uSunRadius));
radiance += coverage / float(N * N) / (rO * (1.0 - LIMB / 3.0)) * sun.rgb;
}
color = vec4(radiance * sun.a, 1.0);
}
`,Jm=`#version 300 es
void main() {
vec2 p = vec2(gl_VertexID == 1 ? 3.0 : -1.0, gl_VertexID == 2 ? 3.0 : -1.0);
gl_Position = vec4(p, 0.0, 1.0);
}
`;class $m{gl;programs;targets;map;constructor(){const t=(typeof OffscreenCanvas<"u"?new OffscreenCanvas(1,1):document.createElement("canvas")).getContext("webgl2",{antialias:!1,depth:!1,stencil:!1,alpha:!1});if(!t)throw new Error("The procedural sky needs WebGL 2.");if(!t.getExtension("EXT_color_buffer_float"))throw new Error("The procedural sky needs float render targets (EXT_color_buffer_float).");this.gl=t,t.bindVertexArray(t.createVertexArray()),this.programs={transmittance:this.program(Wm),multiple:this.program(jm),skyView:this.program(Ym),irradiance:this.program(Vm),map:this.program(qm)},this.targets={transmittance:this.target(...qr),multiple:this.target(...jc),skyView:this.target(...Jr),irradiance:this.target(2,1)}}bake(e,t=2048,A=1024){const a=this.gl;if(a.isContextLost())throw new Error("The procedural sky lost its WebGL context.");const{elevation:r,azimuth:n}=Al(e),s=Cr(r),o=Cr(n),l=v=>(a.useProgram(v),this.uniform(v,"uSun",g=>a.uniform3f(g,Math.cos(s),Math.sin(s),0)),this.uniform(v,"uTurbidity",g=>a.uniform1f(g,cc)),this.uniform(v,"uAlbedo",g=>a.uniform3fv(g,fc)),v),{transmittance:c,multiple:f,skyView:p,irradiance:h}=this.targets,u=(v,g,w)=>{l(v),this.bind(v,"uTransmittance",0,c),this.bind(v,"uMultiple",1,g?f:h),this.uniform(v,"uFull",B=>a.uniform1i(B,g?1:0)),this.uniform(v,"uSkyIrradiance",B=>a.uniform3fv(B,w))};this.draw(l(this.programs.transmittance),c),u(this.programs.multiple,!1,[0,0,0]),this.draw(this.programs.multiple,f),u(this.programs.skyView,!0,[0,0,0]),this.draw(this.programs.skyView,p),l(this.programs.irradiance),this.bind(this.programs.irradiance,"uTransmittance",0,c),this.bind(this.programs.irradiance,"uSkyView",1,p),this.draw(this.programs.irradiance,h);const d=this.read(h).subarray(0,3);u(this.programs.skyView,!0,Array.from(d)),this.draw(this.programs.skyView,p),(!this.map||this.map.width!==t||this.map.height!==A)&&(this.map&&this.release(this.map),this.map=this.target(t,A));const m=l(this.programs.map);return this.bind(m,"uSkyView",0,p),this.bind(m,"uIrradiance",1,h),this.uniform(m,"uSize",v=>a.uniform2f(v,t,A)),this.uniform(m,"uAzimuth",v=>a.uniform1f(v,o)),this.uniform(m,"uSunWorld",v=>a.uniform3f(v,Math.cos(s)*Math.cos(o),Math.sin(s),Math.cos(s)*Math.sin(o))),this.uniform(m,"uSunRadius",v=>a.uniform1f(v,Cr(lc))),this.draw(m,this.map),{data:this.read(this.map),width:t,height:A}}dispose(){this.gl.getExtension("WEBGL_lose_context")?.loseContext()}program(e){const t=this.gl,A=(r,n)=>{const s=t.createShader(r);if(t.shaderSource(s,n),t.compileShader(s),!t.getShaderParameter(s,t.COMPILE_STATUS))throw new Error(`Sky shader: ${t.getShaderInfoLog(s)}`);return s},a=t.createProgram();if(t.attachShader(a,A(t.VERTEX_SHADER,Jm)),t.attachShader(a,A(t.FRAGMENT_SHADER,e)),t.linkProgram(a),!t.getProgramParameter(a,t.LINK_STATUS))throw new Error(`Sky program: ${t.getProgramInfoLog(a)}`);return a}target(e,t){const A=this.gl,a=A.createTexture();A.bindTexture(A.TEXTURE_2D,a),A.texStorage2D(A.TEXTURE_2D,1,A.RGBA32F,e,t),A.texParameteri(A.TEXTURE_2D,A.TEXTURE_MIN_FILTER,A.NEAREST),A.texParameteri(A.TEXTURE_2D,A.TEXTURE_MAG_FILTER,A.NEAREST);const r=A.createFramebuffer();if(A.bindFramebuffer(A.FRAMEBUFFER,r),A.framebufferTexture2D(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_2D,a,0),A.checkFramebufferStatus(A.FRAMEBUFFER)!==A.FRAMEBUFFER_COMPLETE)throw new Error("The procedural sky cannot render to float textures.");return{texture:a,framebuffer:r,width:e,height:t}}release(e){this.gl.deleteFramebuffer(e.framebuffer),this.gl.deleteTexture(e.texture)}uniform(e,t,A){const a=this.gl.getUniformLocation(e,t);a&&A(a)}bind(e,t,A,a){const r=this.gl;r.activeTexture(r.TEXTURE0+A),r.bindTexture(r.TEXTURE_2D,a.texture),this.uniform(e,t,n=>r.uniform1i(n,A))}draw(e,t){const A=this.gl;A.useProgram(e),A.bindFramebuffer(A.FRAMEBUFFER,t.framebuffer),A.viewport(0,0,t.width,t.height),A.drawArrays(A.TRIANGLES,0,3)}read(e){const t=this.gl,A=new Float32Array(e.width*e.height*4);return t.bindFramebuffer(t.FRAMEBUFFER,e.framebuffer),t.readPixels(0,0,e.width,e.height,t.RGBA,t.FLOAT,A),A}}function Cr(i){return i*Math.PI/180}class Km{baker;images=new WeakMap;sky;resolve(e){if(!e||!("sky"in e))return e;const t=this.images.get(e);if(t)return t;const{width:A,height:a,sky:{time:r},intensity:n,ambient:s}=e;this.baker??=new $m,(!this.sky||this.sky.time!==r||this.sky.width!==A||this.sky.height!==a)&&(this.sky={time:r,...this.baker.bake(r,A,a)});let o=this.sky.data;(n!==1||s.some(c=>c!==0))&&(o=o.map((c,f)=>f%4===3?c:c*n+s[f%4]));const l={width:A,height:a,data:o};return this.images.set(e,l),l}dispose(){this.baker?.dispose(),this.baker=void 0,this.sky=void 0}}const Xm=new ut({name:"depthQuery",outputs:["depth"],defines:{DEPTH_QUERY_MODE:!0},includes:[ci,fi,ui,di],uniforms:{depthArea:M.uniform("vec4"),viewProjectionInv:M.uniform("mat4"),viewInv:M.uniform("mat4")},main:`
${Na}
${Ha}
${di.main}
${ci.main}
${Ga}
${fi.main}
${ui.main}

void main() {
vec2 offset = floor(gl_FragCoord.xy) / ${Gt-1}.0 * 2.0 - 1.0;
vec2 uv = depthArea.xy + depthArea.zw * offset * vec2(1.0, -1.0);
out_depth = vec4(0.0);
if (any(lessThan(uv, vec2(0.0))) || any(greaterThan(uv, vec2(1.0)))) return;
vec4 origin = viewProjectionInv * vec4(uv * 2.0 - 1.0, -1.0, 1.0);
vec4 target = viewProjectionInv * vec4(uv * 2.0 - 1.0, 1.0, 1.0);
Ray ray;
gC(ray, origin.xyz / origin.w, normalize(target.xyz * origin.w - origin.xyz * target.w));
vec3 eye = viewInv[3].xyz;
vec3 forward = -normalize(viewInv[2].xyz);
SurfaceInteraction si;
si.triangleIndex = -1;
for (int layer = 0; layer < 32; layer++) {
intersectScene(ray, si, false);
if (!si.hit) return;
OpenPbrResolvedMaterial material;
dg(material, si.materialIndex, si.uv, si.uv1, si.instanceIndex, si.vertexColor);
if (material.materialType != SHADOW_CATCHER && material.alpha > 0.0) {
out_depth.r = max(dot(si.position - eye, forward), 0.0);
return;
}
ray.o = si.position + ray.d * (EPS * 0.02);
}
}
`}),Vc=he`
vec4 textureLinear(sampler2D map, vec2 uv) {
#ifdef OES_texture_float_linear
return texture(map, uv);
#else
vec2 size = vec2(textureSize(map, 0));
vec2 qX = 1.0 / size;

uv = uv * size - 0.5;
vec2 f = fract(uv);
uv = floor(uv) + 0.5;

vec4 s1 = texture(map, (uv + vec2(0, 0)) * qX);
vec4 s2 = texture(map, (uv + vec2(1, 0)) * qX);
vec4 s3 = texture(map, (uv + vec2(0, 1)) * qX);
vec4 s4 = texture(map, (uv + vec2(1, 1)) * qX);

return mix(mix(s1, s2, f.x), mix(s3, s4, f.x), f.y);
#endif
}
`,_a=SA({uniforms:{environmentRotation:M.uniform("mat3",[1,0,0,0,1,0,0,0,1]),envMap:M.uniform("sampler2D"),envMapDistribution:M.uniform("sampler2D"),backgroundMap:M.uniform("sampler2D"),backgroundMapTransform:M.uniform("vec4",[1,0,1,0]),backgroundMapRotation:M.uniform("mat3",[1,0,0,0,1,0,0,0,1]),groundedBackgroundParams:M.uniform("vec4"),groundedBackgroundCenter:M.uniform("vec2")},main:he`
vec2 eV(vec3 gx) {
float phi = mod(atan(-gx.z, -gx.x), TWOPI);
float theta = acos(clamp(gx.y, -1.0, 1.0));
return vec2(phi * 0.5 * INVPI, theta * INVPI);
}

vec2 dm(vec3 nO) {
return eV(transpose(environmentRotation) * nO);
}

float rE(float u, out int vOffset, out float pdf) {
ivec2 size = textureSize(envMap, 0);

int left = 0;
int right = size.y + 1; 
while (left < right) {
int mid = (left + right) >> 1;
float s = texelFetch(envMapDistribution, ivec2(0, mid), 0).x;
if (s <= u) {
left = mid + 1;
} else {
right = mid;
}
}
vOffset = left - 1;



vec2 s0 = texelFetch(envMapDistribution, ivec2(0, vOffset), 0).xy;
vec2 s1 = texelFetch(envMapDistribution, ivec2(0, vOffset + 1), 0).xy;

pdf = s0.y;

return (float(vOffset) +  (u - s0.x) / (s1.x - s0.x)) / float(size.y);
}

float rD(float u, int vOffset, out float pdf) {
ivec2 size = textureSize(envMap, 0);

int left = 0;
int right = size.x + 1; 
while (left < right) {
int mid = (left + right) >> 1;
float s = texelFetch(envMapDistribution, ivec2(1 + mid, vOffset), 0).x;
if (s <= u) {
left = mid + 1;
} else {
right = mid;
}
}
int pO = left - 1;



vec2 s0 = texelFetch(envMapDistribution, ivec2(1 + pO, vOffset), 0).xy;
vec2 s1 = texelFetch(envMapDistribution, ivec2(1 + pO + 1, vOffset), 0).xy;

pdf = s0.y;

return (float(pO) + (u - s0.x) / (s1.x - s0.x)) / float(size.x);
}


float eW(vec2 ew, float v) {
if (!(v > 0.0 && v < 1.0)) { return 0.0; }
float sinTheta = sin(min(v, 1.0 - v) * PI);
return ew.x * ew.y * INVPI2 / (2.0 * sinTheta);
}


vec3 pI(vec2 random, out vec2 uv, out float pdf) {
vec2 ew;
int vOffset;

uv.y = rE(random.x, vOffset, ew.y);
uv.x = rD(random.y, vOffset, ew.x);

float phi = uv.x * TWOPI;
float theta = uv.y * PI;
float ci = cos(theta);
float sinTheta = sin(theta);
float vM = cos(phi);
float vX = sin(phi);

vec3 dir = vec3(-sinTheta * vM, ci, -sinTheta * vX);

pdf = eW(ew, uv.y);

return environmentRotation * dir;
}

float iT(vec2 uv) {
vec2 size = vec2(textureSize(envMap, 0));

ivec2 pixel = clamp(ivec2(uv * size), ivec2(0), ivec2(size) - ivec2(1));

float ub = texelFetch(envMapDistribution, ivec2(1 + pixel.x, pixel.y), 0).y;
float uc = texelFetch(envMapDistribution, ivec2(0, pixel.y), 0).y;

return eW(vec2(ub, uc), uv.y);
}

float dK(vec3 point, float height, float radius) {
float ge = length(point);
if (ge < 0.00001) {
return -radius;
}

float iX = radius * point.y / ge;
float iL = -1.5 * height;
float eH;
if (iX >= 0.0) {
eH = radius;
} else if (iX < iL) {
eH = -height * ge / point.y;
} else {
float cL = 1.0
- iX * iX / (3.0 * iL * iL);
eH = radius * cL;
}
return ge - eH;
}

vec3 fd(vec3 origin, vec3 d) {
#ifdef USE_GROUNDED_BACKGROUND
float height = groundedBackgroundParams.x;
float radius = groundedBackgroundParams.y;
float xB = groundedBackgroundParams.z;
vec3 cf = normalize(d);
vec3 bI = origin - vec3(
groundedBackgroundCenter.x,
xB + height,
groundedBackgroundCenter.y
);



float eT = dot(bI, cf);
float br = eT * eT
- dot(bI, bI) + radius * radius;
if (br > 0.0) {
float cM = -eT + sqrt(br);
if (
cM > 0.0
&& dK(bI, height, radius) <= 0.0
) {
vec3 oK = bI + cf * cM;
if (oK.y >= 0.0) {
return normalize(oK);
}

if (cf.y < -0.00001 && radius > 1.5 * height) {
float ir = (-height - bI.y) / cf.y;
vec3 oB = bI + cf * ir;
float pe = (2.0 / 3.0)
* sqrt(radius * radius - 2.25 * height * height);
if (ir > 0.0 && length(oB.xz) <= pe) {
return normalize(oB);
}
}

float cV = 0.0;
for (int i = 0; i < 14; i++) {
float fB = (cV + cM) * 0.5;
vec3 qy = bI + cf * fB;
if (dK(qy, height, radius) > 0.0) {
cM = fB;
} else {
cV = fB;
}
}
vec3 hit = bI + cf * ((cV + cM) * 0.5);
return normalize(hit);
}
}
#endif
return d;
}

vec4 cG(vec3 origin, vec3 d) {
d = fd(origin, d);
#ifdef USE_BACKGROUND
vec4 t = backgroundMapTransform;
d = vec3(t.x * d.x - t.y * d.z, d.y, t.y * d.x + t.x * d.z);
vec4 bc = textureLinear(backgroundMap, eV(transpose(backgroundMapRotation) * d));
return vec4(bc.rgb * t.z, bc.a);
#else
return textureLinear(backgroundMap, dm(d));
#endif
}`}),Zm=he`
vec3 ta(SurfaceInteraction si, OpenPbrResolvedMaterial mat, ag prepared, inout Path aa, vec3 ffnormal, bool eM) {
float lY = 1.0;
vec3 lV = vec3(dZ(cE(LIGHT_POSITION)), dp(cE(LIGHT_SELECT)));

LightSampleRec lightSample;
sampleLight(si.position, lV, lightSample, false);
lightSample.emission = aj(lightSample.emission, bp);

vec3 lightDir = lightSample.direction;
vec3 qY = -aa.ray.d;
float fA = lightSample.pdf;




float cosThetaL = dot(ffnormal, lightDir);
#ifdef USE_COAT_NORMAL_FRAMES
if (eM && mat.coatNormalEnabled) { cosThetaL = dot(mat.geometricNormal, lightDir); }
#endif

if (fA <= 0.0 || max(max(lightSample.emission.x, lightSample.emission.y), lightSample.emission.z) <= 0.0) {
return vec3(0.0);
}

float scatteringPdf = 0.0;
vec3 f = vec3(0.0);
if (eM) {
if (cosThetaL <= 0.0 && mat.transmissionWeight <= 0.0 && mat.subsurfaceWeight <= 0.0) {
return vec3(0.0);
}
f = bO(prepared, lightDir, scatteringPdf);
}
else {
scatteringPdf = bL(
dot(qY, lightDir),
si.mediumAnisotropy
);
f = vec3(scatteringPdf);
}

if (scatteringPdf <= 0.0 || max(max(f.x, f.y), f.z) <= 0.0) {
return vec3(0.0);
}

Ray ns;
vec3 hw = si.position + EPS * lightDir;
if (eM) {
const float ch = 0.1;
float dL = dot(si.normal, lightDir);
#ifdef USE_COAT_NORMAL_FRAMES
if (mat.coatNormalEnabled) { dL = dot(si.faceNormal, lightDir); }
#endif
vec3 geometricNormal = dL < 0.0 ? -si.faceNormal : si.faceNormal;
dL = abs(dL);
float iq = dot(geometricNormal, lightDir);
float pq = dL < ch
? clamp(
2.0 - (iq + dL) / ch,
0.0,
1.0
)
: clamp(1.0 - iq / ch, 0.0, 1.0);
hw += si.shadowOffset * pq;
}
gC(ns, hw, lightDir);
if (intersectSceneShadow(ns, lightSample.dist - EPS, si.triangleIndex)) {
return vec3(0.0);
}

#ifdef USE_ENVMAP


if (eM && cosThetaL < 0.0 && lV.z < envLightSelectionPmf) {
vec4 background = cG(ns.o, lightDir);
lightSample.emission = aj(background.rgb * background.a, bp);
}
#endif



float fl = lightSample.isDelta
? 1.0
: aK(fA, scatteringPdf);
return fl > 0.0
? fl * lightSample.emission * f / fA
: vec3(0.0);
}

#ifdef USE_COAT_NORMAL_FRAMES
vec3 fT(vec3 qt, vec3 face, vec3 view) {
bool front = dot(face, view) >= 0.0;
vec3 vP = front ? face : -face;
vec3 sc = front ? qt : -qt;
if (dot(qt, face) <= 0.0 || dot(sc, view) <= 1e-6) { return vP; }
return sc;
}
#endif
void mL(inout SurfaceInteraction si, OpenPbrResolvedMaterial mat, inout Path aa) {
vec3 vR = vec3(dZ(cE(BSDF_DIRECTION)), dp(cE(BSDF_LOBE)));
#ifdef USE_COAT_NORMAL_FRAMES
vec3 bK = si.faceNormal;
vec3 nB = si.normal;
#endif
float sO = -dot(si.faceNormal, aa.ray.d);
float tV = -dot(si.normal, aa.ray.d);
if ((mat.transmissionWeight > 0.0 || mat.subsurfaceWeight > 0.0) && mat.thinWalled) {

if (sO < 0.0) {
si.faceNormal = -si.faceNormal;
sO = -sO;
}
if (tV < 0.0) {
si.normal = -si.normal;
tV = -tV;
}
}


bool qM = sO >= 0.0 && tV < 0.0;
float ndv = qM ? sO : tV;
vec3 normal = qM ? si.faceNormal : si.normal;

mat.inside = ndv <= 0.0 && !mat.thinWalled;

mat.relativeIor = ndv > 0.0 ? (1.0 / mat.specularIor) : mat.specularIor;
vec3 ffnormal = ndv >= 0.0 ? normal : -normal;
#ifdef USE_COAT_NORMAL_FRAMES
if (mat.coatNormalEnabled) {
vec3 view = -aa.ray.d;
float gp = dot(bK, view);
mat.geometricNormal = gp >= 0.0 ? bK : -bK;
ffnormal = fT(nB, bK, view);
mat.coatNormal = fT(si.coatNormal, bK, view);
mat.inside = gp <= 0.0 && !mat.thinWalled;
mat.relativeIor = (gp > 0.0 || mat.thinWalled) ? 1.0 / mat.specularIor : mat.specularIor;
}
#endif


float scatteringPdf;
vec3 dH;
aa.scatteringIsDelta = false;
bool bs = false;
bool hC = false;
ag prepared;

#ifdef HAS_MEDIUM
int mediumType = si.mediumType;
float d = distance(si.position, aa.ray.o);
vec3 os = aa.ray.o;
vec3 extinction = si.mediumExtinction;
vec3 scattering = min(si.mediumScattering, extinction);
float tR = max(max(extinction.x, extinction.y), extinction.z);
if (mediumType > 0 && tR > 0.0) {




int oi = min(int(dp(cE(MEDIUM_CHANNEL)) * 3.0), 2);
float fS = extinction[oi];
float iH = fS > 0.0
? min(-log(max(dp(cE(MEDIUM_DISTANCE)), 1e-7)) / fS, d)
: d;
bs = iH < d;
vec3 transmittance = exp(-extinction * iH);
vec3 oU = bs
? extinction * transmittance
: transmittance;
float oE = max(
(oU.x + oU.y + oU.z) / 3.0,
1e-8
);
if (bs) {
aa.beta *= transmittance * scattering / oE;

aa.ray.o = os + iH * aa.ray.d;
si.position = aa.ray.o;
aa.li += ta(si, mat, prepared, aa, ffnormal, false) * aa.beta;


dH = fH(
-aa.ray.d,
si.mediumAnisotropy,
dZ(cE(PHASE_DIRECTION))
);
scatteringPdf = bL(
dot(dH, -aa.ray.d),
si.mediumAnisotropy
);
}
else {
aa.beta *= transmittance / oE;
}
}
#endif


if (!bs) {
aa.li += mat.emission * aa.beta;
if (mat.materialType == UNLIT) {
aa.abort = true;
return;
}
vec3 qJ = vec3(0.0);
#ifdef USE_TANGENT
qJ = si.tangent;
#endif
mat.directionTangent = si.directionTangent;
mat.directionBitangent = si.directionBitangent;
mat.geometryTangent = si.geometryTangent;
mat.geometryBitangent = si.geometryBitangent;
prepared = ds(qJ, mat, -aa.ray.d, ffnormal);
aa.li += ta(si, mat, prepared, aa, ffnormal, true) * aa.beta;

bool isNextRefraction;
vec3 f = eN(
prepared,
vR,
dH,
scatteringPdf,
isNextRefraction
);

aa.scatteringIsDelta = !prepared.material.thinWalled &&
abs(prepared.material.relativeIor - 1.0) <= 1e-6 &&
prepared.probabilities[OPENPBR_LOBE_TRANSMISSION] >= 1.0 - 1e-6;



if (!(scatteringPdf > 0.0) || any(isnan(f)) || any(isinf(f)) ||
dot(dH, dH) < 0.5) {
aa.scatteringPdf = 0.0;
aa.abort = true;
return;
}
aa.beta *= f / scatteringPdf;
hC = !mat.thinWalled &&
isNextRefraction;
aa.isNextRefraction = isNextRefraction;


aa.ray.o = si.position + EPS * dH;
#ifdef USE_COAT_NORMAL_FRAMES
if (mat.coatNormalEnabled) { aa.ray.o = si.position + EPS * (dot(bK, dH) >= 0.0 ? bK : -bK); }
#endif
}

aa.scatteringPdf = scatteringPdf;
gC(aa.ray, aa.ray.o, dH);
if (bs) {
aa.isNextRefraction = false;
}
aa.fromEye = false;

#ifdef HAS_MEDIUM


if (!bs && hC && mat.mediumType > 0) {
if (sO >= 0.0) {
si.mediumType = mat.mediumType;
si.mediumExtinction = mat.mediumExtinction;
si.mediumScattering = mat.mediumScattering;
si.mediumAnisotropy = mat.mediumAnisotropy;
}
else {
si.mediumType = 0;
si.mediumExtinction = vec3(0.0);
si.mediumScattering = vec3(0.0);
si.mediumAnisotropy = 0.0;
}
}
#endif
}
`,qc=he`
#ifdef NUM_LIGHTS
void eY(
in Light light,
in vec3 shadingPoint,
in vec2 samplePoint,
inout LightSampleRec result
) {
vec3 oN = light.position - shadingPoint;
float ak = length(oN);
if (light.radius <= 0.0) {
if (ak <= 1e-6) {
result.direction = vec3(0.0, 0.0, 1.0);
result.normal = vec3(0.0, 0.0, -1.0);
result.dist = 0.0;
result.pdf = 1.0;
result.emission = vec3(0.0);
result.isDelta = true;
return;
}
result.direction = oN / ak;
result.normal = -result.direction;
result.dist = ak;
result.pdf = 1.0;
result.emission = light.emission / max(ak * ak, 1e-8);
result.isDelta = true;
return;
}
float radius = max(light.radius, 1e-6);
result.isDelta = false;
vec3 direction;

if (ak <= radius) {
float z = 1.0 - 2.0 * samplePoint.x;
float ex = sqrt(max(0.0, 1.0 - z * z));
float azimuth = TWOPI * samplePoint.y;
direction = vec3(ex * cos(azimuth), ex * sin(azimuth), z);
result.pdf = INV4PI;
}
else {
vec3 axis = oN / ak;
float sX = min(
1.0,
radius * radius / (ak * ak)
);
float tc = sqrt(max(0.0, 1.0 - sX));
float cosine = mix(1.0, tc, samplePoint.x);
float vF = sqrt(max(0.0, 1.0 - cosine * cosine));
float azimuth = TWOPI * samplePoint.y;
vec3 tangent;
vec3 bitangent;
aP(axis, tangent, bitangent);
direction = axis * cosine
+ tangent * (vF * cos(azimuth))
+ bitangent * (vF * sin(azimuth));
result.pdf = 1.0 / max(TWOPI * (1.0 - tc), 1e-8);
}

float jC = dot(direction, oN);
float br = jC * jC
- dot(oN, oN) + radius * radius;
float yn = sqrt(max(0.0, br));
float cV = jC - yn;
float cM = jC + yn;
result.dist = cV > 1e-6 ? cV : cM;
result.direction = direction;
vec3 surfacePoint = shadingPoint + direction * result.dist;
result.normal = normalize(surfacePoint - light.position);
result.emission = light.emission;
}

void dn(
in Light light,
in vec3 surfacePoint,
in vec3 lowerLeft,
inout LightSampleRec result
) {
#ifdef NUM_MAPS
if (light.textureIndex >= 0) {
float width = length(light.u);
float height = length(light.v);
vec3 ek = surfacePoint - lowerLeft;
vec2 uv = vec2(
dot(ek, light.u / width) / width,
dot(ek, light.v / height) / height
);
result.emission *= sampleMap(light.textureIndex, uv).rgb;
}
#endif
}

void kw(
in Light light,
in vec3 shadingPoint,
in vec2 samplePoint,
inout LightSampleRec result
) {
vec3 normal = normalize(cross(light.u, light.v));
vec3 lowerLeft = light.position - 0.5 * (light.u + light.v);
float spread = clamp(light.spread, 0.0, 1.0);

if (spread <= 0.001) {
float gw = dot(normal, shadingPoint - light.position);
vec3 surfacePoint = shadingPoint - normal * gw;
vec3 ek = surfacePoint - lowerLeft;
float width = length(light.u);
float height = length(light.v);
vec2 uv = vec2(
dot(ek, light.u / width) / width,
dot(ek, light.v / height) / height
);
if (gw <= 0.0 || any(lessThan(uv, vec2(0.0)))
|| any(greaterThan(uv, vec2(1.0)))) {
result.emission = vec3(0.0);
result.pdf = 0.0;
return;
}
result.direction = -normal;
result.dist = gw;
result.normal = normal;
result.emission = light.emission;
result.pdf = 1.0;
result.isDelta = true;
dn(light, surfacePoint, lowerLeft, result);
return;
}

vec3 surfacePoint = lowerLeft
+ light.u * samplePoint.x
+ light.v * samplePoint.y;
vec3 offset = surfacePoint - shadingPoint;
float hE = dot(offset, offset);
result.dist = sqrt(hE);
result.direction = offset / result.dist;
result.normal = normal;
float gn = dot(-result.direction, normal);
float pK = cos(0.5 * PI * spread);
if (gn <= 0.0 || gn < pK) {
result.emission = vec3(0.0);
result.pdf = 0.0;
return;
}
result.emission = light.emission;
result.pdf = hE / max(light.area * gn, 1e-8);
dn(light, surfacePoint, lowerLeft, result);
}

void gs(
in Light light,
in vec3 shadingPoint,
inout LightSampleRec result
) {
result.direction = normalize(-light.u);
result.normal = -result.direction;
result.emission = light.emission;
result.dist = INF;
result.pdf = 1.0;
result.isDelta = true;
}

void kx(
in Light light,
in vec3 shadingPoint,
in vec2 samplePoint,
inout LightSampleRec result
) {
eY(light, shadingPoint, samplePoint, result);
vec3 surfacePoint = shadingPoint + result.direction * result.dist;
result.emission *= bP(
light,
normalize(shadingPoint - surfacePoint)
);
}

void jg(
in Light light,
in vec3 shadingPoint,
in vec2 samplePoint,
inout LightSampleRec result
) {
int ec = int(light.type);
#ifdef HAS_RECT_LIGHTS
if (ec == RECT_LIGHT) {
kw(light, shadingPoint, samplePoint, result);
return;
}
#endif
#ifdef HAS_SPHERE_LIGHTS
if (ec == SPHERE_LIGHT) {
eY(light, shadingPoint, samplePoint, result);
return;
}
#endif
#ifdef HAS_SPOT_LIGHTS
if (ec == SPOT_LIGHT) {
kx(light, shadingPoint, samplePoint, result);
return;
}
#endif
#ifdef HAS_DIRECTIONAL_LIGHTS
if (ec == DIRECTIONAL_LIGHT) {
gs(light, shadingPoint, result);
}
#endif
}
#endif

void nD(in vec2 samplePoint, inout LightSampleRec result) {
vec2 uv;
result.direction = pI(samplePoint, uv, result.pdf);
result.emission = textureLinear(envMap, uv).rgb;
result.dist = INF;
}

void sampleLight(
in vec3 shadingPoint,
in vec3 randomSampleValue,
inout LightSampleRec result,
bool tk
) {
result.isDelta = false;
float vE = randomSampleValue.z;
bool le = false;
#ifdef USE_ENVMAP
le = vE < envLightSelectionPmf;
if (le) {
nD(randomSampleValue.xy, result);
result.pdf *= envLightSelectionPmf;
}
#endif

#ifdef NUM_LIGHTS
if (!le) {
int lM = NUM_LIGHTS - 1;
for (int index = 0; index < NUM_LIGHTS; index++) {
if (vE < rB(index).selectionCdf) {
lM = index;
break;
}
}
Light rp = rB(lM);
jg(
rp,
shadingPoint,
randomSampleValue.xy,
result
);
result.pdf *= rp.selectionPmf;
}
#endif
}
`,eg=he`
#if defined(HAS_TRANSMISSION) || defined(HAS_ALPHA)
if (!si.isTransparency && BOUNCES < 16 && depth * 2 > BOUNCES) {
aa.abort = true;
return;
}
#endif
`,tg=he`

for(int xK = 0; xK < BOUNCES; xK++) {{
if (aa.abort) {
return vec4(aa.li, aa.alpha);
}
bounce(aa, depth, si, mat, outAux);
}}
`,ig=he`
bool wY = !si.isTransparency;
int rT = min(BOUNCES, bounceLimit);
for(int idx = 0; idx < min(BOUNCES * 3, ${Kt}); idx++) {
if (wY && idx > rT) {
aa.abort = true;
}
if (aa.abort) {
return vec4(aa.li, aa.alpha);
}
bounce(aa, depth, si, mat, outAux);
}
`;function Ag(){const i=zc();return new ut({name:"rayTraceFrag",outputs:["color","albedo","normal","moments"],defines:{BOUNCES:2},uniforms:{cameraApertureRadius:M.uniform("float",0),cameraFocusDistance:M.uniform("float",10),viewProjectionInv:M.uniform("mat4"),viewInv:M.uniform("mat4"),transmissiveOutputAlphaMin:M.uniform("float"),openPbrEnergyLut:M.uniform("sampler2D"),viewportSize:M.uniform("vec2"),wavelength:M.uniform("float",0),bevelEnabled:M.uniform("bool",!0),dispersionWavelengths:M.uniform("int",3),bounceLimit:M.uniform("int",8)},includes:[ci,fi,ui,di,_a],main:he`
${Na}

${Ha}
${di.main}

${Vc}

${ci.main}

${Ga}

${fi.main}
${ui.main}
${_a.main}

${zn}
${Wc}

float nl;
float bp;

${qc}
${Zm}

${kn}
struct RayTraceAuxiliary {

vec3 albedo;
vec3 normal;
bool isBlank;

bool isShadowCatcher;
};

void bounce(inout Path aa, inout int depth, inout SurfaceInteraction si, inout OpenPbrResolvedMaterial mat, inout RayTraceAuxiliary outAux) {
bT = uint(max(depth, 0));




${i?eg:""}

bool isShadowCatcher = mat.materialType == SHADOW_CATCHER;
if (isShadowCatcher) {
if (aa.fromEye) {


outAux.albedo = vec3(1.0);
outAux.normal = dot(si.normal, aa.ray.d) > 0.0 ? -si.normal : si.normal;
si.hit = false;
outAux.isShadowCatcher = true;
}
else {


#ifdef USE_ENVMAP
if (aa.isNextRefraction) {



vec4 bg = cG(aa.ray.o, aa.ray.d);
bg.rgb = aj(bg.rgb, bp);
float da = aa.scatteringIsDelta ? 1.0
: aK(aa.scatteringPdf,
iT(dm(aa.ray.d)) * envLightSelectionPmf);
aa.li += da * aa.beta * bg.rgb * bg.a;
aa.alpha = max(aa.alpha, bg.a);
}
else {
vec2 vo = dm(aa.ray.d);
vec3 emission = textureLinear(envMap, vo).rgb;
emission = aj(emission, bp);
aa.li += aa.beta * emission *
aK(
aa.scatteringPdf,
iT(vo) * envLightSelectionPmf
);
}
#else
vec4 bg = cG(aa.ray.o, aa.ray.d);
bg.rgb = aj(bg.rgb, bp);
aa.li += aa.beta * bg.rgb * bg.a;
#endif
aa.abort = true;
return;
}
}

if (!si.hit) {

vec4 bg = cG(aa.ray.o, aa.ray.d);



bg.rgb = aj(bg.rgb, bp);
if (aa.fromEye) {
aa.li = bg.rgb * bg.a;
aa.alpha = bg.a;

outAux.isBlank = bg.a < 0.01;
}
else {
Ray cam = fj(v_Texcoord + tg());
bool nK = dot(cam.d, aa.ray.d) > 0.0;
if (transmissiveOutputAlphaMin < 1.0) {
if (nK) {
aa.alpha = max(aa.alpha, bg.a);
} else {
aa.alpha = 1.0;
}
}
#if !defined(USE_ENVMAP)

if (nK) {
aa.li = aa.beta * aK(aa.scatteringPdf, 1.0) * bg.rgb;
}
#endif
}
aa.abort = true;
return;
}

bool aJ = false;
if ((mat.materialType == STANDARD || mat.materialType == UNLIT)) {
if (transmissiveOutputAlphaMin < 1.0) {

float alpha = max(1.0 - mat.transmissionWeight, 1.0 - pow(1.0 - transmissiveOutputAlphaMin, float(depth)));
aa.alpha = max(alpha, aa.alpha);
}
float alpha = mat.alpha;
if (alpha < 1.0) {


aa.alpha = max(aa.alpha, alpha);
if (eC(3u) > alpha) {
aJ = true;
}
}
if (!aJ) {
mL(si, mat, aa);
}
else {
aa.ray.o = si.position + aa.ray.d * EPS;
}
}

if (!si.albedoSampled && !aJ) {

if ((mat.materialType == STANDARD || mat.materialType == UNLIT) &&
!(mat.transmissionWeight > 0.5 ||
(mat.specularRoughness <= 0.02 && mat.baseMetalness > 0.98))) {



outAux.albedo = mat.baseColor;
outAux.normal = dot(si.normal, si.position - vec3(viewInv[3])) > 0.0
? -si.normal
: si.normal;
si.albedoSampled = true;
}
if (depth > 4) {
si.albedoSampled = true;
}
}



#ifdef USE_RR
if (depth >= RR_MAX && !aJ) {

float pn = max(max(aa.beta.x, aa.beta.y), aa.beta.z);
float q = max(0.0, 1.0 - pn);
if (dp(cE(RUSSIAN_ROULETTE)) < q) {


aa.alpha = 1.0;
aa.abort = true;
}
else {
aa.beta /= 1.0 - q;
}
}
#endif

if (aa.abort) {
return;
}


intersectScene(aa.ray, si, true);
dg(mat, si.materialIndex, si.uv, si.uv1, si.instanceIndex, si.vertexColor);
si.isTransparency = mat.transmissionWeight > 0.001 || mat.subsurfaceWeight > 0.001 || mat.alpha < 0.999;




if (dispersionWavelengths == 1 && si.hit && mat.transmissionWeight > 0.001 && mat.transmissionDispersionScale > 0.001) {
bp = nl;
}
if (mat.transmissionWeight > 0.001 && bp > 0.0) {
mat.specularIor = ee(
bp,
mat.specularIor,
mat.transmissionDispersionScale,
mat.dispersionAbbeNumber
);
}

if (aJ) {
return;
}

bool hM = eC(3u) < mat.alpha;
#ifdef NUM_LIGHTS

LightSampleRec lightSample;
for (int i = 0; i < NUM_LIGHTS; i++) {

Light light = rB(i);
float d = nr(aa.ray, light, lightSample);
bool lY = si.hit && d > distance(si.position, aa.ray.o);
if (d != INF && !(lY && hM)) {
lightSample.pdf *= light.selectionPmf;
float fl = aK(aa.scatteringPdf, lightSample.pdf);
lightSample.emission = aj(lightSample.emission, bp);
aa.li += fl * aa.beta * lightSample.emission;

aa.alpha = 1.0;
aa.abort = true;
}
}
#endif

#ifdef USE_ENVMAP
if (!(si.hit && hM)) {
if (aa.isNextRefraction) {


vec4 bg = cG(aa.ray.o, aa.ray.d);
bg.rgb = aj(bg.rgb, bp);
float da = aa.scatteringIsDelta ? 1.0
: aK(aa.scatteringPdf,
iT(dm(aa.ray.d)) * envLightSelectionPmf);
aa.li += da * aa.beta * bg.rgb * bg.a;
aa.alpha = max(aa.alpha, bg.a);
aa.abort = true;
return;
}
vec2 uv = dm(aa.ray.d);
vec3 emission = textureLinear(envMap, uv).rgb;
float fl = aK(
aa.scatteringPdf,
iT(uv) * envLightSelectionPmf
);
emission = aj(emission, bp);
aa.li += aa.beta * emission * fl;


#if !defined(USE_BACKGROUND)
aa.alpha = 1.0;
#endif
aa.abort = true;
return;
}
#endif

depth++;
}


vec2 ld(float radius, float xi) {
float x = 0.25;
for (int oD = 0; oD < 10; oD++) {
float x2 = x * x;
float x3 = x2 * x;
float lw = 1.0 - x;
float value = 10.0 * x2 - 20.0 * x3 + 15.0 * x2 * x2 -
4.0 * x2 * x3 - xi;
float mX = 20.0 * x * lw * lw * lw;
if (abs(value) < 1e-6 || mX == 0.0) break;
x = clamp(x - value / mX, 0.0, 1.0);
}
float jL = x * radius;
return vec2(
jL,
sqrt(max(radius * radius - jL * jL, 0.0))
);
}

float jj(float radius, float gM) {
if (gM >= radius) return 0.0;
float pa = radius - gM;
return pa * pa * pa;
}


vec3 nj(SurfaceInteraction source, float radius) {
vec3 geometricNormal = source.faceNormal;
if (dot(geometricNormal, source.vertexNormal) < 0.0) geometricNormal = -geometricNormal;
vec3 tangent;
vec3 bitangent;
aP(geometricNormal, tangent, bitangent);
vec3 iW = vec3(0.0);

for (int iG = 0; iG < BEVEL_SAMPLES; iG++) {
vec2 qf = dZ(CAMERA_BEVEL_BASE + uint(iG));
float cJ = qf.x;
float pv = qf.y;
vec3 dz = geometricNormal;
vec3 fW = tangent;
vec3 eA = bitangent;
float gu = 0.5;
float iB = 0.25;
float gT = 0.25;
if (cJ < 0.5) {
cJ *= 2.0;
}
else if (cJ < 0.75) {
vec3 nI = dz;
dz = fW;
fW = nI;
gu = 0.25;
iB = 0.5;
cJ = (cJ - 0.5) * 4.0;
}
else {
vec3 nI = dz;
dz = eA;
eA = nI;
gu = 0.25;
gT = 0.5;
cJ = (cJ - 0.75) * 4.0;
}

vec2 hj = ld(radius, pv);
float phi = TWOPI * cJ;
vec3 rw = hj.x *
(cos(phi) * fW + sin(phi) * eA);
Ray ray;
gC(
ray,
source.position + dz * hj.y + rw,
-dz
);
SurfaceInteraction hit;
intersectSceneBevel(
ray,
hit,
source.instanceIndex,
max(2.0 * hj.y, EPS)
);
if (!hit.hit) continue;

float lA = gu * abs(dot(dz, hit.faceNormal));
float nC = iB * abs(dot(fW, hit.faceNormal));
float kG = gT * abs(dot(eA, hit.faceNormal));
float weight = lA / max(
lA * lA + nC * nC +
kG * kG,
1e-8
);
weight *= jj(radius, distance(hit.position, source.position)) /
max(jj(radius, hj.x), 1e-8);
iW += weight * hit.vertexNormal;
}

if (dot(iW, iW) <= 1e-12) return source.normal;
vec3 kg = normalize(iW);
vec3 result = source.normal + kg - source.vertexNormal;
return dot(result, result) > 1e-12 ? normalize(result) : source.normal;
}

vec4 cT(SurfaceInteraction si, Ray ray, OpenPbrResolvedMaterial mat, inout RayTraceAuxiliary outAux) {
Path aa;
aa.ray = ray;
aa.li = vec3(0);
aa.alpha = transmissiveOutputAlphaMin < 1.0 ? 0.0 : 1.0;
aa.beta = vec3(1.0);
aa.fromEye = true;
aa.scatteringPdf = 0.0;
aa.scatteringIsDelta = false;
aa.isNextRefraction = false;
aa.abort = false;
int depth = 0;
${i?tg:ig}
return vec4(aa.li, aa.alpha);
}

vec4 iU(SurfaceInteraction si, Ray ray, OpenPbrResolvedMaterial mat, inout RayTraceAuxiliary outAux) {
float coverage = clamp(mat.alpha, 0.0, 1.0);
if (!si.hit || (mat.materialType != STANDARD && mat.materialType != UNLIT) || coverage >= 1.0) {
return cT(si, ray, mat, outAux);
}





Ray uG = ray;
uG.o = si.position + ray.d * (EPS * 0.02);
SurfaceInteraction kf = si;
kf.albedoSampled = false;
intersectScene(uG, kf, false);
OpenPbrResolvedMaterial oS;
dg(oS, kf.materialIndex, kf.uv, kf.uv1, kf.instanceIndex, kf.vertexColor);
RayTraceAuxiliary ez = outAux;
if (kf.hit && (oS.materialType == STANDARD || oS.materialType == UNLIT)) {
ez.albedo = oS.transmissionWeight > 0.5
? vec3(1.0)
: oS.baseColor;
ez.normal = dot(
kf.normal,
kf.position - vec3(viewInv[3])
) > 0.0
? -kf.normal
: kf.normal;
kf.albedoSampled = oS.transmissionWeight > 0.5;
}
vec4 back = cT(kf, uG, oS, ez);
if (coverage <= 0.0) {
outAux = ez;
return back;
}

SurfaceInteraction xA = si;
OpenPbrResolvedMaterial vp = mat;
vp.alpha = 1.0;
RayTraceAuxiliary se = outAux;
vec4 front = cT(xA, ray, vp, se);
outAux.albedo = mix(ez.albedo, se.albedo, coverage);
vec3 dl = mix(ez.normal, se.normal, coverage);
outAux.normal = dot(dl, dl) > 1e-12
? normalize(dl)
: vec3(0.0);
outAux.isBlank = ez.isBlank && se.isBlank;
return mix(back, front, coverage);
}



vec4 iu(Ray ray, out RayTraceAuxiliary outAux) {

SurfaceInteraction si;
OpenPbrResolvedMaterial mat;

si.albedoSampled = false;
#ifdef HAS_MEDIUM
si.mediumType = 0;
si.mediumExtinction = vec3(0.0);
si.mediumScattering = vec3(0.0);
si.mediumAnisotropy = 0.0;
#endif

intersectScene(ray, si, false);
dg(mat, si.materialIndex, si.uv, si.uv1, si.instanceIndex, si.vertexColor);
si.isTransparency = mat.transmissionWeight > 0.001 || mat.subsurfaceWeight > 0.001 || mat.alpha < 0.999;

#ifdef HAS_BEVEL
if (bevelEnabled && mat.bevel > 0.0) {
si.normal = nj(si, mat.bevel);
}
#endif



if (si.hit && (mat.materialType == STANDARD || mat.materialType == UNLIT)) {
outAux.albedo = mat.transmissionWeight > 0.5 ? vec3(1.0) : mat.baseColor;
outAux.normal = dot(si.normal, si.position - vec3(viewInv[3])) > 0.0
? -si.normal
: si.normal;


si.albedoSampled = mat.transmissionWeight > 0.5;
}

if (mat.transmissionDispersionScale > 0.001) {
mat.specularIor = ee(
bp,
mat.specularIor,
mat.transmissionDispersionScale,
mat.dispersionAbbeNumber
);
}
return iU(si, ray, mat, outAux);
}

void main() {

rG();
gW(v_Texcoord * viewportSize, int(uint(sampleCount) ^ dG(uint(sequenceSeed))));


bp = dispersionWavelengths == 1 ? 0.0 : wavelength;
nl = wavelength;
if (dispersionWavelengths == 1 && wavelength > 0.0) {
float channel = floor(dp(CAMERA_WAVELENGTH) * 3.0);
nl = channel < 1.0 ? 650.0 : channel < 2.0 ? 510.0 : 475.0;
}



Ray cam = oG();

RayTraceAuxiliary outAux;
outAux.albedo = vec3(0.0);
outAux.normal = vec3(0.0);
outAux.isBlank = false;
outAux.isShadowCatcher = false;

vec4 aW = iu(cam, outAux);



#ifdef CLAMPING
float clamping = float(CLAMPING);
aW.rgb = clamp(aW.rgb, -clamping, clamping);
#endif


if (bp > 0.0) {

aW.rgb *= 3.0;
if (dispersionWavelengths != 1) {


aW.a /= 3.0;
}
}
if (!(aW.x < INF && aW.x > -EPS)) {
aW = vec4(0, 0, 0, 1);
}

out_color = aW;
out_albedo = vec4(outAux.albedo, outAux.isBlank ? 0.0 : 1.0);
out_normal = vec4(outAux.normal, 1.0);


float jP = dot(aW.rgb, vec3(0.2126, 0.7152, 0.0722));
out_moments = outAux.isShadowCatcher
? vec4(0.0)
: vec4(jP, jP * jP, 1.0, 0.0);

}`})}const ag=he`





const uint SHADOW_CATCHER_LIGHT_SAMPLES = 4u;

uint lc(uint candidate, uint slot) {
return candidate == 0u ? cE(slot) : cE(9u + (candidate - 1u) * 3u + slot);
}



vec2 sampleShadowCatcher(SurfaceInteraction si, int bounce, inout Path aa) {
vec3 qY = -aa.ray.d;
vec2 counts = vec2(0.0);

#if defined(NUM_LIGHTS) || defined(USE_ENVMAP)
for (uint candidate = 0u; candidate < SHADOW_CATCHER_LIGHT_SAMPLES; candidate++) {
LightSampleRec lightSample;
vec3 lV = vec3(
dZ(lc(candidate, LIGHT_POSITION)),
dp(lc(candidate, LIGHT_SELECT))
);
sampleLight(si.position, lV, lightSample, false);

vec3 lightDir = lightSample.direction;
float cosThetaL = dot(si.normal, lightDir);
float qB = dot(si.normal, qY) * cosThetaL;
if (lightSample.pdf > 0.0 && qB >= 0.0) {
if (dot(lightSample.emission, luminance) * abs(cosThetaL) > 0.0) {
Ray ray;
gC(ray, si.position + EPS * lightDir, lightDir);
bool lY = intersectSceneShadow(ray, lightSample.dist - EPS, si.triangleIndex);
counts += vec2(lY ? 1.0 : 0.0, 1.0);
}
}
}
#endif
aa.fromEye = false;
return counts;
}
`,go=new ut({name:"shadowCatcher",outputs:["shadowCatcher","catcherBackground","catcherMoments"],defines:{BOUNCES:2},uniforms:{dispersionWavelengths:M.uniform("int",3),wavelength:M.uniform("float",0),viewportSize:M.uniform("vec2"),viewProjectionInv:M.uniform("mat4"),viewInv:M.uniform("mat4"),cameraApertureRadius:M.uniform("float",0),cameraFocusDistance:M.uniform("float",10)},includes:[ci,fi,ui,di,_a],main:he`
${Na}
${Ha}
${di.main}

${Vc}

${ci.main}
${Ga}

${fi.main}
${ui.main}
${_a.main}

${zn}
${qc}
${ag}
${kn}



vec4 iu(inout Ray ray, out vec4 background, out vec2 shadowCounts) {
background = vec4(0.0);
shadowCounts = vec2(0.0);
Path aa;
aa.ray = ray;
aa.li = vec3(0);
aa.alpha = 1.0;
aa.beta = vec3(1.0);
aa.fromEye = true;
aa.scatteringPdf = 0.0;
aa.abort = false;

SurfaceInteraction si;

intersectScene(aa.ray, si, false);
if (!si.hit) {



return vec4(0.0, 0.0, 0.0, 1.0);
}

OpenPbrResolvedMaterial mat;
dg(mat, si.materialIndex, si.uv, si.uv1, si.instanceIndex, si.vertexColor);
if (mat.materialType != SHADOW_CATCHER) {


return vec4(0.0, 0.0, 0.0, 1.0);
}

vec4 bg = cG(ray.o, ray.d);
background = vec4(bg.rgb * bg.a, bg.a);
if (!aa.abort) {
shadowCounts = sampleShadowCatcher(si, 0, aa);
}
return vec4(1.0, bg.a, bg.a >= 0.01 ? 1.0 : 0.0, 0.0);
}

void main() {
rG();
gW(v_Texcoord * viewportSize, int(uint(sampleCount) ^ dG(uint(sequenceSeed))));

if (dispersionWavelengths == 1 && wavelength > 0.0) { dp(CAMERA_WAVELENGTH); }
Ray cam = oG();
vec4 background;
vec2 shadowCounts;
vec4 aW = iu(cam, background, shadowCounts);

if (!(aW.x < INF && aW.x > -EPS)) {
aW = vec4(0.0);
shadowCounts = vec2(0.0);
}



out_shadowCatcher = vec4(aW.rgb, shadowCounts.x);
out_catcherBackground = background;


float visibility = 1.0 - (shadowCounts.y > 0.0 ? shadowCounts.x / shadowCounts.y : 0.0);
float jP = visibility * (background.a >= 0.01
? dot(background.rgb / background.a, vec3(0.2126, 0.7152, 0.0722))
: 1.0);
out_catcherMoments = aW.r > 0.0
? vec4(jP, jP * jP, 1.0, shadowCounts.y)
: vec4(0.0);

}`});function rg(i){const e=[],t=new Map,A=[];Tf();for(const r of i){const n=Ze(r.transform);for(let s=0;s<ri(r);s++){let o=r.geometry;o=ng(o,fa(r,s,new Float64Array(16),n)),o.normal?dA(o.normal.array,3,0,void 0,Ft,void 0):Pn(o);const l=r.materials.map(c=>{const f=ii(c);let p=t.get(f);return p===void 0&&(p=t.size,t.set(f,p),A.push(c)),p});e.push({geometry:o,materialIndex:l})}}return{geometry:Ul(e.map(({geometry:r})=>r),e.map(({materialIndex:r})=>r),new Map,!0),materials:A}}function ng(i,e){const{position:t,normal:A,uv:a,uv1:r,color:n,tangent:s,materialIndex:o,indices:l}={position:i.position.array,normal:i.normal.array,uv:i.uv&&i.uv.array,uv1:i.uv1&&i.uv1.array,color:i.color&&i.color.array,tangent:i.tangent&&i.tangent.array,materialIndex:i.materialIndex&&i.materialIndex.array,indices:i.indexArray},c=new oi({position:new Ce(new Float32Array(t),i.position.itemSize),normal:new Ce(new Float32Array(A),i.normal.itemSize),uv:a&&new Ce(a,i.uv.itemSize),uv1:r&&new Ce(r,i.uv1.itemSize),color:n&&new Ce(n,i.color.itemSize),tangent:s&&new Ce(new Float32Array(s),i.tangent.itemSize),materialIndex:o&&new Ce(o,i.materialIndex.itemSize),indices:l&&new Ce(l,i.indices.itemSize)});let f=hf($n(),e);return f==null&&(f=$n()),dA(c.position.array,3,0,void 0,An,e),c.normal&&(dA(c.normal.array,3,0,void 0,ts,f),dA(c.normal.array,3,0,void 0,Ft)),c.tangent&&dA(c.tangent.array,3,0,void 0,ts,f),c}const WA=.25;function sg(i,e,t,A,a,r){const n=cd(e,t,A,a,r);i.source={data:n,width:n.length/4,height:1}}class og{_aovPrimitiveCache=new sc;_renderer;_meshes=[];_sceneEnvironment=new Uc;_rectLightTextures=new Lc;_analyticLights=[];_analyticLightSelectionPmfs=new Float32Array(0);_analyticLightSelectionCdfs=new Float32Array(0);_envLightSelectionPmf=0;_materialData;_maxTextureArrayBytes=Di;_preparedMeshData;_membershipCache=new Cc;_pendingMembershipData;_materialChanges=new xc;_pendingMaterialUpdate;_pendingGeometryUpdates=new Set;_needsUpdateMeshData=!0;_needsUpdateMeshMembership=!1;_needsRefitTLAS=!1;_dirtyTransformMeshes=new Set;_dirtyColorMeshes=new Set;_tlas;_bvhData;_instancesData;_materialIndexData;_meshSnapshot=[];_snapshotByMesh=new WeakMap;_needsUpdateAnalyticLightsBuffer=!0;_debugBvhData;_lightTex=new Te(ct);_iesProfileTex=new Te(ct);_iesProfileColumns=1;_iesProfileTexelOffsets=new Int32Array(0);_openPbrEnergyLut=new Te({...ct,source:{data:yc(),width:Zt,height:MA}});_envMap=new Te(nr);_envMapDistribution=new Te(nr);_envImageSource;_skySource=new Km;_backgroundTex=new Te(nr);_hasEnvMap=!1;_hasBackground=!1;_groundedBackgroundParams=new Float32Array([0,0,0,0]);_groundedBackgroundCenter=new Float32Array([0,0]);_backgroundMapTransform=Yr();_backgroundMapRotation=new Float32Array([1,0,0,0,1,0,0,0,1]);_bounces=2;_bevelSamples=Fa;_clamping;_samplingCode=-1;_sequenceSeed=0;_zLogSPP=0;_positionBufferTex=new Te(ct);_normalBufferTex=new Te(ct);_colorBufferTex=new Te(ct);_tangentBufferTex=new Te(ct);_uvBufferTex=new Te(ct);_uv1BufferTex=new Te(ct);_bvhBufferTex=new Te(ct);_instancesBufferTex=new Te(ct);_matIndexBufferTex=new Te({...ct});_hasTransmission=!1;_hasAlpha=!1;_invalid=!1;_transmissiveAlphaMin=1;_mainPass;_shadowCatcherPass;_viewProjInv=ti();_apertureRadius=0;_focusDistance=10;_aovPass;_aovCenter;_tracePasses;_depthPass;_depthAbort=new AbortController;_depthAspect=1;_hasShadowCatcher=!1;_spectral=!1;constructor(e){this._renderer=e;const t={type:ee.FLOAT,minFilter:ee.LINEAR,magFilter:ee.LINEAR,wrapS:ee.CLAMP_TO_EDGE,wrapT:ee.CLAMP_TO_EDGE},A=Ag();A.parallelCompile=!0,go.parallelCompile=!0,this._mainPass=new nt("rayTrace",e,{shader:A,outputs:["color","albedo","normal","moments"],outputParams:{color:t,albedo:t,normal:t,moments:t}}),this._shadowCatcherPass=new nt("shadowCatcher",e,{shader:go,outputs:["shadowCatcher","catcherBackground","catcherMoments"],outputParams:{shadowCatcher:t,catcherBackground:t,catcherMoments:t}}),this._depthPass=new nt("Depth query",e,{shader:Xm,outputs:["depth"],outputParams:{depth:ct}}),this._aovPass=new nt("AOV accumulation",e,{shader:mo(!1),outputs:["geometry","position","diffuse","specular"],outputParams:Object.fromEntries(["geometry","position","diffuse","specular"].map(a=>[a,ct]))}),this._aovCenter=new nt("AOV center",e,{shader:mo(!0),outputs:["id","motion"],outputParams:{id:{...ct,type:5125},motion:ct}}),this._tracePasses=[this._aovPass,this._aovCenter,this._mainPass,this._shadowCatcherPass,this._depthPass],this._tracePasses.forEach(a=>{a.setDefines({OES_texture_float_linear:!!e.gl.getExtension("OES_texture_float_linear")})}),this._mainPass.setUniform("openPbrEnergyLut",this._openPbrEnergyLut),this._aovPass.setUniform("openPbrEnergyLut",this._openPbrEnergyLut)}preparePrograms(){this.prepare();const e=this._mainPass.isProgramReady(),t=!this._hasShadowCatcher||this._shadowCatcherPass.isProgramReady();return e&&t}createPass(e,t,A=!1){this.prepare();const a={clear:e,blend:!e,scissor:t};this._mainPass.createPass({},void 0,a),this._hasShadowCatcher&&!A&&this._shadowCatcherPass.createPass({},void 0,a)}getOutput(e){return e==="shadowCatcher"||e==="catcherBackground"||e==="catcherMoments"?this._shadowCatcherPass.getOutput(e):this._mainPass.getOutput(e)}setBounce(e){const t=ma(e),A=this._bounces!==t;return this._bounces=t,A}setClamping(e){const t=this._clamping!==e;return this._clamping=e,t}setBevelSamples(e){const t=Un(e),A=this._bevelSamples!==t;return A&&(this._bevelSamples=t),A}_setEnvMap(e){!kc(e,this._envImageSource)&&e&&(this._envMap.source=e,this._envMapDistribution.source=Nc(e)),this._envImageSource=e,this._tracePasses.forEach(t=>{t.setUniform("envMap",e?this._envMap:null),t.setUniform("envMapDistribution",e?this._envMapDistribution:null),t.setUniform("envLightSelectionPmf",this._envLightSelectionPmf),t.setDefines({USE_ENVMAP:!!e})}),this._hasEnvMap=!!e}setBackground(e){this._backgroundMapTransform.set(Yr(e));const t=Sc(e);this._backgroundMapRotation.set([t[0],t[1],t[2],t[4],t[5],t[6],t[8],t[9],t[10]]);const A=e?this._skySource.resolve(Dc(e)):void 0;A&&(this._backgroundTex.source=A),this._hasBackground=!!A;const a=e&&!Array.isArray(e)&&"type"in e&&e.type==="GroundedSkybox"?e:void 0;this._groundedBackgroundParams.set(a?[Math.max(a.height,1e-4),Math.max(a.radius,1e-4),a.groundHeight??0,1]:[0,0,0,0]),this._groundedBackgroundCenter.set(a?.center??[0,0])}setTransmissiveOutputAlphaMin(e){const t=this._transmissiveAlphaMin!==e;return this._transmissiveAlphaMin=e,t}setMeshes(e,t){for(const o of t?.colors??[])this._dirtyColorMeshes.add(o);if(t&&this._preparedMeshData&&this._materialData&&!this._needsUpdateMeshData&&e===this._meshes){const o=this._materialChanges.classify(t.materials??[]);if(o.level!=="geometry"&&Qc(this._preparedMeshData,t.geometries??[])){if(t.materials?.length){const l=this._pendingMaterialUpdate;this._pendingMaterialUpdate={level:l?.level==="textures"?"textures":o.level,emission:!!l?.emission||o.emission,emissiveMap:!!l?.emissiveMap||o.emissiveMap,materials:new Set([...l?.materials??[],...t.materials])},this._meshSnapshot.forEach(c=>{c.materialKeys=c.materials.map(ii)})}for(const l of t.geometries??[])this._pendingGeometryUpdates.add(l);for(const l of this._meshSnapshot)this._pendingGeometryUpdates.has(l.geometry)&&(l.geometryVersion=l.geometry.version);for(const l of t.transforms??[]){const c=this._snapshotByMesh.get(l);if(c){for(let f=0;f<16;f++)c.matrix[f]=l.transform[f];this._dirtyTransformMeshes.add(l),this._needsRefitTLAS=!0}}return!!t.materials?.length||!!t.transforms?.length||!!t.colors?.length||!!t.geometries?.length}}const A=!!t?.materials?.length,a=e.map(o=>({mesh:o,instanceCount:o instanceof rt?o.count:1,instanceVersion:o instanceof rt?o.transformsVersion:0,instanceTransforms:o instanceof rt?o.transforms:void 0,instanceColors:o instanceof rt?o.colors:void 0,colorVersion:o instanceof rt?o.colorsVersion:0,geometry:o.geometry,materials:o.materials.slice(),materialKeys:o.materials.map(ii),geometryVersion:o.geometry.version,positionArray:o.geometry.position.array,indexArray:o.geometry.indices.array,matrix:Array.from(o.transform)})),r=a.length!==this._meshSnapshot.length||a.some((o,l)=>o.mesh!==this._meshSnapshot[l]?.mesh||o.instanceCount!==this._meshSnapshot[l]?.instanceCount||o.materials.some((c,f)=>c!==this._meshSnapshot[l]?.materials[f])),n=!this._needsUpdateMeshData&&r&&this._preparedMeshData?this._membershipCache.update(this._preparedMeshData,e):void 0;if(n){const o=new Map(this._meshSnapshot.flatMap(c=>c.materials.map((f,p)=>[f,c.materialKeys[p]]))),l=n.materials.length!==this._preparedMeshData.materials.length||n.materials.some((c,f)=>c!==this._preparedMeshData.materials[f]||o.has(c)&&ii(c)!==o.get(c));return this._pendingMembershipData=n,this._meshes=e,this._meshSnapshot=a,this._snapshotByMesh=new WeakMap,a.forEach(c=>this._snapshotByMesh.set(c.mesh,c)),this._needsUpdateMeshMembership=!0,this._needsRefitTLAS=!1,this._dirtyTransformMeshes.clear(),l&&(this._pendingMaterialUpdate={level:"textures",emission:!0,emissiveMap:!0,materials:new Set(n.materials)}),!0}const s=a.length!==this._meshSnapshot.length||a.some((o,l)=>{const c=this._meshSnapshot[l];return!c||o.mesh!==c.mesh||o.instanceCount!==c.instanceCount||o.instanceVersion!==c.instanceVersion||o.instanceTransforms!==c.instanceTransforms||o.geometry!==c.geometry||o.colorVersion!==c.colorVersion||o.instanceColors!==c.instanceColors||o.materials.length!==c.materials.length||o.materials.some((f,p)=>f!==c.materials[p])||o.materialKeys.some((f,p)=>f!==c.materialKeys[p])||o.geometryVersion!==c.geometryVersion||o.matrix.some((f,p)=>f!==c.matrix[p])});return a.forEach((o,l)=>{const c=this._meshSnapshot[l];c&&o.geometry===c.geometry&&(o.geometryVersion!==c.geometryVersion||o.positionArray!==c.positionArray||o.indexArray!==c.indexArray)&&(o.materials[0]?.displacementMap&&Math.abs(o.materials[0].displacementScale)>1e-6||On(this._preparedMeshData,o.geometry)||!He(o.geometry)||!Sn(He(o.geometry),o.geometry))&&Yt(o.geometry,void 0)}),this._meshSnapshot=a,this._snapshotByMesh=new WeakMap,a.forEach(o=>this._snapshotByMesh.set(o.mesh,o)),!s&&t&&!A?!1:(this._meshes=e,this._needsUpdateMeshData=!0,this._needsRefitTLAS=!1,this._dirtyTransformMeshes.clear(),this._debugBvhData=void 0,!0)}setTextureAtlasBudget(e){const t=Number.isFinite(e)?Math.max(4,Math.floor(e)):Di;return t===this._maxTextureArrayBytes?!1:(this._maxTextureArrayBytes=t,this._needsUpdateMeshData=!0,!0)}getDebugBVHData(){if(!this._debugBvhData){const e=rg(this._meshes),t=Ra(e.geometry);this._debugBvhData={buffer:t.buffer}}return this._debugBvhData}_loadDiagnosticAccumulation(e,t){this._mainPass.loadDiagnosticOutputs({color:e.color,albedo:e.albedo,normal:e.normal,moments:e.moments}),this._shadowCatcherPass.loadDiagnosticOutputs({shadowCatcher:e.shadowCatcher,catcherBackground:e.catcherBackground,catcherMoments:e.catcherMoments}),this._hasShadowCatcher=t}getDiagnostics(){return{textureAtlas:this._materialData?.textureAtlasStats}}_updateMeshData(){this._pendingGeometryUpdates.clear(),this._needsUpdateMeshData=!1;const e=Jl(this._meshes,{displacement:!1});this._preparedMeshData=e,this._membershipCache.capture(e),this._pendingMembershipData=void 0,this._needsUpdateMeshMembership=!1;const t=e.geometry,A=e.materials,a=gA(e.instances,e.blases);this._tlas=a;const r=new Float32Array(a.buffer),n=this._instancesData=new Float32Array(a.instancesBuffer),s=new Float32Array(XA(e.blases)),o=this._bvhData=new Float32Array(r.length+s.length),l=r.length/4;o.set(r),o.set(s,l*4),t.position.array.length>0&&(wt(this._positionBufferTex,t.position.array,3),wt(this._normalBufferTex,t.normal.array,3),t.color&&wt(this._colorBufferTex,t.color.array,3),t.tangent&&wt(this._tangentBufferTex,t.tangent.array,4),t.uv&&wt(this._uvBufferTex,t.uv.array,2),t.uv1&&wt(this._uv1BufferTex,t.uv1.array,2),t.materialIndex&&wt(this._matIndexBufferTex,this._materialIndexData=new Float32Array(t.materialIndex.array),4)),o.length>0&&(wt(this._bvhBufferTex,o,4),wt(this._instancesBufferTex,n,4)),this._materialData?.dispose(this._renderer.gl);const c=new na(A,this._analyticLights,{maxTextureArrayBytes:this._maxTextureArrayBytes,maxTextureArrayLayers:this._renderer.gl.getParameter(this._renderer.gl.MAX_ARRAY_TEXTURE_LAYERS),maxTextureDimension2D:this._renderer.gl.getParameter(this._renderer.gl.MAX_TEXTURE_SIZE)});return this._materialData=c,this._tracePasses.forEach(f=>{f.setUniforms({bvhBuffer:this._bvhBufferTex,instancesBuffer:this._instancesBufferTex,positionBuffer:this._positionBufferTex,normalBuffer:this._normalBufferTex,tangentBuffer:t.tangent?this._tangentBufferTex:null,colorBuffer:t.color?this._colorBufferTex:null,uvBuffer:t.uv?this._uvBufferTex:null,uv1Buffer:t.uv1?this._uv1BufferTex:null,materialIndexBuffer:this._matIndexBufferTex,bvhColumns:_i(o.length/4).columnsLog,vertexColumns:_i(Ce.getCount(t.position)).columnsLog,instancesColumns:_i(n.length/4).columnsLog,blasOffset:l,isEmptyScene:+(e.instances.length===0)})}),this._updateMaterialConstants(A,c,t),this._materialChanges.capture(A),this._pendingMaterialUpdate=void 0,o}_updateMaterialConstants(e,t,A){const r=e.some(o=>o.shadowCatcher),n=e.some(o=>o.bevelSize>0),s=e.some(un);this._hasShadowCatcher=r,this._hasTransmission=e.some(o=>o.transmissionWeight>0||o.mapAlphaUsage==="transmission"),this._hasAlpha=e.some(o=>pA(o)!=="opaque"),this._spectral=e.some(o=>o.transmissionDispersionScale>0),this._tracePasses.forEach(o=>{o.setDefines({OES_texture_float_linear:!0,STACK_SIZE:50,USE_VERTEX_COLOR:A.color!=null,USE_TANGENT:A.tangent!=null,USE_COAT_NORMAL_FRAMES:e.some(l=>l.coatWeight>0&&(!!l.normalMap||!!l.coatNormalMap)),HAS_TRANSMISSION:this._hasTransmission,HAS_GLTF_ANISOTROPY:e.some(l=>l.specularAnisotropyModel==="gltf"&&l.specularAnisotropy>0),HAS_BEVEL:n,HAS_MEDIUM:s,HAS_ALPHA:this._hasAlpha,BEVEL_SAMPLES:this._bevelSamples,RECT_LIGHT:Sa,SPHERE_LIGHT:Pa,DIRECTIONAL_LIGHT:Ia,USE_RR:!0,RR_MAX:s?12:2,...t.defines}),t.setToPass(o)})}_updateMeshMembership(){const e=this._pendingMembershipData;this._preparedMeshData=e;const t=this._tlas=gA(e.instances,e.blases),A=new Float32Array(XA(e.blases)),a=this._bvhData=new Float32Array(t.buffer.byteLength/4+A.length);a.set(new Float32Array(t.buffer)),a.set(A,t.buffer.byteLength/4),this._instancesData=new Float32Array(t.instancesBuffer),wt(this._bvhBufferTex,a,4),wt(this._instancesBufferTex,this._instancesData,4),this._tracePasses.forEach(r=>r.setUniforms({bvhColumns:_i(a.length/4).columnsLog,instancesColumns:_i(this._instancesData.length/4).columnsLog,blasOffset:t.buffer.byteLength/16,isEmptyScene:+(e.instances.length===0)})),this._pendingMembershipData=void 0,this._needsUpdateMeshMembership=!1,this._debugBvhData=void 0}_updateGeometryData(){const e=this._preparedMeshData,t=this._tlas,A=Mc(e,this._pendingGeometryUpdates);for(const{first:a,count:r,topologyChanged:n,deformationOnly:s}of A.vertices){for(const[l,c]of[[e.geometry.position,this._positionBufferTex],[e.geometry.normal,this._normalBufferTex],[e.geometry.tangent,this._tangentBufferTex],[e.geometry.color,this._colorBufferTex],[e.geometry.uv,this._uvBufferTex],[e.geometry.uv1,this._uv1BufferTex]])l&&(!s||l===e.geometry.position||l===e.geometry.normal||l===e.geometry.tangent)&&c.updateDataRange(this._renderer.gl,l.array,a*l.itemSize*4,r*l.itemSize*4);if(!n)continue;const o=this._materialIndexData;for(let l=a*4;l<(a+r)*4;l++)o[l]=e.geometry.materialIndex.array[l];this._matIndexBufferTex.updateDataRange(this._renderer.gl,o,a*16,r*16)}for(const a of A.meshes)this._dirtyTransformMeshes.add(a);if(A.relocated)for(const a of e.instanceBindings)this._dirtyTransformMeshes.add(a.mesh);if(A.resized){e.instances=Ii(e.instanceBindings),da(t,e.instances,e.blases);const a=new Float32Array(XA(e.blases));this._bvhData=new Float32Array(t.buffer.byteLength/4+a.length),this._bvhData.set(new Float32Array(t.buffer)),this._bvhData.set(a,t.buffer.byteLength/4),wt(this._bvhBufferTex,this._bvhData,4),this._tracePasses.forEach(r=>r.setUniform("bvhColumns",_i(this._bvhData.length/4).columnsLog))}else{const a=[];for(const{blas:r,offset:n}of A.blases){const s=t.buffer.byteLength+n;new Uint8Array(this._bvhData.buffer).set(new Uint8Array(r.buffer),s),a.push({offset:s,size:r.buffer.byteLength})}for(const{offset:r,size:n}of xA(a))this._bvhBufferTex.updateDataRange(this._renderer.gl,this._bvhData,r,n)}this._needsRefitTLAS=!0,this._pendingGeometryUpdates.clear(),this._debugBvhData=void 0}_updateMeshColors(){const e=this._preparedMeshData,t=this._tlas;if(e&&t){const A=$l(e.instanceBindings,e.instances,this._dirtyColorMeshes),a=Yl(t,e.instances,A);for(const{offset:r,size:n}of a)this._instancesBufferTex.updateDataRange(this._renderer.gl,this._instancesData,r,n)}this._dirtyColorMeshes.clear()}_refitMeshInstances(){const e=this._preparedMeshData,t=this._tlas,A=Rl(e.instanceBindings,this._dirtyTransformMeshes,e.instances),a=e.instances;if(e.instances=Ii(e.instanceBindings,e.instances,A),!Cl(a,e.instances)){this._pendingMembershipData=e,this._updateMeshMembership(),this._dirtyTransformMeshes.clear(),this._needsRefitTLAS=!1;return}const r=da(t,e.instances,e.blases,A);this._bvhData.set(new Float32Array(t.buffer));for(const{offset:n,size:s}of r.tlasRanges)this._bvhBufferTex.updateDataRange(this._renderer.gl,this._bvhData,n,s);for(const{offset:n,size:s}of r.instanceRanges)this._instancesBufferTex.updateDataRange(this._renderer.gl,this._instancesData,n,s);this._dirtyTransformMeshes.clear(),this._needsRefitTLAS=!1,this._debugBvhData=void 0}_updateMaterialData(){const e=this._pendingMaterialUpdate,t=this._preparedMeshData;let A=this._materialData;e.level==="textures"?(A.dispose(this._renderer.gl),A=this._materialData=new na(t.materials,this._analyticLights,{maxTextureArrayBytes:this._maxTextureArrayBytes,maxTextureArrayLayers:this._renderer.gl.getParameter(this._renderer.gl.MAX_ARRAY_TEXTURE_LAYERS),maxTextureDimension2D:this._renderer.gl.getParameter(this._renderer.gl.MAX_TEXTURE_SIZE)}),this._needsUpdateAnalyticLightsBuffer=!0):A.repackParams(t.materials),this._updateMaterialConstants(t.materials,A,t.geometry),(e.emission||e.emissiveMap)&&(t.emissiveBindings=t.instanceBindings.filter(a=>a.materialIndices.some(r=>Ba(t.materials[r])))),this._materialChanges.capture([...e.materials]),this._pendingMaterialUpdate=void 0}setLights(e){const t=e.filter(d=>d.type==="DirectionalLight"||d.type==="SphereLight"||d.type==="SpotLight"||d.type==="RectLight"),A=t.length,a=this._skySource.resolve(this._sceneEnvironment.update(e)),r=Pc(e),n=[r[0],r[1],r[2],r[4],r[5],r[6],r[8],r[9],r[10]];this._tracePasses.forEach(d=>d.setUniform("environmentRotation",n));const s=Sl(a),o=t.map(Il),l=s+o.reduce((d,m)=>d+m,0),c=t.length+(a?1:0),f=c>0?1/c:0;this._envLightSelectionPmf=a?l>0?(1-WA)*f+WA*(s/l):f:0,this._analyticLightSelectionPmfs=Float32Array.from(o,d=>l>0?(1-WA)*f+WA*(d/l):f);let p=this._envLightSelectionPmf;this._analyticLightSelectionCdfs=Float32Array.from(this._analyticLightSelectionPmfs,d=>(p+=d,p)),this._analyticLightSelectionCdfs.length>0&&(this._analyticLightSelectionCdfs[this._analyticLightSelectionCdfs.length-1]=1),this._tracePasses.forEach(d=>{d.setDefines({NUM_LIGHTS:A,HAS_SPHERE_LIGHTS:!!t.find(m=>m.type==="SphereLight"),HAS_SPOT_LIGHTS:!!t.find(m=>m.type==="SpotLight"),HAS_RECT_LIGHTS:!!t.find(m=>m.type==="RectLight"),HAS_DIRECTIONAL_LIGHTS:!!t.find(m=>m.type==="DirectionalLight")})});const h=this._rectLightTextures.update(t);this._analyticLights=t;const u=Pl(t);this._iesProfileTexelOffsets=u.offsets,this._iesProfileColumns=wt(this._iesProfileTex,u.data.length?u.data:new Float32Array(4),4).columns,h&&(this._needsUpdateMeshData=!0),this._needsUpdateAnalyticLightsBuffer=!0,this._setEnvMap(a)}_getViewProjInv(e,t){BA(t,e.getProjectionMatrix(this._depthAspect)),ZA(t,e.transform,t)}setCamera(e){const t=this._viewProjInv;this._apertureRadius=va(e),this._focusDistance=e.focusDistance,this._getViewProjInv(e,t),this._tracePasses.forEach(A=>{A.setUniform("viewProjectionInv",t),A.setUniform("viewInv",e.transform),A.setUniform("cameraApertureRadius",this._apertureRadius),A.setUniform("cameraFocusDistance",e.focusDistance)})}cameraChanged(e){const t=ti();return this._getViewProjInv(e,t),!Fc(this._viewProjInv,t)||va(e)!==this._apertureRadius||e.focusDistance!==this._focusDistance}setSize(e,t,A=e/t){this._depthAspect=A,this._tracePasses.forEach(a=>{a.setSize(a===this._depthPass?Gt:e,a===this._depthPass?Gt:t),a.setUniform("pixelSize",[1/e,1/t])})}setJitter(e,t){this._tracePasses.forEach(A=>{A.setUniform("jitter",[e,t])})}releaseTarget(e){this._mainPass.releaseTarget(e),this._shadowCatcherPass.releaseTarget(e)}getTargetMemoryBytes(e){return this._mainPass.getMemoryBytes(e)+this._shadowCatcherPass.getMemoryBytes(e)}useTarget(e){this._mainPass.useTarget(e),this._shadowCatcherPass.useTarget(e)}setQuality(e){this._tracePasses.forEach(t=>{t.setUniform("bounceLimit",ma(e.bounces)),t.setUniform("bevelEnabled",e.bevel),t.setUniform("dispersionWavelengths",e.dispersionWavelengths)})}setWavelength(e){this._tracePasses.forEach(t=>{t.setUniform("wavelength",e)})}setSampleCount(e){this._tracePasses.forEach(t=>{t.setUniform("sampleCount",e)})}isInvalid(){return this._invalid}hasShadowCatcher(){return this._hasShadowCatcher}hasDispersion(){return this._spectral}prepare(){if(this._needsUpdateMeshData?this._updateMeshData():this._needsUpdateMeshMembership&&this._updateMeshMembership(),this._pendingGeometryUpdates.size&&this._updateGeometryData(),this._needsRefitTLAS&&this._refitMeshInstances(),this._dirtyColorMeshes.size&&this._updateMeshColors(),this._pendingMaterialUpdate&&this._updateMaterialData(),this._needsUpdateAnalyticLightsBuffer){const e=this._analyticLights;e.length>0&&sg(this._lightTex,e,this._materialData.getLightTexturesIndices(),this._analyticLightSelectionPmfs,this._analyticLightSelectionCdfs,this._iesProfileTexelOffsets),this._needsUpdateAnalyticLightsBuffer=!1}this._tracePasses.forEach(e=>{e.setUniform("backgroundMap",this._hasBackground?this._backgroundTex:this._hasEnvMap?this._envMap:null),e.setUniform("transmissiveOutputAlphaMin",Math.max(Math.min(1,this._transmissiveAlphaMin),0)),e.setUniform("lightsTex",this._lightTex),e.setUniform("iesProfileData",this._iesProfileTex),e.setUniform("iesProfileColumns",this._iesProfileColumns),e.setUniform("groundedBackgroundParams",this._groundedBackgroundParams),e.setUniform("groundedBackgroundCenter",this._groundedBackgroundCenter),e.setUniform("backgroundMapTransform",this._backgroundMapTransform),e.setUniform("backgroundMapRotation",this._backgroundMapRotation),e.setDefines({BOUNCES:zc()?Math.min(this._bounces,3)*(this._hasTransmission||this._hasAlpha?2:1):this._bounces,CLAMPING:this._clamping||void 0,BEVEL_SAMPLES:this._bevelSamples,USE_BACKGROUND:this._hasBackground,USE_GROUNDED_BACKGROUND:this._groundedBackgroundParams[3]>0})})}setSamplingPattern(e,t,A=0){const a=hc(e),r=pc(a===1?t-1:t),n=this._samplingCode!==a||this._sequenceSeed!==A>>>0||a===1&&this._zLogSPP!==r;return this._samplingCode=a,this._sequenceSeed=A>>>0,this._zLogSPP=r,this._tracePasses.forEach(s=>{s.setUniform("samplingPattern",a),s.setUniform("sequenceSeed",this._sequenceSeed),s.setUniform("zSobolLogSPP",r)}),n}setSampleSequenceOffset(e){}prepareAovs(e,t,A,a,r){if(!r.length||!this._preparedMeshData||!this._tlas)return!0;if(!this._renderer.gl.getExtension("EXT_color_buffer_float"))throw new Error("AOV requires EXT_color_buffer_float");if(this.prepare(),e.resize(A,a),this._aovPass.setDefines({AOV_REFLECTANCE:(ht(r)&24)!==0}),!e.frame){const c=oc(this._preparedMeshData,this._tlas,t,A,a,e.history,this._aovPrimitiveCache.get(this._preparedMeshData,this._tlas));e.frame=c.frame,e.setScene(c.words)}this._aovCenter.setUniform("aovScene",e.scene),this._aovCenter.setUniform("previousId",e.previousCenter.id),this._aovCenter.setUniform("previousMotion",e.previousCenter.motion),this._aovPass.setUniform("aovScene",e.scene),this._aovCenter.setSize(A,a),this._aovPass.setSize(A,a);const s=e.accumulation[(e.samples+1)%2],o=this._aovCenter.isProgramReady(),l=this._aovPass.isProgramReady({previousGeometry:s.geometry,previousPosition:s.position,previousDiffuse:s.diffuse,previousSpecular:s.specular});return o&&l}renderAovs(e,t,A,a,r,n,s,o=0){if(!s.length||!this._preparedMeshData||!this._tlas)return!0;if(!this.prepareAovs(e,t,A,a,s))return!1;e.centerReady||(this._aovCenter.createPass({},e.center),e.centerReady=!0,e.history.accept(e.frame));const l=Math.min(r,n);for((ht(s)&31)===0&&(e.samples=l);e.samples<l;){const c=e.accumulation[e.samples%2],f=e.accumulation[(e.samples+1)%2];this._aovPass.setUniform("aovMask",ht(s)),this._aovPass.setUniform("aovSample",e.samples),this._aovPass.setUniform("sampleCount",e.samples+o),this._aovPass.createPass({previousGeometry:f.geometry,previousPosition:f.position,previousDiffuse:f.diffuse,previousSpecular:f.specular},c),e.samples++}return!0}async readDepthSamples(e,t){if(this._depthAbort.signal.aborted||this._invalid||!this._preparedMeshData||!this._renderer.isAllProgramCompiled())return;this.prepare(),this._depthPass.setUniform("depthArea",Dn(e,t??this._depthAspect)),this._depthPass.createPass({});const A=await Lm(this._renderer.gl,Gt,Gt,this._depthAbort.signal);return Xl(A)}dispose(){this._skySource.dispose(),this._depthAbort.abort(),this._materialData?.dispose(this._renderer.gl),this._materialData=void 0,this._tracePasses.forEach(t=>t.dispose());const e=this._renderer.gl;[this._lightTex,this._openPbrEnergyLut,this._envMap,this._envMapDistribution,this._backgroundTex,this._positionBufferTex,this._normalBufferTex,this._colorBufferTex,this._tangentBufferTex,this._uvBufferTex,this._uv1BufferTex,this._bvhBufferTex,this._instancesBufferTex,this._matIndexBufferTex].forEach(t=>t.dispose(e))}}const lg=new ut({name:"normalizeRayTraceOutput",outputs:["color","albedo","normal","shadowCatcher"],uniforms:{colorTex:M.uniform("sampler2D"),albedoTex:M.uniform("sampler2D"),normalTex:M.uniform("sampler2D"),shadowCatcherTex:M.uniform("sampler2D"),catcherMomentsTex:M.uniform("sampler2D"),sampleCount:M.uniform("float",1),lightScale:M.uniform("vec2",[1,1])},main:he`
void main() {
vec2 uv = lightScale * v_Texcoord;
vec4 tb = sample_albedoTex(uv);
float hit = tb.a;
vec4 tf = sample_normalTex(uv);



float tK = max(tf.a, 1.0);
vec3 albedo = tb.rgb / tK;
vec3 normal = tf.rgb / tK;
vec4 shadowCatcher = sample_shadowCatcherTex(uv);



float tj = sample_catcherMomentsTex(uv).w;
float opacity = tj > 0.0 ? shadowCatcher.a / tj : 0.0;
shadowCatcher /= sampleCount;
shadowCatcher.a = 1.0 - shadowCatcher.r * opacity;
vec4 tQ = sample_colorTex(uv);




vec4 light = vec4(tQ.rgb / (hit > 0.0 ? hit : sampleCount), tQ.a / sampleCount);



out_normal = dot(normal, normal) > 0.1 ? vec4(normal * 0.5 + 0.5, 1.0) : vec4(0.0);
out_albedo = vec4(albedo, 1.0);
out_shadowCatcher = shadowCatcher;
out_color = light;
}
`});class cg{_renderer;_pass;_layersPass;constructor(e){this._renderer=e,this._pass=new nt("rayTraceOutput",e,{shader:lg,outputs:["color","albedo","normal","shadowCatcher"],outputParams:{color:{type:ee.HALF_FLOAT,minFilter:ee.LINEAR,magFilter:ee.LINEAR},albedo:{type:ee.UNSIGNED_BYTE},normal:{type:ee.UNSIGNED_BYTE},shadowCatcher:{type:ee.HALF_FLOAT}}}),this._layersPass=new nt("rayTraceLayers",e,{shader:new ut({name:"normalizeRayTraceLayers",outputs:["foreground","catcherBackground"],uniforms:{colorTex:M.uniform("sampler2D"),albedoTex:M.uniform("sampler2D"),normalTex:M.uniform("sampler2D"),shadowCatcherTex:M.uniform("sampler2D"),catcherBackgroundTex:M.uniform("sampler2D"),sampleCount:M.uniform("float",1)},main:he`
void main() {
vec4 light = sample_colorTex(v_Texcoord);
vec4 mask = sample_shadowCatcherTex(v_Texcoord);
vec4 background = sample_catcherBackgroundTex(v_Texcoord);
float hit = sample_albedoTex(v_Texcoord).a;

float rj = max(sample_normalTex(v_Texcoord).a, 1.0) / sampleCount;
float jo = max(hit - mask.b * rj, 0.0);
out_foreground = vec4(
(light.rgb - background.rgb * rj)
/ (jo > 0.0 ? jo : sampleCount),
clamp((light.a - background.a) / sampleCount, 0.0, 1.0)
);
out_catcherBackground = background / sampleCount;
}`}),outputs:["foreground","catcherBackground"],outputParams:{foreground:{type:ee.HALF_FLOAT},catcherBackground:{type:ee.HALF_FLOAT}}})}setSize(e,t){this._pass.setSize(e,t),this._layersPass.setSize(e,t)}setSampleCount(e){this._pass.setUniform("sampleCount",Math.max(e,1)),this._layersPass.setUniform("sampleCount",Math.max(e,1))}createPass(e){this._pass.setOutputs(e.hasShadowCatcher()?["color","albedo","normal","shadowCatcher"]:["color","albedo","normal"]),this._pass.createPass({colorTex:e.getOutput("color"),albedoTex:e.getOutput("albedo"),normalTex:e.getOutput("normal"),shadowCatcherTex:e.hasShadowCatcher()?e.getOutput("shadowCatcher"):this._renderer.emptyTexture,catcherMomentsTex:e.hasShadowCatcher()?e.getOutput("catcherMoments"):this._renderer.emptyTexture},void 0,{clear:!0}),e.hasShadowCatcher()?(this._layersPass.setOutputs(["foreground","catcherBackground"]),this._layersPass.createPass({colorTex:e.getOutput("color"),albedoTex:e.getOutput("albedo"),normalTex:e.getOutput("normal"),shadowCatcherTex:e.getOutput("shadowCatcher"),catcherBackgroundTex:e.getOutput("catcherBackground")},void 0,{clear:!0})):this._layersPass.setOutputs([])}getOutput(e){return e==="foreground"||e==="catcherBackground"?this._layersPass.getOutput(e)??this._renderer.emptyTexture:this._pass.getOutput(e)??this._renderer.emptyTexture}retainOutput(e){this._pass.retainOutput(e),this._layersPass.retainOutput(e)}releaseOutput(e){this._pass.releaseOutput(e),this._layersPass.releaseOutput(e)}getMemoryBytes(){return this._pass.getMemoryBytes()+this._layersPass.getMemoryBytes()}dispose(){this._pass.dispose(),this._layersPass.dispose()}}const fg=new ut({name:"blend",uniforms:{colorTex1:M.uniform("sampler2D"),colorTex2:M.uniform("sampler2D"),weight1:M.uniform("float",.5),weight2:M.uniform("float",.5)},main:he`void main() {
out_color = sample_colorTex1(v_Texcoord) * weight1
+ sample_colorTex2(v_Texcoord) * weight2;
}`}),ug=new ut({name:"downsample",uniforms:{colorTex:M.uniform("sampler2D")},main:he`void main() {
vec2 d = 1.0 / vec2(colorTexRegion());
out_color = (sample_colorTex(v_Texcoord + d * vec2(-0.5, -0.5))
+ sample_colorTex(v_Texcoord + d * vec2(0.5, -0.5))
+ sample_colorTex(v_Texcoord + d * vec2(-0.5, 0.5))
+ sample_colorTex(v_Texcoord + d * vec2(0.5, 0.5))) * 0.25;
}`}),vo=new ut({name:"gaussianBlur",uniforms:{colorTex:M.uniform("sampler2D"),blurDir:M.uniform("int",0),blurSize:M.uniform("float",1)},main:he`void main() {
vec2 size = vec2(colorTexRegion());
vec2 d = (blurDir == 0 ? vec2(1.0, 0.0) : vec2(0.0, 1.0)) * blurSize / size;
out_color = sample_colorTex(v_Texcoord) * 0.227027
+ (sample_colorTex(v_Texcoord + d * 1.384615) + sample_colorTex(v_Texcoord - d * 1.384615)) * 0.316216
+ (sample_colorTex(v_Texcoord + d * 3.230769) + sample_colorTex(v_Texcoord - d * 3.230769)) * 0.070270;
}`}),dg=new ut({name:"bloomBright",uniforms:{colorTex:M.uniform("sampler2D"),threshold:M.uniform("float",1),scale:M.uniform("float",1)},main:he`
const vec3 wE = vec3(0.2125, 0.7154, 0.0721);
vec4 tS(vec4 a, vec4 b, vec4 c) {
return a + b + c - min(min(a, b), c) - max(max(a, b), c);
}
void main() {
vec2 d = 1.0 / vec2(colorTexRegion());
vec4 dk = sample_colorTex(v_Texcoord);
vec4 s1 = sample_colorTex(v_Texcoord - vec2(d.x, 0.0));
vec4 s2 = sample_colorTex(v_Texcoord + vec2(d.x, 0.0));
vec4 s3 = sample_colorTex(v_Texcoord - vec2(0.0, d.y));
vec4 s4 = sample_colorTex(v_Texcoord + vec2(0.0, d.y));
dk = tS(tS(dk, s1, s2), s3, s4);
float lum = dot(dk.rgb, wE);
out_color = lum > threshold && dk.a > 0.0
? vec4(dk.rgb * scale, dk.a)
: vec4(0.0, 0.0, 0.0, dk.a);
}`}),hg=new ut({name:"compose",uniforms:{colorTex:M.uniform("sampler2D"),foregroundTex:M.uniform("sampler2D"),catcherBackgroundTex:M.uniform("sampler2D"),shadowCatcherTex:M.uniform("sampler2D"),bloomTex:M.uniform("sampler2D"),exposure:M.uniform("float",1),shadowCatcherColor:M.uniform("vec3",[0,0,0]),shadowCatcherAlpha:M.uniform("float",1),shadowCatcherEnabled:M.uniform("float",0),bloomIntensity:M.uniform("float",0),toneMappingMode:M.uniform("int",0),contrast:M.uniform("float",1),saturation:M.uniform("float",1),temperature:M.uniform("float",0),tint:M.uniform("float",0),vignette:M.uniform("float",0),outputMode:M.uniform("int",0),sRGBOutput:M.uniform("bool",1)},main:he`
vec3 od(vec3 color) {
color = max(color, 0.0);
return mix(1.055 * pow(color, vec3(1.0 / 2.4)) - 0.055,
color * 12.92, lessThanEqual(color, vec3(0.0031308)));
}
vec3 ky(vec3 color) {
return clamp(color, 0.0, 1.0);
}
vec3 jf(vec3 color) {
return clamp(color / (vec3(1.0) + color), 0.0, 1.0);
}
vec3 kj(vec3 color) {
color = max(vec3(0.0), color - 0.004);
return pow((color * (6.2 * color + 0.5)) /
(color * (6.2 * color + 1.7) + 0.06), vec3(2.2));
}
vec3 pH(vec3 value) {
vec3 lv = value * (value + 0.0245786) - 0.000090537;
vec3 aq = value * (0.983729 * value + 0.4329510) + 0.238081;
return lv / aq;
}
vec3 mh(vec3 color) {
const mat3 qs = mat3(
vec3(0.59719, 0.07600, 0.02840),
vec3(0.35458, 0.90834, 0.13383),
vec3(0.04823, 0.01566, 0.83777)
);
const mat3 outputMatrix = mat3(
vec3(1.60475, -0.10208, -0.00327),
vec3(-0.53108, 1.10813, -0.07276),
vec3(-0.07367, -0.00605, 1.07602)
);
color = qs * (color / 0.6);
return clamp(outputMatrix * pH(color), 0.0, 1.0);
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
vec3(1.6605, -0.1246, -0.0182),
vec3(-0.5876, 1.1329, -0.1006),
vec3(-0.0728, -0.0083, 1.1187)
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
vec3(0.6274, 0.0691, 0.0164),
vec3(0.3293, 0.9195, 0.0880),
vec3(0.0433, 0.0113, 0.8956)
);
vec3 gh(vec3 value) {
vec3 nM = value * value;
vec3 rR = nM * nM;
return 15.5 * rR * nM - 40.14 * rR * value
+ 31.96 * rR - 6.868 * nM * value
+ 0.4298 * nM + 0.1191 * value - 0.00232;
}
vec3 mM(vec3 color) {
const mat3 qu = mat3(
vec3(0.856627153315983, 0.137318972929847, 0.11189821299995),
vec3(0.0951212405381588, 0.761241990602591, 0.0767994186031903),
vec3(0.0482516061458583, 0.101439036467562, 0.811302368396859)
);
const mat3 pt = mat3(
vec3(1.1271005818144368, -0.1413297634984383, -0.14132976349843826),
vec3(-0.11060664309660323, 1.157823702216272, -0.11060664309660294),
vec3(-0.016493938717834573, -0.016493938717834257, 1.2519364065950405)
);
color = qu * (LINEAR_SRGB_TO_LINEAR_REC2020 * color);
color = clamp((log2(max(color, 1e-10)) + 12.47393) / 16.5, 0.0, 1.0);
color = pt * gh(color);
color = pow(max(color, 0.0), vec3(2.2));
return clamp(LINEAR_REC2020_TO_LINEAR_SRGB * color, 0.0, 1.0);
}
vec3 cp(vec3 color) {
if (toneMappingMode == 1) return mh(color);
if (toneMappingMode == 2) return kj(color);
if (toneMappingMode == 3) return jf(color);
if (toneMappingMode == 4) return ky(color);
return mM(color);
}
vec3 gq(vec3 color) {
vec3 uH = vec3(
1.0 + temperature * 0.16 + tint * 0.04,
1.0 - tint * 0.12,
1.0 - temperature * 0.16 + tint * 0.04
);
color = max(color * uH, 0.0);
color = max((color - 0.18) * contrast + 0.18, 0.0);
float luminance = dot(color, vec3(0.2126, 0.7152, 0.0722));
return max(mix(vec3(luminance), color, saturation), 0.0);
}
void main() {
vec2 uv = v_Texcoord;
vec4 shadow = sample_shadowCatcherTex(uv);
if (outputMode == 1) {
out_color = vec4(vec3(shadow.a), 1.0);
return;
}

vec4 color = sample_colorTex(uv);
vec4 bloom = sample_bloomTex(uv) * bloomIntensity;
color.rgb += bloom.rgb;
color.rgb = gq(color.rgb * exposure);
if (sRGBOutput) {
float edge = smoothstep(0.2, 0.72, distance(uv, vec2(0.5)));
color.rgb *= 1.0 - vignette * edge;
color.rgb = cp(color.rgb);
color.rgb = od(color.rgb);
}
color.a = max(color.a, min(dot(bloom.rgb, vec3(0.2125, 0.7154, 0.0721)), 1.0));

if (shadowCatcherEnabled > 0.5) {
float coverage = clamp(shadow.r, 0.0, 1.0);


float gf = clamp(
(1.0 - shadow.a) / max(coverage, 0.000001), 0.0, 1.0
);
gf = max(gf - (1.0 - shadowCatcherAlpha), 0.0);
if (coverage > 0.0) {
vec4 foreground = sample_foregroundTex(uv);
vec4 background = sample_catcherBackgroundTex(uv);
vec3 foregroundColor = gq((foreground.rgb + bloom.rgb) * exposure);
vec3 backgroundColor = gq((background.rgb / max(background.a, 0.000001) + bloom.rgb) * exposure);
if (sRGBOutput) {
float edge = smoothstep(0.2, 0.72, distance(uv, vec2(0.5)));
foregroundColor *= 1.0 - vignette * edge;
backgroundColor *= 1.0 - vignette * edge;
foregroundColor = od(cp(foregroundColor));
backgroundColor = od(cp(backgroundColor));
}

float opacity = gf;
gf *= coverage;
float mR = clamp(dot(bloom.rgb, vec3(0.2125, 0.7154, 0.0721)), 0.0, 1.0);
float hJ = max(foreground.a, mR * (1.0 - coverage));
float jz = max(background.a, mR * coverage);
float alpha = hJ + jz * (1.0 - opacity) + gf;
vec3 premultiplied = foregroundColor * hJ
+ backgroundColor * jz * (1.0 - opacity)
+ shadowCatcherColor * gf;
color = vec4(premultiplied / max(alpha, 0.000001), alpha);
}
}
out_color = color;
}`}),pg=new ut({name:"output",uniforms:{colorTex:M.uniform("sampler2D"),colorDenoisedTex:M.uniform("sampler2D"),denoisedPercent:M.uniform("float",0)},main:he`
void main() {
vec2 uv = v_Texcoord;
vec4 color = mix(
sample_colorTex(uv),
sample_colorDenoisedTex(uv),
denoisedPercent
);
color = vec4(color.rgb * color.a, color.a);
out_color = color;
}`}),bi=5,fA={color:{type:ee.HALF_FLOAT,minFilter:ee.LINEAR,magFilter:ee.LINEAR}};class mg{_brightPass;_downsamplePasses=[];_blurHPasses=[];_blurVPasses=[];_blendPasses=[];constructor(e){this._brightPass=new nt("bloomBright",e,{shader:dg,outputs:["color"],outputParams:fA});for(let t=0;t<=bi;t++){const A=new nt(`bloomDownsample${t}`,e,{shader:ug,outputs:["color"],outputParams:fA}),a=new nt(`bloomBlurH${t}`,e,{shader:vo,outputs:["color"],outputParams:fA}),r=new nt(`bloomBlurV${t}`,e,{shader:vo,outputs:["color"],outputParams:fA});a.setUniform("blurDir",0),r.setUniform("blurDir",1),this._downsamplePasses.push(A),this._blurHPasses.push(a),this._blurVPasses.push(r),t>0&&this._blendPasses.push(new nt(`bloomBlend${t}`,e,{shader:fg,outputs:["color"],outputParams:fA}))}}reserveCapacity(){[this._brightPass,...this._downsamplePasses,...this._blurHPasses,...this._blurVPasses,...this._blendPasses].forEach(e=>e.reserveCapacity())}setSize(e,t){this._brightPass.setSize(e,t);for(let A=0;A<=bi;A++)this._downsamplePasses[A].setSize(e>>A+1,t>>A+1),this._blurHPasses[A].setSize(e>>A+1,t>>A+1),this._blurVPasses[A].setSize(e>>A,t>>A),A>0&&this._blendPasses[A-1].setSize(e>>A-1,t>>A-1)}setBrightThreshold(e){this._brightPass.setUniform("threshold",e)}setRadius(e){const t=1-Math.max(Math.min(e**.3*.8,.8),0);this._blendPasses.forEach(a=>{a.setUniform("weight1",1-t),a.setUniform("weight2",t)});const A=Math.max(Math.min(e*2,1),.2);[...this._blurHPasses,...this._blurVPasses].forEach(a=>a.setUniform("blurSize",A))}createPass(e){this._brightPass.createPass({colorTex:e});for(let t=0;t<=bi;t++)this._downsamplePasses[t].createPass({colorTex:t===0?this._brightPass.getOutput("color"):this._downsamplePasses[t-1].getOutput("color")});for(let t=bi;t>=0;t--)this._blurHPasses[t].createPass({colorTex:this._downsamplePasses[t].getOutput("color")}),this._blurVPasses[t].createPass({colorTex:this._blurHPasses[t].getOutput("color")});for(let t=bi-1;t>=0;t--)this._blendPasses[t].createPass({colorTex1:t===bi-1?this._blurVPasses[bi].getOutput("color"):this._blendPasses[t+1].getOutput("color"),colorTex2:this._blurVPasses[t].getOutput("color")})}getOutput(){return this._blendPasses[0].getOutput("color")}getMemoryBytes(){return[this._brightPass,...this._downsamplePasses,...this._blurHPasses,...this._blurVPasses,...this._blendPasses].reduce((e,t)=>e+t.getMemoryBytes(),0)}dispose(){[this._brightPass,...this._downsamplePasses,...this._blurHPasses,...this._blurVPasses,...this._blendPasses].forEach(e=>e.dispose())}}const gg=new ut({name:"jnlmGuide",outputs:["guide"],uniforms:{momentsTex:M.uniform("sampler2D"),catcherMomentsTex:M.uniform("sampler2D")},main:he`
void main() {
ivec2 p = ivec2(gl_FragCoord.xy);
vec4 moments = load_momentsTex(p, 0) + load_catcherMomentsTex(p, 0);
float n = moments.z;
float mean = moments.x / max(n, 1.0);

float variance = n >= 2.0
? max(moments.y - n * mean * mean, 0.0) / (n * (n - 1.0))
: -1.0;
out_guide = vec4(mean, variance, 0.0, 1.0);
}`}),vg=new ut({name:"jnlmVariance",outputs:["guide"],uniforms:{rawGuideTex:M.uniform("sampler2D")},main:he`
void main() {
ivec2 p = ivec2(gl_FragCoord.xy);
ivec2 size = rawGuideTexRegion();
vec2 center = load_rawGuideTex(p, 0).xy;
float mf = 0.0;
float jx = 0.0;
float nW = 0.0;
float jp = 0.0;
for (int dy = -1; dy <= 1; dy++) {
for (int dx = -1; dx <= 1; dx++) {
vec2 value = load_rawGuideTex(clamp(p + ivec2(dx, dy), ivec2(0), size - 1), 0).xy;
nW += value.x;
jp += value.x * value.x;
if (value.y >= 0.0) {
mf += value.y;
jx += 1.0;
}
}
}
float variance;
if (center.y >= 0.0) {
variance = mf / jx;
} else {
float me = nW / 9.0;
variance = max(jp / 9.0 - me * me, 0.0) * 9.0 / 8.0;
}
out_guide = vec4(center.x, variance, 0.0, 1.0);
}`}),Bg=new ut({name:"jnlmFilter",outputs:["color","guide"],defines:{SEARCH_RADIUS:uA.searchRadius,PATCH_RADIUS:uA.patchRadius,INV_ALBEDO_BANDWIDTH2:(1/uA.albedoBandwidth**2).toFixed(6),INV_NORMAL_BANDWIDTH2:(1/uA.normalBandwidth**2).toFixed(6)},uniforms:{guideTex:M.uniform("sampler2D"),colorTex:M.uniform("sampler2D"),albedoTex:M.uniform("sampler2D"),normalTex:M.uniform("sampler2D"),shadowCatcherTex:M.uniform("sampler2D"),colorSensitivity:M.uniform("float",Kr),dilation:M.uniform("int",1),decodeInput:M.uniform("bool",0),encodeOutput:M.uniform("bool",0)},main:he`
#define PATCH_SIZE ((2 * PATCH_RADIUS + 1) * (2 * PATCH_RADIUS + 1))

#define VARIANCE_CANCELLATION 1.0


#define CENTER_WEIGHT_MIN 0.01
#define INV_COVERAGE_BANDWIDTH2 ${(1/To**2).toFixed(6)}

ivec2 imageSize;

vec2 loadGuide(ivec2 p) {
return load_guideTex(clamp(p, ivec2(0), imageSize - 1), 0).xy;
}


vec4 sL(ivec2 p) {
vec4 c = load_colorTex(p, 0);
if (decodeInput) c.rgb = mix(pow((max(c.rgb, 0.0) + 0.055) / 1.055, vec3(2.4)),
c.rgb / 12.92, lessThanEqual(c.rgb, vec3(0.04045)));
return vec4(c.rgb * c.a, c.a);
}

float mi(ivec2 q, vec4 bC, vec3 hg) {
vec4 albedo = load_albedoTex(q, 0);


vec3 qd = max((albedo.rgb + bC.rgb) * 0.5, vec3(${qi}));
vec3 lN = (albedo.rgb - bC.rgb) / qd;
float jk = albedo.a - bC.a;
vec3 lX = load_normalTex(q, 0).rgb - hg;
return max(
dot(lN, lN) * INV_ALBEDO_BANDWIDTH2
+ jk * jk * INV_COVERAGE_BANDWIDTH2,
dot(lX, lX) * INV_NORMAL_BANDWIDTH2
);
}

void main() {
imageSize = guideTexRegion();
ivec2 p = ivec2(gl_FragCoord.xy);
vec4 bC = load_albedoTex(p, 0);
vec4 fR = load_normalTex(p, 0);
vec3 hg = fR.rgb;


if (fR.a <= 0.0 && load_shadowCatcherTex(p, 0).r <= 0.0) {
vec4 c = sL(p);
vec3 rgb = c.rgb / max(c.a, 1e-6);
if (encodeOutput) rgb = mix(1.055 * pow(max(rgb, 0.0), vec3(1.0 / 2.4)) - 0.055,
rgb * 12.92, lessThanEqual(rgb, vec3(0.0031308)));
out_color = vec4(rgb, c.a);
out_guide = vec4(loadGuide(p), 0.0, 1.0);
return;
}

vec2 lP[PATCH_SIZE];
int k = 0;
for (int dy = -PATCH_RADIUS; dy <= PATCH_RADIUS; dy++) {
for (int dx = -PATCH_RADIUS; dx <= PATCH_RADIUS; dx++) {
lP[k] = loadGuide(p + ivec2(dx, dy) * dilation);
k++;
}
}
float k2 = colorSensitivity * colorSensitivity;

vec4 sum = vec4(0.0);
vec3 hk = max(bC.rgb, vec3(${qi}));
vec3 ng = vec3(0.0);
vec3 gN = vec3(0.0);
vec3 hG = vec3(0.0);
float qp = 0.0;
float gP = 0.0;
float oP = 0.0;
float lt = 0.0;
for (int sy = -SEARCH_RADIUS; sy <= SEARCH_RADIUS; sy++) {
for (int sx = -SEARCH_RADIUS; sx <= SEARCH_RADIUS; sx++) {
ivec2 q = p + ivec2(sx, sy) * dilation;
if (
(sx == 0 && sy == 0) ||
q.x < 0 || q.y < 0 || q.x >= imageSize.x || q.y >= imageSize.y
) continue;
float features = mi(q, bC, hg);
if (features > 16.0) continue;

float gk = 0.0;
k = 0;
for (int dy = -PATCH_RADIUS; dy <= PATCH_RADIUS; dy++) {
for (int dx = -PATCH_RADIUS; dx <= PATCH_RADIUS; dx++) {
vec2 a = lP[k];
vec2 b = loadGuide(q + ivec2(dx, dy) * dilation);
float rZ = a.x - b.x;
gk += (rZ * rZ
- VARIANCE_CANCELLATION * (a.y + min(a.y, b.y)))
/ (1e-10 + k2 * (a.y + b.y));
k++;
}
}
gk /= float(PATCH_SIZE);

float weight = exp(-max(max(gk, 0.0), features));
vec2 g = loadGuide(q);

vec3 a = (load_albedoTex(q, 0).rgb - bC.rgb) / hk;
vec4 value = sL(q);
sum += value * weight;
ng += a * weight;
gN += a * a * weight;
hG += a * value.rgb * weight;
qp += g.x * weight;
gP += g.y * weight * weight;
oP += weight;
lt = max(lt, weight);
}
}



vec4 center = sL(p);
vec2 lO = loadGuide(p);
float dR = max(lt, CENTER_WEIGHT_MIN);
float totalWeight = oP + dR;
vec4 mean = (sum + center * dR) / totalWeight;


vec3 eI = ng / totalWeight;
vec3 mj = max(gN / totalWeight - eI * eI, vec3(0.0));
vec3 rv = hG / totalWeight - eI * mean.rgb;



vec3 rI = bC.rgb + eI * hk;
vec3 po = mean.rgb * hk / max(rI, vec3(${qi}));
vec3 xg = clamp(rv / (mj + vec3(${Ro})), vec3(0.0), po);
vec3 sD = mean.rgb - xg * eI;
vec4 filtered = vec4(max(sD, vec3(0.0)), max(mean.a, 0.0));
vec3 rgb = filtered.a > 1e-6
? filtered.rgb / max(filtered.a, 1e-6)
: center.rgb / max(center.a, 1e-6);
if (encodeOutput) rgb = mix(1.055 * pow(max(rgb, 0.0), vec3(1.0 / 2.4)) - 0.055,
rgb * 12.92, lessThanEqual(rgb, vec3(0.0031308)));
out_color = vec4(rgb, filtered.a);
out_guide = vec4(
(qp + lO.x * dR) / totalWeight,
(gP + lO.y * dR * dR)
/ (totalWeight * totalWeight),
0.0,
1.0
);
}`}),Qr={type:ee.FLOAT,minFilter:ee.NEAREST,magFilter:ee.NEAREST};class wg{_renderer;_guidePass;_variancePass;_filterPasses;constructor(e){this._renderer=e,this._guidePass=new nt("jnlmGuide",e,{shader:gg,outputParams:{guide:Qr}}),this._variancePass=new nt("jnlmVariance",e,{shader:vg,outputParams:{guide:Qr}}),this._filterPasses=[0,1].map(()=>new nt("jnlmFilter",e,{shader:Bg,outputParams:{color:{type:ee.HALF_FLOAT},guide:Qr}}))}render(e,t){const{width:A,height:a,shape:r}=e;[this._guidePass,this._variancePass,...this._filterPasses].forEach(f=>f.setSize(A,a)),this._guidePass.createPass({momentsTex:e.moments,catcherMomentsTex:e.catcherMoments??this._renderer.emptyTexture}),this._variancePass.createPass({rawGuideTex:this._guidePass.getOutput("guide")});const s=Kr*Math.max(e.strength,.001),o=Math.min(Xr,Math.max(1,Math.round(r.iterations)));let l=this._variancePass.getOutput("guide"),c=e.color;for(let f=0;f<o;f++){const p=this._filterPasses[f%2];p.setDefines({SEARCH_RADIUS:r.searchRadius,PATCH_RADIUS:String(r.patchRadius),INV_ALBEDO_BANDWIDTH2:(1/r.albedoBandwidth**2).toFixed(6),INV_NORMAL_BANDWIDTH2:(1/r.normalBandwidth**2).toFixed(6)}),p.setUniforms({colorSensitivity:s,dilation:Oo(f),decodeInput:f===0,encodeOutput:f===o-1}),t&&(f===0&&t.push("Decode:DisplayLinear","Denoise:DisplayLinear"),f===o-1&&t.push("Encode:DisplayEncoded")),p.createPass({guideTex:l,colorTex:c,albedoTex:e.albedo,normalTex:e.normal,shadowCatcherTex:e.shadowCatcher}),l=p.getOutput("guide"),c=p.getOutput("color")}return c}reserveCapacity(){[this._guidePass,this._variancePass,...this._filterPasses].forEach(e=>e.reserveCapacity())}retainOutput(e){this._filterPasses.forEach(t=>t.retainOutput(e))}releaseOutput(e){this._filterPasses.forEach(t=>t.releaseOutput(e))}getMemoryBytes(){return[this._guidePass,this._variancePass,...this._filterPasses].reduce((e,t)=>e+t.getMemoryBytes(),0)}dispose(){[this._guidePass,this._variancePass,...this._filterPasses].forEach(e=>e.dispose())}}const Bo=[650,510,475];function Eg(i,e,t){let A=(D,Y,q)=>{},a=!1,r=0,n=!1,s=0;const o=new Fm(i);let l,c,f=0,p=32,h,u=0,d=!0,m=!1,v=!1,g=1,w=1,B=1,E=1;const b={};let x,y=0,T=!1,I,P=!1,S=21,R=0,L=1,H=.6,J=1,_=0,F=1,V=1,Z=0,ie=0,N=0,K="final",ge=xl,ue=performance.now(),de=0;const Ee=me();let _e=1;const W=Gc(i.gl);W.setDesiredMsPerTile(S);const le=new cg(i);let ye;const ne=t.get("composePass",()=>new nt("compose",i,{shader:hg,outputs:["color"],outputParams:{color:{type:ee.UNSIGNED_BYTE}}}));ne.setUniforms({exposure:J,shadowCatcherColor:Ee,shadowCatcherAlpha:_e,shadowCatcherEnabled:0,bloomIntensity:0,toneMappingMode:_,contrast:F,saturation:V,temperature:Z,tint:ie,vignette:N,outputMode:0,sRGBOutput:1});const Qe=t.get("outputPass",()=>new nt("output",i,{shader:pg,outputs:["color"]}));Qe.setRenderToScreen();const Je=t.get("image copy",()=>new zm(i)),se=Je.readFrameBuffer;let et,Se,oe,be=!1,Ie=!1;function je(D){const Y=f+s,q=Ea(Y,2)-.5,Be=Ea(Y,3)-.5;e.setJitter(q/g,Be/w)}function ve(D,Y){e.setSampleCount(f+s),e.setSampleSequenceOffset(s),je(),e.hasDispersion()?x?.dispersionWavelengths===1?(e.setWavelength(Bo[0]),e.createPass(D,Y)):Bo.forEach((q,Be)=>{e.setWavelength(q),e.createPass(D&&Be===0,Y,Be>0)}):(e.setWavelength(0),e.createPass(D,Y))}function Pe(D=!1,Y=!1){Y&&(y=f,T=e.hasShadowCatcher());const q=Wt(K);if(q&&f===0){if(!x?.aovs?.includes(q))throw new Error(`AOV ${q} is not enabled`);if(!o.samples)return;I=Je.copy(o.visualize(q,ge),g,w,I),P=!1;return}if(y===0)return;Y&&(le.setSampleCount(f),le.createPass(e)),ne.setSize(g,w),ne.setUniforms({exposure:J,toneMappingMode:_,contrast:F,saturation:V,temperature:Z,tint:ie,vignette:N,shadowCatcherColor:Ee,shadowCatcherAlpha:_e});const Be=le.getOutput("color"),pe=R>0,Oe=f<10||f%10>0,Ye=t.get("bloom state",()=>({owner:void 0,settings:"",dispose(){}})),pi=`${L}/${H}`,tA=pe&&f>=10&&(!Oe||Ye.owner!==b||Ye.settings!==pi);let pt=R;if(tA?(ye||=t.get("bloom",()=>new mg(i)),ye.setSize(g,w),Ye.owner=b,Ye.settings=pi,ye.setBrightThreshold(L),ye.setRadius(H),c?.push("Bloom:SceneLinear"),ye.createPass(Be)):pe&&f<10&&(pt=0),ne.setUniforms({bloomIntensity:pt,shadowCatcherEnabled:+T,outputMode:K==="shadow"?1:0}),c?.push("Compose:DisplayEncoded"),ne.createPass({colorTex:Be,foregroundTex:le.getOutput("foreground"),catcherBackgroundTex:le.getOutput("catcherBackground"),shadowCatcherTex:le.getOutput("shadowCatcher"),bloomTex:pe&&ye?ye.getOutput():i.emptyTexture}),Se){et??=t.get("jnlm",()=>new wg(i));const Ri=et.render({width:g,height:w,moments:e.getOutput("moments"),catcherMoments:e.hasShadowCatcher()?e.getOutput("catcherMoments"):void 0,color:ne.getOutput("color"),albedo:le.getOutput("albedo"),normal:le.getOutput("normal"),shadowCatcher:le.getOutput("shadowCatcher"),strength:Se.strength,shape:Se.shape},c);oe=Je.copy(Ri,g,w,oe),be=!0,Se=void 0}let tt=K==="final"&&be&&oe||ne.getOutput("color");if(q){if(!x?.aovs?.includes(q))throw new Error(`AOV ${q} is not enabled`);tt=o.visualize(q,ge)}else K==="normal"||K==="albedo"?(c?.push("AOV:Raw"),tt=le.getOutput(K)):K==="shadowCatcher"&&(c?.push("AOV:Raw"),tt=le.getOutput("shadowCatcher"));I=Je.copy(tt,g,w,I),P=K==="final"&&be&&!!oe}function ce(D){const Y=performance.now(),q=u,Be=W;Xi(()=>{p=Math.max(performance.now()-Y-de,de>0?16:8),de=0,q===u&&Be===W&&!d&&(h=D&&i.isAllProgramCompiled()?p:void 0)})}function vt(D,Y){if(e.isInvalid()||m)return!1;if(!i.isAllProgramCompiled())return d=!0,f=0,W.reset(),!0;if(e.setCamera(D),l=D,!e.preparePrograms())return!0;const q=d;if(q&&o.reset(),x?.aovs?.length&&!e.prepareAovs(o,D,g,w,x.aovs))return!0;if(q&&(u++,h=void 0,e.setCamera(D),W.reset(),f=0,d=!1),f>=Y)return Pe(!0),!1;(!Ie||q)&&(be=!1),ce(!q);const Be=f;let pe=W.nextTile(h);r>0&&pe.isFirstTile&&pe.isLastTile?pe.samplesPerFrame=r:(!a||!(pe.isFirstTile&&pe.isLastTile))&&(pe.samplesPerFrame=1);try{for(let Oe=0;Oe<pe.samplesPerFrame&&f<Y;Oe++)ve(f===0&&pe.isFirstTile,{x:pe.x,y:pe.y,width:pe.tileWidth,height:pe.tileHeight}),pe.isLastTile&&f++;f!==Be&&x?.aovs?.length&&e.renderAovs(o,D,g,w,Math.max(f,o.samples),x.aovSamples??16,x.aovs,s),f!==Be&&(!n||f>=Y)&&Pe(f>=Y,!0)}catch(Oe){return console.error(Oe),m=!0,!1}return f!==Be&&A(f,Be===0,p),!i.isAllProgramCompiled()}function fe(){e.useTarget(b);const D=1,Y=Math.max(1,Math.round(B*D)),q=Math.max(1,Math.round(E*D));e.setSize(Y,q,B/E),!(Y===g&&q===w)&&(g=Y,w=q,W.setSize(g,w),le.setSize(g,w),ne.setSize(g,w),ye?.setSize(g,w),f=0,y=0,d=!0)}function Le(D,Y){D=Math.max(1,D),Y=Math.max(1,Y),!(D===B&&Y===E)&&(B=D,E=Y,Qe.setSize(B,E),fe(),f=0,d=!0)}function ke(){document.hidden?ue=performance.now():de=performance.now()-ue}typeof document<"u"&&document.addEventListener("visibilitychange",ke);function xe(){e.useTarget(b),e.setSize(g,w,B/E),x&&(e.setQuality(x),e.setClamping(x.clamping),e.setTransmissiveOutputAlphaMin(x.transmissiveOutputAlphaMin),e.setBevelSamples(x.bevelSamples),e.setSamplingPattern(x.samplingPattern,x.maxSamples))}return{invalidateDenoisedOutput(){Se=void 0,be=!1,Ie=!1},synchronizeBackground(){},configure(D){if(D.aovs?.length&&(!Number.isInteger(D.aovSamples??16)||(D.aovSamples??16)<1))throw new RangeError("aovSamples must be a positive integer");const Y=ht(x?.aovs??[]),q=ht(D.aovs??[]);(Y!==q||x?.aovSamples!==D.aovSamples)&&(o.samples=0),x={...D,aovs:[...D.aovs??[]]};const Be=Wt(K);Be&&!D.aovs?.includes(Be)&&(K="final"),Y&&!q&&(o.dispose(),o.history.clear(),o.width=o.height=0,o.reset()),S=Math.max(1,D.timeBudgetMs),a=D.batchSamples,W.setDesiredMsPerTile(S),W.setMaxTiles(D.maxTiles)},activate:xe,canCompleteSampleWithin(D){return p<=D},getOutputTexture(){},applyPostProcesses(){},get presentationComplete(){return!!I},get presentationDenoised(){return P},present(){I&&(Qe.setSize(i.canvas.width,i.canvas.height),Qe.setUniform("denoisedPercent",0),Qe.createPass({colorTex:I,colorDenoisedTex:I}))},getMemory(){return{width:g,height:w,bytes:o.bytes+e.getTargetMemoryBytes(b)+le.getMemoryBytes()+(I?.getMemoryBytes()??0)+(oe?.getMemoryBytes()??0)}},isFirstFrame:()=>d,restartSamples(D=!1){o.reset(),W.reset(),d=!0,f=0,be=!1,Ie=!1},performDenoise(D){return D.kind!=="jnlm"?Promise.reject(new Error("This denoiser requires WebGPU.")):d||f<1?Promise.resolve(!1):(K!=="final"&&K!=="shadow"||(Se=D.denoiser,Pe(!0)),Promise.resolve(!0))},cancelDenoise(){Se=void 0},setPreserveDenoisedOutput(D){Ie=D},trace:vt,drawPostProcess:()=>Pe(!0),setSize:Le,setToneMappingParams(D){const Y=D.exposure??1,q={agx:0,aces:1,cineon:2,reinhard:3,linear:4}[D.toneMapping??"agx"]??0,Be=D.contrast??1,pe=D.saturation??1,Oe=D.temperature??0,Ye=D.tint??0,pi=D.vignette??0;return Y===J&&q===_&&Be===F&&pe===V&&Oe===Z&&Ye===ie&&pi===N?!1:(J=Y,_=q,F=Be,V=pe,Z=Oe,ie=Ye,N=pi,ne.setUniforms({exposure:J,toneMappingMode:_,contrast:F,saturation:V,temperature:Z,tint:ie,vignette:N}),!0)},setOfflineRenderOptions(D){r=Math.max(0,Math.round(D.samplesPerBatch)),n=D.deferPostProcess,s=Math.max(0,Math.round(D.sampleSequenceOffset))},setVarianceMoments(D){},setAdaptiveSamplingTargets(D){},async prepareOfflineAdaptiveSampling(D){},getTotalSamplesRendered:()=>f,_displayParity(){return{record(D){c=D},load(D){Le(D.width,D.height),be=!1,Se=void 0;const Y=Oe=>new Te({width:D.width,height:D.height,source:{data:Oe,width:D.width,height:D.height},type:ee.FLOAT,minFilter:ee.NEAREST,magFilter:ee.NEAREST}),q=Float32Array.from({length:D.width*D.height*4},(Oe,Ye)=>Ye%4===3?D.moments[Math.floor(Ye/4)*4+2]:D.shadow[Math.floor(Ye/4)*8+Ye%4]),Be=Float32Array.from(q,(Oe,Ye)=>D.shadow[Math.floor(Ye/4)*8+4+Ye%4]),pe={color:Y(D.color),albedo:Y(D.albedo),normal:Y(D.normal),moments:Y(Float32Array.from(D.moments,(Oe,Ye)=>Ye%4===2?D.samples:Oe)),shadowCatcher:Y(q),catcherBackground:Y(Be),catcherMoments:Y(D.moments)};e._loadDiagnosticAccumulation(pe,D.catcher),f=y=D.samples,T=D.catcher,d=!1,le.setSize(g,w),le.setSampleCount(f),le.createPass(e)}}},getDiagnostics:()=>({...e.getDiagnostics(),shaderCompilation:i.getShaderCompilationDiagnostics()}),flushDiagnostics:async()=>{},setShadowCatcherParams(D,Y){const q=D[0]!==Ee[0]||D[1]!==Ee[1]||D[2]!==Ee[2]||Y!==_e;return q&&(Fo(Ee,D),_e=Y,ne.setUniform("shadowCatcherColor",D),ne.setUniform("shadowCatcherAlpha",Y)),q},setBloomParams({intensity:D,threshold:Y,radius:q}){const Be=D!==R||Y!==L||q!==H;return R=D,L=Y,H=q,Be},setOnSampleRendered(D){A=D},setAovDisplayOptions(D){ge={...D,depthRange:[...D.depthRange]}},setOutput(D){return K===D?!1:(K=D,!0)},async readPresentation(){if(!I)throw new Error("Render has no complete image.");se.bind(i,[I]);const D=I.width,Y=I.height;return{width:D,height:Y,data:ba(i.gl,D,Y,I.isByteEncoded)}},aovReady(D){return!!x?.aovs?.includes(D)&&o.samples>0},getAovSamples(){return o.samples},restartAovs(){o.reset()},refineAovs(D,Y=f){return Y<1||!x?.aovs?.length?!0:(e.setCamera(D),l=D,e.renderAovs(o,D,g,w,Y,x.aovSamples??16,x.aovs,s))},async readAov(D){if(!x?.aovs?.includes(D)||!l||f<1&&o.samples<1)throw new Error("AOV output is not ready");for(e.setCamera(l);!e.renderAovs(o,l,g,w,Math.max(f,o.samples),x.aovSamples??16,x.aovs,s);){if(v||i.gl.isContextLost())throw new Error("AOV compilation was interrupted");await new Promise(Y=>Xi(()=>Y()))}return o.read(D)},async readOutput(D){D==="denoised"&&(!oe||!be)&&(D="hdr");const Y=D==="denoised"?oe:le.getOutput(D==="hdr"?"color":D);return se.bind(i,[Y]),{data:ba(i.gl,g,w,D==="albedo"||D==="normal"),width:g,height:w}},dispose(){v||(v=!0,typeof document<"u"&&document.removeEventListener("visibilitychange",ke),o.dispose(),e.releaseTarget(b),le.dispose(),I?.dispose(i.gl),oe?.dispose(i.gl))}}}function bg(i){const e=new og(i),t=new ac;return rc(e,()=>Eg(i,e,t),!0,t)}const Wi=new Map;async function _g(i,e){let t=Wi.get(e);if(!t){t=(async()=>{let a=await i.requestAdapter({powerPreference:"high-performance"})??await i.requestAdapter();if(!a)throw new Error("No WebGPU adapter is available");const r=Es(a),n=e==="auto"?_l(a.features):void 0;let s,o;try{s=await a.requestDevice(n?{...r,requiredFeatures:[...r.requiredFeatures??[],n.feature]}:r)}catch(c){if(!n)throw c;o=c instanceof Error?c.message:String(c);const f=await i.requestAdapter({powerPreference:"high-performance"})??await i.requestAdapter();if(!f)throw new Error("No WebGPU adapter is available for atlas fallback");s=await f.requestDevice(Es(f)),a=f}const l=t;return s.lost.then(()=>{Wi.get(e)===l&&Wi.delete(e)}),{device:s,adapterInfo:a.info,fallbackReason:o}})(),Wi.set(e,t);const A=t;t.catch(()=>{Wi.get(e)===A&&Wi.delete(e)})}return t}class yg{scene;camera;display;bvhBuilder="builtin";bvhLayout="bvh2";bvhSpatialSplits=!1;textureAtlasBudgetBytes=Di;get bvhWorkerCount(){return this._bvhWorkerCount}set bvhWorkerCount(e){mn(e),this._bvhWorkerCount=e}_bvhWorkerCount="auto";_bvhWorkerPool;_bvhPreparationRevision=0;_bvhPreparation;_bvhPreparationTail=Promise.resolve();_tinyBvhUnavailable=!1;_bvhWorkerUnavailable=!1;_bvhPreparedGeometry=new WeakMap;_lastBvhBuild;_lastBvhSettings="";_lastBudget=-1;_shaderProgress="";_events=new _n;_pipeline;_webglRenderer;_gpuDevice;_suppliedDevice;_ownsDeviceSelection;_deviceRevision=0;_lossController;_deviceLossError;_webglListening=!1;_webglLost=!1;_recoverWebGL=!1;_contextRestore;_gpuAdapterInfo;_backendChoice;_textureBinding;_initPromise;_info;_pipelineInitError;_webgpuFallbackReason;_reportedErrors=new WeakSet;_loggedErrorMessages=new Set;_sceneChangeDetector;_snapshot=new rd;_sourceScene;_committedScene;_sourceCamera;_committedCamera;_cameraFields=[];_sceneRevision=0;_cameraRevision=0;_uploadedRevision=-1;_pendingMeshes="full";_pendingTransforms=new Set;_pendingColors=new Set;_pendingGeometries=new Set;_pendingMaterials=new Set;_pendingLights=!0;_pendingBackground=!0;_disposed=!1;_readingDepth=!1;_renders=new Set;_targetCounter=0;_presented;_denoisers=new Set;_denoiserCache=new Map;_denoiserEntries=new WeakMap;_weights=new Map;_customPrepared=new WeakMap;_denoiseTail=Promise.resolve();_lastError;get lastError(){return this._lastError}_setRenderError(e){this._lastError=e??this._pipelineInitError}constructor(e={}){if(e.device&&e.backend==="webgl")throw new Error("A supplied GPUDevice cannot use the webgl backend.");this._suppliedDevice=e.device,this._textureBinding=e.textureBinding??"atlas",this._ownsDeviceSelection=!e.device,this._backendChoice=e.device?"webgpu":e.backend??"auto",this._sceneChangeDetector=new nu,this.display=bn._create(this,e.canvas??hi())}init(){return this._initPromise??=(async()=>{if(this._disposed)throw new Error("Engine is disposed.");if(this._pipelineInitError&&!this._ownsDeviceSelection)throw this._pipelineInitError;const e=this._deviceRevision;if(this._contextRestore&&await this._contextRestore.promise,this._disposed)throw new Error("Engine is disposed.");if(await this._initPipeline(this._backendChoice!=="webgl"&&!this._recoverWebGL),e!==this._deviceRevision)throw this._deviceLossError;if(this._pipelineInitError)throw this._pipelineInitError;if(this._disposed)throw this._pipeline?.dispose(),new Error("Engine is disposed.");const t=this._webglRenderer?.gl,A=this._gpuDevice?.limits;return this._info={backend:this._gpuDevice?"webgpu":"webgl",adapterName:this._adapterName(),webgpuFallbackReason:this._webgpuFallbackReason,limits:{maxTextureArrayLayers:A?.maxTextureArrayLayers??t?.getParameter(t.MAX_ARRAY_TEXTURE_LAYERS),maxTextureDimension2D:A?.maxTextureDimension2D??t?.getParameter(t.MAX_TEXTURE_SIZE)}},this._upload(),this._info})()}get info(){return this._info}get backend(){return this._info?.backend}get device(){return this._gpuDevice}on(e,t){return this._events.on(e,t)}update(){if(this._disposed)throw new Error("Engine is disposed.");this._lastError=this._pipelineInitError;let e=!1,t=!1;const A=this.camera?Si(this.camera):[];(this.camera!==this._sourceCamera||!_t(A,this._cameraFields))&&(this._sourceCamera=this.camera,this._cameraFields=A,this._committedCamera=this.camera?Ur(this.camera):void 0,this._cameraRevision++,e=!0);const a=Vu(this,"bvh"),r=a!==this._lastBvhSettings||sr(this)!==this._lastBudget;if((this.scene!==this._sourceScene||r)&&this._sceneChangeDetector.reset(),this.scene){Mn(this.scene.lights,s=>this._notifyError(s)),Fd(this.scene.meshes);const n=this._sceneChangeDetector.detect(this.scene);if(t=n.meshes==="full"||this.scene!==this._sourceScene||r,n.meshes!=="none"||n.lights||n.background||this.scene!==this._sourceScene||r){this._committedScene=this._snapshot.capture(this.scene,n),n.meshes==="full"||r||this.scene!==this._sourceScene?this._pendingMeshes="full":n.meshes==="incremental"&&this._pendingMeshes!=="full"&&(this._pendingMeshes="incremental");for(const s of n.transforms)this._pendingTransforms.add(this._snapshot.mirror(s));for(const s of n.colors)this._pendingColors.add(this._snapshot.mirror(s));for(const s of n.geometries)this._pendingGeometries.add(this._snapshot.mirror(s));for(const s of n.materials)this._pendingMaterials.add(this._snapshot.mirror(s));this._pendingLights||=n.lights,this._pendingBackground||=n.background,this._sceneRevision++,e=!0}this._sceneChangeDetector.commit()}else this._sourceScene&&(this._committedScene=void 0,this._pendingMeshes="full",this._pendingLights=!0,this._pendingBackground=!0,this._sceneRevision++,e=!0);if(this._sourceScene=this.scene,this._lastBvhSettings=a,this._lastBudget=sr(this),this._pipeline||this.init().catch(()=>{}),e)for(const n of this._renders)n._inputsChanged(t);return this._upload(),e}_upload(){const e=this._pipeline;if(!e||this._disposed||this._bvhPreparation||this._uploadedRevision===this._sceneRevision)return;const t=this._committedScene??{meshes:[],lights:[]};if(this._needsBVHPreparation(t.meshes)){const a=this.prepare(t);this._bvhPreparation=a,a.then(()=>{this._bvhPreparation===a&&(this._bvhPreparation=void 0),this._upload()},r=>{this._bvhPreparation===a&&(this._bvhPreparation=void 0),this._notifyError(r)});return}const A=e.setTextureAtlasBudget(this._lastBudget>=0?this._lastBudget:sr(this));(this._pendingMeshes!=="none"||A)&&e.setMeshes(t.meshes,this._pendingMeshes==="full"||A?void 0:{transforms:[...this._pendingTransforms],colors:[...this._pendingColors],geometries:[...this._pendingGeometries],materials:[...this._pendingMaterials]}),this._pendingLights&&e.setLights(t.lights),this._pendingBackground&&e.setBackground(t.background),this._pendingMeshes="none",this._pendingLights=!1,this._pendingBackground=!1,this._pendingTransforms.clear(),this._pendingColors.clear(),this._pendingGeometries.clear(),this._pendingMaterials.clear(),this._uploadedRevision=this._sceneRevision}_bvhConfig(){return Yu(this)}prepare(e,t={}){const A=this._bvhPreparationRevision,a=this._bvhPreparationTail.then(async()=>{const n=()=>A!==this._bvhPreparationRevision||t.signal?.aborted===!0;if(n())return;const s=e.meshes,o=Bs()&&!this._bvhWorkerUnavailable;if(o){const f=qu(this);this._bvhWorkerPool?.size!==f&&(this._bvhWorkerPool?.dispose(),this._bvhWorkerPool=new gn(f))}const l=this._bvhConfig(),c=await Nd(s,{config:l,...l,builder:this.bvhBuilder==="tinybvh"&&!this._tinyBvhUnavailable?"tinybvh":"builtin",useWorker:o,workerPool:this._bvhWorkerPool,isCancelled:n,rebuild:!1,onProgress:f=>{this._bvhPreparation===a&&this._events.emit("progress",{stage:"bvh",progress:f}),t.onProgress?.(f)}});n()||(c.workerUnavailable&&!this._bvhWorkerUnavailable&&(this._bvhWorkerUnavailable=!0,this._bvhWorkerPool?.dispose(),this._bvhWorkerPool=void 0,console.warn("BVH preparation failed; falling back to the calling-thread BVH builder.")),c.tinyBvhUnavailable&&!this._tinyBvhUnavailable&&(this._tinyBvhUnavailable=!0,console.warn("BVH preparation failed; falling back to the built-in BVH builder.")),c.failedMeshes.forEach(f=>{this._bvhPreparedGeometry.set(f,[f.geometry,f.geometry.version])}),this._lastBvhBuild={geometryCount:c.geometryCount,bvhTimeMs:c.bvhTimeMs})});this._bvhPreparationTail=a.catch(()=>{});const r=t.signal;return r?new Promise((n,s)=>{const o=()=>s(r.reason??new DOMException("BVH preparation aborted","AbortError"));if(r.aborted){o();return}r.addEventListener("abort",o,{once:!0}),a.then(n,s).finally(()=>r.removeEventListener("abort",o))}):a}_needsBVHPreparation(e){return this._bvhPreparation?!0:(this.bvhBuilder!=="tinybvh"||this._tinyBvhUnavailable)&&(!Bs()||this._bvhWorkerUnavailable)?e.some(t=>!!He(CA(t))&&kr(t,this._bvhConfig())):e.some(t=>{const A=this._bvhPreparedGeometry.get(t);return!(A?.[0]===t.geometry&&A[1]===t.geometry.version)&&kr(t,this._bvhConfig())})}async _initPipeline(e){let t=!1;try{if(this._events.emit("progress",{stage:"device",progress:0}),this._pipelineInitError=void 0,e&&(this._suppliedDevice||typeof navigator<"u"&&navigator.gpu))try{const A=typeof navigator<"u"?navigator.gpu:void 0,a=this._suppliedDevice?void 0:await _g(A,this._textureBinding),r=this._suppliedDevice??a.device,n=this._suppliedDevice?r.adapterInfo:a?.adapterInfo,s={requested:this._textureBinding};if(this._textureBinding==="auto"){const o=_l(r.features);s.fallbackReason=a?.fallbackReason??(o?await $u(r,o):"Resource-table feature is not enabled on this device."),s.fallbackReason||(s.support=o)}if(this._disposed)return;ws(r),this._gpuAdapterInfo=n??void 0,this._gpuDevice=r,this._pipeline=Rm(this.display.canvas,r,{presentationFormat:A?.getPreferredCanvasFormat()??"bgra8unorm",materialTextures:s}),this._watchDevice(r),t=!0}catch(A){if(this._backendChoice==="webgpu")throw A;this._webgpuFallbackReason=A instanceof Error?A.message:String(A),this._gpuDevice=void 0,this._gpuAdapterInfo=void 0}if(!t){if(this._backendChoice==="webgpu")throw new Error("WebGPU is not available in this environment");e&&!this._webgpuFallbackReason&&(this._webgpuFallbackReason="WebGPU is not available in this environment"),this._webglRenderer=new ku({canvas:this.display.canvas,alpha:!0,depth:!0,stencil:!1,antialias:!1,pixelRatio:1,preserveDrawingBuffer:!0,premultipliedAlpha:!1,parallelShaderCompile:!0,powerPreference:"high-performance"}),this._pipeline=bg(this._webglRenderer),this._webglListening||(this._webglListening=!0,this.display.canvas.addEventListener("webglcontextlost",this._onContextLost),this.display.canvas.addEventListener("webglcontextrestored",this._onContextRestored)),this._recoverWebGL=!1}}catch(A){this._pipelineInitError=A instanceof Error?A:new Error(String(A)),this._lastError=this._pipelineInitError,this._notifyError(this._pipelineInitError)}finally{this._events.emit("progress",{stage:"device",progress:1})}}_onContextLost=e=>{if(e.preventDefault(),this._disposed||this._webglLost)return;this._webglLost=!0,this._recoverWebGL=!0;let t,A;const a=new Promise((n,s)=>{t=n,A=s});a.catch(()=>{}),this._contextRestore={promise:a,resolve:t,reject:A};const r=new Error(`WebGL context lost: ${e.statusMessage||"context is unavailable"}`);this._invalidateDevice(r,!0),this._events.emit("devicelost",{reason:"webglcontextlost",recovering:!0})};_onContextRestored=()=>{if(this._disposed||!this._webglLost)return;this._webglLost=!1;const e=this._contextRestore;this._contextRestore=void 0,e?.resolve()};_watchDevice(e){e.lost.then(t=>{if(this._disposed||this._gpuDevice!==e)return;const A=this._ownsDeviceSelection,a=new Error(`WebGPU device lost (${t.reason}): ${t.message||"device is unavailable"}`);this._invalidateDevice(a,A),this._events.emit("devicelost",{reason:t.reason,recovering:A}),A||this._notifyError(a)})}_invalidateDevice(e,t){this._deviceLossError=e,this._deviceRevision++,this._lossController?.abort(e),this._lossController=void 0;for(const A of this._renders)A._deviceLost(t);this._pipeline?.dispose(),this._pipeline=void 0,this._webglRenderer?.dispose(),this._webglRenderer=void 0,this._gpuDevice=void 0,this._gpuAdapterInfo=void 0,this._info=void 0,this._initPromise=void 0,this._pipelineInitError=t?void 0:e,this._lastError=e,this._presented=void 0,this._shaderProgress="",this._uploadedRevision=-1,this._pendingMeshes="full",this._pendingLights=!0,this._pendingBackground=!0,this._sceneRevision++,this._customPrepared=new WeakMap;for(const A of[...this._denoisers]){const a=this._denoiserEntries.get(A);a&&(a.references=1),this._releaseDenoiser(A)}this._denoiserCache.clear()}async setDevice(e){if(this._disposed)throw new Error("Engine is disposed.");if(this._ownsDeviceSelection)throw new Error("setDevice requires an engine constructed with device.");try{ws(e)}catch(t){throw this._lastError=this._notifyError(t),t}this._gpuDevice===e&&!this._pipelineInitError||(this._invalidateDevice(new Error("WebGPU device replaced during converge."),!0),this._suppliedDevice=e)}_awaitDevice(e){const t=(this._lossController??=new AbortController).signal;return new Promise((A,a)=>{const r=()=>a(t.reason);t.addEventListener("abort",r,{once:!0}),e.then(A,a).finally(()=>t.removeEventListener("abort",r))})}get _deviceGeneration(){return this._deviceRevision}get _lostError(){return this._deviceLossError}_adapterName(){if(this._gpuAdapterInfo)return this._gpuAdapterInfo.description||this._gpuAdapterInfo.vendor||"WebGPU";const e=this._webglRenderer?.gl,t=e?.getExtension("WEBGL_debug_renderer_info");return t&&e?e.getParameter(t.UNMASKED_RENDERER_WEBGL):this._webglRenderer?"WebGL 2":this._gpuDevice?"WebGPU":""}_reportShaderProgress(){const e=this._pipeline?.getDiagnostics().shaderCompilation;if(!e)return;const t=`${e.status}/${e.completedPipelineCount}/${e.pipelineCount}`;t!==this._shaderProgress&&(this._shaderProgress=t,this._events.emit("progress",{stage:"shaders",progress:e.pipelineCount?e.completedPipelineCount/e.pipelineCount:1}))}getDiagnostics(){if(!this._pipeline&&!this._lastBvhBuild)return;const e=this._pipeline?.getDiagnostics(),t=e?.materialTextures??(this._pipeline?{requested:this._textureBinding,active:"atlas",fallbackReason:this._textureBinding==="auto"?"Bindless textures require a supported WebGPU device.":void 0,textureCount:e?.textureAtlas?.textureCount??0,estimatedBytes:e?.textureAtlas?.estimatedBytes??0,scale:e?.textureAtlas?.scale??1,metadataBytes:0,resourceTableCapacity:0,retiredBytes:0}:void 0);return{...e,materialTextures:t,bvh:{...e?.bvh,lastBuild:this._lastBvhBuild},backend:this.backend,adapterName:this._adapterName(),width:this.display.canvas.width,height:this.display.canvas.height,lastError:this.lastError?.message,webgpuFallbackReason:this._webgpuFallbackReason,presentedTarget:this._presented?.label,presentedComplete:this._presented?.presentationComplete??!1}}async readDepthSamples(e){if(Dn(e,1),!(!this._ready||!this._committedCamera||this._readingDepth)){this._readingDepth=!0;try{const t=Ur(this._committedCamera);t.aspect??=this.display.canvas.width/this.display.canvas.height;const A=await this._pipeline.readDepthSamples(t,e);return this._disposed?void 0:A}finally{this._readingDepth=!1}}}dispose(){if(!this._disposed){this._disposed=!0,this._bvhPreparationRevision++,this._lossController?.abort(new Error("Engine is disposed.")),this._lossController=void 0,this._contextRestore?.reject(new Error("Engine is disposed.")),this._contextRestore=void 0,this._webglListening&&(this.display.canvas.removeEventListener("webglcontextlost",this._onContextLost),this.display.canvas.removeEventListener("webglcontextrestored",this._onContextRestored));for(const e of[...this._renders])e.dispose();this._pipeline?.dispose(),this._pipeline=void 0,this._webglRenderer?.dispose(),this._bvhWorkerPool?.dispose();for(const e of[...this._denoisers]){const t=this._denoiserEntries.get(e);t&&(t.references=1),this._releaseDenoiser(e)}this._denoiserCache.clear(),this._weights.clear(),this._events.clear()}}get _initializationError(){return this._pipelineInitError}get _ready(){return!!this._pipeline&&this._uploadedRevision===this._sceneRevision&&!!this._committedScene&&!!this._committedCamera&&!this._disposed}get _inputs(){return{scene:this._sceneRevision,camera:this._cameraRevision,value:this._committedCamera}}_register(e){if(this._disposed)throw new Error("Engine is disposed.");this._renders.add(e)}_unregister(e){this._renders.delete(e)}_createTarget(){return this._pipeline?.createTarget(`render-${++this._targetCounter}`)}_releaseTarget(e){this._presented===e&&(this._presented=void 0),this._pipeline?.releaseTarget(e)}_present(e){e.activate(),e.present(),this._presented=e}_notifyError(e){const t=e instanceof Error?e:new Error(String(e));return this._loggedErrorMessages.has(t.message)||(this._loggedErrorMessages.add(t.message),console.error(`Path tracing failed: ${t.message}`,t)),this._reportedErrors.has(t)||(this._reportedErrors.add(t),this._events.emit("error",t)),t}_getWeights(e,t){let A=this._weights.get(e);return A||(A=t(),this._weights.set(e,A),A.catch(()=>{this._weights.get(e)===A&&this._weights.delete(e)})),A}_retainDenoiser(e,t){let A=this._denoiserCache.get(e);if(!A?.value){const a=this._ownDenoiser(t()),r={key:e,references:0,value:a};this._denoiserCache.set(e,r),this._denoiserEntries.set(a,r),A=r}return A.references++,A.value}async _acquireDenoiser(e,t){let A=this._denoiserCache.get(e);if(!A){const a={key:e,references:0},r=this._deviceRevision;a.pending=t().then(n=>{if(r!==this._deviceRevision)throw this._disposeDenoiser(n),this._deviceLossError;return a.value=this._ownDenoiser(n),this._denoiserEntries.set(n,a),n}),this._denoiserCache.set(e,a),A=a}A.references++;try{return A.value??await A.pending}catch(a){throw A.references--,this._denoiserCache.get(e)===A&&this._denoiserCache.delete(e),a}}_ownDenoiser(e){if(this._disposed)throw this._disposeDenoiser(e),new Error("Engine is disposed.");return this._denoisers.add(e),e}_releaseDenoiser(e){const t=this._denoiserEntries.get(e);t&&--t.references>0||(t&&this._denoiserCache.get(t.key)===t&&this._denoiserCache.delete(t.key),this._denoiserEntries.delete(e),this._denoisers.delete(e)&&this._disposeDenoiser(e))}_disposeDenoiser(e){e.kind==="oidn"&&(e.denoiser.auxiliaryDenoisers?.albedo.dispose(),e.denoiser.auxiliaryDenoisers?.normal.dispose()),e.denoiser.dispose()}async _prepareCustomDenoiser(e,t,A){const a=this.device;if(!a)throw new Error("Custom denoising requires WebGPU.");const r=this._customPrepared.get(e);r?.device===a&&r.width===t&&r.height===A||(await e.prepare?.({device:a,width:t,height:A}),this._customPrepared.set(e,{device:a,width:t,height:A}))}_enqueueDenoise(e){const t=this._denoiseTail.then(async()=>{const A=this._gpuDevice,a=this._deviceRevision;try{return await e()}finally{A&&A===this._gpuDevice&&a===this._deviceRevision&&!this._disposed&&await this._awaitDevice(A.queue.onSubmittedWorkDone()).catch(()=>{})}});return this._denoiseTail=t.catch(()=>{}),t}}const ft=["webgpu","webgl"],Gn={aovs:{key:"aovs",default:[],kind:"execution",backends:ft},aovSamples:{key:"aovSamples",default:16,kind:"execution",backends:ft},bounces:{key:"bounces",default:3,kind:"image",backends:ft},clamping:{key:"clamping",default:0,kind:"image",backends:ft},bevel:{key:"bevel",default:!0,kind:"image",backends:ft},bevelSamples:{key:"bevelSamples",default:8,kind:"image",backends:ft,normalize:Un},dispersionWavelengths:{key:"dispersionWavelengths",default:3,kind:"image",backends:ft},directLightCandidates:{key:"directLightCandidates",default:4,kind:"image",backends:["webgpu"],normalize:Rn},alphaBlendStrategy:{key:"alphaBlendStrategy",default:"stochastic",kind:"image",backends:["webgpu"]},transmissiveOutputAlphaMin:{key:"transmissiveOutputAlphaMin",default:1,kind:"image",backends:ft},samplingPattern:{key:"samplingPattern",default:"sobol",kind:"image",backends:ft},maxSamples:{key:"maxSamples",default:2048,kind:"sample-cap",backends:ft},timeBudgetMs:{key:"timeBudgetMs",default:21,kind:"execution",backends:ft},maxTiles:{key:"maxTiles",default:1/0,kind:"execution",backends:ft},batchSamples:{key:"batchSamples",default:!1,kind:"execution",backends:ft}};[...Object.values(Gn)];function xg(i,e){return Object.fromEntries(Object.values(Gn).map(t=>[t.key,t.key==="maxSamples"?e:"normalize"in t?t.normalize(i[t.key]):i[t.key]]))}function Cg(i,e){const t=Object.values(Gn).filter(A=>A.kind==="image");return JSON.stringify({...Object.fromEntries(t.map(A=>[A.key,i[A.key]])),samples:i.samplingPattern==="zsobol"?i.maxSamples:void 0,...e})}let Qg;const Mg=()=>Qg??=Mo(()=>import("./oidnNetwork-BNCLHZ9w.js"),__vite__mapDeps([4,5,1]),import.meta.url);function wo(i){if(!i||typeof i!="object"||i.type!=="jnlm"&&i.type!=="oidn"&&i.type!=="custom")throw new Error("Denoiser type must be jnlm, oidn or custom.");const e=i.type==="jnlm"?["type","schedule",...Object.keys(Zr)]:i.type==="custom"?["type","schedule","denoiser","aovs"]:["type","schedule","model","weightsBaseUrl","weightsUrl","aux","hdr","hdrTransfer","auxiliaryModelUrls","engine","precision","dynamicTile","maxTileSize","signal"];for(const t of Object.keys(i))if(!e.includes(t))throw new Error(`Denoiser field ${t} does not belong to ${i.type}.`);if(i.schedule!==void 0&&!["converged","progressive","every-sample"].includes(i.schedule))throw new Error("Unknown denoise schedule.");if(i.type==="jnlm")Lo(i);else if(i.type==="custom"){if(ht(i.aovs??[]),!i.denoiser||typeof i.denoiser!="object"||typeof i.denoiser.denoise!="function"||i.denoiser.prepare!==void 0&&typeof i.denoiser.prepare!="function")throw new Error("Custom denoiser must implement denoise and optional prepare.")}else{if(i.weightsUrl!==void 0){if(i.model!==void 0||i.weightsBaseUrl!==void 0)throw new Error("weightsUrl is mutually exclusive with model and weightsBaseUrl.")}else if(i.aux!==void 0||i.hdr!==void 0||i.hdrTransfer!==void 0)throw new Error("aux, hdr and hdrTransfer require weightsUrl.");for(const t of["weightsUrl","weightsBaseUrl"])if(i[t]!==void 0&&!Mr(i[t]))throw new Error(`${t} must be a nonempty string or URL.`);if(i.auxiliaryModelUrls!==void 0){const t=i.auxiliaryModelUrls;if(!t||!Mr(t.albedo)||!Mr(t.normal)||Object.keys(t).some(A=>!["albedo","normal"].includes(A)))throw new Error("auxiliaryModelUrls requires only albedo and normal URLs.")}for(const[t,A]of[["engine",["auto","wgsl","webnn"]],["precision",["auto","fp32","fp16"]],["hdrTransfer",["pu","log"]]])if(i[t]!==void 0&&!A.includes(i[t]))throw new Error(`Unknown OIDN ${t}.`);for(const t of["aux","hdr"])if(i[t]!==void 0&&typeof i[t]!="boolean")throw new Error(`${t} must be boolean.`);if(i.dynamicTile!==void 0&&typeof i.dynamicTile!="boolean"){if(!i.dynamicTile||typeof i.dynamicTile!="object")throw new Error("dynamicTile must be boolean or tile settings.");for(const[t,A]of Object.entries(i.dynamicTile))if(!["minTileSize","initialTileSize","targetTileTimeMs","adjustmentStep"].includes(t)||A!==void 0&&(typeof A!="number"||!Number.isFinite(A)||A<=0))throw new Error(`Invalid dynamicTile ${t}.`)}if(i.model!==void 0&&!["standard","small","cleanAuxLarge"].includes(i.model))throw new Error("Unknown OIDN model.");if(i.maxTileSize!==void 0&&(!Number.isInteger(i.maxTileSize)||i.maxTileSize<1))throw new Error("maxTileSize must be a positive integer.")}}function Mr(i){return typeof i=="string"&&i.length>0||i instanceof URL}function Ig(i){if(i.type==="custom")return Object.freeze({...i,aovs:Object.freeze([...i.aovs??[]])});if(i.type!=="oidn")return Object.freeze({...i});const e={...i};return i.weightsBaseUrl!==void 0&&(e.weightsBaseUrl=String(i.weightsBaseUrl)),i.weightsUrl!==void 0&&(e.weightsUrl=String(i.weightsUrl)),i.auxiliaryModelUrls!==void 0&&(e.auxiliaryModelUrls=Object.freeze({albedo:String(i.auxiliaryModelUrls.albedo),normal:String(i.auxiliaryModelUrls.normal)})),typeof i.dynamicTile=="object"&&(e.dynamicTile=Object.freeze({...i.dynamicTile})),Object.freeze(e)}function Ir(i){if(i.type==="custom")return i.denoiser;if(i.type==="jnlm")return JSON.stringify({type:"jnlm",...Object.fromEntries(Object.entries(Zr).map(([t,A])=>[t,i[t]??A]))});const e=i.dynamicTile;return JSON.stringify({type:"oidn",...i.weightsUrl===void 0?{model:i.model??"standard",weightsBaseUrl:i.weightsBaseUrl?.toString()}:{weightsUrl:String(i.weightsUrl),aux:i.aux??!0,hdr:i.hdr??!0,hdrTransfer:i.hdrTransfer??"pu"},auxiliaryModelUrls:i.auxiliaryModelUrls&&{albedo:String(i.auxiliaryModelUrls.albedo),normal:String(i.auxiliaryModelUrls.normal)},maxTileSize:i.maxTileSize,engine:i.engine??"auto",precision:i.precision??"auto",dynamicTile:e===!1?!1:{minTileSize:typeof e=="object"?e.minTileSize??256:256,initialTileSize:typeof e=="object"?e.initialTileSize??432:432,targetTileTimeMs:typeof e=="object"?e.targetTileTimeMs??16:16,adjustmentStep:typeof e=="object"?e.adjustmentStep??16:16}})}class Pr{aovs=[];aovSamples=16;maxSamples=2048;bounces=3;clamping=0;samplingPattern="sobol";directLightCandidates=4;bevel=!0;bevelSamples=8;dispersionWavelengths=3;alphaBlendStrategy="stochastic";transmissiveOutputAlphaMin=1;timeBudgetMs=21;maxTiles=1/0;batchSamples=!1;get allowMultipleSamplesPerFrame(){return this.batchSamples}set allowMultipleSamplesPerFrame(e){this.batchSamples=e}adaptiveResolution=!1;_resolutionScale=1;get resolutionScale(){return this._resolutionScale}set resolutionScale(e){if(this._fixed)throw new Error("Fixed-size renders cannot use resolutionScale.");if(!Number.isFinite(e)||e<=0)throw new Error("resolutionScale must be positive.");e!==this._resolutionScale&&this._cancelAdaptiveFrames(),this._resolutionScale=e}_fallback=null;get fallback(){return this._fallback}set fallback(e){if(e&&(e._engine!==this._engine||e===this||e.fallback))throw new Error("Fallback must be a render on the same engine with no fallback.");if(e&&this._dependents.size)throw new Error("Fallback renders cannot have their own fallback.");this._fallback?._dependents.delete(this),this._fallback=e,e?._dependents.add(this)}_dependents=new Set;_denoiserOptions=null;get denoiser(){return this._denoiserOptions}setDenoiser(e){e!==null&&wo(e);const t=e?Ig(e):null,A=this._denoiserOptions;return A===null&&t===null?this._denoiserReady:t&&A&&Ir(t)===Ir(A)&&(t.type!=="custom"||A.type==="custom"&&ht(t.aovs??[])===ht(A.aovs??[]))&&t.schedule===A.schedule&&(t.type!=="oidn"||A.type==="oidn"&&t.signal===A.signal)?this._denoiserReady:(this._denoiserOptions=t,this._refreshDenoiser()??this._denoiserReady)}_denoiserReady=Promise.resolve();_fixed;_target;_status="preparing";_disposed=!1;_busy=!1;_refineOptions;_offlineCamera=!1;_input={scene:-1,camera:-1,settings:""};_adaptiveScale=1;_lastScale=1;_frameTime=0;_sampleStart;_frameStart;_sampleScale=1;_frameScale=1;_adaptiveFrames=new Set;_adaptiveFastFrames=0;_events=new _n;get engine(){return this._engine}get denoising(){return!!this._denoisePending}on(e,t){return this._events.on(e,t)}_filter;_filterKey="";_warnedWebGPUFilter=!1;_denoiseController;_filterRevision=0;_filterPending;_denoiseRevision=0;_denoisePending;_denoisedSamples=0;_lastDenoiseTime=0;_warnedDenoisedReadback=!1;_engine;constructor(e,t={}){if(this._engine=e,t.denoiser!=null&&wo(t.denoiser),"width"in t||"height"in t){if("resolutionScale"in t||!Number.isInteger(t.width)||!Number.isInteger(t.height)||t.width<1||t.height<1)throw new Error("Provide positive integer width and height, or resolutionScale, exclusively.");this._fixed={width:t.width,height:t.height}}const{width:A,height:a,resolutionScale:r,fallback:n,denoiser:s,allowMultipleSamplesPerFrame:o,...l}=t;Object.assign(this,l),l.batchSamples===void 0&&o!==void 0&&(this.batchSamples=o),r!==void 0&&(this.resolutionScale=r),this._adaptiveScale=this._resolutionScale,this._lastScale=this._resolutionScale,this._validate(),this.fallback=n??null,e._register(this),s&&this.setDenoiser(s).catch(c=>this._engine._notifyError(c))}get width(){return this._target?.getMemory().width||this._size().width}get height(){return this._target?.getMemory().height||this._size().height}get samples(){return this._current?this._target?.getTotalSamplesRendered()??0:0}get converged(){return this.samples>=this.maxSamples}get status(){return!this._current&&this._status!=="error"?this._engine._ready?"converging":"preparing":this._status}get _current(){const e=this._engine._inputs;return e.scene===this._input.scene&&e.camera===this._input.camera&&!this._disposed}get _complete(){return this._current&&!!this._target?.presentationComplete&&!this._target.isFirstFrame()&&this.samples>0}get _presentable(){return this._complete&&(!this._denoisePending||this._denoisedSamples>0||this._schedule()==="converged"&&this.maxSamples>1)}get _output(){if(this._disposed)throw new Error("Render is disposed.");return this._target}get gpuSampleTimeMs(){return!this._busy&&this._current?this._target?.getRealtimeSampleTime?.():void 0}whenReadyToRefine(){if(this._disposed)throw new Error("Render is disposed.");return this._target?.whenTraceAvailable?.()??Promise.resolve()}get aovSamplesRendered(){return this._current?this._target?.getAovSamples?.()??0:0}_completeFor(e){const t=Wt(e);return t&&this.aovs.includes(t)&&this._target?.aovReady?this._current&&this._target.aovReady(t):this._complete}_restartAovs(){this._target?.activate(),this._target?.restartAovs?.(),this._status="converging"}_refineAov(e){if(this._engine._initializationError)throw this._engine._initializationError;if(!this.aovs.includes(e))throw new Error(`AOV ${e} is not enabled`);if(!this._engine._ready){const n=this._engine._deviceGeneration;return this._engine.init().catch(s=>{this._disposed||n!==this._engine._deviceGeneration||(this._status="error",this._engine._notifyError(s))}),this._status="preparing"}const t=performance.now(),A=this._synchronize();if(!A)return this._status="preparing";const a=A.getAovSamples?.()??0,r=e==="id"||e==="motion"?1:Math.min(this.maxSamples,this.aovSamples);return A.refineAovs?.(this._engine._inputs.value,Math.min(r,(A.getAovSamples?.()??0)+1))?((A.getAovSamples?.()??0)>a&&(this._frameTime=Math.max(.001,performance.now()-t),this._frameStart=t,this._frameScale=this._adaptiveScale,this._adaptResolution(!0)),this._status=(A.getAovSamples?.()??0)>=r?"finished":"converging"):this._status="compiling"}_validate(){if(ht(this.aovs),!Number.isInteger(this.aovSamples)||this.aovSamples<1)throw new Error("aovSamples must be a positive integer.");if(!Number.isFinite(this.maxSamples)||this.maxSamples<1)throw new Error("maxSamples must be positive.");if(this.dispersionWavelengths!==1&&this.dispersionWavelengths!==3)throw new Error("dispersionWavelengths must be 1 or 3.");const e=this.adaptiveResolution;if(e&&(this._fixed||!Number.isFinite(e.targetFrameMs)||e.targetFrameMs<=0||!Number.isFinite(e.minScale)||e.minScale<=0||e.minScale>this._resolutionScale))throw new Error("adaptiveResolution requires a scale-based render with positive targetFrameMs and minScale <= resolutionScale.")}_size(){if(this._fixed)return this._fixed;const e=this.adaptiveResolution?Math.min(this._adaptiveScale,this._resolutionScale):this._resolutionScale;return{width:Math.max(1,Math.round(this._engine.display.canvas.width*e)),height:Math.max(1,Math.round(this._engine.display.canvas.height*e))}}_settings(e=this.maxSamples){const t=xg(this,e);return t.batchSamples=this._refineOptions?.batchSamples??t.batchSamples,this._denoiserOptions?.type==="custom"&&(t.aovs=[...new Set([...this.aovs,...this._denoiserOptions.aovs??[]])]),t}_synchronize(e=this.maxSamples,t=!1){this._validate(),this._lastScale!==this._resolutionScale&&(this._adaptiveScale=this._resolutionScale,this._lastScale=this._resolutionScale);const A=this._target??=this._engine._createTarget();if(!A)return;const a=this._settings(e),r=this._size(),n=Cg(a,r),s=this._engine._inputs;return A.configure(a),A.activate(),A.setRealtimeBatchBudget?.(this._refineOptions?.targetBatchTimeMs??1/0),A.setRealtimeDeferPostProcess?.(!!this._refineOptions?.deferResolve),(!t&&this._offlineCamera||s.scene!==this._input.scene||s.camera!==this._input.camera||n!==this._input.settings)&&(t||(this._offlineCamera=!1),this._cancelDenoise(),A.restartSamples(),this._sampleStart=this._frameStart=void 0,this._frameTime=0,A.setSize(r.width,r.height),this._input={scene:s.scene,camera:s.camera,settings:n}),A.setOnSampleRendered((o,l,c)=>{this._frameTime=Math.max(c,this._sampleStart===void 0?0:performance.now()-this._sampleStart),this._frameStart=this._sampleStart,this._frameScale=this._sampleScale,this._sampleStart=void 0,this._events.emit("sample",{samples:o,isFirstFrame:l,frameTimeMs:c})}),A}_trace(e,t){this._sampleStart===void 0&&(this._sampleStart=performance.now(),this._sampleScale=this._adaptiveScale);const A=e.trace(this._engine._inputs.value,t);return A&&(this._sampleStart=void 0),A}_adaptResolution(e=!1){if(!this._busy&&this.adaptiveResolution&&this._frameTime>0&&(e?this.aovSamplesRendered>0:this.samples>0)){const{targetFrameMs:t,minScale:A}=this.adaptiveResolution,a=this._frameStart,r=this._frameTime,n=this._frameScale,s=this._resolutionScale,{width:o,height:l}=this._engine.display.canvas;this._frameTime=0;const c=Xi(()=>{this._adaptiveFrames.delete(c);const f=this.adaptiveResolution,p=this._engine.display.canvas;if(this._disposed||this._busy||!f||f.targetFrameMs!==t||f.minScale!==A||this._resolutionScale!==s||p.width!==o||p.height!==l)return;const h=Math.max(r,a===void 0?0:performance.now()-a),u=Np(n,h,t,s,this._adaptiveScale,A);if(u>this._adaptiveScale){if(++this._adaptiveFastFrames<4)return;this._adaptiveScale=Math.min(u,this._adaptiveScale*1.25)}else this._adaptiveScale=u;this._adaptiveFastFrames=0});this._adaptiveFrames.add(c)}}_cancelAdaptiveFrames(){for(const e of this._adaptiveFrames)e();this._adaptiveFrames.clear(),this._adaptiveFastFrames=0}refine(e,t){if(this._busy)throw new Error("Cannot refine a render while converge is running.");if(this._disposed)throw new Error("Render is disposed.");this._engine._setRenderError();const A=this._refineOptions;this._refineOptions=t;try{if(t?.targetBatchTimeMs!==void 0&&(!Number.isFinite(t.targetBatchTimeMs)||t.targetBatchTimeMs<=0))throw new RangeError("targetBatchTimeMs must be positive and finite.");return e===void 0?this._refine():this._refineAov(e)}catch(a){return this._engine._setRenderError(this._engine._notifyError(a)),this._status="error"}finally{this._refineOptions=A,this._engine._reportShaderProgress()}}_refine(){if(this._engine._initializationError)throw this._engine._initializationError;if(this._reloadDenoiser(),!this._engine._ready){const A=this._engine._deviceGeneration;return this._engine.init().catch(a=>{this._disposed||A!==this._engine._deviceGeneration||(this._status="error",this._engine._notifyError(a))}),this._status="preparing"}const e=this._synchronize();if(!e)return this._status="preparing";if(this._fallback&&this.samples===0&&!e.canCompleteSampleWithin(this.timeBudgetMs)&&!this._fallback._complete&&this._fallback._refineOne(),e.activate(),this._denoisePending)return this._status=this.converged?"denoising":"converging";e.setPreserveDenoisedOutput?.(!!this._filter&&this._schedule()!=="converged");const t=this._nextSampleTarget();if(this.samples<t){if(this._trace(e,t))return this._status="compiling"}else if(e.refineAovs&&!e.refineAovs(this._engine._inputs.value))return this._status="compiling";return this._maybeDenoise(!1,t),this._denoisePending?this._status=this.converged?"denoising":"converging":this._filterPending&&this.converged?this._status="preparing":(this._adaptResolution(),this._status=this.converged?"finished":"converging")}_refineOne(){if(this._busy||this._disposed||!this._engine._ready)return;this._reloadDenoiser();const e=this._synchronize();e&&(e.activate(),this.samples<1&&(this._status=this._trace(e,1)?"compiling":"converging"),this._maybeDenoise(),this._denoisePending||this._adaptResolution())}_schedule(){return this._denoiserOptions?.schedule??"converged"}_nextSampleTarget(){if(!this._filter)return this.maxSamples;if(this._schedule()==="every-sample")return Math.min(this.maxSamples,this.samples+1);if(this._schedule()==="converged")return this.maxSamples;if(this._denoisedSamples===0)return 1;const e=performance.now()-this._lastDenoiseTime;return e>=1e4?Math.min(this.maxSamples,this.samples+1):e<500?this.maxSamples:Math.min(this.maxSamples,Math.max(4,this._denoisedSamples*2))}_reloadDenoiser(){this._refreshDenoiser()?.catch(e=>this._engine._notifyError(e))}_refreshDenoiser(){if(this._disposed)return;const e=this._denoiserOptions,t=e?Ir(e):"";if(t===this._filterKey)return;this._filterKey=t;const A=++this._filterRevision;if(this._cancelDenoise(),this._filter&&this._filter.kind!=="custom"&&this._engine._releaseDenoiser(this._filter),this._target?.invalidateDenoisedOutput(),this._filter=void 0,this._filterPending=void 0,!e)return this._denoiserReady=Promise.resolve();if(e.type==="jnlm")return this._filter=this._engine._retainDenoiser(`jnlm:${t}`,()=>({kind:"jnlm",denoiser:Lo(e)})),this._denoiserReady=Promise.resolve();const a=(async()=>{if(await this._engine.init(),this._engine.backend!=="webgpu"){A===this._filterRevision&&!this._warnedWebGPUFilter&&(this._warnedWebGPUFilter=!0,console.warn("This denoiser requires WebGPU; denoising is disabled for this render."));return}if(A!==this._filterRevision||this._disposed)return;if(e.type==="custom"){this._filter={kind:"custom",denoiser:e.denoiser,aovs:e.aovs};return}const{loadOIDNNetwork:r}=await Mg(),n=await this._engine._acquireDenoiser(t,async()=>({kind:"oidn",denoiser:await r(this._engine,e)}));if(A!==this._filterRevision||this._disposed){this._engine._releaseDenoiser(n);return}this._filter=n,this._warmDenoiser()})();return this._filterPending=a,this._denoiserReady=a.catch(r=>{if(A===this._filterRevision&&!this._disposed)throw r}).finally(()=>{this._filterPending===a&&(this._filterPending=void 0)})}_warmDenoiser(){const e=this._filter,t=this._filterRevision;if(!e||e.kind!=="oidn")return;const A=e.denoiser,a=[A,A.auxiliaryDenoisers?.albedo,A.auxiliaryDenoisers?.normal],r=this.width,n=this.height;this._engine._enqueueDenoise(async()=>{t!==this._filterRevision||e!==this._filter||this._disposed||await Promise.all(a.map(o=>o?.prepareForImage?.(r,n,{tileOverlap:this._schedule()==="converged"?void 0:80})))}).catch(o=>{t===this._filterRevision&&e===this._filter&&!this._disposed&&this._engine._notifyError(o)})}_cancelDenoise(){this._denoiseController?.abort(),this._denoiseController=void 0,this._denoiseRevision++,this._target?.cancelDenoise?.(),this._denoisePending=void 0,this._denoisedSamples=0}_inputsChanged(e=!1){this._cancelDenoise(),e&&this._target?.invalidateTiming?.()}_deviceLost(e){this._cancelAdaptiveFrames(),this._cancelDenoise(),this._filterRevision++,this._filter=void 0,this._filterPending=void 0,this._filterKey="",this._target=void 0,this._input={scene:-1,camera:-1,settings:""},this._status=e?"preparing":"error"}_displayChanged(){this._cancelDenoise(),this._target?.invalidateDenoisedOutput()}_maybeDenoise(e=!1,t=this._nextSampleTarget()){const A=this._target,a=this._filter;if(!A||!a||this._denoisePending||this.samples<1||this._denoisedSamples===this.samples||!e&&this._schedule()==="converged"&&!this.converged||!e&&this._schedule()==="progressive"&&this.samples<t)return;this._engine.display._configure(this),A.activate(),A.drawPostProcess();const r=++this._denoiseRevision,n=this.samples,s=this._frameStart,o=this._denoiseController=new AbortController,l=this._engine._enqueueDenoise(async()=>{if(r!==this._denoiseRevision||this._disposed||(A.activate(),this._engine.display._configure(this),r!==this._denoiseRevision||this._disposed)||(A.drawPostProcess(),a.kind==="custom"&&(await this._engine._prepareCustomDenoiser(a.denoiser,this.width,this.height),o.signal.aborted||r!==this._denoiseRevision||this._disposed)))return;const c=await A.performDenoise?.(a,void 0,this._schedule(),o.signal);r!==this._denoiseRevision||this._disposed||c&&(A.activate(),A.drawPostProcess(),this._denoisedSamples=n,this._lastDenoiseTime=performance.now(),s!==void 0&&(this._frameTime=Math.max(this._frameTime,this._lastDenoiseTime-s)))});this._denoisePending=l,l.catch(c=>{r===this._denoiseRevision&&!this._disposed&&this._engine._notifyError(c)}).finally(()=>{this._denoisePending===l&&(this._denoiseController=void 0,this._denoisePending=void 0,this._status=this.converged?"finished":"converging",this._adaptResolution())})}async readPixels(e="hdr"){if(this._disposed)throw new Error("Render is disposed.");const t=this._target;if(["depth","position","roughness","diffuseAlbedo","specularAlbedo","id","motion"].includes(e)){const A=e;if(ht(this.aovs),!this.aovs.includes(A))throw new Error(`AOV ${A} is not enabled`);if(!t?.readAov)throw new Error("AOV output is not ready");return t.activate(),t.readAov(A)}return!t||this.samples===0?{width:0,height:0,data:new Float32Array(0)}:(e==="denoised"&&this._denoisedSamples===0&&(this._warnedDenoisedReadback||(this._warnedDenoisedReadback=!0,console.warn("Denoised output is not ready; reading HDR samples instead.")),e="hdr"),t.activate(),t.readOutput(e))}getOutputTexture(e){if(!(this._engine.backend!=="webgpu"||(e==="hdr"?!this._complete:!this._current||!this._target?.presentationComplete||!this._complete&&!this._target.getAovSamples?.())))return this._target?.getOutputTexture?.(e)}restart(){if(this._disposed)throw new Error("Render is disposed.");this._cancelDenoise(),this._cancelAdaptiveFrames(),this._sampleStart=this._frameStart=void 0,this._frameTime=0,this._target?.restartSamples(),this._status="converging"}dispose(){if(!this._disposed){this._disposed=!0,this._events.clear(),this._filterRevision++,this._cancelDenoise(),this._cancelAdaptiveFrames(),this._target&&this._engine._releaseTarget(this._target),this._filter&&this._filter.kind!=="custom"&&this._engine._releaseDenoiser(this._filter),this._target=void 0,this._filter=void 0,this._engine._unregister(this),this._fallback?._dependents.delete(this);for(const e of this._dependents)e._fallback=null;this._dependents.clear()}}async converge(e){if(this._busy)throw new Error("Converge is already running on this render.");if(this._disposed)throw new Error("Render is disposed.");const t=this._engine._inputs,A=this._engine._deviceGeneration;if(!t.value)throw new Error("Commit engine.scene and engine.camera with engine.update() before converge.");const a=Ur(e.camera??t.value),r=Math.max(1,Math.round(e.samples));if(!Number.isFinite(r))throw new Error("samples must be finite and positive.");const n=Math.max(1,Math.round(e.samplesPerBatch??8)),s=Math.max(0,Math.round(e.sampleSequenceOffset??0)),o=Math.max(1,e.timeoutMs??6e5),l=()=>{if(this._disposed)throw new Error("Render is disposed.");if(this._engine._deviceGeneration!==A)throw this._engine._lostError;if(e.signal?.aborted)throw e.signal.reason??new DOMException("Convergence aborted","AbortError");const h=this._engine._inputs;if(h.scene!==t.scene||h.camera!==t.camera)throw new Error("Engine inputs changed during converge.")};this._busy=!0;const c=()=>this._cancelDenoise();e.signal?.addEventListener("abort",c,{once:!0});let f;const p=performance.now();try{for(await this._engine._awaitDevice(this._engine.init()),l();!this._engine._ready;){if(l(),performance.now()-p>o)throw new Error("Timed out preparing convergence.");await new Promise(d=>setTimeout(d,0))}if(f=this._synchronize(r,!0),this._offlineCamera=!!e.camera,!f)throw new Error("The render target is not ready.");this._cancelDenoise(),f.restartSamples(),this._reloadDenoiser(),await this._engine._awaitDevice(Promise.resolve(this._filterPending)),l();const h=async(d,m,v)=>{l(),this._cancelDenoise(),f.activate(),f.restartSamples(),f.configure({...this._settings(d),batchSamples:!0});let g=e.targetBatchTimeMs&&this._engine.device?1:Math.min(n,d),w=-1,B=performance.now();const E=performance.now();for(;;){if(l(),performance.now()-E>o)throw new Error(`Timed out rendering the offline ${m} pass.`);f.activate(),f.setOfflineRenderOptions({samplesPerBatch:g,deferPostProcess:!0,sampleSequenceOffset:v});const b=f.getTotalSamplesRendered(),x=performance.now();this._status=f.trace(a,d)?"compiling":"converging";const y=f.getTotalSamplesRendered();if(y!==w&&(w=y,e.onProgress?.({stage:m,samples:Math.min(y,d),targetSamples:d}),m==="final"&&e.previewIntervalMs!==void 0&&y>0&&y<d&&performance.now()-B>=e.previewIntervalMs&&(f.drawPostProcess(),B=performance.now())),y>=d)break;if(y>b&&this._engine.device?await this._engine._awaitDevice(this._engine.device.queue.onSubmittedWorkDone()):await new Promise(T=>setTimeout(T,0)),e.targetBatchTimeMs&&this._engine.device&&y>b){const T=Math.max(1,Math.min(n,Math.round(e.targetBatchTimeMs*(y-b)/Math.max(1,performance.now()-x))));g=T>g?Math.min(T,g*2):T}}await this._engine._awaitDevice(Promise.resolve(this._engine.device?.queue.onSubmittedWorkDone())),l()};let u={samples:r,averageSamplesPerPixel:r,pilotSamples:0,adaptiveSampling:!1};if(e.adaptiveSampling&&this._engine.device){const d=Math.min(r,Math.max(2,Math.round(e.adaptiveSampling.pilotSamples??8)));f.activate(),f.setVarianceMoments(!0),f.setAdaptiveSamplingTargets(void 0),await h(d,"pilot",s),f.activate();const m=await this._engine._awaitDevice(f.prepareOfflineAdaptiveSampling({...e.adaptiveSampling,maxSamples:r}));m?(f.activate(),f.setVarianceMoments(!1),await h(m.maximumTarget,"final",s+d),u={samples:m.maximumTarget,averageSamplesPerPixel:m.averageTarget,pilotSamples:d,varianceHistory:m.history,adaptiveSampling:!0}):(f.setVarianceMoments(!1),f.setAdaptiveSamplingTargets(void 0),await h(r,"final",s))}else f.activate(),f.setVarianceMoments(!1),f.setAdaptiveSamplingTargets(void 0),await h(r,"final",s);return this._filter&&(e.onProgress?.({stage:"denoising",samples:u.samples,targetSamples:u.samples}),this._status="denoising",this._maybeDenoise(!0),await this._engine._awaitDevice(Promise.resolve(this._denoisePending)),l()),this._status="finished",u}catch(h){throw this._engine._deviceGeneration===A&&(this._status="error"),h}finally{f&&!this._disposed&&this._engine._deviceGeneration===A&&(f.activate(),f.setVarianceMoments(!1),f.setAdaptiveSamplingTargets(void 0),f.setOfflineRenderOptions({samplesPerBatch:0,deferPostProcess:!1,sampleSequenceOffset:0})),e.signal?.removeEventListener("abort",c),this._busy=!1}}}function Pg(i,e,t,A,a){const r=t?-1/0:e&&i.previousChanged?A:i.lastContinuousChange;return{previousChanged:e&&!t,lastContinuousChange:r,changing:t||A-r<Math.max(0,a)}}function Eo(i,e){return JSON.stringify([i.samples,i.width,i.height,i.maxSamples,i.bounces,i.clamping,i.samplingPattern,i.directLightCandidates,i.bevel,i.bevelSamples,i.dispersionWavelengths,i.alphaBlendStrategy,i.transmissiveOutputAlphaMin,i.resolutionScale,i.adaptiveResolution,i.denoiser,i.denoising,i.aovs,i.aovSamples,e.canvas.width,e.canvas.height,e.toneMapping,e.toneMappingExposure,e.contrast,e.saturation,e.temperature,e.tint,e.vignette,e.bloomIntensity,e.bloomThreshold,e.bloomRadius,e.hdrOutputEnabled,e.channel,e.shadowCatcherColor,e.shadowCatcherAlpha,e.aovDepthRange,e.aovPositionScale,e.aovMotionScale,e.aovIdComponent])}class Sg{engine;preview;final;display;select=({changing:e})=>e?"preview":"final";idleMs;coalesceSceneUpdates;_changing=!1;_status="preparing";_events=new _n;_syncs=new Set;_owned=new Set;_policy={previousChanged:!1,lastContinuousChange:-1/0,changing:!1};_running=!1;_busy=!1;_disposed=!1;_cancelScheduled;_refillGeneration=0;_cancelRefillFrame;_warnedTick=!1;_previewFrameOwner;_presented;_finishedImage;_motion;_unsubscribe;constructor(e,t={}){this.engine=e;const A=t.sync?Array.isArray(t.sync)?t.sync:[t.sync]:[];for(const a of A)this._checkEngine(a.engine);for(const a of[t.preview,t.final])a instanceof Pr&&this._checkEngine(a.engine);this.display=t.display??e.display,this.idleMs=t.idleMs??150,this.coalesceSceneUpdates=t.coalesceSceneUpdates??!1;try{t.preview!==!1&&(this.preview=this._render(t.preview,{resolutionScale:.5,timeBudgetMs:80,adaptiveResolution:{targetFrameMs:80,minScale:.125},bounces:2,bevel:!1,dispersionWavelengths:1,directLightCandidates:2})),this.final=this._render(t.final,{fallback:this.preview??null})}catch(a){for(const r of this._owned)r.dispose();throw a}for(const a of A)this.addSync(a);this._unsubscribe=this.final.on("sample",a=>this._events.emit("sample",{...a,preview:!1})),typeof document<"u"&&document.addEventListener("visibilitychange",this._visibility)}_render(e,t){if(e instanceof Pr)return e;const A={...t,...e};e&&"width"in e&&("resolutionScale"in e||delete A.resolutionScale,"adaptiveResolution"in e||delete A.adaptiveResolution);const a=new Pr(this.engine,A);return this._owned.add(a),a}_checkEngine(e){if(e!==this.engine)throw new Error("RenderLoop renders and syncs must belong to the same engine.")}_assertAlive(){if(this._disposed)throw new Error("RenderLoop is disposed.")}get changing(){return this._changing}get samples(){return this.status==="previewing"?0:this.final.samples}get status(){return this._status}on(e,t){return this._events.on(e,t)}addSync(e){this._assertAlive(),this._checkEngine(e.engine),this._syncs.add(e)}removeSync(e){this._syncs.delete(e)}_setStatus(e){if(e!==this._status){const t=this._status;this._status=e,this._events.emit("status",{status:e,previous:t})}return e}_present(e){const t=this.display.present(e);return t&&(this._presented=t),t}tick(){return this._assertAlive(),this._running?(this._warnedTick||(this._warnedTick=!0,console.warn("RenderLoop.tick() is ignored while start() is active.")),this.status):this._tick()}_tick(){this._cancelRefill();const e=this._refillGeneration;if(this._busy||typeof document<"u"&&document.hidden)return this.status;for(const B of this._syncs)B.update();const t=Wt(this.display.channel),A=B=>B.refine(t,{batchSamples:B.batchSamples&&!this.changing&&B!==this.preview,targetBatchTimeMs:4}),a=B=>t?B.aovSamplesRendered:B.samples,r=this._previewFrameOwner,n=!!r&&(r===this.preview||!r._completeFor(this.display.channel)),s=n&&this.preview?.status==="converging"&&a(this.preview)===0,o=s||!t&&this.coalesceSceneUpdates&&n&&!!this.preview?.denoising;n&&!o&&this.preview&&this._present(this.preview),o||(this._previewFrameOwner=void 0);const l=o?!1:this.engine.update(),c=[...this._syncs].some(B=>B.active);this._policy=Pg(this._policy,l,c,performance.now(),this.idleMs),this._changing=this._policy.changing;const f=this.select({changing:this.changing});if(o&&this.preview){if(s){if(A(this.preview)==="error")return this._previewFrameOwner=void 0,this._setStatus("error");(!this.coalesceSceneUpdates||!this.preview.denoising)&&this._present(this.preview)&&(this._previewFrameOwner=void 0)}return this._setStatus("previewing")}const p=f==="preview"&&this.preview?this.preview:this.final,h=!l&&!this.changing;t!=="motion"?this._motion=void 0:this._motion?.render!==p?this._motion={render:p,phase:this._motion?"priming":"moving"}:(!h&&this._motion.phase!=="priming"||!p._completeFor("motion")&&this._motion.phase==="settled")&&(this._motion.phase="moving");const u=this._motion,d=Eo(this.final,this.display);if(h&&p===this.final&&this.status==="finished"&&this.final.status==="finished"&&d===this._finishedImage&&(!u||u.phase==="settled"))return this.status;this.status==="finished"&&d!==this._finishedImage&&this.final.samples>0&&this._present(this.final),u?.phase==="moving"&&h&&p._completeFor("motion")&&(p._restartAovs(),u.phase="settling");let m=A(p);u?.phase==="priming"&&m==="finished"&&(p._restartAovs(),u.phase="settling",m=A(p)),u?.phase==="settling"&&m==="finished"&&(u.phase="settled");const v=!!this.preview&&(p===this.preview&&m==="converging"&&a(p)===0||!t&&this.coalesceSceneUpdates&&this.preview.denoising)&&(p===this.preview||!p._completeFor(this.display.channel)&&p.fallback===this.preview);v?this._previewFrameOwner=p:this._present(p);const g=v||!t&&p===this.preview&&p.denoising||!!this.preview&&this._presented===this.preview,w=m==="error"?"error":g?"previewing":m;return this._finishedImage=w==="finished"?Eo(this.final,this.display):void 0,e===this._refillGeneration&&!t&&h&&p===this.final&&!g&&this._scheduleRefill(),this._setStatus(w)}_cancelRefill(){this._refillGeneration++,this._cancelRefillFrame?.(),this._cancelRefillFrame=void 0}_scheduleRefill(){const e=this.engine.device;if(!e||!this._canRefill())return;const t=this._refillGeneration;this._cancelRefillFrame=Xi(()=>this._cancelRefill());const A=()=>{if(t!==this._refillGeneration||e!==this.engine.device||this._disposed||this._busy||typeof document<"u"&&document.hidden||Wt(this.display.channel)||!this._canRefill()||[...this._syncs].some(s=>s.active)||this.select({changing:!1})!=="final")return;const r=this.final.samples,n=this.final.refine(void 0,{targetBatchTimeMs:4,deferResolve:!0});if(n==="error"){this._cancelRefill(),this._setStatus("error");return}this.final.samples>r&&n==="converging"&&a()},a=()=>{this.final.whenReadyToRefine().then(A,()=>{})};a()}_canRefill(){const e=this.final.gpuSampleTimeMs;return this.final.batchSamples&&!this.final.denoising&&this.final.samples>0&&this.final.status==="converging"&&e!==void 0&&e<=this.final.timeBudgetMs}_schedule(){!this._running||this._busy||this._cancelScheduled!==void 0||typeof document<"u"&&document.hidden||(this._cancelScheduled=Xi(()=>{this._cancelScheduled=void 0;try{this._tick()}finally{this._schedule()}}))}_visibility=()=>{document.hidden?(this._cancelFrame(),this._cancelRefill()):this._schedule()};_cancelFrame(){this._cancelScheduled?.(),this._cancelScheduled=void 0}start(){this._assertAlive(),this._running=!0,this._schedule()}stop(){this._running=!1,this._cancelFrame(),this._cancelRefill()}async converge(e){if(this._assertAlive(),this._busy)throw new Error("RenderLoop convergence is already running.");this._busy=!0,this._previewFrameOwner=void 0,this._cancelFrame(),this._cancelRefill();try{for(const A of this._syncs)A.update();this.engine.update(),this._setStatus("preparing");const t=await this.final.converge({...e,onProgress:A=>{this._setStatus(A.stage==="denoising"?"denoising":this.final.status),e.onProgress?.(A)}});return this._present(this.final),this._setStatus("finished"),t}catch(t){throw this._setStatus("error"),t}finally{this._busy=!1,this._schedule()}}dispose(){if(!this._disposed){this.stop(),this._disposed=!0,this._unsubscribe(),this._events.clear(),this._syncs.clear(),typeof document<"u"&&document.removeEventListener("visibilitychange",this._visibility);for(const e of this._owned)e.dispose();this._owned.clear()}}}const bo=64,_o="./oidn/";let ze=null,Vi=!1,ya=()=>{};const Dg=8;function Tg(i,e){const t=document.createElement("canvas");return t.className="mt-canvas",t.style.opacity="0",t.style.transition="opacity .3s ease-out",e.after(t),{canvas:t,ctx:t.getContext("2d"),has:!1,on:!1}}const Rg=[.01,.05,.1,.25,.5,.75,.9,.95,.99],xa=33;let $r=[0,1,2].map(()=>Array.from({length:xa},(i,e)=>Math.min(1,e/(xa-1)*1.4))),jA=null;const Ci=document.createElement("canvas");Ci.width=64;Ci.height=36;const yo=Ci.getContext("2d",{willReadFrequently:!0});function xo(i){yo.drawImage(i,0,0,Ci.width,Ci.height);const e=yo.getImageData(0,0,Ci.width,Ci.height).data,t=e.length/4;return[0,1,2].map(A=>{const a=new Float32Array(t);for(let r=0;r<t;r++)a[r]=e[r*4+A]/255;return a.sort(),Rg.map(r=>a[Math.min(t-1,Math.floor(r*t))])})}function Ug(i,e){const t=[0,...i,1],A=[0,...e,1];for(let a=1;a<t.length;a++)t[a]<=t[a-1]&&(t[a]=t[a-1]+1e-4),A[a]=Math.max(A[a],A[a-1]);return Array.from({length:xa},(a,r)=>{const n=r/(xa-1);let s=1;for(;s<t.length-1&&t[s]<n;)s++;const o=Qo((n-t[s-1])/(t[s]-t[s-1]),0,1),l=A[s-1]+o*(A[s]-A[s-1]);return Qo(l,n*.8,Math.min(1,n*2.4))})}const Co="mt-preview-tone";let Sr=[];function Dr(){if(!Sr.length){const i="http://www.w3.org/2000/svg",e=document.createElementNS(i,"svg");e.setAttribute("width","0"),e.setAttribute("height","0"),e.style.position="absolute";const t=document.createElementNS(i,"filter");t.id=Co,t.setAttribute("color-interpolation-filters","sRGB");const A=document.createElementNS(i,"feComponentTransfer");Sr=["feFuncR","feFuncG","feFuncB"].map(a=>{const r=document.createElementNS(i,a);return r.setAttribute("type","table"),A.append(r),r}),t.append(A),e.append(t),document.body.append(e)}return Sr.forEach((i,e)=>i.setAttribute("tableValues",$r[e].map(t=>t.toFixed(4)).join(" "))),`url(#${Co})`}function Lg(i,e){const t=i.hold,A=i.canvas,a=e===i.loop.preview,r=e===i.loop.final;if(A.style.filter=a?Dr():"",a)jA=xo(A);else if(r&&i.loop.final.converged&&jA){const o=xo(A),l=jA;$r=$r.map((c,f)=>{const p=Ug(l[f],o[f]);return c.map((h,u)=>h*.5+p[u]*.5)}),jA=null,Dr()}const n=i.loop.final,s=n._denoisedSamples??n.samples;if(r&&!n.converged&&s<Dg){t.has&&!t.on&&(t.on=!0,t.canvas.style.transition="none",t.canvas.style.opacity="1");return}t.on&&(t.on=!1,t.canvas.style.transition=r?"opacity .3s ease-out":"none",t.canvas.style.opacity="0"),(t.canvas.width!==A.width||t.canvas.height!==A.height)&&(t.canvas.width=A.width,t.canvas.height=A.height),t.ctx.filter=a?Dr():"none",t.ctx.drawImage(A,0,0),t.ctx.filter="none",t.has=!0}const Qo=(i,e,t)=>Math.min(t,Math.max(e,i));function Jc(i,e,t,A,a){const r=document.createElement("canvas");r.className="mt-canvas",r.style.visibility="hidden",i.prepend(r);const n=new yg({canvas:r}),s=new Eu(n,{scene:e,camera:t,controls:A,updateControls:!1,convertMaterial:u=>u.isMeshStandardMaterial?void 0:null});if(a){const u=s.update.bind(s);s.update=()=>{if(Vi)return u();const d=a();try{u()}finally{d()}}}const o=Math.min(devicePixelRatio,2),l=new Sg(n,{sync:s,coalesceSceneUpdates:!0,preview:{resolutionScale:o>=2?.75:1,timeBudgetMs:80,adaptiveResolution:{targetFrameMs:80,minScale:.5},maxSamples:1,bounces:6,bevel:!1,dispersionWavelengths:1,directLightCandidates:2,denoiser:{type:"jnlm",schedule:"every-sample"}},final:{maxSamples:bo,bounces:6,resolutionScale:o>=2?.75:1,batchSamples:!0,denoiser:{type:"jnlm",schedule:"progressive"}}}),c={engine:n,loop:l,canvas:r,ready:!1,hold:Tg(i,r)},f=n.display.present.bind(n.display);n.display.present=u=>{const d=f(u);return d&&Vi&&Lg(c,d),d};const p=()=>n.display.setSize(Math.max(1,Math.round(i.clientWidth*o)),Math.max(1,Math.round(i.clientHeight*o)));new ResizeObserver(p).observe(i),p();const h=()=>{!c.ready&&l.samples>0&&(c.ready=!0,Vi||l.stop()),Vi&&ya(`MuTracer(${n.backend??"…"}) ${Ng(l.status)} · ${l.samples}/${bo} 샘플`)};return l.on("status",h),l.on("sample",h),n.display.toneMapping="agx",n.display.toneMappingExposure=$c*1.5,n.init().then(()=>{n.backend==="webgpu"&&(l.final.setDenoiser({type:"oidn",model:"standard",schedule:"every-sample",weightsBaseUrl:_o}).catch(u=>console.warn("[MuTracer] OIDN",u)),l.preview?.setDenoiser({type:"oidn",model:"small",schedule:"every-sample",weightsBaseUrl:_o}).catch(u=>console.warn("[MuTracer] OIDN",u)))}).catch(u=>ya(`MuTracer 시작 실패: ${u?.message??u}`)),l.start(),window.__mutracer={engine:n,sync:s,loop:l},c}let $c=1;function Og(i){$c=i,ze&&(ze.engine.display.toneMappingExposure=i*1.5)}function Fg(i,e,t,A,a){ze||(ze=Jc(i,e,t,A,a))}function zg(i,e,t,A,a,r){ya=a,Vi=!0,ze||(ze=Jc(i,e,t,A)),ze.canvas.style.visibility="",ze.hold.canvas.style.visibility="";const n=ze.hold;r&&r.width>0&&(n.canvas.width=ze.canvas.width,n.canvas.height=ze.canvas.height,n.ctx.drawImage(r,0,0,n.canvas.width,n.canvas.height),n.has=!0,n.on=!0,n.canvas.style.transition="none",n.canvas.style.opacity="1"),ze.loop.start(),ze.loop.final.converged&&ze.engine.display.present(ze.loop.final),ya(ze.ready?"MuTracer 렌더 중…":"MuTracer 셰이더 준비 중… (처음 한 번 10초 남짓)")}function kg(){Vi=!1,ze&&(ze.canvas.style.visibility="hidden",ze.hold.canvas.style.visibility="hidden",ze.hold.on=!1,ze.hold.has=!1,ze.hold.canvas.style.opacity="0",ze.canvas.style.filter="",ze.ready&&ze.loop.stop())}function Ng(i){return{preparing:"장면 준비",compiling:"셰이더 준비",converging:"수렴 중",denoising:"노이즈 제거",finished:"완료",error:"오류",previewing:"미리보기"}[i]??i}const Hg=Object.freeze(Object.defineProperty({__proto__:null,hideMutracer:kg,prewarmMutracer:Fg,setMutracerExposure:Og,showMutracer:zg},Symbol.toStringTag,{value:"Module"}));export{Us as M,Hg as m};
