import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, Lightbulb, Target } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const values = [
    {
      icon: <Award className="h-6 w-6" />,
      title: "Excellence",
      description: "Delivering superior engineering solutions that exceed expectations"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Collaboration",
      description: "Working closely with clients to understand and solve their unique challenges"
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "Innovation",
      description: "Pushing the boundaries of what's possible with cutting-edge technology"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Precision",
      description: "Meticulous attention to detail in every aspect of our engineering work"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Engineering Tomorrow's
              <span className="block bg-gradient-to-r from-tech-blue to-tech-cyan bg-clip-text text-transparent">
                Solutions Today
              </span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              With over 15 years of experience in advanced engineering, we've established ourselves 
              as leaders in robotics, automation, and electronics. Our team of expert engineers 
              combines deep technical knowledge with innovative thinking to solve complex challenges.
            </p>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              From initial concept to final deployment, we provide comprehensive engineering services 
              that help businesses transform their operations and achieve their technological goals.
            </p>
            
            <Link to="/team">
              <Button variant="default" size="lg" className="mb-8">
                Learn About Our Team
              </Button>
            </Link>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-4 bg-tech-light rounded-lg">
                <div className="text-2xl font-bold text-tech-blue mb-1">50+</div>
                <div className="text-sm text-muted-foreground">Expert Engineers</div>
              </div>
              <div className="text-center p-4 bg-tech-light rounded-lg">
                <div className="text-2xl font-bold text-tech-cyan mb-1">25+</div>
                <div className="text-sm text-muted-foreground">Industry Certifications</div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="border-0 shadow-card hover:shadow-tech transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-tech-blue to-tech-cyan rounded-lg text-white mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;