"use client"
import { Heading } from "@/components/heading"
import { MessagesSquare } from "lucide-react"
import {useForm} from 'react-hook-form'

import * as z from "zod"

const ChatPage=()=>{
    const form=useForm({defaultValues:{prompt:""}})
    return (
        <div>
            <Heading 
            title="Chat"
            description="Start your first chat"
            icon={MessagesSquare}
            iconColor="text-orange-500"
            bgColor="bg-orange-500/10"
            />
            <div className="px-4 lg:px-8">

            </div>
        </div>

    )
}

export default ChatPage