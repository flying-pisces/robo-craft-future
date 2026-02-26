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
    title: "Founder & CEO",
    description: "Full-stack hardware and software engineer with 20+ years of experience in robotics, sensors, and consumer electronics. Leading TactoSkin's vision to give robots the sense of touch.",
    image: "/team/chuck-yin.jpg",
    initials: "CY"
  },
  {
    name: "Dr. Maya Patel",
    title: "Chief Technology Officer",
    description: "PhD in Haptics and Tactile Sensing from MIT. 10+ years developing next-generation sensor arrays and touch-based machine learning systems.",
    image: "/team/maya-patel.jpg",
    initials: "MP"
  },
  {
    name: "James Chen",
    title: "VP of Hardware Engineering",
    description: "Former lead engineer at Boston Dynamics. Expert in flexible electronics, sensor integration, and scalable manufacturing for robotic systems.",
    image: "/team/james-chen.jpg",
    initials: "JC"
  },
  {
    name: "Dr. Sarah Kim",
    title: "Head of AI & Data",
    description: "Machine learning researcher specializing in tactile perception and robot learning. Previously developed touch-based manipulation models at Google DeepMind.",
    image: "/team/sarah-kim.jpg",
    initials: "SK"
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
            Meet the Team
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Building the future of robot-world interaction through tactile intelligence.
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

        {/* Join Us Section */}
        <div className="mt-16 text-center p-8 bg-tech-dark rounded-2xl max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4">Join Our Team</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            We're looking for passionate engineers and researchers who want to revolutionize
            how robots interact with the physical world. If you're excited about tactile sensing,
            robotics, or machine learning, we want to hear from you.
          </p>
          <Link to="/#contact">
            <Button variant="outline" className="border-tech-cyan text-tech-cyan hover:bg-tech-cyan hover:text-white">
              Get in Touch
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Team;
