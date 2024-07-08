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
                this.#input.val(this.getCurrentDateTimeValue());
                this.#input.prop("disabled", true);
            }
        });

    
        this.setInputToNow();
    }
    #now = new Date();
    #year = this.#now.getFullYear();
    #month = ("0" + (this.#now.getMonth() + 1)).slice(-2);
    #day = ("0" + this.#now.getDate()).slice(-2);
    #hours = ("0" + this.#now.getHours()).slice(-2);
    #minutes = ("0" + this.#now.getMinutes()).slice(-2);

    setInputToNow() {
        if (this.param.type === 'datetime') {
            this.param.type = 'datetime-local';
            this.#input.attr({ type: this.param.type });
            this.#input.val(`${this.#year}-${this.#month}-${this.#day}T${this.#hours}:${this.#minutes}`);
        } else if (this.param.type === 'date') {
            this.#input.val(`${this.#year}-${this.#month}-${this.#day}`);
        } else if (this.param.type === 'time') {
            this.#input.val(`${this.#hours}:${this.#minutes}`);
        } else if (this.param.type === 'datetime-local') {
            this.#input.val(`${this.#year}-${this.#month}-${this.#day}T${this.#hours}:${this.#minutes}`);
        }
    }

    getCurrentDateTimeValue() {
        if (this.param.type === 'datetime') {
            return `${this.#year}-${this.#month}-${this.#day}T${this.#hours}:${this.#minutes}`;
        } else if (this.param.type === 'date') {
            return `${this.#year}-${this.#month}-${this.#day}`;
        } else if (this.param.type === 'time') {
            return `${this.#hours}:${this.#minutes}`;
        } else if (this.param.type === 'datetime-local') {
            return `${this.#year}-${this.#month}-${this.#day}T${this.#hours}:${this.#minutes}`;
        }

        return "";
    }

    getDesign() {
        return this.#container;
    }
}
