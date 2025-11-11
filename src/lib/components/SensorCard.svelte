<script>
  export let title;
  export let value;
  export let unit = '';
  export let type = ''; // "rain", "light", "position"

  // Tentukan icon dan warna berdasarkan jenis sensor
  let icon = '📟';
  let bg = 'bg-white';

  $: {
    if (type === 'rain') {
      icon = value === 'Hujan' ? '🌧️' : '☀️';
      bg = value === 'Hujan' ? 'bg-red-100' : 'bg-green-100';
    }

    if (type === 'light') {
      icon = value === 'Gelap' ? '🌙' : '🔆';
      bg = value === 'Gelap' ? 'bg-indigo-100' : 'bg-yellow-100';
    }

    if (type === 'position') {
      icon = value === 'Terbuka' ? '📤' : '📥';
      bg = value === 'Terbuka' ? 'bg-blue-100' : 'bg-gray-200';
    }
  }
</script>

<div class="{bg} shadow-lg rounded-2xl p-6 text-center transition transform hover:scale-105">
  <div class="text-4xl mb-2">{icon}</div>
  <h3 class="text-lg font-semibold">{title}</h3>
  <p class="text-3xl font-bold mt-2">{value} {unit}</p>
</div>
