var socket = io();
socket.on('connect', function () {
    console.log('connected 2 server')
    // socket.emit('createMsg',{
    //     from:'a@a.com',
    //     text:'test mail',
    // })
    var params = $.deparam(window.location.search)
    socket.emit('join_server', params, function (err) {
        if (err) location.href = '/'
    })
})

socket.on('disconnect', (socket) => {
    // console.log('disconnect from server')

})

socket.on('newMsg', (msg) => {
    var time = moment(msg.createdAt).format('h:mm a')
    var tmp = $('#msg-tmp').html();
    var html = Mustache.render(tmp, {from: msg.from, createdAt: time, text: msg.text});
    $('#msgs').append(html)
    scrollToBottom()
    // var li = $('<li></li>');
    // li.text(`${msg.from} ${time}:${msg.text}`)
    // $('#msgs').append(li)
})

socket.on('updateUsersList', (users) => {
    var ol = $('<ol></ol>')
    users.forEach((user) => {
        ol.append($('<li></li>').text(user))
    })
    $('#users').html(ol);

})


// socket.emit('createMsg', {
//     from: 'a@a.com',
//     text: 'createMsg from client',
// }, function (data) {
//     console.log(data)
// })

$('#chat-frm').on('submit', function (e) {
    e.preventDefault();
    var msgBox = $('[name=msg]');
    socket.emit('createMsg', {
        text: msgBox.val(),
    }, function (data) {
        // msgBox.val('');
    })
})

var sndLoc = $('#snd-loc');
sndLoc.on('click', function (e) {
    if (!navigator.geolocation) return alert('navigator geolocation none')
    sndLoc.attr("disabled", true);
    sndLoc.text('sending...')
    navigator.geolocation.getCurrentPosition(function (pos) {
        socket.emit('locMsgToServer', {
            lat: pos.coords.latitude,
            long: pos.coords.longitude,
        }, function (data) {
            // console.log(data)
            sndLoc.removeAttr("disabled");
            sndLoc.text('Send Location')
        })
    }, function (err) {
        alert('navigator geolocation none')
        sndLoc.removeAttr("disabled");
        sndLoc.text('Send Location')
    })
})

socket.on('newLocMsgToClient', function (msg) {

    var time = moment(msg.createdAt).format('h:mm a')
    var tmp = $('#loc-msg-tmp').html();
    var html = Mustache.render(tmp, {from: msg.from, createdAt: time, url: msg.url});
    $('#msgs').append(html)
    scrollToBottom()


})

function scrollToBottom() {
    var msgs = $('#msgs')
    var newMsg = msgs.children('li:last-child');
    var clientHeight = msgs.prop('clientHeight')
    var scrollTop = msgs.prop('scrollTop')
    var scrollHeight = msgs.prop('scrollHeight');
    var newMsgHeight = newMsg.innerHeight();
    var lastMsgHeight = newMsg.prev().innerHeight();
    if (clientHeight +
        scrollTop +
        newMsgHeight +
        lastMsgHeight >= scrollHeight)
        msgs.scrollTop(scrollHeight);
}