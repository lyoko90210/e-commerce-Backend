const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: {model: Product, through: ProductTag}
  })
  .then((tags) => res.status(200).json(tags)) 
  .catch((err) => res.status(400).json(err));
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data

  Tag.findByPk(req.params.id, {
    include: {model: Product, through: ProductTag}
  })
  .then((tag) => res.status(200).json(tag))
  .catch((err) => res.status(400).json(err));
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then((tag) => res.status(200).json(tag))
  .catch((err) => res.status(400).json(err));
});

router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id
    },
    returning: true, // This option is needed for some databases like PostgreSQL
  })
  .then(([affectedCount, affectedRows]) => {
    if (affectedCount > 0) {
      res.status(200).json(affectedRows[0]); // Assuming returning: true works, send back the first updated tag
    } else {
      res.status(404).json({ message: 'Tag not found' });
    }
  })
  .catch((err) => res.status(400).json(err));
});
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then((numDeleted) => {
    if (numDeleted) {
      res.status(200).json({ message: 'Tag deleted' });
    } else {
      res.status(404).json({ message: 'Tag not found' });
    }
  })
  .catch((err) => res.status(400).json(err)); 
});
module.exports = router;
