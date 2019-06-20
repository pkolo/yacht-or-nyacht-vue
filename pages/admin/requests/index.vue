<template>
  <div class="admin-list-container">
    <div class="admin-content-header">
      <div>
        Yachtski Requests
      </div>

      <div style="font-size: 16px;">
        <span class="filter-link" v-bind:class="{ selected: activeFilter === 'new' }" @click="switchFilter(0)">New Requests</span>
        <span class="filter-link" v-bind:class="{ selected: activeFilter === 'rated' }" @click="switchFilter(1)">Rated Requests</span>
      </div>
    </div>

    <div v-for="request in requests" v-show="isActive(request)">
      <song-request :request="request" v-on:update="updateRequest"/>
    </div>

    <div style="font-style: italic; color: #888;" v-show="noActive()">
      There are no {{activeFilter}} requests right now.
    </div>
  </div>
</template>

<script>
  import axios from '~/plugins/axios'

  import SongRequest from '../../../components/SongRequest'

  export default {
    layout: 'admin',
    head () {
      return {
        title: `Yachstki Requests`
      }
    },
    components: { SongRequest },
    asyncData () {
      return axios.get(`/song_requests`)
        .then((res) => {
          console.log(res)
          return {
            requests: res.data
          }
        })
    },
    data: function () {
      return {
        activeFilter: 'new',
        filters: ['new', 'rated']
      }
    },
    methods: {
      switchFilter (index) {
        this.activeFilter = this.filters[index]
      },
      isActive (request) {
        if (this.activeFilter === 'new') {
          return !request.rated_at
        } else if (this.activeFilter === 'rated') {
          return request.rated_at
        }
      },
      noActive () {
        if (this.activeFilter === 'new') {
          return this.requests.filter(function (request) { return request.rated_at }).length === this.requests.length
        } else if (this.activeFilter === 'rated') {
          return this.requests.filter(function (request) { return !request.rated_at }).length === this.requests.length
        }
      },
      updateRequest (requestId, ratedAt) {
        axios({
          method: 'put',
          url: `/song_requests/${requestId}`,
          data: {
            song_request: {
              rated_at: ratedAt
            }
          },
          headers: {'Authorization': `Token token=${window.localStorage.getItem('yonToken')}`}
        })
          .catch(error => {
            this.errors = error.response.data.errors
          })
          .then(res => {
            if (!res.data.rated_at) {
              this.requests.map(function (item) {
                if (item.id === res.data.id) {
                  item.rated_at = res.data.rated_at
                }
              })
            }
          })
      }
    }
  }
</script>

<style>
.filter-link {
  margin-right: 10px;
  color: #888;
  font-size: 13px;
  text-decoration: none;
}

.filter-link:hover {
  text-decoration: underline;
  cursor: pointer;
}

.filter-link.selected {
  color: rgb(87,187,138);
  border-bottom: 2px solid rgb(87,187,138);
  cursor: default;
}

.filter-link.selected:hover {
  text-decoration: none;
}

</style>
