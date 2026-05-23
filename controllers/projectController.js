const projects = require('../data/projects.json');
exports.getAllProjects = (req, res) => res.json(projects);
