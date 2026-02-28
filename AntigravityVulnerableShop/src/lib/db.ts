import Datastore from 'nedb-promises';
import path from 'path';

// Using a singleton pattern to ensure we only have one instance of each DB
class Database {
    private static instance: Database;
    public users: ReturnType<typeof Datastore.create>;
    public products: ReturnType<typeof Datastore.create>;

    private constructor() {
        const dataDir = path.join(process.cwd(), 'data');

        this.users = Datastore.create({
            filename: path.join(dataDir, 'users.db'),
            autoload: true,
        });

        this.products = Datastore.create({
            filename: path.join(dataDir, 'products.db'),
            autoload: true,
        });
    }

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

export const db = Database.getInstance();
