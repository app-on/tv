const channels = [
    { title : 'latina', image : 'https://www.latina.pe/_templates/desktop/includes/img/favicon.ico', url : 'https://jireh-1-hls-video-pe-isp.dps.live/hls-video/567ffde3fa319fadf3419efda25619456231dfea/latina/latina.smil/playlist.m3u8?dpssid=b2140448434266751e1ae6db6&sid=ba5t1l1xb254738574266751e1ae6db5&ndvc=1' },
    { title : 'america', image : 'https://tvgo.americatv.com.pe/favicon.ico', url : 'https://live-evg4.tv360.bitel.com.pe/bitel/americatv/chunks.m3u8' },
    { title : 'panamericana', image : 'https://panamericana.pe/imagenes/favicon.png', url : 'https://cdnhd.iblups.com/hls/ptv5.m3u8' },
    { title : 'willax', image : 'https://willax.pe/img/willax_logo_192x192.png', url : 'http://104.234.204.232:8080/live/Sj5UxdmSz3LQ/9fUyCk78RqZK/340201.m3u8?token=ThUKWEAMEQgXAQ9eBAxRU1AGAFUJUVQEA1cOAwACVFBXD1YIA1UCC1ZGFERDTREDVwlnWVRBDAIDVARVUxxAFEZSEGZaABEIF1YAXwQOVEQaRkxZXQYUCwdIFBULVEBbFw9XCAdGHxBQHEwDQlcCCmkAXUZZAFMTDQpDCQ4cQA5baAZcXgVdVhdeGlYSFUEPRRQaCl4WWl0bRlQMFkIDFVAVWBsCXQULF0gaBV9MDRJEHRoKEjZlExtGUx0WVQwSXFgMGwlGXgFAXBpKElAQOUQBS0RCBldcUhYUX0AAQE0XWgNBbAdcXFsBWxJZVg0VFF4aAxJPFFxYCl8RDUI9EVxTQAMRVQICBkZF' },
    { title : 'ATV', image : 'https://www.atv.pe/wp-content/uploads/2023/08/cropped-android-chrome-384x384-1-32x32.png', url : 'http://104.234.204.232:8080/live/Sj5UxdmSz3LQ/9fUyCk78RqZK/340189.m3u8?token=ThUKWEAMEQgXBw9WUQhVU1IFClQFBVNSDlRTVFZWWldTD1MMBlRWUQxGFERDTREDVwlnWVRBDAIDVAddWxxAFEZSEGZaABEIF1YAXwQOVEQaRkxZXQYUCwdIFBULVEBbFw9WDgBGHxBQHEwDQlcCCmkAXUZZAFMTDQpDCQ4cQA5baAZcXgVdVhdeGlYSFUEPRRQaCl4WWl0bRlQMFkIDFVAVWBsEVgsQGUZbCUVXFxRPRgISZTAUHRUBThEHXhEIWllAAxEJAEcNRhREWUo8FFMXTEJVAltURUYMR1ISTkNYVhpmUAtdXFAHTA9fVxBEDEYLEhxBW15ZDUIKEG8SCFEVWBsCVAsFFxk=' },
    { title : 'TV peru', image : 'https://www.tvperu.gob.pe/sites/all/themes/stability/favicon.png', url : 'https://cdnhd.iblups.com/hls/777b4d4cc0984575a7d14f6ee57dbcaf.m3u8' },
]
//
const $channels = document.getElementById('channels')
const $video = document.getElementById('video');

$channels.innerHTML = channels.map( channel => {
    return `
        <button class="button_3c7P4bO" title="${ channel.title }" data-url="${ channel.url }"><img src="${ channel.image }" alt=""></button>
    `
}).join('')

$channels.addEventListener('click', (e)=> {
    const button = e.target.closest('button')
    if( button ) {
        Array.from( $channels.querySelectorAll('button.focus') ).forEach( button => button.classList.remove('focus'))
        button.classList.add('focus')

        loadedmetadataHls( button.getAttribute('data-url') )
    }
})

const loadedmetadataHls =( url )=>{
    var $video = document.getElementById('video');
    var videoSrc = url;

    if (Hls.isSupported()) {
        var hls = new Hls();

        hls.loadSource(videoSrc);
        hls.attachMedia($video);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
            $video.play();
        });
    } else if ($video.canPlayType('application/vnd.apple.mpegurl')) {
        $video.src = videoSrc;
        $video.addEventListener('loadedmetadata', function () {
            $video.play();
        });
    }  
}

addEventListener('contextmenu', (e)=> {
    e.preventDefault()
})


