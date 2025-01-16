"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import { IoClose } from "react-icons/io5";
import { CgMenuRightAlt } from "react-icons/cg";
import { nav_links } from "./constants";
import { projects } from "./constants";
import { FaSearch } from "react-icons/fa";
import { SearchContext } from "../Context/SearchContext";

const Navbar = () => {
    const {searchQuery, handleSearch} = useContext(SearchContext);
  const [isDarkBg, setIsDarkBg] = useState(false);
  const [isBlackBg, setIsBlackBg] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearchTab, setShowSearchTab] = useState(false);
 // const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        window.scrollY || document.documentElement.scrollTop;

      // Check if the user has scrolled past the initial screen (i.e., viewport height)
      const hasScrolledPastInitialScreen = scrollPosition > window.innerHeight;

      if (hasScrolledPastInitialScreen) {
        const whiteSections = document.querySelectorAll(".white-section");

        if (whiteSections) {
          const isAnyWhiteSectionVisible = Array.from(whiteSections).some(
            (section) => {
              const rect = section.getBoundingClientRect();
              return rect.top < window.innerHeight && rect.bottom >= 0;
            }
          );

          setIsDarkBg(isAnyWhiteSectionVisible);
        }

        const darkSections = document.querySelectorAll(".dark-section");

        if (darkSections) {
          const isAnyDarkSectionVisible = Array.from(darkSections).some(
            (section) => {
              const rect = section.getBoundingClientRect();
              return rect.top < window.innerHeight && rect.bottom >= 0;
            }
          );

          setIsBlackBg(isAnyDarkSectionVisible);
        }
      } else {
        // If not scrolled past the initial screen, reset the background states
        setIsDarkBg(false);
        setIsBlackBg(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //   useEffect(() => {
  //     if (searchQuery) {
  //       localStorage.setItem("searchQuery", searchQuery);
  //     }
  //   }, [searchQuery]);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
 // Filter projects based on search query
//   const filteredProjects = projects.filter(project =>
//       project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       project.tag.toLowerCase().includes(searchQuery.toLowerCase())
//   );
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleSearch(searchQuery); // Use context's handleSearch
      setShowSearchTab(false); // Optionally hide the search tab after search
    }
  };
  return (
    <nav
      className={`px-4 py-3 lg:px-16 z-40 fixed w-full ${
        isDarkBg
          ? "text-black bg-white drop-shadow-lg"
          : isBlackBg
          ? "text-white bg-black"
          : "text-white bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center">
        <Link href="/" className="font-bold text-4xl">
          <Image
            src={"/logo/sdc-logo-" + `${isDarkBg ? "black.png" : "white.png"}`}
            width={150}
            height={150}
            alt="SDC"
            className="w-24"
          />
        </Link>
        <ul className="hidden lg:flex gap-16 text-base">
          {nav_links.map((link) => (
            <Link key={link.key} href={link.href} className="hover:underline">
              {link.label}
            </Link>
          ))}

          {showSearchTab && (
             <input
             className="px-2 w-64 focus:outline-none rounded-lg placeholder:text-[#a9a9a9] text-[#000000]"
             type="text"
             placeholder="Search"
             value={searchQuery}
             onChange={(e) => handleSearch(e.target.value)} // Use context's handleSearch
             onKeyDown={handleEnter}
           />
          )}
          <div className="bg-yellow-400 hover:bg-orange-500 flex justify-center items-center w-7 h-7 rounded-full cursor-pointer">
            <FaSearch
              className=" hover:text-black text-white w-4 h-4"
              onClick={() => {
                setShowSearchTab(!showSearchTab);
              }}
            />
          </div>
        </ul>
        <div className="flex items-center lg:hidden">
          <button
            onClick={toggleMobileMenu}
            className={`p-1 rounded-full ${isDarkBg ? "bg-black" : "bg-white"}`}
          >
            <CgMenuRightAlt
              className={`w-8 h-8 ${isDarkBg ? "text-white" : "text-black"}`}
            />
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="px-4 py-3 bg-white text-black h-screen w-screen absolute top-0 right-0 items-start lg:hidden">
          <div className="flex justify-between">
            <div className="">
              <Link href="/" className="font-bold text-4xl">
                <Image
                  src={"/logo/sdc-logo-black.png"}
                  width={150}
                  height={150}
                  alt="SDC"
                  className="w-24"
                />
              </Link>
              <ul className="flex flex-col gap-4 mt-8">
                {nav_links.map((link) => (
                  <Link
                    onClick={toggleMobileMenu}
                    key={link.key}
                    href={link.href}
                    className="text-lg font-semibold hover:underline"
                  >
                    {link.label}
                  </Link>
                ))}
              </ul>
            </div>
            <div className="flex items-start">
              <button
                onClick={toggleMobileMenu}
                className="p-1 bg-black rounded-full"
              >
                <IoClose className="w-8 h-8 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
