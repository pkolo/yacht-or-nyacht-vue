<template>
  <div class="request-container" v-bind:class="{ rated: rated }">
    <div class="request-header">
      <div>
        {{request.artist}} - {{request.title}}
      </div>

      <div>
        <input type="checkbox" checked="checked" v-model="rated" @click="updateRequest()">
      </div>
    </div>

    <div class="request-content">
      <div style="margin-bottom: 10px;">
        Submitted by <b>{{request.name}}</b> on {{request.created_at | moment("MMMM Do, YYYY")}}
      </div>

      <div class="request-message">
        <span style="white-space: pre-wrap;">{{request.message}}</span>
      </div>

      <div v-if="request.link">
        <span style="font-weight: 600;">Link: </span> <a :href="request.link" target="_blank">{{request.link}}</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      request: {}
    },
    data: function () {
      return {
        rated: this.request.rated_at,
        errors: []
      }
    },
    methods: {
      updateRequest () {
        var ratedAt = this.rated ? new Date() : null

        this.$emit('update', this.request.id, ratedAt)
      }
    }
  }
</script>

<style>
.request-container {
  max-width: 600px;
  padding: 20px;
  border: 1px solid #444;
  border-radius: 5px;
  margin-bottom: 20px;
}

.request-header {
  display: grid;
  font-size: 20px;
  font-weight: 600;
  padding-bottom: 10px;
  border-bottom: 1px solid #444;
  grid-template-columns: 1fr 30px;
}

.request-content {
  padding-top: 10px;
  font-size: 13px;
  font-weight: 400;
}

.request-message {
  font-style: italic;
  margin-bottom:10px;
  color: #888;
}

.rated {
  background-color: #fffee8
}
</style>
