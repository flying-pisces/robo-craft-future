import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-tech-blue/5">
      <div className="text-center px-6">
        <h1 className="text-8xl font-bold bg-gradient-to-r from-tech-blue to-tech-cyan bg-clip-text text-transparent mb-4">
          404
        </h1>
        <p className="text-2xl text-foreground font-semibold mb-2">Page Not Found</p>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a href="/">
          <Button variant="default" size="lg">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </a>
      </div>
    </div>
  );
};

export default NotFound;
