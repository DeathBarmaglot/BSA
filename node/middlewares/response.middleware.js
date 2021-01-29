const responseMiddleware = (req, res, next) => {
   if (!res.data) res.data = {};
   if (res.data.error === true) res.status(res.data.status).send(res.data)
   else res.status(200).send(res.data)
}

exports.responseMiddleware = responseMiddleware;