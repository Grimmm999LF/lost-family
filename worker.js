export default {
  async fetch(request) {

    const data = await request.json();

    // 🔐 zabezpieczenie
    if (data.key !== "lostfamily123") {
      return new Response("Unauthorized", { status: 401 });
    }

    // webhooky
    const webhook1 = "https://discord.com/api/webhooks/1479571466662973440/8efiAZLS0s4VVSAjgSUuTIO0854gV8xkJLy2GMLNxje5yBMQL5GT1m8xtIOsaIwprNYA";
    const webhook2 = "https://discord.com/api/webhooks/1479547039183405076/o6c2xOYNfL2UMLuOK7m7SxAG5CWwhcEX6Uvlwine4yIX0u5chxRuh0Y29RU5QCjBr1mi";

    let webhook;

  if (data.type === "gielda") {
  webhook = webhook1;
  }
  else if (data.type === "market") {
  webhook = webhook2;
  }
    else {
      return new Response("Wrong type", { status: 400 });
    }

    // wysyłanie do Discorda
const discordResponse = await fetch(webhook, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(data.message)
});

if (!discordResponse.ok) {
  const err = await discordResponse.text();
  return new Response("Discord error: " + err, { status: 500 });
}

return new Response("OK - sent to Discord");
