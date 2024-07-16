import type { ApplicantStatus } from '@/api/applicant/model/Applicant'

export default interface ApplicantPatch {
  name?: string;
  status?: ApplicantStatus;
}