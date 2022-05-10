<template>
  <div>
    <!-- <div id="google-sign-in-button"></div> -->
    <!-- <div id="g_id_onload"
         data-client_id="33908706992-teg5s93h9lumfkti87u2bfosa01h9l8f.apps.googleusercontent.com"
         data-auto_prompt="false">
    </div> -->
    <div class="g_id_signin"
        id="g_id_signin">
    </div>
  </div>
</template>

<script>
import jwt from 'jwt-decode';
import jwtDecode from 'jwt-decode';
import { decode } from 'punycode';
import { mapActions } from 'vuex';

export default {
  name: 'GoogleSignInButton',
  props: {
    width: {
      type: String,
      default: null
    },
    height: {
      type: String,
      default: null
    }
  },
  mounted() {
    console.log(window.google);
    const vm = this;
    const googleScript = document.createElement('script');
    googleScript.setAttribute('src', 'https://accounts.google.com/gsi/client');
    document.head.appendChild(googleScript);
    googleScript.onload = () => {
      google.accounts.id.initialize({
        client_id: "178111544432-piqsosiptv4ub4kt5tu5p37lp0mof02d.apps.googleusercontent.com",
        callback: function(u) {
          console.log(u);
          const data = { jwt: u.credential };
          vm.$http.post('https://apiedu.drmaster.mypeoplevol.com/OAuth/Google', data, {
            headers: {
              'Accept': '*/*',
              'Content-Type': 'application/json'
            },
          }).then((res) => {
            console.log(res.data.data);
            let decoded = jwtDecode(res.data.data.jwtToken);
            decoded = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYnB1ZDUwMTIyQGdtYWlsLmNvbSIsIm5hbWVpZCI6ImUwNWJhZmI5LWFlMjctNDhhNi1hN2UyLWJlODE3ZTQzYWZiMSIsIkF2YXRhciI6Ik5vdFNldCIsIkxvZ2luUHJvdmlkZXIiOiJnb29nbGUiLCJuYmYiOjE2NTE4MTY1MDMsImV4cCI6MTY1MTkwMjkwMywiaWF0IjoxNjUxODE2NTAzfQ.WSUUtJ36iKmNeVJoAvjnAgUSy2KUOOFQIfyd0C1aeTY';
            console.log(decoded);
            vm.$store.dispatch('getUser', decoded);
            vm.$store.dispatch('getUserAuth', res.data.data.jwtToken);
            vm.$router.push('/');
          }).catch(err => {
            console.log(err.response);
          })
        },
      });
      google.accounts.id.renderButton(document.getElementById("g_id_signin"), {
        type: 'standard',
        size: 'large',
        theme: 'outline',
        text: 'Sign in with',
        shape: 'rectangular',
        logo_alignment: 'left',
        login_uri: 'http://localhost:8080/login',
        callback: function(u) {
          console.log(u);
        },
      })
    }
  },
  methods: {
    signIn(googleUser) {
      console.log(googleUser);
      // const id_token = googleUser.getAuthResponse().id_token;
      // const profile = googleUser.getBasicProfile();
      // const name = profile.getName();
      // console.log('Name', googleUser.getBasicProfile().getName())
      // this.$emit('sign-in', { id_token, name });
    
    }
  },
  created() {
    
  },
};
// https://accounts.google.com/o/oauth2/auth?redirect_uri=storagerelay%3A%2F%2Fhttps%2Fhuai-sian.github.io%3Fid%3Dauth891137&response_type=permission%20id_token&scope=email%20profile%20openid&openid.realm=&include_granted_scopes=true&client_id=282789078464-1efvjomt8lteont9btgp60gjo65mvebt.apps.googleusercontent.com&ss_domain=https%3A%2F%2Fhuai-sian.github.io&fetch_basic_profile=true&gsiwebsdk=2
</script>

