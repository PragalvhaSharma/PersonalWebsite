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
    <div 
      className="min-h-screen flex flex-col items-center justify-center bg-black text-foreground p-4 relative overflow-hidden"
      style={{
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        willChange: 'transform',
        isolation: 'isolate',
        position: 'relative'
      }}
    >
      {/* Background elements with lower z-index to ensure proper layering */}
      <div className="z-0 absolute inset-0">
        <Background />
      </div>
      
      {/* Floating code symbols with a middle z-index */}
      <div className="z-10 absolute inset-0">
        <CodeParticles />
      </div>
      
      {/* Terminal component with highest z-index */}
      <div className="z-20 relative w-full">
        <Terminal onComplete={handleComplete} />
      </div>
    </div>
  );
}