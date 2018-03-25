export default function ({req, error}) {
  // context.userAgent = process.server ? context.req.headers['user-agent'] : navigator.userAgent
  if (isBot(req)) {
    return error(401, "Bye")
  }
}

var isBot = function (req) {
  var ip = req.connection.remoteAddress

  var spam = process.env.SPAM || []

  var range = ip.split('.').slice(0, 3).join('.')

  // return process.env.SPAM.indexOf(range) > 0
  return spam.indexOf(range) >= 0
}
