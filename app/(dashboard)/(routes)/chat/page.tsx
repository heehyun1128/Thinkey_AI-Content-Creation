"use client";
import { Heading } from "@/components/heading";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessagesSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ChatCompletionRequestMessage from "openai";

import { ChatCompletionMessageParam , ChatCompletionContentPart,ChatCompletionContentPartText} from "openai/resources/chat/completions";


const ChatPage = () => {
  const [msgs, setMsgs] = useState<ChatCompletionMessageParam[]>([]);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { prompt: "" },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMsg: ChatCompletionMessageParam = {
        role: "user",
        content: values.prompt,
      };
      const newMsgs = [...msgs, userMsg];

      //   Call the api and get a response
      const res = await axios.post("/api/chat", {
        messages: newMsgs,
      });
      setMsgs((curr) => [...curr, userMsg, res.data]);
      form.reset();
    } catch (error: any) {
    } finally {
      router.refresh();
    }
  };

  const renderPart=(part:ChatCompletionContentPart): React.ReactNode=>{
    if(part.type=="text"){
        return <span>{part.text}</span>
    }else{
        return null
    }
  }

  return (
    // add header for chat page
    <div>
      <Heading
        title="Chat"
        description="Start your first chat"
        icon={MessagesSquare}
        iconColor="text-orange-500"
        bgColor="bg-orange-500/10"
      />
      {/* form/input fields */}
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="border rounded-lg w-full p-5 px-4 md:px-6 focus-within:shadow-sm grid grid-cols-10 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-8">
                    <FormControl className="m-0 p-0">
                      <Input
                        disabled={isLoading}
                        placeholder="Ask me something..."
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                disabled={isLoading}
                className="col-span-12 lg:col-span-2"
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          <div className="flex flex-col-reverse gap-y-2">
            {msgs.map((msg, idx) => (
              <div key={idx}>
                {Array.isArray(msg.content)
                  ? msg.content.map((part, index) => (
                      <span key={index}>{renderPart(part)}</span>
                    ))
                  : msg.content}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
