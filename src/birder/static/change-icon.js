django.jQuery(document).ready(function () {
    $ = django.jQuery;
    $('.frame').on("click", function () {
        $('input[name=icon]').val($(this).data("icon"));
    })
})
