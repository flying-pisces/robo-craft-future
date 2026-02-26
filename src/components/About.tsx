import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Database, Users, Bot, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const dataStory = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Human-Generated Data",
      description: "Humans wear the glove to perform real tasks, generating labeled tactile datasets for robot learning"
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "Touch Pixel Standard",
      description: "The atomic unit of tactile data enabling seamless cross-platform AI model training"
    },
    {
      icon: <Bot className="h-6 w-6" />,
      title: "Capability Leap",
      description: "Robots learn to handle eggs, thread needles, and detect textures - tasks video alone cannot teach"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Precision Beyond Vision",
      description: "Delicate enough to feel what cameras cannot see - the sense of touch, digitized"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Touch Data:
              <span className="block bg-gradient-to-r from-tech-blue to-tech-cyan bg-clip-text text-transparent">
                The Next Frontier
              </span>
            </h2>

            <blockquote className="text-xl text-tech-blue italic mb-6 pl-4 border-l-4 border-tech-cyan">
              "Video gave robots eyes. Touch will give robots judgment."
            </blockquote>

            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              No standardized touch data format exists today. Robots fall, drop fragile objects,
              and fail delicate tasks because they cannot feel. We're building the infrastructure
              to change that.
            </p>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              TactoSkin creates the missing link between robot learning and physical reality.
              Our modular tactile sensing system generates the training data that transforms
              clumsy machines into capable collaborators.
            </p>

            <Link to="/team">
              <Button variant="default" size="lg" className="mb-8">
                Meet the Team
              </Button>
            </Link>

            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-4 bg-tech-light rounded-lg">
                <div className="text-2xl font-bold text-tech-blue mb-1">$1.5M</div>
                <div className="text-sm text-muted-foreground">Seed Round</div>
              </div>
              <div className="text-center p-4 bg-tech-light rounded-lg">
                <div className="text-2xl font-bold text-tech-cyan mb-1">2025</div>
                <div className="text-sm text-muted-foreground">First OEM Pilot</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {dataStory.map((item, index) => (
              <Card key={index} className="border-0 shadow-card hover:shadow-tech transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-tech-blue to-tech-cyan rounded-lg text-white mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Milestones Timeline */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center text-foreground mb-10">Key Milestones</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 border border-tech-blue/20 rounded-xl hover:border-tech-blue/50 transition-colors">
              <div className="text-sm text-tech-cyan font-semibold mb-2">2025 Q3</div>
              <div className="text-xl font-bold text-foreground mb-2">Working Prototype</div>
              <div className="text-muted-foreground text-sm">Complete hardware MVP with full tactile array integration</div>
            </div>
            <div className="text-center p-6 border border-tech-blue/20 rounded-xl hover:border-tech-blue/50 transition-colors">
              <div className="text-sm text-tech-cyan font-semibold mb-2">2025 Q4</div>
              <div className="text-xl font-bold text-foreground mb-2">First OEM Pilot</div>
              <div className="text-muted-foreground text-sm">Deploy tactile skin system with robotics partner</div>
            </div>
            <div className="text-center p-6 border border-tech-blue/20 rounded-xl hover:border-tech-blue/50 transition-colors">
              <div className="text-sm text-tech-cyan font-semibold mb-2">2027 Q4</div>
              <div className="text-xl font-bold text-foreground mb-2">Break-even</div>
              <div className="text-muted-foreground text-sm">Reach profitability with production-scale manufacturing</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
