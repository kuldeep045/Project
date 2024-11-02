import connectDB from "./db/index.js"
import dotenv from 'dotenv'
import app from './app.js'
dotenv.config({
    path:'./.env'
})


connectDB()
.then(()=>{

    app.listen(process.env.PORT, () => {
        console.log("Server is listening on port ", process.env.PORT || 3000)
    })

})
.catch((err)=>{
console.log("ERROR TALKING TO DB: ", err)
})