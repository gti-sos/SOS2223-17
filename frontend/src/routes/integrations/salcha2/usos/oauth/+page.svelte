<script>
    function handleFacebookLogin() {
      window.location.href = '/auth/facebook';
    }
  </script>
  
  <button on:click={handleFacebookLogin}>Iniciar sesión con Facebook</button>
  