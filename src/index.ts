import express from "express"
import { json } from "body-parser"

const app = express()
app.use(json())

const PORT = process.env.port || 3000

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})
