class clsDateTimeCheckBox {
  #dateContainer;
  #checkbox;
  #dateInput;

  constructor(param) {
      this.#dateContainer = $("<div>").addClass("date-container");
      this.#checkbox = $("<input>").attr({ type: "checkbox", class: "checkbox" });
      this.#dateInput = $("<input>").attr({ type: "date", class: "date-input", disabled: true });

      this.#dateContainer.append(this.#checkbox, this.#dateInput);

  
      this.#checkbox.change(() => {
          if ($(this.#checkbox).prop("checked")) {
              this.#dateInput.prop("disabled", false);
          } else {
              this.#dateInput.prop("disabled", true);
              this.#dateInput.val("");
          }
      });

      this.#dateInput.on("click", () => {
          $(this.#dateInput).val("");
      });

      this.initNow();
  }

  initNow() {
      var now = new Date();
      var year = now.getFullYear();
      var month = ("0" + (now.getMonth() + 1)).slice(-2);
      var day = ("0" + now.getDate()).slice(-2);

      this.#dateInput.val(`${year}-${month}-${day}`);
  }

  getDesign() {
      return this.#dateContainer;
  }
}

var dateTime = new clsDateTimeCheckBox();


