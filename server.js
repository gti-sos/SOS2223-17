import express from 'express';
import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import session from 'express-session';
import fb from 'fb';

const app = express();

app.use(session({
  secret: 'Soum22',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
  clientID: '795371695359829',
  clientSecret: 'f5de5b4af2da1dcd6d182025a77fda62',
  callbackURL: 'http://localhost:5000/auth/facebook/callback',
  profileFields: ['id', 'name', 'email']
}, (accessToken, refreshToken, profile, done) => {
  done(null, { accessToken, profile });
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/profile', failureRedirect: '/' })
);

app.get('/profile', (req, res) => {
  const accessToken = req.user.accessToken;
  const facebook = new fb.Facebook({ accessToken });

  facebook.api('/me', (response) => {
    if (response && !response.error) {
      const profile = response;
      res.json(profile);
    } else {
      console.error('Error al obtener el perfil:', response.error);
      res.status(500).json({ error: 'Error al obtener el perfil' });
    }
  });
});


app.listen(5000, () => {
  console.log('Servidor iniciado en http://localhost:5000');
});
