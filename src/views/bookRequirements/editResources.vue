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
                <b-form-input
                    id="v-title"
                    v-model="post_values.title"
                    placeholder="Title"
                />
              </b-form-group>
            </b-col>

            <div v-if="edit_cover === ''">
              <b-col cols="12">
                <b-form-group
                    label="Purchasing Order"
                    label-for="v-documents">
                  <b-form-file
                      @change="handleFileUploadCoverPhoto( $event )"
                      :placeholder="this.getCoverName()"
                      drop-placeholder="Drop file here..."
                  />
                </b-form-group>
              </b-col>
            </div>

            <div v-if="edit_cover !== ''">
              <b-col cols="12">
                <b-form-group
                    label="Rejected Reason"
                    label-for="v-description">
                  <b-form-textarea
                      id="v-description"
                      v-model="post_values.rej_reason"
                      placeholder="Rejected Reason"
                  />
                </b-form-group>
              </b-col>
            </div>

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
      id_back: '',
      doc: {
        resource_name: '',
        cover_name: ''
      },
      edit_cover: '',
      post_values: {
        author: '',
        department: '',
        title: '',
        resource: '',
        type: '',
        description: '',
        rej_reason: ''
      },
      model: {
        file: '',
        coverPhoto: '',
        resource: '',
        department: '',
        departmentOptions: ['Nursing', 'BMS', 'Psychology', 'Marketing', 'Acupuncture', 'IT', 'HR', 'Accounting'],
        type: ['Book', 'Journal', 'Magazine', 'PDF', 'Article'],
        resourceOptions: ['Thesis', 'General'],
        option: [{title: 'Square'}, {title: 'Rectangle'}, {title: 'Rombo'}, {title: 'Romboid'}],
      }
    }
  },
  setup(){
    return{
      required,
    }
  },
  created() {
    var id = this.$route.params.id
    fetch("http://localhost:8081/book/get-by-id?id="+id)
        .then(async response => {
          const data = await response.json();
          this.post_values.title = data.data.items[0].title;
          this.edit_cover = data.data.items[0].document_image;
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
          var id = this.$route.params.id

          var type = '2'

          let formData = new FormData();
          formData.append('files', this.model.coverPhoto);


          axios.create({
            baseURL: 'http://localhost:8081/book'
          }).post('/uploadMultipleFiles',
              formData, {params: {id, type}},
              {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              }
          ).then(function () {
            window.location.reload();
          })
              .catch(function () {
                console.log('FAILURE!!');
              });
        }
      })
    },
    getCoverName() {
      return this.edit_cover
    },
    handleFileUploadCoverPhoto(event) {
      this.model.coverPhoto = event.target.files[0];
    }
  },
}

</script>

<style scoped>

</style>
