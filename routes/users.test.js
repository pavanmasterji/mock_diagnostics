const createServer = require("../server")
const app = createServer()

const path = require('path')
var Datastore = require('nedb');
let db = {}
db.users = new Datastore({ filename: path.join(__dirname, "../db/users"), autoload: true });

const supertest = require('supertest')

describe("Test the users path", () => {
    test("GET /users", async () => {
        await supertest(app)
            .get("/api/v1/users")
            .expect(200)
            .then((response) => {
                console.log(response.body)
                // Check the response type and length
                expect(typeof response.body === 'object').toBeTruthy()

                expect(response.body.hasOwnProperty('statuscode')).toBeTruthy()
                expect(response.body.statuscode).toBe('200')

                expect(response.body.hasOwnProperty('message')).toBeTruthy()
                expect(response.body.message).toBe('success')

                expect(response.body.hasOwnProperty('result')).toBeTruthy()
                expect(Array.isArray(response.body.result)).toBeTruthy()
                expect(response.body.result.length).toBe(2)


                // Check the response data
                // expect(response.body[0]._id).toBe(post.id)
                // expect(response.body[0].title).toBe(post.title)
                // expect(response.body[0].content).toBe(post.content)
            })
    })
})