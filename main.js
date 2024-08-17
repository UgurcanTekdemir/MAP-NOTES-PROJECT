import { setStorage } from "./helpers.js";

// ! HTML'den gelenler
const form = document.querySelector("form");
const list = document.querySelector("ul");

// ! Olay İzleyicileri
form.addEventListener("submit", handleSubmit);

//! Orta kullanım alanı
let map;
let coords = [];
let notes = [];

//*Kullanıcının konumunu öğrenme
navigator.geolocation.getCurrentPosition(
  loadMap,
  console.log("Kullanıcı kabul etmedi.")
);
//* Haritaya tıklanınca çalışır
function onMapClick(e) {
  form.style.display = "flex";
  coords = [e.latlng.lat, e.latlng.lng];
  console.log(coords);
}
// *Kullanıcının onumuna göre ekrana haritayı gösterme
function loadMap(e) {
  //haritanın kurulumu
  map = new L.map("map").setView([e.coords.latitude, e.coords.longitude], 10);
  L.control;
  //haritanın nasıl gözükeceğini belirler
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  map.on("click", onMapClick);
}
// Form gönderildiğinde çalışır.
function handleSubmit(e) {
  e.preventDefault();
  console.log(e);
  const desc = e.target[0].value;
  const date = e.target[1].value;
  const status = e.target[2].value;

  //note dizisine eleman ekleme

  notes.push({ id: new Date().getTime(), desc, date, status, coords });
  console.log(notes);
  //localstorage güncelleme
  setStorage(notes);
  //notları ekrana aktarabilmek için fonksiyona notes dizisini parmetre olarak gönderdik
  renderNoteList(notes);

  //*form gönderildiğinde kapanır.
  form.style.display = "none";
}

function renderNoteList(item) {
  list.innerHTML = "";

  item.forEach((item) => {
    const listElement = document.createElement("li");
    listElement.dataset.id = item.id;
    
    listElement.interHTML = `
   <div>
   <p>${item.desc}</p>
   <p><span>Tarih:</span>${item.date}</p>
   <p><span>Durum:</span>Ziyaret</p>
 </div>
 <i class="bi bi-x-lg" id="delete"></i>
 <i class="bi bi-airplane-fill" id="fly"></i>
   `;
    list.appendChild(listElement);
  });
}
