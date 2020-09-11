modules.export = {
  "type": "postgres",
  "url": process.env.DATABASE_URL,
  "entities": [
    "./src/modules/**/infra/typeorm/entities/*.ts"
  ],
  "migrations": [
    "./src/shared/infra/typeorm/migrations/*.ts"
  ],
  "seeds": [
    "./src/shared/infra/typeorm/seeds/*.ts"
  ],
  "cli": {
    "migrationsDir": "./src/shared/infra/typeorm/migrations"
  }
}