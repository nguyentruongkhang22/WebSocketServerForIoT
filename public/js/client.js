var socket = io();
socket.on('on', () => {
    console.log('haha');
});

const change = async (thisElement) => {
    socket.emit('change', thisElement.checked);
};

socket.on('testing', (e) => {
    document.getElementById('check').checked = true;
});
