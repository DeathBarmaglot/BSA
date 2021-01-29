const { BaseRepository } = require('./baseRepository');

class ControlsRepository extends BaseRepository {
    constructor() {
        super('controls');
    }
}

exports.ControlsRepository = new ControlsRepository();
