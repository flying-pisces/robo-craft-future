import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ContactService } from "@/services/contactService";

import hexHSeries from "@/assets/hex-h-series.jpg";
import hexBSeries from "@/assets/hex-b-series.jpg";
import hexFSeries from "@/assets/hex-f-series.jpg";

const Services = () => {
  const { toast } = useToast();

  const handleProductInquiry = async (productType: 'h-series' | 'b-series' | 'f-series') => {
    try {
      const result = await ContactService.submitServiceInquiry({
        service_type: productType,
        email: '',
        name: 'Anonymous Interest',
        message: `Interested in ${productType} modules`
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

  const products = [
    {
      title: "H-Series",
      subtitle: "HAND MODULES",
      description: "Ultra-high resolution tactile sensing for dexterous manipulation. Feel textures, detect slip, and handle delicate objects.",
      image: hexHSeries,
      specs: ["361 sensels/cm²", "0.1g sensitivity", "500-1000Hz"],
      price: "~$800 per pair",
      productType: 'h-series' as const
    },
    {
      title: "B-Series",
      subtitle: "BODY MODULES",
      description: "Standard coverage tactile skin for torso and limbs. Enables safe human-robot interaction and environmental awareness.",
      image: hexBSeries,
      specs: ["4-50 sensels/cm²", "Matte silicone", "Full coverage"],
      price: "~$1,800 full body",
      productType: 'b-series' as const
    },
    {
      title: "F-Series",
      subtitle: "FOOT MODULES",
      description: "Heavy-duty tactile sensing for locomotion and balance. Built for bipedal and quadruped robots.",
      image: hexFSeries,
      specs: ["Reinforced TPU", "200K+ cycles", "Slip detection"],
      price: "~$400 per pair",
      productType: 'f-series' as const
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-tech-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Hex Module
            <span className="block bg-gradient-to-r from-tech-blue to-tech-cyan bg-clip-text text-transparent">
              Series
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
            One standard, three variants. All modules feature unified magnetic connectors
            and I2C interface for seamless integration.
          </p>
          <div className="inline-flex flex-wrap justify-center items-center gap-2 px-4 py-2 bg-tech-blue/10 rounded-full text-tech-blue text-sm font-medium">
            <span>5-Layer Architecture</span>
            <span className="text-muted-foreground">|</span>
            <span>Snap-on Hex Modules</span>
            <span className="text-muted-foreground">|</span>
            <span>5s Swap</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <Card key={index} className="group hover:shadow-card transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg overflow-hidden">
              {/* Hexagon Image */}
              <div className="relative flex justify-center py-8 bg-gradient-to-b from-tech-light to-background">
                <div className="relative w-40 h-40">
                  <div
                    className="absolute inset-0 overflow-hidden transition-transform duration-300 group-hover:scale-110"
                    style={{
                      clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div
                    className="absolute inset-0 border-4 border-tech-blue/30 group-hover:border-tech-cyan transition-colors duration-300"
                    style={{
                      clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
                    }}
                  />
                </div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-tech-cyan text-white text-xs font-bold rounded-full">
                  {product.price}
                </div>
              </div>

              <CardHeader className="text-center pb-2">
                <div className="text-xs font-bold text-tech-cyan tracking-widest mb-1">
                  {product.subtitle}
                </div>
                <CardTitle className="text-2xl font-bold text-foreground group-hover:text-tech-blue transition-colors">
                  {product.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {product.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Specs */}
                <div className="flex flex-wrap justify-center gap-2">
                  {product.specs.map((spec, idx) => (
                    <span key={idx} className="px-2 py-1 bg-tech-light text-xs text-muted-foreground rounded">
                      {spec}
                    </span>
                  ))}
                </div>

                <Button
                  variant="outline"
                  className="w-full group-hover:bg-tech-blue group-hover:text-white group-hover:border-tech-blue transition-all"
                  onClick={() => handleProductInquiry(product.productType)}
                >
                  Request Specs
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Products Link */}
        <div className="text-center mt-12">
          <Link to="/products">
            <Button variant="default" size="lg">
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* 5-Layer Architecture Section */}
        <div className="mt-16 p-8 bg-tech-dark rounded-2xl text-white">
          <h3 className="text-2xl font-bold mb-6 text-center">5-Layer Architecture</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div className="p-4 bg-white/10 rounded-lg">
              <div className="text-tech-cyan font-semibold mb-1">Layer 1</div>
              <div className="text-sm text-gray-300">Protective</div>
            </div>
            <div className="p-4 bg-white/10 rounded-lg">
              <div className="text-tech-cyan font-semibold mb-1">Layer 2</div>
              <div className="text-sm text-gray-300">Impact</div>
            </div>
            <div className="p-4 bg-white/10 rounded-lg">
              <div className="text-tech-cyan font-semibold mb-1">Layer 3</div>
              <div className="text-sm text-gray-300">Thermal</div>
            </div>
            <div className="p-4 bg-white/10 rounded-lg">
              <div className="text-tech-cyan font-semibold mb-1">Layer 4</div>
              <div className="text-sm text-gray-300">Tactile Array</div>
            </div>
            <div className="p-4 bg-white/10 rounded-lg col-span-2 md:col-span-1">
              <div className="text-tech-cyan font-semibold mb-1">Layer 5</div>
              <div className="text-sm text-gray-300">FPC</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
