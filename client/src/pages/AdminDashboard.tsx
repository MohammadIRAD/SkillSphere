import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Briefcase, BookOpen, Trophy, TrendingUp, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLocation } from "wouter";
import { useEffect } from "react";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (user?.role !== "admin") {
      setLocation("/");
    }
  }, [user, setLocation]);

  const { data: stats } = useQuery({
    queryKey: ["/api/admin/stats"],
  });

  const statCards = [
    { label: "Total Users", value: stats?.totalUsers || 0, icon: Users, change: "+12%", color: "text-blue-600 dark:text-blue-400" },
    { label: "Active Jobs", value: stats?.activeJobs || 0, icon: Briefcase, change: "+8%", color: "text-green-600 dark:text-green-400" },
    { label: "Courses", value: stats?.totalCourses || 0, icon: BookOpen, change: "+5%", color: "text-purple-600 dark:text-purple-400" },
    { label: "Competitions", value: stats?.totalCompetitions || 0, icon: Trophy, change: "+3%", color: "text-orange-600 dark:text-orange-400" },
  ];

  if (user?.role !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage and monitor the SkillSphere platform
          </p>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
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

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest platform activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { user: "John Doe", action: "registered as instructor", time: "5 min ago" },
                  { user: "Jane Smith", action: "posted a new job", time: "1 hour ago" },
                  { user: "Mike Johnson", action: "created a course", time: "2 hours ago" },
                  { user: "Sarah Williams", action: "joined a competition", time: "3 hours ago" },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3 border-b pb-3 last:border-0">
                    <div className="h-2 w-2 mt-2 rounded-full bg-primary"></div>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">{item.user}</span> {item.action}
                      </p>
                      <p className="text-xs text-muted-foreground">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Platform Health</CardTitle>
              <CardDescription>System status and alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <span className="text-sm">Server Status</span>
                  </div>
                  <Badge variant="secondary" className="bg-green-500/10 text-green-600 dark:text-green-400">
                    Online
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <span className="text-sm">Database</span>
                  </div>
                  <Badge variant="secondary" className="bg-green-500/10 text-green-600 dark:text-green-400">
                    Healthy
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                    <span className="text-sm">Pending Reviews</span>
                  </div>
                  <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-600 dark:text-yellow-400">
                    3 Items
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <span className="text-sm">User Growth</span>
                  </div>
                  <Badge variant="secondary" className="bg-green-500/10 text-green-600 dark:text-green-400">
                    +15%
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
