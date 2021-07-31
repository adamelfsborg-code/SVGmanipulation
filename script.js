$(document).on("ready", function () {});

function fillBodyPart(bodyPart) {
  if ($(`#${bodyPart}`).hasClass("filled")) {
    $(`#${bodyPart}`).removeClass("filled");
    return 0;
  }
  $(`#${bodyPart}`).addClass("filled");
}

function checkFilledBodyParts() {
  $(".filled-body-parts ul").empty();
  const bodyParts = [];

  $("svg")
    .children()
    .each(function (index) {
      if (!$(this).hasClass("filled")) return 0;
      bodyParts.push(`<li id=${index} >${$(this).attr("id")}</li>`);
    });
  $(".filled-body-parts ul").append(bodyParts.join(""));
}

function clearFilledBodyParts() {
  $("svg")
    .children()
    .each(function () {
      if (!$(this).hasClass("filled")) return 0;
      $(this).removeClass("filled");
    });
}

function fillAllBodyParts() {
  $("svg")
    .children()
    .each(function (index) {
      if ($(this).hasClass("filled")) return 0;
      $(this).addClass("filled");
    });
}
