<script>
    import { onMount } from 'svelte';
  
    let profiles = [];
  
    onMount(async () => {
      try {
        const response = await fetch('https://randomuser.me/api/?results=10');
        const data = await response.json();
  
        profiles = data.results.map((user) => ({
          name: `${user.name.first} ${user.name.last}`,
          picture: user.picture.large
        }));
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    });
  
    function showAlert(name) {
      alert(`Hello, ${name}!`);
    }
  </script>
  
  <style>
    .profile-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 20px;
      margin-top: 20px;
    }
  
    .profile-card {
      width: 200px;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      text-align: center;
    }
  
    .profile-card img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      object-fit: cover;
      margin-bottom: 10px;
    }
  
    .profile-card h3 {
      font-size: 16px;
      margin-bottom: 5px;
    }
  </style>
  
  <div class="profile-container">
    {#each profiles as profile}
      <div class="profile-card">
        <img src={profile.picture} alt="Profile Picture" />
        <h3>{profile.name}</h3>
        <button on:click={() => showAlert(profile.name)}>Show Name</button>
      </div>
    {/each}
  </div>
  