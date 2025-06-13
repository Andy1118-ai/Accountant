/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';

interface ServiceFormProps {
  serviceId: string;
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const ServiceForms: React.FC<ServiceFormProps> = ({ serviceId, formData, handleInputChange }) => {
  const renderServiceSpecificFields = () => {
    switch (serviceId) {
      case 'bookkeeping':
        return (
          <>
            <div>
              <label htmlFor="monthlyTransactions" className="block text-sm font-medium text-gray-700 mb-2">
                Number of Transactions per Month
              </label>
              <input
                id="monthlyTransactions"
                type="number"
                name="monthlyTransactions"
                value={formData.monthlyTransactions || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="e.g., 100"
              />
            </div>
            <div>
              <label htmlFor="accountingSoftware" className="block text-sm font-medium text-gray-700 mb-2">
                Accounting Software Used
              </label>
              <select
                id="accountingSoftware"
                name="accountingSoftware"
                value={formData.accountingSoftware || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Select software</option>
                <option value="quickbooks">QuickBooks</option>
                <option value="xero">Xero</option>
                <option value="sage">Sage</option>
                <option value="other">Other</option>
              </select>
            </div>
          </>
        );

      case 'tax-planning':
        return (
          <>
            <div>
              <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-2">
                Business Type
              </label>
              <select
                id="businessType"
                name="businessType"
                value={formData.businessType || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Select type</option>
                <option value="sole-proprietor">Sole Proprietor</option>
                <option value="partnership">Partnership</option>
                <option value="corporation">Corporation</option>
                <option value="llc">LLC</option>
              </select>
            </div>
            <div>
              <label htmlFor="annualRevenue" className="block text-sm font-medium text-gray-700 mb-2">
                Annual Revenue
              </label>
              <input
                id="annualRevenue"
                type="number"
                name="annualRevenue"
                value={formData.annualRevenue || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="e.g., 1000000"
              />
            </div>
          </>
        );

      case 'financial-reporting':
        return (
          <>
            <div>
              <label htmlFor="reportingFrequency" className="block text-sm font-medium text-gray-700 mb-2">
                Reporting Frequency
              </label>
              <select
                id="reportingFrequency"
                name="reportingFrequency"
                value={formData.reportingFrequency || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Select frequency</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="annually">Annually</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Required Reports
              </label>
              <div className="space-y-2">
                {['Balance Sheet', 'Income Statement', 'Cash Flow', 'Budget Analysis'].map(report => (
                  <label key={report} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name={`reports.${report.toLowerCase().replace(/\s+/g, '_')}`}
                      checked={formData.reports?.[report.toLowerCase().replace(/\s+/g, '_')] || false}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">{report}</span>
                  </label>
                ))}
              </div>
            </div>
          </>
        );

      case 'payroll':
        return (
          <>
            <div>
              <label htmlFor="employeeCount" className="block text-sm font-medium text-gray-700 mb-2">
                Number of Employees
              </label>
              <input
                id="employeeCount"
                type="number"
                name="employeeCount"
                value={formData.employeeCount || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="e.g., 10"
              />
            </div>
            <div>
              <label htmlFor="payrollFrequency" className="block text-sm font-medium text-gray-700 mb-2">
                Payroll Frequency
              </label>
              <select
                id="payrollFrequency"
                name="payrollFrequency"
                value={formData.payrollFrequency || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Select frequency</option>
                <option value="weekly">Weekly</option>
                <option value="bi-weekly">Bi-weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </>
        );

      case 'business-advisory':
        return (
          <>
            <div>
              <label htmlFor="businessStage" className="block text-sm font-medium text-gray-700 mb-2">
                Business Stage
              </label>
              <select
                id="businessStage"
                name="businessStage"
                value={formData.businessStage || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Select stage</option>
                <option value="startup">Startup</option>
                <option value="growth">Growth</option>
                <option value="established">Established</option>
                <option value="expansion">Expansion</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Advisory Focus Areas
              </label>
              <div className="space-y-2">
                {['Financial Planning', 'Business Strategy', 'Growth Planning', 'Risk Management'].map(area => (
                  <label key={area} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name={`focusAreas.${area.toLowerCase().replace(/\s+/g, '_')}`}
                      checked={formData.focusAreas?.[area.toLowerCase().replace(/\s+/g, '_')] || false}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">{area}</span>
                  </label>
                ))}
              </div>
            </div>
          </>
        );

      case 'audit-assurance':
        return (
          <>
            <div>
              <label htmlFor="auditType" className="block text-sm font-medium text-gray-700 mb-2">
                Audit Type
              </label>
              <select
                id="auditType"
                name="auditType"
                value={formData.auditType || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Select type</option>
                <option value="financial">Financial Statement Audit</option>
                <option value="compliance">Compliance Audit</option>
                <option value="internal">Internal Control Review</option>
                <option value="operational">Operational Audit</option>
              </select>
            </div>
            <div>
              <label htmlFor="lastAuditDate" className="block text-sm font-medium text-gray-700 mb-2">
                Previous Audit Date
              </label>
              <input
                id="lastAuditDate"
                type="date"
                name="lastAuditDate"
                value={formData.lastAuditDate || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {renderServiceSpecificFields()}
    </div>
  );
};

export default ServiceForms;