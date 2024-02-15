document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "Robusta Brazil", img: "1.jpg", price: 15000 },
      { id: 2, name: "Arabica Blanc", img: "2.jpg", price: 18000 },
      { id: 3, name: "Colombian Excellence", img: "3.jpg", price: 20000 },
      { id: 4, name: "Ethiopian Yirgacheffe", img: "4.jpg", price: 22000 },
      { id: 5, name: "Sumatra Mandheling", img: "5.jpg", price: 17000 },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      const cartItem = this.items.find((item) => item.id === newItem.id);
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
      } else {
        this.items = this.items.map((item) => {
          if (item.id !== newItem.id) {
            return item;
          } else {
            item.quantity++;
            item.total = item.quantity * item.price;
            return item;
          }
        });
      }
      this.quantity++;
      this.total += newItem.price;
    },
    remove(id) {
      const cartItem = this.items.find((item) => item.id === id);
      if (cartItem.quantity > 1) {
        this.items = this.items.map((item) => {
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity == 1) {
        this.items = this.items.filter((item) => item.id !== id);
      }

      this.quantity--;
      this.total -= cartItem.price;
    },
  });
});

// Form Validation
const form = document.querySelector("#checkoutForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");

const isFormValid = () => {
  return (
    nameInput.value.trim() !== "" &&
    emailInput.value.trim() !== "" &&
    phoneInput.value.trim() !== ""
  );
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!isFormValid()) {
    alert("Semua kolom harus terisi!");
  } else {
    const formData = new FormData(form);
    const data = new URLSearchParams(formData);
    const objData = Object.fromEntries(data);
    // const message = formatMessage(objData);
    // window.open(
    //   "https://wa.me/6282287469974?text=" + encodeURIComponent(message)
    // );

    // minta transcaction token mengguanakan ajax / fetch

    try {
      const reponse = await fetch('php/placeOrder.php', {
        method: 'POST',
        body: data
      });
      const token = await reponse.text();
      window.snap.pay(token, {
        onSuccess: function (result) {
          /* You may add your own implementation here */
          alert("payment success!");
          console.log(result);
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          alert("wating your payment!");
          console.log(result);
        },
        onError: function (result) {
          /* You may add your own implementation here */
          alert("payment failed!");
          console.log(result);
        },
        onClose: function () {
          /* You may add your own implementation here */
          alert("you closed the popup without finishing the payment");
        },
      });

    } catch (error) {
      console.log(error.message);
    }
  }
});

// Format pesan whatsapp
const formatMessage = (obj) => {
  return `Data Customer
    Nama: ${obj.name}
    Email: ${obj.email}
    No HP: ${obj.phone}
    \n
    Data Pesanan 
    ${JSON.parse(obj.items)
      .map((item) => {
        return `${item.name} (${item.quantity} x ${rupiah(
          item.price
        )}) : ${rupiah(item.total)} \n`;
      })
      .join("")}
    Total: ${rupiah(obj.total)}
    \n\n
    Terimakasih.`;
};

const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
