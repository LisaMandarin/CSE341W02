const routes = require('express').Router();
const temples = require('../controllers/temple.js');

routes.get('/', temples.findAll);
routes.get('/:temple_id', temples.findOne);
routes.get('')

// #swagger.parameters['body'] = {
//     in: 'body',
//     required: true,
//     schema: { $ref: '#/definitions/newTemple'}
// }
routes.post('/', temples.create);

// #swagger.parameters['body'] = {
//     in: 'body',
//     required: true,
//     schema: { $ref: '#/definitions/updateTemple'}
// }
routes.put('/:id', temples.update)

routes.delete('/:id', temples.delete)
routes.delete('/', temples.deleteAll)

module.exports = routes;
