import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <section
      className="relative flex items-center justify-center overflow-hidden h-screen w-full"
    >
      {/* Animated gradient background — green theme */}
      <div
        className="absolute inset-0 animate-gradient-shift"
        style={{
          background: "linear-gradient(135deg, #022c22, #064e3b, #065f46, #22C55E, #86EFAC, #22C55E, #065f46, #022c22)",
          backgroundSize: "400% 400%",
        }}
      />

      {/* Floating particles / orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-15"
            style={{
              width: `${60 + i * 40}px`,
              height: `${60 + i * 40}px`,
              background: `radial-gradient(circle, ${
                ["#86EFAC", "#BBF7D0", "#22C55E", "#DCFCE7", "#16A34A", "#4ADE80"][i]
              }, transparent)`,
              top: `${10 + i * 14}%`,
              left: `${5 + i * 15}%`,
              animation: `float-orb ${6 + i * 2}s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.7}s`,
            }}
          />
        ))}
      </div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* Tagline */}
        <p
          className="text-green-200 text-sm md:text-base tracking-[0.3em] uppercase mb-4 font-medium"
          style={{ animation: "fade-slide-up 0.8s ease-out both" }}
        >
          Discover · Shop · Enjoy
        </p>

        {/* Main CTA button */}
        <button
          onClick={() => navigate("/home")}
          className="group relative px-10 py-5 md:px-14 md:py-6 rounded-2xl text-white font-bold text-xl md:text-3xl tracking-wide cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none"
          style={{
            background: "linear-gradient(135deg, #22C55E, #4ADE80, #16A34A)",
            boxShadow: "0 0 40px rgba(34, 197, 94, 0.4), 0 0 80px rgba(22, 163, 74, 0.2)",
            animation: "fade-slide-up 1s ease-out 0.3s both",
          }}
        >
          {/* Glow pulse ring */}
          <span
            className="absolute inset-0 rounded-2xl animate-pulse-glow pointer-events-none"
            style={{
              border: "2px solid rgba(134, 239, 172, 0.4)",
            }}
          />
          Welcome to ECOMZY
        </button>

        {/* Click hint */}
        <div
          className="mt-12 flex flex-col items-center gap-2 text-green-200/60"
          style={{ animation: "fade-slide-up 1s ease-out 0.6s both" }}
        >
          <span className="text-xs tracking-widest uppercase">Click to enter store</span>
        </div>
      </div>
    </section>
  );
};

export default Landing;
