import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useForm } from "react-hook-form";
import { ContactService } from "@/services/contactService";
import { useState } from "react";

interface ContactFormData {
  first_name: string;
  last_name: string;
  email: string;
  company: string;
  project_type: string;
  project_description: string;
}

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>();


  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const result = await ContactService.submitContactForm({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        company: data.company || undefined,
        project_type: data.project_type,
        project_description: data.project_description,
      });

      if (result.success) {
        toast({
          title: "Message Sent!",
          description: "Thank you for your inquiry. We'll get back to you within 24 hours.",
        });
        reset();
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        First Name *
                      </label>
                      <Input 
                        {...register("first_name", { required: "First name is required" })}
                        placeholder="John" 
                        className="transition-all duration-300 focus:border-tech-blue"
                      />
                      {errors.first_name && (
                        <p className="text-red-500 text-sm mt-1">{errors.first_name.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Last Name *
                      </label>
                      <Input 
                        {...register("last_name", { required: "Last name is required" })}
                        placeholder="Doe" 
                        className="transition-all duration-300 focus:border-tech-blue"
                      />
                      {errors.last_name && (
                        <p className="text-red-500 text-sm mt-1">{errors.last_name.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email *
                      </label>
                      <Input 
                        {...register("email", { 
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address"
                          }
                        })}
                        type="email" 
                        placeholder="john@example.com" 
                        className="transition-all duration-300 focus:border-tech-blue"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Company
                      </label>
                      <Input 
                        {...register("company")}
                        placeholder="Your Company" 
                        className="transition-all duration-300 focus:border-tech-blue"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Project Type *
                    </label>
                    <select 
                      {...register("project_type", { required: "Please select a project type" })}
                      className="w-full px-3 py-2 border border-input bg-background rounded-md text-foreground transition-all duration-300 focus:border-tech-blue focus:outline-none"
                    >
                      <option value="">Select a service</option>
                      <option value="Robotics Engineering">Robotics Engineering</option>
                      <option value="Manufacturing Automation">Manufacturing Automation</option>
                      <option value="Consumer Electronics">Consumer Electronics</option>
                      <option value="Custom Solution">Custom Solution</option>
                    </select>
                    {errors.project_type && (
                      <p className="text-red-500 text-sm mt-1">{errors.project_type.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Project Description *
                    </label>
                    <Textarea 
                      {...register("project_description", { required: "Project description is required" })}
                      placeholder="Tell us about your project requirements..."
                      rows={5}
                      className="transition-all duration-300 focus:border-tech-blue"
                    />
                    {errors.project_description && (
                      <p className="text-red-500 text-sm mt-1">{errors.project_description.message}</p>
                    )}
                  </div>
                  
                  <Button 
                    variant="hero" 
                    size="lg" 
                    className="w-full"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
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