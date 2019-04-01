var cacheName = 'hello world';
self.addEventListener('install',event => {
	event.waitUntil(
		caches.open(cacheName).then(cache =>{
			cache.addAll([
				'/js/script.js',
				'/yong.png'
			])
		})
	)
})