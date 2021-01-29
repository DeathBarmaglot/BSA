const { DetailRepository } = require('../repositories/detailRepository');

class DetailService {
    // OPTIONAL TODO: Implement methods to work with fights

    get(req, res, next) {
        try {
            const details = DetailRepository.getAll();
            res.data = details;
        } catch (err) {
            res.data = { error: true, message: err, status: 404 };  
        } finally {
            next()
        }
    }

    getId(req, res, next) {
        try {
            const idd = req.params.id;
            const detail = DetailRepository.getOne((item)=>{ return (item.id === idd) });
            if (detail) res.data = detail
            else res.data = { error:false, data:{ id:idd, source:"" }, status: 200 };
        }  catch (err) {
            res.data = { error: true, message: err, status: 404 };  
        } finally {
            next()
        }   
    }

    delete(req, res, next) {
        try {
            const id = req.params.id;
            const detail = DetailRepository.delete(id);
            res.data = detail;
        }  catch (err) {
            res.data = { error: true, message: err, status: 404 };  
        } finally {
            next()
        }   
    }

    post(req, res, next) {
        try {
            const newDetail = DetailRepository.create(req.body);
            res.data = newDetail;
        } catch (err) {
            res.data = { error: true, message: "Error while processing ...", status: 404 };
        } finally {
            next();
        }
    }

    put(req, res, next) {
        try {
            const idd = req.params.id;
            const updDetail = DetailRepository.update(idd, req.body);
            res.data = updDetail;
        } catch (err) {
            res.data = { error: true, message: "Error while processing ...", status: 404 };
        } finally {
            next();
        }
    }

}

module.exports = new DetailService();