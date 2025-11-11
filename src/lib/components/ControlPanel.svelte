<script>
  export let mode = 'auto';
  export let onToggleMode;
  export let onOpen;
  export let onClose;
</script>

<div class="bg-white shadow-xl rounded-2xl p-6 text-center space-y-5 border border-gray-200">
  <h3 class="font-semibold text-xl mb-2">🔧 Kontrol Jemuran</h3>

  <!-- Toggle Switch Modern -->
  <div class="flex items-center justify-center gap-3">
    <span class={mode === 'auto' ? 'font-bold' : 'text-gray-400'}>Auto</span>

    <label class="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" class="sr-only peer" checked={mode === 'manual'} on:change={onToggleMode} />
      <div class="w-14 h-7 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-500 transition-all"></div>
      <div class="absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-all peer-checked:translate-x-7"></div>
    </label>

    <span class={mode === 'manual' ? 'font-bold' : 'text-gray-400'}>Manual</span>
  </div>

  <!-- Tombol manual -->
  {#if mode === 'manual'}
  <div class="flex justify-center gap-4 mt-4">
    <button class="px-5 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl shadow">
      Buka
    </button>
    <button class="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow" on:click={onClose}>
      Tutup
    </button>
  </div>
  {/if}
</div>
