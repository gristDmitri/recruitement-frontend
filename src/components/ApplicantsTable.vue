<script lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import * as sea from 'node:sea'
import type ApplicantSearchFilter from '@/api/applicant/model/ApplicantSearchFilter'
import type Applicant from '@/api/applicant/model/Applicant'
import { ApplicantStatus } from '@/api/applicant/model/Applicant'
import { createApplicant, findApplicants, patchApplicant } from '@/api/applicant/ApplicantAPI'

export default {
  name: 'ApplicantsTable',
  computed: {
    sea() {
      return sea
    }
  },
  setup() {
    const applicants = ref<Applicant[]>([]);
    const applicantName = ref('');
    const searchFilter = reactive<ApplicantSearchFilter>({});

    const loadApplicants = () => {
      findApplicants(searchFilter, (response) => applicants.value = response);
    };

    const addApplicant = () => {
      createApplicant(applicantName.value, () => {
        loadApplicants();
        applicantName.value = '';
      });
    };

    const acceptApplicant = (id: string) => patchApplicant(id, {status: ApplicantStatus.ACCEPTED}, loadApplicants);
    const declineApplicant = (id: string) => patchApplicant(id, {status: ApplicantStatus.DECLINED}, loadApplicants);
    const handleDeclinedCheckBox = (checkBoxEvent: Event) => {
      searchFilter.status = (checkBoxEvent.target as HTMLInputElement).checked ? ApplicantStatus.DECLINED : undefined;
    };

    onMounted(() => {
      loadApplicants();
    });

    watch(searchFilter, () => {
      loadApplicants();
    });

    return {
      ApplicantStatus,
      applicants,
      applicantName,
      searchFilter,
      addApplicant,
      acceptApplicant,
      declineApplicant,
      handleDeclinedCheckBox
    }
  }
}
</script>

<style scoped>
th,
td {
  border: 1px solid rgb(160 160 160);
  padding: 8px 10px;
}

th[scope='col'] {
  background-color: #505050;
  color: #fff;
}

td {
  text-align: center;
}

tr:nth-of-type(even) {
  background-color: #eee;
}

table {
  border-collapse: collapse;
  border: 2px solid rgb(140 140 140);
  font-family: sans-serif;
  font-size: 0.8rem;
  letter-spacing: 1px;
}

.grid-row-wrapper {
  display: flex;
  flex-direction: row;
  gap: 12px;
}

.grid-col-wrapper {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>

<template>
  <div class="grid-col-wrapper">
    <h1>Job Applicants</h1>
    <div>
      <div class="grid-row-wrapper">
        <input
          type="text"
          v-model="applicantName"
          placeholder="Applicant Name"
        />
        <button @click="addApplicant">Add Applicant</button>
      </div>
    </div>
    <hr />
    <div class="grid-row-wrapper">
      <input
        type="text"
        v-model="searchFilter.name"
        placeholder="Filter applicants"
      />
      <input id="hideDeclined" type="checkbox" @change="handleDeclinedCheckBox">
      <label for="hideDeclined">Hide Declined</label>
    </div>

    <table>
      <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Status</th>
        <th scope="col">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="applicant in applicants" :key="applicant.name">
        <td>{{ applicant.name }}</td>
        <td>{{ applicant.status }}</td>
        <td>
          <div v-if="applicant.status  === ApplicantStatus.OPEN.valueOf()">
            <a @click="() => acceptApplicant(applicant.id)">Accept</a>
            <a @click="() => declineApplicant(applicant.id)">Deny</a>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>