$(document).ready(function () {
   // success & error divs
   let successAlert = $('#emailSuccess').hide();
   let errorAlert = $('#emailError').hide();

   $('form').on('submit', (event) => {
      // prevent default form submit action
      event.preventDefault();

      // grab text entered into textarea
      let textareaComment = $('#commentTextarea').val();
      // grab text entered into email input
      let emailEntered = $('#emailAddress').val();

      // object that will be sent with ajax
      let emailData = {
         comment: textareaComment,
         emailAddress: emailEntered
      };

      // build ajax request
      $.ajax({
         url: 'http://localhost:5000/process_email',
         data: JSON.stringify(emailData),
         type: 'POST',
         contentType: 'application/json',
         success: (data) => {
            $('#commentTextarea').val('');
            $('#emailAddress').val('');
            successAlert.show().html('<b>I received your comment, thanks!</b>');
         },
         error: (err) => {
            $('#commentTextarea').val('');
            $('#emailAddress').val('');
            errorAlert.show().html('<b>An unexpected error occurred :(</b>');
         }
      });
   });
});