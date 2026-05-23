exports.dashboard = (req, res) => res.render('dashboard', { title: 'Dashboard', user: req.user, roles: req.roles });
