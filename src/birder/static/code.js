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
let connectionError = 0;

var init = function () {
    if (connectionError >= 6) {
        clearInterval(interval);
        console.log("Connection Error: Aborted");
        return
    }
    let chatSocket = new WebSocket(address);
    chatSocket.onclose = function () {
        $('body').addClass('offline');
        interval = setInterval(init, 10000);
        connectionError++;
    }
    chatSocket.onerror = function () {
        $('body').addClass('offline');
        chatSocket.close();
    }
    chatSocket.onopen = function () {
        $('body').removeClass('offline');
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
    }

    chatSocket.onmessage = function (e) {
        const payload = JSON.parse(e.data);
        if (payload.reason === 'update') {
            window.location.reload();
        } else if (payload.reason === 'ping') {
            $('#lastUpdate').text(payload.ts);
        } else if (payload.reason === 'status') {
            let $target = $('#monitor-' + payload.monitor.id);
            console.log(payload.monitor);
            $target.find('.last-check').text(payload.monitor.last_check);
            $target.find('img.icon').attr("src", payload.monitor.icon);
            $target.find('img.status').attr("src", "/static/images/" + payload.monitor.status + ".svg");
            if (payload.monitor.active) {
                $target.removeClass("offline")
            } else {
                $target.addClass("offline");
            }
        }
    };

}
init();
