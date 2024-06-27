
var clsCreateInput = function (_initparam) {
  var _baseContainer = $("<div>").addClass("test");
  var _inputDiv2 = $("<div>").addClass("test1");
  var _input;
  var _input2;
  var _input3;
  var _des;
  var _desDate;
  var _toolTipText;
  var _label;
  var _val;
  var _isDirty = false;
  var _changeCallback = null;
  var Suppresslabel;
  this.constructor = function (_initparam) {
    if (
      _initparam &&
      (_initparam.inputType === "datetime" ||
        _initparam.inputType === "timedate")
    ) {
      _input3 = $("<input>")
        .attr("type", "datetime-local")
        .val("")
        .on("change", function () {
          _isDirty = true;
          if (_changeCallback) {
            _changeCallback();
          }
        });
    } else if (_initparam && _initparam.inputType === "time") {
      _input = $("<input type='time'>").on("change", function () {
        _isDirty = true;
        if (_changeCallback) {
          _changeCallback();
        }
      });
    } else {
      _input2 = $("<input type='date'>").on("change", function () {
        _isDirty = true;
        if (_changeCallback) {
          _changeCallback();
        }
      });
    }

    if (_input2) {
      _desDate = $("<p>");
      _des = $("<p>");
      var labelDate = $("<label>").text(_initparam.labelDate);
      _baseContainer.append(_desDate);
      if (_initparam.Suppresslabel == true) {
        _baseContainer.append(labelDate);
        _desDate.text(_initparam.descDate);
      }
      labelDate.addClass("defaultlabel");
      _baseContainer.append(_input2);
    }

    if (_input) {
      _desDate = $("<p>");
      _des = $("<p>");
      var labelTime = $("<label>").text(_initparam.labelTime);
      _baseContainer.append(_des);
      if (_initparam.Suppresslabel == true) {
        _baseContainer.append(labelTime);
        _des.text(_initparam.descTime);
      }
      _baseContainer.append(_input);
      labelTime.addClass("defaultlabel");
    }
    if (_input3) {
      _desDate = $("<p>");
      _des = $("<p>");
      labelDateTime = $("<label>").text(_initparam.labelDateTime);
      _baseContainer.append(_des, _desDate);

      if (_initparam.Suppresslabel == true) {
        _baseContainer.append(labelDateTime);

        _desDate.text(_initparam.descTimeDate);
      }

      _baseContainer.append(_input3);
      labelDateTime.addClass("defaultlabel");
    }
  };

  $("body").append(_baseContainer);

  /**
   * it sets the value if param is present else its returns the value
   * @param{val} used to set the value
   **/
  // this.val = function () {
  //   try {
  //     if (_initparam.val !== undefined) {
  //       if (
  //         _initparam &&
  //         (_initparam.inputType === "datetime" ||
  //           _initparam.inputType === "timedate")
  //       ) {
  //         if (!isValiedDateTime(_initparam.val)) {
  //           throw new Error(
  //             "Invalid date input, please enter in the format of YYYY-MM-DD HH:MM"
  //           );
  //         }
  //       } else if (_initparam && _initparam.inputType === "time") {
  //         if (!isValidTime(_initparam.val)) {
  //           throw new Error(
  //             "Invalid time input, please enter in the format of HH:MM"
  //           );
  //         }
  //       } else {
  //         if (!isValidDate(_initparam.val)) {
  //           throw new Error(
  //             "Invalid date input, please enter in the format of YYYY-MM-DD"
  //           );
  //         }
  //       }

  //       if (_input2) {
  //         _input2.val(_initparam.val);
  //       }
  //       if (_input) {
  //         _input.val(_initparam.val);
  //       }
  //       if (_input3) {
  //         _input3.val(_initparam.val);
  //       }

  //       _isDirty = true;

  //       if (_changeCallback) {
  //         _changeCallback();
  //       }
  //     } else {
  //       return {
  //         date: _input2 ? _input2.val() : "",
  //         time: _input ? _input.val() : "",
  //         datetime: _input3 ? _input3.val() : "",
  //       };
  //     }
  //   } catch (error) {
  //     console.error("Error in val() method:", error.message);
  //   }
  // };




  this.val = function (val) {
    try {
      if (_initparam.val !== undefined) {
        if (
          _initparam &&
          (_initparam.inputType === "datetime" ||
            _initparam.inputType === "timedate")
        ) {
          if (!isValidDate(_initparam.val)) {
            throw new Error(
              "Invalid date input, please enter in the format of YYYY-MM-DD"
            );
          }
          if (!isValidTime(_initparam.val)) {
            throw new Error(
              "Invalid time input, please enter in the format of HH:MM"
            );
          }
        } else if (_initparam && _initparam.inputType === "time") {
          if (!isValidTime(_initparam.val)) {
            throw new Error(
              "Invalid time input, please enter in the format of HH:MM"
            );
          }
        } else {
          if (!isValidDate(_initparam.val)) {
            throw new Error(
              "Invalid date input, please enter in the format of YYYY-MM-DD"
            );
          }
        }

        if (_input2) {
          _input2.val(_initparam.val);
        }
        if (_input) {
          _input.val(_initparam.val);
        }
        if (_input3) {
         _input3.val(_initparam.val);
        }

        _isDirty = true;

        if (_changeCallback) {
          _changeCallback();
        }
      } else {
        return {
          date: _input2 ? _input2.val() : "",
          time: _input ? _input.val() : "",
        datetime: _input3 ? _input3.val() : "",

        };
      }
    } catch (error) {
      console.error("Error in val() method:", error.message);
    }
  };

    /**
     * function specfies the width of leftdiv based on position
     **/
    this.LeftDivwidth=()=>{
      if(_initparam.position=='left'||_initparam.position=='right'){
        _label.css("width",_initparam.Widhth)
      }
    }


  /**
   * it check the input field is filled or not
   * @return true or false
   **/

  this.isFilled = function () {
    if (
      _initparam.inputType === "datetime" ||
      _initparam.inputType === "timedate"
    ) {
      return (
        _input2 && _input2.val() !== "" && _input && _input.val() !== ""
      );
    } else if (_initparam.inputType === "time") {
      return _input && _input.val() !== "";
    } else {
      return _input2 && _input2.val() !== "";
    }
  };
  /**
   * it is used to clear input field
   *
   **/

  this.clear = function () {
    if (_input2) {
      _input2.val("");
    }
    if (_input) {
      _input.val("");
    }
    if (_input3) {
      _input3.val("");
    }
    _isDirty = false;
  };

  /**
   * it used to see data is alterd or not
   *@return in true or false
   **/

  this.isDirty = function () {
    return _isDirty;
  };

  /**
   * it sets the current value for inputs
   *
   **/

  this.initNow = function () {
    var now = new Date();
    var year = now.getFullYear();
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var day = ("0" + now.getDate()).slice(-2);
    var hours = ("0" + now.getHours()).slice(-2);
    var minutes = ("0" + now.getMinutes()).slice(-2);

    if (_input2) {
      _input2.val(`${year}-${month}-${day}`);
    }
    if (_input) {
      _input.val(`${hours}:${minutes}`);
    }
    if (_input3) {
      _input3.val(`${year}-${month}-${day}T${hours}:${minutes}`);
    }
  };

  /**
   * it sets the text that will appear on mouse over
   * @param{newText} used to set the textContent of ToolTip
   **/

  this.toolTipText = function () {
    if (_input2) {
      _input2.attr("title", _initparam.toolTipText);
    }
    if (_input) {
      _input.attr("title", _initparam.toolTipText);
    }
    if (_input3) {
      _input3.attr("title", _initparam.toolTipText);
    }
  };

  /**
   * used to set the label upon input
   * @param{
   *        Label=set new label text,
   *        position =default(top),left or right
   * }
   **/

  this.label = function () {
    position = _initparam.Position;
    newText = _initparam.newLabel;
    if (position == "left") {
      if (_initparam.inputType === "datetime") {
        _baseContainer
          .find("label")
          .text(newText)
          .removeClass()
          .addClass("leftlabel");
      } else if (_initparam.inputType == "date") {
        _baseContainer
          .find("label")
          .text(newText)
          .removeClass()
          .addClass("leftlabel");
      } else if (_initparam.inputType === "time") {
        _baseContainer
          .find("label")
          .text(newText)
          .removeClass()
          .addClass("leftlabel");
      }
    } else if (position == "right") {
      if (_initparam.inputType === "datetime") {
        _baseContainer
          .find("label")
          .text(newText)
          .removeClass()
          .addClass("rightlabel1");
      } else if (_initparam.inputType === "date") {
        _baseContainer
          .find("label")
          .text(newText)
          .removeClass()
          .addClass("rightlabel");
      } else if (_initparam.inputType === "time") {
        _baseContainer
          .find("label")
          .text(newText)
          .removeClass()
          .addClass("rightlabel2");
      }
    } else if (position == "top") {
      if (_initparam.inputType === "datetime") {
        _baseContainer.find("label").text(newText);
      } else if (_initparam.inputType === "date") {
        _baseContainer.find("label").text(newText);
      } else if (_initparam.inputType === "time") {
        _baseContainer.find("label").text(newText);
      }
    }
  };

  /**
   * used to check wheather the input (date) value is valied or not
   **/
  function isValidDate(dateStr) {
    var date = new Date(dateStr);
    return !isNaN(date.getTime());
  }
  /**
   * used to check wheather the input (time) value is valied or not
   **/
  function isValidTime(timeStr) {
    var timeParts = timeStr.split(":");
    var hr = parseInt(timeParts[0], 10);
    var min = parseInt(timeParts[1], 10);

    return hr >= 0 && hr < 24 && min >= 0 && min < 60;
  }
  /**
   * used to check wheather the input (date and time) value is valied or not
   **/
  function isValiedDateTime(dateStr, timeStr) {
    var date = new Date(dateStr);
    var timeParts = timeStr.split(":");
    var hr = parseInt(timeParts[0], 10);
    var min = parseInt(timeParts[1], 10);
    return (
      !isNaN(date.getTime()), hr >= 0 && hr < 24 && min >= 0 && min < 60
    );
  }
  /**
   *it contains main div
   **/
  this.getDesigen = function () {
    return _baseContainer;
  };

  this.constructor(_initparam);
  /**
   * Event handler to fire whenever the value changes, either when set manually or through object.val(val function)
   **/
  $("input").change(function () {
    console.log("Input values changed!");
  });
  $("input").val(" ");
};

//   let obj=new clsCreateInput({
//     inputType: "datetime",
// labelDateTime: "datetime",
// descTimeDate: "date and time",
// Suppresslabel: true,
// toolTipText: "Date and time",
// position: "left",
// newLabel: "hello",
//   })
// obj.label()
