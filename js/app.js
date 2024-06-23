const $channels = document.getElementById('channels')
const $video = document.getElementById('video');

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


fetch('./json/channels.json').then( res =>  res.json() ).then( channels => {
    $channels.innerHTML = channels.map( channel => {
        return `
            <button class="button_3c7P4bO" title="${ channel.title }" data-url="${ channel.url }"><img src="${ channel.image }" alt=""></button>
        `
    }).join('')
})
