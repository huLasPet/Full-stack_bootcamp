$("h1").css("color", "red");
$("h1").toggleClass("jQueryTest");

$("h1").on("click", testFunction);

function testFunction() {
  $("h1").css("color", "black");
}

$(document).on("keypress", function (event) {
  $("h1").css("color", "blue");
  $("h1").html(event.keysd);
});
