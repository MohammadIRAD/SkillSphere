import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Heart, MessageCircle, Share2, Send } from "lucide-react";
import type { Post } from "@shared/schema";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function Network() {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [postContent, setPostContent] = useState("");

  const { data: posts, isLoading } = useQuery<Post[]>({
    queryKey: ["/api/posts"],
  });

  const createPostMutation = useMutation({
    mutationFn: (content: string) => apiRequest("POST", "/api/posts", { content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      setPostContent("");
      toast({ title: "Post created successfully!" });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to create post",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const likePostMutation = useMutation({
    mutationFn: (postId: string) => apiRequest("POST", `/api/posts/${postId}/like`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
    },
  });

  const handleCreatePost = () => {
    if (postContent.trim()) {
      createPostMutation.mutate(postContent);
    }
  };

  const getUserInitials = (username: string, fullName?: string | null) => {
    if (fullName) {
      return fullName.split(" ").map(n => n[0]).join("").toUpperCase();
    }
    return username[0].toUpperCase();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-6 text-3xl font-bold">Professional Network</h1>

          {isAuthenticated && (
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user?.avatar || undefined} />
                    <AvatarFallback>{getUserInitials(user?.username || "", user?.fullName)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder="Share your thoughts..."
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      className="min-h-[100px] resize-none"
                      data-testid="input-post-content"
                    />
                    <div className="mt-3 flex justify-end">
                      <Button
                        onClick={handleCreatePost}
                        disabled={!postContent.trim() || createPostMutation.isPending}
                        className="gap-2"
                        data-testid="button-create-post"
                      >
                        <Send className="h-4 w-4" />
                        {createPostMutation.isPending ? "Posting..." : "Post"}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          )}

          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="h-10 w-10 rounded-full bg-muted"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 w-1/4 bg-muted rounded"></div>
                        <div className="h-20 w-full bg-muted rounded"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : posts && posts.length > 0 ? (
            <div className="space-y-4">
              {posts.map((post: any) => {
                const isLiked = post.likes?.includes(user?.id);
                return (
                  <Card key={post.id} data-testid={`post-${post.id}`}>
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={post.userAvatar} />
                          <AvatarFallback>{getUserInitials(post.username, post.userFullName)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="mb-2">
                            <p className="font-semibold">{post.userFullName || post.username}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(post.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <p className="mb-4 whitespace-pre-wrap text-sm">{post.content}</p>
                          <Separator className="my-3" />
                          <div className="flex items-center gap-6">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="gap-2"
                              onClick={() => likePostMutation.mutate(post.id)}
                              disabled={!isAuthenticated}
                              data-testid={`button-like-${post.id}`}
                            >
                              <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                              <span>{post.likes?.length || 0}</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="gap-2" disabled>
                              <MessageCircle className="h-4 w-4" />
                              <span>{post.comments?.length || 0}</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="gap-2" disabled>
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <MessageCircle className="mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-2 text-lg font-semibold">No posts yet</h3>
                <p className="text-sm text-muted-foreground">
                  {isAuthenticated ? "Be the first to share something!" : "Sign in to see posts"}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
