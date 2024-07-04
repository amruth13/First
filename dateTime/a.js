/**
 * Example
 * {ControlType:"radio",SuppressLabel:false,LabelPosition:"left",Label:"Yes",ToggleText:"Hello I Am Abhay",Id:"12",}
 *
 * ControlType : checkbox ||switch||radio
 * SuppressLabel : type Boolean, Displays label if false
 * LabelPosition : left||top , default right for label
 * ToggleText/Label : Text content for Label container
 * DefaultValue : Set the default value of controls
 * Id : set the id for the radio controls
 * LeftDivWidth: LabelDiv width for LabelPosition Left & right for checkbox and switch
 * leftTextAlignment : Label Alignment left, center , right for value 0,1,2
 *
 * @param {*} param accepts a JSON obejct
 */
let clsCheckbox = function (param) {
    var _baseContainer;
    var _descriptionDiv;
    var _controlDiv;
    var _labelDiv;
    var _description;
    var _checkbox;
    var _toggleContainer;
    var _toggleButton;
    var _radioContainer;
    var _radioInput1;
    var _radioInput2;
    var _labelInput1;
    var _labelInput2;
    var _isActive; // Default Value of the controls
    var _initParam;
  
    this.construct = function (param) {
      _initParam = param;
  
      // checks all datatype of parameters , returns true for valid dataType and false for not valid dataType
      if (this.validation(_initParam) == false) throw "Enter Valid Param";
  
      // sets the default param value of controls
      if (_initParam.DefaultValue) {
        _isActive = _initParam.DefaultValue;
      } else {
        _isActive = false;
      }
  
      //sets the default LabelPostion to right
      if (!_initParam.LabelPosition) _initParam.LabelPosition = "right";
  
      // sets the suppressLabel default to false if not passed as param
      if (!_initParam.SuppressLabel) {
        _initParam.SuppressLabel = false;
      }
  
      // sets the controlType default to checkbox if not passed as param
      if (_initParam.ControlType == undefined) {
        _initParam.ControlType = "checkbox";
      }
  
      // sets the LabelTextAlignment default according to Label postion , for Left its 2 and for right its 0
      if (_initParam.LabelPosition == "left") {
        if (_initParam.LabelTextAlignment == undefined) {
          _initParam.LabelTextAlignment = 2;
        }
      } else if (_initParam.LabelPosition == "right") {
        if (_initParam.LabelTextAlignment == undefined) {
          _initParam.LabelTextAlignment = 0;
        }
      }
  
      // create baseContainer and Description container
  
      _baseContainer = $("<div>").addClass("DisplayDiv");
      _descriptionDiv = $("<div>").css("width", "100%");
      _description = $("<small>").text(_initParam.Description);
      _descriptionDiv.append(_description);
  
      _controlDiv = $("<div>").addClass("containerDivClass");
  
      switch (_initParam.ControlType) {
        case "checkbox":
          _checkbox = $("<input>")
            .attr("type", "checkbox")
            .prop("checked", _isActive);
  
          _checkbox.attr("title", _initParam.ToolTipText);
          _controlDiv.append(_checkbox);
  
          // Click event for checkbox , triggers Event_change Handler
  
          _checkbox.click((e) => {
            _isActive = !_isActive;
            _checkbox.prop("checked", _isActive);
            this.toggleTextFunction();
            e.data = _isActive;
            Event_Change(e);
          });
  
          break;
  
        case "switch":
          _toggleContainer = $("<div>").addClass("toggle-container");
  
          // sets the class property for LabelPosition left
  
          if (_initParam.LabelPosition == "left") {
            _toggleContainer.addClass("toggle-containerLeft");
          } else {
            _toggleContainer.addClass("toggle-containerTop");
          }
          _toggleButton = $("<div>").addClass("toggle-button");
          _toggleButton.attr("title", _initParam.ToolTipText);
  
          _controlDiv.append(_toggleContainer);
          _toggleContainer.append(_toggleButton);
          _toggleContainer.toggleClass("active", _isActive);
          _toggleButton.toggleClass("active", _isActive);
  
          // Click event for switch , triggers Event_change Handler
  
          _toggleContainer.on("click", (e) => {
            _isActive = !_isActive;
            _toggleContainer.toggleClass("active", _isActive);
            _toggleButton.toggleClass("active", _isActive);
            this.toggleTextFunction();
            e.data = _isActive;
            Event_Change(e, _isActive);
          });
  
          break;
  
        case "radio":
          //No control if no id is passed for radio
  
          if (!_initParam?.Id) break;
  
          _radioContainer = $("<div>")
            .addClass("radio-container")
            .attr("title", _initParam.ToolTipText);
  
          _radioInput1 = $("<input>")
            .attr({
              type: "radio",
              id: "success-outlined" + _initParam.Id,
              name: "options-outlined" + _initParam.Id,
              checked: _isActive,
            })
            .addClass("btn-check");
  
          _radioInput2 = $("<input>")
            .attr({
              type: "radio",
              id: "danger-outlined" + _initParam.Id,
              name: "options-outlined" + _initParam.Id,
              autocomplete: "off",
              checked: !_isActive,
            })
            .addClass("btn-check");
  
          _radioInput2.addClass("btn-check");
  
          _labelInput1 = $("<label>")
            .attr({
              for: "success-outlined" + _initParam.Id,
              class: "btn btn-outline-success",
            })
            .text("");
  
          _labelInput2 = $("<label>")
            .attr({
              for: "danger-outlined" + _initParam.Id,
              class: "btn btn-outline-danger",
            })
            .text("");
  
          _radioContainer.append(
            _radioInput1,
            _labelInput1,
            "<br>",
            _radioInput2,
            _labelInput2
          );
  
          _controlDiv.append(_radioContainer);
  
          // change event for radio button , triggers radioInputChange handler which triggers Event_change Handler
  
          _radioInput1.on("change", radioInputChange).bind(this);
          _radioInput2.on("change", radioInputChange).bind(this);
          break;
      }
  
      this.suppressLabel();
      this.toggleTextFunction();
  
      radioInputChange = (e) => {
        _isActive = e.currentTarget.id.startsWith("success");
        this.toggleTextFunction();
        e.data = _isActive;
        Event_Change(e);
      };
    };
  
    /**
     * Event_Change - Event Handler fires whenever the value changes for all controlType: checkbox, switch & radio
     */
  
    Event_Change = (event) => {
      if (_initParam.onChange != undefined) {
        _initParam.onChange(event);
      }
    };
  
    /**
     * It toogle the text according to true or false value of the controls
     */
  
    this.toggleTextFunction = function () {
      _labelDiv?.text(
        _checkbox?.is(":checked") || _isActive // Toggle the label text
          ? _initParam.Label
          : _initParam.ToggleText
          ? _initParam.ToggleText
          : _initParam.Label
      );
  
      if (_initParam.ControlType == "radio") {
        _labelInput1?.text(_initParam.Label);
        _labelInput2?.text(_initParam.ToggleText);
      }
    };
  
    /**
     * Displays the label for false and don't for true
     */
  
    this.suppressLabel = function () {
      // Added Underscore
      var _isAppendDescription = !(_initParam.Description == undefined);
      var _isAppendLabel = !(_initParam.Label == undefined);
  
      _labelDiv = $("<div>").css({
        width: _initParam.LeftDivWidth,
      });
  
      if (!_initParam.SuppressLabel) {
        if (_initParam.LabelPosition) {
          if (_initParam.ControlType != "radio") {
            // Sets the leftDivWidth for checkbox & switch for labelPosition - left & right
  
            _labelDiv
              .addClass(_initParam.LabelPosition)
              .css(
                "width",
                _initParam.LabelPosition != "top"
                  ? _initParam.LeftDivWidth
                  : "100%"
              );
  
            // sets the contronDiv width according to labelPosition
  
            _controlDiv.css(
              "width",
              _initParam.LabelPosition != "top"
                ? 100 - parseInt(_initParam.LeftDivWidth) + "%"
                : "100%"
            );
          }
        }
  
        // Appending div according to labelPosition
  
        if (_initParam.ControlType != "radio") {
          // For checkbox and Switch
  
          if (_initParam.LabelPosition == "left") {
            // Appends DescriptionDiv only when description is passed as parameter
  
            _isAppendDescription ? _baseContainer.append(_descriptionDiv) : "";
  
            // Appends LabelDiv only when Label is passed as parameter
  
            _isAppendLabel ? _baseContainer.append(_labelDiv) : "";
  
            _baseContainer.append(_controlDiv);
          }
  
          if (_initParam.LabelPosition == "right") {
            // Appends DescriptionDiv only when description is passed as parameter
  
            _isAppendDescription ? _baseContainer.append(_descriptionDiv) : "";
  
            _baseContainer.append(_controlDiv);
  
            // Appends LabelDiv only when Label is passed as parameter
  
            _isAppendLabel ? _baseContainer.append(_labelDiv) : "";
          }
  
          if (_initParam.LabelPosition == "top") {
            // Appends LabelDiv only when Label is passed as parameter
  
            _isAppendLabel ? _baseContainer.append(_labelDiv) : "";
  
            // Appends DescriptionDiv only when description is passed as parameter
  
            _isAppendDescription ? _baseContainer.append(_descriptionDiv) : "";
  
            _baseContainer.append(_controlDiv);
          }
        } else if (_initParam.ControlType == "radio") {
          _isAppendDescription ? _baseContainer.append(_descriptionDiv) : "";
          _controlDiv.css("width", "100%");
          _baseContainer.append(_controlDiv);
        }
      }
  
      // Sets the label Alignment according to LabeltextAlignment - left , center , right for 0, 1, 2
  
      if (_initParam.LabelPosition != "top") {
        switch (_initParam.LabelTextAlignment) {
          case 0:
            _labelDiv.css("text-align", "left");
            break;
          case 1:
            _labelDiv.css("text-align", "center");
            break;
          case 2:
            _labelDiv.css("text-align", "right");
            break;
        }
      }
    };
  
    /**
     * sets the value as per param & gets the value for no param
     * @returns control with current value
     */
  
    this.val = (param) => {
      if (param == undefined) {
        switch (_initParam.ControlType) {
          case "checkbox":
            return _checkbox.prop("checked");
  
          case "switch":
            return _toggleContainer.hasClass("active");
  
          case "radio":
            return _radioInput1[0].checked ? true : false;
        }
      } else {
        switch (_initParam.ControlType) {
          case "checkbox":
            _checkbox.prop("checked", param);
            _isActive = param;
            this.toggleTextFunction();
            _checkbox.trigger("Event_Change", [_isActive]);
            break;
  
          case "switch":
            param
              ? _toggleContainer.addClass("active")
              : _toggleContainer.removeClass("active");
            _isActive = param;
            this.toggleTextFunction();
            _toggleContainer.trigger("Event_Change", [_isActive]);
            break;
  
          case "radio":
            param
              ? _radioInput1.prop("checked", true)
              : _radioInput2.prop("checked", true);
        }
      }
    };
  
    /**
     * Reset the value to default value
     */
    this.clear = function () {
      switch (_initParam.ControlType) {
        case "checkbox":
          _checkbox.prop("checked", _initParam.DefaultValue);
          this.toggleTextFunction();
          break;
        case "switch":
          _initParam.DefaultValue
            ? _toggleContainer.addClass("active")
            : _toggleContainer.removeClass("active");
          break;
        case "radio":
          _initParam.DefaultValue
            ? _radioInput1.prop("checked", true)
            : _radioInput2.prop("checked", true);
      }
    };
  
    /**
     * Edit the label text content
     * @param {*} ToggleText label text content for true
     * @param {*} Label label text content for false
     */
  
    this.label = function (ToggleText, Label) {
      _initParam.ToggleText = ToggleText;
      _initParam.Label = Label;
      this.toggleTextFunction();
    };
  
    /**
     * checks the controls is checked or unchecked
     * @returns Boolean , Current state of the control true for checked and false for unchecked
     */
  
    this.isFilled = function () {
      switch (_initParam.ControlType) {
        case "checkbox":
          return _isActive;
        case "switch":
          return _isActive;
        case "radio":
          return _radioInput1[0].checked || _radioInput2[0].checked;
      }
    };
  
    /**
     * sets text content for the tooltip mouseover
     * @param {*} toolTipText Edit the title text content on mmouseover
     */
  
    this.toolTipText = function (toolTipText) {
      switch (_initParam.ControlType) {
        case "checkbox":
          _checkbox.attr("title", toolTipText);
          break;
        case "switch":
          _toggleButton.attr("title", toolTipText);
          break;
        case "radio":
          _radioContainer.attr("title", toolTipText);
          break;
      }
    };
  
    /**
     * sets the property to true if any changes take place to the default value return Boolean
     */
  
    this.isDirty = function () {
      if (_initParam.DefaultValue != _isActive) _isActive = true;
      switch (_initParam.ControlType) {
        case "checkbox":
          _checkbox.prop("checked", _isActive);
          break;
        case "switch":
          _isActive
            ? _toggleContainer.addClass("active")
            : _toggleContainer.removeClass("active");
          break;
        case "radio":
          _isActive
            ? _radioInput1.prop("checked", true)
            : _radioInput2.prop("checked", true);
          break;
      }
    };
  
    /**
     * gets the parent div
     * @returns the base container
     */
  
    this.getDesign = function () {
      return _baseContainer;
    };
  
    /**
     *checks the datatype of the initial param
     * @param {*} _initParam Initial param of the class
     * @returns Boolean ,false for Invalid & true for valid
     */
  
    this.validation = function (_initParam) {
      // Validation for dataType of all parameters
  
      var _ValidVal; // returns true for all validation and false for error
  
      if (_initParam?.ControlType) {
        if (
          typeof _initParam.ControlType == "string" &&
          (_initParam.ControlType == "checkbox" || "switch" || "radio")
        )
          _ValidVal = true;
        else _ValidVal = false;
      }
  
      if (_initParam?.LabelPosition) {
        if (
          typeof _initParam.LabelPosition == "string" &&
          (_initParam.LabelPosition == "left" || "right")
        )
          _ValidVal = true;
        else _ValidVal = false;
      }
  
      if (_initParam?.ControlType) {
        if (_initParam.Id) {
          if (
            _initParam.ControlType == "radio" &&
            typeof _initParam.Id == "string"
          )
            _ValidVal = true;
          else _ValidVal = false;
        }
      }
  
      if (_initParam?.ToggleText || _initParam?.Label) {
        if (
          !(
            typeof _initParam.ToggleText == "string" ||
            typeof _initParam.Label == "string"
          )
        )
          _ValidVal = false;
        else _ValidVal = true;
      }
  
      if (_initParam?.DefaultValue && _initParam?.SuppressLabel) {
        if (
          !(
            typeof _initParam.Default == "boolean" &&
            typeof _initParam.SuppressLabel == "boolean"
          )
        )
          _ValidVal = false;
        else _ValidVal = true;
      }
      return _ValidVal;
    };
  
    this.construct(param);
  };
  