$( document ).ready(() => {
  $("#generate").click(() => {
      let input = $("#input").val();
      let header_rows = $("#ignore").val();
      let column_headers = $("#headers").val();
      let regexp = $("#regexp").val();

      let output = generate(input, header_rows, column_headers, regexp);

      $("#output").val(output);
    });
});