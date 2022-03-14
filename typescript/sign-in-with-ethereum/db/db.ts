import Redis, { Redis as RedisClient } from "ioredis";

const REDIS_HOST = "localhost";

interface IDatabase {
  getUser(address: string): Promise<string | null>;
  setUser(address: string, user: string): Promise<void>;

  generateChallenge(address: string): Promise<string>;
}

export default class Database implements IDatabase {
  private db: RedisClient;

  constructor() {
    this.db = new Redis(6379, REDIS_HOST);
  }

  public async getUser(address: string): Promise<string | null> {
    return this.db.get(address);
  }

  public async setUser(address: string, user: string): Promise<void> {
    await this.db.set(address, user);
  }

  public async generateChallenge(address: string): Promise<string> {
    const challenge = Math.random().toString(36).substring(2, 15);
    await this.db.set(`${address}:challenge`, challenge);
    return challenge;
  }

  public async getChallenge(address: string): Promise<string | null> {
    return this.db.get(`${address}:challenge`);
  }
}
