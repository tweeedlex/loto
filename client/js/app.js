import * as impAuth from "./modules/authorization.js";
impAuth.registrationForm();
impAuth.createRegistrationForm();

if (impAuth.isAuth()) {
  const eventSource = new EventSource(
    "http://localhost:5001/api/game/connect-loto-room"
  );

  eventSource.onmessage = function (event) {
    console.log(event.data);
  };
}
