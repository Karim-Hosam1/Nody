//////////////////////////// MENU Toggle /////////////////////////////////////////////////////////

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
    sendNotification("Menu Button is clicked");
  } else {
    // Hide the header panel with animation
    const currentHeight = headerPanel.offsetHeight; // Current visible height
    animateHeight(headerPanel, currentHeight, 0, 300, () => {
      headerPanel.style.display = "none"; // Hide completely after animation
    });
  }
});


//////////////////////////// Video Auto play /////////////////////////////////////////////////////////

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

//////////////////////////// Random Message /////////////////////////////////////////////////////////

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

  gtag('event', 'Random_Message_Shown', {
    'event_category': 'engagement',
    'event_label': 'Random_Message_Shown'
  });
  // console.log("Random_Message_Shown");

  // Auto-close after 20 seconds
  setTimeout(AutocloseMessage, 20000);
}

function AutocloseMessage() {
  closeMessage();
  gtag('event', 'Random_Message_Auto_Closed', {
    'event_category': 'engagement',
    'event_label': 'Random_Message_Auto_Closed'
  });
  // console.log("Random_Message_Auto_Closed");
}

function ManualcloseMessage() {
  closeMessage();
  gtag('event', 'Random_Message_Closed_by_X_button', {
    'event_category': 'engagement',
    'event_label': 'Random_Message_Closed_by_X_button'
  });
  // console.log("Random_Message_Closed_by_X_button");
}

// Function to close the message box
function closeMessage() {
  const messageBox = document.getElementById('messageBox');
  messageBox.classList.remove('show');
}

// // Show a message every 60 seconds (adjust as needed)
// setInterval(showRandomMessage, 60000);

// // Show the first message after 15 seconds
// setTimeout(showRandomMessage, 15000);

// Variables to manage intervals and reading state
let messageInterval = setInterval(showRandomMessage, 60000);
setTimeout(showRandomMessage, 15000); // Initial message after 15 seconds
const letterSection = document.getElementById('letter-paper');
let isReading = false;

// Check if user is still reading without scrolling
function checkReading() {
  const letterPosition = letterSection.getBoundingClientRect();
  if (letterPosition.top < window.innerHeight && letterPosition.bottom > 0) {
    if (!isReading) {
      clearInterval(messageInterval); // Stop messages if in the letter section
      isReading = true;
    }
  } else {
    if (isReading) {
      messageInterval = setInterval(showRandomMessage, 60000); // Resume messages after leaving
      isReading = false;
    }
  }
}

// Event listeners
window.addEventListener('scroll', checkReading);
setInterval(checkReading, 2000); // Check every 2 seconds if user is still reading


//////////////////////////// EmailJS Message /////////////////////////////////////////////////////////


document.addEventListener('DOMContentLoaded', function () {
  emailjs.init("_iB8dyTcg15mPWQcB"); // حط الـ User ID بتاعك من حسابك في EmailJS
});

function sendNotification(eventType) {
  const serviceID = "service_xlmeklg";  // استبدل بالـ Service ID من EmailJS
  const templateID = "template_o9zcj7j";  // استبدل بالـ Template ID من EmailJS

  const templateParams = {
    event_type: eventType,
    user_email: "karimhosam315@gmail.com",  // ممكن تضيف بريد إلكتروني يصلك عليه الإشعار
    message: `Someone just performed this action: ${eventType}`
  };

  emailjs.send(serviceID, templateID, templateParams)
    .then(response => {
      console.log("✅ Notification Sent!", response);
    })
    .catch(error => {
      console.error("❌ Failed to send notification:", error);
    });
}

// إشعار عند دخول الموقع
window.onload = function () {
  sendNotification("User Entered the Website");
};

//////////////////////////// MENU Buttons Messages /////////////////////////////////////////////////////////


document.getElementById("menu_toggle").addEventListener("click", function () {
  gtag('event', 'Menu_click', {
    'event_category': 'interaction',
    'event_label': 'Menu List'
  });
});
document.getElementById("our_story_btn").addEventListener("click", function () {
  gtag('event', 'our_story_btn', {
    'event_category': 'interaction',
    'event_label': 'our_story_btn'
  });
  sendNotification("1- Our Story Button is clicked");
});
document.getElementById("letter_btn").addEventListener("click", function () {
  gtag('event', 'letter_btn', {
    'event_category': 'interaction',
    'event_label': 'letter_btn'
  });
  sendNotification("2- Letter Button is clicked");
});
document.getElementById("downloaded_gift_btn").addEventListener("click", function () {
  gtag('event', 'downloaded_gift_btn', {
    'event_category': 'interaction',
    'event_label': 'downloaded_gift_btn'
  });
  sendNotification("3- Download gift Button is clicked");
});
document.getElementById("Something_special_btn").addEventListener("click", function () {
  gtag('event', 'Something_special_btn', {
    'event_category': 'interaction',
    'event_label': 'Something_special_btn'
  });
  sendNotification("4- Something Special Button is clicked");
});

//////////////////////////// Scroll Messages /////////////////////////////////////////////////////////

// فلاغات للتتبع عشان ما تتكرر الأحداث
let scroll10Triggered = false;
let scroll25Triggered = false;
let scroll50Triggered = false;
let scroll90Triggered = false;
let video10Triggered = false;
let video25Triggered = false;
let video50Triggered = false;
let video90Triggered = false;

// تتبع السكورلينج بحيث الحدث يتسجل مرة واحدة فقط
window.addEventListener('scroll', function () {
  let scrollPosition = window.scrollY + window.innerHeight;
  let documentHeight = document.documentElement.scrollHeight;

  if (scrollPosition >= documentHeight * 0.9 && !scroll90Triggered) {
    gtag('event', '90%_Scroll', {
      'event_category': 'engagement',
      'event_label': '90% Scroll'
    });
    scroll90Triggered = true;
    // console.log("scroll90Triggered");
  }
  else if (scrollPosition >= documentHeight / 2 && !scroll50Triggered) {
    gtag('event', '50%_Scroll', {
      'event_category': 'engagement',
      'event_label': '50% Scroll'
    });
    scroll50Triggered = true;
    scroll90Triggered = false;
    // console.log("scroll50Triggered");
  }
  else if (scrollPosition >= documentHeight / 4 && !scroll25Triggered) {
    gtag('event', '25%_Scroll', {
      'event_category': 'engagement',
      'event_label': '25% Scroll'
    });
    scroll25Triggered = true;
    scroll50Triggered = false;
    scroll90Triggered = false;
    // console.log("scroll25Triggered");
  }
  else if (scrollPosition >= documentHeight / 10 && !scroll10Triggered) {
    gtag('event', '10%_Scroll', {
      'event_category': 'engagement',
      'event_label': '10% Scroll'
    });
    scroll10Triggered = true;
    scroll50Triggered = false;
    scroll25Triggered = false;
    scroll90Triggered = false;
    // console.log("scroll10Triggered");
  }
  else if (scrollPosition < documentHeight / 10) {
    scroll10Triggered = false;
  }
});

//////////////////////////// Video Play and paused Messages /////////////////////////////////////////////////////////

// تتبع الفيديو

// تشغيل الفيديو
video.addEventListener('play', function () {
  gtag('event', 'video_play', {
    'event_category': 'Media',
    'event_label': 'Video Started'
  });
  // console.log("videoPlayed");
});

// إيقاف الفيديو
video.addEventListener('pause', function () {
  gtag('event', 'video_pause', {
    'event_category': 'Media',
    'event_label': 'Video Paused'
  });
  // console.log("videoPause");
});

// انتهاء الفيديو
video.addEventListener('ended', function () {
  gtag('event', 'video_end', {
    'event_category': 'Media',
    'event_label': 'Video Ended'
  });
  // console.log("videoEnd");
});

//////////////////////////// Video Duration Messages /////////////////////////////////////////////////////////

// تتبع التقدم بالفيديو مع الفلاغات
video.addEventListener('timeupdate', function () {
  var currentTime = video.currentTime;
  var duration = video.duration;

  if (currentTime >= duration * 0.9 && !video90Triggered) {
    gtag('event', 'Video_90%', {
      'event_category': 'Media',
      'event_label': 'Video_90%'
    });
    video90Triggered = true;
    // console.log("video90Triggered");
  }
  else if (currentTime >= duration / 2 && !video50Triggered) {
    gtag('event', 'Video_50%', {
      'event_category': 'Media',
      'event_label': 'Video_50%'
    });
    video50Triggered = true;
    video90Triggered = false;
    // console.log("video50Triggered");
  }
  else if (currentTime >= duration / 4 && !video25Triggered) {
    gtag('event', 'Video_25%', {
      'event_category': 'Media',
      'event_label': 'Video_25%'
    });
    video25Triggered = true;
    video50Triggered = false;
    video90Triggered = false;
    // console.log("video25Triggered");
  }
  else if (currentTime >= duration / 10 && !video10Triggered) {
    gtag('event', 'Video_10%', {
      'event_category': 'Media',
      'event_label': 'Video_10%'
    });
    video10Triggered = true;
    video50Triggered = false;
    video25Triggered = false;
    video90Triggered = false;
    // console.log("video10Triggered");
  }
  else if (currentTime < duration / 10) {
    video10Triggered = false;
  }
});

// window.addEventListener('scroll', function () {
//   let scrollPosition = window.scrollY + window.innerHeight;
//   let documentHeight = document.documentElement.scrollHeight;

//   // إذا كان المستخدم قد وصل إلى 50% من الصفحة
//   if (scrollPosition >= documentHeight / 2) {
//     gtag('event', '50%_Scroll', {
//       'event_category': 'engagement',
//       'event_label': '50% Scroll'
//     });
//   }
//   else if (scrollPosition >= documentHeight / 2) {
//     gtag('event', '50%_Scroll', {
//       'event_category': 'engagement',
//       'event_label': '50% Scroll'
//     });
//   }
//   else if (scrollPosition >= documentHeight / 4) {
//     gtag('event', '25%_Scroll', {
//       'event_category': 'engagement',
//       'event_label': '25% Scroll'
//     });
//   }
//   else if (scrollPosition >= documentHeight / 10) {
//     gtag('event', '10%_Scroll', {
//       'event_category': 'engagement',
//       'event_label': '10% Scroll'
//     });
//   }
// });


// // تتبع عند بدء تشغيل الفيديو
// video.addEventListener('play', function () {
//   gtag('event', 'video_play', {
//     'event_category': 'Media',
//     'event_label': 'Video Started'
//   });
// });

// // تتبع عند إيقاف الفيديو
// video.addEventListener('pause', function () {
//   gtag('event', 'video_pause', {
//     'event_category': 'Media',
//     'event_label': 'Video Paused'
//   });
// });

// // تتبع عند الانتهاء من الفيديو
// video.addEventListener('ended', function () {
//   gtag('event', 'video_end', {
//     'event_category': 'Media',
//     'event_label': 'Video Ended'
//   });
// });

// // تتبع التقدم في الفيديو (مثلاً بعد 50% من الفيديو)
// video.addEventListener('timeupdate', function () {
//   var currentTime = video.currentTime;
//   var duration = video.duration;

//   // تتبع إذا كان المستخدم قد شاهد 50% من الفيديو
//   if (currentTime >= duration / 2) {
//     gtag('event', 'video_halfway', {
//       'event_category': 'Media',
//       'event_label': 'Video Halfway'
//     });
//   }
//   else if (currentTime >= duration / 4) {
//     gtag('event', 'video_25', {
//       'event_category': 'Media',
//       'event_label': 'Video 25%'
//     });
//   }
//   else if (currentTime >= duration / 10) {
//     gtag('event', 'video_10', {
//       'event_category': 'Media',
//       'event_label': 'Video 10%'
//     });
//   }
// });
