import { MongoClient } from "mongodb";

export function getClient() {
  const uri = "mongodb://localhost:27017";

  return new MongoClient(uri);
}
