var cacheName = 'hellWorld1';
self.addEventListener('install',event => {
	event.waitUntil(
		caches.open(cacheName).then(cache =>{
			console.log(cache)
			cache.addAll([
				'./yong.png',
				'./self.html'
			])
		})
	)
})
self.addEventListener('fetch',(event)=>{
	console.log('监听到了请求')
	console.log(event)
	event.respondWith(
		caches.match(event.request).then((response)=>{
			console.log(response)
			if(response){
				return response
			}
			return fetch(event.request)
		})
	)
})