const admin = require("firebase-admin")
const serviceAccount = require("./ServiceKeyAccount.json")

exports.handler = async (event, context) => {
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  }

  const db = admin.firestore()

  let userID = event.queryStringParameters.userID

  const userRef = db.collection("users").doc(userID)
  const doc = await userRef.get()

  return {
    statusCode: 200,
    body: JSON.stringify(doc.data()),
  }
}
