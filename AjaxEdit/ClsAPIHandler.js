/**
 * API call handler to perform AJAX Call to the server API
 * If url and data have been passed to the default constuctor then process ajax call
 * @param {*} callingObject Mandatory. reference to the calling object using this
 * @param {*} url The URL for the api call
 * @param {*} data The form data that will be sent
 * @param {*} success function reference on success of the AJAX call. If nothing is mentioned, do nothing
 * @param {*} onComplete function reference on complete of the AJAX call. If nothing is mentioned, call HidePleaseWaitScreen 
 * @param {*} beforeSend function reference on before send of the AJAX call. If nothing is mentioned, call ShowPleaseWaitScreen
 * @param {*} onError function reference on error of the AJAX call. If nothing is mentioned, call ErrHandler
 */
class  ClsAPIHandler {
    // Private variable declarations#

    #callingObject = null;
    #url = null;
    #data = null; 
    #success = null;
    #onComplete = null;
    #beforeSend = null;
    #onError = null;
    #type = 'POST';
    #dataType = 'JSON';
    #contentType = false;
    #processData = false;
    #EnableLogging = false;
  
    /**
     * the default constructor.
     * If url and data have been passed then process ajax call
     * @param {*} callingObject 
     * @param {*} url 
     * @param {*} data 
     * @param {*} success 
     * @param {*} onComplete 
     * @param {*} beforeSend 
     * @param {*} onError 
     */
  constructor  (callingObject, options) {
        this.#callingObject = callingObject;
        if (options != undefined) {
            this.#url = options.url;
            this.#data = options.data;
            this.#success = options.success;
            this.#onComplete = options.onComplete;
            this.#beforeSend = options.beforeSend;
            this.#onError = options.onError;
        }

        //Calling object is needed
        if (this.#callingObject == null || this.#callingObject == undefined) {
            throw new Error('callingObject not set');
        } else 
        //If url and data have been passed then process ajax call
        if (this.#url != null && this.#url != undefined && this.#data != null && this.#data != undefined) {
            this.AJAXCall(null)
        }
    };

    
    /**
     * The URL for the api call
     * @param {*} setURL 
     */
        url = function(setURL) {
        this.#url = FBServicesBaseFolder + '/' + setURL;
    }

    /**
     * The form data that will be sent
     * @param {*} setData 
     */
        data = function(setData) {
        this.#data = setData;
    }

    /**
     * reference to the calling object using this
     * @param {*} setCallingObject 
     */
       callingObject = function(setCallingObject) {
        this.#callingObject = setCallingObject;
    }

    /**
     * function reference on success of the AJAX call. If nothing is mentioned, do nothing
     * @param {*} setSuccess 
     */
        success = function(setSuccess) {
        this.#success = setSuccess;
    }

    /**
     * function reference on complete of the AJAX call. If nothing is mentioned, call HidePleaseWaitScreen
     * @param {*} setonComplete 
     */
       onComplete = function(setonComplete) {
        this.#onComplete = setonComplete;
    }

    /**
     * function reference on before send of the AJAX call. If nothing is mentioned, call ShowPleaseWaitScreen
     * @param {*} setbeforeSend 
     */
    beforeSend = function(setbeforeSend) {
        this.#beforeSend = setbeforeSend;
    }

    /**
     * function reference on error of the AJAX call. If nothing is mentioned, call ErrHandler
     * @param {*} setonError 
     */
    onError = function(setonError) {
        this.#onError = setonError;
    }

    /**
     * POST, GET..
     * @param {*} setType 
     */
    type = function(setType) {
        this.#type = setType;
    }

    /**
     * dataType (default: Intelligent Guess (xml, json, script, or html)). Our default is JSON
     * @param {*} setDataType JSON, XML, html, script, jsonp, text, multiple, space-separated values
     */
    dataType = function(setDataType) {
        this.#dataType = setDataType;
    }

    /**
     * contentType (default: 'application/x-www-form-urlencoded; charset=UTF-8')
     * Type: Boolean or String
     * When sending data to the server, use this content type. Default is "application/x-www-form-urlencoded; charset=UTF-8", which is fine for most cases. 
     * If you explicitly pass in a content-type to $.ajax(), then it is always sent to the server (even if no data is sent). As of jQuery 1.6 you can pass false to tell 
     * jQuery to not set any content type header. Note: The W3C XMLHttpRequest specification dictates that the charset is always UTF-8; specifying another charset will 
     * not force the browser to change the encoding. Note: For cross-domain requests, setting the content type to anything other than application/x-www-form-urlencoded, 
     * multipart/form-data, or text/plain will trigger the browser to send a preflight OPTIONS request to the server.
     * @param {*} setContentType default false
     */
    contentType = function(setContentType) {
        this.#contentType = setContentType;
    }

    /**
     * processData (default: true)
     * Type: Boolean
     * By default, data passed in to the data option as an object (technically, anything other than a string) will be processed and transformed into a query string, 
     * fitting to the default content-type "application/x-www-form-urlencoded". 
     * If you want to send a DOMDocument, or other non-processed data, set this option to false.
     * @param {* } setProcessData True or False
     */
    processData = function(setProcessData) {
        this.#processData = setProcessData;
    }

    /**
     * Perform an api call to a certain url with input form data
     * @param {*} varData Optional data to call the AJAX call with
     */
    AJAXCall = function(varData) {
        if (varData == null || varData == undefined) {
            varData = this.#data;
        }

        //Reference
        //https://api.jquery.com/Ajax_Events/
        //https://api.jquery.com/jQuery.ajax/
        $.ajax({
            url: this.#url,
            data: varData,
            cache: false,
            processData: this.#processData,
            contentType: this.#contentType,
            type: this.#type,
            dataType: this.#dataType,

            /**
             * beforeSend
             * Type: Function( jqXHR jqXHR, PlainObject settings )
             * A pre-request callback function that can be used to modify the jqXHR (in jQuery 1.4.x, XMLHTTPRequest) object before it is sent. Use this to set custom headers, etc. 
             * The jqXHR and settings objects are passed as arguments. This is an Ajax Event. Returning false in the beforeSend function will cancel the request. As of jQuery 1.5, 
             * the beforeSend option will be called regardless of the type of request.
             * @param {*} jqXHR 
             * @param {*} settings 
             */
            beforeSend: function (jqXHR, settings) {
                if (this.#EnableLogging) {
                    console.log('beforeSend');
                }
                
                if (this.#beforeSend == null || this.#beforeSend == undefined) {
                    ShowPleaseWaitScreen('Loading. Please wait..');
                } else {
                    this.#beforeSend;
                }
            },

            /**
             * success
             * Type: Function( Anything data, String textStatus, jqXHR jqXHR )
             * A function to be called if the request succeeds. The function gets passed three arguments: The data returned from the server, formatted according to the dataType 
             * parameter or the dataFilter callback function, if specified; a string describing the status; and the jqXHR (in jQuery 1.4.x, XMLHttpRequest) object. As of jQuery 1.5, 
             * the success setting can accept an array of functions. Each function will be called in turn. This is an Ajax Event.
             * @param {*} data 
             * @param {*} textStatus 
             * @param {*} jqXHR 
             */
            success: function (data, textStatus, jqXHR) {
                if (this.#EnableLogging) {
                    console.log('success');
                }
                
                //Call the success function if needed. Else do nothing
                if (this.#success != null && this.#success != undefined) {
                    this.#success(this.#callingObject, data, textStatus, jqXHR);
                }
            },  

            /**
             * error
             * Type: Function( jqXHR jqXHR, String textStatus, String errorThrown )
             * A function to be called if the request fails. The function receives three arguments: The jqXHR (in jQuery 1.4.x, XMLHttpRequest) object, a string describing the 
             * type of error that occurred and an optional exception object, if one occurred. Possible values for the second argument (besides null) are "timeout", "error", "abort", and "parsererror". 
             * When an HTTP error occurs, errorThrown receives the textual portion of the HTTP status, such as "Not Found" or "Internal Server Error." (in HTTP/2 it may instead be 
             * an empty string) As of jQuery 1.5, the error setting can accept an array of functions. Each function will be called in turn. Note: This handler is not called 
             * for cross-domain scripts and cross-domain JSONP requests. This is an Ajax Event.
             * @param {*} jqXHR 
             * @param {*} textStatus 
             * @param {*} errorThrown 
             */
            error: function (jqXHR, textStatus, errorThrown) {
                if (this.#EnableLogging) {
                    console.log('error');
                }
                
                //Call the common error handler. Else call the custom error handler
                if (this.#onError == null || this.#onError == undefined) {
                    ErrHandler("CustFunctions.js", "LoadFormStructure()", jqXHR.responseText, textStatus, "Error occurred while requesting form design.")
                } else {
                    this.#onError(jqXHR, textStatus, errorThrown);
                }
            },

            /**
             * complete
             * Type: Function( jqXHR jqXHR, String textStatus )
             * A function to be called when the request finishes (after success and error callbacks are executed). The function gets passed two arguments: The jqXHR (in jQuery 1.4.x, XMLHTTPRequest) 
             * object and a string categorizing the status of the request ("success", "notmodified", "nocontent", "error", "timeout", "abort", or "parsererror"). As of jQuery 1.5, the 
             * complete setting can accept an array of functions. Each function will be called in turn. This is an Ajax Event.
             * @param {*} responseData 
             */
            complete: function (responseData) {
                if (this.#EnableLogging) {
                    console.log('complete');
                }
                
                //Call the hide wait screen if nothing is specified as the on complete action. Else call the on complete action
                if (this.#onComplete == null || this.#onComplete == undefined) {
                    HidePleaseWaitScreen(responseData);
                } else {
                    this.#onComplete(responseData)
                }
            }
        });
    }
}

// var exampleObject = new CustomForm(13222);
// exampleObject.getFormDesign()
