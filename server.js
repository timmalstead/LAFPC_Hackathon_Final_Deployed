const express = require("express")
const session = require("express-session")
const bodyParser = require("body-parser")
const path = require("path")
const cors = require("cors")

const app = express()
require("dotenv").config()

const PORT = process.env.S_PORT || 8000

const adminRouter = require("./controller/admin.js")
const dataRouter = require("./controller/data.js")

require("dotenv").config()
require("./db/db")

app.use(express.static(path.join(__dirname, "build")))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json())
app.use(
  session({
    secret: "foodsafety",
    resave: false,
    saveUninitialized: false
  })
)

const corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

app.use("/admin", adminRouter)
app.use("/data", dataRouter)

app.get("/", (req, res) => {
  res.send("welcome")
})

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"))
})

app.listen(PORT, err => {
  console.log(err || `server listening on port ${PORT}`)
})
