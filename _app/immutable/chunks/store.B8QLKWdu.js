import{u as d,g as a,h as p,i as _,j as v,k as f,l as b,m,o as g,C as h,q as y,n as u,s as I,U as c,t as i,v as k}from"./runtime.CW51gHgY.js";function U(){const n=p,e=n.l.u;e&&(e.b.length&&d(()=>{var s;l(n),f(e.b);const t=(s=g)==null?void 0:s.parent;t!=null&&!(t.f&h)&&y(t)}),a(()=>{const t=_(()=>e.m.map(v));return()=>{for(const s of t)typeof s=="function"&&s()}}),e.a.length&&a(()=>{l(n),f(e.a)}))}function l(n){if(n.l.s)for(const e of n.l.s)b(e);m(n.s)}function N(n,e,t){if(n==null)return e(void 0),u;const s=n.subscribe(e,t);return s.unsubscribe?()=>s.unsubscribe():s}function j(n,e,t){let s=t[e];const r=s===void 0;r&&(s={store:null,last_value:null,value:k(c),unsubscribe:u},t[e]=s),(r||s.store!==n)&&(s.unsubscribe(),s.store=n??null,s.unsubscribe=A(n,s.value));const o=b(s.value);return o===c?s.last_value:o}function A(n,e){return n==null?(i(e,void 0),u):N(n,t=>i(e,t))}function C(n,e){return n.set(e),e}function q(n,e){const t=n[e];t.store&&C(t.store,t.value.v)}function w(n){E(()=>{let e;for(e in n)n[e].unsubscribe()})}function x(n,e,t){return n.set(t),e}function E(n){I(()=>()=>_(n))}export{q as a,C as b,U as i,x as m,j as s,w as u};
