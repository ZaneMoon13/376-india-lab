//our shorthand doc ready function
//currently everything is nested in here 
//todo: define functions and put them outside of this, then only call them from in here. 
$(function() {
    //regular expression of only letters
    let alphaRegex = /^[a-zA-Z]*$/;

    //my array of petNames
    //its a nested array, meaning, item 0 "cat" has an array in the item
    //this is used for the "dependent inputs" in example #5
    let petNames = [
        ["tank", ["Rein", "Zarya", "Winston", "Wrecking Ball"]],
        ["dps", ["Cassidy", "Widowmaker", "Ashe"]],
        ["support", ["Lucio", "Moria", "Mercy"]],
    ];

    //example #1 code: ensures no spaces on blur
    //blur = when user clicks out of that DOM element (in this case it is a text input)
    $("#noSpaces").blur(function() {
        //first grab the value from the textbox and put in a variable
        let inputVal = $(this).val();
        //initialize an string variable that represents a space
        let strSpace = " ";
        //found this online, initialize a variable to count number of spaces in a string
        //takes the variable of the input and runs the split() method
        //which is an array method to chop it up whenever it finds the search parameter, in the case a space (" ")
        let spaceCount = inputVal.split(" ").length - 1;

        console.log(spaceCount);
        if (spaceCount === 0) {
            $(this).next().text("all good");
        } else if (spaceCount > 0) {
            $(this).next().text("no spaces allowed in User Name");
        }
    });

    $("#noAlpha").keyup(function(e) {
        e.preventDefault();
        this.value = this.value.replace(/[^0-9\.]/g, "");
        $(this).next().text("remember, no alpha!");
    });

    $("#noNumbers").on("input", function() {
        let inputVal = $(this).val();

        if (alphaRegex.test(inputVal)) {
            $(this).removeClass("error").addClass("success");
            $(this).next().text("super cool!");
        } else {
            $(this).removeClass("success").addClass("error");
            $(this).next().text("ah, farts!");
        }
    });

    //TODO: key down not working, need immediate change?
    $("#noNumbersDown").keydown(function(e) {
        let inputVal = $(this).val();

        // test input value against regular expression
        if (alphaRegex.test(inputVal)) {
            $(this).removeClass("error").addClass("success");
            $(this).next().text("super cool!");
        } else {
            $(this).removeClass("success").addClass("error");
            $(this).next().text("ah, farts!");
        }
    });

    //when user selects species of pet...load in names from array
    $("#petKind").on("change", function(e) {
        //enables the pet name dropdown
        $("#petName").prop("disabled", false);

        let inputVal = this.value;

        // console.log(inputVal);

        //loop though array of pet names
        $.each(petNames, function(key, value) {
            //match pet name to user selected
            if (inputVal === value[0]) {
                // console.log(value[0] + key + value);
                $.each(value, function(nestKey, nestValue) {
                    // console.log(nestKey);

                    switch (nestKey) {
                        case 0:
                            $("label[for=petName]").text(nestValue);
                            $("#petName").empty();
                            $("#petName").append(
                                $("<option>").text(`select a ${nestValue} `)
                            );
                            break;
                        case 1:
                            $.each(nestValue, function(nameKey, nameValue) {
                                console.log(nameKey, nameValue);

                                $("#petName").append(
                                    $("<option>").val(nameValue).text(nameValue)
                                );
                            });
                            break;
                    }
                });
            }
        });
    });

    $('#submitButton').click(function() {

        if ($('#noSpaces').val()) {
            console.log("there is something in this text box");
            $('#noSpaces').removeClass("error")
        } else {
            console.log("there is NOTHING in this text box");
            $('#noSpaces').removeClass("success").addClass("error").focus();
            //bring focus to it
            //change the placeholder text 

        }

    })

    //loading in JSON data from w3c:https://www.w3schools.com/jquery/ajax_getjson.asp
    $('#DONOTFIRETHISCODE').click(function() {
        console.log("clicked");

        // let jsonURL = "https://www.w3schools.com/jquery/demo_ajax_json.js";

        // let jsonURL = "https://barrycumbie.github.io/376-india-lab/demo.json?callback=?";

        let jsonURL = "../demo.json"

        // #1 failed: 
        // let ajxReq = $.ajax({
        //     url: jsonURL,
        //     contentType: 'application/json',
        //     dataType: 'json',
        //     headers: {
        //         "Accept": "application/json",
        //         'Access-Control-Allow-Origin': jsonURL

        //     }
        // });

        // #2 failed
        // $.getJSON(jsonURL, function(result) {
        //     console.log(JSON.stringify(res));

        //     $.each(result, function(i, field) {
        //         console.log(i);
        //         $("#dataContainer").append(field + " ");
        //     });
        // });

        // #3 
        // $.getJSON(jsonURL + 'jsonp?callback=?', {}, function(data) {     console.log(data);     }); //get JSON

        // #4 
        $.ajax({
            url: jsonURL,

            // The name of the callback parameter, as specified by the YQL service
            jsonp: "callback",

            // Tell jQuery we're expecting JSONP
            dataType: "jsonp",

            // Tell YQL what we want and that we want JSON
            data: {
                format: "json"
            },

            // Work with the response
            success: function(response) {
                console.log(response); // server response
            }
        });


        //end of btn click event     
    });



    // https://www.educba.com/jquery-ajax-headers/
    //         <script type = "text/javascript">
    // $(document).ready( function () {
    // $('#Btn').click( function(){
    // // url from where we want to get the data
    // var ajxReq = $.ajax( { url : 'http://time.jsontest.com',
    // contentType : 'application/json',
    // dataType : 'json',
    // headers: {"Accepts": "text/plain; charset=utf-8"}
    // });
    // ajxReq.success( function ( data, status, jqXhr ) {
    // $( '#p1' ).append( '<h3> The json data details is : </h3>');
    // $( '#p1' ).append( '<p> Dagitte : ' + data.date + '</p>');
    // $( '#p1' ).append( '<p> Milliseconds_since_epoch : ' + data.milliseconds_since_epoch + '</p>');
    // $( '#p1' ).append ('<p> Time: ' + data.time + '</p>');
    // $( '#p1' ).append( '<p> The request status is : ' + status + '</p>');
    // });
    // ajxReq.error( function ( jqXhr, textStatus, errorMessage ) {
    // $( "p" ).append( "The status is :" +textStatus);
    // });
    // });
    // });
    // </script>
    // <

    //     $('#Btn').click(function() {
    //         // url from where we want to get the data
    //         var ajxReq = $.ajax({
    //             url: 'http://time.jsontest.com',
    //             contentType: 'application/json',
    //             dataType: 'json',
    //             headers: { "Accept": "application/json" }
    //         });
    //         ajxReq.success(function(data, status, jqXhr) {
    //             $('#p1').append('<h3> The json data details is : </h3>');
    //             $('#p1').append('<p> Date : ' + data.date + '</p>');
    //             $('#p1').append('<p> Milliseconds_since_epoch : ' + data.milliseconds_since_epoch + '</p>');
    //             $('#p1').append('<p> Time: ' + data.time + '</p>');
    //             $('#p1').append('<p> The request status is : ' + status + '</p>');
    //         });
    //         ajxReq.error(function(jqXhr, textStatus, errorMessage) {
    //             $("p").append("The status is : " + textStatus);
    //         });
    //     });
    // }); <
    // /script>

    // 1. 


    // });

    // end of doc ready f/n
});



// some more code to steal...
// div class="container">
//   <input type='text' id='name' placeholder='Enter your name'><br/><br/>
//   <input type='text' id='age' placeholder='Enter your age'>
// </div>

// <!-- Script -->
// <script>
// $(document).ready(function(){
//   $("#age").keypress(function(e){
//     var keyCode = e.which;
//     /*
//     8 - (backspace)
//     32 - (space)
//     48-57 - (0-9)Numbers
//     */
//     if ( (keyCode != 8 || keyCode ==32 ) && (keyCode < 48 || keyCode > 57)) {
//       return false;
//     }
//   });

//   $("#name").keypress(function(e){
//     var keyCode = e.which;

//     /*
//     48-57 - (0-9)Numbers
//     65-90 - (A-Z)
//     97-122 - (a-z)
//     8 - (backspace)
//     32 - (space)
//     */
//     // Not allow special
//     if ( !( (keyCode >= 48 && keyCode <= 57)
//       ||(keyCode >= 65 && keyCode <= 90)
//       || (keyCode >= 97 && keyCode <= 122) )
//       && keyCode != 8 && keyCode != 32) {
//       e.preventDefault();
//     }
//   });
// });
// </script>