let objarr=[]
obj=$('<div>')


// objarr.push(new CreateInput({}))
objarr.push(new CreateInput({ "inputType": "date" }))

objarr.push(new CreateInput({ "inputType": "datetime" }))

objarr.push(new CreateInput({ "inputType": "time" }))
objarr.forEach(function (x,i){
console.log(x);
$("body").append(x.getDesigen())
})
console.log(objarr);