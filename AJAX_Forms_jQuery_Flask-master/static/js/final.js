
 $(document).ready(function(e){
$('#delColumnChild').click(function(){
	$('#my-table').find("tr td:nth-child(1)").each(function(){
    $(this).remove()
});
});

$('#delRowChild').click(function(){
	$('#my-table tr').last().remove()(`<td></td>`);
});
//adding
$('#addColumnChild').click(function(){
	$('#my-table tr').each(function(){
  	$(this).append(`<td></td>`);
  })
});

$('#addRowChild').click(function(){
	$('#my-table tbody').append(`<tr >>${$('#default-row').html()}</tr>`);
});
//imGE HIDE AND SHOW
$('.showbtn').click(function(e){
$('.myimgdivshowhide').show();
});
$('.hidebtn').click(function(e){
$('.myimgdivshowhide').hide();
});
  });