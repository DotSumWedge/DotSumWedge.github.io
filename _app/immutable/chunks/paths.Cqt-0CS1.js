import{n as f}from"./runtime.CW51gHgY.js";const n=[];function a(s,o){return s!=s?o==o:s!==o||s&&typeof s=="object"||typeof s=="function"}function q(s,o=f){let i=null;const r=new Set;function u(e){if(a(s,e)&&(s=e,i)){const c=!n.length;for(const t of r)t[1](),n.push(t,s);if(c){for(let t=0;t<n.length;t+=2)n[t][0](n[t+1]);n.length=0}}}function b(e){u(e(s))}function _(e,c=f){const t=[e,c];return r.add(t),r.size===1&&(i=o(u,b)||f),e(s),()=>{r.delete(t),r.size===0&&i&&(i(),i=null)}}return{set:u,update:b,subscribe:_}}var l;const h=((l=globalThis.__sveltekit_1qmu9p3)==null?void 0:l.base)??"/webApp";var p;const d=((p=globalThis.__sveltekit_1qmu9p3)==null?void 0:p.assets)??h;export{d as a,h as b,q as w};