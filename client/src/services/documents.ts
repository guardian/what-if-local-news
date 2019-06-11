interface SearchHit {
  id: string;
  title: string;
  highlights?: string[];
  fields: object;
}

export interface PlanningApplication extends SearchHit {
  index: "planning-applications";
  fields: {
    applicationLink: string;
    caseRef: string;
    applicationType: string;
    conservationArea: string;
    dateReceived: string;
    status: string;
    applicantCompany: string;
    applicantName: string;
  };
}

export interface Contract extends SearchHit {
  index: "council-contracts";
  fields: {
    description: string;
    valueLow: string;
    valueHigh: string;
    status: string;
    publishedDate: string;
    organisationName: string;
  };
}

export interface HealthContract extends SearchHit {
  index: "health-contracts";
  fields: {
    description: string;
    valueLow: string;
    valueHigh: string;
    status: string;
    publishedDate: string;
    organisationName: string;
  };
}

export interface Petition extends SearchHit {
  index: "council-petitions";
  fields: {
    signatures: string[];
    description: string;
    petitionLink: string;
    backgroundInfo: string;
    creator: string;
  };
}

export type Document =
  | PlanningApplication
  | Contract
  | Petition
  | HealthContract;
