exports.loadLoginPage = async (req, res) => {
  res.sendFile(`login.html`, { root: './public/html' });
};

exports.loadRegisterPage = (req, res) => {
  res.sendFile(`register.html`, { root: './public/html' });
};

exports.loadAddNewDevicePage = (req, res) => {
  res.sendFile('newDevice.html', { root: './public/html' });
};
