exports.up = function(knex) {
    return knex.schema.createTable('Users', tbl => {
        tbl.increments()
        tbl.string('username', 100)
        .notNullable()
        .index()
        .unsigned()
  
        tbl.string('Password', 100)
        .notNullable()
  
  
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExist('Users')
  };