<template>
  <div class="song-list-filter">
    <input placeholder="Search by artist or title..." ref="input" :value="value" v-on:input="updateFilter($event.target.value)"/>
  </div>
</template>

<script>
  export default {
    props: {
      value: String
    },
    methods: {
      updateFilter (newValue) {
        this.$emit('input', newValue)
      }
    }
  }
</script>

<style>
  .song-list-filter {
    padding-bottom: 15px;
  }

  .song-list-filter > input {
    width: 100%;
    height: 2em;
    text-align: center;
    font-family: "Lato", sans-serif;
    font-size: 1.5em;
    color: #444;
    padding: 10px;
  }

  .song-list-filter > input::-webkit-input-placeholder {
    color: #ababab;
  }

  @media (max-width: 768px) {
    .song-list-filter > input {
      width: 100%;
      font-size: 1.15em;
      color: #444;
      padding: 10px;
    }
  }
</style>
