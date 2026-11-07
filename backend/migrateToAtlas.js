
const mongoose = require("mongoose");
const dns = require("dns");
require("dotenv").config();

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const LOCAL_URI =
  "mongodb://127.0.0.1:27017/CollegeTimetableDB";

async function migrateDatabase() {
  let localConnection;
  let atlasConnection;

  try {
    console.log("Connecting to local MongoDB...");

    localConnection = await mongoose
      .createConnection(LOCAL_URI)
      .asPromise();

    console.log("Local MongoDB connected successfully!");

    console.log("Connecting to MongoDB Atlas...");

    atlasConnection = await mongoose
      .createConnection(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 20000,
      })
      .asPromise();

    console.log("MongoDB Atlas connected successfully!");

    const localDB = localConnection.db;
    const atlasDB = atlasConnection.db;

    const collections = await localDB
      .listCollections()
      .toArray();

    console.log("\nStarting database migration...\n");

    for (const collectionInfo of collections) {
      const collectionName = collectionInfo.name;

      const sourceCollection = localDB.collection(collectionName);
      const targetCollection = atlasDB.collection(collectionName);

      const documents = await sourceCollection
        .find({})
        .toArray();

      console.log(
        `Collection: ${collectionName} | Local documents: ${documents.length}`
      );

      if (documents.length === 0) {
        console.log("Skipped: Collection is empty.\n");
        continue;
      }

      const existingCount = await targetCollection.countDocuments();

      if (existingCount > 0) {
        console.log(
          `Skipped: Atlas already contains ${existingCount} documents.\n`
        );
        continue;
      }

      await targetCollection.insertMany(documents);

      console.log(
        `Successfully copied ${documents.length} documents!\n`
      );
    }

    console.log("Database migration process completed!");

  } catch (error) {
    console.error("\nMigration failed:", error.message);
  } finally {
    if (localConnection) {
      await localConnection.close();
    }

    if (atlasConnection) {
      await atlasConnection.close();
    }

    console.log("Database connections closed.");
  }
}

migrateDatabase();
