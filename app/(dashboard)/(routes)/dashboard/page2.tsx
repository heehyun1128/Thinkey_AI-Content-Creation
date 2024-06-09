"use client";

import { Card } from "@/components/ui/card";
import { Palette,AudioWaveform,PlaySquare, MessagesSquare, PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import Typed from 'typed.js';
const tools = [
  {
    label: "Chat",
    icon: MessagesSquare,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    href: "/chat",
  },
  {
    label: "AI Image",
    icon: Palette,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    href: "/image",
  },
  {
    label: "AI Audio",
    icon: AudioWaveform,
    color: "text-sky-500",
    bgColor: "bg-sky-500/10",
    href: "/audio",
  },
  {
    label: "AI Video",
    icon: PlaySquare,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    href: "/video",
  },
];

export default function DashboardPage() {
  const el = useRef(null);
  
  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ['<i> How can I help you today?</i>'],
      typeSpeed: 50,
      // loop: true
      showCursor:false
    });
  
    return () => {
      typed.destroy();
    };
  }, []);

  const router = useRouter()
  return (
    //   <Button variant="destructive" size='lg'>Button</Button>
    <div>
      <div>
        <div className="mb-8 space-y-4"></div>
        <h4 className="text-2xl md:text-4xl font-bold text-center mb-10">
          Start A Chat With THINKEY
        </h4>
        <p ref={el} className="mb-20 font-light text-base text-center text-gray-500">
      
        </p>
      </div>
      <div className="flex flex-row items-center w-full">
        {tools.map((tool) => (
          <Card 
          key={tool.href}
          onClick={()=>router.push(tool.href)}
          className="p-4 flex-1 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
          >

            <div className="items-center flex gap-x-3">
              <div className={cn("p-2 w-fit rounded-md",tool.bgColor)}>
                <tool.icon className={cn("w-10 h-10",tool.color)}/>
              </div>
              <div>
                {tool.label}
              </div>
            </div>
            <PlusIcon className="w-6 h-6 text-gray-400"/>
          </Card>
        ))}
      </div>
    </div>
  );
}
