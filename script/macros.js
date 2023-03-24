// Exemple d'utilisation d'un macro pour la création des fonction
function testmacro3() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('B7').activate();
  spreadsheet.getCurrentCell().setValue('1');
  spreadsheet.getActiveRangeList().setFontWeight('bold');
};