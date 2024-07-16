export enum ApplicantStatus {
  OPEN = 'OPEN',
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
}

export default interface Applicant {
  id: string;
  name: string;
  status: ApplicantStatus;
}