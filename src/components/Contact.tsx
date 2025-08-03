import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email",
      content: "admin@sshrobotics.com",
      description: "Send us your project details"
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Phone",
      content: "+1 925-366-0578",
      description: "Mon-Fri from 8am to 6pm"
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Location",
      content: "4462 Tosca Ct",
      description: "Pleasanton, CA 94588"
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Response Time",
      content: "< 24 Hours",
      description: "We'll get back to you quickly"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-tech-light to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Ready to Start Your
            <span className="block bg-gradient-to-r from-tech-blue to-tech-cyan bg-clip-text text-transparent">
              Next Project?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Let's discuss how our engineering expertise can help bring your vision to life. 
            Get in touch for a consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-card">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-foreground mb-4">
                  Get In Touch
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-tech-blue to-tech-cyan rounded-lg flex items-center justify-center text-white">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{info.title}</h3>
                      <p className="text-tech-blue font-medium">{info.content}</p>
                      <p className="text-sm text-muted-foreground">{info.description}</p>
                    </div>
                  </div>
                ))}
                
                <div className="pt-6 border-t border-border">
                  <h3 className="font-semibold text-foreground mb-2">Project Types</h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div>• Robotics Design & Integration</div>
                    <div>• Manufacturing Automation</div>
                    <div>• Consumer Electronics Development</div>
                    <div>• Custom Engineering Solutions</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-card">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-foreground">
                  Send Us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        First Name
                      </label>
                      <Input placeholder="John" className="transition-all duration-300 focus:border-tech-blue" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Last Name
                      </label>
                      <Input placeholder="Doe" className="transition-all duration-300 focus:border-tech-blue" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email
                      </label>
                      <Input type="email" placeholder="john@example.com" className="transition-all duration-300 focus:border-tech-blue" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Company
                      </label>
                      <Input placeholder="Your Company" className="transition-all duration-300 focus:border-tech-blue" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Project Type
                    </label>
                    <select className="w-full px-3 py-2 border border-input bg-background rounded-md text-foreground transition-all duration-300 focus:border-tech-blue focus:outline-none">
                      <option>Select a service</option>
                      <option>Robotics Engineering</option>
                      <option>Manufacturing Automation</option>
                      <option>Consumer Electronics</option>
                      <option>Custom Solution</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Project Description
                    </label>
                    <Textarea 
                      placeholder="Tell us about your project requirements..."
                      rows={5}
                      className="transition-all duration-300 focus:border-tech-blue"
                    />
                  </div>
                  
                  <Button variant="hero" size="lg" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;