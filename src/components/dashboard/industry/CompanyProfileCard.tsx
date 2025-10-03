import { Building2, User, Briefcase, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CompanyProfileCard = () => {
  const companyData = {
    name: "Infosys",
    logo: "🏢",
    industry: "Information Technology",
    hrName: "Rajesh Kumar",
    hrEmail: "rajesh.kumar@infosys.com",
    hrPhone: "+91 98765 43210",
    internshipsPosted: 12,
    activeInternships: 8,
  };

  return (
    <Card className="h-full hover:scale-105 hover:shadow-xl transition-all duration-300 rounded-2xl border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-primary" />
          Company Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="text-6xl">{companyData.logo}</div>
          <div>
            <h3 className="text-2xl font-bold">{companyData.name}</h3>
            <Badge variant="secondary" className="mt-1">
              {companyData.industry}
            </Badge>
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t">
          <div className="flex items-start gap-3">
            <User className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="font-semibold">HR Contact Person</p>
              <p className="text-sm text-muted-foreground">{companyData.hrName}</p>
              <p className="text-sm text-muted-foreground">{companyData.hrEmail}</p>
              <p className="text-sm text-muted-foreground">{companyData.hrPhone}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors">
              <div className="flex items-center gap-2 text-primary">
                <Briefcase className="h-4 w-4" />
                <span className="text-xs font-medium">Total Posted</span>
              </div>
              <p className="text-2xl font-bold mt-1">{companyData.internshipsPosted}</p>
            </div>

            <div className="p-3 rounded-lg bg-green-500/10 hover:bg-green-500/20 transition-colors">
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <TrendingUp className="h-4 w-4" />
                <span className="text-xs font-medium">Active Now</span>
              </div>
              <p className="text-2xl font-bold mt-1">{companyData.activeInternships}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyProfileCard;
