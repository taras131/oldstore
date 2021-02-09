const express = require(`express`)
const config = require(`config`)
const mongoose = require(`mongoose`)
const path = require(`patch`)

const app = express()
app.use(express.json({extended: true}))
app.use("/api/auth", require("./routes/auth.routes"))
app.use("/api/catalog", require("./routes/catalog.routes"))
if(process.env.NODE_ENV === `production`){
    app.use(`/`, express.static(path.join(__dirname, `client`, `build`)))
    app.get(`*`, (req,res)=>{
res.sendFile(path.resolve(__dirname,`client`, `build`, index.html))
    })
}
const PORT = config.get(`port`) || 5000
const start = async() => {
    try {
    await mongoose.connect(config.get(`mongoURL`))
        app.listen(PORT, () => console.log(`started app port: ${PORT}`)),{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }
    } catch(e) {
    console.log(`server error`, e.message)
        process.exit(1)
    }
}
start()
