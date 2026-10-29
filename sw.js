/* HAM LOG DATA service worker — build 1.2 · 2026-10-29 4601dace */
const CACHE='cwc-X4601dace';
const CORE=['./','index.html','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png','icons/icon-maskable-512.png','icons/apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE&&k.startsWith('cwc-')).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('message',e=>{if(e.data==='SKIP_WAITING')self.skipWaiting();});
/* network-first: ออนไลน์ได้ของใหม่เสมอ ออฟไลน์ใช้ของที่เก็บไว้ */
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  const u=new URL(r.url);
  if(u.protocol!=='http:'&&u.protocol!=='https:')return;
  const fonts=/(^|\.)(fonts\.googleapis\.com|fonts\.gstatic\.com)$/.test(u.hostname);
  if(u.origin!==location.origin&&!fonts)return;
  e.respondWith(fetch(r).then(res=>{
    if(res&&(res.ok||res.type==='opaque')){const cp=res.clone();caches.open(CACHE).then(c=>c.put(r,cp)).catch(()=>{});}
    return res;
  }).catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||(r.mode==='navigate'?caches.match('index.html'):Response.error()))));
});

// v2
