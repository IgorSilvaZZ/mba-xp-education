import eventEmitter from "./events.js";

eventEmitter.emit("testEvent", {
  name: "Igor Silva",
  email: "igor@email.com",
});
