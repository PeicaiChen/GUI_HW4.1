

/* GUI Assignment: Creating an Interactive Dynamic Table and save it into JQuery Tabs, Validation Plugin

 Description: Using the jQuery Validation plugin to validate the dynamic multiplication table, check unvalid
 input, use slider and input box for user to enter input, save the dynamic multiplication table into tabs, 
 add delete function to enable user delete individual tab or delete multiple tabs at a time. Check any errors.


 Peicai Chen, Peicai_Chen@student.uml.edu

 11/11/2021 */

/*
 Source Help:
 https://www.includehelp.com/code-snippets/javascript-function-to-display-table-of-an-entered-number.aspx
 https://stackoverflow.com/questions/41465569/multiplication-table-in-javascript
 https://www.geeksforgeeks.org/how-to-display-error-without-alert-box-using-javascript/
 https://html.form.guide/html-form/html5-input-type-range/
 http://jsfiddle.net/2rS4V/
 https://www.tutorialspoint.com/jqueryui/jqueryui_slider.htm
*/

    
//initialize 0 tab created
var tabIndex = 0;   

//function to save multiplication table into tabs
function saveTable(){
    
    $("#myTabs").tabs();

  
    var minCol;
    var maxCol;
    var minRow;
    var maxRow;

    //get four inputs from user
    minCol = Number(document.getElementById("slider1_amount").value);
    maxCol = Number(document.getElementById("slider2_amount").value);
    minRow = Number(document.getElementById("slider3_amount").value);
    maxRow = Number(document.getElementById("slider4_amount").value);


    tabIndex++;

    //append tabs title
    $("<li class='ui-close'><a href='#tab-" + tabIndex + "' >" + "Col:" + minCol +" ~ " + maxCol + "/Row:" +  minRow + " ~ " + maxRow + "</a>" +  
    //append little tab delete button
    "<span class='ui-icon ui-icon-close' role='presentation'></span>"+ "</li>").appendTo("#myTabs .ui-tabs-nav");


    
    //append tabs content
    var table = '<table id="tab-' + tabIndex + '" class="ui-close"  >' + $("#MTable").html() + '</table>';
    $( "div#myTabs" ).append( table );
    $("#myTabs").tabs("refresh");


    //tab close icon function https://jqueryui.com/tabs/#manipulation
    $(".ui-icon-close").on( "click", function() {
            var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
            $( "#" + panelId ).remove();
            $("#myTabs").tabs("refresh");
        });

    // Make the new tab active
    $( "#myTabs" ).tabs("option", "active", -1);   

   
}

//As user change input, call printTable function to change dynamic multiplication table
function printTable() {
    
    var minCol;
    var maxCol;
    var minRow;
    var maxRow;

    //get four inputs from user
    minCol = Number(document.getElementById("slider1_amount").value)-1;
    maxCol = Number(document.getElementById("slider2_amount").value)-1;
    minRow = Number(document.getElementById("slider3_amount").value)-1;
    maxRow = Number(document.getElementById("slider4_amount").value)-1;

    //make multiplication table scrollable
    var table = document.getElementById("MTable");
    table.style.overflow = "scroll";

    //display the table
    var output = "";

    for (var i = minRow; i <= maxRow+1; i++) {

        output+="<tr>";
        for(var j = minCol; j<= maxCol+1; j++){
            //empty the up left corner box
            if(i==minRow && j==minCol)
                output += "<th></th>";
            //display first row and first column
            else if(i == minRow){
                
                output += "<th>" + j + "</th>";
            } 
            else if(j == minCol){
                
                output += "<th>" + i + "</th>";
            } 
            //display the rest data
            else if(i>minRow && j>minCol){
                output+="<td>"+i*j+"</td>";
            }          
           
        } 
        output+="</tr>";  
        
    }
    table.innerHTML = output;
    
}



//When slider handle move, update table
document.getElementById("slider1").onmouseup = function() {printTable()};
document.getElementById("slider2").onmouseup = function() {printTable()};
document.getElementById("slider3").onmouseup = function() {printTable()};
document.getElementById("slider4").onmouseup = function() {printTable()};



//Tabs remove function clickable
function Remove(){
   
        $(".ui-close" ).remove();
        $("#myTabs").tabs("refresh");
       
}