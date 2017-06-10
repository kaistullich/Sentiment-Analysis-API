$(document).ready(function () {

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
         url: 'http://localhost:5000/process_email',
         data: JSON.stringify(emailData),
         type: 'POST',
         contentType: 'application/json',
         success: (data) => {
            $('#commentTextarea').val('');
         },
         error: (err) => {
            $('#commentTextarea').val('');
         }
      });
   });
});