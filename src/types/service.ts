export interface Service {
  title: string;
  description: string;
  link: string;
  department: string;
  category: string;
  tags: string[];
  eligibility: string;
  documents_required: string[];
  estimated_time: string;
  last_updated: string;
  state_specific: boolean;
}

export interface ServiceSearch {
  title: string;
  description: string;
  tags: string[];
}
