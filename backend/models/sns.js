const db = require('../util/database');

module.exports = class SNS {
  constructor(name, snsTopic, command) {
    this.name = name;
    this.snsTopic = snsTopic;
    this.command = command;
  }

  static fetchAll() {
    return db.execute('SELECT * FROM `sns`;');
  }

  static findById(id) {
    return db.execute('SELECT * FROM `sns` WHERE id = ?', [id]);
  }

  static findByName(name) {
    return db.execute('SELECT * FROM `sns` WHERE name = ?', [name]);
  }

  static save(snsConfig) {
    return db.execute(
      'INSERT INTO `sns` (name, snsTopic, command) VALUES (?, ?, ?)',
      [snsConfig.name, snsConfig.snsTopic, snsConfig.command]
    );
  }

  static update(id, snsConfig) {
    return db.execute(
      'UPDATE `sns` SET `snsTopic` = ?, `command` = ? WHERE `id` = ?',
      [snsConfig.snsTopic, snsConfig.command, id]
    );
  }
};