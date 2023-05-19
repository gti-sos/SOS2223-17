import express from 'express';
import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import session from 'express-session';
import fb from 'fb';

//Creación de una instancia de la aplicación Express

const app = express();

//Configuración de la sesión de Express:


app.use(session({
  secret: 'Soum22',
  resave: true,
  saveUninitialized: true
}));

//Inicialización de Passport

app.use(passport.initialize());

//Configuración de la sesión de Passport:

app.use(passport.session());


//Definición de la estrategia de autenticación de Facebook utilizando FacebookStrategy de Passport.js

passport.use(new FacebookStrategy({
  clientID: '795371695359829',
  clientSecret: 'f5de5b4af2da1dcd6d182025a77fda62',
  callbackURL: 'http://localhost:5000/auth/facebook/callback',
  profileFields: ['id', 'name', 'email']
}, (accessToken, refreshToken, profile, done) => {
  done(null, { accessToken, profile });
}));

//Serialización: se guarda el usuario en la sesión.


passport.serializeUser((user, done) => {
  done(null, user);
});

//Deserialización: se recupera el usuario de la sesión.


passport.deserializeUser((user, done) => {
  done(null, user);
});

//Ruta para iniciar el proceso de autenticación de Facebook:


app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));


//Ruta de callback para recibir la respuesta de Facebook y autenticar al usuario:


app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/profile', failureRedirect: '/' })
);


//Ruta para mostrar el perfil del usuario autenticado:

app.get('/profile', (req, res) => {
    // Se obtiene el token de acceso del usuario autenticado

  const accessToken = req.user.accessToken;

    // Se crea una instancia de la API de Facebook utilizando el token de acceso

  const facebook = new fb.Facebook({ accessToken });

    // Se realiza una solicitud a la API de Facebook para obtener el perfil del usuario


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


///me/insights  es la ruta de la API de Facebook para obtener las estadísticas del perfil

app.listen(5000, () => {
  console.log('Servidor iniciado en http://localhost:5000');
});
