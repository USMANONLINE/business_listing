module.exports = function (server, errs, model) {

  // Creates a category
  server.post('/api/category', async function (req, res, next) {
    try {
      const category = await model.category.create({
        title: req.body.title
      })
      res.send(201, category);
      next()
    } catch (error) {
      return next(new errs.BadRequestError(error));
    }
  })

  // Updates a category
  server.put('/api/category/:id', async function (req, res, next) {
    try {
      const category = await model.category.update({
        title: req.body.title
      }, { where: { id: req.params.id } });
      res.send(200, category);
      next()
    } catch (error) {
      return next(new errs.BadRequestError(error));
    }
  })

  // Retrieves a single category by id
  server.get('/api/category/:id', async function (req, res, next) {
    try {
      const category = await model.category.findByPk(req.params.id);
      if (category === null) {
        res.send(404, { message: 'Category not found' })
      } else {
        res.send(200, category)
      }
    } catch (error) {
      return next(new errs.BadRequestError(error));
    }
  })

  // Retrieves all categories
  server.get('/api/category', async function (req, res, next) {
    try {
      const category = await model.category.findAll();
      res.send(200, category);
      next()
    } catch (error) {
      return next(new errs.BadRequestError(error));
    }
  })

  // Deletes a category
  server.del('/api/category/:id', async function (req, res, next) {
    try {
      const category = await model.category.destroy({ where: { id: req.params.id } })
      res.send(200, category)
      next()
    } catch (error) {
      return next(new errs.BadRequestError(error));
    }
  })

  server.post('/api/listing-category', async function (req, res, next) {
    try {
      const lstcat = await model.listing_category.create({
        listingId: req.body.listingId,
        categoryId: req.body.categoryId
      })
      res.send(201, lstcat)
      next()
    } catch (error) {
      return next(new errs.BadRequestError(error));
    }
  })

  server.post('/api/listing-categories', async function (req, res, next) {
    try {
      const lstcat = await model.listing_category.bulkCreate(req.body)
      res.send(201, lstcat)
      next()
    } catch (error) {
      return next(new errs.BadRequestError(error));
    }
  })

}
