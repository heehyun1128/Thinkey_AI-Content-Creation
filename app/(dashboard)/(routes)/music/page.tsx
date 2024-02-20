"use client";
import { Heading } from "@/components/heading";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoadingSpace } from "@/components/loadingSpace";
import { Music } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ChatCompletionRequestMessage from "openai";
import { Loader } from "@/components/loader";

import {
  ChatCompletionMessageParam,
  ChatCompletionContentPart,
  ChatCompletionContentPartText,
} from "openai/resources/chat/completions";

const MusicPage = () => {
  const [music, setMusic] = useState<string>();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { prompt: "" },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setMusic(undefined);
      //   Call the api and get a response
      const res = await axios.post("/api/audio", values);
      setMusic(res.data.audio);
      form.reset();
    } catch (error: any) {
    } finally {
      router.refresh();
    }
  };

  const renderPart = (part: ChatCompletionContentPart): React.ReactNode => {
    if (part.type == "text") {
      return <span>{part.text}</span>;
    } else {
      return null;
    }
  };

  const renderContent = (
    content: string | ChatCompletionContentPart[] | null | undefined
  ): React.ReactNode => {
    if (typeof content === "string") {
      return <span>{content}</span>;
    } else if (Array.isArray(content)) {
      // Handle array content
      return content.map((part, partIndex) => (
        <span key={partIndex}>{renderPart(part)}</span>
      ));
    } else {
      return null; // Handle other types or null/undefined
    }
  };

  return (
    // add header for chat page
    <div>
      <Heading
        title="AI Music Generation"
        description="Start your first chat"
        icon={Music}
        iconColor="text-sky-500"
        bgColor="bg-sky-500/10"
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
                        placeholder="What do you want to listen to?"
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
          {isLoading && (
            <div className="p-8 flex items-center w-full justify-center bg-muted">
              <Loader />
            </div>
          )}
          {!music && !isLoading && (
            <LoadingSpace label="How can I help you?" />
          )}
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default MusicPage;
