const { BadRequestError } = require("../expressError");

// THIS NEEDS SOME GREAT DOCUMENTATION.
// This function makes selective update queries

// To update DB this function is going to make the SET clause

// Example:
// Data to update
//   users = {
//     "first_name":"new_first_name",
//     "last_name": "new_last_name"
// }

// //  Maps js style data fields to DB column names
// jsToSql = {
//   "first_name":"first_name",
//   "age": "32"
// }

// returns {Object} {sqlSETcolumns, dataToUpdate}


function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
