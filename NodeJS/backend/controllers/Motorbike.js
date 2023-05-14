const data = require('../data.json');

//Get All motorbike
exports.getMotorcycles = (req, res) => {
    const id = parseInt(req.params.id);
    const motorcycles = data.motorcycles;
    res.json(motorcycles);
}
//Get motorbike by ID
exports.getMotorbike = async (req, res) => {
    const id = parseInt(req.params.id);
    const motorcycles = data.motorcycles;
    const motorbike = motorcycles.find(s => s.id === id);
    if (!motorbike) {
        res.status(404).send({ message: 'motorbike not found' });
    } else {
        res.status(200).json({
            message: 'motorbike found successfully',
            motorbike
        });
    }
};
