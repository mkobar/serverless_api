const admin = require("firebase-admin")
const serviceAccount = require("./ServiceKeyAccount.json")

exports.handler = async (event, context) => {
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  }

  const db = admin.firestore()

  //fishID = event.queryStringParameters.fishID

  let userID = event.queryStringParameters.userID

  const fish = {
    fishID: event.queryStringParameters.fishID,
    name: event.queryStringParameters.name,
    rarity: event.queryStringParameters.rarity,
    rarityIndex: event.queryStringParameters.rarityIndex,
    color: event.queryStringParameters.color,
    AccessoryA: event.queryStringParameters.AccessoryA,
    AccessoryB: event.queryStringParameters.AccessoryB,
    AccessoryC: event.queryStringParameters.AccessoryC,
    AccessoryD: event.queryStringParameters.AccessoryD,
    numberOfAccessories: event.queryStringParameters.numberOfAccessories,
    image: event.queryStringParameters.image,
    bgimage: event.queryStringParameters.bgimage,
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
