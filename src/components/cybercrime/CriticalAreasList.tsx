import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface CriticalAreasListProps {
  areas: any[];
}

const CriticalAreasList: React.FC<CriticalAreasListProps> = ({ areas }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 border-red-500 text-red-800';
      case 'high':
        return 'bg-orange-100 border-orange-500 text-orange-800';
      default:
        return 'bg-blue-100 border-blue-500 text-blue-800';
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden border">
      <div className="p-4 bg-gray-50 border-b">
        <h2 className="text-lg font-semibold">Critical Areas Report</h2>
      </div>
      <div className="divide-y">
        {areas.map((area, index) => (
          <div key={index} className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="text-current" />
                <h3 className="font-semibold">
                  {area.location.city}, {area.location.state}
                </h3>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${getSeverityColor(area.severity)}`}>
                {area.severity.toUpperCase()}
              </span>
            </div>
            <p className="text-gray-600 mb-2">
              {area.count} reports of {area.type}
            </p>
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Incident Details:</h4>
              <div className="flex flex-wrap gap-2">
                {Object.entries(
                  area.reports.reduce((acc: any, r: Report) => {
                    acc[r.bullyingType] = (acc[r.bullyingType] || 0) + 1;
                    return acc;
                  }, {})
                ).map(([type, count]) => (
                  <span
                    key={type}
                    className="bg-white px-3 py-1 rounded-full text-sm border"
                  >
                    {type}: {count}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CriticalAreasList;