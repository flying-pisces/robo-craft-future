import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ContactService } from "@/services/contactService";

import hexHSeries from "@/assets/hex-h-series.jpg";
import hexBSeries from "@/assets/hex-b-series.jpg";
import hexFSeries from "@/assets/hex-f-series.jpg";
import tactoGlove from "@/assets/tactoglove-hand.jpg";
import humanoidFront from "@/assets/humanoid-front.jpg";

interface Product {
  id: string;
  name: string;
  series: string;
  tagline: string;
  description: string;
  image: string;
  specs: { label: string; value: string }[];
  price: string;
  features: string[];
}

const products: Product[] = [
  {
    id: "h-series",
    name: "H-Series",
    series: "HAND MODULES",
    tagline: "TactoGlove HEX",
    description: "Ultra-high resolution tactile sensing for dexterous manipulation. Feel textures, detect slip, and handle delicate objects with precision.",
    image: hexHSeries,
    specs: [
      { label: "Resolution", value: "361 sensels/cm²" },
      { label: "Sensitivity", value: "0.1g" },
      { label: "Sampling", value: "500-1000Hz" },
    ],
    price: "~$800",
    features: ["Force Detection", "Texture Sensing", "Slip Detection"]
  },
  {
    id: "b-series",
    name: "B-Series",
    series: "BODY MODULES",
    tagline: "Full Coverage Skin",
    description: "Standard coverage tactile skin for torso and limbs. Enables safe human-robot interaction and environmental awareness.",
    image: hexBSeries,
    specs: [
      { label: "Density", value: "4-50 sensels/cm²" },
      { label: "Finish", value: "Matte Silicone" },
      { label: "Coverage", value: "Full Body" },
    ],
    price: "~$1,800",
    features: ["Force Detection", "Safe HRI", "Environmental Sensing"]
  },
  {
    id: "f-series",
    name: "F-Series",
    series: "FOOT MODULES",
    tagline: "Heavy-Duty Tactile",
    description: "Heavy-duty tactile sensing for locomotion and balance. Built to withstand the demands of bipedal and quadruped robots.",
    image: hexFSeries,
    specs: [
      { label: "Material", value: "Reinforced TPU" },
      { label: "Durability", value: "200K+ cycles" },
      { label: "Build", value: "Heavy-duty" },
    ],
    price: "~$400",
    features: ["Force Detection", "Slip Detection", "Balance Feedback"]
  }
];

const Products = () => {
  const { toast } = useToast();

  const handleProductInquiry = async (productId: string) => {
    try {
      const result = await ContactService.submitServiceInquiry({
        service_type: productId,
        email: '',
        name: 'Anonymous Interest',
        message: `Interested in ${productId} modules`
      });

      if (result.success) {
        toast({
          title: "Interest Recorded!",
          description: "Thank you for your interest. Fill out our contact form for detailed inquiries.",
        });
      }
    } catch (error) {
      console.error('Product inquiry error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-tech-blue/5">
      {/* Header */}
      <div className="bg-tech-dark text-white py-16">
        <div className="container mx-auto px-6">
          <Link to="/">
            <Button variant="ghost" className="mb-6 text-gray-300 hover:text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Hex Module
            <span className="block bg-gradient-to-r from-tech-blue to-tech-cyan bg-clip-text text-transparent">
              Series
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            One standard, three variants. Snap-on hex modules with unified magnetic connectors and I2C interface.
          </p>
          <div className="flex flex-wrap gap-4 mt-6">
            <div className="px-4 py-2 bg-white/10 rounded-full text-sm">5-Layer Architecture</div>
            <div className="px-4 py-2 bg-white/10 rounded-full text-sm">5s Module Swap</div>
            <div className="px-4 py-2 bg-white/10 rounded-full text-sm">55-72K Sensels Full-Body</div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {products.map((product) => (
            <div key={product.id} className="group">
              {/* Hexagon Image Container */}
              <div className="relative flex justify-center mb-8">
                <div className="relative w-64 h-64">
                  {/* Hexagon Shape with Image */}
                  <div
                    className="absolute inset-0 overflow-hidden transition-transform duration-300 group-hover:scale-105"
                    style={{
                      clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Hexagon Border */}
                  <div
                    className="absolute inset-0 border-4 border-tech-blue/50 group-hover:border-tech-cyan transition-colors duration-300"
                    style={{
                      clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
                    }}
                  />
                </div>
                {/* Price Badge */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-2 bg-tech-cyan text-white font-bold rounded-full text-sm shadow-lg">
                  {product.price}
                </div>
              </div>

              {/* Product Info */}
              <div className="text-center">
                <div className="text-xs font-bold text-tech-cyan tracking-widest mb-2">
                  {product.series}
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-2 group-hover:text-tech-blue transition-colors">
                  {product.name}
                </h2>
                <div className="text-lg text-tech-blue font-medium mb-4">
                  {product.tagline}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {product.description}
                </p>

                {/* Specs */}
                <div className="grid grid-cols-3 gap-2 mb-6">
                  {product.specs.map((spec, idx) => (
                    <div key={idx} className="p-3 bg-tech-light rounded-lg">
                      <div className="text-xs text-muted-foreground">{spec.label}</div>
                      <div className="text-sm font-semibold text-foreground">{spec.value}</div>
                    </div>
                  ))}
                </div>

                {/* Features */}
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {product.features.map((feature, idx) => (
                    <span key={idx} className="px-3 py-1 bg-tech-blue/10 text-tech-blue rounded-full text-xs font-medium">
                      {feature}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <Button
                  variant="outline"
                  className="w-full group-hover:bg-tech-blue group-hover:text-white group-hover:border-tech-blue transition-all"
                  onClick={() => handleProductInquiry(product.id)}
                >
                  Request Specs
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Application Showcase */}
      <div className="bg-tech-dark py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            See TactoSkin in Action
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden group">
              <img
                src={tactoGlove}
                alt="TactoGlove HEX - Robot hand with tactile sensing"
                className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-tech-dark/80 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <div className="text-sm text-tech-cyan font-semibold">TactoGlove HEX</div>
                <div className="text-xl font-bold">Dexterous Manipulation</div>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden group">
              <img
                src={humanoidFront}
                alt="Full body TactoSkin coverage on humanoid robot"
                className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-tech-dark/80 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <div className="text-sm text-tech-cyan font-semibold">Full-Body Coverage</div>
                <div className="text-xl font-bold">Complete Tactile Intelligence</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5-Layer Architecture */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-foreground mb-4">5-Layer Architecture</h2>
        <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
          Every hex module features our proprietary 5-layer stack for comprehensive tactile sensing
        </p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
          {[
            { layer: "1", name: "Protective", desc: "Wear-resistant outer layer" },
            { layer: "2", name: "Impact", desc: "Shock absorption" },
            { layer: "3", name: "Thermal", desc: "Temperature sensing" },
            { layer: "4", name: "Tactile Array", desc: "High-density sensels" },
            { layer: "5", name: "FPC", desc: "Flexible circuit interface" },
          ].map((item, idx) => (
            <div key={idx} className="p-6 bg-gradient-to-br from-tech-dark to-tech-dark/80 rounded-xl text-center text-white">
              <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-tech-cyan/20 flex items-center justify-center text-tech-cyan font-bold">
                {item.layer}
              </div>
              <div className="font-semibold mb-1">{item.name}</div>
              <div className="text-xs text-gray-400">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-tech-blue to-tech-cyan py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Give Your Robots the Sense of Touch?
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Full-body coverage for under $3,000. Contact us for OEM pricing and pilot programs.
          </p>
          <Link to="/#contact">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-tech-blue">
              Contact Us
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Products;
