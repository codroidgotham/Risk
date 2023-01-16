import * as express from 'express'
import * as mongoDB from 'mongodb'

const app = express();
app.route("/").get((req: express.Request, res: express.Response) => {

    (async function run() {
        const client = new mongoDB.MongoClient("mongodb://127.0.0.1:27017");
        await client.connect()
        const db: mongoDB.Db = client.db("RAdatabase")
        const col: mongoDB.Collection = db.collection("Classes")
        const result = await col.find({}).toArray()
        console.log("serviced lll request at", req.baseUrl)
        client.close();
        res.send(result)
    })().catch((err) => console.log)


})
app.listen(9000, () => console.log("listening on 9000"))