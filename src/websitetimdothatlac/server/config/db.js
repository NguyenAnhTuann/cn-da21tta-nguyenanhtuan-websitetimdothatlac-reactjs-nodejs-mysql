const mysql = require('mysql2');


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'websitetimdothatlac'
});

db.connect(err => {
  if (err) {
    console.error('Không thể kết nối tới cơ sở dữ liệu: ', err);
  } else {
    console.log('Kết nối tới cơ sở dữ liệu MySQL thành công!');
  }
});

module.exports = db;
