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
      await sendCommand({ mode, command: null });
    }

    async function openJemuran() {
      await sendCommand({ mode: 'manual', command: 'buka' });
      mode = 'manual';
    }

    async function closeJemuran() {
      await sendCommand({ mode: 'manual', command: 'tutup' });
      mode = 'manual';
    }
  </script>

  <div class="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-10">
    <h1 class="text-4xl font-bold text-center mb-10 flex items-center justify-center gap-2">
      🌤️ <span>Dashboard Jemuran Otomatis</span>
    </h1>

    <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      <SensorCard title="Sensor Hujan" value={hujan} type="rain" />
      <SensorCard title="Sensor Cahaya" value={cahaya} type="light" />
      <SensorCard title="Posisi Jemuran" value={posisi} type="position" />
    </div>

    <div class="mt-10 max-w-3xl mx-auto">
      <ControlPanel 
        {mode}
        onToggleMode={toggleMode}
        onOpen={openJemuran}
        onClose={closeJemuran}
      />
    </div>
  </div>
