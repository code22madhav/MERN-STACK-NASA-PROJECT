const request=require("supertest");
const app=require('../../app');

//we need to run the db before performing any test case therefore we used beforeAll to run db
// reason being earlier our db was connecting from server.js but this test directly run
// app.js therefore our bd was not starting therefore it's good practice to keep dbconnection
//seprate and then call it before performing test.
//also in package.json update the jest configuration add testEnvirnoment: Node
const { connectDB, disconnectDB }=require('../../services/mongo');
describe('Launches API', () => { 
    beforeAll(async()=>{
        await connectDB();
    })
    afterAll(async()=>{
        disconnectDB();
    })
    describe('TEST Get Launches', () => { 
    test('It should respond with 200 success', async()=>{
        await request(app).get('/v1/launches').expect(200).expect('Content-Type', /json/)
    });
 })

 //.expect(field, value) therefore a simple string in "..." or a regex will work in the place of value
 // thing written inside test('...', ()=>{}) is called a test assertion supertest helps to write them
 // in easy manner and check the response by chaining .expect 
 // BUT note if we want to check any response in the body, then JEST inbuit assertion should be used
 // which is expect.tobe or expect.toMatchObject

 describe('TEST Post Launches', () => { 
    const completeLaunchData={
        launchDate: new Date('Janury 22, 2026'),
        mission: "Kelper mission",
        rocket: "space X",
        target: "Kepler-62 f",
    }
    const LaunchDatawithoutDate={
        mission: "Kelper mission",
        rocket: "space X",
        target: "Kepler-62 f",
    }
    const DatawithInvalidLaunchData={
        launchDate: "Invalid date",
        mission: "Kelper mission",
        rocket: "space X",
        target: "Kepler-62 f",
    }
    test('It should respond with 201 success', async()=>{
        //this part is to send request
        const response=await request(app)
        .post('/v1/launches')
        .send(completeLaunchData)
        .expect(201)
        .expect('Content-Type', /json/)

        const requestDate= new Date(completeLaunchData.launchDate).valueOf();
        const responseDate= new Date(response.body.launchDate).valueOf();

        //this part is to check the response and here we are using JEST assertion since
        //we are checking data from response.body
        expect(responseDate).toBe(requestDate);
        expect(response.body).toMatchObject(LaunchDatawithoutDate);
    })
    test('It should catch missing required property', async() => { 
        const response=await request(app)
        .post('/v1/launches')
        .send(LaunchDatawithoutDate)
        .expect(400)
        .expect('Content-Type', /json/)

        expect(response.body).toStrictEqual({
            error: "Missing required launch property",
        });
     })

     test('It should catch invalid date', async()=>{
        const response=await request(app)
        .post('/v1/launches')
        .send(DatawithInvalidLaunchData)
        .expect(400)
        .expect('Content-Type', /json/)

        expect(response.body).toStrictEqual({
            error: "Invalid launch date",
        });
     })
  })
 })