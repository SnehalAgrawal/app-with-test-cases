import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer = null;

export async function connectTestDB() {
  const useInMemory = process.env.USE_IN_MEMORY_DB === 'true';

  if (!mongoServer) {
    if (useInMemory) {
      mongoServer = await MongoMemoryServer.create();
      const uri = mongoServer.getUri();
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('[TestDB] Connected to in-memory MongoDB');
    } else {
      const uri = process.env.MONGO_TEST_URI;
      if (!uri) throw new Error('Missing MONGO_TEST_URI in env');
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('[TestDB] Connected to real test DB:', uri);
    }
  }
}

export async function disconnectTestDB() {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
    console.log('[TestDB] Stopped in-memory MongoDB');
  }
  mongoServer = null;
}
