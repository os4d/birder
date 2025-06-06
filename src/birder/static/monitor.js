// group_by = 5
// labels = []
// datapoints = []
function doit(labels, datapoints, group_by, color) {
    const data = {
        labels: labels,
        datasets: [
            {
                label: "Failures",
                backgroundColor: color,
                borderColor: 'rgb(0, 0, 0)',
                data: datapoints,
                fill: false,
            },
        ],
    };
    const configChart = {
        responsive: false,
        type: "bar",
        data,
        options: {
            aspectRatio: 8,
            plugins: {
                //title: //}
                //    display: true,#}
                //    text: '{{ title }}'#}
                // },#}
                legend: {
                    display: false,
                }
            },
            scales: {
                y: {
                    //display: false,#}
                    max: group_by,
                    ticks: {
                        stepSize: 1,
                    }
                },
                x: {
                    //display: false,#}
                    ticks: {
                        callback: function (value, index, ticks) {
                            if (index % 24 === 0) {
                                return labels[index];
                            }
                        }
                    }
                }
            }
        },
    }

    var chartLine = new Chart(
        document.getElementById("barChart"),
        configChart
    );
}
