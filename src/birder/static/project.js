django.jQuery(document).ready(function () {
    $ = django.jQuery;
    $('.program-selection').on("change", function () {
        location.href = $(this).val();
    })

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
                let m = payload.monitor;
                let $target = $('#monitor-' + m.id);
                $target.find('div.counters').text(m.failures + " / " + m.thresholds[0] + " / " + m.thresholds[1]);
                $target.find('div.last-check').text(m.last_check);
                $target.find('img.icon').attr("src", m.icon);
                $target.find('img.status').attr("src", "/static/images/" + m.status + ".svg");
                if (m.active) {
                    $target.removeClass("offline")
                } else {
                    $target.addClass("offline");
                }
            }
        };

    }
    init();


})
