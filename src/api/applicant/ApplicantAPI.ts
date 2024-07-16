import axios from 'axios'
import type Applicant from '@/api/applicant/model/Applicant'
import { ApplicantStatus } from '@/api/applicant/model/Applicant'
import type ApplicantPatch from '@/api/applicant/model/ApplicantPatch'
import type ApplicantSearchFilter from '@/api/applicant/model/ApplicantSearchFilter'

export const findApplicants = (searchFilter?: ApplicantSearchFilter, callback?: (response: Applicant[]) => void) => {
  axios
    .get('http://localhost:8080/api/applicants', {
      params: searchFilter
    }).then(response => callback && callback(response.data))
}

export const createApplicant = (applicantName: string, callback?: () => void) => {
  axios
    .post('http://localhost:8080/api/applicants', {
      name: applicantName.trim(),
      status: ApplicantStatus.OPEN
    }).then(response => callback && callback())
}

export const patchApplicant = (id: string, applicantPatch: ApplicantPatch, callback?: () => void) => {
  axios
    .patch('http://localhost:8080/api/applicants/' + id, applicantPatch).then(() => callback && callback());
}