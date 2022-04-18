// DEPENDENCIES
const socket = io();

// CONFIGS
const url = 'http://localhost:3000';
// const url = 'https://do-an-212.herokuapp.com';

// PARSE INFOS FROM URL
const pathName = window.location.pathname.split('/');
const deviceType = pathName[pathName.length - 2];
const id = pathName[pathName.length - 1];

// CHECK IF USER LOGGED IN
if (!document.cookie) {
  location.href = '/login';
} else {
  document.getElementById('login').innerText = 'Logout';
}

// RENDER DEVICE INFO
(async () => {
  const res = await (await fetch(`${url}/api/v1/device/${id}`)).json();
  document.getElementById('name').innerHTML = res.data.name;
  document.getElementById('description').innerHTML += `<p>${res.data.description}</p>`;
  if (deviceType === 'sensor') {
    document.getElementById('humidity-onchange').innerHTML = res.data.humidity;
  } else if (deviceType === 'regDevice') {
    document.getElementById('check').checked = res.data.deviceStatus;
  }
})();

// WEBSOCKET ON CONNECT
socket.on('on', () => {
  console.log('haha');
});

// HANDLE CHANGES FROM OTHER SOURCE
socket.on('sendFromDevice', async (statusChange, deviceId) => {
  if (deviceId === id) {
    // const currentTime = await new Date().toUTCString();

    // const historyActions = await document.getElementById('history');
    // historyActions.innerHTML =
    //     `<p>Device turn: <strong>${statusChange ? 'ON' : 'OFF'}</strong> at ${currentTime}</p>` +
    //     historyActions.innerHTML;
    document.getElementById('check').remove();
    document.querySelector('.switch').innerHTML =
      `<input type="checkbox" onchange="change(this)" id="check" ${
        statusChange ? 'checked' : ''
      }/>` + document.querySelector('.switch').innerHTML;
  }
});

// HANDLE CHANGES FROM THIS CLIENT
const change = async (thisElement) => {
  const currentTime = await new Date().toUTCString();
  socket.emit('change', thisElement.checked);
  const historyActions = await document.getElementById('history');
  historyActions.innerHTML =
    `<p>Device turn: <strong>${thisElement.checked ? 'ON' : 'OFF'}</strong> at ${currentTime}</p>` +
    historyActions.innerHTML;

  axios.patch(`${url}/api/v1/device/${id}`, {
    deviceStatus: thisElement.checked,
  });
};
