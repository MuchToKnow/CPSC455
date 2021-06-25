const admin = require('firebase-admin');
const firebase = require('firebase');

admin.initializeApp();

const firebaseConfig = {
  apiKey: "AIzaSyBbGwN6ZwSfF0V2_VCPvs55frVSc8JP32Q",
  authDomain: "cpsc455.firebaseapp.com",
  projectId: "cpsc455",
  storageBucket: "cpsc455.appspot.com",
  messagingSenderId: "537947113977",
  appId: "1:537947113977:web:acbd83278b36d678165528",
  measurementId: "G-2Q1G5P5BJ3"
};

firebase.initializeApp(firebaseConfig);

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (token && token.split(' ')[0] === 'Bearer') {
    admin.auth().verifyIdToken(token.split(' ')[1])
      .then((decodedToken) => {
        req[user] = {
          uid: decodedToken.uid,
          email: decodedToken.email,
        };
        return next();
      }).catch(() => {
        return res.status(401).json({ error: 'Not authorized' });
      });
  } else {
    return res.status(403).json({ error: 'Bearer token authorization header not found' });
  }
};

module.exports = authMiddleware;
