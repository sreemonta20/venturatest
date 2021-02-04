<template>
  <section class="section">
    <div class="container">
      <h2 class="title">My Profile</h2>

      <div class="content">
        <div style="float: left">
          <p>
            <strong>User ID:</strong>
            {{ loggedInUser.user.id }}
          </p>
          <p>
            <strong>Username:</strong>
            {{ loggedInUser.user.username }}
          </p>
          <p>
            <strong>Role:</strong>
            {{ loggedInUser.user.role }}
          </p>
          <p>
            <strong>Followed Count:</strong>
            {{ loggedInUser.followed.count }}
          </p>
          <p>
            <strong>Follow Count:</strong>
            {{ loggedInUser.follow.count }}
          </p>
        </div>
        <div style="float: right">
          <p>
            <strong>User ID:</strong>
            {{ loggedInUser.user.id }}
          </p>
          <p>
            <strong>Username:</strong>
            {{ loggedInUser.user.username }}
          </p>
          <p>
            <strong>Role:</strong>
            {{ loggedInUser.user.role }}
            <!-- {{ userToken }} -->
          </p>
          <!-- <a class="navbar-item" @click="testdata">Click to test</a> -->
          <!-- {{ data }} -->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  middleware: "auth",

  computed: {
    ...mapGetters(["loggedInUser", "userToken"]),
  },
  // methods: {
  //   testdata(){
  //     debugger
  //     console.log(this.$store.state.auth.user.token);
  //   }
  // },
  created() {
    this.$store.dispatch("retrieveuser");
  },
};
</script>
