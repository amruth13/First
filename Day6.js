let objarr = [];
obj = $("<div>");

objarr.push(
  new clsCreateInput({
    inputType: "time",
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
    labelDateTime: "datetime",
    descTimeDate: "date and time",
    Suppresslabel: true,
    toolTipText: "Date and time",
    Position: "top",
    newLabel: "hello",
  })
);

objarr.push(
  new clsCreateInput({
    inputType: "date",
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

objarr[0].initNow();
console.log(objarr);
