// this package behaves just like the mysql one, but uses async await instead of callbacks.
const mysql = require(`mysql-await`); // npm install mysql-await

// first -- I want a connection pool: https://www.npmjs.com/package/mysql#pooling-connections
var connPool = mysql.createPool({
  connectionLimit: 5, // it's a shared resource, let's not go nuts.
  host: "127.0.0.1",// this will work
  user: "",
  database: "",
  password: "", 
});

// later you can use connPool.awaitQuery(query, data) -- it will return a promise for the query results.

async function addContact(data){
    let name = data['name'];
    let email = data['email'];
    let date = data['date'];
    let subscribtion = data['choices'];
    let checkbox = data['checkbox'];

    return await connPool.awaitQuery('INSERT INTO contact (clientName, email, subsDate, subscribtion, checkbox) VALUES (?, ?, ?, ?, ?)',
      [name, email, date, subscribtion, checkbox]);


}

async function deleteContact(id){
 
    const result = await connPool.awaitQuery('DELETE FROM contact WHERE id = ?', [id]);
    
    // Check if any rows were affected (indicating a successful delete)
    if (result.affectedRows > 0) {
      return true;
    } else {
      return false;
    }

}

async function getContacts() {
  return await connPool.awaitQuery("select * from contact");


    
}


async function addSale(message) {
  return await connPool.awaitQuery('INSERT INTO sale (saleText, startTime, endTime, active) VALUES (?, NOW(), null, TRUE)', [message]);

    
}

async function endSale() {
  return await connPool.awaitQuery('update sale set active=FALSE, endTime=NOW() where active=TRUE;');



}

async function getRecentSales() {
  return await connPool.awaitQuery('Select saleText, active from sale order by startTime desc limit 3');


}
module.exports = {addContact, getContacts, deleteContact, addSale, endSale, getRecentSales}