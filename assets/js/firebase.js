import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  child,
  get,
  remove,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBjMYBF-iewjbSRAwwSVvEP90GVnNn18PY",
  authDomain: "test-e23b0.firebaseapp.com",
  databaseURL: "https://test-e23b0-default-rtdb.firebaseio.com",
  projectId: "test-e23b0",
  storageBucket: "test-e23b0.appspot.com",
  messagingSenderId: "24538863634",
  appId: "1:24538863634:web:7866e0a021bbbec21360cb",
};

let app = initializeApp(firebaseConfig);
let db = getDatabase(app);

// Contact
var contactCount = 0;

onValue(ref(db, "/contactUser"), (snapshot) => {
  let datas = Object.values(snapshot.val() || {});
  for (let data of datas) {
    contactCount = data.index != null ? data.index : 0;

    let tr = `<tr>
    <th style="font-size: 16px">${contactCount}</th>
    <th style="font-size: 16px">${data.fullname}</th>
    <th style="font-size: 16px">${data.email}</th>
    <th style="font-size: 16px">${data.address}</th>
    <th style="font-size: 16px">${data.phone}</th>
    </tr>`;

    $("#contactTable").append(tr);
  }
});

$("#contactBookBtn").on("click", () => {
  const newUserKey = push(child(ref(db), "contactUser")).key;
  set(ref(db, `/contactUser/${newUserKey}`), {
    index: ++contactCount,
    fullname: $("#fullNameContact").val(),
    email: $("#emailContact").val(),
    address: $("#addressContact").val(),
    phone: $("#phoneContact").val(),
  });

  let sendContact = false;

  if (
    $("#fullNameContact").val().trim() === "" ||
    $("#emailContact").val().trim() === "" ||
    !$("#emailContact").val().trim().includes("@") ||
    $("#addressContact").val().trim() === "" ||
    $("#phoneContact").val().trim() === ""
  ) {
    sendContact = true;
    $("#contactError").fadeIn(150);
    return;
  }

  if (!sendContact) {
    $("#contactError").fadeOut(150);
    $("#contactSuccess").fadeIn(150);

    $("#fullNameContact").val("");
    $("#emailContact").val("");
    $("#addressContact").val("");
    $("#phoneContact").val("");
  }
});

// About

get(ref(db, "/about")).then((snapshot) => {
  let aboutData = snapshot.val() || {};
  let a = `<h1>${aboutData.title}</h1>`;
  $("#abouts").append(a);

  let d = `<p>${aboutData.description}</p>`;

  $("#descriptions").append(d);

  let i = `<img src="${aboutData.image}" alt="">`;

  $("#img").append(i);
});

$(document).on("click", "#addAbout", () => {
  set(ref(db, `/about`), {
    title: $("#aboutTitle").val(),
    image: $("#aboutImage").val(),
    description: $("#aboutDescription").val(),
  });

  $("#aboutTitle").val(""),
    $("#aboutImage").val(""),
    $("#aboutDescription").val("");
});

//Admin Login

onValue(ref(db, "/adminUser"), (snapshot) => {
  const data = Object.values(snapshot.val() || {});
  if (data.length) {
    login();
  } else {
    logout();
  }
});

$("#form-login-panel").on("submit", (e) => {
  e.preventDefault();

  const username = $("#adminUsername").val();
  const password = $("#adminPassword").val();

  if (username == "adminTeam3" && password == "12345") {
    set(ref(db, "/adminUser"), {
      username,
      password,
    });
    login();
  }
});

$("#logoutBtn").on("click", () => {
  logout();
  remove(ref(db, "/adminUser"));
});

function logout() {
  $(document.body).addClass("admin-login");
  $("#navAdmin").addClass("hidden");
  $("#mainAdmin").addClass("hidden");
  $(".container-login-panel").removeClass("hidden");
}

function login() {
  $(document.body).removeClass("admin-login");
  $("#navAdmin").removeClass("hidden");
  $("#mainAdmin").removeClass("hidden");
  $(".container-login-panel").addClass("hidden");
}

// JOIN US

$("#joinBtn").on("click", () => {
  $(".container-join-us").removeClass("hidden");
  $(".bg-joinus").removeClass("hidden");
});

var joinCount = 0;

onValue(ref(db, "/joinUser"), (snapshot) => {
  let datas = Object.values(snapshot.val() || {});

  for (let data of datas) {
    joinCount = data.index != null ? data.index : 0;

    let tr = `<tr>
    <th style="font-size: 16px">${joinCount}</th>
    <th style="font-size: 16px">${data.fullname}</th>
    <th style="font-size: 16px">${data.email}</th>
    </tr>`;

    $("#joinusTable").append(tr);
  }
});

$("#form-join-us").on("submit", (e) => {
  e.preventDefault();
  const newUserKey = push(child(ref(db), "joinUser")).key;
  set(ref(db, `/joinUser/${newUserKey}`), {
    index: ++joinCount,
    fullname: $("#joinusUsername").val(),
    email: $("#joinusEmail").val(),
  });

  $(".container-join-us").addClass("hidden");
  $(".bg-joinus").addClass("hidden");
});

/***************************************************************************** */

var l = 0;
let temp = 0;
let leftPX = 0;
$(".all-books-arrow").on("click", allBooksSlider);
$(".besteller-arrow").on("click", bestellerSlider);
$(".new-releases-arrow").on("click", newReleasesSlider);
function allBooksSlider() {
  l++;
  if ($(this).attr("class") == "all-books-arrow arrow-right") {
    for (let i = 0; i < $(".all-book-cards").length; i++) {
      // if (l > $(".all-book-cards").length - 14) {
      //   continue;
      // }
      console.log("salam");
      if (l > temp) {
        leftPX += 200;
      }
      temp = l;
      $(".all-book-cards")[i].style.left = `-${leftPX}px`;
    }
  }
}
function bestellerSlider() {
  console.log("bestellerSlider active");
}
function newReleasesSlider() {
  console.log("newReleasesSlider active");
}

// var l = 0;
// let temp = 0;
// let leftPX = 0;

// arrow[1].onclick = () => {
//   l++;
//   for (let i = 0; i < cards.length; i++) {
//     if (l > cards.length - 14) {
//       continue;
//     }

//     if (l > temp) {
//       leftPX += 200;
//     }
//     temp = l;

//     cards[i].style.left = `-${leftPX}px`;
//   }
// };

// arrow[0].onclick = () => {
//   l--;
//   for (var i of cards) {
//     if (l == 0) {
//       i.style.left = "0px";
//     }
//     if (l == 1) {
//       i.style.left = "-195px";
//     }
//     if (l == 2) {
//       i.style.left = "-585px";
//     }
//     if (l == 3) {
//       i.style.left = "-780px";
//     }
//     if (l < 0) {
//       l = 0;
//     }
//   }
// };
