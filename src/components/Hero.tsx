import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-robotics.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Tactile sensing technology for robots"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-tech-dark/95 via-tech-dark/80 to-tech-dark/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block px-4 py-2 mb-6 text-sm font-medium text-tech-cyan bg-tech-cyan/10 rounded-full border border-tech-cyan/20">
            The Missing Modality
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            TACTO
            <span className="bg-gradient-to-r from-tech-blue to-tech-cyan bg-clip-text text-transparent">
              SKIN
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed">
            Exploring the next frontier of robot-world interaction through touch.
          </p>

          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            80% of robot behavior can be learned from video. The remaining 20% requires physical interaction
            with the real world. Touch data is the missing dimension.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="hero" size="lg" className="text-lg px-8 py-4">
              Request a Demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-tech-dark">
              View Technology
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
            <div className="text-center">
              <div className="text-3xl font-bold text-tech-blue mb-2">72K+</div>
              <div className="text-gray-300">Sensels Full-Body</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-tech-cyan mb-2">&lt;$3K</div>
              <div className="text-gray-300">Full-Body Coverage</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-tech-blue mb-2">5s</div>
              <div className="text-gray-300">Module Swap Time</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 right-10 w-20 h-20 border border-tech-blue/30 rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/4 left-10 w-16 h-16 border border-tech-cyan/30 rounded-full animate-pulse delay-1000"></div>
    </section>
  );
};

export default Hero;
