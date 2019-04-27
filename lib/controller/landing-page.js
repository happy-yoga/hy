module.exports = options => async (req, res) => {
  res.render('index', options.viewOptions)
}
