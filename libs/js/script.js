/* Preloader*/
$(window).on('load', function() {
    if ($('#preloader').length) {
        $('#preloader').delay(100).fadeOut('slow', function() {
            $(this).remove();
        });
    }
});

/*On Document Load Hide Property Info Div*/

$(document).ready(function() {
    $('#propertyInfoDiv').hide();
})

/*Use Postcode to Find Address*/

$('#postcodeSearchBtn').on('click', function() {

    $('#addressSelectModal').modal('show');

    $.ajax({
        url: "libs/php/getDataByPostCode.php",
        type: 'POST',
        dataType: 'json',
        data: {
            postcode: $('#postcodeInput').val()
        },

        success: function(result) {

            if (result) {

                /*Populate Property Select Dropdown Menu*/

                $('#chooseAddressSelect').append("<option> Choose Property </option>");

                $.each(result['rows'], function(index) {
                    
                    $('#chooseAddressSelect').append($("<option>", {

                        value: result['rows'][index]['lmk-key'],
                        text: result['rows'][index]['address']
                    }));
                });

                /*On Property Select Show Results in Table Form*/

                $('#chooseAddressSelect').on('change', function() {

                    $('#addressSelectModal').modal('hide');
                    $('#welcomeDiv').hide();

                    $.ajax({
                        url: "libs/php/getAddressData.php",
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            address: $('#chooseAddressSelect').val()
                        },

                        success: function(result) {

                            if (result) {

                                /*Show results*/

                                $('#propertyInfoDiv').show()

                                $('#yourPropertyTable').append(`
                                    <tr>
                                        <td>
                                            ${result['rows'][0]['address']}
                                        </td>
                                        <td>
                                            ${result['rows'][0]['built-form']}
                                        </td>
                                        <td>
                                            ${result['rows'][0]['construction-age-band']}
                                        </td>
                                        <td>
                                            ${result['rows'][0]['current-energy-rating']}
                                        </td>
                                        <td>
                                            ${result['rows'][0]['potential-energy-rating']}
                                        </td>
                                        <td>
                                            ${result['rows'][0]['environment-impact-potential']}    
                                        </td>
                                        <td>
                                            ${result['rows'][0]['co2-emissions-current']} / ${result['rows'][0]['co2-emissions-potential']}                 
                                        </td>
                                        <td>
                                            ${result['rows'][0]['mainheat-energy-eff']}   
                                        </td>
                                        <td>
                                            ${result['rows'][0]['windows-energy-eff']}  
                                        </td>
                                        <td>
                                            ${result['rows'][0]['windows-description']}
                                        </td>
                                    </tr>
                                
                                `);

                                /*Add Comparison data to table if button clicked*/

                                $('#compareBtn').on('click', function() {
                                    $('#addressSelectModal').modal('show');
                                })

                            }
                        }

                    })

                })

            }
        }

    })

})