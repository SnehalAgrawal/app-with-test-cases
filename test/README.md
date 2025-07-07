### 🧨 **Never run tests directly against a production DB.**

Especially those that mutate data (`POST`, `PUT`, `DELETE`) — should **never** touch live data. Even a read-only test could cause:

- **Performance issues** (locking, slow queries)
- **Security risks**
- **Data leaks or inconsistencies** if logs or failures expose sensitive info

---

### ✅ Best Practices for Testing with Data in Different Environments

#### 🔹 1. **Use a Separate "Test" Database (Preferred)**

Create an isolated DB (e.g. `myapp_test`) that:

- Mirrors production schema
- Is cleaned before each test run
- Can be safely dropped or re-seeded

✅ Pros:

- Full realism with real MongoDB behavior
- No risk to production

```js
mongoose.connect(process.env.MONGO_TEST_URI); // e.g. mongodb://localhost/myapp_test
```

Use this DB **only during test runs**, usually set via `.env.test`.

---

#### 🔹 2. **Use Mongoose In-Memory Server (Mocked DB Layer)**

Use [`mongodb-memory-server`](https://github.com/nodkz/mongodb-memory-server) for fast, ephemeral testing.

✅ Pros:

- No actual MongoDB instance required
- Clean slate per test run
- Blazing fast

📦 Install:

```bash
npm install --save-dev mongodb-memory-server
```

🧪 Setup example:

```js
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongoServer;

before(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

after(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});
```

This runs a real MongoDB **in memory** — perfect for CI and local tests.

---

#### 🔹 3. **Use Mocks (e.g. Sinon) — Least Realistic**

If you're testing just the controller logic and don’t care about DB behavior, you can **mock the DB layer**:

```js
import sinon from 'sinon';
sinon.stub(Post, 'findById').resolves({ title: 'Test', body: '...' });
```

⚠️ Use this only for unit tests, **not integration or API tests**.

---

### 💡 For CI/CD

If you're using CI like GitHub Actions, GitLab, or Bitbucket:

- Use `mongodb-memory-server` or a dedicated Docker Mongo container
- Set `NODE_ENV=test` and load `env.test`

---
