/**
 * Created by danilo on 10/03/15.
 *
 * @class oppaVideo
 * @properties config
 * @methods createVideo, destroyVideo
 *
 *
 * ToDo:
 *  ecmascript 6 transpiled Babel;
 *  exemples;
 *  jsdoc;
 *  estudar: o comportamento de iframe ativado
 *           a possibilidade de integrar outros serviços de video (ex:vimeo)
 *
 **/
var oppaVideo;
;(function(win, doc){
	oppaVideo = {
		config: {
			iframe: '',
			iframeStyle: '',
			btnCreate: '',
			btnDestroy: '',
			fnCreate: '',
			containerStyle: 'position: fixed; z-index: 5; top:0; left:0; background: #000;',
			btnDestroyStyle: 'display: block; border-radius: 18px;width: 34px;height: 34px; background: transparent url(' + location.protocol + '//' + location.host + '/skin/frontend/oppa/default/images/icons/close-lightbox-shadow.png) no-repeat;position: absolute;right: 30px;top: 30px;cursor: pointer;',
			fullScreen: ''
		},

		/**
		 * @method createVideo
		 * @desc cria o iframe do video, seta o estilo do mesmo, faz a ligação dos listener com o iframe
		 *       (destroy, change, keyboard, fullscreen)
		 * @params btnCreate, idVideo, container, btnDestroy, config
		 *
		 **/
		createVideo : function(btnCreate, idVideo, container, btnDestroy, config){
			var	iframeYt = doc.createElement('iframe'),
				elBtnDestroy = doc.createElement('a'),
				container = doc.getElementById(container) || doc.querySelector('.' + container),
				elDestroy,
				screenHeight = window.innerHeight | 0,
				screenWidth = window.innerWidth | 0,
				fullScreenHeight = window.screen.height | 0,
				fullScreenWidth = window.screen.width | 0,
				config = config,
				btnDestroyStyle = config.btnDestroyStyle || oppaVideo.config.btnDestroyStyle;

			iframeYt.id = 'ytplayer';
			iframeYt.type = 'text/html';
			iframeYt.src = "https://www.youtube.com/embed/"+idVideo+"?controls=0&html5=1&disablekb=0&autoplay=1&showinfo=0&rel=0&modestbranding=1";
			iframeYt.frameborder = 0;
			iframeYt.allowfullscreen = "";

			//bug fix ao clicar no link ele da focus e no momento em clicar no link ele cria mais um video
			if(document.getElementById(iframeYt.id)){
				return false;
			}

			elBtnDestroy.href = '';
			elBtnDestroy.onclick = 'return false';
			elBtnDestroy.textContent = '';
			elBtnDestroy.id = btnDestroy;

			oppaVideo.config.iframe = iframeYt.id || btnCreate.getAttribute('class');
			oppaVideo.config.btnCreate = btnCreate.id || btnCreate.getAttribute('class');
			oppaVideo.config.btnDestroy = elBtnDestroy.id || btnCreate.getAttribute('class');
			oppaVideo.config.fnCreate = btnCreate.onclick;

			btnCreate.setAttribute('disabled', 'disabled');
			btnCreate.setAttribute('onclick', 'return false');
			btnCreate.setAttribute('class', 'activeVideo');

			container.appendChild(iframeYt);
			container.appendChild(elBtnDestroy);

			elBtnDestroy.setAttribute('style', btnDestroyStyle);
			container.setAttribute('style', oppaVideo.config.containerStyle);

			//verify config.fullScreen === true
			if(config.fullScreen){
				/**
				 * Listener changeFullScreenVideo
				 */
				oppaVideo.changeFullScreenVideo();

				oppaVideo.fullScreenVideo(container, iframeYt, fullScreenWidth, fullScreenHeight);
			} else {
				/**
				 * Listener keypress quando o video for criado
				 * @event keypŕess
				 * @method oppa
				 */
			    //Begin: style
				container.setAttribute('style', containerStyle);
				iframeYt.setAttribute('style', iframeStyle);
				//End: style
			}

			doc.addEventListener('keydown', oppaVideo.keyboardVideo, true);

			/**
			 * Listener para a remoção do iframe de video
			 **/
			elBtnDestroy.addEventListener("click", oppaVideo.destroyVideo, false);
		},
		/**
		 * @method keyboardVideo
		 * @desc ao clicar na tacle ESC o video é fechado
		 * @param ev, o parâmetro ev é capturado pelo browser ao iniciar o método
		 **/
		endTime: function(ev) {

		},
		/**
		 * @method changeFullScreenVideo
		 **/
		changeFullScreenVideo: function() {

			doc.addEventListener('fullscreenchange', function (ev) {
				if(doc.fullScreen === false){
					oppaVideo.destroyVideo(ev);
				}
			}, false);

			doc.addEventListener('mozfullscreenchange', function (ev) {
				if(doc.mozFullScreen === false){
					oppaVideo.destroyVideo(ev);
				}
			}, false);

			doc.addEventListener('webkitfullscreenchange', function (ev) {
				if(doc.webkitIsFullScreen === false){
					oppaVideo.destroyVideo(ev);
				}
			}, false);

			doc.addEventListener('MSFullscreenchange', function (ev) {
				if(doc.MSFullScreen === false){
					oppaVideo.destroyVideo(ev);
				}
			}, false);
		},
		/**
		 * @method keyboardVideo
		 * @desc
		 * @param ev, o parâmetro ev é capturado pelo browser ao iniciar o método
		 **/
		keyboardVideo: function(ev) {

			switch (ev.keyCode) {
				case 27 :
					//ao clicar no esc ele fecha o video o video
					oppaVideo.destroyVideo(ev);
					break;
				default :
					//bug fix ao clicar no link ele da focus e no momento em clicar no link ele cria mais um video
					return false;
			}
		},
		/**
		 * @method destroyVideo
		 * @param ev o parâmetro ev é capturado pelo browser ao iniciar o método
		 **/
		destroyVideo: function(ev){
			var child = doc.getElementById(oppaVideo.config.iframe) || doc.getElementsByClassName(oppaVideo.config.iframe)[0],
				btn = doc.getElementById(oppaVideo.config.btnDestroy) || doc.getElementsByClassName(oppaVideo.config.btnDestroy)[0],
				btnCreate = oppaVideo.config.btnCreate;

			ev.preventDefault();
			ev.stopPropagation();

			//fix fullscreen
			if(child){
				child.parentNode.setAttribute('style', 'background:transparent');
				child.parentNode.removeChild(child);
			}
			if(btn){
				btn.parentNode.removeChild(btn);
			}

			if (doc.exitFullscreen) {
				doc.exitFullscreen();
			} else if (doc.msExitFullscreen) {
				doc.msExitFullscreen();
			} else if (doc.mozCancelFullScreen) {
				doc.mozCancelFullScreen();
			} else if (doc.webkitExitFullscreen) {
				doc.webkitExitFullscreen();
			}

			for(var i= 0 | 0, countLength = doc.querySelectorAll(btnCreate).length | 0; i < countLength; i += 1){
				doc.querySelectorAll(btnCreate)[i]
					.setAttribute('disabled', 'disabled')
					.setAttribute('onclick', 'return false');
			}
			return false;
		},
		/**
		 * @method fullScreenVideo
		 * @params container (obj html container), iframeYt (obj html iframeYt), fullScreenWidth (width screen), fullScreenHeight(height screen)
		 */
		fullScreenVideo: function(container, iframeYt, fullScreenWidth, fullScreenHeight){
			//Begin: style
			container.style.height = fullScreenWidth + 'px';
			container.style.width = '100%';

			iframeYt.style.border = 'none';
			iframeYt.style.height = fullScreenHeight + 'px';
			iframeYt.style.width = fullScreenWidth + 'px';
			//End: style

			document.getElementById('ytplayer').onfocus;

			if (container.requestFullscreen) {
				container.requestFullscreen();
			} else if (container.msRequestFullscreen) {
				container.msRequestFullscreen();
			} else if (container.mozRequestFullScreen) {
				container.mozRequestFullScreen();
			} else if (container.webkitRequestFullscreen) {
				container.webkitRequestFullscreen();
			}

		}
	};
})(window, document);

