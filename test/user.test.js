import * as chai from 'chai';
import { default as chaiHttp, request } from 'chai-http';
import app from '../src/server.js';
import User from '../src/models/User.js';
import { connectTestDB, disconnectTestDB } from './db-setup.js';

chai.use(chaiHttp);
chai.should();

describe('Users', () => {
  before(async () => {
    await disconnectTestDB();
    await connectTestDB();
  });

  after(async () => {
    await disconnectTestDB();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe('/GET users', () => {
    it('it should GET all the users', async () => {
      const res = await request.execute(app).get('/api/users');
      res.should.have.status(200);
      res.body.should.be.a('array');
      res.body.length.should.be.eql(0);
    });
  });

  describe('/POST user', () => {
    it('it should POST a user', async () => {
      const user = {
        name: 'Test User',
        email: 'test@example.com',
      };

      const res = await request.execute(app).post('/api/users').send(user);
      res.should.have.status(201);
      res.body.should.be.a('object');
      res.body.should.have.property('name').eql('Test User');
      res.body.should.have.property('email').eql('test@example.com');
    });
  });

  describe('/GET/:id user', () => {
    it('it should GET a user by the given id', async () => {
      const user = new User({
        name: 'Test User Get',
        email: 'get@example.com',
      });
      const savedUser = await user.save();

      const res = await request.execute(app).get('/api/users/' + savedUser._id);
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('name').eql('Test User Get');
      res.body.should.have.property('email').eql('get@example.com');
      res.body.should.have.property('_id').eql(savedUser._id.toString());
    });
  });

  describe('/PUT/:id user', () => {
    it('it should UPDATE a user given the id', async () => {
      const user = new User({
        name: 'Test User Update',
        email: 'update@example.com',
      });
      const savedUser = await user.save();

      const res = await request
        .execute(app)
        .put('/api/users/' + savedUser._id)
        .send({
          name: 'Updated User',
          email: 'updated@example.com',
        });

      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('name').eql('Updated User');
      res.body.should.have.property('email').eql('updated@example.com');
    });
  });

  describe('/DELETE/:id user', () => {
    it('it should DELETE a user given the id', async () => {
      const user = new User({
        name: 'Test User Delete',
        email: 'delete@example.com',
      });
      const savedUser = await user.save();

      const res = await request
        .execute(app)
        .delete('/api/users/' + savedUser._id);
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql('User deleted');
    });
  });
});
