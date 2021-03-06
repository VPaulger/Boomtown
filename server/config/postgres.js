const { Pool } = require('pg');

module.exports = (app) => {
  /**
   * @TODO: Configuration Variables
   *
   *  Retrieve the necessary information to connect to Postgres
   *  For example: app.get('PG_DB')
   */
  return new Pool({
    /**
     *  @TODO: Supply the correct configuration values to connect to postgres
     */
    user: app.get('PG_USER'),
    host: app.get('PG_HOST'),
    database: app.get('PG_DB'),
    password: app.get('PG_PASSWORD'),
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
  });
};
