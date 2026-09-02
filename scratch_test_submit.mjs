import { submitContact } from "./src/lib/contact.functions";

async function testServerFn() {
  const payload = {
    inquiry_type: "technical",
    name: "Test Name",
    email: "test@example.com",
    phone: "12345678",
    organization: "Test Org",
    audience_type: "developer",
    need_type: "water-treatment",
    location_text: "Cairo",
    capacity: "1000",
    supplier_category: "",
    website: "",
    message: "This is a test message from script",
    consent: true,
    honeypot: "",
  };

  try {
    const res = await submitContact({ data: payload });
    console.log("Response:", res);
  } catch (err) {
    console.error("Error:", err);
  }
}

testServerFn();
