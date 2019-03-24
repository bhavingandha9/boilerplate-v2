/* eslint-disable */
$('#savePass').prop('disabled', true)
function onPasswordChange(e) {
  var password = $("#nPassword").val()
  var confirmPassword = $("#rNPassword").val()

  if (!(password == "" && confirmPassword == "")) {
    if (e.target.id === 'nPassword') {
      console.log(!(/^\s+$/.test(password)))
      if (password.length > 5 && !(/^\s+$/.test(password))) {
        if (password === confirmPassword) {
          $("#checkNPassword").html("").removeClass("passIsNotvalid")
          $("#checkRNPassword").html("").removeClass("passIsNotvalid")
          $('#savePass').prop('disabled', false)
        } if (password !== confirmPassword) {
          if (confirmPassword.length > 0) {
            $("#checkRNPassword").html("Passwords do not match!").addClass("passIsNotvalid")
            $('#savePass').prop('disabled', true)
          } else {
            $("#checkNPassword").html("").removeClass("passIsNotvalid")
          }
        }
      } else if (password.length < 1) {
        $("#checkNPassword").html("Password is required.").addClass("passIsNotvalid")
        $('#savePass').prop('disabled', true)
      } else if (/^\s+$/.test(password)) {
        $('#savePass').prop('disabled', true)
        $("#checkNPassword").html("Password can not be only space!")
        $("#checkNPassword").addClass("passIsNotvalid")
      } else {
        $('#savePass').prop('disabled', true)
        $("#checkNPassword").html("Password must be minimum 6 characters")
        $("#checkNPassword").addClass("passIsNotvalid")
      }
    } if (e.target.id === 'rNPassword') {
      if (password !== confirmPassword) {
        if (/^\s+$/.test(password)) {
          $('#savePass').prop('disabled', true)
          $("#checkRNPassword").html("Password can not be only space!")
          $("#checkRNPassword").addClass("passIsNotvalid")
        } else {
          $('#savePass').prop('disabled', true)
          $("#checkRNPassword").html("Passwords do not match!")
          $("#checkRNPassword").addClass("passIsNotvalid")
        }
      } else if (password === confirmPassword) {
        if (/^\s+$/.test(password)) {
          $('#savePass').prop('disabled', true)
          $("#checkRNPassword").html("Password can not be only space!")
          $("#checkRNPassword").addClass("passIsNotvalid")
        } else {
          $("#checkRNPassword").html("").removeClass("passIsNotvalid")
          $('#savePass').prop('disabled', false)
        }
      }

      if (confirmPassword.length > 5) {
        if (password === confirmPassword && !(/^\s+$/.test(password))) {
          $("#checkRNPassword").html("").removeClass("passIsNotvalid")
          $('#savePass').prop('disabled', false)
        } else if (confirmPassword.length < 1) {
          $("#checkRNPassword").html("Password is required.").addClass("passIsNotvalid")
          $('#savePass').prop('disabled', false)
        } if (password !== confirmPassword) {
          if (password.length > 0) {
            $("#checkRNPassword").html("Passwords do not match!").addClass("passIsNotvalid")
            $('#savePass').prop('disabled', true)
          } else {
            $("#checkRNPassword").html("").removeClass("passIsNotvalid")
          }
        }
      } else {
        $('#savePass').prop('disabled', true)
        $("#checkRNPassword").html("Password must be minimum 6 characters")
        $("#checkRNPassword").addClass("passIsNotvalid")
      }
    }
  }
}

function onSavePassword() {
  let password = $("#nPassword").val()
  let confirmPassword = $("#rNPassword").val()
  let temp = window.location.href.split('/')
  let token = temp.pop()
  let data = { "sNewPassword": password, "sNewRetypedPassword": confirmPassword }
  data = JSON.stringify(data)
  $("#checkRNPassword").html("").removeClass("passIsNotvalid")
  $("#checkNPassword").html("").removeClass("passIsNotvalid")
  $.ajax({
    url: `http://35.200.249.42:2000/api/v1/password/reset/${token}`,
    data: data,
    cache: false,
    processData: false,
    contentType: "application/json",
    type: 'POST',
    success: function (response) {
      if (response) {
        $("#server-response").html(`${response.message}`).addClass("passwordChangeRes")
        $("#checkRNPassword").html("").removeClass("passIsNotvalid")
        $("#checkNPassword").html("").removeClass("passIsNotvalid")
        $('#savePass').prop('disabled', true)
        $('#nPassword').prop('disabled', true)
        $('#rNPassword').prop('disabled', true)
      }
    },
    error: function (error) {
      console.log(error)
      console.log("error !", error)
      window.location = "http://35.200.249.42:2000/user/linktimeout"
    }
  })
}

$(document).ready(function () {
  var parameters = location.search.substring(1).split("&")
  $('#savePass').prop('disabled', true)
  $("#nPassword,#rNPassword").keyup(onPasswordChange)

  $("#resetPassForm").submit(function (e) {
    e.preventDefault()
    $("#checkRNPassword").html("").removeClass("passIsNotvalid")
    $("#checkNPassword").html("").removeClass("passIsNotvalid")
    onSavePassword()
    $('#resetPassForm').find('input:password').val('')
  })
})