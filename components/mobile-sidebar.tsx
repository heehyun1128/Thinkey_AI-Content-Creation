"use client";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetTrigger,SheetContent } from "@/components/ui/sheet";

import Sidebar from '@/components/sidebar'


const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger>
        {/* click button to trigger sheet open or close */}
        <Button size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
