let objarr = [];
obj = $("<div>");

objarr.push(
  new clsCreateInput({
    inputType: "time",
    val:'10:15',
    labelTime: "time",
    descTime: "time is imp",
    Suppresslabel: true,
    toolTipText: "time",
    Position: "right",
    newLabel: "hello",
  })
);

objarr.push(
  new clsCreateInput({
    inputType: "datetime",
    val:'2024-06-27T15:30',
    labelDateTime: "datetime",
    descTimeDate: "date and time",
    Suppresslabel: true,
    toolTipText: "Date and time",
    Position: "left",
    newLabel: "hello",
  })
);

objarr.push(
  new clsCreateInput({
    inputType: "date",
    val:"2001-11-10",
    labelDate: "date",
    Suppresslabel: true,
    toolTipText: "date",
    descDate: "date is imp",
    Position: "left",
    newLabel: "hello",
  })
);

objarr.forEach(function (x, i) {
  console.log(x);
  $("body").append(x.getDesigen());
});

objarr[0].val();
objarr[1].val();
objarr[2].val();

// objarr[0].initNow();
// objarr[1].initNow();
// objarr[2].initNow();
// objarr[0].label();
// objarr[1].label();
// objarr[2].label();


console.log(objarr);
