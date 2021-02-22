exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      test: "this is just a test",
    }),
  }
}
