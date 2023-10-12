import "reflect-metadata"
import express from "express"
import router from "./controller"
import handleError from "./middleware/handle-error"
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())
app.get("/healthcheck", (_req, res) => {
  res.send("OK")
})
app.use("/api", router)
app.use(handleError)
app.listen(8000, () => {
  console.log("Server is running on port 8000")
})
