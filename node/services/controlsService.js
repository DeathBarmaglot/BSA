const { ControlsRepository } = require('../repositories/controlsRepository');

class ControlsService {
  // TODO: Implement methods to work with fighters

  async get(req, res, next) {
    try {
      const data = await ControlsRepository.getOne();
      res.data = data;
    } catch (err) {
      res.data = { error: true, message: err, status: 404 };
    } finally {
      next()
    }
  }

  async post(req, res, next) {
    try {
      let data = await ControlsRepository.getOne();
      if (data) {
        const { id } = data;
        data = await ControlsRepository.update(id, req.body);
      } else {
        data = await ControlsRepository.create(req.body);
      }
      res.data = { error: false, data, status: 200 };
    } catch (err) {
      res.data = { error: true, message: "Error while processing ...", status: 404 };
    } finally {
      next();
    }
  }
}

module.exports = new ControlsService();