const loadBodies = async () => {
  try {
    const bodies = await getAllBodies();
    const data = await drawBodies(bodies.result);
    if (data) $(".body-groups").append(data.join(""));
  } catch (error) {
    console.log(error);
  }
};

const fillBodyPart = (bodyPart) => {
  if ($(`#${bodyPart}`).hasClass("filled")) {
    $(`#${bodyPart}`).removeClass("filled");
    return 0;
  }
  $(`#${bodyPart}`).addClass("filled");
};

const checkFilledBodyParts = () => {
  $(".filled-body-parts ul").empty();
  const bodyParts = [];

  $("svg.body-builder")
    .children()
    .each(function (index) {
      if (!$(this).hasClass("filled")) return 0;
      bodyParts.push(`<li id=${index} >${$(this).attr("id")}</li>`);
    });
  $(".filled-body-parts ul").append(bodyParts.join(""));
};

const clearFilledBodyParts = () => {
  $("svg")
    .children()
    .each(function () {
      if (!$(this).hasClass("filled")) return 0;
      $(this).removeClass("filled");
    });
};

const fillAllBodyParts = () => {
  $("svg")
    .children()
    .each(function (index) {
      if ($(this).hasClass("filled")) return 0;
      $(this).addClass("filled");
    });
};

const getIsFilledBodyParts = async () => {
  let body = {};
  await $("svg")
    .children()
    .each(function (index) {
      if (!$(this).hasClass("filled")) {
        body[`${$(this).attr("id")}`] = false;
      } else {
        body[`${$(this).attr("id")}`] = true;
      }
    });
  return body;
};

const drawBodies = async (data) => {
  $(".body-groups").empty();
  let bodies = [];
  try {
    await $.each(data, function (key, val) {
      bodies.push(`
      <svg class="body_item" id=${
        val.id
      } xmlns="http://www.w3.org/2000/svg" viewBox="-40 -40 80 80">
        <circle r="39" fill=${val.background ? "#5598e6" : "#000"} />
        <path d="M0,38a38,38 0 0 1 0,-76a19,19 0 0 1 0,38a19,19 0 0 0 0,38" class=${
          val.left_side && "filled"
        } />
        <circle r="5" cy="19" fill=${val.lower_circle ? "#5598e6" : "#fff"} />
        <circle r="5" cy="-19" fill=${val.upper_circle ? "#5598e6" : "#000"} />
      </svg>
      `);
    });
    return bodies;
  } catch (error) {
    console.log(error);
  }
};

window.onload = loadBodies;
