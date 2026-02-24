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
  { icon: 'i-lucide-mail', label: 'Email', value: 'daniel@develit.io', href: 'mailto:daniel@develit.io' },
  { icon: 'i-lucide-map-pin', label: 'Lokace', value: 'Česká republika', href: null },
  { icon: 'i-lucide-clock', label: 'Dostupnost', value: 'Po—Pá, 9:00—18:00', href: null },
]
</script>

<template>
  <section
    id="contact"
    class="py-24 sm:py-32 bg-slate-50/50 dark:bg-slate-900/30">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center max-w-2xl mx-auto mb-16">
        <p class="text-sm font-medium text-blue-600 dark:text-blue-400 tracking-widest uppercase mb-4">
          Kontakt
        </p>
        <h2 class="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
          Pojďme spolupracovat
        </h2>
        <p class="text-slate-500 dark:text-slate-400">
          Máte projekt nebo nápad? Napište mi a probere to.
        </p>
      </div>

      <div class="grid lg:grid-cols-5 gap-12">
        <!-- Contact info -->
        <div class="lg:col-span-2 space-y-6">
          <div
            v-for="info in contactInfo"
            :key="info.label"
            class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center shrink-0">
              <UIcon
                :name="info.icon"
                class="w-5 h-5 text-blue-600 dark:text-blue-400"/>
            </div>
            <div>
              <p class="text-xs font-medium text-slate-400 dark:text-slate-500 tracking-wide uppercase mb-1">
                {{ info.label }}
              </p>
              <component
                :is="info.href ? 'a' : 'p'"
                :href="info.href || undefined"
                :class="[
                  'text-sm font-medium',
                  info.href
                    ? 'text-blue-600 dark:text-blue-400 hover:underline'
                    : 'text-slate-700 dark:text-slate-300',
                ]">
                {{ info.value }}
              </component>
            </div>
          </div>

          <!-- CTA card -->
          <div class="mt-8 p-6 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white">
            <h3 class="font-semibold mb-2">
              Rychlá konzultace zdarma
            </h3>
            <p class="text-sm text-blue-100 leading-relaxed">
              Nevíte, jestli potřebujete nový web nebo stačí vylepšit stávající? Ozvěte se — poradím nezávazně.
            </p>
          </div>
        </div>

        <!-- Form -->
        <div class="lg:col-span-3">
          <form
            class="rounded-2xl bg-white dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 p-8 space-y-6"
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

            <div class="flex items-center justify-between">
              <p class="text-xs text-slate-400 dark:text-slate-500">
                Odpovím do 24 hodin
              </p>
              <UButton
                type="submit"
                size="lg"
                color="primary"
                :disabled="submitted"
                class="px-8">
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
