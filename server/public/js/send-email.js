$(document).ready(function () {
   let successAlert = $('#emailSuccess').hide();
   let errorAlert = $('#emailError').hide();

   $('form').on('submit', (event) => {
      // prevent default form submit action
      event.preventDefault();

      console.log('submit button clicked');

      // grab text entered into textarea
      let textareaComment = $('#commentTextarea').val();

      // object that will be sent with ajax
      let emailData = {
         comment: textareaComment
      };

      // build ajax request
      $.ajax({
         url: 'http://localhost:5000/process_emai',
         data: JSON.stringify(emailData),
         type: 'POST',
         contentType: 'application/json',
         success: (data) => {
            $('#commentTextarea').val('');
            successAlert.show().html('<b>I received your comment, thanks!</b>');
         },
         error: (err) => {
            $('#commentTextarea').val('');
            errorAlert.show().html('<b>An unexpected error occurred :(</b>');
         }
      });
   });
});