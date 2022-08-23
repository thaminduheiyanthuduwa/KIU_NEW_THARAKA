<template>


  <b-card>
<!--    <b-button-->
<!--        style="margin-bottom: 10px"-->
<!--        variant="primary"-->
<!--        @click="() => $router.push(`/apps/eResources/creatResources`)"-->
<!--    >-->
<!--      Add-->
<!--    </b-button>-->
    <b-sidebar
        id="sidebar-creat"
        backdrop
        bg-variant="white"
        right
        shadow
    >
      <sidebar-content title="Create"/>
    </b-sidebar>
    <b-sidebar
        id="sidebar-edit"
        backdrop
        bg-variant="white"
        right
        shadow
    >
      <sidebar-content title="Edit"/>
    </b-sidebar>
    <div class="custom-search">

      <!-- advance search input -->
      <b-row>
        <b-col md="4">
          <b-form-group>
            <label>Title:</label>
            <b-form-input
                class="d-inline-block"
                placeholder="Search"
                type="text"
                @input="advanceSearch"
            />
          </b-form-group>
        </b-col>
      </b-row>
    </div>

    <!-- table -->
    <div>
      <b-table
          :current-page="currentPage"
          :fields="fields"
          :filter="filter"
          :items="items"
          :per-page="perPage"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
          class="position-relative"
          hover
          responsive
          striped
      >
        <template #cell(show_details)="row">

          <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
          <b-form-checkbox
              v-model="row.detailsShowing"
              @change="row.toggleDetails"
          >
            {{ row.detailsShowing ? 'Hide' : 'Show' }}
          </b-form-checkbox>
        </template>

        <!-- full detail on click -->
        <template #row-details="row">
          <b-card>
<!--            <b-row class="mb-2">-->
<!--              <b-col>-->
<!--                <div class="bg-light-primary rounded-top text-center">-->
<!--                  <img src="@/images/concern_detail.png"/>-->
<!--                </div>-->
<!--              </b-col>-->
<!--            </b-row>-->


            <b-row class="mb-2">
              <b-col
                  class="mb-1"
                  md="4"
              >
                <strong>Published Date : </strong>{{ row.item.date }}
              </b-col>
              <b-col
                  class="mb-1"
                  md="4"
              >
                <strong>Concern : </strong>{{ row.item.concern }}
              </b-col>
              <b-col
                  class="mb-1"
                  @click="getFile(row.item.file)"
                  md="4"
              >
                <strong>Uploaded File : </strong>Click Here to Download Document
              </b-col>
              <b-col
                  class="mb-1"
                  @click="getFile(row.item.head_approval)"
                  md="4"
              >
                <strong>Head Approval : </strong>Click Here to Download Head Approval
              </b-col>
              <b-col
                  class="mb-1"
                  @click="getFile(row.item.head_approval)"
                  md="4"
              >
                <strong>Head Approval : </strong>Click Here to Download Final Document
              </b-col>

            </b-row>
            <div class="demo-inline-spacing">
              <b-button
                  size="sm"
                  variant="outline-secondary"
                  @click="row.toggleDetails"
              >
                Hide Details
              </b-button>
              <b-button
                  size="sm"
                  style="margin-left: 10px"
                  variant="outline-primary"
                  @click="() => $router.push(`/apps/libraryConcerns/edit/${items[row.index].id}`)"
              >
                edit
              </b-button>
              <div v-if="row.item.status === 1">
                <b-button
                    size="sm"
                    style="margin-left: 10px"
                    variant="outline-success"
                >
                  Successfully submitted
                </b-button>
              </div>
              <div v-if="row.item.status !== 1">
                <b-button
                    size="sm"
                    style="margin-left: 10px"
                    variant="outline-danger"
                    @click="updateEResourceStatus(row.item.id,'1',5)"
                >
                  Successfully submitted
                </b-button>
              </div>
              <div v-if="row.item.status === 2">
                <b-button
                    size="sm"
                    style="margin-left: 10px"
                    variant="outline-success"
                >
                  Reviewed by Head/Secretary
                </b-button>
              </div>
              <div v-if="row.item.status !== 2">
                <b-button
                    size="sm"
                    style="margin-left: 10px"
                    variant="outline-danger"
                    @click="updateEResourceStatus(row.item.id,'2',5)"
                >
                  Reviewed by Head/Secretary
                </b-button>
              </div>
              <div v-if="row.item.status === 3">
                <b-button
                    size="sm"
                    style="margin-left: 10px"
                    variant="outline-success"
                >
                  Accepted for review
                </b-button>
              </div>
              <div v-if="row.item.status !== 3">
                <b-button
                    size="sm"
                    style="margin-left: 10px"
                    variant="outline-danger"
                    @click="updateEResourceStatus(row.item.id,'3',5)"
                >
                  Accepted for review
                </b-button>
              </div>
              <div v-if="row.item.status === 4">
                <b-button
                    size="sm"
                    style="margin-left: 10px"
                    variant="outline-success"
                >
                  Reviewed by the Library
                </b-button>
              </div>
              <div v-if="row.item.status !== 4">
                <b-button
                    size="sm"
                    style="margin-left: 10px"
                    variant="outline-danger"
                    @click="updateEResourceStatus(row.item.id,'4',5)"
                >
                  Reviewed by the Library
                </b-button>
              </div>
              <div v-if="row.item.status === 5">
                <b-button
                    size="sm"
                    style="margin-left: 10px"
                    variant="outline-success"
                >
                  Final Decision
                </b-button>
              </div>
              <div v-if="row.item.status !== 5">
                <b-button
                    size="sm"
                    style="margin-left: 10px"
                    variant="outline-danger"
                    @click="updateEResourceStatus(row.item.id,'5',5)"
                >
                  Final Decision
                </b-button>
              </div>
              <div>
                <b-button
                    size="sm"
                    style="margin-left: 10px"
                    variant="outline-primary"
                    @click="updateEResourceStatus(row.item.id,getIsActiveValue(row.item.is_active),5)"
                >
                  {{ getIsActiveValue(row.item.is_active) }}
                </b-button>
              </div>
              <div>
                <b-button
                    size="sm"
                    style="margin-left: 10px"
                    variant="outline-primary"
                    @click="updateEResourceStatus(row.item.id,getIsPublicValue(row.item.is_public),5)"
                >
                  {{ getIsPublicValue(row.item.is_public) }}
                </b-button>
              </div>
            </div>
          </b-card>
        </template>

        <template #cell(avatar)="data">
          <b-avatar :src="data.value"/>
        </template>

        <template #cell(status)="data">
          <b-badge :variant="status[1][data.value]">
            {{ status[0][data.value] }}
          </b-badge>
        </template>
      </b-table>
    </div>
    <b-card-body class="d-flex justify-content-between flex-wrap pt-0">

      <!-- page length -->
      <b-form-group
          class="text-nowrap mb-md-0 mr-1"
          label="Per Page"
          label-align="left"
          label-cols="6"
          label-for="sortBySelect"
          label-size="sm"
      >
        <b-form-select
            id="perPageSelect"
            v-model="perPage"
            :options="pageOptions"
            inline
            size="sm"
        />
      </b-form-group>

      <!-- pagination -->
      <div>
        <b-pagination
            v-model="currentPage"
            :per-page="perPage"
            :total-rows="totalRows"
            class="mb-0"
            first-number
            last-number
            next-class="next-item"
            prev-class="prev-item"
        >
          <template #prev-text>
            <feather-icon
                icon="ChevronLeftIcon"
                size="18"
            />
          </template>
          <template #next-text>
            <feather-icon
                icon="ChevronRightIcon"
                size="18"
            />
          </template>
        </b-pagination>
      </div>
    </b-card-body>

    <!--    <template #code>-->
    <!--      {{ codeAdvance }}-->
    <!--    </template>-->
  </b-card>
</template>

<script>
// import BCardCode from '@core/components/b-card-code/BCardCode.vue'
import {
  BAvatar,
  BBadge,
  BButton,
  BCard,
  BCardBody,
  BCol,
  BFormCheckbox,
  BFormGroup,
  BFormInput,
  BFormSelect,
  BImg,
  BPagination,
  BRow,
  BSidebar,
  BTable,
  VBToggle,
} from 'bootstrap-vue' // eslint-disable-line
import { VueGoodTable } from 'vue-good-table'
import store from '@/store/index'
import Ripple from 'vue-ripple-directive'
import SidebarContent from './SidebarContent.vue'
import vSelect from 'vue-select'
import axios from 'axios'
// import {useRouter} from "vue-router";
// import { codeAdvance } from './code'
/* eslint-disable */
export default {
  components: {
    BCard,
    BImg,
    BCardBody,
    vSelect,
    BBadge,
    BSidebar,
    SidebarContent,
    BFormCheckbox,
    BTable,
    BButton,
    VueGoodTable,
    BAvatar,
    BPagination,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BRow,
    BCol,
    // eslint-disable-next-line vue/no-unused-components
    // ToastificationContent,
  },
  /* eslint-disable */
  directives: {
    'b-toggle': VBToggle,
    Ripple,
  },
  /* eslint-disable */
  data() {
    return {
      pageLength: 5,
      pageOptions: [3, 5, 10],
      perPage: 5,
      totalRows: 10,
      currentPage: 1,
      edit_id: '',
      edit_title: '',
      edit_url: '',
      edit_cover: '',
      edit_description: '',
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      dir: false,
      // filter: {
      //   resource:null,
      //   department:null,
      // },
      filter: null,
      resource: '',
      resourceOptions: ['Thesis', 'General'],
      department: '',
      departmentOptions: ['Nursing', 'BMS', 'Psychology', 'Management', 'Acupuncture', 'IT'],
      rows: [],
      searchTerm: '',
      fields: [
        'show_details',
        'id',
        'student_id',
        'concern_id',
        {
          key: 'status',
          label: 'Status'

        },
        'date',
        'is_active',
        'is_public'],
      /* eslint-disable global-require */
      items: [],
      /* eslint-disable global-require */
      status: [{
        1: 'Successfully submitted',
        2: 'Reviewed by Head/Secretary',
        3: 'Accepted for review',
        4: 'Reviewed by the Library',
        5: 'Final Decision',
      },
        {
          1: 'light-primary',
          2: 'light-success',
          3: 'light-danger',
          4: 'light-warning',
          5: 'light-info',
        }],
    }
  },
  setup(){
    // const router = useRouter();
    return{
    }
  },

  /* eslint-disable */
  computed: {
    direction() {
      if (store.state.appConfig.isRTL) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.dir = true
        return this.dir
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.dir = false
      return this.dir
    },
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length
  },
  /* eslint-disable */
  created() {
    fetch("http://localhost:8081/concern/get-all-info?page=1&limit=2000&sort=tt")
        .then(async response => {
          const data = await response.json();
          this.items = data.data.items;
          this.totalRows = data.data.total;
        })
        .catch(error => {
          this.errorMessage = error;
          console.error("There was an error!", error);
        })
  },
  methods: {
    advanceSearch(val) {
      this.filter = val
    },
    edit(val, title) {

      this.edit_id = val
      this.edit_title = title
      this.edit_url = url
      this.edit_description = description
      this.edit_cover = cover
    },
    getIsActiveValue(val) {
      if (val === 1)
        return 'Inactive'
      else
        return 'Active'
    },
    getIsPublicValue(val) {
      if (val == 1)
        return 'Private'
      else
        return 'Public'
    },
    getStatusColour(val) {
      return 'outline-success'
    },
    updateEResourceStatus(data, status, updated_user) {
      axios.put("http://localhost:8081/concern/update-status", null,
          {params: {data, status, updated_user}})
          .then(response => window.location.reload());
    },
    getData() {
      axios.get("http://localhost:8081/database/get-all-info?page=1&limit=20&sort=tt")
          .then(response => {
            const data = response.json();
            this.items = data.data.items;
          });
    },
    getFile(data) {
      axios.get("http://localhost:8081/concern/downloadFile",
          {params: {data}}),
          {responseType: 'blob'}
              .then(response => {
                var fileURL = window.URL.createObjectURL(new Blob([response.data]));
                var fileLink = document.createElement('a');

                fileLink.href = fileURL;
                fileLink.setAttribute('download', 'file.pdf');
                document.body.appendChild(fileLink);

                fileLink.click();
              });
    }
  },
}
</script>
