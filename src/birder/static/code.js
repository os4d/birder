$ = django.jQuery;
var toggler = document.getElementById("darkmode");

function setDarkMode() {
    if (localStorage.theme === 'dark') {
        toggler.src = "/static/images/on.svg";
    } else {
        toggler.src = "/static/images/off.svg";
    }
    document.documentElement.classList.toggle('dark', localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches))
}

toggler.addEventListener("click", function () {
    if (localStorage.theme === 'dark') {
        localStorage.theme = 'light';
    } else {
        localStorage.theme = 'dark';
    }
    setDarkMode()
});
setDarkMode()
const address = 'ws://' + window.location.host + '/ws/checks/';
let interval = null;


var init = function () {
    chatSocket = new WebSocket(address);
    chatSocket.onclose = function () {
        $('body').addClass('offline');
        interval = setInterval( init, 10000)
    }
    chatSocket.onerror = function () {
        $('body').addClass('offline');
    }
    chatSocket.onopen = function () {
        $('body').removeClass('offline');
        if (interval){
            clearInterval(interval);
            interval=null;
        }
    }

    chatSocket.onmessage = function (e) {
        const payload = JSON.parse(e.data);
        if (payload.reason === 'update') {
            window.location.reload();
        }else if (payload.reason === 'ping') {
            $('#lastUpdate').text(payload.ts);
        } else if (payload.reason === 'status') {
            console.log(1111, payload.content.name, payload.content.status);
            let $target = $('#monitor-' + payload.content.id);
            $target.find('.last-check').text(payload.content.last_check);
            $target.find('img.icon').attr("src", payload.content.icon);
            $target.find('img.status').attr("src", "/static/images/" +  payload.content.status + ".svg");
        }
    };

}
init();
