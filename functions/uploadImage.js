const cloudinary = require("cloudinary").v2
const fs = require("fs")

exports.handler = async (event, context) => {
  let base64String = event.queryStringParameter.b64
  let uuid = event.queryStringParameter.uuid

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
