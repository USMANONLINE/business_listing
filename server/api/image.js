module.exports = function (server, errs, model) {

  // Creates an Image
  server.post('/api/image', async function (req, res, next) {
    try {
      const image = await model.image.create({
        name: req.body.name
      })
      res.send(201, image);
      next()
    } catch (error) {
      return next(new errs.BadRequestError(error));
    }
  })

  // Updates an image
  server.put('/api/image/:id', async function (req, res, next) {
    try {
      const image = await model.image.update({
        name: req.body.name
      }, { where: { id: req.params.id } });
      res.send(200, image);
      next()
    } catch (error) {
      return next(new errs.BadRequestError(error));
    }
  })

  // Retrieves a single image by id
  server.get('/api/image/:id', async function (req, res, next) {
    try {
      const image = await model.image.findByPk(req.params.id);
      if (image === null) {
        res.send(404, { message: 'Image not found' })
      } else {
        res.send(200, image)
      }
    } catch (error) {
      return next(new errs.BadRequestError(error));
    }
  })

  // Retrieves all images
  server.get('/api/image', async function (req, res, next) {
    try {
      const image = await model.image.findAll();
      res.send(200, image);
      next()
    } catch (error) {
      return next(new errs.BadRequestError(error));
    }
  })

  // Deletes an image
  server.del('/api/image/:id', async function (req, res, next) {
    try {
      const image = await model.image.destroy({ where: { id: req.params.id } })
      res.send(200, image)
      next()
    } catch (error) {
      return next(new errs.BadRequestError(error));
    }
  })

}
