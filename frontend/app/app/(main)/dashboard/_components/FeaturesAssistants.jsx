"use client"

import { Button } from "@/components/ui/button"
import { ExpertsList } from "@/services/Options"
import { useUser } from "@stackframe/stack"
import Image from "next/image"
import { BlurFade } from "@/components/magicui/blur-fade"
import UserInputDialog from "./UserInputDialog"
import GradientText from "@/components/ui/GradientText"
import ProfileDialog from "./Profile"
import Link from "next/link"
import { User, Bell } from "lucide-react"

export function FeaturesAssistants() {
  const user = useUser()

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="font-medium text-gray-500">My Healthcare</h2>
          <h2 className="text-gray-600 text-3xl">
            Hello,{" "}
            <GradientText as="span" className="inline">
              {user?.displayName || "User"}
            </GradientText>
          </h2>
        </div>

        {/* Enhanced Profile Button */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-10 w-10 border-2 border-blue-200 hover:border-blue-400 transition-all shadow-sm"
          >
            <Bell className="h-5 w-5 text-blue-500" />
          </Button>

          <ProfileDialog>
            <Button className="bg-gradient-to-r from-[#2AC9AF] to-[#4B79D9] hover:opacity-90 transition-all rounded-full pl-3 pr-4 py-6 flex items-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-1 font-medium text-base">
              <div className="bg-white/30 rounded-full p-1">
                <User className="h-5 w-5" />
              </div>
              Profile
            </Button>
          </ProfileDialog>
        </div>
      </div>

      {/* Grid container with expert options and ArogyaBot included */}
      <div className="w-full flex justify-center mt-10">
        <div className="grid grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-6 md:gap-10 place-items-center">
          {ExpertsList.map((option, index) => (
            <BlurFade key={index} delay={0.25 + index * 0.05} inView>
              <div className="p-4 bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col justify-center items-center w-full max-w-[150px] bg-gradient-to-r from-blue-50 to-green-50">
                <UserInputDialog CoachingOption={option}>
                  <div className="flex flex-col justify-center items-center">
                    <Image
                      src={option.icon || "/placeholder.svg"}
                      alt={option.name}
                      width={80}
                      height={80}
                      className="h-22 w-22 hover:rotate-12 cursor-pointer transition-all"
                    />
                    <p className="text-black text-center mt-2">{option.name}</p>
                  </div>
                </UserInputDialog>
              </div>
            </BlurFade>
          ))}

          {/* ArogyaBot card */}
          <div className="p-4 bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col justify-center items-center w-full max-w-[150px] bg-gradient-to-r from-blue-50 to-green-50">
            <div className="flex flex-col justify-center items-center">
              <Image
                src="/nurse.png"
                alt="ArogyaBot"
                width={70}
                height={70}
                className="h-22 w-22 hover:rotate-12 cursor-pointer transition-all"
              />
              <Button
                className="bg-gradient-to-r from-[#2AC9AF] to-[#4B79D9] p-4 pt-3 hover:opacity-90 transition-opacity rounded-md mt-3 w-full text-white text-sm shadow-md"
                asChild
              >
                <Link href="/chatbot" className="w-full text-center">
                  ArogyaBot
                </Link>
              </Button>
            </div>
          </div>

          <div className="p-4 bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col justify-center items-center w-full max-w-[150px] bg-gradient-to-r from-blue-50 to-green-50">
            <div className="flex flex-col justify-center items-center text-gray-500">
              <Image
                src="/call.png"
                alt="VideoCall"
                width={70}
                height={70}
                className="h-22 w-22 hover:rotate-12 cursor-pointer transition-all"
              />
              <h2 className="mt-3 font-medium text-center">Coming Soon!</h2>
            </div>
          </div>

          <div className="p-4 bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col justify-center items-center w-full max-w-[150px] bg-gradient-to-r from-blue-50 to-green-50">
            <div className="flex flex-col justify-center items-center text-gray-500">
              <Image
                src="/haa.png"
                alt="Vitals"
                width={70}
                height={70}
                className="h-18 w-18 hover:rotate-12 cursor-pointer transition-all"
              />
              <h2 className="mt-3 font-medium text-center">Coming Soon!</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturesAssistants
