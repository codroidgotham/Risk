import * as express from 'express'
import * as mongoDB from 'mongodb'
const cors = require('cors')
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

    const { Name, classId, Confidentiality, Integrity, Availability } = req.body;
    const obj = { "Name": Name, "classId": classId, "Confidentiality": Confidentiality, "Integrity": Integrity, "Availability": Availability };


    (async function run() {
        const client = new mongoDB.MongoClient("mongodb://127.0.0.1:27017");
        await client.connect()
        const db: mongoDB.Db = client.db("RAdatabase")
        const col: mongoDB.Collection = db.collection("Classes")
        const result = await col.insertOne(obj);
        console.log("inserted obj ", req.body)
        client.close();
        res.send(result)
    })().catch((err) => console.log)


})
app.route("/classes/:id").delete((req: express.Request, res: express.Response) => {

    // const {Name,classId,Confidentiality,Integrity,Availability}=req.body;
    // const obj={"Name":Name,"classId":classId,"Confidentiality":Confidentiality,"Integrity":Integrity,"Availability":Availability};


    (async function run() {
        const client = new mongoDB.MongoClient("mongodb://127.0.0.1:27017");
        await client.connect()
        const db: mongoDB.Db = client.db("RAdatabase")
        const col: mongoDB.Collection = db.collection("Classes")
        const result = (await col.deleteOne({ "classId": Number(req.params["id"]) })).acknowledged
        console.log("deleted obj ", req.params["id"])
        client.close();
        res.send(result)
    })().catch((err) => console.log)


})
app.route('/classes/:id').patch((req, res) => {
    console.log("in updated")
    const { Name, classId, Confidentiality, Integrity, Availability } = req.body;
    const obj = { "Name": Name, "Confidentiality": Confidentiality, "Integrity": Integrity, "Availability": Availability };
    (async function run() {
        const client = new mongoDB.MongoClient("mongodb://127.0.0.1:27017");
        await client.connect()
        const db: mongoDB.Db = client.db("RAdatabase")
        const col: mongoDB.Collection = db.collection("Classes")
        console.log("obj", obj)
        const result = (await col.updateOne({ "classId": parseInt(req.params["id"]) }, { $set: obj }, { upsert: true })).acknowledged
        console.log("updated obj ", req.body)
        console.log("result", result)
        client.close();
        res.send(result)
    })().catch((err) => console.log)


})

app.route('/controls').post((req: express.Request, res: express.Response) => {

    const obj = { "controlId": req.body.controlId, "statement": req.body.statement };

    (async function run() {
        const client = new mongoDB.MongoClient("mongodb://127.0.0.1:27017");
        await client.connect()
        const db: mongoDB.Db = client.db("RAdatabase")
        const col: mongoDB.Collection = db.collection("Controls")
        console.log("obj", obj)
        const result = (await col.insertOne(obj)).acknowledged
        console.log("updated obj ", req.body)
        console.log("result", result)
        client.close();
        res.send(result)
    })().catch((err) => console.log)




})

app.route('/threats').post((req: express.Request, res: express.Response) => {

    const obj = { "threatId": req.body.controlId, "statement": req.body.statement };

    (async function run() {
        const client = new mongoDB.MongoClient("mongodb://127.0.0.1:27017");
        await client.connect()
        const db: mongoDB.Db = client.db("RAdatabase")
        const col: mongoDB.Collection = db.collection("Threats")
        console.log("obj", obj)
        const result = (await col.insertOne(obj)).acknowledged
        console.log("updated obj ", req.body)
        console.log("result", result)
        client.close();
        res.send(result)
    })().catch((err) => console.log)




})

app.route('/vulnerabilities').post((req: express.Request, res: express.Response) => {

    const obj = { "vulnerabilityId": req.body.controlId, "statement": req.body.statement, "threatIds": req.body.threatIds };

    (async function run() {
        const client = new mongoDB.MongoClient("mongodb://127.0.0.1:27017");
        await client.connect()
        const db: mongoDB.Db = client.db("RAdatabase")
        const col: mongoDB.Collection = db.collection("Vulnerabilities")
        console.log("obj", obj)
        const result = (await col.insertOne(obj)).acknowledged
        console.log("updated obj ", req.body)
        console.log("result", result)
        client.close();
        res.send(result)
    })().catch((err) => console.log)




})

app.route('/vulnerabilities/:id').patch((req: express.Request, res: express.Response) => {

    const obj = { "vulnerabilityId": req.body.controlId, "statement": req.body.statement, "threatIds": req.body.threatIds };

    (async function run() {
        const client = new mongoDB.MongoClient("mongodb://127.0.0.1:27017");
        await client.connect()
        const db: mongoDB.Db = client.db("RAdatabase")
        const col: mongoDB.Collection = db.collection("Vulnerabilities")
        console.log("obj", obj)
        const result = (await col.updateOne({ "vulnerabilityId": Number(req.params['id']) }, obj)).acknowledged
        console.log("updated obj ", req.body)
        console.log("result", result)
        client.close();
        res.send(result)
    })().catch((err) => console.log)




})

app.route('/threats').get((req: express.Request, res: express.Response) => {



    (async function run() {
        const client = new mongoDB.MongoClient("mongodb://127.0.0.1:27017");
        await client.connect()
        const db: mongoDB.Db = client.db("RAdatabase")
        const col: mongoDB.Collection = db.collection("Threats")

        const result = (await col.find({}).toArray())

        client.close();
        res.send(result)
    })().catch((err) => console.log)

})

app.route('/controls').get((req: express.Request, res: express.Response) => {



    (async function run() {
        const client = new mongoDB.MongoClient("mongodb://127.0.0.1:27017");
        await client.connect()
        const db: mongoDB.Db = client.db("RAdatabase")
        const col: mongoDB.Collection = db.collection("Controls")

        const result = (await col.find({}).toArray())

        client.close();
        res.send(result)
    })().catch((err) => console.log)

})

app.route('/vulnerabilities').get((req: express.Request, res: express.Response) => {



    (async function run() {
        const client = new mongoDB.MongoClient("mongodb://127.0.0.1:27017");
        await client.connect()
        const db: mongoDB.Db = client.db("RAdatabase")
        const col: mongoDB.Collection = db.collection("Vulnerabilities")

        const result = (await col.find({}).toArray())

        client.close();
        res.send(result)
    })().catch((err) => console.log)

})






app.listen(9000, () => console.log("listening on 9000"))