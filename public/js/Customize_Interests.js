var id;
$.get("/api/user_data").then(function(data) {
    id = data.id;
    })

$(".interestEditOne").click(function(){
  var categorySelection = $(this).text();
  console.log(categorySelection);

    $.post("/api/updateInterestsOne", {
      id: id,
      interest1: categorySelection
    }).then(function(data) {
      console.log("success")
  })
});

$(".interestEditTwo").click(function(){
  var categorySelection = $(this).text();
  console.log(categorySelection);

    $.post("/api/updateInterestsTwo", {
      id: id,
      interest2: categorySelection
    }).then(function(data) {
      console.log("success")
  })
});

$(".interestEditThree").click(function(){
  var categorySelection = $(this).text();
  console.log(categorySelection);

    $.post("/api/updateInterestsThree", {
      id: id,
      interest3: categorySelection
    }).then(function(data) {
      console.log("success")
  })
});

$(".interestEditFour").click(function(){
  var categorySelection = $(this).text();
  console.log(categorySelection);

    $.post("/api/updateInterestsFour", {
      id: id,
      interest4: categorySelection
    }).then(function(data) {
      console.log("success")
  })
});