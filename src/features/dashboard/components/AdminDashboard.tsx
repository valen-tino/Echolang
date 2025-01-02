import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Users, Video } from 'lucide-react';
import { AdminStats, FeedbackEntry } from '../types';
import { FeedbackList } from '@/features/feedback/components/FeedbackList';

export function AdminDashboard() {
  // State management
  const [activeTab, setActiveTab] = useState('feedback');
  const [stats] = useState<AdminStats>({
    totalUsers: 245,
    activeTranslations: 14,
    storageUsed: '45.8GB',
    totalFeedback: 23
  });

  const [feedbacks] = useState<FeedbackEntry[]>([
    {
      id: '1',
      userId: '2',
      userName: 'John Doe',
      content: 'Great service! The translation quality is excellent.',
      rating: 5,
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      userId: '3',
      userName: 'Jane Smith',
      content: 'Could improve processing speed.',
      rating: 4,
      createdAt: new Date().toISOString()
    }
  ]);

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-8 grid-cols-1 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Translations</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeTranslations}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.storageUsed}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Feedback</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalFeedback}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Section */}
      <Tabs value={activeTab} onValueChange={handleTabChange} className="mt-8">
        <TabsList>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="translations">Translations</TabsTrigger>
        </TabsList>

        <TabsContent value="feedback">
          <FeedbackList 
            feedbacks={feedbacks}
            onRespond={async (id: string, response: string) => {
              console.log('Responding to feedback:', id, response);
            }}
          />
        </TabsContent>

        <TabsContent value="users">
          <div className="text-center text-muted-foreground py-8">
            <Users className="mx-auto h-12 w-12 mb-4" />
            <h3 className="text-lg font-medium">User Management</h3>
            <p>User management interface will appear here</p>
          </div>
        </TabsContent>

        <TabsContent value="translations">
          <div className="text-center text-muted-foreground py-8">
            <Video className="mx-auto h-12 w-12 mb-4" />
            <h3 className="text-lg font-medium">Translation Management</h3>
            <p>Translation management interface will appear here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}