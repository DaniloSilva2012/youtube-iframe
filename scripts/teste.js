/**
 * listener para a criação do iframe de video
 **/
window.onload = (function(doc){
	if ('touch' in window === false) {
		[].forEach.call(doc.getElementsByClassName('createVideoHome'), function(item){
			item.addEventListener('click', function(ev){
				ev.preventDefault();
				oppaVideo.createVideo(this, this.getAttribute('data-src'), 'video_container', 'removeVideo',
					{
						fullScreen: true
					});
			}, false );
		});

		[].forEach.call(doc.getElementsByClassName('createVideo'), function(item){
			item.addEventListener('click', function(ev){
				ev.preventDefault();
				oppaVideo.createVideo(this, this.getAttribute('data-src'), 'video_container', 'removeVideo',
					{
						fullScreen: true
					});
			}, false );
		});
	} else {
		for(var i = 0, countVideoHome = doc.getElementsByClassName('createVideo').length; i < countVideoHome; i+=1){
			doc.getElementsByClassName('createVideo')[i]
				.setAttribute('target', '_blank');
			doc.getElementsByClassName('createVideo')[i]
				.setAttribute('href', 'https://www.youtube.com/watch?v=' + doc.getElementsByClassName('createVideo')[0].getAttribute('data-src'));
		}
		for(var i = 0, countVideoHome = doc.getElementsByClassName('createVideoHome').length; i < countVideoHome; i+=1){
			doc.getElementsByClassName('createVideoHome')[i]
				.setAttribute('target', '_blank');
			doc.getElementsByClassName('createVideoHome')[i]
				.setAttribute('href', 'https://www.youtube.com/watch?v=' + doc.getElementsByClassName('createVideoHome')[0].getAttribute('data-src'));
		}
	}
}(document));
