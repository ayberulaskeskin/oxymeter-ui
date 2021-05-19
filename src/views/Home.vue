<template>
  <div class="home">
    <RecordList v-if="currentUser.Role == 'client'" />
    <AdminPage v-else-if="currentUser.Role == 'admin'" />>
  </div>
</template>

<script>
// @ is an alias to /src
import RecordList from '@/components/RecordList.vue'
import AdminPage from '@/components/AdminPage.vue'
import {mapState} from "vuex";

export default {
  name: 'Home',
  components: {
    RecordList,
    AdminPage
  },
  computed:{
    ...mapState("auth",["currentUser"]),
  }
}
</script>
