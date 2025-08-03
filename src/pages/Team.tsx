import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface TeamMember {
  name: string;
  title: string;
  description: string;
  image: string;
  initials: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Chuck Yin",
    title: "CEO & President",
    description: "Full-stack software and hardware engineer with 20+ years of experience in robotics, automation, and consumer electronics innovation.",
    image: "/team/chuck-yin.jpg",
    initials: "CY"
  },
  {
    name: "Sarah Mitchell",
    title: "Chief Financial Officer",
    description: "Strategic financial leader with 15+ years in tech scaling, M&A, and operational excellence in engineering services and manufacturing.",
    image: "/team/sarah-mitchell.jpg",
    initials: "SM"
  },
  {
    name: "David Rodriguez",
    title: "Chief Operating Officer",
    description: "Operations expert specializing in manufacturing automation and supply chain optimization with proven track record in robotics deployment.",
    image: "/team/david-rodriguez.jpg",
    initials: "DR"
  },
  {
    name: "Dr. Emily Chen",
    title: "Chief Technology Officer",
    description: "PhD in Robotics Engineering, leading R&D in AI-driven automation systems and next-generation consumer electronics platforms.",
    image: "/team/emily-chen.jpg",
    initials: "EC"
  }
];

const Team = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-tech-blue/5">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <Link to="/">
            <Button variant="ghost" className="mb-6 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-tech-blue to-tech-cyan bg-clip-text text-transparent mb-4">
            Learn About Our Team
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Meet the experienced leaders driving innovation in robotics, automation, and electronics engineering.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex flex-col items-center text-center space-y-6">
                  {/* Avatar */}
                  <Avatar className="h-32 w-32 ring-4 ring-tech-blue/20 group-hover:ring-tech-cyan/30 transition-all duration-300">
                    <AvatarImage 
                      src={member.image} 
                      alt={member.name}
                      className="object-cover"
                    />
                    <AvatarFallback className="text-2xl font-semibold bg-gradient-to-br from-tech-blue to-tech-cyan text-white">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-foreground">
                      {member.name}
                    </h3>
                    <p className="text-lg font-medium text-tech-blue">
                      {member.title}
                    </p>
                    <p className="text-muted-foreground leading-relaxed max-w-sm">
                      {member.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;