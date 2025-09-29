import CompanyCard from '../CompanyCard';

export default function CompanyCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      <CompanyCard
        id="1"
        name="CyberArk Software"
        description="Leading provider of privileged access management solutions for securing critical business assets in hybrid cloud environments."
        category="Cybersecurity"
        founded={1999}
        headquarters="Tel Aviv, Israel"
        website="https://cyberark.com"
        valuation="$20B"
        riskLevel="critical"
        employeeCount={7000}
        isPublic={true}
        appCount={12}
        onViewDetails={(id) => console.log('View details for company:', id)}
        onViewApps={(id) => console.log('View apps for company:', id)}
      />
      <CompanyCard
        id="2"
        name="Wiz Security"
        description="Cloud security platform that enables organizations to rapidly identify and remove critical risks in cloud environments."
        category="Cloud Security"
        founded={2020}
        headquarters="New York / Tel Aviv"
        website="https://wiz.io"
        valuation="$23B"
        riskLevel="high"
        employeeCount={900}
        isPublic={false}
        appCount={8}
        onViewDetails={(id) => console.log('View details for company:', id)}
        onViewApps={(id) => console.log('View apps for company:', id)}
      />
      <CompanyCard
        id="3"
        name="Check Point Software"
        description="Multinational provider of software and combined hardware and software products for IT security."
        category="Network Security"
        founded={1993}
        headquarters="Tel Aviv, Israel"
        website="https://checkpoint.com"
        valuation="$17B"
        riskLevel="critical"
        employeeCount={5000}
        isPublic={true}
        appCount={15}
        onViewDetails={(id) => console.log('View details for company:', id)}
        onViewApps={(id) => console.log('View apps for company:', id)}
      />
    </div>
  );
}