const MAIL_URL = "https://woven-africa.com/mail/";

function FetchDetails() {
  const quantity = {
    name: "quantity",
    value: getInputValueWithName("quantity")
  };

  const forOrganization = {
    name: "forOrganization",
    value: document.querySelector(`input[name='for-organization']:checked`)
      .value
  };

  const fullname = {
    name: "Full name",
    value: getInputValueWithName("fullname")
  };

  const phone = {
    name: "Phone",
    value: getInputValueWithName("phone")
  };

  const email = {
    name: "Email",
    value: getInputValueWithName("email")
  };

  const address = {
    name: "Address",
    value: getInputValueWithName("address")
  };

  const zipcode = {
    name: "Zipcode",
    value: getInputValueWithName("zipcode")
  };

  const country = {
    name: "Country",
    value: getInputValueWithName("country")
  };

  const city = {
    name: "City",
    value: getInputValueWithName("city")
  };

  const state = {
    name: "State / Region",
    value: getInputValueWithName("state")
  };

  // Validate Inputs
  const inputsToValidate = [
    fullname,
    phone,
    email,
    city,
    address,
    quantity,
    zipcode,
    country,
    state
  ];

  for (input of inputsToValidate) {
    if (input.value == "") {
      alert(`Kindly fill the ${input.name} field`);
      return null;
    }
  }

  // If validation passed
  const generatedReference = generateReference();
  const amount = parseInt(quantity.value) * GetPricing(CHECKOUT).total;

  return {
    email: email.value,
    name: fullname.value,
    phone: phone.value,
    organization: forOrganization.value,
    address: address.value,
    zipcode: zipcode.value,
    country: country.value,
    state: state.value,
    city: city.value,
    amount: amount,
    image: PREVIEW_IMAGE,
    reference: generatedReference
  };
}

function CollectPayment(details) {
  const { email, firstname, lastname, amount, phone, reference } = details;
  var PBFKey = "FLWPUBK-620214d9c017ffd1f3393c5d36790b49-X";

  getpaidSetup({
    PBFPubKey: PBFKey,
    customer_email: email,
    customer_firstname: firstname,
    customer_lastname: lastname,
    custom_description: "Pay For Stole",
    custom_title: "Wovenprints Africa",
    amount: amount,
    customer_phone: phone,
    custom_logo: "http://woven-africa.com/img/logo-black.png",
    country: "NG",
    currency: "USD",
    txref: reference,
    onclose: function() {},
    callback: function(response) {
      details.flw_ref = response.tx.flwRef;
      console.log(response);

      // Verify that transaction worked
      if (
        response.tx.chargeResponseCode == "00" ||
        response.tx.chargeResponseCode == "0"
      ) {
        console.log("Send Email!");
        SendEmail(details);
      }
    }
  });
}

function _convertJSONToFormData(body) {
  var urlencoded = new FormData();
  for (let key in body) {
    urlencoded.append(key, body[key]);
  }
  return urlencoded;
}

function SendEmail(details) {
  var requestOptions = {
    method: "POST",
    body: _convertJSONToFormData(details),
    redirect: "follow"
  };

  fetch("https://woven-africa.com/mail/", requestOptions)
    .then(response => response.json())
    .then(res => {
      console.log(res);
      if (res.status == 200 || res.status == "200") {
        console.log("Email sent");
        ShowAlert(
          "Order Successful",
          "info",
          "Thank you for your order. We will be in contact shortly"
        );
      } else {
        ShowAlert(
          "Order Failed",
          "warning",
          "An error occurred. Please try again"
        );
      }
    })
    .catch(error => {
      console.log("Error occurred in sending email");
      console.log("error", error);
    });
}

document.querySelector("#proceed-checkout").onclick = function(e) {
  const details = FetchDetails();
  if (details) {
    details.flw_ref = "something";
    // SendEmail(details);
    CollectPayment(details);
  }
};
