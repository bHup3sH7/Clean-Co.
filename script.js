

const SERVICES = [
    { id: 1, name: "Wash & Fold", desc: "Wash, dry & fold", price: 149, bg: "#dbeafe", icon: "👕" },
    { id: 2, name: "Dry Cleaning", desc: "Delicate garment care", price: 299, bg: "#fce7f3", icon: "👔" },
    { id: 3, name: "Ironing", desc: "Crisp, wrinkle-free", price: 99, bg: "#fef9c3", icon: "🧺" },
    { id: 4, name: "Stain Removal", desc: "Tough stain treatment", price: 199, bg: "#dcfce7", icon: "🫧" },
    { id: 5, name: "Comforter/Duvet", desc: "Bulky bedding care", price: 499, bg: "#f3e8ff", icon: "🛏️" },
    { id: 6, name: "Shoe Cleaning", desc: "Deep clean footwear", price: 249, bg: "#ffedd5", icon: "👟" },
    { id: 7, name: "Express Service", desc: "3-hour turnaround", price: 599, bg: "#fee2e2", icon: "⚡" },
];

let cart = {};

function renderServices() {
    document.getElementById('serviceList').innerHTML = SERVICES.map(s => `
        <div class="service-card">
            <div class="svc-icon" style="background:${s.bg}">${s.icon}</div>
            <div class="svc-info"><h4>${s.name}</h4><p>${s.desc}</p></div>
            <span class="svc-price">$${s.price}</span>
            <button class="remove-btn" onclick="remove(${s.id})">-</button>
            <button class="add-btn" onclick="add(${s.id})">+</button>
        </div>`).join('');
}

function add(id) {
    const s = SERVICES.find(x => x.id === id);
    if (!cart[id]) cart[id] = { ...s, qty: 0 };
    cart[id].qty++;
    renderCart();
}

function remove(id) {
    if (cart[id]) {
        cart[id].qty--; if (cart[id].qty <= 0) delete cart[id];
    }
    renderCart();
}

function renderCart() {
    const items = Object.values(cart);
    const total = items.reduce((s, i) => s + i.price * i.qty, 0);
    document.getElementById('cartEmpty').style.display = items.length ? 'none' : 'block';
    document.getElementById('cartItems').innerHTML = items.map(i =>
        `<div class="cart-item">
        <span>${i.icon} ${i.name} x${i.qty}</span>
        <strong>$${i.price * i.qty}</strong>
        </div>`
    ).join('');
    document.getElementById('totalAmt').textContent = total;
}

function bookNow() {
    const name = document.getElementById('fName').value.trim();
    const email = document.getElementById('fEmail').value.trim();
    const phone = document.getElementById('fPhone').value.trim();
    const item = Object.values(cart);
    const total = item.reduce((s, i) => s + i.price * i.qty, 0)
    if (!name || !email || !phone) return alert('Please Fill in All the FIELDs.');
    if (!item.length) return alert('Please ADD atleast one SERVICE.');

    const summary = item.map(i => `${i.name} x${i.qty}=$${i.price * i.qty}`).join(', ');

    let params = {
        name: document.getElementById('fName').value,
        email: document.getElementById('fEmail').value,
    }
    emailjs.send("service_4y02jwf", "template_ifzcf89", params, {
        to_name: name, to_email: email, phone, order_summary: summary, total_amount: `$${total}`
    }).catch(e => console.warn("EmailJS (C8p546hEgc8i0R871):", e));

    document.getElementById('successMsg').style.display = 'block';
    ['fName', 'fEmail', 'fPhone'].forEach(id => document.getElementById(id).value = '');
    cart = {}; renderCart();
}

// function sendMail() {
//     let params = {
//         name: document.getElementById('fName').value,
//         email: document.getElementById('fEmail').value,
//     }

// }

renderServices();