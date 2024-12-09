import React from 'react';
import { Report } from '../../types';
import { formatReportDate } from '../../utils/reportUtils';

interface ReportsListProps {
  reports: Report[];
}

const ReportsList: React.FC<ReportsListProps> = ({ reports }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden border">
      <div className="p-4 bg-gray-50 border-b">
        <h2 className="text-lg font-semibold">All Reports</h2>
      </div>
      <div className="divide-y">
        {reports.map((report) => (
          <div key={report.id} className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold">{report.bullyingType}</h3>
                <p className="text-sm text-gray-500">
                  {report.isAnonymous ? 'Anonymous Report' : `Reported by: ${report.name}`}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                report.severity === 'high' ? 'bg-red-100 text-red-800' :
                report.severity === 'medium' ? 'bg-orange-100 text-orange-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {report.severity.toUpperCase()}
              </span>
            </div>

            <div className="space-y-2 text-gray-600">
              <p>
                <span className="font-medium">Location:</span>{' '}
                {[report.location.city, report.location.district, report.location.state]
                  .filter(Boolean)
                  .join(', ')}
              </p>
              <p>
                <span className="font-medium">Platform:</span>{' '}
                {report.perpetratorInfo.platform}
              </p>
              {report.perpetratorInfo.username && (
                <p>
                  <span className="font-medium">Username:</span>{' '}
                  {report.perpetratorInfo.username}
                </p>
              )}
              <p className="text-sm text-gray-500">
                Reported on: {formatReportDate(report.timestamp)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsList;