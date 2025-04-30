<template>
  <div class="flex h-screen bg-gray-100">
    <button
        @click="isMobileMenuOpen = !isMobileMenuOpen"
        class="md:hidden fixed top-4 left-4 z-50 p-2 bg-indigo-600 text-white rounded"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
      </svg>
    </button>

    <div
        class="w-64 bg-indigo-800 text-white p-4 flex flex-col fixed md:static h-full transition-all duration-300 z-40"
        :class="isMobileMenuOpen ? 'left-0' : '-left-full md:left-0'"
    >
      <div class="mb-8" v-if="!isMobileMenuOpen">
        <h1 class="text-2xl font-bold">RSS Okuyucu</h1>
        <p class="text-indigo-200 text-sm">Güncel içerikleri takip edin</p>
      </div>

      <div class="mb-6">
        <h2 class="text-indigo-300 uppercase text-xs font-semibold mb-3">Kategoriler</h2>
        <ul>
          <li v-for="category in categories" :key="category.id" class="mb-2">
            <a
                href="#"
                class="flex items-center p-2 rounded hover:bg-indigo-700"
                :class="{ 'bg-indigo-700': activeCategory === category.id }"
                @click.prevent="setActiveCategory(category.id)"
            >
              <span class="mr-2" :class="category.icon"></span>
              {{ category.name }}
              <span class="ml-auto bg-indigo-600 text-xs px-2 py-1 rounded-full">{{ category.count }}</span>
            </a>
          </li>
        </ul>
      </div>

      <div class="mb-6">
        <h2 class="text-indigo-300 uppercase text-xs font-semibold mb-3">Abonelikler</h2>
        <ul>
          <li v-for="feed in feeds" :key="feed.id" class="mb-2">
            <a
                href="#"
                class="flex items-center p-2 rounded hover:bg-indigo-700"
                :class="{ 'bg-indigo-700': activeFeed === feed.id }"
                @click.prevent="setActiveFeed(feed.id)"
            >
              <img :src="feed.icon" :alt="feed.name" class="w-4 h-4 mr-2">
              {{ feed.name }}
            </a>
          </li>
        </ul>
      </div>

      <div class="mt-auto">
        <button
            @click="isModalOpen = true"
            class="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 px-4 rounded flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clip-rule="evenodd"/>
          </svg>
          Yeni Abonelik Ekle
        </button>
      </div>
    </div>

    <div class="flex-1 overflow-auto">
      <div class="bg-white p-4 shadow">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold">
            {{ activeFeed ? feeds.find(f => f.id === activeFeed).name : 'Tüm Makaleler' }}
          </h2>
          <div class="relative">
            <input
                type="text"
                placeholder="Makalelerde ara..."
                class="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                v-model="searchQuery"
            >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute left-3 top-2.5 text-gray-400"
                 viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"/>
            </svg>
          </div>
        </div>
      </div>

      <div class="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
            v-for="article in filteredArticles"
            :key="article.id"
            class="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            @click="selectedArticle = article"
        >
          <img v-if="article.image" :src="article.image" :alt="article.title" class="w-full h-48 object-cover">
          <div class="p-4">
            <div class="flex items-center mb-2">
              <img :src="article.feedIcon" class="w-4 h-4 mr-2">
              <span class="text-sm text-gray-500">{{ article.feedName }}</span>
              <span class="text-sm text-gray-500 mx-2">•</span>
              <span class="text-sm text-gray-500">{{ formatDate(article.date) }}</span>
            </div>
            <h3 class="font-semibold text-lg mb-2 line-clamp-2">{{ article.title }}</h3>
            <p class="text-gray-600 mb-3 line-clamp-3">{{ article.summary }}</p>
            <div class="flex justify-between items-center">
              <span class="text-xs px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full">{{ article.category }}</span>
              <button class="text-indigo-600 hover:text-indigo-800">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                  <path fill-rule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clip-rule="evenodd"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
        v-if="selectedArticle"
        class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        @click.self="selectedArticle = null"
    >
      <div class="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-auto">
        <div class="p-6">
          <div class="flex justify-between items-start mb-4">
            <div>
              <div class="flex items-center mb-2">
                <img :src="selectedArticle.feedIcon" class="w-4 h-4 mr-2">
                <span class="text-sm text-gray-500">{{ selectedArticle.feedName }}</span>
                <span class="text-sm text-gray-500 mx-2">•</span>
                <span class="text-sm text-gray-500">{{ formatDate(selectedArticle.date) }}</span>
              </div>
              <h2 class="text-2xl font-bold">{{ selectedArticle.title }}</h2>
            </div>
            <button @click="selectedArticle = null" class="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <img v-if="selectedArticle.image" :src="selectedArticle.image" :alt="selectedArticle.title"
               class="w-full h-64 object-cover mb-6 rounded">

          <div class="prose max-w-none" v-html="selectedArticle.content"></div>

          <div class="mt-6 pt-6 border-t flex justify-between items-center">
            <a
                :href="selectedArticle.link"
                target="_blank"
                class="text-indigo-600 hover:text-indigo-800 flex items-center"
            >
              Orijinal makaleyi oku
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </a>
            <div class="flex space-x-2">
              <button class="p-2 text-gray-500 hover:text-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                      d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"/>
                </svg>
              </button>
              <button class="p-2 text-gray-500 hover:text-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clip-rule="evenodd"/>
                </svg>
              </button>
              <button class="p-2 text-gray-500 hover:text-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                        d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                        clip-rule="evenodd"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
        v-if="isModalOpen"
        class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        @click.self="isModalOpen = false"
    >
      <div class="bg-white rounded-lg max-w-md w-full">
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold">Yeni RSS Aboneliği Ekle</h2>
            <button @click="isModalOpen = false" class="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <form @submit.prevent="addNewFeed">
            <div class="mb-4">
              <label for="feedName" class="block text-sm font-medium text-gray-700 mb-1">Abonelik Adı</label>
              <input
                  type="text"
                  id="feedName"
                  v-model="newFeed.name"
                  class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
              >
            </div>

            <div class="mb-4">
              <label for="feedUrl" class="block text-sm font-medium text-gray-700 mb-1">RSS URL</label>
              <input
                  type="url"
                  id="feedUrl"
                  v-model="newFeed.url"
                  class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="https://example.com/feed.xml"
                  required
              >
            </div>

            <div class="mb-4">
              <label for="feedCategory" class="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
              <select
                  id="feedCategory"
                  v-model="newFeed.category"
                  class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="technology">Teknoloji</option>
                <option value="news">Haberler</option>
                <option value="sports">Spor</option>
                <option value="entertainment">Eğlence</option>
              </select>
            </div>

            <div class="flex justify-end space-x-3 mt-6">
              <button
                  type="button"
                  @click="isModalOpen = false"
                  class="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
              >
                İptal
              </button>
              <button
                  type="submit"
                  class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Kaydet
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMobileMenuOpen: false,
      isModalOpen: false,
      activeCategory: 1,
      activeFeed: null,
      searchQuery: '',
      selectedArticle: null,
      newFeed: {
        name: '',
        url: '',
        category: 'technology'
      },
      categories: [
        {id: 1, name: 'Tüm Makaleler', icon: 'fas fa-newspaper', count: 42},
        {id: 2, name: 'Okunmamışlar', icon: 'fas fa-envelope', count: 12},
        {id: 3, name: 'Yıldızlılar', icon: 'fas fa-star', count: 8},
        {id: 4, name: 'Arşiv', icon: 'fas fa-archive', count: 156}
      ],
      feeds: [
        {id: 1, name: 'TechCrunch', icon: 'https://techcrunch.com/favicon.ico'},
        {id: 2, name: 'Medium Teknoloji', icon: 'https://medium.com/favicon.ico'},
        {id: 3, name: 'CSS-Tricks', icon: 'https://css-tricks.com/favicon.ico'},
        {id: 4, name: 'Vue.js Blog', icon: 'https://vuejs.org/images/logo.png'}
      ],
      articles: [
        {
          id: 1,
          title: 'Vue 3.2 Composition API ile Gelişmiş Özellikler',
          summary: 'Vue 3.2 ile gelen yeni Composition API özellikleri ve nasıl kullanılacağı hakkında detaylı bir rehber.',
          content: '<p>Vue 3.2, Composition API için birçok yeni özellik getirdi. Bu makalede, bu özellikleri nasıl kullanacağınızı öğreneceksiniz.</p><p>Özellikle <code>script setup</code> sözdizimi, artık daha az boilerplate kodu yazmanızı sağlıyor.</p>',
          date: '2023-05-15',
          feedId: 4,
          feedName: 'Vue.js Blog',
          feedIcon: 'https://vuejs.org/images/logo.png',
          image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          category: 'technology',
          link: 'https://vuejs.org/blog/vue-3.2'
        },
        {
          id: 2,
          title: 'Tailwind CSS ile Hızlı Arayüz Geliştirme',
          summary: 'Tailwind CSS kullanarak modern ve responsive arayüzleri nasıl hızlıca geliştirebileceğinizi öğrenin.',
          content: '<p>Tailwind CSS, utility-first yaklaşımı ile hızlı arayüz geliştirmeyi kolaylaştırıyor.</p><p>Bu makalede, Tailwind CSS\'in temel konseptlerini ve pratik kullanım örneklerini bulabilirsiniz.</p>',
          date: '2023-05-10',
          feedId: 3,
          feedName: 'CSS-Tricks',
          feedIcon: 'https://css-tricks.com/favicon.ico',
          image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          category: 'technology',
          link: 'https://css-tricks.com/tailwind-css'
        },
        {
          id: 3,
          title: 'Yapay Zeka Trendleri 2023',
          summary: '2023 yılında yapay zeka alanında öne çıkan trendler ve gelecek projeksiyonları.',
          content: '<p>2023 yılında yapay zeka alanında büyük gelişmeler bekleniyor. Bu makalede, bu trendleri detaylı olarak inceliyoruz.</p>',
          date: '2023-05-05',
          feedId: 1,
          feedName: 'TechCrunch',
          feedIcon: 'https://techcrunch.com/favicon.ico',
          image: 'https://images.unsplash.com/photo-1677442135136-760c813a743e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          category: 'technology',
          link: 'https://techcrunch.com/ai-trends-2023'
        },
        {
          id: 4,
          title: 'JavaScript Performans İpuçları',
          summary: 'JavaScript kodunuzu optimize etmek için kullanabileceğiniz pratik performans ipuçları.',
          content: '<p>JavaScript uygulamalarınızın performansını artırmak için bu ipuçlarını uygulayabilirsiniz.</p><p>Özellikle büyük ölçekli uygulamalarda bu optimizasyonlar kritik öneme sahiptir.</p>',
          date: '2023-04-28',
          feedId: 2,
          feedName: 'Medium Teknoloji',
          feedIcon: 'https://medium.com/favicon.ico',
          image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          category: 'technology',
          link: 'https://medium.com/javascript-performance'
        },
        {
          id: 5,
          title: 'Responsive Tasarımın Temelleri',
          summary: 'Modern web uygulamaları için responsive tasarımın temel prensipleri ve en iyi uygulamalar.',
          content: '<p>Responsive tasarım, günümüz web geliştirme dünyasında olmazsa olmaz bir konudur.</p><p>Bu makalede, responsive tasarımın temellerini ve pratik uygulamalarını öğreneceksiniz.</p>',
          date: '2023-04-20',
          feedId: 3,
          feedName: 'CSS-Tricks',
          feedIcon: 'https://css-tricks.com/favicon.ico',
          image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          category: 'technology',
          link: 'https://css-tricks.com/responsive-design'
        },
        {
          id: 6,
          title: 'Vuex ve Pinia Karşılaştırması',
          summary: 'Vue.js uygulamalarında state yönetimi için Vuex ve Pinia kütüphanelerinin karşılaştırması.',
          content: '<p>Vue.js ekosisteminde state yönetimi için iki popüler seçenek: Vuex ve Pinia.</p><p>Bu makalede, bu iki kütüphanenin avantaj ve dezavantajlarını karşılaştırdık.</p>',
          date: '2023-04-15',
          feedId: 4,
          feedName: 'Vue.js Blog',
          feedIcon: 'https://vuejs.org/images/logo.png',
          image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          category: 'technology',
          link: 'https://vuejs.org/blog/vuex-vs-pinia'
        }
      ]
    }
  },
  computed: {
    filteredArticles() {
      let filtered = this.articles;

      if (this.activeCategory === 2) {
        filtered = filtered.filter(article => !article.read);
      } else if (this.activeCategory === 3) {
        filtered = filtered.filter(article => article.starred);
      } else if (this.activeCategory === 4) {
        filtered = filtered.filter(article => article.archived);
      }

      if (this.activeFeed) {
        filtered = filtered.filter(article => article.feedId === this.activeFeed);
      }

      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(article =>
            article.title.toLowerCase().includes(query) ||
            article.summary.toLowerCase().includes(query)
        );
      }

      return filtered;
    }
  },
  methods: {
    setActiveCategory(categoryId) {
      this.activeCategory = categoryId;
      this.activeFeed = null;
      this.isMobileMenuOpen = false;
    },
    setActiveFeed(feedId) {
      this.activeFeed = feedId;
      this.activeCategory = null;
      this.isMobileMenuOpen = false;
    },
    formatDate(dateString) {
      const options = {year: 'numeric', month: 'long', day: 'numeric'};
      return new Date(dateString).toLocaleDateString('tr-TR', options);
    },
    addNewFeed() {
      const newId = Math.max(...this.feeds.map(f => f.id)) + 1;
      this.feeds.push({
        id: newId,
        name: this.newFeed.name,
        icon: `https://${new URL(this.newFeed.url).hostname}/favicon.ico`,
        category: this.newFeed.category
      });

      this.isModalOpen = false;
      this.newFeed = {
        name: '',
        url: '',
        category: 'technology'
      };
    }
  }
}
</script>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

.prose {
  max-width: 100%;
}

.prose img {
  max-width: 100%;
  height: auto;
}

.prose code {
  background-color: #f3f4f6;
  padding: 0.2em 0.4em;
  border-radius: 0.25em;
  font-family: monospace;
}
</style>