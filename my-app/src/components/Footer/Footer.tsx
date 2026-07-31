import React from "react";
import footerLogo from "../../assets/logo.png";
import Banner from "../../assets/website/footer-pattern.jpg";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
  FaMobile,
  FaMobileAlt,
} from "react-icons/fa";

const BannerImg = {
  backgroundImage: `url(${Banner})`,
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "100%",
  width: "100%",
};

const FooterLinks = [
  {
    title: "Home",
    link: "/#",
  },
  {
    title: "About",
    link: "/#about",
  },
  {
    title: "Contact",
    link: "/#contact",
  },
  {
    title: "Blog",
    link: "/#blog",
  },
];

export default function Footer() {
  return (
    <div style={BannerImg} className="text-white">
      <div className="container m-auto px-3.75 sm:px-0">
        <div className="grid grid-cols-1 md:grid-cols-4 pb-44 pt-5 gap-3">
          {/* Company details */}
          <div className="py-8 col-span-1">
            <h2 className="text-xl md:text-3xl font-bold sm:text-left text-justify mb-3 flex items-center gap-3">
              <img src={footerLogo} alt="" className="max-w-12.5" />
              BiShop
            </h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
              Placeat odit eligendi perspiciatis doloremque distinctio vitae unde quibusdam quos fugit ex dolor, 
              reiciendis accusamus vero reprehenderit? Delectus deleniti commodi nihil numquam!
            </p>
          </div>
          {/* Footer Link */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:pl-10 col-span-3">
            <div>
              <div className="py-8">
                <h2 className="text-[20px] font-700 sm:text-left capitalize text-justify mb-3">
                  Importtant Link
                </h2>
                <ul className="flex flex-col gap-3">
                  {FooterLinks.map((link) => {
                      return(
                        <li
                          className="cursor-pointer hover:text-primary hover:translate-x-1 duration-300 text-gray-200"
                          key={link.title}
                        >
                          {link.title}
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
            </div>
            <div>
              <div className="py-8">
                <h2 className="text-xl font-700 sm:text-left text-justify mb-3">Links</h2>
                <ul className="flex flex-col gap-3">
                  {
                    FooterLinks.map((link) => (
                      <li
                        className="cursor-pointer hover:text-primary hover:translate-x-1 duration-300 text-gray-200"
                        key={link.title}
                      >
                        <span>{link.title}</span>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3 mt-6">
                <a href="#">
                  <FaInstagram className="text-3xl" />
                </a>
                <a href="#">
                  <FaFacebook className="text-3xl" />
                </a>
                <a href="#">
                  <FaLinkedin className="text-3xl" />
                </a>
              </div>
              <div className="mt-6">
                <div className="flex items-center gap-3">
                  <FaLocationArrow />
                  <p>ThanhHoa City</p>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <FaMobileAlt />
                  <p>+84 123456789</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
