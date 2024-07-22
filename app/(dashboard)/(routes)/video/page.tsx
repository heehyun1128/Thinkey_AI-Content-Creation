"use client";
import { Heading } from "@/components/heading";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoadingSpace } from "@/components/loadingSpace";
import { VideoIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader } from "@/components/loader";



const Videopage = () => {
  const [video, setVideo] = useState<string>();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { prompt: "" },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setVideo(undefined);
      //   Call the api and get a response
      const res = await axios.post("/api/video", values);
      console.log("res",res)
      console.log("res.data[0]",res.data[0])
      setVideo(res.data);
      form.reset();
    } catch (error: any) {
    } finally {
      router.refresh();
    }
  };

 

 
  return (
    // add header for chat page
    <div>
      <Heading
        title="AI VIDEO GENERATION"
        description="Start your first video"
        icon={VideoIcon}
        iconColor="text-purple-500"
        bgColor="bg-purple-500/10"
      />
      {/* form/input fields */}
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="border-slate-500 border rounded-lg w-full p-5 px-4 md:px-6 focus-within:shadow-sm grid grid-cols-10 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-8">
                    <FormControl className="m-0 p-0">
                      <Input
                        disabled={isLoading}
                        placeholder="Video Time...?"
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                disabled={isLoading}
                className="col-span-12 lg:col-span-2 bg-slate-500"
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
          {!video && !isLoading && (
            <LoadingSpace label="How can I help you?" />
          )}
          {
            video && (
              <video controls className="w-full mt-8 aspect-video">
                <source src={video}/>
              </video>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Videopage;
