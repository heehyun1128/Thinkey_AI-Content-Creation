
import { UserButton } from "@clerk/nextjs"
// import MobileSidebar from "./mobile-sidebar";
import { FC } from "react";

type SidebarProps = {
    showSidebar: boolean;
  };

const Navbar:FC<SidebarProps> = ({ showSidebar }) =>{
    return (
        <div className="flex items-center p-4">
            {/* <MobileSidebar showSidebar={showSidebar}/>  */}
            <div className="flex w-full justify-end">
                <UserButton afterSignOutUrl="/"/>
            </div>
        </div>
    )
}

export default Navbar;