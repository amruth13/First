let objarr = [];
obj = $("<div>");

objarr.push(
  new clsCreateInput({
    DisplayType: "time",
    DefaultValue:"",
    Label: "time",
    SuppressLabel: false,
    LabelPosition: "",
    Description   : "time is imp",
    ToolTipText : "time",
    Width:"100%",
    Height:"22px",
    LeftDivWidth :"20%",
    LabelTextAlignment:2, 
  })
);

objarr.push(
  new clsCreateInput({
    DisplayType: "datetime",
    DefaultValue :"2001-10-10T10:15",
    Label: "datetime",
    SuppressLabel: false,
    LabelPosition: "",
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
    Label:"date",
    SuppressLabel: false,
    LabelPosition: "",
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
$("body").append(x.getDesign());
x.label();
x.DefaultValue();
x.val();
x.isFilled();
x.toolTipText ();
//  x.clear();
//  x.initNow();
});
console.log(objarr);
