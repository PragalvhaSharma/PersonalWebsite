"use client";

import { useRouter } from "next/navigation";
import Background from "./components/Background";
import CodeParticles from "./components/CodeParticles";
import Terminal from "./components/Terminal";

export default function Home() {
  const router = useRouter();

  const handleComplete = () => {
    router.push('/profile');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-foreground p-4 relative overflow-hidden">
      {/* Background elements */}
      <Background />
      
      {/* Floating code symbols */}
      <CodeParticles />
      
      {/* Terminal component */}
      <Terminal onComplete={handleComplete} />
    </div>
  );
}