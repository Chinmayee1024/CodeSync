import React from "react";

function Footer() {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <>
      <div class="wave-container wave">
        <p>
          © {year}, Developed & Designed with ❤️ by{" "}
          <a
            className="footer_chinmayee"
            target="_chinmayee"
            href="https://chinmayeemohanty.netlify.app/"
          >
            Chinmayee Mohanty
          </a>
        </p>
      </div>
    </>
  );
}

export default Footer;
