import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import Typography from "../Typography"; // Adjust imports based on your actual structure

function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-lg text-center">
        <CardContent>
          <Typography variant="h1" className="text-6xl font-bold">
            404
          </Typography>
          <Typography variant="h2" className="text-2xl font-semibold mt-4">
            Page Not Found
          </Typography>
          <Typography className="mt-2">
            Sorry, the page you are looking for does not exist.
          </Typography>
          <Button className="mt-6" href="/">
            Go Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default NotFound;
