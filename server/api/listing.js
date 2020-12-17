module.exports = function (server, errs, model) {

  server.post('/api/listing', async function (req, res, next) {
    try {
      const listing = await model.listing.create({
        name: req.body.name,
        description: req.body.description,
        url: req.body.url,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address
      })
      res.send(201, listing)
      next()
    } catch (error) {
      return next(new errs.BadRequestError(error));
    }
  })

  server.put('/api/listing/:id', async function (req, res, next) {
    try {
      const listing = await model.listing.update({
        name: req.body.name,
        description: req.body.description,
        url: req.body.url,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        visible: req.body.visible,
        views: req.body.views
      }, { where: { id: req.params.id } })
      res.send(200, listing)
      next()
    } catch (error) {
      return next(new errs.BadRequestError(error));
    }
  })

  server.get('/api/listing/:id', async function (req, res, next) {
    try {
      const listing = await model.listing.findByPk(req.params.id, { include: [model.image, model.category] })
      if (listing !== null) {
        res.send(200, listing)
      } else {
        res.send(404, { message: 'listing not found' })
      }
      next()
    } catch (error) {
      return next(new errs.BadRequestError(error));
    }
  })

  server.get('/api/listing', async function (req, res, next) {
    try {
      const listing = await model.listing.findAll({ include: [model.image, model.category] })
      res.send(200, listing)
      next()
    } catch (error) {
      return next(new errs.BadRequestError(error));
    }
  })

  server.del('/api/listing/:id', async function (req, res, next) {
    try {
      const listing = await model.listing.destroy({ where: { id: req.params.id } })
      res.send(200, listing)
      next()
    } catch (error) {
      return next(new errs.BadRequestError(error));
    }
  })

  // Relations endpoints

}
