var socket = io();
socket.on('on', () => {
    console.log('haha');
});

const change = async (thisElement) => {
    const currentTime = await new Date().toUTCString();
    socket.emit('change', thisElement.checked);
    const historyActions = await document.getElementById('history');
    historyActions.innerHTML =
        `<p>Device turn: <strong>${thisElement.checked ? 'ON' : 'OFF'}</strong> at ${currentTime}</p>` +
        historyActions.innerHTML;
};

socket.on('testing', (e) => {
    document.getElementById('check').checked = true;
});
