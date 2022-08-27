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

            <b-col cols="12">
              <b-form-group
                  label="Documents"
                  label-for="v-documents"
              >
                <b-form-file

                    @change="handleFileUpload( $event )"
                    :placeholder="this.getDocumentName()"
                    drop-placeholder="Drop file here..."
                />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group
                  label="Cover Photo"
                  label-for="v-documents"
              >
                <b-form-file
                    @change="handleFileUploadCoverPhoto( $event )"
                    :placeholder="this.getCoverName()"
                    drop-placeholder="Drop file here..."
                />
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
      post_values: {
        title: '',
        url: '',
        description: ''
      },
      model: {
        file: '',
        coverPhoto: '',
        resource: '',
        department: ''
      }
    }
  },
  setup() {
    return {
      required,
    }
  },
  methods: {
    validationForm() {
      this.$refs.simpleRules.validate()
          .then(success => {
            if (success) {
              this.submit()
            }
          })
    },
    submit() {

      if (!(this.title === 'Edit')) {
        axios.post('http://13.232.138.190:8081/document/save-eresource',
            this.post_values)
            .then(response => {

              this.submitFile(response)

            })
      } else {

        var new_id = this.id

        axios.post('http://13.232.138.190:8081/document/update-eresource',
            this.post_values, { params: { new_id } })
            .then(response => {
              window.location.reload()
            })
      }

    },
    getResourceName() {
      return this.edit_document
    },
    getCoverName() {
      return this.edit_cover
    },
    getDocumentName() {
      return this.edit_document
    },
    handleFileUpload(event) {
      this.model.file = event.target.files[0]
    },
    handleFileUploadCoverPhoto(event) {
      this.model.coverPhoto = event.target.files[0]
    },

    submitFile(response) {

      var id = response.data.id

      let formData = new FormData()
      formData.append('files', this.model.file)
      formData.append('cover', this.model.coverPhoto)

      axios.create({
        baseURL: 'http://13.232.138.190:8081/document'
      })
          .post('/uploadMultipleFiles',
              formData, { params: { id } },
              {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              }
          )
          .then(response => {
            this.$router.go(-1)
          })
          .catch(function () {
            console.log('FAILURE!!')
          })
    }
  },
}

</script>

<style scoped>

</style>
