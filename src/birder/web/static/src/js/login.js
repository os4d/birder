$('#login').click(function (e) {
    e.preventDefault();
    $('#loginForm').removeClass('d-none').show();
    $('input[name=username]').focus();
});
