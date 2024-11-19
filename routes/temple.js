const routes = require('express').Router();
const templesController = require('../controllers/temple.js');
const { validateTemple, handleValidation } = require("../utils/validation.js")

routes.get('/', templesController.findAll);
routes.get('/:temple_id', templesController.findOne);
routes.get('')

// #swagger.parameters['body'] = {
//     in: 'body',
//     required: true,
//     schema: { $ref: '#/definitions/newTemple'}
// }
routes.post('/', validateTemple,  handleValidation, templesController.create);

// #swagger.parameters['body'] = {
//     in: 'body',
//     required: true,
//     schema: { $ref: '#/definitions/updateTemple'}
// }
routes.put('/:id', validateTemple, handleValidation, templesController.update)

routes.delete('/:id', templesController.delete)
routes.delete('/', templesController.deleteAll)

module.exports = routes;
