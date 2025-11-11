<script>
  import SensorCard from './SensorCard.svelte';
  import ControlPanel from './ControlPanel.svelte';
  import { getLatestData, sendCommand } from '../utils/thingspeak.js';

  let hujan = '-';
  let cahaya = '-';
  let posisi = '-';
  let mode = 'auto';

  async function fetchData() {
    try {
      const data = await getLatestData();
      hujan = data.hujan;
      cahaya = data.cahaya;
      posisi = data.posisi;
      mode = data.modeAuto ? 'auto' : 'manual';
    } catch (e) {
      console.error(e);
    }
  }

  fetchData();
  const interval = setInterval(fetchData, 15000);

  async function toggleMode() {
    mode = mode === 'auto' ? 'manual' : 'auto';
    try {
      await sendCommand({ mode, command: null });
      console.log(`Mode diubah ke ${mode}`);
    } catch (e) {
      console.error(e);
    }
  }

  async function openJemuran() {
    try {
      await sendCommand({ mode: 'manual', command: 'buka' });
      mode = 'manual';
      alert('Perintah buka jemuran dikirim ✅');
    } catch (e) {
      console.error(e);
      alert('Gagal kirim perintah buka!');
    }
  }

  async function closeJemuran() {
    try {
      await sendCommand({ mode: 'manual', command: 'tutup' });
      mode = 'manual';
      alert('Perintah tutup jemuran dikirim ✅');
    } catch (e) {
      console.error(e);
      alert('Gagal kirim perintah tutup!');
    }
  }
</script>

<div class="min-h-screen bg-gray-100 p-8">
  <h1 class="text-3xl font-bold text-center mb-8">🌤 Dashboard Jemuran Otomatis</h1>

  <div class="grid md:grid-cols-3 gap-6 mb-6">
    <SensorCard title="Sensor Hujan" value={hujan} />
    <SensorCard title="Sensor Cahaya" value={cahaya} />
    <SensorCard title="Posisi Jemuran" value={posisi} />
  </div>

  <ControlPanel 
    {mode}
    onToggleMode={toggleMode}
    onOpen={openJemuran}
    onClose={closeJemuran}
  />
</div>