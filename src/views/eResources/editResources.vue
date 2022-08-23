<template>
  <div>
    <b-card>
      <validation-observer ref="simpleRules">
        <b-form>
          <b-row>
            <!-- Title -->
            <b-col cols="12">
              <b-form-group
                  label="Title"
                  label-for="v-title"
              >
                <validation-provider
                    #default="{ errors }"
                    name="Title"
                    rules="required"
                >
                  <b-form-input
                      id="v-title"
                      v-model="post_values.title"
                      placeholder="Title"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- Department -->
            <b-col cols="12">
              <b-form-group
                  label="Department"
                  label-for="v-department"
              >
                <v-select
                    v-model="post_values.department"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :options="model.departmentOptions"
                    placeholder="Please select"
                />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group
                  label="Type"
                  label-for="v-type"
              >
                <validation-provider
                    #default="{ errors }"
                    name="Type"
                    rules="required"
                >
                  <v-select
                      v-model="post_values.type"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      :options="model.type"
                      placeholder="Please select"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>

              </b-form-group>
            </b-col>

            <!-- Resource -->
            <b-col cols="12">
              <b-form-group
                  label="Resource"
                  label-for="v-resource"
              >
                <validation-provider
                    #default="{ errors }"
                    name="Resource"
                    rules="required"
                >
                  <v-select
                      v-model="post_values.resource"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      :options="model.resourceOptions"
                      placeholder="Please select"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- Author -->
            <b-col cols="12">
              <b-form-group
                  label="Author"
                  label-for="v-author"
              >
                <validation-provider
                    #default="{ errors }"
                    name="Author"
                    rules="required"
                >
                  <b-form-input
                      id="v-author"
                      v-model="post_values.author"
                      placeholder="Author"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>

              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group
                  label="Description"
                  label-for="v-description"
              >
                <b-form-textarea
                    id="v-description"
                    v-model="post_values.description"
                    placeholder="Description"
                />
              </b-form-group>
            </b-col>

            <!-- submit and reset -->
            <b-col cols="12">
              <b-button
                  class="mr-1"
                  size="sm"
                  type="submit"
                  variant="primary"
                  @click.prevent="validationForm"
              >
                Submit
              </b-button>
              <b-button
                  size="sm"
                  type="reset"
                  variant="outline-secondary"
              >
                Reset
              </b-button>
            </b-col>
          </b-row>
        </b-form>
      </validation-observer>

    </b-card>

  </div>
</template>

<script>
import vSelect from 'vue-select'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { required } from '@validations'
import {
  BAvatar,
  BButton,
  BCard,
  BCardText,
  BForm,
  BFormCheckbox,
  BFormFile,
  BFormGroup,
  BFormInput,
  BFormTextarea,
  BListGroup,
  BListGroupItem,
} from 'bootstrap-vue'
import axios from 'axios'
/* eslint-disable */
export default {
  name: 'createResources',
  components: {
    BAvatar,
    ValidationProvider,
    ValidationObserver,
    BFormTextarea,
    BButton,
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    BForm,
    BFormFile,
    BListGroup,
    BListGroupItem,
    BCardText,
    BCard,
    vSelect,
  },
  /* eslint-disable */
  data() {
    return {
      file: '',
      id_back: '',
      doc: {
        resource_name: '',
        cover_name: ''
      },
      post_values: {
        author: '',
        department: '',
        title: '',
        resource: '',
        type: '',
        description: ''
      },
      items: [

      ],
      model: {
        file: '',
        coverPhoto: '',
        resource: '',
        department: '',
        departmentOptions: ['Nursing', 'BMS', 'Psychology', 'Marketing', 'Acupuncture', 'IT', 'HR', 'Accounting'],
        type: ['Book', 'Journal', 'Magazine', 'PDF', 'Article'],
        resourceOptions: ['Thesis', 'General'],
        option: [{ title: 'Square' }, { title: 'Rectangle' }, { title: 'Rombo' }, { title: 'Romboid' }],
      }
    }
  },
  setup(){
    return{
      required,
    }
  },
  created() {
    var id_val = this.$route.params.resources_id
    fetch("http://localhost:8081/resource/get-by-id?id="+id_val)
        .then(async response => {
          const data = await response.json();
          this.post_values.title = data.data.items[0].title;
          this.post_values.department = data.data.items[0].department;
          this.post_values.type = data.data.items[0].type;
          this.post_values.resource = data.data.items[0].resource;
          this.post_values.author = data.data.items[0].author;
          this.post_values.description = data.data.items[0].description;
          this.totalRows = data.data.total;
        })
        .catch(error => {
          this.errorMessage = error;
          console.error("There was an error!", error);
        })
  },
  methods: {
    validationForm() {
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          var new_id = this.$route.params.resources_id
          axios.post('http://localhost:8081/resource/update-eresource',
              this.post_values,{ params: { new_id } })
              .then(response => {

                this.$router.go(-1)

              })
        }
      })
    },
  },
}

</script>

<style scoped>

</style>
