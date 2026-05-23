const services = require('../data/services.json');
exports.getAllServices = (req, res) => res.json(services);
exports.getService = (req, res) => {
  const service = services.find(item => item.id === Number(req.params.id));
  if (!service) return res.status(404).json({ message: 'Service not found' });
  res.json(service);
};
exports.createService = (req, res) => {
  const { name, tag, price, description } = req.body;
  if (!name || !description) return res.status(400).json({ message: 'Name and description required' });
  const newService = { id: services.length + 1, name, tag, price, description };
  services.push(newService);
  res.status(201).json(newService);
};
