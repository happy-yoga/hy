module.exports = ({ viewOptions, contentful, contentfulRenderer }) => async (
  req,
  res
) => {
  contentful
    .page('landing-page')
    .then(page => {
      // res.render('index', {
      //   page,
      //   t: t(req),
      //   lang: req.params.lang,
      //   courses: courses.schedule,
      //   priceCategories,
      //   cr: contentfulRenderer
      // })

      res.render('landing-page', {
        page,
        ...viewOptions,
        cr: contentfulRenderer
      })
    })
    .catch(e => {
      console.log(e.message)
      res.render('error')
    })
}
