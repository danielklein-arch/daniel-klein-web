<template>
  <section
    id="about"
    class="py-24 sm:py-32">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <!-- Left: Text -->
        <div v-reveal>
          <p class="text-[0.72rem] font-medium tracking-[0.2em] uppercase text-(--dk-dim) mb-3">
            <span class="text-(--dk-accent)">01</span> <span class="opacity-60">//</span> O mně
          </p>
          <h2 class="text-2xl sm:text-3xl font-semibold tracking-tight text-(--dk-ink) mb-6 leading-snug">
            Technologie, které dávají <span class="text-(--dk-accent)">smysl</span>
          </h2>
          <div class="space-y-4 text-sm text-(--dk-dim) leading-relaxed max-w-xl">
            <p>
              Jsem Daniel Klein, IT specialista se zaměřením na vývoj webových aplikací, správu infrastruktury a IT konzultace. Věřím, že technologie by měly být jednoduché, spolehlivé a efektivní.
            </p>
            <p>
              Mám zkušenosti s celým spektrem IT — od frontendového vývoje přes backend a databáze až po serverovou infrastrukturu. Každý projekt beru jako příležitost dodat řešení, které skutečně funguje.
            </p>
          </div>
        </div>

        <!-- Right: Terminal panel -->
        <div v-reveal="{ delay: 150 }">
          <div class="panel panel--accent p-7">
            <!-- Terminal header -->
            <div class="flex items-center gap-2.5 mb-6 pb-4 border-b border-(--dk-line)">
              <span class="dot text-(--dk-ok)"/>
              <span class="text-xs text-(--dk-dim)">daniel@klein:~</span>
            </div>

            <!-- Code block -->
            <div class="text-[0.82rem] space-y-2">
              <p><span class="text-(--dk-plan)">const</span> <span class="text-(--dk-ink)">developer</span> = {</p>
              <p class="pl-4">
                <span class="text-(--dk-ok)">name</span>: <span class="text-(--dk-warn)">'Daniel Klein'</span>,
              </p>
              <p class="pl-4">
                <span class="text-(--dk-ok)">role</span>: <span class="text-(--dk-warn)">'IT Specialist'</span>,
              </p>
              <p class="pl-4">
                <span class="text-(--dk-ok)">email</span>: <span class="text-(--dk-warn)">'daniel@kleindaniel.com'</span>,
              </p>
              <p class="pl-4">
                <span class="text-(--dk-ok)">available</span>: <span class="text-(--dk-plan)">true</span>,
              </p>
              <p class="pl-4">
                <span class="text-(--dk-ok)">kombucha</span>: <span class="text-(--dk-warn)">'always'</span>
              </p>
              <p>}<span class="dk-cursor-blink text-(--dk-accent)">_</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
