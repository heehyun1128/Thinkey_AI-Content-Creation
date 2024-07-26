"use client";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";

import Sidebar from "@/components/sidebar";
import { useState, useEffect, FC } from "react";

type SidebarProps = {
    showSidebar: boolean;
    apiLimit:number | null
  };
const MobileSidebar:FC<SidebarProps> = ({ apiLimit,showSidebar }) => {
  // remove hydrating error
    const [isMounted,setIsMounted] = useState(false)

    useEffect(()=>{
        setIsMounted(true)
    },[])

    if(!isMounted){
        return null
    }
    
    return (
        <Sheet>
        <SheetTrigger>
            {/* click button to trigger sheet open or close */}
            <Button size="icon" className="md:hidden">
            <Menu />
            </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
            <Sidebar apiLimit={apiLimit} showSidebar={showSidebar}/>
        </SheetContent>
        </Sheet>
    );
};

export default MobileSidebar;
