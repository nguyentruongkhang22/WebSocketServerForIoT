exports.successRedirect = (req, res) => {
  res.redirect(req.params.destination);
};
