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

class clsCreateInput
 {
   #baseContainer ;
   #labelDiv ;
   #descriptionDiv ;
   #controlDiv ;
   #input;
   #input2;
    #input3;
   #initparam;
   #isDirty;
   #changeCallback;
   #label;
   #description;

 
   constructor (param) 
   {
     this.#initparam = param;
 
    /**
     *  Setting default LabelPosition 
     *   And the default LabelPosition is top
     */
     if(!this.#initparam.LabelPosition)this.#initparam.LabelPosition="top"
 
    /**
     *  Setting default DisplayType 
     *    And the default DisplayType is date (input type="date")
     */
   if(!this.#initparam.DisplayType)this.#initparam.DisplayType="date"
 
     /**
      *     Setting default Label
      *  And the default Label is empty ("")
      */
   if(!this.#initparam.Label)this.#initparam.Label=""
 
      /**
      *     Setting default Width
      *  And the default Width is auto
      */
   if(!this.#initparam.Width)this.#initparam.Width="auto"
 
        /**
      *     Setting default Width
      *  And the default Width is auto
      */
    if(!this.#initparam.Height)this.#initparam.Height="auto"
 
     /**
      *     Setting default SuppressLabel
      *  And the default SuppressLabel is false
      */
   if(!this.#initparam.SuppressLabel)this.#initparam.SuppressLabel=false
 
     // create baseContainer,LabelContainer and Description container
     this.#baseContainer = $("<div>").addClass("test");
     this.#labelDiv = $("<div>").addClass("labelDivclass");
     this.#label = $("<div>");
     this.#descriptionDiv = $("<div>").addClass("descriptionDivClass");
     this.#controlDiv = $("<div>").addClass("controlDivClass");
     this.#labelDiv.append(this.#label).css("width", this.#initparam.LeftDivWidth);
     this.#isDirty = false;
     this.#changeCallback = null;
 

     handleInputChange=()=>
     {
       this.#isDirty=true;
       console.log("input value changed");
 
     } 
      //Checking the DisplayType to create its type of inputTag
     if (
       this.#initparam &&
       (this.#initparam.DisplayType === "datetime" ||
         this.#initparam.DisplayType === "timedate")
     ) 
     
     // creating input tag of type datetime
     {
       this.#input3 = $("<input type='datetime-local'>")
         .attr("title",this.#initparam.ToolTipText)
         .css({ width: this.#initparam.Width, height: this.#initparam.Height })
         .on("change", handleInputChange);
     } 
 
      /**
       * Checking the DisplayType to create its type of inputTag
     creating input tag of type time
       */
     else if (this.#initparam && this.#initparam.DisplayType === "time") 
     {
       this.#input = $("<input type='time'>")
       .attr("title",this.#initparam.ToolTipText)
         .css({ width: this.#initparam.Width, height: this.#initparam.Height })
         .on("change", handleInputChange);   
     } 
 
    /**
     *  Checking the DisplayType to create its type of inputTag
     creating input tag of type date
     */
     else 
     {
       this.#input2 = $("<input type='date'>")
       .attr("title",this.#initparam.ToolTipText)
         .css({ width: this.#initparam.Width, height: this.#initparam.Height })
         .on("change", handleInputChange);
 
     }
 
    /**
     *  Checking the status of  SuppressLabel if its false then Label and Description are visible and 
      if SuppressLabel status is true both Label and Description are not visible
     */
     if (this.#initparam.SuppressLabel == false)
     {
       this.#label.text(this.#initparam.Label);
       this.#description = this.#initparam.Description;
       this.#descriptionDiv.append(this.#description);
       this.#labelDiv.append(this.#label)
       
     /**
      * To set LabelTextAlignment according to LabelPosition it will affect if the LabelPosition is top 
         and it works only for left,right LabelPosition
      */
       if (this.#initparam.LabelPosition != "top")
      {
         switch (this.#initparam.LabelTextAlignment) 
         {
           case 0:
             this.#labelDiv.css("text-align", "left");
             break;
           case 1:
             this.#labelDiv.css("text-align", "center");
             break;
           case 2:
             this.#labelDiv.css("text-align", "right");
             break;
         }
       }
 
       //To check DisplayType which is passed through parameter
       switch (this.#initparam.DisplayType)  
       {
 
         //checking DisplayType
         case "time":
           this.#controlDiv.append(this.#input);
 
            /**
          * Appending according to the label postion 
          *  if its position is left
          */
           if (this.#initparam.LabelPosition == "left") 
         {
             this.#baseContainer.append(this.#descriptionDiv).css("width", "100%");
             this.#baseContainer.append(this.#labelDiv);
             this.#label.addClass("leftlabel");
             this.#controlDiv.css(
               "width",
               100 - parseInt(this.#initparam.LeftDivWidth) + "%"
             );
             this.#baseContainer.append(this.#controlDiv);
         } 
 
            /**
          * Appending according to the label postion 
          *  if its position is top
          */
           else if (this.#initparam.LabelPosition == "top") 
         {
             this.#labelDiv.css("width", "100%")
             this.#baseContainer.append(this.#labelDiv)
             this.#baseContainer.append(this.#descriptionDiv).css("width", "100%");
             this.#label.addClass("defaultlabel");
             this.#controlDiv.css("width", "100%")
             this.#baseContainer.append(this.#controlDiv);
 
         } 
           
            /**
          * Appending according to the label postion 
          *  if its position is right
          */
           else if (this.#initparam.LabelPosition == "right") 
         {
             this.#baseContainer.append(this.#descriptionDiv).css("width", "100%");
             this.#baseContainer.append(this.#controlDiv);
             this.#controlDiv.css(
               "width",
               100 - parseInt(this.#initparam.LeftDivWidth) + "%"
             );
             this.#baseContainer.append(this.#labelDiv);
             this.#label.addClass("rightlabel");
         }
           break;
 
         //checking DisplayType
         case "date":
           this.#controlDiv.append(this.#input2);
 
            /**
          * Appending according to the label postion 
          *  if its position is left
          */
           if (this.#initparam.LabelPosition == "left") 
         {
             this.#baseContainer.append(this.#descriptionDiv).css("width", "100%");
             this.#baseContainer.append(this.#labelDiv);
             this.#label.addClass("leftlabel");
             this.#controlDiv.css(
               "width",
               100 - parseInt(this.#initparam.LeftDivWidth) + "%"
             );
             this.#baseContainer.append(this.#controlDiv);
         } 
 
           /**
          * Appending according to the label postion 
          *  if its position is top
          */
         else if (this.#initparam.LabelPosition == "top") 
         {
             this.#labelDiv.css("width", "100%")
             this.#baseContainer.append(this.#labelDiv);
             this.#baseContainer.append(this.#descriptionDiv).css("width", "100%");
             this.#label.addClass("defaultlabel");
             this.#controlDiv.css("width", "100%");
             this.#baseContainer.append(this.#controlDiv);
         } 
         
            /**
          * Appending according to the label postion 
          *  if its position is right
          */
         else if (this.#initparam.LabelPosition == "right") 
         {
             this.#baseContainer.append(this.#descriptionDiv).css("width", "100%");
             this.#baseContainer.append(this.#controlDiv);
             this.#controlDiv.css(
               "width",
               100 - parseInt(this.#initparam.LeftDivWidth) + "%"
             );
             this.#baseContainer.append(this.#labelDiv);
             this.#label.addClass("rightlabel");
         }
           break;
 
         //checking DisplayType
         case "datetime":
         case  "timedate":
           this.#controlDiv.append(this.#input3);
 
         /**
          * Appending according to the label postion 
          *  if its position is left
          */
           if (this.#initparam.LabelPosition == "left") 
         {
             this.#baseContainer.append(this.#descriptionDiv).css("width", "100%");
             this.#baseContainer.append(this.#labelDiv);
             this.#label.addClass("leftlabel");
             this.#controlDiv.css(
               "width",
               100 - parseInt(this.#initparam.LeftDivWidth) + "%"
             );
             this.#baseContainer.append(this.#controlDiv);
         } 
 
        /**
          * Appending according to the label postion 
          *  if its position is top
          */
         else if (this.#initparam.LabelPosition == "top") 
         {
           this.#labelDiv.css("width", "100%")
             this.#baseContainer.append(this.#labelDiv);
             this.#baseContainer.append(this.#descriptionDiv).css("width", "100%");
             this.#label.addClass("defaultlabel");
              this.#controlDiv.css("width", "100%");
             this.#baseContainer.append(this.#controlDiv);
         }
         
         /**
          * Appending according to the label postion 
          *  if its position is right
          */
         else if (this.#initparam.LabelPosition == "right") 
         {
             this.#baseContainer.append(this.#descriptionDiv).css("width", "100%");
             this.#baseContainer.append(this.#controlDiv);
             this.#controlDiv.css(
               "width",
               100 - parseInt(this.#initparam.LeftDivWidth) + "%"
             );
             this.#baseContainer.append(this.#labelDiv);
             this.#label.addClass("rightlabel");
         }
           break;
       }
     } 
     
     //if SuppressLabel is true only input is visible
     else 
     {
       this.#baseContainer.append(this.#controlDiv);
       switch (this.#initparam.DisplayType) 
       {
         case "time":
           this.#controlDiv.append(this.#input);
           break;
         case "date":
           this.#controlDiv.append(this.#input2);
           break;
         case "datetime":
         case "timedate":
           this.#controlDiv.append(this.#input3);
           break;
       }
     }
   };
 
   /**
    * passing values of date and time 
    *
    **/
   DefaultValue = function () {
     try {
       if (this.#initparam.DefaultValue !== undefined) {
         if (
           this.#initparam &&
           (this.#initparam.DisplayType === "datetime" ||
             this.#initparam.DisplayType === "timedate")
         ) {
           if (!isValidDateTime(this.#initparam.DefaultValue)) {
             throw new Error(
               "Invalid date input, please enter in the format of YYYY-MM-DDTHH:MM"
             );
           }
         } else if (this.#initparam && this.#initparam.DisplayType === "time") {
           if (!isValidTime(this.#initparam.DefaultValue)) {
             throw new Error(
               "Invalid time input, please enter in the format of HH:MM"
             );
           }
         } else {
           if (!isValidDate(this.#initparam.DefaultValue)) {
             throw new Error(
               "Invalid date input, please enter in the format of YYYY-MM-DD"
             );
           }
         }
         //Set values for input fields if they exist
         if (this.#input2) {
           this.#input2.val(this.#initparam.DefaultValue);
           handleInputChange();
         }
         if (this.#input) {
           this.#input.val(this.#initparam.DefaultValue);
           handleInputChange();
 
         }
         if (this.#input3) {
           this.#input3.val(this.#initparam.DefaultValue);
           handleInputChange();
 
         }
 
         this.#isDirty = true;
 
         if (this.#changeCallback) {
           this.#changeCallback();
         }
       } 
       /**
        *Return the current value of input fields if no DefaultValue is provided
        */
       else {
         return {
           date: this.#input2 ? this.#input2.val() : "",
           time: this.#input ? this.#input.val() : "",
           datetime: this.#input3 ? this.#input3.val() : "",
         };
       }
     } catch (error) {
       console.error("Error in val() method:", error.message);
     }
   };
 
   /**
    * By using this function we can set the values at first it check whether given date and time is valied or not 
    * if its valied then its going to update
    * if its invalied its going to throw a error and in error it show correct format to assing values
    * it check format also
    **/
   val = function (val) {
     try {
       if (val !== undefined) {
         if (
           this.#initparam &&
           (this.#initparam.DisplayType === "datetime" ||
             this.#initparam.DisplayType === "timedate")
         ) {
             //to check its valied datetime or not
           if (!isValidDateTime(val.datetime)) {
             throw new Error(
               "Invalid date input, please enter in the format of YYYY-MM-DDTHH:MM"
             );
           }
         } 
 
             //to check its valied time or not
         else if (this.#initparam && this.#initparam.DisplayType === "time") 
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
         if (this.#input2) {
           this.#input2.val(val.date)
           handleInputChange();
         }
         if (this.#input) {
           this.#input.val(val.time);
           handleInputChange()
         }
         if (this.#input3) {
           this.#input3.val(val.datetime);
           handleInputChange();
         }
 
         /**
          * if we edit values of  input manually or by using function its going to
          * @return true 
          *  */ 
         this.#isDirty = true;
 
         // if (this.#changeCallback) {
         //   this.#changeCallback();
         // }
       } 
 
        /**
        *Return the current value of input fields if no Value is provided
        */
       else {
         return {
           date: this.#input2 ? this.#input2.val() : "",
           time: this.#input ? this.#input.val() : "",
           datetime: this.#input3 ? this.#input3.val() : "",
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
    isFilled = function () {
     if (
       this.#initparam.DisplayType === "datetime" ||
       this.#initparam.DisplayType === "timedate"
     ) {
       return this.#input2 && this.#input2.val() !== "" && this.#input && this.#input.val() !== "";
     } else if (this.#initparam.DisplayType === "time") {
       return this.#input && this.#input.val() !== "";
     } else {
       return this.#input2 && this.#input2.val() !== "";
     }
   };
 
   /**
    * it is used to clear input field
    *
    **/
   clear = function () {
     if (this.#input2) {
       this.#input2.val("");
     }
     if (this.#input) {
       this.#input.val("");
     }
     if (this.#input3) {
       this.#input3.val("");
     }
     this.#isDirty = false;
   };
 
   /**
    * it used to see data is alterd or not
    *@return in true or false
    **/
   isDirty = function () {
     return this.#isDirty;
   };
 
   /**
    * it sets the current(present) date and time for inputs
    *
    **/
   initNow = function () {
     var now = new Date();
     var year = now.getFullYear();
     var month = ("0" + (now.getMonth() + 1)).slice(-2);
     var day = ("0" + now.getDate()).slice(-2);
     var hours = ("0" + now.getHours()).slice(-2);
     var minutes = ("0" + now.getMinutes()).slice(-2);
 
     if (this.#input2) {
       this.#input2.val(`${year}-${month}-${day}`);
       handleInputChange();
     }
     if (this.#input) {
       this.#input.val(`${hours}:${minutes}`);
       handleInputChange();
 
     }
     if (this.#input3) {
       this.#input3.val(`${year}-${month}-${day}T${hours}:${minutes}`);
           handleInputChange();
 
     }
   };
 
     /**
    * sets text content for the tooltip mouseover
    * @param {*} toolTipText Edit the title text content on mouseover
    */
   toolTipText = (param) =>{
     if (this.#input2) {
       this.#input2.attr("title", param);
     }
     if (this.#input) {
       this.#input.attr("title", param);
     }
     if (this.#input3) {
       this.#input3.attr("title", param);
     }
   };
 
     /**
     * this function helps to edit label text
     * @param{new label text}
     */
   label=(param)=>{
     if(this.#input){
         this.#label.text(param)
     }
     if(this.#input2){
         this.#label.text(param)
     }
     if(this.#input3){
         this.#label.text(param)
     }
 
   }
 
   /**
    * used to check wheather the input (date) value is valied or not
    **/
 isValidDate=(dateStr)=> {
     var date = new Date(dateStr);
     return !isNaN(date.getTime());
   }
 
   /**
    * used to check wheather the input (time) value is valied or not
    **/
   isValidTime=(timeStr) =>
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
 isValidDateTime=(dateTimeLocalStr)=>
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
 //     this.#isDirty = true;
 //     console.log("Input values changed");
 //     if (this.#changeCallback) {
 //         this.#changeCallback();
 //     }
 //     this.#initparam.onChange(e)
 // }
   
      
   /**
    *it contains main div
    **/
  getDesign = ()=> {
     return this.#baseContainer;
   };
 

 
};
 