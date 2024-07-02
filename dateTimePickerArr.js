let objarr = [];
obj = $("<div>");

objarr.push(
  new clsCreateInput({
    DisplayType: "time",
    DefaultValue:"",
    Label: "",
    SuppressLabel: false,
    LabelPosition: "top",
    Description   : "time is imp",
    ToolTipText : "time",
    Width:"100%",
    Height:"22px",
    LeftDivWidth :"20%",
    LabelTextAlignment:0, 
  })
);

objarr.push(
  new clsCreateInput({
    DisplayType: "datetime",
    DefaultValue :"",
    Label: "",
    SuppressLabel: false,
    LabelPosition: "top",
    Description   : "date and time is imp",
    ToolTipText : "Date and time",
    Width:"100%",
    Height:"22px",
    LeftDivWidth :"20%",
    LabelTextAlignment:0,
  })
);

objarr.push(
  new clsCreateInput({
    DisplayType: "date",
    DefaultValue :"",
    Label:"",
    SuppressLabel: false,
    LabelPosition: "top",
    Description   : "date is imp",
    ToolTipText : "date",
    Width:"100%",
    Height:"22px",
    LeftDivWidth :"20%",
    LabelTextAlignment:0,
  })
);

objarr.forEach(function (x, i) {
console.log(x);
$("body").append(x.getDesigen());
x.label();
x.DefaultValue();
x.val();
x.isFilled();
x.toolTipText ();
//  x.clear();
//  x.initNow();
});
console.log(objarr);
