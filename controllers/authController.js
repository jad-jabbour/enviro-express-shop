const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const demoUsers = [{ username: 'admin', passwordHash: null, roles: [2001, 1984, 5150] }];

exports.loginPage = (req, res) => res.render('login', { title: 'Login', error: null });

exports.handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) return res.status(400).render('login', { title: 'Login', error: 'Username and password required' });
  if (!demoUsers[0].passwordHash) demoUsers[0].passwordHash = await bcrypt.hash('admin123', 10);
  const foundUser = demoUsers.find(person => person.username === user);
  const match = foundUser && await bcrypt.compare(pwd, foundUser.passwordHash);
  if (!match) return res.status(401).render('login', { title: 'Login', error: 'Wrong username or password' });

  const accessToken = jwt.sign(
    { UserInfo: { username: foundUser.username, roles: foundUser.roles } },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  );
  res.cookie('jwt', accessToken, { httpOnly: true, sameSite: 'Lax', maxAge: 15 * 60 * 1000 });
  res.redirect('/dashboard');
};
exports.logout = (req, res) => { res.clearCookie('jwt'); res.redirect('/'); };
