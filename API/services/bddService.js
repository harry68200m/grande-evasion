var sqlite3 = require('sqlite3');

const db = new sqlite3.Database('MyDB.db')

db.serialize(function () {
  db.run('CREATE TABLE IF NOT EXISTS portillon (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, nom TEXT NOT NULL, guid INTEGER UNIQUE, uuid TEXT, status INTEGER)')
  db.run('CREATE TABLE IF NOT EXISTS evenement (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, date DATETIME NOT NULL, status INTEGER NOT NULL, idPortillon REFERENCES portillon(id) )')
//    db.all('SELECT ID, FIRSTNAME, LASTNAME FROM datas', function (err, row) {
//      if (err) {
//        console.log(err)
//      } else {
//      if (row.length === 0) {
//        var stmt=db.prepare('INSERT INTO datas VALUES (?, ?, ?)')
//        var obj= [{ id:'1', firstname:'FirstName', lastname:'LastName' }]
//        for (var i in obj) {
//           stmt.run(obj[i].id, obj[i].firstname, obj[i].lastname)
//        }
//        stmt.finalize()
//        } else {
//         console.log('Database already exists')
//        }
//      }
//   })
})

module.exports.executeSQLCommand = async (sql) => {
    console.log("SQL : " + sql);
    return new Promise((resolve, reject) => {
        db.all(sql, [] , (err, datas) => {
            // if (err) {
            //     throw err;
            // }
            console.log(datas);
            resolve(datas);
        });
    });
}


