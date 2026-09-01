<script setup lang="ts">
const form = reactive({
  name: '',
  email: '',
  message: '',
})

const submitted = ref(false)

function handleSubmit() {
  // TODO: napojit na backend/email service
  submitted.value = true
  setTimeout(() => {
    submitted.value = false
    form.name = ''
    form.email = ''
    form.message = ''
  }, 3000)
}

const contactInfo = [
  { icon: 'i-lucide-mail', label: 'Email', value: 'daniel@kleindaniel.com', href: 'mailto:daniel@kleindaniel.com' },
  { icon: 'i-lucide-map-pin', label: 'Lokace', value: 'Česká republika', href: null },
  { icon: 'i-lucide-clock', label: 'Dostupnost', value: 'Po—Pá, 9:00—18:00', href: null },
]
</script>

<template>
  <section
    id="contact"
    class="py-24 sm:py-32">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading
        index="04"
        label="Kontakt"
        title="Pojďme spolupracovat"
        description="Máte projekt nebo nápad? Napište mi a probereme to."/>

      <div class="grid lg:grid-cols-5 gap-10">
        <!-- Contact info -->
        <div
          v-reveal
          class="lg:col-span-2 flex flex-col gap-6">
          <div
            v-for="info in contactInfo"
            :key="info.label"
            class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-[4px] bg-(--dk-panel-hover) border border-(--dk-line) flex items-center justify-center shrink-0">
              <UIcon
                :name="info.icon"
                class="w-4.5 h-4.5 text-(--dk-accent)"/>
            </div>
            <div>
              <p class="text-[0.66rem] font-medium text-(--dk-dim) tracking-[0.14em] uppercase mb-1">
                {{ info.label }}
              </p>
              <component
                :is="info.href ? 'a' : 'p'"
                :href="info.href || undefined"
                :class="[
                  'text-sm font-medium',
                  info.href
                    ? 'text-(--dk-accent) hover:underline'
                    : 'text-(--dk-ink)',
                ]">
                {{ info.value }}
              </component>
            </div>
          </div>

          <!-- CTA panel -->
          <div class="panel panel--accent mt-auto p-6">
            <h3 class="text-sm font-semibold text-(--dk-ink) mb-2">
              Rychlá konzultace zdarma
            </h3>
            <p class="text-[0.82rem] text-(--dk-dim) leading-relaxed">
              Nevíte, jestli potřebujete nový web nebo stačí vylepšit stávající? Ozvěte se — poradím nezávazně.
            </p>
          </div>
        </div>

        <!-- Form -->
        <div
          v-reveal="{ delay: 150 }"
          class="lg:col-span-3">
          <form
            class="panel p-7 sm:p-8 space-y-6"
            @submit.prevent="handleSubmit">
            <div class="grid sm:grid-cols-2 gap-6">
              <UFormField
                label="Jméno"
                required>
                <UInput
                  v-model="form.name"
                  placeholder="Vaše jméno"
                  size="lg"
                  class="w-full"/>
              </UFormField>
              <UFormField
                label="Email"
                required>
                <UInput
                  v-model="form.email"
                  type="email"
                  placeholder="vas@email.cz"
                  size="lg"
                  class="w-full"/>
              </UFormField>
            </div>

            <UFormField
              label="Zpráva"
              required>
              <UTextarea
                v-model="form.message"
                placeholder="Popište váš projekt nebo dotaz..."
                :rows="5"
                size="lg"
                class="w-full"/>
            </UFormField>

            <div class="flex items-center justify-between pt-4 hairline-dashed">
              <p class="text-xs text-(--dk-dim)">
                Odpovím do 24 hodin
              </p>
              <UButton
                type="submit"
                size="lg"
                color="primary"
                :disabled="submitted"
                class="px-8 font-semibold rounded-[4px]">
                <template v-if="submitted">
                  <UIcon
                    name="i-lucide-check"
                    class="w-4 h-4 mr-1"/>
                  Odesláno!
                </template>
                <template v-else>
                  Odeslat zprávu
                  <UIcon
                    name="i-lucide-send"
                    class="w-4 h-4 ml-1"/>
                </template>
              </UButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
