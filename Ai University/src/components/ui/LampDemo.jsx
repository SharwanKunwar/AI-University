"use client";
import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import { LampContainer } from "../ui/Lamp";




export function LampDemo() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-linear-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
        Pioneering the Future of <br /> Intelligence
      </motion.h1>
      <motion.p
       initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.4,
          duration: 0.8,
          ease: "easeInOut",
        }}
       className="text-neutral-400 mt-3">
        Shaping the next generation of AI leaders through groundbreaking research and ethical innovation.
      </motion.p>
      <motion.div 
      initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.5,
          duration: 0.8,
          ease: "easeInOut",
        }}
      className="flex gap-5 mt-10 lg:flex-row flex-col w-full">
        <Link to="chat" className="w-full">
            <button className="py-2 lg:px-15 w-full rounded-md bg-indigo-400 text-white hover:bg-indigo-600 hover:scale-101 transition-all">Chat with Lucifer</button>
        </Link>
        <Link className="w-full">
            <button className="py-2 lg:px-15 w-full rounded-md bg-indigo-400 text-white hover:bg-indigo-600 hover:scale-101 transition-all">Explore Our Professor</button>
        </Link>
      </motion.div>

      <motion.div 
      initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.6,
          duration: 0.8,
          ease: "easeInOut",
        }}
      className="lg:mt-5 mt-10 w-[150px] py-2 flex justify-between items-center text-neutral-400">
        <FaFacebook size={25} className="hover:text-blue-500 cursor-pointer" />
        <FaGithub size={25} className="hover:text-gray-300 cursor-pointer" />
        <FaLinkedin size={25} className="hover:text-blue-400 cursor-pointer" />
      </motion.div>
    </LampContainer>
  );
}
