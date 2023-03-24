/** @OnlyCurrentDoc */

function AfficherToast(message) {
   SpreadsheetApp.getActive().toast(message);
}

/**
 * Exemple de custom function
 * @customfunction
 */
function ExempleCustomFunction(){
  return "Hello"
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}