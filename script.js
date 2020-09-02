
var curLoc = "Cebu";
var selDt = "2020-09-02";

$.getJSON("http://api.weatherapi.com/v1/current.json?key=7070d2302ca9430681251819200808&q=" + curLoc, function(data){
    
    var icon = data.current.condition.icon;
    var weather = data.current.condition.text;
    var temp = data.current.temp_c + " CELSIUS";

    $('.icon').attr('src',icon);
    $('.weather').append(weather);
    $('.temp').append(temp);

});


$(document).ready(function(){
    $('#view_weather').click(function(){
        $.ajax({
        url:'prospects.csv',
        dataType:"text",
        success:function(data)
            {
                var employee_data = data.split(/\r?\n|\r/);
                var table_data = '<table>';
                var table_data1 = '<table>';
                for(var count = 0; count<employee_data.length; count++)
                { 
                    var cell_data = employee_data[count].split(",");
                    table_data += '<tr>';
                    for(var cell_count=0; cell_count<cell_data.length; cell_count++)
                    {
                    curLoc=null;
                    if(count === 0)
                        {
                            if(cell_count === 2 || cell_count === 3 || cell_count === 6 || cell_count === 8)
                            {
                                
                                table_data += '<th>' + cell_data[cell_count] + '</th>';
                                // table_data1 += '<th>Icon</th>';  
                                // table_data1 += '<th>Weather</th>'; 
                                // table_data1 += '<th>Temp</th>'; 
                            }
                            if(cell_count === 9)
                            {
                                
                                table_data1 += '<th>Icon</th>';  
                                table_data1 += '<th>Location</th>';  
                                table_data1 += '<th>Weather</th>'; 
                                table_data1 += '<th>Temp</th>'; 
                            }
                        }
                        else
                        {                            
                            if(cell_count === 2 || cell_count === 3 || cell_count === 8)
                            {
                                table_data += '<td style="padding-bottom:30px; padding-top:30px;">'+ cell_data[cell_count] +'</td>';
                            } 
                            if(cell_count === 6)
                            {
                                table_data += '<td>'+ cell_data[cell_count] +'</td>';
                                curLoc = cell_data[cell_count];  
                                $.getJSON("http://api.weatherapi.com/v1/history.json?key=7070d2302ca9430681251819200808&q=" + curLoc + "&dt=" + selDt, function(data){
                        
                                    sicon = data.forecast.forecastday[0].day.condition.icon;
                                    sweather = data.forecast.forecastday[0].day.condition.text;
                                    stemp = data.forecast.forecastday[0].hour[0].temp_c + " CELSIUS"; 
                                    sloc = data.location.name;

                                    $('#w_data').append('<tr><td><img src="'+sicon+'"</td><td>'+sloc+'</td><td style="padding-bottom:30px; padding-top:30px;">'+sweather+'</td><td>'+stemp+'</td></tr>');
                                }); 
                            }                   
                        }
                    }
                    table_data += '</tr>';
                }
                table_data += '</table>';               
                $('#cust_data').html(table_data);
                table_data1 += '</table>';            
                $('#w_data').html(table_data1);
            }
        });
    });
 });
   