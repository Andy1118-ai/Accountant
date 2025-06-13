// Utility helpers for persisting service requests in localStorage

export interface ServiceRequest {
  id: number;
  title: string;
  due: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Pending' | 'In Progress' | 'Completed';
}

const KEY = 'serviceRequests';

export const getServiceRequests = (): ServiceRequest[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as ServiceRequest[]) : [];
  } catch {
    return [];
  }
};

export const saveServiceRequests = (req: ServiceRequest[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEY, JSON.stringify(req));
  window.dispatchEvent(new Event('service-requests-updated'));
};
