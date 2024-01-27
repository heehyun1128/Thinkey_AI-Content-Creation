"use client";

import { Card } from "@/components/ui/card";
import { MessagesSquare } from "lucide-react";

const tools = [
  {
    label: "Chat",
    icon: MessagesSquare,
    color: "text-gray-500",
    bgColor: "bg-sky-500/10",
    href: "/chat",
  },
];

export default function DashboardPage() {
  return (
    //   <Button variant="destructive" size='lg'>Button</Button>
    <div>
      <div>
        <div className="mb-8 space-y-4"></div>
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Start A Chat With AI
        </h2>
        <p className="font-light text-base text-center text-gray-500">
          How can I help you today?
        </p>
      </div>
      <div>
        {tools.map((tool) => (
          <Card 
          key={tool.href}
          className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
          ></Card>
        ))}
      </div>
    </div>
  );
}
