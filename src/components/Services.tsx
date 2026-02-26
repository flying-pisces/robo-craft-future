import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Hand, CircleDot, Footprints } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ContactService } from "@/services/contactService";
import roboticsImage from "@/assets/robotics-service.jpg";
import automationImage from "@/assets/automation-service.jpg";
import electronicsImage from "@/assets/electronics-service.jpg";

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
      icon: <Hand className="h-8 w-8" />,
      title: "H-Series",
      subtitle: "HAND MODULES",
      description: "Ultra-high resolution tactile sensing for dexterous manipulation. Feel textures, detect slip, and handle delicate objects with precision.",
      image: roboticsImage,
      features: [
        "361 sensels/cm² resolution",
        "0.1g force sensitivity",
        "500-1000Hz sampling rate",
        "Force, Texture & Slip Detection"
      ],
      price: "~$800 per pair",
      productType: 'h-series' as const
    },
    {
      icon: <CircleDot className="h-8 w-8" />,
      title: "B-Series",
      subtitle: "BODY MODULES",
      description: "Standard coverage tactile skin for torso and limbs. Enables safe human-robot interaction and environmental awareness.",
      image: automationImage,
      features: [
        "4-50 sensels/cm² density",
        "Matte silicone finish",
        "Standard body coverage",
        "Force Detection"
      ],
      price: "~$1,800 full coverage",
      productType: 'b-series' as const
    },
    {
      icon: <Footprints className="h-8 w-8" />,
      title: "F-Series",
      subtitle: "FOOT MODULES",
      description: "Heavy-duty tactile sensing for locomotion and balance. Built to withstand the demands of bipedal and quadruped robots.",
      image: electronicsImage,
      features: [
        "Reinforced TPU construction",
        "200K+ cycles durability",
        "Heavy-duty build",
        "Force & Slip Detection"
      ],
      price: "~$400 per pair",
      productType: 'f-series' as const
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-tech-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Hex Module
            <span className="block bg-gradient-to-r from-tech-blue to-tech-cyan bg-clip-text text-transparent">
              Series
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
            One standard, three variants. All modules feature unified magnetic connectors
            and I2C interface for seamless integration.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-tech-blue/10 rounded-full text-tech-blue text-sm font-medium">
            <span>5-Layer Architecture</span>
            <span className="text-muted-foreground">|</span>
            <span>Snap-on Hex Modules</span>
            <span className="text-muted-foreground">|</span>
            <span>5s Swap</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <Card key={index} className="group hover:shadow-card transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-tech-dark/60 to-transparent"></div>
                <div className="absolute top-4 left-4 p-3 bg-white/90 rounded-lg text-tech-blue">
                  {product.icon}
                </div>
                <div className="absolute bottom-4 right-4 px-3 py-1 bg-tech-cyan/90 rounded-full text-white text-sm font-medium">
                  {product.price}
                </div>
              </div>

              <CardHeader>
                <div className="flex items-center gap-2 mb-1">
                  <CardTitle className="text-2xl font-bold text-foreground group-hover:text-tech-blue transition-colors">
                    {product.title}
                  </CardTitle>
                </div>
                <div className="text-xs font-semibold text-tech-cyan tracking-wider mb-2">
                  {product.subtitle}
                </div>
                <CardDescription className="text-muted-foreground text-base">
                  {product.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {product.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-tech-blue rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

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
