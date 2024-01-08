import $ from 'jquery'

let pending = false

$('input').keypress((e) => {
  if (e.which === 13) {
    $('#get-message').click()
    return false
  }
})

$('#get-message').on('click', () => {
  if (pending === false) {
    pending = true
    const input = $('input[type=text][name=name]')
    const name = input.val()
    input.val('')
    $.ajax({
      type: 'POST',
      contentType: 'text/plain; charset=utf-8',
      data: name,
      url: '/api'
    }).done(message => $('#message').html(message))
      .fail(response => console.log(response))
      .always(() => (pending = false))
  }
})

$('input[type=text][name=name]').focus()
