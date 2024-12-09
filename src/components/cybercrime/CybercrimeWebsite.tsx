import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, Map, FileText } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Report } from '../../types';
import CybercrimeMap from './CybercrimeMap';
import CybercrimeStats from './CybercrimeStats';
import CriticalAreasList from './CriticalAreasList';
import ReportsList from './ReportsList';

const CybercrimeWebsite: React.FC = () => {
  const { reports } = useData();
  const [criticalAreas, setCriticalAreas] = useState<any[]>([]);

  useEffect(() => {
    // Group reports by location and type
    const locationMap = {};
    reports.forEach(report => {
      const key = `${report.location.city}-${report.bullyingType}`;
      if (!locationMap[key]) {
        locationMap[key] = {
          location: report.location,
          type: report.bullyingType,
          reports: [],
          count: 0
        };
      }
      locationMap[key].reports.push(report);
      locationMap[key].count++;
    });

    // Filter areas with more than 3 reports
    const critical = Object.values(locationMap)
      .filter((area: any) => area.count >= 3)
      .map((area: any) => ({
        ...area,
        severity: area.count >= 10 ? 'critical' : area.count >= 5 ? 'high' : 'medium'
      }));

    setCriticalAreas(critical);
  }, [reports]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="text-red-600" size={32} />
          <h1 className="text-2xl font-bold">Cybercrime Reporting System</h1>
        </div>

        <CybercrimeStats reports={reports} criticalAreas={criticalAreas} />
        
        <div className="space-y-8">
          <div className="bg-white rounded-lg overflow-hidden border">
            <div className="p-4 bg-gray-50 border-b">
              <h2 className="text-lg font-semibold">Cyberbullying Hotspots Map</h2>
            </div>
            <div className="h-[500px]">
              <CybercrimeMap reports={reports} criticalAreas={criticalAreas} />
            </div>
          </div>

          <CriticalAreasList areas={criticalAreas} />
          <ReportsList reports={reports} />
        </div>
      </div>
    </div>
  );
};

export default CybercrimeWebsite;