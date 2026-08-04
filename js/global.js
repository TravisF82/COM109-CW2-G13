document.addEventListener("DOMContentLoaded", () => {
  // Check for active session globally
  const currentUser = GetCurrentUser();

  // Update navigation based on session
  const navLinks = document.querySelectorAll("nav ul li a");
  let memberPortalLink = null;

  navLinks.forEach((link) => {
    if (link.textContent === "Member Portal") {
      memberPortalLink = link;
    }

    // Active State Logic
    if (
      link.href === window.location.href ||
      (window.location.pathname === "/" &&
        link.getAttribute("href") === "./index.html") ||
      (window.location.pathname.endsWith("index.html") &&
        link.getAttribute("href") === "../index.html")
    ) {
      link.classList.add("active");
      // Ensure title is relevant if not already set specifically
      if (document.title === "DriveAway") {
        document.title = `${link.textContent} | DriveAway`;
      }
    }
  });

  if (currentUser && memberPortalLink) {
    memberPortalLink.innerHTML = `<i class="fa-solid fa-user"></i> ${currentUser}`;
  }

  ApplyTheme();
});

function GetCurrentUser() {
  const activeLocal = localStorage.getItem("active_session");
  const activeSession = sessionStorage.getItem("active_session");

  return activeLocal || activeSession;
}

function GetTheme(){
  return localStorage.getItem("theme") || "light";
}

function ApplyTheme(){
  const theme = GetTheme();
  document.documentElement.classList.toggle("dark-theme", theme === "dark");
}