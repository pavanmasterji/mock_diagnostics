const express = require("express")
const routes = require("./routes")

function createServer() {
	const app = express()
	app.use(express.json())
	app.use("/api/v1", routes)
	return app
}

module.exports = createServer