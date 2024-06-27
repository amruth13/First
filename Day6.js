let objarr = [];
obj = $("<div>");

objarr.push(
  new clsCreateInput({
    inputType: "time",
    val:'10:10',
    label: "time",
    descTime: "time is imp",
    suppressLabel: true,
    toolTipText: "time",
    Position: "right",
    newLabel: "hello",
  })
);

objarr.push(
  new clsCreateInput({
    inputType: "datetime",
    abel: "datetime",
    descTimeDate: "date and time",
    suppressLabel: true,
    toolTipText: "Date and time",
    Position: "left",
    newLabel: "hello",
  })
);

objarr.push(
  new clsCreateInput({
    inputType: "date",
    Label: "date",
    val:'2001-10-10',
    suppressLabel: true,
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
// objarr[2].label();

// objarr[0].initNow();
// objarr[1].initNow();
// objarr[2].initNow();
objarr[0].label();
// objarr[1].label();
// objarr[2].label();


console.log(objarr);
