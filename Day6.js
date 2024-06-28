let objarr = [];
obj = $("<div>");

objarr.push(
  new clsCreateInput({
    DisplayType: "time",
   Width:"500px",
    Label: "time",
    SuppressLabel: true,
    LabelPosition: "top",
    Description   : "time is imp",
    ToolTipText : "time",
    Width:"96px",
    Height:"22px",
   
  })
);

objarr.push(
  new clsCreateInput({
    DisplayType: "datetime",
    Label: "datetime",
    SuppressLabel: true,
    LabelPosition: "top",
    Description   : "date and time",
    ToolTipText : "Date and time",
    Width:"177px",
    Height:"22px",
   
  })
);

objarr.push(
  new clsCreateInput({
    DisplayType: "date",
    Label: "date",
    SuppressLabel: true,
    LabelPosition: "top",
    Description   : "date is imp",
    ToolTipText : "date",
    Width:"96px",
    Height:"22px",
    
  })
);

objarr.forEach(function (x, i) {
  console.log(x);
  $("body").append(x.getDesigen());
x.label();
 x.val();
 x.isFilled();
//  x.clear();
 x.toolTipText ();

});

// objarr[0].val();
// objarr[1].val();
// objarr[2].val();
// objarr[0].initNow();
// objarr[1].initNow();
// objarr[2].initNow();
// objarr[0].label();
// objarr[1].label();
// objarr[2].label();




console.log(objarr);
