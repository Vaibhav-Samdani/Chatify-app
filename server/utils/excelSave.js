const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');


const saveToExcel = (name, email, message) => {
    // Specify the Excel file path
const filePath = path.join(__dirname, './Files/ContactUs.xlsx');

// Check if the file exists
if (fs.existsSync(filePath)) {
  // Read the existing Excel file
  const workbook = xlsx.readFile(filePath);
  
  // Select the first sheet (you can select any sheet by its name or index)
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  // Convert the worksheet data to a JSON array (array of objects)
  const data = xlsx.utils.sheet_to_json(worksheet);

  // Data to append (in the form of an object)
  const newData = { Name: name, Email: email, Message: message };

  // Append the new data to the existing data
  data.push(newData);

  // Convert the updated data back to a worksheet
  const updatedWorksheet = xlsx.utils.json_to_sheet(data);

  // Replace the old sheet with the updated sheet in the workbook
  workbook.Sheets[sheetName] = updatedWorksheet;

  // Write the updated workbook to the Excel file
  xlsx.writeFile(workbook, filePath);

  console.log('Data appended successfully');
} else {
  console.log('File does not exist');
}
}


module.exports = saveToExcel;