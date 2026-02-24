<template>
  <div class="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
    <AppNavbar/>
    <main class="pt-16">
      <slot/>
    </main>
    <AppFooter/>
  </div>
</template>
