fetch('http://127.0.0.1:5001/api/orders', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    customerDetails: { fullName: "Test", email: "test@test.com", phone: "123", address: "123 st" },
    items: [{ productId: 1, title: "test item", price: 10, image: "" }],
    totalAmount: 10
  })
}).then(async res => {
  console.log("Status:", res.status);
  console.log("Body:", await res.text());
  process.exit(0);
}).catch(console.error);
