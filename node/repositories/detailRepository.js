const { dbAdapter } = require('../config/db');
const { BaseRepository } = require('./baseRepository');
const { FighterRepository } = require('../repositories/fighterRepository');

class DetailRepository extends BaseRepository {
    constructor() {
        super('details');
    }
    
    create(data) {
        let fighter = FighterRepository.getOne((item)=>{ return (item.name == data.name) });
        let newData = { id: fighter.id, source: data.source, createdAt: new Date() } ;
        const list = this.dbContext.push(newData).write();
        return list.find(it => it.id === newData.id);            
    }

    update(id, dataToUpdate) {
        let detail = this.dbContext.find((item)=>{ return (item.id == id) }).value();
        if (detail) {
            dataToUpdate.updatedAt = new Date();
            return this.dbContext.find({ id }).assign(dataToUpdate).write();
        } else {
            return this.create(dataToUpdate);
        }
    }

}

exports.DetailRepository = new DetailRepository();