const admin = require("firebase-admin")
const serviceAccount = require("./ServiceKeyAccount.json")

exports.handler = async (event, context) => {
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  }

  const db = admin.firestore()

  let email = event.queryStringParameters.email
  let uid = event.queryStringParameters.uid

  const res = await db.collection("users").doc(uid).set({
    email: email,
    fishes: [],
  })

  return {
    statusCode: 200,
    body: JSON.stringify({ id: res.id }),
  }
}
