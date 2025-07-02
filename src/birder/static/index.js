django.jQuery(document).ready(function () {
    $ = django.jQuery;

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
            const project = payload.monitor.project;
            if (payload.reason === 'update') {
                window.location.reload();
            } else if (payload.reason === 'ping') {
                $('#lastUpdate').text(payload.ts);
            } else if (payload.reason === 'status') {
                // let m = payload.monitor;
                let $target = $('#project-' + project.id);
                var err = false;
                Object.entries(project.data).forEach(([key, value]) => {
                    $target.find(`div.${key} .errored`).html(value[0])
                    $target.find(`div.${key} .total`).html(value[1]);
                    $line = $(`#project-${project.id} div.${key}`);
                    if (value[1] === 0) {
                        $line.removeClass("status-*").addClass('status-ok');
                    }else if (value[0] === 0) {
                        $line.removeClass("status-*").addClass('status-ok');
                    }else if (value[0]>0) {
                        $line.removeClass("status-*").addClass('status-error');
                        err= true;
                    }
                });
                $bullet = $target.find('svg>circle');
                $bullet.removeClass().addClass('green');
                // // let data = Array.from(Object.values(m.project.data));
                // // let ok = data.filter(x => x === "ok").length
                // // let ko = data.filter(x => x === "ko").length
                // // let warn = data.filter(x => x === "warn").length
                // // $target.find('div.counters>.ok').html(ok);
                // // $target.find('div.counters>.ko').html(ko);
                // // $target.find('div.counters>.warn').html(warn);
                if (err) {
                    $bullet.removeClass().addClass('status-error');
                }
                // if (m.project.status === 'warn') {
                //     $bullet.removeClass().addClass('orange');
                // } else if (m.project.status === 'ko') {
                //     $bullet.removeClass().addClass('red');
                // } else if (m.project.status === 'ok') {
                //     $bullet.removeClass().addClass('green');
                // } else {
                //     $bullet.removeClass().addClass('unknown');
                // }
            }
        };
    }
    init();


})
