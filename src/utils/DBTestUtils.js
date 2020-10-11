import mongoose from 'mongoose';
import { MongoMemoryReplSet } from 'mongodb-memory-server';

jest.setTimeout(30000);

const replSet = new MongoMemoryReplSet({
  replSet: { storageEngine: 'wiredTiger' }
});

export const connect = async () => {
  await replSet.waitUntilRunning();

  mongoose.Promise = Promise;
  replSet.getUri().then((mongoUri) => {
    const mongooseOpts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    };

    mongoose.connect(mongoUri, mongooseOpts);

    mongoose.connection.on('error', (e) => {
      if (e.message.code === 'ETIMEDOUT') {
        mongoose.connect(mongoUri, mongooseOpts);
      }
    });
  });
};

export const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await replSet.stop();
};

export const clearDatabase = async () => {
  const { collections } = mongoose.connection;
  const deleteCollectionJob = [];
  const collectionsKey = Object.keys(collections);

  collectionsKey.forEach((key) => {
    const collection = collections[key];
    deleteCollectionJob.push(collection.deleteMany());
  });

  await Promise.resolve();
  await Promise.all(deleteCollectionJob);
};
