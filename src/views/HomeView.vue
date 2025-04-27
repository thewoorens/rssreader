<script>
export default {
  name: 'HomeView',
  data() {
    return {
      features: [
        {
          icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
          title: 'Açık Kaynak',
          desc: 'Tamamen şeffaf kaynak kodu, istediğiniz gibi inceleyip geliştirebilirsiniz.'
        },
        {
          icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
          title: 'Hızlı ve Güvenli',
          desc: 'Asenkron işlemlerle yüksek performans ve banka seviyesinde güvenlik.'
        },
        {
          icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
          title: 'Otomatik RSS',
          desc: 'Favori kaynaklarınızı ekleyin, yeni içerikler otomatik olarak akışınıza eklensin.'
        },
        {
          icon: 'M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z',
          title: 'Güncel',
          desc: 'Anlık güncellemelerle hiçbir içeriği kaçırmayın.'
        },
        {
          icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
          title: 'Mobil Uygulama',
          desc: 'iOS ve Android için özel uygulamalarımızla her yerden erişim.'
        },
        {
          icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
          title: 'Tek Platform',
          desc: 'Tüm sosyal medya hesaplarınızı tek bir merkezden yönetin.'
        }
      ],
      stats: [
        {value: '1.000+', label: 'Fazla içerik getirebilir'},
        {value: '50+', label: 'Entegre Platform'},
        {value: '7/24', label: 'Kesintisiz Hizmet'},
        {value: 'Anlık', label: 'Mobil Bildirimler'}
      ]
    }
  },
}
</script>

<template>
  <div class="min-h-screen bg-white">
    <div class="relative bg-indigo-50 overflow-hidden lg:pt-52">
      <div class="max-w-7xl mx-auto">
        <div class="relative z-10 pb-8 bg-indigo-50 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div class="sm:text-center lg:text-left">
              <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span class="block">Sosyal Medyanızın</span>
                <span class="block text-indigo-600">Kontrolü Sizde</span>
              </h1>
              <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                YouTube, Twitter, Instagram ve Reddit gibi platformlardaki içeriklerinizi algoritma karmaşası olmadan,
                tek bir merkezden yönetin.
              </p>
              <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div class="rounded-md shadow">
                  <router-link to="/register"
                               class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                    Ücretsiz Deneyin
                  </router-link>
                </div>
                <div class="mt-3 sm:mt-0 sm:ml-3">
                  <router-link to="/login"
                               class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10">
                    Giriş Yap
                  </router-link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img class="hidden lg:block h-56 w-full object-contain sm:h-72 md:h-96 lg:w-full lg:h-full"
             src="../assets/bg.png" alt=""></div>
    </div>

    <div class="bg-indigo-700">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl font-extrabold text-white sm:text-4xl">
            RSS Read neler başarabilir?
          </h2>
          <p class="mt-3 text-xl text-indigo-200 sm:mt-4">
            Kendi Sunucunuzda çalıştırabileceğiniz, açık kaynak kodlu bir RSS okuyucu.
          </p>
        </div>
        <div class="mt-10 sm:max-w-6xl sm:mx-auto sm:grid sm:grid-cols-4 sm:gap-8">
          <div v-for="(stat, index) in stats" :key="index" class="p-6">
            <div class="text-5xl font-extrabold text-white">{{ stat.value }}</div>
            <div class="mt-2 text-base font-medium text-indigo-200">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="py-12 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:text-center">
          <h2 class="text-base text-indigo-600 font-semibold tracking-wide uppercase">Özellikler</h2>
          <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Daha İyi Bir Sosyal Medya Deneyimi
          </p>
          <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Sadece seçtiğiniz kaynaklardan gelen içerikleri görebilirsiniz. Diğer içerikler ile dikkatiniz dağıtamaz.
          </p>
        </div>

        <div class="mt-10">
          <div class="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <div v-for="(feature, index) in features" :key="index" class="pt-6">
              <div
                  class="flow-root bg-gray-50 rounded-lg px-6 pb-8 h-full hover:bg-indigo-50 transition-colors duration-300">
                <div class="-mt-6">
                  <div>
                    <span class="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                      <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                           stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="feature.icon"/>
                      </svg>
                    </span>
                  </div>
                  <h3 class="mt-8 text-lg font-medium text-gray-900 tracking-tight">{{ feature.title }}</h3>
                  <p class="mt-5 text-base text-gray-500">
                    {{ feature.desc }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-indigo-50">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span class="block">Hemen Bugün</span>
          <span class="block text-indigo-600">Sosyal Medya Bağımlılığdan Kurtulun.</span>
        </h2>
        <div class="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div class="inline-flex rounded-md shadow">
            <router-link to="/register"
                         class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
              Kayıt Ol
            </router-link>
          </div>
          <div class="ml-3 inline-flex rounded-md shadow">
            <router-link to="/login"
                         class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50">
              Giriş Yap
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <footer class="bg-gray-800 p-10 lg:p-20 flex flex-col lg:flex-row lg:justify-between space-y-6 lg:space-y-0">
      <div class="flex flex-col lg:flex-row lg:justify-between space-y-6 space-x-8 lg:space-y-0">
        <a href="https://github.com/thewoorens/rssreader"
           class="text-gray-400 hover:text-gray-300 ml-5 flex items-center space-x-2 sm:ml-2 sm:text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
               class="bi bi-github flex-shrink-0"
               viewBox="0 0 16 16">
            <path
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
        0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13
        -.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66
        .07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95
        0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12
        0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09
        2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12
        .51.56.82 1.27.82 2.15
        0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48
        0 1.07-.01 1.93-.01 2.2
        0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
          </svg>
          <span class="text-sm sm:text-xs">Github Repository</span>
        </a>

        <a href="https://github.com/thewoorens/rssreader"
           class="text-gray-400 hover:text-gray-300 ml-5 flex items-center space-x-2 sm:ml-2 sm:text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-rss"
               viewBox="0 0 16 16">
            <path
                d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
            <path
                d="M5.5 12a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m-3-8.5a1 1 0 0 1 1-1c5.523 0 10 4.477 10 10a1 1 0 1 1-2 0 8 8 0 0 0-8-8 1 1 0 0 1-1-1m0 4a1 1 0 0 1 1-1 6 6 0 0 1 6 6 1 1 0 1 1-2 0 4 4 0 0 0-4-4 1 1 0 0 1-1-1"/>
          </svg>
          <span class="text-sm sm:text-xs">RSS Templates</span>
        </a>

        <a href="https://github.com/thewoorens/rssreader"
           class="text-gray-400 hover:text-gray-300 ml-5 flex items-center space-x-2 sm:ml-2 sm:text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-telephone"
               viewBox="0 0 16 16">
            <path
                d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
          </svg>
          <span class="text-sm sm:text-xs">Contact</span>
        </a>
      </div>
      <div>
        <p class="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
          &copy; 2025 RSS Reader. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.transition-colors {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
</style>
