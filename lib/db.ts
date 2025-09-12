// db.ts
import { openDB } from "idb";

const DB_NAME = "chatbot-db";
const STORE_NAME = "conversations";

export async function getDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    },
  });
}

export async function saveMessage(message: any) {
  const db = await getDB();
  return db.add(STORE_NAME, message);
}

export async function getMessages() {
  const db = await getDB();
  return db.getAll(STORE_NAME);
}

export async function clearMessages() {
  const db = await getDB();
  return db.clear(STORE_NAME);
}
