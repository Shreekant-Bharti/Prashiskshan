import { useState, useEffect } from "react";
import { Briefcase, MapPin, Calendar, DollarSign, Users, GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const InternshipListingsCard = () => {
  const [myInternships, setMyInternships] = useState<any[]>([]);

  useEffect(() => {
    // Load internships from localStorage
    const loadInternships = () => {
      const internships = JSON.parse(localStorage.getItem("my_internships") || "[]");
      setMyInternships(internships);
    };

    loadInternships();

    // Refresh every second to catch new internships
    const interval = setInterval(loadInternships, 1000);

    return () => clearInterval(interval);
  }, []);

  const activeInternships = myInternships.filter(i => i.status === "active");
  const closedInternships = myInternships.filter(i => i.status === "closed");

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} week${Math.floor(days / 7) > 1 ? 's' : ''} ago`;
    return `${Math.floor(days / 30)} month${Math.floor(days / 30) > 1 ? 's' : ''} ago`;
  };

  return (
    <Card className="hover:scale-[1.02] hover:shadow-xl transition-all duration-300 rounded-2xl border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-primary" />
          My Internship Listings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="active">Active ({activeInternships.length})</TabsTrigger>
            <TabsTrigger value="closed">Closed ({closedInternships.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4 mt-4">
            {activeInternships.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No active internships yet. Create your first internship!
              </div>
            ) : (
              activeInternships.map((internship) => (
                <div
                  key={internship.id}
                  className="p-4 rounded-lg border-2 hover:border-primary hover:shadow-md transition-all duration-300 bg-card"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{internship.title}</h3>
                      <p className="text-sm text-muted-foreground">{internship.company}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-primary font-semibold">
                        <Users className="h-4 w-4" />
                        <span>{internship.applicationsCount || 0} applications</span>
                      </div>
                      <div className="flex gap-1 mt-1 flex-wrap justify-end">
                        {internship.type === "college-specific" && internship.selectedColleges?.length > 0 && (
                          <Badge variant="secondary" className="text-xs">
                            🎓 {internship.selectedColleges.slice(0, 2).join(", ")}
                            {internship.selectedColleges.length > 2 && ` +${internship.selectedColleges.length - 2}`}
                          </Badge>
                        )}
                        {internship.type === "universal" && (
                          <Badge variant="outline" className="text-xs">🌐 Universal</Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{internship.mode}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{internship.duration}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <DollarSign className="h-3 w-3" />
                      <span>{internship.stipend}</span>
                    </div>
                    <div className="text-muted-foreground">Posted {formatDate(internship.postedDate)}</div>
                  </div>
                </div>
              ))
            )}
          </TabsContent>

          <TabsContent value="closed" className="space-y-4 mt-4">
            {closedInternships.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No closed internships yet.
              </div>
            ) : (
              closedInternships.map((internship) => (
                <div
                  key={internship.id}
                  className="p-4 rounded-lg border-2 bg-muted/50 opacity-75"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{internship.title}</h3>
                      <p className="text-sm text-muted-foreground">{internship.company}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">Closed</Badge>
                      <p className="text-sm text-muted-foreground mt-1">
                        {internship.applicationsCount || 0} applications • {internship.hired || 0} hired
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{internship.mode}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{internship.duration}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <DollarSign className="h-3 w-3" />
                      <span>{internship.stipend}</span>
                    </div>
                    <div className="text-muted-foreground">Closed {internship.closedDate || formatDate(internship.postedDate)}</div>
                  </div>
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default InternshipListingsCard;
