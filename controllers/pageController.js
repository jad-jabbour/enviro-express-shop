const services = require('../data/services.json');
const projects = require('../data/projects.json');
exports.home = (req, res) => res.render('index', { title: 'Ottos Green Works', services, projects });
exports.about = (req, res) => res.render('about', { title: 'About Us' });
exports.contact = (req, res) => res.render('contact', { title: 'Contact' });
