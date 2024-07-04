/**
 * this class  handle Date Time Input field functionality
 * DisplayType = date,time,datetime by default (date)
 * DefaultValue = "" by default,to set values for date="YYYY-MM-DD",time="HH:MM",datetime="YYYY-MM-DDTHH:MM"
 * SuppressLabel = false (Default) it display both label and description    or
 *                  true it donot display both label and description
 * LabelPosition =left,right or top(default)
 * Description = description that can show above the input
 *ToolTipText = A text that will appear on mouse over
 *Height = 0 (Default Auto) 
 * Width = 0 (Default Auto) 
 * LeftDivWidth = 0 (Default Auto) when the LabelPosition is Left or Right
 *
 */
var clsCreateInput = function (param) 
{
  var _baseContainer ;
  var _labelDiv ;
  var _descriptionDiv ;
  var _controlDiv ;
  var _input;
  var _input2;
  var _input3;
  var _initparam;
  var _isDirty;
  var _changeCallback;
  var _label;
  var _description;

  this.constructor = function (param) 
  {
    _initparam = param;

   /**
    *  Setting default LabelPosition 
    *   And the default LabelPosition is top
    */
    if(!_initparam.LabelPosition)_initparam.LabelPosition="top"

   /**
    *  Setting default DisplayType 
    *    And the default DisplayType is date (input type="date")
    */
  if(!_initparam.DisplayType)_initparam.DisplayType="date"

    /**
     *     Setting default Label
     *  And the default Label is empty ("")
     */
  if(!_initparam.Label)_initparam.Label=""

     /**
     *     Setting default Width
     *  And the default Width is auto
     */
  if(!_initparam.Width)_initparam.Width="auto"

       /**
     *     Setting default Width
     *  And the default Width is auto
     */
   if(!_initparam.Height)_initparam.Height="auto"

    /**
     *     Setting default SuppressLabel
     *  And the default SuppressLabel is false
     */
  if(!_initparam.SuppressLabel)_initparam.SuppressLabel=false

    // create baseContainer,LabelContainer and Description container
    _baseContainer = $("<div>").addClass("test");
    _labelDiv = $("<div>").addClass("labelDivclass");
    _label = $("<div>");
    _descriptionDiv = $("<div>").addClass("descriptionDivClass");
    _controlDiv = $("<div>").addClass("controlDivClass");
    _labelDiv.append(_label).css("width", _initparam.LeftDivWidth);
    _isDirty = false;
    _changeCallback = null;


     //Checking the DisplayType to create its type of inputTag

    
    if (
      _initparam &&
      (_initparam.DisplayType === "datetime" ||
        _initparam.DisplayType === "timedate")
    ) 
    
    // creating input tag of type datetime
    {
      _input3 = $("<input type='datetime-local'>")
        .attr({title:_initparam.ToolTipText, 
          value:_initparam.DefaultValue,
        })
        .css({ width: _initparam.Width, height: _initparam.Height })
        .on("change", handleInputChange);
    } 

     /**
      * Checking the DisplayType to create its type of inputTag
    creating input tag of type time
      */
    else if (_initparam && _initparam.DisplayType === "time") 
    {
      _input = $("<input type='time'>")
      .attr({title:_initparam.ToolTipText, 
        value:_initparam.DefaultValue,
      })
        .css({ width: _initparam.Width, height: _initparam.Height })
        .on("change", handleInputChange);   
    } 

   /**
    *  Checking the DisplayType to create its type of inputTag
    creating input tag of type date
    */
    else 
    {
      _input2 = $("<input type='date'>")
      .attr({title:_initparam.ToolTipText, 
        value:_initparam.DefaultValue,
      })
        .css({ width: _initparam.Width, height: _initparam.Height })
        .on("change", handleInputChange);

    }

   /**
    *  Checking the status of  SuppressLabel if its false then Label and Description are visible and 
     if SuppressLabel status is true both Label and Description are not visible
    */
    if (_initparam.SuppressLabel == false)
    {
      _label.text(_initparam.Label);
      _description = _initparam.Description;
      _descriptionDiv.append(_description);
      _labelDiv.append(_label)
      
    /**
     * To set LabelTextAlignment according to LabelPosition it will affect if the LabelPosition is top 
        and it works only for left,right LabelPosition
     */
      if (_initparam.LabelPosition != "top")
     {
        switch (_initparam.LabelTextAlignment) 
        {
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

      //To check DisplayType which is passed through parameter
      switch (_initparam.DisplayType)  
      {

        //checking DisplayType
        case "time":
          _controlDiv.append(_input);

           /**
         * Appending according to the label postion 
         *  if its position is left
         */
          if (_initparam.LabelPosition == "left") 
        {
            _baseContainer.append(_descriptionDiv).css("width", "100%");
            _baseContainer.append(_labelDiv);
            _label.addClass("leftlabel");
            _controlDiv.css(
              "width",
              100 - parseInt(_initparam.LeftDivWidth) + "%"
            );
            _baseContainer.append(_controlDiv);
        } 

           /**
         * Appending according to the label postion 
         *  if its position is top
         */
          else if (_initparam.LabelPosition == "top") 
        {
            _labelDiv.css("width", "100%")
            _baseContainer.append(_labelDiv)
            _baseContainer.append(_descriptionDiv).css("width", "100%");
            _label.addClass("defaultlabel");
            _controlDiv.css("width", "100%")
            _baseContainer.append(_controlDiv);

        } 
          
           /**
         * Appending according to the label postion 
         *  if its position is right
         */
          else if (_initparam.LabelPosition == "right") 
        {
            _baseContainer.append(_descriptionDiv).css("width", "100%");
            _baseContainer.append(_controlDiv);
            _controlDiv.css(
              "width",
              100 - parseInt(_initparam.LeftDivWidth) + "%"
            );
            _baseContainer.append(_labelDiv);
            _label.addClass("rightlabel");
        }
          break;

        //checking DisplayType
        case "date":
          _controlDiv.append(_input2);

           /**
         * Appending according to the label postion 
         *  if its position is left
         */
          if (_initparam.LabelPosition == "left") 
        {
            _baseContainer.append(_descriptionDiv).css("width", "100%");
            _baseContainer.append(_labelDiv);
            _label.addClass("leftlabel");
            _controlDiv.css(
              "width",
              100 - parseInt(_initparam.LeftDivWidth) + "%"
            );
            _baseContainer.append(_controlDiv);
        } 

          /**
         * Appending according to the label postion 
         *  if its position is top
         */
        else if (_initparam.LabelPosition == "top") 
        {
            _labelDiv.css("width", "100%")
            _baseContainer.append(_labelDiv);
            _baseContainer.append(_descriptionDiv).css("width", "100%");
            _label.addClass("defaultlabel");
            _controlDiv.css("width", "100%");
            _baseContainer.append(_controlDiv);
        } 
        
           /**
         * Appending according to the label postion 
         *  if its position is right
         */
        else if (_initparam.LabelPosition == "right") 
        {
            _baseContainer.append(_descriptionDiv).css("width", "100%");
            _baseContainer.append(_controlDiv);
            _controlDiv.css(
              "width",
              100 - parseInt(_initparam.LeftDivWidth) + "%"
            );
            _baseContainer.append(_labelDiv);
            _label.addClass("rightlabel");
        }
          break;

        //checking DisplayType
        case "datetime":
        case  "timedate":
          _controlDiv.append(_input3);

        /**
         * Appending according to the label postion 
         *  if its position is left
         */
          if (_initparam.LabelPosition == "left") 
        {
            _baseContainer.append(_descriptionDiv).css("width", "100%");
            _baseContainer.append(_labelDiv);
            _label.addClass("leftlabel");
            _controlDiv.css(
              "width",
              100 - parseInt(_initparam.LeftDivWidth) + "%"
            );
            _baseContainer.append(_controlDiv);
        } 

       /**
         * Appending according to the label postion 
         *  if its position is top
         */
        else if (_initparam.LabelPosition == "top") 
        {
          _labelDiv.css("width", "100%")
            _baseContainer.append(_labelDiv);
            _baseContainer.append(_descriptionDiv).css("width", "100%");
            _label.addClass("defaultlabel");
             _controlDiv.css("width", "100%");
            _baseContainer.append(_controlDiv);
        }
        
        /**
         * Appending according to the label postion 
         *  if its position is right
         */
        else if (_initparam.LabelPosition == "right") 
        {
            _baseContainer.append(_descriptionDiv).css("width", "100%");
            _baseContainer.append(_controlDiv);
            _controlDiv.css(
              "width",
              100 - parseInt(_initparam.LeftDivWidth) + "%"
            );
            _baseContainer.append(_labelDiv);
            _label.addClass("rightlabel");
        }
          break;
      }
    } 
    
    //if SuppressLabel is true only input is visible
    else 
    {
      _baseContainer.append(_controlDiv);
      switch (_initparam.DisplayType) 
      {
        case "time":
          _controlDiv.append(_input);
          break;
        case "date":
          _controlDiv.append(_input2);
          break;
        case "datetime":
        case "timedate":
          _controlDiv.append(_input3);
          break;
      }
    }
  };

  /**
   * passing values of date and time 
   *
   **/
  // this.DefaultValue = function () {
  //   try {
  //     if (_initparam.DefaultValue !== undefined) {
  //       if (
  //         _initparam &&
  //         (_initparam.DisplayType === "datetime" ||
  //           _initparam.DisplayType === "timedate")
  //       ) {
  //         if (!isValidDateTime(_initparam.DefaultValue)) {
  //           throw new Error(
  //             "Invalid date input, please enter in the format of YYYY-MM-DDTHH:MM"
  //           );
  //         }
  //       } else if (_initparam && _initparam.DisplayType === "time") {
  //         if (!isValidTime(_initparam.DefaultValue)) {
  //           throw new Error(
  //             "Invalid time input, please enter in the format of HH:MM"
  //           );
  //         }
  //       } else {
  //         if (!isValidDate(_initparam.DefaultValue)) {
  //           throw new Error(
  //             "Invalid date input, please enter in the format of YYYY-MM-DD"
  //           );
  //         }
  //       }
  //       //Set values for input fields if they exist
  //       if (_input2) {
  //         _input2.val(_initparam.DefaultValue);
  //         handleInputChange();
  //       }
  //       if (_input) {
  //         _input.val(_initparam.DefaultValue);
  //         handleInputChange();

  //       }
  //       if (_input3) {
  //         _input3.val(_initparam.DefaultValue);
  //         handleInputChange();

  //       }

  //       _isDirty = true;

  //       if (_changeCallback) {
  //         _changeCallback();
  //       }
  //     } 
  //     /**
  //      *Return the current value of input fields if no DefaultValue is provided
  //      */
  //     else {
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

  /**
   * By using this function we can set the values at first it check whether given date and time is valied or not 
   * if its valied then its going to update
   * if its invalied its going to throw a error and in error it show correct format to assing values
   * it check format also
   **/
  this.val = function (val) {
    try {
      if (val !== undefined) {
        if (
          _initparam &&
          (_initparam.DisplayType === "datetime" ||
            _initparam.DisplayType === "timedate")
        ) {
            //to check its valied datetime or not
          if (!isValidDateTime(val.datetime)) {
            throw new Error(
              "Invalid date input, please enter in the format of YYYY-MM-DDTHH:MM"
            );
          }
        } 

            //to check its valied time or not
        else if (_initparam && _initparam.DisplayType === "time") 
        {
          if (!isValidTime(val.time)) {
            throw new Error(
              "Invalid time input, please enter in the format of HH:MM"
            );
          }
        }

            //to check its valied time or not
         else {
          if (!isValidDate(val.date)) {
            throw new Error(
              "Invalid date input, please enter in the format of YYYY-MM-DD"
            );
          }
        }

        //Set values for input fields if they exist
        if (_input2) {
          _input2.val(val.date)
          handleInputChange();
        }
        if (_input) {
          _input.val(val.time);
          handleInputChange()
        }
        if (_input3) {
          _input3.val(val.datetime);
          handleInputChange();
        }

        /**
         * if we edit values of  input manually or by using function its going to
         * @return true 
         *  */ 
        _isDirty = true;

        // if (_changeCallback) {
        //   _changeCallback();
        // }
      } 

       /**
       *Return the current value of input fields if no Value is provided
       */
      else {
        return {
          date: _input2 ? _input2.val() : "",
          time: _input ? _input.val() : "",
          datetime: _input3 ? _input3.val() : "",
        };
      }
    } 
    /**
     * used to through error for invalied inputs
     */
    catch (error) {
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
   * it sets the current(present) date and time for inputs
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
      handleInputChange();
    }
    if (_input) {
      _input.val(`${hours}:${minutes}`);
      handleInputChange();

    }
    if (_input3) {
      _input3.val(`${year}-${month}-${day}T${hours}:${minutes}`);
          handleInputChange();

    }
  };

    /**
   * sets text content for the tooltip mouseover
   * @param {*} toolTipText Edit the title text content on mouseover
   */
  this.toolTipText = function (param) {
    if (_input2) {
      _input2.attr("title", param);
    }
    if (_input) {
      _input.attr("title", param);
    }
    if (_input3) {
      _input3.attr("title", param);
    }
  };

    /**
    * this function helps to edit label text
    * @param{new label text}
    */
  this.label=function(param){
    if(_input){
        _label.text(param)
    }
    if(_input2){
        _label.text(param)
    }
    if(_input3){
        _label.text(param)
    }

  }

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
  function isValidTime(timeStr) 
  {
    if (typeof timeStr !== "string" || !/^\d{2}:\d{2}$/.test(timeStr))
    {
      return false;
    }
    var timeParts = timeStr.split(":");
    var hr = parseInt(timeParts[0], 10);
    var min = parseInt(timeParts[1], 10);
    if (hr >= 0 && hr < 24 && min >= 0 && min < 60) 
    {
      return true;
    } else {
      return false;
    }
  }

  /**
   * used to check wheather the input (date and time) value is valied or not
   **/
  function isValidDateTime(dateTimeLocalStr) 
  {
    var dateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
    if (!dateTimeRegex.test(dateTimeLocalStr)) 
    {
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
   * Event handler to fire whenever the value changes, either when set manually or through object.val(val function)
   **/
//   function handleInputChange(e) {
//     _isDirty = true;
//     console.log("Input values changed");
//     if (_changeCallback) {
//         _changeCallback();
//     }
//     _initparam.onChange(e)
// }
      function handleInputChange()
    {
      _isDirty=true;
      console.log("input value changed");

    } 
     
  /**
   *it contains main div
   **/
  this.getDesign = function () {
    return _baseContainer;
  };

  this.constructor(param);

};
