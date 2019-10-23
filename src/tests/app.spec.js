/* eslint-disable no-undef */
import 'dotenv/config';
import request from 'supertest';
// import mongoose from 'mongoose';
import app from '../app';


// afterAll(async () => {
//   await mongoose.connection.close();
// });

describe('App js', () => {
  // beforeAll(async () => {
  //   const portNum = 80;
  //   if (process.env.NODE_ENV === 'test') {
  //     app.listen(portNum, () => {
  //       console.log(`Server is live on PORT ${portNum}`);
  //     });
  //   }
  // });
  // afterAll((done) => {
  //   mongoose.connection.close();
  //   done();
  // });
  // beforeEach(() => {
  //   jest.setTimeout(10000);
  // });


  it('should display a welcome message successfully', async (done) => {
    const res = await request(app).get('/api');
    expect(res.status).toEqual(200);
    expect(res.body.data).toEqual('Welcome to the mock eateries API');
    done();
  }, 30000);

  it('should return 404 if route is not found', async (done) => {
    const res = await request(app).get('*');
    expect(res.status).toEqual(404);
    expect(res.body.error).toEqual('Sorry, page not found!');
    done();
  }, 30000);

  // afterAll(async () => {
  //   await new Promise((resolve) => setTimeout(() => resolve(), 500)); // avoid jest open handle error
  // });
});

// afterAll((done) => {
//   mongoose.connection.close();
//   done();
// });
