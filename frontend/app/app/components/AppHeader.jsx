import React from 'react';
import Image from 'next/image';
import { UserButton } from '@stackframe/stack';
import IndiaGradient from '@/components/ui/IndiaGradient';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Aurora from '@/components/ui/Aurora';

function AppHeader() {
  return (
    
    <header className="flex items-center justify-between px-4 py-3 shadow-sm bg-white">

      {/* Left Section: Logo and App Title */}
      <div className="flex items-center gap-3">
        <Image src="logoipsum-custom-logo.svg" alt="logo" width={40} height={35} />
        <IndiaGradient className="text-3xl font-semibold">ArogyaMitra</IndiaGradient>
      </div>

      {/* Right Section: Navigation and User */}
      <div className="flex items-center gap-4">
        <nav>
          <Button asChild variant="ghost" className="text-white p-2 bg-gradient-to-r from-[#2AC9AF] to-[#4B79D9] backdrop-blur-sm rounded-3xl">
            <Link href="/handler/signup">login</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;
