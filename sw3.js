var cacheName = 'hellWorld3'
self.addEventListener('install',event => {
	event.waitUntil(
// 		caches.open(cacheName).then(cache =>{
// 			cache.addAll([
// 				'./yong.png',
// 				'./noData.png'
// 			])
// 		})
		self.skipWaiting()
	)
})
self.addEventListener('fetch',(event)=>{
	if(/\.png$/.test(event.request.url)){
		event.respondWith(
			fetch('./noData.png')
		)
		return
	}
	event.respondWith(
		caches.match(event.request).then((response)=>{
			if(response){
				return response
			}
			var requestToCache = event.request.clone();
			return fetch(requestToCache).then((res)=>{
				if(!res || res.status !== 200){
					return res
				}
				var responseToCache =res.clone();
				caches.open(cacheName).then((cache)=>{
					cache.put(requestToCache,responseToCache);
				})
				return res
			})
			
		})
	)
})