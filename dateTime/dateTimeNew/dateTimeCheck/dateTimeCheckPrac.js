class clsDateTimeInput {
    #container;
    #checkbox;
    #input;
    param;
    
    constructor(param) {
        this.param = param;
        this.#container = $("<div>").addClass("datetime-container");
        this.#checkbox = $("<input>").attr({ type: "checkbox", class: "checkbox" });
        this.#input = $("<input>").attr({ type: param.type, class: "datetime-input", disabled: true });

        this.#container.append(this.#checkbox, this.#input);

        this.#checkbox.change(() => {
            if (this.#checkbox.prop("checked")) {
                this.setInputToNow();
                this.#input.prop("disabled", false);
            } else {
                this.#input.prop("disabled", true);
                this.#input.val("");
            }
        });

       
        this.setInputToNow();
    }
    setInputToNow() {
    var now = new Date();
    var year = now.getFullYear();
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var day = ("0" + now.getDate()).slice(-2);
    var hours = ("0" + now.getHours()).slice(-2);
    var minutes = ("0" + now.getMinutes()).slice(-2);

    if(this.param.type=='datetime')
    {
      console.log("datetime")
      this.param.type = 'datetime-local';
      console.log(this.param.type)
      console.log(this.#input)
      this.#input.attr({type:this.param.type})
      this.#input.val(`${year}-${month}-${day}T${hours}:${minutes}`);
    }
    if (this.param.type === 'date') {
        this.#input.val(`${year}-${month}-${day}`);
    } else if (this.param.type === 'time') {
        this.#input.val(`${hours}:${minutes}`);
    } else if (this.param.type === 'datetime-local') {
        this.#input.val(`${year}-${month}-${day}T${hours}:${minutes}`);
    }
}

    getDesign() {
        return this.#container;
    }
}