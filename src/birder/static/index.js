django.jQuery(document).ready(function () {
    $ = django.jQuery;
    $('.program-selection').on("change", function () {
        location.href = $(this).val();
    })
})
