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
          <li v-for="category in categories" :key="category.id" class="mb-2 cursor-pointer">
            <a
                @click="console.log(category.id); activeCategory = category.id"
                class="flex items-center p-2 rounded hover:bg-indigo-700"
                :class="{ 'bg-indigo-700': activeCategory === category.id }"
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
          <li v-for="sub in subs" :key="sub.id" class="mb-2 cursor-pointer">
            <a
                @click="console.log(sub.name)"
                class="flex items-center p-2 rounded hover:bg-indigo-700"
                :class="{ 'bg-indigo-700': activeSub === sub.id }"
            >
              <img :src="sub.icon" :alt="sub.name" class="w-4 h-4 mr-2">
              {{ sub.name }}
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
            Tüm makaleler listeniyor
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
            v-for="post in posts"
            :key="post.id"
            class="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
        >
          <img v-if="post.image" :src="post.image" :alt="post.title" class="w-full h-48 object-cover">
          <div class="p-4">
            <div class="flex items-center mb-2">
              <img :src="post.feedIcon" class="w-4 h-4 mr-2" alt="image loading error">
              <span class="text-sm text-gray-500">{{ post.feedName }}</span>
              <span class="text-sm text-gray-500 mx-2">•</span>
              <span class="text-sm text-gray-500">{{ post.date }}</span>
            </div>
            <h3 class="font-semibold text-lg mb-2 line-clamp-2">{{ post.title }}</h3>
            <p class="text-gray-600 mb-3 line-clamp-3">{{ post.summary }}</p>
            <div class="flex justify-between items-center">
              <span class="text-xs px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full">{{ post.category }}</span>
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

    <div>
      <NewSubForm v-if="isModalOpen"/>
    </div>
  </div>
</template>

<script>
import NewSubForm from '@/views/Dashboard/NewSubForm.vue';

export default {
  name: 'DashboardView',
  components: {
    NewSubForm
  },
  data() {
    return {
      isMobileMenuOpen: false,
      isModalOpen: false,
      activeCategory: 'all-post',
      activeSub: null,
      searchQuery: '',
      newFeed: {
        name: '',
        url: '',
        category: 'technology'
      },
      categories: [
        {id: "all-post", name: 'Tüm Gönderiler', icon: 'fas fa-newspaper', count: 42},
        {id: "unread", name: 'Okunmamışlar', icon: 'fas fa-envelope', count: 12},
        {id: "fav-post", name: 'Yıldızlılar', icon: 'fas fa-star', count: 8},
        {id: "archive", name: 'Arşiv', icon: 'fas fa-archive', count: 156}
      ],
      subs: [
        {id: 1, name: 'TechCrunch', icon: 'https://techcrunch.com/favicon.ico'},
        {id: 2, name: 'Medium Teknoloji', icon: 'https://medium.com/favicon.ico'},
        {id: 3, name: 'CSS-Tricks', icon: 'https://css-tricks.com/favicon.ico'},
        {id: 4, name: 'Vue.js Blog', icon: 'https://vuejs.org/images/logo.png'}
      ],
      posts: [
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
      ]
    }
  },
}
</script>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');


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