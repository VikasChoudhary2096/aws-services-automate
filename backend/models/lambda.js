const db = require('../util/database');

module.exports = class Lambda {
  constructor(id, name, dir, command) {
    this.id = id;
    this.name = name;
    this.dir = dir;
    this.command = command;
  }

  static fetchAll() {
    return db.execute('SELECT * FROM `lambda`;');
  }

  static findById(id) {
    return db.execute('SELECT * FROM `lambda` WHERE id = ?', [id]);
  }

  static findByName(name) {
    return db.execute('SELECT * FROM `lambda` WHERE name = ?', [name]);
  }

  static save(lambdaConfig) {
    return db.execute(
      'INSERT INTO `lambda` (name, dir, command) VALUES (?, ?, ?)',
      [lambdaConfig.name, lambdaConfig.dir, lambdaConfig.command]
    );
  }

  static update(id, lambdaConfig) {
    return db.execute(
      'UPDATE `lambda` SET `dir` = ?, `command` = ?  WHERE `id` = ?',
      [lambdaConfig.dir, lambdaConfig.command,id]
    );
  }

};