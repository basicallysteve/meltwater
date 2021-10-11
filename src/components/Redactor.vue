<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <label for="document-text">Document Text</label>
        <b-form-textarea name="document-text" v-model="text" rows="5"/>
      </b-col>
      
    </b-row>
    <b-row class="mt-4">
      <b-col>
        <label for="redacted-text">Redacted Text</label>
        <div name="redacted-text">
          {{ redactedText }}</div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  computed: {
    redactedText(){
      return this.phrases.reduce((text, currentValue)=>{
        let redactedChar = "X"
        return text.replace(new RegExp(`\\b(${currentValue})\\b`, 'ig'), `${redactedChar.repeat(4)}`)
      }, this.text);
    }
  },
  data(){
    return {
      text: ''
    }
  },
  props: {
    phrases: {
      type: Array,
      default(){
        return []
      },      
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
