<template>
  <div id="app">
    <b-container fluid>
        <b-row>
          <b-col>
            <label for="redacted-phrases">Type and press enter to redact a new phrase</label>
            <b-form-tags input-id="redacted-phrases" v-model="phrases" :tag-validator="validatePhrase" tag-pills></b-form-tags>

          </b-col>
        </b-row>
      </b-container>
    <redactor class="mt-4" :phrases="formattedPhrases"/>
  </div>
</template>

<script>
import Redactor from './components/Redactor.vue'

export default {
  name: 'App',
  components: {
    Redactor
  },
  computed: {
    formattedPhrases(){
      return this.phrases.map(phrase => phrase.replace(/("|')/g, ""))
    }
  },
  data(){
    return {
      phrases: []
    }
  },
  methods: {
    validatePhrase(phrase){
      let phraseExists = this.phrases.some(existingPhrase => existingPhrase.toLowerCase().includes(phrase.toLowerCase()));
      if(phraseExists) return false;

      if(phrase.length == 1) return false;
      return true;
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.b-form-tag {
  background: #D34848;
  & .b-form-tag-remove {
    background: #D34848;
    border: none;
  }
}

output, [role=status]{
  display: none !important;
}
</style>
