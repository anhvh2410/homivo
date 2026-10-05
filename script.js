// THAY: email nhận yêu cầu tư vấn từ form liên hệ
const EMAIL_NHAN = "lienhe@homivo.vn";

document.documentElement.classList.add("js");
document.getElementById("year").textContent = new Date().getFullYear();

// Nền thanh điều hướng khi cuộn
const header = document.getElementById("header");
const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 20);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Menu trên điện thoại
const nav = document.getElementById("nav");
const navToggle = document.getElementById("navToggle");
const setNav = (open) => {
  nav.classList.toggle("is-open", open);
  navToggle.setAttribute("aria-expanded", String(open));
};
navToggle.addEventListener("click", () => setNav(!nav.classList.contains("is-open")));
nav.addEventListener("click", (e) => { if (e.target.closest("a")) setNav(false); });

// Hiệu ứng xuất hiện khi cuộn tới
const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("is-visible"));
}

// Form liên hệ: chưa có máy chủ nên mở ứng dụng email của khách với nội dung điền sẵn
const form = document.getElementById("contactForm");
const note = document.getElementById("formNote");
if (form) form.addEventListener("submit", (e) => {
  e.preventDefault();
  let hopLe = true;
  form.querySelectorAll("input[required]").forEach((input) => {
    const ok = input.value.trim() !== "" && input.checkValidity();
    input.classList.toggle("is-invalid", !ok);
    if (!ok) hopLe = false;
  });
  if (!hopLe) {
    note.textContent = "Vui lòng nhập họ tên và số điện thoại hợp lệ.";
    return;
  }

  const d = new FormData(form);
  const tieuDe = `Yêu cầu tư vấn - ${d.get("ten")}`;
  const noiDung = [
    `Họ tên: ${d.get("ten")}`,
    `Số điện thoại: ${d.get("sdt")}`,
    `Nhu cầu: ${d.get("nhucau")}`,
    "",
    d.get("noidung"),
  ].join("\n");
  window.location.href =
    `mailto:${EMAIL_NHAN}?subject=${encodeURIComponent(tieuDe)}&body=${encodeURIComponent(noiDung)}`;
  note.textContent = "Đang mở ứng dụng email của bạn để gửi yêu cầu…";
});
