let objarr = [];
obj = $("<div>");

objarr.push(
  new clsCreateInput({
    DisplayType: "time",
    DefaultValue:"10:20",
    Label: "time",
    SuppressLabel: false,
    LabelPosition: "left",
    Description   : "time is imp",
    ToolTipText : "time",
    Width:"100%",
    Height:"22px",
    LeftDivWidth :"20%",
    LabelTextAlignment:2, 
    isRequired:true,
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
    isRequired:true,
  })
);

objarr.push(
  new clsCreateInput({
    DisplayType: "date",
    DefaultValue :"2000-10-10",
    Label:"date",
    SuppressLabel: false,
    LabelPosition: "",
    Description   : "date is imp",
    ToolTipText : "date",
    Width:"100%",
    Height:"22px",
    LeftDivWidth :"20%",
    LabelTextAlignment:0,
    isRequired:true,

  })
);

objarr.forEach(function (x, i) {
console.log(x);
$("body").append(x.getDesign());
x.label();

x.val();
x.isFilled();
x.toolTipText ();
//  x.clear();
//  x.initNow();
});
console.log(objarr);
