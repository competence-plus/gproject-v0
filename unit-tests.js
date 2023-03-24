function divideThenRound(numerator, denominator) {
  return numerator/denominator;
}



// Optional for easier use.

var QUnit = QUnitGS2.QUnit;

function doGet() {
  QUnitGS2.init(); // Initializes the library.


  QUnit.module("Basic tests");

  QUnit.test("simple numbers", function( assert ) {
    assert.equal(divideThenRound(10, 2), 5, "whole numbers");
    assert.equal(divideThenRound(10, 4), 3, "decimal numbers");
  });



  QUnit.start(); // Starts running tests, notice QUnit vs QUnitGS2.
  return QUnitGS2.getHtml();
}

function getResultsFromServer() {
   return QUnitGS2.getResultsFromServer();
}