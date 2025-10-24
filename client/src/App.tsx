import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import Jobs from "@/pages/Jobs";
import JobDetail from "@/pages/JobDetail";
import CreateJob from "@/pages/CreateJob";
import Courses from "@/pages/Courses";
import Competitions from "@/pages/Competitions";
import Network from "@/pages/Network";
import MyPortfolio from "@/pages/MyPortfolio";
import PartTimeJobs from "@/pages/PartTimeJobs";
import AdminDashboard from "@/pages/AdminDashboard";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/jobs" component={Jobs} />
      <Route path="/jobs/create" component={CreateJob} />
      <Route path="/jobs/:id" component={JobDetail} />
      <Route path="/courses" component={Courses} />
      <Route path="/competitions" component={Competitions} />
      <Route path="/network" component={Network} />
      <Route path="/my-portfolio" component={MyPortfolio} />
      <Route path="/part-time" component={PartTimeJobs} />
      <Route path="/admin" component={AdminDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">
                <Router />
              </main>
            </div>
            <Toaster />
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;