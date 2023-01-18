import * as express from 'express'
import * as mongoDB from 'mongodb'
const cors=require('cors')
import bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json())
app.use(cors())
app.route("/").get((req: express.Request, res: express.Response) => {
    
    console.log("getting");

    (async function run() {
        console.log("inside");
        const client = new mongoDB.MongoClient("mongodb://127.0.0.1:27017");
        await client.connect()
        console.log("connected");
        const db: mongoDB.Db = client.db("RAdatabase")
        const col: mongoDB.Collection = db.collection("Classes")
        const result = await col.find({}).toArray()
        console.log("serviced lll request at", req.baseUrl)
        client.close();
        
        res.send(result)
    })().catch((err) => console.log)

    
})
app.route("/classes").post((req: express.Request, res: express.Response) => {

    const {Name,classId,Confidentiality,Integrity,Availability}=req.body;
    const obj={"Name":Name,"classId":classId,"Confidentiality":Confidentiality,"Integrity":Integrity,"Availability":Availability};
    
   
    (async function run() {
        const client = new mongoDB.MongoClient("mongodb://127.0.0.1:27017");
        await client.connect()
        const db: mongoDB.Db = client.db("RAdatabase")
        const col: mongoDB.Collection = db.collection("Classes")
        const result = await col.insertOne(obj);
        console.log("serviced lll request at", req.baseUrl)
        client.close();
        res.send(result)
    })().catch((err) => console.log)


})
app.listen(9000, () => console.log("listening on 9000"))