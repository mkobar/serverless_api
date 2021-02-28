const cloudinary = require("cloudinary").v2
const fs = require("fs")

exports.handler = async (event, context) => {
  let base64String = event.queryStringParameters.baseString
  let uuid = event.queryStringParameters.uuid

  let base64Image = base64String.split(";base64,").pop()

  fs.writeFile(
    `${uuid}.png`,
    base64Image,
    { encoding: "base64" },
    function (err) {
      console.log("File created")
    }
  )

  cloudinary.config({
    cloud_name: "djjniomxk",
    api_key: "291326534233641",
    api_secret: "Fucd7uo9g90kcx3492vj7JflRMk",
  })

  let x = await cloudinary.uploader.upload(`./${uuid}.png`, (error, result) => {
    return result
  })

  return {
    statusCode: 200,
    body: JSON.stringify({ imageURL: x.url }),
  }
}

// exports.handler = async (event, context) => {
//   let name = event.queryStringParameters.name

//   return {
//     statusCode: 200,
//     body: JSON.stringify({ ping: name }),
//   }
// }
