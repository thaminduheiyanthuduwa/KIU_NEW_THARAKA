<template>

  <b-card>
    <b-button
        style="margin-bottom: 10px"
        variant="primary"
        @click="() => $router.push(`/apps/libraryConcerns/creat`)"
    >
      Add
    </b-button>
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
        <b-col md="4">
          <b-form-group>
            <label>Author:</label>
            <b-form-input
                class="d-inline-block"
                placeholder="Search"
                type="text"
                @input="advanceSearch"
            />
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group>
            <label>Department:</label>
            <b-form-input
                class="d-inline-block"
                placeholder="Search"
                type="text"
                @input="advanceSearch"
            />
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group>
            <label>Resource:</label>
            <b-form-input
                class="d-inline-block"
                placeholder="Search"
                type="text"
                @input="advanceSearch"
            />
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group>
            <label>Status:</label>
            <b-form-input
                class="d-inline-block"
                placeholder="Search"
                type="text"
                @input="advanceSearch"
            />
          </b-form-group>
        </b-col>
        <!--        <b-col md="4">-->
        <!--          <b-form-group>-->
        <!--            <label>Salary:</label>-->
        <!--            <b-form-input-->
        <!--                class="d-inline-block"-->
        <!--                placeholder="Search"-->
        <!--                type="text"-->
        <!--                @input="advanceSearch"-->
        <!--            />-->
        <!--          </b-form-group>-->
        <!--        </b-col>-->
      </b-row>
    </div>

    <!-- table -->
    <div>
      <b-table
          :current-page="currentPage"
          :fields="fields"
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
            <b-row class="mb-2">
              <b-col
                  class="mb-1"
                  md="4"
              >
                <strong>Title : </strong>{{ row.item.full_name }}
              </b-col>
              <b-col
                  class="mb-1"
                  md="4"
              >
                <strong>Author : </strong>{{ row.item.post }}
              </b-col>
              <b-col
                  class="mb-1"
                  md="4"
              >
                <strong>Department : </strong>{{ row.item.email }}
              </b-col>
              <b-col
                  class="mb-1"
                  md="4"
              >
                <strong>Resource : </strong>{{ row.item.city }}
              </b-col>
              <b-col
                  class="mb-1"
                  md="4"
              >
                <strong>Status : </strong>{{ row.item.salary }}
              </b-col>
              <!--              <b-col-->
              <!--                  class="mb-1"-->
              <!--                  md="4"-->
              <!--              >-->
              <!--                <strong>Age : </strong>{{ row.item.age }}-->
              <!--              </b-col>-->
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
                  @click="() => $router.push(`/apps/libraryConcerns/edit/${1}`)"
              >
                edit
              </b-button>
              <b-button
                  size="sm"
                  style="margin-left: 10px"
                  variant="outline-danger"
              >
                Delete
              </b-button>
              <b-button
                  size="sm"
                  style="margin-left: 10px"
                  variant="outline-secondary"
                  @click="row.id"
              >
                draft
              </b-button>
              <b-button
                  size="sm"
                  style="margin-left: 10px"
                  variant="outline-success"
                  @click="row.id"
              >
                published
              </b-button>
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
// import { codeAdvance } from './code'
/* eslint-disable */
export default {
  components: {
    BCard,
    BCardBody,
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
      totalRows: 1,
      currentPage: 1,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      dir: false,
      columns: [
        {
          label: 'Title',
          field: 'fullName',
        },
        {
          label: 'Author',
          field: 'email',
        },
        {
          label: 'Status',
          field: 'post',
        },
        {
          label: 'Department',
          field: 'city',
        },
        {
          label: 'Resource',
          field: 'startDate',
        },
        {
          label: 'Actions',
          field: 'salary',
        },
      ],
      rows: [],
      searchTerm: '',
      fields: [
        'show_details',
        'id',
        // {
        //   key: 'avatar',
        //   label: 'Avatar'
        // },
        'Title',
        'Author',
        'Department',
        'Resource',
        {
          key: 'status',
          label: 'Status'

        }],
      /* eslint-disable global-require */
      items: [
        {
          id: 1,
          avatar: require('@/assets/images/avatars/10-small.png'),
          Title: 'Korrie O\'Crevy',
          Author: 'Nuclear Power Engineer',
          Department: 'kocrevy0@thetimes.co.uk',
          Resource: 'Krasnosilka',
          status: 2,
        },
        {
          id: 2,
          avatar: require('@/assets/images/avatars/1-small.png'),
          full_name: 'Bailie Coulman',
          post: 'VP Quality Control',
          email: 'bcoulman1@yolasite.com',
          city: 'Hinigaran',
          start_date: '05/20/2018',
          salary: '$13633.69',
          age: '63',
          experience: '3 Years',
          status: 2,
        },
        {
          id: 3,
          avatar: require('@/assets/images/avatars/9-small.png'),
          full_name: 'Stella Ganderton',
          post: 'Operator',
          email: 'sganderton2@tuttocitta.it',
          city: 'Golcowa',
          start_date: '03/24/2018',
          salary: '$13076.28',
          age: '66',
          experience: '6 Years',
          status: 5,
        },
        {
          id: 4,
          avatar: require('@/assets/images/avatars/3-small.png'),
          full_name: 'Dorolice Crossman',
          post: 'Cost Accountant',
          email: 'dcrossman3@google.co.jp',
          city: 'Paquera',
          start_date: '12/03/2017',
          salary: '$12336.17',
          age: '22',
          experience: '2 Years',
          status: 2,
        },
        {
          id: 5,
          avatar: require('@/assets/images/avatars/4-small.png'),
          full_name: 'Harmonia Nisius',
          post: 'Senior Cost Accountant',
          email: 'hnisius4@gnu.org',
          city: 'Lucan',
          start_date: '08/25/2017',
          salary: '$10909.52',
          age: '33',
          experience: '3 Years',
          status: 2,
        },
        {
          id: 6,
          avatar: require('@/assets/images/avatars/5-small.png'),
          full_name: 'Genevra Honeywood',
          post: 'Geologist',
          email: 'ghoneywood5@narod.ru',
          city: 'Maofan',
          start_date: '06/01/2017',
          salary: '$17803.80',
          age: '61',
          experience: '1 Year',
          status: 1,
        },
        {
          id: 7,
          avatar: require('@/assets/images/avatars/7-small.png'),
          full_name: 'Eileen Diehn',
          post: 'Environmental Specialist',
          email: 'ediehn6@163.com',
          city: 'Lampuyang',
          start_date: '10/15/2017',
          salary: '$18991.67',
          age: '59',
          experience: '9 Years',
          status: 3,
        },
        {
          id: 8,
          avatar: require('@/assets/images/avatars/9-small.png'),
          full_name: 'Richardo Aldren',
          post: 'Senior Sales Associate',
          email: 'raldren7@mtv.com',
          city: 'Skoghall',
          start_date: '11/05/2016',
          salary: '$19230.13',
          age: '55',
          experience: '5 Years',
          status: 3,
        },
        {
          id: 9,
          avatar: require('@/assets/images/avatars/2-small.png'),
          full_name: 'Allyson Moakler',
          post: 'Safety Technician',
          email: 'amoakler8@shareasale.com',
          city: 'Mogilany',
          start_date: '12/29/2018',
          salary: '$11677.32',
          age: '39',
          experience: '9 Years',
          status: 5,
        },
        {
          id: 10,
          avatar: require('@/assets/images/avatars/6-small.png'),
          full_name: 'Merline Penhalewick',
          post: 'Junior Executive',
          email: 'mpenhalewick9@php.net',
          city: 'Kanuma',
          start_date: '04/19/2019',
          salary: '$15939.52',
          age: '23',
          experience: '3 Years',
          status: 2,
        },
      ],
      /* eslint-disable global-require */
      status: [{
        1: 'Current',
        2: 'Professional',
        3: 'Rejected',
        4: 'Resigned',
        5: 'Applied',
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
    this.$http.get('/good-table/advanced-search')
        .then(res => {
          this.rows = res.data
        })
  },
  methods: {
    advanceSearch(val) {
      this.searchTerm = val
    },
    onRowClick(params) {
      console.log(params)
      // this.$toast({
      //   component: SidebarContent,
      //   props: {
      //     title: `Hello user! You have clicked on row ${params.row.id}`,
      //     icon: 'UserIcon',
      //     variant: 'success',
      //   },
      // })
    },
  },
}
</script>
