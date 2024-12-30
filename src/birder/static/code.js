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
        }
    }

    chatSocket.onmessage = function (e) {
        const payload = JSON.parse(e.data);
        console.log(111, "onmessage", payload);
        if (payload.reason === 'update') {
            window.location.reload();
        }else if (payload.reason === 'ping') {
            $('#lastUpdate').text(payload.ts);
        } else if (payload.reason === 'status') {
            let $target = $('#monitor-' + payload.content.id);
            $target.find('.last-check').text(payload.content.last_check);
            if (payload.content.status) {
                $target.find('img.status').attr("src", "/static/images/ok.svg");
            } else {
                $target.find('img.status').attr("src", "/static/images/ko.svg");
            }
        }
    };

}
init();
