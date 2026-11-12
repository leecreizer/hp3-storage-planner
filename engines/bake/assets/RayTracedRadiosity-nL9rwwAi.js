import{S as ce,V as R,L as Jt,P as Ti,a as It,T as Et,M as ot,B as Pe,D as Oe,R as Rn,b as We,c as Ft,d as Ai,F as In,e as _i,N as $n,f as bs,g as ki,C as Oi,u as Se,h as F,m as Wi,i as je,G as qi,s as Ie,j as ze,k as $e,l as Xi,n as Mi,E as Yi,o as Zi,p as Qt,q as Ki,r as Gi,t as os,v as Rs,w as Qi,x as En,y as Ji,z as ji,Q as tr,A as $s,H as tn,I as Ls,J as lt,K as Dt,O as it,U as Hn,W as mt,X as Cs,Y as er,Z as nr,_ as sr,$ as ir,a0 as Ut,a1 as rr,a2 as en,a3 as nn,a4 as Fs,a5 as sn,a6 as Bt,a7 as kt,a8 as Ds,a9 as Ns,aa as or,ab as ar,ac as cr,ad as lr,ae as ur,af as fr,ag as dr,ah as hr,ai as pr,aj as mr,ak as yr,al as gr}from"./embed-CrREUk7d.js";const ye=new ce({min:"array<f32, 3>",max:"array<f32, 3>"},"BVHBoundingBox");ye.getLength=()=>6;const Ge=new ce({bounds:"BVHBoundingBox",rightChildOrTriangleOffset:"uint",splitAxisOrTriangleCount:"uint"},"BVHNode");Ge.getLength=()=>ye.getLength()+2;const xr=new ce({matrixWorld:"mat4x4f",inverseMatrixWorld:"mat4x4f",visible:"uint",_alignment0:"uint",_alignment1:"uint",_alignment2:"uint"},"TransformStruct"),et=new ce({origin:"vec3f",direction:"vec3f",maxDist:"float"},"Ray"),Wt=new ce({indices:"vec4u",normal:"vec3f",didHit:"bool",barycoord:"vec3f",objectIndex:"uint",side:"float",dist:"float"},"IntersectionResult"),rn=new ce({faceIndices:"vec4u",closestPoint:"vec3f",found:"bool",barycoord:"vec3f",objectIndex:"uint",faceNormal:"vec3f",side:"float",distanceSq:"float"},"PointQueryResult"),Bi=0,vr=1,Si=2,Un=0,Es=1,Hs=2,kn=1.25,Us=1,Y=32,N=Y/4,Ts=65535,Sn=Math.pow(2,-24),Ze=Symbol("SKIP_GENERATION"),Pi={strategy:Bi,maxDepth:40,targetLeafSize:10,useSharedArrayBuffer:!1,setBoundingBox:!0,onProgress:null,indirect:!1,verbose:!0,range:null,[Ze]:!1};class jt{constructor(){this.min=1/0,this.max=-1/0}setFromPointsField(t,e){let n=1/0,s=-1/0;for(let o=0,r=t.length;o<r;o++){const a=t[o][e];n=a<n?a:n,s=a>s?a:s}this.min=n,this.max=s}setFromPoints(t,e){let n=1/0,s=-1/0;for(let o=0,r=e.length;o<r;o++){const c=e[o],a=t.dot(c);n=a<n?a:n,s=a>s?a:s}this.min=n,this.max=s}isSeparated(t){return this.min>t.max||t.min>this.max}}jt.prototype.setFromBox=(function(){const i=new R;return function(e,n){const s=n.min,o=n.max;let r=1/0,c=-1/0;for(let a=0;a<=1;a++)for(let l=0;l<=1;l++)for(let u=0;u<=1;u++){i.x=s.x*a+o.x*(1-a),i.y=s.y*l+o.y*(1-l),i.z=s.z*u+o.z*(1-u);const d=e.dot(i);r=Math.min(d,r),c=Math.max(d,c)}this.min=r,this.max=c}})();const wr=(function(){const i=new R,t=new R,e=new R;return function(s,o,r){const c=s.start,a=i,l=o.start,u=t;e.subVectors(c,l),i.subVectors(s.end,s.start),t.subVectors(o.end,o.start);const d=e.dot(u),f=u.dot(a),h=u.dot(u),w=e.dot(a),x=a.dot(a)*h-f*f;let T,y;x!==0?T=(d*f-w*h)/x:T=0,y=(d+T*f)/h,r.x=T,r.y=y}})(),As=(function(){const i=new It,t=new R,e=new R;return function(s,o,r,c){wr(s,o,i);let a=i.x,l=i.y;if(a>=0&&a<=1&&l>=0&&l<=1){s.at(a,r),o.at(l,c);return}else if(a>=0&&a<=1){l<0?o.at(0,c):o.at(1,c),s.closestPointToPoint(c,!0,r);return}else if(l>=0&&l<=1){a<0?s.at(0,r):s.at(1,r),o.closestPointToPoint(r,!0,c);return}else{let u;a<0?u=s.start:u=s.end;let d;l<0?d=o.start:d=o.end;const f=t,h=e;if(s.closestPointToPoint(d,!0,t),o.closestPointToPoint(u,!0,e),f.distanceToSquared(d)<=h.distanceToSquared(u)){r.copy(f),c.copy(d);return}else{r.copy(u),c.copy(h);return}}}})(),br=(function(){const i=new R,t=new R,e=new Ti,n=new Jt;return function(o,r){const{radius:c,center:a}=o,{a:l,b:u,c:d}=r;if(n.start=l,n.end=u,n.closestPointToPoint(a,!0,i).distanceTo(a)<=c||(n.start=l,n.end=d,n.closestPointToPoint(a,!0,i).distanceTo(a)<=c)||(n.start=u,n.end=d,n.closestPointToPoint(a,!0,i).distanceTo(a)<=c))return!0;const b=r.getPlane(e);if(Math.abs(b.distanceToPoint(a))<=c){const T=b.projectPoint(a,t);if(r.containsPoint(T))return!0}return!1}})(),Tr=["x","y","z"],Kt=1e-15,ks=Kt*Kt;function $t(i){return Math.abs(i)<Kt}class Ct extends Et{constructor(...t){super(...t),this.isExtendedTriangle=!0,this.satAxes=new Array(4).fill().map(()=>new R),this.satBounds=new Array(4).fill().map(()=>new jt),this.points=[this.a,this.b,this.c],this.plane=new Ti,this.isDegenerateIntoSegment=!1,this.isDegenerateIntoPoint=!1,this.degenerateSegment=new Jt,this.needsUpdate=!0}intersectsSphere(t){return br(t,this)}update(){const t=this.a,e=this.b,n=this.c,s=this.points,o=this.satAxes,r=this.satBounds,c=o[0],a=r[0];this.getNormal(c),a.setFromPoints(c,s);const l=o[1],u=r[1];l.subVectors(t,e),u.setFromPoints(l,s);const d=o[2],f=r[2];d.subVectors(e,n),f.setFromPoints(d,s);const h=o[3],w=r[3];h.subVectors(n,t),w.setFromPoints(h,s);const b=l.length(),x=d.length(),T=h.length();this.isDegenerateIntoPoint=!1,this.isDegenerateIntoSegment=!1,b<Kt?x<Kt||T<Kt?this.isDegenerateIntoPoint=!0:(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(t),this.degenerateSegment.end.copy(n)):x<Kt?T<Kt?this.isDegenerateIntoPoint=!0:(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(e),this.degenerateSegment.end.copy(t)):T<Kt&&(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(n),this.degenerateSegment.end.copy(e)),this.plane.setFromNormalAndCoplanarPoint(c,t),this.needsUpdate=!1}}Ct.prototype.closestPointToSegment=(function(){const i=new R,t=new R,e=new Jt;return function(s,o=null,r=null){const{start:c,end:a}=s,l=this.points;let u,d=1/0;for(let f=0;f<3;f++){const h=(f+1)%3;e.start.copy(l[f]),e.end.copy(l[h]),As(e,s,i,t),u=i.distanceToSquared(t),u<d&&(d=u,o&&o.copy(i),r&&r.copy(t))}return this.closestPointToPoint(c,i),u=c.distanceToSquared(i),u<d&&(d=u,o&&o.copy(i),r&&r.copy(c)),this.closestPointToPoint(a,i),u=a.distanceToSquared(i),u<d&&(d=u,o&&o.copy(i),r&&r.copy(a)),Math.sqrt(d)}})();Ct.prototype.intersectsTriangle=(function(){const i=new Ct,t=new jt,e=new jt,n=new R,s=new R,o=new R,r=new R,c=new Jt,a=new Jt,l=new R,u=new It,d=new It;function f(g,m,v,B){const p=n;!g.isDegenerateIntoPoint&&!g.isDegenerateIntoSegment?p.copy(g.plane.normal):p.copy(m.plane.normal);const _=g.satBounds,S=g.satAxes;for(let A=1;A<4;A++){const P=_[A],I=S[A];if(t.setFromPoints(I,m.points),P.isSeparated(t)||(r.copy(p).cross(I),t.setFromPoints(r,g.points),e.setFromPoints(r,m.points),t.isSeparated(e)))return!1}const M=m.satBounds,z=m.satAxes;for(let A=1;A<4;A++){const P=M[A],I=z[A];if(t.setFromPoints(I,g.points),P.isSeparated(t)||(r.crossVectors(p,I),t.setFromPoints(r,g.points),e.setFromPoints(r,m.points),t.isSeparated(e)))return!1}return v&&(B||console.warn("ExtendedTriangle.intersectsTriangle: Triangles are coplanar which does not support an output edge. Setting edge to 0, 0, 0."),v.start.set(0,0,0),v.end.set(0,0,0)),!0}function h(g,m,v,B,p,_,S,M,z,A,P){let I=S/(S-M);A.x=B+(p-B)*I,P.start.subVectors(m,g).multiplyScalar(I).add(g),I=S/(S-z),A.y=B+(_-B)*I,P.end.subVectors(v,g).multiplyScalar(I).add(g)}function w(g,m,v,B,p,_,S,M,z,A,P){if(p>0)h(g.c,g.a,g.b,B,m,v,z,S,M,A,P);else if(_>0)h(g.b,g.a,g.c,v,m,B,M,S,z,A,P);else if(M*z>0||S!=0)h(g.a,g.b,g.c,m,v,B,S,M,z,A,P);else if(M!=0)h(g.b,g.a,g.c,v,m,B,M,S,z,A,P);else if(z!=0)h(g.c,g.a,g.b,B,m,v,z,S,M,A,P);else return!0;return!1}function b(g,m,v,B){const p=m.degenerateSegment,_=g.plane.distanceToPoint(p.start),S=g.plane.distanceToPoint(p.end);return $t(_)?$t(S)?f(g,m,v,B):(v&&(v.start.copy(p.start),v.end.copy(p.start)),g.containsPoint(p.start)):$t(S)?(v&&(v.start.copy(p.end),v.end.copy(p.end)),g.containsPoint(p.end)):g.plane.intersectLine(p,n)!=null?(v&&(v.start.copy(n),v.end.copy(n)),g.containsPoint(n)):!1}function x(g,m,v){const B=m.a;return $t(g.plane.distanceToPoint(B))&&g.containsPoint(B)?(v&&(v.start.copy(B),v.end.copy(B)),!0):!1}function T(g,m,v){const B=g.degenerateSegment,p=m.a;return B.closestPointToPoint(p,!0,n),p.distanceToSquared(n)<ks?(v&&(v.start.copy(p),v.end.copy(p)),!0):!1}function y(g,m,v,B){if(g.isDegenerateIntoSegment)if(m.isDegenerateIntoSegment){const p=g.degenerateSegment,_=m.degenerateSegment,S=s,M=o;p.delta(S),_.delta(M);const z=n.subVectors(_.start,p.start),A=S.x*M.y-S.y*M.x;if($t(A))return!1;const P=(z.x*M.y-z.y*M.x)/A,I=-(S.x*z.y-S.y*z.x)/A;if(P<0||P>1||I<0||I>1)return!1;const V=p.start.z+S.z*P,L=_.start.z+M.z*I;return $t(V-L)?(v&&(v.start.copy(p.start).addScaledVector(S,P),v.end.copy(p.start).addScaledVector(S,P)),!0):!1}else return m.isDegenerateIntoPoint?T(g,m,v):b(m,g,v,B);else{if(g.isDegenerateIntoPoint)return m.isDegenerateIntoPoint?m.a.distanceToSquared(g.a)<ks?(v&&(v.start.copy(g.a),v.end.copy(g.a)),!0):!1:m.isDegenerateIntoSegment?T(m,g,v):x(m,g,v);if(m.isDegenerateIntoPoint)return x(g,m,v);if(m.isDegenerateIntoSegment)return b(g,m,v,B)}}return function(m,v=null,B=!1){this.needsUpdate&&this.update(),m.isExtendedTriangle?m.needsUpdate&&m.update():(i.copy(m),i.update(),m=i);const p=y(this,m,v,B);if(p!==void 0)return p;const _=this.plane,S=m.plane;let M=S.distanceToPoint(this.a),z=S.distanceToPoint(this.b),A=S.distanceToPoint(this.c);$t(M)&&(M=0),$t(z)&&(z=0),$t(A)&&(A=0);const P=M*z,I=M*A;if(P>0&&I>0)return!1;let V=_.distanceToPoint(m.a),L=_.distanceToPoint(m.b),$=_.distanceToPoint(m.c);$t(V)&&(V=0),$t(L)&&(L=0),$t($)&&($=0);const W=V*L,ut=V*$;if(W>0&&ut>0)return!1;s.copy(_.normal),o.copy(S.normal);const ft=s.cross(o);let at=0,At=Math.abs(ft.x);const E=Math.abs(ft.y);E>At&&(At=E,at=1),Math.abs(ft.z)>At&&(at=2);const D=Tr[at],_t=this.a[D],gt=this.b[D],xt=this.c[D],nt=m.a[D],dt=m.b[D],vt=m.c[D];if(w(this,_t,gt,xt,P,I,M,z,A,u,c))return f(this,m,v,B);if(w(m,nt,dt,vt,W,ut,V,L,$,d,a))return f(this,m,v,B);if(u.y<u.x){const j=u.y;u.y=u.x,u.x=j,l.copy(c.start),c.start.copy(c.end),c.end.copy(l)}if(d.y<d.x){const j=d.y;d.y=d.x,d.x=j,l.copy(a.start),a.start.copy(a.end),a.end.copy(l)}return u.y<d.x||d.y<u.x?!1:(v&&(d.x>u.x?v.start.copy(a.start):v.start.copy(c.start),d.y<u.y?v.end.copy(a.end):v.end.copy(c.end)),!0)}})();Ct.prototype.distanceToPoint=(function(){const i=new R;return function(e){return this.closestPointToPoint(e,i),e.distanceTo(i)}})();Ct.prototype.distanceToTriangle=(function(){const i=new R,t=new R,e=["a","b","c"],n=new Jt,s=new Jt;return function(r,c=null,a=null){const l=c||a?n:null;if(this.intersectsTriangle(r,l,!0))return(c||a)&&(c&&l.getCenter(c),a&&l.getCenter(a)),0;let u=1/0;for(let d=0;d<3;d++){let f;const h=e[d],w=r[h];this.closestPointToPoint(w,i),f=w.distanceToSquared(i),f<u&&(u=f,c&&c.copy(i),a&&a.copy(w));const b=this[h];r.closestPointToPoint(b,i),f=b.distanceToSquared(i),f<u&&(u=f,c&&c.copy(b),a&&a.copy(i))}for(let d=0;d<3;d++){const f=e[d],h=e[(d+1)%3];n.set(this[f],this[h]);for(let w=0;w<3;w++){const b=e[w],x=e[(w+1)%3];s.set(r[b],r[x]),As(n,s,i,t);const T=i.distanceToSquared(t);T<u&&(u=T,c&&c.copy(i),a&&a.copy(t))}}return Math.sqrt(u)}})();class Tt{constructor(t,e,n){this.isOrientedBox=!0,this.min=new R,this.max=new R,this.matrix=new ot,this.invMatrix=new ot,this.points=new Array(8).fill().map(()=>new R),this.satAxes=new Array(3).fill().map(()=>new R),this.satBounds=new Array(3).fill().map(()=>new jt),this.alignedSatBounds=new Array(3).fill().map(()=>new jt),this.needsUpdate=!1,t&&this.min.copy(t),e&&this.max.copy(e),n&&this.matrix.copy(n)}set(t,e,n){this.min.copy(t),this.max.copy(e),this.matrix.copy(n),this.needsUpdate=!0}copy(t){this.min.copy(t.min),this.max.copy(t.max),this.matrix.copy(t.matrix),this.needsUpdate=!0}}Tt.prototype.update=(function(){return function(){const t=this.matrix,e=this.min,n=this.max,s=this.points;for(let l=0;l<=1;l++)for(let u=0;u<=1;u++)for(let d=0;d<=1;d++){const f=1*l|2*u|4*d,h=s[f];h.x=l?n.x:e.x,h.y=u?n.y:e.y,h.z=d?n.z:e.z,h.applyMatrix4(t)}const o=this.satBounds,r=this.satAxes,c=s[0];for(let l=0;l<3;l++){const u=r[l],d=o[l],f=1<<l,h=s[f];u.subVectors(c,h),d.setFromPoints(u,s)}const a=this.alignedSatBounds;a[0].setFromPointsField(s,"x"),a[1].setFromPointsField(s,"y"),a[2].setFromPointsField(s,"z"),this.invMatrix.copy(this.matrix).invert(),this.needsUpdate=!1}})();Tt.prototype.intersectsBox=(function(){const i=new jt;return function(e){this.needsUpdate&&this.update();const n=e.min,s=e.max,o=this.satBounds,r=this.satAxes,c=this.alignedSatBounds;if(i.min=n.x,i.max=s.x,c[0].isSeparated(i)||(i.min=n.y,i.max=s.y,c[1].isSeparated(i))||(i.min=n.z,i.max=s.z,c[2].isSeparated(i)))return!1;for(let a=0;a<3;a++){const l=r[a],u=o[a];if(i.setFromBox(l,e),u.isSeparated(i))return!1}return!0}})();Tt.prototype.intersectsTriangle=(function(){const i=new Ct,t=new Array(3),e=new jt,n=new jt,s=new R;return function(r){this.needsUpdate&&this.update(),r.isExtendedTriangle?r.needsUpdate&&r.update():(i.copy(r),i.update(),r=i);const c=this.satBounds,a=this.satAxes;t[0]=r.a,t[1]=r.b,t[2]=r.c;for(let f=0;f<3;f++){const h=c[f],w=a[f];if(e.setFromPoints(w,t),h.isSeparated(e))return!1}const l=r.satBounds,u=r.satAxes,d=this.points;for(let f=0;f<3;f++){const h=l[f],w=u[f];if(e.setFromPoints(w,d),h.isSeparated(e))return!1}for(let f=0;f<3;f++){const h=a[f];for(let w=0;w<4;w++){const b=u[w];if(s.crossVectors(h,b),e.setFromPoints(s,t),n.setFromPoints(s,d),e.isSeparated(n))return!1}}return!0}})();Tt.prototype.closestPointToPoint=(function(){return function(t,e){return this.needsUpdate&&this.update(),e.copy(t).applyMatrix4(this.invMatrix).clamp(this.min,this.max).applyMatrix4(this.matrix),e}})();Tt.prototype.distanceToPoint=(function(){const i=new R;return function(e){return this.closestPointToPoint(e,i),e.distanceTo(i)}})();Tt.prototype.distanceToBox=(function(){const i=["x","y","z"],t=new Array(12).fill().map(()=>new Jt),e=new Array(12).fill().map(()=>new Jt),n=new R,s=new R;return function(r,c=0,a=null,l=null){if(this.needsUpdate&&this.update(),this.intersectsBox(r))return(a||l)&&(r.getCenter(s),this.closestPointToPoint(s,n),r.closestPointToPoint(n,s),a&&a.copy(n),l&&l.copy(s)),0;const u=c*c,d=r.min,f=r.max,h=this.points;let w=1/0;for(let x=0;x<8;x++){const T=h[x];s.copy(T).clamp(d,f);const y=T.distanceToSquared(s);if(y<w&&(w=y,a&&a.copy(T),l&&l.copy(s),y<u))return Math.sqrt(y)}let b=0;for(let x=0;x<3;x++)for(let T=0;T<=1;T++)for(let y=0;y<=1;y++){const g=(x+1)%3,m=(x+2)%3,v=T<<g|y<<m,B=1<<x|T<<g|y<<m,p=h[v],_=h[B];t[b].set(p,_);const M=i[x],z=i[g],A=i[m],P=e[b],I=P.start,V=P.end;I[M]=d[M],I[z]=T?d[z]:f[z],I[A]=y?d[A]:f[z],V[M]=f[M],V[z]=T?d[z]:f[z],V[A]=y?d[A]:f[z],b++}for(let x=0;x<=1;x++)for(let T=0;T<=1;T++)for(let y=0;y<=1;y++){s.x=x?f.x:d.x,s.y=T?f.y:d.y,s.z=y?f.z:d.z,this.closestPointToPoint(s,n);const g=s.distanceToSquared(n);if(g<w&&(w=g,a&&a.copy(n),l&&l.copy(s),g<u))return Math.sqrt(g)}for(let x=0;x<12;x++){const T=t[x];for(let y=0;y<12;y++){const g=e[y];As(T,g,n,s);const m=n.distanceToSquared(s);if(m<w&&(w=m,a&&a.copy(n),l&&l.copy(s),m<u))return Math.sqrt(m)}}return Math.sqrt(w)}})();class _s{constructor(t){this._getNewPrimitive=t,this._primitives=[]}getPrimitive(){const t=this._primitives;return t.length===0?this._getNewPrimitive():t.pop()}releasePrimitive(t){this._primitives.push(t)}}class Ar extends _s{constructor(){super(()=>new Ct)}}const Lt=new Ar,Le=new R,On=new R;function _r(i,t,e={},n=0,s=1/0){const o=n*n,r=s*s;let c=1/0,a=null;if(i.shapecast({boundsTraverseOrder:u=>(Le.copy(t).clamp(u.min,u.max),Le.distanceToSquared(t)),intersectsBounds:(u,d,f)=>f<c&&f<r,intersectsTriangle:(u,d)=>{u.closestPointToPoint(t,Le);const f=t.distanceToSquared(Le);return f<c&&(On.copy(Le),c=f,a=d),f<o}}),c===1/0)return null;const l=Math.sqrt(c);return e.point?e.point.copy(On):e.point=On.clone(),e.distance=l,e.faceIndex=a,e}function U(i,t){return t[i+15]===Ts}function rt(i,t){return t[i+6]}function yt(i,t){return t[i+14]}function G(i){return i+N}function Q(i,t){const e=t[i+6];return i+e*N}function Ms(i,t){return t[i+7]}const on=parseInt(Rn)>=169,Mr=parseInt(Rn)<=161,ue=new R,fe=new R,de=new R,an=new It,cn=new It,ln=new It,Os=new R,Ws=new R,qs=new R,Ce=new R;function Br(i,t,e,n,s,o,r,c){let a;if(o===Pe?a=i.intersectTriangle(n,e,t,!0,s):a=i.intersectTriangle(t,e,n,o!==Oe,s),a===null)return null;const l=i.origin.distanceTo(s);return l<r||l>c?null:{distance:l,point:s.clone()}}function Xs(i,t,e,n,s,o,r,c,a,l,u){ue.fromBufferAttribute(t,o),fe.fromBufferAttribute(t,r),de.fromBufferAttribute(t,c);const d=Br(i,ue,fe,de,Ce,a,l,u);if(d){if(n){an.fromBufferAttribute(n,o),cn.fromBufferAttribute(n,r),ln.fromBufferAttribute(n,c),d.uv=new It;const h=Et.getInterpolation(Ce,ue,fe,de,an,cn,ln,d.uv);on||(d.uv=h)}if(s){an.fromBufferAttribute(s,o),cn.fromBufferAttribute(s,r),ln.fromBufferAttribute(s,c),d.uv1=new It;const h=Et.getInterpolation(Ce,ue,fe,de,an,cn,ln,d.uv1);on||(d.uv1=h),Mr&&(d.uv2=d.uv1)}if(e){Os.fromBufferAttribute(e,o),Ws.fromBufferAttribute(e,r),qs.fromBufferAttribute(e,c),d.normal=new R;const h=Et.getInterpolation(Ce,ue,fe,de,Os,Ws,qs,d.normal);d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1),on||(d.normal=h)}const f={a:o,b:r,c,normal:new R,materialIndex:0};if(Et.getNormal(ue,fe,de,f.normal),d.face=f,d.faceIndex=o,on){const h=new R;Et.getBarycoord(Ce,ue,fe,de,h),d.barycoord=h}}return d}function Ys(i){return i&&i.isMaterial?i.side:i}function Ln(i,t,e,n,s,o,r){const c=n*3;let a=c+0,l=c+1,u=c+2;const{index:d,groups:f}=i;i.index&&(a=d.getX(a),l=d.getX(l),u=d.getX(u));const{position:h,normal:w,uv:b,uv1:x}=i.attributes;if(Array.isArray(t)){const T=n*3;for(let y=0,g=f.length;y<g;y++){const{start:m,count:v,materialIndex:B}=f[y];if(T>=m&&T<m+v){const p=Ys(t[B]),_=Xs(e,h,w,b,x,a,l,u,p,o,r);if(_)if(_.faceIndex=n,_.face.materialIndex=B,s)s.push(_);else return _}}}else{const T=Ys(t),y=Xs(e,h,w,b,x,a,l,u,T,o,r);if(y)if(y.faceIndex=n,y.face.materialIndex=0,s)s.push(y);else return y}return null}function J(i,t,e,n){const s=i.a,o=i.b,r=i.c;let c=t,a=t+1,l=t+2;e&&(c=e.getX(c),a=e.getX(a),l=e.getX(l)),s.x=n.getX(c),s.y=n.getY(c),s.z=n.getZ(c),o.x=n.getX(a),o.y=n.getY(a),o.z=n.getZ(a),r.x=n.getX(l),r.y=n.getY(l),r.z=n.getZ(l)}function Sr(i,t,e,n,s,o,r,c){const{geometry:a,_indirectBuffer:l}=i;for(let u=n,d=n+s;u<d;u++)Ln(a,t,e,u,o,r,c)}function Pr(i,t,e,n,s,o,r){const{geometry:c,_indirectBuffer:a}=i;let l=1/0,u=null;for(let d=n,f=n+s;d<f;d++){let h;h=Ln(c,t,e,d,null,o,r),h&&h.distance<l&&(u=h,l=h.distance)}return u}function Ir(i,t,e,n,s,o,r){const{geometry:c}=e,{index:a}=c,l=c.attributes.position;for(let u=i,d=t+i;u<d;u++){let f;if(f=u,J(r,f*3,a,l),r.needsUpdate=!0,n(r,f,s,o))return!0}return!1}function zr(i,t=null){t&&Array.isArray(t)&&(t=new Set(t));const e=i.geometry,n=e.index?e.index.array:null,s=e.attributes.position;let o,r,c,a,l=0;const u=i._roots;for(let f=0,h=u.length;f<h;f++)o=u[f],r=new Uint32Array(o),c=new Uint16Array(o),a=new Float32Array(o),d(0,l),l+=o.byteLength;function d(f,h,w=!1){const b=f*2;if(U(b,c)){const x=rt(f,r),T=yt(b,c);let y=1/0,g=1/0,m=1/0,v=-1/0,B=-1/0,p=-1/0;for(let _=3*x,S=3*(x+T);_<S;_++){let M=n[_];const z=s.getX(M),A=s.getY(M),P=s.getZ(M);z<y&&(y=z),z>v&&(v=z),A<g&&(g=A),A>B&&(B=A),P<m&&(m=P),P>p&&(p=P)}return a[f+0]!==y||a[f+1]!==g||a[f+2]!==m||a[f+3]!==v||a[f+4]!==B||a[f+5]!==p?(a[f+0]=y,a[f+1]=g,a[f+2]=m,a[f+3]=v,a[f+4]=B,a[f+5]=p,!0):!1}else{const x=G(f),T=Q(f,r);let y=w,g=!1,m=!1;if(t){if(!y){const M=x/N+h/Y,z=T/N+h/Y;g=t.has(M),m=t.has(z),y=!g&&!m}}else g=!0,m=!0;const v=y||g,B=y||m;let p=!1;v&&(p=d(x,h,y));let _=!1;B&&(_=d(T,h,y));const S=p||_;if(S)for(let M=0;M<3;M++){const z=x+M,A=T+M,P=a[z],I=a[z+3],V=a[A],L=a[A+3];a[f+M]=P<V?P:V,a[f+M+3]=I>L?I:L}return S}}}function ae(i,t,e,n,s){let o,r,c,a,l,u;const d=1/e.direction.x,f=1/e.direction.y,h=1/e.direction.z,w=e.origin.x,b=e.origin.y,x=e.origin.z;let T=t[i],y=t[i+3],g=t[i+1],m=t[i+3+1],v=t[i+2],B=t[i+3+2];return d>=0?(o=(T-w)*d,r=(y-w)*d):(o=(y-w)*d,r=(T-w)*d),f>=0?(c=(g-b)*f,a=(m-b)*f):(c=(m-b)*f,a=(g-b)*f),o>a||c>r||((c>o||isNaN(o))&&(o=c),(a<r||isNaN(r))&&(r=a),h>=0?(l=(v-x)*h,u=(B-x)*h):(l=(B-x)*h,u=(v-x)*h),o>u||l>r)?!1:((l>o||o!==o)&&(o=l),(u<r||r!==r)&&(r=u),o<=s&&r>=n)}class Vr{constructor(){this.float32Array=null,this.uint16Array=null,this.uint32Array=null;const t=[];let e=null;this.setBuffer=n=>{e&&t.push(e),e=n,this.float32Array=new Float32Array(n),this.uint16Array=new Uint16Array(n),this.uint32Array=new Uint32Array(n)},this.clearBuffer=()=>{e=null,this.float32Array=null,this.uint16Array=null,this.uint32Array=null,t.length!==0&&this.setBuffer(t.pop())}}}const k=new Vr;function Rr(i,t,e,n,s,o,r,c){const{geometry:a,_indirectBuffer:l}=i;for(let u=n,d=n+s;u<d;u++){let f=l?l[u]:u;Ln(a,t,e,f,o,r,c)}}function $r(i,t,e,n,s,o,r){const{geometry:c,_indirectBuffer:a}=i;let l=1/0,u=null;for(let d=n,f=n+s;d<f;d++){let h;h=Ln(c,t,e,a?a[d]:d,null,o,r),h&&h.distance<l&&(u=h,l=h.distance)}return u}function Lr(i,t,e,n,s,o,r){const{geometry:c}=e,{index:a}=c,l=c.attributes.position;for(let u=i,d=t+i;u<d;u++){let f;if(f=e.resolveTriangleIndex(u),J(r,f*3,a,l),r.needsUpdate=!0,n(r,f,s,o))return!0}return!1}function Cr(i,t,e,n,s,o,r){k.setBuffer(i._roots[t]),as(0,i,e,n,s,o,r),k.clearBuffer()}function as(i,t,e,n,s,o,r){const{float32Array:c,uint16Array:a,uint32Array:l}=k,u=i*2;if(U(u,a)){const f=rt(i,l),h=yt(u,a);Sr(t,e,n,f,h,s,o,r)}else{const f=G(i);ae(f,c,n,o,r)&&as(f,t,e,n,s,o,r);const h=Q(i,l);ae(h,c,n,o,r)&&as(h,t,e,n,s,o,r)}}const Fr=["x","y","z"];function Dr(i,t,e,n,s,o){k.setBuffer(i._roots[t]);const r=cs(0,i,e,n,s,o);return k.clearBuffer(),r}function cs(i,t,e,n,s,o){const{float32Array:r,uint16Array:c,uint32Array:a}=k;let l=i*2;if(U(l,c)){const d=rt(i,a),f=yt(l,c);return Pr(t,e,n,d,f,s,o)}else{const d=Ms(i,a),f=Fr[d],w=n.direction[f]>=0;let b,x;w?(b=G(i),x=Q(i,a)):(b=Q(i,a),x=G(i));const y=ae(b,r,n,s,o)?cs(b,t,e,n,s,o):null;if(y){const v=y.point[f];if(w?v<=r[x+d]:v>=r[x+d+3])return y}const m=ae(x,r,n,s,o)?cs(x,t,e,n,s,o):null;return y&&m?y.distance<=m.distance?y:m:y||m||null}}function O(i,t,e){return e.min.x=t[i],e.min.y=t[i+1],e.min.z=t[i+2],e.max.x=t[i+3],e.max.y=t[i+4],e.max.z=t[i+5],e}function ls(i){let t=-1,e=-1/0;for(let n=0;n<3;n++){const s=i[n+3]-i[n];s>e&&(e=s,t=n)}return t}function Zs(i,t){t.set(i)}function Ks(i,t,e){let n,s;for(let o=0;o<3;o++){const r=o+3;n=i[o],s=t[o],e[o]=n<s?n:s,n=i[r],s=t[r],e[r]=n>s?n:s}}function un(i,t,e){for(let n=0;n<3;n++){const s=t[i+2*n],o=t[i+2*n+1],r=s-o,c=s+o;r<e[n]&&(e[n]=r),c>e[n+3]&&(e[n+3]=c)}}function Fe(i){const t=i[3]-i[0],e=i[4]-i[1],n=i[5]-i[2];return 2*(t*e+e*n+n*t)}function Bs(i){return i.index?i.index.count:i.attributes.position.count}function Cn(i){return Bs(i)/3}function Nr(i,t=ArrayBuffer){return i>65535?new Uint32Array(new t(4*i)):new Uint16Array(new t(2*i))}function Er(i,t){if(!i.index){const e=i.attributes.position.count,n=t.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,s=Nr(e,n);i.setIndex(new We(s,1));for(let o=0;o<e;o++)s[o]=o}}function Hr(i,t,e){const n=Bs(i)/e,s=t||i.drawRange,o=s.start/e,r=(s.start+s.count)/e,c=Math.max(0,o),a=Math.min(n,r)-c;return{offset:Math.floor(c),count:Math.floor(a)}}function Ur(i,t){return i.groups.map(e=>({offset:e.start/t,count:e.count/t}))}function Gs(i,t,e){const n=Hr(i,t,e),s=Ur(i,e);if(!s.length)return[n];const o=[],r=n.offset,c=n.offset+n.count,a=Bs(i)/e,l=[];for(const f of s){const{offset:h,count:w}=f,b=h,x=isFinite(w)?w:a-h,T=h+x;b<c&&T>r&&(l.push({pos:Math.max(r,b),isStart:!0}),l.push({pos:Math.min(c,T),isStart:!1}))}l.sort((f,h)=>f.pos!==h.pos?f.pos-h.pos:f.type==="end"?-1:1);let u=0,d=null;for(const f of l){const h=f.pos;u!==0&&h!==d&&o.push({offset:d,count:h-d}),u+=f.isStart?1:-1,d=h}return o}const fn=new Ft,xe=new Ct,ve=new Ct,De=new ot,Qs=new Tt,dn=new Tt;function kr(i,t,e,n){k.setBuffer(i._roots[t]);const s=us(0,i,e,n);return k.clearBuffer(),s}function us(i,t,e,n,s=null){const{float32Array:o,uint16Array:r,uint32Array:c}=k;let a=i*2;if(s===null&&(e.boundingBox||e.computeBoundingBox(),Qs.set(e.boundingBox.min,e.boundingBox.max,n),s=Qs),U(a,r)){const u=t.geometry,d=u.index,f=u.attributes.position,h=e.index,w=e.attributes.position,b=rt(i,c),x=yt(a,r);if(De.copy(n).invert(),e.boundsTree)return O(i,o,dn),dn.matrix.copy(De),dn.needsUpdate=!0,e.boundsTree.shapecast({intersectsBounds:y=>dn.intersectsBox(y),intersectsTriangle:y=>{y.a.applyMatrix4(n),y.b.applyMatrix4(n),y.c.applyMatrix4(n),y.needsUpdate=!0;for(let g=b*3,m=(x+b)*3;g<m;g+=3)if(J(ve,g,d,f),ve.needsUpdate=!0,y.intersectsTriangle(ve))return!0;return!1}});{const T=Cn(e);for(let y=b*3,g=(x+b)*3;y<g;y+=3){J(xe,y,d,f),xe.a.applyMatrix4(De),xe.b.applyMatrix4(De),xe.c.applyMatrix4(De),xe.needsUpdate=!0;for(let m=0,v=T*3;m<v;m+=3)if(J(ve,m,h,w),ve.needsUpdate=!0,xe.intersectsTriangle(ve))return!0}}}else{const u=G(i),d=Q(i,c);return O(u,o,fn),!!(s.intersectsBox(fn)&&us(u,t,e,n,s)||(O(d,o,fn),s.intersectsBox(fn)&&us(d,t,e,n,s)))}}const hn=new ot,Wn=new Tt,Ne=new Tt,Or=new R,Wr=new R,qr=new R,Xr=new R;function Yr(i,t,e,n={},s={},o=0,r=1/0){t.boundingBox||t.computeBoundingBox(),Wn.set(t.boundingBox.min,t.boundingBox.max,e),Wn.needsUpdate=!0;const c=i.geometry,a=c.attributes.position,l=c.index,u=t.attributes.position,d=t.index,f=Lt.getPrimitive(),h=Lt.getPrimitive();let w=Or,b=Wr,x=null,T=null;s&&(x=qr,T=Xr);let y=1/0,g=null,m=null;return hn.copy(e).invert(),Ne.matrix.copy(hn),i.shapecast({boundsTraverseOrder:v=>Wn.distanceToBox(v),intersectsBounds:(v,B,p)=>p<y&&p<r?(B&&(Ne.min.copy(v.min),Ne.max.copy(v.max),Ne.needsUpdate=!0),!0):!1,intersectsRange:(v,B)=>{if(t.boundsTree)return t.boundsTree.shapecast({boundsTraverseOrder:_=>Ne.distanceToBox(_),intersectsBounds:(_,S,M)=>M<y&&M<r,intersectsRange:(_,S)=>{for(let M=_,z=_+S;M<z;M++){J(h,3*M,d,u),h.a.applyMatrix4(e),h.b.applyMatrix4(e),h.c.applyMatrix4(e),h.needsUpdate=!0;for(let A=v,P=v+B;A<P;A++){J(f,3*A,l,a),f.needsUpdate=!0;const I=f.distanceToTriangle(h,w,x);if(I<y&&(b.copy(w),T&&T.copy(x),y=I,g=A,m=M),I<o)return!0}}}});{const p=Cn(t);for(let _=0,S=p;_<S;_++){J(h,3*_,d,u),h.a.applyMatrix4(e),h.b.applyMatrix4(e),h.c.applyMatrix4(e),h.needsUpdate=!0;for(let M=v,z=v+B;M<z;M++){J(f,3*M,l,a),f.needsUpdate=!0;const A=f.distanceToTriangle(h,w,x);if(A<y&&(b.copy(w),T&&T.copy(x),y=A,g=M,m=_),A<o)return!0}}}}}),Lt.releasePrimitive(f),Lt.releasePrimitive(h),y===1/0?null:(n.point?n.point.copy(b):n.point=b.clone(),n.distance=y,n.faceIndex=g,s&&(s.point?s.point.copy(T):s.point=T.clone(),s.point.applyMatrix4(hn),b.applyMatrix4(hn),s.distance=b.sub(s.point).length(),s.faceIndex=m),n)}function Zr(i,t=null){t&&Array.isArray(t)&&(t=new Set(t));const e=i.geometry,n=e.index?e.index.array:null,s=e.attributes.position;let o,r,c,a,l=0;const u=i._roots;for(let f=0,h=u.length;f<h;f++)o=u[f],r=new Uint32Array(o),c=new Uint16Array(o),a=new Float32Array(o),d(0,l),l+=o.byteLength;function d(f,h,w=!1){const b=f*2;if(U(b,c)){const x=rt(f,r),T=yt(b,c);let y=1/0,g=1/0,m=1/0,v=-1/0,B=-1/0,p=-1/0;for(let _=x,S=x+T;_<S;_++){const M=3*i.resolveTriangleIndex(_);for(let z=0;z<3;z++){let A=M+z;A=n?n[A]:A;const P=s.getX(A),I=s.getY(A),V=s.getZ(A);P<y&&(y=P),P>v&&(v=P),I<g&&(g=I),I>B&&(B=I),V<m&&(m=V),V>p&&(p=V)}}return a[f+0]!==y||a[f+1]!==g||a[f+2]!==m||a[f+3]!==v||a[f+4]!==B||a[f+5]!==p?(a[f+0]=y,a[f+1]=g,a[f+2]=m,a[f+3]=v,a[f+4]=B,a[f+5]=p,!0):!1}else{const x=G(f),T=Q(f,r);let y=w,g=!1,m=!1;if(t){if(!y){const M=x/N+h/Y,z=T/N+h/Y;g=t.has(M),m=t.has(z),y=!g&&!m}}else g=!0,m=!0;const v=y||g,B=y||m;let p=!1;v&&(p=d(x,h,y));let _=!1;B&&(_=d(T,h,y));const S=p||_;if(S)for(let M=0;M<3;M++){const z=x+M,A=T+M,P=a[z],I=a[z+3],V=a[A],L=a[A+3];a[f+M]=P<V?P:V,a[f+M+3]=I>L?I:L}return S}}}function Kr(i,t,e,n,s,o,r){k.setBuffer(i._roots[t]),fs(0,i,e,n,s,o,r),k.clearBuffer()}function fs(i,t,e,n,s,o,r){const{float32Array:c,uint16Array:a,uint32Array:l}=k,u=i*2;if(U(u,a)){const f=rt(i,l),h=yt(u,a);Rr(t,e,n,f,h,s,o,r)}else{const f=G(i);ae(f,c,n,o,r)&&fs(f,t,e,n,s,o,r);const h=Q(i,l);ae(h,c,n,o,r)&&fs(h,t,e,n,s,o,r)}}const Gr=["x","y","z"];function Qr(i,t,e,n,s,o){k.setBuffer(i._roots[t]);const r=ds(0,i,e,n,s,o);return k.clearBuffer(),r}function ds(i,t,e,n,s,o){const{float32Array:r,uint16Array:c,uint32Array:a}=k;let l=i*2;if(U(l,c)){const d=rt(i,a),f=yt(l,c);return $r(t,e,n,d,f,s,o)}else{const d=Ms(i,a),f=Gr[d],w=n.direction[f]>=0;let b,x;w?(b=G(i),x=Q(i,a)):(b=Q(i,a),x=G(i));const y=ae(b,r,n,s,o)?ds(b,t,e,n,s,o):null;if(y){const v=y.point[f];if(w?v<=r[x+d]:v>=r[x+d+3])return y}const m=ae(x,r,n,s,o)?ds(x,t,e,n,s,o):null;return y&&m?y.distance<=m.distance?y:m:y||m||null}}const pn=new Ft,we=new Ct,be=new Ct,Ee=new ot,Js=new Tt,mn=new Tt;function Jr(i,t,e,n){k.setBuffer(i._roots[t]);const s=hs(0,i,e,n);return k.clearBuffer(),s}function hs(i,t,e,n,s=null){const{float32Array:o,uint16Array:r,uint32Array:c}=k;let a=i*2;if(s===null&&(e.boundingBox||e.computeBoundingBox(),Js.set(e.boundingBox.min,e.boundingBox.max,n),s=Js),U(a,r)){const u=t.geometry,d=u.index,f=u.attributes.position,h=e.index,w=e.attributes.position,b=rt(i,c),x=yt(a,r);if(Ee.copy(n).invert(),e.boundsTree)return O(i,o,mn),mn.matrix.copy(Ee),mn.needsUpdate=!0,e.boundsTree.shapecast({intersectsBounds:y=>mn.intersectsBox(y),intersectsTriangle:y=>{y.a.applyMatrix4(n),y.b.applyMatrix4(n),y.c.applyMatrix4(n),y.needsUpdate=!0;for(let g=b,m=x+b;g<m;g++)if(J(be,3*t.resolveTriangleIndex(g),d,f),be.needsUpdate=!0,y.intersectsTriangle(be))return!0;return!1}});{const T=Cn(e);for(let y=b,g=x+b;y<g;y++){const m=t.resolveTriangleIndex(y);J(we,3*m,d,f),we.a.applyMatrix4(Ee),we.b.applyMatrix4(Ee),we.c.applyMatrix4(Ee),we.needsUpdate=!0;for(let v=0,B=T*3;v<B;v+=3)if(J(be,v,h,w),be.needsUpdate=!0,we.intersectsTriangle(be))return!0}}}else{const u=G(i),d=Q(i,c);return O(u,o,pn),!!(s.intersectsBox(pn)&&hs(u,t,e,n,s)||(O(d,o,pn),s.intersectsBox(pn)&&hs(d,t,e,n,s)))}}const yn=new ot,qn=new Tt,He=new Tt,jr=new R,to=new R,eo=new R,no=new R;function so(i,t,e,n={},s={},o=0,r=1/0){t.boundingBox||t.computeBoundingBox(),qn.set(t.boundingBox.min,t.boundingBox.max,e),qn.needsUpdate=!0;const c=i.geometry,a=c.attributes.position,l=c.index,u=t.attributes.position,d=t.index,f=Lt.getPrimitive(),h=Lt.getPrimitive();let w=jr,b=to,x=null,T=null;s&&(x=eo,T=no);let y=1/0,g=null,m=null;return yn.copy(e).invert(),He.matrix.copy(yn),i.shapecast({boundsTraverseOrder:v=>qn.distanceToBox(v),intersectsBounds:(v,B,p)=>p<y&&p<r?(B&&(He.min.copy(v.min),He.max.copy(v.max),He.needsUpdate=!0),!0):!1,intersectsRange:(v,B)=>{if(t.boundsTree){const p=t.boundsTree;return p.shapecast({boundsTraverseOrder:_=>He.distanceToBox(_),intersectsBounds:(_,S,M)=>M<y&&M<r,intersectsRange:(_,S)=>{for(let M=_,z=_+S;M<z;M++){const A=p.resolveTriangleIndex(M);J(h,3*A,d,u),h.a.applyMatrix4(e),h.b.applyMatrix4(e),h.c.applyMatrix4(e),h.needsUpdate=!0;for(let P=v,I=v+B;P<I;P++){const V=i.resolveTriangleIndex(P);J(f,3*V,l,a),f.needsUpdate=!0;const L=f.distanceToTriangle(h,w,x);if(L<y&&(b.copy(w),T&&T.copy(x),y=L,g=P,m=M),L<o)return!0}}}})}else{const p=Cn(t);for(let _=0,S=p;_<S;_++){J(h,3*_,d,u),h.a.applyMatrix4(e),h.b.applyMatrix4(e),h.c.applyMatrix4(e),h.needsUpdate=!0;for(let M=v,z=v+B;M<z;M++){const A=i.resolveTriangleIndex(M);J(f,3*A,l,a),f.needsUpdate=!0;const P=f.distanceToTriangle(h,w,x);if(P<y&&(b.copy(w),T&&T.copy(x),y=P,g=M,m=_),P<o)return!0}}}}}),Lt.releasePrimitive(f),Lt.releasePrimitive(h),y===1/0?null:(n.point?n.point.copy(b):n.point=b.clone(),n.distance=y,n.faceIndex=g,s&&(s.point?s.point.copy(T):s.point=T.clone(),s.point.applyMatrix4(yn),b.applyMatrix4(yn),s.distance=b.sub(s.point).length(),s.faceIndex=m),n)}function js(i,t,e){return i===null?null:(i.point.applyMatrix4(t.matrixWorld),i.distance=i.point.distanceTo(e.ray.origin),i.object=t,i)}function io(){return typeof SharedArrayBuffer<"u"}function Xn(i,t,e,n,s){let o=1/0,r=1/0,c=1/0,a=-1/0,l=-1/0,u=-1/0,d=1/0,f=1/0,h=1/0,w=-1/0,b=-1/0,x=-1/0;const T=i.offset||0;for(let y=(t-T)*6,g=(t+e-T)*6;y<g;y+=6){const m=i[y+0],v=i[y+1],B=m-v,p=m+v;B<o&&(o=B),p>a&&(a=p),m<d&&(d=m),m>w&&(w=m);const _=i[y+2],S=i[y+3],M=_-S,z=_+S;M<r&&(r=M),z>l&&(l=z),_<f&&(f=_),_>b&&(b=_);const A=i[y+4],P=i[y+5],I=A-P,V=A+P;I<c&&(c=I),V>u&&(u=V),A<h&&(h=A),A>x&&(x=A)}n[0]=o,n[1]=r,n[2]=c,n[3]=a,n[4]=l,n[5]=u,s[0]=d,s[1]=f,s[2]=h,s[3]=w,s[4]=b,s[5]=x}const Zt=32,ro=(i,t)=>i.candidate-t.candidate,ne=new Array(Zt).fill().map(()=>({count:0,bounds:new Float32Array(6),rightCacheBounds:new Float32Array(6),leftCacheBounds:new Float32Array(6),candidate:0})),gn=new Float32Array(6);function oo(i,t,e,n,s,o){let r=-1,c=0;if(o===Bi)r=ls(t),r!==-1&&(c=(t[r]+t[r+3])/2);else if(o===vr)r=ls(i),r!==-1&&(c=ao(e,n,s,r));else if(o===Si){const a=Fe(i);let l=kn*s;const u=e.offset||0,d=(n-u)*6,f=(n+s-u)*6;for(let h=0;h<3;h++){const w=t[h],T=(t[h+3]-w)/Zt;if(s<Zt/4){const y=[...ne];y.length=s;let g=0;for(let v=d;v<f;v+=6,g++){const B=y[g];B.candidate=e[v+2*h],B.count=0;const{bounds:p,leftCacheBounds:_,rightCacheBounds:S}=B;for(let M=0;M<3;M++)S[M]=1/0,S[M+3]=-1/0,_[M]=1/0,_[M+3]=-1/0,p[M]=1/0,p[M+3]=-1/0;un(v,e,p)}y.sort(ro);let m=s;for(let v=0;v<m;v++){const B=y[v];for(;v+1<m&&y[v+1].candidate===B.candidate;)y.splice(v+1,1),m--}for(let v=d;v<f;v+=6){const B=e[v+2*h];for(let p=0;p<m;p++){const _=y[p];B>=_.candidate?un(v,e,_.rightCacheBounds):(un(v,e,_.leftCacheBounds),_.count++)}}for(let v=0;v<m;v++){const B=y[v],p=B.count,_=s-B.count,S=B.leftCacheBounds,M=B.rightCacheBounds;let z=0;p!==0&&(z=Fe(S)/a);let A=0;_!==0&&(A=Fe(M)/a);const P=Us+kn*(z*p+A*_);P<l&&(r=h,l=P,c=B.candidate)}}else{for(let m=0;m<Zt;m++){const v=ne[m];v.count=0,v.candidate=w+T+m*T;const B=v.bounds;for(let p=0;p<3;p++)B[p]=1/0,B[p+3]=-1/0}for(let m=d;m<f;m+=6){let p=~~((e[m+2*h]-w)/T);p>=Zt&&(p=Zt-1);const _=ne[p];_.count++,un(m,e,_.bounds)}const y=ne[Zt-1];Zs(y.bounds,y.rightCacheBounds);for(let m=Zt-2;m>=0;m--){const v=ne[m],B=ne[m+1];Ks(v.bounds,B.rightCacheBounds,v.rightCacheBounds)}let g=0;for(let m=0;m<Zt-1;m++){const v=ne[m],B=v.count,p=v.bounds,S=ne[m+1].rightCacheBounds;B!==0&&(g===0?Zs(p,gn):Ks(p,gn,gn)),g+=B;let M=0,z=0;g!==0&&(M=Fe(gn)/a);const A=s-g;A!==0&&(z=Fe(S)/a);const P=Us+kn*(M*g+z*A);P<l&&(r=h,l=P,c=v.candidate)}}}}else console.warn(`BVH: Invalid build strategy value ${o} used.`);return{axis:r,pos:c}}function ao(i,t,e,n){let s=0;const o=i.offset;for(let r=t,c=t+e;r<c;r++)s+=i[(r-o)*6+n*2];return s/e}class Yn{constructor(){this.boundingData=new Float32Array(6)}}function co(i,t,e,n,s,o){let r=n,c=n+s-1;const a=o.pos,l=o.axis*2,u=e.offset||0;for(;;){for(;r<=c&&e[(r-u)*6+l]<a;)r++;for(;r<=c&&e[(c-u)*6+l]>=a;)c--;if(r<c){for(let d=0;d<t;d++){let f=i[r*t+d];i[r*t+d]=i[c*t+d],i[c*t+d]=f}for(let d=0;d<6;d++){const f=r-u,h=c-u,w=e[f*6+d];e[f*6+d]=e[h*6+d],e[h*6+d]=w}r++,c--}else return r}}let Ii,Pn,ps,zi;const lo=Math.pow(2,32);function ms(i){return"count"in i?1:1+ms(i.left)+ms(i.right)}function uo(i,t,e){return Ii=new Float32Array(e),Pn=new Uint32Array(e),ps=new Uint16Array(e),zi=new Uint8Array(e),ys(i,t)}function ys(i,t){const e=i/4,n=i/2,s="count"in t,o=t.boundingData;for(let r=0;r<6;r++)Ii[e+r]=o[r];if(s)return t.buffer?(zi.set(new Uint8Array(t.buffer),i),i+t.buffer.byteLength):(Pn[e+6]=t.offset,ps[n+14]=t.count,ps[n+15]=Ts,i+Y);{const{left:r,right:c,splitAxis:a}=t,l=i+Y;let u=ys(l,r);const d=i/Y,h=u/Y-d;if(h>lo)throw new Error("MeshBVH: Cannot store relative child node offset greater than 32 bits.");return Pn[e+6]=h,Pn[e+7]=a,ys(u,c)}}function fo(i,t,e,n,s,o){const{maxDepth:r,verbose:c,targetLeafSize:a,_strictLeafSize:l=1/0,strategy:u,onProgress:d}=s,f=i.primitiveBuffer,h=i.primitiveBufferStride,w=new Float32Array(6);let b=!1;const x=new Yn;return Xn(t,e,n,x.boundingData,w),y(x,e,n,w),x;function T(g){d&&d((g-o.offset)/o.count)}function y(g,m,v,B=null,p=0){!b&&p>=r&&(b=!0,c&&console.warn(`BVH: Max depth of ${r} reached when generating BVH. Consider increasing maxDepth.`));const _=v>l;if(v<=a&&!_||p>=r)return T(m+v),g.offset=m,g.count=v,g;const S=oo(g.boundingData,B,t,m,v,u);let M=S.axis===-1?-1:co(f,h,t,m,v,S);if(S.axis===-1||M===m||M===m+v){if(!_)return T(m+v),g.offset=m,g.count=v,g;S.axis=Math.max(0,ls(g.boundingData)),M=m+Math.max(1,Math.floor(v/2))}g.splitAxis=S.axis;const z=new Yn,A=m,P=M-m;g.left=z,Xn(t,A,P,z.boundingData,w),y(z,A,P,w,p+1);const I=new Yn,V=M,L=v-P;return g.right=I,Xn(t,V,L,I.boundingData,w),y(I,V,L,w,p+1),g}}function ho(i,t){const e=t.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,n=i.getRootRanges(t.range),s=n[0],o=n[n.length-1],r={offset:s.offset,count:o.offset+o.count-s.offset},c=new Float32Array(6*r.count);c.offset=r.offset,i.computePrimitiveBounds(r.offset,r.count,c),i._roots=n.map(a=>{const l=fo(i,c,a.offset,a.count,t,r),u=ms(l),d=new e(Y*u);return uo(0,l,d),d})}let oe,Ve;const Te=[],xn=new _s(()=>new Ft);function po(i,t,e,n,s,o){oe=xn.getPrimitive(),Ve=xn.getPrimitive(),Te.push(oe,Ve),k.setBuffer(i._roots[t]);const r=gs(0,i.geometry,e,n,s,o);k.clearBuffer(),xn.releasePrimitive(oe),xn.releasePrimitive(Ve),Te.pop(),Te.pop();const c=Te.length;return c>0&&(Ve=Te[c-1],oe=Te[c-2]),r}function gs(i,t,e,n,s=null,o=0,r=0){const{float32Array:c,uint16Array:a,uint32Array:l}=k;let u=i*2;if(U(u,a)){const f=rt(i,l),h=yt(u,a);return O(i,c,oe),n(f,h,!1,r,o+i/N,oe)}else{let M=function(A){const{uint16Array:P,uint32Array:I}=k;let V=A*2;for(;!U(V,P);)A=G(A),V=A*2;return rt(A,I)},z=function(A){const{uint16Array:P,uint32Array:I}=k;let V=A*2;for(;!U(V,P);)A=Q(A,I),V=A*2;return rt(A,I)+yt(V,P)};const f=G(i),h=Q(i,l);let w=f,b=h,x,T,y,g;if(s&&(y=oe,g=Ve,O(w,c,y),O(b,c,g),x=s(y),T=s(g),T<x)){w=h,b=f;const A=x;x=T,T=A,y=g}y||(y=oe,O(w,c,y));const m=U(w*2,a),v=e(y,m,x,r+1,o+w/N);let B;if(v===Hs){const A=M(w),I=z(w)-A;B=n(A,I,!0,r+1,o+w/N,y)}else B=v&&gs(w,t,e,n,s,o,r+1);if(B)return!0;g=Ve,O(b,c,g);const p=U(b*2,a),_=e(g,p,T,r+1,o+b/N);let S;if(_===Hs){const A=M(b),I=z(b)-A;S=n(A,I,!0,r+1,o+b/N,g)}else S=_&&gs(b,t,e,n,s,o,r+1);return!!S}}const qe=new k.constructor,zn=new k.constructor,ie=new _s(()=>new Ft),Ae=new Ft,_e=new Ft,Zn=new Ft,Kn=new Ft;let Gn=!1;function mo(i,t,e,n){if(Gn)throw new Error("MeshBVH: Recursive calls to bvhcast not supported.");Gn=!0;const s=i._roots,o=t._roots;let r,c=0,a=0;const l=new ot().copy(e).invert();for(let u=0,d=s.length;u<d;u++){qe.setBuffer(s[u]),a=0;const f=ie.getPrimitive();O(0,qe.float32Array,f),f.applyMatrix4(l);for(let h=0,w=o.length;h<w&&(zn.setBuffer(o[h]),r=Nt(0,0,e,l,n,c,a,0,0,f),zn.clearBuffer(),a+=o[h].byteLength/Y,!r);h++);if(ie.releasePrimitive(f),qe.clearBuffer(),c+=s[u].byteLength/Y,r)break}return Gn=!1,r}function Nt(i,t,e,n,s,o=0,r=0,c=0,a=0,l=null,u=!1){let d,f;u?(d=zn,f=qe):(d=qe,f=zn);const h=d.float32Array,w=d.uint32Array,b=d.uint16Array,x=f.float32Array,T=f.uint32Array,y=f.uint16Array,g=i*2,m=t*2,v=U(g,b),B=U(m,y);let p=!1;if(B&&v)u?p=s(rt(t,T),yt(t*2,y),rt(i,w),yt(i*2,b),a,r+t/N,c,o+i/N):p=s(rt(i,w),yt(i*2,b),rt(t,T),yt(t*2,y),c,o+i/N,a,r+t/N);else if(B){const _=ie.getPrimitive();O(t,x,_),_.applyMatrix4(e);const S=G(i),M=Q(i,w);O(S,h,Ae),O(M,h,_e);const z=_.intersectsBox(Ae),A=_.intersectsBox(_e);p=z&&Nt(t,S,n,e,s,r,o,a,c+1,_,!u)||A&&Nt(t,M,n,e,s,r,o,a,c+1,_,!u),ie.releasePrimitive(_)}else{const _=G(t),S=Q(t,T);O(_,x,Zn),O(S,x,Kn);const M=l.intersectsBox(Zn),z=l.intersectsBox(Kn);if(M&&z)p=Nt(i,_,e,n,s,o,r,c,a+1,l,u)||Nt(i,S,e,n,s,o,r,c,a+1,l,u);else if(M)if(v)p=Nt(i,_,e,n,s,o,r,c,a+1,l,u);else{const A=ie.getPrimitive();A.copy(Zn).applyMatrix4(e);const P=G(i),I=Q(i,w);O(P,h,Ae),O(I,h,_e);const V=A.intersectsBox(Ae),L=A.intersectsBox(_e);p=V&&Nt(_,P,n,e,s,r,o,a,c+1,A,!u)||L&&Nt(_,I,n,e,s,r,o,a,c+1,A,!u),ie.releasePrimitive(A)}else if(z)if(v)p=Nt(i,S,e,n,s,o,r,c,a+1,l,u);else{const A=ie.getPrimitive();A.copy(Kn).applyMatrix4(e);const P=G(i),I=Q(i,w);O(P,h,Ae),O(I,h,_e);const V=A.intersectsBox(Ae),L=A.intersectsBox(_e);p=V&&Nt(S,P,n,e,s,r,o,a,c+1,A,!u)||L&&Nt(S,I,n,e,s,r,o,a,c+1,A,!u),ie.releasePrimitive(A)}}return p}const re=new class{constructor(){let i=null,t=null,e=null,n=!1;this.root=null,this.buffer=null,this.uint32Array=null,this.uint16Array=null,this.setBVH=(o,r)=>{if(n)throw new Error("BVHTraversalHelper: cannot call setBVH during an active traversal.");this.root=r,this.buffer=i=o._roots[r],this.uint16Array=e=new Uint16Array(i),this.uint32Array=t=new Uint32Array(i)},this.reset=()=>{this.root=null,this.buffer=i=null,this.uint16Array=e=null,this.uint32Array=t=null},this.getRangeStart=o=>{let r=o*2;for(;!U(r,e);)o=G(o),r=o*2;return rt(o,t)},this.getRangeEnd=o=>{let r=o*2;for(;!U(r,e);)o=Q(o,t),r=o*2;return rt(o,t)+yt(r,e)};const s=(o,r,c)=>{const a=r*2,l=U(a,e);if(!o(c,l,r)&&!l){const d=G(r),f=Q(r,t);s(o,d,c+1),s(o,f,c+1)}};this.traverseBuffer=o=>{if(n)throw new Error("BVHTraversalHelper: cannot start a traversal during an active traversal.");n=!0;try{s(o,0,0)}finally{n=!1}},this.traverse=o=>{this.traverseBuffer((r,c,a)=>{if(c){const l=a*2,u=t[a+6],d=e[l+14];return o(r,c,new Float32Array(i,a*4,6),u,d)}else{const l=Ms(a,t);return o(r,c,new Float32Array(i,a*4,6),l)}})}}},ti=new Ft,Me=new Float32Array(6);class Vi{constructor(){this._roots=null,this.primitiveBuffer=null,this.primitiveBufferStride=null}init(t){t={...Pi,...t},"maxLeafSize"in t&&(console.warn('BVH: "maxLeafSize" option has been deprecated. Use "targetLeafSize", instead.'),t={...t,targetLeafSize:t.maxLeafSize}),ho(this,t)}getRootRanges(){throw new Error("BVH: getRootRanges() not implemented")}writePrimitiveBounds(){throw new Error("BVH: writePrimitiveBounds() not implemented")}writePrimitiveRangeBounds(t,e,n,s){let o=1/0,r=1/0,c=1/0,a=-1/0,l=-1/0,u=-1/0;for(let d=t,f=t+e;d<f;d++){this.writePrimitiveBounds(d,Me,0);const[h,w,b,x,T,y]=Me;h<o&&(o=h),x>a&&(a=x),w<r&&(r=w),T>l&&(l=T),b<c&&(c=b),y>u&&(u=y)}return n[s+0]=o,n[s+1]=r,n[s+2]=c,n[s+3]=a,n[s+4]=l,n[s+5]=u,n}computePrimitiveBounds(t,e,n){const s=n.offset||0;for(let o=t,r=t+e;o<r;o++){this.writePrimitiveBounds(o,Me,0);const[c,a,l,u,d,f]=Me,h=(c+u)/2,w=(a+d)/2,b=(l+f)/2,x=(u-c)/2,T=(d-a)/2,y=(f-l)/2,g=(o-s)*6;n[g+0]=h,n[g+1]=x+(Math.abs(h)+x)*Sn,n[g+2]=w,n[g+3]=T+(Math.abs(w)+T)*Sn,n[g+4]=b,n[g+5]=y+(Math.abs(b)+y)*Sn}return n}shiftPrimitiveOffsets(t){const e=this._indirectBuffer;if(e)for(let n=0,s=e.length;n<s;n++)e[n]+=t;else{const n=this._roots;for(let s=0;s<n.length;s++){const o=n[s],r=new Uint32Array(o),c=new Uint16Array(o),a=o.byteLength/Y;for(let l=0;l<a;l++){const u=N*l,d=2*u;U(d,c)&&(r[u+6]+=t)}}}}traverse(t,e=0){re.setBVH(this,e),re.traverse(t),re.reset()}refit(){const t=this._roots;for(let e=0,n=t.length;e<n;e++){const s=t[e],o=new Uint32Array(s),r=new Uint16Array(s),c=new Float32Array(s),a=s.byteLength/Y;for(let l=a-1;l>=0;l--){const u=l*N,d=u*2;if(U(d,r)){const h=rt(u,o),w=yt(d,r);this.writePrimitiveRangeBounds(h,w,Me,0),c.set(Me,u)}else{const h=G(u),w=Q(u,o);for(let b=0;b<3;b++){const x=c[h+b],T=c[h+b+3],y=c[w+b],g=c[w+b+3];c[u+b]=x<y?x:y,c[u+b+3]=T>g?T:g}}}}}getBoundingBox(t){return t.makeEmpty(),this._roots.forEach(n=>{O(0,new Float32Array(n),ti),t.union(ti)}),t}shapecast(t){let{boundsTraverseOrder:e,intersectsBounds:n,intersectsRange:s,intersectsPrimitive:o,scratchPrimitive:r,iterate:c}=t;if(s&&o){const d=s;s=(f,h,w,b,x)=>d(f,h,w,b,x)?!0:c(f,h,this,o,w,b,r)}else s||(o?s=(d,f,h,w)=>c(d,f,this,o,h,w,r):s=(d,f,h)=>h);let a=!1,l=0;const u=this._roots;for(let d=0,f=u.length;d<f;d++){const h=u[d];if(a=po(this,d,n,s,e,l),a)break;l+=h.byteLength/Y}return a}bvhcast(t,e,n){let{intersectsRanges:s}=n;return mo(this,t,e,s)}}function yo(i,t){const e=i[i.length-1],n=e.offset+e.count>2**16,s=i.reduce((l,u)=>l+u.count,0),o=n?4:2,r=t?new SharedArrayBuffer(s*o):new ArrayBuffer(s*o),c=n?new Uint32Array(r):new Uint16Array(r);let a=0;for(let l=0;l<i.length;l++){const{offset:u,count:d}=i[l];for(let f=0;f<d;f++)c[a+f]=u+f;a+=d}return c}class Vn extends Vi{get indirect(){return!!this._indirectBuffer}get primitiveStride(){return null}get primitiveBufferStride(){return this.indirect?1:this.primitiveStride}set primitiveBufferStride(t){}get primitiveBuffer(){return this.indirect?this._indirectBuffer:this.geometry.index.array}set primitiveBuffer(t){}constructor(t,e={}){if(t.isBufferGeometry){if(t.index&&t.index.isInterleavedBufferAttribute)throw new Error("BVH: InterleavedBufferAttribute is not supported for the index attribute.")}else throw new Error("BVH: Only BufferGeometries are supported.");if(e.useSharedArrayBuffer&&!io())throw new Error("BVH: SharedArrayBuffer is not available.");super(),this.geometry=t,this.resolvePrimitiveIndex=e.indirect?n=>this._indirectBuffer[n]:n=>n,this.primitiveBuffer=null,this.primitiveBufferStride=null,this._indirectBuffer=null,e={...Pi,...e},e[Ze]||this.init(e)}init(t){const{geometry:e,primitiveStride:n}=this;if(t.indirect){const s=Gs(e,t.range,n),o=yo(s,t.useSharedArrayBuffer);this._indirectBuffer=o}else Er(e,t);super.init(t),!e.boundingBox&&t.setBoundingBox&&(e.boundingBox=this.getBoundingBox(new Ft))}getRootRanges(t){return this.indirect?[{offset:0,count:this._indirectBuffer.length}]:Gs(this.geometry,t,this.primitiveStride)}raycastObject3D(){throw new Error("BVH: raycastObject3D() not implemented")}}const vn=new Tt,wn=new Ai,ei=new R,ni=new ot,si=new R,Qn=["getX","getY","getZ"];class Ke extends Vn{static serialize(t,e={}){e={cloneBuffers:!0,...e};const n=t.geometry,s=t._roots,o=t._indirectBuffer,r=n.getIndex(),c={version:1,roots:null,index:null,indirectBuffer:null};return e.cloneBuffers?(c.roots=s.map(a=>a.slice()),c.index=r?r.array.slice():null,c.indirectBuffer=o?o.slice():null):(c.roots=s,c.index=r?r.array:null,c.indirectBuffer=o),c}static deserialize(t,e,n={}){n={setIndex:!0,indirect:!!t.indirectBuffer,...n};const{index:s,roots:o,indirectBuffer:r}=t;t.version||(console.warn("MeshBVH.deserialize: Serialization format has been changed and will be fixed up. It is recommended to regenerate any stored serialized data."),a(o));const c=new Ke(e,{...n,[Ze]:!0});if(c._roots=o,c._indirectBuffer=r||null,n.setIndex){const l=e.getIndex();if(l===null){const u=new We(t.index,1,!1);e.setIndex(u)}else l.array!==s&&(l.array.set(s),l.needsUpdate=!0)}return c;function a(l){for(let u=0;u<l.length;u++){const d=l[u],f=new Uint32Array(d),h=new Uint16Array(d);for(let w=0,b=d.byteLength/Y;w<b;w++){const x=N*w,T=2*x;U(T,h)||(f[x+6]=f[x+6]/N-w)}}}}get primitiveStride(){return 3}get resolveTriangleIndex(){return this.resolvePrimitiveIndex}constructor(t,e={}){e.maxLeafTris&&(console.warn('MeshBVH: "maxLeafTris" option has been deprecated. Use "targetLeafSize", instead.'),e={...e,targetLeafSize:e.maxLeafTris}),super(t,e)}shiftTriangleOffsets(t){return super.shiftPrimitiveOffsets(t)}writePrimitiveBounds(t,e,n){const s=this.geometry,o=this._indirectBuffer,r=s.attributes.position,c=s.index?s.index.array:null,l=(o?o[t]:t)*3;let u=l+0,d=l+1,f=l+2;c&&(u=c[u],d=c[d],f=c[f]);for(let h=0;h<3;h++){const w=r[Qn[h]](u),b=r[Qn[h]](d),x=r[Qn[h]](f);let T=w;b<T&&(T=b),x<T&&(T=x);let y=w;b>y&&(y=b),x>y&&(y=x),e[n+h]=T,e[n+h+3]=y}return e}computePrimitiveBounds(t,e,n){const s=this.geometry,o=this._indirectBuffer,r=s.attributes.position,c=s.index?s.index.array:null,a=r.normalized;if(t<0||e+t-n.offset>n.length/6)throw new Error("MeshBVH: compute triangle bounds range is invalid.");const l=r.array,u=r.offset||0;let d=3;r.isInterleavedBufferAttribute&&(d=r.data.stride);const f=["getX","getY","getZ"],h=n.offset;for(let w=t,b=t+e;w<b;w++){const T=(o?o[w]:w)*3,y=(w-h)*6;let g=T+0,m=T+1,v=T+2;c&&(g=c[g],m=c[m],v=c[v]),a||(g=g*d+u,m=m*d+u,v=v*d+u);for(let B=0;B<3;B++){let p,_,S;a?(p=r[f[B]](g),_=r[f[B]](m),S=r[f[B]](v)):(p=l[g+B],_=l[m+B],S=l[v+B]);let M=p;_<M&&(M=_),S<M&&(M=S);let z=p;_>z&&(z=_),S>z&&(z=S);const A=(z-M)/2,P=B*2;n[y+P+0]=M+A,n[y+P+1]=A+(Math.abs(M)+A)*Sn}}return n}raycastObject3D(t,e,n=[]){const{material:s}=t;if(s===void 0)return;ni.copy(t.matrixWorld).invert(),wn.copy(e.ray).applyMatrix4(ni),si.setFromMatrixScale(t.matrixWorld),ei.copy(wn.direction).multiply(si);const o=ei.length(),r=e.near/o,c=e.far/o;if(e.firstHitOnly===!0){let a=this.raycastFirst(wn,s,r,c);a=js(a,t,e),a&&n.push(a)}else{const a=this.raycast(wn,s,r,c);for(let l=0,u=a.length;l<u;l++){const d=js(a[l],t,e);d&&n.push(d)}}return n}refit(t=null){return(this.indirect?Zr:zr)(this,t)}raycast(t,e=In,n=0,s=1/0){const o=this._roots,r=[],c=this.indirect?Kr:Cr;for(let a=0,l=o.length;a<l;a++)c(this,a,e,t,r,n,s);return r}raycastFirst(t,e=In,n=0,s=1/0){const o=this._roots;let r=null;const c=this.indirect?Qr:Dr;for(let a=0,l=o.length;a<l;a++){const u=c(this,a,e,t,n,s);u!=null&&(r==null||u.distance<r.distance)&&(r=u)}return r}intersectsGeometry(t,e){let n=!1;const s=this._roots,o=this.indirect?Jr:kr;for(let r=0,c=s.length;r<c&&(n=o(this,r,t,e),!n);r++);return n}shapecast(t){const e=Lt.getPrimitive(),n=super.shapecast({...t,intersectsPrimitive:t.intersectsTriangle,scratchPrimitive:e,iterate:this.indirect?Lr:Ir});return Lt.releasePrimitive(e),n}bvhcast(t,e,n){let{intersectsRanges:s,intersectsTriangles:o}=n;const r=Lt.getPrimitive(),c=this.geometry.index,a=this.geometry.attributes.position,l=this.indirect?w=>{const b=this.resolveTriangleIndex(w);J(r,b*3,c,a)}:w=>{J(r,w*3,c,a)},u=Lt.getPrimitive(),d=t.geometry.index,f=t.geometry.attributes.position,h=t.indirect?w=>{const b=t.resolveTriangleIndex(w);J(u,b*3,d,f)}:w=>{J(u,w*3,d,f)};if(o){if(!(t instanceof Ke))throw new Error('MeshBVH: "intersectsTriangles" callback can only be used with another MeshBVH.');const w=(b,x,T,y,g,m,v,B)=>{for(let p=T,_=T+y;p<_;p++){h(p),u.a.applyMatrix4(e),u.b.applyMatrix4(e),u.c.applyMatrix4(e),u.needsUpdate=!0;for(let S=b,M=b+x;S<M;S++)if(l(S),r.needsUpdate=!0,o(r,u,S,p,g,m,v,B))return!0}return!1};if(s){const b=s;s=function(x,T,y,g,m,v,B,p){return b(x,T,y,g,m,v,B,p)?!0:w(x,T,y,g,m,v,B,p)}}else s=w}return super.bvhcast(t,e,{intersectsRanges:s})}intersectsBox(t,e){return vn.set(t.min,t.max,e),vn.needsUpdate=!0,this.shapecast({intersectsBounds:n=>vn.intersectsBox(n),intersectsTriangle:n=>vn.intersectsTriangle(n)})}intersectsSphere(t){return this.shapecast({intersectsBounds:e=>t.intersectsBox(e),intersectsTriangle:e=>e.intersectsSphere(t)})}closestPointToGeometry(t,e,n={},s={},o=0,r=1/0){return(this.indirect?so:Yr)(this,t,e,n,s,o,r)}closestPointToPoint(t,e={},n=0,s=1/0){return _r(this,t,e,n,s)}}const ii=new R,ri=new R,oi=new R,Xt=new Ai,ai=new ot,he=new R,Jn=new R,go=["x","y","z"],bn=parseInt(Rn)>=169,xo=parseInt(Rn)<=161,Tn=new It,An=new It,_n=new It,ci=new R,li=new R,ui=new R;class vo extends Vn{get primitiveStride(){return 3}constructor(t,e={}){if(!t.isMesh)throw new Error("SkinnedMeshBVH: First argument must be a Mesh.");super(t.geometry,{...e,[Ze]:!0}),this.mesh=t,e[Ze]||this.init(e)}writePrimitiveBounds(t,e,n){const{mesh:s,geometry:o}=this,r=this._indirectBuffer,c=o.index?o.index.array:null,l=(r?r[t]:t)*3;let u=l+0,d=l+1,f=l+2;c&&(u=c[u],d=c[d],f=c[f]),s.getVertexPosition(u,ii),s.getVertexPosition(d,ri),s.getVertexPosition(f,oi);for(let h=0;h<3;h++){const w=go[h],b=ii[w],x=ri[w],T=oi[w];let y=b;x<y&&(y=x),T<y&&(y=T);let g=b;x>g&&(g=x),T>g&&(g=T),e[n+h]=y,e[n+h+3]=g}return e}shapecast(t){const e=new Ct;return super.shapecast({...t,intersectsPrimitive:t.intersectsTriangle,scratchPrimitive:e,iterate:wo})}raycastObject3D(t,e,n=[]){const{material:s}=t;if(s===void 0)return;const{matrixWorld:o}=t,{firstHitOnly:r}=e;ai.copy(o).invert(),Xt.copy(e.ray).applyMatrix4(ai);let c=null,a=1/0;return this.shapecast({boundsTraverseOrder:l=>l.distanceToPoint(Xt.origin),intersectsBounds:l=>{if(r){if(!Xt.intersectBox(l,Jn))return Un;let u;return l.containsPoint(Xt.origin)?u=0:(Jn.applyMatrix4(o),u=e.ray.origin.distanceTo(Jn)),u<a?Es:Un}else return Xt.intersectsBox(l)?Es:Un},intersectsTriangle:(l,u)=>{let d=null;if(s.side===In?d=Xt.intersectTriangle(l.a,l.b,l.c,!0,he):s.side===Pe?d=Xt.intersectTriangle(l.c,l.b,l.a,!0,he):d=Xt.intersectTriangle(l.a,l.b,l.c,!1,he),!d)return;d=d.clone().applyMatrix4(o);const f=e.ray.origin.distanceTo(d);if(f>=e.near&&f<=e.far){if(r&&f>=a)return;const{geometry:h}=this,{index:w}=h,b=this.resolvePrimitiveIndex(u),x=b*3;let T=x+0,y=x+1,g=x+2;w&&(T=w.array[T],y=w.array[y],g=w.array[g]);const m={distance:f,point:d.clone(),object:t,uv:null,uv1:null,normal:null,face:{a:T,b:y,c:g,normal:Et.getNormal(l.a,l.b,l.c,new R),materialIndex:0},faceIndex:b};if(bn){const _=new R;Et.getBarycoord(he,l.a,l.b,l.c,_),m.barycoord=_}const v=h.attributes.uv,B=h.attributes.uv1,p=h.attributes.normal;if(v){Tn.fromBufferAttribute(v,T),An.fromBufferAttribute(v,y),_n.fromBufferAttribute(v,g),m.uv=new It;const _=Et.getInterpolation(he,l.a,l.b,l.c,Tn,An,_n,m.uv);bn||(m.uv=_)}if(B){Tn.fromBufferAttribute(B,T),An.fromBufferAttribute(B,y),_n.fromBufferAttribute(B,g),m.uv1=new It;const _=Et.getInterpolation(he,l.a,l.b,l.c,Tn,An,_n,m.uv1);bn||(m.uv1=_),xo&&(m.uv2=m.uv1)}if(p){ci.fromBufferAttribute(p,T),li.fromBufferAttribute(p,y),ui.fromBufferAttribute(p,g),m.normal=new R;const _=Et.getInterpolation(he,l.a,l.b,l.c,ci,li,ui,m.normal);m.normal.dot(Xt.direction)>0&&m.normal.multiplyScalar(-1),bn||(m.normal=_)}a=m.distance,c=m,r||n.push(m)}}}),r&&c&&n.push(c),n}}function wo(i,t,e,n,s,o,r){const{mesh:c,geometry:a}=e,l=a.index?a.index.array:null;for(let u=i,d=t+i;u<d;u++){const f=e.resolvePrimitiveIndex(u);let h=3*f+0,w=3*f+1,b=3*f+2;if(l&&(h=l[h],w=l[w],b=l[b]),c.getVertexPosition(h,r.a),c.getVertexPosition(w,r.b),c.getVertexPosition(b,r.c),r.needsUpdate=!0,n(r,u,s,o))return!0}return!1}class bo extends $n{static get type(){return"ProxyCallNode"}constructor(t,e){super(),this.proxyNode=t,this.params=e}setup(){return this.proxyNode.proxyNode.call(...this.params)}}class Ri{get isNode(){return!0}get proxyNode(){const{proxyObject:t,proxyProperty:e}=this,n=e.split(".");let s=t;for(let o=0,r=n.length;o<r;o++)s=s?.[n[o]];return s&&"functionNode"in s?s.functionNode:s??null}constructor(t,e=null){return this.proxyObject=e,this.proxyProperty=t,new Proxy(this,{get(n,s){if(s in n)return Reflect.get(n,s);{const o=n.proxyNode;if(!o)return;const r=Reflect.get(o,s);return typeof r=="function"?r.bind(o):r}},set(n,s,o){if(s in n)return Reflect.set(n,s,o);throw new Error("NodeProxy: Cannot set members of proxied nodes.")}})}}const To=(...i)=>new Ri(...i),Ao=(...i)=>{const t=new Ri(...i),e=(...n)=>new bo(t,n);return _i.nodeProxyConstructor(e,t)},se=new bs,Ot=new bs;function _o(i,t){const e=i?i.array:null,n=new Uint32Array(t.length*3);for(let s=0,o=t.length;s<o;s++){const r=3*s,c=3*t[s];for(let a=0;a<3;a++)n[r+a]=e?e[c+a]:c+a}return n}function fi(i,t,e,n){const s=new Uint32Array(n),o=new Float32Array(n);i._roots.forEach(r=>{const c=new Uint16Array(r),a=new Uint32Array(r);for(let l=0,u=r.byteLength/Y;l<u;l++){const d=l*N,f=d*2,h=e*N,w=new Float32Array(r,l*Y,6);if(l===0)for(let x=0;x<3;x++){const T=w[x+0],y=w[x+3];T>y?(o[h+x+0]=1,o[h+x+3]=-1):(o[h+x+0]=T,o[h+x+3]=y)}else o.set(w,h);if(t===null){e++;continue}if(U(f,c)){const x=a[d+6],T=c[f+14],{transformSlot:y,nodeOffset:g}=T===0?{transformSlot:0,nodeOffset:0}:t[x];if(y>16777215)throw new Error(`packBVHBufferUtils: transform slot ${y} exceeds the 24-bit TLAS leaf limit.`);s[h+6]=g,s[h+7]=4278190080|y&16777215}else s[h+6]=a[d+6],s[h+7]=a[d+7];e++}})}function Mo(i,t){return $i(new Uint16Array(i),new Uint32Array(i),t)}function $i(i,t,e){if(U(e*N*2,i))return 1;const s=t[e*N+6];return s+$i(i,t,e+s)}function di(i,t=0){const e=new Uint16Array(i),n=new Uint32Array(i);let s=0;return o(t*N,1),s;function o(r,c){const a=r,l=r*2;if(U(l,e))s=Math.max(c,s);else{const d=Q(a,n),f=G(a);o(f,c+1),o(d,c+1)}}}function Bo(i,t,e,n,s,o){const r=new Uint16Array(o),c=new Uint32Array(o),a=new Float32Array(o),l=new Uint16Array(i),u=new Uint32Array(i);for(let d=0;d<e;d++){const f=t+d,h=f*N,w=h*2,b=s*N,x=b*2,T=new Float32Array(i,f*Y,6);if(d===0)for(let g=0;g<3;g++){const m=T[g+0],v=T[g+3];m>v?(a[b+g+0]=1,a[b+g+3]=-1):(a[b+g+0]=m,a[b+g+3]=v)}else a.set(T,b);U(w,l)?(c[b+6]=u[h+6]+n,r[x+14]=l[w+14],r[x+15]=Ts):(c[b+6]=u[h+6],c[b+7]=u[h+7]),s++}}function So(i,t,e,n,s){const{geometry:o}=i,{start:r,count:c,vertexStart:a}=t;if(i.indirect){const l=_o(o.index,i._indirectBuffer);for(let u=0;u<l.length;u++)s[u+n]=l[u]-a+e}else if(o.index)for(let l=0;l<c;l++)s[l+n]=o.index.getX(l+r)-a+e;else for(let l=0;l<c;l++)s[l+n]=l+r+e}function Po(i,t,e,n,s,o){const{geometry:r,mesh:c=null}=i,{vertexStart:a,vertexCount:l}=t,u=new Float32Array(n),d=s.getLength();s.membersLayout.forEach(({name:f},h)=>{const w=r.attributes[f];o.getDefaultAttributeValue(f,se);for(let b=0;b<l;b++){if(w){switch(Ot.fromBufferAttribute(w,b+a),w.itemSize){case 1:Ot.y=se.y,Ot.z=se.z,Ot.w=se.w;break;case 2:Ot.z=se.z,Ot.w=se.w;break;case 3:Ot.w=se.w;break}c&&(f==="position"||f==="normal"||f==="tangent")&&c.applyBoneTransform(b+a,Ot)}else Ot.copy(se);Ot.toArray(u,(e+b)*d+h*4)}})}class Io extends $n{constructor(t){super(),this.literal=t}build(){return this.literal}}class xs extends $n{constructor(t,e="property"){super(),this.node=t,this.output=e}build(t){return this.node.build(t,this.output)}}function zo(i){return i.isNode?new xs(i):null}function Li(i){const t=[];for(const e of i)if(Array.isArray(e))for(const n of e){const s=zo(n);s&&t.push(s)}return t}function Ci(i,t){return i.map(e=>(e&&!e.isNode&&e instanceof Function&&(e=e(t)),e&&e.isNode?(e.setup(t),e.isWGSLTagCodeNode?new xs(e,"inline"):new xs(e)):e))}function vs(i,t,e){let n="";for(let s=0,o=i.length;s<o;s++)if(n+=i[s],s<t.length){const r=t[s];Array.isArray(r)||(typeof r=="string"||typeof r=="number"?n+=String(r):n+=r.build(e))}return n}class Vo extends ki{static get type(){return"WGSLTagFnNode"}constructor(t,e,n="wgsl"){super("",Li(e),n),this.isWGSLTagFnNode=!0,this.tokens=t,this.args=e}setup(t){super.setup(t),this._normalizedArgs=Ci(this.args,t)}getNodeFunction(t){const{tokens:e,_normalizedArgs:n}=this,s=t.getDataFromNode(this);let o=s.nodeFunction;if(o===void 0){let r="";for(let c=0,a=e.length;c<a;c++)if(r+=e[c],c<n.length){const l=n[c];Array.isArray(l)||(typeof l=="string"||typeof l=="number"?r+=String(l):l.isStructLayoutNode?r+=l.getNodeType(t):l.isStruct?r+=l.layout.getNodeType(t):r+="_arg"+c)}r=r.replace(/\/\/.*[\n\r]/g,""),o=t.parser.parseFunction(r),s.nodeFunction=o}return o}generate(t,e){const n=super.generate(t,e),{_normalizedArgs:s}=this,o=vs(this.tokens,s,t),{type:r}=this.getNodeFunction(t),c=t.getCodeFromNode(this,r);return c.code=o.replace(/\/\/.+[\n\r]/g,"").replace(/->\s*void/,"").trim(),n}}class Ro extends Oi{static get type(){return"WGSLTagCodeNode"}constructor(t,e,n="wgsl"){super("",Li(e),n),this.isWGSLTagCodeNode=!0,this.tokens=t,this.args=e}setup(t){super.setup(t),this._normalizedArgs=Ci(this.args,t)}build(t,e){return e==="inline"?vs(this.tokens,this._normalizedArgs,t):super.build(t,e)}generate(t){super.generate(t);const e=t.getCodeFromNode(this,this.getNodeType(t));return e.code=vs(this.tokens,this._normalizedArgs,t),e.code}}const $o=i=>{const t=(...e)=>{if(e.length===1&&e[0]&&typeof e[0]=="object"&&!e[0].isNode){const n=e[0];for(const s in n)typeof n[s]=="string"&&(n[s]=new Io(n[s]))}return i.call(...e)};return _i.nodeProxyConstructor(t,i)},C=(i,...t)=>$o(new Vo(i,t)),Gt=(i,...t)=>new Ro(i,t),ws=Se(60);function Lo(i,t){const{name:e=`bvh_shapecast_fn_${Math.random().toString(36).substring(2,7)}`,shapeStruct:n,resultStruct:s=null,prefixFn:o=null,boundsOrderFn:r=null,intersectsBoundsFn:c,intersectRangeFn:a,transformShapeFn:l=null,transformResultFn:u=null,resetShapeFn:d=null}=t,{nodes:f,transforms:h}=i.storage;let w="";o&&(w=Gt`${o}();`);let b="";u&&(b=Gt`${u}( result, objectIndex );`);let x="";l&&(x=Gt`${l}( &localShape, objectIndex );`);let T="";d&&(T=Gt`${d}( objectIndex );`);let y="";r&&(y=Gt`
			let leftToRight = ${r}( localShape, splitAxis, node );
			c1 = select( rightIndex, leftIndex, leftToRight );
			c2 = select( leftIndex, rightIndex, leftToRight );
		`);const g=s?Gt`result: ptr<function, ${s}>`:"",m=s?"result":"",v=C`
		// fn
		fn ${e}( shape: ${n}, ${g} ) -> bool {

			${w}

			var didHit = false;

			var isTLAS = true;
			var pointer: i32 = 0;
			var stack: array<u32, ${ws}>;
			stack[ 0 ] = 0u;

			var blasDidHit: bool = false;
			var objectIndex: u32 = 0;
			var localShape: ${n} = shape;

			// the stack depth the current cluster's BLAS drains back down to once it is complete
			var tlasReset: i32 = 0;

			loop {

				// The cluster's BLAS has drained back to its TLAS leaf. Finalize the cluster that
				// was just traversed and resume the TLAS.
				if ( ! isTLAS && tlasReset == pointer ) {

					if ( blasDidHit ) {

						blasDidHit = false;
						didHit = true;
						${b}

					}

					${T}

					objectIndex = 0;
					isTLAS = true;
					localShape = shape;

				}

				// check if we've finished all nodes on the stack (or overrun the stack)
				if ( pointer < 0 || pointer >= i32( ${ws} ) ) {

					break;

				}

				let nodeIndex = stack[ pointer ];
				let node = ${f}[ nodeIndex ];
				pointer = pointer - 1;

				// skip the node if we don't intersect the bounds
				if ( ${c}( localShape, node.bounds, ${m} ) == 0u ) {

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

						let transform = ${h}[ objectIndex ];
						if ( transform.visible != 0u ) {

							tlasReset = pointer;
							isTLAS = false;
							blasDidHit = false;

							// Transform shape into object local space
							localShape = shape;
							${x}

							pointer = pointer + 1;
							stack[ pointer ] = infoY;

						}

					} else {

						let count = infoX & 0x0000ffffu;
						let offset = infoY;
						blasDidHit = ${a}( localShape, offset, count, ${m} ) || blasDidHit;

					}

				} else {

					let leftIndex = nodeIndex + 1u;
					let splitAxis = infoX & 0x0000ffffu;
					let rightIndex = nodeIndex + infoY;

					var c1 = rightIndex;
					var c2 = leftIndex;
					${y}

					pointer = pointer + 1;
					stack[ pointer ] = c2;

					pointer = pointer + 1;
					stack[ pointer ] = c1;

				}

			}

			return didHit;

		}
	`;return v.outputType=s,v.functionName=e,v}const Co=C`
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
`,Fi=C`
	// fn
	fn intersectRayTriangle( ray: ${et}, a: vec3f, b: vec3f, c: vec3f, threshold: f32 ) -> ${Wt} {

		const DET_EPSILON = 1e-15;

		var result: ${Wt};
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
`;C`
	// fn
	fn ndcToCameraRay( ndc: vec2f, inverseModelViewProjection: mat4x4f ) -> ${et} {

		var homogeneous = vec4f();
		var ray: ${et};

		homogeneous = inverseModelViewProjection * vec4f( ndc, 0.0, 1.0 );
		ray.origin = homogeneous.xyz / homogeneous.w;

		homogeneous = inverseModelViewProjection * vec4f( ndc, 1.0, 1.0 );
		let toFarPlane = ( homogeneous.xyz / homogeneous.w ) - ray.origin;
		ray.maxDist = length( toFarPlane );
		ray.direction = toFarPlane / ray.maxDist;

		return ray;

	}
`;function Fo(i){const{index:t,attributes:e,transforms:n}=i.storage,s=F(1).toVar(`bvh_rayScalar_${Math.random().toString(36).substring(2,7)}`);return i.getShapecastFn({name:"bvh_RaycastFirstHit",shapeStruct:et,resultStruct:Wt,boundsOrderFn:C`
			fn getBoundsOrder( ray: ${et}, splitAxis: u32, node: ${Ge} ) -> bool {

				return ray.direction[ splitAxis ] >= 0.0;

			}
		`,intersectsBoundsFn:C`
			fn rayIntersectsBounds( ray: ${et}, bounds: ${ye}, result: ptr<function, ${Wt}> ) -> u32 {

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

				} else if ( ray.maxDist > 0.0 && dist * ${s} >= ray.maxDist ) {

					return 0u;

				} else if ( result.didHit && dist * ${s} >= result.dist ) {

					return 0u;

				} else {

					return 1u;

				}

			}

		`,intersectRangeFn:C`
			fn intersectRange( ray: ${et}, offset: u32, count: u32, result: ptr<function, ${Wt}> ) -> bool {

				var didHit = false;
				for ( var ti = offset; ti < offset + count; ti = ti + 1u ) {

					let i0 = ${t}[ ti * 3u ];
					let i1 = ${t}[ ti * 3u + 1u ];
					let i2 = ${t}[ ti * 3u + 2u ];

					let a = ${e}[ i0 ].position.xyz;
					let b = ${e}[ i1 ].position.xyz;
					let c = ${e}[ i2 ].position.xyz;

					var triResult = ${Fi}( ray, a, b, c, 0.0 );
					triResult.dist *= ${s};
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
		`,transformShapeFn:C`
			fn transformRay( ray: ptr<function, ${et}>, objectIndex: u32 ) -> void {

				let toLocal = ${n}[ objectIndex ].inverseMatrixWorld;
				ray.origin = ( toLocal * vec4f( ray.origin, 1.0 ) ).xyz;
				ray.direction = ( toLocal * vec4f( ray.direction, 0.0 ) ).xyz;

				let len = length( ray.direction );
				ray.direction /= len;
				${s} = 1.0 / len;

			}
		`,transformResultFn:C`
			fn transformResult( hit: ptr<function, ${Wt}>, objectIndex: u32 ) -> void {

				let toLocal = ${n}[ objectIndex ].inverseMatrixWorld;
				hit.normal = normalize( ( transpose( toLocal ) * vec4f( hit.normal, 0.0 ) ).xyz );
				hit.objectIndex = objectIndex;

			}
		`,resetShapeFn:C`
			fn resetRayScalar( objectIndex: u32 ) -> void {

				${s} = 1.0;

			}
		`})}function Do(i){const{storage:t,structs:e}=i,n=e.attributes.membersLayout.map(({name:s})=>`result.${s} = a0.${s} * barycoord.x + a1.${s} * barycoord.y + a2.${s} * barycoord.z;`).join(`
`);return C`
		// fn
		fn bvh_sampleTrianglePoint( barycoord: vec3f, indices: vec3u ) -> ${e.attributes} {

			var result: ${e.attributes};
			var a0 = ${t.attributes}[ indices.x ];
			var a1 = ${t.attributes}[ indices.y ];
			var a2 = ${t.attributes}[ indices.z ];
			${n}
			return result;

		}
	`}function No(i){const{index:t,attributes:e,transforms:n}=i.storage,s=Wi().toVar("bvh_toWorldMat");return i.getShapecastFn({name:"bvh_ClosestPointToPoint",shapeStruct:"vec3f",resultStruct:rn,boundsOrderFn:C`
			fn cppBoundsOrder( shape: vec3f, splitAxis: u32, node: ${Ge} ) -> bool {

				let toWorld = ${s};

				// get center
				let bMin = vec3f( node.bounds.min[ 0 ], node.bounds.min[ 1 ], node.bounds.min[ 2 ] );
				let bMax = vec3f( node.bounds.max[ 0 ], node.bounds.max[ 1 ], node.bounds.max[ 2 ] );
				let center = bMin * 0.5 + bMax * 0.5;

				// determine the order in world space
				let worldCenter = ( toWorld * vec4f( center, 1.0 ) ).xyz;
				let worldAxis = normalize( toWorld[ splitAxis ].xyz );
				return dot( shape - worldCenter, worldAxis ) <= 0.0;

			}
		`,intersectsBoundsFn:C`
			fn cppIntersectsBounds( shape: vec3f, bounds: ${ye}, result: ptr<function, ${rn}> ) -> u32 {

				// return 1u;
				// we need to check this no matter what if the result has not been found yet
				if ( ! result.found ) {

					return 1u;

				}

				let toWorld = ${s};

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
		`,intersectRangeFn:C`
			fn cppIntersectsRange( shape: vec3f, offset: u32, count: u32, result: ptr<function, ${rn}> ) -> bool {

				var didHit = false;
				let toWorld = ${s};

				for ( var i = offset; i < offset + count; i ++ ) {

					// transform the triangle to world space
					let i0 = ${t}[ i * 3u + 0u ];
					let i1 = ${t}[ i * 3u + 1u ];
					let i2 = ${t}[ i * 3u + 2u ];
					let a = ( toWorld * vec4f( ${e}[ i0 ].position.xyz, 1.0 ) ).xyz;
					let b = ( toWorld * vec4f( ${e}[ i1 ].position.xyz, 1.0 ) ).xyz;
					let c = ( toWorld * vec4f( ${e}[ i2 ].position.xyz, 1.0 ) ).xyz;

					let barycoord = ${Co}( shape, a, b, c );
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
		`,resetShapeFn:C`
				fn cppResetShape( objectIndex: u32 ) -> void {

					// node bounds are transformed by "toWorld" during the bounds tests. Only the
					// object-local BLAS bounds need the object's world matrix - the top-level bounds
					// are already in world space - so restore identity before top-level traversal resumes.
					${s} = mat4x4f(
						1.0, 0.0, 0.0, 0.0,
						0.0, 1.0, 0.0, 0.0,
						0.0, 0.0, 1.0, 0.0,
						0.0, 0.0, 0.0, 1.0
					);

				}
			`,transformShapeFn:C`
			fn cppTransformShape( shape: ptr<function, vec3f>, objectIndex: u32 ) -> void {

				${s} = ${n}[ objectIndex ].matrixWorld;

			}
		`,transformResultFn:C`
			fn cppTransformResult( result: ptr<function, ${rn}>, objectIndex: u32 ) -> void {

				result.objectIndex = objectIndex;

			}
		`})}const Xe=24,jn=(1<<Xe)-1,Di=31-Xe,Eo=(1<<Di)-1,ts=new ot,es=new Ft,Ue=new ot;class Ho extends Vi{constructor(t,e){super(),e={getBVH:(r,c)=>{throw new Error("ClusteredBVH: getBVH callback must be provided ")},shouldCluster:r=>r.isSkinnedMesh||r.isInstancedMesh||r.isBatchedMesh,primitiveLimit:64,matrixWorld:Array.isArray(t)?new ot:t.matrixWorld,includeInstances:!0,_strictLeafSize:1,...e};const n=Array.from(Ni(t)),s=Math.ceil(Math.log2(n.length)),o=(1<<s)-1;this.objects=n,this.getBVH=e.getBVH,this.shouldCluster=e.shouldCluster,this.includeInstances=e.includeInstances,this.primitiveLimit=e.primitiveLimit,this.matrixWorld=e.matrixWorld,this.bvhMap=new WeakMap,this.idBits=s,this.idMask=o,this.primitiveBufferStride=2,this.init(e)}init(t){let e=0;const{objects:n,bvhMap:s,matrixWorld:o}=this;ts.copy(o).invert(),n.forEach(r=>{const c=[];for(let a=0,l=this._getInstanceCount(r);a<l;a++){const u=this.getBVH(r,a);c.push(u),u&&(e+=this.shouldCluster(r)?u._roots.length:this._countRelevantLeafNodes(u))}s.set(r,c)}),this.primitiveBuffer=new Uint32Array(e*2),this._fillPrimitiveBuffer(this.primitiveBuffer),super.init(t)}getRootRanges(){return[{offset:0,count:this.primitiveBuffer.length/this.primitiveBufferStride}]}refit(...t){ts.copy(this.matrixWorld).invert(),super.refit(...t)}writePrimitiveBounds(t,e,n){const{primitiveBuffer:s,bvhMap:o,objects:r}=this,c=s[2*t+0],a=s[2*t+1],l=r[this.getObjectId(c)],u=this.getInstanceId(c),d=o.get(l)[u],f=this.getBVHRootIndex(a),h=this.getBVHNodeIndex(a);l.isInstancedMesh||l.isBatchedMesh?(l.getMatrixAt(u,Ue),Ue.premultiply(l.matrixWorld)):Ue.copy(l.matrixWorld),Ue.premultiply(ts),O(h,new Float32Array(d._roots[f]),es),es.applyMatrix4(Ue);const{min:w,max:b}=es;e[n+0]=w.x,e[n+1]=w.y,e[n+2]=w.z,e[n+3]=b.x,e[n+4]=b.y,e[n+5]=b.z}getInstanceId(t){const{idMask:e,idBits:n}=this;return(t&~e)>>>n}getObjectId(t){const{idMask:e}=this;return t&e}getBVHRootIndex(t){return t>>>Xe}getBVHNodeIndex(t){return(t&jn)*N}_getInstanceCount(t){const{includeInstances:e}=this;return t.isInstancedMesh&&e?t.count:t.isBatchedMesh&&e?t.instanceCount:1}_fillPrimitiveBuffer(t){const{objects:e,bvhMap:n,idBits:s,primitiveLimit:o}=this;let r=0;const c=(a,l,u,d)=>{if(d>jn)throw new Error(`ClusteredBVH: cluster node index ${d} exceeds the ${Xe}-bit packing limit and cannot be represented.`);if(u>Eo)throw new Error(`ClusteredBVH: bvh root index ${u} exceeds the ${Di}-bit packing limit and cannot be represented.`);t[2*r+0]=a<<s|l,t[2*r+1]=u<<Xe|d&jn,r++};e.forEach((a,l)=>{n.get(a).forEach((u,d)=>{if(u)if(this.shouldCluster(a))for(let f=0,h=u._roots.length;f<h;f++)c(d,l,f,0);else hi(u,o,(f,h)=>{c(d,l,f,h/N)})})})}_countRelevantLeafNodes(t){const{primitiveLimit:e}=this;let n=0;return hi(t,e,(s,o,r,c)=>{n++,c&&r>=e&&console.warn(`ClusteredBVH: a leaf node with ${r} primitives exceeds the cluster primitive limit of ${e} and cannot be subdivided further.`)}),n}}function hi(i,t,e){const n=i._roots.length;for(let s=0;s<n;s++)re.setBVH(i,s),re.traverseBuffer((o,r,c)=>{const a=re.getRangeStart(c),u=re.getRangeEnd(c)-a;return u<t||r?(e(s,c,u,r),!0):!1});re.reset()}function Ni(i,t=new Set){return Array.isArray(i)?i.forEach(e=>Ni(e,t)):i.traverse(e=>{e.isMesh&&t.add(e)}),t}const pe=new ot,Mn=new ot,Uo={start:0,count:0,vertexStart:0,vertexCount:0};function ko(i){let t=i;for(;t;){if(t.visible===!1)return!1;t=t.parent}return!0}function pi(i){return i._roots.reduce((t,e)=>t+e.byteLength,0)}function mi(i,t){return`${i}_${t}`}class Oo{constructor(t,e={}){const{attributes:n={position:"vec4f"},autogenerateBvh:s=!0}=e;Array.isArray(t)||(t=[t]),t=t.map(o=>{if(o.isObject3D)return o;if(o.isBufferGeometry)return new je(o);if(o instanceof Vn){const r=new je;return r.geometry.boundsTree=o,r}}),this._bvhCache=new Map,this.autogenerateBvh=s,this.attributes=n,this.objects=t,this.bvh=null,this.storage=new ns,this.structs=new ns({transform:xr}),this.fns=new ns({raycastFirstHit:Fo(this),closestPointToPoint:No(this),sampleTrianglePoint:null},Ao)}getRootObject(){let{objects:t}=this;if(t.isObject3D)return t;Array.isArray(t)||(t=[t]),t=t.map(n=>{if(n.isObject3D)return n;if(n.isBufferGeometry)return new je(n);if(n instanceof Vn){const s=new je;return s.geometry.boundsTree=n,s}});const e=new qi;return e.children=t,e}getShapecastFn(t){return Lo(this,t)}update(){const t=this.getRootObject();let e=0;t.traverse($=>{$.isMesh&&e++}),this.bvh=new Ho(t,{strategy:Si,getBVH:($,W)=>this.getBVH($,W,Uo),primitiveLimit:e<3?1/0:64}),this.dispose();const{attributes:n,structs:s,bvh:o}=this,r=[],c=[],a=new Map;let l=pi(o),u=0,d=0;const f=[];let h=0;const w=this._getTransformMap(o),{primitiveBuffer:b,primitiveBufferStride:x}=o;for(let $=0,W=b.length;$<W;$+=x){const ut=b[$],ft=b[$+1],at=o.objects[o.getObjectId(ut)],At=o.getInstanceId(ut),E={start:0,count:0,vertexStart:0,vertexCount:0},Z=this.getBVH(at,At,E);if(!Z)throw new Error("BVHComputeData: BVH not found.");let D=r.find(dt=>dt.bvh===Z);D||(D={index:r.length,bvh:Z,range:E,geometryOffset:0},u+=D.range.count,d+=D.range.vertexCount,r.push(D));const _t=o.getBVHRootIndex(ft),gt=o.getBVHNodeIndex(ft)/N,xt=`${D.index}_${_t}_${gt}`;let nt=a.get(xt);if(nt===void 0){const dt=Mo(Z._roots[_t],gt);nt={data:D,root:_t,node:gt,size:dt,base:0},a.set(xt,nt),c.push(nt),l+=dt*Y,h=Math.max(h,di(Z._roots[_t],gt))}f.push({transformSlot:w.get(mi(ut,_t)).slot,subtree:nt})}if(di(o._roots[0])+h-1>ws.value)throw new Error("BVHComputeData: BVH depth overruns the compute stack depth.");const g=Math.max(w.size,2);u=Math.max(u,2),d=Math.max(d,2);const m=new ce(n,"bvh_GeometryStruct");let v=0,B=0;const p=new Uint32Array(u),_=new ArrayBuffer(d*m.getLength()*4),S=new ArrayBuffer(l);r.forEach($=>{$.geometryOffset=B/3,$.bvh.indirect||($.geometryOffset-=$.range.start/3),So($.bvh,$.range,v,B,p),Po($.bvh,$.range,v,_,m,this),B+=$.range.count,v+=$.range.vertexCount});let M=pi(o)/Y;c.forEach($=>{$.base=M,Bo($.data.bvh._roots[$.root],$.node,$.size,$.data.geometryOffset,M,S),M+=$.size}),f.forEach($=>$.nodeOffset=$.subtree.base),fi(o,f,0,S);const z=new ArrayBuffer(s.transform.getLength()*g*4),A=Ie(new ze(new Uint32Array(S),1),Ge).toReadOnly().setName("bvh_nodes"),P=new ze(new Uint32Array(z),1),I=Ie(P,s.transform).toReadOnly().setName("bvh_transforms"),V=Ie(new ze(p,1),"uint").toReadOnly().setName("bvh_index"),L=Ie(new ze(new Uint32Array(_),m.getLength()),m).toReadOnly().setName("bvh_attributes");this.storage.transforms=I,this.storage.nodes=A,this.storage.index=V,this.storage.attributes=L,this.structs.attributes=m,Mn.copy(o.matrixWorld).invert(),w.forEach($=>{this.writeTransformData($,Mn,$.slot,z)}),this.fns.sampleTrianglePoint=Do(this),this._bvhCache.clear()}updateTransforms(){const{bvh:t,storage:e}=this;t.refit();const n=e.nodes.proxyNode.value;fi(t,null,0,n.array.buffer),n.needsUpdate=!0;const s=e.transforms.proxyNode.value,o=s.array.buffer;Mn.copy(t.matrixWorld).invert(),this._getTransformMap(t).forEach(r=>{this.writeTransformData(r,Mn,r.slot,o)}),s.needsUpdate=!0}writeTransformData(t,e,n,s){const{structs:o}=this,r=new Float32Array(s),c=new Uint32Array(s),{object:a,instanceId:l}=t;a.isInstancedMesh||a.isBatchedMesh?(a.getMatrixAt(l,pe),pe.premultiply(a.matrixWorld)):pe.copy(a.matrixWorld),pe.premultiply(e),pe.toArray(r,n*o.transform.getLength()),pe.invert(),pe.toArray(r,n*o.transform.getLength()+16);let u=ko(a);a.isBatchedMesh&&(u=u&&a.getVisibleAt(l)),c[n*o.transform.getLength()+32]=u?1:0}getBVH(t,e,n){const{autogenerateBvh:s,_bvhCache:o}=this;let r=null;if(t.boundsTree||t.isSkinnedMesh){const c=t.geometry;if(n.count=c.index?c.index.count:c.attributes.position.count,n.vertexCount=c.attributes.position.count,r=t.boundsTree||null,r===null&&s){const a=t.uuid;r=o.get(a)||new vo(t),o.set(a,r)}}else if(t.isBatchedMesh){const c=t.getGeometryIdAt(e),a=t.getGeometryRangeAt(c);if(Object.assign(n,a),r=t.boundsTrees[c]||null,r===null&&s){const l=`batched_${t.geometry.uuid}_${a.start}_${a.count}`;r=o.get(l)||new Ke(t.geometry,{range:{...n}}),o.set(l,r)}}else{const c=t.geometry;if(n.count=c.index?c.index.count:c.attributes.position.count,n.vertexCount=c.attributes.position.count,r=t.geometry.boundsTree||null,r===null&&s){const a=c.uuid;r=o.get(a)||new Ke(c),o.set(a,r)}}return r}getDefaultAttributeValue(t,e){switch(t){case"position":case"color":e.set(1,1,1,1);break;default:e.set(0,0,0,0)}return e}dispose(){const{storage:t}=this;for(const e in t)t[e].value?.dispose()}_getTransformMap(t){const{primitiveBuffer:e,primitiveBufferStride:n}=t,s=new Map;for(let o=0,r=e.length;o<r;o+=n){const c=e[o],a=t.getBVHRootIndex(e[o+1]),l=mi(c,a);if(s.has(l))continue;const u=s.size,d=t.objects[t.getObjectId(c)],f=t.getInstanceId(c);s.set(l,{object:d,instanceId:f,compositeId:c,root:a,slot:u})}return s}}class ns{constructor(t={},e=To){const n={};return new Proxy({...t},{get(s,o){return n[o]||(n[o]=e(o,s)),n[o]},set(s,o,r){return s[o]=r,!0}})}}const X=new R,Yt=new R,ss=new R,Ei=new R,Wo=new Qt,yi=new ot,gi=new ot,qo=new Qt,is=new WeakMap,Xo=new Qt(1,1,1);let rs;const xi=[3242174889,2447445414],Be=[3518319154,2882110346,2360945575],bt=128,Pt=64,me=11,Yo=6,ke=4,vi=256,Zo=1,wi=2;class sa{constructor({rays:t=8,lightCandidates:e=4,bounces:n=16,cacheSamples:s=32,cacheSize:o=256,textureSize:r=512}={}){this.rays=t,this.lightCandidates=e,this.bounces=n,this.cacheSamples=s,this.cacheSize=o,this.textureSize=r,this.bias=.001,this._bvh=null,this._geometry=null,this._trace=null,this._surface=null,this._visibility=null,this._albedo=null,this._emission=null,this._emitterRadiance=null,this._materials=null,this._triangles=null,this._textures=null,this._textureList=[],this._alpha=!1,this._emitters=null,this._lightTree=null,this._meshLightTree=null,this._lightMapMeshes=[],this._tiles=1,this._cache=null,this._environment=null,this._sky=null,this._lights=null,this._lightCount=0,this._environmentIntensity=$e(1),this._environmentRotation=$e(new ot),this._environmentInverseRotation=$e(new ot),this._biasNode=$e(this.bias),this._passNode=$e(0,"uint"),this._pass=0,this._renderId=-1}update(t,e){this._clear(),this._collect(e),this._createTextures(t),this._createTrace(),this.bounces>0&&(this._cache=new Xi(t,this.cacheSize*this._tiles,(n,s)=>Mi(new Hi(this,n,s,!0))),this._solve())}dispose(){this._clear()}_clear(){this._bvh!==null&&(this._bvh.dispose(),this._geometry.dispose(),this._bvh=null,this._geometry=null);const t=new Set([this._triangles,this._materials,this._lights,this._emitters,this._lightTree?.nodes,this._meshLightTree?.nodes,this._sky]);for(const e of t)e?.value.dispose();this._triangles=this._materials=this._lights=this._emitters=this._lightTree=this._meshLightTree=this._sky=null,this._textures!==null&&(this._textures.dispose(),this._textures=null),this._cache!==null&&(this._cache.dispose(),this._cache=null)}_collect(t){t.updateMatrixWorld();const e=t.background;e!==null&&(e.isCubeTexture===!0||e.mapping===Yi||e.mapping===Zi)?(this._environment=e,this._environmentIntensity.value=t.backgroundIntensity,this._environmentInverseRotation.value.makeRotationFromEuler(t.backgroundRotation),this._environmentRotation.value.copy(this._environmentInverseRotation.value).transpose(),this._sky=ta(e)):(this._environment=null,this._sky=null);const n=[],s=[],o=[],r=[],c=[],a=new Map,l=new Map,u=[];this._alpha=!1;const d=p=>{if(jo(p)===!1)return-1;if(l.has(p)===!1){if(l.size===vi)return console.warn("THREE.RayTracedRadiosity: More than "+vi+" maps, the others count with their average color."),-1;l.set(p,l.size)}return l.get(p)},f=p=>p===yr?1:p===gr?2:0,h=(p,_)=>{if(_<0){r.push(0,0,0,-1,0,0,0,0);return}p.matrixAutoUpdate===!0&&p.updateMatrix();const S=p.matrix.elements;r.push(S[0],S[3],S[6],_,S[1],S[4],S[7],f(p.wrapS)+4*f(p.wrapT))},w=(p,_,S=null)=>{const M=p.uuid+_+(S!==null?S.toArray().join():"");if(a.has(M)===!1){const z=new Qt(0,0,0),A=new Qt(0,0,0);let P=0,I=null,V=null;p.isMeshBasicMaterial===!0?(p.color!==void 0&&A.copy(p.color),S!==null&&A.multiply(S),I=p.map):(p.color!==void 0&&_&&z.copy(p.color),S!==null&&z.multiply(S),p.emissive!==void 0&&A.copy(p.emissive).multiplyScalar(p.emissiveIntensity??1),P=p.metalness??0,I=p.emissiveMap,V=p.metalnessMap);const L=d(p.map),$=d(I),W=d(V),ut=d(p.alphaMap);L<0&&z.multiply(Bn(p.map)),$<0&&A.multiply(Bn(I)),W<0&&(z.multiplyScalar(1-P*Bn(V).b),P=0);const ft=p.side!==Pe?1:0,at=p.side===Pe||p.side===Oe?1:0,At=p.alphaTest??0,E=(At>0?Zo:0)|(p.transparent===!0||p.alphaHash===!0?wi:0),Z=A.clone();$>=0&&Z.multiply(Bn(I)),a.set(M,{index:a.size,emission:Z,side:p.side}),r.push(z.r,z.g,z.b,ft,A.r,A.g,A.b,at,P,At,p.opacity??1,E),h(p.map,L),h(I,$),h(V,W),h(p.alphaMap,ut),E!==0&&(this._alpha=!0)}return a.get(M)},b=[],x=[],T=this._tiles=Math.ceil(Math.sqrt(Ko(t)));t.traverseVisible(p=>{if(p.isDirectionalLight===!0||p.isPointLight===!0||p.isSpotLight===!0){const I=Wo.copy(p.color).multiplyScalar(p.intensity);X.setFromMatrixPosition(p.matrixWorld),p.isDirectionalLight===!0?(p.target.updateWorldMatrix(!0,!1),X.sub(Yt.setFromMatrixPosition(p.target.matrixWorld)).normalize(),b.push(X.x,X.y,X.z,0,I.r,I.g,I.b,0,0,0,0,0,0,0,0,0)):p.isPointLight===!0?b.push(X.x,X.y,X.z,1,I.r,I.g,I.b,0,p.distance,p.decay,0,0,0,0,0,0):(p.target.updateWorldMatrix(!0,!1),Yt.setFromMatrixPosition(p.target.matrixWorld).subVectors(X,Yt).normalize(),b.push(X.x,X.y,X.z,2,I.r,I.g,I.b,0,p.distance,p.decay,Math.cos(p.angle),Math.cos(p.angle*(1-p.penumbra)),Yt.x,Yt.y,Yt.z,0))}if(p.isRectAreaLight===!0&&x.push(p),p.isMesh!==!0||p.isSkinnedMesh||p.isBatchedMesh)return;const _=p.geometry,S=_.getAttribute("position"),M=_.getAttribute("uv"),z=_.getAttribute("uv1"),A=_.getIndex();z!==void 0&&u.push(p);const P=p.isInstancedMesh===!0?p.count:1;for(let I=0;I<P;I++){const V=p.isInstancedMesh===!0?gi.multiplyMatrices(p.matrixWorld,p.getMatrixAt(I,gi)):p.matrixWorld,L=p.isInstancedMesh===!0&&p.instanceColor!==null?qo.fromBufferAttribute(p.instanceColor,I):null,$=z!==void 0?Go(p,I,T):null,W=V.determinant()<0?[0,2,1]:[0,1,2],ut=A!==null?A.count:S.count,ft=Math.max(0,_.drawRange.start),at=Math.min(ut,_.drawRange.start+_.drawRange.count),At=_.groups.length>0?_.groups:[{start:0,count:1/0,materialIndex:0}];for(const E of At){const Z=Array.isArray(p.material)?p.material[E.materialIndex]:p.material;if(Z===void 0||Z.visible===!1)continue;const D=w(Z,z!==void 0,L),_t=D.emission.r+D.emission.g+D.emission.b>0,gt=Math.max(ft,E.start),xt=Math.min(at,E.start+E.count);for(let nt=gt;nt+2<xt;nt+=3){for(const ht of W){const K=A!==null?A.getX(nt+ht):nt+ht,st=$!==null?z.getX(K)*$.x+$.z:0,tt=$!==null?z.getY(K)*$.y+$.w:0;X.fromBufferAttribute(S,K).applyMatrix4(V),n.push(X.x,X.y,X.z),s.push(st,tt,M!==void 0?M.getX(K):0,M!==void 0?M.getY(K):0)}const dt=n.length-9,vt=s.length-12;X.fromArray(n,dt),Yt.fromArray(n,dt+3).sub(X),ss.fromArray(n,dt+6).sub(X);const j=Ei.crossVectors(Yt,ss).length()/2,H=[s[vt+2],s[vt+3],s[vt+6],s[vt+7],s[vt+10],s[vt+11]],q=Math.abs((H[2]-H[0])*(H[5]-H[1])-(H[4]-H[0])*(H[3]-H[1]))/2;o.push(D.index,j>0&&q>0?.5*Math.log2(q/j):0),_t&&j>0&&c.push({a:X.clone(),e1:Yt.clone(),e2:ss.clone(),area:j,emission:D.emission,side:D.side,entry:D.index,uvs:H})}}}});const y=c.length;for(const p of x){const _=new Qt().copy(p.color).multiplyScalar(p.intensity),S=new R(p.width/2,0,0).applyMatrix4(yi.extractRotation(p.matrixWorld)),M=new R(0,p.height/2,0).applyMatrix4(yi),z=new R().setFromMatrixPosition(p.matrixWorld).sub(S).sub(M),A=S.multiplyScalar(2),P=M.multiplyScalar(2),I=p.width*p.height/2;if(I>0){const V={area:I,emission:_,side:In,entry:-1,uvs:[0,0,0,0,0,0]};c.push({a:z.clone(),e1:P.clone(),e2:A.clone().add(P),...V}),c.push({a:z.clone(),e1:A.clone().add(P),e2:A.clone(),...V})}}const g=new Ki;g.setAttribute("position",new We(new Float32Array(n),3)),g.setAttribute("surface",new We(new Float32Array(s),4)),g.setIndex(new We(new Uint32Array(n.length/3).map((p,_)=>_),1));const m=new Oo(g,{attributes:{position:"vec4f",surface:"vec4f"}});m.update();const v=g.getIndex().array,B=new Float32Array(Math.max(v.length/3,2)*2);for(let p=0;p<v.length/3;p++){const _=v[p*3]/3;B[p*2]=o[_*2],B[p*2+1]=o[_*2+1]}this._geometry=g,this._bvh=m,this._lightMapMeshes=u,this._triangles=Ie(new ze(B,2),"vec2",B.length/2).toReadOnly(),this._textureList=Array.from(l.keys()),this._materials=Ye(r),this._lights=Ye(b),this._lightCount=b.length/(ke*4),this._createEmitters(c,y)}_createTextures(t){const e=this._textureList;if(e.length===0)return;const n=this.textureSize,s=new Gi(n,n,{depth:Math.max(e.length,2),depthBuffer:!1,generateMipmaps:!0,minFilter:Qi,wrapS:Rs,wrapT:Rs,colorSpace:os}),o=En(e[0],Ji()),r=new ji;r.fragmentNode=o;const c=new tr(r);rs=$s.resetRendererState(t,rs);for(let a=0;a<e.length;a++)o.value=e[a],s.texture.mipmapsAutoUpdate=a===e.length-1,t.setRenderTarget(s,a),c.render(t);$s.restoreRendererState(t,rs),r.dispose(),this._textures=s}_createTrace(){const t=this._bvh,{index:e,attributes:n}=t.storage,{sampleTrianglePoint:s}=t.fns,o=this._materials,r=this._triangles,c=this._emitters,a=this._textures,l=a!==null?En(a.texture,tn(0)):null,u=Math.max(Math.log2(this.textureSize)-3,0).toFixed(1),d=Math.log2(this.textureSize).toFixed(4),f=l!==null?C`
			// fn
			fn rayTracedRadiositySampleMap( item: u32, uv: vec2f, lod: f32 ) -> vec4f {

				let row0 = ${o}[ item ];
				let row1 = ${o}[ item + 1u ];

				if ( row0.w < 0.0 ) {

					return vec4f( 1.0 );

				}

				let wrap = vec2u( u32( row1.w ) & 3u, u32( row1.w ) >> 2u );
				var coord = vec2f( dot( row0.xyz, vec3f( uv, 1.0 ) ), dot( row1.xyz, vec3f( uv, 1.0 ) ) );
				coord = select( coord, clamp( coord, vec2f( 0.0 ), vec2f( 1.0 ) ), wrap == vec2u( 1u ) );
				coord = select( coord, 1.0 - abs( 1.0 - 2.0 * fract( coord * 0.5 ) ), wrap == vec2u( 2u ) );

				let level = lod + ${d} + 0.5 * log2( abs( row0.x * row1.y - row0.y * row1.x ) );

				return textureSampleLevel( ${l}, ${l}_sampler, coord, i32( row0.w ), clamp( level, 0.0, ${u} ) );

			}
		`:C`
			// fn
			fn rayTracedRadiositySampleMap( item: u32, uv: vec2f, lod: f32 ) -> vec4f {

				return vec4f( 1.0 );

			}
		`;this._albedo=C`
			// fn
			fn rayTracedRadiosityAlbedo( entry: u32, uv: vec2f, lod: f32 ) -> vec3f {

				let base = entry * ${me}u;
				let color = ${o}[ base ].rgb;

				if ( all( color == vec3f( 0.0 ) ) ) {

					return color;

				}

				let metalness = ${o}[ base + 2u ].x * ${f}( base + 7u, uv, lod ).b;

				return color * ${f}( base + 3u, uv, lod ).rgb * ( 1.0 - metalness );

			}
		`,this._emission=C`
			// fn
			fn rayTracedRadiosityEmission( entry: u32, uv: vec2f, lod: f32 ) -> vec3f {

				let base = entry * ${me}u;
				let emission = ${o}[ base + 1u ].rgb;

				if ( all( emission == vec3f( 0.0 ) ) ) {

					return emission;

				}

				return emission * ${f}( base + 5u, uv, lod ).rgb;

			}
		`;const h=C`
			// fn
			fn rayTracedRadiosityCoverage( entry: u32, uv: vec2f, lod: f32 ) -> f32 {

				let base = entry * ${me}u;
				let alpha = ${o}[ base + 2u ];
				let mode = u32( alpha.w );

				if ( mode == 0u ) {

					return 1.0;

				}

				let opacity = alpha.z * ${f}( base + 3u, uv, lod ).a * ${f}( base + 9u, uv, lod ).g;

				if ( opacity < alpha.y ) {

					return 0.0;

				}

				return select( 1.0, opacity, ( mode & ${wi}u ) != 0u );

			}
		`;this._emitterRadiance=C`
			// fn
			fn rayTracedRadiosityEmitterRadiance( base: u32, barycoord: vec2f ) -> vec3f {

				let corners = ${c}[ base + 4u ];
				let last = ${c}[ base + 5u ];

				if ( last.z < 0.0 ) {

					return ${c}[ base + 3u ].rgb;

				}

				let uv = corners.xy * ( 1.0 - barycoord.x - barycoord.y ) + corners.zw * barycoord.x + last.xy * barycoord.y;
				let entry = u32( last.z );

				return ${this._emission}( entry, uv, 0.0 ) * ${h}( entry, uv, 0.0 );

			}
		`;const w=C`
			// fn
			fn rayTracedRadiosityRandom( ray: ${et}, triangle: u32 ) -> f32 {

				let o = bitcast<vec3u>( ray.origin );
				let d = bitcast<vec3u>( ray.direction );

				var h = ( o.x * 0x9e3779b9u ) ^ ( o.y * 0x85ebca6bu ) ^ ( o.z * 0xc2b2ae35u ) ^ ( d.x * 0x27d4eb2fu ) ^ ( d.y * 0x165667b1u ) ^ ( d.z * 0xd3a2646cu ) ^ triangle;
				h = h * 747796405u + 2891336453u;
				h = ( ( h >> ( ( h >> 28u ) + 4u ) ) ^ h ) * 277803737u;
				h = ( h >> 22u ) ^ h;

				return f32( h >> 8u ) * ${2**-24};

			}
		`,b=C`
			// fn
			fn rayTracedRadiosityBoundsOrder( ray: ${et}, splitAxis: u32, node: ${Ge} ) -> bool {

				return ray.direction[ splitAxis ] >= 0.0;

			}
		`,x=C`
			// fn
			fn rayTracedRadiosityBoundsDistance( ray: ${et}, bounds: ${ye} ) -> f32 {

				let boundsMin = vec3f( bounds.min[ 0 ], bounds.min[ 1 ], bounds.min[ 2 ] );
				let boundsMax = vec3f( bounds.max[ 0 ], bounds.max[ 1 ], bounds.max[ 2 ] );

				let invDir = 1.0 / ray.direction;
				let tMinPlane = ( boundsMin - ray.origin ) * invDir;
				let tMaxPlane = ( boundsMax - ray.origin ) * invDir;
				let tMin = min( tMinPlane, tMaxPlane );
				let tMax = max( tMinPlane, tMaxPlane );

				let near = max( max( max( tMin.x, tMin.y ), tMin.z ), 0.0 );
				let far = min( min( tMax.x, tMax.y ), tMax.z );

				return select( - 1.0, near, far >= near && ( ray.maxDist <= 0.0 || near < ray.maxDist ) );

			}
		`,T=Gt`
			let i0 = ${e}[ ti * 3u ];
			let i1 = ${e}[ ti * 3u + 1u ];
			let i2 = ${e}[ ti * 3u + 2u ];
			let hit = ${Fi}( ray, ${n}[ i0 ].position.xyz, ${n}[ i1 ].position.xyz, ${n}[ i2 ].position.xyz, 0.0 );
		`,y=Gt`
			let entry = u32( ${r}[ ti ].x );
			var opacity = 1.0;

			if ( ${o}[ entry * ${me}u + 2u ].w != 0.0 ) {

				opacity = ${h}( entry, ${s}( hit.barycoord, vec3u( i0, i1, i2 ) ).surface.zw, 0.0 );

			}
		`,g=t.getShapecastFn({name:"rayTracedRadiosityClosestHit",shapeStruct:et,resultStruct:Wt,boundsOrderFn:b,intersectsBoundsFn:C`
				// fn
				fn rayTracedRadiosityClosestBounds( ray: ${et}, bounds: ${ye}, result: ptr<function, ${Wt}> ) -> u32 {

					let dist = ${x}( ray, bounds );

					return select( 0u, 1u, dist >= 0.0 && ( ! result.didHit || dist < result.dist ) );

				}
			`,intersectRangeFn:C`
				// fn
				fn rayTracedRadiosityClosestRange( ray: ${et}, offset: u32, count: u32, result: ptr<function, ${Wt}> ) -> bool {

					var didHit = false;

					for ( var ti = offset; ti < offset + count; ti = ti + 1u ) {

						${T}

						if ( hit.didHit && ( ray.maxDist <= 0.0 || hit.dist < ray.maxDist ) && ( ! result.didHit || hit.dist < result.dist ) ) {

							${this._alpha?Gt`

								${y}

								if ( opacity < 1.0 && ${w}( ray, ti ) >= opacity ) {

									continue;

								}

							`:""}

							result.didHit = true;
							result.dist = hit.dist;
							result.normal = hit.normal;
							result.side = hit.side;
							result.barycoord = hit.barycoord;
							result.indices = vec4u( i0, i1, i2, ti );

							didHit = true;

						}

					}

					return didHit;

				}
			`}),m=new ce({transmittance:"float"},"RayTracedRadiosityShadow"),v=t.getShapecastFn({name:"rayTracedRadiosityAnyHit",shapeStruct:et,resultStruct:m,boundsOrderFn:b,intersectsBoundsFn:C`
				// fn
				fn rayTracedRadiosityShadowBounds( ray: ${et}, bounds: ${ye}, result: ptr<function, ${m}> ) -> u32 {

					return select( 0u, 1u, result.transmittance > 0.0 && ${x}( ray, bounds ) >= 0.0 );

				}
			`,intersectRangeFn:C`
				// fn
				fn rayTracedRadiosityShadowRange( ray: ${et}, offset: u32, count: u32, result: ptr<function, ${m}> ) -> bool {

					for ( var ti = offset; ti < offset + count && result.transmittance > 0.0; ti = ti + 1u ) {

						${T}

						if ( hit.didHit && ( ray.maxDist <= 0.0 || hit.dist < ray.maxDist ) ) {

							${this._alpha?y:"let opacity = 1.0;"}

							result.transmittance *= 1.0 - opacity;

						}

					}

					return result.transmittance < 1.0;

				}
			`});this._trace=C`
			// fn
			fn rayTracedRadiosityTrace( origin: vec3f, direction: vec3f, maxDist: f32 ) -> vec4f {

				var ray: ${et};
				ray.origin = origin;
				ray.direction = direction;
				ray.maxDist = maxDist;

				var hit: ${Wt};
				${g}( ray, &hit );

				if ( ! hit.didHit ) {

					return vec4f( 0.0 );

				}

				let footprint = ${r}[ hit.indices.w ].y + log2( max( hit.dist, 1e-6 ) ) - 0.5 * log2( max( abs( dot( hit.normal, direction ) ), 1e-4 ) );

				return vec4f( hit.barycoord.yz, hit.side * ( f32( hit.indices.w ) + 1.0 ), footprint );

			}
		`,this._surface=C`
			// fn
			fn rayTracedRadiositySurface( hit: vec4f ) -> vec4f {

				let ti = u32( abs( hit.z ) ) - 1u;
				let indices = vec3u( ${e}[ ti * 3u ], ${e}[ ti * 3u + 1u ], ${e}[ ti * 3u + 2u ] );

				return ${s}( vec3f( 1.0 - hit.x - hit.y, hit.xy ), indices ).surface;

			}
		`,this._visibility=C`
			// fn
			fn rayTracedRadiosityVisibility( origin: vec3f, direction: vec3f, maxDist: f32 ) -> f32 {

				var ray: ${et};
				ray.origin = origin;
				ray.direction = direction;
				ray.maxDist = maxDist;

				var shadow: ${m};
				shadow.transmittance = 1.0;

				${v}( ray, &shadow );

				return shadow.transmittance;

			}
		`}_createEmitters(t,e){const n=[],s=[];for(let o=0;o<t.length;o++){const{a:r,e1:c,e2:a,area:l,emission:u,side:d,entry:f,uvs:h}=t[o];n.push(r.x,r.y,r.z,l,c.x,c.y,c.z,0,a.x,a.y,a.z,d===Oe?2:d===Pe?1:0,u.r,u.g,u.b,0,h[0],h[1],h[2],h[3],h[4],h[5],f,0);const w=r.clone().add(c),b=r.clone().add(a),x=r.clone().min(w).min(b),T=r.clone().max(w).max(b),y=new R().crossVectors(c,a).normalize();d===Pe&&y.negate();const g=l*(.2126*u.r+.7152*u.g+.0722*u.b)*(d===Oe?2:1);s.push({index:o,min:x,max:T,centroid:x.clone().add(T).multiplyScalar(.5),power:g,axis:y,cosTheta:d===Oe?-1:1})}this._emitters=Ye(n),this._meshLightTree=bi(s.slice(0,e)),this._lightTree=e<s.length?bi(s):this._meshLightTree}_solve(){const t=this._cache;for(const e of this._lightMapMeshes)t.addObjects([e],{page:0,uvTransform:Ui(e.userData.lightMapPage??0,this._tiles)});t.update(0);for(let e=0;e<this.bounces;e++)t.reset(),t.update();t.reset();for(let e=0;e<this.cacheSamples;e++)t.update()}_advance(t){t.renderId!==this._renderId&&(this._renderId=t.renderId,this._passNode.value=++this._pass,this._biasNode.value=this.bias)}_gather(t,e,n,s=null){const o=this.rays,r=this._trace,c=this._visibility,a=this._materials,l=this._triangles,u=this._emitters,d=this._cache!==null?En(this._cache.texture):null,f=this._environment,h=f!==null?this._sky:null,w=this.lightCandidates,{nodes:b,depth:x,count:T}=n?this._lightTree:this._meshLightTree,y=this._textures!==null,g=y||this._alpha,m=Math.log2(Math.sqrt(Math.PI/(32*o))),v=(A,P,I)=>y?this._albedo(Se(A),P,I):a.element(A.mul(me)).rgb,B=(A,P,I,V)=>it(P.greaterThan(V),F(1),P.mul(V).add(A.mul(I))),p=(A,P,I,V)=>it(P.greaterThan(V),F(0),A.mul(V).sub(P.mul(I))),_=Ls(([A,P,I])=>{const V=b.element(A.mul(3)).toVar(),L=b.element(A.mul(3).add(1)).toVar(),$=b.element(A.mul(3).add(2)).xyz,W=V.xyz.add(L.xyz).mul(.5),ut=lt(L.xyz.sub(V.xyz),L.xyz.sub(V.xyz)).mul(.25).toVar(),ft=P.sub(W).toVar(),at=lt(ft,ft).toVar(),At=ft.div(Dt(at).max(1e-8)).toVar(),E=L.w,Z=Dt(E.mul(E).oneMinus().max(0)),D=lt($,At).toVar(),_t=Dt(D.mul(D).oneMinus().max(0)),gt=at.lessThan(ut),xt=it(gt,F(0),Dt(ut.div(at.max(1e-8)))).toVar(),nt=it(gt,F(-1),Dt(xt.mul(xt).oneMinus().max(0))).toVar(),dt=B(_t,D,Z,E).toVar(),vt=p(_t,D,Z,E),j=B(vt,dt,xt,nt),H=lt(I,At).negate().toVar(),q=Dt(H.mul(H).oneMinus().max(0)),ht=B(q,H,xt,nt);return V.w.mul(j.max(0)).mul(ht.max(0)).div(at.max(ut).max(1e-8))}),S=A=>cr(f,this._environmentRotation.mul(A),F(0)).rgb.mul(this._environmentIntensity.mul(Math.PI)),M=A=>{const P=this._environmentRotation.mul(A).xyz.toVar(),I=kt(lr(P.z,P.x).div(2*Math.PI).add(.5).mul(bt)).clamp(0,bt-1),V=kt(ur(P.y.clamp(-1,1)).div(Math.PI).add(.5).mul(Pt)).clamp(0,Pt-1);return h.element(V.mul(bt).add(I)).z},z=(A,P)=>A.mul(A).div(A.mul(A).add(P.mul(P)).max(1e-20));return Ls(()=>{const A=t.toVar(),P=Hn(e).toVar(),I=it(P.greaterThan(1e-8),e.div(P),mt(0,1,0)).toVar(),V=Cs(er(A),nr(A)).toVar(),L=Hn(V).toVar(),$=it(L.greaterThan(1e-12),V.div(L),I).toVar();$.assign(it(lt($,I).lessThan(0),$.negate(),$));const W=A.add($.mul(this._biasNode)).toVar(),[ut,ft]=Qo(I),at=sr(ir.xy),E=Se(Ut(at.x.add(at.y.mul(65536))).mul(9)).min(8).mul(8).toVar(),Z=rr(Ut(E),Ut(E.add(1)),Ut(E.add(2)),Ut(E.add(3))).toVar(),D=Ut(E.add(4)).toVar(),_t=mt(Ut(E.add(5)),Ut(E.add(6)),Ut(E.add(7))).toVar(),gt=mt(0).toVar(),xt=mt(0).toVar(),nt=mt(0).toVar(),dt=s!==null?mt(0).toVar():null,vt=(j,H)=>{dt!==null&&dt.addAssign(H.mul(fr(j)))};if(en(o,({i:j})=>{const H=this._passNode.mul(o).add(Se(j)).toVar();if(d!==null||f!==null){const q=nn(Z.xy.add(tn(F(H.mul(xi[0])),F(H.mul(xi[1]))).mul(23283064365386963e-26))).toVar(),ht=Dt(q.x),K=q.y.mul(2*Math.PI),st=ut.mul(ht.mul(Fs(K))).add(ft.mul(ht.mul(sn(K)))).add(I.mul(Dt(q.x.oneMinus().max(0)))).toVar();Bt(lt(st,$).greaterThan(0),()=>{const tt=r(W,st,F(0)).toVar(),zt=Bt(tt.z.notEqual(0),()=>{const wt=kt(l.element(kt(Ds(tt.z)).sub(1)).x).toVar(),pt=this._surface(tt).toVar(),Vt=tt.w.add(m).toVar(),Mt=it(tt.z.lessThan(0),a.element(wt.mul(me).add(1)).w,a.element(wt.mul(me)).w),ct=mt(0).toVar();d!==null&&ct.addAssign(v(wt,pt.zw,Vt).mul(d.sample(pt.xy).level(0).rgb)),ct.mulAssign(Mt),gt.addAssign(ct),vt(ct,st)});f!==null&&zt.Else(()=>{const wt=h!==null?z(lt(I,st).div(Math.PI),M(st)):F(1),pt=S(st).mul(wt).toVar();gt.addAssign(pt),vt(pt,st)})})}if(T>0){const q=F(0).toVar(),ht=F(0).toVar(),K=F(0).toVar(),st=mt(0).toVar(),tt=mt(0).toVar(),zt=F(0).toVar(),wt=kt(0).toVar(),pt=tn(0).toVar();en(w,({i:Vt})=>{const Mt=H.mul(w).add(Se(Vt)).toVar(),ct=nn(mt(D,Z.z,Z.w).add(mt(F(Mt.mul(Be[0])),F(Mt.mul(Be[1])),F(Mt.mul(Be[2]))).mul(2**-32))).toVar(),St=kt(0).toVar(),Rt=F(1).toVar(),te=ct.x.toVar();x>0&&en(x,()=>{const Ht=b.element(St.mul(3).add(2)).w;Bt(Ht.greaterThan(0).and(Rt.greaterThan(0)),()=>{const ee=St.add(1).toVar(),Re=kt(Ht).toVar(),le=_(ee,W,I).toVar(),Qe=le.add(_(Re,W,I)).toVar();Bt(Qe.greaterThan(0),()=>{const qt=le.div(Qe).toVar();Bt(te.lessThan(qt),()=>{St.assign(ee),Rt.mulAssign(qt),te.assign(te.div(qt).min(.99999994))}).Else(()=>{St.assign(Re),Rt.mulAssign(qt.oneMinus()),te.assign(te.sub(qt).div(qt.oneMinus()).min(.99999994))})}).Else(()=>{Rt.assign(0)})})}),Bt(Rt.greaterThan(0),()=>{const Ht=kt(b.element(St.mul(3).add(2)).w.negate()).sub(1).mul(Yo).toVar(),ee=u.element(Ht).toVar(),Re=u.element(Ht.add(1)).toVar(),le=u.element(Ht.add(2)).toVar(),Qe=u.element(Ht.add(3)).toVar(),qt=Dt(ct.y),Fn=tn(qt.mul(ct.z.oneMinus()),qt.mul(ct.z)).toVar(),Dn=ee.xyz.add(Re.xyz.mul(Fn.x)).add(le.xyz.mul(Fn.y)).sub(W).toVar(),Ss=lt(Dn,Dn).max(1e-8).toVar(),Ps=Dt(Ss).toVar(),Je=Dn.div(Ps).toVar(),ge=lt(Ns(Cs(Re.xyz,le.xyz)),Je).negate().toVar();ge.assign(it(le.w.equal(2),Ds(ge),it(le.w.equal(1),ge.negate(),ge)));const Is=lt(I,Je).toVar();Bt(Is.greaterThan(0).and(ge.greaterThan(0)).and(lt(Je,$).greaterThan(0)),()=>{const zs=Is.mul(ge).mul(ee.w).div(Ss).min(Math.PI).div(Rt).toVar(),Vs=Qe.rgb.mul(zs).toVar(),Nn=lt(Vs,mt(.2126,.7152,.0722)).toVar();q.addAssign(Nn),Bt(Ut(E.add(Mt.mul(2654435761))).mul(q).lessThan(Nn),()=>{ht.assign(Nn),K.assign(Ps),st.assign(Je),tt.assign(Vs),zt.assign(zs),wt.assign(Ht),pt.assign(Fn)})})})}),Bt(ht.greaterThan(0),()=>{const Vt=c(W,st,K.mul(.999)).toVar();Bt(Vt.greaterThan(0),()=>{const ct=(g?this._emitterRadiance(Se(wt),pt).mul(zt):tt).mul(Vt.mul(q).div(ht.mul(w))).toVar();xt.addAssign(ct),vt(ct,st)})})}if(h!==null){const q=nn(_t.add(mt(F(H.mul(Be[0])),F(H.mul(Be[1])),F(H.mul(Be[2]))).mul(23283064365386963e-26))).toVar(),ht=q.x.mul(bt*Pt).toVar(),K=kt(ht).min(bt*Pt-1).toVar(),st=h.element(K).toVar(),tt=it(nn(ht).lessThan(st.x),K,kt(st.y)).toVar(),zt=h.element(tt).z.toVar(),wt=F(tt.mod(bt)),pt=F(tt.div(bt)),Vt=wt.add(q.y).div(bt).sub(.5).mul(2*Math.PI).toVar(),Mt=or(sn(pt.div(Pt).sub(.5).mul(Math.PI)),sn(pt.add(1).div(Pt).sub(.5).mul(Math.PI)),q.z).toVar(),ct=Dt(Mt.mul(Mt).oneMinus().max(0)),St=Ns(this._environmentInverseRotation.mul(mt(ct.mul(Fs(Vt)),Mt,ct.mul(sn(Vt)))).xyz).toVar(),Rt=lt(I,St).toVar();Bt(Rt.greaterThan(0).and(zt.greaterThan(0)).and(lt(St,$).greaterThan(0)),()=>{const te=c(W,St,F(0)).toVar();Bt(te.greaterThan(0),()=>{const Ht=z(zt,Rt.div(Math.PI)),ee=S(St).mul(Rt.mul(Ht).mul(te).div(zt.mul(Math.PI))).toVar();xt.addAssign(ee),vt(ee,St)})})}}),n&&this._lightCount>0){const j=this._lights;en(this._lightCount,({i:H})=>{const q=j.element(H.mul(ke)).toVar(),ht=j.element(H.mul(ke).add(1)).toVar(),K=j.element(H.mul(ke).add(2)).toVar(),st=j.element(H.mul(ke).add(3)).xyz,tt=q.w.greaterThan(.5),zt=it(tt,q.xyz.sub(W),q.xyz).toVar(),wt=it(tt,Hn(zt),F(0)).toVar(),pt=it(tt,zt.div(wt.max(1e-8)),zt).toVar(),Vt=lt(I,pt).toVar();Bt(Vt.greaterThan(0).and(lt(pt,$).greaterThan(0)),()=>{const Mt=c(W,pt,wt.mul(.999)).toVar();Bt(Mt.greaterThan(0),()=>{const ct=it(K.x.greaterThan(0),wt.div(K.x.max(1e-8)).pow(4).oneMinus().clamp(0,1).pow2(),F(1)),St=it(q.w.greaterThan(1.5),ar(K.z,K.w,lt(pt,st)),F(1)),Rt=it(tt,ct.mul(St).div(wt.pow(K.y).max(.01)),F(1));nt.addAssign(ht.rgb.mul(Vt.mul(Rt).mul(Mt)))})})})}return s!==null&&s.addAssign(dt.div(o)),gt.add(xt).div(o).add(nt)})()}}class Hi extends $n{static get type(){return"RayTracedRadiosityIrradianceNode"}constructor(t,e,n,s=!1,o=null){super("vec3"),this.radiosity=t,this.positionNode=e,this.normalNode=n,this.analyticLights=s,this.directionNode=o,this.updateBeforeType=dr.RENDER}updateBefore(t){this.radiosity._advance(t)}setup(){return this.radiosity._gather(this.positionNode,this.normalNode,this.analyticLights,this.directionNode)}}function ia(i){return(t,e,n,s=null)=>Mi(new Hi(i,t,e,!1,s))}function Ko(i){let t=1;return i.traverseVisible(e=>{e.isMesh===!0&&e.geometry.hasAttribute("uv1")&&(t=Math.max(t,(e.userData.lightMapPage??0)+1))}),t}function Ui(i,t){return new bs(1/t,1/t,i%t/t,Math.floor(i/t)/t)}function Go(i,t,e){const n=i.geometry,s=i.isInstancedMesh===!0?n.getAttribute("instanceLightMapScale"):void 0,o=i.isInstancedMesh===!0?n.getAttribute("instanceLightMapOffset"):void 0,r=Ui(i.userData.lightMapPage??0,e),c=s!==void 0?s.getX(t):1,a=s!==void 0?s.getY(t):1,l=o!==void 0?o.getX(t):0,u=o!==void 0?o.getY(t):0;return r.set(r.x*c,r.y*a,r.x*l+r.z,r.y*u+r.w)}function Qo(i){const t=it(i.z.greaterThanEqual(0),F(1),F(-1)),e=F(-1).div(t.add(i.z)),n=i.x.mul(i.y).mul(e),s=mt(i.x.mul(i.x).mul(e).mul(t).add(1),n.mul(t),i.x.mul(t).negate()).toVar(),o=mt(n,i.y.mul(i.y).mul(e).add(t),i.y.negate()).toVar();return[s,o]}function bi(i){const t=[];let e=0;const n=(o,r)=>{const c={min:o[0].min.clone(),max:o[0].max.clone(),power:0,axis:o[0].axis.clone(),cosTheta:o[0].cosTheta,link:-1},a=new Ft;for(const h of o)c.min.min(h.min),c.max.max(h.max),c.power+=h.power,Jo(c,h),a.expandByPoint(h.centroid);const l=t.length;if(t.push(c),e=Math.max(e,r),o.length===1)return c.link=-(o[0].index+1),l;const u=a.getSize(X),d=u.x>u.y&&u.x>u.z?"x":u.y>u.z?"y":"z";o.sort((h,w)=>h.centroid[d]-w.centroid[d]);const f=o.length>>1;return n(o.slice(0,f),r+1),c.link=n(o.slice(f),r+1),l};i.length>0&&n(i.slice(),0);const s=[];for(const{min:o,max:r,power:c,axis:a,cosTheta:l,link:u}of t)s.push(o.x,o.y,o.z,c,r.x,r.y,r.z,l,a.x,a.y,a.z,u);return{nodes:Ye(s),depth:e,count:i.length}}function Jo(i,t){if(i.cosTheta===-1)return;if(t.cosTheta===-1){i.cosTheta=-1;return}const e=Math.acos(Math.min(i.cosTheta,1)),n=Math.acos(Math.min(t.cosTheta,1)),s=i.axis.angleTo(t.axis);if(Math.min(s+n,Math.PI)<=e)return;if(Math.min(s+e,Math.PI)<=n){i.axis.copy(t.axis),i.cosTheta=t.cosTheta;return}const o=(e+s+n)/2,r=Ei.crossVectors(i.axis,t.axis);if(o>=Math.PI||r.lengthSq()<1e-12){i.cosTheta=-1;return}i.axis.applyAxisAngle(r.normalize(),o-e),i.cosTheta=Math.cos(o)}function jo(i){if(i==null||i.isTexture!==!0||i.isCubeTexture===!0||i.isArrayTexture===!0||i.isDataArrayTexture===!0||i.isData3DTexture===!0||i.isCompressedArrayTexture===!0)return!1;const t=i.image;return t!=null&&(t.width>0||t.videoWidth>0)}function Bn(i){if(i==null)return Xo;if(is.has(i)===!1){const t=new Qt(1,1,1),e=i.image;if(e!=null&&e.width>0&&e.data===void 0&&typeof OffscreenCanvas<"u"){const s=new OffscreenCanvas(32,32).getContext("2d");s.drawImage(e,0,0,32,32);const o=s.getImageData(0,0,32,32).data,r=new Qt,c=new Qt(0,0,0);for(let a=0;a<o.length;a+=4)c.add(r.setRGB(o[a]/255,o[a+1]/255,o[a+2]/255,i.colorSpace===os?os:void 0));t.copy(c).multiplyScalar(4/o.length)}is.set(i,t)}return is.get(i)}function Ye(i){const t=new Float32Array(Math.max(i.length,8));return t.set(i),Ie(new ze(t,4),"vec4",t.length/4).toReadOnly()}function ta(i){const t=i.image;if(i.isCubeTexture===!0||t===null||t===void 0||!t.data)return null;const{data:e,width:n,height:s}=t,o=e.length/(n*s);if(o!==3&&o!==4)return null;const r=i.type===hr?x=>pr.fromHalfFloat(e[x]):i.type===mr?x=>e[x]/255:x=>e[x],c=bt*Pt,a=new Float64Array(c),l=new Uint32Array(c);for(let x=0;x<s;x++){const T=i.flipY?1-(x+.5)/s:(x+.5)/s,y=Math.min(Math.floor(T*Pt),Pt-1);for(let g=0;g<n;g++){const m=(x*n+g)*o,v=y*bt+Math.min(Math.floor((g+.5)/n*bt),bt-1);a[v]+=.2126*r(m)+.7152*r(m+1)+.0722*r(m+2),l[v]++}}const u=new Float64Array(Pt);for(let x=0;x<Pt;x++)u[x]=2*Math.PI/bt*(Math.sin(((x+1)/Pt-.5)*Math.PI)-Math.sin((x/Pt-.5)*Math.PI));let d=0;for(let x=0;x<c;x++){const T=l[x]>0?a[x]/l[x]*u[Math.floor(x/bt)]:0;a[x]=T>0&&Number.isFinite(T)?T:0,d+=a[x]}if(d===0)return null;const f=new Float32Array(c*4),h=new Float64Array(c),w=[],b=[];for(let x=0;x<c;x++)h[x]=a[x]/d*c,f[x*4+2]=a[x]/d/u[Math.floor(x/bt)],(h[x]<1?w:b).push(x);for(;w.length>0&&b.length>0;){const x=w.pop(),T=b.pop();f[x*4]=h[x],f[x*4+1]=T,h[T]+=h[x]-1,(h[T]<1?w:b).push(T)}for(const x of w.concat(b))f[x*4]=1,f[x*4+1]=x;return Ye(f)}export{sa as RayTracedRadiosity,ia as rayTracedRadiosityIrradiance};
