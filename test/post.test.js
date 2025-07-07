import * as chai from 'chai';
import { default as chaiHttp, request } from 'chai-http';
import app from '../src/server.js';
import Post from '../src/models/Post.js';
import User from '../src/models/User.js';
import { connectTestDB, disconnectTestDB } from './db-setup.js';

chai.use(chaiHttp);
chai.should();

describe('Posts', () => {
  let testUser = null;

  before(async () => {
    await disconnectTestDB();
    await connectTestDB();
  });

  after(async () => {
    await disconnectTestDB();
  });

  beforeEach(async () => {
    await Post.deleteMany({});
    await User.deleteMany({});
    const newUser = new User({
      name: 'Test User for Post',
      email: 'posttest@example.com',
    });
    testUser = await newUser.save();
  });

  describe('/GET posts', () => {
    it('it should GET all the posts', async () => {
      const res = await request.execute(app).get('/api/posts');
      res.should.have.status(200);
      res.body.should.be.a('array');
      res.body.length.should.be.eql(0);
    });
  });

  describe('/POST post', () => {
    it('it should POST a post', async () => {
      const post = {
        title: 'Test Post',
        body: 'This is a test post body.',
        userId: testUser._id,
      };
      const res = await request.execute(app).post('/api/posts').send(post);
      res.should.have.status(201);
      res.body.should.be.a('object');
      res.body.should.have.property('title').eql('Test Post');
      res.body.should.have.property('body').eql('This is a test post body.');
      res.body.should.have.property('userId').eql(testUser._id.toString());
    });
  });

  describe('/GET/:id post', () => {
    it('it should GET a post by the given id', async () => {
      const post = new Post({
        title: 'Test Post Get',
        body: 'This is a test post body for get.',
        userId: testUser._id.toString(),
      });
      const testPost = await post.save();

      const res = await request.execute(app).get('/api/posts/' + testPost._id);
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('title').eql('Test Post Get');
      res.body.should.have
        .property('body')
        .eql('This is a test post body for get.');
      res.body.should.have.property('_id').eql(testPost._id.toString());
      res.body.should.have.property('userId');
      res.body.userId.should.have.property('name').eql(testUser.name);
    });
  });

  describe('/PUT/:id post', () => {
    it('it should UPDATE a post given the id', async () => {
      const post = new Post({
        title: 'Test Post Update',
        body: 'This is a test post body for update.',
        userId: testUser._id,
      });
      const savedPost = await post.save();

      const res = await request
        .execute(app)
        .put('/api/posts/' + savedPost._id)
        .send({
          title: 'Updated Post',
          body: 'This is an updated post body.',
        });

      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('title').eql('Updated Post');
      res.body.should.have
        .property('body')
        .eql('This is an updated post body.');
    });
  });

  describe('/DELETE/:id post', () => {
    it('it should DELETE a post given the id', async () => {
      const post = new Post({
        title: 'Test Post Delete',
        body: 'This is a test post body for delete.',
        userId: testUser._id,
      });
      const savedPost = await post.save();

      const res = await request
        .execute(app)
        .delete('/api/posts/' + savedPost._id);
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql('Post deleted');
    });
  });
});
