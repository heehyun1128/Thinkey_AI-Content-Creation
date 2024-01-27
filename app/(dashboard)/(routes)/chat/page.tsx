import { Heading } from "@/components/heading"
import { MessagesSquare } from "lucide-react"

const ChatPage=()=>{
    return (
        <div>
            <Heading 
            title="Chat"
            description="Start your first chat"
            icon={MessagesSquare}
            iconColor="text-orange-500"
            bgColor="bg-orange-500/10"
            />
        </div>
    )
}

export default ChatPage