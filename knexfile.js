module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: "./mydb.sqlite"
    }
  },
  production: {
    client: 'pg',
    connection: {
      host     : '127.0.0.1',
      user     : 'your_database_user',
      password : 'your_database_password',
      database : 'myapp_test'
    }
  }
};