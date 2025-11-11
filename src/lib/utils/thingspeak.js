// thingspeak.js
// === Telemetri (channel lama) ===
const TELE_CHANNEL_ID = '3146846';
const TELE_READ_API_KEY = 'GXCBTZ3E5CZXIOJP';

// === Kontrol (channel baru) ===
const CTRL_CHANNEL_ID = '3156043';
const CTRL_READ_API_KEY = 'L7C5R986HFM4N0P4';
const CTRL_WRITE_API_KEY = '9MMMMC9MXBJYXZHW';

// Ambil data terakhir (gabung telemetri + kontrol)
export async function getLatestData() {
  const teleUrl = `https://api.thingspeak.com/channels/${TELE_CHANNEL_ID}/feeds/last.json?api_key=${TELE_READ_API_KEY}`;
  const ctrlUrl = `https://api.thingspeak.com/channels/${CTRL_CHANNEL_ID}/feeds/last.json?api_key=${CTRL_READ_API_KEY}`;

  const [teleRes, ctrlRes] = await Promise.all([fetch(teleUrl), fetch(ctrlUrl)]);
  if (!teleRes.ok) throw new Error('Gagal ambil telemetri ThingSpeak');
  if (!ctrlRes.ok) throw new Error('Gagal ambil kontrol ThingSpeak');

  const t = await teleRes.json();
  const c = await ctrlRes.json();

  const hujanDO = parseInt(t.field1); // 0=basah, 1=kering
  const cahayaDO = parseInt(t.field2); // 0=terang, 1=gelap
  const servoPos = parseInt(t.field3); // sudut servo (misal 10 atau 110)

  const hujan = hujanDO === 0 ? 'Basah' : 'Kering';
  const cahaya = cahayaDO === 0 ? 'Terang' : 'Gelap';

  // Tampilkan posisi berdasar sudut yang dikirim Arduino
  const posisi = !isNaN(servoPos) && servoPos <= 60 ? 'Terbuka' : 'Tertutup';

  const modeAuto = c.field1 === '1';      // dari channel kontrol
  const perintahManual = c.field2 === '1' ? 'buka' : 'tutup';

  return { hujan, cahaya, posisi, modeAuto, perintahManual };
}

// Kirim perintah manual / mode ke channel kontrol
export async function sendCommand({ mode, command }) {
  // mode: 'auto' | 'manual'
  // command: 'buka' | 'tutup' | null
  const modeValue = mode === 'auto' ? 1 : 0;

  let params = `field1=${modeValue}`;
  if (typeof command === 'string') {
    const f2 = command === 'buka' ? 1 : 0;
    params += `&field2=${f2}`;
  }

  const url = `https://api.thingspeak.com/update?api_key=${CTRL_WRITE_API_KEY}&${params}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Gagal kirim perintah ke ThingSpeak');
  return await res.text();
}