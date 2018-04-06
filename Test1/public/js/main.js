$(document).ready(function(){
  $('.deleteUser').on('click', deleteUser);
});
function deleteUser(){
  // var v = $('.deleteUser').data('id');
  // alert(v);
  var confirmation = confirm('Do yo want to delete?');
  if(confirmation){
    $.ajax({
      type: 'DELETE',
      url: '/users/delete/'+$(this).data('id')
    }).done((response)=>{
      window.location.replace('/');
    });
    window.location.replace('/');
  }else{return false;}
}
