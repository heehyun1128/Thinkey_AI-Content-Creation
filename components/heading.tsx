import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

// defining the expected structure of props for a Heading component
interface HeadingProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
  bgColor?: string;
}

export const Heading = ({
  title,
  description,
  icon: Icon,
  iconColor,
  bgColor,
}: HeadingProps) => {
  return (
    <div className="py-10 px-6 lg:px-10 flex items-center gap-x-2 mb-10">
      <div className={cn("p-2 w-fit rounded-sm", bgColor)}>
        <Icon className={cn("w-10 h-10", iconColor)} />
      </div>
      <div>
        <p className="text-2xl title-txt">{title}</p>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </div>
  );
};
