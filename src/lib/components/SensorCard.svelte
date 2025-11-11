<script>
  export let title;
  export let value;
  export let unit = '';
</script>

<div class="bg-white shadow rounded-2xl p-4 text-center">
  <h3 class="text-lg font-semibold">{title}</h3>
  <p class="text-2xl font-bold mt-2">{value} {unit}</p>
</div>
