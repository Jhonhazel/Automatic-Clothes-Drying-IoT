<script>
  export let mode = 'auto';
  export let onToggleMode;
  export let onOpen;
  export let onClose;
</script>

<div class="bg-white shadow rounded-2xl p-4 text-center space-y-3">
  <h3 class="font-semibold text-lg">Kontrol Jemuran</h3>
  
  <p class="text-gray-600">Mode: <strong>{mode === 'auto' ? 'Otomatis' : 'Manual'}</strong></p>

  <button 
    class="px-4 py-2 bg-blue-500 text-white rounded-xl"
    on:click={onToggleMode}>
    Ubah ke {mode === 'auto' ? 'Manual' : 'Otomatis'}
  </button>

  {#if mode === 'manual'}
    <div class="flex justify-center gap-4 mt-3">
      <button class="px-4 py-2 bg-green-500 text-white rounded-xl" on:click={onOpen}>Buka</button>
      <button class="px-4 py-2 bg-red-500 text-white rounded-xl" on:click={onClose}>Tutup</button>
    </div>
  {/if}
</div>