'use client'
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import "./landing.css"
import React from 'react';
import Typed from 'typed.js';
import { useAuth, SignedIn, SignedOut } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";

const LandingPage = () => {
  const el = React.useRef(null);
  const { isSignedIn, signOut } = useAuth();
  const router=useRouter()
  
  React.useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ['<i>Smart Chat. Smarter Search.</i>.', 'Redefining Chat and Search with AI.'],
      typeSpeed: 50,
      loop: true
    });
  
    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div style={{width: "100vw", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
      <Image width={220} height={20} src="/logo.jpg" alt="logo" />
      <div id="slogan" >
        <h2 ref={el}> </h2>
      </div>
      <div style={{ display: "flex", gap: "1rem", marginTop: "8rem" }}>
        <SignedOut>
        <Link href="/sign-in">
          <Button>Login</Button>
        </Link>
        <Link href="/sign-up">
          <Button>Register</Button>
        </Link>
        </SignedOut>
        <SignedIn>
          <Button onClick={()=>router.push("/dashboard")}>START A CONVERSATION</Button>
        </SignedIn>
      </div>
    </div>
  );
};

export default LandingPage;
