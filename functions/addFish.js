const admin = require("firebase-admin")
const serviceAccount = require("./ServiceKeyAccount.json")

exports.handler = async (event, context) => {
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  }

  const db = admin.firestore()

  fish = {
    mergedImage: event.queryStringParameters.mergedImag,
    backgroundImage: event.queryStringParameters.backgroundImage,
    hasBackground: event.queryStringParameters.hasBackground,
    rarity: event.queryStringParameters.rarity,
    fishType: event.queryStringParameters.fishType,
    fishColor: event.queryStringParameters.fishColor,
    attributes: event.queryStringParameters.attributes,
    traits: event.queryStringParameters.traits,
  }

  const userRef = await db.collection("users").doc(userID)
  const doc = await userRef.get()
  data = doc.data()
  fishes = data.fishes

  fishes.push(fish)

  await userRef.update({ fishes: fishes })

  return {
    statusCode: 200,
    body: JSON.stringify({ status: "done" }),
  }
}
