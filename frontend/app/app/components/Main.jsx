"use client"

import React from 'react';
import GradientText from '../src/components/GradientText';
import Hyperspeed from './Hyperspeed';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Features } from './Features';
import Contact from '../(main)/dashboard/_components/Contact';
import DeveloperInfo from '../(main)/dashboard/_components/DeveloperInfo';
import BlurText from "./Blur";
import { BlurFade } from "@/components/magicui/blur-fade"

const handleAnimationComplete = () => {
  console.log('Animation completed!');
};
export default function Main() {
  return (
    <div className='mt-15'>
        <BlurFade delay={0.70} inView>
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4 py-12 space-y-6">
  
        <h1 className="text-4xl  md:text-5xl lg:text-6xl  mb-4">
            Your Health,
            <GradientText>Our Priority</GradientText>
        </h1>
        <p className="text-gray-500 md:text-2xl font-medium">
            Call Us: +1(920)-375-7113
        </p>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            AI-powered healthcare assistant available 24/7 to address your medical concerns and provide guidance
        </p>
        <Button asChild variant="ghost" className="text-white p-6 pl-16 pr-16 bg-gradient-to-r from-[#2AC9AF] to-[#4B79D9] backdrop-blur-sm rounded-3xl">
            <Link href="/handler/signup">Get Started</Link>
        </Button>
    
        </div>
        </BlurFade>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg">
            <Contact />
          </div>
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg">
            <DeveloperInfo />
          </div>
        </div>

    </div>
  );
}