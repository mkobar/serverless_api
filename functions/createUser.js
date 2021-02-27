const admin = require("firebase-admin")
const serviceAccount = require("./ServiceKeyAccount.json")

exports.handler = async (event, context) => {
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  }

  const db = admin.firestore()

  let username = event.queryStringParameters.username
  let password = event.queryStringParameters.password

  const res = await db.collection("users").add({
    username: username,
    password: password,
    fishes: [],
  })

  return {
    statusCode: 200,
    body: JSON.stringify({ id: res.id }),
  }
}
