import React, { useState } from "react"; // ✅ added useState
import { motion } from "framer-motion";
import DashMain from "../../components/Dashboard/DashMain";
import DynamicText from "../../components/Home/DynamicText";
import ThemeControls from "../../components/Theme/ThemeControls";
import { useThemeColors } from "../../hooks/useThemeColors";
import myMg from "../../assets/Dashboard/mymg.svg";
import top from "../../assets/Dashboard/mytopicon.svg";
import bottom from "../../assets/Dashboard/mybottomicon.svg";
import menu from "../../assets/Dashboard/menu.svg";
import { useNavigate, useLocation } from "react-router-dom";
import MobileNav from "../../components/Dashboard/MobileNav";

/* ✅ nav icons (ONLY for MobileNav) */
import Homeicon from "../../assets/Dashboard/HomeIcon.svg";
import HomeiconActive from "../../assets/Dashboard/HomeINotActive.svg";
import Abouticon from "../../assets/Dashboard/AboutIcon.svg";
import AboutActive from "../../assets/Dashboard/AboutActive.svg";
import Serviceicon from "../../assets/Dashboard/ServiceIcon.svg";
import ServiceActive from "../../assets/Dashboard/ServiceActive.svg";
import Projecticon from "../../assets/Dashboard/ProjectsIcon.svg";
import ProjectActive from "../../assets/Dashboard/ProjectsActive.svg";
import Contacticon from "../../assets/Dashboard/ContactIcon.svg";
import ContactActive from "../../assets/Dashboard/ContactActive.svg";

const Home: React.FC = () => {
  const { themeColor, rgba } = useThemeColors();
  const navigate = useNavigate();
  const location = useLocation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("");

  const navItems = [
    {
      id: "home",
      icon: Homeicon,
      activeIcon: HomeiconActive,
      label: "Home",
      route: "/",
    },
    {
      id: "about",
      icon: Abouticon,
      activeIcon: AboutActive,
      label: "About",
      route: "/about",
    },
    {
      id: "service",
      icon: Serviceicon,
      activeIcon: ServiceActive,
      label: "Service",
      route: "/service",
    },
    {
      id: "projects",
      icon: Projecticon,
      activeIcon: ProjectActive,
      label: "Projects",
      route: "/projects",
    },
    {
      id: "contact",
      icon: Contacticon,
      activeIcon: ContactActive,
      label: "Contact",
      route: "/contact",
    },
  ];

  React.useEffect(() => {
    const path = location.pathname;
    if (path === "/") setActiveTab("home");
    else if (path.startsWith("/about")) setActiveTab("about");
    else if (path.startsWith("/service")) setActiveTab("service");
    else if (path.startsWith("/projects")) setActiveTab("projects");
    else if (path.startsWith("/contact")) setActiveTab("contact");
  }, [location.pathname]);

  const handleNavigation = (tab: string, route: string) => {
    setActiveTab(tab);
    navigate(route);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const floatingAnimation = {
    y: [0, -20, 0],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  };

  const getColorFilter = (hex: string): string => {
    const colorFilters: Record<string, string> = {
      "#ED2929":
        "invert(27%) sepia(91%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%)",
      "#22C55E":
        "invert(68%) sepia(95%) saturate(427%) hue-rotate(88deg) brightness(118%) contrast(85%)",
      "#3B82F6":
        "invert(48%) sepia(99%) saturate(2476%) hue-rotate(202deg) brightness(98%) contrast(96%)",
      "#F97316":
        "invert(60%) sepia(98%) saturate(2476%) hue-rotate(1deg) brightness(102%) contrast(96%)",
    };
    return colorFilters[hex] || "brightness(0) saturate(100%) invert(1)";
  };

  return (
    <div className="relative overflow-hidden">
      <DashMain>
        <MobileNav
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          navItems={navItems}
          activeTab={activeTab}
          onNavigate={handleNavigation}
          themeColor={themeColor}
          getColorFilter={getColorFilter}
        />

        <div className="flex flex-col gap-20 md:flex-row py-[8rem] px-10 items-center md:gap-32 relative z-10 h-[100vh]">
          <motion.div
            onClick={() => setIsMobileMenuOpen(true)}
            className="absolute top-9 left-10 cursor-pointer md:hidden z-20 flex flex-col items-center justify-center
                       bg-gradient-to-br from-[#171717] to-[#1a1a1a] border-[#2F2C2C] border-2 p-2 rounded-md"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <img
              src={menu}
              alt="menu"
              style={{ filter: getColorFilter(themeColor) }}
            />
          </motion.div>
          <ThemeControls />

          <motion.div
            className="flex flex-col gap-5 z-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="flex flex-col gap-3" variants={itemVariants}>
              <motion.p
                className="font-poppins text-white text-md md:text-lg"
                style={{ "--theme-color": themeColor } as React.CSSProperties}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                Hi, I am{" "}
                <motion.span
                  className="font-bold relative inline-block"
                  style={{ color: themeColor }}
                  whileHover={{ scale: 1.05 }}
                >
                  Beni Samuel
                  <motion.span
                    className="absolute -bottom-1 left-0 w-full h-0.5"
                    style={{ backgroundColor: themeColor }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  />
                </motion.span>
              </motion.p>
              <motion.p
                className="font-poppins text-white text-md md:text-lg flex flex-row gap-3"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                I&apos;m a{" "}
                <span className="font-bold" style={{ color: themeColor }}>
                  <DynamicText />
                </span>
              </motion.p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.p
                className="font-poppins text-white text-sm md:text-base leading-7 selection:bg-[#ED2929] max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                I am a passionate young software engineer driven by the mission
                to craft innovative solutions that address real-world
                challenges, simplifying lives and transforming everyday
                experiences.
              </motion.p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.button
                className="font-poppins text-white text-sm py-3 px-8 rounded-3xl relative overflow-hidden group"
                style={{ backgroundColor: themeColor }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: `0 10px 30px ${rgba(0.4)}`,
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <span className="relative z-10">Download CV</span>
                <motion.div
                  className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20"
                  initial={false}
                  whileHover={{ opacity: 0.2 }}
                />
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex flex-row items-center justify-center selection:bg-white z-10"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="relative" animate={floatingAnimation}>
              <motion.div
                className=" relative"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <motion.img
                  src={top}
                  className=" absolute top-[-3rem] left-[-2rem]"
                  style={{
                    filter: getColorFilter(themeColor),
                  }}
                  alt="Beni Samuel"
                />
                <motion.img
                  src={myMg}
                  className="h-[15rem] w-[15rem] md:h-[20rem] md:w-[20rem]"
                  alt="Beni Samuel"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.img
                  src={bottom}
                  className=" absolute bottom-[-3rem] right-[-2rem]"
                  style={{
                    filter: getColorFilter(themeColor),
                  }}
                  alt="Beni Samuel"
                />
              </motion.div>
              <motion.div
                className="absolute inset-0 border-2 rounded-full opacity-20"
                style={{ borderColor: themeColor }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.1, 0.2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </DashMain>
    </div>
  );
};

export default Home;
