import React from 'react';
import { AlertTriangle, Map, FileText } from 'lucide-react';
import { Report } from '../../types';

interface CybercrimeStatsProps {
  reports: Report[];
  criticalAreas: any[];
}

const CybercrimeStats: React.FC<CybercrimeStatsProps> = ({ reports, criticalAreas }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-red-50 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-red-600 font-semibold">Critical Areas</p>
            <h3 className="text-2xl font-bold text-red-700">
              {criticalAreas.filter(a => a.severity === 'critical').length}
            </h3>
          </div>
          <AlertTriangle className="text-red-500" size={32} />
        </div>
      </div>

      <div className="bg-orange-50 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-orange-600 font-semibold">High Risk Areas</p>
            <h3 className="text-2xl font-bold text-orange-700">
              {criticalAreas.filter(a => a.severity === 'high').length}
            </h3>
          </div>
          <Map className="text-orange-500" size={32} />
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-600 font-semibold">Total Reports</p>
            <h3 className="text-2xl font-bold text-blue-700">{reports.length}</h3>
          </div>
          <FileText className="text-blue-500" size={32} />
        </div>
      </div>
    </div>
  );
};

export default CybercrimeStats;