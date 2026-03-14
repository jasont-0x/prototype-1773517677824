const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

function generateReference (prefix) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let ref = prefix + '-'
  for (let i = 0; i < 8; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)]
  }
  return ref
}

router.get('/', function (req, res) {
  res.redirect('/start')
})

router.get('/bin-type', function (req, res) {
  res.render('bin-type')
})

router.post('/bin-type', function (req, res) {
  const answer = req.session.data['bin-type']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'bin-type': 'Select which bin was not collected.' }
    return res.render('bin-type')
  }
  res.redirect('/collection-day')
})

router.get('/collection-day', function (req, res) {
  res.render('collection-day')
})

router.post('/collection-day', function (req, res) {
  const answer = req.session.data['collection-day']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'collection-day': 'Select your scheduled collection day.' }
    return res.render('collection-day')
  }
  res.redirect('/bin-out-time')
})

router.get('/bin-out-time', function (req, res) {
  res.render('bin-out-time')
})

router.post('/bin-out-time', function (req, res) {
  const answer = req.session.data['bin-out-time']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'bin-out-time': 'Select when you put your bin out.' }
    return res.render('bin-out-time')
  }
  if (answer === 'no-after-6am') {
    return res.redirect('/ineligible-bin-out-time')
  }
  res.redirect('/collection-date')
})

router.get('/ineligible-bin-out-time', function (req, res) {
  res.render('ineligible-bin-out-time')
})

router.get('/collection-date', function (req, res) {
  res.render('collection-date')
})

router.post('/collection-date', function (req, res) {
  const answer = req.session.data['collection-date']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'collection-date': 'Enter the date your bin was missed.' }
    return res.render('collection-date')
  }
  res.redirect('/additional-information')
})

router.get('/additional-information', function (req, res) {
  res.render('additional-information')
})

router.post('/additional-information', function (req, res) {
  const answer = req.session.data['additional-information']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'additional-information': 'Enter details about the missed collection.' }
    return res.render('additional-information')
  }
  res.redirect('/check-answers')
})

router.get('/check-answers', function (req, res) {
  res.render('check-answers')
})

router.post('/check-answers', function (req, res) {
  if (!req.session.data['reference']) {
    req.session.data['reference'] = generateReference('MBC')
  }
  res.redirect('/confirmation')
})

router.get('/confirmation', function (req, res) {
  res.render('confirmation')
})

module.exports = router
