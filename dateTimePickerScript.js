var clsCreateInput = function (param) {
  var _baseContainer = $("<div>").addClass("test");
  var _input;
  var _input2;
  var _input3;
  var _initparam;
  var _isDirty = false;
  var _changeCallback = null;

  this.constructor = function (param) 
  {
     _initparam=param;
    if (
      _initparam &&
      (_initparam.DisplayType === "datetime" ||
        _initparam.DisplayType === "timedate")
    ) {
      _input3 = $("<input>")
        .attr("type", "datetime-local")
        .css({ width: _initparam.Width, height: _initparam.Height })
        .val("")
        .on("change", function () {
          _isDirty = true;
          if (_changeCallback) {
            _changeCallback();
          }
        });
    } else if (_initparam && _initparam.DisplayType === "time") {
      _input = $("<input type='time'>")
        .css({ width: _initparam.Width, height: _initparam.Height })
        .on("change", function () {
          _isDirty = true;
          if (_changeCallback) {
            _changeCallback();
          }
        });
    } else {
      _input2 = $("<input type='date'>")
        .css({ width: _initparam.Width, height: _initparam.Height })
        .on("change", function () {
          _isDirty = true;
          if (_changeCallback) {
            _changeCallback();
          }
        });
    }

    if (_input2) {
      Description = $("<p>");
      var Label = $("<label>").text(_initparam.Label);
      _baseContainer.append(Description)
      .css({marginLeft:_initparam.leftDivWidth});
      if (_initparam.SuppressLabel == false)
         {
        _baseContainer.append(Label);
        Description.text(_initparam.Description);
      }
      Label.addClass("defaultlabel");
      _baseContainer.append(_input2);
    }

    if (_input) {
      Description = $("<p>");
      var Label = $("<label>").text(_initparam.Label);
      _baseContainer.append(Description)
      .css({marginLeft:_initparam.leftDivWidth});
      if (_initparam.SuppressLabel == false) {
        _baseContainer.append(Label);
        Description.text(_initparam.Description);
      }
      _baseContainer.append(_input);
      Label.addClass("defaultlabel");
    }
    if (_input3) {
      Description = $("<p>");
      var Label = $("<label>").text(_initparam.Label);
      _baseContainer.append(Description)
      .css({marginLeft:_initparam.leftDivWidth});

      if (_initparam.SuppressLabel == false) {
        _baseContainer.append(Label);

        Description.text(_initparam.Description);
      }

      _baseContainer.append(_input3);
      Label.addClass("defaultlabel");
    }
  };

  $("body").append(_baseContainer);

  /**
   * it sets the DefaultValue to input
   *
   **/
  this.DefaultValue = function () {
    try {
      if (_initparam.DefaultValue !== undefined) {
        if (
          _initparam &&
          (_initparam.DisplayType === "datetime" ||
            _initparam.DisplayType === "timedate")
        ) {
          if (!isValidDateTime(_initparam.DefaultValue)) {
            throw new Error(
              "Invalid date input, please enter in the format of YYYY-MM-DD HH:MM"
            );
          }
        } else if (_initparam && _initparam.DisplayType === "time") {
          if (!isValidTime(_initparam.DefaultValue)) {
            throw new Error(
              "Invalid time input, please enter in the format of HH:MM"
            );
          }
        } else {
          if (!isValidDate(_initparam.DefaultValue)) {
            throw new Error(
              "Invalid date input, please enter in the format of YYYY-MM-DD"
            );
          }
        }

        if (_input2) {
          _input2.val(_initparam.DefaultValue);
        }
        if (_input) {
          _input.val(_initparam.DefaultValue);
        }
        if (_input3) {
          _input3.val(_initparam.DefaultValue);
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
   * it sets the value if param is present else its returns the value
   * @param{val} used to set the value
   **/
  this.val = function (val) {
    try {
      if (val !== undefined) {
        if (
          _initparam &&
          (_initparam.DisplayType === "datetime" ||
            _initparam.DisplayType === "timedate")
        ) {
          if (!isValidDateTime(val.datetime)) {
            throw new Error(
              "Invalid date input, please enter in the format of YYYY-MM-DD HH:MM"
            );
          }
        } else if (_initparam && _initparam.DisplayType === "time") {
          if (!isValidTime(val.time)) {
            throw new Error(
              "Invalid time input, please enter in the format of HH:MM"
            );
          }
        } else {
          if (!isValidDate(val.date)) {
            throw new Error(
              "Invalid date input, please enter in the format of YYYY-MM-DD"
            );
          }
        }

        if (_input2) {
          _input2.val(val.date);
        }
        if (_input) {
          _input.val(val.time);
        }
        if (_input3) {
          _input3.val(val.datetime);
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
   * it check the input field is filled or not
   * @return true or false
   **/

  this.isFilled = function () {
    if (
      _initparam.DisplayType === "datetime" ||
      _initparam.DisplayType === "timedate"
    ) {
      return _input2 && _input2.val() !== "" && _input && _input.val() !== "";
    } else if (_initparam.DisplayType === "time") {
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
      _input2.attr("title", _initparam.ToolTipText);
    }
    if (_input) {
      _input.attr("title", _initparam.ToolTipText);
    }
    if (_input3) {
      _input3.attr("title", _initparam.ToolTipText);
    }
  };

  /**
   * used to set the label upon input
   * @param{
   *        label=set new label text,
   *        position =default(top),left or right
   * }
   **/

  this.label = function () {
    LabelPosition = _initparam.LabelPosition;
    newText = _initparam.newLabel;
    if (LabelPosition == "left") {
      if (_initparam.DisplayType === "datetime") {
        _baseContainer
          .find("label")
          .text(newText)
          .removeClass()
          .addClass("leftlabel");
      } else if (_initparam.DisplayType == "date") {
        _baseContainer
          .find("label")
          .text(newText)
          .removeClass()
          .addClass("leftlabel");
      } else if (_initparam.DisplayType === "time") {
        _baseContainer
          .find("label")
          .text(newText)
          .removeClass()
          .addClass("leftlabel");
      }
    } else if (LabelPosition == "right") {
      if (_initparam.DisplayType === "datetime") {
        _baseContainer
          .find("label")
          .text(newText)
          .removeClass()
          .addClass("rightlabel1");
      } else if (_initparam.DisplayType === "date") {
        _baseContainer
          .find("label")
          .text(newText)
          .removeClass()
          .addClass("rightlabel");
      } else if (_initparam.DisplayType === "time") {
        _baseContainer
          .find("label")
          .text(newText)
          .removeClass()
          .addClass("rightlabel2");
      }
    } else if (LabelPosition == "top") {
      if (_initparam.DisplayType === "datetime") {
        _baseContainer.find("label").text(newText);
      } else if (_initparam.DisplayType === "date") {
        _baseContainer.find("label").text(newText);
      } else if (_initparam.DisplayType === "time") {
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
    if (typeof timeStr !== "string" || !/^\d{2}:\d{2}$/.test(timeStr)) {
      return false;
    }

    var timeParts = timeStr.split(":");
    var hr = parseInt(timeParts[0], 10);
    var min = parseInt(timeParts[1], 10);

    if (hr >= 0 && hr < 24 && min >= 0 && min < 60) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * used to check wheather the input (date and time) value is valied or not
   **/
  function isValidDateTime(dateTimeLocalStr) {
    var dateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
    if (!dateTimeRegex.test(dateTimeLocalStr)) {
      return false;
    }
    var dateTimeParts = dateTimeLocalStr.split("T");
    if (dateTimeParts.length !== 2) {
      return false;
    }
    var dateStr = dateTimeParts[0];
    var timeStr = dateTimeParts[1];
    var date = Date.parse(dateStr);
    if (isNaN(date)) {
      return false;
    }
    var timeParts = timeStr.split(":");
    if (timeParts.length !== 2) {
      return false;
    }
    var hr = parseInt(timeParts[0], 10);
    var min = parseInt(timeParts[1], 10);
    if (isNaN(hr) || isNaN(min)) {
      return false;
    }
    if (!(hr >= 0 && hr < 24 && min >= 0 && min < 60)) {
      return false;
    }

    return true;
  }

  /**
   *it contains main div
   **/
  this.getDesigen = function () {
    return _baseContainer;
  };
  this.constructor(param);
  /**
   * Event handler to fire whenever the value changes, either when set manually or through object.val(val function)
   **/
  $("input").change(function () {
    console.log("Input values changed!");
  });
  $("input").val(" ");
};
