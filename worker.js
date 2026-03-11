export default {
  async fetch(request) {

    if (request.method !== "POST") {
      return new Response("Only POST allowed", { status: 405 });
    }

    const SECRET = "lostfamily123";

    const data = await request.json();

    if (data.key !== SECRET) {
      return new Response("Forbidden", { status: 403 });
    }

    const webhook1 = "https://discord.com/api/webhooks/1479571466662973440/8efiAZLS0s4VVSAjgSUuTIO0854gV8xkJLy2GMLNxje5yBMQL5GT1m8xtIOsaIwprNYA";
    const webhook2 = "https://discord.com/api/webhooks/1479547039183405076/o6c2xOYNfL2UMLuOK7m7SxAG5CWwhcEX6Uvlwine4yIX0u5chxRuh0Y29RU5QCjBr1mi";

    let webhook;

    if (data.type === "gielda") {
      webhook = webhook1;
    } 
    else if (data.type === "log") {
      webhook = webhook2;
    } 
    else {
      return new Response("Wrong type", { status: 400 });
    }

    await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        content: data.message
      })
    });

    return new Response("ok");
  }
}
