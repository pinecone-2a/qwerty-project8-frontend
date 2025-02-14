// components/LottieComponent.tsx

import { useState } from "react";
import dynamic from "next/dynamic";

// Lottie-г SSR (Server-Side Rendering)-гүйгээр динамик ачаалах
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const LottieComponent = ({ animationData }: { animationData: any }) => {
  const [loading, setLoading] = useState(true); // Ачааллын төлөв

  const handleComplete = () => {
    setLoading(false); // Анимаци ачаалагдаж дуусахад ачааллын индикаторыг нуух
  };

  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center">
          <p>Ачааллаж байна...</p> {/* Ачааллын индикатор */}
        </div>
      )}
      <Lottie
        animationData={animationData}
        loop={true}
        // autoplay={true}
        onComplete={handleComplete} // Анимаци дуусах үед ачааллыг хийнэ
      />
    </div>
  );
};

export default LottieComponent;
