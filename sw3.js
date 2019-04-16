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
self.addEventListener('push',function(even){
	var payload = event.data?JSON.parse(event.data.text()):'no payload';
	var title = 'times';
	event.waitUntil(
		self.registration.showNotification(title,{
			body:payload.msg,
			url:payload.url,
			icon:payload.icon
		})
	)
})
self.addEventListener('notificationclick',(event)=>{
	event.notification.close();
	event.waitUntil(
		clients.matchAll({
			type:"window"
		}).then((clientList)=>{
			for(var i = 0;i<clientList.length;i++){
				var client = clientList[i];
				if(client.url == '/' && 'focus' in client){
					return client.focus();
				}
				if(clients.openWindow){
					return clients.openWindow('http://localhost:3111/')
				}
			}
		})
	)
})