import { LucideIcon} from "lucide-react";

// defining the expected structure of props for a Heading component
interface HeadingProps{
    title:string;
    description:string;
    icon:LucideIcon;
    iconColor?:string;
    bgColor?:string;
}

export const Heading = ({title,
    description,
    icon,
    iconColor,
    bgColor}:HeadingProps) => {
  return <div>Heading</div>;
};
