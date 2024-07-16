import type { ApplicantStatus } from '@/api/applicant/model/Applicant'

export default interface ApplicantSearchFilter {
  name?: string;
  status?: ApplicantStatus;
}