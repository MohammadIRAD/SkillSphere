import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Users, BookOpen, Trophy, Folder, Clock, ArrowRight, CheckCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: Briefcase,
      title: "Freelancing Hub",
      description: "Find and post freelance projects. Connect with clients and grow your business.",
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: Users,
      title: "Professional Network",
      description: "Build meaningful connections, share insights, and grow your professional circle.",
      color: "text-purple-600 dark:text-purple-400",
    },
    {
      icon: BookOpen,
      title: "Online Learning",
      description: "Access courses from industry experts. Learn new skills and earn certificates.",
      color: "text-green-600 dark:text-green-400",
    },
    {
      icon: Trophy,
      title: "Competitions",
      description: "Join coding challenges, showcase your skills, and climb the leaderboard.",
      color: "text-orange-600 dark:text-orange-400",
    },
    {
      icon: Folder,
      title: "Portfolio Builder",
      description: "Create stunning portfolios to showcase your work and attract opportunities.",
      color: "text-pink-600 dark:text-pink-400",
    },
    {
      icon: Clock,
      title: "Part-Time Jobs",
      description: "Discover local part-time opportunities that fit your schedule.",
      color: "text-teal-600 dark:text-teal-400",
    },
  ];

  const benefits = [
    "All-in-one platform for professional growth",
    "Connect with industry professionals",
    "Learn from expert instructors",
    "Showcase your skills and projects",
    "Find opportunities that match your goals",
    "Grow your career at your own pace",
  ];

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Your Complete Platform for
              <span className="text-primary"> Professional Growth</span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground sm:text-xl">
              SkillSphere combines freelancing, networking, learning, competitions, and portfolio building into one powerful platform. Everything you need to succeed in one place.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {isAuthenticated ? (
                <Link href="/dashboard">
                  <a data-testid="link-dashboard">
                    <Button size="lg" className="gap-2">
                      Go to Dashboard
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </a>
                </Link>
              ) : (
                <>
                  <Link href="/register">
                    <a data-testid="button-get-started">
                      <Button size="lg" className="gap-2">
                        Get Started Free
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </a>
                  </Link>
                  <Link href="/login">
                    <a data-testid="button-login">
                      <Button size="lg" variant="outline">
                        Sign In
                      </Button>
                    </a>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Everything You Need in One Place</h2>
            <p className="text-lg text-muted-foreground">
              Explore our comprehensive suite of tools designed for your success
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="hover-elevate transition-all">
                  <CardHeader>
                    <div className={`mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 ${feature.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold">Why Choose SkillSphere?</h2>
              <p className="text-lg text-muted-foreground">
                Join thousands of professionals who trust SkillSphere for their career growth
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                  <p className="text-muted-foreground">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="flex flex-col items-center justify-between gap-6 p-8 sm:flex-row">
              <div>
                <h3 className="mb-2 text-2xl font-bold">Ready to Transform Your Career?</h3>
                <p className="text-muted-foreground">
                  Join SkillSphere today and unlock your full potential
                </p>
              </div>
              <Link href="/register">
                <a data-testid="button-signup-cta">
                  <Button size="lg" className="gap-2">
                    Sign Up Now
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </a>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
