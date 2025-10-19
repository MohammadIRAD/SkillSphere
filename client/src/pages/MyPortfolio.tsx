import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Plus, ExternalLink, Github, Eye, Heart, Folder } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { Portfolio } from "@shared/schema";

const projectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  tags: z.string(),
  liveUrl: z.string().url().optional().or(z.literal("")),
  githubUrl: z.string().url().optional().or(z.literal("")),
});

type ProjectForm = z.infer<typeof projectSchema>;

export default function MyPortfolio() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: portfolio, isLoading } = useQuery<Portfolio>({
    queryKey: ["/api/portfolio/my"],
  });

  const form = useForm<ProjectForm>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      tags: "",
      liveUrl: "",
      githubUrl: "",
    },
  });

  const addProjectMutation = useMutation({
    mutationFn: (data: ProjectForm) => {
      const project = {
        id: crypto.randomUUID(),
        title: data.title,
        description: data.description,
        tags: data.tags.split(",").map(t => t.trim()).filter(Boolean),
        liveUrl: data.liveUrl || undefined,
        githubUrl: data.githubUrl || undefined,
      };
      return apiRequest("POST", "/api/portfolio/project", project);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/portfolio/my"] });
      setIsDialogOpen(false);
      form.reset();
      toast({ title: "Project added successfully!" });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to add project",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ProjectForm) => {
    addProjectMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Card className="animate-pulse">
            <CardHeader>
              <div className="h-8 w-1/4 bg-muted rounded"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-32 bg-muted rounded"></div>
                <div className="h-32 bg-muted rounded"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold">My Portfolio</h1>
            <p className="text-muted-foreground">
              Showcase your projects and achievements
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2" data-testid="button-add-project">
                <Plus className="h-4 w-4" />
                Add Project
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Project</DialogTitle>
                <DialogDescription>
                  Add a project to showcase in your portfolio
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Title</FormLabel>
                        <FormControl>
                          <Input placeholder="My Awesome Project" {...field} data-testid="input-title" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your project..."
                            className="min-h-[100px]"
                            {...field}
                            data-testid="input-description"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags</FormLabel>
                        <FormControl>
                          <Input placeholder="React, Node.js, MongoDB" {...field} data-testid="input-tags" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="liveUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Live URL (optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="https://..." {...field} data-testid="input-live-url" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="githubUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>GitHub URL (optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="https://github.com/..." {...field} data-testid="input-github-url" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={addProjectMutation.isPending} data-testid="button-submit">
                    {addProjectMutation.isPending ? "Adding..." : "Add Project"}
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="mb-8 grid gap-6 sm:grid-cols-3">
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <Eye className="h-8 w-8 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold">{portfolio?.viewCount || 0}</p>
                <p className="text-sm text-muted-foreground">Profile Views</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <Heart className="h-8 w-8 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold">{portfolio?.likes || 0}</p>
                <p className="text-sm text-muted-foreground">Likes</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <Folder className="h-8 w-8 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold">{portfolio?.projects?.length || 0}</p>
                <p className="text-sm text-muted-foreground">Projects</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Projects</CardTitle>
            <CardDescription>Your portfolio projects</CardDescription>
          </CardHeader>
          <CardContent>
            {portfolio?.projects && portfolio.projects.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {portfolio.projects.map((project: any) => (
                  <Card key={project.id} data-testid={`project-${project.id}`}>
                    <CardHeader>
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-3 text-sm text-muted-foreground">{project.description}</p>
                      {project.tags && project.tags.length > 0 && (
                        <div className="mb-3 flex flex-wrap gap-1">
                          {project.tags.map((tag: string, index: number) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <div className="flex gap-2">
                        {project.liveUrl && (
                          <Button size="sm" variant="outline" className="gap-2" asChild>
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" data-testid={`link-live-${project.id}`}>
                              <ExternalLink className="h-3 w-3" />
                              Live
                            </a>
                          </Button>
                        )}
                        {project.githubUrl && (
                          <Button size="sm" variant="outline" className="gap-2" asChild>
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" data-testid={`link-github-${project.id}`}>
                              <Github className="h-3 w-3" />
                              Code
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <Folder className="mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-2 text-lg font-semibold">No projects yet</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Start building your portfolio by adding your projects
                </p>
                <Button onClick={() => setIsDialogOpen(true)} className="gap-2" data-testid="button-add-first-project">
                  <Plus className="h-4 w-4" />
                  Add Your First Project
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
