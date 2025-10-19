import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Briefcase, Users, BookOpen, Trophy, Folder, Clock, TrendingUp, Award } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function Dashboard() {
  const { user } = useAuth();

  const { data: stats } = useQuery({
    queryKey: ["/api/dashboard/stats"],
  });

  const quickActions = [
    { label: "Browse Jobs", icon: Briefcase, path: "/jobs", color: "text-blue-600 dark:text-blue-400" },
    { label: "My Network", icon: Users, path: "/network", color: "text-purple-600 dark:text-purple-400" },
    { label: "Explore Courses", icon: BookOpen, path: "/courses", color: "text-green-600 dark:text-green-400" },
    { label: "Competitions", icon: Trophy, path: "/competitions", color: "text-orange-600 dark:text-orange-400" },
    { label: "My Portfolio", icon: Folder, path: "/my-portfolio", color: "text-pink-600 dark:text-pink-400" },
    { label: "Part-Time Jobs", icon: Clock, path: "/part-time", color: "text-teal-600 dark:text-teal-400" },
  ];

  const statCards = [
    { label: "Profile Views", value: stats?.profileViews || 0, icon: TrendingUp, change: "+12%" },
    { label: "Connections", value: stats?.connections || 0, icon: Users, change: "+5" },
    { label: "Courses Enrolled", value: stats?.coursesEnrolled || 0, icon: BookOpen, change: "+2" },
    { label: "Achievements", value: stats?.achievements || 0, icon: Award, change: "+1" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">
            Welcome back, {user?.fullName || user?.username}!
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your account today.
          </p>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600 dark:text-green-400">{stat.change}</span> from last month
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">Quick Actions</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link key={index} href={action.path}>
                  <a data-testid={`link-${action.label.toLowerCase().replace(/\s+/g, '-')}`}>
                    <Card className="hover-elevate transition-all">
                      <CardContent className="flex items-center gap-4 p-6">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 ${action.color}`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{action.label}</h3>
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest actions on SkillSphere</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: "Applied to Full Stack Developer position", time: "2 hours ago" },
                  { action: "Completed React Fundamentals course", time: "1 day ago" },
                  { action: "Connected with John Smith", time: "2 days ago" },
                  { action: "Submitted competition entry", time: "3 days ago" },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3 border-b pb-3 last:border-0">
                    <div className="h-2 w-2 mt-2 rounded-full bg-primary"></div>
                    <div className="flex-1">
                      <p className="text-sm">{item.action}</p>
                      <p className="text-xs text-muted-foreground">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
              <CardDescription>Personalized for you</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <BookOpen className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <div>
                    <p className="font-medium">Advanced JavaScript Patterns</p>
                    <p className="text-sm text-muted-foreground">Based on your learning progress</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Trophy className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  <div>
                    <p className="font-medium">Algorithm Challenge</p>
                    <p className="text-sm text-muted-foreground">Test your coding skills</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Briefcase className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="font-medium">Frontend Developer at TechCorp</p>
                    <p className="text-sm text-muted-foreground">Matches your skills</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
