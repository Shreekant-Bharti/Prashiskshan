import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Users,
  MapPin,
  Globe,
  Phone,
  Mail,
  TrendingUp,
} from "lucide-react";

// Dummy data for company partners
const companyData = [
  {
    id: "1",
    name: "TechCorp Ltd",
    industry: "Software Development",
    location: "Bangalore",
    activeInternships: 8,
    totalHired: 23,
    rating: 4.5,
    status: "active",
    contact: "hr@techcorp.com",
    website: "techcorp.com",
  },
  {
    id: "2",
    name: "DataWorks Inc",
    industry: "Data Science",
    location: "Hyderabad",
    activeInternships: 5,
    totalHired: 15,
    rating: 4.2,
    status: "active",
    contact: "careers@dataworks.com",
    website: "dataworks.com",
  },
  {
    id: "3",
    name: "BrandFlow",
    industry: "Marketing",
    location: "Mumbai",
    activeInternships: 3,
    totalHired: 9,
    rating: 4.0,
    status: "active",
    contact: "internships@brandflow.com",
    website: "brandflow.com",
  },
  {
    id: "4",
    name: "FinTech Solutions",
    industry: "Finance",
    location: "Delhi",
    activeInternships: 6,
    totalHired: 18,
    rating: 4.3,
    status: "active",
    contact: "hr@fintech.com",
    website: "fintech.com",
  },
  {
    id: "5",
    name: "GreenEnergy Corp",
    industry: "Renewable Energy",
    location: "Pune",
    activeInternships: 2,
    totalHired: 7,
    rating: 3.8,
    status: "inactive",
    contact: "careers@greenenergy.com",
    website: "greenenergy.com",
  },
];

export const CompanyPartnersCard = () => {
  const activeCompanies = companyData.filter(
    (company) => company.status === "active"
  );
  const totalActiveInternships = activeCompanies.reduce(
    (sum, company) => sum + company.activeInternships,
    0
  );
  const totalHired = companyData.reduce(
    (sum, company) => sum + company.totalHired,
    0
  );

  return (
    <Card className="rounded-2xl shadow-elegant border-secondary/20 bg-gradient-to-br from-card via-card to-secondary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-secondary">
          <Building2 className="w-5 h-5" />
          Company Partners
        </CardTitle>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-secondary">
              {activeCompanies.length}
            </p>
            <p className="text-xs text-muted-foreground">Active Partners</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">
              {totalActiveInternships}
            </p>
            <p className="text-xs text-muted-foreground">Open Positions</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-accent">{totalHired}</p>
            <p className="text-xs text-muted-foreground">Total Hired</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {companyData.map((company) => (
            <div
              key={company.id}
              className="p-4 rounded-lg border border-border bg-card/50 hover:bg-card/80 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold">{company.name}</h4>
                    <Badge
                      className={
                        company.status === "active"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                          : "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300"
                      }
                    >
                      {company.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {company.industry}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium">
                      {company.rating}
                    </span>
                    <div className="flex text-yellow-400">
                      {"★".repeat(Math.floor(company.rating))}
                      {"☆".repeat(5 - Math.floor(company.rating))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    <span>{company.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-3 h-3" />
                    <span className="truncate">{company.contact}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Globe className="w-3 h-3" />
                    <span>{company.website}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Active Internships:
                    </span>
                    <span className="font-medium text-primary">
                      {company.activeInternships}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Hired:</span>
                    <span className="font-medium text-accent">
                      {company.totalHired}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Success Rate:</span>
                    <span className="font-medium text-green-600 dark:text-green-400">
                      {Math.round(
                        (company.totalHired /
                          (company.totalHired + company.activeInternships)) *
                          100
                      )}
                      %
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-secondary/10 via-primary/10 to-accent/10 border border-border/50">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Partnership Insights
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Top Industry:</span>
              <p className="font-medium">Software Development (40%)</p>
            </div>
            <div>
              <span className="text-muted-foreground">Average Rating:</span>
              <p className="font-medium">4.2/5.0</p>
            </div>
            <div>
              <span className="text-muted-foreground">
                New Partners (This Month):
              </span>
              <p className="font-medium text-green-600 dark:text-green-400">
                3
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">
                Partnership Retention:
              </span>
              <p className="font-medium text-blue-600 dark:text-blue-400">
                92%
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
