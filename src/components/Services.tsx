import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, Factory, Smartphone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ContactService } from "@/services/contactService";
import roboticsImage from "@/assets/robotics-service.jpg";
import automationImage from "@/assets/automation-service.jpg";
import electronicsImage from "@/assets/electronics-service.jpg";

const Services = () => {
  const { toast } = useToast();

  const handleServiceInquiry = async (serviceType: 'robotics' | 'automation' | 'electronics') => {
    try {
      const result = await ContactService.submitServiceInquiry({
        service_type: serviceType,
        email: '', // Will be collected in a future modal/form
        name: 'Anonymous Interest',
        message: `Interested in ${serviceType} services`
      });

      if (result.success) {
        toast({
          title: "Interest Recorded!",
          description: "Thank you for your interest. Please fill out our contact form for detailed inquiries.",
        });
      }
    } catch (error) {
      console.error('Service inquiry error:', error);
    }
  };

  const services = [
    {
      icon: <Bot className="h-8 w-8" />,
      title: "Robotics Engineering",
      description: "Advanced robotic systems design, development, and integration for industrial and commercial applications.",
      image: roboticsImage,
      features: ["Custom Robot Design", "Motion Control Systems", "Vision Systems", "Safety Integration"],
      serviceType: 'robotics' as const
    },
    {
      icon: <Factory className="h-8 w-8" />,
      title: "Manufacturing Automation",
      description: "End-to-end automation solutions that optimize production efficiency and reduce operational costs.",
      image: automationImage,
      features: ["Process Automation", "Quality Control", "Production Line Design", "SCADA Systems"],
      serviceType: 'automation' as const
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Consumer Electronics",
      description: "Innovative electronic product development from concept to market-ready solutions.",
      image: electronicsImage,
      features: ["Product Design", "PCB Development", "Firmware Programming", "Testing & Validation"],
      serviceType: 'electronics' as const
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-tech-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Our Engineering
            <span className="block bg-gradient-to-r from-tech-blue to-tech-cyan bg-clip-text text-transparent">
              Specializations
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We deliver cutting-edge engineering solutions across three core domains, 
            each backed by years of expertise and innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-card transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
              <div className="relative overflow-hidden rounded-t-lg">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-tech-dark/60 to-transparent"></div>
                <div className="absolute top-4 left-4 p-3 bg-white/90 rounded-lg text-tech-blue">
                  {service.icon}
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-foreground group-hover:text-tech-blue transition-colors">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground text-base">
                  {service.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-tech-blue rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant="outline" 
                  className="w-full group-hover:bg-tech-blue group-hover:text-white group-hover:border-tech-blue transition-all"
                  onClick={() => handleServiceInquiry(service.serviceType)}
                >
                  Get Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;