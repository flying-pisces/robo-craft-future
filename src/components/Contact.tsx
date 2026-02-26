import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Globe, MapPin, Clock } from "lucide-react";
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
          description: "Thank you for your interest. We'll be in touch soon.",
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
      content: "info@tactoskin.com",
      description: "For partnerships and inquiries"
    },
    {
      icon: <Globe className="h-5 w-5" />,
      title: "Website",
      content: "tactoskin.com",
      description: "Product specs and updates"
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Location",
      content: "San Francisco Bay Area",
      description: "California, USA"
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Response Time",
      content: "< 48 Hours",
      description: "For qualified inquiries"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-tech-light to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Let's Build the Sense of
            <span className="block bg-gradient-to-r from-tech-blue to-tech-cyan bg-clip-text text-transparent">
              Touch, Together
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Interested in integrating TactoSkin with your robotics platform?
            We're looking for OEM partners and pilot collaborators.
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
                  <h3 className="font-semibold text-foreground mb-2">We're Looking For</h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div>OEM Integration Partners</div>
                    <div>Pilot Program Participants</div>
                    <div>Research Collaborators</div>
                    <div>Strategic Investors</div>
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
                  Request Information
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
                        placeholder="john@company.com"
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
                      Interest Type *
                    </label>
                    <select
                      {...register("project_type", { required: "Please select an interest type" })}
                      className="w-full px-3 py-2 border border-input bg-background rounded-md text-foreground transition-all duration-300 focus:border-tech-blue focus:outline-none"
                    >
                      <option value="">Select your interest</option>
                      <option value="OEM Integration">OEM Integration</option>
                      <option value="Pilot Program">Pilot Program</option>
                      <option value="Research Collaboration">Research Collaboration</option>
                      <option value="Investment">Investment Inquiry</option>
                      <option value="General">General Information</option>
                    </select>
                    {errors.project_type && (
                      <p className="text-red-500 text-sm mt-1">{errors.project_type.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Message *
                    </label>
                    <Textarea
                      {...register("project_description", { required: "Message is required" })}
                      placeholder="Tell us about your robotics platform and how you'd like to work together..."
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
