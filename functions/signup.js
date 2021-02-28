const firebase = require("firebase/app")
require("firebase/auth")

exports.handler = async (event, context) => {
  const firebaseConfig = {
    apiKey: "AIzaSyBoty3pRCbISFWjlGJrKcCTTIMu-klzLjU",
    authDomain: "eightbitfish-testing.firebaseapp.com",
    projectId: "eightbitfish-testing",
    storageBucket: "eightbitfish-testing.appspot.com",
    messagingSenderId: "761101438545",
    appId: "1:761101438545:web:1de2edbb622df361b87270",
    measurementId: "G-H31TQPHPMV",
  }

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
  }

  const email = event.queryStringParameters.email
  const password = event.queryStringParameters.password

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(creds => {
      console.log(creds.user.uid)
    })
    .catch(err => {
      console.log(err.message)
    })
}
